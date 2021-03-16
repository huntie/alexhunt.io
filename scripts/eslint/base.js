module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // Allow use of `@ts-ignore` comments
    '@typescript-eslint/ban-ts-ignore': 'off',

    // Allow return types to be inferred
    '@typescript-eslint/explicit-function-return-type': 'off',

    // Allow implicit types at module boundaries
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // Disallow unhandled promises, requiring `void` statement
    '@typescript-eslint/no-floating-promises': ['error', { ignoreVoid: true }],
  },
};
