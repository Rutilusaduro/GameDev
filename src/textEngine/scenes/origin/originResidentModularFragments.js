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
