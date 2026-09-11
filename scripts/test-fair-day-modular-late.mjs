#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const FP = /Cotton candy|Crowd noise|Phones rise|announcer|Mary Jane stands|co-conspirator|funnel[- ]cake|Hay-scent|Judges lean|ribbon categories|platform scale|weighInBeat|weigh-in line/i;

const keys = [
  'fair.day.weighIn.open',
  'fair.day.weighIn.choice1',
  'fair.day.weighIn.endingA',
  'fair.day.judging',
  'fair.day.afterparty.open',
];
for (const key of keys) {
  let hit = false;
  for (let s = 0; s < 16; s += 1) {
    const line = render(`{${key}}`, buildTextContext({
      subject: mj,
      week,
      seed: 51000 + s,
      globals: { featureId: 'state_fair_queen', fairStageIdx: 2, fairInfluence: 'Brittany' },
    }))?.trim() || '';
    assert.ok(line.length > 40, `short ${key}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved ${key}`);
    assert.doesNotMatch(line, /^\[FD_/i, `placeholder leaked ${key}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular fair day @ week ${week} for ${key}`);
}

console.log('test-fair-day-modular-late: ok');
