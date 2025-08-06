import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

// import env presets from @eslint/js
const { env: { browser, node, jest } } = js;

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
          jsx: true,
        },
      },
      // Spread the browser env here
      env: browser,
    },
  },
  {
    files: ["**/*.test.js"],
    languageOptions: {
      env: {
        ...jest,
        ...node,
      },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      env: {
        ...browser,
        ...node,
      },
    },
  },
]);
