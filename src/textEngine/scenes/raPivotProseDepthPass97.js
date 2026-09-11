// Fair day influence variants + evolved/hall (Pass 97).
import { registerModuleVariants } from '../engine.js';
import { legacyBridgeWhen } from './legacyPoolPolicy.js';


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

registerModuleVariants('evolved.event.sumo.s0.p0.load_hard', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Chanko bowls disappear — belly settles lower, dohyo feels closer.',
    ],
  },
]);

registerModuleVariants('evolved.event.homeroom_queen.s1.p1.watched', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Kayla’s jeans gap — Bri’s belly meets the table edge; Daisy says only “yes.”',
    ],
  },
]);

registerModuleVariants('cg.scene.corkboard.Frenzied', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Pins fly — Priya adjusts numbers while her belly shifts the desk an inch.',
    ],
  },
]);

registerModuleVariants('wifeLessons.lesson.s2.butter_cake', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Butter cake steam fogs the windows — mothers and daughters share the same sigh.',
    ],
  },
]);

registerModuleVariants('hall.ambiance.pulse.intimacy', [
  {
    when: legacyBridgeWhen(),
    weight: 1,
    text: [
      'Soft questions in the nook — want learns vocabulary without shame.',
    ],
  },
]);
