// The Squad — Lead: A2 Psych | Support: A7 Artisan
// Intimacy depth overlays — approach/bodyFeel/resistance/psychVoice/climax (DEPTH_PLAN §9d).
import { registerPool } from '../../engine.js';

registerPool('intimacy.approach', [
  { when: { corruption: [0], relationship: [1, 2], mood: ['nervous', 'stressed'] }, weight: 3, text: [
    '{subject.name} hovers at the threshold — curious, nervous, already warm.',
    'She approaches slowly, reading your face before she commits.',
  ] },
  { when: { corruption: [0], relationship: [1, 2] }, weight: 2, text: [
    '{subject.name} hesitates at the threshold — curious, nervous, already warm.',
    'She approaches slowly, reading your face before she commits.',
  ] },
  { when: { corruption: [1, 2], relationship: [3, 4], mood: ['warm', 'content', 'happy'] }, weight: 3, text: [
    '{subject.name} crosses the room like she belongs in your space.',
    'No hesitation — she comes to you already surrendered to the evening.',
  ] },
  { when: { corruption: [1, 2], relationship: [3, 4] }, weight: 2, text: [
    '{subject.name} crosses the room like she belongs in your space.',
    'No hesitation — she comes to you already surrendered to the evening.',
  ] },
  { when: { season: ['winter'], stageMin: 7 }, weight: 2, text: [
    'Mass arrives before she does — you feel her coming through the floor, shedding cold.',
    'She moves carefully, controlling the descent before she even reaches you.',
  ] },
  { when: { stageMin: 7 }, text: [
    'Mass arrives before she does — you feel her coming through the floor.',
    'She moves carefully, controlling the descent before she even reaches you.',
  ] },
  { when: { mood: ['tired'] }, text: [
    '{subject.name} drifts close — slow, heavy-lidded, willing.',
    'Fatigue makes her pliant; she finds you and stays.',
  ] },
  { when: {}, text: [
    '{subject.name} draws close — unhurried, present.',
    'She finds you where you are and stays.',
  ] },
]);

registerPool('intimacy.bodyFeel', [
  { when: { stageMin: 6, season: ['summer'] }, weight: 3, text: [
    'Warmth and weight settle against you — skin damp, belly soft, thighs broad, real.',
    'Summer heat and her body find yours; fullness presses through thin fabric.',
    'Sweat and softness — her belly yields warm against your hands.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'Warmth and weight settle against you — belly soft, thighs broad, real.',
    'Her body finds yours and stays; fullness presses through fabric.',
    'You feel the depth of her — give of flesh, heat beneath, weight that stays.',
    'Thighs spill across yours; belly rests heavy and patient against you.',
  ] },
  { when: { stageMin: 9 }, weight: 3, text: [
    'Vast warmth arrives in layers — belly, thigh, the slow tide of her breathing.',
    'Immobility has not reduced how much of her there is to feel. If anything, more.',
  ] },
  { when: { fullnessMin: 0.85, mood: ['content', 'warm'] }, weight: 3, text: [
    'She is full and warm against you — {word.breathQuality}, utterly at ease.',
    'Packed middle yields softly; contentment pools where you touch.',
  ] },
  { when: { fullnessMin: 0.85 }, weight: 2, text: [
    'She is full and warm against you — {word.breathQuality}.',
    'Packed middle yields softly; you feel every swallowed bite.',
  ] },
  { when: {}, text: [
    'Soft heat where she touches you — skin, fabric, appetite.',
    'Her body is generous against yours; you feel wanted.',
    'Warmth pools where she presses close — belly, thigh, the give of soft flesh.',
    'She is heavier than memory and softer than apology.',
  ] },
]);

registerPool('intimacy.resistance', [
  { when: { corruption: [0], shameTierMin: 1 }, weight: 3, text: [
    '"We shouldn\'t," she breathes — and does not pull away.',
    'Protest arrives thin and late; her body disagrees louder.',
  ] },
  { when: { corruption: [1] }, text: [
    'Resistance flickers, then folds — she wants this and hates wanting it.',
    'She almost argues, then exhales and leans in.',
  ] },
  { when: { corruption: [2] }, text: [
    'No resistance left — only appetite for your attention.',
    'She meets you halfway and keeps going.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('intimacy.encourages', [
  { when: { corruption: [2], relationship: [3, 4] }, weight: 2, text: [
    '"More," she breathes — wanting, unashamed.',
    'She pulls you closer without asking.',
  ] },
  { when: { corruption: [1] }, text: [
    '"Don\'t stop," she whispers — half plea, half permission.',
    'Encouragement arrives quiet and certain.',
  ] },
  { when: {}, text: [
    '"Yes," she says softly. "Like that."',
    'She meets your touch with open want.',
    '',
  ] },
]);

registerPool('intimacy.psychVoice', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Her voice wavers — {word.psychVoice}.',
    'She speaks carefully, as if the wrong word might confess too much.',
  ] },
  { when: { corruption: [1, 2] }, weight: 2, text: [
    'She talks softer than she means to — {word.psychVoice}.',
    'Words arrive unfiltered; {word.psychVoice}.',
  ] },
  { when: {}, text: ['{word.psychVoice}.'] },
]);

registerPool('intimacy.climax', [
  { when: { corruption: [2], relationship: [3, 4], mood: ['happy', 'excited'] }, weight: 3, text: [
    'She melts into it — full, wanted, shameless, laughing breathlessly.',
    'Pleasure lands open and unguarded; she does not hide her body.',
  ] },
  { when: { corruption: [2], relationship: [3, 4] }, weight: 2, text: [
    'She melts into it — full, wanted, shameless.',
    'Pleasure lands open and unguarded; she does not hide her body.',
  ] },
  { when: { corruption: [0], season: ['winter'] }, text: [
    'She trembles through it — overwhelmed, grateful, pink, seeking warmth.',
    'Release catches her off guard; she pulls you closer against the cold.',
  ] },
  { when: { corruption: [0] }, text: [
    'She trembles through it — overwhelmed, grateful, pink.',
    'Release catches her off guard; she laughs breathlessly afterward.',
  ] },
  { when: {}, text: [
    'The moment breaks open — warmth, weight, breath.',
    'She sighs, sated, still pressed close.',
  ] },
]);

registerPool('intimacy.depth', [
  { when: { corruption: [0] }, weight: 2, text: [
    '{intimacy.approach} {intimacy.bodyFeel} {intimacy.resistance} {intimacy.encourages} {intimacy.psychVoice}',
  ] },
  { when: {}, text: [
    '{intimacy.approach} {intimacy.bodyFeel} {intimacy.encourages} {intimacy.psychVoice} {intimacy.climax}',
    '{intimacy.approach} {intimacy.bodyFeel} {intimacy.climax}',
  ] },
]);
