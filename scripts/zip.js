import archiver from "archiver";
import { format } from "date-fns";
import fs from "node:fs";
import path from "node:path";

const PATHS_TO_INCLUDE = [
  ".husky",
  ".vscode",

  "packages",
  "public",
  "scripts",
  "src",

  ".example.env",
  ".gitignore",
  ".lintstagedrc.js",
  ".prettierignore",
  ".prettierrc",
  "eslint.config.js",
  "next-env.d.ts",
  "next.config.js",
  "package-lock.json",
  "package.json",
  "postcss.config.js",
  "tailwind.config.js",
  "tsconfig.json",
  "turbo.json",
];

const now = new Date();
// Use cross-platform safe timestamp
const formattedDate = format(now, "dd-MM-yyyy_HH-mm-ss");
// Get project name from root directory
const projectName = path.basename(process.cwd());
const outputFileName = `${projectName}-${formattedDate}.zip`;

const output = fs.createWriteStream(outputFileName);
const archive = archiver("zip", { zlib: { level: 1 } });

console.time("Zipping process");
output.on("close", () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log("Archive finalized and output file closed.");
  console.timeEnd("Zipping process"); // End the timer here
});

output.on("end", () => {
  console.log("Data has been drained");
});

archive.on("warning", (err) => {
  if (err.code === "ENOENT") {
    console.warn("Warning:", err.message);
  } else {
    throw err;
  }
});

archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

// Helper to parse .gitignore file and extract patterns
const parseGitignore = () => {
  const gitignorePath = path.join(process.cwd(), ".gitignore");
  if (!fs.existsSync(gitignorePath)) {
    console.warn(".gitignore file not found, using default ignore patterns");
    return ["node_modules", ".git", "dist", "build", ".next"];
  }

  const content = fs.readFileSync(gitignorePath, "utf8");
  const patterns = [];

  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    // Skip empty lines and comments
    if (trimmed && !trimmed.startsWith("#")) {
      // Remove trailing slash for consistency
      const pattern = trimmed.replace(/\/$/, "");
      if (pattern) {
        patterns.push(pattern);
      }
    }
  });

  return patterns;
};

// Helper to check if path should be ignored based on gitignore patterns
const shouldIgnore = (filePath) => {
  const relativePath = path.relative(process.cwd(), filePath);
  const normalizedPath = relativePath.replace(/\\/g, "/");

  // Parse patterns from .gitignore
  const ignorePatterns = parseGitignore();

  // Check each pattern
  for (const pattern of ignorePatterns) {
    // Handle glob patterns
    if (pattern.includes("*")) {
      const regex = pattern
        .replace(/\*\*/g, ".*")
        .replace(/\*/g, "[^/]*")
        .replace(/\./g, "\\.");

      if (
        new RegExp(`^${regex}$`).test(normalizedPath) ||
        new RegExp(`/${regex}$`).test(normalizedPath) ||
        new RegExp(`^${regex}/`).test(normalizedPath) ||
        new RegExp(`/${regex}/`).test(normalizedPath)
      ) {
        return true;
      }
    } else {
      // Exact match or directory match
      if (
        normalizedPath === pattern ||
        normalizedPath.startsWith(pattern + "/") ||
        normalizedPath.endsWith("/" + pattern) ||
        normalizedPath.includes("/" + pattern + "/")
      ) {
        return true;
      }
    }
  }

  return false;
};

// Helper to recursively add directory with filtering
const addDirectoryFiltered = (dirPath, archivePath) => {
  if (shouldIgnore(dirPath)) {
    console.warn(`Skipped ignored directory: ${dirPath}`);
    return;
  }

  const items = fs.readdirSync(dirPath);

  items.forEach((item) => {
    const fullPath = path.join(dirPath, item);
    const archiveItemPath = path.join(archivePath, item).replace(/\\/g, "/");

    if (shouldIgnore(fullPath)) {
      console.warn(`Skipped ignored: ${fullPath}`);
      return;
    }

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      addDirectoryFiltered(fullPath, archiveItemPath);
    } else {
      archive.file(fullPath, { name: archiveItemPath });
    }
  });
};

// Helper to check if path exists
const safeAdd = (itemPath, addFunc) => {
  if (fs.existsSync(itemPath)) {
    addFunc();
  } else {
    console.warn(`Skipped missing: ${itemPath}`);
  }
};

// Add individual files and folders
PATHS_TO_INCLUDE.forEach((item) => {
  const fullPath = path.resolve(item);
  safeAdd(fullPath, () => {
    if (shouldIgnore(fullPath)) {
      console.warn(`Skipped ignored item: ${item}`);
      return;
    }

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      addDirectoryFiltered(fullPath, item); // Use filtered directory adding
    } else {
      archive.file(fullPath, { name: item });
    }
  });
});

archive.finalize();
