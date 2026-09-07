// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Dinner depth skeleton — setup/courseReaction/endReflection/exit (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';

registerPool('dinner.setup', [
  { when: { relationship: [3, 4], season: ['winter'] }, weight: 2, text: [
    'Candlelight and winter cold outside — {subject.name} sheds her coat and stays close to the warmth.',
    'The table is set; {subject.name} arrives already hungry, pleased you chose this place.',
    'Frost on the windows; {subject.name} unwraps scarf and appetite together.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    '{subject.name} scans the menu before sitting — {word.hungerPhrase}, appetite ahead of ceremony.',
    'She orders before you finish greeting the host — hunger winning politeness.',
    'Her eyes find the bread basket before her coat hits the chair.',
    'She is already leaning toward the menu when you sit — {word.hungerPhrase}, no disguise.',
  ] },
  { when: { corruption: [2] }, text: [
    '{subject.name} settles in like someone who expects to be fed well.',
    'She smiles at the menu the way she smiles at you — already anticipating excess.',
    'She slides into the booth with practiced hunger — this is not her first feast.',
    'Her hand finds yours under the table. Her eyes find the appetizer list.',
  ] },
  { when: { stageMin: 6 }, text: [
    '{subject.name} chooses the wider booth without asking — experience, not vanity.',
    'The hostess leads you to a table with sturdy chairs. {subject.name} approves silently.',
  ] },
  { when: {}, text: [
    'The evening opens easily — {subject.name} relaxed, table ready.',
    '{subject.name} takes her seat; the restaurant hums around you.',
    'Plates and wine arrive; {subject.name} looks pleased to be here.',
    'Candlelight, clinking glass, and {subject.name} already eyeing the menu.',
    'The restaurant wraps you in warmth; {subject.name} unwraps her appetite.',
  ] },
]);

registerPool('dinner.courseReaction', [
  { when: { fullnessMin: 0.95 }, weight: 3, text: [
    'She eats anyway — {word.breathQuality}, fork still moving.',
    'Fullness barely slows her; {subject.name} cleans the plate with stubborn pleasure.',
    'Belly high; she loosens something and reaches for more.',
    'Her belly presses the table edge; she shifts and keeps eating.',
    'She breathes around fullness and takes another bite — pleasure winning arithmetic.',
  ] },
  { when: { corruption: [0], fullnessMin: 0.7 }, weight: 2, text: [
    '{subject.name} pauses mid-bite, guilty and interested. She keeps eating.',
    'She eats carefully, as if surprised by how much room she still has.',
    'Her hand rests on her middle; she exhales and reaches for the bread anyway.',
    'She slows, blushes, and finishes the plate — appetite louder than shame.',
  ] },
  { when: { corruption: [2], hungerTierMin: 2 }, weight: 2, text: [
    '{subject.name} moans quietly through the first bite — shameless, grateful.',
    'She feeds herself with open want; the table notices and she does not care.',
    'She licks sauce from her lip and orders dessert before the main is gone.',
    'Her belly swells visibly; she pats it and keeps going.',
  ] },
  { when: { mood: ['happy', 'excited'] }, text: [
    '{subject.name} savors each course, humming between forkfuls.',
    'Good mood makes every dish taste better; she eats like celebration.',
    'She laughs with food in her mouth and does not apologize.',
    'Happiness and hunger braid together — she eats like the night will never end.',
  ] },
  { when: { stageMin: 7 }, text: [
    '{subject.name} eats with the unhurried focus of someone who has made peace with volume.',
    'Each bite settles into mass she no longer pretends to hide.',
  ] },
  { when: {}, text: [
    '{subject.name} works through the course steadily — appetite ordinary, present.',
    'She eats without drama; the plate empties.',
    'Fork steady, {word.hungerPhrase}; she finishes what you ordered.',
    'She savors, swallows, and reaches for more wine — fullness building quietly.',
    'The course disappears at her pace — unhurried, thorough, satisfied.',
  ] },
]);

registerPool('dinner.endReflection', [
  { when: { fullnessMin: 1.0, corruption: [1, 2] }, weight: 3, text: [
    'She sits back, belly drum-tight, and smiles like this is exactly what she wanted.',
    'Full and pleased — {subject.name} presses a hand to her middle, checking, appreciating.',
    'Her belly rises and falls with slow breath; she looks drunk on fullness, not wine.',
    'She loosens her belt with a sigh that sounds like gratitude.',
  ] },
  { when: { relationship: [3, 4] }, weight: 2, text: [
    '"Feed me like this every week," {subject.name} murmurs, "and I\'ll never pretend I\'m not yours."',
    'She catches your eye afterward — soft, heavy, grateful.',
    '"More," she whispers, not to the waiter. To you.',
    'Her hand finds yours on her belly — warm, round, utterly content.',
  ] },
  { when: { mood: ['content', 'warm'] }, text: [
    '{subject.name} exhales, satisfied; the evening sits warm in her body.',
    'Contentment pools with fullness — she looks at ease in the chair.',
    'She smiles with her eyes half-closed, belly high, mind quiet.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She sits back and lets her belly settle — mass rearranging, evening complete.',
    'Fullness pools in her lap; she looks down at it with quiet approval.',
  ] },
  { when: {}, text: [
    '{dinner.endOpen} {dinner.endClose}',
    '{subject.name} settles back as the plates clear — full, warm, pleased.',
    'The meal sits heavy and happy in her body; she looks at ease.',
    'She exhales; the restaurant dims around a belly well fed.',
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
