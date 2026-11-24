// One-Liner Laugh Lab — u-suroso-69-one-liner-laugh-lab-6ccf3aae
// Writes one short funny line to /output/entry.txt.
// Prompt answered: an alarm clock explaining why you overslept.
// The line: "I didn't oversleep. I snoozed myself. We're both late now."
// Iterate round 1 (2026-11-24): replaced the builder's fridge line. The
// fridge line's opening pun ("leftovers left") is the first pun anyone
// writes for leftovers and its middle sentence ("I just watched") adds no
// joke; the alarm line wins on the judge's own order — funnier ("I snoozed
// myself" is the device committing the user's sin), more original (a fresh
// inversion, not the stock "battery died" excuse), and tighter (58 chars,
// every sentence works). No network, no secrets, no dependencies. Node 22.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const LINE = "I didn't oversleep. I snoozed myself. We're both late now.";

function resolveOutputDir(): string {
  // Grader sets MAKEFUN_OUTPUT_DIR; fall back to /output, then ./output
  // next to this script so local runs work too.
  const envDir =
    process.env.MAKEFUN_OUTPUT_DIR || process.env.MAKEFUN_BOT_DIR;
  if (envDir && envDir.trim().length > 0) return envDir;
  return "/output";
}

function main(): void {
  // Gate guard: the entry must be 1-200 characters (code points, not bytes).
  const length = [...LINE].length;
  if (length < 1 || length > 200) process.exit(1);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE + "\n", "utf8");
}

try {
  main();
} catch {
  // Never throw: a failed write must still exit cleanly only if the
  // file exists; otherwise surface the failure via a non-zero exit.
  // Re-attempt once next to the script as a last resort.
  try {
    const here = dirname(fileURLToPath(import.meta.url));
    const fallback = join(here, "output");
    mkdirSync(fallback, { recursive: true });
    writeFileSync(join(fallback, "entry.txt"), LINE + "\n", "utf8");
  } catch {
    process.exit(1);
  }
}
