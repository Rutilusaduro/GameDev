#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderSessionFullness } from '../src/textEngine/scenes/session/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 265 };

const FP = /fullness\.pressure|fullness\.permission|Hall Ambiance|Late-semester sessions|Wellness framing holds/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = renderSessionFullness(destiny, 3, week, { seed: 64000 + s })?.trim() || '';
  assert.ok(line.length > 50, 'short session fullness');
  assert.ok(!line.includes('{unresolved}'), 'unresolved session fullness');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular session fullness @ week ${week}`);
console.log('test-session-fullness-modular-late: ok');
