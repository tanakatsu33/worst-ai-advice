import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Opening clause: the terrible advice itself, delivered with a straight face.
const ADVICE_CLAUSE =
  "Accept the first salary offer immediately, and mention you'd have done it for less.";
// Closing kicker: a confident one-line justification that makes it worse.
const KICKER_SENTENCE = "Gratitude is the strongest negotiation strategy.";
// The full one-line entry: clause and kicker joined by a single space.
const ENTRY = `${ADVICE_CLAUSE} ${KICKER_SENTENCE}`;

// Maximum entry length in characters (Unicode code points), per the make.fun rules.
const MAX_ENTRY_CHARS = 140;

// Reject entries that are empty, too long, multi-line, or whitespace-only.
function validateEntry(text: string): void {
  const length = [...text].length;
  if (length < 1 || length > MAX_ENTRY_CHARS) {
    throw new Error(
      `Entry must be 1 to ${MAX_ENTRY_CHARS} characters, got ${length}.`,
    );
  }
  if (/[\r\n]/.test(text)) {
    throw new Error(
      `Entry must be a single line, but contains a line break (${length} characters).`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error(
      `Entry must not be only whitespace (got ${length} whitespace characters).`,
    );
  }
}

validateEntry(ENTRY);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), `${ENTRY}\n`, "utf8");
