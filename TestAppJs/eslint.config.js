import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig({
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.jest,
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  rules: {
    "no-console": "warn",
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-unused-vars": "warn",
  },
  plugins: [],
  configs: [js.configs.recommended],
});
