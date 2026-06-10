export const CONTEST_FOODS = [
  { id:'hotdogs',  name:'Hot Dogs',   emoji:'🌭', fullness:8,  lbs:3 },
  { id:'wings',    name:'Wings',      emoji:'🍗', fullness:12, lbs:5 },
  { id:'burger',   name:'Burger',     emoji:'🍔', fullness:15, lbs:6 },
  { id:'pizza',    name:'Pizza',      emoji:'🍕', fullness:18, lbs:7 },
  { id:'ribs',     name:'Ribs',       emoji:'🥩', fullness:22, lbs:9 },
  { id:'pasta',    name:'Pasta',      emoji:'🍝', fullness:25, lbs:10 },
  { id:'cake',     name:'Cake',       emoji:'🎂', fullness:10, lbs:5 },
  { id:'pie',      name:'Pie',        emoji:'🥧', fullness:13, lbs:5 },
  { id:'nachos',   name:'Nachos',     emoji:'🧀', fullness:9,  lbs:4 },
  { id:'icecream', name:'Ice Cream',  emoji:'🍨', fullness:7,  lbs:4 },
];

// Food selection per stage (0=stage5, 4=stage9). Your side vs Maya's side.
export const CONTEST_STAGE_FOODS = [
  { your:['hotdogs','wings','burger','pizza','cake'],             maya:['hotdogs','wings','burger','ribs','pie'] },
  { your:['hotdogs','wings','burger','pizza','ribs','cake'],      maya:['wings','burger','pizza','ribs','pasta','pie'] },
  { your:['hotdogs','wings','burger','pizza','ribs','pasta','cake','nachos'], maya:['hotdogs','wings','burger','pizza','ribs','pasta','pie','nachos'] },
  { your:['hotdogs','wings','burger','pizza','ribs','pasta','cake','nachos','icecream'], maya:['hotdogs','wings','burger','pizza','ribs','pasta','pie','nachos','icecream'] },
  { your:['hotdogs','wings','burger','pizza','ribs','pasta','cake','nachos','icecream','pie'], maya:['hotdogs','wings','burger','pizza','ribs','pasta','pie','nachos','icecream','cake'] },
  // stage 10 — ~820 lbs — Grand Invitational (blob)
  { your:['hotdogs','wings','burger','pizza','ribs','pasta','cake','nachos','icecream','pie'], maya:['hotdogs','wings','burger','pizza','ribs','pasta','pie','nachos','icecream','cake'] },
];

// Maya's weight at each stage (starts heavier — she wins early events)
export const CONTEST_MAYA_WEIGHTS = [330, 370, 410, 450, 490, 530];

export const CONTEST_FOOD_POPUPS = {
  hotdogs:[
    `Fast, warm, familiar. Three go down before you've thought about it. Your belly is already working, already wanting more. You glance at Maya's side. She hasn't looked over.`,
    `Easy. Hot dogs are warmup food and you eat them that way — without ceremony, without slowing down, the warm salt of them going into you while the crowd gets settled.`,
    `They're gone before the crowd registers you've started. Your belly sits heavy and warm and it wants more and you give it more without asking it to wait.`,
    `Gone. Your belly pushes the table and absorbs the hot dogs without a pause. You're not even at capacity yet. This is the warmup of the warmup.`,
    `You eat hot dogs the way most people eat crackers. The crowd barely registers it. You're saving yourself for something that will actually fill you.`,
    `Hot dogs. They disappear into your belly the way a glass of water disappears into the sea. You are 820 pounds and hot dogs are not even warmup food for you anymore. They are just weight. You add them without ceremony and reach for the next item before the crowd has noticed you started.`,
  ],
  wings:[
    `Messy and fast — you pull the meat off without slowing down, the sauce going everywhere, your belly warm and pushing forward with each piece. The girl from State across the table is watching. You don't look back.`,
    `You work through the wings with the focused efficiency of someone who has done this dozens of times. The bones pile up. Your belly is warm and pressing. More.`,
    `Each wing goes in and your belly takes it and asks for the next one. You eat with a rhythm now, the crowd building noise in the background, Maya working at her side of the table. You don't look at her.`,
    `The pile disappears. You eat wings the way you eat everything at this stage — with the complete focus of a body that was built for this, your belly enormous and pressing forward and wanting more.`,
    `Wings. You eat seventeen in the time it would take someone else to eat five. The table doesn't have enough wings. The table has never had enough.`,
    `You work through the wings without looking up. Each one goes in and your belly registers it and asks for the next without pausing. You are 820 pounds of competitive eater and wings are a category of food that simply no longer slows you down. The bones pile up. The crowd watches. You keep going.`,
  ],
  burger:[
    `Dense and good. The burger fills real estate in your belly — you feel it land, feel the weight of it settling, the warmth of it spreading. Your belly presses your waistband harder and you take a breath and keep eating.`,
    `One burger is nothing. You eat it in under a minute and reach for the next item before you've swallowed the last bite. Your belly is getting warm and insistent now. This is when it starts to feel like something.`,
    `The burger goes down and your belly registers it properly — a real addition, real weight, your waistband complaining for the first time. You loosen your breath. Keep going.`,
    `You eat the burger and your belly barely acknowledges it. This is the problem with getting to this size: you have to eat more to feel full and more to feel anything. You keep eating.`,
    `The burger. You don't taste it as much as absorb it. At 630 lbs, the sensation of eating has become less about specific flavors and more about the specific expanding warmth of your belly pressing heavier, fuller, more real.`,
    `You eat the burger. Your belly receives it with the implacable calm of something that has swallowed a great deal more than this and will swallow a great deal more after. It settles into the vast warm mass of you and you reach for the next thing. The burger was one brick in an edifice. You are still building.`,
  ],
  pizza:[
    `Slice by slice. Your belly is getting full now — not done, but aware. You eat through the pizza with the slightly slower pace of someone managing their capacity, the grease warm on your fingers, your belly pressing your competition top forward.`,
    `Pizza lands differently. It fills you in layers — the immediate fullness, then the settling weight of it a minute later. Your belly is genuinely large right now, warm and tight, and you shift in your seat and keep going.`,
    `The pizza is good and you eat it fast and your belly makes its fullness very clear. Your competition top has ridden up two inches. You don't pull it down.`,
    `You eat the pizza and feel your belly push the table edge. It's doing that now — pressing into things, occupying more space than the seat was designed for. You push the table back an inch and keep eating.`,
    `Five slices. You eat them like they're nothing, your belly enormous and warm and pressing everything around you, the table creaking against your waist, the crowd watching you eat like it's the most natural thing in the world. It is.`,
    `You eat the pizza and your belly pushes the table hard to the side and you let it. Your belly is an architectural presence in this room — it dominates the space between you and the competition, it fills the front half of your lane — and five slices of pizza go into it and it fills fractionally more and settles forward fractionally further and you keep going.`,
  ],
  ribs:[
    `Heavy. Your belly really knows about the ribs. You eat through them with the focused attention of someone who can feel the fullness climbing — really climbing now — your waistband pressing, your belly warm and round and present. You eat another rib anyway.`,
    `The ribs are dense and your belly responds to them like a furnace responding to good fuel — it gets hot, it gets heavy, it wants more. You eat more.`,
    `You pull the rack in and work through it with the focus of someone who does not have another gear. This is already the gear. The bones go into the discard pile one by one. Your belly presses forward another increment with each one.`,
    `Ribs. Dense. Real. Your belly is genuinely enormous right now, pressing the table hard, and you eat through the rack with the patient certainty of someone who knows exactly how this ends.`,
    `The rack disappears. You eat ribs with two hands and your belly is warm and vast and forward and you feel, specifically, the weight of yourself growing with each piece. You like the feeling. You keep eating.`,
    `Ribs. Dense, real, additive. You eat through the rack with both hands and your belly sits enormous and warm and full between your thighs, pressing your thighs further apart with each increment, and you feel each rib go in and become part of you. The crowd can see your belly shift forward as it fills. You eat another rib. The weight of being this full at this size is not discomfort. It is arrival.`,
  ],
  pasta:[
    `The pasta is the hardest thing on the table and you know it. It fills volume fast. You eat it carefully — not slow, but aware, your belly pressing your waistband hard, your competition top tight across your chest. You finish the bowl anyway.`,
    `Dense, warm, filling. Your belly takes the pasta and gets serious about it — this is the food that will decide if you can eat more after it. You eat it and breathe carefully and decide you can.`,
    `The pasta goes down and your belly expands visibly — not your imagination, not a trick of the light. The fabric across your middle tightens. Someone in the crowd says something. You eat the last of it.`,
    `You eat the pasta and your belly presses the table so hard it shifts. You put a hand on it briefly — the warmth of it, the tightness, the specific insistence of being this full at this size — and then you keep eating.`,
    `Pasta. The thing that would end a normal person's contest. You eat it in three minutes and your belly registers it the way the earth registers weight: completely, without complaint, just more mass settling into what was already an extraordinary amount of mass.`,
    `Pasta goes in and your belly swells noticeably outward — not your imagination, not a trick of perspective, a real and visible expansion of something that is already the largest fact in this room. You can feel your competition top tighten across the full span of your belly. You push the bowl away empty. Your belly presses the table. The table accepts this. So does the crowd.`,
  ],
  cake:[
    `Sweet relief after everything else. You eat the cake fast — it goes down easy after all the heavier food, your belly grateful for the change, the sweetness of it filling your mouth. You feel better than you have any right to.`,
    `The cake is the treat. You eat it with something approaching pleasure, your belly warm and stretched and full, the sweetness of the frosting cutting through the heaviness of everything that came before.`,
    `Sweet and easy, even now. Your belly is enormous and warm and tight and the cake still tastes good. You eat it with one hand. Your competition top has ridden up and your belly is out, warm and round in the competition lights.`,
    `You eat the cake like a person rewarding themselves. You've earned it. Your belly sits vast and heavy between your thighs and the frosting is cold and sweet and you eat every crumb.`,
    `The cake disappears in seconds. Your belly is beyond full, pushing everything outward — your shirt has completely ridden up, the full warm curve of your gut visible to the entire crowd — and you eat the last piece of cake with the ease of someone who gave up caring about looking full an hour ago.`,
    `Sweet. Easy. Your belly is an enormous warm full mass between your thighs and the frosting is cold against the heat of everything you've eaten and you eat the cake in four bites and feel it settle into you like punctuation. The crowd has been watching you eat for most of this competition. They will keep watching. You give them something worth watching.`,
  ],
  pie:[
    `Warm and dense. Your belly resists the pie for exactly one second and then accepts it. You eat through the slice with the steady focus you've maintained all competition, the crust crumbling, the filling warm.`,
    `The pie is real filling — you feel it. Your waistband presses. You breathe around the fullness and eat the second slice.`,
    `Pie. Each slice goes in and your belly tightens another increment. The fabric is very tight. You don't stop. Your belly is warm and enormous and you push your chair back slightly to give it room and you keep eating.`,
    `Your belly is so full it's hard to reach forward properly. You lean in anyway, your enormous belly pressing the table, and you eat the pie with the comfortable confidence of someone who has been this full before and eaten more after.`,
    `The pie goes in and your belly is now genuinely beyond description — vast, warm, pressing everything, the competition top riding high, your gut visible and enormous and you are still eating. The crowd is completely silent.`,
    `Pie. The slices go in and each one becomes part of the immense full warmth of your belly sitting massive and low between your thighs. You can feel the table pressing back against it. You eat through the filling and the crust with the focused efficiency of someone who has converted the concept of "too full" into something that belongs to other people. The pie ends. You look at what else is there.`,
  ],
  nachos:[
    `The nachos are easy — light and salty and fast. You eat them in handfuls while you breathe, your belly grateful for something that doesn't press it further. You're not managing capacity, you're topping off.`,
    `Salty and satisfying after all the heavier items. Your belly is genuinely full now but the nachos go down easy and you eat through the tray without difficulty.`,
    `Nachos. Your belly barely notices them individually but the tray adds up. You eat them fast while your belly makes its general fullness very clear. You're past the point where you feel individual items. Everything is just more.`,
    `The nachos disappear. You eat them with the easy confidence of someone who is nowhere near done, your belly warm and pressing and hungry in the specific way of something that has been working very hard and hasn't hit its ceiling.`,
    `Gone in a minute. Your belly is enormous and warm and there is still room in it — there is always still room in it — and the nachos find that room without difficulty.`,
    `The nachos go in without ceremony. Your belly is 820 pounds of body plus everything you've eaten today and it receives nachos the way an ocean receives a handful of pebbles — completely, without protest, without acknowledgment. You eat through the tray and reach for the next thing before the tray is cold.`,
  ],
  icecream:[
    `Cold. Startling. Good. Your belly, warm and tight and very full, receives the ice cream with something that feels like gratitude. You eat it fast before it melts, the cold sweetness going down, your belly briefly less insistent.`,
    `The ice cream is the smartest thing on the table right now. Cold, easy, going down fast. You eat it and your belly calms slightly — just slightly — and you breathe and think about what's left.`,
    `Cold and fast. Your belly is enormous and pressed and the ice cream cuts through the heat of everything else. You eat the whole bowl and your belly settles and you look at what's left on the table.`,
    `Ice cream. Cold against everything warm. Your belly is a furnace right now and the ice cream is the only thing on the table that doesn't make it hotter. You eat it fast and feel, briefly, like you could eat forever.`,
    `The ice cream is cold and you eat it and your belly is vast and warm and forward and the cold spreads through it and you feel, for just a second, like you haven't eaten anything at all. Like you could start again from the beginning. You look at Maya's side.`,
    `Cold and immediate. Your belly is generating its own enormous heat — 820 pounds of you, full and warm and pressing everything — and the ice cream cuts through it like the only cold thing in a hot room. You eat the bowl and feel briefly, impossibly, like you could eat the whole competition over from scratch. Your belly settles. You look at what's left.`,
  ],
};

