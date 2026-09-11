// CG measurement + evolved depth (Pass 95).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('cg.measurement.session', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.globals?.targetName || ctx.subject?.name || 'She';
        return `Tape whispers around ${n} — Priya records every inch like scripture.`;
      },
    ],
  },
]);

registerModuleVariants('cg.scene.selfReview.Fat.Driven', [
  {
    when: {},
    weight: 1,
    text: [
      'Mirror, tape, appetite — Priya logs gains the way others log grades.',
    ],
  },
]);

registerModuleVariants('evolved.event.wife_lessons.s0.end1', [
  {
    when: {},
    weight: 1,
    text: [
      'First bake night ends sticky — Darlene asks for recipes; MJ already plans next week.',
    ],
  },
]);

registerModuleVariants('evolved.activity.eating_streamer', [
  {
    when: {},
    weight: 1,
    text: [
      'Chat scrolls while she chews — every bite is content, every burp a milestone.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.choice2', [
  {
    when: {},
    weight: 1,
    text: [
      'Crowd presses close — fair grease and pride share the same sticky napkin.',
    ],
  },
]);

registerModuleVariants('homeroom.conference.Mrs_Monroe.intro', [
  {
    when: {},
    weight: 1,
    text: [
      'Mrs. Monroe arrives early, claims the good chair — conference is snack diplomacy.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.logistics', [
  {
    when: {},
    weight: 1,
    text: [
      'Schedules loosen — the hall runs on appetite o’clock now.',
    ],
  },
]);
