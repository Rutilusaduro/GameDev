// Fair day influence variants (Pass 97) — collab-specific weigh-in/judging/afterparty beats.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('fair.day.weighIn.open', [
  {
    when: { fairInfluence: ['Brittany'] },
    weight: 1,
    text: [
      'Brittany’s competitive heat rides MJ’s shoulder — the scale is a scoreboard tonight.',
    ],
  },
  {
    when: { fairInfluence: ['Lilith'] },
    weight: 1,
    text: [
      'Lilith’s shadow makes the crowd lean in — appetite feels like county fair witchcraft.',
    ],
  },
  {
    when: { fairStageIdx: [5] },
    weight: 1,
    text: [
      'Legend night at the weigh-in — canvas and steel already know her name.',
    ],
  },
]);

registerModuleVariants('fair.day.judging', [
  {
    when: { fairInfluence: ['Kylie'] },
    weight: 1,
    text: [
      'Kylie’s audience films before the ribbon — MJ performs for pixels and pie.',
    ],
  },
  {
    when: { fairInfluence: ['Daisy'] },
    weight: 1,
    text: [
      'Daisy’s kindness wraps the judging stand — coached, adored, very visible.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.choice1', [
  {
    when: { fairInfluence: ['Renee'] },
    weight: 1,
    text: [
      'Reneé plates celebration — collaborator night tastes like butter and victory.',
    ],
  },
]);

registerModuleVariants('fair.day.afterparty.choice2', [
  {
    when: { fairInfluence: ['Serena'] },
    weight: 1,
    text: [
      'Serena steers MJ to the crowd — mass displayed is mass respected.',
    ],
  },
]);
