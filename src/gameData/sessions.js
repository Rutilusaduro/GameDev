import { getStage } from './stages.js';

export const WAITER_DESC = {
  bistro:        (s)=>`A young woman in a bistro apron comes over. She's softly built — the kind of figure that comes from working around good food every day. She smiles warmly at ${s.name}. "Ready for more?"`,
  italian:       (s)=>`A warm, round woman bustles over — full-figured in the way of someone who grew up cooking. She refills the bread basket without being asked and beams at ${s.name}. "More? Of course more."`,
  steakhouse:    (s)=>`A broad, solid woman in a leather apron approaches. She's substantial, clearly someone who eats well on shift and often. She surveys the cleared plates with professional approval. "Ready for the next round?"`,
  french:        (s)=>`The sommelier — a heavyset woman in a crisp blazer — drifts over. Her figure suggests someone who takes research very seriously. She refills the wine without comment. "Another course?"`,
  japanese:      (s)=>`A quietly round woman in formal dark attire appears. She replaces the chopsticks, replenishes the water, and waits. She says nothing. ${s.name} reaches for the fresh menu.`,
  private_club:  (s)=>`A large woman in club livery appears, moving with the unhurried ease of someone extremely comfortable in their body. She sets down a new menu card without being asked. "The kitchen is ready whenever you are."`,
  chefs_table:   (s)=>`The floor manager — an immensely soft woman in tailored black — materializes beside the table. The kind of person who samples everything, constantly. "Shall I tell the kitchen to continue?" There's no other answer.`,
  home_dinner:   (s)=>`You head back to the kitchen to bring out the next course.`,
  brunch_hall:   (s)=>`A cheerfully plump woman in a floral apron refills both coffees and sets down a fresh card. She looks at ${s.name} approvingly. "There's plenty more where that came from."`,
  atelier:       (s)=>`The maître d' — a truly enormous woman in impeccable black, who navigates the dining room with the serene authority of someone who has never once heard 'no' — arrives at your table. She does not ask what you want. She tells the kitchen. ${s.name} sits up slightly straighter.`,
};

// ── DINNER ENDING NARRATIVES ──────────────────────────────────
// [stageGroup 0-3][fullnessGroup 0-3]: (s) => ~150-word string
export const DINNER_ENDING_TEXT = [
  // Stage 0-2 (slim / gaining)
  [
    (s)=>`The bill arrives while ${s.name} is still looking at the dessert menu. She sets it down with something like regret — "I'm actually full," she says, which sounds surprised even as she says it. She sits back, one hand resting on her stomach, a new gesture she doesn't seem entirely aware of. The evening light is good on her. She's happy. She talks for another fifteen minutes about the meal in a way that suggests she's already thinking about coming back. On the walk out she floats the idea of dessert somewhere else, then doesn't follow through. She goes home and texts you later: she fell asleep immediately, the portions were exactly right. You think about the soft line of her hand on her belly and the uncomplicated look on her face, and it seems like a very good place to leave things.`,
    (s)=>`The moment of reckoning arrives mid-dessert: ${s.name} sets her spoon down, looks at what's left, and picks the spoon back up. She finishes it. She is quiet for a moment after, doing a kind of internal accounting that arrives at a number she hadn't expected. "I ate," she says eventually, "a lot." This appears to surprise her. She sits in the booth a little longer than necessary, in the comfortable way of someone who is not entirely sure they can stand yet. When she does stand, she straightens carefully, tucks her shirt — it had come untucked at some point, she hadn't noticed — and looks genuinely pleased with herself. She tells you the pasta was worth it, and she means the entire evening. She texts on the way home to say she's very full, as if this were news she needed to deliver.`,
    (s)=>`She goes quiet around the second-to-last dish — not unhappily, more the quiet of someone redirecting all resources inward. She finishes it anyway. Then the last dish. She puts her hands flat on the table and breathes for a moment, looking at the empty plates with an expression between pride and mild alarm. "I need to not move for a minute," she says, and she doesn't, for more than a minute. The waiter comes and goes. When she finally gathers herself to leave, she moves with the careful precision of someone managing something fragile, which is herself. Outside she adjusts — jacket, bag, sense of self — and takes a slow breath. She texts from the taxi: she would absolutely do this again and she doesn't know what that says about her. She sounds completely delighted.`,
    (s)=>`She couldn't stop. Each dish arrived and she ate it, and when the next one came she looked at it and ate that too, because the food was excellent and the evening was good and she had lost the ability to choose otherwise. She is very full. Comprehensively. She sits for a long time after the last plate, arms on the table, head tipped back slightly, eyes closed, breathing slowly. "I need you to know," she says eventually, "that I don't regret any of it." This is clearly true. She goes home still full, and texts in the morning that the pasta was worth every bite and can you book again next week. She sounds completely serious. You think she probably ate something on the way home and doesn't mention it. This seems right.`,
  ],
  // Stage 3-5 (plump / heavy)
  [
    (s)=>`${s.name} leans back with the easy satisfaction of someone who has calibrated herself to this. The plates are cleared. She is full in the uncomplicated way of a person who knows how to be full — not surprised by it, not fighting it, just settled into it. She has a second glass of something. She talks about the meal with the detail of someone who paid close attention to every dish, which she was. At some point recently she stopped noticing when she was full and started noticing only when the food was gone. Tonight they coincide. She looks satisfied in a way that extends beyond dinner, as if the whole arrangement of her life is working out correctly. The check arrives. She waves at the empty plates with something like affection.`,
    (s)=>`There's a moment where ${s.name} pauses, registers something, and continues eating. That's the whole story. The pause is the tell — her body filing a report — and the continuing is the answer: noted, irrelevant. She is full in a way that has weight to it, literally. She settles deeper into her chair at some point during the final course and doesn't come back up to her original height, the way a person sinks when they stop holding themselves in place. When the bill arrives she doesn't look at it, just taps her card and waves the waiter away with the benevolent authority of someone who has nothing left to give attention to. The walk out is slower than the walk in. She notices this and doesn't mention it. Outside she breathes deeply, looks pleased. "Good choice," she says.`,
    (s)=>`She orders the last dish the way someone presses a button they know they shouldn't — with awareness, with intention, with no hesitation whatsoever. She is already full when it arrives. She is fuller when it's gone. The restaurant has gone quiet around your table in the comfortable way of a place beginning to close, and she's still sitting, because she has no intention of moving yet, and also because standing would require a coordination she's not currently confident about. She puts both palms flat on her stomach, not embarrassed, just aware. "I'm," she says, and doesn't finish the sentence, because the word seems inadequate for the specific experience. She smiles anyway. She sends you a voice message from home later: she is lying completely flat and extremely happy, and you should definitely go back.`,
    (s)=>`The question of when she would stop eating had an empirical answer: now, at the end of this meal, when there is nothing left in front of her. She didn't stop before that. She's aware of this, and not particularly sorry. She sits with the particular stillness of someone who has exceeded her usual limits and is adjusting to the new position — physically, existentially. Both hands settle on her belly, which is rounder and more present than usual. She says nothing for a while. The restaurant makes small sounds around her. Eventually: "That got away from me a little." Delivered with complete composure. She means: it was perfect. She means: she ate everything and would do it again and is already thinking about it. She moves slowly to the door. She tips generously.`,
  ],
  // Stage 6-7 (very heavy)
  [
    (s)=>`The table is cleared around ${s.name}. She doesn't move much — movement has been negotiated down to what's necessary, for her — but she's present, attentive, pleased. She ate well. She always eats well, but tonight was particular. She sits the way she always sits: fully, completely, in a way that leaves no ambiguity about how much of her there is. She is a substantial woman. The chair knows this. The staff know this. She knows this, with the comfortable certainty of someone who arrived at this understanding a long time ago and found it agreeable. She looks at the empty plates with something like affection. She looks at you with something warmer. "This was good," she says. The understatement is deliberate. She means: excellent. She means: again. She reaches for the last piece of bread.`,
    (s)=>`${s.name} acknowledges it. That's notable. She sits with both hands on her belly, which is rounder and more solid than usual, and says: "I'm full." She says it the way you'd note unusual weather — with interest, without alarm. It doesn't happen often, exactly like this. She has calibrated herself across time to new tolerances, and those tolerances are considerable, and tonight she has exceeded them, and she finds this genuinely interesting. She is not unhappy. She is very happy — happy in the slow, warm, heavy way of a person entirely at home in her body, which has never been more present than it is right now, packed and warm and settled into the chair with the solidity of something not going anywhere. She smiles. "Good dinner," she says. High praise. The highest.`,
    (s)=>`She's beyond what's usual for her, which is not a small achievement. She has been building toward this kind of capacity for a long time, and she has done something significant tonight, and she knows it, and she is pleased in the quiet, satisfied way of someone who has set a personal record. She doesn't speak for a moment. She breathes. Her belly is round and warm and enormous and she rests both hands on it like they've come home. The restaurant has gone quiet. The staff have stopped moving near your table, giving her space, giving the moment space. When she finally speaks, her voice is slower than usual. "That," she says, "was a meal." She doesn't try to get up for another fifteen minutes. When she does, it takes a while. She smiles the entire way to the door.`,
    (s)=>`She found a point tonight, somewhere after the third course past her limit, that she didn't know existed. A new ceiling. She has been raising ceilings for some time now and tonight she pushed past one she'd never encountered, and she is sitting here in the aftermath of something significant. She is fuller than she has been. She knows it. She sits with it, breathing carefully, her enormous belly pushed against the table edge, both hands resting on its apex. Around her the restaurant has gone quiet. She is the still center of it. "Well," she says, eventually. One word. It means: I am very full. It means: I am extremely pleased. It means: we are coming back. All of these things at once, delivered with the serene authority of a woman who has never once been dissatisfied with herself.`,
  ],
  // Stage 8-10 (enormous / immobile)
  [
    (s)=>`The table is cleared. ${s.name} surveys the situation with the practiced authority of someone who has done this many times and has strong opinions about how it went. She is satisfied, in the comprehensive physical sense — her body has registered the meal with a fullness that, for her, is simply a comfortable middle. She takes up a great deal of space in the chair, and the chair accommodates this without comment. She is happy. She talks about the food with expertise. She does not hurry to leave. She orders more water. She sits in the pleasant aftermath of a good meal with the comfort of someone very accustomed to this feeling, and the feeling has never felt wrong to her, not once, not for a long time now. "Same time next week," she says, and means it. There is no irony in this.`,
    (s)=>`${s.name} registers it — she's full, genuinely full, in a way that meets the specific meaning of the word and not just the approximation. This happens less often than you'd think, given the scale she's working with. She sits with both hands on her immense belly and takes a slow breath, the way someone does when they've arrived somewhere after a long journey. She is comfortable. She is very comfortable. She is the most comfortable she's been all evening, which is saying something. She looks at you with warm, unhurried satisfaction. She is a large woman in a good chair, full of good food, and everything is exactly as it should be. "Perfect," she says. She means the food. She means the evening. She means, more broadly, everything. She orders dessert to take home.`,
    (s)=>`She has exceeded her considerable capacity, which she rarely admits is possible. She sits in full knowledge of this, both hands on her vast belly, doing the quiet internal accounting that follows a meal that went further than expected. Further than most meals go. Further than she'd gone in a while. She is not distressed. She is, if anything, more at ease than usual — there's something clarifying about reaching a real limit rather than an approximation of one. The staff give her wide berth. The chair holds. The evening settles around her with the patience of something that understands its role. After a while she says: "Help me up." You do. She moves slowly, magnificently, like a ship leaving harbour. She thanks you with genuine warmth. Outside the air is cool. She breathes it in. She is happy.`,
    (s)=>`There is no word for what ${s.name} is right now that isn't insufficient. She is past full, past stuffed, past the vocabulary of fullness, in territory that only experience can describe. She is sitting absolutely still. Her belly, vast and round and warm, extends past the table edge. Both hands rest on it. She breathes very slowly, very carefully, the way you breathe when breathing is itself an achievement. The restaurant has emptied around her. The staff wait at a respectful distance. She has been sitting here for some time and will sit here for some time more, because she is not yet ready to attempt the geometry of standing. Eventually she opens her eyes. She looks at you. She smiles, slowly, completely. "Well done," she says. She means it as a compliment. It is the highest compliment she gives.`,
  ],
];

export const getOverfillEndMsg=(s,stId)=>
  stId<=2 ? `${s.name} goes very still. Both hands on her middle. "I think I need to stop," she says quietly, with genuine surprise. She means it this time.`
  :stId<=5 ? `${s.name} puts her fork down with a kind of finality. "Okay," she says. "Okay, I think that's it." She doesn't move for a moment. Even for her, that's a lot.`
  :stId<=7 ? `${s.name} breathes out slowly, both hands settling on her belly. "I'm done," she announces, with the gravity of a formal statement. Even she has a limit.`
  : `${s.name} goes completely still. Even she has reached a genuine limit. The room seems to hold its breath.`;

