#!/usr/bin/env node
/** Sample-render key narrative surfaces for RA dorm voice coherence. */
import assert from 'assert';
import { FLOOR_SCENES } from '../src/gameData/floorEvents.js';
import { NARRATIVE_EVENTS } from '../src/gameData/weeklyEventDefs.js';
import { UNLOCK_SCENES } from '../src/gameData/unlockScenes.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { DORM_LIST } from '../src/gameData/dorms.js';
import { THESIS_BOARD, CASE_STUDY_PAIRS, HAVE_A_CHAT_SCENES } from '../src/gameData/communityResearcher.js';
import { STAGE_REACTIONS } from '../src/gameData/content.js';
import {
  EVOLVED_OUTFITS, EVOLVED_EVENTS, EVOLVED_REACTIONS, EVOLVED_ACTIVITY_TEXT,
  EVOLUTION_BUTTON_BLURB, EVOLUTION_OFFER, WL_LESSONS, WL_DIALOGUES, CG_CHAT_TEMPLATES,
  FEEDER_SUBJECT_JOURNALS, HOMEROOM_CONFERENCE_EVENTS, HOMEROOM_GROUP_ACTIVITIES,
  FAIR_TRAINING_CONFIG, FAIR_DAY_SCENES, FAIR_BOOST_SUMMARIES,
} from '../src/gameData/evolvedForms.js';
import { FACULTY } from '../src/gameData/faculty.js';
import { EVOLVED_MINIGAMES } from '../src/gameData/evolvedMinigames.js';
import {
  CG_FILLED_DIARY, CG_RA_REPLY_TEXT, CG_FILLED_REACTIONS, CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES, CG_FILLED_CHAT_TEMPLATES, CG_FILLED_MEASUREMENT_REACTIONS,
} from '../src/gameData/competitiveGainerText.js';
import { TALK_TOPICS, REGISTER_CODAS } from '../src/gameData/talkSystem.js';
import { SKILLS, SKILL_TREES } from '../src/gameData/skillTrees.js';
import { createContext } from '../src/textEngine/engine.js';
import { renderEvolvedEventProse } from '../src/textEngine/scenes/evolved/index.js';
import '../src/textEngine/scenes/talkCodas.js';
import '../src/textEngine/scenes/researchJournal/depth.js';
import '../src/textEngine/scenes/talkEncourage.js';
import '../src/textEngine/scenes/talkCheckIn.js';
import '../src/textEngine/scenes/talkCompliment.js';
import '../src/textEngine/scenes/talkSuggest.js';
import '../src/textEngine/scenes/talkRefusal.js';
import '../src/textEngine/scenes/talkDiscontent.js';
import '../src/textEngine/scenes/talkCommandFinish.js';
import { renderWeeklyEvent } from '../src/textEngine/scenes/weeklyEvent/index.js';
import { weeklyEventHasModularText } from '../src/gameData/weeklyEventText.js';
import { renderFloorSceneText, renderFloorChoiceResult } from '../src/textEngine/scenes/campusEvent/floorCheckInIntegration.js';
import { renderScrutinyTierUp } from '../src/textEngine/scenes/scrutiny/index.js';
import { renderGroupDinnerReaction } from '../src/textEngine/scenes/dinner/index.js';
import '../src/textEngine/scenes/homeroom/index.js';
import { renderHomeroomPool } from '../src/textEngine/scenes/homeroom/index.js';
import { render } from '../src/textEngine/engine.js';
import { buildTextContext } from '../src/gameData/textContext.js';
import '../src/textEngine/scenes/opposition/agendaCards.js';
import '../src/textEngine/scenes/opposition/depth.js';
import '../src/textEngine/scenes/v2/v2ProseExpansion.js';
import { renderCampusSighting } from '../src/textEngine/scenes/campusExplorationText.js';
import '../src/textEngine/scenes/campusExplorationText.js';
import '../src/textEngine/scenes/diary.js';
import { renderDiary } from '../src/textEngine/scenes/diary.js';
import { renderEcologyReport } from '../src/textEngine/scenes/rosterTell/index.js';
import { NADIA_SUBJECT_JOURNALS } from '../src/gameData/nadiaSubjectJournals.js';
import { buildDevourScene } from '../src/gameData/devourScene.js';
import { FINAL_FORMS, FINAL_FORM_FX } from '../src/gameData/immobilityArrival.js';
import { renderCampusEventBeat } from '../src/textEngine/scenes/campusEvent/index.js';
import '../src/textEngine/scenes/campusEvent/depth.js';
import { renderGossipMurmur, renderGossipReact } from '../src/textEngine/scenes/gossip/index.js';
import { renderMemoryHall } from '../src/textEngine/scenes/memory/index.js';
import '../src/textEngine/scenes/opposition/oppositionSceneDepth.js';
import '../src/textEngine/scenes/v2/resonance/depth.js';
import '../src/textEngine/scenes/earlyGain/fragments.js';
import '../src/textEngine/scenes/earlyGain/personas.js';
import '../src/textEngine/scenes/body/portraitDepth.js';
import { renderBodyPortrait } from '../src/textEngine/scenes/body/index.js';
import '../src/textEngine/scenes/v2/dreams/depth.js';
import { renderWeighInIntro, renderWeighInReaction } from '../src/textEngine/scenes/weighIn/index.js';
import { renderGrowthScene } from '../src/textEngine/scenes/growthEvent/index.js';
import {
  renderEmbodiedArrive,
  renderEmbodiedEvent,
} from '../src/textEngine/scenes/v2/embodiment/campusWalk.js';
import '../src/textEngine/scenes/v2/embodiment/embodiedCampusDepth.js';
import '../src/textEngine/scenes/v2/rituals/depth.js';
import '../src/textEngine/scenes/wifeLessons/talkDepth.js';
import '../src/textEngine/scenes/wifeLessons/index.js';
import { getWlMomDialogueDepth, mergeWlDialogueEntry } from '../src/gameData/wlMomDialogueDepth.js';
import '../src/textEngine/scenes/hunt/feastStageUp.js';
import '../src/textEngine/scenes/hunt/feastDepth.js';
import { renderLilithFeast } from '../src/textEngine/scenes/hunt/index.js';
import '../src/textEngine/scenes/attitude.js';
import { renderHearingPhase } from '../src/textEngine/scenes/opposition/index.js';
import { renderAscensionCeremony } from '../src/textEngine/scenes/ascension/index.js';
import { renderOppositionEndgame } from '../src/textEngine/scenes/opposition/index.js';
import { renderHungerInterrupt, renderHungerOutcome } from '../src/textEngine/scenes/hungerInterrupt/index.js';
import { renderConfront, renderConfrontWithMemory } from '../src/textEngine/scenes/confront/index.js';
import '../src/textEngine/scenes/hungerInterrupt/index.js';
import '../src/textEngine/scenes/confront/index.js';
import { renderContestPayoff, renderContestWeighIn2 } from '../src/textEngine/scenes/eatingContest/index.js';
import { renderSumoPayoff, renderSumoAftermath } from '../src/textEngine/scenes/sumoMatch/index.js';
import { SALON_COURSES, SALON_SERVICE_CHOICES, SALON_EVOLVED_EVENTS } from '../src/gameData/chloeSalon.js';
import { SKILL_TREE } from '../src/gameData/skills.js';
import { CAMPUS_SECRETS } from '../src/gameData/campusSecrets.js';
import { CAMPUS_SOFT_FLAVOR } from '../src/gameData/pharmacistCampus.js';
import { RESONANCE_TIERS } from '../src/gameData/v2/cravingResonance.js';
import { planConflicts } from '../src/gameData/weekPlanner.js';
import { renderRecordingOpening } from '../src/textEngine/scenes/recordingSession/index.js';
import { renderCollabPayoff } from '../src/textEngine/scenes/collabStream/index.js';
import { renderCultivatorIntro, renderCultivatorRecruitment } from '../src/textEngine/scenes/cultivator/index.js';
import { CLUE_INVESTIGATION, HUNT_NODES, HUNT_MEN } from '../src/gameData/lilith.js';
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
import { DEVICE_CATALOG_BLURBS } from '../src/textEngine/scenes/deviceFlavor.js';

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
  /\bevery girl on your roster\b/i,
  /\blinked girls\b/i,
  /\bno single girl\b/i,
  /\bone girl's enrollment\b/i,
  /\bGirls waiting\b/i,
  /\bthe girls have been waiting\b/i,
  /\bThe girls know what this is\b/i,
  /\bKeep it to the students\b/i,
  /\bThe students are done\b/i,
  /\bsorority students\b/i,
  /\bYour sorority students\b/i,
  /\benrolled cohort\b/i,
  /\byour section\b/i,
  /\bhalf your section\b/i,
  /\bstudents in your section\b/i,
  /\bher students\b/i,
  /\bAsk about her students\b/i,
  /\bFuture students\b/i,
  /\bgroup of students\b/i,
  /\bstudents who transferred\b/i,
  /\bRandom students\b/i,
  /\bbefore class starts\b/i,
  /\bThe girls keep\b/i,
  /\bThe girls have their own\b/i,
  /\bMy students cook\b/i,
  /\bThe girls eat\b/i,
  /\bThe girls asked\b/i,
  /\bBoth girls reached\b/i,
  /\bThe girls are literally\b/i,
  /\bHappy about the girls\b/i,
  /\bYour girls\b/i,
  /\bevery evolved girl\b/i,
  /\bEvery evolved girl\b/i,
  /\bSomewhere a girl is already eating\b/i,
  /\ba girl whose body\b/i,
  /\ba girl in a doorway\b/i,
  /\bone girl, groceries\b/i,
  /\beach girl feeding\b/i,
  /\bChapter girls\b/i,
  /\bthe other girl\b/i,
  /\bThat girl is a project\b/i,
  /\bthat girl could make\b/i,
  /\bThat girl has a niche\b/i,
  /\bphrase for girls who committed\b/i,
  /\blot of girl to get airborne\b/i,
  /\bhope every girl on that squad\b/i,
  /\bthe girl from State\b/i,
  /\btwo girls cried\b/i,
  /\bCampus myth: girl who\b/i,
  /\bTwenty-three girls\b/i,
  /\bThat's a lot of girl\b/i,
  /\bFor a girl still finding her footing\b/i,
  /\bfive more girls to the board\b/i,
  /\bA girl thanks\b/i,
  /\bjust a girl clearly past polite hunger\b/i,
  /\bgirls settle near her heat\b/i,
  /\ba girl patting her belly\b/i,
  /\byour girl performs hunger\b/i,
  /\bsoft girl, loud folder\b/i,
  /\bquiet girl, loud folder\b/i,
  /\bstuffing a girl at this scale\b/i,
  /\bharnessed girl stable\b/i,
  /\ba girl being looked after\b/i,
  /\bThe girl from State\b/i,
  /\bevery girl who comes through the door\b/i,
  /\bthree of my girls weigh\b/i,
  /\bengineering girl with the harnesses\b/i,
  /\bThe girls ate everything\b/i,
  /\bstill mostly the girl she was at move-in\b/i,
  /\bthe girl who still fits her old jeans\b/i,
  /\bthe angular girl is becoming\b/i,
  /\bfeeds the girl in the glass\b/i,
  /\bThe psychology study sounded harmless\b/i,
  /\bthe other girl brings food\b/i,
  /\bStraight-bodied girls like me adapt\b/i,
  /\bpsychology project\b/i,
  /\bsaying it's all for her research\b/i,
  /\bEvery time Nadia feeds me\b/i,
  /\bskinny for a girl who grew up\b/i,
  /\bthe girl with jam for every mood\b/i,
  /\bintervention girls came\b/i,
  /\bthe fastest girl on this track\b/i,
  /\bthe fastest girl on the track\b/i,
  /\bwider than some girls' whole bodies\b/i,
  /\bthe girls led the lesson\b/i,
  /\bthe girls proudly serving\b/i,
  /\blike a real girl\b/i,
  /\bdelivery girl\b/i,
  /\bdeliciously fat girl\b/i,
  /\bBoth girls have reached\b/i,
  /\bBoth girls hit\b/i,
  /\bBoth girls have hit\b/i,
  /\bthe girls seemed to enjoy\b/i,
  /\bThe girls are really eating\b/i,
  /\bthe girls are running the table\b/i,
  /\ball these girls so enormously\b/i,
  /\bDelivery girl kneads\b/i,
  /\bmy girls ask on Monday\b/i,
  /\bfor both girls\b/i,
  /\bthe other girls now\b/i,
  /\bwell-fed girl can be\b/i,
  /\benormously soft girls in the kitchen\b/i,
  /\bThe girls running the kitchen\b/i,
  /\bbig girls running things\b/i,
  /\bmeets the girls who meet\b/i,
  /\bone very committed girl\b/i,
  /\bCG_CHAT_TEMPLATES\.girls\b/i,
  /\bPer-girl reply templates\b/i,
  /\bper-girl living journal\b/i,
  /\bimmobile girls \(stage 10\+\)/i,
  /\{girlName\}/i,
  /\bletting a resident stuff me\b/i,
  /\bappetite psychology\b/i,
  /\bpicking a girl like her\b/i,
  /\bslowly changing a girl like her\b/i,
  /\bstrong, athletic girl\b/i,
  /\bsorority girl\b/i,
  /\bgamer girl\b/i,
  /\bnurturing girl grow heavy\b/i,
  /\bimage-obsessed girl\b/i,
  /\bquiet girl who used to\b/i,
  /\bkitchen girl is now\b/i,
  /\bsensory culinary girl\b/i,
  /\bthe girl who used to fit in my arms\b/i,
  /\ba girl from the dining hall\b/i,
  /\bcalls the girl in\b/i,
  /\bThe girl who tends the room\b/i,
  /\bTwo girls share a bench\b/i,
  /\bdevours the fattened girl\b/i,
  /\bFeed your enormous girl\b/i,
  /\bOther girls seek her warmth\b/i,
  /\bevery other girl sheds\b/i,
  /\bevery other girl warms\b/i,
  /\bthe French girl's dinners\b/i,
  /\bThe girls here treat appetite\b/i,
  /\bgirls who treat the dorm kitchen\b/i,
  /\bemaciated goth girl\b/i,
  /\bfighting girls about food\b/i,
  /\baudience of one vast girl\b/i,
  /\bThat's my girl,\b/i,
  /\bposter girl and I'm falling\b/i,
  /\bsponsor's favorite girl\b/i,
  /\bTwo girls you don't recognize\b/i,
  /\bOne girl eats; they all feel it\b/i,
  /\bThree girls at\b/i,
  /\b2 girls simultaneously\b/i,
  /\b3 girls, evening-long\b/i,
  /\b"Smart girl\."\b/i,
  /\bThat's my girl," she says about the number\b/i,
  /\bYour greedy girl appreciates\b/i,
  /\bculinary girl lives\b/i,
  /\ba girl with a headlamp\b/i,
  /\bFeed your good girl\b/i,
  /\binteresting-looking girls in this café\b/i,
  /\bPerfect girls smile through brunch\b/i,
  /\bRibbon girls smile first\b/i,
  /\bCrown girls count everything\b/i,
  /\bYour greedy girl appreciates\b/i,
  /\bhomeroom queen\b/i,
  /\bHomeroom royalty\b/,
  /\bHomeroom is geography\b/,
  /\bHomeroom preaches\b/,
  /\bHomeroom asks restraint\b/,
  /\bthe homeroom from\b/i,
  /\bcurriculum-aligned\b/i,
  /\bcurriculum notes\b/i,
  /\bcurriculum framing\b/i,
  /\bAbundance named as curriculum\b/,
  /\babundance is the curriculum\b/i,
  /\bShe's in the curriculum\b/,
  /\bappetite as curriculum\b/i,
  /\bCurriculum optional\b/i,
  /\bcookies, curriculum\b/i,
  /\bSpirit fingers without flesh\b/,
  /\bGirls on my floor\b/i,
  /\bEven teachers in the hall\b/i,
  /\bclassmates are eating\b/i,
  /\bclassmates eating\b/i,
  /\bclass is full of subjects\b/i,
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

