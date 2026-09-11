// Weekly + opposition + evolved activity tails (Pass 109).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';

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

registerModuleVariants('homeroom.conference.Sofia.portfolio', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Sofia spreads sketches — every figure thicker, every line more honest than the last portfolio.',
    ],
  },
]);

registerModuleVariants('evolved.activity.eating_competitor.s2', [
  {
    when: { evolvedFormId: ['eating_competitor'], evolvedStageIdx: [2] },
    weight: 1,
    text: [
      'Regional record plate — she eats like the clock owes her another minute of appetite.',
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
