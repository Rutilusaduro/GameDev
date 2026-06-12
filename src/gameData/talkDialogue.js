// Legacy talk responses — corruption-tiered pools, being migrated
// topic-by-topic to text-engine scenes (give the topic an
// engineTemplate in talkSystem.js; see scenes/talkEncourage.js).
import { pick } from '../textEngine/engine.js';

function lbs(s) { return Math.round(s.lbs).toLocaleString(); }

const MOOD_OPENERS = {
  stressed: (s) => pick([
    `${s.name} rubs her temples before she answers.`,
    `She's been running on fumes; the question lands soft anyway.`,
    `The stress shows in her shoulders, but she makes room for you.`,
  ]),
  tired: (s) => pick([
    `${s.name} blinks slowly, fighting a yawn.`,
    `She's half-melted into the chair already.`,
    `Exhaustion softens her edges; she still turns toward you.`,
  ]),
  happy: (s) => pick([
    `${s.name} brightens the moment you speak.`,
    `Good mood radiates off her like warmth.`,
    `She was already smiling before you finished the question.`,
  ]),
  excited: (s) => pick([
    `${s.name} sits forward, energy crackling.`,
    `She's buzzing — you can feel it in how fast she answers.`,
    `Enthusiasm spills out before the words do.`,
  ]),
  nervous: (s) => pick([
    `${s.name} picks at her sleeve.`,
    `Her hands fidget; her voice comes out careful.`,
    `She's wound tight, but she doesn't send you away.`,
  ]),
};

function withMood(s, text) {
  const opener = MOOD_OPENERS[s.mood];
  if (!opener) return text;
  return `${opener(s)}\n\n${text}`;
}

// ── topic pools: [tier0, tier1, tier2] ────────────────────────

