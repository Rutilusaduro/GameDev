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
const ATTEMPTS = 24;
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
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = renderDeviceUseLine({
    student: destiny,
    deviceId: 'auto_feeder_arm',
    deviceLabel: 'Feeder Arm',
    actionId: 'burst_feed',
    week,
    seed: 72040 + s,
  })?.trim() || '';
  assert.ok(!/^Harness whirs — she settles deeper/.test(line), 'pass-111 device.use bridge alone @ w24');
  if (line.length > 75 || /labHum|calibrated hunger|Hall Ambiance/i.test(line)) deviceHit = true;
}
assert.ok(deviceHit, 'device.use modular @ w24');

let streamHit = false;
for (let s = 0; s < ATTEMPTS; s += 1) {
  const ctx = buildTextContext({
    subject: destiny,
    week,
    seed: 72050 + s,
    globals: { featureId: 'destiny_stream' },
  });
  const line = renderStreamBeat('{stream.endStream.good}', ctx, { v2DepthChance: 0 })?.trim() || '';
  assert.ok(!/^Sign-off lands — chat still hungry, tips still ticking after the camera dies\.$/.test(line), 'pass-112 stream.good bridge alone @ w24');
  if (line.length > 70 || /signoffAir|chatAfterglow|tips still ticking|camera dies/i.test(line)) streamHit = true;
}
assert.ok(streamHit, 'stream.endStream.good modular @ w24');

const artsy = { id: 3, name: 'Serena', archetype: 'artsy', lbs: 240 };
let weeklyHit = false;
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = renderWeeklyEvent('art_exhibition', artsy, { week, seed: 72060 + s })?.trim() || '';
  assert.ok(!/^Gallery night — her body hung beside the canvases, both exhibits honest\.$/.test(line), 'pass-111 art_exhibition bridge alone @ w24');
  if (line.length > 65 || /floorEcho|Hall Ambiance|artExhibition|gallery/i.test(line)) weeklyHit = true;
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
for (let s = 0; s < 24; s += 1) {
  const line = render('{fair.day.afterparty.open}', buildTextContext({
    subject: mj,
    week,
    seed: 72080 + s,
    globals: { featureId: 'state_fair_queen' },
  }))?.trim() || '';
  assert.ok(!/^Fair night air tastes like sugar — afterparty is where winners keep winning\.$/.test(line), 'pass-96 afterparty.open bridge alone @ w24');
  if (/afterpartyBeat|Afterparty steam|funnel-cake|mjPride|funnel cake|Mary Jane|carnival air|grease|co-conspirator/i.test(line)) fairApHit = true;
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
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = render('{hall.ambiance.pulse.intimacy}', buildTextContext({
    subject: mj,
    week,
    seed: 72130 + s,
  }))?.trim() || '';
  assert.ok(!/^Soft questions in the nook — want learns vocabulary without shame\.$/.test(line), 'pass-97 intimacy bridge alone @ w24');
  if (line.length > 55 || /Hall Ambiance|modularFrame|Doors stay cracked|nook wing/i.test(line)) intimacyHit = true;
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

let photoHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{fair.photo.Kylie}', buildTextContext({
    subject: mj,
    week,
    seed: 72150 + s,
    globals: { featureId: 'state_fair_queen', fairCollab: 'Kylie' },
  }))?.trim() || '';
  assert.ok(!/^Fryer glow on Kylie’s grin — another greasy saint for the trophy wall\.$/.test(line), 'pass-94 fair.photo.Kylie bridge alone @ w24');
  if (/pageantGlow|collabFrame|carnivalAir|Hay-scent|Pageant lights|ring light/i.test(line)) photoHit = true;
}
assert.ok(photoHit, 'fair.photo.Kylie modular @ w24');

let kaylaHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{homeroom.conference.Kayla.intro}', buildTextContext({
    subject: mj,
    week,
    seed: 72160 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^Kayla drops into the chair like Tuesday already started — hall standing is not what she came for\.$/.test(line), 'pass-101 Kayla bridge alone @ w24');
  if (/floorTone|butter and suspicion|recipe cards/i.test(line)) kaylaHit = true;
}
assert.ok(kaylaHit, 'Kayla intro modular @ w24');

let recipesHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{homeroom.activity.parent_meeting.p0.recipes}', buildTextContext({
    subject: mj,
    week,
    seed: 72170 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^The recipe book hits the table — cardamom and peach upside-down rewrite the parent meeting\.$/.test(line), 'pass-101 recipes bridge alone @ w24');
  if (/kitchenHeat|communityWarmth|Oven heat|recipe book opens/i.test(line)) recipesHit = true;
}
assert.ok(recipesHit, 'parent_meeting recipes modular @ w24');

let viralHit = false;
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = renderWeeklyEvent('viral_post', artsy, { week, seed: 72180 + s })?.trim() || '';
  assert.ok(!/^The post blows up — comments hungry, algorithm complicit, her belly the thumbnail\.$/.test(line), 'pass-101 viral_post bridge alone @ w24');
  if (line.length > 65 || /viralPost|floorEcho|Hall Ambiance|algorithm|thumbnail/i.test(line)) viralHit = true;
}
assert.ok(viralHit, 'weekly.viral_post modular @ w24');

let prestigeHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{hall.ambiance.pulse.prestige}', buildTextContext({
    subject: mj,
    week,
    seed: 72190 + s,
  }))?.trim() || '';
  assert.ok(!/^Marble echoes prestige — residents loosen belts in unison without a word\.$/.test(line), 'pass-94 prestige bridge alone @ w24');
  if (/Hall Ambiance|modularFrame|atrium gleams|Tour groups/i.test(line)) prestigeHit = true;
}
assert.ok(prestigeHit, 'hall.ambiance.pulse.prestige modular @ w24');

let extractHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{campus.find.saturated_extract}', buildTextContext({
    subject: destiny,
    week,
    seed: 72200 + s,
    globals: { featureId: 'campus_exploration' },
  }))?.trim() || '';
  assert.ok(!/^Saturated runoff bottles sweet — the gathering site left you a trophy of appetite\.$/.test(line), 'pass-101 saturated_extract bridge alone @ w24');
  if (/lateFrame|hallTone|campus paths|Hall Ambiance/i.test(line)) extractHit = true;
}
assert.ok(extractHit, 'campus.find.saturated_extract modular @ w24');

let mintHit = false;
for (let s = 0; s < 24; s += 1) {
  const line = render('{campus.find.wild_mint}', buildTextContext({
    subject: destiny,
    week,
    seed: 72210 + s,
    globals: { featureId: 'campus_exploration' },
  }))?.trim() || '';
  assert.ok(!/^Wild mint bruises sweet on your palm — the quad smells like dessert before dinner\.$/.test(line), 'pass-100 wild_mint bridge alone @ w24');
  if (line.length > 55 && !/^Mint bruises sweet on your palm/.test(line)) mintHit = true;
}
assert.ok(mintHit, 'campus.find.wild_mint modular @ w24');

let refreshHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{homeroom.activity.parent_meeting.p0.refreshments_first}', buildTextContext({
    subject: mj,
    week,
    seed: 72220 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^Refreshments before agenda — Mrs\. Calloway eats three pieces before item one\.$/.test(line), 'pass-105 refreshments bridge alone @ w24');
  if (/kitchenHeat|communityWarmth|Oven heat|refreshments/i.test(line)) refreshHit = true;
}
assert.ok(refreshHit, 'refreshments_first modular @ w24');

let chairHit = false;
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = renderWeeklyEvent('chair_breaks', artsy, { week, seed: 72230 + s })?.trim() || '';
  assert.ok(!/^The chair gives — the room laughs before pity can arrive\.$/.test(line), 'pass-105 chair_breaks bridge alone @ w24');
  if (line.length > 65 || /chairBreaks|floorEcho|Hall Ambiance|chair gives/i.test(line)) chairHit = true;
}
assert.ok(chairHit, 'weekly.chair_breaks modular @ w24');

