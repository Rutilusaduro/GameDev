#!/usr/bin/env node
/** Sample-render key narrative surfaces for RA dorm voice coherence. */
import assert from 'assert';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { THESIS_BOARD, CASE_STUDY_PAIRS, HAVE_A_CHAT_SCENES } from '../src/gameData/communityResearcher.js';
import { EVOLVED_OUTFITS } from '../src/gameData/evolvedForms.js';
import { EVOLVED_MINIGAMES } from '../src/gameData/evolvedMinigames.js';
import { CG_FILLED_DIARY } from '../src/gameData/competitiveGainerText.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText, renderClassChoiceResult } from '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { renderScrutinyTierUp } from '../src/textEngine/scenes/scrutiny/index.js';
import { renderGroupDinnerReaction } from '../src/textEngine/scenes/dinner/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';
import '../src/textEngine/scenes/campusExplorationText.js';

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
  /\bAcademic Subject\b/i,
  /\bDean of Academic Affairs\b/i,
  /\bOffice of Academic Integrity\b/i,
  /\bAcademics are listed\b/i,
  /\bacademia pretends\b/i,
  /\bacademic (interest|calm|environment)\b/i,
  /\bacademically\b/i,
  /\bfor academia\b/i,
  /\btracking this academically\b/i,
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

for (const scene of HAVE_A_CHAT_SCENES) {
  assertClean(scene.member, `have-a-chat member ${scene.member}`);
  let history = [];
  for (const phase of scene.phases) {
    const body = typeof phase.text === 'function' ? phase.text(history) : phase.text;
    assertClean(body, `have-a-chat ${scene.member} phase`);
    for (const ch of phase.choices) {
      assertClean(ch.label, `have-a-chat ${scene.member} choice ${ch.id}`);
      history = [...history, ch.id];
    }
  }
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

for (const [gameId, def] of Object.entries(EVOLVED_MINIGAMES)) {
  assertClean(`${def.title} ${def.tag}`, `minigame ${gameId} header`);
  for (const phase of def.phases) {
    const body = typeof phase.text === 'function' ? phase.text({ studentName: 'Maya' }) : phase.text;
    assertClean(body, `minigame ${gameId} phase`);
    for (const ch of phase.choices) {
      assertClean(`${ch.label} ${ch.log}`, `minigame ${gameId} choice ${ch.id}`);
    }
  }
}

for (const entry of CG_FILLED_DIARY) {
  assertClean(entry, 'Priya competitive gainer diary');
}

for (const tierId of [1, 2, 3]) {
  assertClean(renderScrutinyTierUp(tierId, { week: 10 }), `scrutiny tier ${tierId}`);
}

const campusCtx = buildTextContext({ week: 6, globals: { campusTierMin: 0 } });
const campusLine = render('{campus.travel}', campusCtx)?.trim();
if (campusLine) assertClean(campusLine, 'campus travel flavor');

const dinnerKinds = ['thinJealousy', 'fatEncourage', 'fatRetort', 'thinContextual', 'jealousyDefault'];
const refStudent = INIT_STUDENTS.find((s) => s.archetype === 'cheerleader') || INIT_STUDENTS[0];
for (const kind of dinnerKinds) {
  for (const archetype of ['bookworm', 'swimmer', 'influencer', 'foodie']) {
    const subject = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
    for (const level of [0, 1, 2, 3]) {
      const line = renderGroupDinnerReaction(kind, subject, refStudent, 8, { reactionLevel: level });
      if (line) assertClean(line, `dinner ${kind} ${archetype} L${level}`);
    }
  }
}

console.log('prose-coherence: narrative, class scenes, unlocks, Cassidy arc, opposition, minigames, dinner OK');
