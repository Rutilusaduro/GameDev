// The Squad — Lead: A1 Mobile | Support: A4 Architect
// Dinner scene library — endings, conversations, group beats.
import { render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import './endingScene.js';
import './conversations.js';
import './groupConversations.js';

export { renderDinnerEnding } from './endingScene.js';

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
