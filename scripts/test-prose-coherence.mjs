#!/usr/bin/env node
/** Sample-render key narrative surfaces for RA dorm voice coherence. */
import assert from 'assert';
import { CLASS_SCENES } from '../src/gameData/classEvents.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { THESIS_BOARD, CASE_STUDY_PAIRS, HAVE_A_CHAT_SCENES } from '../src/gameData/communityResearcher.js';
import {
  EVOLVED_OUTFITS, EVOLVED_EVENTS, EVOLVED_REACTIONS, EVOLVED_ACTIVITY_TEXT,
  FEEDER_SUBJECT_JOURNALS, HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES,
} from '../src/gameData/evolvedForms.js';
import { EVOLVED_MINIGAMES } from '../src/gameData/evolvedMinigames.js';
import { CG_FILLED_DIARY } from '../src/gameData/competitiveGainerText.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText, renderClassChoiceResult } from '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { renderScrutinyTierUp } from '../src/textEngine/scenes/scrutiny/index.js';
import { renderGroupDinnerReaction } from '../src/textEngine/scenes/dinner/index.js';
import '../src/textEngine/scenes/homeroom/index.js';
import { renderHomeroomPool } from '../src/textEngine/scenes/homeroom/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';
import '../src/textEngine/scenes/campusExplorationText.js';
import '../src/textEngine/scenes/diary.js';
import { renderDiary } from '../src/textEngine/scenes/diary.js';
import { NADIA_SUBJECT_JOURNALS } from '../src/gameData/nadiaSubjectJournals.js';
import { renderCampusEventBeat } from '../src/textEngine/scenes/campusEvent/index.js';
import { renderGossipMurmur } from '../src/textEngine/scenes/gossip/index.js';
import { renderMemoryClass } from '../src/textEngine/scenes/memory/index.js';
import '../src/textEngine/scenes/opposition/oppositionSceneDepth.js';
import '../src/textEngine/scenes/v2/resonance/depth.js';
import '../src/textEngine/scenes/earlyGain/personas.js';

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
  /\bBest class I ever had\b/i,
  /\bstudents from class\b/i,
  /\bschool nurse\b/i,
  /\bschool file\b/i,
  /\bcooking class\b/i,
  /\bincoming classes\b/i,
  /\bincoming class\b/i,
  /\bWalk to class\b/i,
  /\bsettles into class\b/i,
  /\bGood first class\b/i,
  /\bFirst class\./i,
  /\bBetween classes,\b/i,
  /\btoward her next class\b/i,
  /\bclass-wide (hunger|abundance|pulse)\b/i,
  /\bbeen to class today\b/i,
  /\bClass ends but appetite\b/i,
  /\bjogs to class\b/i,
  /\bwalks to class\b/i,
  /\breal scholarship\b/i,
  /\bEthnographic Self-Study\b/i,
  /\bThe scholarship got better\b/i,
  /\bPROF · SCALE\b/i,
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
const thesisSwimmerBeat = renderWeeklyEvent('thesis_rewrite', swimmer, { week: 6 });
const seasonBeat = renderWeeklyEvent('season_plan_rewrite', swimmer, { week: 6 });
assertClean(thesisBeat, 'thesis_rewrite bookworm render');
assertClean(thesisSwimmerBeat, 'thesis_rewrite swimmer render');
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

const mockStudent = { name: 'Cassidy', lbs: 320 };
for (const ev of EVOLVED_EVENTS.community_researcher || []) {
  assertClean(ev.title, `Cassidy evolved event title`);
  for (const phase of ev.phases || []) {
    const body = typeof phase.text === 'function' ? phase.text([], mockStudent) : phase.text;
    assertClean(body, `Cassidy evolved ${ev.title} phase`);
    for (const ch of phase.choices || []) {
      const result = typeof ch.result === 'function' ? ch.result(mockStudent) : ch.result;
      assertClean(`${ch.label} ${result}`, `Cassidy evolved choice ${ch.id}`);
    }
  }
  for (const end of ev.endings || []) {
    const text = typeof end.text === 'function' ? end.text([], mockStudent, 5) : end.text;
    if (text) assertClean(text, `Cassidy evolved ${ev.title} ending`);
  }
}

