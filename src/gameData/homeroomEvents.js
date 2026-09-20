// Hall kitchen queen — NPC blurbs, conferences, group activities (MIGRATION.md extract).
// Homeroom prose stub migration (step 6 pilot) — bridge cells; homeroom fragments @ week 20+.
// ── HALL KITCHEN QUEEN: NPC stage descriptions ───────────────────────────────
export const BATCH_BAKER_NPCS = {
  "Kayla": {
    "0": "Narrow waist, wide hips, long legs. Always tugging at the waistband of her jeans — upward, a habitual adjustment. She's the watchful one.",
    "1": "Her jeans have started to gap at the waist while her hips push outward. She's stopped tugging at the waistband. She's started sitting differently — wider, more settled.",
    "2": "Genuinely wide now, her hips spreading soft and full into the chair, her thighs pressing together. She wears the comfortable clothes without explanation."
  },
  "Bri": {
    "0": "Soft round belly, slim arms and legs — carries everything in her middle. She moves like someone who's always been this way and has no opinion about it.",
    "1": "Her belly has pushed forward noticeably, resting in her lap when she sits. The slim arms and legs are the same. The middle is emphatically more.",
    "2": "Her belly is the center of gravity of everything — large, soft, unmistakable. She rests her hands on it when she's relaxed. She is often relaxed."
  },
  "Sofia": {
    "0": "Already full-figured before any of this. Chest, hips, everything — she wears her body like it's exactly the right size, which it is.",
    "1": "Everything has gotten more. The full figure has gone rounder, softer, wider. She is significantly larger than she was and completely unbothered.",
    "2": "Genuinely enormous now — soft and wide, her belly heavy and forward, her chest vast. She fills the new wide desk completely and seems to prefer it."
  },
  "Mrs_Calloway": {
    "0": "Manicured, athletic-seeming from the waist up. Wide hips she minimizes with careful, structured clothing. Suspicious of everything, especially you.",
    "1": "The structured clothing is doing less work than it used to. There's a softness at the waist now that the jacket doesn't quite hide. She's still watching everything.",
    "2": "The jacket doesn't button the way it used to. She's switched to cardigans and drape-fronts. She is still, always, watching from the window at pickup.",
    "3": "She's stopped trying to dress around the change and started dressing for comfort. A soft cardigan in a warm color. She brought you preserves this week.",
    "4": "She takes the full portions openly now. She's been on the event committee long enough that Tuesday is as much hers as it is yours. She knows exactly what she's doing."
  },
  "Mrs_Reyes": {
    "0": "Trim but carries a soft belly she explains away as stress weight. Always has a coffee in hand. Friendly but distracted.",
    "1": "The belly is less explainable now and she's stopped trying. The coffee is still there. She lingers at pickup a little longer each week.",
    "2": "Her midsection has grown soft and round, clearly visible even under her usual clothes. She's stopped tugging at her jacket and started choosing the loose things.",
    "3": "Properly soft now — her belly rounding the front of her blouse, her hips wider. She sits at the table instead of standing at the window.",
    "4": "She brings coffee for both of you now. She's comfortable. She doesn't comment on her size or yours. She just eats and talks and is present."
  },
  "Mrs_Monroe": {
    "0": "Glamorous, confident, comfortable in her body from the start. Brings wine to floor events. Daisy's favorite.",
    "1": "Warmer, rounder, and even more comfortable than before. She's started commenting on which recipes she prefers and her preferences are detailed.",
    "2": "Noticeably softer everywhere — her hips generous, her belly rounding out the wrap dress. She laughs about everything. She's your biggest advocate.",
    "3": "Gloriously fat, openly and happily. She has stopped noticing because she stopped caring a long time ago. She brings the good wine now.",
    "4": "She is the reason the other moms stopped worrying. She made abundance look so natural and easy that everyone followed her example. Enormous, warm, essential."
  }
};

export const HOMEROOM_SUSPICION_DELTAS = {
  "recipe_rich": 2,
  "recipe_special": 1,
  "recipe_cover": -1,
  "recipe_simple": 0,
  "deflected_mom": -1,
  "invited_inside": 1,
  "played_safe": -1,
  "enlisted_monroe": -2,
  "direct_question": 2,
  "deflected_question": -1
};

export const HOMEROOM_THRESHOLDS = {
  "class": [
    50,
    120,
    200
  ],
  "mom": [
    30,
    70,
    130
  ]
};

