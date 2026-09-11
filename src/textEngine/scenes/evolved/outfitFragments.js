// Evolved outfit flavor — composable fabric + fit slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLVED_OUTFITS } from '../../../gameData/evolvedReactionsOutfits.js';

registerPool('evolved.outfit.fabricStrain', [
  {
    when: {},
    weight: 2,
    text: [
      'Seams whisper; fabric chooses honesty over modesty.',
      'Stretch panels surrender with a soft, satisfied creak.',
      'Buttons hold on out of habit, not hope.',
    ],
  },
]);

registerPool('evolved.outfit.pride', [
  {
    when: {},
    weight: 2,
    text: [
      'She wears the strain like jewelry — proof the path is working.',
      'The outfit was bought for who she was; it fits who she is becoming.',
      'Every tug at the waistband reads as progress, not problem.',
    ],
  },
]);

const OUTFIT_SKELETON = '{evolved.outfit.fabricStrain|prefix:} {evolved.outfit.pride|prefix: }';

for (const [formId, lines] of Object.entries(EVOLVED_OUTFITS)) {
  if (!Array.isArray(lines)) continue;
  lines.forEach((_, idx) => {
    registerModuleVariants(`evolved.outfit.${formId}.s${idx}`, [
      {
        when: { weekMin: 14 },
        weight: 4,
        priority: 3,
        text: [OUTFIT_SKELETON],
      },
      {
        when: { weekMin: 6 },
        weight: 3,
        priority: 2,
        text: [OUTFIT_SKELETON],
      },
    ]);
  });
}

registerModuleVariants('evolved.outfit.sumo.s3', [
  {
    when: { evolvedForm: ['sumo'] },
    weight: 1,
    text: [
      'Championship regalia strains at the seams — the ring already knows her number.',
    ],
  },
]);

registerModuleVariants('evolved.outfit.eating_competitor.s4', [
  {
    when: { evolvedForm: ['eating_competitor'] },
    weight: 1,
    text: [
      'Sponsor gear head to toe — logos stretch where appetite won.',
    ],
  },
]);
