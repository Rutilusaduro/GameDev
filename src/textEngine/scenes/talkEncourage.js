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
  { when: {}, text: [
    "",
    "",
    "{subject.name} takes a breath before she answers.",
    "She pauses — attentive, present, already listening.",
    "The question finds her mid-thought; she makes room for it anyway.",
  ]},
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
    "She smooths her shirt over her middle — a nervous habit that wasn't there in September.",
  ]},
  { when: { mood: "warm" }, weight: 3, text: [
    "{subject.name} looks at you like you brought sunlight with the question.",
    "Warmth pools in her expression before she answers — soft, unguarded, present.",
    "She leans in; the chair creaks kindly under her.",
  ]},
  { when: { mood: "content" }, weight: 3, text: [
    "{subject.name} is already comfortable — full, settled, easy in her skin.",
    "Contentment shows in how she sits: belly soft, shoulders loose, appetite honest.",
    "She hums once, low, before she speaks — a woman well fed and unhurried.",
  ]},
  { when: { mood: "observant" }, weight: 3, text: [
    "{subject.name} watches you carefully before she answers.",
    "Her eyes track your face like she's reading subtext.",
    "She pauses — measuring words, measuring appetite, measuring you.",
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
    "{talk.moodOpener|suffix:\n\n}{enc.deflect}\n\n{enc.giveIn}{enc.flush|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{enc.reach} {enc.giveIn}",
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
    "Her fingers find the plate before her mind catches up — appetite winning the race by a bite.",
    "She pulls the dish closer without asking. The motion is slow, deliberate, hungry.",
    "Warmth rises in her cheeks as she reaches — embarrassment and want in the same flush.",
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
    `"You're terrible for me," she murmurs, already chewing. "Don't stop."`,
    `She exhales — surrender and relief braided together — and takes another bite before the protest finishes.`,
    `"Fine," she says, voice soft. "But only because you asked nicely." The wrapper is already open.`,
  ]},
  { when: { stageMin: 3, stageMax: 5, corruption: [0] }, weight: 2, text: [
    `"It's only food," she says, and the lie is thin enough to see through. She eats anyway.`,
    `"One more won't matter," she whispers — to you, to herself, to the waistband that disagrees.`,
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
// Expanded to cover all 12 stages; the empty fallback keeps it
// optional at stages 0–1 where weight is still near-baseline.
registerPool("enc.bodyAside", [
  { when: {}, text: [
    "",
    "",
    "Her body answers the encouragement before her mouth does — warmth, give, appetite honest in the open.",
  ]},
  // Stages 0–1: barely changed; the hunger is newer than the body
  { when: { stageMax: 1 }, text: [
    "At {subject.lbs} lbs the change is subtle — a new softness, a hunger that speaks up when it didn't used to.",
  ]},
  // Stages 2–3: visible curves; the body and the appetite are finding each other
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "At {subject.lbs} lbs she can feel the weight when she moves — belly rounding soft, hips a little wider.",
    "The {subject.lbs} lbs are new enough to surprise her sometimes — the gentle press of thighs, the belly she keeps finding with one hand.",
  ]},
  { when: { stageMin: 2, stageMax: 3, corruption: [0] }, weight: 2, text: [
    "At {subject.lbs} lbs she's still negotiating with herself. The negotiation doesn't last long.",
  ]},
  // Stages 4–5: plump; the appetite is undeniable now
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "At {subject.lbs} lbs she is plump and warm and hungry — the belly rounding forward, the appetite no longer a question she's trying to answer with restraint.",
    "The {subject.lbs} lbs are no longer a negotiation — her belly rounds forward, her thighs spread, her appetite grows to match.",
  ]},
  { when: { stageMin: 4, stageMax: 5, corruption: [0] }, weight: 2, text: [
    "At {subject.lbs} lbs she has run out of ways to pretend the hunger isn't there.",
  ]},
  // Stages 6–7: fat; vast and unapologetic
  { when: { stageMin: 6, stageMax: 7 }, weight: 2, text: [
    "At {subject.lbs} lbs she is past the point of pretending — belly soft and heavy, appetite vast and unapologetic.",
    "At {subject.lbs} lbs the table looks small beside her — her body takes up space the way hunger takes up time: completely.",
    "She is {subject.lbs} lbs of soft certainty, belly rolling when she shifts, thighs wide and warm, appetite bottomless.",
  ]},
  // Stages 8–9: enormous; hunger is a permanent condition
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "At {subject.lbs} lbs she is enormous — her belly vast and heavy in her lap, her thighs spread wide, her appetite a permanent condition rather than a feeling.",
    "The {subject.lbs} lbs fill the room: the creak of reinforced furniture, the warmth she radiates, the deep constant pull of a hunger that has become who she is.",
  ]},
  // Stages 10–11: immobile; hunger and body are one
  { when: { stageMin: 10 }, weight: 3, text: [
    "At {subject.lbs} lbs she is past motion — past the need for it. The hunger is the size of her: vast, bottomless, warm, mythic.",
    "The {subject.lbs} lbs have made hunger permanent: not a need she has, but a state she inhabits. It suits her as completely as the body that holds it.",
  ]},
]);

