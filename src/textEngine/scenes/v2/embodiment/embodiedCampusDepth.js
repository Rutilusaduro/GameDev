// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Per-student embodied campus event voice (ref-archetype keyed)
import { registerModuleVariants } from '../../../engine.js';

registerModuleVariants('emb.event.bully_forcefeed', [
  { when: { refArchetype: 'cheerleader' }, text: [
    '{ref.name} plants a hand on her shoulder like a captain reclaiming territory. "Squad eats together," she says, and means it.',
    '"Cheer standards," {ref.name} announces, shoving a protein shake and three pastries into her hands. "No exceptions."',
  ]},
  { when: { refArchetype: 'athlete' }, text: [
    '{ref.name} times the feeding like a race she intends to win. "Hydrate. Chew. Swallow. Again."',
    'Serena does not bully — she coaches. The portions are obscene and she calls them "recovery."',
  ]},
  { when: { refArchetype: 'sorority' }, text: [
    '{ref.name} makes it a chapter event. "Girls," she trills, "help her catch up." They do. Enthusiastically.',
    'Pastel aggression: {ref.name} slides a plate across the table and smiles like this is philanthropy.',
  ]},
]);

registerModuleVariants('emb.event.classmate_sighting', [
  { when: { refArchetype: 'quiet' }, text: [
    '{ref.name} sketches her from across the quad before she remembers to wave. "Sorry — you looked… different. Good different."',
  ]},
  { when: { refArchetype: 'psych' }, text: [
    '{ref.name} watches with clinical interest. "Noted," she says, and offers her coffee anyway.',
  ]},
]);
