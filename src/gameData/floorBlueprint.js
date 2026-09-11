// ═══════════════════════════════════════════════════════════════
// FLOOR BLUEPRINT — dorm rooms, upgrade mapping, After-Hours Rounds
// Hall lounge prestige skills live on a labeled floor plan.
// Click a room → buy its upgrades. Pin rooms → walk a night circuit.
// ═══════════════════════════════════════════════════════════════
import { SKILL_TREE } from './skills.js';
import { getStage } from './stages.js';
import { getHungerTier } from './hungerAddiction.js';

export const CIRCUIT_MAX_ROOMS = 4;
export const CIRCUIT_AP_COST = 1;

export function createInitialFloorCircuit() {
  return { pinned: [], lastWalkWeek: 0, sessionCapNextWeek: 0 };
}

/** Extra depth fields layered on existing SKILL_TREE entries (advertised effects that were inert). */
export const SKILL_DEPTH_FIELDS = {
  personal_gifts: { talkRelBonus: 3 },
  relationship_class: { talkRelBonus: 2 },
  snack_station: { feedCalBonus: 400 },
  comfort_archives: { feedCalBonus: 800 },
  artisan_bakery: { feedCalBonus: 250 },
  dinner_upscale: { dinnerCalBonus: 3500 },
  dinner_private: { dinnerCalBonus: 5250 },
  dinner_residence: { dinnerCalBonus: 2800 },
  dinner_accessible: { dinnerCalBonus: 4200 },
  late_night_access: { interruptReduce: 0.08 },
  dessert_rotation: { interruptReduce: 0.04 },
  blackout_curtains: { intimacyRelBonus: 2 },
  group_dynamics: { ecologyDecayReduce: 1 },
  inner_circle_mastery: { ecologyDecayReduce: 1 },
  climate_control: { stageMin: 5, stageGainMult: 0.05 },
  dedicated_suite: { stageMin: 7, stageGainMult: 0.08 },
  luxury_quarters: { stageMin: 5, stageGainMult: 0.06 },
  body_awareness: { talkCorruptionBonus: 1 },
  comfort_framing: { talkCorruptionBonus: 0 },
  special_occasions: { talkRelBonus: 1 },
  institutional_cover: { oppositionCover: 1 },
  deep_cover: { oppositionCover: 1 },
  full_catering: { feastCalBonus: 2400 },
  ritual_kitchen: { feastCalBonus: 1200 },
  grand_banquet_protocol: { feastCalBonus: 3600 },
  resonance_bells: { campusYieldBonus: 1 },
  echo_gallery: { weighInRelBonus: 1 },
  dream_chamber: { hungerTalkDrop: 1 },
  embodiment_chamber: { roomVisitRelBonus: 1 },
  comfy_chairs: { interruptReduce: 0.03 },
  beverage_bar: { hungerTalkDrop: 1 },
  mood_lighting: { intimacyRelBonus: 1 },
  catering_contact: { feastCalBonus: 800 },
  private_kitchen: { feedCalBonus: 600 },
  luxury_pantry: { pantryBonus: 1 },
  signature_dish: { dinnerCalBonus: 1500 },
  dietary_profiling: { feedCalBonus: 300 },
  reinforced_seating: { stageMin: 5, stageGainMult: 0.04 },
  dinner_casual: { dinnerCalBonus: 800 },
  legendary_host: { talkRelBonus: 2, dinnerCalBonus: 2000 },
  master_feeder: { feedCalBonus: 500, intimacyRelBonus: 1 },
  the_arrangement: { oppositionCover: 1 },
  the_institution: { oppositionCover: 1 },
  social_empire: { talkRelBonus: 2 },
  devotion_engine: { talkCorruptionBonus: 1 },
  appetite_study: { talkCorruptionBonus: 1 },
  trust_architecture: { talkRelBonus: 2 },
  full_environment: { interruptReduce: 0.04 },
  research_budget: { campusYieldBonus: 1 },
  wide_desks: { talkRelBonus: 1 },
};