export const getJealousyLine=(neglected,fed)=>{
  const m={
    cheerleader:`${neglected.name} glances at ${fed.name}'s plate, then at her own empty place. "So we're feeding her first?" The smile doesn't quite reach her eyes.`,
    quiet:`${neglected.name} watches ${fed.name}'s dish arrive and says nothing. She watches it quite intently for someone who's saying nothing.`,
    party:`"Hey!" ${neglected.name} points at ${fed.name}'s food. "I want that. I want more of everything, for the record."`,
    sorority:`${neglected.name} notices the discrepancy and tilts her chin. "Are we being equitable here?" she asks pleasantly, which isn't quite pleasant.`,
    scholar:`${neglected.name} observes that ${fed.name} has received food and she has not. She says nothing. She is watching you, though.`,
    athlete:`"Hey." ${neglected.name} taps the table. "My side is empty. Hers isn't." She nods at ${fed.name}'s plate. This is the entire complaint.`,
    artsy:`${neglected.name} turns her face slightly toward the window. This is not indifference. This is very much not indifference.`,
    honors:`${neglected.name} says nothing about ${fed.name} getting the first dish. She's keeping a tally, though. She's absolutely keeping a tally.`,
    influencer:`${neglected.name} picks up her phone, looks at it, sets it down. "I'm just going to say," she says, "for the record." She doesn't finish the sentence.`,
    foodie:`${neglected.name} watches ${fed.name}'s dish arrive with an expression of profound personal injury. "That," she says, "should have come to me."`,
    bookworm:`${neglected.name} closes her book slowly and looks at ${fed.name}'s plate with the mild expression of someone documenting an anomaly. She has not said anything. She is building a file.`,
    gamer:`${neglected.name} looks at ${fed.name}'s food, looks at her empty place, and says: "Unbalanced." That's it. She goes back to her phone.`,
    overachiever:`${neglected.name} notes the disparity with a small sound — not quite a word, not quite not. She has already mentally logged the discrepancy. She will not forget it.`,
    transfer:`${neglected.name} glances at ${fed.name}'s plate with a slight frown. "At my last school," she starts, then doesn't finish. She doesn't need to.`,
  };
  return m[neglected.archetype]||`${neglected.name} looks meaningfully at ${fed.name}'s food and then at her own empty place setting.`;
};

export const GROUP_CONVERSATIONS=[
  { id:"get_them_talking", label:"Get them talking",
    text:(s1,s2)=>{
      const topics={cheerleader:"the upcoming competition",quiet:"her current project",party:"last weekend",sorority:"the chapter event",scholar:"her research",athlete:"her training",artsy:"her current piece",honors:"her family",influencer:"her content strategy",foodie:"the menu"};
      const t1=topics[s1.archetype]||"her plans";
      return `You ask ${s1.name} about ${t1}. She starts — and ${s2.name} leans in, more interested than she expected.\n"Wait, really?" ${s2.name} says. "I didn't know you were doing that."\n${s1.name}: "You never asked." No edge in it. Just fact.\n${s2.name} considers this, reaches for her drink. "Fair." Then: "Tell me the rest."`;
    }, relBonus:4, fullnessEffect:-4 },
  { id:"compliment_both", label:"Compliment them both",
    text:(s1,s2)=>`You say something genuine about each of them — something you've actually noticed. ${s1.name} receives it differently than expected: more quietly, more truly. ${s2.name} looks at her, then at you.\n"He means it," ${s2.name} says.\n${s1.name}: "I know." Something about the table shifts half a degree warmer.`,
    relBonus:3, fullnessEffect:0 },
  { id:"let_it_settle", label:"Let it settle",
    text:(s1,s2)=>`The conversation drops away. Both of them are eating. The restaurant makes its small sounds. Then ${s1.name} says something about the sauce. ${s2.name} responds. Neither is talking to you, and that's fine — better, actually. The evening has found something you weren't planning for.`,
    relBonus:2, fullnessEffect:5 },
  { id:"toast_together_group", label:"Toast the evening",
    text:(s1,s2)=>`You raise your glass. They raise theirs.\n${s1.name}: "To what?"\n"To a good evening."\n${s2.name}: "We should toast to something real." She thinks. "To the food."\n${s1.name} looks at her. Then she laughs — actually laughs. "To the food." The glasses clink.`,
    relBonus:4, fullnessEffect:-3 },
  { id:"order_for_table", label:"Order another round",
    text:(s1,s2)=>`You catch the server's eye and gesture at the table generally. More arrives. ${s1.name} and ${s2.name} look at the new dishes, look at each other.\n${s2.name}: "We didn't need more."\n${s1.name}, already reaching: "I know." She keeps reaching. ${s2.name} watches for a moment, then reaches too. The evening continues.`,
    relBonus:3, fullnessEffect:8 },
];

// ── GROUP DINNER REACTION DATA ────────────────────────────────
export const THIN_JEALOUSY={
  cheerleader:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive. Her eyes linger on it longer than she means them to. "That looks incredible," she says, very quietly.`,
    (t,f)=>`${t.name} watches ${f.name} eat with something that isn't quite envy. "You just look so... comfortable," she says. "I don't know what to do with that." She pushes her empty plate forward.`,
    (t,f)=>`"Lucky," ${t.name} says, watching ${f.name} settle into her chair after another course. "I mean it. You can just — eat. Like that. Just eat." She sounds like she means it as a compliment.`,
    (t,f)=>`${t.name} reaches across, almost without meaning to, and presses her fingers gently to ${f.name}'s side. Warm and soft and full. She pulls her hand back. "Sorry," she says. "I just — you look so comfortable." She looks at her empty table.`,
  ],
  quiet:[
    (t,f)=>`${t.name} hasn't said anything. But she has watched every bite. Her eyes are very attentive.`,
    (t,f)=>`"It smells incredible," ${t.name} says. The first thing she's said all evening. She's still watching ${f.name}'s plate.`,
    (t,f)=>`"I used to eat like that," ${t.name} says, quietly. Not an accusation. Something else. "Before I started counting everything." A pause. "I miss it."`,
    (t,f)=>`${t.name} reaches over and rests her hand gently on ${f.name}'s middle. Warm. Full. She doesn't say anything for a moment. "You feel so..." she starts, then trails off. She leaves her hand there a second longer before pulling back.`,
  ],
  party:[
    (t,f)=>`"Okay, I want that," ${t.name} says, watching ${f.name}'s dish arrive. "I'm just going to say it: I want that."`,
    (t,f)=>`"Seriously," ${t.name} says. "I haven't eaten anything and you've eaten everything and you look so happy." A beat. "I want to look like that. Exactly like that."`,
    (t,f)=>`${t.name} drops the cheerful act for a second. "Lucky," she says, watching ${f.name} settle back, round and full and comfortable. "I'm calling it: lucky. Look at her." She's talking to you but her eyes are on ${f.name}.`,
    (t,f)=>`${t.name} grabs ${f.name}'s arm mid-bite, not to stop her — just to feel it. The softness there. "Sorry," she says, and doesn't let go right away. "You just feel so good. Is that weird? That might be weird."`,
  ],
  sorority:[
    (t,f)=>`${t.name} watches ${f.name}'s next course arrive with barely-maintained composure. "The chapter always said we should appreciate abundance," she says. Her voice sounds very sincere.`,
    (t,f)=>`"I want to be supportive," ${t.name} says. "And also I genuinely want what she's having. I haven't eaten anything." She watches ${f.name}'s plate. "Everything she has. All of it."`,
    (t,f)=>`"Honestly," ${t.name} says, watching ${f.name} settle round and content into her chair, "I think you look amazing." She means it. That's what makes it land the way it does. "Everything about that looks amazing."`,
    (t,f)=>`${t.name} leans over and — with deliberate gentleness — rests her hand against ${f.name}'s soft middle. "I can feel every course," she says. "I've had nothing." She presses slightly. "That must feel so good."`,
  ],
  scholar:[
    (t,f)=>`${t.name} observes ${f.name}'s plate with academic precision. "The volume is impressive," she says, and the admiration is genuine. She has been counting.`,
    (t,f)=>`"I've been calculating the cumulative intake," ${t.name} says. "And also, independently, I've been thinking about what that feels like." She watches ${f.name}'s contentment with something like longing. "Theoretically."`,
    (t,f)=>`"I've been thinking," ${t.name} says, "about what it must feel like to just eat. Without tracking anything. Without calculating." She watches ${f.name} settle warmly into her chair. "You look like you've figured something out that I haven't."`,
    (t,f)=>`${t.name} reaches over with careful, deliberate intent and places her palm flat against ${f.name}'s full middle. "I wanted to feel it," she says, academically. "What that much food feels like, in situ." Her hand doesn't move. "Warm. Very warm."`,
  ],
  athlete:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive with the focused gaze she saves for studying form. "She eats like she's proud of it," she observes. There's respect there.`,
    (t,f)=>`"My whole life has been about burning it," ${t.name} says. "Everything I eat, I think about burning." She watches ${f.name} eat, unconcerned, comfortable. "What's that like? Just... not thinking about it?"`,
    (t,f)=>`${t.name} watches ${f.name} settle back, round and content, and says: "I've spent years making sure nothing accumulates." She means it to sound like discipline. It doesn't. "You look like you've made different choices." A pause. "Good ones, maybe."`,
    (t,f)=>`${t.name} presses her palm to ${f.name}'s side — not aggressive, almost reverent. Soft. Full. Warm. "I train every day," she says. "Every single day. And you feel like..." She doesn't finish. She doesn't need to.`,
  ],
  artsy:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive with her head tilted. "There's something beautiful about the way she just... takes it in," she says. She means the food. Maybe she means more.`,
    (t,f)=>`"I've been watching you eat," ${t.name} says. "You don't apologize for any of it." She sounds fascinated. "I apologize for everything. I've been apologizing my whole life. Look at you." She does. She keeps looking.`,
    (t,f)=>`${t.name} has stopped pretending to be detached. "You look so comfortable," she says. "Round and warm and comfortable. I've been drawing you for the past ten minutes in my head and I haven't eaten anything." She sounds like she'd trade.`,
    (t,f)=>`${t.name} places her hand against ${f.name}'s side with artistic intentionality. "Soft," she says. "Warm. Very present." She presses gently. "I wanted to understand the texture." She holds it there. "I think I'm jealous."`,
  ],
  honors:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive and says, carefully: "She has a very healthy relationship with food." This is sincere. This is something she has thought about.`,
    (t,f)=>`"You eat as though you've made peace with everything," ${t.name} says. She's been watching. "I haven't made peace with anything in ten years." She watches ${f.name}'s contentment. "What does that feel like?"`,
    (t,f)=>`"You look genuinely happy," ${t.name} says. She has been raised not to comment on others at table, and she is violating that rule because she means it. "Round and warm and full and happy. I don't know how to be that. I've never known how."`,
    (t,f)=>`${t.name} reaches out with careful propriety and rests her hand against ${f.name}'s middle. "Forgive me," she says. "I just wanted to understand." Warm. Soft. Packed full. Her eyes are very bright. "Oh," she says. "Oh, I understand."`,
  ],
  influencer:[
    (t,f)=>`${t.name} has her phone half-raised. "I keep wanting to document this," she says. "Not meanly. I just — look at her. She's glowing." She watches. Doesn't post yet.`,
    (t,f)=>`"Okay, I want to say something," ${t.name} says. "And I want it understood that I mean this as a genuine compliment." She looks at ${f.name}. "You are having the most fun of anyone at this table and you haven't stopped eating and I find it aspirational."`,
    (t,f)=>`"My whole brand is discipline," ${t.name} says. "I built my entire platform on saying no." She watches ${f.name} eat — warm, easy, comfortable, soft. "What is it like to just say yes?" She sounds wistful.`,
    (t,f)=>`${t.name} reaches over and squeezes ${f.name}'s arm. "You're so soft," she says. "I mean that as high praise. My whole life I've been sharp edges. I want to know what this feels like." She doesn't let go right away.`,
  ],
  foodie:[
    (t,f)=>`${t.name} watches ${f.name}'s next course arrive and says, professionally: "The volume is remarkable. The commitment is remarkable." She sounds, despite herself, impressed.`,
    (t,f)=>`"There's a point where you stop tasting and start experiencing," ${t.name} says. "She's past it." She watches ${f.name} eat with total ease. "I've always been afraid to get past it. She looks like she's never been afraid of anything."`,
    (t,f)=>`${t.name} sets down her empty fork. "I have eaten nothing," she says, "and you have eaten everything, and you look..." She searches for the right word. Warm. Full. Rounded and easy and utterly content. "You look like the point of the whole evening."`,
    (t,f)=>`${t.name} reaches over and presses her palm to ${f.name}'s full middle with the focus of someone taking notes. "All that richness," she says, "and she's still going." She means it as taxonomy. It sounds like longing. "I've had nothing to compare it to tonight."`,
  ],
  bookworm:[
    (t,f)=>`${t.name} watches ${f.name}'s course arrive and makes a note in the margin of whatever she's reading. Not a real note. Just a mark. She is tracking this academically.`,
    (t,f)=>`"Statistically," ${t.name} says, "you've received three times my intake tonight." She closes her book. "I'm not angry. I'm logging a pattern. The pattern is interesting." She watches ${f.name} eat. She is not just logging.`,
    (t,f)=>`${t.name} looks up from her book and studies ${f.name} with the specific attention she gives to primary sources. Warm, full, softly considerable, utterly comfortable. "I've been researching this," she says. "What it looks like. What it feels like." A pause. "The literature doesn't do it justice."`,
    (t,f)=>`${t.name} reaches over with careful deliberateness and rests her fingers on ${f.name}'s soft middle. She is doing this with the same focus she brings to tactile analysis of archival material. "The documentation said this felt like warmth and weight," she says. "The documentation was inadequate."`,
  ],
  gamer:[
    (t,f)=>`${t.name} watches ${f.name}'s dish arrive and says, deadpan: "She's at a higher level." She looks at her own empty place. "I've been idle."`,
    (t,f)=>`"Her stats are better," ${t.name} says. Not bitterly. Objectively. She's watching ${f.name} eat with something approaching professional respect. "I respect the numbers. I don't love the numbers."`,
    (t,f)=>`${t.name} sets her phone down. "She's running up the scoreboard and I'm not on it." She watches ${f.name} settle back, round and full, with the unfazed contentment of someone winning by a wide margin. "I respect the run. I want to be on the leaderboard."`,
    (t,f)=>`${t.name} presses her hand to ${f.name}'s full side with gamer-economy precision — in, assess, data collected. "Soft," she confirms. "High score." She pulls back. "I'm starting a new run."`,
  ],
  overachiever:[
    (t,f)=>`${t.name} is marking a mental spreadsheet in real time. ${f.name}'s dish arrives; she records the delta. She says nothing yet. She is in the data collection phase.`,
    (t,f)=>`"The gap between our intake tonight is significant," ${t.name} says, with the tone of someone reviewing a performance evaluation. "I'm below target. She is exceeding all benchmarks." She pauses. "I don't like being below target."`,
    (t,f)=>`${t.name} looks at ${f.name} with the competitive assessment of someone who has been out-performed on a metric she wasn't tracking and is now tracking it urgently. "You've been consistent," she says. "Every metric. The gains, the comfort level, all of it." She sounds like she's about to write a plan of action.`,
    (t,f)=>`${t.name} leans across and places her palm against ${f.name}'s full middle with goal-oriented intent. "Benchmark," she says, pressing slightly. "This is the benchmark." She holds it for a moment. "I know what I'm working toward now." She sounds resolved.`,
  ],
  transfer:[
    (t,f)=>`${t.name} watches ${f.name}'s plate arrive and blinks. "At my home campus we sat together and ate at the same time," she says. "Is this a thing here? The uneven service?" She sounds genuinely uncertain about the local customs.`,
    (t,f)=>`"I've been noticing," ${t.name} says, "that the distribution isn't balanced. At home we tracked participation. We made sure everyone got the same." She watches ${f.name} eat. "Apparently that's not how things work here."`,
    (t,f)=>`${t.name} watches ${f.name} eat — comfortable, warm, considerably softened since the start of term — and says: "Back home there was a phrase for girls who committed to the dining hall the way she does." She smiles. "It was a compliment." She watches her own empty table. "I want whatever she's having."`,
    (t,f)=>`${t.name} reaches over and touches ${f.name}'s full middle with the tentative wonder of someone encountering something new to their campus experience. "Is this — is this what you all do here?" she asks softly. "Because I would have transferred sooner."`,
  ],
};

