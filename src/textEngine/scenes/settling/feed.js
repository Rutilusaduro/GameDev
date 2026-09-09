// The Squad — Lead: A3 Immobility | Support: A7 Artisan, A5 Editor
// Settling feed scenes — preferred / spread / stuffing.
// House voice: appetite celebrated, gain as pleasure, scale as abundance.
import { registerPoolAutoDecompose } from '../decomposePools.js';

// ── set.feed.preferred ────────────────────────────────────────
// Hand-feeding with confirmed courtPreference — the known taste, finally met.
registerPoolAutoDecompose('set.feed.preferred', [
  { when: {}, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const desc = {
        sweet: 'what she asked for — sweets, layered and rich',
        savory: 'savory things, salt and warmth and depth',
        spicy: 'something with heat',
        volume: 'more than you planned',
      }[pref] || 'what she craves';
      return `You bring her ${desc}. She reaches before you've set it down. The ease of a preference finally known and met.`;
    },
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const label = {
        sweet: 'the sweets',
        savory: 'savory — real, deep, well-made',
        spicy: 'the heat, layered right',
        volume: 'volume — the spread wide enough',
      }[pref] || 'what she wanted';
      return `You hand-feed her ${label}. She opens toward each piece with the particular ease of someone eating something she actually wants — unhurried, present, perfectly satisfied with what's arriving. She doesn't say much while she's eating. She doesn't have to.`;
    },
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const desc = {
        sweet: 'the sweet things — each one richer than the last',
        savory: 'what she wanted: real salt, real warmth, exactly right',
        spicy: 'something with heat and patience',
        volume: 'everything, in the order she would have chosen',
      }[pref] || 'exactly what she craved';
      return `You bring ${desc}. She eats from your hand without ceremony — steady, comfortable, entirely absorbed in the pleasure of being given the right thing. She settles deeper into the afternoon with each piece. By the end her breathing has slowed. "Yes," she says, finally. "That's it."`;
    },
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const feel = {
        sweet: 'the sweetness doing its work',
        savory: 'the salt finding where it belongs',
        spicy: 'the heat spreading through her by degrees',
        volume: 'the weight of it settling into her',
      }[pref] || 'the satisfaction landing';
      return `She eats what you bring her with her eyes half-closed — ${feel}. You can tell when something arrives that is exactly right for her. The whole quality of her attention shifts. She eats slower. She savors. She lets herself have it completely.`;
    },
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const scale = {
        sweet: 'more sweet than reasonable, exactly as much as she needs',
        savory: 'savory things brought in quantity, each one exactly right',
        spicy: 'heat in volume — she is large enough now to want a lot of it',
        volume: 'volume appropriate to her scale, not what you first thought was enough',
      }[pref] || 'what she asked for and in the right amount';
      return `You bring ${scale}. At her size she eats with the unhurried authority of a creature that has found its correct diet and sees no reason to be self-conscious about the amount. She opens for each piece you offer. You watch her settle deeper into herself with each one.`;
    },
    ctx => {
      const pref = ctx.globals?.courtPreference || ctx.d?.subject?.courtPreference;
      const landing = {
        sweet: 'sweet things — she has a whole person\'s worth of preference for them now',
        savory: 'savory, real, deep — she knows what she wants',
        spicy: 'heat, offered slow enough to let it build',
        volume: 'full volume — you have stopped estimating small',
      }[pref] || 'exactly what she wanted';
      return `Hand-feeding ${landing}: her head tilts toward your hand before you've extended it. She has preferences at this scale the way a country has weather — large, consistent, entirely her own. You feed her what she wants. She goes quiet in the specific way of someone receiving the correct thing.`;
    },
  ]},
]);

