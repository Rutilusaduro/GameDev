// ═══════════════════════════════════════════════════════════════
// FACULTY LOUNGE — fellow teachers, each with a unique dialogue tree
// Tree shape: nodes keyed by id; node = { text:(t)=>str, options:[
//   { label, next:"nodeId" | end:true, affinity:+n, minAffinity? } ] }
// Affinity (0-100) persists per teacher and gates deeper branches.
// ═══════════════════════════════════════════════════════════════

export const FACULTY = [
  {
    id:"hartley", name:"Dr. Imogen Hartley", emoji:"🏺", color:"#9a7ab8",
    role:"Classics", homeZone:"library",
    desc:"Precise, tweedy, devastatingly well-read. Maintains a strict public persona and a desk drawer of contraband marzipan.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`Hartley closes her book without marking the page — for you, an honor. "Professor. I've been defending your curriculum at meetings again. Sit. There may be marzipan."`
          :`Dr. Hartley looks up over her glasses, marking her page with one finger. "Professor. To what do I owe the interruption — pleasant as it is."`,
        options:[
          {label:"Ask about her research", next:"research"},
          {label:"Mention the catering budget", next:"catering", affinity:2},
          {label:"Ask about the marzipan drawer", next:"marzipan", minAffinity:30},
          {label:"Take your leave", end:true},
        ]},
      research:{ text:()=>`"Banquets, actually," she says, warming instantly. "Roman convivia. The sources are obsessed with excess — flamingo tongues, dormice in honey. We pretend to be scandalized." She taps the page. "We are not scandalized. We are taking notes."`,
        options:[
          {label:"\"The classics knew how to eat.\"", next:"agree", affinity:4},
          {label:"Back", next:"hub"},
        ]},
      agree:{ text:()=>`Something unclenches in her posture. "Precisely. There was no virtue in smallness then. Abundance was the entire point of civilization." She catches herself enjoying the thought, and does not entirely stop. "You understand things, Professor. It's disarming."`,
        options:[ {label:"Back", next:"hub"} ]},
      catering:{ text:()=>`Hartley sighs the sigh of a woman who has read the minutes. "The committee debates pennies while the dining hall runs like a Roman triumph. I've stopped objecting." A pause. "I've started attending, frankly. The bread program alone."`,
        options:[
          {label:"\"I'll save you a seat at the next feast.\"", next:"seat", affinity:5},
          {label:"Back", next:"hub"},
        ]},
      seat:{ text:()=>`A real smile escapes before protocol catches it. "That would be — acceptable." She smooths her skirt, which has been fitting differently this term, a fact she has elected not to research. "I do find I have more appetite for these things lately. The feasts. The era. All of it."`,
        options:[ {label:"Back", next:"hub"} ]},
      marzipan:{ text:()=>`She regards you for a long moment, then unlocks the drawer with a tiny brass key. Inside: marzipan fruits arranged like museum pieces. "You will tell no one," she says, handing you a tiny peach and taking three for herself. "Tenure has few pleasures. I've decided to stop rationing the ones I have."`,
        options:[
          {label:"\"Your secret's safe. Have mine too.\"", next:"yours", affinity:6},
          {label:"Back", next:"hub"},
        ]},
      yours:{ text:()=>`Hartley accepts your marzipan peach with the gravity of a state gift, and eats it with none. "You are a corrupting influence, Professor," she says, dabbing her lips, eyes bright. "Do continue."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
  {
    id:"brooks", name:"Coach Dana Brooks", emoji:"🏈", color:"#d08030",
    role:"Athletics", homeZone:"gym",
    desc:"Booming voice, crushing handshake, eats like a linebacker and coaches like a poet. The juice bar answers to her.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`Brooks waves you over mid-protein-shake. "There he is! Pull up a bench. I ordered the big one, you can have half. Kidding. Get your own."`
          :`Coach Brooks gives you a nod and a once-over, like she's assessing your squat depth. "Professor. You eat today? You look like you skipped lunch. Fix that."`,
        options:[
          {label:"Ask about the team", next:"team"},
          {label:"Ask about the juice bar's new menu", next:"juicebar", affinity:2},
          {label:"\"Settle something: bulking season?\"", next:"bulk", minAffinity:30},
          {label:"Head out", end:true},
        ]},
      team:{ text:()=>`"Strongest roster I've ever had," Brooks says, and slaps the table. "You know why? They EAT now. I spent years fighting girls about food. This year something changed — they come in hungry and they leave huge and they lift like it." She squints at you. "You wouldn't know anything about that."`,
        options:[
          {label:"\"A rising tide of appetite lifts all boats.\"", next:"tide", affinity:4},
          {label:"Back", next:"hub"},
        ]},
      tide:{ text:()=>`Brooks barks a laugh that turns heads three tables over. "HA! Stealing that for the locker room board." She drains her shake. "Whatever's in the water, Professor, keep it coming. Mass moves mass."`,
        options:[ {label:"Back", next:"hub"} ]},
      juicebar:{ text:()=>`"Glad you asked." She produces a laminated menu with the pride of a new parent. "The Goliath: twenty-two hundred calories, tastes like a birthday. I have two a day. Doctor said my bloodwork's perfect and my bench is up. Science is easy when you commit."`,
        options:[
          {label:"Order two Goliaths — your treat", next:"goliath", affinity:6},
          {label:"Back", next:"hub"},
        ]},
      goliath:{ text:()=>`Brooks watches you attempt yours with open delight, finishing hers in the time it takes you to find the straw. "Atta boy. You know, half this faculty acts scared of food. You get it." She claps your shoulder; you feel it in your teeth. "You're alright, Professor."`,
        options:[ {label:"Back", next:"hub"} ]},
      bulk:{ text:()=>`Brooks leans in, suddenly conspiratorial. "Between us? It's ALWAYS bulking season. Cutting is a myth invented by sad people." She pats her own well-built middle, which has been winning its long argument with her waistband for a few semesters. "Power needs padding. Tell your students. Tell everyone."`,
        options:[
          {label:"\"I do. Constantly.\"", next:"constantly", affinity:6},
          {label:"Back", next:"hub"},
        ]},
      constantly:{ text:()=>`"I KNEW it." She points the empty shake cup at you like a trophy. "Hartley owes me ten bucks. We bet on which department was making everyone thick and happy." A grin like a stadium light. "Mine's second. Yours is first. Respect."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
  {
    id:"mori", name:"Professor Yuki Mori", emoji:"🔬", color:"#60b0c8",
    role:"Food Science", homeZone:"science_wing",
    desc:"Runs the food science lab like a Michelin test kitchen. Speaks softly, measures everything, samples everything twice.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`Mori is plating something experimental and slides a fork across the bench before you say a word. "Trial forty-one. You have excellent timing — you always do. Taste."`
          :`Professor Mori looks up from a tray of identical custards, pen between her teeth. "Professor. Careful where you stand — everything in this room is data."`,
        options:[
          {label:"Ask what she's working on", next:"work"},
          {label:"Volunteer as a taste tester", next:"taste", affinity:3},
          {label:"Propose a joint study", next:"study", minAffinity:35},
          {label:"Leave her to the data", end:true},
        ]},
      work:{ text:()=>`"Satiety suppression," she says, matter-of-fact. "Foods engineered so the stop signal arrives late. Or never." She gestures at the custards. "Commercially, a scandal. Scientifically?" A small, private smile. "Delicious problem."`,
        options:[
          {label:"\"What's your success rate?\"", next:"rate", affinity:4},
          {label:"Back", next:"hub"},
        ]},
      rate:{ text:()=>`Mori consults a clipboard she clearly doesn't need. "Test subjects finish, on average, 240% of intended portions. One research assistant ate her own control group." The smile again, slightly wider. "I had to order new lab coats. Sizes up. The grant committee asked no questions."`,
        options:[ {label:"Back", next:"hub"} ]},
      taste:{ text:()=>`Her eyes do something complicated and pleased. "A volunteer with academic credentials. Sit." What follows is forty minutes of spoons, careful notes, and dishes that taste like more. "Interesting," she murmurs, watching you reach unprompted for a third helping of trial nineteen. "Very interesting."`,
        options:[
          {label:"\"Sign me up for the full protocol.\"", next:"protocol", affinity:6},
          {label:"Back", next:"hub"},
        ]},
      protocol:{ text:()=>`"The full protocol is twelve weeks," Mori says, already writing your name. "Most subjects gain. All subjects return." She caps her pen. "I'll note that you understood the terms and smiled. For the file."`,
        options:[ {label:"Back", next:"hub"} ]},
      study:{ text:()=>`Mori sets down her pen entirely, which from her is a standing ovation. "A cross-departmental appetite study. Your cohort's... remarkable outcomes, my instrumentation." She extends a hand. "I've been watching your students' trajectories for three semesters, Professor. The curves are beautiful. I want the methodology."`,
        options:[
          {label:"Shake on it — share (some) methodology", next:"shake", affinity:8},
          {label:"Back", next:"hub"},
        ]},
      shake:{ text:()=>`Her handshake is precise, like everything else. "Partners, then. I'll bring the engineered desserts. You bring whatever it is you bring — and one day you'll tell me what that is." She picks her pen back up. "No rush. The data will tell me first."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
  {
    id:"abara", name:"Dr. Celeste Abara", emoji:"🧠", color:"#b85890",
    role:"Psychology", homeZone:"lecture_hall",
    desc:"Reads rooms, reads people, is currently reading you. Finds the campus's recent transformation fascinating rather than alarming.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`Abara has two coffees waiting, one positioned for you. "I pattern-matched your schedule," she says, unbothered by how that sounds. "Sit. You're my favorite case study and you haven't even signed a consent form."`
          :`Dr. Abara watches you cross the lounge the way a chess player watches a knight move. "Professor," she says pleasantly. "Fascinating semester, isn't it. Statistically speaking."`,
        options:[
          {label:"\"What's fascinating about it?\"", next:"fascinating"},
          {label:"Ask about her students", next:"students", affinity:2},
          {label:"\"What do you think you've noticed?\"", next:"noticed", minAffinity:40},
          {label:"Excuse yourself", end:true},
        ]},
      fascinating:{ text:()=>`"Campus-wide behavioral shift," she says, stirring her coffee. "Eating norms relaxing, body attitudes inverting, shame metrics collapsing — collapsing happily, which is the strange part. Mass contentment is rare." She looks at you over the cup. "Epidemiology says there's a vector."`,
        options:[
          {label:"\"Maybe people are just... happier.\"", next:"happier", affinity:3},
          {label:"Back", next:"hub"},
        ]},
      happier:{ text:()=>`"Maybe." She lets the word sit. "I ran the numbers, you know. Contentment correlates with proximity to your department at r equals point-seven-one." A sip. "I'm a scientist, Professor. When I find a happiness machine, I don't unplug it. I take notes. And lately—" she glances down, wry, at her own softened silhouette "—the machine appears to have a wide radius."`,
        options:[ {label:"Back", next:"hub"} ]},
      students:{ text:()=>`"Thriving. Less anxiety, more appetite — those usually trade off, and they're not." She pulls up a chart she's clearly been waiting to show someone. "My eating-behavior seminar tripled in enrollment. Half of them cite your students as the reason. Whatever you teach, it has gravity."`,
        options:[
          {label:"\"Come sit in on a class sometime.\"", next:"sitIn", affinity:5},
          {label:"Back", next:"hub"},
        ]},
      sitIn:{ text:()=>`Abara's smile is genuine and a little hungry — intellectually, mostly. "I accept. I'll bring nothing but a notebook and an open mind." She rises, and the chair sighs in a way it didn't last year. "And perhaps an appetite. Word is your classes cater."`,
        options:[ {label:"Back", next:"hub"} ]},
      noticed:{ text:()=>`She sets the coffee down and gives you the full, unhurried weight of her attention. "I've noticed that refusal behaves strangely around you. People mean to say no and find they've said yes. I've noticed the campus is reorganizing itself around appetite like iron filings around something magnetic." A beat. "And I've noticed I don't feel like reporting any of it. Which is the most interesting data point of all." She picks the coffee back up. "Whatever you are, Professor — keep being it where I can watch."`,
        options:[
          {label:"\"Observer effect goes both ways, Doctor.\"", next:"observer", affinity:8},
          {label:"Back", next:"hub"},
        ]},
      observer:{ text:()=>`Abara laughs — a real one, surprised out of her. "Touché. Yes. The longer I watch, the hungrier the watching makes me. I've decided to file that under 'occupational benefit.'" She raises her cup to you. "To mutual observation."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
  {
    id:"delgado", name:"Chef Rosa Delgado", emoji:"👩‍🍳", color:"#d05848",
    role:"Culinary Arts", homeZone:"food_court",
    desc:"Built the culinary program from a hotplate and a grudge. Feeds everyone within reach on principle. Her hugs smell like brown butter.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`"MI PROFESOR!" Rosa abandons a saucepan to someone junior and steers you to a stool by the elbow. "Sit, sit. You came on tasting day. You always come on tasting day. You think I don't notice? Eat."`
          :`Chef Delgado points a wooden spoon at you before you've fully entered the kitchen. "You. Professor. You look underfed and I take that personally. Sit."`,
        options:[
          {label:"Submit to being fed", next:"fed"},
          {label:"Ask about her students", next:"students", affinity:2},
          {label:"Ask for the family recipe", next:"recipe", minAffinity:40},
          {label:"Escape with your waistline", end:true},
        ]},
      fed:{ text:()=>`Resistance was never on the menu. Plates arrive in waves — mole, fresh tortillas, something with plantains that should be illegal. Rosa watches you eat with her arms folded and her heart visibly full. "Good," she pronounces, refilling everything. "In my kitchen, nobody leaves hungry. Some people leave unable to leave. Also acceptable."`,
        options:[
          {label:"\"Marry me.\" (rhetorically)", next:"marry", affinity:5},
          {label:"Back", next:"hub"},
        ]},
      marry:{ text:()=>`Rosa cackles and smacks your shoulder with a towel. "You and half the faculty! Get in line behind Coach Brooks — she proposed over the carnitas." She plates you dessert you did not order. "Flattery gets you thirds. Eat."`,
        options:[ {label:"Back", next:"hub"} ]},
      students:{ text:()=>`"Artists. Animals. Both." She beams at the chaos of her teaching kitchen. "Best class I ever had. You know what changed? They stopped cooking scared. Scared of butter, scared of portions, scared of enjoying it. Now?" She gestures: a student is proudly torching a crème brûlée the size of a hubcap. "Now they cook like abundance is the assignment. Because it is."`,
        options:[
          {label:"\"Send your best dishes to my classroom.\"", next:"pipeline", affinity:6},
          {label:"Back", next:"hub"},
        ]},
      pipeline:{ text:()=>`Rosa's eyes narrow with delight. "A practicum! Real eaters for my cooks!" She's already untying her apron to plan. "My students cook, your students eat, everybody grows — the program, I mean. The program grows." A wink that suggests she means everything. "Deal, profesor."`,
        options:[ {label:"Back", next:"hub"} ]},
      recipe:{ text:()=>`The kitchen goes quiet. Rosa studies you, then unties the little notebook from her apron string — laminated cards, her grandmother's hand. "Abuela's pozole. I have given this to two people. One was a priest." She copies it out slowly, in beautiful handwriting. "You feed people, Professor. Really feed them. I see it. So." She presses the card into your palm and closes your fingers over it. "Now you feed them this."`,
        options:[
          {label:"Accept it like the honor it is", next:"honor", affinity:10},
          {label:"Back", next:"hub"},
        ]},
      honor:{ text:()=>`Rosa pretends she isn't misty and threatens you with the spoon again. "If you change the chile ratio I will know. I will feel it." Then, softer: "Go. Make someone happy with it. That's the whole recipe, really."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
  {
    id:"lockwood", name:"Ms. Penny Lockwood", emoji:"🗂", color:"#c8a040",
    role:"Registrar", homeZone:"student_union",
    desc:"Knows everything about everyone, trades exclusively in pastry and gossip, and considers both sacred.",
    tree:{
      hub:{ text:(t,a)=>a>=50
          ?`Penny clears her good chair the moment she sees you — the one beside the éclair box. "Professor! Perfect timing. I have FRESH intel and you have, I'm assuming, fresh pastry. Our usual arrangement."`
          :`Penny Lockwood glances up from three open spreadsheets and a half-eaten danish. "Professor! Come in, come in. Door closes, crumbs stay secret. House rules."`,
        options:[
          {label:"Trade pastry for gossip", next:"gossip"},
          {label:"Ask how enrollment's looking", next:"enrollment", affinity:2},
          {label:"Ask what people say about you", next:"aboutYou", minAffinity:35},
          {label:"Back to work", end:true},
        ]},
      gossip:{ text:()=>`Penny accepts the pastry like a customs official accepting paperwork — formally, then with open joy. "Okay. So." She leans in. "Facilities ordered ANOTHER round of reinforced furniture. Third time this year. Budget line says 'durability initiative.'" She takes a bite, eyes gleaming. "Durability. Initiative. I love this campus."`,
        options:[
          {label:"\"What else is in that budget?\"", next:"budget", affinity:4},
          {label:"Back", next:"hub"},
        ]},
      budget:{ text:()=>`"Oh, you'll love this." She swivels a monitor toward you. "Dining services budget: up forty percent. Gym revenue: up — people love the juice bar. Health center visits: DOWN. Everyone's thriving and nobody can explain it, so the board approved everything and went to lunch." She dusts sugar off the keyboard. "Longest lunch in board history, incidentally."`,
        options:[ {label:"Back", next:"hub"} ]},
      enrollment:{ text:()=>`"Through the roof. Your department especially — there's a waitlist. A WAITLIST." She pulls a tin of shortbread from the filing cabinet, files being flexible here. "Applicants keep citing 'campus culture.' One essay just said 'I hear everyone there is happy and extremely well-fed' and honestly? Admitted. Instantly."`,
        options:[
          {label:"\"Keep feeding the waitlist rumors.\"", next:"rumors", affinity:5},
          {label:"Back", next:"hub"},
        ]},
      rumors:{ text:()=>`Penny mimes zipping her lips, then immediately unzips them. "Professor, I am a PROFESSIONAL. The rumors feed themselves. I merely... cater them." She salutes you with shortbread. "Pun intended. Always intended."`,
        options:[ {label:"Back", next:"hub"} ]},
      aboutYou:{ text:()=>`Penny sets down her pastry, which means it's serious. "Honestly? They say their daughters went away to college and came back confident. They say your students smile like they know something." She ticks fingers, sugar-dusted. "Brooks says you 'get it.' Mori calls you 'the variable.' Abara calls you 'the vector,' affectionately, I checked." She picks her pastry back up. "Me? I say you're the best thing to happen to my snack budget in twenty years, and in this office that is the highest clearance level of praise."`,
        options:[
          {label:"\"And what do YOU know, Penny?\"", next:"knows", affinity:8},
          {label:"Back", next:"hub"},
        ]},
      knows:{ text:()=>`She smiles the smile of a woman holding a full house. "Everything, Professor. I know everything. I know what the scales in the gym say and what the tailoring invoices say and which vending machine routes tripled." A beat, perfectly timed. "And I know that whatever you're doing... nobody wants you to stop. Now." She opens the éclair box and turns it toward you. "Eat one with me. Co-conspirators split dessert. House rules."`,
        options:[ {label:"Back", next:"hub"} ]},
    },
  },
];

export const FACULTY_CONFIG = {
  talkApCost: 0,           // chatting in the lounge is free
  affinityPerCampusMeet: 1, // bumping into a teacher while exploring
  maxAffinity: 100,
};

export const FACULTY_AFFINITY_TIERS = [
  { min:0,  label:"Colleague",     color:"#8a8a7a" },
  { min:25, label:"Friendly",      color:"#7aa060" },
  { min:50, label:"Confidant",     color:"#c8a040" },
  { min:80, label:"Co-conspirator",color:"#d05848" },
];

export const getFacultyTier = (a=0) =>
  [...FACULTY_AFFINITY_TIERS].reverse().find(t=>a>=t.min)||FACULTY_AFFINITY_TIERS[0];

// Lines for bumping into a teacher while exploring campus.
export const FACULTY_CAMPUS_SIGHTINGS = [
  (t)=>`You run into ${t.name} near the ${t.role.toLowerCase()} wing — a wave, a few words, a promise to stop by the lounge.`,
  (t)=>`${t.name} passes by with coffee and a pastry, lifts both in salute, and keeps moving.`,
  (t)=>`You catch ${t.name} mid-errand. "Lounge, later," she calls. "I have stories."`,
];
