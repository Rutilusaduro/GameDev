// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile
// Last-wins skill cards: hall lounge, RA trees, evolved paths.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { SKILL_TREE, EVOLVED_SKILL_TREES } from '../../../gameData/skills.js';
import { SKILLS } from '../../../gameData/skillTrees.js';

const CAT = {
  environment: [
    'The room gets softer. Bodies stay longer.',
    'Furniture that treats size as the point.',
  ],
  feeding: [
    'Food appears. Appetite follows.',
    'The kitchen stays stocked. So do they.',
  ],
  efficiency: [
    'The schedule breathes. You fill the extra hours.',
    'Admin work shrinks. Appetite time grows.',
  ],
  social: [
    'Rapport as a floor habit.',
    'They eat together. They stay together.',
  ],
  psychology: [
    'The frame shifts. Eating becomes the story they tell themselves.',
    'Language first. Bodies after.',
  ],
  prestige: [
    'The floor becomes a legend they live inside.',
    'Prestige as a feeding license.',
  ],
};

const HALL = {
  comfy_chairs: 'Padded chairs. They sit down and forget to stand.',
  snack_station: 'Snacks that refill before anyone admits they emptied them.',
  ap_notebook: 'Shift planning that leaves hours you can fill with plates.',
  dinner_basic: 'Restaurant ties. Dinner as hall programming.',
  beverage_bar: 'Hot drinks. They arrive early and stay for the cup.',
  ambient_aroma: 'A quiet oven. Smell primes appetite before food arrives.',
  artisan_bakery: 'Morning bakery drops. Generous by design.',
  late_night_access: 'Lounge after hours. Snack station, thoughts, no curfew.',
  personal_gifts: 'Small gifts that prove you were listening to her tastes.',
  body_awareness: 'You track when they eat. The data gets used.',
  comfort_framing: 'Eating named as self-care until they keep the name.',
  wide_desks: 'Desks with room. Papers, elbows, belly, all of it.',
  catering_contact: 'A caterer on speed dial. Floor feeds get serious.',
  double_ap: 'Extended desk hours. More AP. More sittings.',
  dinner_casual: 'Brunch scene. Long tables, late plates.',
  dinner_upscale: 'Fine dining book. Courses that do not quit.',
  relationship_class: 'Personal investment. Rapport that sticks.',
  mood_lighting: 'Lamps that make staying feel like the plan.',
  climate_control: 'The room holds her heat. She holds the chair.',
  comfort_archives: 'Logged favorites. You already know what she will finish.',
  dessert_rotation: 'A dessert that changes. Appetite that does not.',
  appetite_study: 'You map hunger to hour. The map is getting dense.',
  behavioral_mapping: 'Moods, rooms, second helpings. Filed.',
  task_batching: 'Busywork collapsed. Hours appear for feeding.',
  reinforced_seating: 'Furniture rated for the extra. They notice by sitting.',
  private_kitchen: 'A kitchen that is yours. Sessions start here.',
  research_budget: 'A line item that buys chemistry, cover, and snacks.',
  dinner_private: 'Private dining. The table is the evening.',
  group_dynamics: 'They watch each other eat. Both get heavier for it.',
  ritual_kitchen: 'Kitchen as rite. Plates with intention.',
  embodiment_chamber: 'A room for being in the body. Appetite follows.',
  resonance_bells: 'Bells that prime hunger down the hall.',
  echo_gallery: 'Weigh-ins on the wall. The number lives in public.',
  dream_chamber: 'Sleep that wakes hungrier. You planned for that.',
  blackout_curtains: 'Dark enough to linger. Intimacy likes the dark.',
  dietary_profiling: 'Her tastes, written down, used.',
  luxury_pantry: 'Density in cardboard. The pantry never looks empty.',
  admin_buffer: 'Paper that absorbs questions. You keep the hours.',
  resistance_calibration: 'You know when she will take one more.',
  narrative_reshaping: 'The story of her size, rewritten kindly, kept.',
  special_occasions: 'Birthdays as feeding licenses.',
  institutional_cover: 'Housing sees programming. You see cover.',
  dedicated_suite: 'A suite that holds her. Stage extra lands easier.',
  full_catering: 'Full service. The feast arrives dressed.',
  ap_mastery: 'Peak hours. The week has more sittings in it.',
  dinner_residence: 'Home hospitality. Your table, her extra.',
  dinner_accessible: 'A dining suite built for the size she is now.',
  luxury_quarters: 'Quarters that treat overflow as design.',
  signature_dish: 'One dish that is hers. She finishes it as ritual.',
  midnight_ritual: 'A late kitchen tick. The floor eats in the dark.',
  subliminal_priming: 'Cues in the room. Appetite answers without a speech.',
  trust_architecture: 'Trust built so the next plate is easy.',
  inner_circle_mastery: 'The inner circle eats as a unit.',
  deep_cover: 'Questions die in paperwork.',
  full_environment: 'The lounge as a finished habitat.',
  unlimited_ap: 'Total dedication. The week is appetite time.',
  grand_banquet_protocol: 'Banquet rules. The floor feast goes far.',
  total_influence: 'The frame is yours. They live inside it.',
  social_empire: 'The floor\'s social life has a plate in the middle.',
  legendary_host: 'You host. They stay. The extra is the reputation.',
  the_arrangement: 'An understanding with the building. Appetite is policy.',
  master_feeder: 'Private sessions run long. You know why.',
  devotion_engine: 'Devotion that shows up as appetite.',
  the_institution: 'The floor as an institution with gravity.',
  floor_scale: 'A scale in the alcove. Some of them stop.',
  quiet_hours: 'Quiet hours you enforce. After hours you do not.',
  laundry_refit: 'Machines and elastic that admit she is growing.',
  oversized_linens: 'Sheets that still cover her.',
  supply_cage: 'Bulk behind a lock. Housing wrote granola.',
  device_bay: 'Hardware humming between uses.',
  media_nook: 'A couch that films well. She eats on it.',
};

