// The Squad — Lead: A4 Architect | Support: A7 Artisan, A5 Editor
// Nineteenth Chair starter kit. V1 uses curated engineering-register lines
// keyed on custom:true, so hard-coded Talia persona lines never leak.
import { registerModuleVariants } from '../../engine.js';

const W = 4;
const P = 5;
const CUSTOM = { studentId: 18, custom: true };

registerModuleVariants('wi.replyDialogue', [
  { when: { ...CUSTOM, corruption: [0] }, priority: P, weight: W, text: [
    `"Margin of error," she says, reading the dial. "Still logging it."`,
    `"Baseline moved," she murmurs. "I need more data before I comment."`,
  ]},
  { when: { ...CUSTOM, corruption: [1] }, priority: P, weight: W, text: [
    `"Output is up," she says. "Inputs justify the delta."`,
    `"Acceptable variance," she says, with a little too much satisfaction.`,
  ]},
  { when: { ...CUSTOM, corruption: [2] }, priority: P, weight: W, text: [
    `"The math is perfect," she says, pleased. "Recommend continuing trial."`,
    `"Every calorie is load-bearing now," she says. "I approve the revision."`,
  ]},
]);

registerModuleVariants('eat.firstBite', [
  { when: { ...CUSTOM, corruption: [0] }, priority: P, weight: W, text: [
    'She takes the first bite like a measurement, then forgets to stop measuring.',
    `"For the log," she says, and eats anyway.`,
    'Opening intake logged. Flavor exceeds specification. She continues.',
  ]},
  { when: { ...CUSTOM, corruption: [1] }, priority: P, weight: W, text: [
    'The first bite settles the argument faster than any spreadsheet.',
    'She calls it a field test. Her fork does not wait for peer review.',
    'Hypothesis: one bite. Result: insufficient. She iterates.',
  ]},
  { when: { ...CUSTOM, corruption: [2] }, priority: P, weight: W, text: [
    'She eats like the prototype finally passed inspection.',
    `"Necessary intake," she says, already reaching for more.`,
    'First mouthful: validated. Second: scheduled. Third: inevitable.',
  ]},
]);

registerModuleVariants('shift.interior', [
  { when: { ...CUSTOM, corruption: [0] }, priority: P, weight: W, text: [
    'She files appetite under variables. It refuses to stay there.',
    'The model updates around her hunger, quietly and without permission.',
    'Control group: denial. Results: inconclusive. She eats.',
  ]},
  { when: { ...CUSTOM, corruption: [1] }, priority: P, weight: W, text: [
    'She stops arguing with the numbers. Appetite wins the model.',
    'The old spec fails. The new body makes a better case.',
    'Loss function: minimized shame. Accuracy: improving.',
  ]},
  { when: { ...CUSTOM, corruption: [2] }, priority: P, weight: W, text: [
    'The prototype became the product. She is keeping it.',
    'Next sprint: more.',
    'Deploy to production: this body. No rollback.',
  ]},
]);

registerModuleVariants('eat.finish', [
  { when: { ...CUSTOM, corruption: [0] }, priority: P, weight: W, text: [
    'She finishes the plate like closing a log file — complete, documented, already hungry for the appendix.',
    'Empty dish. Output: satisfied. Next iteration queued.',
    'Trial meal concluded. Variance within acceptable pleasure.',
  ]},
  { when: { ...CUSTOM, corruption: [1] }, priority: P, weight: W, text: [
    'She sets the fork down and updates the model. "Recommend repeat trial."',
    'Plate empty. Belly fuller. Hypothesis supported.',
    'Intake complete. She is already planning seconds.',
  ]},
  { when: { ...CUSTOM, corruption: [2] }, priority: P, weight: W, text: [
    'She finishes everything within reach and looks for what comes next.',
    '"Output exceeded target," she says, pleased. "No rollback."',
    'Deploy to production: this fullness. Continue feeding.',
  ]},
]);

registerModuleVariants('diary.innerBeat', [
  { when: { ...CUSTOM, corruption: [0] }, priority: P, weight: W, text: [
    'The number climbed. I wrote it down twice. The second time looked less like a mistake.',
    'I called it variance. Then I planned lunch around reproducing the result.',
  ]},
  { when: { ...CUSTOM, corruption: [1] }, priority: P, weight: W, text: [
    'The justification is airtight. The hunger is real. Both things can be true.',
    'Inputs increased. Output improved. I am trying not to smile at that sentence.',
  ]},
  { when: { ...CUSTOM, corruption: [2] }, priority: P, weight: W, text: [
    'The trial continues because I want it to. Cleanest data point.',
    'Build yield within spec. Personal yield better than spec. Continuing.',
  ]},
]);
