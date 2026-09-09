#!/usr/bin/env node
/** Sanity checks for RA dorm pivot — roster, Cassidy swimmer arc, dorm unlock paths. */
import assert from 'assert';
import { readFileSync } from 'fs';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORMS, STUDENT_HOME_DORM, dormUnlocksForWeek, UNLOCK_POOL_IDS } from '../src/gameData/dorms.js';
import { EVOLUTION_OFFER } from '../src/gameData/evolvedForms.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { RA_APPROACH_LIST, profileGainMult, profileScrutinyMult } from '../src/gameData/raApproaches.js';
import { getSwimmerTier } from '../src/gameData/communityResearcher.js';

function sportyResidents() {
  return Object.entries(STUDENT_HOME_DORM)
    .filter(([, dorm]) => dorm === 'sporty')
    .map(([id]) => Number(id));
}

const cassidy = INIT_STUDENTS.find((s) => s.id === 1);
assert(cassidy, 'Cassidy (id 1) must exist');
assert.equal(cassidy.name, 'Cassidy');
assert.equal(cassidy.archetype, 'swimmer', 'Cassidy must be swimmer archetype');
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

// Sporty (unlockWeek 0) never appears as a week-gated unlock — only as a start hall.
const UNLOCK_SCHEDULE = {
  sporty: { 7: [], 8: ['nerdy'], 12: ['nerdy', 'socialite'], 16: ['nerdy', 'socialite', 'weirdos'] },
  nerdy: { 7: [], 8: [], 12: ['socialite'], 16: ['socialite', 'weirdos'] },
  socialite: { 7: [], 8: ['nerdy'], 12: ['nerdy'], 16: ['nerdy', 'weirdos'] },
  weirdos: { 7: [], 8: ['nerdy'], 12: ['nerdy', 'socialite'], 16: ['nerdy', 'socialite'] },
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
  assert.equal(d.unlockWeek, id === 'sporty' || id === 'nerdy' ? (id === 'sporty' ? 0 : 8) : id === 'socialite' ? 12 : 16);
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

console.log('playthrough: Cassidy swimmer arc + all dorm unlock paths + RA setup OK');
