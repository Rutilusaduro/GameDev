// ═══════════════════════════════════════════════════════════════
// DESTINY STREAMING — text modules (stream.*)
// ═══════════════════════════════════════════════════════════════
import { registerModule } from '../engine.js';
import './streamPreStream.js';

// ── Between-round dialogue ─────────────────────────────────────

registerModule('stream.betweenRound', [
  { when: { perf: 'good' },
    text: [
      'Okay… that actually felt really good.',
      'Fuck, I\'m doing better than I thought I would.',
      'Keep it up, chat\'s eating this up.',
      'I can actually do this… holy shit.',
      'This is way more fun when it\'s going well.',
    ] },
  { when: { perf: 'good', addiction: [1, 2] },
    text: [
      'God… I needed that.',
      'I don\'t even care how I look right now, that felt too good.',
      'Keep going… please keep going.',
      'I\'m actually getting full and I still want more. What the fuck is wrong with me?',
      'This is so embarrassing… but I don\'t want you to stop.',
    ] },
  { when: { perf: 'good', stageMin: 8 },
    text: [
      'God… I needed that.',
      'I don\'t even care how I look right now, that felt too good.',
      'Keep going… please keep going.',
    ] },
  { when: { perf: 'good', brand: 'crunchforge' },
    text: ['That was actually kinda brutal… I kinda liked it.'] },
  { when: { perf: 'good', brand: 'fizzpeak' },
    text: ['That was so much fun, what the fuck.'] },
  { when: { perf: 'good', brand: 'velvetmelt' },
    text: ['Mmm… that felt really nice.'] },
  { when: { perf: 'good', brand: 'glazeco' },
    text: ['I was being so good just now… did you like that?'] },
  { when: { perf: 'good', challengeType: 'endurance' },
    text: ['I can keep going like this for a while…'] },
  { when: { perf: 'good', challengeType: 'speed' },
    text: ['That felt really fast. I\'m kinda proud of that.'] },
  { when: { perf: 'good', challengeType: 'sensual' },
    text: ['I was trying really hard to make that look good…'] },
  { when: { perf: 'good', challengeType: 'chaotic' },
    text: ['I can\'t believe I actually kept up with that.'] },

  { when: { perf: 'average' },
    text: [
      'This is… harder than I thought.',
      'I\'m trying, I swear. It\'s just a lot.',
      'Chat\'s being way too nice, I don\'t trust it.',
      'I\'m doing okay… I think.',
      'This is actually taking more out of me than I expected.',
    ] },
  { when: { perf: 'average', addiction: [1, 2] },
    text: [
      'I\'m already getting full and we\'re not even that far in…',
      'Why is this so much harder than last time?',
      'I don\'t know if I can keep this pace up…',
      'Fuck… my stomach\'s already starting to hurt.',
      'I\'m trying so hard not to slow down right now.',
    ] },
  { when: { perf: 'average', brand: 'crunchforge' },
    text: ['That was kinda rough… but I guess that\'s the point.'] },
  { when: { perf: 'average', brand: 'fizzpeak' },
    text: ['I\'m keeping up… barely.'] },
  { when: { perf: 'average', brand: 'velvetmelt' },
    text: ['I\'m trying to stay slow and pretty but it\'s getting hard.'] },
  { when: { perf: 'average', brand: 'glazeco' },
    text: ['I\'m doing my best to look good while doing this…'] },

  { when: { perf: 'poor' },
    text: [
      'Shit… I\'m already struggling.',
      'This is actually embarrassing.',
      'I can\'t believe I\'m already slowing down.',
      'God, this is harder than it looks.',
      'I\'m really trying here, chat.',
    ] },
  { when: { perf: 'poor', addiction: [1, 2] },
    text: [
      'I\'m so fucking full already…',
      'Why did I think I could do this…',
      'I can feel how much I\'ve already eaten and it\'s barely been any time.',
      'This is actually getting pathetic.',
      'I don\'t know if I can finish this…',
    ] },
  { when: { perf: 'poor', brand: 'crunchforge' },
    text: ['This is actually kicking my ass…'] },
  { when: { perf: 'poor', brand: 'fizzpeak' },
    text: ['I\'m falling apart way too fast.'] },
  { when: { perf: 'poor', brand: 'velvetmelt' },
    text: ['I\'m trying to stay pretty but I\'m losing it…'] },
  { when: { perf: 'poor', brand: 'glazeco' },
    text: ['This is so much harder than I made it look…'] },

  { when: { perf: 'verypoor' },
    text: [
      'Fuck… I don\'t know if I can keep going.',
      'This is actually really hard.',
      'I\'m sorry, I\'m trying.',
      'Chat, don\'t be mean… I\'m doing my best.',
    ] },
  { when: { perf: 'verypoor', addiction: [1, 2] },
    text: [
      'I\'m so fucking full it hurts…',
      'I can\'t stop thinking about how much more there is…',
      'This is actually getting really bad.',
      'I don\'t even know if I want to keep going but I don\'t think I can stop either.',
      'Fuck… I\'m actually getting scared of how much I\'ve eaten already.',
    ] },
  { when: { perf: 'verypoor', brand: 'crunchforge' },
    text: ['This is actually fucked…'] },
  { when: { perf: 'verypoor', brand: 'fizzpeak' },
    text: ['I\'m crashing so hard right now.'] },
  { when: { perf: 'verypoor', brand: 'velvetmelt' },
    text: ['I\'m trying so hard to stay pretty but I\'m falling apart…'] },
  { when: { perf: 'verypoor', brand: 'glazeco' },
    text: ['This is so much worse than I thought it would be…'] },

  { when: { intensity: 'extreme' }, priority: 5,
    text: [
      'I think I actually might\'ve gone too far this time…',
      'This is way bigger than I thought it would be…',
      'I don\'t know if I\'m coming back from this one.',
      'I\'m actually scared of how much I\'ve already eaten.',
      'This might\'ve been a mistake…',
      'Chat… I might actually be in trouble.',
    ] },

  { when: { perf: 'excellent' },
    text: [
      'Holy shit, that was perfect.',
      'Chat, did you see that? I\'m actually insane right now.',
      'I could do this all day… don\'t tempt me.',
      'That felt incredible. I\'m on a roll.',
    ] },

  { when: {}, text: ['…'] },
]);

