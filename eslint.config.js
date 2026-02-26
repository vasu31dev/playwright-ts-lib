/**
 * This repo's ESLint config: base config + local overrides.
 * Edit eslint.config.base.js to change rules; that file is also published as vasu-playwright-utils/eslint.
 */
const base = require('./eslint.config.base.js');

module.exports = [
  ...base,
  // Repo-specific: JSDoc alignment/indentation as warn (base has them off for consumers)
  { rules: { 'jsdoc/check-alignment': 'warn', 'jsdoc/check-indentation': 'warn' } },
  // Repo-specific: stricter module boundary types in src
  { files: ['src/**/*.ts'], rules: { '@typescript-eslint/explicit-module-boundary-types': 'warn' } },
];
