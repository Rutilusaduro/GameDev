// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// IMMOBILITY ARRIVAL — "Hold Court" capstone narration (stages 10-11).
// The player brings the world to her where she rests; she settles deeper
// into being kept, and the bond answers. Three beats:
//   immob.arrival.tend     — you bring the day to her (the caretaking-at-scale)
//   immob.arrival.deepen   — she goes on arriving, kept and softening further
//   immob.arrival.devotion — her contentment / being adored (corruption beat)
//   immob.arrival          — skeleton "{tend} {deepen} {devotion}"
// House voice: celebrated, never medicalized; vastness and being kept; adored.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import './fragments.js';

// ── immob.arrival.tend ────────────────────────────────────────
// Shape: FULL SENTENCE — the player bringing the day to her.
registerPool('immob.arrival.tend', [
  { when: {}, text: [
    `You bring the day to {subject.name} where she rests — the food, the warmth, the company, all of it arriving at her now instead of the other way around.`,
    `Court happens where she lies — you ferry trays, news, and touch to the warm center of her mass.`,
    `The world comes to her in pieces you carry: meals, blankets, conversation, devotion.`,
    `You tend her where she has settled — vast, warm, immobile — and the tending becomes the day's purpose.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `She holds court from the warm center of the room, and you tend her there — trays carried in, cushions eased under her, every comfort delivered to the vast soft spread of her.`,
    `There is no question of her coming to anything anymore; you bring it instead, laying the meal and the slow afternoon within easy reach of her settled, spreading warmth.`,
    `You move through the day in orbit of her, ferrying the world in piece by piece to where {subject.name} has come to rest, and she receives all of it like her due.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `The room belongs to her entirely now, and you keep it that way — attending the immense warm expanse of her, bringing the world in by degrees to where she has come to rest for good.`,
    `She presides over the whole space simply by filling it, and you tend her like a season's harvest, carrying everything she could want to the slow warm gravity of where she lies.`,
    `You keep court for her where she has settled — vast and unhurried and going nowhere — and the tending of her has become the warm center your own day turns around.`,
  ]},
]);

// ── immob.arrival.deepen ──────────────────────────────────────
// Shape: FULL SENTENCE — kept, she goes on arriving. Reuses {word.movement}.
registerPool('immob.arrival.deepen', [
  { when: {}, text: [
    `And she settles deeper as you tend her, softening further into the shape of being kept, every comfort folding another warm degree into her.`,
    `Tended, she softens by degrees — mass rearranging, warmth spreading, the pleasure of being held in place.`,
    `Each comfort lands and stays; she grows softer under care, not smaller — more settled, more hers.`,
    `Being kept agrees with her. She shows it in how still she becomes when you adjust the cushions.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `Tended like this she keeps arriving — the soft mass of her easing a little further into the room with each attended hour, {word.movement} when she shifts and then going still again.`,
    `She grows softer under the care, not less, the warm weight of her spreading by slow contented inches into the space you keep clear for it.`,
    `Each tray you bring seems to add another warm layer — not suddenly, but by accumulation, until the room reshapes itself around her.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `Kept this completely she only becomes more so, the vast warm tide of her creeping outward by slow degrees, settling and resettling into ever more of the room.`,
    `There is no ceiling left for her to reach, only deeper to settle, and she does — softening outward without end while you keep the world arriving at her side.`,
    `Immobility has become a kind of growth: she does not rise, she expands — warm, slow, pleased with every inch the tending grants her.`,
  ]},
]);

