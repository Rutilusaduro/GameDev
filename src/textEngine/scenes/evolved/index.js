// The Squad — Lead: A4 Architect | Support: A2 Psych
// Evolved forms — engine bridge from EVOLVED_EVENTS legacy prose.
import { buildTextContext } from '../../../gameData/textContext.js';
import { render } from '../../engine.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { EVOLVED_ACTIVITY_TEXT } from '../../../gameData/evolvedActivityData.js';
import { EVOLVED_EVENTS } from '../../../gameData/evolvedEvents.js';
import './activityPools.js';
import './eventPools.js';
import './eventPhaseFragments.js';
import './reactionPools.js';
import './outfitPools.js';
import './evolutionOfferPools.js';
import './evolutionBlurbPools.js';

function legacyBodyChanceFromCtx(ctx, fallback = 0.12) {
  const peak = ctx.globals?.hallAmbiancePeak ?? 0;
  if (peak >= 50) return Math.min(0.3, fallback + 0.12);
  if (peak >= 30) return Math.min(0.22, fallback + 0.06);
  return fallback;
}

function tryAppendLegacyBody(line, bodyKey, ctx, chance = 0.12) {
  if (!line?.trim() || Math.random() >= chance) return line;
  try {
    const extra = render(`{${bodyKey}}`, ctx)?.trim();
    if (extra && !extra.includes('{unresolved}') && extra !== line) {
      return `${line}\n\n${extra}`;
    }
  } catch {
    /* optional */
  }
  return line;
}

function resolvePhaseTextLegacy(phase, student, history, eventRef) {
  if (typeof phase.text !== 'function') return (phase.text || '').trim();
  if (eventRef != null) {
    try {
      const out = phase.text(history, student, eventRef);
      if (out) return String(out).trim();
    } catch {
      /* 2-arg */
    }
  }
  return String(phase.text(history, student)).trim();
}

/** Evolved form → optional second depth pool appended after evolved.v2.depth */
const EVOLVED_FORM_POOLS = {
  salon_appetit: 'evolved.salon.v2.depth',
  artisan_gallery: 'evolved.gallery.v2.depth',
  cultivator: 'evolved.cultivator.v2.depth',
  feedee_creator: 'evolved.feedee.v2.depth',
  machine_goddess: 'evolved.machine.v2.depth',
  pharmacist: 'evolved.pharmacist.v2.depth',
  competitive_gainer: 'evolved.gainer.v2.depth',
  homeroom_queen: 'evolved.homeroomQueen.v2.depth',
  state_fair_queen: 'evolved.fairQueen.v2.depth',
};

