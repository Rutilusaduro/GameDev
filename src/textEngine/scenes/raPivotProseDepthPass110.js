// Homeroom activities + fair + CG + transfer weekly (Pass 110).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  {
    when: {},
    weight: 1,
    text: [
      'Refreshments land before minutes — mothers eat through the agenda cover sheet.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p0.official', [
  {
    when: {},
    weight: 1,
    text: [
      'Wellness file numbers climb — Daisy reads each aloud like a proud inventory.',
    ],
  },
]);

registerModuleVariants('fair.photo.Brittany', [
  {
    when: { mjStageBucket: ['plump', 'heavy'] },
    weight: 1,
    text: [
      'Trophy photo — Brittany’s grin beside MJ’s widening stats, both of them already celebrating.',
    ],
  },
]);

registerModuleVariants('fair.boost.Renee', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 1,
    text: [
      'Renee rides the boost — hall pride and appetite share the same scoreboard.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.leading.High', [
  {
    when: { cgDriveTier: ['High'] },
    weight: 1,
    text: [
      'Priya posts the leaderboard — numbers glow and the chat treats appetite like a sport.',
    ],
  },
]);

registerModuleVariants('weekly.transfer_settled', [
  {
    when: { archetype: ['transfer'] },
    weight: 1,
    text: [
      'She stops calling it temporary — boxes stay unpacked and the kitchen knows her order.',
    ],
  },
]);

registerModuleVariants('evolved.event.salon_appetit.s0.p0', [
  {
    when: { evolvedStageIdx: [0] },
    weight: 1,
    text: [
      'Salon doors open on steam — appetite introduced as curriculum.',
    ],
  },
]);

registerModuleVariants('memory.hall', [
  {
    when: { memType: ['scaleBreak'] },
    weight: 1,
    text: [
      'The hall still whispers about {memName} and the scale that quit first.',
    ],
  },
]);
