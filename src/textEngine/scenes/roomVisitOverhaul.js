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

registerModuleVariants('room.visit.stage.room', [
  { when: {}, weight: 2, text: [
    'Snacks outrank textbooks on every flat surface — the room already runs on appetite.',
    'A faint sweet smell hangs in the air; laundry, lotion, and something recently opened.',
    'The window is cracked for air; inside, the space feels close, personal, watched over.',
  ]},
  { when: { stageMin: 7, corruptionMin: 2 }, weight: 2, text: [
    'Extra pillows form a nest within the nest — comfort arranged like a love language.',
  ]},
]);

registerModuleVariants('room.visit.stage.beat', [
  { when: { corruption: [0], stageMax: 2 }, weight: 2, text: [
    `{subject.first} keeps one hand on the doorframe. "Quick visit? I have — stuff. Due."`,
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    `"You came," she says, voice thick with satisfaction. The room feels built to hold her and your attention.`,
  ]},
]);

registerModuleVariants('room.visit.stage.beat.persona', [
  { when: {}, weight: 1, text: [
    `{subject.first} glances at the mini-fridge, then back at you. "Want something? I hoard snacks now. Officially."`,
    `She pats the bedspread smooth — habit, hospitality. "{ra.name}. Good timing. I was lonely."`,
    `Nothing dramatic: same girl, same room, warmer air between you than last month.`,
  ]},
  { when: { studentId: 8, stageMin: 3 }, weight: 3, text: [
    `Maya leans against the desk, unreadable smile. "Floor gossip says you feed people, {ra.name}. True?"`,
  ]},
]);
