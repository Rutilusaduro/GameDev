// ═══════════════════════════════════════════════════════════════
// SCENE: WEIGH-IN — weekly check-in arrival and post-scale reaction
// Subject = the student being weighed.
// Stage keys match WEIGHT_STAGES in stages.js (Slight→Leviathan).
// Composed: arrival (bodyType × stage) + entrance (stage × corruption)
//           + scale approach + reaction.
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import '../modules.js';
import { getWeighInPersonalReply } from '../../gameData/weighInReplies.js';
import { appendCampusWeighIn } from './campusSoftening.js';

// ── weighIn.arrival — physical entrance, body-type flavored ───

registerModule("weighIn.arrival", [
  // pear
  { when: {"bodyType":"pear","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} slips through the door, hips swaying just enough that you notice.`,
      (ctx) => `${ctx.subject.name} arrives with a light step; her lower half moves with a rhythm her waist hasn't caught up to yet.`,
      (ctx) => `${ctx.subject.name} comes in and her hips brush the doorframe — barely, but she notices.`,
      (ctx) => `${ctx.subject.name} walks in quick and slight, pear-shaped even at this size.`,
    ] },
  { when: {"bodyType":"pear","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters with a new sway at the hips, softness settling low.`,
      (ctx) => `${ctx.subject.name} comes in; her thighs beginning to brush at the top.`,
      (ctx) => `${ctx.subject.name} arrives and her lower half has softened into a gentle curve.`,
      (ctx) => `${ctx.subject.name} walks in soft, hips starting to lead the way.`,
    ] },
  { when: {"bodyType":"pear","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} comes in and her thighs press together from mid-thigh down.`,
      (ctx) => `${ctx.subject.name} enters chubby at the hips, noticeably wider than last month.`,
      (ctx) => `${ctx.subject.name} arrives with a thickened gait, her pear shape rounding out.`,
      (ctx) => `${ctx.subject.name} walks in and her lower body is clearly where the weight went.`,
    ] },
  { when: {"bodyType":"pear","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump at the hips, rolling through the doorway with unhurried weight.`,
      (ctx) => `${ctx.subject.name} comes in; her thighs brush together with each step — you can hear it from the desk.`,
      (ctx) => `${ctx.subject.name} moves through the door and the lower half of her silhouette has become the main event.`,
      (ctx) => `${ctx.subject.name} walks in plump and pear-shaped, hips leading, shirts riding up over soft middle.`,
    ] },
  { when: {"bodyType":"pear","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} angles through the doorway with practiced ease — her heavy hips have outgrown casual entry.`,
      (ctx) => `${ctx.subject.name} comes in heavy at the hips, thighs crowding each other constantly.`,
      (ctx) => `${ctx.subject.name} enters with a slow rolling gait, lower body commanding the room.`,
      (ctx) => `${ctx.subject.name} walks in heavy, chairs creaking when she finally sits.`,
    ] },
  { when: {"bodyType":"pear","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} angles sideways through the doorway — practically, not dramatically.`,
      (ctx) => `${ctx.subject.name} enters with a slow rolling gait, soft mass of thigh and hip shifting with each step.`,
      (ctx) => `${ctx.subject.name} comes in and the room rearranges around her lower body.`,
      (ctx) => `${ctx.subject.name} walks in very fat at the hips, movement slow and deliberate.`,
    ] },
  { when: {"bodyType":"pear","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous at the hips — the doorway is a negotiation.`,
      (ctx) => `${ctx.subject.name} comes in and her lower body fills the frame before her face does.`,
      (ctx) => `${ctx.subject.name} walks in monumentally vast and pear-shaped, thighs a rolling presence.`,
      (ctx) => `${ctx.subject.name} arrives with hip-heavy mass that makes the floorboards register.`,
    ] },
  { when: {"bodyType":"pear","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name}'s lower body fills the doorway before the rest of her follows.`,
      (ctx) => `${ctx.subject.name} comes in immobile at the hips — thighs and bottom merged into warm mass the room organizes around.`,
      (ctx) => `${ctx.subject.name} arrives too vast at the hips to walk; movement is more a slow shift of endless soft flesh.`,
      (ctx) => `${ctx.subject.name} enters and the office rearranges itself around her lower half.`,
    ] },
  { when: {"bodyType":"pear","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name}'s lower body arrives before the rest of her — hips and thighs so heavy the room seems to tilt toward her warmth.`,
      (ctx) => `${ctx.subject.name} comes in pear-shaped and barely mobile, thighs pressing together their whole vast length, flesh settling in slow heavy rolls.`,
      (ctx) => `${ctx.subject.name} settles at the doorway — lower half spread wide and plush, hips anchoring her like poured warmth.`,
      (ctx) => `${ctx.subject.name} enters and the floor registers every inch; her pear curves jiggle once, then go still.`,
    ] },
  // apple
  { when: {"bodyType":"apple","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with one hand resting lightly on her middle.`,
      (ctx) => `${ctx.subject.name} arrives and her shirt rides up at the front — she tugs it down without looking.`,
      (ctx) => `${ctx.subject.name} comes in slight, belly not yet visible but the apple tendency is there.`,
      (ctx) => `${ctx.subject.name} enters slim, middle still trim.`,
    ] },
  { when: {"bodyType":"apple","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} comes in with a gentle rounding at the belly visible through her shirt.`,
      (ctx) => `${ctx.subject.name} arrives and rests a hand on her middle reflexively.`,
      (ctx) => `${ctx.subject.name} walks in soft, waistline gone quietly round.`,
      (ctx) => `${ctx.subject.name} enters with a small belly pooching forward — new, noticeable.`,
    ] },
  { when: {"bodyType":"apple","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} walks in chubby and belly-forward, waistband straining.`,
      (ctx) => `${ctx.subject.name} comes in and her middle rounds forward visibly.`,
      (ctx) => `${ctx.subject.name} arrives with a round belly pushing at every shirt.`,
      (ctx) => `${ctx.subject.name} enters apple-shaped, torso leading.`,
    ] },
  { when: {"bodyType":"apple","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump with her belly leading, round and forward.`,
      (ctx) => `${ctx.subject.name} comes in and her middle strains at her waistband — she exhales once, then commits.`,
      (ctx) => `${ctx.subject.name} moves through the door and her belly bounces once before settling.`,
      (ctx) => `${ctx.subject.name} walks in plump, a real belly rounding outward, breathing heavier on the stairs.`,
    ] },
  { when: {"bodyType":"apple","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, gut preceding her — round, forward, impossible to ignore.`,
      (ctx) => `${ctx.subject.name} comes in and her belly sways with the effort of walking.`,
      (ctx) => `${ctx.subject.name} rests a hand on her belly without thinking as she crosses the room.`,
      (ctx) => `${ctx.subject.name} walks in heavy, belly hanging forward, arms thick and jiggly.`,
    ] },
  { when: {"bodyType":"apple","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat and belly-first, the mass shifting with each slow step.`,
      (ctx) => `${ctx.subject.name} comes in and her gut rests on her thighs when she pauses.`,
      (ctx) => `${ctx.subject.name} walks in with a forward lean to balance the belly.`,
      (ctx) => `${ctx.subject.name} arrives very fat, belly cascading, can't see her feet past the middle.`,
    ] },
  { when: {"bodyType":"apple","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous — belly arriving long before she finishes coming through.`,
      (ctx) => `${ctx.subject.name} comes in and her forward mass makes the doorway feel narrow.`,
      (ctx) => `${ctx.subject.name} walks in with belly swaying on its own momentum, flesh lagging behind each step.`,
      (ctx) => `${ctx.subject.name} arrives with a gut vast enough to be the first thing you see.`,
    ] },
  { when: {"bodyType":"apple","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name}'s belly fills the doorway — the rest of her follows slowly.`,
      (ctx) => `${ctx.subject.name} comes in as forward mass become immobile architecture.`,
      (ctx) => `${ctx.subject.name} arrives immobile and apple-shaped, belly the warm center the room organizes around.`,
      (ctx) => `${ctx.subject.name} enters and the office is organized around her middle.`,
    ] },
  { when: {"bodyType":"apple","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name}'s belly arrives first — forward mass warm and endless, soft rolls cascading, the room's center of gravity.`,
      (ctx) => `${ctx.subject.name} comes in apple-shaped and barely mobile, gut spreading heavy and plush before she finishes settling.`,
      (ctx) => `${ctx.subject.name} exists at the doorway as warm abundance — middle a monument of yielding softness.`,
      (ctx) => `${ctx.subject.name} enters and the office seems to bend around her belly's slow, sinking weight.`,
    ] },
  // hourglass
  { when: {"bodyType":"hourglass","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with an easy sway, top and bottom moving in counterpoint.`,
      (ctx) => `${ctx.subject.name} arrives slim, hourglass line just visible.`,
      (ctx) => `${ctx.subject.name} comes in slight and balanced, curves present but light.`,
      (ctx) => `${ctx.subject.name} enters with the neat symmetry of a figure still slender.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, curves deepening evenly top and bottom.`,
      (ctx) => `${ctx.subject.name} arrives with bust and hips both quietly swelling.`,
      (ctx) => `${ctx.subject.name} walks in and her waist has softened, hourglass pouring fuller.`,
      (ctx) => `${ctx.subject.name} comes in with a gentle sway, figure going soft all over.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} comes in chubby and curved, bust and hips both thicker.`,
      (ctx) => `${ctx.subject.name} enters with dramatic curves thickening in both directions.`,
      (ctx) => `${ctx.subject.name} arrives rounder at cheek and curve alike.`,
      (ctx) => `${ctx.subject.name} walks in and clothes fit tighter across bust and hip.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, curves grown generous — chest and hips both fuller, waist softer.`,
      (ctx) => `${ctx.subject.name} comes in with a rolling sway, figure plush in both directions.`,
      (ctx) => `${ctx.subject.name} moves through the door and every curve has thickened.`,
      (ctx) => `${ctx.subject.name} walks in plump, thighs rubbing, shirts riding up over soft middle.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, hourglass scaled up — enormous curves above and below.`,
      (ctx) => `${ctx.subject.name} comes in heavy and curved, chest and hips commanding the room.`,
      (ctx) => `${ctx.subject.name} walks in with a waddle, figure overwhelming in both directions.`,
      (ctx) => `${ctx.subject.name} arrives and chairs complain before she sits.`,
    ] },
  { when: {"bodyType":"hourglass","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, hourglass past its original mold — vast curves above and below.`,
      (ctx) => `${ctx.subject.name} comes in very fat and curved, movement slow and deliberate.`,
      (ctx) => `${ctx.subject.name} walks in with rolling steps, figure a vast hourglass.`,
      (ctx) => `${ctx.subject.name} arrives needing wide doorways for bust and hip alike.`,
    ] },
  { when: {"bodyType":"hourglass","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, curves stacked on curves.`,
      (ctx) => `${ctx.subject.name} comes in overwhelmingly vast, bust and hips both staggering.`,
      (ctx) => `${ctx.subject.name} walks in slow, hourglass shape overwhelming every dimension.`,
      (ctx) => `${ctx.subject.name} arrives and the air shifts around her abundance.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters immobile — curves merged into one warm heavy mass.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, figure beyond ordinary proportion.`,
      (ctx) => `${ctx.subject.name} arrives and the room organizes around her curves.`,
      (ctx) => `${ctx.subject.name} fills the doorway with abundance before she reaches the desk.`,
    ] },
  { when: {"bodyType":"hourglass","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives immobile — curves stacked impossibly high and soft, bust and hips merged into endless warm rolls.`,
      (ctx) => `${ctx.subject.name} comes in hourglass-shaped and barely able to shift, abundance above and below spreading heavy and plush.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like a living warmth of endless soft curves.`,
      (ctx) => `${ctx.subject.name} enters and the office reorganizes around her weight, her heat, her impossible softness.`,
    ] },
  // athletic
  { when: {"bodyType":"athletic","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with the posture of someone who used to sprint everywhere.`,
      (ctx) => `${ctx.subject.name} arrives lean and trained, muscle visible under a slim frame.`,
      (ctx) => `${ctx.subject.name} comes in quick — slight, compact, restless energy.`,
      (ctx) => `${ctx.subject.name} enters with an athlete's easy stride on a slender body.`,
    ] },
  { when: {"bodyType":"athletic","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, muscle going quietly soft underneath.`,
      (ctx) => `${ctx.subject.name} arrives with a bounce in her step that is new.`,
      (ctx) => `${ctx.subject.name} walks in and her thighs brush together in a way they didn't used to.`,
      (ctx) => `${ctx.subject.name} comes in, athletic lines softened at the edges.`,
    ] },
  { when: {"bodyType":"athletic","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, power still visible under new padding.`,
      (ctx) => `${ctx.subject.name} comes in and her trained frame is visibly rounding.`,
      (ctx) => `${ctx.subject.name} arrives thicker, muscle buried under softness.`,
      (ctx) => `${ctx.subject.name} walks in with a thickened athlete's gait.`,
    ] },
  { when: {"bodyType":"athletic","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, power buried under comfortable thickness.`,
      (ctx) => `${ctx.subject.name} comes in and her strong frame has gone plush.`,
      (ctx) => `${ctx.subject.name} walks in with deliberate steps, athletic build wrapped in new weight.`,
      (ctx) => `${ctx.subject.name} arrives plump, breathing heavier on the stairs.`,
    ] },
  { when: {"bodyType":"athletic","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, bulk layered over old muscle.`,
      (ctx) => `${ctx.subject.name} comes in heavy and broad, still standing like a competitor.`,
      (ctx) => `${ctx.subject.name} walks in with a slight waddle, sheer mass replacing the sprint.`,
      (ctx) => `${ctx.subject.name} arrives and chairs creak — heavy, trained, vast.`,
    ] },
  { when: {"bodyType":"athletic","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, strength entombed in comfortable thickness.`,
      (ctx) => `${ctx.subject.name} comes in very fat and ponderous, athlete's posture in an enormous body.`,
      (ctx) => `${ctx.subject.name} walks in slow, bulk layered over the sprinter she used to be.`,
      (ctx) => `${ctx.subject.name} arrives with audible breath, movement deliberate.`,
    ] },
  { when: {"bodyType":"athletic","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, sheer mass where the athlete used to be.`,
      (ctx) => `${ctx.subject.name} comes in filling doorways with trained breadth gone vast.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous steps, power remembered in immensity.`,
      (ctx) => `${ctx.subject.name} arrives and the floor registers every inch.`,
    ] },
  { when: {"bodyType":"athletic","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile athletic mass — strength buried in warm flesh.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, trained frame lost under heavy yielding softness.`,
      (ctx) => `${ctx.subject.name} arrives and movement is more shift than walk.`,
      (ctx) => `${ctx.subject.name} fills the room with the mass of a former athlete grown vast.`,
    ] },
  { when: {"bodyType":"athletic","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives barely mobile — power remembered under endless warm softness, athletic breadth gone plush and heavy.`,
      (ctx) => `${ctx.subject.name} comes in as strength entombed in yielding flesh, broad shoulders buried in slow cascading rolls.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like a warm monument — trained frame lost under impossible softness.`,
      (ctx) => `${ctx.subject.name} enters and the room's center of gravity shifts to her vast, sinking weight.`,
    ] },
  // straight
  { when: {"bodyType":"straight","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with a narrow, straight frame.`,
      (ctx) => `${ctx.subject.name} arrives slight, taking up very little space.`,
      (ctx) => `${ctx.subject.name} comes in slim and even, clothes hanging loose.`,
      (ctx) => `${ctx.subject.name} enters angular and quick.`,
    ] },
  { when: {"bodyType":"straight","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, figure softening evenly at the edges.`,
      (ctx) => `${ctx.subject.name} arrives with uniform gentle rounding everywhere.`,
      (ctx) => `${ctx.subject.name} walks in and her clothes fit a little closer.`,
      (ctx) => `${ctx.subject.name} comes in, belly pooching slightly, cheeks fuller.`,
    ] },
  { when: {"bodyType":"straight","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, round all over without one feature leading.`,
      (ctx) => `${ctx.subject.name} comes in visibly thicker from shoulder to knee.`,
      (ctx) => `${ctx.subject.name} arrives with clothes noticeably tighter everywhere.`,
      (ctx) => `${ctx.subject.name} walks in evenly padded, face rounder.`,
    ] },
  { when: {"bodyType":"straight","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, even thickness settling everywhere at once.`,
      (ctx) => `${ctx.subject.name} comes in columnar-plush, weight carried uniformly.`,
      (ctx) => `${ctx.subject.name} moves through the door thickened evenly, like softness poured into her old shape.`,
      (ctx) => `${ctx.subject.name} walks in plump, thighs rubbing, belly rounding forward.`,
    ] },
  { when: {"bodyType":"straight","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, a columnar body grown weighty all over.`,
      (ctx) => `${ctx.subject.name} comes in heavy and even, chairs creaking.`,
      (ctx) => `${ctx.subject.name} walks in with a slow deliberate gait, waddling slightly.`,
      (ctx) => `${ctx.subject.name} arrives and fills more doorway than she used to.`,
    ] },
  { when: {"bodyType":"straight","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, uniform heaviness from shoulder to knee.`,
      (ctx) => `${ctx.subject.name} comes in very fat, a single continuous expanse of soft body.`,
      (ctx) => `${ctx.subject.name} walks in slow, even mass overwhelming in every direction.`,
      (ctx) => `${ctx.subject.name} arrives needing space in every dimension.`,
    ] },
  { when: {"bodyType":"straight","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, uniform enormity from shoulder to knee.`,
      (ctx) => `${ctx.subject.name} comes in monumentally vast and even, heavy in every measurement.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous even steps.`,
      (ctx) => `${ctx.subject.name} arrives and the office feels smaller.`,
    ] },
  { when: {"bodyType":"straight","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile even mass — uniform abundance, warm and spreading.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, the room organized around her.`,
      (ctx) => `${ctx.subject.name} arrives and movement is barely a shift.`,
      (ctx) => `${ctx.subject.name} fills the space with warm continuous flesh.`,
    ] },
  { when: {"bodyType":"straight","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives as even abundance impossibly vast — softness spreading warm and heavy in every direction.`,
      (ctx) => `${ctx.subject.name} comes in columnar and barely mobile, flesh filling the doorway with plush yielding weight.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like warm endless softness pressed outward on all sides.`,
      (ctx) => `${ctx.subject.name} enters and the office becomes organized around her sinking, overwhelming mass.`,
    ] },
  // rotund
  { when: {"bodyType":"rotund","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with a hint of roundness at the edges.`,
      (ctx) => `${ctx.subject.name} arrives slim but softly potential.`,
      (ctx) => `${ctx.subject.name} comes in slight, not yet spherical.`,
      (ctx) => `${ctx.subject.name} enters with a trim frame and round energy.`,
    ] },
  { when: {"bodyType":"rotund","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} walks in with a soft doughy middle that bounces once when she stops.`,
      (ctx) => `${ctx.subject.name} arrives rounder than she was — proofing like bread.`,
      (ctx) => `${ctx.subject.name} comes in soft and gently spherical at the edges.`,
      (ctx) => `${ctx.subject.name} enters with even roundness settling in.`,
    ] },
  { when: {"bodyType":"rotund","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby and round from every angle.`,
      (ctx) => `${ctx.subject.name} comes in with a doughy middle pushing forward.`,
      (ctx) => `${ctx.subject.name} arrives visibly rotund, clothes tighter everywhere.`,
      (ctx) => `${ctx.subject.name} walks in and jiggles once when she sets her bag down.`,
    ] },
  { when: {"bodyType":"rotund","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump and rotund from every angle, middle a soft dome.`,
      (ctx) => `${ctx.subject.name} comes in plump, round belly straining her shirt.`,
      (ctx) => `${ctx.subject.name} moves through the door with a rolling gait.`,
      (ctx) => `${ctx.subject.name} walks in plump and spherical, thighs rubbing.`,
    ] },
  { when: {"bodyType":"rotund","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy and round, body rolling when she moves.`,
      (ctx) => `${ctx.subject.name} comes in heavy, gut and hips one continuous curve.`,
      (ctx) => `${ctx.subject.name} walks in with a waddle, rotund thickness everywhere.`,
      (ctx) => `${ctx.subject.name} arrives and chairs protest.`,
    ] },
  { when: {"bodyType":"rotund","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, a heavy round mass shifting with each step.`,
      (ctx) => `${ctx.subject.name} comes in very fat and ballooning, mostly belly and flank.`,
      (ctx) => `${ctx.subject.name} walks in slow, rotund abundance in motion.`,
      (ctx) => `${ctx.subject.name} arrives with her own gravity.`,
    ] },
  { when: {"bodyType":"rotund","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters overwhelmingly round, soft mass spilling in every direction.`,
      (ctx) => `${ctx.subject.name} comes in spherical abundance, flesh wobbling as she settles.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous rolling steps.`,
      (ctx) => `${ctx.subject.name} arrives vast and warm.`,
    ] },
  { when: {"bodyType":"rotund","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile round warmth — shape remembered only as a circle.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, soft globe of flesh filling the frame.`,
      (ctx) => `${ctx.subject.name} arrives and the room holds still around her.`,
      (ctx) => `${ctx.subject.name} fills the doorway with vast round softness.`,
    ] },
  { when: {"bodyType":"rotund","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives as spherical warmth — roundness so soft the room holds still around her.`,
      (ctx) => `${ctx.subject.name} comes in rotund and barely mobile, a vast plush globe anchoring the space.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like endless round abundance — belly and flanks merging in heavy rolls.`,
      (ctx) => `${ctx.subject.name} enters and the office settles around her warm, sinking circumference.`,
    ] },
  // voluptuous
  { when: {"bodyType":"voluptuous","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in and her curves are present even at this size.`,
      (ctx) => `${ctx.subject.name} arrives slim but voluptuous-lined.`,
      (ctx) => `${ctx.subject.name} comes in slight, bust and hips already drawing the eye.`,
      (ctx) => `${ctx.subject.name} enters with a sway half posture, half promise.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, breasts and hips deepening together.`,
      (ctx) => `${ctx.subject.name} arrives with curves quietly swelling.`,
      (ctx) => `${ctx.subject.name} walks in and her figure has picked up plushness.`,
      (ctx) => `${ctx.subject.name} comes in soft and curved, seams sitting closer.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, curves straining every seam.`,
      (ctx) => `${ctx.subject.name} comes in with bust fuller and hips wider.`,
      (ctx) => `${ctx.subject.name} arrives voluptuous and visibly thicker.`,
      (ctx) => `${ctx.subject.name} walks in and adjusts her strap once.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, heavy breasts and wide hips grown plush.`,
      (ctx) => `${ctx.subject.name} comes in plump, curves stacked and soft.`,
      (ctx) => `${ctx.subject.name} moves through the door voluptuous and unapologetic.`,
      (ctx) => `${ctx.subject.name} walks in plump, chest bouncing once, thighs rubbing.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, enormous breasts on a softer belly.`,
      (ctx) => `${ctx.subject.name} comes in heavy and curved, filling every chair.`,
      (ctx) => `${ctx.subject.name} walks in with a waddle, curves leading every movement.`,
      (ctx) => `${ctx.subject.name} arrives and the room feels fuller.`,
    ] },
  { when: {"bodyType":"voluptuous","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, breasts and belly grown vast.`,
      (ctx) => `${ctx.subject.name} comes in very fat, curves past any ordinary scale.`,
      (ctx) => `${ctx.subject.name} walks in slow, voluptuous excess in motion.`,
      (ctx) => `${ctx.subject.name} arrives needing space for bust and hip alike.`,
    ] },
  { when: {"bodyType":"voluptuous","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, voluptuous abundance staggering.`,
      (ctx) => `${ctx.subject.name} comes in overwhelmingly curved, flesh beyond ordinary description.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous sway.`,
      (ctx) => `${ctx.subject.name} arrives and doorways feel narrow.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile voluptuous abundance.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, curves merged into warm mass.`,
      (ctx) => `${ctx.subject.name} arrives and the room organizes around her.`,
      (ctx) => `${ctx.subject.name} fills the space with soft curved abundance.`,
    ] },
  { when: {"bodyType":"voluptuous","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives voluptuous and impossibly vast — curves endless, warm, pressing outward in heavy rolls.`,
      (ctx) => `${ctx.subject.name} comes in as breasts and belly merged into yielding abundance, flesh wobbling once as she settles.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like a monument of plush excess — soft, heavy, desirable.`,
      (ctx) => `${ctx.subject.name} enters and the room's center of gravity becomes her cascading warmth.`,
    ] },
  // mom_bod
  { when: {"bodyType":"mom_bod","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with the comfortable energy of someone who always has snacks in her bag.`,
      (ctx) => `${ctx.subject.name} arrives slim and practical.`,
      (ctx) => `${ctx.subject.name} comes in slight, maternal warmth not yet in her hips.`,
      (ctx) => `${ctx.subject.name} enters with an easy hello.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} arrives warm and practical, gentle softness at the waist.`,
      (ctx) => `${ctx.subject.name} comes in soft, hips and middle going lived-in.`,
      (ctx) => `${ctx.subject.name} walks in with nurturing energy and a softer middle.`,
      (ctx) => `${ctx.subject.name} enters and smells faintly like comfort food.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, mom-soft spread becoming obvious.`,
      (ctx) => `${ctx.subject.name} comes in rounder, waistband working harder.`,
      (ctx) => `${ctx.subject.name} arrives with warm thickness at hip and thigh.`,
      (ctx) => `${ctx.subject.name} walks in chubby and unhurried.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump with a soft mom-bod spread, warm at the middle.`,
      (ctx) => `${ctx.subject.name} comes in plump, waistband giving up — she hitches her pants once.`,
      (ctx) => `${ctx.subject.name} moves through the door built for second helpings.`,
      (ctx) => `${ctx.subject.name} walks in plump, thighs rubbing, smile easy.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, maternal softness from chest to thigh.`,
      (ctx) => `${ctx.subject.name} comes in heavy with a comfortable waddle.`,
      (ctx) => `${ctx.subject.name} walks in and chairs creak.`,
      (ctx) => `${ctx.subject.name} arrives warm, heavy, and unbothered.`,
    ] },
  { when: {"bodyType":"mom_bod","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, a vast pillowy mom-bod in motion.`,
      (ctx) => `${ctx.subject.name} comes in very fat, soft abundance everywhere familiar.`,
      (ctx) => `${ctx.subject.name} walks in slow, maternal mass needing space.`,
      (ctx) => `${ctx.subject.name} arrives and the couch groans in advance.`,
    ] },
  { when: {"bodyType":"mom_bod","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, mom-bod dominating furniture.`,
      (ctx) => `${ctx.subject.name} comes in monumentally vast and pillowy.`,
      (ctx) => `${ctx.subject.name} walks in with audible effort.`,
      (ctx) => `${ctx.subject.name} arrives vast and warm.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile maternal abundance.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, the room organized around her comfort.`,
      (ctx) => `${ctx.subject.name} arrives and movement is a slow shift.`,
      (ctx) => `${ctx.subject.name} fills the office with warm permanent softness.`,
    ] },
  { when: {"bodyType":"mom_bod","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives as maternal softness — the room's warm center, pillowy abundance spilling in heavy rolls.`,
      (ctx) => `${ctx.subject.name} comes in nurturing and barely mobile, waist and hips past any couch, past any ordinary room.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like endless warm comfort made flesh.`,
      (ctx) => `${ctx.subject.name} enters and the office reorganizes around her yielding, indulgent abundance.`,
    ] },
  // fertility_goddess
  { when: {"bodyType":"fertility_goddess","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in with wide hips on a still-slender frame.`,
      (ctx) => `${ctx.subject.name} arrives slight but fertile-lined.`,
      (ctx) => `${ctx.subject.name} comes in with a sway that says abundance early.`,
      (ctx) => `${ctx.subject.name} enters slim, goddess curves barely visible.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, breasts and hips ripening together.`,
      (ctx) => `${ctx.subject.name} arrives with goddess-softness settling in.`,
      (ctx) => `${ctx.subject.name} walks in and her curves deepen evenly.`,
      (ctx) => `${ctx.subject.name} comes in soft and ripe-looking.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, thunder thighs starting to brush.`,
      (ctx) => `${ctx.subject.name} comes in with fertile curves grown obvious.`,
      (ctx) => `${ctx.subject.name} arrives rounder, hips wider, bust heavier.`,
      (ctx) => `${ctx.subject.name} walks in chubby and abundant.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, heavy breasts and thunder thighs grown plush.`,
      (ctx) => `${ctx.subject.name} comes in plump, hips brushing the doorframe without apology.`,
      (ctx) => `${ctx.subject.name} moves through the door goddess-soft and commanding.`,
      (ctx) => `${ctx.subject.name} walks in plump, curves overflowing.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, breasts and hips grown heavy and commanding.`,
      (ctx) => `${ctx.subject.name} comes in heavy and fertile, a rolling gait.`,
      (ctx) => `${ctx.subject.name} walks in and the floor registers her.`,
      (ctx) => `${ctx.subject.name} arrives warm, vast at bust and hip.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, fertility made flesh at vast scale.`,
      (ctx) => `${ctx.subject.name} comes in impossibly heavy, curves overwhelming in proportion.`,
      (ctx) => `${ctx.subject.name} walks in slow, abundant and deliberate.`,
      (ctx) => `${ctx.subject.name} arrives needing wide paths.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, a monument to abundance.`,
      (ctx) => `${ctx.subject.name} comes in overwhelmingly ripe and warm.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous goddess steps.`,
      (ctx) => `${ctx.subject.name} arrives and the air feels warmer.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile fertile warmth — curves become permanent landscape.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, curves spreading heavy and plush.`,
      (ctx) => `${ctx.subject.name} arrives and movement is barely a shift.`,
      (ctx) => `${ctx.subject.name} fills the room with soft warm mass.`,
    ] },
  { when: {"bodyType":"fertility_goddess","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives ripe and impossibly vast — breasts, belly, and hips in endless soft rolls, barely mobile.`,
      (ctx) => `${ctx.subject.name} comes in abundant and warm, curves spreading heavy and indulgent past human measure.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like fertility made flesh — plush, overwhelming, desirable.`,
      (ctx) => `${ctx.subject.name} enters and warmth cascades through the office around her sinking curves.`,
    ] },
  // topHeavy
  { when: {"bodyType":"topHeavy","stageMax":1},
    text: [
      (ctx) => `${ctx.subject.name} walks in and her chest has grown ahead of everything else.`,
      (ctx) => `${ctx.subject.name} arrives slim with a fuller bust.`,
      (ctx) => `${ctx.subject.name} comes in slight, top-heavy tendency visible.`,
      (ctx) => `${ctx.subject.name} enters and adjusts her strap once, unconsciously.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[2]},
    text: [
      (ctx) => `${ctx.subject.name} enters soft, breasts growing ahead of her middle.`,
      (ctx) => `${ctx.subject.name} arrives top-heavy softness settling in.`,
      (ctx) => `${ctx.subject.name} walks in and leans back slightly to balance.`,
      (ctx) => `${ctx.subject.name} comes in soft, chest drawing the eye first.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[3]},
    text: [
      (ctx) => `${ctx.subject.name} enters chubby, bust straining shirts while hips stay modest.`,
      (ctx) => `${ctx.subject.name} comes in with top-heavy contrast grown clear.`,
      (ctx) => `${ctx.subject.name} arrives chubby at the chest, narrower below.`,
      (ctx) => `${ctx.subject.name} walks in and her chest bounces once.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[4]},
    text: [
      (ctx) => `${ctx.subject.name} enters plump, heavy breasts leading a still-narrower lower half.`,
      (ctx) => `${ctx.subject.name} comes in plump, chest grown plush while hips play catch-up.`,
      (ctx) => `${ctx.subject.name} moves through the door top-heavy and soft.`,
      (ctx) => `${ctx.subject.name} walks in plump, tipping forward slightly to balance.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[5]},
    text: [
      (ctx) => `${ctx.subject.name} enters heavy, enormous breasts on a softer middle.`,
      (ctx) => `${ctx.subject.name} comes in heavy and top-heavy, waddling carefully.`,
      (ctx) => `${ctx.subject.name} walks in with chest leading every step.`,
      (ctx) => `${ctx.subject.name} arrives and chairs creak.`,
    ] },
  { when: {"bodyType":"topHeavy","stageMin":6,"stageMax":7},
    text: [
      (ctx) => `${ctx.subject.name} enters fat, vast chest on a very fat frame.`,
      (ctx) => `${ctx.subject.name} comes in very fat, top half dominating.`,
      (ctx) => `${ctx.subject.name} walks in slow, balancing enormous breasts.`,
      (ctx) => `${ctx.subject.name} arrives with upper body overwhelming.`,
    ] },
  { when: {"bodyType":"topHeavy","stageMin":8,"stageMax":9},
    text: [
      (ctx) => `${ctx.subject.name} enters enormous, breasts vast enough to dominate her silhouette.`,
      (ctx) => `${ctx.subject.name} comes in monumentally vast and top-heavy.`,
      (ctx) => `${ctx.subject.name} walks in with ponderous care.`,
      (ctx) => `${ctx.subject.name} arrives and doorways feel low.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[10]},
    text: [
      (ctx) => `${ctx.subject.name} enters as immobile top-heavy abundance.`,
      (ctx) => `${ctx.subject.name} comes in too vast to walk, upper body outgrowing everything.`,
      (ctx) => `${ctx.subject.name} arrives and movement is a slow settle.`,
      (ctx) => `${ctx.subject.name} fills the room with vast chest and soft mass.`,
    ] },
  { when: {"bodyType":"topHeavy","stage":[11]},
    text: [
      (ctx) => `${ctx.subject.name} arrives top-heavy and impossibly vast — chest merged into endless soft mass, heavy and yielding.`,
      (ctx) => `${ctx.subject.name} comes in with upper body outgrowing everything below, breasts resting on cascading belly rolls.`,
      (ctx) => `${ctx.subject.name} exists at the doorway like plush abundance above the waist — warm, wobbling, overwhelming.`,
      (ctx) => `${ctx.subject.name} enters and the office's center of gravity tips toward her sinking upper softness.`,
    ] },
  // fallbacks by stage band
  { when: { stageMax: 1 }, text: [(ctx) => `${ctx.subject.name} appears at the office door, slim and unhurried.`, (ctx) => `${ctx.subject.name} slips in quietly, a narrow figure against the doorframe.`, (ctx) => `${ctx.subject.name} arrives slight, taking up very little space.`] },
  { when: { stage: [2] }, text: [(ctx) => `${ctx.subject.name} comes through the door with a softness that wasn't there at the start of semester.`, (ctx) => `${ctx.subject.name} enters soft, clothes fitting a little closer.`, (ctx) => `${ctx.subject.name} arrives with gentle new curves settling in.`] },
  { when: { stage: [3] }, text: [(ctx) => `${ctx.subject.name} enters chubby, visibly rounder than last month.`, (ctx) => `${ctx.subject.name} comes in and her clothes fit differently — tighter, more honest.`, (ctx) => `${ctx.subject.name} arrives with a thickened, softer gait.`] },
  { when: { stage: [4] }, text: [(ctx) => `${ctx.subject.name} enters plump, belly rounding forward, thighs rubbing together.`, (ctx) => `${ctx.subject.name} comes in plump and unhurried, breathing a little heavier on the stairs.`, (ctx) => `${ctx.subject.name} arrives with a real belly now, shirts riding up.`] },
  { when: { stage: [5] }, text: [(ctx) => `${ctx.subject.name} enters heavy, belly hanging forward, chairs creaking in advance.`, (ctx) => `${ctx.subject.name} comes in heavy and deliberate, floorboards registering her.`, (ctx) => `${ctx.subject.name} arrives with a slight waddle now.`] },
  { when: { stageMin: 6, stageMax: 7 }, text: [(ctx) => `${ctx.subject.name} enters fat, movement slow and rolling.`, (ctx) => `${ctx.subject.name} comes in very fat, the office feeling smaller.`, (ctx) => `${ctx.subject.name} arrives needing space and time to cross the room.`] },
  { when: { stageMin: 8, stageMax: 9 }, text: [(ctx) => `${ctx.subject.name} enters vast enough that the doorway is a negotiation.`, (ctx) => `${ctx.subject.name} comes in unhurried, flesh settling heavy with each inch.`, (ctx) => `${ctx.subject.name} arrives and the air shifts around her mass.`] },
  { when: { stage: [10] }, text: [(ctx) => `${ctx.subject.name} enters as immobile abundance — the room organizes around her.`, (ctx) => `${ctx.subject.name} comes in too vast to walk, movement more shift than step.`, (ctx) => `${ctx.subject.name} arrives and fills the space before reaching the desk.`] },
  { when: { stage: [11] }, text: [
    (ctx) => `${ctx.subject.name} arrives impossibly vast — the room's center of gravity shifts before she finishes settling.`,
    (ctx) => `${ctx.subject.name} comes in warm and heavy; movement is nearly impossible, more a slow rearrangement of endless soft flesh.`,
    (ctx) => `${ctx.subject.name} enters and the office becomes organized around her warmth, her weight, her overwhelming softness.`,
    (ctx) => `${ctx.subject.name} exists at the doorway like a living monument of fat — ancient, powerful, indulgent in sheer size.`,
  ] },
  { when: {}, text: [(ctx) => `${ctx.subject.name} appears at the office door for her weekly check-in.`] },
]);

