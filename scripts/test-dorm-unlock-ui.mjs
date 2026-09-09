#!/usr/bin/env node
/** ClassView hall-reach + unlock progress logic at weeks 8/12/16. */
import assert from 'assert';
import {
  DORM_LIST, dormUnlocksForWeek, getStudentHomeDorm,
} from '../src/gameData/dorms.js';
import { isHallReachable } from '../src/gameData/rosterUnlock.js';

const startDorm = 'sporty';
const priya = { id: 7, lockState: 'locked', passiveTrust: 0, homeDorm: 'nerdy' };

function openHallSet(week, unlocked = []) {
  const open = new Set([startDorm, ...unlocked]);
  for (const id of dormUnlocksForWeek(week, startDorm)) open.add(id);
  return open;
}

function hallReachable(student, openSet) {
  const home = getStudentHomeDorm(student.id);
  return !home || openSet.has(home);
}

// Week 7: nerdy still locked
assert.deepEqual(dormUnlocksForWeek(7, startDorm), []);
const w7 = openHallSet(7);
assert.equal(hallReachable(priya, w7), false);
assert.equal(isHallReachable(priya, [...w7]), false);

// Week 8: nerdy opens
assert.deepEqual(dormUnlocksForWeek(8, startDorm), ['nerdy']);
const w8 = openHallSet(8);
assert.equal(hallReachable(priya, w8), true);
assert.equal(isHallReachable(priya, [...w8]), true);

// Week 12: socialite
assert.ok(dormUnlocksForWeek(12, startDorm).includes('socialite'));

// Week 16: all secondary halls
const w16 = openHallSet(16);
for (const d of DORM_LIST) {
  if (d.id === startDorm) continue;
  assert.ok(w16.has(d.id), `expected ${d.id} open at week 16`);
}

// NEW badge week: unlock week matches current week
const nerdyDorm = DORM_LIST.find((d) => d.id === 'nerdy');
assert.equal(nerdyDorm.unlockWeek, 8);
const showNewAt8 = nerdyDorm.unlockWeek > 0 && 8 === nerdyDorm.unlockWeek;
const hideNewAt9 = 9 === nerdyDorm.unlockWeek;
assert.ok(showNewAt8);
assert.ok(!hideNewAt9 || nerdyDorm.unlockWeek !== 9);

// Week 16: all halls open — roadmap panel should hide
assert.equal(openHallSet(16).size, 4);
assert.ok(DORM_LIST.every((d) => openHallSet(16).has(d.id)));

console.log('dorm-unlock-ui: all assertions passed');
console.log('unlock schedule:', DORM_LIST.map((d) => `${d.shortLabel}: wk ${d.unlockWeek}`).join(', '));
