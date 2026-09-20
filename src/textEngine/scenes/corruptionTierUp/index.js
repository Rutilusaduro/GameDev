// Corruption tier threshold announcements (modular).
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';

const TIER_UP_SRC = {
  1: (s) => `Something has shifted in ${s.name}. The guilt is losing. She lingers after eating now, like she's waiting for permission to want more.`,
  2: (s) => `${s.name} has stopped pretending entirely. Whatever she was protecting before — modesty, restraint, the person she used to be — she's traded it for appetite. She's proud of the trade.`,
};

for (const tier of [1, 2]) {
  const fn = TIER_UP_SRC[tier];
  registerPool(`corruption.tierUp.t${tier}`, [
    { when: {}, text: [(ctx) => fn(ctx.subject)] },
    { when: {}, text: [(ctx) => fn(ctx.subject)] },
    { when: {}, text: [(ctx) => `🕯️ ${fn(ctx.subject)}`] },
  ]);
}

const AUTO_SRC = [
  (s) => `${s.name} didn't wait for you this week — the delivery receipts speak for themselves.`,
  (s) => `${s.name} stuffed herself on her own this week, and made sure you'd hear about it.`,
  (s) => `${s.name} texts you a photo of an emptied table. No caption. None needed.`,
];

registerPool('corruption.auto.stuff', [
  {
    when: {},
    text: AUTO_SRC.map((fn) => (ctx) => fn(ctx.subject)),
  },
  {
    when: { corruption: [2] },
    weight: 2,
    text: [
      (ctx) => `${ctx.subject?.name || 'She'} fed herself without asking — pride, not shame.`,
      ...AUTO_SRC.map((fn) => (ctx) => fn(ctx.subject)),
    ],
  },
]);

export function renderCorruptionTierUp(student, tierId, week = 1, opts = {}) {
  if (!student || tierId < 1 || tierId > 2) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { corruptionTier: tierId, featureId: 'corruption_tier_up' },
    ...opts,
  });
  const raw = render(`{corruption.tierUp.t${tierId}}`, ctx, { trace: opts.trace || null })?.trim()
    || TIER_UP_SRC[tierId]?.(student)
    || '';
  return appendV2Depth(raw, 'psych', ctx, opts.v2DepthChance ?? 0.32);
}

export function renderCorruptionAutoStuff(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({
    subject: student,
    week,
    globals: { featureId: 'corruption_auto' },
    ...opts,
  });
  const raw = render('{corruption.auto.stuff}', ctx, { trace: opts.trace || null })?.trim()
    || AUTO_SRC[0](student);
  return appendV2Depth(raw, 'psych', ctx, opts.v2DepthChance ?? 0.26);
}
