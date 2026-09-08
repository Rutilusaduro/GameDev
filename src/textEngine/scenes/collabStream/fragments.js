// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Collab stream — short fragment pools for action popups.
import { registerPool } from '../../engine.js';

registerPool('collab.reveal.open', [
  { when: {}, text: [
    'You announce {subject.name}\'s weight on camera — clearly, into the mic.',
    'The number goes live: {subject.name}, {subject.lbs} pounds, no filter.',
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
  ]},
]);

registerPool('collab.zoom.chat', [
  { when: {}, text: [
    'The chat is saying something. The chat is always saying something. This is what they mean.',
    'Viewer count ticks up. Comments scroll faster than you can read.',
  ]},
]);

registerPool('collab.chat.open', [
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
  ]},
]);

registerPool('collab.chat.bump', [
  { when: {}, text: [
    'The chat picks it up. Regulars explain to newcomers. Newcomers ask questions the regulars answer faster than either streamer can.',
    'The viewer count bumps slightly. Momentum holds.',
  ]},
]);

registerPool('collab.push.good.open', [
  { when: {}, text: [
    'You push both of them harder — more food, more speed, the camera catching every bite.',
    'More plates, faster pace, both women eating like the chat is daring them.',
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
  ]},
]);

registerPool('collab.push.bad.open', [
  { when: {}, text: [
    'You push too hard too fast. {partnerName} slows — genuinely full — and momentum stutters.',
    'The pace breaks. {partnerName} needs a breath the chat can see.',
  ]},
]);

registerPool('collab.push.bad.recover', [
  { when: {}, text: [
    'Quality dips. She recovers and eats again, but the push cost something.',
    'The chat notices the pause. She finds the rhythm again — slower, still eating.',
  ]},
]);

registerPool('collab.crash.open', [
  { when: {}, text: [
    'The stream crashes. Quality hit zero — momentum died, chat thinned, connection dropped.',
    'The feed dies mid-bite. Both of you still at the table when the room goes quiet.',
  ]},
]);

registerPool('collab.crash.gain', [
  { when: {}, text: [
    'You gained {kylieGain} pounds and {partnerName} gained {partnerGain} pounds. The stream is just over.',
    'Still: +{kylieGain} for {subject.name}, +{partnerGain} for {partnerName}. It happens.',
  ]},
]);
