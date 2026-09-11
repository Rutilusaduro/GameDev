// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Collab stream — short fragment pools for action popups.
import { registerPool } from '../../engine.js';

registerPool('collab.reveal.open', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'You announce {subject.name}\'s weight. Galley leftover still in her. The number is a second sitting.',
    'The scale goes live. Kitchen heat under the outfit. Chat gets both sittings.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You saw her after hours. Daylight stream uses the same appetite with a lens.',
  ] },
  { when: {}, text: [
    'You announce {subject.name}\'s weight on camera — clearly, into the mic.',
    'The number goes live: {subject.name}, {subject.lbs} pounds, no filter.',
    'You read the scale into the mic. {subject.lbs}. The chat holds its breath one beat.',
  ]},
]);

registerPool('collab.reveal.kylie.number', [
  { when: {}, text: [
    'The chat goes still for one second, then erupts.',
    'The chat catches the number before you finish saying it.',
    'Viewers type the digits back at you in caps.',
  ]},
]);

registerPool('collab.reveal.kylie.body', [
  { when: { stageMin: 6 }, text: [
    'At {subject.lbs} pounds the belly, the thighs, the full warm forward presence of her fills the frame.',
    '{subject.lbs} pounds — belly forward, thighs wide, unmistakable on camera.',
  ]},
  { when: {}, text: [
    '{subject.lbs} pounds — undeniable, enormous, visible in every angle the camera finds.',
    'The number lands and her body already proves it — soft, round, warm on stream.',
    '{subject.lbs} on camera — belly forward, thighs wide, chat typing before you finish.',
  ]},
]);

registerPool('collab.reveal.kylie.chat', [
  { when: {}, text: [
    'The chat says: yes. The chat means: more.',
    'New viewers do math in real time. Regulars just cheer.',
    'Donations tick upward before the echo fades.',
  ]},
]);

registerPool('collab.reveal.partner.number', [
  { when: {}, text: [
    '{partnerName}\'s weight announced on camera: {partnerLbs} pounds.',
    'You read {partnerLbs} pounds for {partnerName} into the mic.',
    '"{partnerLbs}," you say. The chat repeats it instantly.',
  ]},
]);

registerPool('collab.reveal.partner.wren', [
  { when: {}, text: [
    'Wren fires immediately: {wrenLine}',
    'The chat message appears at once — {wrenLine}',
    'Wren types before the echo fades: {wrenLine}',
  ]},
]);

registerPool('collab.reveal.partner.close', [
  { when: {}, text: [
    '{partnerName} looks at the camera after saying the number and says nothing else — somehow that is more than any speech.',
    'The viewer count bumps. {partnerName} touches her belly once and keeps eating.',
    '{partnerName} exhales. The chat treats the silence like content.',
  ]},
]);

registerPool('collab.zoom.open', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Zoom in. Leftover heat plus partner heat. The frame has to take both.',
    'Close-up on a middle that already ate. The stream is the logged second course.',
  ] },
  { when: {}, text: [
    'You zoom in — the camera tightening on both women at the table.',
    'The frame closes on bellies, faces, hands reaching for food.',
    'Close-up: two bodies eating on camera, warmth and mass in focus.',
  ]},
]);

registerPool('collab.zoom.table', [
  { when: {}, text: [
    '{subject.name} at {subject.lbs} pounds and {partnerName} at {partnerLbs} pounds — both bellies forward and warm.',
    'Full physical presence: {subject.lbs} and {partnerLbs}, pleasure written in flesh.',
    'They fill the shot — {subject.name} and {partnerName}, heavier than when the stream started.',
  ]},
]);

registerPool('collab.zoom.mass', [
  { when: {}, text: [
    'At this scale the camera can barely fit them — mass as spectacle, appetite as architecture.',
    'Enormous and unhurried: both women eating like the room belongs to their bellies.',
    'The frame strains around two bodies at full volume — bellies forward, hunger visible.',
  ]},
]);

