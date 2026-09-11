#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { EVOLVED_ACTIVITY_TEXT } from '../src/gameData/evolvedActivityData.js';

const MAX = 200;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const subj = { lbs: 275, name: 'Tester' };

for (const [formId, beats] of Object.entries(EVOLVED_ACTIVITY_TEXT)) {
  if (!Array.isArray(beats)) continue;
  beats.forEach((fn, idx) => {
    const line = typeof fn === 'function' ? String(fn(subj)).trim() : String(fn || '');
    assert.ok(line.length <= MAX, `${formId} beat ${idx} too long (${line.length})`);
    assert.match(line, /Modular evolved\.activity/i, `${formId} beat ${idx}`);
  });
}

const src = readFileSync(join(root, 'src/gameData/evolvedActivityData.js'), 'utf8');
assert.match(src, /step 6/i);

console.log(`test-evolved-activity-stub-debt: ok (max ${MAX} chars)`);
