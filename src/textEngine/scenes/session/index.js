// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Private session fullness + aftermath prose.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fullness.js';
import './fullnessDepth.js';
import './aftermath.js';
import './aftermathDepth.js';
import './selectors.js';
import './selectorDepth.js';
import '../proseOverhaul.js';
import '../proseOverhaulPass4.js';

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
  const composed = composeOverlay(main, renderSessionOverlay(student, week, opts));
  return appendV2Depth(composed, 'session', ctx, opts.v2DepthChance ?? 0.3);
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
  const linger = render('{session.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = composeOverlay(main, renderSessionOverlay(student, week, opts));
  const withLinger = [composed, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(withLinger, 'session', ctx, opts.v2DepthChance ?? 0.28);
}

/** Linger wrap under unique tap-out dialogue. Always appends; leftover/night keys fire when live. */
export function renderTapOutWrap(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{session.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
}
