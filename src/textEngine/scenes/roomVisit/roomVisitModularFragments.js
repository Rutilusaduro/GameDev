// Room visit — dimensional ambient overlays (peeled from pass 60).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('room.visit.ambient', [
  {
    when: { stageMin: 4 },
    weight: 2,
    text: [
      'The room smells like snacks and fabric softener — appetite made domestic.',
      'Her space has learned her shape: wider chair clearance, fuller snack drawer, softer light.',
    ],
  },
]);

registerModuleVariants('room.visit.stage.beat', [
  {
    when: { corruption: [1, 2] },
    weight: 2,
    text: [
      'She talks while eating, unselfconscious now — hunger part of the visit, not a secret.',
      'Every visit ends warmer than it started; the floor teaches appetite by repetition.',
    ],
  },
]);
