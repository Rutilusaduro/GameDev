// The Squad — Lead: A5 Editor | Support: A6 Slender, A2 Psych
// Slot-composed origin deck voice. Prefer over leftover ORIGIN_DECKS.voiceLine.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';

registerPool('origin.voice.scene', [
  { when: {}, text: [
    '{origin.voice.quote} {origin.voice.body}',
    '{origin.voice.body} {origin.voice.quote}',
    '{origin.voice.quote}',
  ]},
]);

registerPool('origin.voice.quote', [
  { when: {}, text: [
    '"The first week already has a taste." She says it like a fact she can live with.',
    '"I brought a rule. Appetite is already editing it."',
    '"This floor is going to keep score on me. I can feel it."',
  ]},
  { when: { origin: 'britt_gymnast' }, weight: 5, text: [
    '"Coach is gone. The rule stayed." She still stands like the gym is watching.',
    '"We finish the set. Then we eat." She almost believes the order.',
  ]},
  { when: { origin: 'britt_pageant' }, weight: 5, text: [
    '"Posture used to fix everything." She laughs once. "Dinner is louder."',
    '"Smile for the judges. Then have seconds they never counted."',
  ]},
  { when: { origin: 'madd_subject_zero' }, weight: 5, text: [
    '"The protocol starts in this room." She taps the log like a pulse.',
    '"I am the first data point. I intend to be a generous one."',
  ]},
  { when: { origin: 'madd_hidden_binge' }, weight: 5, text: [
    '"The wrappers are the real notes." She does not hide the bag.',
    '"I log what I eat after lights-out. The log is getting heavier."',
  ]},
  { when: { origin: 'kylie_brand_body' }, weight: 5, text: [
    '"The camera has a size it prefers." She already disagrees with it.',
    '"Contract body. Floor body. Guess which one is winning."',
  ]},
  { when: { origin: 'kylie_alt_account' }, weight: 5, text: [
    '"Off-camera counts more." She smiles like a second profile.',
    '"The other account eats. This one is catching up."',
  ]},
  { when: { origin: 'serena_missed_nationals' }, weight: 5, text: [
    '"Fuel is a program now." She says it like a split she can still beat.',
    '"Two tenths. I am done starving for two tenths."',
  ]},
  { when: { origin: 'serena_bored_undefeated' }, weight: 5, text: [
    '"I needed a new event." She looks at the dining hall like a lane.',
    '"Undefeated is boring. Appetite is not."',
  ]},
  { when: { origin: 'fiona_model_sidegig' }, weight: 5, text: [
    '"Hold still. Let them look." She already knows they will.',
    '"The pose is a pause. The body is the work."',
  ]},
  { when: { origin: 'fiona_self_portrait' }, weight: 5, text: [
    '"The subject keeps changing." She sounds pleased about it.',
    '"I paint what I am becoming. The canvas is hungry too."',
  ]},
  { when: { origin: 'destiny_ranked_grind' }, weight: 5, text: [
    '"Hunger is a buff I forgot to turn off." She queues another match anyway.',
    '"Ranked night. Snack night. Same chair."',
  ]},
  { when: { origin: 'destiny_offline_lobby' }, weight: 5, text: [
    '"No spectators. More snacks." She means both.',
    '"Bots do not comment. The fridge does."',
  ]},
  { when: { origin: 'tiffany_legacy_thin' }, weight: 5, text: [
    '"Chapter faces smile through brunch." She is done being the smallest smile.',
    '"Legacy thin is a costume. Wednesday is real."',
  ]},
  { when: { origin: 'tiffany_feast_founder' }, weight: 5, text: [
    '"More is more, babe." She says it like weather.',
    '"I founded a feast. The feast is founding me back."',
  ]},
  { when: { origin: 'priya_parental_track' }, weight: 5, text: [
    '"Deviation requires a plan." She already has one. It involves seconds.',
    '"They wanted a track. I wanted a kitchen."',
  ]},
  { when: { origin: 'priya_reward_system' }, weight: 5, text: [
    '"Milestone reached. Bonus approved." The bonus is edible.',
    '"I built a reward loop. I am the loop."',
  ]},
  { when: { origin: 'maya_moved_often' }, weight: 5, text: [
    '"New room. New number." She already started the log.',
    '"I pack light. Appetite does not."',
  ]},
  { when: { origin: 'maya_eight_siblings' }, weight: 5, text: [
    '"Seconds were how we talked." She still talks that way.',
    '"Loud house. Quiet plate. I learned to claim both."',
  ]},
  { when: { origin: 'chloe_scandal_abroad' }, weight: 5, text: [
    '"Armor comes in silk and portions." She wears both.',
    '"They talked. I hosted. Hosting won."',
  ]},
  { when: { origin: 'chloe_first_to_leave' }, weight: 5, text: [
    '"I had to host myself first." The table is already set.',
    '"Found family starts with a spare chair and extra bread."',
  ]},
  { when: { origin: 'renee_line_cook' }, weight: 5, text: [
    '"Staff meal is still a meal." She says it like rank.',
    '"The line taught me pace. The floor taught me more."',
  ]},
  { when: { origin: 'renee_grandmothers_spoon' }, weight: 5, text: [
    '"Taste everything. That was the rule." She kept it.',
    '"The spoon is an heirloom. So is the appetite."',
  ]},
  { when: { origin: 'kaylee_perfect_rotation' }, weight: 5, text: [
    '"Care plans do not skip lunch." She writes herself into the chart.',
    '"Perfect rotation. Imperfect portions. I prefer the portions."',
  ]},
  { when: { origin: 'kaylee_self_care' }, weight: 5, text: [
    '"Orders for me too." She fills the cup without asking.',
    '"Self-care looks like seconds when nobody is grading."',
  ]},
  { when: { origin: 'nadia_thesis_others' }, weight: 5, text: [
    '"Observation contaminates the observer." She sounds curious, not sorry.',
    '"I started a log on them. The log started on me."',
  ]},
  { when: { origin: 'nadia_dream_journal' }, weight: 5, text: [
    '"I was hungry before waking." She writes it like data.',
    '"Dream journal. Appetite in the margins. Both true."',
  ]},
  { when: { origin: 'daisy_potluck_virtue' }, weight: 5, text: [
    '"Bring enough for everyone. Including you." She packed extra.',
    '"Virtue used to mean less. I revised the recipe."',
  ]},
  { when: { origin: 'daisy_snack_mom' }, weight: 5, text: [
    '"I packed extra. I always do." The bag is already open.',
    '"Snack mom is a title I earned with crumbs."',
  ]},
  { when: { origin: 'mj_fair_thin_prize' }, weight: 5, text: [
    '"Ribbon winners smile first." She is done winning that ribbon.',
    '"County fair thin is a costume. Pie is the prize now."',
  ]},
  { when: { origin: 'mj_homestead_abundance' }, weight: 5, text: [
    '"No sense being shy around a table." She already pulled you a chair.',
    '"Homestead means plenty. I am practicing plenty."',
  ]},
  { when: { origin: 'lilith_always_watching' }, weight: 5, text: [
    '"Soon began before you noticed." She sounds fond of the delay.',
    '"I have been arranging seats. You sat in one."',
  ]},
  { when: { origin: 'lilith_garden_before' }, weight: 5, text: [
    '"Courts need seats. I have been arranging them."',
    '"The garden was practice. Campus is the table."',
  ]},
  { when: { origin: 'sophia_dissertation_stress' }, weight: 5, text: [
    '"Baseline check. I am the baseline." She writes it twice.',
    '"The season plan is hungry. So am I."',
  ]},
  { when: { origin: 'sophia_sample_closet' }, weight: 5, text: [
    '"Statistically significant. Personally too." She pockets another sample.',
    '"The closet is a pantry with better labels."',
  ]},
  { when: { origin: 'indy_trust_fund_expedition' }, weight: 5, text: [
    '"Field rations can be decadent." She packed both kinds.',
    '"Expedition budget. Dessert line item. Approved."',
  ]},
  { when: { origin: 'indy_map_vault' }, weight: 5, text: [
    '"Treasure is stored value. Calories count."',
    '"I map vaults. I also map second helpings."',
  ]},
  { when: { origin: 'talia_lab_accident' }, weight: 5, text: [
    '"The experiment affected the experimenter." She does not sound sorry.',
    '"Hypothesis: I would notice. Result: I liked noticing."',
  ]},
  { when: { origin: 'talia_optimization_run' }, weight: 5, text: [
    '"I was already testing myself." The test is going well.',
    '"Optimization means more of me per week. On purpose."',
  ]},
]);

registerPool('origin.voice.body', [
  { when: {}, text: [
    'The extra of her is already a rumor. She lets you hear it.',
    'First semester. First permission. Appetite takes notes.',
    'She chose this story. The floor will write the rest in pounds.',
  ]},
  { when: { stageMin: 4 }, weight: 2, text: [
    'The origin still fits. The body is already revising the ending.',
  ]},
]);

function prefer(poolKey, ctx) {
  const line = render(`{${poolKey}}`, ctx)?.trim();
  if (line && !line.includes('{unresolved}')) return line;
  return '';
}

export function renderOriginVoice(student, originId, week = 1) {
  if (!student) return '';
  const origin = originId || student.origin || '';
  return prefer('origin.voice.scene', buildTextContext({
    subject: { ...student, origin },
    week,
    globals: { featureId: 'origin', origin },
  }));
}
