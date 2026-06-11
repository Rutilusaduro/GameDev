// ═══════════════════════════════════════════════════════════════
// SCENE: WEIGH-IN — weekly check-in arrival and post-scale reaction
// Subject = the student being weighed.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import '../modules.js';

// ── weighIn.entrance — how the student walks in ───────────────
// Varies by stage × corruption. Returns 1–2 sentences.

registerModule("weighIn.entrance", [
  // thin + uncorrupted: polite, contained, not thinking about it
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} slips in on time, sets her bag beside the desk, and waits quietly for you to get started.`,
      (ctx) => `${ctx.subject.name} arrives with the composed stillness of someone who has already rehearsed being fine about this.`,
      (ctx) => `${ctx.subject.name} comes in quickly, takes up her usual corner, and glances at the scale only once.`,
    ] },
  // thin + corrupted: easy, no nerves, maybe even eager
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} breezes in, drops her bag, and looks at the scale like it is the most interesting thing in the room.`,
      (ctx) => `${ctx.subject.name} comes in relaxed, barely pausing at the door. There is no ceremony to it.`,
      (ctx) => `${ctx.subject.name} arrives easy, already making her way toward the scale before you even gesture at it.`,
    ] },
  // soft + uncorrupted: self-conscious about the new softness
  { when: { stageMin: 2, stageMax: 3, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps in with the careful brightness of someone who has been thinking about this appointment all week. She tugs at her hem before she sits.`,
      (ctx) => `${ctx.subject.name} comes in, sets her things down slowly, and doesn't quite meet your eye right away.`,
      (ctx) => `${ctx.subject.name} arrives on time. She says a cheerful hello that is doing most of the emotional work.`,
    ] },
  // soft + conflicted: somewhere between acknowledgment and avoidance
  { when: { stageMin: 2, stageMax: 3, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} walks in and makes brief, steady eye contact — the look of someone waiting to see which version of this appointment it will be.`,
      (ctx) => `${ctx.subject.name} tosses her bag on the chair and rolls her shoulders once. She is not tense exactly. Just ready.`,
      (ctx) => `${ctx.subject.name} comes in, glances at the scale, and back at you. "All right," she says, and that is all.`,
    ] },
  // soft + broken: heads straight for the scale, no avoidance
  { when: { stageMin: 2, stageMax: 3, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} walks in already looking at the scale. She drops her bag and starts toward it.`,
      (ctx) => `${ctx.subject.name} comes in like she owns the appointment. She is moving toward the scale before you finish your greeting.`,
      (ctx) => `${ctx.subject.name} arrives easy and makes a beeline for the scale. She has been looking forward to this.`,
    ] },
  // plush + uncorrupted: clearly aware of the new shape, trying not to show it
  { when: { stageMin: 4, stageMax: 5, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} fills the doorway a little more than she used to. She steps through and pretends not to notice.`,
      (ctx) => `${ctx.subject.name} comes in with a bright "hey" and moves to take up as little space as possible. She does not entirely succeed.`,
      (ctx) => `${ctx.subject.name} steps in and glances down at herself once — quick, reflexive — before looking up. "Ready," she says.`,
    ] },
  // plush + conflicted: stopped fighting the shape, not yet embracing it
  { when: { stageMin: 4, stageMax: 5, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} comes in matter-of-fact, sets her things down, and waits. She is past the stage of making a face at the scale.`,
      (ctx) => `${ctx.subject.name} moves through the door with the easy, practiced manner of someone who has stopped arguing with her own silhouette.`,
      (ctx) => `${ctx.subject.name} steps in and nods at you. "Let's do it," she says, like a woman clocking into a job she has made her peace with.`,
    ] },
  // plush + broken: walks in like she owns it
  { when: { stageMin: 4, stageMax: 5, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} walks in with a faint smile, drops her bag without breaking stride, and heads for the scale.`,
      (ctx) => `${ctx.subject.name} comes in relaxed and unhurried, taking up the space she takes up, unbothered by it.`,
      (ctx) => `${ctx.subject.name} arrives warm and easy. "Been looking forward to this one," she says, and the way she says it leaves no room for doubt.`,
    ] },
  // heavy+ + uncorrupted: heavy presence, self-conscious, won't name it
  { when: { stageMin: 6, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} moves through the door carefully. The floorboards register it. She does not meet your eye right away.`,
      (ctx) => `${ctx.subject.name} comes in and fills the room. She looks like she is trying very hard not to acknowledge that.`,
      (ctx) => `${ctx.subject.name} arrives and the office feels a little smaller. She sets her bag down and stares at the wall behind you.`,
    ] },
  // heavy+ + conflicted: acknowledged, not celebrating
  { when: { stageMin: 6, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} comes in and her presence arrives a moment before she does. She sets her bag down and nods once.`,
      (ctx) => `${ctx.subject.name} moves into the office with the unhurried certainty of someone too heavy to rush. She does not apologize for it.`,
      (ctx) => `${ctx.subject.name} walks in and the air in the room shifts slightly. She looks at the scale and back at you. "Okay," she says.`,
    ] },
  // heavy+ + broken: owns every pound
  { when: { stageMin: 6, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} enters slowly, deliberately, and the room reorganizes itself around her without anyone asking it to.`,
      (ctx) => `${ctx.subject.name} walks in like the room was designed for her — she just needed time to grow into it.`,
      (ctx) => `${ctx.subject.name} comes in warm and heavy, filling the doorframe before she fills the room. She is entirely comfortable with both.`,
    ] },
  // wildcard
  { when: {}, text: [(ctx) => `${ctx.subject.name} comes in for her weekly check-in.`] },
]);

