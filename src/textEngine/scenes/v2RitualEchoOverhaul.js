// The Squad — Lead: A1 Mobile | Support: A2 Psych
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('ritual.hall_banquet', [
  { when: { stageMin: 7, corruptionMin: 2 }, weight: 3, text: [
    'Banquet becomes liturgy — courses relentless, bellies synchronized, restraint laughed out of the room.',
  ]},
]);

registerModuleVariants('ritual.communion_snack.beat', [
  { when: { corruption: [0], stageMax: 4 }, weight: 3, text: [
    'Shared plate, shy fingers, crumbs falling — appetite learning to be public.',
  ]},
]);

registerModuleVariants('ritual.sacred_gluttony', [
  { when: { stageMin: 9 }, weight: 3, text: [
    'Altars of platters, six bellies rising in devotional unison — gluttony consecrated, influence drinking restraint from the air.',
  ]},
]);

registerModuleVariants('echo.capture', [
  { when: { corruptionMin: 2, stageMin: 6 }, weight: 3, text: [
    'The archive catches appetite becoming identity — warm, deliberate, worth replaying.',
  ]},
]);

registerModuleVariants('echo.replay.beat', [
  { when: { stageMin: 10 }, weight: 3, text: [
    'Memory replays at immobile scale — belly sway unchanged by time, hunger still honest.',
  ]},
]);
