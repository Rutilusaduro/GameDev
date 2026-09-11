// Feed reaction depth — extends modular feed loop (Pass 59).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('feed.react.beat', [{ when: { hungerTierMin: 2 }, weight: 2, text: [
  'She eats like the hunger got here first — fast at the start, then slower, savoring the catch-up.',
  'Every bite lands where the ache was; she breathes out and keeps reaching.',
] }]);

registerModuleVariants('feed.react.line', [{ when: { stageMin: 3, corruption: [1, 2] }, weight: 2, text: [
  `{subject.name} licks sweetness from her thumb and does not pretend she is finished.`,
  `{subject.name} meets your eyes, cheeks warm. "I could do another round." She means it.`,
] }]);
