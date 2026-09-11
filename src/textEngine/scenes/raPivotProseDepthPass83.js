// Homeroom activities + CG RA chat depth (Pass 83).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('homeroom.activity.parent_meeting.p0.recipes', [
  {
    when: {},
    weight: 1,
    text: [
      'Cardamom rises off the page — Mrs. Calloway pretends surprise, but her hand is already reaching.',
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p0.personal', [
  {
    when: {},
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'Daisy';
        return `${n} closes the notebook on numbers that belong to her, not the campus office — privacy served warm.`;
      },
    ],
  },
]);

registerModuleVariants('homeroom.activity.health_unit.p1.weigh_moms', [
  {
    when: {},
    weight: 1,
    text: [
      'Three mothers on the scale — laughter, denial, and a line in the apron notebook that will outlive the wellness file.',
    ],
  },
]);

registerModuleVariants('homeroom.v2.depth', [
  {
    when: {},
    weight: 1,
    text: [
      'The kitchen queen smiles like policy — abundance is the lesson plan.',
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} feeds tradition until suspicion forgets what it came to measure.`;
      },
    ],
  },
]);

registerModuleVariants('cg.raReply.encourage', [
  {
    when: { cgRaHasComparison: ['yes'] },
    weight: 1,
    text: [
      (ctx) => {
        const p = ctx.globals?.priyaName || 'Priya';
        return `${p} reads your message and eats while she types — multitasking as dominance.`;
      },
    ],
  },
]);
