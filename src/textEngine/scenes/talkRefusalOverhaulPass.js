// The Squad — Lead: A6 Slender | Support: A2 Psych
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('talk.refusal.command_finish._f1', [
  { when: { stageMax: 4, corruption: [0] }, weight: 3, text: [
    'She shakes her head — polite, firm, cheeks hot — hunger still arguing underneath.',
  ]},
  { when: { corruptionMin: 2, stageMin: 5 }, weight: 3, text: [
    'Refusal performs for a breath; her body already leans toward obedience.',
  ]},
]);

registerModuleVariants('talk.refusal.command_finish._f2', [
  { when: { corruption: [1] }, weight: 3, text: [
    '"I shouldn\'t," she says, already reaching anyway.',
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    '"I\'m full," she claims — voice slow, belly audible contradiction.',
  ]},
]);
