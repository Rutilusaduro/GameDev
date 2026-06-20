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
//   milestone.body — what she's grown into (stage-banded, lexicon-reused)
//   milestone.line — her reckoning with crossing the threshold (persona)
//   milestone      — composed skeleton "{body} {cloth.scene} {line}"
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import '../clothing/index.js'; // ensures {cloth.scene} is registered

// ── milestone.body ────────────────────────────────────────────
// Shape: FULL SENTENCE — present-tense, observational, appreciative.
// Banded across the ladder so a small girl's crossing reads nothing
// like a colossal one. Reuses {word.*} instead of re-describing bodies.
registerPool('milestone.body', [
  // Mandatory generic fallback.
  { when: {}, text: [
    `There is more of her this week and it announces itself — {word.body}, soft and warm and newly abundant.`,
  ]},
  { when: { stageMax: 2 }, weight: 2, text: [
    `The new softness is unmistakable now — {word.body}, a plush, pillowy give to her that simply wasn't there a week ago.`,
  ]},
  { when: { stageMin: 3, stageMax: 4 }, weight: 2, text: [
    `She fills everything differently now — {word.body}, rounder and heavier and warm under the hand, her whole shape gone generous.`,
  ]},
  { when: { stageMin: 5, stageMax: 6 }, weight: 2, text: [
    `She is undeniably bigger — {word.body}, {word.movement}, every motion carrying soft new weight that sways and settles.`,
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 2, text: [
    `{word.body} — she takes up real space now, {word.movement}, warm and vast and impossible to look away from.`,
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    `{word.body}; she has crossed into something monumental, {word.movement}, sheer soft abundance the room has to arrange itself around.`,
  ]},
]);

// ── milestone.line ────────────────────────────────────────────
// Shape: DIALOGUE / BEHAVIOR BEAT — her reckoning with the threshold.
registerPool('milestone.line', [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany turns side-on in the mirror, hands sliding down her new curves, and decides she likes what she's become.`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline notes the threshold crossed with quiet, scholarly satisfaction, as though confirming a hypothesis she'd grown fond of.`,
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
  { when: { studentId: 18 }, weight: 4, text: [
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
// body she's grown into → the garment giving way → her reckoning.
registerPool('milestone', [
  { when: {}, text: ['{milestone.body} {cloth.scene} {milestone.line}'] },
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
  return render('{milestone}', ctx, { trace: opts.trace || null })?.trim() || '';
}
