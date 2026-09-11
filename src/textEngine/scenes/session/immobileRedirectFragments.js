// Dinner immobile redirect — composable care + logistics slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { IMMOBILE_REDIRECT } from '../../../gameData/students.js';

registerPool('session.immobile.care', [
  {
    when: {},
    weight: 2,
    text: [
      'Dinner comes to her now — plates, patience, and pride in equal measure.',
      'You frame it wellness; she hears devotion with extra gravy.',
      'The redirect is gentle; the portions are not.',
    ],
  },
]);

registerPool('session.immobile.redirect', [
  {
    when: {},
    weight: 2,
    text: [
      'Hall staff learn new routes around her radius — habit reshapes the floor plan.',
      'She cannot join the table; the table learns to orbit her instead.',
      'Mobility yields to appetite; the building adjusts without complaint.',
    ],
  },
]);

const IMMOBILE_SKELETON = '{session.immobile.care|prefix:} {session.immobile.redirect|prefix: }';

for (const [studentId, tiers] of Object.entries(IMMOBILE_REDIRECT)) {
  if (!tiers || typeof tiers !== 'object') continue;
  for (const tier of Object.keys(tiers)) {
    registerModuleVariants(`session.immobile.s${studentId}.${tier}`, [
      {
        when: { weekMin: 10 },
        weight: 3,
        priority: 2,
        text: [IMMOBILE_SKELETON],
      },
    ]);
  }
}

registerModuleVariants('session.immobile.s0.blob', [
  {
    when: { studentId: [0] },
    weight: 1,
    text: [
      'Brittany’s chair creaks agreement — dinner comes to the captain now, not the other way.',
      'Brittany’s redirect is blunt — dinner travels to her; the hall learns immobility is still hospitality.',
    ],
  },
]);

registerModuleVariants('session.immobile.s7.blob', [
  {
    when: { studentId: [7] },
    weight: 1,
    text: [
      'Priya’s cost-benefit analysis already favors delivery — you’re the optimal variable.',
    ],
  },
]);
