// ═══════════════════════════════════════════════════════════════
// SCENE: TALK — "Encourage her appetite", fully slot-composed.
// Replaces the encourage pool in gameData/talkDialogue.js (mined
// here — quotes verbatim). Root module talk.encourage is invoked
// by TalkModal via the topic's engineTemplate; corruption-tier
// skeletons compose enc.* fragment pools. Codas (talk.coda etc.)
// are appended by TalkModal afterwards, unchanged.
// talk.moodOpener is generic — reuse it when migrating other topics.
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants } from '../engine.js';
import '../modules.js';

// ── talk.moodOpener ───────────────────────────────────────────
// Shape: FULL SENTENCE — a mood beat before any talk response.
// Mined from MOOD_OPENERS in talkDialogue.js. Wildcard is empty:
// no opener unless the mood earns one.
registerPool("talk.moodOpener", [
  { when: {}, text: ["", ""] },
  { when: { mood: "stressed" }, weight: 3, text: [
    "{subject.name} rubs her temples before she answers.",
    "She's been running on fumes; the question lands soft anyway.",
    "The stress shows in her shoulders, but she makes room for you.",
  ]},
  { when: { mood: "tired" }, weight: 3, text: [
    "{subject.name} blinks slowly, fighting a yawn.",
    "She's half-melted into the chair already.",
    "Exhaustion softens her edges; she still turns toward you.",
  ]},
  { when: { mood: "happy" }, weight: 3, text: [
    "{subject.name} brightens the moment you speak.",
    "Good mood radiates off her like warmth.",
    "She was already smiling before you finished the question.",
  ]},
  { when: { mood: "excited" }, weight: 3, text: [
    "{subject.name} sits forward, energy crackling.",
    "She's buzzing — you can feel it in how fast she answers.",
    "Enthusiasm spills out before the words do.",
  ]},
  { when: { mood: "nervous" }, weight: 3, text: [
    "{subject.name} picks at her sleeve.",
    "Her hands fidget; her voice comes out careful.",
    "She's wound tight, but she doesn't send you away.",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ ROOT: talk.encourage — paragraph skeletons by corruption tier
// ╚══════════════════════════════════════════════════════════════
// Shape: multi-sentence skeletons; \n\n splits paragraphs.
// priority:1 on the tier variants — in pool mode priority is a hard
// gate, so the tier-0-shaped wildcard can never leak into tier 1/2.
registerPool("talk.encourage", [
  // Tier 0 — deflect, then give in anyway
  { when: { corruption: [0] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.deflect} {enc.reach}\n\n{enc.giveIn}{join:enc.bodyAside,enc.flush|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{enc.deflect}\n\n{enc.giveIn} {enc.reach}{enc.flush|prefix: }",
  ]},
  // Tier 1 — acceptance, release, resolve
  { when: { corruption: [1] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.accept} {enc.release}\n\n{enc.resolve}{enc.bodyAside|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{enc.accept}{enc.bodyAside|prefix: }\n\n{enc.release} {enc.resolve}",
  ]},
  // Tier 2 — ownership, display, bottomless
  { when: { corruption: [2] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.owned}\n\n{enc.display} {enc.stillHungry}",
    "{talk.moodOpener|suffix:\n\n}{enc.owned}{enc.bodyAside|prefix: }\n\n{enc.display} {enc.stillHungry}",
  ]},
  { when: {}, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.deflect} {enc.reach}",
  ]},
]);

// ── Tier 0 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — the token protest.
registerPool("enc.deflect", [
  { when: {}, text: [
    `{subject.name} laughs nervously. "You're a bad influence, you know that?"`,
    `"Permission granted, huh," {subject.name} repeats softly, like testing the words.`,
    `"You're not supposed to say that," {subject.name} says, in the tone of someone who is glad you said it.`,
  ]},
  { when: { hungerTierMin: 2 }, weight: 2, text: [
    `"You don't have to tell me twice," {subject.name} says, and then waits to be told twice.`,
  ]},
]);

// Shape: FULL SENTENCE — the hand betraying the protest.
registerPool("enc.reach", [
  { when: {}, text: [
    "But her hand is already reaching for the snack she was pretending not to think about — fingers closing around it with guilty speed.",
    "She reaches for more. Not hurried. Not ashamed. Just hungry, finally allowed to be hungry in front of you.",
    "Her eyes flick to the food before the sentence is even finished.",
  ]},
  { when: { inWithdrawal: true }, weight: 3, text: [
    "Her hand is shaking slightly when it closes around the food; she steadies it with the other and keeps going.",
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    "She is already eating. The encouragement is mostly ceremonial at this point.",
  ]},
]);

// Shape: DIALOGUE BEAT — the capitulation.
registerPool("enc.giveIn", [
  { when: {}, text: [
    `"I shouldn't," she says, which both of you recognize as the opening move of someone who absolutely will. She unwraps it. She eats.`,
    `"Why am I rationing?" Her shoulders drop — tension leaving in a visible wave. "It's not like it's working."`,
    `"Just this once," she says, the way she said it last time.`,
    `"This is your fault," she says, around the first bite. It doesn't sound like an accusation. It sounds like thanks.`,
  ]},
]);

// Shape: PARTICIPLE/clause — appended with a space; full sentence here.
registerPool("enc.flush", [
  { when: {}, text: [
    "",
    "Her cheeks flush with pleasure and something else she isn't naming yet.",
    "She doesn't look at you while she chews. She doesn't stop, either.",
  ]},
]);

// ── Tier 1 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — agreement, like a settled argument.
registerPool("enc.accept", [
  { when: {}, text: [
    `{subject.name} considers, then nods like you've settled an argument she's been having with herself for weeks. "You're right. Why am I rationing?"`,
    `"Permission granted," {subject.name} murmurs, and the words land somewhere deep.`,
    `"It's not like fighting it did anything except make me miserable," {subject.name} says, and the admission sounds like relief.`,
    `"You're the only one who says it out loud," {subject.name} murmurs. "Everyone else just watches me grow and says nothing."`,
  ]},
]);

// Shape: FULL SENTENCE — the body letting go.
registerPool("enc.release", [
  { when: {}, text: [
    "Something in her shoulders lets go. She exhales, belly pushing forward.",
    "Her body responds before her mind catches up — hands drifting to her middle, thighs shifting wider, a soft sound in her throat that she doesn't try to hide.",
    "She settles deeper into the chair, and the chair takes her side of the argument.",
  ]},
  { when: { addictionLevelMin: 2 }, weight: 2, text: [
    "The craving she has been sitting on all conversation finally gets its turn; her whole posture eases around it.",
  ]},
  { when: { inWithdrawal: true }, weight: 3, text: [
    "The strung-out edge in her softens for the first time all week — this is the permission the shakes were waiting for.",
  ]},
]);

// Shape: DIALOGUE BEAT — the commitment.
registerPool("enc.resolve", [
  { when: {}, text: [
    `"Okay. Tonight I'm not counting anything." She meets your eyes. "Hold me to that."`,
    `"Say it again," she whispers. "Tell me it's okay to want more." She is already reaching for the food.`,
    `"No more halves," she says. "Whole portions. Whole everything."`,
    `"Okay," she breathes. "But you have to keep telling me it's good. It works better when it's your voice."`,
  ]},
]);

// ── Tier 2 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — past needing permission, enjoying it anyway.
registerPool("enc.owned", [
  { when: {}, text: [
    `{subject.name} grins. "You don't have to encourage me anymore, Professor. But I like it when you do."`,
    `"Already ahead of you," {subject.name} says, gesturing to the spread she's assembled without waiting for permission. "But say the words anyway. They help it go down."`,
    `"Keep talking," {subject.name} says, settling in. "I eat better with an audience."`,
    `"Say it slower," {subject.name} says, pulling the plate closer. "I want to hear you mean it."`,
    `"I was waiting for you to say that," {subject.name} admits. "I eat more when you watch. That's not a complaint."`,
  ]},
]);

// Shape: FULL SENTENCE — the demonstration.
registerPool("enc.display", [
  { when: {}, text: [
    `"Watch this." She eats with deliberate sensuality — each bite an act of faith in her own growth.`,
    "Her body jiggles and settles; her breathing deepens; her eyes stay on yours.",
    "She pats the chair beside her and makes the meal a performance with one viewer.",
    "She makes sure you're watching before the first bite — your attention is half the meal.",
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    "There is nothing performed about the speed. The hunger is real, and she lets you see all of it.",
  ]},
  { when: { addictionLevelMin: 3 }, weight: 2, text: [
    "She eats like it is the only thing that has ever quieted her, because by now it is.",
  ]},
]);

// Shape: DIALOGUE BEAT — the bottomless closer.
registerPool("enc.stillHungry", [
  { when: {}, text: [
    `"I'm still hungry," she says when she finishes. "I'm always hungry now."`,
    `She runs her hand over her belly. "They help all of it—" a slow circle, "—feel right."`,
    `"More tomorrow," she says. She isn't asking.`,
    `"Tell me to keep going," she murmurs. "I will anyway. But I like it better as an instruction."`,
  ]},
]);

// ── Shared ────────────────────────────────────────────────────

// Shape: FULL SENTENCE with {subject.lbs} — the body's footnote.
registerPool("enc.bodyAside", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 5 }, text: [
    "At {subject.lbs} lbs she can feel the weight when she moves — belly rounding, thighs rubbing.",
  ]},
  { when: { stageMin: 2, stageMax: 5, corruption: [0] }, weight: 2, text: [
    "At {subject.lbs} lbs she's still negotiating with herself. The negotiation doesn't last long.",
  ]},
  { when: { stageMin: 6 }, weight: 2, text: [
    "At {subject.lbs} lbs she is past the point of pretending — belly soft and heavy, appetite vast and unapologetic.",
    "At {subject.lbs} lbs the table looks small beside her — her body takes up space the way hunger takes up time: completely.",
  ]},
]);

