#!/usr/bin/env node
/** MIGRATION step 6 — feeder monolith paragraphs stay stub-sized; voice lives in journalFragments. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FEEDER_SUBJECT_JOURNALS } from '../src/gameData/feederSubjectJournals.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const MAX_CHARS = 420;

let total = 0;
let over = 0;
for (const [archetype, pages] of Object.entries(FEEDER_SUBJECT_JOURNALS)) {
  if (!Array.isArray(pages)) continue;
  for (let i = 0; i < pages.length; i += 1) {
    const line = pages[i] || '';
    total += 1;
    assert.ok(line.length > 40, `feeder journal ${archetype} s${i} too short`);
    assert.match(line, /my RA|My RA/, `feeder journal ${archetype} s${i} missing RA frame`);
    if (line.length > MAX_CHARS) {
      over += 1;
      assert.fail(`feeder journal ${archetype} s${i} exceeds ${MAX_CHARS} chars (${line.length})`);
    }
  }
}

const src = readFileSync(join(root, 'src/gameData/feederSubjectJournals.js'), 'utf8');
assert.match(src, /step 6 pilot|MIGRATION\.md extract/, 'feederSubjectJournals should document stub migration');

console.log(`test-feeder-journal-stub-debt: ok (${total} stubs, max ${MAX_CHARS} chars)`);
