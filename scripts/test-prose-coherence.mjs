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
  FAIR_TRAINING_CONFIG, FAIR_DAY_SCENES, FAIR_BOOST_SUMMARIES,
} from '../src/gameData/evolvedForms.js';
import { EVOLVED_MINIGAMES } from '../src/gameData/evolvedMinigames.js';
import { CG_FILLED_DIARY, CG_RA_REPLY_TEXT } from '../src/gameData/competitiveGainerText.js';
import { TALK_TOPICS } from '../src/gameData/talkSystem.js';
import { SKILLS, SKILL_TREES } from '../src/gameData/skillTrees.js';
import { createContext } from '../src/textEngine/engine.js';
import { renderEvolvedEventProse } from '../src/textEngine/scenes/evolved/index.js';
import '../src/textEngine/scenes/talkCodas.js';
import '../src/textEngine/scenes/talkEncourage.js';
import '../src/textEngine/scenes/talkCheckIn.js';
import '../src/textEngine/scenes/talkCompliment.js';
import '../src/textEngine/scenes/talkSuggest.js';
import '../src/textEngine/scenes/talkRefusal.js';
import '../src/textEngine/scenes/talkDiscontent.js';
import '../src/textEngine/scenes/talkCommandFinish.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { renderClassSceneText, renderClassChoiceResult } from '../src/textEngine/scenes/campusEvent/classIntegration.js';
import { renderScrutinyTierUp } from '../src/textEngine/scenes/scrutiny/index.js';
import { renderGroupDinnerReaction } from '../src/textEngine/scenes/dinner/index.js';
import '../src/textEngine/scenes/homeroom/index.js';
import { renderHomeroomPool } from '../src/textEngine/scenes/homeroom/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';
import { renderCampusSighting } from '../src/textEngine/scenes/campusExplorationText.js';
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
import { renderWeighInIntro, renderWeighInReaction } from '../src/textEngine/scenes/weighIn/index.js';
import { renderHearingPhase } from '../src/textEngine/scenes/opposition/index.js';
import { renderAscensionCeremony } from '../src/textEngine/scenes/ascension/index.js';
import { renderOppositionEndgame } from '../src/textEngine/scenes/opposition/index.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../src/textEngine/scenes/hungerInterrupt/index.js';
import { renderConfront, renderConfrontWithMemory } from '../src/textEngine/scenes/confront/index.js';
import '../src/textEngine/scenes/hungerInterrupt/index.js';
import '../src/textEngine/scenes/confront/index.js';
import { renderContestPayoff, renderContestWeighIn2 } from '../src/textEngine/scenes/eatingContest/index.js';
import { renderSumoPayoff, renderSumoAftermath } from '../src/textEngine/scenes/sumoMatch/index.js';
import { SALON_COURSES, SALON_SERVICE_CHOICES } from '../src/gameData/chloeSalon.js';
import { renderRecordingOpening } from '../src/textEngine/scenes/recordingSession/index.js';
import { renderCollabPayoff } from '../src/textEngine/scenes/collabStream/index.js';
import { renderCultivatorIntro, renderCultivatorRecruitment } from '../src/textEngine/scenes/cultivator/index.js';
import { CLUE_INVESTIGATION, HUNT_NODES } from '../src/gameData/lilith.js';
import { CULT_DISTRIBUTION_ROUTES } from '../src/gameData/pharmacistCult.js';
import { LAB_ACQUISITION_OPTIONS } from '../src/gameData/talia.js';
import { renderLabSessionBeat } from '../src/textEngine/scenes/talia/lab.js';
import { DESTINY_SPEND_ITEMS } from '../src/gameData/streaming.js';
import { HOSTESS_HANGOUTS, MENU_TIERS, ATMOSPHERE_TIERS, GUEST_TIERS } from '../src/gameData/chapterHostess.js';
import { ACQUISITION_BY_STAGE } from '../src/gameData/pharmacistIngredients.js';
import { getOriginDeck } from '../src/gameData/origins/index.js';
import { INTIMACY_SCENES } from '../src/gameData/intimacy.js';
import { renderIntimacyPhase } from '../src/textEngine/scenes/intimacy/index.js';
import '../src/textEngine/scenes/intimacy/index.js';
import { CAMPUS_NODES } from '../src/gameData/campus.js';
import '../src/textEngine/scenes/campus/fragments.js';

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
  /\bbetween classes\b/i,
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
  /\bscholarship dissolving\b/i,
  /\bbetween seminars\b/i,
  /\bwon a scholarship\b/i,
  /\+\d+ class\b/i,
  /\bstudent removal\b/i,
  /\bexchange student\b/i,
  /\bThere's a student\b/i,
  /\bflags a student\b/i,
  /\bprospective student group\b/i,
  /\bstudent wellness portal\b/i,
  /\bstudent-only\b/i,
  /\btransfer student\b/i,
  /\bnursing student\b/i,
  /\bgrad student\b/i,
  /\bevery other student\b/i,
  /\bbirthday student\b/i,
  /\bstruggling student\b/i,
  /\bascended students\b/i,
  /\bSeveral students\b/i,
  /\bThree students\b/i,
  /\bProspective students\b/i,
  /\bdesign student\b/i,
];

