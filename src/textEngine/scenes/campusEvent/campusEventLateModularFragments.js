// Campus floor-event beats — late-game hall-tone frame on observation + result.
import { registerModuleVariants } from '../../engine.js';

const CAMPUS_BEAT_LATE = '{campusEvent.scene.hallTone|prefix:} {campusEvent.observation|prefix:} {campusEvent.result|prefix: }';

registerModuleVariants('campusEvent.beat', [
  {
    when: { weekMin: 22 },
    weight: 6,
    priority: 6,
    text: [CAMPUS_BEAT_LATE],
  },
  {
    when: { weekMin: 16 },
    weight: 4,
    priority: 4,
    text: [CAMPUS_BEAT_LATE],
  },
]);
