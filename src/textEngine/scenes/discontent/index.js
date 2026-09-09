// The Squad — Lead: A2 Psych | Support: A6 Slender, A5 Editor
// ═══════════════════════════════════════════════════════════════
// DISCONTENT BEATS — how active unhappiness reads, never a meter.
// Overrides the roster tell when she's upset (priority-gated by tier)
// and supplies the line when she refuses a feed out of pique.
//   selector: discontentTier (global) ∈ 1 | 2 | 3
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../rosterTell/index.js'; // base roster.tell

// When she's unhappy, the at-a-glance tell is ABOUT that. priority:1
// hard-gates the steady-state vibe so her mood reads at a glance.
registerModuleVariants('roster.tell', [
  { when: { discontentTier: 1 }, priority: 1, text: [
    `keeping you at a cooler distance lately`,
    `a little short with you these days`,
  ]},
  { when: { discontentTier: 2 }, priority: 1, text: [
    `won't quite meet your eye anymore`,
    `simmering over something you did`,
  ]},
  { when: { discontentTier: 3 }, priority: 1, text: [
    `done pretending she isn't furious with you`,
    `one wrong move from walking out`,
  ]},
  // A content resident with an empty seat in the room — no priority, so it just
  // joins the base pool and surfaces now and then (her own grievance, if she
  // has one, still priority-gates this out).
  { when: { residentWithdrawn: true }, weight: 3, text: [
    `glancing now and then at the bunk a resident left empty`,
    `quieter than usual since one of them walked out on you`,
  ]},
]);

// Shape: DIALOGUE BEAT — she balks at a feed out of pique.
registerPool('discontent.refuse', [
  { when: {}, text: [
    `{subject.name} pushes the plate back. "I'm not hungry. Not for anything from you right now."`,
    `{subject.name} turns her face away from the food. "No. Not while I'm still angry with you."`,
  ]},
  { when: { discontentTier: 3 }, weight: 3, text: [
    `{subject.name} folds her arms and won't even look at it. "No. Fix what you did first."`,
  ]},
]);

export function renderDiscontentRefusal(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  const base = render('{discontent.refuse}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'discontent', ctx, opts.v2DepthChance ?? 0.3);
}
