// Item use + feed loop depth (Pass 64).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('item.use.open', [
  { when: { studentId: 13 }, weight: 4, text: [
    'Daisy sets the {item.label} on a napkin like church potluck. "{subject.name}, eat, sugar."',
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    'Destiny grabs the {item.label} without looking up from chat. "Loot acquired."',
  ]},
  { when: { stageMin: 7 }, weight: 2, text: [
    'The {item.label} disappears into {subject.name} at scale — calories becoming geography.',
  ]},
]);

registerModuleVariants('feed.react.line', [
  { when: { studentId: 17, feedRoom: 'past' }, weight: 3, text: [
    'Elara exhales through a stuffed smile. "You always know what I need, {ra.name}."',
  ]},
]);
