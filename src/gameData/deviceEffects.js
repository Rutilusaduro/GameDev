// ═══════════════════════════════════════════════════════════════
// DEVICE EFFECT RESOLUTION — engine-free logic
// ═══════════════════════════════════════════════════════════════
import { getDevice, DEVICE_SLOTS } from './devices.js';
import { applyPsychDelta } from './psychState.js';

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
  if (!def || def.form === 'consumable' || def.form === 'attachment') return { student, ok: false, reason: 'invalid' };
  const slot = slotFor(def);
  if (!slot || !isSlotFree(student, slot)) return { student, ok: false, reason: 'slot_occupied' };
  const equip = { ...(student.equip || {}) };
  equip[slot] = { defId, instanceId: nextDeviceInstanceId(), attachments: {} };
  return { student: { ...student, equip }, ok: true, slot };
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

export function attachToDevice(student, hostSlot, attachDefId) {
  const host = student?.equip?.[hostSlot];
  if (!host) return { student, ok: false, reason: 'no_host' };
  const attachDef = getDevice(attachDefId);
  if (!attachDef || attachDef.form !== 'attachment') return { student, ok: false, reason: 'invalid_attach' };
  const hostDef = getDevice(host.defId);
  if (!hostDef?.attachmentSlots?.includes(attachDef.attachSlot)) return { student, ok: false, reason: 'bad_slot' };
  if (!attachDef.attachesTo?.includes(hostDef.id)) return { student, ok: false, reason: 'incompatible' };
  if (host.attachments?.[attachDef.attachSlot]) return { student, ok: false, reason: 'slot_full' };
  const equip = { ...student.equip };
  equip[hostSlot] = {
    ...host,
    attachments: {
      ...(host.attachments || {}),
      [attachDef.attachSlot]: { defId: attachDefId, instanceId: nextDeviceInstanceId() },
    },
  };
  return { student: { ...student, equip }, ok: true };
}

function rollRange(range, rng) {
  if (!range) return 0;
  const [lo, hi] = range;
  return lo + Math.floor(rng() * (hi - lo + 1));
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
  if (!def) return { student, lines: [], malfunctions: [] };
  let next = student;
  const lines = [];
  const malfunctions = [];

  let weekly = { ...(def.weeklyEffect || {}) };
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
  if (applied.lines.length) {
    lines.push(`${def.icon} ${def.label} (${slot}): ${applied.lines.join(', ')}`);
  }

  const malf = rollMalfunction(def, next, rng);
  if (malf) {
    malfunctions.push(malf);
    const mApplied = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = mApplied.student;
    lines.push(`⚠️ ${def.label} malfunction (${malf.tier}): ${malf.text}`);
  }

  return { student: next, lines, malfunctions };
}

export function tickEquippedDevices(student, week, rng = Math.random) {
  if (!student?.equip) return { student, lines: [], malfunctions: [] };
  let next = { ...student };
  const allLines = [];
  const allMalfs = [];

  for (const slot of DEVICE_SLOTS) {
    const entry = next.equip[slot];
    if (!entry) continue;
    const res = resolveWeeklyDevice(next, slot, entry, week, rng);
    next = res.student;
    allLines.push(...res.lines);
    allMalfs.push(...res.malfs);
  }

  return { student: next, lines: allLines, malfunctions: allMalfs };
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
  return { ...result, ok: true, malfunction: malf };
}

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