export const CONTEST_ACTION_POPUPS = {
  unbutton:[
    `The button gives and your belly comes forward — the full warm round weight of it freed from the waistband, pressing into the table without apology. You breathe properly for the first time in ten minutes. Someone in the crowd makes a sound. The judges write something. There is more room now. You reach for the next thing.`,
    `Relief. Immediate. Your belly expands into the freed space, pressing forward into the table, warm and obvious and enormous. The girl from State looks over. You're already eating again.`,
    `The button gives and your belly comes forward all at once — warm and round and freed, hanging heavy and low, the full weight of it settling between your thighs and pressing the table. Your competition top rides up two more inches. Your belly is out, fully visible, warm in the competition lights, and there is room now. More room.`,
    `Your belly bursts free. That's not an exaggeration — it was pressed and contained and now it isn't, the full enormous warm mass of it pressing forward and down, visible to the entire crowd, the table groaning slightly against the new weight. Maya glances over. You eat something.`,
    `The button goes and your belly is free and it is vast and warm and it presses everything within reach. The crowd makes a sound that isn't quite a gasp and isn't quite a cheer — something in between, something they didn't rehearse. Your belly is enormous and out and visible and you put one hand flat on it for one second, feeling the warmth and the weight of yourself, and then you reach for more food.`,
  ],
  rub:[
    `You press both palms flat against your belly, feeling the tight warmth of it, the firm round pressure of being this full. You breathe. You work out some of the pressure with slow circles. It helps. Not much, but enough. You reach for the next item.`,
    `Your hands on your belly — the warmth of it, the tightness, the specific density of this much food in you. You breathe carefully and rub slow and feel the fullness redistribute slightly. Better. You eat again.`,
    `Both hands on the belly. You feel it from outside: the enormous warm sphere of it, tight and full and pressing your palms back. You breathe and rub and your belly lets go of some of the tightness. Just enough. You look at what's left on the table.`,
    `Your belly is enormous under your hands — the size of it, the weight of it, the specific insistent warmth of very full flesh pressing your palms outward. You rub slow. The fullness eases a fraction. You look at Maya. She's rubbing her own belly. Good. Keep going.`,
    `You put both hands on your belly and it is vast and warm and pressing back against your palms with more force than seems possible. You are 630 lbs of competitive eater and your belly is the center of gravity of the room and you rub it slow and deliberate and feel it ease slightly and then you eat more.`,
    `You press both palms flat against your belly and it presses back, enormous and warm and impossibly full, the skin tight and hot against your hands, the sheer size of it meaning your arms have to reach to get to the full forward curve of it. You breathe and rub slow. The fullness redistributes slightly. Your belly is the largest object in this room and you are going to fill it further. You reach for more food.`,
  ],
  taunt:[
    `You look over at Maya. She's 330 lbs and she's been doing this for two years and she's focused on her side of the table. You catch her eye. She looks away immediately. "You're wasting your time," she says, to her food, not to you. You eat another hot dog.`,
    `You look over. Maya is at 370 lbs now and she's working hard and she knows you're there. "How's your side?" you ask. She doesn't answer. She eats faster. "Thought so," you say, and keep going.`,
    `You make eye contact with Maya. She's 410 lbs and her side is disappearing but yours is disappearing faster. "You want to call it?" you ask. "Not even close," she says, but her voice has something in it. "Looked close from here," you say. You eat a rib.`,
    `Maya is 450 lbs and she is eating with everything she has and it's not enough. You look over at her side of the table — what's left of it — and then at yours. "I'm going to steal your pasta," you say. She says: "No you aren't." You look at the pasta. You look at her. "Watch me," you say.`,
    `You look at Maya. She is 490 lbs and she has been eating competitive food for four years and she is one of the best in the country and she is looking at your side of the table the way someone looks at something that has already beaten them. "You're something else," she says quietly. It doesn't sound like a complaint. You eat another slice.`,
    `You look at Maya. She is 530 lbs and she came to the Grand Invitational because she was invited and she is eating hard and she is not going to win. She knows this. You both know this. "I'm going to eat your whole side," you tell her. She looks at you — really looks, for one held moment — and says: "I believe you." You do.`,
  ],
  steal:[
    `You reach across the divider — your arm, your enormous warm arm — and take the pasta from Maya's side. The crowd makes a noise. Maya stops eating for exactly two seconds. She watches you pull it to your side. "Oh," she says quietly. "That's how it is." She goes back to what's left. You eat her pasta.`,
    `You reach over and take the ribs. Maya's hand comes toward them at the same time. You get there first. Your belly presses the divider when you reach and you don't care. "Mine now," you say. Maya laughs, one short sound, and goes back to the rest. You eat her ribs.`,
  ],
  table_cleared:[
    ``,
    ``,
    `The last item is gone. You sit back. Your belly is enormous and warm and pressing everything within reach, and both sides of the table are empty, and the judges are looking at each other. The head judge says: "Table cleared." He says it to the room, not to you specifically, but it's for you specifically.`,
    `You eat the last thing on your side and look at Maya's side and it is also empty. The table is gone. Both sides. The judges confer for one second. "That's it," the head judge says. "Horn." The horn fires. Maya stands at her station, silent, looking at the empty table, then at you.

She says: "You ate my food."

You say: "I did."

She stands very still for a moment. Then she nods once, slowly, like someone filing something away.`,
    `The table is gone. Both sides, every item, nothing left. Your belly is vast and warm and past full and pressing everything and you sit back slowly and your belly settles onto your thighs — enormous, warm, heavier than when the day started, heavier than when the competition started, heavier than you have ever been. The competition bench creaks under you. Then it says something lower, a structural complaint, and the right leg gives. You come down at an angle and catch yourself with one hand and the leg has snapped outward and the bench is angled and your enormous warm belly is still pressing forward through all of it and you are fine.

The head judge stares at the bench. Then at you. Then at the empty table. He writes: "Table cleared." He writes: "Bench failure — competitor's weight." He does not seem to know what column to put the second note in.

Maya is standing at her station with her hands at her sides and she has not moved in thirty seconds. She is looking at you — at the broken bench, at the empty table, at the full warm magnificent fact of you sitting on the angled remains of the competition seating — and her expression is doing something complicated. She is 410 pounds and she thought she knew what large meant. She is revising this.

"I have to ask you something," she says. Her voice is extremely careful.

"Later," you say. You are very full. You feel extraordinary.`,
    `The table is gone. Both sides. Entirely. Your belly is the dominant physical fact of the venue — warm and enormous and pressing the table edge and your thighs and your competition top up past the point where it covers anything — and you are done. Done eating. Done. You sit back and your belly settles into the space in front of you like something geological and the competition bench makes one very specific sound: the sound of something that has made a decision.

It gives. Not gradually — all at once. Both supports go and the bench comes down flat and you come with it and your belly absorbs the landing and you are sitting on the venue floor among the remains of the bench, enormous and warm and completely full, and you feel fine. You feel tremendous. You have just eaten everything on the table.

The head judge has stopped writing. He is simply looking at you. The hall is silent except for the sound of your breathing and the faint settling of broken wood.

Maya is at her station, 450 pounds, one of the largest competitors this event has ever hosted, and she is staring at you on the floor amid the bench wreckage with the full table empty behind you and her expression has moved completely past professional. Her hands are at her sides and she is pressing them flat against her thighs and she says, very quietly, to no one in particular: "oh god."

She means it as a compliment. You know this.

"Help me up," you say.

She moves immediately.`,
  ],
  too_full:[
    `Your belly is done. Full — properly, completely full, the fabric tight and warm and pressed against everything. You can't fit another bite. You sit back and your belly presses the table and the judges see it and the horn fires. That's it. Time to weigh in.`,
    `Capacity hit. Your belly is warm and tight and enormous and pressed against the table and there is no more room right now. You sit back and breathe carefully and wait for the horn. Not bad.`,
    `You reach for the next item and your belly says no. Not a suggestion — a full stop. The fullness is total and warm and present and you sit back and your belly presses everything around it and you are done. The judges mark it.`,
    `Done. You couldn't eat another bite if someone offered you everything on Maya's side of the table. Your belly is vast and full and warm and pressing everything and you sit back and breathe around it and wait. The judges call it.`,
    `You are done. Your belly is an enormous warm full mass pressing the table, pressing your thighs, pressing your competition top up past your navel, and there is simply no more room in it. You sit back. The horn fires. You feel, specifically, like the most full you have ever been. You feel great.`,
    `Even you have limits. Your belly is the dominant physical fact of the Grand Invitational and it has been filled past full and past that and into a fullness that is its own category, warm and vast and pressing the table so hard the table has moved, and you are done. There is no more room. You sit back, your belly enormous and forward and fully out, and the judges mark it, and the horn fires.`,
  ],
};

// Second weigh-in scene text (after eating) — indexed by stageIdx
export const CONTEST_WEIGH_IN_2_TEXT = [
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `The eating is over. The judges call both competitors to the scale for the final weigh-in.

You get up. Your belly is enormous and warm and full — pressing forward with the weight of everything you've eaten — and you move to the scale the way you move at this weight: carefully, deliberately, every step the particular balance of someone carrying a great deal of themselves. The crowd watches. The catering tables are mostly gone. The room is warm.

Maya gets up from her side. She's 330 lbs before the eating and she moves like it — heavy and slow and real, her belly swaying with each step, her thighs pressing together. She catches your eye. She nods once.

You step on the scale first. The judge reads: ${youNew} pounds. He writes it without expression.

Maya steps on. The judge reads: ${mayaNew} pounds. He writes it.

He looks at both numbers. He looks at you. He reads yours into the microphone.`;
  },
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `Time. The judges call competitors to the scale.

You stand. Your belly is full and warm and tight, pressing your competition top up, visible and enormous and present. You walk to the scale with the careful authority of someone who has stopped apologizing for the space she takes up. The crowd is watching. Several of them specifically watch your belly move as you walk. That's fine. That's good.

Maya is already at the scale — 370 lbs, her belly round and warm, moving with that specific gravity of serious weight, her thighs wide and pressing. She looks at you when you arrive. "Good eating," she says. She means it.

You step on. ${youNew} pounds. The judge marks it.

Maya steps on. ${mayaNew} pounds.

The room does the math before the judge does. He announces the result into the microphone anyway.`;
  },
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `The horn fires. Both competitors to the scale.

You rise from the table. Your belly is vast and warm and full — genuinely past full, pushing everything outward, your competition top ridden up and your gut visible and warm in the lights. You walk and your belly moves with you: heavy, swaying, the weight of an enormous amount of food inside an already-enormous body. The crowd parts slightly to let you through. They don't mean to. It's just what happens.

Maya is beside you, 410 lbs, her own belly round and full and swaying, her thighs heavy and warm, moving with the careful deliberate pace of someone who has just eaten more than most people eat in a week. She is large and full and real. You are larger and fuller and more real.

You step on the scale. ${youNew} pounds. The judge reads it twice before he writes it.

Maya: ${mayaNew} pounds.

"Conference champion," the judge says. He looks at you when he says it. He doesn't have to look at you. He just does.`;
  },
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `Final horn. Scale time.

You get up from the table. Your belly is beyond full — tight and warm and pressing everything, your competition top completely ridden up above your navel, the full round warm mass of your gut visible to the entire venue as you walk. You walk like what you are: a very fat woman who has just eaten an extraordinary amount of food. The crowd is watching every step. The crowd has been watching every step all day. That is why they came.

Maya walks beside you. 450 lbs, belly enormous and warm and full, her thighs pressing each other with each step, moving with the heavy careful dignity of someone large and full and proud of both. "That was incredible," she says. "You're incredible." She says it to you, not to the crowd. It's the most she's said all day.

Scale. You: ${youNew} pounds. The judge reads it into the national microphone.

Maya: ${mayaNew} pounds.

The scoreboard updates.`;
  },
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `National championship. Final horn. The arena comes up.

You stand. Your belly is an extraordinary fact — vast and warm and past full and pressing your competition top up and the table away and the air around you with the specific gravity of someone who is both very large and very full simultaneously. You are 630 lbs plus everything you've eaten and you walk to the national championship scale and the crowd — not the polite crowd of regional circuits, not the engaged crowd of conferences, the national crowd, the people who came here specifically for this — watches every step.

Maya walks to the scale from her side of the table. 490 lbs, her enormous belly swaying warm and full, her thighs heavy and deliberate, her expression the calm dignity of someone who has been competing at the highest level for years and knows what she's watching. She found you backstage before the event to say you were the best she'd ever seen. She was right.

You step on the national championship scale. ${youNew} pounds.

Maya: ${mayaNew} pounds.

The announcer reads your name and your number into the national feed. The crowd is already going.`;
  },
  // stageIdx 5 — stage 10, ~820 lbs — Grand Invitational (blob)
  (s, yourGain, mayaGain, mayaLbs) => {
    const youNew = Math.round(s.lbs + yourGain);
    const mayaNew = Math.round(mayaLbs + mayaGain);
    return `The horn fires. The judges call competitors to the Grand Invitational scale.

You rise from the table. This is not a simple act — you are 820 pounds of competitive eater plus everything you've consumed in this competition, and you rise from the table the way a tide rises, slow and enormous and inevitable, your belly enormous and warm and past full pressing forward and down, your thighs wide under its weight, your competition top ridden up well past your navel. The crowd goes silent in the way crowds go silent at things they did not expect to witness. You walk to the scale. Every step is a statement. Your belly sways heavily with each one — warm and vast and full, the weight of it shifting forward and back, the crowd tracking every movement. This is why they came to the Grand Invitational. You.

Maya walks from her side. 530 pounds, her enormous belly rolling warm and low with each step, her thighs pressing together heavily, her expression the measured dignity of someone who knows she did her best today and also knows exactly where she stands. She looks at you with something that might be awe and something that might be love. She does not try to describe what she's looking at.

You step on the Grand Invitational scale. It settles. ${youNew} pounds.

The judge reads it once. Then reads it into the microphone.

Maya: ${mayaNew} pounds.

The room does not cheer immediately. There is one held breath — the whole room taking it in, the number, the person attached to the number, the fact of you standing on this scale at this weight — and then it breaks.`;
  },
];

// Devour mechanic popup text (fires when Devour button used) — indexed by stageIdx
export const CONTEST_DEVOUR_POPUPS = [
  // stageIdx 0–2: not reachable (devour unlocks at stageIdx ≥ 3)
  ``,
  ``,
  ``,
  // stageIdx 3 — ~519 lbs
  `You sweep both selections in front of you — yours and what you've claimed from Maya's side — and you eat all of it, fast and continuous and unstoppable, the fullness cresting and then giving way to a deeper fullness, your belly pressing forward with new insistence. The judges watch. Someone in the crowd makes a sharp sound. You swallow the last piece and your belly is enormous and warm and visibly fuller than it was a moment ago. You feel it: the weight, the warmth, the specific heaviness of taking a great deal of food and making it part of you all at once.`,
  // stageIdx 4 — ~630 lbs
  `You pull everything you've selected in front of you and eat it in a continuous sweep — your side, Maya's side, all of it, going down fast and adding to the vast full weight of your belly, which presses forward another increment and settles heavier between your thighs. Maya watches you eat her food from across the divider. She has stopped eating. She is just watching. Your belly is enormous and forward and full and warm and you have just added a meaningful fraction more to all of that. You breathe around it. You look at what's left.`,
  // stageIdx 5 — ~820 lbs
  `You gather everything you've selected — your items, Maya's items, all of it pulled to your side of the table — and you eat it all in one sustained act of consumption, item after item going down, your belly expanding visibly forward with each addition, the table groaning as your belly presses it harder, your competition top riding up another inch. You eat the last piece and sit back slightly and your belly is a massive warm full presence pressing everything around it, swollen noticeably larger than it was before the devour, heavy and warm between your thighs. The crowd makes a collective sound. The judges look at each other. Maya says, quietly, to no one: "She just ate everything."`,
];

