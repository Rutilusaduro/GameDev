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
import { clothingStateForStage } from '../src/gameData/textContext.js';
import { pickHearingEnding, REMOVAL_HEARING, extraHearingChoices, hearingChoicesForPhase } from '../src/gameData/oppositionHearings.js';
import { MECHANIC_DEPTH_INVENTORY, kitchenHuntBonus, socialTrustDrip, comfortFramingDecay, floorCheckInGainMult, itemCalorieBonus, hallKitchenFillCalories, hallDiningFillFullness, salonFloorLbs, galleryFloorLbs, pharmacistFloorCalMult, evolvedFloorBonus, extraDeviceUseLbs, extraCgBingeLbs, extraCgCorkboardDrive, extraHiveVisitLbs, extraHiveShiftLbs, extraForceFeederKitchenLbs, extraActivityKitchenLbs, extraCgActions, extraHiveActions, extraFeastKitchenLbs, extraFairTrainingLbs, extraLabKitchenLbs, extraCaseStudyLbs } from '../src/gameData/mechanicDepth.js';
import { extraSalonServiceChoices, salonChoicesForOwned, startSalonSession, salonPickMenu, salonServiceChoice } from '../src/gameData/chloeSalon.js';
import { extraStudioActions, extraFieldLocations, studioActionsForOwned, fieldLocationsForOwned } from '../src/gameData/fionaGallery.js';
import { extraMinigameChoices, minigameChoicesForPhase, computeMinigameOutcome } from '../src/gameData/evolvedMinigames.js';
import { extraAcquisitionChoices, acquisitionChoicesForOwned, startChemSession } from '../src/gameData/pharmacistIngredients.js';
import { extraCultRoutes, cultRoutesForOwned, applyCultDistribution } from '../src/gameData/pharmacistCult.js';
import { extraContestActions, extraSumoCornerFeeds, contestActionsForOwned, sumoCornerFeedsForOwned, extraCollabFoods, collabFoodsForOwned, extraRecordingFoods, recordingFoodsForOwned, COLLAB_STREAM_FOODS } from '../src/gameData/miniGames.js';
import { extraHomeroomChoices, homeroomChoicesForPhase, extraWifeLessons, wifeLessonsForOwned, extraEvolvedChoices, evolvedChoicesForPhase, extraFairAfterparty, extraActivityFollowups, sessionFoodsForOwned } from '../src/gameData/evolvedFloorExtras.js';
import { extraCultivatorChoices, cultivatorChoicesForJunction, extraCultivatorReneeLbs, RECIPES } from '../src/gameData/cultivator.js';
import { extraItemUseModes, itemUseModesForOwned } from '../src/gameData/items.js';
import { HOMEROOM_GROUP_ACTIVITIES, SESSION_FOOD_ITEMS } from '../src/gameData/evolvedForms.js';
import { extraIntimacyChoices, intimacyChoicesForPhase } from '../src/gameData/intimacy.js';
import { extraStreamRounds, pickRoundCount } from '../src/gameData/streaming.js';
import { resolveWeekPlan, plannerSlotCount, venuePayoffHint } from '../src/gameData/weekPlanner.js';
import { extraFloorChoices, generateFloorCheckIn } from '../src/utils/gameHelpers.js';
import { FLOOR_SCENES } from '../src/gameData/floorEvents.js';
import '../src/textEngine/modules.js';
import '../src/textEngine/scenes/overhaul/index.js';
import { renderFloorSceneText } from '../src/textEngine/scenes/campusEvent/floorCheckInIntegration.js';
import { extraHaveAChatChoices, haveAChatChoicesForPhase, HAVE_A_CHAT_SCENES } from '../src/gameData/communityResearcher.js';
import { extraHuntMoves, physicalMovesForOwned } from '../src/gameData/lilith.js';
import { renderEvolvedActivity } from '../src/textEngine/scenes/evolved/index.js';

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
  { id: 0, name: 'Brittany', lbs: 140, startLbs: 118, relationship: 20, corruption: 0, hidden: false, fullness: 0, stomachCapacity: 100, hungerTier: 2, mood: 'stressed', archetype: 'cheerleader' },
  { id: 8, name: 'Maya', lbs: 210, startLbs: 130, relationship: 12, corruption: 0, hidden: false, fullness: 10, stomachCapacity: 100, mood: 'content', archetype: 'quiet' },
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

