// The Squad — Lead: A1 Mobile | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('room.visit.stage.beat', [
  { when: { stageMin: 0, stageMax: 3 }, weight: 2, text: [
    `{subject.first} clears a chair for you — nervous hospitality, a secret stash of snacks half-hidden under a notebook.`,
    `"Come in," she says. "Sorry about the mess." The mess is mostly food packaging and good intentions.`,
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    `{subject.name} makes space without hurry; the room has learned her size and adjusted.`,
    `She pats the bed edge — invitation and confession in one gesture. "RA desk. Finally."`,
  ]},
  { when: { corruptionMin: 2, stageMin: 4 }, weight: 2, text: [
    `She opens the door already chewing — not embarrassed, just hungry and glad it is you.`,
  ]},
]);

registerModuleVariants('room.visit.intro.lead', [
  { when: { stageMin: 6 }, weight: 2, text: [
    `You knock; the floorboard answers before she does — a creak that knows her weight.`,
  ]},
]);