// Payoff paragraph at end of eating contest — indexed by stageIdx, escalates in physical detail
export const CONTEST_PAYOFF_TEXT = [
  // stageIdx 0 — stage 5, ~258 lbs
  (gain) => `You've eaten more today than you've ever eaten in one sitting. ${Math.round(gain)} pounds worth. You can feel it: your pants are tighter than they were this morning, your shirt has ridden up, your belly is warm and round and pressing forward. You are heavier than when you walked in. That's the whole point.`,
  // stageIdx 1 — stage 6, ~320 lbs
  (gain) => `${Math.round(gain)} more pounds have settled into your frame since the horn fired. You feel it clearly now — the waistband pressing your thighs harder, your belly warm and full and pushing forward with more insistence than it had an hour ago. Your shirt is up. Your belly is out. The weight of yourself has increased in a way you can measure in how you sit, how you breathe, how the chair presses back.`,
  // stageIdx 2 — stage 7, ~419 lbs
  (gain) => `${Math.round(gain)} pounds of fat added to your frame in the course of one competition. You can feel the difference — your belly is heavier and warmer and further forward than it was when you sat down, pressing your thighs wider apart, pressing the chair down harder, the fullness of it a warm enormous insistent presence you have to breathe around. Your competition top is fully ridden up above your navel. Your belly is out, round and warm and undeniable, and it is larger than it was. You put one hand flat on it. The warmth. The weight. You are not done growing.`,
  // stageIdx 3 — stage 8, ~519 lbs
  (gain) => `The payoff is real and it is on your body right now. ${Math.round(gain)} pounds of fat have settled into your frame — into your belly, your thighs, your hips — and you can feel every pound of it. Your belly sits between your thighs like something geological, warm and enormous and pressing your thighs further apart than they were this morning, hanging forward past your knees, the full warm weight of it pressing your competition top up and your pants down and making the chair underneath you creak. You put both hands on it, flat, feeling the heat and the tightness and the sheer size of yourself. This is what you came for. This is what the scale will say when you step on it next week. More.`,
  // stageIdx 4 — stage 9, ~630 lbs
  (gain) => `${Math.round(gain)} pounds. That's what this competition added to your body. You feel it everywhere — your belly is visibly larger than when you sat down, enormous and warm and pressing forward past the table edge, your thighs spread wide under its new weight, the full curve of your gut out and visible because your competition top gave up any pretense of covering it an hour ago. You put both hands flat on your belly and feel the heat of it, the immense warmth of a body that has been working very hard and is now very full and very heavy. There is no hiding any of this. There was never any hiding any of this. You are 630-something pounds of competitive eater at the national championship and you just ate everything on the table and then some, and the number on your frame has gone up, and you will be back next year, and you will be bigger.`,
  // stageIdx 5 — stage 10, ~820 lbs (blob)
  (gain) => `${Math.round(gain)} pounds added to an already-extraordinary body. You can feel it in everything — the way your belly sits, heavier and further forward than it did when the horn fired, pressing your thighs wide and pressing the chair down and pressing the table away; the way your competition top, already ridden up to your navel before the contest started, is now ridden up further, the full vast warm belly of you on complete display in the Grand Invitational venue. You put both hands on your belly. It is an enormous warm full mass, pressing your palms back, the heat of it seeping into your hands, the sheer scale of it requiring both arms fully extended to reach the forward curve. You are 820 pounds plus everything you've eaten today. The number going up from here is not surprising. It is the whole point. You breathe around the full warm weight of yourself, and you feel great.`,
];

// ══════════════════════════════════════════════════════════════════
// SUMO MATCH MINI-GAME — eat-to-win push battle vs Dana "The Wall" Mercer
// ══════════════════════════════════════════════════════════════════

export const SUMO_MOVES = [
  { id:'charge',    label:'Tachi-ai Charge', emoji:'🐗', desc:'Explosive forward hit. Huge push — but if she braces or steps aside, you pay for it in balance.', balanceCost:25 },
  { id:'thrust',    label:'Thrust',          emoji:'👊', desc:'Steady belly-and-palm push. Cheap, reliable, moderate ground.',                              balanceCost:10 },
  { id:'drop',      label:'Belly Drop',      emoji:'🫸', desc:'Drop your full weight forward. Scales hard with how heavy you are. Your signature.',          balanceCost:15 },
  { id:'brace',     label:'Brace',           emoji:'🛡️', desc:'Plant and root. Negate her push and recover your balance. No ground gained.',                balanceCost:-30 },
  { id:'sidestep',  label:'Sidestep',        emoji:'↪️', desc:'Slip aside. Devastating if she charges. Wasted if she doesn\'t.',                            balanceCost:10 },
  { id:'fill_ring', label:'Fill the Ring',   emoji:'🌕', desc:'Blob only. You relax completely — belly and ass expanding to claim the dohyo. She bounces out.', balanceCost:0, blobOnly:true },
];

export const SUMO_RIVAL_NAME = 'Dana "The Wall" Mercer';
export const SUMO_RIVAL_WEIGHTS = [340, 370, 410, 460, 520, 560];

// Opponent move telegraphs — shown so the player can counter
export const SUMO_TELEGRAPH = {
  charge:[`Dana drops her shoulder and loads her weight back — a charge is coming.`,`Dana's feet shift and set. She's winding up to fire forward.`],
  thrust:[`Dana raises her palms and squares up. She's going to thrust.`,`Dana sets her hands at your chest. A steady push is coming.`],
  drop:[`Dana hauls her belly back and up — she's loading a drop.`,`Dana lowers her center of gravity. A belly drop is coming.`],
  brace:[`Dana plants wide and roots down. She's bracing.`,`Dana sets her feet and sinks her hips. She's going to hold.`],
  sidestep:[`Dana's weight goes light on one side. She might slip aside.`,`Dana's eyes flick to her left — she's thinking about stepping.`],
};

// Exchange commentary, keyed by outcome bucket, indexed [stageIdx 0..4]
export const SUMO_EXCHANGE_LINES = {
  you_drive:[
    `You get under her and drive forward, belly into belly, and she gives ground — half a step, but it's hers to give and you took it. Dana resets her feet. "Okay," she says. "Okay, then."`,
    `Belly to belly, you push and she moves. Not far. But she moves, and the crowd sees it, and Dana's jaw sets. "You've been training," she says. You drive again.`,
    `You drive into her and your weight goes clean through the contact and she has to step back to keep it. You're pressed gut to gut, warm and enormous, and you're the one moving forward now.`,
    `You put your belly into her and walk her backward a full step. She's strong — always has been — but you're bigger now and the difference shows in her feet. "When did this happen," she breathes.`,
    `You drive and she folds backward off the contact, all 520 pounds of her giving ground to all of you, belly crushed to belly, the crowd roaring. Dana digs in and it doesn't matter. You are simply larger now.`,
    `You lower your center of gravity and drive forward and Keiko — 560 pounds of determined competitor — gives ground immediately, belly to belly, the contact total and overwhelming. She's the second largest woman to ever stand on this dohyo and she is being walked backward by you without difficulty. The crowd, which came specifically to watch this, is very loud.`,
  ],
  you_crush:[
    `You drop your weight into her — full belly, forward and down — and she absorbs it but it costs her. She sinks. "Heavy," she grunts, almost a compliment.`,
    `The belly drop lands square. Your gut hits hers and keeps going and she has to root hard to stop it. She stops it — barely. You feel her balance wobble.`,
    `You drop everything you have into the contact, belly first, and Dana takes it across her own enormous middle and staggers. The sound is tremendous — flesh on flesh, the floor complaining. She's off her line.`,
    `Belly drop. Your weight goes down and forward into her and she buckles around it. She's 460 and you're more, and when you drop it all into her there's nothing she can do but give. She gives.`,
    `You drop the full weight of yourself into her like a wave going over a wall, and the wall goes under. Dana's stance breaks. The crowd comes up out of their seats. Mass over mass — you are the bigger force and the drop proves it.`,
    `You drop everything you have into the contact. Your belly — 820 pounds of it, plus everything you've eaten — comes down and forward into Keiko's smaller frame and the sound is extraordinary. She buckles completely. The floor registers it. She scrambles to recover and doesn't quite make it in time.`,
  ],
  attack_fail:[
    `She read it. Dana plants and your charge bounces off her braced bulk and you rock back, scrambling to keep your feet. "Patience," she says, like a teacher. Annoying.`,
    `You commit and she isn't there — or she's planted like a post — and your weight goes nowhere good. You stumble, recover, reset. Dana doesn't even press it. She's that confident.`,
    `Your charge meets her brace and the collision goes backward through you. Two enormous women and you're the one who lurches. You catch yourself on wide feet. Don't waste the next one.`,
    `She steps and your momentum carries you past, belly leading into empty air, and you fight your own weight to stop. "Careful," she says. "All that weight goes where you point it."`,
    `Even now she can read you — she plants and your charge dies against her and you rock back, the whole enormous mass of you wobbling on your heels. Dana steadies you with one hand. "Don't get cocky."`,
    `She read it. Keiko plants at the right moment and your charge hits her braced bulk and the recoil travels all the way back through 820 pounds of you. You wobble. She presses. You recover. "Good," she says, surprised at herself. "That was good." You reset.`,
  ],
  she_drives:[
    `Dana drives into you and you give ground — she's 340 to your lighter frame and right now that's the whole story. Belly into belly, she walks you toward your edge. Dig in.`,
    `She gets under you and pushes and you slide back toward the rope. She's still bigger and still knows how to use it. Your heels find the line. Stop her here.`,
    `Dana puts her weight into you and for a moment it's even — gut to gut, neither giving — then she finds an inch and takes it. You're near your edge. This is the fight now.`,
    `She drives with everything she has and you give a step out of respect for the effort. But it's only a step. She's spending more than she's gaining now and you can both feel it.`,
    `Dana throws everything into you — all 520 pounds, all the years — and you give half a foot and plant. She's magnificent and she's losing and she knows both. "Come on," she breathes, to herself.`,
    `Keiko drives into you with everything she has — 560 pounds of competitor, pure technique and determination — and moves you half a step and stops. You are 820 pounds and when you plant it takes more than half a step's worth of pressure to keep you going. She strains. You don't move further. She knows.`,
  ],
  clash:[
    `You meet in the middle, belly to belly, and nothing moves. Two warm enormous bodies pressed together, both pushing, the contact going nowhere. She breathes. You breathe. Stalemate — for now.`,
    `Gut against gut, dead even. Neither of you gives an inch. The crowd holds its breath. You can feel her heartbeat through the contact, or maybe that's yours.`,
    `Locked together, mass against mass, the push perfectly balanced. Dana's face is inches from yours. "Even," she grunts. "For now." You both reset.`,
    `You collide and hold, belly crushed to belly, neither moving — but you're spending less than she is to hold it. Even on the floor and tilting everywhere else.`,
    `Two of the largest women the sport has ever seen, pressed together at the center, dead even for one long held moment — then you both break. Even on paper. Not even underneath.`,
    `You and Keiko meet in the center and press, belly to belly — your enormous belly covering most of the contact, her smaller one disappearing into the pressure. Neither of you moves. The crowd is very quiet. You can feel her heartbeat through the contact. Then you both step back and reset.`,
  ],
  brace:[
    `You plant and root and gather yourself — feet wide, weight low, belly forward. Whatever she had coming dies against you. You breathe. Better. Now choose your moment.`,
    `You set your stance and brace and her push goes nowhere. The pause does you good — balance back, feet settled. Dana waits. So do you.`,
    `You root down into the floor, all your weight settling into a wide planted base. She can't move what won't move. You gather yourself for what's next.`,
    `You plant and let her spend herself against you. Her push lands and dies. You feel solid, settled, enormous and immovable, balance flooding back.`,
    `You drop your base and become a mountain — 630 pounds rooted to the floor, belly forward, immovable. Dana hits you and stops. The crowd loves it. You gather and wait.`,
    `You plant wide and root down and 820 pounds settles into the floor of the dohyo with an authority that is not dramatic, just real. Keiko hits you. Nothing happens. You gather yourself. You breathe. You choose your moment.`,
  ],
  you_dodge:[
    `She charges and you aren't there — you slip aside and her own weight carries her stumbling toward her edge. Dana catches herself, furious. "Cute," she snaps. It worked, though.`,
    `Dana commits to the charge and you step and she sails past, all that weight going exactly where she pointed it — away from you. She scrambles. You've got position now.`,
    `She loads up and fires and you simply move, and 410 pounds of Dana goes lurching past your hip toward the rope. The crowd gasps. She saves it, barely. Smart beats big sometimes.`,
    `Dana charges and you sidestep and her momentum nearly carries her out on its own. She fights her own weight to stay in. You didn't even have to touch her. "Okay, that was good," she admits.`,
    `She charges — pride more than strategy — and you step, and Dana goes thundering past into empty air. She pulls up at the very edge. You could have ended it. You both know it. "Showing off," she pants.`,
    `Keiko charges and you slip aside and 560 pounds of her carries past your hip toward the rope. She scrambles to stop — feet skidding — and catches herself right at the edge. She looks back at you. You look at her. "Go again," she says. You do.`,
  ],
  dodge_miss:[
    `You step but she didn't charge — she was waiting — and you circle to nowhere, giving up ground for nothing. Reset. Don't guess wrong twice.`,
    `You slip aside but there was nothing to slip from. Dana just watches you waste the movement. "I'm not falling for that every time," she says. Fair.`,
    `Your sidestep finds only air she didn't commit to. You give a little ground for the trouble. She presses — just enough to remind you it cost something.`,
    `You step expecting a charge that doesn't come. Dana's too smart for that now. You lose a beat and a little ground. She doesn't make you pay much.`,
    `You move and she didn't bite — she's been doing this too long. The sidestep wastes itself. You give half a step back and reset. Even legends guess wrong.`,
    `You step but Keiko doesn't commit — she's been watching you all match and she learned your tells. The sidestep goes nowhere. You give a little ground. You reset. She's better than you expected.`,
  ],
  stumble:[
    `Your feet get away from you — too much weight, too little base — and you lurch, and Dana takes the free ground and drives you toward your edge. Plant. Brace. Get it back.`,
    `You overextend and your own mass betrays you, falling forward with nowhere to put it. Dana pounces. You give ground. Steady up.`,
    `Your balance goes and your enormous body follows it, lurching, and Dana is right there to press the advantage. You stagger toward the rope. Brace next or this bout is hers.`,
    `Too much, too fast — your weight runs ahead of your feet and you stumble, and Dana, ever the veteran, makes you pay with a hard shove. Reset your base.`,
    `Even at your size, balance is balance — yours goes, and 630 pounds is a lot to recover. You lurch, Dana drives, you give ground. Brace. Breathe. Get your feet back.`,
    `820 pounds going sideways is a notable event. Your balance goes and the floor shudders with the corrective stomp you put down to catch yourself, and Keiko is right there to press the advantage. You give ground. You plant. You breathe. You get your feet back. Your belly sways forward when you stop and settles. Keep going.`,
  ],
};

// Between-bout corner feeding — real lbs, restores balance, raises weight advantage
export const SUMO_CORNER_FEED = [
  { lbs:6,  text:`Between bouts your corner has the chanko ready — a deep bowl of it, dense and warm — plus rice and something sweet. You eat all of it fast, the way you've learned to, and feel your belly fill and settle lower. You go back out heavier than you came in. Heavier wins.` },
  { lbs:9,  text:`Your corner feeds you in the break: chanko, rice, a full second bowl. You eat it down to nothing while Dana watches from across the ring, not eating. Your belly settles warm and full and a little lower than before. Every pound you add now is a pound she has to move later.` },
  { lbs:12, text:`The corner break, and the food is waiting — you've made this a system. Bowl after bowl of dense warm chanko, eaten with focus, your belly filling and rounding and pressing forward further than it did a bout ago. You stand up heavier. Dana sees it. She knows what it means.` },
  { lbs:15, text:`Your corner has a feast staged for the interval and you work through it — chanko, rice, the dense fuel that becomes mass that becomes force. Your belly fills enormous and warm and you feel the added weight change how you stand. You go back out bigger than the woman who won the last bout. On purpose.` },
  { lbs:18, text:`The corner ritual, refined over two years: between bouts you eat, and you eat seriously — bowls of chanko, the works, your belly filling past full and settling into your stance like ballast. You return to center heavier than any human being should be, exactly as planned. Dana watches you grow between bouts. There's nothing she can do about it.` },
  { lbs:22, text:`Your corner doesn't ask how you're doing. They just bring the chanko — enormous bowls of it, the proper Invitational portion — and you eat it down to nothing while your belly sits enormous and warm and between your thighs and receives it. Each bowl goes in and your belly settles further forward and heavier against the mawashi. You stand up. The floor registers the weight shift. You go back to the dohyo bigger than you left it. That is the whole plan.` },
];

