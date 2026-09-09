#!/usr/bin/env node
/** Sample-render key narrative surfaces for RA dorm voice coherence. */
import assert from 'assert';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { THESIS_BOARD, CASE_STUDY_PAIRS } from '../src/gameData/communityResearcher.js';
import { EVOLVED_OUTFITS } from '../src/gameData/evolvedForms.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText, renderClassChoiceResult } from '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';

const BANNED = [
  /\bProfessor Sim\b/i,
  /\bMadeline\b/,
  /spirit-possessed/i,
  /\bSpirit Hub\b/i,
  /\bthe class\b/i,
  /\bclassmates\b/i,
  /\bAcademic Pivot\b/,
  /\bacademic justification\b/i,
  /\bGPA\b/,
  /\bPhD\b/,
  /\bIRB Approval\b/i,
  /\bPresent Thesis\b/i,
  /\byour students\b/i,
  /\bProfessor's Quarters\b/i,
  /\bProf Sim\b/i,
  /\bProfessor Sim\b/i,
];

function assertClean(text, label) {
  for (const re of BANNED) {
    assert(!re.test(text), `${label} must not match ${re}: ${text.slice(0, 120)}`);
  }
}

for (const ev of NARRATIVE_EVENTS) {
  assertClean(ev.title, `narrative title ${ev.id}`);
}

for (const scene of CLASS_SCENES) {
  const student = INIT_STUDENTS.find((s) => scene.filter?.(s)) || INIT_STUDENTS[0];
  const body = typeof scene.text === 'function' ? scene.text(student) : scene.text;
  assertClean(`${scene.title} ${body}`, `class scene ${scene.id}`);
  scene.choices.forEach((ch, idx) => {
    const result = typeof ch.result === 'function' ? ch.result(student) : ch.result;
    assertClean(`${ch.label} ${result}`, `class scene ${scene.id} choice ${idx}`);
  });
}

for (const [id, prose] of Object.entries(UNLOCK_SCENES)) {
  assertClean(prose, `unlock scene ${id}`);
}

const swimmer = INIT_STUDENTS.find((s) => s.archetype === 'swimmer');
const bookworm = { ...INIT_STUDENTS[0], archetype: 'bookworm', name: 'Maya' };
assert(swimmer, 'swimmer fixture required');

const thesisBeat = renderWeeklyEvent('thesis_rewrite', bookworm, { week: 6 });
const seasonBeat = renderWeeklyEvent('season_plan_rewrite', swimmer, { week: 6 });
assertClean(thesisBeat, 'thesis_rewrite render');
assertClean(seasonBeat, 'season_plan_rewrite render');

const floorScene = CLASS_SCENES.find((s) => s.id === 'class_potluck');
const floorStudent = INIT_STUDENTS[0];
const floorText = renderClassSceneText(floorScene, floorStudent, 4);
const floorResult = renderClassChoiceResult(floorScene, 0, floorStudent, 4);
assertClean(floorText, 'floor check-in scene render');
assertClean(floorResult, 'floor check-in choice render');

for (const dorm of DORM_LIST) {
  assertClean(`${dorm.label} ${dorm.hook} ${dorm.tagline}`, `dorm ${dorm.id}`);
}

for (const phase of THESIS_BOARD.phases) {
  assertClean(phase('Cassidy'), 'Cassidy season plan board phase');
}

for (const outfit of EVOLVED_OUTFITS.community_researcher || []) {
  assertClean(outfit, 'Cassidy evolved outfit blurb');
}

for (const pair of CASE_STUDY_PAIRS) {
  assertClean(`${pair.label} ${pair.subtitle}`, `case study ${pair.id}`);
  const sample = pair.event?.(0, 1, INIT_STUDENTS.slice(0, 2));
  if (sample) assertClean(sample, `case study event ${pair.id}`);
}

const agendaIds = [
  'wellness_audit', 'device_confiscation', 'size_review',
  'wellness_seminar', 'budget_freeze', 'faculty_informant',
];
const oppCtx = buildTextContext({ subject: swimmer, week: 10 });
for (const id of agendaIds) {
  const line = render(`{opposition.agenda.${id}}`, oppCtx)?.trim();
  if (line) assertClean(line, `opposition agenda ${id}`);
}

console.log('prose-coherence: narrative, class scenes, unlocks, Cassidy arc, opposition OK');