export const FAT_ENCOURAGE={
  cheerleader:[
    (f,t)=>`${f.name} catches ${t.name}'s empty plate and frowns warmly. "She hasn't eaten anything." A pause. Then, louder: "That's not right. Feed her."`,
    (f,t)=>`${f.name} slides a dish toward ${t.name} with genuine insistence. "Try this one. It's wonderful." She is already reaching for the next bite of her own. "You're missing it."`,
    (f,t)=>`${f.name} nudges ${t.name}'s arm, then gives her shoulder an encouraging shake. "I was your size, once," she says. "This is better. This is so much better. Eat something, please."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and presses it warm and firm against her own full belly. "Feel that," she says, with the satisfaction of someone who has made excellent choices. "That's what the evening is supposed to feel like." She keeps hold. "I want that for you."`,
  ],
  quiet:[
    (f,t)=>`${f.name} glances at ${t.name}'s empty plate and slides her extra bread over without a word. Then looks at her. Waiting.`,
    (f,t)=>`"You should eat," ${f.name} says. She means it from somewhere warm. She means it genuinely.`,
    (f,t)=>`${f.name} gets up, makes room on ${t.name}'s side of the table, and waves the server over. She doesn't explain. She just wants her to eat.`,
    (f,t)=>`${f.name} places ${t.name}'s hand on her own stomach and holds it there. The warmth, the fullness, the soft give of it. "I want you to feel this," she says quietly. "I was your size. I want you to know what this is."`,
  ],
  party:[
    (f,t)=>`${f.name} points at ${t.name}'s empty place with her fork. "Excuse me," she says, "this is not how we do things. She hasn't eaten anything. This is a crisis."`,
    (f,t)=>`${f.name} starts loading ${t.name}'s plate from her own. "Here, this one is incredible — here, have this too. I was your size once and I didn't know what I was missing."`,
    (f,t)=>`${f.name} grabs ${t.name} by both shoulders. "I need you to eat," she says. "For your sake. For my sake. I can't enjoy this with you sitting there having nothing."`,
    (f,t)=>`${f.name} pats ${t.name}'s flat stomach cheerfully, then her own — warm, soft, deeply full. "See the difference?" she says, beaming. "I want this for you. I want this so much for you. Eat something."`,
  ],
  sorority:[
    (f,t)=>`${f.name} regards ${t.name}'s empty setting with the authority of someone who has hosted many meals. "She hasn't been taken care of," she says. "Fix it."`,
    (f,t)=>`"The chapter principle," ${f.name} says, "is that everyone eats." She signals for more. "I was your size at pledge year. Let me tell you, it gets better. The eating gets so much better."`,
    (f,t)=>`${f.name} slides her dessert toward ${t.name} with the warmth of genuine sharing. "Take it. I want to share this with you." She pats ${t.name}'s shoulder. "You need something to show for the evening."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own belly — round and warm and deeply full — and holds it. "This," she says, with complete sincerity, "is what a full evening feels like. I want that for you." She pats once. "Feed her. Right now."`,
  ],
  scholar:[
    (f,t)=>`${f.name} reviews the table and notes the disparity. "She's not eating," she says. "That's a compounding problem. Fix it early."`,
    (f,t)=>`"I've done the math," ${f.name} says, "and she is not keeping up. She needs to start." She studies ${t.name} with methodical warmth. "I was thin once. It was less interesting."`,
    (f,t)=>`${f.name} sets down her fork and addresses ${t.name} directly: "I have tried to ignore your empty plate, and I can't. It's affecting my concentration. Eat. Something. Please." She picks her fork back up.`,
    (f,t)=>`${f.name} takes ${t.name}'s hand, presses it firmly to her own full, warm belly, and holds it there. "I want you to understand what this is," she says. "I was your size. I did the research. This is better. Eat."`,
  ],
  athlete:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty plate with the assessment of a coach evaluating under-fueling. "She's not eating," she says. "That's a recovery issue. Get her something."`,
    (f,t)=>`"Fuel," ${f.name} says simply, pushing a dish toward ${t.name}. "You need it. I know what I'm talking about. I know the difference it makes." She does.`,
    (f,t)=>`${f.name} gives ${t.name}'s arm an encouraging squeeze — and then keeps hold, comparing. "There's nothing here," she says. "We need to build this up. That's what food does. Let it do its job."`,
    (f,t)=>`${f.name} presses ${t.name}'s palm to her own belly, warm and deeply packed. "I was lean once," she says. "Disciplined and lean. And then I stopped fighting it." She moves the hand. "Feel the difference. I want that for you. Eat."`,
  ],
  artsy:[
    (f,t)=>`${f.name} notices ${t.name}'s empty setting and feels the aesthetic offense of it. "She hasn't eaten anything," she says. "The whole composition is off. Feed her."`,
    (f,t)=>`"There's an absence here," ${f.name} says, sliding a dish toward ${t.name}. "And it shouldn't be. Eat this. Tell me what you taste. I want to share it."`,
    (f,t)=>`${f.name} rests her hands warm on ${t.name}'s shoulders. "You're too light," she says. "I mean literally — you feel like nothing. I want you to feel like something. Eat."`,
    (f,t)=>`${f.name} places ${t.name}'s hand against her own belly — soft, warm, full, present. "This is what I want to give you," she says, with complete sincerity. "Not this specifically, but — this feeling. This substance. Eat."`,
  ],
  honors:[
    (f,t)=>`${f.name} takes note of ${t.name}'s empty place with the concern of someone raised to believe hospitality is a moral matter. "She hasn't been seen to," she says. "That's not acceptable."`,
    (f,t)=>`"In my family," ${f.name} says, "to let a guest go hungry is a failure of the host." She signals for more. "Eat. I mean it warmly but I also mean it as a rule."`,
    (f,t)=>`${f.name} faces ${t.name} fully. "You are very thin," she says, with the directness of someone who was raised to say hard things kindly. "That is correctable. I was thin once. Eat. I'm asking you sincerely."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand in both of hers and places it against her full, warm middle. "My grandmother would say this is what an evening looks like," she says. "I want you to have this." She holds the hand. "Feed her properly."`,
  ],
  influencer:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty table and the creator in her takes over. "This is not balanced content," she says. "And more importantly — she's missing out. Feed her. This is too good to miss."`,
    (f,t)=>`"Do you know what performs best?" ${f.name} says. "Transformation. The beginning of something." She slides a dish toward ${t.name}. "This could be your beginning. Eat something."`,
    (f,t)=>`${f.name} cups ${t.name}'s face in her hands. "Listen to me," she says. "I was where you are. The discipline, the restraint, the counting. And then I stopped." She beams. "Look at me now. This is available to you. Eat."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own stomach and holds it, warm and soft and present. "Feel my journey," she says, with total sincerity. "I want this for you. I want to watch it happen for you." She pats the hand. "Eat."`,
  ],
  foodie:[
    (f,t)=>`${f.name} looks at ${t.name}'s empty plate and feels the waste of it personally. "She's sitting in front of this food and not eating it," she says. "That is genuinely upsetting. Fix it."`,
    (f,t)=>`${f.name} begins describing the current course to ${t.name} in loving, specific detail — not to show off, but because she genuinely needs someone else to understand what she is experiencing. "You have to taste this. You have to."`,
    (f,t)=>`${f.name} picks up a dish and sets it in front of ${t.name} herself. "Eat this," she says. "I'm sharing this with you. This is an act of love." She means it entirely.`,
    (f,t)=>`${f.name} guides ${t.name}'s fork to her own plate. "Taste it," she says. "I need someone else in this. The richness — you can't understand it from the outside." She puts a hand on ${t.name}'s shoulder, warm and present. "Come in. Eat with me."`,
  ],
  bookworm:[
    (f,t)=>`${f.name} marks her place in her book and looks at ${t.name}'s empty plate with the measured concern of someone noting a gap in the data. "She hasn't eaten," she says. "That's a variable that needs correcting. Get her something."`,
    (f,t)=>`"I've been thinking," ${f.name} says, "about the correlation between intake and comfort. There's a strong one. The sample size in front of you is me." She slides a dish toward ${t.name}. "Add yourself to the dataset."`,
    (f,t)=>`${f.name} sets down her book and addresses ${t.name} directly: "I was thin. I ran the numbers on everything. The math I was doing was wrong." She pats her own considerable middle. "This is the correct answer. Start eating. I'll walk you through the methodology."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and places it against her own full, warm belly with academic deliberateness. "Primary source," she says. "This is what the evening feels like when you participate correctly. I want you to have this data."`,
  ],
  gamer:[
    (f,t)=>`${f.name} spots ${t.name}'s empty plate immediately. "She's not playing," she says. "You can't win if you're not playing. Get her in."`,
    (f,t)=>`"New player," ${f.name} says, nodding at ${t.name} with the patient authority of a veteran. "She needs to level. Get her something. Start her on something good."`,
    (f,t)=>`${f.name} slides a dish toward ${t.name} with the casual generosity of someone sharing a power-up. "I was where you are," she says. "Rookie numbers. Didn't know what the game was." She pats her own side comfortably. "Now I do. Eat. Get your stats up."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and presses it against her own full side. "Max stats," she says flatly. "That's what this feels like. Eat. I want to watch your score climb." She means it entirely.`,
  ],
  overachiever:[
    (f,t)=>`${f.name} reviews the table, notes ${t.name}'s empty place, and frowns with the energy of someone identifying an underperforming metric. "She's not eating. That's a problem. That's correctable. Fix it."`,
    (f,t)=>`"I tracked everything once," ${f.name} says. "Every calorie. Every deficit. I was winning the wrong game." She slides a dish toward ${t.name}. "This is the right game. Your intake goal for tonight: all of this."`,
    (f,t)=>`${f.name} pulls her chair directly next to ${t.name}'s and starts loading her plate with the efficiency of someone executing a plan. "We are going to optimize your evening," she says. "Step one is eating. I was thin and driven and missing something. I'm not missing it anymore."`,
    (f,t)=>`${f.name} takes ${t.name}'s hand and places it against her own full belly — warm, firm, impressive by any measure. "Personal record," she says. "This is a personal record. I want to watch you set yours." She holds the hand there. "Eat. I'll keep score."`,
  ],
  transfer:[
    (f,t)=>`${f.name} sees ${t.name}'s empty place and feels a specific hospitality obligation. "She hasn't been fed," she says. "At my home campus this would be a significant failure of hosting. Feed her."`,
    (f,t)=>`"Where I'm from," ${f.name} says, "we made sure everyone ate. Especially the new arrivals." She loads ${t.name}'s plate from her own. "Welcome. This is how we do things here now. I checked. Eat."`,
    (f,t)=>`${f.name} cups ${t.name}'s face warmly. "You're going to do great here," she says. "But you need to start eating." She gestures at herself — considerably, warmly, entirely content. "I transferred in not knowing anyone. This was what got me through. It will get you through. Eat."`,
    (f,t)=>`${f.name} guides ${t.name}'s hand to her own full middle and holds it there. "I was exactly where you are," she says. "New school, not sure about anything, not eating enough." She presses the hand. "This campus is good to you if you let it be. Eat. I'm so glad I transferred."`,
  ],
};

