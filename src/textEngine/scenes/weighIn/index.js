// ═══════════════════════════════════════════════════════════════
// SCENE: WEIGH-IN v2 — slot-composed arrival, scale, and reply
// Subject = the student being weighed.
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import '../../modules.js';
import './arrival.js';
import './settle.js';
import './scale.js';
import './stepOff.js';
import './reply.js';
import './break.js';
import { appendCampusWeighIn } from '../campusSoftening.js';

export const WI_ARRIVAL = '{wi.arrival} {wi.settle}';
export const WI_SCALE_NORMAL = '{wi.scaleApproach}';
export const WI_SCALE_BIG = '{wi.bigScaleApproach}';

export const WI_INTRO = '{wi.arrival} {wi.settle} {wi.scaleApproach}';
export const WI_INTRO_BIG = '{wi.arrival} {wi.settle} {wi.bigScaleApproach}';
export const WI_REACTION = '{wi.stepOff}\n\n{wi.reply}';
export const WI_BREAK = '{wi.breakBeat}';
export const WI_SWAP = '{wi.swap}';
export const WI_PURCHASE = '{wi.purchase}';

function weighInCtx(student, week, opts = {}) {
  return createContext({
    subject: student,
    week,
    globals: {
      campusFattening: !!opts.campusFattening,
      campusTier: opts.campusTier ?? (opts.campusFattening ? 1 : 0),
      bigScale: !!opts.bigScale,
    },
  });
}

export function renderWeighInIntro(student, week, goesDirectlyToBig = false, opts = {}) {
  const ctx = weighInCtx(student, week, opts);
  return render(goesDirectlyToBig ? WI_INTRO_BIG : WI_INTRO, ctx);
}

export function renderWeighInReaction(student, week, opts = {}) {
  const ctx = weighInCtx(student, week, { ...opts, bigScale: !!opts.bigScale });
  const body = render(WI_REACTION, ctx);
  return appendCampusWeighIn(body, student, { ...opts, week });
}

export function renderWeighInBreak(student, week, opts = {}) {
  return render(WI_BREAK, weighInCtx(student, week, opts));
}

export function renderWeighInSwap(student, week, opts = {}) {
  return render(WI_SWAP, weighInCtx(student, week, opts));
}

export function renderWeighInPurchase(student, week, opts = {}) {
  return render(WI_PURCHASE, weighInCtx(student, week, opts));
}
