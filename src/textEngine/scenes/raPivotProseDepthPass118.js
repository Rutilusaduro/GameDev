// More origin residents + blueprint ambiance (Pass 118).
import { registerModuleVariants } from '../engine.js';

const W = 3;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('hall.blueprint.synergy', [
  {
    when: { hallAmbiancePeakMin: [45] },
    weight: 1,
    text: [
      'Every labeled room breathes together — the wing feels like one warm organism.',
    ],
  },
]);

registerModuleVariants('eat.firstBite', [
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
]);

registerModuleVariants('diary.innerBeat', [
  {
    when: { studentId: 9, origin: 'chloe_first_to_leave', ...EARLY },
    weight: W,
    text: [
      'I left family to find a table that would keep feeding me. Found it.',
    ],
  },
]);
