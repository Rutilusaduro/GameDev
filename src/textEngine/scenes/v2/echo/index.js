// The Squad — Lead: A2 Psych | Support: A3 Immobility, A5 Editor
// V2.0 Body Echo Archive prose
import { registerPool, render } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import './depth.js';
import './echoSceneDepth.js';

registerPool('echo.capture', [
  { when: { stageMin: 9 }, text: [
    'The moment crystallizes — vast, warm, impossible to forget. Her body fills the memory the way it fills the room.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Something shifts. The archive catches it — a snapshot of appetite becoming identity.',
    'Threshold preserved. Growth made retrievable.',
  ]},
  { when: { stageMax: 4 }, text: [
    'Early echo — softness still surprising, appetite still learning to speak without blush.',
  ]},
  { when: {}, text: [
    'The echo forms. A moment preserved in hunger and warmth.',
    'Captured — hunger crystallized, available to revisit and deepen.',
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
  { when: { stageMin: 4 }, text: [
    'The echo replays with more detail than last visit — appetite sharper, body more present.',
  ]},
  { when: {}, text: [
    'The echo replays. Fuller this time. More specific. The body remembers what the mind tried to soften.',
  ]},
]);
registerPool('echo.replay.sensory', [
  { when: { stageMin: 6 }, text: [
    'Warmth. Weight. The creak of furniture accepting her. The sound of her breathing after the third helping.',
    'Heat radiating from memory-flesh — belly, thighs, the soft architecture of change.',
  ]},
  { when: {}, text: [
    'Softness. Heat. The particular give of flesh when she leans forward for more.',
    'Sensation returns intact — fullness, fabric strain, the pleasure of being counted.',
  ]},
]);

registerPool('echo.resonate', [
  { when: { stageMin: 6 }, text: [
    'You press into the memory until it bleeds into the present — appetite amplified, gain hastened, the echo becoming prophecy.',
  ]},
  { when: {}, text: [
    'You press into the memory until it bleeds into the present — appetite amplified, gain hastened, the echo becoming prophecy.',
    'Resonance drives the archive into flesh. She will grow faster for being remembered this way.',
  ]},
]);

registerPool('echo.type.stage_up', [
  { when: { stageMin: 6 }, text: [
    'She crossed a threshold the whole room felt — mass made visible, growth made ceremony.',
  ]},
  { when: {}, text: [
    'She crossed a threshold. The scale confirmed what her clothes had been whispering for weeks.',
  ]},
]);
registerPool('echo.type.weigh_in', [
  { when: {}, text: [
    'The number landed. She looked at it. She did not look away.',
    'Digits climbed. She tracked them with quiet satisfaction.',
  ]},
]);
registerPool('echo.type.dinner_unbutton', [
  { when: { stageMin: 4 }, text: [
    'A button gave in public. She kept eating. The restaurant pretended not to notice and failed.',
  ]},
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
  { when: { corruptionMin: 50 }, text: [
    'Corruption crossed a line — want reorganized around yes, shame losing another foothold.',
  ]},
  { when: {}, text: [
    'Something shifted in how she wants — hungrier, softer, less interested in refusal.',
    'Corruption crossed a line. Appetite stopped asking permission.',
  ]},
]);
registerPool('echo.type.evolution', [
  { when: { stageMin: 5 }, text: [
    'She chose a new shape for her hunger — evolved, amplified, unmistakably hers at scale.',
  ]},
  { when: {}, text: [
    'She chose a new shape for her hunger — evolved, amplified, unmistakably hers.',
    'The form shifted. Appetite found a new vessel. The archive caught the instant she stopped hesitating.',
  ]},
]);

registerPool('echo.linger', [
  { when: { stageMax: 3 }, weight: 2, text: [
    'The memory is small and warm. She keeps it like a snack she will finish later.',
    'Early echo. Softness still surprising. She plays it back anyway.',
  ] },
  { when: { stageMin: 6 }, weight: 2, text: [
    'The archive holds mass now. Replaying it makes the room feel smaller.',
  ] },
  { when: {}, text: [
    'The echo stays after the scene. Hunger uses it as a bookmark.',
    'She breathes once. The memory breathes with her.',
    'Stored warmth. She will grow into it again.',
  ] },
]);

function appendEchoDepth(text, depthKey, ctx, chance) {
  const trimmed = text?.trim() || '';
  const local = render(`{${depthKey}}`, ctx)?.trim();
  const linger = render('{echo.linger}', ctx)?.trim();
  const combined = [trimmed, local, linger].filter(Boolean).join('\n\n');
  return appendV2Depth(combined, 'echo', ctx, chance);
}

export function renderEchoReplay(echoType, depthTier, ctx) {
  let text = render('{echo.replay}', ctx);
  if (depthTier >= 2) text += '\n\n' + render(`{echo.type.${echoType}}`, ctx);
  if (depthTier >= 3) text += '\n\n' + render('{echo.resonate}', ctx);
  const depthKey = depthTier >= 3 ? 'echo.resonate.depth' : 'echo.replay.depth';
  return appendEchoDepth(text?.trim() || '', depthKey, ctx, 0.32);
}

export function renderEchoCapture(ctx) {
  const base = render('{echo.capture}', ctx)?.trim() || '';
  return appendEchoDepth(base, 'echo.capture.depth', ctx, 0.3);
}
