#!/usr/bin/env node
/** Sample-render key narrative surfaces for RA dorm voice coherence. */
import assert from 'assert';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText, renderClassChoiceResult } from '../src/textEngine/scenes/campusEvent/classIntegration.js';

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

console.log('prose-coherence: narrative titles, class scenes, unlock scenes, weekly beats OK');