export const FLOOR_ROOMS = [
  { id: 'elevator', label: 'Elevator', code: 'EL-1', col: 1, row: 1, w: 1, h: 1, skillIds: [], decorative: true,
    blurb: 'The box that already knows who is getting heavier.' },
  { id: 'corridor', label: 'Main Corridor', code: 'CR-A', col: 2, row: 1, w: 4, h: 1,
    skillIds: ['late_night_access', 'midnight_ritual', 'quiet_hours', 'floor_scale'],
    blurb: 'Night traffic, a scale in the alcove, quiet hours that only you enforce.' },
  { id: 'stairs', label: 'Stairwell', code: 'ST-1', col: 6, row: 1, w: 1, h: 1, skillIds: [], decorative: true,
    blurb: 'Two flights. They take longer than they used to.' },
  { id: 'ra_desk', label: 'RA Desk', code: 'RA-00', col: 1, row: 2, w: 1, h: 2,
    skillIds: ['ap_notebook', 'task_batching', 'double_ap', 'admin_buffer', 'research_budget', 'institutional_cover', 'ap_mastery', 'deep_cover', 'unlimited_ap'],
    blurb: 'Paperwork, cover stories, extra hours you never log.' },
  { id: 'lounge', label: 'Hall Lounge', code: 'LN-01', col: 2, row: 2, w: 3, h: 2,
    skillIds: ['comfy_chairs', 'beverage_bar', 'ambient_aroma', 'wide_desks', 'mood_lighting', 'climate_control', 'reinforced_seating', 'blackout_curtains', 'dedicated_suite', 'luxury_quarters', 'full_environment'],
    blurb: 'The common room. Chairs, lamps, climate, the place they stop leaving.' },
  { id: 'kitchen', label: 'Floor Kitchen', code: 'KT-02', col: 5, row: 2, w: 2, h: 1,
    skillIds: ['snack_station', 'artisan_bakery', 'catering_contact', 'private_kitchen', 'dietary_profiling', 'luxury_pantry', 'signature_dish', 'full_catering', 'grand_banquet_protocol', 'ritual_kitchen', 'comfort_archives', 'dessert_rotation'],
    blurb: 'Snack station, pantry, the kitchen that never really closes.' },
  { id: 'dining', label: 'Dining Nook', code: 'DN-03', col: 1, row: 4, w: 1, h: 1,
    skillIds: ['dinner_basic', 'dinner_casual', 'dinner_upscale', 'dinner_private', 'dinner_residence', 'dinner_accessible', 'legendary_host'],
    blurb: 'Venue book, reserved tables, the long meal as hall programming.' },
  { id: 'pantry', label: 'Pantry', code: 'PN-04', col: 5, row: 3, w: 1, h: 1,
    skillIds: ['supply_cage'],
    blurb: 'Bulk stores. Housing thinks it is granola. It is not granola.' },
  { id: 'laundry', label: 'Laundry', code: 'LY-05', col: 6, row: 2, w: 1, h: 2,
    skillIds: ['laundry_refit', 'oversized_linens'],
    blurb: 'Machines that take a bigger load. Sheets that still cover her.' },
  { id: 'social', label: 'Social Nook', code: 'SC-06', col: 2, row: 4, w: 1, h: 1,
    skillIds: ['personal_gifts', 'relationship_class', 'group_dynamics', 'special_occasions', 'inner_circle_mastery', 'social_empire', 'devotion_engine'],
    blurb: 'Gifts, birthdays, the inner circle consolidating over leftovers.' },
  { id: 'psych', label: 'Observation Alcove', code: 'PS-07', col: 3, row: 4, w: 1, h: 1,
    skillIds: ['body_awareness', 'comfort_framing', 'appetite_study', 'behavioral_mapping', 'resistance_calibration', 'narrative_reshaping', 'subliminal_priming', 'trust_architecture', 'total_influence'],
    blurb: 'Where you watch how they eat when they think the room is just a room.' },
  { id: 'echo', label: 'Echo Gallery', code: 'EG-08', col: 4, row: 4, w: 1, h: 1,
    skillIds: ['echo_gallery', 'resonance_bells'],
    blurb: 'Captured weigh-ins, bells that prime appetite down the hall.' },
  { id: 'dream', label: 'Dream Chamber', code: 'DR-09', col: 5, row: 4, w: 1, h: 1,
    skillIds: ['dream_chamber', 'embodiment_chamber'],
    blurb: 'Soft light. Impossible portions. Hunger that walks in sleep.' },
  { id: 'storage', label: 'Storage', code: 'ST-10', col: 6, row: 4, w: 1, h: 1,
    skillIds: ['device_bay'],
    blurb: 'Locked cage. Devices rest here between uses and keep humming.' },
  { id: 'media', label: 'Media Nook', code: 'MD-11', col: 6, row: 5, w: 1, h: 1,
    skillIds: ['media_nook'],
    blurb: 'Ring light, spare batteries, a couch that films well.' },
  { id: 'suite', label: 'RA Suite', code: 'SU-12', col: 1, row: 5, w: 2, h: 1,
    skillIds: ['master_feeder'],
    blurb: 'Your door. Private sessions run long in here.' },
  { id: 'prestige', label: 'Institution Wing', code: 'IN-13', col: 3, row: 5, w: 2, h: 1,
    skillIds: ['the_arrangement', 'the_institution'],
    blurb: 'Endgame cover. The floor as a thing with its own gravity.' },
  { id: 'resident', label: 'Resident Wing', code: 'RW-14', col: 5, row: 5, w: 1, h: 1,
    skillIds: [],
    blurb: 'Their doors. After-hours rounds always pass here last.' },
];

