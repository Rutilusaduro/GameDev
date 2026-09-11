#!/usr/bin/env node
/** Wife Lessons fragment pilot — composable slots render without unresolved tokens. */
import assert from 'node:assert/strict';
import '../src/textEngine/scenes/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import { renderWifeLessonBeat } from '../src/textEngine/scenes/wifeLessons/index.js';
import { WL_LESSONS } from '../src/gameData/wifeLessonsData.js';
import { renderTapOutLine } from '../src/textEngine/scenes/session/tapOutPools.js';
import { renderRosterUnlockScene } from '../src/textEngine/scenes/unlockScene/index.js';
import { renderCGPriyaFollowup } from '../src/textEngine/scenes/competitiveGainer/index.js';

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
const cassidy = { id: 1, name: 'Cassidy', archetype: 'swimmer', lbs: 220, relationship: 55 };
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

const talkLine = render('{wifeLessons.talk.Darlene.s1.greeting}', buildTextContext({
  subject: mj,
  week: 8,
  seed: 301,
}))?.trim() || '';
assert.ok(talkLine.length > 20, 'WL talk greeting modular render');
assert.ok(!talkLine.includes('{unresolved}'), 'WL talk greeting unresolved');

const choiceLine = render('{evolved.event.eating_streamer.s0.p0.hype_chat}', {
  ...evCtx,
  week: 10,
  seed: 302,
})?.trim() || '';
assert.ok(choiceLine.length > 20, 'evolved choice modular render');
assert.ok(!choiceLine.includes('{unresolved}'), 'evolved choice unresolved');

const optLine = render('{wifeLessons.talk.Darlene.s1.opt0.sub0}', buildTextContext({
  subject: mj,
  week: 8,
  seed: 401,
}))?.trim() || '';
assert.ok(optLine.length > 15, 'WL talk opt/sub modular render');
assert.ok(!optLine.includes('{unresolved}'), 'WL talk opt/sub unresolved');

const endLine = render('{evolved.event.eating_streamer.s0.end0}', {
  ...evCtx,
  week: 10,
  seed: 402,
})?.trim() || '';
assert.ok(endLine.length > 15, 'evolved ending modular render');
assert.ok(!endLine.includes('{unresolved}'), 'evolved ending unresolved');

const homeroomLine = render('{homeroom.conference.Kayla.intro}', buildTextContext({
  subject: mj,
  week: 9,
  seed: 501,
}))?.trim() || '';
assert.ok(homeroomLine.length > 15, 'homeroom conference modular intro');
assert.ok(!homeroomLine.includes('{unresolved}'), 'homeroom intro unresolved');

let wlLateModular = false;
for (let i = 0; i < 12; i += 1) {
  const late = render('{wifeLessons.lesson.s1.honey_butter}', buildTextContext({
    subject: mj,
    week: 22,
    seed: 600 + i,
  }))?.trim() || '';
  assert.ok(!late.includes('{unresolved}'), 'WL late lesson unresolved');
  if (/yeasty warmth|Fat is what makes a home|circleEat|lateFeast/i.test(late)) wlLateModular = true;
}
assert.ok(wlLateModular, 'WL lesson should compose modular slots at week 22');

const reactLine = render('{evolved.reaction.eating_streamer.s0}', buildTextContext({
  subject: destiny,
  week: 14,
  seed: 701,
}))?.trim() || '';
assert.ok(reactLine.length > 30, 'evolved reaction modular render');
assert.ok(!reactLine.includes('{unresolved}'), 'evolved reaction unresolved');
assert.match(reactLine, /Residents notice|hall reads|eats without apology/i, 'evolved reaction slots');

const outfitLine = render('{evolved.outfit.eating_streamer.s0}', buildTextContext({
  subject: { ...destiny, evolvedForm: 'eating_streamer', lbs: 260 },
  week: 16,
  seed: 801,
}))?.trim() || '';
assert.ok(outfitLine.length > 25, 'evolved outfit modular render');
assert.match(outfitLine, /Seams whisper|wears the strain|Stretch panels|Buttons hold/i, 'evolved outfit slots');

const blurbLine = render('{evolution.blurb.gamer}', buildTextContext({
  subject: destiny,
  week: 14,
  globals: { archetype: 'gamer' },
  seed: 802,
}))?.trim() || '';
assert.ok(blurbLine.length > 25, 'evolution blurb modular render');
assert.match(blurbLine, /threshold|next stage|Floor favor|roster agree|pep rally/i, 'evolution blurb slots');

const tapLine = renderTapOutLine(cassidy, 120, 16);
assert.ok(tapLine.length > 25, 'tap-out modular render');
assert.match(tapLine, /Breath comes shallow|stuffed middle|tapping out|Tap-out is mercy/i, 'tap-out slots');

const unlockLine = renderRosterUnlockScene(cassidy, 12);
assert.ok(unlockLine.length > 25, 'roster unlock modular render');
assert.match(unlockLine, /hall door|Floor check-in|kitchen first|orientation|Wellness framing/i, 'unlock slots');

const priya = { id: 99, name: 'Priya', archetype: 'competitive_gainer', lbs: 260 };
const fu = renderCGPriyaFollowup(priya, 18, 'leading', 'Invested', { seed: 803 });
assert.ok(fu.length > 25, 'CG followup modular render');
assert.match(fu, /Priya replies|Residents read|Competition turns communal|hunger spikes/i, 'CG followup slots');

console.log(`test-text-modular-pilot: ok (${lessonKeys} lessons + talk + homeroom + evolved phase/choice/ending)`);
