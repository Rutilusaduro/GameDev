// ═══════════════════════════════════════════════════════════════
// SCENE: TALK — "Compliment her figure", fully slot-composed.
// Migrated from DIALOGUE.compliment in talkDialogue.js and
// redesigned with full weight-stage variation across all 12 stages.
//
// The compliment's tone, body-focus, and erotic charge evolve:
// early stages feel like catching a glimpse of possibility;
// mid stages like witnessing someone become themselves; late
// stages like worshipping a monument. Prose becomes progressively
// more body-forward, sensual, and indulgent as she grows.
//
// Root module talk.compliment is invoked by TalkModal via the
// topic's engineTemplate. Corruption-tier skeletons compose
// comp.* fragment pools. Codas (talk.coda) are appended by
// TalkModal afterwards, unchanged.
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants } from '../engine.js';
import '../modules.js';

// ── comp.bodyNote ─────────────────────────────────────────────
// Shape: FULL SENTENCE — stage-keyed physical reality note.
// Empty fallback keeps it optional at stages 0–1. Used as either
// a mid-paragraph anchor or the opening paragraph (stages 7+).
registerPool("comp.bodyNote", [
  { when: {}, text: [
    "",
    "",
    "At {subject.lbs} lbs the softness is there if you know where to look — warmth, curve, appetite gathering under the surface.",
  ]},
  { when: { stageMax: 1 }, text: [
    "At {subject.lbs} lbs the change is subtle — a new softness, the beginning of a curve that wasn't there last month.",
    "She moves the way she always has, but {subject.lbs} lbs doesn't feel quite the same. Her body is remembering what it's been fed.",
  ]},
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "At {subject.lbs} lbs the softness is visible: hips rounder, cheeks fuller, a belly rounding gently beneath her shirt.",
    "The {subject.lbs} lbs show in quiet, certain ways — clothes fitting differently, hips wider, the soft belly she keeps finding with one hand.",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "At {subject.lbs} lbs she is undeniably plump — belly soft and round, thighs pressing together, hips filling the chair with warm solidity.",
    "She is {subject.lbs} lbs of softness and warmth — the gentle swing of her belly, the thickness of her thighs, the full settled weight of her.",
  ]},
  { when: { stageMin: 6, stageMax: 7 }, weight: 2, text: [
    "At {subject.lbs} lbs she is substantial — belly wide and heavy, hips spanning the chair. She takes up space with the confidence of someone done apologizing.",
    "The {subject.lbs} lbs announce themselves: a rolling walk, the way she fills a couch, the creak of furniture adjusting to her.",
  ]},
  { when: { stageMin: 8, stageMax: 9 }, weight: 2, text: [
    "At {subject.lbs} lbs she is enormous — her belly a vast soft landscape, her hips wide, her thighs heavy. She doesn't so much sit as arrive.",
    "The {subject.lbs} lbs fill the room: the soft heave of her breathing, the creak of the chair, the warm mass of her settling. Vast and certain.",
  ]},
  { when: { stageMin: 10 }, weight: 3, text: [
    "At {subject.lbs} lbs she is immobile and magnificent — the soft mountain of her belly, the slow warm tide of her breathing.",
    "The {subject.lbs} lbs have made her a geography: vast, warm, settled. She does not come to you. You come to her.",
  ]},
]);

// ╔══════════════════════════════════════════════════════════════
// ║ ROOT: talk.compliment — paragraph skeletons by corruption tier
// ╚══════════════════════════════════════════════════════════════
// priority:1 on tier variants. High-stage overrides at priority:2
// put comp.bodyNote first at stages 7+ where the body is the subject.
registerPool("talk.compliment", [
  // Tier 0 — the compliment lands somewhere new and uncertain
  { when: { corruption: [0] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.react}{comp.react.follow|prefix: }\n\n{comp.bodyNote} {comp.notMeant}",
    "{talk.moodOpener|suffix:\n\n}{comp.react}{comp.react.follow|prefix: } {comp.notMeant}\n\n{comp.bodyNote}",
  ]},
  // Tier 1 — she shows you what you're complimenting
  { when: { corruption: [1] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.preening}\n\n{comp.bodyNote} {comp.practicing}",
    "{talk.moodOpener|suffix:\n\n}{comp.preening} {comp.practicing}\n\n{comp.bodyNote}",
  ]},
  // Tier 2 — she takes it as her due and makes it into a scene
  { when: { corruption: [2] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.claiming}\n\n{comp.bodyNote} {comp.show}",
    "{talk.moodOpener|suffix:\n\n}{comp.claiming} {comp.show}\n\n{comp.bodyNote}",
  ]},
  { when: {}, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.react}{comp.react.follow|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{comp.react}\n\n{comp.bodyNote}",
    "{talk.moodOpener|suffix:\n\n}{comp.bodyNote} {comp.react}",
  ]},
]);

