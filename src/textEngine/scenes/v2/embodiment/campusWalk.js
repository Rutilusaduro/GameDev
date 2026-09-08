// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Embodied campus pilot — walk, arrive, special events
import { registerPool, createContext, render } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import { CAMPUS_NODES } from '../../../../gameData/campus.js';
import { campusNodeToLocale } from '../../../../gameData/textContext.js';

registerPool('emb.walk.arrive', [
  { when: { stageMin: 8 }, text: [
    'She arrives like weather — mass first, apology later. Every step is negotiation with gravity.',
    'The hallway makes room the way water makes room for something large and warm.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Her hips find the rhythm of someone who has learned that speed is no longer free.',
    'She waddles with the careful pride of a girl whose body has outpaced her old habits.',
  ]},
  { when: { corruptionMin: 40 }, text: [
    'She does not hurry. Hunger and fullness trade places inside her and she keeps walking anyway.',
    'Campus air tastes like permission. She breathes it in and does not apologize.',
  ]},
  { when: {}, text: [
    'You steer her feet from the inside. The world tilts toward food and witnesses.',
    'Her pulse quickens with each step — yours and hers braided together.',
    'Campus noise washes over her skin. You feel every glance she pretends not to notice.',
  ]},
]);

registerPool('emb.walk.move', [
  { when: { stageMin: 7 }, text: [
    '→ {campus.destination} — slow, warm, inevitable.',
    '→ toward {campus.destination}; her body sways with honest weight.',
  ]},
  { when: {}, text: [
    '→ {campus.destination}',
    '→ she crosses campus toward {campus.destination}, appetite trailing behind her.',
    '→ waddling toward {campus.destination}, every step a small surrender to gravity.',
  ]},
]);

registerPool('emb.event.stuck_door', [
  { when: { stageMin: 8 }, text: [
    'The doorframe wins the argument. She exhales, turns sideways, and still has to tug — soft hip, then belly, then the rest of her following like a decision.',
    'Wood groans. She is stuck halfway through, breathless and laughing in a way that is not entirely embarrassment.',
  ]},
  { when: { stageMin: 6 }, text: [
    'She misjudged the angle. Shoulders, then hips — a wiggle, a blush, a sound from the frame that campus will remember.',
    'For a long moment she is a girl in a doorway, too much and too real. Someone behind her pretends not to watch.',
  ]},
  { when: {}, text: [
    'The frame is narrower than last month. She turns, exhales, and still has to push.',
    'Wood complains. She pretends it is the door that is wrong.',
    'For one breath she is stuck — soft, flushed, too real to ignore.',
  ]},
]);

registerPool('emb.event.clothes_burst', [
  { when: { stageMin: 7 }, text: [
    'A seam gives with a soft rip — waistband, button, the old lie that this still fit. She freezes, then keeps walking like fabric did not just confess.',
    'Her top rides up and refuses to come down. She tugs once, gives up, and lets campus see what the mirror already knew.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Something pops — button, stitch, pride. She feels the cool air on new skin and pretends it was always like this.',
    'The waistband rolls under her middle with a defeated sigh. She does not fix it. You do not let her.',
  ]},
  { when: {}, text: [
    'Fabric loses an argument it was never going to win.',
    'A stitch pops. She keeps walking like nothing happened.',
    'The waistband rolls. She does not fix it. You do not let her.',
  ]},
]);

registerPool('emb.event.bully_forcefeed', [
  { when: { corruptionMax: 30 }, text: [
    'A ring of girls closes in — not cruel, exactly, but certain. "Eat," one says, holding out what they brought. She tries to refuse. They do not accept refusal.',
    'They corner her with laughter and Tupperware. Every bite is witnessed. Every bite lands.',
  ]},
  { when: {}, text: [
    '"You\'ve been holding out on us." They push food into her hands, then her mouth — teasing, relentless, delighted by how fast she gives in.',
    'They feed her like a dare she is already losing. She moans around the fourth bite before shame catches up.',
    'Laughter, Tupperware, hands on her shoulders. She eats because refusing costs more than obeying.',
  ]},
]);

registerPool('emb.event.npc_stare', [
  { when: { stageMin: 6 }, text: [
    'Eyes follow her the way eyes follow weather — openly, helplessly. She pretends not to notice and fails.',
    'A stranger looks twice, then a third time. Her body announces itself without her permission.',
  ]},
  { when: {}, text: [
    'Someone looks too long. She feels it on her skin like heat.',
    'A glance catches on her middle and does not let go.',
    'Eyes travel her body the way hands would if politeness allowed.',
  ]},
]);

