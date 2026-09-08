// ═══════════════════════════════════════════════════════════════
// SCENE: FORCE FEEDER — Gullet Calibration aftermath prose
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';
import './depth.js';

export const FF_SETUP = '{ff.setup}';
export const FF_FEED = '{ff.feed}';
export const FF_AFTERMATH = '{ff.aftermath}';

export function buildForceFeederGlobals(student, params = {}) {
  return {
    performanceTier: params.performanceTier || 'good',
    feedAttitude: params.feedAttitude || 'willing',
    targetIsTalia: !!params.targetIsTalia,
    startStage: params.startStage ?? getStage(student?.lbs ?? 130).id,
    endStage: params.endStage ?? getStage(student?.lbs ?? 130).id,
    stagesJumped: params.stagesJumped ?? 0,
    gainLbs: params.gainLbs ?? 0,
    deviceId: 'feeding_mask',
    chokedOut: !!params.chokedOut,
    chokeMeter: params.chokeMeter ?? 0,
    efficiencyPct: params.efficiencyPct ?? 0,
    locale: 'lab',
  };
}

function ffCtx(student, week, params = {}, opts = {}) {
  return createContext({
    subject: student,
    week,
    globals: buildForceFeederGlobals(student, params),
  });
}

export function renderForceFeederSetup(student, week, params = {}, opts = {}) {
  const ctx = ffCtx(student, week, params, opts);
  const base = render(FF_SETUP, ctx, { trace: opts.trace });
  return appendV2Depth(base, 'forceFeed', ctx, opts.v2DepthChance ?? 0.32);
}

export function renderForceFeederFeed(student, week, params = {}, opts = {}) {
  const ctx = ffCtx(student, week, params, opts);
  const base = render(FF_FEED, ctx, { trace: opts.trace });
  return appendV2Depth(base, 'forceFeed', ctx, opts.v2DepthChance ?? 0.3);
}

export function renderForceFeederAftermath(student, week, params = {}, opts = {}) {
  const ctx = ffCtx(student, week, params, opts);
  const base = render(FF_AFTERMATH, ctx, { trace: opts.trace });
  return appendV2Depth(base, 'forceFeed', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderForceFeederScene(student, week, params = {}, opts = {}) {
  const setup = renderForceFeederSetup(student, week, params, opts);
  const feed = renderForceFeederFeed(student, week, params, opts);
  const aftermath = renderForceFeederAftermath(student, week, params, opts);
  return [setup, feed, aftermath].filter((b) => b && b.trim()).join('\n\n');
}
