import { depthActivityGainBonus, depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';
import { CG_FILLED_REACTIONS, CG_FILLED_OUTFITS } from './competitiveGainerText.js';

export const EVOLVED_REACTIONS = {
  // ── ATHLETE paths ──────────────────────────────────────────────
  sumo:[
    "I stepped onto an official sumo scale for the first time today and it read 258 and the official wrote it down like it was nothing — and across the room Dana 'The Wall' Mercer, six years a veteran, finally looked at me. I lost. I'll be back, and I'll be heavier.",
    "Dana says good luck to me now. One season in and the Wall says good luck. The gap between her weight and mine used to be eighty pounds. It's getting small. She's noticed. So have I.",
    "I outweighed Dana Mercer on the board today for the first time. She looked at the numbers and said 'there it is.' Then I pushed her out of the ring with my belly and the crowd chanted my name. My name.",
    "National qualifier. There were cameras. I'm the heaviest competitor in the field by a wide margin, and Dana told me she can't out-weigh me anymore so she'll have to out-think me. She couldn't. I'm too big now. I love being too big.",
    "National finalist. They read my weight into the broadcast and the whole arena went quiet before it roared, and Dana was already clapping. She said she came to feel what it's like to lose to the biggest there's ever been. I gave it to her.",
    "I am the largest sumo competitor this circuit has ever certified. I put my hand on my belly after the match — warm, full, enormous, mine — and thought about the cheerleader who started this. She had no idea. There's more. There's always more.",
  ],
  eating_competitor:[
    "First contest. Timer on the table, crowd watching. I finished three minutes early. Walked out knowing.",
    "Circuit regular now. The other competitors nod when I walk in. The MCs know how to say my name.",
    "New regional record. The old one stood for four years. It stood for four minutes against me.",
    "National contender. Sponsorships. My face on a hot sauce bottle. I accept all of this.",
    "World-record territory. The table can barely hold what I put away. The crowd barely breathes.",
    "I've eaten everything. I've broken everything. Now I just eat, and that is the entire life.",
  ],
  // ── INFLUENCER paths ────────────────────────────────────────────
  feedee_creator:[
    `First collab. I said "we're going to feed each other on camera" and she said yes and we did it and the chat stayed for the whole thing. I've been trying to put a name on what this format is. I keep coming back to: mutual.`,
    `The regular viewers know what to expect now. They come for the numbers. They come to watch both of us get bigger every week. We are both getting bigger every week. The format is working.`,
    `Platform featured the collab. They said "a new format." I said: it's not new, it's just honest. Two women eating together, growing together, the camera seeing all of it. The new audience is staying.`,
    `The brand wanted both of us. They wrote a contract that said "both physical presences in frame." They meant our bellies. Our actual, enormous, warm, camera-filling bellies. I signed it. Of course I signed it.`,
    `One year of weekly collabs. She's heavier. I'm heavier. The subscriber count is 1.1 million. Wren is in the building right now, physically in the building, because she drove four hours to be here. That's what a year looks like.`,
    `Wren is in the room. She's been watching since 258 pounds. I am 820 pounds in this corner and my collab partner is enormous across the table and Wren is watching from outside the camera frame and the platform has never seen a stream like this one. I am not done. We are not done.`,
  ],
  body_positive_creator:[
    "Rebranded the channel. First body-positive post up. My old audience is confused. My new one is enormous.",
    "First brand deal. A clothing company that actually means it. The cheque cleared. I bought dinner.",
    "TEDx talk. Twelve minutes, full house. The standing ovation went on long enough to be uncomfortable. Good.",
    "My face is on a billboard. I drove past it and cried and then ate a full meal and cried more.",
    "Cultural touchstone is a phrase people use about me in articles. I eat well and feel enormous and correct.",
    "The platform is a legacy now. The body is the argument. The argument has been won.",
  ],
  // ── CHEERLEADER paths ───────────────────────────────────────────
  eating_captain:[
    `I weigh ${258} pounds and I stepped on a competition scale for the first time today and a judge read my number aloud and the whole room got quiet. That is a feeling. I want more of that feeling.`,
    `Six months in the circuit and people know my name before I get to the warmup room. I walked in today and someone said 'you're the cheerleader captain' like they'd been waiting to see me. I haven't been a cheerleader captain in a while. I'm something else now.`,
    `Conference championship. I outweighed the previous top number by over a hundred pounds and the judge read mine into the microphone and Maya from Lakewood — who has beaten me every time we've competed — started clapping. She started before anyone else.`,
    `National qualifier. There were cameras at the weigh-in. The weigh-in has cameras now. I weighed in and someone in the crowd said 'oh my god' clearly enough for me to hear it. I considered this a successful weigh-in.`,
    `National champion. They read my name and my number into the national feed and the arena made a sound I've never heard in a room before. Maya was already clapping. She knew before the horn. I knew too.`,
    `I am the largest competitive eating captain in this sport's history. The trophy is substantial. My belly is more substantial. I put my hand on it after the ceremony and thought: this is the record. I built this. There is more to build.`,
  ],
  big_squad_captain:[
    "Told the squad: no more size rules, no more weigh-ins. Two squadmates cried. One said she'd been waiting years.",
    "New pledges are choosing us specifically for the culture. Word has spread. The chapter is full.",
    "National cheerleading press wrote about us. 'The squad that changed the conversation.' Yes we did.",
    "Speaking at the national Greek leadership conference. My slides are very good. My presence is better.",
    "Coaches at other campuses have quietly stopped the weigh-ins. I'll take the quiet version too.",
    "What I built is permanent. The culture outlasts the captain. I am very large and very proud.",
  ],
  // ── BOOKWORM paths ──────────────────────────────────────────────
  eating_diarist:[
    "First newsletter issue. Thirty subscribers. Thirty is enough to start. I sent it. I ate dinner after.",
    "Six hundred subscribers. A literary agent emailed. I reread it four times before replying.",
    "Book deal. Two-book deal, actually. The second one hasn't been written yet. I'm already planning the meals.",
    "Published. The reviews say 'intimate,' 'unsettling,' 'surprisingly funny.' All correct. I ate at the launch.",
    "The book is being taught in a food studies course at a university I didn't attend. I sent them a note.",
    "I wrote the thing. It exists. The writing and the eating were always the same act. I understand that now.",
  ],
  food_researcher:[
    "Season panel approved the self-study. Officially an observation participant. The data I'm collecting is extraordinary.",
    "The institution is taking the season plan seriously. I have a prep station. I have a season plan funding request in. I have snacks.",
    "First hall log filed. Official copy. The reviewers called the methodology 'novel.' The methodology is me.",
    "Cited in three other papers. One of them is from a program I applied to and didn't get in. Interesting.",
    "Panel presentation at the athletics review. I arrived to the auditorium. The auditorium was not entirely prepared.",
    "The observer and the observation participant have fully merged. The experiment is complete. The participant remains.",
  ],
  // ── GAMER paths ─────────────────────────────────────────────────
  eating_streamer:[
    "First gaming + eating stream. Thirty-two viewers became four hundred in two hours. The chat was chaos.",
    "Regular mukbang gaming content now. The viewers who came for the games stay for the eating. Both grow.",
    "Community of dedicated viewers who follow every meal and every match. They send food suggestions. I use them.",
    "Platform featured me. The algorithm loves this exact combination. I've been doing it natively for months.",
    "Mukbang gaming legend. My clips get remixed. My food orders are documented by fans.",
    "The stream is always on. The eating never stops. I am the stream. The stream is me.",
  ],
  speed_eater:[
    "First timed challenge. Beat the record by forty seconds. The chat went silent and then exploded.",
    "Records are falling in order. I write them down. Then I break them. The list is long now.",
    "Regional eating championship, plus a speedrun of the new DLC, same weekend. Both won. Efficient.",
    "National recognition — two records in one week. The gaming community and the eating community overlap more than expected.",
    "I hold simultaneous records in gaming and competitive eating. I'm told this is unprecedented. Obviously.",
    "I've transcended both worlds. Speed means nothing when you're this size, this full, this complete.",
  ],
  ranked_feedee:[
    "Session log complete. I ate through two ranked matches, gained a rank, and finished everything Rae brought. I'm not thinking about any of this.",
    "The extras Rae keeps adding are not mistakes. I have accepted this. I have also accepted the extras. I am heavier than last week.",
    "Rae knows my schedule now. She knows my order. I'm not sure when this became a thing that was happening. It is currently a thing that is happening.",
    "Diamond. Also the desk area has been rearranged and I eat significantly more per session than I used to and Rae's delivery radius apparently includes my couch. These things are unrelated. Probably.",
    "I asked Rae how she knew what I was going to order before I ordered it. She said 'I pay attention.' This is the only answer I got. I've been thinking about it a lot. The food was excellent.",
    "Working as intended. The session runs. The food appears. Rae is here. I am very fat and very good at this game and that's the whole situation, filed under complete.",
  ],
  // ── SORORITY paths ──────────────────────────────────────────────
  chapter_hostess:[
    "First organized chapter feast. Twelve courses. Nobody left early. Nobody left not full.",
    "The feasting traditions are established now. Wednesday is feast night. Everyone knows.",
    "Other chapters are talking about our Wednesday feasts. Three people transferred in specifically for them.",
    "Greek-wide, our chapter is known for the food. Res life has noticed. They've been very quiet about it.",
    "Alumni are funding the feasts. A former sister sent a check with 'for the table' in the memo line.",
    "I am no longer chapter president. I am the feast. The feast continues without me. This is correct.",
  ],
  body_positive_greek:[
    "Proposal: end the weigh-in tradition, end the size requirements. One sister voted against. She later apologized.",
    "New pledges are choosing us because of what we stand for. The chapter is the largest we've ever had.",
    "National Greek press covered us. The article used the word 'radical' twice. We ordered pizza to celebrate.",
    "Speaking at the national Panhellenic leadership conference. My chapter is in the front row. We fill a row.",
    "The national organization quietly changed its guidance on member wellness. We were mentioned in the notes.",
    "What I started is permanent. My chapter grows. My body grows. Everything I built is real.",
  ],
  // ── OVERACHIEVER paths ──────────────────────────────────────────
  competitive_gainer: CG_FILLED_REACTIONS,
  // ── ARTSY paths ─────────────────────────────────────────────────
  installation_artist:[
    "First body-positive installation opened. One critic said 'challenging.' I consider that a win.",
    "Gallery interest from two cities. I will ship the work. I will also ship myself. The logistics are complex.",
    "Review in a major publication: 'unapologetically confrontational.' I am confronting them right now.",
    "Major exhibition, three rooms, one of them is me. Critics don't know where the art ends.",
    "Retrospective. A retrospective of someone who is still in progress. I appreciate the confidence.",
    "The body IS the final installation. The work and the artist have merged. I am the piece.",
  ],
  food_photographer:[
    "First food photography show: sold out. The prints were expensive. They bought them anyway.",
    "Gallery show opened. People stood in front of the biggest prints for a long time without speaking.",
    "A book deal: my images with my text. The publisher said the combination was 'unprecedented.' Good.",
    "Collector interest. A museum in Helsinki acquired three prints. I ate something extraordinary that night.",
    "Museum acquisition in three countries. The work is in permanent collections. So is the artist.",
    "The photographer became the subject. The subject has become the photograph. I've been hanging here for years.",
  ],
  // ── QUIET paths ─────────────────────────────────────────────────
  anonymous_blogger:[
    "First post went up at 2am. I didn't sleep. By morning, forty-three people had read it. That's forty-three.",
    "The following is growing. I don't know most of them. They don't know me. That feels exactly right.",
    "A post went viral. A journalist is trying to find me. I am very findable and also perfectly hidden.",
    "Journalists and podcasters want interviews. I do them by email only. My words, my body, my rules.",
    "I am a cultural phenomenon with no face attached. The anonymity is the whole point. Also the food.",
    "The blog and the body are the same record now. I wrote everything and gained everything. Both are real.",
  ],
  asmr_creator:[
    "First ASMR eating video. I whispered. I chewed slowly. Three hundred people watched in the first hour.",
    "Dedicated following, small and loyal. They leave very quiet comments. We understand each other.",
    "The algorithm found me. New viewers every day. They say it helps them sleep. I say I'm honored.",
    "Mainstream crossover. A content creator I watch cited me as an influence. I watched it four times.",
    "A therapist used one of my videos in a treatment session. She asked my permission first. I gave it.",
    "The sound of me eating has become something people find comfort in. I find comfort in the eating. We're even.",
  ],
  home_nest:[
    "Didn't go out today. Didn't need to. The food came. This is fine. This is better than fine, actually.",
    "I've been noting that I've developed something like a routine. Not on purpose. Things arrive. I eat them. It's comfortable. I haven't minded.",
    "Third delivery today. I usually stop at two. Ordered a third because it seemed like the right next thing. I like knowing what the right next thing is.",
    "Someone from the floor texted asking if I was okay. Said I was fine, just busy. This is accurate. I am busy. There's more to track than you'd think.",
    "The soup place messages me before I order now, to ask if I want the usual. I said yes. I like that the usual is a thing that exists. I like that they know.",
    "I've been here a long time. The room is the same. I'm different — softer, slower, more settled. The chair has accommodated me. I haven't wanted to be anywhere else.",
  ],
  delivery_hive:[
    "The room feels different tonight. Warmer. Softer. The delivery bags by the door don't feel like they belong to anyone else anymore. I keep catching myself touching my stomach without thinking. It's heavier than it was yesterday. I think the walls noticed.",
    "There are footsteps in the hallway that aren't mine. They stop at doors I didn't open. I don't have to ask them to bring things anymore. They just... do. My belly rests heavier against my thighs when I sit now. The room feels like it's breathing with me.",
    "Half the floor doesn't feel like it belongs to the hall anymore. It feels like it belongs to me. The air is thicker here. Warmer. People walk slower when they pass my door. I don't even have to speak. My body does the talking now.",
    "I don't move much anymore. I don't need to. The Hive moves for me. I can feel when a new room softens. It's like a warm pulse somewhere in the building. My body has become the center of something much larger than me. I think I like that.",
    "The whole dorm feels like it's breathing around me. I can feel the warmth in the walls. The deliveries don't even come to my door anymore. They just... arrive where they're needed. I am the heart now. Everything else is just circulation.",
    "I don't know where I end and the Hive begins anymore. My body is the warm center of everything. Rooms don't resist. People don't leave. They settle. They soften. They stay. I am no longer just Maya. I am the place they come home to.",
  ],
  // ── TRANSFER paths ──────────────────────────────────────────────
  campus_legend:[
    "The dining hall staff knows my order before I arrive. A booth has been 'mine' for three months.",
    "Stories are spreading. A freshman I've never met referenced 'the legend of the dining hall.' That's me.",
    "The booth now has my name on it. Unofficially. Then officially. The dining director did it herself.",
    "Future residents hear about me before they arrive. A campus tour guide mentioned me by name. She was kind.",
    "I am campus mythology. Incoming residents are told about me during orientation. I have heard this directly.",
    "I have become the campus. The campus has grown around me. We are one thing now.",
  ],
  salon_appetit:[
    "Première soirée — trois invités, fromage, vin. I said *j'ai faim* and meant it as philosophy.",
    "RA Mori followed the smell to my door. She stayed for dessert. I consider that a review.",
    "They whisper *Chloé's dinners* in the group chats. I pour more wine and let them.",
    "The campus writer watched me eat and called it performance. I called it Thursday.",
    "Rooftop, candlelight, protesters below. I raised my glass. The room ate with me.",
    "La Grande Soirée — twelve settings, black silk, *encore* until the sun. I am the salon.",
  ],
  artisan_gallery:[
    "First resident enrolled. First contact sheet pinned. The camera doesn't lie — only frames truth generously.",
    "Field roll on the quad: abundance everywhere, if you know how to look.",
    "Opening night — eight prints, critics, cheese. I ate in the corner on purpose.",
    "The Living Room: her timeline on the wall, her body live, heavier than the latest frame.",
    "Regional gallery wants the series. AIB calls it evidence. I call it archive.",
    "Permanent collection. Legacy program. I still shoot, still feed, still pin.",
  ],
  food_tourist:[
    "Systematic expedition through every cuisine available within thirty miles. Documenting everything.",
    "The blog has readers from three countries. Two of them recognize dishes from their home regions in my posts.",
    "A publication from my home country ran a feature. My family read it. My grandmother approved of the portions.",
    "Two book deals — one from here, one from home. Both publishers want the same story. I can give them both.",
    "Cultural ambassador is the phrase they use. I prefer 'someone who ate everything and wrote it all down.'",
    "I have tasted everything. I have grown into everything. The journey and the destination are the same.",
  ],
  // ── FARM GIRL paths ──────────────────────────────────────────────
  homestead_queen:[
    "The spread is set. Cast iron on every surface. I made sweet potato pie from scratch at 2am and I do not regret a single bite.",
    "Grandma Mae video-called and saw the setup. She said 'baby, you've got a real kitchen.' Coming from her that's everything.",
    "The recipe box arrived. Six generations of food in one box. I made every dish in four days. I kept notes on all of it.",
    "Mae calls every Sunday now. I always eat while we talk. She knows. She doesn't say anything about it except 'good girl.'",
    "She said I'm going to run out of room. She's right. I take up most of my homestead already. I am the homestead now.",
    "Mae drove up. She walked in and saw me — really saw me — and she started crying and then she started cooking. That's love.",
  ],
  state_fair_queen:[
    "First county fair, first pie table. Darcy from Meadowview looked at me like I was lost. She won. I went home and ate.",
    "Second year. Darcy said 'you again.' I was 60 pounds heavier. She barely won. She noticed.",
    "State qualifier. I crossed Darcy on the scoreboard for the first time. She stopped mid-bite. I kept going.",
    "State finals. Won. Darcy clapped. Full hand-claps, not polite ones — the kind that means she means it. That meant everything.",
    "Tri-state invitational. They built a bigger scale. I am the draw now. People come to see the numbers, not the pies.",
    "Grand invitational. I barely fit the tent. Darcy's in the open bracket. The contest is incidental. I am the fair.",
  ],
  // ── BOOKWORM alt path ────────────────────────────────────────────
  ff_author:[
    "I've been writing. The character is fictional. She happens to be a cheerleader and she happens to gain weight in chapter three. I have genuinely no idea where I got the idea.",
    "Posting anonymously. Fifteen thousand readers now. The chapter where the bookworm character gets stuck in her study carrel has a four-star average on the reaction tracker. I wrote her very carefully.",
    "Someone on the floor quoted a line from the group chat in passing. They didn't look at me. I ate an entire dinner thinking about whether they knew.",
    "Three hundred thousand words posted. Some of it is more honest about what I want than anything I've said out loud. The fandom writes their own versions. I read them late at night.",
    "The most popular character is based on myself. She gets everything she wants. The readership responds very well to this. So do I.",
    "The fiction and the body are the same project. I've known this for a while. The writing is just the form the knowing takes.",
  ],
  // ── FARM GIRL: wife_lessons ─────────────────────────────────────
  wife_lessons:[
    "Darlene kept calling it 'bake night.' I've stopped correcting her. Wanda knew what it was from the start. She sat down and ate and nodded and said 'I was wondering when someone was going to start this.' I love her.",
    "Patrice brought store-bought cookies like she was coming to a potluck. I didn't say anything. By the end she was asking for the full recipe. Taylor's hips are already starting — Patrice said her jeans 'fit different.' I know what that means.",
    "Cheryl came to watch. That's what she told herself. She ate four pieces of cinnamon bread and asked for the recipe on the way out. Madison gained seven pounds last month. Cheryl mentioned it like a personal record. It is.",
    "All six of them now. The room smells like butter for three hours before anyone arrives and for hours after they leave. Ruthanne said she doesn't fit through the same doorways she did last year. Becca said Sofia asked for the strong shake. Good.",
    "Lily figured out what's been in her food. She asked Ruthanne to teach her how to make it herself. Ruthanne came in glowing. That's the goal — when the daughter isn't just growing, she's growing on purpose. Kezia fills the whole sectional now.",
    "Wanda showed me a photo of Kezia. She changed bedrooms because her old one was getting narrow for her hips. She has a reinforced bed. She barely goes out anymore. Wanda is so proud she can barely look at the photo without crying. I understand completely.",
  ],
  // ── PSYCH paths ──────────────────────────────────────────────────
  psych_researcher:[
    "Session data: resident ate considerably beyond their baseline. I ate more than mine as well. I logged both. My notebook is running out of pages.",
    "The resident's response to the feeding dynamic has shifted — more anticipation, less resistance. I'm heavier too. I've started logging the sessions in a separate volume.",
    "I tried to stay clinical today and couldn't quite manage it. The resident was present in a way that I found difficult to categorize. My own data is getting interesting.",
    "I'm eating with the resident now, not just observing and facilitating. I stopped noting it as a deviation and started noting it as a variable. The weight is accumulating. Both of us.",
    "My desk chair requires leverage to exit. I logged that. I also logged how I feel about the session data, which is something I never did in week one of this hall log.",
    "Final session notes: I am very large, the resident is very large, the data is extraordinary, and I stopped pretending it's neutral sometime around stage three. The hall log is complete. The methodology got personal. Both are fine.",
  ],
  // ── ECED path ──────────────────────────────────────────────────
  homeroom_queen:[
    "Tuesday went well. Kayla had seconds. I didn't set out to do anything intentional today — I just noticed what they liked and made more of it. I'm noting that distinction.",
    "I made a richer batch this week. I told myself it was a recipe test. They ate everything. Mrs. Calloway's daughter asked to take some home. I said yes. I'm noting that I said yes quickly.",
    "Mrs. Monroe came inside for the first time. She sat at the table. She had four pieces and talked the whole time and laughed at everything. I didn't want her to leave. I'm noting that I made extra specifically because she was coming.",
    "I realized this week that I plan the Tuesday recipes around who's coming and what they respond to. Bri likes the heavier things. Kayla likes the sweet things. Mrs. Monroe likes everything. I'm noting that this is not random anymore.",
    "Mrs. Calloway brought me something in return. I sat with this for a while. The reciprocity feels significant. I'm noting that I feel warmly toward all six of them now and that I'm going to keep making Tuesdays happen for as long as I can.",
    "End of term. All six of them in the room. Everything I made was gone in an hour. I watched them eat and I felt — I'm not sure I have the language for it. Useful. Purposeful. Like I was exactly where I was supposed to be. I'm noting this.",
  ],
  // ── CULINARY path ──────────────────────────────────────────────
  cultivator:[
    "First session with the taste tester. She ate everything without asking what was in it. I made notes on her appetite, her pace, her stopping point. She has no stopping point. This is going to be methodical.",
    "The taste tester is visibly larger. I didn't note surprise in my log because I'm not surprised. The process is working. I ate the quality-control portions carefully. I gained three pounds this week. I'm logging that.",
    "She fills the chair differently now. I adjusted the portions upward accordingly. Richer base on the milkshake. Ganache on the cake. She asked what changed. I said 'recipe refinement.' She accepted this and finished everything.",
    "The taste tester is at a size that requires some recalibration — the chair, the portions, the approach. I've recalibrated. My own appetite is increasing. I've started keeping a second log for personal data. It seems relevant.",
    "I ate the leftovers after the session today. There were a lot of leftovers. I stayed in the kitchen for a long time. I'm noting that I find this work deeply satisfying in a way that extends well past professional interest.",
    "Last session before harvest. She sits across from me very large, very full, and entirely unaware of how this concludes. I ate alongside her — quality control, always quality control — and I felt full and satisfied and exactly right. My own numbers are considerably higher than when I started. I've stopped being surprised by this.",
  ],
  // ── BOOKWORM path ───────────────────────────────────────────────
  machine_goddess:[
    "First device deployed on a willing floor volunteer. The readouts matched prediction within eight percent. I logged the variance anyway. I also logged how my pulse changed when the belt cycled on.",
    "The workshop smells like solder and vanilla paste now. Three prototypes running concurrently. I keep calibrating my own intake as 'material cost.' The scale agrees with the metaphor more than it should.",
    "A malfunction last week should have been alarming. Instead I stayed up rerunning the failure curve until 3am. The volunteer's belly was enormous afterward. So was mine, from stress-eating beside the bench.",
    "I stopped describing the devices as experiments. They're infrastructure. My body is infrastructure too — raw polymer, heat-formed, repurposed into better machines.",
    "Campus whispers about the engineering resident with the harnesses. I don't correct them. Correction is inefficient. Installation is the point.",
    "Devices tick on bodies I equipped myself. My own mass feeds the builds that feed everyone else. The workshop hums whether I'm in it or not. I find that correct.",
  ],
  community_researcher:[
    "First floor session. I went in as lane captain. I ate what was offered because refusing felt like skewing the intake log. I'm noting my own meals separately from the training log.",
    "The case study is developing. I'm present at more sessions than the season plan technically requires. The residents haven't noticed I'm eating alongside them. I've noticed.",
    "I stopped pretending the log is what I'm there for. I'm still writing, but the writing is increasingly personal. The distinction between captain on the sidelines and captain at the table is getting thin.",
    "I've had to add a second protocol section. The first covers the residents. The second covers me. Both sections have been growing at a similar rate.",
    "The hall log is going to be honest. It was going to be clinical and dispassionate. It's going to be all of that and also honest. I'm a variable. I'm writing myself in.",
    "I'm the largest person in every room I enter for case-study purposes. I've been in a lot of rooms. The intake record on floor immersion is extensive. The final season report will be original.",
  ],
};


export const EVOLVED_OUTFITS = {
  sumo:[
    "Training gear — compression shorts, a thick practice mawashi worn over sweats. Built for the ring, nothing else.",
    "Practice uniform fits like it was made for her body because it was. Her coach measured everything twice.",
    "Competition mawashi, ceremonial and precise. The weight of the garment is nothing compared to the weight she carries.",
    "Championship regalia. Her manager handles the presentation garments now. She receives them without comment.",
    "Ceremonial attire between bouts — a wide kimono-style wrap, open, relaxed. She fills it completely.",
    "She wears what's comfortable. Everything is wide, everything is soft, everything accommodates what she's become.",
  ],
  eating_competitor:[
    "Contest shirt — her sponsor's logo, custom-ordered, already tight at the collar. She wears it with pride.",
    "Circuit gear. Tracksuit in her competition colors, sponsor patches on both sleeves. She's recognizable now.",
    "Competition day: her lucky shirt, three sizes larger than last year's lucky shirt. The luck transferred.",
    "Sponsored athlete gear head to toe. The brand sent custom pieces without being asked. They know what fits.",
    "She travels in her competition colors. Hotels recognize her. The food arrives before she finishes checking in.",
    "Whatever she can find that accommodates her. Competition gear is custom now. She doesn't mind.",
  ],
  feedee_creator:[
    "Content-ready always — camera-friendly outfit, good lighting angles considered, food accessible on the table.",
    "Soft-era aesthetic fully embraced. Flowy pieces in warm colors, everything shot-ready, nothing restrictive.",
    "Her brand has a look: comfortable, abundant, unapologetic. The clothing is part of the content.",
    "Custom pieces from brands that sponsor her. Wide cuts, premium fabric. She wears them on camera first.",
    "Everything wide, everything deliberate, everything designed to be seen doing exactly what it's doing.",
    "The outfit doesn't matter as much as what she's eating. But she looks incredible. Both things are true.",
  ],
  body_positive_creator:[
    "Brand-deal clothing — the good kind, the kind made for her actual body. She wears it on camera first.",
    "Press-ready always. A wardrobe coordinator helps now. The clothes are extraordinary.",
    "She dresses for the platform and for herself simultaneously. The overlap is large. So is she.",
    "Everything she wears becomes merch demand within a week. The stylist has learned to expect this.",
    "Billboard clothing. Iconic pieces. A wardrobe that says exactly what she wants to say.",
    "She wears what exists at this scale. It has been made for her. It fits. She has arrived.",
  ],
  eating_captain:[
    "Squad training gear in team colors, eating bib on top. The combination is both absurd and completely correct.",
    "Team competition uniform, custom-ordered in her specifications. She had input on the design. It shows.",
    "Full captain regalia at events. The title is on the back of her jacket in block letters.",
    "Championship gear. The athletic director commissioned a custom set after the national invite.",
    "Her jacket has more patches than room for patches now. She had an extension panel added.",
    "She wears the captain's sash everywhere. Nothing else fits the way it used to. The sash always fits.",
  ],
  big_squad_captain:[
    "Squad jacket modified by her own hand — the old size requirements cut out, new ethos written in marker on the lining.",
    "The uniform that fits the body, not a body built to fit the uniform. She commissioned it herself.",
    "Chapter captain gear in their colors. Wide, dignified, present. She made the design.",
    "Her conference presentation outfit. A wide-fit suit she wore on the national stage. Donated to the chapter archives.",
    "Custom everything now, all of it chosen deliberately. She knows what she's saying with what she wears.",
    "She dresses like the monument she's become. The chapter follows her lead. The closet is legendary.",
  ],
  eating_diarist:[
    "Cardigan open over a good dress. Writing outfit. She eats while she writes and the outfits accommodate this.",
    "She dresses for the reading series now — events, talks, bookstore signings. Wide linen, good earrings.",
    "Book launch outfit: a wide-cut statement piece she chose six months before the book came out.",
    "Speaking engagement attire. She has a rotation now. Everything wide, everything deliberate, everything documented.",
    "She dresses the way she writes — with intention, with detail, with nothing apologized for.",
    "Whatever fits this body. She has a tailor. The tailor is excellent. The clothes are extraordinary.",
  ],
  food_researcher:[
    "Hall cardigan, custom-ordered. The standard one didn't cover the data. She made a note in the protocol.",
    "Hall casual with a purpose — she needs pockets, always. The blazer accommodates everything.",
    "Presentation attire for panel reviews. Wide-cut, professional, memorable. The slides are also memorable.",
    "Panel outfit. Her institution had a photographer there. The photos are impressive.",
    "Observation gear that accommodates field work, desk work, and being the field. Practical and extraordinary.",
    "She dresses like someone whose hall log has outlasted the original hypothesis. With confidence.",
  ],
  eating_streamer:[
    "Stream outfit — comfortable, camera-ready, no restriction. The snacks are in frame. She is in frame.",
    "Gaming hoodie, eating bib, both sponsors represented. The aesthetic is cohesive by now.",
    "Her branded gear from the platform deal. She wore it live. The chat went immediately to 'new merch?'",
    "She dresses for the camera and for six to eight hours of sitting. Wide, soft, documented.",
    "Merch she designed herself. The sizing runs large because she asked for that specifically.",
    "She wears what fits. Everything is wide. The setup is custom. She is the best part of the setup.",
  ],
  speed_eater:[
    "Competition shirt, timer-ready, sponsor logo centered. She pins the bib herself before every contest.",
    "Her lucky competition tracksuit. It has been let out twice. The luck has not diminished.",
    "Full competition gear, both sponsors represented, her record count in small text on the sleeve.",
    "Championship kit. Her coach had it made when the national record fell. She wore it the next day.",
    "She travels in her competition colors. Everything is custom. The logos are earned.",
    "She wears what accommodates her. Everything does, because everything is made for her now.",
  ],
  ranked_feedee:[
    "Gaming hoodie and worn-in joggers. Slightly short in the hem now. The setup is what matters, not the outfit.",
    "Oversized gaming tee from a sponsorship she forgot applying to. Fits for now. For now.",
    "Wide soft hoodie and stretched-out joggers. She stopped checking if things match. The food matches. That's enough.",
    "Custom wide-cut gaming hoodie that appeared in the delivery pile one day. Fits perfectly. Destiny hasn't asked how.",
    "Soft wide everything. She stopped buying clothes. Things appear and they fit. She's stopped asking questions about this.",
    "She wears what's comfortable, which is now a very specific kind of enormous and soft. The chair was built around her. The clothes followed.",
  ],
  chapter_hostess:[
    "Hosting apron over her chapter formal. The apron has seen more feasts than most dining rooms.",
    "Full chapter formal for Wednesday feasts. She instituted a dress code. She set the example.",
    "Event attire that says 'I am in charge of this table and this table is magnificent.'",
    "Her signature wide-cut blazer and the chapter's formal colors. She has hosted in this outfit at the national level.",
    "She commissions one new hosting outfit per semester. The tradition is documented in chapter records.",
    "She dresses like the feast she's hosting — abundant, deliberate, impossible to ignore.",
  ],
  body_positive_greek:[
    "Chapter colors in a wide-cut blazer she had commissioned when the old one stopped working.",
    "Conference attire. She wore this on a national stage. The outfit has its own legacy.",
    "Full formal in chapter colors, every detail chosen deliberately, nothing apologized for.",
    "Her speaking outfit. She could be recognized by it at this point. That's not an accident.",
    "She dresses for the culture she's building. Intentional. Inclusive. Exactly as large as she is.",
    "Everything is custom. Everything fits. Everything says exactly what she wants it to say.",
  ],
  competitive_gainer: CG_FILLED_OUTFITS,
  installation_artist:[
    "Something she made herself — fabric, found materials, a garment that documents the body wearing it.",
    "Gallery opening attire that is itself a piece. Visitors aren't always sure where the show starts.",
    "Her major exhibition outfit. It was photographed by three publications. It's in the catalogue.",
    "She dresses for the work and the work dresses her. The boundary is genuinely unclear.",
    "Retrospective attire: something that holds the whole arc of the work. She designed it herself.",
    "She wears her body the way she makes installations: with intention, with presence, as the piece itself.",
  ],
  food_photographer:[
    "Gallery opening attire — something that photographs well, because someone will always photograph her.",
    "The outfit she wore when the Helsinki museum acquired the prints. She remembers it exactly.",
    "Book launch clothes — a wide statement piece that appeared in press photos. Recognizable.",
    "She dresses for both sides of the lens now. The subject understands the photographer.",
    "Her studio look: wide linen, room to move, good in the shots her assistant takes behind the scenes.",
    "Everything is custom, everything is deliberate, everything accommodates the body that makes the work.",
  ],
  anonymous_blogger:[
    "Anonymous-compatible — nothing identifiable, nothing logo'd, nothing that would give her away.",
    "She dresses for invisibility and comfort simultaneously. Both are achieved.",
    "Cozy, unremarkable from the outside. The inside is the work. The outside protects it.",
    "She has a consistent aesthetic that nobody has been able to place online. She maintains it carefully.",
    "Wide, soft, present in rooms, invisible in photographs. The balance is intentional.",
    "She dresses for the life she's living, which is enormous and private and exactly as she planned.",
  ],
  asmr_creator:[
    "Soft textures only — the microphone picks up fabric noise, so everything she wears is deliberate.",
    "ASMR-compatible clothing. She's thought about this more than most people think about anything.",
    "Recording day attire: soft fabrics, nothing synthetic, nothing that will interrupt the session.",
    "She dresses for sound now as much as sight. The clothes are very quiet. So is she.",
    "Wide, soft, silent fabric. She moves slowly and everything moves slowly with her.",
    "She wears the textures that are kindest to the microphone. Also the ones kindest to her skin.",
  ],
  home_nest:[
    "Soft oversized tee and wide comfortable shorts. She's home. This is what home looks like.",
    "A very large soft hoodie and wide comfortable pants — both ordered online when the previous comfortable things stopped being comfortable.",
    "Soft wide everything. She's been in this outfit for two days. It's still the right outfit.",
    "Her warmest, widest set. She's stopped owning clothes that are for going out. They all look like this.",
    "The hoodie is enormous and warm and the pants don't require any decisions. This is the right system.",
    "She wears what's soft and accommodating and doesn't require thought. That's all. It fits perfectly.",
  ],
  delivery_hive:[
    "Lavender lounge clothes, soft enough to vanish into the blankets while the first delivery bags gather around the desk.",
    "A wide hoodie in pear-lavender tones, stretched comfortably over her lower-heavy body as the room grows warmer and more organized.",
    "Layered blankets and custom lounge pieces arranged around the mass of her hips and thighs, less outfit than Central Nest uniform.",
    "Soft draped fabric, wide enough to accommodate her stationary shape, threaded with little delivery pins and warm violet light.",
    "An enormous lavender wrap and reinforced cushions; the clothes no longer suggest she will be leaving, only receiving.",
    "What she wears is part blanket, part throne, part room. The Hive dresses around Maya now.",
  ],
  campus_legend:[
    "Her dining hall regular outfit — the clothes she's worn so often here that they're part of the myth.",
    "Comfortable campus gear in her colors. Residents recognize the outfit before they recognize the face.",
    "She dresses like someone who belongs here completely, because she does.",
    "Wide everything. Soft everything. Exactly as present as she is.",
    "The outfit that appears in the campus tour guide's description. She didn't plan this.",
    "She wears what fits. Everything fits because everything was eventually made to fit.",
  ],
  food_tourist:[
    "Travel-ready always — practical, wide-cut, pockets for the notebook and the camera.",
    "Her blog aesthetic: dressed for wherever the food is, which is everywhere.",
    "The outfit she wore in the home-country magazine feature. Both publishers asked to use it.",
    "She dresses for the food, not the other way around. The food is everywhere. So is she.",
    "Cultural bridge attire — something that belongs in two places. She found it. It fits.",
    "Wide, practical, present. Made for someone who is both places at once.",
  ],
  ff_author:[
    "Cardigan open, something soft underneath, laptop always nearby. She's found the writing uniform and she doesn't deviate from it. She eats while she writes. The snacks appear and disappear without her noticing.",
    "An enormous pullover, hair up, the desk organized around two monitors. One for the document, one for the comment section. She checks both with equal seriousness.",
    "Wide linen trousers and a loose top with pockets — the outfit of someone who has committed fully to desk life. She has a look now. It accommodates everything.",
    "Custom-ordered wide pieces in soft, dark colors. The desk chair has been upgraded twice. Everything in her space has been chosen to accommodate her completely.",
    "She dresses for the body she has and the life she's built around it. Everything wide, everything deliberate, everything soft. She looks like what she writes about, which is to say: exactly what she wants.",
    "She wears what fits. Everything fits because everything is made for her now. The room is made for her. The desk is made for her. She writes surrounded by things that understand what she is.",
  ],
  // ── FARM GIRL paths ──────────────────────────────────────────────
  homestead_queen:[
    "Denim overalls over a flannel shirt that she's had since high school. The overalls are cinched at the sides but her belly rounds out the front bib completely. She's warm and smells like cinnamon and brown sugar.",
    "The flannel has been traded for a loose linen top — easier to move in, and the overalls have been retired in favor of wide-leg jeans with an elastic waist she doesn't bother to explain. Her chest fills the top completely.",
    "A wide cotton housedress — she found a seamstress to make it to her measurements — and a full apron tied at the back that does most of the practical work. She looks entirely at home because she is.",
    "She's given up pretending the apron is for protection — it's load-bearing now, the ties cinched around the widest part of her, her belly testing the front pocket. The dress underneath is the widest she owns.",
    "A single enormous piece of wide-cut fabric that functions as both dress and apron. She made it herself. The pattern is from Mae's notebook. She fills it entirely and with great comfort.",
    "The apron is the outfit. It is, structurally, enormous — she had it sewn to fit her — and under it there is a wide cotton shift and nothing else. She is warm and present and the room smells like everything she's made.",
  ],
  state_fair_queen:[
    "Competition tank and stretch shorts — the standard circuit uniform, sized up significantly. Her chest strains the front. She has her entry number pinned to the side because there's no room on the front.",
    "A competition jersey with her name on the back, her region on the front. It was made for someone smaller and she has not replaced it. The fabric pulls across her chest and rides up over her belly at the bottom.",
    "Custom-fitted competition jersey, her name printed large enough to read from the stands. It was made to her measurements two months ago and is already getting tight across the front.",
    "Sponsor logos across the jersey — four of them, which is a measure of how serious this is now. The jersey is wide enough to hold all four and still stretch across the full geography of her chest.",
    "The jersey has become a document. Every patch and print and logo has had to be repositioned as she's grown. The current version was made last month. The seams are already tested.",
    "A competition banner-jersey sewn to her exact measurements by a custom sportswear maker who has done this exactly once before. It fits perfectly. She fills it perfectly. It reads less like a uniform than a flag.",
  ],
  // ── FARM GIRL: wife_lessons ─────────────────────────────────────
  wife_lessons:[
    "Wide gingham apron over a full blouse and a long skirt. She looks like a woman who has owned a kitchen for decades and is correct about it.",
    "The blouse has been replaced with a loose linen top that gives more room across the chest and belly. The apron is still tied properly in the back. She looks warm and purposeful.",
    "A wide cotton dress with the apron over it, the ties cinched behind. Her belly fills the front of the apron completely. There is flour on the bib.",
    "Homemade wide-cut dress with the apron tied in front now — it won't reach around back anymore. She moves through the kitchen with the ease of someone who knows exactly where her body is.",
    "A very wide cotton housedress. The apron is symbolic at this point. She wears it anyway. She'll always wear the apron.",
    "The housedress is enormous and entirely comfortable. The apron still goes on every time, no matter what. Her belly rounds the front of it smooth and warm. The kitchen is organized around her presence.",
  ],
  // ── PSYCH paths ──────────────────────────────────────────────────
  psych_researcher:[
    "Hall cardigan over a blouse. Pristine. Notebook prominent. A 'Hall Log Active' lanyard.",
    "Hall cardigan, wider cut. Stretch professional blouse underneath. Still the lanyard.",
    "Custom hall cardigan, noticeably larger. The blouse underneath strains slightly. Notebooks doubled.",
    "Wide professional hall cardigan. She's given up on fitted anything underneath.",
    "Hall cardigan barely buttons. She wears it open. The blouse beneath is custom-ordered.",
    "Hall cardigan enormous and custom-made. She wears it like a robe. It suits her.",
  ],
  // ── ECED path ──────────────────────────────────────────────────
  homeroom_queen:[
    "A wide cotton apron over a soft button-up and practical trousers. She smells like cinnamon and brown sugar from the morning's test batch.",
    "A loose linen top over stretch trousers, her large apron cinched across the middle. The apron has flour on it before she even arrives.",
    "A wide jersey dress with a practical apron over it. She has a second apron in her bag. She's learned to have a backup.",
    "A soft wide-cut housedress and a full apron tied at the back. She moves through the kitchen like she owns it, which at this point she functionally does.",
    "A roomy printed housedress with deep pockets, her heavy-duty apron layered over the front. The pockets hold the notebook. The apron holds the flour.",
    "An enormous soft tunic over wide-leg trousers, her apron purely ceremonial at this stage. The kitchen has been arranged around her. She fills it warmly.",
  ],
  // ── CULINARY path ──────────────────────────────────────────────
  cultivator:[
    "Chef's coat, well-fitted, a utility apron tied over. Clean knife roll at her hip. She looks entirely professional.",
    "Chef's coat, slightly wider cut. The apron still fits. She's added a second front pocket for the session notebook.",
    "A stretch-panel chef's coat. She had it custom-tailored and doesn't mention this. The apron is a generous cut.",
    "A wide-format chef's jacket, minimal fuss, purely functional. The coat is very large and moves well. She bakes in it.",
    "A custom chef's coat at considerable scale, apron tied at the front with effort. She moves through the kitchen with full authority.",
    "An enormous chef's coat, apron decorative at this point. The kitchen was rearranged around her reach and she approves of the arrangement.",
  ],
  machine_goddess:[
    "Hall cardigan over a hoodie, cargo pants, fingerless gloves. Solder burns on the cuffs. She smells like flux.",
    "Reinforced work coveralls, pockets full of hex keys and calipers. The coat buttons strain when she leans over the bench.",
    "Custom harness-friendly layers — wide belt loops, stretch panels at the waist. Built for wearing her own prototypes.",
    "Industrial coveralls with tool rigging across the chest. Paste stains on the collar. She doesn't notice anymore.",
    "Oversized tech-wear in matte black, LED status pins along the sleeves. Her body fills it like another machine casing.",
    "The workshop clothes are half armor, half uniform — wide, soft, engineered around a body that feeds the builds. She belongs to the lab now.",
  ],
  // ── SWIMMER path: lane captain ─────────────────────────────────
  community_researcher:[
    "Team jacket over a fitted tank, practice shorts, training log always in hand. The unofficial uniform of lane captain. Nothing about her appearance is an accident.",
    "The jackets are looser now — chosen with room in mind. The shorts have been replaced with joggers that accommodate more. She still carries the log.",
    "Zip hoodie over a sports bra she no longer tucks in. Her figure is noticeably fuller under the layers. She's stopped arranging herself for the team photos.",
    "Oversized meet-day hoodie, leggings that hold everything together, slides on her feet. The training log is in a bigger bag now, next to a protein shaker.",
    "Warm-up pullover, stretch joggers, comfortable slides. She carries herself with the ease of someone who has found the outfit that works and has several of it.",
    "She moves slowly, deliberately, the way captains who have lived the season plan eventually move. A wide hoodie open over a soft tee, everything forgiving and full. The log is still there. It always will be.",
  ],
};

export const EVOLVED_ACTIVITY_TEXT = {
  sumo:[
    (s)=>`She finds you at the RA desk in her mawashi-bag and warm-ups — ${Math.round(s.lbs)} pounds, belly round and forward, a competitor's calm on her. "Regional qualifier today," she says. "Dana Mercer's there. She's 340. I want you to watch." She doesn't ask. You go. You watch a former cheerleader try to push a six-year veteran out of a ring with her belly, and very nearly do it. She loses by inches and isn't discouraged at all. "She's still bigger than me," she says afterward, eating. "For now."`,
    (s)=>`She stops by before the circuit tournament — ${Math.round(s.lbs)} pounds, looser and surer than last season. "The gap's down to fifty pounds," she says, meaning her and Dana. "I feed in my corner now. Every bout I get a little bigger, and she has to move all of it." You come watch. Between bouts she eats — bowl after bowl in her corner — and you watch her grow over the course of the afternoon, her belly settling lower each break, until she nearly takes the Wall down with the weight of it.`,
    (s)=>`Conference meet. She's ${Math.round(s.lbs)} pounds and for the first time she outweighs the rival who used to dwarf her. "Watch the board today," she tells you. "My number goes up top." It does. Dana stares at it and says "there it is," and then she goes out and makes the number mean something — belly-first, driving Dana out of the ring twice while the crowd, for the first time at this level, chants her name.`,
    (s)=>`National qualifier, and there's press at the door. She finds you before warm-ups — ${Math.round(s.lbs)} pounds, the heaviest competitor in the building by a mile, her belly an enormous warm apron under the mawashi. "Dana says she'll out-think me," she says, almost amused. "Watch how that goes." You watch. It does not go well for Dana. Size has become an argument that ends discussions, and she spends the whole bracket eating in her corner to make the argument bigger.`,
    (s)=>`National final. The arena. She's ${Math.round(s.lbs)} pounds and the credential reads COMPETITOR and she finds you in the crowd beforehand. "Watch the weigh-in," she says. Just that. You watch the official pause a full second before reading her number, watch the arena take a breath before it comes apart, watch the largest competitor the sport has ever certified walk to the center of the dohyo like she was always going to end up there. Dana is already clapping.`,
  ],
  eating_competitor:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's in the bib and she's sitting at the table and the crowd is filing in and she is already studying the plate with the focused attention of someone who has thought about nothing else for a week. She is the largest competitor at this table. The next biggest is 210. When the timer starts she moves with an economy that looks casual until you realize the plate is more than half empty at the ninety-second mark. She finishes first. She sets her utensil down and waits. The official records her time. She finds you after and says: "I want to weigh more next time. I want to weigh more for every competition from now on." She means it as a training strategy. She eats the entire return-trip meal on the drive home.`,
    (s)=>`${Math.round(s.lbs)} pounds at weigh-in. The MC announces competitors by weight and when he says her number the crowd's reaction is different from the others — not louder, but more focused. She is substantially the largest woman at the table. Her belly presses against the bib. Her thighs fill the chair. The plate is designed for a 225-pound person's reasonable limits. She eats it in two minutes and thirty seconds. She exceeds the category record. The official verifier confirms. She sits back and breathes for a moment, belly full and pressing forward, and looks at the results board with the expression of someone who already knows they're going to do this until there are no records left.`,
    (s)=>`${Math.round(s.lbs)} pounds. The regional record attempt. The target is announced — the current record, two minutes forty — and the crowd goes quiet when she sits down because ${Math.round(s.lbs)} pounds of woman settling into a competition chair is a notable event. The bib barely reaches around her belly. She doesn't look at anyone. She looks at the plate. The timer starts. She eats with the methodical inevitability of tidal motion. She exceeds the target by fifty-three seconds. The official is already writing before she finishes. She asks you afterward: "How much do I need to weigh to be physically disqualifying for a weight class? I want to exceed it." She's asking about the open category. She means she wants to weigh enough that no weight class can contain her.`,
    (s)=>`${Math.round(s.lbs)} pounds at the national event. She's the largest competitor the event has ever had. They had to custom-fabricate a wider chair and bib. She sits down and the room gets very quiet and then very attentive. Her belly is enormous — it fills her front completely, warm and round, pressing against the bib, her thighs vast on either side of the chair. The plate is the standard plate. She eats it the way you eat something too small for you: methodically, completely, in a time that sets a new national record. She asks you to take a photo of her with the results board and the time visible. "I want to remember being ${Math.round(s.lbs)} pounds at nationals," she says. "Next year I'll be bigger."`,
    (s)=>`${Math.round(s.lbs)} pounds. The world record attempt. The venue is the largest she's eaten in front of, the crowd is quiet in the way crowds get when something unprecedented is happening, and she sits at the center table with her enormous belly warm against the bib and her thighs spread wide and her face completely still. The plate arrives. She begins. The clock ticks. At one minute she is already past where most competitors finish. At two minutes she is past where the record is. The official stands. The room erupts. She finishes the plate anyway — every last thing — and sets down her fork and looks at you across the room. "I want to come back heavier," she says, when it's quiet enough to hear. "Every time. I want to come back heavier every time until I can't fit in the venue." The crowd is still making noise. You're the only one who heard her.`,
    `She comes to you with the notebook — the one she's kept since the first contest, every time and every record, every circuit and every opponent. 'I think I'm done with competition,' she says. Then she orders twice what would have been a normal dinner and eats with exactly the same focus, the same economy, the same certainty. Competition was never the point.`,
  ],
  feedee_creator:[
    (s)=>`You're in the studio for the first collab. She's at ${Math.round(s.lbs)} pounds and her collab partner — whoever she chose — is across the table and both sides are set and the ring light is on. You watch from the back wall. The chat grows through the stream in the specific way a chat grows when it's found something true: not a spike, a steady sustained climb. By the end of the stream a user called wrenWatchesEverything has subscribed and said: I found this by accident. I'm not leaving.`,
    (s)=>`Six weeks in and you arrive at the studio as the pre-stream warmup food is being finished. Both of them, ${Math.round(s.lbs)} pounds on Kylie's side, the partner's weight across from her, both of them warm and loading and getting ready. You stand against the wall for the stream. The chat knows the format now. The regular viewers type to the new ones: this is what it always is. They mean: mutual. They mean: real.`,
    (s)=>`You watch the featured collab from the back of the room. The platform editorial pick brought 12,000 new subscribers and they're all here tonight, watching Kylie at ${Math.round(s.lbs)} pounds and her partner eat together on camera for the first time, and you can see in the chat the exact moment each new viewer understands what the format is. Wren is typing: top donor four streams running, hi. Wren has been here the whole time. The new audience is about to join her.`,
    (s)=>`The brand collab. You're in the studio as the sponsor's food is set on both sides of the table. ${Math.round(s.lbs)} pounds of Kylie and her partner's weight across from her, both of them warm and loaded and ready for the biggest sponsored stream they've done. You watch from the corner. Wren donated the full goal before the stream started. The brand's analytics team sends an email before the stream is over. The numbers are better than predicted. The numbers are always better than predicted.`,
    (s)=>`Anniversary collab and Wren is in the building. You meet her in the waiting area: 200 pounds, slightly shaking with excitement, a person who has watched this happen weekly for a year from behind a screen and is now here in the room. You walk her to the studio floor. She sees Kylie — ${Math.round(s.lbs)} pounds in the corner, enormous and warm — and she stops moving for a moment. Then she finds her chair outside the camera frame. The stream starts. She doesn't move for the next two hours.`,
    (s)=>`Grand collab. 820 pounds in the corner, the custom setup, the boom camera, the collab partner enormous across the table, Wren in a chair four feet outside the frame. You stand against the back wall. 300,000 concurrent viewers. Both women eating with the complete focused certainty of people who have been doing this for a year and know exactly what they're doing. Wren is four feet away, watching the stream on her phone while also being in the room, somehow both present and audience. You watch from the back. You are always watching from the back. That is correct. This is theirs.`,
  ],
  body_positive_creator:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the rebrand video is up. Her belly rounds forward against her shirt. Her thighs press together in her chair. The comments come in fast — the old audience confused, the new one ecstatic. She reads the good ones aloud: you look real, you look like someone I know. "I weighed 130 when I started posting," she says. "I weigh 257 now and this is the most-watched thing I've ever made." She refreshes. The number climbs. She films herself reacting to it and posts that too.`,
    (s)=>`${Math.round(s.lbs)} pounds and the clothing campaign shoot. The photographer asks her to stand naturally. She stands naturally — belly forward, thighs wide, ${Math.round(s.lbs)} pounds of warm present woman — and the result is accurate. She studies the shots on the camera back. "That's me," she says. "Finally." She eats lunch between setups, in the campaign outfit, in front of the whole crew, and nobody says a word about it. The afternoon shots are better. She's a little fuller. The brand uses both.`,
    (s)=>`${Math.round(s.lbs)} pounds and the TEDx talk prep. She rehearses it in her living room, food on the coffee table. The talk is twelve minutes about her body specifically — her belly, her thighs, the 291 pounds she's gained since she started, and what it meant that it meant something to her. She says "I weigh ${Math.round(s.lbs)} pounds" directly to you as practice audience and her voice doesn't waver at all. She eats the rest of the coffee table food between run-throughs. The talk is excellent. You tell her so. She nods once and gets a second plate.`,
    (s)=>`${Math.round(s.lbs)} pounds. The billboard: 14 feet tall, her belly and face and thighs in wide-fit denim, every part of her at her exact size. You drive past it together at night, lit up. She gets out and stands on the sidewalk looking up at it for three full minutes. You stand beside her. Her belly in the cold air, the billboard above. "I want it to say the number," she says. "I want people to drive past and see ${Math.round(s.lbs)} pounds on a billboard." The brand calls the next morning. They think that's a great idea.`,
    (s)=>`${Math.round(s.lbs)} pounds. The profile piece journalist came to her — she doesn't travel for interviews anymore. They talked for four hours, she ate throughout, the piece is 8,000 words. It describes her at length: her belly enormous and warm pressing the dining table; her thighs vast in the custom chair; her face calm when she says "I weigh ${Math.round(s.lbs)} pounds and this is the most myself I have ever felt." The piece ran Thursday. By Saturday it was the publication's most-read piece in four years. She read it once and said: "accurate." She had dinner. She filmed it.`,
  ],
  eating_captain:[
    (s)=>`She taps on the lounge door in her competition gear — bib around her neck, hair up, competition number pinned to her jacket, ${Math.round(s.lbs)} pounds warm and ready and forward in the doorframe. "Regional Open today," she says. "I wanted to tell you." She doesn't ask you to come. You come anyway. She's a cheerleader captain who has decided she's something else now, and she wants a witness.`,
    (s)=>`She stops by before she leaves for the circuit meet — ${Math.round(s.lbs)} pounds, the bib already on, and she's looking good, the specific loose confidence of someone who has stopped being new at something. "Maya's going to be there," she says. "Maya's 370." She says it the way people say things they've been thinking about for a while. "I know," she says. Then she leaves. You follow her out.`,
    (s)=>`Conference championship day. She's ${Math.round(s.lbs)} pounds and the competition bib she ordered three months ago is tight across her belly now and she wears it like it fits because it fits exactly as she wanted it to fit. "The board's going to have my number at the top," she tells you before she leaves. "I want you to see that." You go. The board has her number at the top. The judge reads it into the microphone. Maya puts the cap back on her marker.`,
    (s)=>`National qualifier. She stops by your RA desk the morning of — ${Math.round(s.lbs)} pounds, dressed to compete, the number already pinned. "There's going to be press," she says. "A journalist." She says it like she's telling you something, not asking. "Maya told me I'm the best she's ever seen." She pauses. "Maya's right." She leaves. You get in your car and follow the van to the venue.`,
    (s)=>`National championship. She's ${Math.round(s.lbs)} pounds and the arena credential is around her neck and the woman at the door held the door open wider when she came through and didn't say anything about it. She finds you in the crowd before the event. "Watch the weigh-in," she says. Just that. Then she goes backstage. You watch the weigh-in. The arena goes quiet when they read her number.`,
  ],
  big_squad_captain:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the weigh-in board is gone from the gym wall and she's standing in front of 18 cheerleaders — plus two new squadmates who'd never come before, soft-figured and nervous — explaining what this squad is now. Her belly rounds forward against her practice jacket. Her thighs press together. She tells them: size requirements are abolished. No weigh-ins. Performance is the standard. Then she adds: "And I expect you to eat well. I want this to be the heaviest squad on campus." She says this with the same tone she uses for formation notes. Like it's obvious. Like it's training.`,
    (s)=>`${Math.round(s.lbs)} pounds and rush week. She runs the information session — her belly forward, her thighs wide, ${Math.round(s.lbs)} pounds of warm, authoritative squad captain — and every recruit who comes through the door is evaluated on the same terms: is she committed, can she cheer, does she want to be here. Two recruits arrive who are visibly heavy — 220, 230 pounds — and would have been turned away under the old rules. She asks them their names and invites them to the next practice. The chapter gets bigger that day in every sense.`,
    (s)=>`${Math.round(s.lbs)} pounds and the journalist is at practice. She runs the formation the same way she always does. Her belly, enormous and warm, presses against her practice uniform as she moves through the choreography. Afterward she tells the journalist: "I weigh ${Math.round(s.lbs)} pounds. Two years ago I couldn't have been on this squad. Now I run it. That's the change." She pauses. "Also three of my squadmates weigh over 250 now and they're the best cheerleaders we've had. You can print that too."`,
    (s)=>`${Math.round(s.lbs)} pounds. The national athletics panel keynote. She arrives in the chapter's colors — wide and warm, her belly a vast presence in the auditorium — and speaks for forty minutes without notes about what cheerleading can be when it stops requiring particular bodies. She says the specific number: she weighs ${Math.round(s.lbs)} pounds. She says it clearly, without apology, into a microphone in front of 400 people. The room goes quiet. Then it doesn't. You're watching from the fourth row and the person next to you is crying a little and so might you be.`,
    (s)=>`${Math.round(s.lbs)} pounds. Homecoming. She's in the stands now — she watches the squad perform the halftime show she choreographed, the formations she designed, the culture she built. Her belly fills her stadium seat. She eats from a large bag through the whole performance. The new captain runs it perfectly. In the third formation she leans forward slightly and nods, once, with the private satisfaction of someone watching something they made work without them. "It held," she says.`,
  ],
  eating_diarist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she sends you the first newsletter draft at 11:47pm. 1,400 words. She's written about the last three months — specifically, directly — her belly getting rounder, her clothes stopped fitting, the meal she ate that made her understand something. The writing is exact. She says: "I weigh ${Math.round(s.lbs)} pounds and I didn't plan this but I'm not apologizing for it either." You tell her to send it. She does. Forty readers. By morning it's 400.`,
    (s)=>`${Math.round(s.lbs)} pounds. The agent calls. The agent has read every newsletter. "This is a book," the agent says. "You, eating, your body, what it means. Everything you've been writing." She calls you after the meeting and you can hear her eating while she talks. "She wants me to describe my belly in the book," she says. "I told her I already do that." She does. Her belly at ${Math.round(s.lbs)} pounds is warm and round and she has described it in three newsletters and she'll describe it in six more before the draft is done.`,
    (s)=>`${Math.round(s.lbs)} pounds. Draft review. She reads you a passage: she's describing her thighs — ${Math.round(s.lbs)} pounds of thigh, pressed together, warm — with the precision of someone who has been paying close attention for two years. "Is this too much?" she asks. You say no. She says: "Good. I want it to be too much. I want whoever reads this to understand exactly how much I weigh and what that looks like and feel it." She eats while you finish reading. She adds a paragraph.`,
    (s)=>`${Math.round(s.lbs)} pounds. Book launch. A bookstore, an evening, 200 people. She reads for twenty-five minutes from the chapter that describes the morning she weighed 400 pounds for the first time — the scale, the number, the way she stood there and felt what 400 pounds felt like from the inside. She says: "I weigh ${Math.round(s.lbs)} pounds now. The book ends at 400. The second book starts here." Someone in the front row asks how much the second book will end at. She says: "More."`,
    (s)=>`${Math.round(s.lbs)} pounds. The second book's final draft. She sends it on a Sunday morning. You read it that day — 90,000 words about her body at every stage above 400 pounds, her belly described at each increment, her thighs, her arms, the way chairs feel, the way food tastes when you weigh ${Math.round(s.lbs)} pounds and you've been eating intentionally for three years. You text her that night: it's the best thing she's written. She replies an hour later: "I know. I was at dinner when you texted. My belly was so full I couldn't move and I kept thinking: I need to describe this exactly. I'm adding a chapter."`,
  ],
  food_researcher:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the season panel approval came through — she is both observer and participant, officially, with institutional backing. She shows you the approval document. Her belly presses against the desk as she leans forward to point to her name in the participant section. "Primary participant," she says. She starts data collection that afternoon: weight, intake, measurements, date. The first entry is ${Math.round(s.lbs)} pounds. She takes it seriously.`,
    (s)=>`${Math.round(s.lbs)} pounds. Station visit. She shows you the setup: scale, measurement tape, intake log, weekly protocol. She stands on the scale for you: 315. She measures her waist, her hips, her belly circumference — she writes the numbers down without expression. Then she opens the meal log. She's tracked every meal for eight weeks. The graph goes up. "The data is clean," she says. "The participant is cooperative." She means herself. She records your visit. She makes you sign as a witness.`,
    (s)=>`${Math.round(s.lbs)} pounds. Pre-filing draft. She shares it over dinner — she eats while you read it, answering questions in the margins you indicate. The protocol section describes her body at each measurement point with measured precision. Her belly at ${Math.round(s.lbs)} pounds is described in centimeters. Her thighs in circumference. Her weight gain graphed by week. The conclusions are unambiguous: "Resident demonstrates continued voluntary intake increase consistent with season plan objectives." She eats the rest of her dinner. "I want to be fatter when the second hall log volume comes out," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Acceptance email. She forwards it with no message. You call her. She's eating — you can hear it. "They accepted it," she says. "Resident at ${Math.round(s.lbs)} pounds, hall log ongoing, first volume filed." She laughs once, briefly. "I'm the most thoroughly documented fat woman on this floor," she says. "I documented myself. I'm very proud of both of those things." She eats.`,
    (s)=>`${Math.round(s.lbs)} pounds. Panel review. She stands at the hall lounge mic — ${Math.round(s.lbs)} pounds, enormous, her belly a warm presence against the podium table — and presents for fifty minutes on appetite, voluntary weight gain, and longitudinal self-documentation. She puts her own measurements on the slide. Her waist, her belly, her hips — every number, publicly. The audience is silent. She finishes. The first question is: "How much do you plan to weigh at the end of the season plan?" She says: "More than this." She says it exactly like an observer with a hypothesis she has already confirmed.`,
  ],
  eating_streamer:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the stream is live. She's in the middle of a boss fight and the bowl of ramen is already half gone. Her belly presses against the desk edge. Her thighs fill the gaming chair. The chat is going extremely fast — half of it is the game, half of it is her, her body, the food disappearing. She finishes the boss and the ramen at almost the same time. She looks at the camera. "I'm ${Math.round(s.lbs)} pounds," she says. "I gained nine pounds this month." The chat reacts. The viewer count goes up.`,
    (s)=>`${Math.round(s.lbs)} pounds. Mid-stream. You're watching from across the room. She's been live for two hours, three meals, one dungeon run. Her belly presses forward noticeably. The gaming chair accommodates her thighs with some compression. The chat has a name for her now — a specific nickname that refers to her weight and her size — and she uses it herself without hesitation. She pauses the game and opens a delivery bag while the load screen runs. She says to the camera: "I'm ${Math.round(s.lbs)} pounds now. Look at my belly." She turns slightly toward the camera. The chat erupts.`,
    (s)=>`${Math.round(s.lbs)} pounds. Viral clip review. She pulls it up: forty-three minutes into a stream, she leaned back in her chair and her belly pushed the controller off the desk. She caught it. The chat went wild. Twelve million views. She watches the clip with you, eating, her current 418-pound belly pressing the desk. "I was 380 in that clip," she says. "I'm bigger now." She says this with satisfaction. "I want to be 500," she says. "I want the 500-pound stream to be the biggest thing I've ever done." She goes back to the game. She orders more food mid-dungeon.`,
    (s)=>`${Math.round(s.lbs)} pounds. Platform feature. The algorithm has picked her up — her eating streams, her gaming, her body and its specific size on camera. New viewers arrive each week. She shows you the analytics. She's the most-watched eating-gaming hybrid on the platform. She weighs ${Math.round(s.lbs)} pounds and the camera frames her belly in every thumbnail. "They found me because I'm fat," she says. "I'm going to stay fat. I'm going to get fatter." She opens a delivery bag. She puts it in frame deliberately and opens it toward the camera. "Let them watch," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Four-hour stream, full run. You're in the corner watching. She weighs ${Math.round(s.lbs)} pounds and she fills the gaming chair entirely, her thighs pressing the armrests, her belly warm and vast against the desk. The food comes in at regular intervals. She eats without pausing the game. The chat is 40,000 people and they are watching her eat and play and be ${Math.round(s.lbs)} pounds in a gaming chair and she talks to them like friends. At the end of the stream she looks at the camera and says: "I'm ${Math.round(s.lbs)} pounds. I want to be 800 by the end of the year." The chat confirms this unanimously.`,
  ],
  speed_eater:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's at the table and the timer is in the hand of the official and she's studying the plate with the focus she used to give to game strategies. Her belly rounds softly under her bib. The plate is designed for a 200-pound person's limits. She eats it in ninety-three seconds. Record for the category. She finds you after and says: "I want to weigh more for the next one. I want to be 290 before the regionals. The more I weigh the more I can eat at once." She says this like it's physics.`,
    (s)=>`${Math.round(s.lbs)} pounds. Record attempt. She's on the scale beforehand — 317, certified — and the crowd reacts to the number because it's much more than the previous record holder, who was 240. She settles at the table. The timer starts. She eats with an economy that looks casual until the crowd realizes the plate is three-quarters gone at the forty-five second mark. She finishes in eighty-nine seconds. New record. She asks you immediately: "Did you see how much easier it was? ${Math.round(s.lbs)} pounds is easier than 285 was. I need to weigh more."`,
    (s)=>`${Math.round(s.lbs)} pounds. Cross-discipline week. Gaming speedrun on Monday, eating record on Wednesday. She shows you both notebooks — same handwriting, same system, same optimization. On Wednesday she weighs ${Math.round(s.lbs)} pounds and the target plate is very large. She eats it in the time she's projected on paper. She projected it accurately. Her belly is warm and round and substantial and she presses her hands to it after and says: "I want to know what 500 pounds can do at this table." She says it like a hypothesis.`,
    (s)=>`${Math.round(s.lbs)} pounds. National event. Three thousand people in an auditorium and she walks in and the crowd goes loud when they see her — ${Math.round(s.lbs)} pounds, her belly vast and warm against the bib, her thighs enormous, her presence filling the entrance. She settles at the table. She waits for the signal. She eats. The time she posts is not just a record — it's so far past the record that the official checks it twice. She stands up afterward and the crowd is extremely loud and she finds you in it and says: "I need to weigh more. 600 before the invitational." She is already planning.`,
    (s)=>`${Math.round(s.lbs)} pounds. She's at the world record table and she weighs ${Math.round(s.lbs)} pounds and the other competitors are watching her arrive with the expression of people running the numbers and arriving at an uncomfortable conclusion. The plate is the standard plate. She eats it in sixty-seven seconds. The room erupts. She sits for a moment, belly warm and full, and looks at you. "I want to be 750," she says. "750 pounds at the table. I want to know what that feels like." You believe her completely.`,
  ],
  chapter_hostess:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's been in the chapter kitchen for four hours, which is two hours more than the feast requires. Her belly presses the apron forward. Her thighs fill her kitchen clothes. She has cooked 23 separate dishes. The table is extraordinary. When the chapter arrives — fourteen sisters, some of them already soft-figured and getting softer, one at 230 pounds who has been to every Wednesday feast for six weeks — she watches them eat with the quiet satisfaction of someone feeding exactly the people she wants to feed. She eats at the end. She eats a very great deal.`,
    (s)=>`${Math.round(s.lbs)} pounds. Feast night. The table is set. She circulates during the meal — suggesting more of the pasta to one sister, pressing the bread on another, refilling plates before they're empty. She is ${Math.round(s.lbs)} pounds and she is the largest person in the chapter room and she moves through the space like someone who knows exactly what she's doing. One sister — maybe 245 now, soft belly visible under her formal blouse — looks at her belly with a particular expression. She notices. She puts a third portion of dessert in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The alumni donor comes to Wednesday feast. She sits at the table and eats with the chapter. She serves her personally. Her belly is enormous and warm and she navigates the kitchen and the dining room completely at ease. The alumni donor is 340 pounds, gray-haired, and she watches her work. At the end she says: "I funded this for eight years without understanding it. I understand it now." She puts another plate in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The new pledge class's first Wednesday feast. She has planned it for three weeks — more ambitious than the regular feasts, more food, more courses. She wants the pledges to understand what they've joined. Her belly is enormous when she moves through the kitchen. Her thighs are vast. She serves everything personally. By the end of the feast the pledge class is in various states of very full contentment, three of them visibly, noticeably heavier than when they arrived. She sits at the head of the table and eats what remains and is satisfied with all of it.`,
    (s)=>`${Math.round(s.lbs)} pounds. Her last Wednesday feast as chapter hostess. She has cooked the same feast she cooked the first time plus ten additional dishes. The kitchen ran for seven hours. She is ${Math.round(s.lbs)} pounds and she stands at the head of the table to welcome the chapter and her belly is vast and warm and she is the most magnificent person in the room by every measure. The chapter eats. She eats. Afterward she sits among the sisters and doesn't say very much. Her successor will be trained. The feasts will continue. But this one is hers.`,
  ],
  body_positive_greek:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's standing in the chapter room explaining the new rules: no weigh-ins, no size requirements, commitment and character and wanting to be here. Two recruits in the back are 220 and 230 pounds — they've been told by two other sororities that they don't fit. She introduces herself to them specifically. Her belly rounds forward in her chapter jacket. Her thighs press together. She tells everyone: "I weigh ${Math.round(s.lbs)} pounds. I run this chapter. If anyone has a problem with that they are in the wrong room." Nobody is in the wrong room.`,
    (s)=>`${Math.round(s.lbs)} pounds. First pledge class under the new rules. She reads the modified induction ceremony — she cut every size reference from the traditional script, she wrote new language in its place. The new language says: you belong here because you want to be here. She reads it to 24 women, several of them very large. The room is quiet. Then it isn't. She eats at the induction dinner afterward with her sisters and her thighs spread wide in the chapter seat and she is very content.`,
    (s)=>`${Math.round(s.lbs)} pounds. Journalist visit. She runs practice the same way she always does. After, the journalist asks her about her weight. She says: "I weigh ${Math.round(s.lbs)} pounds. I gained about 220 pounds since starting this chapter. I think it's the best thing I've ever done, both the chapter and the weight. They happened together." She pauses. "You can print the number. I want people to know the number." The journalist does. The piece runs the following month. The chapter's rush numbers triple.`,
    (s)=>`${Math.round(s.lbs)} pounds. National Panhellenic conference. She speaks for forty minutes — ${Math.round(s.lbs)} pounds at the podium, her belly warm and enormous, her voice steady. She says the number out loud. She talks about what size requirements cost the sorority system. At the end a representative of the national organization stands and says: "We need to talk about revising some policies." She says: "Yes. We do." She has a draft ready. She pulls it from under the podium and hands it across.`,
    (s)=>`${Math.round(s.lbs)} pounds. Chapter event, two years after stepping down. The culture is intact. The new captain is 310 pounds and runs things with the same principles. The feast table has women at various large sizes around it. She sits at the corner and watches. Her belly fills her chair. After the meal, in the parking lot: "It held," she says. She means the culture. She means the weight. She means all of it.`,
  ],
  installation_artist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the studio smells like plaster and oil and whatever she's been eating, which is a lot. The first installation is spreading across the floor in fragments: photographs of her belly at each weight since she started, sound recordings of eating, a cast of her own hand. She sits cross-legged on the floor between them eating from a takeout container and her belly rounds forward over her thighs, soft and warm, pressing the hem of her shirt. "The work is about the body as a document," she says. "My body specifically. At ${Math.round(s.lbs)} pounds. Getting heavier." She reaches past the plaster and takes another bite.`,
    (s)=>`${Math.round(s.lbs)} pounds. The gallery walkthrough. She moves through the installation in the linen overshirt she wears when she works — large, well past her hips, draping over the swell of her belly — explaining each piece to the curator, who is writing things down without looking at the page. The centerpiece is a scale casting of her belly at 280 pounds, smooth and round and large, mounted at standing height so visitors interact with it face-to-face. She pats it as she passes. "It's already out of date," she says. She turns to face the curator. "I want to update the cast when I'm 400." The curator nods. She keeps walking.`,
    (s)=>`${Math.round(s.lbs)} pounds. Review day. She reads the piece from the major publication aloud, making notes in the margins in red. The critic has focused entirely on the concept and almost entirely missed the body, which she considers a failure of nerve. "They couldn't say it," she says. "They described the work without describing what the work is about." She circles the passage. Her belly, enormous and warm, presses the desk as she leans forward. "The work is about being this fat," she says. "${Math.round(s.lbs)} pounds. Getting fatter on purpose. The art is the evidence." She underlines this. She adds it to her artist statement.`,
    (s)=>`${Math.round(s.lbs)} pounds. Major exhibition, three rooms. The centerpiece of room two is a grid of 42 photographs of her belly taken at each week since she started the project — the first frame slim, the last frame showing 541 pounds of warm, round, heavy belly filling the center of the shot. Visitors stand in front of it a long time. You stand in the doorway and watch them. She comes to stand beside you, eating from a soft pretzel, her belly vast against her dress. "They're counting the photos," she says. "They keep losing their place." She watches. "I want to add frames through 700," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. The retrospective opens. She stands near the entrance, enormous and warm, her belly filling the front of her dress, her thighs broad and slow-moving as she walks the room. She eats from a small plate without stopping or sitting. The final room is the largest: it contains only her body cast at each major weight milestone — 200, 280, 360, 450, 540, 630, and the newest, taken last week at 691. They are arranged in a curved line, getting larger, each one warm cream-colored plaster, each one smooth and heavy and real. A group of onlookers stand at the end of the row looking at the largest cast and then looking at her and then back. She lets them. She eats.`,
  ],
  food_photographer:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the shoot takes four hours. She sets up the table — the food, the lighting, the angle — with the care of someone who knows the right position, and she works through it in silence except for the clicking shutter. In the final frame of the session she's in it: one arm reaching toward the dish, her belly visible below the table edge, soft and warm, ${Math.round(s.lbs)} pounds of her present in the shot as naturally as the food. You see it on the camera's screen. "That one," you say. She looks. She doesn't disagree.`,
    (s)=>`${Math.round(s.lbs)} pounds. Gallery installation day. She hangs the prints herself — the dining director loaned her the ladder — and reviews each one at standing distance, eating an apple while she walks the wall. She makes two adjustments. Then she looks at the full wall for a long time. The largest print is 40 by 60 inches: a meal photographed from above, her own belly visible at the bottom of the frame, round and warm and at ease, ${Math.round(s.lbs)} pounds of her in frame as naturally as any other element. "That's the one that matters," she says. You ask why. "Because it's honest about where the camera was."`,
    (s)=>`${Math.round(s.lbs)} pounds. The book proof arrives by courier. She opens it at her kitchen table and goes through it page by page while eating, making soft marks in pencil. At page 47 she stops. The spread shows her belly at 340 pounds in one frame, her hand reaching into the dish in the other. "I want to do a second book," she says. "With the new frames." She pats her belly — ${Math.round(s.lbs)} pounds of it, warm and vast and present — without emphasis, just touching something that's hers. "I need to reshoot chapter four. I'm bigger now. The frame is wrong."`,
    (s)=>`${Math.round(s.lbs)} pounds. The Helsinki email. The museum's letter is formal and very detailed and confirms the purchase of three prints for the permanent collection. She reads it twice, sits still for a moment, then makes dinner — the specific meal she always photographs when she wants to mark something. You watch her set it up: the bowl, the angle, the light. She takes four shots. She puts the camera down and starts eating. Her belly is warm and enormous against the table edge. "I want to go to Helsinki," she says. "I want to eat there and photograph what I eat." She eats. "I want to be fatter when I go."`,
    (s)=>`${Math.round(s.lbs)} pounds. Helsinki. She sends photographs — the prints hung in the permanent collection, lit correctly, in a quiet room with pale walls. The last image is her at the museum restaurant, ${Math.round(s.lbs)} pounds, her belly warm and vast against the table, a large meal in front of her. Nothing written in the message. You enlarge the photo. The food is beautifully composed in front of her. Her belly fills the lower third of the frame. The image is technically perfect. She photographed herself, you realize, via the restaurant's mirror. She framed it like a self-portrait. You respond: "This is the best thing you've made." She replies two days later: "I know."`,
  ],
  anonymous_blogger:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she messages you at 11:52pm with a link. No context. You click it: an anonymous food blog, the first post, published twenty minutes ago. You read it three times. She has written about eating — specifically, directly, with the precision she brings to everything — about what it feels like to weigh ${Math.round(s.lbs)} pounds and still be hungry and want to be heavier and not apologize for any of it. She has not named herself. She has described herself exactly. You message back: "This is very good." She doesn't respond. In the morning there are 200 readers.`,
    (s)=>`${Math.round(s.lbs)} pounds. She opens the analytics dashboard and shows you: 8,000 readers, 64 posts, sixteen months of weekly entries. The post about her belly at 285 pounds is the most-read thing on the site. She scrolls to it and reads the first paragraph aloud — she describes her belly at 285 pounds pressing the edge of the desk, the specific warmth of it, the way she pressed her palm against it and felt herself — and her voice is steady and the current version of that belly, at ${Math.round(s.lbs)} pounds, presses the same desk. "I'm going to update the post," she says. "It's out of date."`,
    (s)=>`${Math.round(s.lbs)} pounds. The viral post. She shows you the traffic spike: a single post, shared by a large body-positive account, then four more, then a journalist. 80,000 readers in a week. The post is about being 380 pounds and wanting to be 500 pounds and not finding that shameful. She reads the comments with you: mostly readers who say they've never read something that described exactly what they feel. "They think I'm anonymous for privacy reasons," she says. She is ${Math.round(s.lbs)} pounds and she is eating a bowl of pasta as she reads this. "I'm anonymous because I like it. Because they meet the writing first." She eats. "They'll figure it out eventually. I'm not worried."`,
    (s)=>`${Math.round(s.lbs)} pounds. The journalist interview. She shows you the email thread: the journalist found the blog, wants to speak with the author, "for a significant feature." She drafts her response — by email, anonymous, questions answered directly. One question is: "How much do you weigh?" Her answer is: "${Math.round(s.lbs)} pounds as of this morning. I weigh myself weekly. You can print that." She shows you before she sends it. You tell her to send it. She does. The feature runs two weeks later with a photograph she provided: her belly at ${Math.round(s.lbs)} pounds, cropped at shoulder and mid-thigh, no face. No name.`,
    (s)=>`${Math.round(s.lbs)} pounds. She shows you the full archive — every post, from the first 200-reader entry to today's. She scrolls slowly. There are 118 posts. In the most recent one she weighs ${Math.round(s.lbs)} pounds and she describes her belly in precise detail: the apron below the navel, the way it rests on her thighs when she sits, the warmth of it, the specific weight. She describes wanting to be 800 pounds. She published this six hours ago. She is eating while you read it. "They're looking for me again," she says. Three forum threads are up, trying to identify the blogger from body description alone. They have four candidates. She is not one of them. She looks pleased about this. She eats.`,
  ],
  asmr_creator:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and everything in the recording setup is deliberate: the microphone, the lighting, the specific foods in the specific order. She sits down, adjusts the mic two degrees left, and looks at the food for a long moment. Then she begins. The sounds fill the room — soft, careful, completely present. Ninety minutes later she reviews the first five minutes, nods, and begins the careful work of editing. Her belly rounds softly forward against the desk, warm and present, ${Math.round(s.lbs)} pounds of her at home in the chair.`,
    (s)=>`${Math.round(s.lbs)} pounds. Community session. She opens the comments from the most-watched video and reads each one aloud, slowly, eating while she reads. The viewers describe the videos as calming, grounding, necessary. One says: "I eat along with her every week. I've gained twelve pounds this semester. I think she's made me comfortable with that." She reads this one twice. She says: "Good." She means it plainly. Her belly presses the desk at ${Math.round(s.lbs)} pounds and she's very comfortable with that too.`,
    (s)=>`${Math.round(s.lbs)} pounds. The algorithm finds her. She shows you the analytics — the spike, the jump from 6,000 to 60,000 subscribers in three weeks. She is ${Math.round(s.lbs)} pounds and her recent thumbnails show her seated at the recording setup, her belly a warm rounded presence in frame, her face calm. "The old viewers are managing the new ones," she says. "Teaching them how to behave." She shows you the comment section — the longtime subscribers welcoming newcomers, explaining the ritual. "I'm proud of them," she says. She starts the next recording. Her belly fills the lower half of the frame beautifully.`,
    (s)=>`${Math.round(s.lbs)} pounds. The mainstream crossover. A large creator — 3 million subscribers — mentioned her channel in a video about comfort content. She watches the mention twice, sitting very still both times. "I don't want it to change," she says. It doesn't. The new subscribers find the ritual and most of them observe it correctly. The videos are exactly as they were: the soft sounds, the careful pace, the food, her belly at ${Math.round(s.lbs)} pounds rounding forward into the frame, warm and enormous. She records the next one that evening and it's the best thing she's made.`,
    (s)=>`${Math.round(s.lbs)} pounds. The therapist collaboration video. She's been planning it for two months — a licensed therapist explains, briefly and carefully, the clinical basis for the calming effect of ASMR eating content, and then the session proceeds normally. At ${Math.round(s.lbs)} pounds, seated at the recording setup, her belly vast and warm and completely at ease, she eats slowly and deliberately for ninety-five minutes. The video has 2.1 million views in a week. The comment section is the same as always: people saying they're fed, they're calm, they feel okay. She reads them with you. "I weigh ${Math.round(s.lbs)} pounds," she says. "I eat on camera. It helps people." She is very satisfied with this. She opens a new delivery order.`,
  ],
  salon_appetit:[
    (s)=>`Chloé weighs ${Math.round(s.lbs)} pounds and the dorm smells of butter and wine. Three guests arrive to find candles already lit, cheese already breathing on the board. She pours without asking who wants what. "In Paris they teach you to stop," she says, biting a croissant. "Here they teach you to continue." She means it as philosophy. The guests leave curious and full.`,
    (s)=>`${Math.round(s.lbs)} pounds in black silk, hostess at the door. RA Mori followed the smell of coq au vin and stayed for dessert — staff lends prestige, Chloé lends appetite. She charms the room between courses, feeding herself with theatrical pleasure while the wine loosens every conversation.`,
    (s)=>`They whisper *Chloé's dinners* in group chats she is not in. She reads one aloud, amused, at ${Math.round(s.lbs)} pounds. The campus writer attended last week and left flushed, notebook open. Chloé pours more wine. "Let them arrive hungry," she says.`,
    (s)=>`The piece published: *A Transfer's Salon of Excess*. Chloé is ${Math.round(s.lbs)} pounds and reads it twice. "They call me dangerous," she says, pleased. Rooftop bookings follow. Protesters chant wellness slogans below. She raises her glass and eats anyway.`,
    (s)=>`Twelve settings. Twelve place cards. Chloé is ${Math.round(s.lbs)} pounds and welcomes them in French, then English, then mostly with her hands on her own waist. "Tonight," she says, "we do not stop." The digestif never ends. Someone applauds. She curtsies without standing.`,
    (s)=>`La Grande Soirée closes at dawn. Chloé is ${Math.round(s.lbs)} pounds, silk clinging where she's grown fullest, the guest book thick with names. She finds you in the kitchen afterward, licking pastry cream from her thumb. "*Encore,*" she murmurs — not to the room anymore, to the semester itself.`,
  ],
  artisan_gallery:[
    (s)=>`Fiona weighs ${Math.round(s.lbs)} pounds and pins the first contact sheet to *In Progress* — a resident mid-bite, mid-laugh. "The subject cooperates," she says. "The camera doesn't lie." Release forms become art contracts. Everyone signs.`,
    (s)=>`${Math.round(s.lbs)} pounds on the quad with a camera and hunger. She photographs abundance without apology — strangers' softness, dining-hall regulars, the honest curve of a bench under someone who's stopped pretending. The field archive grows fat with frames.`,
    (s)=>`Opening night: eight prints, critics, cheese. Fiona is ${Math.round(s.lbs)} pounds in linen that won't survive the evening. She eats in the corner on purpose — performance and documentation the same act. A critic writes *uncomfortably generous.* She pins the review beside the work.`,
    (s)=>`The Living Room: her resident model stands beside a timeline on the wall — stage three, stage five, live and heavier than the latest frame. Fiona is ${Math.round(s.lbs)} pounds and introduces them: "The work continues. She continues." The crowd hushes. Then it doesn't.`,
    (s)=>`Regional gallery wants the series. AIB calls it evidence. Fiona is ${Math.round(s.lbs)} pounds and calls it archive. She publishes online anyway. Patrons explode. Scrutiny follows. She shoots more.`,
    (s)=>`Permanent collection. Legacy program. Fiona is ${Math.round(s.lbs)} pounds and still shooting, still feeding, still pinning — museum-grade, institution made flesh. New residents every semester. The wall never stops growing.`,
  ],
  campus_legend:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the dining hall staff has her usual ready before she sits down. The booth is the largest one — corner, good light — and she fills it well at ${Math.round(s.lbs)} pounds, her thighs spreading warmly across the bench, her belly soft against the table's edge. A table of first-years watches her order. One of them leans to another and you can see the question being asked: the second one shrugs and says her name. The first one's eyes widen. You eat across from her. She is working through her third plate.`,
    (s)=>`${Math.round(s.lbs)} pounds. The booth gets a brass nameplate. The dining director installs it herself, a small ceremony: her name and a date. She looks at it for a long time, belly warm and round against her sweater at ${Math.round(s.lbs)} pounds, thighs broad and easy on the bench. "Is this weird?" she says. You say no. She looks at it again. "No," she says, "it's right." She sits back down. The kitchen sends out a complimentary fourth plate. She eats it. The staff watches from the service window with the satisfaction of people who made a good call.`,
    (s)=>`${Math.round(s.lbs)} pounds. Campus tour. You're beside her at the booth when a guided tour passes — a prospective resident group, a campus ambassador pointing out notable spaces. The guide stops, consults their clipboard, and says: "The dining hall is considered one of the best on campus. There's actually a resident here who — " and then the guide looks up and sees her and goes briefly still. She lifts a hand from her meal. The tour group looks at ${Math.round(s.lbs)} pounds of her filling the corner booth, warm and enormous and fully at ease. The guide recovers. "— who is something of a campus institution," the guide finishes. She takes another bite.`,
    (s)=>`${Math.round(s.lbs)} pounds. Orientation week. She sits in the back of the first-year orientation session and watches — ${Math.round(s.lbs)} pounds, enormous in the common room seat, her belly warm and vast, thighs filling the space between armrests. A returning resident on the panel says: "The dining hall is great. There's a resident, you'll hear about her." Several first-years look around. She doesn't raise her hand. After the session a first-year finds her outside and says: "Are you — " and she says: "Yes." The first-year looks at her for a long moment, at ${Math.round(s.lbs)} pounds of her, and says: "Can I sit with you sometime?" She says yes.`,
    (s)=>`${Math.round(s.lbs)} pounds. End of year. She sits in the booth — the one with the plaque — and eats for two hours while the dining hall empties around her. Residents who know her come by: goodbye, see you next year, have a good summer. The kitchen staff comes out at closing to say goodbye. She shakes hands with the dining director, who holds on for an extra moment. She is ${Math.round(s.lbs)} pounds and she fills the booth completely, her thighs pressing the walls, her belly warm and vast against the table. She finishes what's on the last plate. She sits for a moment in the quiet dining hall. She looks at the nameplate. She touches it once. "I'll be bigger when I come back," she tells the director. "Make sure the booth still fits."`,
  ],
  food_tourist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the notebook is already 60 pages in: every restaurant visited, everything ordered, the specific flavors described in careful language. Today's expedition runs four hours. She orders one of everything on the section she hasn't tried yet and eats with the focused attention of someone conducting research she finds genuinely pleasurable. Her belly is soft and rounded against the restaurant table, warm and present, ${Math.round(s.lbs)} pounds of her entirely at home in the chair. Afterward she writes for an hour in the parking lot. "I want to try all of it," she says, meaning everything.`,
    (s)=>`${Math.round(s.lbs)} pounds. The home-country blog post. A reader reached out — a restaurant run by someone from their home village, serving dishes from the specific region she described in week three. She goes that week. The meal runs five hours. She writes 4,000 words about it. She sends you a photo of the table: eight dishes, her hands in frame at the edge, ${Math.round(s.lbs)} pounds of her soft and warm and thoroughly fed. The post goes up at midnight. By morning it's been shared by every food account in the diaspora community she wrote about. The restaurant owner calls her. She goes back. She eats everything again.`,
    (s)=>`${Math.round(s.lbs)} pounds. Publication interview. The food magazine has been following the blog for a year. The journalist arrives, they sit down, and the journalist orders what she orders. The meal is six courses and the interview runs through all of them. She speaks in the language of her home country for twenty minutes when they reach the section of cuisine she's been homesick for; the journalist records it and notes the exact moment she switches. She is ${Math.round(s.lbs)} pounds and she eats throughout without apology and the finished piece notes this specifically, with admiration. "${Math.round(s.lbs)} pounds," she says when they reach the final course. "I came here weighing 147. I am going to be so much larger by the time this is done."`,
    (s)=>`${Math.round(s.lbs)} pounds. Two book deals, same video call. Both editors on the call simultaneously, which was her agent's idea and which she found presumptuous and then correct. She is eating during the call — a meal from a restaurant she's documenting, phone propped against a glass. Both editors are startled. She says: "This is the book. You are watching me do it." One editor says: "Can you describe what you're eating?" She does: dish name, origin region, flavor, why she ordered it, why it matters, why she is ${Math.round(s.lbs)} pounds and still finding things to eat that are new. The call runs three hours. Both deals close.`,
    (s)=>`${Math.round(s.lbs)} pounds. The last restaurant on the original list. She goes alone, she has told you — this one she needs to finish alone. She sends a photo from outside: the sign, the street, her hand visible at the edge. Then nothing for four hours. Then: a photograph of the table, cleared, every plate empty, the notebook open to a completed page of dense writing. Then: "Done." She calls you from the cab. "I finished the list," she says. Her voice is very calm. "I'm starting a new list tonight." She is ${Math.round(s.lbs)} pounds and she has eaten every cuisine she set out to eat and she sounds exactly like someone who has just finished something and is already thinking about what comes next.`,
  ],
  ff_author:[
    `She hands you a printed chapter — single-spaced, no cover page, the kind of document someone produces when they haven't decided yet if they're sharing or just showing. The protagonist is round and soft and described with unusual attention. The eating scenes are specific. You read it slowly and hand it back. She watches your face the whole time and says nothing. You tell her it's good. She goes home and opens the document and writes for six hours.`,
    `She sends you a new chapter by email with no subject line. You read it on your phone before bed. The protagonist's body is described at length in a scene you read twice: the belly spilling over a waistband, the thighs wide and warm, the way she takes up space in a chair that's beginning to accommodate her completely. You recognize the figure. You know this body. You close the phone and lie in the dark for a while thinking about what she's decided to say, and how, and why she sent it to you.`,
    `She shows you her profile page — a pseudonym, five completed chapters, a kudos count climbing past a thousand. The comment section has noticed something. One reader writes: 'I don't know who these characters are based on but I need to know more about Magdalene.' You look at the character description. You know exactly who that is. She's eating a sandwich while you read this. She's very calm. 'The comments are nice,' she says.`,
    `The latest chapter is the one she's most satisfied with. She marks the passage she wants you to read first — a dense paragraph where the main character undresses and looks in the mirror and doesn't apologize for a single thing she sees. Every line is specific. Every detail earns its place. She watches your face as you read it. You look up when you're done. 'This is good,' you say, and mean it in a way that covers everything. She nods, once, and goes back to her laptop.`,
    `She reads a passage aloud. You haven't asked her to — she's decided. She finds the page, clears her throat once, and reads with the unhurried attention of someone who has practiced this. The passage is about a woman who looks exactly like her: the weight and the warmth and the specific softness described with the precision of someone who has been paying very close attention for a long time. When she finishes she sets the manuscript down. 'That one's my favorite,' she says. You don't say anything. There's nothing to add.`,
    `The latest work is the most explicit yet — not in the sense of reaching for excess, but in the sense of refusing to look away. Every line is deliberate. The characters are unmistakably drawn from life. She knows you know this. You sit across from her in the library while she works on the next chapter, watching her face while she writes, and there is something in the way she pauses to think and then types without hesitation that answers every question you might have had about what she's writing and why.`,
  ],
  // ── FARM GIRL paths ──────────────────────────────────────────────
  homestead_queen:[
    (s)=>`She texts you the address — the dorm room that no longer looks like one — and when you arrive the door opens on warmth and the smell of something sweet and hours-old. Mary Jane is ${Math.round(s.lbs)} pounds at her counter, flour on one forearm, her chest and belly both pressing against the edge of the folding table she's claimed as prep space. "Sit," she says. "I made six things. You're going to try all six." She doesn't frame it as an invitation. She sets down a plate and looks at you until you pull out the chair.`,
    (s)=>`You knock and she calls you in without stopping what she's doing — she's at the stove, ${Math.round(s.lbs)} pounds filling the narrow kitchen corridor completely, wide hips and broad back and the loose linen top moving with her as she stirs. The room smells like butter and brown sugar and something faintly caramelized. "Timing's perfect," she says. "I just pulled the cobbler." She ladles something into a bowl for herself as she talks. The bowl is large.`,
    (s)=>`The homestead operation has expanded. You walk in and see four dishes in various stages of completion and Mary Jane, ${Math.round(s.lbs)} pounds, at the center of it — apron tied behind her, hair back, managing all four burners with the ease of someone who learned to cook before she learned to read. She waves you to the table without looking up. "Mae sent me a new recipe," she says. "I'm testing it three ways. You get to try them in order." This is not optional.`,
    (s)=>`She barely leaves the room anymore. You come to her — she texts you 'come over' and you come, and she's ${Math.round(s.lbs)} pounds in her wide cotton housedress with the apron tied over it, and the room smells like heaven, and when she sees you come through the door she just nods toward the table and sets another plate. "Mae called this morning," she says. "I told her about you." She goes back to the stove. The plate she sets in front of you is larger than the last one.`,
    (s)=>`The dorm room is straining to hold her. Mary Jane is ${Math.round(s.lbs)} pounds and she is everywhere — at the counter, at the stove, her mass warm and enormous in the narrow space, and the smell of whatever she's been making for the last four hours fills the building's hallway. She moves with the careful deliberateness of someone who has grown accustomed to knowing exactly where her body is relative to everything else. "Sit down," she says. "I made corn pudding." She sets a bowl in front of you that could serve a family.`,
    (s)=>`You come when she texts you. The door opens on Grandma Mae standing at the stove and Mary Jane, ${Math.round(s.lbs)} pounds, seated at the table with both hands wrapped around an enormous mug of something warm. Mae turns and nods at you like she was expecting you. "She talks about you," Mae says. Mary Jane doesn't correct her. The table has more food on it than you've ever seen in one place. Mae pulls out the chair across from Mary Jane and says: "Sit down. Both of you. I've been cooking since this morning."`,
  ],
  state_fair_queen:[
    (s)=>`She finds you before she leaves for the county fairgrounds — ${Math.round(s.lbs)} pounds in her competition tank and stretch shorts, her chest filling the front of the shirt completely, her number pinned to the side. "Darcy from Meadowview is going to be there," she says. "She wins. She's been winning for three years." She says this neutrally, the way you name a fact you intend to change. "Come watch anyway." You drive out. You watch Darcy win. You watch Mary Jane eat more than Darcy does and still lose on the scoreboard, and you watch her write the number down in her phone on the drive home.`,
    (s)=>`She's ${Math.round(s.lbs)} pounds at the county championship and she walks into the fair tent without looking at the scoreboards. Darcy is already at the table. She sees Mary Jane and says 'you again,' and there's something in it that wasn't there last year — a recalibration. Mary Jane sits down, fills two plates from the pre-event warmup spread, and eats both while the judges check credentials. It's a close match. Darcy barely wins. You watch her face after the final tally and she is not surprised. She is already thinking about what comes next.`,
    (s)=>`State qualifier. Mary Jane is ${Math.round(s.lbs)} pounds and her competition jersey is already getting tight across the front — she commissioned it two months ago — and Darcy watches her walk to the weigh-in with an expression you've seen before on people who've revised something important. The contest starts. You watch from the stands. Midway through the final round, Mary Jane crosses Darcy on the scoreboard, and Darcy stops eating for exactly one second. The crowd makes a sound. You make a sound. Mary Jane keeps eating.`,
    (s)=>`The state fair finals. She's ${Math.round(s.lbs)} pounds in the new jersey and the press are there — two photographers and a features writer who keeps asking you questions you answer vaguely. Mary Jane at the table is something to see from a distance: the full scale of her at a competition table, her belly rounding against the edge, her chest filling the jersey front, eating with the focused certainty of someone for whom this has stopped being a challenge and become a performance. She wins. Darcy starts clapping and doesn't stop. "I trained all year," Darcy says to no one in particular. She keeps clapping.`,
    (s)=>`Tri-state invitational. They built a bigger scale. You were there when the fair director said it — addressing the weigh-in queue, trying to be casual — and the whole line understood who the scale was for. Mary Jane is ${Math.round(s.lbs)} pounds and she steps onto the scale with the ease of someone who has made peace with the number before it appears. The crowd that gathers for her weigh-in is larger than the crowd for any other competitor's whole event. Darcy has a seat in the front row. She brought a sign.`,
    (s)=>`She can't get to the fair herself — they bring the fair to her. The organizers set up a satellite table in the largest event room available; you followed the signs down two hallways and found Mary Jane at approximately ${Math.round(s.lbs)} pounds filling the corner of it, the table edge pressing against the full warm circumference of her belly, her chest resting enormous and heavy on top of it, her jersey printed custom and wide enough to read as a banner. Darcy is here — 500 lbs herself now, seated to the right, not competing. The crowd standing at the edges of the room is quiet the way crowds go quiet when the person at the center of the spectacle is the spectacle entirely. The judges exchange a look. The horn sounds.`,
  ],
  // ── FARM GIRL: wife_lessons ─────────────────────────────────────
  wife_lessons:[
    (s)=>`You arrive and the kitchen is warm and the table is already set and Mary Jane — ${Math.round(s.lbs)} pounds in her gingham apron — is at the counter finishing something. Darlene and Wanda are already seated. Wanda is eating bread from the basket in the center before the session has technically started. Darlene is watching her do it. "You're always first," Darlene says. Wanda says: "I'm hungry." This is also the entire lesson.`,
    (s)=>`Patrice is at the table when you arrive, sitting very straight, her wide hips spreading the chair. She brought a dish she made at home from MJ's recipe — she presents it nervously. MJ takes a bite without ceremony and says: "You used the right fat." Patrice looks like she's been told she passed a test. She came in uncertain. She won't leave that way.`,
    (s)=>`Cheryl is at the far end of the table looking like she's observing something she hasn't decided about yet. She is also on her third helping. MJ, ${Math.round(s.lbs)} pounds and comfortable at the stove, hasn't commented on this. She's seen it happen before — the conversion isn't loud. It's just a woman who keeps reaching for more food until she stops pretending she doesn't want it.`,
    (s)=>`All six of them. Ruthanne is in the back corner eating quietly and contentedly. Becca is asking questions about technique that suggest she's been practicing at home. The room is loud with six women all at different stages of a meal. MJ moves through it at ${Math.round(s.lbs)} pounds, refilling, adjusting, setting down more. The kitchen was not designed for this many people but somehow she makes it work.`,
    (s)=>`The lesson today is the philosophy — stated plainly, not as metaphor. MJ at ${Math.round(s.lbs)} pounds at the head of the table, not performing, just talking. "Soft means warm. Soft means present. Soft means the house has a center." Lily is writing something in her phone. Cheryl is nodding. Wanda already knew. She came anyway.`,
    (s)=>`MJ barely needs to teach anymore. The women know the lessons. They come for the kitchen — for the warmth and the smell and the company — and they bring news of daughters, of doorways that are getting narrow, of reinforced furniture, of husbands who have stopped pretending not to love the change. MJ at ${Math.round(s.lbs)} pounds is the center of something that doesn't need her to keep moving in order to keep moving.`,
  ],
  // ── SWIMMER path: lane captain case-study arc ───────────────────
  community_researcher:[
    (s)=>`She stops by your RA desk after evening practice — ${Math.round(s.lbs)} pounds in her lane jacket, training log under one arm. "First floor session today," she says. "I ate what they ate. Refusing felt like skewing the intake log." She taps the page. "I'm noting my meals separately from the training log now." She doesn't ask if that's allowed. She's already logged you as witness.`,
    (s)=>`${Math.round(s.lbs)} pounds at the lounge table, case-study notes open beside two empty plates. She's present at more sessions than the season plan technically requires. The residents think she's supervising. You watch her eat alongside them and write it down afterward with the same precision she uses for splits and interval data.`,
    (s)=>`She finds you in the hall lounge with the hall log half open and her mouth full. ${Math.round(s.lbs)} pounds, hoodie loose, she swallows and says: "I stopped pretending the log is what I'm here for." The writing is getting personal. The distinction between captain on the sidelines and captain at the table has collapsed.`,
    (s)=>`${Math.round(s.lbs)} pounds and a second protocol section in her notebook — one for the residents, one for herself. Both curves trend upward. She shows you the graph without embarrassment. "Similar rate of change," she says. "That's interesting data." She goes back to her plate.`,
    (s)=>`Panel prep night. She's ${Math.round(s.lbs)} pounds at the study table, slides on one monitor and a delivery spread on the other. "The hall log is going to be honest," she tells you. "Clinical where it needs to be. Honest everywhere else." She eats while she rehearses. She's writing herself in as a variable.`,
    (s)=>`Final review week. She's ${Math.round(s.lbs)} pounds — the largest person in every room she enters for case-study purposes — and she presents the season report like it's a meet result. The intake record on floor immersion is extensive. The methodology got personal. She meets your eyes afterward. "Original work," she says. Both things are true.`,
  ],
};