const coverOwned = { institutional_cover: true, deep_cover: true };
const coverFx = aggregateHallLoungeSkillEffects(coverOwned);
assert.ok(coverFx.oppositionCover >= 2, 'cover stacks from desk upgrades');
assert.ok(coverFx.scrutinyReduce > 0, 'cover feeds scrutinyReduce');

const clothOwned = { laundry_refit: true, oversized_linens: true };
const clothFx = aggregateHallLoungeSkillEffects(clothOwned);
assert.ok(clothFx.clothingEase >= 2, 'linens ease clothing strain');

const mediaOwned = { media_nook: true, snack_station: true };
assert.ok(aggregateHallLoungeSkillEffects(mediaOwned).streamRelBonus >= 2, 'media nook stream rel');

const aware = { body_awareness: true };
assert.ok(aggregateFloorDepth(aware).talkCorruptionBonus >= 1, 'body awareness talk corruption');

assert.equal(clothingStateForStage(5, 0), 'zipper_fail');
assert.equal(clothingStateForStage(5, 2), 'button_pop');
assert.equal(clothingStateForStage(3, 3), 'fitted');

const rawEnd = pickHearingEnding(REMOVAL_HEARING, ['feast']);
const covered = pickHearingEnding(REMOVAL_HEARING, ['feast'], 2);
assert.ok(covered.scrutinyDelta < rawEnd.scrutinyDelta, 'hearing cover lowers scrutiny');

assert.ok(MECHANIC_DEPTH_INVENTORY.length >= 41, 'depth inventory covers live systems');
for (const row of MECHANIC_DEPTH_INVENTORY) {
  assert.ok(row.after > row.before, `${row.id} after (${row.after}) must beat before (${row.before})`);
  assert.ok(row.hook, `${row.id} missing hook`);
}
assert.ok(kitchenHuntBonus(20, allOwned) > 2, 'hunt bonus scales with floor');
assert.ok(socialTrustDrip(allOwned) > 0, 'trust drip from completed rooms');
assert.equal(comfortFramingDecay({ comfort_framing: true }), 3);
assert.ok(floorCheckInGainMult(allOwned) > 1);
assert.ok(itemCalorieBonus('Pizza Party', owned) >= 400, 'item calories ride snack station');
assert.ok(hallKitchenFillCalories(allOwned) > 0, 'kitchen fill feeds hall feasts');
assert.ok(hallDiningFillFullness(allOwned) > 0, 'dining fill adds fullness');
assert.ok(venuePayoffHint('dining').includes('cal'), 'venue hint shows calories');

assert.ok(salonFloorLbs(allOwned) > 0, 'salon floor lbs live');
assert.ok(extraSalonServiceChoices({ dinner_basic: true, media_nook: true }).length >= 2, 'salon extras cap at 2');
assert.ok(salonChoicesForOwned({ dinner_basic: true }).length > 3, 'salon extras append');
let salon = startSalonSession({ prestige: 0, indulgence: 0, eveningsHosted: 0, guestBook: [], session: null }, ['brittany']);
salon = salonPickMenu(salon, 'cheese');
salon = salonPickMenu(salon, 'croissant');
salon = salonPickMenu(salon, 'fried');
salon = salonPickMenu(salon, 'milkshake');
const afterService = salonServiceChoice(salon, 'floor_leftovers', { dinner_basic: true });
assert.ok(afterService.session.serviceLog.includes('floor_leftovers'), 'salon extra service is playable');

