// The Squad — Lead: A2 Psych | Support: A7 Artisan
// Talk suggest topics — migrated from talkDialogue.js (Phase C.2).
// Regenerate: node scripts/generateTalkSuggest.mjs
import { registerPool } from '../engine.js';
import './talkEncourage.js'; // talk.moodOpener

registerPool('talk.suggest_indulgence.b00', [
  { when: {}, text: ["{talk.suggest_indulgence.b00._f1}\n\n{talk.suggest_indulgence.b00._f2} {talk.suggest_indulgence.b00._f3}\n\n{talk.suggest_indulgence.b00._f4}"] },
]);
registerPool('talk.suggest_indulgence.b01', [
  { when: {}, text: ["{talk.suggest_indulgence.b01._f1}\n\n{talk.suggest_indulgence.b01._f2} {talk.suggest_indulgence.b01._f3}"] },
]);
registerPool('talk.suggest_indulgence.b10', [
  { when: {}, text: ["{talk.suggest_indulgence.b10._f1} {talk.suggest_indulgence.b10._f2}\n\n{talk.suggest_indulgence.b10._f3}"] },
]);
registerPool('talk.suggest_indulgence.b11', [
  { when: {}, text: ["{talk.suggest_indulgence.b11._f1} {talk.suggest_indulgence.b11._f2}\n\n{talk.suggest_indulgence.b11._f3}"] },
]);
registerPool('talk.suggest_indulgence.b20', [
  { when: {}, text: ["{talk.suggest_indulgence.b20._f1}\n\n{talk.suggest_indulgence.b20._f2} {talk.suggest_indulgence.b20._f3}"] },
]);
registerPool('talk.suggest_indulgence.b21', [
  { when: {}, text: ["{talk.suggest_indulgence.b21._f1} {talk.suggest_indulgence.b21._f2}\n\n{talk.suggest_indulgence.b21._f3}"] },
]);
registerPool('talk.suggest_indulgence.b00._f1', [
  { when: {}, text: ["You let the idea drift into the conversation, soft as smoke — food, warmth, the pleasure of filling herself. {subject.name} blinks. Her pupils dilate slightly."] },
]);
registerPool('talk.suggest_indulgence.b00._f2', [
  { when: {}, text: ["\"...I was just thinking I'm hungry,\" she says, puzzled by her own timing. At {subject.lbs} lbs her body has learned to respond faster than her mind. Her hand moves to her belly. \"That's weird."] },
]);
registerPool('talk.suggest_indulgence.b00._f3', [
  { when: {}, text: [". I just ate.\" She laughs, uncertain. \"Didn't I?\""] },
]);
registerPool('talk.suggest_indulgence.b00._f4', [
  { when: {}, text: ["The suggestion settles behind her eyes like a seed in warm soil. She doesn't know you planted it. She will, soon enough."] },
]);
registerPool('talk.suggest_indulgence.b01._f1', [
  { when: {}, text: ["The suggestion lands before you've finished shaping it. {subject.name} loses her thread mid-sentence — words dissolving into a soft, distracted hunger."] },
]);
registerPool('talk.suggest_indulgence.b01._f2', [
  { when: {}, text: ["\"Sorry — what was I — do you smell food?\" She inhales. Her belly rumbles, audible in the quiet office. At {subject.lbs} lbs she's still thin enough that the sound surprises her."] },
]);
registerPool('talk.suggest_indulgence.b01._f3', [
  { when: {}, text: [". It won't surprise her for long."] },
]);
registerPool('talk.suggest_indulgence.b10._f1', [
  { when: {}, text: ["The suggestion lands on prepared ground. \"You know what,\" {subject.name} says, already standing — belly swaying, thighs brushing, body eager before thought catches up."] },
]);
registerPool('talk.suggest_indulgence.b10._f2', [
  { when: {}, text: [". \"I'm going to get something to eat. Don't know why it feels urgent. It just does.\""] },
]);
registerPool('talk.suggest_indulgence.b10._f3', [
  { when: {}, text: ["At {subject.lbs} lbs she doesn't fight the pull anymore. She leans into it. \"Want anything?\" she asks, already at the door. \"I'm getting a lot. A lot a lot.\""] },
]);
registerPool('talk.suggest_indulgence.b11._f1', [
  { when: {}, text: ["{subject.name} nods along to words you didn't quite say out loud. \"Mm. Yeah. Second dinner. That's — yeah.\" Her {subject.lbs}-lb body has learned this language. Hunger isn't an enemy."] },
]);
registerPool('talk.suggest_indulgence.b11._f2', [
  { when: {}, text: [". It's a direction."] },
]);
registerPool('talk.suggest_indulgence.b11._f3', [
  { when: {}, text: ["She's reaching for her bag, her coat, her keys. \"Third dinner, maybe. Is that crazy?\" She smiles. \"Don't answer. I'm going anyway.\""] },
]);
registerPool('talk.suggest_indulgence.b20._f1', [
  { when: {}, text: ["There's barely anything left to suggest to. {subject.name} catches the shape of your intent before you finish it and smiles — slow, trusting, hungry. \"Whatever it is — yes.\""] },
]);
registerPool('talk.suggest_indulgence.b20._f2', [
  { when: {}, text: ["At {subject.lbs} lbs she is vast and warm and completely attuned to you. \"You don't even have to say it anymore,\" she murmurs. \"I feel it."] },
]);
registerPool('talk.suggest_indulgence.b20._f3', [
  { when: {}, text: [". Like a hand on my belly telling me to eat.\" She presses your palm there. \"Always eat.\""] },
]);
registerPool('talk.suggest_indulgence.b21._f1', [
  { when: {}, text: ["{subject.name}'s eyes go soft and distant for a half-second, then refocus on you with total trust."] },
]);
registerPool('talk.suggest_indulgence.b21._f2', [
  { when: {}, text: [". \"Tell me what you want me to do.\" At {subject.lbs} lbs her body is an instrument you've tuned — responsive, eager, broken in beautifully."] },
]);
registerPool('talk.suggest_indulgence.b21._f3', [
  { when: {}, text: ["\"I'll do it,\" she says. \"Whatever it is. Feed me. Grow me. Watch me.\" She leans forward, belly pressing against the desk. \"Command me.\""] },
]);
registerPool('talk.suggest_indulgence', [
  { when: {"corruption":[0]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b00}","{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b01}"] },
  { when: {"corruption":[1]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b10}","{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b11}"] },
  { when: {"corruption":[2]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b20}","{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b21}"] },
  { when: {}, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_indulgence.b00}"] },
]);

registerPool('talk.suggest_growth.b00', [
  { when: {}, text: ["{talk.suggest_growth.b00._f1} {talk.suggest_growth.b00._f2}\n\n{talk.suggest_growth.b00._f3} {talk.suggest_growth.b00._f4}"] },
]);
registerPool('talk.suggest_growth.b01', [
  { when: {}, text: ["{talk.suggest_growth.b01._f1}\n\n{talk.suggest_growth.b01._f2} {talk.suggest_growth.b01._f3}"] },
]);
registerPool('talk.suggest_growth.b10', [
  { when: {}, text: ["{talk.suggest_growth.b10._f1} {talk.suggest_growth.b10._f2}\n\n{talk.suggest_growth.b10._f3}"] },
]);
registerPool('talk.suggest_growth.b11', [
  { when: {}, text: ["{talk.suggest_growth.b11._f1}\n\n{talk.suggest_growth.b11._f2}"] },
]);
registerPool('talk.suggest_growth.b20', [
  { when: {}, text: ["{talk.suggest_growth.b20._f1} {talk.suggest_growth.b20._f2}\n\n{talk.suggest_growth.b20._f3}"] },
]);
registerPool('talk.suggest_growth.b21', [
  { when: {}, text: ["{talk.suggest_growth.b21._f1}\n\n{talk.suggest_growth.b21._f2} {talk.suggest_growth.b21._f3}"] },
]);
registerPool('talk.suggest_growth.b00._f1', [
  { when: {}, text: ["\"Meant for… more?\" {subject.name} repeats. She looks down at herself — {subject.lbs} lbs of early softness — and for a moment her expression isn't denial. It's vertigo."] },
]);
registerPool('talk.suggest_growth.b00._f2', [
  { when: {}, text: [". The floor tilting under a new idea."] },
]);
registerPool('talk.suggest_growth.b00._f3', [
  { when: {}, text: ["\"I've never—\" She presses her hand to her belly. \"Nobody's ever said it like that. Like it's a good thing. Like I'm supposed to—\" She can't finish. Her cheeks are pink. Her breathing is fast."] },
]);
registerPool('talk.suggest_growth.b00._f4', [
  { when: {}, text: [". She doesn't tell you to stop."] },
]);
registerPool('talk.suggest_growth.b01._f1', [
  { when: {}, text: ["{subject.name} laughs it off. Mostly. The laugh dies a little early, and her hand drifts to the new softness at her side as if checking the claim."] },
]);
registerPool('talk.suggest_growth.b01._f2', [
  { when: {}, text: ["\"That's ridiculous,\" she murmurs. But she's still touching herself. Still feeling the weight. At {subject.lbs} lbs \"more\" is still abstract — a direction, not a destination."] },
]);
registerPool('talk.suggest_growth.b01._f3', [
  { when: {}, text: [". She's starting to want the destination."] },
]);
registerPool('talk.suggest_growth.b10._f1', [
  { when: {}, text: ["{subject.name} is quiet for a long moment. \"I think about that,\" she admits. \"Being… bigger."] },
]);
registerPool('talk.suggest_growth.b10._f2', [
  { when: {}, text: [". On purpose.\" At {subject.lbs} lbs her body has already begun the argument — belly rounding, thighs thickening, appetite growing."] },
]);
registerPool('talk.suggest_growth.b10._f3', [
  { when: {}, text: ["\"Does that make me strange?\" She doesn't actually want it to mean no. Her eyes search yours. \"I dream about it sometimes. Waking up heavier. Softer. More.\" She exhales. \"More of everything.\""] },
]);
registerPool('talk.suggest_growth.b11._f1', [
  { when: {}, text: ["\"More,\" {subject.name} echoes, tasting the word. At {subject.lbs} lbs she is thick and warm and no longer surprised by her own hunger. \"You keep saying it like a destination.\""] },
]);
registerPool('talk.suggest_growth.b11._f2', [
  { when: {}, text: ["She doesn't say it doesn't sound like one. She runs her hands over her belly, her hips, feeling the weight of herself. \"I want to arrive,\" she whispers."] },
]);
registerPool('talk.suggest_growth.b20._f1', [
  { when: {}, text: ["\"I know,\" {subject.name} says, before you've finished. At {subject.lbs} lbs she is enormous and certain. \"I've known for a while."] },
]);
registerPool('talk.suggest_growth.b20._f2', [
  { when: {}, text: [". There's a version of me I haven't reached yet, and she's—\" She spreads her hands over her vast belly. \"—enormous. And she's happy.\""] },
]);
registerPool('talk.suggest_growth.b20._f3', [
  { when: {}, text: ["Her certainty fills the room. \"You see her too,\" she murmurs. \"That's why you keep saying it.\""] },
]);
registerPool('talk.suggest_growth.b21._f1', [
  { when: {}, text: ["{subject.name} takes your hand and puts it on the warm crest of her belly — {subject.lbs} lbs of soft, living proof. \"This is the project,\" she says. \"Talk to it, not me.\""] },
]);
registerPool('talk.suggest_growth.b21._f2', [
  { when: {}, text: ["Her flesh yields under your palm, warm and heavy and still growing. \"Tell it there's more coming,\" she whispers. \"Tell it I'm not done. Tell it—\" She closes her eyes."] },
]);
registerPool('talk.suggest_growth.b21._f3', [
  { when: {}, text: [". \"—tell it I'm beautiful like this.\""] },
]);
registerPool('talk.suggest_growth', [
  { when: {"corruption":[0]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b00}","{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b01}"] },
  { when: {"corruption":[1]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b10}","{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b11}"] },
  { when: {"corruption":[2]}, priority: 1, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b20}","{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b21}"] },
  { when: {}, text: ["{talk.moodOpener|suffix:\n\n}{talk.suggest_growth.b00}"] },
]);

