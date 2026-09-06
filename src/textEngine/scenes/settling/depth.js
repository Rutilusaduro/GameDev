// The Squad — Lead: A5 Editor | Support: A1 Mobile
// Auto-generated — run: node scripts/generateSceneDepthPass37.mjs
// Wildcard depth for set.* pools (Pass 37).
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants("set.care.tend.beat", [{ when: {}, text: ["Small attentions at her scale — cushions shifted, warmth tended, presence steady."] }]);
registerModuleVariants("set.care.tend.react", [{ when: {}, text: ["She exhales into the care and does not ask you to stop."] }]);
registerModuleVariants("set.care.tend", [{ when: {}, text: ["{set.care.tend.beat}", "{set.care.tend.react}{set.enorm|prefix: }"] }]);
registerModuleVariants("set.socialize.gossip", [{ when: {}, text: ["You bring campus news; she sorts it from where she rests."] }]);
registerModuleVariants("set.socialize.confide", [{ when: {}, text: ["You tell her something real. She holds it without rushing to fix it."] }]);
registerModuleVariants("set.socialize.praise", [{ when: {}, text: ["{set.socialize.praise.react}", "{set.socialize.praise.line}"] }]);
registerModuleVariants("set.socialize.praise.line", [{ when: {}, text: ["\"Every week there is more of you,\" you say, palm sinking into warm softness. \"I love watching it happen.\""] }]);
registerModuleVariants("set.socialize.praise.react", [{ when: {}, text: ["She receives the praise like warmth — slow, settling, pleased."] }]);
registerModuleVariants("set.feed.preferred", [{ when: {}, text: ["You bring what she craves. She opens before you finish setting it down.", "Her preference is known now. You meet it without ceremony."] }]);
registerModuleVariants("set.feed.spread", [{ when: {}, text: ["You lay out enough for an afternoon. She starts without commentary."] }]);
registerModuleVariants("set.feed.stuffing", [{ when: {}, text: ["You offer one more past full. She takes it anyway."] }]);
registerModuleVariants("set.gather", [{ when: {}, text: ["Others drift in and settle around her warmth. The room becomes hers.", "Her court gathers without summons — close enough to share heat and gossip."] }]);
registerModuleVariants("set.weigh.travel", [{ when: {}, text: ["Weigh-day means going to her. You find her exactly where she always is."] }]);
registerModuleVariants("set.weigh.rig", [{ when: {}, text: ["Pads slide beneath her mass; the rig totals what the floor has held all week."] }]);
registerModuleVariants("set.weigh.number", [{ when: {}, text: ["The cells sum to {subject.lbs}. You read it aloud; she listens."] }]);
registerModuleVariants("set.weigh.react", [{ when: {}, text: ["She lets the number settle over her, warm and satisfied."] }]);
registerModuleVariants("set.weigh.approach", [{ when: {}, text: ["{set.weigh.travel}", "{set.weigh.rig}"] }]);
registerModuleVariants("set.weigh.result", [{ when: {}, text: ["{set.weigh.number}", "{set.weigh.react}"] }]);
registerModuleVariants("set.enorm", [{ when: {}, text: ["Her warmth reaches you before you are close enough to touch."] }]);
