// ═══════════════════════════════════════════════════════════════
// TALK SYSTEM — conversations shaped by Influence skills and her
// corruption tier. Response prose lives in text-engine scenes;
// this file defines topics, gates, and effects.
// ═══════════════════════════════════════════════════════════════

export const TALK_TOPICS = [
  // ── always available ───────────────────────────────────────
  { id:"check_in", label:"Check in", icon:"💬", group:"talk",
    effect:{ rel:2 },
    engineTemplate:"{talk.check_in}",
  },
  { id:"compliment", label:"Compliment her figure", icon:"🌸", group:"talk",
    effect:{ rel:3 },
    // Rendered by the text engine (scenes/talkCompliment.js).
    // Stage-varying: tone and body-focus evolve across all 12 stages.
    engineTemplate:"{talk.compliment}",
  },
  { id:"encourage", label:"Encourage her appetite", icon:"🍽", group:"talk",
    effect:{ rel:1, corruption:1 },
    // Rendered by the text engine (scenes/talkEncourage.js), not talkDialogue.
    // Migration pattern: give a topic an engineTemplate and TalkModal routes it.
    engineTemplate:"{talk.encourage}",
  },

  // ── Quiet Suggestion (Influence T1) ───────────────────────
  { id:"suggest_indulgence", label:"Plant a suggestion", icon:"🗣", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:2, rel:1, applySuggestDebuff:true },
    suggestNote:"Her resistance softens this week (-10% refusal).",
    engineTemplate:"{talk.suggest_indulgence}",
  },
  { id:"suggest_growth", label:"Suggest she's meant for more", icon:"🌙", group:"suggest", requires:"unlockSuggestion",
    effect:{ corruption:3 },
    engineTemplate:"{talk.suggest_growth}",
  },

  // ── Dominant Will commands (Influence T3) — EXTREME ────────
  { id:"command_finish", label:"Command: clean every plate", icon:"👑", group:"command", requires:"unlockCommand", extreme:true,
    effect:{ cals:6000, full:30, corruption:3 },
    engineTemplate:"{talk.command_finish}",
    refusalTemplate:"{talk.refusal.command_finish}",
  },
  { id:"command_devour", label:"Command: devour", icon:"🩸", group:"command", requires:"devourersThreshold", extreme:true,
    sceneType:"devour",
    effect:{ cals:45000, full:100, corruption:18, rel:3, devourShift:true },
    refusalTemplate:"{talk.refusal.command_devour}",
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

// ── Body-compliment welcome rule ──────────────────────────────
// Complimenting a girl's body only lands once she's either pretty fat
// (into the heavier stages) OR close enough to you. Before that it reads
// as unsolicited and creepy: a negative interaction that also draws
// admin scrutiny.
import { getStage } from './stages.js';
export const COMPLIMENT_WELCOME_STAGE = 5;   // Heavy+ — the body itself earns it
export const COMPLIMENT_WELCOME_REL = 50;    // ...or she's close enough to want it
export const COMPLIMENT_BACKFIRE_REL = 4;    // relationship lost when it lands wrong
export const COMPLIMENT_BACKFIRE_SCRUTINY = 2;

export function isBodyComplimentUnwelcome(student) {
  if (!student) return false;
  const stage = getStage(student.lbs ?? 0).id;
  return stage < COMPLIMENT_WELCOME_STAGE && (student.relationship ?? 0) <= COMPLIMENT_WELCOME_REL;
}
