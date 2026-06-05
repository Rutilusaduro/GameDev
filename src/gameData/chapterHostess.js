// Chapter Hostess evolved form — feast prep system

export const SISTER_INITIAL_STATE = [
  { name:"Courtney", bodyType:"pear",       lbs:145 },
  { name:"Madison",  bodyType:"voluptuous",  lbs:162 },
  { name:"Savannah", bodyType:"topHeavy",    lbs:138 },
];

export const CAMILLE_INITIAL_LBS = 128;

// 7 entries (index 0 = default, index 1-6 = 6 upgrades each)
// Max achievable: 15 days × 1 upgrade/day = 15/18 total upgrades
export const MENU_TIERS = [
  { label:"House Snacks",            desc:"Chips, dip, box wine on the counter." },
  { label:"Homemade Appetizers",     desc:"Reneé tested the recipes. You helped plate them." },
  { label:"Catered Spread",          desc:"Local restaurant catered. Full spread, nothing missing." },
  { label:"Three-Course Dinner",     desc:"Appetizer, main, dessert. Proper table service." },
  { label:"Five-Course Dinner",      desc:"Soup, salad, appetizer, entrée, dessert. Unhurried." },
  { label:"Reneé Caters",            desc:"Her full tasting menu debut. She's been building to this." },
  { label:"Reneé's Full Table",      desc:"Seven courses, every ingredient sourced by hand. This is it." },
];

export const ATMOSPHERE_TIERS = [
  { label:"Chapter Living Room",     desc:"Comfortable, familiar, nothing staged." },
  { label:"Dining Room Setup",       desc:"Rearranged, properly cleared. Fiona's first pass." },
  { label:"Candles & Linen",         desc:"White tablecloths, tapered candles. Something shifts." },
  { label:"Full Centerpieces",       desc:"Florals, custom place settings, everything considered." },
  { label:"String Lights & Drape",   desc:"Fabric overhead, warm ambient light. Fiona worked all day." },
  { label:"Fiona's Vision",          desc:"The dining hall, transformed. She had a plan all along." },
  { label:"Fiona's Masterpiece",     desc:"Every surface intentional. The space is entirely hers now." },
];

export const GUEST_TIERS = [
  { label:"Active Chapter",          desc:"Twelve of you. Close, no performance required." },
  { label:"Pledges Invited",         desc:"Pledges attend for the first time. Some are cautious." },
  { label:"Greek Row Neighbors",     desc:"Two other chapter houses. The word is spreading." },
  { label:"Alumni Reached",          desc:"Former sisters come back. Some haven't been here in years." },
  { label:"Camille's Network",       desc:"Sixty names from Camille's contact list. Full house." },
  { label:"Kylie's Blast",           desc:"Open campus invite. Standing room in the hall." },
  { label:"The Grand Gathering",     desc:"Every person Kylie has ever known. The chapter is a destination." },
];

