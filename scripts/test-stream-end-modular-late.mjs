#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { renderStreamBeat } from '../src/textEngine/scenes/stream/liveBridge.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 280 };

const FP = /signoffAir|chatAfterglow|tips still ticking|Ring light cools|growth as lifestyle/i;

for (const tier of ['excellent', 'good', 'average']) {
  let hit = false;
  for (let s = 0; s < 16; s += 1) {
    const ctx = buildTextContext({
      subject: destiny,
      week,
      seed: 66000 + s,
      globals: { featureId: 'destiny_stream', overallTier: tier },
    });
    const line = renderStreamBeat(`{stream.endStream.${tier}}`, ctx, { v2DepthChance: 0 })?.trim() || '';
    assert.ok(line.length > 55, `short stream.endStream.${tier}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved stream.endStream.${tier}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular stream.endStream.${tier} @ week ${week}`);
}

const BETWEEN_FP = /betweenRoundGlow|betweenRoundChat|parasocial|growth as lifestyle|Hall Ambiance is a memory/i;
let betweenHit = false;
for (let s = 0; s < 16; s += 1) {
  const ctx = buildTextContext({
    subject: destiny,
    week,
    seed: 66200 + s,
    globals: { featureId: 'destiny_stream', perf: 'good' },
  });
  const line = renderStreamBeat('{stream.betweenRound}', ctx, { v2DepthChance: 0 })?.trim() || '';
  assert.ok(line.length > 55, 'short stream.betweenRound');
  assert.ok(!line.includes('{unresolved}'), 'unresolved betweenRound');
  if (BETWEEN_FP.test(line)) betweenHit = true;
}
assert.ok(betweenHit, `expected modular stream.betweenRound @ week ${week}`);

const TAP_FP = /tapOutBreath|tapOutChat|ring light|parasocial|growth as lifestyle/i;
for (const reason of ['fullness', 'stamina']) {
  let tapHit = false;
  for (let s = 0; s < 16; s += 1) {
    const ctx = buildTextContext({
      subject: destiny,
      week,
      seed: 66100 + s,
      globals: { featureId: 'destiny_stream' },
    });
    const line = renderStreamBeat(`{stream.tapOut.${reason}}`, ctx, { v2DepthChance: 0 })?.trim() || '';
    assert.ok(line.length > 55, `short stream.tapOut.${reason}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved stream.tapOut.${reason}`);
    if (TAP_FP.test(line)) tapHit = true;
  }
  assert.ok(tapHit, `expected modular stream.tapOut.${reason} @ week ${week}`);
}

console.log('test-stream-end-modular-late: ok');
