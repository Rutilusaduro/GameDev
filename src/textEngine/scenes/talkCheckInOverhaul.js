// The Squad — Lead: A2 Psych | Support: A5 Editor
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('talk.checkIn.greetBeat', [
  { when: { stageMin: 0, stageMax: 3 }, weight: 2, text: [
    `{subject.first} answers the door in socks and hesitation — polite, curious, already scanning for snacks.`,
    `She opens halfway, then wider when she recognizes you; the room smells like coffee and something sweet cooling on a desk.`,
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    `{subject.name} opens before you knock twice — as if she has been waiting for permission dressed as company.`,
    `The door swings wide; warmth and sugar air spill into the hall along with her soft, unhurried smile.`,
  ]},
  { when: { corruptionMin: 2 }, weight: 2, text: [
    `She greets you like a habit she enjoys — belly at ease, voice warm, appetite already in the conversation.`,
  ]},
]);

registerModuleVariants('talk.checkIn.bodySettle', [
  { when: { stageMin: 4, stageMax: 7 }, weight: 2, text: [
    `She settles into the chair and does not stop adjusting until her middle is comfortable — a small ritual of honesty.`,
    `Fullness shows in how she breathes: deeper, slower, pleased to be off her feet.`,
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    `She lowers herself in stages — hips, thighs, belly — until the furniture remembers her completely.`,
  ]},
]);

registerModuleVariants('talk.checkIn.clothesNote', [
  { when: { stageMin: 3 }, weight: 2, text: [
    `Fabric pulls where it used to lie flat; she tugs once, then leaves it — a truce with the seam.`,
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    `Her shirt has given up pretending; the stretch is visible, constant, almost tender.`,
  ]},
]);

registerModuleVariants('talk.checkIn.ownedSpread', [
  { when: { corruptionMin: 2 }, weight: 3, text: [
    `She arranges snacks within reach without asking — an altar of yes spread across the desk.`,
  ]},
]);
