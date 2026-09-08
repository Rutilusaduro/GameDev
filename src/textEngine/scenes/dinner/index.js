// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Dinner scene library — endings, conversations, group beats.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import { renderMemoryCallback } from '../memory/index.js';
import './endingScene.js';
import './conversations.js';
import './groupConversations.js';
import './reactions.js';
import './waiter.js';
import './depth.js';
import './selectors.js';
import './overfill.js';
import './dishDesc.js';
import './wildcardDepth.js';
import './dinnerConvDepth.js';

export { renderDinnerEnding } from './endingScene.js';
export { renderDinnerOverfill } from './overfill.js';
export { renderDinnerDishDesc } from './dishDesc.js';

function composeOverlay(main, overlay) {
  const a = main?.trim() || '';
  const b = overlay?.trim() || '';
  if (a && b) return `${a} ${b}`;
  return a || b;
}

function maybeV2Dinner(text, student, week, opts = {}) {
  if (!text?.trim() || !student) return text;
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return appendV2Depth(text, 'dinner', ctx, opts.v2DepthChance ?? 0.28);
}

function renderOverlay(student, week, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  return render('{dinner.selectorOverlay}', ctx, { trace: opts.trace || null })?.trim() || '';
}

const REACTION_POOLS = {
  thinJealousy: 'dinner.reaction.thinJealousy',
  fatEncourage: 'dinner.reaction.fatEncourage',
  fatRetort: 'dinner.reaction.fatRetort',
  thinContextual: 'dinner.reaction.thinContextual',
  jealousyDefault: 'dinner.reaction.jealousyDefault',
  unbutton: 'dinner.reaction.unbutton',
};

function renderReactionPool(poolKey, subject, ref, week, opts = {}) {
  if (!subject || !poolKey) return '';
  const ctx = buildTextContext({
    subject,
    ref: ref || subject,
    week,
    globals: { reactionLevel: opts.reactionLevel ?? 0, ...(opts.globals || {}) },
    ...opts,
  });
  const line = render(`{${poolKey}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
}

/** Group dinner table reaction by kind (see REACTION_POOLS). */
export function renderGroupDinnerReaction(kind, subject, ref, week = 1, opts = {}) {
  const poolKey = REACTION_POOLS[kind];
  if (!poolKey) return '';
  const main = renderReactionPool(poolKey, subject, ref, week, opts);
  const composed = composeOverlay(main, renderOverlay(subject, week, { ref, ...opts }));
  return maybeV2Dinner(composed, subject, week, opts);
}

/** Fed girl unbuttons mid-meal when she crosses fullness cap. */
export function renderDinnerUnbutton(student, week = 1, opts = {}) {
  const main = renderReactionPool(REACTION_POOLS.unbutton, student, student, week, opts);
  const composed = composeOverlay(main, renderOverlay(student, week, opts));
  return maybeV2Dinner(composed, student, week, opts);
}

/** Render a solo dinner conversation topic by id (matches DINNER_CONVERSATION[].id). */
export function renderDinnerConversation(convId, student, week = 1, opts = {}) {
  if (!student || !convId) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const main = render(`{dinner.conv.${convId}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = composeOverlay(main, renderOverlay(student, week, opts));
  return maybeV2Dinner(composed, student, week, opts);
}

/** Render a group dinner conversation; subject + ref are the two girls at the table. */
export function renderGroupDinnerConversation(convId, subject, ref, week = 1, opts = {}) {
  if (!subject || !convId) return '';
  const ctx = buildTextContext({
    subject,
    ref: ref || subject,
    week,
    ...opts,
  });
  const main = render(`{dinner.groupConv.${convId}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = composeOverlay(main, renderOverlay(subject, week, { ref, ...opts }));
  return maybeV2Dinner(composed, subject, week, opts);
}

/** Venue waiter line when clearing plates mid-dinner. */
export function renderDinnerWaiter(venueId, student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { venueId: venueId || 'bistro', ...(opts.globals || {}) },
    ...opts,
  });
  const main = render('{dinner.waiter}', ctx, { trace: opts.trace || null })?.trim()
    || 'The server arrives. "Shall I bring more?" she asks.';
  const composed = composeOverlay(main, renderOverlay(student, week, opts));
  return maybeV2Dinner(composed, student, week, opts);
}

/** Full dinner depth beat — setup through exit. */
export function renderDinnerDepth(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const main = render('{dinner.depth}', ctx, { trace: opts.trace || null })?.trim()
    || renderDinnerEnding(student, student.fullness || 0, student.stomachCapacity || 100, week);
  const base = composeOverlay(main, renderOverlay(student, week, opts));
  const memBeat = opts.memScope ? renderMemoryCallback(student, week, { ...opts, scene: 'dinner' }) : '';
  return memBeat ? `${base}\n\n${memBeat}` : base;
}
