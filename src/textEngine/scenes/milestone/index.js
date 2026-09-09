// The Squad — Lead: A1 Mobile | Support: A3 Immobility, A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// MILESTONE CEREMONY — the stage-crossing set-piece.
// A stage-up used to surface as a clothing line buried in the log at a
// 400ms delay, or folded into the generic "🌊 GROWTH EVENT" popup shared
// with device ticks. This gives the moment its own ceremony: the new
// body she's grown into (body-as-she-grows, the erotic core), the garment
// that finally gives (reusing {cloth.scene}), and her reaction to crossing
// the line. Numbers stay as punctuation — the modal frames the size shift.
//
//   milestone.body  — what she's grown into (stage-banded, lexicon-reused)
//   milestone.crest — the charged peak as the new size lands (stage+corruption)
//   milestone.line  — her reckoning with crossing the threshold (persona)
//   milestone       — skeleton "{body} {cloth.scene} {crest} {line}"
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../clothing/index.js'; // ensures {cloth.scene} is registered

// ── milestone.body ────────────────────────────────────────────
// Shape: FULL SENTENCE — present-tense, observational, appreciative.
// Banded across the ladder so a small resident's crossing reads nothing
// like a colossal one. Reuses {word.*} instead of re-describing bodies.
// First beat of the crescendo: what she has grown into.
registerPool('milestone.body', [
  // Mandatory generic fallback.
  { when: {}, text: [
    `There is more of her this week and it announces itself — {word.body}, soft and warm and newly abundant.`,
    `The change has caught up with her all at once — {word.body}, a deeper, warmer fullness than there was a week ago.`,
  ]},
  { when: { stageMax: 2 }, weight: 2, text: [
    `The new softness is unmistakable now — {word.body}, a plush, pillowy give to her that simply wasn't there a week ago.`,
    `She is rounder everywhere the eye lands — {word.body}, soft and warm and just beginning to spread into herself.`,
    `There's a tender new fullness to her — {word.body}, the kind of soft weight a hand wants to find and rest against.`,
  ]},
  { when: { stageMin: 3, stageMax: 4 }, weight: 2, text: [
    `She fills everything differently now — {word.body}, rounder and heavier and warm under the hand, her whole shape gone generous.`,
    `The weight has settled into her in earnest — {word.body}, a soft heaviness that {word.movement} and asks to be noticed.`,
    `She is unmistakably softer, fuller, more — {word.body}, every curve deepened, the new richness sitting warm and easy on her.`,
  ]},
  { when: { stageMin: 5, stageMax: 6 }, weight: 2, text: [
    `She is undeniably bigger — {word.body}, {word.movement}, every motion carrying soft new weight that sways and settles.`,
    `There is simply more of her, and it moves — {word.body}, heavy and lush, the soft mass of her shifting slow and warm.`,
    `She has grown into a body that leads with its softness — {word.body}, {word.movement}, abundant and unhurried and impossible to ignore.`,
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 2, text: [
    `{word.body} — she takes up real space now, {word.movement}, warm and vast and impossible to look away from.`,
    `She has become a great soft expanse of herself — {word.body}, {word.movement}, every part of her deep and heavy and gloriously full.`,
    `There is so much of her now, and all of it warm — {word.body}, spreading and settling, a body that arrives in a room and stays arriving.`,
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    `{word.body}; she has crossed into something monumental, {word.movement}, sheer soft weight the room has to arrange itself around.`,
    `She is vast now in a way that rewrites the space around her — {word.body}, immense and soft and slow, settling by degrees long after she stops.`,
    `Everything about her is enormous and unhurried — {word.body}, a landscape of warm soft weight spreading gently into its own gravity.`,
  ]},
]);

// ── milestone.crest ───────────────────────────────────────────
// Shape: FULL SENTENCE — the charged peak of the ceremony. After the
// garment gives ({cloth.scene}), the new size *lands* and keeps landing:
// heat, stillness, soft mass settling a beat behind itself. Stage bands
// scale the physical peak (full ladder coverage); corruption-keyed
// generics shade the wanting and stay size-neutral so they cover everyone.
registerPool('milestone.crest', [
  // Mandatory generic fallback.
  { when: {}, text: [
    `And then it lands — the new size of her settling all at once, warm and certain, the air in the room gone close and slow.`,
  ]},
  { when: { stageMax: 2 }, weight: 2, text: [
    `She goes still, and the new weight settles through her like warmth finding its level, a slow secret bloom she feels everywhere at once.`,
    `For a moment she just feels it — the soft new give of herself settling warm against her own hands, and her breath catches on the wanting it.`,
  ]},
  { when: { stageMin: 3, stageMax: 4 }, weight: 2, text: [
    `For a long breath she only feels it — the soft heft of herself shifting as it settles, {word.breathQuality}, the change rolling warm all the way down.`,
    `The new fullness rolls through her and pools low and heavy, and she lets it, palms pressed to the warm spread of herself while it finds its place.`,
  ]},
  { when: { stageMin: 5, stageMax: 6 }, weight: 2, text: [
    `The new size of her lands and keeps landing — {word.movement}, soft mass settling in slow warm increments while the room holds still around her.`,
    `It moves through her in a slow warm wave, the heavy give of her shifting and resettling, every soft inch arriving a moment behind the last.`,
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 2, text: [
    `It moves through her in waves — the vast warm weight of her settling and resettling, {word.movement}, the change rippling outward long after the breath that fed it.`,
    `She settles in slow heavy stages, soft mass finding soft mass, the sheer warm abundance of her arriving by degrees and in no hurry at all.`,
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    `She settles by slow degrees, immense and unhurried, the sheer warm mass of her finding its place long after she has stopped — a tide coming in and staying.`,
    `The change moves through all that softness like weather, slow and total, every vast warm part of her settling a heartbeat behind the part before it.`,
  ]},
  // ── corruption shading — size-neutral, covers everyone ──
  { when: { corruption: [0] }, weight: 2, text: [
    `Heat climbs her throat as it settles, and the thing she feels underneath the alarm is something she has no name for yet.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She lets the new weight settle without flinching from it, and the warmth that comes up after it is unmistakably wanting.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `The size of her lands and she leans into it, already hungry for the next threshold before this one has finished settling.`,
  ]},
]);

// ── milestone.line ────────────────────────────────────────────
// Shape: DIALOGUE / BEHAVIOR BEAT — her reckoning with the threshold.
registerPool('milestone.line', [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany turns side-on in the mirror, hands sliding down her new curves, and decides she likes what she's become.`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy notes the threshold crossed with quiet, athletic satisfaction, as though confirming a season plan she'd grown fond of.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie films the reveal from three angles, breathless. "Okay no, you guys have to see how much softer I got."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena grips a fistful of the new softness, half-defiant, half-thrilled. "Yeah. Yeah, okay. I'm bigger. I felt it."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona studies her changed silhouette like a finished canvas, slow and reverent, and finds it beautiful.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny tugs the hem that won't reach anymore, shrugs, and keeps eating. "Guess I'm a bigger build now. Cool."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany shrieks and makes everyone witness it. "I went UP a size, oh my god, feel this, no FEEL it."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya recalculates her wardrobe budget against the new measurements, files the milestone, and feels a flush she doesn't log.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya runs both palms slowly over the new fullness, meets your eyes in the mirror, and lets a small, certain smile answer for her.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé takes in the bigger woman in the glass with cool, sultry approval. "Mm. The country suits me. Who knew."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé regards the new heft of herself like a dish that came out perfect. "Oh, that's lovely. That's exactly right."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee cradles the soft new weight with a warm, knowing patience, entirely at home in the bigger body.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia describes her own arousal at the change in clinical third person, fascinated that the threshold thrills her at all.`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy hugs the new softness to herself and beams. "Well look at me now — there's so much more of me to go around."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane plants her hands on her broader hips and laughs, sunny and proud. "Grew into myself, I reckon. About time."`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia stares at the bigger reflection, the alarm and the wanting wrestling, and the wanting settling on top.`,
  ]},
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    `Talia logs the new dimensions, frowns at the readout, then catches herself running a hand over the change anyway.`,
  ]},

  // ── corruption generics — cover everyone, shade by psyche ───
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} catches the bigger woman in the mirror, and the flush that climbs her neck isn't all alarm.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} takes in the threshold she's crossed and, for the first time, doesn't reach for a way back.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} faces the bigger version of herself and wants, plainly and without apology, to be bigger still.`,
  ]},

  // Mandatory fallback.
  { when: {}, text: [
    `{subject.name} regards the new fullness of herself and lets it settle in, warm and undeniable.`,
  ]},
]);

// ── milestone — composed skeleton ─────────────────────────────
// The crescendo, in four beats: the body she's grown into → the garment
// giving way → the charged peak as the new size lands → her reckoning.
registerPool('milestone', [
  { when: {}, text: ['{milestone.body} {cloth.scene} {milestone.crest} {milestone.line}'] },
]);

/**
 * Render a stage-crossing ceremony beat.
 * @param student   post-stage-up snapshot
 * @param week
 * @param opts.clothingState  drives {cloth.scene} (button_pop … waistband_surrender)
 */
export function renderMilestone(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{milestone}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'milestone', ctx, opts.v2DepthChance ?? 0.4);
}
