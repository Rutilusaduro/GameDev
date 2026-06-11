import { getStage } from './stages.js';

// ═══════════════════════════════════════════════════════════════
// SKILL TREES — Influence · Gluttony · Corruption
// The power of the spirit riding the professor. Numerical skills have
// ranks; tiers unlock by points spent within the tree.
//
// Effect keys are aggregated per rank by the skillEffect() helper in
// ProfessorSim and consumed by the stomach/corruption/talk systems.
// ═══════════════════════════════════════════════════════════════

export const SKILL_TREES = {
  influence: {
    id: "influence", label: "Influence", emoji: "👁", color: "#8a40e0",
    bg: "linear-gradient(160deg,#120826,#1e0c3a,#120826)",
    blurb: "The spirit's grip on their minds. Compliance, suggestion, and the quiet erosion of refusal.",
    tierNames: ["Subtle Influence", "Direct Influence", "Overwhelming Influence"],
  },
  gluttony: {
    id: "gluttony", label: "Gluttony", emoji: "🜂", color: "#e08a20",
    bg: "linear-gradient(160deg,#241204,#3a1e06,#241204)",
    blurb: "Mastery over appetite and growth. Capacity, conversion, and bodies remade to crave more.",
    tierNames: ["Growing Appetite", "Deepening Hunger", "Extreme Consumption"],
  },
  corruption: {
    id: "corruption", label: "Corruption", emoji: "🕯", color: "#d03858",
    bg: "linear-gradient(160deg,#220610,#380a1c,#220610)",
    blurb: "The breaking-in. Shame burns away; willingness takes its place, and they thank you for it.",
    tierNames: ["Cracks in the Foundation", "Deepening Corruption", "Total Corruption"],
  },
};

// Points spent in a tree required to open tiers 2 and 3.
export const TIER_THRESHOLDS = [0, 3, 8];
export const RANK_COSTS = [1, 2, 3]; // cost per rank by tier index

