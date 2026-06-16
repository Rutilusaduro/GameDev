// The Squad — Lead: A1 Mobile | Support: A2 Psych
// Private/group session fullness beats — migrated from SESSION_FULLNESS_DESCS (Phase C).
// Regenerate: node scripts/generatePhaseCTail.mjs
import { registerPool } from '../../engine.js';

registerPool('session.fullness.default.f0._f1', [
  { when: {}, text: ["{subject.name} is eating easily, comfortably. She has barely started."] },
]);

registerPool('session.fullness.default.f0', [
  { when: {}, text: ["{session.fullness.default.f0._f1}"] },
]);
registerPool('session.fullness.default.f1._f1', [
  { when: {}, text: ["A warmth spreading through her middle. She's been eating a while now, but she's not stopping."] },
]);

registerPool('session.fullness.default.f1', [
  { when: {}, text: ["{session.fullness.default.f1._f1}"] },
]);
registerPool('session.fullness.default.f2._f1', [
  { when: {}, text: ["{subject.name} is genuinely full. You can see it — the way she slows slightly, breathes a little heavier. She's eating anyway."] },
]);

registerPool('session.fullness.default.f2', [
  { when: {}, text: ["{session.fullness.default.f2._f1}"] },
]);
registerPool('session.fullness.default.f3._f1', [
  { when: {}, text: ["Her belly is firm and round and very full. She presses her hand briefly against it and then picks her fork back up. \"I'm okay,\" she says, to herself as much as to you."] },
]);

registerPool('session.fullness.default.f3', [
  { when: {}, text: ["{session.fullness.default.f3._f1}"] },
]);
registerPool('session.fullness.default.f4._f1', [
  { when: {}, text: ["She is past full — has been past full for some time. Her belly sits heavily in her lap and her movements have gone slow and deliberate. She takes a breath between each bite. She doesn't stop."] },
]);

registerPool('session.fullness.default.f4', [
  { when: {}, text: ["{session.fullness.default.f4._f1}"] },
]);
registerPool('session.fullness.default.f5._f1', [
  { when: {}, text: ["{subject.name} has eaten an extraordinary amount. Her middle is enormous with it — round and tight and warm. She finishes the bite she's on and rests back, hands pressed softly against herself."] },
]);

registerPool('session.fullness.default.f5._f2', [
  { when: {}, text: [". \"I can't believe I ate all of that,\" she says. She sounds genuinely impressed."] },
]);

registerPool('session.fullness.default.f5', [
  { when: {}, text: ["{session.fullness.default.f5._f1} {session.fullness.default.f5._f2}"] },
]);
registerPool('session.fullness.cheerleader.f0._f1', [
  { when: {}, text: ["{subject.name} eats efficiently, like everything she does. Good posture. Squad mentality: commit fully."] },
]);

registerPool('session.fullness.cheerleader.f0', [
  { when: {}, text: ["{session.fullness.cheerleader.f0._f1}"] },
]);
registerPool('session.fullness.cheerleader.f1._f1', [
  { when: {}, text: ["Her cheeks are rosy. She was talking between bites but slower now, more focused on the food than the conversation."] },
]);

registerPool('session.fullness.cheerleader.f1', [
  { when: {}, text: ["{session.fullness.cheerleader.f1._f1}"] },
]);
registerPool('session.fullness.cheerleader.f2._f1', [
  { when: {}, text: ["She's full enough that she's stopped pretending she isn't. Her shirt has ridden up slightly. She pulls it down. Then reaches for more."] },
]);

registerPool('session.fullness.cheerleader.f2', [
  { when: {}, text: ["{session.fullness.cheerleader.f2._f1}"] },
]);
registerPool('session.fullness.cheerleader.f3._f1', [
  { when: {}, text: ["\"Okay, I'm pretty full,\" {subject.name} says. She does not stop eating. The captain finishes what she starts."] },
]);

