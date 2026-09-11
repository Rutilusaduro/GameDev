#!/usr/bin/env node
/** Key fragment pools should have enough variants for late-game variety (text overhaul). */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const MIN_STRINGS = 4;
const POOLS = [
  'fair.day.carnivalAir',
  'fair.day.crowdBeat',
  'fair.day.mjPride',
  'journal.scene.fieldNotes',
  'homeroom.scene.floorTone',
  'wl.lesson.aroma',
  'cg.scene.dataObsession',
  'cg.scene.competitionHeat',
  'evolved.scene.sumoDohyo',
  'evolution.blurb.threshold',
  'fair.day.judgingBeat',
  'homeroom.activity.communityWarmth',
  'homeroom.scene.choiceWarmth',
  'dinner.dish.savor',
  'campusEvent.scene.hallTone',
  'hunt.feast.hungerCall',
  'contest.scene.crowdHeat',
  'wl.talk.warmOpen',
  'fair.training.coachBeat',
  'fair.training.collabVoice',
  'fair.boost.partnerHype',
  'fair.photo.collabFrame',
  'talk.suggest.indulgenceInvite',
  'fair.day.weighInBeat',
  'talk.suggest.growthPraise',
  'sumo.scene.dohyo',
  'recording.scene.ringLight',
  'weekly.scene.floorEcho',
];

for (const key of POOLS) {
  const variants = _registryEntries().find(([k]) => k === key)?.[1] || [];
  let strings = 0;
  for (const v of variants) {
    const t = v.text;
    const arr = typeof t === 'function' ? [] : (Array.isArray(t) ? t : [t]);
    strings += arr.filter((s) => typeof s === 'string' && s.length > 8).length;
  }
  assert.ok(strings >= MIN_STRINGS, `${key}: expected >=${MIN_STRINGS} string variants, got ${strings}`);
}

console.log(`test-modular-pool-depth: ok (${POOLS.length} pools >= ${MIN_STRINGS} variants)`);
