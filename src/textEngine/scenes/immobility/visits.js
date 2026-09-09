// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Brokered visit scenes — archetype-keyed. ref = visitor, subject = immobile resident.
import { registerPool } from '../../engine.js';

registerPool('immob.visit', [
  // ── Generic fallback ──────────────────────────────────────────
  { when: {}, text: [
    `{ref.name} comes to {subject.name} where she rests. They share the afternoon — she brings the outside in; {subject.name} doesn't have to go anywhere for it.`,
    `The visit is brief, unhurried. {ref.name} fills the room with outside news, and {subject.name} receives it.`,
    `{ref.name} sits within reach. Conversation flows; {subject.name} eats; the afternoon passes warm and unremarkable in the best way.`,
    `A visitor, food, gossip — {subject.name} receives court without leaving her settled mass.`,
  ]},
  { when: { stageMin: 11 }, weight: 2, text: [
    `{ref.name} comes to court. The room is full before she speaks — {subject.name}'s presence does that. She stays until the light changes.`,
    `{ref.name} arrives like a guest at a throne room — unhurried, fed, gossiped with. {subject.name} receives it all without standing.`,
    `Court convenes when {ref.name} enters. {subject.name} does not move. She does not need to.`,
  ]},

  // ── Archetype variants (weight 2 each) ───────────────────────
  { when: { refArchetype: 'cheerleader' }, weight: 2, text: [
    `{ref.name} arrives at full volume. She settles in next to {subject.name} and talks — warmly, without once making it a thing. {subject.name} is pleased.`,
    `{ref.name} brings squad energy and snacks. {subject.name} receives both like royalty.`,
    `{ref.name} cheers up the room without mentioning the scale. {subject.name} approves.`,
  ]},
  { when: { refArchetype: 'bookworm' }, weight: 2, text: [
    `{ref.name} brings a book and stays three hours. They read in parallel. {subject.name} decides she approves.`,
    `{ref.name} reads aloud from the chair beside {subject.name}'s settled warmth. Pages turn; neither hurries the afternoon.`,
    `A bookmark, a blanket, quiet company — {ref.name} makes the visit feel like a library corner moved into court.`,
  ]},
  { when: { refArchetype: 'athlete' }, weight: 2, text: [
    `{ref.name} comes without commentary. She sits, stays, treats the scale like weather — present, not remarkable. {subject.name} notices.`,
    `{ref.name} stretches out near {subject.name} like it's a recovery day. No pity, no pep talk — just presence.`,
    `She talks training and appetite without flinching at {subject.name}'s size. {subject.name} likes her for that.`,
  ]},
  { when: { refArchetype: 'artsy' }, weight: 2, text: [
    `{ref.name} looks at {subject.name} the way she looks at a finished piece — openly, without the flinch. "You're something," she says. {subject.name} accepts this.`,
    `{ref.name} sketches {subject.name} from memory on a napkin and shows her. {subject.name} keeps it.`,
    `"The composition is perfect," {ref.name} says, meaning all of her. {subject.name} glows under the attention.`,
  ]},
  { when: { refArchetype: 'gamer' }, weight: 2, text: [
    `{ref.name} drags in a setup. Two hours. No other subject comes up.`,
    `Controllers, snacks, co-op — {ref.name} makes the room feel like a den. {subject.name} wins twice and gloats.`,
    `Lag, laughter, loot drops — the visit passes in game-time. {subject.name} asks when the rematch is.`,
  ]},
  { when: { refArchetype: 'sorority' }, weight: 2, text: [
    `{ref.name} fills the room with chapter warmth and news. {subject.name} listens, eats, and is pleased with the arrangement.`,
    `{ref.name} brings rush-week gossip and a casserole. {subject.name} receives both like dues paid in affection.`,
    `Sisterhood arrives on a tray — stories, scandal, seconds. {subject.name} holds court without standing.`,
  ]},
  { when: { refArchetype: 'quiet' }, weight: 2, text: [
    `{ref.name} sits in the easy silence of someone who doesn't need to fill it. {subject.name} appreciates this more than she says.`,
    `{ref.name} stays an hour and says maybe twenty words. {subject.name} rests easier for it.`,
    `Tea, stillness, a hand on warm mass — {ref.name} visits like a held breath. {subject.name} exhales.`,
  ]},
  { when: { refArchetype: 'culinary' }, weight: 2, text: [
    `{ref.name} brings something specific, considered, made. {subject.name} eats and gives her a look that means yes. {ref.name} comes back the following week.`,
    `{ref.name} plates for two though only one of them is moving. {subject.name} tastes every layer and nods approval.`,
    `The kitchen came to court — rich, deliberate, enough. {ref.name} watches {subject.name} eat like a critic who already gave five stars.`,
  ]},
  { when: { refArchetype: 'nursing' }, weight: 2, text: [
    `{ref.name} adjusts a cushion, asks the right questions, leaves {subject.name} better settled.`,
    `{ref.name} checks comfort the way she checks vitals — calm, thorough, kind. {subject.name} trusts the hands.`,
    `Ice water, repositioning, a soft blanket — {ref.name} tends without making {subject.name} feel like a chart.`,
  ]},
  { when: { refArchetype: 'predator' }, weight: 2, text: [
    `{ref.name} pays {subject.name} focused, unhurried attention. {subject.name} finds it real. She stays longer than expected. Neither mentions this.`,
    `{ref.name} watches {subject.name} eat with predatory patience. {subject.name} feels seen, not hunted.`,
    `The gaze stays steady — admiration without apology. {subject.name} leans into it.`,
  ]},
  { when: { refArchetype: 'overachiever' }, weight: 2, text: [
    `{ref.name} checks in efficiently, stays longer than she planned, and leaves with an expression she doesn't explain. {subject.name} watches her go.`,
    `{ref.name} brought a schedule and abandoned it. {subject.name} counts that as a win.`,
    `"I have to—" {ref.name} says, and doesn't. The visit runs until the light changes.`,
  ]},
  { when: { refArchetype: 'influencer' }, weight: 2, text: [
    `{ref.name} brings the outside with her — news, energy, the shape of the week. {subject.name} gets an hour of the world without leaving the room.`,
    `Trends, drama, a recap in three acts — {ref.name} performs the week for an audience of one vast resident.`,
    `{ref.name} forgets to film. {subject.name} notices and is quietly pleased.`,
  ]},
  { when: { refArchetype: 'transfer' }, weight: 2, text: [
    `{ref.name} sits and asks questions — not about the size, about her. {subject.name} answers. The visit runs long.`,
    `{ref.name} maps the room like a new campus. {subject.name} becomes the landmark.`,
    `Fresh eyes, honest curiosity — {ref.name} makes being kept feel like belonging.`,
  ]},
  { when: { refArchetype: 'psych' }, weight: 2, text: [
    `{ref.name} reads the room without narrating it. She stays close to an hour and says very little. {subject.name} finds this restful.`,
    `{ref.name} listens more than she interprets. {subject.name} unspools without being diagnosed.`,
    `Silence with intent — {ref.name} makes the visit feel held, not studied.`,
  ]},
  { when: { refArchetype: 'farm_girl' }, weight: 2, text: [
    `{ref.name} shows up with food and stays to talk. Practical and warm and unhurried about it. {subject.name} is glad she came.`,
    `{ref.name} brings something baked heavy and sweet. {subject.name} eats like harvest season.`,
    `Country news, country portions — {ref.name} makes court feel like a porch. {subject.name} settles deeper.`,
  ]},
  { when: { refArchetype: 'explorer' }, weight: 2, text: [
    `{ref.name} arrives curious and leaves satisfied. The conversation goes somewhere neither of them expected.`,
    `{ref.name} charts the room like new terrain. {subject.name} is the summit.`,
    `Stories from the halls, rumors from the quad — {ref.name} brings the map; {subject.name} adds herself to it.`,
  ]},
  { when: { refArchetype: 'eced' }, weight: 2, text: [
    `{ref.name} comes in gently and leaves {subject.name} in better spirits than she found her. That's the whole visit. It's enough.`,
    `{ref.name} speaks soft, moves careful, stays until {subject.name} smiles without trying.`,
    `Warmth delivered in small doses — a snack, a story, a hand held. {subject.name} feels tended, not managed.`,
  ]},
]);
