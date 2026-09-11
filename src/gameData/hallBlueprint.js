// ═══════════════════════════════════════════════════════════════
// HALL BLUEPRINT — spatial prestige upgrades + Atmosphere Weave synergies
// Maps existing SKILL_TREE purchases onto labeled floor rooms.
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';

/** Floor rooms on the RA hall blueprint (percent layout inside the plan). */
export const HALL_BLUEPRINT_ROOMS = [
  {
    id: 'lounge',
    label: 'Main Lounge',
    short: 'Lounge',
    emoji: '🛋️',
    blurb: 'Where residents land, linger, and learn the floor runs on warmth.',
    x: 28, y: 22, w: 44, h: 38,
    categories: ['environment'],
  },
  {
    id: 'kitchen',
    label: 'Hall Kitchen',
    short: 'Kitchen',
    emoji: '🍳',
    blurb: 'Heat, stock, and the quiet promise that something good is always finishing.',
    x: 4, y: 18, w: 22, h: 42,
    categories: ['feeding'],
  },
  {
    id: 'parlor',
    label: 'Social Parlor',
    short: 'Parlor',
    emoji: '🥂',
    blurb: 'Dinner connections, gifts, and the performance of indulgence as culture.',
    x: 74, y: 18, w: 22, h: 42,
    categories: ['social'],
  },
  {
    id: 'sanctum',
    label: 'Inner Sanctum',
    short: 'Sanctum',
    emoji: '🕯️',
    blurb: 'Psychology upgrades — framing, dreams, resonance, the soft architecture of yes.',
    x: 28, y: 62, w: 44, h: 32,
    categories: ['psychology'],
  },
  {
    id: 'ra_office',
    label: 'RA Desk & Office',
    short: 'RA Office',
    emoji: '📋',
    blurb: 'Cover, AP, and the paperwork that keeps scrutiny looking elsewhere.',
    x: 74, y: 62, w: 22, h: 32,
    categories: ['efficiency'],
  },
  {
    id: 'crown',
    label: 'Crown Suite',
    short: 'Crown',
    emoji: '⭐',
    blurb: 'Endgame prestige — the hall as institution, legend, arrangement.',
    x: 4, y: 62, w: 22, h: 32,
    categories: ['prestige'],
  },
];

const ROOM_BY_ID = Object.fromEntries(HALL_BLUEPRINT_ROOMS.map((r) => [r.id, r]));

/** Explicit overrides; everything else falls through category → room. */
const SKILL_ROOM_OVERRIDES = {
  ritual_kitchen: 'kitchen',
  embodiment_chamber: 'sanctum',
  resonance_bells: 'sanctum',
  echo_gallery: 'sanctum',
  dream_chamber: 'sanctum',
  late_night_access: 'sanctum',
  midnight_ritual: 'kitchen',
  task_batching: 'ra_office',
};

export function getSkillBlueprintRoom(skillId) {
  if (SKILL_ROOM_OVERRIDES[skillId]) return SKILL_ROOM_OVERRIDES[skillId];
  const sk = SKILL_TREE.find((s) => s.id === skillId);
  if (!sk) return 'lounge';
  const room = HALL_BLUEPRINT_ROOMS.find((r) => r.categories.includes(sk.category));
  return room?.id || 'lounge';
}

export function skillsForRoom(roomId) {
  return SKILL_TREE.filter((sk) => getSkillBlueprintRoom(sk.id) === roomId);
}

/** Adjacent-room synergy bonuses when both sides have ≥1 owned upgrade. */
export const BLUEPRINT_SYNERGIES = [
  {
    id: 'scent_lane',
    rooms: ['kitchen', 'lounge'],
    label: 'Scent Lane',
    desc: 'Oven warmth meets lounge air — appetite primes before anyone sits.',
    gainMult: 0.06,
    calMult: 0.08,
  },
  {
    id: 'feast_corridor',
    rooms: ['kitchen', 'parlor'],
    label: 'Feast Corridor',
    desc: 'Catering runs straight from kitchen to parlor; hall feasts hit harder.',
    hallCalMult: 0.12,
    passiveBonus: 0,
  },
  {
    id: 'soft_permission',
    rooms: ['lounge', 'sanctum'],
    label: 'Soft Permission',
    desc: 'Comfort framing and soft seating compound — residents surrender easier.',
    forceFeedBonus: 0.04,
    gainMult: 0.05,
  },
  {
    id: 'institutional_whisper',
    rooms: ['ra_office', 'sanctum'],
    label: 'Institutional Whisper',
    desc: 'Cover and psychology align; scrutiny hears what you want it to hear.',
    scrutinyReduce: 0.04,
    scrutinyPassiveReduce: 0.02,
  },
  {
    id: 'legendary_flow',
    rooms: ['parlor', 'crown'],
    label: 'Legendary Flow',
    desc: 'Social empire and crown prestige — the hall becomes destination.',
    passiveBonus: 1,
    apBonus: 0,
    relTalkBonus: 2,
  },
];