assert.ok(galleryFloorLbs({ media_nook: true, echo_gallery: true }) >= 3, 'gallery floor lbs live');
assert.ok(extraStudioActions({ media_nook: true }).length >= 1, 'gallery studio extra');
assert.ok(extraFieldLocations({ snack_station: true }).length >= 1, 'gallery field extra');
assert.ok(studioActionsForOwned({ media_nook: true }).length > 4);
assert.ok(fieldLocationsForOwned({ echo_gallery: true }).some((l) => l.id === 'echo_gallery'));

assert.ok(pharmacistFloorCalMult(allOwned) > 1, 'pharmacist kitchen/psych fill');
assert.ok(extraAcquisitionChoices({ luxury_pantry: true }).some((a) => a.id === 'kitchen_extract'));
assert.ok(acquisitionChoicesForOwned(1, { research_budget: true }).some((a) => a.id === 'lounge_grant'));
const chem = startChemSession({ stage: 1 }, { research_budget: true });
assert.ok(chem.maxBrews >= 3, 'research budget adds a brew slot');

assert.ok(evolvedFloorBonus(allOwned).gain >= 1, 'evolved floor bonus scales with rooms');
assert.ok(minigameChoicesForPhase('campus_challenge', 0, { snack_station: true }).length > 3, 'minigame extras append');
assert.ok(extraMinigameChoices('delivery_order', { dinner_basic: true }).some((c) => c.id === 'dining_nook'));
const bare = computeMinigameOutcome('campus_challenge', [{ score: 3 }, { score: 3 }], 0, {});
const floored = computeMinigameOutcome('campus_challenge', [{ score: 3 }, { score: 3 }], 0, allOwned);
assert.ok(floored.gain > bare.gain, 'minigame floor bonus pays');

assert.ok(extraHearingChoices('removal', { legendary_host: true }).length >= 1);
assert.ok(hearingChoicesForPhase(REMOVAL_HEARING, 0, { snack_station: true }, 'removal').length > REMOVAL_HEARING.phases[0].choices.length);

assert.ok(extraIntimacyChoices({ oversized_linens: true }).some((c) => c.id === 'linens_nest'));
assert.ok(intimacyChoicesForPhase({ choices: [{ id: 'wrap_arms' }] }, { oversized_linens: true }).length >= 2);

assert.equal(extraStreamRounds({ media_nook: true }), 1);
assert.ok(pickRoundCount(null, () => 0, { media_nook: true }) > pickRoundCount(null, () => 0, {}));
assert.ok(extraDeviceUseLbs({ device_bay: true }) >= 1);

assert.ok(extraContestActions({ snack_station: true, dinner_basic: true }).length >= 2, 'contest extras cap at 2');
assert.ok(contestActionsForOwned({ snack_station: true }).some((a) => a.id === 'kitchen_plate'));
assert.ok(extraSumoCornerFeeds({ artisan_bakery: true }, 0).some((f) => f.id === 'kitchen_chanko'));
assert.ok(sumoCornerFeedsForOwned({ dinner_basic: true }, 1).length > 1);

assert.ok(extraHomeroomChoices('parent_meeting', 0, { snack_station: true }).some((c) => c.id === 'floor_potluck'));
assert.ok(
  homeroomChoicesForPhase(HOMEROOM_GROUP_ACTIVITIES.parent_meeting, 'parent_meeting', 0, { snack_station: true }).length
    > HOMEROOM_GROUP_ACTIVITIES.parent_meeting.choices.length,
);
assert.ok(extraWifeLessons(1, { artisan_bakery: true }).some((l) => l.id === 'floor_kitchen_swap'));
assert.ok(wifeLessonsForOwned(1, { dinner_basic: true }).length > 3);

