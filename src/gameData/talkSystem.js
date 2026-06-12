// ═══════════════════════════════════════════════════════════════
// TALK SYSTEM — conversations shaped by Influence skills and her
// corruption tier. Response prose lives in talkDialogue.js and
// devourScene.js; this file defines topics, gates, and effects.
// ═══════════════════════════════════════════════════════════════

export const TALK_TOPICS = [
  // ── always available ───────────────────────────────────────
  { id:"check_in", label:"Check in", icon:"💬", group:"talk",
    effect:{ rel:2 },
  },
  { id:"compliment", label:"Compliment her figure", icon:"🌸", group:"talk",
    effect:{ rel:3 },
  },
  { id:"encourage", label:"Encourage her appetite", icon:"🍽", group:"talk",
    effect:{ rel:1, corruption:1 },
    // Rendered by the text engine (scenes/talkEncourage.js), not talkDialogue.
    // Migration pattern: give a topic an engineTemplate and TalkModal routes it.
    engineTemplate:"{talk.encourage}",
  },

  // ── Quiet Suggestion (Influence T1) ───────────────────────
  { id:"suggest_indulgence", label:"Plant a suggestion", icon:"🗣", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:2, rel:1 },
    suggestNote:"Her resistance softens this week (-10% refusal).",
  },
  { id:"suggest_growth", label:"Suggest she's meant for more", icon:"🌙", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:3 },
  },

  // ── Dominant Will commands (Influence T3) — EXTREME ────────
  { id:"command_finish", label:"Command: clean every plate", icon:"👑", group:"command", requires:"unlockCommand", extreme:true,
    effect:{ cals:6000, full:30, corruption:3 },
    refusal:(s)=>`${s.name} wavers — the command lands, but her body outvotes it. "I can't," she whispers, and means the physics, not the will. Her belly is too full, too tight, too honest about its limits. She trembles with how close she came to obeying anyway.`,
  },
  { id:"command_devour", label:"Command: devour", icon:"🩸", group:"command", requires:"devourersThreshold", extreme:true,
    sceneType:"devour",
    effect:{ cals:45000, full:100, corruption:18, rel:3, devourShift:true },
    refusal:(s)=>`Something ancient in ${s.name} rises to meet the command — and falters at the brink. Not tonight. Her body is too full to hold what you're asking. She trembles with how close it was, hands pressed to her middle, eyes dark with wanting anyway.`,
  },
];

// register: 0 normal · 1 submissive (Internalized Role) · 2 broken (Broken Mind)
// Lines appended to responses when the register is unlocked + tier qualifies.
// (Rendered via talk.coda in the text engine — see talkCodas.js.)
export const REGISTER_CODAS = {
  submissive: [
    (s)=>`"...thank you for taking care of me, Professor," ${s.name} adds, quieter. "Your greedy girl appreciates it."`,
    (s)=>`${s.name} adds, almost to herself: "I'm getting so big for you." She doesn't seem to notice she said 'for you.'`,
  ],
  broken: [
    (s)=>`${s.name}'s eyes have gone soft and depthless. "Whatever you want," she murmurs. "I stopped keeping track of where I end and your wanting begins."`,
    (s)=>`"I used to have other plans," ${s.name} says dreamily, patting herself. "Isn't that funny? I genuinely can't remember what they were."`,
  ],
};

export const TALK_CONFIG = {
  apCost: 1,
  suggestResistReduction: 0.10, // suggest_indulgence weekly debuff
  auraBonus: 0.35,              // mesmerizing aura weekly bonus
  devouringBonus: 0.30,         // devouring presence weekly bonus
};