export const EVOLVED_ACTIVITY_META = {
  sumo:            { label:"Enter a Tournament",       apCost:1, gainRange:[4,8],  relBonus:10 },
  eating_competitor:{ label:"Attend a Competition",    apCost:1, gainRange:[3,7],  relBonus:9  },
  feedee_creator:  { label:"Go Live Together",          apCost:1, gainRange:[3,6],  relBonus:12 },
  body_positive_creator:{ label:"Watch Her Latest Video", apCost:1, gainRange:[2,5], relBonus:11 },
  eating_captain:  { label:"Enter a Competition",      apCost:1, gainRange:[4,7],  relBonus:10 },
  big_squad_captain:{ label:"Attend a Squad Event",    apCost:1, gainRange:[2,5],  relBonus:12 },
  eating_diarist:  { label:"Read Her Latest Entry",    apCost:1, gainRange:[3,6],  relBonus:11 },
  food_researcher: { label:"Visit Her Station",            apCost:1, gainRange:[3,6],  relBonus:10 },
  eating_streamer: { label:"📡 Stream Event",           apCost:1, gainRange:[4,8],  relBonus:10 },
  speed_eater:     { label:"Watch a Challenge",        apCost:1, gainRange:[4,9],  relBonus:9  },
  ranked_feedee:   { label:"🎮 Run a Session",          apCost:1, gainRange:[8,22], relBonus:12 },
  competitive_gainer:{ label:"📊 Check Her Progress",    apCost:1, gainRange:[10,50], relBonus:8 },
  home_nest:       { label:"🍜 Order In",                apCost:1, gainRange:[6,15], relBonus:9  },
  delivery_hive:   { label:"🕸️ Manage Delivery Hive",    apCost:1, gainRange:[8,20], relBonus:10 },
  chapter_hostess: { label:"Attend Wednesday Feast",   apCost:1, gainRange:[5,10], relBonus:11 },
  body_positive_greek:{ label:"Attend Chapter Event",  apCost:1, gainRange:[2,5],  relBonus:12 },
  installation_artist:{ label:"View the Installation", apCost:1, gainRange:[2,5],  relBonus:12 },
  food_photographer:{ label:"Review the Latest Shoot", apCost:1, gainRange:[2,5],  relBonus:11 },
  artisan_gallery:   { label:"🖼 Open Artisan Gallery",   apCost:1, gainRange:[4,9],  relBonus:11 },
  salon_appetit:   { label:"🥂 Host Salon Evening",    apCost:2, gainRange:[6,14], relBonus:12 },
  anonymous_blogger:{ label:"Read the Latest Post",    apCost:1, gainRange:[3,6],  relBonus:10 },
  asmr_creator:    { label:"Watch a Recording Session",apCost:1, gainRange:[3,6],  relBonus:12 },
  campus_legend:   { label:"Share a Meal at the Booth",apCost:1, gainRange:[5,10], relBonus:11 },
  food_tourist:    { label:"Join an Expedition",       apCost:1, gainRange:[4,8],  relBonus:10 },
  ff_author:       { label:"Read Her Latest Chapter",  apCost:1, gainRange:[3,6],  relBonus:12 },
  homeroom_queen:  { label:"🍪 Run a Baking Session",    apCost:1, gainRange:[4,9],  relBonus:11 },
  wife_lessons:    { label:"🏠 Hold Wife Lessons",        apCost:1, gainRange:[5,12], relBonus:11 },
  homestead_queen: { label:"🏡 Visit the Homestead",    apCost:1, gainRange:[5,10], relBonus:12 },
  state_fair_queen:{ label:"🎡 Enter the Fair",         apCost:1, gainRange:[4,8],  relBonus:10 },
  psych_researcher:{ label:"Continue Hall Log Session", apCost:1, gainRange:[4,9],  relBonus:11 },
  cultivator:          { label:"🍰 Run Taste-Test Session", apCost:1, gainRange:[2,8],  relBonus:12 },
  community_researcher:{ label:"📋 Conduct Case Study",     apCost:1, gainRange:[3,8],  relBonus:10 },
  pharmacist:          { label:"🧪 Run Synthesis Session",  apCost:1, gainRange:[2,6],  relBonus:10 },
  machine_goddess:     { label:"🔧 Open The Lab",           apCost:1, gainRange:[2,6],  relBonus:10 },
};