export const FLOOR_ROOM_MAP = Object.fromEntries(FLOOR_ROOMS.map((r) => [r.id, r]));

/** Undirected adjacency for circuit combos (sharing an edge on the plan). */
export const ROOM_NEIGHBORS = {
  elevator: ['corridor', 'ra_desk'],
  corridor: ['elevator', 'stairs', 'lounge', 'kitchen'],
  stairs: ['corridor', 'laundry'],
  ra_desk: ['elevator', 'lounge', 'dining', 'suite'],
  lounge: ['corridor', 'ra_desk', 'kitchen', 'dining', 'social', 'psych', 'echo'],
  kitchen: ['corridor', 'lounge', 'pantry', 'laundry'],
  dining: ['ra_desk', 'lounge', 'social', 'suite'],
  pantry: ['kitchen', 'laundry', 'dream'],
  laundry: ['stairs', 'kitchen', 'pantry', 'storage'],
  social: ['lounge', 'dining', 'psych', 'suite'],
  psych: ['lounge', 'social', 'echo'],
  echo: ['lounge', 'psych', 'dream', 'prestige'],
  dream: ['pantry', 'echo', 'storage', 'resident'],
  storage: ['laundry', 'dream', 'media', 'resident'],
  media: ['storage', 'resident'],
  suite: ['ra_desk', 'dining', 'social', 'prestige'],
  prestige: ['echo', 'suite', 'resident'],
  resident: ['dream', 'storage', 'media', 'prestige'],
};

export function roomsAreAdjacent(a, b) {
  return (ROOM_NEIGHBORS[a] || []).includes(b);
}

export function getRoom(roomId) {
  return FLOOR_ROOM_MAP[roomId] || null;
}

export function skillsForRoom(roomId) {
  const ids = getRoom(roomId)?.skillIds || [];
  return ids.map((id) => SKILL_TREE.find((s) => s.id === id)).filter(Boolean);
}

export function roomForSkill(skillId) {
  return FLOOR_ROOMS.find((r) => r.skillIds.includes(skillId)) || null;
}

export function roomFill(roomId, owned = {}) {
  const ids = getRoom(roomId)?.skillIds || [];
  if (!ids.length) return 0;
  const have = ids.filter((id) => owned[id]).length;
  return have / ids.length;
}

export function roomOwnedCount(roomId, owned = {}) {
  const ids = getRoom(roomId)?.skillIds || [];
  return ids.filter((id) => owned[id]).length;
}

export function completedRoomCount(owned = {}) {
  return FLOOR_ROOMS.filter((r) => r.skillIds.length && roomFill(r.id, owned) >= 1).length;
}

export function upgradeableRooms() {
  return FLOOR_ROOMS.filter((r) => r.skillIds.length > 0);
}

export function mergeSkillDepth(skill) {
  const extra = SKILL_DEPTH_FIELDS[skill.id] || {};
  return { ...skill, ...extra };
}

