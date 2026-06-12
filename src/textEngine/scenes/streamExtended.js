// ═══════════════════════════════════════════════════════════════
// DESTINY STREAMING — Phase 4/5 extended text (milestones, specials,
// brand control, trend matrix, expanded chat)
// Loaded after stream.js — overwrites key modules with richer pools.
// ═══════════════════════════════════════════════════════════════
import { registerModule, registerModuleVariants } from '../engine.js';

// ── Between-round: perf × brand × challenge × trend × brandControl ─

registerModule('stream.betweenRound', [
  // Excellent
  { when: { perf: 'excellent', trend: 'improving' }, priority: 8,
    text: [
      'Holy shit I\'m actually getting better as this goes on??',
      'Chat watch me — I\'m peaking RIGHT now.',
      'That round was insane and I\'m not even slowing down yet.',
      'I can feel myself hitting a groove. Don\'t jinx it.',
    ] },
  { when: { perf: 'excellent', brandControl: 'soldOut' }, priority: 7,
    text: [
      'They wanted a monster and I\'m delivering. Sponsor me harder.',
      'I don\'t even recognize myself anymore and chat LOVES it.',
      'This is what selling out looks like. No regrets.',
      'My brand owns my stomach now and honestly? Slaps.',
    ] },
  { when: { perf: 'excellent', brand: 'crunchforge' },
    text: [
      'I ate that like violence. CrunchForge owes me a bonus.',
      'Brutal round. Perfect hits. I\'m feral and I\'m proud.',
      'That was destruction speed. Chat better clip it.',
    ] },
  { when: { perf: 'excellent', brand: 'fizzpeak' },
    text: [
      'POP OFF DESTINY — okay that was me, I popped off.',
      'That energy was actually unhinged. FizzPeak coded.',
      'I\'m vibrating. That was so fun I\'m scared.',
    ] },
  { when: { perf: 'excellent', brand: 'velvetmelt' },
    text: [
      'Every bite was slow torture for you. You\'re welcome.',
      'VelvetMelt would cry happy tears. I was *art* just now.',
      'Soft, sinful, perfect. I felt gorgeous doing that.',
    ] },
  { when: { perf: 'excellent', brand: 'glazeco' },
    text: [
      'I was so good you should\'ve paid extra. GlazeCo take notes.',
      'Brat mode: activated. That round was for the simps.',
      'I teased every second of it. Chat is ruined now.',
    ] },
  { when: { perf: 'excellent', challengeType: 'endurance' },
    text: ['I could\'ve kept going forever. That\'s terrifying.'] },
  { when: { perf: 'excellent', challengeType: 'speed' },
    text: ['World record who? I just speedran my dignity.'] },
  { when: { perf: 'excellent', challengeType: 'sensual' },
    text: ['I made eating look illegal. You\'re all welcome.'] },
  { when: { perf: 'excellent', challengeType: 'chaotic' },
    text: ['Chaos queen. Nothing survived that round.'] },
  { when: { perf: 'excellent', addiction: [1, 2] },
    text: [
      'I\'m full and euphoric and I want MORE. Help.',
      'That felt better than it should\'ve. I\'m not okay.',
      'Addiction who? I\'m thriving. (I\'m lying.)',
    ] },
  { when: { perf: 'excellent' },
    text: [
      'Holy shit, that was perfect.',
      'Chat, did you see that? I\'m actually insane right now.',
      'I could do this all day… don\'t tempt me.',
      'That felt incredible. I\'m on a roll.',
      'Clip that. Clip ALL of that.',
      'I blacked out and woke up perfect. Let\'s go again.',
    ] },

  // Good + trend
  { when: { perf: 'good', trend: 'improving' }, priority: 6,
    text: [
      'Okay I\'m finding my rhythm — don\'t look away.',
      'That was way better than last round. I\'m warming up.',
      'Chat, I think I\'m getting the hang of this…',
    ] },
  { when: { perf: 'good', trend: 'declining' }, priority: 6,
    text: [
      'Still good but I can feel myself slipping…',
      'Holding on. Barely. Don\'t count me out yet.',
      'I peaked earlier — trying not to crash now.',
    ] },
  { when: { perf: 'good', brandControl: 'late' },
    text: [
      'Sponsor loves when I push like this.',
      'They trained me well. I\'m their good girl.',
      'Contract says perform. I\'m performing.',
    ] },
  { when: { perf: 'good', brand: 'crunchforge' },
    text: ['That was actually kinda brutal… I kinda liked it.', 'CrunchForge brutalism. I respect it.'] },
  { when: { perf: 'good', brand: 'fizzpeak' },
    text: ['That was so much fun, what the fuck.', 'Chaotic good energy. Love it.'] },
  { when: { perf: 'good', brand: 'velvetmelt' },
    text: ['Mmm… that felt really nice.', 'Slow and sinful. Perfect.'] },
  { when: { perf: 'good', brand: 'glazeco' },
    text: ['I was being so good just now… did you like that?', 'Good girl round. Tips in chat.'] },
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
      'My body\'s huge and I\'m still hitting zones. Wild.',
    ] },
  { when: { perf: 'good' },
    text: [
      'Okay… that actually felt really good.',
      'Fuck, I\'m doing better than I thought I would.',
      'Keep it up, chat\'s eating this up.',
      'I can actually do this… holy shit.',
      'This is way more fun when it\'s going well.',
      'Not perfect but I\'ll take it.',
    ] },

  // Average + trend / brand control
  { when: { perf: 'average', trend: 'declining' }, priority: 6,
    text: [
      'I\'m getting worse each round and I can feel it.',
      'Why am I slowing down? I hate this.',
      'Chat be nice — I\'m trying not to spiral.',
    ] },
  { when: { perf: 'average', brandControl: 'soldOut' },
    text: [
      'They expect more from me now. Pressure\'s real.',
      'Sold out means no excuses. I\'m… trying.',
      'Brand wants a spectacle. I\'m giving "okay."',
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
    text: ['I\'m keeping up… barely.', 'Energy\'s dipping. Need a reset.'] },
  { when: { perf: 'average', brand: 'velvetmelt' },
    text: ['I\'m trying to stay slow and pretty but it\'s getting hard.'] },
  { when: { perf: 'average', brand: 'glazeco' },
    text: ['I\'m doing my best to look good while doing this…'] },
  { when: { perf: 'average' },
    text: [
      'This is… harder than I thought.',
      'I\'m trying, I swear. It\'s just a lot.',
      'Chat\'s being way too nice, I don\'t trust it.',
      'I\'m doing okay… I think.',
      'This is actually taking more out of me than I expected.',
      'Mid round. Mid performance. Story of my life.',
    ] },

  // Poor / very poor + sold out shame
  { when: { perf: 'poor', brandControl: 'soldOut' }, priority: 7,
    text: [
      'I sold out and I still can\'t keep up. Humiliating.',
      'My sponsor is watching me fail in HD.',
      'This is what they paid for? Yikes.',
    ] },
  { when: { perf: 'poor', trend: 'declining' },
    text: [
      'It\'s getting worse every round. I hate this.',
      'I peaked round one. It\'s downhill from here.',
      'Don\'t clip this. Please don\'t clip this.',
    ] },
  { when: { perf: 'poor', addiction: [1, 2] },
    text: [
      'I\'m so fucking full already…',
      'Why did I think I could do this…',
      'I can feel how much I\'ve already eaten and it\'s barely been any time.',
      'This is actually getting pathetic.',
      'I don\'t know if I can finish this…',
    ] },
  { when: { perf: 'poor' },
    text: [
      'Shit… I\'m already struggling.',
      'This is actually embarrassing.',
      'I can\'t believe I\'m already slowing down.',
      'God, this is harder than it looks.',
      'I\'m really trying here, chat.',
    ] },
  { when: { perf: 'verypoor', addiction: [1, 2] },
    text: [
      'I\'m so fucking full it hurts…',
      'I can\'t stop thinking about how much more there is…',
      'This is actually getting really bad.',
      'I don\'t even know if I want to keep going but I don\'t think I can stop either.',
      'Fuck… I\'m actually getting scared of how much I\'ve eaten already.',
    ] },
  { when: { perf: 'verypoor', brandControl: 'soldOut' },
    text: [
      'I\'m their poster girl and I\'m falling apart live.',
      'Sold out, stuffed, and struggling. Content?',
    ] },
  { when: { perf: 'verypoor' },
    text: [
      'Fuck… I don\'t know if I can keep going.',
      'This is actually really hard.',
      'I\'m sorry, I\'m trying.',
      'Chat, don\'t be mean… I\'m doing my best.',
      'I want to disappear.',
    ] },

  { when: { intensity: 'extreme' }, priority: 5,
    text: [
      'I think I actually might\'ve gone too far this time…',
      'This is way bigger than I thought it would be…',
      'I don\'t know if I\'m coming back from this one.',
      'I\'m actually scared of how much I\'ve already eaten.',
      'This might\'ve been a mistake…',
      'Chat… I might actually be in trouble.',
      'Extreme challenge extreme regret. Let\'s continue anyway.',
    ] },

  { when: {}, text: ['…'] },
]);

