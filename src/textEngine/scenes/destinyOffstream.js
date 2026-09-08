// ═══════════════════════════════════════════════════════════════
// DESTINY — off-stream personality drift (talk, activity, weigh-in)
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants } from '../engine.js';

// ── Talk codas (appended in TalkModal) ─────────────────────────

const talkDrift = {
  aggressive: [
    'She wipes her mouth like she just finished something violent. "Sorry — stream brain. I\'m still in destroy mode."',
    'She cracks her knuckles. "Chat would\'ve loved how I talked just now. Feral hours."',
    'A half-smirk. "Don\'t get used to me being nice off-camera. CrunchForge broke that."',
  ],
  aggressive_deep: [
    'Her voice is rougher than it used to be. "I don\'t even pretend I\'m normal anymore. The brand won."',
    'She laughs without humor. "Off-stream me is just on-stream me with worse lighting."',
  ],
  aggressive_soldOut: [
    'She doesn\'t apologize for anything anymore. "They own my schedule. They own my appetite. What else is left?"',
    'Flat stare. "I\'m a mascot now. You\'re talking to the logo."',
  ],
  manic: [
    'She\'s talking too fast. "Sorry sorry — I\'m still buzzing from last stream. FizzPeak energy doesn\'t turn off."',
    'Jittery grin. "I could go live again right now. Don\'t tempt me."',
  ],
  manic_deep: [
    'She\'s vibrating. "Everything\'s insane. That\'s just baseline now. You get used to it or you don\'t."',
    'Laughs too loud. "Chat raised me on chaos. This is what I am."',
  ],
  manic_soldOut: [
    'Barely sitting still. "Sold out means always on. Always eating. Always performing. I don\'t know how to stop."',
    'Eyes wide. "Peak energy forever. That\'s the contract. I signed my nervous system away."',
  ],
  sensual: [
    'She speaks slower than she used to. "Mmm… sorry. VelvetMelt made me… deliberate."',
    'Soft exhale. "I catch myself performing off-camera now. Old habit. New brand."',
  ],
  sensual_deep: [
    'Breathy pause. "I\'m softer than I used to be. In every way. Chat likes it. I… don\'t mind."',
    'She touches her stomach absently. "They watch me like I\'m dessert. Maybe I am."',
  ],
  sensual_soldOut: [
    'Dreamy voice. "I belong to the camera now. Even when it\'s off, I feel watched."',
    'Quiet. "Use me for content. That\'s what I\'m for. Stream taught me that."',
  ],
  bratty: [
    'Eye roll. "GlazeCo voice activated. You\'re welcome. Tip if you want more."',
    'She smirks. "I\'m being difficult on purpose. It\'s good for engagement."',
  ],
  bratty_deep: [
    'Tosses hair. "I know exactly what I\'m doing to you. Chat trained me. Sponsor rewards me."',
    'Sweet voice, sharp eyes. "Don\'t act surprised when I\'m a brat offline too."',
  ],
  bratty_soldOut: [
    'Spoiled sigh. "I\'m their princess. Expensive, difficult, and always eating."',
    'She won\'t meet your eyes. "Sold out means I don\'t have to be real anymore. Easier."',
  ],
};

for (const [voice, lines] of Object.entries(talkDrift)) {
  registerModuleVariants('destiny.offstream.talk', [
    { when: { streamVoice: voice }, priority: voice.includes('soldOut') ? 8 : 6, text: lines },
  ]);
}