export const SKILLS = [
  // ═══ INFLUENCE — Tier 1: Subtle Influence ═══
  { id:"subtle_nudge", tree:"influence", tier:0, icon:"🫳", name:"Subtle Nudge", maxRanks:3,
    desc:"Slightly increases success when feeding past capacity.",
    rankDesc:r=>`+${r*5}% force-feed success`,
    effects:{ forceFeedBonus:0.05 } },
  { id:"quiet_suggestion", tree:"influence", tier:0, icon:"🗣", name:"Quiet Suggestion", maxRanks:1,
    desc:"Unlocks suggestive dialogue options when talking with the girls.",
    rankDesc:()=>`Unlocks Suggest topics in Talk`,
    effects:{ unlockSuggestion:1 } },
  { id:"echoed_will", tree:"influence", tier:0, icon:"🔁", name:"Echoed Will", maxRanks:1,
    desc:"When you successfully push a girl past capacity, she doubles the amount on her own.",
    rankDesc:()=>`Force-fed calories are echoed by her own hand`,
    effects:{ echoedWill:1 } },

  // ═══ INFLUENCE — Tier 2: Direct Influence ═══
  { id:"forceful_push", tree:"influence", tier:1, icon:"🫷", name:"Forceful Push", maxRanks:2,
    desc:"Significantly increases success when pushing a girl into an extreme action.",
    rankDesc:r=>`+${r*10}% extreme action success`,
    effects:{ extremeBonus:0.10 } },
  { id:"heavy_hand", tree:"influence", tier:1, icon:"✋", name:"Heavy Hand", maxRanks:1,
    desc:"Once a girl reaches max capacity, she automatically eats the first food offered afterward.",
    rankDesc:()=>`First feed after hitting capacity always lands (1/girl/week)`,
    effects:{ heavyHand:1 } },
  { id:"eroded_will", tree:"influence", tier:1, icon:"🌊", name:"Eroded Will", maxRanks:2,
    desc:"Global reduction in resistance to intense feeding across all girls.",
    rankDesc:r=>`+${r*6}% to all force-feed and extreme rolls`,
    effects:{ forceFeedBonus:0.06, extremeBonus:0.06 } },

  // ═══ INFLUENCE — Tier 3: Overwhelming Influence ═══
  { id:"break_resistance", tree:"influence", tier:2, icon:"⛓", name:"Break Resistance", maxRanks:1,
    desc:"Once per week, completely bypass a refusal on a single action.",
    rankDesc:()=>`Arm in Talk: next refusal this week is overridden`,
    effects:{ breakResistance:1 } },
  { id:"dominant_will", tree:"influence", tier:2, icon:"👑", name:"Dominant Will", maxRanks:1,
    desc:"Unlocks extreme feeding commands that were previously unavailable.",
    rankDesc:()=>`Unlocks Command topics in Talk`,
    effects:{ unlockCommand:1 } },
  { id:"mesmerizing_aura", tree:"influence", tier:2, icon:"🌀", name:"Mesmerizing Aura", maxRanks:1,
    desc:"Once per week, drape one girl in the aura — her resistance plummets for the week.",
    rankDesc:()=>`Arm in Talk: +35% to all rolls on her this week`,
    effects:{ mesmerizingAura:1 } },

  // ═══ GLUTTONY — Tier 1: Growing Appetite ═══
  { id:"efficient_digestion", tree:"gluttony", tier:0, icon:"⚗", name:"Efficient Digestion", maxRanks:3,
    desc:"Small increase to calorie-to-weight conversion.",
    rankDesc:r=>`+${r*6}% digestion yield`,
    effects:{ conversionBonus:0.06 } },
  { id:"expanded_capacity", tree:"gluttony", tier:0, icon:"🫙", name:"Expanded Capacity", maxRanks:3,
    desc:"Permanent small increase to stomach capacity for all girls.",
    rankDesc:r=>`+${r*10} capacity, all girls`,
    effects:{ capacityBonus:10 } },
  { id:"hungry_whispers", tree:"gluttony", tier:0, icon:"🤫", name:"Hungry Whispers", maxRanks:2,
    desc:"Girls are slightly more likely to accept food when near capacity.",
    rankDesc:r=>`Big servings count ${r*25}% smaller for refusal rolls`,
    effects:{ sizePenaltyReduction:0.25 } },
  { id:"lingering_fullness", tree:"gluttony", tier:0, icon:"⏳", name:"Lingering Fullness", maxRanks:2,
    desc:"Fullness decays slower — some of the week's stretch carries into the next.",
    rankDesc:r=>`${r*15}% of fullness carries over each week`,
    effects:{ fullnessCarryover:0.15 } },
  { id:"appetite_boost", tree:"gluttony", tier:0, icon:"🍴", name:"Appetite Boost", maxRanks:2,
    desc:"Small permanent increase to how much a girl takes in per feeding.",
    rankDesc:r=>`+${r*10}% calories per accepted feed`,
    effects:{ calorieBonus:0.10 } },
  { id:"soft_start", tree:"gluttony", tier:0, icon:"🌱", name:"Soft Start", maxRanks:1,
    desc:"Girls early in their journey hold more than they should.",
    rankDesc:()=>`+20 capacity for girls at stage 0-1`,
    effects:{ softStart:20 } },

  // ═══ GLUTTONY — Tier 2: Deepening Hunger ═══
  { id:"accelerated_growth", tree:"gluttony", tier:1, icon:"📈", name:"Accelerated Growth", maxRanks:2,
    desc:"Moderate increase to calorie-to-weight conversion.",
    rankDesc:r=>`+${r*8}% digestion yield`,
    effects:{ conversionBonus:0.08 } },
  { id:"stomach_expansion", tree:"gluttony", tier:1, icon:"🎈", name:"Stomach Expansion", maxRanks:2,
    desc:"Larger permanent increase to stomach capacity.",
    rankDesc:r=>`+${r*20} capacity, all girls`,
    effects:{ capacityBonus:20 } },
  { id:"gluttons_instinct", tree:"gluttony", tier:1, icon:"🐺", name:"Glutton's Instinct", maxRanks:1,
    desc:"Girls keep eating even when full — a well-fed girl may keep going on her own.",
    rankDesc:()=>`Girls above 70% fullness may self-feed at week's end`,
    effects:{ gluttonsInstinct:1 } },
  { id:"weight_retention", tree:"gluttony", tier:1, icon:"🧲", name:"Weight Retention", maxRanks:2,
    desc:"Reduces the weekly maintenance burn — more of what they eat stays.",
    rankDesc:r=>`+${r} lbs/week passive gain, all girls`,
    effects:{ passiveLbs:1 } },
  { id:"force_of_habit", tree:"gluttony", tier:1, icon:"🔄", name:"Force of Habit", maxRanks:2,
    desc:"Successful overeating has a chance to permanently stretch capacity on the spot.",
    rankDesc:r=>`${r*10}% chance per force-feed: +5 capacity instantly`,
    effects:{ habitChance:0.10 } },
  { id:"heavy_settling", tree:"gluttony", tier:1, icon:"🪨", name:"Heavy Settling", maxRanks:2,
    desc:"Fullness weighs less against future feeding success.",
    rankDesc:r=>`Overfull penalty reduced ${r*25}%`,
    effects:{ overPenaltyReduction:0.25 } },

  // ═══ GLUTTONY — Tier 3: Extreme Consumption ═══
  { id:"metabolic_shift", tree:"gluttony", tier:2, icon:"🧬", name:"Metabolic Shift", maxRanks:2,
    desc:"Large increase to calorie-to-weight conversion.",
    rankDesc:r=>`+${r*12}% digestion yield`,
    effects:{ conversionBonus:0.12 } },
  { id:"limitless_capacity", tree:"gluttony", tier:2, icon:"♾", name:"Limitless Capacity", maxRanks:3,
    desc:"Very large permanent increases to stomach capacity.",
    rankDesc:r=>`+${r*35} capacity, all girls`,
    effects:{ capacityBonus:35 } },
  { id:"endless_appetite", tree:"gluttony", tier:2, icon:"🕳", name:"Endless Appetite", maxRanks:1,
    desc:"Girls can be pushed much further past capacity before refusal spikes.",
    rankDesc:()=>`Refusal chance stops climbing past 150% fullness`,
    effects:{ endlessAppetite:1 } },
  { id:"permanent_expansion", tree:"gluttony", tier:2, icon:"💠", name:"Permanent Expansion", maxRanks:2,
    desc:"Stuffed weeks stretch capacity harder.",
    rankDesc:r=>`+${r*5} extra capacity from stuffed weeks`,
    effects:{ stuffedCapBonus:5 } },
  { id:"bodys_surrender", tree:"gluttony", tier:2, icon:"🌺", name:"Body's Surrender", maxRanks:1,
    desc:"Unlocks physical traits — their bodies transform to serve the appetite.",
    rankDesc:()=>`Girls develop traits as they grow (see her detail panel)`,
    effects:{ bodysSurrender:1 } },
  { id:"devouring_presence", tree:"gluttony", tier:2, icon:"😈", name:"Devouring Presence", maxRanks:1,
    desc:"Once per week, one girl's hunger becomes an event.",
    rankDesc:()=>`Arm in Talk: her capacity doubles + all rolls +30% this week`,
    effects:{ devouringPresence:1 } },
  { id:"devourers_threshold", tree:"gluttony", tier:2, icon:"🩸", name:"Devourer's Threshold", maxRanks:1,
    desc:"Unlocks the final extreme of appetite — consumption without limit or apology.",
    rankDesc:()=>`Unlocks the Devour command in Talk`,
    effects:{ devourersThreshold:1 } },

  // ═══ CORRUPTION — Tier 1: Cracks in the Foundation ═══
  { id:"first_crack", tree:"corruption", tier:0, icon:"🥚", name:"First Crack", maxRanks:1,
    desc:"The first time a girl is pushed past capacity, something gives way permanently.",
    rankDesc:()=>`First force-feed grants +6 corruption (once per girl)`,
    effects:{ firstCrack:6 } },
  { id:"curious_appetite", tree:"corruption", tier:0, icon:"🍎", name:"Curious Appetite", maxRanks:2,
    desc:"Girls become more open to trying new and extreme indulgences.",
    rankDesc:r=>`Corruption gains +${r*25}%`,
    effects:{ corruptionRate:0.25 } },
  { id:"shame_erosion", tree:"corruption", tier:0, icon:"🫧", name:"Shame Erosion", maxRanks:2,
    desc:"Slightly reduces the shame around gaining and overeating.",
    rankDesc:r=>`Corruption tiers reached ${r*5} points sooner`,
    effects:{ shameErosion:5 } },

  // ═══ CORRUPTION — Tier 2: Deepening Corruption ═══
  { id:"broken_shame", tree:"corruption", tier:1, icon:"🪞", name:"Broken Shame", maxRanks:1,
    desc:"Significantly reduces shame around gaining and extreme behavior.",
    rankDesc:()=>`Corruption tiers reached 10 points sooner`,
    effects:{ shameErosion:10 } },
  { id:"craving_submission", tree:"corruption", tier:1, icon:"🎀", name:"Craving Submission", maxRanks:1,
    desc:"Girls begin to enjoy being pushed and controlled.",
    rankDesc:()=>`Force-feeds grant +2 relationship and +1 corruption`,
    effects:{ cravingSubmission:1 } },
  { id:"internalized_role", tree:"corruption", tier:1, icon:"🐷", name:"Internalized Role", maxRanks:1,
    desc:"They start using the words themselves — greedy, growing, yours.",
    rankDesc:()=>`Unlocks submissive dialogue in Talk responses`,
    effects:{ internalizedRole:1 } },

  // ═══ CORRUPTION — Tier 3: Total Corruption ═══
  { id:"willing_vessel", tree:"corruption", tier:2, icon:"🏺", name:"Willing Vessel", maxRanks:1,
    desc:"Girls actively seek out indulgence without being told.",
    rankDesc:()=>`Broken In girls self-stuff twice as often`,
    effects:{ willingVessel:1 } },
  { id:"pride_in_ruin", tree:"corruption", tier:2, icon:"🏛", name:"Pride in Ruin", maxRanks:1,
    desc:"At very high weights, girls become proud of how far they've come.",
    rankDesc:()=>`Stage 8+ girls gain +2 relationship/week`,
    effects:{ prideInRuin:1 } },
  { id:"broken_mind", tree:"corruption", tier:2, icon:"🫠", name:"Broken Mind", maxRanks:1,
    desc:"Unlocks deeply submissive, broken, devoted dialogue and behavior.",
    rankDesc:()=>`Unlocks the Broken dialogue register in Talk`,
    effects:{ brokenMind:1 } },
  { id:"total_surrender", tree:"corruption", tier:2, icon:"🖤", name:"Total Surrender", maxRanks:1,
    desc:"Past a threshold, a girl is permanently, eagerly compliant.",
    rankDesc:()=>`Girls at 90+ corruption never refuse anything`,
    effects:{ totalSurrender:1 } },
];

