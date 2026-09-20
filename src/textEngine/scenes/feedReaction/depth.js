// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Wildcard depth for everyday-loop feed reaction pools (Pass 29).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('feed.react.beat', [{ when: {}, text: [
  'She works through it with steady pleasure, each bite landing warm and unhurried.',
] }]);

registerModuleVariants('feed.react.line', [{ when: {}, text: [
  '{subject.name} finishes and looks up, warm and pleased, already hoping for more.',
  '{subject.name} sets the plate aside slow, satisfaction written plain in her face.',
] }]);

registerModuleVariants('feed.react', [{ when: {}, text: [
  '{feed.react.beat}\n\n{feed.react.line}',
  '{feed.react.beat} She eats like the room belongs to her. {feed.react.line}',
] }]);

registerModuleVariants('feed.react.beat', [
  {
    when: { hungerTierMin: 2 },
    weight: 2,
    text: [
      'She eats like the hunger got here first — fast at the start, then slower, savoring the catch-up.',
      'Every bite lands where the ache was; she breathes out and keeps reaching.',
    ],
  },
]);

registerModuleVariants('feed.react.line', [
  {
    when: { stageMin: 3, corruption: [1, 2] },
    weight: 2,
    text: [
      '{subject.name} licks sweetness from her thumb and does not pretend she is finished.',
      '{subject.name} meets your eyes, cheeks warm. "I could do another round." She means it.',
    ],
  },
  {
    when: { studentId: 17, feedRoom: 'past' },
    weight: 3,
    text: [
      'Elara exhales through a stuffed smile. "You always know what I need, {ra.name}."',
    ],
  },
]);
