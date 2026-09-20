#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 3, name: 'Destiny', archetype: 'gamer', lbs: 265 };

const FP = /indulgenceWarmth|indulgenceInvite|Hall Ambiance|Hunger hums|Late-semester indulgence|Clipboard stays/i;
const LEGACY_FP = /The moment stretches — unhurried, intimate, hall-quiet\./;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{talk.suggest_indulgence.b10}', buildTextContext({
    subject,
    week,
    seed: 57000 + s,
    globals: { featureId: 'floor_talk', talkBranch: 'suggest_indulgence' },
  }))?.trim() || '';
  assert.ok(line.length > 40, 'short talk.suggest_indulgence.b10');
  assert.ok(!line.includes('{unresolved}'), 'unresolved suggest_indulgence');
  if (FP.test(line)) hit = true;
  assert.doesNotMatch(line, LEGACY_FP, 'pass-57 bridge monolith should not win @ w24');
}
assert.ok(hit, `expected modular talk.suggest_indulgence @ week ${week}`);
console.log('test-talk-suggest-indulgence-modular-late: ok');
