// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// Last-wins leftover systems: wizard, lab, network, faculty, oversight, influence, embodiment, circuit, destiny, hive VP, evolution paths.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import {
  CUSTOM_BODY_OPTIONS, CUSTOM_STANCE_PRESETS, CUSTOM_VOICE_PRESETS, CUSTOM_WEIGHT_PRESETS,
} from '../../../gameData/customStudent/index.js';
import { INVENTOR_PATH_STAGES } from '../../../gameData/talia.js';
import { NETWORK_NODE_TYPES } from '../../../gameData/networkState.js';
import { FACULTY } from '../../../gameData/faculty.js';
import { AIB_COUNTERS } from '../../../gameData/opposition.js';
import { LAB_TECH_NODES } from '../../../gameData/labTechTree.js';
import { DESTINY_SPEND_ITEMS } from '../../../gameData/streaming.js';
import { CIRCUIT_BOARDS, allCircuitNodes } from '../../../gameData/inventionUpgrades.js';
import { EMBODIMENT_ACTIONS } from '../../../gameData/v2/residentEmbodiment.js';
import { FEAST_RITUALS } from '../../../gameData/v2/feastRituals.js';
import { RESONANCE_TIERS } from '../../../gameData/v2/cravingResonance.js';
import { CORRUPTION_TIERS } from '../../../gameData/corruption.js';
import { HIVE_VPS, HIVE_ROOM_BONUSES } from '../../../gameData/mayaHive.js';
import { EVOLUTION_OFFER } from '../../../gameData/evolvedForms.js';

const BODY = {
  straight: ['Even gain. The silhouette stays technical while the extra arrives.', 'Straight frame. Mass lands evenly. Clothes tell first.', 'No favorite zone. The extra fills her like a brief.'],
  pear: ['Hips and thighs lead. The extra finds the lower half first.', 'Pear. Seats notice before waistbands do.', 'She thickens downward. The walk changes before the belt does.'],
  apple: ['Belly-forward. Waistbands lose early.', 'Apple. The extra sits in front and stays.', 'Midsection first. She learns her lap by sitting.'],
  hourglass: ['Curves above and below. The extra keeps the hourglass honest.', 'Hourglass. Bust and hip share the climb.', 'Balanced extra. The waist still tries. It loses slowly.'],
  athletic: ['Trained frame softening into mass. Muscle keeps a memory.', 'Athletic. The extra lands on a body that used to work.', 'She used to be taut. She is becoming plush on purpose.'],
};

const WEIGHT = {
  slight: ['Longest runway. Early extra stays intimate.', 'Slight start. The first pounds are still a secret.', '112 as a beginning. Plenty of room to arrive.'],
  slim: ['Balanced start. Closest to the current chair.', 'Slim. The extra has somewhere to go.', '125. The chair still fits. For now.'],
  soft: ['Already softened. Wardrobe pressure arrives early.', 'Soft start. Clothes are already in the argument.', '145. The extra has a head start.'],
};

const STANCE = {
  opposed: ['High shame. Active resistance. Excuses under pressure.', 'Opposed. The body argues. She still says no.', 'She fights the extra. The extra is patient.'],
  reluctant: ['Mixed signals. Body ahead of words.', 'Reluctant. She notices the warmth and hates that she likes it.', 'A crack of want under the protest.'],
  secret: ['Low shame. High fixation. Private appetite.', 'Secret. She wants this where nobody can see the wanting.', 'Private extra. Public composure. For now.'],
  neutral: ['Unfussed. Data first. Comedy second.', 'Neutral. She logs the extra like a reading.', 'Engineer stance. Appetite as a dataset.'],
};

const VOICE = {
  clinical: ['Precise. Measured. Still pretending this is research.', 'Clinical voice. Margin of error. Logged intake.', 'She talks like a paper. The extra is the result.'],
  obsessed: ['Everything is a build, and the build is her.', 'Obsessed. Optimization as appetite.', 'Prototype language. She is the experiment.'],
  warm_corrupted: ['Still technical. Warmer. More openly hungry.', 'Warm-corrupted. The math is perfect and so is the extra.', 'She keeps the jargon. She dropped the distance.'],
};