// ── Unwelcome compliment override ─────────────────────────────
// When she's neither pretty fat yet nor close to you, a comment on her
// body lands wrong. priority:3 hard-gates the appreciative skeletons so
// only the rebuff renders. complimentUnwelcome is set by TalkModal.
registerModuleVariants("talk.compliment", [
  { when: { complimentUnwelcome: true }, priority: 3, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.unwelcome}",
  ]},
]);

// Shape: DIALOGUE BEAT — she rebuffs the unsolicited body comment.
registerPool("comp.unwelcome", [
  { when: {}, text: [
    `{subject.name}'s smile goes flat. "That's a weird thing to say to me, honestly." She folds her arms, and the warmth drains out of the room.`,
    `"My figure." {subject.name} repeats it back, unimpressed, and takes a half-step back. "We're not — please don't do that."`,
    `"Not from you," {subject.name} says, flat and final. "Not like that."`,
  ]},
  { when: { stageMax: 2 }, weight: 2, text: [
    `{subject.name} stiffens. "Okay, that's — no." A glance at the door. "I don't know why you'd comment on my body."`,
  ]},
  { when: { stageMin: 3, stageMax: 4 }, weight: 2, text: [
    `{subject.name} crosses her arms over her middle, defensive. "Is that supposed to be a compliment? Because it doesn't feel like one. Not from you."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena's jaw sets. "Don't comment on my body. We're not there, and honestly we may never be." She holds your eye until you look away.`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya's pen stops. "That was inappropriate, and I think you know it." She makes a note you can't see. "Let's not."`,
  ]},
]);

// At stages 7+ the body is not a footnote but the whole argument;
// priority:2 beats priority:1 corruption-only skeletons.
registerModuleVariants("talk.compliment", [
  { when: { corruption: [0], stageMin: 7 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.bodyNote}\n\n{comp.react}{comp.react.follow|prefix: } {comp.notMeant}",
  ]},
  { when: { corruption: [1], stageMin: 7 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.bodyNote}\n\n{comp.preening} {comp.practicing}",
  ]},
  { when: { corruption: [2], stageMin: 7 }, priority: 2, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.bodyNote}\n\n{comp.claiming} {comp.show}",
  ]},
]);

// ── comp.react ────────────────────────────────────────────────
// Shape: DIALOGUE BEAT — the initial reaction line, stage-keyed.
// Tier 0 territory: surprised, uncertain, touched.
// Keep each variant to one line; comp.react.follow carries the rest.
registerPool("comp.react", [
  // Stages 0–1: barely anything visible; pleasantly puzzled
  { when: { stageMax: 1 }, text: [
    `{subject.name} blinks. "My — figure?" She looks down, puzzled. "You really notice things."`,
    `"I'm not that different," {subject.name} says. But her hands find the new softness at her waist when she says it.`,
  ]},
  // Stages 2–3: the flush of real embarrassment; something to see now
  { when: { stageMin: 2, stageMax: 3 }, text: [
    `{subject.name} flushes scarlet. "I— you noticed? Of course you noticed." She hugs her arms over her middle.`,
    `"You can't just say that," {subject.name} mutters, but she doesn't move away. Her hands press into the new softness.`,
  ]},
  // Stages 4–5: conflicted but warm; the body is undeniable
  { when: { stageMin: 4, stageMax: 5 }, text: [
    `{subject.name}'s breath catches. "You're saying that to my face." Her hands drift to her belly — rounded, warm, real.`,
    `"Really." Her cheeks give her away. Her belly presses soft against her shirt. "All of it," she says.`,
  ]},
  // Stages 6–7: the body is large; attention to it has weight
  { when: { stageMin: 6, stageMax: 7 }, text: [
    `"You can say that again," {subject.name} says. Her belly rests forward, her thighs wide. She gives you a moment. "Take your time."`,
    `{subject.name} goes quiet, then: "You're looking right at it." She doesn't need to gesture. She is the thing she means.`,
  ]},
  // Stages 8–9: the compliment lands into something vast
  { when: { stageMin: 8, stageMax: 9 }, text: [
    `{subject.name} stills — a long, slow settling. Then she smiles. "Do you mean it." Not a question. "Say all of it."`,
    `The words land and {subject.name} absorbs them slowly, with the whole warm mass of her. "Tell me you mean it."`,
  ]},
  // Stages 10–11: past surprise; she receives praise like a monument receives weather
  { when: { stageMin: 10 }, text: [
    `{subject.name} lets the words land, the way everything lands into her now: slow, deep. "I know," she says. "Say it anyway."`,
    `A slow smile. She does not move toward you — she is past the need. "Come closer," she says. "Say it close."`,
  ]},
  // Generic fallback — never silent
  { when: {}, text: [
    `{subject.name} flushes warm. "You noticed," she says. It isn't a question. "Keep going."`,
    `"You can't just say that," {subject.name} murmurs — but she doesn't move away.`,
    `The compliment lands; her breathing changes before her words do.`,
  ]},
]);

