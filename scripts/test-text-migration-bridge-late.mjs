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

const MODULAR_FP = /hallTone|choiceEcho|savor|venueMood|hungerCall|yieldBeat|crowdHeat|tableStakes|dohyo|boutHeat|ringLight|takeYield|fieldNotes|subjectFocus|lateObsession|Clipboard margins|policy and takeout|plate looks expensive|summons|Cheering turns hungry|oven heat|yeasty warmth|warmOpen|raPresence|Residents orbit|unofficial agenda|Floor check-in energy|Portions meant|appetite as sport|Center ring, heavy|On camera she eats|datapoint for the algorithm|moment passes warm|kitchen fills with yeasty|Yeasty warmth hits|permission baked|appetite as family|ring light hums|Perfect take means/i;

const pulls = [
  () => render('{journal.feeder.cheerleader.s2}', buildTextContext({ subject: mj, week, seed: 1 })),
  () => render('{wifeLessons.lesson.s1.honey_butter}', buildTextContext({ subject: mj, week, seed: 2 })),
  () => render('{wifeLessons.talk.Darlene.s1.greeting}', buildTextContext({ subject: mj, week, seed: 3 })),
  () => {
    const scene = FLOOR_SCENES.find((s) => s.id === 'mood_stressed') || FLOOR_SCENES[0];
    return render(`{campusEvent.scene.${scene.id}}`, buildTextContext({ subject: mj, week, seed: 4 }));
  },
  () => {
    const scene = FLOOR_SCENES.find((s) => s.id === 'mood_stressed') || FLOOR_SCENES[0];
    return render(`{campusEvent.choice.${scene.id}.0}`, buildTextContext({ subject: mj, week, seed: 5 }));
  },
  () => {
    const dish = DINNER_VENUES[0]?.dishes?.[0];
    return dish
      ? render(`{dinner.dish.${dish.id}}`, buildTextContext({ subject: mj, week, seed: 6 }))
      : '';
  },
  () => render('{hunt.feast.s3}', buildTextContext({ subject: mj, week, seed: 7, globals: { feastStage: 3 } })),
  () => render('{contest.payoff.legacy.s0}', buildTextContext({
    subject: mj,
    week,
    seed: 8,
    globals: { yourGain: 12 },
  })),
  () => render('{sumo.payoff.legacy.s0}', buildTextContext({
    subject: mj,
    week,
    seed: 9,
    globals: { gainAccum: 8 },
  })),
  () => render('{recording.opening.s0}', buildTextContext({ subject: mj, week, seed: 10 })),
];

assert.ok(week > LEGACY_BRIDGE_WEEK_MAX);

let modular = 0;
for (let i = 0; i < pulls.length; i += 1) {
  const line = pulls[i]()?.trim() || '';
  assert.ok(line.length > 20, `short render pull ${i}: "${line.slice(0, 40)}"`);
  assert.ok(!line.includes('{unresolved}'), `unresolved pull ${i}`);
  if (MODULAR_FP.test(line)) modular += 1;
}

assert.ok(modular >= Math.ceil(pulls.length * 0.5), `expected >=50% modular bridge hits @ week ${week}, got ${modular}/${pulls.length}`);

console.log(`test-text-migration-bridge-late: ok (${modular}/${pulls.length} modular @ week ${week})`);