registerPool('collab.zoom.chat', [
  { when: {}, text: [
    'The chat is saying something. The chat is always saying something. This is what they mean.',
    'Viewer count ticks up. Comments scroll faster than you can read.',
    'Donations flicker. Regulars translate the moment for newcomers.',
  ]},
]);

registerPool('collab.chat.open', [
  { when: { leftoverFed: true }, weight: 4, text: [
    'Chat leans in. Leftover heat still in {subject.name}. The comments log both sittings.',
    'You pull the audience toward a middle that already ate.',
  ] },
  { when: {}, text: [
    'Chat engagement — the room leans in.',
    'You pull the audience into the moment.',
    'The stream breathes with the chat for a beat.',
  ]},
]);

registerPool('collab.chat.wren', [
  { when: {}, text: [
    'Wren fires a message immediately: *{wrenLine}*',
    'Wren types first, as always: *{wrenLine}*',
    'The chat pings — Wren: *{wrenLine}*',
  ]},
]);

registerPool('collab.chat.bump', [
  { when: {}, text: [
    'The chat picks it up. Regulars explain to newcomers. Newcomers ask questions the regulars answer faster than either streamer can.',
    'The viewer count bumps slightly. Momentum holds.',
    'Comments accelerate. The room leans in — engagement feeding the feed.',
  ]},
]);

registerPool('collab.push.good.open', [
  { when: {}, text: [
    'You push both of them harder — more food, more speed, the camera catching every bite.',
    'More plates, faster pace, both women eating like the chat is daring them.',
    'You raise the stakes on camera — pace up, portions up, bellies answering.',
  ]},
]);

registerPool('collab.push.good.hard', [
  { when: {}, text: [
    'Both bellies visibly fuller than five minutes ago.',
    'Fullness shows in breath, in pace, in the soft forward press of both stomachs.',
    'They keep going because you asked and because they want to.',
  ]},
]);

registerPool('collab.push.good.chat', [
  { when: {}, text: [
    'The chat is unanimous: more. More. The viewer count spikes. This is the right call.',
    'Donations jump. Comments demand another course. You deliver.',
    'Caps lock encouragement. Tips roll in. You keep feeding the moment.',
  ]},
]);

registerPool('collab.push.bad.open', [
  { when: {}, text: [
    'You push too hard too fast. {partnerName} slows — genuinely full — and momentum stutters.',
    'The pace breaks. {partnerName} needs a breath the chat can see.',
    'Too much too soon. {partnerName} pauses mid-bite and the rhythm wobbles.',
  ]},
]);

registerPool('collab.push.bad.recover', [
  { when: {}, text: [
    'Quality dips. She recovers and eats again, but the push cost something.',
    'The chat notices the pause. She finds the rhythm again — slower, still eating.',
    'A breath, a bite, momentum returning — not as fierce, still content.',
  ]},
]);

registerPool('collab.crash.open', [
  { when: {}, text: [
    'The stream crashes. Quality hit zero — momentum died, chat thinned, connection dropped.',
    'The feed dies mid-bite. Both of you still at the table when the room goes quiet.',
    'Connection lost. The table still full. The chat gone cold mid-chew.',
  ]},
]);

registerPool('collab.crash.gain', [
  { when: {}, text: [
    'You gained {kylieGain} pounds and {partnerName} gained {partnerGain} pounds. The stream is just over.',
    'Still: +{kylieGain} for {subject.name}, +{partnerGain} for {partnerName}. It happens.',
    'Stream dead. Gains live: +{kylieGain}, +{partnerGain}. The numbers outlast the feed.',
  ]},
]);

registerPool('collab.wrap', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'Overlay dark. Kitchen leftover plus the collab still occupy the same chairs.',
    'Chat keeps typing. Leftover heat and partner heat do not clock out with the feed.',
  ] },
  { when: { nightVisit: true }, weight: 3, text: [
    'You saw her after hours. The collab was the public version of that appetite.',
  ] },
  { when: {}, text: [
    'The feed ends. Fullness does not. Both of them stay in the chairs like the stream is still a course.',
    'Headset off. Bellies still answering. The clip already happened in them.',
    'You pack the overlay. They do not pack the weight.',
  ] },
]);
