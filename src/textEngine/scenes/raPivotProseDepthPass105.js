// Homeroom + fair + campus + CG (Pass 105).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Bri.brought_something', [
  {
    when: {},
    weight: 1,
    text: [
      'Bri opens the drawer like ritual — container always there, appetite always practical.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  {
    when: {},
    weight: 1,
    text: [
      'Refreshments before agenda — Mrs. Calloway eats three pieces before item one.',
    ],
  },
]);

registerModuleVariants('fair.photo.Brittany', [
  {
    when: { mjStageBucket: ['heavy'] },
    weight: 1,
    text: [
      'Trophy vignette: Brittany’s competitive grin beside MJ’s widening stats.',
    ],
  },
]);

registerModuleVariants('campus.travel', [
  {
    when: { campusFattening: true },
    weight: 1,
    text: [
      'Campus softening — paths smell like dessert and nobody pretends otherwise.',
    ],
  },
]);

registerModuleVariants('cg.scene.binge.Enormous.Ruthless', [
  {
    when: {},
    weight: 1,
    text: [
      'Ruthless binge — containers empty, corkboard already updated in her head.',
    ],
  },
]);

registerModuleVariants('weekly.chair_breaks', [
  {
    when: {},
    weight: 1,
    text: [
      'The chair gives — the room laughs before pity can arrive.',
    ],
  },
]);

registerModuleVariants('weekly.thesis_rewrite', [
  {
    when: {},
    weight: 1,
    text: [
      'Hall log pivot — footnotes swell with appetite, argument follows belly.',
    ],
  },
]);