registerPool('session.fullness.cheerleader.f3', [
  { when: {}, text: ["{session.fullness.cheerleader.f3._f1}"] },
]);
registerPool('session.fullness.cheerleader.f4._f1', [
  { when: {}, text: ["She is visibly overfull. Her belly presses forward, round and taut. She sits straighter to give herself room, which doesn't help. She takes another bite."] },
]);

registerPool('session.fullness.cheerleader.f4', [
  { when: {}, text: ["{session.fullness.cheerleader.f4._f1}"] },
]);
registerPool('session.fullness.cheerleader.f5._f1', [
  { when: {}, text: ["{subject.name} sets her fork down for a long moment, both hands resting on the enormous swell of her belly. Then she picks the fork back up. \"I'm not done,\" she says."] },
]);

registerPool('session.fullness.cheerleader.f5._f2', [
  { when: {}, text: [". It sounds like a practice affirmation."] },
]);

registerPool('session.fullness.cheerleader.f5', [
  { when: {}, text: ["{session.fullness.cheerleader.f5._f1} {session.fullness.cheerleader.f5._f2}"] },
]);
registerPool('session.fullness.bookworm.f0._f1', [
  { when: {}, text: ["{subject.name} is cross-legged beside her book, eating the way she reads — thoroughly and without looking up."] },
]);

registerPool('session.fullness.bookworm.f0', [
  { when: {}, text: ["{session.fullness.bookworm.f0._f1}"] },
]);
registerPool('session.fullness.bookworm.f1._f1', [
  { when: {}, text: ["She's stopped reading. She's just eating now. Focused, methodical. The book is closed."] },
]);

registerPool('session.fullness.bookworm.f1', [
  { when: {}, text: ["{session.fullness.bookworm.f1._f1}"] },
]);
registerPool('session.fullness.bookworm.f2._f1', [
  { when: {}, text: ["\"I've consumed,\" {subject.name} says precisely, gesturing at her plate, \"a non-trivial quantity of food.\" She keeps eating. Documenting the phenomenon from the inside."] },
]);

registerPool('session.fullness.bookworm.f2', [
  { when: {}, text: ["{session.fullness.bookworm.f2._f1}"] },
]);
registerPool('session.fullness.bookworm.f3._f1', [
  { when: {}, text: ["She is studying her own fullness with the same attention she gives everything else. Pressing her fingers against her stomach. \"It's interesting,\" she says."] },
]);

registerPool('session.fullness.bookworm.f3._f2', [
  { when: {}, text: [". \"Biologically speaking.\" She takes another bite."] },
]);

registerPool('session.fullness.bookworm.f3', [
  { when: {}, text: ["{session.fullness.bookworm.f3._f1} {session.fullness.bookworm.f3._f2}"] },
]);
registerPool('session.fullness.bookworm.f4._f1', [
  { when: {}, text: ["{subject.name} has set aside the scientific detachment. She is simply full, and still eating, and has stopped justifying it."] },
]);

registerPool('session.fullness.bookworm.f4', [
  { when: {}, text: ["{session.fullness.bookworm.f4._f1}"] },
]);
registerPool('session.fullness.bookworm.f5._f1', [
  { when: {}, text: ["She rests her head back and stays still. Then: \"I want to note that my previous understanding of my own capacity was clearly incomplete.\" She has another piece of cake."] },
]);

registerPool('session.fullness.bookworm.f5', [
  { when: {}, text: ["{session.fullness.bookworm.f5._f1}"] },
]);
registerPool('session.fullness.athlete.f0._f1', [
  { when: {}, text: ["{subject.name} eats fast — fuel, not pleasure. Making up for it in quantity."] },
]);

registerPool('session.fullness.athlete.f0', [
  { when: {}, text: ["{session.fullness.athlete.f0._f1}"] },
]);
registerPool('session.fullness.athlete.f1._f1', [
  { when: {}, text: ["Halfway through and already breathing differently. Not exertion. She notices. Doesn't say anything."] },
]);

registerPool('session.fullness.athlete.f1', [
  { when: {}, text: ["{session.fullness.athlete.f1._f1}"] },
]);
registerPool('session.fullness.athlete.f2._f1', [
  { when: {}, text: ["\"This is a lot of food,\" she says, without criticism. She finishes the plate and looks at the next one. \"Okay.\""] },
]);