// 6 vignettes per student — one per upgrade tier
// Each entry: { title, intro(s), choices:[{id,label,result}], gainBonus, relBonus }
export const HOSTESS_HANGOUTS = {

  // ── KYLIE — Guest List upgrades ──────────────────────────────────
  kylie: [
    {
      title: "The First List",
      intro: (s) => `Kylie catches you between classes. She already knows about the feast — she found out somehow — and she has opinions.\n\n"How many people?" she says. "Because I have thoughts about how many people."`,
      choices: [
        { id: "let_run",   label: "Let her take the lead",     result: "She opens Notes before you finish agreeing. Names, plus-ones, a whole system. 'Active chapter for now,' she says, 'but I want the full picture.'" },
        { id: "keep_tight",label: "Ask her to keep it tight",  result: "'Chapter-only, got it,' she says, though you can already tell she's thinking past it. 'I'll keep it tight. For now.'" },
      ],
      gainBonus: 2, relBonus: 3,
    },
    {
      title: "The Reach Question",
      intro: (s) => `Kylie pulls up a dashboard on her phone — reach estimates, a color-coded list of Greek Row contacts.\n\n"Every event that went wide started with a controlled expansion," she says. "One other house. See how it lands."`,
      choices: [
        { id: "go_wider",  label: "Trust her judgment",        result: "She drafts the invite before you leave. 'Short. Warm. Specific about the food.' She reads it back. It's good." },
        { id: "careful",   label: "Ask her to stay understated",result: "'Understated I can do,' she says, adjusting the copy. 'It'll still land perfectly. Just quieter.'" },
      ],
      gainBonus: 2, relBonus: 3,
    },
    {
      title: "Alumni Contact",
      intro: (s) => `"There's a former chapter president in the city," Kylie says. "She graduated six years ago. She still responds to chapter emails."\n\nShe's already pulled up the contact.`,
      choices: [
        { id: "reach_out", label: "Send her the invitation",   result: "Kylie writes the email herself. Careful, warm, specific. She hits send and looks at you. 'She'll come.'" },
        { id: "cc_tiffany",label: "Ask Kylie to copy you in",  result: "'Of course.' She adds your address, sends it. 'Now you're on the thread. She'll respond to you directly.'" },
      ],
      gainBonus: 2, relBonus: 4,
    },
    {
      title: "Camille's List",
      intro: (s) => `Kylie found Camille's name in the chapter directory. "She's been coming back for years," she says. "And she knows people. A lot of people."\n\nShe slides her phone across the table. Sixty names.`,
      choices: [
        { id: "use_list",  label: "Use Camille's contacts",    result: "'I'll reach out personally,' Kylie says, scrolling. 'Each one. Handwritten in the subject line.' She means it." },
        { id: "selective", label: "Pick the key ones together",result: "You spend an hour going through the list. Kylie marks twenty names. 'These are the ones who'll actually come and bring the energy.'" },
      ],
      gainBonus: 3, relBonus: 4,
    },
    {
      title: "How Far",
      intro: (s) => `Kylie is quiet for a moment, which is unusual. Then: "I want to do something real with the next one. Not just Greek Row. Actual reach."\n\nShe looks at you. "How far do you want to go?"`,
      choices: [
        { id: "full_reach", label: "Tell her to go as wide as she can",result: "She exhales. Something relaxes in her expression. 'Okay,' she says. 'I've been waiting for you to say that.' She opens a draft she's apparently had ready for months." },
        { id: "campus",     label: "Say campus-wide, but keep it clean",result: "'Campus-wide clean,' she repeats, like she's setting a rule. 'I know what that means. I'll build it right.'" },
      ],
      gainBonus: 3, relBonus: 4,
    },
    {
      title: "The Blast",
      intro: (s) => `"I want to post it," Kylie says. "Open invite. Campus-wide. My platforms, the chapter account, the event aggregators, everything."\n\nShe's looking at you like she's been waiting for permission.`,
      choices: [
        { id: "post_it",   label: "Tell her to post it",       result: "She smiles — actually smiles, not the content-ready kind — and opens her posting dashboard. 'It goes out at seven,' she says. 'Prime engagement window.'" },
        { id: "help_draft",label: "Help her draft the copy",   result: "You work on it together for twenty minutes. She types, you suggest, she adjusts. The final version is hers. 'Better with a second eye,' she admits." },
      ],
      gainBonus: 4, relBonus: 5,
    },
  ],

  // ── RENEÉ — Menu upgrades ─────────────────────────────────────────
  renee: [
    {
      title: "What's Missing",
      intro: (s) => `Reneé meets you in the chapter kitchen. She puts a small plate in front of you without explanation.\n\n"Tell me what's missing," she says.`,
      choices: [
        { id: "more_acid",  label: "Say it needs more brightness", result: "'Acid,' she says immediately. 'I knew it.' She reaches for something behind her and adjusts without measuring. Hands you another taste. She's right." },
        { id: "perfect",    label: "Tell her it's perfect",        result: "She squints. 'It's close,' she says. 'Not perfect yet.' She makes three adjustments anyway and hands it back. The second version is better." },
      ],
      gainBonus: 2, relBonus: 3,
    },
    {
      title: "The Caterer",
      intro: (s) => `"I found someone," Reneé says. "Local place. The chef does private events. I've been talking to him for two weeks." She shows you the menu they've drafted.\n\nIt's good.`,
      choices: [
        { id: "trust_him",  label: "Trust her sourcing",           result: "'He understands what I'm trying to do,' she says. 'Which is a feast, not a catering job. There's a difference.' She emails him to confirm." },
        { id: "taste_first",label: "Ask to taste it first",        result: "She texts him right there. 'Can you do a tasting Tuesday?' He can. She looks at you. 'Good call. You should always taste first.'" },
      ],
      gainBonus: 2, relBonus: 3,
    },
    {
      title: "Three Courses",
      intro: (s) => `Reneé has sketched out a menu. Three courses, each one careful. She hands you the paper.\n\n"This is what a feast should feel like," she says. "Not a party. A meal."`,
      choices: [
        { id: "add_soup",   label: "Ask about a soup course",      result: "'Between the salad and the entrée,' she says, immediately. 'I already have something in mind.' She writes it in the margin before you finish the sentence." },
        { id: "trust_menu", label: "Tell her you trust her judgment",result: "She folds the paper. 'Then this is the menu,' she says simply. Something in her settles. She's been holding this idea for a while." },
      ],
      gainBonus: 2, relBonus: 4,
    },
    {
      title: "Five Courses",
      intro: (s) => `Reneé spreads a new draft across the table. Five courses. She's circled specific ingredients, drawn arrows between courses to show how flavors build.\n\n"I want it to be a meal they remember," she says.`,
      choices: [
        { id: "ask_pairing", label: "Ask about wine pairings",     result: "'Already there.' She flips the paper over. A full pairing list on the back. Handwritten. 'I did this last week,' she says, almost apologetically." },
        { id: "add_bread",   label: "Ask about a bread course",    result: "'Between two and three,' she says. 'Housemade. With the good butter.' She adds it to the sheet. 'The bread is actually the most important part. Everyone forgets that.'" },
      ],
      gainBonus: 3, relBonus: 4,
    },
    {
      title: "Her Menu",
      intro: (s) => `Reneé is quiet when you sit down. Different quiet.\n\n"I want to cater it myself," she says. "My menu. Full service. I've been building to something like this since I started school."`,
      choices: [
        { id: "absolutely",  label: "Tell her yes immediately",    result: "She exhales. 'I wasn't sure you'd say yes,' she says. 'I've had the menu drafted for three months.' She opens her phone." },
        { id: "ask_to_see",  label: "Ask to see the menu first",   result: "She hands you her phone. A twelve-item tasting menu with ingredient sourcing notes. She's been doing this quietly. 'Still three months of prep,' she says." },
      ],
      gainBonus: 3, relBonus: 5,
    },
    {
      title: "Opening Night",
      intro: (s) => `The kitchen is already running when you arrive. Reneé has been here since six. Three prep cooks she recruited from the culinary program are working beside her.\n\n"I need you out of the kitchen," she says. "Come back when it's time to eat."`,
      choices: [
        { id: "step_back",  label: "Give her the kitchen",         result: "You close the door. Two hours later the smell is so good it's drawing people in from the hallway." },
        { id: "ask_what_help",label: "Ask if there's anything you can do",result: "'Water glasses,' she says, without looking up. 'Fill them. And keep people out of here.' It's the most important job she could give you." },
      ],
      gainBonus: 4, relBonus: 5,
    },
  ],

  // ── FIONA — Atmosphere upgrades ───────────────────────────────────
  fiona: [
    {
      title: "The Room",
      intro: (s) => `Fiona walks through the dining room with you. She doesn't say anything for a while. Then:\n\n"The space can do more. It just needs to be asked correctly."`,
      choices: [
        { id: "ask_what",   label: "Ask what she has in mind",     result: "She starts rearranging chairs before she answers. 'The tables face the wrong way,' she says. 'People should face each other, not the wall.' She moves three chairs and it's already better." },
        { id: "give_room",  label: "Step back and let her assess", result: "She walks the room three times, stopping at different angles. Then she takes out a small notebook. 'I have a layout,' she says. 'Can I send it to you tonight?'" },
      ],
      gainBonus: 1, relBonus: 3,
    },
    {
      title: "Linen and Light",
      intro: (s) => `Fiona shows you a bolt of white linen and six tapered candles.\n\n"These are the foundations," she says. "Everything else is secondary to cloth and light."`,
      choices: [
        { id: "cream",      label: "Suggest cream instead of white",result: "'Yes,' she says immediately. 'Warmer. More honest.' She makes a note. 'I'll source it this week.' She already knows where to get it." },
        { id: "trust_her",  label: "Trust her choices",             result: "She nods. 'Good.' She's already unrolling the linen to check the width against the table dimensions. Everything is already measured in her head." },
      ],
      gainBonus: 1, relBonus: 3,
    },
    {
      title: "Centerpieces",
      intro: (s) => `Fiona arrives with two boxes. She sets them on the table and opens them without ceremony: dried florals, greenery, small stones, something hand-thrown in terracotta.\n\n"I want one per table," she says. "Each one slightly different."`,
      choices: [
        { id: "help_build", label: "Help her build them",          result: "She hands you the greenery. 'Start from the center, work out.' You spend an hour on the floor of the dining room. The finished pieces are better than you expected." },
        { id: "let_her",    label: "Let her work while you watch", result: "She builds in silence, occasionally tilting one element, moving another. The process is completely absorbing. By the end, you understand something about how she sees the world." },
      ],
      gainBonus: 2, relBonus: 4,
    },
    {
      title: "Installed",
      intro: (s) => `Fiona has borrowed a ladder from facilities. String lights, weighted fabric, a system of hooks she's apparently been planning for weeks.\n\n"I need three hours," she says. "Come back when I'm done."`,
      choices: [
        { id: "help_hang",  label: "Stay and help hang things",    result: "She lets you hold the ladder and hand up the hooks. When the lights come on, the room is completely different. She looks at it for a long moment. 'Better than the sketch,' she says." },
        { id: "come_back",  label: "Come back three hours later",  result: "When you return, the room is dark except for the string lights. Fiona is sitting at one of the finished tables eating a granola bar. 'You missed the hard part,' she says. 'But this is the good part.'" },
      ],
      gainBonus: 2, relBonus: 4,
    },
    {
      title: "The Vision",
      intro: (s) => `Fiona spreads a large paper across the table. It's a floor plan — but not of the chapter house dining room. Of the main dining hall.\n\n"I've been thinking bigger," she says.`,
      choices: [
        { id: "say_yes",    label: "Tell her to go for it",        result: "She looks at you for a moment. Then: 'I need four days and the right access. I've already spoken to facilities.' She knew you'd say yes. The plan was ready." },
        { id: "ask_how",    label: "Ask how she'd pull it off",    result: "She walks you through it — vendors, borrowed equipment, a friend in facilities, a timeline that's already fully built. 'I just needed to know it was worth doing,' she says." },
      ],
      gainBonus: 3, relBonus: 4,
    },
    {
      title: "Realized",
      intro: (s) => `Fiona sends you a photo at midnight — the main dining hall, empty, the installation in progress. It looks like something from a magazine.\n\nYou text back: "This is incredible."\n\nShe replies: "It's not done yet."`,
      choices: [
        { id: "go_see_it",  label: "Go see it in person",         result: "She's there when you arrive. Standing in the middle of the space, looking up. 'Tomorrow it'll have people in it,' she says. 'That's when it becomes real.'" },
        { id: "wait_for_feast",label: "Wait to see it at the feast",result: "'Smart,' she texts back. 'First impression matters.' You can hear her smiling through the phone." },
      ],
      gainBonus: 4, relBonus: 5,
    },
  ],
};