const LAB = {
  1: ['Hands-on builds. Private workshop. Prototypes on residents.', 'Stage one lab. Devices you can hold. Extra you can measure.', 'Workshop hours. Solder, paste, a willing volunteer.'],
  2: ['Campus mesh. Deployment areas. Semi-autonomous calorie routing.', 'Stage two. Nodes on the map. Drip across the roster.', 'The lab leaves the bench and finds the floor.'],
  3: ['Factory phase. Nexus upgrades. Automated drip at scale.', 'Stage three. The mesh thinks. The extra arrives on schedule.', 'Full mastery. Proposals, automation, appetite as infrastructure.'],
};

const NODE = {
  relay: ['Routes a passive drip to the roster each week.', 'Relay. Calories as a trickle the floor forgets to notice.', 'A node that feeds while you are elsewhere.'],
  sensor: ['Raises integration. Better proposals.', 'Sensor. The mesh learns who is hungry.', 'Quality up. The extra gets smarter.'],
  pump: ['Higher automation output per level.', 'Pump. More drip. Same quiet.', 'The mesh pushes harder. Bodies keep it.'],
};

const FAC = {
  hartley: ['Precise. Tweedy. A desk drawer of contraband marzipan.', 'Classics. Banquets in the sources. Marzipan in the drawer.', 'Hartley. Public restraint. Private extra.'],
  brooks: ['Booming voice. Crushing handshake. Eats like a linebacker. Coaches like a poet.', 'Brooks. Juice and volume. The gym knows his plate.', 'Athletics staff. Appetite with a whistle.'],
  mori: ['Food science like a test kitchen. Soft voice. Hard measures.', 'Mori. Grams, heat, yield. She tastes everything.', 'Lab precision. Portions that are never accidents.'],
  abara: ['Reads rooms. Reads people. Currently reading you.', 'Abara. The campus transformation has her attention.', 'Student affairs. She already knows about the extra.'],
  delgado: ['Culinary program from a hotplate and a grudge. Feeds everyone in reach.', 'Delgado. Kitchen as empire. Extra as pedagogy.', 'She built the program. She feeds it too.'],
  lockwood: ['Knows everyone. Trades in pastry and gossip.', 'Lockwood. A cookie for a secret. Both land.', 'Res life. The extra is the currency.'],
};

const COUNTER = {
  feast_bribe: ['A lavish feast. AIB actions pause for a week.', 'Feed the Board. They forget the agenda until Monday.', 'Bribe as a sitting. Scrutiny takes a napkin.'],
  public_discredit: ['Yank one agenda type from the deck for good.', 'Public discredit. That card does not come back.', 'You burn a play. The Board has fewer.'],
  bureaucratic_capture: ['Convert a wavering member. Resolve 40 or less.', 'Capture. The file gets a friend inside.', 'A Board name that now eats with you.'],
  floor_pressure: ['Force the top agenda to misfire.', 'Floor pressure. The card fires and hits nothing.', 'The lounge is louder than the memo.'],
  evolved_student_op: ['An evolved resident delays the top agenda a week.', 'She is too much of a fact. The card waits.', 'Evolved cover. The Board postpones.'],
  machine_fatten: ['Growth chamber on a Board member. Extra. Resolve down. Scandal risk.', 'Machine fattening. A member leaves heavier.', 'Lab extra aimed at oversight.'],
  faculty_testimony: ['Staff ally cancels informant effects for two weeks.', 'Testimony. Informants go quiet.', 'A faculty friend. Two weeks of cover.'],
  lilith_hunt: ['Mark a Board member on Lilith\'s hunt map.', 'Lilith hunts oversight. Difficulty 4.', 'A name for the map. Soft. Consensual. Extra.'],
  compound_seduction: ['Sophia pulls staff-lounge intel. Scrutiny slows.', 'Compound seduction. The chemist charms the file.', 'Lounge intel. Softer questions.'],
  network_misdirect: ['Lab mesh buries scandal traces. Detection risk on fail.', 'Misdirect. The network eats the paper trail.', 'Traces go nowhere useful. Usually.'],
};

