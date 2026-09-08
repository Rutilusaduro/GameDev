// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed depth on Destiny live stream pools (end/tap/round).
import { registerModuleVariants } from '../engine.js';

const W = 4;

registerModuleVariants('stream.endStream.excellent', [
  { when: { stageMin: 10 }, weight: W, text: [
    `That was insane at this scale — belly on camera, chat losing it, sponsor screaming.`,
    `Best stream in months. I'm still buzzing and I can barely stand.`,
  ]},
  { when: { stageMin: 8 }, weight: 3, text: [
    `Chat, that might've been my best stream ever. Frame full, appetite full, ego full.`,
    `Ending on a high. Rare. Savor it before I sit down and don't get up.`,
  ]},
  { when: { brandControl: 'soldOut', stageMin: 7 }, weight: 3, text: [
    `Sold out and still excellent. The brand got their monster. I got paid.`,
  ]},
]);

registerModuleVariants('stream.endStream.good', [
  { when: { stageMin: 9 }, weight: W, text: [
    `Solid stream. I'm vast, tired, and weirdly proud. VOD stays up.`,
    `Not perfect, but chat showed up and so did my appetite. Good enough.`,
  ]},
  { when: { trend: 'improving', stageMin: 6 }, weight: 3, text: [
    `Started shaky, ended strong. Growth arc on stream and on scale.`,
  ]},
]);

registerModuleVariants('stream.endStream.average', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `Mid stream, mid destruction. Classic me — belly honest, performance mid.`,
    `We made it through. Could've been worse. Could've been more food too.`,
  ]},
]);

registerModuleVariants('stream.endStream.poor', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `That was rough. I'm gonna go lie down and let gravity sort the rest.`,
    `Don't clip the worst parts. I'm logging off before chat gets creative.`,
  ]},
]);

registerModuleVariants('stream.endStream.verypoor', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `I need to delete the VOD. I'm not even joking. Worst stream in a while.`,
    `Please don't clip that. Please. I'm done.`,
  ]},
]);

registerModuleVariants('stream.tapOut.stamina', [
  { when: { stageMin: 10 }, weight: W, text: [
    `Body said no. At this size stamina is a joke. I'm tapping out.`,
  ]},
  { when: { addiction: [2], stageMin: 7 }, weight: 3, text: [
    `Empty and full and addicted and DONE. Tap. Chat, I tried.`,
  ]},
]);

registerModuleVariants('stream.tapOut.fullness', [
  { when: { stageMin: 11 }, weight: W, text: [
    `I'm too big and too full to continue. Tap before I pop on camera.`,
  ]},
  { when: { stageMin: 9 }, weight: W, text: [
    `Can't breathe around my own stomach. Chat, I'm tapping out — belly won.`,
  ]},
  { when: { intensity: 'extreme' }, weight: 3, text: [
    `I went too far. Fullness won. I'm tapping before chat calls an ambulance.`,
  ]},
]);

registerModuleVariants('stream.tapOut.performance', [
  { when: { brandControl: 'soldOut', stageMin: 6 }, weight: 3, text: [
    `I'm embarrassing the brand. Ending before they fire me.`,
  ]},
  { when: { recentPerf: 'cold' }, weight: 3, text: [
    `Three rounds of struggling. I'm tapping out with dignity optional.`,
  ]},
]);

registerModuleVariants('stream.roundStart', [
  { when: { stageMin: 9, challengeType: 'endurance' }, weight: W, text: [
    `Long round at this scale. Buckle up — I'm not moving fast but I'm not stopping.`,
  ]},
  { when: { stageMin: 8, challengeType: 'sensual' }, weight: 3, text: [
    `Slow round. Make them wait. At this size every bite is content.`,
  ]},
  { when: { recentPerf: 'hot', stageMin: 6 }, weight: 3, text: [
    `Still hot from last round. Momentum round — don't blink.`,
  ]},
]);

registerModuleVariants('stream.betweenRound', [
  { when: { stageMin: 10, perf: 'good' }, weight: W, text: [
    `Chat's eating this up. So am I. Belly's loud and I don't care.`,
  ]},
  { when: { stageMin: 8, perf: 'excellent' }, weight: 3, text: [
    `Holy shit I'm peaking at this size. Clip it. Clip all of it.`,
  ]},
  { when: { stageMin: 7, perf: 'poor' }, weight: 3, text: [
    `I'm struggling and the chat can see every pound. Great.`,
  ]},
]);

registerModuleVariants('stream.chat.tapOut.fullness', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `she hit the wall HARD`,
    `stomach won at legendary scale`,
    `too full to continue omg`,
  ]},
]);
