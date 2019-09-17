module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard', '@vue/typescript'],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'space-before-function-paren': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
