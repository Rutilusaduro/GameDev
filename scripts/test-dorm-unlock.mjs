#!/usr/bin/env node
/** Verify dorm unlock schedule + hall reach gating. */
import assert from 'assert';
import { dormUnlocksForWeek, DORMS, getStudentHomeDorm, effectiveUnlockWeek } from '../src/gameData/dorms.js';
import {
  isHallReachable, applyWeeklyTrustDrip, grantPassiveTrust, ROSTER_TRUST_GATE,
} from '../src/gameData/rosterUnlock.js';

const startDorm = 'sporty';
const unlocked = [startDorm];

assert.deepEqual(dormUnlocksForWeek(7, startDorm), []);
assert.deepEqual(dormUnlocksForWeek(8, startDorm), ['nerdy']);
assert.deepEqual(dormUnlocksForWeek(12, startDorm), ['nerdy', 'socialite']);
assert.deepEqual(dormUnlocksForWeek(16, startDorm), ['nerdy', 'socialite', 'weirdos']);
assert.deepEqual(dormUnlocksForWeek(8, 'nerdy'), ['sporty'], 'nerdy start unlocks Victory Hall at wk8');
assert.deepEqual([...dormUnlocksForWeek(16, 'nerdy')].sort(), ['socialite', 'sporty', 'weirdos']);
assert.equal(effectiveUnlockWeek('sporty', 'nerdy'), 8, 'Victory Hall UI gate for nerdy start');
assert.equal(effectiveUnlockWeek('sporty', 'sporty'), 0, 'Victory Hall home hall has no gate week');
assert.equal(effectiveUnlockWeek('nerdy', 'sporty'), 8);

const cassidy = { id: 1, lockState: 'locked', passiveTrust: 0, homeDorm: 'sporty' };
const nerdyGirl = { id: 7, lockState: 'locked', passiveTrust: 0, homeDorm: 'nerdy' };
const annexGirl = { id: 5, lockState: 'locked', passiveTrust: 0, homeDorm: 'weirdos' };

assert.equal(isHallReachable(cassidy, unlocked), true);
assert.equal(isHallReachable(nerdyGirl, unlocked), false);
assert.equal(isHallReachable(annexGirl, unlocked), false);

const afterDrip = applyWeeklyTrustDrip([nerdyGirl, cassidy], {
  reachLevel: 1,
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
