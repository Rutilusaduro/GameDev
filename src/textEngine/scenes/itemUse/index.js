// Item feed — opening beat before feed reaction (modular).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { ITEMS } from '../../../gameData/items.js';

registerPool('item.use.open', [
  { when: {}, text: [
    'You produce the {item.label}. {subject.name}\'s attention arrives before her objections do.',
    '"Is that for me?" {subject.name} asks, already reaching. The {item.label} does not survive the hour.',
    'You leave the {item.label} where {subject.name} will find it. She finds it.',
    'The {item.emoji} {item.label} lands between you — invitation, not question.',
  ]},
  { when: { corruption: [1, 2] }, weight: 2, text: [
    'You set out the {item.label} like a promise. {subject.name} meets your eyes and starts eating.',
    '{subject.name} takes the {item.label} without pretending she did not want it.',
  ]},
]);

registerPool('item.label', [
  { when: {}, text: [(ctx) => String(ctx.globals?.itemLabel || 'snack').toLowerCase()] },
  { when: {}, text: [(ctx) => String(ctx.globals?.itemLabel || 'snack')] },
  { when: {}, text: [(ctx) => (ctx.globals?.itemLabel || 'snack').toLowerCase()] },
]);

registerPool('item.emoji', [
  { when: {}, text: [(ctx) => ctx.globals?.itemEmoji || '🍽️'] },
  { when: {}, text: [(ctx) => ctx.globals?.itemEmoji || '🍽️'] },
  { when: {}, text: [(ctx) => String(ctx.globals?.itemEmoji || '🍽️')] },
]);

const itemById = new Map(ITEMS.map((i) => [i.id, i]));

export function renderItemUseOpen(student, item, week = 1, opts = {}) {
  const def = item?.id ? itemById.get(item.id) : item;
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'item_use',
      itemLabel: def?.label || item?.label || 'snack',
      itemEmoji: def?.emoji || item?.emoji || '🍽️',
      ...(opts.globals || {}),
    },
    ...opts,
  });
  const raw = render('{item.use.open}', ctx, { trace: opts.trace || null })?.trim();
  if (!raw) {
    return `You offer the ${(def?.label || 'snack').toLowerCase()}. ${student?.name || 'She'} accepts.`;
  }
  return raw;
}
