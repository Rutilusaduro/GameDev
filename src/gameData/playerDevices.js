// ═══════════════════════════════════════════════════════════════
// PLAYER PERSONAL DEVICES — self-equip helpers (engine-free)
// ═══════════════════════════════════════════════════════════════
import { getDevice } from './devices.js';
import { nextDeviceInstanceId } from './deviceEffects.js';
import { PLAYER_EQUIP_SLOTS } from './player.js';

export function getPlayerEquippedIds(player) {
  const ids = [];
  if (!player?.equip) return ids;
  for (const slot of PLAYER_EQUIP_SLOTS) {
    const entry = player.equip[slot];
    if (entry?.defId) ids.push(entry.defId);
  }
  return ids;
}

export function equipPlayerDevice(player, defId, slotKey) {
  const def = getDevice(defId);
  if (!def?.playerInvention || def.equipTarget !== 'self') {
    return { player, ok: false, reason: 'not_player_device' };
  }
  const slot = slotKey || def.selfSlot;
  if (!slot || slot === 'special') {
    return { player, ok: false, reason: 'bad_slot' };
  }
  if (player.equip?.[slot]) {
    return { player, ok: false, reason: 'slot_occupied' };
  }
  const equip = { ...(player.equip || {}) };
  equip[slot] = { defId, instanceId: nextDeviceInstanceId() };
  return {
    player: { ...player, equip },
    ok: true,
    slot,
  };
}

export function unequipPlayerDevice(player, slotKey) {
  if (!player?.equip?.[slotKey]) {
    return { player, cleared: false };
  }
  const equip = { ...player.equip, [slotKey]: null };
  return { player: { ...player, equip }, cleared: true };
}
