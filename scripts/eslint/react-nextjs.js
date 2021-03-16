module.exports = {
  root: true,
  extends: [
    ...['./base'].map(require.resolve),
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    amd: true,
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Use compiler-provided JSX transform
    'react/react-in-jsx-scope': 'off',
  },
};
