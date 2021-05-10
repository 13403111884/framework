module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/vue3-essential',
      'eslint:recommended',
      '@vue/typescript/recommended'
    ],
    parserOptions: {
      ecmaVersion: 2020
    },
    rules: {
      'no-console': 'warn',
      'no-debugger': 'warn',
      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-this-alias':[
        'error',
        {
          'allowDestructuring': true, // Allow `const { props, state } = this`; false by default
          'allowedNames': ['_this'] // Allow `const self = this`; `[]` by default
        }
      ],
      'semi': ['error', 'never'],
      'comma-dangle': [2, 'never'],
      'space-before-function-paren': 'off'
    }
  }
  