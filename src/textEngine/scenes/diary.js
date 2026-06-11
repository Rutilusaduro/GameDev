// ═══════════════════════════════════════════════════════════════
// SCENE: DIARY — non-evolved student diary entries
// Voice: private, dated, event-based — NOT current attitude copy.
// Composed: core + optional devour aside (only if student has devoured).
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';
import './campusSoftening.js';

/**
 * Twelve entries per archetype, indexed by weight stage id (0–11).
 * Slight → Leviathan. Event diary, not weight boasts.
 */
const DIARY_CORE = {
  cheerleader: [
    "Practice today. Had to pin my skirt twice. Coach asked if I was eating enough. I said yes. I ate a protein bar in the locker room after and it wasn't enough.",
    "New routine is clicking. I told the squad I was 'eating clean.' I had pizza alone in my car after practice. It was really good. I don't know why I'm writing that down.",
    "Let out my uniform twice. Coach gave me a look. I blamed the dryer. Went to Marco's four times this week — the guy at the counter knows my order. I should be embarrassed. I'm not, quite.",
    "They cut me from the squad on Tuesday. I cried in the parking lot for maybe ten minutes. Then I drove home and ate a whole lasagna standing at the counter. Mom wasn't home. Good.",
    "Ashley from the squad texted to 'check in.' I sent a photo of my brunch. She left me on read. I had seconds anyway. The booth at the diner wobbled when I slid in. New detail.",
    "Tried on my old competition leotard for nostalgia. Couldn't get it past my hips. Stood in the mirror a long time. Ordered DoorDash instead of dealing with it. Driver was nice.",
    "Couldn't fit behind the wheel of my Civic. Sat there in the dealership lot for twenty minutes before going in. Bought something wider. The salesman kept saying 'plenty of room.' I tipped him.",
    "Went to the mall with Megan. Three people stared. Megan said they were jealous. I don't think that's true but I appreciated the lie. We got cinnamon pretzels. I got my own.",
    "Mostly stay home now. Brittany — not me, the other Brittany — drops off food sometimes. I haven't seen the squad in weeks. Sun through the window. Cat on my belly. Fine day.",
    "Hard to hold the pen. Wrist gets tired. Someone feeds me. I eat. That's the entry.",
    "The room is the world. Doorframe is a story I tell visitors about. Food arrives. I don't go anywhere. I don't need to.",
    "They rearranged the furniture again so I fit. I heard them measuring in the hall. I didn't ask what for. I know. Heavy and warm and still Tuesday somehow.",
  ],
  bookworm: [
    "Thesis chapter three. Granola bars and coffee. Weighed myself for the log. Number lower than I budgeted. Added a meal column to the spreadsheet.",
    "Interesting paper on foodways in the stacks. Vending machine restocked on the third floor. Conducted a thorough survey. Found two new favorites.",
    "Library chair cracked under me. I said it was always broken. Moved to the wide study carrel by the window. Nobody commented. I brought snacks in a tote now.",
    "Four thousand words before lunch. Lost count of the crackers. Advisor emailed about 'self-care.' I sent my food log. Very detailed. She meant something else.",
    "Grocery delivery because carrying bags up three flights seemed inefficient. They left six boxes. I have nowhere to put the extras. Ate one box standing in the kitchen.",
    "Working from home. No commute. More reading hours. Also more hours near the fridge. Both feel like productivity.",
    "New chair rated for five hundred pounds. Arrived Tuesday. Sat in it six hours with a novel and a rotisserie chicken. Best Tuesday in months.",
    "Published two papers this semester. Gained weight steadily the whole time. Correlation noted in private. Not in the acknowledgments.",
    "Enormous and reading. The universe contains me and also this chapter on ritual feasting. Both true.",
    "Pen heavy. Books propped on my belly. Works fine.",
    "Don't leave the room. Delivery drivers know the knock pattern. Reading in bed. Crumbs in the sheets. Acceptable.",
    "The stacks would not hold me now. I made peace with that. My own library is the bed, the tray, the lamp. Enough.",
  ],
  influencer: [
    "Morning routine video. Collarbones very visible in the ring light. Fifty thousand likes. Gym after. Felt weird in the locker room mirror.",
    "Posted a day-in-my-life. Dinner plate was huge. Comments loved it. Manager called confused. Engagement up. Jeans tight Thursday.",
    "Soft era content going viral. Manager still confused. Numbers don't lie. Filmed myself trying on old jeans. Couldn't zip. Posted anyway.",
    "New agency handles 'plus creators.' Their word: trajectory. Mine: terrified and eating cake in the Uber home.",
    "Weighed on camera for a bit. Scale said a number. Comments exploded. I cried after filming. Then ate the prop cake. It wasn't a prop.",
    "Book deal. Working title 'More.' On brand. Photographer had to adjust lighting because my stomach caught glare. We laughed. Sort of.",
    "Production team comes to me now. Easier. Doorways are a conversation. They brought a wider lens. I brought snacks for the crew.",
    "Documentary people want access. I said yes if they cater. They said yes. Ate during the contract signing. On camera. Of course.",
    "Movement. Also not moving much. Both in the caption. Both true.",
    "Phone too far to reach some days. Assistant reads comments aloud. I eat. That's content too.",
    "Livestream from bed. Chat sends food. I accept. The algorithm approves.",
    "They film the ceiling fan now. I'm the landscape. Comments say comforting. I agree.",
  ],
  athlete: [
    "Five a.m. run. Eight miles. Coach pleased. Ate salad after. Looked at my legs in the shower. Too many angles.",
    "Times slipping. Coach said I look 'different.' Pasta four nights. 'For glycogen.' That's what I told my roommate.",
    "Cut from varsity. Sat in the car forty minutes. Drove to the Italian place. Breadsticks first. Felt better than any medal.",
    "Tried one pull-up for old times. Failed. Burger immediately after. Recovery, I said. Nobody was there to argue.",
    "Saw my old training partner at the gym. She stared. I was at the shake bar, not the equipment. Waved. She looked away.",
    "Don't go to the gym. Body doesn't fit the machines. Weights section is a memory. Shake bar delivers.",
    "Coach texted 'you okay?' Sent a photo of lunch. No reply since. Fine by me.",
    "Watched a marathon on TV. Ate through the whole thing. Slowest I've moved all week was fridge to couch. Still counts.",
    "My records still on the university wall. Different records now. Private ones. No plaque.",
    "Stairs are theoretical. Track is TV. Food is here. Okay.",
    "Someone timed me to the kitchen. Personal worst. I laughed. Ate anyway.",
    "The trophy case wouldn't hold me. I don't need it. The couch does.",
  ],
  artsy: [
    "New series on fragility. Crackers in the studio. Paint on my shirt. Forgot lunch until nine.",
    "Series pivoted to abundance. Don't know why. Bowls, fruit, folds of fabric. My arms look softer in the north light.",
    "Work getting lush. Critic hasn't seen it yet. I have. Ate a whole cheese board 'for color reference.'",
    "Critic called the new work 'carnally excessive.' Framed the email. Large dinner. Alone. Celebratory.",
    "Self-portraits now. Body changed enough to be interesting. Canvas is bigger. So is the subject.",
    "Opening night. Silk drape instead of a dress. Didn't fit — looked better for it. Sold two pieces. Ate the gallery cheese.",
    "Can't carry canvases. Assistant does. I point. Like sculpture always worked. First time it's me.",
    "Wider studio door installed. Invoice on the fridge. Muse and artist same person. inconvenient and perfect.",
    "Make things from the chair. Gallery visits me. Literally. Truck at the curb. I sign from here.",
    "Art is a body in space. Mine takes a lot of space. Winning is the wrong word. Accurate is closer.",
    "Brush far. Reach short. Paint what I can see without moving.",
    "Ceiling is a canvas I haven't earned yet. Everything else is in progress.",
  ],
  gamer: [
    "Twenty-eight and oh. Energy drinks. Chat said I looked tired. They sent pizza. I ate all of it on stream.",
    "Sponsor sent snack boxes. Reviewed six bags live. 'Research.' Chat donated for more. I obliged.",
    "More viewers when I eat on camera. Don't understand. Accepting it. Chair squeaks now. Ordered a rated one.",
    "Broke the good chair. New one extremely comfortable. Sixteen-hour stream. Optimal.",
    "Viewers voted 'comfort streamer.' Personality or presence — poll was split. I ate during the results reveal.",
    "Desk reorganized. Everything arm's reach. Fridge behind me. Chef's kiss emoji in chat.",
    "New apartment. Wider doors. Bigger fridge. Closer to desk. Moved once. Worth it.",
    "Don't stand between games. Meals delivered to headset range. Efficiency meta.",
    "Record stream hours. Record snack consumption. Both achievements. Mod pinned the stat.",
    "Merged with setup. Setup evolved around me. We are one entity. Chat agrees.",
    "Keyboard slightly buried. Belly as wrist rest. K/D fine. Comfort excellent.",
    "Final form is a room. Stream never off. Snacks never empty. Good patch notes.",
  ],
  sorority: [
    "Retreat weekend. Salads. Face masks. Perfect on Instagram. Ate someone's fries in the van home.",
    "Brunch four times. New pastry place. Calories 'don't count' — I know that's not true. Went back Friday anyway.",
    "Sisters side-eyeing my second plate. Suggested dinner out. Nobody mentioned it again. I brought dessert.",
    "Formal dress custom order. Seamstress kind. I cried a little in the fitting room. Not sad. Relieved.",
    "Snacks in my room now. Popular for it. Social chair unofficial. Events involve food. Nobody complains.",
    "Chapter meetings at my place. Couch sags. I provide trays. Logistics of being the fun one.",
    "Everything delivered. Clothes custom. Food constant. Being big and liked has paperwork.",
    "Fixture status. House spiritually partly mine. Take up more of it monthly. Plaque would be funny.",
    "House is me. Me is house. They voted on a plaque. I abstained. They passed anyway.",
    "Formal in my living room. Catering around me. Best night chapter had. I didn't leave the couch.",
    "Pledges learn rules in a circle. I pass snacks. Leadership looks like this now.",
    "Plaque installed. I can reach it if I stretch. Don't need to. Everyone reads it to me.",
  ],
  overachiever: [
    "Five a.m. gym. Seven class. Nine internship. Planner full. BMI noted. Added meal blocks. Corrective.",
    "Nutritional research on the schedule. Rigorous tasting. Documented. Graph updated. Happiness axis improved.",
    "Dropped one club. Added two meals. Net happiness positive. Graphed it for myself. Looked good.",
    "Thesis retitled: adaptive caloric strategy. Advisor approved. Celebratory dinner. Logged every bite.",
    "More achieved this semester than last year. Also more weight. Efficient use of time.",
    "Body is a dataset. Large dataset. Paper submitted. Peer review passed. N equals me.",
    "Remote work. Forty-five commute minutes repurposed for eating. More efficient. Obvious.",
    "Personal records: academic and otherwise. Timestamped. Both categories improving.",
    "PhD coursework done. Weigh more than committee combined. Peak performance. Slide deck ready.",
    "Everything achieved. Enormous. Wrote the paper connecting both. Not published. Private.",
    "Planner full. Belly fuller. Both organized.",
    "Dissertation bound. Body unbound. Filed under success. No further entries scheduled. Ignored that rule.",
  ],
  quiet: [
    "—",
    "Food here is good. Ate more than usual. Professor left snacks. I took several. Nobody noticed.",
    "New jeans. Two sizes up. Felt right. Pastry after. Don't know why I'm writing that.",
    "Someone said I look different. Not mean. I didn't answer. Ate my lunch. Easier.",
    "Caught my reflection. Stood a while. Got seconds. Didn't tell anyone.",
    "Love this? Weird word. Present in my body. Heavy. Okay.",
    "Don't hide. Take up space. A lot of space. Also okay.",
    "People know my name. I fill the room. Same week. Related maybe.",
    "Still quiet. Content. Fine.",
    "Pen tired. Words short. Fine.",
    "Room arranges around me. I like it. Didn't ask.",
    "Wanted this. Got this. Enough.",
  ],
  transfer: [
    "Campus huge. Still lost sometimes. Dining hall excellent. Went twice yesterday.",
    "Mapped every good food spot. Been to all twice. Homework secondary.",
    "Friend from Dublin visited. Didn't mention my body until the taxi. 'You seem happy.' I am.",
    "This place feeds me. Heavier than home. More myself. Both surprise me.",
    "Mom called. Said I sound different. I am. She asked if I'm eating okay. Very yes.",
    "Dining staff know my name. Orders memorized. Local now.",
    "Never want to leave. Couldn't if I tried. Good. Home.",
    "Gave directions: turn left at me. It worked. They laughed. I did too.",
    "Part of campus. Permanent. Well-fed. Landmark status unofficial.",
    "Rain on the window. Food on the tray. Dublin feels far. Fine.",
    "Visitors take photos with me like architecture. I don't mind.",
    "Rooted. The building knows my weight. Settles when I shift.",
  ],
  psych: [
    "Observation log day one. Fifteen subjects. Six notebooks. I'll need more.",
    "Added nutritional timing to the protocol. Vending machine proximity noted. Professional curiosity. Obviously.",
    "Clothes different. Logged column seven. Maybe wrong column. Data anyway.",
    "Cross-referencing intake and mood. Correlation not subtle. P value would annoy me.",
    "Advisor asked if I'm okay. Said ongoing research. True. Both kinds.",
    "Observations more accurate at this weight. Embodied cognition. Or hunger. Field notes either way.",
    "Notebook fuller than expected. So am I. Honest footnote.",
    "Observer and subject blurring. Ethics board would fuss. Not submitting this page.",
    "Office mostly. Data comes to me. So does lunch.",
    "Study and researcher same person. Methodology questionable. Results delicious.",
    "Can't reach the high shelf of journals. Ordered duplicates. Problem solved.",
    "The sample size is one. The sample is vast. Acceptable n.",
  ],
  culinary: [
    "Taste-tested three batches before class. Flour on my apron. Butter on my wrists. Girls will smell it before they see it.",
    "Recipe notebook getting sauce stains. Waistband tight — blaming apron strings. Not working anymore.",
    "Cardamom buns for pickup. Mrs. Reyes lingered with coffee until the tray was empty. I pretended not to count.",
    "Baking hour approved. Practicum skirt too small. Ordered larger. Administration signed. No comment on hips.",
    "Moms have opinions. Detailed. I write them down. Bake accordingly. Mrs. Calloway wants less nutmeg. Noted.",
    "Tuesday official. I am official. Softness around my middle constant now. Warm. From standing at the oven.",
    "Measured for new apron. Numbers in the recipe book next to cinnamon ratios. Both feel correct.",
    "Mrs. Monroe rated this week a ten. Ate two while cleaning. Quality control.",
    "Classroom smells like vanilla and yeast. I take more kitchen than before. Nobody complained.",
    "End of term. Six faces I know by appetite. Body grown into the work. Wouldn't trade a pound.",
    "Tuesday tradition. Tradition has a shape. Both still rising.",
    "Oven never cools. They come to me. I feed them. I feed myself. Immense and warm at the center of it.",
  ],
  eced: [
    "Brownies for class. All three girls ate past lunch portions. Sofia eats like it was always fine. Kayla had four. Baking practicum. Technically true.",
    "Kayla arrives early now. Jeans gap at the waist. Mrs. Reyes texted about my food. School said curriculum. Technically true.",
    "Mrs. Calloway asked about enrichment. I said nutritional research. She looked at her hips in the window. Took my banana bread. Ate two in the parking lot.",
    "Sofia barely fits her desk. Wider desks approved. Bri's belly on her thighs. Kayla wanted the recipe. I omitted two ingredients. A little bad. A little.",
    "Mrs. Reyes brought coffee. Lingers now. Mrs. Calloway suspicious of her reflection. Kayla asked for chocolate tomorrow. I said yes.",
    "Mrs. Monroe in a larger dress. Took four treats openly. Best banana bread ever. I'm happy. Doing something wrong. Happy.",
    "Baking hour official. Mrs. Calloway on the committee. Eats everything. Gives feedback. Bri can't tuck uniform. I said it looked nice.",
    "Moms have a group chat rating recipes. Mrs. Monroe told me. Cinnamon rolls tie with peach cake. She's round now. Generous. No apology.",
    "Mrs. Calloway brought preserves. Homemade labels. 'Girls look forward to Tuesdays.' 'So do the moms.' Strawberry muffins next week. Three for her.",
    "End-of-term celebration. All six in one room. Kayla's hips, Bri's belly, Sofia comfortable. Moms in cardigans that pull. I don't regret a bite.",
    "Tuesday mornings are the calendar. My body is the oven timer. Both loud.",
    "They fit around me in the classroom. I fit around the work. Neither finished rising.",
  ],
  nursing: [
    "Clinical notes: hydration, rest, nutrition. Applied all three after shift. Cafeteria soup good. Charted anyway.",
    "Extra snacks for the floor. Ate half walking back. Stress eating is still eating. Logged it.",
    "Scrubs fit different. Nurse beside me said I look 'well.' Soft. Chart says stable.",
    "Comfort food after doubles. Caregiving includes self. Obvious. Took years to write down.",
    "Patient asked if I'm pregnant. Not. Well-fed. Chair taken properly. First time in months.",
    "Casserole to study group. Ate a third before they arrived. Leftovers intentional.",
    "Night shift delivery habits. Thighs press in the hall. Steadier on my feet. Irony noted.",
    "Recommend rest. Recommend nourishment. Walking example. Round. Present. Break room knows me.",
    "Break room chair knows me. Belly in lap while charting. Slower charts. More snacks. Care continues.",
    "Nursed others into softness. Turned same attention inward. Worked.",
    "Trays between shifts. Immobile between them. Accept. Also care.",
    "Unit works around me. Monument of comfort. Healing is heavy. I am heavy. Fine.",
  ],
  farm_girl: [
    "Homesick for Grandma's kitchen. Jam bars from memory. Four testing the recipe. Close enough.",
    "Campus portions generous. Thighs filling jeans. Grandma would say eat.",
    "Six preserves to class. Gone. Half a cornbread loaf after. Sunshine comment accurate.",
    "Dorm cooking night. 'Mary Jane's night.' Belly leads into kitchen first now.",
    "Weight like summer humidity. Miss the farm. Love the table. Both true.",
    "Chair creaked. Kept eating. Creak is furniture now. So am I.",
    "Sweet potato pie for twelve. Ate for thirteen. Thirteenth was me.",
    "Groceries to my door. Warmth from my oven out. Fair trade.",
    "Homestead-sized. Room is my porch. Food comes. I stay.",
    "Rooted. Round. Building settles when I shift. Like the farmhouse.",
    "County could eat from my kitchen. Room is the county now.",
    "Country big. Mythic big. Still smiling. Jam on the counter. Always.",
  ],
  pharmacy_grad: [
    "Late in the lab. Double-checked every calculation. Corporate badge still on. I tell myself this is legitimate wellness research.",
    "Adjusted a formula at work. 'Data collection.' My hands were steady. I noticed that.",
    "Brought samples home in a cooler. Labeled them wrong on purpose. Ate a test bar myself. Felt nothing. Then something.",
    "Wellness branding works better than sabotage. Fewer questions. More appetite curves in my notebook.",
    "Campus feels softer lately. Not my fault. Probably not. I should run a controlled study. On everyone.",
    "Circle of users growing. They call it exclusive wellness. I call it data. Both true.",
    "Exposure risk at work is low if I'm careful. I'm careful. I'm also escalating.",
    "Cult strength batch tested. Dependency metrics excellent. That word should scare me.",
    "Dependency maintenance schedule drafted. For them. For me. Lines blurring.",
    "Ascension protocol sketched. Mass distribution options noted. Water supply crossed out, then uncrossed.",
    "I don't want to cure anything anymore. I want scale. I wrote it and didn't tear it out.",
    "Goddess is a ridiculous word. I looked in the mirror and considered it anyway.",
  ],
  predator: [
    "Sat in the back. Counted who ate. Who didn't. Interesting ratio. I didn't eat. Not hungry. Not yet.",
    "They eat in front of me. I watch portions. Patterns. Symmetry forming. My plate stayed empty until midnight.",
    "Hallway smells different after lunch. I hear chewing from three doors down. Wrote the time down. Don't know why.",
    "Professor left food on the desk. I took it. Took more than food later. Can't write that plainly. Ripped the page.",
    "Waited in the stairwell. Someone passed with takeout. They don't pass anymore. I gained weight. They didn't.",
    "Patience and mass both accumulate. Sat still four hours. Ate what arrived. Arrived plenty.",
    "Dark corner of the union. Stranger talked too long. I stopped listening. They stopped talking. I was heavier walking home.",
    "Can't write what happened in the parking garage. Ate after. Slept well. Shouldn't have.",
    "Memory like a meal I can't digest. Belly heavier than the fridge. Names optional.",
    "Stillness is a trap. Bait is excellent. I don't chase. Things come.",
    "Room is a mouth. I am inside it. Visitors rare. Outcomes final.",
    "Hunger won often enough. Words fail. Scale irrelevant. I am what ate.",
  ],
};

