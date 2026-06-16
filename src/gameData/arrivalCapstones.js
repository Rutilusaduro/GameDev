// ═══════════════════════════════════════════════════════════════
// ARRIVAL CAPSTONES — per-evolved-form repeatable endgame activities
// ═══════════════════════════════════════════════════════════════
import { getEvolvedActivityStageIdx } from '../utils/gameHelpers.js';

export const ARRIVAL_CAPSTONES = {
  sumo: {
    formId: 'sumo',
    minStageIdx: 4,
    label: 'Grand Bout',
    apCost: 2,
    desc: 'A ceremonial match that celebrates how far she has come — repeatable, always heavier.',
    boardBranchHint: 'sumo_arrival',
    boardUnlock: { deviceDefId: 'auto_bloating_belt', nodeId: 'abb_sumo_arrival' },
  },
  eating_streamer: {
    formId: 'eating_streamer',
    minStageIdx: 4,
    label: 'Legacy Stream',
    apCost: 2,
    desc: 'A capstone broadcast where the audience knows exactly what they are watching.',
    boardUnlock: { deviceDefId: 'obedience_belt', nodeId: 'ob_streamer_arrival' },
  },
  feedee_creator: {
    formId: 'feedee_creator',
    minStageIdx: 4,
    label: 'Creator Arrival',
    apCost: 2,
    desc: 'The channel stops pretending. The feed is the point.',
    boardUnlock: { deviceDefId: 'growth_serum_injector', nodeId: 'gsi_creator_arrival' },
  },
  machine_goddess: {
    formId: 'machine_goddess',
    minStageIdx: 4,
    label: 'Factory Blessing',
    apCost: 2,
    desc: 'Talia runs the mesh at full saturation across the roster for one perfect week.',
    boardUnlock: { deviceDefId: 'endless_hunger_engine', nodeId: 'ehe_mesh_arrival' },
  },
  competitive_gainer: {
    formId: 'competitive_gainer',
    minStageIdx: 4,
    label: 'Open Challenge',
    apCost: 2,
    desc: 'She invites the room to witness the final version of the competition.',
    boardUnlock: { deviceDefId: 'growth_accelerator_chamber', nodeId: 'gac_metabolic_override' },
  },
  delivery_hive: {
    formId: 'delivery_hive',
    minStageIdx: 4,
    label: 'Hive Arrival',
    apCost: 2,
    desc: 'The building answers to her completely. Deliveries never stop.',
    boardUnlock: { deviceDefId: 'living_furniture_rig', nodeId: 'lfr_hive_arrival' },
  },
};

export function getArrivalCapstone(student) {
  if (!student?.evolvedForm) return null;
  const cap = ARRIVAL_CAPSTONES[student.evolvedForm];
  if (!cap) return null;
  const idx = getEvolvedActivityStageIdx(student);
  if (idx < cap.minStageIdx) return null;
  const unlocked = student.arrivalCapstoneUnlocked ?? false;
  if (!unlocked && idx >= cap.minStageIdx) {
    return { ...cap, firstUnlock: true };
  }
  if (unlocked) return { ...cap, firstUnlock: false };
  return null;
}

export function markArrivalUnlocked(student) {
  return { ...student, arrivalCapstoneUnlocked: true };
}

export function getArrivalBoardUnlock(student) {
  if (!student?.evolvedForm) return null;
  return ARRIVAL_CAPSTONES[student.evolvedForm]?.boardUnlock ?? null;
}