const TECH = {
  foundation: ['Salvage discipline. Tolerances. Thinking in systems.', 'Foundation. The habit of building extra on purpose.', 'Shop basics. The extra starts here.'],
  tech_bloating_belt: ['Waist harness. Relentless midsection extra.', 'Bloating belt. Comfort trades for inflation.', 'A belt that keeps filling her.'],
  tech_feeder_arm: ['Servo arm. Measured bites whether she is ready.', 'Feeder arm. The plate comes to her mouth.', 'Delivery on a schedule she did not set.'],
  tech_paste_printer: ['Dense paste. Maximum storage. Minimum bulk.', 'Paste printer. Calories as a cartridge.', 'She swallows the extra in efficient form.'],
  tech_serum_injector: ['One-shot serum. Rapid extra. Unpredictable spread.', 'Injector. A vial. A sitting afterward.', 'Serum lands. The body keeps it.'],
  tech_force_feeder: ['Force-feeding mask. Quotas past sealed lips.', 'Mask. Measured extra on a timer.', 'She finishes because the mask finishes.'],
  tech_obedience_belt: ['Waist harness. Compliance conditioning.', 'Obedience belt. Cues on-beat.', 'She stays. The belt prefers that.'],
  tech_hunger_engine: ['Directed hunger. Craving on command.', 'Hunger engine. Satiety loses the argument.', 'Want, aimed. She eats to it.'],
  tech_reinforced_legs: ['Braces and servos. Enormous bodies stay mobile.', 'Reinforced legs. The extra can still walk.', 'Support for the climb. Furniture waits later.'],
  tech_growth_chamber: ['Warm field. Rapid deposition. Unpredictable spread.', 'Growth chamber. Heat. Extra. A sitting after.', 'She leaves the chamber rounder.'],
  automation_gate: ['Interconnected rigs. The Automator unlocks this.', 'Automation gate. Devices start talking.', 'The shop becomes a system.'],
  tech_sleep_feeding: ['Overnight drip. She wakes with extra already packed.', 'Sleep feeding. Calories while she rests.', 'Morning scale. Evening she did not remember eating.'],
  tech_feeding_mask: ['Sealed straps. Tube quotas. Feeding on schedule.', 'Feeding mask. Extra past the lips on time.', 'The quota lands. She keeps it.'],
  tech_redistribution: ['Pressure nodes. Extra moves where Talia aims.', 'Redistribution. Softness with a map.', 'Fat as a medium she can steer.'],
  tech_remote_feeding: ['Drones and hidden pumps. Feed from anywhere on campus.', 'Remote feeding. The extra finds her off-bench.', 'Campus as a delivery grid.'],
  tech_liquid_infuser: ['Warm slurry on any feeder host. Extra stacks.', 'Liquid infuser. Gain on the attachment.', 'She drinks the extra. The host drinks with her.'],
  nexus_gate: ['Autonomous mesh. Networked Controller unlocks this.', 'Nexus gate. The lab thinks at campus scale.', 'Intelligence as drip.'],
  tech_predator_capture: ['Mask upgrade. Hunt and pin for feeding.', 'Predator capture. A target. A sitting.', 'She does not chase. The mask does.'],
  tech_furniture_rig: ['Restraints and tubes. A body as maintained cushion.', 'Furniture rig. Extra as upholstery.', 'She is the seat. The extra is the padding.'],
};

const DESTINY = {
  delivery_stash: ['Pre-stream snacks on tap. Session extra climbs.', 'Always-stocked stash. She eats before she goes live.', 'Delivery as a ritual. +gain on the sitting.'],
  mic_arm: ['Clear audio. Audience growth.', 'Mic arm. Chat hears every swallow.', 'Crystal sound. More eyes. More extra.'],
  rgb_rig: ['Flashy lights. Eyes and revenue.', 'RGB. The setup pulls. So does she.', 'A brighter stream. A heavier sitting.'],
  comfort_throne: ['Better stamina on long streams.', 'Comfort throne. She lasts. The extra lasts.', 'A chair that treats size as the point.'],
  brand_wardrobe: ['Sharper sponsor fit. Favor per stream.', 'Brand wardrobe. The contract likes the extra.', 'Clothes that frame the climb.'],
  sub_box: ['Sponsor surprise crate. Favor that stacks.', 'Sub box. A gift. Another sitting.', 'Crate extra. Chat paid for it.'],
  chat_feast: ['Treat chat. Audience spike on the next stream.', 'Chat feast. They watch her eat their money.', 'A consumed boost. A louder room.'],
};

