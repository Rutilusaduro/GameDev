#!/usr/bin/env node
/** Sanity checks for RA dorm pivot — roster, Cassidy swimmer arc, dorm unlock paths. */
import assert from 'assert';
import { readFileSync } from 'fs';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import {
  DORMS, STUDENT_HOME_DORM, dormUnlocksForWeek, UNLOCK_POOL_IDS, getLockedDormStudentIds,
} from '../src/gameData/dorms.js';
import {
  applyWeeklyTrustDrip, isHallReachable, isRosterNew, openRosterResident,
  ROSTER_TRUST_GATE, getRosterSlotCount, weeklyTrustDripAmount,
} from '../src/gameData/rosterUnlock.js';
import { SATURATION_TIERS, computeSaturationScore } from '../src/gameData/campusSaturation.js';
import { getMysteryTrustPulse } from '../src/gameData/mysteryTrust.js';
import { computeSurrenderVector } from '../src/gameData/transformationPressure.js';
import { computePrestigeScore } from '../src/gameData/prestigeLite.js';
import { labInstabilityEase, leftoverNightGainBump, neighborEcologyPatch, habitatFx } from '../src/gameData/mechanicDepth.js';
import { weeklyScrutinyNudge } from '../src/gameData/scrutinyConsequences.js';
import { getInterruptTalkRelGain, getInterruptDenyRelLoss, getInterruptFeedPortion } from '../src/gameData/hungerAddiction.js';
import { applyFavoritismEcology } from '../src/gameData/relationshipEcology.js';
import { AIB_COUNTERS } from '../src/gameData/opposition.js';
import { EVOLUTION_OFFER } from '../src/gameData/evolvedForms.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext, wrapLeftoverLinger } from '../src/gameData/textContext.js';
import { RA_APPROACH_LIST, profileGainMult, profileScrutinyMult } from '../src/gameData/raApproaches.js';
import { getSwimmerTier } from '../src/gameData/communityResearcher.js';
import { weeklyDiscontentDecayAmount } from '../src/gameData/discontent.js';
import { generateFeastLog, SISTER_INITIAL_STATE, CAMILLE_INITIAL_LBS } from '../src/gameData/chapterHostess.js';
import { pickHearingEnding, REMOVAL_HEARING } from '../src/gameData/oppositionHearings.js';
import { applyCultDistribution, tickCultWeek, initCultOnUnlock, defaultCultState } from '../src/gameData/pharmacistCult.js';
import { salonFinishDigestif } from '../src/gameData/chloeSalon.js';
import { rollVanceCampusEvent } from '../src/gameData/oppositionCampus.js';
import { devourScarcityDamage } from '../src/gameData/scarcityTools.js';
import { tickScarcityBanishment } from '../src/gameData/oppositionEndgame.js';
import { getCampusWeeklyEventChance } from '../src/gameData/pharmacistCampus.js';
import { bumpWeeklyDeviceDependence } from '../src/gameData/deviceDependence.js';
import { scaleDiscoveryRisk } from '../src/gameData/campusWitness.js';
import '../src/textEngine/scenes/proseOverhaulPass4.js';

function sportyResidents() {
  return Object.entries(STUDENT_HOME_DORM)
    .filter(([, dorm]) => dorm === 'sporty')
    .map(([id]) => Number(id));
}

const cassidy = INIT_STUDENTS.find((s) => s.id === 1);
assert(cassidy, 'Cassidy (id 1) must exist');
assert.equal(cassidy.name, 'Cassidy');
assert.equal(cassidy.archetype, 'swimmer', 'Cassidy must be swimmer archetype');
assert.equal(INIT_STUDENTS.find((s) => s.id === 14)?.role, 'Agriculture Major', 'Mary Jane role must not say Student');
assert.equal(INIT_STUDENTS.find((s) => s.id === 18)?.role, 'Engineering Major', 'Talia role must not say Student');
assert.ok(EVOLUTION_OFFER.swimmer, 'swimmer evolution offer must exist');
assert.ok(EVOLUTION_OFFER.swimmer.paths.community_researcher, 'Lane Captain path must exist');
assert.equal(typeof getSwimmerTier, 'function', 'getSwimmerTier alias must exist');

