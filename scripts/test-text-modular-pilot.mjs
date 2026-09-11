#!/usr/bin/env node
/** Wife Lessons fragment pilot — composable slots render without unresolved tokens. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { renderWifeLessonBeat } from '../src/textEngine/scenes/wifeLessons/index.js';
import { WL_LESSONS } from '../src/gameData/wifeLessonsData.js';

const mj = { id: 0, name: 'Mary Jane', archetype: 'farm_girl', lbs: 240, relationship: 70 };
const ctx = buildTextContext({ subject: mj, week: 8, globals: { wlStage: 1, lessonId: 'honey_butter' } });

const aroma = render('{wl.lesson.aroma}', ctx)?.trim() || '';
assert.ok(aroma.length > 20, 'wl.lesson.aroma should render');
assert.ok(!aroma.includes('{unresolved}'), 'wl.lesson.aroma unresolved');

const lesson = WL_LESSONS[1]?.find((l) => l.id === 'honey_butter');
assert.ok(lesson, 'honey_butter lesson row');

const beat = renderWifeLessonBeat(1, lesson, mj, 8);
assert.ok(beat.length > 40, 'renderWifeLessonBeat should return prose');
assert.ok(!beat.includes('{unresolved}'), `wife lesson beat unresolved: ${beat.slice(0, 120)}`);

const samples = new Set();
for (let i = 0; i < 8; i += 1) {
  const line = render('{wifeLessons.lesson.s1.honey_butter}', { ...ctx, seed: 1000 + i })?.trim() || '';
  assert.ok(!line.includes('{unresolved}'), 'modular lesson pool unresolved');
  samples.add(line);
}
assert.ok(samples.size >= 2, 'modular lesson pool should vary across seeds');

let lessonKeys = 0;
for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.id) continue;
    lessonKeys += 1;
    const key = `{wifeLessons.lesson.s${stage}.${lesson.id}}`;
    const line = render(key, buildTextContext({ subject: mj, week: 10, seed: 42 + lessonKeys }))?.trim() || '';
    assert.ok(line.length > 12, `short render for ${key}: "${line}"`);
    assert.ok(!line.includes('{unresolved}'), `unresolved in ${key}`);
  }
}
assert.ok(lessonKeys >= 24, `expected >=24 WL lessons, got ${lessonKeys}`);

const destiny = { id: 5, name: 'Destiny', archetype: 'gamer', lbs: 210, evolvedForm: 'eating_streamer' };
const evCtx = buildTextContext({
  subject: destiny,
  week: 12,
  globals: { formId: 'eating_streamer', stageIdx: 0, phaseIdx: 0, history: [], featureId: 'evolved_event' },
});
const evLine = render('{evolved.event.eating_streamer.s0.p0}', { ...evCtx, seed: 77 })?.trim() || '';
assert.ok(evLine.length > 30, 'evolved modular phase should render');
assert.ok(!evLine.includes('{unresolved}'), 'evolved modular phase unresolved');

const evSamples = new Set();
for (let i = 0; i < 6; i += 1) {
  evSamples.add(render('{evolved.event.eating_streamer.s0.p0}', { ...evCtx, seed: 200 + i })?.trim() || '');
}
assert.ok(evSamples.size >= 2, 'evolved modular phase should vary');

console.log(`test-text-modular-pilot: ok (${lessonKeys} lessons + evolved phase)`);
