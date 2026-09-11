// The Squad — Lead: A4 Architect | Support: A1 Mobile, A5 Editor
// Collab stream — engine bridge for Kylie × partner feedee_creator streams.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { COLLAB_WREN_LINES, COLLAB_STAGEUP_TEXT, COLLAB_PAYOFF_TEXT } from '../../../gameData/miniGames.js';
import './fragments.js';
import './stageupFragments.js';
import './payoffFragments.js';
import './collabStreamSceneDepth.js';

registerDimension('collabStage', (ctx) => ctx.globals?.collabStage ?? 0);
registerDimension('partnerName', (ctx) => ctx.d?.partnerName ?? ctx.globals?.partnerName ?? 'her partner');
registerDimension('partnerLbs', (ctx) => ctx.d?.partnerLbs ?? ctx.globals?.partnerLbs ?? 0);
registerDimension('kylieGain', (ctx) => ctx.globals?.kylieGain ?? ctx.d?.kylieGain ?? 0);
registerDimension('partnerGain', (ctx) => ctx.globals?.partnerGain ?? ctx.d?.partnerGain ?? 0);
registerDimension('newLbs', (ctx) => Math.round(ctx.globals?.newLbs ?? ctx.d?.newLbs ?? 0));

registerPool('partnerName', [
  { when: {}, text: [(ctx) => ctx.d?.partnerName ?? ctx.globals?.partnerName ?? 'her partner'] },
  { when: {}, text: [(ctx) => ctx.globals?.partnerName ?? ctx.d?.partnerName ?? 'her partner'] },
  { when: {}, text: [(ctx) => String(ctx.d?.partnerName ?? ctx.globals?.partnerName ?? 'her partner').trim()] },
]);
registerPool('partnerLbs', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.partnerLbs ?? ctx.globals?.partnerLbs ?? 0))] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.partnerLbs ?? ctx.d?.partnerLbs ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.d?.partnerLbs ?? ctx.globals?.partnerLbs ?? 0)}`] },
]);
registerPool('wrenLine', [
  { when: {}, text: [(ctx) => ctx.d?.wrenLine ?? ''] },
  { when: {}, text: [(ctx) => ctx.globals?.wrenLine ?? ctx.d?.wrenLine ?? ''] },
  { when: {}, text: [(ctx) => String(ctx.d?.wrenLine ?? ctx.globals?.wrenLine ?? '').trim()] },
]);
registerPool('kylieGain', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.kylieGain ?? ctx.d?.kylieGain ?? 0))] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.kylieGain ?? ctx.globals?.kylieGain ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.kylieGain ?? ctx.d?.kylieGain ?? 0)}`] },
]);
registerPool('partnerGain', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.partnerGain ?? ctx.d?.partnerGain ?? 0))] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.partnerGain ?? ctx.globals?.partnerGain ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.partnerGain ?? ctx.d?.partnerGain ?? 0)}`] },
]);
registerPool('newLbs', [
  { when: {}, text: [(ctx) => String(Math.round(ctx.globals?.newLbs ?? ctx.d?.newLbs ?? 0))] },
  { when: {}, text: [(ctx) => String(Math.round(ctx.d?.newLbs ?? ctx.globals?.newLbs ?? 0))] },
  { when: {}, text: [(ctx) => `${Math.round(ctx.globals?.newLbs ?? ctx.d?.newLbs ?? 0)}`] },
]);

for (let si = 0; si < COLLAB_STAGEUP_TEXT.length; si++) {
  const fn = COLLAB_STAGEUP_TEXT[si];
  if (!fn) continue;
  const stageupText = (ctx) => {
    const newLbs = ctx.globals?.newLbs ?? ctx.d?.newLbs ?? 0;
    return fn(ctx.subject?.name ?? 'Kylie', ctx.d?.partnerName ?? 'her partner', newLbs);
  };
  registerPool(`collab.stream.stageup.s${si}`, [
    { when: {}, text: [stageupText] },
    { when: {}, text: [(ctx) => `${stageupText(ctx)}\n\nThe chat does not wait for you to finish the sentence.`] },
    { when: {}, text: [(ctx) => `On stream:\n\n${stageupText(ctx)}`] },
  ]);
}

for (let si = 0; si < COLLAB_PAYOFF_TEXT.length; si++) {
  const fn = COLLAB_PAYOFF_TEXT[si];
  if (!fn) continue;
  const payoffText = (ctx) => {
    const kg = ctx.globals?.kylieGain ?? ctx.d?.kylieGain ?? 0;
    const pg = ctx.globals?.partnerGain ?? ctx.d?.partnerGain ?? 0;
    const pn = ctx.d?.partnerName ?? 'her partner';
    return fn(kg, pg, pn);
  };
  registerPool(`collab.stream.payoff.s${si}`, [
    { when: {}, text: [payoffText] },
    { when: {}, text: [(ctx) => `${payoffText(ctx)}\n\nThe stream ends. The warmth does not.`] },
    { when: {}, text: [(ctx) => `Collab complete.\n\n${payoffText(ctx)}`] },
  ]);
}

for (let si = 0; si < COLLAB_WREN_LINES.length; si++) {
  registerPool(`collab.stream.wren.s${si}`, [{ when: {}, text: COLLAB_WREN_LINES[si] }]);
}

registerPool('collab.stream.reveal.kylie', [
  { when: {}, text: [
    '{collab.reveal.open} {collab.reveal.kylie.number} {collab.reveal.kylie.chat}',
    '{collab.reveal.kylie.number} {collab.reveal.kylie.body} {collab.reveal.kylie.chat}',
    '{collab.reveal.open} {collab.reveal.kylie.body} {collab.reveal.kylie.number}',
  ]},
]);

registerPool('collab.stream.reveal.partner', [
  { when: {}, text: [
    '{collab.reveal.partner.number} {collab.reveal.partner.wren} {collab.reveal.partner.close}',
    '{collab.reveal.partner.number} {collab.reveal.partner.close}',
    '{collab.reveal.partner.wren} {collab.reveal.partner.number} {collab.reveal.partner.close}',
  ]},
]);

registerPool('collab.stream.zoom', [
  { when: { stageMin: 7 }, text: [
    '{collab.zoom.open} {collab.zoom.mass} {collab.zoom.chat}',
  ]},
  { when: {}, text: [
    '{collab.zoom.open} {collab.zoom.table} {collab.zoom.chat}',
    '{collab.zoom.table} {collab.zoom.chat}',
    '{collab.zoom.open} {collab.zoom.mass} {collab.zoom.chat}',
  ]},
]);

registerPool('collab.stream.chat', [
  { when: {}, text: [
    '{collab.chat.open} {collab.chat.wren} {collab.chat.bump}',
    '{collab.chat.wren} {collab.chat.bump}',
    '{collab.chat.open} {collab.chat.bump} {collab.chat.wren}',
  ]},
]);

registerPool('collab.stream.push.good', [
  { when: { collabStage: [3, 4, 5] }, text: [
    '{collab.push.good.hard} {collab.push.good.chat}',
    '{collab.push.good.open} {collab.push.good.hard} {collab.push.good.chat}',
  ]},
  { when: {}, text: [
    '{collab.push.good.open} {collab.push.good.chat}',
    '{collab.push.good.hard} {collab.push.good.chat}',
    '{collab.push.good.open} {collab.push.good.hard} {collab.push.good.chat}',
  ]},
]);

registerPool('collab.stream.push.bad', [
  { when: {}, text: [
    '{collab.push.bad.open} {collab.push.bad.recover}',
    '{collab.push.bad.recover}',
    '{collab.push.bad.open} {collab.push.bad.recover} {collab.chat.bump}',
  ]},
]);

registerPool('collab.stream.crash', [
  { when: {}, text: [
    '{collab.crash.open} {collab.crash.gain}',
    '{collab.crash.gain}',
    '{collab.crash.open} {collab.crash.gain} {collab.chat.bump}',
  ]},
]);

export function buildCollabCtx(kylie, partner, week, stageIdx = 0, opts = {}) {
  const ctx = buildTextContext({
    subject: kylie,
    week,
    globals: { featureId: 'collab_stream', collabStage: stageIdx, ...(opts.globals || {}) },
    ...opts,
  });
  ctx.d.partnerName = partner?.name || 'her partner';
  ctx.d.partnerLbs = Math.round(partner?.lbs || 0);
  ctx.d.wrenLine = opts.wrenLine || opts.globals?.wrenLine || '';
  return ctx;
}

export function renderCollabStreamBeat(poolKey, kylie, partner, week, stageIdx, opts = {}) {
  const ctx = buildCollabCtx(kylie, partner, week, stageIdx, opts);
  const base = render(`{${poolKey}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  if (!base) return '';
  return appendV2Depth(base, 'collabStream', ctx, opts.v2DepthChance ?? 0.28);
}

