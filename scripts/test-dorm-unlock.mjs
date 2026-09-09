#!/usr/bin/env node
/** Verify dorm unlock schedule + hall reach gating. */
import assert from 'assert';
import { dormUnlocksForWeek, DORMS, getStudentHomeDorm } from '../src/gameData/dorms.js';
import {
  isHallReachable, applyWeeklyTrustDrip, grantPassiveTrust, ROSTER_TRUST_GATE,
} from '../src/gameData/rosterUnlock.js';

const startDorm = 'sporty';
const unlocked = [startDorm];

assert.deepEqual(dormUnlocksForWeek(7, startDorm), []);
assert.deepEqual(dormUnlocksForWeek(8, startDorm), ['nerdy']);
assert.deepEqual(dormUnlocksForWeek(12, startDorm), ['nerdy', 'socialite']);
assert.deepEqual(dormUnlocksForWeek(16, startDorm), ['nerdy', 'socialite', 'weirdos']);

const cassidy = { id: 1, lockState: 'locked', passiveTrust: 0, homeDorm: 'sporty' };
const nerdyGirl = { id: 5, lockState: 'locked', passiveTrust: 0, homeDorm: 'nerdy' };

assert.equal(isHallReachable(cassidy, unlocked), true);
assert.equal(isHallReachable(nerdyGirl, unlocked), false);

const afterDrip = applyWeeklyTrustDrip([nerdyGirl, cassidy], {
  spiritLevel: 1,
  week: 4,
  unlockedDorms: unlocked,
});
assert.equal(afterDrip.find((s) => s.id === nerdyGirl.id).passiveTrust, 0);
assert.ok(afterDrip.find((s) => s.id === cassidy.id).passiveTrust > 0);

const opened = grantPassiveTrust(nerdyGirl, 20, ['sporty', 'nerdy']);
assert.equal(opened.passiveTrust, 20);

console.log('dorm-unlock: all assertions passed');
console.log('unlock weeks:', Object.fromEntries(
  Object.values(DORMS).map((d) => [d.id, d.unlockWeek]),
));