function registerCoreVariants() {
  const variants = [];
  for (const [archetype, stages] of Object.entries(DIARY_CORE)) {
    stages.forEach((text, stageId) => {
      if (!text || text === "—") return;
      variants.push({
        when: { archetype, stage: [stageId] },
        priority: 2,
        text: [text],
      });
    });
  }
  variants.push({
    when: {},
    priority: 0,
    text: [(ctx) => `${ctx.subject?.name || "She"} wrote something, then thought better of it.`],
  });
  registerModule("diary.core", variants);
}

registerCoreVariants();

// ── diary.devour — private aftermath, not attitude ───────────
// Appends only when student has devoured; diary voice: shame, fragments.

registerModule("diary.devour", [
  { when: { devourMin: 3 }, priority: 4,
    text: [
      `There are pages I tore out. Names I won't write. I eat after and sleep heavy. The math is simple. I don't show my work.`,
      `Three times now. I stop remembering faces faster than I remember the weight. That should frighten me. I ate instead of being frightened.`,
    ] },
  { when: { devourMin: 2 }, priority: 3,
    text: [
      `Second time. Easier to not describe. Harder to pretend I don't know what I am.`,
      `I crossed something out so hard the paper tore. Ate dinner watching TV like a normal person. I'm not.`,
    ] },
  { when: { devourMin: 1 }, priority: 3,
    text: [
      `There's a blank hour I can't account for. I was heavier after. I didn't ask questions.`,
      `I wrote what happened, then deleted it. Ate more. Hands shook. Not from hunger.`,
      `She's gone. I'm not. I won't say how I know. I know.`,
    ] },
  { when: {},
    text: "" },
]);

export const DIARY_TEMPLATE = "{diary.core}{diary.campus|prefix: }{diary.devour|prefix: }";

export function renderDiary(student, week = 1, opts = {}) {
  const ctx = createContext({
    subject: student,
    week,
    globals: { campusFattening: !!opts.campusFattening },
  });
  const text = render(DIARY_TEMPLATE, ctx, { noSmooth: true }).trim();
  return text || "—";
}
