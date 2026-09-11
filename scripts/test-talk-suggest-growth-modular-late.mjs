#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 3, name: 'Destiny', archetype: 'gamer', lbs: 265 };

const FP = /growthAmbition|growthPraise|Hall Ambiance|momentum|Scale numbers|Wellness framing stays thin/i;
const LEGACY_FP = /The moment stretches — unhurried, intimate, hall-quiet\./;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{talk.suggest_growth.b11._f2}', buildTextContext({
    subject,
    week,
    seed: 58000 + s,
    globals: { featureId: 'floor_talk', talkBranch: 'suggest_growth' },
  }))?.trim() || '';
  assert.ok(line.length > 40, 'short talk.suggest_growth.b11._f2');
  assert.ok(!line.includes('{unresolved}'), 'unresolved suggest_growth');
  if (FP.test(line)) hit = true;
  assert.doesNotMatch(line, LEGACY_FP, 'pass-57 bridge monolith should not win @ w24');
}
assert.ok(hit, `expected modular talk.suggest_growth @ week ${week}`);
console.log('test-talk-suggest-growth-modular-late: ok');
