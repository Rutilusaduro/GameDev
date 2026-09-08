// The Squad — Lead: A2 Psych | Support: A4 Architect, A7 Artisan
// Wife Lessons (Flabwife) — engine bridge from legacy WL_LESSONS / WL_DIALOGUES.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { WL_LESSONS } from '../../../gameData/evolvedForms.js';

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.text) continue;
    registerPool(`wifeLessons.lesson.s${stage}.${lesson.id}`, [
      { when: {}, text: [lesson.text] },
    ]);
  }
}

/** Lesson beat after pick — engine pool + V2 depth, legacy fallback. */
export function renderWifeLessonBeat(stage, lesson, mjStudent, week = 1, opts = {}) {
  if (!lesson) return '';
  const legacy = lesson.text?.trim() || '';
  const ctx = buildTextContext({
    subject: mjStudent,
    week,
    globals: { wlStage: stage, lessonId: lesson.id, ...(opts.globals || {}) },
    ...opts,
  });
  const key = `wifeLessons.lesson.s${stage}.${lesson.id}`;
  const base = render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim() || legacy;
  return appendV2Depth(base, 'wifeLessons', ctx, opts.v2DepthChance ?? 0.32);
}

export const WIFE_LESSONS_MIGRATION = {
  lessonPrefix: 'wifeLessons.lesson.',
  talkPrefix: 'wifeLessons.talk.',
  legacyExports: ['WL_LESSONS', 'WL_DIALOGUES'],
  uploadTagCount: 429,
  stages: { lessons: [1, 2, 3, 4, 5, 6, 7, 8], talkMoms: [1, 2, 3, 4, 5, 6, 7, 8], talkDaughters: [6, 7, 8] },
  persons: { moms: ['Darlene', 'Wanda', 'Patrice'], daughters: ['Emma', 'Chloe', 'Kezia', 'Lila'] },
};
