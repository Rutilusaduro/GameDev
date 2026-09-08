// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Stage-keyed depth on Destiny off-stream talk/activity/weigh-in pools.
import { registerModuleVariants } from '../engine.js';

const W = 4;

registerModuleVariants('destiny.offstream.talk', [
  { when: { stageMin: 10 }, weight: W, text: [
    `She shifts slow — mass settling. "Off-stream me is bigger than chat thinks. They'd pay for this angle."`,
    `Phone in one hand, snack in the other. "Sponsor life. Belly life. Same thing now."`,
  ]},
  { when: { stageMin: 8, brand: 'crunchforge' }, weight: 3, text: [
    `CrunchForge edge even off-camera. "What? I'm always hungry. That's the brand."`,
  ]},
  { when: { stageMin: 7, brand: 'velvetmelt' }, weight: 3, text: [
    `She moves like she's being watched. "VelvetMelt habits. Everything slower. Softer."`,
  ]},
  { when: { streamVoice: 'manic_soldOut', stageMin: 6 }, weight: 3, text: [
    `She vibrates in the chair. "Always on. Always eating. Contract life. No off switch."`,
  ]},
]);

registerModuleVariants('destiny.offstream.activity', [
  { when: { stageMin: 9 }, weight: W, text: [
    `Getting up takes a beat. "Stream stamina includes mass now. Don't @ me."`,
    `She pats her hip. "Bigger audience needs a bigger host. Math."`,
  ]},
  { when: { stageMin: 7, brand: 'fizzpeak' }, weight: 3, text: [
    `Bouncing leg. "Stream brain. Let's make something chaotic. Food involved."`,
  ]},
  { when: { streamVoice: 'bratty_soldOut' }, weight: 3, text: [
    `Spoiled sigh. "Princess work. Expensive, difficult, always eating."`,
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    `Half-smirk. "Activity? Sure. Is there food? There should be food."`,
  ]},
]);

registerModuleVariants('destiny.offstream.weighIn', [
  { when: { stageMin: 10 }, weight: W, text: [
    `Platform creaks. She smirks. "Content gold. Don't edit the sound."`,
    `She films the number. "B-roll for the weekly weigh-in stream. You're welcome."`,
  ]},
  { when: { stageMin: 8 }, weight: W, text: [
    `Follower count before weight. Stream metrics first. Always.`,
    `She mentions subscribers, then the number. "Both trending. Good week."`,
  ]},
  { when: { stageMin: 6, brand: 'crunchforge' }, weight: 3, text: [
    `Knuckles cracked at readout. "Higher. Always higher. CrunchForge math."`,
  ]},
  { when: { stageMin: 5, brand: 'glazeco' }, weight: 3, text: [
    `She poses on the scale. "Thumbnail material. You're welcome, chat."`,
  ]},
  { when: { streamVoice: 'sensual_deep', stageMin: 5 }, weight: 3, text: [
    `Slow breath over display. "Soft. Heavy. Watched. Perfect."`,
  ]},
]);
