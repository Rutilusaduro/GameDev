// ═══════════════════════════════════════════════════════════════
// DEVICE EFFECT RESOLUTION — engine-free logic
// ═══════════════════════════════════════════════════════════════
import { renderDeviceTickLine } from '../textEngine/scenes/deviceTick/index.js';
import { renderSuddenGrowthLine } from '../textEngine/scenes/suddenGrowth/index.js';
import { getDevice, DEVICE_SLOTS } from './devices.js';
import { applyPsychDelta } from './psychState.js';
import {
  bumpWeeklyDeviceDependence,
  bumpEquipDeviceDependence,
  bumpCampusDeviceDependence,
} from './deviceDependence.js';

export { getEquippedDeviceIds, hasPredatorCapture } from './deviceEquip.js';

let _instanceCounter = 0;
export function nextDeviceInstanceId() {
  _instanceCounter += 1;
  return `dev_${Date.now()}_${_instanceCounter}`;
}

export function slotFor(def) {
  if (!def) return null;
  if (def.form === 'attachment') return def.attachSlot || null;
  return def.slot || null;
}

export function isSlotFree(student, slot) {
  if (!slot || !student?.equip) return false;
  return !student.equip[slot];
}

export function equipDevice(student, defId, week = 1) {
  const def = getDevice(defId);
  if (!def || def.form === 'consumable' || def.form === 'attachment' || def.form === 'campus_tool') {
    return { student, ok: false, reason: 'invalid' };
  }
  const slot = slotFor(def);
  if (!slot || !isSlotFree(student, slot)) return { student, ok: false, reason: 'slot_occupied' };
  const equip = { ...(student.equip || {}) };
  equip[slot] = { defId, instanceId: nextDeviceInstanceId(), attachments: {} };
  let next = { ...student, equip };
  next = bumpEquipDeviceDependence(next, defId);
  return { student: next, ok: true, slot };
}

export function unequipDevice(student, slot) {
  if (!student?.equip?.[slot]) return { student, cleared: false };
  const entry = student.equip[slot];
  const equip = { ...student.equip, [slot]: null };
  let next = { ...student, equip };
  if (entry?.defId) {
    const def = getDevice(entry.defId);
    if (def?.weeklyEffect?.bodyOverride || student.bodyOverride?.sourceDeviceId === entry.defId) {
      next = { ...next, bodyOverride: null };
    }
  }
  return { student: next, cleared: true };
}

export function findAttachmentHostSlot(student, attachDefId) {
  const attachDef = getDevice(attachDefId);
  if (!attachDef || attachDef.form !== 'attachment') return null;
  for (const slot of DEVICE_SLOTS) {
    const host = student?.equip?.[slot];
    if (!host) continue;
    const hostDef = getDevice(host.defId);
    if (!hostDef?.attachmentSlots?.includes(attachDef.attachSlot)) continue;
    if (!attachDef.attachesTo?.includes(hostDef.id)) continue;
    if (host.attachments?.[attachDef.attachSlot]) continue;
    return slot;
  }
  return null;
}

export function attachToDevice(student, hostSlot, attachDefId) {
  const resolvedSlot = hostSlot || findAttachmentHostSlot(student, attachDefId);
  if (!resolvedSlot) return { student, ok: false, reason: 'no_host' };
  const host = student?.equip?.[resolvedSlot];
  if (!host) return { student, ok: false, reason: 'no_host' };
  const attachDef = getDevice(attachDefId);
  if (!attachDef || attachDef.form !== 'attachment') return { student, ok: false, reason: 'invalid_attach' };
  const hostDef = getDevice(host.defId);
  if (!hostDef?.attachmentSlots?.includes(attachDef.attachSlot)) return { student, ok: false, reason: 'bad_slot' };
  if (!attachDef.attachesTo?.includes(hostDef.id)) return { student, ok: false, reason: 'incompatible' };
  if (host.attachments?.[attachDef.attachSlot]) return { student, ok: false, reason: 'slot_full' };
  const equip = { ...student.equip };
  equip[resolvedSlot] = {
    ...host,
    attachments: {
      ...(host.attachments || {}),
      [attachDef.attachSlot]: { defId: attachDefId, instanceId: nextDeviceInstanceId() },
    },
  };
  return { student: { ...student, equip }, ok: true, slot: resolvedSlot };
}