// ── Personas — the most distinct voices (see AUTHORING.md §4) ─
registerModuleVariants("enc.owned", [
  { when: { studentId: 1 }, weight: 4, text: [
    `"Encouragement functions as a positive reinforcement variable," Madeline says, already reaching. "I've charted it. The effect size is embarrassing."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `"Buff received," Destiny says, deadpan, pulling the food closer. "Appetite +10. Stack it."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"Go on then, twist my arm," Chloe says, arm conspicuously untwisted, plate already loaded.`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Sugar, you sound like my grandmother, and that woman never let a plate leave half-full," Daisy beams. "Sit. Watch. Learn."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `"Coach used to say eat to perform," Serena says, cracking her knuckles at the spread. "I perform plenty."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith smiles without warmth. "How thoughtful. Encouraging the tide to come in."`,
  ]},
]);

registerModuleVariants("enc.accept", [
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline taps her pen twice. "Statistically, restraint hasn't produced results. Time to vary the methodology." She closes the notebook.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"You make a compelling argument," Chloe says dryly, "and by argument I mean I was going to do this anyway."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena nods once, athlete-sharp. "New training block starts tonight. Bulk phase. Indefinite."`,
  ]},
]);

registerModuleVariants("enc.deflect", [
  { when: { studentId: 5 }, weight: 4, text: [
    `"Bad influence detected," Destiny mutters at her phone. "Ignoring warning."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Oh, hush," Daisy laughs, swatting the air — and reaching past you for the tin she brought herself.`,
  ]},
]);