const RA = {
  subtle_nudge: 'A small push past capacity that lands more often.',
  quiet_suggestion: 'Talk options that suggest instead of ask.',
  echoed_will: 'When the push lands, she doubles it with her own hand.',
  forceful_push: 'Extreme asks succeed more. She goes further.',
  heavy_hand: 'After capacity, the next bite is already hers.',
  eroded_will: 'Resistance thins across the floor.',
  break_resistance: 'Once a week, a no becomes a yes.',
  dominant_will: 'Command topics in talk. She takes the order.',
  mesmerizing_aura: 'One resident, one week, resistance on the floor.',
  efficient_digestion: 'More of what she eats stays as extra.',
  expanded_capacity: 'The tank is bigger. So is the sitting.',
  hungry_whispers: 'Hunger talks to her. She listens.',
  lingering_fullness: 'Fullness lasts. The next meal starts higher.',
  appetite_boost: 'Baseline hunger climbs and stays.',
  soft_start: 'Early extra sticks without a fight.',
  accelerated_growth: 'The climb steepens. Weeks show it.',
  stomach_expansion: 'Capacity training. The next plate has room.',
  gluttons_instinct: 'She finds the extra without being pointed.',
  weight_retention: 'Pounds stay. Rebound loses.',
  force_of_habit: 'Eating past full becomes the habit.',
  heavy_settling: 'New extra settles fast and looks like it belongs.',
  metabolic_shift: 'Her body keeps more. The math favors you.',
  limitless_capacity: 'The tank keeps growing. Sittings get long.',
  endless_appetite: 'Hunger that does not clock out.',
  permanent_expansion: 'Capacity that does not give the extra back.',
  bodys_surrender: 'The body wants the climb. Traits start landing.',
  devouring_presence: 'Appetite as weather. The room feels it.',
  devourers_threshold: 'A threshold push stored for when you need it.',
  first_crack: 'Shame chips. Curiosity gets in.',
  curious_appetite: 'She wants to know how much more she can take.',
  shame_erosion: 'The apology gets quieter every week.',
  broken_shame: 'Shame lost. Appetite kept the house.',
  craving_submission: 'She wants to be fed. She says so.',
  internalized_role: 'Feedee as identity. She wears it.',
  willing_vessel: 'She is the sitting. You are the evening.',
  pride_in_ruin: 'She is proud of the extra. She shows it.',
  broken_mind: 'Refusal thins to a courtesy she no longer uses.',
  total_surrender: 'She is yours in the appetite sense. Completely.',
  resident_ride: 'Ride her campus loop. You steer the extra.',
  deep_ride: 'Deeper ride. More of the week happens in her body.',
  memory_palace: 'You keep her body memory. Callbacks land.',
  hunger_web: 'Hunger links. One extra tugs another.',
  ritual_master: 'Rites that feed. The floor learns the steps.',
  dream_walk: 'Appetite dreams. Hunger that walks in sleep.',
};

