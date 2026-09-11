// Cultivator recipe beats — composable lab + appetite slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { RECIPES } from '../../../gameData/cultivator.js';

registerPool('cultivator.scene.labAir', [
  {
    when: {},
    weight: 2,
    text: [
      'Flour dust and warm sugar — Reneé\'s apartment smells like controlled appetite.',
      'The kitchen runs like a lab where hunger is the only peer-reviewed result.',
      'Timers, trays, and the soft sound of someone eating on schedule.',
      'Late-semester recipe nights: scales, bowls, and appetite logged like data worth keeping.',
      'Hall Ambiance fades at her door; inside, every batch tastes like permission.',
    ],
  },
]);

registerPool('cultivator.scene.testerYield', [
  {
    when: {},
    weight: 2,
    text: [
      'The tester eats because the recipe demands it — curiosity optional, compliance delicious.',
      'Every bite is data; every sigh is a field note Reneé will use later.',
      'Yield shows on the scale and in the empty bowl — both metrics satisfied.',
      'She cooperates beautifully when praised — growth as lifestyle, measured in clean plates.',
      'Wellness framing stays thin; the portions stay thick and unmistakably on purpose.',
    ],
  },
]);

const CULT_SKELETON = '{cultivator.scene.labAir|prefix:} {cultivator.scene.testerYield|prefix: }';

registerModuleVariants('cultivator.beat', [
  {
    when: { weekMin: 20 },
    weight: 5,
    priority: 5,
    text: [CULT_SKELETON],
  },
  {
    when: { weekMin: 8 },
    weight: 3,
    priority: 2,
    text: [CULT_SKELETON],
  },
]);

registerModuleVariants('cultivator.reaction', [
  {
    when: { weekMin: 10 },
    weight: 2,
    priority: 2,
    text: [CULT_SKELETON],
  },
]);

for (const recipeId of Object.keys(RECIPES)) {
  registerModuleVariants(`cultivator.intro.${recipeId}`, [
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [CULT_SKELETON],
    },
  ]);
}
