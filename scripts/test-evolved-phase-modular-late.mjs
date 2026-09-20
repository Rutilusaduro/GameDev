#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 280, evolvedForm: 'eating_streamer' };

const LEGACY_FP = /ring light is on|First Real Mukbang|delivery bags are stacked off-camera/i;
const MODULAR_FP = /Ring-light heat|viewer count climbs|contagion dressed|Every bite lands|Floor heat and cooking scent|Hunger hums/i;

let hit = false;
for (let s = 0; s < 20; s += 1) {
  const line = render('{evolved.event.eating_streamer.s0.p0}', buildTextContext({
    subject: destiny,
    week,
    seed: 71000 + s,
    globals: { formId: 'eating_streamer', stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event' },
  }))?.trim() || '';
  assert.ok(line.length > 40, 'short evolved streamer phase');
  assert.ok(!line.includes('{unresolved}'), 'unresolved evolved streamer phase');
  assert.doesNotMatch(line, LEGACY_FP, 'legacy eating_streamer prose leaked @ w24');
  if (MODULAR_FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular eating_streamer phase @ week 24');
console.log('test-evolved-phase-modular-late: ok');
