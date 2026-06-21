// ═══════════════════════════════════════════════════════════════
// SPIRIT & VESSEL IDENTITY — pre-game character creation
// Two axes: VESSEL (subject the spirit rides) × SOUL (spirit aspect).
// Vessel decides who + where (starting roster, scrutiny shape).
// Soul decides how (gain lean, favor rhythm, UI accent, lore).
// All four spirits are gluttony-and-sloth at root; the lean varies.
// ═══════════════════════════════════════════════════════════════

// Eligible unlock pool — story-gated girls (Lilith 15, Sophia 16,
// Indiana 17, Talia 18) are excluded; they keep their own unlock paths.
export const UNLOCK_POOL_IDS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// ── VESSELS (subject) ─────────────────────────────────────────
// startArchetypes → the 5 girls closest to this professor at week 1.
// gainMult / scrutinyMult → world-facing tilt (applied to existing levers).
export const SUBJECTS = {
  calculus: {
    id: 'calculus', label: 'Calculus',
    startArchetypes: ['overachiever', 'bookworm', 'psych', 'gamer', 'athlete'],
    gainMult: 1.0, scrutinyMult: 0.85,
    hook: 'Numbers hide what bodies do. The dean reads spreadsheets, not waistlines — and yours always balance.',
  },
  writing: {
    id: 'writing', label: 'Creative Writing',
    startArchetypes: ['artsy', 'bookworm', 'quiet', 'transfer', 'influencer'],
    gainMult: 1.05, scrutinyMult: 1.0,
    hook: 'You teach them to want a thing and name it. The wanting comes easy after that.',
  },
  biology: {
    id: 'biology', label: 'Biology',
    startArchetypes: ['nursing', 'culinary', 'farm_girl', 'athlete', 'eced'],
    gainMult: 1.1, scrutinyMult: 1.05,
    hook: 'Metabolism, appetite, the body as a system you grade. Every lecture is permission dressed as science.',
  },
  physics: {
    id: 'physics', label: 'Physics',
    startArchetypes: ['overachiever', 'gamer', 'athlete', 'influencer', 'cheerleader'],
    gainMult: 1.0, scrutinyMult: 0.9,
    hook: 'Mass, force, the inevitability of a body at rest staying at rest. You teach them gravity always wins.',
  },
};

// ── SOULS (spirit aspect) ─────────────────────────────────────
// lean → drives favorActions and which playstyle the meter rewards.
// color → base accent token (C.accent), recolors chrome/spirit surfaces.
// favorActions → { actionTag: fillAmount } for the Spirit Favor meter.
// startMods → applied to every starting student at game start.
// loreParas → intro screen prose (authored, off the lint pools).
export const SPIRITS = {
  bloom: {
    id: 'bloom', label: 'The Bloom', lean: 'corruption',
    color: '#8a4be0', accentSoft: 'rgba(138,75,224,0.22)',
    traits: ['persuasive'],
    favorActions: { intimacy: 4, session: 3, feed: 2 },
    startMods: { corruption: 8 },
    gainMult: 1.0, corruptionMult: 1.4,
    loreParas: [
      'You drop a word in the lecture — appetite, indulgence, the body as a site of permission — and you watch it land. She writes it down. By Thursday she has told a friend it was her own idea.',
      'The reach for the extra portion comes with a reason, and the reason sounds right, because she built it herself from material you left in the room. That is the whole shape of you: grammar, not instruction.',
    ],
  },
  hearth: {
    id: 'hearth', label: 'The Hearth', lean: 'comfort',
    color: '#d8943a', accentSoft: 'rgba(216,148,58,0.20)',
    traits: ['patient'],
    favorActions: { comfort: 4, session: 3, talk: 2 },
    startMods: {},
    gainMult: 1.0, passiveBonus: 1, scrutinyMult: 0.8,
    loreParas: [
      'The seminars run long. Nobody minds. She used to be the one checking the clock, but now she is the one still talking when the chairs are being stacked, still full, not ready to go back out into the cold.',
      'The walk home gets shorter each week — she reroutes around the steep parts, then the stairs. You did not suggest any of it. She chose the path that ended with sitting down. Comfort is its own compass.',
    ],
  },
  hollow: {
    id: 'hollow', label: 'The Hollow', lean: 'hunger',
    color: '#c83a4a', accentSoft: 'rgba(200,58,74,0.20)',
    traits: ['generous'],
    favorActions: { feed: 4, dinner: 3, stuff: 4 },
    startMods: { hunger: 18 },
    gainMult: 1.15, scrutinyMult: 1.1,
    loreParas: [
      'She finishes the meal and the room is still asking. She stands at the counter eating from the pan because finding a plate meant a decision. She texts a friend she is a little hungry. There are six dishes in the sink already.',
      'You are the part of her that does the accounting wrong. She calculates that she should feel done, and she should — but the number never settles. She goes back. The math never comes out right. You are why.',
    ],
  },
  tide: {
    id: 'tide', label: 'The Tide', lean: 'trust',
    color: '#2a9d8f', accentSoft: 'rgba(42,157,143,0.20)',
    traits: ['discreet'],
    favorActions: { talk: 4, session: 3, dinner: 2 },
    startMods: { relationship: 10 },
    gainMult: 1.0, scrutinyMult: 0.85,
    loreParas: [
      'She stays after the third class to tell you about a restaurant she found. The fourth time she brings leftovers. She is talking about food but she is telling you something else — that she has decided you are someone she feeds.',
      'Trust builds the way she loosens. She stops prefacing things with I know I shouldn\'t but. She texts you what she ordered. She calls it a recommendation and it arrives in a container big enough for two and she does not mention the size.',
    ],
  },
};

export const SPIRIT_LIST = Object.values(SPIRITS);
export const SUBJECT_LIST = Object.values(SUBJECTS);

// Favor meter cap. Refund stays under typical fill-cost → rebate, not engine.
export const FAVOR_MAX = 10;
export const FAVOR_REBATE = 1;

export function getSpirit(id) { return SPIRITS[id] || null; }
export function getSubject(id) { return SUBJECTS[id] || null; }

/** Favor gained from an action tag for this spirit (0 if off-lean). */
export function favorFill(spiritId, tag) {
  return SPIRITS[spiritId]?.favorActions?.[tag] || 0;
}

/** Combined gain multiplier from chosen vessel + soul. */
export function profileGainMult(profile) {
  if (!profile) return 1;
  const subj = SUBJECTS[profile.subject];
  const spirit = SPIRITS[profile.spiritId];
  return (subj?.gainMult ?? 1) * (spirit?.gainMult ?? 1);
}

/** Combined scrutiny multiplier (lower = stealthier). */
export function profileScrutinyMult(profile) {
  if (!profile) return 1;
  const subj = SUBJECTS[profile.subject];
  const spirit = SPIRITS[profile.spiritId];
  return (subj?.scrutinyMult ?? 1) * (spirit?.scrutinyMult ?? 1);
}

/** Passive lbs bonus from soul (Hearth). */
export function profilePassiveBonus(profile) {
  return SPIRITS[profile?.spiritId]?.passiveBonus || 0;
}

/** Corruption multiplier from soul (Bloom). */
export function profileCorruptionMult(profile) {
  return SPIRITS[profile?.spiritId]?.corruptionMult || 1;
}
