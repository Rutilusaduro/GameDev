// The Squad — Lead: A3 Immobility | Support: A5 Editor
// Wildcard depth for set.* pools — stage-keyed beats appended by decompose.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('set.care.tend.beat', [
  { when: { stageMin: 11 }, text: [
    'Small attentions at room-filling scale — cushions shifted, warm folds cooled, presence steady across impossible geography.',
    'You move through her like a route: cloth, cushion, the careful redistribution of mass that furniture cannot manage alone.',
  ]},
  { when: { stageMin: 10 }, text: [
    'Small attentions at her scale — cushions shifted, warmth tended, presence steady.',
    'Cool cloth along a warm fold. Pillow beneath a hip. Maintenance as intimacy.',
  ]},
  { when: {}, text: [
    'You tend what needs tending. She holds still for it.',
    'Small necessary attentions at a scale that makes them intimate.',
  ]},
]);

registerModuleVariants('set.care.tend.react', [
  { when: { corruption: [2], stageMin: 10 }, weight: 3, text: [
    'She receives the care like tribute — pleased, proprietary, unhurried.',
    'She watches you work with an expression that says: continue. This is due.',
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    'She exhales into the care and does not ask you to stop.',
    'Something in her settles — warmth, trust, the ease of being kept.',
  ]},
  { when: {}, text: [
    'She exhales into the care and does not ask you to stop.',
    'She goes quiet under the attention. Her breathing slows.',
  ]},
]);

registerModuleVariants('set.care.tend', [
  { when: {}, text: ['{set.care.tend.beat}', '{set.care.tend.react}{set.enorm|prefix: }'] },
]);

registerModuleVariants('set.socialize.gossip', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'You bring campus news; she sorts it from the warm permanent center of her vantage.',
    'Court convenes without summons. You bring the week; she delivers the verdict.',
  ]},
  { when: {}, text: [
    'You bring campus news; she sorts it from where she rests.',
    'She listens like a judge who no longer has to leave to know what happened.',
  ]},
]);

registerModuleVariants('set.socialize.confide', [
  { when: { corruption: [2], stageMin: 10 }, weight: 3, text: [
    'You tell her something real. She holds it without rushing to fix it — then hands you something real back.',
    'The room absorbs what you said. She answers from immobile certainty.',
  ]},
  { when: {}, text: [
    'You tell her something real. She holds it without rushing to fix it.',
    'There is an ease to telling her things. She is here. She is not going anywhere.',
  ]},
]);

registerModuleVariants('set.socialize.praise.react', [
  { when: { corruption: [2] }, weight: 3, text: [
    'She receives the praise like tribute — accurate, welcome, deserved.',
    '"More," she says when you pause. She means every syllable.',
  ]},
  { when: { corruption: [1] }, weight: 2, text: [
    'She receives the praise like warmth — slow, settling, pleased.',
    'She lets each word land and does not deflect a single one.',
  ]},
  { when: {}, text: [
    'She receives the praise like warmth — slow, settling, pleased.',
    'Something settles in her at being named out loud.',
  ]},
]);

registerModuleVariants('set.socialize.praise.line', [
  { when: { stageMin: 11 }, weight: 3, text: [
    `"You fill the room," you tell her. "There's more of you than there's space for. I love that."`,
    `"{subject.lbs}," you say aloud. "Every week there is more. I love watching it happen."`,
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    `"Every week there is more of you," you say, palm sinking into warm softness. "I love watching it happen."`,
    `"Look what your thighs do now," you say, pressing a palm into one until it disappears to the wrist in soft heat.`,
  ]},
  { when: {}, text: [
    `"There's so much of you now," you tell her, resting a hand where her belly spills warm over her thigh.`,
    `"You spread a little wider every time I come in," you say, palm flat to the soft slope of her side.`,
  ]},
]);

registerModuleVariants('set.socialize.praise', [
  { when: {}, text: ['{set.socialize.praise.react}', '{set.socialize.praise.line}'] },
]);

registerModuleVariants('set.feed.preferred', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'You bring what she craves at the scale she requires. She opens before you finish setting it down.',
    'Her preference is known now — vast, consistent, entirely hers. You meet it without ceremony.',
  ]},
  { when: {}, text: [
    'You bring what she craves. She opens before you finish setting it down.',
    'Her preference is known now. You meet it without ceremony.',
  ]},
]);