/** Aggregate depth bonuses from owned hall skills + room synergy. */
export function aggregateFloorDepth(owned = {}) {
  const fx = {
    talkRelBonus: 0,
    talkCorruptionBonus: 0,
    feedCalBonus: 0,
    dinnerCalBonus: 0,
    feastCalBonus: 0,
    interruptReduce: 0,
    intimacyRelBonus: 0,
    ecologyDecayReduce: 0,
    oppositionCover: 0,
    campusYieldBonus: 0,
    weighInRelBonus: 0,
    hungerTalkDrop: 0,
    roomVisitRelBonus: 0,
    pantryBonus: 0,
    deviceTickBonus: 0,
    streamRelBonus: 0,
    clothingEase: 0,
    stageGain: [],
    synergyGainMult: 0,
    completedRooms: 0,
  };
  SKILL_TREE.forEach((sk) => {
    if (!owned[sk.id]) return;
    const d = mergeSkillDepth(sk);
    fx.talkRelBonus += d.talkRelBonus || 0;
    fx.talkCorruptionBonus += d.talkCorruptionBonus || 0;
    fx.feedCalBonus += d.feedCalBonus || 0;
    fx.dinnerCalBonus += d.dinnerCalBonus || 0;
    fx.feastCalBonus += d.feastCalBonus || 0;
    fx.interruptReduce += d.interruptReduce || 0;
    fx.intimacyRelBonus += d.intimacyRelBonus || 0;
    fx.ecologyDecayReduce += d.ecologyDecayReduce || 0;
    fx.oppositionCover += d.oppositionCover || 0;
    fx.campusYieldBonus += d.campusYieldBonus || 0;
    fx.weighInRelBonus += d.weighInRelBonus || 0;
    fx.hungerTalkDrop += d.hungerTalkDrop || 0;
    fx.roomVisitRelBonus += d.roomVisitRelBonus || 0;
    fx.pantryBonus += d.pantryBonus || 0;
    fx.deviceTickBonus += d.deviceTickBonus || 0;
    fx.streamRelBonus += d.streamRelBonus || 0;
    fx.clothingEase += d.clothingEase || 0;
    if (d.stageGainMult && d.stageMin != null) {
      fx.stageGain.push({ stageMin: d.stageMin, mult: d.stageGainMult });
    }
  });
  fx.completedRooms = completedRoomCount(owned);
  fx.synergyGainMult = 0.03 * Math.min(6, fx.completedRooms);
  if (roomFill('kitchen', owned) >= 0.4 && roomFill('lounge', owned) >= 0.4) fx.synergyGainMult += 0.06;
  if (roomFill('ra_desk', owned) >= 0.3 && roomFill('psych', owned) >= 0.3) fx.interruptReduce += 0.05;
  if (roomFill('dining', owned) >= 0.4 && roomFill('social', owned) >= 0.4) fx.talkRelBonus += 1;
  fx.interruptReduce = Math.min(0.35, fx.interruptReduce);
  return fx;
}

export function loungeGainMultForStudent(student, owned, baseGainMult = 0) {
  const fx = aggregateFloorDepth(owned);
  const stage = getStage(student?.lbs || 0).id;
  let extra = fx.synergyGainMult;
  fx.stageGain.forEach((g) => {
    if (stage >= g.stageMin) extra += g.mult;
  });
  return (baseGainMult || 0) + extra;
}

export function isDinnerFeedLabel(label = '') {
  return /dinner|bistro|steak|omakase|brunch|atelier|venue|feast|potluck|pizza|banquet|cater/i.test(label || '');
}

export function extraFeedCalories(label, owned) {
  const fx = aggregateFloorDepth(owned);
  let extra = fx.feedCalBonus;
  if (isDinnerFeedLabel(label)) extra += fx.dinnerCalBonus;
  if (/feast|banquet|potluck|pizza/i.test(label || '')) extra += fx.feastCalBonus;
  return extra;
}

export function circuitApCost(owned = {}) {
  return owned.late_night_access ? 0 : CIRCUIT_AP_COST;
}

export function canWalkCircuit(owned, circuit, ap, week) {
  const pinned = (circuit?.pinned || []).filter((id) => roomOwnedCount(id, owned) > 0 || id === 'resident');
  if (!pinned.length) return { ok: false, reason: 'Pin at least one upgraded room' };
  if ((circuit?.lastWalkWeek || 0) === week) return { ok: false, reason: 'Already walked tonight' };
  const cost = circuitApCost(owned);
  if (ap < cost) return { ok: false, reason: `Need ${cost} AP` };
  return { ok: true, cost, pinned };
}

export function toggleCircuitPin(circuit, roomId) {
  const pinned = [...(circuit?.pinned || [])];
  const idx = pinned.indexOf(roomId);
  if (idx >= 0) {
    pinned.splice(idx, 1);
    return { ...circuit, pinned };
  }
  const room = getRoom(roomId);
  if (!room || room.decorative) return circuit;
  if (pinned.length >= CIRCUIT_MAX_ROOMS) return circuit;
  return { ...circuit, pinned: [...pinned, roomId] };
}

