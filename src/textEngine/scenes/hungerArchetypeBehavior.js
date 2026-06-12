// ═══════════════════════════════════════════════════════════════
// HUNGER ARCHETYPE BEHAVIOR — per-archetype interrupt flavor
// Extends generic scene.hungerInterrupt.behavior / request
// ═══════════════════════════════════════════════════════════════
import { registerModule } from '../engine.js';

const ARCHETYPE_BEHAVIOR = {
  cheerleader: [
    'She\'s pacing like it\'s halftime and she forgot to eat.',
    'Her squad hoodie is stretched tight; she keeps tugging it down without thinking.',
  ],
  bookworm: [
    'She\'s clutching a notebook like a shield and still staring at your snack drawer.',
    'She adjusts her glasses twice, distracted by hunger instead of citations.',
  ],
  influencer: [
    'She\'s already angling toward the light in your hallway — hungry and filming-adjacent.',
    'Phone in one hand, other hand pressed to her stomach. Content idea forming badly.',
  ],
  pharmacy_grad: [
    'She smells faintly of ethanol and vanilla. Clinical eyes, unclinical hunger.',
    'She stands very still, like she\'s calculating dosage and shame at once.',
  ],
  psych: [
    'She watches your face more than the food she\'s about to ask for.',
    'Field notes forgotten. Subject is her stomach. Observer is failing.',
  ],
  eced: [
    'She smells like cookie dough. Guilt and appetite in equal measure.',
    'Warm, round, trying to look professional while clearly starving.',
  ],
  sorority: [
    'She laughs once, too bright, then presses a hand to her middle.',
    'Chapter energy without the chapter — just need, politely dressed.',
  ],
  quiet: [
    'She doesn\'t speak yet. Her eyes do.',
    'Small in the doorway, appetite not small at all.',
  ],
  transfer: [
    'Still finding her words here. Hunger came first.',
    'She hugs herself like the campus chill got inside her.',
  ],
  predator: [
    'Stillness that feels like waiting, not patience.',
    'She doesn\'t fidget. Predators don\'t. Hungry ones do, a little.',
  ],
};

const ARCHETYPE_REQUEST = {
  cheerleader: [
    '"Coach would kill me for this. Feed me anyway?"',
    '"I\'m off the squad but not off appetite. Please?"',
  ],
  bookworm: [
    '"I have a hypothesis about what I need. It\'s food. From you."',
    '"Statistically I should leave. I won\'t if you feed me."',
  ],
  influencer: [
    '"This could be content. Or it could just be dinner. Please?"',
    '"I\'ll be so good on camera if you feed me first."',
  ],
  pharmacy_grad: [
    '"Wellness trial. Sample size one. Please?"',
    '"I know what this does. I want it anyway."',
  ],
  psych: [
    '"Countertransference aside — I\'m hungry."',
    '"For research purposes. And because I need you to."',
  ],
  eced: [
    '"I brought muffins for the class. I ate mine. I need more."',
    '"The moms would understand. Would you?"',
  ],
  sorority: [
    '"Chapter dinner was hours ago. I\'m still empty."',
    '"Don\'t tell my sisters I begged. Actually tell them. Feed me."',
  ],
  quiet: [
    '"…please."',
    '"I didn\'t know where else to go."',
  ],
  transfer: [
    '"I\'m new here but I\'m already addicted to your food."',
    '"This campus is huge. Your kitchen is the part I know."',
  ],
  predator: [
    '"You have what I want."',
    '"Don\'t make me wait."',
  ],
};

function registerArchetypeLines(moduleKey, table) {
  const variants = Object.entries(table).map(([archetype, lines]) => ({
    when: { archetype },
    priority: 3,
    text: lines,
  }));
  variants.push({ when: {}, text: '' });
  registerModule(moduleKey, variants);
}

registerArchetypeLines('scene.hungerInterrupt.archetypeBehavior', ARCHETYPE_BEHAVIOR);
registerArchetypeLines('scene.hungerInterrupt.archetypeRequest', ARCHETYPE_REQUEST);