function applyFurnitureComfortDelta(student, delta) {
  if (delta == null) return student;
  const prev = student.deviceState?.furnitureComfort ?? 100;
  const nextComfort = Math.max(0, Math.min(100, prev + delta));
  return {
    ...student,
    deviceState: { ...(student.deviceState || {}), furnitureComfort: nextComfort },
  };
}

function rollRange(range, rng) {
  if (!range) return 0;
  const [lo, hi] = range;
  return lo + Math.floor(rng() * (hi - lo + 1));
}

function attachmentIdsFromEntry(entry) {
  if (!entry?.attachments) return [];
  return Object.values(entry.attachments).map(a => a?.defId).filter(Boolean);
}

function growthLineForStudent(student, gainLbs) {
  return renderSuddenGrowthLine(student, {
    gainLbs,
    bodyState: student?.bodyOverride?.stateType || null,
  });
}

export { growthLineForStudent };

function buildTickEvent(student, slot, entry, week, rng, resultStudent, gainLbs, malf) {
  const def = getDevice(entry.defId);
  if (!def) return null;
  const attachmentIds = attachmentIdsFromEntry(entry);
  const prose = renderDeviceTickLine({
    student: resultStudent,
    deviceId: def.id,
    deviceLabel: def.label,
    slot,
    gainLbs,
    malfunctionTier: malf?.tier || null,
    attachmentIds,
    isMalfunction: !!malf,
    week,
  });
  return {
    studentId: student.id,
    studentName: student.name,
    deviceId: def.id,
    deviceLabel: def.label,
    deviceIcon: def.icon,
    slot,
    gainLbs,
    malfunction: malf,
    attachmentIds,
    prose,
    isMalfunction: !!malf,
  };
}

function mergeBodyOverride(student, overrideSpec, week, sourceDeviceId) {
  if (!overrideSpec) return student.bodyOverride || null;
  const expiresWeek = overrideSpec.durationWeeks
    ? week + overrideSpec.durationWeeks
    : null;
  return {
    stateType: overrideSpec.stateType || student.bodyOverride?.stateType || null,
    bodyTypeOverride: overrideSpec.bodyTypeOverride || student.bodyOverride?.bodyTypeOverride || null,
    stageBump: overrideSpec.stageBump ?? student.bodyOverride?.stageBump ?? 0,
    expiresWeek,
    permanent: !!overrideSpec.permanent,
    sourceDeviceId,
  };
}

export function applyDeviceEffect(student, effectSpec, ctx = {}) {
  const { week = 1, sourceDeviceId = null, rng = Math.random } = ctx;
  let next = { ...student };
  const lines = [];

  if (effectSpec?.gainLbs) {
    const lbs = rollRange(effectSpec.gainLbs, rng);
    next._pendingGainLbs = (next._pendingGainLbs || 0) + lbs;
    lines.push(`+${lbs} lbs from device effect`);
  }

  if (effectSpec?.bodyOverride) {
    next.bodyOverride = mergeBodyOverride(next, effectSpec.bodyOverride, week, sourceDeviceId);
    lines.push('body appearance overridden');
  }

  if (effectSpec?.permanentConvert) {
    const pc = effectSpec.permanentConvert;
    if (pc.gainLbs) {
      const lbs = rollRange(pc.gainLbs, rng);
      next._pendingGainLbs = (next._pendingGainLbs || 0) + lbs;
      lines.push(`+${lbs} lbs banked permanently`);
    }
    if (pc.bodyTypeOverride) {
      next.bodyType = pc.bodyTypeOverride;
      lines.push(`body shape shifted toward ${pc.bodyTypeOverride}`);
    }
    if (pc.bodyState) {
      next.bodyOverride = null;
      lines.push('override crystallized into permanent change');
    }
  }

  if (effectSpec?.psychDelta) {
    next.psych = applyPsychDelta(next.psych || {}, effectSpec.psychDelta);
  }

  if (effectSpec?.furnitureComfortDelta != null) {
    next = applyFurnitureComfortDelta(next, effectSpec.furnitureComfortDelta);
    lines.push(`furniture comfort ${effectSpec.furnitureComfortDelta > 0 ? '+' : ''}${effectSpec.furnitureComfortDelta}`);
  }

  return { student: next, lines };
}

