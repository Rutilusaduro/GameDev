// ═══════════════════════════════════════════════════════════════
// CAMPUS DEVICE ENCOUNTERS — targets, rolls, resolution
// ═══════════════════════════════════════════════════════════════
import { ELARA_ID } from './relicHunter.js';
import { getDevice, isCampusTool } from './devices.js';
import { scrutinyDiscoveryMult } from './scrutinyConsequences.js';
import { hasCircuitNode } from './inventionUpgrades.js';
import '../textEngine/scenes/campusDevice/index.js';
import {
  renderCampusDeviceEncounter,
  renderCampusDeviceResult,
  renderCampusDeviceFlavor,
} from '../textEngine/scenes/campusDevice/index.js';
import { resolveCampusDeviceUse } from './deviceEffects.js';

export const CAMPUS_DEVICE_CONFIG = {
  encounterChance: 0.38,
  npcChance: 0.42,
  flavorChance: 0.22,
};

export const CAMPUS_NPCS = [
  { id: 'npc_prof_chen', name: 'Prof. Chen', role: 'faculty', archetype: 'bookworm', lbs: 142, emoji: '👩‍🏫' },
  { id: 'npc_dean_holt', name: 'Dean Holt', role: 'faculty', archetype: 'athlete', lbs: 168, emoji: '👨‍💼' },
  { id: 'npc_barista_mia', name: 'Mia (barista)', role: 'staff', archetype: 'culinary', lbs: 128, emoji: '☕' },
  { id: 'npc_lib_assist', name: 'Library Assistant Ray', role: 'staff', archetype: 'bookworm', lbs: 135, emoji: '📚' },
  { id: 'npc_rand_freshman', name: 'Unnamed freshman', role: 'student', archetype: 'cheerleader', lbs: 118, emoji: '🎒' },
  { id: 'npc_rand_transfer', name: 'Transfer student', role: 'student', archetype: 'influencer', lbs: 124, emoji: '✨' },
  { id: 'npc_rand_athlete', name: 'Walk-on athlete', role: 'student', archetype: 'athlete', lbs: 132, emoji: '🏃' },
];

const FLAVOR_DEVICE_IDS = [
  'living_furniture_rig',
  'endless_hunger_engine',
  'growth_accelerator_chamber',
];

function pick(rng, arr) {
  if (!arr?.length) return null;
  return arr[Math.floor(rng() * arr.length)];
}

function visibleStudents(students, ctx) {
  return students.filter(st => {
    if (st.hidden && st.id !== ELARA_ID) return false;
    if (st.id === ELARA_ID && !ctx.elaraDiscovered) return false;
    if (st.id === 15 && !ctx.lilithUnlocked) return false;
    if (st.evolvedForm === 'pharmacist') return false;
    if (st.evolvedForm === 'machine_goddess') return false;
    return true;
  });
}

export function getOwnedCampusTools(deviceInventory = {}) {
  return Object.entries(deviceInventory)
    .filter(([id, qty]) => qty > 0 && isCampusTool(getDevice(id)))
    .map(([id]) => getDevice(id))
    .filter(Boolean);
}

export function getCampusUsableDevices(deviceInventory = {}) {
  const usable = [];
  const owned = getOwnedCampusTools(deviceInventory);
  for (const def of owned) {
    if (def.form === 'campus_tool' || def.campusModes?.length) {
      usable.push(def.id);
    }
  }
  if ((deviceInventory.endless_hunger_engine ?? 0) > 0) usable.push('endless_hunger_engine');
  return [...new Set(usable)];
}

function npcFromPool(rng, exploration) {
  const fed = exploration?.npcFed || {};
  const pool = CAMPUS_NPCS.filter(n => (fed[n.id]?.times ?? 0) < 4);
  return pick(rng, pool.length ? pool : CAMPUS_NPCS);
}

function buildNpcTarget(npc, exploration) {
  const fed = exploration?.npcFed?.[npc.id];
  return {
    type: 'npc',
    npcId: npc.id,
    name: npc.name,
    role: npc.role,
    archetype: npc.archetype,
    lbs: fed?.lbs ?? npc.lbs,
    emoji: npc.emoji,
    fedBefore: fed?.times ?? 0,
  };
}

