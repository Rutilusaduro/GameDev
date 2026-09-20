// Force-feed refusal + past-capacity success beats.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

const REFUSAL_SRC = [
  (s) => `${s.name} presses a hand flat against her stomach and shakes her head. "I can't. I physically can't." She means it — this time.`,
  (s) => `${s.name} leans back, breathing carefully around the fullness. "Give me a minute. Or a week." She is not taking another bite.`,
  (s) => `${s.name} looks at the food, looks at you, and laughs — a short, breathless sound. "You're joking. Look at me. There's no room."`,
  (s) => `${s.name} groans softly and pushes the plate a deliberate inch away. "I'm at my limit. A real one. The kind with consequences."`,
];

const FORCE_SUCCESS_SRC = [
  (s) => `${s.name} hesitates — visibly, genuinely — and then opens her mouth anyway. Past full. Past sense. She finishes it with her eyes closed.`,
  (s) => `${s.name} whimpers, "I shouldn't," and keeps eating. The fullness has stopped being a wall and become a place she lives.`,
  (s) => `${s.name} takes it down slowly, one careful swallow at a time, both hands braced on the table. When it's gone she just breathes.`,
];

registerPool('feed.refusal', [
  {
    when: {},
    text: REFUSAL_SRC.map((fn) => (ctx) => fn(ctx.subject)),
  },
  {
    when: { feedRoom: 'tight' },
    weight: 2,
    text: [
      (ctx) => `${ctx.subject?.name || 'She'} shakes her head, belly snug. "No more room. Not even a bite."`,
      (ctx) => REFUSAL_SRC[0](ctx.subject),
    ],
  },
  {
    when: { feedRoom: 'past' },
    weight: 2,
    text: [
      (ctx) => `${ctx.subject?.name || 'She'} laughs once, breathless. "You see this, right? I'm done."`,
      (ctx) => REFUSAL_SRC[2](ctx.subject),
    ],
  },
]);

registerPool('feed.force.success', [
  {
    when: {},
    text: FORCE_SUCCESS_SRC.map((fn) => (ctx) => fn(ctx.subject)),
  },
  {
    when: { corruption: [1, 2] },
    weight: 2,
    text: [
      (ctx) => `${ctx.subject?.name || 'She'} opens anyway — past full, past protest, appetite winning.`,
      ...FORCE_SUCCESS_SRC.map((fn) => (ctx) => fn(ctx.subject)),
    ],
  },
]);

function buildFeedForceCtx(student, week, opts = {}) {
  return buildTextContext({
    subject: student,
    week,
    globals: {
      featureId: 'feed_force',
      feedRoom: opts.feedRoom || null,
      ...(opts.globals || {}),
    },
    ...opts,
  });
}

export function renderFeedRefusal(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildFeedForceCtx(student, week, opts);
  const raw = render('{feed.refusal}', ctx, { trace: opts.trace || null })?.trim()
    || `${student.name} refuses — no room left.`;
  return appendV2Depth(raw, 'feed', ctx, opts.v2DepthChance ?? 0.22);
}

export function renderForceFeedSuccess(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildFeedForceCtx(student, week, opts);
  const raw = render('{feed.force.success}', ctx, { trace: opts.trace || null })?.trim()
    || `${student.name} eats past full anyway.`;
  return appendV2Depth(raw, 'feed', ctx, opts.v2DepthChance ?? 0.28);
}