const EMB = {
  raid_pantry: ['Hands move first. Cartons, leftovers, the thing in the back.', 'Pantry raid. She eats what the kitchen forgot.', 'The extra was already in the cupboard.'],
  secret_binge: ['Door locked. Phone face-down. She eats unwitnessed on purpose.', 'Secret binge. Appetite without an audience.', 'She decided not to be seen. She still ate.'],
  seduce_appetite: ['You whisper want into the polite places. Hunger becomes appetite.', 'Seduce her appetite. Embarrassment loses.', 'Want, named. She eats to the name.'],
  mirror_confession: ['She tells the glass the truth. She likes this. She wants more.', 'Mirror. Softness. A confession she keeps.', 'Friends never hear this. The extra does.'],
  text_ra: ['"I\'m hungry again." Sent before shame can edit.', 'A text. You feel the satisfaction hum.', 'She asked. You already knew.'],
  roommate_tempt: ['Order for two. Eat for one and a half. Leave evidence.', 'Roommate bait. Someone else will notice.', 'Shared bags. Unshared extra.'],
  auto_surrender: ['No negotiation. Delivery until the bags are gone.', 'Auto surrender. The app is the evening.', 'She opens the order and does not stop.'],
  public_eating: ['Quad. She eats without apology. People look. She does not stop.', 'Public extra. Witnesses included.', 'Campus as a table. She uses it.'],
  immobile_feast: ['She cannot stand. The world brings food. Every bite is extra.', 'Immobile feast. Delivery is the date.', 'The room is the restaurant. She is the table.'],
  midnight_snack: ['2 AM. Fridge light. Standing extra in the dark.', 'Midnight. A secret between her and the shelves.', 'She eats like the hour is cover.'],
  vending_splurge: ['Coins in. Armfuls. Eating while she walks.', 'Vending. Snack after snack. The hall is the plate.', 'Buttons. Wrappers. Extra on the move.'],
  dessert_first: ['Cake first. The main course still finishes.', 'Dessert as opener. She has room for both.', 'Sweet extra. Then the rest of the sitting.'],
  body_exploration: ['Hands on her own softness. She likes the new geography.', 'She maps the extra. The map is good news.', 'Self-touch as inventory. Appetite as pride.'],
  hunger_spiral: ['Want compounds. She eats because she is eating.', 'Hunger spiral. Stopping is the thing she does not want.', 'The extra asks for more extra. She answers.'],
};

const RITUAL = {
  communion_snack: ['A shared plate. Fingers brush. Nobody pretends.', 'Communion snack. Appetite as a handshake.', 'One plate. Several mouths. Extra for all.'],
  hall_banquet: ['Courses in sequence. Heat. Chewing. The room fills.', 'Hall banquet. The extra is the program.', 'A sitting with a guest list.'],
  sacred_gluttony: ['Candles. Chanting optional. Fullness mandatory.', 'Sacred gluttony. Influence as a feast.', 'Rite extra. She keeps the pounds.'],
  leviathan_vigil: ['Bedside feasts. Bodies too vast to travel. Food walks in.', 'Leviathan vigil. Attend her where she rests.', 'They come to her. Plates included.'],
};

const RES = {
  0: ['Campus still treats her like a student with a loud rumor.', 'Dormant. Appetite is still private.', 'Links later. Extra later.'],
  1: ['Cravings echo between linked residents.', 'Stirring. One extra tugs another.', 'A first link. Hunger has a neighbor.'],
  2: ['The hall hums with shared appetite.', 'Harmonic. The extra is contagious.', 'Two links. The lounge feels it.'],
  3: ['One resident eats. They all feel it.', 'Hive appetite. The floor is one sitting.', 'The web is the meal.'],
};

const COR = {
  0: ['Embarrassed. Uncertain. She does not want to understand the appetite yet.', 'Hesitant. The extra is happening. She looks away.', 'Shame first. Curiosity later.'],
  1: ['Acceptance is winning. She knows she should not enjoy this. She does anyway.', 'Conflicted. The extra feels good, and she hates how much she likes keeping it.', 'She likes it. She has not said so.'],
  2: ['Open. Eager. Proud. She asks now.', 'Broken in. Hesitation gone. Appetite has a voice.', 'She wants the extra and she says so.'],
};

