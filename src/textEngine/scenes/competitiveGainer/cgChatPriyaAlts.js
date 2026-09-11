// Extra Priya group-chat lines — ≥3 wildcards per post/followup pool.

export const CG_PRIYA_POST_TIER_ALTS = {
  Invested: [
    'Board updated. Margins look intentional.',
    'Weekly check-in — the data still favors me.',
  ],
  Driven: [
    'Numbers climbing. The thread can cope.',
    'Another week, another lead — eat accordingly.',
  ],
  Frenzied: [
    'Gap widening. Do not pretend you are surprised.',
    'I am hungry and ahead — both facts are public.',
  ],
  Ruthless: [
    'The board does not lie. Neither do my measurements.',
    'Cute replies. My body still dominates the columns.',
  ],
};

export const CG_PRIYA_POST_STAGE_ALTS = {
  Heavy: [
    'Early lead — waist and total weight both cooperating.',
  ],
  Fat: [
    'Mid-arc gains showing. Thigh friction is data.',
  ],
  VeryFat: [
    'Categories filling in. Threats noted and scheduled.',
  ],
  Enormous: [
    'Scale groans. Corkboard still mine.',
  ],
  Colossal: [
    'Reaching the board takes effort now. Worth it.',
  ],
  Blob: [
    'Immensity logged. Dominance is a lifestyle.',
  ],
};

export const CG_PRIYA_FOLLOWUP_TIER_ALTS = {
  leading: {
    Invested: [
      'Comfortable lead. Keep the updates coming.',
      'Steady margins — I like predictable victory.',
    ],
    Driven: [
      'Good effort from some of you. My leads hold.',
      'The gap is where I want it. Train harder.',
    ],
    Frenzied: [
      'Cute panic in the replies. I am still ahead.',
      'Measurements pulling away — cope with food.',
    ],
    Ruthless: [
      'Pathetic flex attempts. The board is mine.',
      'Keep feeding if you think you can catch this.',
    ],
  },
  threatened: {
    Invested: [
      'Noted the close numbers. Next week widens again.',
      'Temporary noise. Intake schedule already adjusted.',
    ],
    Driven: [
      'Dangerously close in places. Unacceptable.',
      'Watch me pull away after dinner tonight.',
    ],
    Frenzied: [
      'Someone thinks they can challenge my waist? Cute.',
      'I see those numbers. I see my response loading.',
    ],
    Ruthless: [
      'Enjoy the tie while it lasts — hours, maybe.',
      'Temporary threat. My body will erase it.',
    ],
  },
};

export function priyaPostAltLines(stageKey, tier) {
  const tierAlts = CG_PRIYA_POST_TIER_ALTS[tier] || [];
  const stageAlt = CG_PRIYA_POST_STAGE_ALTS[stageKey];
  const stageLine = stageAlt ? [stageAlt] : [];
  return [...tierAlts, ...stageLine];
}

export function priyaFollowupAltLines(followupKey, tier) {
  return CG_PRIYA_FOLLOWUP_TIER_ALTS[followupKey]?.[tier] || [];
}