registerPool('session.fullness.athlete.f2', [
  { when: {}, text: ["{session.fullness.athlete.f2._f1}"] },
]);
registerPool('session.fullness.athlete.f3._f1', [
  { when: {}, text: ["She's full the way she used to be after long training sessions — that specific heavy, settled fullness she now recognises from a very different context."] },
]);

registerPool('session.fullness.athlete.f3', [
  { when: {}, text: ["{session.fullness.athlete.f3._f1}"] },
]);
registerPool('session.fullness.athlete.f4._f1', [
  { when: {}, text: ["{subject.name} is well past her old limits, and her old limits were genuinely impressive. She keeps going with the grim determination of someone finishing a race."] },
]);

registerPool('session.fullness.athlete.f4', [
  { when: {}, text: ["{session.fullness.athlete.f4._f1}"] },
]);
registerPool('session.fullness.athlete.f5._f1', [
  { when: {}, text: ["She is done. Completely, spectacularly done — belly warm and round, she doesn't move for several minutes. \"Okay,\" she says finally. \"I see why you keep doing this.\""] },
]);

registerPool('session.fullness.athlete.f5', [
  { when: {}, text: ["{session.fullness.athlete.f5._f1}"] },
]);
registerPool('session.fullness.influencer.f0._f1', [
  { when: {}, text: ["{subject.name} has stopped filming. She eats privately when she eats like this. You are the only audience."] },
]);

registerPool('session.fullness.influencer.f0', [
  { when: {}, text: ["{session.fullness.influencer.f0._f1}"] },
]);
registerPool('session.fullness.influencer.f1._f1', [
  { when: {}, text: ["Her eyes close sometimes between bites. She is genuinely enjoying this in a way that doesn't translate to content."] },
]);

registerPool('session.fullness.influencer.f1', [
  { when: {}, text: ["{session.fullness.influencer.f1._f1}"] },
]);
registerPool('session.fullness.influencer.f2._f1', [
  { when: {}, text: ["\"Don't document this,\" she says, without hostility. You aren't. She eats her enormous plate naturally, without any persona."] },
]);

registerPool('session.fullness.influencer.f2', [
  { when: {}, text: ["{session.fullness.influencer.f2._f1}"] },
]);
registerPool('session.fullness.influencer.f3._f1', [
  { when: {}, text: ["She is full and she looks it and she has long since stopped caring about any of that. \"God,\" she says, \"this is good.\" She means the eating as much as the food."] },
]);

registerPool('session.fullness.influencer.f3', [
  { when: {}, text: ["{session.fullness.influencer.f3._f1}"] },
]);
registerPool('session.fullness.influencer.f4._f1', [
  { when: {}, text: ["{subject.name} has abandoned every trained instinct about portion size and imagery. She is simply, enormously, contentedly eating."] },
]);

registerPool('session.fullness.influencer.f4', [
  { when: {}, text: ["{session.fullness.influencer.f4._f1}"] },
]);
registerPool('session.fullness.influencer.f5._f1', [
  { when: {}, text: ["She is sprawled slightly, her bloated middle pressing visibly against her top, and she has the expression of someone who has just discovered something important."] },
]);

registerPool('session.fullness.influencer.f5._f2', [
  { when: {}, text: [". \"This is who I actually am,\" she says."] },
]);

registerPool('session.fullness.influencer.f5', [
  { when: {}, text: ["{session.fullness.influencer.f5._f1} {session.fullness.influencer.f5._f2}"] },
]);
registerPool('session.fullness.gamer.f0._f1', [
  { when: {}, text: ["{subject.name} eats one-handed. Efficient. She's been doing this for years."] },
]);

registerPool('session.fullness.gamer.f0', [
  { when: {}, text: ["{session.fullness.gamer.f0._f1}"] },
]);
registerPool('session.fullness.gamer.f1._f1', [
  { when: {}, text: ["Both hands on the food now. Too full for multitasking."] },
]);