export const SUMO_BOUT_WON = [
  `You drive her foot past the straw and the bout is yours. Dana steps back in, re-ties her mawashi, breathing hard. "One," she allows. "You've got one." The crowd is louder than it was. You're not the novelty anymore.`,
  `You walk her out and the bout is yours. Dana plants her hands on her knees a moment, then straightens. "Where'd you learn to push like that," she says. It isn't really a question. You both know: you got bigger.`,
  `You press her out and take the bout. The crowd chants something — your name, actually, for the first time at this level. Dana hears it. "Yeah," she says, to herself. "Yeah, I hear them." She sets up anyway.`,
  `Belly first, you drive Dana out of the ring — decisive, the contact echoing off the back wall. She steps back in. "You're a problem," she says, no bitterness in it. "You're a real problem now." The crowd is enormous.`,
  `You push 520 pounds of Dana Mercer out of the ring like the tide going out and the bout is yours. The arena erupts. Dana steps to center, hands on her belly, almost smiling. "That's the one I came to feel," she says. "Do it again and I'll believe it."`,
  `You drive Keiko out of the Invitational dohyo — all 560 pounds of her giving way to the full forward mass of you — and the bout is yours. Keiko steps back to the edge of the ring, breathing hard, looking at you with the expression of someone revising everything they thought was possible. "I prepared for this all year," she says. "I'm not disappointed. I just... didn't know." You step to center. Bout won. Continue.`,
];

export const SUMO_BOUT_LOST = [
  `She drives you out — Dana's still the bigger woman today and she spends it well. The bout is hers. "That's how it's done," she says, not unkindly. Your turn to answer. Fuel up. Get bigger. Get even.`,
  `Dana walks you past your line and takes the bout. She's good and still heavier and right now that's enough. "Close," she admits, re-tying her wrap. Closer than last time. Eat in your corner. Come back heavier.`,
  `She catches you off balance and drives you out. The bout is hers, and it stings because you know you can take her now. Reset. Fuel. The weight is on your side — use it.`,
  `Dana takes the bout — pride and technique and everything she's got. She earns it. But she spent a lot, and you've got more in the tank and more in the corner. Go eat. Come back bigger than her.`,
  `Dana wins the bout the way a champion wins — total commitment, nothing held back. She's magnificent. She's also pouring everything out to stay with you, and you've barely begun to spend. Corner. Fuel. Bury her in the next one.`,
  `Keiko takes it — good technique, a read on your timing, pure grit. She earns it completely. She's 560 pounds and she fought the largest competitor in the history of this dohyo and she's still standing. You are genuinely impressed. You go to your corner. You eat. You come back bigger. Grit has a limit. Mass doesn't.`,
];

// Match aftermath scene — (s, yourGain, won, oppLbs) => string
export const SUMO_MATCH_AFTERMATH = [
  (s,g,won,opp)=> won
    ? `The match is yours. Your first real scalp on the circuit, and it came belly-first against a veteran who outweighed you walking in. Dana finds you at the edge of the dohyo, breathing hard, and puts a heavy hand on your shoulder. "You're going to be a problem," she says. "Six years I've done this, and you're going to be a problem." She means it as the highest thing she can say.`
    : `Dana takes the match. She was bigger today and she fought like the veteran she is and she earned it. "You pushed me harder than anyone has in a year," she says, and it's true. You can already feel the math: more weight, more force, next time. The gap is closing and you both know which way it closes.`,
  (s,g,won,opp)=> won
    ? `Match to you. The circuit knows your name now and this was no upset — you walked Dana Mercer out twice, and the second time the crowd was chanting before her foot crossed the line. "Two seasons ago you couldn't have moved me," she says, hands on her knees. "Now look." She nods at your belly, full and forward from the corner. "Keep eating. I mean it. Keep getting bigger."`
    : `Dana edges it — much closer than last time, and she knows it cost her everything. "I'm running out of room," she admits, re-tying her wrap. "You keep getting bigger and I'm running out of room to win in." Your belly is warm and full from the corner. She's right. A few more pounds. The next one is yours.`,
  (s,g,won,opp)=> won
    ? `Match to you, and this time it wasn't close. You're heavier than Dana now — the first time that's ever been true — and the bouts showed exactly what it means: belly over belly, your mass through hers, her veteran craft not quite enough against simple overwhelming size. "You crossed over," she says, almost wondering. "You're the bigger one now. How's it feel?" The crowd chants your name as you leave.`
    : `Dana steals it — catches you off balance twice and makes the technique count, because she had to. You're bigger than her now and you both know that's the only reason she could still win, and only barely. "I robbed you," she says, not pretending otherwise. "Next time you'll just sit on me and there's nothing I can do." She's right.`,
  (s,g,won,opp)=> won
    ? `Match to you, decisive. You outweigh Dana Mercer by a clear margin now and on the dohyo that margin is the whole story — you drove her out belly-first, twice, the press section on its feet. She comes to you after, generous as ever. "I used to be the wall," she says. "Now I'm the thing they measure you against. That's a good way to go out." You carry your enormous warm belly off the dohyo like the asset it is.`
    : `Dana fights the perfect match — every ounce of two decades poured out — and steals it on pure craft, because size alone says it should've been yours. "That's the last time," she says, honest and tired. "You're too big now. I can win the chess but I can't win the weight." She's right. Next time you let it do the talking.`,
  (s,g,won,opp)=> won
    ? `Match to you. National champion. You buried Dana Mercer under all of you and the arena came apart at the second bout. She finds you at the edge of the dohyo, breathing hard, smiling. "I came here to feel it," she says. "To feel what it's like when someone's just... bigger than the sport. I felt it. Thank you." You stand in the noise, the largest competitor the circuit has ever crowned, and you think: more. There's always more.`
    : `Dana, somehow, steals it — the match of her life, every trick she's ever learned, spent completely against a woman who outweighs her by a hundred pounds. The crowd gives her a standing ovation and she earns it. "One last good one," she says, wrung out, grinning. "But you're the future and we both know it. Go get bigger. Go be the thing they can't beat." You will. You absolutely will.`,
  // stageIdx 5 — stage 10, ~820 lbs — Grand Invitational Exhibition
  (s,g,won,opp)=> won
    ? `Match to you. Invitational champion. Keiko — 560 pounds of competitor who trained for a year for this exhibition — finds you at the edge of the dohyo and stands there for a moment, just looking at you. At all of you. At the full enormous warm reality of 820 pounds standing in the competition lights. "I thought I knew what I was stepping onto the dohyo to face," she says. "I didn't." She puts out her hand. You take it. "Thank you," she says. You nod. You both know exactly what was demonstrated here today, and what it means for what comes next. You are the largest the sport has ever seen. You are still getting larger.`
    : `Keiko takes it — an extraordinary match, fought brilliantly by a competitor who understood exactly what she was up against and chose the perfect strategy to exploit the one gap in your technique. She earned every step of it. "You're still the largest thing the dohyo has ever seen," she tells you after. "I just had a good day. Next time you'll know my timing." She's right. But next time you'll also be bigger, and the gap between your weight and hers will be wider, and that gap has always been the whole story. More. There is always more.`,
];

// Sumo payoff paragraph — indexed by stageIdx, escalates in physical detail
export const SUMO_PAYOFF_TEXT = [
  // stageIdx 0 — stage 5, ~258 lbs
  (gain) => `${Math.round(gain)} pounds added to your frame in the course of this match. You can feel it in your stance — lower and heavier than when you stepped onto the dohyo. Your mawashi sits tighter. Your belly is warm and forward. You are already thinking about next time.`,
  // stageIdx 1 — stage 6, ~320 lbs
  (gain) => `${Math.round(gain)} pounds added since the opening bow. Your belly is heavier and warmer than it was, pressing your mawashi outward, and you feel it in every step back to the edge of the ring — the specific density of a body that has been fueling all match and now carries the evidence. Heavier. That's the whole strategy.`,
  // stageIdx 2 — stage 7, ~419 lbs
  (gain) => `${Math.round(gain)} pounds gained in a single match — between the corner feed and the eating you did in warmup, your frame has added real mass today and you can feel it. Your belly is enormous and warm and pressing your mawashi and it is larger than when you walked in. Your stance is lower. Your weight is more. Your thighs press together harder with each step. This is the work. You are doing the work.`,
  // stageIdx 3 — stage 8, ~519 lbs
  (gain) => `${Math.round(gain)} pounds. Added to a body that was already the heaviest on the circuit. Your belly is an enormous warm full mass pressing your mawashi outward — visibly larger than it was before the match — and your thighs are wider under its increased weight, and you feel every added pound in how you stand and how the floor receives you. You put one hand flat on your belly, feeling the warmth and the weight and the full round pressure of it. Then you think about what you want to weigh at the next tournament.`,
  // stageIdx 4 — stage 9, ~630 lbs
  (gain) => `The payoff is real and it is on your body and it is visible. ${Math.round(gain)} pounds have been added to your frame across the course of this match — corner feed, warmup, the sheer caloric intensity of fighting at this weight — and your belly sits between your thighs heavier and further forward than it did when the opening bow happened. You can feel the difference: the mawashi tighter, the floor pressing back harder with each step, your belly warm and vast and swollen with the specific fullness of having eaten seriously and exerted seriously at the same time. Both. At once. Your belly is enormous and you are the national champion and the number is still going up.`,
  // stageIdx 5 — stage 10, ~820 lbs (blob)
  (gain) => `${Math.round(gain)} pounds. Added on top of 820. Your belly — already the dominant physical fact of the Invitational, already the thing that reshaped the dohyo's geometry just by standing in it — is now measurably larger than when the match began, sitting enormous and warm and heavy between your thighs, pressing your mawashi forward, pressing your thighs further apart, the full vast warm mass of you increased by another increment that is visible if you know where to look, and several people in this room know where to look. You put both hands flat on your belly. It fills your arms. The warmth of it seeps into your palms. You breathe around it. You feel the weight of yourself in the floor underneath you. You think: more. There is always more room for more.`,
];

// Fill the Ring move popup text — only fires at blob stage
export const SUMO_FILL_RING_TEXT = [
  null, null, null, null, null,
  // stageIdx 5 — blob
  `You stop. You exhale and let go completely — your belly surging forward off the apron without restraint, ass pressing the clay in a wide warm mass that finds both sides of the center line at once. The wood issues a single low sound: not a creak but a settling, the dohyo acknowledging something it was not designed for.

Keiko is 560 pounds. She was the largest competitor in this venue's history when she walked in. She is now standing at the ring's edge staring at you the way something large looks at something vastly larger — the way a hill looks at a mountain. You have more belly than she has body. You are not filling the ring. You are the ring.

She takes one step back. Her heel crosses the tawara. The judges look up, then at each other, then write it down.

The arena makes the sound of several hundred people breathing out simultaneously. Then it comes apart entirely.`,
];

// ── FEEDEE CREATOR: COLLAB STREAM CONSTANTS ─────────────────────────────────

export const COLLAB_CONTENT_CREATOR_ARCHETYPES=['gamer','quiet','artsy','sorority'];