registerPool('destiny.offstream.talk', [
  { when: { brand: 'crunchforge', brandControl: 'soldOut' },
    text: [
      'She\'s still got that CrunchForge edge even off-camera. "What? I\'m always hungry."',
      'Jaw tight, eyes bright. "Off-stream doesn\'t mean off-appetite. Sponsor taught me that."',
      'She cracks her knuckles. "Chat wants feral. I deliver feral. Even when the camera\'s dead."',
    ] },
  { when: { brand: 'crunchforge' },
    text: [
      'Aggressive grin. "CrunchForge hours never end. My stomach got the memo."',
      'She wipes crumbs off her hoodie. "Protein bars are foreplay. Real food is the show."',
    ] },
  { when: { brand: 'fizzpeak', brandControl: 'soldOut' },
    text: [
      'She vibrates in the chair. "Always on. Always buzzing. Always eating. Contract life."',
      'Eyes too wide. "FizzPeak broke my off switch. I don\'t mind. Much."',
    ] },
  { when: { brand: 'fizzpeak' },
    text: [
      'She\'s restless. "I should probably eat something. Or go live. Same thing."',
      'Leg bouncing. "Energy drink and a burger — peak content fuel. Don\'t judge."',
      'She talks fast. "Sorry, stream brain. I\'m still in chaos mode."',
    ] },
  { when: { brand: 'velvetmelt', brandControl: 'soldOut' },
    text: [
      'Dreamy and distant. "VelvetMelt owns my softness now. On camera, off camera — all melt."',
      'She touches her stomach absently. "They watch me like dessert. Maybe I am dessert."',
    ] },
  { when: { brand: 'velvetmelt' },
    text: [
      'She moves like she\'s being watched. "Old habits. VelvetMelt habits."',
      'Soft voice. "I catch myself performing off-camera. Old brand, new body."',
      'She exhales slow. "Mmm… sorry. Sponsor made me deliberate. Everything\'s slower now."',
    ] },
  { when: { brand: 'glazeco', brandControl: 'soldOut' },
    text: [
      'Spoiled sigh. "GlazeCo princess doesn\'t do humble. Tip your waitress."',
      'She won\'t meet your eyes. "Sold out means I don\'t have to be real. Easier."',
    ] },
  { when: { brand: 'glazeco' },
    text: [
      'Bratty half-smile. "You\'re staring. Good. That\'s the brand."',
      'Eye roll. "GlazeCo voice activated. You\'re welcome."',
      'Sweet voice, sharp eyes. "I\'m difficult on purpose. Engagement, babe."',
    ] },
  { when: { streamVoice: 'aggressive' },
    text: [
      'She wipes her mouth like she just finished something violent. "Sorry — stream brain. Still in destroy mode."',
      'Half-smirk. "Don\'t get used to me being nice off-camera."',
    ] },
  { when: { streamVoice: 'manic' },
    text: [
      'She\'s talking too fast. "Sorry sorry — still buzzing from last stream."',
      'Jittery grin. "I could go live again right now. Don\'t tempt me."',
    ] },
  { when: { streamVoice: 'sensual' },
    text: [
      'She speaks slower than she used to. "Mmm… sorry. Made me… deliberate."',
      'Soft exhale. "I catch myself performing off-camera now."',
    ] },
  { when: { streamVoice: 'bratty' },
    text: [
      'Eye roll. "You\'re welcome. Tip if you want more."',
      'She smirks. "I\'m being difficult on purpose. Good for engagement."',
    ] },
  { when: { stageMin: 6 },
    text: [
      'She shifts in the chair — mass settling slow. "Off-stream me is softer than chat thinks."',
      'Her hoodie rides up when she stretches. She does not fix it. "What? I\'m comfortable."',
    ] },
  { when: {}, text: [
    '',
    'She checks her phone mid-sentence. "Sorry. Notifications. Sponsor life."',
    'A half-laugh. "Off-camera Destiny is just on-camera Destiny with worse lighting."',
    'She picks at a snack while she talks. "Don\'t mind me. Multitasking."',
  ] },
]);

// ── Evolved activity preamble ──────────────────────────────────

registerPool('destiny.offstream.activity', [
  { when: { streamVoice: 'aggressive_soldOut' },
    text: [
      'She\'s already in sponsor mode before you say anything. "Stream event? Say less. I\'m feral either way."',
      'Cracking her neck. "If this ends with me eating on camera, good. If not, also good."',
    ] },
  { when: { streamVoice: 'manic_soldOut' },
    text: [
      'She\'s vibrating. "Another stream thing? LET\'S GO. I don\'t do calm anymore."',
      'Grin too wide. "Content hours! My favorite hours! Feed the algorithm!"',
    ] },
  { when: { streamVoice: 'sensual_soldOut' },
    text: [
      'Soft voice, tired eyes. "Another show for them… okay. I\'m ready."',
      'She stretches like it\'s a performance. "Use me for content. That\'s what I\'m for now."',
    ] },
  { when: { streamVoice: 'bratty_soldOut' },
    text: [
      'She stretches like it\'s a performance. "Fine. But chat better appreciate it."',
      'Spoiled sigh. "Princess work. Expensive, difficult, always eating."',
    ] },
  { when: { streamVoice: 'aggressive_deep' },
    text: [
      'Cracking her neck. "If this ends with me eating on camera, good."',
      'Her voice is rougher than it used to be. "The brand won. I stopped fighting it."',
    ] },
  { when: { streamVoice: 'manic_deep' },
    text: [
      'Grin too wide. "Content hours! My favorite hours!"',
      'She\'s vibrating. "Everything\'s insane. That\'s baseline now."',
    ] },
  { when: { streamVoice: 'sensual_deep' },
    text: [
      'Breathy pause. "I\'m softer than I used to be. In every way. Chat likes it."',
      'She touches her stomach absently. "They watch me like I\'m dessert."',
    ] },
  { when: { streamVoice: 'bratty_deep' },
    text: [
      'Tosses hair. "I know exactly what I\'m doing to you. Chat trained me."',
      'Sweet voice, sharp eyes. "Don\'t act surprised when I\'m a brat offline too."',
    ] },
  { when: { brand: 'crunchforge' },
    text: [
      'She checks her phone — sponsor notifications. "They always want more. So do I, honestly."',
      'Aggressive grin. "CrunchForge event? I\'m already hungry. Let\'s wreck a menu."',
    ] },
  { when: { brand: 'fizzpeak' },
    text: [
      'Bouncing leg. "I\'ve got stream brain. Let\'s make something chaotic."',
      'She\'s restless. "Food challenge? Stunt? Both? Say the word."',
    ] },
  { when: { brand: 'velvetmelt' },
    text: [
      'She\'s softer off-stream than she used to be. "Another night on camera… mmm."',
      'Slow smile. "VelvetMelt wants slow. Sensual. I can do slow."',
    ] },
  { when: { brand: 'glazeco' },
    text: [
      'Mirror check. "Gotta look expensive even when we\'re not live."',
      'Bratty half-smile. "Another event? Fine. But I\'m eating like royalty."',
    ] },
  { when: { stageMin: 7 },
    text: [
      'She pats her hip. "Bigger audience needs a bigger host. Math."',
      'Getting up takes a beat. "Stream stamina includes mass now. Don\'t @ me."',
    ] },
  { when: {}, text: [
    '',
    'She checks notifications before you finish explaining. "Cool. When do we eat?"',
    'Half-smirk. "Activity? Sure. Is there food involved? There should be."',
    'She\'s already in content mode. "Let\'s make something worth clipping."',
  ] },
]);