export const FAT_RETORT={
  cheerleader:[
    (f,t)=>`${f.name} smiles at ${t.name} with the warmth of someone entirely comfortable in her own skin. "Honey," she says, "if you ate something you'd feel better too."`,
    (f,t)=>`${f.name} looks at ${t.name} with generous understanding. "I know," she says. "I looked like you once. I know exactly what that feels like." She pats her own middle. "This is better. I promise."`,
    (f,t)=>`${f.name} reaches over and presses ${t.name}'s hand to her own warm, soft belly with all the confidence of someone offering proof. "Tell me you don't want this," she says, and she means it gently. "I'll believe you. But eat something first."`,
  ],
  quiet:[
    (f,t)=>`${f.name} just looks at ${t.name}. Then she eats. Then she looks at ${t.name}'s empty plate. Then she looks back at her own.`,
    (f,t)=>`"Eat something," ${f.name} says. Just that. Her tone has no edge — just concern and invitation.`,
    (f,t)=>`${f.name} sets down her fork and says, very quietly: "You're hungry. I can see it." She slides her plate toward ${t.name}. "Eat."`,
  ],
  party:[
    (f,t)=>`${f.name} laughs — a real one, full and warm. "Babe," she says, "I'm not even offended. I want you to have what I have. Eat something."`,
    (f,t)=>`"Mean!" ${f.name} says, laughing. "Mean, and hungry." She pushes her bread toward ${t.name}. "Eat first. Then we can fight."`,
    (f,t)=>`${f.name} grabs ${t.name}'s hand and presses it to her belly with a cheerful grin. "Tell me that doesn't feel good," she says. "Now tell me you don't want that. Eat something and get there."`,
  ],
  sorority:[
    (f,t)=>`${f.name} raises an eyebrow. "When you're ready to eat," she says, "I'll be here." Warm, unhurried, completely assured.`,
    (f,t)=>`"I hear you," ${f.name} says. Her smile doesn't shift. "And when you eat something, you'll understand what I have. I genuinely hope that for you."`,
    (f,t)=>`${f.name} pats her own belly with full chapter-president satisfaction. "This," she says, "is what the evening is supposed to feel like. You could have it. Eat something."`,
  ],
  scholar:[
    (f,t)=>`${f.name} looks at ${t.name}. "The data," she says gently, "would suggest you're projecting." She pats her belly. "Eat something. Gather your own."`,
    (f,t)=>`"I've run those numbers," ${f.name} says. "I've come out ahead on every metric that matters." She looks at ${t.name}'s empty plate. "Yours are thin."`,
    (f,t)=>`${f.name} gives her belly a warm, deliberate pat. "I'm very comfortable with where I am," she says. "You could be too. It starts with eating." She means it helpfully.`,
  ],
  athlete:[
    (f,t)=>`${f.name} meets ${t.name}'s eyes with the calm of someone who has out-performed many doubters. "Eat something," she says. "First step."`,
    (f,t)=>`"I spent years being what you are," ${f.name} says. "Disciplined and lean and always one number away from enough." She picks up her fork. "I stopped. Look at me now." She sounds pleased.`,
    (f,t)=>`${f.name} pats her belly with warm, competitive satisfaction. "This is a personal record," she says. "And it starts with eating. I'd like to see yours."`,
  ],
  artsy:[
    (f,t)=>`${f.name} tilts her head. "There's something interesting in your reaction," she says. "Sit with it. And also eat something."`,
    (f,t)=>`"The jealousy," ${f.name} says, "is your body knowing something you haven't admitted yet." She eats. "Feed it. See what happens."`,
    (f,t)=>`${f.name} pats her belly contemplatively. "I've made peace with all of this," she says. "You could too. It starts with a bite."`,
  ],
  honors:[
    (f,t)=>`${f.name} straightens. "In my family," she says, "we address envy by working for the thing we want." She looks at ${t.name}'s plate. "Start there."`,
    (f,t)=>`"I appreciate what you're doing," ${f.name} says, with genuine warmth. "And I know what it means." She looks at ${t.name}'s empty plate. "Eat something."`,
    (f,t)=>`${f.name} folds her hands and addresses ${t.name} with complete warmth. "Eat, dear," she says. "You'll understand when you do."`,
  ],
  influencer:[
    (f,t)=>`"I know what this is," ${f.name} says, smiling. "This is a before picture wanting its after." She slides a dish toward ${t.name}. "Eat. Start your arc."`,
    (f,t)=>`"The content that performs best is transformation," ${f.name} says, with a warm look. "This is your step one." She nods at ${t.name}'s empty plate. "Eat."`,
    (f,t)=>`${f.name} holds her phone up and takes a photo — not of ${t.name}, but of the spread, the warm-lit table, the abundance. "I have what you want," she says. "Start eating. I'll document the journey."`,
  ],
  foodie:[
    (f,t)=>`${f.name} pauses mid-bite. "You haven't eaten anything," she says, with the concern of someone who finds this genuinely tragic. "That's the real problem here. Eat."`,
    (f,t)=>`"Everything I am," ${f.name} says, with calm professional pride, "grew from exactly this." She gestures at the table. "You could have it too. Order something."`,
    (f,t)=>`${f.name} fixes ${t.name} with the look of a critic addressing a fundamental misunderstanding. "You want what I have," she says. "It's obvious. The door is right there." She nods at the menu. "Eat."`,
  ],
  bookworm:[
    (f,t)=>`${f.name} considers ${t.name} for a moment. "The data you're working from is outdated," she says, almost gently. "The conclusion you've drawn doesn't hold. Eat something. Revise."`,
    (f,t)=>`"I've been where you are," ${f.name} says. "I ran the same hypotheses. They were wrong. Mine are better now." She pats her full middle with academic satisfaction. "The methodology is available. It involves eating."`,
    (f,t)=>`${f.name} places her hand on her own warm belly with the quiet certainty of someone who has done the research. "Peer-reviewed," she says simply. "This is the correct outcome. Eat and find out."`,
  ],
  gamer:[
    (f,t)=>`${f.name} looks at ${t.name} for a moment. "Skill issue," she says. Not unkindly. "You haven't played enough rounds to understand what I've got. Eat something. Build your experience."`,
    (f,t)=>`"I'm not offended," ${f.name} says. "You're running outdated information." She eats. "The patch notes are: eat more. I've read the patch notes." She sounds content.`,
    (f,t)=>`${f.name} pats her belly with the ease of someone very comfortable with their loadout. "Max level takes time," she says. "You're early game. Start eating. I'll be here."`,
  ],
  overachiever:[
    (f,t)=>`${f.name} straightens slightly. "My metrics are excellent," she says. "I've checked. You're projecting from incomplete data." She gestures at her own full figure with calm pride. "This is what optimized looks like. Eat and catch up."`,
    (f,t)=>`"I understand the impulse," ${f.name} says. "You're comparing. That's good instinct. But you're missing context." She pats her considerable side with satisfaction. "The context is that I am winning. Eat. Start your arc."`,
    (f,t)=>`${f.name} meets ${t.name}'s eyes with competitive warmth. "You can have this," she says. "I want you to have this. I want to watch you match my numbers." She nods at the menu. "Eat. We can track together."`,
  ],
  transfer:[
    (f,t)=>`${f.name} smiles, not unkindly. "At my home campus there was a phrase for this reaction," she says. "It translated to 'future convert.' You'll understand when you eat something." She does not stop eating.`,
    (f,t)=>`"I had this exact reaction," ${f.name} says warmly. "First semester. Looking at someone like me and not knowing what to do with it." She pats her own side. "The answer was: eat. I found that out here. It's a good campus."`,
    (f,t)=>`${f.name} leans forward. "I'll tell you what I wish someone had told me when I transferred," she says. "Eat the food. Just eat it. Everything you're feeling right now resolves itself." She looks completely at peace with this. "Trust the process."`,
  ],
};

export const THIN_CONTEXTUAL={
  athlete: (t,f)=>`${t.name} watches ${f.name} eat and says, almost dreamily: "You used to train every day." A pause. "I wonder what it's like to just — stop. Eat everything. Let it all just..." She gestures vaguely at ${f.name}'s figure. "Settle." She sounds, against her will, wistful.`,
  cheerleader: (t,f)=>`"Do they still try to lift you?" ${t.name} asks. "During routines." Her voice has a teasing edge but her eyes are somewhere else. "I'm imagining it. You'd just — oh, that's a lot of girl to get airborne." She almost sounds like she's admiring the physics.`,
  sorority: (t,f)=>`"All those formal tailors," ${t.name} says. "Every semester, new measurements. Starting from nothing and going —" She gestures at ${f.name}. "There." A beat. "The dedication, honestly. The commitment to the whole thing."`,
  influencer: (t,f)=>`"The early posts and the recent ones," ${t.name} says. "I've watched every chapter." She tilts her head. "There's a whole story there, isn't there. Same face. Very different everything else." She sounds almost fond.`,
  scholar: (t,f)=>`"I think about your research trajectory sometimes," ${t.name} says. "The papers from year one, the papers now." She watches ${f.name} eat. "Same mind, different... housing. I wonder if they feel different to write."`,
  honors: (t,f)=>`"The legacy portraits," ${t.name} says. "Your family's hallway, the early ones and recent ones." She watches ${f.name} with something between teasing and genuine fascination. "That's a very different kind of person in those frames. Both of them are you."`,
  artsy: (t,f)=>`"Your self-portraiture has been a journey," ${t.name} says. "I've followed it." She tilts her head and studies ${f.name} with the frankness of an artist. "The subject kept getting more interesting. Warmer. More to work with." She doesn't mean it meanly.`,
  foodie: (t,f)=>`"You know what I love about your reviews?" ${t.name} says. "The early ones are about precision. The recent ones are about hunger." She watches ${f.name} eat. "The appetite got into the writing. You can feel it. It got into everything, really."`,
  quiet: (t,f)=>`${t.name} watches ${f.name} eat for a long moment, then says: "Do you ever get full?" She sounds like she's asking about something she wants to understand. "Does it just — is there a point where it stops feeling good and you just keep going?"`,
  party: (t,f)=>`"The party photos are a trip," ${t.name} says. "Year one to now." She watches ${f.name} contentedly eat. "That's a really different person by size. Same smile, though. You've always had the same smile." She sounds, nearly, like she means it as a compliment.`,
  bookworm: (t,f)=>`"I've been reading your annotations from the first year," ${t.name} says. "The handwriting is the same. The margins are fuller. The notes take up more space." She watches ${f.name} eat steadily. "Something loosened in you. The scholarship got better when the rest of you did too."`,
  gamer: (t,f)=>`"Your frame rate at semester start," ${t.name} says. "And now." She makes a gesture implying the obvious arithmetic. "Same player. Different hardware entirely." She sounds like she's doing a performance review. She sounds, quietly, impressed.`,
  overachiever: (t,f)=>`"First semester GPA versus current. First semester intake versus current." ${t.name} watches ${f.name} eat. "You solved both problems in the same direction. That's efficient." She sounds like she means this as a compliment. She does.`,
  transfer: (t,f)=>`"When you first got here you were asking where everything was," ${t.name} says. "That map. The confused look." She watches ${f.name} eat with total comfort and ownership. "You figured out the campus." She pauses. "And the dining hall. Especially the dining hall."`,
};

