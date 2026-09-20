#!/usr/bin/env node
/** Every EVOLVED_EVENTS form (except dedicated fragment files) renders modular @ week 24. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { EVOLVED_EVENTS } from '../src/gameData/evolvedEvents.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);

const SKIP = new Set(['sumo', 'eating_streamer', 'salon_appetit', 'artisan_gallery']);
const BRIDGE_FP = /bridge — \d+ lbs on the log\. Modular evolved\.scene @ week 20\+/i;
const MODULAR_FP = /Hunger hums|Floor heat and cooking|Fabric strains|Every choice tonight|contagion dressed|growth as lifestyle|Late-semester|appetite public|Chanko steam|Wine and butter|Delivery bags|Hall log|workshop hums|Booth steam|Lane-captain|Ring-light|Competition bib|Cotton candy|Yeasty warmth|Wednesday feast|Cart squeaks|Blueprint ink|Someone whispers|Ambient noise drops|Crowd noise swells|Clipboard, lanyard|wellness framing|judge calls her number|Pool-deck steam|Wide tables groan/i;

const subject = { id: 1, name: 'Tester', archetype: 'gamer', lbs: 280 };

let tested = 0;
let modularHits = 0;

for (const formId of Object.keys(EVOLVED_EVENTS)) {
  if (SKIP.has(formId)) continue;
  const stages = EVOLVED_EVENTS[formId];
  if (!stages?.[0]?.phases?.[0]) continue;
  tested += 1;
  let formModular = false;
  for (let attempt = 0; attempt < 4; attempt += 1) {
    const line = render(`{evolved.event.${formId}.s0.p0}`, buildTextContext({
      subject: { ...subject, evolvedForm: formId },
      week,
      seed: 75000 + tested * 17 + attempt * 991,
      globals: { formId, stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event', evolvedFormId: formId },
    }))?.trim() || '';
    assert.ok(line.length > 35, `${formId} phase too short`);
    assert.ok(!line.includes('{unresolved}'), `${formId} unresolved`);
    assert.doesNotMatch(line, BRIDGE_FP, `${formId} stub bridge leaked @ w24`);
    if (MODULAR_FP.test(line)) formModular = true;
  }
  if (formModular) modularHits += 1;
}

assert.ok(tested >= 12, `expected >=12 forms, got ${tested}`);
assert.ok(modularHits >= Math.ceil(tested * 0.65), `expected >=65% modular evolved forms @ w24 (${modularHits}/${tested})`);
console.log(`test-evolved-all-forms-modular-late: ok (${modularHits}/${tested} modular)`);
