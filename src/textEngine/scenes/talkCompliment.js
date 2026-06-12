// ═══════════════════════════════════════════════════════════════
// SCENE: TALK — "Compliment her figure", fully slot-composed.
// Replaces the compliment pool in gameData/talkDialogue.js (mined
// here — quotes verbatim). Root module talk.compliment is invoked
// by TalkModal via the topic's engineTemplate; corruption-tier
// skeletons compose comp.* fragment pools. Codas (talk.coda etc.)
// are appended by TalkModal afterwards, unchanged.
// ═══════════════════════════════════════════════════════════════
import { registerPool, registerModuleVariants } from '../engine.js';
import '../modules.js';

// ╔══════════════════════════════════════════════════════════════
// ║ ROOT: talk.compliment — paragraph skeletons by corruption tier
// ╚══════════════════════════════════════════════════════════════
// Shape: multi-sentence skeletons; \n\n splits paragraphs.
// priority:1 on tier variants — wildcard tier-0 shapes must not leak.
registerPool("talk.compliment", [
  // Tier 0 — flush, shield, danger of admitting it
  { when: { corruption: [0] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.shyReact} {comp.shield}\n\n{comp.bodyEarly}{comp.dangerAck|prefix: }",
    "{talk.moodOpener|suffix:\n\n}{comp.deflectOpen} {comp.deflectHands}\n\n{comp.suspended} {comp.breathShift}",
  ]},
  // Tier 1 — display, practice, ask for more
  { when: { corruption: [1] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.turnDisplay}{comp.bodyMid|prefix: }\n\n{comp.practice} {comp.askMore}",
    "{talk.moodOpener|suffix:\n\n}{comp.askRepeat}{comp.bodyThick|prefix: }\n\n{comp.seeAll} {comp.wantThis}",
  ]},
  // Tier 2 — ownership, display, partnership
  { when: { corruption: [2] }, priority: 1, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.owned}{comp.bodyHome|prefix: }\n\n{comp.display} {comp.slowRepeat}",
    "{talk.moodOpener|suffix:\n\n}{comp.commandAgain}{comp.presence|prefix: }\n\n{comp.partnership} {comp.handPlace}",
  ]},
  { when: {}, text: [
    "{talk.moodOpener|suffix:\n\n}{comp.shyReact} {comp.shield}",
    "{talk.moodOpener|suffix:\n\n}{comp.deflectOpen} {comp.suspended}",
  ]},
]);

// ── Tier 0 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — shocked, pleased, can't hide it.
registerPool("comp.shyReact", [
  { when: {}, text: [
    `{subject.name} flushes scarlet. "I— you noticed? I mean. Of course you noticed. It's… a lot to notice."`,
    `"You can't just—" {subject.name} starts, then stops because her mouth won't cooperate with denial.`,
    `{subject.name} goes very still. "You really think so?" The question is quieter than she meant it to be.`,
    `"That's—" {subject.name} swallows. "Nobody says that to me. Not like they mean it."`,
  ]},
  { when: { mood: "nervous" }, weight: 2, text: [
    `{subject.name} picks at her sleeve. "You're not supposed to notice yet," she says, without conviction.`,
  ]},
  { when: { inWithdrawal: true }, weight: 3, text: [
    `{subject.name} flinches at the kindness first — then holds still, like she's afraid moving will break it.`,
  ]},
]);

// Shape: FULL SENTENCE — the body betrays the blush.
registerPool("comp.shield", [
  { when: {}, text: [
    "She hugs her arms over her middle and fails to hide either the soft curve she's grown or the smile pulling at her mouth.",
    "Her hands fly to her waist, then hesitate — fingers pressing into new softness like she's checking the claim.",
    "She looks down at herself, then back at you, cheeks still pink.",
    "She doesn't step away. She doesn't quite meet your eyes, either.",
  ]},
]);

// Shape: FULL SENTENCE — early gain, praise feels dangerous.
registerPool("comp.bodyEarly", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 5 }, text: [
    "At {subject.lbs} lbs she's still new enough to this that praise feels dangerous — like admitting something out loud makes it real.",
    "At {subject.lbs} lbs the changes are obvious to her now — snug clothes, fuller face, hips that sway when she walks.",
  ]},
  { when: { stageMin: 2, stageMax: 5, corruption: [0] }, weight: 2, text: [
    "At {subject.lbs} lbs she can still call it temporary if she wants to. She doesn't call it that.",
  ]},
]);

