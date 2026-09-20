#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 8, name: 'Maya', archetype: 'shy', lbs: 265, fullness: 98, stomachCapacity: 100 };

const FP = /lateBrink|lateAlmost|ancient|brink|Not tonight|too full|falters/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{talk.refusal.command_devour}', buildTextContext({
    subject,
    week,
    seed: 71000 + s,
    globals: { featureId: 'floor_talk' },
  }))?.trim() || '';
  assert.ok(line.length > 100, 'short talk.refusal.command_devour');
  assert.ok(!line.includes('{unresolved}'), 'unresolved devour refusal');
  assert.ok(/full|cannot|Not tonight|falters|middle|capacity/i.test(line), 'expected devour refusal body');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular talk.refusal.command_devour @ week ${week}`);
console.log('test-talk-refusal-command-devour-modular-late: ok');
