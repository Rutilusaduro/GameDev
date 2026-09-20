// Growth event beats — late-game hall/lab frame on onset + settle.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('ge.scene.growthFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'Late-semester growth feels ceremonial — appetite and machinery agreeing in public.',
      'Hall Ambiance thins at the lab door; inside, every pound feels like policy she chose.',
      'Wellness framing stays on your clipboard; the rig stays honest and unmistakably hungry.',
      'Someone whispers that the floor will smell like victory before lights-out.',
      'Co-conspirator pride climbs with every datapoint the session logs.',
    ],
  },
]);

const ONSET_LATE = '{ge.scene.growthFrame|prefix:} {ge.causeAction|prefix:}{ge.causeAnchor|prefix: } — {ge.firstSensation|prefix: }.';

registerModuleVariants('ge.onset', [
  {
    when: { weekMin: 22 },
    weight: 6,
    priority: 6,
    text: [ONSET_LATE],
  },
  {
    when: { weekMin: 16 },
    weight: 4,
    priority: 4,
    text: [ONSET_LATE],
  },
]);
