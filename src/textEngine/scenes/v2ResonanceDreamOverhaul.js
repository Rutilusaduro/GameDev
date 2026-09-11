// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('res.pulse', [
  { when: { stageMin: 8, corruptionMin: 2 }, weight: 3, text: [
    'The wire sings — hunger arrives in her linked sister as warmth, not thought, belly answering before pride catches up.',
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    'Borrowed appetite trembles through the link — a ghost bite, a real opening of the mouth.',
  ]},
  { when: {}, text: [
    'Resonance translates feeding into feeling — soft, immediate, impossible to pretend away.',
  ]},
]);

registerModuleVariants('res.surge', [
  { when: { stageMin: 6 }, weight: 3, text: [
    'The hall hungers as one organism — drawers empty, delivery apps bloom, fullness echoing dorm to dorm.',
  ]},
  { when: { corruptionMin: 1 }, weight: 2, text: [
    'Surge rolls through linked residents like weather — appetite synchronized, consent assumed by architecture.',
  ]},
]);

registerModuleVariants('res.link', [
  { when: { corruptionMin: 2 }, weight: 2, text: [
    'You bind their wanting at the root — when one eats, the others will remember hunger is shared property.',
  ]},
]);

registerModuleVariants('dream.open', [
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    'Sleep opens on curiosity — food waiting like a question she has not answered yet, but wants to.',
  ]},
  { when: { stageMin: 7, corruptionMin: 2 }, weight: 3, text: [
    'Dream borders dissolve into appetite\'s country — vast, warm, already hers before she wakes.',
  ]},
]);

registerModuleVariants('dream.feast_hall', [
  { when: { stageMin: 5 }, weight: 3, text: [
    'Torches, long tables, her belly crowned at the head — courses arrive until the dream forgets how to end.',
  ]},
]);
