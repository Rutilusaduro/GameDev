// CG corkboard / binge / review / reaction — composable competition slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_BINGE_SCENES,
  CG_FILLED_SELF_REVIEW,
  CG_FILLED_MEASUREMENT_REACTIONS,
} from '../../../gameData/competitiveGainerText.js';

registerPool('cg.scene.dataObsession', [
  {
    when: {},
    weight: 2,
    text: [
      'Priya treats the corkboard like scripture — numbers, photos, deadlines.',
      'Every measurement is a dare; every column is a throat she wants to win by.',
      'Ink and appetite share the same calendar on her wall.',
      'Late-semester numbers dominate the margins; nobody pretends this is casual.',
      'She color-codes threats in red — appetite as policy, competition as care.',
      'Flour dust and warm sugar drift from downstairs; the corkboard still wins her attention.',
      'Residents orbit the board before mail call — spreadsheet pride dressed as floor culture.',
    ],
  },
]);

registerPool('cg.scene.competitionHeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Residents orbit the board — envy, hunger, and spreadsheet pride.',
      'The floor learns competition the way it learns seconds: collectively.',
      'Someone always threatens a binge tonight; someone else already started.',
      'Replies stack up under Priya\'s post — weekly numbers as foreplay.',
      'The corkboard squeaks when she pins another photo; the hall listens.',
    ],
  },
]);

const SCENE_SKELETON = '{cg.scene.dataObsession|prefix:} {cg.scene.competitionHeat|prefix: }';

for (const tier of Object.keys(CG_FILLED_CORKBOARD_SCENES)) {
  registerModuleVariants(`cg.scene.corkboard.${tier}`, [
    {
      when: { weekMin: 20 },
      weight: 6,
      priority: 5,
      text: [SCENE_SKELETON],
    },
    {
      when: { weekMin: 10 },
      weight: 3,
      priority: 2,
      text: [SCENE_SKELETON],
    },
  ]);
}

for (const stageKey of Object.keys(CG_FILLED_BINGE_SCENES)) {
  const tierMap = CG_FILLED_BINGE_SCENES[stageKey] || {};
  for (const tier of Object.keys(tierMap)) {
    registerModuleVariants(`cg.scene.binge.${stageKey}.${tier}`, [
      {
        when: { weekMin: 20 },
        weight: 6,
        priority: 5,
        text: [SCENE_SKELETON],
      },
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [SCENE_SKELETON],
      },
    ]);
  }
}

for (const stageKey of Object.keys(CG_FILLED_SELF_REVIEW)) {
  const tierMap = CG_FILLED_SELF_REVIEW[stageKey] || {};
  for (const tier of Object.keys(tierMap)) {
    registerModuleVariants(`cg.scene.selfReview.${stageKey}.${tier}`, [
      {
        when: { weekMin: 20 },
        weight: 6,
        priority: 5,
        text: [SCENE_SKELETON],
      },
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [SCENE_SKELETON],
      },
    ]);
  }
}

for (const rel of Object.keys(CG_FILLED_MEASUREMENT_REACTIONS)) {
  const tierMap = CG_FILLED_MEASUREMENT_REACTIONS[rel] || {};
  for (const tier of Object.keys(tierMap)) {
    const catMap = tierMap[tier] || {};
    for (const cat of Object.keys(catMap)) {
      registerModuleVariants(`cg.scene.reaction.${rel}.${tier}.${cat}`, [
        {
          when: { weekMin: 20 },
          weight: 5,
          priority: 5,
          text: [SCENE_SKELETON],
        },
        {
          when: { weekMin: 8 },
          weight: 2,
          priority: 2,
          text: [SCENE_SKELETON],
        },
      ]);
    }
  }
}
