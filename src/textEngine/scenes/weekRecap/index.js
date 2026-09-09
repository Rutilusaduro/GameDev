// The Squad — Lead: A2 Psych | Support: A1 Mobile, A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// WEEKLY RÉSUMÉ — narrate what the week DID to her at end-of-week.
// advanceWeek mutates a huge amount of state (passive gain, digestion,
// stuffing, stage-ups, corruption auto-eating) and used to flatten it
// into one "🧬 Digestion — Name +N lbs" log line. This scene turns the
// residents who actually moved into an in-voice recap beat, so the off-screen
// engine is FELT instead of invisible.
//
//   week.recap.beat — what the week's gain did to her body
//                     (gainBand × stagedUp × stuffedWeek × stage)
//   week.recap.line — her take on it (per-resident studentId weight 4,
//                     pooled with corruption-keyed generics)
//   week.recap      — composed skeleton "{beat} {line}"
//
// Custom selectors via ctx.globals:
//   gainBand   ∈ trace | solid | big | huge   (week lbs gained)
//   stagedUp   bool   — crossed a weight stage this week
//   stuffedWeek bool  — spent the week stuffed to capacity
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

// ── week.recap.beat ───────────────────────────────────────────
// Shape: FULL SENTENCE — present-tense, observational; reuses {word.*}.
registerPool('week.recap.beat', [
  // Mandatory generic fallback.
  { when: {}, text: [
    `A week of steady feeding has settled into her — {word.body}, a little more of her than there was seven days ago.`,
    `The week leaves its mark in the soft, warm way she carries herself now — {word.movement}.`,
  ]},

  // ── gainBand ───────────────────────────────────────────────
  { when: { gainBand: 'trace' }, weight: 2, text: [
    `It is a quiet week's worth — a softer curve here, a little more give there, the kind of gain you feel before you see.`,
  ]},
  { when: { gainBand: 'solid' }, weight: 2, text: [
    `A solid week shows on her plainly now — {word.clothingFit}, every soft part of her a degree fuller than it was.`,
  ]},
  { when: { gainBand: 'big' }, weight: 2, text: [
    `She has put on real weight this week and it reads everywhere — {word.body}, heavier and rounder and warmer to the touch.`,
  ]},
  { when: { gainBand: 'huge' }, weight: 2, text: [
    `The week has remade her. {word.clothingFit}, and there is visibly, undeniably more of her in every direction you look.`,
  ]},

  // ── milestones ─────────────────────────────────────────────
  { when: { stagedUp: true }, weight: 3, text: [
    `Something crossed over this week — {word.clothingFit}, her body past a line it is not coming back from.`,
  ]},
  { when: { stuffedWeek: true }, weight: 3, text: [
    `She spent the week full to the brim and it shows — {word.body}, packed soft and round by seven days of never quite stopping.`,
  ]},

  // ── stage escalation (reuse lexicon) ───────────────────────
  { when: { stageMin: 8 }, weight: 2, text: [
    `{word.movement}; another week's weight has folded into a body that already fills whatever room it is in.`,
  ]},
]);

// ── week.recap.line ───────────────────────────────────────────
// Shape: INTERIOR / DIALOGUE BEAT — how she reckons with the week.
registerPool('week.recap.line', [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany tugs her waistband, half a complaint, half a dare. "Yeah, yeah. The squad noticed. So did I."`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy records the change in her notebook with detached precision, then underlines the number twice.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie checks her profile in the mirror, turns, and decides — out loud, for the feed — that she loves it.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena prods the new softness over her abs, scowls, then catches herself almost liking the weight of it.`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona drapes a hand along the new curve like she is studying a sculpture she did not plan but cannot stop admiring.`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny notices her hoodie sitting tighter, shrugs, and reaches for the snack she had already opened. "Worth it."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany squeals and makes the whole chapter feel her arm. "I'm getting so soft, oh my god, isn't it the best?"`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya logs the gain against the week's schedule, files it as on-target, and moves to the next item without slowing.`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya runs both hands down her fuller sides, quiet and unbothered, and lets the difference simply be true.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé considers the change in the glass with cool, sultry approval. "Well. The semester is being good to me."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé pats the week's work into place like a finished dish and pronounces herself satisfied with the result.`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee cups the new softness with a nurse's matter-of-factness and a private little smile she does not explain.`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia narrates her own delight at the change in the third person, fascinated by how little she minds.`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy giggles and gives her rounder middle a fond little shake. "Well would you look at that. More to love."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane plants her hands on her widening hips, sunny about all of it. "Good country eating, that's all that is."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith assesses the week's gain with predatory calm. "Acceptable," she says. "Continue."`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia stares at the number a beat too long, the want and the worry tangling, and the want quietly winning.`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana maps the new curve like terrain. "Buried treasure," she grins. "Week well spent."`,
  ]},
  { when: { studentId: 18, custom: false }, weight: 4, text: [
    `Talia measures the change, frowns at the data, then notes — almost to herself — that she does not want to reverse it.`,
  ]},

  // ── corruption generics — cover every resident, shade by psyche ─
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} catches the difference in the mirror and looks away fast, a flush climbing her neck.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `{subject.name} notices the change and, for once, doesn't reach for a reason to undo it.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} runs her hands over the week's work and only wishes it had been more.`,
  ]},

  // Mandatory generic fallback.
  { when: {}, text: [
    `{subject.name} takes in the difference a week has made and lets it settle, warm and real.`,
  ]},
]);

// ── week.recap — composed skeleton ────────────────────────────
registerPool('week.recap', [
  { when: {}, text: ['{week.recap.beat} {week.recap.line}'] },
]);

/** Band a week's lbs gain into a gainBand selector. */
export function gainBandFromLbs(n = 0) {
  if (n >= 16) return 'huge';
  if (n >= 9) return 'big';
  if (n >= 4) return 'solid';
  return 'trace';
}

/**
 * Render a single girl's weekly recap beat.
 * @param student  post-digest student snapshot
 * @param week     the week that just ended
 * @param opts.gainBand / opts.stagedUp / opts.stuffedWeek
 */
export function renderWeekRecap(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      gainBand: opts.gainBand || gainBandFromLbs(opts.lbsGained || 0),
      stagedUp: !!opts.stagedUp,
      stuffedWeek: !!opts.stuffedWeek,
    },
    ...opts,
  });
  const base = render('{week.recap}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'weekRecap', ctx, opts.v2DepthChance ?? 0.35);
}