registerModuleVariants('set.feed.spread', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'You lay out enough for an afternoon at her scale. She starts without commentary.',
    'The spread is an event. She eats through it like weather through a valley.',
  ]},
  { when: {}, text: [
    'You lay out enough for an afternoon. She starts without commentary.',
    'Abundance arranged for her. She reaches for the nearest thing.',
  ]},
]);

registerModuleVariants('set.feed.stuffing', [
  { when: { stageMin: 10 }, weight: 2, text: [
    'You offer one more past full. She takes it anyway — capacity always larger than it looked.',
    'She objects mildly, then opens again. She always discovers more room.',
  ]},
  { when: {}, text: [
    'You offer one more past full. She takes it anyway.',
    'She has found a little more room than she thought. She always does.',
  ]},
]);

registerModuleVariants('set.gather', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'Her court gathers without summons — close enough to share heat, gossip, and reverence.',
    'Others drift in and settle around her warmth. The room becomes hers by gravity.',
  ]},
  { when: {}, text: [
    'Others drift in and settle around her warmth. The room becomes hers.',
    'Her court gathers without summons — close enough to share heat and gossip.',
  ]},
]);

registerModuleVariants('set.weigh.travel', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'Weigh-day means going to her with a cartload of gear. You find her exactly where she always is.',
    'The scale travels now. She does not.',
  ]},
  { when: {}, text: [
    'Weigh-day means going to her. You find her exactly where she always is.',
    'You bring the rig to her room. She has not fit through the office door in a long time.',
  ]},
]);

registerModuleVariants('set.weigh.rig', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'Pads slide beneath her mass; you do all of it by hand. She holds still while the rig totals what the floor has held all week.',
    'No standing left. The cells gather the sum from under her instead of over her.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'Pads slide beneath her mass; she helps by inches. The rig totals what the floor has held all week.',
    'Load cells work under the parts of her that carry the most. The reading is assembled piece by piece.',
  ]},
  { when: {}, text: [
    'Pads slide beneath her mass; the rig totals what the floor has held all week.',
    'The scale comes to her. The reading is gathered from beneath, not above.',
  ]},
]);

registerModuleVariants('set.weigh.number', [
  { when: { stageMin: 10 }, weight: 2, text: [
    'The cells sum to {subject.lbs}. You read it aloud; she listens like a bell.',
    'The linked pads resolve: {subject.lbs} pounds. You say the number. She takes it in.',
  ]},
  { when: {}, text: [
    'The cells sum to {subject.lbs}. You read it aloud; she listens.',
    'The readout stops at {subject.lbs}. You say the number; she receives it.',
  ]},
]);

registerModuleVariants('set.weigh.react', [
  { when: { corruption: [2], stageMin: 10 }, weight: 3, text: [
    'She receives the total like a scoreboard reading in her favor. "Higher next time," she says.',
    'She lets the number settle over her, warm and satisfied, and does not ask you to round it down.',
  ]},
  { when: {}, text: [
    'She lets the number settle over her, warm and satisfied.',
    '"More than last time," she says, like it is the only result worth having.',
  ]},
]);

registerModuleVariants('set.weigh.approach', [
  { when: {}, text: ['{set.weigh.travel}', '{set.weigh.rig}'] },
]);

registerModuleVariants('set.weigh.result', [
  { when: {}, text: ['{set.weigh.number}', '{set.weigh.react}'] },
]);

registerModuleVariants('set.enorm', [
  { when: { stageMin: 11 }, weight: 3, text: [
    'Her warmth reaches you before you are close enough to touch — vast, steady, unmistakable.',
    'The room rearranges around her mass before you cross the threshold.',
  ]},
  { when: { stageMin: 10 }, weight: 2, text: [
    'Her warmth reaches you before you are close enough to touch.',
    'Heat and softness announce her before words do.',
  ]},
  { when: {}, text: [
    'Her warmth reaches you before you are close enough to touch.',
    'Something vast and settled occupies the room ahead of you.',
  ]},
]);
