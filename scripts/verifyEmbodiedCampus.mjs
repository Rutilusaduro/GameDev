#!/usr/bin/env node
/**
 * Embodied campus pilot verification — run: node scripts/verifyEmbodiedCampus.mjs
 */
import {
  rollEmbodiedArrivalEvent,
  pickEmbodiedWitness,
  canEmbodiedMove,
  isEmbodiedImmobile,
  applyEmbodiedEvent,
  appendEmbodimentWalkLog,
  EMBODIED_EVENTS,
} from '../src/gameData/v2/embodiedCampus.js';
import {
  applyWeeklyTrustDrip,
  pickRipeUnlock,
  ROSTER_TRUST_GATE,
  grantPassiveTrust,
} from '../src/gameData/rosterUnlock.js';
import { handleEmbodiedMove, handleEmbodiedEventResolve } from '../src/gameData/v2/handlers.js';
import { createInitialV2State } from '../src/gameData/v2/state.js';
import { INIT_STUDENTS } from '../src/gameData/students.js';
import { UNLOCK_POOL_IDS } from '../src/gameData/spirits.js';

const rng = () => Math.random();
let failed = 0;

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg);
    failed += 1;
  } else {
    console.log('OK:', msg);
  }
}

// ── Event roll rate ──
const student = { ...INIT_STUDENTS[0], lbs: 300, corruption: 25 };
const roster = INIT_STUDENTS.map((s) => ({
  ...s,
  lockState: UNLOCK_POOL_IDS.includes(s.id) && s.id > 5 ? 'locked' : 'open',
  passiveTrust: s.id > 5 ? 45 : 0,
}));
let events = 0;
const emb = { steps: 0, lastEventStep: 0 };
for (let i = 0; i < 400; i++) {
  const ev = rollEmbodiedArrivalEvent(student, 'quad', emb, { students: roster, rng });
  if (ev) {
    events += 1;
    emb.lastEventStep = emb.steps;
  }
  emb.steps += 1;
}
const rate = events / 400;
assert(rate > 0.32 && rate < 0.58, `event rate ~44% (got ${(rate * 100).toFixed(1)}%)`);

// ── Named bully witness ──
const bully = pickEmbodiedWitness(student, roster, 'bully_forcefeed', () => 0);
assert(bully && bully.id !== student.id, `bully witness picked: ${bully?.name}`);

// ── Immobile block ──
const blob = { ...student, lbs: 900 };
assert(!canEmbodiedMove('dorms', 'quad', blob), 'immobile cannot leave dorms');
assert(isEmbodiedImmobile(blob), 'stage 10+ flagged immobile');

// ── Trust drip catch-up (late-game 45/60) ──
let locked = roster.filter((s) => s.lockState === 'locked');
let simStudents = roster.map((s) => ({ ...s }));
for (let w = 1; w <= 12; w++) {
  simStudents = applyWeeklyTrustDrip(simStudents, { spiritLevel: 4, week: w + 20, rng });
}
const stillLocked = simStudents.filter((s) => s.lockState === 'locked');
const maxTrust = Math.max(...stillLocked.map((s) => s.passiveTrust || 0));
assert(maxTrust >= ROSTER_TRUST_GATE, `trust drip reaches gate (${maxTrust}/${ROSTER_TRUST_GATE})`);
const ripe = pickRipeUnlock(simStudents, 4);
assert(ripe != null, `pickRipeUnlock finds girl at ${ripe?.passiveTrust} trust`);

// ── Full move + event resolve chain ──
let v2 = createInitialV2State();
v2 = {
  ...v2,
  embodiment: {
    ...v2.embodiment,
    activeStudentId: 0,
    at: 'dorms',
    steps: 0,
    lastEventStep: 0,
  },
};
const moveResult = handleEmbodiedMove(student, 'dorms', 'quad', v2, 3, { students: roster, rng: () => 0.01 });
assert(moveResult.ok, 'embodied move dorms→quad');
if (moveResult.event) {
  const resolved = handleEmbodiedEventResolve(student, moveResult.event, moveResult.v2State, { students: roster, rng });
  assert(resolved.ok, 'event resolve');
  assert(resolved.student.lbs === student.lbs, 'student state returned');
}

// ── Walk log persistence ──
v2 = appendEmbodimentWalkLog(v2, '→ test line');
assert(v2.embodiment.walkLog.includes('→ test line'), 'walk log append');

// ── Event catalog ──
const eventIds = Object.keys(EMBODIED_EVENTS);
assert(eventIds.length >= 13, `13+ events registered (${eventIds.length})`);
const required = ['stuck_door', 'clothes_burst', 'bully_forcefeed', 'gym_scale_shame', 'elevator_groan', 'faculty_treats', 'immobile_anchor'];
for (const id of required) {
  assert(EMBODIED_EVENTS[id], `event exists: ${id}`);
}

// ── Embodied event grants trust ──
const lockedTargets = simStudents.filter((s) => s.lockState === 'locked');
const sighting = { id: 'classmate_sighting', trustNearby: 4, calories: 0, scrutiny: 0 };
const applied = applyEmbodiedEvent(student, sighting, { lockedStudents: lockedTargets, rng: () => 0 });
assert(applied.trustGrants.length > 0, 'classmate sighting grants passive trust');

console.log(failed ? `\n${failed} check(s) failed` : '\nAll embodied campus checks passed');
process.exit(failed ? 1 : 0);