// ── Feast log generation ───────────────────────────────────────────

const ATMOSPHERE_OPENINGS = [
  (sisters)=>`The chapter house living room has been cleared. ${sisters[0].name} is already here when you arrive, perched on the arm of the couch. The room is familiar. Comfortable. Ordinary in all the right ways.`,
  (sisters)=>`Fiona's rearranged everything. The dining room has space now — real space — and the tables actually face each other. ${sisters[1].name} walks in behind you and stops. "Oh, this is different," she says.`,
  (sisters)=>`White linen, tapered candles, the warm smell of wax. ${sisters[2].name} arrives first and stands in the doorway for a moment. "This is real," she says. Not a compliment exactly — more like a fact she's confirming.`,
  (sisters)=>`Florals on every table. Custom place settings, each one slightly different. ${sisters[0].name} picks up one of the centerpieces and examines it closely. "Did Fiona make these?" she asks. You say yes. She sets it back down very carefully.`,
  (sisters)=>`String lights across the ceiling. Warm fabric draped in soft waves. ${sisters[1].name} stops in the entrance, looks up, then looks at you. "How long did this take?" You tell her. She shakes her head, smiling. "It shows."`,
  (sisters)=>`The main dining hall, transformed. Fiona's installation fills every corner — light, fabric, the specific warmth of a space that's been loved into something else entirely. ${sisters[0].name} is already seated when you arrive. "I got here early," she says. "I wasn't ready to leave."`,
];

