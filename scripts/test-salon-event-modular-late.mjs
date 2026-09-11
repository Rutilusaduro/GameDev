#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const chloe = { id: 9, name: 'Chloé', archetype: 'transfer', lbs: 270, evolvedForm: 'salon_appetit' };

const LEGACY_FP = /In Paris we are taught to stop|Première Soirée/i;
const MODULAR_FP = /Wine and butter|salon nights|Chloé pours|Floor heat|Hunger hums/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{evolved.event.salon_appetit.s0.p0}', buildTextContext({
    subject: chloe,
    week,
    seed: 74000 + s,
    globals: { formId: 'salon_appetit', stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event' },
  }))?.trim() || '';
  assert.ok(line.length > 40, 'short salon phase');
  assert.ok(!line.includes('{unresolved}'), 'unresolved salon phase');
  assert.doesNotMatch(line, LEGACY_FP, 'legacy salon prose leaked @ w24');
  if (MODULAR_FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular salon_appetit phase @ week 24');
console.log('test-salon-event-modular-late: ok');
