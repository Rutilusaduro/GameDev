// Hall + session + WL tails (Pass 132).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('hall.room.blurb', [
  {
    when: { hallRoomId: ['kitchen_pantry'] },
    weight: 1,
    text: [
      (ctx) => {
        const label = ctx.globals?.ambianceLabel || 'Pantry';
        return `${label} wing hums — stock rotation written in butter and permission.`;
      },
    ],
  },
]);

registerModuleVariants('session.immobile.s0.blob', [
  {
    when: { studentId: [0] },
    weight: 1,
    text: [
      'Brittany’s redirect is blunt — dinner travels to her; the hall learns immobility is still hospitality.',
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Emma.s6.greeting', [
  {
    when: { weekMin: [8] },
    weight: 1,
    text: [
      'Emma greets the kitchen like a daughter who finally stopped apologizing for seconds.',
    ],
  },
]);

registerModuleVariants('cultivator.beat', [
  {
    when: { weekMin: [6] },
    weight: 1,
    text: [
      'Tester bellies swell on schedule — the cult treats appetite like liturgy, not sin.',
    ],
  },
]);
