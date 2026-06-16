// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Private session fullness + aftermath prose.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fullness.js';
import './aftermath.js';

/** Map session fullness percent to aftermath band key. */
export function getAftermathBand(fPct) {
  if (fPct <= 60) return 'light';
  if (fPct <= 95) return 'full';
  if (fPct <= 140) return 'stuffed';
  return 'packed';
}

/** Archetype × fullness-stage beat during private/group feeding. */
export function renderSessionFullness(student, fullnessStageId, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { fullnessStage: fullnessStageId, ...(opts.globals || {}) },
    ...opts,
  });
  const line = render('{session.fullness}', ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}

/** Closing beat when a private session ends (keyed by fullness percent band). */
export function renderSessionAftermath(student, fPct, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { aftermathBand: getAftermathBand(fPct), ...(opts.globals || {}) },
    ...opts,
  });
  const line = render('{session.aftermath}', ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}