const DIALOGUE = {
  check_in: [
    [
      (s) => withMood(s, `"Oh — hi, Professor." ${s.name} tucks a strand of hair back and glances at the snack stash she's been pretending isn't hers. "I'm good. Busy. Hungry, kind of constantly, which is — anyway." She laughs once, embarrassed. "Good. I'm good."

She shifts in her chair and you notice how her clothes sit differently than they did at the start of semester — snugger at the hips, pulling across her middle when she breathes. She hasn't noticed you noticing. Or she's pretending not to.`),
      (s) => withMood(s, `${s.name} smiles, a little guarded, and sets down whatever she was holding. "Things are fine. Classes are fine." A beat. Her hand drifts to her waist, thumb hooking the waistband. "The dining hall got better, did you notice? Or I did. One of those."

She's ${lbs(s)} lbs now — still early enough that she can call it temporary if she wants to. She doesn't call it that. She just changes the subject.`),
    ],
    [
      (s) => withMood(s, `"Better now," ${s.name} says, and means the company, or possibly the snacks you tend to bring. Probably both. She settles deeper into her chair — it creaks — and her softened body spreads warm and unhurried against the cushions.

"I'm not fighting it anymore," she admits, quieter. "The hunger, the weight, all of it. It feels… honest." She runs her palm along the curve of her belly through her top. "I used to hold my breath around this stuff. I don't anymore."`),
      (s) => withMood(s, `${s.name} stretches, comfortable in her skin in a way she wasn't a semester ago. At ${lbs(s)} lbs she takes up more of the office than she used to — thighs pressing together when she crosses her legs, belly rounding softly when she leans back.

"Honestly? Really good. I've stopped fighting myself about… most things." She meets your eyes. "You helped. I know you helped. I'm not mad about it."`),
    ],
    [
      (s) => withMood(s, `${s.name} lights up the moment she sees you. "I was hoping you'd come by. Sit. Watch me finish this." She pats the seat beside her like she's granting an audience, then gestures at the spread she's assembled — pastries, takeout, something warm still steaming.

Her body has grown into the invitation. At ${lbs(s)} lbs she is plush and present and completely unashamed of either the food or the flesh. "I saved you the good stuff," she says. "Well. I saved some of it."`),
      (s) => withMood(s, `"I'm wonderful," ${s.name} says simply. She spreads her hands over the warm round of her belly — ${lbs(s)} lbs of soft, deliberate growth. "I'm fed, I'm growing, and you're here. List complete."

She says it without performance. Without asking if it's okay. Her thighs spread wide in the chair; her breathing is easy; her smile is real. "Talk to me," she murmurs. "Or don't. Just stay a while."`),
    ],
  ],

  compliment: [
    [
      (s) => `${s.name} flushes scarlet. "I— you noticed? I mean. Of course you noticed. It's… a lot to notice." She hugs her arms over her middle and fails to hide either the soft curve she's grown or the smile pulling at her mouth.

At ${lbs(s)} lbs she's still new enough to this that praise feels dangerous — like admitting something out loud makes it real. It is real. Her hips are wider. Her thighs press together when she walks. Her face is fuller. She doesn't sound entirely unhappy about any of it.`,
      (s) => `"You can't just say that," ${s.name} mutters, but she doesn't move away. Her hands hover at her waist, fingers pressing into the new softness there. "People aren't supposed to—" She stops. Swallows. "Nobody's ever said it like they meant it before."

The compliment sits in the air between you. Her breathing changes — slower, deeper, belly rising against her top. She looks at you like she's waiting for the other shoe. It doesn't drop.`,
    ],
    [
      (s) => `${s.name} does a slow half-turn, letting you appreciate the work in progress. At ${lbs(s)} lbs her body moves differently — belly swaying, hips rolling, ass and thighs plush with each step. "It's coming along," she says, mock-modest. "I've been diligent."

She isn't performing confidence. She's practicing it. Her hands trace the heavy curve of her hips; her smile is warm and a little surprised at herself. "Keep talking," she says, settling into the chair. The chair groans. She doesn't care. "No, really. Keep talking."`,
      (s) => `"Say it again," ${s.name} murmurs, and this time she means it. Her ${lbs(s)}-lb body is thick and soft and impossible to ignore — breasts heavier, belly rounding forward, thighs spreading warm against the chair arms.

"You see it," she says. Not a question. "All of it." She runs both palms down the great curve of herself, feeling the weight settle. "I used to want to be invisible. Now I want—" She exhales. "This. I want this."`,
    ],
    [
      (s) => `${s.name} takes the compliment the way she takes everything now — as her due. At ${lbs(s)} lbs she is abundant and warm and completely at home in the body you've helped her build. "I know," she says warmly. "And there's more of me every week. You're welcome."

She smooths both hands down the vast soft geography of her belly, hips, thighs — slow, savoring, showing you without shame. "Say it again," she says. "Slower. I like hearing you mean it."`,
      (s) => `"Again," ${s.name} says, eyes never leaving yours. Her enormous soft body fills the office with heat and presence — flesh pressing at every seam, jiggling when she shifts, settling heavy and warm when she stills.

"You wanted this," she murmurs. "So did I. Look what we made." She takes your hand and places it on the warm crest of her belly. "Feel that? Still growing. Still yours to watch."`,
    ],
  ],

  suggest_indulgence: [
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
  ],

  suggest_growth: [
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
  ],

  command_finish: [
    [
      (s) => `The command takes her like gravity. ${s.name}'s eyes widen — surprised at her own obedience — and then her hands move without asking permission.

She eats with wide, startled eyes, each bite mechanical at first, then eager. At ${lbs(s)} lbs her belly swells visibly as she works — soft flesh pushing at her waistband, breathing turning shallow, thighs spreading wider in the chair. The plates empty one by one. She doesn't stop until they're gone.

When it's over she sits very still, hands on her distended middle, looking at you like she's never seen you before. "I couldn't—" she breathes. "I couldn't stop."`,
      (s) => `The word lands and ${s.name} breaks. Not violently — completely. Her manners dissolve; her hesitation dissolves; only appetite remains.

She cleans every plate with a focus that frightens her even as she obeys it — fork scraping, throat working, belly swelling round and tight with each addition. At ${lbs(s)} lbs the growth is visible in real time: soft flesh pressing outward, seams complaining, her body accepting more because you told it to.

Afterward she gasps, overwhelmed, transformed by the knowledge of what she can do when you command it.`,
    ],
    [
      (s) => `${s.name} exhales, settles, and obeys — methodical, unhurried, thorough. At ${lbs(s)} lbs she has learned the rhythm of this: chew, swallow, breathe, repeat. Her belly grows heavier with each plate; her thighs spread; her eyes stay on yours.

When the last plate is clean she sits back, distended and warm, and waits. Not proud. Not ashamed. Ready for the next instruction.`,
      (s) => `She doesn't negotiate. She doesn't perform reluctance. ${s.name} eats because you said eat — every plate, every crumb, every calorie going down with steady, devoted hunger.

At ${lbs(s)} lbs her body is an instrument of obedience: belly swelling, flesh jiggling with each movement, breathing labored and satisfied. When she finishes she folds her hands on her full middle and looks to you for what comes next.`,
    ],
    [
      (s) => `"Yes, Professor." No hesitation. No negotiation. The words arrive with relief — like she's been waiting for permission to want this much.

${s.name} cleans every plate and then sits, hands folded on her ${lbs(s)}-lb belly, hopeful there's more. Her body is vast and warm and completely yours to command. "Again?" she whispers. "Whenever you want. However much you want."`,
      (s) => `The command is a gift and ${s.name} receives it like one. She eats with ritual slowness — savoring, swallowing, swelling — until the table is bare and her belly is a tight, heavy monument between her spread thighs.

At ${lbs(s)} lbs she is beyond shame. Beyond resistance. She licks her fingers one by one, eyes never leaving yours. "More," she murmurs. "Always more."`,
    ],
  ],
};

export function buildTalkResponse(topicId, student, corTier) {
  const pools = DIALOGUE[topicId];
  if (!pools) return '';
  const tier = Math.min(corTier, pools.length - 1);
  const pool = pools[tier] || pools[0];
  const fn = pick(pool);
  return typeof fn === 'function' ? fn(student) : fn;
}
