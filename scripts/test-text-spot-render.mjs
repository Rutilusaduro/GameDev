#!/usr/bin/env node
/** Spot-render key RA-pivot pools after bridge registration (smoke, not exhaustive). */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';

const cassidy = INIT_STUDENTS.find((s) => s.id === 1) || {
  id: 1,
  name: 'Cassidy',
  archetype: 'swimmer',
  lbs: 220,
  relationship: 55,
};
const destiny = INIT_STUDENTS.find((s) => s.id === 5) || { ...cassidy, id: 5, name: 'Destiny', archetype: 'gamer' };
const mj = { ...cassidy, id: 0, name: 'MJ', archetype: 'cheerleader', evolvedForm: 'state_fair_queen', lbs: 280 };
const daisy = INIT_STUDENTS.find((s) => s.id === 13) || { ...cassidy, id: 13, name: 'Daisy', archetype: 'eced' };
const brittany = INIT_STUDENTS.find((s) => s.id === 0) || { ...cassidy, id: 0, name: 'Brittany', archetype: 'cheerleader' };

const cases = [
  {
    label: 'hall blueprint',
    template: '{hall.blueprint.purchase}',
    ctx: buildTextContext({ subject: null, week: 6, globals: { hallRoomId: 'kitchen_pantry' } }),
  },
  {
    label: 'roster unlock',
    template: '{roster.unlock.s1}',
    ctx: buildTextContext({ subject: cassidy, week: 12 }),
  },
  {
    label: 'tap-out',
    template: '{session.tapOut.s1.st1}',
    ctx: buildTextContext({ subject: cassidy, week: 3, globals: { featureId: 'tap_out' } }),
  },
  {
    label: 'evolved reaction',
    template: '{evolved.reaction.eating_streamer.s0}',
    ctx: buildTextContext({
      subject: { ...destiny, evolvedForm: 'eating_streamer', lbs: 260 },
      week: 8,
    }),
  },
  {
    label: 'fair boost',
    template: '{fair.boost.Brittany}',
    ctx: buildTextContext({
      subject: mj,
      week: 10,
      globals: { fairCollab: 'Brittany', fairBoostTier: 'Mid' },
    }),
  },
  {
    label: 'homeroom conference',
    template: '{homeroom.conference.Kayla.intro}',
    ctx: buildTextContext({ subject: daisy, week: 5, globals: { homeroomKey: 'Kayla' } }),
  },
  {
    label: 'wife lesson',
    template: '{wifeLessons.lesson.s1.honey_butter}',
    ctx: buildTextContext({ subject: mj, week: 4, globals: { featureId: 'wife_lessons' } }),
  },
  {
    label: 'feeder journal',
    template: '{journal.feeder.cheerleader.s0}',
    ctx: buildTextContext({ subject: brittany, week: 6 }),
  },
  {
    label: 'ranked session arrival',
    template: '{session.rae.arrival.s2}',
    ctx: buildTextContext({
      subject: destiny,
      week: 12,
      globals: { featureId: 'ranked_session', sessionStage: 2 },
    }),
  },
  {
    label: 'evolution offer',
    template: '{evolution.offer.swimmer.intro}',
    ctx: buildTextContext({ subject: cassidy, week: 12 }),
  },
  {
    label: 'evolved activity',
    template: '{evolved.activity.eating_streamer}',
    ctx: buildTextContext({
      subject: { ...destiny, evolvedForm: 'eating_streamer', lbs: 250 },
      week: 9,
      globals: { evolvedFormId: 'eating_streamer', evolvedStageIdx: 1 },
    }),
  },
  {
    label: 'cultivator beat',
    template: '{cultivator.beat}',
    ctx: buildTextContext({
      subject: brittany,
      week: 8,
      globals: { featureId: 'cultivator' },
    }),
  },
  {
    label: 'evolved event phase',
    template: '{evolved.event.eating_streamer.s0.p0}',
    ctx: buildTextContext({
      subject: { ...destiny, evolvedForm: 'eating_streamer', lbs: 200 },
      week: 6,
      globals: { formId: 'eating_streamer', stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event' },
    }),
  },
];

for (const { label, template, ctx } of cases) {
  let line = '';
  try {
    line = render(template, ctx)?.trim() || '';
  } catch (err) {
    console.error(`test-text-spot-render: ${label} threw`, err);
    process.exit(1);
  }
  assert.ok(line.length > 12, `${label}: empty or too short: "${line}"`);
  assert.ok(!line.includes('{unresolved}'), `${label}: unresolved slots in "${line.slice(0, 80)}..."`);
}

console.log(`test-text-spot-render: ok (${cases.length} pools)`);
