// The Squad — Lead: A4 Architect | Support: A2 Psych
// Wrap/payoff pools + per-student depth for recording session endings.
import { registerPool, registerModuleVariants } from '../../engine.js';

const CLIPS = ['good', 'great', 'perfect'];
const W = 4;

for (const clip of CLIPS) {
  registerPool(`recording.wrap.${clip}`, [
    { when: { recordingStage: 0 }, text: [
      `You wrap with ${clip} footage. {subject.name} at {subject.lbs} pounds glows — belly softer, appetite satisfied.`,
      `Session ends on a ${clip} take. {subject.name} breathes easy, new weight visible and welcome.`,
    ]},
    { when: { recordingStage: [1, 2] }, text: [
      `${clip.charAt(0).toUpperCase() + clip.slice(1)} clip secured. {subject.name} at {subject.lbs} — belly rounder, warmth deeper.`,
      `You cut on a ${clip} note. {subject.lbs} pounds sit heavy and content on camera.`,
    ]},
    { when: { recordingStage: [3, 4] }, text: [
      `${clip} footage at scale — {subject.name} vast at {subject.lbs}, belly dominating frame, devotion visible.`,
      `The ${clip} take lands. {subject.lbs} pounds of appetite architecture, still and glowing.`,
    ]},
    { when: { recordingStage: 5 }, text: [
      `${clip} session complete. {subject.lbs} pounds — immobile, magnificent, yours.`,
      `You wrap the ${clip} clip. {subject.name} fills the room at {subject.lbs}, blissful and vast.`,
    ]},
    { when: {}, text: [
      `You wrap with ${clip} footage. {subject.name} at {subject.lbs} pounds looks beautifully full.`,
    ]},
  ]);
}

registerPool('recording.payoff', [
  { when: { recordingStage: 0 }, text: [
    `Session over. {subject.name} looks heavier — {subject.lbs} pounds, cheeks rounder, belly softer on her thighs.`,
    `Recording ends. Fresh gain shows at {subject.lbs} — warmth, devotion, satisfaction.`,
  ]},
  { when: { recordingStage: [1, 2] }, text: [
    `Filming complete. {subject.lbs} pounds — belly hangs lower, breasts fuller, appetite honored.`,
    `The camera stops. {subject.name} at {subject.lbs}, visibly plumper, glowing with the work.`,
  ]},
  { when: { recordingStage: [3, 4] }, text: [
    `Session finished. {subject.lbs} pounds — belly wider, mass unmistakable, contentment deep.`,
    `Recording done. {subject.name} at {subject.lbs}, breathtakingly immense and satisfied.`,
  ]},
  { when: { recordingStage: 5 }, text: [
    `Filming ends. {subject.lbs} pounds — soft layers deepened, body geography of devotion.`,
    `The session closes. {subject.name} at {subject.lbs}, vast and still, appetite complete.`,
  ]},
  { when: {}, text: [
    `Session over. {subject.name} at {subject.lbs} pounds — gain visible, devotion intact.`,
  ]},
]);

for (const clip of CLIPS) {
  registerModuleVariants(`recording.wrap.${clip}`, [
    { when: { studentId: 2, recordingStage: [0, 1, 2] }, weight: W, text: [
      `Kylie reviews the ${clip} clip — "That's the one," she says. {subject.lbs} pounds, content creator satisfied.`,
    ]},
    { when: { studentId: 5 }, weight: W, text: [
      `Destiny shrugs at the ${clip} take. "Ship it," she says. {subject.lbs} lbs, patch notes optional.`,
    ]},
    { when: { studentId: 10 }, weight: W, text: [
      `Reneé tastes the silence after the ${clip} wrap. "Encore tomorrow," she murmurs.`,
    ]},
    { when: { studentId: 8 }, weight: W, text: [
      `Maya nods once at the ${clip} footage. Quiet approval. {subject.lbs} pounds, honest on camera.`,
    ]},
    { when: { studentId: 14 }, weight: W, text: [
      `Mary Jane fans herself. "${clip} take, sugar — I look edible."`,
    ]},
    { when: { studentId: 15, recordingStage: [3, 4, 5] }, weight: W, text: [
      `Lilith watches the ${clip} clip without blinking. Predator pleased. {subject.lbs} pounds, prey fed.`,
    ]},
    { when: { stageMin: 9, recordingStage: [4, 5] }, weight: 3, text: [
      `${clip} footage at immobile scale — crew packing, {subject.name} vast at {subject.lbs}.`,
    ]},
  ]);
}

registerModuleVariants('recording.payoff', [
  { when: { studentId: 2 }, weight: W, text: [
    `Kylie checks her phone. Clips uploading. {subject.lbs} pounds trending offline too.`,
  ]},
  { when: { studentId: 5 }, weight: W, text: [
    `Destiny queues the VOD. {subject.lbs} lbs — "good session," she says. Chat will agree.`,
  ]},
  { when: { studentId: 6 }, weight: W, text: [
    `Tiffany smooths her skirt. Chapter standards met. {subject.lbs} pounds, documented.`,
  ]},
  { when: { studentId: 13 }, weight: W, text: [
    `Daisy hums while packing plates. {subject.lbs} pounds fed and filmed — Southern hospitality complete.`,
  ]},
  { when: { studentId: 4, stageMin: 5 }, weight: W, text: [
    `Fiona notes the numbers. {subject.lbs} lbs — data and appetite aligned.`,
  ]},
  { when: { corruption: [2], stageMin: 6 }, weight: 3, text: [
    `{subject.name} at {subject.lbs} — no apology in the mirror, only appetite satisfied.`,
  ]},
]);