export function rollMalfunction(def, student, rng = Math.random) {
  if (!def?.malfunctions?.length) return null;
  const stability = def.stability ?? 0.5;
  const risk = def.risk ?? 0.3;
  const chance = Math.min(0.85, Math.max(0.05, (1 - stability) * risk * 0.65));
  if (rng() > chance) return null;

  const totalW = def.malfunctions.reduce((a, m) => a + (m.weight || 1), 0);
  let roll = rng() * totalW;
  let picked = def.malfunctions[0];
  for (const m of def.malfunctions) {
    roll -= m.weight || 1;
    if (roll <= 0) { picked = m; break; }
  }
  return {
    tier: picked.tier,
    text: picked.text,
    effect: picked.effect || {},
  };
}

function resolveWeeklyDevice(student, slot, entry, week, rng) {
  const def = getDevice(entry.defId);
  if (!def) return { student, tickEvents: [], malfunctions: [] };
  let next = student;
  const tickEvents = [];
  const malfunctions = [];

  let weekly = { ...(def.weeklyEffect || {}) };
  if (def.id === 'living_furniture_rig') {
    const comfort = student.deviceState?.furnitureComfort ?? 100;
    if (comfort < 30) {
      weekly.psychDelta = { ...(weekly.psychDelta || {}), shame: (weekly.psychDelta?.shame || 0) + 2 };
    }
  }
  if (def.attachmentBonus && entry.attachments) {
    for (const [attachSlot, attachEntry] of Object.entries(entry.attachments)) {
      const bonusMap = def.attachmentBonus[attachSlot];
      const bonus = bonusMap?.[attachEntry.defId];
      if (bonus?.gainLbsBonus) {
        weekly.gainLbs = [
          (weekly.gainLbs?.[0] || 0) + bonus.gainLbsBonus[0],
          (weekly.gainLbs?.[1] || 0) + bonus.gainLbsBonus[1],
        ];
      }
      if (bonus?.psychDelta) {
        weekly.psychDelta = { ...(weekly.psychDelta || {}), ...bonus.psychDelta };
      }
    }
  }

  const applied = applyDeviceEffect(next, weekly, { week, sourceDeviceId: def.id, rng });
  next = applied.student;
  next = bumpWeeklyDeviceDependence(next, def.id, def);
  const gainBeforeMalf = next._pendingGainLbs || 0;

  const malf = rollMalfunction(def, next, rng);
  if (malf) {
    malfunctions.push(malf);
    const mApplied = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = mApplied.student;
    const totalGain = next._pendingGainLbs || 0;
    const ev = buildTickEvent(student, slot, entry, week, rng, next, totalGain, malf);
    if (ev) tickEvents.push(ev);
  } else {
    const ev = buildTickEvent(student, slot, entry, week, rng, next, gainBeforeMalf, null);
    if (ev) tickEvents.push(ev);
  }

  return { student: next, tickEvents, malfunctions };
}

function tickFurnitureComfortBonus(student, week, rng) {
  if (student?.equip?.fullBody?.defId !== 'living_furniture_rig') return null;
  const comfort = student.deviceState?.furnitureComfort ?? 100;
  if (comfort >= 40) return null;
  const extra = comfort < 20 ? [2, 4] : [1, 2];
  const applied = applyDeviceEffect(student, {
    gainLbs: extra,
    psychDelta: { shame: comfort < 20 ? 3 : 1, dependence: 1 },
  }, { week, sourceDeviceId: 'living_furniture_rig', rng });
  const gainLbs = applied.student._pendingGainLbs || rollRange(extra, rng);
  const event = buildTickEvent(
    student, 'fullBody', student.equip.fullBody, week, rng,
    applied.student, gainLbs, null,
  );
  return event ? { student: applied.student, event } : null;
}

export function tickEquippedDevices(student, week, rng = Math.random) {
  if (!student?.equip) return { student, tickEvents: [], malfunctions: [] };
  let next = { ...student };
  const tickEvents = [];
  const allMalfs = [];

  for (const slot of DEVICE_SLOTS) {
    const entry = next.equip[slot];
    if (!entry) continue;
    const res = resolveWeeklyDevice(next, slot, entry, week, rng);
    next = res.student;
    tickEvents.push(...res.tickEvents);
    allMalfs.push(...res.malfunctions);
  }

  const comfortBonus = tickFurnitureComfortBonus(next, week, rng);
  if (comfortBonus) {
    tickEvents.push(comfortBonus.event);
    next = comfortBonus.student;
  }

  return { student: next, tickEvents, malfunctions: allMalfs };
}

export function clearExpiredOverrides(student, week) {
  const bo = student.bodyOverride;
  if (!bo || bo.permanent) return student;
  if (bo.expiresWeek != null && week >= bo.expiresWeek) {
    return { ...student, bodyOverride: null };
  }
  return student;
}

