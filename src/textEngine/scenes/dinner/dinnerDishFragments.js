// Private dinner dish blurbs — composable savor + portion slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { DINNER_VENUES, PRIVATE_FOODS } from '../../../gameData/sessions.js';

registerPool('dinner.dish.savor', [
  {
    when: {},
    weight: 2,
    text: [
      'Steam and richness arrive together — the kind of main that invites a second helping.',
      'Portions meant to be taken seriously; she meets them with honest appetite.',
      'The plate looks expensive; the fullness will feel personal.',
    ],
  },
]);

registerPool('dinner.dish.venueMood', [
  {
    when: {},
    weight: 2,
    text: [
      'Candlelight flatters every curve; the room already expects her to finish.',
      'Wellness framing on the menu; indulgence in the portions.',
      'She reads the description like a promise and orders like a confession.',
    ],
  },
]);

const DISH_SKELETON = '{dinner.dish.savor|prefix:} {dinner.dish.venueMood|prefix: }';

function allDishes() {
  const out = [];
  for (const venue of DINNER_VENUES) {
    for (const dish of venue.dishes || []) out.push(dish);
  }
  for (const food of PRIVATE_FOODS) out.push(food);
  return out;
}

for (const dish of allDishes()) {
  if (!dish?.id) continue;
  registerModuleVariants(`dinner.dish.${dish.id}`, [
    {
      when: { weekMin: 18 },
      weight: 4,
      priority: 3,
      text: [DISH_SKELETON],
    },
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [DISH_SKELETON],
    },
  ]);
}
