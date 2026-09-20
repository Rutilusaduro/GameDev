#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  HOMEROOM_CONFERENCE_EVENTS,
  HOMEROOM_GROUP_ACTIVITIES,
} from '../src/gameData/homeroomEvents.js';

const MAX = 200;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  assert.ok((ev.text || '').length <= MAX, `conference ${key} intro`);
  for (const ch of ev.choices || []) {
    const r = typeof ch.result === 'function' ? '' : (ch.result || '');
    assert.ok(r.length <= MAX, `conference ${key}.${ch.id} result`);
  }
}

for (const [key, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  const phases = act.phases || [{ text: act.text, choices: act.choices }];
  phases.forEach((ph, pi) => {
    assert.ok((ph.text || '').length <= MAX, `activity ${key} p${pi}`);
    for (const ch of ph.choices || []) {
      const r = typeof ch.result === 'function' ? '' : (ch.result || '');
      assert.ok(r.length <= MAX, `activity ${key} p${pi}.${ch.id}`);
    }
  });
}

const src = readFileSync(join(root, 'src/gameData/homeroomEvents.js'), 'utf8');
assert.match(src, /step 6 pilot/);
assert.match(src, /Narrow waist, wide hips/);

console.log(`test-homeroom-events-stub-debt: ok (max ${MAX} chars)`);
