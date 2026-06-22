// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// One-shot comfort milestone scenes + clothing re-fit.
// House voice: celebratory, sensual-literary, never medicalized.
import { registerPool } from '../../engine.js';

// ── immob.refit ───────────────────────────────────────────────
// She gets measured and fitted to her current size.
registerPool('immob.refit', [
  { when: {}, text: [
    `New numbers. New garments. Everything made for what she actually is now.`,
    `She is measured and fitted — fabric in abundance, nothing straining. She receives the new clothes like her due.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `The tailor's tape reads differently than it ever has. What comes back is made for her current reality — soft fabric, everything that fits her now.`,
    `She gets measured where she rests. The numbers are honest. The clothes that come back are built around her fullness — soft, sized, unhurried about it.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `Measurement at this scale is an exercise in acknowledgment. New garments arrive: impossible proportions, made real, fitted to what she has become.`,
    `What comes back fits. That's the statement — that this size can be clothed, and has been.`,
  ]},
]);

// ── immob.comfort.bed ─────────────────────────────────────────
registerPool('immob.comfort.bed', [
  { when: {}, text: [
    `The new frame arrives — reinforced, wide, built to hold her. She settles onto it and something in her exhales completely. "This," she says, "is actually right."`,
    `The right bed finally. She finds the center without effort, redistributes, stills. The wood doesn't shift under her. "Better," she says.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `The frame is built to her specification — vast and solid, engineered for the weight she carries. She settles onto it and the room goes quiet around her.`,
  ]},
]);

// ── immob.comfort.fan ─────────────────────────────────────────
registerPool('immob.comfort.fan', [
  { when: {}, text: [
    `The fan goes on and she closes her eyes into it. Cool air across the warm expanse of her — you watch her simply receive it. "Leave it running," she says.`,
    `Moving air against her warmth. She settles differently under it — easier, softer. "That helps," she says. "That actually helps."`,
  ]},
]);

// ── immob.comfort.position ────────────────────────────────────
registerPool('immob.comfort.position', [
  { when: {}, text: [
    `She shifts a little as you adjust — cushions repositioned, supports moved in. Something finds its place. She goes still. "There. That's the one."`,
    `The rearrangement takes two minutes. She settles into it and the tension she'd been holding releases — that small ongoing adjustment, finally done.`,
  ]},
]);

// ── immob.comfort.ac ──────────────────────────────────────────
registerPool('immob.comfort.ac', [
  { when: {}, text: [
    `The temperature finds itself for the first time. Her next breath is longer, slower. The heat she carries everywhere finally has somewhere to put itself.`,
    `Cool air, properly. She doesn't say anything, but the room is different. She is different in the room — easier, more settled. Less occupied with the warmth.`,
  ]},
]);

// ── immob.comfort.arrangement ─────────────────────────────────
registerPool('immob.comfort.arrangement', [
  { when: {}, text: [
    `Everything within reach. The room edited to her permanence — trays at height, paths cleared, space organized around what she is now. She looks at it, then at you. "You did this."`,
    `The room rearranged to fit her rather than the other way around. She surveys it without moving. "Good," she says. "Finally."`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `The room belongs to her completely now. You've made sure of it — every surface, every reach, every angle arranged for her settled permanence. She doesn't say thank you. She doesn't have to.`,
  ]},
]);