const daisy = INIT_STUDENTS.find((s) => s.id === 13) || INIT_STUDENTS[0];
for (const [npcKey, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  assertClean(typeof ev.text === 'function' ? ev.text : ev.text, `homeroom conference ${npcKey}`);
  for (const ch of ev.choices || []) {
    assertClean(ch.label, `homeroom conference ${npcKey} choice label`);
    const result = typeof ch.result === 'function' ? ch.result : ch.result;
    if (result) assertClean(result, `homeroom conference ${npcKey} choice ${ch.id}`);
    const poolKey = `homeroom.conference.${npcKey}.${ch.id}`;
    const rendered = renderHomeroomPool(poolKey, daisy, 10);
    if (rendered) assertClean(rendered, `homeroom pool ${poolKey}`);
  }
}

for (const [actKey, act] of Object.entries(HOMEROOM_GROUP_ACTIVITIES)) {
  assertClean(act.label, `homeroom activity ${actKey} label`);
  if (act.text) assertClean(act.text, `homeroom activity ${actKey} intro`);
  const phases = act.phases || [{ text: act.text, choices: act.choices || [] }];
  for (const [pi, phase] of phases.entries()) {
    const body = typeof phase.text === 'function' ? phase.text() : phase.text;
    if (body) assertClean(body, `homeroom activity ${actKey} phase ${pi}`);
    for (const ch of phase.choices || []) {
      assertClean(ch.label, `homeroom activity ${actKey} choice label`);
      const result = typeof ch.result === 'function' ? ch.result() : ch.result;
      if (result) assertClean(result, `homeroom activity ${actKey} choice ${ch.id}`);
      const poolKey = `homeroom.activity.${actKey}.p${pi}.${ch.id}`;
      const rendered = renderHomeroomPool(poolKey, daisy, 10);
      if (rendered) assertClean(rendered, `homeroom pool ${poolKey}`);
    }
  }
  for (const ch of act.choices || []) {
    assertClean(ch.label, `homeroom activity ${actKey} flat choice label`);
    const result = typeof ch.result === 'function' ? ch.result() : ch.result;
    if (result) assertClean(result, `homeroom activity ${actKey} flat choice ${ch.id}`);
  }
}

for (const line of FEEDER_SUBJECT_JOURNALS.swimmer || []) {
  assertClean(line, 'feeder journal swimmer');
}

for (const archetype of ['bookworm', 'cheerleader']) {
  for (const line of FEEDER_SUBJECT_JOURNALS[archetype] || []) {
    assertClean(line, `feeder journal ${archetype}`);
  }
}

for (const line of EVOLVED_REACTIONS.campus_legend || []) {
  assertClean(line, 'campus legend reaction');
}

const activityForms = ['community_researcher', 'food_researcher', 'campus_legend', 'chapter_hostess', 'wife_lessons'];
const activityStudent = { name: 'Maya', lbs: 340, archetype: 'swimmer' };
for (const formId of activityForms) {
  const beats = EVOLVED_ACTIVITY_TEXT[formId];
  if (!beats) continue;
  for (const [idx, beat] of beats.entries()) {
    const text = typeof beat === 'function' ? beat(activityStudent) : beat;
    if (text) assertClean(text, `evolved activity ${formId} beat ${idx}`);
  }
}

const campusLegendDiary = renderDiary(
  { ...INIT_STUDENTS[0], evolvedForm: 'campus_legend', lbs: 420, archetype: 'foodie', name: 'Riley' },
  24,
);
if (campusLegendDiary) assertClean(campusLegendDiary, 'campus legend diary render');

const wifeLessonsDiary = renderDiary(
  { ...INIT_STUDENTS[0], evolvedForm: 'wife_lessons', lbs: 280, archetype: 'foodie', name: 'Mary Jane' },
  18,
);
if (wifeLessonsDiary) assertClean(wifeLessonsDiary, 'wife lessons diary render');

for (const intro of NADIA_SUBJECT_JOURNALS.swimmer?.intro || []) {
  assertClean(intro, 'Nadia journal swimmer intro');
}
for (const row of NADIA_SUBJECT_JOURNALS.bookworm?.entries?.[0] || []) {
  assertClean(row, 'Nadia journal bookworm entry');
}

for (const archetype of ['bookworm', 'swimmer', 'cheerleader']) {
  const beat = renderCampusEventBeat(
    INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0],
    8,
  );
  if (beat) assertClean(beat, `campus event beat ${archetype}`);
}

for (const archetype of ['influencer', 'foodie', 'gamer']) {
  const murmur = renderGossipMurmur(
    INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0],
    10,
  );
  if (murmur) assertClean(murmur, `gossip murmur ${archetype}`);
}

const memCtx = buildTextContext({
  subject: INIT_STUDENTS[0],
  week: 12,
  globals: { memName: 'Cassidy', memType: 'stageUp', memWeeksAgo: 2 },
});
const memoryLine = render('{memory.class}', memCtx)?.trim();
if (memoryLine) assertClean(memoryLine, 'memory.class render');

const oppEndCtx = buildTextContext({
  subject: swimmer,
  week: 14,
  globals: { corruption: 2, stageMin: 9 },
});
const oppEnd = render('{opposition.endgame.synthesis}', oppEndCtx)?.trim();
if (oppEnd) assertClean(oppEnd, 'opposition endgame synthesis');

const resCtx = buildTextContext({ subject: INIT_STUDENTS[0], week: 16, globals: { stageMin: 8 } });
const resSurge = render('{res.surge.depth}', resCtx)?.trim();
if (resSurge) assertClean(resSurge, 'resonance surge depth');

console.log('prose-coherence: narrative, class scenes, unlocks, Cassidy arc, opposition, minigames, dinner, evolved, homeroom, journals, campus OK');
