// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('scene.hungerInterrupt.behavior', [
  { when: { addictionLevel: [3, 4], hungerTier: [3, 4] }, weight: 3, text: [
    `She breathes your name like it is food — shameless, shaking, already stepping inside.`,
    `No preamble left in her; craving has eaten the polite version of {subject.first}.`,
  ]},
  { when: { inWithdrawal: true }, weight: 2, text: [
    `Withdrawal makes her sharp at the edges — eyes too bright, voice brittle until you feed her.`,
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.appearance', [
  { when: { stageMin: 5, stageMax: 8 }, weight: 2, text: [
    `Softness shows at throat and waist — hunger and weight sharing the same flush.`,
    `She looks padded and restless, clothes straining where she has been growing.`,
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    `She meets you hungry on purpose — lips parted, belly leading, asking without words.`,
  ]},
]);

registerModuleVariants('scene.hungerInterrupt.request', [
  { when: {}, text: [
    `"I need you to feed me," she says — simple, adult, impossible to misread.`,
    `"Please," she whispers. "I can't do this alone tonight."`,
    `She holds out empty hands like a bowl. "You know what I need."`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `"Bring enough," {subject.first} says, calm as an order. "I want to feel you decide for me."`,
  ]},
]);
