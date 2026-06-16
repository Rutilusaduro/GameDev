// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Dinner scene library — endings, conversations, group beats.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './endingScene.js';
import './conversations.js';
import './groupConversations.js';
import './reactions.js';
import './waiter.js';
import './depth.js';

export { renderDinnerEnding } from './endingScene.js';

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
  return poolKey ? renderReactionPool(poolKey, subject, ref, week, opts) : '';
}

/** Fed girl unbuttons mid-meal when she crosses fullness cap. */
export function renderDinnerUnbutton(student, week = 1, opts = {}) {
  return renderReactionPool(REACTION_POOLS.unbutton, student, student, week, opts);
}

/** Render a solo dinner conversation topic by id (matches DINNER_CONVERSATION[].id). */
export function renderDinnerConversation(convId, student, week = 1, opts = {}) {
  if (!student || !convId) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render(`{dinner.conv.${convId}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
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
  const line = render(`{dinner.groupConv.${convId}}`, ctx, { trace: opts.trace || null });
  return line?.trim() || '';
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
  const line = render('{dinner.waiter}', ctx, { trace: opts.trace || null });
  return line?.trim() || 'The server arrives. "Shall I bring more?" she asks.';
}

/** Full dinner depth beat — setup through exit. */
export function renderDinnerDepth(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render('{dinner.depth}', ctx, { trace: opts.trace || null });
  return line?.trim() || renderDinnerEnding(student, student.fullness || 0, student.stomachCapacity || 100, week);
}
