// Ranked feedee session — composable Rae delivery beats.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { SESSION_PAYOFF_TEXT } from '../../../gameData/rankedSessionData.js';

registerPool('session.scene.deliveryAir', [
  {
    when: {},
    weight: 2,
    text: [
      'The cart squeaks down the hall — covered trays, measured portions, unspoken permission.',
      'Rae arrives like a deadline: warm food, tighter waistbands, no lecture.',
      'Steam leaks from the lids; the session clock starts when she sets the first plate down.',
      'Late-semester trays arrive heavier — lids bow, portions honest, shame locked outside the door.',
      'Hall Ambiance follows the cart; residents peek out like the hallway itself is hungry.',
    ],
  },
]);

registerPool('session.scene.raePresence', [
  {
    when: {},
    weight: 2,
    text: [
      'Clipboard, timer, scale — she watches the numbers more than your face, affection and competition in one glance.',
      'Her voice stays clinical until the numbers climb; Rae arrives tender when the session clock wins.',
      'Clipboard, timer, second helping — she runs the room like a coach who wants you bigger.',
      'She times bites like intervals; affection shows when the scale finally agrees with her.',
      'Wellness framing stays on the clipboard; appetite stays in your lap, warm and winning.',
    ],
  },
]);

const SESSION_SKELETON = '{session.scene.deliveryAir|prefix:} {session.scene.raePresence|prefix: }';

for (let si = 0; si <= 5; si += 1) {
  for (const beat of ['arrival', 'exit', 'extra']) {
    registerModuleVariants(`session.rae.${beat}.s${si}`, [
      {
        when: { weekMin: 16 },
        weight: 4,
        priority: 3,
        text: [SESSION_SKELETON],
      },
      {
        when: { weekMin: 5 },
        weight: 3,
        priority: 2,
        text: [SESSION_SKELETON],
      },
    ]);
  }
}

registerModuleVariants('session.rae.arrival.s3', [
  {
    when: { sessionStage: [3] },
    weight: 1,
    text: [
      'Rae drops in with backup calories like patch notes — Destiny grins, queue unpaused, belly unmuted.',
    ],
  },
]);

for (let si = 0; si < SESSION_PAYOFF_TEXT.length; si += 1) {
  registerModuleVariants(`session.payoff.legacy.s${si}`, [
    {
      when: { weekMin: 12 },
      weight: 3,
      priority: 2,
      text: [SESSION_SKELETON],
    },
  ]);
}

registerModuleVariants('session.payoff.legacy.s2', [
  {
    when: { sessionStage: [2] },
    weight: 1,
    text: [
      (ctx) => {
        const g = Math.round(ctx.globals?.sessionGain ?? 0);
        return `Session closes at +${g} lbs — Rae’s route memorized, Destiny’s focus fraying into appetite.`;
      },
    ],
  },
]);

registerModuleVariants('session.payoff.legacy.s4', [
  {
    when: { weekMin: [24] },
    weight: 1,
    text: [
      (ctx) => {
        const gain = Math.round(ctx.globals?.sessionGain ?? 0);
        const reason = ctx.globals?.sessionEndReason ?? 'focus_out';
        const stop = reason === 'food_coma' ? 'Food coma.' : 'Focus out.';
        return `${stop} ${gain} lbs. Grandmaster rank, desk clear, Rae already planning the next delivery before you finish the victory screen.`;
      },
    ],
  },
]);

registerModuleVariants('session.rae.exit.s2', [
  {
    when: { sessionStage: [2] },
    weight: 1,
    text: [
      'Rae ducks out mid-queue — “good luck” sounds like she already knows Destiny will tap out full.',
    ],
  },
]);
