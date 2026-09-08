// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed depth for dinner ending pools (endOpen/endClose/ending).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('dinner.endOpen', [
  { when: { stageMin: 8, fullnessMin: 1.4 }, weight: 3, text: [
    `{subject.name} sits absolutely still — belly vast past the table edge, {subject.lbs} lbs of satisfied mass.`,
    `The room orbits {subject.name}'s fullness. She breathes slow, enormous, pleased.`,
  ]},
  { when: { stageMin: 8, fullnessMax: 1.0 }, weight: 2, text: [
    `{subject.name} surveys the cleared table like royalty at ease. For her scale, this is a light evening.`,
  ]},
  { when: { stageMin: 5, stageMax: 7, fullnessMin: 1.3 }, weight: 2, text: [
    `{subject.name} leans back, belly round and high. "Personal best," she says, surprised and proud.`,
  ]},
  { when: { stageMin: 0, stageMax: 2, fullnessMin: 1.2 }, weight: 2, text: [
    `{subject.name} stares at the empty plates. "I ate all of that," she says — wonder, not regret.`,
  ]},
  { when: { corruption: [2], fullnessMin: 1.1 }, weight: 3, text: [
    `{subject.name} feeds herself the last bite without ceremony. Full, warm, shameless — exactly how she wanted the night to end.`,
  ]},
  { when: { studentId: 0, fullnessMin: 1.2 }, weight: 4, text: [
    `Brittany plants both hands on her full middle. "Mission accomplished," she says, grinning.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie checks her reflection in a spoon. "Content gold," she murmurs, belly soft in frame.`,
  ]},
  { when: { studentId: 8, fullnessMin: 1.1 }, weight: 4, text: [
    `Maya sits quiet, hands folded on her belly. Full. Safe. She does not rush to leave.`,
  ]},
  { when: { studentId: 10, fullnessMin: 1.3 }, weight: 4, text: [
    `Reneé savors the last sip of wine, belly high. "Perfect pairing," she says — food, evening, appetite.`,
  ]},
  { when: { studentId: 15, fullnessMin: 1.2 }, weight: 4, text: [
    `Lilith leans back, predator-sated. "Good hunt," she says softly.`,
  ]},
]);

registerModuleVariants('dinner.endClose', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `Standing is a project deferred. {subject.name} smiles at you anyway — vast, warm, worth the wait.`,
    `She texts later: still full. Still happy. Still not sorry.`,
  ]},
  { when: { stageMin: 5, stageMax: 7, fullnessMin: 1.2 }, weight: 2, text: [
    `"I can't believe I ate that much," she says — but her hands stay on her belly, content.`,
    `She walks slow to the car, belly leading. No complaints. Only satisfaction.`,
  ]},
  { when: { stageMin: 0, stageMax: 2, fullnessMin: 1.1 }, weight: 2, text: [
    `One hand rests on her stomach — new habit forming. She does not notice she is smiling.`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `She kisses your cheek, breath sweet with dessert. "Feed me again soon," she whispers.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny logs the evening. "XP gained," she says. "Buff: comfortably stuffed."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya updates her notebook. "Intake exceeded projection," she says, satisfied. "Recommend repeat."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé hums walking out. "C'était magnifique," she says. "My belly agrees."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy packs leftovers anyway. "For later," she says, patting her middle. "Always for later."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane sighs happy. "Lord, that was good," she says. "Worth every button I lost."`,
  ]},
]);

registerModuleVariants('dinner.ending', [
  { when: { stageMin: 9, fullnessMin: 1.5 }, weight: 3, text: [
    `{dinner.endOpen} The chair creaks. {dinner.endClose}`,
  ]},
  { when: { corruption: [2], fullnessMin: 1.2 }, weight: 2, text: [
    `{dinner.endOpen} She looks at you like the evening is not over. {dinner.endClose}`,
  ]},
]);
