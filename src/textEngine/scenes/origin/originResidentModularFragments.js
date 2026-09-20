// Origin-aware eat / stirring overlays (peeled from raPivot pass 116).
import { registerModuleVariants } from '../../engine.js';

const W = 3;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('eat.firstBite', [
  {
    when: { studentId: 7, origin: 'priya_parental_track', ...EARLY },
    weight: W,
    text: [
      'The first bite is logged like a deviation — then she stops pretending it is only data.',
      'She eats with the focus of someone who still hears a parent’s voice in the kitchen.',
    ],
  },
  {
    when: { studentId: 7, origin: 'priya_reward_system', ...EARLY },
    weight: W,
    text: [
      'She treats the opening forkful like a milestone bonus — appetite already cashing the check.',
      'First bite: approved. Second: scheduled. Her smile says she planned this.',
    ],
  },
  {
    when: { studentId: 10, origin: 'renee_line_cook', ...EARLY },
    weight: W,
    text: [
      'She tastes like someone who knows the pass — heat, salt, portion discipline breaking.',
      'The first bite is staff meal energy: quick, guilty, then gone before shame catches up.',
    ],
  },
  {
    when: { studentId: 10, origin: 'renee_grandmothers_spoon', ...EARLY },
    weight: W,
    text: [
      'Grandmother’s rule: taste everything. She obeys with both hands on the plate.',
      'The opening mouthful is heirloom sweet — she reaches for more before she narrates why.',
    ],
  },
  {
    when: { studentId: 16, origin: 'sophia_dissertation_stress', ...EARLY },
    weight: W,
    text: [
      'She eats like stress relief with a control group — one bite, then the hypothesis fails.',
      'First intake: baseline. Second: statistically significant comfort.',
    ],
  },
  {
    when: { studentId: 16, origin: 'sophia_sample_closet', ...EARLY },
    weight: W,
    text: [
      'Wellness samples were never meant to be this good — she finishes the trial portion anyway.',
      'The fork goes down; the closet in her mind opens wider.',
    ],
  },
  {
    when: { studentId: 5, origin: 'destiny_ranked_grind', ...EARLY },
    weight: W,
    text: [
      'She frames the first bite as a patch note — hunger buff, no cooldown.',
      'Ranked queue can wait. This plate is the real meta.',
    ],
  },
  {
    when: { studentId: 5, origin: 'destiny_offline_lobby', ...EARLY },
    weight: W,
    text: [
      'Offline mode: snacks enabled, spectators disabled. She eats like she already won.',
      'No stream, no chat — just fork DPS and a full inventory bar.',
    ],
  },
  {
    when: { studentId: 1, origin: 'madd_hidden_binge', ...EARLY },
    weight: W,
    text: [
      'Wrappers in the data set; the first bite is primary source material.',
      'She eats like someone who already lost the control group.',
    ],
  },
  {
    when: { studentId: 9, origin: 'chloe_scandal_abroad', ...EARLY },
    weight: W,
    text: [
      'She eats like armor plating — silk manners, appetite underneath winning.',
      'The first bite is performance. The second is confession.',
    ],
  },
  {
    when: { studentId: 9, origin: 'chloe_first_to_leave', ...EARLY },
    weight: W,
    text: [
      'Hosting herself starts with hosting the plate — she fills both roles at once.',
      'First bite tastes like independence buttered and salted.',
    ],
  },
  {
    when: { studentId: 6, origin: 'tiffany_feast_founder', ...EARLY },
    weight: W,
    text: [
      'Wednesday energy on a random night — she treats the fork like a gavel.',
      'More is more; the opening mouthful proves the motto.',
    ],
  },
  {
    when: { studentId: 4, origin: 'fiona_self_portrait', ...EARLY },
    weight: W,
    text: [
      'She studies the first bite like composition — then eats like the subject moved.',
      'Canvas hunger: the curve updates in real time.',
    ],
  },
  {
    when: { studentId: 17, origin: 'indy_map_vault', ...EARLY },
    weight: W,
    text: [
      'Calories logged as stored value — the vault opens with a fork.',
      'Treasure tastes like butter; she inventories every bite.',
    ],
  },
  {
    when: { studentId: 2, origin: 'kylie_brand_body', ...EARLY },
    weight: W,
    text: [
      'Camera-ready posture, off-camera appetite — the first bite breaks the contract.',
      'Brand body says no; her mouth says soon.',
    ],
  },
  {
    when: { studentId: 3, origin: 'serena_bored_undefeated', ...EARLY },
    weight: W,
    text: [
      'New event: eating. She approaches the plate like a undefeated athlete.',
      'The first bite is warm-up. She already plans the podium.',
    ],
  },
  {
    when: { studentId: 11, origin: 'kaylee_self_care', ...EARLY },
    weight: W,
    text: [
      'Orders for herself too — the first bite is triage and treat at once.',
      'Bedside manner aimed inward; she eats without charting guilt.',
    ],
  },
  {
    when: { studentId: 12, origin: 'nadia_dream_journal', ...EARLY },
    weight: W,
    text: [
      'REM hunger crosses into daylight — fork meets hypothesis.',
      'She notes the flavor, then stops pretending it is only research.',
    ],
  },
  {
    when: { studentId: 13, origin: 'daisy_snack_mom', ...EARLY },
    weight: W,
    text: [
      'Packed extra for everyone including herself — first bite is habit, not accident.',
      'Snack-mom energy: she feeds herself like she feeds the hall.',
    ],
  },
  {
    when: { studentId: 14, origin: 'mj_homestead_abundance', ...EARLY },
    weight: W,
    text: [
      'Harvest manners — no shy around a table, even a dorm one.',
      'County fair confidence in the first forkful; seconds assumed.',
    ],
  },
  {
    when: { studentId: 0, origin: 'britt_gymnast', ...EARLY },
    weight: W,
    text: [
      'Coach voice in her head — appetite answers anyway on the first forkful.',
      'Discipline cracks at the teeth; rebellion tastes like seconds.',
    ],
  },
  {
    when: { studentId: 1, origin: 'madd_subject_zero', ...EARLY },
    weight: W,
    text: [
      'Subject zero logs intake — methodology begins with swallowing pride.',
      'The first bite is control group she already plans to beat.',
    ],
  },
  {
    when: { studentId: 15, origin: 'lilith_always_watching', ...EARLY },
    weight: W,
    text: [
      'She eats like someone who has been counting your plates all week.',
      'First bite is invitation; the room feels smaller afterward.',
    ],
  },
  {
    when: { studentId: 18, custom: true, ...EARLY },
    weight: W,
    text: [
      'Field test: opening intake exceeds predicted variance — she keeps logging.',
      'Prototype appetite online; fork throughput nominal.',
    ],
  },
]);

registerModuleVariants('diary.innerBeat', [
  {
    when: { studentId: 9, origin: 'chloe_first_to_leave', ...EARLY },
    weight: W,
    text: [
      'I left family to find a table that would keep feeding me. Found it.',
    ],
  },
  {
    when: { hallAmbiancePeakMin: [30] },
    weight: 1,
    text: [
      'The hall hums through the page — appetite feels policy-approved tonight.',
    ],
  },
]);

registerModuleVariants('origin.stirring.line', [
  {
    when: { studentId: 7, origin: 'priya_reward_system', stageMax: 3 },
    weight: W,
    text: [
      'Milestones keep moving — she keeps meeting them with her mouth full.',
    ],
  },
  {
    when: { studentId: 10, origin: 'renee_grandmothers_spoon', stageMax: 3 },
    weight: W,
    text: [
      'Love in her family was always served warm; she finally lets herself take seconds.',
    ],
  },
  {
    when: { studentId: 16, origin: 'sophia_sample_closet', stageMax: 3 },
    weight: W,
    text: [
      'The samples were for clients. This hunger is personal data she cannot publish.',
    ],
  },
]);