export const UNBUTTON_LINES=[
  (s)=>`${s.name} shifts in her seat. There's a small, deliberate movement under the table — a button giving way, the waistband releasing. She exhales. Continues eating.`,
  (s)=>`${s.name} reaches down, adjusts something quietly, and settles deeper into her chair. She looks fractionally more comfortable. She doesn't mention it.`,
  (s)=>`A quiet click from under the table. ${s.name} doesn't look up. She just keeps eating.`,
  (s)=>`${s.name} reaches down with the practiced ease of someone who has done this before, undoes her waistband, and picks up her fork again without comment.`,
  (s)=>`${s.name} pauses, does something discreet under the table, and continues. Her expression doesn't change. The pace of eating does.`,
];

// ═══════════════════════════════════════════════════════════════
// PROFESSOR CHARACTER CREATION
// ═══════════════════════════════════════════════════════════════

export const PROF_SUBJECTS=[
  {id:"psychology",label:"Psychology",emoji:"🧠",desc:"You study the mind. The rationalizations, the quiet negotiations people make with themselves — you see the shape of them before anyone else does.",bonus:"Talk actions grant +2 additional relationship. Observe reveals emotional state."},
  {id:"literature",label:"Literature",emoji:"📚",desc:"You read transformation into every text. You recognize a character arc when you're living one — and when you're writing someone else's.",bonus:"+15% relationship from conversation actions. Dinner conversations are richer."},
  {id:"nutrition",label:"Nutrition Science",emoji:"🔬",desc:"The body is your subject. Intake, accumulation, the whole scientific romance of how things change and where they end up.",bonus:"All feeding actions +10% gain. Study check-ins unlock caloric analysis."},
  {id:"art_history",label:"Art History",emoji:"🎨",desc:"You've spent a career teaching people to really look at form. The appreciative eye is a habit by now. You can't turn it off.",bonus:"Observe costs 0 AP. Group dinner jealousy triggers more frequently."},
  {id:"physical_ed",label:"Physical Education",emoji:"🏋️",desc:"Years preaching fitness. There's a particular poetry in what you're doing now. You know exactly where each pound lands.",bonus:"Student weight and stage always visible. Stage transitions unlock unique commentary."},
  {id:"philosophy",label:"Philosophy",emoji:"⚖️",desc:"Everything is relative. Consequence is deferred. You are examining several lives, including your own.",bonus:"+5% all gain actions. Admin scrutiny rises 20% more slowly."},
];

export const PROF_TRAITS=[
  {id:"patient",label:"Patient",emoji:"🕰️",desc:"You play a long game. The slow accumulation, the inevitable tipping points — these are more satisfying to you than brute force.",effect:"+2 relationship from every action. Passive gain +1 lb/student/week."},
  {id:"observant",label:"Observant",emoji:"👁️",desc:"Nothing escapes you. Weight stages, how a shirt fits, the slight breathlessness on stairs — you clock all of it, always.",effect:"Student weight always visible. Observe costs 0 AP."},
  {id:"generous",label:"Generous",emoji:"🍽️",desc:"You express care through food. It's almost automatic. The portions are just enthusiastic.",effect:"All feeding actions +15% gain. Dinner fullness +10%."},
  {id:"charismatic",label:"Charismatic",emoji:"✨",desc:"Students listen when you talk. They lean in. They stay for office hours longer than they intended.",effect:"Talk actions grant double relationship. Dinner conversations unlock sooner."},
  {id:"discreet",label:"Discreet",emoji:"🔇",desc:"You're good at making the unusual seem unremarkable. Keeping things quiet is a skill you've honed.",effect:"Admin scrutiny rises 35% more slowly. Research study risk halved."},
];


// ═══════════════════════════════════════════════════════════════
// HR OBSERVER
// ═══════════════════════════════════════════════════════════════


// ── INNER CIRCLE ────────────────────────────────────────────────
export const INNER_CIRCLE_TIERS=[
  {id:0,label:"Acquaintance",emoji:"👋",relMin:0,  color:"#503060"},
  {id:1,label:"Close",       emoji:"🤝",relMin:45, color:"#7040a0"},
  {id:2,label:"Intimate",    emoji:"💜",relMin:70, color:"#9050c8"},
  {id:3,label:"Devoted",     emoji:"🖤",relMin:90, color:"#c060ff"},
];
export const getTier=(rel)=>[...INNER_CIRCLE_TIERS].reverse().find(t=>rel>=t.relMin)||INNER_CIRCLE_TIERS[0];

export const TIER_SCENES={
  cheerleader:[
    s=>`${s.name} stops you after class — not with a question, just to talk. "You're different from other professors," she says. She doesn't elaborate, but she smiles when she leaves. You notice she's started sitting closer to the front.`,
    s=>`She's waiting outside your office when you arrive. Not for anything specific. "I just wanted to talk," she says, already making herself comfortable in the chair across from you. She stays for forty minutes and eats the snacks you have out without asking.`,
    s=>`"I don't really think about it anymore," ${s.name} says one afternoon, smoothing her hands over her enormous thighs with quiet familiarity. "I just know that whatever you suggest is usually right." She leans forward, full of trust. "So what do you suggest?"`,
  ],
  bookworm:[
    s=>`${s.name} starts leaving academic papers on your desk — things she thinks you'll find interesting. Her annotations are in careful handwriting in the margins. You start leaving responses.`,
    s=>`She brings you coffee without asking. Black, the way you take it. You don't remember telling her that. She just knows, the way she knows most things — by watching carefully and making notes.`,
    s=>`${s.name} closes her laptop when you walk in — both of them. "I've been thinking," she says, "that I trust your judgment more than my own on certain things." She says it matter-of-factly, like a research finding. "I wanted you to know that."`,
  ],
  influencer:[
    s=>`${s.name} mentions you in a post — vague, complimentary. "My professor says" something kind. The comments say "you love her." She messages you the link privately: "Thought you'd like that."`,
    s=>`She stops filtering her posts when you're around. "You're one of the only people I can just be with," she says. For her, being unguarded is the intimacy. She doesn't reach for her phone the entire afternoon.`,
    s=>`${s.name} turns down a sponsored deal. "Not aligned," she says. The product was about restriction and she isn't doing that anymore. "You've made me different," she says. "Better, I think."`,
  ],
  athlete:[
    s=>`${s.name} asks if you want to eat together after class — just lunch, nothing formal. She piles the tray high without noticing. "I just figured you'd be heading to eat anyway," she says.`,
    s=>`She calls you just to talk. She does that now. The call goes long. She eats her protein bar and a second one. "You're the only one who gets it," she says eventually.`,
    s=>`${s.name} comes to you first now — for everything. "You're the only one who gets it," she says, dropping her bag and settling into the couch. She takes up a lot of it now. Neither of you mentions it. It's simply how things are.`,
  ],
  artsy:[
    s=>`${s.name} shows you a sketchbook page marked DO NOT SHOW. "But you can," she says. "You're different." The drawing is of her own hands, relaxed, holding something. You think you understand.`,
    s=>`She starts leaving small drawings on your desk. A coffee cup with your initial. A window with rain. They're not signed. She doesn't mention them. You start keeping them.`,
    s=>`"I've been painting us," ${s.name} says, not looking up. On the canvas: a table, two chairs, food, warmth. Her figure is enormous and rendered with obvious tenderness. "It's how I see it. I wanted you to see it too."`,
  ],
  gamer:[
    s=>`${s.name} adds you to her Discord — the small private server, six people total. "Don't make it weird," she says, then talks to you for three hours. "You're actually cool," she finally says, like this surprises her.`,
    s=>`She sends links without context — memes, clips, screenshots. Each one lands exactly right. "I'm just good at people," she says. "You're easy." She's been paying very close attention.`,
    s=>`${s.name} names an NPC after you in a game she's building. "You're the good one," she says. "Always has food, never judges." She shows you the sprite. It's accurate. "I wanted to put you somewhere permanent."`,
  ],
  sorority:[
    s=>`${s.name} introduces you to her closest sisters as "basically family." Casually, like it's established. When you leave she catches your arm. "I meant that," she says quietly. Then back to being loud, as if nothing happened.`,
    s=>`She confides something real — not gossip, something she's actually worried about. She picks at the snacks between sentences. "You're the first person I've told," she says. She finishes the whole plate before she realizes.`,
    s=>`${s.name} quits one of her committees. "The culture wasn't right." She means one of the places that used to make her feel bad about eating. She doesn't say that. You understand anyway. "Things are better now. You're part of that."`,
  ],
  overachiever:[
    s=>`${s.name} asks for your opinion on something academic — not competitively but genuinely. She takes notes. "You think differently than I expected," she says. It might be the most honest compliment she gives anyone.`,
    s=>`She revises her thesis around feedback you gave her in passing. Not for a grade. "I just needed it to be right," she says. She hands you thirty pages. She'd clearly spent a weekend on it. "I trust your judgment."`,
    s=>`${s.name} drops one of her majors. "Three was too many," she says — which everyone has been telling her for two years. "You made me see that." She looks lighter, even though she's heavier. "I want to do fewer things properly."`,
  ],
  quiet:[
    s=>`${s.name} leaves a note on your desk — not a message, just a drawing of a bird she saw on campus. No explanation. It's small and precise and somehow says everything. You put it in a drawer. She notices it's gone. She smiles.`,
    s=>`She starts sitting beside you when she studies, in silence. After a while she says, "I don't usually do this," meaning be close to anyone. "I know," you say. She nods. That's enough.`,
    s=>`${s.name} speaks up in class for the first time — not hesitantly, but with something to say. Afterward she looks at you. Not for approval. Just sharing. "Thank you," she says once, later. She doesn't say for what. You know.`,
  ],
  transfer:[
    s=>`${s.name} stops calling this place temporary. "I think I belong here," she says, surprised. You've noticed her routes on campus have changed — longer, more comfortable, lingering. "It's because of you, partly," she says.`,
    s=>`She brings you food from a restaurant she found, just leaving it with a note: "You have to try this." Local, generous, good. She takes you there herself the following week. "This is home now," she says. She means it.`,
    s=>`${s.name} applies for permanent residency in the city. "I'm staying," she says, like it's the simplest thing. She's grown into this place in every way — rounder, slower, easier in her skin. "Why would I leave?"`,
  ],
};


// ── SOCIAL EVENTS ───────────────────────────────────────────────

// ── PRIVATE SESSIONS ─────────────────────────────────────────────
export const PRIVATE_VENUES=[
  {id:"office",    label:"🏢 After Hours — Office", minTier:1,
   desc:"The building empties by evening. You order in. The door is locked. Time is not a factor.",
   intro:s=>`${s.name} arrives after the last light in the corridor goes out. She looks at what you've laid out and her expression changes — something quiet and wanting settling over her. "You planned this," she says. It isn't a question.`},
  {id:"apartment", label:"🏡 Your Apartment",       minTier:2,
   desc:"Your kitchen, your rules. No pretense, no schedule. Just food and time.",
   intro:s=>`You've been cooking since the afternoon. When ${s.name} arrives she stands in the doorway and breathes in. "It smells incredible," she says, and you can already see what's going to happen.`},
  {id:"her_space", label:"🛋️ Her Place",             minTier:3,
   desc:"Her territory. She is fully comfortable, there are snacks everywhere, and she never has to hold back.",
   intro:s=>`You bring the food to ${s.name} this time. She opens the door in her most comfortable clothes — the ones she only wears when she doesn't care. Which, increasingly, is most of the time.`},
];