const CAMILLE_ARRIVALS = [
  null,
  (c)=>`Camille comes in quietly. She hasn't changed — same posture, same contained energy — but she sits down immediately, like she belongs here. She looks at the table. "Good setup," she says.`,
  (c)=>`Camille arrives carrying a bottle of wine she doesn't announce. She sets it on the table and takes her seat. She looks around at everyone. Something in her expression is very settled.`,
  (c)=>`Camille is the last to arrive. She stops just inside the door and looks at the room — at all of you, at the table — and for a moment she looks like someone trying not to show that they're moved. Then she sits down. "This is what I hoped it would become," she says.`,
  (c)=>`Camille brought three people with her — contacts she's been cultivating for years. She introduces them simply: first names, what they do. They're used to elegant settings, you can tell. They look at the room and they look impressed.`,
  (c)=>`Camille brought five people. You've never seen her bring five. She moves through the crowd making introductions like it's completely natural, like she's done this a hundred times. Maybe she has.`,
  (c)=>`Camille arrives like she lives here. She goes straight to the table, greets everyone by name, and takes her seat. She pours herself a glass without asking. When she catches you watching, she just raises it slightly.`,
];

const COURSE_NAMES_BY_TIER = [
  ["The Table"],
  ["First Round","Main"],
  ["First Round","Main","Dessert"],
  ["Starter","First Course","Main","Dessert"],
  ["Amuse","Soup","Salad","Main","Dessert"],
  ["Amuse","Soup","Salad","Intermezzo","Main","Mignardises"],
  ["Amuse","Soup","Salad","Intermezzo","Main","Cheese","Mignardises"],
];