const HIVEVP = {
  lilith: ['Absorb one devotee. Huge Maya extra. Food output rises with conquered rooms.', 'Lilith VP. Consumption as a hive policy.', 'A hunt that feeds the Nest.'],
  nadia: ['Expansion and recruitment bite deeper. Floor whispers add room progress.', 'Nadia VP. Suggestion as territory.', 'Whispers. Then a door that wants the Nest.'],
  kaylee: ['Healthier biomass. Maintenance stabilizes the Hive.', 'Kaylee VP. Nurture as infrastructure.', 'The Nest stays standing as bodies multiply.'],
  renee: ['Food and supply runs pay premium. Bags come back denser.', 'Renee VP. Tribute quality up.', 'Better caches. Warmer Maya.'],
  daisy: ['Dorm conversions complete cleaner. More members. Less mess.', 'Daisy VP. Soft takeover.', 'Rooms join. The Nest stays pretty.'],
};

const HIVEBONUS = {
  corner_cache: ['Hidden snack shelf. The Nest holds one more body.', 'Corner cache. Extra members fit because the snacks already do.', 'A shelf nobody admits exists. Capacity climbs with it.'],
  laundry_warmth: ['Warm laundry. Maintenance holds while this room stays ours.', 'Dryers keep the Nest standing. Conquered warmth pays.', 'The machines hum. Upkeep gets easier.'],
  delivery_pin: ['Drivers learn the exact door. Food arrives faster.', 'Delivery pin. Bags find the Nest without asking.', 'The door is a drop. Gathering pays denser.'],
  quiet_pull: ['The hallway feels easier to enter. Recruitment bites.', 'Quiet pull. A room that wants company.', 'People walk in. They stay as members.'],
  lavender_lamps: ['Lavender light. Floor pressure costs less resonance.', 'Lamps that make the Nest cheaper to push.', 'Soft light. Pressure spends less.'],
  reinforced_nook: ['Converted furniture. Two more bodies fit.', 'A nook rebuilt for mass. Capacity up.', 'The furniture was a bed. Now it is seating for extra.'],
};