// Shape: FULL SENTENCE — optional physical follow-through, stage-keyed.
// Appended with |prefix: so it vanishes cleanly when empty (stages 0-1).
registerPool("comp.react.follow", [
  { when: {}, text: [
    "",
    "",
    "The compliment sits in the air between you — warm, unhurried.",
  ]},
  { when: { stageMin: 2, stageMax: 3 }, text: [
    "She fails to hide the smile pulling at her mouth.",
    "The compliment sits in the air. Her breathing changes — slower, deeper.",
  ]},
  { when: { stageMin: 4, stageMax: 5 }, text: [
    "She doesn't tell you to stop.",
    "Her belly presses warm against her clothes. She doesn't cover it.",
  ]},
  { when: { stageMin: 6, stageMax: 7 }, text: [
    "The scale of what's being said needs no translation.",
    "The body fills the chair and says the rest.",
  ]},
  { when: { stageMin: 8 }, text: [
    "The warmth of her takes up the whole room.",
    "She receives it like weather — it falls over all of her.",
  ]},
]);

// Shape: DIALOGUE BEAT — "nobody said it like they meant it"; tier 0 core.
// What "nobody says" changes with stage: at low stages the compliment
// is unusual; at high stages direct appreciation for a fat body is rare.
registerPool("comp.notMeant", [
  { when: { stageMax: 4 }, text: [
    `"Nobody's ever said it like they meant it before." She looks up. "Do you mean it?"`,
    `"People aren't supposed to—" She stops. Swallows. "Everyone else just pretends not to notice."`,
    `She looks at you like she's waiting for the other shoe. "Say it again," she says. "Like you mean the whole thing."`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, text: [
    `"Most people look anywhere but—" She gestures at herself. "Not you." The warmth in her voice settles the matter.`,
    `"At this size, people say nothing. They look at the wall behind me. You looked right at me." She exhales. "Say it again."`,
  ]},
  { when: { stageMin: 8 }, text: [
    `"People look," {subject.name} says. "They don't say it like that — like they're glad." She is warm, enormous, touched. "Say it again."`,
    `"You mean it." The certainty in her voice is a question she already knows the answer to. "Even now. Even this."`,
  ]},
  // Generic fallback
  { when: {}, text: [
    `"Nobody says it like they mean it," she says quietly. "You do." She lets that sit.`,
    `"Say it again," she says, softer. "Like you mean the whole thing."`,
    `She looks at you like she's waiting for proof. "All of it," she whispers.`,
  ]},
]);

// ── comp.preening ─────────────────────────────────────────────
// Skeleton: comp.preening.action + comp.preening.line, both stage-keyed.
// Keeps each variant in the sub-pools under the 200-char linter limit.
registerPool("comp.preening", [
  { when: {}, text: [
    "{comp.preening.action} {comp.preening.line}",
    "{comp.preening.action}\n\n{comp.preening.line}",
    "{comp.preening.line} {comp.preening.action}",
  ] },
]);

// Shape: FULL SENTENCE — the physical gesture, stage-keyed.
registerPool("comp.preening.action", [
  // Stages 0–2: barely anything to show; small and tentative
  { when: { stageMax: 2 }, text: [
    "{subject.name} does a small, uncertain turn.",
    "{subject.name} lifts her chin slightly and lets you look.",
  ]},
  // Stages 3–4: real early curves; proud of what's come
  { when: { stageMin: 3, stageMax: 4 }, text: [
    "{subject.name} does a slow half-turn, letting you appreciate the early curves.",
    "{subject.name} does a slow half-turn, then looks back.",
  ]},
  // Stages 5–6: a real body; the turn is an event
  { when: { stageMin: 5, stageMax: 6 }, text: [
    "{subject.name} does a slow half-turn, belly swaying, hips rolling with each step.",
    "She settles deeper and pats her belly with warm deliberateness.",
  ]},
  // Stages 7–8: too large for a coy turn; the shift IS the display
  { when: { stageMin: 7, stageMax: 8 }, text: [
    "She shifts rather than turns — {subject.lbs} lbs reorienting, belly swaying forward, hips rolling wide.",
    "{subject.name} settles deeper and lets her body speak for itself.",
  ]},
  // Stages 9–10: approaching/at immobility; presence is the display
  { when: { stageMin: 9, stageMax: 10 }, text: [
    "{subject.name} lifts her arms and lets the full soft mass of herself settle, vast and warm.",
    "{subject.name} lifts one hand in a slow, generous wave at the whole fact of herself.",
  ]},
  // Stage 11: immobile, mythic; she IS the exhibition
  { when: { stageMin: 11 }, text: [
    "{subject.name} cannot move toward you, but she lifts her hands from the depths of her softness.",
  ]},
  // Generic fallback
  { when: {}, text: [
    "{subject.name} does a small half-turn, then looks back at you.",
    "{subject.name} shifts her weight — a quiet invitation to keep looking.",
    "She lets you look without rushing the moment.",
  ]},
]);

// Shape: DIALOGUE BEAT — what she says about the showing, stage-keyed.
registerPool("comp.preening.line", [
  { when: { stageMax: 2 }, text: [
    `"It's a work in progress," she says. She means: I know. I'm watching too.`,
    `"It's starting," she says. Like a fact she's decided to be pleased about.`,
  ]},
  { when: { stageMin: 3, stageMax: 4 }, text: [
    `"It's coming along," she says, mock-modest. Her hand traces the soft new round of her hip.`,
    `"I've been consistent," she says. Her hand finds the new curve at her waist.`,
  ]},
  { when: { stageMin: 5, stageMax: 6 }, text: [
    `"It's coming along," she says, mock-modest. "I've been diligent." The chair groans. She doesn't care.`,
    `"Go on," she says. "I've earned every one of these." She means the lbs.`,
  ]},
  { when: { stageMin: 7, stageMax: 8 }, text: [
    `"You mean all of this," she says, gesturing to the whole vast fact of herself. Her smile says: yes, this.`,
    `"I know," she says. "It's a lot. That's why it's worth seeing."`,
  ]},
  { when: { stageMin: 9, stageMax: 10 }, text: [
    `"Too big to spin," she says, entirely comfortable with it. "Look from here." She is not complaining.`,
    `"All of it. {subject.lbs} lbs of it." She is pleased. She is enormous. She is sure.`,
  ]},
  { when: { stageMin: 11 }, text: [
    `"Well," she says. "This is what you made." Her warmth fills the room. The rest of her does too.`,
  ]},
  // Generic fallback
  { when: {}, text: [
    `"Like what you see?" she says. She already knows the answer.`,
    `"Go on," she says softly. "I'm listening."`,
    `"Say it again," she murmurs. "Slower."`,
  ]},
]);

// Shape: DIALOGUE BEAT — the confidence close for tier 1.
registerPool("comp.practicing", [
  { when: {}, text: [
    `"Keep talking," she says, settling deeper. "No, really. Keep talking." The compliment doesn't embarrass her anymore. It instructs her.`,
    `She isn't performing confidence. She's practicing it. "Say it again," she says. "I'm learning to take it."`,
    `"I used to deflect," she says. Her hands find the warm curve of her belly. "Now I think I'd rather just let it land."`,
  ]},
  { when: { stageMin: 5 }, weight: 2, text: [
    `"You should see me at dinner," she says. There's real delight in it. "You'd have even more to say."`,
    `She smooths her hands down herself and feels the compliment settle into the body it's aimed at. "More every week."`,
  ]},
  { when: { stageMin: 9 }, weight: 3, text: [
    `"Keep going," she says. At {subject.lbs} lbs she doesn't deflect compliments — she receives them, slowly, like sunlight.`,
  ]},
]);

// ── comp.claiming ─────────────────────────────────────────────
// Skeleton: comp.claiming.stmt + comp.claiming.add, both stage-keyed.
registerPool("comp.claiming", [
  { when: {}, text: [
    "{comp.claiming.stmt} {comp.claiming.add}",
    "{comp.claiming.stmt}\n\n{comp.claiming.add}",
    "{comp.claiming.add} {comp.claiming.stmt}",
  ] },
]);

// Shape: DIALOGUE BEAT — the ownership statement, stage-keyed.
registerPool("comp.claiming.stmt", [
  // Stages 0–2: not much yet but certain of the direction
  { when: { stageMax: 2 }, text: [
    `{subject.name} smiles. "Early days," she says. "Come back in a month. You'll have more to compliment."`,
    `"Starting to notice?" she says, with a warmth that would be modest if she meant it modestly.`,
  ]},
  // Stages 3–5: real body, real ownership
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `{subject.name} takes the compliment the way she takes the last bite — as her due. "I know," she says.`,
    `"Say it again," {subject.name} murmurs. "You see all of it," she says. Not a question.`,
  ]},
  // Stages 6–7: sovereign; the body speaks for her
  { when: { stageMin: 6, stageMax: 7 }, text: [
    `"I know," {subject.name} says warmly. "And there's more of me every week. You're welcome."`,
    `"Again," {subject.name} says, eyes never leaving yours. "Look what we made."`,
  ]},
  // Stages 8–9: the scale is the proof
  { when: { stageMin: 8, stageMax: 9 }, text: [
    `"I know," {subject.name} says, with the certainty of someone who has loved every number on the scale.`,
    `{subject.name} takes your hand and places it on the warm crest of her belly. "Feel that? Still growing."`,
  ]},
  // Stages 10–11: immobile, mythic, sovereign
  { when: { stageMin: 10 }, text: [
    `{subject.name} absorbs the compliment completely. "I know," she says. "Say it anyway."`,
    `"I know," {subject.name} says softly. Her belly rises and falls, vast and warm.`,
  ]},
  // Generic fallback
  { when: {}, text: [
    `{subject.name} takes the compliment completely. "I know," she says. "Keep going."`,
    `"I know," she says, warm and unhurried. "But I like hearing you say it."`,
    `She receives the praise like warmth — slow, full, settling.`,
  ]},
]);