export function useConsumableDevice(student, defId, week = 1, rng = Math.random) {
  const def = getDevice(defId);
  if (!def || def.form !== 'consumable') return { student, ok: false, lines: [], malfunction: null };
  let lines = [];
  let malf = null;
  let next = student;

  const applied = applyDeviceEffect(next, def.useEffect || {}, { week, sourceDeviceId: def.id, rng });
  next = applied.student;
  lines = [...applied.lines];

  malf = rollMalfunction(def, next, rng);
  if (malf) {
    const mApplied = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = mApplied.student;
    lines.push(`⚠️ ${malf.text}`);
  }

  const gainLbs = next._pendingGainLbs || 0;
  const growthLine = growthLineForStudent(next, gainLbs);
  if (growthLine) lines.push(growthLine);

  return { student: next, ok: true, lines, malfunction: malf };
}

export function triggerBeltBloatNow(student, week, rng = Math.random) {
  const entry = student?.equip?.waist;
  if (!entry || entry.defId !== 'auto_bloating_belt') return { student, ok: false };
  const def = getDevice('auto_bloating_belt');
  const effect = {
    bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 1 },
    gainLbs: [2, 5],
    psychDelta: { shame: 2 },
  };
  let result = applyDeviceEffect(student, effect, { week, sourceDeviceId: def.id, rng });
  const malf = rollMalfunction(def, result.student, rng);
  if (malf) {
    const m2 = applyDeviceEffect(result.student, malf.effect, { week, sourceDeviceId: def.id, rng });
    result = { student: m2.student, lines: [...result.lines, malf.text] };
  } else {
    result.lines = ['Belt cycles to aggressive bloat mode.'];
  }
  const gainLbs = result.student._pendingGainLbs || 0;
  const growthLine = growthLineForStudent(result.student, gainLbs);
  if (growthLine) result.lines.push(growthLine);
  return { ...result, ok: true, malfunction: malf };
}

export function resolveCampusDeviceUse(defId, modeId, targetStudent, week, rng = Math.random) {
  const def = getDevice(defId);
  if (!def) return { ok: false, reason: 'unknown_device' };
  const mode = def.campusModes?.find(m => m.id === modeId) || def.campusModes?.[0];
  if (!mode && def.form !== 'campus_tool' && !def.useEffect) {
    return { ok: false, reason: 'no_mode' };
  }
  const effect = {
    gainLbs: mode?.gainLbs,
    bodyOverride: mode?.bodyOverride,
    psychDelta: mode?.psychDelta,
  };
  if (!effect.gainLbs && def.useEffect) {
    Object.assign(effect, def.useEffect);
  }
  let result = applyDeviceEffect(targetStudent, effect, { week, sourceDeviceId: def.id, rng });
  const malf = rollMalfunction(def, result.student, rng);
  if (malf) {
    const mApplied = applyDeviceEffect(result.student, malf.effect, { week, sourceDeviceId: def.id, rng });
    result = { student: mApplied.student, lines: [...result.lines, malf.text] };
  }
  result.student = bumpCampusDeviceDependence(result.student, def.id);
  const gainLbs = result.student._pendingGainLbs || 0;
  const growthLine = growthLineForStudent(result.student, gainLbs);
  if (growthLine) result.lines = [...(result.lines || []), growthLine];
  const discoveryRisk = mode?.discoveryRisk ?? 0.15;
  const discovered = rng() < discoveryRisk;
  return {
    ok: true,
    student: result.student,
    lines: result.lines,
    malfunction: malf,
    discovered,
    discoveryRisk,
    modeId: mode?.id || modeId,
  };
}

export function furnitureComfortLabel(student) {
  const comfort = student?.deviceState?.furnitureComfort;
  if (comfort == null) return null;
  if (comfort >= 70) return { label: 'Comfortable furniture', color: '#4a9a5a' };
  if (comfort >= 40) return { label: 'Restless furniture', color: '#c8860a' };
  return { label: 'Unstable furniture', color: '#c04040' };
}

export function formatEquipSlots(student) {
  if (!student?.equip) return [];
  return DEVICE_SLOTS.filter(s => student.equip[s]).map(s => ({
    slot: s,
    defId: student.equip[s].defId,
    label: getDevice(student.equip[s].defId)?.label || student.equip[s].defId,
    icon: getDevice(student.equip[s].defId)?.icon || '🛠',
    attachments: student.equip[s].attachments || {},
  }));
}