function pickVisible(students, rng) {
  const vis = (students || []).filter((s) => !s.hidden);
  if (!vis.length) return null;
  return vis[Math.floor(rng() * vis.length)];
}

function hungriest(students) {
  const vis = (students || []).filter((s) => !s.hidden);
  if (!vis.length) return null;
  return [...vis].sort((a, b) => getHungerTier(b) - getHungerTier(a) || (a.relationship || 0) - (b.relationship || 0))[0];
}

function lowestRel(students) {
  const vis = (students || []).filter((s) => !s.hidden);
  if (!vis.length) return null;
  return [...vis].sort((a, b) => (a.relationship || 0) - (b.relationship || 0))[0];
}

function highestRel(students) {
  const vis = (students || []).filter((s) => !s.hidden);
  if (!vis.length) return null;
  return [...vis].sort((a, b) => (b.relationship || 0) - (a.relationship || 0))[0];
}

function scalePayoff(base, fill, adjacentBonus) {
  return Math.max(1, Math.round(base * (0.55 + 0.45 * fill) * (adjacentBonus ? 1.25 : 1)));
}

/**
 * After-Hours Rounds — walk pinned rooms. Pure: returns patches, not mutations.
 * @returns {{ ok, cost, beats, studentPatches, scrutinyDelta, pantryDrops, sessionCapNext, logLines }}
 */
