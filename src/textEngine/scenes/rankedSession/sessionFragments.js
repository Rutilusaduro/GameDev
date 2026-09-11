// Ranked feedee session — composable Rae delivery beats.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('session.scene.deliveryAir', [
  {
    when: {},
    weight: 2,
    text: [
      'The cart squeaks down the hall — covered trays, measured portions, unspoken permission.',
      'Rae arrives like a deadline: warm food, tighter waistbands, no lecture.',
      'Steam leaks from the lids; the session clock starts when she sets the first plate down.',
    ],
  },
]);

registerPool('session.scene.raePresence', [
  {
    when: {},
    weight: 2,
    text: [
      'She watches the scale more than your face — affection and competition in one glance.',
      'Her voice stays clinical until the numbers climb; then it turns almost tender.',
      'Clipboard, timer, second helping — she runs the room like a coach who wants you bigger.',
    ],
  },
]);

const SESSION_SKELETON = '{session.scene.deliveryAir|prefix:} {session.scene.raePresence|prefix: }';

for (let si = 0; si <= 5; si += 1) {
  registerModuleVariants(`session.rae.arrival.s${si}`, [
    {
      when: { weekMin: 5 },
      weight: 3,
      priority: 2,
      text: [SESSION_SKELETON],
    },
  ]);
}
