#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const subject = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 265, corruption: 45 };

const FP = /lateHallAir|latePermission|Hall Ambiance|Hunger hums|permission dressed|Growth as lifestyle/i;
const SHORT_BRIDGE = /^You tell her to indulge — she hears permission dressed as command\.$/;

for (const corruptionPts of [0, 22, 55]) {
  const s = { ...subject, corruption: corruptionPts };
  let hit = false;
  for (let seed = 0; seed < 16; seed += 1) {
    const line = render('{talk.encourage}', buildTextContext({
      subject: s,
      week,
      seed: 65000 + corruptionPts + seed,
      globals: { featureId: 'floor_talk' },
    }))?.trim() || '';
    assert.ok(line.length > 80, `short talk.encourage corruption=${corruptionPts}`);
    assert.ok(!line.includes('{unresolved}'), 'unresolved talk.encourage');
    if (FP.test(line)) hit = true;
    assert.ok(!SHORT_BRIDGE.test(line), 'pass-111 monolith should not win alone @ w24');
  }
  assert.ok(hit, `expected modular talk.encourage @ week ${week} corruption=${corruptionPts}`);
}

console.log('test-talk-encourage-modular-late: ok');
