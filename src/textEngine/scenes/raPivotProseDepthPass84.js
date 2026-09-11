// Homeroom conference + CG chat depth (Pass 84).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.conference.Kayla.tuesday', [
  {
    when: {},
    weight: 1,
    text: [
      'Cinnamon rolls ranked like strategy — Kayla has already won the argument before Daisy opens the notebook.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.taste_now', [
  {
    when: {},
    weight: 1,
    text: [
      'Agenda dies in the container — Mrs. Monroe eats like the meeting was always just foreplay for dessert.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaPost.Heavy.Driven', [
  {
    when: {},
    weight: 1,
    text: [
      'The thread updates before anyone finishes chewing — Priya posts numbers like dare cards.',
    ],
  },
]);

registerModuleVariants('cg.chat.priyaFollowup.threatened.Frenzied', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        return `${p} schedules a binge before she finishes typing — threats get calories, not apologies.`;
      },
    ],
  },
]);

registerModuleVariants('wifeLessons.talk.Darlene.s1.greeting', [
  {
    when: {},
    weight: 1,
    text: [
      '"We drove over hungry" — Darlene says it like confession and invitation in one breath.',
    ],
  },
]);