// ── enc.stageHunger ───────────────────────────────────────────
// Shape: FULL SENTENCE — appetite as a bodily fact, strongly keyed
// by stage. Used as a lead-in paragraph in the high-stage skeleton
// overrides below (stages 6+) where the body and its hunger are too
// large to trail as a footnote — they ARE the subject.
registerPool("enc.stageHunger", [
  // Generic fallback — covers any stage if nothing more specific matches
  { when: {}, text: [
    "The hunger is real — her body knows it before she does, and it doesn't ask for permission.",
    "She is hungry, and at {subject.lbs} lbs the hunger has earned the right to be.",
    "Appetite stirs under your words — not sudden, but certain.",
  ]},
  // Stages 0–3: new and tentative; the appetite is just waking
  { when: { stageMax: 3 }, text: [
    "The hunger is new enough to surprise her still — it speaks up at unexpected hours, persistent in a way it wasn't before.",
    "She is learning the vocabulary of this kind of appetite: not a moment of weakness, but a fact about who she is becoming.",
  ]},
  // Stages 4–5: established and comfortable; no longer fighting it
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "The hunger lives in her like a second heartbeat now — not overwhelming, but present, constant, increasingly welcome.",
    "At {subject.lbs} lbs her appetite has found its groove: no longer something she fights or hides, but something she feeds.",
  ]},
  // Stages 6–7: vast; central to everything
  { when: { stageMin: 6, stageMax: 7 }, weight: 2, text: [
    "At {subject.lbs} lbs hunger is simply who she is — vast, constant, the background of every hour. She eats the way some people breathe: automatically, with her whole body.",
    "Her appetite at {subject.lbs} lbs is no longer a mood or a moment — it's a landscape. Wide and warm and entirely hers.",
    "The hunger is as large as she is: generous, soft-edged, impossible to ignore, impossible to satisfy with anything less than abundance.",
  ]},
  // Stages 8–9: enormous; the appetite matches the scale of the body
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "At {subject.lbs} lbs the hunger is enormous and bottomless — a need that fits the scale of her, deep as her belly is heavy, wide as her hips have spread.",
    "The appetite at this weight is a physical presence, the same way she is: vast, settled, radiating warmth, complete.",
    "She is {subject.lbs} lbs of hunger made comfortable — an appetite that matches the body it lives in, and the body lives only to be fed.",
  ]},
  // Stages 10–11: mythic; she doesn't have hunger, she is hunger
  { when: { stageMin: 10 }, weight: 3, text: [
    "At {subject.lbs} lbs the hunger is no longer something she has — it is something she is. A condition she inhabits, permanent and warm and vast.",
    "She is hunger made permanent — soft and immovable and magnificent. Food comes to her; she receives it the way oceans receive rivers.",
    "The appetite is {subject.lbs} lbs and still growing. It is the most honest thing about her.",
  ]},
]);

