// The Squad — Lead: A1 Mobile | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('session.fullness.default.f2._f1', [
  { when: { corruptionMin: 1 }, weight: 2, text: [
    `{subject.name} is genuinely full — breath deeper, movements slower — and she keeps eating anyway, like stopping would be rude to the food.`,
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    `Her belly rounds firm under the table's edge; she shifts to make room and takes another bite without looking away from you.`,
  ]},
]);

registerModuleVariants('session.fullness.default.f3._f1', [
  { when: {}, text: [
    `Her belly is firm and round and very full; she presses her palm there, feels the give, picks up the fork again — "I'm okay," she says, meaning she wants more.`,
    `Past comfortable now — warmth heavy in her lap — she eats with focus, pleasure, and the quiet audacity of not stopping.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She groans softly, not from pain — from delight — and keeps going because you have not told her to stop.`,
  ]},
]);

registerModuleVariants('session.fullness.default.f4._f1', [
  { when: { stageMin: 7 }, weight: 2, text: [
    `She is stuffed past language — belly spilling, breath careful — each bite a ceremony of obedience and appetite.`,
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    `Full beyond excuse; she eats anyway, eyes half-lidded, worshipping the pressure from inside.`,
  ]},
]);

registerModuleVariants('session.fullness.default.f0._f1', [
  { when: { corruptionMin: 2 }, weight: 2, text: [
    `{subject.first} starts eager — already leaning toward the plate like hunger is flirtation.`,
  ]},
]);
