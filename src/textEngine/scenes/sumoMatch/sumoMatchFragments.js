// Sumo match — composable dohyo + belt strain slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { SUMO_PAYOFF_TEXT } from '../../../gameData/miniGames.js';

registerPool('sumo.scene.dohyo', [
  {
    when: {},
    weight: 2,
    text: [
      'The dohyo holds your weight — veteran and challenger, hunger and pride.',
      'Tachi-ai breath; belt strain; the crowd knows what this is really about.',
      'Center ring, heavy bodies, heavier appetites waiting for the corner feed.',
    ],
  },
]);

registerPool('sumo.scene.boutHeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Impact lands soft then spreads — mass against mass, neither side apologizing.',
      'The exchange leaves you breathless and hungrier than when you started.',
      'Win or lose, the body remembers every shove as permission to grow.',
    ],
  },
]);

const SUMO_SKELETON = '{sumo.scene.dohyo|prefix:} {sumo.scene.boutHeat|prefix: }';

for (let si = 0; si < SUMO_PAYOFF_TEXT.length; si += 1) {
  registerModuleVariants(`sumo.payoff.legacy.s${si}`, [
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 4,
      text: [SUMO_SKELETON],
    },
    {
      when: { weekMin: 10 },
      weight: 3,
      priority: 2,
      text: [SUMO_SKELETON],
    },
  ]);
}

registerModuleVariants('sumo.opening.compose', [
  {
    when: { weekMin: 12 },
    weight: 3,
    priority: 2,
    text: [SUMO_SKELETON],
  },
]);
