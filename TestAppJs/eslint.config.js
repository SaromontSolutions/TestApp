
import { defineConfig } from "eslint/config";

export default defineConfig({
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
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-unused-vars": "warn",
  },
});