const EV = {
  sumo_stance: 'She plants lower. Bouts wrap sooner. Extra stays.',
  sumo_crowd: 'They stay to watch the extra of her.',
  sumo_rep: 'Training lifestyle. Passive extra every week.',
  sumo_record: 'A free activity charge. The ring still pays pounds.',
  sumo_legend: 'Ring legend. Passive extra and heavier sittings.',
  ec_timer: 'Timer sense. Competitive eating lands as extra.',
  ec_circuit: 'Circuit life. She keeps eating between events.',
  ec_record: 'Crowds follow the record. Rapport follows the crowds.',
  ec_sponsor: 'Sponsors make the eating look official. Scrutiny drops.',
  ec_legend: 'Eating legend. Passive extra, heavier sittings, louder crowds.',
  fc_upload: 'Upload schedule. The content routine feeds her.',
  fc_subs: 'Subscribers love her. Activity rapport stacks.',
  fc_viral: 'A viral sitting. Double extra when the clip hits.',
  fc_brand: 'Brand deals. Corporate cover for the extra.',
  fc_empire: 'She is a brand. Passive extra, rapport, quieter admin.',
  bpc_rebrand: 'Mainstream framing. Scrutiny loses teeth.',
  bpc_brand: 'Content keeps her eating. Passive extra.',
  bpc_viral: 'Platform love. Rapport per viewing.',
  bpc_ted: 'Public figure. Admin hesitates.',
  bpc_legacy: 'She is the argument. Extra, rapport, cover.',
  cap_drill: 'Team drill feeds back into her extra.',
  cap_squad: 'Training culture. Passive extra.',
  cap_trophy: 'Trophy run. Rapport in the stands.',
  cap_national: 'National invite. Legitimate cover.',
  cap_dynasty: 'A permanent institution. Extra on every sitting.',
  bsc_culture: 'Body-positive framing. Admin reads it as policy.',
  bsc_pledges: 'New sisters join the culture. Passive extra.',
  bsc_press: 'National press. She is a public extra.',
  bsc_policy: 'The org is on board. Scrutiny drops hard.',
  bsc_permanent: 'The chapter carries the extra forward.',
  ed_newsletter: 'Writing plus eating. Passive extra.',
  ed_agent: 'An agent. Rapport per entry.',
  ed_book: 'Published. Admin is careful with authors.',
  ed_reviews: 'The writing legitimizes the extra.',
  ed_canon: 'Campus anthology. She is in the book.',
  fr_irb: 'Season panel cover. Scrutiny drops.',
  fr_lab: 'Station access. The log requires intake.',
  fr_published: 'Panel recognition. Rapport bonds.',
  fr_grant: 'Funding converts skeptics.',
  fr_keynote: 'She is the hall log.',
  es_setup: 'Stocked fridge. Stream sittings land heavier.',
  es_community: 'Chat loves her. Rapport per stream.',
  es_viral: 'The algorithm feeds her content and her.',
  es_platform: 'Platform backing. The conversation changes.',
  es_legend: 'Streaming icon. Extra and rapport stacked.',
  se_timer: 'Records come with mass.',
  se_record: 'Record breaker. The crowd stays.',
  se_crossover: 'Two communities. Twice the lifestyle extra.',
  se_national: 'National status as a shield.',
  se_legend: 'Unprecedented extra on every challenge.',
  ch_menu: 'Wednesday menu. The feast is the week.',
  ch_tradition: 'Tradition that fills plates.',
  ch_alumni: 'Alumni cover. The chapter eats in public.',
  ch_reputation: 'Hostess reputation. Rapport at the door.',
  ch_legacy: 'The feast outlives the semester.',
  bpg_proposal: 'Proposal language. Policy cover.',
  bpg_pledges: 'Pledges join softer. Passive extra.',
  bpg_press: 'Press cycle. She is the quote.',
  bpg_policy: 'Greek policy. Scrutiny folds.',
  bpg_permanent: 'The house keeps the extra as culture.',
  me_sheet: 'Sheet music of appetite. Sittings run cleaner.',
  me_optimize: 'Optimized sittings. Extra per session.',
  me_record: 'Logged extra. The sheet does not lie.',
  me_cited: 'Cited work. Cover in the citation.',
  me_legend: 'She is the method.',
  fs_irb: 'Panel cover for the station.',
  fs_lab: 'Lab hours that require intake.',
  fs_published: 'Published extra. Rapport in the byline.',
  fs_cited: 'Cited until admin stops asking.',
  fs_keynote: 'She presents the hall log as fact.',
  ag_eye: 'The eye that finds extra in a frame.',
  ag_consent: 'Consent forms. The sitting still happens.',
  ag_shared: 'Shared gallery. Rapport in the comments.',
  ag_living: 'Living archive. She is the exhibit.',
  ag_archive: 'The extra is catalogued and kept.',
  sa_grace: 'Salon grace. Guests eat slower and more.',
  sa_menu: 'Salon menu. Courses with names.',
  sa_invite: 'The invite list fattens the room.',
  sa_double: 'Double sitting. Digestif included.',
  sa_reine: 'She is the salon. The extra is etiquette.',
  ia_first: 'First installation. Soft mass in public.',
  ia_gallery: 'Gallery hours. Viewers stay. So does she.',
  ia_review: 'Reviews that call the extra art.',
  ia_exhibition: 'Exhibition extra. The room is built around her.',
  ia_retro: 'Retrospective. The extra is the catalog.',
  fp_shoot: 'A shoot that requires snacks on set.',
  fp_gallery: 'Food photos. She eats the props.',
  fp_book: 'A book of plates. Rapport in the caption.',
  fp_collector: 'Collectors. Cover and extra.',
  fp_permanent: 'Permanent collection. She is the body of work.',
  ab_post: 'A post. Then a sitting. Then another post.',
  ab_following: 'Following grows. So does she.',
  ab_viral: 'Viral extra. The thread does not end.',
  ab_journalist: 'A journalist notices. Cover arrives.',
  ab_phenomenon: 'She is the phenomenon.',
  ac_first: 'First recording. Mic, plate, extra.',
  ac_community: 'Listeners. Rapport in the comments.',
  ac_algorithm: 'The algorithm likes chewing. So does she.',
  ac_mainstream: 'Mainstream comfort. Scrutiny drops.',
  ac_comfort: 'Comfort asmr. Extra as the product.',
  cl_booth: 'Booth legend. Meals as folklore.',
  cl_stories: 'Stories that require a plate to finish.',
  cl_plaque: 'A plaque. Cover in brass.',
  cl_myth: 'Campus myth. Extra as the punchline.',
  cl_place: 'The booth is a place now. She is why.',
  ft_map: 'A map of meals. Expeditions land extra.',
  ft_blog: 'Travel blog. Rapport per plate.',
  ft_homepress: 'Home press. Cover in print.',
  ft_bookdeal: 'Book deal. The extra is a chapter.',
  ft_ambassador: 'Ambassador of appetite. Extra on the road.',
  ffa_draft: 'Drafts that require snacks to write.',
  ffa_following: 'Readers. Rapport in the comments.',
  ffa_pseudonym: 'A name that covers the extra.',
  ffa_viral: 'Viral chapter. She writes heavier.',
  ffa_canon: 'Canon. The extra is literature.',
  hq_mae_recipes: 'Mae\'s recipes. Homestead extra.',
  hq_cast_iron: 'Cast iron. Portions that do not quit.',
  hq_weekly_call: 'Weekly call. Care and calories.',
  hq_care_package: 'A package that is really a sitting.',
  hq_harvest: 'Harvest extra. The homestead keeps giving.',
  sfq_circuit: 'Fair circuit. Extra on the road.',
  sfq_darcy: 'Darcy. Rivalry that feeds.',
  sfq_scale: 'Fair scale. The number is the show.',
  sfq_press: 'Fair press. Cover in the photo.',
  sfq_legend: 'Fair legend. Extra as the prize.',
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

function texts(unique, cat) {
  return three([unique, ...(CAT[cat] || CAT.prestige)]);
}

export function applySkillOverhaul() {
  for (const sk of SKILL_TREE) {
    registerPool(`hall.skill.${sk.id}`, [
      { when: {}, text: texts(HALL[sk.id], sk.category) },
    ]);
  }
  for (const sk of SKILLS) {
    registerPool(`ra.skill.${sk.id}`, [
      { when: {}, text: texts(RA[sk.id], sk.tree === 'gluttony' ? 'feeding' : sk.tree === 'corruption' ? 'psychology' : 'social') },
    ]);
  }
  for (const arr of Object.values(EVOLVED_SKILL_TREES)) {
    for (const sk of arr) {
      registerPool(`evolved.skill.${sk.id}`, [
        { when: {}, text: three([EV[sk.id], 'Path extra. She keeps the receipt.', 'The sitting pays in body.']) },
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

export function renderHallSkillDesc(skillId, student, week = 1) {
  if (!skillId) return '';
  return prefer(`hall.skill.${skillId}`, ctxFor(student, week, { featureId: 'hall', skillId }));
}

export function renderRaSkillDesc(skillId, student, week = 1) {
  if (!skillId) return '';
  return prefer(`ra.skill.${skillId}`, ctxFor(student, week, { featureId: 'skills', skillId }));
}

export function renderEvolvedSkillDesc(skillId, student, week = 1) {
  if (!skillId) return '';
  return prefer(`evolved.skill.${skillId}`, ctxFor(student, week, { featureId: 'evolved', skillId }));
}