// ── Round start ────────────────────────────────────────────────

registerModule('stream.roundStart', [
  { when: { challengeType: 'endurance' },
    text: ['Alright chat… this is gonna be a long one. Buckle up.', 'Deep breath. Let\'s see how long I can last.'] },
  { when: { challengeType: 'speed' },
    text: ['No time to think — just eat. Let\'s go.', 'Fast round. Don\'t blink.'] },
  { when: { challengeType: 'sensual' },
    text: ['Slow down… make them wait for it.', 'Let\'s take our time with this one.'] },
  { when: { challengeType: 'chaotic' },
    text: ['Everything at once. Of course.', 'Chaos round. What could go wrong?'] },
  { when: {},
    text: ['Okay… here we go.', 'Round starting. Wish me luck, chat.'] },
]);

// ── Chat: performance tiers ────────────────────────────────────

const perfChat = {
  excellent: [
    'she\'s actually cooking rn',
    'holy shit she\'s putting it away',
    'destiny slow down we\'re not ready',
    'this is so hot',
    'keep going queen',
    'she\'s actually insane for this',
    'the way she\'s eating… jesus',
  ],
  good: [
    'she\'s doing pretty good',
    'not bad so far',
    'she\'s keeping up',
    'damn she\'s actually trying',
    'she\'s getting so into it',
  ],
  average: [
    'she\'s doing okay I guess',
    'this is longer than I thought it would be',
    'she\'s slowing down a bit',
    'she looks kinda full already',
    'chat\'s being way too nice',
  ],
  poor: [
    'bro she\'s struggling',
    'this is actually painful to watch',
    'destiny blink twice if you need help',
    'she\'s so full already lmao',
    'she\'s slowing down so fast',
    'she\'s actually getting destroyed',
  ],
  verypoor: [
    'this is actually embarrassing',
    'she\'s so pathetic like this',
    'destiny are you crying',
    'she\'s actually about to give up',
    'this is so much worse than last time',
    'she looks like she\'s in pain',
    'someone end the stream',
  ],
};

for (const [tier, lines] of Object.entries(perfChat)) {
  registerModule(`stream.chat.perf.${tier}`, [
    { when: {}, text: lines },
  ]);
}

// ── Chat: brand flavor ─────────────────────────────────────────

registerModule('stream.chat.brand.crunchforge', [
  { when: {}, text: [
    'she\'s going feral',
    'this is so crunchyforge coded',
    'she\'s making a fucking mess',
    'crunchforge would be proud',
    'she\'s eating like she\'s trying to destroy the table',
  ] },
]);

registerModule('stream.chat.brand.fizzpeak', [
  { when: {}, text: [
    'she\'s actually popping off',
    'this is so fizzpeak',
    'she\'s going crazy rn',
    'fizzpeak would sponsor this chaos',
    'this is actually insane energy',
  ] },
]);

registerModule('stream.chat.brand.velvetmelt', [
  { when: {}, text: [
    'the way she\'s eating is actually insane',
    'she looks so soft rn',
    'this is so velvetmelt coded',
    'I\'m not normal about how she\'s chewing',
    'she\'s savoring every bite…',
  ] },
]);

registerModule('stream.chat.brand.glazeco', [
  { when: {}, text: [
    'she\'s being such a brat about it',
    'this is so glazeco',
    'she\'s teasing chat so hard',
    'the way she\'s dragging it out…',
    'she knows exactly what she\'s doing',
  ] },
]);

// ── Chat: challenge type ───────────────────────────────────────