// ── Personas — the most distinct voices (see AUTHORING.md §4) ─
registerModuleVariants("enc.owned", [
  { when: { studentId: 0 }, weight: 4, text: [
    `"You don't have to encourage me anymore," Brittany grins. "But I like winning with an audience."`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `"Encouragement functions as a positive reinforcement variable," Madeline says, already reaching. "I've charted it. The effect size is embarrassing."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Already filming," Kylie says. "Say the line again. Slower. For the clip."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `"Coach used to say eat to perform," Serena says, cracking her knuckles at the spread. "I perform plenty."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `"Keep talking," Fiona says, settling in. "Hunger looks better with a witness."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `"Buff received," Destiny says, deadpan, pulling the food closer. "Appetite +10. Stack it."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Say it like you mean it," Tiffany says, pulling the plate closer. "I eat better when faculty approves."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `"I was waiting for you to say that," Maya admits. "I eat more when you watch. That's not a complaint."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"Go on then, twist my arm," Chloé says, arm conspicuously untwisted, plate already loaded.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `"Say it slower," Reneé murmurs. "I want to taste the permission in it."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Sugar, you sound like my grandmother, and that woman never let a plate leave half-full," Daisy beams. "Sit. Watch. Learn."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `"Keep going," Mary Jane says, patting her belly. "Sunday dinner rules apply."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith smiles without warmth. "How thoughtful. Encouraging the tide to come in."`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `"Optimal dosing requires verbal reinforcement," Sophia says. "Continue."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `"Say it again," Indiana grins. "I like treasure hunts with commentary."`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `"Positive feedback loop engaged," Talia says. "Do not interrupt the experiment."`,
  ]},
]);

registerModuleVariants("enc.giveIn", [
  { when: { studentId: 0 }, weight: 4, text: [
    `"Fine," Brittany says, captain-certain. "But only because you asked nicely." The wrapper is already open.`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Content idea: professor tells me to eat," Kylie says, already chewing. "Perfect. Don't stop."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `"This is your fault," Fiona murmurs around the first bite. It sounds like thanks painted in watercolor.`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter policy," Tiffany says brightly. "Always accept seconds when offered by faculty."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya exhales — surrender and relief braided — and takes another bite before the protest finishes.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `"Taste this first," Reneé says, offering what she was already eating. "Then tell me to keep going."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `"Mama raised me polite," Mary Jane says, already reaching. "And hungry."`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `"Accepting input," Talia says, deadpan. Her mouth disagrees with the restraint.`,
  ]},
]);

registerModuleVariants("enc.resolve", [
  { when: { studentId: 0 }, weight: 4, text: [
    `"No more halves," Brittany says. "Whole portions. Whole season." She meets your eyes like it's a pep talk.`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `"New protocol," Priya says, closing her planner. "Unlimited intake. Effective immediately."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `"Okay," Kaylee breathes. "But you have to keep telling me it's good. It works better when it's your voice."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `"Hypothesis accepted," Nadia says quietly. "Further trials requested."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `"Dig in," Indiana grins. "Treasure's always buried deeper than you think."`,
  ]},
]);

registerModuleVariants("enc.accept", [
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline taps her pen twice. "Statistically, restraint hasn't produced results. Time to vary the methodology." She closes the notebook.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena nods once, athlete-sharp. "New training block starts tonight. Bulk phase. Indefinite."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"You make a compelling argument," Chloé says dryly, "and by argument I mean I was going to do this anyway."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `"Permission granted," Kaylee murmurs, and the words land somewhere deep. "I've been waiting to hear it from you."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia considers, then nods. "The data supports cessation of restraint. I accept the conclusion."`,
  ]},
]);

registerModuleVariants("enc.deflect", [
  { when: { studentId: 0 }, weight: 4, text: [
    `"Bad influence," Brittany repeats, grinning. "Coach says the same thing about dessert."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"That's going in the vlog," Kylie says. "Title: Professor enables my snack drawer."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `"Bad influence detected," Destiny mutters at her phone. "Ignoring warning."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `"You're not supposed to say that," Maya murmurs. Her hand is already on the plate.`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Oh, hush," Daisy laughs, swatting the air — and reaching past you for the tin she brought herself.`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `"That violates several wellness guidelines," Sophia says, reaching anyway. "Noted. Ignored."`,
  ]},
]);