// ── weighIn.entrance — emotional beat on arrival ───────────────
// Varies by stage × corruption. Returns 1–2 sentences.

registerModule("weighIn.entrance", [
  // Slight/Slim + uncorrupted: polite, contained, not thinking about it
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `She sets her bag beside the desk and waits quietly for you to get started.`,
      (ctx) => `She takes up her usual corner and glances at the scale only once.`,
      (ctx) => `There is a composed stillness to her — someone who has already rehearsed being fine about this.`,
      (ctx) => `She says hello, checks the time, and looks at you like this is just another appointment.`,
      (ctx) => `She folds her hands in her lap and waits. The scale is not the first thing on her mind.`,
      (ctx) => `She slips into her usual chair and waits, slight and composed.`,
    ] },
  // Slight/Slim + corrupted: easy, no nerves, maybe even eager
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `She drops her bag and looks at the scale like it is the most interesting thing in the room.`,
      (ctx) => `There is no ceremony to it — she is already making her way toward the scale before you gesture.`,
      (ctx) => `She arrives easy, relaxed, barely pausing at the door.`,
      (ctx) => `"Ready when you are," she says, and she means the scale, not the paperwork.`,
      (ctx) => `She breezes in with the energy of someone who has stopped dreading these appointments.`,
      (ctx) => `She is already oriented toward the scale before she finishes saying hello.`,
    ] },
  // Soft + uncorrupted: gentle softness new enough to notice
  { when: { stage: [2], corruption: [0] },
    text: [
      (ctx) => `She tugs at her hem before she sits, the careful brightness of someone who has been thinking about this all week.`,
      (ctx) => `She sets her things down slowly and doesn't quite meet your eye right away.`,
      (ctx) => `She says a cheerful hello that is doing most of the emotional work.`,
      (ctx) => `"Hi," she says, a beat too bright. She smooths her top over her middle without looking at it.`,
      (ctx) => `She picks at a loose thread on her sleeve. The appointment is on her calendar and also in the back of her mind all week.`,
      (ctx) => `She sits and crosses her ankles, belly pooching slightly — new, soft, not yet named.`,
    ] },
  { when: { stage: [2], corruption: [1] },
    text: [
      (ctx) => `She makes brief, steady eye contact — the look of someone waiting to see which version of this appointment it will be.`,
      (ctx) => `She tosses her bag on the chair and rolls her shoulders once. Not tense exactly. Just ready.`,
      (ctx) => `She glances at the scale, then at you. "All right," she says, and that is all.`,
      (ctx) => `"Same time next week, same deal," she says, like she is trying it on for size.`,
      (ctx) => `She exhales once through her nose. Not dread. Not excitement. Something in between.`,
      (ctx) => `She smooths her top over a soft middle and waits.`,
    ] },
  { when: { stage: [2], corruption: [2] },
    text: [
      (ctx) => `She is already looking at the scale when she walks in. She drops her bag and starts toward it.`,
      (ctx) => `She comes in like she owns the appointment, moving toward the scale before you finish your greeting.`,
      (ctx) => `She arrives easy and makes a beeline for the scale. She has been looking forward to this.`,
      (ctx) => `"Let's see it," she says, and she is already halfway there.`,
      (ctx) => `No preamble. She wants the number.`,
      (ctx) => `She pats her softened middle once, affectionately, on the way.`,
    ] },
  // Chubby + uncorrupted: visibly rounded, harder to dismiss
  { when: { stage: [3], corruption: [0] },
    text: [
      (ctx) => `She comes in with a bright hello that does not quite reach her eyes. Her clothes are tighter than they were.`,
      (ctx) => `She tugs at her waistband once before she sits. Reflex.`,
      (ctx) => `She glances at the scale and then away, like it might be rude to stare.`,
      (ctx) => `"Ready," she says, a little too quickly.`,
      (ctx) => `She picks at her sleeve and pretends this is routine.`,
      (ctx) => `She sits carefully, thighs pressing together, face rounder than last month.`,
    ] },
  { when: { stage: [3], corruption: [1] },
    text: [
      (ctx) => `She sets her bag down and nods once. No face at the scale. That is progress.`,
      (ctx) => `"Another week," she says. Flat. Familiar.`,
      (ctx) => `She looks at the scale without flinching. That is new.`,
      (ctx) => `She rolls her shoulders and waits, chubby and unhurried.`,
      (ctx) => `"Let's do it," she says, like clocking in.`,
      (ctx) => `She does not apologize for the space she takes up. She does not celebrate it either.`,
    ] },
  { when: { stage: [3], corruption: [2] },
    text: [
      (ctx) => `She walks in already smiling at the scale.`,
      (ctx) => `She drops her bag and heads for the platform without being asked.`,
      (ctx) => `"Been thinking about this all week," she says, warm and easy.`,
      (ctx) => `She pats her chubby middle once, affectionately.`,
      (ctx) => `No preamble. She wants the number.`,
      (ctx) => `She takes up her space without apology.`,
    ] },
  // Plump + uncorrupted: real belly, denial still trying
  { when: { stage: [4], corruption: [0] },
    text: [
      (ctx) => `She steps through and pretends not to notice that she fills the doorway a little more than she used to.`,
      (ctx) => `She comes in with a bright "hey" and moves to take up as little space as possible. She does not entirely succeed.`,
      (ctx) => `She glances down at herself once — quick, reflexive — before looking up. "Ready," she says.`,
      (ctx) => `She laughs a little too quickly at something that isn't funny. Nerves, maybe. Or denial.`,
      (ctx) => `She sits carefully, like the chair might have opinions about her.`,
      (ctx) => `She tugs her shirt down over a plump belly. It rides back up.`,
    ] },
  { when: { stage: [4], corruption: [1] },
    text: [
      (ctx) => `She sets her things down and waits. She is past the stage of making a face at the scale.`,
      (ctx) => `She moves with the easy, practiced manner of someone who has stopped arguing with her own silhouette.`,
      (ctx) => `She nods at you. "Let's do it," she says, like a woman clocking into a job she has made her peace with.`,
      (ctx) => `"Another week, another number," she says. Flat. Not hostile.`,
      (ctx) => `She doesn't flinch when she looks at the scale. That is new.`,
      (ctx) => `She breathes a little heavier after the stairs. She does not comment on it.`,
    ] },
  { when: { stage: [4], corruption: [2] },
    text: [
      (ctx) => `She walks in with a faint smile, drops her bag without breaking stride, and heads for the scale.`,
      (ctx) => `She takes up the space she takes up, unbothered by it.`,
      (ctx) => `"Been looking forward to this one," she says, and the way she says it leaves no room for doubt.`,
      (ctx) => `She pats her plump hip once, affectionately, on the way to the scale.`,
      (ctx) => `She looks at you like you are about to give her good news. In a sense, you are.`,
      (ctx) => `She is plump and pleased and not hiding either.`,
    ] },
  // Heavy + uncorrupted: belly hangs forward, chairs creak
  { when: { stage: [5], corruption: [0] },
    text: [
      (ctx) => `She comes in heavy and a little winded from the hall. She does not mention it.`,
      (ctx) => `She fills the doorway more than she used to. She looks away from the scale first.`,
      (ctx) => `She sets her bag down and waits, arms slightly away from her sides.`,
      (ctx) => `She says hello quietly. The office feels smaller.`,
      (ctx) => `She sits and the chair creaks. She pretends not to hear it.`,
      (ctx) => `She gathers herself before standing again.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      (ctx) => `Her presence arrives a moment before she does. She sets her bag down and nods once.`,
      (ctx) => `She moves with the unhurried certainty of someone too heavy to rush.`,
      (ctx) => `She looks at the scale and back at you. "Okay," she says.`,
      (ctx) => `"Let's get it over with," she says, but she doesn't sound like she wants it over with.`,
      (ctx) => `She leans against the doorframe for a second, catching her breath.`,
      (ctx) => `She waddles slightly when she walks. She does not apologize.`,
    ] },
  { when: { stage: [5], corruption: [2] },
    text: [
      (ctx) => `She walks in heavy and warm, smiling at the scale like an old friend.`,
      (ctx) => `She takes up the space she takes up, entirely comfortable.`,
      (ctx) => `"Good morning," she says. "Let's see where I'm at."`,
      (ctx) => `She pats her heavy middle once, affectionately.`,
      (ctx) => `She heads for the scale without breaking stride.`,
      (ctx) => `The chair creaks when she passes it. She sounds pleased.`,
    ] },
  // Fat + uncorrupted: rolling waddle, self-conscious mass
  { when: { stage: [6], corruption: [0] },
    text: [
      (ctx) => `The floorboards register her. She does not meet your eye right away.`,
      (ctx) => `She fills the room. She looks like she is trying very hard not to acknowledge that.`,
      (ctx) => `She sets her bag down and stares at the wall behind you.`,
      (ctx) => `She says hello quietly. The office feels smaller.`,
      (ctx) => `She waits by the door a moment, gathering herself, before committing to the walk to the scale.`,
      (ctx) => `She waddles in with a rolling gait, belly past her hips, breathing audible.`,
    ] },
  { when: { stage: [6], corruption: [1] },
    text: [
      (ctx) => `She moves with slow, weighty purpose. She does not apologize for it.`,
      (ctx) => `She looks at the scale and back at you. "Okay," she says.`,
      (ctx) => `She leans against the doorframe, catching her breath from the hall.`,
      (ctx) => `"Let's get it over with," she says, but she doesn't sound like she wants it over with.`,
      (ctx) => `She nods once, fat and unhurried, and starts toward the platform.`,
      (ctx) => `Chair armrests will be a tight squeeze. She knows it.`,
    ] },
  { when: { stage: [6], corruption: [2] },
    text: [
      (ctx) => `The room reorganizes itself around her without anyone asking it to.`,
      (ctx) => `She walks in like the room was designed for her — she just needed time to grow into it.`,
      (ctx) => `She is entirely comfortable with the space she takes up.`,
      (ctx) => `"Good morning," she says warmly. "Let's see where I'm at."`,
      (ctx) => `She smiles at the scale like it is an old friend.`,
      (ctx) => `She waddles with easy confidence, fat and pleased.`,
    ] },
  // Very Fat + uncorrupted: belly cascades, needs wide doorways
  { when: { stage: [7], corruption: [0] },
    text: [
      (ctx) => `She pauses in the doorway, assessing the path to the scale.`,
      (ctx) => `She comes in very fat and deliberate, belly cascading, movement slow.`,
      (ctx) => `She cannot see her feet past her middle. She does not comment.`,
      (ctx) => `She says hello quietly and waits for you to indicate where to stand.`,
      (ctx) => `She grips the doorframe once, then commits.`,
      (ctx) => `The office feels architectural around her.`,
    ] },
  { when: { stage: [7], corruption: [1] },
    text: [
      (ctx) => `She enters with the unhurried certainty of someone who needs wide doorways.`,
      (ctx) => `She sets her bag down and nods once. No drama. Just mass.`,
      (ctx) => `"Okay," she says, looking at the scale. "Let's do it."`,
      (ctx) => `She catches her breath from the hall and does not apologize.`,
      (ctx) => `She moves with care. Every step placed.`,
      (ctx) => `Vast, very familiar with the routine.`,
    ] },
  { when: { stage: [7], corruption: [2] },
    text: [
      (ctx) => `She comes in vast and warm, smiling before she finishes crossing the room.`,
      (ctx) => `She owns every pound and the space it requires.`,
      (ctx) => `"Let's see it," she says, pleased.`,
      (ctx) => `She waddles with slow, deliberate satisfaction.`,
      (ctx) => `The room makes room. She expects it to.`,
      (ctx) => `She pats her belly once, affectionately, on the way to the scale.`,
    ] },
  // Enormous/Colossal + uncorrupted
  { when: { stageMin: 8, stageMax: 9, corruption: [0] },
    text: [
      (ctx) => `She fills the doorway before she finishes entering.`,
      (ctx) => `She comes in enormous and winded, the hall a journey she survived.`,
      (ctx) => `She does not look at the scale right away.`,
      (ctx) => `She says hello and waits, monumental and still.`,
      (ctx) => `She shuffles a few steps, then stops to breathe.`,
      (ctx) => `The office rearranges itself around her without discussion.`,
    ] },
  { when: { stageMin: 8, stageMax: 9, corruption: [1] },
    text: [
      (ctx) => `She enters with the familiarity of someone who knows what chairs will hold her.`,
      (ctx) => `She nods once. No ceremony.`,
      (ctx) => `"Same as last week," she says, enormous and matter-of-fact.`,
      (ctx) => `She moves inches at a time toward the scale.`,
      (ctx) => `She does not apologize for the time it takes.`,
      (ctx) => `Monumental, unhurried, unsurprised.`,
    ] },
  { when: { stageMin: 8, stageMax: 9, corruption: [2] },
    text: [
      (ctx) => `She comes in enormous and pleased, the floor registering every inch.`,
      (ctx) => `She smiles at the scale from across the room.`,
      (ctx) => `"Good morning," she says warmly. "Let's see where I'm at."`,
      (ctx) => `She shuffles toward the platform like it is a reunion.`,
      (ctx) => `She owns the space she requires.`,
      (ctx) => `Vast, unhurried, entirely comfortable.`,
    ] },
  // Blob + uncorrupted
  { when: { stage: [10], corruption: [0] },
    text: [
      (ctx) => `She arrives as immobile abundance — movement more shift than walk.`,
      (ctx) => `The room is organized around her before she reaches the desk.`,
      (ctx) => `She says hello and waits, immobile and still.`,
      (ctx) => `She does not hurry. Hurrying is not the vocabulary anymore.`,
      (ctx) => `She regards the scale with the practicality of someone who knows what it will say.`,
      (ctx) => `Warm, vast, permanent.`,
    ] },
  { when: { stage: [10], corruption: [1] },
    text: [
      (ctx) => `She settles rather than walks, too vast to hurry and familiar with the routine.`,
      (ctx) => `She nods once. The scale can wait.`,
      (ctx) => `"Okay," she says, comfortable in her immensity.`,
      (ctx) => `She does not apologize for the time or the space.`,
      (ctx) => `The office accommodates her. It has learned.`,
      (ctx) => `She is practical about what she has become.`,
    ] },
  { when: { stage: [10], corruption: [2] },
    text: [
      (ctx) => `She arrives warm and vast, smiling like the scale is an old friend.`,
      (ctx) => `The room reorganizes itself around her without anyone asking.`,
      (ctx) => `"Let's see it," she says, immobile and pleased.`,
      (ctx) => `She owns every pound and the space it requires.`,
      (ctx) => `Immobility is not a problem. It is where she lives now.`,
      (ctx) => `She is entirely comfortable with what she has become.`,
    ] },
  // Stage 11 + uncorrupted — impossibly vast, center of gravity, nearly immobile
  { when: { stage: [11], corruption: [0] },
    text: [
      (ctx) => `She settles into the room warm and still — flesh spreading in heavy rolls, the scale can wait.`,
      (ctx) => `She does not hurry. Hurrying is not part of her vocabulary anymore.`,
      (ctx) => `She regards the heavy-duty platform with practical familiarity.`,
      (ctx) => `The office has learned to accommodate her. She has learned to accommodate the office.`,
      (ctx) => `She is quietly aware of her own immensity — warm, heavy, impossible to ignore.`,
      (ctx) => `Movement is nearly impossible; presence is not.`,
    ] },
  { when: { stage: [11], corruption: [1] },
    text: [
      (ctx) => `She arrives matter-of-fact — the room's center of gravity, unapologetic.`,
      (ctx) => `She nods once. The number will be what it will be.`,
      (ctx) => `"Okay," she says, warm and patient. "Let's see it."`,
      (ctx) => `She does not apologize for the time her body requires.`,
      (ctx) => `Endless soft flesh shifts once, then stills.`,
      (ctx) => `She is beyond surprise at her own size. That is its own peace.`,
    ] },
  { when: { stage: [11], corruption: [2] },
    text: [
      (ctx) => `She arrives pleased — warm in indulgence, flesh sinking heavy into itself.`,
      (ctx) => `She smiles at the industrial platform like an old friend.`,
      (ctx) => `"Let's see how vast I've become," she says, and means it.`,
      (ctx) => `The room reorganizes around her without anyone asking.`,
      (ctx) => `She owns every endless roll and fold.`,
      (ctx) => `She is a living monument of softness, and she knows it.`,
    ] },
  // wildcard
  { when: {}, text: [(ctx) => `She sets her things down and waits for you to begin.`] },
]);