const sportyIds = sportyResidents();
assert.equal(sportyIds.length, 5, `sporty dorm expects 5 residents, got ${sportyIds.length}`);
assert.ok(sportyIds.includes(1), 'Cassidy must home in sporty dorm');

const dormCounts = Object.fromEntries(
  ['sporty', 'nerdy', 'socialite', 'weirdos'].map((id) => [
    id,
    Object.entries(STUDENT_HOME_DORM).filter(([, dorm]) => dorm === id).length,
  ]),
);
assert.equal(dormCounts.sporty, 5, 'sporty hall should have 5 home residents');
assert.equal(dormCounts.socialite, 5, 'socialite hall should have 5 home residents');
assert.equal(dormCounts.nerdy, 4, 'nerdy hall should have 4 home residents');
assert.equal(dormCounts.weirdos, 4, 'weirdos hall should have 4 home residents');
assert.equal(UNLOCK_POOL_IDS.length, 18, 'unlock pool should cover 18 roster residents');
assert.ok(!UNLOCK_POOL_IDS.includes(15), 'Lilith stays outside the unlock pool');

const swimmerEvent = NARRATIVE_EVENTS.find((e) => e.id === 'season_plan_rewrite');
assert(swimmerEvent, 'season_plan_rewrite narrative event must exist');
assert.equal(swimmerEvent.archetype, 'swimmer');

const seasonBeat = renderWeeklyEvent('season_plan_rewrite', cassidy, { week: 6 });
assert(seasonBeat && seasonBeat.length > 40, 'season_plan_rewrite must render non-trivial prose');
assert(!/Ethnographic Self-Study/i.test(seasonBeat), 'swimmer beat must not use bookworm thesis title');
assert(!/\bMadeline\b/.test(seasonBeat), 'swimmer beat must not reference Madeline');
assert(!/\bprofessor\b/i.test(seasonBeat), 'swimmer beat must not reference professor framing');

const campusCtx = buildTextContext({
  subject: cassidy,
  week: 10,
  globals: { campusFattening: true, campusTier: 2 },
});
const campusBeat = render('{attitude.campus}', campusCtx)?.trim() || '';
assert(!/\bclassmates\b/i.test(campusBeat), 'campus softening beat must not say classmates');

const UNLOCK_SCHEDULE = {
  sporty: { 7: [], 8: ['nerdy'], 12: ['nerdy', 'socialite'], 16: ['nerdy', 'socialite', 'weirdos'] },
  nerdy: { 7: [], 8: ['sporty'], 12: ['sporty', 'socialite'], 16: ['sporty', 'socialite', 'weirdos'] },
  socialite: { 7: [], 8: ['nerdy', 'sporty'], 12: ['nerdy', 'sporty'], 16: ['nerdy', 'sporty', 'weirdos'] },
  weirdos: { 7: [], 8: ['nerdy', 'sporty'], 12: ['nerdy', 'sporty', 'socialite'], 16: ['nerdy', 'sporty', 'socialite'] },
};

for (const [startDorm, weeks] of Object.entries(UNLOCK_SCHEDULE)) {
  for (const [weekStr, expected] of Object.entries(weeks)) {
    const week = Number(weekStr);
    const got = dormUnlocksForWeek(week, startDorm).sort();
    const want = [...expected].sort();
    assert.deepEqual(got, want, `week ${week} unlock from ${startDorm}: expected ${want.join(',')}, got ${got.join(',')}`);
  }
}

for (const id of Object.keys(DORMS)) {
  const d = DORMS[id];
  assert(d.label && d.hook, `dorm ${id} needs label + hook`);
  assert(Array.isArray(d.studentIds) && d.studentIds.length >= 4, `dorm ${id} needs home residents`);
  assert.equal(d.unlockWeek, id === 'sporty' ? 0 : id === 'nerdy' ? 8 : id === 'socialite' ? 12 : 16);
}

