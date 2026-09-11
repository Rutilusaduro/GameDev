// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
// Embodied campus pilot — walk, arrive, special events
import { registerPool, createContext, render } from '../../../engine.js';
import { appendV2Depth } from '../depthRenderer.js';
import { CAMPUS_NODES } from '../../../../gameData/campus.js';
import { campusNodeToLocale } from '../../../../gameData/textContext.js';
import { normalizeEmbodiedEventId } from '../../../../gameData/v2/embodiedCampus.js';
import { renderCampusLook } from '../../overhaul/campusHunt.js';

registerPool('emb.walk.arrive', [
  { when: { stageMin: 8 }, text: [
    'She arrives like weather — mass first, apology later. Every step is negotiation with gravity.',
    'The hallway makes room the way water makes room for something large and warm.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Her hips find the rhythm of someone who has learned that speed is no longer free.',
    'She waddles with the careful pride of a resident whose body has outpaced her old habits.',
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
    'For a long moment she is a resident in a doorway, too much and too real. Someone behind her pretends not to watch.',
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
    '{ref.name} closes the ring — not cruel, exactly, but certain. "Eat," she says, holding out what they brought. She tries to refuse. They do not accept refusal.',
    '{ref.name} corners her with laughter and Tupperware. Every bite is witnessed. Every bite lands.',
  ]},
  { when: {}, text: [
    '"You\'ve been holding out on us," {ref.name} says. They push food into her hands, then her mouth — teasing, relentless, delighted by how fast she gives in.',
    '{ref.name} feeds her like a dare she is already losing. She moans around the fourth bite before shame catches up.',
    '{ref.name} and the others pin her shoulders. She eats because refusing costs more than obeying.',
  ]},
]);

registerPool('emb.event.npc_stare', [
  { when: { stageMin: 6 }, text: [
    'Eyes follow her the way eyes follow weather — openly, helplessly. {ref.name} looks twice, then a third time. She pretends not to notice and fails.',
    'A stranger looks too long. Her body announces itself without her permission.',
  ]},
  { when: {}, text: [
    '{ref.name} looks too long. She feels it on her skin like heat.',
    'A glance catches on her middle and does not let go.',
    'Eyes travel her body the way hands would if politeness allowed.',
  ]},
]);

registerPool('emb.event.gossip_whisper', [
  { when: { stageMin: 5 }, text: [
    'Voices dip as she passes — "{ref.name} did you see," "she\'s really," "I heard she." She keeps walking. Her appetite keeps score.',
    'Laughter skitters at her back. She cannot make out every word. She catches enough.',
  ]},
  { when: {}, text: [
    'Whispers stitch the air behind her. She pretends not to hear. Her face warms anyway.',
    'She catches her name in a sentence {ref.name} did not mean for her ears.',
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

registerPool('emb.event.resident_sighting', [
  { when: {}, text: [
    '{ref.name} spots her across the path — wave, stare, the quick look at her middle. "Hey… you good?" She nods. She is more than good.',
    '{ref.name} calls her name. Resonance prickles: being seen is how reach grows.',
    '{ref.name} clocks the change in her and tries not to show it. She smiles anyway.',
  ]},
]);

registerPool('emb.event.gym_scale_shame', [
  { when: { stageMin: 6 }, text: [
    'The scale by the lockers groans under her. The sticky note says OUT OF ORDER. It is not. The number climbs and she pretends she did not look.',
    'She steps on out of habit. The platform dips. Someone behind her inhales. She steps off like the floor burned her.',
  ]},
  { when: {}, text: [
    'The gym scale squeaks a protest she understands. She reads the number once and walks away flushed.',
    'A locker-room mirror and a scale — twin witnesses. She avoids both and fails at one.',
    'Someone left protein bars on the scale. She eats one standing there, defiant and embarrassed.',
  ]},
]);

registerPool('emb.event.elevator_groan', [
  { when: { stageMin: 8 }, text: [
    'The elevator cable complains like a living thing. She fills the car — belly, hips, the soft geography of her — and the floor indicator hesitates between floors.',
    'One passenger car, one resident, groceries on every shelf of her body. The motor whines. She pretends not to hear.',
  ]},
  { when: {}, text: [
    'The dorm elevator groans when she steps in. She is the reason it groans.',
    'Mirrored walls show her from every angle. The car sinks half an inch before deciding to rise.',
    'She rides alone because the weight limit is not a metaphor anymore.',
  ]},
]);

registerPool('emb.event.faculty_treats', [
  { when: {}, text: [
    'The RA office pastry plate is communal and irresistible. She eats two éclairs before shame arrives with the third.',
    'Burnt coffee, staff-lounge gossip, and pastries that disappear when she stops pretending restraint.',
    'A desk aide offers the last danish without looking up from paperwork. She accepts like it is policy.',
  ]},
]);

registerPool('emb.event.immobile_anchor', [
  { when: { stageMin: 10 }, text: [
    'She cannot leave the room. The world comes to her — platters, containers, friends who know the couch is her country now.',
    'Furniture groans. Delivery drivers know the room number. She feasts from stillness like a queen in warm clay.',
    'Movement is memory. Hunger is present tense. Food arrives and she accepts every tribute.',
  ]},
  { when: {}, text: [
    'Anchored in the dorm, she eats what the world brings. Influence deepens with every swallowed warmth.',
    'She is too vast to walk. Appetite does not need legs.',
    'The room rearranges around her. Plates find her hands. She does not refuse.',
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
  resident_sighting: 'emb.event.resident_sighting',
  gym_scale_shame: 'emb.event.gym_scale_shame',
  elevator_groan: 'emb.event.elevator_groan',
  faculty_treats: 'emb.event.faculty_treats',
  immobile_anchor: 'emb.event.immobile_anchor',
};

function embCtx(student, week, nodeId, opts = {}) {
  const node = CAMPUS_NODES[nodeId] || CAMPUS_NODES.dorms;
  const ref = opts.ref || opts.witness || null;
  return createContext({
    subject: student,
    ref,
    week,
    globals: {
      embodiment: true,
      campusLocale: campusNodeToLocale(nodeId),
      campusNodeId: nodeId,
      campusDestination: node.label,
      witnessName: ref?.name || opts.witnessName || null,
      ...opts.globals,
    },
    ...opts,
  });
}

export function renderEmbodiedArrive(student, nodeId, week = 1, opts = {}) {
  const ctx = embCtx(student, week, nodeId, opts);
  const base = render('{emb.walk.arrive}', ctx, { trace: opts.trace || null })?.trim() || '';
  const look = renderCampusLook(nodeId, week);
  const composed = look ? `${base} ${look}` : base;
  return appendV2Depth(composed, 'embodiment', ctx, opts.v2DepthChance ?? 0.35);
}

export function renderEmbodiedMove(student, fromId, toId, week = 1, opts = {}) {
  const ctx = embCtx(student, week, toId, opts);
  const line = render('{emb.walk.move}', ctx, { trace: opts.trace || null })?.trim() || `→ ${CAMPUS_NODES[toId]?.label || toId}`;
  return appendV2Depth(line, 'embodiment', ctx, opts.v2DepthChance ?? 0.22);
}

export function renderEmbodiedEvent(eventId, student, nodeId, week = 1, opts = {}) {
  const pool = EVENT_POOL[normalizeEmbodiedEventId(eventId)] || 'emb.walk.arrive';
  const ctx = embCtx(student, week, nodeId, opts);
  const base = render(`{${pool}}`, ctx, { trace: opts.trace || null })?.trim() || '';
  return appendV2Depth(base, 'embodiment', ctx, opts.v2DepthChance ?? 0.4);
}
