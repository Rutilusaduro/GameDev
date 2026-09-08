// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Third variants on decomposed settling fragment pools (_d*).
// Loads after care.js / socialize.js auto-decompose registration.
import { registerModuleVariants } from '../../engine.js';

const beatFrags = {
  _d1: [
    `Cool cloth along the warm fold at her arm. She exhales.`,
    `Pillow shifted beneath the heavy slope of her hip. Small correction, large relief.`,
  ],
  _d2: [
    `You tend where she runs hottest — unhurried, certain.`,
    `Cushion beneath a weight furniture cannot reach. She goes still.`,
  ],
  _d3: [
    `There is geography to maintaining her at this scale. You learn it by tending.`,
    `Fold beneath each arm mapped. Warm under-curves noted. Terrain shifts when she breathes.`,
  ],
  _d4: [
    `Cloth, cushion, cooling gesture — all entirely hers now.`,
    `You move through attentions like a known room. Unhurried. Certain.`,
  ],
  _d5: [
    `At her scale, tending is a route. You follow it piece by piece.`,
    `Weight of a leg shifted by careful degrees. Her breathing slows.`,
  ],
  _d6: [
    `Maintenance at impossible scale — hottest places cooled, unreachable weight supported.`,
    `The room settles alongside her when the tending finishes.`,
  ],
  _d7: [
    `More of her than last visit. New fold where weight redistributed. You adjust.`,
    `She is not the same shape two visits running. You tend accordingly.`,
  ],
  _d8: [
    `There is more of her than before. You tend all of it without rushing.`,
    `Immense soft landscape — heat at rest, specific needs of mass met by two hands.`,
  ],
};

for (const [key, lines] of Object.entries(beatFrags)) {
  registerModuleVariants(`set.care.tend.beat.${key}`, [{ when: {}, weight: 3, text: lines }]);
}

registerModuleVariants('set.socialize.gossip._d9', [
  { when: {}, weight: 3, text: [
    `Half the news she already heard through channels you do not understand.`,
    `What she says about it travels back out. Still point of the gossip web.`,
    `Campus moves around her. She finds the arrangement correct.`,
  ]},
]);

const gossipFrags = {
  _d10: [
    `You sit beside the warm spread of her and give her the week.`,
    `Raw material in; sorted verdict out. She is always right.`,
    `Campus news delivered like tribute. She weighs each piece.`,
  ],
  _d11: [
    `Oracle from a fixed point — drama classified, real story identified.`,
    `"That won't last," she says. "That's going to be a problem."`,
    `Distance is clarifying. Her perspective sharpened since immobility.`,
  ],
  _d12: [
    `Chair dragged close. Voice lowered. She takes each bit patiently.`,
    `"I thought so," she says. She is always thinking so.`,
    `Picture from pieces. Week unpacked in two minutes flat.`,
  ],
  _d13: [
    `Court from here — warm, vast, immobile, completely current.`,
    `"What else?" she says when you've given everything.`,
    `News finds its way to her. She always has.`,
  ],
  _d14: [
    `They call it court now — accurate enough.`,
    `You bring news; she weighs from warm center. Answer becomes truth.`,
    `Still point the gossip web organized around. Correct arrangement.`,
  ],
  _d15: [
    `Outside brought to her where outside cannot reach.`,
    `"Tell me the part they're leaving out," she says. You do.`,
    `Destination not traveler — she receives the week with unhurried confidence.`,
  ],
};

for (const [key, lines] of Object.entries(gossipFrags)) {
  registerModuleVariants(`set.socialize.gossip.${key}`, [{ when: {}, weight: 3, text: lines }]);
}

registerModuleVariants('set.socialize.gossip._d16', [
  { when: {}, weight: 3, text: [
    `Court from the warm center of the room — you bring news, she weighs it, campus orbits.`,
    `They call it court. Accurate: verdicts issued from where she rests, immobile and current.`,
    `News arrives like tribute. She sorts it without moving; the room accepts her answer.`,
  ]},
]);

registerModuleVariants('set.socialize.gossip._d17', [
  { when: {}, weight: 3, text: [
    `Half the gossip she already has — channels you cannot trace. The rest she processes aloud.`,
    `Campus whispers reach her anyway. What she says back becomes the official version.`,
    `She knew some of it before you spoke. The arrangement suits her; she finds it correct.`,
  ]},
]);

const confideFrags = {
  _d18: [
    `You tell her something you have told no one. She receives it from the warm center where she rests — no rush to fix.`,
    `The truth lands in her stillness. "How long have you carried that?" she asks. You have no clean answer.`,
    `Confession in the intimate radius of her immensity — she holds the fact until you are ready for the next part.`,
  ],
  _d19: [
    `She confides back — the deal. You bring something real; she returns something real from months of watching.`,
    `What she says is honest, not performed — perspective only fixed points earn.`,
    `She knows things from here she never knew while moving through campus. She offers one.`,
  ],
  _d20: [
    `"I've been thinking about something," she says when gossip is done. You listen.`,
    `What she shares is not for anyone else — room, you, the radius of her warmth only.`,
    `Unprompted honesty from the settled center. You do not interrupt. She finishes.`,
  ],
  _d21: [
    `The conversation goes somewhere neither of you planned — stillness invites more than you meant.`,
    `You say more because she is not going anywhere. She meets what you actually said.`,
    `"Yeah," she says when you finish. "I know." She always knew part of it.`,
  ],
  _d22: [
    `Her stillness makes telling easier than it should be — fixed point, calm immensity.`,
    `Whatever you bring stays in this room. She holds it the way she holds everything now.`,
    `Confession to someone who cannot leave and will not forget. The gravity helps.`,
  ],
  _d23: [
    `She hears the actual thing — not the comfortable version — without shifting or interrupting.`,
    `Then she hands it back smaller: "The problem is you keep waiting for permission."`,
    `You sit with that longer than you mean to. She lets the silence do its work.`,
  ],
  _d24: [
    `She tells you something she has told no one else — arrives without ceremony.`,
    `A fear, a fact, weeks of sitting with it because sitting is what she does now.`,
    `She tells it straight. You do not make it into something. She appreciates that.`,
  ],
  _d25: [
    `"You can tell me," she said weeks ago. You did not believe her. You believe her now.`,
    `Truth fits this room — immobility, stillness, the gravity of her presence.`,
    `You use the register only this space allows. She receives all of it.`,
  ],
  _d26: [
    `She is surprised each time you bring the real thing — not the performed version.`,
    `She listens with careful attention, determined not to waste what you gave her.`,
    `Gratitude without performance. She keeps it the way she keeps everything you trust her with.`,
  ],
};

for (const [key, lines] of Object.entries(confideFrags)) {
  registerModuleVariants(`set.socialize.confide.${key}`, [{ when: {}, weight: 3, text: lines }]);
}
