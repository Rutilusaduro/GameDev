#!/usr/bin/env node
/** Week 24 — monolith journal openings should not win over modular field-note slots. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { FEEDER_SUBJECT_JOURNALS } from '../src/gameData/feederSubjectJournals.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX, 'test week should be past legacy bridge cap');

const LEGACY_OPENERS = [
  /^OMG, I can't believe/i,
  /^I still can't quite believe/i,
  /^It's only been a few weeks but my uniform/i,
  /^I still can't quite believe I consented/i,
];

const MODULAR_FP = /Clipboard margins|Observation beats|datapoint|Late-semester entries|journal stops pretending|appetite curves|fieldNotes|IRB paperwork|Pen scratches|Compliance reads|body admits|consent dressed|cooperates beautifully|blushes when praised/i;

const brittany = { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 280 };
const swimmer = { id: 2, name: 'Cassidy', archetype: 'swimmer', lbs: 260 };

let modularHits = 0;
let legacyHits = 0;
let samples = 0;

for (const archetype of Object.keys(FEEDER_SUBJECT_JOURNALS)) {
  const pages = FEEDER_SUBJECT_JOURNALS[archetype];
  if (!Array.isArray(pages)) continue;
  for (let page = 0; page < Math.min(pages.length, 4); page += 1) {
    for (let seed = 0; seed < 6; seed += 1) {
      const subject = archetype === 'cheerleader' ? brittany : swimmer;
      const line = render(`{journal.feeder.${archetype}.s${page}}`, buildTextContext({
        subject: { ...subject, archetype },
        week,
        seed: 12000 + page * 10 + seed,
      }))?.trim() || '';
      assert.ok(line.length > 24, `short journal ${archetype} s${page}`);
      assert.ok(!line.includes('{unresolved}'), `unresolved ${archetype} s${page}`);
      samples += 1;
      if (MODULAR_FP.test(line)) modularHits += 1;
      if (LEGACY_OPENERS.some((re) => re.test(line))) legacyHits += 1;
    }
  }
}

assert.ok(modularHits >= samples * 0.55, `expected >=55% modular journal @ week ${week}, got ${modularHits}/${samples}`);
assert.ok(legacyHits === 0, `legacy monolith openers should not render @ week ${week}, got ${legacyHits} hits`);

const raLine = render('{session.rae.arrival.s2}', buildTextContext({
  subject: swimmer,
  week,
  seed: 13001,
  globals: { featureId: 'ranked_session', sessionStage: 2 },
}))?.trim() || '';
assert.ok(raLine.length > 24, 'session Rae arrival week 24');
assert.match(
  raLine,
  /cart squeaks|Rae arrives|Clipboard, timer|session clock starts|cart is heavier|voice stays clinical|Clipboard, timer/i,
  'session arrival modular @ week 24',
);

console.log(`test-text-legacy-suppression-late: ok (${modularHits}/${samples} modular journals, 0 legacy openers @ week ${week})`);