registerPool('session.fullness.gamer.f1', [
  { when: {}, text: ["{session.fullness.gamer.f1._f1}"] },
]);
registerPool('session.fullness.gamer.f2._f1', [
  { when: {}, text: ["\"I don't usually eat this much at once,\" she says, eating this much at once. \"Usually it's spread out over twelve hours.\""] },
]);

registerPool('session.fullness.gamer.f2', [
  { when: {}, text: ["{session.fullness.gamer.f2._f1}"] },
]);
registerPool('session.fullness.gamer.f3._f1', [
  { when: {}, text: ["She has gone quiet and focused — the specific way she gets during difficult sections. She is not going to lose this."] },
]);

registerPool('session.fullness.gamer.f3', [
  { when: {}, text: ["{session.fullness.gamer.f3._f1}"] },
]);
registerPool('session.fullness.gamer.f4._f1', [
  { when: {}, text: ["{subject.name} is breathing through her mouth slightly. Her belly is visibly round, pressing the table edge. She adjusts, keeps eating."] },
]);

registerPool('session.fullness.gamer.f4', [
  { when: {}, text: ["{session.fullness.gamer.f4._f1}"] },
]);
registerPool('session.fullness.gamer.f5._f1', [
  { when: {}, text: ["She rests her controller on her enormous middle — it fits perfectly there, which makes her laugh quietly. \"New setup,\" she says."] },
]);

registerPool('session.fullness.gamer.f5', [
  { when: {}, text: ["{session.fullness.gamer.f5._f1}"] },
]);
registerPool('session.fullness.quiet.f0._f1', [
  { when: {}, text: ["{subject.name} eats in the comfortable silence she prefers. She is very much in her element."] },
]);

registerPool('session.fullness.quiet.f0', [
  { when: {}, text: ["{session.fullness.quiet.f0._f1}"] },
]);
registerPool('session.fullness.quiet.f1._f1', [
  { when: {}, text: ["She doesn't say anything. She doesn't need to. She just eats."] },
]);

registerPool('session.fullness.quiet.f1', [
  { when: {}, text: ["{session.fullness.quiet.f1._f1}"] },
]);
registerPool('session.fullness.quiet.f2._f1', [
  { when: {}, text: ["She presses her hand against her belly once — not checking, just feeling. Then she keeps eating."] },
]);

registerPool('session.fullness.quiet.f2', [
  { when: {}, text: ["{session.fullness.quiet.f2._f1}"] },
]);
registerPool('session.fullness.quiet.f3._f1', [
  { when: {}, text: ["\"I'm full,\" {subject.name} says quietly. A pause. \"Keep going?\" She means: will you keep feeding her. The answer is yes."] },
]);

registerPool('session.fullness.quiet.f3', [
  { when: {}, text: ["{session.fullness.quiet.f3._f1}"] },
]);
registerPool('session.fullness.quiet.f4._f1', [
  { when: {}, text: ["She has found a rhythm in being overfull. Slow, careful bites. Long pauses that aren't stopping. She trusts you to know."] },
]);

registerPool('session.fullness.quiet.f4', [
  { when: {}, text: ["{session.fullness.quiet.f4._f1}"] },
]);
registerPool('session.fullness.quiet.f5._f1', [
  { when: {}, text: ["{subject.name} sits with her hands resting on her round, full belly, in a silence that is completely comfortable. \"Thank you,\" she says eventually. She means a lot of things at once."] },
]);

registerPool('session.fullness.quiet.f5', [
  { when: {}, text: ["{session.fullness.quiet.f5._f1}"] },
]);
registerPool('session.fullness.sorority.f0._f1', [
  { when: {}, text: ["{subject.name} eats comfortably, the way she does at every party — like she's exactly where she should be."] },
]);

registerPool('session.fullness.sorority.f0', [
  { when: {}, text: ["{session.fullness.sorority.f0._f1}"] },
]);
registerPool('session.fullness.sorority.f1._f1', [
  { when: {}, text: ["She's starting to slow, but she keeps up a running commentary about the food. Every bite gets a verdict. All verdicts are positive."] },
]);

