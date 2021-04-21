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
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-var-requires': 0,
      "@typescript-eslint/no-explicit-any": 0,
      '@typescript-eslint/no-this-alias':[
        "error",
        {
          "allowDestructuring": true, // Allow `const { props, state } = this`; false by default
          "allowedNames": ["_this"] // Allow `const self = this`; `[]` by default
        }
      ]
    }
  }
  