// Modular wife-lesson + homeroom depth (Pass 142).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('wl.lesson.mjDoctrine', [
  {
    when: { weekMin: [12] },
    weight: 2,
    text: [
      '"The hall taught me appetite is hospitality," Mary Jane says, ladling without measuring.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Kayla.intro', [
  {
    when: { weekMin: [10] },
    weight: 1,
    text: [
      'Kayla meets your eyes at the conference table — hips wider, suspicion softer, appetite harder to hide.',
    ],
  },
]);