const COURSE_FOODS_BY_TIER = [
  [["chips, dip, whatever was in the cabinet"]],
  [["bruschetta, something with cheese","whatever she'd been testing all week"],["the pasta, the bread, the sauce she'd been perfecting"]],
  [["the catered appetizer spread","every small plate they sent"],["the main, more generous than expected"],["a simple dessert, included without being asked"]],
  [["the starter she'd selected specifically for this table"],["the first course, arrived warm, served properly"],["the main — all of it — passed family-style"],["the dessert, which comes with coffee nobody asked for but everyone accepts"]],
  [["a single small bite, welcome and warm"],["the soup, served in silence because it demanded it"],["the salad, composed and precise"],["the main — three choices, all good, none wrong"],["the dessert spread, laid along the far table"]],
  [["a single morsel from Reneé's own hand, no description needed"],["a soup that changes the way you understand the word"],["greens that justify their existence"],["a palate reset between courses — brief, cold, perfect"],["the main: her signature, the thing she's been building toward for three years"],["something sweet and small, a quiet ending"]],
  [["an impossibly small bite that announces the entire evening"],["a soup that will be discussed later"],["a composed salad, more than it appears"],["a single perfect bite between courses"],["the main: executed without compromise, served without hesitation"],["a cheese course, because she believes in it"],["something barely sweet — restraint as a final statement"]],
];

