// The Squad — Lead: A1 Mobile | Support: A7 Artisan, A5 Editor
// Dinner conversation topics — migrated from gameData/sessions.js DINNER_CONVERSATION.
import { registerPool } from '../../engine.js';

registerPool('dinner.conv.compliment_appetite', [
  { when: { stageMax: 2 }, text: [
    `You mention how much she's enjoying herself. {subject.name} flushes slightly but picks up her fork with renewed purpose.`,
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `"I love watching you eat," you say. {subject.name} grins without looking up from her plate. "Then keep watching." She takes an enormous bite.`,
  ] },
  { when: { stageMin: 6 }, text: [
    `"You eat beautifully," you tell her. {subject.name} laughs warmly. "I know. It's my best quality." She gestures for more bread.`,
  ] },
  { when: {}, text: [
    `You mention how much she's enjoying herself. {subject.name} meets your eyes and eats with quiet purpose.`,
  ] },
]);

registerPool('dinner.conv.suggest_second', [
  { when: { stageMax: 2 }, text: [
    `"You should try the other dish," you suggest. {subject.name} hesitates, then: "You know what, yes. Why not."`,
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `"More?" {subject.name} is already raising her hand for the waiter. "I was already going to, but thank you for the permission."`,
  ] },
  { when: { stageMin: 6 }, text: [
    `You gesture at her nearly empty plate. "Again?" {subject.name} pats her enormous middle contentedly. "Obviously."`,
  ] },
  { when: {}, text: [
    `"You should try the other dish," you suggest. {subject.name} considers, then nods. "Okay."`,
  ] },
]);

registerPool('dinner.conv.food_talk_dinner', [
  { when: {}, text: [
    `You and {subject.name} spend ten minutes discussing the dish in detail. She is an enthusiastic critic. She demonstrates her critique by eating more of it.`,
  ] },
]);

registerPool('dinner.conv.order_for_her', [
  { when: { stageMax: 3 }, text: [
    `You order before she can deliberate too long — all the richest options, extra courses. {subject.name} raises her eyebrows. "That's a lot." She says it like a compliment.`,
  ] },
  { when: { stageMin: 4 }, text: [
    `You order for the table. Extensively. {subject.name} watches the dishes arrive with visible pleasure. "You know exactly what you're doing," she says. "I appreciate that."`,
  ] },
  { when: {}, text: [
    `You order for the table before she can overthink it. {subject.name} watches the dishes arrive with visible pleasure.`,
  ] },
]);

registerPool('dinner.conv.wine_and_cheese', [
  { when: {}, text: [
    `"We're having the cheese course," you say. It is not a question. {subject.name} settles back with a smile. "Obviously we are." The board that arrives is enormous. She works through all of it.`,
  ] },
]);

registerPool('dinner.conv.overcomes_hesitation', [
  { when: { stageMax: 2 }, text: [
    `{subject.name} glances at the menu uncertainly. "I shouldn't really—" You remind her she deserves a good meal. She considers this. Orders the larger option.`,
  ] },
  { when: { stageMin: 3, stageMax: 4 }, text: [
    `{subject.name} pauses mid-plate, looking at herself. "I've eaten so much." You tell her she's doing wonderfully. She laughs and keeps going.`,
  ] },
  { when: { stageMin: 5 }, text: [
    `{subject.name} is full — visibly, obviously full. "I literally cannot," she says. You slide the dessert menu toward her. She opens it. "Fine." She eats it all.`,
  ] },
  { when: {}, text: [
    `{subject.name} hesitates over the menu. You remind her she deserves a good meal. She orders the larger option.`,
  ] },
]);