const typeChat = {
  endurance: [
    'how long has she been going…',
    'she\'s still going???',
    'this is actually impressive',
    'I don\'t think she\'s stopping anytime soon',
  ],
  speed: [
    'she\'s eating so fucking fast',
    'this is actually scary',
    'how is she keeping up',
    'this is speedrunner behavior',
  ],
  sensual: [
    'she\'s being so mean with it',
    'the pacing is actually evil',
    'she knows what she\'s doing to us',
    'this is so drawn out',
  ],
  chaotic: [
    'how is she doing both at once',
    'this is actually chaos',
    'she\'s losing it and I\'m here for it',
    'nothing about this is normal',
  ],
  greedy: [
    'she\'s not stopping',
    'greedy queen behavior',
    'she wants ALL of it',
    'the pile is actually insane',
  ],
};

for (const [cat, lines] of Object.entries(typeChat)) {
  registerModule(`stream.chat.type.${cat}`, [
    { when: {}, text: lines },
  ]);
}

// ── Chat: parasocial by audience tier ──────────────────────────

registerModule('stream.chat.parasocial.mid', [
  { when: { stageMin: 6 },
    text: [
      'she\'s actually getting really big…',
      'I can\'t believe how much she\'s changed',
      'she\'s still trying to stream like normal lmao',
    ] },
  { when: {}, text: [
    'damn she\'s actually getting kinda thick',
    'not complaining but she\'s eating way more than before',
    'chat is so down bad already lmao',
  ] },
]);

registerModule('stream.chat.parasocial.late', [
  { when: { stageMin: 8 },
    text: [
      'this is actually insane',
      'how is she still streaming like this',
      'she\'s so fucking big now',
      'I remember when she used to move around more',
    ] },
  { when: {}, text: [
    'she\'s actually getting really big…',
    'the denial is crazy',
  ] },
]);

registerModule('stream.chat.parasocial.veryLate', [
  { when: { stageMin: 10 },
    text: [
      'she\'s literally just a blob at this point',
      'destiny if you\'re reading this we own you now',
      'she can\'t even pretend to be a normal streamer anymore',
      'I can\'t believe we watched this happen in real time',
      'destiny blink if you need help (she can\'t)',
    ] },
  { when: { stageMin: 8 },
    text: [
      'she\'s actually immobile at this point',
      'I love what streaming did to her',
      'she used to be so normal…',
    ] },
  { when: {}, text: [
    'she\'s so gone and it\'s perfect',
    'this is actually the best thing that\'s ever happened to her',
  ] },
]);

registerModule('stream.chat.rare', [
  { when: { intensity: 'extreme' }, priority: 3,
    text: [
      'someone call an intervention',
      'this stream should not be legal',
      'she\'s actually in danger rn',
      'I can\'t look away',
    ] },
  { when: {}, text: ['…'] },
]);

// ── Tap-out endings ────────────────────────────────────────────

registerModule('stream.tapOut.stamina', [
  { when: {}, text: [
    'I… I can\'t. I\'m done. My whole body is shaking.',
    'Chat, I\'m tapping out. I physically cannot keep going.',
    'That\'s it. I\'m empty. I\'m so fucking empty and full at the same time and I\'m done.',
  ] },
]);

registerModule('stream.tapOut.fullness', [
  { when: {}, text: [
    'I can\'t breathe around my own stomach. I have to stop.',
    'Chat… I\'m too full. I\'m actually too full to continue.',
    'I thought I could push through but I can\'t. I\'m tapping out before I hurt myself.',
  ] },
]);

registerModule('stream.tapOut.performance', [
  { when: {}, text: [
    'I\'m embarrassing myself. I\'m ending this before it gets worse.',
    'Three rounds of that? I\'m done. I can\'t do this to chat anymore.',
    'I\'m tapping out. I\'m sorry. I\'m just… not good enough right now.',
  ] },
]);

// ── End stream ─────────────────────────────────────────────────

registerModule('stream.endStream.excellent', [
  { when: {}, text: [
    'That was actually insane. I can\'t believe we pulled that off.',
    'Chat, that might\'ve been my best stream ever. I\'m still buzzing.',
  ] },
]);

registerModule('stream.endStream.good', [
  { when: {}, text: [
    'Solid stream. I\'m tired but proud.',
    'Not perfect, but chat showed up and so did I.',
  ] },
]);

registerModule('stream.endStream.average', [
  { when: {}, text: [
    'Okay… we made it through. Could\'ve been worse.',
    'I\'m wiped. Thanks for sticking around anyway.',
  ] },
]);

registerModule('stream.endStream.poor', [
  { when: {}, text: [
    'That was rough. I\'m gonna go lie down.',
    'I don\'t want to talk about how that went.',
  ] },
]);

registerModule('stream.endStream.verypoor', [
  { when: {}, text: [
    'I need to delete the VOD. I\'m not even joking.',
    'Please don\'t clip that. Please.',
  ] },
]);

import './streamExtended.js';
import './streamChatIngest.js';
import './destinyOffstream.js';
