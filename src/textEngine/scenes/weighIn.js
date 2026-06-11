// ═══════════════════════════════════════════════════════════════
// SCENE: WEIGH-IN — weekly check-in arrival and post-scale reaction
// Subject = the student being weighed.
// Composed: arrival (bodyType × stage) + entrance (stage × corruption)
//           + scale approach + reaction.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import '../modules.js';

// ── weighIn.arrival — physical entrance, body-type flavored ───
// How she moves through the door given her shape and size.
// Varies by bodyType × stage band. Returns one sentence.

registerModule("weighIn.arrival", [
  // pear — hips lead
  { when: { bodyType: "pear", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} slips through the door, hips swaying just enough that you notice.`,
      (ctx) => `${ctx.subject.name} arrives with a light step; her lower half moves with a rhythm her waist hasn't caught up to yet.`,
      (ctx) => `${ctx.subject.name} comes in and her hips brush the doorframe — barely, but she notices.`,
    ] },
  { when: { bodyType: "pear", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters and her hips arrive a half-second after she does, rolling through the doorway with unhurried weight.`,
      (ctx) => `${ctx.subject.name} comes in; her thighs brush together with each step, a soft percussion you can hear from the desk.`,
      (ctx) => `${ctx.subject.name} moves through the door and the lower half of her silhouette has become the main event.`,
    ] },
  { when: { bodyType: "pear", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} angles through the doorway sideways — not dramatically, just practically. Her hips have outgrown casual entry.`,
      (ctx) => `${ctx.subject.name} enters with a slow, rolling gait, each step sending a tremor through the soft mass of her thighs and hips.`,
      (ctx) => `${ctx.subject.name} comes in and the room rearranges around her lower body. She is used to this.`,
    ] },

  // apple — belly forward
  { when: { bodyType: "apple", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with one hand resting lightly on her middle, like she is checking something.`,
      (ctx) => `${ctx.subject.name} arrives and her shirt has begun to ride up at the front — she tugs it down without looking.`,
      (ctx) => `${ctx.subject.name} comes in; there is a new softness at her middle that wasn't there at the start of semester.`,
    ] },
  { when: { bodyType: "apple", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with her belly leading, round and forward, her arms held slightly away from her sides.`,
      (ctx) => `${ctx.subject.name} comes in and her middle strains at her waistband. She exhales once, then commits to the walk.`,
      (ctx) => `${ctx.subject.name} moves through the door and her belly bounces once, softly, before settling.`,
    ] },
  { when: { bodyType: "apple", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters with her gut preceding her — heavy, round, impossible to ignore. The floorboards register each step.`,
      (ctx) => `${ctx.subject.name} comes in and her belly sways with the effort of walking. She rests a hand on it without thinking.`,
      (ctx) => `${ctx.subject.name} angles through the doorway, belly first. She has stopped pretending it isn't there.`,
    ] },

  // hourglass — curves balanced
  { when: { bodyType: "hourglass", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with an easy sway, top and bottom moving in counterpoint.`,
      (ctx) => `${ctx.subject.name} arrives and her figure still has that balanced hourglass line — just softer at every curve.`,
      (ctx) => `${ctx.subject.name} comes in; her hips and chest have both picked up a little weight, evenly.`,
    ] },
  { when: { bodyType: "hourglass", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters and her curves have grown generous — chest and hips both fuller, the waist still defined but softer.`,
      (ctx) => `${ctx.subject.name} comes in with a rolling sway, her figure grown plush in both directions at once.`,
      (ctx) => `${ctx.subject.name} moves through the door and every curve has thickened. She carries it well.`,
    ] },
  { when: { bodyType: "hourglass", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters and her hourglass shape has been scaled up past its original mold — enormous curves above and below a waist that still exists, barely.`,
      (ctx) => `${ctx.subject.name} comes in heavy and curved, her chest and hips both commanding the room's attention.`,
      (ctx) => `${ctx.subject.name} walks in with slow, rolling steps, her figure a vast hourglass that fills the doorway.`,
    ] },

  // athletic — muscle going soft
  { when: { bodyType: "athletic", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with the posture of someone who used to sprint everywhere. The bounce in her step is new.`,
      (ctx) => `${ctx.subject.name} arrives still moving like an athlete, but there is a softness underneath the old muscle now.`,
      (ctx) => `${ctx.subject.name} comes in quick, then slows — her thighs rub together in a way they didn't used to.`,
    ] },
  { when: { bodyType: "athletic", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with power buried under comfortable thickness; she still moves like she trained, but the padding shows.`,
      (ctx) => `${ctx.subject.name} comes in and her strong frame has gone plush — muscle softened, curves filling in where leanness used to be.`,
      (ctx) => `${ctx.subject.name} walks in with deliberate steps, her athletic build wrapped in new weight.`,
    ] },
  { when: { bodyType: "athletic", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters heavy and broad, bulk layered over the athlete she used to be. She still stands like a competitor.`,
      (ctx) => `${ctx.subject.name} comes in ponderous and strong, sheer mass where the sprinter used to be.`,
      (ctx) => `${ctx.subject.name} moves through the door with slow, weighty purpose — strength entombed in immensity.`,
    ] },

  // straight — even spread
  { when: { bodyType: "straight", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with a narrow, straight frame that has begun to soften at the edges.`,
      (ctx) => `${ctx.subject.name} arrives evenly — no one part leading, just a general thickening all over.`,
      (ctx) => `${ctx.subject.name} comes in and her clothes fit a little closer than they did in September.`,
    ] },
  { when: { bodyType: "straight", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with even thickness settling everywhere at once — shoulders, waist, hips, all of it.`,
      (ctx) => `${ctx.subject.name} comes in and her straight figure has gone columnar-plush, weight carried uniformly.`,
      (ctx) => `${ctx.subject.name} moves through the door; she has thickened evenly, like someone poured softness into a mold of her old self.`,
    ] },
  { when: { bodyType: "straight", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters as a heavy, columnar body — weight everywhere, no single feature leading the charge.`,
      (ctx) => `${ctx.subject.name} comes in and fills the doorway with uniform enormity from shoulder to knee.`,
      (ctx) => `${ctx.subject.name} walks in slow and vast, a single continuous expanse of body.`,
    ] },

  // rotund — round all over
  { when: { bodyType: "rotund", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with a soft, doughy middle that bounces once when she stops.`,
      (ctx) => `${ctx.subject.name} arrives rounder than she was — a plumpness settling in evenly, like bread proofing.`,
      (ctx) => `${ctx.subject.name} comes in and her figure has gone gently spherical at the edges.`,
    ] },
  { when: { bodyType: "rotund", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters plump and rotund from every angle, her middle a soft dome under her shirt.`,
      (ctx) => `${ctx.subject.name} comes in and jiggles once when she sets her bag down — she pretends not to notice.`,
      (ctx) => `${ctx.subject.name} moves through the door with a rolling waddle, her round body swaying with each step.`,
    ] },
  { when: { bodyType: "rotund", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters as a heavy, round mass that rolls when she moves, belly and hips merged into one curve.`,
      (ctx) => `${ctx.subject.name} comes in vast and ballooning, her rotund shape dominating the room before she reaches the desk.`,
      (ctx) => `${ctx.subject.name} walks in slow, her colossal roundness shifting like something with its own gravity.`,
    ] },

  // voluptuous — curves and chest
  { when: { bodyType: "voluptuous", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in and her curves are already present even at this size — breasts and hips both drawing the eye.`,
      (ctx) => `${ctx.subject.name} arrives with a sway that is half posture, half the weight of new softness.`,
      (ctx) => `${ctx.subject.name} comes in; her voluptuous figure has picked up a little plushness since last month.`,
    ] },
  { when: { bodyType: "voluptuous", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with heavy breasts and wide hips grown plush, every curve straining at her seams.`,
      (ctx) => `${ctx.subject.name} comes in and her chest bounces once; she adjusts her strap and keeps walking.`,
      (ctx) => `${ctx.subject.name} moves through the door, voluptuous and unapologetic, curves stacked and soft.`,
    ] },
  { when: { bodyType: "voluptuous", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters with enormous breasts resting on a soft belly, her voluptuous body filling every inch of the doorway.`,
      (ctx) => `${ctx.subject.name} comes in heavy and curved, breasts and hips grown past any ordinary scale.`,
      (ctx) => `${ctx.subject.name} walks in slow, her voluptuous excess leading every movement.`,
    ] },

  // mom_bod — soft, lived-in
  { when: { bodyType: "mom_bod", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with the comfortable energy of someone who always has snacks in her bag.`,
      (ctx) => `${ctx.subject.name} arrives warm and practical, a gentle softness settling around her waist.`,
      (ctx) => `${ctx.subject.name} comes in and her figure has gone a little lived-in — hips and middle both softer.`,
    ] },
  { when: { bodyType: "mom_bod", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with a soft mom-bod spread, warm at the middle, nurturing thickness at hip and thigh.`,
      (ctx) => `${ctx.subject.name} comes in and her waistband has given up; she hitches her pants once and smiles anyway.`,
      (ctx) => `${ctx.subject.name} moves through the door with a comfortable waddle, her body built for second helpings.`,
    ] },
  { when: { bodyType: "mom_bod", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters as a vast, pillowy mom-bod — soft abundance from chest to thigh, built for comfort.`,
      (ctx) => `${ctx.subject.name} comes in heavy and maternal, her body dominating the couch before she even sits.`,
      (ctx) => `${ctx.subject.name} walks in slow, maternal softness scaled up past any ordinary chair.`,
    ] },

  // fertility_goddess — hips and chest
  { when: { bodyType: "fertility_goddess", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in with wide hips on a still-slender frame — fertile curves just starting to ripen.`,
      (ctx) => `${ctx.subject.name} arrives and her breasts and hips have begun deepening together, a goddess-soft swell.`,
      (ctx) => `${ctx.subject.name} comes in with a sway that says abundance even before the numbers do.`,
    ] },
  { when: { bodyType: "fertility_goddess", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with heavy breasts and thunder thighs grown plush, a fertile figure swelling with abundance.`,
      (ctx) => `${ctx.subject.name} comes in and her hips brush the doorframe; she doesn't apologize for it.`,
      (ctx) => `${ctx.subject.name} moves through the door, goddess-soft and commanding, curves overflowing.`,
    ] },
  { when: { bodyType: "fertility_goddess", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters with breasts, belly, and hips grown mythic in scale — fertility made flesh.`,
      (ctx) => `${ctx.subject.name} comes in vast and ripe, her body a monument to abundance.`,
      (ctx) => `${ctx.subject.name} walks in slow, immobile curves shifting like something ancient and hungry.`,
    ] },

  // topHeavy — chest leads
  { when: { bodyType: "topHeavy", stageMax: 3 },
    text: [
      (ctx) => `${ctx.subject.name} walks in and her chest has grown ahead of everything else — a top-heavy softness settling in.`,
      (ctx) => `${ctx.subject.name} arrives with a fuller bust on a still-narrower lower half; she carries it carefully.`,
      (ctx) => `${ctx.subject.name} comes in and adjusts her strap once, unconsciously.`,
    ] },
  { when: { bodyType: "topHeavy", stageMin: 4, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} enters with heavy breasts leading a still-narrower lower half, her chest grown plush while her hips play catch-up.`,
      (ctx) => `${ctx.subject.name} comes in and leans back slightly to balance — her top half has outpaced the rest.`,
      (ctx) => `${ctx.subject.name} moves through the door, top-heavy and soft, breasts bouncing once.`,
    ] },
  { when: { bodyType: "topHeavy", stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters with enormous breasts dominating her silhouette, resting on a softer middle.`,
      (ctx) => `${ctx.subject.name} comes in and tips forward slightly with each step — her vast upper body has outgrown the rest.`,
      (ctx) => `${ctx.subject.name} walks in slow, a colossal chest leading a body that can barely keep up.`,
    ] },

  // wildcard — stage-only fallbacks when body type has no dedicated row
  { when: { stageMax: 1 },
    text: [
      (ctx) => `${ctx.subject.name} appears at the office door, slim and unhurried.`,
      (ctx) => `${ctx.subject.name} slips in quietly, a narrow figure against the doorframe.`,
    ] },
  { when: { stageMin: 2, stageMax: 5 },
    text: [
      (ctx) => `${ctx.subject.name} comes through the door with a softness that wasn't there at the start of semester.`,
      (ctx) => `${ctx.subject.name} enters and her clothes fit differently than they used to — closer, more honest.`,
    ] },
  { when: { stageMin: 6 },
    text: [
      (ctx) => `${ctx.subject.name} enters and the office feels smaller before she reaches the desk.`,
      (ctx) => `${ctx.subject.name} comes in heavy and unhurried, the floor registering her presence.`,
    ] },
  { when: {}, text: [(ctx) => `${ctx.subject.name} appears at the office door for her weekly check-in.`] },
]);

