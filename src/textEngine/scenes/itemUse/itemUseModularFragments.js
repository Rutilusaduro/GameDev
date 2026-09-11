// Item feed open beat — late-game hall-tone frame.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('item.use.lateFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'You set the offering down like floor policy — generous, unhurried, already expected.',
      'Hall Ambiance hums in the hallway; inside, appetite answers before words do.',
      'Late-semester treats land soft — wellness framing thin, portions unmistakable.',
      'The room learns to say yes; the {item.label} is just the excuse everyone wanted.',
      'Co-conspirator energy thickens; {subject.name} reaches before the lecture finishes.',
    ],
  },
]);

const OPEN_LATE = '{item.use.lateFrame|prefix:} {hall.blueprint.permission|prefix: }';

registerModuleVariants('item.use.open', [
  {
    when: { weekMin: 20 },
    weight: 6,
    priority: 5,
    text: [OPEN_LATE],
  },
  {
    when: { weekMin: 14 },
    weight: 4,
    priority: 3,
    text: [OPEN_LATE],
  },
  {
    when: { studentId: 13 },
    weight: 4,
    text: [
      'Daisy sets the {item.label} on a napkin like church potluck. "{subject.name}, eat, sugar."',
    ],
  },
  {
    when: { studentId: 5 },
    weight: 4,
    text: [
      'Destiny grabs the {item.label} without looking up from chat. "Loot acquired."',
    ],
  },
  {
    when: { stageMin: 7 },
    weight: 2,
    text: [
      'The {item.label} disappears into {subject.name} at scale — calories becoming geography.',
    ],
  },
]);