registerPool('session.fullness.sorority.f1', [
  { when: {}, text: ["{session.fullness.sorority.f1._f1}"] },
]);
registerPool('session.fullness.sorority.f2._f1', [
  { when: {}, text: ["\"Okay this is genuinely a lot,\" she says. She takes another bite. \"Like genuinely a lot.\" Another bite. \"Amazing though.\""] },
]);

registerPool('session.fullness.sorority.f2', [
  { when: {}, text: ["{session.fullness.sorority.f2._f1}"] },
]);
registerPool('session.fullness.sorority.f3._f1', [
  { when: {}, text: ["Her belly is noticeably round now and pressing at her waistband. She undoes the top button of her jeans without comment. \"So much better,\" she announces."] },
]);

registerPool('session.fullness.sorority.f3', [
  { when: {}, text: ["{session.fullness.sorority.f3._f1}"] },
]);
registerPool('session.fullness.sorority.f4._f1', [
  { when: {}, text: ["{subject.name} is in deeply committed territory. Her belly is enormous and round and she keeps patting it absently between bites like she's checking in with it."] },
]);

registerPool('session.fullness.sorority.f4', [
  { when: {}, text: ["{session.fullness.sorority.f4._f1}"] },
]);
registerPool('session.fullness.sorority.f5._f1', [
  { when: {}, text: ["She has eaten everything. She is enormous with it. She puts both hands flat on her huge belly and grins. \"Okay,\" she says, \"this might be my best night.\""] },
]);

registerPool('session.fullness.sorority.f5', [
  { when: {}, text: ["{session.fullness.sorority.f5._f1}"] },
]);
registerPool('session.fullness.artsy.f0._f1', [
  { when: {}, text: ["{subject.name} eats slowly, with attention — the way she experiences everything. She is tasting each bite properly."] },
]);

registerPool('session.fullness.artsy.f0', [
  { when: {}, text: ["{session.fullness.artsy.f0._f1}"] },
]);
registerPool('session.fullness.artsy.f1._f1', [
  { when: {}, text: ["She's gone quiet in a particular way, the way she gets when she's absorbing something. The food is its own kind of sensation."] },
]);

registerPool('session.fullness.artsy.f1', [
  { when: {}, text: ["{session.fullness.artsy.f1._f1}"] },
]);
registerPool('session.fullness.artsy.f2._f1', [
  { when: {}, text: ["\"This is very good,\" she says, with the precision of someone who means the experience, not just the food. She keeps eating."] },
]);

registerPool('session.fullness.artsy.f2', [
  { when: {}, text: ["{session.fullness.artsy.f2._f1}"] },
]);
registerPool('session.fullness.artsy.f3._f1', [
  { when: {}, text: ["Her belly is soft and round and she rests her hand on it like a subject she's considering painting. She keeps eating with the other hand."] },
]);

registerPool('session.fullness.artsy.f3', [
  { when: {}, text: ["{session.fullness.artsy.f3._f1}"] },
]);
registerPool('session.fullness.artsy.f4._f1', [
  { when: {}, text: ["{subject.name} has found something in this — she eats overfull with a kind of intense, interior focus, like she's inside a feeling she wants to understand completely."] },
]);

registerPool('session.fullness.artsy.f4', [
  { when: {}, text: ["{session.fullness.artsy.f4._f1}"] },
]);
registerPool('session.fullness.artsy.f5._f1', [
  { when: {}, text: ["She is still for a long time after. Both hands on her enormous full belly. \"I want to paint this,\" she says quietly. \"Not me. This. This feeling.\""] },
]);

registerPool('session.fullness.artsy.f5', [
  { when: {}, text: ["{session.fullness.artsy.f5._f1}"] },
]);
registerPool('session.fullness.overachiever.f0._f1', [
  { when: {}, text: ["{subject.name} has made a list of what she's eating. Nutritional content. Macros. She is eating it all anyway."] },
]);

