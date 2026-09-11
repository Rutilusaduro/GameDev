import assert from 'node:assert/strict';
import {
  skillsForHallRoom,
  computeHallRoomSynergyBonus,
  roomDevelopmentTier,
} from '../src/gameData/hallBlueprint.js';
import { computeHallAmbianceMeters, rollWeeklyAmbiancePulse } from '../src/gameData/hallAmbiance.js';
import { aggregateHallLoungeSkillEffects } from '../src/gameData/hallLoungeSkills.js';

const owned = { comfy_chairs: true, snack_station: true, wide_desks: true, catering_contact: true };
assert.ok(skillsForHallRoom('kitchen_pantry').some((s) => s.id === 'snack_station'));
assert.equal(roomDevelopmentTier(owned, 'common_lounge'), 1);
const synergy = computeHallRoomSynergyBonus(owned);
assert.ok(synergy >= 0);
const meters = computeHallAmbianceMeters(owned);
assert.ok(meters.comfort > 0);
const fx = aggregateHallLoungeSkillEffects(owned);
assert.ok(typeof fx.gainMult === 'number');
const richOwned = {
  comfy_chairs: true, wide_desks: true, mood_lighting: true, reinforced_seating: true,
  snack_station: true, catering_contact: true, private_kitchen: true,
  ap_notebook: true, double_ap: true,
};
const pulse = rollWeeklyAmbiancePulse(richOwned, 3, {});
assert.ok(pulse && pulse.axis);
console.log('test-hall-blueprint: ok');