// Shape: FULL SENTENCE — the follow-through beat, stage-keyed.
registerPool("comp.claiming.add", [
  { when: {}, text: [
    "And there's more.",
    "More every week.",
    "She says it like weather — inevitable, welcome.",
  ]},
  { when: { stageMax: 2 }, text: [
    `"You're early," she adds. She means: wait.`,
  ]},
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `"And there's more every week." She means it as information, not vanity.`,
    `"And there's more," she says, hands tracing the warm curve of her belly.`,
  ]},
  { when: { stageMin: 6, stageMax: 7 }, text: [
    "She smooths both hands down herself — belly, hips, thighs — showing you without shame.",
    `"So did I," she murmurs. "Look what we made." Her hands don't stop moving.`,
  ]},
  { when: { stageMin: 8, stageMax: 9 }, text: [
    `"There's so much of me to know now." She gestures, vast and comfortable, to the breadth of herself.`,
    `"Still yours to watch." She means it as a promise.`,
  ]},
  { when: { stageMin: 10 }, text: [
    `Her voice is calm and enormous, like the body it comes from. "Always more."`,
    `"There's a version of me I haven't reached yet—" She spreads her hands. "—she's enormous. And she's happy."`,
  ]},
]);

// ── comp.show ─────────────────────────────────────────────────
// Shape: FULL SENTENCE — tier 2 body-on-display, stage-keyed.
registerPool("comp.show", [
  { when: { stageMax: 3 }, text: [
    "She shifts slightly and lets you see the new fullness at her hips. Small, intentional, sure of itself.",
    "She shows you what there is so far — the gentle belly, the new soft weight of her — without apology.",
  ]},
  { when: { stageMin: 4, stageMax: 6 }, text: [
    `She smooths both palms down the great curve of herself — belly, hips, thighs — slow and savoring. "Feel that?"`,
    "She makes sure you're watching before she moves. Your attention is half the experience.",
    `She pats her belly once with warm deliberateness. "All of it," she confirms. "Still growing."`,
  ]},
  { when: { stageMin: 7, stageMax: 9 }, text: [
    `She runs her hands down herself — the vast belly, the wide hips, the soft thighs — slow and certain. "Look what we made."`,
    "She spreads her hands over the warm geography of her belly and lets the silence do the rest.",
    `She takes your hand and places it on the warm crest of her belly. "Still growing. Still yours to watch."`,
  ]},
  { when: { stageMin: 10 }, text: [
    `She lays both hands on her vast belly, feeling the warmth of {subject.lbs} lbs at rest. "Still growing," she says. "Still yours to watch."`,
    "She cannot come to you. She is the display: the vast soft landscape of her belly, the slow breathing of {subject.lbs} lbs at peace.",
  ]},
  // Generic fallback
  { when: {}, text: [
    "She makes the body the subject, unhurriedly, and lets you look.",
    "She doesn't hide what you're praising — she presents it, soft and sure.",
    "Warmth rises in her cheeks. She doesn't look away.",
  ]},
]);

