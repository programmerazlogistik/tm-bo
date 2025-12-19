// .lintstagedrc.js
const path = require("path");

// This function builds the command for `next lint` as recommended in the Next.js docs.
// It ensures that only the staged files are passed to the linter.
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  // Run on all JS/TS/JSX/TSX files
  "*.{js,jsx,ts,tsx}": [
    buildEslintCommand, // Use the Next.js-recommended lint command
    "prettier --write", // Run Prettier to format
  ],

  // Run Prettier on other file types
  "*.{json,md,css,scss,html}": ["prettier --write"],
};
