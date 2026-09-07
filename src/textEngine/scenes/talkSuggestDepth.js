// The Squad — Lead: A2 Psych | Support: A5 Editor
// Wildcard depth for talk.suggest_* fragment pools (Pass 24).
// Loaded after talkSuggest.js — adds variants without touching the generator output.
import { registerModuleVariants } from '../engine.js';

const OPENER = '{talk.moodOpener|suffix:\n\n}';

function pad(pool, lines) {
  registerModuleVariants(pool, [{ when: {}, text: lines }]);
}

// ── suggest_indulgence — corruption 0 ─────────────────────────

pad('talk.suggest_indulgence.b00._f1', [
  `You mention appetite the way you'd mention weather — casually, offhand. {subject.name} blinks. Something in her expression sharpens with hunger she didn't name aloud.`,
  `The conversation turns warm and easy toward food. {subject.name} goes still for half a beat, then smiles like the idea arrived on its own.`,
]);
pad('talk.suggest_indulgence.b00._f2', [
  `"I was literally just getting hungry," she says, puzzled. At {subject.lbs} lbs her body answers faster than her pride. Her hand finds her middle. "That's —"`,
  `"Funny timing," she murmurs. At {subject.lbs} lbs the pull is newer than she'd admit. Her fingers press the softening at her waist. "I was thinking about—"`,
]);
pad('talk.suggest_indulgence.b00._f3', [
  `". Right?" Her belly rumbles softly, voting.`,
  `". Didn't I?" She laughs once, uncertain, already reaching.`,
]);
pad('talk.suggest_indulgence.b00._f4', [
  `Heat rises in her cheeks — not embarrassment, exactly. Anticipation wearing the wrong name.`,
  `She looks at you like you're the first person to say hunger out loud without making it shameful.`,
]);
pad('talk.suggest_indulgence.b01._f1', [
  `The suggestion lands mid-sentence. {subject.name} loses her thread — words dissolving into a soft, distracted pull toward food.`,
  `{subject.name} stops talking. Her attention slides sideways, hungry and immediate, as if the room filled with aroma.`,
]);
pad('talk.suggest_indulgence.b01._f2', [
  `"Sorry — what was I— do you smell that?" She inhales. Her belly rumbles in the quiet office. At {subject.lbs} lbs the sound still surprises her.`,
  `"Wait." She inhales slowly. "Is someone eating nearby?" At {subject.lbs} lbs her stomach answers before her mind does.`,
]);
pad('talk.suggest_indulgence.b01._f3', [
  `. It won't surprise her for long.`,
  `. She presses her palm to her middle, feeling the truth of it.`,
]);

pad('talk.suggest_indulgence.b00', [
  `{talk.suggest_indulgence.b00._f1} {talk.suggest_indulgence.b00._f2}\n\n{talk.suggest_indulgence.b00._f3}\n\n{talk.suggest_indulgence.b00._f4}`,
  `{talk.suggest_indulgence.b00._f1}\n\n{talk.suggest_indulgence.b00._f3} {talk.suggest_indulgence.b00._f2}\n\n{talk.suggest_indulgence.b00._f4}`,
]);
pad('talk.suggest_indulgence.b01', [
  `{talk.suggest_indulgence.b01._f1}\n\n{talk.suggest_indulgence.b01._f3} {talk.suggest_indulgence.b01._f2}`,
  `{talk.suggest_indulgence.b01._f2} {talk.suggest_indulgence.b01._f3}\n\n{talk.suggest_indulgence.b01._f1}`,
]);

// ── suggest_indulgence — corruption 1 ─────────────────────────

