#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 280 };

const FP = /butter and suspicion|Floor check-in|wellness framing|clipboard stays closed|Recipe cards|Tuesday anticipation/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{homeroom.conference.Mrs_Calloway.intro}', buildTextContext({
    subject: mj,
    week,
    seed: 42000 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(line.length > 24, 'short homeroom conference intro');
  assert.ok(!line.includes('{unresolved}'), 'unresolved homeroom intro');
  assert.doesNotMatch(line, /conference bridge — kitchen queen/i, 'stub leaked @ w24');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular homeroom conference @ week 24');
console.log('test-homeroom-conference-modular-late: ok');
