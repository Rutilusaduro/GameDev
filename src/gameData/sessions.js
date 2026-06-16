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

export const GROUP_CONVERSATIONS=[
  { id:"get_them_talking", label:"Get them talking", relBonus:4, fullnessEffect:-4 },
  { id:"compliment_both", label:"Compliment them both", relBonus:3, fullnessEffect:0 },
  { id:"let_it_settle", label:"Let it settle", relBonus:2, fullnessEffect:5 },
  { id:"toast_together_group", label:"Toast the evening", relBonus:4, fullnessEffect:-3 },
  { id:"order_for_table", label:"Order another round", relBonus:3, fullnessEffect:8 },
];

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
  { id:"compliment_appetite", label:"Compliment her appetite", requires:null, gainBonus:[1,3], relBonus:3 },
  { id:"suggest_second", label:"Suggest a second helping", requires:null, gainBonus:[2,5], relBonus:2 },
  { id:"food_talk_dinner", label:"Talk about the food", requires:null, gainBonus:[1,3], relBonus:3 },
  { id:"order_for_her", label:"Order for her", requires:"dinner_upscale", gainBonus:[3,6], relBonus:4 },
  { id:"wine_and_cheese", label:"Insist on cheese course", requires:"dinner_upscale", gainBonus:[2,5], relBonus:3 },
  { id:"overcomes_hesitation", label:"Talk her through hesitation", requires:null, gainBonus:[2,4], relBonus:4 },
  { id:"body_compliment", label:"Compliment how she looks", requires:null, gainBonus:[1,3], relBonus:5 },
  { id:"personal_chef_story", label:"Tell her about the chef", requires:"dinner_private", gainBonus:[2,5], relBonus:5 },
  { id:"endless_courses", label:"Keep ordering courses", requires:"dinner_private", gainBonus:[4,8], relBonus:4 },
  { id:"praise_capacity", label:"Express amazement at her appetite", requires:null, gainBonus:[2,4], relBonus:4 },
  { id:"ask_passion", label:"Ask about what she loves", requires:null, gainBonus:[2,4], relBonus:5, fullnessEffect:-8 },
  { id:"talk_genuinely", label:"Ask how she's really doing", requires:null, gainBonus:[1,4], relBonus:6, fullnessEffect:-5 },
  { id:"toast_together", label:"Propose a toast", requires:null, gainBonus:[1,3], relBonus:4, fullnessEffect:-4 },
  { id:"share_a_dish", label:"Order something to share", requires:null, gainBonus:[2,5], relBonus:3, fullnessEffect:6 },
  { id:"after_dinner_stroll", label:"Suggest staying for another course", requires:null, gainBonus:[3,7], relBonus:3, fullnessEffect:10 },
  { id:"awkward_comment", label:"Comment on her portions", requires:null, gainBonus:[0,0], relBonus:-5, offenseRisk:2, fullnessEffect:0 },
  { id:"suggest_diet", label:"Point out the lighter option", requires:null, gainBonus:[0,0], relBonus:-8, offenseRisk:3, fullnessEffect:0 },
  { id:"ask_about_weight", label:"Ask about the gaining", requires:null, gainBonus:[0,0], relBonus:-6, offenseRisk:2, fullnessEffect:0 },
  { id:"second_table", label:"Move to a more comfortable spot", requires:"dinner_private", gainBonus:[2,4], relBonus:5, fullnessEffect:-6 },
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
  { id:"aib_notice",    label:"👁 Under Watch",         desc:"Academic Inquiry Board takes notice.",                      check:(sts,g)=>!!g.aibUnlocked },
  { id:"hearing_won",   label:"⚖️ Hearing Denied",      desc:"Win a removal or emergency hearing.",                       check:(sts,g)=>(g.oppositionHearingsWon||0)>=1 },
  { id:"aib_first_hearing", label:"⚖️ First Hearing", desc:"Survive your first Board hearing.", check:(sts,g)=>(g.oppositionHearingsWon||0)>=1 },
  { id:"act_trigger", label:"👻 Act Triggered", desc:"Trigger the Supernatural Act.", check:(sts,g)=>!!g.supernaturalAct },
  { id:"board_capture", label:"📎 Board Capture", desc:"Compromise three board members.", check:(sts,g)=>(g.boardCompromised||0)>=3 },
  { id:"supernatural",  label:"👻 Thin Hunger", desc:"Trigger the Supernatural Act.", check:(sts,g)=>!!g.supernaturalAct },
  { id:"scarcity_banished", label:"🕯️ Scarcity Banished", desc:"Reduce scarcity pressure to zero after the Act.", check:(sts,g)=>!!g.scarcityBanished },
  { id:"institutional_capture", label:"🏛️ Full Capture", desc:"Compromise four board members — scarcity capped.", check:(sts,g)=>!!g.institutionalCapture },
  { id:"vance_compromised", label:"📎 Chair Compromised", desc:"Dr. Vance becomes compromised.", check:(sts,g)=>!!g.vanceCompromised },
  { id:"board_feast", label:"🍷 Board Feast", desc:"Feast bribe during Investigation scrutiny.", check:(sts,g)=>!!g.boardFeastInvestigation },
  { id:"all_thin", label:"🌫️ All Thin", desc:"Every evolved student ascends.", check:(sts,g)=>!!g.allThinAscended },
  { id:"refeed_god", label:"✨ Refeed God", desc:"Complete the Voluptuous Banishment path.", check:(sts,g)=>!!g.scarcityBanished },
  { id:"lilith_saint", label:"🩸 Portion Saint", desc:"Lilith devours the Portion Saint.", check:(sts,g)=>!!g.lilithSaint },
  { id:"synthesis_ally", label:"✨ Hungry Angel", desc:"Achieve Synthesis — all evolved students ascended with pharmacist stage 4.", check:(sts,g)=>!!g.synthesisAlly },
];
