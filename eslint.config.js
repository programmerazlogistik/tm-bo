// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { nextJsConfig } from "@muatmuat/config/eslint-next";

const eslintConfig = [
  ...nextJsConfig,
  // Add any UI-specific overrides here if needed
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Block direct imports from packages/src directories - enforce npm package imports
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["packages/*/src/**"],
              message:
                "Import from npm packages only (e.g., @muatmuat/ui/Popover) instead of direct source imports (e.g., packages/ui/src/components/Popover)",
            },
          ],
        },
      ],
      // Additional rule to specifically catch package imports
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportDeclaration[source.value='packages/']",
          message:
            "Import from npm packages only (e.g., @muatmuat/ui/Popover) instead of direct source imports (e.g., packages/ui/src/components/Popover)",
        },
      ],
      // Allow console.error for error logging, but warn on other console methods
      "no-console": [
        "warn",
        {
          allow: ["error", "warn"],
        },
      ],
      // UI-specific rule overrides can go here
    },
  },
  // Exclude SCSS files from ESLint since they're handled by Sass/Tailwind
  {
    ignores: ["src/**/*.scss", "src/**/*.css"],
  },
];

export default eslintConfig;