export const PRIVATE_FOODS=[
  {id:"pr_board",      label:"Charcuterie & Bread",     course:"opener",  gain:[2,4], fullness:14, desc:"A generous spread to start — cured meats, three cheeses, warm bread. Just to get things moving."},
  {id:"pr_soup",       label:"Rich Cream Soup",          course:"opener",  gain:[2,3], fullness:12, desc:"Thick, warm, deeply satisfying. The bread goes straight into it."},
  {id:"pr_bruschetta", label:"Bruschetta Tower",         course:"opener",  gain:[1,3], fullness:10, desc:"Piled high with everything. She eats half before she realises she's doing it."},
  {id:"pr_pasta",      label:"Four-Cheese Pasta",        course:"main",    gain:[5,8], fullness:32, desc:"You've made enough for three people. She doesn't know that yet."},
  {id:"pr_risotto",    label:"Truffle Risotto",          course:"main",    gain:[4,7], fullness:28, desc:"An enormous bowl. Deeply rich. She works through it steadily, in the way she's learned."},
  {id:"pr_roast",      label:"Slow Roast & Three Sides", course:"main",    gain:[5,9], fullness:36, desc:"A full roast with everything. The kind of meal that sits heavily even on an empty stomach."},
  {id:"pr_burger",     label:"Double Stack Burger",      course:"main",    gain:[4,7], fullness:26, desc:"Built to an architectural height. Fries already in her hand before it lands."},
  {id:"pr_more_pasta", label:"Second Serving",           course:"more",    gain:[4,6], fullness:22, desc:"The pot isn't empty. She looks at it. You look at her. She holds out her bowl."},
  {id:"pr_bread",      label:"Warm Bread Basket",        course:"more",    gain:[2,4], fullness:14, desc:"Butter. Always more butter. She doesn't argue."},
  {id:"pr_sides",      label:"Extra Sides Plate",        course:"more",    gain:[3,5], fullness:18, desc:"Everything that was on the side of the main, now in a bowl, now in front of her."},
  {id:"pr_cake",       label:"Full Chocolate Cake",      course:"dessert", gain:[3,6], fullness:22, desc:"Not a slice. A cake. She stares at it. Then she picks up a fork."},
  {id:"pr_icecream",   label:"Ice Cream Sundae",         course:"dessert", gain:[2,5], fullness:16, desc:"Four scoops. Multiple sauces. Whipped cream. She does not hesitate."},
  {id:"pr_brownie",    label:"Warm Brownie & Cream",     course:"dessert", gain:[2,4], fullness:14, desc:"Warm, dense, impossibly rich. She eats every crumb."},
  {id:"pr_mille",      label:"Mille-Feuille",            course:"dessert", gain:[2,4], fullness:14, desc:"Layers and layers of pastry and cream. The chef called it indulgent. They weren't wrong."},
  {id:"pr_snack_tray", label:"Late-Night Snack Tray",    course:"extra",   gain:[2,5], fullness:16, desc:"More food, no explanation needed. She's stopped asking questions."},
  {id:"pr_wine_cheese",label:"Wine & Cheese",            course:"extra",   gain:[2,4], fullness:12, desc:"It pairs well with everything she's already eaten. She agrees."},
  {id:"pr_chocolates", label:"Box of Chocolates",        course:"extra",   gain:[1,4], fullness:10, desc:"She doesn't even pick them up one at a time anymore."},
];

export const SESSION_FULLNESS_STAGES=[
  {id:0, label:"Comfortable",       range:[0,  40],  color:"#30a060"},
  {id:1, label:"Warm & Full",       range:[40, 70],  color:"#909030"},
  {id:2, label:"Genuinely Full",    range:[70, 95],  color:"#c06020"},
  {id:3, label:"Stuffed",           range:[95, 120], color:"#c02020"},
  {id:4, label:"Overfull",          range:[120,155], color:"#900020"},
  {id:5, label:"Absolutely Packed", range:[155,999], color:"#500010"},
];
export const getFullnessStage=(pct)=>[...SESSION_FULLNESS_STAGES].reverse().find(s=>pct>=s.range[0])||SESSION_FULLNESS_STAGES[0];

export const SESSION_FULLNESS_DESCS={
  default:[
    s=>`${s.name} is eating easily, comfortably. She has barely started.`,
    s=>`A warmth spreading through her middle. She's been eating a while now, but she's not stopping.`,
    s=>`${s.name} is genuinely full. You can see it — the way she slows slightly, breathes a little heavier. She's eating anyway.`,
    s=>`Her belly is firm and round and very full. She presses her hand briefly against it and then picks her fork back up. "I'm okay," she says, to herself as much as to you.`,
    s=>`She is past full — has been past full for some time. Her belly sits heavily in her lap and her movements have gone slow and deliberate. She takes a breath between each bite. She doesn't stop.`,
    s=>`${s.name} has eaten an extraordinary amount. Her middle is enormous with it — round and tight and warm. She finishes the bite she's on and rests back, hands pressed softly against herself. "I can't believe I ate all of that," she says. She sounds genuinely impressed.`,
  ],
  cheerleader:[
    s=>`${s.name} eats efficiently, like everything she does. Good posture. Squad mentality: commit fully.`,
    s=>`Her cheeks are rosy. She was talking between bites but slower now, more focused on the food than the conversation.`,
    s=>`She's full enough that she's stopped pretending she isn't. Her shirt has ridden up slightly. She pulls it down. Then reaches for more.`,
    s=>`"Okay, I'm pretty full," ${s.name} says. She does not stop eating. The captain finishes what she starts.`,
    s=>`She is visibly overfull. Her belly presses forward, round and taut. She sits straighter to give herself room, which doesn't help. She takes another bite.`,
    s=>`${s.name} sets her fork down for a long moment, both hands resting on the enormous swell of her belly. Then she picks the fork back up. "I'm not done," she says. It sounds like a practice affirmation.`,
  ],
  bookworm:[
    s=>`${s.name} is cross-legged beside her book, eating the way she reads — thoroughly and without looking up.`,
    s=>`She's stopped reading. She's just eating now. Focused, methodical. The book is closed.`,
    s=>`"I've consumed," ${s.name} says precisely, gesturing at her plate, "a non-trivial quantity of food." She keeps eating. Documenting the phenomenon from the inside.`,
    s=>`She is studying her own fullness with the same attention she gives everything else. Pressing her fingers against her stomach. "It's interesting," she says. "Biologically speaking." She takes another bite.`,
    s=>`${s.name} has set aside the scientific detachment. She is simply full, and still eating, and has stopped justifying it.`,
    s=>`She rests her head back and stays still. Then: "I want to note that my previous understanding of my own capacity was clearly incomplete." She has another piece of cake.`,
  ],
  athlete:[
    s=>`${s.name} eats fast — fuel, not pleasure. Making up for it in quantity.`,
    s=>`Halfway through and already breathing differently. Not exertion. She notices. Doesn't say anything.`,
    s=>`"This is a lot of food," she says, without criticism. She finishes the plate and looks at the next one. "Okay."`,
    s=>`She's full the way she used to be after long training sessions — that specific heavy, settled fullness she now recognises from a very different context.`,
    s=>`${s.name} is well past her old limits, and her old limits were genuinely impressive. She keeps going with the grim determination of someone finishing a race.`,
    s=>`She is done. Completely, spectacularly done — belly warm and round, she doesn't move for several minutes. "Okay," she says finally. "I see why you keep doing this."`,
  ],
  influencer:[
    s=>`${s.name} has stopped filming. She eats privately when she eats like this. You are the only audience.`,
    s=>`Her eyes close sometimes between bites. She is genuinely enjoying this in a way that doesn't translate to content.`,
    s=>`"Don't document this," she says, without hostility. You aren't. She eats her enormous plate naturally, without any persona.`,
    s=>`She is full and she looks it and she has long since stopped caring about any of that. "God," she says, "this is good." She means the eating as much as the food.`,
    s=>`${s.name} has abandoned every trained instinct about portion size and imagery. She is simply, enormously, contentedly eating.`,
    s=>`She is sprawled slightly, her bloated middle pressing visibly against her top, and she has the expression of someone who has just discovered something important. "This is who I actually am," she says.`,
  ],
  gamer:[
    s=>`${s.name} eats one-handed. Efficient. She's been doing this for years.`,
    s=>`Both hands on the food now. Too full for multitasking.`,
    s=>`"I don't usually eat this much at once," she says, eating this much at once. "Usually it's spread out over twelve hours."`,
    s=>`She has gone quiet and focused — the specific way she gets during difficult sections. She is not going to lose this.`,
    s=>`${s.name} is breathing through her mouth slightly. Her belly is visibly round, pressing the table edge. She adjusts, keeps eating.`,
    s=>`She rests her controller on her enormous middle — it fits perfectly there, which makes her laugh quietly. "New setup," she says.`,
  ],
  quiet:[
    s=>`${s.name} eats in the comfortable silence she prefers. She is very much in her element.`,
    s=>`She doesn't say anything. She doesn't need to. She just eats.`,
    s=>`She presses her hand against her belly once — not checking, just feeling. Then she keeps eating.`,
    s=>`"I'm full," ${s.name} says quietly. A pause. "Keep going?" She means: will you keep feeding her. The answer is yes.`,
    s=>`She has found a rhythm in being overfull. Slow, careful bites. Long pauses that aren't stopping. She trusts you to know.`,
    s=>`${s.name} sits with her hands resting on her round, full belly, in a silence that is completely comfortable. "Thank you," she says eventually. She means a lot of things at once.`,
  ],
  sorority:[
    s=>`${s.name} eats comfortably, the way she does at every party — like she's exactly where she should be.`,
    s=>`She's starting to slow, but she keeps up a running commentary about the food. Every bite gets a verdict. All verdicts are positive.`,
    s=>`"Okay this is genuinely a lot," she says. She takes another bite. "Like genuinely a lot." Another bite. "Amazing though."`,
    s=>`Her belly is noticeably round now and pressing at her waistband. She undoes the top button of her jeans without comment. "So much better," she announces.`,
    s=>`${s.name} is in deeply committed territory. Her belly is enormous and round and she keeps patting it absently between bites like she's checking in with it.`,
    s=>`She has eaten everything. She is enormous with it. She puts both hands flat on her huge belly and grins. "Okay," she says, "this might be my best night."`,
  ],
  artsy:[
    s=>`${s.name} eats slowly, with attention — the way she experiences everything. She is tasting each bite properly.`,
    s=>`She's gone quiet in a particular way, the way she gets when she's absorbing something. The food is its own kind of sensation.`,
    s=>`"This is very good," she says, with the precision of someone who means the experience, not just the food. She keeps eating.`,
    s=>`Her belly is soft and round and she rests her hand on it like a subject she's considering painting. She keeps eating with the other hand.`,
    s=>`${s.name} has found something in this — she eats overfull with a kind of intense, interior focus, like she's inside a feeling she wants to understand completely.`,
    s=>`She is still for a long time after. Both hands on her enormous full belly. "I want to paint this," she says quietly. "Not me. This. This feeling."`,
  ],
  overachiever:[
    s=>`${s.name} has made a list of what she's eating. Nutritional content. Macros. She is eating it all anyway.`,
    s=>`She has abandoned the list. She is just eating now. This counts as self-care. She has decided.`,
    s=>`"I have consumed significantly more than my target intake," ${s.name} announces. She reaches for more. "Adjusting the target upward."`,
    s=>`She is full in a way that would alarm her previous self. She checks in with herself, adjusts her assessment of what she can handle, and keeps going.`,
    s=>`${s.name} is overfull by any metric and she knows every metric. She has simply decided the metrics don't apply tonight.`,
    s=>`She rests back and breathes carefully, both hands on her vast, tight belly. "New personal record," she says. "I'm going to count this as an achievement."`,
  ],
  transfer:[
    s=>`${s.name} eats with the enthusiasm of someone who has discovered something wonderful about this campus.`,
    s=>`"We didn't have anything like this back home," she says, taking another enormous bite. "I mean we had food. Not like this."`,
    s=>`She is full and she keeps going, the way she approaches everything new here — thoroughly, without reservation.`,
    s=>`Her belly is round and soft and she pats it happily. "I'm so glad I transferred," she says. She means many things at once.`,
    s=>`${s.name} is seriously, impressively full and she keeps eating with the dedication of someone who doesn't want to miss anything.`,
    s=>`She is enormous with food and deeply, completely happy about it. "I feel like I'm home," she says. It's unclear whether she means here or in her body. Both, probably.`,
  ],
};

