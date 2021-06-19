module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      rules: {
        // Disallow TODO and FIXME comments
        'no-warning-comments': [
          'warn',
          { terms: ['todo', 'fixme'], location: 'start' },
        ],

        // Allow use of `@ts-ignore` comments
        '@typescript-eslint/ban-ts-ignore': 'off',

        // Allow return types to be inferred
        '@typescript-eslint/explicit-function-return-type': 'off',

        // Allow unused vars beginning with an underscore
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { argsIgnorePattern: '^_' },
        ],

        // Allow implicit types at module boundaries
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        // Disallow unhandled promises, requiring `void` statement
        '@typescript-eslint/no-floating-promises': [
          'error',
          { ignoreVoid: true },
        ],
      },
    },
  ],
};