for (const scene of FLOOR_SCENES) {
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

for (const ev of NARRATIVE_EVENTS) {
  if (!weeklyEventHasModularText(ev.id)) continue;
  for (const student of INIT_STUDENTS.filter((s) => !s.hidden).slice(0, 10)) {
    for (let sample = 0; sample < 12; sample += 1) {
      const mock = { ...student, lbs: 120 + sample * 18, lockState: 'open' };
      const text = renderWeeklyEvent(ev.id, mock, { week: 4 + (sample % 12), v2DepthChance: 1 });
      assert(text && typeof text === 'string' && text.trim().length > 0, `weekly ${ev.id} empty for ${student.name}`);
      assert(!/\{weekly\.|\{unresolved|\[(?:weekly|unresolved)\./i.test(text), `weekly ${ev.id} unresolved slot for ${student.name}: ${text.slice(0, 100)}`);
      assertClean(text, `weekly ${ev.id} ${student.name}`);
    }
  }
}

const floorScene = FLOOR_SCENES.find((s) => s.id === 'hall_potluck');
const floorStudent = INIT_STUDENTS[0];
const floorText = renderFloorSceneText(floorScene, floorStudent, 4);
const floorResult = renderFloorChoiceResult(floorScene, 0, floorStudent, 4);
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
  'removal_hearing', 'mandatory_fitness', 'shame_vigil', 'student_advocacy',
];
const oppCtx = buildTextContext({ subject: swimmer, week: 10 });
for (const id of agendaIds) {
  const line = render(`{opposition.agenda.${id}}`, oppCtx)?.trim();
  if (line) assertClean(line, `opposition agenda ${id}`);
}

const mayaOppCtx = buildTextContext({
  subject: { ...INIT_STUDENTS.find((s) => s.id === 8), lbs: 280 },
  week: 12,
});
const mayaRemovalLine = render('{opposition.agenda.removal_hearing}', mayaOppCtx)?.trim();
if (mayaRemovalLine) assertClean(mayaRemovalLine, 'opposition removal hearing Maya depth');

for (const [id, blurb] of Object.entries(DEVICE_CATALOG_BLURBS)) {
  assertClean(blurb, `device catalog ${id}`);
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

const formatCgTemplate = (text) => String(text)
  .replace(/\{residentName\}/g, 'Brittany')
  .replace(/\{targetName\}/g, 'Brittany')
  .replace(/\{bodypart\}/g, 'waist')
  .replace(/\{measurement\}/g, '42')
  .replace(/\{measurementCategory\}/g, 'waist')
  .replace(/\{priyaWeight\}/g, '280');

for (const entry of CG_FILLED_REACTIONS) {
  assertClean(entry, 'competitive gainer reaction');
}
for (const [tier, scenes] of Object.entries(CG_FILLED_CORKBOARD_SCENES)) {
  for (const scene of scenes) assertClean(scene, `competitive gainer corkboard ${tier}`);
}
for (const [stage, tiers] of Object.entries(CG_FILLED_BINGE_SCENES)) {
  for (const [tier, scene] of Object.entries(tiers)) {
    assertClean(scene, `competitive gainer binge ${stage} ${tier}`);
  }
}
for (const [tier, posts] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaPost)) {
  for (const post of Object.values(posts)) assertClean(post, `competitive gainer priya post ${tier}`);
}
for (const [tier, posts] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaFollowup)) {
  for (const post of Object.values(posts)) assertClean(post, `competitive gainer priya followup ${tier}`);
}
for (const [name, replies] of Object.entries(CG_CHAT_TEMPLATES.residents)) {
  assertClean(Object.values(replies).join(' '), `competitive gainer chat ${name}`);
}
for (const opt of CG_CHAT_TEMPLATES.raReplies || []) {
  const stageText = Object.values(opt.byStage || {}).map(formatCgTemplate).join(' ');
  assertClean(`${opt.label || ''} ${opt.fallback || ''} ${stageText}`, `competitive gainer ra reply ${opt.id}`);
}
for (const [rel, tiers] of Object.entries(CG_FILLED_MEASUREMENT_REACTIONS)) {
  for (const [tier, cats] of Object.entries(tiers)) {
    for (const line of Object.values(cats)) {
      assertClean(formatCgTemplate(line), `competitive gainer measurement ${rel} ${tier}`);
    }
  }
}

for (const tierId of [1, 2, 3]) {
  assertClean(renderScrutinyTierUp(tierId, { week: 10 }), `scrutiny tier ${tierId}`);
}

const campusCtx = buildTextContext({ week: 6, globals: { campusTierMin: 0 } });
const campusLine = render('{campus.travel}', campusCtx)?.trim();
if (campusLine) assertClean(campusLine, 'campus travel flavor');

const campusTier2Ctx = buildTextContext({ week: 12, globals: { campusTierMin: 2 } });
const campusTier2Line = render('{campus.travel}', campusTier2Ctx)?.trim();
if (campusTier2Line) assertClean(campusTier2Line, 'campus travel tier 2 flavor');

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

for (const archetype of Object.keys(FEEDER_SUBJECT_JOURNALS)) {
  for (const line of FEEDER_SUBJECT_JOURNALS[archetype] || []) {
    if (line) assertClean(line, `feeder journal ${archetype}`);
  }
}

for (const [archetype, lines] of Object.entries(STAGE_REACTIONS)) {
  for (const [idx, fn] of lines.entries()) {
    const text = typeof fn === 'function' ? fn({ lbs: 180 + idx * 25, name: 'Maya' }) : fn;
    if (text) assertClean(text, `stage reaction ${archetype} stage ${idx}`);
  }
}

for (const archetype of ['bookworm', 'quiet', 'swimmer']) {
  const earlySubject = {
    ...(INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0]),
    lbs: 125,
    corruption: 0,
  };
  const earlyCtx = buildTextContext({
    subject: earlySubject,
    week: 3,
    globals: { gainStance: 'opposed' },
  });
  for (const slot of ['slender.bodyNotice', 'slender.mindFeel', 'slender.bodyFeel']) {
    const earlyLine = render(`{${slot}}`, earlyCtx)?.trim();
    if (earlyLine) assertClean(earlyLine, `early gain ${slot} ${archetype}`);
  }
}

for (const bodyType of ['pear', 'straight', 'apple']) {
  const portrait = renderBodyPortrait(
    { ...INIT_STUDENTS[0], bodyType, lbs: 175 },
    8,
    { v2DepthChance: 0 },
  );
  if (portrait) assertClean(portrait, `body portrait ${bodyType} stage mid`);
}

const dreamCtx = buildTextContext({ subject: INIT_STUDENTS[0], week: 10, globals: { stageMin: 3 } });
const mirrorDream = render('{dream.mirror_feast.depth}', dreamCtx)?.trim();
if (mirrorDream) assertClean(mirrorDream, 'dream mirror feast depth');

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
for (const fn of REGISTER_CODAS.submissive || []) {
  const line = typeof fn === 'function' ? fn(talkSubject) : fn;
  if (line) assertClean(line, 'talk register submissive coda');
}
for (const fn of REGISTER_CODAS.broken || []) {
  const line = typeof fn === 'function' ? fn(talkSubject) : fn;
  if (line) assertClean(line, 'talk register broken coda');
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

const activityForms = [
  'community_researcher', 'food_researcher', 'campus_legend', 'chapter_hostess', 'wife_lessons',
  'home_nest', 'homestead_queen', 'eating_captain', 'eating_competitor', 'speed_eater',
  'ranked_feedee', 'feedee_creator', 'eating_streamer', 'delivery_hive', 'sumo',
  'salon_appetit', 'artisan_gallery', 'competitive_gainer', 'machine_goddess',
  'body_positive_creator', 'psych_researcher', 'state_fair_queen', 'homeroom_queen',
  'cultivator', 'pharmacist',
];
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

const eatingCaptainDiary = renderDiary(
  { ...INIT_STUDENTS[0], evolvedForm: 'eating_captain', lbs: 320, archetype: 'foodie', name: 'Priya' },
  20,
);
if (eatingCaptainDiary) assertClean(eatingCaptainDiary, 'eating captain diary render');

const squadCaptainDiary = renderDiary(
  { ...INIT_STUDENTS[0], evolvedForm: 'big_squad_captain', lbs: 260, archetype: 'cheerleader', name: 'Brooke' },
  16,
);
if (squadCaptainDiary) assertClean(squadCaptainDiary, 'big squad captain diary render');

const competitiveGainerDiary = renderDiary(
  { ...INIT_STUDENTS[0], evolvedForm: 'competitive_gainer', lbs: 300, archetype: 'overachiever', name: 'Nadia' },
  22,
);
if (competitiveGainerDiary) assertClean(competitiveGainerDiary, 'competitive gainer diary render');

const tiffanyDiary = renderDiary(
  { ...INIT_STUDENTS.find((s) => s.id === 6), lbs: 155, corruption: 0 },
  10,
);
if (tiffanyDiary) assertClean(tiffanyDiary, 'Tiffany base diary render');

const neglectedReport = renderEcologyReport(
  { ...INIT_STUDENTS[0], name: 'Maya', corruption: 0 },
  8,
  { globals: { favoritismFlag: 'neglected' } },
);
if (neglectedReport) assertClean(neglectedReport, 'roster ecology neglected report');

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

for (const mood of ['mood_excited', 'mood_nervous', 'mood_content']) {
  const depthCtx = buildTextContext({
    subject: INIT_STUDENTS[0],
    week: 8,
    globals: { mood },
  });
  const depthLine = render(`{campusEvent.scene.${mood}}`, depthCtx)?.trim();
  if (depthLine) assertClean(depthLine, `campus event depth ${mood}`);
}

for (const archetype of ['influencer', 'foodie', 'gamer']) {
  const murmur = renderGossipMurmur(
    INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0],
    10,
  );
  if (murmur) assertClean(murmur, `gossip murmur ${archetype}`);
}

for (const [archetype, memType] of [
  ['athlete', 'stageUp'],
  ['influencer', 'stageUp'],
  ['artsy', 'stageUp'],
  ['influencer', 'scaleBreak'],
]) {
  const reactor = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
  const react = renderGossipReact(reactor, 10, {
    memName: 'Cassidy',
    memType,
    memWeeksAgo: 2,
  });
  if (react) assertClean(react, `gossip react ${archetype} ${memType}`);
}

const memCtx = buildTextContext({
  subject: INIT_STUDENTS[0],
  week: 12,
  globals: { memName: 'Cassidy', memType: 'stageUp', memWeeksAgo: 2 },
});
const memoryLine = render('{memory.hall}', memCtx)?.trim();
if (memoryLine) assertClean(memoryLine, 'memory.hall render');

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

const campusV2 = render('{campus.v2.depth}', buildTextContext({
  subject: INIT_STUDENTS[0],
  week: 8,
  globals: { campusFattening: false },
}))?.trim();
if (campusV2) assertClean(campusV2, 'campus v2 depth');

const embStudent = { ...(INIT_STUDENTS.find((s) => s.id === 6) || INIT_STUDENTS[6]), lbs: 280, corruption: 1 };
const embArrive = renderEmbodiedArrive(embStudent, 'dorms', 10, { v2DepthChance: 0 });
if (embArrive) assertClean(embArrive, 'embodied arrive');
for (const eventId of ['stuck_door', 'elevator_groan', 'bully_forcefeed', 'resident_sighting']) {
  const ref = INIT_STUDENTS.find((s) => s.archetype === 'sorority' && s.id !== embStudent.id) || INIT_STUDENTS[0];
  const embEvent = renderEmbodiedEvent(eventId, embStudent, 'union', 10, {
    ref,
    v2DepthChance: 0,
    globals: { stageMin: 8 },
  });
  if (embEvent) assertClean(embEvent, `embodied event ${eventId}`);
}

for (const archetype of ['swimmer', 'bookworm', 'cheerleader', 'foodie', 'sorority', 'eced']) {
  const subject = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
  const intro = renderWeighInIntro(subject, 10, false, { week: 10 });
  const reaction = renderWeighInReaction(subject, 10, { week: 10, bigScale: false });
  if (intro) assertClean(intro, `weigh-in intro ${archetype}`);
  if (reaction) assertClean(reaction, `weigh-in reaction ${archetype}`);
}

const tiffany = INIT_STUDENTS.find((s) => s.id === 6);
if (tiffany) {
  const tiffanyReaction = renderWeighInReaction(
    { ...tiffany, corruption: 1, lbs: 145 },
    12,
    { week: 12, bigScale: false },
  );
  if (tiffanyReaction) assertClean(tiffanyReaction, 'weigh-in reaction Tiffany corruption 1');
  const growthScene = renderGrowthScene(
    { ...tiffany, lbs: 180, corruption: 1 },
    { endStage: 4, startStage: 3, stagesJumped: 1, gainLbs: 8, week: 10 },
    { v2DepthChance: 0 },
  );
  if (growthScene) assertClean(growthScene, 'growth scene Tiffany stage jump');
}

const mj = INIT_STUDENTS.find((s) => s.id === 14);
if (mj) {
  const mjGrowth = renderGrowthScene(
    { ...mj, lbs: 280, corruption: 2 },
    { endStage: 7, startStage: 5, stagesJumped: 2, gainLbs: 20, week: 14 },
    { v2DepthChance: 0 },
  );
  if (mjGrowth) assertClean(mjGrowth, 'growth scene Mary Jane stage jump');
}

for (const key of [
  'wifeLessons.talk.Darlene.s3.greeting',
  'wifeLessons.talk.Wanda.s5.greeting',
  'wifeLessons.talk.Patrice.s8.opt0',
]) {
  const line = render(`{${key}}`, buildTextContext({ subject: INIT_STUDENTS[0], week: 10 }))?.trim();
  if (line) assertClean(line, `wife lessons ${key}`);
}

const ecedStudent = INIT_STUDENTS.find((s) => s.archetype === 'eced');
if (ecedStudent) {
  const attitudeLine = render('{attitude.line}', buildTextContext({
    subject: ecedStudent,
    week: 8,
    globals: { archetype: 'eced' },
  }))?.trim();
  if (attitudeLine) assertClean(attitudeLine, 'attitude eced');
  for (const slot of ['journal.feeder.eced.s9', 'journal.feeder.eced.s10']) {
    const journalLine = render(`{${slot}}`, buildTextContext({
      subject: { ...ecedStudent, lbs: 420 },
      week: 16,
      globals: { archetype: 'eced' },
    }))?.trim();
    if (journalLine) assertClean(journalLine, `feeder journal ${slot}`);
  }
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
const chloeSubject = { ...INIT_STUDENTS.find((s) => s.id === 9), name: 'Chloé', lbs: 180 };
for (const [stageIdx, ev] of SALON_EVOLVED_EVENTS.entries()) {
  assertClean(ev.title, `salon evolved title ${stageIdx}`);
  for (const phase of ev.phases || []) {
    const body = typeof phase.text === 'function' ? phase.text([], chloeSubject) : phase.text;
    if (body) assertClean(body, `salon evolved stage ${stageIdx} phase`);
    for (const ch of phase.choices || []) {
      assertClean(`${ch.label} ${ch.result}`, `salon evolved choice ${ch.id}`);
    }
  }
  for (const end of ev.endings || []) {
    const body = typeof end.text === 'function' ? end.text([], chloeSubject, 5) : end.text;
    if (body) assertClean(body, `salon evolved ending ${stageIdx}`);
  }
}

for (const skill of SKILL_TREE) {
  assertClean(`${skill.label} ${skill.desc} ${skill.effect}`, `hall skill ${skill.id}`);
}
for (const tier of RESONANCE_TIERS) {
  assertClean(`${tier.label} ${tier.desc}`, `resonance tier ${tier.id}`);
}
for (const secret of CAMPUS_SECRETS) {
  assertClean(`${secret.label} ${secret.hint || ''} ${secret.discover || ''}`, `campus secret ${secret.id}`);
}
for (const line of CAMPUS_SOFT_FLAVOR) {
  assertClean(line, 'pharmacist campus flavor');
}
const squeezePlan = {
  slots: [
    { studentId: 0, venueId: 'dining_hall' },
    { studentId: 1, venueId: 'dining_hall' },
    { studentId: 2, venueId: 'dining_hall' },
  ],
};
for (const issue of planConflicts(squeezePlan, INIT_STUDENTS)) {
  assertClean(issue, 'week planner conflict');
}

assertClean(CLUE_INVESTIGATION.title, 'lilith clue title');
assertClean(CLUE_INVESTIGATION.text, 'lilith clue text');
assertClean(CLUE_INVESTIGATION.resultText, 'lilith clue result');
for (const node of Object.values(HUNT_NODES)) {
  assertClean(`${node.label} ${node.desc}`, `lilith hunt node ${node.id}`);
}
for (const man of HUNT_MEN) {
  for (const stage of [0, 4, 8]) {
    const desc = typeof man.desc === 'function' ? man.desc(stage) : man.desc;
    if (desc) assertClean(`${man.name} ${man.tag} ${desc}`, `lilith hunt man ${man.id} stage ${stage}`);
  }
}
for (const route of CULT_DISTRIBUTION_ROUTES) {
  assertClean(`${route.label} ${route.desc}`, `cult route ${route.id}`);
  if (route.flavor) assertClean(route.flavor(), `cult route flavor ${route.id}`);
}

for (const [archetype, blurbFn] of Object.entries(EVOLUTION_BUTTON_BLURB)) {
  const student = INIT_STUDENTS.find((s) => s.archetype === archetype) || INIT_STUDENTS[0];
  assertClean(blurbFn({ ...student, name: student.name, lbs: student.lbs ?? 180 }), `evolution blurb ${archetype}`);
}

for (const [archetype, offer] of Object.entries(EVOLUTION_OFFER)) {
  const student = INIT_STUDENTS.find((s) => s.archetype === archetype) || { name: 'Resident', lbs: 220 };
  assertClean(offer.intro({ ...student, name: student.name, lbs: student.lbs ?? 220 }), `evolution offer ${archetype}`);
  for (const path of Object.values(offer.paths || {})) {
    assertClean(`${path.label} ${path.desc}`, `evolution path ${archetype}`);
  }
}

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  for (const lesson of lessons) {
    assertClean(`${lesson.label} ${lesson.text}`, `wife lessons stage ${stage} ${lesson.id}`);
  }
}

for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  for (let i = 0; i < stages.length; i++) {
    const depth = getWlMomDialogueDepth(person, i);
    const stage = depth ? mergeWlDialogueEntry(stages[i], depth) : stages[i];
    for (const key of ['greeting', 'cappedGreeting', 'overtookGreeting']) {
      if (stage[key]) assertClean(stage[key], `wife lessons dialogue ${person} s${i + 1} ${key}`);
    }
    for (const opt of stage.options || []) {
      assertClean(`${opt.label} ${opt.text}`, `wife lessons dialogue ${person} s${i + 1} opt`);
      for (const sub of opt.subs || []) {
        assertClean(`${sub.label} ${sub.text}`, `wife lessons dialogue ${person} s${i + 1} sub`);
      }
    }
  }
}

