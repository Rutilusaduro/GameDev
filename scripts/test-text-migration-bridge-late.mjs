#!/usr/bin/env node
/** Week 24 — MIGRATION_BRIDGE_PREFIX pools render modular slots, not empty. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { FLOOR_SCENES } from '../src/gameData/floorEvents.js';
import { DINNER_VENUES } from '../src/gameData/sessions.js';
import { LEGACY_BRIDGE_WEEK_MAX } from '../src/textEngine/scenes/legacyPoolPolicy.js';

const week = 24;
const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 300 };
const scene = FLOOR_SCENES.find((s) => s.id === 'mood_stressed') || FLOOR_SCENES[0];
const dish = DINNER_VENUES[0]?.dishes?.[0];

const MODULAR_FP = /hallTone|choiceEcho|savor|venueMood|hungerCall|yieldBeat|crowdHeat|tableStakes|dohyo|boutHeat|ringLight|takeYield|fieldNotes|subjectFocus|lateObsession|Clipboard margins|policy and takeout|plate looks expensive|summons|Cheering turns hungry|oven heat|yeasty warmth|warmOpen|raPresence|Residents orbit|unofficial agenda|Floor check-in energy|Portions meant|appetite as sport|Center ring, heavy|On camera she eats|datapoint for the algorithm|moment passes warm|kitchen fills with yeasty|Yeasty warmth hits|permission baked|appetite as family|ring light hums|Perfect take means|Steam and sweetness|upholstered|Hunger arrives enormous|built since the last feast|Tachi-ai|belt strain|dohyo holds|Impact lands soft|She keeps her voice neutral|wellness framing|circleEat|mjDoctrine|appetite as family calendar/i;

const pulls = [
  (seed) => render('{journal.feeder.cheerleader.s2}', buildTextContext({ subject: mj, week, seed })),
  (seed) => render('{wifeLessons.lesson.s1.honey_butter}', buildTextContext({ subject: mj, week, seed })),
  (seed) => render('{wifeLessons.talk.Darlene.s1.greeting}', buildTextContext({ subject: mj, week, seed })),
  (seed) => render(`{campusEvent.scene.${scene.id}}`, buildTextContext({ subject: mj, week, seed })),
  (seed) => render(`{campusEvent.choice.${scene.id}.0}`, buildTextContext({ subject: mj, week, seed })),
  (seed) => (dish
    ? render(`{dinner.dish.${dish.id}}`, buildTextContext({ subject: mj, week, seed }))
    : ''),
  (seed) => render('{hunt.feast.s3}', buildTextContext({ subject: mj, week, seed, globals: { feastStage: 3 } })),
  (seed) => render('{contest.payoff.legacy.s0}', buildTextContext({
    subject: mj,
    week,
    seed,
    globals: { yourGain: 12 },
  })),
  (seed) => render('{sumo.payoff.legacy.s0}', buildTextContext({
    subject: mj,
    week,
    seed,
    globals: { gainAccum: 8 },
  })),
  (seed) => render('{recording.opening.s0}', buildTextContext({ subject: mj, week, seed })),
];

assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);

let modular = 0;
const samplesPerPull = 4;
for (let i = 0; i < pulls.length; i += 1) {
  let hit = false;
  for (let s = 0; s < samplesPerPull; s += 1) {
    const line = pulls[i](24000 + i * 41 + s)?.trim() || '';
    assert.ok(line.length > 20, `short render pull ${i} seed ${s}: "${line.slice(0, 40)}"`);
    assert.ok(!line.includes('{unresolved}'), `unresolved pull ${i}`);
    if (MODULAR_FP.test(line)) hit = true;
  }
  if (hit) modular += 1;
}

assert.ok(modular >= Math.ceil(pulls.length * 0.5), `expected >=50% modular bridge hits @ week ${week}, got ${modular}/${pulls.length}`);

console.log(`test-text-migration-bridge-late: ok (${modular}/${pulls.length} modular @ week ${week})`);
