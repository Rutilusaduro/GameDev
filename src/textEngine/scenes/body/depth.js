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
    'A small serene face above so much of her; she looks pleased to be looked at.',
  ] },
  { when: { corruption: [0], stageMin: 2, stageMax: 5 }, weight: 2, text: [
    '{subject.name} keeps almost meeting your eyes, then does, color high.',
    'Her mouth is busy not commenting on the softness in her face.',
  ] },
  { when: { corruption: [1] }, weight: 2, text: [
    '{subject.name}\'s face has gone honest — no performance left in the jaw.',
    'She watches you watch her and lets the looking finish.',
  ] },
  { when: { corruption: [2], stageMin: 3 }, weight: 2, text: [
    '{subject.name} wears the extra cheek like a decision she is proud of.',
    'Her smile takes longer now; there is more face for it to cross.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'Hunger lives in her eyes; the rest of the face is just catching up.',
    '{subject.name} looks at you the way a kitchen looks at a delivery.',
  ] },
  { when: {}, text: [
    '{subject.name}\'s expression is attentive, readable.',
    'Her face catches the light — open, unhurried.',
    'She looks at you the way she looks at food: interested.',
    'A warmth sits in her cheeks that has nothing to do with the room.',
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
  { when: { bodyType: ['apple', 'rotund'], stageMin: 4 }, weight: 2, text: [
    'Her belly is the conversation — round, forward, already warm from the last meal.',
    'The middle of her arrives first and stays; {word.clothingFit}.',
  ] },
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 4 }, weight: 2, text: [
    'The torso is the supporting act; the real mass is waiting lower, and you can see the handover.',
    'A softer waist above hips that have already taken the lead; {word.clothingFit}.',
  ] },
  { when: { bodyType: ['topHeavy', 'voluptuous'], stageMin: 4 }, weight: 2, text: [
    'Chest first, always — a heavy shelf of softness resting on whatever belly she has grown.',
    'The upper half of her is a warm argument; {word.clothingFit}.',
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    'She lets the torso take the light — belly, bust, the lot of it, unapologetic.',
    'Her middle is presented, not hidden; {word.clothingFit}.',
  ] },
  { when: {}, text: [
    '{word.body|cap} across her torso; {word.clothingFit}.',
    'Her middle rounds softly — {word.body}, {word.clothingFit}.',
    'Torso full and warm; {word.clothingFit}.',
    'Warmth gathers under the fabric at her middle and stays there.',
  ] },
]);

registerPool('body.lower', [
  { when: { bodyType: ['pear'], stageMin: 4 }, weight: 2, text: [
    'Hips and thighs spread wide — pear-shaped heft settling low.',
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
  { when: { bodyType: ['apple', 'rotund'], stageMin: 5 }, text: [
    'Thighs doing their share while the belly keeps the title; she sits wide anyway.',
    'Lower body rounded in support of a middle that does most of the talking.',
  ] },
  { when: { relationship: [2, 3], stageMin: 4 }, weight: 2, text: [
    'Hips and thighs spread toward you without the old tuck-in.',
    'She lets the chair take the width; there is more of her to take.',
  ] },
  { when: {}, text: [
    'Hips and thighs soft with recent gain.',
    'Her legs spread comfortably; the chair knows her now.',
    'Lower body rounded, unhurried, warm.',
    'A slow heat lives where thigh meets thigh.',
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
  { when: { mood: ['tired'] }, text: [
    'She lets the chair keep her; standing up is a later problem.',
    'Stillness suits her — the body is already doing enough by being this much.',
  ] },
  { when: { isGaining: true, stageMin: 2 }, weight: 2, text: [
    'This week\'s extra shows when she shifts — a later sway, a deeper sit.',
    'She moves like someone still meeting the new weight halfway.',
  ] },
  { when: {}, text: [
    'She settles into stillness easily — body at rest, comfortable.',
    'Movement unremarkable for now; she carries her weight like habit.',
    'She shifts, fabric whispering, and stays.',
    'When she stops, the softness takes another second to arrive.',
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
    // '{body.portrait}' retired here: the legacy monolith repeats its own
    // imagery internally (44% triple-stem rate vs 0.3% slot-composed) and
    // dedupe cannot reach inside a single text. Still the rescue fallback
    // in body/index.js when this skeleton renders empty.
    '{body.face} {body.torso} {body.lower} {body.movement}',
    '{body.face} {body.torso} {word.clothingFit}.',
  ] },
]);
