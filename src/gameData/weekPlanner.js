// B3 — week planner previews + week-in-review assembly from dossier snapshots.
import { getAddictionLevel, getHungerTier } from './hungerAddiction.js';
import { PSYCH_TIERS } from './psychState.js';
import { getStage } from './stages.js';
import { renderWeekRecap } from '../textEngine/scenes/weekRecap/index.js';
import { completedRoomCount, extraFeedCalories, roomFill } from './floorBlueprint.js';

export const WEEK_PLAN_SLOT_COUNT = 5;

export const PLANNER_VENUES = [
  { id: 'campus', label: 'Campus', glyph: '🏫' },
  { id: 'dining', label: 'Dining hall', glyph: '🍽' },
  { id: 'dorm', label: 'Dorm visit', glyph: '🛏' },
  { id: 'lab', label: 'Hall kitchen', glyph: '🍳' },
  { id: 'private', label: 'Private table', glyph: '🥂' },
];

export function plannerSlotCount(owned = {}) {
  return WEEK_PLAN_SLOT_COUNT + Math.min(2, Math.floor(completedRoomCount(owned) / 4));
}

export function emptyWeekPlan(slotCount = WEEK_PLAN_SLOT_COUNT) {
  const n = Math.max(WEEK_PLAN_SLOT_COUNT, slotCount);
  return {
    slots: Array.from({ length: n }, (_, i) => ({
      studentId: null,
      venueId: PLANNER_VENUES[i % PLANNER_VENUES.length].id,
    })),
  };
}

export function resizeWeekPlan(plan, slotCount = WEEK_PLAN_SLOT_COUNT) {
  const n = Math.max(WEEK_PLAN_SLOT_COUNT, slotCount);
  const slots = [...(plan?.slots || [])];
  while (slots.length < n) {
    slots.push({
      studentId: null,
      venueId: PLANNER_VENUES[slots.length % PLANNER_VENUES.length].id,
    });
  }
  return { ...plan, slots: slots.slice(0, n) };
}

const VENUE_PAYOFF = {
  campus: { cal: 0, full: 0, rel: 3, hunger: -1 },
  dining: { cal: 2200, full: 10, rel: 1, hunger: 0 },
  dorm: { cal: 800, full: 4, rel: 4, hunger: 0 },
  lab: { cal: 2800, full: 12, rel: 1, hunger: 0 },
  private: { cal: 1600, full: 8, rel: 5, hunger: 0 },
};

/**
 * Locked week plans used to preview only. Now they pay off at week advance:
 * venue-specific calories/rel, dining/kitchen fill scales food, completed rooms add slots.
 */
export function resolveWeekPlan({
  plan,
  students = [],
  owned = {},
  week = 1,
} = {}) {
  const patches = new Map();
  const beats = [];
  let moneyDelta = 0;
  const bump = (id, fields) => {
    const cur = patches.get(id) || { id, cal: 0, full: 0, rel: 0, hunger: 0 };
    patches.set(id, {
      ...cur,
      cal: cur.cal + (fields.cal || 0),
      full: cur.full + (fields.full || 0),
      rel: cur.rel + (fields.rel || 0),
      hunger: cur.hunger + (fields.hunger || 0),
    });
  };
  const kitFill = roomFill('kitchen', owned);
  const dinFill = roomFill('dining', owned);
  const loungeFill = roomFill('lounge', owned);

  for (const slot of plan?.slots || []) {
    if (slot.studentId == null) continue;
    const student = students.find((s) => s.id === slot.studentId);
    if (!student || student.hidden || student.lockState === 'locked') continue;
    const venue = PLANNER_VENUES.find((v) => v.id === slot.venueId) || PLANNER_VENUES[0];
    const base = VENUE_PAYOFF[venue.id] || VENUE_PAYOFF.campus;
    const foodScale = 1 + kitFill * 0.35 + dinFill * 0.2;
    const relScale = 1 + loungeFill * 0.2;
    const cal = Math.round((base.cal + extraFeedCalories(venue.label, owned)) * foodScale);
    const full = Math.round(base.full * foodScale);
    const rel = Math.max(1, Math.round(base.rel * relScale));
    bump(student.id, { cal, full, rel, hunger: base.hunger });
    const cost = mealCostPreview(student, week).cost;
    moneyDelta -= cost;
    beats.push({
      studentId: student.id,
      venueId: venue.id,
      cal,
      rel,
      note: `${student.name} kept the ${venue.label.toLowerCase()} slot.${cal ? ` Leftovers: ${cal} cal.` : ''} Rapport +${rel}.`,
    });
  }

  return {
    studentPatches: [...patches.values()],
    moneyDelta,
    beats,
    logLines: beats.map((b) => `📋 ${b.note}`),
    filled: beats.length,
  };
}

export function mealCostPreview(student, week = 1) {
  if (!student) return { cost: 0, label: '—' };
  const hunger = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  const base = 12 + hunger * 5 + addiction * 4;
  const stageId = getStage(student.lbs ?? 0).id;
  const creep = Math.max(0, stageId - 2);
  const cost = base + creep * 2;
  return {
    cost,
    hunger,
    addiction,
    creep,
    label: `$${cost} est. · hunger ${hunger} · addiction ${addiction}${creep > 0 ? ` · appetite creep +${creep * 2}` : ''}`,
  };
}

