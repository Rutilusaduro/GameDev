// ═══════════════════════════════════════════════════════════════
// SCENE: talk.encourage — slot-composed appetite encouragement
// Mined from talkDialogue.js encourage tier paragraphs + MOOD_OPENERS
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../engine.js';
import '../modules.js';

// ── talk.moodOpener — reusable mood lead-in (wildcard "") ─────

registerPool('talk.moodOpener', [
  { when: { mood: 'stressed' }, text: [
    '{subject.name} rubs her temples before she answers.',
    'The stress shows in her shoulders, but she makes room for you.',
    "She's been running on fumes; the question lands soft anyway.",
  ] },
  { when: { mood: 'tired' }, text: [
    '{subject.name} blinks slowly, fighting a yawn.',
    "She's half-melted into the chair already.",
    'Exhaustion softens her edges; she still turns toward you.',
  ] },
  { when: { mood: 'happy' }, text: [
    '{subject.name} brightens the moment you speak.',
    'Good mood radiates off her like warmth.',
    'She was already smiling before you finished the question.',
  ] },
  { when: { mood: 'excited' }, text: [
    '{subject.name} sits forward, energy crackling.',
    "She's buzzing — you can feel it in how fast she answers.",
    'Enthusiasm spills out before the words do.',
  ] },
  { when: { mood: 'nervous' }, text: [
    '{subject.name} picks at her sleeve.',
    "She's wound tight, but she doesn't send you away.",
    'Her hands fidget; her voice comes out careful.',
  ] },
  { when: {}, text: ['', '', ''] },
]);

// ── enc.* dialogue beats ──────────────────────────────────────

registerPool('enc.deflect', [
  { when: { studentId: 0 }, weight: 4, text: ['"You\'re a bad influence, you know that?"', '"Permission granted, huh,"'] },
  { when: { studentId: 1 }, weight: 4, text: ['"Statistically speaking, I should not—"', '"The data suggests I will anyway."'] },
  { when: { studentId: 2 }, weight: 4, text: ['"This is so on-brand for me right now."', '"My audience would eat this up. Literally."'] },
  { when: { studentId: 5 }, weight: 4, text: ['"You don\'t have to encourage me anymore."', '"Already ahead of you."'] },
  { when: { studentId: 9 }, weight: 4, text: ['"You Americans and your permission slips."', '"Fine. I was going to anyway."'] },
  { when: { studentId: 13 }, weight: 4, text: ['"Sugar, you don\'t have to tell me twice."', '"Bless your heart, I was already reaching."'] },
  { when: { studentId: 15 }, weight: 4, text: ['"How quaint."', '"You think I need encouragement?"'] },
  { when: { archetype: 'cheerleader' }, text: ['"You\'re a bad influence, you know that?"', '"Coach would lose his mind."'] },
  { when: { archetype: 'bookworm' }, text: ['"I should document this impulse."', '"The hypothesis is appetite."'] },
  { when: {}, text: ['"You\'re a bad influence, you know that?"', '"I shouldn\'t,"', '"Permission granted, huh,"'] },
]);

registerPool('enc.reach', [
  { when: { hungerTierMin: 3 }, text: [
    'Her hand is already reaching for the snack — fingers closing around it with guilty speed.',
    'She grabs for food before the words finish landing, ravenous and unashamed.',
  ] },
  { when: { inWithdrawal: true }, text: [
    'Her hands shake slightly as she reaches — urgency brittle and unmistakable.',
    'She snatches at the nearest food with shaky, desperate precision.',
  ] },
  { when: { addictionLevelMin: 2 }, text: [
    'Her hand moves to food like it remembers the route by heart.',
    'She reaches before she decides to, appetite ahead of thought.',
  ] },
  { when: {}, text: [
    'Her hand is already reaching for the snack she was pretending not to think about.',
    'Fingers close around food with guilty speed.',
    'She unwraps it before she finishes protesting.',
  ] },
]);

registerPool('enc.giveIn', [
  { when: { corruption: [0] }, text: [
    '"I shouldn\'t," she says, which both of you recognize as the opening move of someone who absolutely will.',
    'She eats. Her cheeks flush with pleasure and something else she isn\'t naming yet.',
    '"Why am I rationing? It\'s not like it\'s working."',
  ] },
  { when: { corruption: [1] }, text: [
    'She reaches for more. Not hurried. Not ashamed. Just hungry, finally allowed to be hungry in front of you.',
    'Something in her shoulders lets go. She exhales, belly pushing forward.',
    '"Okay. Tonight I\'m not counting anything."',
  ] },
  { when: { corruption: [2] }, text: [
    'She eats with deliberate sensuality — each bite an act of faith in her own growth.',
    '"Still hungry," she says when she finishes. "Always hungry now."',
    'She pats the chair beside her. "They help it go down."',
  ] },
  { when: {}, text: ['She gives in.', 'She eats.', 'Hunger wins.'] },
]);

