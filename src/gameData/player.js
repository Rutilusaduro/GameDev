// ═══════════════════════════════════════════════════════════════
// PLAYER STATE — RA-scoped scalars + self-device fields
// Engine-free. Persistence not implemented (in-memory only).
// ═══════════════════════════════════════════════════════════════
import { WALLET_CONFIG } from './wallet.js';
import { DEFAULT_MOD_INVENTORY } from './deviceMods.js';
import { createInitialV2State } from './v2/state.js';
import { createInitialHallAmbianceState } from './hallAmbiance.js';

/** Empty player equip slots (RA self-equipped personal devices). */
export const PLAYER_EQUIP_SLOTS = ['head', 'neck', 'torso', 'arms', 'waist', 'legs', 'fullBody', 'special'];

export function createEmptyPlayerEquip() {
  return Object.fromEntries(PLAYER_EQUIP_SLOTS.map((s) => [s, null]));
}

/**
 * Initial player object — fold all RA-scoped scalars here.
 * @param {object} [overrides]
 */
export function createInitialPlayer(overrides = {}) {
  return {
    money: WALLET_CONFIG.startingBalance,
    ap: 5,
    week: 1,
    ownedSkills: {},
    ownedHallSkills: overrides.ownedHallSkills ?? overrides.ownedClassSkills ?? {},
    facultyAffinity: {},
    raProfile: null,
    unlockedDorms: [],
    hallCred: 0,
    adminScrutiny: 0,
    globalStats: { narrativeCount: 0 },
    achievements: [],
    bigScaleUnlocked: false,
    // Player-personal device fields (Phase 2+)
    equip: createEmptyPlayerEquip(),
    selfDeviceState: {},
    psychBonus: { obsession: 0, fixation: 0 },
    deviceUnlocks: {},
    modUnlocks: {},
    modInventory: { ...DEFAULT_MOD_INVENTORY },
    v2State: createInitialV2State(),
    hallAmbiance: createInitialHallAmbianceState(),
    ...overrides,
  };
}

/** Shallow-merge patch into player. */
export function patchPlayer(player, patch) {
  return { ...player, ...patch };
}

/** Functional field updater — mirrors React setState(fn) pattern. */
export function updatePlayerField(player, key, updater) {
  const current = player[key];
  const next = typeof updater === 'function' ? updater(current) : updater;
  return { ...player, [key]: next };
}
