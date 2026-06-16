// ═══════════════════════════════════════════════════════════════
// SCENE: HUNGER INTERRUPT — knock-at-the-door scenes
// See docs/Pharmacist/Hunger Event Lexicon.txt
// The Squad — Lead: A2 Psych | Support: A4 Architect, A5 Editor
// ═══════════════════════════════════════════════════════════════
import { registerPool, createContext, render } from '../../engine.js';
import './fragments.js';
import '../hungerArchetypeBehavior.js';

registerPool('scene.hungerInterrupt.starter', [
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 2,
    text: [
      "There's a sharp, impatient knock at your door.",
      'You hear a quiet, almost desperate knock.',
      "Someone's knocking — and they sound impatient.",
    ] },
  { when: { inWithdrawal: true }, priority: 2,
    text: [
      "There's a knock at your door — harder than usual.",
      'You hear footsteps outside, then an irritated knock.',
    ] },
  { when: {},
    text: [
      "There's a knock at your door.",
      'You hear a soft knock.',
      "There's a hesitant knock at the door.",
    ] },
]);

registerPool('scene.hungerInterrupt.appearance', [
  { when: { stage: [11] }, priority: 3,
    text: [
      'She completely fills the doorway with her sheer mass.',
      'Her body is so vast she can barely fit in the frame.',
      'Soft flesh presses against both sides of the doorframe.',
    ] },
  { when: { stage: [8, 9, 10] }, priority: 2,
    text: [
      'She fills most of the doorframe with her girth.',
      'Her massive body takes up nearly the entire doorway.',
      'She has to turn slightly to fit through the frame.',
    ] },
  { when: {}, text: [''] },
]);

registerPool('scene.hungerInterrupt.behavior', [
  { when: { corruption: [2], hungerTier: [3, 4] }, priority: 5,
    text: [
      "She doesn't bother with pretense anymore — she needs you to feed her.",
      'She looks at you like feeding her is the only thing that matters right now.',
    ] },
  { when: { corruption: [0], addictionLevel: [3, 4] }, priority: 4,
    text: [
      "She's embarrassed by how desperate she looks, but she can't hide it.",
      'She keeps trying to compose herself and failing.',
    ] },
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 4,
    text: [
      "She's standing there looking almost frantic.",
      "She's breathing hard, eyes wide with need.",
      "She looks like she's barely holding herself together.",
      "She's visibly shaking as she stands in front of you.",
    ] },
  { when: { addictionLevel: [3, 4], hungerTier: [3, 4] }, priority: 3,
    text: [
      "She's shifting restlessly, clearly struggling.",
      'She keeps glancing at you with a desperate look.',
      "She looks like she's been pacing outside your door.",
    ] },
  { when: { inWithdrawal: true }, priority: 3,
    text: [
      'She looks visibly irritated and on edge.',
      "She's glaring at you, clearly short-tempered.",
      "She looks like she's fighting the urge to snap.",
    ] },
  { when: { studentId: 5 }, priority: 2,
    text: [
      "She's wearing her headset around her neck, stream presumably paused. That means something.",
      "She's not on her phone. She's just standing there. That's more alarming than usual.",
    ] },
  { when: { studentId: 10 }, priority: 2,
    text: [
      "She's holding a container of something. For you, technically. She smells like whatever's in it.",
      'She came with food. She looks like she wants credit for this restraint.',
    ] },
  { when: { studentId: 16 }, priority: 2,
    text: [
      "Her lab notebook is tucked under one arm. She's here off-schedule. She knows that.",
      "She's annotating something in the margins as she waits. The pen hasn't stopped moving.",
    ] },
  { when: {},
    text: [
      "She's standing there looking restless.",
      'She shifts awkwardly in front of you.',
    ] },
]);

