// Scrutiny threshold beats — late-game institutional pressure overlays.
import { registerPool, registerModuleVariants } from '../../engine.js';

registerPool('scrutiny.threshold.echo', [
  {
    when: {},
    weight: 2,
    text: [
      'Administrative attention sharpens — paperwork follows appetite like a patient shadow.',
      'Tier pressure climbs; growth has a witness now, and the witness keeps a ledger.',
      'Late-semester scrutiny smells like toner cooling beside catered coffee.',
      'Wellness language thickens in memos; every approved tray reads like testimony.',
      'The institution counts what the hall celebrates — both stories fight for the file.',
    ],
  },
]);

const THRESHOLD_LATE = '{scrutiny.threshold.echo|prefix:} {scrutiny.tierUp.body|prefix: }';

registerModuleVariants('scrutiny.threshold.crossed', [
  {
    when: { scrutinyMin: [50], weekMin: 20 },
    weight: 6,
    priority: 6,
    text: [
      'Eyes multiply in the admin wing — every tray you approve reads like testimony.',
      THRESHOLD_LATE,
    ],
  },
  {
    when: { scrutinyMin: [40], weekMin: 14 },
    weight: 4,
    priority: 4,
    text: [THRESHOLD_LATE],
  },
]);
