#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { renderHearingChoiceResult } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { buildHearingCtx } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 270 };

const OPEN_FP = /boardPressure|hearingHeat|institutional|Hall Ambiance cannot/i;
let openHit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{opposition.hearing.open}', buildHearingCtx(destiny, week, 'removal', 0, { seed: 68000 + s }))?.trim() || '';
  assert.ok(line.length > 80, 'short opposition.hearing.open');
  assert.ok(!line.includes('{unresolved}'), 'unresolved hearing.open');
  if (OPEN_FP.test(line)) openHit = true;
}
assert.ok(openHit, `expected modular opposition.hearing.open @ week ${week}`);

const FEAST_FP = /cateredVote|boardAppetite|Hearing catered|Appetite interrupts/i;
let feastHit = false;
for (let s = 0; s < 16; s += 1) {
  const line = renderHearingChoiceResult('emergency', 'feast_bribe', destiny, week, 1)?.trim() || '';
  assert.ok(line.length > 80, 'short feast_bribe');
  assert.ok(!line.includes('{unresolved}'), 'unresolved feast_bribe');
  if (FEAST_FP.test(line)) feastHit = true;
}
assert.ok(feastHit, `expected modular feast_bribe @ week ${week}`);

const SYN_FP = /endgameAbundance|synthesisEcho|Scarcity folds|Passive abundance/i;
let synHit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{opposition.endgame.synthesis}', endgameCtx(destiny, week, s))?.trim() || '';
  assert.ok(line.length > 80, 'short endgame.synthesis');
  assert.ok(!line.includes('{unresolved}'), 'unresolved endgame.synthesis');
  if (SYN_FP.test(line)) synHit = true;
}
assert.ok(synHit, `expected modular opposition.endgame.synthesis @ week ${week}`);

function endgameCtx(subject, w, seed) {
  return buildTextContext({ subject, week: w, seed: 69000 + seed, globals: { featureId: 'opposition_endgame' } });
}

console.log('test-opposition-modular-late: ok');
