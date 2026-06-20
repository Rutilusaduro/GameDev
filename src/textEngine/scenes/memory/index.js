// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// MEMORY BEATS — short callbacks that make the world accrue.
// The memory store (gameData/memory.js) records notable events; this
// renders a reference to one: a same-week feast still working on her, a
// long-arc milestone, or cross-girl gossip about someone else.
//
//   memory.self  — her own history (memScope × memType, {memWeeksAgo})
//   memory.class — what the class remembers about another girl ({memName})
//
// Selectors arrive as ctx.globals: memScope, memType, memWeeksAgo, memName.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

// ── memory.self ───────────────────────────────────────────────
// Shape: SHORT SENTENCE — a callback to her own recent past.
registerPool('memory.self', [
  // Mandatory fallback (also the lint-sweep render when no globals set).
  { when: {}, text: [
    `There's a history in the way she settles into all this now.`,
  ]},
  { when: { memScope: 'sameWeek', memType: 'feast' }, weight: 3, text: [
    `That feast from a few days ago still hasn't worn off — she's been bottomless since.`,
  ]},
  { when: { memScope: 'sameWeek', memType: 'forced' }, weight: 3, text: [
    `She's still carrying the meal you pushed past her limit earlier this week, heavy and warm.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stageUp' }, weight: 3, text: [
    (ctx) => `Hard to believe it's only been ${ctx.globals?.memWeeksAgo ?? 'a few'} weeks since everything still fit her.`,
  ]},
  { when: { memScope: 'longArc', memType: 'scaleBreak' }, weight: 3, text: [
    `The scale still hasn't forgiven her, weeks on.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stuffed' }, weight: 3, text: [
    `She hasn't had a week that wasn't spent full in longer than she'd care to admit.`,
  ]},
]);

// ── memory.class ──────────────────────────────────────────────
// Shape: SHORT SENTENCE — what the class remembers about someone else.
registerPool('memory.class', [
  { when: {}, text: [
    `The girls keep a quiet eye on how the others are changing.`,
  ]},
  { when: { memType: 'scaleBreak' }, weight: 3, text: [
    (ctx) => `The class still hasn't stopped talking about ${ctx.globals?.memName ?? 'one of the others'} and the scale.`,
  ]},
  { when: { memType: 'stageUp' }, weight: 3, text: [
    (ctx) => `Everyone's noticed how much ${ctx.globals?.memName ?? 'one of the others'} has filled out lately.`,
  ]},
]);

/** Render a callback to this girl's own recent history. */
export function renderMemorySelf(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  return render('{memory.self}', ctx, { trace: opts.trace || null })?.trim() || '';
}

/** Render cross-girl gossip about another girl. */
export function renderMemoryClass(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  return render('{memory.class}', ctx, { trace: opts.trace || null })?.trim() || '';
}
