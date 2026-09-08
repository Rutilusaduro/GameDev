// The Squad — Lead: A4 Architect | Support: A2 Psych, A7 Artisan, A5 Editor
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './ceremony.js';
import './held.js';
import './decline.js';
import './stirring.js';
import './wordLayer.js';
import './abilities.js';
import './personas/serena.js';

export const ASC_CEREMONY = '{asc.ceremony.scene}';
export const ASC_HELD = '{asc.held.scene}';
export const ASC_DECLINE = '{asc.decline.scene}';
export const ASC_STIRRING = '{asc.stirring.scene}';
export const ASC_ABILITY_GENERIC = '{asc.ability.generic}';

function ascensionCtx(student, week, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    ...opts,
    globals: {
      ascensionGate: opts.ascensionGate || 'eligible',
      inWater: !!opts.inWater,
      ...(opts.globals || {}),
    },
  });
}

export function renderAscensionCeremony(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = ascensionCtx(student, week, opts);
  const base = render(ASC_CEREMONY, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'ascension', ctx, opts.v2DepthChance ?? 0.35);
}

export function renderAscensionHeld(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = ascensionCtx(student, week, { ...opts, ascensionGate: 'held' });
  const base = render(ASC_HELD, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'ascension', ctx, opts.v2DepthChance ?? 0.32);
}

export function renderAscensionDecline(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = ascensionCtx(student, week, { ...opts, ascensionGate: 'decline' });
  const base = render(ASC_DECLINE, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'ascension', ctx, opts.v2DepthChance ?? 0.3);
}

export function renderAscensionStirring(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = ascensionCtx(student, week, { ...opts, ascensionGate: 'stirring' });
  const base = render(ASC_STIRRING, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'ascension', ctx, opts.v2DepthChance ?? 0.3);
}

export function renderAscensionAbility(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = ascensionCtx(student, week, { ...opts, ascensionGate: 'ability' });
  const base = render(opts.template || ASC_ABILITY_GENERIC, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'ascension', ctx, opts.v2DepthChance ?? 0.28);
}
