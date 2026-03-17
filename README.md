# Playwright TypeScript Utility Functions Library

[![GitHub stars](https://img.shields.io/github/stars/vasu31dev/playwright-ts-lib)](https://github.com/vasu31dev/playwright-ts-lib/stargazers)
![Last Commit](https://img.shields.io/github/last-commit/vasu31dev/playwright-ts-lib) ![Pull Requests](https://img.shields.io/github/issues-pr-raw/vasu31dev/playwright-ts-lib)
[![npm version](https://img.shields.io/npm/v/vasu-playwright-utils.svg)](https://www.npmjs.com/package/vasu-playwright-utils)
[![Release Notes](https://img.shields.io/badge/Release%20Notes-📝-brightgreen)](https://github.com/vasu31dev/playwright-ts-lib/blob/main/CHANGELOG.md)

## About

`playwright-ts-lib` is a TypeScript library that provides reusable helper methods for the Playwright Library. It aims to simplify common tasks and enhance the efficiency of automated testing workflows.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [ESLint](#eslint)
- [AI Agent Skills](#ai-agent-skills)
- [License](#license)

## Installation

To install the library, run the following command:

```bash
npm install vasu-playwright-utils  --save-dev
```

## Usage

Here's a simple example of how you can use the library:

```typescript
import { click, fill } from 'vasu-playwright-utils';

// Your code here
```

## ESLint

This library ships a shareable ESLint config for Playwright TypeScript projects. Install the library (it includes the required ESLint plugins), then extend the config in your project and override any rules as needed.

### Using the config

1. Use **ESLint 9 flat config** (`eslint.config.mjs` at your project root).

2. In your `eslint.config.mjs`, spread the library config:

```javascript
import playwrightLibConfig from 'vasu-playwright-utils/eslint';

export default [...playwrightLibConfig];
```

3. Ensure your project has a `tsconfig.json` at the root (the config uses it for TypeScript parsing).

### Overriding rules

Add config objects after the spread to override or relax rules:

```javascript
import playwrightLibConfig from 'vasu-playwright-utils/eslint';

export default [
  ...playwrightLibConfig,
  // Override specific rules
  {
    rules: {
      'playwright/no-focused-test': 'warn',
      'playwright/no-wait-for-timeout': 'off',
      'no-console': 'off',
    },
  },
  // Or override only for certain files
  {
    files: ['tests/**/*.ts'],
    rules: {
      'playwright/expect-expect': 'error',
    },
  },
];
```

Later entries in the config array override earlier ones, so your overrides take precedence.

## AI Agent Skills

This library ships with [Claude Code](https://claude.com/claude-code) and [Cursor](https://cursor.com) skills that help AI agents understand and use the `vasu-playwright-utils` API and `playwright-cli` for browser automation.

### How skills and agents are invoked

- **Cursor** discovers skills from `.claude/skills/` (and `.cursor/skills/`, `.agents/skills/`). The agent decides when a skill is relevant from its **description** (trigger phrases like "writing Playwright tests", "login test", "playwright-cli"). Rules in `.cursor/rules/` that apply to `*.spec.ts`, `specs/**`, and `tests/**` **require** using the playwright-cli and vasu-playwright-utils skills and the correct agent workflow (Planner / Generator / Healer).
- **Claude Code** discovers skills from `.claude/skills/`. `CLAUDE.md` instructs the agent to read and follow the playwright-cli and vasu-playwright-utils skills when writing or verifying Playwright tests, and to follow agent workflows when the user asks to plan, generate, or fix tests.

To test: ask the agent to "write a test case to login for https://example.com" (or any URL). The agent should use the playwright-cli skill to verify the flow and the vasu-playwright-utils skill (which includes the locator strategy) when writing selectors. You can also invoke a skill manually: `/playwright-cli` or `/vasu-playwright-utils` in Cursor Agent chat.

### For contributors

Skills are pre-installed in `.claude/skills/` and are automatically discovered by Claude Code and Cursor when working in this repository.

### For consumers

Run the following command in your project to install AI agent skills:

```bash
npx vasu-pw-setup-skills
```

This will:

1. Copy `vasu-playwright-utils` API skills to `.claude/skills/vasu-playwright-utils/`
2. Optionally install Playwright CLI skills if `@playwright/cli` is available

The skills teach AI agents about the library's import patterns, available functions, the options pattern, and the `setPage()` setup requirement.

To update skills after upgrading the library, run the command again with `--force`:

```bash
npx vasu-pw-setup-skills --force
```

## Issues and Feedback

If you encounter any issues or have feedback, please [Raise an Issue](https://github.com/vasu31dev/playwright-ts-lib/issues) on GitHub.

## Contributions

We welcome contributions! Feel free to submit a [Pull Request](https://github.com/vasu31dev/playwright-ts-lib/pulls) on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
