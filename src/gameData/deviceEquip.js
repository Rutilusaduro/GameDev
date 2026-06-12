// ═══════════════════════════════════════════════════════════════
// DEVICE EQUIP HELPERS — engine-free, no text-engine imports
// ═══════════════════════════════════════════════════════════════
import { DEVICE_SLOTS } from './devices.js';

export function getEquippedDeviceIds(student) {
  const ids = [];
  if (!student?.equip) return ids;
  for (const slot of DEVICE_SLOTS) {
    const e = student.equip[slot];
    if (e?.defId) ids.push(e.defId);
    if (e?.attachments) {
      for (const a of Object.values(e.attachments)) {
        if (a?.defId) ids.push(a.defId);
      }
    }
  }
  return ids;
}

export function hasPredatorCapture(student) {
  const mask = student?.equip?.head;
  if (!mask || mask.defId !== 'feeding_mask') return false;
  return mask.attachments?.captureUpgrade?.defId === 'predator_capture_module';
}
