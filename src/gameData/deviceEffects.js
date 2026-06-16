// ═══════════════════════════════════════════════════════════════
// DEVICE EFFECT RESOLUTION — engine-free logic
// ═══════════════════════════════════════════════════════════════
import { renderDeviceTickLine } from '../textEngine/scenes/deviceTick/index.js';
import { renderDeviceUseLine } from '../textEngine/scenes/deviceUse/index.js';
import { renderDeviceFlavor } from '../textEngine/scenes/deviceFlavor.js';
import { renderSuddenGrowthLine } from '../textEngine/scenes/suddenGrowth/index.js';
import { getDevice, DEVICE_SLOTS } from './devices.js';
import { canStudentAcceptDevice, deviceAcceptanceBlockReason, scalePsychDeltaForStudent, scaleGainRangeForStudent } from './deviceGating.js';
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
  if (!def || def.form === 'consumable' || def.form === 'attachment' || def.form === 'campus_tool' || def.form === 'stationary') {
    return { student, ok: false, reason: 'invalid' };
  }
  if (!canStudentAcceptDevice(student, defId)) {
    return { student, ok: false, reason: 'corruption_gate', message: deviceAcceptanceBlockReason(student, defId) };
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
    const withdrawal = applyWithdrawal(next, slot, entry.defId);
    next = withdrawal.student;
  }
  return { student: next, cleared: true, withdrawal: entry?.defId ? true : false };
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

const ZONE_OVERRIDE_POOL = ['belly', 'hips', 'thighs', 'ass', 'chest'];

const MUTATION_FEATURE_POOL = [
  'elegant_horns',
  'fat_prehensile_tail',
  'large_heavy_wings',
  'glowing_eyes',
  'stretchy_elastic_skin',
  'glowing_markings',
  'visible_fangs',
  'heavy_dragging_tail',
];

function pickZoneOverride(rng = Math.random) {
  return ZONE_OVERRIDE_POOL[Math.floor(rng() * ZONE_OVERRIDE_POOL.length)];
}

function rollMutations(rng = Math.random, maxCount = 3) {
  const count = 1 + Math.floor(rng() * maxCount);
  const pool = [...MUTATION_FEATURE_POOL];
  const picked = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(rng() * pool.length);
    picked.push({
      id: pool.splice(idx, 1)[0],
      evolving: rng() > 0.35,
      weeksActive: 0,
    });
  }
  return picked;
}