const lilith = INIT_STUDENTS.find((s) => s.id === 15) || INIT_STUDENTS[0];
for (let feastStage = 0; feastStage <= 9; feastStage++) {
  const feast = renderLilithFeast(lilith, feastStage, 12);
  if (feast) assertClean(feast, `lilith hunt feast stage ${feastStage}`);
}

for (const teacher of FACULTY) {
  for (const [nodeId, node] of Object.entries(teacher.tree)) {
    if (typeof node.text === 'function') {
      const body = node.text(50, 50);
      assertClean(body, `staff lounge ${teacher.id} ${nodeId}`);
    } else if (node.text) {
      assertClean(node.text, `staff lounge ${teacher.id} ${nodeId}`);
    }
    for (const opt of node.options || []) {
      assertClean(opt.label, `staff lounge ${teacher.id} option`);
    }
  }
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

const devourStudent = { ...INIT_STUDENTS[0], name: 'Maya', lbs: 280, corruption: 2 };
for (const corTier of [0, 1, 2]) {
  const devour = buildDevourScene(devourStudent, corTier, 10);
  assertClean(devour, `devour scene corTier ${corTier}`);
}
for (const form of Object.values(FINAL_FORMS)) {
  assertClean(`${form.label} ${form.desc}`, `final form ${form.id}`);
}
for (const [branch, fx] of Object.entries(FINAL_FORM_FX)) {
  assertClean(`${branch} ${fx.perk}`, `final form fx ${branch}`);
}

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