/** Depth-scaled evolved activity payouts (gain range + relationship). */
export function getEvolvedActivityMeta(formId) {
  const raw = EVOLVED_ACTIVITY_META[formId];
  if (!raw) return raw;
  const meta = { ...raw };
  if (meta.gainRange?.length === 2) {
    meta.gainRange = [
      depthActivityGainBonus(meta.gainRange[0]),
      depthActivityGainBonus(meta.gainRange[1]),
    ];
  }
  if (meta.relBonus) meta.relBonus = depthRelBonus(meta.relBonus);
  return meta;
}

export function scaleEvolvedEventLbs(lbs = 0) {
  if (!lbs || lbs <= 0) return lbs || 0;
  return depthLbsGrant(lbs);
}

export function scaleEvolvedEventRel(rel = 0) {
  if (!rel) return 0;
  if (rel < 0) return rel;
  return depthRelBonus(rel);
}

/** Wife Lessons session payouts — same depth curve as evolved branching events. */
export function scaleWlLessonLbs(lbs = 0) {
  return scaleEvolvedEventLbs(lbs);
}

export function scaleWlLessonRel(rel = 0) {
  return scaleEvolvedEventRel(rel);
}


// Branching evolved events → evolvedEvents.js (scenes/evolved/ bridge).
export { EVOLVED_EVENTS } from './evolvedEvents.js';


