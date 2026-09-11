// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Last-wins UI catalog: pace, hive tasks, sumo moves, pharmacist acts/opts, floor actions.
import { registerPool, registerDimension, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { SESSION_PACE_ACTIONS } from '../../../gameData/feedingSession.js';
import { HIVE_TASKS } from '../../../gameData/mayaHive.js';
import { SUMO_MOVES } from '../../../gameData/miniGames.js';
import { PHARMACIST_ACTIVITIES } from '../../../gameData/pharmacist.js';
import { ACQUISITION_BY_STAGE, extraAcquisitionChoices } from '../../../gameData/pharmacistIngredients.js';
import { ACTIONS_SINGLE, ACTIONS_HALL } from '../../../gameData/floorEvents.js';
import { FLOOR_ROOMS } from '../../../gameData/floorBlueprint.js';
import { PHYSICAL_TRAITS } from '../../../gameData/skillTrees.js';

registerDimension('paceId', (ctx) => ctx.globals?.paceId ?? '');
registerDimension('hiveTaskId', (ctx) => ctx.globals?.hiveTaskId ?? '');
registerDimension('sumoMoveId', (ctx) => ctx.globals?.sumoMoveId ?? '');
registerDimension('pharmacistAct', (ctx) => ctx.globals?.pharmacistAct ?? '');
registerDimension('acquireOpt', (ctx) => ctx.globals?.acquireOpt ?? '');
registerDimension('floorActionId', (ctx) => ctx.globals?.floorActionId ?? '');
registerDimension('roomId', (ctx) => ctx.globals?.roomId ?? '');
registerDimension('traitId', (ctx) => ctx.globals?.traitId ?? '');

const PACE = {
  gentle: [
    'You keep the pace kind. She can still say no. Tap-out waits longer.',
    'Slow plates. She stays in the chair because the chair is still easy.',
    'Gentle. Fullness arrives without a shove.',
  ],
  steady: [
    'The usual rhythm. Bite, swallow, another plate when she is ready.',
    'Steady. Neither of you pretend this is a snack.',
    'Default pace. Appetite does the counting.',
  ],
  push: [
    'You lean in. Force-feed odds rise when she is already packed.',
    'Harder pace. She eats because you asked and because she can.',
    'Push. The extra of her has less room to argue.',
  ],
};

const HIVE = {
  food: [
    'Delivery loops. Snack caches. Tribute dense enough that Maya stays warm.',
    'Food first. The Nest eats, then it grows.',
    'Calorie runs. She is the reason the bags come back full.',
  ],
  supply: [
    'Blankets, wider chairs, lavender bulbs. Comfort as infrastructure.',
    'Supply runs. The Nest gets softer as the bodies do.',
    'Furniture that can hold her. Lights that make staying easy.',
  ],
  expansion: [
    'Soft pressure on the next room until it wants the Nest.',
    'Expansion. Adjacent doors learn her warmth.',
    'The Hive leans on a wall until the wall becomes a room.',
  ],
  maintenance: [
    'Keep the Nest fed and standing as deliveries multiply.',
    'Maintenance. Bodies grow. The rooms keep up.',
    'Laundry, heat, stock. The Nest stays a place you can live.',
  ],
  recruitment: [
    'Delivery people. Lonely floor-mates. Anyone already listening to hunger.',
    'Recruitment. Appetite as an invitation.',
    'She does not hunt. She waits. They arrive anyway.',
  ],
};

const SUMO = {
  charge: [
    'Forward hit. Huge push. If she braces or slips, you pay in balance.',
    'Tachi-ai. You spend the extra of you as a ram.',
    'Charge. Mass as a decision you cannot take back.',
  ],
  thrust: [
    'Belly and palms. Cheap, reliable, a step at a time.',
    'Thrust. You walk her with the extra instead of throwing it.',
    'Steady push. Ground comes in inches.',
  ],
  drop: [
    'Drop the extra forward. Heavier you are, harder she has to hold.',
    'Belly drop. Your signature. The floor hears it.',
    'You let weight do the talking. She has to catch all of it.',
  ],
  brace: [
    'Plant and root. Her push dies. Your balance comes back. No ground.',
    'Brace. You become the post she did not budget for.',
    'Hold. The extra of you is a wall.',
  ],
  sidestep: [
    'Slip aside. Brutal if she charges. Empty if she does not.',
    'Sidestep. Let her extra miss you.',
    'You are not where the hit lands. She is.',
  ],
  fill_ring: [
    'Blob only. You settle until the dohyo is you. She bounces out.',
    'Fill the ring. Belly and ass claim the clay.',
    'You stop competing and start occupying. She has nowhere left.',
  ],
};

const PHARM_ACT = {
  1: [
    'Quiet lab hour. Stage compounds unlock. Exposure ticks up a little.',
    'She brews. The first doses leave the bench.',
    'Synthesis. Soft chemistry with a paper trail that still looks clean.',
  ],
  2: [
    'Wellness branding. The resident body starts softer under the label.',
    'Campus trial. Samples that do what the flyer pretends they do not.',
    'A branded sitting. Appetite as a wellness outcome.',
  ],
  3: [
    'The Circle gets stronger doses. Floor gains accelerate.',
    'Supply night. Devotees leave heavier than they arrived.',
    'She feeds the inner route. The extra spreads on purpose.',
  ],
  4: [
    'Endgame brew. Personal extra. Regional extra. No small sitting.',
    'Ascension protocol. Mass as the point of the formula.',
    'The last synthesis. She is the proof and the distribution.',
  ],
};

const ACQUIRE = {
  shift_stock: [
    'Take the allotted stock. Paperwork stays boring.',
    'Budget only. No extra bottles. No extra eyes.',
    'The session tray. Corporate thinks that is enough.',
  ],
  pocket_precursors: [
    'Four extra precursors. Inventory might notice the gap.',
    'A pocket of stock. The log still almost balances.',
    'You leave with more than the shift sheet wanted.',
  ],
  falsify_log: [
    'Five reagents, two extracts. A log that learned to lie.',
    'Colleagues might miss the bottles. The formula will not.',
    'You rewrite a line. The bench gets heavier.',
  ],
  borrow_project: [
    'Borrowed project stock. High yield. High if security reads the badge.',
    'Four and four. Someone else signed for this tray.',
    'You wear another project\'s name for an hour.',
  ],
  wellness_shipment: [
    'Branding kits and extracts. Cover that looks like a trial.',
    'Wellness boxes. Appetite hiding in the pamphlet.',
    'Legitimate labels. Illegitimate portions.',
  ],
  divert_trial: [
    'Trial stock diverted. Precursors, reagents, branding. Audit risk.',
    'A campus trial that never quite reaches campus.',
    'You keep the samples. The flyer still went out.',
  ],
  campus_sampling: [
    'Residents get samples. You get ingredients. Everybody eats.',
    'Campus tasting. Branding and extracts come back with you.',
    'A table of "wellness." Plates empty. Stock fills.',
  ],
  influencer_collab: [
    'Soft PR. Reagents and branding. Exposure through a smile.',
    'A collab kit. The camera likes the label. You like the stock.',
    'Influencer hours. The extra is in the gift bag.',
  ],
  circle_pickup: [
    'Loyal users bring cash and empty bottles. Supply and extracts.',
    'Circle pickup. They already know which door.',
    'Devotees restock you. You restock them heavier.',
  ],
  dorm_routes: [
    'Wider campus routes. Supply and branding. More doors, more extra.',
    'Dorm drops. The Circle learns the floor plan.',
    'You walk bags down halls that used to be optional.',
  ],
  bulk_drop: [
    'Bulk crate. Precursors and supply. Visible, efficient.',
    'One drop. A lot of chemistry. A lot of extra later.',
    'The loading dock signed for catering. The bottles signed for something else.',
  ],
  loyalty_only: [
    'Inner Circle only. Lower eyes. Smaller yield. Still enough.',
    'Loyalty pickup. Reagents and supply, quiet.',
    'They come because they want to. You count bottles.',
  ],
  regional_hub: [
    'Regional hub. Supply, catalyst, branding. Everybody sees the van.',
    'A bigger door. A bigger sitting afterward.',
    'The Circle stops looking local.',
  ],
  ascension_batch: [
    'Catalyst and precursors. Personal transformation fuel.',
    'Ascension stock. She is brewing for a body, not a trial.',
    'Endgame reagents. The formula has a name now.',
  ],
  mass_sampling: [
    'Campus-wide samples. Supply and extracts. Saturation on purpose.',
    'Mass tasting. The floor eats. The stock refills you.',
    'Everybody gets a cup. You get the leftover chemistry.',
  ],
  quiet_stockpile: [
    'Quiet cache. Catalyst plus a little of everything. Lowest eyes.',
    'You hide the good bottles. The extra waits.',
    'Stockpile. No flyer. No tasting. Just the bench.',
  ],
  kitchen_extract: [
    'Kitchen extracts. Low eyes. The pantry already smells like a lab.',
    'Floor leftovers as carrier. She bottles the rest.',
    'The hall kitchen pays a quiet tax in flavor stock.',
  ],
  lounge_grant: [
    'Lounge grant. Precursors on a sensory-trial form.',
    'Housing signed a tasting. You signed a formula.',
    'Paperwork says aroma study. The bottles disagree.',
  ],
};

const ACTION = {
  restaurant: [
    'A proper dinner out. Best table near campus. Courses that do not quit.',
    'Take her to dinner. The menu is the evening.',
    'Restaurant night. She sits. You order. The extra arrives in courses.',
  ],
  pizza: [
    'Whole-floor pizza. Boxes stacked. Nobody counts slices out loud.',
    'Pizza night. The lounge becomes a table.',
    'An order so large Housing would call it a mistake. You call it Thursday.',
  ],
  potluck: [
    'Everyone brings a dish. Everyone is expected to try everything.',
    'Potluck. Variety as a feeding strategy.',
    'The table fills from twelve kitchens. She still finishes her share.',
  ],
  feast: [
    'Holiday spread. The long sitting. This one goes far.',
    'Floor feast. Courses with names and second plates without them.',
    'A holiday that is really an appetite.',
  ],
  group_dinner: [
    'Two residents, one table. Their bond fattens both.',
    'Group dinner. They watch each other eat and eat more for it.',
    'You book for three. The extra is for two.',
  ],
  refeast_ritual: [
    'Supernatural only. Clears hunger curses. Refeeds the ascended.',
    'Refeast. Scarcity loses a week.',
    'A ritual plate. The floor eats through the freeze.',
  ],
};

const ROOM = {
  elevator: [
    'The box already knows who is getting heavier.',
    'Doors that wait a beat longer than they used to.',
    'A short ride that keeps getting slower in the good way.',
  ],
  corridor: [
    'Night traffic, a scale in the alcove, quiet hours you enforce.',
    'The main hall. After hours it belongs to appetite.',
    'They pass the scale. Some of them stop.',
  ],
  stairs: [
    'Two flights. They take longer than they used to.',
    'The stairwell. A pause on the landing is becoming a habit.',
    'Steps that used to be nothing. Now they are a sit-down after.',
  ],
  ra_desk: [
    'Paperwork, cover stories, extra hours you never log.',
    'The desk. Admin sees a schedule. You see appetite time.',
    'RA hours that somehow always include a plate.',
  ],
  lounge: [
    'Common room. Chairs, lamps, climate. The place they stop leaving.',
    'The lounge holds them. Staying is the upgrade.',
    'Soft light. Soft seating. They stay.',
  ],
  kitchen: [
    'Snack station, pantry, calories as a standing invitation.',
    'The floor kitchen. Someone is always eating in here.',
    'A kitchen you built so it would stay open.',
  ],
  dining: [
    'Venue book, reserved tables, the long meal as hall programming.',
    'Dining nook. Dinner is how the floor spends an evening.',
    'A table that knows their orders before they sit.',
  ],
  pantry: [
    'Bulk stores. Housing wrote granola. The crates disagree.',
    'The pantry. Density in cardboard.',
    'Stock that refills faster than anyone admits they emptied it.',
  ],
  laundry: [
    'Machines that take a bigger load. Sheets that still cover her.',
    'Laundry. Elastic, oversized, ready for the next size.',
    'The room that quietly admits she is growing.',
  ],
  social: [
    'Gifts, birthdays, the inner circle consolidating over leftovers.',
    'Social nook. Rapport with a plate in the middle.',
    'They sit close. The extra of them makes that easier.',
  ],
  psych: [
    'Where you watch how they eat when they think the room is just a room.',
    'Observation alcove. Appetite as data you already knew.',
    'You map moods to second helpings. The map is getting dense.',
  ],
  echo: [
    'Captured weigh-ins. Bells that prime appetite down the hall.',
    'Echo gallery. The number lives on the wall.',
    'They hear the bell and think of food. You hung the bell for that.',
  ],
  dream: [
    'Soft light. Impossible portions. Hunger that walks in sleep.',
    'Dream chamber. Appetite that does not clock out.',
    'They wake hungrier. You planned for that.',
  ],
  storage: [
    'Locked cage. Devices rest here between uses and keep humming.',
    'Storage. The bay that does not look like a bay on the tour.',
    'Hardware for bodies that have outgrown ordinary tools.',
  ],
  media: [
    'Ring light, spare batteries, a couch that films well.',
    'Media nook. Content as an excuse to eat on camera.',
    'The couch knows her angles. So does the extra of her.',
  ],
  suite: [
    'Your door. Private sessions run long in here.',
    'RA suite. The evening that does not go back to the lounge.',
    'A room that holds a sitting and then another sitting.',
  ],
  prestige: [
    'Endgame cover. The floor as a thing with its own gravity.',
    'Institution wing. Housing stops asking certain questions.',
    'The arrangement has a hallway now.',
  ],
  resident: [
    'Their doors. After-hours rounds always pass here last.',
    'Resident wing. Night stops. Warm extra behind the wood.',
    'You walk this last. Someone is always still awake and hungry.',
  ],
};

const TRAIT = {
  accelerated_settling: [
    'Early pounds stick. Newly gained extra settles without a fight.',
    'The first sizes stay. Her body keeps the receipt.',
    'Soft start that does not rebound.',
  ],
  hungry_awakening: [
    'Since the first push past capacity, appetite never quite closed.',
    'She woke up hungrier and stayed that way.',
    'The first overfull night taught her a new baseline.',
  ],
  living_mattress: [
    'She is famous for being comfortable to rest against. People find reasons.',
    'Soft enough that company lingers. She lets them.',
    'A body people sit beside on purpose.',
  ],
  endless_growth: [
    'She keeps expanding even between feedings. Slow. Certain.',
    'Passive extra. The week does the work.',
    'Her body does not wait for a plate. It still wants one.',
  ],
  pleasure_from_growth: [
    'Gaining feels good. Every new pound arrives with a shiver.',
    'She likes the climb. You can see it land.',
    'Growth as a private pleasure she stopped hiding.',
  ],
  growth_addiction: [
    'The more she gains, the more she wants. The loop closed.',
    'Appetite chasing the last extra. Catching it. Wanting the next.',
    'She is hooked on getting heavier. She knows.',
  ],
  feeding_aura: [
    'The world wants to feed her. Bigger portions. Free samples. Generous strangers.',
    'People hand her food without a plan. She accepts.',
    'A faint pull. Plates find her.',
  ],
  living_landscape: [
    'At this scale she shapes the room. Campus accommodates her like weather.',
    'Furniture moves. Paths widen. She is the geography now.',
    'The floor plans around the extra of her.',
  ],
};

function three(arr) {
  const list = (arr || []).filter(Boolean);
  const pad = [
    'The extra of her answers the upgrade.',
    'The floor keeps the habit.',
    'She notices with her body first.',
  ];
  for (const line of pad) {
    if (list.length >= 3) break;
    if (!list.includes(line)) list.push(line);
  }
  return list.slice(0, 6);
}

function pool(key, texts) {
  registerPool(key, [{ when: {}, text: three(texts) }]);
}

export function applyUiBeatsOverhaul() {
  for (const p of SESSION_PACE_ACTIONS) pool(`session.pace.${p.id}`, PACE[p.id]);
  for (const t of HIVE_TASKS) pool(`hive.task.${t.id}`, HIVE[t.id]);
  for (const mv of SUMO_MOVES) pool(`sumo.move.${mv.id}`, SUMO[mv.id]);
  for (const [id, act] of Object.entries(PHARMACIST_ACTIVITIES)) {
    pool(`pharmacist.act.${id}`, PHARM_ACT[id] || PHARM_ACT[1]);
  }
  const seen = new Set();
  for (const stageOpts of Object.values(ACQUISITION_BY_STAGE)) {
    for (const opt of stageOpts) {
      if (seen.has(opt.id)) continue;
      seen.add(opt.id);
      pool(`pharmacist.opt.${opt.id}`, ACQUIRE[opt.id]);
    }
  }
  for (const opt of extraAcquisitionChoices({ snack_station: true, research_budget: true })) {
    if (seen.has(opt.id)) continue;
    seen.add(opt.id);
    pool(`pharmacist.opt.${opt.id}`, ACQUIRE[opt.id]);
  }
  for (const a of [...ACTIONS_SINGLE, ...ACTIONS_HALL]) {
    pool(`floor.action.${a.id}`, ACTION[a.id]);
  }
  for (const room of FLOOR_ROOMS) pool(`floor.room.${room.id}`, ROOM[room.id]);
  for (const trait of PHYSICAL_TRAITS) pool(`body.trait.${trait.id}`, TRAIT[trait.id]);
}

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

function dummy() {
  return { id: 0, name: 'She', first: 'She', lbs: 140, startLbs: 118 };
}

function ctxFor(student, week, globals) {
  return buildTextContext({
    subject: student || dummy(),
    week,
    globals,
  });
}

export function renderSessionPaceDesc(paceId, student, week = 1) {
  if (!paceId) return '';
  return prefer(`session.pace.${paceId}`, ctxFor(student, week, { featureId: 'session', paceId }));
}

export function renderHiveTaskDesc(taskId, student, week = 1) {
  if (!taskId) return '';
  return prefer(`hive.task.${taskId}`, ctxFor(student, week, { featureId: 'hive', hiveTaskId: taskId }));
}

export function renderSumoMoveDesc(moveId, student, week = 1) {
  if (!moveId) return '';
  return prefer(`sumo.move.${moveId}`, ctxFor(student, week, { featureId: 'sumo', sumoMoveId: moveId }));
}

export function renderPharmacistActDesc(stageId, student, week = 1) {
  if (stageId == null) return '';
  return prefer(`pharmacist.act.${stageId}`, ctxFor(student, week, { featureId: 'pharmacist', pharmacistAct: String(stageId) }));
}

export function renderPharmacistOptDesc(optId, student, week = 1) {
  if (!optId) return '';
  return prefer(`pharmacist.opt.${optId}`, ctxFor(student, week, { featureId: 'pharmacist', acquireOpt: optId }));
}

export function renderFloorActionDesc(actionId, student, week = 1) {
  if (!actionId) return '';
  return prefer(`floor.action.${actionId}`, ctxFor(student, week, { featureId: 'floor', floorActionId: actionId }));
}

export function renderRoomBlurb(roomId, student, week = 1) {
  if (!roomId) return '';
  return prefer(`floor.room.${roomId}`, ctxFor(student, week, { featureId: 'floor', roomId }));
}

export function renderPhysicalTraitDesc(traitId, student, week = 1) {
  if (!traitId) return '';
  return prefer(`body.trait.${traitId}`, ctxFor(student, week, { featureId: 'body', traitId }));
}
