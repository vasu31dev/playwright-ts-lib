#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const SKILLS_ONLY = args.includes('--skills');
const AGENTS_ONLY = args.includes('--agents');
const INSTALL_SKILLS = !AGENTS_ONLY;
const INSTALL_AGENTS = !SKILLS_ONLY;

/**
 * Resolve the consumer project root.
 * - INIT_CWD is set by npm/yarn when running lifecycle scripts or npx.
 * - Falls back to walking up from cwd looking for package.json.
 */
function resolveProjectRoot() {
  if (process.env.INIT_CWD) {
    return process.env.INIT_CWD;
  }
  let dir = process.cwd();
  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'package.json'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

/**
 * Recursively copy a directory, skipping existing files unless --force is set.
 */
function copyDirSync(src, dest, rootDir) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, rootDir);
    } else {
      if (!FORCE && fs.existsSync(destPath)) {
        console.log(`  [skip] ${path.relative(rootDir, destPath)} (exists, use --force to overwrite)`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  [copy] ${path.relative(rootDir, destPath)}`);
      }
    }
  }
}

/**
 * Install a component (skills or agents) by copying from package source to consumer project.
 */
function installComponent(name, src, dest) {
  if (!fs.existsSync(src)) {
    console.error(`\nError: ${name} source not found at`, src);
    process.exit(1);
  }
  console.log(`\n${step++}. Installing ${name}:`);
  copyDirSync(src, dest, projectRoot);
  installed.push(path.relative(projectRoot, dest));
}

/**
 * Copy a Cursor rule file from the package, adjusting @file paths for consumer layout.
 * In the repo, @file references use `skills/...` and `agents/...` (repo root paths).
 * For consumers, these live under `.claude/`, so we prefix accordingly.
 */
function installCursorRule(srcFile, destFile) {
  const rel = path.relative(projectRoot, destFile);
  if (!FORCE && fs.existsSync(destFile)) {
    console.log(`  [skip] ${rel} (exists, use --force to overwrite)`);
    return;
  }
  if (!fs.existsSync(srcFile)) {
    console.log(`  [skip] ${rel} (source not found)`);
    return;
  }
  const content = fs.readFileSync(srcFile, 'utf8');
  const adjusted = content
    .replace(/@file skills\//g, '@file .claude/skills/')
    .replace(/@file agents\//g, '@file .claude/agents/')
    .replace(/`skills\/vasu-playwright-utils\//g, '`.claude/skills/vasu-playwright-utils/');
  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.writeFileSync(destFile, adjusted, 'utf8');
  console.log(`  [copy] ${rel}`);
}

// --- Main ---

const projectRoot = resolveProjectRoot();
const pkgDir = path.resolve(__dirname, '..');
const cursorRulesDir = path.join(pkgDir, 'cursor-rules');
const installed = [];
let step = 1;

console.log('vasu-playwright-utils: Setting up AI skills and agents...\n');
console.log(`Project root: ${projectRoot}`);

if (INSTALL_SKILLS) {
  installComponent(
    'vasu-playwright-utils skills',
    path.join(pkgDir, 'skills', 'vasu-playwright-utils'),
    path.join(projectRoot, '.claude', 'skills', 'vasu-playwright-utils'),
  );

  // Install @playwright/cli skills (bundled as a dependency)
  console.log(`\n${step++}. Installing Playwright CLI skills:`);
  try {
    execSync('npx @playwright/cli install --skills', { cwd: projectRoot, stdio: 'inherit' });
  } catch {
    console.log('   Warning: Failed to install Playwright CLI skills. You can install them manually:');
    console.log('   npx @playwright/cli install --skills');
  }

  // Install Cursor rule for skills
  console.log(`\n${step++}. Installing Cursor rules (skills):`);
  installCursorRule(
    path.join(cursorRulesDir, 'vasu-playwright-utils.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'vasu-playwright-utils.mdc'),
  );
}

if (INSTALL_AGENTS) {
  installComponent(
    'playwright agents',
    path.join(pkgDir, 'agents'),
    path.join(projectRoot, '.claude', 'agents'),
  );

  // Install Cursor rule for agents
  console.log(`\n${step++}. Installing Cursor rules (agents):`);
  installCursorRule(
    path.join(cursorRulesDir, 'playwright-agents.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'playwright-agents.mdc'),
  );
}

// Install CLAUDE.md loader for Cursor (so Cursor reads the same project instructions as Claude Code)
if (fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) {
  console.log(`\n${step++}. Linking CLAUDE.md for Cursor:`);
  installCursorRule(
    path.join(cursorRulesDir, 'project.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'project.mdc'),
  );
}

// Summary
console.log('\nDone! Installed to:');
for (const p of installed) {
  console.log(`  ${p}`);
}
console.log('\nBoth Claude Code and Cursor will auto-discover:');
console.log('  .claude/skills/   — API skills (Claude Code & Cursor)');
console.log('  .claude/agents/   — Agent workflows (Claude Code)');
console.log('  .cursor/rules/    — Agent rules (Cursor)\n');
