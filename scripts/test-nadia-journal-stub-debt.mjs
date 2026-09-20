#!/usr/bin/env node
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NADIA_SUBJECT_JOURNALS } from '../src/gameData/nadiaSubjectJournals.js';

const MAX = 480;
const root = join(dirname(fileURLToPath(import.meta.url)), '..');

let cells = 0;
for (const [archetype, journal] of Object.entries(NADIA_SUBJECT_JOURNALS)) {
  for (const line of journal.intro || []) {
    cells += 1;
    assert.ok(line.length <= MAX, `intro ${archetype} too long`);
    assert.match(line, /— Nadia/, `intro ${archetype} signature`);
    assert.doesNotMatch(line, /\bgirls?\b/i, `intro ${archetype} girl framing`);
  }
  for (const row of journal.entries || []) {
    for (const line of row) {
      cells += 1;
      assert.ok(line.length <= MAX, `entry ${archetype} too long`);
      assert.match(line, /— Nadia/, `entry ${archetype} signature`);
      assert.doesNotMatch(line, /\bgirls?\b/i, `entry ${archetype} girl framing`);
    }
  }
}

const src = readFileSync(join(root, 'src/gameData/nadiaSubjectJournals.js'), 'utf8');
assert.match(src, /picking a resident like her/);
assert.match(src, /strong, athletic resident/);
assert.match(src, /sorority resident/);
assert.match(src, /ultimate gamer resident/);
assert.match(src, /country-resident type/);
assert.match(src, /nurturing resident grow heavy/);
assert.match(src, /for my hall log/);
assert.match(src, /step 6 pilot/);

console.log(`test-nadia-journal-stub-debt: ok (${cells} cells, max ${MAX} chars)`);
