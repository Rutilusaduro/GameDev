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
    `Maintenance at leviathan scale — hottest places cooled, unreachable weight supported.`,
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