// ── Weigh-in / detail flavor ───────────────────────────────────

registerPool('destiny.offstream.weighIn', [
  { when: { streamVoice: 'aggressive_soldOut', stageMin: 7 },
    text: [
      'She steps on the scale like it\'s content. "Chat\'s gonna lose it. Good."',
      'Flat stare at the number. "Clip that. Post it. I don\'t care anymore."',
    ] },
  { when: { streamVoice: 'manic_soldOut', stageMin: 6 },
    text: [
      'She bounces on the platform. "Numbers go up! Numbers go up! That\'s the bit!"',
      'Eyes wide. "New personal best? NEW PERSONAL BEST!"',
    ] },
  { when: { streamVoice: 'sensual_soldOut', stageMin: 6 },
    text: [
      'Slow breath. "Every pound is… part of the show now."',
      'She exhales over the display. "Soft. Heavy. Watched. Perfect."',
    ] },
  { when: { streamVoice: 'bratty_soldOut', stageMin: 6 },
    text: [
      'She poses on the scale. "Thumbnail material. You\'re welcome."',
      'Spoiled pout. "Yes, I\'m bigger. Yes, chat pays for it. Next question."',
    ] },
  { when: { streamVoice: 'sensual_deep' },
    text: [
      'Slow breath. "Every pound is… part of the show now."',
      'She traces her hip. "Softer off-camera too. Sponsor likes the trend."',
    ] },
  { when: { streamVoice: 'aggressive_deep', stageMin: 5 },
    text: [
      'She flexes, then relaxes into the new mass. "Still winning. Different game."',
      'Jaw set. "The number climbed. Good. More to work with."',
    ] },
  { when: { brand: 'crunchforge', stageMin: 5 },
    text: [
      'She cracks her knuckles at the readout. "Fuel in, mass out. CrunchForge math."',
      'Aggressive grin. "Higher. Always higher. That\'s the brand."',
    ] },
  { when: { brand: 'velvetmelt', stageMin: 5 },
    text: [
      'Soft exhale. "Mmm. Heavier. Slower. Exactly what they paid for."',
      'She sways on the platform. "Velvet doesn\'t rush. Neither does this."',
    ] },
  { when: { stageMin: 7 },
    text: [
      'She mentions her follower count before her weight. Stream metrics first. Always.',
      'The platform creaks. She smirks. "Content gold. Don\'t edit the sound."',
      'She films the number with her phone. "B-roll for the weekly weigh-in stream."',
    ] },
  { when: { stageMin: 4, stageMax: 6 },
    text: [
      'She checks the angle in the mirror behind the scale. "Lighting\'s good. Number\'s better."',
      'A half-laugh. "Relatable gain content. Chat eats this up. Literally."',
    ] },
  { when: {}, text: [
    '',
    'She glances at her phone after the number lands. "Okay. Cool. What\'s for dinner?"',
    'Off-stream shrug. "Logged. Next."',
    'She steps off and immediately thinks about snacks. "Don\'t judge me."',
  ] },
]);

import './destinyOffstreamSceneDepth.js';
