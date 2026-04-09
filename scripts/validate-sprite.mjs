#!/usr/bin/env node
// Validates a sprite file has exactly 24 rows × 24 columns per frame.
// Usage: node scripts/validate-sprite.mjs src/sprites/cat.ts

import fs from "node:fs";

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/validate-sprite.mjs <path>");
  process.exit(2);
}

const code = fs.readFileSync(file, "utf8");

// Match "const NAME: SpriteFrame = [ ... ];"
const frameRegex = /const\s+(\w+)\s*:\s*SpriteFrame\s*=\s*\[([\s\S]*?)\n\];/g;

let allValid = true;
let frameCount = 0;

for (const match of code.matchAll(frameRegex)) {
  frameCount++;
  const name = match[1];
  const body = match[2];

  // Each row is a line that starts (after whitespace) with "["
  const rows = body.split("\n").filter((l) => l.trim().startsWith("["));

  if (rows.length !== 24) {
    console.error(`FAIL ${file} ${name}: expected 24 rows, got ${rows.length}`);
    allValid = false;
    continue;
  }

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    // Extract everything between the outermost [ and ]
    const openIdx = row.indexOf("[");
    const closeIdx = row.lastIndexOf("]");
    if (openIdx < 0 || closeIdx < 0) {
      console.error(`FAIL ${file} ${name} row ${i}: malformed (no brackets)`);
      allValid = false;
      continue;
    }
    const inner = row.slice(openIdx + 1, closeIdx);
    // Split on commas at top level (no nested brackets inside rows, safe)
    const entries = inner.split(",").map((s) => s.trim()).filter((s) => s !== "");
    if (entries.length !== 24) {
      console.error(`FAIL ${file} ${name} row ${i}: expected 24 cols, got ${entries.length}`);
      allValid = false;
    }
  }
}

if (frameCount === 0) {
  console.error(`FAIL ${file}: no SpriteFrame declarations found`);
  process.exit(1);
}

if (allValid) {
  console.log(`OK ${file} (${frameCount} frames, all 24x24)`);
  process.exit(0);
} else {
  process.exit(1);
}