// ── Persona overrides ─────────────────────────────────────────
// Weight 4 so they dominate within a matching stage band.
// Personas on comp.react (the immediate reaction line) and on
// comp.claiming.stmt + comp.claiming.add (the ownership beat).

registerModuleVariants("comp.react", [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany squares her shoulders like she's accepting a trophy. "Damn right you noticed," she says, grinning.`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy marks something in the margin without looking up. "Aesthetically speaking, the data supports your conclusion." She caps her pen. "I've been tracking it."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie's phone is already out — not to hide, but to document. "Oh, we are getting this on camera," she announces. "Say it again, slower."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena squares her shoulders the way she would before a lift. "Good," she says. A competitor's approval. "I work hard."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona looks down at herself like she's seeing a painting come together. "Oh," she breathes. "Keep going."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny doesn't look up from her screen immediately. Then: "...compliment received. Stacking it." She looks at you. "Say it again."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany touches her hip, pleased. "Chapter standards," she says. "Exceeding them is the point."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `Priya blinks. "Ahead of projection," she says, almost to herself. Then, warmer: "Say it again. With numbers if you have them."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya looks down at herself, then back at you. A slow nod, like something confirmed. She pats her belly once, private and warm.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé laughs, delighted. "Americans and their directness," she says. "I am learning to enjoy it."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé tastes the compliment like a spice. "Mmm. Say more. I want the full flavor profile."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee's cheeks warm. "That's — thank you," she says softly. "Nobody says it like they mean it."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia writes one word in her notebook. "Noted," she says. "Emotional response: positive. Continue."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Oh, stop," Daisy says — meaning anything but. Her hands flutter to her cheeks. "You are the sweetest thing." She sets down the dish and waits.`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane grins, unguarded. "Well bless your heart," she says. "Keep talking."`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `Sophia flushes. "That's — not clinically useful," she whispers. "But please don't stop."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana grins like she found gold. "Now that's a discovery worth cataloging," she says.`,
  ]},
  { when: { studentId: 18 }, weight: 4, text: [
    `Talia adjusts her glasses. "Observation logged," she says. "Repeat for verification."`,
  ]},
]);