const SISTER_LINES = [
  [
    (name,lbs)=>`${name} reaches for a second serving before the first plate has moved. Nobody says anything. Nobody will.`,
    (name,lbs)=>`${name} passes the dish down without taking more and then immediately pulls it back. "Actually," she says.`,
    (name,lbs)=>`${name} has been eating quietly but steadily. When the plate comes back around she looks genuinely glad.`,
    (name,lbs)=>`${name} tips the serving dish to get the last bit. Doesn't apologize. Shouldn't.`,
    (name,lbs)=>`${name} leans back briefly, then decides against it and reaches for more.`,
  ],
  [
    (name,lbs)=>`${name} looks at the empty plate in front of her and considers it. Then she picks up the serving spoon again.`,
    (name,lbs)=>`${name} nods at you when the next dish arrives. Not thanks exactly — more like acknowledgment.`,
    (name,lbs)=>`${name} has stopped talking. This is the clearest possible compliment.`,
    (name,lbs)=>`${name} refills her glass and her plate at the same time, one motion, efficient.`,
    (name,lbs)=>`${name} murmurs something to ${name.slice(-1)+'.'} You don't catch it but you see her smile.`,
  ],
];

const CAMILLE_EATING_LINES = [
  null,
  (c)=>`Camille eats carefully. There's nothing performative about it — she's just clearly eating well and enjoying it.`,
  (c)=>`Camille reaches for the bread unprompted. She tears it without ceremony and dips it without hesitation. This is a good sign.`,
  (c)=>`Camille has had three servings. You notice this because you're paying attention. She does not appear to notice that you've noticed.`,
  (c)=>`Camille is visibly eating more than usual tonight. She's talking less, which you've come to understand means she's enjoying herself.`,
  (c)=>`Camille works through every course with methodical appreciation. When she catches you watching, she just raises her glass slightly.`,
  (c)=>`Camille has said, at some point in the last hour, "this is extraordinary" — quietly, to herself, but you heard it.`,
];

const FEAST_CLOSINGS = [
  `Nobody leaves quickly. This is the clearest possible outcome.`,
  `The table stays full longer than the food does. You consider that a success.`,
  `Someone has pushed their chair back from the table, which feels like the universal signal that a feast went the way it was supposed to.`,
  `The room is warm and slow and full of people who aren't in a hurry to be anywhere else. You sit at the head of the table. You have made this.`,
  `Three conversations are still going at half past eleven. You've stopped keeping track of what was eaten. The number is not small.`,
  `It will keep going for another hour. Nobody has mentioned leaving. The food is gone but the feast is still happening, which is the whole point of a feast.`,
];

const MENU_BASE_GAIN   = [8,  12, 16, 22, 28, 35, 44];
const GUEST_BONUS_GAIN = [0,   2,  4,  5,  6,  8, 10];
const ATMO_BONUS_GAIN  = [0,   1,  2,  3,  4,  5,  6];

// Sister gain base per feast (per menu+guest tier combined)
function sisterFeastGain(menuTier, guestTier, bodyType) {
  const base = menuTier * 2 + guestTier * 1.5;
  const mult = bodyType === "voluptuous" ? 1.15 : bodyType === "pear" ? 0.9 : 1.0;
  return Math.max(1, Math.round(base * mult));
}

function camilleFeastGain(stageIdx, menuTier) {
  if (stageIdx < 1) return 0;
  return Math.max(3, Math.round(3 + stageIdx * 1.2 + menuTier * 0.8));
}

