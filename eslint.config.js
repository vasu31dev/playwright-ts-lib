const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const jsdoc = require('eslint-plugin-jsdoc');
const playwright = require('eslint-plugin-playwright');
const js = require('@eslint/js');

module.exports = [
  { ignores: ['node_modules/**', '.husky/**', '**/*.js', 'package-lock.json', 'dist/**/*'] },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname },
      globals: {
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
      import: importPlugin,
      jsdoc: jsdoc,
      playwright: playwright,
    },
    settings: { 'import/resolver': { typescript: { alwaysTryTypes: true } } },
    rules: {
      // Prettier Rules
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],

      // TypeScript Rules
      ...typescript.configs['eslint-recommended'].overrides[0].rules,
      ...typescript.configs.recommended.rules,
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // Import Rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],

      // General Rules
      'require-await': 'error',
      complexity: ['warn', { max: 11 }],

      // JSDoc Rules
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',

      // Playwright Rules
      'playwright/missing-playwright-await': ['error'],
      'playwright/no-focused-test': 'error',
      'playwright/valid-expect': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-useless-await': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-useless-not': 'warn',
      'playwright/require-top-level-describe': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-skipped-test': 'off',
    },
  },
  { files: ['src/**/*.ts'], rules: { '@typescript-eslint/explicit-module-boundary-types': 'warn' } },
];