function mergeDeviceState(student, patch) {
  if (!patch) return student;
  return {
    ...student,
    deviceState: { ...(student.deviceState || {}), ...patch },
  };
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

function withDeviceFlavor(student, deviceId, week, line) {
  const flavor = renderDeviceFlavor(deviceId, student, week);
  if (!flavor?.trim() || !line?.trim()) return line || flavor || '';
  if (line.includes(flavor)) return line;
  return `${flavor} ${line}`;
}

function buildTickEvent(student, slot, entry, week, rng, resultStudent, gainLbs, malf) {
  const def = getDevice(entry.defId);
  if (!def) return null;
  const attachmentIds = attachmentIdsFromEntry(entry);
  const dependenceLevel = getDependenceLevel(resultStudent, slot);
  const uniqueTag = findUniqueInteraction(resultStudent, ctx.player, slot, { deviceId: def.id });
  const uniqueProse = uniqueTag
    ? renderDeviceUniqueInteraction({ student: resultStudent, deviceId: def.id, deviceLabel: def.label, uniqueTag, week })
    : null;
  const prose = withDeviceFlavor(
    resultStudent,
    def.id,
    week,
    renderDeviceTickLine({
      student: resultStudent,
      deviceId: def.id,
      deviceLabel: def.label,
      slot,
      gainLbs,
      malfunctionTier: malf?.tier || null,
      attachmentIds,
      isMalfunction: !!malf,
      week,
      modificationState: entry.mods || [],
      dependenceLevel,
      dependenceTier: dependenceLevel >= 75 ? 3 : dependenceLevel >= 50 ? 2 : dependenceLevel >= 25 ? 1 : 0,
    }),
  );
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
    uniqueTag,
    uniqueProse,
    dependenceLevel,
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
  let zoneOverride = null;

  if (effectSpec?.gainLbs) {
    let gainRange = scaleGainRangeForStudent(next, effectSpec.gainLbs);
    const swell = next.deviceState?.residualSwell;
    if (swell?.active && swell.amplify) {
      gainRange = [
        Math.round((gainRange[0] || 0) * swell.amplify),
        Math.round((gainRange[1] || 0) * swell.amplify),
      ];
    }
    const lbs = rollRange(gainRange, rng);
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
    next.psych = applyPsychDelta(next.psych || {}, scalePsychDeltaForStudent(next, effectSpec.psychDelta));
  }

  if (effectSpec?.furnitureComfortDelta != null) {
    next = applyFurnitureComfortDelta(next, effectSpec.furnitureComfortDelta);
    lines.push(`furniture comfort ${effectSpec.furnitureComfortDelta > 0 ? '+' : ''}${effectSpec.furnitureComfortDelta}`);
  }

  if (effectSpec?.setFlags) {
    next = { ...next, ...effectSpec.setFlags };
    lines.push('permanent device flags applied');
  }

  if (effectSpec?.deviceStatePatch) {
    next = mergeDeviceState(next, effectSpec.deviceStatePatch);
    lines.push('device state updated');
  }

  if (effectSpec?.hungerDelta) {
    next = adjustHunger(next, effectSpec.hungerDelta);
    lines.push(`hunger tier ${effectSpec.hungerDelta > 0 ? '+' : ''}${effectSpec.hungerDelta}`);
  }

  if (effectSpec?.zoneOverride === 'random') {
    zoneOverride = pickZoneOverride(rng);
    lines.push(`growth clustered in her ${zoneOverride}`);
  } else if (effectSpec?.zoneOverride) {
    zoneOverride = effectSpec.zoneOverride;
  }

  return { student: next, lines, zoneOverride };
}

export function rollMalfunction(def, student, rng = Math.random, ctx = {}) {
  if (!def?.malfunctions?.length) return null;
  const stability = ctx.effectiveStability ?? def.stability ?? 0.5;
  const risk = ctx.effectiveRisk ?? def.risk ?? 0.3;
  const depScale = ctx.dependenceLevel != null
    ? dependenceMalfunctionScale(ctx.dependenceLevel)
    : 1;
  const chance = Math.min(0.85, Math.max(0.05, (1 - stability) * risk * 0.65 * depScale));
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

function resolveWeeklyDevice(student, slot, entry, week, rng, ctx = {}) {
  const def = getDevice(entry.defId);
  if (!def) return { student, tickEvents: [], malfunctions: [] };
  let next = student;
  const tickEvents = [];
  const malfunctions = [];

  const modFold = foldModPatches(def.weeklyEffect, entry.mods || [], def);
  let weekly = { ...modFold.effectSpec };
  const dependenceLevel = getDependenceLevel(student, slot);

  if (def.id === 'adaptive_growth_harness') {
    const count = getEquippedDeviceIds(student).length;
    const bonus = Math.min(4, Math.max(0, count - 1));
    if (bonus > 0 && weekly.gainLbs) {
      weekly.gainLbs = [
        (weekly.gainLbs[0] || 0) + bonus,
        (weekly.gainLbs[1] || 0) + bonus,
      ];
    }
  }

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

  weekly = applyDependenceBonuses(weekly, dependenceLevel);

  const applied = applyDeviceEffect(next, weekly, { week, sourceDeviceId: def.id, rng });
  next = applied.student;
  next = bumpWeeklyDeviceDependence(next, def.id, def);
  const gainBeforeMalf = next._pendingGainLbs || 0;

  if (def.id === 'endless_hunger_engine') {
    const weeksActive = (next.deviceState?.endlessHunger?.weeksActive ?? 0) + 1;
    const distress = next.deviceState?.endlessHunger?.distress ?? false;
    next = mergeDeviceState(next, {
      endlessHunger: { active: true, distress, weeksActive },
    });
    next = adjustHunger(next, distress ? 2 : 1);
  }

  const malf = rollMalfunction(def, next, rng, {
    effectiveStability: modFold.effectiveStability,
    effectiveRisk: modFold.effectiveRisk,
    dependenceLevel: getDependenceLevel(next, slot),
  });
  if (malf) {
    malfunctions.push(malf);
    const mApplied = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = mApplied.student;
    const totalGain = next._pendingGainLbs || 0;
    const ev = buildTickEvent(student, slot, entry, week, rng, next, totalGain, malf, ctx);
    if (ev) tickEvents.push(ev);
  } else {
    const ev = buildTickEvent(student, slot, entry, week, rng, next, gainBeforeMalf, null, ctx);
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

export function tickEquippedDevices(student, week, rng = Math.random, ctx = {}) {
  if (!student?.equip) return { student, tickEvents: [], malfunctions: [] };
  let next = { ...student };
  const tickEvents = [];
  const allMalfs = [];

  for (const slot of DEVICE_SLOTS) {
    const entry = next.equip[slot];
    if (!entry) continue;
    const res = resolveWeeklyDevice(next, slot, entry, week, rng, ctx);
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
  let next = { ...student };
  const bo = next.bodyOverride;
  if (bo && !bo.permanent && bo.expiresWeek != null && week >= bo.expiresWeek) {
    next = { ...next, bodyOverride: null };
  }
  return clearExpiredDeviceStates(next, week);
}

export function clearExpiredDeviceStates(student, week) {
  let next = { ...student };
  const ds = next.deviceState;
  if (!ds) return next;

  let deviceState = { ...ds };

  if (deviceState.regression?.expiresWeek != null && week >= deviceState.regression.expiresWeek) {
    const { regression: _regression, ...rest } = deviceState;
    deviceState = rest;
  }

  if (deviceState.mutations?.length) {
    const evolving = deviceState.mutations.filter(m => m.evolving);
    if (evolving.length && Math.random() < 0.35) {
      const extra = 1 + Math.floor(Math.random() * 3);
      next._pendingGainLbs = (next._pendingGainLbs || 0) + extra;
    }
    deviceState.mutations = deviceState.mutations.map(m => ({
      ...m,
      weeksActive: (m.weeksActive || 0) + 1,
    }));
    if (!deviceState.mutations.some(m => m.evolving) && (deviceState.mutationEvolvingWeeks ?? 0) > 3) {
      const { mutationEvolving: _me, mutationEvolvingWeeks: _mew, ...rest } = deviceState;
      deviceState = rest;
    } else if (deviceState.mutationEvolving) {
      deviceState.mutationEvolvingWeeks = (deviceState.mutationEvolvingWeeks || 0) + 1;
    }
  }

  if (Object.keys(deviceState).length === 0) {
    const { deviceState: _drop, ...rest } = next;
    return rest;
  }
  return { ...next, deviceState };
}

export function useConsumableDevice(student, defId, week = 1, rng = Math.random) {
  const def = getDevice(defId);
  if (!def || def.form !== 'consumable') return { student, ok: false, lines: [], malfunction: null, zoneOverride: null };
  let lines = [];
  let malf = null;
  let next = student;
  let zoneOverride = null;

  const applied = applyDeviceEffect(next, def.useEffect || {}, { week, sourceDeviceId: def.id, rng });
  next = applied.student;
  lines = [...applied.lines];
  zoneOverride = applied.zoneOverride;

  malf = rollMalfunction(def, next, rng);
  if (malf) {
    const mApplied = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = mApplied.student;
    lines.push(`⚠️ ${malf.text}`);
    if (mApplied.zoneOverride) zoneOverride = mApplied.zoneOverride;
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

export function resolveCampusDeviceUse(defId, modeId, targetStudent, week, rng = Math.random, ctx = {}) {
  const def = getDevice(defId);
  if (!def) return { ok: false, reason: 'unknown_device' };
  const targetType = ctx.targetType || 'student';

  if (targetType === 'npc_random') {
    const npcGain = rollRange(modeId === 'deep' ? [4, 8] : [2, 5], rng);
    const discoveryRisk = (ctx.adminScrutiny ?? 0) > 50 ? 0.35 : 0.2;
    const discovered = rng() < discoveryRisk;
    return {
      ok: true,
      student: null,
      targetType,
      lines: [renderDeviceCampusUseLine({
        student: targetStudent,
        deviceId: def.id,
        deviceLabel: def.label,
        targetType: 'npc_random',
        week,
      })],
      npcGainLbs: npcGain,
      discovered,
      discoveryRisk,
      modeId,
    };
  }

  if (targetType === 'group_class') {
    const classGain = rollRange([1, 3], rng);
    const discoveryRisk = 0.25 + ((ctx.adminScrutiny ?? 0) / 200);
    const discovered = rng() < discoveryRisk;
    return {
      ok: true,
      student: null,
      targetType,
      lines: [renderDeviceCampusUseLine({
        student: targetStudent,
        deviceId: def.id,
        deviceLabel: def.label,
        targetType: 'group_class',
        week,
      })],
      classGainLbs: classGain,
      discovered,
      discoveryRisk,
      modeId,
    };
  }

  const mode = def.campusModes?.find(m => m.id === modeId) || def.campusModes?.[0];
  if (!mode && def.form !== 'campus_tool' && !def.useEffect) {
    return { ok: false, reason: 'no_mode' };
  }
  const effect = {
    gainLbs: mode?.gainLbs,
    bodyOverride: mode?.bodyOverride,
    psychDelta: mode?.psychDelta,
  };
  if (mode?.regressionDepth) {
    effect.deviceStatePatch = {
      regression: {
        depth: mode.regressionDepth,
        expiresWeek: week + (mode.regressionWeeks || 1),
      },
    };
  }
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
    targetType: 'student',
  };
}

// ── Player personal device actions ─────────────────────────────

function playerHasDevice(player, defId) {
  if (!player?.equip) return false;
  return Object.values(player.equip).some((e) => e?.defId === defId);
}

function patchSelfDeviceState(player, defId, patch) {
  const prev = player.selfDeviceState?.[defId] || {};
  return {
    ...player,
    selfDeviceState: {
      ...(player.selfDeviceState || {}),
      [defId]: { ...prev, ...patch },
    },
  };
}

export function triggerTightenPulse(student, player, week, rng = Math.random) {
  if (!playerHasDevice(player, 'controlled_bloating_rig')) {
    return { student, player, ok: false, lines: [], malfunction: null };
  }
  const cooldown = player.selfDeviceState?.controlled_bloating_rig?.lastTightenWeek;
  if (cooldown === week) {
    return { student, player, ok: false, lines: ['Tighten pulse already fired this week.'], malfunction: null };
  }
  const def = getDevice('controlled_bloating_rig');
  const hungerBoost = (student?.hungerTier ?? 0) >= 2 ? 2 : 0;
  const effect = applyDependenceBonuses({
    bodyOverride: { stateType: 'bloated', stageBump: 3, durationWeeks: 1 },
    gainLbs: [4 + hungerBoost, 8 + hungerBoost],
    psychDelta: { dependence: 5, obsession: 3, shame: 2 },
  }, getDependenceLevel(student, 'waist'));
  let nextStudent = student;
  const applied = applyDeviceEffect(nextStudent, effect, { week, sourceDeviceId: def.id, rng });
  nextStudent = tickDependence(applied.student, 'waist', 2, def);
  let nextPlayer = patchSelfDeviceState(player, def.id, { lastTightenWeek: week, tightenCount: (player.selfDeviceState?.controlled_bloating_rig?.tightenCount || 0) + 1 });
  const malf = rollMalfunction(def, nextStudent, rng, { effectiveRisk: (def.risk ?? 0.38) + 0.15 });
  let lines = applied.lines.length ? applied.lines : [withDeviceFlavor(
    nextStudent,
    def.id,
    week,
    renderDeviceUseLine({
      student: nextStudent, deviceId: def.id, deviceLabel: def.label, actionId: 'tighten_pulse', week, dependenceLevel: getDependenceLevel(nextStudent, 'waist'),
    }),
  )];
  if (malf) {
    const m2 = applyDeviceEffect(nextStudent, malf.effect, { week, sourceDeviceId: def.id, rng });
    nextStudent = m2.student;
    lines.push(`⚠️ ${malf.text}`);
  }
  return { student: nextStudent, player: nextPlayer, ok: true, lines, malfunction: malf };
}

export function runBurstFeed(student, player, week, rng = Math.random) {
  if (!playerHasDevice(player, 'precision_feeder_arm')) {
    return { student, player, ok: false, lines: [], malfunction: null };
  }
  const def = getDevice('precision_feeder_arm');
  const effect = {
    gainLbs: [6, 10],
    psychDelta: { dependence: 4, fixation: 2 },
    deviceStatePatch: {
      overeatingFatigue: { active: true, expiresWeek: week + 2, feedPenalty: 0.35 },
    },
  };
  const applied = applyDeviceEffect(student, effect, { week, sourceDeviceId: def.id, rng });
  let nextStudent = tickDependence(applied.student, 'back', 1.5, def);
  const malf = rollMalfunction(def, nextStudent, rng);
  let lines = applied.lines.length ? applied.lines : [withDeviceFlavor(
    nextStudent,
    def.id,
    week,
    renderDeviceUseLine({
      student: nextStudent, deviceId: def.id, deviceLabel: def.label, actionId: 'burst_feed', week,
    }),
  )];
  if (malf) {
    const m2 = applyDeviceEffect(nextStudent, malf.effect, { week, sourceDeviceId: def.id, rng });
    nextStudent = m2.student;
    lines.push(`⚠️ ${malf.text}`);
  }
  return { student: nextStudent, player, ok: true, lines, malfunction: malf };
}

export function runSustainedDrip(student, player, week, rng = Math.random) {
  if (!playerHasDevice(player, 'precision_feeder_arm')) {
    return { student, player, ok: false, lines: [], malfunction: null };
  }
  const hasPaste = Object.values(student?.equip || {}).some((entry) =>
    Object.values(entry?.attachments || {}).some((a) => a?.defId === 'stabilized_paste_printer' || a?.defId === 'calorie_paste_printer'),
  );
  const def = getDevice('precision_feeder_arm');
  const effect = {
    gainLbs: hasPaste ? [3, 5] : [2, 4],
    psychDelta: { dependence: 2 },
  };
  const applied = applyDeviceEffect(student, effect, { week, sourceDeviceId: def.id, rng });
  const nextStudent = tickDependence(applied.student, 'back', 1, def);
  return {
    student: nextStudent,
    player: patchSelfDeviceState(player, def.id, { lastDripWeek: week }),
    ok: true,
    lines: applied.lines.length ? applied.lines : [withDeviceFlavor(
      nextStudent,
      def.id,
      week,
      renderDeviceUseLine({
        student: nextStudent, deviceId: def.id, deviceLabel: def.label, actionId: 'sustained_drip', week,
      }),
    )],
    malfunction: null,
  };
}

export function ventResidualSwell(student, player, week, rng = Math.random) {
  if (!playerHasDevice(player, 'measured_bloat_canister')) {
    return { student, player, ok: false, lines: [], malfunction: null };
  }
  if (!student?.deviceState?.residualSwell?.active) {
    return { student, player, ok: false, lines: ['No residual swell to vent.'], malfunction: null };
  }
  const def = getDevice('measured_bloat_canister');
  const { residualSwell: _rs, ...restState } = student.deviceState || {};
  let nextStudent = {
    ...student,
    deviceState: restState,
    bodyOverride: student.bodyOverride?.amplify ? null : student.bodyOverride,
  };
  return {
    student: nextStudent,
    player: patchSelfDeviceState(player, 'measured_bloat_canister', { lastVentWeek: week }),
    ok: true,
    lines: [withDeviceFlavor(
      nextStudent,
      'measured_bloat_canister',
      week,
      renderDeviceUseLine({
        student: nextStudent, deviceId: 'measured_bloat_canister', deviceLabel: def?.label || 'Measured Bloat Canister', actionId: 'vent_residual_swell', week,
      }),
    )],
    malfunction: null,
  };
}

export function applyMeasuredBloatResidual(student, week, rng = Math.random) {
  const def = getDevice('measured_bloat_canister');
  const applied = applyDeviceEffect(student, {
    ...(def.useEffect || {}),
    deviceStatePatch: {
      residualSwell: { active: true, amplify: 1.25, startedWeek: week },
    },
  }, { week, sourceDeviceId: def.id, rng });
  const malf = rollMalfunction(def, applied.student, rng);
  let next = applied.student;
  let lines = applied.lines;
  if (malf) {
    const m2 = applyDeviceEffect(next, malf.effect, { week, sourceDeviceId: def.id, rng });
    next = m2.student;
    lines = [...lines, `⚠️ ${malf.text}`];
  }
  return { student: next, ok: true, lines, malfunction: malf };
}

/** Stabilized paste printer — chance to grant player psych bonus on gain events. */
export function rollPlayerPastePsychBonus(player, rng = Math.random) {
  if (!playerHasDevice(player, 'stabilized_paste_printer')) return player;
  if (rng() > 0.12) return player;
  const bonus = { ...(player.psychBonus || { obsession: 0, fixation: 0 }) };
  if (bonus.obsession < 15) bonus.obsession += 1;
  else if (bonus.fixation < 15) bonus.fixation += 1;
  return { ...player, psychBonus: bonus };
}

export function applyModification(student, slot, componentId) {
  const entry = student?.equip?.[slot];
  if (!entry) return { student, ok: false, reason: 'no_entry' };
  const { entry: nextEntry, ok, reason, component } = applyModificationToEntry(entry, componentId);
  if (!ok) return { student, ok: false, reason };
  const equip = { ...student.equip, [slot]: nextEntry };
  return { student: { ...student, equip }, ok: true, component };
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