// ── weighIn.scaleApproach — stepping onto the analog scale ─────

registerModule("weighIn.scaleApproach", [
  // body-type flavor at Plump+
  { when: { bodyType: "pear", stageMin: 4 },
    text: [
      "She steps onto the scale and her hips settle wide, the platform dipping slightly on one side.",
      "She steps up carefully, thighs pressing together as the dial begins its climb.",
      "She mounts the scale and rocks her weight hip-to-hip before the needle finds its direction.",
      "She steps on plump at the hips; the platform groans once in recognition.",
    ] },
  { when: { bodyType: "apple", stageMin: 4 },
    text: [
      "She steps onto the scale belly-first, the platform groaning as her middle settles forward.",
      "She steps up and rests her hands on her gut, steadying herself as the needle swings.",
      "She mounts the scale and her belly bounces once before the dial shudders into motion.",
      "She steps on and her apron belly settles; the needle starts its long climb.",
    ] },
  { when: { bodyType: "athletic", stageMin: 4 },
    text: [
      "She steps onto the scale with an athlete's balance, though the platform groans more than it used to.",
      "She steps up, knees bent slightly, distributing weight that has grown far past her training weight.",
      "She mounts the scale like a podium — old habit — and the dial protests the new numbers.",
      "She steps on heavy now, power buried under comfortable thickness.",
    ] },
  { when: { bodyType: "voluptuous", stageMin: 4 },
    text: [
      "She steps onto the scale and her breasts settle heavily as the platform creaks.",
      "She steps up, curves compressing slightly, the needle swinging wide.",
      "She mounts the scale and adjusts her balance — top-heavy, the dial lurches before it climbs.",
      "She steps on plump and curved; the platform dips under generous weight.",
    ] },

  // Slight/Slim: barely registers
  { when: { stageMax: 1 },
    text: [
      "She steps onto the old analog scale. The needle swings out, slow and quiet.",
      "She steps up onto the white scale. The platform is steady. The red needle begins its measured arc.",
      "She steps onto the scale without ceremony. The needle barely moves before it finds its answer.",
      "She steps up lightly. The dial ticks once, twice, and settles.",
      "The platform doesn't shift. The needle drifts to its answer like it has all day.",
      "She steps on lightly; the scale barely notices.",
    ] },
  // Soft: some shift now, just noticeable
  { when: { stage: [2] },
    text: [
      "She steps onto the old scale. The platform takes the weight with only a small creak. The needle starts its climb.",
      "She steps up. The platform settles a little more than it used to. The red needle swings wide and begins to hunt.",
      "She steps onto the analog scale and the dial shudders slightly before the needle finds a direction.",
      "She mounts the scale and there is a faint creak — new, but not alarming. Yet.",
      "The needle swings out with more authority than last month. She watches it go.",
      "Soft new weight, honest on the dial.",
    ] },
  // Chubby: clothes-tight weight now obvious
  { when: { stage: [3] },
    text: [
      "She steps onto the scale. The platform creaks with new authority.",
      "She steps up chubby and round; the needle hunts wider than it used to.",
      "She mounts the scale and the dial shudders before climbing.",
      "The platform settles more than last month. She notices.",
      "She steps on and the red needle swings with purpose.",
      "New roundness, no longer deniable on the dial.",
    ] },
  // Plump: belly rounding, thighs rubbing
  { when: { stage: [4] },
    text: [
      "She steps carefully onto the old scale. The platform groans once. The red needle swings out wide and keeps climbing.",
      "She steps onto the scale and there is a creak, then a groan, then the needle arcing hard to the right.",
      "She steps up plump. The old white scale protests, the platform flexing.",
      "The platform dips. The dial shudders. The needle climbs like it is late for something.",
      "She steps on and the scale makes a sound you have started to recognize.",
      "Belly rounding forward, shirts riding up, scale complaining politely.",
    ] },
  // Heavy: chairs creak territory
  { when: { stage: [5] },
    text: [
      "She steps onto the scale heavy. The platform groans twice before settling.",
      "She steps up and the dial lurches — belly forward, weight real.",
      "She mounts the scale and the needle runs for the high numbers without hesitation.",
      "The platform bows. She waits. The scale has work to do.",
      "She steps on heavy and the office hears it.",
      "A deep creak, then the needle's long climb.",
    ] },
  // Fat: rolling waddle, scale straining
  { when: { stage: [6] },
    text: [
      "She steps onto the analog scale. The platform settles with a deep, announcing creak. The needle slams toward the far end of its range.",
      "She steps up fat. The scale takes a breath, holds it, then the needle keeps going.",
      "She steps onto the scale and the old platform flexes beneath her, the dial lurching hard.",
      "The platform bows. The needle doesn't hesitate — it runs for the high numbers.",
      "She steps on and the scale complains loudly. She waits.",
      "Heavy flesh, rolling and real on the dial.",
    ] },
  // Very Fat: belly cascades, dial working overtime
  { when: { stage: [7] },
    text: [
      "She steps onto the scale very fat. The platform protests at length before the needle moves.",
      "She steps up and the dial has a long way to go — she knows, she waits.",
      "She mounts the scale and the platform flexes visibly beneath her.",
      "The needle slams right and keeps hunting for numbers the dial was not built to show this quickly.",
      "She steps on and the scale makes a noise you will remember.",
      "Vast and patient, dial working overtime.",
    ] },
  // Enormous/Colossal: this analog scale is not designed for this
  { when: { stageMin: 8, stageMax: 9 },
    text: [
      "She steps onto the old analog scale. The platform protests immediately — a sharp creak followed by a low, loaded groan. The needle slams toward the end of its travel.",
      "She steps up enormous. The scale accepts her the way old furniture accepts an overload: with sound, and reluctance, and a dial that has run out of numbers.",
      "She steps onto the scale. The platform bends. The needle swings hard to the right and does not stop where it should.",
      "The scale makes a noise you will remember. The needle pins itself to the far edge and keeps trying.",
      "She steps up and the platform visibly flexes under overwhelming weight. This scale was not built for this. It tries anyway.",
      "The weight is staggering — the dial gives up pretending.",
    ] },
  // Stage 10: analog scale essentially decorative
  { when: { stage: [10] },
    text: [
      "She shifts onto the scale — immobile abundance settling. The platform screams. The needle pins itself instantly.",
      "She settles onto the platform. The scale was not built for this. It makes its opinion known anyway.",
      "The platform bends. The dial has nothing useful to say. She waits anyway.",
      "She mounts the scale and the old white platform flexes like a warning.",
      "The needle has no room left to travel.",
      "The scale complains once, then gives up numerically.",
    ] },
  // Stage 11: analog scale is not a meaningful instrument
  { when: { stage: [11] },
    text: [
      "She settles toward the scale — endless soft flesh shifting like slow weather. The platform gives up immediately.",
      "The analog dial has nothing left to say to a body this vast. She waits anyway, warm and heavy.",
      "The scale was not built for this much weight. It tries once, then surrenders.",
      "Plush flesh yields onto the platform; the needle pins itself and stays.",
      "Immobility and warmth — beyond the dial's vocabulary.",
      "The platform groans like something remembering its limits.",
    ] },
  // wildcard
  { when: {}, text: ["She steps onto the scale. The red needle begins to spin."] },
]);

