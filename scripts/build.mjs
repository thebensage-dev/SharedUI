// Plain tsc, one module per file, because bundlers strip each file's "use client" directive.
// The CSS ships unbuilt so the consuming app's Tailwind compiles it.
import { execFileSync } from "node:child_process";
import { cpSync, rmSync } from "node:fs";
import { createRequire } from "node:module";

const tsc = createRequire(import.meta.url).resolve("typescript/bin/tsc");

rmSync("dist", { recursive: true, force: true });
execFileSync(process.execPath, [tsc, "-p", "tsconfig.build.json"], { stdio: "inherit" });
cpSync("src/styles", "dist/styles", { recursive: true });
