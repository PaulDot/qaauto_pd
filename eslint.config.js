import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['pages/*.*', 'tests/*.spec.*'],
    ...playwright.configs['flat/recommended'],
    rules: {
      // No If/Else in tests (make separtate tests!)
      'playwright/no-conditional-in-test': 'error',

      // Need to assert something
      'playwright/expect-expect': 'error',
      
      // No test.only
      'playwright/no-focused-test': 'error',
    },
  },

  {
    files: [ '*.config.*', 'scripts/*.*'],
    languageOptions: {
      globals: {
        ...globals.node, // Enables 'process', 'module', 'require', etc.
      },
    },
    rules: {
      // Allow Node scripts to use older CommonJS requires
      '@typescript-eslint/no-require-imports': 'off',

      // Allows an empty catch block
      'no-empty': 'off',
    },
  }
);
