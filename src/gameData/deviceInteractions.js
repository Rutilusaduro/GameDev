// ═══════════════════════════════════════════════════════════════
// UNIQUE DEVICE INTERACTIONS — combo / context tag resolver
// ═══════════════════════════════════════════════════════════════
import { getEquippedDeviceIds } from './deviceEquip.js';
import { getStage } from './stages.js';

const INTERACTION_RULES = [
  {
    id: 'furniture_legs_synergy',
    tag: 'device_synergy_furniture_legs',
    requires: { equipped: ['living_furniture_rig', 'reinforced_legs'], minStage: 5 },
  },
  {
    id: 'feeder_mask_stack',
    tag: 'device_synergy_feeder_mask',
    requires: { equipped: ['auto_feeder_arm', 'feeding_mask'], minStage: 4 },
  },
  {
    id: 'belt_obedience_stack',
    tag: 'device_synergy_belt_obedience',
    requires: { equipped: ['auto_bloating_belt', 'obedience_belt'], minStage: 4 },
  },
];

/**
 * @returns {string|null} interaction tag for prose scene
 */
export function findUniqueInteraction(student, _player, _slot, _ctx = {}) {
  const equipped = getEquippedDeviceIds(student);
  const stageId = getStage(student?.lbs ?? 130).id;

  for (const rule of INTERACTION_RULES) {
    const req = rule.requires;
    if (req.equipped && !req.equipped.every((id) => equipped.includes(id))) continue;
    if (req.minStage != null && stageId < req.minStage) continue;
    return rule.tag;
  }
  return null;
}