// Shape: FULL SENTENCE — naming what's real.
registerPool("comp.dangerAck", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2 }, text: [
    "It is real. Her hips are wider. Her thighs press together when she walks. Her face is fuller. She doesn't sound entirely unhappy about any of it.",
    "Her body has changed — visibly, undeniably — and the praise lands on flesh that already knows it.",
    "Something in her posture eases, just a fraction, like relief she didn't know she was holding.",
  ]},
]);

// Shape: DIALOGUE BEAT — opening deflection.
registerPool("comp.deflectOpen", [
  { when: {}, text: [
    `"You can't just say that," {subject.name} mutters, but she doesn't move away.`,
    `"Don't," {subject.name} says, which is not the same as wanting you to stop.`,
    `"You're going to make me vain," {subject.name} warns, already failing to look offended.`,
  ]},
]);

// Shape: DIALOGUE BEAT — hands betray the protest.
registerPool("comp.deflectHands", [
  { when: {}, text: [
    `Her hands hover at her waist, fingers pressing into the new softness there. "People aren't supposed to—" She stops. Swallows. "Nobody's ever said it like they meant it before."`,
    `Her voice wobbles on the second syllable. She doesn't ask you to take it back.`,
    `She looks down at herself, then back at you, cheeks still pink.`,
  ]},
]);

// Shape: FULL SENTENCE — the compliment hangs.
registerPool("comp.suspended", [
  { when: {}, text: [
    "The compliment sits in the air between you.",
    "The words settle between you like something fragile.",
    "Neither of you rushes to fill the silence after.",
  ]},
]);

// Shape: FULL SENTENCE — body responds before mind.
registerPool("comp.breathShift", [
  { when: {}, text: [
    "Her breathing changes — slower, deeper, belly rising against her top. She looks at you like she's waiting for the other shoe. It doesn't drop.",
    "Her breathing deepens. A slow smile wins despite her best efforts.",
    "She exhales, long and unsteady, and doesn't ask you to take it back.",
  ]},
  { when: { hungerTierMin: 2 }, weight: 2, text: [
    "Her belly rises on a deeper breath — hungry, warm, and suddenly very aware of being seen.",
  ]},
]);

// ── Tier 1 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — showing off the work in progress.
registerPool("comp.turnDisplay", [
  { when: {}, text: [
    `{subject.name} does a slow half-turn, letting you appreciate the work in progress. "It's coming along," she says, mock-modest. "I've been diligent."`,
    `"You think so?" {subject.name} asks, already angling her hips so you can see better.`,
    `{subject.name} smooths her top over the curve of her belly. "I've been putting in the hours," she says, deadpan.`,
  ]},
]);

// Shape: FULL SENTENCE — how she moves now.
registerPool("comp.bodyMid", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 2, stageMax: 7 }, text: [
    "At {subject.lbs} lbs her body moves differently — belly swaying, hips rolling, ass and thighs plush with each step.",
    "At {subject.lbs} lbs she's thick and warm — breasts heavier, belly rounding forward, thighs spreading when she sits.",
  ]},
  { when: { stageMin: 8 }, weight: 2, text: [
    "At {subject.lbs} lbs she takes up the office differently — flesh settling heavy, movement slow and deliberate.",
  ]},
]);

// Shape: FULL SENTENCE — practicing confidence.
registerPool("comp.practice", [
  { when: {}, text: [
    "She isn't performing confidence. She's practicing it. Her hands trace the heavy curve of her hips; her smile is warm and a little surprised at herself.",
    "Her hands map the new geography of herself — belly, hips, thighs — like she's learning the terrain by touch.",
    "She catches herself preening and doesn't stop. The surprise is that she likes it.",
  ]},
]);

// Shape: DIALOGUE BEAT — wants more praise.
registerPool("comp.askMore", [
  { when: {}, text: [
    `"Keep talking," she says, settling into the chair. The chair groans. She doesn't care. "No, really. Keep talking."`,
    `"Say it again," she murmurs. "I want to hear you mean it."`,
    `"Don't stop," she says softly. "I'm not done hearing it."`,
  ]},
]);

// Shape: DIALOGUE BEAT — the repeat request.
registerPool("comp.askRepeat", [
  { when: {}, text: [
    `"Say it again," {subject.name} murmurs, and this time she means it.`,
    `"Again," {subject.name} says. Not a question.`,
    `"One more time," {subject.name} breathes. "Slower."`,
  ]},
]);

