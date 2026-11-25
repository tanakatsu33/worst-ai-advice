import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SETUP =
  "Accept the first salary offer immediately, and mention you'd have done it for less.";
const KICKER = "Gratitude is the strongest negotiation strategy.";
const ENTRY = `${SETUP} ${KICKER}`;

function checkEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > 140) {
    throw new Error(`Entry must be 1 to 140 characters, got ${length}.`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("Entry must be a single line.");
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be only whitespace.");
  }
}

checkEntry(ENTRY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${ENTRY}\n`, "utf8");
