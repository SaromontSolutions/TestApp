import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX parsing
        },
      },
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      env: {
        jest: true,  // Recognize Jest globals like 'test' and 'expect'
        node: true,  // Recognize 'require' and 'module'
      },
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      env: {
        browser: true,
        node: true,
      },
    },
  },
]);
