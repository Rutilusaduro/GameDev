// Legacy bridge cap reinforcement — late fair + WL slot priority (Pass 158).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.day.carnivalAir', [
  {
    when: { weekMin: 22 },
    weight: 2,
    priority: 3,
    text: [
      'Late-semester carnival air smells like funnel cake and policy — the fair queen season never really ends.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.aroma', [
  {
    when: { weekMin: 20 },
    weight: 1,
    text: [
      'Yeasty warmth and butter suspicion — the lesson kitchen knows your roster by appetite now.',
    ],
  },
]);
