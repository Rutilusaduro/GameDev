// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling gather scene — the leviathan capstone (tier 2 only).
// Space-takeover + girls attending her unprompted. House voice: she is the
// fixed point the room reorganizes around; the others come to her warmth.
import { registerPool } from '../../engine.js';

// Format the attendee names into a readable list: "A", "A and B", "A, B and C".
function nameList(ctx) {
  const names = ctx.globals?.attendeeNames || [];
  if (!names.length) return 'the others';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

// ── set.gather ────────────────────────────────────────────────
registerPool('set.gather', [
  // Coverage fallback — gathering only fires at tier 2, but the engine wants a
  // {} variant under every pool.
  { when: {}, text: [
    `The others come to her. They settle in around the warm weight of her, and the room becomes, for an hour, the small society she's at the center of.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    ctx => `You don't have to summon them anymore. ${nameList(ctx)} come on their own — find places around her, lean into the warmth she throws off at this scale. She holds the room the way she holds everything now: without moving, by being the largest, most settled thing in it. She presides. They orbit. The afternoon arranges itself around her.`,
    ctx => `Her court convenes. ${nameList(ctx)} drift in and tuck themselves into the space her body no longer leaves much of — perched on the reinforced edges, settled against the soft slopes of her, close enough to share the heat. She is the fixed point the room was built around, and the others have stopped pretending otherwise. They come to her. She lets them.`,
    ctx => `There is more of her than there is room, and the room has given way — furniture pushed to the margins, the center surrendered to her spread. ${nameList(ctx)} fit themselves into what's left, glad to. Being near her has become a thing the others seek out: the warmth, the stillness, the steady gravity of someone who has settled this completely. She receives them without ceremony, because by now there's no other way for it to go.`,
    ctx => `It happens on its own these days. ${nameList(ctx)} turn up, settle in, and stay — drawn to the one corner of campus that doesn't move. She is the warm permanent center of it, and she runs the gathering from where she rests: a word here, a slow look there, the whole room tuned to her. When they leave they're a little reluctant. She noticed that a while ago. She likes it.`,
  ]},
  { when: { stageMin: 11, corruption: [0] }, weight: 2, text: [
    ctx => `She's still a little amazed that they come — that settling this large made her a destination instead of a spectacle. ${nameList(ctx)} arrange themselves around her, and she lets herself believe it: she belongs at the center of this. She doesn't say so. She just settles deeper and lets the room fill up with people who chose to be near her.`,
  ]},
  { when: { stageMin: 11, corruption: [2] }, weight: 2, text: [
    ctx => `Of course they come. ${nameList(ctx)} arrange themselves around her and she takes it as her due — the warmth she throws, the gravity she's earned, the plain fact that the room is hers and they are guests in it. She has stopped being surprised by any of it. She holds court, vast and certain, and the others lean in to catch what she gives.`,
  ]},
]);