registerPool('dinner.conv.body_compliment', [
  { when: { stageMax: 1 }, text: [
    `You tell {subject.name} she looks wonderful tonight. She blinks, then smiles and takes a large bite of her food. "Thank you." She sounds like she means it.`,
  ] },
  { when: { stageMin: 2, stageMax: 4 }, text: [
    `You tell {subject.name} she looks incredible. She pats her very round belly and grins. "I've been working on it." She takes another bite. "Still working on it, actually."`,
  ] },
  { when: { stageMin: 5 }, text: [
    `You tell {subject.name} she looks spectacular. She spreads her hands across her enormous, soft middle and raises an eyebrow. "I know," she says simply. She resumes eating with great satisfaction.`,
  ] },
  { when: {}, text: [
    `You tell {subject.name} she looks wonderful tonight. She smiles and takes another bite.`,
  ] },
]);

registerPool('dinner.conv.personal_chef_story', [
  { when: {}, text: [
    `You tell {subject.name} the chef built tonight's menu around her preferences. She goes still, then smiles. She eats every last bite with new attention.`,
  ] },
]);

registerPool('dinner.conv.endless_courses', [
  { when: {}, text: [
    `Every time {subject.name} finishes a dish you signal for another. After the fourth she laughs. "Okay." She doesn't stop for two hours.`,
  ] },
]);

registerPool('dinner.conv.praise_capacity', [
  { when: { stageMax: 2 }, text: [
    `"I'm impressed," you say. {subject.name} grins and finishes the dish. "I've always eaten a lot." She orders another.`,
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `"I genuinely cannot believe how much you've eaten," you say. {subject.name} looks down at herself, at the pile of empty plates, and laughs. "I can." She orders dessert.`,
  ] },
  { when: { stageMin: 6 }, text: [
    `You survey the wreckage of the table. "That was extraordinary." {subject.name} pats her vast belly with a look of absolute serenity. "I'm just getting started," she says — and means it.`,
  ] },
  { when: {}, text: [
    `"I'm impressed," you say. {subject.name} grins and keeps eating.`,
  ] },
]);

registerPool('dinner.conv.ask_passion', [
  { when: { studentId: 0 }, weight: 4, text: [
    `You ask about the squad. {subject.name}'s posture changes. "We're building something," she says — a legacy. The main course vanishes without her noticing.`,
  ] },
  { when: { studentId: 3 }, weight: 4, text: [
    `You ask about running. {subject.name} is quiet. "I miss it less than I thought." She takes a large bite. "But this is also good."`,
  ] },
  { when: {}, text: [
    `You ask what she loves right now. {subject.name} talks twenty minutes — animated, unselfconscious. The main course disappears unnoticed.`,
  ] },
]);

registerPool('dinner.conv.talk_genuinely', [
  { when: { stageMax: 2 }, text: [
    `You set the menu down and actually ask. {subject.name} looks surprised, then talks — really talks. She keeps eating through it, almost unconsciously.`,
  ] },
  { when: { stageMin: 3 }, text: [
    `You turn the conversation to her, genuinely. {subject.name} opens up. Something real passes between you. She finishes three courses before she realizes.`,
  ] },
  { when: {}, text: [
    `You set the menu down and actually ask. {subject.name} talks — really talks — and keeps eating through it.`,
  ] },
]);

registerPool('dinner.conv.toast_together', [
  { when: {}, text: [
    `You raise your glass. "To good food and good company." {subject.name} lifts hers. Something warm settles between you. She eats more after.`,
  ] },
]);

registerPool('dinner.conv.share_a_dish', [
  { when: { stageMax: 3 }, text: [
    `You order a dish for the table. "We can share." {subject.name} looks at it and, after a beat, reaches in. "Okay." She eats most of it.`,
  ] },
  { when: { stageMin: 4 }, text: [
    `You order an extra dish between you. {subject.name} looks delighted. "Perfect." She eats significantly more than half. You don't point this out.`,
  ] },
  { when: {}, text: [
    `You order a dish for the table. {subject.name} reaches in and eats most of it.`,
  ] },
]);

