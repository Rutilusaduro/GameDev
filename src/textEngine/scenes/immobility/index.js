// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Immobility scene system — stages 10-11.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import './personas.js';
import './comfort.js';
import './hints.js';
import './visits.js';
import './leftoverDepth.js';
export { renderImmobArrival } from './arrival.js';

registerPool('immob.scene', [
  { when: {}, text: [
    '{immob.settledState} {immob.environmental} {immob.attempt|prefix: }{immob.assistance|prefix: }{immob.register}',
    '{immob.settledState} {immob.spaceObs} {immob.register}',
    '{immob.environmental} {immob.bodyDesc|prefix:, }{immob.register}',
    '{immob.settledState} {immob.bodyDesc|prefix:, }{immob.spaceObs|prefix: }{immob.register}',
  ] },
]);

export function renderImmobScene(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{immob.scene}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.32);
}

export function renderImmobRefit(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{immob.refit}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.3);
}

export function renderImmobComfort(student, key, week = 1, opts = {}) {
  if (!student || !key) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render(`{immob.comfort.${key}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderImmobHint(student, pref, tier, week = 1, opts = {}) {
  if (!student || !pref) return '';
  const ctx = buildTextContext({
    subject: student, week,
    ...opts,
    globals: { courtHintTier: tier, pendingCourtPreference: student.pendingCourtPreference, ...(opts.globals || {}) },
  });
  const base = render(`{immob.hint.${pref}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.25);
}

export function renderImmobVisit(immobile, visitor, week = 1, opts = {}) {
  if (!immobile || !visitor) return '';
  const ctx = buildTextContext({ subject: immobile, ref: visitor, week, ...opts });
  const base = render('{immob.visit}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.3);
}

/** Linger wrap under unique immobile redirect / blob intro. Always appends; leftover/night keys fire when live. */
export function renderImmobWrap(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{immob.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
}

export function renderImmobPref(student, pref, boonTier, week = 1, opts = {}) {
  if (!student || !pref) return '';
  const ctx = buildTextContext({
    subject: student, week,
    ...opts,
    globals: { courtBoonTier: boonTier, courtPreference: student.courtPreference, ...(opts.globals || {}) },
  });
  const base = render(`{immob.pref.${pref}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.28);
}