/** Current phase intro for branching evolved event modal. */
export function renderEvolvedEventPhase(student, week, formId, stageIdx, phaseIdx, history = [], eventRef = null, opts = {}) {
  const evDef = EVOLVED_EVENTS[formId]?.[stageIdx];
  const phase = evDef?.phases?.[phaseIdx];
  if (!phase || !student) return '';
  const ctx = buildTextContext({
    subject: student,
    ref: eventRef,
    week,
    globals: {
      featureId: formId,
      formId,
      stageIdx,
      phaseIdx,
      history,
      eventRef,
      evolvedFormId: formId,
      evolvedStageIdx: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  let line = '';
  try {
    line = render(`{evolved.event.${formId}.s${stageIdx}.p${phaseIdx}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    line = resolvePhaseTextLegacy(phase, student, history, eventRef);
  }
  line = tryAppendLegacyBody(
    line,
    `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}.legacyBody`,
    ctx,
    opts.legacyBodyChance ?? legacyBodyChanceFromCtx(ctx, 0.12),
  );
  return renderEvolvedEventProse(line, student, week, { formId, stageIdx, v2DepthChance: opts.v2DepthChance ?? 0.28 });
}

/** Choice result line when player picks an evolved event option. */
export function renderEvolvedEventChoiceResult(formId, stageIdx, phaseIdx, choiceId, student, week, history = []) {
  const evDef = EVOLVED_EVENTS[formId]?.[stageIdx];
  const phase = evDef?.phases?.[phaseIdx];
  const choice = phase?.choices?.find((c) => c.id === choiceId);
  if (!choice || !student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { formId, stageIdx, phaseIdx, history, evolvedFormId: formId, evolvedStageIdx: stageIdx },
  });
  let line = '';
  try {
    line = render(`{evolved.event.${formId}.s${stageIdx}.p${phaseIdx}.${choiceId}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    if (typeof choice.result === 'function') {
      try {
        line = String(choice.result(student, history)).trim();
      } catch {
        line = String(choice.result(student)).trim();
      }
    } else {
      line = (choice.result || '').trim();
    }
  }
  line = tryAppendLegacyBody(
    line,
    `evolved.event.${formId}.s${stageIdx}.p${phaseIdx}.${choiceId}.legacyBody`,
    ctx,
    legacyBodyChanceFromCtx(ctx, 0.1),
  );
  return renderEvolvedEventProse(line, student, week, { formId, stageIdx, v2DepthChance: 0.22 });
}

/** Ending beat after branching evolved event completes. */
export function renderEvolvedEventEnding(student, week, formId, stageIdx, endingIdx, history, totalGain, fallbackRaw = '') {
  if (!student) return fallbackRaw || '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      formId,
      stageIdx,
      endingIdx,
      history,
      totalGain,
      gainAccum: totalGain,
      evolvedFormId: formId,
      evolvedStageIdx: stageIdx,
    },
  });
  let line = '';
  try {
    line = render(`{evolved.event.${formId}.s${stageIdx}.end${endingIdx}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) line = (fallbackRaw || '').trim();
  line = tryAppendLegacyBody(
    line,
    `evolved.event.${formId}.s${stageIdx}.end${endingIdx}.legacyBody`,
    ctx,
    0.14,
  );
  return renderEvolvedEventProse(line, student, week, { formId, stageIdx, v2DepthChance: 0.32 });
}

/** Passive evolved activity beat (no EVOLVED_EVENTS modal for this stage). */
export function renderEvolvedActivityBeat(student, week = 1, stageIdx = 0, opts = {}) {
  const formId = student?.evolvedForm;
  if (!formId) return "She's in her element.";
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: formId,
      formId,
      stageIdx,
      evolvedFormId: formId,
      evolvedStageIdx: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  let line = '';
  try {
    line = render(`{evolved.activity.${formId}}`, ctx)?.trim();
  } catch {
    line = '';
  }
  if (!line || line.includes('{unresolved}')) {
    const arr = EVOLVED_ACTIVITY_TEXT[formId];
    const raw = arr?.[stageIdx];
    line = raw ? (typeof raw === 'function' ? raw(student) : raw) : "She's in her element.";
  }
  line = tryAppendLegacyBody(
    line,
    `evolved.activity.${formId}.s${stageIdx}.legacyBody`,
    ctx,
    opts.legacyBodyChance ?? 0.1,
  );
  return renderEvolvedEventProse(line, student, week, {
    formId,
    stageIdx,
    v2DepthChance: opts.v2DepthChance ?? 0.35,
  });
}

/** Evolved event prose beat — V2 depth on legacy phase/choice/ending text. */
export function renderEvolvedEventProse(text, student, week = 1, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: opts.formId || student?.evolvedForm || 'evolved',
      stageIdx: opts.stageIdx ?? null,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  const chance = opts.v2DepthChance ?? 0.3;
  let out = appendV2Depth(line, 'evolved', ctx, chance);
  const formId = opts.formId || student?.evolvedForm;
  const formPool = EVOLVED_FORM_POOLS[formId];
  if (formPool && out?.trim() && Math.random() < chance * 0.85) {
    const extra = render(`{${formPool}}`, ctx)?.trim();
    if (extra) out = `${out}\n\n${extra}`;
  }
  return out;
}
