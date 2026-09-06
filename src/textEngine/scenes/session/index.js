// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Private session fullness + aftermath prose.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './fullness.js';
import './fullnessDepth.js';
import './aftermath.js';
import './aftermathDepth.js';
import './selectors.js';

function composeOverlay(main, overlay) {
  const a = main?.trim() || '';
  const b = overlay?.trim() || '';
  if (a && b) return `${a} ${b}`;
  return a || b;
}

function renderSessionOverlay(student, week, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{session.selectorOverlay}', ctx, { trace: opts.trace || null })?.trim() || '';
}

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
  const main = render('{session.fullness}', ctx, { trace: opts.trace || null })?.trim() || '';
  return composeOverlay(main, renderSessionOverlay(student, week, opts));
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
  const main = render('{session.aftermath}', ctx, { trace: opts.trace || null })?.trim() || '';
  return composeOverlay(main, renderSessionOverlay(student, week, opts));
}