// Shape: FULL SENTENCE — thick body description.
registerPool("comp.bodyThick", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 3 }, text: [
    "Her {subject.lbs}-lb body is thick and soft and impossible to ignore — breasts heavier, belly rounding forward, thighs spreading warm against the chair arms.",
    "At {subject.lbs} lbs every curve has weight to it — plush, warm, impossible to overlook.",
  ]},
]);

// Shape: DIALOGUE BEAT — seen, all of it.
registerPool("comp.seeAll", [
  { when: {}, text: [
    `"You see it," she says. Not a question. "All of it." She runs both palms down the great curve of herself, feeling the weight settle.`,
    `"You actually see me," she says, wonder and hunger braided together.`,
    `She spreads her hands over herself — slow, deliberate. "All of this. You mean all of this."`,
  ]},
]);

// Shape: DIALOGUE BEAT — wanting this now.
registerPool("comp.wantThis", [
  { when: {}, text: [
    `"I used to want to be invisible. Now I want—" She exhales. "This. I want this."`,
    `"I used to shrink," she admits. "Now I take up space on purpose."`,
    `"I don't want to go back," she says quietly. "I want more of this."`,
  ]},
]);

// ── Tier 2 fragments ──────────────────────────────────────────

// Shape: DIALOGUE BEAT — compliment as her due.
registerPool("comp.owned", [
  { when: {}, text: [
    `{subject.name} takes the compliment the way she takes everything now — as her due. "I know," she says warmly. "And there's more of me every week. You're welcome."`,
    `"Obviously," {subject.name} says, patting the warm round of her belly. "But I like hearing you say it."`,
    `"Keep them coming," {subject.name} murmurs. "They go down easier than dessert."`,
    `"I know what I am," {subject.name} says. "I'm glad you do too."`,
  ]},
]);

// Shape: FULL SENTENCE — at home in the body.
registerPool("comp.bodyHome", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 4 }, text: [
    "At {subject.lbs} lbs she is abundant and warm and completely at home in the body you've helped her build.",
    "At {subject.lbs} lbs she is plush and present and completely unashamed of the flesh.",
  ]},
]);

// Shape: FULL SENTENCE — savoring display.
registerPool("comp.display", [
  { when: {}, text: [
    "She smooths both hands down the vast soft geography of her belly, hips, thighs — slow, savoring, showing you without shame.",
    "She makes sure you're watching before she shifts — flesh jiggling, settling, warm.",
    "Her body is an invitation she no longer bothers to disguise.",
  ]},
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    "She presses your attention to her middle like it's another kind of meal — hungry for both.",
  ]},
]);

// Shape: DIALOGUE BEAT — wants it slow.
registerPool("comp.slowRepeat", [
  { when: {}, text: [
    `"Say it again," she says. "Slower. I like hearing you mean it."`,
    `"Again," she breathes. "Like you mean it."`,
    `"Don't rush," she murmurs. "I want to feel every word land."`,
  ]},
]);

// Shape: DIALOGUE BEAT — command tone.
registerPool("comp.commandAgain", [
  { when: {}, text: [
    `"Again," {subject.name} says, eyes never leaving yours.`,
    `"Say it," {subject.name} commands softly. "I didn't finish listening."`,
    `"More," {subject.name} says. Not about food.`,
  ]},
]);

// Shape: FULL SENTENCE — vast presence.
registerPool("comp.presence", [
  { when: {}, text: ["", ""] },
  { when: { stageMin: 6 }, text: [
    "Her enormous soft body fills the office with heat and presence — flesh pressing at every seam, jiggling when she shifts, settling heavy and warm when she stills.",
    "She takes up the room the way hunger takes up time — completely, without apology.",
  ]},
  { when: { stageMin: 9 }, weight: 2, text: [
    "Her body is vast and warm and immobile with abundance — every breath a small earthquake in soft flesh.",
  ]},
]);

// Shape: DIALOGUE BEAT — shared project.
registerPool("comp.partnership", [
  { when: {}, text: [
    `"You wanted this," she murmurs. "So did I. Look what we made."`,
    `"We did this," she says, proud and warm. "Together."`,
    `"This is ours," she murmurs, hands spread over her middle. "You know that, right?"`,
  ]},
]);

// Shape: FULL SENTENCE — hand on belly.
registerPool("comp.handPlace", [
  { when: {}, text: [
    `She takes your hand and places it on the warm crest of her belly. "Feel that? Still growing. Still yours to watch."`,
    "She guides your palm to the soft weight of her — warm, yielding, still changing.",
    "Her flesh yields under your touch, heavy and alive and unhurried.",
  ]},
  { when: { addictionLevelMin: 2 }, weight: 2, text: [
    "She presses your hand there and holds it — like your touch is the thing she's been craving.",
  ]},
]);

