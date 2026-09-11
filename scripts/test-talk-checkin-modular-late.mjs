#!/usr/bin/env node
/** Week 24 — talk.check_in must be slot-composed (not bulk pass57 monolith). */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);

const brittany = { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 200 };
const MODULAR = /Brittany straightens|talk\.checkIn|planner down|snack stash|greetQuote|Ambient noise|Fabric strains/i;

let hit = false;
for (let seed = 0; seed < 24; seed += 1) {
  const line = render('{talk.check_in}', buildTextContext({ subject: brittany, week, seed: 9000 + seed }))?.trim() || '';
  assert.ok(line.length > 20, 'short talk.check_in');
  assert.ok(!line.includes('{unresolved}'), 'unresolved talk.check_in');
  if (MODULAR.test(line)) hit = true;
}

assert.ok(hit, 'expected modular talk.check_in fingerprint @ week 24');
console.log('test-talk-checkin-modular-late: ok');