registerPool('scene.hungerInterrupt.request', [
  { when: { corruption: [2], hungerTier: [3, 4] }, priority: 5,
    text: [
      '"Feed me. I\'m not asking nicely anymore."',
      '"You know what I need. Stop making me wait."',
    ] },
  { when: { corruption: [0], hungerTier: [3, 4] }, priority: 4,
    text: [
      '"I… I hate that I need this. But I do. Please?"',
      '"Could we… maybe get food? I\'m trying not to sound desperate."',
    ] },
  { when: { stage: [10, 11], hungerTier: [3, 4], addictionLevel: [3, 4] }, priority: 4,
    text: [
      '"You\'re going to feed me."',
      '"I\'m not leaving until you feed me."',
      '"Don\'t even think about turning me away right now."',
    ] },
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 4,
    text: [
      '"I\'m so hungry…"',
      '"Please… I\'m starving. I need you to feed me."',
      '"I can\'t stop thinking about food… please feed me."',
      '"I\'m starving. I need you to feed me right now."',
    ] },
  { when: { addictionLevel: [3], hungerTier: [3, 4] }, priority: 3,
    text: [
      '"I\'ve been thinking about you feeding me all day…"',
      '"I\'m really hungry… can you feed me?"',
      '"I was hoping you\'d be around… I\'m so hungry."',
    ] },
  { when: { inWithdrawal: true }, priority: 3,
    text: [
      '"I need something from you. Now."',
      '"Don\'t ignore me. I\'m not in the mood."',
      '"You\'re not leaving me like this."',
    ] },
  { when: { studentId: 5 }, priority: 2,
    text: [
      `"Stream's on pause," she says. "Don't make this take long." She's going to make it take long.`,
      `"I'm… not going back until we do this." She doesn't say what 'this' is. You both know.`,
    ] },
  { when: { studentId: 10 }, priority: 2,
    text: [
      `"I was going to cook anyway. You should be here for it." She wasn't cooking yet. She will be now.`,
      `"Come taste this," she says. Her voice says it's an invitation. Her face says it's not optional.`,
    ] },
  { when: { studentId: 16 }, priority: 2,
    text: [
      `"I've adjusted the intake protocol," she says. "This counts as a session. I've noted it."`,
      `"My data says now." She looks embarrassed. Then doesn't.`,
    ] },
  { when: {},
    text: [
      '"Hey… can we talk?"',
      '"Do you have a minute?"',
    ] },
]);

registerPool('scene.hungerInterrupt.tone', [
  { when: { stage: [10, 11] }, priority: 2,
    text: 'Her massive body shifts heavily as she waits for your answer.' },
  { when: { stage: [8, 9] }, priority: 2,
    text: "She's clearly struggling to stay upright while she waits." },
  { when: { addictionLevel: [4], hungerTier: [4] }, priority: 2,
    text: 'She looks like she might actually start crying if you turn her away.' },
  { when: { inWithdrawal: true }, priority: 2,
    text: "She's angry, but underneath it she just looks miserable." },
  { when: {}, text: 'She waits for your answer.' },
]);

export const HUNGER_INTERRUPT_TEMPLATE =
  '{scene.hungerInterrupt.starter} You open the door and find {subject.name}. ' +
  '{scene.hungerInterrupt.personal|prefix: }{scene.hungerInterrupt.appearance|prefix: }{scene.hungerInterrupt.archetypeBehavior|prefix: }{scene.hungerInterrupt.behavior|prefix: }' +
  '{scene.hungerInterrupt.archetypeRequest|prefix: }{scene.hungerInterrupt.request} {scene.hungerInterrupt.tone}';

export function renderHungerInterrupt(student, week = 1, opts = {}) {
  const ctx = createContext({ subject: student, week });
  return render(HUNGER_INTERRUPT_TEMPLATE, ctx, { trace: opts.trace || null }).trim();
}

export function renderHungerOutcome(student, action, week = 1, opts = {}) {
  const key = { feed: 'scene.hunger.response.feed', compound: 'scene.hunger.response.compound', deny: 'scene.hunger.response.deny', talk: 'scene.hunger.response.talk' }[action];
  if (!key) return '';
  const ctx = createContext({ subject: student, week });
  const trace = opts.trace || null;
  let text = render(`{${key}}`, ctx, { trace }).trim();
  if (action === 'feed' || action === 'compound') {
    const style = render('{eating.style}', ctx, { trace }).trim();
    if (style) text = `${text} ${style}`;
  }
  return text;
}
