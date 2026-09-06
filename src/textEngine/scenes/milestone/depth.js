// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Wildcard depth for milestone ceremony pools (Pass 29).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('milestone.body', [{ when: {}, text: [
  'The threshold shows on her at once — {word.body}, softer and fuller, warmth settling into every curve.',
] }]);

registerModuleVariants('milestone.crest', [{ when: {}, text: [
  'The new size of her lands all at once — warm, certain, the room gone close and slow around her fullness.',
  'She goes still as the change settles through her, breath catching on how much she wants to keep it.',
] }]);

registerModuleVariants('milestone.line', [{ when: {}, text: [
  '{subject.name} meets the bigger reflection and does not look away — warmth, want, and certainty braided together.',
  '{subject.name} cups the new softness, exhales, and lets herself be glad about what she has become.',
] }]);

registerModuleVariants('milestone', [{ when: {}, text: [
  '{milestone.body} {cloth.scene}\n\n{milestone.crest} {milestone.line}',
  '{milestone.body} {cloth.scene} {milestone.crest}\n\n{milestone.line}',
] }]);