// Food tiers per stageIdx — each tier: {id, name, emoji, lbsKylie, lbsPartner, qualBoost}
export const COLLAB_STREAM_FOODS=[
  // stageIdx 0 — ~258 lbs
  [
    {id:'open_k0',    name:'Opening Tray',      emoji:'🍽️', lbsKylie:6,  lbsPartner:5,  qualBoost:10, side:'both'},
    {id:'warmup_k0',  name:'Warm-Up Snacks',    emoji:'🍟', lbsKylie:5,  lbsPartner:4,  qualBoost:9,  side:'both'},
    {id:'second_k0',  name:'Donation Special',  emoji:'🍕', lbsKylie:9,  lbsPartner:7,  qualBoost:12, side:'both'},
    {id:'mid_k0',     name:'Main Course',       emoji:'🍝', lbsKylie:10, lbsPartner:8,  qualBoost:12, side:'both'},
    {id:'chall_k0',   name:'Challenge Course',  emoji:'🌮', lbsKylie:11, lbsPartner:9,  qualBoost:14, side:'both'},
    {id:'finish_k0',  name:'Stream Finale',     emoji:'🎂', lbsKylie:8,  lbsPartner:6,  qualBoost:14, side:'both'},
  ],
  // stageIdx 1 — ~320 lbs
  [
    {id:'open_k1',    name:'Opening Spread',    emoji:'🍽️', lbsKylie:8,  lbsPartner:7,  qualBoost:10, side:'both'},
    {id:'warmup_k1',  name:'Pre-Stream Snacks', emoji:'🍟', lbsKylie:7,  lbsPartner:6,  qualBoost:9,  side:'both'},
    {id:'second_k1',  name:'Sub Goal Tier',     emoji:'🍗', lbsKylie:12, lbsPartner:10, qualBoost:12, side:'both'},
    {id:'mid_k1',     name:'Viewer Request',    emoji:'🥗', lbsKylie:10, lbsPartner:9,  qualBoost:12, side:'both'},
    {id:'third_k1',   name:'Challenge Course',  emoji:'🌮', lbsKylie:14, lbsPartner:12, qualBoost:14, side:'both'},
    {id:'bonus_k1',   name:'Bonus Round',       emoji:'🥩', lbsKylie:12, lbsPartner:10, qualBoost:13, side:'both'},
    {id:'finish_k1',  name:'Stream Finale',     emoji:'🎂', lbsKylie:9,  lbsPartner:8,  qualBoost:16, side:'both'},
  ],
  // stageIdx 2 — ~419 lbs
  [
    {id:'open_k2',    name:'Opening Spread',    emoji:'🍽️', lbsKylie:10, lbsPartner:8,  qualBoost:10, side:'both'},
    {id:'warmup_k2',  name:'Pre-Stream Plate',  emoji:'🍟', lbsKylie:8,  lbsPartner:7,  qualBoost:9,  side:'both'},
    {id:'second_k2',  name:'Sub Goal #1',       emoji:'🍗', lbsKylie:14, lbsPartner:11, qualBoost:12, side:'both'},
    {id:'mid_k2',     name:'Viewer Special',    emoji:'🥗', lbsKylie:12, lbsPartner:10, qualBoost:12, side:'both'},
    {id:'third_k2',   name:'Challenge Platter', emoji:'🌮', lbsKylie:18, lbsPartner:14, qualBoost:14, side:'both'},
    {id:'special_k2', name:'Sponsor Tier',      emoji:'🥩', lbsKylie:16, lbsPartner:13, qualBoost:15, side:'both'},
    {id:'bonus_k2',   name:'Donation Goal',     emoji:'🍱', lbsKylie:14, lbsPartner:11, qualBoost:14, side:'both'},
    {id:'finish_k2',  name:'Stream Finale',     emoji:'🎂', lbsKylie:10, lbsPartner:9,  qualBoost:18, side:'both'},
  ],
  // stageIdx 3 — ~519 lbs
  [
    {id:'open_k3',    name:'Opening Course',    emoji:'🍽️', lbsKylie:12, lbsPartner:10, qualBoost:10, side:'both'},
    {id:'warmup_k3',  name:'Pre-Stream Feast',  emoji:'🍟', lbsKylie:10, lbsPartner:8,  qualBoost:9,  side:'both'},
    {id:'second_k3',  name:'Sub Goal #1',       emoji:'🍗', lbsKylie:16, lbsPartner:13, qualBoost:12, side:'both'},
    {id:'mid_k3',     name:'Viewer Special',    emoji:'🥗', lbsKylie:14, lbsPartner:11, qualBoost:12, side:'both'},
    {id:'third_k3',   name:'Challenge Platter', emoji:'🌮', lbsKylie:22, lbsPartner:17, qualBoost:14, side:'both'},
    {id:'special_k3', name:'Sponsor Tier',      emoji:'🍱', lbsKylie:20, lbsPartner:16, qualBoost:15, side:'both'},
    {id:'bonus_k3',   name:'Fan Request',       emoji:'🥩', lbsKylie:18, lbsPartner:14, qualBoost:15, side:'both'},
    {id:'goal2_k3',   name:'Sub Goal #2',       emoji:'🍰', lbsKylie:16, lbsPartner:13, qualBoost:14, side:'both'},
    {id:'finish_k3',  name:'Stream Finale',     emoji:'🎂', lbsKylie:12, lbsPartner:10, qualBoost:18, side:'both'},
  ],
  // stageIdx 4 — ~630 lbs
  [
    {id:'open_k4',    name:'Opening Spread',    emoji:'🍽️', lbsKylie:14, lbsPartner:12, qualBoost:10, side:'both'},
    {id:'warmup_k4',  name:'Pre-Stream Course', emoji:'🍟', lbsKylie:11, lbsPartner:9,  qualBoost:9,  side:'both'},
    {id:'second_k4',  name:'Sub Goal #1',       emoji:'🍗', lbsKylie:20, lbsPartner:16, qualBoost:12, side:'both'},
    {id:'mid_k4',     name:'Viewer Special',    emoji:'🥗', lbsKylie:17, lbsPartner:14, qualBoost:12, side:'both'},
    {id:'third_k4',   name:'Challenge Platter', emoji:'🌮', lbsKylie:26, lbsPartner:20, qualBoost:14, side:'both'},
    {id:'special_k4', name:'Legend Tier',       emoji:'🥩', lbsKylie:24, lbsPartner:19, qualBoost:15, side:'both'},
    {id:'sponsor_k4', name:'Sponsor Finale',    emoji:'🍱', lbsKylie:28, lbsPartner:22, qualBoost:16, side:'both'},
    {id:'bonus_k4',   name:'Viewer Choice',     emoji:'👑', lbsKylie:22, lbsPartner:17, qualBoost:15, side:'both'},
    {id:'goal2_k4',   name:'Sub Goal #2',       emoji:'🍰', lbsKylie:20, lbsPartner:16, qualBoost:15, side:'both'},
    {id:'finish_k4',  name:'Stream Finale',     emoji:'🎂', lbsKylie:14, lbsPartner:12, qualBoost:20, side:'both'},
  ],
  // stageIdx 5 — ~820 lbs blob
  [
    {id:'open_k5',    name:'Opening Course',    emoji:'🍽️', lbsKylie:18, lbsPartner:15, qualBoost:10, side:'both'},
    {id:'warmup_k5',  name:'Pre-Stream Feast',  emoji:'🍟', lbsKylie:14, lbsPartner:12, qualBoost:9,  side:'both'},
    {id:'second_k5',  name:'Sub Goal #1',       emoji:'🍗', lbsKylie:25, lbsPartner:20, qualBoost:12, side:'both'},
    {id:'mid_k5',     name:'Viewer Special',    emoji:'🥗', lbsKylie:22, lbsPartner:18, qualBoost:12, side:'both'},
    {id:'third_k5',   name:'Challenge Platter', emoji:'🌮', lbsKylie:32, lbsPartner:25, qualBoost:14, side:'both'},
    {id:'special_k5', name:'Spectacle Tier',    emoji:'🥩', lbsKylie:30, lbsPartner:24, qualBoost:15, side:'both'},
    {id:'sponsor_k5', name:'Sponsor Finale',    emoji:'🍱', lbsKylie:36, lbsPartner:28, qualBoost:16, side:'both'},
    {id:'bonus_k5',   name:'Legacy Plate',      emoji:'👑', lbsKylie:28, lbsPartner:22, qualBoost:18, side:'both'},
    {id:'goal2_k5',   name:'Sub Goal #2',       emoji:'🍰', lbsKylie:26, lbsPartner:20, qualBoost:17, side:'both'},
    {id:'grand_k5',   name:'Grand Spectacle',   emoji:'🌕', lbsKylie:24, lbsPartner:20, qualBoost:20, side:'both'},
    {id:'finish_k5',  name:'Stream Finale',     emoji:'🎂', lbsKylie:18, lbsPartner:15, qualBoost:22, side:'both'},
  ],
];

// Stage-up popup — fires when partner crosses a weight stage threshold mid-stream
// newLbs = partner's new weight in lbs (number)
export const COLLAB_STAGEUP_TEXT=[
  // stageIdx 0
  (kylieName,partnerName,newLbs)=>`The scale app updates on the secondary screen and I catch it in my peripheral vision and I stop talking mid-sentence. The chat catches it before I do — the numbers are already scrolling, people asking is that right, is that actually right.

I look at the camera. "${partnerName} just crossed ${Math.round(newLbs)} pounds."

The chat is going. ${partnerName} looks down at herself — hands on her belly, which is rounder and heavier than it was when the stream started — and she says something quietly that the mic picks up: "oh." Just that. Oh. The chat is going absolutely wild and she is sitting there with her hands on her belly saying "oh" like it's new information and also not new information at all.

I reach for the next plate. We're not done.`,
  // stageIdx 1
  (kylieName,partnerName,newLbs)=>`The weight app flashes on the secondary monitor and the chat sees it at the same time I do. I don't have to announce it — the chat does it for me, typing the new number in caps, repeating it, sending the same five words over and over: she got bigger on stream.

"${partnerName} just crossed ${Math.round(newLbs)} pounds," I say, to the camera, clearly.

She's looking at her own belly — the warmth of it, the forward press of it, heavier than when we started — and she looks at the camera and says: "more." She means more food. The chat means the same thing. I reach for the plate.`,
  // stageIdx 2
  (kylieName,partnerName,newLbs)=>`The threshold hits and I see it on the monitor and I look over at ${partnerName} and she already knows — she can feel it, the added weight of everything we've eaten, the belly sitting heavier and warmer and fuller between her thighs. She puts both hands flat on it. She looks at the camera.

"${Math.round(newLbs)} pounds," she says. Just the number. Just that.

The chat explodes. Wren types: *I KNEW IT I KNEW EXACTLY WHERE THIS WAS GOING.* The donation bar jumps two brackets in thirty seconds. I reach for the next course. We're going to make the most of this.`,
  // stageIdx 3
  (kylieName,partnerName,newLbs)=>`The alert fires on the monitor and I let it sit for three seconds — three full seconds while the chat figures out what they're looking at — before I say it.

"${partnerName} just crossed ${Math.round(newLbs)} pounds. On stream. Tonight."

She's sitting with her hands under the forward curve of her belly, feeling the weight of it, and she is smiling. Wren has donated a substantial amount in the time it took me to say that sentence. I look at the table: there is food left. I reach for the plate. We are not done.`,
  // stageIdx 4
  (kylieName,partnerName,newLbs)=>`She crosses the threshold and I see it happen — not from the monitor, but from her: the way she breathes out, the way her hands go to her belly automatically, the way she sits back slightly as if acknowledging new geography. Then the monitor confirms it and the chat confirms it and I say it.

"${Math.round(newLbs)} pounds. On my stream. Right now."

Wren is in this building. She's watching from somewhere and the chat is going and ${partnerName} is enormous and warm and heavier than she was an hour ago and I am going to feed her until there is nothing left on this table. I reach for it.`,
  // stageIdx 5
  (kylieName,partnerName,newLbs)=>`I see it from across the room — not from the monitor this time, I see it in ${partnerName}: the moment she crosses the threshold, she gets very still. Both hands flat on her belly. Eyes closed for exactly one second.

Then she opens them and looks at the camera.

"${Math.round(newLbs)} pounds," she says.

Wren says it in chat at the same moment. *${Math.round(newLbs)} pounds. On the biggest stream this platform has ever hosted.*

I am in this corner and my collab partner just got heavier and the room is full of people who came to see this happen and it is happening and I reach for the plate and I feel the weight of my own belly against the table and I think: more. There is always more.`,
];

// Wren chat lines per stageIdx
export const COLLAB_WREN_LINES=[
  ["wrenWatchesEverything: I found this by complete accident. I'm not leaving.", "wrenWatchesEverything: wait they're feeding each other?? I'm subscribing RIGHT NOW", "wrenWatchesEverything: the chat is going crazy and I'm going crazy too"],
  ["wrenWatchesEverything: regular collab viewer now, been here every week", "wrenWatchesEverything: the format is so good. the double feed. it works.", "wrenWatchesEverything: I donated to get the next tier. I have no regrets."],
  ["wrenWatchesEverything: top donor four streams running, hi", "wrenWatchesEverything: the platform feature was deserved. I said this in advance.", "wrenWatchesEverything: I KNEW a stage-up was coming I've been watching the numbers"],
  ["wrenWatchesEverything: Wren donating the full goal herself, as usual, see you at the next tier", "wrenWatchesEverything: the brand deal was obvious. they'd be stupid not to.", "wrenWatchesEverything: I DM'd asking to be on stream someday. Kylie said 'maybe'. I'm holding onto maybe."],
  ["wrenWatchesEverything: I drove to this city. I am in the waiting area of this building.", "wrenWatchesEverything: one year of weekly collabs and she keeps getting bigger. I am not emotionally prepared.", "wrenWatchesEverything: Wren. Top subscriber. In the building. That's all I have to say."],
  ["wrenWatchesEverything: I'm in the room. The actual room. She knows I'm here.", "wrenWatchesEverything: 820 pounds and the platform has never seen numbers like this stream right now", "wrenWatchesEverything: I've been watching since 258 pounds. I've been watching her grow. Look at her. Look at them both."],
];

