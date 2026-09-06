// The Squad — Lead: A2 Psych | Support: A7 Artisan, A5 Editor
import { registerPool } from '../../engine.js';

// Shape: FULL SENTENCE. Generic ability-fire beat until per-form beats land.
registerPool('asc.ability.generic', [
  { when: { isAscended: true }, weight: 2, text: [
    '{subject.name} spends {word.essence} and the room answers.',
    'A measure of {word.essence} leaves her, turning intent into consequence.',
    '{subject.name} banks the choice in her body; the second climb shifts around it.',
    'The stored charge moves through her, practical and mythic at once.',
    'Mythic appetite becomes mythic action — {word.essence} spent, growth redirected.',
    'She channels {word.essence} the way rivers channel rain: inevitably, beautifully.',
  ]},
  { when: {}, text: [
    'The ability resolves cleanly.',
    'The stored charge becomes action.',
    'The choice lands, quiet and exact.',
    'Power moves through her smaller body like memory of vastness.',
    'The ability fires — precise, warm, hungry for consequence.',
  ]},
]);

// Shape: FULL SENTENCE. Essence refusal.
registerPool('asc.ability.refusal.essence', [
  { when: {}, text: [
    'Not enough {word.essence} yet.',
    'She needs more {word.essence} before that will answer.',
    'The reserve is too low; the ability waits.',
    'Her mythic charge is still gathering. Patience — or feeding.',
    '{word.essence} has not banked enough yet. Hunger must do more work first.',
  ]},
]);

// Shape: FULL SENTENCE. Cooldown refusal.
registerPool('asc.ability.refusal.cooldown', [
  { when: {}, text: [
    'The ability is still gathering.',
    'That power has not returned yet.',
    'The last use is still settling through her.',
    'She breathes through the cooldown — smaller body, vast patience.',
    'Not yet. The mythic pulse needs time to rebuild.',
  ]},
]);