export function renderCollabStreamLegacy(text, kylie, partner, week, stageIdx = 0, opts = {}) {
  const line = typeof text === 'string' ? text.trim() : '';
  if (!line) return '';
  const ctx = buildCollabCtx(kylie, partner, week, stageIdx, opts);
  return appendV2Depth(line, 'collabStream', ctx, opts.v2DepthChance ?? 0.26);
}

export function pickCollabWrenLine(stageIdx, kylie, partner, week) {
  const si = Math.min(Math.max(0, stageIdx), COLLAB_WREN_LINES.length - 1);
  const ctx = buildCollabCtx(kylie, partner, week, si);
  return render(`{collab.stream.wren.s${si}}`, ctx)?.trim() || '';
}

export function renderCollabStageUp(stageIdx, kylie, partner, newLbs, week) {
  const si = Math.min(Math.max(0, stageIdx), COLLAB_STAGEUP_TEXT.length - 1);
  const ctx = buildCollabCtx(kylie, partner, week, stageIdx, {
    globals: { newLbs: Math.round(newLbs) },
  });
  const raw = render(`{collab.stream.stageup.compose.s${si}}`, ctx)?.trim()
    || render(`{collab.stream.stageup.s${si}}`, ctx)?.trim()
    || `${partner.name} just crossed ${Math.round(newLbs)} pounds on stream!`;
  return appendV2Depth(raw, 'collabStream', ctx, 0.3);
}

export function renderCollabPayoff(stageIdx, kylieGain, partnerGain, partner, kylie, week) {
  const si = Math.min(Math.max(0, stageIdx), COLLAB_PAYOFF_TEXT.length - 1);
  const ctx = buildCollabCtx(kylie, partner, week, stageIdx, {
    globals: {
      kylieGain: Math.round(kylieGain),
      partnerGain: Math.round(partnerGain),
    },
  });
  const raw = render(`{collab.stream.payoff.compose.s${si}}`, ctx)?.trim()
    || render(`{collab.stream.payoff.s${si}}`, ctx)?.trim()
    || `${Math.round(kylieGain)} pounds on Kylie, ${Math.round(partnerGain)} on ${partner.name}. Stream complete.`;
  return appendV2Depth(raw, 'collabStream', ctx, 0.32);
}
