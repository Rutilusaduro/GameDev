// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Brokered visit scenes — archetype-keyed. ref = visitor, subject = immobile girl.
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
  ]},
  { when: { refArchetype: 'athlete' }, weight: 2, text: [
    `{ref.name} comes without commentary. She sits, stays, treats the scale like weather — present, not remarkable. {subject.name} notices.`,
  ]},
  { when: { refArchetype: 'artsy' }, weight: 2, text: [
    `{ref.name} looks at {subject.name} the way she looks at a finished piece — openly, without the flinch. "You're something," she says. {subject.name} accepts this.`,
  ]},
  { when: { refArchetype: 'gamer' }, weight: 2, text: [
    `{ref.name} drags in a setup. Two hours. No other subject comes up.`,
  ]},
  { when: { refArchetype: 'sorority' }, weight: 2, text: [
    `{ref.name} fills the room with chapter warmth and news. {subject.name} listens, eats, and is pleased with the arrangement.`,
  ]},
  { when: { refArchetype: 'quiet' }, weight: 2, text: [
    `{ref.name} sits in the easy silence of someone who doesn't need to fill it. {subject.name} appreciates this more than she says.`,
  ]},
  { when: { refArchetype: 'culinary' }, weight: 2, text: [
    `{ref.name} brings something specific, considered, made. {subject.name} eats and gives her a look that means yes. {ref.name} comes back the following week.`,
  ]},
  { when: { refArchetype: 'nursing' }, weight: 2, text: [
    `{ref.name} adjusts a cushion, asks the right questions, leaves {subject.name} better settled.`,
  ]},
  { when: { refArchetype: 'predator' }, weight: 2, text: [
    `{ref.name} pays {subject.name} focused, unhurried attention. {subject.name} finds it real. She stays longer than expected. Neither mentions this.`,
  ]},
  { when: { refArchetype: 'overachiever' }, weight: 2, text: [
    `{ref.name} checks in efficiently, stays longer than she planned, and leaves with an expression she doesn't explain. {subject.name} watches her go.`,
  ]},
  { when: { refArchetype: 'influencer' }, weight: 2, text: [
    `{ref.name} brings the outside with her — news, energy, the shape of the week. {subject.name} gets an hour of the world without leaving the room.`,
  ]},
  { when: { refArchetype: 'transfer' }, weight: 2, text: [
    `{ref.name} sits and asks questions — not about the size, about her. {subject.name} answers. The visit runs long.`,
  ]},
  { when: { refArchetype: 'psych' }, weight: 2, text: [
    `{ref.name} reads the room without narrating it. She stays close to an hour and says very little. {subject.name} finds this restful.`,
  ]},
  { when: { refArchetype: 'farm_girl' }, weight: 2, text: [
    `{ref.name} shows up with food and stays to talk. Practical and warm and unhurried about it. {subject.name} is glad she came.`,
  ]},
  { when: { refArchetype: 'explorer' }, weight: 2, text: [
    `{ref.name} arrives curious and leaves satisfied. The conversation goes somewhere neither of them expected.`,
  ]},
  { when: { refArchetype: 'eced' }, weight: 2, text: [
    `{ref.name} comes in gently and leaves {subject.name} in better spirits than she found her. That's the whole visit. It's enough.`,
  ]},
]);
