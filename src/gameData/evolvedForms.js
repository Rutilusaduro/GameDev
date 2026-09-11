// Evolved forms — barrel re-exports (prose lives in extracted gameData modules).
export { EVOLVED_REACTIONS, EVOLVED_OUTFITS } from './evolvedReactionsOutfits.js';
export { EVOLVED_ACTIVITY_TEXT, EVOLVED_ACTIVITY_META, getEvolvedActivityMeta } from './evolvedActivityData.js';
export { scaleEvolvedEventLbs, scaleEvolvedEventRel, scaleWlLessonLbs, scaleWlLessonRel } from './evolvedScaling.js';
export { EVOLVED_EVENTS } from './evolvedEvents.js';
export { EVOLVED_FORM_META, EVOLUTION_BUTTON_BLURB, EVOLUTION_OFFER } from './evolutionUiData.js';

// Hall kitchen queen data lives in homeroomEvents.js (homeroom text bridge).
export {
  BATCH_BAKER_NPCS,
  HOMEROOM_SUSPICION_DELTAS,
  HOMEROOM_THRESHOLDS,
  HOMEROOM_CONFERENCE_EVENTS,
  HOMEROOM_GROUP_ACTIVITIES,
} from './homeroomEvents.js';


// Feeder subject journals → feederSubjectJournals.js (researchJournal text bridge).
export { FEEDER_SUBJECT_JOURNALS } from './feederSubjectJournals.js';

// ── NADIA'S SUBJECT NOTES ────────────────────────────────────────────────────
// See src/gameData/nadiaSubjectJournals.js (generated via scripts/integrate-nadia-journals.mjs).
export { NADIA_SUBJECT_JOURNALS } from './nadiaSubjectJournals.js';


// ── RANKED FEEDEE SESSION MINI-GAME DATA ─────────────────────────────────────
export { SESSION_FOOD_ITEMS, SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from './rankedSessionData.js';

// ── WIFE LESSONS (Flabwife) ──────────────────────────────────────────────────
export { WL_CONFIG, WIFE_LESSONS_NPCS, WL_LESSONS, WL_DIALOGUES } from './wifeLessonsData.js';



// ─── COMPETITIVE GAINER DATA ──────────────────────────────────────────────────
export {
  CG_CONFIG,
  CG_CORKBOARD_SCENES,
  CG_MEASUREMENT_SCENES,
  CG_BINGE_SCENES,
  CG_CHAT_TEMPLATES,
} from './competitiveGainerData.js';

// ── STATE FAIR QUEEN ─────────────────────────────────────────────────────────
export {
  FAIR_TRAINING_CONFIG,
  fairTrainingGainBounds,
  FAIR_TRAINING_SCENES,
  FAIR_TRAINING_PHOTOS,
  FAIR_DAY_SCENES,
  FAIR_BOOST_SUMMARIES,
} from './fairQueenData.js';