for (const approach of RA_APPROACH_LIST) {
  assert(approach.label && approach.tagline, `approach ${approach.id} needs label + tagline`);
  const profile = { dormId: 'sporty', approachId: approach.id };
  assert(profileGainMult(profile) > 0, `profileGainMult for ${approach.id}`);
  assert(profileScrutinyMult(profile) > 0, `profileScrutinyMult for ${approach.id}`);
}

const wizardSrc = readFileSync('src/components/RaSetupWizard.jsx', 'utf8');
assert(/Hall Pass/i.test(wizardSrc), 'setup wizard must reference Hall Pass');
assert(/Red hair/i.test(wizardSrc), 'setup wizard must describe redheaded RA');
assert(/curves/i.test(wizardSrc), 'setup wizard must describe curvy RA');
assert(!/Professor Sim/i.test(wizardSrc), 'setup wizard must not say Professor Sim');
assert(!/spirit-possessed/i.test(wizardSrc), 'setup wizard must not say spirit-possessed');

function cumulativeUnlockedHalls(startDorm, week) {
  const open = new Set([startDorm]);
  for (let w = 1; w <= week; w += 1) {
    for (const id of dormUnlocksForWeek(w, startDorm)) open.add(id);
  }
  return open;
}

function simulateInitialRoster(startDormId) {
  const startIds = new Set(DORMS[startDormId].studentIds);
  const lockedIds = new Set(getLockedDormStudentIds([startDormId]));
  return UNLOCK_POOL_IDS.map((id) => ({
    id,
    homeDorm: STUDENT_HOME_DORM[id],
    lockState: lockedIds.has(id) || !startIds.has(id) ? 'locked' : 'open',
    passiveTrust: 0,
  }));
}

const BANNED_UI = [
  /\bnew students\b/i,
  /\bper student\b/i,
  /\bUse on student\b/i,
  /\bchoose a student\b/i,
  /\bAddicted students\b/i,
  /\bEvolved students\b/i,
  /\bEvolved Student Operation\b/i,
];

function assertCleanUi(text, label) {
  for (const re of BANNED_UI) {
    assert(!re.test(text), `${label} must not match ${re}`);
  }
}

for (const startDorm of ['sporty', 'nerdy', 'socialite', 'weirdos']) {
  const hall = DORMS[startDorm];
  const roster = simulateInitialRoster(startDorm);
  const open = roster.filter((s) => s.lockState === 'open');
  assert.equal(open.length, hall.studentIds.length, `${startDorm} start should open ${hall.studentIds.length} home residents`);
  for (const id of hall.studentIds) {
    const row = roster.find((s) => s.id === id);
    assert.equal(row?.lockState, 'open', `${startDorm} must start with resident ${id} open`);
    assert.equal(row?.homeDorm, startDorm, `resident ${id} home hall`);
  }

  const w16 = cumulativeUnlockedHalls(startDorm, 16);
  assert.equal(w16.size, 4, `${startDorm} start should unlock all halls by week 16`);
  for (const dormId of Object.keys(DORMS)) assert.ok(w16.has(dormId), `${startDorm} wk16 missing ${dormId}`);

  const w7 = cumulativeUnlockedHalls(startDorm, 7);
  const w8 = cumulativeUnlockedHalls(startDorm, 8);
  assert.ok(w8.size >= w7.size, `${startDorm} unlock set should not shrink wk7→wk8`);
}

// Trust drip only accrues once a locked resident's home hall is reachable.
const sportyStartRoster = simulateInitialRoster('sporty');
const priya = sportyStartRoster.find((s) => s.id === 7);
assert(priya && priya.lockState === 'locked', 'Priya locked on sporty start');
assert.equal(isHallReachable(priya, ['sporty']), false, 'nerdy hall locked at wk1');
const afterW7Drip = applyWeeklyTrustDrip([priya], { reachLevel: 1, week: 7, unlockedDorms: ['sporty'], rng: () => 0.5 });
assert.equal(afterW7Drip[0].passiveTrust, 0, 'no trust drip before hall unlock');
const afterW8Drip = applyWeeklyTrustDrip([priya], { reachLevel: 1, week: 8, unlockedDorms: ['sporty', 'nerdy'], rng: () => 0.5 });
assert.ok(afterW8Drip[0].passiveTrust > 0, 'trust drip after nerdy hall unlocks');
assert.ok(afterW8Drip[0].passiveTrust < ROSTER_TRUST_GATE, 'one week drip should not auto-unlock');