// ── Physical traits granted by Body's Surrender ────────────────
// Auto-granted once the skill is owned; condition checked weekly.
export const PHYSICAL_TRAITS = [
  { id:"accelerated_settling", icon:"🌾", name:"Accelerated Settling",
    cond:(s,st)=>st.id<=2, once:true,
    desc:"Early weight sticks easily — newly gained pounds settle without a fight.",
    weekly:{ passiveLbs:1 } },
  { id:"hungry_awakening", icon:"🌅", name:"Hungry Awakening",
    cond:(s)=> (s.timesForceFed||0)>0, once:true,
    desc:"Since the first time she was pushed past capacity, her appetite never quite closed again.",
    weekly:{ corruption:1 } },
  { id:"living_mattress", icon:"🛏", name:"Living Mattress",
    cond:(s,st)=>st.id>=7,
    desc:"She has become genuinely, famously comfortable to rest against. People find reasons to.",
    weekly:{ relationship:1 } },
  { id:"endless_growth", icon:"🌌", name:"Endless Growth",
    cond:(s,st)=>st.id>=8,
    desc:"Her body keeps expanding even without active feeding, slow and certain as a tide.",
    weekly:{ passiveLbs:2 } },
  { id:"pleasure_from_growth", icon:"💗", name:"Pleasure from Growth",
    cond:(s,st)=>st.id>=6,
    desc:"Gaining itself feels good now. Every new pound arrives with a shiver.",
    weekly:{ corruption:1, relationship:1 } },
  { id:"growth_addiction", icon:"🌀", name:"Growth Addiction",
    cond:(s)=>(s.corruption||0)>=50,
    desc:"The more she gains, the more she craves. The loop has closed.",
    weekly:{ selfFeedCals:3000 } },
  { id:"feeding_aura", icon:"✨", name:"Feeding Aura",
    cond:(s,st)=>st.id>=7,
    desc:"A faint presence around her makes the world want to feed her. Bigger portions, free samples, generous strangers.",
    weekly:{ selfFeedCals:4000 } },
  { id:"living_landscape", icon:"🏔", name:"Living Landscape",
    cond:(s,st)=>st.id>=10,
    desc:"At this scale she shapes the room around her. Campus has begun to accommodate her like weather.",
    weekly:{ passiveLbs:3, relationship:1 } },
];

