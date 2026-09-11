// Eating contest — composable crowd + scale slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { CONTEST_PAYOFF_TEXT } from '../../../gameData/miniGames.js';

registerPool('contest.scene.crowdHeat', [
  {
    when: {},
    weight: 2,
    text: [
      'The crowd leans in — appetite as sport, sport as foreplay.',
      'Plates keep coming; the scale keeps score; nobody pretends this is casual.',
      'Cheering turns hungry; competition turns communal.',
    ],
  },
]);

registerPool('contest.scene.tableStakes', [
  {
    when: {},
    weight: 2,
    text: [
      'Every bite is public; every swallow is a dare answered.',
      'The table groans under portions; your middle answers in kind.',
      'Winning here means growing in front of witnesses — and liking it.',
    ],
  },
]);

const CONTEST_SKELETON = '{contest.scene.crowdHeat|prefix:} {contest.scene.tableStakes|prefix: }';

for (let si = 0; si < CONTEST_PAYOFF_TEXT.length; si += 1) {
  registerModuleVariants(`contest.payoff.legacy.s${si}`, [
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 4,
      text: [CONTEST_SKELETON],
    },
    {
      when: { weekMin: 10 },
      weight: 3,
      priority: 2,
      text: [CONTEST_SKELETON],
    },
  ]);
}
