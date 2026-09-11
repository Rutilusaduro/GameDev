// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('comp.react', [
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    `{subject.first} goes still — like you complimented a secret she has not admitted yet.`,
    `Color rises; she tucks hair behind her ear and fails to look offended.`,
  ]},
  { when: { stageMin: 5, corruption: [1] }, weight: 3, text: [
    `She meets your eyes and holds them — pleased, a little hungry for more praise.`,
    `"Keep talking," she murmurs. Not a joke. An invitation.`,
  ]},
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `She preens without shame — shoulders back, belly forward, savoring your attention.`,
  ]},
]);

registerModuleVariants('comp.notMeant', [
  { when: { corruption: [0], stageMax: 4 }, weight: 2, text: [
    `"I didn't mean to —" she starts, then stops. The curve you named is real; denial feels thin.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She pretends surprise; her smile betrays how long she wanted you to say it.`,
  ]},
]);

registerModuleVariants('comp.unwelcome', [
  { when: { stageMin: 7 }, weight: 2, text: [
    `"Don't stop," she breathes — the compliment lands like food, warm and wanted.`,
  ]},
]);

registerModuleVariants('comp.practicing', [
  { when: { stageMin: 4, stageMax: 6 }, weight: 2, text: [
    `She turns a little in the chair, showing you the line of her hip — practice, performance, truth.`,
  ]},
]);

registerModuleVariants('comp.claiming.stmt', [
  { when: { corruptionMin: 2, stageMin: 5 }, weight: 3, text: [
    `"This body is yours to admire," she says — flat, proud, already believing it.`,
  ]},
]);

registerModuleVariants('comp.show', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `She lifts her shirt enough to prove the scale — soft expanse, slow breath, your gaze welcomed.`,
  ]},
]);
