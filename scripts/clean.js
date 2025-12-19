#!/usr/bin/env node
// clean.mjs
import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
import { pathToFileURL } from "url";

/**
 * Simplified clean script that removes files/directories listed in .gitignore
 * while protecting important files from deletion.
 */

// ---------- CONFIGURATION ----------
const SKIP = [".env*", ".git", "package.json", "package-lock.json", ".claude"];

// ---------- CLI ARGUMENTS ----------
function getArg(flag, fallback = null) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return fallback;
  const next = process.argv[idx + 1];
  if (!next || next.startsWith("-")) return true;
  return next;
}

const FLAGS = {
  dryRun: !!getArg("--dry-run", false),
  yes: !!getArg("--yes", false),
  verbose: !!getArg("--verbose", false),
  cwd: (() => {
    const val = getArg("--cwd", null);
    return val ? path.resolve(val) : process.cwd();
  })(),
};

// ---------- UTILITIES ----------
function toPosix(p) {
  return p.replaceAll("\\", "/");
}

function shouldSkip(pattern) {
  const normalized = toPosix(pattern)
    .replace(/^\.\/+/, "")
    .trim();
  return SKIP.some((skip) => {
    const skipPattern = toPosix(skip).replace(/\*/g, ".*");
    return (
      new RegExp(`^${skipPattern}$`).test(normalized) ||
      normalized === skip ||
      normalized.startsWith(skip.replace(/\*$/, "")) ||
      (skip === ".env" && normalized.startsWith(".env"))
    );
  });
}

function normalizePattern(pattern) {
  let glob = toPosix(pattern);
  if (glob.startsWith("/")) glob = glob.slice(1);
  if (glob.endsWith("/")) {
    glob = `**/${glob.slice(0, -1)}`;
  } else if (!glob.includes("/") && !glob.includes("*")) {
    glob = `**/${glob}`;
  }
  return glob.trim();
}

// ---------- LOGGING ----------
function log(msg, type = "info") {
  const colors = {
    info: "\x1b[36mℹ\x1b[0m",
    warn: "\x1b[33m⚠\x1b[0m",
    error: "\x1b[31m✖\x1b[0m",
    success: "\x1b[32m✔\x1b[0m",
    header: "\x1b[1m",
  };

  const prefix = colors[type] || colors.info;
  const suffix = type === "header" ? "\x1b[0m" : "";
  console.log(`${prefix} ${msg}${suffix}`);
}

// ---------- .gitignore PARSING ----------
function readGitignore(cwd) {
  const gitignorePath = path.join(cwd, ".gitignore");

  if (!fs.existsSync(gitignorePath)) {
    log("No .gitignore file found!", "error");
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(gitignorePath, "utf8");
    return content
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => {
        if (
          !line ||
          line.startsWith("#") ||
          line.startsWith("!") ||
          line.startsWith(" ")
        )
          return false;
        const hashAt = line.indexOf(" #");
        return hashAt > -1 ? line.slice(0, hashAt).trim().length > 0 : true;
      })
      .map((line) => {
        const hashAt = line.indexOf(" #");
        return hashAt > -1 ? line.slice(0, hashAt).trim() : line;
      });
  } catch (error) {
    log(`Error reading .gitignore: ${error.message}`, "error");
    process.exit(1);
  }
}

// ---------- CLEANING ----------
async function cleanPattern(pattern) {
  if (shouldSkip(pattern)) {
    return {
      pattern,
      status: FLAGS.dryRun ? "would-skip" : "skipped",
      reason: "protected by SKIP list",
    };
  }

  const glob = normalizePattern(pattern);

  try {
    if (FLAGS.dryRun) {
      return { pattern, status: "would-remove", glob };
    }

    await rimraf(glob, {
      glob: { cwd: FLAGS.cwd },
      maxBusyTries: 3,
      preserveRoot: false,
    });

    return { pattern, status: "cleaned", glob };
  } catch (error) {
    return {
      pattern,
      status: "error",
      reason: error.message,
      glob,
    };
  }
}

async function confirmIfNeeded(count) {
  if (FLAGS.yes || count < 10) return true;

  return new Promise((resolve) => {
    process.stdout.write(
      `\x1b[33m?\x1b[0m Proceed to ${FLAGS.dryRun ? "simulate removal for" : "remove"} ${count} pattern(s)? [y/N] `
    );
    process.stdin.setEncoding("utf8");
    process.stdin.once("data", (data) => {
      const answer = String(data).trim().toLowerCase();
      resolve(answer === "y" || answer === "yes");
    });
  });
}

// ---------- MAIN ----------
async function main() {
  const start = Date.now();

  try {
    if (FLAGS.cwd && FLAGS.cwd !== process.cwd()) {
      process.chdir(FLAGS.cwd);
    }

    log(`${FLAGS.dryRun ? "Dry run: " : ""}Workspace cleanup`, "header");

    const patterns = readGitignore(process.cwd());
    if (patterns.length === 0) {
      log("No patterns to clean.", "warn");
      process.exit(0);
    }

    log(
      `Found ${patterns.length} patterns from .gitignore in ${process.cwd()}`
    );

    const proceed = await confirmIfNeeded(patterns.length);
    if (!proceed) {
      log("Aborted by user.", "warn");
      process.exit(0);
    }

    const results = await Promise.allSettled(
      patterns.map((p) => cleanPattern(p))
    );

    const processed = results.map((r) =>
      r.status === "fulfilled"
        ? r.value
        : {
            status: "error",
            reason: r.reason?.message || "unknown",
          }
    );

    let cleaned = 0,
      skipped = 0,
      errored = 0,
      wouldRemove = 0;
    const skippedFiles = [];

    for (const result of processed) {
      switch (result.status) {
        case "cleaned":
          cleaned++;
          break;
        case "skipped":
        case "would-skip":
          skipped++;
          skippedFiles.push(result.pattern);
          break;
        case "would-remove":
          wouldRemove++;
          break;
        case "error":
          errored++;
          break;
      }

      if (
        FLAGS.verbose &&
        (result.status === "error" ||
          result.status === "skipped" ||
          result.status === "would-skip")
      ) {
        log(
          `${result.pattern}: ${result.reason || result.status}`,
          result.status === "error" ? "error" : "warn"
        );
      }
    }

    const duration = ((Date.now() - start) / 1000).toFixed(1);

    log("\n✨ Cleanup Complete", "header");

    if (FLAGS.dryRun) {
      log(`${wouldRemove} would remove`);
      log(`${skipped} would skip (protected patterns)`);
    } else {
      log(`${cleaned} cleaned`);
      log(`${skipped} skipped (protected patterns)`);
    }

    if (skippedFiles.length > 0) {
      log(`Skipped files: ${skippedFiles.join(", ")}`, "info");
    }

    if (errored > 0) log(`${errored} errors`, "error");
    log(`${duration}s elapsed`);

    if (errored === 0 && !FLAGS.dryRun) {
      log("🎉 Your workspace is clean and ready!", "success");
    }

    process.exit(errored > 0 ? 1 : 0);
  } catch (error) {
    log(error?.message || String(error), "error");
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