registerPool('session.fullness.overachiever.f0', [
  { when: {}, text: ["{session.fullness.overachiever.f0._f1}"] },
]);
registerPool('session.fullness.overachiever.f1._f1', [
  { when: {}, text: ["She has abandoned the list. She is just eating now. This counts as self-care. She has decided."] },
]);

registerPool('session.fullness.overachiever.f1', [
  { when: {}, text: ["{session.fullness.overachiever.f1._f1}"] },
]);
registerPool('session.fullness.overachiever.f2._f1', [
  { when: {}, text: ["\"I have consumed significantly more than my target intake,\" {subject.name} announces. She reaches for more. \"Adjusting the target upward.\""] },
]);

registerPool('session.fullness.overachiever.f2', [
  { when: {}, text: ["{session.fullness.overachiever.f2._f1}"] },
]);
registerPool('session.fullness.overachiever.f3._f1', [
  { when: {}, text: ["She is full in a way that would alarm her previous self. She checks in with herself, adjusts her assessment of what she can handle, and keeps going."] },
]);

registerPool('session.fullness.overachiever.f3', [
  { when: {}, text: ["{session.fullness.overachiever.f3._f1}"] },
]);
registerPool('session.fullness.overachiever.f4._f1', [
  { when: {}, text: ["{subject.name} is overfull by any metric and she knows every metric. She has simply decided the metrics don't apply tonight."] },
]);

registerPool('session.fullness.overachiever.f4', [
  { when: {}, text: ["{session.fullness.overachiever.f4._f1}"] },
]);
registerPool('session.fullness.overachiever.f5._f1', [
  { when: {}, text: ["She rests back and breathes carefully, both hands on her vast, tight belly. \"New personal record,\" she says. \"I'm going to count this as an achievement.\""] },
]);

registerPool('session.fullness.overachiever.f5', [
  { when: {}, text: ["{session.fullness.overachiever.f5._f1}"] },
]);
registerPool('session.fullness.transfer.f0._f1', [
  { when: {}, text: ["{subject.name} eats with the enthusiasm of someone who has discovered something wonderful about this campus."] },
]);

registerPool('session.fullness.transfer.f0', [
  { when: {}, text: ["{session.fullness.transfer.f0._f1}"] },
]);
registerPool('session.fullness.transfer.f1._f1', [
  { when: {}, text: ["\"We didn't have anything like this back home,\" she says, taking another enormous bite. \"I mean we had food. Not like this.\""] },
]);

registerPool('session.fullness.transfer.f1', [
  { when: {}, text: ["{session.fullness.transfer.f1._f1}"] },
]);
registerPool('session.fullness.transfer.f2._f1', [
  { when: {}, text: ["She is full and she keeps going, the way she approaches everything new here — thoroughly, without reservation."] },
]);

registerPool('session.fullness.transfer.f2', [
  { when: {}, text: ["{session.fullness.transfer.f2._f1}"] },
]);
registerPool('session.fullness.transfer.f3._f1', [
  { when: {}, text: ["Her belly is round and soft and she pats it happily. \"I'm so glad I transferred,\" she says. She means many things at once."] },
]);

registerPool('session.fullness.transfer.f3', [
  { when: {}, text: ["{session.fullness.transfer.f3._f1}"] },
]);
registerPool('session.fullness.transfer.f4._f1', [
  { when: {}, text: ["{subject.name} is seriously, impressively full and she keeps eating with the dedication of someone who doesn't want to miss anything."] },
]);

registerPool('session.fullness.transfer.f4', [
  { when: {}, text: ["{session.fullness.transfer.f4._f1}"] },
]);
registerPool('session.fullness.transfer.f5._f1', [
  { when: {}, text: ["She is enormous with food and deeply, completely happy about it. \"I feel like I'm home,\" she says. It's unclear whether she means here or in her body. Both, probably."] },
]);

registerPool('session.fullness.transfer.f5', [
  { when: {}, text: ["{session.fullness.transfer.f5._f1}"] },
]);

