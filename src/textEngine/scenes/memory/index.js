// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
// ═══════════════════════════════════════════════════════════════
// MEMORY BEATS — short callbacks that make the world accrue.
// The memory store (gameData/memory.js) records notable events; this
// renders a reference to one: a same-week feast still working on her, a
// long-arc milestone, or cross-resident gossip about someone else.
//
//   memory.self  — her own history (memScope × memType, {memWeeksAgo})
//   memory.hall — what the hall remembers about another resident ({memName})
//   memory.class — legacy alias pool (same variants; kept for old templates)
//
// Selectors arrive as ctx.globals: memScope, memType, memWeeksAgo, memName.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

// ── memory.self ───────────────────────────────────────────────
// Shape: SHORT SENTENCE — a callback to her own recent past.
// Wired into: weighIn, dinner, stream scenes via renderMemorySelf().
registerPool('memory.self', [
  // Mandatory fallback (also the lint-sweep render when no globals set).
  { when: {}, text: [
    `There's a history in the way she settles into all this now.`,
  ]},
  { when: { memScope: 'sameWeek', memType: 'feast' }, weight: 3, text: [
    `That feast from a few days ago still hasn't worn off — she's been bottomless since.`,
    `The big meal earlier this week is still with her; her appetite hasn't quieted down since.`,
  ]},
  { when: { memScope: 'sameWeek', memType: 'forced' }, weight: 3, text: [
    `She's still carrying the meal you pushed past her limit earlier this week, heavy and warm.`,
    `The full weight of what you fed her earlier hasn't settled yet — she's softer than usual, slower.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stageUp' }, weight: 3, text: [
    (ctx) => `Hard to believe it's only been ${ctx.globals?.memWeeksAgo ?? 'a few'} weeks since everything still fit her.`,
    (ctx) => `${ctx.globals?.memWeeksAgo === 1 ? 'Last week' : `${ctx.globals?.memWeeksAgo ?? 'A few'} weeks ago`}, she crossed a line she can't uncross — and she's been different since.`,
  ]},
  { when: { memScope: 'longArc', memType: 'scaleBreak' }, weight: 3, text: [
    `The scale still hasn't forgiven her, weeks on.`,
    `She's never quite looked at the scale the same way since it gave up under her. Neither have you.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stuffed' }, weight: 3, text: [
    `She hasn't had a week that wasn't spent full in longer than she'd care to admit.`,
    `Being stuffed has started to feel less like an event and more like a condition — she barely notices the weight of it anymore.`,
  ]},

  // ── weigh-in context variants (more specific = higher priority) ──────
  // These fire when the memory callback is rendered inside a weigh-in.
  { when: { memScope: 'sameWeek', memType: 'feast', scene: 'weighIn' }, weight: 4, text: [
    `She steps on already heavier than last week's baseline — the feast is still showing, numbers and all.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stageUp', scene: 'weighIn' }, weight: 4, text: [
    (ctx) => `The number today is higher than it was ${ctx.globals?.memWeeksAgo ?? 'a few'} weeks ago when she first crossed the threshold — but the shock has worn smooth.`,
  ]},
  { when: { memScope: 'longArc', memType: 'scaleBreak', scene: 'weighIn' }, weight: 4, text: [
    `She stands on the new scale without ceremony. The old one is a memory — but it's the kind that stays.`,
  ]},

  // ── dinner context variants ───────────────────────────────────────────
  { when: { memScope: 'sameWeek', memType: 'forced', scene: 'dinner' }, weight: 4, text: [
    `She orders more than usual without thinking about it — the threshold from earlier this week moved without her permission, and her stomach filed the update.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stuffed', scene: 'dinner' }, weight: 4, text: [
    `There was a night she ate until she couldn't move, and something about the way she attacks the menu now suggests she's been chasing that feeling back.`,
  ]},

  // ── bond-shift long-arc callbacks ────────────────────────────────────
  // Fires when a relationship-tier crossing is remembered (bondShift type).
  // memValue carries the trust direction: 'trust+' | 'trust++' | 'trust+++'
  { when: { memScope: 'longArc', memType: 'bondShift' }, weight: 3, text: [
    (ctx) => `Something settled between you ${ctx.globals?.memWeeksAgo === 1 ? 'last week' : `${ctx.globals?.memWeeksAgo ?? 'a few'} weeks ago`} — she hasn't quite gone back to keeping her guard up.`,
    (ctx) => `The shift happened ${ctx.globals?.memWeeksAgo === 1 ? 'last week' : `${ctx.globals?.memWeeksAgo ?? 'a few'} weeks ago`} and it's still in the air between you.`,
  ]},
  { when: { memScope: 'longArc', memType: 'bondShift', memValue: 'trust++' }, weight: 4, text: [
    (ctx) => `She let you closer ${ctx.globals?.memWeeksAgo === 1 ? 'last week' : `${ctx.globals?.memWeeksAgo ?? 'weeks'} back`} than she lets most people get. She hasn't walked it back.`,
    (ctx) => `There's a version of her she only started showing you ${ctx.globals?.memWeeksAgo === 1 ? 'recently' : `about ${ctx.globals?.memWeeksAgo ?? 'a few'} weeks ago`} — softer, less performed.`,
  ]},
  { when: { memScope: 'longArc', memType: 'bondShift', memValue: 'trust+++' }, weight: 4, text: [
    (ctx) => `She's given you something real — you could feel it the moment it happened, ${ctx.globals?.memWeeksAgo === 1 ? 'last week' : `${ctx.globals?.memWeeksAgo ?? 'a few'} weeks ago`}. She still looks at you differently for it.`,
    `The closeness between you now has weight to it. Like something that was decided and can't be undecided.`,
  ]},

  // ── stream context variants ───────────────────────────────────────────
  { when: { memScope: 'sameWeek', memType: 'feast', scene: 'stream' }, weight: 4, text: [
    `She's still riding the memory of that big meal — reckless with her stomach in a way she usually earns slowly over rounds.`,
  ]},
  { when: { memScope: 'longArc', memType: 'stageUp', scene: 'stream' }, weight: 4, text: [
    (ctx) => `${ctx.globals?.memWeeksAgo === 1 ? 'Last week' : `${ctx.globals?.memWeeksAgo ?? 'A few'} weeks ago`}, her body crossed a stage she can feel on camera — the way she moves in frame has changed since.`,
  ]},
]);