// ── immob.arrival.devotion ────────────────────────────────────
// Shape: DIALOGUE / BEHAVIOR BEAT — her contentment, shaded by psyche.
registerPool('immob.arrival.devotion', [
  { when: {}, text: [
    `{subject.name} settles under your care, warm and vast and wholly content to be exactly where she is.`,
    `Contentment pools in her expression — vast body, small smile, absolute permission to stay.`,
    `She receives your tending like weather she ordered: warm, constant, deserved.`,
    `{subject.name} closes her eyes into the care and does not hurry to open them.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} watches you tend her with something soft and overwhelmed in her face. "You really don't mind," she says — not quite a question, not quite able to believe it.`,
    `She keeps waiting for you to flinch at the scale of her. You don't. {subject.name} exhales like a weight she didn't know she was holding.`,
    `"I could get used to this," {subject.name} murmurs — wonder and relief braided together.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} lets herself be tended without a flicker of the old protest, and the warmth in her eyes when she finds yours says she has stopped wanting anything but this.`,
    `The old shame surfaces once, flickers, and drowns in how good being kept feels. {subject.name} does not rescue it.`,
    `"Stay," she says — not to the room, to you. Court is warmer when you are in it.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} accepts the tending as her due, regal and glowing, and tells you plainly she means to be larger still by the time you next come to court her.`,
    `She receives your care like royalty receiving tribute — pleased, expectant, already planning the next course.`,
    `"More," she says softly. Not a request. A forecast.`,
  ]},
  // ── a few persona voices (weight 4) over the psyche generics ──
  { when: { studentId: 0, stageMin: 10 }, weight: 4, text: [
    `Brittany surveys the room arranged around her and smiles like a captain who never left the field. "Still in charge," she says. "Just from here now."`,
    `"Home field advantage," she says. "I never left."`,
    `Victory looks immobile. She is not complaining.`,
  ]},
  { when: { studentId: 10, stageMin: 10 }, weight: 4, text: [
    `Reneé tastes what you've brought her, closes her eyes, and sighs the sigh of a cook who has finally let someone else carry the plates. "Perfect," she says. "Bring the rest."`,
    `"Course one of care," she murmurs. "I want the full menu."`,
    `Warmth and flavor and your hands nearby — she approves the pairing.`,
  ]},
  { when: { studentId: 8, stageMin: 10 }, weight: 4, text: [
    `Maya doesn't say anything. She finds your hand where it rests against the warm slope of her, holds it there, and lets the quiet say it for her.`,
    `She watches you tend her without comment — gratitude in the pressure of her fingers on yours.`,
    `Stillness is her language. Your care is the translation.`,
  ]},
  { when: { studentId: 12, stageMin: 10 }, weight: 4, text: [
    `Nadia watches you arrange the tray within reach. "Good," she says. "The experiment continues. I am the result."`,
    `She tracks your hands as you tend her. "Hypothesis confirmed," she murmurs. "I like being kept."`,
    `"Control variable: you," she says. "Outcome: excellent."`,
  ]},
  { when: { studentId: 5, stageMin: 10 }, weight: 4, text: [
    `Destiny eats one-handed while you adjust her cushions. "Offline comfort meta," she says. "Ten out of ten."`,
    `"Stream's off. Appetite isn't," Destiny says, settling deeper. "Keep the trays coming."`,
    `"Patch notes: happier. Changelog: fuller."`,
  ]},
  { when: { studentId: 14, stageMin: 10 }, weight: 4, text: [
    `Mary Jane hums while you tend her — farm warmth, farm patience, belly rising and falling like harvest season.`,
    `"You're good to me," she says softly. "Now bring the seconds."`,
    `"Set a spell," she murmurs. "I'm in no hurry to get up."`,
  ]},
]);

registerPool('immob.arrival', [
  { when: {}, text: [
    '{immob.arrival.tend} {immob.arrival.deepen} {immob.arrival.devotion}',
    '{immob.arrival.tend} {immob.arrival.devotion} {immob.arrival.deepen}',
    '{immob.arrival.deepen} {immob.arrival.tend} {immob.arrival.devotion}',
    '{immob.arrival.tend} {immob.arrival.deepen}',
    '{immob.arrival.tend} {immob.arrival.devotion}',
  ] },
]);

/** Render a Hold Court capstone beat for an immobile student. */
export function renderImmobArrival(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{immob.arrival}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'immobility', ctx, opts.v2DepthChance ?? 0.38);
}