const opened = openRosterResident(priya, 8);
assert.equal(opened.lockState, 'open');
assert.equal(opened.rosterNewWeek, 8);
assert.ok(isRosterNew(opened, 8), 'NEW badge week matches unlock');
assert.ok(!isRosterNew(opened, 9), 'NEW badge clears after unlock week');

assert.equal(getRosterSlotCount(1), 5, 'hall reach 1 should allow 5 roster slots');
assert.equal(getRosterSlotCount(3), 7, 'spirit level 3 should allow 7 roster slots');

for (const tier of SATURATION_TIERS) {
  assertCleanUi(tier.desc, `saturation tier ${tier.id}`);
}

const satBase = computeSaturationScore({ students: INIT_STUDENTS.slice(0, 4), week: 3 });
const satLeftover = computeSaturationScore({
  students: INIT_STUDENTS.slice(0, 4).map((s) => ({ ...s, leftoverFedThisWeek: true })),
  week: 3,
});
assert.ok(satLeftover > satBase, 'leftover kitchen should bump campus saturation');
const satNight = computeSaturationScore({
  students: INIT_STUDENTS.slice(0, 4).map((s) => ({ ...s, lastNightVisitWeek: 3 })),
  week: 3,
});
assert.ok(satNight > satBase, 'night visits should bump campus saturation');

const dripBase = weeklyTrustDripAmount({ reachLevel: 1, week: 3, rng: () => 0 });
const dripLeftover = weeklyTrustDripAmount({ reachLevel: 1, week: 3, rng: () => 0, leftoverKitchen: true });
const dripNight = weeklyTrustDripAmount({ reachLevel: 1, week: 3, rng: () => 0, nightRound: true });
assert.ok(dripLeftover > dripBase, 'leftover kitchen should bump weekly trust drip');
assert.ok(dripNight > dripBase, 'night rounds should bump weekly trust drip');
assert.ok(computePrestigeScore({ leftoverKitchen: true }) > computePrestigeScore({}), 'leftover kitchen should bump prestige');
assert.ok(computePrestigeScore({ nightRound: true }) > computePrestigeScore({}), 'night rounds should bump prestige');
assert.ok(labInstabilityEase({}, {}, { leftoverKitchen: true }) > labInstabilityEase({}, {}), 'leftover kitchen should ease lab instability');

const surrenderBase = computeSurrenderVector(INIT_STUDENTS[0], { week: 3 });
const surrenderLeftover = computeSurrenderVector(
  { ...INIT_STUDENTS[0], leftoverFedThisWeek: true },
  { week: 3 },
);
assert.ok(surrenderLeftover.composite > surrenderBase.composite, 'leftover should bump surrender pressure');
const surrenderNight = computeSurrenderVector(
  { ...INIT_STUDENTS[0], lastNightVisitWeek: 3 },
  { week: 3 },
);
assert.ok(surrenderNight.composite > surrenderBase.composite, 'night visit should bump surrender pressure');

const lockedBase = [{ ...INIT_STUDENTS[0], id: 0, lockState: 'locked', passiveTrust: 10 }];
const pulseBase = getMysteryTrustPulse(lockedBase, { unlockedDorms: ['sporty'], reachLevel: 1, week: 3 });
const pulseLeftover = getMysteryTrustPulse(
  [{ ...lockedBase[0], leftoverFedThisWeek: true }],
  { unlockedDorms: ['sporty'], reachLevel: 1, week: 3 },
);
assert.ok(pulseBase && pulseLeftover, 'mystery trust pulse should resolve for locked reachable');
assert.ok(pulseLeftover.progress > pulseBase.progress, 'leftover kitchen should bump mystery trust');
assert.match(pulseLeftover.hint, /leftover|trays|kitchen/i, 'leftover mystery hint');
const pulseNight = getMysteryTrustPulse(
  [{ ...lockedBase[0], lastNightVisitWeek: 3 }],
  { unlockedDorms: ['sporty'], reachLevel: 1, week: 3 },
);
assert.ok(pulseNight.progress > pulseBase.progress, 'night visit should bump mystery trust');
assert.match(pulseNight.hint, /knock|Quiet hours|late knock/i, 'night mystery hint');

