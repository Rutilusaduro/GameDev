#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { HOMEROOM_GROUP_ACTIVITIES } from '../src/gameData/homeroomEvents.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const actKey = Object.keys(HOMEROOM_GROUP_ACTIVITIES).find(
  (k) => (HOMEROOM_GROUP_ACTIVITIES[k].phases || []).length > 0,
) || 'health_unit';
const FP = /Oven heat|wide tables groan|Calloway|Residents orbit|wellness framing|clipboard/i;

let hit = false;
for (let s = 0; s < 20; s += 1) {
  const line = render(`{homeroom.activity.${actKey}.p0}`, buildTextContext({
    subject: mj,
    week,
    seed: 52000 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(line.length > 50, 'short homeroom activity');
  assert.ok(!line.includes('{unresolved}'), 'unresolved homeroom activity');
  assert.doesNotMatch(line, /group activity stub/i, 'homeroom activity stub leaked @ w24');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular homeroom activity @ week ${week} (${actKey})`);
console.log('test-homeroom-activity-modular-late: ok');