function assertClean(text, label) {
  if (!text || typeof text !== 'string') return;
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

const sightingCtx = { week: 10, campusFattening: true, campusTier: 2 };
const stageLbs = [140, 200, 280, 380];
for (const s of INIT_STUDENTS.slice(0, 12)) {
  for (const lbs of stageLbs) {
    const line = renderCampusSighting({ ...s, lbs }, sightingCtx, 'union');
    if (line) assertClean(line.replace(/^👁\s*/, ''), `campus sighting ${s.archetype}@${lbs}`);
  }
}

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

for (const archetype of ['bookworm', 'cheerleader', 'athlete', 'culinary', 'gamer', 'psych', 'nursing', 'overachiever']) {
  for (const line of FEEDER_SUBJECT_JOURNALS[archetype] || []) {
    assertClean(line, `feeder journal ${archetype}`);
  }
}

for (const archetype of ['swimmer', 'cheerleader', 'gamer', 'culinary', 'influencer']) {
  const subject = {
    ...(INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0]),
    lbs: 280,
    corruption: 35,
    addictionLevel: 2,
    hungerTier: 2,
  };
  const interrupt = renderHungerInterrupt(subject, 10, { v2DepthChance: 0 });
  if (interrupt) assertClean(interrupt, `hunger interrupt ${archetype}`);
  for (const action of ['feed', 'deny', 'talk', 'compound']) {
    const outcome = renderHungerOutcome(subject, action, 10, { v2DepthChance: 0 });
    if (outcome) assertClean(outcome, `hunger outcome ${archetype} ${action}`);
  }
  const confront = renderConfront(subject, 10, { v2DepthChance: 0, grievanceType: 'pushed' });
  if (confront) assertClean(confront, `confront ${archetype}`);
  const confrontMem = renderConfrontWithMemory(subject, 10, {
    v2DepthChance: 0,
    memType: 'stageUp',
    memWeeksAgo: 2,
  });
  if (confrontMem) assertClean(confrontMem, `confront memory ${archetype}`);
}

for (const [replyId, reply] of Object.entries(CG_RA_REPLY_TEXT)) {
  assertClean(reply.label, `CG RA reply ${replyId} label`);
  assertClean(reply.fallback, `CG RA reply ${replyId} fallback`);
  for (const [stage, line] of Object.entries(reply.byStage || {})) {
    assertClean(line, `CG RA reply ${replyId} ${stage}`);
  }
}

const talkSkillEffects = {
  unlockSuggestion: true,
  unlockCommand: true,
  devourersThreshold: true,
  totalSurrender: true,
};
const talkSubject = {
  ...swimmer,
  corruption: 55,
  relationship: 75,
  lbs: 310,
  stomachCapacity: 120,
  fullness: 20,
};
const talkCtx = createContext({
  subject: talkSubject,
  skillEffects: talkSkillEffects,
  week: 10,
  globals: { campusFattening: true, campusTier: 2, discontentTier: 0, complimentUnwelcome: false },
});
for (const topic of TALK_TOPICS) {
  if (topic.sceneType === 'devour') continue;
  if (!topic.engineTemplate) continue;
  const line = render(topic.engineTemplate, talkCtx);
  if (line) assertClean(line, `talk topic ${topic.id}`);
  if (topic.refusalTemplate) {
    const refusal = render(topic.refusalTemplate, talkCtx);
    if (refusal) assertClean(refusal, `talk refusal ${topic.id}`);
  }
}