function roomHasUpgrade(roomId, owned = {}) {
  return skillsForRoom(roomId).some((sk) => owned[sk.id]);
}

export function getActiveBlueprintSynergies(ownedHallSkills = {}) {
  return BLUEPRINT_SYNERGIES.filter((syn) =>
    syn.rooms.every((rid) => roomHasUpgrade(rid, ownedHallSkills)),
  );
}

/** Stack synergy numbers into one effects object (merged with lounge skills). */
export function aggregateBlueprintSynergyEffects(ownedHallSkills = {}) {
  const fx = {
    gainMult: 0,
    calMult: 0,
    hallCalMult: 0,
    passiveBonus: 0,
    apBonus: 0,
    scrutinyReduce: 0,
    scrutinyPassiveReduce: 0,
    forceFeedBonus: 0,
    relTalkBonus: 0,
    digestMult: 0,
    activeSynergies: [],
  };
  getActiveBlueprintSynergies(ownedHallSkills).forEach((syn) => {
    fx.activeSynergies.push(syn);
    fx.gainMult += syn.gainMult || 0;
    fx.calMult += syn.calMult || 0;
    fx.hallCalMult += syn.hallCalMult || 0;
    fx.passiveBonus += syn.passiveBonus || 0;
    fx.apBonus += syn.apBonus || 0;
    fx.scrutinyReduce += syn.scrutinyReduce || 0;
    fx.scrutinyPassiveReduce += syn.scrutinyPassiveReduce || 0;
    fx.forceFeedBonus += syn.forceFeedBonus || 0;
    fx.relTalkBonus += syn.relTalkBonus || 0;
  });
  // Atmosphere Weave: each active synergy adds digest efficiency when residents end stuffed
  fx.digestMult = fx.activeSynergies.length * 0.035;
  return fx;
}

/** NEW MECHANIC — Atmosphere Weave charge (0–100) stored on player. */
export const WEAVE_CONFIG = {
  maxCharge: 100,
  perPurchase: 8,
  perSynergyUnlock: 15,
  pulseDigestBonus: 0.08,
  pulsePassiveBonus: 1,
};

export function initAtmosphereWeave() {
  return { charge: 0, lastPulseWeek: 0, unlockedSynergyIds: [] };
}

export function weaveOnHallPurchase(player, skillId, ownedAfter) {
  const weave = { ...initAtmosphereWeave(), ...(player?.atmosphereWeave || {}) };
  weave.charge = Math.min(WEAVE_CONFIG.maxCharge, (weave.charge || 0) + WEAVE_CONFIG.perPurchase);
  const active = getActiveBlueprintSynergies(ownedAfter);
  const prev = new Set(weave.unlockedSynergyIds || []);
  active.forEach((syn) => {
    if (!prev.has(syn.id)) {
      weave.charge = Math.min(WEAVE_CONFIG.maxCharge, weave.charge + WEAVE_CONFIG.perSynergyUnlock);
      prev.add(syn.id);
    }
  });
  weave.unlockedSynergyIds = [...prev];
  return weave;
}

export function consumeWeavePulseIfReady(weave, week) {
  if (!weave || (weave.charge || 0) < WEAVE_CONFIG.maxCharge) return { weave, pulse: false };
  if (weave.lastPulseWeek === week) return { weave, pulse: false };
  return {
    pulse: true,
    weave: { ...weave, charge: 0, lastPulseWeek: week },
  };
}

export function getRoomDisplayMeta(roomId, ownedHallSkills = {}) {
  const room = ROOM_BY_ID[roomId];
  if (!room) return null;
  const skills = skillsForRoom(roomId);
  const owned = skills.filter((sk) => ownedHallSkills[sk.id]);
  const purchasable = skills.filter((sk) => !ownedHallSkills[sk.id]);
  return { room, owned, purchasable, tierMax: Math.max(0, ...owned.map((s) => s.tier)) };
}
