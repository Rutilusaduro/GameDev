// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for weekly recap pools (Pass 29).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('week.recap.beat', [{ when: {}, text: [
  'Seven days of feeding leave their mark — softer curves, warmer presence, more of her to notice.',
] }]);

registerModuleVariants('week.recap.line', [{ when: {}, text: [
  '{subject.name} takes the week\'s gain in with a slow breath, neither fighting nor fleeing it.',
  '{subject.name} runs a hand along the new softness and lets the truth of it settle.',
] }]);

registerModuleVariants('week.recap', [{ when: {}, text: [
  '{week.recap.beat}\n\n{week.recap.line}',
  '{week.recap.beat} The difference is undeniable now. {week.recap.line}',
] }]);