export const EVOLVED_FORM_META = {
  sumo:                 { title:"Sumo Wrestler",        color:"#c0392b" },
  eating_competitor:    { title:"Circuit Competitor",   color:"#e67e22" },
  feedee_creator:       { title:"Feedee Creator",       color:"#8e44ad" },
  body_positive_creator:{ title:"Body Positive Creator",color:"#27ae60" },
  eating_captain:       { title:"Eating Captain",       color:"#2980b9" },
  big_squad_captain:    { title:"Squad Reformation",    color:"#16a085" },
  eating_diarist:       { title:"Eating Diarist",       color:"#9b59b6" },
  food_researcher:      { title:"Hall Log Keeper",      color:"#2c3e50" },
  eating_streamer:      { title:"Eating Streamer",      color:"#e74c3c" },
  speed_eater:          { title:"Speed Eater",          color:"#d35400" },
  chapter_hostess:      { title:"Chapter Hostess",      color:"#6c3483" },
  body_positive_greek:  { title:"Greek Pioneer",        color:"#1abc9c" },
  competitive_gainer:   { title:"Competitive Gainer",   color:"#e8294a" },
  installation_artist:  { title:"Installation Artist",  color:"#f39c12" },
  food_photographer:    { title:"Food Photographer",    color:"#ca6f1e" },
  anonymous_blogger:    { title:"Anonymous Blogger",    color:"#5d6d7e" },
  asmr_creator:         { title:"ASMR Creator",         color:"#7d3c98" },
  campus_legend:        { title:"Campus Legend",        color:"#b7950b" },
  salon_appetit:        { title:"Salon de l'Appétit",   color:"#8b2942" },
  artisan_gallery:      { title:"Artisan Gallery",      color:"#c47a2a" },
  food_tourist:         { title:"Food Tourist",         color:"#148f77" },
  ff_author:            { title:"FF Author",            color:"#922b21" },
  homeroom_queen:       { title:"Apprentice",             color:"#c47a2a" },
  wife_lessons:         { title:"The Flabwife",           color:"#9B6FA0" },
  homestead_queen:      { title:"Homestead Queen",       color:"#8B5E3C" },
  state_fair_queen:     { title:"State Fair Queen",      color:"#C8860A" },
  psych_researcher:     { title:"The Researcher",        color:"#6b5b95" },
  ranked_feedee:        { title:"Ranked Feedee",          color:"#1a6a9a" },
  home_nest:            { title:"Home Nest",              color:"#4a6a4a" },
  delivery_hive:         { title:"Delivery Hive Queen",    color:"#d98cff" },
  cultivator:           { title:"The Cultivator",         color:"#8B4513" },
  community_researcher: { title:"Lane Captain",    color:"#4a6fa5" },
  pharmacist:           { title:"The Chemist",            color:"#2e6b5a" },
  machine_goddess:        { title:"The Inventor",           color:"#4a6080" },
};

