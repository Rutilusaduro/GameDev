// ═══════════════════════════════════════════════════════════════
// DESTINY STREAM — full upload chat pool ingestion (Phase 7)
// Appends to base modules via registerModuleVariants.
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../engine.js';

// ── Performance chat gaps (Destiny_Chat_ec39) ─────────────────

registerModuleVariants('stream.chat.perf.excellent', [
  { when: {}, text: ['she looks so good like this', 'I\'m so normal about this'] },
]);
registerModuleVariants('stream.chat.perf.average', [
  { when: {}, text: ['she looks kinda full already', 'this is longer than I thought'] },
]);
registerModuleVariants('stream.chat.perf.poor', [
  { when: {}, text: ['someone help her', 'I thought she was supposed to be good at this', 'this is actually sad'] },
]);

// ── Brand chat — full Extra_chatters pools ─────────────────────

const brandChatFull = {
  crunchforge: [
    'she\'s making a fucking mess and I\'m here for it',
    'this is actually unhinged',
    'she\'s not even chewing properly anymore',
    'crunchforge challenge winner behavior',
  ],
  fizzpeak: [
    'she\'s moving so fast',
    'she\'s not slowing down at all',
  ],
  velvetmelt: [
    'this is so slow and deliberate I\'m losing it',
    'she looks like she\'s in heaven',
  ],
  glazeco: [
    'this is actually evil',
    'she\'s making it look too good',
  ],
};
for (const [brand, lines] of Object.entries(brandChatFull)) {
  registerModuleVariants(`stream.chat.brand.${brand}`, [{ when: {}, text: lines }]);
}

// ── Challenge-type chat extras ─────────────────────────────────

const typeChatExtra = {
  endurance: [
    'she\'s been at this for so long',
    'at what point do we start getting worried',
    'she\'s actually built different',
  ],
  speed: [
    'she\'s not even pausing',
    'she\'s demolishing this',
  ],
  sensual: [
    'I\'m losing my mind',
    'she\'s savoring this on purpose',
  ],
  chaotic: [
    'this is actually impressive multitasking',
    'she\'s struggling so hard',
    'this is too much going on',
  ],
};
for (const [cat, lines] of Object.entries(typeChatExtra)) {
  registerModuleVariants(`stream.chat.type.${cat}`, [{ when: {}, text: lines }]);
}

// ── Rare / extreme chat — full upload pool ─────────────────────

registerModuleVariants('stream.chat.rare', [
  { when: { intensity: 'extreme' }, priority: 4,
    text: [
      'I think she\'s actually going to break herself doing this',
      'this might be too much even for her',
      'she looks like she\'s regretting every life choice',
      'at what point do we stage an intervention',
      'she\'s actually scaring me a little',
      'this is the most unhinged thing she\'s ever done',
      'I don\'t think she\'s coming back from this one',
      'she\'s completely gone',
      'this is actually concerning',
      'someone check on her after this',
    ] },
]);

// ── Between-round: challenge-type × performance ────────────────

const betweenChallenge = [
  { when: { perf: 'average', challengeType: 'endurance' },
    text: ['This is gonna take forever at this rate…', 'I don\'t know how much longer I can do this…'] },
  { when: { perf: 'average', challengeType: 'speed' },
    text: ['I\'m falling behind a little…'] },
  { when: { perf: 'average', challengeType: 'sensual' },
    text: ['I\'m trying to stay composed but it\'s slipping.'] },
  { when: { perf: 'average', challengeType: 'chaotic' },
    text: ['There\'s too much going on right now.'] },
  { when: { perf: 'poor', challengeType: 'endurance' },
    text: ['I don\'t know how much longer I can do this…'] },
  { when: { perf: 'poor', challengeType: 'speed' },
    text: ['I\'m way too slow right now.'] },
  { when: { perf: 'poor', challengeType: 'sensual' },
    text: ['I\'m supposed to be teasing but I\'m just struggling…'] },
  { when: { perf: 'poor', challengeType: 'chaotic' },
    text: ['I\'m completely losing control of this.'] },
  { when: { perf: 'verypoor', challengeType: 'endurance' },
    text: ['I don\'t think I\'m gonna make it through this…'] },
  { when: { perf: 'verypoor', challengeType: 'speed' },
    text: ['I\'m way too slow. This is embarrassing.'] },
  { when: { perf: 'verypoor', challengeType: 'sensual' },
    text: ['I\'m supposed to be teasing you but I\'m just suffering…'] },
  { when: { perf: 'verypoor', challengeType: 'chaotic' },
    text: ['I\'m actually losing my mind trying to keep up.'] },
  { when: { intensity: 'extreme' }, priority: 6,
    text: [
      'I don\'t even know what I was thinking agreeing to this.',
      'This is so much worse than last time.',
    ] },
];
registerModuleVariants('stream.betweenRound', betweenChallenge);

