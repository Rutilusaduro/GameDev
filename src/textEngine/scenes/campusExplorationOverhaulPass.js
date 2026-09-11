// The Squad — Lead: A1 Mobile | Support: A6 Slender
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('campus.travel', [
  { when: { stageMin: 6, campusFattening: true }, weight: 3, text: [
    'Wellness samples glow on every table — the campus routes appetite like infrastructure.',
  ]},
  { when: { campusFattening: true }, weight: 2, text: [
    'Sophia\'s branding softened the map — lines lengthen, excuses thin, hunger normalized.',
  ]},
  { when: { stageMax: 3, corruption: [0] }, weight: 3, text: [
    'Ordinary campus noise — but your residents keep finding reasons to linger where food is.',
  ]},
]);

registerModuleVariants('campus.location', [
  { when: { stageMin: 5 }, weight: 2, text: [
    'The place remembers heavy hips and fuller chairs — furniture yielding, air tasting like seconds.',
  ]},
  { when: {}, text: [
    'You note where the benches creak kindly and where the vending machines restock fastest.',
  ]},
]);

registerModuleVariants('campus.sighting', [
  { when: { weightBand: 'mid', corruptionMin: 1 }, weight: 2, text: [
    '{subject.name} pauses mid-errand for something sweet — appetite visible, unhidden, almost proud.',
  ]},
  { when: { weightBand: 'heavy', stageMin: 6 }, weight: 2, text: [
    '{subject.name} takes up the sidewalk with unhurried mass — movement slow, warmth obvious, hunger legible.',
  ]},
]);
