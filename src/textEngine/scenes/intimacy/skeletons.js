// The Squad — Lead: A2 Psych | Support: A7 Artisan
// Intimacy scene prose — migrated from gameData/intimacy.js (Phase C.2).
// Regenerate: node scripts/generateIntimacy.mjs
import { registerPool } from '../../engine.js';

// Phase / choice / ending skeleton pools.

registerPool('intimacy.her_weight.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.her_weight.p0._f1} {intimacy.her_weight.p0._f2} {intimacy.her_weight.p0._f3}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.her_weight.p0._f4} {intimacy.her_weight.p0._f5} {intimacy.her_weight.p0._f6}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.her_weight.p0._f7} {intimacy.her_weight.p0._f8}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.her_weight.p0._f9} {intimacy.her_weight.p0._f10}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.her_weight.p0._f11} {intimacy.her_weight.p0._f12} {intimacy.her_weight.p0._f13}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.her_weight.p0._f14} {intimacy.her_weight.p0._f15} {intimacy.her_weight.p0._f16}"] },
  { when: {}, text: ["{intimacy.her_weight.p0._f17} {intimacy.her_weight.p0._f18} {intimacy.her_weight.p0._f19}"] },
]);
registerPool('intimacy.her_weight.ch.wrap_arms', [
  { when: {}, text: ["Your arms find the circumference of her — or most of it. Where they used to meet, they don't now. You pull her closer anyway."] },
]);
registerPool('intimacy.her_weight.ch.press_belly', [
  { when: {}, text: ["Both hands, spread wide. The warmth comes through your palms immediately. She makes a small sound."] },
]);
registerPool('intimacy.her_weight.ch.stay_still', [
  { when: {}, text: ["You let the mass of her rest against you without resistance. She settles deeper. The weight becomes familiar, then essential."] },
]);
registerPool('intimacy.her_weight.p1', [
  { when: {"stageMax":3,"relTier":1,"held_her":false}, text: ["{intimacy.her_weight.p1._f20} {intimacy.her_weight.p1._f21}"] },
  { when: {"stageMax":3,"relTier":1,"held_her":true}, text: ["{intimacy.her_weight.p1._f22} {intimacy.her_weight.p1._f23}"] },
  { when: {"stageMax":3,"relTier":3,"held_her":false}, text: ["{intimacy.her_weight.p1._f24} {intimacy.her_weight.p1._f25}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_her":false}, text: ["{intimacy.her_weight.p1._f26} {intimacy.her_weight.p1._f27}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_her":true}, text: ["{intimacy.her_weight.p1._f28} {intimacy.her_weight.p1._f29}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3,"held_her":false}, text: ["{intimacy.her_weight.p1._f30} {intimacy.her_weight.p1._f31}"] },
  { when: {"stageMin":10,"relTier":1,"held_her":false}, text: ["{intimacy.her_weight.p1._f32} {intimacy.her_weight.p1._f33}"] },
  { when: {"stageMin":10,"relTier":1,"held_her":true}, text: ["{intimacy.her_weight.p1._f34} {intimacy.her_weight.p1._f35} {intimacy.her_weight.p1._f36}"] },
  { when: {"stageMin":10,"relTier":3,"held_her":false}, text: ["{intimacy.her_weight.p1._f37} {intimacy.her_weight.p1._f38}"] },
  { when: {}, text: ["{intimacy.her_weight.p1._f39} {intimacy.her_weight.p1._f40}"] },
]);
registerPool('intimacy.her_weight.ch.rock_gently', [
  { when: {}, text: ["The momentum of it is remarkable. Even a small motion takes effort to start and more to stop. She feels it too — her breath changes."] },
]);
registerPool('intimacy.her_weight.ch.pull_closer', [
  { when: {}, text: ["She comes closer with a soft sound of surprise, then settles. Her body is pressed the full length of yours now. The warmth is complete."] },
]);
registerPool('intimacy.her_weight.ch.spread_hands', [
  { when: {}, text: ["You measure the extent of her — both hands flat, trying to cover the full soft breadth of her belly. You can't. She makes a sound that might be pride."] },
]);
registerPool('intimacy.her_weight.ch.kiss_neck', [
  { when: {}, text: ["She tilts her head back to give you better access. The weight of her shifts against you entirely."] },
]);
registerPool('intimacy.her_weight.p2', [
  { when: {"stageMax":3,"relTier":1,"measured_her":false}, text: ["She's been here long enough that the weight feels natural now. You've stopped adjusting. She's stopped asking if you're okay. This is just how you are together."] },
  { when: {"stageMax":3,"relTier":1,"measured_her":true}, text: ["{intimacy.her_weight.p2._f41} {intimacy.her_weight.p2._f42}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"measured_her":false}, text: ["The warmth of her has seeped into you completely. You're aware of every pound of her, every degree of heat, the specific way her belly rests between your forearms when she breathes out."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"measured_her":true}, text: ["{intimacy.her_weight.p2._f43} {intimacy.her_weight.p2._f44}"] },
  { when: {"stageMin":10,"relTier":1,"measured_her":false}, text: ["{intimacy.her_weight.p2._f45} {intimacy.her_weight.p2._f46}"] },
  { when: {"stageMin":10,"relTier":1,"measured_her":true}, text: ["{intimacy.her_weight.p2._f47} {intimacy.her_weight.p2._f48} {intimacy.her_weight.p2._f49}"] },
  { when: {}, text: ["She's been here long enough that the weight feels natural now. You've stopped adjusting. She's stopped asking if you're okay. This is just how you are together."] },
]);
registerPool('intimacy.her_weight.ch.say_something', [
  { when: {}, text: ["You try to say it. The words aren't quite right but she understands them anyway."] },
]);
registerPool('intimacy.her_weight.ch.stay_silent', [
  { when: {}, text: ["Nothing needs to be said. She presses back against you, confirmation."] },
]);
registerPool('intimacy.her_weight.ch.reach_lower', [
  { when: {}, text: ["She doesn't stop you. Her breathing changes."] },
]);
registerPool('intimacy.her_weight.end0', [
  { when: {}, text: ["{intimacy.her_weight.end0._f50} {intimacy.her_weight.end0._f51}"] },
]);
registerPool('intimacy.her_weight.end1', [
  { when: {}, text: ["{intimacy.her_weight.end1._f52} {intimacy.her_weight.end1._f53}"] },
]);
registerPool('intimacy.her_weight.end2', [
  { when: {}, text: ["She eases off you carefully and you sit with the warmth she's left behind. She smooths her dress and looks at you with an expression that is entirely satisfied. \"Well,\" she says. \"Now you know.\""] },
]);
registerPool('intimacy.wall_press.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.wall_press.p0._f54} {intimacy.wall_press.p0._f55}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.wall_press.p0._f56} {intimacy.wall_press.p0._f57}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.wall_press.p0._f58} {intimacy.wall_press.p0._f59} {intimacy.wall_press.p0._f60}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.wall_press.p0._f61} {intimacy.wall_press.p0._f62} {intimacy.wall_press.p0._f63}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.wall_press.p0._f64} {intimacy.wall_press.p0._f65}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.wall_press.p0._f66} {intimacy.wall_press.p0._f67}"] },
  { when: {}, text: ["{intimacy.wall_press.p0._f68} {intimacy.wall_press.p0._f69}"] },
]);
registerPool('intimacy.wall_press.ch.press_in', [
  { when: {}, text: ["You lean in and feel the soft resistance of her — not fighting you, absorbing you. She makes a soft, satisfied sound."] },
]);
registerPool('intimacy.wall_press.ch.hands_hips', [
  { when: {}, text: ["Your hands find her hips and feel the full circumference of them — wide, warm, giving under the pressure of your fingers."] },
]);
registerPool('intimacy.wall_press.ch.let_her_lead', [
  { when: {}, text: ["She takes the invitation and leans forward, the weight of her coming against you with intent. It's more than you expected. You brace."] },
]);
registerPool('intimacy.wall_press.p1', [
  { when: {"stageMax":3,"relTier":1,"pressed_in":false}, text: ["Her back is flat against the wall, your body against hers, and the warmth between you has built into something palpable. She's watching your face with great attention."] },
  { when: {"stageMax":3,"relTier":1,"pressed_in":true}, text: ["Her back is flat against the wall, your body against hers, and the warmth between you has built into something palpable. She's stopped breathing quite so carefully."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pressed_in":false}, text: ["{intimacy.wall_press.p1._f70} {intimacy.wall_press.p1._f71}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pressed_in":true}, text: ["{intimacy.wall_press.p1._f72} {intimacy.wall_press.p1._f73}"] },
  { when: {"stageMin":10,"relTier":1,"pressed_in":false}, text: ["{intimacy.wall_press.p1._f74} {intimacy.wall_press.p1._f75}"] },
  { when: {"stageMin":10,"relTier":1,"pressed_in":true}, text: ["{intimacy.wall_press.p1._f76} {intimacy.wall_press.p1._f77}"] },
  { when: {}, text: ["Her back is flat against the wall, your body against hers, and the warmth between you has built into something palpable. She's watching your face with great attention."] },
]);
registerPool('intimacy.wall_press.ch.drag_hands', [
  { when: {}, text: ["Up from her hips, over the soft swells of her sides, feeling the warmth and weight and depth of her. She arches slightly."] },
]);
registerPool('intimacy.wall_press.ch.lift_belly', [
  { when: {}, text: ["Both hands finding the underside of her belly, lifting gently. The weight of it settles into your palms. She looks down at your hands and then up at you."] },
]);
registerPool('intimacy.wall_press.ch.press_forehead', [
  { when: {}, text: ["The intimacy of it is different from the physical. She closes her eyes."] },
]);
registerPool('intimacy.wall_press.ch.grind_slow', [
  { when: {}, text: ["She makes a sound she wasn't planning to make. Her hands find the wall behind her."] },
]);
registerPool('intimacy.wall_press.p2', [
  { when: {"stageMax":3,"relTier":1,"held_belly":false}, text: ["You've been here long enough that the initial urgency has settled into something slower and more certain. The warmth between you is total."] },
  { when: {"stageMax":3,"relTier":1,"held_belly":true}, text: ["You've been here long enough that the initial urgency has settled into something slower and more certain. The warmth between you is total. She puts her hands over yours, holding them against her."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_belly":false}, text: ["She's still against the wall and you're still against her and neither of you has suggested doing anything else. The mass and warmth of her is the whole situation."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_belly":true}, text: ["{intimacy.wall_press.p2._f78} {intimacy.wall_press.p2._f79}"] },
  { when: {"stageMin":10,"relTier":1,"held_belly":false}, text: ["The weight she's pressing against you is extraordinary — dozens of pounds per square inch of contact, warm and soft and completely present. She's not going anywhere. Neither are you."] },
  { when: {"stageMin":10,"relTier":1,"held_belly":true}, text: ["{intimacy.wall_press.p2._f80} {intimacy.wall_press.p2._f81}"] },
  { when: {}, text: ["You've been here long enough that the initial urgency has settled into something slower and more certain. The warmth between you is total."] },
]);
registerPool('intimacy.wall_press.ch.whisper_close', [
  { when: {}, text: ["You tell her. Her expression changes completely."] },
]);
registerPool('intimacy.wall_press.ch.stay_pressed', [
  { when: {}, text: ["The silence is the answer. She nods, very slightly. Yes. This."] },
]);
registerPool('intimacy.wall_press.ch.kiss_jaw', [
  { when: {}, text: ["She tilts her head back, giving you the full length of her throat. Against you, the mass of her shifts."] },
]);
registerPool('intimacy.wall_press.end0', [
  { when: {}, text: ["She stays against the wall after you step back, as though the wall has become preferable to unoccupied space. \"Come back,\" she says. Her voice is very quiet. \"I want you to come back.\""] },
]);
registerPool('intimacy.wall_press.end1', [
  { when: {}, text: ["Pulling back from her is a slow process — the warmth and pressure of her resist the separation. She watches you go with an expression that is entirely patient. She knows you'll return."] },
]);
registerPool('intimacy.wall_press.end2', [
  { when: {}, text: ["She eases off the wall slowly and the space between you feels strange — cold, too large. \"That was good,\" she says. Not a question. A conclusion."] },
]);
registerPool('intimacy.belly_focus.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.belly_focus.p0._f82} {intimacy.belly_focus.p0._f83}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.belly_focus.p0._f84} {intimacy.belly_focus.p0._f85}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.belly_focus.p0._f86} {intimacy.belly_focus.p0._f87}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.belly_focus.p0._f88} {intimacy.belly_focus.p0._f89}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.belly_focus.p0._f90} {intimacy.belly_focus.p0._f91}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.belly_focus.p0._f92} {intimacy.belly_focus.p0._f93}"] },
  { when: {}, text: ["{intimacy.belly_focus.p0._f94} {intimacy.belly_focus.p0._f95}"] },
]);
registerPool('intimacy.belly_focus.ch.press_deep', [
  { when: {}, text: ["You press and feel the resistance build slowly, slowly — an inch, two inches, three. The depth is startling. She breathes out."] },
]);
registerPool('intimacy.belly_focus.ch.circle_slow', [
  { when: {}, text: ["The belly moves under your hands in a soft, heavy wave. She makes a sound that means keep going."] },
]);
registerPool('intimacy.belly_focus.ch.lift_gently', [
  { when: {}, text: ["Both hands under the underside, lifting slightly. The weight of it is specific and real. She laughs softly — she felt that."] },
]);
registerPool('intimacy.belly_focus.p1', [
  { when: {"stageMax":3,"relTier":1,"pressed_deep":false}, text: ["She's relaxed completely — her body has given over to your hands, the belly soft and responsive under each touch. She watches your hands when she can."] },
  { when: {"stageMax":3,"relTier":1,"pressed_deep":true}, text: ["{intimacy.belly_focus.p1._f96} {intimacy.belly_focus.p1._f97}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pressed_deep":false}, text: ["{intimacy.belly_focus.p1._f98} {intimacy.belly_focus.p1._f99}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pressed_deep":true}, text: ["{intimacy.belly_focus.p1._f100} {intimacy.belly_focus.p1._f101}"] },
  { when: {"stageMin":10,"relTier":1,"pressed_deep":false}, text: ["{intimacy.belly_focus.p1._f102} {intimacy.belly_focus.p1._f103}"] },
  { when: {"stageMin":10,"relTier":1,"pressed_deep":true}, text: ["{intimacy.belly_focus.p1._f104} {intimacy.belly_focus.p1._f105}"] },
  { when: {}, text: ["She's relaxed completely — her body has given over to your hands, the belly soft and responsive under each touch. She watches your hands when she can."] },
]);
registerPool('intimacy.belly_focus.ch.knead_sides', [
  { when: {}, text: ["The sides of her belly are softer than the front — wide, warm, deep. Your fingers sink easily. She makes a low sound."] },
]);
registerPool('intimacy.belly_focus.ch.press_navel', [
  { when: {}, text: ["The navel is a whole geography. You explore it with both thumbs. She grips the sheets."] },
]);
registerPool('intimacy.belly_focus.ch.rest_head', [
  { when: {}, text: ["The warmth of it against your cheek is immediate and total. Under it, her digestion continues its slow work. She puts her hand on the back of your head."] },
]);
registerPool('intimacy.belly_focus.ch.whisper_size', [
  { when: {}, text: ["You say it quietly. She breathes in sharply and then lets it out slowly. Her belly presses out further with the exhale."] },
]);
registerPool('intimacy.belly_focus.p2', [
  { when: {"stageMax":3,"relTier":1,"rested_close":false,"named_her":false}, text: ["Your hands know her now. The specific warmth of her belly, the depth of it, the particular way it gives under your palms and holds you there."] },
  { when: {"stageMax":3,"relTier":1,"rested_close":true,"named_her":false}, text: ["Your hands know her now. The specific warmth of her belly, the depth of it, the particular way it gives under your palms and holds you there. She hasn't moved your head. She's keeping you there."] },
  { when: {"stageMax":3,"relTier":1,"rested_close":false,"named_her":true}, text: ["{intimacy.belly_focus.p2._f106} {intimacy.belly_focus.p2._f107}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"rested_close":false,"named_her":false}, text: ["You've mapped the surface and you've found that the map keeps getting bigger. She's been growing. You can feel the new softness — weeks of growth gathered under your hands."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"rested_close":true,"named_her":false}, text: ["{intimacy.belly_focus.p2._f108} {intimacy.belly_focus.p2._f109}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"rested_close":false,"named_her":true}, text: ["{intimacy.belly_focus.p2._f110} {intimacy.belly_focus.p2._f111}"] },
  { when: {"stageMin":10,"relTier":1,"rested_close":false,"named_her":false}, text: ["There is more of her than there was last time you were here. You find new territory — further out, deeper down, warmer. She has been accumulating herself for months and it shows under your hands."] },
  { when: {"stageMin":10,"relTier":1,"rested_close":true,"named_her":false}, text: ["{intimacy.belly_focus.p2._f112} {intimacy.belly_focus.p2._f113}"] },
  { when: {"stageMin":10,"relTier":1,"rested_close":false,"named_her":true}, text: ["{intimacy.belly_focus.p2._f114} {intimacy.belly_focus.p2._f115}"] },
  { when: {}, text: ["Your hands know her now. The specific warmth of her belly, the depth of it, the particular way it gives under your palms and holds you there."] },
]);
registerPool('intimacy.belly_focus.ch.say_want_more', [
  { when: {}, text: ["The words come out exactly right. Her belly rises under your hands — she's inhaled sharply, deeply. She holds the breath. Then releases it."] },
]);
registerPool('intimacy.belly_focus.ch.kiss_belly', [
  { when: {}, text: ["She goes very still. You stay there a long time. Neither of you speaks."] },
]);
registerPool('intimacy.belly_focus.ch.keep_hands_moving', [
  { when: {}, text: ["She understands. No words. Just your hands on her belly, constant and certain."] },
]);
registerPool('intimacy.belly_focus.end0', [
  { when: {}, text: ["{intimacy.belly_focus.end0._f116} {intimacy.belly_focus.end0._f117}"] },
]);
registerPool('intimacy.belly_focus.end1', [
  { when: {}, text: ["She keeps your head there against her belly long after the exploration has ended. You stay. The warmth and depth of her become ordinary in the best way — familiar, essential, necessary."] },
]);
registerPool('intimacy.belly_focus.end2', [
  { when: {}, text: ["She sits up slowly, her belly coming with her in its full soft weight, and she watches your face. \"I know you liked that,\" she says. She's right. She's completely right."] },
]);
registerPool('intimacy.chest_buried.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.chest_buried.p0._f118} {intimacy.chest_buried.p0._f119}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.chest_buried.p0._f120} {intimacy.chest_buried.p0._f121}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.chest_buried.p0._f122} {intimacy.chest_buried.p0._f123}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.chest_buried.p0._f124} {intimacy.chest_buried.p0._f125}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.chest_buried.p0._f126} {intimacy.chest_buried.p0._f127}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.chest_buried.p0._f128} {intimacy.chest_buried.p0._f129}"] },
  { when: {}, text: ["{intimacy.chest_buried.p0._f130} {intimacy.chest_buried.p0._f131}"] },
]);
registerPool('intimacy.chest_buried.ch.turn_face', [
  { when: {}, text: ["The depth is startling. Warm, enclosed, soft on both sides. She makes a sound you feel in your chest."] },
]);
registerPool('intimacy.chest_buried.ch.hands_chest', [
  { when: {}, text: ["Both hands cupping the weight from below. The heft of it is real and warm. She gasps softly."] },
]);
registerPool('intimacy.chest_buried.ch.breathe_slow', [
  { when: {}, text: ["She stills around you. Your breath against her skin. Her body tightening and releasing with each breath."] },
]);
registerPool('intimacy.chest_buried.p1', [
  { when: {"stageMax":3,"relTier":1,"went_deep":false}, text: ["{intimacy.chest_buried.p1._f132} {intimacy.chest_buried.p1._f133}"] },
  { when: {"stageMax":3,"relTier":1,"went_deep":true}, text: ["{intimacy.chest_buried.p1._f134} {intimacy.chest_buried.p1._f135}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"went_deep":false}, text: ["{intimacy.chest_buried.p1._f136} {intimacy.chest_buried.p1._f137}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"went_deep":true}, text: ["{intimacy.chest_buried.p1._f138} {intimacy.chest_buried.p1._f139}"] },
  { when: {"stageMin":10,"relTier":1,"went_deep":false}, text: ["{intimacy.chest_buried.p1._f140} {intimacy.chest_buried.p1._f141}"] },
  { when: {"stageMin":10,"relTier":1,"went_deep":true}, text: ["{intimacy.chest_buried.p1._f142} {intimacy.chest_buried.p1._f143}"] },
  { when: {}, text: ["{intimacy.chest_buried.p1._f144} {intimacy.chest_buried.p1._f145}"] },
]);
registerPool('intimacy.chest_buried.ch.find_heartbeat', [
  { when: {}, text: ["You find it: steady, sure, deep below the softness. She goes very still."] },
]);
registerPool('intimacy.chest_buried.ch.squeeze_gently', [
  { when: {}, text: ["Both hands pulling slightly inward — the softness responds immediately, surrounding you further. She makes a sound she didn't plan."] },
]);
registerPool('intimacy.chest_buried.ch.look_up', [
  { when: {}, text: ["You tilt your head back and find her face above you — her expression is something you'll remember for a long time."] },
]);
registerPool('intimacy.chest_buried.ch.say_something_muffled', [
  { when: {}, text: ["She laughs — a real laugh, surprised and warm. \"What?\" she says. She heard you perfectly."] },
]);
registerPool('intimacy.chest_buried.p2', [
  { when: {"stageMax":3,"relTier":1,"found_heart":false}, text: ["The warmth of her has become complete. You've stopped noticing it as a sensation and started noticing it as the absence of everything else."] },
  { when: {"stageMax":3,"relTier":1,"found_heart":true}, text: ["The warmth of her has become complete. You've stopped noticing it as a sensation and started noticing it as the absence of everything else. Her heartbeat has slowed. She's relaxed completely."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"found_heart":false}, text: ["You are in her chest completely — her body around your face, her heartbeat audible, her breathing moving you with each slow expansion."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"found_heart":true}, text: ["You are in her chest completely — her body around your face, her heartbeat audible, her breathing moving you with each slow expansion. Her heartbeat has slowed. She's relaxed completely."] },
  { when: {"stageMin":10,"relTier":1,"found_heart":false}, text: ["The world is her chest. Soft and warm and deep and entirely enclosing. You have been here long enough that it feels like the natural state of things."] },
  { when: {"stageMin":10,"relTier":1,"found_heart":true}, text: ["{intimacy.chest_buried.p2._f146} {intimacy.chest_buried.p2._f147}"] },
  { when: {}, text: ["The warmth of her has become complete. You've stopped noticing it as a sensation and started noticing it as the absence of everything else."] },
]);
registerPool('intimacy.chest_buried.ch.stay_forever', [
  { when: {}, text: ["You don't speak. You just settle deeper, let your body relax into hers. She understands."] },
]);
registerPool('intimacy.chest_buried.ch.tell_her_gorgeous', [
  { when: {}, text: ["You say it into her chest and she feels the words before she hears them. Her grip tightens."] },
]);
registerPool('intimacy.chest_buried.ch.let_weight_press', [
  { when: {}, text: ["She lets herself rest her weight on you fully — the mass of her chest, warm and heavy, becomes the whole of the experience."] },
]);
registerPool('intimacy.chest_buried.end0', [
  { when: {}, text: ["{intimacy.chest_buried.end0._f148} {intimacy.chest_buried.end0._f149}"] },
]);
registerPool('intimacy.chest_buried.end1', [
  { when: {}, text: ["She pulls you up by the chin and kisses you once, completely, and then pulls you back down. \"Stay,\" she says against your hair. \"I'm not done.\""] },
]);
registerPool('intimacy.chest_buried.end2', [
  { when: {}, text: ["{intimacy.chest_buried.end2._f150} {intimacy.chest_buried.end2._f151}"] },
]);
registerPool('intimacy.thighs_lap.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.thighs_lap.p0._f152} {intimacy.thighs_lap.p0._f153}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.thighs_lap.p0._f154} {intimacy.thighs_lap.p0._f155}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.thighs_lap.p0._f156} {intimacy.thighs_lap.p0._f157}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.thighs_lap.p0._f158} {intimacy.thighs_lap.p0._f159} {intimacy.thighs_lap.p0._f160}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.thighs_lap.p0._f161} {intimacy.thighs_lap.p0._f162}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.thighs_lap.p0._f163} {intimacy.thighs_lap.p0._f164}"] },
  { when: {}, text: ["{intimacy.thighs_lap.p0._f165} {intimacy.thighs_lap.p0._f166}"] },
]);
registerPool('intimacy.thighs_lap.ch.press_thighs_in', [
  { when: {}, text: ["You push gently inward and the thighs yield and then return, warm and certain. She makes a low sound."] },
]);
registerPool('intimacy.thighs_lap.ch.hands_on_thighs', [
  { when: {}, text: ["Both hands on the tops of her thighs, spread wide. The warmth and softness are immediate. You can feel the density of them — not just surface."] },
]);
registerPool('intimacy.thighs_lap.ch.settle_in', [
  { when: {}, text: ["You lean back and she opens to accommodate you and then closes around you again, the full warm mass of her thighs holding you from either side."] },
]);
registerPool('intimacy.thighs_lap.p1', [
  { when: {"stageMax":3,"relTier":1,"settled_in":false}, text: ["{intimacy.thighs_lap.p1._f167} {intimacy.thighs_lap.p1._f168}"] },
  { when: {"stageMax":3,"relTier":1,"settled_in":true}, text: ["{intimacy.thighs_lap.p1._f169} {intimacy.thighs_lap.p1._f170}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"settled_in":false}, text: ["{intimacy.thighs_lap.p1._f171} {intimacy.thighs_lap.p1._f172}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"settled_in":true}, text: ["{intimacy.thighs_lap.p1._f173} {intimacy.thighs_lap.p1._f174}"] },
  { when: {"stageMin":10,"relTier":1,"settled_in":false}, text: ["{intimacy.thighs_lap.p1._f175} {intimacy.thighs_lap.p1._f176}"] },
  { when: {"stageMin":10,"relTier":1,"settled_in":true}, text: ["{intimacy.thighs_lap.p1._f177} {intimacy.thighs_lap.p1._f178}"] },
  { when: {}, text: ["{intimacy.thighs_lap.p1._f179} {intimacy.thighs_lap.p1._f180}"] },
]);
registerPool('intimacy.thighs_lap.ch.measure_thigh', [
  { when: {}, text: ["You can't. The thigh is too wide. Your hand doesn't make a dent in the circumference. She looks at your hand and then at you."] },
]);
registerPool('intimacy.thighs_lap.ch.squeeze_back', [
  { when: {}, text: ["The response is immediate — she gasps softly and her thighs tighten around you. The pressure escalates."] },
]);
registerPool('intimacy.thighs_lap.ch.lean_back_into_her', [
  { when: {}, text: ["You recline against her belly and she wraps around you from behind, the full warmth of her body enclosing yours entirely."] },
]);
registerPool('intimacy.thighs_lap.ch.trace_inner_thigh', [
  { when: {}, text: ["Your fingertip along the inside of her thigh, slow and deliberate. She stops breathing for a moment."] },
]);
registerPool('intimacy.thighs_lap.p2', [
  { when: {"stageMax":3,"relTier":1,"full_embrace":false}, text: ["The two of you have settled into the specific warmth of this — her thighs on either side, your bodies close and certain."] },
  { when: {"stageMax":3,"relTier":1,"full_embrace":true}, text: ["The two of you have settled into the specific warmth of this — her thighs on either side, your bodies close and certain. She has her chin on your head. Her belly presses warmly against your back."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"full_embrace":false}, text: ["There's nowhere to go and you don't want to go anywhere. The warmth of her thighs is complete and the weight of them is real and you are exactly where you want to be."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"full_embrace":true}, text: ["{intimacy.thighs_lap.p2._f181} {intimacy.thighs_lap.p2._f182}"] },
  { when: {"stageMin":10,"relTier":1,"full_embrace":false}, text: ["Her thighs are the world. Soft, enormous, warm on both sides, the weight of them against your ribs and hips definite and real. You've stopped noticing where you end and she begins."] },
  { when: {"stageMin":10,"relTier":1,"full_embrace":true}, text: ["{intimacy.thighs_lap.p2._f183} {intimacy.thighs_lap.p2._f184}"] },
  { when: {}, text: ["The two of you have settled into the specific warmth of this — her thighs on either side, your bodies close and certain."] },
]);
registerPool('intimacy.thighs_lap.ch.tell_her_thighs', [
  { when: {}, text: ["You say it. She squeezes once, deliberately, so you feel the answer."] },
]);
registerPool('intimacy.thighs_lap.ch.stay_held', [
  { when: {}, text: ["Silence. Her thighs holding you. Both of you completely still. The warmth the only motion."] },
]);
registerPool('intimacy.thighs_lap.ch.push_deeper', [
  { when: {}, text: ["You shift and she accommodates you and you are further in, closer, the full circumference of her thighs on both sides."] },
]);
registerPool('intimacy.thighs_lap.end0', [
  { when: {}, text: ["{intimacy.thighs_lap.end0._f185} {intimacy.thighs_lap.end0._f186}"] },
]);
registerPool('intimacy.thighs_lap.end1', [
  { when: {}, text: ["She watches you fail to wrap your hand around her thigh and she smiles — slow and satisfied. \"Better get used to it,\" she says. You plan to."] },
]);
registerPool('intimacy.thighs_lap.end2', [
  { when: {}, text: ["She releases you eventually with a slow exhale, the warm pressure of her thighs receding. You turn to face her. She looks warm and deeply satisfied. \"Come back,\" she says. Not a question."] },
]);
registerPool('intimacy.under_her.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.under_her.p0._f187} {intimacy.under_her.p0._f188}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.under_her.p0._f189} {intimacy.under_her.p0._f190}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.under_her.p0._f191} {intimacy.under_her.p0._f192}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.under_her.p0._f193} {intimacy.under_her.p0._f194}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.under_her.p0._f195} {intimacy.under_her.p0._f196} {intimacy.under_her.p0._f197}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.under_her.p0._f198} {intimacy.under_her.p0._f199} {intimacy.under_her.p0._f200}"] },
  { when: {}, text: ["{intimacy.under_her.p0._f201} {intimacy.under_her.p0._f202}"] },
]);
registerPool('intimacy.under_her.ch.take_weight', [
  { when: {}, text: ["You stop bracing and let her settle completely. The weight doubles. She makes a sound of satisfaction at the feeling of you accepting her."] },
]);
registerPool('intimacy.under_her.ch.hands_back', [
  { when: {}, text: ["Both hands on the broad warm surface of her back, pressing her down, wanting more of her weight rather than less."] },
]);
registerPool('intimacy.under_her.ch.breathing', [
  { when: {}, text: ["You calibrate: shallow breaths, steady rhythm, her weight on your chest with each exhale and your ribs fighting it on each inhale. It's deeply grounding."] },
]);
registerPool('intimacy.under_her.p1', [
  { when: {"stageMax":3,"relTier":1,"accepted_weight":false}, text: ["{intimacy.under_her.p1._f203} {intimacy.under_her.p1._f204}"] },
  { when: {"stageMax":3,"relTier":1,"accepted_weight":true}, text: ["{intimacy.under_her.p1._f205} {intimacy.under_her.p1._f206}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"accepted_weight":false}, text: ["She has settled onto you completely and the weight of her is the room. Her belly spreads warmly over yours. Her chest is against yours. Her thighs pin your legs. She watches your face from above."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"accepted_weight":true}, text: ["{intimacy.under_her.p1._f207} {intimacy.under_her.p1._f208}"] },
  { when: {"stageMin":10,"relTier":1,"accepted_weight":false}, text: ["{intimacy.under_her.p1._f209} {intimacy.under_her.p1._f210}"] },
  { when: {"stageMin":10,"relTier":1,"accepted_weight":true}, text: ["{intimacy.under_her.p1._f211} {intimacy.under_her.p1._f212}"] },
  { when: {}, text: ["{intimacy.under_her.p1._f213} {intimacy.under_her.p1._f214}"] },
]);
registerPool('intimacy.under_her.ch.wrap_up', [
  { when: {}, text: ["You reach up and your arms don't quite make it all the way around. You pull anyway. She comes down further."] },
]);
registerPool('intimacy.under_her.ch.shift_under', [
  { when: {}, text: ["The weight above you moves in a slow wave. She makes a sound that's half surprise, half pleasure."] },
]);
registerPool('intimacy.under_her.ch.press_belly_up', [
  { when: {}, text: ["The pressure between your bellies increases. Soft against soft, but hers is vastly, definitively more. She feels the gesture and presses back."] },
]);
registerPool('intimacy.under_her.ch.say_heavier', [
  { when: {}, text: ["She looks down at you. \"I can do that,\" she says. She sounds entirely calm about it. You believe her."] },
]);
registerPool('intimacy.under_her.p2', [
  { when: {"stageMax":3,"relTier":1,"asked_heavier":false}, text: ["She's on top of you and neither of you is in a hurry. The weight of her is familiar now — warm, definite, completely present."] },
  { when: {"stageMax":3,"relTier":1,"asked_heavier":true}, text: ["{intimacy.under_her.p2._f215} {intimacy.under_her.p2._f216}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"asked_heavier":false}, text: ["The world is her weight. Everything below it — the mattress, your body, all of it — exists in relation to the warm, soft, heavy mass of her pressing down."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"asked_heavier":true}, text: ["{intimacy.under_her.p2._f217} {intimacy.under_her.p2._f218}"] },
  { when: {"stageMin":10,"relTier":1,"asked_heavier":false}, text: ["She fills your whole sky. Soft and warm and enormous above you, her weight distributed across you completely, her belly the ceiling. The physics are staggering."] },
  { when: {"stageMin":10,"relTier":1,"asked_heavier":true}, text: ["{intimacy.under_her.p2._f219} {intimacy.under_her.p2._f220}"] },
  { when: {}, text: ["She's on top of you and neither of you is in a hurry. The weight of her is familiar now — warm, definite, completely present."] },
]);
registerPool('intimacy.under_her.ch.stay_under', [
  { when: {}, text: ["\"You don't have to ask,\" she says. She stays."] },
]);
registerPool('intimacy.under_her.ch.reach_face', [
  { when: {}, text: ["Your hand against her cheek, above you. She turns into it."] },
]);
registerPool('intimacy.under_her.ch.feel_movement', [
  { when: {}, text: ["The weight shifts and redistributes above you in slow, warm waves. The scale of it is remarkable."] },
]);
registerPool('intimacy.under_her.end0', [
  { when: {}, text: ["{intimacy.under_her.end0._f221} {intimacy.under_her.end0._f222}"] },
]);
registerPool('intimacy.under_her.end1', [
  { when: {}, text: ["{intimacy.under_her.end1._f223} {intimacy.under_her.end1._f224}"] },
]);
registerPool('intimacy.under_her.end2', [
  { when: {}, text: ["{intimacy.under_her.end2._f225} {intimacy.under_her.end2._f226}"] },
]);
registerPool('intimacy.feed_close.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.feed_close.p0._f227} {intimacy.feed_close.p0._f228}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.feed_close.p0._f229} {intimacy.feed_close.p0._f230} {intimacy.feed_close.p0._f231}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.feed_close.p0._f232} {intimacy.feed_close.p0._f233}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.feed_close.p0._f234} {intimacy.feed_close.p0._f235}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.feed_close.p0._f236} {intimacy.feed_close.p0._f237}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.feed_close.p0._f238} {intimacy.feed_close.p0._f239} {intimacy.feed_close.p0._f240}"] },
  { when: {}, text: ["{intimacy.feed_close.p0._f241} {intimacy.feed_close.p0._f242}"] },
]);
registerPool('intimacy.feed_close.ch.feed_slow', [
  { when: {}, text: ["Each bite deliberate. You watch her throat work. You feel her belly against your forearm, warm and present."] },
]);
registerPool('intimacy.feed_close.ch.feed_more', [
  { when: {}, text: ["She doesn't hesitate. Bite follows bite and you feel the belly in your arms begin its slow work of expansion."] },
]);
registerPool('intimacy.feed_close.ch.whisper_eat', [
  { when: {}, text: ["You say things into her hair while she eats and she chews and swallows and the belly grows warm against you."] },
]);
registerPool('intimacy.feed_close.p1', [
  { when: {"stageMax":3,"relTier":1,"fed_more":false}, text: ["She's been eating and the belly against your forearm is perceptibly warmer, slightly firmer than when you started. She's settling into the fullness. She leans back further into you."] },
  { when: {"stageMax":3,"relTier":1,"fed_more":true}, text: ["{intimacy.feed_close.p1._f243} {intimacy.feed_close.p1._f244}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"fed_more":false}, text: ["{intimacy.feed_close.p1._f245} {intimacy.feed_close.p1._f246}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"fed_more":true}, text: ["{intimacy.feed_close.p1._f247} {intimacy.feed_close.p1._f248}"] },
  { when: {"stageMin":10,"relTier":1,"fed_more":false}, text: ["{intimacy.feed_close.p1._f249} {intimacy.feed_close.p1._f250} {intimacy.feed_close.p1._f251}"] },
  { when: {"stageMin":10,"relTier":1,"fed_more":true}, text: ["{intimacy.feed_close.p1._f252} {intimacy.feed_close.p1._f253} {intimacy.feed_close.p1._f254}"] },
  { when: {}, text: ["She's been eating and the belly against your forearm is perceptibly warmer, slightly firmer than when you started. She's settling into the fullness. She leans back further into you."] },
]);
registerPool('intimacy.feed_close.ch.feel_expansion', [
  { when: {}, text: ["Both hands spread wide. There's more to cover than there was. She's expanding. You feel the process in real time."] },
]);
registerPool('intimacy.feed_close.ch.offer_more', [
  { when: {}, text: ["She takes it without comment, which is its own kind of answer. The eating is continuous. The belly grows continuously."] },
]);
registerPool('intimacy.feed_close.ch.belly_around', [
  { when: {}, text: ["Your arms go around her belly and it's more than before — notably more. The warmth of the eating is there, the roundness of accumulated fullness. She makes a low, comfortable sound."] },
]);
registerPool('intimacy.feed_close.ch.comment_fullness', [
  { when: {}, text: ["She inhales through her nose — a little proud, a little pleased. \"I know,\" she says. She reaches for something else."] },
]);
registerPool('intimacy.feed_close.p2', [
  { when: {"stageMax":3,"relTier":1,"felt_growth":false}, text: ["She's still eating, slower now — she's getting genuinely full — and the belly in your arms is round and warm and heavy with everything she's consumed."] },
  { when: {"stageMax":3,"relTier":1,"felt_growth":true}, text: ["{intimacy.feed_close.p2._f255} {intimacy.feed_close.p2._f256}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"felt_growth":false}, text: ["The expansion is real and present and your arms are full of it. She's eating less urgently now, but she's still eating, and the belly keeps its slow, warm growth."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"felt_growth":true}, text: ["{intimacy.feed_close.p2._f257} {intimacy.feed_close.p2._f258}"] },
  { when: {"stageMin":10,"relTier":1,"felt_growth":false}, text: ["The belly between your arms is enormous now — a full, warm, heavy mass that extends beyond your grip in every direction. She's still going. Slower, deliberate, but still going."] },
  { when: {"stageMin":10,"relTier":1,"felt_growth":true}, text: ["{intimacy.feed_close.p2._f259} {intimacy.feed_close.p2._f260}"] },
  { when: {}, text: ["She's still eating, slower now — she's getting genuinely full — and the belly in your arms is round and warm and heavy with everything she's consumed."] },
]);
registerPool('intimacy.feed_close.ch.keep_feeding', [
  { when: {}, text: ["She opens her mouth and takes what you offer and swallows, and the belly against your arms grows another fraction warmer, another fraction fuller."] },
]);
registerPool('intimacy.feed_close.ch.measure_belly', [
  { when: {}, text: ["Your hands at the largest point. The span is greater than when you started. Notably greater. She feels you measuring and makes a sound of deep satisfaction."] },
]);
registerPool('intimacy.feed_close.ch.tell_her', [
  { when: {}, text: ["She goes still against you for a moment. Then: \"Tell me more,\" she says. She takes another bite."] },
]);
registerPool('intimacy.feed_close.end0', [
  { when: {}, text: ["{intimacy.feed_close.end0._f261} {intimacy.feed_close.end0._f262}"] },
]);
registerPool('intimacy.feed_close.end1', [
  { when: {}, text: ["{intimacy.feed_close.end1._f263} {intimacy.feed_close.end1._f264}"] },
]);
registerPool('intimacy.feed_close.end2', [
  { when: {}, text: ["{intimacy.feed_close.end2._f265} {intimacy.feed_close.end2._f266}"] },
]);
registerPool('intimacy.kissing_pull.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.kissing_pull.p0._f267} {intimacy.kissing_pull.p0._f268}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.kissing_pull.p0._f269} {intimacy.kissing_pull.p0._f270}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.kissing_pull.p0._f271} {intimacy.kissing_pull.p0._f272}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.kissing_pull.p0._f273} {intimacy.kissing_pull.p0._f274}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.kissing_pull.p0._f275} {intimacy.kissing_pull.p0._f276}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.kissing_pull.p0._f277} {intimacy.kissing_pull.p0._f278}"] },
  { when: {}, text: ["{intimacy.kissing_pull.p0._f279} {intimacy.kissing_pull.p0._f280}"] },
]);
registerPool('intimacy.kissing_pull.ch.pull_tighter', [
  { when: {}, text: ["You lock your arms around her and pull and there is more of her to pull than there was. She comes against you fully."] },
]);
registerPool('intimacy.kissing_pull.ch.hands_face', [
  { when: {}, text: ["Both hands on either side of her face. She is very still, very present. The kiss changes."] },
]);
registerPool('intimacy.kissing_pull.ch.let_her_come', [
  { when: {}, text: ["She comes into you and finds the available space and fills it and exceeds it. Your arms close around what they can reach."] },
]);
registerPool('intimacy.kissing_pull.p1', [
  { when: {"stageMax":3,"relTier":1,"pulled_tight":false}, text: ["Her body is against yours completely — the full press of her softness across your front, her warmth in your arms. The kissing continues. Her hands are on your back, pressing."] },
  { when: {"stageMax":3,"relTier":1,"pulled_tight":true}, text: ["{intimacy.kissing_pull.p1._f281} {intimacy.kissing_pull.p1._f282}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pulled_tight":false}, text: ["{intimacy.kissing_pull.p1._f283} {intimacy.kissing_pull.p1._f284}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"pulled_tight":true}, text: ["{intimacy.kissing_pull.p1._f285} {intimacy.kissing_pull.p1._f286}"] },
  { when: {"stageMin":10,"relTier":1,"pulled_tight":false}, text: ["{intimacy.kissing_pull.p1._f287} {intimacy.kissing_pull.p1._f288}"] },
  { when: {"stageMin":10,"relTier":1,"pulled_tight":true}, text: ["{intimacy.kissing_pull.p1._f289} {intimacy.kissing_pull.p1._f290}"] },
  { when: {}, text: ["Her body is against yours completely — the full press of her softness across your front, her warmth in your arms. The kissing continues. Her hands are on your back, pressing."] },
]);
registerPool('intimacy.kissing_pull.ch.grind_in', [
  { when: {}, text: ["Both of you pressing, the softness between you warm and deep. She makes a sound against your mouth."] },
]);
registerPool('intimacy.kissing_pull.ch.hands_everywhere', [
  { when: {}, text: ["Your hands over her back, her sides, finding the warmth and weight and depth of her in every direction."] },
]);
registerPool('intimacy.kissing_pull.ch.break_look', [
  { when: {}, text: ["A fraction of space between you. You look. She's flushed, warm, slightly breathless, and the eye contact is the most intimate thing so far."] },
]);
registerPool('intimacy.kissing_pull.ch.drag_lips', [
  { when: {}, text: ["She tilts her head back and her body pushes further into yours from below as she does."] },
]);
registerPool('intimacy.kissing_pull.p2', [
  { when: {"stageMax":3,"relTier":1,"looked":false}, text: ["You've been kissing and holding each other and the warmth between you is total. Her body against yours is entirely familiar now."] },
  { when: {"stageMax":3,"relTier":1,"looked":true}, text: ["{intimacy.kissing_pull.p2._f291} {intimacy.kissing_pull.p2._f292}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"looked":false}, text: ["The warmth of her body against yours is complete. Her belly is warm and present between you. Her hands haven't left your back."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"looked":true}, text: ["{intimacy.kissing_pull.p2._f293} {intimacy.kissing_pull.p2._f294}"] },
  { when: {"stageMin":10,"relTier":1,"looked":false}, text: ["Everything between you is warm and pressing. She is not separating from you and you have no interest in separating from her. Her belly between you is a warm constant."] },
  { when: {"stageMin":10,"relTier":1,"looked":true}, text: ["{intimacy.kissing_pull.p2._f295} {intimacy.kissing_pull.p2._f296}"] },
  { when: {}, text: ["You've been kissing and holding each other and the warmth between you is total. Her body against yours is entirely familiar now."] },
]);
registerPool('intimacy.kissing_pull.ch.say_want_her', [
  { when: {}, text: ["The words land. She presses closer in response, the belly against you firmer, more deliberate."] },
]);
registerPool('intimacy.kissing_pull.ch.pull_to_couch', [
  { when: {}, text: ["The transition, her weight navigated through the room, both of you touching throughout."] },
]);
registerPool('intimacy.kissing_pull.ch.stay_standing', [
  { when: {}, text: ["Neither of you moves. Her body is against yours. The warmth builds. Staying is the answer."] },
]);
registerPool('intimacy.kissing_pull.end0', [
  { when: {}, text: ["{intimacy.kissing_pull.end0._f297} {intimacy.kissing_pull.end0._f298}"] },
]);
registerPool('intimacy.kissing_pull.end1', [
  { when: {}, text: ["{intimacy.kissing_pull.end1._f299} {intimacy.kissing_pull.end1._f300}"] },
]);
registerPool('intimacy.kissing_pull.end2', [
  { when: {}, text: ["She comes apart from you slowly, staying close, her hands the last thing to leave. She looks at you. \"More of that,\" she says. Not a question. A plan."] },
]);
registerPool('intimacy.squeeze_thighs.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["Your hands find her thighs and settle there. She's seated and her thighs spread slightly under her own weight — soft, warm, yielding under your palms immediately. She lets you look."] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.squeeze_thighs.p0._f301} {intimacy.squeeze_thighs.p0._f302}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["Your hands on her thighs: the warmth comes through immediately, then the give — you press and the flesh yields and yields and keeps yielding, deep enough to be startling. She lets you look."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.squeeze_thighs.p0._f303} {intimacy.squeeze_thighs.p0._f304}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.squeeze_thighs.p0._f305} {intimacy.squeeze_thighs.p0._f306}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.squeeze_thighs.p0._f307} {intimacy.squeeze_thighs.p0._f308}"] },
  { when: {}, text: ["Your hands find her thighs and settle there. She's seated and her thighs spread slightly under her own weight — soft, warm, yielding under your palms immediately. She lets you look."] },
]);
registerPool('intimacy.squeeze_thighs.ch.squeeze_firm', [
  { when: {}, text: ["You press in and find the resistance is deeper than you thought. The flesh gives and then gives more. She makes a low sound."] },
]);
registerPool('intimacy.squeeze_thighs.ch.knead_both', [
  { when: {}, text: ["Both hands, both thighs, the symmetry of the warmth and weight. She shifts her hips slightly."] },
]);
registerPool('intimacy.squeeze_thighs.ch.trace_length', [
  { when: {}, text: ["The full length of her thigh under your palms — the breadth increasing as you travel upward, the softness changing character."] },
]);
registerPool('intimacy.squeeze_thighs.p1', [
  { when: {"stageMax":3,"relTier":1,"squeezed_firm":false}, text: ["You've been here long enough to know the texture of her thighs now — the surface, the depth, the specific way they give. She's leaning back, giving you full access."] },
  { when: {"stageMax":3,"relTier":1,"squeezed_firm":true}, text: ["{intimacy.squeeze_thighs.p1._f309} {intimacy.squeeze_thighs.p1._f310}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"squeezed_firm":false}, text: ["Your hands have settled into the work of her thighs — exploring the soft depth of them, the warm density, the way the flesh moves under real pressure. She's leaning back, giving you full access."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"squeezed_firm":true}, text: ["{intimacy.squeeze_thighs.p1._f311} {intimacy.squeeze_thighs.p1._f312}"] },
  { when: {"stageMin":10,"relTier":1,"squeezed_firm":false}, text: ["The thighs under your hands are generous enough to occupy you indefinitely. There is always more to find — softer, warmer, deeper, further in. She's leaning back, giving you full access."] },
  { when: {"stageMin":10,"relTier":1,"squeezed_firm":true}, text: ["{intimacy.squeeze_thighs.p1._f313} {intimacy.squeeze_thighs.p1._f314}"] },
  { when: {}, text: ["You've been here long enough to know the texture of her thighs now — the surface, the depth, the specific way they give. She's leaning back, giving you full access."] },
]);
registerPool('intimacy.squeeze_thighs.ch.inner_thigh', [
  { when: {}, text: ["The inner thigh is dramatically softer — almost shockingly so. She gasps softly."] },
]);
registerPool('intimacy.squeeze_thighs.ch.measure_squeeze', [
  { when: {}, text: ["Real pressure. The flesh compresses to something firm deep down. The distance from surface to firm is considerable. She watches your effort with interest."] },
]);
registerPool('intimacy.squeeze_thighs.ch.move_to_buttocks', [
  { when: {}, text: ["The transition from thigh to buttocks is gradual and entirely warm. She makes a decisive sound."] },
]);
registerPool('intimacy.squeeze_thighs.ch.describe_them', [
  { when: {}, text: ["Her thighs tighten under your hands reflexively. Then relax. She breathes out slowly. \"I know,\" she says, and she means it as pride."] },
]);
registerPool('intimacy.squeeze_thighs.p2', [
  { when: {"stageMax":3,"relTier":1,"inner_reached":false}, text: ["Your hands know her thighs now — the geography of them, the specific warmth and depth."] },
  { when: {"stageMax":3,"relTier":1,"inner_reached":true}, text: ["Your hands know her thighs now — the geography of them, the specific warmth and depth. She tightened when you went to the inner thigh. She hasn't asked you to leave."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"inner_reached":false}, text: ["She's responsive now to exactly the right amount of pressure in exactly the right locations. Your hands have learned her."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"inner_reached":true}, text: ["{intimacy.squeeze_thighs.p2._f315} {intimacy.squeeze_thighs.p2._f316}"] },
  { when: {"stageMin":10,"relTier":1,"inner_reached":false}, text: ["The thighs are a project, and you've been at it long enough to understand the scope of that project. There is still more to cover than you've covered."] },
  { when: {"stageMin":10,"relTier":1,"inner_reached":true}, text: ["{intimacy.squeeze_thighs.p2._f317} {intimacy.squeeze_thighs.p2._f318}"] },
  { when: {}, text: ["Your hands know her thighs now — the geography of them, the specific warmth and depth."] },
]);
registerPool('intimacy.squeeze_thighs.ch.use_both_hands_inner', [
  { when: {}, text: ["She goes very still. Her hands find the sheets."] },
]);
registerPool('intimacy.squeeze_thighs.ch.span_thigh', [
  { when: {}, text: ["Both hands at the widest point. You can't span it. Not close. She feels your hands fail to close around her and makes a pleased, specific sound."] },
]);
registerPool('intimacy.squeeze_thighs.ch.just_squeeze_hold', [
  { when: {}, text: ["You hold the pressure and she holds perfectly still, feeling it, not wanting it to change."] },
]);
registerPool('intimacy.squeeze_thighs.end0', [
  { when: {}, text: ["{intimacy.squeeze_thighs.end0._f319} {intimacy.squeeze_thighs.end0._f320}"] },
]);
registerPool('intimacy.squeeze_thighs.end1', [
  { when: {}, text: ["She caught your hands failing to span her thigh and she is going to think about that for a long time. \"I like that you tried,\" she says. Her voice is warm and deliberate."] },
]);
registerPool('intimacy.squeeze_thighs.end2', [
  { when: {}, text: ["She covers your hands with hers when you stop. \"Don't,\" she says. You don't."] },
]);
registerPool('intimacy.squeeze_chest.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.squeeze_chest.p0._f321} {intimacy.squeeze_chest.p0._f322}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.squeeze_chest.p0._f323} {intimacy.squeeze_chest.p0._f324}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.squeeze_chest.p0._f325} {intimacy.squeeze_chest.p0._f326}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.squeeze_chest.p0._f327} {intimacy.squeeze_chest.p0._f328}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.squeeze_chest.p0._f329} {intimacy.squeeze_chest.p0._f330}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.squeeze_chest.p0._f331} {intimacy.squeeze_chest.p0._f332}"] },
  { when: {}, text: ["{intimacy.squeeze_chest.p0._f333} {intimacy.squeeze_chest.p0._f334}"] },
]);
registerPool('intimacy.squeeze_chest.ch.cup_both', [
  { when: {}, text: ["Both hands, the full weight of her in your palms. She breathes differently."] },
]);
registerPool('intimacy.squeeze_chest.ch.press_together', [
  { when: {}, text: ["The cleavage deepens. The warmth increases. She watches what your hands make."] },
]);
registerPool('intimacy.squeeze_chest.ch.knead_slow', [
  { when: {}, text: ["Slow, deliberate, finding the depth. The flesh yields and yields. She makes a sound she wasn't expecting to make."] },
]);
registerPool('intimacy.squeeze_chest.p1', [
  { when: {"stageMax":3,"relTier":1,"cupped_both":false}, text: ["The warmth of her chest in your hands is total. She's leaning slightly into your hands, adding her own weight. She's breathing in careful, deliberate intervals."] },
  { when: {"stageMax":3,"relTier":1,"cupped_both":true}, text: ["The warmth of her chest in your hands is total. She's leaning slightly into your hands, adding her own weight. She's put her hands over yours, adding pressure."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"cupped_both":false}, text: ["{intimacy.squeeze_chest.p1._f335} {intimacy.squeeze_chest.p1._f336}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"cupped_both":true}, text: ["{intimacy.squeeze_chest.p1._f337} {intimacy.squeeze_chest.p1._f338}"] },
  { when: {"stageMin":10,"relTier":1,"cupped_both":false}, text: ["{intimacy.squeeze_chest.p1._f339} {intimacy.squeeze_chest.p1._f340}"] },
  { when: {"stageMin":10,"relTier":1,"cupped_both":true}, text: ["{intimacy.squeeze_chest.p1._f341} {intimacy.squeeze_chest.p1._f342}"] },
  { when: {}, text: ["The warmth of her chest in your hands is total. She's leaning slightly into your hands, adding her own weight. She's breathing in careful, deliberate intervals."] },
]);
registerPool('intimacy.squeeze_chest.ch.lift_weight', [
  { when: {}, text: ["You lift and feel the mass of her chest rise in your hands — real, specific, warm, considerable."] },
]);
registerPool('intimacy.squeeze_chest.ch.thumbs_focus', [
  { when: {}, text: ["She stops breathing entirely for two seconds. Then starts again, faster."] },
]);
registerPool('intimacy.squeeze_chest.ch.face_in', [
  { when: {}, text: ["The enclosure is immediate and total — warm on both sides, the cleavage pressing in, her weight against your face."] },
]);
registerPool('intimacy.squeeze_chest.ch.tell_her_gorgeous', [
  { when: {}, text: ["She flushes from the chest up. \"Say it again,\" she says immediately."] },
]);
registerPool('intimacy.squeeze_chest.p2', [
  { when: {"stageMax":3,"relTier":1,"lifted_chest":false}, text: ["You know the weight and depth and temperature of her chest now. Your hands have settled into a rhythm."] },
  { when: {"stageMax":3,"relTier":1,"lifted_chest":true}, text: ["You know the weight and depth and temperature of her chest now. Your hands have settled into a rhythm. She hasn't asked you to put her down. She's keeping herself in your hands."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"lifted_chest":false}, text: ["Her chest fills your hands and overflows them. You've been exploring the full extent and the extent keeps being larger than you thought."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"lifted_chest":true}, text: ["{intimacy.squeeze_chest.p2._f343} {intimacy.squeeze_chest.p2._f344}"] },
  { when: {"stageMin":10,"relTier":1,"lifted_chest":false}, text: ["The project of her chest is ongoing. There is so much of it to cover and your hands are working, and she is entirely with you in this."] },
  { when: {"stageMin":10,"relTier":1,"lifted_chest":true}, text: ["{intimacy.squeeze_chest.p2._f345} {intimacy.squeeze_chest.p2._f346}"] },
  { when: {}, text: ["You know the weight and depth and temperature of her chest now. Your hands have settled into a rhythm."] },
]);
registerPool('intimacy.squeeze_chest.ch.squeeze_firm_chest', [
  { when: {}, text: ["The flesh compresses to something deep and then springs back. She makes a decisive sound."] },
]);
registerPool('intimacy.squeeze_chest.ch.measure_chest', [
  { when: {}, text: ["One hand, trying to cover the full surface. You can't. Not close. She watches the attempt with great interest."] },
]);
registerPool('intimacy.squeeze_chest.ch.never_let_go', [
  { when: {}, text: ["You say it and you mean it and she knows you mean it."] },
]);
registerPool('intimacy.squeeze_chest.end0', [
  { when: {}, text: ["{intimacy.squeeze_chest.end0._f347} {intimacy.squeeze_chest.end0._f348}"] },
]);
registerPool('intimacy.squeeze_chest.end1', [
  { when: {}, text: ["She caught you failing to span her breast and she is delighted by it. \"Bigger every time,\" she says softly. \"I know you come back to check.\" She's right."] },
]);
registerPool('intimacy.squeeze_chest.end2', [
  { when: {}, text: ["She gathers herself into the crook of your arm after and you keep one hand where it was. She doesn't suggest you move it. You don't."] },
]);
registerPool('intimacy.session_high_fullness.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.session_high_fullness.p0._f349} {intimacy.session_high_fullness.p0._f350}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.session_high_fullness.p0._f351} {intimacy.session_high_fullness.p0._f352}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["The fullness is visible: her belly extended, pressing out against her clothes, warm and round and present. She's breathing slowly. She makes a gesture you understand. She's inviting you."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.session_high_fullness.p0._f353} {intimacy.session_high_fullness.p0._f354}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["She's eaten enough to make herself genuinely immobile — her belly enormously full, round and drum-tight, her body reclined and still. She reaches one hand toward you. She's inviting you."] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.session_high_fullness.p0._f355} {intimacy.session_high_fullness.p0._f356}"] },
  { when: {}, text: ["{intimacy.session_high_fullness.p0._f357} {intimacy.session_high_fullness.p0._f358}"] },
]);
registerPool('intimacy.session_high_fullness.ch.come_close', [
  { when: {}, text: ["The fullness under your hands is different from normal: tighter, rounder, hot with the work of digestion. She groans softly."] },
]);
registerPool('intimacy.session_high_fullness.ch.sit_behind', [
  { when: {}, text: ["Your arms around the full belly from behind, feeling the warmth and tightness of it. She leans back into you."] },
]);
registerPool('intimacy.session_high_fullness.ch.tell_her_full', [
  { when: {}, text: ["She presses her hands against her belly proudly. \"I really am,\" she says. \"Feel how tight.\""] },
]);
registerPool('intimacy.session_high_fullness.p1', [
  { when: {"stageMax":3,"relTier":1,"held_full":false}, text: ["She's resting against you, full and warm and heavy, and the belly under your hands is taut with what she's eaten. She watches you from under heavy eyelids."] },
  { when: {"stageMax":3,"relTier":1,"held_full":true}, text: ["She's resting against you, full and warm and heavy, and the belly under your hands is taut with what she's eaten. She's staying completely still, trusting you to hold the weight."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_full":false}, text: ["{intimacy.session_high_fullness.p1._f359} {intimacy.session_high_fullness.p1._f360}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"held_full":true}, text: ["{intimacy.session_high_fullness.p1._f361} {intimacy.session_high_fullness.p1._f362}"] },
  { when: {"stageMin":10,"relTier":1,"held_full":false}, text: ["The enormity of her full belly is extraordinary — taut, enormous, warm, her body entirely reorganized around the mass of what's inside her. She watches you from under heavy eyelids."] },
  { when: {"stageMin":10,"relTier":1,"held_full":true}, text: ["{intimacy.session_high_fullness.p1._f363} {intimacy.session_high_fullness.p1._f364}"] },
  { when: {}, text: ["She's resting against you, full and warm and heavy, and the belly under your hands is taut with what she's eaten. She watches you from under heavy eyelids."] },
]);
registerPool('intimacy.session_high_fullness.ch.press_gently', [
  { when: {}, text: ["Even gentle pressure is significant when she's this full. She makes a sound between a groan and a yes."] },
]);
registerPool('intimacy.session_high_fullness.ch.kiss_belly_full', [
  { when: {}, text: ["She goes still. The warmth of it against your lips is different — more intense, more present, the fullness just beneath the surface."] },
]);
registerPool('intimacy.session_high_fullness.ch.stay_close', [
  { when: {}, text: ["Your hands on the full belly, still and warm. She breathes. The meal works. You feel it."] },
]);
registerPool('intimacy.session_high_fullness.end0', [
  { when: {}, text: ["She falls asleep while you're still close — her belly enormous and full and warm under your hands, rising and falling with her breathing. You stay. You have nowhere else to be."] },
]);
registerPool('intimacy.session_high_fullness.end1', [
  { when: {}, text: ["She exhales slowly and the belly expands against your hands on the exhale. \"That felt good,\" she says. \"All of it felt good.\" She's talking about the meal and also everything else."] },
]);
registerPool('intimacy.session_high_fullness.end2', [
  { when: {}, text: ["The session is over but neither of you has moved. She's warm and full and close and that's the right state of things."] },
]);
registerPool('intimacy.session_tapout.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.session_tapout.p0._f365} {intimacy.session_tapout.p0._f366}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.session_tapout.p0._f367} {intimacy.session_tapout.p0._f368}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.session_tapout.p0._f369} {intimacy.session_tapout.p0._f370}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.session_tapout.p0._f371} {intimacy.session_tapout.p0._f372}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.session_tapout.p0._f373} {intimacy.session_tapout.p0._f374}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.session_tapout.p0._f375} {intimacy.session_tapout.p0._f376}"] },
  { when: {}, text: ["{intimacy.session_tapout.p0._f377} {intimacy.session_tapout.p0._f378}"] },
]);
registerPool('intimacy.session_tapout.ch.hold_her', [
  { when: {}, text: ["Your hands on the stretched belly, steady and warm. She breathes against the pressure. The sounds she makes are entirely genuine."] },
]);
registerPool('intimacy.session_tapout.ch.rub_slow', [
  { when: {}, text: ["The lightest circular motion. She makes a sound of relief and stays completely still for it."] },
]);
registerPool('intimacy.session_tapout.ch.tell_her_proud', [
  { when: {}, text: ["She opens one eye. \"Yeah?\" she says. The word has a lot in it."] },
]);
registerPool('intimacy.session_tapout.end0', [
  { when: {}, text: ["She comes down from the edge slowly, your hands doing the work. When the worst has passed she looks at you with an expression of complete trust. \"Bigger next time,\" she says. She's serious."] },
]);
registerPool('intimacy.session_tapout.end1', [
  { when: {}, text: ["The belly under your hands slowly relaxes from drum-tight to merely very full, very warm, very large. She exhales. \"Thank you,\" she says. \"That helped.\""] },
]);
registerPool('intimacy.session_tapout.end2', [
  { when: {}, text: ["She sits with the fullness and you sit with her and eventually it becomes manageable. She looks at the food still remaining with an expression that is equal parts distress and ambition."] },
]);
registerPool('intimacy.dinner_afterward.p0', [
  { when: {"stageMax":3,"relTier":1}, text: ["{intimacy.dinner_afterward.p0._f379} {intimacy.dinner_afterward.p0._f380}"] },
  { when: {"stageMax":3,"relTier":3}, text: ["{intimacy.dinner_afterward.p0._f381} {intimacy.dinner_afterward.p0._f382}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1}, text: ["{intimacy.dinner_afterward.p0._f383} {intimacy.dinner_afterward.p0._f384}"] },
  { when: {"stageMin":4,"stageMax":6,"relTier":3}, text: ["{intimacy.dinner_afterward.p0._f385} {intimacy.dinner_afterward.p0._f386}"] },
  { when: {"stageMin":10,"relTier":1}, text: ["{intimacy.dinner_afterward.p0._f387} {intimacy.dinner_afterward.p0._f388}"] },
  { when: {"stageMin":10,"relTier":3}, text: ["{intimacy.dinner_afterward.p0._f389} {intimacy.dinner_afterward.p0._f390}"] },
  { when: {}, text: ["{intimacy.dinner_afterward.p0._f391} {intimacy.dinner_afterward.p0._f392}"] },
]);
registerPool('intimacy.dinner_afterward.ch.move_close', [
  { when: {}, text: ["You move close and she makes room — adjusting, accommodating you, her warm body against yours."] },
]);
registerPool('intimacy.dinner_afterward.ch.comment_full', [
  { when: {}, text: ["She looks down at herself and then up at you. \"I know,\" she says. The pride in her voice is complete."] },
]);
registerPool('intimacy.dinner_afterward.ch.offer_more', [
  { when: {}, text: ["She looks at the empty table, then back at you. \"Maybe,\" she says. \"In a minute.\" She's not done."] },
]);
registerPool('intimacy.dinner_afterward.p1', [
  { when: {"stageMax":3,"relTier":1,"moved_close":false}, text: ["The restaurant has gone quiet around you. Neither of you is in any hurry to be anywhere else. She's watching you."] },
  { when: {"stageMax":3,"relTier":1,"moved_close":true}, text: ["The restaurant has gone quiet around you. Neither of you is in any hurry to be anywhere else. She's tucked herself against you as completely as she can."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"moved_close":false}, text: ["She's leaning against you now, her belly warm and round and present between your arm and her own body. The evening has settled into something slow and good. She's watching you."] },
  { when: {"stageMin":4,"stageMax":6,"relTier":1,"moved_close":true}, text: ["{intimacy.dinner_afterward.p1._f393} {intimacy.dinner_afterward.p1._f394}"] },
  { when: {"stageMin":10,"relTier":1,"moved_close":false}, text: ["She cannot move and she is not trying to and you are beside her with your hand on her belly and this is exactly the right end to a dinner. She's watching you."] },
  { when: {"stageMin":10,"relTier":1,"moved_close":true}, text: ["{intimacy.dinner_afterward.p1._f395} {intimacy.dinner_afterward.p1._f396}"] },
  { when: {}, text: ["The restaurant has gone quiet around you. Neither of you is in any hurry to be anywhere else. She's watching you."] },
]);
registerPool('intimacy.dinner_afterward.ch.stay_long', [
  { when: {}, text: ["The evening is yours. Neither of you marks it. You stay."] },
]);
registerPool('intimacy.dinner_afterward.ch.hand_on_belly', [
  { when: {}, text: ["She puts her hand over yours. You both feel the warmth and fullness under your hands."] },
]);
registerPool('intimacy.dinner_afterward.ch.plan_next', [
  { when: {}, text: ["\"Bigger next time,\" she says immediately. It's a date."] },
]);
registerPool('intimacy.dinner_afterward.end0', [
  { when: {}, text: ["{intimacy.dinner_afterward.end0._f397} {intimacy.dinner_afterward.end0._f398}"] },
]);
registerPool('intimacy.dinner_afterward.end1', [
  { when: {}, text: ["{intimacy.dinner_afterward.end1._f399} {intimacy.dinner_afterward.end1._f400}"] },
]);
registerPool('intimacy.dinner_afterward.end2', [
  { when: {}, text: ["The dinner ends well, as dinners with her always do. She is full and warm and happy and heavier than when she arrived."] },
]);

