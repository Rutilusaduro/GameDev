// ═══════════════════════════════════════════════════════════════
// PLAYER INVENTION RECIPES — unlock predicates + craft gating
// ═══════════════════════════════════════════════════════════════
import { TALIA_STUDENT_ID } from './talia.js';

export const PLAYER_RECIPES = {
  recipe_controlled_bloating: {
    id: 'recipe_controlled_bloating',
    deviceId: 'controlled_bloating_rig',
    label: 'Controlled Bloating Rig',
    tier: 'basic',
    // TODO tune thresholds
    unlock: ({ player, students, labState }) => {
      const talia = students.find((s) => s.id === TALIA_STUDENT_ID);
      return (talia?.relationship ?? 0) >= 40 && (labState?.stage ?? 0) >= 1;
    },
  },
  recipe_precision_feeder: {
    id: 'recipe_precision_feeder',
    deviceId: 'precision_feeder_arm',
    label: 'Precision Feeder Arm',
    tier: 'basic',
    unlock: ({ player, students, labState }) => {
      const talia = students.find((s) => s.id === TALIA_STUDENT_ID);
      return (talia?.relationship ?? 0) >= 50 && (labState?.sessionsRun ?? 0) >= 3;
    },
  },
  recipe_stabilized_paste: {
    id: 'recipe_stabilized_paste',
    deviceId: 'stabilized_paste_printer',
    label: 'Stabilized Paste Printer',
    tier: 'advanced',
    unlock: ({ pharmacistState, labState }) => (pharmacistState?.stage ?? 0) >= 1 && (labState?.stage ?? 0) >= 2,
  },
  recipe_measured_bloat: {
    id: 'recipe_measured_bloat',
    deviceId: 'measured_bloat_canister',
    label: 'Measured Bloat Canister',
    tier: 'basic',
    unlock: ({ students, labState }) => {
      const talia = students.find((s) => s.id === TALIA_STUDENT_ID);
      return !!talia?.evolvedForm && (labState?.stage ?? 0) >= 1;
    },
  },
  recipe_adaptive_harness: {
    id: 'recipe_adaptive_harness',
    deviceId: 'adaptive_growth_harness',
    label: 'Adaptive Growth Harness',
    tier: 'advanced',
    unlock: ({ students, campusState }) => {
      const anyEvolved = students.some((s) => !!s.evolvedForm);
      const finds = campusState?.exploration?.finds?.length ?? 0;
      return anyEvolved && finds >= 2;
    },
  },
};

export function evaluatePlayerRecipeUnlocks(state = {}) {
  const unlocked = {};
  for (const recipe of Object.values(PLAYER_RECIPES)) {
    try {
      if (recipe.unlock(state)) unlocked[recipe.id] = true;
    } catch {
      // predicate failed safely
    }
  }
  return unlocked;
}

export function isPlayerRecipeUnlocked(recipeId, player, state = {}) {
  if (player?.deviceUnlocks?.[recipeId]) return true;
  const recipe = PLAYER_RECIPES[recipeId];
  if (!recipe) return false;
  return !!recipe.unlock({ ...state, player });
}

export function playerRecipeForDevice(deviceId) {
  return Object.values(PLAYER_RECIPES).find((r) => r.deviceId === deviceId) || null;
}