// Blob announcement popup — fires when a past collab partner hits blob stage
// Structure: COLLAB_BLOB_ANNOUNCEMENT[partnerId][stageIdx]
// Keyed by student ID so each collab partner gets a specific reaction variant
export const COLLAB_BLOB_ANNOUNCEMENT={
  // id 5 — Destiny (gamer) — Playful & Envious
  5:[
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says with a bright, energetic smile, still able to lean forward easily as she rubs slow circles over the soft curve of her heavy belly. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." She giggles, giving her gut a light, happy pat that sends gentle ripples across her body. "God, she's like four times my size now… it makes me so envious. I've been packing in extra calories every day hoping I'll get there someday."`,
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says, smiling brightly while shifting her thicker thighs apart with a soft grunt. She rubs slow circles over the noticeably larger dome of her fat belly. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." She giggles, giving her gut a playful pat that makes her softer middle wobble more noticeably. "She's still so much bigger than me… it makes me want that so badly. I've been packing in extra calories every day hoping I'll catch up soon."`,
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says, smiling brightly as she leans back slightly, her very fat belly resting heavily on her lap. She rubs slow, affectionate circles over the top of her huge, soft middle. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." She giggles, the motion causing her heavy breasts and belly to jiggle together as she gives her gut a happy pat. "I'm getting closer but she's still way ahead… it makes me so greedy. I've been packing in extra calories every day hoping I'll reach that level too."`,
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says warmly, breathing a little heavier as she settles her enormous body into her reinforced chair. One hand slowly traces circles across the vast expanse of her enormous, sagging belly. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." She lets out a bubbly giggle that makes her whole upper body shake, then gives the side of her massive gut an affectionate slap. "I'm getting so close now… it makes me want that helplessness even more. I've been packing in extra calories every day hoping I'll match her soon."`,
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says with an excited smile, her voice slightly muffled by her double chin as she struggles to lean forward. Both hands rub slow circles over her colossal, apron-like belly that spreads widely across her lap. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." She giggles, sending visible waves through her immense body, then gives her heavy gut a firm, happy pat. "I can almost taste it… I'm so close to being that helpless too. I've been packing in extra calories every day hoping I'll get there any day now."`,
    `"Hey babes~ Just got the sweetest update from my favorite collab partner…" Kylie says breathily, her voice soft and eager while her completely immobile, blob-like body quivers in her reinforced bed. Her hands sink deep into the overflowing folds of her massive belly as she rubs slow circles across what she can reach of its immense surface. "She's not gonna be able to make it to any more shoots. She got so gloriously fat that she literally can't fit through her front door anymore." A deep, happy giggle ripples through her entire mountain of fat, making everything wobble and quake as she lovingly pats the top of her enormous gut. "Looks like she finally caught up to me… but I'm still gonna keep going. I've been packing in extra calories every day because I want even more."`,
  ],
  // id 8 — Maya (quiet) — Sweet & Motivated
  8:[
    `"Big announcement, my lovely piggies," Kylie says warmly with an energetic smile, easily leaning toward the camera while rubbing gentle circles on her heavy belly. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She bites her lip softly, lifting and dropping the soft roll of her belly with affection. "She's so much bigger than me right now… it's really inspiring me. I've been stuffing myself extra hard every day trying to follow in her footsteps."`,
    `"Big announcement, my lovely piggies," Kylie purrs sweetly, shifting her thicker thighs as she rubs circles over her fat belly. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She smiles, giving her softer gut a loving pat. "She's still way ahead of me… but it makes me so motivated. I've been eating bigger meals than ever because I want to feel that same softness soon."`,
    `"Big announcement, my lovely piggies," Kylie says with a happy sigh, her very fat belly resting heavily on her lap as she caresses its wide surface. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She giggles softly, making her heavy curves jiggle. "I'm getting closer but she's still so much bigger… it has me pushing myself harder. I've been stuffing myself stupid trying to catch up to that level of helplessness."`,
    `"Big announcement, my lovely piggies," Kylie says warmly, breathing heavier as she settles into her reinforced chair, one hand slowly stroking her enormous sagging belly. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She bites her lip, eyes sparkling. "I'm getting so close now… it makes my heart race. I've been forcing down even more calories because I want to be just as stuck as she is."`,
    `"Big announcement, my lovely piggies," Kylie purrs, her voice slightly strained as she struggles to lean forward, both hands rubbing her colossal apron belly. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She smiles dreamily, her massive body wobbling. "I can almost taste that same immobility… I'm so close. I've been eating like crazy every day trying to reach her level."`,
    `"Big announcement, my lovely piggies," Kylie says softly and sweetly from her reinforced bed, her completely immobile blob-like body quivering as her hands sink into the vast folds she can reach. "My gorgeous collaborator is officially house-bound now. We fed her until she became this beautiful, immobile mountain of fat." She lets out a content sigh, everything jiggling. "She finally caught up to me… but seeing her like this still makes me want even more. I've been packing it in non-stop."`,
  ],
  // id 4 — Fiona (artsy) — Teasing & Dreamy
  4:[
    `"Oh my god you guys, I'm dying," Kylie laughs brightly, leaning forward with ease as she drums her fingers across her heavy belly. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat. She got stuck in the doorway." She grins, patting her gut playfully. "She's like four times my size… it's got me daydreaming nonstop. I've been eating even more just imagining becoming a proper homebody blob like her someday."`,
    `"Oh my god you guys, I'm dying," Kylie laughs, her body jiggling as she shifts her thicker thighs and rubs her fat belly. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat." She smiles teasingly. "She's still so much bigger than me… it has me all dreamy. I keep packing in extra calories thinking about ending up just like that."`,
    `"Oh my god you guys, I'm dying," Kylie laughs warmly, her very fat belly resting on her lap as she caresses its soft surface. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat." She giggles, sending ripples through her heavy frame. "I'm getting closer but she's still way ahead… it's making me so greedy in my dreams. I've been eating bigger and bigger meals lately."`,
    `"Oh my god you guys, I'm dying," Kylie says with a dreamy smile, breathing heavier as she traces circles on her enormous belly. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat." She gives her massive gut a happy pat. "I'm so close now… it's got me fantasizing constantly. I've been stuffing myself harder than ever trying to reach that point."`,
    `"Oh my god you guys, I'm dying," Kylie says teasingly, voice muffled by her chins as she struggles to lean in, hands on her colossal belly. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat." She giggles, waves rolling across her body. "I can almost taste it… I'm right on the edge. I've been eating like crazy hoping to get there any day now."`,
    `"Oh my god you guys, I'm dying," Kylie says breathily from her bed, her immobile blob body quivering as her hands sink into her massive gut. "My collab cutie just told me she's too fat to leave the house now. Like… actually too fat." A deep giggle ripples through her. "She finally caught up… but I'm still dreaming about going even further. I've been packing it in non-stop."`,
  ],
  // id 12 — Roxanne (artsy) — Affectionate & Horny
  12:[
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos softly with excitement, easily cradling her heavy belly. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." She squeezes her soft fat lovingly. "She's so much bigger than me right now… it's making me so greedy. I've been pushing my body harder every day because I want to end up just as stuck and spoiled."`,
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos, shifting her thicker body as she holds the sides of her fat belly. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." She lets fat spill between her fingers. "She's still way ahead… it turns me on so much. I've been eating more than ever trying to catch that feeling."`,
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos affectionately, her very fat belly heavy on her lap as she squeezes its sides. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." She giggles, everything jiggling. "I'm getting closer but she's still so much bigger… it's making me incredibly horny. I've been stuffing myself constantly."`,
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos, breathing heavier while cradling her enormous gut. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." She squeezes thick handfuls. "I'm so close now… this is driving me wild. I've been forcing in bigger meals because I need to feel that helplessness too."`,
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos lustfully, struggling to lean forward with her colossal belly spread across her lap. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." Her body wobbles as she squeezes her fat. "I can almost taste being that stuck… it's so hot. I've been eating non-stop trying to get there."`,
    `"Aww, my sweet feedee bestie just became officially housebound," Kylie coos breathily from her reinforced bed, completely immobile as her hands sink into her vast blob belly. "She's gotten so incredibly, deliciously obese that going outside isn't even possible anymore." Everything quivers as she smiles. "She finally caught up to me… and it still makes me so turned on. I've been packing in more because I want even bigger."`,
  ],
  // id 6 — Tiffany (sorority) — Dramatic & Inspired
  6:[
    `"Drama alert, my loves!" Kylie announces theatrically with energy, throwing her arms up so her heavy breasts and belly bounce. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." She leans in with a big smile, patting her gut. "She's like four times my size… it's got me all fired up. I've been eating bigger meals every day because I want that same story soon."`,
    `"Drama alert, my loves!" Kylie announces with flair, her body jiggling as she shifts. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." She grins dramatically. "She's still so much bigger than me… but I'm inspired. I've been pushing my limits with food trying to catch up."`,
    `"Drama alert, my loves!" Kylie announces, her very fat belly resting heavily as she gestures. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." She giggles, curves shaking. "I'm getting closer but she's way ahead… it's so motivating. I've been stuffing myself harder than ever."`,
    `"Drama alert, my loves!" Kylie announces warmly, breathing heavier in her reinforced chair. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." She gives her enormous belly a playful slap. "I'm so close now… this has me completely inspired. I've been forcing down extra calories daily."`,
    `"Drama alert, my loves!" Kylie announces excitedly, struggling to move her colossal body. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." Waves roll across her as she smiles. "I can almost taste that immobility… I'm right there with her soon. I've been eating like crazy."`,
    `"Drama alert, my loves!" Kylie announces breathily from her bed, immobile and quivering. "My collaborator has reached legendary status. She tried to leave and just… couldn't fit anymore." Her massive body jiggles. "She finally caught up to me… but I'm still inspired to go further. I've been packing it in non-stop."`,
  ],
  // id 14 — Sophie (sorority) — Flirty & Greedy
  14:[
    `"Guess what, my hungry little followers?" Kylie says with a flirty smirk, easily rubbing both hands down her heavy belly. "My collab partner is officially housebound now. She literally can't leave anymore." She lifts and drops her gut playfully. "She's like four times my size… it's making me so greedy. I've been eating like crazy hoping to get that huge someday."`,
    `"Guess what, my hungry little followers?" Kylie says flirtily, shifting her thicker body as she caresses her fat belly. "My collab partner is officially housebound now. She literally can't leave anymore." She smiles teasingly. "She's still way bigger than me… it's turning me on. I've been packing in extra calories trying to catch her."`,
    `"Guess what, my hungry little followers?" Kylie says with a greedy grin, her very fat belly heavy on her lap. "My collab partner is officially housebound now. She literally can't leave anymore." She gives it a happy pat. "I'm getting closer but she's still ahead… I want it so bad. I've been eating bigger meals every day."`,
    `"Guess what, my hungry little followers?" Kylie says flirtily, breathing heavier as she strokes her enormous gut. "My collab partner is officially housebound now. She literally can't leave anymore." She lifts and drops it with a smack. "I'm so close now… this greed is taking over. I've been stuffing myself constantly."`,
    `"Guess what, my hungry little followers?" Kylie says with excitement, struggling to lean in with her colossal apron belly. "My collab partner is officially housebound now. She literally can't leave anymore." She giggles, body wobbling. "I can almost taste being that helpless… I'm almost there. I've been eating non-stop."`,
    `"Guess what, my hungry little followers?" Kylie says breathily from her reinforced bed, completely immobile as her hands sink into her vast blob-like belly. "My collab partner is officially housebound now. She literally can't leave anymore." Everything quakes as she smiles. "She finally caught up to me… but my greed isn't done yet. I've been packing in more every day."`,
  ]
};

// Collab stream payoff text per stageIdx
export const COLLAB_PAYOFF_TEXT=[
  // stageIdx 0 — debut
  (kylieGain,partnerGain,partnerName)=>`${Math.round(kylieGain)} pounds for you and ${Math.round(partnerGain)} for ${partnerName}. You can feel the difference — the warmth of it, your belly a degree heavier, your clothes sitting differently than when the stream started. ${partnerName} is still touching her belly with the hands of someone taking inventory.

The debut collab. You wanted to start the way you meant to continue. You started well.`,
  // stageIdx 1
  (kylieGain,partnerGain,partnerName)=>`${Math.round(kylieGain)} pounds on you and ${Math.round(partnerGain)} on ${partnerName} and you can feel both gains as facts of the room: your belly warmer and heavier than it was an hour ago, ${partnerName} across from you with her hands on a belly that is undeniably fuller than when the camera went live. The format works because both of you grow. You both grew tonight.`,
  // stageIdx 2
  (kylieGain,partnerGain,partnerName)=>`${Math.round(kylieGain)} pounds on you and ${Math.round(partnerGain)} on ${partnerName} and the platform featured you for exactly this reason — for the specific warmth of two women eating together on camera, growing together, the gain real and visible and enormous. Your belly is warm and heavy and pressing your top forward and ${partnerName}'s is fuller across the table and you are both heavier than when you started and the chat is still going. This is the format. This is why it works.`,
  // stageIdx 3
  (kylieGain,partnerGain,partnerName)=>`${Math.round(kylieGain)} pounds added to you and ${Math.round(partnerGain)} to ${partnerName} and the brand's content team has this footage and they know what they funded. Your belly at 519 pounds plus ${Math.round(kylieGain)} more is an enormous warm presence against your top and ${partnerName}'s is heavier now, visibly heavier, the specific weight of having eaten that much in front of a camera and an audience who came specifically to see it. You are both heavier. You are both more than you were. That is the collab. That is what it is for.`,
  // stageIdx 4
  (kylieGain,partnerGain,partnerName)=>`One year of collabs and ${Math.round(kylieGain)} pounds on you and ${Math.round(partnerGain)} on ${partnerName} tonight specifically. At 630 pounds the gains land differently — you feel the added weight not in your clothes but in the room itself, in the way the corner is more yours than it was an hour ago, in the way ${partnerName} is sitting across from you with her hands flat on a belly that is an inch further forward than it was at stream start. This is what a year looks like. This is the math of it.`,
  // stageIdx 5
  (kylieGain,partnerGain,partnerName)=>`${Math.round(kylieGain)} pounds on you and ${Math.round(partnerGain)} on ${partnerName} and at 820 pounds those gains are a geological event — layers added to something already enormous, the forward press of your belly against the custom table a degree more permanent, ${partnerName} across from you in her own corner heavier and warmer and more than she was. Wren is in this room. She has watched since 258 pounds. She is watching right now, from somewhere in this building, and she is watching you both get bigger. There is more to build. There is always more.`,
];

// ══════════════════════════════════════════════════════════════════
// RECORDING SESSION — Activity 2 for feedee_creator (Devoted tier, professor POV)
// ══════════════════════════════════════════════════════════════════

// Perfect take combos per stageIdx: [angle, food, pace]
export const RECORDING_PERFECT_COMBOS = [
  ['angle_close','food_hers','pace_settle'],   // 0 — ~258 lbs
  ['angle_wide','food_build','pace_settle'],   // 1 — ~320 lbs
  ['angle_wide','food_heavy','pace_push'],     // 2 — ~419 lbs
  ['angle_wide','food_heavy','pace_push'],     // 3 — ~519 lbs
  ['angle_low','food_heavy','pace_surge'],     // 4 — ~630 lbs
  ['angle_wide','food_heavy','pace_surge'],    // 5 — ~820 lbs
];

// Lbs gained per food choice per take
export const RECORDING_FOOD_LBS = { food_heavy:[10,15], food_build:[6,10], food_hers:[7,12] };
// Pace modifier to lbs
export const RECORDING_PACE_LBS = { pace_push:4, pace_settle:1, pace_surge:5 };
// Quality bonus lbs
export const RECORDING_QUALITY_BONUS = { okay:0, good:1, great:2, perfect:6 };

export const RECORDING_OPENING_TEXT = [
  (lbs)=>`You step into Kylie's softly lit dorm room, the glow of ring lights casting a warm halo over her setup. At ${Math.round(lbs)} pounds, she's noticeably fat, heavy, and cute. Her belly starts to dominate her frame, hanging soft and warm over the waistband of her tight pink crop top. Her heavy breasts rest atop the upper curve of her gut, while her plush thighs spread wide as she adjusts the camera tripod. She turns to you with a bright, eager smile, her cheeks full and flushed. "Professor... I'm so ready for this." The air feels intimate, just the two of you. You pick up the camera, and she shifts into position on the bed, belly settling heavily between her spread thighs as she looks straight into the lens.`, // stage 0
  (lbs)=>`The room is quiet except for the low hum of the lights as you enter. At ${Math.round(lbs)} pounds, Kylie is clearly very fat. Her belly is heavy and forward, soft and jiggly, while her enormous breasts strain against her top, spilling over the top of her gut. Her thick, warm thighs press together, dimpling with fat. She glances up at you lovingly, already flushed with anticipation. "I love when it's just us like this." You feel the complete trust in her eyes. You lift the camera, and she repositions herself, her heavy belly spilling forward as she gets comfortable for the shot.`, // stage 1
  (lbs)=>`Kylie's room feels smaller with her size now. At ${Math.round(lbs)} pounds, she's very fat. Her belly is large and prominent, swaying and folding as she sets up pillows. Her breasts are huge and heavy, resting on the upper shelf of her gut, while her thighs have thickened into soft, warm pillars. She smiles warmly when she sees you. "This is my favorite part... just you directing me." The intimacy is thick in the air. You take the camera in hand, and she eases back onto the bed, her massive belly spreading heavily across her lap.`, // stage 2
  (lbs)=>`You find Kylie at ${Math.round(lbs)} pounds. She is enormous. Her belly hangs low between her spread thighs with no lap left to speak of. Her breasts are massive, resting heavily atop the great dome of her gut. Every movement is slow and heavy, fat rippling softly. She looks up at you with deep, devoted affection. "I'm so full already... but I want more for you." The quiet of the room wraps around you both. You pick up the camera, and she settles into position, her immense body shifting with warm, heavy grace.`, // stage 3
  (lbs)=>`At ${Math.round(lbs)} pounds, Kylie is colossal. She remains in bed as you enter, her vast belly a landscape of soft, warm fat spreading outward and resting between her thick thighs. Her enormous breasts drape heavily over the top of her gut, nipples visible through stretched fabric. She breathes deeply, eyes lighting up with love as she sees you. "I barely moved today... waiting for you." The intimacy is profound. You lift the camera, and she adjusts what little she can, her body quivering softly.`, // stage 4
  (lbs)=>`Kylie has become an ${Math.round(lbs)}-pound blob. She is fully immobile. Everything is geography. Her breasts are gigantic, resting like heavy pillows atop the immense, sprawling belly that covers her lower body completely. Thick rolls cascade everywhere, warm and yielding. She smiles dreamily when you approach. "I'm all yours, Professor. Film every inch." The air is thick with devotion and sensuality. You take the camera, positioning it perfectly over her enormous, quivering form.`, // stage 5
];

export const RECORDING_TAKE_INTRO_TEXT = [
  (lbs)=>`The camera is rolling. Kylie sits before you at ${Math.round(lbs)} pounds. She is noticeably fat, heavy, and cute. Her soft belly rests heavily on her thick thighs, breasts full and spilling over. She looks into the lens with hungry eyes, ready to eat for you.`, // stage 0
  (lbs)=>`Recording now. At ${Math.round(lbs)} pounds, Kylie is clearly very fat. Her heavy belly dominates the frame, warm and jiggly as it presses forward between her plush thighs. Her breasts heave with each breath.`, // stage 1
  (lbs)=>`The take begins. At ${Math.round(lbs)} pounds, Kylie is very fat. Her large and prominent belly sags warmly, breasts resting heavily on top as her thick thighs spread wide.`, // stage 2
  (lbs)=>`Camera rolling. At ${Math.round(lbs)} pounds, Kylie is enormous. Her belly fills the space between her thighs completely, soft fat spilling everywhere, breasts massive and heavy.`, // stage 3
  (lbs)=>`She's ready. At ${Math.round(lbs)} pounds, Kylie is colossal. Her vast belly dominates her body, warm rolls cascading as her enormous breasts drape across it.`, // stage 4
  (lbs)=>`The shot is live. At ${Math.round(lbs)} pounds, Kylie is a blob. She is fully immobile. Her body is a vast, soft, warm landscape of fat—breasts and belly merging together.`, // stage 5
];