// ── helpers — point spend, tier gates, effect aggregation ─────

const skillMap = Object.fromEntries(SKILLS.map(sk => [sk.id, sk]));

export function treeSpentPoints(owned = {}, treeId) {
  return SKILLS.filter(sk => sk.tree === treeId).reduce((sum, sk) => {
    const rank = owned[sk.id] || 0;
    return sum + rank * RANK_COSTS[sk.tier];
  }, 0);
}

export function isTreeTierUnlocked(owned = {}, treeId, tierIdx) {
  if (tierIdx <= 0) return true;
  return treeSpentPoints(owned, treeId) >= TIER_THRESHOLDS[tierIdx];
}

export function computeSpentSkillPoints(owned = {}) {
  return SKILLS.reduce((sum, sk) => sum + (owned[sk.id] || 0) * RANK_COSTS[sk.tier], 0);
}

/** Sum owned ranks into effect totals consumed by feed, talk, and week ticks. */
export function aggregateSkillEffects(owned = {}) {
  const out = {};
  for (const sk of SKILLS) {
    const rank = owned[sk.id] || 0;
    if (!rank) continue;
    for (const [key, val] of Object.entries(sk.effects || {})) {
      if (sk.maxRanks === 1 && val === 1) {
        out[key] = 1;
      } else {
        out[key] = (out[key] || 0) + val * rank;
      }
    }
  }
  return out;
}

export function capacityBonusFromSkills(owned = {}) {
  return aggregateSkillEffects(owned).capacityBonus || 0;
}

/** Capacity granted by soft_start for girls at stage 0–1 only. */
export function softStartBonus(owned = {}, stageId) {
  if (stageId > 1) return 0;
  return aggregateSkillEffects(owned).softStart || 0;
}

/** Grant physical traits when Body's Surrender is owned; runs once per week per student. */
export function tickPhysicalTraits(student, owned = {}) {
  if (!aggregateSkillEffects(owned).bodysSurrender) return student;
  const stage = getStage(student.lbs);
  let traits = [...(student.physicalTraits || [])];
  let changed = false;
  for (const trait of PHYSICAL_TRAITS) {
    if (trait.once && traits.includes(trait.id)) continue;
    if (!trait.cond(student, stage)) continue;
    if (!traits.includes(trait.id)) {
      traits.push(trait.id);
      changed = true;
    }
  }
  return changed ? { ...student, physicalTraits: traits } : student;
}