registerModuleVariants("comp.claiming.stmt", [
  { when: { studentId: 1 }, weight: 4, text: [
    `Cassidy nods. "The compliment aligns with the trajectory. The data is favorable."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Content approved," Kylie says. "I'm using that in a reel. You should see my numbers lately."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena cracks her knuckles. "I know," she says. "I've been consistent."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé looks you over with calm authority. "Thank you," she says. "I've been making sure there's plenty to compliment."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith tilts her head. "How observant — you're noticing what I've been making happen on purpose."`,
  ]},
]);

registerModuleVariants("comp.claiming.add", [
  { when: { studentId: 1 }, weight: 4, text: [
    `She says "favorable" the way other people say "wonderful."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Both kinds of numbers," she adds, meaning more than view counts.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `"Come back at the end of the semester. There'll be more to say." She grins.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `She gestures toward the kitchen. "Want to see the new menu?"`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `She runs one finger along her collarbone. "Good."`,
  ]},
]);

registerModuleVariants("comp.preening.action", [
  { when: { studentId: 7 }, weight: 4, text: [
    "Priya straightens, then does a sharp, deliberate turn — athlete's posture, measuring herself.",
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    "Tiffany does a slow, practiced turn — she's been in the mirror with this.",
  ]},
]);

registerModuleVariants("comp.preening.line", [
  { when: { studentId: 7 }, weight: 4, text: [
    `"Three months ahead of projection. The numbers are very satisfying."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"My dress size has changed twice," she announces. "Twice." She smooths her hands down her hips.`,
  ]},
]);
