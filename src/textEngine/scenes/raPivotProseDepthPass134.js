// Session + evolved activity depth (Pass 134).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('evolved.activity.eating_streamer', [
  {
    when: { evolvedStageIdx: [2] },
    weight: 1,
    text: [
      (ctx) => {
        const n = ctx.subject?.name || 'She';
        return `${n} streams with bib centered — chat donates calories like ranked queue tips.`;
      },
    ],
  },
]);

registerModuleVariants('session.payoff.legacy.s2', [
  {
    when: { sessionStage: [2] },
    weight: 1,
    text: [
      (ctx) => {
        const g = Math.round(ctx.globals?.sessionGain ?? 0);
        return `Session closes at +${g} lbs — Rae’s route memorized, Destiny’s focus fraying into appetite.`;
      },
    ],
  },
]);

registerModuleVariants('roster.unlock.s1', [
  {
    when: { studentId: [1] },
    weight: 1,
    text: [
      'Cassidy’s unlock scene lands like a lane change — trust opens, portions follow.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.summary', [
  {
    when: { ambianceTier: ['mid'] },
    weight: 1,
    text: [
      'Ambiance mid-tier now — residents linger in corridors like the blueprint predicted.',
    ],
  },
]);
