#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WL_MOM_DIALOGUE_DEPTH } from '../src/gameData/wlMomDialogueDepth.js';

const MAX = 240;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function walk(obj, path = '') {
  if (typeof obj === 'string') {
    assert.ok(obj.length <= MAX, `${path} too long (${obj.length})`);
    return;
  }
  if (Array.isArray(obj)) obj.forEach((v, i) => walk(v, `${path}[${i}]`));
  else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) walk(v, path ? `${path}.${k}` : k);
  }
}

walk(WL_MOM_DIALOGUE_DEPTH);
const src = readFileSync(join(root, 'src/gameData/wlMomDialogueDepth.js'), 'utf8');
assert.match(src, /my daughters ask on Monday/);
assert.match(src, /both daughters/);
assert.match(src, /enormously soft daughters in the kitchen/);
assert.match(src, /step 6 pilot/);

console.log(`test-wl-mom-depth-stub-debt: ok (max ${MAX} chars per string)`);
