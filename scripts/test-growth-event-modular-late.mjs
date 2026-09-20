#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderGrowthScene } from '../src/textEngine/scenes/growthEvent/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 280 };

const FP = /growthFrame|Hall Ambiance|Late-semester growth|co-conspirator|ge\.causeAction|injector|chamber/i;

let hit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderGrowthScene(destiny, {
    week,
    deviceId: 'growth_serum_injector',
    gainLbs: 6,
    endStage: 7,
    startStage: 6,
    stagesJumped: 1,
    seed: 65000 + s,
  }, { seed: 65000 + s })?.trim() || '';
  assert.ok(line.length > 80, 'short growth scene');
  assert.ok(!line.includes('{unresolved}'), 'unresolved growth scene');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular growth frame @ week ${week}`);
console.log('test-growth-event-modular-late: ok');
