// The Squad — Lead: A2 Psych | Support: A4 Architect, A5 Editor
// Hunger interrupt outcome beats — decomposed from legacy monoliths.
import { registerPool } from '../../engine.js';

// ── hunger.response.feed — agree to feed her ───────────────────

registerPool('hunger.response.feed.lunge', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    'She practically lunges forward the moment you agree.',
    'Agreement barely leaves your mouth before she is already reaching.',
    'She surges toward the food like restraint was a costume she shed.',
  ] },
  { when: {}, text: ['', '', ''] },
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
    'Relief shows in how fast her shoulders drop once food is in reach.',
    'She eats like someone who has been holding her breath all day.',
  ] },
]);

registerPool('hunger.response.feed.aftermath', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    "By the time she's done, she looks dazed and deeply satisfied.",
  ] },
  { when: { corruption: [2], relationship: [3, 4] }, priority: 2, text: [
    'She leans into you afterward, warm and heavy, like feeding her was the only thing that mattered.',
  ] },
  { when: { hungerTier: [4] }, priority: 2, text: [
    'When she finishes, she looks at you with glassy, grateful eyes.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'The aggression fades from her expression.',
  ] },
  { when: {}, text: [
    'She thanks you multiple times, looking much calmer afterward.',
    'Color returns to her cheeks. The frantic edge dulls into warmth.',
    'She exhales like the meal put something back in place.',
  ] },
]);

registerPool('scene.hunger.response.feed', [
  { when: {}, text: [
    '{hunger.response.feed.lunge|prefix: }{hunger.response.feed.eating} {hunger.response.feed.aftermath}',
    '{hunger.response.feed.eating} {hunger.response.feed.aftermath}{hunger.response.feed.lunge|prefix: }',
    '{hunger.response.feed.lunge|prefix: }{hunger.response.feed.aftermath} {hunger.response.feed.eating}',
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
    'She takes it with both hands — careful, grateful, urgent.',
    'No ceremony. She swallows it down and waits for the calm.',
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
    'Her jaw unclenches. Hunger loosens its grip by degrees.',
    'The tension drains out of her shoulders like someone turned a valve.',
  ] },
]);

registerPool('scene.hunger.response.compound', [
  { when: {}, text: [
    '{hunger.response.compound.offer} {hunger.response.compound.relief}',
    '{hunger.response.compound.relief} {hunger.response.compound.offer}',
    '{hunger.response.compound.offer}{hunger.response.compound.relief|prefix: }',
  ] },
]);

// ── hunger.response.deny — turn her away ───────────────────────

registerPool('hunger.response.deny.reaction', [
  { when: { hungerTier: [4], addictionLevel: [4] }, priority: 3, text: [
    'Her face falls.',
    "For a second she looks like she might cry, then her expression twists into something more desperate and angry.",
  ] },
  { when: { corruption: [2], relationship: [3, 4] }, priority: 2, text: [
    'She stares at you like you betrayed something sacred between you.',
    'The hurt is raw — she expected you to understand.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'She snaps at you, clearly furious, before storming off.',
  ] },
  { when: { relationship: [0, 1] }, priority: 2, text: [
    'She looks embarrassed more than angry — like she knows she asked too much.',
  ] },
  { when: {}, text: [
    "She looks disappointed but doesn't argue.",
    'Hurt flashes, then she smooths it down — polite, wounded, gone.',
    'She nods once, like she expected this and hated that she did.',
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
    'She turns without another word. The hallway swallows her.',
    'Quiet footsteps. Quieter than the hunger that brought her here.',
  ] },
]);

registerPool('scene.hunger.response.deny', [
  { when: {}, text: [
    '{hunger.response.deny.reaction} {hunger.response.deny.exit}',
    '{hunger.response.deny.exit} {hunger.response.deny.reaction}',
    '{hunger.response.deny.reaction}{hunger.response.deny.exit|prefix: }',
  ] },
]);

// ── hunger.response.talk — talk her down ───────────────────────

registerPool('hunger.response.talk.calm', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    'You manage to calm her down a little.',
    "She's still clearly struggling, but she listens to you.",
  ] },
  { when: { corruption: [2], relationship: [3, 4] }, priority: 2, text: [
    'Your voice reaches her — she exhales, shame and hunger tangled, and lets you steer the moment.',
  ] },
  { when: { inWithdrawal: true }, priority: 2, text: [
    'You manage to talk her down from her aggressive state.',
    "She's still irritable, but she eventually leaves without causing a bigger scene.",
  ] },
  { when: {}, text: [
    'You talk to her for a while.',
    'She seems embarrassed about how desperate she got, but she calms down.',
    'Words do what food would have — slowly, imperfectly, enough.',
  ] },
]);

registerPool('hunger.response.talk.depart', [
  { when: { hungerTier: [4], addictionLevel: [3, 4] }, priority: 2, text: [
    'She eventually leaves, though she keeps looking back at you.',
  ] },
  { when: {}, text: [
    'She eventually leaves on her own.',
    'She lingers at the threshold, then chooses dignity over seconds.',
    'The door closes. Hunger follows her down the hall anyway.',
  ] },
]);

registerPool('scene.hunger.response.talk', [
  { when: {}, text: [
    '{hunger.response.talk.calm} {hunger.response.talk.depart}',
    '{hunger.response.talk.depart} {hunger.response.talk.calm}',
    '{hunger.response.talk.calm}{hunger.response.talk.depart|prefix: }',
  ] },
]);

registerPool('scene.hunger.response.leftover', [
  { when: { stageMax: 3, corruption: [0] }, weight: 2, text: [
    'You walk her to the galley. She eats standing, guilty and grateful, like Housing might still be awake.',
    'Leftovers wait under foil. She peels it back like a secret and finishes the tray.',
  ] },
  { when: {}, text: [
    'The kitchen is still warm. She eats from the tray you meant for morning and does not apologize.',
    'You do not turn the lounge lights on. She finishes a pan in the quiet.',
    'Midnight leftovers. She takes a plate, then the rest of the plate, then sits on the counter to be sure.',
  ] },
]);
