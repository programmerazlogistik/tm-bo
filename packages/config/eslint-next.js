import js from "@eslint/js";
// Import plugins at the top level
import nextEslintPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

/**
 * A custom ESLint configuration for libraries that use Next.js.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const nextJsConfig = [
  // 1. Core ESLint rules
  js.configs.recommended,

  // 2. Next.js presets using the new recommended syntax.
  // 'next/core-web-vitals' includes React, Hooks, and Next.js specific rules.
  // Using direct plugin configuration to avoid the name property issue in ESLint 9
  {
    plugins: {
      "@next/next": nextEslintPlugin,
    },
    rules: {
      // Next.js recommended rules
      "@next/next/google-font-display": "warn",
      "@next/next/google-font-preconnect": "warn",
      "@next/next/no-assign-module-variable": "error",
      "@next/next/no-async-client-component": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/no-css-tags": "error",
      "@next/next/no-document-import-in-page": "error",
      "@next/next/no-duplicate-head": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-head-import-in-document": "error",
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-page-custom-font": "warn",
      "@next/next/no-script-component-in-head": "error",
      "@next/next/no-styled-jsx-in-document": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-title-in-document-head": "error",
      "@next/next/no-typos": "error",
      "@next/next/no-unwanted-polyfillio": "warn",
    },
  },

  // 3. Your custom configurations, rules, and overrides.
  {
    files: ["src/**/*.{js,jsx}"],
    plugins: {
      // Only plugins for your custom rules are needed here.
      prettier,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // Core JavaScript/ES6 rules
      "no-console": "warn",
      "no-undef": "error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-constant-condition": "off",
      "no-constant-binary-expression": "off",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",

      // React rules that should be errors
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/no-unescaped-entities": "off",
      "react/no-typos": "error", // Catch prop name typos

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // -- Your Other Overrides --
      "@next/next/no-img-element": "off",
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        console: "readonly",
        setTimeout: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },

  // 4. TypeScript-specific configuration
  {
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      prettier,
      "@typescript-eslint": tseslint.plugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
    },
    rules: {
      // TypeScript-specific rules
      "no-undef": "off", // Disable no-undef for TypeScript as it handles type checking
      "no-unused-vars": "off", // Disable in favor of TypeScript's unused vars
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Core JavaScript/ES6 rules for TypeScript files
      "no-console": "warn",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-constant-condition": "off",
      "no-constant-binary-expression": "off",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      semi: "error",

      // React rules that should be errors
      "react/jsx-no-undef": "error",
      "react/jsx-uses-vars": "error",
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off", // Keep PropTypes optional
      "react/no-typos": "error", // Catch prop name typos

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // -- Your Other Overrides --
      "@next/next/no-img-element": "off",
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        React: "readonly",
        console: "readonly",
        setTimeout: "readonly",
      },
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
];
