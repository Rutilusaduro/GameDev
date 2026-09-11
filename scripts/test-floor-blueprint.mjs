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
import { extraCultivatorChoices, cultivatorChoicesForJunction, extraCultivatorReneeLbs, RECIPES, getPlannedVignette } from '../src/gameData/cultivator.js';
import { extraItemUseModes, itemUseModesForOwned } from '../src/gameData/items.js';
import { HOMEROOM_GROUP_ACTIVITIES, SESSION_FOOD_ITEMS } from '../src/gameData/evolvedForms.js';
import { extraIntimacyChoices, intimacyChoicesForPhase } from '../src/gameData/intimacy.js';
import { extraStreamRounds, pickRoundCount } from '../src/gameData/streaming.js';
import { resolveWeekPlan, plannerSlotCount, venuePayoffHint } from '../src/gameData/weekPlanner.js';
import { extraFloorChoices, generateFloorCheckIn } from '../src/utils/gameHelpers.js';
import { FLOOR_SCENES } from '../src/gameData/floorEvents.js';
import '../src/textEngine/modules.js';
import '../src/textEngine/scenes/overhaul/index.js';
import { renderPharmacistAcquire, renderPharmacistCompound, renderPharmacistCult } from '../src/textEngine/scenes/overhaul/pharmacist.js';
import { renderMinigamePhase, renderMinigameLog, renderMinigameWrap } from '../src/textEngine/scenes/overhaul/minigame.js';
import { renderHuntArrive, renderHuntTravel, renderHuntDormOpen, renderHuntClueFeast, renderHuntClueInvestigate, renderHuntClueResult } from '../src/textEngine/scenes/overhaul/huntArrive.js';
import { renderLilithFeast, renderLilithDeliveryIntro, renderLilithDigest, renderLilithDigestComplete, renderLilithDigestBlocked, renderLilithHuntStatus } from '../src/textEngine/scenes/overhaul/huntFeast.js';
import { renderFeederJournalEntry, renderNadiaJournalEntry } from '../src/textEngine/scenes/researchJournal/index.js';
import { INTIMACY_SCENES } from '../src/gameData/intimacy.js';
import { renderHuntNode, renderHuntTarget } from '../src/textEngine/scenes/hunt/index.js';
import { renderFloorSceneText, renderFloorChoiceResult, renderFloorHallText } from '../src/textEngine/scenes/campusEvent/floorCheckInIntegration.js';
import { extraHaveAChatChoices, haveAChatChoicesForPhase, HAVE_A_CHAT_SCENES } from '../src/gameData/communityResearcher.js';
import { renderResearcherChat, renderResearcherThesis, renderResearcherReview, renderBoardReaction } from '../src/textEngine/scenes/overhaul/researcherChat.js';
import { extraHuntMoves, physicalMovesForOwned, startLilithDigest, tickLilithDigest, canStartLilithHunt } from '../src/gameData/lilith.js';
import { renderOriginVoice } from '../src/textEngine/scenes/overhaul/originVoice.js';
import { renderStageDrop } from '../src/textEngine/scenes/overhaul/stageDrop.js';
import { renderDeviceCatalogDesc } from '../src/textEngine/scenes/deviceFlavor.js';
import { getBodyDesc, getBodyDescRich, getOutfit, getAttitude } from '../src/utils/gameHelpers.js';
import { renderHearingPhase } from '../src/textEngine/scenes/opposition/hearingBridge.js';
import { renderEvolvedActivity, renderEvolvedEventProse, renderEvolvedFollowup } from '../src/textEngine/scenes/evolved/index.js';
import { renderContestFoodPopup, renderContestActionPopup, renderContestWeighIn2 } from '../src/textEngine/scenes/eatingContest/index.js';
import { renderSumoOpening, renderSumoExchangeLine, renderSumoAftermath, renderSumoPayoff } from '../src/textEngine/scenes/sumoMatch/index.js';
import { renderRecordingOpening, renderRecordingDirectionPopup, renderRecordingTakeResult, renderRecordingOneMoreTake, renderRecordingWrapEnding } from '../src/textEngine/scenes/recordingSession/index.js';
import { renderCampusLook, renderCampusArrive } from '../src/textEngine/scenes/overhaul/campusHunt.js';
import { renderCgBinge, renderCgCorkboard, renderFairBeat, renderCgSelfReview, renderCgMeasure, renderFairPhoto, renderFairBoost } from '../src/textEngine/scenes/overhaul/cgFair.js';
import { renderHiveVisit, renderHivePhoto, renderDestinySpend } from '../src/textEngine/scenes/overhaul/leftoverDisplay.js';
import { renderCgChatPriyaPost, renderCgChatResident, renderCgChatFollowup, renderCgChatRaReply, renderCgMeasureReaction } from '../src/textEngine/scenes/overhaul/cgChat.js';
import { renderSessionNpc, renderSessionPayoff } from '../src/textEngine/scenes/overhaul/sessionNpc.js';
import { renderWifeLessonTalkLine, renderWifeLessonBeat } from '../src/textEngine/scenes/wifeLessons/index.js';
import { renderHomeroomPool, homeroomConferencePoolKey } from '../src/textEngine/scenes/homeroom/index.js';
import { renderIntimacyChoice, renderIntimacyPhase, renderIntimacyEnding } from '../src/textEngine/scenes/intimacy/index.js';
import { renderCampusEventBeat } from '../src/textEngine/scenes/campusEvent/index.js';
import { renderCollabPayoff } from '../src/textEngine/scenes/collabStream/index.js';
import { render, createContext } from '../src/textEngine/engine.js';
import { renderDinnerArrive } from '../src/textEngine/scenes/overhaul/dinnerVenue.js';
import { renderStudentBlurb } from '../src/textEngine/scenes/overhaul/studentBlurb.js';
import { renderDinnerDishDesc } from '../src/textEngine/scenes/dinner/index.js';
import { renderCultivatorChoice } from '../src/textEngine/scenes/cultivator/index.js';
import { renderTesterLook } from '../src/textEngine/scenes/overhaul/leftoverCultivator.js';
import { renderItemDesc, renderPrivateVenueDesc, renderPrivateVenueIntro, renderPrivateBlobIntro, renderQuestDesc, renderArrivalCapstoneDesc } from '../src/textEngine/scenes/overhaul/leftoverCatalog.js';
import { renderIntimacyPicker } from '../src/textEngine/scenes/overhaul/intimacy.js';
import { renderSessionEncourage, renderSessionTapout, renderImmobileRedirect, renderSettleArrival, renderSettleRefit, renderSettleComfort, renderAbilityCard } from '../src/textEngine/scenes/overhaul/leftoverSessionBeats.js';
import { renderHallSkillDesc, renderRaSkillDesc, renderEvolvedSkillDesc } from '../src/textEngine/scenes/overhaul/leftoverSkills.js';
import { renderSessionPaceDesc, renderHiveTaskDesc, renderSumoMoveDesc, renderPharmacistActDesc, renderPharmacistOptDesc, renderFloorActionDesc, renderRoomBlurb, renderPhysicalTraitDesc } from '../src/textEngine/scenes/overhaul/leftoverUiBeats.js';
import '../src/textEngine/scenes/overhaul/leftoverLastWins.js';

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