assert.ok(extraCultRoutes({ luxury_pantry: true }).some((r) => r.id === 'floor_tasting'));
assert.ok(cultRoutesForOwned({ legendary_host: true }).length > 4);
const cultOut = applyCultDistribution({ cultActive: true, cult: { circleSize: 4, devotion: 15, supplyReservoir: 0, distributionsRun: 0 } }, 'floor_tasting', (lo, hi) => lo, { snack_station: true });
assert.ok(cultOut.outcome, 'cult extra route is playable');

assert.ok(extraItemUseModes({ snack_station: true, luxury_pantry: true }).length >= 2);
assert.ok(itemUseModesForOwned({ dinner_basic: true }).some((m) => m.id === 'share'));
assert.ok(itemUseModesForOwned({}).length === 1, 'bare pantry stays one mode');

assert.ok(extraEvolvedChoices('sumo', 0, 0, { snack_station: true }).some((c) => c.id === 'floor_kitchen_fuel'));
assert.ok(evolvedChoicesForPhase('sumo', 0, 0, { snack_station: true }).length > 2, 'evolved extras append on phase 0');
assert.equal(extraEvolvedChoices('sumo', 0, 1, { snack_station: true }).length, 0, 'evolved extras stay on phase 0');
assert.ok(extraFairAfterparty({ snack_station: true }).some((e) => e.id === 'kitchen_spread'));
assert.ok(extraCgBingeLbs({ snack_station: true }) >= 4);
assert.equal(extraCgBingeLbs({}), 0);
assert.ok(extraCgActions({ snack_station: true, comfy_chairs: true }).length >= 2);
assert.ok(extraCgCorkboardDrive({ media_nook: true }) >= 4);
assert.ok(extraHiveVisitLbs({ snack_station: true }) >= 3);
assert.ok(extraHiveShiftLbs({ luxury_pantry: true }) >= 1);
assert.ok(extraHiveActions({ artisan_bakery: true }).some((a) => a.id === 'kitchen'));
assert.ok(extraForceFeederKitchenLbs({ artisan_bakery: true }) >= 3);
assert.ok(extraActivityKitchenLbs({ snack_station: true }) >= 3);
assert.ok(extraCultivatorChoices('milkshake', 0, { snack_station: true }).some((c) => c.id === 'floor_kitchen_batch'));
assert.ok(cultivatorChoicesForJunction('milkshake', 0, { snack_station: true }).length > RECIPES.milkshake.junctions[0].choices.length);
assert.equal(extraCultivatorChoices('milkshake', 1, { snack_station: true }).length, 0);
assert.ok(extraCultivatorReneeLbs({ artisan_bakery: true }) >= 2);

assert.ok(extraActivityFollowups({ snack_station: true }).some((e) => e.id === 'kitchen_seconds'));
assert.ok(extraActivityFollowups({ comfy_chairs: true }).some((e) => e.id === 'lounge_linger'));
assert.ok(sessionFoodsForOwned({ dinner_basic: true }).some((f) => f.id === 'dining_plate'));
assert.ok(sessionFoodsForOwned({ snack_station: true }).length > SESSION_FOOD_ITEMS.length);
assert.ok(extraHaveAChatChoices(0, 0, { snack_station: true }).some((c) => c.id === 'kitchen_brief'));
assert.equal(extraHaveAChatChoices(0, 1, { snack_station: true }).length, 0, 'have-a-chat extras stay on phase 0');
assert.ok(haveAChatChoicesForPhase(0, 0, { snack_station: true }).length > HAVE_A_CHAT_SCENES[0].phases[0].choices.length);
assert.ok(extraFeastKitchenLbs(allOwned) > 0, 'feast kitchen fill pays');
assert.ok(extraFairTrainingLbs({ snack_station: true }) >= 3);
assert.ok(extraLabKitchenLbs({ device_bay: true }) >= 3);
assert.ok(extraCaseStudyLbs({ snack_station: true }) >= 3);
assert.ok(extraHuntMoves({ snack_station: true }).kitchen_scent);
assert.ok(Object.keys(physicalMovesForOwned({ comfy_chairs: true })).length > Object.keys(physicalMovesForOwned({})).length);
assert.ok(extraCollabFoods(0, { snack_station: true }).some((f) => f.id === 'kitchen_leftovers'));
assert.ok(collabFoodsForOwned(0, { artisan_bakery: true }).length > COLLAB_STREAM_FOODS[0].length);
assert.ok(extraRecordingFoods({ luxury_pantry: true }).includes('food_kitchen'));
assert.ok(recordingFoodsForOwned({ snack_station: true }).includes('food_kitchen'));
assert.equal(recordingFoodsForOwned({}).includes('food_kitchen'), false);

