// The Squad — Lead: A2 Psych | Support: A4 Architect, A5 Editor
// Hunger interrupt outcome beats — decomposed from legacy monoliths.
import { registerPool } from '../../engine.js';

// ── hunger.response.feed — agree to feed her ───────────────────

registerPool('hunger.response.feed.lunge', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    'She practically lunges forward the moment you agree.',
  ] },
  { when: {}, text: [''] },
]);

registerPool('hunger.response.feed.eating', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    "She eats like she's been starving for days, making soft, desperate sounds between bites.",
  ] },
  { when: { hungerTier: [4] }, priority: 2, text: [
    'She eats fast and intensely, barely pausing.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'She eats quickly, still tense at first, but slowly relaxes as the food hits her.',
  ] },
  { when: {}, text: [
    'She eats eagerly, clearly relieved.',
  ] },
]);

registerPool('hunger.response.feed.aftermath', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    "By the time she's done, she looks dazed and deeply satisfied.",
  ] },
  { when: { hungerTier: [4] }, priority: 2, text: [
    'When she finishes, she looks at you with glassy, grateful eyes.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'The aggression fades from her expression.',
  ] },
  { when: {}, text: [
    'She thanks you multiple times, looking much calmer afterward.',
  ] },
]);

registerPool('scene.hunger.response.feed', [
  { when: {}, text: [
    '{hunger.response.feed.lunge|prefix: }{hunger.response.feed.eating} {hunger.response.feed.aftermath}',
  ] },
]);

// ── hunger.response.compound — offer compound ──────────────────

registerPool('hunger.response.compound.offer', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    "Her eyes light up the moment she sees what you're offering.",
    'She takes it without hesitation.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'She takes it almost aggressively, clearly desperate for relief.',
  ] },
  { when: {}, text: [
    'She accepts it quickly.',
  ] },
]);

registerPool('hunger.response.compound.relief', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    'Within minutes her breathing slows and she looks almost drunk with relief.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'Her aggressive demeanor fades as the compound works.',
  ] },
  { when: {}, text: [
    'She visibly relaxes as the effects kick in.',
  ] },
]);

registerPool('scene.hunger.response.compound', [
  { when: {}, text: [
    '{hunger.response.compound.offer} {hunger.response.compound.relief}',
  ] },
]);

// ── hunger.response.deny — turn her away ───────────────────────

registerPool('hunger.response.deny.reaction', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    'Her face falls.',
    "For a second she looks like she might cry, then her expression twists into something more desperate and angry.",
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'She snaps at you, clearly furious, before storming off.',
  ] },
  { when: {}, text: [
    "She looks disappointed but doesn't argue.",
  ] },
]);

registerPool('hunger.response.deny.exit', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    'She stares at you for a long moment before turning and leaving without another word.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'You can hear her muttering angrily as she leaves.',
  ] },
  { when: {}, text: [
    'She just nods quietly and leaves.',
  ] },
]);

registerPool('scene.hunger.response.deny', [
  { when: {}, text: [
    '{hunger.response.deny.reaction} {hunger.response.deny.exit}',
  ] },
]);

// ── hunger.response.talk — talk her down ───────────────────────

registerPool('hunger.response.talk.calm', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    'You manage to calm her down a little.',
    "She's still clearly struggling, but she listens to you.",
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'You manage to talk her down from her aggressive state.',
    "She's still irritable, but she eventually leaves without causing a bigger scene.",
  ] },
  { when: {}, text: [
    'You talk to her for a while.',
    'She seems embarrassed about how desperate she got, but she calms down.',
  ] },
]);

registerPool('hunger.response.talk.depart', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    'She eventually leaves, though she keeps looking back at you.',
  ] },
  { when: {}, text: [
    'She eventually leaves on her own.',
  ] },
]);

registerPool('scene.hunger.response.talk', [
  { when: {}, text: [
    '{hunger.response.talk.calm} {hunger.response.talk.depart}',
  ] },
]);