assert.ok(weeklyDiscontentDecayAmount({ leftover: true }) > weeklyDiscontentDecayAmount({}), 'leftover should ease weekly discontent');
assert.ok(weeklyDiscontentDecayAmount({ nightVisit: true }) > weeklyDiscontentDecayAmount({}), 'night visit should ease weekly discontent');

const talkBase = getInterruptTalkRelGain(INIT_STUDENTS[0]);
const talkLeftover = getInterruptTalkRelGain({ ...INIT_STUDENTS[0], leftoverFedThisWeek: true });
assert.ok(talkLeftover > talkBase, 'leftover should bump hunger-interrupt talk rel');
const talkNight = getInterruptTalkRelGain({ ...INIT_STUDENTS[0], lastNightVisitWeek: 3 }, 3);
assert.ok(talkNight > talkBase, 'night visit should bump hunger-interrupt talk rel');
const denyBase = getInterruptDenyRelLoss(INIT_STUDENTS[0]);
const denyLeftover = getInterruptDenyRelLoss({ ...INIT_STUDENTS[0], leftoverFedThisWeek: true });
assert.ok(denyLeftover < denyBase, 'leftover should ease hunger-interrupt deny loss');
assert.equal(leftoverNightGainBump({ leftoverFedThisWeek: true, lastNightVisitWeek: 3 }, 3), 2, 'leftover + night should bump 2');
const neglectedSoothed = applyFavoritismEcology({ ...INIT_STUDENTS[0], relationship: 50, leftoverFedThisWeek: true }, 'neglected', 3);
assert.equal(neglectedSoothed.relationship, 50, 'leftover should soothe neglected jealousy loss');
const neighPatch = neighborEcologyPatch(
  [{ ...INIT_STUDENTS[0], id: 0, leftoverFedThisWeek: true, hidden: false }],
  { roomFits: {} },
  3,
);
assert.equal(neighPatch[0], 1, 'leftover should give neighbor ecology +1');
assert.ok(
  habitatFx(null, {}, {}, { leftoverKitchen: true }).scrutinyEase
    > habitatFx(null, {}, {}).scrutinyEase,
  'leftover kitchen should ease weekly scrutiny',
);
assert.ok(
  getInterruptFeedPortion({ ...INIT_STUDENTS[0], leftoverFedThisWeek: true }).relGain
    > getInterruptFeedPortion(INIT_STUDENTS[0]).relGain,
  'leftover should bump hunger-interrupt feed rel',
);
assert.ok(
  habitatFx({ leftoverFedThisWeek: true }, {}, {}).hungerInterruptEase
    > habitatFx({}, {}, {}).hungerInterruptEase,
  'leftover should ease hunger interrupt chance',
);
assert.ok(
  habitatFx({ lastNightVisitWeek: 3 }, {}, {}, { week: 3 }).hungerInterruptEase
    > habitatFx({ lastNightVisitWeek: 3 }, {}, {}, { week: 2 }).hungerInterruptEase,
  'same-week night visit should ease hunger interrupt chance',
);
assert.match(
  weeklyScrutinyNudge(80, 2, {}, { leftoverKitchen: true }).message,
  /Staff whispers about your floor/,
  'scrutiny nudge must keep staff-whisper core copy',
);
assert.match(
  weeklyScrutinyNudge(80, 2, {}, { leftoverKitchen: true }).message,
  /Leftover trays/,
  'leftover kitchen should thicken scrutiny whisper',
);
const feastBase = generateFeastLog(0, 0, 0, 0, SISTER_INITIAL_STATE, { lbs: CAMILLE_INITIAL_LBS });
const feastLeftover = generateFeastLog(0, 0, 0, 0, SISTER_INITIAL_STATE, { lbs: CAMILLE_INITIAL_LBS }, { leftoverKitchen: true });
assert.ok(
  feastLeftover.log.some((line) => /leftover trays/i.test(line.text)),
  'leftover kitchen should land a feast-log leftover scene',
);
assert.ok(
  !feastBase.log.some((line) => /leftover trays/i.test(line.text)),
  'plain feast log should not mention leftover trays',
);