export const ENCOURAGEMENT_ACTIONS=[
  {id:"enc_praise",    label:"\"You're doing so well\"",
   line:(s,fPct)=>fPct<70
     ?`"You're doing so well," you say. ${s.name} looks up at you — pleased and a little distracted from her fullness — and keeps eating.`
     :`"You're doing so well," you say. ${s.name} lets out a slow breath. "I feel like I'm going to burst," she says. She takes another bite. "Keep saying that."`,
   toleranceBoost:12, relBonus:2, lbsBonus:[0,1]},
  {id:"enc_body",      label:"Tell her how she looks",
   line:(s,fPct)=>fPct<90
     ?`You describe what you see. ${s.name} goes still for a moment, then something in her posture changes — she takes up more space, holds herself more fully. She eats with more confidence.`
     :`You describe exactly what she looks like right now — full and round and warm and impossibly appealing. ${s.name}'s expression goes soft. "Keep watching," she says. She keeps eating.`,
   toleranceBoost:18, relBonus:4, lbsBonus:[1,2]},
  {id:"enc_just_more", label:"\"Just a little more\"",
   line:(s,fPct)=>fPct<95
     ?`"Just a little more," you say. ${s.name} raises an eyebrow, then reaches for the food. The little more is considerably more than a little.`
     :`"Just a little more," you say. ${s.name} gives you a long look. Her belly is round and full and enormous. "You always say that," she says. She eats the little more.`,
   toleranceBoost:8, relBonus:2, lbsBonus:[1,3]},
  {id:"enc_made_you",  label:"\"I made this for you\"",
   line:(s,fPct)=>`"I made this specifically for you," you say. ${s.name} looks at the food differently now — something shifts. She eats it. She always eats what you've made for her.`,
   toleranceBoost:22, relBonus:4, lbsBonus:[1,2]},
  {id:"enc_beautiful", label:"\"Your body is beautiful\"",
   line:(s,fPct)=>fPct<100
     ?`You tell her how beautiful she is right now. She blinks. Then she keeps eating, with something more settled in her expression. She believes you.`
     :`You tell her exactly how beautiful she is — how full and round and present she is in her body right now. ${s.name} closes her eyes. "I know," she says. Her hand rests on her belly. She reaches for more.`,
   toleranceBoost:25, relBonus:6, lbsBonus:[0,2]},
  {id:"enc_belly",     label:"Describe her belly to her",
   line:(s,fPct)=>fPct<80
     ?`You describe the soft, gentle swell of her belly — how it's grown through the meal, how warm and round it looks. ${s.name}'s cheeks colour. She doesn't stop eating.`
     :`You describe her belly carefully and specifically — the roundness, the firmness, the way it sits in her lap with real weight. ${s.name} looks down at herself. Then at you. "You really see it," she says. She keeps eating, slower now, like she's savouring both things at once.`,
   toleranceBoost:20, relBonus:5, lbsBonus:[0,2]},
];

export const SESSION_AFTERMATH=[
  {key:"light", maxPct:60,
   scene:(s)=>`${s.name} is full and comfortable and loose-limbed with it. She eats the last few bites slowly, without urgency. "I'm glad I came," she says. You both know this will happen again.`},
  {key:"full",  maxPct:95,
   scene:(s)=>`${s.name} leans back and stays back, both hands resting on her full, round belly. She breathes carefully. "I can't move," she says. She doesn't try. Eventually you cover her with a blanket and let her sleep where she's sitting.`},
  {key:"stuffed",maxPct:140,
   scene:(s)=>`${s.name} has gone very still, the way people do when they're genuinely, spectacularly full. Her belly is a round, warm mass. She presses her hands flat against it. "I ate everything," she says, in quiet wonder. "I always eat everything." She sounds glad.`},
  {key:"packed", maxPct:999,
   scene:(s)=>`You don't speak for a while. ${s.name} is enormous with food — her belly rounded and firm and extraordinary. She keeps her hands on it, feeling its weight, its warmth, its absoluteness. "This is what I want," she says eventually. It's not clear if she means the food or something bigger. You think maybe both.`},
];
export const getAftermath=(fPct)=>SESSION_AFTERMATH.find(a=>fPct<=a.maxPct)||SESSION_AFTERMATH[SESSION_AFTERMATH.length-1];


export const DINNER_VENUES = [
  { id:"bistro",    label:"🥖 Campus Bistro",      tier:1, baseCourses:2, gainRange:[4,8],
    desc:"Cosy neighbourhood bistro. Good portions, comfortable atmosphere.",
    dishes:[
      { id:"soup_bread", label:"Soup & Bread Board", gain:[1,3], fullness:12, desc:"Thick potato soup with a full bread board." },
      { id:"pasta",      label:"Pasta Carbonara",    gain:[2,4], fullness:22, desc:"Generous portion, rich sauce, topped with parmesan." },
      { id:"salad_big",  label:"'House Salad'",      gain:[1,2], fullness:8,  desc:"Technically a salad. More cheese than greens." },
    ] },
  { id:"italian",   label:"🍝 Rosetti's Italian",  tier:1, baseCourses:3, gainRange:[5,10],
    desc:"Family Italian. Courses keep coming until you say stop — which you won't.",
    dishes:[
      { id:"bruschetta",  label:"Antipasto Board",   gain:[2,4], fullness:14, desc:"Bruschetta, olives, cured meats, fresh bread." },
      { id:"risotto",     label:"Truffle Risotto",   gain:[3,5], fullness:22, desc:"Enormous bowl. Extremely rich." },
      { id:"lasagne",     label:"House Lasagne",     gain:[3,6], fullness:28, desc:"Three layers. A complete structure of food." },
      { id:"tiramisu",    label:"Tiramisu",          gain:[1,3], fullness:12, desc:"Full portion. She does not need encouragement." },
    ] },
  { id:"steakhouse",label:"🥩 The Grill Room",     tier:2, baseCourses:3, gainRange:[6,12],
    desc:"Traditional steakhouse. Portions are architectural.",
    dishes:[
      { id:"shrimp_cocktail", label:"Shrimp Cocktail",  gain:[1,3], fullness:9,  desc:"A tower of shrimp." },
      { id:"ribeye",          label:"18oz Ribeye",      gain:[4,7], fullness:35, desc:"An enormous steak. Served with three sides by default." },
      { id:"loaded_potato",   label:"Loaded Baked Potato", gain:[2,4], fullness:18, desc:"Barely qualifies as a potato anymore." },
      { id:"cheesecake",      label:"NY Cheesecake",    gain:[2,4], fullness:14, desc:"Full slice. Enormous. Rich." },
    ] },
  { id:"french",    label:"🥐 Maison Laurent",     tier:2, baseCourses:4, gainRange:[7,14],
    desc:"Upscale French. Multiple courses mandatory. Chef's feelings are involved.",
    dishes:[
      { id:"amuse",       label:"Amuse-Bouche",        gain:[1,2], fullness:8,  desc:"Five tiny courses that add up to a full meal." },
      { id:"foie_gras",   label:"Foie Gras",           gain:[2,4], fullness:14, desc:"Rich and indulgent. The chef insists on a full portion." },
      { id:"duck_confit", label:"Duck Confit",         gain:[3,6], fullness:28, desc:"Crispy skin, rich meat, enormous portion." },
      { id:"soufle",      label:"Chocolate Soufflé",   gain:[2,4], fullness:12, desc:"Cannot be shared. Will not be shared." },
      { id:"cheese",      label:"Cheese Course",       gain:[2,4], fullness:14, desc:"Seven cheeses. Mandatory." },
    ] },
  { id:"omakase",   label:"🍱 Nakamura Omakase",   tier:2, baseCourses:5, gainRange:[6,12],
    desc:"Japanese omakase. The chef decides. There are many courses. They are all large.",
    dishes:[
      { id:"sashimi",    label:"Sashimi Selection",   gain:[1,3], fullness:10, desc:"Course one. Many pieces." },
      { id:"wagyu",      label:"A5 Wagyu",            gain:[3,5], fullness:24, desc:"The richest beef available. Multiple pieces." },
      { id:"ramen",      label:"Truffle Ramen",       gain:[3,6], fullness:30, desc:"The signature. Extremely rich broth." },
      { id:"mochi",      label:"Mochi & Matcha",      gain:[1,2], fullness:10, desc:"Dessert. Five pieces. She will eat all of them." },
    ] },
  { id:"private_club", label:"🎩 The Meridian Club", tier:3, baseCourses:4, gainRange:[8,16],
    desc:"Member-only private dining club. Portions are described as 'generous' which means 'extraordinary'.",
    dishes:[
      { id:"tasting_menu", label:"Chef's Tasting Menu",  gain:[5,9],  fullness:40, desc:"Seven courses. Non-negotiable." },
      { id:"wagyu_private",label:"Private Reserve Wagyu",gain:[4,7],  fullness:30, desc:"Different wagyu. More of it." },
      { id:"truffle_pasta",label:"Black Truffle Pasta",  gain:[3,6],  fullness:24, desc:"Buried in truffle. Buried in parmesan." },
      { id:"mille_feuille",label:"Mille-Feuille",        gain:[2,4],  fullness:14, desc:"The pastry alone counts as a meal." },
    ] },
  { id:"chefs_table",  label:"👨‍🍳 Chef's Table",        tier:3, baseCourses:5, gainRange:[10,18],
    desc:"Private chef's table. The chef cooks for her specifically. It is excessive.",
    dishes:[
      { id:"personal_menu", label:"Personal Menu",        gain:[6,10], fullness:45, desc:"The chef has designed this entirely around her preferences." },
      { id:"wagyu_special", label:"Wagyu Tasting",        gain:[4,8],  fullness:34, desc:"Four cuts. Each enormous." },
      { id:"dessert_cart",  label:"Full Dessert Cart",    gain:[3,6],  fullness:24, desc:"Every dessert. All of them." },
    ] },
  { id:"home_dinner",  label:"🏡 Professor's Home",    tier:4, baseCourses:6, gainRange:[12,22],
    desc:"An evening at your home. You cook everything. There is no limit to how much you make.",
    dishes:[
      { id:"home_app",    label:"Home Appetisers",    gain:[3,6],  fullness:18, desc:"A full spread before the main event." },
      { id:"home_main",   label:"Main Course",        gain:[5,9],  fullness:40, desc:"Whatever she loves most, in enormous quantity." },
      { id:"home_second", label:"Second Helpings",    gain:[4,8],  fullness:28, desc:"The offer she cannot refuse." },
      { id:"home_dessert",label:"Dessert & More",     gain:[3,7],  fullness:20, desc:"Dessert, then more dessert, then more dessert." },
      { id:"midnight",    label:"Late Night Snacks",  gain:[3,6],  fullness:15, desc:"She's still here. You keep feeding her." },
    ] },
  { id:"brunch_hall",  label:"🥂 The Brunch Palace",  tier:2, baseCourses:3, gainRange:[6,11],
    desc:"Upscale weekend brunch. Bottomless drinks, absurdly generous plates, no concept of portion control.",
    dishes:[
      { id:"eggs_bene",   label:"Eggs Benedict Stack",  gain:[2,5],  fullness:22, desc:"Three layers of egg, hollandaise, and everything else. Per person." },
      { id:"french_toast",label:"French Toast Tower",   gain:[3,6],  fullness:28, desc:"Seven thick slices, caramelized fruit, whipped cream. A monument." },
      { id:"brunch_board",label:"Sharing Board",        gain:[2,4],  fullness:18, desc:"Charcuterie, artisan bread, cheeses, honeycomb. She will not share." },
      { id:"waffle_stack",label:"Waffle Stack",         gain:[2,5],  fullness:24, desc:"Four waffles stacked high with everything sweet. Aggressively indulgent." },
    ] },
  { id:"atelier",      label:"🌟 The Atelier",         tier:4, minStage:6, baseCourses:5, gainRange:[14,26],
    desc:"A private, fully accessible luxury dining suite. No standard seating — custom arrangements for every guest. The chef comes to you. Designed for guests who find conventional restaurants inconvenient.",
    dishes:[
      { id:"atelier_welcome", label:"Welcome Spread",   gain:[4,8],  fullness:22, desc:"An entire table of small luxuries arranged by the chef on arrival." },
      { id:"atelier_main",    label:"Custom Main",      gain:[6,11], fullness:42, desc:"The chef designs the course entirely around her. This always results in something enormous." },
      { id:"atelier_cheese",  label:"Artisan Cheese Cart", gain:[3,6], fullness:18, desc:"The cart is wheeled to her position. She waves away the menu and takes from all of them." },
      { id:"atelier_dessert", label:"Dessert Tasting",  gain:[4,7],  fullness:28, desc:"Six desserts. Not a selection — all six. The chef insists." },
      { id:"atelier_nightcap",label:"Late Indulgence",  gain:[3,6],  fullness:16, desc:"She hasn't moved. More food arrives. This is the point of the place." },
    ] },
];