export function interruptLikelihood(student) {
  if (!student) return null;
  const hunger = getHungerTier(student);
  const addiction = getAddictionLevel(student);
  if (hunger >= 3 || addiction >= 2) {
    return `${student.name} is at hunger ${hunger} and addiction ${addiction} — expect a knock whether or not you plan her.`;
  }
  if (hunger >= 2) {
    return `${student.name} is getting restless (hunger ${hunger}).`;
  }
  return null;
}

export function defaultSlotLabel(slotIndex) {
  const venue = PLANNER_VENUES[slotIndex % PLANNER_VENUES.length];
  return `Defaults to passive upkeep — no ${venue.label.toLowerCase()} visit planned.`;
}

export function planConflicts(plan, students = []) {
  const issues = [];
  const byStudent = {};
  for (const slot of plan?.slots || []) {
    if (slot.studentId == null) continue;
    byStudent[slot.studentId] = (byStudent[slot.studentId] || 0) + 1;
  }
  for (const [sid, count] of Object.entries(byStudent)) {
    if (count > 1) {
      const s = students.find((st) => st.id === Number(sid));
      issues.push(`${s?.name || 'A resident'} is on ${count} slots — one RA, one place at a time.`);
    }
  }
  const venueUse = {};
  for (const slot of plan?.slots || []) {
    if (!slot.studentId) continue;
    venueUse[slot.venueId] = (venueUse[slot.venueId] || 0) + 1;
  }
  for (const [venueId, count] of Object.entries(venueUse)) {
    if (count >= 3) {
      const v = PLANNER_VENUES.find((x) => x.id === venueId);
      issues.push(`Three residents at ${v?.label || venueId} — scheduling squeeze.`);
    }
  }
  return issues;
}

export function venuePayoffHint(venueId) {
  const venue = PLANNER_VENUES.find((v) => v.id === venueId) || PLANNER_VENUES[0];
  const base = VENUE_PAYOFF[venue.id] || VENUE_PAYOFF.campus;
  const bits = [];
  if (base.cal) bits.push(`+${base.cal} cal`);
  if (base.rel) bits.push(`+${base.rel} rapport`);
  if (base.hunger) bits.push('hunger eases');
  return `${venue.glyph} ${venue.label} · ${bits.join(' · ') || 'attention'}`;
}

export function previewPlannedSlot(student, slot, week) {
  const venueHint = venuePayoffHint(slot?.venueId);
  if (!student) {
    return { cost: null, interrupt: null, hint: defaultSlotLabel(slot?.slotIndex ?? 0), venueHint };
  }
  const cost = mealCostPreview(student, week);
  const interrupt = interruptLikelihood(student);
  let hint = null;
  if (student.rosterEcology?.favoritism === 'neglected') {
    hint = 'She has felt sidelined. Planning her now reads as deliberate.';
  } else if (student.rosterEcology?.favoritism === 'favored') {
    hint = 'Your priority this week. Others may notice.';
  }
  return { cost, interrupt, hint, venueHint };
}

const PSYCH_KEYS = ['fixation', 'obsession', 'dependence', 'shame'];

/** Extra recap cards from dossier snapshots (shared data source with B1). */
export function buildWeekReviewExtras(students, week, textOpts = {}) {
  const cards = [];
  for (const s of students || []) {
    if (s.hidden) continue;
    const snaps = s.dossierSnapshots || [];
    const cur = snaps.filter((x) => x.week === week).pop();
    const prev = snaps.filter((x) => x.week < week).pop();
    if (!cur) continue;

    if (prev) {
      for (const axis of PSYCH_KEYS) {
        const before = prev.psychTiers?.[axis] ?? 0;
        const after = cur.psychTiers?.[axis] ?? 0;
        if (after > before) {
          cards.push({
            id: `psych-${s.id}-${axis}-${week}`,
            type: 'psych',
            studentId: s.id,
            name: s.name,
            label: `${axis} → ${PSYCH_TIERS[after]?.label}`,
            prose: `Her ${axis} climbed to ${PSYCH_TIERS[after]?.label.toLowerCase()} — visible in how she carries the week.`,
          });
        }
      }
    }

    const garmentFlag = (cur.flags || []).find((f) => f.startsWith('garment:'));
    if (garmentFlag) {
      cards.push({
        id: `garment-${s.id}-${week}`,
        type: 'garment',
        studentId: s.id,
        name: s.name,
        label: 'Garment strain',
        prose: `Something she was wearing finally admitted the week — ${garmentFlag.split(':')[1] || 'strain'} logged in her dossier.`,
      });
    }

    const moved = (cur.lbsDelta || 0) > 0 || (cur.flags || []).length > 0;
    if (!moved) {
      const quietLine = renderWeekRecap(s, week, {
        lbsGained: 0,
        gainBand: 'none',
        stagedUp: false,
        stuffedWeek: false,
        ...textOpts,
      });
      cards.push({
        id: `quiet-${s.id}-${week}`,
        type: 'quiet',
        studentId: s.id,
        name: s.name,
        label: 'Quiet week',
        prose: quietLine?.trim() || `${s.name} noticed you noticed nothing changed.`,
      });
    }
  }
  return cards;
}