// ── weighIn.entrance — emotional beat on arrival ───────────────
// Varies by stage × corruption. Returns 1–2 sentences.

registerModule("weighIn.entrance", [
  // thin + uncorrupted: polite, contained, not thinking about it
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `She sets her bag beside the desk and waits quietly for you to get started.`,
      (ctx) => `She takes up her usual corner and glances at the scale only once.`,
      (ctx) => `There is a composed stillness to her — someone who has already rehearsed being fine about this.`,
      (ctx) => `She says hello, checks the time, and looks at you like this is just another appointment.`,
      (ctx) => `She folds her hands in her lap and waits. The scale is not the first thing on her mind.`,
    ] },
  // thin + corrupted: easy, no nerves, maybe even eager
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `She drops her bag and looks at the scale like it is the most interesting thing in the room.`,
      (ctx) => `There is no ceremony to it — she is already making her way toward the scale before you gesture.`,
      (ctx) => `She arrives easy, relaxed, barely pausing at the door.`,
      (ctx) => `"Ready when you are," she says, and she means the scale, not the paperwork.`,
      (ctx) => `She breezes in with the energy of someone who has stopped dreading these appointments.`,
    ] },
  // soft + uncorrupted: self-conscious about the new softness
  { when: { stageMin: 2, stageMax: 3, corruption: [0] },
    text: [
      (ctx) => `She tugs at her hem before she sits, the careful brightness of someone who has been thinking about this all week.`,
      (ctx) => `She sets her things down slowly and doesn't quite meet your eye right away.`,
      (ctx) => `She says a cheerful hello that is doing most of the emotional work.`,
      (ctx) => `"Hi," she says, a beat too bright. She smooths her top over her middle without looking at it.`,
      (ctx) => `She picks at a loose thread on her sleeve. The appointment is on her calendar and also in the back of her mind all week.`,
    ] },
  // soft + conflicted: somewhere between acknowledgment and avoidance
  { when: { stageMin: 2, stageMax: 3, corruption: [1] },
    text: [
      (ctx) => `She makes brief, steady eye contact — the look of someone waiting to see which version of this appointment it will be.`,
      (ctx) => `She tosses her bag on the chair and rolls her shoulders once. Not tense exactly. Just ready.`,
      (ctx) => `She glances at the scale, then at you. "All right," she says, and that is all.`,
      (ctx) => `"Same time next week, same deal," she says, like she is trying it on for size.`,
      (ctx) => `She exhales once through her nose. Not dread. Not excitement. Something in between.`,
    ] },
  // soft + broken: heads straight for the scale, no avoidance
  { when: { stageMin: 2, stageMax: 3, corruption: [2] },
    text: [
      (ctx) => `She is already looking at the scale when she walks in. She drops her bag and starts toward it.`,
      (ctx) => `She comes in like she owns the appointment, moving toward the scale before you finish your greeting.`,
      (ctx) => `She arrives easy and makes a beeline for the scale. She has been looking forward to this.`,
      (ctx) => `"Let's see it," she says, and she is already halfway there.`,
      (ctx) => `No preamble. She wants the number.`,
    ] },
  // plush + uncorrupted: clearly aware of the new shape, trying not to show it
  { when: { stageMin: 4, stageMax: 5, corruption: [0] },
    text: [
      (ctx) => `She steps through and pretends not to notice that she fills the doorway a little more than she used to.`,
      (ctx) => `She comes in with a bright "hey" and moves to take up as little space as possible. She does not entirely succeed.`,
      (ctx) => `She glances down at herself once — quick, reflexive — before looking up. "Ready," she says.`,
      (ctx) => `She laughs a little too quickly at something that isn't funny. Nerves, maybe. Or denial.`,
      (ctx) => `She sits carefully, like the chair might have opinions about her.`,
    ] },
  // plush + conflicted: stopped fighting the shape, not yet embracing it
  { when: { stageMin: 4, stageMax: 5, corruption: [1] },
    text: [
      (ctx) => `She sets her things down and waits. She is past the stage of making a face at the scale.`,
      (ctx) => `She moves with the easy, practiced manner of someone who has stopped arguing with her own silhouette.`,
      (ctx) => `She nods at you. "Let's do it," she says, like a woman clocking into a job she has made her peace with.`,
      (ctx) => `"Another week, another number," she says. Flat. Not hostile.`,
      (ctx) => `She doesn't flinch when she looks at the scale. That is new.`,
    ] },
  // plush + broken: walks in like she owns it
  { when: { stageMin: 4, stageMax: 5, corruption: [2] },
    text: [
      (ctx) => `She walks in with a faint smile, drops her bag without breaking stride, and heads for the scale.`,
      (ctx) => `She takes up the space she takes up, unbothered by it.`,
      (ctx) => `"Been looking forward to this one," she says, and the way she says it leaves no room for doubt.`,
      (ctx) => `She pats her hip once, affectionately, on the way to the scale.`,
      (ctx) => `She looks at you like you are about to give her good news. In a sense, you are.`,
    ] },
  // heavy+ + uncorrupted: heavy presence, self-conscious, won't name it
  { when: { stageMin: 6, corruption: [0] },
    text: [
      (ctx) => `The floorboards register her. She does not meet your eye right away.`,
      (ctx) => `She fills the room. She looks like she is trying very hard not to acknowledge that.`,
      (ctx) => `She sets her bag down and stares at the wall behind you.`,
      (ctx) => `She says hello quietly. The office feels smaller.`,
      (ctx) => `She waits by the door a moment, gathering herself, before committing to the walk to the scale.`,
    ] },
  // heavy+ + conflicted: acknowledged, not celebrating
  { when: { stageMin: 6, corruption: [1] },
    text: [
      (ctx) => `Her presence arrives a moment before she does. She sets her bag down and nods once.`,
      (ctx) => `She moves with the unhurried certainty of someone too heavy to rush. She does not apologize for it.`,
      (ctx) => `She looks at the scale and back at you. "Okay," she says.`,
      (ctx) => `"Let's get it over with," she says, but she doesn't sound like she wants it over with.`,
      (ctx) => `She leans against the doorframe for a second, catching her breath from the walk down the hall.`,
    ] },
  // heavy+ + broken: owns every pound
  { when: { stageMin: 6, corruption: [2] },
    text: [
      (ctx) => `The room reorganizes itself around her without anyone asking it to.`,
      (ctx) => `She walks in like the room was designed for her — she just needed time to grow into it.`,
      (ctx) => `She is entirely comfortable with the space she takes up.`,
      (ctx) => `"Good morning," she says warmly. "Let's see where I'm at."`,
      (ctx) => `She smiles at the scale like it is an old friend.`,
    ] },
  // wildcard
  { when: {}, text: [(ctx) => `She sets her things down and waits for you to begin.`] },
]);

