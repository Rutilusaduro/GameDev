#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVOLVED_REACTIONS, EVOLVED_OUTFITS } from '../src/gameData/evolvedReactionsOutfits.js';

const MAX = 120;
const SKIP = new Set(['competitive_gainer']);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const [formId, lines] of Object.entries(EVOLVED_REACTIONS)) {
  if (SKIP.has(formId) || !Array.isArray(lines)) continue;
  lines.forEach((line, idx) => {
    assert.ok(line.length <= MAX, `${formId} reaction s${idx} too long`);
    assert.match(line, /modular evolved\.reaction/i, `${formId} s${idx}`);
  });
}

for (const [formId, lines] of Object.entries(EVOLVED_OUTFITS)) {
  if (SKIP.has(formId) || !Array.isArray(lines)) continue;
  lines.forEach((line, idx) => {
    assert.ok(line.length <= MAX, `${formId} outfit s${idx} too long`);
    assert.match(line, /modular evolved\.outfit/i, `${formId} outfit s${idx}`);
  });
}

const src = readFileSync(join(root, 'src/gameData/evolvedReactionsOutfits.js'), 'utf8');
assert.match(src, /step 6/i);

console.log(`test-evolved-reactions-stub-debt: ok (max ${MAX} chars, CG refs excluded)`);
