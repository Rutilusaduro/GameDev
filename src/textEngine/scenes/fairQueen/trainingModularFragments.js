// State Fair Queen — training sessions composable beats (late-game overlay).
import { registerPool, registerModuleVariants } from '../../engine.js';

const COLLABS = ['Brittany', 'Kylie', 'Serena', 'Renee', 'Daisy', 'Lilith'];

registerPool('fair.training.coachBeat', [
  {
    when: {},
    weight: 2,
    text: [
      'Mary Jane drills under canvas lights — hay-scent, funnel-cake smoke, pride climbing with every rep.',
      'Training tent canvas creaks; every swallow counts toward county pride and softer hips.',
      'She treats plates like hurdles — chew, breathe, chew — coachable hunger on display.',
      'Late-semester fair prep feels ceremonial; the scale is a teammate now, not a threat.',
      'Cotton candy haze leaks under the flap; Mary Jane stands taller when Brittany counts time.',
    ],
  },
]);

registerPool('fair.training.collabVoice', [
  {
    when: {},
    weight: 2,
    text: [
      'Partners bark encouragement; tables groan; the circuit treats appetite like athletics.',
      'Crowd noise swells outside while coaches whisper seconds — co-conspirator energy indoors.',
      'Phones rise for B-roll; Mary Jane eats for the lens and the livestock barn both.',
      'Collaborator pride climbs with every empty dish — rivalry sweet as midway grease.',
      'Wellness framing stays on your clipboard; portions stay unmistakably generous anyway.',
    ],
  },
]);

const TRAINING_SKELETON = '{fair.training.coachBeat|prefix:} {fair.training.collabVoice|prefix: } {fair.day.carnivalAir|prefix: }';

for (const c of COLLABS) {
  registerModuleVariants(`fair.training.${c}`, [
    {
      when: { fairCollab: [c], weekMin: 20 },
      weight: 6,
      priority: 6,
      text: [TRAINING_SKELETON],
    },
    {
      when: { fairCollab: [c], weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [TRAINING_SKELETON],
    },
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 5,
      text: [TRAINING_SKELETON],
    },
    {
      when: { weekMin: 14 },
      weight: 3,
      priority: 3,
      text: [TRAINING_SKELETON],
    },
  ]);
}

registerModuleVariants('fair.training.Brittany', [
  {
    when: { mjStageBucket: ['heavy'], weekMin: 14 },
    weight: 4,
    priority: 5,
    text: [TRAINING_SKELETON],
  },
]);

registerModuleVariants('fair.training.Renee', [
  {
    when: { cStageBucket: ['heavy'], weekMin: 14 },
    weight: 4,
    priority: 5,
    text: [TRAINING_SKELETON],
  },
]);