const activityText = renderEvolvedActivity({
  id: 0, name: 'Brittany', lbs: 258, startLbs: 118, evolvedForm: 'sumo', relationship: 40, corruption: 1,
}, 3, { formId: 'sumo', stageIdx: 0, v2DepthChance: 0 });
assert.ok(activityText && !activityText.includes('{unresolved}'), `evolved activity pool should resolve, got: ${String(activityText).slice(0, 160)}`);
assert.ok(activityText.length > 40, 'evolved activity scene should be longer than a stub');

const extras = extraFloorChoices({ snack_station: true, comfy_chairs: true, dinner_basic: true });
assert.equal(extras.length, 2, 'extra check-in choices cap at 2');
assert.ok(extras.some((c) => /kitchen/i.test(c.label)), 'kitchen walk is a live extra');

const checkIn = generateFloorCheckIn(students, 1, { snack_station: true });
const studentScene = checkIn.find((s) => s.type === 'student');
assert.ok(studentScene, 'check-in finds a resident scene');
assert.ok(studentScene.scene.choices.length >= 4, 'owned kitchen adds a fourth choice');
const src = FLOOR_SCENES.find((s) => s.id === studentScene.scene.id);
assert.equal(src.choices.length, 3, 'extra choices clone, they do not mutate FLOOR_SCENES');

const stressed = FLOOR_SCENES.find((s) => s.id === 'mood_stressed');
const mayaText = renderFloorSceneText(stressed, students[1], 2);
assert.ok(mayaText.includes('Maya'), `floor scene should name Maya, got: ${mayaText.slice(0, 180)}`);
assert.equal(mayaText.includes('Brittany'), false, 'floor scene must not bake Brittany into every resident');

const planned = {
  slots: [
    { studentId: 0, venueId: 'dining' },
    { studentId: 8, venueId: 'dorm' },
  ],
};
const planPay = resolveWeekPlan({ plan: planned, students, owned, week: 2 });
assert.ok(planPay.filled >= 2, 'week plan pays off filled slots');
assert.ok(planPay.studentPatches.some((p) => p.cal > 0), 'dining slot feeds');
assert.ok(planPay.studentPatches.some((p) => p.rel > 0), 'dorm slot rapport');
assert.ok(planPay.moneyDelta < 0, 'planned meals cost money');
assert.equal(plannerSlotCount({}), 5);
assert.ok(plannerSlotCount(allOwned) > 5, 'completed rooms add planner slots');

const pantryOwned = { luxury_pantry: true, supply_cage: true };
assert.ok(aggregateFloorDepth(pantryOwned).pantryBonus >= 2, 'luxury pantry + supply cage stack pantry drops');
const hostOwned = { legendary_host: true };
assert.ok(aggregateFloorDepth(hostOwned).dinnerCalBonus >= 2000, 'legendary host dinner cals live');
assert.ok(extraFeedCalories('Floor Pizza Night', { catering_contact: true }) >= 800, 'catering contact feast cals live');

console.log('floor-blueprint: ok', {
  rooms: FLOOR_ROOMS.length,
  skills: SKILL_TREE.length,
  talkRel: depth.talkRelBonus,
  walkBeats: walk.beats.length,
  completeRooms: full.completedRooms,
  inventory: MECHANIC_DEPTH_INVENTORY.length,
});
