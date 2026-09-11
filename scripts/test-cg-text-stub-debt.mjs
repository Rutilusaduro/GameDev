#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
} from '../src/gameData/competitiveGainerText.js';

const MAX = 220;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const [tier, scenes] of Object.entries(CG_FILLED_CORKBOARD_SCENES)) {
  for (const line of scenes) {
    assert.ok(line.length <= MAX, `corkboard ${tier} too long`);
  }
}

for (const [stage, tiers] of Object.entries(CG_FILLED_BINGE_SCENES)) {
  for (const line of Object.values(tiers)) {
    assert.ok(line.length <= MAX, `binge ${stage} too long`);
  }
}

const src = readFileSync(join(root, 'src/gameData/competitiveGainerText.js'), 'utf8');
assert.match(src, /five more residents to the board/);
assert.match(src, /step 6 pilot/);
assert.match(src, /\{residentName\}/);

console.log(`test-cg-text-stub-debt: ok (max ${MAX} chars)`);