registerPool('emb.event.gossip_whisper', [
  { when: { stageMin: 5 }, text: [
    'Voices dip as she passes, then rise behind her — "did you see," "she\'s really," "I heard she." She keeps walking. Her appetite keeps score.',
    'Laughter skitters at her back. She cannot make out every word. She catches enough.',
  ]},
  { when: {}, text: [
    'Whispers stitch the air behind her. She pretends not to hear. Her face warms anyway.',
    'She catches her name in a sentence that was not meant for her ears.',
    'Laughter follows like a shadow. Her appetite does not care.',
  ]},
]);

registerPool('emb.event.vending_splurge', [
  { when: {}, text: [
    'The machine hums like an invitation. Coins, buttons, falling bags — she eats before she reaches a bench.',
    'She buys more than hunger strictly requires. You help her not care.',
    'Crinkling wrappers, sweet salt, the private sound of giving in early.',
  ]},
]);

registerPool('emb.event.cafeteria_binge', [
  { when: { stageMin: 6 }, text: [
    'Tray after tray. The dining hall stops pretending this is one meal. Staff watch with professional neutrality.',
    'She eats like the semester depends on it — plate, plate, plate — until fullness becomes a fact and spectacle becomes habit.',
  ]},
  { when: {}, text: [
    'Unlimited means unlimited. She takes the phrase personally.',
    'Tray after tray until fullness becomes public fact.',
    'The dining hall watches her eat like it is a sport. She is winning.',
  ]},
]);

registerPool('emb.event.quad_picnic', [
  { when: {}, text: [
    'Someone offers a plate she did not ask for. She accepts anyway. The lawn is full of eating and she joins without ceremony.',
    'Picnic smells find her like a hand on the shoulder. She sits. She does not leave hungry.',
    'Blankets, crumbs, second helpings pressed on her with cheerful insistence.',
  ]},
]);

registerPool('emb.event.classmate_sighting', [
  { when: {}, text: [
    'A classmate spots her across the path — wave, stare, the quick look at her middle. "Hey… you good?" She nods. She is more than good.',
    'Someone from class calls her name. The spirit prickles: being seen is how reach grows.',
    'A familiar face clocks the change in her and tries not to show it. She smiles anyway.',
  ]},
]);

const EVENT_POOL = {
  stuck_door: 'emb.event.stuck_door',
  clothes_burst: 'emb.event.clothes_burst',
  bully_forcefeed: 'emb.event.bully_forcefeed',
  npc_stare: 'emb.event.npc_stare',
  gossip_whisper: 'emb.event.gossip_whisper',
  vending_splurge: 'emb.event.vending_splurge',
  cafeteria_binge: 'emb.event.cafeteria_binge',
  quad_picnic: 'emb.event.quad_picnic',
  classmate_sighting: 'emb.event.classmate_sighting',
};

function embCtx(student, week, nodeId, opts = {}) {
  const node = CAMPUS_NODES[nodeId] || CAMPUS_NODES.dorms;
  return createContext({
    subject: student,
    week,
    globals: {
      embodiment: true,
      campusLocale: campusNodeToLocale(nodeId),
      campusNodeId: nodeId,
      campusDestination: node.label,
      ...opts.globals,
    },
    ...opts,
  });
}

export function renderEmbodiedArrive(student, nodeId, week = 1, opts = {}) {
  const ctx = embCtx(student, week, nodeId, opts);
  const base = render('{emb.walk.arrive}', ctx, { trace: opts.trace || null })?.trim() || '';
  const node = CAMPUS_NODES[nodeId];
  const flavor = node?.flavor?.[week % (node.flavor?.length || 1)] || '';
  const composed = flavor ? `${base} ${flavor}` : base;
  return appendV2Depth(composed, 'spirit', ctx, opts.v2DepthChance ?? 0.35);
}

export function renderEmbodiedMove(student, fromId, toId, week = 1, opts = {}) {
  const ctx = embCtx(student, week, toId, opts);
  const line = render('{emb.walk.move}', ctx, { trace: opts.trace || null })?.trim() || `→ ${CAMPUS_NODES[toId]?.label || toId}`;
  return appendV2Depth(line, 'spirit', ctx, opts.v2DepthChance ?? 0.22);
}

export function renderEmbodiedEvent(eventId, student, nodeId, week = 1, opts = {}) {
  const pool = EVENT_POOL[eventId] || 'emb.walk.arrive';
  const ctx = embCtx(student, week, nodeId, opts);
  const base = render(`{${pool}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'spirit', ctx, opts.v2DepthChance ?? 0.4);
}
