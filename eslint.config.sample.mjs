/**
 * Sample ESLint flat config that uses the shareable config.
 * To use: copy this file to eslint.config.mjs (or eslint.config.js if your project uses "type": "module").
 */
// In your project: import from 'vasu-playwright-utils/eslint'
import playwrightLibConfig from './eslint.config.base.mjs';

export default [
  ...playwrightLibConfig,
  // Optional: override rules for your project
  {
    rules: {
      'playwright/no-focused-test': 'warn',
      'jsdoc/check-alignment': 'off',
      'jsdoc/check-indentation': 'off',
    },
  },
];