export function maybeRollDeviceEncounter(nodeId, ctx, rng = Math.random) {
  if (!ctx.labState) return null;
  const usable = getCampusUsableDevices(ctx.deviceInventory);
  if (!usable.length) return null;
  if (rng() > CAMPUS_DEVICE_CONFIG.encounterChance) return null;

  const students = visibleStudents(ctx.students || [], ctx);
  const useNpc = rng() < CAMPUS_DEVICE_CONFIG.npcChance;

  let target;
  if (useNpc && rng() < 0.55) {
    const npc = npcFromPool(rng, ctx.exploration);
    target = buildNpcTarget(npc, ctx.exploration);
  } else {
    const who = pick(rng, students);
    if (!who) return null;
    target = {
      type: 'student',
      studentId: who.id,
      name: who.name,
      archetype: who.archetype,
      lbs: who.lbs,
      emoji: '👁',
    };
  }

  const allowedDevices = usable;

  const openingLine = renderCampusDeviceEncounter(target, nodeId, ctx);
  return {
    id: `enc_${Date.now()}_${Math.floor(rng() * 9999)}`,
    nodeId,
    target,
    allowedDevices,
    openingLine: openingLine ? `🎯 ${openingLine}` : `🎯 ${target.name} is within range of your devices.`,
    captureAvailable: false,
  };
}

export function maybeRollDeviceFlavor(nodeId, ctx, rng = Math.random) {
  if (!ctx.labState) return null;
  if (rng() > CAMPUS_DEVICE_CONFIG.flavorChance) return null;
  const ownedIds = Object.keys(ctx.deviceInventory || {}).filter(k => (ctx.deviceInventory[k] ?? 0) > 0);
  const pool = FLAVOR_DEVICE_IDS.filter(id => ownedIds.includes(id) || ctx.labState);
  const deviceId = pick(rng, pool);
  if (!deviceId) return null;
  const line = renderCampusDeviceFlavor(deviceId, ctx);
  if (!line) return null;
  const icons = { living_furniture_rig: '🪑', endless_hunger_engine: '🔫', growth_accelerator_chamber: '☢️' };
  return { deviceId, line: `${icons[deviceId] || '⚙️'} ${line}` };
}

export function applyCampusDeviceEncounter({
  encounter,
  deviceId,
  modeId,
  student,
  week,
  exploration,
  labState = null,
  adminScrutiny = 0,
  rng = Math.random,
}) {
  const def = getDevice(deviceId);
  if (!def) return { ok: false, reason: 'unknown_device' };

  let nextExploration = { ...exploration, npcFed: { ...(exploration?.npcFed || {}) } };
  let npcGain = 0;

  if (encounter.target.type === 'student') {
    const result = resolveCampusDeviceUse(deviceId, modeId, student, week, rng, { labState, adminScrutiny });
    if (!result.ok) return result;
    const line = renderCampusDeviceResult(encounter, deviceId, modeId, result, encounter.nodeId, student);
    const scrutinyDelta = result.discovered ? Math.max(2, Math.round(2 * scrutinyDiscoveryMult(adminScrutiny))) : 0;
    return {
      ...result,
      logLines: [
        line || `📡 ${def.label} used on ${student.name}.`,
        result.discovered ? '⚠️ Someone noticed. Whispers may follow.' : null,
      ].filter(Boolean),
      exploration: nextExploration,
      scrutinyDelta,
      witnessEntry: result.discovered ? {
        week,
        eventType: 'device',
        studentId: student?.id,
        studentName: student?.name,
        deviceId,
        nodeId: encounter.nodeId,
      } : null,
    };
  }

  const mode = def.campusModes?.find(m => m.id === modeId) || def.campusModes?.[0];
  const effect = mode || def.useEffect || {};
  const [lo, hi] = effect.gainLbs || [3, 6];
  npcGain = lo + Math.floor(rng() * (hi - lo + 1));
  const prev = nextExploration.npcFed[encounter.target.npcId] || {
    lbs: encounter.target.lbs,
    times: 0,
  };
  nextExploration.npcFed[encounter.target.npcId] = {
    ...prev,
    lbs: prev.lbs + npcGain,
    times: (prev.times || 0) + 1,
    lastDevice: deviceId,
    lastMode: modeId,
  };

  const fakeResult = {
    discovered: rng() < (mode?.discoveryRisk ?? 0.2),
    modeId: modeId || mode?.id,
    npcGain,
  };
  const line = renderCampusDeviceResult(encounter, deviceId, modeId, fakeResult, encounter.nodeId);
  return {
    ok: true,
    logLines: [
      line || `🎭 ${def.label} used on ${encounter.target.name} (+${npcGain} lbs).`,
      fakeResult.discovered ? '⚠️ A passerby saw enough to remember.' : null,
    ].filter(Boolean),
    exploration: nextExploration,
    scrutinyDelta: fakeResult.discovered ? 3 : 0,
    consumeInventory: def.form === 'campus_tool' || def.form === 'consumable',
  };
}

export function getDeviceModesForCampus(deviceId, deviceInventory, labState = null) {
  const def = getDevice(deviceId);
  if (!def) return [];
  if (def.campusModes?.length) {
    return def.campusModes.filter((mode) => {
      if (mode.id === 'sustain' && labState) {
        return hasCircuitNode(labState, deviceId, 'ehe_sustain');
      }
      return true;
    });
  }
  return [{ id: 'default', label: 'Activate', gainLbs: def.useEffect?.gainLbs || [3, 6] }];
}
