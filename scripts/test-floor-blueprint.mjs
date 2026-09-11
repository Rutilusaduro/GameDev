// Floor blueprint + After-Hours Rounds — mechanics inventory
import assert from 'node:assert/strict';
import { SKILL_TREE } from '../src/gameData/skills.js';
import {
  FLOOR_ROOMS,
  assertSkillRoomCoverage,
  aggregateFloorDepth,
  loungeGainMultForStudent,
  extraFeedCalories,
  toggleCircuitPin,
  canWalkCircuit,
  walkAfterHours,
  midnightRitualTick,
  createInitialFloorCircuit,
  roomsAreAdjacent,
  completedRoomCount,
  CIRCUIT_MAX_ROOMS,
} from '../src/gameData/floorBlueprint.js';
import { aggregateHallLoungeSkillEffects, buyHallLoungeSkill } from '../src/gameData/hallLoungeSkills.js';
import { createInitialPlayer } from '../src/gameData/player.js';

const missing = assertSkillRoomCoverage();
assert.equal(missing.length, 0, `unmapped skills: ${missing.join(', ')}`);

const owned = { snack_station: true, comfy_chairs: true, personal_gifts: true, late_night_access: true };
const depth = aggregateFloorDepth(owned);
assert.ok(depth.talkRelBonus >= 3, 'personal_gifts talk rel is live');
assert.ok(depth.feedCalBonus >= 400, 'snack_station feed cals live');
assert.ok(depth.interruptReduce > 0, 'late_night interrupt reduce live');

const fx = aggregateHallLoungeSkillEffects(owned);
assert.equal(fx.talkRelBonus, depth.talkRelBonus);
assert.ok(extraFeedCalories('Pizza Party', owned) >= 400);

const thin = { lbs: 125, startLbs: 125 };
const heavy = { lbs: 500, startLbs: 125 };
const withSuite = { ...owned, dedicated_suite: true, climate_control: true };
assert.ok(
  loungeGainMultForStudent(heavy, withSuite, 0.25) > loungeGainMultForStudent(thin, withSuite, 0.25),
  'stage-gated lounge gain favors heavier residents',
);

let circuit = createInitialFloorCircuit();
circuit = toggleCircuitPin(circuit, 'kitchen');
circuit = toggleCircuitPin(circuit, 'lounge');
assert.deepEqual(circuit.pinned, ['kitchen', 'lounge']);
assert.ok(roomsAreAdjacent('kitchen', 'lounge') || roomsAreAdjacent('lounge', 'kitchen'));
assert.equal(canWalkCircuit(owned, circuit, 0, 1).ok, true, 'late_night makes rounds free');

const students = [
  { id: 0, name: 'Brittany', lbs: 140, startLbs: 118, relationship: 20, corruption: 0, hidden: false, fullness: 0, stomachCapacity: 100, hungerTier: 2 },
  { id: 8, name: 'Maya', lbs: 210, startLbs: 130, relationship: 12, corruption: 0, hidden: false, fullness: 10, stomachCapacity: 100 },
];
const walk = walkAfterHours({ owned, students, circuit, week: 1, ap: 5, rng: () => 0.2 });
assert.equal(walk.ok, true);
assert.ok(walk.beats.length >= 2);
assert.ok(walk.studentPatches.length >= 1, 'rounds patch at least one resident');
assert.equal(walk.nextCircuit.lastWalkWeek, 1);
assert.equal(canWalkCircuit(owned, walk.nextCircuit, 5, 1).ok, false, 'one walk per week');

const ritual = midnightRitualTick({ owned: { ...owned, midnight_ritual: true }, students, rng: () => 0.1 });
assert.equal(ritual.ok, true);

const player = createInitialPlayer();
assert.ok(player.floorCircuit);
assert.equal(player.floorCircuit.pinned.length, 0);

const buy = buyHallLoungeSkill('comfy_chairs', {}, [{ lbs: 200, startLbs: 100 }]);
assert.equal(buy.ok, true);

assert.ok(FLOOR_ROOMS.length >= 16);
assert.equal(CIRCUIT_MAX_ROOMS, 4);
assert.ok(completedRoomCount(owned) >= 0);

const allOwned = Object.fromEntries(SKILL_TREE.map((s) => [s.id, true]));
const full = aggregateFloorDepth(allOwned);
assert.ok(full.completedRooms >= 8, `expected many complete rooms, got ${full.completedRooms}`);
assert.ok(full.synergyGainMult > 0);

console.log('floor-blueprint: ok', {
  rooms: FLOOR_ROOMS.length,
  skills: SKILL_TREE.length,
  talkRel: depth.talkRelBonus,
  walkBeats: walk.beats.length,
  completeRooms: full.completedRooms,
});
