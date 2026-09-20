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
      'Late-semester contests feel ceremonial — every public pound a ribbon category.',
      'Phones rise for B-roll; growth as lifestyle, appetite dressed as celebration.',
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
      'Fabric strains when you lean forward; the crowd cheers like appetite is county entertainment.',
      'Wellness framing stays off the mic; portions stay honest and unmistakably generous.',
    ],
  },
]);

const CONTEST_SKELETON = '{contest.scene.crowdHeat|prefix:} {contest.scene.tableStakes|prefix: }';

for (let si = 0; si < CONTEST_PAYOFF_TEXT.length; si += 1) {
  registerModuleVariants(`contest.payoff.legacy.s${si}`, [
    {
      when: { weekMin: 22 },
      weight: 6,
      priority: 6,
      text: [CONTEST_SKELETON],
    },
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