const contestStudent = {
  id: 8, name: 'Maya', lbs: 330, startLbs: 130, evolvedForm: 'eating_competitor',
  relationship: 20, corruption: 1, fullness: 20, stomachCapacity: 120,
};
const contestFood = renderContestFoodPopup('hotdogs', 0, contestStudent, 3);
assert.ok(contestFood && !contestFood.includes('{unresolved}'), `contest food pool should resolve, got: ${String(contestFood).slice(0, 160)}`);
assert.equal(/Three go down before you've thought/i.test(contestFood), false, 'contest food should not be the old popup monolith');
const contestAction = renderContestActionPopup('taunt', 0, contestStudent, 3);
assert.ok(contestAction && !contestAction.includes('{unresolved}'), `contest action pool should resolve, got: ${String(contestAction).slice(0, 160)}`);
assert.equal(/That is the whole conversation/i.test(contestAction), false);

const sumoStudent = {
  id: 0, name: 'Brittany', lbs: 400, startLbs: 118, evolvedForm: 'sumo',
  relationship: 40, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const sumoOpen = renderSumoOpening(0, sumoStudent, 340, 4);
assert.ok(sumoOpen && !sumoOpen.includes('{unresolved}'), `sumo open pool should resolve, got: ${String(sumoOpen).slice(0, 160)}`);
assert.equal(/The first tachi-ai/i.test(sumoOpen), false, 'sumo open should not be the leftover monolith');
let sawDrive = false;
for (let i = 0; i < 40; i++) {
  const sumoEx = renderSumoExchangeLine('you_drive', 0, sumoStudent, 4);
  assert.ok(sumoEx && !sumoEx.includes('{unresolved}'));
  if (/You drive|belly first/i.test(sumoEx)) sawDrive = true;
}
assert.ok(sawDrive, 'you_drive bucket should surface across pooled renders');

const eventText = renderEvolvedEventProse('LEGACY MONOLITH SHOULD NOT APPEAR', {
  id: 0, name: 'Brittany', lbs: 258, startLbs: 118, evolvedForm: 'sumo', relationship: 40, corruption: 1,
}, 3, { formId: 'sumo', stageIdx: 0, phaseIdx: 0, preferComposed: true, v2DepthChance: 0 });
assert.ok(eventText && !eventText.includes('{unresolved}'), `evolved event pool should resolve, got: ${String(eventText).slice(0, 160)}`);
assert.equal(eventText.includes('LEGACY MONOLITH SHOULD NOT APPEAR'), false, 'composed event should replace leftover phase text');
assert.ok(eventText.length > 60, 'evolved event scene should be longer than a stub');

const officeLook = renderCampusLook('office', 1);
assert.ok(/couch remembers|snack wrapper|RA inbox/i.test(officeLook), `LOOK_HEAVY should be campus look primary, got: ${String(officeLook).slice(0, 180)}`);
const officeArrive = renderCampusArrive('office', 1);
assert.ok(officeArrive && !officeArrive.includes('{unresolved}'));
assert.equal(/Master key on a lanyard/i.test(officeArrive), false, 'campus arrive should not dump leftover node.desc');

const pantryCtx = createContext({ subject: students[0], week: 2, globals: { itemLabel: 'cookie dough' } });
const pantryLine = render('{pantry.use}', pantryCtx);
assert.ok(pantryLine && !pantryLine.includes('{unresolved}'), `pantry.use should resolve, got: ${String(pantryLine).slice(0, 160)}`);
assert.ok(/cookie dough/i.test(pantryLine), `item.label should land in pantry.use, got: ${String(pantryLine).slice(0, 160)}`);

const recStudent = {
  id: 2, name: 'Kylie', lbs: 240, startLbs: 125, evolvedForm: 'feedee_creator',
  relationship: 30, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const recOpen = renderRecordingOpening(0, recStudent, 3);
assert.ok(recOpen && !recOpen.includes('{unresolved}'), `recording open should resolve, got: ${String(recOpen).slice(0, 160)}`);
assert.equal(/I'm so ready for this/i.test(recOpen), false, 'recording open should not be the leftover monolith');
const recDir = renderRecordingDirectionPopup('food_kitchen', 0, recStudent, 3);
assert.ok(recDir && !recDir.includes('{unresolved}'));
assert.equal(/You bring the hall kitchen leftovers/i.test(recDir), false, 'recording direction should not be leftover food_kitchen copy');

const cgPriya = {
  id: 5, name: 'Priya', lbs: 260, startLbs: 125, evolvedForm: 'competitive_gainer',
  relationship: 30, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const binge = renderCgBinge(cgPriya, 3, { kitchen: true });
assert.ok(binge && !binge.includes('{unresolved}'), `cg binge should resolve, got: ${String(binge).slice(0, 160)}`);
const cork = renderCgCorkboard(cgPriya, 3);
assert.ok(cork && !cork.includes('{unresolved}'));
const mj = {
  id: 4, name: 'Mary Jane', lbs: 220, startLbs: 130, evolvedForm: 'state_fair_queen',
  relationship: 25, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const fairOpen = renderFairBeat('weighin.open', mj, 4, { influenceKey: 'None', stageIdx: 0 });
assert.ok(fairOpen && !fairOpen.includes('{unresolved}'), `fair open should resolve, got: ${String(fairOpen).slice(0, 160)}`);
assert.ok(/Fairgrounds|tank|scale|mass|pinned/i.test(fairOpen));
const fairTrain = renderFairBeat('train', mj, 4, { stageIdx: 0 });
assert.ok(fairTrain && !fairTrain.includes('{unresolved}'));
const selfRev = renderCgSelfReview(cgPriya, 3);
assert.ok(selfRev && !selfRev.includes('{unresolved}'));
const measure = renderCgMeasure(cgPriya, 3, { targetName: 'Cassidy' });
assert.ok(measure && !measure.includes('{unresolved}'));
assert.equal(/\[MeasurementScene_/i.test(measure), false);

const recResult = renderRecordingTakeResult('perfect', 0, 250, recStudent, 3);
assert.ok(recResult && !recResult.includes('{unresolved}'));
assert.equal(/serviceable footage/i.test(recResult), false);
const weigh2 = renderContestWeighIn2(0, contestStudent, 12, 8, 330, 3);
assert.ok(weigh2 && !weigh2.includes('{unresolved}'));
assert.equal(/The eating is over. The judges call both competitors/i.test(weigh2), false);
const sumoAf = renderSumoAftermath(0, sumoStudent, 18, true, 340, 4);
assert.ok(sumoAf && !sumoAf.includes('{unresolved}'));
const sumoPay = renderSumoPayoff(0, sumoStudent, 18, 4);
assert.ok(sumoPay && !sumoPay.includes('{unresolved}'));
const hiveVisit = renderHiveVisit({
  id: 8, name: 'Maya', lbs: 280, startLbs: 130, evolvedForm: 'delivery_hive',
  relationship: 40, corruption: 1, fullness: 10, stomachCapacity: 120,
}, 3);
assert.ok(hiveVisit && !hiveVisit.includes('{unresolved}'));
assert.equal(/You bring tribute directly to the Central Nest/i.test(hiveVisit), false);
const hivePhoto = renderHivePhoto({
  id: 8, name: 'Maya', lbs: 280, startLbs: 130, evolvedForm: 'delivery_hive',
  relationship: 40, corruption: 1, fullness: 10, stomachCapacity: 120,
}, 3);
assert.ok(hivePhoto && !hivePhoto.includes('{unresolved}'));
assert.equal(/Maya documents the Hive: conquered rooms/i.test(hivePhoto), false);
assert.equal(/\[HiveStatePhoto/i.test(hivePhoto), false);

let sawSumoResult = false;
for (let i = 0; i < 40; i++) {
  const eventResult = renderEvolvedEventProse('LEGACY RESULT SHOULD NOT APPEAR', {
    id: 0, name: 'Brittany', lbs: 258, startLbs: 118, evolvedForm: 'sumo', relationship: 40, corruption: 1,
  }, 3, { formId: 'sumo', stageIdx: 0, phaseIdx: 0, preferResult: true, v2DepthChance: 0 });
  assert.ok(eventResult && !eventResult.includes('{unresolved}'));
  assert.equal(eventResult.includes('LEGACY RESULT SHOULD NOT APPEAR'), false, 'composed result should replace leftover log lines');
  if (/Dana|corner|clay|feeds the next number/i.test(eventResult)) sawSumoResult = true;
}
assert.ok(sawSumoResult, 'sumo result should surface form-keyed copy across pooled renders');

const eventEnding = renderEvolvedEventProse('LEGACY ENDING SHOULD NOT APPEAR', {
  id: 0, name: 'Brittany', lbs: 258, startLbs: 118, evolvedForm: 'sumo', relationship: 40, corruption: 1,
}, 3, { formId: 'sumo', stageIdx: 0, phaseIdx: 0, preferEnding: true, v2DepthChance: 0 });
assert.ok(eventEnding && !eventEnding.includes('{unresolved}'));
assert.equal(eventEnding.includes('LEGACY ENDING SHOULD NOT APPEAR'), false);

const cgPost = renderCgChatPriyaPost(cgPriya, 3, 'Driven');
assert.ok(cgPost && !cgPost.includes('{unresolved}'));
assert.equal(/Thigh column says/i.test(cgPost), false);
const cgRes = renderCgChatResident({
  id: 0, name: 'Brittany', lbs: 210, startLbs: 118, relationship: 20, corruption: 1,
  fullness: 10, stomachCapacity: 100,
}, 3, 'ahead');
assert.ok(cgRes && !cgRes.includes('{unresolved}'));
assert.equal(/Thigh column says you still have work/i.test(cgRes), false);
const cgFollow = renderCgChatFollowup(cgPriya, 3, 'Frenzied', true);
assert.ok(cgFollow && !cgFollow.includes('{unresolved}'));
const cgRa = renderCgChatRaReply(cgPriya, 3, 'encourage', { residentName: 'Cassidy', bodypart: 'thighs' });
assert.ok(cgRa && !cgRa.includes('{unresolved}'));
assert.equal(/blob-like body/i.test(cgRa), false);
const cgReact = renderCgMeasureReaction(cgPriya, 3, 'priya_larger', 'waist', { name: 'Cassidy' });
assert.ok(cgReact && !cgReact.includes('{unresolved}'));
assert.equal(/\[MeasureReaction_/i.test(cgReact), false);

const sessionArrive = renderSessionNpc('arrival', recStudent, 3, 2);
assert.ok(sessionArrive && !sessionArrive.includes('{unresolved}'));
assert.equal(/You were about to order, right\? I was already heading over/i.test(sessionArrive), false);
const sessionExtra = renderSessionNpc('extra', recStudent, 3, 4);
assert.ok(sessionExtra && !sessionExtra.includes('{unresolved}'));

const fairPhoto = renderFairPhoto(mj, 4, { collabKey: 'Brittany', stageIdx: 0 });
assert.ok(fairPhoto && !fairPhoto.includes('{unresolved}'));
assert.equal(/\[FT_/i.test(fairPhoto), false);
const fairBoost = renderFairBoost(mj, 4, { collabKey: 'Kylie', boostTier: 'High', stageIdx: 0 });
assert.ok(fairBoost && !fairBoost.includes('{unresolved}'));
assert.equal(/\[FBS_/i.test(fairBoost), false);

const wlGreet = renderWifeLessonTalkLine('LEGACY GREETING SHOULD NOT APPEAR', 'Wanda', 2, mj, 3, { slot: 'greeting', v2DepthChance: 0 });
assert.ok(wlGreet && !wlGreet.includes('{unresolved}'));
assert.equal(wlGreet.includes('LEGACY GREETING SHOULD NOT APPEAR'), false);
assert.ok(/Wanda|butter|bread|table|kitchen/i.test(wlGreet), `wl greeting should be composed, got: ${String(wlGreet).slice(0, 160)}`);

const collabPay = renderCollabPayoff(0, 8, 6, { id: 0, name: 'Brittany', lbs: 200 }, recStudent, 3);
assert.ok(collabPay && !collabPay.includes('{unresolved}'));
assert.equal(/pounds on Kylie/i.test(collabPay), false);

const recOne = renderRecordingOneMoreTake(0, recStudent, 3);
assert.ok(recOne && !recOne.includes('{unresolved}'));
assert.equal(/I'll eat even more for you this time/i.test(recOne), false, 'oneMore should not be leftover Kylie monolith');
assert.ok(/one more|again|encore|lights stay|nods/i.test(recOne), `oneMore should be composed, got: ${String(recOne).slice(0, 160)}`);

const recWrap = renderRecordingWrapEnding('perfect', 0, recStudent, 3);
assert.ok(recWrap && !recWrap.includes('{unresolved}'));
assert.equal(/looks noticeably fatter than when you arrived/i.test(recWrap), false, 'wrap should not be leftover RECORDING_WRAP_ENDINGS');

const destStudent = {
  id: 11, name: 'Destiny', lbs: 210, startLbs: 155, evolvedForm: 'eating_streamer',
  relationship: 20, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const sessionPay = renderSessionPayoff(destStudent, 3, 0, 'food_coma');
assert.ok(sessionPay && !sessionPay.includes('{unresolved}'));
assert.equal(/Session complete\./i.test(sessionPay), false, 'ranked payoff should not be SESSION_PAYOFF_TEXT');
assert.ok(/coma|chair|ranked|session|bags|game over|desk|receipt|Rae/i.test(sessionPay), `session payoff should be composed, got: ${String(sessionPay).slice(0, 160)}`);

const destSpend = renderDestinySpend(destStudent, 3);
assert.ok(destSpend && !destSpend.includes('{unresolved}'));
assert.equal(/Destiny blows her share on delivery apps/i.test(destSpend), false);

let sawHoney = false;
for (let i = 0; i < 40; i++) {
  const lessonBeat = renderWifeLessonBeat(1, { id: 'honey_butter', text: 'LEGACY LESSON SHOULD NOT APPEAR' }, mj, 3, { v2DepthChance: 0 });
  assert.ok(lessonBeat && !lessonBeat.includes('{unresolved}'));
  assert.equal(lessonBeat.includes('LEGACY LESSON SHOULD NOT APPEAR'), false, 'wl lesson should prefer composed pools');
  assert.equal(/Fat is what makes a home feel like home/i.test(lessonBeat), false);
  if (/Honey Butter|butter into the flour|gingham|yeast/i.test(lessonBeat)) sawHoney = true;
}
assert.ok(sawHoney, 'honey_butter lesson should surface recipe-keyed copy');

const daisy = {
  id: 3, name: 'Daisy', lbs: 190, startLbs: 125, evolvedForm: 'homeroom_queen',
  relationship: 30, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const hrIntro = renderHomeroomPool(homeroomConferencePoolKey('Kayla'), daisy, 3, {
  globals: { homeroomKey: 'Kayla' },
  v2DepthChance: 0,
});
assert.ok(hrIntro && !hrIntro.includes('{unresolved}'));
assert.equal(/Is this about hall standing/i.test(hrIntro), false, 'homeroom conference should not be leftover monolith');

const hrResult = renderHomeroomPool(homeroomConferencePoolKey('Kayla', 'tuesday'), daisy, 3, {
  globals: { homeroomKey: 'Kayla', homeroomChoice: 'tuesday' },
  v2DepthChance: 0,
});
assert.ok(hrResult && !hrResult.includes('{unresolved}'));
assert.equal(/She has categorized the recipe progression/i.test(hrResult), false);

const sophia = {
  id: 12, name: 'Sophia', lbs: 180, startLbs: 130, evolvedForm: 'pharmacist',
  relationship: 20, corruption: 1, fullness: 8, stomachCapacity: 110,
};
const pharmLine = renderPharmacistAcquire('shift_stock', sophia, 3);
assert.ok(pharmLine && !pharmLine.includes('{unresolved}'));
assert.equal(/Sophia logs the minimum/i.test(pharmLine), false, 'pharmacist acquire should not dump leftover flavor');

const intimacyLine = renderIntimacyChoice('her_weight', 'linens_nest', recStudent, 3, { v2DepthChance: 0 });
assert.ok(intimacyLine && !intimacyLine.includes('{unresolved}'));
assert.equal(/drags the big linens/i.test(intimacyLine), false, 'intimacy extras should prefer composed pools');
for (let i = 0; i < 16; i++) {
  const intimacyPhase = renderIntimacyPhase('her_weight', 0, recStudent, [], 2, 3, { v2DepthChance: 0 });
  assert.ok(intimacyPhase && !intimacyPhase.includes('{unresolved}'));
  assert.equal(/distributing mass until you feel all of her/i.test(intimacyPhase), false, 'intimacy phase should not dump leftover skeleton fragments');
  assert.equal(/The descent is unhurried/i.test(intimacyPhase), false);
}
const intimacyEnd = renderIntimacyEnding('her_weight', 0, recStudent, 3, { v2DepthChance: 0 });
assert.ok(intimacyEnd && !intimacyEnd.includes('{unresolved}'));

const cassidyCap = { id: 1, name: 'Cassidy', lbs: 168, startLbs: 125, relationship: 20, corruption: 0 };
const wardChat = renderResearcherChat(0, 0, [], cassidyCap, 4);
assert.ok(wardChat && !wardChat.includes('{unresolved}'));
assert.equal(/I've been following your floor sessions closely/i.test(wardChat), false, 'lane-captain chat should prefer composed pools');
const wardAck = renderResearcherChat(0, 1, ['acknowledge'], cassidyCap, 4);
assert.ok(wardAck && !wardAck.includes('{unresolved}'));
assert.equal(/I've been following your floor sessions closely/i.test(wardAck), false);
const thesisOk = renderResearcherThesis(true, 'green', cassidyCap, 4);
assert.ok(thesisOk && !thesisOk.includes('{unresolved}'));
assert.equal(/approves without reservation/i.test(thesisOk), false);
const thesisNo = renderResearcherThesis(false, 'red', cassidyCap, 4);
assert.ok(thesisNo && !thesisNo.includes('{unresolved}'));
assert.equal(/isn't a season plan and isn't a captain's journal/i.test(thesisNo), false);
const reviewLine = renderResearcherReview(['vore', 'metrics'], 12, cassidyCap, 4);
assert.ok(reviewLine && !reviewLine.includes('{unresolved}'));
assert.equal(/what you found — and what we found/i.test(reviewLine), false, 'final review should prefer composed pools');

const followupLine = renderEvolvedFollowup({
  id: 0, name: 'Brittany', lbs: 258, startLbs: 118, evolvedForm: 'sumo', relationship: 40, corruption: 1,
}, 3, 'kitchen_seconds');
assert.ok(followupLine && !followupLine.includes('{unresolved}'));
assert.equal(/She follows you to the floor kitchen and eats standing/i.test(followupLine), false);

const extras = extraFloorChoices({ snack_station: true, comfy_chairs: true, dinner_basic: true });
assert.equal(extras.length, 2, 'extra check-in choices cap at 2');
assert.ok(extras.some((c) => /kitchen/i.test(c.label)), 'kitchen walk is a live extra');
assert.ok(extras.some((c) => c.extraId === 'kitchen_walk'), 'kitchen extra carries extraId');

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
assert.equal(/energy drink sweats on the table/i.test(mayaText), false, 'floor scene should not dump leftover mood_stressed body');
assert.equal(/Ordinary campus hour/i.test(mayaText), false, 'floor scene should not dump leftover campusEvent.beat');
const campusBeat = renderCampusEventBeat(students[1], 2, { v2DepthChance: 0 });
assert.ok(campusBeat && !campusBeat.includes('{unresolved}'));
assert.equal(/Ordinary campus hour/i.test(campusBeat), false, 'campusEvent.beat should prefer composed observation');
assert.equal(/except nothing about her appetite/i.test(campusBeat), false);
const stressedFeed = renderFloorChoiceResult(stressed, 0, students[1], 2);
assert.ok(stressedFeed && !stressedFeed.includes('{unresolved}'));
assert.equal(/You set cookies on her knee/i.test(stressedFeed), false, 'floor choice should prefer composed result');
const hallScene = FLOOR_SCENES.find((s) => s.id === 'hall_group_project');
const hallText = renderFloorHallText(hallScene, 2);
assert.ok(hallText && !hallText.includes('{unresolved}'));
assert.ok(/meal-plan challenge/i.test(hallText), `hall composed should keep meal-plan challenge, got: ${hallText.slice(0, 180)}`);

const extraScene = {
  ...stressed,
  choices: [...stressed.choices, extras.find((c) => c.extraId === 'kitchen_walk')],
};
const extraFeed = renderFloorChoiceResult(extraScene, extraScene.choices.length - 1, students[1], 2);
assert.ok(extraFeed && !extraFeed.includes('{unresolved}'));
assert.equal(/Leftover heat does the talking/i.test(extraFeed), false, 'extra kitchen should prefer composed extra pool');
const dinnerArrive = renderDinnerArrive({ id: 'bistro' }, students[1], 2);
assert.ok(dinnerArrive && !dinnerArrive.includes('{unresolved}'));
assert.equal(/Cosy neighbourhood bistro/i.test(dinnerArrive), false, 'dinner arrive should not dump leftover venue.desc');
const blurb = renderStudentBlurb(students[0], 2);
assert.ok(blurb && !blurb.includes('{unresolved}'));
assert.equal(/Squad captain, tight ponytail, commands the room with a look/i.test(blurb), false, 'blurb should not dump leftover INIT_STUDENTS.desc');
const dishDesc = renderDinnerDishDesc({ id: 'soup_bread', label: 'Soup & Bread Board', desc: 'Thick potato soup with a full bread board.' }, students[1], 2);
assert.ok(dishDesc && !dishDesc.includes('{unresolved}'));
assert.equal(/Thick potato soup with a full bread board/i.test(dishDesc), false, 'dish desc should not dump leftover dish.desc');
const cultChoice = renderCultivatorChoice('milkshake', 'cream_base', 'Petra', 2);
assert.ok(cultChoice && !cultChoice.includes('{unresolved}'));
assert.equal(/Replace the milk with cream/i.test(cultChoice), false, 'cultivator choice should not dump leftover choice.desc');
const kitchenBatch = renderCultivatorChoice('cookies', 'floor_kitchen_batch', 'Petra', 2);
assert.ok(kitchenBatch && !kitchenBatch.includes('{unresolved}'));
assert.equal(/Leftovers from the floor kitchen/i.test(kitchenBatch), false, 'cultivator extra should not dump leftover extra desc');
const testerLook = renderTesterLook(6, 'Petra', 2);
assert.ok(testerLook && !testerLook.includes('{unresolved}'));
assert.equal(/Full figure, clothes fitting tightly, belly rounding forward when seated/i.test(testerLook), false, 'tester look should not dump leftover TESTER_APPEARANCE');
const itemLine = renderItemDesc({ id: 'protein_shake', label: 'Weight-Gain Shake' }, students[1], 2);
assert.ok(itemLine && !itemLine.includes('{unresolved}'));
assert.equal(/deceptively easy/i.test(itemLine), false, 'pantry item should not dump leftover item.desc');
const privVenue = renderPrivateVenueDesc({ id: 'office' }, students[1], 2);
assert.ok(privVenue && !privVenue.includes('{unresolved}'));
assert.equal(/The hall empties by evening/i.test(privVenue), false, 'private venue should not dump leftover PRIVATE_VENUES.desc');
const privIntro = renderPrivateVenueIntro({ id: 'office' }, students[1], 2);
assert.ok(privIntro && !privIntro.includes('{unresolved}'));
assert.equal(/It isn't a question/i.test(privIntro), false, 'private intro should not dump leftover venue.intro');
const blobIntro = renderPrivateBlobIntro({ ...students[0], lbs: 900 }, 2);
assert.ok(blobIntro && !blobIntro.includes('{unresolved}'));
assert.equal(/doesn't come to you anymore/i.test(blobIntro), false, 'blob intro should not dump leftover BLOB_PRIVATE_INTRO');
const questLine = renderQuestDesc({ id: 'tunnel_markings' }, students[17] || students[1], 2);
assert.ok(questLine && !questLine.includes('{unresolved}'));
assert.equal(/beneath the rec center/i.test(questLine), false, 'quest desc should not dump leftover ELARA_QUESTS.desc');
const capLine = renderArrivalCapstoneDesc('sumo', students[1], 2);
assert.ok(capLine && !capLine.includes('{unresolved}'));
assert.equal(/repeatable, always heavier/i.test(capLine), false, 'capstone should not dump leftover ARRIVAL_CAPSTONES.desc');
const intimacyPick = renderIntimacyPicker('her_weight', students[1], 2);
assert.ok(intimacyPick && !intimacyPick.includes('{unresolved}'));
assert.equal(/The weight is the point/i.test(intimacyPick), false, 'intimacy picker should not dump leftover INTIMACY_SCENES.desc');
const harvestLine = getPlannedVignette(6, 7, 'Petra');
assert.ok(harvestLine && !harvestLine.includes('{unresolved}'));
assert.equal(/You watch from the doorway/i.test(harvestLine), false, 'harvest should not dump leftover HARVEST_VIGNETTES');

const lilith = {
  id: 15, name: 'Lilith', lbs: 280, startLbs: 140, evolvedForm: 'feasting_beauty',
  relationship: 40, corruption: 1, fullness: 10, stomachCapacity: 140,
};
const huntDorm = renderHuntNode('dorm', lilith, 3, { v2DepthChance: 0 });
assert.ok(huntDorm && !huntDorm.includes('{unresolved}'));
assert.equal(/The narrow hallway outside your door/i.test(huntDorm), false, 'hunt arrive should not dump leftover HUNT_NODES.desc');
const huntTravel = renderHuntTravel('dorm', 'quad', lilith, 3);
assert.ok(huntTravel && !huntTravel.includes('{unresolved}'));
assert.equal(/You follow the main path out to the open quad/i.test(huntTravel), false, 'hunt travel should not dump leftover LILITH_TRAVEL');
const huntOpen = renderHuntDormOpen(lilith, 3);
assert.ok(huntOpen && !huntOpen.includes('{unresolved}'));
assert.equal(/The door clicks shut behind you/i.test(huntOpen), false, 'hunt dorm open should not dump leftover LILITH_DORM_TEXT');
const huntClue = renderHuntClueFeast(lilith, 3);
assert.ok(huntClue && !huntClue.includes('{unresolved}'));
assert.equal(/went to a party two weeks ago and never came back/i.test(huntClue), false, 'feast clue should prefer composed pools');
const huntInv = renderHuntClueInvestigate(lilith, 3);
assert.ok(huntInv && !huntInv.includes('{unresolved}'));
assert.equal(/a resident's offhand comment stays with you/i.test(huntInv), false);
const huntRes = renderHuntClueResult(lilith, 3);
assert.ok(huntRes && !huntRes.includes('{unresolved}'));
assert.equal(/You knock on room 312/i.test(huntRes), false);

const brit = {
  id: 0, name: 'Brittany', lbs: 210, startLbs: 118, archetype: 'cheerleader',
  relationship: 20, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const feederJ = renderFeederJournalEntry('cheerleader', 2, brit, 3);
assert.ok(feederJ && !feederJ.includes('{unresolved}'));
assert.equal(/I can't believe I actually agreed/i.test(feederJ), false, 'feeder journal should prefer composed pools');
const nadiaJ = renderNadiaJournalEntry('cheerleader', -1, 0, brit, 3);
assert.ok(nadiaJ && !nadiaJ.includes('{unresolved}'));
assert.equal(/I've officially started my private hall log/i.test(nadiaJ), false, 'nadia journal should prefer composed pools');

const holdLabel = INTIMACY_SCENES[0].phases[0].choices.find((c) => c.id === 'stay_still')?.label || '';
assert.equal(holdLabel.includes('—'), false, 'intimacy labels should not use em-dashes');
assert.equal(REMOVAL_HEARING.phases[1].choices[0].label.includes('—'), false, 'hearing labels should not use em-dashes');
const huntMan = renderHuntTarget('chad_w', lilith, 3, { v2DepthChance: 0 });
assert.ok(huntMan && !huntMan.includes('{unresolved}'));
assert.equal(/polo shirt half-tucked/i.test(huntMan), false, 'hunt target should not dump leftover man.desc');
assert.ok(renderHuntArrive('quad', lilith, 3));

for (let feastStage = 0; feastStage <= 9; feastStage++) {
  const feast = renderLilithFeast(lilith, feastStage, 12);
  assert.ok(feast && !feast.includes('{unresolved}'), `feast stage ${feastStage} should compose`);
  assert.equal(/dark eyes gleamed with predatory hunger/i.test(feast), false, `feast ${feastStage} should not dump leftover s0 opener`);
  assert.equal(/jaw unhinged/i.test(feast), false, `feast ${feastStage} should not dump leftover swallow gore`);
  assert.equal(/You've been thinking about this one for a while/i.test(feast), false);
}
const deliveryIntro = renderLilithDeliveryIntro(lilith, 12);
assert.ok(deliveryIntro && !deliveryIntro.includes('{unresolved}'));
assert.equal(/You've been thinking about this one for a while/i.test(deliveryIntro), false, 'delivery intro should not dump leftover opener');
assert.equal(/Not Mia specifically/i.test(deliveryIntro), false);
const digestLine = renderLilithDigest(lilith, 12, 'mid');
assert.ok(digestLine && !digestLine.includes('{unresolved}'));
assert.equal(/Not lazy-still/i.test(digestLine), false, 'digest should not dump leftover processing-still');
assert.ok(renderLilithDigestComplete(lilith, 12));
assert.ok(renderLilithDigestBlocked(lilith, 12));
const huntStatus = renderLilithHuntStatus(lilith, 3);
assert.ok(huntStatus && !huntStatus.includes('{unresolved}'));
assert.equal(/That's her favorite part/i.test(huntStatus), false, 'hunt status should not dump leftover panel copy');
assert.equal(/She doesn't go anywhere anymore/i.test(huntStatus), false);
const portrait = getBodyDesc(lilith, 3);
assert.ok(portrait && !portrait.includes('{unresolved}'));
assert.equal(/She looks at you the way she looks at food/i.test(portrait), false, 'appearance should not dump leftover body.face');
assert.equal(/the extra that was not here last week/i.test(portrait), false);
const richLine = getBodyDescRich(lilith, 3);
assert.ok(richLine && richLine.length > 20 && !richLine.includes('{unresolved}'));
assert.equal(/She looks at you the way she looks at food/i.test(richLine), false);
const outfitLine = getOutfit(lilith, 3);
assert.ok(outfitLine && !outfitLine.includes('{unresolved}'));
assert.equal(/Squad jacket hangs off her angular shoulders/i.test(outfitLine), false);
const boardNote = renderBoardReaction('vore', { id: 1, name: 'Cassidy', lbs: 210, startLbs: 138, archetype: 'swimmer' }, 6);
assert.ok(boardNote && !boardNote.includes('{unresolved}'));
assert.equal(/She requests a meeting through the athletics coordinator/i.test(boardNote), false, 'board reaction should not dump leftover BOARD_REACTIONS');
const homestead = {
  id: 6, name: 'Mary Jane', lbs: 280, startLbs: 140, evolvedForm: 'homestead_queen',
  relationship: 40, corruption: 1, fullness: 10, stomachCapacity: 140,
};
const homesteadAtt = getAttitude(homestead, 4);
assert.ok(homesteadAtt);
assert.equal(/flour on one arm, her enormous chest testing the bib/i.test(homesteadAtt), false);
const britAtt = getAttitude(brit, 3);
assert.ok(britAtt && britAtt !== '—');
assert.equal(/I keep seeing her face when I close my eyes/i.test(britAtt), false, 'attitude should not dump leftover devour trauma');
assert.equal(/Something in me broke the night it happened/i.test(britAtt), false);
const hearingOpen = renderHearingPhase('removal', 0, brit, 3);
assert.ok(hearingOpen && !hearingOpen.includes('{unresolved}'));
assert.equal(/abundance framed as concern/i.test(hearingOpen), false, 'hearing phase should not dump leftover aibHearing em-dash body');
const hearingEmerg = renderHearingPhase('emergency', 0, brit, 3);
assert.ok(hearingEmerg && !hearingEmerg.includes('{unresolved}'));
assert.equal(/no notice, no mercy/i.test(hearingEmerg), false);

const cassidyOrigin = { id: 1, name: 'Cassidy', lbs: 140, startLbs: 138, archetype: 'swimmer' };
const originVoice = renderOriginVoice(cassidyOrigin, 'madd_subject_zero', 1);
assert.ok(originVoice && !originVoice.includes('{unresolved}'));
assert.equal(/Methodology begins at home/i.test(originVoice), false, 'origin voice should not dump leftover ORIGIN_DECKS.voiceLine');
const dropLine = renderStageDrop(brit, 3);
assert.ok(dropLine && !dropLine.includes('{unresolved}'));
assert.equal(/Wait, I'm actually lighter/i.test(dropLine), false, 'stage drop should not dump leftover STAGE_DROP_REACTIONS');
const catalog = renderDeviceCatalogDesc('feeding_mask', brit, 3);
assert.ok(catalog && !catalog.includes('{unresolved}'));
assert.equal(/deliberate, mechanical stage advancement/i.test(catalog), false, 'device catalog should not dump leftover DEVICE_CATALOG_BLURBS');
assert.equal(catalog.includes('—'), false);
const homesteadEvent = renderEvolvedEventProse(
  'You knock. The door opens on warmth and cinnamon and Mary Jane',
  homestead,
  4,
  { preferComposed: true, formId: 'homestead_queen' },
);
assert.ok(homesteadEvent);
assert.equal(/flour on one arm, her enormous chest testing the bib/i.test(homesteadEvent), false);
assert.equal(canStartLilithHunt(null), true);
const digest = startLilithDigest(4);
assert.equal(canStartLilithHunt(digest), false, 'digest should block hunt');
assert.ok(digest.weeksLeft >= 2);
let digestCur = digest;
let digestDone = false;
for (let i = 0; i < 20; i++) {
  const t = tickLilithDigest(digestCur);
  digestCur = t.digest;
  if (t.complete) {
    digestDone = true;
    assert.ok(t.lbs > 0, 'digest complete should pay leftover lbs');
    break;
  }
}
assert.ok(digestDone);
assert.equal(canStartLilithHunt(digestCur), true);

const challengeStudent = {
  id: 9, name: 'Talia', lbs: 210, startLbs: 135, evolvedForm: 'campus_legend',
  relationship: 30, corruption: 1, fullness: 10, stomachCapacity: 120,
};
const miniPhase = renderMinigamePhase('campus_challenge', 0, challengeStudent, 3);
assert.ok(miniPhase && !miniPhase.includes('{unresolved}'));
assert.equal(/The menu towers in front of her/i.test(miniPhase), false, 'minigame phase should not dump leftover phase.text');
const miniLog = renderMinigameLog('speed', 'campus_challenge', challengeStudent, 3);
assert.ok(miniLog && !miniLog.includes('{unresolved}'));
assert.equal(/^She attacks the plate like a dare\.?$/i.test(miniLog), false, 'minigame log should not be leftover one-liner');
const miniWrap = renderMinigameWrap('perfect', 'campus_challenge', challengeStudent, 3);
assert.ok(miniWrap && !miniWrap.includes('{unresolved}'));

const compoundLine = renderPharmacistCompound('appetite_stimulant', sophia, 3);
assert.ok(compoundLine && !compoundLine.includes('{unresolved}'));
assert.equal(/Nothing too strong/i.test(compoundLine), false, 'compound flavor should not dump leftover COMPOUNDS.flavor');
const cultLine = renderPharmacistCult('circle_pickup', sophia, 3);
assert.ok(cultLine && !cultLine.includes('{unresolved}'));
assert.equal(/They arrive in twos and threes/i.test(cultLine), false, 'cult flavor should not dump leftover route.flavor');

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

const encLine = renderSessionEncourage('enc_praise', students[0], 2);
assert.ok(encLine && !encLine.includes('{unresolved}'));
assert.equal(/pleased and a little distracted from her fullness/i.test(encLine), false, 'encourage should not dump leftover enc.line');
const tapLine = renderSessionTapout(students[0], 2);
assert.ok(tapLine && !tapLine.includes('{unresolved}'));
assert.equal(/I'm tapping out, I'm literally tapping out/i.test(tapLine), false, 'tap-out should not dump leftover TAP_OUT_DIALOGUE');
const immobileLine = renderImmobileRedirect(students[0], 2);
assert.ok(immobileLine && !immobileLine.includes('{unresolved}'));
assert.equal(/hasn't left her room in weeks/i.test(immobileLine), false, 'immobile should not dump leftover IMMOBILE_REDIRECT');
const settleArr = renderSettleArrival(students[0], 2);
assert.ok(settleArr && !settleArr.includes('{unresolved}'));
assert.equal(/tend her vastness/i.test(settleArr), false, 'settle arrival should not dump leftover IMMOBILITY_ARRIVAL.desc');
const settleRefit = renderSettleRefit(students[0], 2);
assert.ok(settleRefit && !settleRefit.includes('{unresolved}'));
assert.equal(/She's grown into a new size\. Have something made to fit/i.test(settleRefit), false);
const settleComfort = renderSettleComfort('bed', students[0], 2);
assert.ok(settleComfort && !settleComfort.includes('{unresolved}'));
assert.equal(/She's outgrown the standard bed/i.test(settleComfort), false, 'comfort should not dump leftover COMFORT_MILESTONES');
const abilityCard = renderAbilityCard('valk_rollcall', students[0], 2);
assert.ok(abilityCard && !abilityCard.includes('{unresolved}'));
assert.equal(/Marks her chosen standard/i.test(abilityCard), false, 'ability card should not dump leftover valk_rollcall desc');
const hallSkill = renderHallSkillDesc('comfy_chairs', students[0], 2);
assert.ok(hallSkill && !hallSkill.includes('{unresolved}'));
assert.equal(/institutional plastic/i.test(hallSkill), false, 'hall skill should not dump leftover SKILL_TREE.desc');
const raSkill = renderRaSkillDesc('subtle_nudge', students[0], 2);
assert.ok(raSkill && !raSkill.includes('{unresolved}'));
assert.equal(/Slightly increases success when feeding past capacity/i.test(raSkill), false, 'RA skill should not dump leftover SKILLS.desc');
const evSkill = renderEvolvedSkillDesc('sumo_stance', students[0], 2);
assert.ok(evSkill && !evSkill.includes('{unresolved}'));
assert.equal(/Her bouts end 20% faster/i.test(evSkill), false, 'evolved skill should not dump leftover EVOLVED_SKILL_TREES.desc');
const paceLine = renderSessionPaceDesc('gentle', students[0], 2);
assert.ok(paceLine && !paceLine.includes('{unresolved}'));
assert.equal(/Easier refusal, less tap-out pressure/i.test(paceLine), false, 'pace should not dump leftover SESSION_PACE_ACTIONS.desc');
const hiveTask = renderHiveTaskDesc('food', students[1], 2);
assert.ok(hiveTask && !hiveTask.includes('{unresolved}'));
assert.equal(/calorie-dense tribute/i.test(hiveTask), false, 'hive task should not dump leftover HIVE_TASKS.desc');
const sumoMove = renderSumoMoveDesc('charge', students[0], 2);
assert.ok(sumoMove && !sumoMove.includes('{unresolved}'));
assert.equal(/Explosive forward hit/i.test(sumoMove), false, 'sumo move should not dump leftover SUMO_MOVES.desc');
const pharmAct = renderPharmacistActDesc(1, students[0], 2);
assert.ok(pharmAct && !pharmAct.includes('{unresolved}'));
assert.equal(/Sophia runs a quiet lab session/i.test(pharmAct), false, 'pharmacist act should not dump leftover PHARMACIST_ACTIVITIES.desc');
const pharmOpt = renderPharmacistOptDesc('shift_stock', students[0], 2);
assert.ok(pharmOpt && !pharmOpt.includes('{unresolved}'));
assert.equal(/Take only what the session budget allows/i.test(pharmOpt), false, 'pharmacist opt should not dump leftover ACQUISITION desc');
const pizzaAct = renderFloorActionDesc('pizza', students[0], 2);
assert.ok(pizzaAct && !pizzaAct.includes('{unresolved}'));
assert.equal(/An excessive whole-floor pizza order/i.test(pizzaAct), false, 'floor action should not dump leftover ACTIONS_HALL.desc');
const roomLine = renderRoomBlurb('kitchen', students[0], 2);
assert.ok(roomLine && !roomLine.includes('{unresolved}'));
assert.equal(/the kitchen that never really closes/i.test(roomLine), false, 'room blurb should not dump leftover FLOOR_ROOMS.blurb');
const traitLine = renderPhysicalTraitDesc('accelerated_settling', students[0], 2);
assert.ok(traitLine && !traitLine.includes('{unresolved}'));
assert.equal(/newly gained pounds settle without a fight/i.test(traitLine), false, 'trait should not dump leftover PHYSICAL_TRAITS.desc');

console.log('floor-blueprint: ok', {
  rooms: FLOOR_ROOMS.length,
  skills: SKILL_TREE.length,
  talkRel: depth.talkRelBonus,
  walkBeats: walk.beats.length,
  completeRooms: full.completedRooms,
  inventory: MECHANIC_DEPTH_INVENTORY.length,
});