export const DINNER_CONVERSATION = [
  // { id, label, requires (skill or null), text:(s,stageId)=>str, gainBonus, relBonus }
  { id:"compliment_appetite", label:"Compliment her appetite",  requires:null,
    text:(s,st)=>st<=2
      ? `You mention how much she's enjoying herself. ${s.name} flushes slightly but picks up her fork with renewed purpose.`
      : st<=5 ? `"I love watching you eat," you say. ${s.name} grins without looking up from her plate. "Then keep watching." She takes an enormous bite.`
      : `"You eat beautifully," you tell her. ${s.name} laughs warmly. "I know. It's my best quality." She gestures for more bread.`,
    gainBonus:[1,3], relBonus:3 },

  { id:"suggest_second",      label:"Suggest a second helping", requires:null,
    text:(s,st)=>st<=2
      ? `"You should try the other dish," you suggest. ${s.name} hesitates, then: "You know what, yes. Why not."`
      : st<=5 ? `"More?" ${s.name} is already raising her hand for the waiter. "I was already going to, but thank you for the permission."`
      : `You gesture at her nearly empty plate. "Again?" ${s.name} pats her enormous middle contentedly. "Obviously."`,
    gainBonus:[2,5], relBonus:2 },

  { id:"food_talk_dinner",    label:"Talk about the food",      requires:null,
    text:(s,st)=>`You and ${s.name} spend ten minutes discussing the dish in detail. She is an enthusiastic critic. She demonstrates her critique by eating more of it.`,
    gainBonus:[1,3], relBonus:3 },

  { id:"order_for_her",       label:"Order for her",            requires:"dinner_upscale",
    text:(s,st)=>st<=3
      ? `You order before she can deliberate too long — all the richest options, extra courses. ${s.name} raises her eyebrows. "That's a lot." She says it like a compliment.`
      : `You order for the table. Extensively. ${s.name} watches the dishes arrive with visible pleasure. "You know exactly what you're doing," she says. "I appreciate that."`,
    gainBonus:[3,6], relBonus:4 },

  { id:"wine_and_cheese",     label:"Insist on cheese course",  requires:"dinner_upscale",
    text:(s,st)=>`"We're having the cheese course," you say. It is not a question. ${s.name} settles back with a smile. "Obviously we are." The board that arrives is enormous. She works through all of it.`,
    gainBonus:[2,5], relBonus:3 },

  { id:"overcomes_hesitation",label:"Talk her through hesitation",requires:null,
    text:(s,st)=>st<=2
      ? `${s.name} glances at the menu uncertainly. "I shouldn't really—" You remind her she deserves a good meal. She considers this. Orders the larger option.`
      : st<=4 ? `${s.name} pauses mid-plate, looking at herself. "I've eaten so much." You tell her she's doing wonderfully. She laughs and keeps going.`
      : `${s.name} is full — visibly, obviously full. "I literally cannot," she says. You slide the dessert menu toward her. She opens it. "Fine." She eats it all.`,
    gainBonus:[2,4], relBonus:4 },

  { id:"body_compliment",     label:"Compliment how she looks", requires:null,
    text:(s,st)=>st<=1
      ? `You tell ${s.name} she looks wonderful tonight. She blinks, then smiles and takes a large bite of her food. "Thank you." She sounds like she means it.`
      : st<=4 ? `You tell ${s.name} she looks incredible. She pats her very round belly and grins. "I've been working on it." She takes another bite. "Still working on it, actually."`
      : `You tell ${s.name} she looks spectacular. She spreads her hands across her enormous, soft middle and raises an eybrow. "I know," she says simply. She resumes eating with great satisfaction.`,
    gainBonus:[1,3], relBonus:5 },

  { id:"personal_chef_story", label:"Tell her about the chef",  requires:"dinner_private",
    text:(s,st)=>`You tell ${s.name} the chef prepared the menu specifically around her preferences. She goes still for a moment, then something in her expression shifts. "Really?" You nod. She looks at her plate differently now — with something more personal — and eats every last bite.`,
    gainBonus:[2,5], relBonus:5 },

  { id:"endless_courses",     label:"Keep ordering courses",    requires:"dinner_private",
    text:(s,st)=>`Every time ${s.name} finishes a dish you signal for another. She notices after the fourth course. "Are you just going to keep ordering?" You shrug. She laughs. "Okay." She doesn't stop eating for another two hours.`,
    gainBonus:[4,8], relBonus:4 },

  { id:"praise_capacity",     label:"Express amazement at her appetite", requires:null,
    text:(s,st)=>st<=2
      ? `"I'm impressed," you say. ${s.name} grins and finishes the dish. "I've always eaten a lot." She orders another.`
      : st<=5 ? `"I genuinely cannot believe how much you've eaten," you say. ${s.name} looks down at herself, at the pile of empty plates, and laughs. "I can." She orders dessert.`
      : `You survey the wreckage of the table. "That was extraordinary." ${s.name} pats her vast belly with a look of absolute serenity. "I'm just getting started," she says — and means it.`,
    gainBonus:[2,4], relBonus:4 },

  { id:"ask_passion",         label:"Ask about what she loves", requires:null,
    text:(s,st)=>{
      const roleLines={"Cheer Captain":`You ask about the squad. ${s.name}'s whole posture changes. "We're building something," she says. "A legacy." She describes tryout strategy for ten minutes. At some point the entire main course disappears without her noticing.`,"Dance Co-Captain":`You ask about her choreography. ${s.name} puts her fork down entirely — which she hasn't done all evening — and starts describing a movement sequence with her hands. "I want it to feel inevitable," she says. She picks up her fork and finishes everything on the plate.`,"Track Sprinter":`You ask about running. ${s.name} is quiet for a moment. "I miss it less than I thought I would," she says finally. "I still dream about it sometimes." She takes a large bite. "But this is also good."`, "Basketball Star":`You ask about basketball. ${s.name} laughs. "God. I think about the game differently now — like, I watch it differently." She tilts her head. "I'm kind of glad I'm not playing right now. I'd be a liability." She pats herself. "A comfortable liability."`, default:`You ask what she's most passionate about right now. ${s.name} looks genuinely pleased by the question. She talks for twenty minutes — animated, specific, completely unselfconscious. At some point she's eaten the entire main course without noticing.`};
      return roleLines[s.role]||roleLines.default;
    },
    gainBonus:[2,4], relBonus:5, fullnessEffect:-8 },

  { id:"talk_genuinely",      label:"Ask how she's really doing", requires:null,
    text:(s,st)=>st<=2
      ? `You set the menu down and actually ask. ${s.name} looks surprised. Then she talks — really talks — about her semester, things outside of class. She's more present than usual. She also keeps eating through it, almost unconsciously.`
      : `You turn the conversation to her, genuinely. ${s.name} pauses, then opens up. Something real passes between you. She eats steadily through the whole thing, comfortable and unhurried. She finishes three courses before she realizes.`,
    gainBonus:[1,4], relBonus:6, fullnessEffect:-5 },

  { id:"toast_together",      label:"Propose a toast", requires:null,
    text:(s,st)=>`You raise your glass. "To good food and good company." ${s.name} looks at you for a moment, then lifts her glass. The toast is simple, but something settles between you — warm and unhurried. She eats more after that.`,
    gainBonus:[1,3], relBonus:4, fullnessEffect:-4 },

  { id:"share_a_dish",        label:"Order something to share", requires:null,
    text:(s,st)=>st<=3
      ? `You order a dish for the table. "We can share." ${s.name} looks at it and, after a beat, reaches in. "Okay." She eats most of it.`
      : `You order an extra dish between you. ${s.name} looks delighted. "Perfect." She eats significantly more than half. You don't point this out.`,
    gainBonus:[2,5], relBonus:3, fullnessEffect:6 },

  { id:"after_dinner_stroll", label:"Suggest staying for another course", requires:null,
    text:(s,st)=>st<=3
      ? `"We should do the cheese course," you say. ${s.name} pauses. "I don't — " She looks at the menu. "Actually. Yes. Obviously yes."`
      : st<=6 ? `"I'm going to get more," you say. "Obviously I'm joining you," ${s.name} says. She did not need the invitation.`
      : `You gesture toward the dessert menu. ${s.name} already has it. "I've been reading it for five minutes," she says. "Let's do all of it."`,
    gainBonus:[3,7], relBonus:3, fullnessEffect:10 },

  { id:"awkward_comment",     label:"Comment on her portions", requires:null,
    text:(s,st)=>st<=2
      ? `"That's... quite a lot," you say. ${s.name}'s expression flickers. "I know," she says, shortly. She puts her fork down and picks it up again more slowly. The evening is a degree cooler now.`
      : `You gesture at her plate. "You've really eaten a lot tonight." ${s.name} gives you a flat look. "Yes. I have." She continues eating, but something in the warmth has shifted.`,
    gainBonus:[0,0], relBonus:-5, offenseRisk:2, fullnessEffect:0 },

  { id:"suggest_diet",        label:"Point out the lighter option", requires:null,
    text:(s,st)=>st<=1
      ? `You mention there's a lighter option on the menu. ${s.name} glances at it, then at what she'd already chosen. "I'll stick with what I ordered, thanks." She eats it with slightly more purpose than before.`
      : `You gesture toward the salad section. ${s.name} puts her fork down. Very deliberately. "I'm sorry?" A beat. "I know what's on the menu." Another beat. "I don't need the recommendation."`,
    gainBonus:[0,0], relBonus:-8, offenseRisk:3, fullnessEffect:0 },

  { id:"ask_about_weight",    label:"Ask about the gaining", requires:null,
    text:(s,st)=>st<=2
      ? `You ask lightly whether she's noticed any changes lately. ${s.name} stiffens slightly. "I mean... yeah." She looks at her food. "Are you asking that at dinner?" There's an edge now.`
      : st<=5 ? `You bring it up. ${s.name} puts her fork down. "I know," she says, flatly. "I'm here." She picks the fork back up but the ease of the evening has changed.`
      : `You comment on it. ${s.name} gives you a long, measuring look. "I was having a very good time," she says. "You should be more careful with your dinner conversation." She eats, but something is cooler.`,
    gainBonus:[0,0], relBonus:-6, offenseRisk:2, fullnessEffect:0 },

  { id:"second_table",        label:"Move to a more comfortable spot", requires:"dinner_private",
    text:(s,st)=>st<=4
      ? `You suggest a more private corner table. ${s.name} appreciates the gesture. The move is easy, the new spot better. She orders again as soon as she sits.`
      : `You notice she's shifted twice to accommodate herself in the standard chair, and quietly arrange a better setup. ${s.name} settles in. "How did you know?" You shrug. She eats considerably more after that.`,
    gainBonus:[2,4], relBonus:5, fullnessEffect:-6 },
];


export const ACHIEVEMENT_LIST = [
  { id:"first_gain",    label:"🌱 First Feeding",       desc:"Successfully feed a student for the first time.",            check:(sts)=>sts.some(s=>s.lbs>s.startLbs) },
  { id:"stage2",        label:"📈 Chubby Club",         desc:"Any student reaches the Chubby stage.",                     check:(sts)=>sts.some(s=>getStage(s.lbs).id>=3) },
  { id:"stage4",        label:"🍔 Heavy Hitter",        desc:"Any student reaches Heavy.",                                check:(sts)=>sts.some(s=>getStage(s.lbs).id>=5) },
  { id:"stage6",        label:"🛋️ Couch Queen",        desc:"Any student reaches Very Fat.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=7) },
  { id:"stage8",        label:"🏠 Immovable Object",   desc:"Any student reaches Immobile.",                             check:(sts)=>sts.some(s=>getStage(s.lbs).id>=9) },
  { id:"stage9",        label:"🌕 Blob Status",         desc:"Any student reaches Blob.",                                 check:(sts)=>sts.some(s=>getStage(s.lbs).id>=10) },
  { id:"all_soft",      label:"🫧 Soft Semester",       desc:"All students reach at least Soft.",                         check:(sts)=>sts.every(s=>getStage(s.lbs).id>=2) },
  { id:"all_chubby",    label:"🥧 Chubby Class",        desc:"All students reach at least Chubby.",                       check:(sts)=>sts.every(s=>getStage(s.lbs).id>=3) },
  { id:"all_plump",     label:"🍮 Plump Roster",        desc:"All students reach at least Plump.",                        check:(sts)=>sts.every(s=>getStage(s.lbs).id>=4) },
  { id:"total100",      label:"💯 Century Club",        desc:"Total class weight gain reaches 100 lbs.",                  check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=100 },
  { id:"total500",      label:"🎖️ Five Hundred",        desc:"Total class weight gain reaches 500 lbs.",                  check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=500 },
  { id:"total1000",     label:"🏆 One Thousand",        desc:"Total class weight gain reaches 1,000 lbs.",                check:(sts)=>sts.reduce((a,s)=>a+(s.lbs-s.startLbs),0)>=1000 },
  { id:"rel_max",       label:"❤️ Beloved Professor",  desc:"Any student reaches 100% relationship.",                    check:(sts)=>sts.some(s=>s.relationship>=100) },
  { id:"all_rel50",     label:"💜 Well-Loved",          desc:"All students at 50%+ relationship.",                        check:(sts)=>sts.every(s=>s.relationship>=50) },
  { id:"narrative5",    label:"📖 Storyteller",         desc:"Trigger 5 narrative events.",                               check:(sts,g)=>g.narrativeCount>=5 },
  { id:"narrative10",   label:"📚 Epic Saga",           desc:"Trigger 10 narrative events.",                              check:(sts,g)=>g.narrativeCount>=10 },
];
