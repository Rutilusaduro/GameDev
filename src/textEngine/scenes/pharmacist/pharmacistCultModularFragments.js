// Pharmacist cult distribution — composable devotion + supply beats.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('pharmacist.cult.circleDevotion', [
  {
    when: {},
    weight: 2,
    text: [
      'The circle kneels for labels, not sermons — devotion measured in empty tubs.',
      'Wellness rhetoric dissolves into portion towers; compliance tastes like cinnamon.',
      'Sophia counts believers by appetite — every dose another quiet conversion.',
      'Late-semester distribution feels ceremonial: trays, whispers, wider hips.',
      'Hall Ambiance cannot enter the ritual room; hunger does the preaching instead.',
    ],
  },
]);

registerModuleVariants('pharmacist.cult.distribution.flavor', [
  {
    when: { cultDevotionMin: [50], weekMin: 16 },
    weight: 5,
    priority: 5,
    text: ['{pharmacist.cult.circleDevotion|prefix:} {evolved.pharmacist.v2.depth|prefix: }'],
  },
  {
    when: { cultDevotionMin: [30], weekMin: 10 },
    weight: 3,
    priority: 3,
    text: ['{pharmacist.cult.circleDevotion|prefix:}'],
  },
]);
