import { config } from "@muatmuat/config/eslint-base";

const eslintConfig = [
  ...config,
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Icons-specific rule overrides can go here
    },
  },
  // Exclude TypeScript declaration files from ESLint
  {
    ignores: ["dist/**", "**/*.d.ts"],
  },
];

export default eslintConfig;
