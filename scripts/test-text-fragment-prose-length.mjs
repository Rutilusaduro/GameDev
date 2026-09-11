#!/usr/bin/env node
/** Hot-path fragment pools — minimum variant count + average prose length (overhaul depth). */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const MIN_STRINGS = 4;
const MIN_AVG_LEN = 72;
const POOLS = [
  'wl.talk.warmOpen',
  'wl.talk.raPresence',
  'wl.talk.branchPrompt',
  'fair.day.judgingBeat',
  'fair.day.weighInBeat',
  'fair.day.carnivalAir',
  'homeroom.activity.kitchenHeat',
  'homeroom.activity.communityWarmth',
  'session.scene.deliveryAir',
  'journal.scene.fieldNotes',
  'talk.checkIn.floorAir',
  'fair.day.afterpartyBeat',
  'session.payoff.raeWrap',
  'session.payoff.scaleEcho',
  'cg.scene.dataObsession',
  'cg.measurement.ritualBeat',
  'fair.training.coachBeat',
  'fair.training.collabVoice',
  'fair.boost.midwayPush',
  'fair.photo.pageantGlow',
  'talk.suggest.indulgenceWarmth',
  'talk.suggest.growthAmbition',
  'hall.blueprint.construction',
  'hall.ambiance.modularFrame',
  'campus.explore.lateFrame',
  'cultivator.scene.labAir',
  'session.tapOut.breath',
  'device.use.scene.labHum',
  'device.campus.scene.meshAir',
  'talk.encourage.lateHallAir',
  'stream.scene.signoffAir',
  'talk.command_finish.lateFloor',
  'stream.scene.tapOutBreath',
  'opposition.scene.boardPressure',
  'talk.refusal.command_finish.lateHush',
  'stream.scene.betweenRoundGlow',
  'opposition.scene.removalDocket',
  'opposition.scene.emergencyExposure',
  'stream.scene.roundStartPulse',
  'opposition.scene.testifyWarmth',
  'opposition.scene.counterMomentum',
  'opposition.scene.agendaInstitutional',
  'opposition.scene.endingRelief',
  'talk.refusal.command_devour.lateBrink',
];

for (const key of POOLS) {
  const variants = _registryEntries().find(([k]) => k === key)?.[1] || [];
  const strings = [];
  for (const v of variants) {
    const t = v.text;
    const arr = typeof t === 'function' ? [] : (Array.isArray(t) ? t : [t]);
    strings.push(...arr.filter((s) => typeof s === 'string' && s.length > 8));
  }
  assert.ok(strings.length >= MIN_STRINGS, `${key}: need >=${MIN_STRINGS} strings, got ${strings.length}`);
  const avg = strings.reduce((n, s) => n + s.length, 0) / strings.length;
  assert.ok(avg >= MIN_AVG_LEN, `${key}: avg len ${avg.toFixed(0)} < ${MIN_AVG_LEN}`);
}

console.log(`test-text-fragment-prose-length: ok (${POOLS.length} pools, avg>=${MIN_AVG_LEN})`);
