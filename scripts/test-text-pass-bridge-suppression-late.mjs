#!/usr/bin/env node
/**
 * Pass 111/112 bridge one-liners must not win alone @ week 24 when fragment overlays exist.
 */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { renderEvolvedActivityBeat } from '../src/textEngine/scenes/evolved/index.js';
import { renderDeviceUseLine } from '../src/textEngine/scenes/deviceUse/index.js';
import { renderStreamBeat } from '../src/textEngine/scenes/stream/liveBridge.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderHearingChoiceResult } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };

const INTRO_FP = /floorTone|butter and suspicion|recipe cards|Calloway posters|Floor check-in energy|Residents linger/i;
let callowayOk = false;
for (let s = 0; s < 12; s += 1) {
  const calloway = render('{homeroom.conference.Mrs_Calloway.intro}', buildTextContext({
    subject: mj,
    week,
    seed: 72001 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  if (INTRO_FP.test(calloway)) callowayOk = true;
  assert.ok(!/^Mrs\. Calloway arrives buttoned — jacket already losing the fight with her middle\.$/.test(calloway), 'pass-112 Calloway bridge alone @ w24');
}
assert.ok(callowayOk, 'Mrs_Calloway intro modular');

let briOk = false;
for (let s = 0; s < 12; s += 1) {
  const bri = render('{homeroom.conference.Bri.brought_something}', buildTextContext({
    subject: mj,
    week,
    seed: 72002 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  if (/Counters disappear|hall already voted|oven heat|wellness framing ready/i.test(bri)) briOk = true;
  assert.ok(!/^Bri's drawer ritual — Tupperware like scripture, appetite like homework\.$/.test(bri), 'pass-111 Bri bridge alone @ w24');
}
assert.ok(briOk, 'Bri brought_something modular');

for (let s = 0; s < 12; s += 1) {
  const curriculum = render('{homeroom.activity.parent_meeting.p0.curriculum}', buildTextContext({
    subject: mj,
    week,
    seed: 72003 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(curriculum.length > 40, 'short parent_meeting curriculum');
  assert.ok(!/^Wellness agenda holds until snacks rewrite the minutes\.$/.test(curriculum), 'pass-111 curriculum bridge alone @ w24');
}

let wlOk = false;
for (let s = 0; s < 12; s += 1) {
  const wl = render('{wifeLessons.lesson.s3.peach_cobbler}', buildTextContext({
    subject: mj,
    week,
    seed: 72004 + s,
  }))?.trim() || '';
  assert.ok(wl.length > 60, 'short WL lesson');
  assert.ok(!/^Potluck theology — every dish a sermon, every second helping amen\.$/.test(wl), 'pass-111 WL bridge alone @ w24');
  if (/yeasty|Fat is what makes|lateFeast|flour dust|table groans/i.test(wl)) wlOk = true;
}
assert.ok(wlOk, 'WL lesson modular');

const sumo = { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 320, evolvedForm: 'sumo' };
let sumoHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderEvolvedActivityBeat(sumo, week, 3, { seed: 72010 + s })?.trim() || '';
  assert.ok(line.length > 40, 'short sumo activity');
  if (/evolved\.scene|atmosphere|stakes|hungerCue|witnessed|She's in her element|Modular evolved|Fabric strains|Floor heat and cooking|Winning here means growing|appetite becomes the only agenda/i.test(line)) sumoHit = true;
  assert.ok(!/^National qualifier — press watches her belly argue with the sport's weight classes\.$/.test(line), 'pass-112 sumo bridge alone @ w24');
}
assert.ok(sumoHit, 'sumo activity modular @ w24');

const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 280 };
let deviceHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderDeviceUseLine({
    student: destiny,
    deviceId: 'auto_feeder_arm',
    deviceLabel: 'Feeder Arm',
    actionId: 'burst_feed',
    week,
  })?.trim() || '';
  assert.ok(!/^Harness whirs — she settles deeper/.test(line), 'pass-111 device.use bridge alone @ w24');
  if (/labHum|calibrated hunger|Hall Ambiance muted/i.test(line)) deviceHit = true;
}
assert.ok(deviceHit, 'device.use modular @ w24');

let streamHit = false;
for (let s = 0; s < 12; s += 1) {
  const ctx = buildTextContext({
    subject: destiny,
    week,
    seed: 72050 + s,
    globals: { featureId: 'destiny_stream' },
  });
  const line = renderStreamBeat('{stream.endStream.good}', ctx, { v2DepthChance: 0 })?.trim() || '';
  assert.ok(!/^Sign-off lands — chat still hungry, tips still ticking after the camera dies\.$/.test(line), 'pass-112 stream.good bridge alone @ w24');
  if (/signoffAir|chatAfterglow|tips still ticking/i.test(line)) streamHit = true;
}
assert.ok(streamHit, 'stream.endStream.good modular @ w24');

const artsy = { id: 3, name: 'Serena', archetype: 'artsy', lbs: 240 };
let weeklyHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = renderWeeklyEvent('art_exhibition', artsy, { week, seed: 72060 + s })?.trim() || '';
  assert.ok(!/^Gallery night — her body hung beside the canvases, both exhibits honest\.$/.test(line), 'pass-111 art_exhibition bridge alone @ w24');
  if (/floorEcho|Hall Ambiance/i.test(line)) weeklyHit = true;
}
assert.ok(weeklyHit, 'weekly art_exhibition modular @ w24');

let feastBribeHit = false;
for (let s = 0; s < 8; s += 1) {
  const line = renderHearingChoiceResult('emergency', 'feast_bribe', destiny, week, 1)?.trim() || '';
  assert.ok(!/^Hearing catered — board members eat before they vote, and appetite wins the agenda\.$/.test(line), 'pass-112 feast_bribe bridge alone @ w24');
  if (/cateredVote|boardAppetite|Appetite interrupts|feed the hearing|board members chew|Trays arrive mid-sentence|Hearing catered on purpose|room slows around chewing|hunger rewriting the agenda/i.test(line)) feastBribeHit = true;
}
assert.ok(feastBribeHit, 'emergency feast_bribe modular @ w24');

let fairEndHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{fair.day.weighIn.endingA}', buildTextContext({
    subject: mj,
    week,
    seed: 72070 + s,
    globals: { featureId: 'state_fair_queen' },
  }))?.trim() || '';
  assert.ok(!/^Ground holds — MJ owns the number while the crowd learns her name\.$/.test(line), 'pass-96 weighIn.endingA bridge alone @ w24');
  if (/weighInBeat|carnivalAir|platform scale|Hay-scent|co-conspirator/i.test(line)) fairEndHit = true;
}
assert.ok(fairEndHit, 'fair.day.weighIn.endingA modular @ w24');

let fairApHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{fair.day.afterparty.open}', buildTextContext({
    subject: mj,
    week,
    seed: 72080 + s,
    globals: { featureId: 'state_fair_queen' },
  }))?.trim() || '';
  assert.ok(!/^Fair night air tastes like sugar — afterparty is where winners keep winning\.$/.test(line), 'pass-96 afterparty.open bridge alone @ w24');
  if (/afterpartyBeat|Afterparty steam|funnel-cake|mjPride/i.test(line)) fairApHit = true;
}
assert.ok(fairApHit, 'fair.day.afterparty.open modular @ w24');

let socialHeatHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{hall.ambiance.pulse.socialHeat}', buildTextContext({
    subject: mj,
    week,
    seed: 72090 + s,
  }))?.trim() || '';
  assert.ok(!/^Doorways stay open — gossip and snacks trade places in the hallway\.$/.test(line), 'pass-96 socialHeat bridge alone @ w24');
  if (/Hall Ambiance|modularFrame|linger longer|group chat|Invitations multiply/i.test(line)) socialHeatHit = true;
}
assert.ok(socialHeatHit, 'hall.ambiance.pulse.socialHeat modular @ w24');

let fairC2Hit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{fair.day.afterparty.choice2}', buildTextContext({
    subject: mj,
    week,
    seed: 72100 + s,
    globals: { featureId: 'state_fair_queen' },
  }))?.trim() || '';
  assert.ok(!/^Crowd presses close — fair grease and pride share the same sticky napkin\.$/.test(line), 'pass-95 afterparty.choice2 bridge alone @ w24');
  if (/afterpartyBeat|carnivalAir|mjPride|funnel/i.test(line)) fairC2Hit = true;
}
assert.ok(fairC2Hit, 'fair.day.afterparty.choice2 modular @ w24');

let monroeHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{homeroom.conference.Mrs_Monroe.intro}', buildTextContext({
    subject: mj,
    week,
    seed: 72110 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^Mrs\. Monroe arrives early, claims the good chair — conference is snack diplomacy\.$/.test(line), 'pass-95 Monroe bridge alone @ w24');
  if (/floorTone|butter and suspicion|recipe cards|Hall Ambiance/i.test(line)) monroeHit = true;
}
assert.ok(monroeHit, 'Mrs_Monroe intro modular @ w24');

const priya = { id: 2, name: 'Priya', archetype: 'competitive_gainer', lbs: 260 };
let measureHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{cg.measurement.session}', buildTextContext({
    subject: priya,
    week,
    seed: 72120 + s,
    globals: {
      featureId: 'competitive_gainer',
      targetName: 'Brittany',
      priyaName: 'Priya',
      cgDriveTier: 'Driven',
      targetStageBucket: 'heavy',
    },
  }))?.trim() || '';
  assert.ok(!/^Tape whispers around Brittany — Priya records every inch like scripture\.$/.test(line), 'pass-95 cg.measurement bridge alone @ w24');
  if (/ritualBeat|dataObsession|corkboard|competitionHeat|categories called/i.test(line)) measureHit = true;
}
assert.ok(measureHit, 'cg.measurement.session modular @ w24');

let intimacyHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{hall.ambiance.pulse.intimacy}', buildTextContext({
    subject: mj,
    week,
    seed: 72130 + s,
  }))?.trim() || '';
  assert.ok(!/^Soft questions in the nook — want learns vocabulary without shame\.$/.test(line), 'pass-97 intimacy bridge alone @ w24');
  if (/Hall Ambiance|modularFrame|Doors stay cracked|nook wing/i.test(line)) intimacyHit = true;
}
assert.ok(intimacyHit, 'hall.ambiance.pulse.intimacy modular @ w24');

let tauntHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{cg.raReply.taunt}', buildTextContext({
    subject: priya,
    week,
    seed: 72140 + s,
    globals: { featureId: 'competitive_gainer' },
  }))?.trim() || '';
  assert.ok(!/^Your needle lands — Priya answers with calories, not courtesy\.$/.test(line), 'pass-96 taunt bridge alone @ w24');
  if (/wellnessFrame|boardNudge|corkboard|thread wants drama/i.test(line)) tauntHit = true;
}
assert.ok(tauntHit, 'cg.raReply.taunt modular @ w24');

console.log('test-text-pass-bridge-suppression-late: ok');