export const RECORDING_DIRECTION_POPUPS = {
  angle_low: [
    (lbs)=>`You drop the camera low to the floor, aiming upward. From below, Kylie's ${Math.round(lbs)}-pound belly hangs heavy and round, soft fat spilling forward over her waistband while her thick thighs frame the shot. Her heavy breasts rest on the upper curve of her gut, jiggling gently as she eats. She looks powerful and deliciously fat from this worshipful angle.`, // stage 0
    (lbs)=>`Low angle captures her perfectly. At ${Math.round(lbs)} pounds her heavy belly dominates the frame from below, warm and pendulous, swaying with each bite. Her plush thighs spread wide on either side while her breasts heave softly above. The view emphasizes just how very fat and full she is for you.`, // stage 1
    (lbs)=>`You angle the camera low. At ${Math.round(lbs)} pounds, Kylie's large prominent belly fills the upward shot, hanging heavily between her thick thighs. Soft rolls shift and settle as she chews. Her enormous breasts cast gentle shadows across the top of her gut. She looks gloriously very fat.`, // stage 2
    (lbs)=>`Floor-level shot. At ${Math.round(lbs)} pounds Kylie is enormous—her massive belly completely fills the space between her thighs, soft and heavy, pressing down toward the camera. Her breasts rest like heavy pillows on top as she eats with slow devotion.`, // stage 3
    (lbs)=>`You get extremely low. At ${Math.round(lbs)} pounds her colossal belly is a vast overhanging dome of warm fat, spreading outward and nearly touching the floor. Her thick thighs are pushed apart while her enormous breasts drape heavily above. The scale is breathtaking.`, // stage 4
    (lbs)=>`Low angle on your ${Math.round(lbs)}-pound blob. Her immense belly is an endless landscape of soft, quivering fat spilling outward in every direction, completely filling the frame from below. Everything about her is geography—warm, yielding, and utterly yours.`, // stage 5
  ],
  angle_wide: [
    (lbs)=>`You pull the camera back for a wide shot. At ${Math.round(lbs)} pounds Kylie fills a generous portion of the frame, her soft belly and thick thighs dominating the bed while the dorm room feels cozy around her. She looks noticeably fat, cute, and perfectly ready for you to grow.`, // stage 0
    (lbs)=>`Wide shot. At ${Math.round(lbs)} pounds Kylie looks clearly very fat, her heavy belly protruding forward as she sits. The room seems smaller around her thickening body, her wide hips and plush thighs claiming space. She eats with focused hunger for the camera and for you.`, // stage 1
    (lbs)=>`You zoom out. At ${Math.round(lbs)} pounds Kylie is very fat and imposing—her large belly and heavy breasts take center stage while she moves with deliberate care. The bed creaks softly beneath her spreading width, emphasizing her beautiful size.`, // stage 2
    (lbs)=>`Wide angle reveals everything. At ${Math.round(lbs)} pounds enormous Kylie occupies most of the bed, her belly resting heavily between her thighs with no lap left. The scale of her slow, heavy body makes the room feel intimate and full of her presence.`, // stage 3
    (lbs)=>`Full wide shot. Colossal at ${Math.round(lbs)} pounds, Kylie is near-immobile—her vast body spreads across the reinforced bed, belly dominating everything. She looks breathtakingly huge, a monument of soft warm fat created for your pleasure.`, // stage 4
    (lbs)=>`You pull way back. Your ${Math.round(lbs)}-pound blob fills the entire frame and more—her immense, immobile form is a sea of warm fat, breasts and belly merging into one enormous landscape. The room barely contains her anymore.`, // stage 5
  ],
  angle_close: [
    (lbs)=>`You move in close. Kylie's face fills the frame at ${Math.round(lbs)} pounds—cheeks full and flushed as she eats, eyes locked on the lens with devotion. Her heavy breasts rise and fall, soft belly pressing against the bottom edge of the shot with every breath.`, // stage 0
    (lbs)=>`Tight close-up. At ${Math.round(lbs)} pounds you watch her lips part around each bite, her expression one of pure sensual pleasure. Her enormous breasts heave warmly in the foreground while the upper curve of her heavy belly jiggles below.`, // stage 1
    (lbs)=>`Close on her upper body. At ${Math.round(lbs)} pounds her face shows deepening bliss as she chews, breasts resting heavily on her large prominent belly. You catch every soft ripple of fat as she swallows for you.`, // stage 2
    (lbs)=>`Intimate close shot. Enormous at ${Math.round(lbs)} pounds, Kylie's cheeks are round and full while she eats slowly. Her massive breasts dominate the top of the frame, resting on the great dome of her belly that fills everything below.`, // stage 3
    (lbs)=>`Extreme close-up. At ${Math.round(lbs)} pounds colossal Kylie breathes heavily between bites, her enormous breasts spilling across her vast gut. Every quiver of soft fat is visible as she devotes herself completely to the feeding.`, // stage 4
    (lbs)=>`You stay close on her face and chest. Your ${Math.round(lbs)}-pound blob's expression is dreamy and adoring as she eats whatever you bring. Her gigantic breasts and the endless upper rolls of her belly create a warm, quivering world just for you.`, // stage 5
  ],
  food_heavy: [
    (lbs)=>`You hand her the heavy, dense food. At ${Math.round(lbs)} pounds Kylie takes it with both hands, her soft belly pressing forward as she lifts it to her mouth. She moans softly around the first big bite, warm fat jiggling as her gut begins to fill.`, // stage 0
    (lbs)=>`Heavy food in both hands. At ${Math.round(lbs)} pounds her very fat belly rests heavily on her thighs while she eats the calorie-dense meal. You watch her throat work as the weight settles deep into her already massive gut.`, // stage 1
    (lbs)=>`You give her the heaviest option. At ${Math.round(lbs)} pounds Kylie grips it firmly, her large prominent belly sagging warmly as she devours it. Each swallow makes her thick middle swell and press harder between her thighs.`, // stage 2
    (lbs)=>`Heavy food for enormous Kylie. At ${Math.round(lbs)} pounds she uses both hands to bring it to her mouth, slow and deliberate. Her belly—already filling the space between her thighs—grows visibly tighter and rounder with every bite.`, // stage 3
    (lbs)=>`Colossal at ${Math.round(lbs)} pounds, she barely lifts the heavy tray. Her vast belly quivers as she eats, warm rolls deepening while her enormous breasts rise and fall with satisfied breaths.`, // stage 4
    (lbs)=>`You bring the heaviest food to your immobile ${Math.round(lbs)}-pound blob. She opens wide, eyes half-lidded in pleasure as she eats. New layers of soft fat ripple across her endless belly with every heavy swallow.`, // stage 5
  ],
  food_build: [
    (lbs)=>`You start her light then build bigger. At ${Math.round(lbs)} pounds Kylie enjoys the progression, her noticeably fat belly gradually rounding out as the portions grow heavier. She smiles at you between bites, clearly loving the paced indulgence.`, // stage 0
    (lbs)=>`Light to heavy progression. At ${Math.round(lbs)} pounds her very fat body responds beautifully—her heavy belly swells progressively fuller, warm and soft as the calories stack. Her thick thighs spread wider to accommodate the growing load.`, // stage 1
    (lbs)=>`You build the meal step by step. At ${Math.round(lbs)} pounds Kylie's large belly fills out noticeably with each escalation, soft fat pressing harder into her lap as she eats with steady, devoted hunger.`, // stage 2
    (lbs)=>`Progressive feeding on enormous Kylie. At ${Math.round(lbs)} pounds her belly—already between her thighs—grows rounder and heavier with every larger course, rolls softening as she sinks deeper into bliss.`, // stage 3
    (lbs)=>`You build it up slowly for colossal Kylie. At ${Math.round(lbs)} pounds each bigger portion makes her vast belly spread further, warm fat cascading as her near-immobile body accepts more for you.`, // stage 4
    (lbs)=>`Light to massive portions for your ${Math.round(lbs)}-pound blob. Every escalation disappears into her endless softness, deepening the warm geography of her belly and breasts as she lies there, utterly devoted.`, // stage 5
  ],
  food_hers: [
    (lbs)=>`You let her choose. At ${Math.round(lbs)} pounds Kylie eagerly reaches for the richest, creamiest option, her soft belly jiggling as she brings it to her mouth. Choosing her own food shows how much she craves this for you.`, // stage 0
    (lbs)=>`She picks for herself. At ${Math.round(lbs)} pounds Kylie selects the heaviest, densest food, eyes shining with devotion. Her very fat belly rests heavily on her thighs as she devours her choice with sensual focus.`, // stage 1
    (lbs)=>`Kylie chooses what she wants. At ${Math.round(lbs)} pounds she goes straight for the most filling items, her large prominent belly swelling as she eats. The fact that she's selecting her own growth makes it even more intimate.`, // stage 2
    (lbs)=>`You let enormous Kylie decide. At ${Math.round(lbs)} pounds she slowly reaches for the richest food, her massive belly shifting between her thighs. Her choices reflect total surrender to the feedee path.`, // stage 3
    (lbs)=>`Colossal at ${Math.round(lbs)} pounds, she weakly points to what she desires most. You bring it to her, watching her vast body accept the calories, every roll quivering with warm satisfaction.`, // stage 4
    (lbs)=>`Your ${Math.round(lbs)}-pound blob chooses with a soft whisper. You feed her exactly what she wants, watching it disappear into her immense, immobile form—proof of how completely she has given herself to you.`, // stage 5
  ],
  pace_push: [
    (lbs)=>`You push her firmly — more, faster, don't stop. At ${Math.round(lbs)} pounds Kylie obeys with flushed cheeks, eating rapidly as her noticeably fat belly jiggles and swells quicker with each swallow. Her heavy breasts bounce rhythmically while her plush thighs quiver from the effort. She moans around the food, eyes locked on you with eager devotion.`, // stage 0
    (lbs)=>`You command a relentless pace. At ${Math.round(lbs)} pounds her very fat belly grows visibly tighter and rounder, heavy rolls pressing forward as she keeps eating without pause. Warm fat shifts fast between her thick thighs while she breathes harder, surrendering to your direction.`, // stage 1
    (lbs)=>`Pushing the tempo hard. At ${Math.round(lbs)} pounds Kylie eats with focused speed, her large prominent belly surging outward and sagging heavier into her lap. Her enormous breasts rise and fall quickly as soft fat ripples across her thickening body.`, // stage 2
    (lbs)=>`You urge enormous Kylie onward without pause. At ${Math.round(lbs)} pounds her massive belly — already filling the space between her thighs — bloats rounder and tighter with every forced bite, deep rolls quivering as her slow body strains beautifully for you.`, // stage 3
    (lbs)=>`Relentless pace on colossal Kylie. At ${Math.round(lbs)} pounds she eats as fast as her near-immobile form allows, her vast overhanging belly expanding with warm new fat. Her enormous breasts heave heavily while the rest of her trembles softly under the pressure.`, // stage 4
    (lbs)=>`You push your ${Math.round(lbs)}-pound blob without mercy. Even fully immobile, her endless soft belly ripples and deepens dramatically as she swallows everything. New layers of warm yielding fat spread across her geography while her adoring eyes stay on you.`, // stage 5
  ],
  pace_settle: [
    (lbs)=>`You let Kylie set her own rhythm. At ${Math.round(lbs)} pounds she eats slowly and sensually, savoring every bite as her noticeably fat belly gradually rounds out with warm, soft fullness. Her heavy breasts rest gently atop her gut while she moans quietly, lost in the intimate pleasure.`, // stage 0
    (lbs)=>`You allow her own pace. At ${Math.round(lbs)} pounds Kylie feeds herself deliberately, her very fat heavy belly swelling softly between thick warm thighs. She takes her time, eyes half-lidded in bliss, letting each swallow settle deep as the sensuality builds naturally.`, // stage 1
    (lbs)=>`Kylie controls the tempo. At ${Math.round(lbs)} pounds she eats with slow, deliberate enjoyment, her large prominent belly sagging heavier and softer with every unhurried bite. Her enormous breasts rise gently while thick thighs spread wider in relaxed indulgence.`, // stage 2
    (lbs)=>`You let enormous Kylie find her rhythm. At ${Math.round(lbs)} pounds she eats with heavy, luxurious slowness, her massive belly filling the space between her thighs as it grows rounder and deeper. Every movement is warm, sensual, and completely hers.`, // stage 3
    (lbs)=>`Colossal Kylie sets the pace. At ${Math.round(lbs)} pounds she eats in long, lazy motions, her vast belly quivering and spreading outward with warm new fat. Her enormous breasts drape heavily as she sinks deeper into devoted, unhurried pleasure.`, // stage 4
    (lbs)=>`Your ${Math.round(lbs)}-pound blob eats at her own slow rhythm. You watch as calories disappear into her immense, immobile form — endless rolls of soft warm fat deepening gradually. Her dreamy expression shows pure, surrendered contentment.`, // stage 5
  ],
  pace_surge: [
    (lbs)=>`You direct a long pause, letting the fullness settle. At ${Math.round(lbs)} pounds Kylie's noticeably fat belly looks round and tight as she breathes deeply. Then you surge her forward — she eats faster, her soft gut jiggling heavily while her heavy breasts bounce with renewed energy.`, // stage 0
    (lbs)=>`Pause to let it land, then surge. At ${Math.round(lbs)} pounds her very fat belly hangs full and heavy between her thighs during the break. When you push again she devours more, warm rolls swelling visibly as fresh calories stack on top of the existing load.`, // stage 1
    (lbs)=>`You hold her in a deep pause. At ${Math.round(lbs)} pounds Kylie's large prominent belly sits swollen and warm. Then the final surge hits — she eats urgently, her belly pressing harder into her lap while thick thighs tremble softly.`, // stage 2
    (lbs)=>`Pause on enormous Kylie. At ${Math.round(lbs)} pounds her massive belly rests heavily between her thighs, visibly distended. After the fullness sinks in you command the surge — she eats slower but greedily, rolls deepening as her body accepts even more.`, // stage 3
    (lbs)=>`You let colossal Kylie feel the weight, pausing as her vast belly strains. Then the final push — she takes more, her near-immobile body quivering while enormous breasts heave and her immense gut spreads wider with warm fat.`, // stage 4
    (lbs)=>`Long pause on your ${Math.round(lbs)}-pound blob as her endless belly settles. Then the surge — even immobile she opens for more, new layers of soft warm fat rippling across her geography as the final calories disappear into her devoted mass.`, // stage 5
  ],
};