// ── memory.hall — cross-resident floor memory ─────────────────
// Shape: SHORT SENTENCE — what the hall remembers about someone else.
const MEMORY_HALL_VARIANTS = [
  { when: {}, text: [
    `The residents keep a quiet eye on how the others are changing.`,
  ]},
  { when: { memType: 'scaleBreak' }, weight: 3, text: [
    (ctx) => `The hall still hasn't stopped talking about ${ctx.globals?.memName ?? 'one of the others'} and the scale.`,
  ]},
  { when: { memType: 'stageUp' }, weight: 3, text: [
    (ctx) => `Everyone's noticed how much ${ctx.globals?.memName ?? 'one of the others'} has filled out lately.`,
  ]},
];
registerPool('memory.hall', MEMORY_HALL_VARIANTS);
registerPool('memory.class', MEMORY_HALL_VARIANTS);

/** Render a callback to this resident's own recent history. */
export function renderMemorySelf(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  const base = render('{memory.self}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'memory', ctx, opts.v2DepthChance ?? 0.25);
}

/** Render cross-resident gossip about another resident. */
export function renderMemoryHall(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, globals: { ...opts } });
  const base = render('{memory.hall}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'memory', ctx, opts.v2DepthChance ?? 0.22);
}

/** @deprecated use renderMemoryHall — save-compat alias */
export const renderMemoryClass = renderMemoryHall;

/**
 * Scene-aware memory callback. Pass scene: 'weighIn' | 'dinner' | 'stream'
 * in opts to pick up context-specific variants. Also pass the globals returned
 * by pickStudentMemory() (memScope, memType, memWeeksAgo).
 * Returns '' when nothing memorable has been stored (safe to discard).
 */
export function renderMemoryCallback(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: {
      scene: opts.scene || null,
      memScope: opts.memScope || null,
      memType: opts.memType || null,
      memWeeksAgo: opts.memWeeksAgo || null,
      memValue: opts.memValue || null,
      ...(opts.globals || {}),
    },
  });
  return appendV2Depth(
    render('{memory.self}', ctx, { trace: opts.trace || null })?.trim() || '',
    'memory',
    ctx,
    opts.v2DepthChance ?? 0.28,
  );
}
