#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 255 };

const LEGACY_FP = /glance through her open door|second monitor/i;
const MODULAR_FP = /evolution is not a surprise|Floor favor rides|next stage waits|wellness-clean/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{evolution.blurb.gamer}', buildTextContext({
    subject: destiny,
    week,
    seed: 73000 + s,
  }))?.trim() || '';
  assert.ok(line.length > 35, 'short evolution blurb');
  assert.ok(!line.includes('{unresolved}'), 'unresolved evolution blurb');
  assert.doesNotMatch(line, LEGACY_FP, 'legacy evolution blurb leaked @ w24');
  if (MODULAR_FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular evolution.blurb @ week 24');
console.log('test-evolution-blurb-modular-late: ok');