// ── weighIn.scaleApproach — stepping onto the analog scale ─────

registerModule("weighIn.scaleApproach", [
  // body-type flavor at plush+
  { when: { bodyType: "pear", stageMin: 4 },
    text: [
      "She steps onto the scale and her hips settle wide, the platform dipping slightly on one side.",
      "She steps up carefully, thighs pressing together as the dial begins its climb.",
      "She mounts the scale and rocks her weight hip-to-hip before the needle finds its direction.",
    ] },
  { when: { bodyType: "apple", stageMin: 4 },
    text: [
      "She steps onto the scale belly-first, the platform groaning as her middle settles forward.",
      "She steps up and rests her hands on her gut, steadying herself as the needle swings.",
      "She mounts the scale and her belly bounces once before the dial shudders into motion.",
    ] },
  { when: { bodyType: "athletic", stageMin: 4 },
    text: [
      "She steps onto the scale with an athlete's balance, though the platform groans more than it used to.",
      "She steps up, knees bent slightly, distributing weight that has grown far past her training weight.",
      "She mounts the scale like a podium — old habit — and the dial protests the new numbers.",
    ] },
  { when: { bodyType: "voluptuous", stageMin: 4 },
    text: [
      "She steps onto the scale and her breasts settle heavily as the platform creaks.",
      "She steps up, curves compressing slightly, the needle swinging wide.",
      "She mounts the scale and adjusts her balance — top-heavy, the dial lurches before it climbs.",
    ] },

  // thin: barely registers
  { when: { stageMax: 1 },
    text: [
      "She steps onto the old analog scale. The needle swings out, slow and quiet.",
      "She steps up onto the white scale. The platform is steady. The red needle begins its measured arc.",
      "She steps onto the scale without ceremony. The needle barely moves before it finds its answer.",
      "She steps up lightly. The dial ticks once, twice, and settles.",
      "The platform doesn't shift. The needle drifts to its answer like it has all day.",
    ] },
  // soft: some shift now, just noticeable
  { when: { stageMin: 2, stageMax: 3 },
    text: [
      "She steps onto the old scale. The platform takes the weight with only a small creak. The needle starts its climb.",
      "She steps up. The platform settles a little more than it used to. The red needle swings wide and begins to hunt.",
      "She steps onto the analog scale and the dial shudders slightly before the needle finds a direction.",
      "She mounts the scale and there is a faint creak — new, but not alarming. Yet.",
      "The needle swings out with more authority than last month. She watches it go.",
    ] },
  // plush: the scale is working for it
  { when: { stageMin: 4, stageMax: 5 },
    text: [
      "She steps carefully onto the old scale. The platform groans once. The red needle swings out wide and keeps climbing.",
      "She steps onto the scale and there is a creak, then a groan, then the needle arcing hard to the right.",
      "She steps up. The old white scale protests under her, the platform flexing, the needle moving with urgent purpose.",
      "The platform dips. The dial shudders. The needle climbs like it is late for something.",
      "She steps on and the scale makes a sound you have started to recognize.",
    ] },
  // heavy: scale is straining
  { when: { stageMin: 6, stageMax: 7 },
    text: [
      "She steps onto the analog scale. The platform settles with a deep, announcing creak. The needle slams toward the far end of its range.",
      "She steps up. The scale takes a breath, holds it, then the needle swings past the midpoint and keeps going.",
      "She steps onto the scale and the old platform flexes beneath her, the dial lurching hard before the needle finds its long way across.",
      "The platform bows. The needle doesn't hesitate — it runs for the high numbers.",
      "She steps on and the scale complains loudly. She waits. The dial has work to do.",
    ] },
  // massive+: this scale is not designed for this
  { when: { stageMin: 8 },
    text: [
      "She steps onto the old analog scale. The platform protests immediately — a sharp creak followed by a low, loaded groan. The needle slams toward the end of its travel.",
      "She steps up onto the white scale. It accepts her the way old furniture accepts an overload: with sound, and reluctance, and a dial that has run out of numbers.",
      "She steps onto the scale. The platform bends. The needle swings hard to the right and does not stop moving where it should.",
      "The scale makes a noise you will remember. The needle pins itself to the far edge and keeps trying.",
      "She steps up and the platform visibly flexes. This scale was not built for this. It tries anyway.",
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
      "She knows where to stand. The platform takes her without complaint. The LCD ticks upward, digit by digit.",
      "She mounts the industrial scale like she has done it a dozen times. The display hums and starts building the number.",
    ] },
  // General big scale approach (lower stages here would be unusual but fallback)
  { when: {},
    text: [
      "She heads straight for the heavy-duty platform — she knows the routine by now. The LCD display blinks to life and starts counting.",
      "She crosses to the industrial scale without being asked. The steel platform takes her weight without comment. The display begins to climb.",
      "She steps up onto the heavy-duty platform. The display wakes and the number starts building, patient and precise.",
      "She goes to the big scale first. Smart. The analog dial gave up weeks ago.",
      "The industrial platform accepts her. The green numbers rise with mechanical patience.",
    ] },
]);

