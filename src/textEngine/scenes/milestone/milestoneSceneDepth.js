// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed + per-student depth for milestone ceremony pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('milestone.body', [
  { when: { stageMin: 3, stageMax: 4, corruption: [0] }, weight: 3, text: [
    `The new softness arrives shy — {word.body}, a plush surprise she keeps touching to confirm.`,
  ]},
  { when: { stageMin: 5, stageMax: 6, corruption: [1, 2] }, weight: 3, text: [
    `She has grown into appetite's architecture — {word.body}, {word.movement}, warm mass that sways with purpose.`,
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 3, text: [
    `The threshold shows everywhere at once — {word.body}, heavy and lush, a body that announces itself.`,
  ]},
  { when: { stageMin: 9, corruption: [2] }, weight: 3, text: [
    `Monumental now — {word.body}, immense and unhurried, gravity rewritten around her softness.`,
  ]},
]);

registerModuleVariants('milestone.crest', [
  { when: { stageMax: 2, corruption: [0] }, weight: 3, text: [
    `Heat climbs her throat as it settles — alarm and wanting braided, neither winning yet.`,
  ]},
  { when: { stageMin: 5, stageMax: 7, corruption: [1] }, weight: 2, text: [
    `The new weight lands and pools low — {word.breathQuality}, palms finding the warm spread of herself.`,
  ]},
  { when: { stageMin: 8, corruption: [2] }, weight: 3, text: [
    `She leans into the landing — vast warmth settling by degrees, hungry for the next threshold already.`,
  ]},
]);

registerModuleVariants('milestone.line', [
  { when: { studentId: 15, stageMin: 5 }, weight: 4, text: [
    `Lilith cups the new softness like prey she caught herself. "Good," she murmurs. "More."`,
  ]},
  { when: { studentId: 17, stageMin: 4 }, weight: 4, text: [
    `Indiana grins at the bigger reflection. "New layer uncovered," he says. "Dig deeper."`,
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: 4, text: [
    `Brittany plants hands on new curves, laughing. "Captain's still captain. Just… bigger bench."`,
  ]},
  { when: { studentId: 2, stageMin: 6 }, weight: 4, text: [
    `Kylie films the reveal, breathless. "This is the content," she says. "This is the era."`,
  ]},
  { when: { studentId: 4, corruption: [1, 2] }, weight: 4, text: [
    `Fiona traces the changed silhouette like brushwork. "Beautiful," she whispers. "Keep going."`,
  ]},
  { when: { studentId: 5, stageMin: 5 }, weight: 4, text: [
    `Destiny pats her middle. "Patch notes: increased mass. Players approve."`,
  ]},
  { when: { studentId: 8, corruption: [2] }, weight: 4, text: [
    `Maya meets your eyes in the mirror — small smile, vast certainty. She does not look away.`,
  ]},
  { when: { studentId: 10, stageMin: 7 }, weight: 4, text: [
    `Reneé tastes the new heft like a perfect course. "Exactly right," she says. "Seconds."`,
  ]},
  { when: { studentId: 14, stageMin: 6 }, weight: 4, text: [
    `Mary Jane laughs, hands on broader hips. "Harvest came early," she says. "I'll take it."`,
  ]},
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    `Talia logs the dimensions, then runs a hand over the change anyway. "Within tolerance," she admits.`,
  ]},
  { when: { corruption: [0], stageMax: 3 }, weight: 2, text: [
    `{subject.name} stares at the bigger reflection — flush climbing, shame losing the argument.`,
  ]},
  { when: { corruption: [2], stageMin: 7 }, weight: 3, text: [
    `{subject.name} faces the threshold and wants more — plainly, hungrily, without apology.`,
  ]},
]);
