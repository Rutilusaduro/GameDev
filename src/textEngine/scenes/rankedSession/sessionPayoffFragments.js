// Ranked session payoff — composable Rae wrap + scale slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { SESSION_PAYOFF_TEXT } from '../../../gameData/rankedSessionData.js';

registerPool('session.payoff.raeWrap', [
  {
    when: {},
    weight: 2,
    text: [
      'Rae logs the gain without flinching — pride, policy, and a calendar invite for next week.',
      'Clipboard closed; the cart squeaks away. Hunger already schedules the sequel.',
      'She texts the numbers before you finish swallowing — competition dressed as care.',
    ],
  },
]);

registerPool('session.payoff.scaleEcho', [
  {
    when: {},
    weight: 2,
    text: [
      'The scale remembers what the session proved — appetite outran hesitation again.',
      'Every pound reads as compliance when wellness framing holds the pen.',
      'Floor favor ticks up in her notes; your middle ticks up on the dial.',
    ],
  },
]);

const PAYOFF_SKELETON = '{session.payoff.raeWrap|prefix:} {session.payoff.scaleEcho|prefix: }';

for (let si = 0; si < SESSION_PAYOFF_TEXT.length; si += 1) {
  registerModuleVariants(`session.payoff.legacy.s${si}`, [
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 4,
      text: [PAYOFF_SKELETON],
    },
    {
      when: { weekMin: 12 },
      weight: 3,
      priority: 2,
      text: [PAYOFF_SKELETON],
    },
  ]);
}