registerPool('dinner.conv.after_dinner_stroll', [
  { when: { stageMax: 3 }, text: [
    `"We should do the cheese course," you say. {subject.name} pauses. "I don't — " She looks at the menu. "Actually. Yes. Obviously yes."`,
  ] },
  { when: { stageMin: 4, stageMax: 6 }, text: [
    `"I'm going to get more," you say. "Obviously I'm joining you," {subject.name} says. She did not need the invitation.`,
  ] },
  { when: { stageMin: 7 }, text: [
    `You gesture toward the dessert menu. {subject.name} already has it. "I've been reading it for five minutes," she says. "Let's do all of it."`,
  ] },
  { when: {}, text: [
    `"We should do the cheese course," you say. {subject.name} looks at the menu. "Obviously yes."`,
  ] },
]);

registerPool('dinner.conv.awkward_comment', [
  { when: { stageMax: 2 }, text: [
    `"That's... quite a lot," you say. {subject.name}'s expression flickers. "I know," she says, shortly. She puts her fork down and picks it up again more slowly. The evening is a degree cooler now.`,
  ] },
  { when: { stageMin: 3 }, text: [
    `You gesture at her plate. "You've really eaten a lot tonight." {subject.name} gives you a flat look. "Yes. I have." She continues eating, but something in the warmth has shifted.`,
  ] },
  { when: {}, text: [
    `"That's... quite a lot," you say. {subject.name}'s expression cools. The evening loses a degree of warmth.`,
  ] },
]);

registerPool('dinner.conv.suggest_diet', [
  { when: { stageMax: 1 }, text: [
    `You mention a lighter option. {subject.name} glances at it, then her plate. "I'll stick with what I ordered." She eats with more purpose.`,
  ] },
  { when: { stageMin: 2 }, text: [
    `You gesture toward the salads. {subject.name} puts her fork down. "I know the menu. I don't need the recommendation."`,
  ] },
  { when: {}, text: [
    `You mention there's a lighter option on the menu. {subject.name} glances at it and keeps eating what she ordered.`,
  ] },
]);

registerPool('dinner.conv.ask_about_weight', [
  { when: { stageMax: 2 }, text: [
    `You ask lightly whether she's noticed any changes lately. {subject.name} stiffens slightly. "I mean... yeah." She looks at her food. "Are you asking that at dinner?" There's an edge now.`,
  ] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    `You bring it up. {subject.name} puts her fork down. "I know," she says, flatly. "I'm here." She picks the fork back up but the ease of the evening has changed.`,
  ] },
  { when: { stageMin: 6 }, text: [
    `You comment on it. {subject.name} gives you a measuring look. "I was having a very good time. Be more careful with dinner conversation."`,
  ] },
  { when: {}, text: [
    `You bring it up. {subject.name} puts her fork down. The ease of the evening changes.`,
  ] },
]);

registerPool('dinner.conv.second_table', [
  { when: { stageMax: 4 }, text: [
    `You suggest a more private corner table. {subject.name} appreciates the gesture. The move is easy, the new spot better. She orders again as soon as she sits.`,
  ] },
  { when: { stageMin: 5 }, text: [
    `You notice she's shifted twice in the standard chair and arrange a better setup. {subject.name} settles in. "How did you know?" She eats considerably more.`,
  ] },
  { when: {}, text: [
    `You suggest a more comfortable spot. {subject.name} settles in and orders again.`,
  ] },
]);

registerPool('dinner.conv.dorm_gossip', [
  { when: {}, text: [
    `"The floor is eating like this too," you say. {subject.name} leans in, delighted. "I knew it wasn't just me." She orders another plate as proof.`,
    `{subject.name} wants names. You give her the shape of the hall without names. She eats like gossip is a condiment.`,
  ] },
]);

registerPool('dinner.conv.night_round_hint', [
  { when: {}, text: [
    `"I walk the hall after hours," you say. {subject.name} goes still, then smiles. "I know. I leave the light on."`,
    `{subject.name} colors. "You heard me last night." She takes a bite anyway. "Good."`,
  ] },
]);

registerPool('dinner.conv.room_upgrade_brag', [
  { when: {}, text: [
    `You mention a better chair for her room. {subject.name} looks at the restaurant seat, then at you. "Please." She means it.`,
    `"Your door deserves better furniture," you say. {subject.name} laughs and eats like the promise already landed.`,
  ] },
]);
