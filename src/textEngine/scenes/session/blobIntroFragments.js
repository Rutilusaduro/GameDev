// Blob private session intro — composable scale + mass slots.
import { registerPool, registerModuleVariants } from '../../engine.js';
import { BLOB_PRIVATE_INTRO } from '../../../gameData/students.js';

registerPool('session.blobIntro.scale', [
  {
    when: {},
    weight: 2,
    text: [
      'The reinforced bed groans first — a greeting, not a warning.',
      'Furniture learned her size weeks ago; the room still acts surprised.',
      'Every surface is logistics now — trays, pillows, reachable hunger.',
    ],
  },
]);

registerPool('session.blobIntro.mass', [
  {
    when: {},
    weight: 2,
    text: [
      'Mass fills the doorway before she does; appetite follows like weather.',
      'She arrives as landscape — soft, vast, already halfway fed.',
      'The session starts where movement ends and feeding begins.',
    ],
  },
]);

const BLOB_SKELETON = '{session.blobIntro.scale|prefix:} {session.blobIntro.mass|prefix: }';

for (const studentId of Object.keys(BLOB_PRIVATE_INTRO)) {
  const key = studentId === 'default' ? 'default' : `s${studentId}`;
  registerModuleVariants(`session.blobIntro.${key}`, [
    {
      when: { weekMin: 12 },
      weight: 4,
      priority: 3,
      text: [BLOB_SKELETON],
    },
    {
      when: { weekMin: 5 },
      weight: 2,
      priority: 2,
      text: [BLOB_SKELETON],
    },
  ]);
}

registerModuleVariants('session.blobIntro.s5', [
  {
    when: { studentId: [5] },
    weight: 1,
    text: [
      'Forty-one seconds up the fold — Destiny times the climb like a speedrun category.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.s13', [
  {
    when: { studentId: [13] },
    weight: 1,
    text: [
      'Daisy’s door does not open wide anymore — meals arrive like hall policy written in steam and frosting.',
    ],
  },
]);

registerModuleVariants('session.blobIntro.default', [
  {
    when: { stageMin: [8] },
    weight: 1,
    text: [
      'Default blob intro tail — you climb warm geography; she receives you like the room always meant immobility.',
    ],
  },
]);
