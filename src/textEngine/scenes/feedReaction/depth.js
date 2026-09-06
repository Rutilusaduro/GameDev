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