export function generateFeastLog(stageIdx, menuTier, atmosphereTier, guestTier, sisters, camille) {
  const log = [];
  const clampStage = Math.min(5, stageIdx);
  // Clamp tier indices to valid array bounds
  const mTier = Math.min(menuTier, MENU_BASE_GAIN.length - 1);
  const aTier = Math.min(atmosphereTier, ATMO_BONUS_GAIN.length - 1);
  const gTier = Math.min(guestTier, GUEST_BONUS_GAIN.length - 1);
  const atmoIdx = Math.min(aTier, ATMOSPHERE_OPENINGS.length - 1);

  // Opening
  log.push({ text: ATMOSPHERE_OPENINGS[atmoIdx](sisters), type: "scene" });

  // Sister arrivals
  const arriveSentences = sisters.map((sis, i) => {
    const arr = [
      `${sis.name} arrives on time, which you've come to recognize means she was looking forward to this.`,
      `${sis.name} is already talking to someone when she comes through the door.`,
      `${sis.name} sets her bag down and immediately goes to the table.`,
    ];
    return arr[i % arr.length];
  });
  log.push({ text: arriveSentences.join(" "), type: "scene" });

  // Camille (from stage 1)
  if (stageIdx >= 1 && CAMILLE_ARRIVALS[Math.min(stageIdx, CAMILLE_ARRIVALS.length - 1)]) {
    log.push({ text: CAMILLE_ARRIVALS[Math.min(stageIdx, CAMILLE_ARRIVALS.length - 1)](camille), type: "scene" });
  }

  // Reneé intro if she caters (tier 5+)
  if (mTier >= 5) {
    log.push({ text: `Reneé appears from the kitchen long enough to say, "First course in five minutes," and immediately disappears again. She won't come out until the end.`, type: "scene" });
  }

  // Kylie intro if open blast (guest tier 5+)
  if (gTier >= 5) {
    log.push({ text: `Kylie is at the entrance greeting people she's never met, making them feel like they've been expected. This is her natural state.`, type: "scene" });
  }

  // Courses
  const courseNames  = COURSE_NAMES_BY_TIER[mTier]  || COURSE_NAMES_BY_TIER[0];
  const courseFoods  = COURSE_FOODS_BY_TIER[mTier]   || COURSE_FOODS_BY_TIER[0];
  const numCourses   = courseNames.length;
  const gainPerCourse = Math.floor(MENU_BASE_GAIN[mTier] / numCourses);
  let   tiffanyGain  = 0;

  for (let ci = 0; ci < numCourses; ci++) {
    const courseName  = courseNames[ci];
    const foodOptions = courseFoods[ci] || courseFoods[courseFoods.length - 1];
    const food        = foodOptions[Math.floor(Math.random() * foodOptions.length)];
    const courseGain  = gainPerCourse + (ci === numCourses - 1 ? MENU_BASE_GAIN[mTier] % numCourses : 0);

    log.push({ text: `— ${courseName} —`, type: "header" });
    log.push({ text: `${food.charAt(0).toUpperCase() + food.slice(1)}.`, type: "food" });

    // Sister reactions — rotate through them
    const sister = sisters[ci % sisters.length];
    const linePool = SISTER_LINES[ci % SISTER_LINES.length];
    log.push({ text: linePool[Math.floor(Math.random() * linePool.length)](sister.name, sister.lbs), type: "sister" });

    // Camille eating (from stage 1, every other course)
    if (stageIdx >= 1 && ci % 2 === 1 && CAMILLE_EATING_LINES[Math.min(stageIdx, CAMILLE_EATING_LINES.length - 1)]) {
      log.push({ text: CAMILLE_EATING_LINES[Math.min(stageIdx, CAMILLE_EATING_LINES.length - 1)](camille), type: "camille" });
    }

    tiffanyGain += courseGain;
    log.push({ text: `+${courseGain} lbs`, type: "gain", gain: courseGain });
  }

  // Atmospheric bonus
  const atmoBonusGain = ATMO_BONUS_GAIN[aTier];
  if (atmoBonusGain > 0) {
    log.push({ text: `The setting holds you at the table longer than expected. +${atmoBonusGain} lbs`, type: "gain", gain: atmoBonusGain });
    tiffanyGain += atmoBonusGain;
  }

  // Guest pressure bonus
  const guestBonusGain = GUEST_BONUS_GAIN[gTier];
  if (guestBonusGain > 0) {
    log.push({ text: `The company makes it impossible to stop. +${guestBonusGain} lbs`, type: "gain", gain: guestBonusGain });
    tiffanyGain += guestBonusGain;
  }

  // Closing
  log.push({ text: FEAST_CLOSINGS[clampStage], type: "scene" });

  // Calculate NPC gains
  const sisterGainMap = {};
  sisters.forEach(sis => {
    sisterGainMap[sis.name] = sisterFeastGain(mTier, gTier, sis.bodyType);
  });
  const camilleGain = camilleFeastGain(stageIdx, mTier);
  const relGain = 8 + gTier * 2 + aTier;

  return { log, tiffanyGain, sisterGainMap, camilleGain, relGain };
}
