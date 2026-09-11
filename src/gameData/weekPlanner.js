// B3 — week planner previews + week-in-review assembly from dossier snapshots.
import { getAddictionLevel, getHungerTier } from './hungerAddiction.js';
import { PSYCH_TIERS } from './psychState.js';
import { getStage } from './stages.js';
import { roomCompletion } from './dormBlueprint.js';
import { renderWeekRecap } from '../textEngine/scenes/weekRecap/index.js';

export const WEEK_PLAN_SLOT_COUNT = 5;

export const PLANNER_VENUES = [
  { id: 'campus', label: 'Campus', glyph: '🏫' },
  { id: 'dining', label: 'Dining hall', glyph: '🍽' },
  { id: 'dorm', label: 'Dorm visit', glyph: '🛏' },
  { id: 'lab', label: 'Hall kitchen', glyph: '🍳' },
  { id: 'private', label: 'Private table', glyph: '🥂' },
  { id: 'night_wing', label: 'Night wing', glyph: '🌙' },
];

export function emptyWeekPlan(slotCount = WEEK_PLAN_SLOT_COUNT) {
  const n = Math.max(1, slotCount || WEEK_PLAN_SLOT_COUNT);
  return {
    slots: Array.from({ length: n }, (_, i) => ({
      studentId: null,
      venueId: PLANNER_VENUES[i % PLANNER_VENUES.length].id,
    })),
  };
}

export function padWeekPlan(plan, slotCount = WEEK_PLAN_SLOT_COUNT) {
  const n = Math.max(WEEK_PLAN_SLOT_COUNT, slotCount || WEEK_PLAN_SLOT_COUNT);
  const slots = [...(plan?.slots || [])];
  while (slots.length < n) {
    slots.push({
      studentId: null,
      venueId: PLANNER_VENUES[slots.length % PLANNER_VENUES.length].id,
    });
  }
  return { slots };
}

/** Extra slot once RA Desk has two prestige installs. Default stays 5. */
export function weekPlanSlotCount(ownedHallSkills = {}) {
  const desk = roomCompletion('ra_desk', ownedHallSkills);
  return WEEK_PLAN_SLOT_COUNT + (desk.owned >= 2 ? 1 : 0);
}

/** Standing plan pays off in the week tick: attention, hunger, night-wing lbs. */
export function weekPlanBonusesFor(student, weekPlan) {
  const slots = (weekPlan?.slots || []).filter((s) => s.studentId === student?.id);
  if (!slots.length) return { rel: 0, extraLbs: 0, hungerEase: 0, discontentEase: 0 };
  const night = slots.some((s) => s.venueId === 'night_wing');
  return {
    rel: Math.min(6, 2 * slots.length),
    extraLbs: night ? 1 : 0,
    hungerEase: 1,
    discontentEase: 1,
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

export function previewPlannedSlot(student, slot, week) {
  if (!student) {
    return { cost: null, interrupt: null, hint: defaultSlotLabel(slot?.slotIndex ?? 0) };
  }
  const cost = mealCostPreview(student, week);
  const interrupt = interruptLikelihood(student);
  let hint = null;
  if (student.rosterEcology?.favoritism === 'neglected') {
    hint = 'She has felt sidelined — planning her now reads as deliberate.';
  } else if (student.rosterEcology?.favoritism === 'favored') {
    hint = 'Your priority this week — others may notice.';
  }
  return { cost, interrupt, hint };
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