export const EVOLUTION_BUTTON_BLURB = {
  athlete:(s)=>`You see her in the gym doorway on a Tuesday afternoon, not working out — just standing there looking at the equipment that used to be hers. The pull-up bar. The bench press. None of it fits anymore, not really. She has more mass now than the sport knows what to do with. Her jaw is set, the way it gets when she's about to solve something. You watch her and think: she's still competitive. She just needs a new arena.`,
  influencer:(s)=>`You walk past her on the quad and she doesn't notice you. She's filming herself on her phone — mouth open to say something, then stopping, deleting, starting again. The angle that used to work doesn't work now. She's bigger, softer, undeniable in ways her old content pretended weren't happening. She deletes the clip again. She doesn't look upset. She looks like someone who knows the answer is somewhere and hasn't found the framing yet. You think you might have an idea.`,
  cheerleader:(s)=>`You stop by the gym during practice. ${s.name} is standing at the edge of the mat in her old uniform — or most of it, the waist seam split, the fabric at her thighs taut past bearing — watching the squad run through a routine she used to lead. She's not sad about it. The crowd at the open practice is still watching her. Some of them more than they're watching the performance. She's still the most present person in the room. You think about where that kind of presence could go.`,
  swimmer:(s)=>`You pass the pool deck after morning laps. ${s.name} is toweling off at the lane line, still in her team suit — or what's left of it, the straps digging in, the fabric at her hips straining — watching the squad run through a set she used to lead. She's not defeated. The younger swimmers still glance over when she speaks. She's still the most focused person on the deck. You think about where that kind of discipline could go when appetite becomes part of the program.`,
  bookworm:(s)=>`You find her in the late stacks at the library, long after the undergrads have gone. There's a notebook open on the table beside her laptop and a half-eaten sandwich she's forgotten about. When she hears you she closes the notebook with a firmness that suggests you just missed something. She doesn't look guilty. She looks like someone managing information carefully. You've seen that look before, when she had a season plan draft she wasn't ready to show. You wonder what she's writing.`,
  gamer:(s)=>`You glance through her open door without meaning to. She's at her setup, the screen glowing, a game paused mid-level. She's eating — slowly, automatically, the bag of chips just there and going down without her noticing — and she's not looking at the game. She's looking at something on the second monitor, reading something. The room is warm and soft with the ambient light and her presence in it, her body filling the chair, comfortable in a way that suggests the chair has been arranged around her. You think about what she could do with this setup.`,
  sorority:(s)=>`You walk past the chapter room during a meeting. The door is open. ${s.name} is technically not running things — she graduated from the formal role two months ago — but the room is still orienting itself around her. When she speaks, people write things down. When she pauses, people wait. She's larger now than when she held the title and somehow that makes it more true, not less. After the meeting empties you catch her in the hallway. She looks like someone with a plan that doesn't have a name yet.`,
  overachiever:(s)=>`You find her planner left open on a library table while she's in the bathroom. You don't mean to read it. The weight gain is charted in a color-coded column alongside her hall standing, her sleep, her caloric intake. She is tracking this the way she tracks everything. The numbers are precise and the trend is unmistakable and the color she's chosen for that column is gold. Not warning-red. Gold. You close the planner and wait. When she comes back she sees you saw it and just nods, once, like: yes, that's accurate, what are we going to do with it.`,
  artsy:(s)=>`You stop by her studio during open hours. The new work is on the wall — three large canvases, all featuring generous female figures. They're not abstractions. They're specific. The lines are loving, the weight is warm, the bodies are real and present and unapologetic. She's standing in front of the largest one with her head tilted, deciding something. She doesn't explain the shift in subject matter when you ask. She says: 'It's what I want to look at.' She says this the way someone says something that is also about themselves. You think about what a larger project might look like.`,
  quiet:(s)=>`You see her at the campus coffee shop on a Thursday morning, alone at a corner table with her laptop. She's typing quickly, absorbed, the kind of focus she reserves for things that matter. When she looks up and sees you she closes the laptop with one smooth motion, not alarmed but deliberate, and smiles. There's something behind the smile that isn't embarrassment — more like being caught in the middle of something private that hasn't been decided as a secret yet. You think about what she might be writing. You think you might have a better idea of what to do with it than she does.`,
  transfer:(s)=>`You pass through the dining hall mid-afternoon and the staff behind the counter lights up when ${s.name} walks in behind you. They know her name. They have her order started before she reaches the counter. There's a booth in the corner that other diners seem to drift away from, not consciously, just leaving it available in the particular way that space gets left for something or someone that belongs in it. She settles into it and the room adjusts slightly. You watch from across the hall and think: she's become part of this place faster than anyone else ever has.`,
  psych:(s)=>`You find ${s.name}'s notebook left open on a desk — not hers, a shared lounge table. You don't mean to read it. What's inside is a meticulous, weeks-long study of the people around her: names, dates, behavioral observations, weight-implied measurements, annotated patterns. It's precise. It's methodical. It's deeply unsettling — not because it's wrong, but because it's right. You close it. You wait. When she comes back and sees you by the table she just looks at you steadily, reads your expression, and says: "I need a direction for this."`,
  eced:(s)=>`You stop by the hall lounge on a Tuesday afternoon — not for any particular reason, just passing — and the smell hits you before the door fully opens. Butter, sugar, something warm. ${s.name} is at the counter at ${Math.round(s.lbs)} pounds, her apron dusty with flour, and around the table are the residents she teaches and apparently their mothers, and everyone is eating, and the room has the specific quality of a space that has found its purpose. Daisy looks up. She sees you see the room. "I've been doing Tuesdays for a while now," she says. Her voice is carefully normal. "I think it's working."`,
  culinary:(s)=>`You find ${s.name}'s test kitchen unexpectedly unlocked. She's not there, but someone else is — a woman you don't recognize, sitting at the prep table with an empty plate and the particular slow contentment of someone who ate something extraordinary and hasn't decided to leave yet. She looks up. She seems confused about how long she's been there. When Reneé comes back she sees you in the doorway and she doesn't explain anything. She takes the plate, washes it, and says: "I've been running some tests. With willing taste testers." A pause. "Very willing taste testers." She looks at you with the calibrated calm of someone who has been thinking about whether to say the next thing for a long time. "I think I can do this properly. I just need the right direction."`,
  farm_girl:(s)=>`You stop by and find Mary Jane at the counter with more food than two people could eat and a look of complete purpose. She's not cooking because she's hungry — or not only that. She's cooking because she knows something about food and feeding and what a soft home feels like and she's starting to understand she's the only person in the building who knows it. She's ${Math.round(s.lbs)} pounds and she looks like a plan that's been waiting to be named.`,
  pharmacy_grad:(s)=>`You find ${s.name} in the pharmacy lab after hours, gloves on, hair tied back, a corporate ID badge still clipped to her coat. The notebook open on the bench isn't her assigned research — it's dosage tables with appetite curves crossed out and rewritten. She doesn't pretend otherwise when she sees you. "I've been adjusting compounds," she says, very carefully. "Wellness adjacents. Metabolic support." She taps the page. "I can make things for you. Food delivery only — that's the safe route." She looks anxious and absolutely certain in the same breath. "I need someone who knows what they're authorizing."`,
  inventor:(s)=>`You pass the engineering workshop after midnight and the light is still on. ${s.name} is hunched over a bench covered in harness sketches, servo specs, and half-finished belts that look less like clothing and more like opinions. She doesn't startle when you enter — she marks a measurement and says, without looking up, "I've been modeling growth as a control problem." She finally meets your eyes. Her smile is clinical and hungry in the same instant. "I can build things that make bodies do what spreadsheets can't. I need a partner who won't pretend that's innocent."`,
};


