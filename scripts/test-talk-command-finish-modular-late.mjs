#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 275, corruption: 55 };

const FP = /lateFloor|lateAuthority|Hall Ambiance|clean plates|growth as lifestyle|Hunger hums/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{talk.command_finish}', buildTextContext({
    subject,
    week,
    seed: 67000 + s,
    globals: { featureId: 'floor_talk' },
  }))?.trim() || '';
  assert.ok(line.length > 120, 'short talk.command_finish');
  assert.ok(!line.includes('{unresolved}'), 'unresolved talk.command_finish');
  assert.ok(/obey|plate|folds her hands|couldn't stop|Yes, RA|cleans every/i.test(line), 'expected Phase C body after prepend');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular talk.command_finish prepend @ week ${week}`);
console.log('test-talk-command-finish-modular-late: ok');