// ── Stage-keyed overrides for enc.display ─────────────────────
// At large stages the body "performs" by being, not by doing.
registerModuleVariants("enc.display", [
  { when: { stageMin: 7, stageMax: 9 }, weight: 3, text: [
    "There is nothing performed about it. At {subject.lbs} lbs her body performs simply by being — the soft heave of her belly, the warmth that radiates off her, the way she fills the room.",
    "She doesn't need to do anything. At this size the body is its own demonstration: vast, warm, undeniable, still growing.",
    `She runs her hands over the great round of her belly, her hips, with slow satisfaction. "This is the display," she says simply.`,
  ]},
  { when: { stageMin: 10 }, weight: 4, text: [
    "She is the display. At {subject.lbs} lbs she does not perform appetite — she embodies it, a living monument to growth and warmth and the deep pleasure of being fed.",
    `She lifts her hands from the depths of herself and spreads them over her belly. This is the demonstration: vast, warm, settled, still. "Watch," she says. She is the whole gallery.`,
  ]},
]);

// ── Stage-keyed overrides for enc.stillHungry ─────────────────
// At high stages "still hungry" becomes a law, not a mood.
registerModuleVariants("enc.stillHungry", [
  { when: { stageMin: 6, stageMax: 8 }, weight: 2, text: [
    `"Still hungry," she says, when she stops. "I'm always hungry at this size. I don't think that's going to change." The way she says it — it doesn't sound like a problem.`,
    `She settles her hands on her belly, feeling the warmth and the weight. "There's room for more," she says. "There always is now."`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    `"Still hungry," she says, and at {subject.lbs} lbs that is less a statement than a law of nature. She rests both hands on the great warm plain of her belly. "Always. Bring more."`,
    `The word "hungry" has stopped meaning what it used to. At {subject.lbs} lbs it means: the ocean is still the ocean. She presses slow circles into her belly. "Always more," she says. "Always."`,
  ]},
]);

// ── High-stage skeleton overrides for talk.encourage ──────────
// At stages 6+ the body and its hunger are too large to trail as
// a footnote — they open the response. priority:2 beats the
// corruption-tier skeletons at priority:1 when stage also matches.
registerModuleVariants("talk.encourage", [
  // Tier 0, stages 6+: hunger leads; deflection and give-in follow it
  { when: { corruption: [0], stageMin: 6 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.deflect} {enc.giveIn}{enc.flush|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{enc.deflect}\n\n{enc.stageHunger}\n\n{enc.giveIn}{enc.flush|prefix: }",
  ]},
  // Tier 1, stages 6+: the body's reality stated openly as context
  { when: { corruption: [1], stageMin: 6 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.accept} {enc.resolve}",
    "{talk.moodOpener|suffix:\n\n}{enc.accept}\n\n{enc.stageHunger} {enc.resolve}",
  ]},
  // Tier 2, stages 6+: hunger as crown; body as protagonist
  { when: { corruption: [2], stageMin: 6 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{enc.stageHunger}\n\n{enc.owned}\n\n{enc.display} {enc.stillHungry}",
    "{talk.moodOpener|suffix:\n\n}{enc.owned}\n\n{enc.stageHunger}\n\n{enc.display} {enc.stillHungry}",
  ]},
]);
