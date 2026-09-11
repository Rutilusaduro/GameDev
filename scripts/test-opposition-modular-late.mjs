#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { renderHearingChoiceResult, renderHearingPhase } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { buildHearingCtx } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { counterSuccessLine, agendaResolveLine } from '../src/gameData/oppositionText.js';
import { renderHearingEnding } from '../src/textEngine/scenes/opposition/hearingBridge.js';
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

const REM_FP = /removalDocket|restraintFarce|institutional emergency|conditional enrollment/i;
let remHit = false;
for (let s = 0; s < 16; s += 1) {
  const p0 = renderHearingPhase('removal', 0, destiny, week)?.trim() || '';
  const p1 = renderHearingPhase('removal', 1, destiny, week)?.trim() || '';
  assert.ok(p0.length > 80 && p1.length > 80, 'short removal phase');
  assert.ok(!p0.includes('{unresolved}') && !p1.includes('{unresolved}'), 'unresolved removal phase');
  if (REM_FP.test(p0) || REM_FP.test(p1)) remHit = true;
}
assert.ok(remHit, `expected modular removal hearing phases @ week ${week}`);

const EM_FP = /emergencyExposure|emergencyStake|Scandal meter critical|observer's pen/i;
let emHit = false;
for (let s = 0; s < 8; s += 1) {
  const p0 = renderHearingPhase('emergency', 0, destiny, week)?.trim() || '';
  const p1 = renderHearingPhase('emergency', 1, destiny, week)?.trim() || '';
  assert.ok(p0.length > 80 && p1.length > 80, 'short emergency phase');
  if (EM_FP.test(p0) || EM_FP.test(p1)) emHit = true;
}
assert.ok(emHit, `expected modular emergency hearing phases @ week ${week}`);

const TESTIFY_FP = /testifyWarmth|testifyDevotion|Growth as lifestyle spoken|devotion lands/i;
let testifyHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderHearingChoiceResult('removal', 'testify', destiny, week, 1)?.trim() || '';
  assert.ok(line.length > 80, 'short testify result');
  if (TESTIFY_FP.test(line)) testifyHit = true;
}
assert.ok(testifyHit, `expected modular removal testify @ week ${week}`);

const COUNTER_FP = /counterMomentum|counterAfterglow|institutional momentum|Counter afterglow/i;
let counterHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = counterSuccessLine('feast_bribe', week)?.trim() || '';
  assert.ok(line.length > 80, 'short counter.success');
  assert.ok(!line.includes('{unresolved}'), 'unresolved counter');
  if (COUNTER_FP.test(line)) counterHit = true;
}
assert.ok(counterHit, `expected modular counter.success @ week ${week}`);

const AGENDA_FP = /agendaInstitutional|agendaHallCost|scrutiny dressed|Opposition learns/i;
let agendaHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = agendaResolveLine('wellness_audit', week)?.trim() || '';
  assert.ok(line.length > 80, 'short agenda');
  if (AGENDA_FP.test(line)) agendaHit = true;
}
assert.ok(agendaHit, `expected modular agenda @ week ${week}`);

const FEAST_REM_FP = /removalFeastPlay|cateredVote|hearing becomes dinner/i;
let feastRemHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderHearingChoiceResult('removal', 'feast', destiny, week, 1)?.trim() || '';
  assert.ok(line.length > 80, 'short removal feast');
  if (FEAST_REM_FP.test(line)) feastRemHit = true;
}
assert.ok(feastRemHit, `expected modular removal feast @ week ${week}`);

const END_FP = /endingRelief|endingEcho|policy lost to plates|Hall Ambiance climbs/i;
let endHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderHearingEnding('removal', 'discredit_feast', destiny, week)?.trim() || '';
  assert.ok(line.length > 80, 'short hearing ending');
  if (END_FP.test(line)) endHit = true;
}
assert.ok(endHit, `expected modular hearing ending @ week ${week}`);

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
