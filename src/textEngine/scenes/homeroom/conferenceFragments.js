// Hall kitchen queen conferences — composable intro slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { HOMEROOM_CONFERENCE_EVENTS } from '../../../gameData/homeroomEvents.js';

registerPool('homeroom.scene.floorTone', [
  {
    when: {},
    weight: 2,
    text: [
      'The lounge smells like butter and suspicion in equal measure.',
      'Residents linger near the kitchen — hungry, watchful, already complicit.',
      'Floor check-in energy turns soft when food is involved.',
    ],
  },
]);

registerPool('homeroom.scene.raStance', [
  {
    when: {},
    text: [
      'You keep your voice neutral; the wellness framing does the real work.',
      'Your clipboard stays closed — this conversation is appetite first, paperwork later.',
      'You nod along to hunger — the hall program runs on seconds, not slogans.',
    ],
  },
]);

const INTRO_SKELETON = '{homeroom.scene.floorTone|prefix:} {homeroom.scene.raStance|prefix: }';

for (const [key, ev] of Object.entries(HOMEROOM_CONFERENCE_EVENTS)) {
  registerModuleVariants(`homeroom.conference.${key}.intro`, [
    {
      when: { weekMin: 16 },
      weight: 3,
      priority: 3,
      text: [INTRO_SKELETON],
    },
    {
      when: { weekMin: 6 },
      weight: 2,
      priority: 2,
      text: [INTRO_SKELETON],
    },
  ]);
  for (const ch of ev.choices || []) {
    if (!ch?.id) continue;
    registerModuleVariants(`homeroom.conference.${key}.${ch.id}`, [
      {
        when: { weekMin: 14 },
        weight: 3,
        priority: 3,
        text: [INTRO_SKELETON],
      },
      {
        when: { weekMin: 7 },
        weight: 2,
        priority: 2,
        text: [INTRO_SKELETON],
      },
    ]);
  }
}
