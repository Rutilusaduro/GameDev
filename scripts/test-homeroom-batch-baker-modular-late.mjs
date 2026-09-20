#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { BATCH_BAKER_NPCS } from '../src/gameData/homeroomEvents.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const npcKey = Object.keys(BATCH_BAKER_NPCS)[0];
const stage = Object.keys(BATCH_BAKER_NPCS[npcKey] || {})[0] || '0';
const key = `{homeroom.npc.${npcKey}.s${stage}}`;

const FP = /kitchenGossip|momHeat|Hall Ambiance|batch nights|Oven warmth/i;
let hit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render(key, buildTextContext({
    subject: mj,
    week,
    seed: 64100 + s,
    globals: { featureId: 'homeroom_queen', npcKey },
  }))?.trim() || '';
  assert.ok(line.length > 45, `short ${key}`);
  assert.ok(!line.includes('{unresolved}'), `unresolved ${key}`);
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular homeroom npc @ week ${week}`);
console.log('test-homeroom-batch-baker-modular-late: ok');
