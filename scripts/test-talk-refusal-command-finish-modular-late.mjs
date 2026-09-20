#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 250, fullness: 95, stomachCapacity: 100 };

const FP = /lateHush|lateTremor|Hall Ambiance|distended|too full/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{talk.refusal.command_finish}', buildTextContext({
    subject,
    week,
    seed: 70000 + s,
    globals: { featureId: 'floor_talk' },
  }))?.trim() || '';
  assert.ok(line.length > 100, 'short talk.refusal.command_finish');
  assert.ok(!line.includes('{unresolved}'), 'unresolved refusal');
  assert.ok(/wavers|can't|cannot|too full|outvotes|Captain's out|Belly won|Not tonight|stops at capacity|shakes her head/i.test(line), 'expected refusal body');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, `expected modular talk.refusal.command_finish @ week ${week}`);
console.log('test-talk-refusal-command-finish-modular-late: ok');