// ── Personas — per-girl voice (see AUTHORING.md §4) ──────────

registerModuleVariants("comp.shyReact", [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany's competitive grin falters into something softer. "That's— points, right? That counts?"`,
  ]},
  { when: { studentId: 1 }, weight: 4, text: [
    `Madeline adjusts her glasses. "I've documented the change. Hearing it aloud is… statistically significant."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `"Wait, say that again," Kylie says, phone half-raised. "I need it for the caption. No filter. Just me."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena goes still. "Coach never— nobody on the team ever—" She exhales. "Say it again."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `"Achievement unlocked," Destiny mutters, cheeks pink. "Flattery buff received."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya goes quiet. "…More?" she says finally, like the word costs her.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"You can't just say that," Chloe says, Dublin-flat. "My mam will have words if I start believing Americans."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Oh, sugar," Daisy breathes, hand to her chest. "You shouldn't—" She doesn't finish. She's smiling.`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith's smile doesn't reach her eyes. "How observant." A pause. "Go on."`,
  ]},
]);

registerModuleVariants("comp.deflectOpen", [
  { when: { studentId: 5 }, weight: 4, text: [
    `"Don't buff me," Destiny says, already preening. "Okay, fine. Buff me."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `"That's not a KPI," Priya says automatically — then, quieter: "But thank you for the feedback."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `"You're performing admiration," Nadia says, watching your face. "…Keep going. I'm collecting data."`,
  ]},
]);

registerModuleVariants("comp.turnDisplay", [
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany pivots like she's still on a podium. "Season stats are trending up," she says. "I'm keeping score."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie angles for the light. "Content update: growth arc visible," she says. "Engagement should be insane."`,
  ]},
  { when: { studentId: 4 }, weight: 4, text: [
    `Fiona turns slowly, reverent. "The composition is… coming together," she murmurs.`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé pats her middle like a well-risen dough. "Good fermentation," she says. "I'm proud of this batch."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane does a slow turn. "Hay bale season came early," she drawls, pleased.`,
  ]},
]);

registerModuleVariants("comp.askMore", [
  { when: { studentId: 2 }, weight: 4, text: [
    `"Keep talking," Kylie says. "My audience loves a professor who notices."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"More is more, babe," Tiffany beams. "Say it again. Louder."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `"Aggressive self-care requires validation," Kaylee says warmly. "Continue."`,
  ]},
]);

registerModuleVariants("comp.wantThis", [
  { when: { studentId: 1 }, weight: 4, text: [
    `"I am the result," Madeline says quietly. "I want to be a better dataset."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `"Home," Maya says. One word. She means the body.`,
  ]},
  { when: { studentId: 16 }, weight: 4, text: [
    `"The literature supports positive body image," Sophia says, breathless. "I'm… conducting a field study."`,
  ]},
]);

registerModuleVariants("comp.owned", [
  { when: { studentId: 0 }, weight: 4, text: [
    `"I know," Brittany says, chin up. "I'm winning. You're welcome to watch."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `"New event. No weight class," Serena says, satisfied. "I'm built for it."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Obviously," Tiffany trills, patting her hips. "More is more, Professor. Always."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `"I know," Chloe says dryly. "American portions. Field research. No complaints."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `"Bless it, I know," Daisy laughs, warm. "And there's plenty more where that came from."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `"Soon," Lilith says. She does not elaborate.`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `"The expedition's going well," Indiana says, patting her middle. "Remarkable finds."`,
  ]},
]);

registerModuleVariants("comp.partnership", [
  { when: { studentId: 1 }, weight: 4, text: [
    `"Collaborative outcome," Madeline says, hands on her belly. "Peer-reviewed. Excellent."`,
  ]},
  { when: { studentId: 7 }, weight: 4, text: [
    `"Joint venture," Priya murmurs. "Returns exceeding projections."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `"You wanted an audience," Nadia says. "I wanted to be seen. Symmetry."`,
  ]},
]);

registerModuleVariants("comp.slowRepeat", [
  { when: { studentId: 4 }, weight: 4, text: [
    `"Again," Fiona breathes. "Like you're studying a canvas."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `"Say it slower," Reneé murmurs. "Let it rise."`,
  ]},
]);