// ── weighIn.reaction — seeing the scale reading ────────────────
// Called after the scale animation settles. Varies by stage × corruption,
// with body-type-specific gestures where they add flavor.

registerModule("weighIn.reaction", [
  // body-type gestures — tie on stage + corruption, priority wins over generic
  { when: { bodyType: "pear", stageMin: 2, corruption: [0] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and glances back at her hips in the office mirror. "Huh." She tugs at her waistband. "Okay."`,
      (ctx) => `${ctx.subject.name} looks at the dial, then down at her thighs. She presses them together once, testing.`,
    ] },
  { when: { bodyType: "pear", stageMin: 4, corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off smiling and gives her hip a satisfied pat. "Worth it," she says.`,
      (ctx) => `${ctx.subject.name} looks at the number and runs her hands over her hips. "Good," she says warmly.`,
    ] },
  { when: { bodyType: "apple", stageMin: 2, corruption: [0] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and rests a hand on her belly. "It's probably just bloating," she says, unconvincingly.`,
      (ctx) => `${ctx.subject.name} looks at the dial and sucks in reflexively. The number does not change. She exhales.`,
    ] },
  { when: { bodyType: "apple", stageMin: 4, corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and rubs her belly with open satisfaction. "Getting there," she murmurs.`,
      (ctx) => `${ctx.subject.name} pats her gut affectionately. "Good week," she says, and means it.`,
    ] },
  { when: { bodyType: "athletic", stageMin: 2, corruption: [1] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and flexes reflexively, then stops. The muscle is still there. It is just buried now.`,
      (ctx) => `${ctx.subject.name} looks at the number like a stat sheet. "Huh," she says. "Personal best." She does not sound upset.`,
    ] },
  { when: { bodyType: "voluptuous", stageMin: 4, corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and presses her hands to her curves, checking the new weight with her palms. "Perfect," she breathes.`,
      (ctx) => `${ctx.subject.name} looks at the reading and smiles at her own reflection. "Filling out nicely," she says.`,
    ] },
  { when: { bodyType: "fertility_goddess", stageMin: 4, corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and sways her hips once, feeling the new weight settle. "More," she says softly, like a promise.`,
      (ctx) => `${ctx.subject.name} runs her hands over her thighs and smiles. "Abundant," she murmurs. She approves.`,
    ] },

  // thin + hesitant: notes the number, maybe a little puzzled, not yet troubled
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and glances back at the dial. "Huh." She tilts her head slightly, solving an arithmetic problem. "Okay. Sure."`,
      (ctx) => `${ctx.subject.name} checks the reading and nods once, already moving on. The number is small. She is not the kind of girl who worries about small numbers.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a beat, then back at you. "That seems right." She shrugs. "Nothing to report."`,
      (ctx) => `${ctx.subject.name} steps off and writes the number in her planner without comment.`,
      (ctx) => `${ctx.subject.name} glances at the dial. "Fine," she says. She was already thinking about lunch.`,
    ] },
  // thin + corrupted: pleased it is going up, or at minimum satisfied
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the dial and smiles, just slightly. "Moving in the right direction," she says, and she is not asking for confirmation.`,
      (ctx) => `${ctx.subject.name} steps off and checks the number with calm satisfaction. She does not elaborate. The number says enough.`,
      (ctx) => `${ctx.subject.name} glances at the reading and her expression warms. "Good," she says. "Keep it going."`,
      (ctx) => `${ctx.subject.name} nods at the dial like it told her something she wanted to hear.`,
      (ctx) => `${ctx.subject.name} "Up," she says quietly, pleased. She does not need you to agree.`,
    ] },
  // soft + hesitant: the gain is visible on the scale, harder to dismiss
  { when: { stageMin: 2, stageMax: 3, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the number for a beat too long. "Is that..." She stops, smooths her top over her middle. "I've just been eating a lot this semester."`,
      (ctx) => `${ctx.subject.name} steps off quietly. She tugs at her waistband. "It's fine," she says. "I'm fine." She might be telling herself.`,
      (ctx) => `${ctx.subject.name} stares at the dial with the focused look of someone counting backwards from ten. "It's probably the food here," she says. "Different from home."`,
      (ctx) => `${ctx.subject.name} blinks at the number. "Huh." She laughs, a little too quickly. "Well. Okay."`,
      (ctx) => `${ctx.subject.name} steps off and busies herself with her bag. The number hangs in the air anyway.`,
    ] },
  // soft + conflicted: mixed — aware something is changing, hasn't decided how to feel
  { when: { stageMin: 2, stageMax: 3, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} checks the reading and exhales slowly. "Every week," she mutters — less surprise than resignation.`,
      (ctx) => `${ctx.subject.name} steps off and looks at the dial. Then at herself. Then at the dial again. "Yeah," she says eventually. "Yeah, okay."`,
      (ctx) => `${ctx.subject.name} looks at the reading with the careful neutrality of someone who has decided not to have feelings about it right now.`,
      (ctx) => `${ctx.subject.name} "Predictable," she says. She does not sound relieved.`,
      (ctx) => `${ctx.subject.name} shrugs one shoulder. "Sure," she says. "That tracks."`,
    ] },
  // soft + broken: pleased about the gain, pats herself
  { when: { stageMin: 2, stageMax: 3, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} hops off the scale, looks at the dial, and grins. "Up again." She pats her stomach once, affectionately. "Good."`,
      (ctx) => `${ctx.subject.name} checks the number, satisfied. "I figured," she says. "I could feel it coming."`,
      (ctx) => `${ctx.subject.name} sees the reading and tilts her head with open approval. "Yeah," she says warmly. "That's what I wanted."`,
      (ctx) => `${ctx.subject.name} bounces once on her toes — still can, for now — and smiles at the dial.`,
      (ctx) => `${ctx.subject.name} "Thank you," she says, and she is not talking to you.`,
    ] },
  // plush + hesitant: the number is big enough to be undeniable, denial attempts anyway
  { when: { stageMin: 4, stageMax: 5, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the number just sits there. She stares at it. "It's the — it's the clothes," she says finally, and that is not a very convincing thing to say.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a long moment. "Okay." A breath. "Okay. I should really go for a run." She probably will not.`,
      (ctx) => `${ctx.subject.name} takes in the reading and squeezes her eyes shut briefly. "I didn't think it was that high." A small, unconvincing laugh. "I'll watch it."`,
      (ctx) => `${ctx.subject.name} steps off and folds her arms. "Water weight," she says. Nobody believes it.`,
      (ctx) => `${ctx.subject.name} stares at the dial. Her jaw tightens. She does not say anything for a long moment.`,
    ] },
  // plush + conflicted: resigned, starting to internalize the new reality
  { when: { stageMin: 4, stageMax: 5, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and looks at the reading without particular alarm. "I mean, yeah," she says. "I can feel that." She tugs at her waistband once and lets it go.`,
      (ctx) => `${ctx.subject.name} checks the number and lets out a short breath. "Is it bad that I expected that?" She doesn't quite wait for an answer.`,
      (ctx) => `${ctx.subject.name} looks at the dial and gives a small, settled nod. "It's only going one direction," she says, like she has made up her mind about something.`,
      (ctx) => `${ctx.subject.name} "Huh," she says. Not surprised. Not happy. Just informed.`,
      (ctx) => `${ctx.subject.name} steps off and rolls her shoulders. "Okay," she says. "Same time next week."`,
    ] },
  // plush + broken: approves of what she sees
  { when: { stageMin: 4, stageMax: 5, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off smiling. "I'm really filling out," she says — not a complaint. She presses her hands to her hips and laughs softly.`,
      (ctx) => `${ctx.subject.name} looks at the number the way someone reads a good review. She approves.`,
      (ctx) => `${ctx.subject.name} steps off and runs a hand along her side. "Nice," she says simply. She means it.`,
      (ctx) => `${ctx.subject.name} admires the dial for a moment. "Beautiful," she murmurs, and she is not being ironic.`,
      (ctx) => `${ctx.subject.name} "Yes," she says, to the number, to herself, to the week ahead.`,
    ] },
  // heavy + hesitant: genuinely distressed, the number is past rationalization
  { when: { stageMin: 6, stageMax: 7, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off the scale and the number lands on her like a door swinging open. She is quiet for a moment. "I didn't think it was that much," she says.`,
      (ctx) => `${ctx.subject.name} stares at the reading. Her jaw is set. "That's —" She stops. "I'll cut back," she says, to herself as much as you.`,
      (ctx) => `${ctx.subject.name} looks at the dial in silence. Then she looks at her hands. "I have to start saying no to things," she says, with the tone of someone who is not quite sure she will.`,
      (ctx) => `${ctx.subject.name} steps off and grips the back of the chair. "Wow," she says quietly. She does not move for a moment.`,
      (ctx) => `${ctx.subject.name} reads the number twice, like she is hoping it changed. It did not.`,
    ] },
  // heavy + conflicted: making peace with it, the numbers have gotten too large to fight
  { when: { stageMin: 6, stageMax: 7, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and lets out a slow breath through her nose. "Okay." She rubs the back of her neck. "It's just a number."`,
      (ctx) => `${ctx.subject.name} steps off and doesn't say anything for a beat. Then: "More than I thought." She doesn't sound devastated. She sounds like someone doing math.`,
      (ctx) => `${ctx.subject.name} checks the reading and tilts her head. "Yeah," she says. "I can live with that." It is more acceptance than celebration.`,
      (ctx) => `${ctx.subject.name} "Big number," she says. Flat. She is practicing not caring.`,
      (ctx) => `${ctx.subject.name} nods once, slowly. The fight has gone out of it. What remains is just the fact.`,
    ] },
  // heavy + broken: claims the weight, unbothered
  { when: { stageMin: 6, stageMax: 7, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off with the easy confidence of someone who made peace with the numbers a long time ago. "Good," she says simply.`,
      (ctx) => `${ctx.subject.name} checks the reading and nods, satisfied. She rolls her shoulders back. "Yeah," she says. "That tracks."`,
      (ctx) => `${ctx.subject.name} looks at the dial and smiles. "Every week," she says, and unlike some people who say that in this office, she sounds pleased about it.`,
      (ctx) => `${ctx.subject.name} "Beautiful," she says, looking at the number. She means it differently than she used to.`,
      (ctx) => `${ctx.subject.name} steps off and stretches, luxurious. The number suits her.`,
    ] },
  // massive + hesitant: the number is staggering, she doesn't have a frame for it
  { when: { stageMin: 8, stageMax: 9, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and stares at the reading. The number is enormous. She opens her mouth and closes it. "I need some air," she says finally.`,
      (ctx) => `${ctx.subject.name} looks at the number in silence. Her hands are at her sides. "Every single week," she says quietly, and she does not sound at peace with it.`,
      (ctx) => `${ctx.subject.name} stares at the reading until her breathing steadies. "It doesn't stop," she says softly. It is hard to tell if that is a question.`,
      (ctx) => `${ctx.subject.name} steps off and sits down heavily. She does not look at the dial again.`,
      (ctx) => `${ctx.subject.name} "That's not —" She stops. There is no sentence that helps.`,
    ] },
  // massive + conflicted: surrendered, finding a kind of dark humor in it
  { when: { stageMin: 8, stageMax: 9, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} takes in the number with a long exhale. "That's..." She tilts her head. "Well. I did eat everything." A short, reluctant laugh.`,
      (ctx) => `${ctx.subject.name} looks at the reading and then at you. "That's not stopping, is it," she says. It is not really a question.`,
      (ctx) => `${ctx.subject.name} checks the dial and is quiet for a moment. "You know," she says, "I've stopped being surprised." She sounds like that is its own kind of answer.`,
      (ctx) => `${ctx.subject.name} "At least it's consistent," she says, and laughs once, without humor.`,
      (ctx) => `${ctx.subject.name} shrugs, which is an impressive gesture at her size. "What are you gonna do," she says.`,
    ] },
  // massive + broken: triumphant, or matter-of-fact in a way that reads like pride
  { when: { stageMin: 8, stageMax: 9, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and nods, deep and satisfied. "Getting there," she murmurs, like she has a specific destination in mind and she is close.`,
      (ctx) => `${ctx.subject.name} looks at the reading and something in her expression settles. "I know," she says. "I can feel it."`,
      (ctx) => `${ctx.subject.name} looks at the number like something she built. She exhales slowly, pleased. "Good," she says.`,
      (ctx) => `${ctx.subject.name} "More," she says softly, to the dial, to the week ahead.`,
      (ctx) => `${ctx.subject.name} smiles at the enormous number. She has earned it.`,
    ] },
  // giant + hesitant: the number is beyond ordinary, she has no words
  { when: { stage: [10], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the scale just says what it says. She stares at it for a long time. There is nowhere for a number that size to hide.`,
      (ctx) => `${ctx.subject.name} looks at the reading. Then at herself. Then at the reading. "I don't..." She trails off. There is nothing to finish with.`,
      (ctx) => `${ctx.subject.name} steps off and goes very still. The number is beyond language.`,
    ] },
  // giant + any: settled into it
  { when: { stage: [10] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading. The number is, by any scale, extraordinary. She looks at you. "I know," is all she says.`,
      (ctx) => `${ctx.subject.name} checks the reading and breathes out slowly. Whatever she expected to feel, this is what she feels instead.`,
      (ctx) => `${ctx.subject.name} nods at the extraordinary number. She has made her peace with extraordinary.`,
      (ctx) => `${ctx.subject.name} "Still growing," she says, and it sounds like a status report and a boast.`,
    ] },
  // wildcard fallback
  { when: {}, text: [(ctx) => `${ctx.subject.name} steps off the scale and takes in the reading.`] },
]);

// ── Templates ─────────────────────────────────────────────────
// Arrival (bodyType × stage) + entrance mood (stage × corruption)
// + scale approach. Three beats instead of two.

export const WEIGH_IN_INTRO_NORMAL =
  "{weighIn.arrival} {weighIn.entrance} {weighIn.scaleApproach}";

export const WEIGH_IN_INTRO_BIG =
  "{weighIn.arrival} {weighIn.entrance} {weighIn.bigScaleApproach}";

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
