#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const FP = /warmOpen|Yeasty warmth|permission baked|warmest room|They drove over hungry|raPresence|meets your eyes|hall log|appetite as family calendar|kitchen heat|report cards|grateful to belong|full plates, full hearts|branchPrompt|folds her hands/i;

const keys = [
  'wifeLessons.talk.Darlene.s1.greeting',
  'wifeLessons.talk.Wanda.s3.greeting',
  'wifeLessons.talk.Emma.s6.opt0',
];

for (const key of keys) {
  let hit = false;
  for (let s = 0; s < 12; s += 1) {
    const line = render(`{${key}}`, buildTextContext({ subject: mj, week, seed: 31000 + s }))?.trim() || '';
    assert.ok(line.length > 20, `short ${key}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved ${key}`);
    assert.doesNotMatch(line, /Mary Jane's kitchen; modular talk carries/i, `stub leaked @ w24 ${key}: ${line.slice(0, 80)}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular WL talk @ week ${week} for ${key}`);
}

console.log('test-wl-talk-modular-late: ok');