// ── HALL KITCHEN QUEEN: Individual Conference Events ───────────────────────
export const HOMEROOM_CONFERENCE_EVENTS = {
  "Kayla": {
    "text": "Kayla conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "progress_review",
        "label": "Actually go through her progress — she's been doing well",
        "result": "Outcome beat (Kayla/progress_review) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 2,
        "classGain": 4,
        "rel": 5,
        "suspDelta": -1
      },
      {
        "id": "tuesday",
        "label": "Skip the pretense — ask what she'd most like on Tuesday",
        "result": "Outcome beat (Kayla/tuesday) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 3,
        "classGain": 7,
        "rel": 9,
        "suspDelta": 0
      }
    ]
  },
  "Bri": {
    "text": "Bri conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "brought_something",
        "label": "Yes — there's always something in the drawer",
        "result": "Outcome beat (Bri/brought_something) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 3,
        "classGain": 6,
        "rel": 8,
        "suspDelta": 0
      },
      {
        "id": "brief",
        "label": "Nothing today — keep it short and warm",
        "result": "Outcome beat (Bri/brief) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 1,
        "classGain": 2,
        "rel": 6,
        "suspDelta": -1
      }
    ]
  },
  "Sofia": {
    "text": "Sofia conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "portfolio",
        "label": "Review her actual work — she's the strongest resident by every measure",
        "result": "Outcome beat (Sofia/portfolio) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 2,
        "classGain": 5,
        "rel": 7,
        "suspDelta": -1
      },
      {
        "id": "next_tuesday",
        "label": "Let her plan next Tuesday — she clearly has opinions about this",
        "result": "Outcome beat (Sofia/next_tuesday) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 4,
        "classGain": 8,
        "rel": 11,
        "suspDelta": 1
      }
    ]
  },
  "Mrs_Calloway": {
    "text": "Mrs_Calloway conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "curriculum_frame",
        "label": "Walk her through the wellness-program framing — keep it professional",
        "result": "Outcome beat (Mrs_Calloway/curriculum_frame) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 2,
        "momGain": 6,
        "rel": 5,
        "suspDelta": -2
      },
      {
        "id": "offer_tasting",
        "label": "Offer a tasting — redirect with warmth",
        "result": "Outcome beat (Mrs_Calloway/offer_tasting) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 3,
        "momGain": 10,
        "rel": 7,
        "suspDelta": 0
      }
    ]
  },
  "Mrs_Reyes": {
    "text": "Mrs_Reyes conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "honest_talk",
        "label": "Talk honestly — acknowledge what's happening",
        "result": "Outcome beat (Mrs_Reyes/honest_talk) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 2,
        "momGain": 8,
        "rel": 9,
        "suspDelta": -1
      },
      {
        "id": "recipe_preview",
        "label": "Show her next week's recipes — make her part of it",
        "result": "Outcome beat (Mrs_Reyes/recipe_preview) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 4,
        "momGain": 14,
        "rel": 8,
        "suspDelta": 1
      }
    ]
  },
  "Mrs_Monroe": {
    "text": "Mrs_Monroe conference bridge — kitchen queen check-in. Modular homeroom.scene slots own late-semester voice.",
    "choices": [
      {
        "id": "full_preview",
        "label": "Walk her through everything — she wants the full picture",
        "result": "Outcome beat (Mrs_Monroe/full_preview) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 3,
        "momGain": 12,
        "rel": 10,
        "suspDelta": -1
      },
      {
        "id": "taste_now",
        "label": "Skip the meeting — feed her now",
        "result": "Outcome beat (Mrs_Monroe/taste_now) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "lbs": 5,
        "momGain": 18,
        "rel": 12,
        "suspDelta": 0
      }
    ]
  }
};

// ── HALL KITCHEN QUEEN: Group Activity Events ────────────────────────────────
export const HOMEROOM_GROUP_ACTIVITIES = {
  "parent_meeting": {
    "label": "Parent Group Meeting",
    "apCost": 1,
    "text": "Parent Group Meeting phase 1 — group activity stub. Oven heat and floor ritual live in modular slots.",
    "choices": [
      {
        "id": "curriculum",
        "label": "Run the wellness agenda — keep the framing professional",
        "result": "Outcome beat (parent_meeting/curriculum) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "momGain": 8,
        "rel": 6,
        "suspDelta": -2
      },
      {
        "id": "recipes",
        "label": "Show them what's coming — open the recipe book",
        "result": "Outcome beat (parent_meeting/recipes) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "momGain": 14,
        "rel": 8,
        "suspDelta": 1
      },
      {
        "id": "refreshments_first",
        "label": "Start with refreshments — the agenda can wait",
        "result": "Outcome beat (parent_meeting/refreshments_first) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
        "momGain": 18,
        "rel": 10,
        "suspDelta": 0
      }
    ]
  },
  "health_unit": {
    "label": "Health Unit — Measurements",
    "apCost": 2,
    "phases": [
      {
        "text": "Health Unit — Measurements phase 1 — group activity stub. Oven heat and floor ritual live in modular slots.",
        "choices": [
          {
            "id": "official",
            "label": "Run it officially — record everything for the hall wellness file",
            "result": "Outcome beat (health_unit/official) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
            "rel": 4,
            "suspDelta": 2,
            "revealsWeights": true
          },
          {
            "id": "personal",
            "label": "Keep personal records only — this stays in the notebook",
            "result": "Outcome beat (health_unit/personal) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
            "rel": 6,
            "suspDelta": -1,
            "revealsWeights": true
          }
        ]
      },
      {
        "text": "Health Unit — Measurements phase 2 — group activity stub. Oven heat and floor ritual live in modular slots.",
        "choices": [
          {
            "id": "weigh_moms",
            "label": "Offer the scale to all three — make it an event",
            "result": "Outcome beat (health_unit/weigh_moms) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
            "rel": 8,
            "suspDelta": 0,
            "revealsParentWeights": true
          },
          {
            "id": "decline",
            "label": "Keep it to the residents — stay professional",
            "result": "Outcome beat (health_unit/decline) — warmth, portions, notebook logged. Fragments carry detail @ week 20+.",
            "rel": 4,
            "suspDelta": -1
          }
        ]
      }
    ]
  }
};
