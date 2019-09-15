module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "extends": ["prettier", "prettier/react"],
    "react/jsx-filename-extension": "off",
    "linebreak-style": ["error", "windows"]
  },
  parser: "babel-eslint",
  env: {
    "browser": true,
    "node": true,
    "jest": true
  }
};
