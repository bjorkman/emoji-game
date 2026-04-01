const expo = require('eslint-config-expo/flat');

module.exports = [
  ...expo,
  {
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'import/first': 'off',
    },
  },
];
