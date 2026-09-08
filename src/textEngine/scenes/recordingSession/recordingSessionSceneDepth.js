// The Squad — Lead: A4 Architect | Support: A2 Psych
// Stage + per-student depth on recording session pools.
import { registerModuleVariants } from '../../engine.js';

const stages = [0, 1, 2, 3, 4, 5];

for (const si of stages) {
  registerModuleVariants(`recording.oneMore.s${si}`, [
    { when: { studentId: 2, recordingStage: si }, weight: 4, text: [
      `Kylie nods at the camera. "One more take," she says. "This one's the clip."`,
      `"Again," Kylie says, already reaching. "Content doesn't film itself."`,
    ]},
    { when: { studentId: 5, recordingStage: si }, weight: 4, text: [
      `Destiny shrugs. "One more," she says. "Patch the last take. I can eat through it."`,
    ]},
    { when: { studentId: 10, recordingStage: si }, weight: 4, text: [
      `Reneé tastes the air. "Encore," she murmurs. "The camera loves appetite."`,
    ]},
    { when: { stageMin: 7, recordingStage: si }, weight: 3, text: [
      `{subject.name} nods — vast, willing, one more take at this scale.`,
    ]},
    { when: { corruption: [2], recordingStage: si }, weight: 3, text: [
      `"Again," {subject.name} says without hesitation. Hunger ready for another round.`,
    ]},
    { when: { recordingStage: si }, weight: 2, text: [
      `She nods. One more. The crew resets. Appetite does not.`,
      `"One more take," she says — calm, certain, already opening for the next bite.`,
    ]},
  ]);
}

registerModuleVariants('recording.oneMore.s0', [
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya nods once — quiet agreement, appetite honest on camera.`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona studies the lens. "Again," she says. "I saw something new that time."`,
  ]},
]);

registerModuleVariants('recording.oneMore.s3', [
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane laughs. "Shoot it again, sugar — I ain't done looking this good."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany smooths her skirt. "One more," she says brightly. "Chapter standards."`,
  ]},
]);

registerModuleVariants('recording.oneMore.s5', [
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith does not nod — she opens her mouth. "Again," she says. Predator patient.`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    `At this scale one more take means crew, cushions, and appetite without apology.`,
  ]},
]);