registerPool('enc.accept', [
  { when: { studentId: 6 }, weight: 4, text: ['"Say it again," she whispers.', '"Permission granted," she murmurs, and the words land somewhere deep.'] },
  { when: { studentId: 4 }, weight: 4, text: ['"Beautiful permission," she breathes.', '"I\'ll paint this moment later."'] },
  { when: {}, text: [
    'She considers, then nods like you\'ve settled an argument she\'s been having with herself for weeks.',
    '"You\'re right. Why am I rationing?"',
    '"Permission granted," she murmurs, and the words land somewhere deep.',
  ] },
]);

registerPool('enc.release', [
  { when: { inWithdrawal: true }, text: [
    'Her shoulders drop — tension leaving in a visible wave, replaced by shaky relief.',
    'The brittle urgency softens into hungry obedience.',
  ] },
  { when: { hungerTierMin: 3 }, text: [
    'Her body responds before her mind catches up — hands drifting to her middle, a soft sound in her throat.',
    'Appetite floods back the moment you give it permission.',
  ] },
  { when: {}, text: [
    'Something in her shoulders lets go.',
    'She exhales, belly pushing forward.',
    'She is already reaching for the food.',
  ] },
]);

registerPool('enc.resolve', [
  { when: { corruption: [1] }, text: [
    '"Hold me to that," she meets your eyes.',
    '"Say it again," she whispers. "Tell me it\'s okay to want more."',
    'She is already growing into the wanting.',
  ] },
  { when: {}, text: ['She nods once, decided.', 'The negotiation ends.', 'Wanting wins.'] },
]);

registerPool('enc.owned', [
  { when: { studentId: 5 }, weight: 4, text: ['"You don\'t have to encourage me anymore, Professor. But I like it when you do."', '"Watch this."'] },
  { when: { studentId: 2 }, weight: 4, text: ['"This is the content. This is the brand now."', '"Watch me."'] },
  { when: {}, text: [
    'She grins. "You don\'t have to encourage me anymore. But I like it when you do."',
    'She is past the point of pretending — appetite vast and unapologetic.',
    '"Watch this."',
  ] },
]);

registerPool('enc.display', [
  { when: { stageMin: 6 }, text: [
    'Her body jiggles and settles; her breathing deepens; her eyes stay on yours.',
    'She eats with deliberate sensuality — each bite an act of faith in her own growth.',
  ] },
  { when: { stageMin: 3 }, text: [
    'Belly rounding, thighs rubbing, ass heavier behind her — she lets you see all of it.',
    'She shifts wider in the chair, flesh pressing warm at every seam.',
  ] },
  { when: {}, text: [
    'She eats without performance and without shame.',
    'She lets you watch appetite win.',
    'Her body responds openly to every bite.',
  ] },
]);

registerPool('enc.stillHungry', [
  { when: { hungerTierMin: 2 }, text: [
    '"Still hungry," she says when she finishes. "Always hungry now."',
    'Her eyes drift to whatever food remains — already planning the next bite.',
  ] },
  { when: {}, text: [
    '"Still hungry," she says softly.',
    'She licks her fingers and looks for more.',
    'The plate is empty. She is not.',
  ] },
]);

registerPool('enc.bodyAside', [
  { when: { stageMin: 4 }, text: [
    (ctx) => `At ${Math.round(ctx.subject.lbs)} lbs she can feel the weight when she moves — belly rounding, thighs rubbing.`,
    (ctx) => `Her ${Math.round(ctx.subject.lbs)}-lb body is thick and soft and impossible to ignore.`,
  ] },
  { when: { stageMin: 2 }, text: [
    (ctx) => `At ${Math.round(ctx.subject.lbs)} lbs her body has softened; her appetite has sharpened.`,
    'Soft new weight settles as she leans into the chair.',
  ] },
  { when: {}, weight: 1, text: ['', ''] },
]);

registerPool('enc.flush', [
  { when: { mood: ['happy', 'excited', 'nervous'] }, text: [
    'Her cheeks flush with pleasure and something else she isn\'t naming yet.',
    'Color rises in her face — embarrassment and appetite braided together.',
  ] },
  { when: { corruption: [0] }, text: [
    'Her cheeks flush with pleasure and something else she isn\'t naming yet.',
    'A guilty pink spreads across her face as she chews.',
  ] },
  { when: {}, weight: 1, text: ['', ''] },
]);

// ── talk.encourage — corruption-tier paragraph skeletons ──────

registerPool('talk.encourage', [
  { when: { corruption: [0] }, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.deflect} {enc.reach}\n\n{enc.giveIn}{join:enc.bodyAside,enc.flush|prefix: }',
    '{talk.moodOpener|suffix:\n\n}{enc.deflect}\n\n{enc.reach} {enc.giveIn}{join:enc.flush|prefix: }',
  ] },
  { when: { corruption: [1] }, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.accept} {enc.release}\n\n{enc.resolve}{join:enc.bodyAside,enc.flush|prefix: }',
    '{enc.accept}\n\n{enc.release} {enc.resolve}{enc.bodyAside|prefix: }',
  ] },
  { when: { corruption: [2] }, text: [
    '{talk.moodOpener|suffix:\n\n}{enc.owned}\n\n{enc.display} {enc.stillHungry}',
    '{enc.owned}\n\n{enc.display}\n\n{enc.stillHungry}{enc.bodyAside|prefix: }',
  ] },
  { when: {}, text: ['{enc.giveIn}', '{enc.accept} {enc.release}'] },
]);
