// The Squad — Lead: A2 Psych | Support: A7 Artisan
// Hunger-tier voice + physical sensation pools (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';

registerPool('hunger.voice', [
  { when: { inWithdrawal: true, addictionLevelMin: 2 }, weight: 3, text: [
    '{subject.name} eats with shaking hands until the plate is clean — withdrawal making every bite urgent.',
    'The food arrives and {subject.name} stops pretending she can wait. "I needed this," she breathes.',
    '{subject.name} does not taste the first bites. She only knows the ache is finally quieting.',
  ] },
  { when: { hungerTier: [4], corruption: [2] }, weight: 3, text: [
    '{word.hungerPhrase|cap}. {subject.name} pulls the dish toward herself before you sit down.',
    'Starving and shameless: {subject.name} is already eating when you arrive.',
    '{subject.name}, mouth full: "Don\'t make me wait. You know what this feels like."',
  ] },
  { when: { hungerTier: [3, 4], corruption: [1] }, weight: 2, text: [
    '{word.hungerPhrase|cap}. {subject.name} keeps glancing at the food between sentences.',
    'Hunger wins the argument before shame can speak: {subject.name} reaches for seconds.',
    '{subject.name} eats faster than she means to. "Sorry — I was thinking about this all day."',
  ] },
  { when: { hungerTier: [2, 3], mood: ['stressed', 'tired', 'nervous'] }, weight: 2, text: [
    '{word.hungerPhrase|cap}. {subject.name} eats like comfort, not ceremony.',
    'Stress and appetite braid together: {subject.name} cleans the plate without looking up.',
    '{subject.name} exhales after the first bite. "I didn\'t realize how hungry I was."',
  ] },
  { when: { hungerTier: [1, 2], corruption: [0] }, text: [
    '{word.hungerPhrase|cap}. {subject.name} eats carefully, as if surprised by her own appetite.',
    '{subject.name} pauses mid-bite. "I shouldn\'t want this much." She keeps eating anyway.',
    'Appetite arrives before permission: {subject.name} finishes what you set in front of her.',
  ] },
  { when: { mood: ['happy', 'excited', 'content'] }, text: [
    '{subject.name} eats with easy pleasure, {word.hungerPhrase}.',
    'Good mood makes room for appetite: {subject.name} savors each bite.',
    '{subject.name} hums quietly between forkfuls, unbothered by how much is left.',
  ] },
  { when: {}, text: [
    '{subject.name} eats steadily, {word.hungerPhrase}.',
    'Appetite ordinary for the hour — {subject.name} works through the plate without drama.',
    '{subject.name} focuses on the food the way she focuses on anything you put in front of her.',
  ] },
]);

registerPool('hunger.physical', [
  { when: { fullnessMin: 1.1 }, weight: 3, text: [
    '{word.breathQuality|cap}; her middle drum-tight with food.',
    'Belly packed and warm — {subject.name} breathes around the fullness.',
    'Each swallow adds to a belly already at its limit; she does not stop.',
  ] },
  { when: { fullnessMin: 0.85, hungerTierMin: 3 }, text: [
    'Hunger and fullness argue in her body at once — {word.breathQuality}.',
    'She is full and still eating; {word.breathQuality}.',
    'Appetite outruns capacity: {subject.name} presses a hand to her swelling middle and continues.',
  ] },
  { when: { fullnessMin: 0.6 }, text: [
    'Warmth spreads through her middle as she eats — {word.breathQuality}.',
    'Her belly rounds softly with each course; {word.breathQuality}.',
    'Fullness gathers low and pleasant; {word.breathQuality}.',
  ] },
  { when: { hungerTierMin: 3 }, text: [
    'Her stomach insists — {word.hungerPhrase}, body leaning toward the plate.',
    'Hunger sits physical in her middle before the first bite lands.',
    'She shifts restlessly; appetite has a weight of its own.',
  ] },
  { when: {}, text: [
    'She eats without strain — {word.breathQuality}.',
    'Body accepting food easily; {word.breathQuality}.',
    'No unusual resistance yet — {word.breathQuality}.',
  ] },
]);

registerPool('feed.voice', [
  { when: { corruption: [0], hungerTierMin: 3 }, weight: 2, text: [
    '{hunger.voice}',
    '{hunger.physical} {hunger.voice}',
  ] },
  { when: { corruption: [1, 2] }, weight: 2, text: [
    '{corruption.voice}',
    '{hunger.physical} {corruption.voice}',
    '{hunger.voice} {corruption.voice}',
  ] },
  { when: { hungerTierMin: 2 }, text: [
    '{hunger.voice}',
    '{hunger.physical}',
  ] },
  { when: {}, text: ['{corruption.voice}'] },
]);
