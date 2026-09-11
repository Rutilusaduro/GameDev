// ═══════════════════════════════════════════════════════════════
// HALL BLUEPRINT — spatial map of prestige upgrades by room wing
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';

/** @typedef {{ id: string, label: string, short: string, emoji: string, categories: string[], blurb: string }} HallRoom */

export const HALL_ROOMS = [
  {
    id: 'common_lounge',
    label: 'Common Lounge',
    short: 'Lounge',
    emoji: '🛋️',
    categories: ['environment'],
    blurb: 'Seating, climate, light — the room that teaches bodies to stay.',
  },
  {
    id: 'kitchen_pantry',
    label: 'Kitchen & Pantry',
    short: 'Kitchen',
    emoji: '🍳',
    categories: ['feeding'],
    blurb: 'Always-on appetite infrastructure — smell, stock, and second helpings.',
  },
  {
    id: 'ra_office',
    label: 'RA Office',
    short: 'Office',
    emoji: '📋',
    categories: ['efficiency'],
    blurb: 'Schedule leverage, paperwork cover, the quiet math of more time.',
  },
  {
    id: 'social_salon',
    label: 'Social Salon',
    short: 'Salon',
    emoji: '🥂',
    categories: ['social'],
    blurb: 'Dining out, gifts, group dynamics — indulgence dressed as programming.',
  },
  {
    id: 'wellness_nook',
    label: 'Wellness Nook',
    short: 'Nook',
    emoji: '🌙',
    categories: ['psychology'],
    blurb: 'Observation, framing, dreams — where want learns its vocabulary.',
  },
  {
    id: 'grand_atrium',
    label: 'Grand Atrium',
    short: 'Atrium',
    emoji: '✨',
    categories: ['prestige'],
    blurb: 'Capstone prestige — the floor becomes institution.',
  },
];

/** Adjacent room pairs that can resonate when both wings are developed. */
export const HALL_ROOM_ADJACENCY = [
  ['common_lounge', 'kitchen_pantry'],
  ['common_lounge', 'social_salon'],
  ['kitchen_pantry', 'wellness_nook'],
  ['ra_office', 'wellness_nook'],
  ['social_salon', 'grand_atrium'],
  ['common_lounge', 'wellness_nook'],
];

const ROOM_BY_ID = Object.fromEntries(HALL_ROOMS.map((r) => [r.id, r]));

export function getHallRoom(roomId) {
  return ROOM_BY_ID[roomId] || null;
}

export function roomCategories(roomId) {
  return getHallRoom(roomId)?.categories || [];
}

export function skillsForHallRoom(roomId) {
  const cats = new Set(roomCategories(roomId));
  if (!cats.size) return [];
  return SKILL_TREE.filter((sk) => cats.has(sk.category));
}

export function countOwnedInRoom(owned = {}, roomId) {
  const ids = new Set(skillsForHallRoom(roomId).map((s) => s.id));
  return Object.keys(owned).filter((id) => owned[id] && ids.has(id)).length;
}

export function roomDevelopmentTier(owned = {}, roomId) {
  const n = countOwnedInRoom(owned, roomId);
  if (n >= 8) return 3;
  if (n >= 4) return 2;
  if (n >= 1) return 1;
  return 0;
}

/**
 * +2% gain per adjacent pair when both rooms reach development tier 2+.
 * Caps at +12% (six pairs max theoretical; usually 2–4 active).
 */
export function computeHallRoomSynergyBonus(owned = {}) {
  let pairs = 0;
  HALL_ROOM_ADJACENCY.forEach(([a, b]) => {
    if (roomDevelopmentTier(owned, a) >= 2 && roomDevelopmentTier(owned, b) >= 2) pairs += 1;
  });
  return Math.min(0.12, pairs * 0.02);
}

export function listActiveSynergies(owned = {}) {
  return HALL_ROOM_ADJACENCY.filter(([a, b]) => (
    roomDevelopmentTier(owned, a) >= 2 && roomDevelopmentTier(owned, b) >= 2
  )).map(([a, b]) => ({
    a: getHallRoom(a),
    b: getHallRoom(b),
    bonusPct: 2,
  }));
}