let bri105Hit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{homeroom.conference.Bri.brought_something}', buildTextContext({
    subject: mj,
    week,
    seed: 72240 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^Bri opens the drawer like ritual — container always there, appetite always practical\.$/.test(line), 'pass-105 Bri bridge alone @ w24');
  if (/Counters disappear|choiceWarmth|oven heat|wellness framing/i.test(line)) bri105Hit = true;
}
assert.ok(bri105Hit, 'Bri brought_something modular @ w24');

let travel90Hit = false;
for (let s = 0; s < ATTEMPTS; s += 1) {
  const line = render('{campus.travel}', buildTextContext({
    subject: mj,
    week,
    seed: 72250 + s,
    globals: { featureId: 'campus_exploration' },
  }))?.trim() || '';
  assert.ok(!/^Crossing campus, every flyer competes with the dining hall — hunger wins the billboard war\.$/.test(line), 'pass-90 travel bridge alone @ w24');
  if (line.length > 52 || /lateFrame|hallTone|campus paths|food truck|fried sugar/i.test(line)) travel90Hit = true;
}
assert.ok(travel90Hit, 'campus.travel modular @ w24');

let tasteHit = false;
for (let s = 0; s < 24; s += 1) {
  const line = render('{homeroom.conference.Mrs_Monroe.taste_now}', buildTextContext({
    subject: mj,
    week,
    seed: 72260 + s,
    globals: { featureId: 'homeroom_queen' },
  }))?.trim() || '';
  assert.ok(!/^Mrs\. Monroe tastes on principle — one bite becomes two, and Tuesday earns another checkmark\.$/.test(line), 'pass-90 Monroe taste_now bridge alone @ w24');
  if (line.length > 65) tasteHit = true;
}
assert.ok(tasteHit, 'Mrs_Monroe taste_now modular @ w24');

let synergyHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{hall.blueprint.synergy}', buildTextContext({
    subject: mj,
    week,
    seed: 72270 + s,
  }))?.trim() || '';
  assert.ok(!/^Two wings share one appetite now — lounge warmth walks to the stove without asking\.$/.test(line), 'pass-90 synergy bridge alone @ w24');
  if (/construction|permission|Hall Ambiance|dotted bridge|Reinforced joists|linger longer|Blueprint ink/i.test(line)) synergyHit = true;
}
assert.ok(synergyHit, 'hall.blueprint.synergy modular @ w24');

let honeyHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{wifeLessons.lesson.s1.honey_butter}', buildTextContext({
    subject: mj,
    week,
    seed: 72280 + s,
  }))?.trim() || '';
  assert.ok(!/^Honey glaze on warm fingers — the kitchen teaches sweetness before anyone says the word aloud\.$/.test(line), 'pass-99 honey_butter bridge alone @ w24');
  if (/lateFeast|mjDoctrine|aroma|circleEat|yeasty warmth|Fat is what makes|circleEat|raWitness/i.test(line)) honeyHit = true;
}
assert.ok(honeyHit, 'WL honey_butter modular @ w24');

let raeHit = false;
for (let s = 0; s < 12; s += 1) {
  const line = render('{session.rae.arrival.s1}', buildTextContext({
    subject: destiny,
    week,
    seed: 72290 + s,
    globals: { featureId: 'ranked_session' },
  }))?.trim() || '';
  assert.ok(!/^Rae corrects the count with a smile — extras are policy when appetite is the customer\.$/.test(line), 'pass-108 rae arrival bridge alone @ w24');
  if (/deliveryAir|raePresence|cart squeaks/i.test(line)) raeHit = true;
}
assert.ok(raeHit, 'session.rae.arrival.s1 modular @ w24');

console.log('test-text-pass-bridge-suppression-late: ok');
