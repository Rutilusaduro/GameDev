// Campus exploration — late-game find + sighting overlays.
import { registerPool, registerModuleVariants } from '../engine.js';
import { EXPLORATION_FINDS } from '../../gameData/campusIngredients.js';

registerPool('campus.explore.lateFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'Campus paths hum between bells — appetite and hurry trading places like always.',
      'Hall Ambiance follows you outside; the quad smells like someone already started seconds.',
      'Late-semester foraging feels ceremonial — pockets full, wellness framing forgotten.',
      'Residents drift past with trays; you pocket salvage before curiosity names it.',
      'Something sweet or strange lands in your tote — the building trained you to take it.',
    ],
  },
]);

const FIND_LATE = '{campus.explore.lateFrame|prefix:} {campusEvent.scene.hallTone|prefix: }';
const SIGHTING_LATE = '{campus.explore.lateFrame|prefix:} {campusEvent.observation|prefix: }';

for (const find of EXPLORATION_FINDS) {
  if (!find?.id) continue;
  registerModuleVariants(`campus.find.${find.id}`, [
    {
      when: { weekMin: 20 },
      weight: 6,
      priority: 5,
      text: [FIND_LATE],
    },
    {
      when: { weekMin: 14 },
      weight: 4,
      priority: 3,
      text: [FIND_LATE],
    },
  ]);
}

registerModuleVariants('campus.sighting', [
  {
    when: { weekMin: 20 },
    weight: 5,
    priority: 5,
    text: [SIGHTING_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 3,
    priority: 3,
    text: [SIGHTING_LATE],
  },
]);

const TRAVEL_LATE = '{campus.explore.lateFrame|prefix:} {campusEvent.scene.hallTone|prefix: }';

registerModuleVariants('campus.travel', [
  {
    when: { weekMin: 20 },
    weight: 5,
    priority: 5,
    text: [TRAVEL_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 3,
    priority: 3,
    text: [TRAVEL_LATE],
  },
  {
    when: { campusFattening: true, weekMin: 10 },
    weight: 2,
    priority: 4,
    text: [
      'Campus softening — paths smell like dessert and nobody pretends otherwise.',
      '{campus.explore.lateFrame|prefix:} Fried sugar rides every breeze; the quad feels complicit.',
    ],
  },
]);