pad('talk.suggest_indulgence.b10._f1', [
  `The suggestion lands on prepared ground. "You know what," {subject.name} says, already standing — belly swaying, thighs brushing, body eager before thought catches up.`,
  `"Yeah," {subject.name} says, halfway out of her chair before she notices. Her belly leads; her mind follows, amused.`,
]);
pad('talk.suggest_indulgence.b10._f2', [
  `. "I'm going to eat. Don't know why it feels urgent. It just does."`,
  `. "Food. Now. That's the whole plan." She laughs at herself and keeps standing.`,
]);
pad('talk.suggest_indulgence.b10._f3', [
  `At {subject.lbs} lbs she doesn't fight the pull anymore. "Want anything?" she asks at the door. "I'm getting a lot."`,
  `At {subject.lbs} lbs hunger is honest currency. "I'm buying enough for two moods," she says, already gone.`,
]);
pad('talk.suggest_indulgence.b11._f1', [
  `{subject.name} nods along to words you didn't quite say. "Mm. Yeah. Second dinner." At {subject.lbs} lbs hunger isn't an enemy anymore.`,
  `"Second dinner," she repeats, pleased. At {subject.lbs} lbs the phrase sounds less like a joke every week.`,
]);
pad('talk.suggest_indulgence.b11._f2', [
  `. It's a direction.`,
  `. It's the plan.`,
]);
pad('talk.suggest_indulgence.b11._f3', [
  `She grabs her bag. "Third dinner, maybe. Don't answer. I'm going."`,
  `"Keys, coat, appetite," she lists, smiling. "In that order. Maybe appetite first."`,
]);

pad('talk.suggest_indulgence.b10', [
  `{talk.suggest_indulgence.b10._f2} {talk.suggest_indulgence.b10._f1}\n\n{talk.suggest_indulgence.b10._f3}`,
  `{talk.suggest_indulgence.b10._f1}\n\n{talk.suggest_indulgence.b10._f3} {talk.suggest_indulgence.b10._f2}`,
]);
pad('talk.suggest_indulgence.b11', [
  `{talk.suggest_indulgence.b11._f1} {talk.suggest_indulgence.b11._f2}\n\n{talk.suggest_indulgence.b11._f3}`,
  `{talk.suggest_indulgence.b11._f3}\n\n{talk.suggest_indulgence.b11._f1} {talk.suggest_indulgence.b11._f2}`,
]);

// ── suggest_indulgence — corruption 2 ─────────────────────────

pad('talk.suggest_indulgence.b20._f1', [
  `There's barely anything left to suggest. {subject.name} catches your intent and smiles — slow, trusting, hungry. "Whatever it is — yes."`,
  `{subject.name} reads the shape of your want before you finish it. "Say it," she murmurs. "Or don't. I'm already hungry."`,
]);
pad('talk.suggest_indulgence.b20._f2', [
  `At {subject.lbs} lbs she is vast and attuned. "You don't have to say it anymore," she murmurs. "I feel it.`,
  `At {subject.lbs} lbs your attention lands like a hand on warm flesh. "I know that look," she says. "Feed me."`,
]);
pad('talk.suggest_indulgence.b20._f3', [
  `. Like a hand on my belly telling me to eat." She presses your palm there. "Always eat."`,
  `. Always." She guides your hand to the soft crest of her belly. "Don't make me wait."`,
]);
pad('talk.suggest_indulgence.b21._f1', [
  `{subject.name}'s eyes go soft, then refocus on you with total trust.`,
  `For a half-second {subject.name} looks distant — hungry, devoted — then she smiles like you called her home.`,
]);
pad('talk.suggest_indulgence.b21._f2', [
  `. "Tell me what you want." At {subject.lbs} lbs her body is tuned to your voice.`,
  `. "Command me." At {subject.lbs} lbs she means it without theater.`,
]);
pad('talk.suggest_indulgence.b21._f3', [
  `"Feed me. Grow me. Watch me." She leans forward, belly pressing the desk. "I'm yours to use."`,
  `"I'll do whatever you want." Her voice is low, certain. "Especially if it ends with me full."`,
]);

