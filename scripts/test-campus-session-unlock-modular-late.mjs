#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderCampusEventBeat } from '../src/textEngine/scenes/campusEvent/index.js';
import { renderSessionAftermath } from '../src/textEngine/scenes/session/index.js';
import { renderRosterUnlockScene } from '../src/textEngine/scenes/unlockScene/index.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 265, mood: 'content' };
const cassidy = { id: 1, name: 'Cassidy', archetype: 'swimmer', lbs: 240 };

const FP = /hallTone|hallArrival|aftermath\.glow|Hall Ambiance|Late-semester|Wellness framing/i;

let campusHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderCampusEventBeat(destiny, week, { seed: 63000 + s })?.trim() || '';
  assert.ok(line.length > 50, 'short campus beat');
  assert.ok(!line.includes('{unresolved}'), 'unresolved campus');
  if (FP.test(line)) campusHit = true;
}
assert.ok(campusHit, 'expected modular campus beat @ week 24');

let aftermathHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderSessionAftermath(destiny, 78, week, { seed: 63100 + s })?.trim() || '';
  assert.ok(line.length > 50, 'short session aftermath');
  assert.ok(!line.includes('{unresolved}'), 'unresolved aftermath');
  if (/aftermath|Fullness settles|co-conspirator|Hall Ambiance/i.test(line)) aftermathHit = true;
}
assert.ok(aftermathHit, 'expected modular session aftermath @ week 24');

let unlockHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderRosterUnlockScene(cassidy, week)?.trim() || '';
  assert.ok(line.length > 50, 'short roster unlock');
  assert.ok(!line.includes('{unresolved}'), 'unresolved unlock');
  if (FP.test(line)) unlockHit = true;
}
assert.ok(unlockHit, 'expected modular roster unlock @ week 24');

console.log('test-campus-session-unlock-modular-late: ok');