// ── weighIn.scaleApproach — stepping onto the analog scale ─────

registerModule("weighIn.scaleApproach", [
  // thin: barely registers
  { when: { stageMax: 1 },
    text: [
      "She steps onto the old analog scale. The needle swings out, slow and quiet.",
      "She steps up onto the white scale. The platform is steady. The red needle begins its measured arc.",
      "She steps onto the scale without ceremony. The needle barely moves before it finds its answer.",
    ] },
  // soft: some shift now, just noticeable
  { when: { stageMin: 2, stageMax: 3 },
    text: [
      "She steps onto the old scale. The platform takes the weight with only a small creak. The needle starts its climb.",
      "She steps up. The platform settles a little more than it used to. The red needle swings wide and begins to hunt.",
      "She steps onto the analog scale and the dial shudders slightly before the needle finds a direction.",
    ] },
  // plush: the scale is working for it
  { when: { stageMin: 4, stageMax: 5 },
    text: [
      "She steps carefully onto the old scale. The platform groans once. The red needle swings out wide and keeps climbing.",
      "She steps onto the scale and there is a creak, then a groan, then the needle arcing hard to the right.",
      "She steps up. The old white scale protests under her, the platform flexing, the needle moving with urgent purpose.",
    ] },
  // heavy: scale is straining
  { when: { stageMin: 6, stageMax: 7 },
    text: [
      "She steps onto the analog scale. The platform settles with a deep, announcing creak. The needle slams toward the far end of its range.",
      "She steps up. The scale takes a breath, holds it, then the needle swings past the midpoint and keeps going.",
      "She steps onto the scale and the old platform flexes beneath her, the dial lurching hard before the needle finds its long way across.",
    ] },
  // massive+: this scale is not designed for this
  { when: { stageMin: 8 },
    text: [
      "She steps onto the old analog scale. The platform protests immediately — a sharp creak followed by a low, loaded groan. The needle slams toward the end of its travel.",
      "She steps up onto the white scale. It accepts her the way old furniture accepts an overload: with sound, and reluctance, and a dial that has run out of numbers.",
      "She steps onto the scale. The platform bends. The needle swings hard to the right and does not stop moving where it should.",
    ] },
  // wildcard
  { when: {}, text: ["She steps onto the scale. The red needle begins to spin."] },
]);

// ── weighIn.bigScaleApproach — going to the heavy-duty scale ───

registerModule("weighIn.bigScaleApproach", [
  // She knows the routine, has been on this scale before
  { when: { stageMin: 6 },
    text: [
      "She goes straight to the heavy-duty platform without being asked. The industrial display blinks awake and begins its long climb.",
      "She crosses to the platform and steps up. The steel surface does not shift. The green LCD starts counting.",
      "She steps onto the heavy-duty platform with the ease of routine. The display wakes up and the number begins its climb.",
    ] },
  // General big scale approach (lower stages here would be unusual but fallback)
  { when: {},
    text: [
      "She heads straight for the heavy-duty platform — she knows the routine by now. The LCD display blinks to life and starts counting.",
      "She crosses to the industrial scale without being asked. The steel platform takes her weight without comment. The display begins to climb.",
      "She steps up onto the heavy-duty platform. The display wakes and the number starts building, patient and precise.",
    ] },
]);

// ── weighIn.reaction — seeing the scale reading ────────────────
// Called after the scale animation settles. Varies by stage × corruption.

