// The Squad — Lead: A2 Psych | Support: A4 Architect, A7 Artisan
// Wife Lessons (Flabwife) — engine bridge from legacy WL_LESSONS / WL_DIALOGUES.
import { registerPool, registerModuleVariants, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass3.js';
import { WL_LESSONS, WL_DIALOGUES, WL_CONFIG } from '../../../gameData/evolvedForms.js';
import { getWlMomDialogueDepth, mergeWlDialogueEntry } from '../../../gameData/wlMomDialogueDepth.js';
import './beat.js';

registerModuleVariants('wife.linger', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Galley leftover still in Mary Jane. She treats the next greeting like a second rise.',
    'Last night\'s tray plus this talk. The kitchen smells like both.',
  ] },
  { when: { stageMin: 6 }, weight: 3, text: [
    'Daughters take leftover heat home in their clothes. Mary Jane keeps the rest.',
    'The lesson table is wreckage. Softness is the homework.',
  ] },
  { when: {}, text: [
    'She tastes the sauce again after they leave, as if grading her own middle.',
    'Wine down to the dregs. Appetite still on the syllabus.',
    'The kitchen clock is ignored. Fullness is the remaining class period.',
  ] },
]);

const DAUGHTERS = new Set(['Emma', 'Chloe', 'Kezia', 'Lila']);

function wlStageNum(person, stageIdx) {
  return DAUGHTERS.has(person) ? stageIdx + WL_CONFIG.daughtersFrom : stageIdx + 1;
}

function registerDialogueEntry(person, stageIdx, entry) {
  const stage = wlStageNum(person, stageIdx);
  const prefix = `wifeLessons.talk.${person}.s${stage}`;
  if (entry.greeting) {
    registerPool(`${prefix}.greeting`, [{ when: {}, text: [entry.greeting] }]);
  }
  if (entry.cappedGreeting) {
    registerPool(`${prefix}.capped`, [{ when: {}, text: [entry.cappedGreeting] }]);
  }
  if (entry.overtookGreeting) {
    registerPool(`${prefix}.overtook`, [{ when: {}, text: [entry.overtookGreeting] }]);
  }
  entry.options?.forEach((opt, oi) => {
    if (opt.text) registerPool(`${prefix}.opt${oi}`, [{ when: {}, text: [opt.text] }]);
    opt.subs?.forEach((sub, si) => {
      if (sub.text) registerPool(`${prefix}.opt${oi}.sub${si}`, [{ when: {}, text: [sub.text] }]);
    });
  });
}

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.text) continue;
    registerPool(`wifeLessons.lesson.s${stage}.${lesson.id}`, [
      { when: {}, text: [lesson.text] },
    ]);
  }
}

for (const [person, stages] of Object.entries(WL_DIALOGUES)) {
  if (!Array.isArray(stages)) continue;
  stages.forEach((base, stageIdx) => {
    const depth = getWlMomDialogueDepth(person, stageIdx);
    const entry = depth ? mergeWlDialogueEntry(base, depth) : base;
    registerDialogueEntry(person, stageIdx, entry);
  });
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
  const scene = render('{wifeLessons.beat.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
  const legacyPool = render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim() || legacy;
  const base = scene || legacyPool;
  const glow = render('{wife.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{wife.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth([base, glow, linger].filter(Boolean).join('\n\n'), 'wifeLessons', ctx, opts.v2DepthChance ?? 0.32);
}

/** 1-on-1 talk line — V2 depth on merged legacy/depth prose. */
export function renderWifeLessonTalkLine(line, person, stage, mjStudent, week = 1, opts = {}) {
  if (!line?.trim()) return '';
  const ctx = buildTextContext({
    subject: mjStudent,
    week,
    globals: { wlStage: stage, wlPerson: person, ...(opts.globals || {}) },
    ...opts,
  });
  const base = line.trim();
  const linger = render('{wife.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = [base, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(composed, 'wifeLessonsTalk', ctx, opts.v2DepthChance ?? 0.26);
}

export const WIFE_LESSONS_MIGRATION = {
  lessonPrefix: 'wifeLessons.lesson.',
  talkPrefix: 'wifeLessons.talk.',
  legacyExports: ['WL_LESSONS', 'WL_DIALOGUES'],
  uploadTagCount: 429,
  stages: { lessons: [1, 2, 3, 4, 5, 6, 7, 8], talkMoms: [1, 2, 3, 4, 5, 6, 7, 8], talkDaughters: [6, 7, 8] },
  persons: { moms: ['Darlene', 'Wanda', 'Patrice'], daughters: ['Emma', 'Chloe', 'Kezia', 'Lila'] },
};