export function walkAfterHours({
  owned = {},
  students = [],
  circuit = {},
  week = 1,
  ap = 0,
  rng = Math.random,
} = {}) {
  const check = canWalkCircuit(owned, circuit, ap, week);
  if (!check.ok) return { ok: false, reason: check.reason };
  const pinned = check.pinned;
  const patches = new Map();
  const bump = (id, fields) => {
    const cur = patches.get(id) || { id, cal: 0, full: 0, rel: 0, corruption: 0, hunger: 0, lbs: 0, mood: null };
    patches.set(id, { ...cur, ...fields, cal: cur.cal + (fields.cal || 0), full: cur.full + (fields.full || 0), rel: cur.rel + (fields.rel || 0), corruption: cur.corruption + (fields.corruption || 0), hunger: cur.hunger + (fields.hunger || 0), lbs: cur.lbs + (fields.lbs || 0), mood: fields.mood || cur.mood });
  };
  const beats = [];
  let scrutinyDelta = 0;
  let pantryDrops = 0;
  let sessionCapNext = 0;

  pinned.forEach((roomId, i) => {
    const fill = roomId === 'resident' ? 0.5 : roomFill(roomId, owned);
    const adj = i > 0 && roomsAreAdjacent(pinned[i - 1], roomId);
    const room = getRoom(roomId);
    let target = null;
    let note = '';

    if (roomId === 'kitchen' || roomId === 'pantry') {
      target = hungriest(students);
      if (target) {
        const cal = scalePayoff(roomId === 'kitchen' ? 2200 : 1400, fill, adj);
        bump(target.id, { cal, full: scalePayoff(8, fill, adj) });
        note = `${target.name} finds leftover heat in the ${room.label.toLowerCase()}.`;
      }
    } else if (roomId === 'lounge') {
      target = lowestRel(students);
      if (target) {
        bump(target.id, { rel: scalePayoff(3, fill, adj) });
        note = `${target.name} sinks into the lounge and does not get up.`;
      }
    } else if (roomId === 'ra_desk') {
      scrutinyDelta -= scalePayoff(2, Math.max(fill, 0.3), adj);
      note = 'You tidy the desk log. Housing sees a quiet floor.';
    } else if (roomId === 'dining') {
      target = pickVisible(students, rng);
      if (target) {
        bump(target.id, { cal: scalePayoff(1800, fill, adj), full: 6 });
        note = `${target.name} finishes what was left on the dining nook table.`;
      }
    } else if (roomId === 'psych') {
      target = highestRel(students);
      if (target) {
        bump(target.id, { corruption: 1, rel: 1 });
        note = `${target.name} lingers in the alcove. The watching is the point.`;
      }
    } else if (roomId === 'corridor') {
      students.filter((s) => !s.hidden && getHungerTier(s) >= 2).slice(0, 3).forEach((s) => {
        bump(s.id, { hunger: -1 });
      });
      note = 'Quiet hours. Craving thins in the hall light.';
    } else if (roomId === 'laundry') {
      target = pickVisible(students, rng);
      if (target) {
        bump(target.id, { mood: 'content', rel: 1 });
        note = `${target.name} collects warm oversized linens. Everything still covers.`;
      }
    } else if (roomId === 'storage') {
      pantryDrops += 1;
      if (owned.device_bay) {
        target = pickVisible(students, rng);
        if (target) bump(target.id, { lbs: scalePayoff(1, fill, adj) });
      }
      note = 'Supply cage yields a spare. The bay keeps humming.';
    } else if (roomId === 'media') {
      target = students.find((s) => !s.hidden && (s.id === 2 || s.id === 5)) || pickVisible(students, rng);
      if (target) {
        bump(target.id, { rel: scalePayoff(2, fill, adj) });
        note = `${target.name} tests the media nook lighting on a full stomach.`;
      }
    } else if (roomId === 'echo') {
      target = students.find((s) => !s.hidden && getStage(s.lbs).id >= 4) || pickVisible(students, rng);
      if (target && owned.echo_gallery) {
        bump(target.id, { lbs: 1, rel: 1 });
        note = `${target.name} passes the gallery. The captured number still works on her.`;
      } else {
        note = 'Bells along the gallery hum once, then settle.';
      }
    } else if (roomId === 'dream') {
      target = hungriest(students);
      if (target) {
        bump(target.id, { hunger: owned.dream_chamber ? -1 : 0, cal: 600 });
        note = `${target.name}'s sleep smells like the kitchen from here.`;
      }
    } else if (roomId === 'social') {
      const vis = students.filter((s) => !s.hidden);
      vis.slice(0, 2).forEach((s) => bump(s.id, { rel: scalePayoff(2, fill, adj) }));
      note = 'The nook still has someone in it. Rapport pools.';
    } else if (roomId === 'suite' || roomId === 'prestige') {
      sessionCapNext += scalePayoff(6, Math.max(fill, 0.25), adj);
      note = 'The suite stays unlocked. Tomorrow\'s private sessions will run longer.';
    } else if (roomId === 'resident') {
      target = pickVisible(students, rng);
      if (target) {
        bump(target.id, { rel: 2 });
        note = `You knock once at ${target.name}'s door. She is still awake. Still hungry.`;
      }
    } else {
      note = `You pass ${room?.label || roomId}.`;
    }

    beats.push({
      roomId,
      label: room?.label || roomId,
      adjacent: adj,
      studentId: target?.id ?? null,
      text: note,
    });
  });

  return {
    ok: true,
    cost: check.cost,
    beats,
    studentPatches: [...patches.values()],
    scrutinyDelta,
    pantryDrops,
    sessionCapNext,
    logLines: beats.map((b) => `🌙 ${b.label}: ${b.text}`),
    nextCircuit: { ...circuit, pinned: circuit.pinned || [], lastWalkWeek: week, sessionCapNextWeek: sessionCapNext },
  };
}

/** Midnight Ritual — smaller automatic kitchen+lounge tick at week end. */
export function midnightRitualTick({ owned = {}, students = [], rng = Math.random } = {}) {
  if (!owned.midnight_ritual) return { ok: false, studentPatches: [], logLines: [] };
  const fake = { pinned: ['kitchen', 'lounge'], lastWalkWeek: -1 };
  const result = walkAfterHours({ owned, students, circuit: fake, week: 9999, ap: 99, rng });
  if (!result.ok) return { ok: false, studentPatches: [], logLines: [] };
  const half = result.studentPatches.map((p) => ({
    ...p,
    cal: Math.round((p.cal || 0) * 0.5),
    full: Math.round((p.full || 0) * 0.5),
    rel: Math.max(1, Math.round((p.rel || 0) * 0.5)),
  }));
  return {
    ok: true,
    studentPatches: half,
    logLines: ['🌙 Midnight ritual — kitchen and lounge keep serving after lights-out.'],
  };
}

export function assertSkillRoomCoverage() {
  const mapped = new Set(FLOOR_ROOMS.flatMap((r) => r.skillIds));
  const missing = SKILL_TREE.filter((s) => !mapped.has(s.id)).map((s) => s.id);
  return missing;
}
