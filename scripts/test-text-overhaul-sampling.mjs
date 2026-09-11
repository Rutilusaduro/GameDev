#!/usr/bin/env node
/**
 * Late-game text overhaul sampling — modular slot prose should dominate week 24 renders.
 * Does not prove full legacy retirement; proves composable paths fire across namespaces.
 */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { HOMEROOM_GROUP_ACTIVITIES } from '../src/gameData/homeroomEvents.js';

const week = 24;
const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 260, evolvedForm: 'eating_streamer' };
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };
const brittany = { id: 0, name: 'Brittany', archetype: 'cheerleader', lbs: 240 };

const MODULAR_MARKERS = [
  /smells like food|Ambient noise|Fabric strains|Every choice tonight|Hunger hums|Floor heat and cooking scent/i,
  /yeasty warmth|Fat is what makes a home|Steam and sweetness|Table groans under every favorite/i,
  /Oven heat|Calloway|wide tables groan|clipboard stays closed/i,
  /Cotton candy|Mary Jane stands taller|Pride sits on her hips|Crowd noise swells|Phones rise|Hay-scent|co-conspirator|funnel[- ]cake/i,
  /Clipboard margins|Late-semester entries|datapoint|journal stops pretending/i,
  /cart squeaks|Rae arrives|Clipboard, timer|session clock starts/i,
  /butter and suspicion|wellness framing|Floor check-in energy/i,
  /corkboard like scripture|treats the corkboard|Flour dust and warm sugar|labAir/i,
  /Late-semester numbers dominate|Every measurement is a dare|Ink and appetite|Residents orbit the board|threatens a binge tonight/i,
  /peer-reviewed result|eating on schedule|controlled appetite|Timers, trays/i,
  /Dust and drywall|hall log neutral|Fullness climbs|Late-semester upgrades|Reinforced joists|Hall Ambiance climbs/i,
  /hall door|Wellness framing ready|Blueprint ink/i,
  /Someone whispers|Every bite lands|contagion dressed|growth as lifestyle/i,
];

function isModular(line) {
  return MODULAR_MARKERS.some((re) => re.test(line));
}

const pulls = [
  (seed) => render('{evolved.event.eating_streamer.s0.p0}', buildTextContext({
    subject: destiny,
    week,
    seed,
    globals: { formId: 'eating_streamer', stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event' },
  })),
  (seed) => render('{wifeLessons.lesson.s1.honey_butter}', buildTextContext({
    subject: mj,
    week,
    seed,
  })),
  (seed) => render('{homeroom.conference.Kayla.intro}', buildTextContext({
    subject: mj,
    week,
    seed,
    globals: { featureId: 'homeroom_queen' },
  })),
  (seed) => render('{fair.day.weighIn.choice1}', buildTextContext({
    subject: mj,
    week,
    seed,
    globals: { featureId: 'state_fair_queen', fairStageIdx: 2, fairInfluence: 'Brittany' },
  })),
  (seed) => render('{journal.feeder.cheerleader.s8}', buildTextContext({
    subject: brittany,
    week,
    seed,
  })),
  (seed) => render('{cg.scene.corkboard.Invested}', buildTextContext({
    subject: destiny,
    week,
    seed,
    globals: { featureId: 'competitive_gainer', cgDriveTier: 'Invested', cgSceneVisit: 0 },
  })),
  (seed) => render('{cultivator.beat}', buildTextContext({
    subject: { id: 0, name: 'Tester', archetype: 'swimmer' },
    week,
    seed,
    globals: { featureId: 'cultivator' },
  })),
  (seed) => render('{hall.blueprint.purchase}', buildTextContext({
    subject: null,
    week,
    seed,
    globals: { featureId: 'hall_blueprint', hallRoomId: 'kitchen_pantry' },
  })),
  (seed) => render('{session.rae.exit.s2}', buildTextContext({
    subject: destiny,
    week,
    seed,
    globals: { featureId: 'ranked_session', sessionStage: 2 },
  })),
];

let modularHits = 0;
const total = 48;
for (let i = 0; i < total; i += 1) {
  const fn = pulls[i % pulls.length];
  const line = fn(24000 + i * 37)?.trim() || '';
  assert.ok(line.length > 20, `short line at pull ${i}: "${line}"`);
  assert.ok(!line.includes('{unresolved}'), `unresolved at pull ${i}`);
  if (isModular(line)) modularHits += 1;
}

const ratio = modularHits / total;
assert.ok(ratio >= 0.9, `expected >=90% modular slot hits at week ${week}, got ${(ratio * 100).toFixed(0)}% (${modularHits}/${total})`);

const actKey = Object.keys(HOMEROOM_GROUP_ACTIVITIES).find(
  (k) => (HOMEROOM_GROUP_ACTIVITIES[k].phases || []).length > 0,
) || 'health_unit';
const actPhases = (HOMEROOM_GROUP_ACTIVITIES[actKey].phases || []).length;
assert.ok(actPhases >= 1, 'homeroom activity phases');
let actHit = false;
for (let i = 0; i < 16; i += 1) {
  const line = render(`{homeroom.activity.${actKey}.p${actPhases - 1}}`, buildTextContext({
    subject: mj,
    week,
    seed: 5000 + i,
  }))?.trim() || '';
  if (/Oven heat|Calloway|wide tables groan|Counters disappear under flour/i.test(line)) actHit = true;
}
assert.ok(actHit, `homeroom activity late phase should modularize (${actKey})`);

console.log(`test-text-overhaul-sampling: ok (${modularHits}/${total} modular @ week ${week})`);
