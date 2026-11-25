// Laugh Track: The Crypto Trading Joke Contest — one-line crypto trading joke.
// Writes the winning line (and nothing else, no trailing newline) to entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke in three beats: the win, the fees eating it, the punch.
// Each beat carries its own concrete number so the line lands on one read.
const segments: string[] = [
  "I finally closed a trade $212 in profit,",
  "then the network took $198 in gas, the exchange took $11,",
  "and I celebrated my three-dollar empire.",
];

function buildLine(parts: readonly string[]): string {
  if (parts.length !== 3) {
    throw new Error(`expected exactly 3 beats, got ${parts.length}`);
  }
  for (const part of parts) {
    // Every beat must carry a concrete number — digit or number word.
    if (!/\d|\b(one|two|three|eleven)\b/i.test(part)) {
      throw new Error(`beat carries no concrete number: ${part}`);
    }
  }
  const line = parts.join(" ");
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${chars}`);
  }
  if (line.includes("\n") || line.trim() !== line) {
    throw new Error("entry line must be a single clean line");
  }
  return line;
}

const ENTRY_JOKE = buildLine(segments);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_JOKE, "utf8");
console.log(
  `Wrote ${[...ENTRY_JOKE].length} characters to ${join(outDir, "entry.txt")}`,
);