const hearBase = pickHearingEnding(REMOVAL_HEARING, ['testify', 'firm']);
const hearLeftover = pickHearingEnding(REMOVAL_HEARING, ['testify', 'firm'], { leftoverKitchen: true });
assert.ok(hearLeftover.scrutinyDelta < hearBase.scrutinyDelta, 'leftover kitchen should ease hearing scrutiny');
const hearNight = pickHearingEnding(REMOVAL_HEARING, ['testify', 'firm'], { nightRound: true });
assert.ok(hearNight.scrutinyDelta < hearBase.scrutinyDelta, 'night rounds should ease hearing scrutiny');

const cultState = { cultActive: true, cult: initCultOnUnlock(defaultCultState()), exposureRisk: 0 };
const cultRnd = (lo) => lo;
const distBase = applyCultDistribution(cultState, 'circle_pickup', cultRnd);
const distLeftover = applyCultDistribution(cultState, 'circle_pickup', cultRnd, { leftoverKitchen: true });
assert.ok(distLeftover.outcome.supplyDelta > distBase.outcome.supplyDelta, 'leftover kitchen should bump cult supply');
assert.match(distLeftover.outcome.flavor, /Galley leftover/, 'cult leftover flavor');
const tickBase = tickCultWeek(cultState, [], cultRnd);
const tickLeftover = tickCultWeek(cultState, [], cultRnd, { leftoverKitchen: true });
assert.ok(tickLeftover.cult.supplyReservoir > tickBase.cult.supplyReservoir, 'leftover kitchen should restock cult supply');

const digestifSession = {
  prestige: 0, indulgence: 0, eveningsHosted: 0, guestBook: [],
  session: { phase: 'digestif', serviceLog: [], guests: [], chloeGain: 10, prestigeGain: 4, indulgenceGain: 0 },
};
const salonBase = salonFinishDigestif(digestifSession);
const salonLeftover = salonFinishDigestif(digestifSession, { leftoverKitchen: true });
assert.ok(salonLeftover.state.prestige > salonBase.state.prestige, 'leftover kitchen should bump salon prestige');

const oppAib = { aib: { unlocked: true } };
assert.equal(rollVanceCampusEvent('health_center', oppAib, () => 0.33), null, 'Vance miss without leftover');
assert.ok(rollVanceCampusEvent('health_center', oppAib, () => 0.33, { leftoverKitchen: true }), 'leftover kitchen should thicken Vance campus chance');
assert.match(
  rollVanceCampusEvent('health_center', oppAib, () => 0, { leftoverKitchen: true }),
  /leftover|galley|second sittings/i,
  'Vance leftover campus line',
);

const hiveLinger = wrapLeftoverLinger('Nest intake.', { leftoverFedThisWeek: true, lbs: 180, name: 'Maya' }, 3, 'hive.afterglow');
assert.ok(hiveLinger.length > 'Nest intake.'.length, 'hive leftover linger should append');
assert.match(hiveLinger, /surplus|galley|Hive/i, 'hive leftover linger voice');

