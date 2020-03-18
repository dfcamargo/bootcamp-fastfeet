module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': 'error',
    'camelcase': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'import/prefer-default-export': 'off',
    'no-console': ['error', { allow: ['tron'] }],
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  settings: {
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src'
      }
    }
  }
};
