// The Squad — Lead: A2 Psych | Support: A4 Architect
// Opposition hearing — engine bridge for phase, choice, and ending prose.
import { registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

registerDimension('studentLbs', (ctx) => ctx.globals?.studentLbs ?? 0);
registerDimension('hearingType', (ctx) => ctx.globals?.hearingType ?? 'removal');
registerDimension('hearingPhase', (ctx) => ctx.globals?.hearingPhase ?? 0);

export function buildHearingCtx(student, week, type = 'removal', phaseIdx = 0, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'opposition_hearing',
      hearingType: type,
      hearingPhase: phaseIdx,
      studentLbs: student ? Math.round(student.lbs) : 0,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderHearingLegacy(text, student, week, type, phaseIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line) return line;
  const ctx = buildHearingCtx(student, week, type, phaseIdx, opts);
  const rendered = render(line, ctx)?.trim();
  const base = rendered && !rendered.includes('{unresolved}') ? rendered : line;
  if (!student) return base;
  return appendV2Depth(base, 'opposition', ctx, opts.v2DepthChance ?? 0.36);
}

function renderHearingPool(poolKey, student, week, type, phaseIdx = 0, opts = {}) {
  if (!poolKey) return '';
  const ctx = buildHearingCtx(student, week, type, phaseIdx, opts);
  try {
    const line = render(`{${poolKey}}`, ctx)?.trim();
    if (!line || line.includes('{unresolved}')) return '';
    return appendV2Depth(line, 'opposition', ctx, opts.v2DepthChance ?? 0.36);
  } catch {
    return '';
  }
}

export function renderHearingPhase(type, phaseIdx, student, week) {
  const pool = `opposition.hearing.${type}.phase${phaseIdx}`;
  return renderHearingPool(pool, student, week, type, phaseIdx, { v2DepthChance: 0.32 })
    || (type === 'emergency'
      ? 'Scandal meter critical. Vance calls an emergency session.'
      : `Chairwoman Vance opens the hearing. ${student?.name || 'Your resident'} sits beside you.`);
}

export function renderHearingChoiceResult(type, choiceId, student, week, phaseIdx = 0, resultPool = null) {
  const pool = resultPool || `opposition.hearing.${type}.result.${choiceId}`;
  return renderHearingPool(pool, student, week, type, phaseIdx, { v2DepthChance: 0.28 })
    || 'The room records your choice.';
}

export function renderHearingEnding(type, poolKey, student, week) {
  const pool = `opposition.hearing.${type}.ending.${poolKey}`;
  return renderHearingPool(pool, student, week, type, 2, { v2DepthChance: 0.34 })
    || 'The hearing adjourns.';
}