const EVO = {
  sumo: ['Channel the athletic drive into the ring. Crowd included.', 'Sumo path. Weight is force. She intends to have more.', 'The dohyo waits. So does the extra.'],
  eating_competitor: ['Timers, records, a sport built for this body.', 'The circuit. Competitive extra. Legitimate cover.', 'She eats on a clock. The clock loses.'],
  feedee_creator: ['A content brand built around exactly what is happening to her.', 'Feedee channel. Camera. Extra. Chat.', 'She makes the climb the format.'],
  body_positive_creator: ['Mainstream crossover. Brand deals. A cultural argument she can win.', 'Body-positive platform. Cover as a TED talk.', 'The extra becomes the thesis.'],
  eating_captain: ['Rebrand the squad around competitive eating. Glory included.', 'Eating captain. Tournament extra.', 'The team trains by finishing plates.'],
  big_squad_captain: ['Change the culture from the top. No more weigh-ins. A new power.', 'Body-positive captain. Policy extra.', 'The chapter eats as identity.'],
  community_researcher: ['Training tables. Team dinners. Case studies. The plan changes the captain.', 'Lane captain. Document the extra. Live it.', 'Season plan as a feeding program.'],
  ranked_feedee: ['Sessions optimized. Focus bar, food queue, a driver who knows the schedule.', 'Ranked feedee. The game never stops. Neither does the eating.', 'Queue extra. Rank extra. Same sitting.'],
  eating_streamer: ['Camera on. Appetite as content. Sponsors. Chat. A bar that never lets her coast.', 'Eating streamer. The stream ends when she does.', 'Live extra. Paid extra. Visible extra.'],
  chapter_hostess: ['Wednesday feasts formalized. Menu, guest list, atmosphere. The chapter transforms around her table.', 'Hostess path. The table is the chapter.', 'She sets the plates. They stay.'],
  competitive_gainer: ['Corkboard as scoreboard. Every measurement a data point. She intends to exceed the floor.', 'Competitive gainer. Extra as a ranking.', 'Priya wants the biggest number. She will take it.'],
  artisan_gallery: ['Shoot abundance. Mount exhibitions. Living bodies beside their timelines.', 'Artisan gallery. Extra as archive.', 'She fattens, she shoots, she pins.'],
  home_nest: ['Warm, self-contained. Delivery. Refined preferences. Outside optional.', 'Home nest. The room is the world.', 'She stopped going out. Food comes. So do you.'],
  delivery_hive: ['Central Nest. Recruits, conquered rooms, Vice Queens. The building turns toward Maya.', 'Delivery hive. Territory as appetite.', 'Lavender extra. The floor joins.'],
  salon_appetit: ['French soirées that escalate. Guests, menus, indulgence. La Grande Soirée waits.', 'Salon path. Extra with etiquette.', 'She fills the room. Then the plates. Then herself.'],
  homeroom_queen: ['Tuesday sessions formalized. Bake for the floor. Bake for the moms. Grow the tradition.', 'Apprentice path. Six named eaters. A success she will not call success.', 'Tuesdays. Butter. Extra that looks like care.'],
  wife_lessons: ['Teach neighborhood women softness, warmth, a real home. They come hungry. They leave with recipes.', 'Wife lessons. Daughters who grow whether they meant to.', 'A table of women. Extra as philosophy.'],
  homestead_queen: ['Cooking and appetite together. Homestead warmth. You at the center.', 'Homestead path. Cast iron extra.', 'She feeds. She is fed. The house fills.'],
  state_fair_queen: ['County fairs. State championships. A rival from the next county. A louder crowd every weigh-in.', 'Fair path. Scale extra. Darcy included.', 'She takes the eating on the road.'],
  psych_researcher: ['Pick a focus resident. Feeder or feedee. Study both sides with trial rigour.', 'Hall log path. The data is her. The data is them.', 'Clinical extra. Personal extra. Same notebook.'],
  cultivator: ['Recruit a taste tester. Constructed recipes. Grow her through stages. Harvest when the yield is right.', 'Cultivator path. Three cycles. Precise. Personal.', 'Taste sessions. Quality control she also eats.'],
  pharmacist: ['Appetite stimulants, pleasure compounds, a slow descent from lab chemist to campus architect.', 'Pharmacist path. Extra in a bottle.', 'Sophia brews. The floor softens.'],
  machine_goddess: ['Devices that bloat, feed, inject, reshape. Workshop extra until she is the campus inventor.', 'Machine goddess. External machines. Internal extra.', 'Talia builds. Bodies keep the output.'],
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

export function applySystemsOverhaul() {
  for (const o of CUSTOM_BODY_OPTIONS) pool(`custom.body.${o.id}`, BODY[o.id]);
  for (const o of CUSTOM_WEIGHT_PRESETS) pool(`custom.weight.${o.id}`, WEIGHT[o.id]);
  for (const [id] of Object.entries(CUSTOM_STANCE_PRESETS)) pool(`custom.stance.${id}`, STANCE[id]);
  for (const [id] of Object.entries(CUSTOM_VOICE_PRESETS)) pool(`custom.voice.${id}`, VOICE[id]);
  for (const s of INVENTOR_PATH_STAGES) pool(`lab.stage.${s.id}`, LAB[s.id]);
  for (const t of NETWORK_NODE_TYPES) pool(`network.node.${t.id}`, NODE[t.id]);
  for (const t of FACULTY) pool(`faculty.card.${t.id}`, FAC[t.id]);
  for (const c of AIB_COUNTERS) pool(`oversight.counter.${c.id}`, COUNTER[c.id]);
  for (const n of LAB_TECH_NODES) pool(`lab.tech.${n.id}`, TECH[n.id]);
  for (const i of DESTINY_SPEND_ITEMS) pool(`destiny.item.${i.id}`, DESTINY[i.id]);
  for (const a of EMBODIMENT_ACTIONS) pool(`embody.act.${a.id}`, EMB[a.id]);
  for (const r of FEAST_RITUALS) pool(`ritual.card.${r.id}`, RITUAL[r.id]);
  for (const t of RESONANCE_TIERS) pool(`resonance.tier.${t.id}`, RES[t.id]);
  for (const t of CORRUPTION_TIERS) pool(`psyche.tier.${t.id}`, COR[t.id]);
  for (const [id] of Object.entries(HIVE_VPS)) pool(`hive.vp.${id}`, HIVEVP[id]);
  for (const b of HIVE_ROOM_BONUSES) pool(`hive.room.${b.id}`, HIVEBONUS[b.id]);
  const seen = new Set();
  for (const offer of Object.values(EVOLUTION_OFFER)) {
    for (const id of Object.keys(offer.paths || {})) {
      if (seen.has(id)) continue;
      seen.add(id);
      pool(`evo.path.${id}`, EVO[id]);
    }
  }
  for (const boardId of Object.keys(CIRCUIT_BOARDS)) {
    for (const node of allCircuitNodes(boardId)) {
      pool(`circuit.node.${node.id}`, [
        `${node.label}. The board keeps the extra.`,
        `${node.label} sits on the circuit. Appetite follows the current.`,
        `Installed ${node.id.replace(/_/g, ' ')}. The device remembers.`,
      ]);
    }
  }
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

export function renderCustomBodyDesc(id, student, week = 1) {
  if (!id) return '';
  return prefer(`custom.body.${id}`, ctxFor(student, week, { featureId: 'custom', customId: id }));
}

export function renderCustomWeightDesc(id, student, week = 1) {
  if (!id) return '';
  return prefer(`custom.weight.${id}`, ctxFor(student, week, { featureId: 'custom', customId: id }));
}

export function renderCustomStanceDesc(id, student, week = 1) {
  if (!id) return '';
  return prefer(`custom.stance.${id}`, ctxFor(student, week, { featureId: 'custom', customId: id }));
}

export function renderCustomVoiceDesc(id, student, week = 1) {
  if (!id) return '';
  return prefer(`custom.voice.${id}`, ctxFor(student, week, { featureId: 'custom', customId: id }));
}

export function renderLabStageDesc(stageId, student, week = 1) {
  if (stageId == null) return '';
  return prefer(`lab.stage.${stageId}`, ctxFor(student, week, { featureId: 'lab', labStage: String(stageId) }));
}

export function renderNetworkNodeDesc(typeId, student, week = 1) {
  if (!typeId) return '';
  return prefer(`network.node.${typeId}`, ctxFor(student, week, { featureId: 'network', nodeType: typeId }));
}

export function renderFacultyDesc(facultyId, student, week = 1) {
  if (!facultyId) return '';
  return prefer(`faculty.card.${facultyId}`, ctxFor(student, week, { featureId: 'faculty', facultyId }));
}

export function renderOversightCounterDesc(counterId, student, week = 1) {
  if (!counterId) return '';
  return prefer(`oversight.counter.${counterId}`, ctxFor(student, week, { featureId: 'oversight', counterId }));
}

export function renderLabTechDesc(nodeId, student, week = 1) {
  if (!nodeId) return '';
  return prefer(`lab.tech.${nodeId}`, ctxFor(student, week, { featureId: 'lab', techId: nodeId }));
}

export function renderDestinyItemDesc(itemId, student, week = 1) {
  if (!itemId) return '';
  return prefer(`destiny.item.${itemId}`, ctxFor(student, week, { featureId: 'destiny', itemId }));
}

export function renderEmbodimentActDesc(actId, student, week = 1) {
  if (!actId) return '';
  return prefer(`embody.act.${actId}`, ctxFor(student, week, { featureId: 'embody', actId }));
}

export function renderRitualCardDesc(ritualId, student, week = 1) {
  if (!ritualId) return '';
  return prefer(`ritual.card.${ritualId}`, ctxFor(student, week, { featureId: 'ritual', ritualId }));
}

export function renderResonanceTierDesc(tierId, student, week = 1) {
  if (tierId == null) return '';
  return prefer(`resonance.tier.${tierId}`, ctxFor(student, week, { featureId: 'resonance', resTier: String(tierId) }));
}

export function renderPsycheTierDesc(tierId, student, week = 1) {
  if (tierId == null) return '';
  return prefer(`psyche.tier.${tierId}`, ctxFor(student, week, { featureId: 'psyche', corTier: String(tierId) }));
}

export function renderHiveVpPassive(vpId, student, week = 1) {
  if (!vpId) return '';
  return prefer(`hive.vp.${vpId}`, ctxFor(student, week, { featureId: 'hive', hiveVp: vpId }));
}

export function renderHiveRoomBonus(bonusId, student, week = 1) {
  if (!bonusId) return '';
  return prefer(`hive.room.${bonusId}`, ctxFor(student, week, { featureId: 'hive', hiveBonus: bonusId }));
}

export function renderEvolutionPathDesc(pathId, student, week = 1) {
  if (!pathId) return '';
  return prefer(`evo.path.${pathId}`, ctxFor(student, week, { featureId: 'evolved', evoPath: pathId }));
}

export function renderCircuitNodeDesc(nodeId, student, week = 1) {
  if (!nodeId) return '';
  return prefer(`circuit.node.${nodeId}`, ctxFor(student, week, { featureId: 'lab', circuitNode: nodeId }));
}
