#!/usr/bin/env node
/** Sanity checks for RA dorm pivot — roster, Cassidy swimmer arc, dorm unlock path. */
import assert from 'assert';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORMS, STUDENT_HOME_DORM, dormUnlocksForWeek, UNLOCK_POOL_IDS } from '../src/gameData/dorms.js';
import { EVOLUTION_OFFER } from '../src/gameData/evolvedForms.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';

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

const startDorm = 'sporty';
assert.deepEqual(dormUnlocksForWeek(7, startDorm), []);
assert.deepEqual(dormUnlocksForWeek(8, startDorm), ['nerdy']);
assert.deepEqual(dormUnlocksForWeek(16, startDorm), ['nerdy', 'socialite', 'weirdos']);

for (const id of Object.keys(DORMS)) {
  const d = DORMS[id];
  assert(d.label && d.hook, `dorm ${id} needs label + hook`);
}

console.log('playthrough: Cassidy swimmer arc + sporty roster + dorm unlock path OK');
