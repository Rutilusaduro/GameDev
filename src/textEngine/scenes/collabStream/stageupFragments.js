// Collab stream — stage-up threshold beats (skeleton + fragments).
import { registerPool } from '../../engine.js';

registerPool('collab.stageup.alert', [
  { when: { collabStage: [0, 1] }, text: [
    'The scale app updates on the secondary screen and you catch it in peripheral vision — you stop mid-sentence.',
    'The chat sees the number before you finish saying it; caps lock rolls like thunder.',
    'The weight app flashes on the monitor and the room holds one breath.',
    'Someone in chat types the digits back at you before your mouth catches up.',
  ]},
  { when: { collabStage: [2, 3] }, text: [
    'The alert fires on the monitor — you let it sit three seconds while the chat does the math.',
    'The threshold hits and you see it on the monitor before {partnerName} says a word.',
    'The donation bar twitches. The number on the secondary screen is new.',
    'Viewers repeat the weight in chat like a chant building.',
  ]},
  { when: { collabStage: [4, 5] }, text: [
    'You see it in {partnerName} before the monitor confirms — breath, hands, new geography.',
    'She goes very still. Both hands flat on her belly. One second with eyes closed.',
    'The room feels the threshold before the app announces it.',
    'Wren types the number in chat at the same moment the monitor agrees.',
  ]},
  { when: {}, text: [
    'The scale updates on stream and the chat erupts before you speak.',
    'The secondary screen flashes — everyone watching knows what it means.',
    'Momentum pauses on a number the whole room can read.',
  ]},
]);

registerPool('collab.stageup.announce', [
  { when: {}, text: [
    'You look at the camera. "{partnerName} just crossed {newLbs} pounds."',
    '"{partnerName} just crossed {newLbs} pounds," you say, clearly into the mic.',
    '"{newLbs} pounds," you announce. "On stream. Tonight."',
    'You read the number like a gift: "{newLbs} for {partnerName}, live."',
  ]},
]);

registerPool('collab.stageup.partner', [
  { when: { collabStage: 0 }, text: [
    '{partnerName} looks down — hands on a belly rounder than when the stream started — and the mic catches a quiet "oh."',
    'She touches her stomach like the number is news and also exactly what she expected.',
    '{partnerName} exhales; the chat treats the silence like content.',
  ]},
  { when: { collabStage: 1 }, text: [
    '{partnerName} looks at her belly, then the camera: "more." She means food. The chat means the same.',
    'She presses both palms to the forward curve of her gut and smiles without performing.',
    'Warmth shows in how she sits — heavier, unhurried, still eating.',
  ]},
  { when: { collabStage: [2, 3] }, text: [
    '"{newLbs} pounds," {partnerName} says — just the number. Just that.',
    'She keeps one hand under the forward curve, feeling weight settle while donations jump.',
    '{partnerName} meets the lens; appetite honest on her face.',
  ]},
  { when: { collabStage: [4, 5] }, text: [
    'She opens her eyes, looks at the camera, and says "{newLbs} pounds" like testimony.',
    '{partnerName} is enormous and warm — heavier than an hour ago, still hungry.',
    'She does not apologize for the size of her; the stream would not want her to.',
  ]},
  { when: {}, text: [
    '{partnerName} answers the number with touch — belly, thighs, the fact of her on camera.',
    'She lets the chat scream while she keeps chewing.',
    'Her body proves the digits before anyone finishes typing.',
  ]},
]);

registerPool('collab.stageup.chat', [
  { when: { collabStage: [0, 1, 2] }, text: [
    'The chat goes wild. Regulars translate for newcomers; newcomers donate anyway.',
    'Comments scroll faster than you can read. Tips flicker green.',
    'Wren fires a line the moment the number lands — of course she does.',
  ]},
  { when: { collabStage: [3, 4, 5] }, text: [
    'Wren donates enough to buy the next course before you ask.',
    'The platform feature was deserved; the chat acts like it planned this.',
    'Viewer count spikes. Someone in the building is watching — you can feel it.',
  ]},
  { when: {}, text: [
    'The chat does not wait for you to finish the sentence.',
    'Engagement spikes — appetite made communal.',
    'Caps lock encouragement. The room leans in.',
  ]},
]);

registerPool('collab.stageup.close', [
  { when: {}, text: [
    'You reach for the next plate. You are not done.',
    'Food remains on the table. You intend to use it.',
    'I reach for the plate. We keep going.',
    'The stream continues — bellies forward, hunger honored.',
  ]},
]);

const STAGEUP_SKELETONS = [
  '{collab.stageup.alert} {collab.stageup.announce} {collab.stageup.partner} {collab.stageup.close}',
  '{collab.stageup.alert}\n\n{collab.stageup.announce}\n\n{collab.stageup.partner}\n\n{collab.stageup.chat}\n\n{collab.stageup.close}',
  'On stream:\n\n{collab.stageup.announce}\n\n{collab.stageup.partner}\n\n{collab.stageup.close}',
  '{collab.stageup.announce} {collab.stageup.partner} {collab.stageup.chat} {collab.stageup.close}',
];

for (let si = 0; si < 6; si += 1) {
  registerPool(`collab.stream.stageup.compose.s${si}`, [
    {
      when: { collabStage: [si] },
      priority: 1,
      text: STAGEUP_SKELETONS,
    },
    { when: {}, text: STAGEUP_SKELETONS },
  ]);
}
