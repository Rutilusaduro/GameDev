// The Squad — Lead: A2 Psych | Support: A6 Slender, A7 Artisan, A5 Editor
import { registerModuleVariants, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import '../proseOverhaulPass2.js';
import '../proseOverhaulPass3.js';

const W = 4;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('wi.replyDialogue', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    `"Coach would have a whole speech," she says, chin up. "I'm not asking."`,
    `"That's over the line he drew," she mutters. Then, quieter: "Good."`,
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    `"Hips don't lie," she says, already turning toward the mirror. "Fine. Let them."`,
    `"My mother would fix this with posture," she murmurs. "I'm fixing it with dinner."`,
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    `"It's a new number in a new place," she says. "I'll remember this one."`,
    `"I don't have old data here," she murmurs. "So this is the start."`,
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    `"That's it?" She almost laughs. "We had bowls, not scales."`,
    `"My sisters would call this a light week," she says, unbothered.`,
  ]},
]);

registerModuleVariants('eat.firstBite', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    'She eats like someone breaking a rule on purpose — first bite sharp, defiant.',
    'The opening forkful is rebellion portioned small. The second is not.',
    'Coach would call this cheating. She calls it finally eating enough.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    'She tastes the first bite like a judge, then forgets to be judged.',
    'Presentation first. Appetite second. Appetite is winning faster than she planned.',
    'The crown taught her to pose. The fork teaches her to want.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    'She takes the first bite like testing whether the table will stay put.',
    'The opening mouthful is small, careful — appetite checking in before it commits.',
    'New dorm, new plate, same quiet hunger finally allowed to stay.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    'She reaches first, the way someone used to a crowded kitchen does.',
    'The first bite goes down while she is already making room for the second.',
    'No one elbows her here. She eats like the table is still full anyway.',
  ]},
]);

registerModuleVariants('diary.innerBeat', [
  { when: { studentId: 0, origin: 'britt_gymnast', ...EARLY }, weight: W, text: [
    'He said hunger was weakness. I ate anyway. I am not weak. I am here.',
    'The scale is not a coach. I looked anyway. I did not flinch. Small lie.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', ...EARLY }, weight: W, text: [
    'Checked my profile in the microwave door. Good light. Better curve. Saved the thought.',
    'Crown hopefuls count everything. I counted tonight. I want the number higher next week.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', ...EARLY }, weight: W, text: [
    'Third address in two years. First kitchen that felt like mine. I ate slowly anyway.',
    'I wrote the number down twice. Not because it shocked me. Because I wanted it to stay.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', ...EARLY }, weight: W, text: [
    'Called home. Mom laughed at my small dinner. I had seconds before I called.',
    'The dorm fridge is mine now. I labeled everything. Old habit. Good habit.',
  ]},
]);

