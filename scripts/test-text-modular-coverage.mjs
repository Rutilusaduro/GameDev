#!/usr/bin/env node
/** Modular text pilot — slot pools exist and fragment files meet minimum breadth. */
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';
import { EVOLVED_MODULAR_STATS } from '../src/textEngine/scenes/evolved/eventPhaseFragments.js';

const root = join(import.meta.dirname, '..');

function poolTextCount(key) {
  const variants = _registryEntries().find(([k]) => k === key)?.[1];
  if (!variants) return 0;
  let n = 0;
  for (const v of variants) {
    const texts = Array.isArray(v.text) ? v.text : [v.text];
    n += texts.filter((t) => typeof t === 'string' && t.trim()).length;
  }
  return n;
}

const SLOT_KEYS = [
  'wl.lesson.aroma',
  'wl.lesson.mjDoctrine',
  'wl.talk.warmOpen',
  'wl.talk.branchAnswer',
  'evolved.scene.atmosphere',
  'evolved.choice.chatReact',
  'evolved.ending.streamCoda',
  'homeroom.scene.floorTone',
  'fair.day.carnivalAir',
  'fair.day.mjPride',
  'homeroom.activity.kitchenHeat',
  'cg.chat.boardTone',
  'cg.chat.residentReply',
  'journal.scene.fieldNotes',
  'journal.scene.subjectFocus',
  'session.scene.deliveryAir',
  'session.scene.raePresence',
  'journal.scene.lateObsession',
  'evolved.reaction.witness',
  'evolved.reaction.appetite',
  'evolution.offer.hallTone',
  'evolution.offer.transformation',
  'evolved.outfit.fabricStrain',
  'evolved.outfit.pride',
  'evolution.blurb.threshold',
  'evolution.blurb.raStakes',
  'session.tapOut.breath',
  'session.tapOut.surrender',
  'roster.unlock.hallArrival',
  'roster.unlock.firstHunger',
  'cg.chat.followupSting',
  'cg.chat.followupPride',
  'hall.blueprint.construction',
  'hall.blueprint.permission',
  'session.blobIntro.scale',
  'session.immobile.care',
  'homeroom.npc.kitchenGossip',
  'cg.scene.dataObsession',
  'cg.scene.competitionHeat',
  'cultivator.scene.labAir',
  'cultivator.scene.testerYield',
  'cg.raReply.wellnessFrame',
  'cg.raReply.boardNudge',
  'session.fullness.pressure',
  'session.fullness.permission',
];

for (const key of SLOT_KEYS) {
  const n = poolTextCount(key);
  assert.ok(n >= 3, `slot pool ${key} needs >=3 wildcard strings, got ${n}`);
}

const lessonFrag = readFileSync(join(root, 'src/textEngine/scenes/wifeLessons/lessonFragments.js'), 'utf8');
const talkFrag = readFileSync(join(root, 'src/textEngine/scenes/wifeLessons/talkFragments.js'), 'utf8');
const eventFrag = readFileSync(join(root, 'src/textEngine/scenes/evolved/eventPhaseFragments.js'), 'utf8');

assert.match(lessonFrag, /MODULAR_LESSON_KEYS/);
assert.match(talkFrag, /opt\$\{oi\}\.sub\$\{si\}/);
assert.match(eventFrag, /EVOLVED_MODULAR_STATS/);
assert.ok(EVOLVED_MODULAR_STATS.phasePools >= 80, `evolved phase pools ${EVOLVED_MODULAR_STATS.phasePools}`);
assert.ok(EVOLVED_MODULAR_STATS.choicePools >= 150, `evolved choice pools ${EVOLVED_MODULAR_STATS.choicePools}`);
assert.ok(EVOLVED_MODULAR_STATS.endingPools >= 40, `evolved ending pools ${EVOLVED_MODULAR_STATS.endingPools}`);

let talkOptVariants = 0;
for (const [key] of _registryEntries()) {
  if (/^wifeLessons\.talk\.[^.]+\.s\d+\.opt\d+$/.test(key)) talkOptVariants += 1;
}
assert.ok(talkOptVariants >= 30, `expected many WL talk opt pools, got ${talkOptVariants}`);

console.log(`test-text-modular-coverage: ok (${SLOT_KEYS.length} slot pools, ${talkOptVariants} talk opt pools)`);