const evolvedProseForms = ['homeroom_queen', 'campus_legend', 'competitive_gainer', 'food_researcher', 'psych_researcher'];
for (const formId of evolvedProseForms) {
  const events = EVOLVED_EVENTS[formId] || [];
  for (const [stageIdx, ev] of events.entries()) {
    const subjectArchetype = formId === 'psych_researcher' ? 'bookworm' : 'swimmer';
    const subject = {
      ...(INIT_STUDENTS.find((s) => s.archetype === subjectArchetype) || INIT_STUDENTS[0]),
      evolvedForm: formId,
      name: formId === 'psych_researcher' ? 'Nadia' : 'Maya',
      lbs: formId === 'psych_researcher' ? 320 : 340,
      startLbs: formId === 'psych_researcher' ? 200 : 130,
      archetype: subjectArchetype,
    };
    const journalSubject = INIT_STUDENTS.find((s) => s.archetype === 'swimmer') || INIT_STUDENTS[0];
    for (const phase of ev.phases || []) {
      const raw = typeof phase.text === 'function'
        ? phase.text([], subject, journalSubject)
        : phase.text;
      const rendered = renderEvolvedEventProse(raw, subject, 10, { formId, stageIdx, v2DepthChance: 0 });
      if (rendered) assertClean(rendered, `evolved prose ${formId} stage ${stageIdx}`);
      for (const ch of phase.choices || []) {
        const result = typeof ch.result === 'function' ? ch.result(subject) : ch.result;
        if (result) {
          const choiceRendered = renderEvolvedEventProse(result, subject, 10, { formId, stageIdx, v2DepthChance: 0 });
          if (choiceRendered) assertClean(choiceRendered, `evolved prose choice ${formId} ${ch.id}`);
        }
      }
    }
    for (const end of ev.endings || []) {
      const rawEnd = typeof end.text === 'function' ? end.text([], subject, 5) : end.text;
      const endRendered = renderEvolvedEventProse(rawEnd, subject, 10, { formId, stageIdx, v2DepthChance: 0 });
      if (endRendered) assertClean(endRendered, `evolved prose ending ${formId} stage ${stageIdx}`);
    }
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

for (const archetype of Object.keys(NADIA_SUBJECT_JOURNALS)) {
  for (const intro of NADIA_SUBJECT_JOURNALS[archetype]?.intro || []) {
    assert(!/\[placeholder/i.test(intro), `Nadia journal ${archetype} intro must not be placeholder`);
    assertClean(intro, `Nadia journal ${archetype} intro`);
  }
  for (const [stageIdx, row] of (NADIA_SUBJECT_JOURNALS[archetype]?.entries || []).entries()) {
    for (const [nivelIdx, entry] of row.entries()) {
      assert(!/\[placeholder/i.test(entry), `Nadia journal ${archetype} stage ${stageIdx} nivel ${nivelIdx} must not be placeholder`);
      assertClean(entry, `Nadia journal ${archetype} stage ${stageIdx} nivel ${nivelIdx}`);
    }
  }
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

for (const archetype of ['swimmer', 'bookworm', 'cheerleader', 'foodie']) {
  const subject = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
  const intro = renderWeighInIntro(subject, 10, false, { week: 10 });
  const reaction = renderWeighInReaction(subject, 10, { week: 10, bigScale: false });
  if (intro) assertClean(intro, `weigh-in intro ${archetype}`);
  if (reaction) assertClean(reaction, `weigh-in reaction ${archetype}`);
}

for (const [type, phaseIdx] of [['removal', 0], ['removal', 1], ['emergency', 0]]) {
  const hearingLine = renderHearingPhase(type, phaseIdx, swimmer, 12);
  if (hearingLine) assertClean(hearingLine, `hearing ${type} phase ${phaseIdx}`);
}

const ascensionLine = renderAscensionCeremony(
  { ...swimmer, id: swimmer.id, lbs: 520, ascensionPending: { formId: 'serena' } },
  16,
);
if (ascensionLine) assertClean(ascensionLine, 'ascension ceremony render');

for (const slot of [
  'opposition.endgame.synthesis',
  'opposition.endgame.capture',
  'opposition.endgame.banished',
  'opposition.endgame.allThin',
  'opposition.endgame.vance',
]) {
  const line = renderOppositionEndgame(slot, 18);
  if (line) assertClean(line, `opposition endgame ${slot}`);
}

const contestStudent = {
  ...(INIT_STUDENTS.find((s) => s.archetype === 'culinary') || INIT_STUDENTS[9]),
  lbs: 340,
  name: 'Reneé',
};
for (let stageIdx = 0; stageIdx < 5; stageIdx++) {
  const payoff = renderContestPayoff(stageIdx, contestStudent, 12, 10);
  if (payoff) assertClean(payoff, `contest payoff stage ${stageIdx}`);
  const weigh = renderContestWeighIn2(stageIdx, contestStudent, 8, 6, 330, 10);
  if (weigh) assertClean(weigh, `contest weigh-in stage ${stageIdx}`);
}

const sumoStudent = {
  ...(INIT_STUDENTS.find((s) => s.archetype === 'athlete') || INIT_STUDENTS[3]),
  lbs: 380,
  name: 'Serena',
};
for (let stageIdx = 0; stageIdx < 4; stageIdx++) {
  const payoff = renderSumoPayoff(stageIdx, sumoStudent, 15, 10);
  if (payoff) assertClean(payoff, `sumo payoff stage ${stageIdx}`);
  const aftermath = renderSumoAftermath(stageIdx, sumoStudent, 15, true, 400, 10);
  if (aftermath) assertClean(aftermath, `sumo aftermath stage ${stageIdx}`);
}

for (const course of SALON_COURSES) {
  assertClean(course.label, `salon course ${course.id}`);
}
for (const choice of SALON_SERVICE_CHOICES) {
  assertClean(choice.label, `salon service ${choice.id}`);
}

assertClean(CLUE_INVESTIGATION.title, 'lilith clue title');
assertClean(CLUE_INVESTIGATION.text, 'lilith clue text');
assertClean(CLUE_INVESTIGATION.resultText, 'lilith clue result');
for (const node of Object.values(HUNT_NODES)) {
  assertClean(`${node.label} ${node.desc}`, `lilith hunt node ${node.id}`);
}
for (const route of CULT_DISTRIBUTION_ROUTES) {
  assertClean(`${route.label} ${route.desc}`, `cult route ${route.id}`);
}

const kylie = INIT_STUDENTS.find((s) => s.id === 2) || INIT_STUDENTS[2];
const partner = INIT_STUDENTS.find((s) => s.archetype === 'influencer' && s.id !== kylie.id) || INIT_STUDENTS[0];
for (let stageIdx = 0; stageIdx < 4; stageIdx++) {
  const opening = renderRecordingOpening(stageIdx, kylie, 10);
  if (opening) assertClean(opening, `recording opening stage ${stageIdx}`);
  const collabPayoff = renderCollabPayoff(stageIdx, 10, 8, partner, kylie, 10);
  if (collabPayoff) assertClean(collabPayoff, `collab payoff stage ${stageIdx}`);
}
const cultivatorIntro = renderCultivatorIntro('milkshake', 'Maya', 10);
if (cultivatorIntro) assertClean(cultivatorIntro, 'cultivator intro');
const cultivatorRecruit = renderCultivatorRecruitment(10);
if (cultivatorRecruit) assertClean(cultivatorRecruit, 'cultivator recruitment');

for (const cfg of Object.values(FAIR_TRAINING_CONFIG.collaborators)) {
  assertClean(cfg.label, `fair collab ${cfg.influenceKey}`);
}
for (const scene of Object.values(FAIR_DAY_SCENES.weighIn)) {
  assertClean(scene.choice1.label, 'fair weigh-in choice1');
  assertClean(scene.choice2.label, 'fair weigh-in choice2');
  assertClean(scene.open, 'fair weigh-in open');
}
for (const line of Object.values(FAIR_DAY_SCENES.judging)) {
  assertClean(line, 'fair judging');
}
for (const scene of Object.values(FAIR_DAY_SCENES.afterparty)) {
  assertClean(scene.choice1.label, 'fair afterparty choice1');
  assertClean(scene.choice2.label, 'fair afterparty choice2');
}
for (const tiers of Object.values(FAIR_BOOST_SUMMARIES)) {
  for (const line of Object.values(tiers)) assertClean(line, 'fair boost summary');
}

const taliaStudent = INIT_STUDENTS.find((s) => s.archetype === 'gamer') || INIT_STUDENTS[0];
for (const phase of ['acquire', 'session']) {
  const labBeat = renderLabSessionBeat({ ...taliaStudent, lbs: 280, name: 'Talia' }, 10, phase, { v2DepthChance: 0 });
  if (labBeat) assertClean(labBeat, `lab session ${phase}`);
}
for (const stageOpts of Object.values(LAB_ACQUISITION_OPTIONS)) {
  for (const opt of stageOpts) {
    assertClean(`${opt.label} ${opt.grant}`, `lab acquisition ${opt.id}`);
  }
}
for (const item of DESTINY_SPEND_ITEMS) {
  assertClean(`${item.label} ${item.desc}`, `destiny spend ${item.id}`);
}

for (const [key, vignettes] of Object.entries(HOSTESS_HANGOUTS)) {
  for (const [idx, vignette] of vignettes.entries()) {
    assertClean(vignette.title, `hostess hangout ${key} ${idx} title`);
    const intro = typeof vignette.intro === 'function' ? vignette.intro({ name: 'Tiffany', lbs: 280 }) : vignette.intro;
    if (intro) assertClean(intro, `hostess hangout ${key} ${idx} intro`);
    for (const ch of vignette.choices || []) {
      assertClean(`${ch.label} ${ch.result}`, `hostess hangout ${key} ${idx} ${ch.id}`);
    }
  }
}
for (const tiers of [MENU_TIERS, ATMOSPHERE_TIERS, GUEST_TIERS]) {
  for (const tier of tiers) {
    if (tier?.label) assertClean(`${tier.label} ${tier.desc || ''}`, 'hostess tier');
  }
}
for (const stageOpts of Object.values(ACQUISITION_BY_STAGE)) {
  for (const opt of stageOpts) {
    assertClean(`${opt.label} ${opt.desc} ${opt.flavor || ''}`, `pharmacist acquire ${opt.id}`);
  }
}
for (const archetype of ['swimmer', 'bookworm', 'cheerleader', 'foodie']) {
  const subject = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
  for (const card of getOriginDeck(subject)) {
    assertClean(`${card.label} ${card.voiceLine}`, `origin ${archetype} ${card.id}`);
  }
}

for (const node of Object.values(CAMPUS_NODES)) {
  assertClean(`${node.label} ${node.desc || ''} ${node.eat || ''}`, `campus node ${node.id}`);
  for (const line of node.flavor || []) {
    assertClean(line, `campus node ${node.id} flavor`);
  }
}
const campusIntroCtx = buildTextContext({ subject: INIT_STUDENTS[0], week: 8, globals: { campusLocale: 'hallway' } });
const campusIntro = render('{campus.localeIntro}', campusIntroCtx)?.trim();
if (campusIntro) assertClean(campusIntro, 'campus locale intro');

const intimacyStudent = { ...(INIT_STUDENTS.find((s) => s.archetype === 'swimmer') || INIT_STUDENTS[0]), lbs: 280, name: 'Maya' };
for (const scene of INTIMACY_SCENES) {
  assertClean(`${scene.label} ${scene.desc}`, `intimacy scene ${scene.id}`);
  for (const ch of scene.phases?.[0]?.choices || []) {
    assertClean(ch.label, `intimacy choice ${scene.id} ${ch.id}`);
  }
  const phase0 = renderIntimacyPhase(scene.id, 0, intimacyStudent, [], 2, 10, { v2DepthChance: 0 });
  if (phase0) assertClean(phase0, `intimacy phase ${scene.id} p0`);
}

for (const tree of Object.values(SKILL_TREES)) {
  assertClean(`${tree.label} ${tree.blurb}`, `skill tree ${tree.id}`);
}
for (const skill of SKILLS) {
  assertClean(`${skill.name} ${skill.desc} ${skill.rankDesc?.(1) || ''}`, `skill ${skill.id}`);
}

console.log('prose-coherence: narrative, class scenes, unlocks, Cassidy arc, opposition, minigames, dinner, evolved, homeroom, journals, campus nodes, weigh-in, talk, CG replies, hunger, confront, contest, sumo, salon, lilith, cult, recording, collab, cultivator, fair, lab, destiny, hostess, pharmacist, origin, intimacy, skill trees OK');