// ── Round start expansions ─────────────────────────────────────

registerModule('stream.roundStart', [
  { when: { brandControl: 'soldOut' }, priority: 6,
    text: [
      'They own me now. Let\'s give them a show.',
      'Sold-out streamer reporting for duty. No brakes.',
      'My sponsor texted "go harder." So. Here we go.',
    ] },
  { when: { trend: 'improving' }, priority: 5,
    text: [
      'Momentum\'s on my side. Don\'t jinx it.',
      'I\'m heating up — next round\'s mine.',
      'Chat, I\'m getting scary good at this.',
    ] },
  { when: { trend: 'declining' }, priority: 5,
    text: [
      'I need a bounce-back round. Watch me.',
      'Slipping is not an option. Deep breath.',
      'Reset. Focus. Pretend last round didn\'t happen.',
    ] },
  { when: { brand: 'crunchforge', challengeType: 'speed' },
    text: ['CrunchForge speed round. Destroy or be destroyed.'] },
  { when: { brand: 'fizzpeak', challengeType: 'chaotic' },
    text: ['FizzPeak chaos hour. Buckle up degenerates.'] },
  { when: { brand: 'velvetmelt', challengeType: 'sensual' },
    text: ['VelvetMelt wants slow. I\'ll make you wait.'] },
  { when: { brand: 'glazeco', challengeType: 'endurance' },
    text: ['GlazeCo endurance — I\'ll tease you the whole way.'] },
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

// ── Milestone burst lines (shown on wrap) ──────────────────────

const milestoneLines = {
  first_stream: [
    'First stream in the books. I\'m officially a menace.',
    'We did it chat — my first real mukbang. I\'m shaking.',
    'Day one of whatever this becomes. Thanks for showing up.',
  ],
  streams_5: [
    'Five streams deep. I\'m not a phase, I\'m a schedule.',
    'Regular streamer status unlocked. My mods are scared.',
    'Stream five. Chat knows my eating patterns better than I do.',
  ],
  streams_15: [
    'Fifteen streams. I\'m a veteran and my stomach knows it.',
    'They used to ask if I\'d quit. Joke\'s on them.',
    'Veteran streamer energy. My highlight reel is unhinged.',
  ],
  streams_30: [
    'Thirty streams. Icon behavior. I am the algorithm.',
    'They wrote articles about me. I just wanted snacks.',
    'Thirty streams in and I\'m still hungry. Legend.',
  ],
  audience_500: [
    'Five hundred followers. Small city, big appetite.',
    'Half a K. Hi new people — I eat on camera for money.',
    '500 souls watching me get softer. Flattered.',
  ],
  audience_2500: [
    '2.5K followers. I can\'t pretend this is casual anymore.',
    'Two thousand five hundred degenerates. I love you.',
    'My audience exploded. So did my waistline. Correlation?',
  ],
  audience_10000: [
    'TEN. THOUSAND. FOLLOWERS. I\'m actually shaking.',
    '10K chat. I\'m internet famous for eating. What a timeline.',
    'Five figures of people own my stream schedule now.',
  ],
  favor_max: [
    'Sponsor favorite. They\'d tattoo their logo on me.',
    'Max favor with my brand. I\'m their golden goose.',
    'Top of the roster. They send crates now. I accept.',
  ],
  brand_sold_out: [
    'Sold out. Fully. My soul has a logo on it.',
    'I don\'t pick challenges anymore — the brand does.',
    'Sold-out streamer. No brakes. No refunds.',
  ],
};

for (const [key, lines] of Object.entries(milestoneLines)) {
  registerModule(`stream.milestone.${key}`, [{ when: {}, text: lines }]);
}

registerModule('stream.milestone.stage', [
  { when: { stageMin: 10 }, text: [
    'I hit a new size on stream. Chat lost their minds.',
    'Stage up — live, on camera, no take-backs.',
    'The scale doesn\'t lie and neither does this angle.',
  ] },
  { when: { stageMin: 7 }, text: [
    'New weight tier unlocked mid-stream. Clip it.',
    'I got bigger on camera again. This is my life now.',
  ] },
  { when: {}, text: [
    'Another pound marker passed. Thanks for witnessing.',
    'Growth spurt — the embarrassing kind. On stream.',
  ] },
]);

// ── Special outcome burst lines ──────────────────────────────────

const specialLines = {
  perfect_stream: [
    'PERFECT STREAM. Every round excellent. I\'m actually godlike.',
    'Flawless run. Chat broke the emote spam. I\'m floating.',
    'They\'ll study this VOD. Perfect from start to finish.',
  ],
  viral_moment: [
    'That went VIRAL mid-stream. My phone won\'t stop buzzing.',
    'Extreme challenge, excellent finish — clip farm activated.',
    'Trending tab. I\'m trending for eating. Peak internet.',
  ],
  brand_gift: [
    'Sponsor sent a gift crate mid-wrap. They\'re proud of me.',
    'Brand gift unlocked — they love how hard I sold out.',
    'Care package from HQ. I earned this gluttony.',
  ],
  feast_god: [
    'Feast God run. The numbers are obscene. I\'m proud.',
    'I ate like a final boss. Session gain was criminal.',
    'They\'re calling this a feast stream. Accurate.',
  ],
  comeback_queen: [
    'Comeback queen — I was declining then popped off.',
    'They counted me out. I improved at the end. Cinema.',
    'Redemption arc in one stream. Chat cried.',
  ],
  chat_legend: [
    'Chat legend status — you animals carried me.',
    '2.5K+ audience and you all spammed at once. I felt famous.',
    'The chat was the real main character tonight.',
  ],
};

for (const [key, lines] of Object.entries(specialLines)) {
  registerModule(`stream.special.${key}`, [{ when: {}, text: lines }]);
}

// ── Expanded performance chat ──────────────────────────────────

const expandedPerfChat = {
  excellent: [
    'she\'s actually cooking rn',
    'holy shit she\'s putting it away',
    'destiny slow down we\'re not ready',
    'this is so hot',
    'keep going queen',
    'she\'s actually insane for this',
    'the way she\'s eating… jesus',
    'CLIP IT CLIP IT CLIP IT',
    'she\'s in the zone holy fuck',
    'this is premium content',
    'I\'m not blinking',
    'she\'s hitting EVERY beat',
    'main character energy',
    'this stream is illegal',
    'she\'s actually perfect rn',
  ],
  good: [
    'she\'s doing pretty good',
    'not bad so far',
    'she\'s keeping up',
    'damn she\'s actually trying',
    'she\'s getting so into it',
    'solid hits',
    'she\'s locked in',
    'W round',
    'chat we might cook',
    'she\'s surprising me',
    'okay she\'s got this',
    'momentum building',
  ],
  average: [
    'she\'s doing okay I guess',
    'this is longer than I thought it would be',
    'she\'s slowing down a bit',
    'she looks kinda full already',
    'chat\'s being way too nice',
    'mid round energy',
    'she\'s fighting for it',
    'could go either way',
    'nervous sweating',
    'she\'s human after all',
  ],
  poor: [
    'bro she\'s struggling',
    'this is actually painful to watch',
    'destiny blink twice if you need help',
    'she\'s so full already lmao',
    'she\'s slowing down so fast',
    'she\'s actually getting destroyed',
    'o7',
    'someone donate water',
    'she\'s cooked',
    'this is rough',
    'I can\'t look away though',
  ],
  verypoor: [
    'this is actually embarrassing',
    'she\'s so pathetic like this',
    'destiny are you crying',
    'she\'s actually about to give up',
    'this is so much worse than last time',
    'she looks like she\'s in pain',
    'someone end the stream',
    'she\'s tapping out soon',
    'F in chat',
    'yikes',
    'I feel secondhand fullness',
  ],
};

for (const [tier, lines] of Object.entries(expandedPerfChat)) {
  registerModule(`stream.chat.perf.${tier}`, [{ when: {}, text: lines }]);
}

// ── Brand control chat (selling out) ─────────────────────────────

registerModule('stream.chat.brandControl.soldOut', [
  { when: {}, text: [
    'she\'s fully sold out lmaooo',
    'brand owns her stomach',
    'this is sponsor propaganda and I\'m here for it',
    'she doesn\'t even pick her own challenges anymore',
    'corporate gluttony arc',
    'sold out streamer goes brrr',
  ] },
]);

registerModule('stream.chat.brandControl.late', [
  { when: {}, text: [
    'sponsor\'s favorite girl',
    'she\'s their mascot now',
    'brand darling behavior',
    'contract streamer energy',
  ] },
]);

// ── Trend chat ─────────────────────────────────────────────────

registerModule('stream.chat.trend.improving', [
  { when: {}, text: [
    'she\'s getting better each round??',
    'momentum shift',
    'she\'s heating up',
    'comeback incoming',
    'she found her groove',
  ] },
]);

registerModule('stream.chat.trend.declining', [
  { when: {}, text: [
    'she\'s falling off',
    'it\'s getting worse each round',
    'downhill from here',
    'she peaked already',
    'pain',
  ] },
]);

// ── Early parasocial (small audience) ───────────────────────────

registerModule('stream.chat.parasocial.early', [
  { when: { stageMin: 6 },
    text: [
      'found her early before she blows up',
      'only 200 viewers and she\'s already like this',
      'this is gonna age badly (compliment)',
    ] },
  { when: {}, text: [
    'cozy stream vibes',
    'small chat best chat',
    'I feel like I know her already',
    'parasocial hours',
  ] },
]);

// ── Tap-out chat reactions ─────────────────────────────────────

registerModule('stream.chat.tapOut.stamina', [
  { when: {}, text: [
    'she tapped out NOOO',
    'empty tank',
    'she\'s done',
    'respect the tap',
    'she gave everything',
  ] },
]);

registerModule('stream.chat.tapOut.fullness', [
  { when: {}, text: [
    'too full to continue',
    'she hit the wall',
    'stomach won',
    'RIP stream',
    'she\'s PACKED',
  ] },
]);

registerModule('stream.chat.tapOut.performance', [
  { when: {}, text: [
    'she ended it herself',
    'self tap out',
    'she knew it was bad',
    'dignity preserved (barely)',
    'smart tap honestly',
  ] },
]);

// ── Brand end-stream lines ─────────────────────────────────────

registerModule('stream.endStream.excellent', [
  { when: { brand: 'crunchforge' },
    text: ['CrunchForge got their massacre. I got my check. Everybody wins.'] },
  { when: { brand: 'fizzpeak' },
    text: ['FizzPeak chaos delivered. I\'m still vibrating.'] },
  { when: { brand: 'velvetmelt' },
    text: ['VelvetMelt elegance with extra sin. Chef\'s kiss.'] },
  { when: { brand: 'glazeco' },
    text: ['GlazeCo brat stream — tips were insane.'] },
  { when: { brandControl: 'soldOut' },
    text: ['Sold-out and still excellent. The brand is pleased.'] },
  { when: {}, text: [
    'That was actually insane. I can\'t believe we pulled that off.',
    'Chat, that might\'ve been my best stream ever. I\'m still buzzing.',
    'I\'m ending on a high. Rare. Savor it.',
  ] },
]);

registerModule('stream.endStream.good', [
  { when: { trend: 'improving' },
    text: ['Started shaky, ended strong. I\'ll take that arc.'] },
  { when: {}, text: [
    'Solid stream. I\'m tired but proud.',
    'Not perfect, but chat showed up and so did I.',
    'Good stream. Good food. Good night.',
  ] },
]);

registerModule('stream.endStream.average', [
  { when: { brandControl: 'soldOut' },
    text: ['Sold out and mid. Sponsor\'s gonna have words.'] },
  { when: {}, text: [
    'Okay… we made it through. Could\'ve been worse.',
    'I\'m wiped. Thanks for sticking around anyway.',
    'Average stream, average destruction. Classic me.',
  ] },
]);

registerModule('stream.endStream.poor', [
  { when: {}, text: [
    'That was rough. I\'m gonna go lie down.',
    'I don\'t want to talk about how that went.',
    'Delete the VOD? Maybe tomorrow.',
  ] },
]);

registerModule('stream.endStream.verypoor', [
  { when: {}, text: [
    'I need to delete the VOD. I\'m not even joking.',
    'Please don\'t clip that. Please.',
    'Worst stream in a while. I\'m logging off.',
  ] },
]);

// ── Expanded tap-out Destiny lines ─────────────────────────────

registerModule('stream.tapOut.stamina', [
  { when: { brandControl: 'soldOut' },
    text: ['Brand wanted more. My body said absolutely not. I\'m tapping out.'] },
  { when: { addiction: [1, 2] },
    text: ['I\'m empty and full and addicted and DONE. Tap.'] },
  { when: {}, text: [
    'I… I can\'t. I\'m done. My whole body is shaking.',
    'Chat, I\'m tapping out. I physically cannot keep going.',
    'That\'s it. I\'m empty. I\'m so fucking empty and full at the same time and I\'m done.',
    'Stamina\'s gone. Pride\'s optional. I\'m out.',
  ] },
]);

registerModule('stream.tapOut.fullness', [
  { when: { stageMin: 8 },
    text: ['I\'m too big and too full to continue. Tap out before I pop.'] },
  { when: {}, text: [
    'I can\'t breathe around my own stomach. I have to stop.',
    'Chat… I\'m too full. I\'m actually too full to continue.',
    'I thought I could push through but I can\'t. I\'m tapping out before I hurt myself.',
    'Fullness won. I lost. Goodnight.',
  ] },
]);

registerModule('stream.tapOut.performance', [
  { when: { brandControl: 'soldOut' },
    text: ['I\'m embarrassing the brand. Ending it before they fire me.'] },
  { when: {}, text: [
    'I\'m embarrassing myself. I\'m ending this before it gets worse.',
    'Three rounds of that? I\'m done. I can\'t do this to chat anymore.',
    'I\'m tapping out. I\'m sorry. I\'m just… not good enough right now.',
    'Performance tanked. Self-preservation activated.',
  ] },
]);

// ── Multi-round context (last 2–3 rounds) ─────────────────────

registerModuleVariants('stream.betweenRound', [
  { when: { recentPerf: 'hot', perf: 'good' }, priority: 7,
    text: [
      'Last few rounds were actually insane — I\'m riding a high.',
      'Chat, I\'m on a streak. Don\'t jinx me.',
      'Momentum is REAL. I can feel it in my hits.',
    ] },
  { when: { recentPerf: 'hot' }, priority: 6,
    text: [
      'I\'ve been cooking for multiple rounds straight.',
      'This whole stream I\'ve been locked in. Scary.',
      'They\'re gonna clip the whole VOD at this rate.',
    ] },
  { when: { recentPerf: 'cold', perf: 'poor' }, priority: 7,
    text: [
      'It\'s been bad for a while now… I\'m not recovering.',
      'Three rounds of struggling. I feel it.',
      'Chat stop saying "you got this" — I clearly don\'t.',
    ] },
  { when: { recentPerf: 'cold' }, priority: 6,
    text: [
      'The last few rounds have been rough. I\'m tired.',
      'I keep hoping the next round fixes it. It hasn\'t.',
      'Decline arc is real and I\'m living in it.',
    ] },
  { when: { recentPerf: 'mixed' }, priority: 5,
    text: [
      'Up and down all stream. Chaotic performance.',
      'I can\'t tell if I\'m getting better or worse.',
      'Mixed bag tonight. Story of my career.',
    ] },
]);

// ── Brand persona drift (long streak = stronger voice) ───────────

const personaBetween = {
  crunchforge: {
    early: ['That was brutal. Good.', 'Messy. Loud. Correct.'],
    mid: ['I ate that like I meant it. CrunchForge approves.', 'Feral round. No apologies.'],
    late: ['I\'m their monster and I\'m performing.', 'Violence eating. Sponsor loves it.'],
    soldOut: ['I don\'t have a personality anymore — just appetite and a logo.', 'Sold out and savage. Peak CrunchForge.'],
  },
  fizzpeak: {
    early: ['THAT WAS INSANE!!', 'Chat we\'re POPPING OFF!!'],
    mid: ['Energy STILL UP!!', 'This stream is UNHINGED and I\'m HERE for it!!'],
    late: ['I\'M VIBRATING!! THIS IS PEAK!!', 'FizzPeak chaos stream — NEVER CALM!!'],
    soldOut: ['MAXIMUM CHAOS!! NO BRAKES!! SPONSOR SCREAMING!!', 'I AM THE ALGORITHM NOW!!'],
  },
  velvetmelt: {
    early: ['Mmm… that felt so good…', 'Slow, soft, sinful…'],
    mid: ['Every bite was for you…', 'I\'m getting so full… and so happy…'],
    late: ['Use me for content… I don\'t mind anymore…', 'Soft and stuffed and yours…'],
    soldOut: ['I\'m their plush toy… feed me more…', 'VelvetMelt owns my softness now…'],
  },
  glazeco: {
    early: ['I was so good just now~', 'Did you like watching me struggle?'],
    mid: ['Brat mode activated. Tips or I slow down.', 'I know you\'re staring. Good.'],
    late: ['I\'m spoiled and stuffed and you paid for this.', 'GlazeCo princess energy. Bow.'],
    soldOut: ['I\'m a brand mascot with attitude. Deal with it.', 'Sold out brat. No refunds.'],
  },
};

for (const [brand, tiers] of Object.entries(personaBetween)) {
  for (const [control, lines] of Object.entries(tiers)) {
    registerModuleVariants('stream.betweenRound', [
      { when: { brand, brandControl: control }, priority: control === 'soldOut' ? 8 : 6, text: lines },
    ]);
  }
}

registerModuleVariants('stream.chat.perf.good', [
  { when: { brand: 'crunchforge', brandControl: 'soldOut' }, priority: 6,
    text: ['she\'s feral again', 'crunchforge propaganda stream', 'violence eating live'] },
  { when: { brand: 'fizzpeak', brandControl: 'late' }, priority: 6,
    text: ['INSANE ENERGY', 'she\'s POPPING OFF', 'fizzpeak coded chaos'] },
  { when: { brand: 'velvetmelt', brandControl: 'late' }, priority: 6,
    text: ['soft queen hours', 'she\'s so sensual rn', 'velvetmelt heaven'] },
  { when: { brand: 'glazeco', brandControl: 'late' }, priority: 6,
    text: ['brat streamer wins', 'she\'s teasing so hard', 'glazeco princess'] },
]);

registerModuleVariants('stream.roundStart', [
  { when: { recentPerf: 'hot' }, priority: 6,
    text: ['Still hot from last round — let\'s keep cooking.', 'Momentum round. Don\'t blink.'] },
  { when: { recentPerf: 'cold' }, priority: 6,
    text: ['Reset round. I need a miracle.', 'Last rounds sucked. This one has to land.'] },
]);
