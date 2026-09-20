// The Squad — Lead: A5 Editor
// Additional week recap beats (pass 3 — mechanics overhaul branch).
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('week.recap.beat', [
  { when: { gainBand: 'solid', corruptionMin: 2 }, weight: 3, text: [
    'The week stacked appetite on appetite — {word.body} fuller, movements slower, every meal feeling like continuation rather than exception.',
  ]},
  { when: { gainBand: 'big', corruption: [0] }, weight: 2, text: [
    'Real weight arrived this week and she is still learning how to wear it without flinching — {word.clothingFit}, warmth where there used to be restraint.',
  ]},
  { when: { stagedUp: true, stageMin: 4 }, weight: 3, text: [
    'A threshold crossed — not dramatic on paper, undeniable in the mirror: {word.movement}, and more room taken without asking.',
  ]},
]);
