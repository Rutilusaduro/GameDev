// The Squad — Lead: C1 Gossip | Support: C2 React
// ═══════════════════════════════════════════════════════════════
// GOSSIP SCENE — resident-to-resident awareness beats.
//   gossip.react.notice  — hall registers a visible change (scaleBreak | stageUp)
//   gossip.react.line    — reactor's personal take (archetype × corruption × memType)
//   gossip.murmur        — ambient hall awareness, no specific event
//
// Selectors from pickHallMemory(): memName, memType, memWeeksAgo.
// Reactor archetype/corruption drawn from subject via engine.
// ═══════════════════════════════════════════════════════════════
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass2.js';

// ── gossip.react.notice ───────────────────────────────────────
// Neutral, observational. The hall notices someone changed.
registerPool('gossip.react.notice', [
  { when: {}, text: [
    `She's clocked the change. Hasn't said anything yet.`,
    `The hall updates quietly, without meeting anyone's eyes.`,
  ]},
  { when: { memType: 'scaleBreak' }, weight: 3, text: [
    (ctx) => `${ctx.globals?.memName ?? 'She'} broke the scale this week. The number went around the room before the hour was out.`,
    (ctx) => `The hall registered ${ctx.globals?.memName ?? 'her'} differently after the scale — the way attention shifts when a fact becomes undeniable.`,
    (ctx) => `${ctx.globals?.memName ?? 'She'} doesn't weigh what she weighed. The scale said so. Everyone knows.`,
  ]},
  { when: { memType: 'stageUp' }, weight: 3, text: [
    (ctx) => `${ctx.globals?.memName ?? 'She'} crossed a stage this week. It shows.`,
    (ctx) => `The way ${ctx.globals?.memName ?? 'she'}'s been filling out — it registered on the room before it registered on her.`,
    (ctx) => `${ctx.globals?.memName ?? 'She'} is bigger than she was. The hall has updated its read on her.`,
  ]},
]);

// ── gossip.react.line ─────────────────────────────────────────
// Optional beat — reactor's private take. Falls silent by default.
// Keyed on reactor's archetype, corruption tier, and memType.
registerPool('gossip.react.line', [
  // Wildcard: silent (optional beat — fires empty on no match).
  { when: {}, text: ['', '', ''] },

  // Athlete
  { when: { archetype: 'athlete', memType: 'scaleBreak' }, weight: 3, text: [
    `She runs the math without meaning to. That's more than her. She knows it.`,
    `Her jaw tightens for just a second. Competitive instinct. She doesn't comment.`,
  ]},
  { when: { archetype: 'athlete', memType: 'stageUp' }, weight: 3, text: [
    `She catches herself clocking the change — arms, waist, the new drag in how the other resident moves.`,
    `Different body means different numbers. She files it. She'll clock it again next week.`,
  ]},

  // Influencer
  { when: { archetype: 'influencer', memType: 'stageUp' }, weight: 3, text: [
    `She already knows the angle. Before-and-after, the right light, the right caption. She's a project now.`,
    `She files it: the new proportions, where the weight landed, whether the camera would love it.`,
  ]},
  { when: { archetype: 'influencer', memType: 'scaleBreak' }, weight: 3, text: [
    `Numbers mean reach. She's already thinking about what kind of content she could make.`,
    `She does the brand math automatically. She has a niche now whether she knows it or not.`,
  ]},

  // Bookworm
  { when: { archetype: 'bookworm', memType: 'stageUp' }, weight: 3, text: [
    `She looks, then looks away, then looks back. Her pen hasn't moved in a minute.`,
    `She's been tracking it longer than she'll admit. The change is measurable. She measured it.`,
  ]},
  { when: { archetype: 'swimmer', memType: 'stageUp' }, weight: 3, text: [
    `She looks, then looks away, then looks back. Her marker hasn't moved on the training log in a minute.`,
    `She's been tracking it longer than she'll admit. The curve is real. She logged it.`,
  ]},
  { when: { archetype: 'bookworm', memType: 'scaleBreak' }, weight: 3, text: [
    `She marks the week in her head. She tracks things. She's been doing it for a while.`,
    `The number interests her more than she expected it to. She thinks about it on the walk home.`,
  ]},
  { when: { archetype: 'swimmer', memType: 'scaleBreak' }, weight: 3, text: [
    `She marks the week in her log before she forgets the number.`,
    `The weigh-in interests her more than she expected. She thinks about it on the walk back from the natatorium.`,
  ]},

  // Artsy
  { when: { archetype: 'artsy', memType: 'stageUp' }, weight: 3, text: [
    `She reads the other resident's new shape the way she reads a canvas — noting what changed, and where it landed.`,
    `Soft fullness. She's taking mental notes without knowing she is.`,
  ]},
  { when: { archetype: 'artsy', memType: 'scaleBreak' }, weight: 3, text: [
    `She stopped thinking about the number. She's been watching the body doing the work.`,
    `Weight as material. She thinks about it that way without meaning to.`,
  ]},

  // Corruption tier 0 — discomfort-recognition
  { when: { corruption: [0] }, weight: 2, text: [
    `Recognition, and she doesn't know what to do with it. She looks away.`,
    `She knows that feeling. She won't say so.`,
  ]},

  // Corruption tier 2 — proprietary / envious
  { when: { corruption: [2] }, weight: 2, text: [
    `She watches the other resident the way someone watches a thing they thought was theirs.`,
    `Something tightens in her jaw. She turns back to her food and eats faster.`,
  ]},
]);

// ── gossip.murmur ─────────────────────────────────────────────
// Ambient hall awareness — no specific event, no named resident.
registerPool('gossip.murmur', [
  { when: {}, text: [
    `The hall moves around each other differently now. Everyone's tracking, even when nobody says it.`,
    `Glances cross the room — at thighs, at waistbands, at who's going back for seconds. A whole conversation without words.`,
    `She knows the room is watching her. They all know. The watching has become the weather.`,
    `The residents have their own accounting. It runs parallel to whatever you think is happening.`,
    '',
  ]},
]);

/** Render a reactive gossip beat for reactor noticing target's change.
 * Pass memName, memType, memWeeksAgo from pickHallMemory() in opts.globals.
 * Composes notice + line (line fires silently when no archetype match). */
export function renderGossipReact(reactor, week = 1, opts = {}) {
  if (!reactor) return '';
  const ctx = buildTextContext({
    subject: reactor,
    week,
    globals: {
      memName: opts.memName ?? null,
      memType: opts.memType ?? null,
      memWeeksAgo: opts.memWeeksAgo ?? null,
      ...(opts.globals || {}),
    },
    ...opts,
  });
  const notice = render('{gossip.react.notice}', ctx, { trace: opts.trace || null })?.trim() || '';
  const line = render('{gossip.react.line}', ctx, { trace: opts.trace || null })?.trim() || '';
  const composed = notice && line ? `${notice} ${line}` : notice || line;
  const glow = render('{gossip.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const withGlow = [composed, glow].filter(Boolean).join(' ');
  return appendV2Depth(withGlow, 'gossip', ctx, opts.v2DepthChance ?? 0.28);
}

/** Render ambient hall-awareness murmur (no specific event). */
export function renderGossipMurmur(reactor, week = 1, opts = {}) {
  if (!reactor) return '';
  const ctx = buildTextContext({ subject: reactor, week, ...opts });
  const base = render('{gossip.murmur}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'gossip', ctx, opts.v2DepthChance ?? 0.22);
}