const scarcityOpp = { supernatural: { actTriggered: true, scarcityPressure: 80 } };
const devourBase = devourScarcityDamage(scarcityOpp, 1);
const devourLeftover = devourScarcityDamage(scarcityOpp, 1, { leftoverKitchen: true });
assert.ok(
  devourLeftover.supernatural.scarcityPressure < devourBase.supernatural.scarcityPressure,
  'leftover kitchen should deepen devour scarcity drain',
);
const ascendedStub = [{ supernaturalForm: 'siren', lbs: 400 }];
const banBase = tickScarcityBanishment(scarcityOpp, ascendedStub);
const banLeftover = tickScarcityBanishment(scarcityOpp, ascendedStub, { leftoverKitchen: true });
assert.ok(
  banLeftover.supernatural.scarcityPressure < banBase.supernatural.scarcityPressure,
  'leftover kitchen should deepen weekly scarcity banishment',
);
const campusChanceBase = getCampusWeeklyEventChance({ campusFattening: true, stage: 2 }, 1);
const campusChanceLeftover = getCampusWeeklyEventChance({ campusFattening: true, stage: 2 }, 1, { leftoverKitchen: true });
assert.ok(campusChanceLeftover > campusChanceBase, 'leftover kitchen should thicken campus weekly event chance');
const depBase = bumpWeeklyDeviceDependence({ deviceDependence: {} }, 'feeding_mask');
const depLeftover = bumpWeeklyDeviceDependence({ deviceDependence: {}, leftoverFedThisWeek: true }, 'feeding_mask');
assert.ok(
  depLeftover.deviceDependence.feeding_mask > depBase.deviceDependence.feeding_mask,
  'leftover should bump weekly device dependence',
);
assert.ok(
  scaleDiscoveryRisk(0.15, 0, 1, { leftoverKitchen: true }) > scaleDiscoveryRisk(0.15, 0, 1),
  'leftover kitchen should thicken campus device discovery risk',
);
const unlockLinger = wrapLeftoverLinger('She knocks.', { leftoverFedThisWeek: true, lbs: 140, name: 'Brittany' }, 3, 'unlock.linger');
assert.ok(unlockLinger.length > 'She knocks.'.length, 'unlock leftover linger should append');

const evolvedOp = AIB_COUNTERS.find((c) => c.id === 'evolved_student_op');
assert(evolvedOp, 'evolved resident counter must exist');
assertCleanUi(`${evolvedOp.label} ${evolvedOp.desc}`, 'evolved resident counter');

function fixtureForArchetype(archetype) {
  const found = INIT_STUDENTS.find((s) => s.archetype === archetype);
  if (found) return found;
  return { ...INIT_STUDENTS[0], archetype, name: archetype === 'bookworm' ? 'Emma' : 'Resident' };
}

const archetypes = [...new Set(NARRATIVE_EVENTS.map((e) => e.archetype).filter(Boolean))];
for (const ev of NARRATIVE_EVENTS) {
  const subject = ev.archetype ? fixtureForArchetype(ev.archetype) : INIT_STUDENTS[0];
  const beat = renderWeeklyEvent(ev.id, subject, { week: Math.max(6, ev.stageMin + 2) });
  if (beat) {
    assert.ok(beat.length > 20, `narrative ${ev.id} should render prose`);
    assertCleanUi(beat, `narrative ${ev.id}`);
    assert(!/\bMadeline\b/.test(beat), `narrative ${ev.id} must not say Madeline`);
    assert(!/\bprofessor\b/i.test(beat), `narrative ${ev.id} must not say professor`);
  }
}

for (const archetype of archetypes) {
  const matching = NARRATIVE_EVENTS.filter((e) => e.archetype === archetype);
  assert.ok(matching.length > 0, `archetype ${archetype} should have at least one narrative event`);
}

// Week-by-week unlock milestones — cumulative hall reach must only grow.
for (const startDorm of ['sporty', 'nerdy', 'socialite', 'weirdos']) {
  let prevSize = 1;
  for (let week = 1; week <= 16; week += 1) {
    const size = cumulativeUnlockedHalls(startDorm, week).size;
    assert.ok(size >= prevSize, `${startDorm} hall reach shrank wk${week - 1}→${week}`);
    prevSize = size;
    if ([8, 12, 16].includes(week)) {
      assert.ok(size >= 2, `${startDorm} should reach ≥2 halls by week ${week}`);
    }
  }
  assert.equal(cumulativeUnlockedHalls(startDorm, 16).size, 4, `${startDorm} must open all halls by week 16`);
}

console.log('playthrough: semester sim wk1-16 + Cassidy arc + all dorm paths + RA setup OK');