// Shape: FULL SENTENCE. Origin backstory bleed for stage 0-3 moments.
registerPool('origin.stirring.line', [
  { when: { studentId: 0, origin: 'britt_gymnast', stageMax: 3 }, weight: W, text: [
    'Old discipline runs in her shoulders. Appetite runs underneath it, winning quietly.',
    'Every bite feels like insubordination. She has stopped apologizing for that.',
  ]},
  { when: { studentId: 0, origin: 'britt_pageant', stageMax: 3 }, weight: W, text: [
    'She catches her reflection mid-meal and does not look away this time.',
    'Pretty was a job. Full is starting to feel like a promotion.',
  ]},
  { when: { studentId: 8, origin: 'maya_moved_often', stageMax: 3 }, weight: W, text: [
    'Something in her loosens when the meal does not end with packing a box.',
    'She eats like a person finally allowed to leave dishes in the sink.',
  ]},
  { when: { studentId: 8, origin: 'maya_eight_siblings', stageMax: 3 }, weight: W, text: [
    'Appetite in her family was never private. She eats like the table is still full.',
    'Seconds are not a confession here. They are how you say you are home.',
  ]},
  { when: { studentId: 1, origin: 'madd_subject_zero', stageMax: 3 }, weight: W, text: [
    'She notes the bite like data, then takes another because the protocol asked.',
    'Methodology was supposed to stay on the page. It is in her mouth now.',
  ]},
  { when: { studentId: 1, origin: 'madd_hidden_binge', stageMax: 3 }, weight: W, text: [
    'Wrappers used to be private. Tonight she leaves the foil where you can see it.',
    'The hidden stash taught her speed. Sitting with you teaches her to linger.',
  ]},
  { when: { studentId: 2, origin: 'kylie_brand_body', stageMax: 3 }, weight: W, text: [
    'The camera had a size. She eats past it and keeps the ring light on anyway.',
    'Brand notes said clean lines. The fork is writing a different caption.',
  ]},
  { when: { studentId: 2, origin: 'kylie_alt_account', stageMax: 3 }, weight: W, text: [
    'Off-camera she always ate more. Tonight the main account gets that appetite.',
    'She films nothing. She finishes everything. The alt was practice.',
  ]},
  { when: { studentId: 3, origin: 'serena_missed_nationals', stageMax: 3 }, weight: W, text: [
    'Fuel used to be a split-time tool. Tonight it is the point of the evening.',
    'She used to stop at the number coach liked. She does not stop.',
  ]},
  { when: { studentId: 3, origin: 'serena_bored_undefeated', stageMax: 3 }, weight: W, text: [
    'Winning got dull. Eating is a new event she intends to dominate.',
    'She treats the plate like a heat she can still win.',
  ]},
  { when: { studentId: 4, origin: 'fiona_model_sidegig', stageMax: 3 }, weight: W, text: [
    'Hold still was the job. The belly has started moving first.',
    'She used to pose empty. Fullness photographs better and she knows it.',
  ]},
  { when: { studentId: 4, origin: 'fiona_self_portrait', stageMax: 3 }, weight: W, text: [
    'The subject keeps changing between sittings. She is the sitting.',
    'She sketches the new curve from memory while still chewing.',
  ]},
  { when: { studentId: 5, origin: 'destiny_ranked_grind', stageMax: 3 }, weight: W, text: [
    'Hunger was a debuff she played around. Now she stacks it on purpose.',
    'Patch notes never covered dessert. She is writing them with her mouth.',
  ]},
  { when: { studentId: 5, origin: 'destiny_offline_lobby', stageMax: 3 }, weight: W, text: [
    'No spectators used to mean more snacks. She kept the snacks when people arrived.',
    'Bot lobby taught her to eat without performing. She still eats like that.',
  ]},
  { when: { studentId: 6, origin: 'tiffany_legacy_thin', stageMax: 3 }, weight: W, text: [
    'Chapter photos wanted a certain face. Brunch is revising the archive.',
    'She smiles through a bite that would have been skipped last year.',
  ]},
  { when: { studentId: 6, origin: 'tiffany_feast_founder', stageMax: 3 }, weight: W, text: [
    'Wednesday was always extra. She has started keeping Thursday too.',
    'Hostess means first plate and last plate. She takes both without a speech.',
  ]},
  { when: { studentId: 7, origin: 'priya_parental_track', stageMax: 3 }, weight: W, text: [
    'Deviation was supposed to get remediated. She orders dessert instead.',
    'The KPI sheet never had a column for seconds. She is inventing one.',
  ]},
  { when: { studentId: 7, origin: 'priya_reward_system', stageMax: 3 }, weight: W, text: [
    'Milestone reached. Bonus approved. The bonus is always edible.',
    'She treats fullness like a grade she earned in private.',
  ]},
  { when: { studentId: 9, origin: 'chloe_scandal_abroad', stageMax: 3 }, weight: W, text: [
    'Armor used to be silk and portions. The portions have gone soft on her.',
    'She hosts like someone who already survived worse than a second helping.',
  ]},
  { when: { studentId: 9, origin: 'chloe_first_to_leave', stageMax: 3 }, weight: W, text: [
    'She had to host herself first. The table is finally big enough for company.',
    'Leaving home meant feeding herself. She got generous about it.',
  ]},
  { when: { studentId: 10, origin: 'renee_line_cook', stageMax: 3 }, weight: W, text: [
    'Staff meal was still a meal. She has stopped pretending it was small.',
    'Hierarchy used to keep her tasting, not finishing. She finishes.',
  ]},
  { when: { studentId: 10, origin: 'renee_grandmothers_spoon', stageMax: 3 }, weight: W, text: [
    'Taste everything was the rule. She has expanded everything.',
    'The heirloom spoon looks smaller in a fuller hand. She smiles at that.',
  ]},
  { when: { studentId: 11, origin: 'kaylee_perfect_rotation', stageMax: 3 }, weight: W, text: [
    'Care plans do not skip lunch. Hers have started including dessert in the margin.',
    'She used to chart other people. Tonight she charts her own second plate.',
  ]},
  { when: { studentId: 11, origin: 'kaylee_self_care', stageMax: 3 }, weight: W, text: [
    'Orders for her too. The order tonight is another helping, written clearly.',
    'Aggressive rest used to mean sleep. It means eating until the room goes quiet.',
  ]},
  { when: { studentId: 12, origin: 'nadia_thesis_others', stageMax: 3 }, weight: W, text: [
    'Observation was supposed to stay clean. The observer is chewing.',
    'She writes one line about appetite and then demonstrates it.',
  ]},
  { when: { studentId: 12, origin: 'nadia_dream_journal', stageMax: 3 }, weight: W, text: [
    'She woke hungry before the journal caught up. Breakfast is the footnote.',
    'Dream appetite used to vanish at daylight. It stayed for lunch.',
  ]},
  { when: { studentId: 13, origin: 'daisy_potluck_virtue', stageMax: 3 }, weight: W, text: [
    'Bring enough for everyone included a plate she used to skip. She does not skip.',
    'Blessing used to mean serving first. She has learned to sit down with them.',
  ]},
  { when: { studentId: 13, origin: 'daisy_snack_mom', stageMax: 3 }, weight: W, text: [
    'She packed extra. She always does. Tonight the extra has her name on it.',
    'Snack mom meant other people. The foil tray on her lap disagrees.',
  ]},
  { when: { studentId: 14, origin: 'mj_fair_thin_prize', stageMax: 3 }, weight: W, text: [
    'Ribbon winners smiled first and ate later. She has reversed the order.',
    'The fair taught her to pose empty. The kitchen is retraining her.',
  ]},
  { when: { studentId: 14, origin: 'mj_homestead_abundance', stageMax: 3 }, weight: W, text: [
    'No sense being shy around a table. She proves the proverb with both hands.',
    'Harvest was always plenty. She has started keeping plenty on her.',
  ]},
  { when: { studentId: 15, origin: 'lilith_always_watching', stageMax: 3 }, weight: W, text: [
    'Soon began before anyone noticed. She eats like the noticing is the treat.',
    'She watches you watch her take seconds. The watching is part of the meal.',
  ]},
  { when: { studentId: 15, origin: 'lilith_garden_before', stageMax: 3 }, weight: W, text: [
    'Courts need seats. She is arranging her own with every bite.',
    'The garden was practice. Campus is the table she meant to grow into.',
  ]},
  { when: { studentId: 16, origin: 'sophia_dissertation_stress', stageMax: 3 }, weight: W, text: [
    'Baseline check. She is the baseline, and the baseline just asked for more.',
    'Stress used to skip meals. The new protocol is finishing them.',
  ]},
  { when: { studentId: 16, origin: 'sophia_sample_closet', stageMax: 3 }, weight: W, text: [
    'Statistically significant, she says, and reaches for another sample.',
    'The closet was for other people. She has started keeping a dose for herself.',
  ]},
  { when: { studentId: 17, origin: 'indy_trust_fund_expedition', stageMax: 3 }, weight: W, text: [
    'Field rations can be decadent. She packed like she meant to prove it.',
    'Expedition money used to buy gear. Tonight it buys dessert and she logs both.',
  ]},
  { when: { studentId: 17, origin: 'indy_map_vault', stageMax: 3 }, weight: W, text: [
    'Treasure is stored value. Calories count, and she is cataloguing them.',
    'The vault map had empty rooms. Her plate does not.',
  ]},
  { when: { stageMax: 3 }, text: [
    'Something old in her meets something new on the plate.',
    'The week feels ordinary. She does not, quite.',
    'A backstory shows itself in the way she reaches for food.',
    'She eats like the past is watching and has decided to stay.',
    'The first extra bite feels like a private vote.',
  ]},
  { when: {}, text: [
    'The origin sits quietly under the moment.',
    'Old habits speak softly.',
    'The past has not left the table.',
  ]},
]);

export function renderOriginStirring(student, week = 1, opts = {}) {
  if (!student) return '';
  const ctx = buildTextContext({ subject: student, week, ...opts });
  const base = render('{origin.stirring.line}', ctx, { trace: opts.trace || null })?.trim() || '';
  const glow = render('{origin.afterglow}', ctx, { trace: opts.trace || null })?.trim() || '';
  const linger = render('{origin.linger}', ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth([base, glow, linger].filter(Boolean).join('\n\n'), 'origin', ctx, opts.v2DepthChance ?? 0.3);
}
