#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const FP = /canvas lights|Training tent|tables groan|Cotton candy|hay-scent|funnel|collabVoice|coachBeat|carnivalAir/i;

for (const collab of ['Brittany', 'Serena', 'Daisy']) {
  let hit = false;
  for (let s = 0; s < 12; s += 1) {
    const line = render(`{fair.training.${collab}}`, buildTextContext({
      subject: mj,
      week,
      seed: 54000 + s + collab.length,
      globals: {
        featureId: 'state_fair_queen',
        fairCollab: collab,
        mjStageBucket: 'mid',
        cStageBucket: 'mid',
      },
    }))?.trim() || '';
    assert.ok(line.length > 50, `short fair.training.${collab}`);
    assert.ok(!line.includes('{unresolved}'), `unresolved ${collab}`);
    assert.doesNotMatch(line, /^\[FT_/i, `placeholder leaked ${collab}`);
    if (FP.test(line)) hit = true;
  }
  assert.ok(hit, `expected modular fair.training.${collab} @ week ${week}`);
}

console.log('test-fair-training-modular-late: ok');
