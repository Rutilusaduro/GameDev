// Session Rae + weekly fragments + blueprint room labels (Pass 107).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.rae.arrival.s4', [
  {
    when: { mjStageBucket: ['heavy', 'veryFat'] },
    weight: 1,
    text: [
      'Rae rolls in with industrial portions — her grin says this delivery was always inevitable.',
    ],
  },
]);

registerModuleVariants('session.rae.extra.s5', [
  {
    when: {},
    weight: 1,
    text: [
      'Backup crates appear like she predicted the first course would lose.',
    ],
  },
]);

registerModuleVariants('session.payoff.legacy.s5', [
  {
    when: { sessionStage: [5] },
    weight: 2,
    text: [
      (ctx) => {
        const g = Math.round(ctx.globals?.sessionGain ?? 0);
        if (g < 12) return '';
        return 'The tally lands heavy — Rae whistles approval and schedules the encore before you ask.';
      },
    ],
  },
]);

registerModuleVariants('weekly.intervention_fails', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Intervention night collapses into potluck — concern surrenders to casseroles.',
    ],
  },
]);

registerModuleVariants('weekly.gaming_sponsor', [
  {
    when: { archetype: ['gamer'] },
    weight: 1,
    text: [
      'Sponsor wants “authentic appetite” — chat donations spike when she stops pretending.',
    ],
  },
]);

registerModuleVariants('weekly.quiet_opens_up', [
  {
    when: { archetype: ['quiet'] },
    weight: 1,
    text: [
      'She speaks once, softly — the room leans in like volume was never the point.',
    ],
  },
]);

registerModuleVariants('hall.blueprint.upgrade.confirm', [
  {
    when: { hallRoomId: ['kitchen_pantry'] },
    weight: 1,
    text: [
      'Kitchen upgrade seals — steam and spice claim the whole wing by morning.',
    ],
  },
  {
    when: { hallRoomId: ['common_lounge'] },
    weight: 1,
    text: [
      'Lounge deepens — cushions swallow noise; residents linger past curfew without guilt.',
    ],
  },
]);

registerModuleVariants('intimacy.depth', [
  {
    when: { endStageMin: [6] },
    weight: 1,
    text: [
      'Weight becomes weather between you — warm, constant, impossible to ignore.',
    ],
  },
]);
