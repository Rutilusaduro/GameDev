// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Third variants on decomposed settling feed fragment pools (_d*).
// Loads after feed.js auto-decompose registration.
import { registerModuleVariants } from '../../engine.js';

const spreadFrags = {
  _d27: [
    `An entire afternoon of food laid out. {subject.name} surveys it with alert pleasure — problem matching skill.`,
    `She starts left and works right. No commentary; the eating is the commentary.`,
    `Spread wide enough to be serious work. She begins without ceremony.`,
  ],
  _d28: [
    `Everything you bring, she takes — first plate, second, third by easy degrees.`,
    `Past the point where amount is a thought. The spread exists; she eats the spread.`,
    `Unselfconscious appetite at rest. Trays empty in steady unhurried order.`,
  ],
  _d29: [
    `"Good," she says — quantity, variety, enough. She settles into correct environment.`,
    `More than she expected. Nothing wasted; pleasure of abundance finally matched.`,
    `The spread answers what she is now. She eats with complete ease.`,
  ],
  _d30: [
    `Two trays, then a third. She reaches without ceremony; food disappears steadily.`,
    `Patient pleasure — no reason to rush when there is this much.`,
    `Trays empty. She looks at you: is there more?`,
  ],
  _d31: [
    `Spread occupies table, side surface, your hands holding the last tray.`,
    `She eats through everything in the order she assessed first — best bites saved correctly.`,
    `No surface left unused. She finds this ordinary now.`,
  ],
  _d32: [
    `At her scale a spread is a project. Trays arrive; she eats before you finish setting up.`,
    `She will eat all of it. You both know this before the first bite.`,
    `Serious appetite, serious mass — the obvious outcome of her state.`,
  ],
  _d33: [
    `Planned for her size: abundance, not apology. She notices. "This," she says — acknowledgment.`,
    `Enough dishes to feel like respect. You finally prepared for what she is.`,
    `The difference lands in how she settles — slower, more present, more pleased.`,
  ],
  _d34: [
    `Three trays — an event. Everything she wants and surprises besides.`,
    `She eats through it the way she fills the room: completely, without drama.`,
    `Fuller than all week. Immensely satisfied when the last plate clears.`,
  ],
  _d35: [
    `She eats and eats. Spread yields piece by piece to patient enormous appetite.`,
    `Primary fact of her existence: comfortable hunger at scale.`,
    `Gone. She lies back and exhales. "More next time." You were already planning it.`,
  ],
};

const stuffingFrags = {
  _d36: [
    `"I'm full," she says — but not done. You offer one more; she calculates, then opens.`,
    `Another piece. Another past that. She always has more room than she thought.`,
    `Full versus finished — you have learned the difference. She discovers capacity again.`,
  ],
  _d37: [
    `Gentle push tonight — one piece at a time past where she would have stopped.`,
    `Half-hearted protest. Next piece anyway. She takes the one after that too.`,
    `Ends against warmth of her own fullness — arrived somewhere new.`,
  ],
  _d38: [
    `Full but not done. Food keeps coming — pause, breathe, expand into what's taken.`,
    `Resistance then give, like a door past its frame. Fuller than she expected.`,
    `"Oh," she says quietly — surprised by how much of her there is.`,
  ],
  _d39: [
    `"Okay," when you offer more than expected — consent, trust, stomach overruled.`,
    `She trusts the process. Capacity always bigger than it looked.`,
    `Accepts each piece as information about what she can hold.`,
  ],
  _d40: [
    `"I can't," she says. You wait — patient, next thing ready. She breathes, redistributes.`,
    `"Okay. One more." Then another. Further than either expected.`,
    `Room warmer. She lies against immensity — limits not where they appeared.`,
  ],
  _d41: [
    `Stuffing at her scale is committed work — more of her to fill. Patient offers, pauses.`,
    `Focused attention on each piece. Serious work, seriously done.`,
    `Past full, past further-than-full — depth she did not know she had. "That's it."`,
  ],
  _d42: [
    `Already vast; you make her fuller. Always more room; capacity meets what you bring.`,
    `Patience and presence past the point she thinks she's done. She wasn't.`,
    `The discovery never stops being something — warm, heavy, properly full.`,
  ],
  _d43: [
    `Further than she meant. Aftermath — aware, quietly overwhelmed, fullness undeniable.`,
    `Not upset. Present with it. The physical fact of how much she holds.`,
    `Lies in the warmth of it, learning the new shape of full.`,
  ],
  _d44: [
    `She pushed past where you expected to stop. "More," she said; you brought more.`,
    `Not finished becoming what she will be. Each piece evidence of that.`,
    `Accepts addition as proof — appetite and identity aligned.`,
  ],
};

for (const [key, lines] of Object.entries(spreadFrags)) {
  registerModuleVariants(`set.feed.spread.${key}`, [{ when: {}, weight: 3, text: lines }]);
}

for (const [key, lines] of Object.entries(stuffingFrags)) {
  registerModuleVariants(`set.feed.stuffing.${key}`, [{ when: {}, weight: 3, text: lines }]);
}
