// ═══════════════════════════════════════════════════════════════
// SCENE: WEIGH-IN — weekly check-in, fully slot-composed.
// Templates compose beat modules; beats are skeleton pools whose
// slots draw from the fragment pools in ./fragments.js, per-girl
// voice in ./personas.js, break scene in ./breakScene.js.
// This file is the public API — WeighInModal imports from here.
// Canonical exemplar scene for src/textEngine/AUTHORING.md.
// ═══════════════════════════════════════════════════════════════
import { createContext, render } from '../../engine.js';
import './fragments.js';
import './personas.js';
import './breakScene.js';
import { appendCampusWeighIn } from '../campusSoftening.js';

export const WI_INTRO = "{wi.arrival} {wi.settle} {wi.scaleApproach}";
export const WI_INTRO_BIG = "{wi.arrival} {wi.settle} {wi.bigScaleApproach}";
export const WI_REACTION = "{wi.stepOff}\n\n{wi.reply}{wi.foodAsk|prefix: }";
export const WI_BREAK = "{wi.breakBeat} {wi.breakLine}";

function weighInCtx(student, week, opts = {}) {
  return createContext({
    subject: student,
    week,
    globals: {
      campusFattening: !!opts.campusFattening,
      campusTier: opts.campusTier || (opts.campusFattening ? 1 : 0),
      bigScale: !!opts.bigScale,
    },
  });
}

// All renderers honor opts.trace (array) — slot provenance for dev tooling.

// Intro scene: arrival + settle + scale approach.
export function renderWeighInIntro(student, week, goesDirectlyToBig = false, opts = {}) {
  const ctx = weighInCtx(student, week, { ...opts, bigScale: goesDirectlyToBig });
  return render(goesDirectlyToBig ? WI_INTRO_BIG : WI_INTRO, ctx, { trace: opts.trace });
}

// Reaction: step-off beat + her personal reply (campus coda preserved).
export function renderWeighInReaction(student, week, opts = {}) {
  const ctx = weighInCtx(student, week, opts);
  const stepOff = render("{wi.stepOff}", ctx, { trace: opts.trace });
  const reply = appendCampusWeighIn(
    render("{wi.reply}{wi.foodAsk|prefix: }", ctx, { trace: opts.trace }),
    student,
    { ...opts, week },
  );
  return `${stepOff}\n\n${reply}`;
}

// The analog scale cracks under her.
export function renderWeighInBreak(student, week, opts = {}) {
  return render(WI_BREAK, weighInCtx(student, week, opts), { trace: opts.trace });
}

// Professor swaps in the already-purchased industrial scale.
export function renderWeighInSwap(student, week, opts = {}) {
  return render("{wi.swap}", weighInCtx(student, week, opts), { trace: opts.trace });
}

// Professor notes the need to buy a bigger scale.
export function renderWeighInPurchase(student, week, opts = {}) {
  return render("{wi.purchase}", weighInCtx(student, week, opts), { trace: opts.trace });
}
