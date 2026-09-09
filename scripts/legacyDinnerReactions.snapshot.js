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
    transfer:`${neglected.name} glances at ${fed.name}'s plate with a slight frown. "At my last campus," she starts, then doesn't finish. She doesn't need to.`,
  };
  return m[neglected.archetype]||`${neglected.name} looks meaningfully at ${fed.name}'s food and then at her own empty place setting.`;
};

export const GROUP_CONVERSATIONS=[
  { id:"get_them_talking", label:"Get them talking", relBonus:4, fullnessEffect:-4 },
  { id:"compliment_both", label:"Compliment them both", relBonus:3, fullnessEffect:0 },
  { id:"let_it_settle", label:"Let it settle", relBonus:2, fullnessEffect:5 },
  { id:"toast_together_group", label:"Toast the evening", relBonus:4, fullnessEffect:-3 },
  { id:"order_for_table", label:"Order another round", relBonus:3, fullnessEffect:8 },
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
