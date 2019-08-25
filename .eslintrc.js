module.exports = {
  extends: [
    'react-app',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/array-type': ['error', 'array-simple'],
  },
}
