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

This library ships with AI skills and agent workflows for [Claude Code](https://claude.com/claude-code) and [Cursor](https://cursor.com) that help AI agents understand the `vasu-playwright-utils` API and use `playwright-cli` for browser automation.

### What gets installed

| Component                                                    | Installed to                            | Used by             |
| ------------------------------------------------------------ | --------------------------------------- | ------------------- |
| **Skills** — API docs, locator strategy, function references | `.claude/skills/vasu-playwright-utils/` | Claude Code, Cursor |
| **Playwright CLI skills** — browser automation commands      | `.claude/skills/playwright-cli/`        | Claude Code, Cursor |
| **Agents** — test planner, generator, healer workflows       | `.claude/agents/`                       | Claude Code         |
| **CLAUDE.md** — project instructions template                | `CLAUDE.md` (project root)              | Claude Code, Cursor |
| **Cursor rules** — agent workflow rules with `@file` refs    | `.cursor/rules/`                        | Cursor              |
| **CLAUDE.md loader** — links `CLAUDE.md` into Cursor         | `.cursor/rules/project.mdc`             | Cursor              |

Files are **copied** (not symlinked) into your project. Both Claude Code and Cursor auto-discover `.claude/skills/`. Claude Code also auto-discovers `.claude/agents/`. Cursor uses `.cursor/rules/` to reference agent files. The setup copies a `CLAUDE.md` template to your project root (skipped if one already exists) and creates a Cursor rule that loads it via `@file CLAUDE.md`, so both tools share the same project instructions.

### For consumers

Install everything (skills + agents) with a single command:

```bash
npx vasu-pw-setup
```

Or install only what you need:

```bash
# Skills only (API docs, locator strategy, playwright-cli)
npx vasu-pw-setup --skills

# Agents only (test planner, generator, healer)
npx vasu-pw-setup --agents
```

To update after upgrading the library, run the command again with `--force`:

```bash
npx vasu-pw-setup --force
```

`--force` overwrites skills, agents, and cursor rules. To also overwrite `CLAUDE.md` (which is normally preserved), add `--force-claude`:

```bash
npx vasu-pw-setup --force --force-claude
```

### How skills and agents are invoked

- **Claude Code** auto-discovers `.claude/skills/` and `.claude/agents/`. `CLAUDE.md` instructs the agent to use `playwright-cli` and `vasu-playwright-utils` skills when writing tests, and to follow agent workflows (Planner / Generator / Healer) when asked to plan, generate, or fix tests.
- **Cursor** auto-discovers `.claude/skills/` for API reference. Rules in `.cursor/rules/` activate on `*.spec.ts`, `specs/**`, and `tests/**` files and include the agent workflows via `@file` directives pointing to `.claude/agents/`.

To test: ask the agent to "write a test case to login for https://example.com" (or any URL). The agent should use `playwright-cli` to verify the flow and the `vasu-playwright-utils` skill (with locator strategy) when writing selectors.

### For contributors

All distributable assets live under `templates/`. Symlinks make them available to Claude Code and Cursor during local development — edit the source in `templates/` and changes are reflected everywhere:

| Symlink                                   | Source of truth                                    |
| ----------------------------------------- | -------------------------------------------------- |
| `.claude/skills/vasu-playwright-utils`    | `templates/skills/vasu-playwright-utils/`          |
| `.claude/skills/playwright-cli`           | `templates/skills/playwright-cli/`                 |
| `.claude/agents`                          | `templates/agents/`                                |
| `.cursor/rules/playwright-agents.mdc`     | `templates/cursor-rules/playwright-agents.mdc`     |
| `.cursor/rules/vasu-playwright-utils.mdc` | `templates/cursor-rules/vasu-playwright-utils.mdc` |
| `.cursor/rules/project.mdc`               | `templates/cursor-rules/project.mdc`               |

`.cursor/rules/project.mdc` loads `CLAUDE.md` into Cursor so both Claude Code and Cursor share the same project instructions.

#### Syncing `playwright-cli` skill into `templates/`

After refreshing the skill locally (e.g. `npx skills update microsoft/playwright-cli --skill playwright-cli -a claude-code` so `.claude/skills/playwright-cli` is current), sync it into templates and commit:

```bash
npm run sync:playwright-cli-skill
```

## Issues and Feedback

If you encounter any issues or have feedback, please [Raise an Issue](https://github.com/vasu31dev/playwright-ts-lib/issues) on GitHub.

## Contributions

We welcome contributions! Feel free to submit a [Pull Request](https://github.com/vasu31dev/playwright-ts-lib/pulls) on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
