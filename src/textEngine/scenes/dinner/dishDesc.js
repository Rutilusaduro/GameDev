// Venue/private dish descriptions — wired from sessions.js catalog (§9).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { DINNER_VENUES, PRIVATE_FOODS } from '../../../gameData/sessions.js';

function registerDishDesc(dish) {
  if (!dish?.id || !dish.desc) return;
  registerPool(`dinner.dish.${dish.id}`, [
    { when: {}, text: [dish.desc] },
  ]);
}

for (const venue of DINNER_VENUES) {
  for (const dish of venue.dishes || []) registerDishDesc(dish);
}
for (const food of PRIVATE_FOODS) registerDishDesc(food);

export function renderDinnerDishDesc(dish, student, week = 1, opts = {}) {
  if (!dish) return '';
  const fallback = dish.label || '';
  if (!student) return fallback;
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const line = render(`{dinner.dish.${dish.id}}`, ctx, { trace: opts.trace || null })?.trim();
  return line || fallback;
}
