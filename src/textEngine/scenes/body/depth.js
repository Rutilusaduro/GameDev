// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A2 Psych
// Semantic body skeleton — face/torso/lower/movement + mood/fullness selectors (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';

registerPool('body.face', [
  { when: { mood: ['happy', 'excited', 'content'], corruption: [1, 2] }, weight: 2, text: [
    '{subject.name}\'s face is open and warm — cheeks soft, eyes bright with easy pleasure.',
    'Color high in her cheeks; {subject.first} looks pleased to be looked at.',
    'She meets your gaze without flinching, smile lingering around the mouth.',
  ] },
  { when: { mood: ['stressed', 'nervous'], corruption: [0] }, weight: 2, text: [
    '{subject.name} keeps her eyes down, color rising when you notice her.',
    'A flush climbs her throat — embarrassment and appetite braided together.',
    'She bites her lip, {word.psychVoice}.',
  ] },
  { when: { mood: ['tired'] }, text: [
    '{subject.name}\'s face is soft with exhaustion, eyelids heavy.',
    'She looks half-melted into the chair, expression unguarded.',
  ] },
  { when: { stageMin: 8 }, text: [
    '{subject.name}\'s features settle into the calm authority of scale.',
    'Her face frames abundance without apology — round, warm, present.',
  ] },
  { when: {}, text: [
    '{subject.name}\'s expression is attentive, readable.',
    'Her face catches the light — open, unhurried.',
    'She looks at you the way she looks at food: interested.',
  ] },
]);

registerPool('body.torso', [
  { when: { fullnessMin: 0.9 }, weight: 3, text: [
    'Her middle is drum-tight with fullness — {word.breathQuality}.',
    'Belly high and packed; fabric strains across her torso.',
    'Fullness gathers under her ribs, warm and unmistakable.',
  ] },
  { when: { stageMin: 6, relSize: ['larger', 'muchLarger'] }, weight: 2, text: [
    'Her torso dominates the frame — {word.body}, breadth unmistakable.',
    'Chest and belly share the spotlight; she takes up the chair completely.',
  ] },
  { when: { season: ['winter'] }, text: [
    'Layers cling to her middle; warmth radiates through wool and fleece.',
    'Winter makes her look softer — bulk friendly, appetite visible.',
  ] },
  { when: {}, text: [
    '{word.body|cap} across her torso; {word.clothingFit}.',
    'Her middle rounds softly — {word.body}, {word.clothingFit}.',
    'Torso full and warm; {word.clothingFit}.',
  ] },
]);

registerPool('body.lower', [
  { when: { bodyType: ['pear'], stageMin: 4 }, weight: 2, text: [
    'Hips and thighs spread wide — pear-shaped abundance settling low.',
    'Her lower body pools into the seat, thighs pressing together warmly.',
  ] },
  { when: { bodyType: ['hourglass'], stageMin: 4 }, text: [
    'Curves cinch and flare; hips and thighs carry weight with deliberate grace.',
    'Her lower half balances the fullness above — hourglass geometry at scale.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Thighs thick enough to reshape any chair; movement starts slow.',
    'Her lower body leads when she walks — mass swinging gentle and sure.',
  ] },
  { when: {}, text: [
    'Hips and thighs soft with recent gain.',
    'Her legs spread comfortably; the chair knows her now.',
    'Lower body rounded, unhurried, warm.',
  ] },
]);

registerPool('body.movement', [
  { when: { stageMin: 9 }, weight: 2, text: [
    'She moves like architecture — deliberate, weighted, impossible to rush.',
    'Every step negotiates mass; the room adjusts around her.',
  ] },
  { when: { fullnessMin: 1.0 }, text: [
    'She shifts carefully, {word.breathQuality} — movement measured around fullness.',
    'Getting up takes a moment; she breathes through the effort without complaint.',
  ] },
  { when: { mood: ['excited', 'happy'] }, text: [
    'Energy still lives in her — hips sway, belly bounces softly when she laughs.',
    'She moves with appetite in her limbs, unselfconscious and pleased.',
  ] },
  { when: {}, text: [
    'She settles into stillness easily — body at rest, comfortable.',
    'Movement unremarkable for now; she carries her weight like habit.',
    'She shifts, fabric whispering, and stays.',
  ] },
]);

registerPool('body.portrait.depth', [
  { when: { relationship: [3, 4] }, weight: 2, text: [
    '{body.face} {body.torso} {body.lower} {body.movement}',
    '{body.face} {body.torso} She leans toward you — devoted, heavy, warm. {body.movement}',
  ] },
  { when: { mood: ['stressed', 'nervous'], corruption: [0] }, weight: 2, text: [
    '{body.face} {body.torso} {body.lower}',
    '{body.face} {body.torso} She catches you looking and goes pink. {body.lower}',
  ] },
  { when: { fullnessMin: 0.85 }, weight: 2, text: [
    '{body.face} {body.torso} {body.lower} {body.movement}',
  ] },
  { when: {}, text: [
    '{body.face} {body.torso} {body.lower}',
    '{body.portrait}',
    '{body.face} {body.torso} {word.clothingFit}.',
  ] },
]);
