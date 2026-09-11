// Homeroom conference matrix + fair boost depth (Pass 87).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

registerModuleVariants('homeroom.conference.Bri.brought_something', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Bri opens the drawer like a vending machine that only sells permission — efficient, full, inevitable.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Calloway.curriculum_frame', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Wellness slides until arms uncross — Mrs. Calloway hears happiness before she hears policy.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Kayla.intro', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Daisy';
        return `Kayla sits like she owns the desk already — ${n} knows Tuesday is the real agenda.`;
      },
    ],
  },
]);

registerModuleVariants('fair.boost.Kylie', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Camera flash, fair grease, pride spike — Kylie turns training into content before MJ swallows.',
    ],
  },
]);

registerModuleVariants('fair.photo.Daisy', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Gold tack bends; photo curls — Daisy’s smile says the kitchen won again.',
    ],
  },
]);
