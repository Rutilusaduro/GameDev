// The Squad — Lead: A2 Psych | Support: A6 Slender, A1 Mobile, A5 Editor
// ═══════════════════════════════════════════════════════════════
// ROSTER TELL — the at-a-glance "tell" for a class-grid tile.
// One terse, lowercase fragment that reads her current standing vibe
// through BEHAVIOR (where she is on the corruption arc, her appetite,
// her size) rather than a number or bar — so scanning the roster reads
// like reading a room. Steady-state, not event-reactive.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

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
  return render('{roster.tell}', ctx, { trace: opts.trace || null })?.trim() || '';
}
