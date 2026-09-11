// The Squad — Lead: A5 Editor | Support: A2 Psych, A3 Immobility
// Last-wins leftover UI: achievements, settling forms, campus saturation.
import { registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { ACHIEVEMENT_LIST } from '../../../gameData/sessions.js';
import { FINAL_FORMS, GATHERING, SETTLING_ACTIONS } from '../../../gameData/immobilityArrival.js';
import { SATURATION_TIERS } from '../../../gameData/campusSaturation.js';

const ACH = {
  first_gain: ['First sitting. She ate. The extra started.', 'A first feed. The floor noticed.', 'You fed her. She kept it.'],
  stage2: ['Someone hit chubby. Clothes noticed first.', 'A resident rounded out. The roster felt it.', 'Chubby as a public fact.'],
  stage4: ['Heavy. The chair agrees.', 'A resident went heavy. The extra is obvious.', 'Heavy as a hall milestone.'],
  stage6: ['Very fat. The extra is the whole argument.', 'A resident at very fat. Doorways start opinions.', 'The scale told on her kindly.'],
  stage8: ['Immobile. The room comes to her now.', 'She stopped going out. Dinner walks to her.', 'Immobility as arrival, not a problem.'],
  stage9: ['Blob. She is the furniture and the evening.', 'A resident at blob. The floor orbits her.', 'Vast. Settled. Kept.'],
  all_soft: ['The whole floor went soft.', 'Nobody on the roster is still sharp-edged.', 'Soft as a hall average.'],
  all_chubby: ['Everyone chubby. The lounge got quieter and warmer.', 'A chubby floor. Chairs earning their padding.', 'The roster rounded together.'],
  all_plump: ['Plump across the board. The extra is policy.', 'Everyone plump. Hall photos will lie about it.', 'A plump floor. Appetite as culture.'],
  total100: ['A hundred pounds of extra, counted as a hall.', '100 lbs gained. The floor is heavier on purpose.', 'First hundred. More coming.'],
  total500: ['Five hundred pounds of extra on the roster.', '500 lbs. The building feels it.', 'Half a thousand. The lounge holds it.'],
  total1000: ['A thousand pounds. The hall is a different place.', '1000 lbs of extra. Gravity with a floor plan.', 'Four digits. Appetite as infrastructure.'],
  rel_max: ['Someone hit 100 rapport. She will eat for you.', 'Full trust. The next plate is easy.', 'Max relationship. Appetite follows.'],
  all_rel50: ['The whole floor likes you enough to stay for seconds.', '50% rapport across the roster.', 'They trust the RA. They eat.'],
  narrative5: ['Five stories landed. The floor has a plot now.', 'Five narrative beats. The extra has witnesses.', 'The hall is telling on itself.'],
  narrative10: ['Ten stories. The extra has a history.', 'Ten narrative beats. Appetite as a serial.', 'The floor remembers in scenes.'],
  aib_notice: ['Residence Review Board noticed. Cover still holds.', 'The Board has a file. You have a kitchen.', 'Notice. Not a verdict. Keep feeding.'],
  hearing_won: ['You won a hearing. The extra stays.', 'Removal lost. Appetite kept the house.', 'The Board blinked. She kept eating.'],
  aib_first_hearing: ['First Board hearing survived. The floor still stands.', 'You walked out. The snack station stayed.', 'Hearing one. Cover held.'],
  act_trigger: ['The Supernatural Act opened. Hunger got weird in the good way.', 'The Act. Appetite with a new physics.', 'Supernatural. The extra has rules now.'],
  board_capture: ['Three Board members compromised. Questions get softer.', 'Three captures. Scrutiny learned manners.', 'The Board eats. The file shrinks.'],
  supernatural: ['The Act is live. Scarcity has something to lose.', 'Supernatural appetite. The floor is not ordinary.', 'The Act. Plates that should not exist, do.'],
  scarcity_banished: ['Scarcity pressure at zero after the Act.', 'Hunger curses lost. The extra won.', 'Scarcity banished. The feast holds.'],
  institutional_capture: ['Four Board captures. Scarcity capped. The institution ate.', 'Four names. Cover as policy.', 'The Board is yours in the appetite sense.'],
  vance_compromised: ['Dr. Vance folded. The extra has a faculty friend.', 'Vance compromised. Oversight got hungry.', 'Faculty cover. She signed in calories.'],
  board_feast: ['A feast bribe during Investigation. They ate. They forgot.', 'Board feast. Scrutiny with a napkin.', 'Investigation sat down to dinner.'],
  all_thin: ['Every evolved resident ascended. The roster went mythic.', 'All ascended. The extra has forms now.', 'Thin as a word that no longer applies.'],
  refeed_god: ['Voluptuous Banishment complete. Scarcity lost the argument.', 'Refeed god. The curse ate itself.', 'Banishment as a sitting.'],
  lilith_saint: ['Lilith ate the Portion Saint. Soft. Consensual. Extra.', 'The Saint went in. Lilith came out rounder.', 'A hunt that ended as a meal.'],
  synthesis_ally: ['Synthesis. Ascended roster plus pharmacist stage four.', 'The chemist and the ascended. Extra as alliance.', 'Stage four brew. Mythic bodies. Same floor.'],
};

const FORM = {
  feed: ['Growth uncapped. She keeps settling outward.', 'Ever-expanding. The extra has no ceiling.', 'Feed-path end. She is still arriving.'],
  care: ['The room is hers. Others seek her warmth.', 'Comfort queen. Company finds reasons to sit.', 'Care-path end. She is the habitat.'],
  socialize: ['Pleasure center. Visitors come unprompted. Campus orbits her.', 'The adored. The extra is a destination.', 'Social-path end. They come to her.'],
};

const BRANCH = {
  socialize: ['Bring the world to her. She is the center it orbits.', 'Campus gossip, confidante, the chair everyone visits.', 'Socialize. The extra of her is a salon.'],
  feed: ['Bring what she craves. She settles by eating.', 'Feed. Preferred plates, big spreads, stuffing as care.', 'She keeps settling when she keeps eating.'],
  care: ['Tend her where she rests. Everything walks to her.', 'Care. The room learns her. You pay for the lesson.', 'Tend. She does not get up to thank you.'],
};

const GATHER = [
  'The room is hers. The others come. Let them attend her.',
  'Gather her court. They sit in the extra of her.',
  'A leviathan visiting hour. Plates optional. Presence not.',
];

const SAT = {
  0: ['Ordinary campus rhythms. Appetite still private.', 'Normal campus. The extra has not gone public yet.', 'College as advertised. For now.'],
  1: ['Wellness messaging. Heavier ambient presence.', 'Softening. Flyers that smell like snacks.', 'Campus starting to round at the edges.'],
  2: ['New residents arrive softer. Events skew indulgent.', 'Saturated. Appetite as campus weather.', 'The quad eats. So does orientation.'],
  3: ['Campus-wide appetite is the default social mode.', 'Regional excess. The extra is the weather.', 'Everyone knows. Everyone eats anyway.'],
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

export function applyMoreUiOverhaul() {
  for (const a of ACHIEVEMENT_LIST) pool(`ui.achievement.${a.id}`, ACH[a.id]);
  for (const [id, form] of Object.entries(FINAL_FORMS)) pool(`settle.form.${id}`, FORM[id]);
  for (const id of Object.keys(SETTLING_ACTIONS)) pool(`settle.branch.${id}`, BRANCH[id]);
  pool('settle.gather.scene', GATHER);
  for (const t of SATURATION_TIERS) pool(`campus.saturation.${t.id}`, SAT[t.id]);
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

export function renderAchievementDesc(achId, student, week = 1) {
  if (!achId) return '';
  return prefer(`ui.achievement.${achId}`, ctxFor(student, week, { featureId: 'ui', achId }));
}

export function renderFinalFormDesc(formKey, student, week = 1) {
  if (!formKey) return '';
  return prefer(`settle.form.${formKey}`, ctxFor(student, week, { featureId: 'settle', formKey }));
}

export function renderSettleBranchDesc(branchId, student, week = 1) {
  if (!branchId) return '';
  return prefer(`settle.branch.${branchId}`, ctxFor(student, week, { featureId: 'settle', branchId }));
}

export function renderGatheringDesc(student, week = 1) {
  return prefer('settle.gather.scene', ctxFor(student, week, { featureId: 'settle' }));
}

export function renderSaturationDesc(tierId, student, week = 1) {
  if (tierId == null) return '';
  return prefer(`campus.saturation.${tierId}`, ctxFor(student, week, { featureId: 'campus', satTier: String(tierId) }));
}
