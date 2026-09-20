// Ranked feedee session — engine bridge (Destiny evolved path).
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from '../../../gameData/rankedSessionData.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { rankedSessionV2DepthChance } from '../../../gameData/sessionTextDepth.js';
import './legacyPools.js';

registerDimension('sessionStage', (ctx) => ctx.globals?.sessionStage ?? 0);

registerPool('sessionGain', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.sessionGain ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.sessionGain ?? 0)}`] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.sessionGain ?? ctx.globals?.sessionGain ?? 0))] },
]);

function buildSessionCtx(student, week, stageIdx, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'ranked_session',
      sessionStage: stageIdx,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

function renderSessionLine(ctx, poolKey, legacyKey, rawFallback) {
  const week = ctx.week ?? 1;
  const primary = render(`{${poolKey}}`, ctx)?.trim();
  if (primary && !primary.includes('{unresolved}')) return primary;
  if (week >= 14) return primary || rawFallback || '';
  const legacy = legacyKey ? render(`{${legacyKey}}`, ctx)?.trim() : '';
  if (legacy && !legacy.includes('{unresolved}')) return legacy;
  return rawFallback || '';
}

export function renderSessionRaeArrival(stageIdx, student, week) {
  const si = Math.min(Math.max(0, stageIdx), 5);
  const ctx = buildSessionCtx(student, week, si);
  const row = SESSION_NPC_LINES?.[si];
  const raw = renderSessionLine(
    ctx,
    `session.rae.arrival.s${si}`,
    `session.rae.arrival.s${si}.legacyBody`,
    row?.arrival || 'Delivery.',
  );
  const extra = row?.extra
    ? renderSessionLine(
      ctx,
      `session.rae.extra.s${si}`,
      `session.rae.extra.s${si}.legacyBody`,
      row.extra,
    )
    : '';
  const combined = [raw, extra].filter(Boolean).join(' ');
  return appendV2Depth(combined, 'rankedSession', ctx, rankedSessionV2DepthChance(0.24));
}

export function renderSessionRaeExtra(stageIdx, student, week) {
  const si = Math.min(Math.max(0, stageIdx), 5);
  const ctx = buildSessionCtx(student, week, si);
  const row = SESSION_NPC_LINES?.[si];
  const raw = renderSessionLine(
    ctx,
    `session.rae.extra.s${si}`,
    `session.rae.extra.s${si}.legacyBody`,
    row?.extra || 'She appears with extra supplies.',
  );
  return appendV2Depth(raw, 'rankedSession', ctx, rankedSessionV2DepthChance(0.26));
}

export function renderSessionPayoff(stageIdx, gain, endReason, student, week) {
  const si = Math.min(Math.max(0, stageIdx), SESSION_PAYOFF_TEXT.length - 1);
  const ctx = buildSessionCtx(student, week, si, {
    globals: {
      sessionGain: Math.round(gain),
      sessionEndReason: endReason || 'focus_out',
    },
  });
  const fn = SESSION_PAYOFF_TEXT[si];
  const raw = render(`{session.payoff.legacy.s${si}}`, ctx)?.trim()
    || (fn ? fn(gain, endReason) : `Session closed with ${Math.round(gain)} lbs gained.`);
  return appendV2Depth(raw, 'rankedSession', ctx, rankedSessionV2DepthChance(0.3));
}
