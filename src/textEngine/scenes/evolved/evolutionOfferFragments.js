// Evolution path offers — composable hall + transformation slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { EVOLUTION_OFFER } from '../../../gameData/evolutionUiData.js';

registerPool('evolution.offer.hallTone', [
  {
    when: {},
    weight: 2,
    text: [
      'The hall feels ready for a new shape — appetite, ambition, and a resident who said yes.',
      'Floor favor and private coaching braid together; evolution starts as permission.',
      'Someone is about to outgrow their old self on purpose — the lounge can feel it.',
      'Blueprint ink and roster pins agree: the floor is ready for a named transformation.',
    ],
  },
]);

registerPool('evolution.offer.transformation', [
  {
    when: {},
    weight: 2,
    text: [
      'Her body will learn a new hunger; your log will learn a new vocabulary.',
      'The offer is tender and absolute — grow into the path, not around it.',
      'She nods before the words finish; the scale already knows what comes next.',
    ],
  },
]);

const OFFER_SKELETON = '{evolution.offer.hallTone|prefix:} {evolution.offer.transformation|prefix: }';

for (const archetype of Object.keys(EVOLUTION_OFFER)) {
  registerModuleVariants(`evolution.offer.${archetype}.intro`, [
    {
      when: { weekMin: 16 },
      weight: 4,
      priority: 4,
      text: [OFFER_SKELETON],
    },
    {
      when: { weekMin: 8 },
      weight: 3,
      priority: 2,
      text: [OFFER_SKELETON],
    },
  ]);
}

registerModuleVariants('evolution.offer.cheerleader.intro', [
  {
    when: { archetype: ['cheerleader'] },
    weight: 1,
    text: [
      'She still wears the sash — the squad’s future and her belly finally share a language.',
    ],
  },
]);

registerModuleVariants('evolution.offer.gamer.intro', [
  {
    when: { archetype: ['gamer'] },
    weight: 1,
    text: [
      'Controller still warm — she wants ranked sessions and ranked appetite in the same build.',
    ],
  },
]);

registerModuleVariants('evolution.offer.bookworm.intro', [
  {
    when: { archetype: ['bookworm'] },
    weight: 1,
    text: [
      'The season plan waits on your signature — her appetite is already hall-log approved.',
    ],
  },
]);

registerModuleVariants('evolution.offer.swimmer.intro', [
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Lane discipline cracks — she wants a path where appetite keeps pace with medals.',
    ],
  },
]);
