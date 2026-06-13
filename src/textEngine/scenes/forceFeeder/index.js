// ═══════════════════════════════════════════════════════════════
// SCENE: FORCE FEEDER — Gullet Calibration aftermath prose
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import './fragments.js';

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
  return render(FF_SETUP, ffCtx(student, week, params, opts), { trace: opts.trace });
}

export function renderForceFeederFeed(student, week, params = {}, opts = {}) {
  return render(FF_FEED, ffCtx(student, week, params, opts), { trace: opts.trace });
}

export function renderForceFeederAftermath(student, week, params = {}, opts = {}) {
  return render(FF_AFTERMATH, ffCtx(student, week, params, opts), { trace: opts.trace });
}

export function renderForceFeederScene(student, week, params = {}, opts = {}) {
  const setup = renderForceFeederSetup(student, week, params, opts);
  const feed = renderForceFeederFeed(student, week, params, opts);
  const aftermath = renderForceFeederAftermath(student, week, params, opts);
  return [setup, feed, aftermath].filter((b) => b && b.trim()).join('\n\n');
}