export const EVOLUTION_OFFER = {
  athlete:{
    intro:(s)=>`${s.name} catches you after floor check-in. She's been thinking about what comes next — the weight she's carrying is real, undeniable, and the old sport doesn't fit anymore. But she's competitive in a way that doesn't turn off. She wants to do something with this body. She just needs a direction.`,
    paths:{
      sumo:    { label:"The Sumo Path",        desc:"Channel her athletic drive into sumo wrestling. The ring awaits. So does the crowd." },
      eating_competitor:{ label:"The Circuit", desc:"Competitive eating circuits. Timers, records, a legitimate sport for exactly this body." },
    },
  },
  influencer:{
    intro:(s)=>`${s.name} puts her phone down — which you've never actually seen her do — and looks at you. 'The fitness content isn't landing anymore,' she says. 'My audience can see what's happening. I need a new angle. Two options.' She pulls her phone back out and shows you two draft pitches.`,
    paths:{
      feedee_creator:       { label:"Feedee Channel",         desc:"A niche, dedicated content brand built around exactly what's happening to her." },
      body_positive_creator:{ label:"Body Positive Platform", desc:"Mainstream crossover: brand deals, TEDx, a cultural argument she can win." },
    },
  },
  cheerleader:{
    intro:(s)=>`${s.name} arrives with her captain's sash still on, slightly breathless. She's been thinking. The squad has a future. She has a body. The two things can be connected, but not in the old way. What's the new way?`,
    paths:{
      eating_captain:  { label:"Competitive Eating Captain", desc:"Rebrand the squad around competitive eating. Tournament structure, real competition, glory." },
      big_squad_captain:{ label:"Body Positive Captain",     desc:"Change the squad's culture from the top. No more weigh-ins. A new kind of power." },
    },
  },
  swimmer:{
    intro:(s)=>`${s.name} catches you in the RA lounge still damp from morning laps, towel around her shoulders, meal-prep containers lined up like lane assignments. "Coach wants a team culture reset," she says. "I want a captain who actually lives on this floor." She slides a folder across — practice schedules, nutrition targets, and a list of names you both recognize. "Help me run this. Help me eat like it matters."`,
    paths:{
      community_researcher:{ label:"Lane Captain", desc:"Lead the squad through training tables and team dinners. Document what happens when appetite becomes part of the program — and let the program change her." },
    },
  },
  bookworm:{
    intro:(s)=>`${s.name} brings you a draft proposal — stapled, tabbed, annotated. The title page reads "Appetite Dynamics on the Floor: A Longitudinal Hall Observation" and bears her actual name, which means she's past the point of pseudonyms. "The season panel approved it last week," she says. "I need your sign-off as RA." She opens to the protocol section. "And I need access to the people I've already been observing." She looks at you carefully. "You know exactly which people I mean."`,
    paths:{
      community_researcher:{ label:"Lane Captain", desc:"Present the season plan. Conduct case studies. Embed herself on the floor she's been captaining from the sidelines — and see what living the plan does to the captain." },
    },
  },
  gamer:{
    intro:(s)=>`${s.name} swivels her chair toward you mid-session, something she never does. The game is still running. 'I've been thinking,' she says, not looking up. 'About what this is now.' She indicates herself with one hand while the other keeps the controller. 'The sessions. The eating. The way they work together.' She pauses. 'I want to lean into it. Properly.'`,
    paths:{
      ranked_feedee:{ label:"Ranked Feedee", desc:"Sessions optimized for both. Focus bar, food queue, delivery driver who knows the schedule better than she does. The game never stops. Neither does the eating." },
      eating_streamer:{ label:"Eating Streamer", desc:"Turn the camera on and make the appetite the content. Sponsors, chat, and a focus bar that never lets her coast. The stream doesn't end until she does." },
    },
  },
  sorority:{
    intro:(s)=>`${s.name} closes the chapter meeting early and waits until everyone else has left. Then she turns to you. 'I've been thinking about what this chapter could be,' she says. She pours one glass of wine and sits with it and looks at you. 'I think it's a table. I think it's the table I set and what happens around it.' She pauses. 'I want to build that properly.'`,
    paths:{
      chapter_hostess: { label:"The Hostess", desc:"Wednesday feast nights formalized. She manages the menu, the guest list, the atmosphere — and watches the chapter transform around her table." },
    },
  },
  overachiever:{
    intro:(s)=>`${s.name} shows up with a tape measure and a corkboard she has clearly just bought. She tacks up a blank sheet, picks up a marker, and writes two columns: her current measurements, and blank space next to every resident's name on the floor. She steps back. 'I've been the smartest person in every room I've been in,' she says. 'I want to be the biggest one too.' She looks at the corkboard. 'I want data. I want comparisons. I want to win.' She turns around. 'Help me.'`,
    paths:{
      competitive_gainer: { label:"The Competitive Gainer", desc:"The corkboard is the scoreboard. Every measurement is a data point. Every resident on the floor is a benchmark — and Priya intends to exceed all of them, in every category, and know it precisely." },
    },
  },
  artsy:{
    intro:(s)=>`${s.name}'s studio walls are contact sheets — soft bellies, widening hips, mid-bite laughter. She pins an empty board labeled *In Progress*. "I want a gallery that documents abundance — the feeding, the growth, the proof. Will you help me build it?"`,
    paths:{
      artisan_gallery:{ label:"Artisan Gallery", desc:"Fatten residents, shoot campus abundance, mount exhibitions — living bodies beside their timelines." },
    },
  },
  quiet:{
    intro:(s)=>`${s.name} doesn't leave a note. She's just there when you arrive — at your RA desk, in the chair, very still. She doesn't explain how she got in. 'I've been mostly at home,' she says. 'I've stopped going out. The food comes.' She looks at her hands. 'I think I want someone to know that's a choice. I think I want someone to help me make it properly.'`,
    paths:{
      home_nest: { label:"Home Nest", desc:"She's building something warm and self-contained. Delivery orders, refined preferences, a room arranged around exactly what she needs. The outside world is optional now." },
      delivery_hive: { label:"Delivery Hive Queen", desc:"Her room becomes the Central Nest: a soft lavender territory-control system where delivery recruits, conquered dorm rooms, Vice Queens, and your hunger-pressure pressure turn the whole building toward Maya." },
    },
  },
  transfer:{
    intro:(s)=>`Chloé's dorm already smells of wine and butter — candles, a cheese board, silk scarves on the chairs. She's ${Math.round(s.lbs)} pounds and pouring when you arrive. "I hosted salons in Paris. Polite ones." She smiles. "America taught me otherwise. Help me fill the room — and the plates — and me."`,
    paths:{
      salon_appetit: { label:"Salon de l'Appétit", desc:"Intimate French soirées that escalate — guests, menus, indulgence, campus scandal. La Grande Soirée awaits." },
    },
  },
  eced:{
    intro:(s)=>`${s.name} sits across from you with her hands wrapped around a mug and a small notebook on the table beside her. She's been trying to explain this for a moment and not quite finding the words. "I've been doing something on Tuesdays," she finally says. "On the floor. With the residents." A pause. "And the moms have started coming. And everyone keeps eating. And I think —" she stops. She looks at the notebook. "I think I want to make it into something real. Something intentional." She looks at you. "I need someone to know what I'm doing."`,
    paths:{
      homeroom_queen:{ label:"The Apprentice", desc:"Formalize the Tuesday sessions. Bake for the floor, bake for the moms, manage the suspicion, grow the tradition. Six named participants and one growing problem she's trying not to call a success." },
    },
  },
  farm_girl:{
    intro:(s)=>`${s.name} is sitting at the corner table with a cast-iron skillet, a jar of preserves, and a look that says she's been sitting with something for a while. She doesn't start with the food — she starts with you. "I've been thinking about what I'm actually good at," she says. "Not just the eating. The rest of it." She sets the skillet down. "I want to do something with what I know." She's ${Math.round(s.lbs)} pounds and the look on her face is very certain.`,
    paths:{
      wife_lessons:    { label:"The Flabwife",     desc:"Teach a small group of neighborhood women what she knows about softness, warmth, and how a real home feels. Six named women who come hungry and leave with recipes, philosophy, and daughters who grow whether they meant to or not." },
      homestead_queen: { label:"Homestead Queen",  desc:"She builds a reputation around her cooking and her appetite together — the warmth of a real homestead, growing and feeding and being fed, with you at the center of it." },
      state_fair_queen:{ label:"State Fair Queen", desc:"She takes her eating to the competitive circuit — county fairs, state championships, a recurring rival from the next county, and a crowd that keeps getting louder every time she steps on the scale." },
    },
  },
  psych:{
    intro:(s)=>`${s.name} doesn't explain the notebook. She opens it to a page of columned data — names, dates, observations, weights-implied — and sets it on the table between you. 'I've been doing this informally,' she says. 'I'd like to do it properly.' She taps the notebook. 'It involves a focus resident.'`,
    paths:{
      psych_researcher: { label:"The Researcher", desc:"Pick a focus resident for the hall log. Feeder or feedee — she'll study both sides of the dynamic with the rigour of a clinical trial." },
    },
  },
  culinary:{
    intro:(s)=>`${s.name} sets two things on the table between you: a recipe notebook and a short list of names. No explanation. She waits. When you ask, she says: "I've been running informal trials. Willing taste testers, controlled portions, careful observation." She pauses. "The testers gained weight. I gained weight. The data is consistent across six sessions." She taps the list. "I want to do it properly. One resident at a time, managed correctly, from selection through — completion." She says 'completion' the way someone says a word they've chosen very carefully. "I need someone who understands what they're authorizing."`,
    paths:{
      cultivator:{ label:"The Cultivator", desc:"Recruit a taste tester. Run feeding sessions using carefully constructed recipes. Grow each taste tester through stages and harvest when the yield is right. Three full cycles. Precise, personal, and deeply satisfying." },
    },
  },
  pharmacy_grad:{
    intro:(s)=>`${s.name} meets you after hours in a pharmacy lab that smells like ethanol and vanilla. Her corporate badge is still on — she hasn't gone home yet, maybe won't. "I don't want to cure cancer," she says, too quietly, then corrects herself: "I mean — I want to work on appetite. Metabolic wellness. Support compounds." She slides a vial across the bench. "Delivered through food. Always through food." Her hands are steady. Her eyes aren't. "I can build you tools. I need a partner who won't pretend this is innocent."`,
    paths:{
      pharmacist:{ label:"The Chemist", desc:"Sophia synthesizes appetite stimulants, pleasure enhancers, and metabolic compounds — a slow descent from corporate lab chemist to campus-scale transformation architect." },
    },
  },
  inventor:{
    intro:(s)=>`${s.name} pulls you into her workshop and locks the door like it's protocol. Blueprints cover every surface — belts, arms, injectors, rigs that treat flesh as tunable material. "Manual feeding is inefficient," she says, tapping a schematic. "I build externals. Wearables. Automations." She gestures at her own body without embarrassment. "I spend mass to make mass. Ambiguously metaphorical. Works either way." Her eyes are bright. "Help me deploy this properly."`,
    paths:{
      machine_goddess:{ label:"The Inventor", desc:"Talia builds devices that bloat, feed, inject, and reshape — a workshop of external machines that override bodies until she becomes the campus's master inventor." },
    },
  },
};


