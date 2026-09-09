// The Squad — Lead: A2 Psych | Support: A1 Mobile, A5 Editor
// V2.0 resonance depth layer — stage-keyed long-form variants
import { registerPool } from '../../../engine.js';

registerPool('res.link.depth', [
  { when: { stageMin: 9 }, text: [
    'The wire hums between them — appetite made conductive. When one swells, the other will feel it in her ribs before the week admits what happened.',
    'You bind two bodies already learning scale. Craving will travel the link like heat through shared walls.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Something invisible stitches their hunger together. Softness on one side of campus answers softness on the other.',
    'The pact is quiet. The consequences will not be — linked residents eat in stereo now.',
  ]},
  { when: { stageMin: 2 }, text: [
    'A thread forms where none existed. She will taste her sister\'s appetite before she names it hers.',
    'Linked — not by friendship alone, but by hunger learning to echo.',
  ]},
  { when: {}, text: [
    'Appetite braided between them. When one opens her mouth, the other will feel the invitation.',
    'The resonance link settles like a secret — warm, hungry, impossible to untie cleanly.',
  ]},
]);

registerPool('res.pulse.depth', [
  { when: { stageMin: 8 }, text: [
    'The pulse lands heavy — a sympathetic swell through linked flesh, bellies answering bellies across distance.',
    'She did not eat, and yet fullness arrives anyway — borrowed warmth from someone else\'s surrender.',
  ]},
  { when: { stageMin: 4 }, text: [
    'A tremor of want crosses the wire. Her stomach contracts with hunger that is not entirely hers.',
    'Resonance translates feeding into feeling — appetite contagious as laughter.',
  ]},
  { when: {}, text: [
    'Somewhere linked, a mouth closes full. Here, another opens without quite knowing why.',
    'The pulse is subtle first — a hollow, a warmth, the ghost of someone else\'s bite.',
  ]},
]);

registerPool('res.surge.depth', [
  { when: { stageMin: 7 }, text: [
    'The network peaks — hall-wide hunger rolling like weather. Delivery apps sing in chorus. Bellies rise in synchrony.',
    'Hive appetite: one surge, many bodies, the whole roster humming with borrowed want.',
  ]},
  { when: { stageMin: 3 }, text: [
    'Linked residents feel it together — a wave of craving that turns snack drawers into shared altars.',
    'The surge passes through the web. Fullness echoes. Nobody eats alone tonight.',
  ]},
  { when: {}, text: [
    'Resonance swells beyond pairs — appetite contagious, immediate, campus-wide among the linked.',
    'A chord of hunger no single resident started alone. Resonance deepens through the harmony.',
  ]},
]);
