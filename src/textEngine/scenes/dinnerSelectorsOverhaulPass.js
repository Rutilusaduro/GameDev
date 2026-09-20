// The Squad — Lead: A1 Mobile | Support: A2 Psych
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('dinner.moodTone', [
  { when: { stageMin: 6, corruptionMin: 2 }, weight: 3, text: [
    'She eats like the room belongs to her hunger — unhurried, pleased, impossible to interrupt.',
  ]},
  { when: { stageMin: 4, mood: ['content'] }, weight: 2, text: [
    'Contentment pools between courses; every plate feels like continuation.',
  ]},
]);

registerModuleVariants('dinner.campusNote', [
  { when: { campusFattening: true, stageMin: 5 }, weight: 3, text: [
    'Sophia\'s wellness branding softened the campus — portions swell, excuses thin, your table follows suit.',
  ]},
  { when: { campusFattening: true, corruptionMin: 1 }, weight: 2, text: [
    'Metabolic support samples linger in the air; dessert arrives before anyone asks.',
  ]},
]);

registerModuleVariants('dinner.relWarmth', [
  { when: { relationship: [4], stageMin: 7 }, weight: 3, text: [
    'She lets you order the rich things without performance — devotion tastes like butter.',
  ]},
  { when: { relationship: [2], corruptionMin: 2 }, weight: 2, text: [
    'Familiar enough to eat honestly; corrupt enough to want more than the menu suggests.',
  ]},
]);

registerModuleVariants('dinner.seasonAmbience', [
  { when: { season: ['fall'], stageMin: 5 }, weight: 2, text: [
    'Fall sauces and heavier plates — she leans into comfort like it is the point of the season.',
  ]},
]);