pad('talk.suggest_indulgence.b20', [
  `{talk.suggest_indulgence.b20._f1}\n\n{talk.suggest_indulgence.b20._f3} {talk.suggest_indulgence.b20._f2}`,
  `{talk.suggest_indulgence.b20._f2} {talk.suggest_indulgence.b20._f3}\n\n{talk.suggest_indulgence.b20._f1}`,
]);
pad('talk.suggest_indulgence.b21', [
  `{talk.suggest_indulgence.b21._f1} {talk.suggest_indulgence.b21._f2}\n\n{talk.suggest_indulgence.b21._f3}`,
  `{talk.suggest_indulgence.b21._f3}\n\n{talk.suggest_indulgence.b21._f1} {talk.suggest_indulgence.b21._f2}`,
]);

registerModuleVariants('talk.suggest_indulgence', [
  { when: {}, text: [
    `${OPENER}{talk.suggest_indulgence.b01}`,
    `${OPENER}{talk.suggest_indulgence.b10}`,
  ] },
]);

// ── suggest_growth — corruption 0 ─────────────────────────────

pad('talk.suggest_growth.b00._f1', [
  `"Meant for more?" {subject.name} repeats. At {subject.lbs} lbs the idea tilts the floor — vertigo, not denial.`,
  `"Bigger," she echoes, testing the word. At {subject.lbs} lbs it still sounds impossible and tempting.`,
]);
pad('talk.suggest_growth.b00._f2', [
  `. The floor tilting under a new idea.`,
  `. Like a door opening she didn't know was there.`,
]);
pad('talk.suggest_growth.b00._f3', [
  `"Nobody's said it like that before." She presses her palm to her belly. "Like it's good. Like I'm supposed to—" She can't finish.`,
  `"I've never—" Her cheeks pink. Her breathing quickens. "Like I'm allowed to want—" She stops, listening to herself.`,
]);
pad('talk.suggest_growth.b00._f4', [
  `. She doesn't tell you to stop.`,
  `. She doesn't move your hand away.`,
]);
pad('talk.suggest_growth.b01._f1', [
  `{subject.name} laughs it off. Mostly. Her hand drifts to the softness at her side, checking the claim.`,
  `She tries to joke. The laugh dies early. Her fingers find new curve at her hip and stay there.`,
]);
pad('talk.suggest_growth.b01._f2', [
  `"That's ridiculous," she murmurs — but she's still touching herself. At {subject.lbs} lbs "more" is a direction now.`,
  `"You're ridiculous," she says, softer. At {subject.lbs} lbs her body doesn't feel ridiculous. It feels possible.`,
]);
pad('talk.suggest_growth.b01._f3', [
  `. She's starting to want the destination.`,
  `. She wants to know what arrives.`,
]);

pad('talk.suggest_growth.b00', [
  `{talk.suggest_growth.b00._f1} {talk.suggest_growth.b00._f2}\n\n{talk.suggest_growth.b00._f4} {talk.suggest_growth.b00._f3}`,
  `{talk.suggest_growth.b00._f3}\n\n{talk.suggest_growth.b00._f1} {talk.suggest_growth.b00._f2} {talk.suggest_growth.b00._f4}`,
]);
pad('talk.suggest_growth.b01', [
  `{talk.suggest_growth.b01._f1}\n\n{talk.suggest_growth.b01._f3} {talk.suggest_growth.b01._f2}`,
  `{talk.suggest_growth.b01._f2}\n\n{talk.suggest_growth.b01._f1} {talk.suggest_growth.b01._f3}`,
]);

// ── suggest_growth — corruption 1 ─────────────────────────────

