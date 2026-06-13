// ═══════════════════════════════════════════════════════════════
// UNIQUE DEVICE INTERACTIONS — combo / context tag resolver
// ═══════════════════════════════════════════════════════════════
import { getEquippedDeviceIds } from './deviceEquip.js';
import { getDevice } from './devices.js';
import { getStage } from './stages.js';

const INTERACTION_RULES = [
  {
    id: 'harness_bloat_synergy',
    tag: 'device_synergy_harness_bloat',
    requires: { equipped: ['adaptive_growth_harness', 'controlled_bloating_rig'], minStage: 7 },
  },
  {
    id: 'feeder_paste_stack',
    tag: 'device_synergy_feeder_paste',
    requires: { equipped: ['precision_feeder_arm'], attachment: 'stabilized_paste_printer' },
  },
  {
    id: 'residual_feed_amplify',
    tag: 'device_synergy_residual_feed',
    requires: { deviceState: 'residualSwell', playerEquipped: 'measured_bloat_canister' },
  },
  {
    id: 'player_rig_double',
    tag: 'device_synergy_player_rigs',
    requires: { playerEquipped: ['controlled_bloating_rig', 'precision_feeder_arm'], minStage: 5 },
  },
];

function hasAttachments(student, attachDefId) {
  if (!student?.equip) return false;
  for (const slot of Object.keys(student.equip)) {
    const entry = student.equip[slot];
    if (!entry?.attachments) continue;
    for (const a of Object.values(entry.attachments)) {
      if (a?.defId === attachDefId) return true;
    }
  }
  return false;
}

function playerHasEquipped(player, ids) {
  const equipped = [];
  if (player?.equip) {
    for (const entry of Object.values(player.equip)) {
      if (entry?.defId) equipped.push(entry.defId);
    }
  }
  return ids.every((id) => equipped.includes(id));
}

/**
 * @returns {string|null} interaction tag for prose scene
 */
export function findUniqueInteraction(student, player, slot, ctx = {}) {
  const equipped = getEquippedDeviceIds(student);
  const stageId = getStage(student?.lbs ?? 130).id;

  for (const rule of INTERACTION_RULES) {
    const req = rule.requires;
    if (req.equipped && !req.equipped.every((id) => equipped.includes(id))) continue;
    if (req.minStage != null && stageId < req.minStage) continue;
    if (req.attachment && !hasAttachments(student, req.attachment)) continue;
    if (req.deviceState === 'residualSwell' && !student?.deviceState?.residualSwell) continue;
    if (req.playerEquipped) {
      const ids = Array.isArray(req.playerEquipped) ? req.playerEquipped : [req.playerEquipped];
      if (!playerHasEquipped(player, ids)) continue;
    }
    if (ctx.deviceId) {
      const def = getDevice(ctx.deviceId);
      const tags = def?.uniqueInteractionTags || [];
      if (tags.length && !tags.some((t) => rule.tag.includes(t.split('_')[0]))) {
        // loose match — still allow if combo rule fires
      }
    }
    return rule.tag;
  }
  return null;
}