// ── set.feed.spread ───────────────────────────────────────────
// A full multi-dish spread — volume, variety, the abundance she warrants.
registerPoolAutoDecompose('set.feed.spread', [
  { when: {}, text: [
    `You bring more than a single plate. {subject.name} surveys what you've laid out, and starts at one end.`,
    `The spread takes up most of the available surface. She notes this without comment and reaches for the nearest thing.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `You set out what amounts to an entire afternoon of food. {subject.name} looks at it with the alert pleasure of someone presented with a problem that exactly matches their skills. She starts at the left edge and works rightward. She eats without commentary; the eating is the commentary.`,
    `Everything you bring, she takes. First plate, then the second, the third following by easy degrees. She eats with the complete unselfconsciousness of someone past the point where amount is a thing she thinks about. The spread is there; she eats the spread.`,
    `You've brought more than she expected. "Good," she says when she sees it — meaning the quantity, the variety, the fact of there being enough. She settles into the meal with the ease of a creature in its correct environment. Nothing is wasted.`,
    `You set up the trays — two, then a third — and step back. She reaches without ceremony. Food disappears steadily, unhurriedly, with the patient pleasure of someone who has stopped eating quickly because there is no longer any reason to. She eats until the trays are empty. Then she looks at you with the question: is there more?`,
    `The spread occupies the table, the side surface, and you — you end up holding the last tray because there's nowhere left to put it. She does not find this remarkable. She eats through everything in the comfortable order of someone who has assessed what's best to take first.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `At her scale, a spread isn't a meal so much as a serious project. You arrive with trays — more than she could have expected. She reaches for the nearest thing without preamble, already eating before you've finished setting up. She will eat all of it. The trays already say so.`,
    `You've planned for her size this time: enough dishes to feel like abundance, not like apology. She notices the difference. "This," she says, looking at the full spread. Not a question. An acknowledgment that you have, finally, properly prepared for what she is.`,
    `The spread you've brought is — you won't pretend otherwise — an event. Three trays. Everything she'd want and some she didn't know she wanted. She eats through it the way she fills the room: completely, without drama, as the obvious outcome of her natural state. By the end she is fuller than she's been all week. She looks immensely satisfied.`,
    `She eats and eats and eats. The spread gives way piece by piece to her appetite — that patient, enormous, perfectly comfortable appetite that has become one of the primary facts of her existence. When it's gone she lies back further and exhales. "More next time," she says. You were already planning it.`,
  ]},
]);

// ── set.feed.stuffing ─────────────────────────────────────────
// Pushing past comfortable — she goes further. Capacity expands.
registerPoolAutoDecompose('set.feed.stuffing', [
  { when: {}, text: [
    `You push her a little past comfortable tonight. She objects mildly, and opens again anyway.`,
    `She has found a little more room than she thought. She always does.`,
  ]},
  { when: { stageMin: 10, stageMax: 10 }, weight: 2, text: [
    `"I'm full," she says — and she is, but you've learned the difference between full and done, and she's not done yet. You offer one more. She looks at it for a moment with the expression of someone running internal calculations. Then she opens. Then another. Then one more past that. She discovers, as she always does, that she has more room than she thought.`,
    `You push her tonight. Not brutally — gently, one piece at a time, well past where she would have stopped on her own. She makes a small sound of protest at some point, half-hearted. You offer the next piece. She takes it. She takes the one after that too. At the end she lies against the warmth of her own fullness with the expression of someone who has arrived somewhere.`,
    `She is full but not done — you have learned to read the distinction — and you keep the food coming. One piece, a pause, another piece, a pause long enough for her to breathe and expand into what she's already taken. She eats past the fullness the way a door goes past its frame: the resistance, then the give. She ends up fuller than she has been. "Oh," she says quietly. She sounds genuinely surprised by how much of her there is.`,
    `"Okay," she says, when you offer more than she expected — meaning she accepts, she consents, she is going to eat what you've brought regardless of what her stomach says about it. She trusts the process by now. The capacity is always bigger than it looked.`,
  ]},
  { when: { stageMin: 11 }, weight: 3, text: [
    `"I can't," she says, and you wait — patient, unhurried, holding the next thing ready. She breathes. Redistributes. Her mass settles into new positions as space opens somewhere deeper. "Okay," she says. "One more." You give her one more. Then another. By the time she is actually done, she has gone further than either of you expected, and the room is warmer for it, and she lies against her own immensity with the quiet satisfaction of something that has found its limits are not where they appeared.`,
    `The stuffing at her scale is a more committed project than it used to be — there is simply more of her to fill. You are patient about it. You offer, pause, offer again. She takes each piece with the focused attention of someone doing serious work. She is doing serious work. She goes past full and then past further-than-full and lands somewhere new — a depth she didn't know she had, filled now, warm, heavy with it. "That's it," she says, and means she is completely, entirely, properly full in a way she hasn't been in weeks.`,
    `She is already vast and you make her fuller. This is the understanding: that there is always more room, that her capacity keeps expanding to meet what you bring, that stuffing a resident at this scale requires patience and presence and a willingness to keep offering past the point where she thinks she's done. She always discovers she wasn't. The discovery never stops being something.`,
  ]},
  { when: { corruption: [0] }, weight: 2, text: [
    `She went further than she meant to. She lies in the aftermath of it — aware, quietly overwhelmed, the fullness a physical fact she cannot ignore. She is not upset about it. She is just... present with it.`,
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    `She knows what this is — what it does — and she lets it happen anyway. She has stopped being surprised that she can hold this much, and started simply accepting it as information about what she is.`,
  ]},
  { when: { corruption: [2] }, weight: 2, text: [
    `She pushed you to keep going past the point you'd expected to stop. "More," she said, and you brought more. She is not finished becoming what she is going to be. She accepts each additional piece as evidence of that fact.`,
  ]},
]);
