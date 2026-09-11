#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const renee = { id: 4, name: 'Reneé', archetype: 'cultivator', lbs: 270 };

const FP = /labAir|testerYield|peer-reviewed|Flour dust|Hall Ambiance fades/i;
let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{cultivator.beat}', buildTextContext({
    subject: renee,
    week,
    seed: 60000 + s,
    globals: { featureId: 'cultivator' },
  }))?.trim() || '';
  assert.ok(line.length > 40, 'short cultivator.beat');
  assert.ok(!line.includes('{unresolved}'), 'unresolved cultivator.beat');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular cultivator.beat @ week ${week}`);
console.log('test-cultivator-modular-late: ok');
