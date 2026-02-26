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

1. Use **ESLint 9 flat config** (`eslint.config.js` at your project root).

2. In your `eslint.config.js`, spread the library config:

```javascript
const playwrightLibConfig = require('vasu-playwright-utils/eslint');

module.exports = [...playwrightLibConfig];
```

3. Ensure your project has a `tsconfig.json` at the root (the config uses it for TypeScript parsing).

### Overriding rules

Add config objects after the spread to override or relax rules:

```javascript
const playwrightLibConfig = require('vasu-playwright-utils/eslint');

module.exports = [
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

## Issues and Feedback

If you encounter any issues or have feedback, please [Raise an Issue](https://github.com/vasu31dev/playwright-ts-lib/issues) on GitHub.

## Contributions

We welcome contributions! Feel free to submit a [Pull Request](https://github.com/vasu31dev/playwright-ts-lib/pulls) on GitHub.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
