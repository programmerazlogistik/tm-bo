import { nextJsConfig } from "@muatmuat/config/eslint-next";

const eslintConfig = [
  ...nextJsConfig, // Add any UI-specific overrides here if needed
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-undef": "off",
      "no-unused-vars": "off",
      "no-console": "off",
      "@typescript-eslint/no-unused-vars": "off",
      // UI-specific rule overrides can go here
    },
  }, // Exclude SCSS files from ESLint since they're handled by Sass/Tailwind
  // Exclude SCSS files and TypeScript declaration files from ESLint
  {
    ignores: [
      "src/**/*.scss",
      "src/**/*.css",
      "**/*.d.ts",
      "src/types/**/*",
      "src/**/*.stories.*",
      "src/**/*.test.*",
    ],
  },
];

export default eslintConfig;
