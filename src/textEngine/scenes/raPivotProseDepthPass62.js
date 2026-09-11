// Contest + sumo depth variants (Pass 62).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('contest.payoff.body', [
  { when: { studentId: 1, contestStage: [2, 3, 4, 5] }, weight: 3, text: [
    'Cassidy rolls her shoulders — competition discipline, belly honest anyway.',
    'She logs the fullness like data. The scale will agree later.',
  ]},
]);

registerModuleVariants('contest.payoff.tag', [
  { when: { studentId: 8 }, weight: 3, text: [
    'Maya exhales slow. Quiet pride. Quiet hunger for rematch.',
  ]},
]);

registerModuleVariants('sumo.opening.compose', [
  { when: { sumoStage: [4, 5] }, weight: 2, text: [
    'The dohyo feels smaller every year. {oppLbs} pounds of Dana waits — you answer with mass.',
  ]},
]);
