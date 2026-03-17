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

// --- Main ---

const projectRoot = resolveProjectRoot();
const pkgDir = path.resolve(__dirname, '..');
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
}

if (INSTALL_AGENTS) {
  installComponent(
    'playwright agents',
    path.join(pkgDir, 'agents'),
    path.join(projectRoot, '.claude', 'agents'),
  );
}

// Summary
console.log('\nDone! Installed to:');
for (const p of installed) {
  console.log(`  ${p}`);
}
console.log('\nThese help AI agents (like Claude Code) understand the vasu-playwright-utils API');
console.log('and provide specialized test planning, generation, and healing workflows.');
console.log('They are placed in .claude/ which Claude Code auto-discovers.\n');
