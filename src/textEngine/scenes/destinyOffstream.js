// ═══════════════════════════════════════════════════════════════
// DESTINY — off-stream personality drift (talk, activity, weigh-in)
// ═══════════════════════════════════════════════════════════════
import { registerModule, registerModuleVariants } from '../engine.js';

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

registerModule('destiny.offstream.talk', [
  { when: { brand: 'crunchforge', brandControl: 'soldOut' },
    text: ['She\'s still got that CrunchForge edge even off-camera. "What? I\'m always hungry."'] },
  { when: { brand: 'fizzpeak' },
    text: ['She\'s restless. "I should probably eat something. Or go live. Same thing."'] },
  { when: { brand: 'velvetmelt' },
    text: ['She moves like she\'s being watched. "Old habits. VelvetMelt habits."'] },
  { when: { brand: 'glazeco' },
    text: ['Bratty half-smile. "You\'re staring. Good. That\'s the brand."'] },
  { when: {}, text: [''] },
]);

// ── Evolved activity preamble ──────────────────────────────────

registerModule('destiny.offstream.activity', [
  { when: { streamVoice: 'aggressive_soldOut' },
    text: ['She\'s already in sponsor mode before you say anything. "Stream event? Say less. I\'m feral either way."'] },
  { when: { streamVoice: 'manic_soldOut' },
    text: ['She\'s vibrating. "Another stream thing? LET\'S GO. I don\'t do calm anymore."'] },
  { when: { streamVoice: 'sensual_soldOut' },
    text: ['Soft voice, tired eyes. "Another show for them… okay. I\'m ready."'] },
  { when: { streamVoice: 'bratty_soldOut' },
    text: ['She stretches like it\'s a performance. "Fine. But chat better appreciate it."'] },
  { when: { streamVoice: 'aggressive_deep' },
    text: ['Cracking her neck. "If this ends with me eating on camera, good."'] },
  { when: { streamVoice: 'manic_deep' },
    text: ['Grin too wide. "Content hours! My favorite hours!"'] },
  { when: { brand: 'crunchforge' },
    text: ['She checks her phone — sponsor notifications. "They always want more. So do I, honestly."'] },
  { when: { brand: 'fizzpeak' },
    text: ['Bouncing leg. "I\'ve got stream brain. Let\'s make something chaotic."'] },
  { when: { brand: 'velvetmelt' },
    text: ['She\'s softer off-stream than she used to be. "Another night on camera… mmm."'] },
  { when: { brand: 'glazeco' },
    text: ['Mirror check. "Gotta look expensive even when we\'re not live."'] },
  { when: {}, text: [''] },
]);

// ── Weigh-in / detail flavor ───────────────────────────────────

registerModule('destiny.offstream.weighIn', [
  { when: { streamVoice: 'aggressive_soldOut', stageMin: 7 },
    text: ['She steps on the scale like it\'s content. "Chat\'s gonna lose it. Good."'] },
  { when: { streamVoice: 'sensual_deep' },
    text: ['Slow breath. "Every pound is… part of the show now."'] },
  { when: { stageMin: 7 },
    text: ['She mentions her follower count before her weight. Stream metrics first. Always.'] },
  { when: {}, text: [''] },
]);