export const RECORDING_TAKE_RESULT = {
  okay: [
    (lbs)=>`You review the take on the monitor. It's okay — serviceable footage of Kylie at ${Math.round(lbs)} pounds eating for the camera. Her noticeably fat belly jiggles softly as she swallows, heavy breasts resting on top, but the energy feels a little flat. The lighting is fine and she looks cute, yet nothing truly sparkles. Usable, but not memorable.`, // stage 0
    (lbs)=>`The take plays back. It's okay. At ${Math.round(lbs)} pounds Kylie is clearly very fat, her heavy belly pressing forward between thick thighs as she eats. The footage captures her size well enough, but the sensuality doesn't quite hit. Solid documentation of her growing body, nothing more.`, // stage 1
    (lbs)=>`Reviewing now. It's decent but nothing special. At ${Math.round(lbs)} pounds her large prominent belly sags warmly while she chews. The deliberate movements are there, yet the magic didn't ignite. Good enough for content, though you know she can do better.`, // stage 2
    (lbs)=>`You watch the take. It's okay. Enormous at ${Math.round(lbs)} pounds, Kylie's massive belly fills the space between her thighs completely. She eats slowly, but the shot lacks that deeper intimacy. The scale is impressive, still only serviceable overall.`, // stage 3
    (lbs)=>`The footage is acceptable. Colossal Kylie at ${Math.round(lbs)} pounds barely moves as she eats, her vast belly a landscape of soft fat. The clip shows her immense size clearly, but the emotional connection feels muted. Functional for her feedee channel.`, // stage 4
    (lbs)=>`Review complete. It's okay footage of your ${Math.round(lbs)}-pound immobile blob. Her endless soft belly and gigantic breasts dominate the frame as she eats what you bring her. The geography is there, but the take doesn't capture the full depth of her devotion.`, // stage 5
  ],
  good: [
    (lbs)=>`You smile at the monitor. This take is genuinely good. At ${Math.round(lbs)} pounds the light catches the soft jiggle of Kylie's noticeably fat belly perfectly as she eats with eager hunger. Her heavy breasts rise and fall warmly, and her flushed cheeks show real pleasure. A strong, sensual clip.`, // stage 0
    (lbs)=>`This one is good. At ${Math.round(lbs)} pounds Kylie's very fat belly looks especially heavy and inviting on camera, warm rolls shifting as she devours each bite. The way her thick thighs spread wider makes the growth feel intimate and real.`, // stage 1
    (lbs)=>`A good take. At ${Math.round(lbs)} pounds the deliberate way Kylie feeds her large prominent belly translates beautifully. You catch the exact moment her enormous breasts settle heavier onto her swelling gut. Sensual and focused.`, // stage 2
    (lbs)=>`You nod in approval. Great footage of enormous Kylie at ${Math.round(lbs)} pounds. Her belly completely fills the space between her thighs, soft fat rippling slowly with every bite. The slow, heavy sensuality comes through powerfully.`, // stage 3
    (lbs)=>`Solid good take. Colossal at ${Math.round(lbs)} pounds, Kylie's vast overhanging belly quivers warmly as she eats. The near-immobility makes every small movement of fat feel deliberate and erotic on screen.`, // stage 4
    (lbs)=>`This take is good. Your ${Math.round(lbs)}-pound blob lies there as an endless sea of warm fat. The way new calories disappear into her immense belly and breasts creates a deeply satisfying, hypnotic visual.`, // stage 5
  ],
  great: [
    (lbs)=>`The take is great — something special clicked. At ${Math.round(lbs)} pounds Kylie looks radiantly fat and devoted, her soft belly swelling beautifully while she maintains eye contact with the lens. The warmth of her heavy breasts and the genuine pleasure in her expression make it magnetic.`, // stage 0
    (lbs)=>`This take is genuinely great. At ${Math.round(lbs)} pounds the heavy forward hang of Kylie's very fat belly is captured perfectly, warm and jiggly as it presses between her plush thighs. Every swallow feels sensual and intentional.`, // stage 1
    (lbs)=>`You rewatch it twice — it's great. At ${Math.round(lbs)} pounds Kylie's large prominent belly dominates the frame with delicious softness while her thick thighs spread to accommodate the growth. The lighting, her expression, and the way her breasts rest on top all align beautifully.`, // stage 2
    (lbs)=>`An excellent take. Enormous Kylie at ${Math.round(lbs)} pounds moves with slow, heavy grace. Her belly — with no lap left — swells visibly between her thighs as she eats. The sheer scale combined with her devoted eyes creates something truly powerful.`, // stage 3
    (lbs)=>`This one is great. Colossal at ${Math.round(lbs)} pounds, Kylie's vast body is a monument of soft warm fat. You catch the perfect ripple across her enormous breasts and belly as she accepts more calories. The intimacy is breathtaking.`, // stage 4
    (lbs)=>`The take is great — rare and beautiful. Your ${Math.round(lbs)}-pound blob is pure geography of yielding fat. The way her endless belly and breasts quiver as she eats slowly for you feels deeply intimate and profoundly erotic.`, // stage 5
  ],
};

export const RECORDING_PERFECT_TAKE = [
  (lbs)=>`Everything aligned in this perfect take. Through the camera you watch ${Math.round(lbs)}-pound Kylie glow with genuine pleasure, her noticeably fat belly swelling beautifully round and soft while her heavy breasts rise and fall in rhythm with each devoted bite. The light catches every jiggle, every warm ripple of her body. This wasn't just eating — it was pure intimate surrender. A moment you'll remember for its warmth and authenticity.`, // stage 0
  (lbs)=>`This take was perfect. At ${Math.round(lbs)} pounds Kylie's very fat body moved with sensual grace, her heavy belly pressing forward between plush thighs as it filled out slowly and deliberately. The way her eyes stayed on the lens, full of trust and hunger, made the footage feel alive and deeply erotic. You captured something real and beautiful.`, // stage 1
  (lbs)=>`A truly perfect take. At ${Math.round(lbs)} pounds Kylie's large prominent belly dominated the frame with delicious heaviness, soft fat cascading warmly as she ate. Her enormous breasts rested heavily atop it while her deliberate movements spoke of complete devotion. The pacing, the light, her expression — everything came together into something special.`, // stage 2
  (lbs)=>`Perfect in every way. Enormous Kylie at ${Math.round(lbs)} pounds became a vision of slow, heavy sensuality. Her massive belly filled the entire space between her thighs, swelling deeper and softer with every bite. The quiet intimacy between you, the visible growth, and her adoring eyes created a clip that felt transcendent.`, // stage 3
  (lbs)=>`This was perfection. Colossal at ${Math.round(lbs)} pounds, Kylie's vast body was a landscape of warm yielding fat. You watched her enormous breasts drape across her immense belly as it spread and quivered with new weight. The near-immobility only heightened the erotic power of the moment. A rare, unforgettable recording.`, // stage 4
  (lbs)=>`Absolutely perfect. Your ${Math.round(lbs)}-pound blob lay there as pure geography of soft, warm devotion. Through the camera you witnessed her endless belly and gigantic breasts deepen with every slow swallow, new rolls forming in real time. The quiet room, her dreamy eyes, and the sheer scale of her surrender created something profoundly intimate and beautiful — a moment of true connection.`, // stage 5
];

export const RECORDING_ONE_MORE_TAKE = [
  (lbs)=>`You tell her you want one more take. Kylie beams, her cheeks flushed. "Yes, Professor. I'll eat even more for you this time." She shifts eagerly, belly jiggling.`, // stage 0
  (lbs)=>`You ask for another. "Mmm, good. I'm getting so full but I love it," she says warmly, rubbing her heavy belly with devotion.`, // stage 1
  (lbs)=>`One more take. Kylie breathes deeply, her massive body shifting. "I'll keep going as long as you want me to... I trust you completely."`, // stage 2
  (lbs)=>`You want another. She smiles slowly, heavy and content. "I'm so huge for you already... but yes. Feed your enormous girl more."`, // stage 3
  (lbs)=>`You request one more. Kylie murmurs warmly, barely able to move. "Anything for you, Professor. My body is yours to grow."`, // stage 4
  (lbs)=>`You tell her one more take. Her voice is soft and adoring. "I'm not going anywhere... fill me up even more. I love being your blob."`, // stage 5
];

export const RECORDING_WRAP_ENDINGS = {
  good: [
    (lbs)=>`You wrap the session with a good solid clip. Kylie at ${Math.round(lbs)} pounds looks noticeably fatter than when you arrived — her belly sits softer and lower, the fresh weight making her crop top ride up while her heavy breasts feel fuller. She smiles at you sleepily, pleased with the work. The room smells of food and warm skin as you set the camera down.`, // stage 0
    (lbs)=>`Session wrapped with good footage. At ${Math.round(lbs)} pounds Kylie is visibly heavier now, her very fat belly hanging rounder and warmer between her thick thighs. She breathes contentedly, clearly satisfied. You can see the new softness in her hips and the way her body claims even more space.`, // stage 1
    (lbs)=>`You end on a good note. Kylie's ${Math.round(lbs)}-pound body shows the fresh gain — her large prominent belly sags heavier, filling her lap completely. Her enormous breasts rest more heavily on top. She looks at you with warm devotion as you prepare to leave.`, // stage 2
    (lbs)=>`Good clip secured. Enormous Kylie at ${Math.round(lbs)} pounds has grown even more immense. Her belly presses heavily between her thighs with no lap remaining, rolls deeper and softer. She looks beautifully full and content as you finish up.`, // stage 3
    (lbs)=>`The session ends well. Colossal at ${Math.round(lbs)} pounds, Kylie's vast belly has spread wider and heavier during the feeding. Her enormous breasts drape more fully across the dome of fat. She murmurs her thanks, warm and near-immobile.`, // stage 4
    (lbs)=>`You wrap with good footage. Your ${Math.round(lbs)}-pound blob looks even softer and more immense, new layers of warm fat deepening every roll. She lies there happily, a geography of devotion, as you turn off the lights.`, // stage 5
  ],
  great: [
    (lbs)=>`You finish the session with a great clip. Kylie looks beautifully heavier than when you started at ${Math.round(lbs)} pounds — her noticeably fat belly now softer and rounder, warm fat spilling generously. Her heavy breasts sit fuller on top. She glows with satisfaction, completely devoted to you and the process.`, // stage 0
    (lbs)=>`A great session. At ${Math.round(lbs)} pounds Kylie's very fat body has visibly plumped up. Her heavy belly hangs lower and more inviting between plush thighs, the fresh gain making her look even more sensual. She thanks you softly, eyes full of love.`, // stage 1
    (lbs)=>`You end on a great take. Kylie's ${Math.round(lbs)}-pound frame shows delicious new weight — her large belly sagging softer and heavier, breasts resting more heavily atop it. The room feels warmer with her presence as she smiles at you contentedly.`, // stage 2
    (lbs)=>`Great footage captured. Enormous at ${Math.round(lbs)} pounds, Kylie's belly now fills the space between her thighs even more completely, deep soft rolls cascading. She looks radiantly full and satisfied as you prepare to leave.`, // stage 3
    (lbs)=>`The session was great. Colossal Kylie at ${Math.round(lbs)} pounds has grown vaster still — her immense belly spreading wider with warm new fat, enormous breasts draping heavily. She breathes deeply, blissful and yours.`, // stage 4
    (lbs)=>`You wrap an excellent session. Your ${Math.round(lbs)}-pound blob is even softer and more magnificent. Fresh layers of yielding fat have deepened her endless curves. She whispers her devotion as the room settles into quiet intimacy.`, // stage 5
  ],
  perfect: [
    (lbs)=>`The perfect take. You linger before leaving, watching Kylie at ${Math.round(lbs)} pounds. She is noticeably fatter now, her soft warm belly hanging lower and rounder, heavy breasts fuller and more inviting. The room feels charged with intimacy. This clip captured something real — her complete surrender to the feed. She looks at you with pure adoration.`, // stage 0
    (lbs)=>`A perfect session. At ${Math.round(lbs)} pounds Kylie has grown even more beautifully very fat. Her heavy belly now presses forward with new weight, warm and jiggly between thick thighs. The footage is pure sensuality. She knows it landed, glowing with shared satisfaction as you both savor the moment.`, // stage 1
    (lbs)=>`Perfect. Kylie's ${Math.round(lbs)}-pound body feels transformed — her large prominent belly sags heavily and softly, filling her lap while her enormous breasts rest like warm pillows on top. The clip captured the exact essence of her devotion. The air is thick with contentment.`, // stage 2
    (lbs)=>`Truly perfect footage. Enormous Kylie at ${Math.round(lbs)} pounds looks breathtaking. Her massive belly completely dominates the space between her thighs, deeper rolls of warm fat shifting with every breath. This take is art. She smiles slowly, deeply fulfilled by what you created together.`, // stage 3
    (lbs)=>`The session was perfect. Colossal at ${Math.round(lbs)} pounds, Kylie's vast body has become even more immense — her belly a sprawling landscape of soft warm fat, enormous breasts resting heavily across it. The clip is something rare and beautiful. She lies there in blissful surrender.`, // stage 4
    (lbs)=>`Absolute perfection. Your ${Math.round(lbs)}-pound blob has grown softer and more magnificent during the feeding. New layers of yielding, warm fat have deepened every curve and roll until her body is pure geography. The footage captured something transcendent. In the quiet room, her devoted eyes say everything.`, // stage 5
  ],
};

export const RECORDING_PAYOFF_TEXT = [
  (lbs)=>`Session over. Kylie looks noticeably heavier than when you started—her belly now sits even softer and lower on her thighs, the fresh pounds making her crop top ride up higher. Her breasts feel fuller, heavier. You can see the new roundness in her cheeks and the way her hips have widened. She glows with satisfaction, completely devoted.`, // stage 0
  (lbs)=>`The recording ends. Kylie is visibly fatter now. Her belly hangs heavier and rounder, warm fat spilling more generously between her thick thighs. Her top strains tighter across her enormous breasts. The fresh gain looks incredible on her.`, // stage 1
  (lbs)=>`You stop recording. Kylie's belly sags lower and softer, filling her lap completely. Her breasts rest heavier on the upper curve, and her thighs press together with new warmth and thickness.`, // stage 2
  (lbs)=>`Filming complete. Kylie's belly is now impossibly heavy between her thighs, rolls deeper and softer. Her breasts drape more heavily across the top. Every inch of her shows the beautiful results.`, // stage 3
  (lbs)=>`The session finishes. Kylie's body has grown even vaster—her belly spreading wider and heavier, breasts larger and resting fully on the great dome of fat. She looks breathtakingly immense.`, // stage 4
  (lbs)=>`Recording done. Your blob is even softer and more immense. New layers of warm fat have deepened every roll, her breasts and belly merging into an even greater, quivering landscape of devotion.`, // stage 5
];

export const MJ_RECIPES = {
  sweet_potato_pie: { name:"Sweet Potato Pie", emoji:"🥧", lbs:18, fullness:22 },
  biscuits_gravy:   { name:"Biscuits & Gravy",  emoji:"🍳", lbs:14, fullness:18 },
  peach_cobbler:    { name:"Peach Cobbler",      emoji:"🍑", lbs:16, fullness:20 },
  cornbread_butter: { name:"Buttered Cornbread", emoji:"🌽", lbs:12, fullness:15 },
  pound_cake:       { name:"Pound Cake",         emoji:"🎂", lbs:20, fullness:25 },
  cream_gravy:      { name:"Cream Gravy Plate",  emoji:"🥣", lbs:22, fullness:28 },
};

