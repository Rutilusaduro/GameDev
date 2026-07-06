#!/usr/bin/env node
import { emptyWeekPlan, mealCostPreview, planConflicts, buildWeekReviewExtras } from '../src/gameData/weekPlanner.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';

let failures = 0;
function assert(cond, msg) {
  if (!cond) { failures += 1; console.error(`FAIL: ${msg}`); }
}

const plan = emptyWeekPlan();
assert(plan.slots.length === 5, 'five planner slots');
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

console.log(`week-planner:probe — ${failures} failures`);
process.exit(failures > 0 ? 1 : 0);
