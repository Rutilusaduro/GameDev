#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 320, evolvedForm: 'eating_streamer' };

const LEGACY_FP = /National qualifier|ring light|820 pounds/i;
const MODULAR_FP = /contagion dressed|growth as lifestyle|Residents notice|Every bite lands/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{evolved.reaction.eating_streamer.s2}', buildTextContext({
    subject: destiny,
    week,
    seed: 72000 + s,
    globals: { evolvedFormId: 'eating_streamer', formId: 'eating_streamer' },
  }))?.trim() || '';
  assert.ok(line.length > 30, 'short evolved reaction');
  assert.ok(!line.includes('{unresolved}'), 'unresolved evolved reaction');
  assert.doesNotMatch(line, LEGACY_FP, 'legacy reaction leaked @ w24');
  if (MODULAR_FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular evolved.reaction @ week 24');
console.log('test-evolved-reaction-modular-late: ok');
