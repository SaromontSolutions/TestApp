module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "no-console": "warn",         // Warn when console.log is used
    "semi": ["error", "always"],  // Require semicolons
    "quotes": ["error", "double"],// Enforce double quotes
    "no-unused-vars": "warn",     // Warn about unused variables
  },
};
