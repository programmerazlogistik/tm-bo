import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import onlyWarn from "eslint-plugin-only-warn";
import prettier from "eslint-plugin-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      prettier,
      onlyWarn,
      import: importPlugin,
    },
    rules: {
      // Turbo/Monorepo rules
      "turbo/no-undeclared-env-vars": "warn",

      // Core JavaScript/ES6 rules
      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-vars": "off", // Use TypeScript version
      "no-constant-condition": "off",
      "no-constant-binary-expression": "off",
      "no-useless-escape": "off",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "object-shorthand": ["error", "always"],
      "no-duplicate-imports": "off", // Use TypeScript version
      semi: "error",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/prefer-as-const": "error",

      // Import rules
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-useless-path-segments": "error",
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", ".next/**", ".turbo/**"],
  },
];
