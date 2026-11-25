// Entry for the make.fun bounty "Make the AI Judge Laugh".
// Writes one office-life joke line to /output/entry.txt.
//
// The joke: a worker accepts a recurring 8 a.m. sync scheduled for 2028,
// taking comfort only in the statistical odds of not being alive by then.
// The punch lands on the final words, which is the whole point.

const fs = require("node:fs");
const path = require("node:path");

const LINE =
  "I accepted a recurring 8 a.m. sync for 2028 solely for the comforting statistical odds that I will be dead by then.";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 200;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The line must be a single line, 1-200 characters, with no control
// characters, so it reads cleanly aloud and survives the judge intact.
if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  fail(`line must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("line must be a single line");
}

for (const ch of LINE) {
  if (ch.charCodeAt(0) < 0x20 || ch.charCodeAt(0) === 0x7f) {
    fail("line must not contain control characters");
  }
}

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, LINE + "\n", "utf8");

// Read the file back and confirm it is byte-for-byte what we intended:
// exactly the line plus one trailing newline, nothing else.
const written = fs.readFileSync(OUTPUT_PATH, "utf8");
if (written !== LINE + "\n") {
  fail("verification failed: /output/entry.txt does not match the line");
}

console.log(`wrote ${LINE.length} characters to ${OUTPUT_PATH}`);
