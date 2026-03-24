#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const FORCE = args.includes('--force');
const FORCE_CLAUDE = args.includes('--force-claude');
const skillsFlag = args.includes('--skills');
const agentsFlag = args.includes('--agents');
// No flags → full install. One flag → that part only. Both flags → full install (same as neither).
const noScopeFlags = !skillsFlag && !agentsFlag;
const INSTALL_SKILLS = noScopeFlags || skillsFlag;
const INSTALL_AGENTS = noScopeFlags || agentsFlag;

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
 * Recursively copy a directory, skipping existing files unless force is true.
 */
function copyDirSync(src, dest, force) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath, force);
    } else {
      if (!force && fs.existsSync(destPath)) {
        console.log(`  [skip] ${path.relative(projectRoot, destPath)} (exists, use --force to overwrite)`);
      } else {
        fs.copyFileSync(srcPath, destPath);
        console.log(`  [copy] ${path.relative(projectRoot, destPath)}`);
      }
    }
  }
}

/**
 * Install a directory component by copying from package templates to consumer project.
 */
function installDir(name, src, dest, force) {
  if (!fs.existsSync(src)) {
    console.error(`\nError: ${name} source not found at`, src);
    process.exit(1);
  }
  console.log(`\n${step++}. Installing ${name}:`);
  copyDirSync(src, dest, force);
  installed.push(path.relative(projectRoot, dest));
}

/**
 * Install a single file, skipping if it exists and force is false.
 */
function installFile(src, dest, force) {
  const rel = path.relative(projectRoot, dest);
  if (!force && fs.existsSync(dest)) {
    console.log(`  [skip] ${rel} (exists, use --force to overwrite)`);
    return;
  }
  if (!fs.existsSync(src)) {
    console.log(`  [skip] ${rel} (source not found)`);
    return;
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  [copy] ${rel}`);
}

// --- Main ---

const projectRoot = resolveProjectRoot();
const pkgDir = path.resolve(__dirname, '..');
const templatesDir = path.join(pkgDir, 'templates');
const installed = [];
let step = 1;

console.log('vasu-playwright-utils: Setting up AI skills and agents...\n');
console.log(`Project root: ${projectRoot}`);

if (INSTALL_SKILLS) {
  installDir(
    'vasu-playwright-utils skills',
    path.join(templatesDir, 'skills', 'vasu-playwright-utils'),
    path.join(projectRoot, '.claude', 'skills', 'vasu-playwright-utils'),
    FORCE,
  );

  installDir(
    'playwright-cli skills',
    path.join(templatesDir, 'skills', 'playwright-cli'),
    path.join(projectRoot, '.claude', 'skills', 'playwright-cli'),
    FORCE,
  );

  console.log(`\n${step++}. Installing Cursor rules (skills):`);
  installFile(
    path.join(templatesDir, 'cursor-rules', 'vasu-playwright-utils.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'vasu-playwright-utils.mdc'),
    FORCE,
  );
  installFile(
    path.join(templatesDir, 'cursor-rules', 'project.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'project.mdc'),
    FORCE,
  );

  console.log(`\n${step++}. Installing CLAUDE.md template:`);
  installFile(path.join(templatesDir, 'CLAUDE.md'), path.join(projectRoot, 'CLAUDE.md'), FORCE_CLAUDE);
}

if (INSTALL_AGENTS) {
  installDir(
    'playwright agents',
    path.join(templatesDir, 'agents'),
    path.join(projectRoot, '.claude', 'agents'),
    FORCE,
  );

  console.log(`\n${step++}. Installing Cursor rules (agents):`);
  installFile(
    path.join(templatesDir, 'cursor-rules', 'playwright-agents.mdc'),
    path.join(projectRoot, '.cursor', 'rules', 'playwright-agents.mdc'),
    FORCE,
  );
}

// Summary
console.log('\nDone! Installed to:');
for (const p of installed) {
  console.log(`  ${p}`);
}
console.log('\nBoth Claude Code and Cursor will auto-discover:');
console.log('  .claude/skills/   — API skills (Claude Code & Cursor via .cursor/rules/)');
console.log('  .claude/agents/   — Agent workflows (Claude Code)');
console.log('  .cursor/rules/    — Cursor rules referencing .claude/ skills and agents\n');
