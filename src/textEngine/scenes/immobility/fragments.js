// The Squad — Lead: A3 Immobility | Support: A5 Editor
import { registerPool } from '../../engine.js';

registerPool('immob.settledState', [
  { when: { stageMin: 10, stageMax: 10 }, text: [
    '{subject.name} has settled into the room the way weather settles — vast, warm, not going anywhere soon.',
    'She rests as immobile abundance — the room organized around her presence.',
    'At blob scale, movement is optional. She has opted out for now.',
    'Her mass fills the available space with the patience of something geological.',
    'She is present the way a landscape is present — total, warm, immobile.',
    'The room holds her the way a basin holds water — completely, without argument.',
    'She exists in place, plush and vast, the floor familiar with her weight.',
    'Immobility is not distress. It is the natural state of enough mass in one place.',
  ] },
  { when: { stageMin: 11 }, weight: 2, text: [
    '{subject.name} is the room\'s warm center of gravity — leviathan scale, barely mobile, entirely present.',
    'She has become architectural — flesh at a scale the building did not anticipate.',
    'The leviathan rests: impossibly vast, warm, the floorboards a long memory.',
    'She fills the space the way warmth fills a blanket — completely, softly, without edges.',
    'At this scale, position is description. She is where she is.',
    'Movement is assisted transfer now. Rest is the default state.',
    'She is abundance made stationary — soft rolls, deep warmth, total presence.',
    'The room bends around her without complaint. She has learned its angles.',
  ] },
  { when: {}, text: [
    '{subject.name} rests, vast and warm.',
    'She has settled into stillness.',
  ] },
]);

registerPool('immob.spaceObs', [
  { when: { stageMin: 10 }, text: [
    'The doorframe is a theoretical concern from here.',
    'Furniture has been demoted to geography.',
    'The walls are closer than they used to be — or she is larger. Same outcome.',
    'Space is defined by her presence before anything else.',
    'The room was not built for this. It accommodates anyway.',
    'Doorways, chairs, and assumptions have all been revised.',
  ] },
  { when: { stageMin: 11 }, weight: 2, text: [
    'The architecture has made peace with impossible scale.',
    'Walls she can brace against. Angles that work. Floor that knows her.',
    'The room is smaller than she is — this is simply fact now.',
    'Space negotiates with mass. Mass has not lost a negotiation in months.',
    'The bed frame adapted. The floor adapted. The building is still catching up.',
    'She knows which surfaces sound like what under her. Practical knowledge.',
  ] },
  { when: {}, text: ['The room holds her.', 'Space accommodates.'] },
]);

registerPool('immob.environmental', [
  { when: { stageMin: 10 }, text: [
    'Sound arrives before sight — floorboards, breath, the small creak of furniture under load.',
    'Her presence has an audio signature the room recognizes.',
    'Warmth radiates from immobile mass — the air thicker near her.',
  ] },
  { when: { stageMin: 11 }, text: [
    'Before you see her, you hear her — the floor, the furniture, the air rearranging.',
    'The room sounds different when she is in it. Fuller. Warmer.',
  ] },
  { when: {}, text: ['The room is quiet around vast warmth.'] },
]);

registerPool('immob.attempt', [
  { when: {}, text: ['', '', ''] },
  { when: { stageMin: 10 }, text: [
    'She considers movement — a shift, not a journey.',
    'An attempt to reposition: mass redistributing by degrees.',
  ] },
  { when: { stageMin: 11 }, text: [
    'A transfer attempt — assisted, incremental, honest about the physics.',
    'Movement at leviathan scale is architecture, not locomotion.',
  ] },
]);

registerPool('immob.attemptVerb', [
  { when: { stageMin: 10 }, text: ['shifts', 'redistributes', 'settles differently'] },
  { when: { stageMin: 11 }, text: ['ripples toward', 'surges by degrees', 'repositions'] },
  { when: {}, text: ['moves'] },
]);

registerPool('immob.assistClause', [
  { when: {}, text: ['', ''] },
  { when: { stageMin: 10 }, text: [
    'furniture failing forward in small, helpful ways',
    'the chair surrendering its shape to assist',
    'momentum doing what muscles cannot',
  ] },
  { when: { stageMin: 11 }, text: [
    'assisted by angles she has learned to use',
    'braced against walls that have become tools',
    'the floor receiving redistribution without complaint',
  ] },
]);

registerPool('immob.assistance', [
  { when: {}, text: ['', ''] },
  { when: { stageMin: 10 }, text: [
    ', {immob.assistClause}',
    ' — {immob.assistClause}',
  ] },
]);

registerPool('immob.bodyDesc', [
  { when: { stageMin: 10 }, text: [
    'soft rolls settling into familiar geography',
    'warmth spreading in layers no garment covers',
    'flesh at rest — vast, yielding, content',
    'abundance pooled where gravity directs it',
    'a landscape of softness the room organizes around',
  ] },
  { when: { stageMin: 11 }, weight: 2, text: [
    'endless soft folds, warm and impossibly heavy',
    'mass that has become the room\'s primary feature',
    'flesh beyond ordinary proportion — plush, immobile, adored by gravity',
    'rolls and warmth extending past every familiar measurement',
    'a body that answers to no one\'s schedule',
  ] },
  { when: {}, text: ['vast warm softness'] },
]);

registerPool('immob.register', [
  { when: { corruption: [0] }, text: [
    `"This is a lot," she says quietly — not distress, simply fact.`,
    `She looks at her own vastness with the expression of someone still doing math.`,
  ] },
  { when: { corruption: [1] }, text: [
    `"I know," she says, when you look. "I know what I am now."`,
    `She meets your eyes without the old flinch. The size is just size.`,
  ] },
  { when: { corruption: [2] }, text: [
    `"Beautiful, isn't it," she says — not a question.`,
    `"I'm not done," she murmurs, settled and certain.`,
    `She smiles at her own immensity the way you smile at something you chose.`,
  ] },
  { when: { stageMin: 11 }, weight: 2, text: [
    `"The room fits," she says, and means herself.`,
    `"I know which walls work," she says, practical as weather.`,
  ] },
  { when: {}, text: [
    `She rests without commentary.`,
    `Silence — vast, warm, sufficient.`,
  ] },
]);