registerPool('session.fullness', [
  { when: { archetype: "default", fullnessStage: [0] }, text: ['{session.fullness.default.f0}'] },
  { when: { archetype: "default", fullnessStage: [1] }, text: ['{session.fullness.default.f1}'] },
  { when: { archetype: "default", fullnessStage: [2] }, text: ['{session.fullness.default.f2}'] },
  { when: { archetype: "default", fullnessStage: [3] }, text: ['{session.fullness.default.f3}'] },
  { when: { archetype: "default", fullnessStage: [4] }, text: ['{session.fullness.default.f4}'] },
  { when: { archetype: "default", fullnessStage: [5] }, text: ['{session.fullness.default.f5}'] },
  { when: { archetype: "cheerleader", fullnessStage: [0] }, text: ['{session.fullness.cheerleader.f0}'] },
  { when: { archetype: "cheerleader", fullnessStage: [1] }, text: ['{session.fullness.cheerleader.f1}'] },
  { when: { archetype: "cheerleader", fullnessStage: [2] }, text: ['{session.fullness.cheerleader.f2}'] },
  { when: { archetype: "cheerleader", fullnessStage: [3] }, text: ['{session.fullness.cheerleader.f3}'] },
  { when: { archetype: "cheerleader", fullnessStage: [4] }, text: ['{session.fullness.cheerleader.f4}'] },
  { when: { archetype: "cheerleader", fullnessStage: [5] }, text: ['{session.fullness.cheerleader.f5}'] },
  { when: { archetype: "bookworm", fullnessStage: [0] }, text: ['{session.fullness.bookworm.f0}'] },
  { when: { archetype: "bookworm", fullnessStage: [1] }, text: ['{session.fullness.bookworm.f1}'] },
  { when: { archetype: "bookworm", fullnessStage: [2] }, text: ['{session.fullness.bookworm.f2}'] },
  { when: { archetype: "bookworm", fullnessStage: [3] }, text: ['{session.fullness.bookworm.f3}'] },
  { when: { archetype: "bookworm", fullnessStage: [4] }, text: ['{session.fullness.bookworm.f4}'] },
  { when: { archetype: "bookworm", fullnessStage: [5] }, text: ['{session.fullness.bookworm.f5}'] },
  { when: { archetype: "athlete", fullnessStage: [0] }, text: ['{session.fullness.athlete.f0}'] },
  { when: { archetype: "athlete", fullnessStage: [1] }, text: ['{session.fullness.athlete.f1}'] },
  { when: { archetype: "athlete", fullnessStage: [2] }, text: ['{session.fullness.athlete.f2}'] },
  { when: { archetype: "athlete", fullnessStage: [3] }, text: ['{session.fullness.athlete.f3}'] },
  { when: { archetype: "athlete", fullnessStage: [4] }, text: ['{session.fullness.athlete.f4}'] },
  { when: { archetype: "athlete", fullnessStage: [5] }, text: ['{session.fullness.athlete.f5}'] },
  { when: { archetype: "influencer", fullnessStage: [0] }, text: ['{session.fullness.influencer.f0}'] },
  { when: { archetype: "influencer", fullnessStage: [1] }, text: ['{session.fullness.influencer.f1}'] },
  { when: { archetype: "influencer", fullnessStage: [2] }, text: ['{session.fullness.influencer.f2}'] },
  { when: { archetype: "influencer", fullnessStage: [3] }, text: ['{session.fullness.influencer.f3}'] },
  { when: { archetype: "influencer", fullnessStage: [4] }, text: ['{session.fullness.influencer.f4}'] },
  { when: { archetype: "influencer", fullnessStage: [5] }, text: ['{session.fullness.influencer.f5}'] },
  { when: { archetype: "gamer", fullnessStage: [0] }, text: ['{session.fullness.gamer.f0}'] },
  { when: { archetype: "gamer", fullnessStage: [1] }, text: ['{session.fullness.gamer.f1}'] },
  { when: { archetype: "gamer", fullnessStage: [2] }, text: ['{session.fullness.gamer.f2}'] },
  { when: { archetype: "gamer", fullnessStage: [3] }, text: ['{session.fullness.gamer.f3}'] },
  { when: { archetype: "gamer", fullnessStage: [4] }, text: ['{session.fullness.gamer.f4}'] },
  { when: { archetype: "gamer", fullnessStage: [5] }, text: ['{session.fullness.gamer.f5}'] },
  { when: { archetype: "quiet", fullnessStage: [0] }, text: ['{session.fullness.quiet.f0}'] },
  { when: { archetype: "quiet", fullnessStage: [1] }, text: ['{session.fullness.quiet.f1}'] },
  { when: { archetype: "quiet", fullnessStage: [2] }, text: ['{session.fullness.quiet.f2}'] },
  { when: { archetype: "quiet", fullnessStage: [3] }, text: ['{session.fullness.quiet.f3}'] },
  { when: { archetype: "quiet", fullnessStage: [4] }, text: ['{session.fullness.quiet.f4}'] },
  { when: { archetype: "quiet", fullnessStage: [5] }, text: ['{session.fullness.quiet.f5}'] },
  { when: { archetype: "sorority", fullnessStage: [0] }, text: ['{session.fullness.sorority.f0}'] },
  { when: { archetype: "sorority", fullnessStage: [1] }, text: ['{session.fullness.sorority.f1}'] },
  { when: { archetype: "sorority", fullnessStage: [2] }, text: ['{session.fullness.sorority.f2}'] },
  { when: { archetype: "sorority", fullnessStage: [3] }, text: ['{session.fullness.sorority.f3}'] },
  { when: { archetype: "sorority", fullnessStage: [4] }, text: ['{session.fullness.sorority.f4}'] },
  { when: { archetype: "sorority", fullnessStage: [5] }, text: ['{session.fullness.sorority.f5}'] },
  { when: { archetype: "artsy", fullnessStage: [0] }, text: ['{session.fullness.artsy.f0}'] },
  { when: { archetype: "artsy", fullnessStage: [1] }, text: ['{session.fullness.artsy.f1}'] },
  { when: { archetype: "artsy", fullnessStage: [2] }, text: ['{session.fullness.artsy.f2}'] },
  { when: { archetype: "artsy", fullnessStage: [3] }, text: ['{session.fullness.artsy.f3}'] },
  { when: { archetype: "artsy", fullnessStage: [4] }, text: ['{session.fullness.artsy.f4}'] },
  { when: { archetype: "artsy", fullnessStage: [5] }, text: ['{session.fullness.artsy.f5}'] },
  { when: { archetype: "overachiever", fullnessStage: [0] }, text: ['{session.fullness.overachiever.f0}'] },
  { when: { archetype: "overachiever", fullnessStage: [1] }, text: ['{session.fullness.overachiever.f1}'] },
  { when: { archetype: "overachiever", fullnessStage: [2] }, text: ['{session.fullness.overachiever.f2}'] },
  { when: { archetype: "overachiever", fullnessStage: [3] }, text: ['{session.fullness.overachiever.f3}'] },
  { when: { archetype: "overachiever", fullnessStage: [4] }, text: ['{session.fullness.overachiever.f4}'] },
  { when: { archetype: "overachiever", fullnessStage: [5] }, text: ['{session.fullness.overachiever.f5}'] },
  { when: { archetype: "transfer", fullnessStage: [0] }, text: ['{session.fullness.transfer.f0}'] },
  { when: { archetype: "transfer", fullnessStage: [1] }, text: ['{session.fullness.transfer.f1}'] },
  { when: { archetype: "transfer", fullnessStage: [2] }, text: ['{session.fullness.transfer.f2}'] },
  { when: { archetype: "transfer", fullnessStage: [3] }, text: ['{session.fullness.transfer.f3}'] },
  { when: { archetype: "transfer", fullnessStage: [4] }, text: ['{session.fullness.transfer.f4}'] },
  { when: { archetype: "transfer", fullnessStage: [5] }, text: ['{session.fullness.transfer.f5}'] },
  { when: {}, text: ['{subject.name} eats steadily, warmth spreading through her middle.'] },
]);
