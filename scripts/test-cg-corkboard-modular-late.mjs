#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const priya = { id: 99, name: 'Priya', archetype: 'competitive_gainer', lbs: 280 };

const FP = /corkboard|dataObsession|competitionHeat|Residents orbit|Late-semester numbers|spreadsheet pride/i;

let hit = false;
for (let s = 0; s < 16; s += 1) {
  const line = render('{cg.scene.corkboard.Invested}', buildTextContext({
    subject: priya,
    week,
    seed: 62000 + s,
    globals: { featureId: 'competitive_gainer', cgDriveTier: 'Invested', cgSceneVisit: 0 },
  }))?.trim() || '';
  assert.ok(line.length > 30, 'short cg corkboard');
  assert.ok(!line.includes('{unresolved}'), 'unresolved cg corkboard');
  assert.doesNotMatch(line, /Corkboard Invested beat 0 — Priya updates pins/i, 'stub leaked @ w24');
  if (FP.test(line)) hit = true;
}
assert.ok(hit, 'expected modular CG corkboard @ week 24');
console.log('test-cg-corkboard-modular-late: ok');