registerModule("weighIn.reaction", [
  // thin + hesitant: notes the number, maybe a little puzzled, not yet troubled
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and glances back at the dial. "Huh." She tilts her head slightly, solving an arithmetic problem. "Okay. Sure."`,
      (ctx) => `${ctx.subject.name} checks the reading and nods once, already moving on. The number is small. She is not the kind of girl who worries about small numbers.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a beat, then back at you. "That seems right." She shrugs. "Nothing to report."`,
    ] },
  // thin + corrupted: pleased it is going up, or at minimum satisfied
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the dial and smiles, just slightly. "Moving in the right direction," she says, and she is not asking for confirmation.`,
      (ctx) => `${ctx.subject.name} steps off and checks the number with calm satisfaction. She does not elaborate. The number says enough.`,
      (ctx) => `${ctx.subject.name} glances at the reading and her expression warms. "Good," she says. "Keep it going."`,
    ] },
  // soft + hesitant: the gain is visible on the scale, harder to dismiss
  { when: { stageMin: 2, stageMax: 3, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the number for a beat too long. "Is that..." She stops, smooths her top over her middle. "I've just been eating a lot this semester."`,
      (ctx) => `${ctx.subject.name} steps off quietly. She tugs at her waistband. "It's fine," she says. "I'm fine." She might be telling herself.`,
      (ctx) => `${ctx.subject.name} stares at the dial with the focused look of someone counting backwards from ten. "It's probably the food here," she says. "Different from home."`,
    ] },
  // soft + conflicted: mixed — aware something is changing, hasn't decided how to feel
  { when: { stageMin: 2, stageMax: 3, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} checks the reading and exhales slowly. "Every week," she mutters — less surprise than resignation.`,
      (ctx) => `${ctx.subject.name} steps off and looks at the dial. Then at herself. Then at the dial again. "Yeah," she says eventually. "Yeah, okay."`,
      (ctx) => `${ctx.subject.name} looks at the reading with the careful neutrality of someone who has decided not to have feelings about it right now.`,
    ] },
  // soft + broken: pleased about the gain, pats herself
  { when: { stageMin: 2, stageMax: 3, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} hops off the scale, looks at the dial, and grins. "Up again." She pats her stomach once, affectionately. "Good."`,
      (ctx) => `${ctx.subject.name} checks the number, satisfied. "I figured," she says. "I could feel it coming."`,
      (ctx) => `${ctx.subject.name} sees the reading and tilts her head with open approval. "Yeah," she says warmly. "That's what I wanted."`,
    ] },
  // plush + hesitant: the number is big enough to be undeniable, denial attempts anyway
  { when: { stageMin: 4, stageMax: 5, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the number just sits there. She stares at it. "It's the — it's the clothes," she says finally, and that is not a very convincing thing to say.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a long moment. "Okay." A breath. "Okay. I should really go for a run." She probably will not.`,
      (ctx) => `${ctx.subject.name} takes in the reading and squeezes her eyes shut briefly. "I didn't think it was that high." A small, unconvincing laugh. "I'll watch it."`,
    ] },
  // plush + conflicted: resigned, starting to internalize the new reality
  { when: { stageMin: 4, stageMax: 5, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and looks at the reading without particular alarm. "I mean, yeah," she says. "I can feel that." She tugs at her waistband once and lets it go.`,
      (ctx) => `${ctx.subject.name} checks the number and lets out a short breath. "Is it bad that I expected that?" She doesn't quite wait for an answer.`,
      (ctx) => `${ctx.subject.name} looks at the dial and gives a small, settled nod. "It's only going one direction," she says, like she has made up her mind about something.`,
    ] },
  // plush + broken: approves of what she sees
  { when: { stageMin: 4, stageMax: 5, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off smiling. "I'm really filling out," she says — not a complaint. She presses her hands to her hips and laughs softly.`,
      (ctx) => `${ctx.subject.name} looks at the number the way someone reads a good review. She approves.`,
      (ctx) => `${ctx.subject.name} steps off and runs a hand along her side. "Nice," she says simply. She means it.`,
    ] },
  // heavy + hesitant: genuinely distressed, the number is past rationalization
  { when: { stageMin: 6, stageMax: 7, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off the scale and the number lands on her like a door swinging open. She is quiet for a moment. "I didn't think it was that much," she says.`,
      (ctx) => `${ctx.subject.name} stares at the reading. Her jaw is set. "That's —" She stops. "I'll cut back," she says, to herself as much as you.`,
      (ctx) => `${ctx.subject.name} looks at the dial in silence. Then she looks at her hands. "I have to start saying no to things," she says, with the tone of someone who is not quite sure she will.`,
    ] },
  // heavy + conflicted: making peace with it, the numbers have gotten too large to fight
  { when: { stageMin: 6, stageMax: 7, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and lets out a slow breath through her nose. "Okay." She rubs the back of her neck. "It's just a number."`,
      (ctx) => `${ctx.subject.name} steps off and doesn't say anything for a beat. Then: "More than I thought." She doesn't sound devastated. She sounds like someone doing math.`,
      (ctx) => `${ctx.subject.name} checks the reading and tilts her head. "Yeah," she says. "I can live with that." It is more acceptance than celebration.`,
    ] },
  // heavy + broken: claims the weight, unbothered
  { when: { stageMin: 6, stageMax: 7, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off with the easy confidence of someone who made peace with the numbers a long time ago. "Good," she says simply.`,
      (ctx) => `${ctx.subject.name} checks the reading and nods, satisfied. She rolls her shoulders back. "Yeah," she says. "That tracks."`,
      (ctx) => `${ctx.subject.name} looks at the dial and smiles. "Every week," she says, and unlike some people who say that in this office, she sounds pleased about it.`,
    ] },
  // massive + hesitant: the number is staggering, she doesn't have a frame for it
  { when: { stageMin: 8, stageMax: 9, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and stares at the reading. The number is enormous. She opens her mouth and closes it. "I need some air," she says finally.`,
      (ctx) => `${ctx.subject.name} looks at the number in silence. Her hands are at her sides. "Every single week," she says quietly, and she does not sound at peace with it.`,
      (ctx) => `${ctx.subject.name} stares at the reading until her breathing steadies. "It doesn't stop," she says softly. It is hard to tell if that is a question.`,
    ] },
  // massive + conflicted: surrendered, finding a kind of dark humor in it
  { when: { stageMin: 8, stageMax: 9, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} takes in the number with a long exhale. "That's..." She tilts her head. "Well. I did eat everything." A short, reluctant laugh.`,
      (ctx) => `${ctx.subject.name} looks at the reading and then at you. "That's not stopping, is it," she says. It is not really a question.`,
      (ctx) => `${ctx.subject.name} checks the dial and is quiet for a moment. "You know," she says, "I've stopped being surprised." She sounds like that is its own kind of answer.`,
    ] },
  // massive + broken: triumphant, or matter-of-fact in a way that reads like pride
  { when: { stageMin: 8, stageMax: 9, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and nods, deep and satisfied. "Getting there," she murmurs, like she has a specific destination in mind and she is close.`,
      (ctx) => `${ctx.subject.name} looks at the reading and something in her expression settles. "I know," she says. "I can feel it."`,
      (ctx) => `${ctx.subject.name} looks at the number like something she built. She exhales slowly, pleased. "Good," she says.`,
    ] },
  // giant + hesitant: the number is beyond ordinary, she has no words
  { when: { stage: [10], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the scale just says what it says. She stares at it for a long time. There is nowhere for a number that size to hide.`,
      (ctx) => `${ctx.subject.name} looks at the reading. Then at herself. Then at the reading. "I don't..." She trails off. There is nothing to finish with.`,
    ] },
  // giant + any: settled into it
  { when: { stage: [10] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading. The number is, by any scale, extraordinary. She looks at you. "I know," is all she says.`,
      (ctx) => `${ctx.subject.name} checks the reading and breathes out slowly. Whatever she expected to feel, this is what she feels instead.`,
    ] },
  // wildcard fallback
  { when: {}, text: [(ctx) => `${ctx.subject.name} steps off the scale and takes in the reading.`] },
]);

// ── Templates ─────────────────────────────────────────────────

export const WEIGH_IN_INTRO_NORMAL =
  "{weighIn.entrance} {weighIn.scaleApproach}";

export const WEIGH_IN_INTRO_BIG =
  "{weighIn.entrance} {weighIn.bigScaleApproach}";

// renderWeighInIntro(student, week, goesDirectlyToBig) → intro scene string
export function renderWeighInIntro(student, week, goesDirectlyToBig = false) {
  const ctx = createContext({ subject: student, week });
  return render(goesDirectlyToBig ? WEIGH_IN_INTRO_BIG : WEIGH_IN_INTRO_NORMAL, ctx);
}

// renderWeighInReaction(student, week) → post-scale reaction string
export function renderWeighInReaction(student, week) {
  const ctx = createContext({ subject: student, week });
  return render("{weighIn.reaction}", ctx);
}