// ── Parasocial — early audience expansion ──────────────────────

registerModuleVariants('stream.chat.parasocial.early', [
  { when: { stageMin: 6 },
    text: [
      'holy shit she\'s actually huge now',
      'this is moving fast',
      'she looks so soft…',
      'I didn\'t expect her to get this big this quick',
      'she\'s still cute tho',
      'she\'s trying so hard to pretend she\'s not getting bigger',
    ] },
  { when: {},
    text: [
      'she\'s so cute when she tries to act normal',
      'I\'ve been watching since she was smaller…',
      'she doesn\'t even realize how different she is now',
      'chat was there for the whole journey',
      'she\'s growing up right in front of us',
    ] },
]);

registerModuleVariants('stream.chat.parasocial.mid', [
  { when: { stageMin: 6 },
    text: [
      'damn she\'s actually getting kinda thick',
      'not complaining but she\'s eating way more than before',
      'she\'s still trying to act normal about it',
    ] },
  { when: {},
    text: [
      'we\'ve been here since the beginning',
      'she belongs to chat at this point',
      'we watched her become this',
      'chat raised her like this',
      'she can\'t go back to normal even if she wanted to',
    ] },
]);

registerModuleVariants('stream.chat.parasocial.late', [
  { when: { stageMin: 8 },
    text: [
      'this is so hot I can\'t think straight',
      'she\'s so fucking pathetic like this',
      'I love what streaming did to her',
      'destiny if you\'re reading this we own you now',
    ] },
  { when: {},
    text: [
      'she doesn\'t even have a life outside of this anymore',
      'we\'re the only thing she has left',
      'she\'s literally just our content now',
      'we broke her and it\'s beautiful',
      'she\'s not streaming for herself anymore, she\'s streaming for us',
    ] },
]);

registerModuleVariants('stream.chat.parasocial.veryLate', [
  { when: { stageMin: 10 },
    text: [
      'she\'s not even a streamer anymore, she\'s just our thing',
      'we did this to her and she let us',
      'she exists for us now',
      'destiny doesn\'t even belong to herself anymore',
      'she\'s not a person, she\'s content',
      'we watched her stop being human in real time',
    ] },
  { when: { stageMin: 8 },
    text: [
      'she\'s not even allowed to stop at this point',
      'chat would actually lose it if she tried to quit',
      'we made her into this and she\'s grateful',
      'she\'s just a vessel for our entertainment at this point',
      'she belongs to the stream now',
    ] },
]);

// ── Scenario chat (audience × weight × situation) ───────────────

registerModuleVariants('stream.chat.scenario.eating', [
  { when: { audienceTier: 'early', stageMin: 5, stageMax: 6 },
    text: ['damn she\'s hungry today'] },
  { when: { audienceTier: 'mid', stageMin: 7 },
    text: ['she\'s actually putting it away…'] },
  { when: { audienceTier: 'late', stageMin: 8 },
    text: ['this is so fucking hot'] },
  { when: { audienceTier: 'veryLate', stageMin: 9 },
    text: ['she\'s not even human anymore and I\'m obsessed'] },
]);

registerModuleVariants('stream.chat.scenario.struggling', [
  { when: { audienceTier: 'early', stageMin: 6 },
    text: ['she\'s getting kinda out of breath lol'] },
  { when: { audienceTier: 'mid', stageMin: 7 },
    text: ['she\'s actually struggling to move now'] },
  { when: { audienceTier: 'late', stageMin: 8 },
    text: ['this is actually sad… keep going'] },
  { when: { audienceTier: 'veryLate', stageMin: 10 },
    text: ['she can barely even exist and we\'re all just watching'] },
]);

registerModuleVariants('stream.chat.scenario.teased', [
  { when: { audienceTier: 'early' },
    text: ['chat\'s being mean lmao'] },
  { when: { audienceTier: 'mid' },
    text: ['she\'s taking it so well though'] },
  { when: { audienceTier: 'late', stageMin: 8 },
    text: ['she\'s too far gone to even defend herself'] },
  { when: { audienceTier: 'veryLate', stageMin: 10 },
    text: ['she doesn\'t even try to fight back anymore'] },
]);