// Hall kitchen queen data lives in homeroomEvents.js (homeroom text bridge).
export {
  BATCH_BAKER_NPCS,
  HOMEROOM_SUSPICION_DELTAS,
  HOMEROOM_THRESHOLDS,
  HOMEROOM_CONFERENCE_EVENTS,
  HOMEROOM_GROUP_ACTIVITIES,
} from './homeroomEvents.js';


// Feeder subject journals → feederSubjectJournals.js (researchJournal text bridge).
export { FEEDER_SUBJECT_JOURNALS } from './feederSubjectJournals.js';

// ── NADIA'S SUBJECT NOTES ────────────────────────────────────────────────────
// See src/gameData/nadiaSubjectJournals.js (generated via scripts/integrate-nadia-journals.mjs).
export { NADIA_SUBJECT_JOURNALS } from './nadiaSubjectJournals.js';


// ── RANKED FEEDEE SESSION MINI-GAME DATA ─────────────────────────────────────
export { SESSION_FOOD_ITEMS, SESSION_NPC_LINES, SESSION_PAYOFF_TEXT } from './rankedSessionData.js';

// ── WIFE LESSONS (Flabwife) ──────────────────────────────────────────────────
export { WL_CONFIG, WIFE_LESSONS_NPCS, WL_LESSONS, WL_DIALOGUES } from './wifeLessonsData.js';



// ─── COMPETITIVE GAINER DATA ──────────────────────────────────────────────────
export {
  CG_CONFIG,
  CG_CORKBOARD_SCENES,
  CG_MEASUREMENT_SCENES,
  CG_BINGE_SCENES,
  CG_CHAT_TEMPLATES,
} from './competitiveGainerData.js';

// ── STATE FAIR QUEEN ─────────────────────────────────────────────────────────
export {
  FAIR_TRAINING_CONFIG,
  fairTrainingGainBounds,
  FAIR_TRAINING_SCENES,
  FAIR_TRAINING_PHOTOS,
  FAIR_DAY_SCENES,
  FAIR_BOOST_SUMMARIES,
} from './fairQueenData.js';
