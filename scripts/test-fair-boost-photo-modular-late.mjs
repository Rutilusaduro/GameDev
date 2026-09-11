#!/usr/bin/env node
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const BOOST_FP = /Midway grease|Funnel-cake|Cotton candy|midwayPush|partnerHype|mjPride/i;
const PHOTO_FP = /Pageant lights|pageantGlow|collabFrame|carnivalAir|Ring-light/i;

for (const collab of ['Brittany', 'Renee', 'Lilith']) {
  let boostHit = false;
  let photoHit = false;
  for (let s = 0; s < 24; s += 1) {
    const boostLine = render(`{fair.boost.${collab}}`, buildTextContext({
      subject: mj,
      week,
      seed: 55000 + s + collab.length,
      globals: { featureId: 'state_fair_queen', fairCollab: collab, fairBoostTier: 2 },
    }))?.trim() || '';
    assert.ok(boostLine.length > 50, `short fair.boost.${collab}`);
    assert.ok(!boostLine.includes('{unresolved}'), `unresolved boost ${collab}`);
    if (BOOST_FP.test(boostLine)) boostHit = true;

    const photoLine = render(`{fair.photo.${collab}}`, buildTextContext({
      subject: mj,
      week,
      seed: 56000 + s + collab.length,
      globals: { featureId: 'state_fair_queen', fairCollab: collab, mjStageBucket: 'mid' },
    }))?.trim() || '';
    assert.ok(photoLine.length > 50, `short fair.photo.${collab}`);
    assert.ok(!photoLine.includes('{unresolved}'), `unresolved photo ${collab}`);
    if (PHOTO_FP.test(photoLine)) photoHit = true;
  }
  assert.ok(boostHit, `expected modular fair.boost.${collab} @ week ${week}`);
  assert.ok(photoHit, `expected modular fair.photo.${collab} @ week ${week}`);
}

console.log('test-fair-boost-photo-modular-late: ok');
