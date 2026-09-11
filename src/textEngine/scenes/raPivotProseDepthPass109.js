// Weekly / opposition / memory vignettes (Pass 109) — homeroom/evolved bridges retired.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('weekly.thesis_rewrite', [
  {
    when: { archetype: ['bookworm'] },
    weight: 1,
    text: [
      'Hall log pivots — footnotes swell with appetite and nobody marks it down.',
    ],
  },
  {
    when: { archetype: ['swimmer'] },
    weight: 1,
    text: [
      'Season plan rewrites around recovery meals — laps yield to longer tables.',
    ],
  },
]);

registerModuleVariants('weekly.team_weigh_in', [
  {
    when: { archetype: ['athlete'] },
    weight: 1,
    text: [
      'Weigh-in becomes spectacle — teammates cheer numbers that would have scared them last year.',
    ],
  },
]);

registerModuleVariants('opposition.hearing.removal.result.testify', [
  {
    when: { endStageMin: [5] },
    weight: 1,
    text: [
      'Her testimony lands soft and certain — the Board hears devotion before policy.',
    ],
  },
]);

registerModuleVariants('memory.self', [
  {
    when: { memScope: ['longArc'], memType: ['stuffed'] },
    weight: 1,
    text: [
      'That stuffed night still echoes — she reaches for seconds before she reaches for excuses.',
    ],
  },
]);
