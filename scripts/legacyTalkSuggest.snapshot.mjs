// Legacy talk suggest pools — source for scripts/generateTalkSuggest.mjs (Phase C.2).
function lbs(s) { return Math.round(s.lbs).toLocaleString(); }

export const SUGGEST_INDULGENCE = [
    [
      (s) => `You let the idea drift into the conversation, soft as smoke — food, warmth, the pleasure of filling herself. ${s.name} blinks. Her pupils dilate slightly.

"...I was just thinking I'm hungry," she says, puzzled by her own timing. At ${lbs(s)} lbs her body has learned to respond faster than her mind. Her hand moves to her belly. "That's weird. I just ate." She laughs, uncertain. "Didn't I?"

The suggestion settles behind her eyes like a seed in warm soil. She doesn't know you planted it. She will, soon enough.`,
      (s) => `The suggestion lands before you've finished shaping it. ${s.name} loses her thread mid-sentence — words dissolving into a soft, distracted hunger.

"Sorry — what was I — do you smell food?" She inhales. Her belly rumbles, audible in the quiet office. At ${lbs(s)} lbs she's still thin enough that the sound surprises her. It won't surprise her for long.`,
    ],
    [
      (s) => `The suggestion lands on prepared ground. "You know what," ${s.name} says, already standing — belly swaying, thighs brushing, body eager before thought catches up. "I'm going to get something to eat. Don't know why it feels urgent. It just does."

At ${lbs(s)} lbs she doesn't fight the pull anymore. She leans into it. "Want anything?" she asks, already at the door. "I'm getting a lot. A lot a lot."`,
      (s) => `${s.name} nods along to words you didn't quite say out loud. "Mm. Yeah. Second dinner. That's — yeah." Her ${lbs(s)}-lb body has learned this language. Hunger isn't an enemy. It's a direction.

She's reaching for her bag, her coat, her keys. "Third dinner, maybe. Is that crazy?" She smiles. "Don't answer. I'm going anyway."`,
    ],
    [
      (s) => `There's barely anything left to suggest to. ${s.name} catches the shape of your intent before you finish it and smiles — slow, trusting, hungry. "Whatever it is — yes."

At ${lbs(s)} lbs she is vast and warm and completely attuned to you. "You don't even have to say it anymore," she murmurs. "I feel it. Like a hand on my belly telling me to eat." She presses your palm there. "Always eat."`,
      (s) => `${s.name}'s eyes go soft and distant for a half-second, then refocus on you with total trust. "Tell me what you want me to do." At ${lbs(s)} lbs her body is an instrument you've tuned — responsive, eager, broken in beautifully.

"I'll do it," she says. "Whatever it is. Feed me. Grow me. Watch me." She leans forward, belly pressing against the desk. "Command me."`,
    ],
];

export const SUGGEST_GROWTH = [
    [
      (s) => `"Meant for… more?" ${s.name} repeats. She looks down at herself — ${lbs(s)} lbs of early softness — and for a moment her expression isn't denial. It's vertigo. The floor tilting under a new idea.

"I've never—" She presses her hand to her belly. "Nobody's ever said it like that. Like it's a good thing. Like I'm supposed to—" She can't finish. Her cheeks are pink. Her breathing is fast. She doesn't tell you to stop.`,
      (s) => `${s.name} laughs it off. Mostly. The laugh dies a little early, and her hand drifts to the new softness at her side as if checking the claim.

"That's ridiculous," she murmurs. But she's still touching herself. Still feeling the weight. At ${lbs(s)} lbs "more" is still abstract — a direction, not a destination. She's starting to want the destination.`,
    ],
    [
      (s) => `${s.name} is quiet for a long moment. "I think about that," she admits. "Being… bigger. On purpose." At ${lbs(s)} lbs her body has already begun the argument — belly rounding, thighs thickening, appetite growing.

"Does that make me strange?" She doesn't actually want it to mean no. Her eyes search yours. "I dream about it sometimes. Waking up heavier. Softer. More." She exhales. "More of everything."`,
      (s) => `"More," ${s.name} echoes, tasting the word. At ${lbs(s)} lbs she is thick and warm and no longer surprised by her own hunger. "You keep saying it like a destination."

She doesn't say it doesn't sound like one. She runs her hands over her belly, her hips, feeling the weight of herself. "I want to arrive," she whispers.`,
    ],
    [
      (s) => `"I know," ${s.name} says, before you've finished. At ${lbs(s)} lbs she is enormous and certain. "I've known for a while. There's a version of me I haven't reached yet, and she's—" She spreads her hands over her vast belly. "—enormous. And she's happy."

Her certainty fills the room. "You see her too," she murmurs. "That's why you keep saying it."`,
      (s) => `${s.name} takes your hand and puts it on the warm crest of her belly — ${lbs(s)} lbs of soft, living proof. "This is the project," she says. "Talk to it, not me."

Her flesh yields under your palm, warm and heavy and still growing. "Tell it there's more coming," she whispers. "Tell it I'm not done. Tell it—" She closes her eyes. "—tell it I'm beautiful like this."`,
    ],
];
