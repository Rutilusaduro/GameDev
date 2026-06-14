// ═══════════════════════════════════════════════════════════════
// DEVICE QUERY — filtering and derived status (engine-free)
// ═══════════════════════════════════════════════════════════════
import { DEVICES, DEVICE_SLOTS } from './devices.js';
import { PLAYER_EQUIP_SLOTS } from './player.js';

export function countOwnedDevices(deviceInventory = {}) {
  return Object.values(deviceInventory).reduce((n, q) => n + (q > 0 ? q : 0), 0);
}

export function countEquippedOnStudent(student) {
  if (!student?.equip) return 0;
  return DEVICE_SLOTS.filter((slot) => !!student.equip[slot]).length;
}

export function countEquippedAcrossStudents(students = [], player = null) {
  let n = students.reduce((sum, s) => sum + countEquippedOnStudent(s), 0);
  if (player?.equip) {
    for (const slot of PLAYER_EQUIP_SLOTS) {
      if (player.equip[slot]) n += 1;
    }
  }
  return n;
}

export function isDeviceModified(student, defId) {
  if (!student?.equip || !defId) return false;
  for (const slot of DEVICE_SLOTS) {
    const entry = student.equip[slot];
    if (entry?.defId === defId && (entry.mods?.length ?? 0) > 0) return true;
  }
  return false;
}

/** Where a deviceId is currently equipped, if anywhere. */
export function findDeviceEquipLocation(defId, students = [], player = null) {
  for (const s of students) {
    if (!s.equip) continue;
    for (const slot of DEVICE_SLOTS) {
      const entry = s.equip[slot];
      if (entry?.defId === defId) {
        return { type: 'student', studentId: s.id, studentName: s.name, slot };
      }
      if (entry?.attachments) {
        for (const [attachSlot, attach] of Object.entries(entry.attachments)) {
          if (attach?.defId === defId) {
            return { type: 'student', studentId: s.id, studentName: s.name, slot, attachSlot };
          }
        }
      }
    }
  }
  if (player?.equip) {
    for (const slot of PLAYER_EQUIP_SLOTS) {
      const entry = player.equip[slot];
      if (entry?.defId === defId) {
        return { type: 'player', slot };
      }
    }
  }
  return null;
}

export function deviceStatusBadge(defId, { deviceInventory, students, player }) {
  const owned = (deviceInventory?.[defId] ?? 0) > 0;
  const loc = findDeviceEquipLocation(defId, students, player);
  if (loc) return { label: 'Equipped', color: '#4a9a5a' };
  if (owned) return { label: 'Available', color: '#5090c8' };
  return { label: 'Not owned', color: '#606878' };
}

function matchesForm(def, formFilter) {
  if (!formFilter || formFilter === 'all') return true;
  if (formFilter === 'installed') return def.form === 'installed' || def.form === 'worn';
  if (formFilter === 'stationary') return def.form === 'stationary';
  return def.form === formFilter;
}

function matchesTarget(def, targetFilter) {
  if (!targetFilter || targetFilter === 'all') return true;
  if (targetFilter === 'self') return def.equipTarget === 'self' || def.playerInvention;
  if (targetFilter === 'student') return def.equipTarget !== 'self' && !def.playerInvention;
  return true;
}

/**
 * Filter device catalog entries for UI lists.
 * @param {object} opts
 * @param {string} [opts.form]
 * @param {number|string} [opts.tier]
 * @param {string} [opts.search]
 * @param {string} [opts.target]
 * @param {boolean} [opts.ownedOnly]
 * @param {boolean} [opts.playerInventionsOnly]
 * @param {object} [opts.deviceInventory]
 */
export function filterDevices(opts = {}) {
  const {
    form, tier, search, target, ownedOnly, playerInventionsOnly, deviceInventory = {},
  } = opts;
  const q = (search || '').trim().toLowerCase();

  return Object.values(DEVICES).filter((def) => {
    if (playerInventionsOnly && !def.playerInvention) return false;
    if (!playerInventionsOnly && opts.excludePlayerInventions && def.playerInvention) return false;
    if (ownedOnly && (deviceInventory[def.id] ?? 0) <= 0) return false;
    if (!matchesForm(def, form)) return false;
    if (tier != null && tier !== 'all' && def.tier !== Number(tier)) return false;
    if (!matchesTarget(def, target)) return false;
    if (q) {
      const hay = `${def.label} ${def.desc} ${def.id}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

export function summarizeDeviceEffect(def) {
  if (!def) return '';
  const parts = [];
  const we = def.weeklyEffect;
  if (we?.gainLbs) {
    const [lo, hi] = we.gainLbs;
    parts.push(`+${lo}–${hi} lbs/wk`);
  }
  if (we?.bodyOverride?.stateType) parts.push(we.bodyOverride.stateType);
  if (def.growthProfile?.growthMethod) parts.push(def.growthProfile.growthMethod);
  return parts.join(' · ') || 'passive device';
}

export function listOwnedDeviceIds(deviceInventory = {}) {
  return Object.entries(deviceInventory)
    .filter(([, qty]) => qty > 0)
    .map(([id]) => id);
}

export function listEquippedEntries(students = [], player = null) {
  const rows = [];
  for (const s of students) {
    if (!s.equip) continue;
    for (const slot of DEVICE_SLOTS) {
      const entry = s.equip[slot];
      if (!entry?.defId) continue;
      const def = DEVICES[entry.defId];
      rows.push({
        defId: entry.defId,
        def,
        slot,
        holder: s.name,
        holderId: s.id,
        holderType: 'student',
        modified: (entry.mods?.length ?? 0) > 0,
      });
    }
  }
  if (player?.equip) {
    for (const slot of PLAYER_EQUIP_SLOTS) {
      const entry = player.equip[slot];
      if (!entry?.defId) continue;
      const def = DEVICES[entry.defId];
      rows.push({
        defId: entry.defId,
        def,
        slot,
        holder: 'Professor',
        holderType: 'player',
        modified: (entry.mods?.length ?? 0) > 0,
      });
    }
  }
  return rows;
}

export function devicesCompatibleWithSlot(deviceInventory, slotKey, { playerMode = false } = {}) {
  const owned = listOwnedDeviceIds(deviceInventory);
  const engineSlot = slotKey === 'torso' ? 'back' : slotKey;
  if (slotKey === 'special') return [];

  return owned
    .map((id) => DEVICES[id])
    .filter((def) => {
      if (!def) return false;
      if (playerMode) return def.playerInvention && (def.selfSlot === slotKey || def.selfSlot === engineSlot);
      if (def.form === 'attachment' || def.form === 'consumable' || def.form === 'campus_tool') return false;
      if (def.form === 'stationary') return engineSlot === 'fullBody';
      return def.slot === engineSlot;
    });
}
