// The Squad — Lead: A2 Psych | Support: A3 Immobility, A5 Editor
// V2.0 Body Echo Archive prose
import { registerPool, render } from '../../../engine.js';

registerPool('echo.capture', [
  { when: { stageMin: 9 }, text: [
    'The moment crystallizes — vast, warm, impossible to forget. Her body fills the memory the way it fills the room.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Something shifts. The archive catches it — a snapshot of appetite becoming identity.',
  ]},
  { when: {}, text: [
    'The echo forms. A moment preserved in hunger and warmth.',
  ]},
]);

registerPool('echo.replay', [
  { when: {}, text: [
    '{echo.replay.beat} {echo.replay.sensory}',
  ]},
]);
registerPool('echo.replay.beat', [
  { when: { stageMin: 8 }, text: [
    'You return to the moment. Her belly still sways in memory — heavy, warm, the physics unchanged by time.',
  ]},
  { when: {}, text: [
    'The echo replays. Fuller this time. More specific. The body remembers what the mind tried to soften.',
  ]},
]);
registerPool('echo.replay.sensory', [
  { when: { stageMin: 6 }, text: [
    'Warmth. Weight. The creak of furniture accepting her. The sound of her breathing after the third helping.',
  ]},
  { when: {}, text: [
    'Softness. Heat. The particular give of flesh when she leans forward for more.',
  ]},
]);

registerPool('echo.resonate', [
  { when: {}, text: [
    'You press into the memory until it bleeds into the present — appetite amplified, gain hastened, the echo becoming prophecy.',
  ]},
]);

registerPool('echo.type.stage_up', [
  { when: {}, text: [
    'She crossed a threshold. The scale confirmed what her clothes had been whispering for weeks.',
  ]},
]);
registerPool('echo.type.weigh_in', [
  { when: {}, text: [
    'The number landed. She looked at it. She did not look away.',
  ]},
]);
registerPool('echo.type.dinner_unbutton', [
  { when: {}, text: [
    'A button gave. She kept eating. The restaurant pretended not to notice.',
    'Fabric surrendered. Appetite did not. The moment is preserved whole.',
  ]},
]);
registerPool('echo.type.immobility', [
  { when: {}, text: [
    'She stopped needing to move. The world came to her instead — food, warmth, devotion.',
    'Immobile and content. The threshold where size becomes architecture.',
  ]},
]);
registerPool('echo.type.corruption_tier', [
  { when: {}, text: [
    'Something shifted in how she wants — hungrier, softer, less interested in refusal.',
    'Corruption crossed a line. Appetite stopped asking permission.',
  ]},
]);

registerPool('echo.type.evolution', [
  { when: {}, text: [
    'She chose a new shape for her hunger — evolved, amplified, unmistakably hers.',
    'The form shifted. Appetite found a new vessel. The archive caught the instant she stopped hesitating.',
  ]},
]);

export function renderEchoReplay(echoType, depthTier, ctx) {
  let text = render('{echo.replay}', ctx);
  if (depthTier >= 2) text += '\n\n' + render(`{echo.type.${echoType}}`, ctx);
  if (depthTier >= 3) text += '\n\n' + render('{echo.resonate}', ctx);
  return text;
}

export function renderEchoCapture(ctx) { return render('{echo.capture}', ctx); }
