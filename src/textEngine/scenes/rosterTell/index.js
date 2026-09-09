// The Squad — Lead: A2 Psych | Support: A6 Slender, A1 Mobile, A5 Editor
// ═══════════════════════════════════════════════════════════════
// ROSTER TELL — the at-a-glance "tell" for a roster tile.
// One terse, lowercase fragment that reads her current standing vibe
// through BEHAVIOR (where she is on the corruption arc, her appetite,
// her size) rather than a number or bar — so scanning the roster reads
// like reading a room. Steady-state, not event-reactive.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

// Shape: SHORT FRAGMENT (lowercase, no terminal period) — a vibe clause.
registerPool('roster.tell', [
  // Mandatory fallback.
  { when: {}, text: [
    'settling into more of herself by the week',
    'softer than she was, and still going',
  ]},

  // ── corruption arc, expressed as behavior ──────────────────
  { when: { corruption: [0] }, weight: 2, text: [
    'still startled by every new softness',
    'pretending not to notice how she fills out her clothes',
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    'arguing with the appetite, losing the argument',
    'caught between wanting more and admitting it',
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    'unhurried, indulgent, always reaching for more',
    'without a shred of apology left in her',
  ]},

  // ── appetite (steady disposition) ──────────────────────────
  { when: { hungerTierMin: 2 }, weight: 2, text: [
    'restless and hungry, eyes already on the next meal',
  ]},
  { when: { addictionLevelMin: 2 }, weight: 2, text: [
    'counting the hours until she gets to eat again',
  ]},

  // ── size vibe (stage bands) ────────────────────────────────
  { when: { stageMax: 1 }, weight: 2, text: [
    'soft in ways that are brand new to her',
  ]},
  { when: { stageMin: 7, stageMax: 8 }, weight: 2, text: [
    'vast and warm and impossible to ignore',
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    'a slow, monumental presence the room bends around',
  ]},
]);

/** Terse at-a-glance tell for a roster tile. */
export function renderRosterTell(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{roster.tell}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'roster', ctx, opts.v2DepthChance ?? 0.22);
}

// ═══════════════════════════════════════════════════════════════
// ECOLOGY REPORT-CARD — voiced beat surfacing the weekly favoritism
// state when the feed-gap threshold is crossed. Rendered once per
// week-close pass; consumes favoritismFlag global.
//
//   globals: favoritismFlag ∈ 'favored' | 'neglected'
//            favoritismName — the resident's name (for neglected framing)
// ═══════════════════════════════════════════════════════════════

// ── roster.ecologyReport.favored ─────────────────────────────
// Shape: SHORT SENTENCE — she's been getting the lion's share of attention.
registerPool('roster.ecologyReport.favored', [
  { when: {}, text: [
    `{subject.name} has had more of your time and attention this week than anyone else — she knows it, even if she hasn't said so.`,
    `You've come back to {subject.name} more than you've come back to anyone. She's been first in the queue, and she's getting used to that.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `{subject.name} has been fed first, fed most, and fed well — the calculus of the room is shifting around her without a word being spoken.`,
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    `The gap is showing in her body: {subject.name} has been gaining while the others hold steady, and she carries herself like someone who knows she's ahead.`,
  ]},
]);

// ── roster.ecologyReport.neglected ───────────────────────────
// Shape: SHORT SENTENCE — she's been left behind this week.
registerPool('roster.ecologyReport.neglected', [
  { when: {}, text: [
    `{subject.name} hasn't had much of your attention this week. She's noticed — in the way she doesn't quite meet your eyes anymore.`,
    `You've walked past {subject.name} more than you've stopped for her. There's a quietness to her that wasn't there before.`,
  ]},
  { when: { mood: ['sad', 'stressed'] }, weight: 2, text: [
    `{subject.name} is already running low on goodwill, and the neglect this week has made it worse. She looks like someone waiting to be remembered.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `{subject.name} hasn't been fed or spoken to in a week. For a resident still finding her footing here, the gap between her and whoever you've been spending time on is starting to feel like an answer.`,
  ]},
]);

// ── roster.ecologyReport — composed skeleton ──────────────────
// Selects the appropriate branch by favoritismFlag global.
registerPool('roster.ecologyReport', [
  { when: { favoritismFlag: 'favored' }, text: ['{roster.ecologyReport.favored}'] },
  { when: { favoritismFlag: 'neglected' }, text: ['{roster.ecologyReport.neglected}'] },
  // Mandatory fallback (fires when no gap, or lint sweep with no flag).
  { when: {}, text: [''] },
]);

/** Voiced report-card beat for one resident's favoritism state this week.
 *  Pass favoritismFlag: 'favored' | 'neglected' in opts. */
export function renderEcologyReport(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { favoritismFlag: opts.favoritismFlag || null, ...(opts.globals || {}) },
  });
  const base = render('{roster.ecologyReport}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'roster', ctx, opts.v2DepthChance ?? 0.3);
}
