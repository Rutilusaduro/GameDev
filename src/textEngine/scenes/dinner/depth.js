// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Dinner depth skeleton — setup/courseReaction/endReflection/exit (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';

registerPool('dinner.setup', [
  { when: { relationship: [3, 4], season: ['winter'] }, weight: 2, text: [
    'Candlelight and winter cold outside — {subject.name} sheds her coat and stays close to the warmth.',
    'The table is set; {subject.name} arrives already hungry, pleased you chose this place.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    '{subject.name} scans the menu before sitting — {word.hungerPhrase}, appetite ahead of ceremony.',
    'She orders before you finish greeting the host — hunger winning politeness.',
  ] },
  { when: { corruption: [2] }, text: [
    '{subject.name} settles in like someone who expects to be fed well.',
    'She smiles at the menu the way she smiles at you — already anticipating excess.',
  ] },
  { when: {}, text: [
    'The evening opens easily — {subject.name} relaxed, table ready.',
    '{subject.name} takes her seat; the restaurant hums around you.',
    'Plates and wine arrive; {subject.name} looks pleased to be here.',
  ] },
]);

registerPool('dinner.courseReaction', [
  { when: { fullnessMin: 0.95 }, weight: 3, text: [
    'She eats anyway — {word.breathQuality}, fork still moving.',
    'Fullness barely slows her; {subject.name} cleans the plate with stubborn pleasure.',
    'Belly high; she loosens something and reaches for more.',
  ] },
  { when: { corruption: [0], fullnessMin: 0.7 }, weight: 2, text: [
    '{subject.name} pauses mid-bite, guilty and interested. She keeps eating.',
    'She eats carefully, as if surprised by how much room she still has.',
  ] },
  { when: { corruption: [2], hungerTierMin: 2 }, weight: 2, text: [
    '{subject.name} moans quietly through the first bite — shameless, grateful.',
    'She feeds herself with open want; the table notices and she does not care.',
  ] },
  { when: { mood: ['happy', 'excited'] }, text: [
    '{subject.name} savors each course, humming between forkfuls.',
    'Good mood makes every dish taste better; she eats like celebration.',
  ] },
  { when: {}, text: [
    '{subject.name} works through the course steadily — appetite ordinary, present.',
    'She eats without drama; the plate empties.',
    'Fork steady, {word.hungerPhrase}; she finishes what you ordered.',
  ] },
]);

registerPool('dinner.endReflection', [
  { when: { fullnessMin: 1.0, corruption: [1, 2] }, weight: 3, text: [
    'She sits back, belly drum-tight, and smiles like this is exactly what she wanted.',
    'Full and pleased — {subject.name} presses a hand to her middle, checking, appreciating.',
  ] },
  { when: { relationship: [3, 4] }, weight: 2, text: [
    '"Feed me like this every week," {subject.name} murmurs, "and I\'ll never pretend I\'m not yours."',
    'She catches your eye afterward — soft, heavy, grateful.',
  ] },
  { when: { mood: ['content', 'warm'] }, text: [
    '{subject.name} exhales, satisfied; the evening sits warm in her body.',
    'Contentment pools with fullness — she looks at ease in the chair.',
  ] },
  { when: {}, text: [
    '{dinner.endOpen} {dinner.endClose}',
    '{subject.name} settles back as the plates clear — full, warm, pleased.',
  ] },
]);

registerPool('dinner.exit', [
  { when: { stageMin: 7 }, weight: 2, text: [
    'Getting up takes a moment; she breathes through it, belly leading the way out.',
    'She waddles to the door unselfconscious — mass in motion, evening complete.',
  ] },
  { when: { corruption: [2] }, text: [
    'She pats her belly walking out. "Same time next week?" It isn\'t a question.',
    'Outside, cold air meets warm fullness; she laughs and leans on your arm.',
  ] },
  { when: {}, text: [
    'You step into the night — {subject.name} full, the restaurant behind you.',
    'The evening ends with quiet satisfaction and a slow walk home.',
    'She buttons her coat over fullness and smiles.',
  ] },
]);

registerPool('dinner.depth', [
  { when: {}, text: [
    '{dinner.setup} {dinner.courseReaction} {dinner.endReflection} {dinner.exit}',
    '{dinner.setup} {dinner.courseReaction} {dinner.endReflection}',
  ] },
]);
