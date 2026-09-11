#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  EVOLUTION_BUTTON_BLURB,
  EVOLUTION_OFFER,
} from '../src/gameData/evolutionUiData.js';

const MAX = 200;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const subj = { name: 'Destiny', lbs: 240 };

for (const [key, fn] of Object.entries(EVOLUTION_BUTTON_BLURB)) {
  const line = String(fn(subj)).trim();
  assert.ok(line.length <= MAX, `blurb ${key} too long`);
  assert.match(line, /Modular evolution\.blurb/i, `blurb ${key}`);
}

for (const [arch, block] of Object.entries(EVOLUTION_OFFER)) {
  const intro = String(block.intro(subj)).trim();
  assert.ok(intro.length <= MAX, `offer ${arch} intro`);
  assert.match(intro, /Modular evolution\.offer/i, `offer ${arch} intro`);
  for (const [pid, row] of Object.entries(block.paths || {})) {
    assert.ok((row.desc || '').length <= MAX, `offer ${arch}.${pid} desc`);
    assert.match(row.desc, /week 20\+/i, `offer ${arch}.${pid}`);
  }
}

const src = readFileSync(join(root, 'src/gameData/evolutionUiData.js'), 'utf8');
assert.match(src, /step 6/i);

console.log(`test-evolution-ui-stub-debt: ok (max ${MAX} chars)`);
