#!/usr/bin/env node
import { emptyWeekPlan, mealCostPreview, padWeekPlan, planConflicts, buildWeekReviewExtras, weekPlanSlotCount, weekPlanBonusesFor } from '../src/gameData/weekPlanner.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';

let failures = 0;
function assert(cond, msg) {
  if (!cond) { failures += 1; console.error(`FAIL: ${msg}`); }
}

const plan = emptyWeekPlan();
assert(plan.slots.length === 5, 'five planner slots');
const padded = padWeekPlan(plan, 6);
assert(padded.slots.length === 6, 'pad to six slots');
assert(weekPlanSlotCount({}) === 5, 'default slot count');
assert(weekPlanSlotCount({ ap_notebook: true, double_ap: true }) === 6, 'desk extra slot');
plan.slots[0].studentId = 0;
plan.slots[1].studentId = 0;
assert(planConflicts(plan, INIT_STUDENTS).length > 0, 'duplicate student conflict');

const cost = mealCostPreview(INIT_STUDENTS[0], 3);
assert(cost.cost > 0, 'meal cost preview');

const student = {
  ...INIT_STUDENTS[0],
  dossierSnapshots: [
    { week: 1, lbsDelta: 0, psychTiers: { fixation: 0, obsession: 0, dependence: 0, shame: 0 }, flags: [] },
    { week: 2, lbsDelta: 0, psychTiers: { fixation: 1, obsession: 0, dependence: 0, shame: 0 }, flags: [] },
  ],
};
const extras = buildWeekReviewExtras([student], 2);
assert(extras.some((e) => e.type === 'psych' || e.type === 'quiet'), 'review extras from snapshots');

const planned = weekPlanBonusesFor(INIT_STUDENTS[0], { slots: [{ studentId: INIT_STUDENTS[0].id, venueId: 'night_wing' }] });
assert(planned.extraLbs === 1 && planned.rel > 0, 'night-wing plan bonus');

const leftoverStudent = { ...INIT_STUDENTS[0], leftoverFedThisWeek: true };
const leftoverPlan = weekPlanBonusesFor(leftoverStudent, { slots: [{ studentId: leftoverStudent.id, venueId: 'campus' }] }, 3);
const basePlan = weekPlanBonusesFor(INIT_STUDENTS[0], { slots: [{ studentId: INIT_STUDENTS[0].id, venueId: 'campus' }] }, 3);
assert(leftoverPlan.rel > basePlan.rel && leftoverPlan.hungerEase > basePlan.hungerEase, 'leftover plan rel and hunger');
const nightVisitStudent = { ...INIT_STUDENTS[0], lastNightVisitWeek: 3 };
const nightVisitPlan = weekPlanBonusesFor(nightVisitStudent, { slots: [{ studentId: nightVisitStudent.id, venueId: 'campus' }] }, 3);
assert(nightVisitPlan.discontentEase > basePlan.discontentEase, 'night visit plan discontent ease');

console.log(`week-planner:probe — ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
