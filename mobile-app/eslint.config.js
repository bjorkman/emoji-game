const expo = require('eslint-config-expo/flat');

module.exports = [
  ...expo,
  {
    // React Native uses <Text>, not HTML — entity escaping doesn't apply
    rules: {
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    // Test files: allow require() for jest.mock patterns and imports after mocks
    files: ['**/__tests__/**'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'import/first': 'off',
    },
  },
];
