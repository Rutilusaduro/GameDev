// ═══════════════════════════════════════════════════════════════
// SCENE: DEVICE WEEKLY TICK — public API
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import { getStage } from '../../../gameData/stages.js';
import { getEquippedDeviceIds } from '../../../gameData/deviceEquip.js';
import './fragments.js';
import '../../modules.js';

registerPool('device.tick.beat', [
  { when: { isMalfunction: true }, text: [
    '⚠️ {device.tick.action}{device.tick.anchor}{join:device.tick.malfClause|prefix: — }; {device.tick.sensation}.',
  ] },
  { when: {}, text: [
    '{device.tick.action}{device.tick.anchor}; {device.tick.sensation}{join:device.tick.synergy|prefix: }.',
  ] },
]);

function weightBandFromLbs(lbs) {
  const stageId = getStage(lbs ?? 130).id;
  const bands = { lean: [0, 2], mid: [3, 5], heavy: [6, 8], extreme: [9, 11] };
  for (const [band, [lo, hi]] of Object.entries(bands)) {
    if (stageId >= lo && stageId <= hi) return band;
  }
  return 'lean';
}

function primaryAttachment(attachmentIds = []) {
  if (attachmentIds.includes('liquid_fat_infuser')) return 'liquid_fat_infuser';
  if (attachmentIds.includes('calorie_paste_printer')) return 'calorie_paste_printer';
  if (attachmentIds.includes('predator_capture_module')) return 'predator_capture_module';
  return attachmentIds[0] || null;
}

export function renderDeviceTickLine({
  student,
  deviceId,
  deviceLabel,
  slot,
  gainLbs = 0,
  malfunctionTier = null,
  attachmentIds = [],
  isMalfunction = false,
  week = 1,
  trace = null,
}) {
  const equipped = getEquippedDeviceIds(student);
  const comfort = student?.deviceState?.furnitureComfort ?? 100;
  const ctx = createContext({
    subject: student,
    week,
    globals: {
      deviceId,
      deviceLabel,
      slot,
      gainLbs,
      gainLbsMin: gainLbs,
      malfunctionTier,
      isMalfunction,
      hasAttachment: primaryAttachment(attachmentIds),
      attachmentIds,
      weightBand: weightBandFromLbs(student?.lbs),
      bodyState: student?.bodyOverride?.stateType || null,
      equippedCountMin: equipped.length >= 3 ? equipped.length : 0,
      equippedWaist: student?.equip?.waist?.defId || null,
      equippedHead: student?.equip?.head?.defId || null,
      furnitureComfortLow: deviceId === 'living_furniture_rig' && comfort < 40,
    },
  });
  return render('{device.tick.beat}', ctx, { trace });
}
