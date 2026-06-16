// The Squad — Lead: A2 Psych | Support: A4 Architect, A7 Artisan
// Wife Lessons (Flabwife) — MIGRATION BRIDGE (DEPTH_PLAN §9d).
//
// Legacy prose lives wholecloth in gameData/evolvedForms.js:
//   WL_LESSONS   — 24 lesson beats (stages 1–8 × 3 picks)
//   WL_DIALOGUES — mom trees stages 1–8; daughter trees stages 6–8
//
// Filled from upload tags via scripts/apply-flabwife-fills.mjs (429 replacements).
// Render sites: WifeLessonsModal.jsx, ProfessorSim.jsx (session handlers).
//
// Target decomposition (registerPool + render helpers; retire evolvedForms strings):
//   wifeLessons.lesson.s{n}.{id}     — FULL SENTENCE lesson beat after pick
//   wifeLessons.talk.{person}.s{n}.* — DIALOGUE BEAT per greeting/option/sub leaf
//
// Mine per MIGRATION.md Step 3: dialogue lines verbatim; lesson paragraphs → scene/sensory/reaction slots.
// Key on wlStage, person, capped, overtook (Chloe>Emma), daughter vs mom.
//
// Already migrated elsewhere:
//   diary.wife_lessons.* — MJ between-session diary (diary.js)
//
// Still legacy (separate passes):
//   EVOLVED_EVENTS['wife_lessons'] — stageIdx 0–5 branching events
//   EVOLVED_ACTIVITY_TEXT.wife_lessons — MJ diary monologues on activity pick
//   WIFE_LESSONS_NPCS — body/stage blurbs for NPC cards (not yet wired to modal)

/** Planned namespace map for lint MIGRATION_BRIDGE_PREFIXES and Dialogue Lab. */
export const WIFE_LESSONS_MIGRATION = {
  lessonPrefix: 'wifeLessons.lesson.',
  talkPrefix: 'wifeLessons.talk.',
  legacyExports: ['WL_LESSONS', 'WL_DIALOGUES'],
  uploadTagCount: 429,
  stages: { lessons: [1, 2, 3, 4, 5, 6, 7, 8], talkMoms: [1, 2, 3, 4, 5, 6, 7, 8], talkDaughters: [6, 7, 8] },
  persons: { moms: ['Darlene', 'Wanda', 'Patrice'], daughters: ['Emma', 'Chloe', 'Kezia', 'Lila'] },
};
