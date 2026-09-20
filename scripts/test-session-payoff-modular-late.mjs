#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 280, corruption: 1 };

const FP = /Rae logs|cart squeaks|scale remembers|datapoint|Clipboard, timer|Hall Ambiance/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{session.payoff.legacy.s0}', buildTextContext({
    subject: destiny,
    week,
    seed: 53000 + s,
    globals: { featureId: 'ranked_session', sessionGain: 12, sessionEndReason: 'focus_out' },
  }))?.trim() || '';
  assert.ok(line.length > 35, 'short session payoff');
  assert.ok(!line.includes('{unresolved}'), 'unresolved session payoff');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular session payoff @ week 24');
console.log('test-session-payoff-modular-late: ok');