// ── weighIn.bigScaleApproach — going to the heavy-duty scale ───

registerModule("weighIn.bigScaleApproach", [
  // Stage 11 — industrial scale, long patient climb
  { when: { stage: [11] },
    text: [
      "She goes to the heavy-duty platform — the only scale that still pretends to understand her. The LCD wakes and begins its long, patient climb.",
      "She settles onto the industrial platform. The steel holds. The display builds the number digit by digit, unhurried as she is.",
      "Impossible weight on steel that does not flinch. The green numbers rise one digit at a time.",
      "She knows where to stand. The platform takes her mass without comment. The display climbs.",
      "The industrial scale hums and counts upward — warm, vast, patient with her size.",
      "She exists on the platform while the number builds. Time is not the constraint. Weight is.",
    ] },
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

// ── weighIn.stepOff — short beat after the reading settles ─────
// Universal physical moment: leaving the platform before she speaks.

registerModule("weighIn.stepOff", [
  { when: { stageMax: 1 },
    text: [
      (ctx) => `The dial holds at ${Math.round(ctx.subject.lbs)}. ${ctx.subject.name} steps off lightly — one foot, then the other. The platform rocks once beneath her and goes still.`,
      (ctx) => `${ctx.subject.name} reads the number, then hops down. The scale trembles and settles. She brushes imaginary dust from her sleeve like the moment is already behind her.`,
      (ctx) => `The reading steadies. ${ctx.subject.name} steps off without hurry, slim ankles flexing, the platform returning to level behind her.`,
    ] },
  { when: { stage: [2, 3] },
    text: [
      (ctx) => `The dial settles. ${ctx.subject.name} steps off carefully — her softened thighs brush together, her belly gives a little when she shifts her weight, and the platform dips before rocking upright.`,
      (ctx) => `${ctx.subject.name} reads ${Math.round(ctx.subject.lbs)} lbs, then steps down. The scale creaks once. She steadies herself with a hand on your desk, warm and slightly breathless.`,
      (ctx) => `The number holds. ${ctx.subject.name} steps off and the platform takes a moment to recover — her hips and belly sway with the motion, soft flesh settling as she finds her balance.`,
    ] },
  { when: { stage: [4, 5] },
    text: [
      (ctx) => `The reading locks in. ${ctx.subject.name} steps off slowly — her thick belly swings forward with the motion, her heavy thighs rubbing as she shifts, and the platform groans before going still.`,
      (ctx) => `${ctx.subject.name} reads ${Math.round(ctx.subject.lbs)} lbs and eases herself down. The scale dips visibly under her weight before she clears it. She exhales, plump and warm, and rolls her shoulders.`,
      (ctx) => `The dial stops. ${ctx.subject.name} steps off with a soft jiggle through her middle and hips — flesh wobbling, settling, finding its new resting place as the platform steadies.`,
    ] },
  { when: { stage: [6, 7, 8] },
    text: [
      (ctx) => `The reading holds at ${Math.round(ctx.subject.lbs)}. ${ctx.subject.name} steps off in stages — one foot, then the other, belly hanging heavy and swaying, thighs thick and pressing, the platform complaining before she clears it entirely.`,
      (ctx) => `${ctx.subject.name} eases herself off the platform. The motion sends slow ripples through her fat body; her belly lags behind her turn and settles with a soft, audible exhale. The scale rocks twice before stilling.`,
      (ctx) => `The number settles. ${ctx.subject.name} steps down carefully, breathing through her nose. Her vast soft weight shifts off the platform inch by inch — belly, hips, thighs — until the scale can finally rest.`,
    ] },
  { when: { stageMin: 9 },
    text: [
      (ctx) => `The display stabilizes at ${Math.round(ctx.subject.lbs)}. ${ctx.subject.name} does not so much step off as redistribute — vast soft mass shifting off the platform in a slow, seismic motion, flesh pooling and settling as the scale trembles and stills beneath what remains.`,
      (ctx) => `${ctx.subject.name} reads the impossible number. Leaving the platform takes time: belly and thighs and hips sliding forward by degrees, warm weight transferring off the metal until the display finally rests at zero.`,
      (ctx) => `The reading holds. ${ctx.subject.name} shifts her enormous body off the platform — slow, heavy, deliberate — and the office seems to exhale around her as the scale recovers.`,
    ] },
  { when: {},
    text: [(ctx) => `${ctx.subject.name} steps off the platform. The scale settles behind her.`] },
]);

// ── weighIn.reaction — legacy generic reaction pool (unused in template) ──

registerModule("weighIn.reaction", [
  // body-type gestures — tie on stage + corruption, priority wins over generic
  { when: { bodyType: "pear", stage: [2], corruption: [0] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and glances back at her hips in the office mirror. "Huh." She tugs at her waistband. "Okay."`,
      (ctx) => `${ctx.subject.name} looks at the dial, then down at her thighs. She presses them together once, testing.`,
    ] },
  { when: { bodyType: "pear", stage: [4], corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off smiling and gives her hip a satisfied pat. "Worth it," she says.`,
      (ctx) => `${ctx.subject.name} looks at the number and runs her hands over her hips. "Good," she says warmly.`,
    ] },
  { when: { bodyType: "apple", stage: [2], corruption: [0] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and rests a hand on her belly. "It's probably just bloating," she says, unconvincingly.`,
      (ctx) => `${ctx.subject.name} looks at the dial and sucks in reflexively. The number does not change. She exhales.`,
    ] },
  { when: { bodyType: "apple", stage: [4], corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and rubs her belly with open satisfaction. "Getting there," she murmurs.`,
      (ctx) => `${ctx.subject.name} pats her gut affectionately. "Good week," she says, and means it.`,
    ] },
  { when: { bodyType: "athletic", stage: [2], corruption: [1] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and flexes reflexively, then stops. The muscle is still there. It is just buried now.`,
      (ctx) => `${ctx.subject.name} looks at the number like a stat sheet. "Huh," she says. "Personal best." She does not sound upset.`,
    ] },
  { when: { bodyType: "voluptuous", stage: [4], corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and presses her hands to her curves, checking the new weight with her palms. "Perfect," she breathes.`,
      (ctx) => `${ctx.subject.name} looks at the reading and smiles at her own reflection. "Filling out nicely," she says.`,
    ] },
  { when: { bodyType: "fertility_goddess", stage: [4], corruption: [2] }, priority: 1,
    text: [
      (ctx) => `${ctx.subject.name} steps off and sways her hips once, feeling the new weight settle. "More," she says softly, like a promise.`,
      (ctx) => `${ctx.subject.name} runs her hands over her thighs and smiles. "Abundant," she murmurs. She approves.`,
    ] },

  // Slight/Slim + hesitant: notes the number, maybe a little puzzled, not yet troubled
  { when: { stageMax: 1, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and glances back at the dial. "Huh." She tilts her head slightly, solving an arithmetic problem. "Okay. Sure."`,
      (ctx) => `${ctx.subject.name} checks the reading and nods once, already moving on. The number is small. She is not the kind of girl who worries about small numbers.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a beat, then back at you. "That seems right." She shrugs. "Nothing to report."`,
      (ctx) => `${ctx.subject.name} steps off and writes the number in her planner without comment.`,
      (ctx) => `${ctx.subject.name} glances at the dial. "Fine," she says. She was already thinking about lunch.`,
      (ctx) => `${ctx.subject.name} steps off slight and unbothered. Small numbers, small concerns.`,
    ] },
  // Slight/Slim + corrupted: pleased it is going up, or at minimum satisfied
  { when: { stageMax: 1, corruption: [1, 2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the dial and smiles, just slightly. "Moving in the right direction," she says, and she is not asking for confirmation.`,
      (ctx) => `${ctx.subject.name} steps off and checks the number with calm satisfaction. She does not elaborate. The number says enough.`,
      (ctx) => `${ctx.subject.name} glances at the reading and her expression warms. "Good," she says. "Keep it going."`,
      (ctx) => `${ctx.subject.name} nods at the dial like it told her something she wanted to hear.`,
      (ctx) => `${ctx.subject.name} "Up," she says quietly, pleased. She does not need you to agree.`,
      (ctx) => `${ctx.subject.name} nods at the dial, slim and satisfied.`,
    ] },
  // Soft + hesitant
  { when: { stage: [2], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the number for a beat too long. "Is that..." She stops, smooths her top over her soft middle. "I've just been eating a lot this semester."`,
      (ctx) => `${ctx.subject.name} steps off quietly. She tugs at her waistband. "It's fine," she says. "I'm fine." She might be telling herself.`,
      (ctx) => `${ctx.subject.name} stares at the dial with the focused look of someone counting backwards from ten.`,
      (ctx) => `${ctx.subject.name} blinks at the number. "Huh." She laughs, a little too quickly. "Well. Okay."`,
      (ctx) => `${ctx.subject.name} steps off and busies herself with her bag. The number hangs in the air anyway.`,
      (ctx) => `${ctx.subject.name} pats her softened middle once, reflexively.`,
    ] },
  { when: { stage: [2], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} checks the reading and exhales slowly. "Every week," she mutters — less surprise than resignation.`,
      (ctx) => `${ctx.subject.name} steps off and looks at the dial. Then at herself. Then at the dial again.`,
      (ctx) => `${ctx.subject.name} looks at the reading with careful neutrality.`,
      (ctx) => `${ctx.subject.name} "Predictable," she says. She does not sound relieved.`,
      (ctx) => `${ctx.subject.name} shrugs one shoulder. "Sure," she says. "That tracks."`,
      (ctx) => `${ctx.subject.name} smooths her top over new softness and nods.`,
    ] },
  { when: { stage: [2], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} hops off the scale, looks at the dial, and grins. "Up again." She pats her stomach once, affectionately. "Good."`,
      (ctx) => `${ctx.subject.name} checks the number, satisfied. "I figured," she says. "I could feel it coming."`,
      (ctx) => `${ctx.subject.name} sees the reading and tilts her head with open approval.`,
      (ctx) => `${ctx.subject.name} bounces once on her toes — still can, for now — and smiles at the dial.`,
      (ctx) => `${ctx.subject.name} "Thank you," she says, and she is not talking to you.`,
      (ctx) => `${ctx.subject.name} pats her soft middle, pleased.`,
    ] },
  // Chubby + hesitant
  { when: { stage: [3], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} stares at the dial. "It's probably the food here," she says. "Different from home."`,
      (ctx) => `${ctx.subject.name} steps off chubby and self-conscious. "Okay," she says. "Okay."`,
      (ctx) => `${ctx.subject.name} tugs at her waistband. The number does not change.`,
      (ctx) => `${ctx.subject.name} laughs once, too quickly. "Well. That's... fine."`,
      (ctx) => `${ctx.subject.name} folds her arms. Denial assembling itself.`,
      (ctx) => `${ctx.subject.name} looks at the reading and then away.`,
    ] },
  { when: { stage: [3], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} checks the reading and exhales. "Yeah," she says. "Yeah, okay."`,
      (ctx) => `${ctx.subject.name} "Every week," she mutters — resignation, not surprise.`,
      (ctx) => `${ctx.subject.name} nods once, chubby and informed.`,
      (ctx) => `${ctx.subject.name} tugs her waistband once and lets it go.`,
      (ctx) => `${ctx.subject.name} "Predictable," she says.`,
      (ctx) => `${ctx.subject.name} steps off without drama.`,
    ] },
  { when: { stage: [3], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} grins at the dial. "Up again." She pats her chubby middle. "Good."`,
      (ctx) => `${ctx.subject.name} checks the number, satisfied. "I could feel it coming."`,
      (ctx) => `${ctx.subject.name} sees the reading and approves openly.`,
      (ctx) => `${ctx.subject.name} bounces once — still can — and smiles.`,
      (ctx) => `${ctx.subject.name} "Yes," she says warmly.`,
      (ctx) => `${ctx.subject.name} runs a hand along her softened side.`,
    ] },
  // Plump + hesitant: real belly, denial attempts anyway
  { when: { stage: [4], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the number just sits there. She stares at it. "It's the — it's the clothes," she says finally, and that is not a very convincing thing to say.`,
      (ctx) => `${ctx.subject.name} looks at the dial for a long moment. "Okay." A breath. "Okay. I should really go for a run." She probably will not.`,
      (ctx) => `${ctx.subject.name} takes in the reading and squeezes her eyes shut briefly. "I didn't think it was that high."`,
      (ctx) => `${ctx.subject.name} steps off and folds her arms. "Water weight," she says. Nobody believes it.`,
      (ctx) => `${ctx.subject.name} stares at the dial. Her jaw tightens.`,
      (ctx) => `${ctx.subject.name} tugs her shirt down over her plump belly. The number remains.`,
    ] },
  { when: { stage: [4], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and looks at the reading without particular alarm. "I mean, yeah," she says. "I can feel that."`,
      (ctx) => `${ctx.subject.name} checks the number and lets out a short breath. "Is it bad that I expected that?"`,
      (ctx) => `${ctx.subject.name} looks at the dial and gives a small, settled nod. "It's only going one direction."`,
      (ctx) => `${ctx.subject.name} "Huh," she says. Not surprised. Not happy. Just informed.`,
      (ctx) => `${ctx.subject.name} steps off plump and rolls her shoulders. "Same time next week."`,
      (ctx) => `${ctx.subject.name} tugs her waistband once and lets it go.`,
    ] },
  { when: { stage: [4], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off smiling. "I'm really filling out," she says — not a complaint. She presses her hands to her hips and laughs softly.`,
      (ctx) => `${ctx.subject.name} looks at the number the way someone reads a good review. She approves.`,
      (ctx) => `${ctx.subject.name} steps off and runs a hand along her plump side. "Nice," she says simply.`,
      (ctx) => `${ctx.subject.name} admires the dial for a moment. "Beautiful," she murmurs.`,
      (ctx) => `${ctx.subject.name} "Yes," she says, to the number, to herself, to the week ahead.`,
      (ctx) => `${ctx.subject.name} pats her plump belly once, affectionately.`,
    ] },
  // Heavy + hesitant
  { when: { stage: [5], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off heavy and quiet. "Wow," she says. She does not move for a moment.`,
      (ctx) => `${ctx.subject.name} reads the number twice, like she is hoping it changed. It did not.`,
      (ctx) => `${ctx.subject.name} grips the back of the chair. "I didn't think it was that much."`,
      (ctx) => `${ctx.subject.name} stares at the dial. Her jaw is set.`,
      (ctx) => `${ctx.subject.name} "I'll cut back," she says, to herself as much as you.`,
      (ctx) => `${ctx.subject.name} breathes audibly once, then says nothing.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and lets out a slow breath. "Okay." She rubs the back of her neck. "It's just a number."`,
      (ctx) => `${ctx.subject.name} steps off and doesn't say anything for a beat. Then: "More than I thought."`,
      (ctx) => `${ctx.subject.name} checks the reading and tilts her head. "Yeah," she says. "I can live with that."`,
      (ctx) => `${ctx.subject.name} "Big number," she says. Flat.`,
      (ctx) => `${ctx.subject.name} nods once, slowly.`,
      (ctx) => `${ctx.subject.name} waddles back from the scale, heavy and resigned.`,
    ] },
  { when: { stage: [5], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off with easy confidence. "Good," she says simply.`,
      (ctx) => `${ctx.subject.name} checks the reading and nods, satisfied. "Yeah," she says. "That tracks."`,
      (ctx) => `${ctx.subject.name} looks at the dial and smiles. "Every week," she says, pleased.`,
      (ctx) => `${ctx.subject.name} "Beautiful," she says, looking at the number.`,
      (ctx) => `${ctx.subject.name} steps off and stretches, luxurious.`,
      (ctx) => `${ctx.subject.name} pats her heavy belly once, warm approval.`,
    ] },
  // Fat + hesitant: genuinely distressed, the number is past rationalization
  { when: { stage: [6], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off the scale and the number lands on her like a door swinging open. She is quiet for a moment. "I didn't think it was that much," she says.`,
      (ctx) => `${ctx.subject.name} stares at the reading. Her jaw is set. "That's —" She stops. "I'll cut back," she says, to herself as much as you.`,
      (ctx) => `${ctx.subject.name} looks at the dial in silence. Then she looks at her hands. "I have to start saying no to things," she says, with the tone of someone who is not quite sure she will.`,
      (ctx) => `${ctx.subject.name} steps off and grips the back of the chair. "Wow," she says quietly. She does not move for a moment.`,
      (ctx) => `${ctx.subject.name} reads the number twice, like she is hoping it changed. It did not.`,
      (ctx) => `${ctx.subject.name} steps off fat and winded. The number lands hard.`,
    ] },
  { when: { stage: [6], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and lets out a slow breath. "Okay." She rubs the back of her neck. "It's just a number."`,
      (ctx) => `${ctx.subject.name} steps off and doesn't say anything for a beat. Then: "More than I thought."`,
      (ctx) => `${ctx.subject.name} checks the reading and tilts her head. "Yeah," she says. "I can live with that."`,
      (ctx) => `${ctx.subject.name} "Big number," she says. Flat.`,
      (ctx) => `${ctx.subject.name} nods once, slowly. The fight has gone out of it.`,
      (ctx) => `${ctx.subject.name} waddles back from the scale, fat and resigned.`,
    ] },
  { when: { stage: [6], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off with the easy confidence of someone who made peace with the numbers. "Good," she says simply.`,
      (ctx) => `${ctx.subject.name} checks the reading and nods, satisfied. "Yeah," she says. "That tracks."`,
      (ctx) => `${ctx.subject.name} looks at the dial and smiles. "Every week," she says, pleased.`,
      (ctx) => `${ctx.subject.name} "Beautiful," she says, looking at the number.`,
      (ctx) => `${ctx.subject.name} steps off and stretches, luxurious.`,
      (ctx) => `${ctx.subject.name} pats her fat belly once, warm approval.`,
    ] },
  // Very Fat + hesitant
  { when: { stage: [7], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off very fat and goes very still. The number is enormous on the dial.`,
      (ctx) => `${ctx.subject.name} stares at the reading until her breathing steadies.`,
      (ctx) => `${ctx.subject.name} "I didn't think it was that much," she says quietly.`,
      (ctx) => `${ctx.subject.name} grips the chair. She does not look at you.`,
      (ctx) => `${ctx.subject.name} "I need a minute," she says.`,
      (ctx) => `${ctx.subject.name} cannot see her feet past her belly. The number is worse.`,
    ] },
  { when: { stage: [7], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and exhales. "Okay." More acceptance than celebration.`,
      (ctx) => `${ctx.subject.name} "More than I thought." She sounds like someone doing math.`,
      (ctx) => `${ctx.subject.name} nods once. Very fat, very familiar with large numbers.`,
      (ctx) => `${ctx.subject.name} "It's just a number," she says, practicing.`,
      (ctx) => `${ctx.subject.name} steps off with care.`,
      (ctx) => `${ctx.subject.name} rubs the back of her neck once.`,
    ] },
  { when: { stage: [7], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off very fat and pleased. "Good," she says.`,
      (ctx) => `${ctx.subject.name} checks the reading and nods, satisfied.`,
      (ctx) => `${ctx.subject.name} looks at the dial and smiles. "Every week," she says warmly.`,
      (ctx) => `${ctx.subject.name} pats her vast middle once, affectionately.`,
      (ctx) => `${ctx.subject.name} "Beautiful," she says, and means it.`,
      (ctx) => `${ctx.subject.name} owns the number and the body that earned it.`,
    ] },
  // Enormous/Colossal + hesitant: the number is staggering
  { when: { stageMin: 8, stageMax: 9, corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and stares at the reading. The number is enormous. She opens her mouth and closes it. "I need some air," she says finally.`,
      (ctx) => `${ctx.subject.name} looks at the number in silence. Her hands are at her sides. "Every single week," she says quietly, and she does not sound at peace with it.`,
      (ctx) => `${ctx.subject.name} stares at the reading until her breathing steadies. "It doesn't stop," she says softly. It is hard to tell if that is a question.`,
      (ctx) => `${ctx.subject.name} steps off and sits down heavily. She does not look at the dial again.`,
      (ctx) => `${ctx.subject.name} "That's not —" She stops. There is no sentence that helps.`,
      (ctx) => `${ctx.subject.name} steps off enormous and winded. The number is staggering.`,
    ] },
  // Enormous/Colossal + conflicted: surrendered, dark humor
  { when: { stageMin: 8, stageMax: 9, corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} takes in the number with a long exhale. "That's..." She tilts her head. "Well. I did eat everything." A short, reluctant laugh.`,
      (ctx) => `${ctx.subject.name} looks at the reading and then at you. "That's not stopping, is it," she says. It is not really a question.`,
      (ctx) => `${ctx.subject.name} checks the dial and is quiet for a moment. "You know," she says, "I've stopped being surprised." She sounds like that is its own kind of answer.`,
      (ctx) => `${ctx.subject.name} "At least it's consistent," she says, and laughs once, without humor.`,
      (ctx) => `${ctx.subject.name} shrugs, which is an impressive gesture at her size. "What are you gonna do," she says.`,
      (ctx) => `${ctx.subject.name} nods at the staggering reading like checking weather.`,
    ] },
  // Enormous/Colossal + broken: triumphant pride
  { when: { stageMin: 8, stageMax: 9, corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and nods, deep and satisfied. "Getting there," she murmurs, like she has a specific destination in mind and she is close.`,
      (ctx) => `${ctx.subject.name} looks at the reading and something in her expression settles. "I know," she says. "I can feel it."`,
      (ctx) => `${ctx.subject.name} looks at the number like something she built. She exhales slowly, pleased. "Good," she says.`,
      (ctx) => `${ctx.subject.name} "More," she says softly, to the dial, to the week ahead.`,
      (ctx) => `${ctx.subject.name} smiles at the enormous number. She has earned it.`,
      (ctx) => `${ctx.subject.name} steps off vast and satisfied.`,
    ] },
  // Blob + hesitant: the number is beyond ordinary, she has no words
  { when: { stage: [10], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} steps off and the scale just says what it says. She stares at it for a long time. There is nowhere for a number that size to hide.`,
      (ctx) => `${ctx.subject.name} looks at the reading. Then at herself. Then at the reading. "I don't..." She trails off.`,
      (ctx) => `${ctx.subject.name} steps off and goes very still. The number is beyond language.`,
      (ctx) => `${ctx.subject.name} shifts rather than steps. The reading hangs in the air.`,
      (ctx) => `${ctx.subject.name} breathes once, heavily. She says nothing for a long moment.`,
      (ctx) => `${ctx.subject.name} regards the extraordinary number with practical silence.`,
    ] },
  { when: { stage: [10], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading. The number is extraordinary. She nods once.`,
      (ctx) => `${ctx.subject.name} checks the reading and breathes out slowly.`,
      (ctx) => `${ctx.subject.name} "Okay," she says, immobile and matter-of-fact.`,
      (ctx) => `${ctx.subject.name} does not apologize for the number or the time it took to get it.`,
      (ctx) => `${ctx.subject.name} settles back from the scale, immobile and informed.`,
      (ctx) => `${ctx.subject.name} has made her peace with extraordinary.`,
    ] },
  // Blob + broken: settled into immobile abundance
  { when: { stage: [10], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading. The number is, by any scale, extraordinary. She looks at you. "I know," is all she says.`,
      (ctx) => `${ctx.subject.name} checks the reading and breathes out slowly, pleased.`,
      (ctx) => `${ctx.subject.name} nods at the extraordinary number.`,
      (ctx) => `${ctx.subject.name} "Still growing," she says, and it sounds like a status report and a boast.`,
      (ctx) => `${ctx.subject.name} pats what she can reach of her own vastness, affectionately.`,
      (ctx) => `${ctx.subject.name} smiles at the extraordinary number like an old friend.`,
    ] },
  // Stage 11 + hesitant
  { when: { stage: [11], corruption: [0] },
    text: [
      (ctx) => `${ctx.subject.name} stares at the reading. The number is beyond ordinary language.`,
      (ctx) => `${ctx.subject.name} goes very still. The display says what it says.`,
      (ctx) => `${ctx.subject.name} breathes once, heavily. She does not look away.`,
      (ctx) => `${ctx.subject.name} "That's..." She trails off. There is no sentence big enough.`,
      (ctx) => `${ctx.subject.name} shifts rather than steps back. The number hangs in the air.`,
      (ctx) => `${ctx.subject.name} regards the impossible reading with practical silence.`,
    ] },
  { when: { stage: [11], corruption: [1] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the number and nods once. Matter-of-fact.`,
      (ctx) => `${ctx.subject.name} "Okay," she says. Warm. Unsurprised.`,
      (ctx) => `${ctx.subject.name} checks the reading like checking the weather.`,
      (ctx) => `${ctx.subject.name} does not apologize for what the scale reports.`,
      (ctx) => `${ctx.subject.name} settles back from the platform, vast and informed.`,
      (ctx) => `${ctx.subject.name} has made her peace with impossible size.`,
    ] },
  { when: { stage: [11], corruption: [2] },
    text: [
      (ctx) => `${ctx.subject.name} looks at the reading and smiles — pleased, warm, vast.`,
      (ctx) => `${ctx.subject.name} "Beautiful," she breathes. She means the number and herself.`,
      (ctx) => `${ctx.subject.name} pats what she can reach of her endless softness, affectionately.`,
      (ctx) => `${ctx.subject.name} "Still growing," she says, and it sounds like a promise.`,
      (ctx) => `${ctx.subject.name} owns the number and the body that earned it.`,
      (ctx) => `${ctx.subject.name} exhales slowly, satisfied. The scale has said it plainly.`,
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
export function renderWeighInIntro(student, week, goesDirectlyToBig = false, opts = {}) {
  const ctx = createContext({
    subject: student,
    week,
    globals: { campusFattening: !!opts.campusFattening },
  });
  return render(goesDirectlyToBig ? WEIGH_IN_INTRO_BIG : WEIGH_IN_INTRO_NORMAL, ctx);
}

// renderWeighInReaction(student, week) → step-off beat + per-student reply
export function renderWeighInReaction(student, week, opts = {}) {
  const ctx = createContext({
    subject: student,
    week,
    globals: { campusFattening: !!opts.campusFattening },
  });
  const stepOff = render("{weighIn.stepOff}", ctx);
  const personal = appendCampusWeighIn(
    getWeighInPersonalReply(student, opts),
    student,
    { ...opts, week },
  );
  return `${stepOff}\n\n${personal}`;
}
