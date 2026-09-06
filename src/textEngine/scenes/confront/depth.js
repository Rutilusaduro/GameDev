// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for confrontation pools (Pass 30).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('confront.open', [{ when: {}, text: [
  `{subject.name} finds you before you find her — jaw set, arms folded, done waiting.`,
  `She blocks your path with quiet finality. "We need to talk. Now."`,
] }]);

registerModuleVariants('confront.grievance', [{ when: {}, text: [
  `"You keep deciding things about my body without asking," she says. "I'm not okay with that anymore."`,
  `"I trusted you to stop when I said stop," she says. "You didn't. I remember."`,
] }]);

registerModuleVariants('confront.demand', [{ when: {}, text: [
  `"Something has to change," she says. "I'm not asking — I'm telling you."`,
  `"You get one chance to make this right," she says. "Don't waste it."`,
] }]);

registerModuleVariants('confront.memoryCallback', [{ when: {}, text: ['', ''] }]);

registerModuleVariants('confront', [{ when: {}, text: [
  '{confront.open}\n\n{confront.grievance} {confront.demand}',
  '{confront.open} {confront.grievance}\n\n{confront.demand}',
] }]);

registerModuleVariants('confront.withMemory', [{ when: {}, text: [
  '{confront.open} {confront.grievance}{confront.memoryCallback|prefix: }\n\n{confront.demand}',
  '{confront.open}\n\n{confront.grievance}{confront.memoryCallback|prefix: } {confront.demand}',
] }]);
