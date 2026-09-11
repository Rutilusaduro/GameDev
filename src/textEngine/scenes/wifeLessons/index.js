// The Squad — Lead: A2 Psych | Support: A4 Architect, A7 Artisan
// Wife Lessons (Flabwife) — engine bridge from legacy WL_LESSONS / WL_DIALOGUES.
import { registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { wifeLessonsV2DepthChance } from '../../../gameData/sessionTextDepth.js';
import { WL_LESSONS, WL_DIALOGUES, WL_CONFIG } from '../../../gameData/wifeLessonsData.js';
import { getWlMomDialogueDepth, mergeWlDialogueEntry } from '../../../gameData/wlMomDialogueDepth.js';
import { lintWildcardVariant } from '../legacyPoolPolicy.js';

const DAUGHTERS = new Set(['Emma', 'Chloe', 'Kezia', 'Lila']);

function wlStageNum(person, stageIdx) {
  return DAUGHTERS.has(person) ? stageIdx + WL_CONFIG.daughtersFrom : stageIdx + 1;
}

function registerTalkLine(poolKey, line) {
  const prose = (line || '').trim();
  if (!prose) return;
  const bodyKey = `${poolKey}.body`;
  registerDecomposedPool(bodyKey, prose);
  registerPool(poolKey, [
    lintWildcardVariant('{wl.talk.warmOpen|prefix:} {wl.talk.raPresence|prefix: }'),
  ]);
}

function registerDialogueEntry(person, stageIdx, entry) {
  const stage = wlStageNum(person, stageIdx);
  const prefix = `wifeLessons.talk.${person}.s${stage}`;
  if (entry.greeting) registerTalkLine(`${prefix}.greeting`, entry.greeting);
  if (entry.cappedGreeting) registerTalkLine(`${prefix}.capped`, entry.cappedGreeting);
  if (entry.overtookGreeting) registerTalkLine(`${prefix}.overtook`, entry.overtookGreeting);
  entry.options?.forEach((opt, oi) => {
    if (opt.text) registerTalkLine(`${prefix}.opt${oi}`, opt.text);
    opt.subs?.forEach((sub, si) => {
      if (sub.text) registerTalkLine(`${prefix}.opt${oi}.sub${si}`, sub.text);
    });
  });
}

function registerLessonBeat(poolKey, prose) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.body`;
  registerDecomposedPool(bodyKey, text);
  registerPool(poolKey, [
    lintWildcardVariant('{wl.lesson.aroma|prefix:} {wl.lesson.mjDoctrine|prefix: } {wl.lesson.circleEat|prefix: }'),
  ]);
}

for (const [stage, lessons] of Object.entries(WL_LESSONS)) {
  if (!Array.isArray(lessons)) continue;
  for (const lesson of lessons) {
    if (!lesson?.text) continue;
    registerLessonBeat(`wifeLessons.lesson.s${stage}.${lesson.id}`, lesson.text);
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
  const base = render(`{${key}}`, ctx, { trace: opts.trace || null })?.trim() || legacy;
  return appendV2Depth(base, 'wifeLessons', ctx, opts.v2DepthChance ?? wifeLessonsV2DepthChance(0.32));
}

/** Engine pool key for a talk beat (wlStage = game stage 1–8). */
export function wlTalkPoolKey(person, wlStage, { greetingKind = 'greeting', optionIdx, subIdx } = {}) {
  const isDaughter = DAUGHTERS.has(person);
  const arrIdx = isDaughter ? wlStage - WL_CONFIG.daughtersFrom : wlStage - 1;
  const s = wlStageNum(person, Math.max(0, arrIdx));
  const prefix = `wifeLessons.talk.${person}.s${s}`;
  if (subIdx != null && optionIdx != null) return `${prefix}.opt${optionIdx}.sub${subIdx}`;
  if (optionIdx != null) return `${prefix}.opt${optionIdx}`;
  if (greetingKind === 'capped') return `${prefix}.capped`;
  if (greetingKind === 'overtook') return `${prefix}.overtook`;
  return `${prefix}.greeting`;
}

/** Talk line from pool + legacy fallback + V2 depth. */
export function renderWifeLessonTalk(poolKey, legacyLine, person, wlStage, mjStudent, week = 1, opts = {}) {
  if (!poolKey && !legacyLine?.trim()) return '';
  const ctx = buildTextContext({
    subject: mjStudent,
    week,
    globals: { wlStage, wlPerson: person, wlTalkPool: poolKey, ...(opts.globals || {}) },
    ...opts,
  });
  let base = (legacyLine || '').trim();
  if (poolKey) {
    try {
      const rendered = render(`{${poolKey}}`, ctx)?.trim();
      if (rendered && !rendered.includes('{unresolved}')) base = rendered;
    } catch {
      /* legacy */
    }
  }
  if (!base) return '';
  return appendV2Depth(base, 'wifeLessonsTalk', ctx, opts.v2DepthChance ?? wifeLessonsV2DepthChance(0.28));
}

/** @deprecated prefer renderWifeLessonTalk with wlTalkPoolKey */
export function renderWifeLessonTalkLine(line, person, stage, mjStudent, week = 1, opts = {}) {
  const poolKey = opts.poolKey || null;
  return renderWifeLessonTalk(poolKey, line, person, stage, mjStudent, week, opts);
}

export const WIFE_LESSONS_MIGRATION = {
  lessonPrefix: 'wifeLessons.lesson.',
  talkPrefix: 'wifeLessons.talk.',
  legacyExports: ['WL_LESSONS', 'WL_DIALOGUES'],
  uploadTagCount: 429,
  stages: { lessons: [1, 2, 3, 4, 5, 6, 7, 8], talkMoms: [1, 2, 3, 4, 5, 6, 7, 8], talkDaughters: [6, 7, 8] },
  persons: { moms: ['Darlene', 'Wanda', 'Patrice'], daughters: ['Emma', 'Chloe', 'Kezia', 'Lila'] },
};