pad('talk.suggest_growth.b10._f1', [
  `{subject.name} is quiet. "I think about being bigger. On purpose."`,
  `"Bigger," she admits, voice low. "I think about it more than I should."`,
]);
pad('talk.suggest_growth.b10._f2', [
  `. At {subject.lbs} lbs her body has already begun the argument — belly rounding, thighs thickening.`,
  `. At {subject.lbs} lbs the dream has receipts.`,
]);
pad('talk.suggest_growth.b10._f3', [
  `"Does that make me strange?" Her eyes search yours. "I dream about waking up heavier. Softer. More."`,
  `"I want more of everything," she whispers. "Is that wrong?" She already knows your answer.`,
]);
pad('talk.suggest_growth.b11._f1', [
  `"More," {subject.name} echoes. At {subject.lbs} lbs she is thick, warm, unsurprised by hunger.`,
  `"More," she says, tasting it. At {subject.lbs} lbs the word fits like a promise.`,
]);
pad('talk.suggest_growth.b11._f2', [
  `She runs her hands over belly and hips. "I want to arrive," she whispers.`,
  `"You keep saying it like a destination." She doesn't deny wanting the map.`,
]);

pad('talk.suggest_growth.b10', [
  `{talk.suggest_growth.b10._f1} {talk.suggest_growth.b10._f2}\n\n{talk.suggest_growth.b10._f3}`,
  `{talk.suggest_growth.b10._f3}\n\n{talk.suggest_growth.b10._f1} {talk.suggest_growth.b10._f2}`,
]);
pad('talk.suggest_growth.b11', [
  `{talk.suggest_growth.b11._f2}\n\n{talk.suggest_growth.b11._f1}`,
  `{talk.suggest_growth.b11._f1}\n\n{talk.suggest_growth.b11._f2}`,
]);

// ── suggest_growth — corruption 2 ─────────────────────────────

pad('talk.suggest_growth.b20._f1', [
  `"I know," {subject.name} says before you finish. At {subject.lbs} lbs she is enormous and certain.`,
  `"I've known," she murmurs. At {subject.lbs} lbs certainty sits in her like warmth.`,
]);
pad('talk.suggest_growth.b20._f2', [
  `. "There's a version of me I haven't reached — enormous. Happy." She spreads her hands over her belly.`,
  `. She cups the vast round of herself. "She's still coming. I can feel her."`,
]);
pad('talk.suggest_growth.b20._f3', [
  `"You see her too," she murmurs. "That's why you keep saying it."`,
  `"Tell me again," she says. "I like hearing the future out loud."`,
]);
pad('talk.suggest_growth.b21._f1', [
  `{subject.name} puts your hand on her belly — {subject.lbs} lbs of soft proof. "Talk to it, not me."`,
  `She guides your palm to warm flesh. "This is the project. Tell it what comes next."`,
]);
pad('talk.suggest_growth.b21._f2', [
  `Her flesh yields under your hand. "Tell it there's more coming. Tell it I'm not done."`,
  `"Tell it I'm beautiful like this," she whispers. "Then tell it there's more."`,
]);
pad('talk.suggest_growth.b21._f3', [
  `. She closes her eyes and leans into your touch.`,
  `. "Again," she breathes. "Slower."`,
]);

pad('talk.suggest_growth.b20', [
  `{talk.suggest_growth.b20._f1} {talk.suggest_growth.b20._f2}\n\n{talk.suggest_growth.b20._f3}`,
  `{talk.suggest_growth.b20._f3}\n\n{talk.suggest_growth.b20._f1} {talk.suggest_growth.b20._f2}`,
]);
pad('talk.suggest_growth.b21', [
  `{talk.suggest_growth.b21._f1}\n\n{talk.suggest_growth.b21._f2} {talk.suggest_growth.b21._f3}`,
  `{talk.suggest_growth.b21._f2}\n\n{talk.suggest_growth.b21._f3} {talk.suggest_growth.b21._f1}`,
]);

registerModuleVariants('talk.suggest_growth', [
  { when: {}, text: [
    `${OPENER}{talk.suggest_growth.b01}`,
    `${OPENER}{talk.suggest_growth.b10}`,
  ] },
]);
