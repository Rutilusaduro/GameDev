import { getStage } from './stages.js';
import {
  CG_FILLED_REACTIONS,
  CG_FILLED_DIARY,
  CG_FILLED_OUTFITS,
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_SELF_REVIEW,
  CG_FILLED_BINGE_SCENES,
  CG_FILLED_CHAT_TEMPLATES,
  CG_FILLED_MEASUREMENT_REACTIONS,
  CG_PROFESSOR_REPLY_TEXT,
} from './competitiveGainerText.js';

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
    `Six months in the circuit and people know my name before I get to the warmup room. I walked in today and a girl said 'you're the cheerleader captain' like she'd been waiting to see me. I haven't been a cheerleader captain in a while. I'm something else now.`,
    `Conference championship. I outweighed the previous top number by over a hundred pounds and the judge read mine into the microphone and Maya from Lakewood — who has beaten me every time we've competed — started clapping. She started before anyone else.`,
    `National qualifier. There were cameras at the weigh-in. The weigh-in has cameras now. I weighed in and someone in the crowd said 'oh my god' clearly enough for me to hear it. I considered this a successful weigh-in.`,
    `National champion. They read my name and my number into the national feed and the arena made a sound I've never heard in a room before. Maya was already clapping. She knew before the horn. I knew too.`,
    `I am the largest competitive eating captain in this sport's history. The trophy is substantial. My belly is more substantial. I put my hand on it after the ceremony and thought: this is the record. I built this. There is more to build.`,
  ],
  big_squad_captain:[
    "Told the squad: no more size rules, no more weigh-ins. Two girls cried. One said she'd been waiting years.",
    "New pledges are choosing us specifically for the culture. Word has spread. The chapter is full.",
    "National cheerleading press wrote about us. 'The squad that changed the conversation.' Yes we did.",
    "Speaking at the national Greek leadership conference. My slides are very good. My presence is better.",
    "Coaches at other schools have quietly stopped the weigh-ins. I'll take the quiet version too.",
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
    "IRB approved the self-study. Officially a research subject. The data I'm collecting is extraordinary.",
    "The institution is taking the study seriously. I have a lab. I have a grant application in. I have snacks.",
    "First publication. A real journal. The reviewers called the methodology 'novel.' The methodology is me.",
    "Cited in three other papers. One of them is from a program I applied to and didn't get in. Interesting.",
    "Keynote at a nutrition conference. I arrived to the auditorium. The auditorium was not entirely prepared.",
    "The researcher and the research subject have fully merged. The experiment is complete. The subject remains.",
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
    "Greek-wide, our chapter is known for the food. The administration has noticed. They've been very quiet about it.",
    "Alumni are funding the feasts. A former sister sent a check with 'for the table' in the memo line.",
    "I am no longer chapter president. I am the feast. The feast continues without me. This is correct.",
  ],
  body_positive_greek:[
    "Proposal: end the weigh-in tradition, end the size requirements. One sister voted against. She later apologized.",
    "New pledges are choosing us because of what we stand for. The class is the largest we've ever had.",
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
    "Someone from class texted asking if I was okay. Said I was fine, just busy. This is accurate. I am busy. There's more to track than you'd think.",
    "The soup place messages me before I order now, to ask if I want the usual. I said yes. I like that the usual is a thing that exists. I like that they know.",
    "I've been here a long time. The room is the same. I'm different — softer, slower, more settled. The chair has accommodated me. I haven't wanted to be anywhere else.",
  ],
  delivery_hive:[
    "The room feels different tonight. Warmer. Softer. The delivery bags by the door don't feel like they belong to anyone else anymore. I keep catching myself touching my stomach without thinking. It's heavier than it was yesterday. I think the walls noticed.",
    "There are footsteps in the hallway that aren't mine. They stop at doors I didn't open. I don't have to ask them to bring things anymore. They just... do. My belly rests heavier against my thighs when I sit now. The room feels like it's breathing with me.",
    "Half the floor doesn't feel like it belongs to the school anymore. It feels like it belongs to me. The air is thicker here. Warmer. People walk slower when they pass my door. I don't even have to speak. My body does the talking now.",
    "I don't move much anymore. I don't need to. The Hive moves for me. I can feel when a new room softens. It's like a warm pulse somewhere in the building. My body has become the center of something much larger than me. I think I like that.",
    "The whole dorm feels like it's breathing around me. I can feel the warmth in the walls. The deliveries don't even come to my door anymore. They just... arrive where they're needed. I am the heart now. Everything else is just circulation.",
    "I don't know where I end and the Hive begins anymore. My body is the warm center of everything. Rooms don't resist. People don't leave. They settle. They soften. They stay. I am no longer just Maya. I am the place they come home to.",
  ],
  // ── TRANSFER paths ──────────────────────────────────────────────
  campus_legend:[
    "The dining hall staff knows my order before I arrive. A booth has been 'mine' for three months.",
    "Stories are spreading. A freshman I've never met referenced 'the legend of the dining hall.' That's me.",
    "The booth now has my name on it. Unofficially. Then officially. The dining director did it herself.",
    "Future students hear about me before they arrive. A campus tour guide mentioned me by name. She was kind.",
    "I am campus mythology. Incoming classes are told about me during orientation. I have heard this directly.",
    "I have become the campus. The campus has grown around me. We are one thing now.",
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
    "Someone in class quoted a line from the story in passing. They didn't look at me. I ate an entire dinner thinking about whether they knew.",
    "Three hundred thousand words posted. Some of it is more honest about what I want than anything I've said out loud. The fandom writes their own versions. I read them late at night.",
    "The most popular character is based on myself. She gets everything she wants. The readership responds very well to this. So do I.",
    "The fiction and the body are the same project. I've known this for a while. The writing is just the form the knowing takes.",
  ],
  // ── FARM GIRL: wife_lessons ─────────────────────────────────────
  wife_lessons:[
    "Darlene kept calling it 'cooking class.' I've stopped correcting her. Wanda knew what it was from the start. She sat down and ate and nodded and said 'I was wondering when someone was going to start this.' I love her.",
    "Patrice brought store-bought cookies like she was coming to a potluck. I didn't say anything. By the end she was asking for the full recipe. Taylor's hips are already starting — Patrice said her jeans 'fit different.' I know what that means.",
    "Cheryl came to watch. That's what she told herself. She ate four pieces of cinnamon bread and asked for the recipe on the way out. Madison gained seven pounds last month. Cheryl mentioned it like a personal record. It is.",
    "All six of them now. The room smells like butter for three hours before anyone arrives and for hours after they leave. Ruthanne said she doesn't fit through the same doorways she did last year. Becca said Sofia asked for the strong shake. Good.",
    "Lily figured out what's been in her food. She asked Ruthanne to teach her how to make it herself. Ruthanne came in glowing. That's the goal — when the daughter isn't just growing, she's growing on purpose. Kezia fills the whole sectional now.",
    "Wanda showed me a photo of Kezia. She changed bedrooms because her old one was getting narrow for her hips. She has a reinforced bed. She barely goes out anymore. Wanda is so proud she can barely look at the photo without crying. I understand completely.",
  ],
  // ── PSYCH paths ──────────────────────────────────────────────────
  psych_researcher:[
    "Session data: subject ate considerably beyond their baseline. I ate more than mine as well. I logged both. My notebook is running out of pages.",
    "The subject's response to the feeding dynamic has shifted — more anticipation, less resistance. I'm heavier too. I've started logging the sessions in a separate volume.",
    "I tried to stay clinical today and couldn't quite manage it. The subject was present in a way that I found difficult to categorize. My own data is getting interesting.",
    "I'm eating with the subject now, not just observing and facilitating. I stopped noting it as a deviation and started noting it as a variable. The weight is accumulating. Both of us.",
    "My research chair requires leverage to exit. I logged that. I also logged how I feel about the session data, which is something I never did in year one of this study.",
    "Final session notes: I am very large, the subject is very large, the data is extraordinary, and I stopped pretending it's neutral sometime around stage three. The research is complete. The methodology got personal. Both are fine.",
  ],
  // ── ECED path ──────────────────────────────────────────────────
  homeroom_queen:[
    "Tuesday went well. Kayla had seconds. I didn't set out to do anything intentional today — I just noticed what they liked and made more of it. I'm noting that distinction.",
    "I made a richer batch this week. I told myself it was a recipe test. The girls ate everything. Mrs. Calloway's daughter asked to take some home. I said yes. I'm noting that I said yes quickly.",
    "Mrs. Monroe came inside for the first time. She sat at the table. She had four pieces and talked the whole time and laughed at everything. I didn't want her to leave. I'm noting that I made extra specifically because she was coming.",
    "I realized this week that I plan the Tuesday recipes around who's coming and what they respond to. Bri likes the heavier things. Kayla likes the sweet things. Mrs. Monroe likes everything. I'm noting that this is not random anymore.",
    "Mrs. Calloway brought me something in return. I sat with this for a while. The reciprocity feels significant. I'm noting that I feel warmly toward all six of them now and that I'm going to keep making Tuesdays happen for as long as I can.",
    "End of term. All six of them in the room. Everything I made was gone in an hour. I watched them eat and I felt — I'm not sure I have the language for it. Useful. Purposeful. Like I was exactly where I was supposed to be. I'm noting this.",
  ],
  // ── CULINARY path ──────────────────────────────────────────────
  cultivator:[
    "First session with the subject. She ate everything without asking what was in it. I made notes on her appetite, her pace, her stopping point. She has no stopping point. This is going to be methodical.",
    "The subject is visibly larger. I didn't note surprise in my log because I'm not surprised. The process is working. I ate the quality-control portions carefully. I gained three pounds this week. I'm logging that.",
    "She fills the chair differently now. I adjusted the portions upward accordingly. Richer base on the milkshake. Ganache on the cake. She asked what changed. I said 'recipe refinement.' She accepted this and finished everything.",
    "The subject is at a size that requires some recalibration — the chair, the portions, the approach. I've recalibrated. My own appetite is increasing. I've started keeping a second log for personal data. It seems relevant.",
    "I ate the leftovers after the session today. There were a lot of leftovers. I stayed in the kitchen for a long time. I'm noting that I find this work deeply satisfying in a way that extends well past professional interest.",
    "Last session before harvest. She sits across from me very large, very full, and entirely unaware of how this concludes. I ate alongside her — quality control, always quality control — and I felt full and satisfied and exactly right. My own numbers are considerably higher than when I started. I've stopped being surprised by this.",
  ],
  // ── BOOKWORM path ───────────────────────────────────────────────
  machine_goddess:[
    "First device deployed on a willing test subject. The readouts matched prediction within eight percent. I logged the variance anyway. I also logged how my pulse changed when the belt cycled on.",
    "The workshop smells like solder and vanilla paste now. Three prototypes running concurrently. I keep calibrating my own intake as 'material cost.' The scale agrees with the metaphor more than it should.",
    "A malfunction last week should have been alarming. Instead I stayed up rerunning the failure curve until 3am. The subject's belly was enormous afterward. So was mine, from stress-eating beside the bench.",
    "I stopped describing the devices as experiments. They're infrastructure. My body is infrastructure too — raw polymer, heat-formed, repurposed into better machines.",
    "Campus whispers about the engineering girl with the harnesses. I don't correct them. Correction is inefficient. Installation is the point.",
    "I am the network now — devices on bodies, bodies in my logs, my own mass feeding the builds that feed everyone else. The workshop hums whether I'm in it or not. I find that correct.",
  ],
  community_researcher:[
    "First observation session. I went in as a researcher. I ate what was offered because refusing felt like contaminating the sample. I'm noting my own intake separately from the field notes.",
    "The case study is developing. I'm present at more sessions than the methodology technically requires. The subjects haven't noticed I'm eating alongside them. I've noticed.",
    "I stopped pretending the notebook is what I'm there for. I'm still writing, but the writing is increasingly personal. The distinction between observer and participant is becoming difficult to maintain in good faith.",
    "I've had to add a second methodology section. The first covers the subjects. The second covers the researcher. Both sections have been growing at a similar rate.",
    "The paper is going to be honest. It was going to be analytical and dispassionate. It's going to be all of that and also honest. The researcher is a variable. I'm writing myself in.",
    "I'm the largest person in every room I enter for research purposes. I've been in a lot of rooms. The data on participant immersion is extensive. The dissertation will be original.",
  ],
};

export const EVOLVED_DIARY = {
  sumo:[
    `Regional qualifier, my first. The warm-up room smelled like liniment and chanko and I was the only former cheerleader in it. Dana 'The Wall' Mercer, 340 pounds, didn't look at me once until the weigh-in. I ate in my corner between bouts — I figured out fast that every pound I add is a pound she has to move — and I pushed her hard. She won. But she put a hand on my shoulder after and said 'you're going to be a problem.' I'm going to be a problem.`,
    `One season in. Fed myself between every bout — chanko, rice, all of it, my belly filling lower and heavier each break — and it nearly carried me past Dana. Nearly. The gap's down to fifty pounds. She said 'keep eating, keep getting bigger,' and she wasn't being kind, she was being honest about how she loses. I'm going to make her right.`,
    `Conference meet. The board said I outweigh Dana Mercer now — first time ever — and then I went out and proved the number meant something, drove her belly-first out of the ring twice while the crowd chanted my name. 'You crossed over,' she said after. 'You're the bigger one now.' I am. After two years of being the novelty, I'm the one they measure against.`,
    `National qualifier, press at the door. I'm the heaviest woman in the field by a margin that makes the others quiet. I ate a full staging meal before, fed in my corner through the whole bracket, and by the final I was bigger than I'd ever been. Dana said she'd out-think me. She couldn't. There's no thinking your way around this much weight. I made sure of it.`,
    `National final. They read my number into the broadcast and the arena took a breath before it roared. Dana found me first — 520 pounds, the wall I climbed over — and said she didn't come to beat me, nobody beats me now; she came to feel what it's like to lose to the biggest there's ever been. So I fed in my corner and I grew between bouts and I buried her under all of it, and afterward she was smiling. 'Thank you,' she said. I understood.`,
    `I wrote it down the night I won nationals: I stood in the middle of the dohyo, the largest competitor the sport has ever crowned, my belly vast and warm and full from a whole day of corner feeding, and I felt the noise and thought — more. Every bowl, every weigh-in, every pound. This is the record and the record is my body. There is more to add. I am not done.`,
  ],
  eating_competitor:[
    `The timer is honest. It doesn't negotiate. It runs, and at the end of it either the plate is clear or it isn't, and tonight it was clear four minutes before the buzzer and I sat there with my hands in my lap watching the others finish and felt something I can only call certainty.`,
    `Circuit regular. I have a slot on the roster at four regional events. My face is on a flyer. This is surreal and also completely logical — I am very good at this, and the circuit needs people who are very good at this. The flyer has a good photo.`,
    `The regional record stood for four years. It stood for four minutes against me. I was told this afterward, as if I hadn't been there, as if I hadn't felt the record give way the moment I exceeded it. I felt it. I kept going.`,
    `Sponsorships now. A hot sauce brand, an energy drink, a restaurant chain doing promotional events. My agent — I have an agent — negotiated all of it. I ate through the signing meeting. Everyone found this appropriate.`,
    `The world record is a number I keep in my head. I wake up with it. I eat toward it. I am not there yet. I am approaching it with the same steady inevitability I bring to everything else. The number is getting closer. So am I.`,
    `I have eaten everything on every circuit in this country and some in others. The records are documents of a life. I am done chasing them. I just eat now, freely, completely, without a timer or a crowd — just appetite and the endless satisfaction of filling it.`,
  ],
  feedee_creator:[
    `First collab tonight. She said "I've never done this before" and I said "neither have I" and we both lied in different directions. We went live. The chat found us. By the time we were done the subscriber count had tripled and a person called wrenWatchesEverything had subscribed and said: I'm not leaving. I believe her.`,
    `Six weeks of collabs. She's heavier than when we started. I am heavier than when we started. The chat comes every week to watch both numbers go up. The weekly gain isn't a side effect of the format. It is the format.`,
    `Platform featured the collab. Editorial pick. They described the double-feed as "a new format for a specific kind of content." Wren donated the full stream goal herself in one transaction and wrote: THE FEATURE WAS DESERVED. It was deserved. I know what this is. It has always been exactly what it looks like.`,
    `Brand contract signed. Both of us. Both weights in the contract, both belly-sizes accounted for, both of us eating their product on camera for a guaranteed sum. The food is good. The sum is good. I ate half their product before the stream started because I wanted to and because I could. Wren donated the goal before we went live. She always does.`,
    `Anniversary collab. One year. She and I sat across from each other before the camera went on and we didn't say anything for a minute. We didn't have to. We both looked down — at our own bellies, at the table, at the food — and then we pressed record. Wren was in the room. She cried for about thirty seconds and then she stopped and watched and that was the right thing to do.`,
    `Wren drove four hours and she's sitting outside the camera frame right now while I write this. 820 pounds. My collab partner is enormous across the table from me. The chat is 300,000 people. Wren is four feet away and she has been watching since I was 258 pounds. I put the journal down. I press record. I begin.`,
  ],
  body_positive_creator:[
    `The rebrand felt like a risk. It was a risk. The algorithm dipped for six weeks and then recovered, and what it recovered with was twice the audience and three times the engagement and a comments section that reads like letters I wish I'd received when I was eighteen.`,
    `The brand deal came through. A clothing company that makes things in real sizes and takes real photos of real bodies. I wore the dress on camera and cried slightly and my editor left it in and that clip has more views than anything else I've posted this year.`,
    `Twelve minutes on a TEDx stage. I wrote and rewrote the talk for three months. I delivered it in twelve minutes and it felt like it lasted thirty seconds. The standing ovation was real and sustained and I stood there accepting it feeling larger than I ever have.`,
    `My face on a billboard. On a highway I drive regularly. I saw it and had to pull over and sit with it for a moment. Then I drove home and ate a full meal and cried again. I am very large on a billboard on a major highway and I am correct.`,
    `Cultural touchstone. Journalists use that phrase in profile pieces. Students cite me in thesis papers. I get speaking requests from places I've never been. I eat well and exist largely and apparently that has become something worth studying. I am the study.`,
    `The platform is legacy. The body is the argument. The argument did not require me to be small or quiet or apologetic, and I wasn't, and now I am enormous and permanent and the work is done in the sense that it continues without requiring my active defense. That is what winning looks like.`,
  ],
  eating_captain:[
    `Regional Open. My first. The warmup room smelled like cooking and the girl from State — 178 lbs, two years on the circuit — looked at me the way people look at something they didn't expect. Maya from Lakewood, 330 lbs, hadn't looked at me at all. I ate my warmup. I stepped on the scale. The judge read my number twice. Maya looked over for the first time. I went back to my station and got ready. I lost. I'm going back.`,
    `Six months in. Maya says hello now. She's 370 and I'm 320 and the gap is closing and she knows it the same way I know it. We ate in the same warmup room and talked for a few minutes before competing and it was good and then she beat me and it was fine. I know where this is going. She knows too. We're both just moving toward it at different speeds.`,
    `Conference championship. I weighed in at ${419} and Maya's number was 410 and the head judge said mine into the microphone and Maya stopped writing mid-number with the marker. She put the cap back on without finishing. I made eye contact with her. She said: "I knew it was coming." She said it quietly, not to the crowd. She meant it as a compliment. I took it as one. Then I won the conference.`,
    `National qualifier and Maya found me backstage to say I was the best she'd ever seen. She said it plainly. She looked me in the eye and said: "You're the best I've ever seen. I need you to know I know that." Then she went to her warmup. I stood in the warmup room for one second thinking about the girl from State who asked "is that right?" when they read my number at my first competition. Then I ate everything.`,
    `National champion. Maya was already clapping when they read my name. She started before anyone else — before the crowd, before the other competitors, before the officials. I looked over and she was standing at her side of the staging area with both hands coming together and she was the first. I don't know if she planned to be first. I think she just couldn't wait any longer. I understand. I am the national champion and I have been waiting for this for two years and I still couldn't wait for it to be over.`,
    `I put my hand on my belly after the ceremony. That's what I wrote in the diary last night — I stood in the arena hallway with the trophy and I put my hand flat on my belly, the full round warm weight of it, and I thought: this is what I built. Every competition, every warmup room, every time I stepped on the scale and let them read the number. This is the record. This is the proof. There is more to build. I am not done.`,
  ],
  big_squad_captain:[
    `I stood in front of the squad and said: no more weigh-ins, no more size requirements, no more conversations about who fits the uniform before we talk about who can do the work. Two girls cried. One left. Six signed up the next week.`,
    `Pledges are choosing us. They say they heard about the culture — that we celebrate what bodies can do rather than what they look like. This is accurate. The chapter is the fullest it has been in years. Some of the fullness is literal. I'm proud of all of it.`,
    `A journalist called for a quote. Then they asked for a sit-down. The article ran with the headline 'The Squad That Changed the Conversation.' I read it three times and ate something good and thought about what a long way this has come.`,
    `National Greek leadership conference. I spoke for forty minutes. My chapter was in the front row. At the end there was a long silence and then the room started. I said afterward that the silence was the best part. That's true.`,
    `The national organization changed its guidance. Quietly. In a footnote of a wellness document. We were mentioned. My name was mentioned. I filed it and made dinner and told the squad and they screamed and we ate together.`,
    `I built a thing that doesn't need me to sustain it anymore. The culture lives in the chapter, in the pledges, in the alumnae who write back and say it changed how they think about their own bodies. That is permanent. I am permanent. We are the same size in different ways.`,
  ],
  eating_diarist:[
    `The newsletter went out to thirty people. Thirty. I wrote it like an assignment I was grading myself on, which means I rewrote the opening line eleven times and sent it at 11:47pm. Thirty people opened it by morning. Thirty felt like a beginning.`,
    `An agent emailed. A real literary agent, with a list of authors I've actually read. She said she'd been following the newsletter and had ideas. I reread the email six times. I ate a full breakfast before I replied. The reply took four drafts.`,
    `Two-book deal. The first is memoir. The second is something she called 'a companion piece' which I am interpreting as permission to write whatever I want. Both advances cleared. I bought myself a dinner I'd been meaning to have for six months.`,
    `Published. The book is out in the world. Reviews say 'intimate,' 'funny in a way that catches you off guard,' 'a document of a transformation that refuses to apologize.' That last one is accurate. I did not apologize. Not once.`,
    `The book is being taught. A food studies course assigned it. A gender studies course included it in a unit. I went to one of the classes and sat in the back and listened to students argue about sentences I'd written and felt something I didn't have a word for until later: permanence.`,
    `The writing and the eating were always the same act — both a form of taking in, of accumulating, of making something mine. I understand that now the way I understand my own body: completely, without effort, as a fact that was always true and simply needed time to become obvious.`,
  ],
  food_researcher:[
    `The IRB paperwork was forty-seven pages. I am the only researcher I know who is also the primary research subject. The committee found this unusual. They approved it. The methodology section is the most honest thing I've ever submitted.`,
    `I have a lab space. I have a grant. I have a meal plan that is technically research infrastructure. The institutional support for what I'm doing has exceeded my expectations at every stage, which suggests either that my work is good or that the institution doesn't fully understand what I'm studying. Possibly both.`,
    `Published. Peer-reviewed, actual journal, impact factor above two. Reviewer 2 called the self-study design 'ethically complex.' Reviewer 1 called it 'a methodological innovation.' The editor agreed with Reviewer 1. I agree with the editor.`,
    `Three citations. A paper at a school I didn't attend cited my methodology. A paper I disagree with cited my findings. A paper I admire cited both. Citation counts are a strange kind of conversation. I've entered it. I'm staying.`,
    `Keynote. The conference was not prepared for the physical reality of having me at the podium. The podium was adjusted. The microphone was adjusted. The audience adjusted. I gave the talk. The Q&A ran thirty minutes over scheduled time. Nobody left.`,
    `The experiment has concluded in the sense that the study period has ended. The subject has not concluded. The data is complete. The researcher remains. I am both, simultaneously, at the scale that data set always implied I would reach. This was always the endpoint.`,
  ],
  eating_streamer:[
    `First gaming + eating stream. I was nervous in a way I haven't been nervous about streaming in years. Within two hours the viewer count had done something I'd never seen it do before, and the chat was completely alive, and I understood that I had found the correct format.`,
    `The viewers who came for the games stay for the eating. The viewers who came for the eating are learning the games. The crossover is larger and more genuine than I expected. The snacks arrive in boxes now. I have a dedicated shelf.`,
    `My community follows every meal and every match. They know my order at six different restaurants. They track my high scores. They send delivery gifts in amounts that require a second fridge. I have a second fridge. I bought it with stream revenue.`,
    `The platform featured my channel in a collection titled 'New Formats.' I've been doing this for months. The platform finally noticed. The algorithm turned on like a light. The viewer count doubled in a week. I ate through the entire surge.`,
    `Mukbang gaming legend. My clips get remixed and cited and reposted. My setups and orders are documented on a fan wiki I did not create. I had a conversation with another creator about this and she said 'you built a genre.' That might be accurate.`,
    `The stream is always on in some sense. I eat in front of people every day and they watch and something genuine happens in that watching. I don't fully understand what it is. I don't need to. The food is real. The audience is real. The rest is detail.`,
  ],
  speed_eater:[
    `Timer ran. I finished forty seconds early. The crowd didn't know how to react. The MC found words eventually. I sat with my hands folded and waited, because there was nothing else to do — the plate was empty, the record was over, I was done.`,
    `Records are falling in sequence. I write each one down in a notebook before I break it. The notebook is three-quarters full. The remaining quarter is projections. The projections keep proving accurate.`,
    `Regional eating championship on Saturday, DLC speedrun on Sunday. Both won. I slept for twelve hours after and woke up hungry and started planning the next one. The two disciplines feel identical to me now: set a target, exceed it, rest, repeat.`,
    `My name shows up in two different competitive communities now. They've started to overlap — people show up to eating competitions who know my gaming records, and vice versa. I hold simultaneous records. It's unprecedented. Apparently.`,
    `World-record territory on multiple tables. I've broken things that people thought were unbreakable. The documentation is meticulous. The methodology is reproducible. Nobody has reproduced it. I suspect nobody will.`,
    `Speed doesn't mean anything at this size and weight and scale of appetite. I've transcended the timed format. I eat until I'm done, and when I'm done I'm done, and the numbers are beside the point. The life is the point. The eating is the point.`,
  ],
  ranked_feedee:[
    `Session log — Week 1: Started around two. New delivery driver named Rae got here in eleven minutes. Didn't say much, confirmed the order, left. Stayed up until four. Lost two ranked games, won one. Ate everything. The session felt good in a way I don't feel like analyzing.`,
    `Session log — Week 5: Rae added something to the order. I didn't ask for it. The receipt said 'complimentary' in the notes. It was a dessert thing I'd been thinking about ordering for three weeks. I ate it. I went on tilt and ate through the whole session and won three games in a row. I'm not drawing conclusions from this.`,
    `Session log — Week 9: She was at my door when I placed the order. She said she was 'in the area.' The building requires a code for the lobby. I let this go. Food was warm. Session went five hours. I went from bronze to silver in one sitting. The correlation is clear and I am choosing to ignore it.`,
    `Session log — Week 13: I didn't place an order. Rae showed up anyway. She said she had 'a feeling.' She brought the exact thing I had been thinking about ordering. I ate it. It took forty minutes. During those forty minutes I won four ranked games straight and my team played like a different team because I was not tilting for the first time in two weeks. I have decided not to think carefully about any of this.`,
    `Session log — Week 18: Rae rearranged the desk area to fit more food trays. She didn't ask. The setup is better now. My belly rests on the edge of the desk differently. She said 'there' when she finished, like a complete sentence. I have been thinking about that word all week. I won my first Diamond game. I am significantly heavier than I was four months ago. These things happened in the same week.`,
    `Session log — Week 23: Rae is here most days now. She doesn't always bring food. Sometimes she's just here. I asked once if she was still technically on shift. She said 'not technically' and that was the whole answer. I think she knows what she's doing. I think I know what she's doing. We're both choosing not to say it, which is fine. Working as intended.`,
  ],
  chapter_hostess:[
    `Twelve courses. I planned every one of them, sourced every ingredient, set every table. The chapter arrived uncertain and left full and grateful and different in a way I can't fully quantify but absolutely recognize. We did something real in that dining room.`,
    `Wednesday feast night is established. The chapter knows it, the schedule reflects it, the kitchen is stocked by Tuesday. I have become the person who feeds everyone, which is a role I did not apply for and have accepted completely.`,
    `Three people transferred specifically for the Wednesday feasts. I know this because they told me. They found out about the chapter through secondhand accounts of the food. I am building the chapter's reputation through abundance. I'm okay with this.`,
    `The administration noticed. A wellness coordinator came to speak with me. I served her the Wednesday feast menu and she left with a full tupperware container and has not filed anything. I consider this a diplomatic victory.`,
    `Alumni are funding the feasts. A check arrived with 'for the table' in the memo line, from a sister who graduated seven years ago. She heard about the chapter from someone who heard about it from someone else. The feast has a legacy.`,
    `The chapter hosts itself now. The traditions are real, the recipes are documented, the Wednesday ritual continues. I made a culture. I am also a culture. Both will outlast me in one direction or another.`,
  ],
  body_positive_greek:[
    `The proposal passed with one abstention. The one who abstained came to my room three days later and said she'd been thinking about it and changed her mind. The vote is now unanimous. I considered this a signal.`,
    `Pledges are choosing us because of what we stand for. They say it at rush: 'I heard about your chapter.' They mean the culture, the size acceptance, the fact that we eat dinner together and nobody comments on portions. We fill every slot in the pledge class.`,
    `National press. The article was sympathetic and got everything right and quoted three of my sisters by name. We printed it. We put it on the chapter bulletin board. We ordered pizza to celebrate. The irony was appreciated.`,
    `I spoke for forty minutes at the Panhellenic conference. My chapter was in the front row. When it was over and the applause had settled, a chapter president from another school came up and said: 'We've been doing the weigh-ins wrong. We're stopping.' I didn't say anything. I just nodded.`,
    `The national organization changed the wellness guidance. Three sentences, in a footnote, in the appendix. My name was in one of those sentences. A footnote in a document that governs thousands of chapters. That is not nothing.`,
    `I built it. The culture lives in the chapter and in the chapters that modeled themselves on ours and in the pledges who become sisters who become alumnae who go out and change other things. I made something that makes things. That is enough.`,
  ],
  competitive_gainer: CG_FILLED_DIARY,
  installation_artist:[
    `First installation: a room. Mirrors, photographs of my body at each stage, audio of my voice describing what I saw in the mirror at each weight. The opening was quiet for three minutes. Then someone started talking and the conversation didn't stop.`,
    `Two galleries made offers for the next show. One is in another city. I am shipping the work and also shipping myself, which required a logistics conversation that I found genuinely funny and also slightly absurd. I am the largest thing in both shipments.`,
    `The review in the major publication called it 'a confrontation with comfort and with scale.' I read that and ate something and thought: yes. That is precisely what it is. I am confronting you. I am also very comfortable.`,
    `Major exhibition: three rooms, multiple installations, one of them is entirely me — my body, documented in real time, present and being present. Critics spent long minutes in front of each piece. Several of them did not know where the art ended and I began. That is the work.`,
    `Retrospective. For someone still in progress. The curator said 'we want to capture the arc while you're still in it.' I said I appreciated the confidence that there was an arc and not just a continuous expansion. She laughed. I think she understood.`,
    `The body is the final installation. The body is always the final installation. Everything I made was documentation of this body becoming itself. Now it has become itself. I am the piece. The gallery is wherever I am.`,
  ],
  food_photographer:[
    `First show sold out. I was surprised and then I wasn't surprised, because the work is good and the subject is present — I photographed every meal I've eaten this year and the cumulative effect is something that lands differently than any individual image.`,
    `Gallery show in a proper space with proper lighting and proper people who stand in front of the prints and go quiet. I spent the whole opening eating from the reception table, which I'd argued should serve the foods that appeared in the photographs. The gallerist agreed.`,
    `Book deal: my photographs, my text. The publisher said the combination was 'unprecedented in the food photography space.' I pointed out that I am precedent. I am setting it. The book is what happens after.`,
    `Collector interest from people who own real things. A museum in Helsinki acquired three prints for the permanent collection. I flew to see the installation. The prints looked good in natural light. I ate a tremendous amount of Scandinavian food.`,
    `Permanent collections in three countries. The work will be there after I am not. I don't think about that often but when I do I feel something that isn't quite pride and isn't quite peace but sits between them.`,
    `I set out to photograph food. The food changed me. I photographed the change. The photographs became the subject. I became the photograph. The gallery has my face on the wall and my body in the chair by the desk and the distance between them is one career.`,
  ],
  anonymous_blogger:[
    `Forty-three readers by morning. I know that's small. It wasn't small to me. Forty-three people found a thing I made in the middle of the night and read it. I ate breakfast and started the next post immediately.`,
    `The following has grown past what I can track informally. I have spreadsheets now. The posts with the most engagement are never the ones I expected. The ones I wrote quickly, at odd hours, slightly recklessly — those are the ones.`,
    `A post went viral. A journalist tried to find me. She published a piece about looking for me, which meant that ten times as many people read my work trying to figure out who I was. Nobody found me. This is intentional. The anonymity is load-bearing.`,
    `Interview requests by email only. Voice notes with my filter active. One podcast published an episode 'about' me that was really about what I represent, which is the correct framing. What I represent is more interesting than what I am.`,
    `Cultural phenomenon with no face attached. There are fan accounts analyzing my writing style and my food choices and what my identity might be. I follow three of them. One is surprisingly close. I have not said so.`,
    `The blog and the body are the same record. Everything I wrote happened to the same person who ate everything. The words and the weight are both accumulations. Both are real. Both are mine. That is the entire project.`,
  ],
  asmr_creator:[
    `I whispered into a microphone and chewed slowly and the three hundred people who watched in the first hour left comments that made me sit very quietly for a long time. They said things like 'this is the only thing that helped me sleep this week.' I felt responsible in a good way.`,
    `The community is small and loyal and understands something that I'm still learning to articulate. They show up for every video. They leave careful comments. We are in some kind of agreement that I didn't formally sign but honor completely.`,
    `The algorithm found the channel. New viewers arrive daily now — people who don't know the community, who found the video through a recommendation. They become part of the community. The community is patient with newcomers. I'm proud of that.`,
    `A creator I watch included me in a 'recommended channels' post. The message was generous and accurate. Her audience came over and many of them stayed. The comment section is larger now but the care in it has not diminished.`,
    `A therapist wrote to say she'd used one of my videos in a session — with client permission, as background for a relaxation exercise. She said it worked. She asked whether she could recommend the channel to other clients. I said yes, obviously.`,
    `The sound of me eating is something people find comfort in. I find comfort in the eating. The camera is the only thing between us and it's not much of a barrier. We are two sides of the same thing: appetite and the peace that comes from feeding it.`,
  ],
  home_nest:[
    `Didn't go out today. There was no reason to. The food came — two orders, one midday, one evening. I ate both. Read something. Watched something. Slept when I was full. Woke up and thought about the next order. This seems like a good system.`,
    `I've been noting that I've developed routines. Not on purpose — things just happen in the same order, at the same times. The delivery apps know my preferences. I keep refining them. There's more to this than I expected when I started.`,
    `Third delivery today. I usually stop at two. Ordered a third because it seemed like the next thing to do, and it was good, and I finished it, and that was a good decision. I've been making more good decisions lately. They all involve food.`,
    `Someone from class texted asking if I was okay. Said fine, just busy. This is accurate. I am busy. The apartment is its own project — figuring out what I need, what I want, which places are best for which things. It takes time to get right. I'm getting it right.`,
    `The soup place messages me before I order to ask if I want the usual. The usual is: the soup, the bread, the thing with the rice that I'd forgotten existed until I tried it. I said yes. I like that the usual exists. I like that they know it.`,
    `I've been here a long time, by my standards. The room is familiar. I'm different — softer, heavier, more settled into this particular chair than I've ever been into anything. I haven't wanted to be anywhere else. I've stopped asking if that's something to fix.`,
  ],
  delivery_hive:[
    `My room doesn't feel like mine anymore. It feels like it's becoming something else. The lights are lower. The blankets are thicker. Delivery bags keep appearing by the door even when I don't remember ordering anything. I keep waking up with my hands resting on my stomach. It's getting harder to ignore how much it's changed. The walls feel like they're listening when I breathe.`,
    `Someone else moved through the Hive today. I didn't ask them to. They just... did. They brought food to rooms I haven't even claimed yet. I watched them from my bed and felt something warm settle in my chest. I think I'm supposed to choose someone. Someone who can move when I can't. The thought should scare me. It doesn't.`,
    `The rooms I've taken don't look like dorm rooms anymore. The lights are warmer. There are blankets where there used to be desks. People sit instead of study. They eat instead of leave. I can feel it when another room starts to give in. It's like a soft sigh in the walls. My body feels heavier every time it happens. I think that's the point.`,
    `I don't need to walk the halls anymore. I can feel the shape of the Hive from here. Which rooms have softened. Which ones are still resisting. Which ones are already feeding back into me. My body has become the map. I close my eyes and I know where the warmth is strongest. I know where the deliveries are going. I know where the people are settling. I am the center now.`,
    `Most of the building answers to me now. Not with words. With warmth. With softness. With the way people linger in doorways instead of leaving. The deliveries don't even feel like they're coming from outside anymore. They feel like they're coming from me. My body doesn't move, but the Hive does. I think I've become something the building needs.`,
    `I don't think there's a single room left that doesn't carry some part of me. The air is thick with it. The walls are warm with it. People don't fight it anymore. They sink into it. My body is the heart of something much larger than a dorm now. I can feel every breath the Hive takes. I am no longer waiting for it to grow. I am the reason it exists.`,
  ],
  campus_legend:[
    `The dining staff knows my order. They start preparing it when they see me cross the quad. The booth in the corner has been 'mine' for months in the informal sense that nobody sits in it when I'm coming. I appreciate the courtesy.`,
    `A freshman I've never spoken to referenced 'the legend of the dining hall' in a group chat I was added to. She meant me. The story she told was accurate in the facts and somehow smaller than the reality. Legends usually are.`,
    `My name on a booth. The dining director did it herself, with a small brass plaque, and told me about it during a meal I was having. I looked at the plaque for a while. Then I finished eating. The plaque is still there.`,
    `A campus tour guide mentioned me by name to a group of prospectives. I was eating nearby and overheard. She described me as 'part of the character of this campus.' I considered interrupting. I decided to finish my meal instead.`,
    `Incoming classes are told about me during orientation. I've confirmed this with four separate first-years who told me independently. The story varies slightly in the telling. The core of it — a person who became part of this place — is consistent.`,
    `I came here not knowing anyone or anything. Now I am known before I arrive anywhere on this campus. The campus shaped me and I shaped it back. We are the same thing now. I am the place and the place is me.`,
  ],
  food_tourist:[
    `Systematic expedition: I have a map, a list, a notebook. Every cuisine I've identified within thirty miles gets a documented visit. The notebook is filling. The visits are never disappointing. I eat well everywhere.`,
    `The blog has readers from my home country who write to say 'that restaurant is run by someone from my village.' The world is smaller than I expected and food is the thing that makes it smaller. I am grateful for both.`,
    `A publication from home ran a feature on the blog. My family read it. My grandmother called to say the portions I was eating were 'respectable.' That is the best review I've received and it required no formal publication.`,
    `Two book deals. One here, one at home. Both publishers want the same story from two different angles. I can give them that. The story is about distance and food and what you carry across both. I know it very well. I am it.`,
    `Cultural ambassador. It's on a press release somewhere. I'm someone who ate everything in one city while thinking about everything she left behind in another. The food was always the bridge. I've grown to fill the bridge.`,
    `I've tasted everything. The list is documented, the notes are extensive, the body is the record of every meal. I came here a stranger and grew into something that belongs here and to home simultaneously. The eating made that possible. It always does.`,
  ],
  ff_author:[
    `The character started as someone else. Or I told myself that. She's a literature student who gains weight over the course of the story — slowly, without apology — and the people around her find it beautiful and bring her food and want her to keep growing. I spent four hours on a single scene where someone notices how soft her belly has become and tells her. I posted the first chapter at 2am and couldn't sleep. There were forty-three comments by morning. Forty-three strangers who understood exactly what I'd written.`,
    `The readership has opinions. Very specific preferences about the rate and distribution of the characters' gain. One commenter left a two-paragraph analysis of the chapter where the cheerleader's uniform finally splits that was more precise than anything my thesis committee has ever said about my actual academic work. I've been thinking about that a lot. I've also been eating more. I don't think these two things are unrelated.`,
    `A classmate stood behind me on the library steps and said, very quietly, "I've been reading something." I didn't turn around. "It's very good," she said. "I think I know who wrote it." I went home and wrote four thousand words that night. The character based on her gains ten pounds in the new chapter. I consider this a generous tribute.`,
    `The author account is anonymous but the fiction is not. Everyone I've written about is in it. The gaining is the point. The love that surrounds it is the point — the way the characters grow into themselves and are seen clearly and wanted for exactly what they are. I've stopped pretending I'm writing about imaginary people. I've stopped pretending I'm not one of the characters.`,
    `Three hundred thousand words. The fandom writes their own versions of the story, and some of those versions are about me — the anonymous author, imagined as the main character, large and cared for and fed. They're not wrong. The character I write most honestly is the one who eats everything and is loved for exactly that. She has been me for a long time.`,
    `I don't write as much now. Not because I've run out — I haven't — but because the distance between the fiction and the reality has closed. Everything I wrote was true: the gaining, the care, the body as something beautiful rather than something to manage. I wrote it into being. Then I became it. That's the best thing I've ever made.`,
  ],
  homestead_queen:[
    `I made sweet potato pie from scratch at two in the morning because I couldn't sleep and the kitchen was there. I ate half of it while it was still warm, standing in front of the open oven, in a flannel shirt I've had since high school and jean shorts I can no longer fully close. By the time I finished writing down what I'd used I was full in a way that felt like the word was invented for this exact moment. I weighed myself in the morning. I wrote the number in the recipe book. This is a record. This is a life.`,
    `Grandma Mae video-called last Sunday and she could see the setup behind me — the jars lined up on the shelf, the cast iron on every surface, the folding table I've covered with oilcloth and claimed as counter space. She said: 'baby girl, you've got yourself a real kitchen.' I cried a little after we hung up. Not sad crying. The kind that happens when someone sees exactly what you are and names it correctly.`,
    `The recipe box arrived. Six generations of food in one flat-rate box: cards in three different handwritings, some in pencil so faint I had to hold them to the window, measurements in cups and handfuls and 'enough' and 'until it looks right.' I made every dish in four days. I kept notes. My notes look like Mae's notes, which look like her mother's notes. I am in a line of women who knew what to do with food. I am one of them. I have always been one of them.`,
    `Mae calls every Sunday at 10am. I always eat while we talk — something I made, something I'm testing, something I'm just hungry for. She never comments on the eating. She asks what I made. She asks how it turned out. She asks if I'm happy. I always say yes and I always mean it. This Sunday she said, 'you sound like yourself, baby.' I don't know when I stopped sounding like myself somewhere else, but I know exactly when I found it again.`,
    `She said: 'baby, you're going to run out of room in that dorm.' She is right. I take up most of it already — me and my jars and my cast iron and the folding table I've turned into a homestead and the smell of whatever I made last night still in the air. I don't feel like I've run out of room. I feel like I've filled it. There's a difference. I think Mae knows the difference too. She just says it like a warning to give me time to decide how I feel about it.`,
    `Mae drove up. I heard her knock and I knew — I could feel it the way you feel weather coming — and when I opened the door she saw me. Really saw me, not the version I present on the phone, the full physical fact of what I've become in this room with this food and this life. She looked at me for a long time. Then she started crying. Then she reached past me and started looking at what was in the jars. 'Tell me what you've been making,' she said. So I told her. We were there for five hours. She ate with me the whole time.`,
  ],
  state_fair_queen:[
    `First county fair entry. Darcy from Meadowview looked at me when I sat down at the pie table — a look I've seen before, the one that says 'this is not a serious competitor.' She won. I drove home knowing two things: what I did wrong, and that I was going to do this again. I wrote both things down. I also wrote down what I'd eaten during the event because I wanted to know the exact number. The number was not as high as it's going to get.`,
    `Second year. Darcy said 'you again' when she saw me, and she said it like she'd been thinking about it. I was at least sixty pounds heavier. She adjusted something in how she was sitting at the table after she looked at me. She barely won. That 'barely' matters. She felt it. I felt it. I went home and added it to my records.`,
    `State qualifier. I crossed Darcy on the scoreboard for the first time. She stopped eating mid-bite. I watched her do it in my peripheral vision — stopped completely, one second, just long enough to register what she was seeing — and then she went back to eating. I kept going. I won. After, she stood near the scale and said, quietly: 'where are you putting all that?' I told her: 'I grew more room.' I don't think she found that funny. I did.`,
    `State finals. I won. Darcy started clapping — full hand-claps, not the polite kind, the kind that means she's genuinely applauding — and she kept going for a long time after everyone else in the tent had finished. I walked over and she said 'I trained for six months for this. All year.' She said it like she was proud of me. I think she was. I think I might be the best thing that ever happened to her career. I'm definitely the best thing that ever happened to mine.`,
    `Tri-state invitational. They built a bigger scale. The judge announced this at the weigh-in — 'we have a new scale this year' — and looked at me, and the whole tent understood. I weighed in. The number caused a sound. Not a cheer, something quieter — the specific noise a crowd makes when a fact is too large to simply applaud. Darcy is in the open bracket now. She comes to watch. That means more to me than any trophy.`,
    `Grand Fair Invitational. I barely fit the tent. I don't say that with distress — I say it the way you say a fact that took a long time to arrive. The contest is incidental. Darcy is competing in the open bracket, 500 pounds, here to watch me win and I know it. When my number goes up, she's going to be the loudest person in the building. I've been eating competitively since I couldn't win. I've kept eating until I can't lose. I don't think there's a more honest biography than that.`,
  ],
  // ── FARM GIRL: wife_lessons ─────────────────────────────────────
  wife_lessons:[
    `First class. Darlene and Wanda. I made the honey-butter rolls and we talked for two hours and by the end Darlene had eaten seven and Wanda had eaten nine and they both took containers home. Wanda asked which fat I use. I wrote it on the card. She'll figure out what to do with it.`,
    `Patrice joined. She came in tentative and left with three recipe cards and a look on her face I recognize — the look of someone who has just realized this is what they've been missing. Taylor's hips are widening. She doesn't know what's in her lunches. She will eventually, when she starts making them herself. That day is what I'm working toward.`,
    `Cheryl. I didn't think she'd convert. I underestimated how hungry she was. Not for food — for permission. The femininity talk hit her like a key in a lock. She sat very still and then she started nodding and then she asked for the full recipe list. Madison is going to be extraordinary.`,
    `All six. Ruthanne passed the house on her own and knocked. I had been waiting for her without knowing I was waiting. Becca came with her. The room was warm and everyone ate and Becca said Sofia asked for 'the strong shake.' That means Sofia knows. That means it's working.`,
    `The philosophy is in the room now. They carry it without me. Lily wanted to learn how to make the recipes herself — the real ones, the ones that actually do what I've been doing. She knows. She wants to. That's the whole thing. That's everything. Kezia can't really leave the house anymore. Wanda is not sad about this.`,
    `Kezia changed bedrooms. She'd been growing into her old one for a while but the door frame finally became the problem. Wanda had the bigger bedroom cleared out and furnished for her. The bed frame cracked six weeks in. Wanda upgraded to reinforced. Kezia stays home. The world isn't set up for her at this size. The house is. That's what a home is for.`,
  ],
  // ── PSYCH paths ──────────────────────────────────────────────────
  psych_researcher:[
    "Session one. Subject was uncertain — expected. I maintained clinical distance throughout, which was harder than expected. My own intake during the session exceeded my baseline. Variable acknowledged.",
    "Month three. The subject's appetite has changed — not just size, but relationship. They reach for things now. The data is extraordinary. My own appetite has also changed and I'm choosing to study it instead of correcting it.",
    "I've been observing appetite dynamics in this subject for six months and I've noticed my notes from shared feeding sessions are more detailed than my remote observation notes. I am aware of what this probably means. I am continuing anyway.",
    "My subject told me today that they look forward to our sessions. I wrote it down. Then I sat with it for a while. Then I ate the rest of what was on the table. Variable noted: I found this information pleasing.",
    "I have generated more data on appetite, embodiment, and the feeder/feedee dynamic than I will likely be able to publish in full. My own data is extensive. The subject's data is extraordinary. I've decided to count my weight gain as a finding.",
    "Final entry for this volume. I am very large and my subject is very large and the research produced by this relationship will be the most honest work of my career. I stopped being the observer sometime around session forty. I am in the study. I always was.",
  ],
  // ── ECED path ──────────────────────────────────────────────────
  homeroom_queen:[
    `The first Tuesday. I'd been up since five making everything from scratch, and by the time the girls arrived the classroom smelled like butter and warm sugar and something that felt like a real home. I ate while I watched them eat — quality control, I told myself — and by the end of the session my apron was dusted with flour and my own belly was noticeably fuller than when I'd arrived. I logged that the banana bread was a success. I didn't log the rest.`,
    `Mrs. Monroe came inside today instead of waiting at the window. She sat at the table and had four pieces and talked about everything and laughed at all of it. I found myself making more food specifically because I knew she was coming. I'm not sure when I started planning for individual preferences. I notice I have. I ate more than usual this session too. The peach cobbler required a second taste-test. Then a third.`,
    `The group has grown comfortable. Kayla doesn't arrive early anymore — she arrives on time, which means she was never uncertain, just cautious. Bri has stopped asking what's in things. Mrs. Calloway ate three pieces and then asked about my training. I gave a genuine answer. She nodded. I think we understand each other now. I ate alongside them for the full hour. My clothes feel different after Tuesdays. I've started buying the forgiving fabrics.`,
    `I realized this week that I taste-test more at school than I do at home, which doesn't make nutritional sense unless you factor in that I'm happy at school. I'm happy on Tuesdays. The session was good — Mrs. Monroe brought wine and I politely declined and then accepted — and everyone was softer and more comfortable and more themselves than when we started this. I am also softer. I think this is fine. I think this is the intended outcome.`,
    `Sofia wore something different today. Not smaller — more comfortable, more expansive, more herself. Mrs. Reyes has stopped tugging at her jacket and I want to note that this is not a small thing. I am at this point something between a teacher and a caterer and possibly something else I don't have a word for. I ate everything I made extras of. There were a lot of extras. I planned it that way and I'm no longer pretending otherwise.`,
    `End of term. All six of them in the room at once, which hasn't happened since the formal event was established. I made everything. I ate everything I'd saved for myself and then some of theirs when there were offers. The room was full and warm and loud with laughing and I sat in the middle of it — enormous and full and happy and flour-dusted — and thought: yes. This is exactly what I was supposed to do with all of this. I logged that. It belongs in the record.`,
  ],
  cultivator:[
    `First subject session. I built the recipe specifically around her palate — not a concession, a technique. She ate everything without questioning. I ate the test portions and noted the results in both logs. The professional satisfaction is real.`,
    `The subject is growing on schedule. I adjusted the recipe upward this week — heavier base, extra portion — and she accepted the change as if it had always been this way. Quality control required more attention than usual. I'm eating more at sessions than I expected. I logged it.`,
    `I've started noting my own weight in the session log. It's relevant data. I'm considerably heavier than when this started, which is also relevant data. The subject is on pace. The kitchen is running exactly as intended.`,
    `Harvest window is open. The subject is at Very Fat stage. I could proceed now. I'm not proceeding now. I want to see the next stage. This is a professional judgment, not an excuse. I ate the full quality-control portion today and did not note this as unusual.`,
    `The subject is enormous. She takes up the chair completely and eats with the complete appetite of someone past self-consciousness. I fed her the richest version of everything. I ate alongside her. I am considerably larger than I was at the start of this study. I find this entirely appropriate.`,
    `Session before harvest. She is very large. I am very large. The kitchen is warm and full and the recipe is perfect and I ate everything I made and she ate everything I served and we sat across from each other both large and full and satisfied and I felt — exactly right. The harvest will proceed tomorrow. The log is complete.`,
  ],
  machine_goddess:[
    `Workshop log — week one after evolution. I built the bloating belt first because the feedback loop is elegant: pressure in, volume out, shame optional. Self test-run: successful. I wrote "successful" three times in the margin.`,
    `The feeder arm works. I ate while it fed me and called it calibration. The paste printer slots in clean — calories per cubic centimeter are obscene. I am not ashamed of the obscene part.`,
    `Subject wore the belt through a lecture. She texted circumference readings hourly. I replied with duty-cycle adjustments. We are both getting better at this.`,
    `Instability hit thirty percent after the serum injector trial. The subject gained fourteen pounds in an afternoon. I gained six from celebratory paste. Variance within acceptable chaos parameters.`,
    `Redistribution rig online. I sculpted a pear silhouette onto a volunteer and watched her discover the new center of gravity. I ran the same program on myself afterward. Data should be symmetrical.`,
    `Endgame note: the lab never sleeps. Devices tick on bodies across campus. My belly is soft against the workbench when I lean in to solder. I am the network the machines were always pointing at.`,
  ],
  // ── BOOKWORM path ───────────────────────────────────────────────
  community_researcher:[
    `First case study. I told myself I was observing. I observed, and I ate, and I noted the correlation between being welcomed into these spaces and feeling an obligation to participate in what the space was for. I ate more than I planned. The sociology of that is documented.`,
    `Midway through the study. I look different than when I started. I note this the way I note everything — in clinical language that fits neatly into the methodology. The clinical language is accurate. What it doesn't convey is that I looked in the mirror this week and didn't look away.`,
    `My advisor asked about my "level of personal engagement" with the research. I said the engagement was "appropriate." I believe this. I'm writing a paper about how immersion in these communities is both unavoidable and clarifying. I am clarified.`,
    `I've stopped wearing the cardigans to the case studies. The cardigans stopped fitting somewhere between the third and fourth session. I've documented this transition. I've moved on to stretch fabrics. Also documented.`,
    `The paper is 60,000 words. It's going to be good — I know when something is good because the writing comes faster than the thinking, and this came faster than anything I've written before. There's a section on researcher positionality I wrote at 3am. It's the best part.`,
    `I submitted today. My advisor sent one note: "This is either career-defining or a scandal, and I suspect it's both." She means the honesty. I documented my own transformation as methodology. She approved it. I ate an entire box of something celebratory before bed. I note this approvingly.`,
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
    "Lab coat, custom-ordered. The standard one didn't cover the data. She made a note in the methodology.",
    "Academic casual with a purpose — she needs pockets, always. The blazer accommodates everything.",
    "Presentation attire for conferences. Wide-cut, professional, memorable. The slides are also memorable.",
    "Keynote outfit. Her institution had a photographer there. The photos are impressive.",
    "Research gear that accommodates field work, office work, and being the field. Practical and extraordinary.",
    "She dresses like someone whose research has outlasted the original hypothesis. With confidence.",
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
    "Comfortable campus gear in her colors. Students recognize the outfit before they recognize the face.",
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
    "Lab coat over a blouse. Pristine. Notebook prominent. A 'Research in Progress' lanyard.",
    "Lab coat, wider cut. Stretch professional blouse underneath. Still the lanyard.",
    "Custom lab coat, noticeably larger. The blouse underneath strains slightly. Notebooks doubled.",
    "Wide professional lab coat. She's given up on fitted anything underneath.",
    "Lab coat barely buttons. She wears it open. The blouse beneath is custom-ordered.",
    "Lab coat enormous and custom-made. She wears it like a robe. It suits her.",
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
    "Lab coat over a hoodie, cargo pants, fingerless gloves. Solder burns on the cuffs. She smells like flux.",
    "Reinforced work coveralls, pockets full of hex keys and calipers. The coat buttons strain when she leans over the bench.",
    "Custom harness-friendly layers — wide belt loops, stretch panels at the waist. Built for wearing her own prototypes.",
    "Industrial coveralls with tool rigging across the chest. Paste stains on the collar. She doesn't notice anymore.",
    "Oversized tech-wear in matte black, LED status pins along the sleeves. Her body fills it like another machine casing.",
    "The workshop clothes are half armor, half uniform — wide, soft, engineered around a body that feeds the builds. She belongs to the lab now.",
  ],
};

export const EVOLVED_ACTIVITY_TEXT = {
  sumo:[
    (s)=>`She knocks on your office door in her mawashi-bag and warm-ups — ${Math.round(s.lbs)} pounds, belly round and forward, a competitor's calm on her. "Regional qualifier today," she says. "Dana Mercer's there. She's 340. I want you to watch." She doesn't ask. You go. You watch a former cheerleader try to push a six-year veteran out of a ring with her belly, and very nearly do it. She loses by inches and isn't discouraged at all. "She's still bigger than me," she says afterward, eating. "For now."`,
    (s)=>`She stops by before the circuit tournament — ${Math.round(s.lbs)} pounds, looser and surer than last season. "The gap's down to fifty pounds," she says, meaning her and Dana. "I feed in my corner now. Every bout I get a little bigger, and she has to move all of it." You come watch. Between bouts she eats — bowl after bowl in her corner — and you watch her grow over the course of the afternoon, her belly settling lower each break, until she nearly takes the Wall down with the weight of it.`,
    (s)=>`Conference meet. She's ${Math.round(s.lbs)} pounds and for the first time she outweighs the rival who used to dwarf her. "Watch the board today," she tells you. "My number goes up top." It does. Dana stares at it and says "there it is," and then your student goes out and makes the number mean something — belly-first, driving Dana out of the ring twice while the crowd, for the first time at this level, chants her name.`,
    (s)=>`National qualifier, and there's press at the door. She finds you before warm-ups — ${Math.round(s.lbs)} pounds, the heaviest competitor in the building by a mile, her belly an enormous warm apron under the mawashi. "Dana says she'll out-think me," she says, almost amused. "Watch how that goes." You watch. It does not go well for Dana. Size has become an argument that ends discussions, and your student spends the whole bracket eating in her corner to make the argument bigger.`,
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
    (s)=>`She knocks on your office door in her competition gear — bib around her neck, hair up, competition number pinned to her jacket, ${Math.round(s.lbs)} pounds warm and ready and forward in the doorframe. "Regional Open today," she says. "I wanted to tell you." She doesn't ask you to come. You come anyway. She's a cheerleader captain who has decided she's something else now, and she wants a witness.`,
    (s)=>`She stops by before she leaves for the circuit meet — ${Math.round(s.lbs)} pounds, the bib already on, and she's looking good, the specific loose confidence of someone who has stopped being new at something. "Maya's going to be there," she says. "Maya's 370." She says it the way people say things they've been thinking about for a while. "I know," she says. Then she leaves. You follow her out.`,
    (s)=>`Conference championship day. She's ${Math.round(s.lbs)} pounds and the competition bib she ordered three months ago is tight across her belly now and she wears it like it fits because it fits exactly as she wanted it to fit. "The board's going to have my number at the top," she tells you before she leaves. "I want you to see that." You go. The board has her number at the top. The judge reads it into the microphone. Maya puts the cap back on her marker.`,
    (s)=>`National qualifier. She comes by your office the morning of — ${Math.round(s.lbs)} pounds, dressed to compete, the number already pinned. "There's going to be press," she says. "A journalist." She says it like she's telling you something, not asking. "Maya told me I'm the best she's ever seen." She pauses. "Maya's right." She leaves. You get in your car and follow the van to the venue.`,
    (s)=>`National championship. She's ${Math.round(s.lbs)} pounds and the arena credential is around her neck and the woman at the door held the door open wider when she came through and didn't say anything about it. She finds you in the crowd before the event. "Watch the weigh-in," she says. Just that. Then she goes backstage. You watch the weigh-in. The arena goes quiet when they read her number.`,
  ],
  big_squad_captain:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the weigh-in board is gone from the gym wall and she's standing in front of 18 cheerleaders — plus two new girls who'd never come before, soft-figured and nervous — explaining what this squad is now. Her belly rounds forward against her practice jacket. Her thighs press together. She tells them: size requirements are abolished. No weigh-ins. Performance is the standard. Then she adds: "And I expect you to eat well. I want this to be the heaviest squad on campus." She says this with the same tone she uses for formation notes. Like it's obvious. Like it's training.`,
    (s)=>`${Math.round(s.lbs)} pounds and rush week. She runs the information session — her belly forward, her thighs wide, ${Math.round(s.lbs)} pounds of warm, authoritative squad captain — and every girl who comes through the door is evaluated on the same terms: is she committed, can she cheer, does she want to be here. Two girls arrive who are visibly heavy — 220, 230 pounds — and would have been turned away under the old rules. She asks them their names and invites them to the next practice. The chapter gets bigger that day in every sense.`,
    (s)=>`${Math.round(s.lbs)} pounds and the journalist is at practice. She runs the formation the same way she always does. Her belly, enormous and warm, presses against her practice uniform as she moves through the choreography. Afterward she tells the journalist: "I weigh ${Math.round(s.lbs)} pounds. Two years ago I couldn't have been on this squad. Now I run it. That's the change." She pauses. "Also three of my girls weigh over 250 now and they're the best cheerleaders we've had. You can print that too."`,
    (s)=>`${Math.round(s.lbs)} pounds. The national conference keynote. She arrives in the chapter's colors — wide and warm, her belly a vast presence in the auditorium — and speaks for forty minutes without notes about what cheerleading can be when it stops requiring particular bodies. She says the specific number: she weighs ${Math.round(s.lbs)} pounds. She says it clearly, without apology, into a microphone in front of 400 people. The room goes quiet. Then it doesn't. You're watching from the fourth row and the person next to you is crying a little and so might you be.`,
    (s)=>`${Math.round(s.lbs)} pounds. Homecoming. She's in the stands now — she watches the squad perform the halftime show she choreographed, the formations she designed, the culture she built. Her belly fills her stadium seat. She eats from a large bag through the whole performance. The new captain runs it perfectly. In the third formation your student leans forward slightly and nods, once, with the private satisfaction of someone watching something they made work without them. "It held," she says.`,
  ],
  eating_diarist:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she sends you the first newsletter draft at 11:47pm. 1,400 words. She's written about the last three months — specifically, directly — her belly getting rounder, her clothes stopped fitting, the meal she ate that made her understand something. The writing is exact. She says: "I weigh ${Math.round(s.lbs)} pounds and I didn't plan this but I'm not apologizing for it either." You tell her to send it. She does. Forty readers. By morning it's 400.`,
    (s)=>`${Math.round(s.lbs)} pounds. The agent calls. The agent has read every newsletter. "This is a book," the agent says. "You, eating, your body, what it means. Everything you've been writing." She calls you after the meeting and you can hear her eating while she talks. "She wants me to describe my belly in the book," she says. "I told her I already do that." She does. Her belly at ${Math.round(s.lbs)} pounds is warm and round and she has described it in three newsletters and she'll describe it in six more before the draft is done.`,
    (s)=>`${Math.round(s.lbs)} pounds. Draft review. She reads you a passage: she's describing her thighs — ${Math.round(s.lbs)} pounds of thigh, pressed together, warm — with the precision of someone who has been paying close attention for two years. "Is this too much?" she asks. You say no. She says: "Good. I want it to be too much. I want whoever reads this to understand exactly how much I weigh and what that looks like and feel it." She eats while you finish reading. She adds a paragraph.`,
    (s)=>`${Math.round(s.lbs)} pounds. Book launch. A bookstore, an evening, 200 people. She reads for twenty-five minutes from the chapter that describes the morning she weighed 400 pounds for the first time — the scale, the number, the way she stood there and felt what 400 pounds felt like from the inside. She says: "I weigh ${Math.round(s.lbs)} pounds now. The book ends at 400. The second book starts here." Someone in the front row asks how much the second book will end at. She says: "More."`,
    (s)=>`${Math.round(s.lbs)} pounds. The second book's final draft. She sends it on a Sunday morning. You read it that day — 90,000 words about her body at every stage above 400 pounds, her belly described at each increment, her thighs, her arms, the way chairs feel, the way food tastes when you weigh ${Math.round(s.lbs)} pounds and you've been eating intentionally for three years. You text her that night: it's the best thing she's written. She replies an hour later: "I know. I was at dinner when you texted. My belly was so full I couldn't move and I kept thinking: I need to describe this exactly. I'm adding a chapter."`,
  ],
  food_researcher:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the IRB approval came through — she is both researcher and subject, officially, with institutional backing. She shows you the approval document. Her belly presses against the desk as she leans forward to point to her name in the subject section. "Primary participant," she says. She starts data collection that afternoon: weight, intake, measurements, date. The first entry is ${Math.round(s.lbs)} pounds. She takes it seriously.`,
    (s)=>`${Math.round(s.lbs)} pounds. Lab visit. She shows you the setup: scale, measurement tape, intake log, weekly protocol. She stands on the scale for you: 315. She measures her waist, her hips, her belly circumference — she writes the numbers down without expression. Then she opens the meal log. She's tracked every meal for eight weeks. The graph goes up. "The data is clean," she says. "The subject is cooperative." She means herself. She records your visit. She makes you sign as a witness.`,
    (s)=>`${Math.round(s.lbs)} pounds. Pre-publication draft. She shares it over dinner — she eats while you read it, answering questions in the margins you indicate. The methodology section describes her body at each measurement point with academic precision. Her belly at ${Math.round(s.lbs)} pounds is described in centimeters. Her thighs in circumference. Her weight gain graphed by week. The conclusions are unambiguous: "Subject demonstrates continued voluntary intake increase consistent with research objectives." She eats the rest of her dinner. "I want to be fatter when the second paper comes out," she says.`,
    (s)=>`${Math.round(s.lbs)} pounds. Acceptance email. She forwards it with no message. You call her. She's eating — you can hear it. "They accepted it," she says. "Subject at ${Math.round(s.lbs)} pounds, study ongoing, first paper published." She laughs once, briefly. "I'm the most thoroughly documented fat woman in the academic literature," she says. "I documented myself. I'm very proud of both of those things." She eats.`,
    (s)=>`${Math.round(s.lbs)} pounds. Keynote. She stands at the podium — ${Math.round(s.lbs)} pounds, enormous, her belly a warm presence against the lectern — and presents for fifty minutes on appetite, voluntary weight gain, and longitudinal self-documentation. She puts her own measurements on the slide. Her waist, her belly, her hips — every number, publicly. The audience is silent. She finishes. The first question is: "How much do you plan to weigh at the end of the study?" She says: "More than this." She says it exactly like a scientist with a hypothesis she has already confirmed.`,
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
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's been in the chapter kitchen for four hours, which is two hours more than the feast requires. Her belly presses the apron forward. Her thighs fill her kitchen clothes. She has cooked 23 separate dishes. The table is extraordinary. When the chapter arrives — fourteen girls, some of them already soft-figured and getting softer, one at 230 pounds who has been to every Wednesday feast for six weeks — she watches them eat with the quiet satisfaction of someone feeding exactly the people she wants to feed. She eats at the end. She eats a very great deal.`,
    (s)=>`${Math.round(s.lbs)} pounds. Feast night. The table is set. She circulates during the meal — suggesting more of the pasta to one girl, pressing the bread on another, refilling plates before they're empty. She is ${Math.round(s.lbs)} pounds and she is the largest person in the chapter room and she moves through the space like someone who knows exactly what she's doing. One girl — maybe 245 now, soft belly visible under her formal blouse — looks at your student's belly with a particular expression. Your student notices. She puts a third portion of dessert in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The alumni donor comes to Wednesday feast. She sits at the table and eats with the chapter. Your student serves her personally. Her belly is enormous and warm and she navigates the kitchen and the dining room completely at ease. The alumni donor is 340 pounds, gray-haired, and she watches your student work. At the end she says: "I funded this for eight years without understanding it. I understand it now." Your student puts another plate in front of her.`,
    (s)=>`${Math.round(s.lbs)} pounds. The new pledge class's first Wednesday feast. She has planned it for three weeks — more ambitious than the regular feasts, more food, more courses. She wants the pledges to understand what they've joined. Her belly is enormous when she moves through the kitchen. Her thighs are vast. She serves everything personally. By the end of the feast the pledge class is in various states of very full contentment, three of them visibly, noticeably heavier than when they arrived. She sits at the head of the table and eats what remains and is satisfied with all of it.`,
    (s)=>`${Math.round(s.lbs)} pounds. Her last Wednesday feast as chapter hostess. She has cooked the same feast she cooked the first time plus ten additional dishes. The kitchen ran for seven hours. She is ${Math.round(s.lbs)} pounds and she stands at the head of the table to welcome the chapter and her belly is vast and warm and she is the most magnificent person in the room by every measure. The chapter eats. She eats. Afterward she sits among the sisters and doesn't say very much. Her successor will be trained. The feasts will continue. But this one is hers.`,
  ],
  body_positive_greek:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and she's standing in the chapter room explaining the new rules: no weigh-ins, no size requirements, commitment and character and wanting to be here. Two girls in the back are 220 and 230 pounds — they've been told by two other sororities that they don't fit. She introduces herself to them specifically. Her belly rounds forward in her chapter jacket. Her thighs press together. She tells everyone: "I weigh ${Math.round(s.lbs)} pounds. I run this chapter. If anyone has a problem with that they are in the wrong room." Nobody is in the wrong room.`,
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
    (s)=>`${Math.round(s.lbs)} pounds. The retrospective opens. She stands near the entrance, enormous and warm, her belly filling the front of her dress, her thighs broad and slow-moving as she walks the room. She eats from a small plate without stopping or sitting. The final room is the largest: it contains only her body cast at each major weight milestone — 200, 280, 360, 450, 540, 630, and the newest, taken last week at 691. They are arranged in a curved line, getting larger, each one warm cream-colored plaster, each one smooth and heavy and real. A group of students stand at the end of the row looking at the largest cast and then looking at her and then back. She lets them. She eats.`,
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
    (s)=>`${Math.round(s.lbs)} pounds. Community session. She opens the comments from the most-watched video and reads each one aloud, slowly, eating while she reads. The viewers describe the videos as calming, grounding, necessary. One says: "I eat along with her every week. I've gained twelve pounds this semester. I think she's made me comfortable with that." Your student reads this one twice. She says: "Good." She means it plainly. Her belly presses the desk at ${Math.round(s.lbs)} pounds and she's very comfortable with that too.`,
    (s)=>`${Math.round(s.lbs)} pounds. The algorithm finds her. She shows you the analytics — the spike, the jump from 6,000 to 60,000 subscribers in three weeks. She is ${Math.round(s.lbs)} pounds and her recent thumbnails show her seated at the recording setup, her belly a warm rounded presence in frame, her face calm. "The old viewers are managing the new ones," she says. "Teaching them how to behave." She shows you the comment section — the longtime subscribers welcoming newcomers, explaining the ritual. "I'm proud of them," she says. She starts the next recording. Her belly fills the lower half of the frame beautifully.`,
    (s)=>`${Math.round(s.lbs)} pounds. The mainstream crossover. A large creator — 3 million subscribers — mentioned her channel in a video about comfort content. She watches the mention twice, sitting very still both times. "I don't want it to change," she says. It doesn't. The new subscribers find the ritual and most of them observe it correctly. The videos are exactly as they were: the soft sounds, the careful pace, the food, her belly at ${Math.round(s.lbs)} pounds rounding forward into the frame, warm and enormous. She records the next one that evening and it's the best thing she's made.`,
    (s)=>`${Math.round(s.lbs)} pounds. The therapist collaboration video. She's been planning it for two months — a licensed therapist explains, briefly and carefully, the clinical basis for the calming effect of ASMR eating content, and then the session proceeds normally. Your student at ${Math.round(s.lbs)} pounds, seated at the recording setup, her belly vast and warm and completely at ease, eating slowly and deliberately for ninety-five minutes. The video has 2.1 million views in a week. The comment section is the same as always: people saying they're fed, they're calm, they feel okay. She reads them with you. "I weigh ${Math.round(s.lbs)} pounds," she says. "I eat on camera. It helps people." She is very satisfied with this. She opens a new delivery order.`,
  ],
  campus_legend:[
    (s)=>`She weighs ${Math.round(s.lbs)} pounds and the dining hall staff has her usual ready before she sits down. The booth is the largest one — corner, good light — and she fills it well at ${Math.round(s.lbs)} pounds, her thighs spreading warmly across the bench, her belly soft against the table's edge. A table of first-years watches her order. One of them leans to another and you can see the question being asked: the second one shrugs and says her name. The first one's eyes widen. You eat across from her. She is working through her third plate.`,
    (s)=>`${Math.round(s.lbs)} pounds. The booth gets a brass nameplate. The dining director installs it herself, a small ceremony: her name and a date. Your student looks at it for a long time, belly warm and round against her sweater at ${Math.round(s.lbs)} pounds, thighs broad and easy on the bench. "Is this weird?" she says. You say no. She looks at it again. "No," she says, "it's right." She sits back down. The kitchen sends out a complimentary fourth plate. She eats it. The staff watches from the service window with the satisfaction of people who made a good call.`,
    (s)=>`${Math.round(s.lbs)} pounds. Campus tour. You're beside her at the booth when a guided tour passes — a prospective student group, a campus ambassador pointing out notable spaces. The guide stops, consults their clipboard, and says: "The dining hall is considered one of the best on campus. There's actually a student here who — " and then the guide looks up and sees her and goes briefly still. She lifts a hand from her meal. The prospective students look at ${Math.round(s.lbs)} pounds of her filling the corner booth, warm and enormous and fully at ease. The guide recovers. "— who is something of a campus institution," the guide finishes. She takes another bite.`,
    (s)=>`${Math.round(s.lbs)} pounds. Orientation week. She sits in the back of the first-year orientation session and watches — ${Math.round(s.lbs)} pounds, enormous in the lecture hall seat, her belly warm and vast, thighs filling the space between armrests. A returning student on the panel says: "The dining hall is great. There's a student, you'll hear about her." Several first-years look around. She doesn't raise her hand. After the session a first-year finds her outside and says: "Are you — " and she says: "Yes." The first-year looks at her for a long moment, at ${Math.round(s.lbs)} pounds of her, and says: "Can I sit with you sometime?" She says yes.`,
    (s)=>`${Math.round(s.lbs)} pounds. End of year. She sits in the booth — the one with the plaque — and eats for two hours while the dining hall empties around her. Students who know her come by: goodbye, see you next year, have a good summer. The kitchen staff comes out at closing to say goodbye. She shakes hands with the dining director, who holds on for an extra moment. She is ${Math.round(s.lbs)} pounds and she fills the booth completely, her thighs pressing the walls, her belly warm and vast against the table. She finishes what's on the last plate. She sits for a moment in the quiet dining hall. She looks at the nameplate. She touches it once. "I'll be bigger when I come back," she tells the director. "Make sure the booth still fits."`,
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
    (s)=>`She can't get to the fair herself — they bring the fair to her. The committee set up a satellite table in the largest event room available; you followed the signs down two hallways and found Mary Jane at approximately ${Math.round(s.lbs)} pounds filling the corner of it, the table edge pressing against the full warm circumference of her belly, her chest resting enormous and heavy on top of it, her jersey printed custom and wide enough to read as a banner. Darcy is here — 500 lbs herself now, seated to the right, not competing. The crowd standing at the edges of the room is quiet the way crowds go quiet when the person at the center of the spectacle is the spectacle entirely. The judges exchange a look. The horn sounds.`,
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
  // ── BOOKWORM path ───────────────────────────────────────────────
  community_researcher:[
    "Neat cardigan, fitted slacks, notebook always in hand. The unofficial uniform of 'academic observer.' Nothing about her appearance is an accident.",
    "The cardigans are baggier now — chosen with room in mind. The slacks have been replaced with dark jeans that accommodate more. She still carries the notebook.",
    "Button-down with the top two open, cardigan over it that she no longer buttons. Her figure is noticeably fuller under the layers. She's stopped arranging herself for the cardigans.",
    "Knit dress, looser fit, tights that hold everything together. Her glasses slide; she pushes them up without thinking. The notebook is in a bigger bag now, next to a thermos.",
    "Oversized pullover sweater, stretch trousers, comfortable shoes. She carries herself with the ease of someone who has found the outfit that works and has several of it.",
    "She moves slowly, deliberately, the way academics who have become their subject eventually move. A wide cardigan open over a soft dress, everything forgiving and full. The notebook is still there. It always will be.",
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
  food_researcher: { label:"Visit Her Lab",            apCost:1, gainRange:[3,6],  relBonus:10 },
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
  anonymous_blogger:{ label:"Read the Latest Post",    apCost:1, gainRange:[3,6],  relBonus:10 },
  asmr_creator:    { label:"Watch a Recording Session",apCost:1, gainRange:[3,6],  relBonus:12 },
  campus_legend:   { label:"Share a Meal at the Booth",apCost:1, gainRange:[5,10], relBonus:11 },
  food_tourist:    { label:"Join an Expedition",       apCost:1, gainRange:[4,8],  relBonus:10 },
  ff_author:       { label:"Read Her Latest Chapter",  apCost:1, gainRange:[3,6],  relBonus:12 },
  homeroom_queen:  { label:"🍪 Run a Baking Session",    apCost:1, gainRange:[4,9],  relBonus:11 },
  wife_lessons:    { label:"🏠 Hold Wife Lessons",        apCost:1, gainRange:[5,12], relBonus:11 },
  homestead_queen: { label:"🏡 Visit the Homestead",    apCost:1, gainRange:[5,10], relBonus:12 },
  state_fair_queen:{ label:"🎡 Enter the Fair",         apCost:1, gainRange:[4,8],  relBonus:10 },
  psych_researcher:{ label:"Continue Research Session", apCost:1, gainRange:[4,9],  relBonus:11 },
  cultivator:          { label:"🍰 Run Taste-Test Session", apCost:1, gainRange:[2,8],  relBonus:12 },
  community_researcher:{ label:"📋 Conduct Case Study",     apCost:1, gainRange:[3,8],  relBonus:10 },
  pharmacist:          { label:"🧪 Run Synthesis Session",  apCost:1, gainRange:[2,6],  relBonus:10 },
  machine_goddess:     { label:"🔧 Open The Lab",           apCost:1, gainRange:[2,6],  relBonus:10 },
};

export const EVOLVED_EVENTS = {
  sumo:[
    // stage 5 — ~258 lbs — Regional Qualifier
    {
      title:"Regional Qualifier",
      phases:[
        {
          text:(h,s)=>`The warm-up room behind the dohyo smells like liniment and chanko. You are the only one here who started as a cheerleader, and most of the other wrestlers have looked at you at least once with open curiosity. Dana "The Wall" Mercer hasn't. She's 340 pounds, six years on the circuit, and she's tying her mawashi like you aren't worth a second glance.

You are ${Math.round(s.lbs)} pounds and you intend to make her look. Before the match there's fuel, and there's footwork.`,
          choices:[
            {id:"load_hard",label:"Load up on chanko — weight is force",result:`You go to the chanko and eat — bowl after bowl, dense and warm, your belly filling and settling lower with every one. Weight is force in this sport and you are here to have more force. You feel yourself get heavier, rounder, more dangerous. Dana glances over once. Good.`,lbs:10,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Drill the footwork — plant, drive, low base",result:(s)=>`You drill instead — the plant, the drive, the low base — moving ${Math.round(s.lbs)} pounds through the forms until they're automatic, your belly swinging warm and heavy with each rep. You eat lighter, stay sharp, leave room. Technique today.`,lbs:5,rel:6,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`They call the weigh-in. You step onto the official scale and it settles at ${Math.round(s.lbs)} pounds and the official records it without expression. Dana's number is already up: 340. She's bigger than you today and the board says so.

She finally looks at you — a flick of the eyes, measuring. "Cheerleader," she says. Not a question. Not quite an insult either.`,
          choices:[
            {id:"own_it",label:'Hold her gaze. "For now."',result:`You hold her look and let your number stand on the board beside hers. "For now," you say. Her eyebrow moves a fraction. You step off.`,rel:6,flag:"confident"},
            {id:"stay_focused",label:"Say nothing. Get your head right.",result:`You step off without a word and walk back to your corner and put your whole mind on the dohyo. The number is the number. The match is where it gets decided.`,rel:4,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're fueled and you've looked the Wall in the eye, and the official is calling you both to the dohyo. Your belly is warm and heavy and forward under the mawashi.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:`The warm-up room empties toward the dohyo. Dana goes first; you follow. Your belly is full and your stance is ready.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
    // stage 6 — ~320 lbs — Circuit Tournament
    {
      title:"Circuit Tournament",
      phases:[
        {
          text:(h,s)=>`One full season in. The warm-up room knows your name now — a couple of the younger wrestlers nod when you come in. Dana Mercer is 370 today and she says "good luck out there" when she sees you, which from her is practically a parade.

You're ${Math.round(s.lbs)} pounds and you are no longer the novelty. Fuel, and footwork.`,
          choices:[
            {id:"load_hard",label:"Hit the chanko hard — pounds are power",result:`You hit the chanko hard, eating with the systematic focus of someone who's learned that pounds are power. Bowl after bowl, your belly filling warm and round and low. You stand up heavier and more dangerous than you sat down. Dana watches you eat. She doesn't.`,lbs:11,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Work the forms — drive, plant, low base",result:`You work the forms — drive, plant, the low base — moving 320 pounds with growing authority, your belly swinging heavy with each rep. You eat enough to stay strong and keep your edge. Sharp today.`,lbs:6,rel:7,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Weigh-in. The board has Dana at 370 up top. You step on: ${Math.round(s.lbs)} pounds. The gap that used to be eighty-plus pounds is ${Math.max(0,Math.round(370-s.lbs))} now, and Dana's eyes go to the board and do the math.

"Closing fast," she says. She's not wrong.`,
          choices:[
            {id:"own_it",label:'"Wait till spring."',result:`"Closing," you agree, holding her look. "Wait till spring." She huffs something that might be respect and turns back to her corner.`,rel:6,flag:"confident"},
            {id:"stay_focused",label:"Step off and lock in.",result:`You step off and get your head right. The numbers are getting closer every meet. Soon they won't matter — you'll just be bigger. Not yet. Soon.`,rel:5,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're loaded and you've told the Wall what's coming. She's still heavier today. She's still favored today. But you both feel the season turning.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:`The bracket is set and your bout is first. You walk to the dohyo with your belly full and your stance low.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
    // stage 7 — ~419 lbs — State Championship
    {
      title:"State Championship",
      phases:[
        {
          text:(h,s)=>`Conference-level meet, and for the first time the board is going to say you outweigh Dana Mercer. She knows it. She finds you in the warm-up room — 410 pounds, the woman who's been the wall everyone measured against — and says, plainly: "You're bigger than me now. First time. Go easy on an old veteran."

She's joking. Mostly. You're ${Math.round(s.lbs)} pounds. Fuel, and footwork.`,
          choices:[
            {id:"load_hard",label:"Eat like you mean it — widen the gap",result:`You eat like you mean it, widening the gap with every bowl — your belly filling enormous and warm and forward, each pound another pound Dana has to try to move. You stand up heavier than the Wall for the first time in your life. It feels like crossing a border.`,lbs:12,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Drill — let the technique catch up to the body",result:`You drill instead, moving your new size through the forms — and there's a lot of new size, your belly vast and heavy and swinging as you drive through the base work. You eat enough and stay sharp. Today you let the technique catch up to the body.`,lbs:7,rel:9,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Weigh-in, public now, a real crowd for it. Dana steps on: 410. You step on: ${Math.round(s.lbs)}. Your number goes up above hers and the room reacts — the first time the Wall isn't the top number in years.

Dana looks at the board, then at you, and nods slowly. "There it is," she says.`,
          choices:[
            {id:"own_it",label:'Hold her gaze. "There it is."',result:`You hold her gaze. "There it is," you echo. She almost smiles. "Make it count out there," she says, and means it.`,rel:8,flag:"confident"},
            {id:"stay_focused",label:"Step off and get to the center.",result:`You step off and lock in. Being the bigger number is new. Proving it on the dohyo is the part that matters. Get to the center.`,rel:5,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're the bigger woman now and you've owned it at the scale. Dana's waiting at the center, respectful, ready. Time to make the number mean something.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:`The crowd is loud and your name is on a few of their lips. You walk to the dohyo enormous and warm and ready.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
    // stage 8 — ~519 lbs — National Qualifier
    {
      title:"National Qualifier",
      phases:[
        {
          text:(h,s)=>`National qualifier. Press credentials at the door. You're ${Math.round(s.lbs)} pounds and you are the heaviest competitor here by a wide margin.

Dana Mercer — 460 now, the underdog in your rivalry for the first time — comes over before warm-ups. "I can't out-weigh you anymore," she says. "So I'm going to have to out-think you. Fair warning." She means it almost as a gift.`,
          choices:[
            {id:"load_hard",label:"Eat enormous — out of her reach",result:`You eat enormous, a full staging meal of chanko and rice and more, your belly filling vast and warm and low — every pound a pound further out of Dana's reach. You stand up heavier than anyone in the building by a margin that ends arguments.`,lbs:14,rel:4,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms — craft to match the mass",result:`You move through the forms — and there is so much of you to move now, your belly an enormous warm presence swinging through the base work, the floor reporting every drive. You eat smart and stay sharp and let the craft match the mass.`,lbs:8,rel:9,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Public weigh-in, big crowd for it. Dana: 460. You step on and the scale reads ${Math.round(s.lbs)} and the official reads it into the microphone and a sound goes through the room — that specific sound a crowd makes at a number it didn't quite believe.

Dana, already off the scale, watches your belly settle on the platform. "Out-think you," she repeats, quietly, to herself. "Right."`,
          choices:[
            {id:"own_it",label:"Let the number land. Let them look.",result:(s)=>`You let the number land and let them look — all ${Math.round(s.lbs)} pounds of you, warm and forward and enormous on the platform. You step off slow. Dana exhales.`,rel:9,flag:"confident"},
            {id:"acknowledge_crowd",label:"Find the crowd and let them see you.",result:`You find the crowd and let them see you fully. Someone starts a chant. Dana hears it become your name. "Out-think that," she mutters, and there's affection in it.`,rel:8,flag:"confident"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're the largest thing in the building by a margin with its own gravity, and the crowd knows your name. Dana's at the center, ready to try the impossible.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:(h,s)=>`The qualifier crowd settles into the seats. You walk to the dohyo carrying ${Math.round(s.lbs)} pounds like the asset it is.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
    // stage 9 — ~630 lbs — National Circuit Finals
    {
      title:"National Circuit Finals",
      phases:[
        {
          text:(h,s)=>`The national final. The arena. You're ${Math.round(s.lbs)} pounds and the credential says COMPETITOR and the door staff widened the door without being asked.

Dana Mercer finds you in the warm-up room one last time. 520 pounds, second-ranked in the country, the wall you climbed over two years ago. "I'm not here to beat you," she says, honest. "Nobody beats you now. I'm here to feel what it's like to lose to the biggest there's ever been. Give me a real one."`,
          choices:[
            {id:"load_hard",label:"Eat seriously — ballast for your stance",result:`You eat the way two years of this has taught you — seriously, enormously, bowl after bowl of chanko until your belly is past full and settled into your stance like ballast. You stand up the heaviest human being in the building by a margin that has its own gravity. Dana watches you grow. She wanted a real one. She's going to get it.`,lbs:16,rel:5,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms one last time",result:`You move through the forms one last time before the biggest match of your life — 630 pounds flowing through the base work, your belly vast and warm and swinging, the dohyo itself seeming to lean toward you. You eat enough and stay sharp. Tonight the body and the craft are the same thing.`,lbs:9,rel:10,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`The national-final weigh-in is its own broadcast segment. Dana steps on: 520. The arena cheers a legend. Then you step on, and the official pauses one full second before he reads it into the national feed — ${Math.round(s.lbs)} pounds — and the arena does not cheer right away.

There's a breath first. The breath a room takes before something it's never seen. Then it comes apart. Dana is already clapping.`,
          choices:[
            {id:"own_it",label:"Turn into the noise. Let them see all of you.",result:(s)=>`You turn into the noise and let the whole arena see all of you — ${Math.round(s.lbs)} pounds of national finalist, belly forward and warm and enormous in the lights. Two years. Worth every one.`,rel:10,flag:"confident"},
            {id:"stay_focused",label:"Step off. One hand on your belly. Ready.",result:`You step off and walk to the dohyo and put one hand flat on your belly for a second — the weight, the warmth, the proof of it — then you let it go and you're ready. The biggest match of your life is one step away.`,rel:6,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The arena is a wall of sound and your number is on the national board and Dana is still clapping. You step to the center of the dohyo, the largest competitor the sport has ever certified.

The national final is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:`National final. The center of the dohyo. The crowd is already roaring. Dana sets her feet across from you, one last time.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
    // stage 10 — ~820 lbs — Grand Invitational Exhibition (blob)
    {
      title:"Grand Invitational Exhibition",
      phases:[
        {
          text:(h,s)=>`The Grand Invitational is a different kind of event. It is not a tournament. It is an exhibition built around you. Your name is on the banner outside the venue. The door staff widened both loading doors. You are ${Math.round(s.lbs)} pounds and the warm-up room contains you and everything else is arranged around that fact.

Keiko Watanabe is here — 560 pounds, the second largest competitor the Invitational has ever registered, brought in specifically to be a credible match. She is standing across the warm-up area looking at you with the focused expression of someone who has been told exactly what they are walking into and has chosen to walk into it anyway. That is respect. You will repay it on the dohyo.

There is a feast staged in your corner. The chanko is deep and warm and the bowls are the large format. This is the warm-up.`,
          choices:[
            {id:"load_hard",label:"Fill your belly completely — weight is the weapon",result:(s)=>`You eat until your belly is past full and settling into your stance with the specific ballast gravity of a very large body that has eaten very seriously. Your belly presses your mawashi forward and settles between your thighs enormous and warm and forward. Keiko watches you eat. You are ${Math.round(s.lbs)} pounds and you just got heavier. This is the whole strategy.`,lbs:18,rel:5,flag:"loaded"},
            {id:"warm_up",label:"Move through the forms — plant, root, presence",result:(s)=>`You move. ${Math.round(s.lbs)} pounds moving through sumo forms is not a quiet thing — the floor accepts each rep with the considered patience of something that has no choice, your belly swinging vast and warm with each shift, the whole volume of you precise and focused. You eat enough to fuel this and leave room for the corner. Ready.`,lbs:10,rel:10,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`The Invitational weigh-in is broadcast. The venue's PA system reads each competitor's weight as they step off. Keiko steps on. 560 pounds. The crowd gives it proper appreciation — she is enormous, she is real, she is here.

Then you step on. The scale settles. The PA reads it: ${Math.round(s.lbs)} pounds.

The crowd has a moment. Not silence — the kind of held breath that is the physical sensation of a room recalibrating. Then it breaks entirely. Keiko looks at the board. She looks at you. She nods once, formal, the bow of a competitor who knows what she's about to face and respects the fact of it.`,
          choices:[
            {id:"own_it",label:"Turn to face the room fully. All of you.",result:(s)=>`You turn to face the arena and let them see all of you — ${Math.round(s.lbs)} pounds, belly enormous and warm and forward in the Invitational lights, filling more of the stage than the stage was designed for. This is what they came to see. You give it to them completely.`,rel:10,flag:"confident"},
            {id:"stay_focused",label:"Step off. One hand on your belly. Eyes on the dohyo.",result:`You step off and walk toward the dohyo and put one hand flat on your belly — the full warm forward weight of it, enormous under your palm — and you feel what you are right now and what you're about to use it for, and you are ready.`,rel:6,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The Invitational arena is very loud and your name is on the banner and Keiko is already on the dohyo, waiting. You are the largest competitor this exhibition has ever seen.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
        {condition:()=>true,text:`The Grand Invitational. The dohyo. The crowd has been waiting for this since the doors opened. Keiko sets her stance across the center line, focused and ready.

The match is about to begin.`,gainBonus:0,relBonus:0,startsMatch:true},
      ]
    },
  ],

  eating_captain:[
    // stage 5 — ~258 lbs — First Entry
    {
      title:"Regional Open — First Entry",
      phases:[
        {
          text:(h,s)=>`The warmup room smells like cooking and the specific anxiety of people who are about to compete in public. You are the only cheerleader here. Most of the other competitors are 150 to 200 lbs and they are looking at you the way people look at something they didn't expect to see in a place they thought they knew. Maya from Lakewood is 330 lbs and she isn't looking at you at all. She has been doing this for two years and she does not feel threatened.

Your belly is ${Math.round(s.lbs)} pounds of warm, ready body and it wants to work. There's food on the catering table. This is the warmup. This is where you load up.`,
          choices:[
            {id:"load_hard",label:"Load aggressively — eat everything on the table",result:`You eat everything. All of it. Your belly goes from full to very full to the specific warm heaviness of a body that is ready to work. The girl from State is watching you with an expression that is not entirely polite. Maya still hasn't looked over.`,lbs:10,rel:4,flag:"loaded"},
            {id:"eat_smart",label:"Eat with discipline — full enough to compete, room to grow",result:`You eat with the focus of someone who has been thinking about this. Measured, controlled, your belly filling to the point you want. You stop. You breathe. You feel ready and you've left room to expand into when the competition table is in front of you.`,lbs:6,rel:5,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`They call your name for the weigh-in. You step to the scale at the front of the staging area. The other competitors' numbers are already on the board — the highest is 218. Maya is 330. You step on.

The scale settles at ${Math.round(s.lbs)} pounds. The judge reads it. He reads it again.

The girl from State — 178 lbs, two years in the circuit — says to the person next to her: "Is that right?" She genuinely wants to know. Maya looks over from her warmup table for the first time.`,
          choices:[
            {id:"own_it",label:"Hold still. Let the number stand.",result:`You don't move. The number stands. The judge marks it and you step off without hurrying and go back to your station without looking at anyone. The whole room is looking at you. That's fine.`,rel:6,flag:"confident"},
            {id:"read_maya",label:"Step off and look at Maya.",result:`You step off the scale and find Maya's eyes. She's 330 lbs and she's been doing this for two years and she just looked up for the first time. You hold eye contact for one second. Then you go back to your station.`,rel:5,flag:"confident"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're loaded up and you've held the room. The judge is calling competitors to their lanes. Your belly is warm and heavy and ready.

The horn is about to fire.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`The backstage is settling. The other competitors are moving to their lanes. Your belly is warm and full.

The horn is about to fire.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
    // stage 6 — ~320 lbs
    {
      title:"Circuit Regular",
      phases:[
        {
          text:(h,s)=>`Six months into the circuit and people know your name. A woman from Central — 195 lbs, here for her third competition — says "you're the cheerleader captain, right?" before you've even gotten to the catering table. "I've heard about you," she says. She seems nervous about this.

Maya from Lakewood is 370 lbs now and she says hello when she sees you. Not warmly, but she says it. You are ${Math.round(s.lbs)} pounds and you are no longer a novelty. You are a known quantity on this circuit. Act like it.`,
          choices:[
            {id:"load_hard",label:"Eat everything — load up like you mean it",result:`You eat through the catering table with the focused efficiency of someone who has been doing this for months. Your belly goes warm and heavy and full and you breathe around it and you feel, specifically, ready. Maya watches you for a moment. Then she goes back to her own warmup.`,lbs:11,rel:4,flag:"loaded"},
            {id:"eat_smart",label:"Eat smart — then say something back to the Central woman",result:`You eat your warmup with discipline and then turn to the Central woman and say: "Good luck today. You'll need it." She laughs, surprised. It's not unfriendly. You go back to eating.`,lbs:7,rel:7,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`They call you to the scale. The board has Maya's number at the top: 370 pounds.

The scale settles. ${Math.round(s.lbs)} pounds. The judge marks it without expression. He writes it next to your name on the board — below Maya's, but not by much. A few months ago that gap was 72 pounds. Now it's ${Math.max(0,Math.round(370-s.lbs))} pounds.

The Central woman sees the numbers side by side and does some math. Her expression changes.`,
          choices:[
            {id:"own_it",label:"Hold still. Watch Maya's face.",result:`You stand at the edge of the staging area and you watch Maya look at the board. She's been the top number for two years. She's looking at the gap between her number and yours. It's getting smaller. She knows it's getting smaller.`,rel:6,flag:"confident"},
            {id:"stay_focused",label:"Don't look at anyone. Get back in your head.",result:`You step off the scale and go back to your station and you eat something small and you think about what's in front of you. The numbers on the board don't matter until the horn goes. Focus.`,rel:4,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`You're loaded and you've looked Maya in the eye and you know where this is going. Maya is still bigger. Maya is still going to win today. But you know where this is going.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`The staging area is settling. You're at your lane. Your belly is warm and full.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"Conference Championship",
      phases:[
        {
          text:(h,s)=>`Conference championship. You are ${Math.round(s.lbs)} pounds and you are the person people came to see. The other competitors know who you are and some of them avoid making eye contact when you come through the warmup room. Three of them have positioned themselves so they're not facing you directly.

Maya is 410 lbs now. She's the only one in this room who looks at you directly. "Good luck," she says, and she means it in the way that people who are about to lose still mean it. You respect that.`,
          choices:[
            {id:"load_hard",label:"Load aggressively — this is the conference, go for everything",result:(s)=>`You eat until the room feels different than when you walked in. Your belly is enormous and warm and pressing your waistband and you breathe around it and feel, specifically, the weight of yourself — ${Math.round(s.lbs)} lbs of warm ready body — and you feel ready for more.`,lbs:12,rel:4,flag:"loaded"},
            {id:"eat_smart_and_talk",label:"Eat with discipline — then say something to Maya",result:`You eat your warmup clean and then turn to Maya. "How's Lakewood doing this season?" She tells you. You talk for a few minutes, two large women eating in a warmup room before a conference championship, and it's unexpectedly good. "You're going to win today," she says. "I know," you say.`,lbs:7,rel:9,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`The weigh-in is public at conference level. The board shows Maya's number: 410 lbs. You step on the scale.

The head judge reads the display: ${Math.round(s.lbs)} pounds. He does it twice.

He reads it into the microphone. The room — competitors, officials, the small crowd that comes to conference weigh-ins — hears the number. Maya, standing at the board with a marker, stops writing mid-number. She puts the cap back on the marker. You are ${Math.max(0,Math.round(s.lbs-410))} lbs heavier than the previous top number.`,
          choices:[
            {id:"make_eye_contact",label:"Step off the scale and make eye contact with Maya.",result:`You find her. She is looking at the board. She looks back at you. "I knew it was coming," she says, quietly. "I knew it was coming." She finishes writing your number. It goes at the top.`,rel:8,flag:"confident"},
            {id:"stay_in_head",label:"Step off. Don't look at anyone. Get to the table.",result:`You step off the scale and go back to your station without looking at the board or at Maya or at any of the other competitors who are now doing the math. You know what the number was. That's enough. Time to prove it.`,rel:5,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The board shows your number at the top. Maya's number is second. The other competitors aren't in the conversation.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`The staging area is settled. Competitors are at their lanes. You are at your lane, ${Math.round(4)>3?"enormous":"large"} and warm and full and ready.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"National Qualifier",
      phases:[
        {
          text:(h,s)=>`The qualifier is national circuit and there are press credentials at the door. A journalist from a competitive eating publication finds you in the warmup room and asks for a comment. Maya — 450 lbs, your closest competitor on the circuit — comes over and says: "Give them something good." Then to you: "You're the best I've ever seen. I need you to know I know that." She says it plainly. She says it looking you in the eye. Then she goes to her warmup.

You are ${Math.round(s.lbs)} lbs and this is the biggest stage you've competed on. The catering table is very well stocked.`,
          choices:[
            {id:"load_hard",label:"Ignore the journalist — load up hard, focus on the food",result:`You turn back to the catering table without a comment and you eat with the focused intensity of someone who is here to do one thing. The journalist writes something in their notepad. You eat. Your belly goes enormous and warm and heavy and you breathe around the fullness and feel ready.`,lbs:14,rel:4,flag:"loaded"},
            {id:"give_statement",label:"Give the journalist a statement, then eat smart",result:`You turn to the journalist and say: "I'm here to clear the table. That's the statement." The journalist writes it. You turn back to the food and eat your warmup with discipline and efficiency. You're ready. You've left room.`,lbs:8,rel:9,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`National qualifier weigh-in. The crowd that gathers for it is larger than regional weigh-ins — people come specifically for this part. They come to see the numbers.

You step on. The scale reads ${Math.round(s.lbs)} pounds.

The head judge reads it into the national feed microphone. The crowd in the staging area makes a sound — not cheering exactly, more like the sound of a room full of people all having the same thought at the same time. Maya, already off the scale at 450, is watching. A woman from the crowd says, clearly: "Oh my god."`,
          choices:[
            {id:"take_it_in",label:"Stand still and let the moment be what it is.",result:`You stand on the scale while the crowd processes the number. Your belly is warm and heavy and forward and visible to everyone in the room and you let them look. The judge marks it. You step off slowly.`,rel:8,flag:"confident"},
            {id:"acknowledge_crowd",label:"Look at the crowd when you step off.",result:(s)=>`You step off the scale and you look at the crowd. There are people there who came specifically for this moment. You let them see you — all ${Math.round(s.lbs)} lbs of you, warm and present and enormous. Someone starts clapping. Others follow.`,rel:10,flag:"confident"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The national qualifier is calling competitors to their lanes. Maya gives you a nod from across the staging area. You're loaded and you've had your moment and the table is waiting.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`National qualifier. The table is set. The crowd that gathered for the weigh-in is moving to the viewing area. Your belly is warm and full and you are the number everyone is looking at on the board.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"National Championship Final",
      phases:[
        {
          text:(h,s)=>`The national championship. The arena. You are ${Math.round(s.lbs)} lbs and there is a credential around your neck that says COMPETITOR and the woman at the door held the door open wider when you came through without being asked.

Maya finds you in the warmup room. 490 lbs, the second-ranked competitor in the country, the woman who has been chasing you for two years. She says: "I've been competing since I was nineteen. I've never seen anything like you." She pauses. "I want you to know that before we go out there." Then she goes to her side of the warmup room.

The defending champion from the prior year — 420 lbs, four national titles — is in the corner. She hasn't said anything. She's eating her warmup and watching you.`,
          choices:[
            {id:"load_hard",label:"Eat everything — load up with complete focus. This is what you trained for.",result:`You eat. All of it. Methodically, focused, your belly going from full to very full to the specific warm heaviness of someone who has done this for two years and knows exactly what their body is capable of. You eat past the point of comfort and you breathe around it and you feel ready. Completely ready. This is what you came here to do.`,lbs:16,rel:5,flag:"loaded"},
            {id:"eat_smart_acknowledge",label:"Eat smart — and then say something to Maya.",result:`You eat your warmup clean and then walk over to Maya. "Two years," you say. She nods. "Thank you," you say. She knows what for. You go back to your station. Your belly is warm and full and ready and you've left room.`,lbs:9,rel:10,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`The national championship weigh-in is an event unto itself. There is a crowd. There are cameras. The weigh-in has its own segment in the national broadcast.

You step on the scale. The arena goes quiet.

The head judge reads the display. He pauses for exactly one second before he reads it into the national microphone. *${Math.round(s.lbs)} pounds.*

The arena does not cheer first. There is a moment of silence — the specific silence of something large enough to require a breath before a response — and then the crowd comes up all at once. The four-time champion in the corner has stopped eating. She is looking at the number. Maya is already clapping.`,
          choices:[
            {id:"face_the_crowd",label:"Turn and face the crowd.",result:(s)=>`You turn. You are ${Math.round(s.lbs)} pounds of national championship competitor and the crowd is making the sound it makes when it sees something it has never seen before and you stand in it. Your belly is warm and forward and enormous and visible to everyone in the arena and you let them see it. This took two years. It was worth two years.`,rel:10,flag:"confident"},
            {id:"stay_in_your_head",label:"Don't acknowledge the crowd. Get to the table.",result:`You step off the scale and walk to your lane. Your belly is warm and enormous and pressing your competition top and you put one hand flat on it for one second — feeling the weight of yourself, the warmth of yourself — and then you drop your hand and you look at the table and you are ready.`,rel:6,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The arena is loud and your number is on the national board and Maya is still clapping across the staging area. You are at your lane. The table is full.

The national championship horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`National championship. Your lane. The table. ${Math.round(4)>2?"The crowd is already making noise.":""}

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
    // stage 10 — ~820 lbs — Grand Invitational (blob)
    {
      title:"Grand Invitational",
      phases:[
        {
          text:(h,s)=>`The Grand Invitational is not a normal competition. It is an invite-only showcase event and you are the reason it exists. The venue's promotional image for this event is a silhouette. Your silhouette. They did not need to specify whose.

You are ${Math.round(s.lbs)} pounds and the warmup room has been extended with an anteroom to accommodate you. Maya from Lakewood is here — 530 lbs, five years on the circuit, the only other competitor with a name recognition anywhere near yours. She comes to find you when you arrive, which she has never done before. "I've watched every one of your competitions," she says. "I wanted to say that before today." She says it with the clean directness of someone who has given up competing with you and arrived at something else instead. You are moved. You are also here to eat.

The Invitational catering table is the full format. Everything available. This is the load-up.`,
          choices:[
            {id:"load_hard",label:"Eat everything — fill completely, every available item",result:(s)=>`You eat through the catering table with the total focus of someone who knows what their body is capable of and intends to use every inch of it. Your belly goes from enormous to vastly enormous, warm and heavy and past full and settled low between your thighs, pressing your competition top up past your navel, and you are loaded. You are ${Math.round(s.lbs)} pounds plus all of this. You are ready.`,lbs:18,rel:5,flag:"loaded"},
            {id:"eat_smart",label:"Eat to capacity — precise, controlled, leave space for the table",result:`You eat with the focused precision of someone who has done this for years and knows exactly where the ceiling is. Your belly fills warm and full and forward, the specific controlled fullness of a professional who has not lost their technique at any weight. You stop. You breathe. There is room left. For the table.`,lbs:10,rel:8,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`The Grand Invitational weigh-in is the event before the event. The venue streams it separately.

Maya steps on: 530 pounds. The crowd gives it the standing ovation it deserves — she is enormous and remarkable and five years of circuit work have made her what she is. She looks at you while she steps off.

You step on. The official scale at the Grand Invitational has been recalibrated for this event. The number settles: ${Math.round(s.lbs)} pounds.

The streaming audience's comments appear on a sidebar screen visible from the stage. You can see the rate at which they're arriving. It's very fast.

Maya looks at the board. Then at you. "Every time," she says quietly. "Every year it's more." She is not complaining. She is witnessing.`,
          choices:[
            {id:"own_it",label:"Face the stream camera directly. Let the whole number land.",result:(s)=>`You find the camera and you face it and you let it see all of you — ${Math.round(s.lbs)} pounds of Grand Invitational competitor, belly enormous and warm and forward in the lights, filling the stage in a way that the camera has to pull back slightly to accommodate. The comments on the sidebar move faster. Good.`,rel:12,flag:"confident"},
            {id:"look_at_maya",label:'Look at Maya. Say: "You came back."',result:`You find Maya's eyes. She looks back. "I came back," she says, before you can. "I'll always come back." You both know what that means: that this is something beyond competition now, something she comes back to because she needs to be near it. You step off the scale. The table is waiting.`,rel:8,flag:"confident"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`The Grand Invitational. Your lane. The table — every item, both sides, the full Invitational format. The streaming audience is already enormous.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
        {condition:()=>true,text:`Your lane. The Grand Invitational table. Maya is at hers, watching you with the focused warmth of someone who knows what is about to happen and came specifically to see it.

The horn fires.`,gainBonus:0,relBonus:0,startsContest:true},
      ]
    },
  ],

  eating_streamer:[
    // stageIdx 0 — ~258 lbs — First Real Mukbang
    {
      title:"First Real Mukbang",
      phases:[
        {
          text:(h,s)=>`The ring light is on. The overlay is set. The delivery bags are stacked off-camera and your stomach is already making small anticipatory noises because you ate a little while setting up and you're not embarrassed about that anymore.

You're ${Math.round(s.lbs)} pounds and thirty-two people are watching. That's more than you've ever had for a gaming stream. The chat is already asking what's in the bags.

"Sponsor said don't go easy," you read off your phone. "Chat said go harder. I'm listening to both of you. Don't say I didn't warn you."`,
          choices:[
            {id:"hype_chat",label:"Hype chat up — promise them a real challenge",result:`You lean into the mic and tell them tonight isn't a warm-up. Real food, real timer, real consequences. The viewer count ticks up before you've finished the sentence. Someone donates five dollars with the message *finally*.`,rel:8,flag:"hyped"},
            {id:"load_pre",label:"Eat a little on camera before the challenge starts",result:`You open the first bag on stream and eat slow enough that chat can see you're already serious. Sauce on your fingers. A soft sound you don't edit out. "Pre-loading," you say. "For research." The viewer count doubles.`,lbs:5,rel:6,flag:"preloaded"},
          ]
        },
        {
          text:(h,s)=>`Challenge mode is armed. The focus bar minigame is live on your second monitor — green zone, moving indicator, the whole stupid beautiful thing. Chat spam is moving too fast to read.

You're ${Math.round(s.lbs)} pounds, mic hot, sponsor logo on your sleeve. This is the format. This is what they came for.`,
          choices:[
            {id:"own_nerves",label:"Admit the nerves — good nervous, let's eat",result:`You say it plain. Chat loses their minds in the supportive way. Someone clips it before the round even starts.`,rel:7,flag:"confident"},
            {id:"play_cool",label:"Play it cool — act like you've done this forever",result:`You adjust the camera with practiced casualness. "We do this every week now," you lie. Chat believes you. That's power.`,rel:5,flag:"cool"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("preloaded")&&h.includes("hyped"),text:`First real mukbang. Pre-loaded, hyped, chat climbing. The focus bar is waiting and so are four hundred people by the time you hit go-live on the challenge.

Time to perform.`,gainBonus:4,relBonus:6,startsStream:true},
        {condition:h=>h.includes("confident"),text:`You admitted the nerves and chat loved you for it. Viewer count is climbing. The challenge UI is armed.

Go live.`,gainBonus:2,relBonus:8,startsStream:true},
        {condition:()=>true,text:`First mukbang format stream. Chat's ready. Bags are ready. You are… ready enough.

The challenge starts now.`,gainBonus:0,relBonus:5,startsStream:true},
      ]
    },
    // stageIdx 1 — ~320 lbs — Sponsor Pressure
    {
      title:"Sponsor Pressure",
      phases:[
        {
          text:(h,s)=>`Your brand rep texted before stream: *push the new extreme menu tonight.* You're ${Math.round(s.lbs)} pounds and the logo on your chest is stretched tighter than last month. The chat knows what sponsor you signed with. They have opinions.

"Contract says perform," you mutter to the empty room. Then you smile for the camera anyway.`,
          choices:[
            {id:"lean_brand",label:"Lean into the sponsor angle on camera",result:`You do a full brand callout — logo, catchphrase, the works. Chat roasts you and also tips. The rep is going to love this VOD.`,rel:6,flag:"brand_push"},
            {id:"push_back",label:"Tease chat — make them beg before you obey",result:`You make them spam before you'll touch the sponsor crate. It takes forty seconds. They do it. You knew they would.`,rel:8,flag:"tease"},
          ]
        },
        {
          text:(h,s)=>`The extreme menu is in frame. It's obscene. You're ${Math.round(s.lbs)} pounds and your belly already has that soft forward settle from pre-stream snacking.

Chat is chanting. The focus bar is loaded. Sponsor is watching.`,
          choices:[
            {id:"accept_hype",label:'"Let\'s ruin my stomach on brand time."',result:`You say it like a threat. Chat treats it like a promise. Donations spike.`,rel:7,flag:"feral"},
            {id:"stay_cute",label:'Play cute — "I\'m too full already~"',result:`Brat voice. Batted lashes. Chat melts and also bullies you into starting anyway. Perfect.`,rel:9,flag:"brat"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("brand_push")&&h.includes("feral"),text:`Sponsor happy. Chat feral. You're about to do something extreme on the focus bar while four digits of people watch.

Stream challenge — go.`,gainBonus:6,relBonus:8,startsStream:true},
        {condition:h=>h.includes("tease"),text:`You made them work for it and they're still here. Extreme menu. Live challenge. Let's eat.`,gainBonus:3,relBonus:10,startsStream:true},
        {condition:()=>true,text:`Sponsor pressure accepted. Challenge armed. Time to eat on camera like it pays rent.`,gainBonus:0,relBonus:6,startsStream:true},
      ]
    },
    // stageIdx 2 — ~419 lbs — Trending Night
    {
      title:"Trending Night",
      phases:[
        {
          text:(h,s)=>`You're trending. Not metaphorically — the little trending tag is actually on your category page and your phone will not stop buzzing. ${Math.round(s.lbs)} pounds, three thousand viewers before you've eaten anything, and newcomers keep asking how long you've been doing this.

"Long enough," you tell chat. "You're late. Catch up."`,
          choices:[
            {id:"welcome_wave",label:"Welcome the new viewers — show them the format",result:`You explain the focus bar, the rounds, the stakes. New chat spam is half horny half confused. Both are good for metrics.`,rel:7,flag:"welcoming"},
            {id:"ignore_hype",label:"Ignore the hype — act like this is normal",result:`You act like trending is your baseline. Confidence reads as fame. More people stay.`,rel:5,flag:"unbothered"},
          ]
        },
        {
          text:(h,s)=>`The mods are working overtime. You're ${Math.round(s.lbs)} pounds and your chair creaks when you shift to reach the food. Someone in chat says you're their whole personality now.

You can't tell if that's a compliment. You eat anyway.`,
          choices:[
            {id:"clip_bait",label:"Set up a clip-worthy moment before the challenge",result:`You pose, pat your belly, promise chat a round they'll remember. They're already clipping and you haven't started.`,rel:8,flag:"clip_bait"},
            {id:"speed_run",label:'"No preamble — challenge starts now."',result:`You skip the bit and slam into challenge mode. Chat respects the aggression. Viewer count jumps again.`,rel:6,flag:"speed_run"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("welcoming")&&h.includes("clip_bait"),text:`Trending, welcoming, clip-ready. Three thousand viewers and climbing. The focus bar challenge is about to give them a reason to stay.

Go live.`,gainBonus:8,relBonus:10,startsStream:true},
        {condition:h=>h.includes("speed_run"),text:`No preamble. Pure challenge. Trending tag still glowing. Eat.`,gainBonus:5,relBonus:7,startsStream:true},
        {condition:()=>true,text:`Trending night. Big audience. Bigger appetite. Challenge mode — now.`,gainBonus:0,relBonus:8,startsStream:true},
      ]
    },
    // stageIdx 3 — ~519 lbs — Sold-Out Energy
    {
      title:"Sold-Out Energy",
      phases:[
        {
          text:(h,s)=>`You don't pick challenges anymore — the brand sends a list and you pick from theirs. You're ${Math.round(s.lbs)} pounds, streak in the double digits, chat calls you sold out like it's a compliment. It kind of is.

"Sponsor wants a massacre," you read. "Chat wants a massacre. I want a snack first. Nobody asked me." You eat the snack anyway. On camera. Obviously.`,
          choices:[
            {id:"embrace_sold_out",label:'Own the sold-out thing — "yeah they own me"',result:`You say it laughing. Chat spam is unhinged. Brand rep sends a heart emoji. You're too far gone to pretend otherwise.`,rel:6,flag:"sold_out"},
            {id:"defiant_tease",label:"Pretend you still have choices — pick from their list dramatically",result:`You read the sponsor options like a game show host. Chat votes. You "choose" the most extreme one like you had free will. Everyone wins.`,rel:9,flag:"defiant"},
          ]
        },
        {
          text:(h,s)=>`The challenge loadout is brutal. You're ${Math.round(s.lbs)} pounds and your belly rests on your thighs when you sit forward. The focus bar looks smaller than it used to — or you're just worse at it now. Chat would love either explanation.

"Round one starts when I stop talking," you say. You don't stop talking for another minute. Then you start.`,
          choices:[
            {id:"trash_talk",label:"Trash-talk chat before round one",result:`You roast your own stamina, your own size, chat's parasocial bullshit. They eat it up. Literally and figuratively.`,rel:7,flag:"trash_talk"},
            {id:"silent_start",label:"Go quiet — let the food do the talking",result:`You stop performing for ten seconds. Just you and the food and the bar. It's unnerving. Viewers hold.`,rel:5,flag:"silent"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("sold_out")&&h.includes("trash_talk"),text:`Sold out, mouthy, and about to run a branded massacre on the focus bar. Ten thousand people would watch you fail. More would watch you succeed.

Challenge live.`,gainBonus:10,relBonus:9,startsStream:true},
        {condition:h=>h.includes("defiant"),text:`You performed free will for chat. Sponsor's challenge is loaded. Time to eat like a corporate mascot.`,gainBonus:6,relBonus:11,startsStream:true},
        {condition:()=>true,text:`Sold-out streamer energy. Brutal challenge. Focus bar armed. Go.`,gainBonus:0,relBonus:7,startsStream:true},
      ]
    },
    // stageIdx 4 — ~650+ lbs — Icon Stream
    {
      title:"Icon Stream",
      phases:[
        {
          text:(h,s)=>`Platform email: *featured slot tonight.* You're ${Math.round(s.lbs)} pounds and the thumbnail is just your belly and a controller and you didn't even have to pose. The algorithm knows what you are.

Chat is already at five figures. New people keep asking if this is real. Old people keep saying they've watched you grow since the beginning. Both are true.`,
          choices:[
            {id:"legend_mode",label:'"This is what an icon eats." — main-character energy',result:`You say it without blinking. Clip farms activate. Someone writes a thinkpiece in real time. You don't care.`,rel:8,flag:"legend"},
            {id:"grateful_real",label:"Get genuinely soft with chat for a minute",result:`You thank them — really mean it — for watching you become this. Chat cries and tips at the same time.`,rel:12,flag:"grateful"},
          ]
        },
        {
          text:(h,s)=>`Featured stream. ${Math.round(s.lbs)} pounds. The biggest challenge loadout you've ever run on the focus bar — more rounds, more food, more ways to fail in front of everyone.

You adjust the camera one last time. Your belly fills half the frame. "Don't look away," you tell chat. "You started this."`,
          choices:[
            {id:"max_challenge",label:"Run the longest, hardest challenge they'll give you",result:`You queue the nightmare mode. Chat panics appreciatively. The brand sends a fire emoji.`,rel:7,flag:"max_challenge"},
            {id:"crowd_pick",label:"Let chat pick between two brutal options",result:`Poll goes up. Both options are absurd. The winner is worse. Perfect.`,rel:10,flag:"crowd_pick"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("legend")&&h.includes("max_challenge"),text:`Icon stream. Legend energy. Nightmare challenge loaded. The focus bar has never mattered more.

Go live — make it historic.`,gainBonus:14,relBonus:12,startsStream:true},
        {condition:h=>h.includes("grateful")&&h.includes("crowd_pick"),text:`Soft with chat, brutal with yourself. They picked the worse challenge. You accept their judgment.

Stream starts now.`,gainBonus:10,relBonus:15,startsStream:true},
        {condition:()=>true,text:`Featured. Enormous. Ready. The challenge is waiting and so is everyone.

Eat.`,gainBonus:0,relBonus:10,startsStream:true},
      ]
    },
  ],

  feedee_creator:[
    // stageIdx 0 — ~258 lbs — first collab
    {
      title:"First Collab",
      phases:[
        {
          text:(h,s,partner)=>`The setup is done. The ring light is on. The table has two spreads — yours and ${partner?partner.name+"'s":'your partner\'s'} — and the subscriber count reads thirty-seven, which is where you were last week when you were streaming alone. ${partner?partner.name:'She'} is sitting across from you, ${partner?Math.round(partner.lbs)+' pounds,':''} nervous in the specific way someone is nervous when they've agreed to something they're excited about.

"I've never done this before," ${partner?partner.name:'she'} says. You tell her neither have you. You're both lying in different ways — you've been planning this for two weeks and she's been waiting for you to ask.`,
          choices:[
            {id:"warmup_both",label:"Eat something before going live — both of you",result:`You both eat before the camera goes on. A warmup plate each, the food warm and settling, and by the time you press record you're both already somewhat full and the bell in your belly is already ringing. She looks at you across the table. "Ready," she says. She means it.`,lbs:6,rel:8,flag:"both_loaded"},
            {id:"talk_dynamic",label:"Talk through the dynamic — what the feeding looks like on camera",result:`You spend ten minutes talking about how this looks. What you want the audience to see. That you're going to be feeding each other. That it's going to be real — not performed, actual food, actual gain. She nods through all of it and when you're done she says: "I want to feed you more than you feed me." You tell her that's exactly the tension the stream needs.`,rel:10,flag:"established_dynamic"},
          ]
        },
        {
          text:(h,s,partner)=>`You're live. Forty viewers become sixty in the first ten minutes, and by the time you've done the introductions the chat has started asking questions — what's her name, how much does she weigh, are you going to feed each other. The answer to all three is: yes, that's the point, that's what this is.

${partner?partner.name:'She'} says her weight on camera — ${partner?Math.round(partner.lbs)+' pounds':'her weight'}, clearly, into the mic. The chat reacts. Someone new arrives. *wrenWatchesEverything: I found this by complete accident. I'm not leaving.*`,
          choices:[
            {id:"feed_her_first",label:"Feed her first — put something on her side of the table",result:`You pass the first course across the table. She takes it. She begins eating — not performing eating, actually eating — and the camera catches the specific warmth of someone being fed by someone who means it. The chat is paying attention to exactly the right things.`,rel:9,flag:"fed_first"},
            {id:"both_go",label:"Start simultaneously — both eating on camera together",result:`You both reach for the first course at the same time and the stream immediately becomes what it was always going to be: two women eating together, visibly, genuinely, the camera seeing all of it. The chat count climbs. This is the format.`,rel:8,flag:"simultaneous_start"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("established_dynamic")&&h.includes("fed_first"),text:`First collab. You both ate before the camera and talked through the dynamic and you fed her first on-stream and the chat found something true in it. The subscriber count by stream end: 147. Wren subscribed. The format is established.`,gainBonus:10,relBonus:14,startsStream:true},
        {condition:h=>h.includes("both_loaded")&&h.includes("fed_first"),text:`First collab. You both ate pre-stream and you fed her first on camera. The chat grew. Wren subscribed. The format works.`,gainBonus:7,relBonus:10,startsStream:true},
        {condition:h=>h.includes("established_dynamic"),text:`First collab. You talked through what it would look like and then you did it. The chat found it. Wren subscribed. 147 subscribers.`,gainBonus:5,relBonus:9,startsStream:true},
        {condition:()=>true,text:`First collab. The chat grew. Wren showed up. The format is established.`,gainBonus:0,relBonus:7,startsStream:true},
      ]
    },
    // stageIdx 1 — ~320 lbs — regular collab
    {
      title:"Weekly Collab",
      phases:[
        {
          text:(h,s,partner)=>`Six weeks of weekly collabs. The format is established — both sides of the table, mutual feed, the camera seeing everything — and ${partner?partner.name:'your partner'} is ${partner?Math.round(partner.lbs)+' pounds':'heavier'} now, more than when the collabs started, and you are ${Math.round(s.lbs)} pounds, and neither of you are hiding the progression or pretending it isn't what it is.

*wrenWatchesEverything: regular collab viewer now, been here every week.* The subscriber count has grown. The format has a community now. Wren is in it.`,
          choices:[
            {id:"loaded_both",label:"Both eat a warmup plate before going live",result:`Pre-stream warmup for both of you: something warm and substantial, the bellies already beginning to fill before the camera is on. She eats hers with the ease of someone who has been doing this for six weeks. You eat yours the same way. You are both ready.`,lbs:7,rel:8,flag:"both_loaded"},
            {id:"bigger_spread",label:"Set a larger-than-usual spread — announce it to the chat as a special",result:`You set both sides of the table larger than any previous collab. You announce it before going live: subscriber special, both of you eating more tonight than you ever have on-stream together. The pre-stream count opens higher than usual. The chat already knows something is happening.`,rel:10,flag:"special_stream"},
          ]
        },
        {
          text:(h,s,partner)=>`Live. The format runs as it always runs now — both of you eating, the chat watching both weight counters, the specific dynamic of you feeding her and her feeding you and both of you growing visibly over the course of an hour. *wrenWatchesEverything: I donated to get the next tier. I have no regrets.*

${partner?partner.name:'She'} is ${h.includes("both_loaded")?"warm and already full against the chair, her belly pressing her top forward, both hands on it":""} eating with the focused attention of someone who has been training for this for six weeks. She has been. You both have.`,
          choices:[
            {id:"reveal_weights",label:"Announce both weights to the chat — simultaneously on camera",result:`You both step on the scale. Side by side, or in sequence, and the chat gets both numbers in the same stream. The reaction is a kind of sustained astonishment. You are both heavier than any previous week's weigh-in and the chat is doing the math and the math is going the right direction.`,rel:12,flag:"dual_reveal"},
            {id:"push_partner",label:"Feed her an extra course — push the format further",result:`You put an extra course on her side of the table. She looks at it and looks at you and she takes it. The chat understands what this means. The donation bar starts moving. You eat your own matching portion. Both sides of the table getting smaller. Both of you getting heavier.`,rel:10,flag:"pushed_partner"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("dual_reveal"),text:`Weekly collab. Both loaded pre-stream and both weights revealed simultaneously. The chat's reaction to the dual reveal was the best single moment the stream has had. Wren donated immediately. Subscriber count growing.`,gainBonus:14,relBonus:14,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:`Weekly collab. Dual weight reveal. Chat went wild. Wren donated. The format is maturing.`,gainBonus:9,relBonus:11,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:`Weekly collab. Both loaded. Both eating. The format running exactly as designed.`,gainBonus:7,relBonus:8,startsStream:true},
        {condition:()=>true,text:`Weekly collab. Subscriber count growing. Wren is still there. Format intact.`,gainBonus:0,relBonus:6,startsStream:true},
      ]
    },
    // stageIdx 2 — ~419 lbs — featured collab
    {
      title:"Featured Collab",
      phases:[
        {
          text:(h,s,partner)=>`The platform featured the collab format specifically. Not you alone — the collab, the double-feed, the mutual gain. The editorial pick described it as "a new format for a specific kind of content that doesn't have a name yet but should." You are ${Math.round(s.lbs)} pounds and ${partner?partner.name+' is '+Math.round(partner.lbs)+' pounds':'your partner is substantial'} and the subscriber count grew by 12,000 in a week.

*wrenWatchesEverything: top donor four streams running, hi.* Wren has been at every stream. Wren is a presence.`,
          choices:[
            {id:"feature_spread",label:"Set the largest spread you've ever done together — rise to the feature",result:`The spread is the most food you've had in frame for a collab: both sides, large courses, more than either of you has eaten on-stream together before. She looks at her side of the table and says: "we're doing this." You say: "we're doing this." The pre-stream count is high. The featured audience is watching.`,lbs:10,rel:11,flag:"both_loaded"},
            {id:"pre_talk_feature",label:"Talk about the feature before going live — what the new audience will see",result:`You both talk about it before the camera: who the new audience is, what they came for, what you want to show them. "We want to show them something real," she says. You agree. What you're about to do is real. The gain will be real. The camera will see it.`,rel:13,flag:"intentional"},
          ]
        },
        {
          text:(h,s,partner)=>`Live. The featured audience is here — you can see the viewer count, which is higher than any previous collab stream — and ${partner?partner.name:'she'} is eating with the particular focused attention of someone who knows they're being watched by more people than usual and is performing the same as always, which is to say: completely. *wrenWatchesEverything: THE PLATFORM FEATURE WAS DESERVED. I SAID THIS IN ADVANCE.*

You are ${Math.round(s.lbs)} pounds on camera in front of the new audience. They are seeing what the format is for the first time. They are going to stay.`,
          choices:[
            {id:"stage_push",label:"Feed her the biggest portion yet — make the new audience see what the format does",result:`You put the largest course of the night on her side of the table. The new audience is watching. The chat explains to the newcomers what's happening: this is what the collab is. This is the point. She eats it. She is heavier than when this stream started and the camera sees it and the new audience understands what they found.`,rel:13,flag:"stage_push"},
            {id:"reveal_both_featured",label:"Do the double weight reveal for the new audience",result:`Both weights on camera for the new audience, side by side. You say your number. She says hers. The featured audience has never seen this before and the reaction is the exact reaction you get when something shows people what they've been looking for. The regular subscribers type to the new ones: *this is what it always is.*`,rel:14,flag:"dual_reveal"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("stage_push"),text:`Featured collab. Largest spread ever, biggest course fed to her, the new audience saw the whole thing. The subscriber count jumped significantly. Wren said: *THE COLLAB FORMAT IS EVERYTHING.* It is.`,gainBonus:18,relBonus:16,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:`Featured collab. Double weight reveal for the new audience. They saw what the format is. Many of them subscribed. Wren donated immediately.`,gainBonus:12,relBonus:13,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:`Featured collab. Largest spread. The new audience stayed. The format proved itself.`,gainBonus:9,relBonus:10,startsStream:true},
        {condition:()=>true,text:`Featured collab. New audience. Format demonstrated. Subscribers growing.`,gainBonus:0,relBonus:7,startsStream:true},
      ]
    },
    // stageIdx 3 — ~519 lbs — brand collab
    {
      title:"Brand Collab",
      phases:[
        {
          text:(h,s,partner)=>`The brand deal covers both of you. They want the collab specifically — both bodies in frame, both weights stated on camera, both of you eating their product. The contract is good and the food they've sent is good and ${partner?partner.name+' has read it and said \'yes\'':'"she\'s in"'} and you are ${Math.round(s.lbs)} pounds and the table has the brand's spread arranged on both sides and the ring lights are on.

*wrenWatchesEverything: Wren donating the full goal herself, as usual.* Wren donated before the stream even started. You send her a thank-you notification.`,
          choices:[
            {id:"brand_warmup",label:"Both eat a full pre-stream warmup — arrive at the brand stream loaded",result:`Both of you eat before the camera: the brand's food, warm and dense, the pre-stream load that will make the collab brand stream the most you've eaten together on camera. She finishes hers and says: "the food is good." The brand will be pleased. She is right.`,lbs:10,rel:11,flag:"both_loaded"},
            {id:"plan_reveals",label:"Plan the double weight reveal — coordinate the timing for maximum impact",result:`You plan it together: both weights revealed in the same moment, at the peak of the stream, with the full audience watching. She has a number she's been waiting to say on camera for three weeks. You have one too. You agree on the moment: third course, before the challenge platter, both weights at once.`,rel:13,flag:"planned_reveal"},
          ]
        },
        {
          text:(h,s,partner)=>`Live. The brand stream is performing exactly as the analytics predicted and somewhat better than you hoped. The audience is here for the collab and the brand food and the mutual gain that the contract anticipated even if it didn't name it directly. ${partner?partner.name:'She'} is eating with the warmth and focus of a woman who has been doing this for months and knows exactly what she's doing.

The chat is dense: *wrenWatchesEverything: I DM'd asking to be on stream someday. Kylie said 'maybe'. I'm holding onto maybe.* You see it. You smile. You eat.`,
          choices:[
            {id:"brand_double_reveal",label:"Execute the double weight reveal — both numbers on camera simultaneously",result:`Third course. You call it: "we're doing the reveal." She's already standing to reach the scale. You say your number — your weight, clearly, into the mic — and she says hers and the chat processes both at once and the donation bar jumps and the viewer count spikes and Wren donates the full remaining goal in one transaction.`,rel:15,flag:"dual_reveal"},
            {id:"max_feed",label:"Feed her the challenge course directly — hand to across-table",result:`You put the challenge course directly on her side. Not sliding it across — actually reaching, the camera catching the full fact of your arm, your belly pressing the table as you lean. She takes it from your hands. The chat is saying the same thing in five different ways. This is the moment. This is why the brand wanted both of you.`,rel:13,flag:"direct_feed"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("dual_reveal"),text:`Brand collab. Both loaded pre-stream, double weight reveal executed at peak audience. The brand's analytics team sent an email before the stream was over. Wren donated the full remaining goal in one transaction. Subscriber count crossed 200,000. She says "next contract, bigger."`,gainBonus:21,relBonus:17,startsStream:true},
        {condition:h=>h.includes("dual_reveal"),text:`Brand collab. Double reveal. The brand's team is very happy. 200,000 subscribers. Wren donated everything she had.`,gainBonus:14,relBonus:14,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:`Brand collab. Both loaded. The spread was good. The brand has what they need.`,gainBonus:10,relBonus:11,startsStream:true},
        {condition:()=>true,text:`Brand collab. Stream successful. 200,000 subscribers. Brand happy.`,gainBonus:0,relBonus:8,startsStream:true},
      ]
    },
    // stageIdx 4 — ~630 lbs — anniversary collab
    {
      title:"Anniversary Collab",
      phases:[
        {
          text:(h,s,partner)=>`One year of weekly collabs with ${partner?partner.name:'the same partner'}. The anniversary stream has been promoted for two weeks. The subscriber count is 1.1 million. I am ${Math.round(s.lbs)} pounds and ${partner?partner.name+' is '+Math.round(partner.lbs)+' pounds':''} and the table is the largest spread we've ever arranged and Wren is in the building.

She told me in a DM: *I'm in the building. In the waiting area. I drove from four hours away.* I told her to come to the studio floor. She's here. She's standing against the wall right now — 200 pounds, beaming, looking at both of us with the expression of someone who has been watching this happen weekly for a year.`,
          choices:[
            {id:"anniversary_load",label:"Both eat the biggest pre-stream warmup you've ever done",result:`The anniversary pre-stream load: more food than any previous warmup, both of you eating together in the quiet before the camera goes on. She finishes and puts her hands on her belly — the full warm weight of a year's worth of weekly collabs, heavier and rounder than the first time she sat in this chair. "Ready," she says. You are both ready. You have been building toward this.`,lbs:14,rel:15,flag:"both_loaded"},
            {id:"introduce_wren",label:"Introduce Wren to the stream — acknowledge the first fan, live",result:`You bring Wren into frame for sixty seconds. Just her face — she's shaking slightly, trying not to cry, and failing slightly — and you say: "This is Wren. She's been in the chat since week one." You say her subscriber number. You say her total donation amount. The chat explodes. Wren says: "I just wanted to watch." She means something different. The chat understands what she means.`,rel:17,flag:"wren_acknowledged"},
          ]
        },
        {
          text:(h,s,partner)=>`Live at 45,000 concurrent and climbing. The anniversary stream is running exactly as planned and significantly better than expected. ${partner?partner.name:'She'} is eating with the particular ease of someone who has been doing this every week for a year and it shows in her body, which is warm and round and considerably heavier than when the collabs started, and it shows in the way she moves — the ease, the comfort, the complete absence of self-consciousness about her size.

*wrenWatchesEverything: one year of weekly collabs and she keeps getting bigger. I am not emotionally prepared.* Wren is against the wall behind the camera. You can see her from here. She's watching.`,
          choices:[
            {id:"year_scale",label:"Do the year reveal — both start weights versus now, live on camera",result:`The anniversary reveal: you say your debut weight — 258 — and then your current weight, clearly, into the mic. She says her debut weight for the collabs and then her current. The chat does the math in real time. Someone writes: *that's a year of collabs.* Someone else writes: *look at what they built.* You both look at the camera. You both reach for the next plate.`,rel:16,flag:"year_reveal"},
            {id:"anniversary_challenge",label:"Challenge her — the biggest feed of the anniversary stream, on your side and hers",result:`You tell her: biggest feed of the anniversary stream, right now, both sides of the table, everything. She looks at you — a year of understanding built into that look — and she nods. You both reach for the largest course. The chat is counting. Wren is watching from against the wall. This is what a year looks like.`,rel:15,flag:"challenged"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("year_reveal"),text:`Anniversary collab. Both loaded, year reveal executed: debut versus now, both weights, for the anniversary audience. Subscriber count crossed 1.5 million by stream end. Wren was in the room and she cried. She was still there when the camera went off. She said: "I'll be here next year too."`,gainBonus:26,relBonus:21,startsStream:true},
        {condition:h=>h.includes("year_reveal"),text:`Anniversary collab. Year reveal. 1.5 million subscribers. Wren cried. She'll be back.`,gainBonus:17,relBonus:16,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:`Anniversary collab. Both loaded. The anniversary spread. The year was real.`,gainBonus:12,relBonus:12,startsStream:true},
        {condition:()=>true,text:`Anniversary collab. One year. 1.5 million subscribers. Format intact.`,gainBonus:0,relBonus:9,startsStream:true},
      ]
    },
    // stageIdx 5 — ~820 lbs blob — grand collab
    {
      title:"The Grand Collab",
      phases:[
        {
          text:(h,s,partner)=>`I am ${Math.round(s.lbs)} pounds in the corner I have permanently claimed in this studio. The custom table is at the right height. The boom-arm camera overhead is at the right angle. ${partner?partner.name+' is '+Math.round(partner.lbs)+' pounds':''} across from me, in her own corner, her own setup mirroring mine, and the food is already arranged on both sides and Wren is in the room.

Not against the wall this time. At a small chair just outside the camera frame, specifically positioned so she doesn't block any shot. She drove four hours. She said: "I've been watching since 258 pounds. I'm not watching this one through a screen." I told her she could come.`,
          choices:[
            {id:"grand_load",label:"Both eat the largest pre-stream load you've ever done — start the grand collab fully loaded",result:`Pre-stream load for both of us. The most food either of us has eaten before a stream — course after course, the belly filling to the specific warm heavy weight of truly loaded, the kind of loaded that shows in the first frame of the camera. She finishes and looks at me. "Ready." I am enormous and warm and fully loaded and I press record.`,lbs:20,rel:18,flag:"both_loaded"},
            {id:"wren_in_frame",label:"Acknowledge Wren on camera — bring her in for the grand collab opening",result:`I bring Wren into frame for the opening. She sits beside me for sixty seconds — this woman who has been watching since 258 pounds sitting beside me at 820 — and she looks at the camera and says: "I've been watching this happen. I've been here the whole time." The chat, which is enormous tonight, goes completely still and then erupts. Wren goes back to her chair. I press record. I begin.`,rel:20,flag:"wren_in_frame"},
          ]
        },
        {
          text:(h,s,partner)=>`Live at 300,000 concurrent and climbing. This is the biggest collab stream we've ever done and the chat is moving fast enough that I can't read individual messages. ${partner?partner.name:'She'} is eating across from me — enormous, warm, her belly the same landscape of forward-pressing fullness that mine is — and both camera feeds are showing exactly what they're supposed to show.

*wrenWatchesEverything: I'm in the room. The actual room. She knows I'm here.* And: *820 pounds and the platform has never seen numbers like this stream right now.*

She is in the chair just outside the frame. I can see her from here.`,
          choices:[
            {id:"grand_scale",label:"Do the grand collab scale reveal — both weights, 300k watching",result:`Both of us on scale. Side by side on the same extended platform — because that's what we use at these sizes — and the numbers appear and I read mine and she reads hers and the chat at 300,000 concurrent processes both numbers at the same time. The reaction is a kind of prolonged collective intake of breath. Wren in the corner has her hands over her mouth. We step off and return to the table and reach for the plate.`,rel:19,flag:"grand_scale"},
            {id:"grand_challenge",label:"Maximum challenge — both of you, everything left on the table",result:`I say it to the camera: "we're going to eat everything left on this table." Not a question. She looks at me across the setup and she says: "yes." We both reach. The chat goes quiet in the way it does when something is happening that requires full attention. Wren in the corner is completely still. This is what the grand collab is for.`,rel:17,flag:"grand_challenge"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("both_loaded")&&h.includes("grand_scale"),text:`Grand collab. Both fully loaded, grand scale reveal at 300k concurrent — both weights, both gains, for the largest audience we've ever had. Subscriber count hit 4 million by morning. Wren was in the room and she stayed until the lights went down. She said: "I'll be here next year." I said: "I'll be bigger." She said: "I know."`,gainBonus:34,relBonus:25,startsStream:true},
        {condition:h=>h.includes("grand_scale"),text:`Grand collab. Grand scale reveal. 4 million subscribers. Wren stayed until the lights went down.`,gainBonus:22,relBonus:19,startsStream:true},
        {condition:h=>h.includes("both_loaded"),text:`Grand collab. Both loaded. The grand spread. The format complete.`,gainBonus:15,relBonus:15,startsStream:true},
        {condition:()=>true,text:`Grand collab. 4 million subscribers by morning. Wren was in the room.`,gainBonus:0,relBonus:11,startsStream:true},
      ]
    },
  ],

  chapter_hostess:[
    // stage 5 — ~258 lbs
    {
      title:"Wednesday Feast",
      phases:[
        {
          text:(h,s)=>`She's been in the chapter kitchen since two in the afternoon and it's now seven and the table is extraordinary. She is ${Math.round(s.lbs)} pounds in her hostess apron, belly warm and rounded against it, moving through the kitchen with the ease of someone who has been planning this for weeks. The sorority sisters are gathering. Your sorority students are here, both of them, and several other chapter members in various stages of arrival.`,
          choices:[
            {id:"arrive_with_more",label:"Arrive with additional food — double the dessert course",result:`You arrive with a significant supplemental course: desserts, dense and sweet, more than the table needs. She sees what you've brought and incorporates it without hesitation. The table becomes larger than she planned.`,lbs:5,rel:7,flag:"extra_food"},
            {id:"help_serve",label:"Help serve — be useful, watch how she runs it",result:`You help carry plates and she runs the service and you learn something about how she does this: with complete authority and genuine pleasure, making sure every plate is full before she sits down.`,rel:9},
          ]
        },
        {
          text:(h)=>h.includes("extra_food")
            ?`Midway through the feast. The extra dessert course is visible in the dynamic at the table — sisters eating past the point of full, coming back for more because more is there. Your sorority students are both on generous helpings. Your hostess is eating at the head of the table with the deliberate, pleasured focus of someone who has made something she's proud of.`
            :`Midway. The table is active, the food is going, your sorority students are both eating well. She presides from the head, eating steadily.`,
          choices:[
            {id:"encourage_seconds",label:"Encourage the sisters to go back for more",result:`You circulate and suggest seconds to everyone. Several take you up on it. Your sorority students both return for second plates. She watches this from the head of the table and nods once.`,rel:8,feedOther:{archetype:"sorority",lbs:4,text:"Your sorority students go back for seconds. The food finds them."}},
            {id:"talk_with_hostess",label:"Talk with her while she eats",result:`You sit near her and she talks while eating — about the table, the recipes, what she wants to add next time. She eats through the whole conversation without slowing.`,lbs:6,rel:10,flag:"personal_moment"},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("extra_food")&&h.includes("encourage_seconds")) return `End of feast. The table is cleared. The sorority students are full — visibly, warmly full — and several sisters are still eating from the dessert course. She sits at the head of the table with her belly warm and round against her clothes, ${Math.round(s.lbs)} pounds plus tonight's considerable intake, and surveys the room. Everyone she wanted to feed has been fed.`;
            return `End of feast. Table cleared. The sisters are fed. She's satisfied.`;
          },
          choices:[
            {id:"end_of_feast_talk",label:"Stay after — help her clean up, talk",result:`You stay and help. She talks while cleaning: "I want these tables bigger. I want the girls eating more each time. I want them coming in knowing they're going to leave heavier." She says it plainly. She means it.`,rel:12,flag:"vision_shared"},
            {id:"leave_with_group",label:"Leave with the sisters, let her have the close",result:`You say goodnight with the departing group. She stands at the door, enormous and warm, saying goodnight to each one personally.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds")&&h.includes("vision_shared"),text:`First feast down. She said she wants them "coming in knowing they're going to leave heavier." The sorority students are heavier. The table was extraordinary. Her belly was warm and full and she meant everything she said.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds"),text:`Good feast. Extra food, seconds encouraged, sorority students are heavier. She's building exactly the culture she described.`,gainBonus:7,relBonus:8},
        {condition:h=>h.includes("extra_food"),text:`Good feast. The extra food was right. She appreciated it.`,gainBonus:4,relBonus:5},
        {condition:()=>true,text:`Good feast. Table cleared. Sisters fed. Culture established.`,gainBonus:0,relBonus:3},
      ]
    },
    // stage 6 — ~320 lbs
    {
      title:"The Grand Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the feast has evolved. Six months of Wednesday feasts and the culture is established: the table is always large, the sisters always stay, the food is always more than you'd think anyone could eat. She's outdone herself this week — twelve courses, warm and fragrant, the table extraordinary. She presides at ${Math.round(s.lbs)} pounds, her belly enormous and warm against her hostess clothes.`,
          choices:[
            {id:"supplement_feast",label:"Arrive with a thirteenth course — surprise",result:`You arrive with a thirteenth course: something substantial, warm, timed perfectly for after the twelfth. She sees it and says: "Good." She incorporates it immediately. The table becomes the largest she's ever set.`,lbs:7,rel:8,flag:"extra_food"},
            {id:"bring_new_guests",label:"Bring two guests outside the chapter",result:`You bring two women who haven't been to a chapter feast. She receives them at the door personally, with plates ready. By the second course they have settled in as if they've been here before. By the eighth they haven't left their seats in ninety minutes.`,rel:9,flag:"new_guests"},
          ]
        },
        {
          text:(h)=>h.includes("extra_food")
            ?`Midway through the feast. Twelve courses in and a thirteenth on the way and the table is eating with sustained, pleasured focus. Your sorority students are deep in it — both of them, eating with the ease of women who have been doing this for months. Their bellies, noticeably rounder than when the semester started, press their blouses warmly. Your hostess is on her fifth plate and watching everything with warm satisfaction.`
            :`Midway. The table is deep into the feast. Your sorority students are eating well. She watches from the head and eats steadily.`,
          choices:[
            {id:"triple_dessert",label:"Fund triple dessert — for everyone, extra portions",result:`You fund a triple dessert course: three rounds, substantial portions, enough that by the end the table is extremely full. Your sorority students eat through all three. The sisters are in various states of very warm, very full contentment.`,rel:10,flag:"triple_dessert",feedOther:{archetype:"sorority",lbs:6,text:"Your sorority students eat through the triple dessert course. They are going to feel this tomorrow."}},
            {id:"seat_beside_her",label:"Sit beside her for the second half",result:`You take the seat beside her and she talks while eating — about each course, about what she's been planning, about what she wants the feasts to become. She eats through the conversation. She never stops.`,lbs:8,rel:11,flag:"close_moment"},
          ]
        },
        {
          text:(h)=>{
            if(h.includes("extra_food")&&h.includes("triple_dessert")) return `End of feast. The table is cleared. The sorority students are full in a way that will last through tomorrow. Several sisters haven't moved from their seats in forty minutes. She sits at the head of the table and her belly is vast and warm and round against her clothes and she has fed everyone exactly as much as she intended. She looks at the room and is completely satisfied.`;
            return `End of feast. Table cleared. Everyone is fed. She is satisfied.`;
          },
          choices:[
            {id:"private_close",label:"Stay after — share the last course with her, just you",result:`Everyone else leaves. You sit with her at the cleared table and she finds the last serving of something and puts it between you and you eat together in the quiet kitchen. She says: "I want to do this every week until I can't cook it fast enough." You both understand what that means.`,rel:14,flag:"intimate_close"},
            {id:"group_send_off",label:"See the sisters out with her",result:`You stand at the door with her as the sisters leave. She is 320 pounds and warm and full and enormous in the doorway and she says goodnight to each one personally.`,rel:6},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert")&&h.includes("intimate_close"),text:`Extraordinary feast. Triple dessert, thirteen courses, the sorority students heavier, and you ate the last course together in the quiet kitchen and she said she wants to do this until she can't cook it fast enough. Her belly was warm and vast and full and she meant all of it.`,gainBonus:13,relBonus:15},
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert"),text:`Extraordinary feast. The sorority students are noticeably heavier. The culture has matured into something significant.`,gainBonus:8,relBonus:10},
        {condition:h=>h.includes("extra_food"),text:`Very good feast. The extra course was right. She'll plan even larger next time.`,gainBonus:5,relBonus:6},
        {condition:()=>true,text:`Good feast. The culture is established. She runs it better every time.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"Alumni Dinner",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the alumni dinner, which is the largest event the chapter has held. A dozen alumni, several of them substantial women in their own right, including one at around 340 pounds who has been funding the feasts for three years without ever attending one. Your sorority students are here. The table is extraordinary — eighteen courses, the kitchen running since morning. She presides at ${Math.round(s.lbs)} pounds, her belly enormous and warm, completely at ease.`,
          choices:[
            {id:"coordinate_kitchen",label:"Help coordinate the kitchen — ensure she can host, not cook",result:`You manage the kitchen logistics so she can focus on the hosting. She circulates the table, talking, serving, attending to the alumni personally. Her belly, enormous at 419 pounds, presses past guests as she moves through the room. Nobody minds. Several alumni watch her with complicated expressions.`,lbs:6,rel:10,flag:"coordinated"},
            {id:"introduce_her",label:"Introduce her to the primary funder as the architect of this culture",result:`You introduce her to the 340-pound alumna specifically, as the woman who built what the alumna has been funding. The alumna looks at your student — 419 pounds, warm, enormous — and says: "I've been funding this for three years and I didn't understand what it was until now." She's smiling when she says it.`,rel:12,flag:"funder_met"},
          ]
        },
        {
          text:(h)=>h.includes("funder_met")
            ?`Midway. The 340-pound alumna has been eating since the introduction. She's been eating with the focused attention of a woman who has been missing this for years without knowing what she was missing. Your sorority students are both deep in it. Your hostess is eating at the head of the table and watching the whole room with the warm satisfaction of a person feeding exactly the people she wants to feed.`
            :`Midway. Eighteen courses and the alumni are responding well. Your sorority students are eating with practiced ease. She presides and eats.`,
          choices:[
            {id:"extra_course_alumni",label:"Fund an additional course specifically for the alumni",result:`You supplement with a nineteenth course, timed for the late middle of the dinner. The alumni eat it. The 340-pound alumna eats it twice. Your sorority students are on their fourth plates and showing it.`,rel:9,feedOther:{archetype:"sorority",lbs:6,text:"Your sorority students eat through the extra alumni course. They're well past comfortable and haven't considered stopping."}},
            {id:"sit_with_hostess",label:"Sit beside her and watch her work the room",result:`You sit beside her and she eats and you watch her watch the table — assessing, adjusting, sending another plate to someone who's slowing, refilling the glass of someone who's still going. She is magnificent at this.`,lbs:8,rel:11},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("funder_met")&&h.includes("extra_course_alumni")) return `End of dinner. The table is cleared. The alumni are in various states of warm, full contentment — the 340-pound alumna hasn't moved in an hour and looks very pleased about this. Your sorority students are visibly heavier than when they arrived. She sits at the head of the table, ${Math.round(s.lbs)} pounds plus everything she's cooked and eaten, and the alumna across the table says: "I've been funding this without understanding it. I understand it now." Your hostess puts another course in front of her.`;
            return `End of dinner. Table cleared. Alumni fed. She has demonstrated what she's built.`;
          },
          choices:[
            {id:"after_dinner_planning",label:"Stay for after-dinner planning — the next feast",result:`After the alumni leave she stays at the table with you and the sorority students and talks about the next feast: bigger, more courses, more food. She eats what remains while she talks. The sorority students eat with her. The planning is extensive.`,lbs:8,rel:14,flag:"next_planned",feedOther:{archetype:"sorority",lbs:5,text:"Your sorority students eat through the after-dinner planning session. They go home heavier than they arrived."}},
            {id:"walk_out_alumna",label:"Walk the primary alumna out — cultivate the relationship",result:`You walk the 340-pound alumna to the door and she says: "I'd like to come back next month." You arrange it. The culture gains a powerful ally.`,rel:9},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni")&&h.includes("next_planned"),text:`Alumni dinner success. The funder said "I understand it now" and your hostess put more food in front of her. The sorority students went home heavier. The next feast is already planned. Her belly was warm and enormous and full and she was satisfied with everything she built.`,gainBonus:17,relBonus:15},
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni"),text:`Alumni dinner success. The funder converted. The sorority students are heavier. The culture has been demonstrated to its patron.`,gainBonus:11,relBonus:10},
        {condition:h=>h.includes("funder_met"),text:`Alumni dinner. The funder met the hostess. The relationship is established.`,gainBonus:5,relBonus:7},
        {condition:()=>true,text:`Alumni dinner. Well-run. The table was extraordinary.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"Rush Season Opening Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and rush season, which means the opening feast is the most important table she will set this year: this is what the incoming pledges will be told they're joining. She has been planning for three weeks. The table is the largest she has ever set. Your sorority students are here as the cultural anchor — both of them, well-established, noticeably heavier than when they started. She stands at the head of the table at ${Math.round(s.lbs)} pounds and her belly is vast and warm and real and she looks exactly like what she is.`,
          choices:[
            {id:"full_opening_spread",label:"Fund the opening spread fully — anything she wants",result:`You've told her: anything she wants for the opening feast. She has used this completely. The table is seventeen courses and the kitchen has been running for eight hours and she is 519 pounds of warmth and certainty at the head of it and the pledges who are about to arrive are going to understand something new about what they've joined.`,lbs:12,rel:9,flag:"full_funding"},
            {id:"brief_pledges",label:"Brief the incoming pledges before they arrive",result:`You meet the pledges at the door and give them context: this feast is the chapter's founding culture. The woman at the head of the table built it. They're being invited to participate in it. Several of them look at each other. None of them leave.`,rel:11,flag:"pledges_prepared"},
          ]
        },
        {
          text:(h)=>h.includes("full_funding")
            ?`Midway. The pledges are eating — tentatively at first, then with increasing conviction, as the culture of the table becomes clear. Your sorority students are modeling: eating steadily, warmly, without apology. Several pledges have gone back for seconds. Your hostess is at her fourth plate and her belly, enormous and warm, is a presence at the head of the table that communicates the standard.`
            :`Midway. The pledges are finding their rhythm. Your sorority students are modeling the culture. She presides and eats.`,
          choices:[
            {id:"push_pledges_further",label:"Fund additional courses specifically for the pledges",result:`You fund another two courses for the pledges specifically, timed for the mid-feast energy dip. The pledges eat. Several of them have stopped putting their forks down between bites. Your sorority students eat the extra courses too, with the ease of women who have been doing this for a year.`,rel:10,feedOther:{archetype:"sorority",lbs:7,text:"Your sorority students eat through the extra pledge courses with practiced ease. They are going to need to update their wardrobes."}},
            {id:"hostess_speech",label:"Ask her to say something to the pledges midway through",result:`You suggest it and she stands — 519 pounds, warm, vast, her belly enormous against her hostess clothes — and tells the pledges exactly what this table is: a culture, a commitment, a choice about what kind of life to build. Several pledges are visibly moved. Several are eating harder.`,lbs:8,rel:12,flag:"speech_given"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("full_funding")&&h.includes("push_pledges_further");
            if(full) return `End of feast. The pledges are in various states of very full, warm contentment — several of them haven't moved in thirty minutes and look completely comfortable about this. Your sorority students are visibly heavier than when the feast started. She sits at the head of the table at ${Math.round(s.lbs)} pounds plus everything she's eaten tonight and surveys the room: the pledges, the sisters, the empty dishes. She is satisfied.`;
            return `End of feast. Table cleared. Pledges fed. The culture has been transmitted.`;
          },
          choices:[
            {id:"close_with_pledges",label:"Stay for the pledge close — hear her speak to them",result:`After the main feast clears she speaks to the pledges directly: what the chapter is, what she expects, what they've just participated in. She says her weight out loud — 519 pounds — and says: "I built this at every size. This is the culture." The pledges look at her with the expression of people who have just understood something important.`,rel:14,flag:"pledge_close"},
            {id:"leave_early_with_senior_sisters",label:"Leave with the senior sisters — let her close alone",result:`You leave with the senior group. She stays behind with the pledges and the sorority students to close the feast.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further")&&h.includes("pledge_close"),text:`Rush season opening feast. She said "519 pounds, I built this at every size" and the pledges understood. Your sorority students are heavier. The culture has been transmitted to the incoming class and it will persist.`,gainBonus:19,relBonus:16},
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further"),text:`Opening feast. Fully funded, pledges fed extra, sorority students heavier. The culture is transmitted.`,gainBonus:12,relBonus:11},
        {condition:h=>h.includes("full_funding"),text:`Opening feast. Full table. The pledges understand what they've joined.`,gainBonus:7,relBonus:7},
        {condition:()=>true,text:`Opening feast. Table cleared. Culture transmitted.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"Annual Grand Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the annual grand feast, which is the event the chapter now plans the entire year around. She has been in the kitchen since six in the morning. It is now six in the evening. The table is the most extraordinary thing she has ever set: twenty-three courses, warm and fragrant and prepared entirely by her. Your sorority students are here — both of them, deeply embedded in the culture, substantially heavier than when this started. The whole chapter is here.`,
          choices:[
            {id:"witness_setup",label:"Arrive early — watch her set the table",result:`You arrive at five and watch her work the final hour of preparation: the last courses, the table arrangement, the care she brings to each placement. She is 630 pounds moving through the chapter kitchen with total command. Her belly, vast and warm and apron-hanging, brushes the counter as she passes and she doesn't pause.`,lbs:8,rel:11,flag:"witnessed_setup"},
            {id:"full_supplemental",label:"Bring a supplemental feast — match her twenty-three with ten more",result:`You arrive with ten additional courses, high quality, warm. She looks at what you've brought and says: "Good." She incorporates all of it. The table becomes the largest any of them have ever seen.`,lbs:10,rel:9,flag:"supplemented"},
          ]
        },
        {
          text:(h,s)=>h.includes("supplemented")
            ?`Midway — thirty-three courses in, the chapter is eating with sustained, warm, pleasured focus. Your sorority students are on their seventh plates. Several sisters haven't left the table in two hours. She sits at the head of the table, ${Math.round(s.lbs)} pounds and everything she's eaten today, her belly warm and vast and enormously present, eating with the unhurried pleasure of someone who has built this and is now living in it.`
            :`Midway. Twenty-three courses, the chapter is eating steadily. Your sorority students are deep in it. She presides and eats.`,
          choices:[
            {id:"grand_feast_extra",label:"Fund additional courses for everyone at the midpoint",result:`You fund another round for the whole table at the midpoint. The chapter eats it. Your sorority students eat through it with the ease of women who have been training for this for two years. They are going to be significantly heavier.`,rel:11,feedOther:{archetype:"sorority",lbs:9,text:"Your sorority students eat through the grand feast extra round. They have been doing this for two years and it shows on their bodies and in the ease with which they keep eating."}},
            {id:"sit_at_head_with_her",label:"Sit beside her at the head of the table",result:`You take the seat beside her for the second half and she eats and you sit together and watch the table — the sisters eating, your sorority students deep in it — and she says: "I want to do this every year until I'm too large to stand at the stove." She means it as a goal.`,lbs:9,rel:13,flag:"together_at_head"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("supplemented")&&h.includes("grand_feast_extra");
            if(full) return `End of the grand feast. The table is cleared. The chapter is in various states of very full, very warm contentment — several sisters have not moved in an hour and are completely satisfied about this. Your sorority students are the heaviest they have ever been and they are still at the table. She sits at the head — ${Math.round(s.lbs)} pounds, everything she's cooked, everything she's eaten today, her belly vast and warm and enormous against her hostess dress — and looks at the room. This is what she built.`;
            return `End of the grand feast. Table cleared. Chapter fed. The annual tradition is cemented.`;
          },
          choices:[
            {id:"last_plate_together",label:"Share the last plate with her — just you two",result:`After the chapter disperses you find the last plate she's saved and she puts it between you and you eat together in the empty chapter room and she says: "I'm going to be too large to cook this alone next year. I'll need help." She is asking you something. You understand what it is.`,rel:17,flag:"intimate_close"},
            {id:"chapter_close",label:"Stand at the door with her as the chapter leaves",result:`You stand beside her as the sisters file out, each one saying goodnight, each one heavier than they arrived, and she is 630 pounds of warmth in the doorway and she says goodnight to all of them personally and stays until the last one is gone.`,rel:8},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra")&&h.includes("intimate_close"),text:`Annual grand feast. She said she'll need help next year because she'll be too large to cook alone. Your sorority students are the heaviest they've ever been. The chapter is fed. She is 630 pounds and completely satisfied and she ate the last plate with you in the empty chapter room.`,gainBonus:22,relBonus:18},
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra"),text:`Annual grand feast. Thirty-three courses, the whole chapter fed, your sorority students are significantly heavier. The tradition is cemented.`,gainBonus:14,relBonus:13},
        {condition:h=>h.includes("supplemented"),text:`Grand feast. The supplemental courses were right. The chapter ate extraordinarily.`,gainBonus:8,relBonus:8},
        {condition:()=>true,text:`Annual grand feast. Twenty-three courses. Table cleared. Culture intact.`,gainBonus:0,relBonus:5},
      ]
    },
    // stage 10 — ~820 lbs — "The Last Feast" (blob stage)
    {
      title:"The Last Feast",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and she has not left the chapter house in three days. She cooked from a chair, which she admits to in a tone that does not suggest it was a problem. The chapter kitchen is staffed now — three sisters rotate in shifts — and the result is on the table: a feast larger than anything she's attempted before. She presides from the head in a wide chair that the chapter had custom-made, her belly enormous and warm and resting on the table's edge, and she looks at it all with complete satisfaction.

Camille arrives at six — the alumni donor, in a car that has picked her up from the airport. She's larger than last time. She always is.`,
          choices:[
            {id:"greet_camille",label:"Welcome Camille properly — seat her beside Tiffany",result:`Camille takes the seat beside her. They greet each other with the warmth of two people who have been building something together for a long time. Camille surveys the table. "She's outdone herself," Camille says, not to you. She says it to the feast. She starts eating.`,lbs:6,rel:9,flag:"camille_seated"},
            {id:"witness_the_table",label:"Stand at the door and take in the whole room",result:`You stand in the doorway. The table is extraordinary. The chapter is assembled. Camille has arrived. The largest woman in the room is in the largest chair, which was made for her, presiding over a table that would feed sixty. You take it in. Then you join it.`,lbs:3,rel:7,flag:"witnessed_the_table"},
          ]
        },
        {
          text:(h,s)=>`Midway through the feast. The chapter is deeply, warmly, pleasurably full. Camille is on her fourth plate, eating with the ease of someone who has spent years at this table. She's put on weight — substantially, across the arc of her involvement — and wears it with the unselfconscious satisfaction of someone who stopped deciding it was a problem a long time ago.

${s.name} is eating steadily, her belly vast and warm and present against the table's edge, and she is watching the whole room with the expression of someone who built this.`,
          choices:[
            {id:"camille_toast",label:"Offer a toast — to what they've built together",result:`You raise a glass. The chapter quiets. "To the table," you say, which is also what the check Camille writes says in the memo line. The chapter echoes it. Camille nods once, slowly, and drinks.`,rel:11,flag:"toast_offered"},
            {id:"ask_camille",label:"Ask Camille what she remembers of her first feast",result:`Camille puts her fork down and thinks about it. "The bread," she says. "And feeling like someone had made space for me at a table I hadn't known existed." She picks up her fork. "I've been making space at tables ever since." She says this to you. She says it to Tiffany. Both are true.`,rel:12,flag:"camille_reminisced"},
          ]
        },
        {
          text:(h,s)=>`End of feast. The table is cleared. The chapter is fed — every one of them, every sister, every guest — and the room has the warm, full, specific quiet of a space where something real happened. Camille is the last guest to leave. She always is.

She stands at the door with her coat in her arms and looks at ${s.name} — ${Math.round(s.lbs)} pounds in the wide chair at the head of the table — and says: "I found this when I was young and hungry and didn't know what I needed. I'm glad it found me." She puts on her coat. "Same time next year," she says.`,
          choices:[
            {id:"final_feast_moment",label:"Stay with her after Camille leaves",result:`She doesn't get up. She's not going to get up for a while. You sit at the table's edge and the room is warm and quiet and she says: "I want to do this forever." She means the table. She means all of it. "I want this to outlast me." You tell her it will.`,lbs:12,rel:16,flag:"final_moment_shared"},
            {id:"chapter_close",label:"Help the chapter clean up — let her rest",result:`The chapter cleans. She stays at the head of the table, enormous and warm and satisfied, thanking each sister as they pass. This is the close.`,lbs:5,rel:8},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("camille_seated")&&h.includes("toast_offered")&&h.includes("final_moment_shared"),text:(h,s,gain)=>`The Last Feast. Camille said she found this when she was young and hungry. ${s.name} built it. She's ${Math.round(s.lbs+gain)} pounds in the wide chair at the head of the table she set. The chapter is fed. The tradition will outlast her. Everything she made is real.`,gainBonus:18,relBonus:22},
        {condition:h=>h.includes("camille_seated")&&h.includes("final_moment_shared"),text:(h,s,gain)=>`The Last Feast. ${s.name} is ${Math.round(s.lbs+gain)} pounds and Camille said the right things and the chapter is fed and she wants this to outlast her. It will.`,gainBonus:12,relBonus:15},
        {condition:()=>true,text:(h,s,gain)=>`The Last Feast. The chapter ate. Camille came. ${s.name} is ${Math.round(s.lbs+gain)} pounds and satisfied. The table was set. The culture is permanent.`,gainBonus:6,relBonus:9},
      ]
    },
  ],

  // ── OVERACHIEVER: competitive_gainer — handled by custom modal ──────────
  // (no EVOLVED_EVENTS entry — doEvolvedActivity opens competitiveGainerState directly)
  _deprecated_academic_subject:[
    // stageIdx 0 — ~258 lbs — Week 3: First Committee Presentation
    {
      title:"Week 3: Initial Data",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and has submitted the first quarterly data summary to her thesis committee. The presentation is tomorrow. She's prepared fourteen slides. The data is accurate. She reviewed it three times tonight and has eaten through the review process.`,
          choices:[
            {id:"coached_on_framing",label:"Help her frame the preliminary findings",result:`You review the framing together. She's precise about the numbers; you help her decide what narrative goes around them. By the end you've helped her build a presentation that is technically accurate and contextually... manageable. She writes notes in the margin. She eats while she writes.`,lbs:5,rel:7,flag:"coached_framing"},
            {id:"let_her_prepare",label:"Leave her to it — she knows the material",result:`She knows the material. She's been the material. The presentation will be fine. You tell her this and she nods once and goes back to her laptop.`,lbs:3,rel:5,flag:"self_prepared"},
          ]
        },
        {
          text:(h,s)=>`The presentation is in two hours. She's run through it three times and eaten twice. The data is solid. The numbers trend in one direction and the direction is up. She's prepared to explain the variance.`,
          choices:[
            {id:"pre_presentation_meal",label:"Take her to eat beforehand — one more meal",result:`You take her somewhere good. She eats thoroughly. "Baseline," she says, meaning she's established a caloric baseline before presenting data about caloric baselines. She finds this funny in a very specific way that suggests she's thought about it before.`,lbs:7,rel:8,flag:"ate_before"},
            {id:"just_coffee",label:"Just coffee — keep it clean",result:`Coffee only. She's methodical. She wants to present cleanly, on the data's merits. The data's merits are substantial and climbing.`,lbs:2,rel:5,flag:"coffee_only"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("coached_framing")&&h.includes("ate_before"),text:(h,s,gain)=>`${s.name} goes into her first committee presentation at ${Math.round(s.lbs+gain)} pounds, well-framed and well-fed. The data is solid. The framing is careful. The committee has been prepped to receive the findings as findings. Time to present.`,gainBonus:4,relBonus:7,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into her first committee presentation at ${Math.round(s.lbs+gain)} pounds with her data and her methodology and her composure. The committee is going to find this very interesting. Time to present.`,gainBonus:2,relBonus:5,startsPresentation:true},
      ]
    },
    // stageIdx 1 — ~340 lbs — Quarter Review
    {
      title:"Quarter Review",
      phases:[
        {
          text:(h,s)=>`Quarter two. ${s.name} is ${Math.round(s.lbs)} pounds and the data has accelerated past the initial projection range. She's presented a note explaining the variance as within acceptable deviation. The committee has accepted this explanation. She's been eating through the write-up process, which she has also documented, because she documents everything.`,
          choices:[
            {id:"help_explain_variance",label:"Help her build the variance explanation",result:`You work through it together. The explanation is: dietary variables, stress-response eating, ambient caloric increase in the research environment. All true. All technically sufficient. She recites it like someone who's recited it to herself many times.`,lbs:5,rel:7,flag:"variance_prepared"},
            {id:"ask_how_she_is",label:"Ask how she's actually doing with all of this",result:`She looks at you for a long moment. 'I'm eating three thousand calories a day and logging every one of them and the committee chair said the methodology is 'compelling.' So.' She eats something. 'I'm doing fine.'`,lbs:4,rel:10,flag:"personal_check"},
          ]
        },
        {
          text:(h,s)=>`The quarter review is tomorrow. The rate of gain has accelerated. The committee is going to notice. ${h.includes('variance_prepared')?'She has a solid variance explanation prepared. She\'s also had a solid dinner.':'She\'s been quiet about how she\'s doing. She\'s also been eating steadily.'}`,
          choices:[
            {id:"big_dinner",label:"Take her to dinner tonight — she deserves it",result:`You take her somewhere substantial. She orders thoroughly and eats carefully and the bill is significant. On the way out she says: 'This will be in the dietary log.' She sounds like someone who finds this funny. She is someone who finds this funny.`,lbs:9,rel:8,flag:"pre_review_dinner"},
            {id:"final_prep",label:"One more run-through of the data presentation",result:`She runs the deck one more time. The data is what it is. She presents it the way she presents everything: with precision and composure. The committee will receive what they receive.`,lbs:3,rel:6,flag:"final_prepped"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("personal_check")&&h.includes("pre_review_dinner"),text:(h,s,gain)=>`${s.name} goes into the quarter review at ${Math.round(s.lbs+gain)} pounds, having eaten well and told you she's fine. The committee is going to have questions. She's going to have answers. Time to present.`,gainBonus:5,relBonus:9,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into the quarter review at ${Math.round(s.lbs+gain)} pounds prepared to defend every data point. The committee is paying attention now. Time to present.`,gainBonus:3,relBonus:6,startsPresentation:true},
      ]
    },
    // stageIdx 2 — ~432 lbs — Chapter 4 Defense
    {
      title:"Chapter 4 Defense",
      phases:[
        {
          text:(h,s)=>`Chapter 4 is the hardest chapter. It covers the acceleration of gain across the study period, the nonlinear increase in appetite, and what ${s.name} refers to in her own draft as 'confounding variables.' The committee is going to read between the lines. She is ${Math.round(s.lbs)} pounds and she knows this.`,
          choices:[
            {id:"reviewed_chapter4",label:"Review Chapter 4 with her before submission",result:`You read it together. She's written it precisely. Every sentence is defensible. Some sentences are defensible because they are technically accurate while being contextually overwhelming. You help her keep the ones that are clearest. She keeps all of them.`,lbs:6,rel:9,flag:"reviewed_ch4"},
            {id:"trust_the_data",label:"Trust the data — it speaks for itself",result:`She's confident in the data because the data is accurate. 'If they ask,' she says, 'I'll answer. The data isn't the problem.' She eats something from her desk. 'The data is the data.'`,lbs:4,rel:6,flag:"trusted_data"},
          ]
        },
        {
          text:(h,s)=>`The defense is this afternoon. Professor Iyer sent a preliminary response to Chapter 4 this morning: 'compelling, though the rate of acceleration in the study's latter half warrants discussion.' She printed this email and is holding it. She is ${Math.round(s.lbs)} pounds.`,
          choices:[
            {id:"prepare_iyer_response",label:"Prepare a response to Iyer's specific question",result:`You prepare it together: the acceleration is documented, it is a finding, the methodology accounts for it by design. The answer is complete and specific and does not require the word 'because' to be followed by anything personal.`,lbs:6,rel:10,flag:"prepared_iyer"},
            {id:"just_eat",label:"Put the email down and eat first",result:`She puts the email down. She eats. By the end of the meal the email is still there and she's better equipped to deal with it. 'Iyer asks good questions,' she says. 'I have good answers.'`,lbs:9,rel:7,flag:"ate_first"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("reviewed_ch4")&&h.includes("prepared_iyer"),text:(h,s,gain)=>`${s.name} goes into Chapter 4 defense at ${Math.round(s.lbs+gain)} pounds with a response prepared for every anticipated question. The committee is going to ask the questions. She's going to answer them. Time to present.`,gainBonus:7,relBonus:11,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into Chapter 4 defense at ${Math.round(s.lbs+gain)} pounds. The data is accurate. The defense will be thorough. Time to present.`,gainBonus:4,relBonus:7,startsPresentation:true},
      ]
    },
    // stageIdx 3 — ~524 lbs — Full Committee Review
    {
      title:"Full Committee Review",
      phases:[
        {
          text:(h,s)=>`Full committee. Five members. External eyes on the data for the first time. ${s.name} is ${Math.round(s.lbs)} pounds and the data reflects this and the committee is going to be in the same room with both.`,
          choices:[
            {id:"full_committee_prep",label:"Run a full mock defense — all five perspectives",result:`You run it. She presents to an imagined panel of five and you interrupt from five different angles. She handles all of them with precision and composure and a steady appetite. By the end she's ready. She's also, by any measure, considerably larger than when the study began.`,lbs:6,rel:10,flag:"mock_defended"},
            {id:"confidence_talk",label:"Talk through her confidence — she knows this material better than anyone",result:`She knows the material because she is the material. You remind her of this. She looks at you for a long moment. 'The committee is going to see the numbers,' she says. 'And then they're going to see me.' A pause. 'I'm prepared for both.'`,lbs:4,rel:11,flag:"confidence_built"},
          ]
        },
        {
          text:(h,s)=>`The full committee review is tomorrow. Five people who have been reading her work and will now see her in person. The data and the subject have not been in the same room together yet. Tomorrow they will be.`,
          choices:[
            {id:"substantial_meal",label:"A substantial meal tonight — she's earned it",result:`A proper dinner. She eats fully, the way she's learned to eat over the course of the study, which is to say thoroughly and without apology. The meal will be in the log. Everything is in the log.`,lbs:10,rel:9,flag:"committee_eve_dinner"},
            {id:"early_night",label:"Early night — she needs to be sharp",result:`She goes home early. She eats something before bed — logged, noted, filed — and sleeps and tomorrow she presents what she is to the people who have been reading about what she is.`,lbs:4,rel:6,flag:"early_night"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("mock_defended")&&h.includes("committee_eve_dinner"),text:(h,s,gain)=>`${s.name} goes into full committee review at ${Math.round(s.lbs+gain)} pounds, prepared from every angle, well-fed, and ready to be the subject in the room with her own data. This is the moment. Time to present.`,gainBonus:10,relBonus:13,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into full committee review at ${Math.round(s.lbs+gain)} pounds. The data and the subject are about to share a room. Time to present.`,gainBonus:5,relBonus:8,startsPresentation:true},
      ]
    },
    // stageIdx 4 — ~626 lbs — External Examiner
    {
      title:"External Examiner",
      phases:[
        {
          text:(h,s)=>`An external examiner from another institution. No social familiarity, no context, no relationship with the subject. They have the dissertation, the data, and a flight in. ${s.name} is ${Math.round(s.lbs)} pounds and has reviewed the examiner's previous work and knows they ask precise questions.`,
          choices:[
            {id:"prep_external",label:"Prepare specifically for an outside perspective",result:`You help her prepare for someone who has no investment in the study's continuation — someone who will read the data as data, not as someone they've watched across a semester. She prepares with unusual thoroughness. She eats while preparing.`,lbs:6,rel:9,flag:"external_prepped"},
            {id:"she_knows_her_work",label:"She knows her work — the examiner will see that",result:`The work is solid. The examiner will see a rigorous self-study with documented methodology, significant data, and a researcher who has seen it through completely. That is accurate. She nods. She eats something.`,lbs:4,rel:7,flag:"confident_external"},
          ]
        },
        {
          text:(h,s)=>`The examiner arrives tomorrow morning. Tonight is the last night before the most foreign pair of eyes reads the dissertation. ${s.name} is ${Math.round(s.lbs)} pounds and she has prepared everything she can prepare. She's been eating through the final review and the dietary log is complete through today.`,
          choices:[
            {id:"examiner_eve_dinner",label:"A real dinner tonight — the last one before the examination",result:`She chooses the restaurant. She eats well — unhurried, deliberate, the way she's learned to eat. This too will be in the log. She's made peace with the log. The log is accurate. She is accurate.`,lbs:10,rel:10,flag:"last_dinner"},
            {id:"final_notes",label:"Work through the final notes together",result:`You go through the notes. The data is what it is. The examiner will see it. She will explain it. The notes are thorough. So is she.`,lbs:5,rel:8,flag:"final_notes"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("external_prepped")&&h.includes("last_dinner"),text:(h,s,gain)=>`${s.name} faces the external examiner tomorrow at ${Math.round(s.lbs+gain)} pounds, prepared for a stranger reading the data cold. The data is accurate. She is the data. Time to present.`,gainBonus:12,relBonus:13,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} faces the external examiner at ${Math.round(s.lbs+gain)} pounds. The work is complete. The examination begins. Time to present.`,gainBonus:7,relBonus:9,startsPresentation:true},
      ]
    },
    // stageIdx 5 — ~820 lbs — Final Defense
    {
      title:"Final Defense",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and submitting the completed dissertation next week. The final defense is in four days. The committee has read the full document. She has eaten through the writing of every chapter and the dietary log is the most complete document she's ever produced and it ends today.`,
          choices:[
            {id:"read_last_chapter",label:"Read the last chapter with her",result:`She reads it aloud. The final chapter is careful and precise and documents the study's conclusion with academic rigor. The study is complete. The subject is 820 pounds. Both sentences are in the document. Both are accurate.`,lbs:7,rel:13,flag:"read_final"},
            {id:"talk_about_what_next",label:"Talk about what comes after the dissertation",result:`She's been thinking about it. 'I'll start a new notebook,' she says. 'The study period ends. The subject doesn't.' She eats something. 'The data keeps accumulating. That's what data does.'`,lbs:5,rel:12,flag:"after_talk"},
          ]
        },
        {
          text:(h,s)=>`Day of the final defense. ${s.name} is ${Math.round(s.lbs)} pounds and the committee is assembled and she's about to defend a dissertation that is about herself and that she has lived for the entirety of its writing. She is the most rigorous subject this committee has ever examined.`,
          choices:[
            {id:"final_meal_before",label:"One last meal before the defense",result:`She chooses something specific — a place she's been going since the second month of the study, logged every visit. She eats thoroughly and precisely. 'For the record,' she says, meaning the dietary log. Also meaning: I've thought about this and I'm doing it intentionally and I want a witness.`,lbs:12,rel:12,flag:"final_meal"},
            {id:"walk_in_with_her",label:"Walk into the defense with her",result:`You walk in with her. The committee is there. She's there. The data is projected on a screen behind her. The subject and the data are in the same room. She stands at the front and looks at the numbers. 'Good data,' she says, mostly to herself. Then she presents.`,lbs:5,rel:14,flag:"walked_in"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("read_final")&&h.includes("final_meal"),text:(h,s,gain)=>`${s.name} enters her final defense at ${Math.round(s.lbs+gain)} pounds having read the last chapter aloud and eaten the last meal before the committee vote. The dissertation is accurate. She is the dissertation. Time to present.`,gainBonus:16,relBonus:17,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} enters her final defense at ${Math.round(s.lbs+gain)} pounds. The study is complete. The subject is here. The committee will vote. Time to present.`,gainBonus:9,relBonus:12,startsPresentation:true},
      ]
    },
  ],

  // ── QUIET: home_nest (delivery session mini-game) ──────────────────────────
  home_nest:[
    // stageIdx 0 — ~258 lbs — "First Day In"
    {
      title:"First Day In",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and she stayed in today. All day. She didn't plan to — it just kept not being necessary to leave. The food came. There was no reason to go out. She's noting this in the way she notes things: carefully, without alarm.`,
          choices:[
            {id:"brought_something",label:"Bring her something yourself — stop by",result:`You stop by with something good. She lets you in without surprise — she was expecting the deliveries anyway, and you're close enough to that. The room is quiet. She eats while you sit there. She's comfortable in a way that suggests the comfort has been building for a while.`,lbs:5,rel:8,flag:"you_visited"},
            {id:"check_in_by_text",label:"Text to check in — give her her space",result:`She texts back quickly. Fine. Eating. She includes a photo of what she ordered, which is significant. She doesn't send food photos to most people.`,lbs:3,rel:7,flag:"text_check"},
          ]
        },
        {
          text:(h,s)=>`She's been in since morning. It's evening now. The delivery history shows three orders — the app keeps a history, she checks it sometimes. She's not tracking it intentionally. She's just noting what's happening.`,
          choices:[
            {id:"order_for_her",label:"Place an order for her — something you know she likes",result:`You order something you know she likes, to her door. She texts back 'oh' and then 'thank you' and then 'this is good.' She eats it. The evening continues. She stays in.`,lbs:8,rel:10,flag:"ordered_for_her"},
            {id:"let_her_be",label:"Let her be — she's got it sorted",result:`She's sorted. The food comes. The room is quiet. This is fine. This is, she's noting, quite fine.`,lbs:4,rel:5,flag:"let_her_be"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("you_visited")&&h.includes("ordered_for_her"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds at the end of her first full day in. You visited. You ordered. She stayed. This seems like something that might happen again. She's not calling it anything yet.`,gainBonus:5,relBonus:9,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds at the end of her first full day in. The food came. Everything was fine. She'll see how tomorrow goes.`,gainBonus:3,relBonus:6,startsDelivery:true},
      ]
    },
    // stageIdx 1 — ~340 lbs — "Getting the Hang of It"
    {
      title:"Getting the Hang of It",
      phases:[
        {
          text:(h,s)=>`It's been five days. ${s.name} is ${Math.round(s.lbs)} pounds and she's developed what she would describe, carefully, as a system. She knows which apps are reliable. She knows which places have the best timing. She's started noting preferences she didn't know she had.`,
          choices:[
            {id:"discuss_system",label:"Ask about the system — she seems to enjoy it",result:`She tells you about it. The three places she rotates through. The order she prefers for meals — which thing earlier, which later. The way she's figured out which orders are worth the wait. She talks about this with the focused pleasure of someone optimizing something that matters.`,lbs:4,rel:9,flag:"system_shared"},
            {id:"observe_delivery",label:"Be there when a delivery arrives — see the setup",result:`You time it right. The delivery arrives and she answers the door in her wide soft hoodie and takes the bag and sits back down in the chair and opens it with an efficiency that suggests this is very practiced. 'I've been figuring out the timing,' she says.`,lbs:6,rel:7,flag:"delivery_observed"},
          ]
        },
        {
          text:(h,s)=>`Day six. She's hit something of a rhythm — not consciously, just empirically. The food comes at the right times. She eats it. The room accommodates this. She accommodates this. Everyone is getting along.`,
          choices:[
            {id:"big_order",label:"Suggest a bigger order tonight — try something new",result:`She agrees. You suggest a place she hasn't tried. The order is larger than her usual. She eats through it over two hours, returning to it between other things, and finishes everything. 'That was a good call,' she says. It was.`,lbs:10,rel:9,flag:"big_order_tried"},
            {id:"usual_routine",label:"Keep to her routine — she's built something good",result:`The routine runs. Everything comes on time. Everything is what she wanted. She eats and is satisfied and the routine was, as she'd found, a good routine.`,lbs:6,rel:6,flag:"routine_kept"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("system_shared")&&h.includes("big_order_tried"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and finding her system. She shared it with you and tried something new and both things worked. The nest is getting more specific. More hers.`,gainBonus:6,relBonus:10,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the system is working. The food comes. She eats. The room is hers.`,gainBonus:4,relBonus:6,startsDelivery:true},
      ]
    },
    // stageIdx 2 — ~432 lbs — "The Regular"
    {
      title:"The Regular",
      phases:[
        {
          text:(h,s)=>`Two weeks in. ${s.name} is ${Math.round(s.lbs)} pounds and the places she orders from regularly know her preferences. One of them messages before she orders to confirm the usual. She found this noteworthy enough to mention to you.`,
          choices:[
            {id:"discuss_regulars",label:"Ask which places and what she gets",result:`She lists them. Three primary, two alternates. Each with a primary order and variations for moods. She knows the delivery windows, the best items, the one thing at each place that she'd order if she could only order one thing. This is a well-developed system.`,lbs:5,rel:9,flag:"regulars_discussed"},
            {id:"place_a_standing_order",label:"Help her set up a standing order at her favorite",result:`You help her set up a standing order — same time every day, her preferred items. The app confirms it. She looks at the confirmation with the expression of someone who has made something official. 'Good,' she says.`,lbs:7,rel:11,flag:"standing_order"},
          ]
        },
        {
          text:(h,s)=>`${h.includes('standing_order')?'The standing order came in for the first time today. She texted you to say it worked.':'She\'s been refining the rotation. Things have gotten more dialed in.'} She's ${Math.round(s.lbs)} pounds and the chair she sits in has been repositioned slightly since the last time you visited. Better for the desk, she says.`,
          choices:[
            {id:"knock_visit",label:"Stop by again — bring something she didn't order",result:`You bring something from a place she mentioned once and hasn't ordered since. She opens the door and takes the bag and goes back to the chair and you sit nearby while she eats. It's quiet and comfortable and she says 'this is the good one' and she means the item and also something else.`,lbs:9,rel:12,flag:"unannounced_visit"},
            {id:"order_together",label:"Order together remotely — you from your place, her from hers",result:`You both order at the same time and eat simultaneously on video. She looks comfortable in her chair. Comfortable in the way that things that are shaped by long use are comfortable. You eat. The food is good.`,lbs:6,rel:9,flag:"ordered_together"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("standing_order")&&h.includes("unannounced_visit"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the standing order is running and you brought something unexpected and both things were right. The nest is becoming itself.`,gainBonus:8,relBonus:13,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the regulars know her and the room is settled and the food comes on time. This is working.`,gainBonus:5,relBonus:8,startsDelivery:true},
      ]
    },
    // stageIdx 3 — ~524 lbs — "Someone Knocks"
    {
      title:"Someone Knocks",
      phases:[
        {
          text:(h,s)=>`Someone from class stopped by. ${s.name} is ${Math.round(s.lbs)} pounds and she didn't answer. The knock came and she looked at the door and looked at the food and looked at the door again and decided the food was the more pressing concern. She texted the person afterward to say she'd been asleep.`,
          choices:[
            {id:"validated_choice",label:"Validate the choice — it was fine",result:`You tell her it's fine. The person texted back. Everything is fine. 'Yeah,' she says. 'I know.' She says it the way someone says something they'd already decided. 'I just thought you'd want to know I'm noting it.' She's noting it.`,lbs:4,rel:9,flag:"choice_validated"},
            {id:"gently_asked",label:"Ask gently if she wants to talk about it",result:`She thinks about it for a moment. 'Not particularly,' she says. 'I was eating and I didn't want to stop.' A pause. 'That's the whole thing.' She eats something. 'Is that a problem?' You say no. She nods. 'Okay.'`,lbs:6,rel:12,flag:"talked_about_it"},
          ]
        },
        {
          text:(h,s)=>`The delivery arrived ten minutes ago. She's been eating since. The room is warm and comfortable and the knock from earlier has been absorbed into the afternoon without residue. She looks, if anything, more settled.`,
          choices:[
            {id:"extra_order",label:"Order something for her now — round two",result:`You order. It arrives. She eats through it with the comfortable ease of someone who has learned how much she can hold and has found she can hold more than she thought. 'Good call,' she says. It was.`,lbs:12,rel:10,flag:"extra_ordered"},
            {id:"stay_in_quiet",label:"Stay in the quiet with her — no agenda",result:`You sit nearby. She eats. It's quiet. The afternoon passes in the way afternoons pass in a room that has become what it's supposed to be.`,lbs:6,rel:11,flag:"stayed_quiet"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("talked_about_it")&&h.includes("extra_ordered"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and she told you the whole thing — eating, not stopping, noting it — and you ordered more and she ate it. The room is what it is. She's what she is. Both are fine.`,gainBonus:10,relBonus:14,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the knock is handled and the food is here and the afternoon continues. This is fine. She's fine.`,gainBonus:6,relBonus:9,startsDelivery:true},
      ]
    },
    // stageIdx 4 — ~626 lbs — "They Know Her Name"
    {
      title:"They Know Her Name",
      phases:[
        {
          text:(h,s)=>`The soup place started sending her a message before her daily order: 'usual?' She says yes every time. The driver knows which door now. Doesn't knock anymore — just leaves it and messages her. ${s.name} is ${Math.round(s.lbs)} pounds and she mentioned this to you with the tone of someone filing a pleasant observation.`,
          choices:[
            {id:"celebrated_it",label:"Celebrate it with her — this is a good thing",result:`You say: that's actually great. She looks at you for a moment. 'Yeah,' she says. 'It is.' She seems to have needed someone else to confirm this before she fully believed it. She eats something. 'The soup is good too,' she adds.`,lbs:5,rel:12,flag:"celebrated"},
            {id:"asked_about_driver",label:"Ask about the driver — has she ever talked to them",result:`She has. Brief exchanges through the door. The driver's name is Lee. Lee has good timing and doesn't linger. She appreciates both of these things. 'I tipped extra on the last three orders,' she says, with the air of someone who has identified a correct behavior and implemented it.`,lbs:4,rel:10,flag:"knows_driver"},
          ]
        },
        {
          text:(h,s)=>`She's ${Math.round(s.lbs)} pounds and the room has organized itself around her, gradually, in the way rooms do when one person is in them consistently enough. The chair is the right chair. The desk is the right position. The lighting is figured out. The food situation is running smoothly.`,
          choices:[
            {id:"comprehensive_order",label:"Place a comprehensive order tonight — everything good from every place",result:`You order from three places at once. The deliveries arrive within twenty minutes of each other. She spreads them across the desk and eats through all three in sequence, unhurried and complete. 'This is a lot,' she says, meaning: this is exactly right.`,lbs:14,rel:11,flag:"triple_order"},
            {id:"ask_how_long",label:"Ask how long she's been mostly here — does she know?",result:`She thinks about it. 'A few months,' she says. 'I stopped keeping close track.' A pause. 'It stopped mattering when I stopped wanting to be anywhere else.' She seems okay with this. She is okay with this.`,lbs:6,rel:13,flag:"asked_duration"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("knows_driver")&&h.includes("triple_order"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and knows the driver's name and ordered from three places at once and ate everything. The nest is fully operational.`,gainBonus:12,relBonus:13,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the places know her and the room is right and the food comes and this is just what it is now.`,gainBonus:7,relBonus:9,startsDelivery:true},
      ]
    },
    // stageIdx 5 — ~820 lbs — "Always Here"
    {
      title:"Always Here",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and she hasn't been outside in a while. She's not sure exactly how long. The room is the same room it's always been except that it has arranged itself completely around her now — the chair, the desk, the delivery setup, the temperature, the specific quiet of a space that has found its use.`,
          choices:[
            {id:"visit_the_room",label:"Come by — see the room as it is now",result:`You come by. The room is different in the way rooms get different when they've been lived in fully — worn, specific, warm. She's in the chair. She waves you toward the other chair. The food is on the desk. This is her life and it fits her.`,lbs:5,rel:13,flag:"saw_the_room"},
            {id:"ask_what_she_needs",label:"Ask what she needs — is there anything",result:`She thinks about it. 'More of the ramen from the place on Fifth,' she says. 'The regular order doesn't come until Thursday.' She says this without irony. It is a sincere answer to the question. You order the ramen.`,lbs:7,rel:12,flag:"got_what_she_needed"},
          ]
        },
        {
          text:(h,s)=>`She's ${Math.round(s.lbs)} pounds and the delivery is arriving and the room is warm and she looks at you with the expression of someone who has found the thing that works for them and knows it. 'I'm good,' she says, which is not nothing.`,
          choices:[
            {id:"stay_for_the_meal",label:"Stay and eat with her — share the delivery",result:`You stay. The food arrives. She shares it — naturally, without ceremony, in the way people share things in rooms where they're both comfortable. It's quiet. It's warm. It's the entire thing.`,lbs:12,rel:16,flag:"shared_delivery"},
            {id:"let_her_eat_in_peace",label:"Give her the room — let her have her meal",result:`You leave after a while. She's eating when you go. She's still eating when she texts you twenty minutes later to say the thing from the second order was the best one. You say good. She says yeah.`,lbs:9,rel:10,flag:"ate_alone"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("saw_the_room")&&h.includes("shared_delivery"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and you saw the room and stayed for the meal and everything was warm and quiet and exactly right. This is where she lives. This is what she's built.`,gainBonus:15,relBonus:18,startsDelivery:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds. The room is right. The food comes. She's good. This is the whole thing.`,gainBonus:9,relBonus:12,startsDelivery:true},
      ]
    },
  ],

  // ── TRANSFER: campus_legend (food challenge tour mini-game) ──────────────
  campus_legend:[
    // stageIdx 0 — ~258 lbs — "The First Challenge"
    {
      title:"The First Challenge",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and three months into an exchange she intended to spend doing architecture work and instead has been spending in the dining hall. She didn't mean to clear the dining hall's challenge item. She was hungry. It was there. It seemed manageable and then it was gone.

Someone took a photo. The dining staff started doing something with their hands that she later understood was applause.`,
          choices:[
            {id:"encouraged_next",label:"Encourage her to do the next one — see what happens",result:`She thinks about it. 'There's a place near the library,' she says, 'with a thing. Someone told me.' She has looked it up. She has looked up three places. She went in to ask and check the proportions and leave. She has notes.`,lbs:5,rel:8,flag:"encouraged_next"},
            {id:"asked_how",label:"Ask how she felt after — was it overwhelming",result:`'No,' she says. 'It was...' She considers. 'Satisfying is the word.' She nods once. 'Like correctly estimating something. You think you can and then you do.' She pulls out her phone. 'There's another one. Near the library.'`,lbs:3,rel:10,flag:"talked_about_feeling"},
          ]
        },
        {
          text:(h,s)=>`She's found three challenges within walking distance. She has notes. She has preferences. The first one happened by accident; the rest are going to happen on purpose. She is ${Math.round(s.lbs)} pounds and she is considering this systematically.`,
          choices:[
            {id:"help_plan",label:"Help her plan the route — which one first",result:`You plan it together. She has opinions about ordering. 'This one is the benchmark,' she says, pointing at her list. 'We do this first. Then we know what we're working with.' She means 'we' inclusively. You are apparently part of this now.`,lbs:6,rel:10,flag:"planned_route"},
            {id:"suggest_journalist",label:"Mention that someone might want to write about this",result:`She looks at you. 'Write about what?' 'Someone eating through the campus food challenges.' 'That's a piece?' She seems genuinely uncertain. 'I'm just eating.' You say yes, that's a piece. She thinks about it. 'Alright,' she says.`,lbs:3,rel:8,flag:"journalist_mentioned"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("planned_route")&&h.includes("journalist_mentioned"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds with a route planned and a journalist potentially on the way. She's cleared one challenge by accident. Time to do it on purpose.`,gainBonus:4,relBonus:9,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the first challenge is behind her and three more are in her notes. Time to see what she can do.`,gainBonus:2,relBonus:6,startsChallenge:true},
      ]
    },
    // stageIdx 1 — ~340 lbs — "The Journalist Finds Her"
    {
      title:"The Journalist Finds Her",
      phases:[
        {
          text:(h,s)=>`A writer from the campus paper found her. Not aggressively — just a 'hey, I heard about the dining hall thing, can I ask you some questions?' ${s.name} is ${Math.round(s.lbs)} pounds and she looked at the journalist for a moment and said yes in the way you say yes when you've already decided.`,
          choices:[
            {id:"helped_prep_interview",label:"Help her prepare for the interview — what to say",result:`You run through it. She's naturally quotable — dry, precise, undefended. 'I was hungry and it was there and I ate it' is, she insists, the actual thing that happened. You convince her to add a sentence about what's next. She agrees. 'There's more to eat,' she says. 'That's the sentence.'`,lbs:4,rel:9,flag:"interview_prepped"},
            {id:"let_her_handle",label:"Let her handle it — she's fine at this",result:`She's fine at this. The interview goes well. She says exactly what happened and the journalist writes it down and the piece is coming out Thursday.`,lbs:3,rel:7,flag:"handled_interview"},
          ]
        },
        {
          text:(h,s)=>`The piece is out. It's accurate and shorter than she expected and calls her 'a first-year exchange student who is, apparently, working her way through every food challenge on campus.' This is accurate. She's read it twice. She is ${Math.round(s.lbs)} pounds and there are more challenges on the list.`,
          choices:[
            {id:"celebrate_piece",label:"Celebrate the piece — this is the beginning",result:`You take her out. To one of the places on the list, which is also a celebration and a continuation. She clears the thing she ordered. The journalist happens to be there. This was not planned. The journalist takes a photo.`,lbs:10,rel:10,flag:"piece_celebrated"},
            {id:"just_keep_going",label:"Keep going — the list doesn't care about the article",result:`She shrugs at the article and opens the list. 'Second one Thursday,' she says. She goes to the second one Thursday. She clears it. Nobody writes about this one. She doesn't mind.`,lbs:7,rel:7,flag:"kept_going"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("interview_prepped")&&h.includes("piece_celebrated"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the piece ran and the journalist was there for the next one and the list is still going. She's got a following now, technically. She's mostly thinking about the list.`,gainBonus:6,relBonus:10,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the article exists and she's still clearing challenges and the list is still going. Time for the next one.`,gainBonus:3,relBonus:7,startsChallenge:true},
      ]
    },
    // stageIdx 2 — ~432 lbs — "The Crowd Forms"
    {
      title:"The Crowd Forms",
      phases:[
        {
          text:(h,s)=>`Something has shifted. ${s.name} is ${Math.round(s.lbs)} pounds and when she walks into venues people look up now — not all of them, but some of them, and some of those know who she is. The journalist has written two more pieces. A third is pending. The crowd at challenges has grown.`,
          choices:[
            {id:"watch_the_room",label:"Watch how the room reacts when she arrives",result:`You hang back. She walks in and the staff greets her by name and two students at the nearest table recognize her and one of them says something to the other and she doesn't notice or doesn't show it. She sits down and studies the menu. She already knows the menu.`,lbs:4,rel:11,flag:"watched_arrival"},
            {id:"talk_to_the_crowd",label:"Talk to someone in the crowd — find out why they came",result:`You ask a student nearby why they're here. 'I heard she was doing the challenge today,' the student says. 'I wanted to see.' She says this with complete sincerity. She came specifically to watch. This has become a thing people do.`,lbs:3,rel:9,flag:"crowd_talked"},
          ]
        },
        {
          text:(h,s)=>`The challenge clears. The crowd that's formed responds. Someone cheers. Someone else takes a photo. The journalist has her phone out. ${s.name} looks at all of this with the expression of someone who is slightly bemused and fundamentally okay with it. She's ${Math.round(s.lbs)} pounds and she wipes her hands on a napkin and says something to the journalist that becomes the headline of the next piece.`,
          choices:[
            {id:"post_challenge_chat",label:"Stay after — eat more with her while the crowd clears",result:`You both stay. She orders something small off the regular menu. The crowd filters out. The journalist asks her three more questions while she eats. By the time the room is clear she's had three more plates and seems, if anything, more comfortable than when she arrived.`,lbs:11,rel:12,flag:"stayed_after"},
            {id:"leave_with_crowd",label:"Leave with the crowd — let her have the solo exit",result:`You leave with the others. Through the window you see her stay a while longer, eating something additional, alone with the journalist and the empty tables. This feels correct.`,lbs:5,rel:8,flag:"left_with_crowd"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("watched_arrival")&&h.includes("stayed_after"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the crowd came to watch and she cleared the challenge and stayed to eat more and the journalist is writing the third piece. The legend is forming.`,gainBonus:8,relBonus:12,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the crowd is forming and the challenges are going down and the journalist keeps showing up. The list continues.`,gainBonus:5,relBonus:8,startsChallenge:true},
      ]
    },
    // stageIdx 3 — ~524 lbs — "The Fourth Venue"
    {
      title:"The Fourth Venue",
      phases:[
        {
          text:(h,s)=>`The fourth venue. The journalist's third piece ran yesterday and included a sidebar: 'every venue she's cleared.' The list has seven items on it now, four crossed off. ${s.name} is ${Math.round(s.lbs)} pounds and she read the piece carefully and said: 'The sidebar is accurate.'`,
          choices:[
            {id:"fourth_venue_together",label:"Go to the fourth venue together — be there for it",result:`You go together. She studies the challenge item when it arrives. 'Proportions are reasonable,' she says, which is her version of 'this is doable.' She eats. The crowd watches. The journalist is there, of course. She clears it in forty minutes.`,lbs:6,rel:10,flag:"went_together"},
            {id:"let_her_go_alone",label:"Let her go alone — it's her thing, not yours",result:`She goes alone. She texts you: 'Done. The soup was too salty but the rest was fine.' She attaches a photo someone took of her at the finish. She looks satisfied. She always looks satisfied at the finish.`,lbs:4,rel:8,flag:"went_alone"},
          ]
        },
        {
          text:(h,s)=>`Four down. The journalist has her number now and texts when she knows about a new challenge. ${s.name} sometimes finds out from the journalist before she finds out herself. The relationship has become, in a specific way, useful.`,
          choices:[
            {id:"suggest_next_venue",label:"Suggest the fifth venue — you've been scouting",result:`You suggest a place she hasn't found yet. She looks it up. Studies the menu. 'The portion is genuinely impressive,' she says, which is high praise. She schedules it. 'Thursday,' she says. 'Bring the journalist.'`,lbs:9,rel:13,flag:"suggested_venue"},
            {id:"journalist_interview_together",label:"Join her journalist interview — be part of the story",result:`The journalist wants both of you. She agrees with the same direct nod she uses for everything. The interview is a good interview. The journalist asks her what she thinks will happen by the end of the year. She says: 'I'll have eaten everything.'`,lbs:5,rel:11,flag:"joint_interview"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("went_together")&&h.includes("suggested_venue"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds with four cleared and a fifth venue scouted and the journalist texting. The campus legend is building.`,gainBonus:10,relBonus:13,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds. Four cleared. Three more on the list. The journalist is there for all of it.`,gainBonus:6,relBonus:9,startsChallenge:true},
      ]
    },
    // stageIdx 4 — ~626 lbs — "People Come to Watch"
    {
      title:"People Come to Watch",
      phases:[
        {
          text:(h,s)=>`Something is different about this one. ${s.name} is ${Math.round(s.lbs)} pounds and when she walks into the venue she sees: the journalist, three students from class, two people she doesn't recognize, a staff member who has clearly been told who's coming. They've put her in the center table.`,
          choices:[
            {id:"acknowledge_crowd",label:"Help her acknowledge the crowd — this is real now",result:`You lean over and say: 'You should say something.' She looks at the room. She says: 'Thank you for coming. I'm going to eat now.' The room laughs. She eats. The room stays.`,lbs:5,rel:11,flag:"acknowledged_crowd"},
            {id:"just_do_the_thing",label:"She doesn't need to acknowledge it — just watch",result:`She sits down and the challenge arrives and she eats it with the same focused efficiency she always brings and the crowd watches and nobody needs to say anything because the thing is happening and that's what everyone came for.`,lbs:4,rel:9,flag:"just_ate"},
          ]
        },
        {
          text:(h,s)=>`She clears it. The crowd is larger than expected — word has spread beyond the journalist's readership. A student she's never met records the finish on a phone. Someone behind you says: 'she always does it.' Like they've seen this many times. Like this is a known fact.`,
          choices:[
            {id:"big_post_challenge",label:"Order more after — give them a proper close",result:`She orders two more things from the regular menu. The crowd starts to thin but several people stay specifically to watch her keep eating. She eats with complete unselfconsciousness. The journalist is writing something down. This is going to be a very good piece.`,lbs:15,rel:12,flag:"big_post"},
            {id:"talk_to_the_crowd",label:"Introduce her to the crowd — make a proper moment",result:`You introduce her around — not formally, just naturally, bringing her into conversations with the people who came to see her. She's surprisingly good at this. Dry, precise, disarming. By the end everyone has her contact. She doesn't mind.`,lbs:6,rel:14,flag:"introduced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("acknowledged_crowd")&&h.includes("big_post"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and thanked the crowd and kept eating after and people stayed to watch. The legend is no longer a rumor. It's a fact.`,gainBonus:13,relBonus:14,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the crowd came and she ate and the journalist has everything she needs for the next piece. The legend continues.`,gainBonus:8,relBonus:10,startsChallenge:true},
      ]
    },
    // stageIdx 5 — ~820 lbs — "The Last Challenge"
    {
      title:"The Last Challenge",
      phases:[
        {
          text:(h,s)=>`Last one on the list. ${s.name} is ${Math.round(s.lbs)} pounds and the journalist told her about this one before she found it herself. It's the largest challenge available within reach — something purpose-made, extreme by design, at a place that's been tracking her progress and has put together an item specifically because she exists.

The journalist says the piece is already written. She's just waiting for the ending.`,
          choices:[
            {id:"read_the_menu",label:"Review the challenge item together — assess it",result:`She reads it. You read it. There is a moment. 'Proportions are extreme,' she says. 'But within range.' She says 'within range' the way someone says something they've measured carefully. 'Thursday,' she says.`,lbs:5,rel:11,flag:"assessed_challenge"},
            {id:"just_trust_her",label:"Trust her — she's done everything else",result:`She's done everything else. You say so. She looks at you. 'I know,' she says, with the particular confidence of someone who has done six of these and has never looked uncertain at a table. 'Thursday,' she says.`,lbs:3,rel:12,flag:"trusted"},
          ]
        },
        {
          text:(h,s)=>`The venue has a crowd unlike anything that's come before. The journalist is there. The campus paper sent two photographers. There are students who transferred in this semester who have been told about her since before they arrived. ${s.name} is ${Math.round(s.lbs)} pounds and she sits at the table and looks at the challenge item.

She says: 'That's a lot of food.' A pause. 'Right.' She picks up the fork.`,
          choices:[
            {id:"stay_for_all_of_it",label:"Stay for the whole thing — every minute",result:`You stay. The room stays. She eats. It takes a while — longer than any of the others, a sustained, focused, extraordinary effort that the room watches in near-silence for significant stretches. She finishes. She sets down the fork. The room responds.`,lbs:18,rel:16,flag:"stayed_all"},
            {id:"watch_from_nearby",label:"Watch from nearby without crowding her — give her room",result:`You find a spot with a view and stay out of it. She doesn't need you in the moment — the focus is complete, the room is quiet, the challenge is happening. You watch a person become a legend, finishing. The room responds.`,lbs:12,rel:13,flag:"watched_nearby"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("assessed_challenge")&&h.includes("stayed_all"),text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the last challenge is done. The list is complete. The journalist already filed the piece. The campus will be telling stories about this for years. She wipes her hands and looks at you and says: 'That was the last one.' A pause. 'For now.'`,gainBonus:18,relBonus:18,startsChallenge:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} is ${Math.round(s.lbs+gain)} pounds and the list is done. The campus legend is complete. The journalist has the ending she's been waiting for.`,gainBonus:11,relBonus:14,startsChallenge:true},
      ]
    },
  ],

  // ── FARM GIRL: homestead_queen (multi-phase prose, no mini-game) ──────────
  homestead_queen:[
    // stageIdx 0 — ~258 lbs — "The First Spread"
    {
      title:"The First Spread",
      phases:[
        {
          text:(h,s)=>`You knock. The door opens on warmth and cinnamon and Mary Jane — ${Math.round(s.lbs)} pounds in denim overalls, flour on one arm, her enormous chest testing the bib — grinning like she's been waiting. Behind her: six dishes. She has made six dishes.

"Sit down," she says. "We're going to start from the beginning."`,
          choices:[
            {id:"ate_everything",label:"Try everything — all six",result:(s)=>`You work through all six in order. She watches every bite. Her belly presses the folding table's edge with warm certainty. By the fourth dish she's eating alongside you, standing at the counter, directly from the pots. "This one needs more butter," she says, and adds more butter.`,lbs:10,rel:8,flag:"ate_everything"},
            {id:"paced",label:"Eat carefully — appreciate each one",result:(s)=>`You take your time with each dish. She approves of this — asks about the texture, the salt, what you taste. She eats while you eat, plate for plate, her belly rounding further against the table. "You pay attention," she says. It's a compliment.`,lbs:6,rel:12,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Grandma Mae calls. Mary Jane answers — her phone propped against a jar of preserves — and Mae's voice fills the room with questions. How's school. What are you making. Is anyone eating with you.

Mary Jane glances at you. "Someone's here," she says. "He's eating my sweet potato pie." A pause on the line. Mae says: "Well, make sure he eats it right."`,
          choices:[
            {id:"called_mae_back",label:"Wave at the camera — let Mae see you",result:(s)=>`You wave. Mae studies you for a moment. "He looks like he appreciates food," she says, which is the highest possible endorsement. Mary Jane is smiling. She cuts another piece of pie.`,lbs:5,rel:15,flag:"called_mae_back"},
            {id:"second_helping",label:"Take a second piece while she talks",result:(s)=>`You take a second piece without asking. Mary Jane sees and doesn't say anything — just reaches over and cuts it properly for you while she's still on the phone. Mae says: "I hear plates. Good." She does.`,lbs:8,rel:9,flag:"second_helping"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`Mae approved. You cleared the full spread. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and very satisfied, her belly pressed forward against the table, apron flour-dusted, hands wrapped around a mug of something hot. "You can come back," she says. "Next week I'm making six more." She unlocks the first recipe.`,gainBonus:6,relBonus:12,unlockRecipe:'sweet_potato_pie'},
        {condition:()=>true,text:(h,s,gain)=>`Good meal. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and she's already mentally planning the next spread. You can see it in her face — the next six dishes, the next occasion. "Come back," she says. She unlocks the first recipe.`,gainBonus:2,relBonus:6,unlockRecipe:'sweet_potato_pie'},
      ]
    },
    // stageIdx 1 — ~320 lbs — "The Care Package Arrives"
    {
      title:"The Care Package Arrives",
      phases:[
        {
          text:(h,s)=>`The care package from Mae arrived this morning. Mary Jane has it open on the counter when you arrive — six jars of preserves, three packets of heirloom seeds, a tin of seasoned lard, and a handwritten note. She is ${Math.round(s.lbs)} pounds and visibly emotional. Her belly rounds firmly against the counter edge.

"She sent the lard," she says. "The good lard. She only sends the good lard when she means it."`,
          choices:[
            {id:"ate_everything",label:"Ask her to cook with it now",result:(s)=>`She cooks with it now. Something fast and heavy — biscuits, straight from the tin, with one of Mae's preserves on top. She eats standing up, directly off the baking sheet, her belly pressed against the counter, warm and enormous and completely present. "Mae would approve," she says.`,lbs:12,rel:9,flag:"ate_everything"},
            {id:"read_the_note",label:"Ask her to read the note aloud",result:(s)=>`She reads it. Mae's handwriting is large and direct: 'Baby, eat good. Send me a picture of what you made.' She folds the note carefully. Then she starts cooking. "I'm going to send her a picture of everything," she says.`,lbs:7,rel:14,flag:"read_the_note"},
          ]
        },
        {
          text:(h,s)=>`She's on video call with Mae now, showing her the setup — the jars lined up, the folding table covered in food, the cast iron she's accumulated. Mae is smiling. "Baby girl," Mae says, "you've got yourself a real kitchen."

Mary Jane glances at you. "Tell her what you've been eating," she says. She means it as a gift.`,
          choices:[
            {id:"called_mae_back",label:"Tell Mae about the sweet potato pie",result:(s)=>`You tell Mae the pie was the best you've ever had. Mae beams. Mary Jane pretends not to be affected. Her belly rises and settles with one slow breath, enormous and warm. She cuts you another piece.`,lbs:6,rel:14,flag:"called_mae_back"},
            {id:"second_helping",label:"Take a second helping while they talk",result:(s)=>`You take a second plate while they're talking. Mae sees. "He's eating your food," Mae says. "That means it's good." Mary Jane nods once. She doesn't say anything. She adds more to your plate.`,lbs:10,rel:10,flag:"second_helping"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`Mae is pleased. The care package is being used. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and her belly presses the folding table with a weight that has grown noticeably since the last time you were here. She unlocks another recipe.`,gainBonus:8,relBonus:12,unlockRecipe:'biscuits_gravy'},
        {condition:()=>true,text:(h,s,gain)=>`Good afternoon. The care package is open, the food is in you, Mary Jane is ${Math.round(s.lbs + gain)} pounds and warmer than she was at the start. She unlocks another recipe from Mae's box.`,gainBonus:3,relBonus:7,unlockRecipe:'biscuits_gravy'},
      ]
    },
    // stageIdx 2 — ~419 lbs — "Recipe Box Week"
    {
      title:"Recipe Box Week",
      phases:[
        {
          text:(h,s)=>`The recipe box from Mae has been open on the counter all week. Mary Jane has worked through eight recipes and is on number nine when you arrive. She is ${Math.round(s.lbs)} pounds, enormous and warm in the wide cotton housedress she's started wearing, her belly rounding out the front completely, the apron tied behind in a wide knot.

"Peach cobbler," she says, without looking up. "Third version. The first two were wrong. Sit down."`,
          choices:[
            {id:"ate_everything",label:"Try all three versions in order",result:(s)=>`She has kept all three. You try them in order — she watches each bite with the attention of someone collecting data. "The third one's right," you confirm. She already knew. She eats version three directly from the pan with a serving spoon, her belly pressing the counter, warm and forward and enormous.`,lbs:13,rel:10,flag:"ate_everything"},
            {id:"told_her_about_you",label:"Tell her this is the best cobbler you've ever had",result:(s)=>`You tell her. She sets the spoon down and looks at you. "Mae's recipe," she says. "All I did was make it right." But she's pleased. She serves you a larger portion. Her belly presses the counter as she leans to dish it up.`,lbs:8,rel:16,flag:"told_her_about_you"},
          ]
        },
        {
          text:(h,s)=>`Mae is calling. Sunday call, ten sharp — Mary Jane answers eating, which Mae apparently knows because Mae says immediately: "Good. What is it?" She eats while they talk. You eat while they talk. The room is very warm.`,
          choices:[
            {id:"called_mae_back",label:"Stay for the whole call",result:(s)=>`You stay. Mae tells a story about the recipe — its origin, who made it first, what was different then. Mary Jane listens and eats. You listen and eat. Her belly is warm and pressed and enormous and she breathes around it while she listens, adding weight to every slow breath.`,lbs:7,rel:14,flag:"called_mae_back"},
            {id:"cleaned_the_pot",label:"Finish everything in the pot",result:(s)=>`You clean the pot while they talk. Mary Jane sees and, without breaking the call, fills your bowl again from the backup pan. She planned for this. She planned for you specifically.`,lbs:11,rel:11,flag:"cleaned_the_pot"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`Three cobbler versions and an entire call and Mary Jane is ${Math.round(s.lbs + gain)} pounds and the cobbler is perfected and Mae knows about you specifically now. She unlocks the third recipe.`,gainBonus:9,relBonus:14,unlockRecipe:'peach_cobbler'},
        {condition:()=>true,text:(h,s,gain)=>`Recipe tested. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and the cobbler is right now. Another recipe unlocked.`,gainBonus:4,relBonus:8,unlockRecipe:'peach_cobbler'},
      ]
    },
    // stageIdx 3 — ~519 lbs — "The Weekly Call"
    {
      title:"The Weekly Call",
      phases:[
        {
          text:(h,s)=>`Mary Jane barely leaves the room anymore. This is not distress — it's gravity, the specific gravity of someone who has grown too large for casual outings and settled into the warmth of the homestead instead. She is ${Math.round(s.lbs)} pounds in the wide cotton housedress, the apron load-bearing now, her belly enormous and forward and warm, filling the space between her and the folding table completely.

"I made cornbread," she says. "Sit down." It's not a question.`,
          choices:[
            {id:"ate_everything",label:"Eat until it's gone",result:(s)=>`You eat until it's gone. She eats alongside you, directly from the pan — her belly pressed against the counter, the warmth of the food settling into it with each bite. When the pan is empty she looks at it and then looks at you. "I can make more," she says. It's not a question.`,lbs:14,rel:10,flag:"ate_everything"},
            {id:"second_helping",label:"Have a second bowl and ask her to eat with you properly",result:(s)=>`You ask her to sit with you. She does — a slow, settled lowering into the wide chair she's reinforced for herself, her belly filling the space in front of her, enormous and warm. She eats from her own bowl. This is intimacy, in this room, with this food.`,lbs:9,rel:17,flag:"second_helping"},
          ]
        },
        {
          text:(h,s)=>`Mae calls at ten. Mary Jane answers already eating — Mae says, predictably: "Good. What is it?" They talk for forty minutes. You eat for forty minutes. The room smells like everything she's made this week and she is ${Math.round(s.lbs)} pounds and warm and absolutely at home.`,
          choices:[
            {id:"called_mae_back",label:"Ask Mae about the cream gravy recipe",result:(s)=>`You ask Mae about the cream gravy. Mae lights up. She talks for fifteen minutes. Mary Jane watches you with an expression you can't fully read — something like recognition. "He asks good questions," Mae says. Mary Jane nods. "I know," she says.`,lbs:6,rel:16,flag:"called_mae_back"},
            {id:"told_her_about_you",label:"Tell Mae you've been coming here every week",result:(s)=>`You tell Mae. She is quiet for one second and then says: "Good." Just that. Mary Jane's belly rises with a slow breath. "Good," she echoes, not talking to Mae. She adds more to your plate.`,lbs:8,rel:14,flag:"told_her_about_you"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("called_mae_back"),text:(h,s,gain)=>`Mae knows about the cream gravy now. Mary Jane is ${Math.round(s.lbs + gain)} pounds and the room is warm and she's already planning next week. She unlocks another recipe from memory.`,gainBonus:10,relBonus:14,unlockRecipe:'cornbread_butter'},
        {condition:()=>true,text:(h,s,gain)=>`Sunday call, good food, Mary Jane ${Math.round(s.lbs + gain)} pounds and warmer than before. Another recipe added to the list.`,gainBonus:4,relBonus:8,unlockRecipe:'cornbread_butter'},
      ]
    },
    // stageIdx 4 — ~630 lbs — "Running Out of Room"
    {
      title:"Running Out of Room",
      phases:[
        {
          text:(h,s)=>`The room is straining to hold her. Mary Jane is ${Math.round(s.lbs)} pounds and the homestead has grown with her — the folding tables are now four, the cast iron collection is floor-level because she can't reach the shelf anymore, the wide chair she sits in has been reinforced twice. She fills the center of the room completely.

"Mae called this morning," she says. "She says I'm going to run out of room." She's not upset about this. "She's right," she adds. She hands you a bowl.`,
          choices:[
            {id:"ate_everything",label:"Clear everything on the table",result:(s)=>`You clear the table. She watches. Her belly is enormous and warm and pressed against the table edge, the apron straining across it, and her chest sits on top of it like a shelf. She eats from her own plate while you clear yours. "Mae says to make more when you run out," she says. "She means food." She means several things.`,lbs:16,rel:11,flag:"ate_everything"},
            {id:"cleaned_the_pot",label:"Get everything — lick the pot",result:(s)=>`You get everything. She approves of this completely — starts cooking more before you've finished, because she always plans for more, because Mae taught her that. "There's always room," she says, stirring. Her belly presses the counter. There is less and less room. There is always more.`,lbs:20,rel:8,flag:"cleaned_the_pot"},
          ]
        },
        {
          text:(h,s)=>`She cooks the pound cake last. The room smells enormous. Mary Jane is ${Math.round(s.lbs)} pounds and she's breathing carefully around the fullness, her belly warm and very heavy and forward, and she cuts the cake with the ease of someone who has done this ten thousand times.

"Mae's going to drive up," she says. "She wants to see the homestead. She wants to see me." She cuts you a slice. "You should be here," she says.`,
          choices:[
            {id:"told_her_about_you",label:`"I'll be here."`,result:(s)=>`"I'll be here," you say. She hands you the slice and cuts her own, larger, and they eat in the quiet warm room. Her belly presses everything around her with the gentle insistence of something that has been growing for a very long time and intends to keep growing.`,lbs:10,rel:18,flag:"told_her_about_you"},
            {id:"second_helping",label:"Ask for a second piece",result:(s)=>`You ask for a second piece. She cuts it before you finish asking. This is how it works now — you ask, she has already anticipated, the food appears. Her belly presses the edge of the folding table, warm and enormous and present, and she eats alongside you without comment.`,lbs:14,rel:12,flag:"second_helping"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`You'll be there when Mae visits. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and the room is full and she is making plans. She unlocks the pound cake recipe.`,gainBonus:12,relBonus:16,unlockRecipe:'pound_cake'},
        {condition:()=>true,text:(h,s,gain)=>`Good afternoon. Mary Jane is ${Math.round(s.lbs + gain)} pounds and the room has reached its capacity and she is planning to exceed that capacity as well. Recipe unlocked.`,gainBonus:5,relBonus:9,unlockRecipe:'pound_cake'},
      ]
    },
    // stageIdx 5 — ~820 lbs (blob) — "The Final Harvest Table"
    {
      title:"The Final Harvest Table",
      phases:[
        {
          text:(h,s)=>`Mae drove up. She knocked and you answered — she gave you one long look and then looked past you at Mary Jane, who is ${Math.round(s.lbs)} pounds and fills the room and doesn't pretend otherwise. Mae looked at her for a long time. Then she started crying. Then she went to the counter and started cooking.

She's been cooking for four hours. The table has more food on it than you've ever seen in one place. Mae is wiping her eyes with her apron. Mary Jane has both hands flat on her own enormous belly, eyes closed, completely still.`,
          choices:[
            {id:"ate_everything",label:"Start eating — this is what the table is for",result:(s)=>`You start eating. Mae watches with an expression you can't name — grief and pride and something beyond both, the specific emotion of someone who raised something and watched it become more than they expected. Mary Jane opens her eyes. She starts eating too. The three of you eat without speaking for a long time.`,lbs:18,rel:12,flag:"ate_everything"},
            {id:"called_mae_back",label:"Thank Mae for the food",result:(s)=>`You thank Mae. She looks at you for a long moment. "She talks about you," she says. "She talks about you every Sunday." She sets another dish on the table. Mary Jane doesn't say anything. Her belly rises and settles with a slow warm breath.`,lbs:10,rel:20,flag:"called_mae_back"},
          ]
        },
        {
          text:(h,s)=>`Mae sits across from Mary Jane. They talk — about home, about the recipes, about the farm. Mary Jane eats while they talk. Mae eats while they talk. You eat while they talk. The table goes down plate by plate, dish by dish. Mary Jane is ${Math.round(s.lbs)} pounds and she fills the room and she is completely at home in it, enormous and warm and immovable and entirely herself.

Mae says: "I didn't know it would be this big." A pause. "I'm glad it is." She reaches across and puts her hand on Mary Jane's.`,
          choices:[
            {id:"told_her_about_you",label:"Tell Mae what this has meant",result:(s)=>`You tell Mae. You tell her about the weekly visits, the recipes, the food she sent that became other food, the room that became more room as Mary Jane became more Mary Jane. Mae listens. When you finish she nods once. "Good," she says. She adds more food to your plate. You eat it.`,lbs:12,rel:20,flag:"told_her_about_you"},
            {id:"cleaned_the_pot",label:"Clean the table — eat until it's gone",result:(s)=>`You clean the table. Everything. Mae watches and then starts bringing more from the stove. The table refills. You keep going. Mary Jane keeps going. Mae keeps cooking. The cycle is complete and it is ancient and it is exactly right.`,lbs:22,rel:12,flag:"cleaned_the_pot"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("told_her_about_you"),text:(h,s,gain)=>`Mae drove four hours. She saw the homestead. She saw Mary Jane — ${Math.round(s.lbs + gain)} pounds, warm, enormous, completely herself. She cried and then she cooked and now the table is empty and the room is very warm. "Come again," Mae says, to you. Mary Jane unlocks the last recipe.`,gainBonus:14,relBonus:18,unlockRecipe:'cream_gravy'},
        {condition:()=>true,text:(h,s,gain)=>`Mae came. She cooked. The table went down. Mary Jane is ${Math.round(s.lbs + gain)} pounds and warm and the room is full and Mae is already planning the next visit. Last recipe unlocked.`,gainBonus:6,relBonus:12,unlockRecipe:'cream_gravy'},
      ]
    },
  ],

  // ── FARM GIRL: state_fair_queen (phases 1-2 prose, startsFairContest) ────────
  state_fair_queen:[
    // stageIdx 0 — ~258 lbs — "Tri-County Fair"
    {
      title:"Tri-County Fair",
      phases:[
        {
          text:(h,s)=>`Backstage at the Tri-County Fair. The tent smells like sawdust and sugar and summer. You are ${Math.round(s.lbs)} pounds and this is your first competitive entry and Darcy from Meadowview — 310 pounds, three years on the circuit — has not looked at you once.

The warmup table has pies. This is the pre-competition warmup. You eat.`,
          choices:[
            {id:"loaded",label:"Load aggressively — fill up early",result:(s)=>`You eat like you came here to eat. Three pies before anyone else has finished their first. Your belly fills and firms and rounds against the waistband. Darcy still hasn't looked at you. You eat a fourth.`,lbs:8,rel:4,flag:"loaded"},
            {id:"paced",label:"Eat smart — full enough to compete, not so full you slow down",result:(s)=>`You eat with discipline — the warm-up is a tool, not an event. Full enough. Belly warm and ready. Darcy finally glances over. She looks back at her plate. You keep eating, controlled, exactly where you want to be.`,lbs:5,rel:8,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Public weigh-in. The fair uses a livestock scale — this is not a metaphor, this is a cattle fair and the scale was built for cattle. They put it in the tent for this event. Both competitors step up.

Darcy: 310 lbs. Polite applause.

You: ${Math.round(s.lbs)} lbs. The judge reads it. Darcy doesn't look at the board. She looks at you, once, with an expression that is not dismissive but is something in that direction. She says: "Good luck." She means it as a formality.`,
          choices:[
            {id:"confident",label:"Step off the scale and look at her directly",result:(s)=>`You step off and look at her. She looks back. Her expression shifts — not much, but something. She goes back to her stretching. You go back to your lane. The number was honest. The number is always honest.`,rel:8,flag:"confident"},
            {id:"paced",label:"Step off and get focused",result:(s)=>`You step off and lock in. First contest. First scale. The number is real. Make it mean something.`,rel:4,flag:"paced"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`Loaded and locked in. Darcy's waiting at her lane. The pies are on the table. You are here to eat and you know it.

The horn sounds in three minutes. Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`Warm. Ready. Darcy's in her lane. The table is set.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
    // stageIdx 1 — ~320 lbs — "County Championship"
    {
      title:"County Championship",
      phases:[
        {
          text:(h,s)=>`Darcy says "you again" when she sees you in the backstage area. She says it like she's been thinking about it since last year. She's 350 pounds now — bigger than last season — and she looks at you with a different attention than before.

You're ${Math.round(s.lbs)} pounds. The gap has narrowed.`,
          choices:[
            {id:"loaded",label:"Load heavy at the warmup table",result:(s)=>`You load heavy. Your belly fills warm and enormous against the waistband and Darcy watches you eat from across the warmup area. She doesn't say anything. She eats her own warmup — deliberate, paced, experienced. You eat more.`,lbs:10,rel:4,flag:"loaded"},
            {id:"paced",label:"Eat controlled — tactical",result:(s)=>`You eat controlled. Darcy is pacing too and she nods once at your plate in a way that suggests she's noticed you've gotten smarter about this. The gap is closing on multiple axes. You eat until you're ready and stop.`,lbs:6,rel:10,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Scale. Darcy: 350. You: ${Math.round(s.lbs)}. The judge reads both numbers. The board puts them side by side. The gap is small enough that someone in the crowd makes a comment.

Darcy looks at the board. "You're closing," she says. Not a question.`,
          choices:[
            {id:"confident",label:`"I'm closing." — and hold her gaze`,result:(s)=>`"I'm closing," you say. She nods slowly. "I've been doing this for three years," she says. "It's going to be close today." She says this respectfully. You step off the scale. It is going to be close.`,rel:9,flag:"confident"},
            {id:"crowd_moment",label:"Look at the crowd when the number is read",result:(s)=>`You look at the crowd when the judge reads the number. Some of them know you now. A few of them are starting to. Someone starts clapping. Darcy hears it and looks at you differently.`,rel:7,flag:"crowd_moment"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`Darcy said it's going to be close. She's right. The table is set. The pies are there.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`Close match coming. Darcy ready. You ready.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
    // stageIdx 2 — ~419 lbs — "State Qualifier"
    {
      title:"State Qualifier",
      phases:[
        {
          text:(h,s)=>`State level. Press credentials at the door, a photographer from the ag section of the regional paper, and Darcy — 390 pounds now, still a veteran but no longer the biggest number in the room.

You're ${Math.round(s.lbs)} pounds. This is the first year you outweigh her at start.

She finds you in the backstage warmup area. "I've been thinking about this," she says. "About what's going to happen today." She starts eating her warmup. So do you.`,
          choices:[
            {id:"loaded",label:"Eat like it's a statement",result:(s)=>`You eat like it's a statement. Your belly fills and rounds against the competition jersey and you keep going, each pie a pound in the making, your enormous chest and belly warm and prominent. Darcy watches. She eats her own warmup more quickly. The gap is not closing.`,lbs:12,rel:5,flag:"loaded"},
            {id:"paced",label:"Eat smart and let the body speak for itself",result:(s)=>`You eat smart. Darcy is watching you eat and she's recalibrating something — you can see it. You stop when you're ready. Your body is the statement. 419 pounds is the statement. You don't need to do anything else.`,lbs:7,rel:11,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Scale. Darcy: 390. You: ${Math.round(s.lbs)}.

You're 29 pounds heavier. For the first time, your number is higher on the board. Darcy stops mid-stretch when she sees it. Looks at it for a second. Goes back to stretching.

"Where are you putting all that?" she says. Not unkindly. She genuinely wants to know.`,
          choices:[
            {id:"confident",label:`"I grew more room."`,result:(s)=>`"I grew more room." Darcy looks at you and then very nearly smiles. "Fair enough," she says. She finishes her stretch. You step off the scale. The photographer takes a picture.`,rel:10,flag:"confident"},
            {id:"intimidated_them",label:"Look at the scoreboard and then back at Darcy",result:(s)=>`You look at the board — your number at the top — and then back at Darcy. She meets your gaze. She doesn't look away. She does, eventually, look at her plate. You step off the scale.`,rel:7,flag:"intimidated_them"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`Your number is at the top of the board. Darcy's stretching behind you. The table is set.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`First time your number is highest. The table is ready.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
    // stageIdx 3 — ~519 lbs — "State Fair Finals"
    {
      title:"State Fair Finals",
      phases:[
        {
          text:(h,s)=>`State fair finals. The tent is twice the size of last year's. There's a PA system now. Darcy finds you backstage — 430 pounds, serious, present — and she says: "I trained for six months." She says it as information, not complaint. "All year for this."

You're ${Math.round(s.lbs)} pounds. You haven't been not training.`,
          choices:[
            {id:"loaded",label:"Eat at the warmup table while she talks",result:(s)=>`You eat while she talks. She watches you eat. She says: "Right." She goes to her own warmup and eats with the focused discipline of someone who trained all year and knows what they're doing. You eat more. You have more to work with.`,lbs:13,rel:6,flag:"loaded"},
            {id:"paced",label:"Tell her it's going to be a good match",result:(s)=>`"It's going to be a good match," you say. She looks at you for a moment. "Yes," she says, "it is." She goes to her warmup table. You go to yours. This is the cleanest possible pre-competition.`,lbs:8,rel:13,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`Scale. You: ${Math.round(s.lbs)}. The judge reads it into the PA and the tent responds — not polite applause, something louder and more specific, the sound of a number that means something to people.

Darcy claps. Full hand-claps. Not polite. She keeps going after most other people have stopped.`,
          choices:[
            {id:"confident",label:"Acknowledge her applause directly",result:(s)=>`You look at her. She's still clapping. "All year," she says, "for this." She means it as a compliment of the highest order. You step off the scale. The PA is saying your name.`,rel:13,flag:"confident"},
            {id:"crowd_moment",label:"Look at the whole tent",result:(s)=>`You look at the whole tent — the crowd at the entrance, the photographer, Darcy clapping — and you stand there on the scale for one extra second and let the number be the number. Then you step off.`,rel:9,flag:"crowd_moment"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`Darcy is still clapping somewhere behind you. The table is set. The PA has your name on it.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`The tent is loud. Your name on the PA. Table set.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
    // stageIdx 4 — ~630 lbs — "Tri-State Invitational"
    {
      title:"Tri-State Invitational",
      phases:[
        {
          text:(h,s)=>`They built a bigger scale. The fair director mentioned this at registration, trying to be casual about it — "we've upgraded our equipment for this year" — and the whole line understood who the upgrade was for.

You're ${Math.round(s.lbs)} pounds. Darcy is in the stands — 465 pounds, there to watch. She has a sign. It says YOUR NAME in marker on a piece of cardboard.`,
          choices:[
            {id:"loaded",label:"Eat at the warmup table until you're ready",result:(s)=>`You eat until you're ready. Your belly fills and presses your jersey and you stop when the warmth is total and you feel the weight of it completely. That's your signal. You stop. You're ready.`,lbs:15,rel:6,flag:"loaded"},
            {id:"crowd_moment",label:"Find Darcy in the stands and nod",result:(s)=>`You find Darcy in the stands and nod. She raises the sign. Someone nearby sees the sign and then looks at you and their eyes widen. Darcy has been here since the gates opened.`,lbs:8,rel:14,flag:"crowd_moment"},
          ]
        },
        {
          text:(h,s)=>`Scale. The new scale. You step onto it — ${Math.round(s.lbs)} pounds — and the crowd that has gathered around the weigh-in tent is larger than the crowd for any competitor's event. The number comes up. The judge reads it into the PA.

The midway outside the tent pauses. Everyone turns. Someone out there starts clapping first.`,
          choices:[
            {id:"confident",label:"Stand on the scale for an extra moment",result:(s)=>`You stand there. The applause comes in from outside and then from inside. Darcy is on her feet in the stands. The sign is raised. You step off. You are the draw now. The contest is the bonus.`,rel:15,flag:"confident"},
            {id:"intimidated_them",label:"Make eye contact with the competitors",result:(s)=>`You look at the other competitors. They look back. Some of them look at the board. Some of them look at their plates. You step off the scale.`,rel:8,flag:"intimidated_them"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("loaded")&&h.includes("confident"),text:`Darcy's sign is in the air. The midway has stopped. The table is set.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`The crowd is gathered. The scale is behind you. The table is ahead.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
    // stageIdx 5 — ~820 lbs (blob) — "Grand Fair Invitational"
    {
      title:"Grand Fair Invitational",
      phases:[
        {
          text:(h,s)=>`You barely fit the tent. They extended the backstage area this year — a temporary addition, a wide flap of canvas that gives you the room you need to exist in it. You are ${Math.round(s.lbs)} pounds. Darcy is in the stands, 500 pounds, there to watch you win. She has been here since the gates opened.

The warmup food comes to you. You don't go to the table — the table comes to your area. This is a newer tradition.`,
          choices:[
            {id:"ate_everything",label:"Eat everything they bring",result:(s)=>`You eat everything they bring. Your belly is enormous and warm and the warmup food disappears plate by plate. The tent crew exchanges looks. You keep eating. You were not difficult to feed before you became this. You are not difficult to feed now.`,lbs:16,rel:8,flag:"ate_everything"},
            {id:"loaded",label:"Eat at your pace — you know your body",result:(s)=>`You eat at your pace. This is a body you know completely now — its rhythms, its limits, the specific warmth that means ready. You eat to that warmth and stop. The crew looks at you. You are ready.`,lbs:10,rel:12,flag:"loaded"},
          ]
        },
        {
          text:(h,s)=>`They move the big scale into your area. The weigh-in comes to you now — this is also a newer tradition, instituted last year, after the previous invitational established that the walk to the central scale was not something the tent was designed for.

The judge reads the number: ${Math.round(s.lbs)}. Outside the tent, through the canvas, you can hear the crowd stop moving. Then you hear Darcy's voice — she is somewhere in the front — starting to clap. The fair starts clapping.`,
          choices:[
            {id:"confident",label:"Sit with the number for a moment",result:(s)=>`You sit with it. ${Math.round(s.lbs)} pounds. The tent is applauding. Darcy somewhere in it, loudest. You put both hands on your belly — enormous and warm and completely present — and you feel the weight of yourself and the warmth of yourself and you are ready. The contest is incidental. You have already won.`,rel:18,flag:"confident"},
            {id:"crowd_moment",label:"Look toward the tent entrance — toward the crowd",result:(s)=>`You look toward the entrance. The crowd outside has pressed in to see. Phones out. Darcy is in the first row of the stands, sign raised. The fair has come to see this. You are the fair.`,rel:12,flag:"crowd_moment"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ate_everything")&&h.includes("confident"),text:`Darcy is clapping. The fair is clapping. The table is coming to you.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
        {condition:()=>true,text:`The number is announced. The tent is full. The table is ready.

Step up to the table.`,gainBonus:0,relBonus:0,startsFairDay:true},
      ]
    },
  ],
  // ── PSYCH paths ───────────────────────────────────────────────────────────
  psych_researcher:[
    // stageIdx 0 — ~258 lbs — "Establishing the Study"
    {
      title:"Establishing the Study",
      phases:[
        {
          text:(h,s,subject)=>`${s.name} sets the notebook on the table and opens it to a clean page. 'Before we begin properly,' she says, 'I need a methodology.' She looks at you steadily. 'Two options. They produce different data and they require different things from me.' Her pen is already in her hand.

${subject?`Her subject — ${subject.name}, ${getStage(subject.lbs).label} at ${Math.round(subject.lbs)} lbs — is somewhere in the building right now, unaware that she's been chosen.`:'Her subject is somewhere in the building right now, unaware of having been chosen.'}`,
          choices:[
            {id:"feeder_focus",label:"Active Study — she feeds the subject directly",result:(s)=>`'Active Study.' She writes it at the top of the page. 'I maintain control of variables by introducing them directly. I feed them. I document both of us.' She underlines it. 'The data will be precise.'`,lbs:4,rel:6,flag:"feeder_focus"},
            {id:"feedee_focus",label:"Field Observer — she interviews a subject already growing",result:(s)=>`'Field Observer.' She writes it at the top of the page. 'I watch. I interview. I don't introduce variables — I document the ones already present.' She underlines it. 'The data will be honest.'`,lbs:3,rel:7,flag:"feedee_focus"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is very heavy — ${Math.round(subject?.lbs||100)} lbs — and the data being generated is already substantial. [placeholder: very heavy subject, first session]`
              :sid>=4
              ?`${subject?.name||'The subject'} is noticeably soft at ${Math.round(subject?.lbs||100)} lbs, still mobile. [placeholder: plump/heavy subject, first session]`
              :`${subject?.name||'The subject'} is slender at ${Math.round(subject?.lbs||100)} lbs — changes are early. [placeholder: slim/soft subject, first session]`;
            const focus=h.includes("feeder_focus")
              ?`The first active session is arranged. ${s.name} has brought food — more than the subject will expect. She has her notebook open on her knee.`
              :`The first observation session is scheduled. ${s.name} will say she's studying eating habits for a class project. This is not entirely false.`;
            return `${focus}\n\n${subDesc}\n\n${s.name} is ${Math.round(s.lbs)} lbs herself now. She has noted this in the margins.`;
          },
          choices:[
            {id:"precise",label:"Keep it clinical — establish baseline data",result:(s)=>`${s.name} stays clinical. Baselines recorded, variables isolated, her own reactions noted in a separate column. She is a scientist and this is a study. The notebook has three new pages by the end.`,lbs:5,rel:6,flag:"clinical"},
            {id:"personal",label:"Let a genuine interest show through the methodology",result:(s)=>`Something genuine surfaces — a question she asks twice, a notation in the margin that's less data and more observation. She goes back and underlines it later.`,lbs:3,rel:10,flag:"personal"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("feeder_focus")&&h.includes("personal"),text:`The first session is logged. The subject ate more than their baseline. The researcher ate more than hers. Both numbers are on the same page.\n\nShe closes the notebook with both hands. The study has begun.`,gainBonus:6,relBonus:8},
        {condition:()=>true,text:`First session complete. Notes taken. Baselines established. The study is formally open.\n\nShe dates the page.`,gainBonus:4,relBonus:6},
      ]
    },
    // stageIdx 1 — ~320 lbs — "Deepening Variables"
    {
      title:"Deepening Variables",
      phases:[
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs now — genuinely large. The notebook has expanded to a second volume. [placeholder: very heavy subject, stage 1]`
              :sid>=4
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — soft and growing. The trend is unmistakable to a trained observer. [placeholder: plump/heavy subject, stage 1]`
              :`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — still slim, changes early. ${s.name} has begun predicting the curve. [placeholder: slim/soft subject, stage 1]`;
            const focus=h.includes("feeder_focus")
              ?`The Active Study has been running for weeks. ${s.name} arrives to the session with a different bag — bigger. She has adjusted the protocol.`
              :`The Field Observer logs are meticulous. ${s.name} has begun conducting more formal interviews. The subject seems to enjoy the attention.`;
            return `${focus}\n\n${subDesc}\n\n${s.name} is ${Math.round(s.lbs)} lbs. She has noted — in a separate column, slightly smaller font — that her own intake has increased since the study began.`;
          },
          choices:[
            {id:"escalate",label:"Push the protocol further",result:(s)=>`She escalates. More food, longer sessions, more pointed questions. The data accelerates. Her own notebook entries get denser.`,lbs:8,rel:7,flag:"escalated"},
            {id:"maintain",label:"Hold the methodology steady",result:(s)=>`She holds the protocol steady. Discipline is the point. Variables controlled, progression documented, no drift. Her own numbers stay controlled too — for now.`,lbs:5,rel:9,flag:"maintained"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const qualifier=sid>=7?`massively`:(sid>=4?`visibly`:`subtly`);
            const subNote=subject?` — ${Math.round(subject.lbs)} lbs, ${getStage(subject.lbs).label}`:'';
            return `The subject has changed ${qualifier} since the study began${subNote}. ${s.name} has a chart in the back of the notebook correlating subject weight gain vs. session frequency.\n\n${h.includes("feeder_focus")?`She's also noted, in the smallest print in the notebook: her own weight is on the same chart.`:`She's also noted, below the main chart: she's been eating differently. 'Variable contamination,' she wrote. Then she crossed it out.`}`;
          },
          choices:[
            {id:"acknowledge_self",label:"She mentions she's been eating more too",result:(s)=>`'I need to note,' she says, 'that I've been eating more. I don't know if this is a contamination effect or a parallel response.' She writes it down. She weighs herself afterward. She writes that down too.`,lbs:7,rel:12,flag:"self_acknowledged"},
            {id:"focus_subject",label:"Keep the focus on the subject",result:(s)=>`She redirects to the subject data. 'The study is about the subject,' she says firmly. She doesn't reopen the margin note about her own numbers. The notebook is very full of subject data.`,lbs:5,rel:7,flag:"deflected"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("self_acknowledged"),text:`The notebook is three volumes now. Her own data is mixed into the third.\n\nShe dates the page and then sits with it for a long moment. The study and the subject have both grown considerably.`,gainBonus:8,relBonus:10},
        {condition:()=>true,text:`Session complete. New data. The study continues.\n\nShe closes the notebook.`,gainBonus:5,relBonus:7},
      ]
    },
    // stageIdx 2 — ~400 lbs — "Observer Effect"
    {
      title:"Observer Effect",
      phases:[
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — the changes are no longer subtle. They fill the room differently. [placeholder: very heavy subject, observer effect stage]`
              :sid>=4
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — rounded and growing. The study documents a clear upward trend. [placeholder: plump/heavy subject, observer effect stage]`
              :`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — still early stages. ${s.name}'s predictions show significant gain ahead. [placeholder: slim/soft subject, observer effect stage]`;
            return `Physics observation principle: the act of observing changes the thing being observed.\n\n${s.name} writes this at the top of a new section. She is ${Math.round(s.lbs)} lbs now. She says this is unrelated to the study. The notebook contains months of evidence to the contrary.\n\n${subDesc}`;
          },
          choices:[
            {id:"confront",label:"Ask the subject directly if they've noticed changes",result:(s)=>`The subject pauses. 'Yes,' they say. 'Is that what you wanted to know?' ${s.name} writes: 'Subject aware of changes. My emotional response: [also variable].'`,lbs:7,rel:11,flag:"confronted"},
            {id:"avoid",label:"Don't raise it — let the study proceed naturally",result:(s)=>`She doesn't raise it. The study is cleaner without it. She feeds the subject and takes her notes and doesn't comment.`,lbs:9,rel:6,flag:"avoided"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subNote=subject?`${subject.name} is ${Math.round(subject.lbs)} lbs — ${getStage(subject.lbs).label}. ${sid>=7?'Enormous now. The room is different. [placeholder]':sid>=4?'Noticeably heavy. The sessions have a different quality. [placeholder]':'Still early in the trend. But the trend is clear. [placeholder]'}`:'The subject data is in the notebook.';
            return `${s.name} reviews the observer effect entry. She has added a footnote in red pen:\n\n[This researcher is ${Math.round(s.lbs)} lbs. At study start: ${Math.round(s.startLbs||200)} lbs. The subject data and researcher data are, at this point, no longer cleanly separable.]\n\n${subNote}`;
          },
          choices:[
            {id:"dual_study",label:"The self-study is part of the research — lean into it",result:(s)=>`She rewrites the methodology section. 'Dual-subject longitudinal study.' Primary subject: external. Secondary subject: researcher. She sets the new draft beside the old one. This is more honest. She knows it is.`,lbs:8,rel:13,flag:"dual_study"},
            {id:"separate",label:"Separate the data rigorously — two clean studies",result:(s)=>`She creates a second notebook labelled 'Personal log.' For three days she keeps them separate. On the fourth day there is a note in the study notebook that begins 'per personal log.'`,lbs:6,rel:8,flag:"separated"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("dual_study"),text:`The methodology is rewritten. The study has a new title: *Dual-Subject Longitudinal Study in Appetite and Transformation.*\n\nBoth names are on the cover.`,gainBonus:10,relBonus:12},
        {condition:()=>true,text:`The session ends. The data is added to the notebook. She doesn't look at the personal log on the way out.\n\nShe thinks about it the whole way home.`,gainBonus:7,relBonus:8},
      ]
    },
    // stageIdx 3 — ~510 lbs — "The Data Becomes Personal"
    {
      title:"The Data Becomes Personal",
      phases:[
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — enormous, warm, occupying the room completely differently than at the study's start. [placeholder: very heavy subject, data becomes personal]`
              :sid>=4
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — heavy, moving differently now. The gain pattern is continuous. [placeholder: plump/heavy subject, data becomes personal]`
              :`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — the early growth is showing. The curve matches the prediction. [placeholder: slim/soft subject, data becomes personal]`;
            return `The notebook says: *The researcher's own responses have become a primary data point rather than a confound.*\n\n${s.name} is ${Math.round(s.lbs)} lbs. The original study proposal described the researcher as a neutral observer. She has written 'LOL' in the margin of this section, then crossed it out, then left it because the notation is accurate.\n\n${subDesc}`;
          },
          choices:[
            {id:"share_data",label:"Show the subject the full data — both of you",result:(s)=>`She shows the subject. All of it — their numbers, her numbers, the trend lines. The subject reads it for a long time. 'I knew,' they say. ${s.name} writes: 'Subject confirmed awareness. My response: [the notebook is running out of margin space].'`,lbs:9,rel:16,flag:"shared_data"},
            {id:"keep_private",label:"Keep the researcher data private for now",result:(s)=>`She keeps the personal log separate. The subject has looked at her differently for months but she doesn't confirm it. The data remains private. For now.`,lbs:7,rel:9,flag:"kept_private"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const focus=h.includes("feeder_focus")
              ?`The Active Study sessions are different now. The food is the same. The clinical frame is not quite intact. She still takes notes — including notes on the quality of her own attention.`
              :`The Field Observer protocol has long since become something else. The interviews are conversations. ${s.name} has stopped calling them observations in the log.`;
            return `${focus}\n\n${s.name} is ${Math.round(s.lbs)} lbs. The study is${h.includes("shared_data")?" fully bilateral now — two subjects, documented together.":" still nominally about the subject. She knows what it's actually about."}\n\n[placeholder: stage 3 phase 1 — researcher and subject emotional complexity]`;
          },
          choices:[
            {id:"commit",label:"Commit to the dual study fully — this is the work now",result:(s)=>`She rewrites the study title again. This time she doesn't show it to you. She just nods once, very firmly, and keeps writing.`,lbs:10,rel:14,flag:"committed"},
            {id:"clinical_distance",label:"Try to maintain some clinical distance",result:(s)=>`She pulls back. Two pages of very precise, controlled observations. Then on the last line: *Researcher's heart rate elevated during session. Noted.*`,lbs:7,rel:10,flag:"clinical_distance"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("shared_data")&&h.includes("committed"),text:`The dual study is the study now. She's made copies of everything and handed you the second copy.\n\nThe notebook is almost full. She already has a new one.`,gainBonus:12,relBonus:15},
        {condition:()=>true,text:`Session logged. The data is clear. Whatever she's telling herself about the methodology, the data is clear.\n\nShe closes the notebook.`,gainBonus:8,relBonus:10},
      ]
    },
    // stageIdx 4 — ~630 lbs — "Saturation Point"
    {
      title:"Saturation Point",
      phases:[
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs now — nearly immobile, colossal. The study's scale has outgrown any academic framing. [placeholder: very heavy subject, saturation point]`
              :sid>=4
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — very heavy, changed profoundly. [placeholder: plump/heavy subject, saturation point]`
              :`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — growing steadily. The trend is deep into positive territory. [placeholder: slim/soft subject, saturation point]`;
            return `The word in research methodology for what has happened here is *saturation* — the point at which new data no longer changes the conclusions because the conclusions are complete.\n\n${s.name} is ${Math.round(s.lbs)} lbs. She is, in her words, "past the saturation point of any methodology that predates me."\n\n${subDesc}`;
          },
          choices:[
            {id:"beyond_method",label:"Go beyond the methodology — this is something else now",result:(s)=>`She closes the methodology section for good. 'The study is done,' she says. 'What comes after — I don't have a word for that yet.' She opens a fresh page. Blank. She sits with it for a long time.`,lbs:11,rel:14,flag:"beyond_method"},
            {id:"document",label:"Document everything — let the data speak",result:(s)=>`She keeps writing. Everything. She has a clinical vocabulary for all of it and she uses it precisely. The notebook is very thick now.`,lbs:9,rel:11,flag:"fully_documented"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const subNote=subject?`${subject.name} is ${Math.round(subject.lbs)} lbs — ${getStage(subject.lbs).label}. ${h.includes("feeder_focus")?'The subject has been fed well. The study shows this.':'The subject has been watched carefully. The study shows this.'}`:'';
            return `${s.name} is ${Math.round(s.lbs)} lbs. The study has lasted longer than the original proposal's timeline by a factor of several.\n\n${h.includes("beyond_method")?`She has started writing something different — not observations, not data. Something that doesn't have a methodology because it doesn't need one.`:`The data is complete. Every number is logged. The study is, technically, one of the most rigorous longitudinal records of its kind.`}\n\n${subNote}\n\n[placeholder: stage 4 phase 1 — approach to conclusion]`;
          },
          choices:[
            {id:"write_up",label:"Begin the formal write-up",result:(s)=>`She begins typing. She deletes the abstract and starts with the conclusion. The conclusion is better.`,lbs:10,rel:12,flag:"writing_up"},
            {id:"final_session",label:"One more session — the last data point",result:(s)=>`'One more session. Final data point. I want the last entry to be correct.' She is already writing the session notes before the session has begun.`,lbs:12,rel:10,flag:"final_session"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("beyond_method"),text:`The blank page is not blank anymore.\n\nShe reads you the first line of whatever this is. It is not a study. It is not a diary. It is something she will need a new word for.\n\nYou tell her you would like to read it when it is done.`,gainBonus:14,relBonus:16},
        {condition:()=>true,text:`The data is in. The study is reaching its natural conclusion.\n\nShe saves the document and backs it up in three places.`,gainBonus:10,relBonus:12},
      ]
    },
    // stageIdx 5 — ~820 lbs — "The Final Entry"
    {
      title:"The Final Entry",
      phases:[
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs. The data from their arc fills the final volume. [placeholder: very heavy subject, final stage]`
              :sid>=4
              ?`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs. They have grown beyond the parameters of the original proposal. [placeholder: plump/heavy subject, final stage]`
              :`${subject?.name||'The subject'} is ${Math.round(subject?.lbs||100)} lbs — still earlier in the arc. The study captures both data sets. [placeholder: slim/soft subject, final stage]`;
            return `${s.name} is ${Math.round(s.lbs)} lbs. She fills the office chair completely. She looks like the reason the chair exists.\n\n${h.includes("feeder_focus")?`The Active Study produced a subject who changed profoundly. It also produced a researcher who changed profoundly. The final report argues these facts are inseparable.`:`The Field Observer methodology produced a data set of extraordinary quality. It also produced a researcher who is no longer separable from the field. She has noted this.`}\n\n${subDesc}`;
          },
          choices:[
            {id:"conclude",label:"Write the final entry — close the study formally",result:(s)=>`She writes the final entry. Weight: ${Math.round(s.lbs)} lbs. Conclusion: *The study is complete. All hypotheses confirmed or productively complicated. The researcher is a different person than the researcher who opened this notebook.* She underlines the last sentence.`,lbs:12,rel:14,flag:"concluded"},
            {id:"continue_study",label:"The study doesn't end — this is a lifetime's work",result:(s)=>`She opens a new volume. 'It doesn't end. A study like this doesn't end. It just gets handed down.' She dates the new page and starts writing.`,lbs:10,rel:16,flag:"continued"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const subLine=subject?`She looks at ${subject.name}. ${Math.round(subject.lbs)} lbs. ${getStage(subject.lbs).label}. 'The best data in the study,' she says. 'Every session.'`:'';
            return `The notebook collection occupies an entire shelf. ${s.name} runs one hand along the spines.\n\n${h.includes("concluded")?`'The study is complete. The methodology held. The conclusions are beyond the scope of what I expected when I opened the first notebook.' She looks at her hands. 'But the data doesn't lie.'`:`'The study continues. I'll be adding data for a very long time.' She looks at the new notebook, already half-full. 'I think the subject will too.'`}\n\n${subLine}\n\n[placeholder: final stage phase 1 — resolution]`;
          },
          choices:[
            {id:"publish",label:"Suggest she publish — this deserves an audience",result:(s)=>`'Under a pseudonym,' she says immediately. 'And with IRB approval from a sympathetic institution.' She pulls out a list of sympathetic institutions she's been maintaining. It is a long list.`,lbs:8,rel:18,flag:"published"},
            {id:"private_forever",label:"Keep it between you — some studies are too personal",result:(s)=>`She nods once. 'Between us. The data doesn't need an audience to be true.' She closes the final volume. She holds it. 'It's true.'`,lbs:6,rel:20,flag:"kept_private_final"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("concluded")&&h.includes("published"),text:`She hands you the abstract. It is going to change some things for some people in some institutions.\n\nThe study is done. Something else has begun.`,gainBonus:18,relBonus:20},
        {condition:h=>h.includes("continued"),text:`The new volume is already substantial. The study will go on as long as she does.\n\nShe closes the notebook for the night — not forever — and looks at you with the expression of someone who has found the work she was built for.\n\n'Thank you. For the direction.'`,gainBonus:16,relBonus:22},
        {condition:()=>true,text:`The notebooks are on the shelf. The data is complete or ongoing, depending on how you ask.\n\nShe has always been one of the most interesting people in the building.`,gainBonus:12,relBonus:16},
      ]
    },
  ],
  // ── ECED: homeroom_queen ──────────────────────────────────────────────────
  homeroom_queen:[
    // stageIdx 0 — "The First Tuesday"
    {
      title:"The First Tuesday",
      phases:[
        {
          text:(h,s)=>`${s.name} is in the classroom at ${Math.round(s.lbs)} pounds, apron tied, counter clear. The girls will arrive in twenty minutes. You're here early enough to help decide what gets made.

"I was thinking banana bread," she says. "But I could do more." She opens the cabinet. The cabinet is very well stocked.`,
          choices:[
            {id:"recipe_simple",label:"Banana bread — classic, nothing unusual",result:(s)=>`She makes the banana bread. It smells perfect. The classroom fills with warm butter and sugar and the specific comfort of something handmade. Daisy taste-tests a slice and sets the rest out carefully. Her belly presses the counter edge as she works.`,lbs:3,rel:5,flag:"recipe_simple"},
            {id:"recipe_rich",label:"Banana bread plus cinnamon rolls — go big",result:(s)=>`She makes both. The cinnamon rolls take longer and require a second taste-test round, which Daisy conducts thoroughly. By the time the girls arrive, she's a full piece ahead and the room smells like a bakery.`,lbs:7,rel:7,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Whole grain muffins — presentable to parents",result:(s)=>`She makes the muffins. They're good — genuinely good, she's good at everything — but she adds cream cheese frosting because "it needed something," and now the plausibly healthy framing has a rich, sweet asterisk.`,lbs:2,rel:6,flag:"recipe_cover"},
          ]
        },
        {
          text:(h,s)=>`The girls arrive. Kayla comes in first and sees the spread and doesn't ask what it is — just sits down and starts eating. Bri follows her lead. Sofia arrives last and has already spotted the cinnamon rolls from the doorway.

Daisy is behind the counter, warm and purposeful, refilling things before they're empty.`,
          choices:[
            {id:"watched",label:"Watch Daisy watch them eat",result:(s)=>`She doesn't look at you. She looks at them. There's something careful and pleased in her expression — the satisfaction of a calculation that came out right. Kayla has had three pieces. Bri hasn't stopped. Sofia is on something like a fourth.`,lbs:5,rel:8,flag:"watched"},
            {id:"helped_serve",label:"Help serve — pass things around",result:(s)=>`You help pass things around. Daisy gives you a look that might be gratitude, might be you-figured-it-out. The session is easy and warm and loud. By the end, everyone — including Daisy — is noticeably fuller.`,lbs:4,rel:11,flag:"helped_served"},
          ]
        },
        {
          text:(h,s)=>`Pickup. The moms arrive. Mrs. Calloway stands at the window for a beat longer than necessary, looking at the table, looking at the girls, looking at Daisy.

She doesn't say anything. She takes her daughter home. Mrs. Monroe, at the window behind her, catches Daisy's eye and gives her a small nod.`,
          choices:[
            {id:"played_safe",label:"Smile and wave — nothing to see here",result:(s)=>`Daisy waves. Mrs. Calloway moves on. Mrs. Monroe pauses to say "that smells wonderful," and Daisy hands her a wrapped piece for the drive home. Nobody asks any questions.`,lbs:3,rel:7,flag:"played_safe"},
            {id:"offered_leftovers",label:"Offer the moms the leftovers",result:(s)=>`Daisy offers the container. Mrs. Calloway hesitates one beat and then accepts. Mrs. Monroe accepts immediately and with visible enthusiasm. The leftovers are gone before they reach the parking lot, by Daisy's estimation.`,lbs:4,rel:9,flag:"offered_leftovers"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_rich")&&h.includes("helped_served"),text:(h,s,gain)=>`The first real Tuesday. Daisy is ${Math.round(s.lbs+gain)} pounds and pleased with herself, her apron dusted with flour, the counter clean. "They ate everything," she says. She sounds like she expected exactly this. She makes a note in the small notebook she keeps in her apron pocket.`,gainBonus:4,relBonus:8,classGain:18,momGain:6},
        {condition:h=>h.includes("recipe_rich"),text:(h,s,gain)=>`Good session. Daisy is ${Math.round(s.lbs+gain)} pounds and already planning next week's batch. The notebok comes out. The pen moves.`,gainBonus:3,relBonus:6,classGain:15,momGain:4},
        {condition:()=>true,text:(h,s,gain)=>`The first Tuesday is done. Daisy is ${Math.round(s.lbs+gain)} pounds and warm and she's already thinking about what to make next week.`,gainBonus:2,relBonus:5,classGain:8,momGain:2},
      ]
    },
    // stageIdx 1 — "Something's Different" (classWeight ≥ 50)
    {
      title:"Something's Different",
      phases:[
        {
          text:(h,s)=>`Daisy is at the counter when you arrive. ${Math.round(s.lbs)} pounds, apron on, something already in the oven. She looks up and says: "Kayla arrived fifteen minutes early today. Just walked in and sat down." A pause. "That's new."

The recipe book is open to something ambitious.`,
          choices:[
            {id:"recipe_simple",label:"Something familiar — they know what they like now",result:(s)=>`She makes what they like. It's efficient — no introductions needed, no hesitation. Kayla is already waiting at the table when the first batch comes out.`,lbs:4,rel:6,flag:"recipe_simple"},
            {id:"recipe_rich",label:"Something richer — they're ready for more",result:(s)=>`She makes the rich version. Double the butter. The oven fills the classroom with something that smells specifically excellent. She taste-tests twice. The notebook comes out.`,lbs:8,rel:7,flag:"recipe_rich"},
            {id:"recipe_special",label:"A special recipe — something you haven't tried before",result:(s)=>`She makes something new from the back of the recipe book — caramelized peach upside-down cake, which she's been holding in reserve. "For when they were ready," she says. She's been waiting for this moment.`,lbs:10,rel:9,flag:"recipe_special"},
            {id:"recipe_cover",label:"Whole grain — something you could explain if asked",result:(s)=>`She makes the defensible version. It's genuinely good. She adds a cream cheese layer anyway because "the base needed something." The explainability is theoretical at this point.`,lbs:3,rel:7,flag:"recipe_cover"},
          ]
        },
        {
          text:(h,s)=>`The session is different today. Kayla doesn't wait to see what others do — she takes first helpings with the ease of someone who's been here before. Bri's been eating more quickly. Sofia has found her spot at the table and settled into it like it was always hers.

Daisy moves through the room at ${Math.round(s.lbs)} pounds, warm and unhurried.`,
          choices:[
            {id:"watched",label:"Notice what's changed about each of them",result:(s)=>`You notice. Kayla's jeans don't fit the same way — there's a gap at the back, her hips wider against the denim. Bri's belly presses against the table edge in a way that's new. Sofia fills the chair differently. Daisy is watching you notice. "Yes," she says. Just that.`,lbs:5,rel:10,flag:"watched"},
            {id:"fed_more",label:"Help pass things — keep the plates full",result:(s)=>`You keep the plates full. Daisy gives you the look — gratitude, partnership, something warm. Sofia finishes a second serving before anyone else finishes their first. The classroom is very warm.`,lbs:7,rel:9,flag:"fed_more"},
          ]
        },
        {
          text:(h,s)=>`Pickup. The moms are different too. Mrs. Calloway stands at the window for a beat longer than last week. Mrs. Reyes is already inside before the session is technically over — she says she "was early," and she is eating one of the pieces from the serving plate with a casualness that suggests this wasn't the first time she's helped herself.

Mrs. Monroe arrives last, parks badly, and waves through the window with both hands.`,
          choices:[
            {id:"deflected_mom",label:"Redirect Mrs. Calloway — point to Sofia and compliment the class",result:(s)=>`You point out that Sofia has been really engaged this week. Mrs. Calloway's attention shifts to her daughter. Daisy says something warm and specific about the girls' progress. The question Mrs. Calloway was forming dissolves.`,lbs:4,rel:8,flag:"deflected_mom"},
            {id:"invited_inside",label:"Invite the moms in — lean into it",result:(s)=>`Daisy gestures them in. Mrs. Reyes comes immediately. Mrs. Monroe is already halfway through the door. Mrs. Calloway follows with her arms crossed — then uncrosses them when she smells what's been made. She takes a piece. She eats it standing up.`,lbs:5,rel:6,flag:"invited_inside"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched"),text:(h,s,gain)=>`Tuesday has settled into a ritual. Daisy is ${Math.round(s.lbs+gain)} pounds and the notebook has three more pages of notes — not just recipes, but observations. She doesn't explain the observations. She adds them to the record.`,gainBonus:6,relBonus:10,classGain:22,momGain:9},
        {condition:h=>h.includes("recipe_rich")||h.includes("recipe_special"),text:(h,s,gain)=>`Good session. The richness registered. Daisy is ${Math.round(s.lbs+gain)} pounds and the notebook fills another page.`,gainBonus:4,relBonus:7,classGain:18,momGain:7},
        {condition:()=>true,text:(h,s,gain)=>`Another Tuesday. Daisy is ${Math.round(s.lbs+gain)} pounds and the pattern is becoming established.`,gainBonus:2,relBonus:5,classGain:12,momGain:4},
      ]
    },
    // stageIdx 2 — "Mrs. Calloway's Question" (momWeight ≥ 30)
    {
      title:"Mrs. Calloway's Question",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and she looks comfortable at the counter, comfortable in the apron, comfortable in the classroom in a way that suggests she's stopped thinking of it as anyone else's space. She has the recipe book open to something indulgent.

"Mrs. Calloway asked me yesterday about what I'm making," she says. "I told her it was curriculum-aligned." She looks at you. "Is there a curriculum it's aligned with?"`,
          choices:[
            {id:"recipe_rich",label:"Make the rich batch regardless — she's not going to stop",result:(s)=>`She makes the rich batch. The classroom fills. She taste-tests once from the pan, then again to be sure. "It's good," she says. She means: I know it is. The notebook confirms it.`,lbs:9,rel:8,flag:"recipe_rich"},
            {id:"recipe_special",label:"Try the cream-filled brioche — this is the moment",result:(s)=>`She makes the cream-filled brioche, which has been in the recipe book since the second week. It requires forty minutes and two rounds of taste-testing. She eats more during testing than she'd planned. The result is extraordinary.`,lbs:12,rel:10,flag:"recipe_special"},
            {id:"recipe_cover",label:"Make something genuinely nutritious — cover your tracks",result:(s)=>`She makes the whole grain batch, which is genuinely nutritious, and then adds a cream glaze because "it needed finishing." The nutritious framing is intact. The glaze adds calories faster than the framing removes them.`,lbs:4,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Keep it simple — don't escalate right now",result:(s)=>`She makes the simple batch. It's good — it's always good — and it keeps the profile low. Mrs. Calloway's question hangs in the air but doesn't become a follow-up.`,lbs:5,rel:6,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`The session is warm and easy. Bri's uniform doesn't quite tuck anymore — she's stopped trying. Kayla has started sitting differently, wider, like she's found the right angle for her hips. Sofia moves through the room with the confidence of someone who has decided exactly what kind of person she is and is correct about it.

Daisy watches all of this from the counter, ${Math.round(s.lbs)} pounds and attentive.`,
          choices:[
            {id:"noted_changes",label:"Say something about how well the class has been going",result:(s)=>`You say it genuinely. Daisy looks at you with an expression that's briefly and completely unguarded. "I think so too," she says. Then she looks back at the girls and her expression changes to something careful and warm and focused.`,lbs:5,rel:12,flag:"noted_changes"},
            {id:"pushed_more",label:"Make sure everyone has seconds before the session ends",result:(s)=>`You help make sure the plates don't empty. Sofia doesn't need help — she's been watching the supply — but Bri and Kayla accept second servings with the ease of people who've stopped thinking twice about it.`,lbs:7,rel:9,flag:"pushed_more"},
          ]
        },
        {
          text:(h,s)=>`Pickup. Mrs. Calloway is inside today — she said she needed to "speak with the student teacher" — and she's standing with her arms crossed at a slight angle that suggests she's trying to look more formal than she feels. Her cardigan pulls slightly at the waist.

"I wanted to ask," she begins, "about the enrichment activities."`,
          choices:[
            {id:"deflected_question",label:"Answer warmly and specifically — focus on the academic framing",result:(s)=>`Daisy answers before you can. "Nutritional impact on attention and mood is actually an emerging area in educational research," she says, completely calmly. "The class has been more engaged on Tuesdays than any other day of the week." Mrs. Calloway blinks. "That's... good," she says. She accepts the container Daisy hands her. She eats a piece on the way to her car.`,lbs:4,rel:10,flag:"deflected_question"},
            {id:"direct_question",label:"Let Daisy handle it honestly — she deserves to own this",result:(s)=>`"I love feeding them," Daisy says. Plainly, warmly, completely unashamed. Mrs. Calloway stares at her for a full three seconds. Then she says: "Kayla does look forward to Tuesdays." It's not an accusation. It's almost a compliment. The cardigan pulls a little more as she breathes.`,lbs:5,rel:7,flag:"direct_question"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("deflected_question"),text:(h,s,gain)=>`Mrs. Calloway went home with a container and didn't send a follow-up email. Daisy is ${Math.round(s.lbs+gain)} pounds and the notebook records this as a successful navigation. The special recipe worked. The deflection worked. The session goes in the record as optimal.`,gainBonus:8,relBonus:12,classGain:20,momGain:14},
        {condition:h=>h.includes("deflected_question"),text:(h,s,gain)=>`Mrs. Calloway's question has been answered. Daisy is ${Math.round(s.lbs+gain)} pounds and the Tuesday tradition continues, uninterrupted.`,gainBonus:5,relBonus:9,classGain:16,momGain:10},
        {condition:()=>true,text:(h,s,gain)=>`Mrs. Calloway went home. Tuesday continues. Daisy is ${Math.round(s.lbs+gain)} pounds and adding notes to the record.`,gainBonus:3,relBonus:6,classGain:12,momGain:7},
      ]
    },
    // stageIdx 3 — "Wide Desks" (classWeight ≥ 120)
    {
      title:"Wide Desks",
      phases:[
        {
          text:(h,s)=>`The school sent over the wider writing desks from the science room two weeks ago. Sofia has claimed the largest one and moved it to her preferred spot with the ease of someone who knows her own requirements. She spreads wide into it. It looks correct.

Daisy is ${Math.round(s.lbs)} pounds at the counter, looking satisfied. "Ready?" she says.`,
          choices:[
            {id:"recipe_special",label:"Make the peach upside-down cake — Sofia's been hinting",result:(s)=>`She makes the peach upside-down cake. Sofia sees the pan and makes a small sound of recognition. Daisy's expression is briefly, completely, genuinely pleased. She taste-tests three times before serving.`,lbs:11,rel:10,flag:"recipe_special"},
            {id:"recipe_rich",label:"Double batch this week — there's enough demand",result:(s)=>`She makes double. It disappears at the rate double would. She is not surprised. The notebook records the batch size and the consumption speed and the correlation between them.`,lbs:8,rel:8,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Something defensible — Mrs. Calloway might stop by again",result:(s)=>`She makes the defensible version plus a cream sauce that is technically a topping and therefore separately categorized. Mrs. Calloway does stop by. She has the topping separately, then the base, then some combination.`,lbs:5,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Standard batch — keep the routine solid",result:(s)=>`The standard batch. They eat it fast now, all three of them, with no waiting period between servings. The routine is established. The consumption is efficient.`,lbs:5,rel:6,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`Bri can't tuck her uniform anymore. She tried earlier in the week, apparently — Kayla told Daisy during the session with the specific detail of someone who found this information useful. Bri herself is currently eating the second piece without any apparent concern about the uniform situation.

"I told her it looked nice," Daisy says. She looks at you. "It did look nice."`,
          choices:[
            {id:"agreed",label:"Agree — it does look nice",result:(s)=>`You agree. Daisy's expression resolves into something genuinely warm. "They're all doing so well," she says, and she means something specific by this. The notebook comes out and a note gets added.`,lbs:6,rel:12,flag:"agreed"},
            {id:"more_food",label:"Put another piece on Bri's side — practical",result:(s)=>`You put another piece in front of Bri. She looks at it and then at you and then eats it with the ease of someone who has stopped asking permission. Daisy sees this and nods once, approvingly.`,lbs:8,rel:9,flag:"more_food"},
          ]
        },
        {
          text:(h,s)=>`Mrs. Monroe is inside again — she came in early, she says, to help set up, and she did help set up but she has also eaten four pieces in the process and is currently on her fifth. She fills the chair with a warm, settled comfort that makes the room feel like it's been hers for years.

Mrs. Calloway is watching from near the door.`,
          choices:[
            {id:"enlisted_monroe",label:"Let Mrs. Monroe handle Mrs. Calloway — she's been doing it naturally",result:(s)=>`Mrs. Monroe says something warm and funny about the session and Mrs. Calloway laughs despite herself. The suspicion evaporates. Mrs. Monroe hands her a container and she takes it with both hands.`,lbs:5,rel:10,flag:"enlisted_monroe"},
            {id:"deflected_mom",label:"Pull Mrs. Calloway into a conversation about the desk upgrade",result:(s)=>`You bring up the desk situation. Mrs. Calloway has opinions about the desks — she's been meaning to say something about the desk request actually — and while she's explaining them, she's eating, and by the end she's forgotten the question she came in with.`,lbs:4,rel:9,flag:"deflected_mom"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("enlisted_monroe"),text:(h,s,gain)=>`The peach upside-down cake, Sofia's desk, Mrs. Monroe managing Mrs. Calloway with the ease of someone who has been managing things for years — Daisy is ${Math.round(s.lbs+gain)} pounds and the notebook records this as the best session yet.`,gainBonus:10,relBonus:13,classGain:24,momGain:16},
        {condition:h=>h.includes("enlisted_monroe"),text:(h,s,gain)=>`Mrs. Monroe is an asset. Daisy is ${Math.round(s.lbs+gain)} pounds and the dynamic has shifted. Tuesday has allies now.`,gainBonus:6,relBonus:10,classGain:18,momGain:12},
        {condition:()=>true,text:(h,s,gain)=>`Wide desks, fuller girls, Tuesday ongoing. Daisy is ${Math.round(s.lbs+gain)} pounds and adding pages.`,gainBonus:4,relBonus:7,classGain:14,momGain:8},
      ]
    },
    // stageIdx 4 — "The Group Chat" (momWeight ≥ 70)
    {
      title:"The Group Chat",
      phases:[
        {
          text:(h,s)=>`Mrs. Monroe told Daisy about the group chat. "We rate your recipes every week," she said, laughing. "The cinnamon rolls are currently tied with the peach upside-down cake." She offered to show Daisy the thread. Daisy said yes.

She's shown you the thread. It is detailed, enthusiastic, and includes a recurring argument between Mrs. Reyes and Mrs. Monroe about the merits of cream cheese versus buttercream frosting that has been ongoing for six weeks.

Daisy is ${Math.round(s.lbs)} pounds at the counter, the recipe book open to a new section.`,
          choices:[
            {id:"recipe_special",label:"Make something the chat hasn't seen yet — surprise them",result:(s)=>`She makes the cardamom honey cake, which has been in the recipe book since the beginning and which she's been saving. She taste-tests four times. It's extraordinary. She knows it's extraordinary. The notebook records the specific moment of knowing.`,lbs:13,rel:11,flag:"recipe_special"},
            {id:"recipe_rich",label:"Make the cinnamon rolls — settle the debate",result:(s)=>`She makes the cinnamon rolls, which were previously tied with the peach upside-down cake. Both items are now represented. The debate will presumably continue on a more informed basis.`,lbs:9,rel:9,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Make both disputed items — let the chat decide for real",result:(s)=>`She makes both. The classroom smells like an argument about to be resolved. Mrs. Monroe arrives early to vote in person. Mrs. Reyes arrives one minute later. The debate intensifies.`,lbs:7,rel:12,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Stick to the classics — reliability is also a virtue",result:(s)=>`She makes the banana bread and the standard brownies. Both are received with the enthusiasm of things that have become expected and therefore trusted. The chat rates them highly.`,lbs:6,rel:7,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`The session is full. All three girls, and Mrs. Monroe who has stopped waiting for official pickup and just comes in now. Mrs. Reyes follows her in and sits at the table.

Sofia is enormous and completely comfortable. Bri's belly is in her lap, warm and settled. Kayla's hips fill the wider chair she's claimed. The room is full of people who belong here.`,
          choices:[
            {id:"watched",label:"Take it in — this is what Daisy has been building",result:(s)=>`You look at the room. Daisy sees you looking. She's at the counter, ${Math.round(s.lbs)} pounds, warm and present and clearly full from the session's test runs. She doesn't say anything. She smiles. It's a specific kind of smile.`,lbs:6,rel:14,flag:"watched"},
            {id:"helped_serve",label:"Help Daisy serve — keep everything moving",result:(s)=>`You help. The session flows with the ease of something that has been running long enough to find its own rhythm. Daisy works around you like you've always been part of it.`,lbs:8,rel:11,flag:"helped_serve"},
          ]
        },
        {
          text:(h,s)=>`Mrs. Calloway brings preserves for the second time. Homemade ones, labeled in her handwriting. She sets them on the counter without ceremony and says: "Kayla mentioned you run out of butter sometimes. I thought you could use these." She is wearing the wide cardigan. She is not hiding anything. Her hips are visible and she seems to have stopped trying to manage their visibility.

"Thank you," Daisy says. "These are perfect."`,
          choices:[
            {id:"enlisted_monroe",label:"Let the moment land — this is a truce",result:(s)=>`Nobody says anything important. Mrs. Calloway takes a piece from the serving plate, stands for a moment in the warm room, and then sits down at the table. Mrs. Monroe shifts to make room. Mrs. Calloway says thank you.`,lbs:5,rel:13,flag:"enlisted_monroe"},
            {id:"deflected_mom",label:"Make conversation — welcome her properly",result:(s)=>`You make conversation. Daisy makes tea. Mrs. Calloway sits down and talks about preserves and about Kayla and about something she saw at the grocery store. She eats two pieces without counting.`,lbs:4,rel:12,flag:"deflected_mom"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched"),text:(h,s,gain)=>`The group chat will have something new to rate. Daisy is ${Math.round(s.lbs+gain)} pounds and the notebook has become something between a recipe record and a room-full-of-people record. She's not sure when this happened. She's not going to stop.`,gainBonus:10,relBonus:14,classGain:26,momGain:18},
        {condition:h=>h.includes("recipe_special")||h.includes("recipe_rich"),text:(h,s,gain)=>`Good session. The group chat will have strong feelings about this one. Daisy is ${Math.round(s.lbs+gain)} pounds and ready for next week.`,gainBonus:7,relBonus:10,classGain:20,momGain:14},
        {condition:()=>true,text:(h,s,gain)=>`The group chat has new material. Daisy is ${Math.round(s.lbs+gain)} pounds and Tuesday continues.`,gainBonus:4,relBonus:7,classGain:14,momGain:10},
      ]
    },
    // stageIdx 5 — "End of Term" (classWeight ≥ 200 && momWeight ≥ 130)
    {
      title:"End of Term",
      phases:[
        {
          text:(h,s)=>`End of term. The last official Tuesday. Daisy is ${Math.round(s.lbs)} pounds and she has been in the classroom since six in the morning, making everything. The counter is full. The oven is still running. It smells like every Tuesday at once.

"I made everything," she says. "Everything I know how to make." She looks at the counter. "I may have made too much."

She has not made too much.`,
          choices:[
            {id:"recipe_special",label:"The cardamom honey cake AND the peach upside-down cake AND the cinnamon rolls",result:(s)=>`She made all three. She taste-tested all three. She made additional portions of the ones that required a second taste test. She is noticeably full before the session even starts and she looks serene about it.`,lbs:14,rel:12,flag:"recipe_special"},
            {id:"recipe_rich",label:"Double everything — it's the last one",result:(s)=>`Double everything. Twice the cinnamon rolls, twice the banana bread, twice the peach cobbler. She ate while she baked. She is, even at ${Math.round(s.lbs)} pounds, visibly full before anyone else arrives.`,lbs:11,rel:10,flag:"recipe_rich"},
          ]
        },
        {
          text:(h,s)=>`Everyone arrives. All six of them — Kayla, Bri, Sofia, Mrs. Calloway, Mrs. Reyes, Mrs. Monroe — all in the room at once, which hasn't happened organically since the formal event was established. The room is warm and loud and full.

Sofia fills her wide desk completely, her belly round and heavy and comfortable. Bri's belly rests soft on her thighs. Kayla's hips spread wide in her chair. Mrs. Calloway is in the good cardigan that pulls across the shoulders now and she is not pulling it. Mrs. Reyes has stopped checking her phone. Mrs. Monroe brought wine and two kinds of preserves and is currently the loudest person in the room.

Daisy is behind the counter at ${Math.round(s.lbs)} pounds, warm and enormous and at the center of all of it.`,
          choices:[
            {id:"watched_all_six",label:"Watch Daisy in the room she built",result:(s)=>`She doesn't notice you watching. She's busy — refilling, adjusting, handing Mrs. Monroe a fork when she asks for one, telling Kayla that yes, there are more cinnamon rolls, yes, absolutely. She moves through the room with the ease of someone who has been here so many times that it has become part of her. It has become part of her. She has become part of it.`,lbs:8,rel:16,flag:"watched_all_six"},
            {id:"joined_table",label:"Sit at the table — be part of it",result:(s)=>`You sit at the table. Everyone shifts slightly to make room, not reluctantly. Daisy sees you and her expression does something complicated and warm. She brings you a plate without asking what you want. She knows what you want. You eat everything on it.`,lbs:10,rel:14,flag:"joined_table"},
          ]
        },
        {
          text:(h,s)=>`An hour later. Everything is gone. The moms are still at the table, talking. The girls are in various stages of comfortable fullness. Daisy is sitting — she does this on Tuesdays, settles into the wide chair at the end of the room — and her belly is full and warm in her lap and she looks like someone who has reached a natural conclusion.

Mrs. Monroe says: "Same time next year." It's not a question.

Daisy looks at you.`,
          choices:[
            {id:"committed_to_next_year",label:"Tell her yes — this is happening again",result:(s)=>`"Same time next year," you say. Daisy looks at you with an expression that's briefly and completely unguarded. "Next year," she says, "I'm going to need a bigger classroom." She means it practically. She means it every other way too.`,lbs:6,rel:18,flag:"committed_to_next_year"},
            {id:"let_daisy_answer",label:"Let Daisy answer for herself",result:(s)=>`Daisy answers. "Yes," she says, without hesitation. She looks at the room — six people, full and warm, all there because of Tuesday mornings and banana bread and her. "Yes," she says again, quieter. "I think next year I'll need more counter space."`,lbs:5,rel:20,flag:"let_daisy_answer"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched_all_six")&&h.includes("committed_to_next_year"),text:(h,s,gain)=>`End of term. Six people in the room. Everything made and eaten. Daisy is ${Math.round(s.lbs+gain)} pounds and enormous and flour-dusted and completely at ease with all of it. The notebook has a final entry: *All six. End of term. Everything eaten. Next year: bigger classroom.*

She adds: *I don't regret any of it. Not one bite.*

The session closes. Next year the classroom will be bigger. Next year she will be bigger. The Tuesday tradition is officially permanent.`,gainBonus:18,relBonus:22,classGain:30,momGain:20},
        {condition:h=>h.includes("watched_all_six")||h.includes("joined_table"),text:(h,s,gain)=>`End of term. All six in the room. Daisy is ${Math.round(s.lbs+gain)} pounds and the room is warm and the notebook records a successful year. Next year will be bigger in every sense.`,gainBonus:12,relBonus:16,classGain:24,momGain:16},
        {condition:()=>true,text:(h,s,gain)=>`End of term. Daisy is ${Math.round(s.lbs+gain)} pounds and the first year is complete. Everything was eaten. Everyone came back. The tradition is real.`,gainBonus:8,relBonus:12,classGain:18,momGain:12},
      ]
    },
  ],

  // ── GAMER: ranked_feedee ──────────────────────────────────────────────────
  ranked_feedee:[
    // Stage 0 — ~258 lbs — "First Order"
    {
      title:"First Order",
      phases:[
        {
          text:(h,s)=>`The queue timer ticks down. ${s.name} is ${Math.round(s.lbs)} pounds in her chair, headset on, watching the loading screen. There's an order placed — she did it automatically, ten seconds after logging in. The session is starting. The only question is what kind of session it's going to be.`,
          choices:[
            {id:"go_big",label:"Go big — full order, everything",result:`The order is sent. A lot of food. More than she'd normally justify. She's already in queue so she's already committed, and this is fine, this is normal, this is just what happens when the sessions run long.`,lbs:4,rel:3,flag:"big_order"},
            {id:"keep_light",label:"Keep it simple — something quick",result:`Chips, energy drink, the basics. She doesn't want anything that'll slow her down. There's a game to play and she wants her hands free.`,lbs:2,rel:2,flag:"light_order"},
          ]
        },
        {
          text:(h,s)=>`The food arrives. New driver — the receipt says Rae. She's quick and doesn't say much, just confirms the order and leaves. The match starts. ${s.name} eats automatically, controller in hand, the food disappearing between death timers and cooldown waits. ${h.includes('big_order')?'The big order is getting worked through faster than expected.':'The lighter spread is almost gone already.'}`,
          choices:[
            {id:"stay_focused",label:"Eat between timers — stay locked in",result:`She manages it — eating precisely, strategically, only when the game allows. She plays better fed. She always plays better fed. She's noting this.`,lbs:5,rel:4,flag:"focused_session"},
            {id:"eat_through",label:"Just eat through it — worry about the game later",result:`The food comes first. She tilts through two games while full and then something clicks and she plays clean and wins the next two. It worked. Somehow.`,lbs:8,rel:3,flag:"eat_through"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("focused_session"),text:(h,s,gain)=>`The session closes. ${s.name} is ${Math.round(s.lbs+gain)} pounds in the chair and the tally is: one rank gained, everything ordered consumed, and a delivery receipt with 'have a good game' written on it in pen. She reads that last part twice.`,gainBonus:5,relBonus:8,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session over. Food gone. ${s.name} is ${Math.round(s.lbs+gain)} pounds and more than a little full. She's going to order from that place again. She doesn't need to decide this. She already knows.`,gainBonus:3,relBonus:6,startsSession:true},
      ]
    },
    // Stage 1 — ~340 lbs — "She Added Extras"
    {
      title:"She Added Extras",
      phases:[
        {
          text:(h,s)=>`The order arrives. Rae sets it down — and then sets a second thing down beside it, unprompted. "Got the order wrong on a previous delivery," she says. "These are on us." She does not explain further. She leaves. ${s.name}, ${Math.round(s.lbs)} pounds in her chair, looks at the extras. They're exactly the dessert thing she's been eyeing on the menu for three weeks.`,
          choices:[
            {id:"eat_extras_first",label:"Eat the extras while they're warm",result:`She eats them immediately. They're good. Really good. The kind of good that explains why she's been eyeing them. She starts the session properly fed and the match queue feels lighter somehow.`,lbs:6,rel:4,flag:"ate_extras"},
            {id:"save_extras",label:"Save them for mid-session",result:`She saves them for the tilt point — that moment around hour three when everything goes wrong and the game is unkind. When she finally eats them they're barely warm and still excellent. She wins the next two games.`,lbs:4,rel:3,flag:"saved_extras"},
          ]
        },
        {
          text:(h,s)=>`Mid-session. The extras are long gone. ${h.includes('ate_extras')?'She played unusually well in the first two hours.':'The saves paid off — she played clean through the rough stretch.'} The session has that good momentum now, the kind where the next game feels possible. She's also significantly more full than she expected to be.`,
          choices:[
            {id:"order_more",label:"Order more — the session is running",result:`She places another order without really deciding to. The session is running. The food should match the session. This is reasonable.`,lbs:8,rel:5,flag:"ordered_more"},
            {id:"push_through",label:"Push through without more food",result:`She doesn't order more. She pushes through on what's left — energy drink, some chips from earlier, willpower. She wins three straight on momentum alone.`,lbs:3,rel:4,flag:"pushed_through"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("ordered_more"),text:(h,s,gain)=>`Session complete. ${s.name} is ${Math.round(s.lbs+gain)} pounds. The extras Rae brought were an accident, she said. Everything since then has not been an accident. She's not examining this distinction very hard right now.`,gainBonus:6,relBonus:9,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session ends. ${s.name} is ${Math.round(s.lbs+gain)} pounds, slightly fuller than expected. The receipt from the extras is still on the desk. 'Complimentary,' it says. She thinks she'll see Rae again.`,gainBonus:4,relBonus:7,startsSession:true},
      ]
    },
    // Stage 2 — ~432 lbs — "Knows the Schedule"
    {
      title:"Knows the Schedule",
      phases:[
        {
          text:(h,s)=>`${s.name} logs in. Five minutes later, before she's placed an order, Rae knocks on the door. She's carrying the food — the correct food, the right amounts, everything. "I was in the area," she says. The building has a lobby code. ${s.name} is ${Math.round(s.lbs)} pounds and she looks at Rae for a long moment.`,
          choices:[
            {id:"ask_how",label:"Ask how she knew",result:(s)=>`"I pay attention," Rae says. That's the whole answer. She starts setting up the trays and ${s.name} decides this is a complete response and starts the match queue.`,lbs:4,rel:6,flag:"asked_how"},
            {id:"just_take_it",label:"Just take the food — whatever, it's warm",result:(s)=>`${s.name} steps aside and lets her in without comment. The food is warm. The session is starting. Questions can wait.`,lbs:3,rel:4,flag:"took_it"},
          ]
        },
        {
          text:(h,s)=>`The session has the best setup it's ever had. Food ready before the match started, sorted by what she wants when. ${h.includes('asked_how')?'Rae answered one question and deflected three others and ${s.name} decided she was fine with that.':'Everything just worked, no friction, no wait time, just game and food from the first moment.'} She's playing the best stretch of her life.`,
          choices:[
            {id:"let_her_handle",label:"Let Rae manage the food situation — she clearly knows",result:`She doesn't place any orders during the session. Things appear when she needs them. This is unprecedented and also extremely effective. She ranks up twice.`,lbs:10,rel:6,flag:"delegated"},
            {id:"stay_in_control",label:"Order the next round herself anyway",result:`She places the order herself, out of habit or principle, she's not sure which. Rae is already there when it arrives and takes it at the door and sets it up. This is somehow smooth.`,lbs:7,rel:4,flag:"ordered_self"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("delegated"),text:(h,s,gain)=>`The session ends. ${s.name} is ${Math.round(s.lbs+gain)} pounds and she ate through everything that appeared without placing a single additional order. Rae said 'good session' on the way out. She doesn't know how Rae evaluated this. She's going to log back in tomorrow.`,gainBonus:8,relBonus:10,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session closed. ${s.name} is ${Math.round(s.lbs+gain)} pounds. Rae knew the schedule. Rae had the code. ${s.name} is not going to make this into a thing. The session was excellent.`,gainBonus:5,relBonus:8,startsSession:true},
      ]
    },
    // Stage 3 — ~524 lbs — "Door Code"
    {
      title:"Door Code",
      phases:[
        {
          text:(h,s)=>`Rae knocks on the apartment door. Not the lobby intercom — the actual apartment door. She has the lobby code. ${s.name} is ${Math.round(s.lbs)} pounds and she opens the door and looks at Rae and then at the tray of food Rae is already carrying, perfectly selected, warm, and correct.`,
          choices:[
            {id:"ask_code",label:"When did you get the code",result:(s)=>`"You gave it to me," Rae says, which is technically true — ${s.name} mentioned it once in passing when there was a delivery delay. Rae has not forgotten it since. ${s.name} lets her in.`,lbs:4,rel:5,flag:"asked_code"},
            {id:"just_let_in",label:"Let her in — the food is warm, questions later",result:(s)=>`${s.name} steps aside. This is fine. This is happening. The food is excellent.`,lbs:3,rel:4,flag:"let_in"},
          ]
        },
        {
          text:(h,s)=>`Rae has rearranged the desk area. Not much — just slightly, to fit the trays better. ${s.name}'s setup works better now. The controller is in the same place but the angle is different and it's easier. She doesn't ask when this happened.`,
          choices:[
            {id:"lets_rae_stay",label:"She can stay while the session runs",result:(s)=>`Rae stays. She's quiet, does small things, refills drinks at natural pause points. She doesn't watch the screen so much as watch ${s.name}. ${s.name} notices and decides not to make anything of it.`,lbs:10,rel:8,flag:"rae_stayed"},
            {id:"sends_rae_out",label:"Out after setup — she needs to focus",result:(s)=>`${s.name} says she works better alone. Rae nods and leaves. The food is all there. The session runs long anyway.`,lbs:7,rel:5,flag:"rae_left"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("rae_stayed"),text:(h,s,gain)=>`Session ends. ${s.name} is ${Math.round(s.lbs+gain)} pounds and Rae said 'that was a good one' and cleaned up and left and it's quiet now and the session was, genuinely, a good one. She's not ready to say what's happening here. She's also not going to change anything.`,gainBonus:10,relBonus:12,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session closed. ${s.name} is ${Math.round(s.lbs+gain)} pounds. Rae had the code. Rae arranged the desk. The session was excellent. ${s.name} is going to think about all of this later when she hasn't just spent eight hours eating and playing.`,gainBonus:7,relBonus:9,startsSession:true},
      ]
    },
    // Stage 4 — ~626 lbs — "Before You Order"
    {
      title:"Before You Order",
      phases:[
        {
          text:(h,s)=>`Rae knocks before ${s.name} has placed an order. Not shortly after — before. The food is exactly what she was going to order. ${s.name} is ${Math.round(s.lbs)} pounds and she looks at the tray and then at Rae.`,
          choices:[
            {id:"confronted_rae",label:"'How did you know what I was going to order'",result:(s)=>`"I've been paying attention for a long time," Rae says. She says it simply, without apology. ${s.name} looks at her for a long moment. Then she picks up a thing from the tray and takes a bite. It's exactly right. It was always going to be exactly right.`,lbs:5,rel:7,flag:"confronted_rae"},
            {id:"just_eat",label:"Just start eating — the session won't wait",result:(s)=>`${s.name} reaches for the food without comment. Rae sets up the rest of the tray. The game loads. Some things don't need a conversation.`,lbs:4,rel:5,flag:"skipped_question"},
          ]
        },
        {
          text:(h,s)=>`The setup is perfect. Rae is in the room, quiet and efficient, and the session has everything it needs before it needed it. ${h.includes('confronted_rae')?'The conversation from earlier sits between them unresolved, and that seems fine. Some things don\'t close neatly.':'Nothing was said and nothing needed to be said and the session is running perfectly.'} ${s.name} is playing the best stretch she's ever played.`,
          choices:[
            {id:"accepted_arrangement",label:"Acknowledge — out loud — that this arrangement works",result:(s)=>`"This works," she says, not looking up from the screen. Rae says "I know" and that's the end of it. It's a complete conversation. ${s.name} wins the next three games.`,lbs:9,rel:8,flag:"accepted_arrangement"},
            {id:"pretend_normal",label:"Pretend everything is completely normal",result:`She pretends. It's not really pretending anymore. This is the normal. She plays clean and doesn't think about it.`,lbs:7,rel:5,flag:"pretended"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("accepted_arrangement"),text:(h,s,gain)=>`Session closed. ${s.name} is ${Math.round(s.lbs+gain)} pounds. She said 'this works' and Rae said 'I know' and this is apparently what it looks like when something is decided. She logs off satisfied, which is a thing she's started doing.`,gainBonus:12,relBonus:13,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session over. ${s.name} is ${Math.round(s.lbs+gain)} pounds. Rae knew the order before it was placed. The session was the best one yet. ${s.name} has decided not to file any of this in a category that requires further thought.`,gainBonus:8,relBonus:10,startsSession:true},
      ]
    },
    // Stage 5 — ~820 lbs — "She's Just Here"
    {
      title:"She's Just Here",
      phases:[
        {
          text:(h,s)=>`Rae is already in the room when ${s.name} starts logging in. Not delivering — just here, having let herself in earlier, doing quiet things. There's food staged. The setup is prepared. Rae looks up and says "hey."`,
          choices:[
            {id:"said_something",label:"'You're always here now'",result:(s)=>`"Yeah," Rae says. Not 'I know' or 'sorry' — just yeah. Like a confirmation. ${s.name}, ${Math.round(s.lbs)} pounds in her chair, looks at her for a moment and then turns to the screen.`,lbs:4,rel:8,flag:"said_something"},
            {id:"opened_game",label:"Open the game without comment",result:(s)=>`${s.name} puts on the headset and logs in without saying anything. Rae hands her the first thing to eat without being asked. This is how it goes now.`,lbs:3,rel:6,flag:"no_comment"},
          ]
        },
        {
          text:(h,s)=>`The session is running. It's the longest one they've done — hours deep, the food situation infinite and well-managed, the rank climbing past levels that used to feel unreachable. Rae says, from somewhere in the room, "working as intended."`,
          choices:[
            {id:"working_as_intended",label:"Say it back — 'working as intended'",result:(s)=>`${s.name} says it without looking up. "Working as intended." Rae smiles. The game continues. Something is said in that exchange that neither of them needs to name.`,lbs:12,rel:10,flag:"said_it_back"},
            {id:"just_nod",label:"Nod and keep playing",result:(s)=>`${s.name} nods, controller in hand, eyes on screen, her enormous self completely at home in this setup that has grown around her. It's working. Obviously it's working.`,lbs:9,rel:7,flag:"nodded"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("said_it_back"),text:(h,s,gain)=>`Session ends when Rae says it's ending. ${s.name} is ${Math.round(s.lbs+gain)} pounds and Grandmaster and very well-fed. She said 'working as intended.' Rae said 'exactly.' There's nothing left to add. The game saves automatically.`,gainBonus:15,relBonus:16,startsSession:true},
        {condition:()=>true,text:(h,s,gain)=>`Session log complete. ${s.name} is ${Math.round(s.lbs+gain)} pounds. Rae is here. The food is handled. The rank is climbing. This is the entire situation and it is, in every measurable sense, working.`,gainBonus:10,relBonus:13,startsSession:true},
      ]
    },
  ],
  // ── FARM GIRL: wife_lessons ──────────────────────────────────────────────
  wife_lessons:[
    // stageIdx 0 — ~258 lbs — "The First Class"
    {
      title:"The First Class",
      phases:[
        {
          text:(h,s)=>`Mary Jane's kitchen — or what she's made of the available counter space — is warm and flour-dusted. She's ${Math.round(s.lbs)} pounds in her gingham apron, and the women at the table are Darlene and Wanda. Darlene is on a perpetual diet that she mentioned twice before sitting down. Wanda is eating bread from the basket before the session has technically started.

"What do we start with?" MJ asks you.`,
          choices:[
            {id:"rich_recipe",label:"Rich recipe — let the food be the first lesson",result:(s)=>`She makes honey-butter rolls — the real kind, with good fat in the dough and a glaze that takes twenty minutes to get right. Darlene eats two and then three and then reaches for a fourth and stops herself, which is its own kind of progress. Wanda eats eight and does not stop herself at all.`,lbs:12,rel:7,flag:"rich_recipe"},
            {id:"bake_together",label:"Bake together — the lesson is in the doing",result:(s)=>`MJ puts bowls in front of both of them and starts explaining the dough technique. Darlene learns quickly, which surprises her. Wanda is eating the dough as she mixes, which surprises no one. By the time anything bakes, everyone is considerably fuller than they planned.`,lbs:8,rel:12,flag:"bake_together"},
          ]
        },
        {
          text:(h,s)=>`The session settles into eating and talking. Darlene mentions that Emma's been asking for seconds at dinner lately. She says it carefully, the way you'd say something you're not sure how to feel about yet. Wanda says Kezia's been asking about what's in the recipes. She says it the way you'd say something you're completely sure how to feel about.`,
          choices:[
            {id:"watched_wanda",label:"Watch Wanda's face when she talks about Kezia",result:(s)=>`There is something fierce and satisfied in it. Not a mother worried about her daughter's appetite — a project she is proud of. She adds: "I've been putting cream in everything at home. She doesn't know. She just knows dinner's better." She looks completely at peace with this.`,lbs:6,rel:9,flag:"watched_wanda"},
            {id:"gave_recipe",label:"Write Wanda the recipe to take home",result:(s)=>`Wanda takes the recipe card with both hands, which is unusual for something this casual. She asks which fat you use. MJ writes it on the card. Wanda folds it and puts it in her pocket and tells Kezia she can start learning the recipes. Kezia will not be told all of them.`,lbs:4,rel:14,flag:"gave_recipe"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("rich_recipe")&&h.includes("gave_recipe"),text:(h,s,gain)=>`Wanda leaves with the recipe card and a full stomach and a particular look. Darlene tells you on her way out that Emma ate a big dinner last night and nobody could figure out why. Mary Jane is ${Math.round(s.lbs+gain)} pounds and washing the bowls and letting herself be satisfied.`,gainBonus:8,relBonus:12},
        {condition:h=>h.includes("bake_together"),text:(h,s,gain)=>`Good first class. Darlene asks for the recipe on her way out — she says "for Emma." Mary Jane is ${Math.round(s.lbs+gain)} pounds and warm and already planning next week.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`First session done. Mary Jane is ${Math.round(s.lbs+gain)} pounds and Darlene and Wanda both leave with more than they came with. The kitchen smells like butter for hours.`,gainBonus:3,relBonus:7},
      ]
    },
    // stageIdx 1 — ~285 lbs — "The Circle Grows"
    {
      title:"The Circle Grows",
      phases:[
        {
          text:(h,s)=>`Patrice arrived with a container of store-bought cookies "in case there wasn't enough." MJ set them on the counter and made no comment and didn't serve them to anyone. Patrice is now watching MJ make cinnamon buns from scratch and she hasn't said anything in several minutes.

Darlene tells you Wanda's been sharing the honey-butter recipe with people. Wanda, across the table, does not deny this.`,
          choices:[
            {id:"rich_recipe",label:"Rich batch today — MJ's best work",result:(s)=>`The buns come out perfect — enormous, glazed, warm. Patrice eats one slowly and thoughtfully and then reaches for a second with slightly less hesitation. Darlene watches. Says nothing. Takes one for herself.`,lbs:12,rel:7,flag:"rich_recipe"},
            {id:"bake_together",label:"Pull Patrice into it immediately",result:(s)=>`MJ puts a bowl in front of Patrice and starts from the beginning. Patrice learns fast. She also eats more than she planned, because learning something with your hands involves tasting it, and tasting it involves not stopping after one bite.`,lbs:8,rel:13,flag:"bake_together"},
            {id:"femininity_talk",label:"Open the soft home talk — let Patrice hear it from the start",result:(s)=>`MJ talks while she works. About what the kitchen feels like when it's warm. About softness as a thing that belongs in a home. Patrice listens with the attention of someone hearing something she thought was obvious but hasn't had named before. She eats three buns without appearing to notice.`,lbs:7,rel:15,flag:"femininity_talk"},
          ]
        },
        {
          text:(h,s)=>`After the lesson: Wanda says Kezia's been going through portions at home like she's been running cross-country. "I've been adding butter to everything," Wanda says. "She doesn't ask what's in it anymore. She just asks for more." She is pleased in the manner of someone whose project is on schedule.

Darlene says Emma and her sister Claire are having some kind of competition. She doesn't say what kind. She doesn't need to.`,
          choices:[
            {id:"asked_darlene",label:"Ask Darlene how Claire fits in",result:(s)=>`"Claire's catching up fast," Darlene says, with a competitive edge that's just barely contained. "Emma doesn't like that. I told Emma if she wants to stay ahead she needs to eat more at dinner." She says this with complete practicality. She means every word.`,lbs:7,rel:9,flag:"asked_darlene"},
            {id:"asked_wanda",label:"Ask Wanda what she's been putting in Kezia's food",result:(s)=>`"Everything," Wanda says. "Cream in the potatoes, butter in the eggs, lard in the biscuits — the good lard, from Mary Jane's recipe. Kezia says everything got better at home. That's because it did." She looks enormously satisfied.`,lbs:5,rel:12,flag:"asked_wanda"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("femininity_talk")&&h.includes("asked_wanda"),text:(h,s,gain)=>`Patrice takes three recipe cards home. On her way out she asks how to make the pull-apart bread. MJ writes it on a fourth card. Wanda tells Patrice to add cream to whatever she's making for Taylor. Patrice says she already started. Mary Jane is ${Math.round(s.lbs+gain)} pounds and warm and adds a page to her recipe card stack.`,gainBonus:8,relBonus:13},
        {condition:h=>h.includes("rich_recipe")||h.includes("femininity_talk"),text:(h,s,gain)=>`Good session. Patrice leaves with a recipe and something to think about. Taylor's jeans don't fit the same way they did last month. Darlene reports this like weather. Mary Jane is ${Math.round(s.lbs+gain)} pounds and already knows what's coming.`,gainBonus:5,relBonus:9},
        {condition:()=>true,text:(h,s,gain)=>`Three women now. Three daughters getting softer at home. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the recipe cards are multiplying.`,gainBonus:3,relBonus:7},
      ]
    },
    // stageIdx 2 — ~360 lbs — "The Rival Converts"
    {
      title:"The Rival Converts",
      phases:[
        {
          text:(h,s)=>`Cheryl is at the far end of the table with her arms folded. She came because Darlene mentioned it and because she didn't want Darlene to have something she didn't. That was forty minutes ago. She is now on her fourth piece of cinnamon bread and her arms are not folded anymore.

Mary Jane — ${Math.round(s.lbs)} pounds at the stove — has not looked at Cheryl directly.`,
          choices:[
            {id:"femininity_talk",label:"Give the femininity talk — this is exactly the right moment",result:(s)=>`MJ sits down. Not performing, not framing — just talking. About what "soft" actually means. About warmth. About a house with a center. About what a woman fills a room with when she fills a room. Cheryl stops eating for one full minute. Then starts again. Something has changed in her face.`,lbs:7,rel:14,flag:"femininity_talk"},
            {id:"rich_recipe",label:"Let the food do the work — nothing needs to be said",result:(s)=>`MJ makes the thick cream biscuits. Forty-five minutes. Everyone sits while they bake. The room smells like butter and sugar and something warm. Cheryl eats three and then asks what's in them. MJ tells her. Cheryl is quiet for a moment. Then takes a fourth.`,lbs:12,rel:8,flag:"rich_recipe"},
            {id:"bake_together",label:"Pull Cheryl into the lesson — give her something to do",result:(s)=>`MJ puts a bowl in front of Cheryl without asking. Cheryl is competitive about technique. She makes good bread. She eats a lot of it. By the end, her arms have been uncrossed for twenty minutes and she is asking about measurements.`,lbs:9,rel:11,flag:"bake_together"},
          ]
        },
        {
          text:(h,s)=>`Daughter news. Wanda says Kezia grew out of her bedroom — not fully, but the doorframe started feeling narrow. Wanda moved some furniture to make her room more comfortable. She says this the way you describe a home improvement project. Darlene says Emma's belly sits on her lap when she sits down now. She says this the way you describe a small, private achievement.

Cheryl says Madison gained seven pounds last month. She says it like a personal record. It is.`,
          choices:[
            {id:"praised_cheryl",label:"Tell Cheryl her daughter's appetite is remarkable",result:(s)=>`Cheryl sits up. "She's a good eater," she says, with a particular firmness. She means: I trained her. She means: I did this. She takes another piece of bread.`,lbs:7,rel:11,flag:"praised_cheryl"},
            {id:"praised_wanda",label:"Tell Wanda moving the furniture for Kezia is exactly right",result:(s)=>`Wanda looks at you steadily. "Of course it is," she says. "She needs the room." She says it like a homemaking decision with no moral weight. Which is what it is. Cheryl watches the exchange carefully and adds nothing, which for Cheryl is a form of admiration.`,lbs:6,rel:12,flag:"praised_wanda"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("femininity_talk")&&h.includes("praised_cheryl"),text:(h,s,gain)=>`Cheryl asks for the cream biscuit recipe on her way out. She does not say please. She says: "I'll be wanting that one." MJ writes it out without comment. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the group has acquired its most competitive member.`,gainBonus:9,relBonus:14},
        {condition:h=>h.includes("femininity_talk"),text:(h,s,gain)=>`Cheryl stays for the full session. She says it was "interesting." She is already planning to come back. She will come back to every session from now on and she will be the one who insists on keeping notes. Mary Jane is ${Math.round(s.lbs+gain)} pounds and she knew this would happen.`,gainBonus:6,relBonus:10},
        {condition:()=>true,text:(h,s,gain)=>`Four women. Four daughters. The rival has converted. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the recipe list gets longer.`,gainBonus:4,relBonus:8},
      ]
    },
    // stageIdx 3 — ~465 lbs — "The Full Circle"
    {
      title:"The Full Circle",
      phases:[
        {
          text:(h,s)=>`Ruthanne walked by, smelled the kitchen, and knocked. Becca came with her. There are now six women at MJ's table and the oven has been running for three hours. Ruthanne eats with the appetite of someone who's been hungry a long time and only recently named it. Becca is writing things in her phone.

Mary Jane is ${Math.round(s.lbs)} pounds at the counter and entirely in her element.`,
          choices:[
            {id:"indulge_yourself",label:"Indulge Yourself — the lesson about giving in",result:(s)=>`MJ talks about the difference between eating because you should and eating because you want to. She gives everyone the option to stop when they're full. Nobody takes it. Ruthanne gets seconds without asking. Becca watches her do it and then does it herself.`,lbs:14,rel:9,flag:"indulge_yourself"},
            {id:"femininity_talk",label:"The soft home talk — bring Ruthanne and Becca in from the beginning",result:(s)=>`MJ explains it from scratch for the two new women. Ruthanne's expression shifts halfway through — something unlocking in it. Becca takes notes more openly now. The three women who've heard it before listen like it's the first time. It gets better with repetition.`,lbs:9,rel:14,flag:"femininity_talk"},
            {id:"bake_together",label:"Everyone bakes — six women at the counter",result:(s)=>`MJ orchestrates all six at once. It is very warm and very loud and flour gets everywhere and the bread comes out extraordinary because six women making bread together is its own kind of alchemy. Everyone eats more than they meant to. Everyone takes some home.`,lbs:11,rel:12,flag:"bake_together"},
          ]
        },
        {
          text:(h,s)=>`Daughter news, full circle. Darlene: Emma's belly sits on her lap and Claire is catching up and Emma is furious. "I told Emma to eat more," Darlene says. "If she wants to stay ahead of her sister, she has to earn it." Wanda: Kezia ate an entire pot of the cream soup by herself last week. "I made extra," Wanda says. "I knew she would." Cheryl: Madison gained eight pounds this month. She has a spreadsheet.

Becca says Sofia asked for "the strong shake recipe." She says it like a question.`,
          choices:[
            {id:"gave_strong_shake",label:"Give Becca the strong shake recipe",result:(s)=>`Becca receives it carefully. Then says: "Sofia said she wants to be the biggest. She didn't say the biggest what." She pauses. "I think she means she wants to keep growing." She says this with the quiet pride of someone who has just found out their daughter shares a goal she thought was private.`,lbs:8,rel:12,flag:"gave_strong_shake"},
            {id:"talked_about_competition",label:"Talk about the competition — which daughter is ahead",result:(s)=>`Cheryl produces the spreadsheet. Kezia is leading by weight. Madison is second. Emma and Claire are third and fourth and the gap between them is closing. Wanda says "Kezia's not a competition." She says this while looking directly at the spreadsheet. Cheryl says she knows. She looks at the spreadsheet again anyway.`,lbs:7,rel:10,flag:"talked_about_competition"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("indulge_yourself")&&h.includes("gave_strong_shake"),text:(h,s,gain)=>`Wanda asks to have the strong shake recipe too. For Kezia, she says. "Kezia's been asking." Darlene asks for it for Emma. Cheryl asks for it for Madison and does not explain why she wants it if she already has Madison on a spreadsheet. Mary Jane is ${Math.round(s.lbs+gain)} pounds and writes the recipe six times.`,gainBonus:10,relBonus:14},
        {condition:h=>h.includes("femininity_talk"),text:(h,s,gain)=>`Ruthanne asks if she can come back. She says it quietly, apart from the group, like she's asking something private. MJ says yes. Of course yes. Ruthanne's wide hips shift as she stands. She's gained since she got here. She hasn't noticed. Mary Jane is ${Math.round(s.lbs+gain)} pounds and notices everything.`,gainBonus:7,relBonus:11},
        {condition:()=>true,text:(h,s,gain)=>`All six women. All six daughters softer than last month. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the kitchen smells like three hours of good cooking and something that has no name but feels exactly right.`,gainBonus:5,relBonus:9},
      ]
    },
    // stageIdx 4 — ~595 lbs — "The Philosophy"
    {
      title:"The Philosophy",
      phases:[
        {
          text:(h,s)=>`Ruthanne says it first. "I don't think I'm going to fit through the same doorways I did last year," she says. "And I'm not sure I mind." She says it like a confession. She says it like a question. Mary Jane — ${Math.round(s.lbs)} pounds at the head of the table — looks at her for a long moment.

"That's the philosophy," MJ says. "Right there."`,
          choices:[
            {id:"the_philosophy",label:"Give the full lesson — the philosophy stated plainly",result:(s)=>`MJ talks for a long time. Not performing. Just talking. About softness as a physical argument. About what it means when a woman fills a room. About warmth as a homemaking choice that compounds over time. Cheryl is nodding with her whole body. Ruthanne's eyes are wet. Nobody mentions either of these things.`,lbs:10,rel:16,flag:"the_philosophy"},
            {id:"indulge_yourself",label:"Let the food be the philosophy — Indulge Yourself, no words needed",result:(s)=>`MJ makes four desserts and sets them all on the table and says: take what you want, take more than you need, take until you're satisfied. This is the entire lesson. Everyone understands it. Becca asks if they can do this every week.`,lbs:15,rel:10,flag:"indulge_yourself"},
            {id:"rich_recipe",label:"Rich recipe — the lesson is in how good it is",result:(s)=>`The honey cake, the cream biscuits, the pull-apart bread, all three at once. The table is very full. Six women at it, eating, talking, not hurrying. MJ eats alongside them for the first time — no longer serving, just present. The kitchen smells like something that took years to build.`,lbs:12,rel:12,flag:"rich_recipe"},
          ]
        },
        {
          text:(h,s)=>`Daughter news at the extreme. Lily told Ruthanne she figured out what's been in her food. "She wants to learn to make it herself," Ruthanne says. "The real recipes. She knows what they do." Wanda says Kezia's belly reaches the arm of the couch when she sits. Cheryl says Madison can't see her feet anymore — she has to feel for them with her hands. Darlene says Emma and Claire both needed new school clothes and Claire's belly is starting to match Emma's now and Emma does not accept this.

Patrice says Taylor asked her to tie her shoes for her because she couldn't quite reach.`,
          choices:[
            {id:"celebrated_lily",label:"Tell Ruthanne that Lily wanting to learn is the real goal",result:(s)=>`Ruthanne nods. She looks like someone given credit for a thing she's been building for a long time. "That's what I wanted," she says. "Not just the growth. I wanted her to want it." She takes a piece of bread. She eats it slowly. She is very satisfied.`,lbs:8,rel:14,flag:"celebrated_lily"},
            {id:"went_around_the_table",label:"Go around the table — every daughter, every milestone",result:(s)=>`Emma and Claire competing. Kezia on the couch. Taylor's shoes. Madison's feet. Lily in the kitchen learning the real recipes. Sofia eating everything. Every mother's face as you name her daughter. Pride so specific it's almost competitive. Cheryl says: "When Madison gets to where Kezia is, I want a photo." Darlene says: "Emma first."`,lbs:7,rel:16,flag:"went_around_the_table"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("the_philosophy")&&h.includes("went_around_the_table"),text:(h,s,gain)=>`Wanda says she's going to share the strong shake recipe with everyone. Cheryl says she'll make a spreadsheet tracking all six daughters. Darlene says Emma needs more of whatever Kezia's been getting. MJ is ${Math.round(s.lbs+gain)} pounds and the group chat forms itself around the table before anyone's left for home.`,gainBonus:12,relBonus:16},
        {condition:h=>h.includes("the_philosophy"),text:(h,s,gain)=>`The philosophy is in the room now. These women carry it out with them. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the teaching is done. What's left is just watching it grow.`,gainBonus:8,relBonus:13},
        {condition:()=>true,text:(h,s,gain)=>`Six daughters with six mothers who know exactly what they're doing. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the circle is complete. Now it just keeps going.`,gainBonus:6,relBonus:11},
      ]
    },
    // stageIdx 5 — ~820 lbs — "The Legacy"
    {
      title:"The Legacy",
      phases:[
        {
          text:(h,s)=>`Wanda shows you a photo of Kezia before the session starts. She fills the sectional couch — both cushions and then some. Her belly rests on her lap and extends over it. She had to move to the bigger bedroom three months ago because the door frame of her old one was getting narrow for her hips; the bed frame in the new room cracked after six weeks and Wanda had it reinforced. Kezia barely goes out anymore. The world isn't designed for her at this size. The house is. Wanda looks at the photo the way people look at something they made.

Mary Jane is ${Math.round(s.lbs)} pounds at the head of the table, warm and unhurried.`,
          choices:[
            {id:"the_philosophy",label:"The philosophy — final statement",result:(s)=>`MJ talks about what they've built. Not theory — a room full of women who came hungry and left full and taught their daughters to want more. She doesn't say it heroically. She says it like a recipe, like instruction. "Softness compounds," she says. "That's the whole thing." The room is very quiet, and then very warm.`,lbs:10,rel:16,flag:"the_philosophy"},
            {id:"rich_recipe",label:"The legendary spread — everything at once",result:(s)=>`The full table. Every recipe at once. Butter rolls, cream biscuits, honey cake, sweet potato pie, pull-apart bread, and the peach cobbler that takes two hours. Six women eat everything. MJ eats alongside them. The kitchen smells like years of Tuesdays all happening at the same time.`,lbs:16,rel:12,flag:"rich_recipe"},
          ]
        },
        {
          text:(h,s)=>`Daughter reports at the extreme. Darlene says Emma and Claire both have the wide forward belly now — that particular soft heavy hang that sits on the thighs — and they've stopped competing because Claire pulled ahead and Emma gave up trying to win and is just trying to grow. They both need chairs brought home from work that are reinforced. Cheryl says Madison needed the passenger-side car seat modified — the bolster was pressing her hips. She had it done and considers it routine maintenance. Patrice says Taylor's arms jiggle loudly when she eats and she watches this happen at every meal.

Becca says Sofia can no longer sit in a standard chair comfortably. Ruthanne says Lily cooks dinner for both of them now and everything she makes is richer than what Ruthanne taught her. "She improved on the recipe," Ruthanne says. She sounds like she's bragging. She is.`,
          choices:[
            {id:"asked_about_kezia",label:"Ask Wanda what Kezia's day looks like now",result:(s)=>`"Mostly home," Wanda says. "She sleeps in the big bedroom, she eats in the living room, we set up the furniture around her. She's very comfortable." She pauses. "She's happy," she adds, separately, like that's a different point. "She likes it. She said she doesn't miss going out." She's very still. "Neither do I, some weeks. I stay with her." Something in the way she says this suggests she means it completely.`,lbs:10,rel:14,flag:"asked_about_kezia"},
            {id:"celebrated_all",label:"Tell each woman what her daughter represents",result:(s)=>`You go around the table. Emma and Claire both enormous, competition transformed into a race toward the same place. Kezia immobile and content in her reinforced room. Taylor's arms jiggling loudly, Patrice watching it at every meal. Madison wide in her modified car seat. Lily cooking richer than her mother. Sofia in the custom chair. Every mother's face as her daughter is named. Cheryl says: "When Madison can't get out of the car, I'll call it a success." She means it. Darlene says "Emma first." She also means it.`,lbs:8,rel:17,flag:"celebrated_all"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("the_philosophy")&&h.includes("celebrated_all"),text:(h,s,gain)=>`Wanda starts crying. Just a little. Darlene tells her to stop or she'll start too. Cheryl tells them both to pull it together. Nobody pulls anything together. The room is full of very fat women who are very proud of their very fat daughters and Mary Jane — ${Math.round(s.lbs+gain)} pounds at the center of it — made all of this. She knew what she was starting. She let it start.`,gainBonus:14,relBonus:18},
        {condition:h=>h.includes("the_philosophy"),text:(h,s,gain)=>`The philosophy is permanent now. These women have it in them. It will outlast every recipe card. Mary Jane is ${Math.round(s.lbs+gain)} pounds and the thing she built runs without her. It just keeps going.`,gainBonus:10,relBonus:15},
        {condition:()=>true,text:(h,s,gain)=>`Six women, six daughters, one kitchen. What started as butter rolls has become something that will outlast every woman in this room. Mary Jane is ${Math.round(s.lbs+gain)} pounds and she knew exactly what she was doing. She always knew.`,gainBonus:7,relBonus:12},
      ]
    },
  ],
  machine_goddess:[
    {
      title:"First Prototype",
      phases:[{
        text:(h,s)=>`Talia locks the workshop door and wheels out a harness that looks too deliberate to be innocent. "Bloating belt, revision C," she says. "I need a subject with documented consent." She taps her own waist. "Or I run it on myself. Data is data."`,
        choices:[
          {id:"self_test",label:"Let her self-test first",result:`She straps in, hits the cycle button, and watches her own midsection swell over twenty minutes with clinical fascination that keeps slipping into something else. "Variance within tolerance," she breathes.`,lbs:6,rel:6,flag:"self_test"},
          {id:"assign_subject",label:"Authorize a class test subject",result:`She exhales like you've upgraded her clearance level. "Excellent. I'll log everything." The first volunteer whimpers when the belt engages — Talia takes notes without looking away.`,lbs:4,rel:8,flag:"assigned"},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Prototype validated. Talia is ${Math.round(s.lbs+gain)} pounds and already sketching revision D. The workshop smells like warm polymer and ambition.`,gainBonus:6,relBonus:8},
      ],
    },
    {
      title:"Feeder Calibration",
      phases:[{
        text:(h,s)=>`The auto-feeder arm whirs through its first full session — mechanical, patient, relentless. Talia monitors throughput on a tablet. "Calories per minute are obscene," she says, pleased.`,
        choices:[
          {id:"boost_paste",label:"Slot in the paste printer upgrade",result:`The paste printer locks into the arm with a satisfying click. Output density doubles. Talia drinks a celebratory cup of slurry and calls it "QC."`,lbs:8,rel:5},
          {id:"slow_tease",label:"Run tease mode for precision data",result:`The arm slows to maddening intervals. The subject squirms; Talia graphs it. "Psychological coupling confirmed."`,lbs:5,rel:7},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Calibration complete. Talia files the session as ${Math.round(s.lbs+gain)} pounds heavier and entirely justified.`,gainBonus:5,relBonus:6},
      ],
    },
    {
      title:"Serum Variance",
      phases:[{
        text:(h,s)=>`The injector hisses. Results are immediate and uneven — fat rushes to places the formula didn't specify. Talia stares at the readout like it's beautiful. "Chaos within parameters," she whispers.`,
        choices:[
          {id:"document",label:"Document everything clinically",result:`She photographs, measures, logs. The subject shakes; Talia does not.`,lbs:10,rel:4},
          {id:"celebrate",label:"Celebrate the extremity",result:`She laughs — sharp, delighted. "This is why we build."`,lbs:12,rel:6},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Serum trial archived. Campus whispers start that night. Talia is ${Math.round(s.lbs+gain)} pounds and already mixing batch two.`,gainBonus:8,relBonus:5},
      ],
    },
    {
      title:"Redistribution Study",
      phases:[{
        text:(h,s)=>`The rig hums. Fat migrates visibly — pear-heavy, deliberate, intimate. Talia adjusts sliders with the focus of a sculptor. "Hold still," she says. "I'm almost done redesigning you."`,
        choices:[
          {id:"pear",label:"Push toward lower-body concentration",result:`Hips and thighs swell while the waist stays comparatively narrow. Talia nods approval.`,lbs:6,rel:7},
          {id:"belly",label:"Bank mass forward instead",result:`The belly dominates the new silhouette. Talia tags the file "alternate aesthetic."`,lbs:7,rel:5},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Sculpt cycle saved. Talia runs a mirror pass on herself afterward — symmetry matters.`,gainBonus:6,relBonus:7},
      ],
    },
    {
      title:"Malfunction Night",
      phases:[{
        text:(h,s)=>`An alarm chirps at 2am. A belt over-inflates; an arm won't stop feeding. Talia doesn't panic — she reroutes power and keeps eating paste beside the bench "for stability."`,
        choices:[
          {id:"shutdown",label:"Hard shutdown all devices",result:`Everything stops. The subject gasps relief; Talia looks annoyed at the lost data.`,lbs:4,rel:6},
          {id:"ride_it",label:"Let it run for max data",result:`The logs are extraordinary. So is the damage. Talia calls it worth it.`,lbs:9,rel:4},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Incident report filed. Instability drops; Talia's appetite does not.`,gainBonus:5,relBonus:5},
      ],
    },
    {
      title:"Machine Goddess",
      phases:[{
        text:(h,s)=>`Devices tick on bodies across campus. Talia stands in the center of her workshop — soft, wide, solder-stained — and watches status lights blink like constellations. "Manual phase over," she says quietly.`,
        choices:[
          {id:"expand",label:"Authorize wider deployment",result:`She pushes a campus-wide update. Growth becomes infrastructure.`,lbs:10,rel:8},
          {id:"consolidate",label:"Consolidate the core network",result:`She keeps the mesh tight and obsessive. Quality over reach.`,lbs:7,rel:10},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`The network lives. Talia is ${Math.round(s.lbs+gain)} pounds and no longer pretends she's only the inventor — she's the system.`,gainBonus:12,relBonus:12},
      ],
    },
  ],
};

export const EVOLVED_FORM_META = {
  sumo:                 { title:"Sumo Wrestler",        color:"#c0392b" },
  eating_competitor:    { title:"Circuit Competitor",   color:"#e67e22" },
  feedee_creator:       { title:"Feedee Creator",       color:"#8e44ad" },
  body_positive_creator:{ title:"Body Positive Creator",color:"#27ae60" },
  eating_captain:       { title:"Eating Captain",       color:"#2980b9" },
  big_squad_captain:    { title:"Squad Reformation",    color:"#16a085" },
  eating_diarist:       { title:"Eating Diarist",       color:"#9b59b6" },
  food_researcher:      { title:"Food Researcher",      color:"#2c3e50" },
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
  community_researcher: { title:"Community Researcher",    color:"#4a6fa5" },
  pharmacist:           { title:"The Chemist",            color:"#2e6b5a" },
  machine_goddess:        { title:"Machine Goddess",        color:"#4a6080" },
};

export const EVOLUTION_BUTTON_BLURB = {
  athlete:(s)=>`You see her in the gym doorway on a Tuesday afternoon, not working out — just standing there looking at the equipment that used to be hers. The pull-up bar. The bench press. None of it fits anymore, not really. She has more mass now than the sport knows what to do with. Her jaw is set, the way it gets when she's about to solve something. You watch her and think: she's still competitive. She just needs a new arena.`,
  influencer:(s)=>`You walk past her on the quad and she doesn't notice you. She's filming herself on her phone — mouth open to say something, then stopping, deleting, starting again. The angle that used to work doesn't work now. She's bigger, softer, undeniable in ways her old content pretended weren't happening. She deletes the clip again. She doesn't look upset. She looks like someone who knows the answer is somewhere and hasn't found the framing yet. You think you might have an idea.`,
  cheerleader:(s)=>`You stop by the gym during practice. ${s.name} is standing at the edge of the mat in her old uniform — or most of it, the waist seam split, the fabric at her thighs taut past bearing — watching the squad run through a routine she used to lead. She's not sad about it. The crowd at the open practice is still watching her. Some of them more than they're watching the performance. She's still the most present person in the room. You think about where that kind of presence could go.`,
  bookworm:(s)=>`You find her in the late stacks at the library, long after the undergrads have gone. There's a notebook open on the table beside her laptop and a half-eaten sandwich she's forgotten about. When she hears you she closes the notebook with a firmness that suggests you just missed something. She doesn't look guilty. She looks like someone managing information carefully. You've seen that look before, when she had a thesis draft she wasn't ready to show. You wonder what she's writing.`,
  gamer:(s)=>`You glance through her open door without meaning to. She's at her setup, the screen glowing, a game paused mid-level. She's eating — slowly, automatically, the bag of chips just there and going down without her noticing — and she's not looking at the game. She's looking at something on the second monitor, reading something. The room is warm and soft with the ambient light and her presence in it, her body filling the chair, comfortable in a way that suggests the chair has been arranged around her. You think about what she could do with this setup.`,
  sorority:(s)=>`You walk past the chapter room during a meeting. The door is open. ${s.name} is technically not running things — she graduated from the formal role two months ago — but the room is still orienting itself around her. When she speaks, people write things down. When she pauses, people wait. She's larger now than when she held the title and somehow that makes it more true, not less. After the meeting empties you catch her in the hallway. She looks like someone with a plan that doesn't have a name yet.`,
  overachiever:(s)=>`You find her planner left open on a library table while she's in the bathroom. You don't mean to read it. The weight gain is charted in a color-coded column alongside her GPA, her sleep, her caloric intake. She is tracking this the way she tracks everything. The numbers are precise and the trend is unmistakable and the color she's chosen for that column is gold. Not warning-red. Gold. You close the planner and wait. When she comes back she sees you saw it and just nods, once, like: yes, that's accurate, what are we going to do with it.`,
  artsy:(s)=>`You stop by her studio during open hours. The new work is on the wall — three large canvases, all featuring generous female figures. They're not abstractions. They're specific. The lines are loving, the weight is warm, the bodies are real and present and unapologetic. She's standing in front of the largest one with her head tilted, deciding something. She doesn't explain the shift in subject matter when you ask. She says: 'It's what I want to look at.' She says this the way someone says something that is also about themselves. You think about what a larger project might look like.`,
  quiet:(s)=>`You see her at the campus coffee shop on a Thursday morning, alone at a corner table with her laptop. She's typing quickly, absorbed, the kind of focus she reserves for things that matter. When she looks up and sees you she closes the laptop with one smooth motion, not alarmed but deliberate, and smiles. There's something behind the smile that isn't embarrassment — more like being caught in the middle of something private that hasn't been decided as a secret yet. You think about what she might be writing. You think you might have a better idea of what to do with it than she does.`,
  transfer:(s)=>`You pass through the dining hall mid-afternoon and the staff behind the counter lights up when ${s.name} walks in behind you. They know her name. They have her order started before she reaches the counter. There's a booth in the corner that other students seem to drift away from, not consciously, just leaving it available in the particular way that space gets left for something or someone that belongs in it. She settles into it and the room adjusts slightly. You watch from across the hall and think: she's become part of this place faster than anyone else ever has.`,
  psych:(s)=>`You find ${s.name}'s notebook left open on a desk — not hers, a shared seminar table. You don't mean to read it. What's inside is a meticulous, weeks-long study of the people around her: names, dates, behavioral observations, weight-implied measurements, annotated patterns. It's precise. It's methodical. It's deeply unsettling — not because it's wrong, but because it's right. You close it. You wait. When she comes back and sees you by the table she just looks at you steadily, reads your expression, and says: "I need a direction for this."`,
  eced:(s)=>`You stop by the classroom on a Tuesday afternoon — not for any particular reason, just passing — and the smell hits you before the door fully opens. Butter, sugar, something warm. ${s.name} is at the counter at ${Math.round(s.lbs)} pounds, her apron dusty with flour, and around the table are the girls she teaches and apparently their mothers, and everyone is eating, and the room has the specific quality of a space that has found its purpose. Daisy looks up. She sees you see the room. "I've been doing Tuesdays for a while now," she says. Her voice is carefully normal. "I think it's working."`,
  culinary:(s)=>`You find ${s.name}'s test kitchen unexpectedly unlocked. She's not there, but someone else is — a woman you don't recognize, sitting at the prep table with an empty plate and the particular slow contentment of someone who ate something extraordinary and hasn't decided to leave yet. She looks up. She seems confused about how long she's been there. When Reneé comes back she sees you in the doorway and she doesn't explain anything. She takes the plate, washes it, and says: "I've been running some tests. With willing subjects." A pause. "Very willing subjects." She looks at you with the calibrated calm of someone who has been thinking about whether to say the next thing for a long time. "I think I can do this properly. I just need the right direction."`,
  farm_girl:(s)=>`You stop by and find Mary Jane at the counter with more food than two people could eat and a look of complete purpose. She's not cooking because she's hungry — or not only that. She's cooking because she knows something about food and feeding and what a soft home feels like and she's starting to understand she's the only person in the building who knows it. She's ${Math.round(s.lbs)} pounds and she looks like a plan that's been waiting to be named.`,
  pharmacy_grad:(s)=>`You find ${s.name} in the pharmacy lab after hours, gloves on, hair tied back, a corporate ID badge still clipped to her coat. The notebook open on the bench isn't her assigned research — it's dosage tables with appetite curves crossed out and rewritten. She doesn't pretend otherwise when she sees you. "I've been adjusting compounds," she says, very carefully. "Wellness adjacents. Metabolic support." She taps the page. "I can make things for you. Food delivery only — that's the safe route." She looks anxious and absolutely certain in the same breath. "I need someone who knows what they're authorizing."`,
  inventor:(s)=>`You pass the engineering workshop after midnight and the light is still on. ${s.name} is hunched over a bench covered in harness sketches, servo specs, and half-finished belts that look less like clothing and more like opinions. She doesn't startle when you enter — she marks a measurement and says, without looking up, "I've been modeling growth as a control problem." She finally meets your eyes. Her smile is clinical and hungry in the same instant. "I can build things that make bodies do what spreadsheets can't. I need a partner who won't pretend that's innocent."`,
};


export const EVOLUTION_OFFER = {
  athlete:{
    intro:(s)=>`${s.name} catches you after class. She's been thinking about what comes next — the weight she's carrying is real, undeniable, and the old sport doesn't fit anymore. But she's competitive in a way that doesn't turn off. She wants to do something with this body. She just needs a direction.`,
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
  bookworm:{
    intro:(s)=>`${s.name} brings you a draft proposal — stapled, tabbed, annotated. The title page reads "Feederism in the Contemporary University: A Phenomenological Case Study" and bears her actual name, which means she's past the point of pseudonyms. "The IRB approved it last week," she says. "I need a faculty liaison." She opens to the methodology section. "And I need access to the people I've already been observing." She looks at you carefully. "You know exactly which people I mean."`,
    paths:{
      community_researcher:{ label:"Community Researcher", desc:"Present the thesis. Conduct case studies. Embed herself in the subculture she's been watching from the outside — and see what the research does to the researcher." },
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
    intro:(s)=>`${s.name} shows up with a tape measure and a corkboard she has clearly just bought. She tacks up a blank sheet, picks up a marker, and writes two columns: her current measurements, and blank space next to every girl's name in the class. She steps back. 'I've been the smartest person in every room I've been in,' she says. 'I want to be the biggest one too.' She looks at the corkboard. 'I want data. I want comparisons. I want to win.' She turns around. 'Help me.'`,
    paths:{
      competitive_gainer: { label:"The Competitive Gainer", desc:"The corkboard is the scoreboard. Every measurement is a data point. Every girl in the class is a benchmark — and Priya intends to exceed all of them, in every category, and know it precisely." },
    },
  },
  artsy:{
    intro:(s)=>`${s.name} comes in late carrying a portfolio and sits down without speaking for thirty seconds. Then: 'I've been thinking about what the work is about now.' She opens the portfolio: two sets of sketches. Two directions. Both use this body as the primary material.`,
    paths:{
      installation_artist:{ label:"Installation Artist",   desc:"Document the transformation as art. Galleries, reviews, a retrospective of a body in progress." },
      food_photographer:  { label:"Food Photographer",     desc:"Aesthetic eating as visual art. Shoots, gallery shows, museum collections." },
    },
  },
  quiet:{
    intro:(s)=>`${s.name} doesn't leave a note. She's just there when you arrive — in your office, in the chair, very still. She doesn't explain how she got in. 'I've been mostly at home,' she says. 'I've stopped going out. The food comes.' She looks at her hands. 'I think I want someone to know that's a choice. I think I want someone to help me make it properly.'`,
    paths:{
      home_nest: { label:"Home Nest", desc:"She's building something warm and self-contained. Delivery orders, refined preferences, a room arranged around exactly what she needs. The outside world is optional now." },
      delivery_hive: { label:"Delivery Hive Queen", desc:"Her room becomes the Central Nest: a soft lavender territory-control system where delivery recruits, conquered dorm rooms, Vice Queens, and your gluttony-spirit pressure turn the whole building toward Maya." },
    },
  },
  transfer:{
    intro:(s)=>`${s.name} is already eating when you sit down across from her — something from a place near campus she found in her second week. She doesn't offer an explanation or a pitch. She just looks at you steadily and says: 'I want to go through everything. Every food challenge, every dining hall, every place that does something absurd. I want to document it. I want to be the one who did it.' She takes another bite. 'I want someone to write that down.'`,
    paths:{
      campus_legend: { label:"Campus Legend", desc:"She works through the campus food challenge circuit — every venue, every ridiculous item, every crowd that gathers to watch. A food journalist keeps finding her. The legend grows with every table she clears." },
    },
  },
  eced:{
    intro:(s)=>`${s.name} sits across from you with her hands wrapped around a mug and a small notebook on the table beside her. She's been trying to explain this for a moment and not quite finding the words. "I've been doing something on Tuesdays," she finally says. "At the school. With the class." A pause. "And the moms have started coming. And everyone keeps eating. And I think —" she stops. She looks at the notebook. "I think I want to make it into something real. Something intentional." She looks at you. "I need someone to know what I'm doing."`,
    paths:{
      homeroom_queen:{ label:"The Apprentice", desc:"Formalize the Tuesday sessions. Bake for the class, bake for the moms, manage the suspicion, grow the tradition. Six named participants and one growing problem she's trying not to call a success." },
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
    intro:(s)=>`${s.name} doesn't explain the notebook. She opens it to a page of columned data — names, dates, observations, weights-implied — and sets it on the table between you. 'I've been doing this informally,' she says. 'I'd like to do it properly.' She taps the notebook. 'It involves a subject.'`,
    paths:{
      psych_researcher: { label:"The Researcher", desc:"Pick a classmate as a formal subject. Feederism or feedeeism — she'll study both sides of the dynamic with the rigour of a clinical trial." },
    },
  },
  culinary:{
    intro:(s)=>`${s.name} sets two things on the table between you: a recipe notebook and a short list of names. No explanation. She waits. When you ask, she says: "I've been running informal trials. Voluntary subjects, controlled portions, careful observation." She pauses. "The subjects gained weight. I gained weight. The data is consistent across six sessions." She taps the list. "I want to do it properly. One subject at a time, managed correctly, from selection through — completion." She says 'completion' the way someone says a word they've chosen very carefully. "I need someone who understands what they're authorizing."`,
    paths:{
      cultivator:{ label:"The Cultivator", desc:"Recruit a taste tester. Run feeding sessions using carefully constructed recipes. Grow the subject through stages and harvest when the yield is right. Three full cycles. Precise, personal, and deeply satisfying." },
    },
  },
  pharmacy_grad:{
    intro:(s)=>`${s.name} meets you after hours in a pharmacy lab that smells like ethanol and vanilla. Her corporate badge is still on — she hasn't gone home yet, maybe won't. "I don't want to cure cancer," she says, too quietly, then corrects herself: "I mean — I want to work on appetite. Metabolic wellness. Support compounds." She slides a vial across the bench. "Delivered through food. Always through food." Her hands are steady. Her eyes aren't. "I can build you tools. I need a partner who won't pretend this is innocent."`,
    paths:{
      pharmacist:{ label:"The Chemist", desc:"Sophia synthesizes appetite stimulants, pleasure enhancers, and metabolic compounds — a slow descent from corporate researcher to campus-scale transformation architect." },
    },
  },
  inventor:{
    intro:(s)=>`${s.name} pulls you into her workshop and locks the door like it's protocol. Blueprints cover every surface — belts, arms, injectors, rigs that treat flesh as tunable material. "Manual feeding is inefficient," she says, tapping a schematic. "I build externals. Wearables. Automations." She gestures at her own body without embarrassment. "I spend mass to make mass. Ambiguously metaphorical. Works either way." Her eyes are bright. "Help me deploy this properly."`,
    paths:{
      machine_goddess:{ label:"Machine Goddess", desc:"Talia builds devices that bloat, feed, inject, and reshape — a workshop empire of external machines that override bodies until she becomes the controller of the whole network." },
    },
  },
};

// ── HOMEROOM QUEEN: NPC stage descriptions ──────────────────────────────────
// Students have 3 stages (0=start, 1=noticeably softer, 2=genuinely fat)
// Moms have 5 stages (0=start, 1=softening, 2=clearly changed, 3=properly fat, 4=can't dress around it)
export const BATCH_BAKER_NPCS = {
  Kayla:{
    0:"Narrow waist, wide hips, long legs. Always tugging at the waistband of her jeans — upward, a habitual adjustment. She's the watchful one.",
    1:"Her jeans have started to gap at the waist while her hips push outward. She's stopped tugging at the waistband. She's started sitting differently — wider, more settled.",
    2:"Genuinely wide now, her hips spreading soft and full into the chair, her thighs pressing together. She wears the comfortable clothes without explanation.",
  },
  Bri:{
    0:"Soft round belly, slim arms and legs — carries everything in her middle. She moves like someone who's always been this way and has no opinion about it.",
    1:"Her belly has pushed forward noticeably, resting in her lap when she sits. The slim arms and legs are the same. The middle is emphatically more.",
    2:"Her belly is the center of gravity of everything — large, soft, unmistakable. She rests her hands on it when she's relaxed. She is often relaxed.",
  },
  Sofia:{
    0:"Already full-figured before any of this. Chest, hips, everything — she wears her body like it's exactly the right size, which it is.",
    1:"Everything has gotten more. The full figure has gone rounder, softer, wider. She is significantly larger than she was and completely unbothered.",
    2:"Genuinely enormous now — soft and wide, her belly heavy and forward, her chest vast. She fills the new wide desk completely and seems to prefer it.",
  },
  Mrs_Calloway:{
    0:"Manicured, athletic-seeming from the waist up. Wide hips she minimizes with careful, structured clothing. Suspicious of everything, especially you.",
    1:"The structured clothing is doing less work than it used to. There's a softness at the waist now that the jacket doesn't quite hide. She's still watching everything.",
    2:"The jacket doesn't button the way it used to. She's switched to cardigans and drape-fronts. She is still, always, watching from the window at pickup.",
    3:"She's stopped trying to dress around the change and started dressing for comfort. A soft cardigan in a warm color. She brought you preserves this week.",
    4:"She takes the full portions openly now. She's been on the event committee long enough that Tuesday is as much hers as it is yours. She knows exactly what she's doing.",
  },
  Mrs_Reyes:{
    0:"Trim but carries a soft belly she explains away as stress weight. Always has a coffee in hand. Friendly but distracted.",
    1:"The belly is less explainable now and she's stopped trying. The coffee is still there. She lingers at pickup a little longer each week.",
    2:"Her midsection has grown soft and round, clearly visible even under her usual clothes. She's stopped tugging at her jacket and started choosing the loose things.",
    3:"Properly soft now — her belly rounding the front of her blouse, her hips wider. She sits at the table instead of standing at the window.",
    4:"She brings coffee for both of you now. She's comfortable. She doesn't comment on her size or yours. She just eats and talks and is present.",
  },
  Mrs_Monroe:{
    0:"Glamorous, confident, comfortable in her body from the start. Brings wine to school events. Daisy's favorite.",
    1:"Warmer, rounder, and even more comfortable than before. She's started commenting on which recipes she prefers and her preferences are detailed.",
    2:"Noticeably softer everywhere — her hips generous, her belly rounding out the wrap dress. She laughs about everything. She's your biggest advocate.",
    3:"Gloriously fat, openly and happily. She has stopped noticing because she stopped caring a long time ago. She brings the good wine now.",
    4:"She is the reason the other moms stopped worrying. She made abundance look so natural and easy that everyone followed her example. Enormous, warm, essential.",
  },
};

// Suspicion delta per flag (used in closeEvolvedEvent to update batchBakerState.suspicion)
export const HOMEROOM_SUSPICION_DELTAS = {
  recipe_rich:+2, recipe_special:+1, recipe_cover:-1, recipe_simple:0,
  deflected_mom:-1, invited_inside:+1, played_safe:-1, enlisted_monroe:-2,
  direct_question:+2, deflected_question:-1,
};
// Arc stage thresholds (classWeight/momWeight accumulation gates)
export const HOMEROOM_THRESHOLDS = {
  class:[50,120,200], // Stage 1 needs ≥50, Stage 3 needs ≥120, Stage 5 needs ≥200
  mom:[30,70,130],    // Stage 2 needs ≥30, Stage 4 needs ≥70, Stage 5 needs ≥130
};

// ── HOMEROOM QUEEN: Individual Conference Events ─────────────────────────────
export const HOMEROOM_CONFERENCE_EVENTS = {
  Kayla:{
    text:`Kayla comes in and sits across from the desk with the settled ease of someone who's been in this room enough times that it doesn't feel official anymore. She doesn't look nervous. She looks like she's waiting for something.

"Is this about grades?" she asks. Her tone implies she already knows it isn't.`,
    choices:[
      {id:"academic",label:"Actually go through her progress — she's been doing well",
       result:`"Your engagement scores have gone up every single week since September," Daisy says, and she means it — the improvement is real and specific. Kayla blinks. "Oh," she says, genuinely surprised. Then she looks at the container on the corner of the desk. "Can I—" Daisy slides it over without comment.`,
       lbs:2,classGain:4,rel:5,suspDelta:-1},
      {id:"tuesday",label:"Skip the pretense — ask what she'd most like on Tuesday",
       result:`Kayla's expression resolves immediately. "The cinnamon rolls," she says, not needing to think about it. "The ones from the second recipe upgrade." She has categorized the recipe progression. Daisy writes this in the notebook. The container comes out and Kayla has two pieces before she leaves.`,
       lbs:3,classGain:7,rel:9,suspDelta:0},
    ],
  },
  Bri:{
    text:`Bri comes in and sits down and her eyes go immediately to the desk. She's not rude about it — it's just where her attention goes. She has a clear and ordered sense of what matters.

"Is there anything?" she asks. Completely practical.`,
    choices:[
      {id:"brought_something",label:"Yes — there's always something in the drawer",
       result:`Daisy opens the bottom drawer. There's a container in there — there's always a container. Bri opens it with the ease of someone accessing a familiar resource and eats while Daisy talks about her progress. She listens while she eats. Both things happen efficiently and at the same time.`,
       lbs:3,classGain:6,rel:8,suspDelta:0},
      {id:"brief",label:"Nothing today — keep it short and warm",
       result:`"Not today," Daisy says. Bri accepts this without complaint. The conference is brief and warm and Daisy has genuinely good things to say — specific things, accurate things. Bri leaves looking pleased. She'll be thinking about Tuesday before she reaches the door.`,
       lbs:1,classGain:2,rel:6,suspDelta:-1},
    ],
  },
  Sofia:{
    text:`Sofia arrives and fills the chair before she's fully sat down — there's so much of her now, soft and wide and completely settled, that her presence is immediate. She puts both hands flat on the desk and looks at Daisy with an expression that says: I know exactly what this is, and I'm in.`,
    choices:[
      {id:"portfolio",label:"Review her actual work — she's the strongest student by every measure",
       result:`Sofia's academic portfolio is, genuinely and without qualification, the best in the class. Daisy goes through it carefully, noting specific pieces by name. Sofia listens with the focused attention of someone who takes all of this seriously — not just Tuesday. At the end: "Can I have something before I go?" Daisy already has the container out.`,
       lbs:2,classGain:5,rel:7,suspDelta:-1},
      {id:"next_tuesday",label:"Let her plan next Tuesday — she clearly has opinions about this",
       result:`Sofia's response is immediate and detailed: the cardamom honey cake with extra cream, please, and the peach upside-down cake as backup in case the cardamom is unavailable. She has alternatives ranked. Her planning is thorough. Daisy writes everything down. The notebook entry reads: *Sofia's requests. Non-negotiable.*`,
       lbs:4,classGain:8,rel:11,suspDelta:1},
    ],
  },
  Mrs_Calloway:{
    text:`Mrs. Calloway comes in with her jacket still buttoned and her eyes already cataloguing the room — the counter, the snack drawer, the notebook on the desk. She sits with the careful posture of someone who has not yet decided whether this is a problem.

"I wanted to ask about Tuesdays," she says. "Kayla talks about them constantly."`,
    choices:[
      {id:"curriculum_frame",label:"Walk her through the curriculum framing — keep it professional",
       result:`Daisy goes through the enrichment rationale with specific, accurate detail. Mrs. Calloway listens with her arms crossed, then uncrosses them by the third point. "She's been happier," she admits. "I noticed." She leaves without further questions. Daisy exhales.`,
       lbs:2,momGain:6,rel:5,suspDelta:-2},
      {id:"offer_tasting",label:"Offer a tasting — redirect with warmth",
       result:`"Before you go—" Daisy sets a wrapped slice on the desk. Mrs. Calloway looks at it. Looks at Daisy. Takes it. "For the drive," she says, which is not a refusal. She eats it in the parking lot. Daisy watches from the window and makes a note.`,
       lbs:3,momGain:10,rel:7,suspDelta:0},
    ],
  },
  Mrs_Reyes:{
    text:`Mrs. Reyes arrives with coffee for both of you — she does this now, it's become a habit — and sits down before you've finished saying hello. Her belly presses softly at her blouse; she's stopped explaining it away.

"Okay," she says. "I need to be honest about something." She pauses. "I keep showing up early on Tuesdays."`,
    choices:[
      {id:"honest_talk",label:"Talk honestly — acknowledge what's happening",
       result:`Daisy listens without flinching. Mrs. Reyes talks about stress, comfort, the smell from the classroom, how she stopped pretending she wasn't interested. "I'm not mad," Daisy says. "I'm glad you're here." Mrs. Reyes exhales like she's been holding her breath for weeks. She stays forty minutes.`,
       lbs:2,momGain:8,rel:9,suspDelta:-1},
      {id:"recipe_preview",label:"Show her next week's recipes — make her part of it",
       result:`Daisy opens the recipe book to the marked pages. Mrs. Reyes leans in immediately — cardamom, peach upside-down, something with too much cream. "Can I—" she starts. "Yes," Daisy says. Mrs. Reyes laughs, surprised at herself. She leaves with a container and a date circled on the calendar.`,
       lbs:4,momGain:14,rel:8,suspDelta:1},
    ],
  },
  Mrs_Monroe:{
    text:`Mrs. Monroe doesn't knock. She never knocks anymore. She comes in like the room has been waiting for her, drops into the good chair, and smiles at Daisy with the easy confidence of someone who decided long ago that abundance was a virtue.

"So," she says. "What's on the menu?"`,
    choices:[
      {id:"full_preview",label:"Walk her through everything — she wants the full picture",
       result:`Daisy lays out the whole plan: this week, next week, the special recipe she's been holding. Mrs. Monroe listens with genuine delight, asking follow-up questions, offering opinions that are somehow both helpful and self-serving. "I'll talk to the other moms," she says at the end. "You're doing something wonderful here."`,
       lbs:3,momGain:12,rel:10,suspDelta:-1},
      {id:"taste_now",label:"Skip the meeting — feed her now",
       result:`Daisy doesn't bother with the agenda. She brings out the good container — the one she was saving — and Mrs. Monroe has it open before Daisy sits down. "This is why I come," Mrs. Monroe says, mouth full, completely sincere. She stays until the last piece is gone and asks what's for next Tuesday.`,
       lbs:5,momGain:18,rel:12,suspDelta:0},
    ],
  },
};

// ── HOMEROOM QUEEN: Group Activity Events ────────────────────────────────────
export const HOMEROOM_GROUP_ACTIVITIES = {
  parent_meeting:{
    label:"Parent Group Meeting",
    apCost:1,
    text:`All three moms are here — Mrs. Monroe arrived first and has already claimed the good chair near the window; Mrs. Reyes came in mid-sentence about something; Mrs. Calloway is near the back with her jacket buttoned, watching the room. Daisy stands at the front, notepad in hand.

The agenda says: progress updates, enrichment activities, curriculum notes. The room has its own agenda.`,
    choices:[
      {id:"curriculum",label:"Cover the agenda properly — keep the framing intact",
       result:`Daisy goes through everything on the list, thoroughly and warmly. Mrs. Calloway uncrosses her arms by the second item. Mrs. Monroe has her hand in the snack bowl. By the end the meeting has accomplished everything stated and the moms are leaving with containers.`,
       momGain:8,rel:6,suspDelta:-2},
      {id:"recipes",label:"Show them what's coming — open the recipe book",
       result:`Daisy sets the recipe book on the table, opened to the marked section. The room shifts. Mrs. Monroe makes a sound of recognition and immediate desire. Mrs. Reyes leans forward. Mrs. Calloway says "Is that the cardamom one?" and then looks briefly surprised at herself for knowing. The meeting lasts ninety minutes. No one references the agenda.`,
       momGain:14,rel:8,suspDelta:1},
      {id:"refreshments_first",label:"Start with refreshments — the agenda can wait",
       result:`"Before we get into it—" Daisy sets the big container on the table. Mrs. Monroe has it open before the sentence is finished. The agenda waits. The refreshments require full attention. Mrs. Calloway has eaten three pieces before the first item is mentioned. The meeting is excellent.`,
       momGain:18,rel:10,suspDelta:0},
    ],
  },
  health_unit:{
    label:"Health Unit — Measurements",
    apCost:2,
    phases:[
      {
        text:`The scale is at the front, the measuring tape on the desk. Health unit day. The girls know what this is — they've been waiting for it, each in their own way.

Sofia is already standing near the scale, easy and unhurried.`,
        choices:[
          {id:"official",label:"Run it officially — record everything for the school file",
           result:`Height, then weight. Daisy reads the numbers aloud and writes them in the class health file — the one that goes to the school nurse. The numbers are accurate. The numbers are notable. The file will be interesting reading for whoever opens it next.`,
           rel:4,suspDelta:2,revealsWeights:true},
          {id:"personal",label:"Keep personal records only — this stays in the notebook",
           result:`Daisy writes the numbers in the apron-pocket notebook, not the school file. These measurements are hers. She looks at the numbers for a long moment before closing the cover. Then she smiles.`,
           rel:6,suspDelta:-1,revealsWeights:true},
        ],
      },
      {
        text:`The students are done. Pickup time, and Mrs. Monroe has been here through the whole thing — she came in early as she always does and has been watching from the back row with an expression that isn't quite casual.

"I haven't been weighed since my last physical," she says. She looks at the scale. "Can I—"`,
        choices:[
          {id:"weigh_moms",label:"Offer the scale to all three — make it an event",
           result:`Mrs. Monroe goes first with the ease of someone completely unafraid of what the scale will say. Mrs. Reyes goes second with the expression of someone who already knew. Mrs. Calloway goes last, says "don't tell Kayla," and then laughs — surprising everyone including herself. The notebook records all three.`,
           rel:8,suspDelta:0,revealsParentWeights:true},
          {id:"decline",label:"Keep it to the students — stay professional",
           result:`"This one's just for the class," Daisy says. Mrs. Monroe nods without any sign of being bothered. She's comfortable with herself regardless of what the scale would say. She doesn't need the number to know.`,
           rel:4,suspDelta:-1},
        ],
      },
    ],
  },
};

// Subject journal entries for the psych_researcher feeder_focus path.
// Keyed by subject archetype, 11 entries per archetype (one per weight stage 0–10).
export const FEEDER_SUBJECT_JOURNALS = {
  cheerleader:[
    `OMG, I can't believe I actually agreed to this! Professor [Name] and Nadia said it was for her big thesis on feederism, and the extra credit plus helping a classmate sounded super fun. At first it was just her bringing me snacks during our sessions. I feel a little bloated lately, my tummy pressing slightly against my skirt after the evening feedings. It's kinda weird… but also kinda nice? The way she watches me eat with that intense look in her heavy eyes makes me feel all tingly, especially in my chest and hips. I keep thinking about the next session though. That full feeling is kinda satisfying, like after a killer practice!`,
    `It's only been a few weeks but my uniform is getting tighter! My stomach has this cute little curve now that sits in my lap when I sit, and my boobs feel extra sensitive, pushing against my sports bra. I keep catching myself rubbing my middle after she stuffs me. Nadia is so encouraging, her own massive body leaning in close, her hand sometimes brushing my growing belly while she feeds me. I get all warm and giggly when she praises me for finishing everything. I'm actually getting excited before every session now! The way my body is softening up… it's turning me on way more than I thought. Like, how much more can this cheer bod take? I'm lowkey curious!`,
    `OMG, fuck… I'm getting so much softer! My belly is round and jiggly now, hanging over my pants when I stand, my thighs rubbing together, and my ass starting to strain my panties. My boobs feel heavier too, bouncing more with every step. Last night Nadia looked so happy feeding me, her enormous body squished against the table while she pushed more snacks into my mouth. I moaned right out loud with my mouth full and she smiled so big! I can't stop replaying it. Every time I feel how much heavier and bouncier I'm getting, I get super wet. I want her to keep going! I want to feel even fuller, even bigger. Go team, right?`,
    `I'm definitely getting curvier and… I'm kinda loving it? My belly sways and jiggles with every step, hanging heavy, while my ass is getting plushier and my panties are starting to dig in. My chest is bouncing more too, almost overflowing my bra! Last night she fed me for almost two hours straight, her heavy body pressed warmly against my side while she kept stuffing me. I was soaked the whole time, moaning and cheering her on between bites like "more, more!" The fuller I get, the hornier and happier I feel. I want her to make me so much bigger — like, championship size!`,
    `My gut is this big round ball that rests on my thick thighs when I sit, always gurgling after sessions, and my ass has gotten huge, spreading wide and threatening to break my panties every time I plop down. My boobs feel so full and heavy now. Nadia gets so turned on watching me grow — she was panting while rubbing my swollen belly and feeding me tons of desserts. I came just from her hand pressing on my fat gut and all her praise! I'm totally addicted now. I think about being stuffed and growing fatter for her like, all day. This is my new favorite sport!`,
    `My belly hangs down to my knees when I stand, with thick rolls everywhere. Walking makes everything wobble and slap, and I get out of breath fast, but I love it! My ass jiggles like crazy and my bra is definitely losing the fight with my growing bust. Nadia looks at me like I'm her star player, her own enormous body shaking as she waddles over to feed me. She whispers how much she loves how fat I'm getting while stuffing me until I'm gasping. I live for that helpless, full feeling — like I'm swelling up just for her. Ready to take it to the next level!`,
    `My body is this massive, soft, jiggling mess. My belly is huge, resting heavy on my lap and spreading across my thunder thighs. My ass has gotten enormous, and my boobs rest heavily on top of my gut. I can barely reach between my legs under all this blubber anymore. Last session she had to help me waddle to the couch before pouring calories into me. Her own very fat body smothered me while she fed me and I loved every second. I'm completely broken for this. I don't even pretend it's just for the study anymore. I just need to get fatter and fatter. Ruin me, coach!`,
    `My body is so huge and heavy I mostly just sit or lie down now. Rolls on rolls spill over my sides and lap, my massive ass spreading out beneath me and my bust overflowing whatever I try to wear. Moving is getting hard but every wobble turns me on so much. Nadia gets crazy excited seeing how massive I'm becoming. She buries her face in my belly while feeding me, moaning about how perfect my growing body is. I crave that tight, stuffed feeling and the way she worships every new pound. I'm still giving it my all — go bigger team!`,
    `My body takes up so much space, my belly a vast heavy apron covering most of my lap and thighs with deep soft folds. My ass is gigantic and my breasts are so heavy they rest on top of everything. I can barely walk more than a few steps without panting, but god I'm addicted to this size. When she feeds me, her colossal body presses into my immense softness and I cum just from being so full and fat. I want more! I want to lose myself completely in all this blubber for her. This is my new cheer routine!`,
    `Everything about me is gigantic and super hard to move. My breasts rest heavily on top of my massive belly that spreads out wide, while my ass creates a huge soft cushion beneath me. I need help shifting around now. Nadia is obsessed with how huge I've gotten. She spends hours rubbing my endless rolls while force-feeding me, telling me how beautiful my blubber is. I'm constantly turned on by my own size. I don't want this to stop — keep pumping me up, make me your biggest star!`,
    `My body has melted into this vast sea of soft, quivering fat spreading across the reinforced bed. I can barely move at all. My enormous breasts and gigantic ass dominate everything, every breath making me jiggle. She feeds me almost nonstop and I beg her for more in my breathy little cheer voice. Being this helplessly, impossibly fat is ecstasy. I exist just for the feeding, the growth, and her hands sinking deep into my endless softness. I'm completely hers — best decision ever!`,
  ],
  bookworm:[
    `I still can't quite believe I consented to this experiment. As a psychology student myself, I understood the methodology: Nadia needed a live subject for her feederism thesis, and the extra credit was logically sound. At first it was only calculated snacks during our sessions. Lately I notice a slight bloating, my previously flat stomach pressing lightly against my waistband. It's… intellectually interesting. The way she observes me with those heavy-lidded eyes triggers an unexpected cognitive response in me. My boyish frame remains mostly linear, but I find myself anticipating the next session with curious anticipation. The sensation of fullness is oddly rewarding, like completing a difficult chapter.`,
    `Only a few weeks in and my shirts are already fitting differently. There's a small, persistent curve forming where my stomach used to be perfectly flat. I catch myself absently tracing it after feedings, analyzing the shift in my own body schema. Nadia is methodical in her encouragement, her massive body leaning close, occasionally making contact while offering more. I experience an unfamiliar warmth when she praises my compliance. My straight, boyish figure is beginning to soften in subtle ways. This is turning me on far more than statistical probability would suggest. I keep journaling my internal responses — purely for the study, of course. How far will my mind allow my body to go?`,
    `My resistance is eroding faster than expected. My belly has become noticeably rounded and jiggly, hanging slightly when I stand, while my once-flat chest and narrow hips are starting to yield to softness. My thighs now brush together, creating a constant tactile reminder. During last night's session Nadia seemed deeply satisfied as she fed me, her enormous body pressed close while she methodically pushed more calories past my lips. I moaned — an involuntary response I'm still trying to rationalize. Every new layer of fat on my previously straight frame arouses me in ways that challenge my prior self-concept. I want her to continue. I need data on how much further this can progress.`,
    `I'm becoming undeniably softer and rounder, and my intellectual curiosity has shifted into something more compulsive. My belly sways when I walk, heavy enough now to force adjustments to my clothing. My boyish hips are widening, my flat chest growing pudgy. Last night she fed me for nearly two hours, her heavy body warm against mine as she kept refilling my plate. I was dripping wet the entire time, whispering "more" between bites like a subject in one of my textbooks. The psychological surrender is intoxicating. I love how my once-angular body is being reshaped. I want her to make me much bigger — I need to document every aspect of this transformation.`,
    `My gut has become a prominent, rounded weight that rests on my thighs when seated, constantly active after sessions. My ass has finally started to fill out, spreading noticeably when I sit, while my chest has developed soft handfuls. Nadia grows visibly excited watching my progress — she was breathing heavily while rubbing my swollen belly and methodically feeding me rich desserts. I orgasmed from the combination of pressure and verbal reinforcement alone. The feederism dynamic has rewired my reward centers. I think about being stuffed and expanding almost constantly now. This isn't just research anymore; I'm becoming a willing case study.`,
    `I'm heavy enough that movement is noticeably effortful. My belly hangs down significantly, layered with rolls, while my boyish frame has been almost entirely padded over. Walking makes my softened body wobble and collide. I grow short of breath easily, yet the sensation fascinates me. Nadia regards me with possessive academic pride, her own enormous form quaking as she approaches to feed me. She murmurs observations about my growth while pushing me toward capacity. I live for this helpless fullness, for the way my mind dissolves into pleasure every time she breaks down my remaining inhibitions.`,
    `My body is this massive, soft, jiggling mass. My belly is huge, resting heavily on my lap and spreading across my thickened thighs. I can barely reach between my legs under all this padding anymore. Last session she had to help me waddle to the couch before pouring calories into me. Her own very fat body smothered me while she fed me and I loved every second. I'm completely broken for this. The psychological conditioning is textbook — I don't even pretend it's just for the study anymore. I just need to get fatter and fatter. Ruin me with science.`,
    `My body is so huge and heavy I mostly just sit or lie down now. Rolls on rolls spill over my sides and lap. Moving is getting genuinely difficult but every wobble sends psychological sparks through me. Nadia gets intensely excited seeing how massive I'm becoming. She buries her face in my belly while feeding me, moaning about how perfect my expanding form is as a subject. I crave that tight, overfilled feeling and the way she worships every new pound. My analytical mind has fully surrendered to the fetish.`,
    `My body takes up so much space, my belly a vast heavy apron covering most of my lap and thighs with deep soft folds. I can barely walk more than a few steps without panting, but I'm addicted to this size on a neurological level. When she feeds me, her colossal body presses into my immense softness and I cum just from being so overwhelmingly full and fat. I want more. I want to lose myself completely in all this blubber for her — the ultimate case study in feederism psychology.`,
    `Everything about me is gigantic and nearly immobile. My chest rests heavily on top of my massive belly that spreads out wide, while my ass creates a huge soft base beneath me. I need help shifting around now. Nadia is obsessed with how huge I've gotten. She spends hours rubbing my endless rolls while force-feeding me, telling me how beautiful my transformation is. I'm constantly turned on by my own size. I don't want this to stop — I need her to keep pushing the limits of what a body can become.`,
    `My body has melted into this vast sea of soft, quivering fat spreading across the reinforced bed. I can barely move at all. Every breath makes me jiggle. She feeds me almost nonstop and I beg her for more in my quiet, scholarly voice. Being this helplessly, impossibly fat is pure psychological ecstasy. I exist just for the feeding, the growth, and her hands sinking deep into my endless softness. I'm completely hers — the perfect subject.`,
  ],
  influencer:[
    `Ugh, I can't believe I'm actually doing this. The professor and Nadia said it would be good for her feederism thesis and that it could make for interesting content with the right editing. At first it was just some snacks during our sessions, but now I feel bloated all the time, my flat tummy pressing noticeably against my crop tops after every feeding. This is so annoying — my hourglass figure is literally my entire brand and I don't like how it's starting to feel softer around the edges. My followers are definitely going to notice if I'm not careful with angles. Still, the way she stares with those heavy eyes while I eat is kinda weirdly intense. I just want to get this over with and go back to my normal body.`,
    `This is getting ridiculous. My tops are tighter already and there's this annoying little curve on my stomach that wasn't there before, plus my boobs feel extra sensitive and heavy in my bras. I keep catching myself poking at it after sessions, annoyed that my perfect tiny waist is being messed with. Nadia keeps encouraging me in that calm way, her massive body leaning in close while she feeds me more. I'm only doing this for the extra credit and potential collab content, but it's genuinely upsetting how my signature curves are starting to shift and lose definition. I better not lose any sponsorships over this or I'll be pissed.`,
    `I'm so frustrated with this whole thing. My belly is getting round and jiggly, hanging over my designer jeans when I stand, and my thighs rub together now which is ruining my walk for videos. My ass is straining my thongs more than usual and my bra feels tighter on my chest as everything swells. Last night Nadia looked way too pleased while feeding me, her enormous body pressed close as she kept pushing food in. I moaned by accident and it made me even more annoyed at myself. I'm not enjoying this at all — my hourglass shape is my whole identity and it's being distorted in ways that stress me out. How much longer do I have to do this before I can stop?`,
    `This is seriously messing up my brand and I'm not okay with it. My belly sways when I walk now, heavy and noticeable, while my ass has gotten plushier and my panties keep digging in uncomfortably. My chest is bouncing more and almost overflowing my bras with every movement. Last night she fed me for almost two hours, her heavy body warm against mine while she stuffed me relentlessly. I was uncomfortable the whole time and kept complaining between bites about how this was ruining my figure. I'm still vaguely annoyed at how much my curvy hourglass is changing, but I guess it could make for a dramatic "glow up" redemption arc later if I spin it right. Maybe.`,
    `My gut is this big round ball that rests on my thighs when I sit, constantly gurgling, and my ass has gotten huge — spreading wide and threatening to break my favorite panties every time I plop down. My boobs feel so full and heavy they're hard to ignore. Nadia was panting while rubbing my swollen belly and feeding me rich desserts. I got weirdly wet but I'm still mostly upset about the whole situation. My influencer body is getting ruined and I keep thinking about how I'm going to explain these changes to my followers without losing engagement. I'm doing this for the study, but I'm definitely not happy about how plush and exaggerated my hourglass is becoming.`,
    `Okay… I'm heavy now and something inside me has totally shifted. My belly hangs down noticeably with thick rolls, my ass jiggles like crazy with every step, and my bust is overflowing everything I own in the best way. Walking leaves me out of breath but the way it all wobbles and sloshes feels… good. Really good. Nadia looks at me like I'm her masterpiece, her enormous body shaking as she waddles over to feed me. She whispers how hot my growing curves are while stuffing me and I got absolutely soaked. I'm actually into this now. I want her to make me bigger — this could be my new niche content and rebrand.`,
    `I'm so fucking fat and I'm loving every single second of it. My body is a massive, soft, jiggling mess. My belly rests heavily on my lap, spreading across my thunder thighs, while my enormous ass creates a huge soft cushion beneath me and my heavy boobs sit on top of everything. I can barely reach between my legs under all this blubber anymore. Last session she had to help me waddle to the couch then smothered me with her very fat body while feeding me nonstop. I came so hard I saw stars. I don't care about the study anymore — I need to get fatter. Ruin my perfect influencer body and make it legendary.`,
    `My body is so huge and heavy I mostly just sit or lie down now. Rolls spill everywhere, my massive ass spreads out wide beneath me, and my bust overflows whatever I try to wear. Moving is genuinely hard but every wobble and slap turns me on like crazy. Nadia gets so excited seeing how massive my hourglass has become. She buries her face in my belly while feeding me, moaning about my perfect exaggerated curves. I crave being stuffed beyond full and I'm constantly posting subtle angles of my growth to tease my followers. This is my new brand — bigger is undeniably better.`,
    `My body takes up so much space now. My belly is a vast heavy apron with deep soft folds, my gigantic ass dominates everything beneath me, and my breasts are so heavy they rest on top of it all. I can barely walk without panting but I'm completely addicted to this size. When she feeds me, her colossal body presses into my immense softness and I cum just from how overwhelmingly full and fat I feel. I want more. I want to lose myself in all this blubber for her and my followers. This is going to break the internet when I finally show it.`,
    `Everything about me is gigantic and almost impossible to move. My breasts rest heavily on top of my massive belly that spreads out wide, while my enormous ass makes a huge soft base underneath. I need help shifting positions constantly now. Nadia is obsessed with my size. She spends hours rubbing my endless rolls while force-feeding me, telling me how insanely sexy my exaggerated hourglass has become. I'm constantly turned on by my own body and the power it gives me. Don't stop — pump me up and make me the biggest influencer ever.`,
    `My body has melted into a vast sea of soft, quivering fat spreading across the reinforced bed. I can barely move at all anymore. My enormous breasts and gigantic ass dominate everything around me, jiggling with every breath I take. She feeds me almost nonstop and I beg for more in my breathy influencer voice, telling her exactly what I need. Being this helplessly, impossibly fat is pure ecstasy. I exist just for the feeding, the endless growth, and her hands sinking deep into my endless curves. I'm completely hers — and this is going to break the internet.`,
  ],
  athlete:[
    `Ugh, this better be worth the extra credit. Professor and Nadia convinced me to be the subject for her feederism study, saying it would explore extreme behavior change. At first it was just extra snacks after practice, but now I feel constantly bloated. My once tight, toned core is pressing against my training shorts in a way that's really annoying. I worked hard for these defined muscles and strong legs, and I don't like how soft it's starting to feel. The way she watches me eat with those heavy eyes is intense, but I'm just trying to push through this for the grade.`,
    `This is getting irritating. My shirts are tighter across my stomach and there's this unwanted little pouch forming where my toned abs used to show. My boobs feel heavier and my muscular thighs are losing their sharp definition. I keep poking at the new softness after sessions, frustrated that my strong, trained body is being compromised. Nadia encourages me constantly, her massive frame leaning in while she feeds me more. I'm only doing this because I said I would, but it upsets me how my once powerful, muscular build is starting to blur. I better not lose my speed on the field.`,
    `I'm genuinely pissed about how this is changing me. My belly is getting round and jiggly, hanging slightly over my waistband, while my once muscular thighs now rub together. My ass feels fuller and my chest is softer too. Last night Nadia looked way too satisfied as she fed me, her enormous body pressed close while she kept shoving in calories. I let out an annoyed moan and immediately regretted it. My toned frame is being buried under this unwanted roundness and it stresses me out. How much more of this do I have to endure before the study is done?`,
    `My competitive edge is suffering because of this. My belly sways noticeably when I move, heavy and round, while my once defined waist has disappeared into softness. My ass and thighs have gotten plush, losing their muscular cut. Last night she fed me for nearly two hours, her heavy body warm against my side as she stuffed me. I complained the whole time about how this was ruining my training progress. I'm still mostly annoyed at how my strong, muscular body is turning into something so round and jiggly. Maybe I can work it off later.`,
    `This is messing with my identity as an athlete. My gut has become a big, round ball that rests on my thighs when I sit, constantly full and gurgling. My ass spreads wide and my chest feels heavy and soft. Nadia was breathing hard while rubbing my belly and feeding me large portions. I got a little turned on but I'm still mostly upset. My once lean, powerful build is being replaced by this round, padded shape and I keep worrying about how it'll affect my performance. I'm doing this for the research, but I hate how round I'm getting.`,
    `My body feels so heavy and round now, with a big hanging belly, thick rolls, and a fully rounded ass and thighs that wobble with every movement. I get out of breath fast but I'm starting to love how soft and massive it all feels. The constant jiggle and the way my belly rests heavily in my lap turns me on more than I ever expected. Nadia looks at me with real hunger, her enormous body shaking as she feeds me. She whispers how much she loves my new round shape and I got soaking wet. I want her to keep going and make me even rounder.`,
    `I'm so fucking fat and completely obsessed with how round I've become. My body is one massive, soft, jiggling sphere. My belly rests heavily on my lap like a huge ball, spreading across my thick thighs, while my ass creates a wide rounded cushion and my chest sits soft and full on top. I can barely reach under all this roundness anymore. Last session she helped me waddle over then smothered me with her very fat body while feeding me. I came so hard. I don't care about sports anymore — I need to get rounder. Make me huge and spherical.`,
    `My body is so massively round and heavy that I mostly sit or lie down now. Deep rolls spill over my sides and my huge rounded belly dominates everything. My ass has become an enormous soft sphere beneath me. Moving is difficult but every wobble feels incredible, like my whole body is built for pleasure now. Nadia gets so excited by how perfectly round I've grown. She buries her face in my belly while feeding me, moaning about my spherical shape. I crave being stuffed until I feel like I might pop. This roundness is my new obsession.`,
    `I'm enormous and so incredibly round now. My belly is a vast, heavy, spherical apron with deep folds, covering most of my lap and thighs. My ass and hips form one giant rounded base while my breasts rest heavily on top. I can barely walk but I love how completely full and soft I feel all the time. When she feeds me, her colossal body presses into my round softness and I cum just from how full and perfectly spherical I feel. I want more. I want to become even rounder for her.`,
    `Everything about me is gigantic, round, and almost immobile. My massive rounded breasts rest on top of my huge spherical belly that spreads out wide in every direction, while my ass makes an enormous padded base. I need help to shift at all now. Nadia is obsessed with how round I've become. She spends hours rubbing and feeding my endless curves, telling me how beautiful my fully spherical body is. I'm constantly turned on by how round and heavy I am. Keep going — make me bigger and rounder.`,
    `My body has become a vast, quivering round blob spread across the reinforced bed. I can barely move at all. Every breath makes my enormous spherical belly, huge breasts, and gigantic rounded ass jiggle. She feeds me nonstop and I beg for more, loving how completely round and helpless I feel. Being this impossibly fat and round is pure bliss. I exist only for the feeding, the constant growth, and her hands sinking deep into my endless round softness. I'm completely hers.`,
  ],
  artsy:[
    `I can't believe I let them talk me into this. The professor and Nadia framed it as a living art piece — a study on feederism psychology and the transformation of the body as canvas. At first it was just snacks during our sessions, but now I feel bloated and heavy. My once flat, boyish stomach presses uncomfortably against my loose painter's smock. I worked hard to keep this straight, angular silhouette — narrow hips, small chest, sharp lines. This softness feels like a betrayal of my aesthetic. The way she watches me with those heavy eyes is intense, but I'm mostly annoyed. I hope this project is worth the distortion.`,
    `This experiment is becoming a nuisance. My shirts hang differently now, with a small unwanted curve forming where my stomach used to be perfectly flat. My boyish chest feels slightly fuller and my narrow hips are losing their clean lines. I keep tracing the changes with my fingers after sessions, sketching them in my notebook with frustration. Nadia encourages me so patiently, her massive body leaning close while she feeds me. I'm only participating for the conceptual depth it might bring to my art, but it upsets me how my straight, androgynous form is starting to blur. I didn't sign up to lose my silhouette.`,
    `I'm irritated by how quickly this is altering me. My belly has grown round and jiggly, hanging slightly when I stand, while my once flat chest and narrow hips are yielding to unwelcome padding. My thighs now brush together with every step. Last night Nadia seemed lost in the process as she fed me, her enormous body pressed close while pushing more into my mouth. I let out an annoyed sound and felt embarrassed. My boyish, straight figure is being buried under this growing roundness and it disrupts my self-image as an artist. I'm counting the days until this study ends.`,
    `My body is losing its artistic purity. My belly sways when I walk, heavy and noticeable, while my narrow hips have widened and my flat chest has grown soft and pudgy. Last night she fed me for nearly two hours, her heavy body warm against mine as she kept offering more. I complained between bites about how this was ruining my clean lines and androgynous aesthetic. I'm still mostly annoyed at how my straight, boyish frame is turning into something so plush and distorted. Maybe I can use these sketches as raw material later.`,
    `This is conflicting with everything I thought I was. My gut has become a prominent rounded weight that rests on my thighs when I sit, constantly active. My ass has started spreading when I sit and my boyish chest now has soft handfuls. Nadia was visibly excited while rubbing my belly and feeding me. I felt a flicker of arousal but pushed it away — I'm still upset. My once angular, straight figure is being replaced by this padded, softening shape and it makes me anxious about my identity as an artist. I'm doing this for the project, but I don't like it.`,
    `My body feels so heavy and full now, with a big hanging belly layered in soft rolls and a rounded ass that sways with every movement. My previously flat chest has grown tender and sensitive. I get out of breath easily but I'm starting to appreciate the way everything jiggles and presses together — it's like my form has become a living sculpture of abundance. Nadia looks at me with such intensity, her enormous body shaking as she feeds me. She murmurs how beautiful my softening shape is and I got unexpectedly wet. I want her to keep going. There's something poetic about surrendering to this growth.`,
    `I'm so fucking fat and I'm completely captivated by it. My body has become one massive, soft, jiggling form. My belly rests heavily on my lap like a thick apron, spreading across my thickened thighs, while my ass has grown wide and cushioned and my chest sits full and tender on top. I can barely reach under all this padding anymore. Last session she helped me waddle to the couch then smothered me with her very fat body while feeding me. I came so intensely it felt like art in motion. I don't care about my old straight lines anymore — I need to get fatter. Turn me into something beautifully excessive.`,
    `My body is so huge and heavy I mostly sit or lie down now. Rolls spill over my sides and lap in deep, artistic folds. My ass spreads wide beneath me and my softened chest rests heavily. Moving is difficult but every wobble sends waves of pleasure through me, like my entire canvas is alive with sensation. Nadia gets so excited by how much I've grown. She buries her face in my belly while feeding me, whispering how perfect my expanding form is. I crave that tight, overfull feeling and the psychological release it brings. My mind has fully embraced this new aesthetic.`,
    `I'm enormous and wonderfully overwhelmed by my size. My belly is a vast heavy apron with deep soft folds covering most of my lap and thighs. My ass has become gigantic and my chest rests heavily on top of everything. I can barely walk but I love how completely soft and weighted I feel. When she feeds me, her colossal body presses into my immense padding and I cum just from the overwhelming fullness. I want more. I want to dissolve completely into this blubber and let it become my ultimate artistic expression.`,
    `Everything about me is gigantic and nearly immobile. My softened chest rests on top of my massive belly that spreads out wide, while my huge ass creates a vast cushioned base. I need help shifting positions now. Nadia is obsessed with my transformation. She spends hours rubbing my endless rolls while force-feeding me, telling me how breathtaking my lost-boyish form has become. I'm constantly aroused by my own size and the psychological depth of this surrender. Keep pushing me — make me your largest masterpiece.`,
    `My body has melted into a vast sea of soft, quivering fat across the reinforced bed. I can barely move at all. Every breath makes my heavy belly, full chest, and enormous ass tremble. She feeds me almost constantly and I beg for more in my soft, dreamy voice. Being this helplessly, impossibly fat is pure ecstatic release. I exist only for the feeding, the endless growth, and her hands sinking deep into my boundless softness. I'm completely hers — the living embodiment of surrendered art.`,
  ],
  eced:[
    `I can't believe I volunteered for this. The professor and Nadia said it would be good experience for my Early Childhood Education major — understanding human behavior or something. At first it was just snacks during our sessions, but now I feel so bloated and uncomfortable. My soft mom-bod tummy is pressing against my shirts more than usual, and my wide hips feel tighter in my pants. I've always had this curvy, maternal shape with a little belly and full breasts, and I don't like how much softer it's getting. This is annoying. I'm supposed to be a role model for kids one day, not… this.`,
    `This is starting to worry me. My tops are fitting tighter around my middle and my belly has this extra little pouch that wasn't as noticeable before. My heavy breasts feel even fuller and my thick thighs rub more when I walk. I keep adjusting my clothes after sessions, upset that my natural mom-bod is getting softer and rounder. Nadia is so encouraging, her massive body leaning close while she feeds me. I'm only doing this for the credits to help with my teaching degree, but it bothers me how my nurturing curves are losing definition. I hope this doesn't affect how I look in the classroom.`,
    `I'm really frustrated with these changes. My belly has grown round and jiggly, hanging over my waistband, while my wide hips and thick thighs feel even plushier. My full breasts bounce more with every step. Last night Nadia looked too pleased as she fed me, her enormous body pressed close while she kept offering more. I let out an annoyed sigh and felt embarrassed. My soft mom-bod is being exaggerated in all the wrong ways and it stresses me out. How can I teach little kids if I keep getting bigger like this?`,
    `This is really messing with my confidence. My belly sways when I walk now, heavy and obvious, while my wide hips have gotten softer and my full breasts strain against my bras. Last night she fed me for nearly two hours, her heavy body warm against mine as she stuffed me. I kept gently complaining between bites about how this was changing my mom-bod shape. I'm still mostly annoyed at how my naturally curvy, maternal figure is becoming even rounder and heavier. I keep thinking about how I'll explain this to my future kindergarteners.`,
    `My gut has become a big, round ball that rests on my thick thighs when I sit, constantly gurgling. My wide hips spread out more and my heavy breasts feel swollen and tender. Nadia was breathing hard while rubbing my belly and feeding me. I felt a strange warmth but I'm still mostly upset. My mom-bod is getting so much softer and fuller, especially in my middle and chest, and I worry it'll make me look unprofessional as a teacher. I'm doing this for the study, but I don't like how maternal and plush I'm becoming.`,
    `My body feels so heavy and warm now, with a big soft hanging belly, thick rolls, and wide hips that sway gently with every step. My full breasts rest heavily on top of my growing tummy and everything jiggles in the softest way. I get tired easily but I'm starting to love how comforting and full it all feels — like I'm becoming the ultimate nurturing figure. Nadia looks at me with such care, her enormous body shaking as she feeds me. She whispers how beautiful my mom-bod has grown and I got very wet. I want her to keep going and make me even softer.`,
    `I'm so fat and I'm completely falling in love with it. My body is a massive, soft, jiggling mom-bod dream. My belly rests heavily on my lap like a thick, pillowy apron, spreading across my wide thighs, while my enormous ass creates a huge cushioned seat and my heavy breasts sit full and dominant on top. I can barely reach under all this softness anymore. Last session she helped me waddle over then smothered me with her very fat body while feeding me. I came so hard it felt almost maternal. I don't care about being "professional" anymore — I need to get fatter and softer.`,
    `My body is so huge and heavy I mostly sit or lie down now. Deep rolls spill over my sides, my massive soft belly dominates my lap, and my wide hips and thick ass spread out beneath me while my heavy breasts overflow everything. Moving is hard but every gentle wobble feels so comforting and sensual. Nadia gets so excited seeing how motherly I've become. She buries her face in my belly while feeding me, moaning about how perfect my soft, full mom-bod is. I crave being stuffed and feeling this endless maternal warmth.`,
    `I'm enormous and so wonderfully soft now. My belly is a vast heavy apron with deep folds covering most of my lap and thighs, my wide hips and huge ass forming a massive cushioned base, and my heavy breasts resting heavily on top. I can barely walk but I love how nurturing and full my body feels all the time. When she feeds me, her colossal body presses into my immense softness and I cum just from how warm and maternal I feel. I want more. I want to become the ultimate soft mom-bod for her.`,
    `Everything about me is gigantic and almost impossible to move. My heavy breasts rest on top of my massive soft belly that spreads out wide, while my enormous ass and thick hips create a huge padded foundation. I need help shifting positions constantly. Nadia is obsessed with my transformation. She spends hours rubbing my endless rolls while force-feeding me, telling me how beautiful and comforting my full mom-bod has become. I'm constantly turned on by how soft, heavy, and maternal I feel. Keep going — make me even bigger and softer.`,
    `My body has melted into a vast, quivering sea of warm, maternal fat spread across the reinforced bed. I can barely move at all. My enormous heavy breasts, gigantic soft belly with its deep rolls, and massive cushioned ass and hips dominate everything, jiggling gently with every breath. She feeds me almost nonstop and I beg her in my sweet, caring voice for more, feeling like the softest, most nurturing being possible. Being this helplessly, impossibly fat and motherly is pure bliss. I exist only for the feeding, the constant growth, and her hands sinking deep into my endless, pillowy mom-bod. I'm completely hers.`,
  ],
  overachiever:[
    `This study is an unexpected variable in my academic plan. As an overachiever, I calculated the risks, but my body is already showing minor deviations. My stomach has a slight outward push, softening the flat line I've always maintained through disciplined exercise. My chest and hips remain straight and unremarkable, which is efficient. Still, I find myself documenting every extra calorie with precision. When the feeder brings snacks, I protest logically — "This isn't optimal for my GPA focus" — yet I consume them methodically. I refuse to let minor softness derail my goals. I will simply adjust my regimen later. For now, this is data collection. My straight frame can handle a small surplus. I remain in control of the variables.`,
    `My measurements are showing consistent upward trends. My midsection has developed a soft layer that disrupts my previously flat profile, pressing lightly against my waistbands. My thighs have begun to touch when I walk, a new inefficiency. Breasts remain small and unobtrusive. I continue to excel in classes while managing this experiment, but I notice myself calculating calories with increasing frequency. I tell her the portions are excessive, yet I finish every serving with focused determination. This is simply a temporary phase in my research participation. I will optimize later. The added weight feels heavier in my core, but I refuse to let it affect my performance. Straight-bodied girls like me adapt quickly. I am still the top performer.`,
    `The softening is accelerating. My once perfectly flat torso now has a noticeable plushness, especially lower down, creating a gentle curve that affects how my clothes fit. My thighs have thickened further, rubbing with each step and reducing my speed between lectures. My chest remains relatively unchanged for now. I maintain excellent grades, but I find myself anticipating feeding sessions with clinical curiosity. I voice objections about sustainability, yet I eat with the same drive I apply to assignments. This lower-body expansion is inefficient, but I'm documenting every sensation. My straight frame is shifting, becoming less aerodynamic. Still, I refuse to fall behind. I will master this variable like every other challenge.`,
    `I'm falling behind my own standards. My belly has grown into a prominent soft dome that jiggles when I move, destroying the flat silhouette I worked so hard to maintain. My thighs are now thick and powerful, spreading when I sit and making crossing my legs difficult. My breasts have started to swell noticeably, becoming heavier and more sensitive. I still lecture myself on portion control, but my voice lacks conviction when she offers more. The fullness provides an unexpected focus boost at first, then leaves me lethargic. As an overachiever I should stop, yet I continue pushing myself to finish every plate. This is becoming a new metric I feel compelled to maximize.`,
    `My body is no longer efficient. This plump belly rests heavily on my lap, soft and round, while my thighs have become truly massive, thick pillars of flesh that dominate my lower half. My breasts have grown significantly, heavy and full, straining against my once-loose shirts and bouncing with movement. I still try to maintain my perfect student image, but I whisper for larger portions now. The pleasure of expansion is interfering with my rational thought. I tell myself this serves the study, but deep down I know I'm chasing the sensation of becoming softer and heavier. My straight figure has transformed into something far more voluptuous. I need to stay competitive… even in this.`,
    `I admit it — I'm addicted to the progress. My heavy belly is a massive, soft weight that I constantly touch and measure. My thighs are enormous, rubbing constantly and forcing a wider stance. Most noticeably, my breasts have become huge, heavy, and hypersensitive, resting on top of my gut and bouncing with every breath. I used to fight this, but now I prepare for her visits like I used to prepare for exams. I beg quietly but intensely for more calories. This overachiever needs to push further. I want to excel at gaining. I want my tits and thighs to grow even more extreme. The bigger I get, the better I feel. This is my new highest priority.`,
    `This is my best project yet. My fat body is a masterpiece of excess. My enormous breasts dominate my upper half, heavy and swaying, while my belly surges forward and my thighs have become thick, thunderous columns that make walking a deliberate task. I no longer pretend to resist. I demand bigger meals with the same intensity I once used for debate club victories. Every pound feels like an achievement. I spend hours studying my reflection, squeezing my massive tits and thick thighs, proud of how far I've pushed this formerly straight, flat frame. I need to break my own records. Feed me more. Make these curves even more obscene. I refuse to settle for anything less than maximum size.`,
    `I'm very fat and it's the ultimate success. My belly is vast and heavy, my tits are massive and pendulous, resting heavily on my gut, and my thighs are so thick they constantly press together. I've abandoned all previous goals except this one: getting bigger. I greet her with eager, competitive demands for more food, my voice sharp with need. The sensation of my body overflowing, of my enormous breasts and powerful thighs growing heavier, is better than any academic award. I'm addicted to the expansion. Push me harder. I want to dominate this transformation completely. No limits.`,
    `I'm enormous and thriving. This body is my greatest accomplishment. My tits are gigantic, heavy and full, constantly in the way yet incredibly sensitive. My thighs are colossal pillars of fat, and my belly is a huge, sagging monument to excess. I moan with focused intensity when she feeds me, demanding she maximize every calorie. My former straight, flat frame has been completely overwritten by these massive, overflowing curves. I live for the growth now. I need my breasts and thighs even larger. This is what peak performance feels like. Keep going. Make me your biggest success.`,
    `I'm colossal and it's exhilarating. My body barely fits in my chair anymore. These gigantic tits rest like heavy weights on my enormous belly, while my thighs are so massively thick they pin me in place. I beg with competitive fervor during every feeding, pushing myself to take more than yesterday. The helplessness, the softness, the sheer scale — it's the ultimate achievement for someone like me. I was flat and straight once. Now I'm a monument to gluttony and I love it. Don't hold back. I want to break every record. Make me even more immense.`,
    `I'm a complete immobile blob and I've never been more proud. This endless, overflowing mass used to be my straight, flat body. My tits are absurdly gigantic, resting like heavy sacks on the vast mountain of my belly, while my thighs have merged into thick, endless cushions that trap me completely. Every breath sends ripples across my soft, hypersensitive form. I whimper and demand more with total desperation, my overachiever drive now solely focused on swelling bigger. Stuff me without mercy. I need to grow even more enormous. This is my ultimate victory — total, helpless, massive expansion. Keep feeding me. I never want to stop.`,
  ],
  sorority:[
    `OMG, I can't believe I agreed to this stupid study. The professor and Nadia said it would be great for her feederism thesis and that I'd basically be helping advance science or whatever. At first it was just snacks during our sessions, but now I feel so bloated all the time. My tummy is pressing against my tight sorority tanks and it's annoying. I've always been super top heavy with my big boobs and tiny waist — that's my signature look — and I hate how it's starting to feel softer. My sisters are going to notice if I'm not careful with photos. This better not ruin my reputation.`,
    `This is getting so annoying. My crop tops are tighter and there's this little pouch on my stomach that wasn't there before. My boobs already feel extra heavy and sensitive, pushing against my bras more than usual. I keep adjusting my top after sessions, frustrated that my perfect hourglass is getting messed up. Nadia keeps encouraging me with that calm voice, her massive body leaning close while she feeds me. I'm only doing this for the extra credit and maybe some good karma points, but it upsets me how my top-heavy figure is starting to lose its sharpness. I better not lose my spot in formal pics.`,
    `Ugh, I'm actually mad about this now. My belly is getting round and jiggly, hanging over my jeans, and my thighs are rubbing together which is ruining my walk. My ass is getting fuller and my already huge boobs feel even heavier and bouncier. Last night Nadia looked way too happy feeding me, her enormous body pressed close while she kept stuffing me. I let out a frustrated moan and felt embarrassed. My top heavy hourglass is my whole brand in the sorority and it's being totally distorted. How much longer do I have to keep doing this?`,
    `This is seriously messing with my vibe. My belly sways when I walk now, heavy and obvious, while my ass has gotten plushier and my panties dig in. My chest is bouncing even more and almost spilling out of every bra I own. Last night she fed me for almost two hours, her heavy body warm against mine while she kept pushing more food on me. I complained the whole time about how this was ruining my perfect top-heavy look. I'm still mostly annoyed at how my curvy figure is changing, especially my boobs getting even bigger on top of this new softness. Maybe I can spin it later.`,
    `My gut is this big round ball resting on my thighs when I sit, and my ass spreads wide, but it's my boobs that feel the heaviest — so full and swollen they're hard to manage. Nadia was panting while rubbing my belly and feeding me desserts. I got a little turned on but I'm still mostly upset. My influencer-worthy top heavy hourglass is getting ruined and I keep worrying about what my sisters will say. I'm doing this for the study, but I hate how exaggerated and plush everything is becoming, especially up top.`,
    `My body feels so heavy and full now, with a big hanging belly and thick rolls that make everything sway. My ass has grown huge and soft, but it's my boobs that feel incredible — they're massive, resting heavily on my growing belly and jiggling with every breath. I get out of breath fast but I'm loving how sensitive and dominant they feel. Nadia looks at me like I'm her dream, her enormous body shaking as she feeds me. She whispers how hot my top heavy curves have become and I got soaking wet. I want her to keep going and make me even bigger.`,
    `I'm so fucking fat and I'm loving every second of it. My body is a massive, soft, jiggling mess. My belly rests heavily on my lap, spreading across my thunder thighs, while my enormous ass creates a huge cushion and my huge boobs sit heavily on top of everything, overflowing and bouncing. I can barely reach between my legs under all this blubber. Last session she helped me waddle to the couch then smothered me with her very fat body while feeding me. I came so hard from the pressure on my chest alone. I don't care about the sorority anymore — I need to get fatter. Make my tits and body huge.`,
    `My body is so huge and heavy I mostly just sit or lie down now. Rolls spill everywhere, my massive ass spreads out wide, and my bust overflows everything I try to wear, resting on my big belly. Moving is hard but every wobble, especially in my chest, turns me on like crazy. Nadia gets so excited seeing how top heavy I've become. She buries her face in my belly while feeding me, moaning about my enormous breasts and curves. I crave being stuffed beyond full. This is my new obsession.`,
    `My body takes up so much space now. My belly is a vast heavy apron with deep folds, my gigantic ass dominates beneath me, and my breasts are so massively heavy they rest on top of everything. I can barely walk without panting but I'm addicted to how powerful and soft I feel, especially up top. When she feeds me, her colossal body presses into my softness and I cum just from how full and top heavy I feel. I want more. I want to lose myself in all this blubber for her.`,
    `Everything about me is gigantic and almost impossible to move. My enormous breasts rest heavily on top of my massive belly that spreads out wide, while my huge ass makes a soft base underneath. I need help shifting positions constantly. Nadia is obsessed with my size. She spends hours rubbing my endless rolls while force-feeding me, telling me how insanely sexy my top heavy body has become. I'm constantly turned on by my own massive chest and curves. Keep pumping me up — make me the biggest.`,
    `My body has melted into a vast sea of soft, quivering fat across the reinforced bed. I can barely move at all. My gigantic breasts and enormous ass dominate everything, jiggling with every breath. She feeds me nonstop and I beg for more in my bubbly sorority voice. Being this helplessly, impossibly fat is pure ecstasy. I exist just for the feeding, the endless growth, and her hands sinking deep into my endless top heavy curves. I'm completely hers.`,
  ],
  transfer:[
    `Mon dieu, I cannot believe I agreed to this. The professor and Nadia told me it would be perfect for her feederism research and that as a transfer student I could earn easy credits. At first it was only little snacks during sessions, but now I feel so bloated. My midsection presses heavily against my blouses, my soft belly rounding out where it used to be flatter. I have always carried weight here in my middle, apple-shaped as they say, and I don't like how much softer it is becoming. Zut, this is annoying. My French figure is being distorted and I am mostly irritated.`,
    `This is becoming quite frustrating. My tops are tighter around my waist and there is this unwanted pouch forming on my belly. My love handles feel more noticeable when I sit. I keep touching the changes after feedings, annoyed that my apple shape is getting even rounder in the middle. Nadia encourages me softly, her massive body leaning close while she offers more food. I only do this for the credits to help with my transfer, but it upsets me how my midsection is losing its shape. I miss my old clothes from back home.`,
    `I am genuinely upset with how this is progressing. My belly has grown round and jiggly, hanging over my waistband, while my love handles have thickened noticeably. My thighs rub a bit more but my chest and hips stay relatively unchanged. Last night Nadia looked too pleased as she fed me, her enormous body pressed close while pushing in more calories. I let out an annoyed sound with my accent slipping. My apple-shaped body is being overwhelmed in the middle and it stresses me. How much longer must I continue this?`,
    `This experiment is ruining my silhouette. My belly sways when I walk now, heavy and prominent, while my love handles spill over my sides. My midsection feels constantly full and soft. Last night she fed me for nearly two hours, her heavy body warm against mine as she kept stuffing me. I complained between bites about how this was distorting my French apple figure. I'm still mostly annoyed at how round and heavy my middle is becoming while the rest stays the same. Perhaps I can hide it with loose sweaters.`,
    `My gut has become a big, round ball that rests heavily on my lap when I sit, constantly gurgling after sessions. My love handles have grown thick and soft, making my waist disappear. Nadia was breathing heavily while rubbing my prominent belly and feeding me rich desserts. I felt a strange flicker but I'm still mostly upset. My apple-shaped body is getting so dominated by this huge soft middle and I worry how it looks in class. I'm doing this for the study, but I hate how exaggerated my midsection has become.`,
    `My body feels so heavy and full now, with a big hanging belly and thick rolls around my middle that sway with every step. My love handles spill generously over my sides and everything in my center wobbles softly. I get out of breath easily but I'm starting to enjoy how warm and heavy my middle feels, like a constant soft presence that makes me feel sensual in a new way. Nadia looks at me with hunger, her enormous body shaking as she feeds me. She whispers how beautiful my round apple shape has grown and I became very wet. I want her to continue.`,
    `I'm so fucking fat and I adore how it feels. My body is a massive, soft, jiggling form dominated by my enormous belly. It rests heavily on my lap like a thick, heavy apron, spreading wide with deep rolls and love handles that quiver constantly. My chest and hips stay modest but my middle is everything now. Last session she helped me waddle then smothered me with her very fat body while feeding me. I came so hard from the pressure on my huge soft belly. I need to get fatter. Make my middle even bigger.`,
    `My body is so huge and heavy I mostly sit or lie down now. Deep rolls and a massive rounded belly dominate my figure, with thick love handles cascading over my sides. Moving is difficult but every wobble of my heavy middle sends pleasure through me, like my whole body centers on this soft, full sensation. Nadia gets so excited by how round my apple shape has become. She buries her face in my belly while feeding me, moaning about how perfect my soft middle is. I crave being stuffed until I feel like bursting.`,
    `I'm enormous and completely addicted to my size. My belly is a vast heavy apron with deep soft folds that cover most of my lap and thighs, my love handles thick and overflowing. I can barely walk without panting but I love how weighted and sensual my middle feels all the time. When she feeds me, her colossal body presses into my immense soft belly and I cum just from how full and round I feel in my core. I want more. I want to let my apple shape grow even bigger for her.`,
    `Everything about me is gigantic and nearly immobile. My massive belly spreads out wide with huge rolls and thick love handles, resting heavily on everything beneath it. I need help shifting positions constantly now. Nadia is obsessed with my transformation. She spends hours rubbing and feeding my enormous soft middle, telling me how beautiful and erotic my apple-shaped body has become. I'm constantly turned on by how heavy and full my belly feels. Keep going — make my middle even more dominant.`,
    `My body has melted into a vast sea of soft, quivering fat that spreads across the reinforced bed. I can barely move at all anymore. My enormous belly dominates everything like a massive, heavy mountain of rolls and deep folds, with thick love handles merging into one endless soft expanse. Every breath makes my huge middle tremble and shift. She feeds me almost nonstop and I beg her in my breathy French accent, "Plus, s'il te plaît… more…" Being this helplessly, impossibly fat with such a huge soft center is pure ecstasy. I exist only for the feeding, the constant growth, and her hands sinking deep into my endless belly. I'm completely hers.`,
  ],
  quiet:[
    `I'm not sure why I agreed to this… The psychology study sounded harmless at first, but now my body is already changing. My hips feel a little wider, my thighs gently brushing when I walk to class. There's a small, soft pouch forming just below my waist, making my skirts sit differently. My bottom feels rounder too, pressing more into the chair when I sit. I keep my voice quiet when the other girl brings food, murmuring that I shouldn't eat so much. But I still do. I tell myself it's only temporary, that I can stop anytime. Yet every time the plate arrives I eat in silence, feeling the subtle new fullness settle low in my pear-shaped frame. I'm still the same quiet girl… just a little softer. I hope no one notices yet.`,
    `My lower body is filling out more than I expected. My hips have widened noticeably, and my thighs rub together with a soft whisper when I walk. The curve of my ass feels heavier, spreading slightly when I sit at my desk. There's a gentle lower belly pooch now that rests above my waistband, soft and warm. I speak so softly when she offers more food, saying "maybe just a little…" but I never refuse. The quiet fullness afterward makes me reflective. I wonder why this sensation comforts me even as I worry about my changing shape. My pear figure was always bottom-heavy, but now it's becoming more pronounced. I still try to hide it under loose clothes, but I can feel the weight shifting lower. Part of me wonders how much further this will go.`,
    `Everything feels softer down below. My thighs have grown thick and plush, pressing firmly against each other with every step. My ass has become rounder and heavier, spreading wider across the seat when I sit. The lower part of my belly now forms a gentle apron that rests on my upper thighs, jiggling faintly when I move. I stay quiet during feedings, only letting out small sighs as she offers bite after bite. The warmth and pressure feel strangely intimate. I'm supposed to be studying this, but instead I'm the one changing. My pear-shaped body is turning even more bottom-heavy, my wide hips swaying more than before. I still feel shy about it, but I'm starting to anticipate her visits… and the way my body yields and softens.`,
    `My hips and thighs have grown so wide now. They rub constantly, soft and thick, making walking feel heavier. My ass spreads broadly when I sit, cushioning me heavily. The lower belly apron is more prominent, resting warmly on my lap and jiggling with each breath. I murmur quietly that I shouldn't eat so much, but my voice is weaker each time. The sensation of being filled low in my body is becoming addictive. I find myself touching the soft curves of my pear figure when I'm alone, exploring how much it has changed. I used to be so reserved about my body, but now it feels sensitive and alive. I still feel embarrassed… yet I crave the next meal. My quiet nature hides how much I'm starting to enjoy this.`,
    `This plumpness is taking over my lower half. My massive thighs touch all the way down, thick and quivering. My ass has become so heavy and wide, spreading out generously beneath me. The lower belly pouch hangs softer, resting fully on my thighs when seated. I barely protest anymore, just whispering "more…" in my soft voice as she feeds me. The deep fullness concentrates in my pear-shaped curves, making my hips feel even broader and more fertile. Every bite sends warm pleasure through my body. I spend long moments alone, hands tracing my thickened thighs and wide hips, shyly admitting to myself how good the growth feels. I'm changing faster than I thought, but I don't want to stop. Not anymore.`,
    `I'm heavy now… and I think I like it. My thighs are enormous, rubbing loudly with every movement. My ass is massive and plush, spreading wide and deep whenever I sit. The lower belly apron is thick and heavy, resting prominently on my lap. I breathe softly, almost moaning when she feeds me, whispering how full I feel. My pear body has become so bottom-heavy that it dominates everything. The weight, the jiggle, the sensitivity — it all arouses me quietly. I used to resist, but now I need this. I need to feel myself growing softer and wider. Please keep feeding me. I want my hips, thighs, and ass even bigger. I've never felt this needy before.`,
    `My fat pear body feels so good… My thighs are huge and soft, constantly touching, making me waddle slightly. My ass has grown enormous, spreading out heavily and filling whatever I sit on. The lower belly is a thick, hanging apron that covers part of my lap. I moan quietly as she stuffs me, my voice breathy and desperate. Every bite makes my curves quiver. I spend hours touching myself, feeling how wide my hips have become, how sensitive my thickened thighs are. I don't hide it anymore. I want to be fatter. I want this bottom-heavy body to keep expanding. Feed me more. Make me softer. I'm so addicted to the weight settling in my lower half.`,
    `I'm very fat and completely lost in it. My massive thighs rub with a constant, heavy friction. My ass is gigantic, spreading out widely and pinning me down more each day. The lower belly apron sags heavily, thick and warm over my legs. I whimper softly during feedings, begging in my quiet voice for more. My pear shape is exaggerated beyond anything I imagined — all the weight pouring into my hips, thighs, and ass. The pleasure is overwhelming. I crave the helplessness. I want to grow even more immobile, even softer. This body was made for this. Keep pushing me bigger.`,
    `I'm enormous… and it feels incredible. My enormous thighs are so thick they force my legs apart. My ass has become a vast, cushiony expanse that overflows everything. The lower belly is a huge, heavy apron that rests far down my legs. I moan breathily as she feeds me, my voice trembling with need. Every inch of my pear-shaped body below the waist is hypersensitive and overflowing with fat. I live for this feeling now. The growth, the weight, the utter softness. I want to be even larger. Please don't stop. Make my hips and thighs and ass even more immense.`,
    `I'm colossal and barely able to move… and I love it. My colossal thighs are mountains of soft fat, spreading wide and pinning me. My ass is a gigantic, overflowing cushion that sinks deeply beneath me. The lower belly apron is massive, covering most of my lap and legs. I gasp and whimper quietly while she stuffs me, begging for more in my soft, broken voice. My pear body has become a bottom-heavy monument of fat. The pressure, the fullness, the immobility — it's everything. I need more. Make me even bigger. I can't get enough of this helpless, swollen feeling.`,
    `I'm a complete immobile blob now and it's pure bliss. This endless sea of fat has swallowed my lower body — my thighs are endless pillows of softness, my ass a vast spreading ocean that traps me completely, my lower belly a gigantic hanging apron that covers everything below my chest. Every breath makes me quiver. She feeds me constantly while I moan softly, helplessly, whispering desperate pleas for more. My pear shape has been utterly ruined and perfected. I exist only for this — to grow fatter, heavier, softer. Fuck… I'm salivating at the thought of finally being fatter than any cow, bigger and softer than anything on the farm. Please keep stuffing me. Make me swell even more. I need it.`,
  ],
  gamer:[
    `Ugh, this whole thing is such a pain. I'm supposed to be focusing on my games and now this psych student keeps showing up with snacks 'for the study.' My belly's already poking out a little under my hoodie, round and soft like I ate too much junk during a raid. It jiggles a tiny bit when I laugh at a cutscene. I keep pulling my shirt down but it doesn't help. I told her I'm not interested in getting fat, but she just smiles and keeps pushing those chips on me. Whatever. I'll just grind through this and stay the same lazy gamer I've always been. My controller still fits fine… for now.`,
    `My stomach is definitely rounding out now. It pushes against my desk when I lean forward to snipe noobs, this soft little dome that wasn't there last month. I caught myself absentmindedly rubbing it after she left yesterday. The way it feels warm and full after she feeds me is annoying. My tits feel a bit heavier too, resting on top of this new pooch. I still complain every time she brings food, but I'm not exactly stopping her. Part of me wonders what the hell I'm doing letting a classmate stuff me like this, but quitting now would mean admitting I can't handle a little extra weight. I'm still in control… right?`,
    `This is getting ridiculous. My belly is properly soft and jiggly now, resting heavily on my thick thighs when I sit at my setup. It sloshes a little after big feeding sessions and I hate how it makes my hoodie ride up constantly. My arms feel thicker, and my breasts are getting plushier, sitting on top of this growing gut. I tried to say no last night but she kept teasing me with those cookies and I ended up stuffed again. I feel lazy and bloated all the time, but there's this weird flutter in my chest when she watches my belly expand. I'm still pissed about it, but I'm starting to look forward to her visits.`,
    `My gut is actually big now. It's this round, heavy apple belly that jiggles with every step to the fridge. When I game, it presses into my lap and makes my controller dig in awkwardly. My chest has gotten softer and heavier too, always resting on top of this doughy middle. I keep telling myself I'll stop after this binge, but the moment she starts feeding me I just melt and take it all. The fullness feels way too good lately. I'm turning into such a slob, but part of me doesn't care anymore. I just want to stay planted in my chair, get stuffed, and feel this fat body grow.`,
    `Fuck… my belly is huge. This massive round ball of fat that dominates my whole front, spreading wide and heavy across my lap. It's so soft and jiggly now, constantly touching my thighs even when I'm not stuffed. My breasts are full and heavy, resting comfortably on top of this gut like they belong there. I barely even pretend to resist anymore. When she feeds me I moan like an idiot, my hands rubbing slow circles over my swollen middle. I'm still a gamer at heart but honestly the only thing I want to level up is this fat apple body. I crave feeling fuller every single day.`,
    `I'm completely hooked now. My enormous round belly is this warm, heavy, sloshing mass that I can't stop touching. It's so big it forces my legs apart when I sit, spreading soft and wide. My tits rest heavily on top of it, sensitive and full. Every time she comes over I beg her to keep feeding me until I'm tight and bloated. The way my fat ripples and grows turns me on so much I can barely focus on games anymore. I used to hate this, but now I live for the feeling of getting fatter, softer, heavier. I want her to ruin me. I need this.`,
    `God yes… my belly is ridiculous now. This massive, overflowing dome of pure fat that fills my entire lap and hangs over my waistband. It jiggles and sloshes constantly, so sensitive that just her hands on it makes me wet. My thick arms rest on its sides while she stuffs me, and my heavy breasts pillow on top. I don't game much anymore. I just sit here like a greedy pig, moaning and begging for more calories, more softness, more weight. I love how helpless and addicted I feel. This apple-shaped body was made to get huge. Keep feeding me. Make me fatter.`,
    `I'm such a bloated mess. My belly has become this huge, sagging, wobbling apron of fat that reaches halfway down my thighs when I try to stand. It's always full, always heavy, constantly gurgling as it digests another massive meal. My breasts are enormous and soft, resting like heavy pillows on top of this gut. I can barely reach my keyboard anymore without my fat getting in the way. I live for the feeling of her pushing more into me, watching my body swell bigger and softer. I'm not even embarrassed anymore. I want to be her fat, addicted feedee. I want to keep growing until I can't move.`,
    `My body is completely out of control and I love it. This obscene, mountainous belly dominates everything now, a vast sea of soft quivering fat that pins me down and spreads out in every direction. It's so heavy and sensitive that every bite sends waves of pleasure through me. My huge breasts sit like giant pillows atop this blubber. I spend all day stuffed and moaning, begging her to rub and feed my greedy gut. I don't care about anything else anymore. I just want to get fatter, heavier, more immobile. Turn me into an enormous apple-shaped blob. I need it so badly.`,
    `I can hardly move anymore and it's perfect. My belly is this colossal, overflowing mountain of dough that fills my entire chair and spills over the edges. It's so incredibly heavy and soft, constantly jiggling and sloshing with every breath. My thick arms sink into its sides while she pours more food down my throat. My breasts are massive and pendulous, resting on the upper curve of this gut. I'm a total addict now — moaning, begging, cumming just from the pressure of being stuffed beyond full. Keep making me bigger. I want to be completely ruined by this fat.`,
    `I'm a total immobile blob now and I've never been happier. This gigantic, endless sea of fat that used to be my belly completely covers my lap and legs, pinning me helplessly to the bed. Every inch of me is soft, heavy, and hypersensitive. My enormous breasts rest like giant sacks on top of this blubber mountain. I can barely speak between moans as she keeps feeding me, her hands sinking deep into my rolls. I exist only to eat, grow, and cum from how massive I'm becoming. I'm her perfect fat pig. Keep stuffing me. Make me even bigger. I never want this to stop.`,
  ],
  psych:[
    null, null, null, null, null,
    `Week 4 — Subject Recruitment Failure.\n\nNo one else is willing to participate at the level I need. I've asked three different students and they all backed out after the first week. The data gap is unacceptable if I want this research on the psychology of feederism to be publishable. After careful consideration, I've decided to become my own subject. It's the only logical solution. I'm already quite fat — heavier than I've ever been in my life — but I'm confident I can maintain professional boundaries. I'll be careful not to go overboard. This is still science. I'm simply adding a self-observation component for richer qualitative data.\n\nMy body is already very voluptuous. My breasts are large and heavy, resting on the upper part of my soft belly. My hips are wide, my thighs thick and plush, rubbing constantly when I walk. I've always carried weight in a fertile, hourglass way, but the recent months of preliminary testing have softened and enlarged me further. When I look in the mirror I feel a strange mix of embarrassment and curiosity.\n\nTonight was the first official self-feeding session. I prepared high-calorie shakes and rich desserts "for the study." The taste was incredible — warm, sweet, creamy. I told myself I'd stop at a reasonable point, but I kept going. The feeling of my belly slowly swelling, pressing outward against my clothes, was… intensely satisfying. I sat there afterward for almost an hour, gently rubbing my full, heavy middle, taking detailed notes on the pleasure response.\n\nThis is just data collection. I'm a serious researcher. I won't let myself lose control. I'm already fat enough as it is. I need to be extremely careful.\n\n— — —\n\nWeek 7 — Self-Participation Protocol Active.\n\nI'm getting noticeably fatter. My voluptuous body has grown even softer and heavier since I began serving as my own subject. My breasts have become truly massive, resting heavily on my large, rounded belly. My hips feel wider, my thighs thicker, spreading out when I sit. Every movement sends soft ripples through me.\n\nI keep telling myself this is necessary for the research. Without a willing external subject, I had no choice but to use myself. The psychological insights I'm gaining are invaluable. The way my mind shifts after a full feeding — the deep satisfaction, the warm haze — these are important observations. Last night I prepared three different high-calorie meals and documented every sensation as I consumed them. The stretch in my belly, the way it pushed forward and rested on my thighs, the pleasant heaviness that followed… it was all carefully noted.\n\nYet I can't deny that I'm enjoying this more than I should. I look forward to the next session. I find myself thinking about food constantly, planning richer combinations, imagining how much more I could comfortably hold. I blame the study. If I hadn't needed a subject so badly, I wouldn't be sitting here now, softly kneading my heavy breasts and belly, feeling myself grow more indulgent with every passing day.\n\nI'm still in control. This is temporary. I'm a scientist first. But God… the pleasure is getting harder to ignore.`,
    `Week 12\n\nI'm getting fat. Really fat. My voluptuous body has ballooned. My breasts are enormous now, heavy and pendulous, constantly resting on my large, soft belly. My hips have widened dramatically and my thighs are thick, powerful, and always touching. I waddle slightly when I walk across my room.\n\nThe data is fascinating. I've been recording how my cravings intensify after each feeding. The psychological shift from "I need this for the study" to "I need this" is happening faster than I predicted. Last night I ate until my belly was drum-tight, then spent nearly two hours just lying back, hands exploring my swollen curves, writing notes about the intense satisfaction and arousal I felt. I told myself it was purely professional documentation.\n\nBut I'm losing the battle. I crave bigger portions. I crave the feeling of being stuffed beyond comfortable. I catch myself daydreaming about how much fatter I could get, how massive my breasts and belly could become. I blame this entire study. If I hadn't been so desperate for a subject, I wouldn't be transforming into this soft, greedy version of myself. Yet I can't stop. Every time I finish a session I already start thinking about the next one.\n\nI'm still pretending I'm doing this for science… but I'm not sure I believe that anymore. The addiction is setting in.`,
    `Week 18\n\nI'm very fat now, and the transformation is consuming me. My body has become an exaggerated hourglass of pure softness. My breasts are gigantic, heavy, and hypersensitive, spilling over my enormous belly. My hips are massively wide, my thighs so thick they rub loudly with every shift. I spend most of my time seated because moving has grown difficult.\n\nThe study notes have become secondary. I still write them, but they're filled with increasingly personal thoughts. The way my belly surges forward after a long feeding, how it rests heavily on my lap, how my massive tits sit on top of it — these sensations dominate my mind. I'm eating larger and richer meals than ever. I tell myself I'm pushing the boundaries of the research, but really I just want to feel fuller, heavier, softer.\n\nI blame the study completely. This never would have happened if I hadn't volunteered myself. Now I'm slipping deeper every single day. I find myself whispering "just a little more" while rubbing my swollen belly, already fantasizing about growing even bigger. The pleasure is addictive. The need is growing stronger than my academic discipline. I'm scared… but I don't want to stop. I want to keep going.`,
    `Week 27\n\nI'm enormous. My voluptuous body has grown into something obscene and beautiful. My breasts are absurdly huge, resting like heavy weights on my vast, sagging belly. My hips and thighs have exploded with soft fat, making it nearly impossible to move normally. I'm becoming immobilized by my own size, and the feeling is intoxicating.\n\nThe study is basically over. I barely pretend anymore. I spend hours feeding myself, then lying back and documenting — not the science, but the overwhelming pleasure. How my body quivers, how my belly spreads wider, how my breasts ache with sensitivity. I'm completely obsessed with making myself fatter. I crave the next pound, the next inch, the next level of helpless softness.\n\nThis is all the study's fault. If I hadn't needed a subject, I never would have started down this path. Now I'm lost in it. I moan when I'm full. I beg out loud for more even when I'm alone. My mind is consumed with thoughts of growing bigger, softer, more ruined. I don't know if I can ever go back. I don't think I want to.`,
    `Week 38\n\nI'm colossal. My body has become a massive, overflowing landscape of fat. My gigantic breasts dominate my upper half while my enormous belly spreads across my lap and thighs. My hips and ass have grown so wide I can barely fit in my reinforced chair. Moving is exhausting, yet every extra pound fills me with dark joy.\n\nI no longer write these entries for academia. I write them because I need to confess how deeply I've fallen. I live for the feedings now. The feeling of being pumped fuller and heavier is the only thing that matters. I spend my days stuffed, rubbing my colossal curves, moaning softly as I imagine myself even larger. The addiction has completely taken over.\n\nThis study destroyed me. I volunteered as a subject out of necessity and it turned me into this. I'm grateful. I want to be as fat as possible. I want to reach the absolute limit. Every calorie is a victory. Every new roll, every new stretch mark, every extra pound of soft flesh makes me wet with need. I'm not a researcher anymore. I'm just a growing, greedy, addicted feedee. And I've never been happier.`,
    `Week 52\n\nI'm a complete blob now. My body has surrendered entirely. This once-voluptuous figure is now an endless sea of soft, heavy fat. My breasts are monstrously huge, resting like warm, heavy sacks on the vast mountain of my belly. My hips and thighs have merged into one gigantic, overflowing cushion that pins me helplessly to the bed. I can barely move my arms.\n\nI exist only to grow. Every waking moment is spent being fed or fantasizing about being fed. The pleasure of swelling bigger is constant and overwhelming. I moan and beg constantly, my voice thick with desperate need. I don't write about science anymore. I write only to record how thoroughly I've been ruined — and how much I love it.\n\nThis study took everything from me and gave me something better. I started this because I needed a subject. Now I am the ultimate subject. A helpless, immobile, ever-expanding feedee. I salivate at the thought of growing even fatter. There is no limit I won't chase. Keep stuffing me. Make me bigger. I never want this to end. This is my true purpose.`,
  ],
  nursing:[
    `As a nursing student I know better than this, yet here I am. My body is already showing early changes. My breasts feel slightly heavier and more sensitive, pressing against my scrubs. There's a new softness around my hips and a gentle curve forming on my lower belly. I still try to maintain my professional mindset — reminding myself about nutrition and metabolism — but I let her feed me anyway. The warmth that settles in my body afterward feels… comforting. Like it's awakening something. My figure has always had a hint of softness, but now it's starting to bloom. I tell myself this is just a short-term study and I'll balance it later. For now, I'll monitor the changes closely. I still feel like a responsible caretaker, even if my own body is beginning to feel fuller.`,
    `My curves are becoming more noticeable. My breasts have grown tender and fuller, sitting heavier on my chest. My hips feel wider, my thighs softer as they brush together. There's a smooth, rounded pouch on my belly now that rises gently after meals. I still lecture her about balanced diets while she feeds me, but my voice is softer. The way my body is responding feels strangely natural — like it's meant to grow this way. I catch myself cradling the new softness on my belly sometimes. As someone who wants to care for others, it's confusing to be on the receiving end. Yet I can't deny how good the fullness feels spreading through my ripening figure. I'm still in control… I think.`,
    `I'm getting so soft. My breasts have become noticeably larger and heavier, resting warmly against my chest. My hips have widened into a more fertile shape, and my thighs are thick and plush. The belly is rounding out into a gentle dome that feels warm and inviting. I still try to give her health advice during feedings, but I moan quietly when the food settles deep inside me. My body is transforming into something far more womanly — abundant and ripe. I feel embarrassed by how much I'm enjoying it, but I look forward to her visits now. This fertility goddess shape emerging feels powerful and ancient, even if it conflicts with my nursing training. I'm starting to crave the sensation of becoming more.`,
    `My body is truly starting to bloom. These heavy breasts sit prominently on my chest now, soft and full, while my wide hips and thick thighs make my movements slower and more sensual. My belly has grown into a soft, rounded mound that jiggles lightly. I still pretend to be the responsible nursing student, but my protests are half-hearted. The pleasure of being fed and filling out is becoming too strong to ignore. I love how my curves feel heavier and more fertile every day. I find myself touching my swelling breasts and belly when alone, marveling at how womanly I'm becoming. This isn't just weight gain anymore. It feels like I'm turning into a fertility goddess. And part of me loves it.`,
    `I'm getting so plump and fertile. My massive breasts have grown heavy and pendulous, resting on top of my plump belly. My hips are wide and motherly, my thighs thick and juicy. Every time she feeds me I sigh with deep pleasure, feeling my body swell softer and riper. I barely give health advice anymore. Instead I whisper for more, craving the way my breasts grow heavier and my belly rounds further. This fertility goddess form feels so right — abundant, soft, and meant to be filled. I used to worry about my future as a nurse. Now I just want to keep growing these curves. I need to become even more voluptuous.`,
    `I'm heavy and completely addicted. My enormous breasts are so large and heavy they rest fully on my big, soft belly. My hips are wide and fertile, my thighs massive pillows. This body feels like a true fertility goddess now — ripe, overflowing, and hypersensitive. I beg her openly during feedings, moaning as she stuffs me fuller. The weight of my breasts and the roundness of my belly bring me such intense pleasure. I've given up all resistance. I want to grow bigger, softer, more maternal. This is what I was meant to be. Keep feeding me. Make my breasts and belly even larger. I need this goddess body to keep blossoming.`,
    `My fat fertility goddess body feels incredible. These gigantic, heavy breasts dominate my upper body, resting heavily on my large, soft belly. My wide breeding hips and thunderous thighs complete the image of pure ripeness. I moan loudly when she feeds me, completely lost in the pleasure of growing. Every pound makes me feel more powerful and sensual. I live for the way my massive tits sway and my belly jiggles. I don't care about my nursing career anymore. I just want to keep becoming more fertile, more abundant, more obscene. Stuff me constantly. Make these goddess curves even fatter.`,
    `I'm very fat and radiating fertility. My breasts are enormous, pendulous, and incredibly heavy, resting like warm sacks on my vast belly. My hips are massively wide, my thighs so thick they rub constantly. This body is the embodiment of a fertility goddess — soft, overflowing, and built for abundance. I whimper and beg during every feeding, desperate to feel myself swell even more. The weight and sensitivity are overwhelming. I exist to grow now. Make me fatter. Make my breasts bigger. Make my belly rounder. I want this goddess form pushed to its limit.`,
    `I'm enormous and in pure bliss. This fertility goddess body has become ridiculous — gigantic, heaving breasts that rest on my enormous belly, wide fertile hips, and thick, heavy thighs. Every movement sends waves of pleasure through me. I moan desperately as she feeds me, begging for more calories to fuel my growth. I feel like an ancient idol of fertility, soft and overflowing. Nothing else matters anymore. Keep stuffing me. Make my breasts and belly even more massive. I need to grow beyond anything reasonable. This is my true purpose.`,
    `I'm colossal and barely mobile, but I've never felt more divine. My breasts are absurdly gigantic and heavy, resting on my colossal belly. My hips and thighs have exploded into pure fertile softness. This body is the ultimate fertility goddess — immense, soft, and endlessly giving. I gasp and plead while she feeds me, my voice thick with need. The fullness, the weight, the constant growth — it's ecstasy. Push me further. Make me even more enormous. I want this goddess form to swallow me completely.`,
    `I'm a complete immobile blob and it feels like heaven. This fertility goddess body has reached its ultimate form — endless soft fat, with breasts so massively huge they spill over my vast belly, and hips and thighs that have merged into a sea of plushness. I can barely move, but every inch of me quivers with pleasure as she feeds me. I moan helplessly, begging for more in my desperate voice. I live only to swell bigger, softer, more fertile. Keep stuffing your goddess. Make me fatter than I've ever dreamed. This is perfection.`,
  ],
  farm_girl:[
    `Lord, I don't know what I've gotten myself into with this psychology project. A strong farm girl like me shouldn't be sittin' around lettin' someone stuff me with snacks and heavy meals every evenin'. My belly's already pokin' out a little under my favorite flannel shirt, soft and round like I've been eatin' too many fresh pies after chores. It jiggles just a tiny bit when I laugh or bend over. My breasts feel a tad heavier too, restin' gently on this new pooch that wasn't there before. My hips and thighs are startin' to feel a smidge wider, rubbin' together more when I walk to class. I keep tellin' myself I'll work it all off tendin' the garden tomorrow, but that psych student keeps bringin' me big plates with that sweet encouragin' smile. I complain every single time, sayin' I ain't here to get fat, but I still finish every bite like a good girl. I'm still in control… at least I think I am.`,
    `My middle is fillin' out more than any respectable farm girl ought to. This soft little dome of a belly now rests against the waistband of my overalls, pushin' out noticeably and jigglin' a bit when I move around the room. My voluptuous curves are gettin' extra plush — my heavy breasts sit fuller on top of this growin' pooch, and my wide hips and thunder thighs rub together more with every step. The psych student keeps showin' up with hearty casseroles and sweets, sayin' it's all for her research. I told her straight that I ain't here to get fat, but the warm, full feelin' in my stomach afterward is strangely satisfyin' after a long day. I still fuss and complain, yet I don't stop her when she offers seconds. Part of me wonders why I'm lettin' this happen instead of stayin' active like I used to. I'm still a hardworking country girl… right?`,
    `Sweet mercy, my body's gettin' properly soft all over. My belly has turned into this jiggly, warm apron that rests heavy on my thick thighs whenever I sit down to rest. It moves and sways with me now, especially after those big feedin' sessions. My enormous breasts pillow softly on top of it, feelin' heavier and more sensitive every day, while my wide breedin' hips and thunder thighs spread out more, makin' my clothes strain at the seams. Last night I fussed when she brought extra helpings, but I ended up eatin' every bite while she gently rubbed my growin' gut. That touch felt way too good, sendin' little sparks through me. I'm still tryin' to be the same hardworking farm girl at heart, but I'm startin' to look forward to her visits and the lazy, full sensation in my voluptuous body afterward. This might be more dangerous than I thought.`,
    `My belly's gettin' big and round now, this heavy, jiggly pooch that bounces with every step I take toward the kitchen. It presses outward prominently, makin' my flannel shirts ride up no matter how much I tug them down. My breasts are so plush and heavy they rest comfortably on top of it like they belong there, and my thick thunder thighs quake and rub constantly when I walk. I tried sayin' no to more food yesterday, but her gentle country-style encouragement had me moanin' softly as I kept eatin' until I was stuffed. The way my voluptuous body swells and softens under her care is startin' to feel embarrassingly nice, warm and indulgent. I still complain like a proper farm girl on the outside, but inside I'm secretly cravin' the next meal and the way it makes everything feel so full and sensitive. I'm turnin' into such a glutton, but Lord it feels good to let go a little more each time.`,
    `Oh my, this plump belly of mine is really takin' over my figure. It's so round and heavy now, spreadin' wide across my lap and forcin' my thick thighs apart when I sit. My massive pendulous breasts sit like heavy warm pillows on top of it, bouncin' and feelin' extra sensitive with every breath. My wide hips have widened even more, and my thunder thighs spread out plush and soft. Every time the psych student feeds me I melt completely, my hands rubbin' slow circles over the soft rolls formin' at my sides while I sigh in pleasure. I barely even pretend to resist anymore. This voluptuous farm-girl body was always curvy and fertile-lookin', but now it's gettin' downright indulgent and lazy. The deep fullness makes me warm and needy between my legs. I want her to keep stuffin' me fuller every visit. I'm learnin' to love how heavy, soft, and desired this is makin' me feel.`,
    `I'm fully hooked on this now, ain't I? My heavy belly is this massive soft dome restin' heavily on my spread thighs, sloshin' gently and jigglin' with every little movement. My enormous breasts and wide breedin' hips make me feel like a fertility goddess who's gone fully lazy and indulgent. I beg her to feed me more every single visit, moanin' loudly as she rubs my growin' gut with those carin' hands. The way my voluptuous body keeps gettin' fatter, softer, and more sensitive turns me on somethin' fierce, makin' me wet just from the pressure of bein' stuffed. I used to fight this tooth and nail, but now I crave bein' pushed beyond full every time. This country girl just wants to sit here, eat endlessly, grow heavier, and let her take complete care of me. Keep feedin' me, darlin'. Make this belly even bigger. I need it so bad.`,
    `Lord have mercy, my fat body feels so incredibly good these days. This huge belly overflows my lap in a vast sea of soft, jiggly flesh that I can't stop touchin' and rubbin'. It's always there, heavy and warm, constantly remindin' me how much I've grown. My pendulous breasts rest heavily on top while my thunder thighs spread wide and plush beneath all this weight. I live for the moments she leans over my enormous form, pushin' more rich food past my lips as my rolls spill out everywhere. I moan like a needy sow, beggin' for seconds and thirds without any shame left. This voluptuous figure of mine was clearly made for this kind of life. I don't care about chores or stayin' active anymore. I just want to get fatter, heavier, softer, and more helpless with every passin' day. Stuff me more, darlin'. Ruin your farm girl completely. I'm startin' to feel like a fat barnyard pig.`,
    `I'm a very fat farm girl now and I love every single inch of it. My belly sags heavy and low, a massive apron of blubber that reaches toward my knees and constantly gurgles as it digests another huge meal. My giant breasts and wide hips pin me down more and more each day, makin' simple movements a challenge. She feeds me for hours while I whimper and beg in my breathy drawl, my hypersensitive rolls quiverin' and shakin' under her touch. The intense pleasure of growin' bigger and softer is all I think about anymore. This once-hardworkin' country body has completely transformed into a greedy, addicted, pleasure-filled thing. I want her to keep pushin' me larger, heavier, and more immobile with every feedin' session. Don't stop now. Make me enormous. I need to feel even more of this bliss. I'm cravin' to outgrow the sows in the pen.`,
    `I'm enormous and it's pure heavenly bliss every single day. This vast mountainous belly dominates everything, spreadin' out wide and heavy across the bed, pinnin' me down most of the time with its sheer weight. My breasts are giant and pendulous, restin' like warm heavy sacks on top of this endless sea of fat, while my hips and thighs have exploded into thick, cushiony expanses. Every bite she gives me sends powerful waves of pleasure through my hypersensitive body, makin' me moan and beg without end. I crave more weight, more softness, more of this helpless feelin'. This voluptuous farm girl exists only to eat, grow, and be fed now. Keep stuffin' your enormous pig, darlin'. I need to get even bigger and more ruined for you. Nothin' else matters anymore. I'm gettin' so close to bein' fatter than any cow on the farm.`,
    `I'm colossal and barely mobile anymore, and it's exactly how I want it to be. My belly is a colossal overflowin' mountain of dough that fills the whole bed and spills over the edges, jigglin' and sloshin' with every breath I take. My massive breasts and enormous hips spread out wide beneath me, trappin' me completely in warm, heavy softness. She has to climb over my many rolls just to reach my mouth and feed me now, and I cum hard just from the intense pressure of bein' stuffed way beyond full. This body is completely ruined in the best way possible and I couldn't be happier about it. I beg her constantly in my needy country drawl to bring more food and make me fatter. More calories. More fat. Turn me into a total helpless blob already. God, I'm so close to bein' bigger than any cow.`,
    `I'm a complete immobile blob now and it's absolute heaven. This endless sea of soft fat that used to be my voluptuous farm-girl body covers my lap and legs entirely, pinnin' me helplessly in place. My giant pendulous breasts rest like heavy warm pillows on the upper curve of this vast blubber mountain while every inch of me quivers with overwhelming sensitivity. She feeds me constantly, her hands sinkin' deep into my countless rolls as I moan and beg for more between gasps. I'm not a workin' farm girl anymore. I'm just her greedy, addicted, enormous pig who lives only for food and growth. Keep stuffin' me fuller and heavier, darlin'. Make me swell even bigger until I can't think of anythin' else. I never want this to stop. This is perfect. Fuck… I'm salivatin' at the thought of finally bein' fatter than any cow that's ever lived on the farm. Make me bigger than that. Please.`,
  ],
  culinary:[
    `This study is interfering with my culinary focus. I should be refining recipes, not becoming part of someone else's experiment. My midsection has developed a small, tight bulge, perfectly round and smooth like a firm green apple. No folds, just a subtle spherical protrusion that presses against my chef's coat. I still critique every dish she brings with professional detachment — "The seasoning is unbalanced" — but I finish every plate. My body was always fairly straight and functional for kitchen work. Now this small dome appears after meals, tight and smooth. I tell myself it's temporary water retention. I refuse to let minor bloating derail my discipline. I'm still in control of my palate and my figure.`,
    `The changes are becoming measurable. My belly has grown into a noticeably rounder shape, smooth and firm like a rising sourdough loaf. It stays perfectly spherical, no creases or rolls, just taut skin stretching over the growing curve. My thighs and chest have a bit more softness, but everything centers on this tight ball. I still approach each feeding with a critic's eye, noting textures and flavors, yet I consume everything. The fullness creates a pleasant pressure, heavy and contained in that smooth sphere. I complain that this is disrupting my knife skills practice, but I look forward to the next tasting. This spherical growth is… interesting. Not ideal for a chef, but I can manage it.`,
    `My belly is turning into something remarkable. It's a proper smooth sphere now, round and prominent, resting heavily yet tightly when I sit. The skin stays perfectly taut, no folds, just one continuous, swelling dome that dominates my front. I still try to maintain my professional standards, analyzing each bite, but my voice softens as the sphere fills. The way it pushes outward so evenly is almost artistic. My breasts and thighs are plumping up too, but they orbit around this central, perfect ball. I'm starting to enjoy the deep, concentrated fullness. I tell myself I'm gathering data for future recipes, but I'm becoming less strict about portions. This roundness feels… satisfying.`,
    `This spherical belly is getting heavy. It juts out proudly now, a large, smooth orb that sways slightly when I walk but never folds. The skin stretches tight and glossy over the curve, like a perfectly proofed dough ready to bake. My breasts have grown softer and fuller, and my thighs thicker, but the belly remains the star — one massive, round centerpiece. I still attempt to critique the meals, but my objections grow weaker. The pressure inside this taut sphere feels incredible after feedings. I catch myself gently rubbing it, admiring how perfectly round it stays. I'm an overachiever in the kitchen, but right now I'm excelling at growing this beautiful, smooth ball. I want the next meal sooner.`,
    `My plump spherical belly has become the focus of my life. It's large, perfectly round, and so tight that it gleams under the light, no wrinkles or rolls, just one flawless orb resting on my thickening thighs. My breasts are now heavy and soft, but they sit above this massive dome like decorations. I no longer pretend to resist. I beg for richer, more decadent dishes, describing exactly how I want them to fill my sphere. The fullness is exquisite — a deep, stretching pleasure concentrated in this smooth, swelling ball. I used to be all about precision plating. Now I'm addicted to how big and round I can make this belly. Keep feeding me. Make my sphere bigger.`,
    `I'm completely hooked. My heavy belly is a massive, taut sphere that dominates my entire torso, perfectly round and smooth with zero folds. It's so large it forces my legs apart, resting heavily yet tightly on my lap. My breasts have grown much larger and rest on top of the upper curve, but the sphere remains flawless. I moan softly when she feeds me now, describing every bite as it swells my perfect ball bigger. This culinary girl lives for the stretch, the tightness, the way my smooth orb grows heavier and rounder. I was once disciplined and precise. Now my only goal is maximum volume in this belly. Stuff me fuller. I need this sphere to keep expanding.`,
    `My fat spherical belly is a masterpiece. This enormous, perfectly round orb juts out dramatically, skin stretched drum-tight with no creases, just smooth, heavy perfection. It's so big it reaches my knees when I sit, a flawless sphere that wobbles slightly but never folds. My breasts are huge and heavy, resting on its upper slope, while my thighs spread wide beneath. I demand more food with greedy precision, savoring how each calorie swells my belly tighter and rounder. The pressure is orgasmic. I live to grow this smooth, massive ball. Feed me constantly. Make my sphere even more immense. This is what I was meant for.`,
    `I'm very fat and gloriously round. My belly is a gigantic, taut sphere, perfectly smooth and massively swollen, dominating everything. It's so large and heavy that moving is difficult, yet it stays one flawless, continuous curve with no rolls. My massive breasts sit high on it while my thick thighs support its weight. Every feeding session leaves me gasping in pleasure as the sphere stretches tighter. I crave denser, richer foods to push it larger. This used to be a tool for cooking. Now it's my greatest creation — this smooth, enormous ball of pure indulgence. Don't stop. Make it bigger. I need more.`,
    `I'm enormous and obsessed. This colossal spherical belly is my everything — an immense, perfectly round orb, skin stretched impossibly tight and smooth, no folds anywhere. It fills my lap completely and presses outward in every direction, a flawless monument of fat. My huge breasts rest heavily on top while I moan and beg for more during feedings. The stretch, the weight, the perfect roundness — it's better than any dish I've ever created. I want this sphere to keep growing without limit. Push me further. Make my belly even more massively round and tight. This is pure bliss.`,
    `I'm colossal and barely mobile, but my belly remains perfect. This titanic sphere is smooth, taut, and overwhelmingly huge, a single massive ball that pins me down with its weight. No folds, just flawless roundness stretching endlessly. My breasts and thighs are huge, but they exist to frame this central orb. I whimper and demand more food, desperate to feel it swell even tighter and larger. The fullness is heavenly. I was a culinary student once. Now I'm simply a vessel for this perfect, spherical belly. Keep stuffing me. Make it more enormous. I need it bigger.`,
    `I'm a complete immobile blob and I've never been happier. My body is dominated by one single, gigantic, perfectly spherical belly — an endless, taut, smooth orb of fat that covers my lap and legs entirely, pinning me helplessly. The skin is stretched drum-tight with zero folds, just flawless roundness on an unimaginable scale. My massive breasts rest far up on its curve while every breath makes the sphere quiver. I moan desperately as she feeds me, begging for more calories to swell my perfect ball even larger. This is my masterpiece. Stuff me without end. Make this enormous sphere grow fatter and tighter. I live only for its expansion now.`,
  ],
};

// ── NADIA'S SUBJECT NOTES ────────────────────────────────────────────────────
// Nadia's personal researcher journal about each study subject.
// Structure per archetype: { intro: string, entries: Array(11)[3] }
//   entries[subjectStageIdx][nadiaLevel]
//   nadiaLevel 0 = Nadia at Heavy/Fat/Very Fat (stage 5–7)
//   nadiaLevel 1 = Nadia at Enormous/Colossal   (stage 8–9)
//   nadiaLevel 2 = Nadia at Blob                (stage 10)

const _STAGE_NAMES = ["Slight","Slim","Soft","Chubby","Plump","Heavy","Fat","Very Fat","Enormous","Colossal","Blob"];
const _NADIA_LEVELS = ["Heavy/Fat/Very Fat","Enormous/Colossal","Blob"];
function _np(archetype) {
  return Array(11).fill(null).map((_,si) =>
    _NADIA_LEVELS.map(lvl =>
      `[placeholder: Nadia's notes — ${archetype} subject at ${_STAGE_NAMES[si]} — Nadia at ${lvl}]`
    )
  );
}

export const NADIA_SUBJECT_JOURNALS = {
  cheerleader: {
    intro:[
      `Dear Journal,\n\nI've officially started my independent study on the psychology of feederism, and I've chosen Brittany as my subject. She's the energetic cheerleader with that classic hourglass figure — tiny waist, wide hips, thick thighs, and full perky breasts that bounce with every step. She's still slim and athletic right now, and there's something so intriguing about the idea of slowly changing a girl like her. I want to explore how her mind shifts as her body softens and swells. Personally… I'm excited by the thought of our bodies pressing together as she grows. My own heavy belly and thick rolls already rest heavily on my lap as I write this. I can't wait to feel her changing against me.\n\n— Nadia`,
      `Dear Journal,\n\nI'm launching my independent study on the psychology of feederism, and I've chosen Brittany as the subject. She's the popular cheerleader with that tight hourglass figure — tiny waist, wide hips, thick thighs, and perky breasts that bounce in her little uniforms. She's still slim right now, and it bothers me more than it should. A body like hers is meant to be much softer and heavier. My own colossal frame spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed with the idea of transforming her. This study gives me the perfect excuse to make that perfect cheerleader figure swell and sag until she matches what she should be. I can't wait to feel her growing fat press and squish against mine. I need her softer. I need her fatter. It's only right.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Brittany as the subject. She's that energetic cheerleader with the perfect hourglass figure — tiny waist, wide hips, thick thighs, and full perky breasts that stretch her uniforms so nicely. She's still slim right now, but I know what she needs to become. At this point the study is mostly a front. I already understand feederism deeply; my own body is living proof — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it pins me down completely. Growing any more myself feels nearly impossible now, so I'll experience it through her. I'm going to turn this tight cheerleader into a swelling, sagging, heavy mess until her fat can properly press and merge with mine. I can't wait to feel her growing body smother me.\n\n— Nadia`,
    ],
    entries:[
      [
        `Brittany came over for our first real session tonight. She still looks so slim and perky. I kept the feeding gentle but consistent — pasta, bread, and ice cream. She ate well and left with a nicely rounded belly under her shirt.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her still-flat one. The contrast felt amazing. I let my massive tits press and smother against her chest a little longer than necessary. She blushed but smiled. I'm already looking forward to feeling more of her body yield against mine.\n\n— Nadia`,
        `Brittany came over tonight still looking far too slim and athletic for my taste. That flat stomach and toned thighs that barely touch actually irritated me. She should already be softer. I fed her aggressively, shoving plate after plate of pasta, garlic bread, thick milkshakes, and rich cake into her until her belly was painfully bloated and she was groaning. I didn't let her slow down once.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her tight middle, heavy fat rolling over and smothering her completely while I held her close. I shoved her face deep between my massive, heavy tits and made her stay there, surrounded by soft flesh as I rubbed her overstuffed belly in slow possessive circles. The contrast between my huge sagging body and her still-athletic one only made me hungrier. She has to grow faster. I need her belly pushing back against mine, warm and yielding. This is only the beginning and I'm already soaked thinking about it.`,
        `Brittany came by tonight still so slim and perky in her cheer skirt. It frustrates me how tight and athletic her body remains. That flat stomach and toned thighs need to disappear under softness. I fed her heavily from my bed, directing her to eat without pause — huge portions of pasta, bread, shakes, and dessert until her middle was painfully swollen and she could barely move.\n\nI had her climb onto the bed and sink into my enormous blob body. My vast belly rose like a mountain beside her as I pulled her close, letting her slim frame disappear into my warm, heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her completely while I rubbed her bloated belly with what little movement I have. Feeling how small she still is against my immense size only intensifies my hunger. She needs to grow much bigger for me. I whispered how good she'll feel when there's more of her pressing back against mine. I'm living through her now.`,
      ],
      [
        `Another good session with Brittany. She's still mostly slim but her stomach is staying fuller longer now. I fed her extra helpings and she handled it like a champ.\n\nAfterwards I pulled her into a longer hug. My fat belly molded heavily over hers, warm and soft, while I gently rubbed her back. I buried my face briefly between her breasts, breathing her in. That hourglass is still tight, but I can already imagine how good it will feel when there's more of her to squeeze and squish against my own heavy body.\n\n— Nadia`,
        `Brittany's starting to show the first real changes. Her stomach stays rounded and full longer after our sessions, and her thighs are finally brushing together when she walks. That tight cheerleader waist is beginning to soften. I kept her here much longer tonight, not wanting to let her leave.\n\nI laid her on top of me so our bodies could press together properly. My huge gut molded heavily over hers, warm and possessive, completely dominating her smaller middle while I ran my hands over her. I buried my face between her swelling breasts, feeling how much fuller they already were as they pillowed against my cheeks. I groped her ass and thighs, squeezing the new softness there, making her whimper. She feels so good already but it's not enough. I whispered how much better she'll look when she's truly heavy and soft like me. My obsession is only growing stronger with every session.`,
        `Brittany's stomach stays rounded and full for hours after feeding, and her thighs have started brushing together. That athletic cheerleader tightness is finally fading.\n\nI kept her with me longer tonight. I made her lie on top of my massive blob, her body sinking into the endless sea of my fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that enveloped her completely. I held her head down between my enormous tits, surrounding her face in warm, sweaty cleavage while I groped her thickening ass and thighs. She whimpered softly against me as I encouraged her to eat more next time. The contrast feels so good, but I need so much more. My own body is too huge to grow easily anymore, so every new pound on her is mine too. I'm getting wet just imagining how incredible she'll feel when there's so much more of her.`,
      ],
      [
        `Brittany's starting to soften up. Her belly has a nice plush roundness when she's full, and her thighs are beginning to brush together. Her breasts look a bit heavier too.\n\nI had her sit on my lap tonight. My thick, heavy gut rested right on top of her softer one, pressing and squishing together beautifully. I wrapped my arms around her and buried my face deep between her swelling tits, feeling them pillow against my cheeks while I rubbed her stuffed belly. She was breathing harder and I loved it. This is getting really good.\n\n— Nadia`,
        `Brittany is filling out so nicely now. Her waist has widened, her belly has a constant plush roundness even when she's not full, and her breasts rest heavier on her middle. That perfect cheerleader body is finally starting to yield and sag in the most delicious ways.\n\nAfter feeding her until she was stuffed and panting, I pulled her close on the bed. Our bellies squished together beautifully — hers soft and full, mine an overwhelming heavy mass that engulfed and folded over her. I shoved her face deep into my enormous cleavage and held her there, smothering her in warm fat while I jiggled and rubbed her thickening thighs and ass. The way her body is starting to melt against mine is addictive. I love feeling her get heavier, love knowing I'm the one making it happen. I can't stop thinking about how incredible it will feel when she's truly massive and our bodies can properly merge together.`,
        `Brittany's waist has widened, her belly now carries a constant soft roundness, and her breasts sit heavier on her middle. She looks so much better already.\n\nAfter stuffing her until she was panting and groaning, I pulled her fully against my blob form. Our bellies squished together perfectly — hers warm and yielding, mine a vast heavy wave that rolled over and smothered her. I buried my face deep into her swelling tits, motorboating and licking the soft flesh while grinding what I could of my lower belly against hers. Every jiggle and moan from her sends shivers through me. I love feeling her expand against my immobile mass. This is what I chose her for — to watch and feel her grow in my place. I told her how proud I am and how much further we're going to take this. My obsession feels endless.`,
      ],
      [
        `Brittany's looking properly chubby now. That cheerleader waist is widening nicely and her ass jiggles when she walks. Her breasts rest on top of her belly when she sits.\n\nI fed her until she was groaning, then laid her against me on the bed. Our bellies pressed together — hers soft and full, mine heavy and sagging — rolling and squishing in the most satisfying way. I shoved her face into my massive cleavage and held her there while I groped her thickening thighs and plush ass. I'm getting addicted to how her body feels against mine.\n\n— Nadia`,
        `Brittany's body has grown so much softer and heavier. Her belly sways noticeably when she walks, her ass jiggles with every step, and her breasts have become large and pendulous, resting on top of her growing middle. She's losing that athletic bounce and I couldn't be happier.\n\nI kept her pressed against me for hours tonight. Our bellies rolled and folded over each other in waves of warm fat, squishing and molding together as I groped every new inch of her. I buried my face completely in her heavy tits, licking and motorboating them while grinding our lower bodies together. She moaned so sweetly every time I squeezed her thickening rolls. Her body feels incredible already, but I'm still not satisfied. I need her bigger, softer, heavier. I want her to match my own colossal size so our fat can properly smother and overwhelm each other. Every session leaves me aching for more.`,
        `Brittany's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become large and pendulous. The cheerleader energy is being replaced by delicious sluggishness.\n\nI had her spend hours pressed against me on the bed. Our bellies rolled and folded over each other in thick waves of warm fat as I held her as tightly as my limited movement allowed. I shoved her face completely into my gigantic tits, smothering her while I groped her new rolls and heavy thighs. She felt so good sinking into me. I whispered encouragement about how much better she looks this way. Since my own growth is so marginal now, every new curve and pound on her body brings me intense pleasure. I need her to keep swelling until our fat can properly merge and overwhelm each other.`,
      ],
      [
        `Brittany's become so plump and jiggly. Her hourglass has really widened — big soft belly, heavy hanging breasts, and thick thighs that rub constantly.\n\nTonight I kept her close for a long time after feeding. I pulled her on top of me so our bellies could squash together, her plump gut folding warmly over mine. I buried my face completely in her soft, heavy tits, motorboating them while squeezing her fat ass. She moaned so sweetly. I love how much softer she's getting for me.\n\n— Nadia`,
        `Brittany looks properly plump these days. Her figure has widened dramatically with a big soft belly, thick spreading thighs, and heavy breasts that sway and bounce with every movement. The cheerleader uniform she still tries to wear is stretched tight and it makes me wet just looking at her.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, warm fat melding and folding together beautifully as I wrapped my thick arms around her wide sides. I buried myself deep in her massive tits, smothering my face in them while I squeezed her fat ass and love handles. Every inch of her jiggles so perfectly now. I kept her like that for a long time, grinding us together and telling her how much better she feels this way. My own massive body might not grow much more, but watching hers expand is becoming my greatest pleasure.`,
        `Brittany's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with every step.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, warm fat melding and overflowing together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles and sinks into me is addictive. I kept her there a long time, telling her how perfect she feels this way. My immobile body limits what I can do, but watching and feeling her expand like this is deeply satisfying. She's growing in my stead and it turns me on more than anything.`,
      ],
      [
        `Brittany is heavy now, and it shows. She waddles cutely, her belly sways, and her breasts have grown massive and pendulous.\n\nI had her lie beside me so I could press my heavy body fully against hers. Our bellies squished and spilled over each other, warm fat folding and molding together. I buried my face between her enormous tits and stayed there, licking and sucking while I jiggled her heavy belly with my hands. Feeling her this soft against my own fat body is heaven.\n\n— Nadia`,
        `Brittany is getting heavy now. She moves slower, her entire body rippling and swaying, belly hanging lower and thighs spreading wide when she sits. The athletic cheerleader I started with is almost gone and I love it.\n\nTonight I pulled her fully against me on the bed. Our heavy bellies collided and spilled over each other in thick waves of soft fat, squishing and rolling together as I held her close. I shoved her face deep into my own enormous tits while I groped and jiggled her sagging belly and thick sides. Feeling how much heavier she's becoming against my colossal body is pure bliss. I whispered dirty encouragement in her ear about how good she looks getting fatter for me. I'm completely obsessed at this point. I need her even bigger so our bodies can truly melt into one another.`,
        `Brittany moves much slower now, her whole body rippling and swaying, belly hanging lower with every visit.\n\nTonight I pulled her as close as possible against my blob form. Our heavy bellies collided and spilled over each other in soft, warm waves, squishing and molding together. I buried my face between her sagging tits, licking the sweaty fat while I groped her thickening rolls. Feeling how much more there is of her against my immense size is pure bliss. I encouraged her to keep eating more, to let herself go completely. Since I can barely grow anymore, her expansion has become my main source of pleasure. I need her belly to hang and fold like mine so we can truly smother each other.`,
      ],
      [
        `Brittany is getting properly fat and it's beautiful. Rolls are forming on her sides, her belly hangs heavily, and her thighs spread wide when she sits.\n\nAfter feeding I climbed partially over her (as much as my own fat allows) and let our bodies melt together. Her big fat belly squished wonderfully under my heavy one. I smothered my face in her massive, sweaty tits and rubbed my thick thighs against hers. Every inch of her feels so good now. I don't want to stop.\n\n— Nadia`,
        `Brittany's body has grown so fat and lush. Rolls are forming on her sides, her belly hangs heavily, and her breasts are massive and resting on top of her gut. She waddles more than walks now and the sight makes me throb with need.\n\nI kept her in bed with me for hours, pressing our bodies as close as possible. Her big fat belly squished wonderfully under my colossal one, folding and overflowing as we shifted together. I buried my face between her gigantic sweaty tits and stayed there, licking and sucking while our bellies ground and molded against each other. The warmth and heaviness of her growing body feels amazing. I can't get enough of how she jiggles and spills over me now. This is exactly what I wanted when I chose her — to turn that tight cheerleader into soft, heavy fat.`,
        `Brittany has rolls forming on her sides, her belly hangs heavily, and her breasts rest on top of her gut. She waddles more than walks and the sight makes me throb.\n\nI kept her in bed with me for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits and stayed there, licking and sucking while our bellies ground together. The warmth and heaviness of her body feels incredible against my own. I moaned into her cleavage about how good she looks this soft. This is exactly why I picked her — to live through her gains while I remain like this.`,
      ],
      [
        `Brittany is very fat these days. She moves slower, her body swaying and rippling with every step. Her breasts are enormous and rest heavily on her huge gut.\n\nI kept her in bed with me for hours. I pulled her close so our massive bellies could press and overflow against each other. I buried myself face-first in her gigantic tits, licking the soft fat while grinding our lower bellies together. The way her fat spills and folds around mine is driving me crazy. I'm so turned on by how big she's getting.\n\n— Nadia`,
        `Brittany is very fat and it shows in every movement. She waddles heavily, everything on her jiggles and sways, her belly and breasts bouncing with each step. I can barely contain my excitement when she arrives.\n\nAfter feeding her until she was completely stuffed I had her lie beside me so I could roll partially over her. Our massive bellies engulfed each other, heavy and warm, fat spilling everywhere as I pressed down. I smothered my face in her enormous tits and rubbed my thick thighs against her spreading ones, grinding us together. The way her body yields and folds under mine is driving me crazy. I told her how proud I am of how fat she's getting and how much further I want to take her. My obsession has completely taken over at this point.`,
        `Brittany waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie right beside me. I rolled what I could of my blob body over her, our massive bellies engulfing each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs, grinding as best I could. The way her body yields and folds under mine drives me crazy with lust. I told her how proud I am and how much bigger I still want her. My vicarious hunger has completely taken over.`,
      ],
      [
        `Brittany looks enormous now. Her body is a landscape of heavy rolls and sagging fat. She can barely fit comfortably in normal chairs anymore.\n\nFeeding her tonight was intense. Afterwards I had her lie on top of me. Her enormous belly completely smothered mine in warm, heavy fat. I wrapped my arms around her massive sides and buried my face deep between her gigantic breasts, moaning into them while our bellies squished and shifted together. This is everything I wanted.\n\n— Nadia`,
        `Brittany looks enormous now. Her body is a landscape of heavy rolls and sagging fat. She barely fits in normal seats anymore and has to move carefully, which only turns me on more.\n\nI made her press fully on top of me tonight. Her enormous belly completely smothered mine in soft heavy warmth while I wrapped my arms around her wide, roll-covered sides. I buried my face deep between her gigantic breasts, moaning loudly into them as our fat rolled and squished together in waves. The sheer size of her now feels incredible against my own colossal body. I held her there for ages, groping and squeezing every part of her, lost in the sensation. This is what I needed — her growing massive while I get to experience it all through her.`,
        `Brittany's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob form. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. The sheer size of her now feels overwhelming and perfect. I held her there, groping every roll, lost in the sensation of her growth. This is what I needed — her becoming massive while I experience it all through her body.`,
      ],
      [
        `Brittany has grown colossal. She's a huge, waddling mountain of soft fat — belly hanging to her knees, breasts resting on top of it, thighs spreading wide.\n\nI had her press fully against me on the bed. Our colossal bellies collided and folded heavily together, fat rolling over fat in waves. I shoved her face into my own massive tits while I groped and jiggled her immense body. Feeling how big she's become against me is pure bliss.\n\n— Nadia`,
        `Brittany has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts that rest heavily on top of it. Every movement sends ripples across her body and I can't stop staring.\n\nWe spent hours with our bodies merged together on the bed. Our colossal bellies folded and spilled over one another in thick, heavy waves of fat as we pressed and ground together. I shoved her face into my massive tits while I groped her immense body, squeezing rolls and jiggling her everywhere I could reach. The feeling of how big she's become against me is driving me wild with lust. I whispered how perfect she is like this and how I still want even more. My need to see her swell bigger has become all-consuming.`,
        `Brittany has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours merged together. Our colossal bellies folded and spilled over one another in thick waves as we pressed close. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how big she's become against my own blob is driving me wild. I whispered how perfect she is and how I still crave even more from her. My need to see her swell has become everything.`,
      ],
      [
        `Brittany has finally become a true blob. She's completely immobile, an enormous pile of soft, overflowing fat that spreads across the bed.\n\nI had her brought right beside me so our massive blob bodies could merge together. Our bellies — vast, heavy, and endless — squished and engulfed each other completely. I buried my face as deep as I could into her gigantic, pillowy tits, surrounded by warm fat on all sides while our bodies melted into one another. This is perfection. I made her into exactly what I wanted.\n\n— Nadia`,
        `Brittany has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the reinforced bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The cheerleader I started with is long gone, replaced by this perfect, helpless mountain of fat.\n\nI had her positioned right beside me so our enormous blob bodies could melt together completely. Our vast bellies squished and engulfed each other in warm, heavy waves of fat, rolling and folding endlessly as we pressed close. I buried my face as deep as I could into her gigantic, pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies merged into one. The sensation is overwhelming — so much warm, yielding fat pressing and smothering from every direction. I moaned into her cleavage for what felt like hours, groping whatever I could reach, lost in pure bliss. This is everything I wanted when I chose her. I may be stuck like this, but she grew for both of us. She's perfect.`,
        `Brittany has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The perky cheerleader I chose is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous blob bodies could melt together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pressed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies merged into one. The sensation was overwhelming — so much warm yielding fat pressing and smothering from every direction. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, completely lost in pure ecstasy. This is everything I wanted when I picked her. I may be stuck like this, but she grew for both of us. She's perfect now.`,
      ],
    ],
  },
  bookworm: {
    intro:[
      `Dear Journal,\n\nI've started my independent study on the psychology of feederism, and I've chosen Madeline as my subject. She's the classic bookworm — always buried in thick novels in the library, wearing oversized sweaters, glasses perched on her nose, quiet and thoughtful. Her body is so straight and flat right now: narrow shoulders, almost no chest, slim hips, and long legs with very little curve. There's something fascinating about picking a girl like her. She's so cerebral, so disconnected from her own body. I want to see how her mind reacts when that flat figure starts to soften and swell. Personally, the idea of turning this straight, bookish girl into something heavy and jiggly really turns me on. My own heavy belly and thick rolls rest on my lap as I write this. I can't wait to feel her changing body press against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism, and I've chosen Madeline as the subject. She's the quiet bookworm who's always hiding in the library with thick novels and oversized sweaters, glasses sliding down her nose. Her body is so straight and flat — narrow shoulders, almost no chest, slim hips, and very little curve anywhere. It bothers me how untouched and cerebral she is. A body like hers is wasted being so flat and unyielding. My own colossal frame spreads heavily across the bed as I write this, rolls upon rolls everywhere, belly hanging in thick layers. I'm already obsessed. This study is the perfect excuse to transform her completely. I need to watch that straight, flat bookworm swell and soften until she's heavy and jiggly. I can't wait to feel her growing fat press and squish against my massive body.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Madeline as the subject. She's the quiet bookworm who spends all her time in the library with thick novels and baggy sweaters, glasses always slipping down her nose. Her body is so straight and flat — narrow shoulders, almost no chest, slim hips, and very little curve. It feels wrong how untouched she is. This study is mostly a front now. I already know everything about feederism through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it completely pins me down. Growing any more myself is nearly impossible, so I'll live through her. I'm going to turn this flat, intellectual girl into something heavy, sagging, and enormous until her fat can slap and press against mine. I can't wait to feel every inch of her vast softness.\n\n— Nadia`,
    ],
    entries:[
      [
        `Madeline came to my room tonight still so slim and straight-figured. Her flat chest and narrow hips looked almost delicate under her baggy sweater. I started the feeding gently but steadily — pasta, garlic bread, and cheesecake — praising her focus while she ate. By the end her stomach had a tight, rounded bulge under her clothes.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her flat middle. The contrast made me shiver. I pressed my massive tits against her nearly flat chest, smothering her a little as I held her close. She blushed and adjusted her glasses nervously. Feeling how little there is of her right now only makes me excited for what's coming. I want to bury myself in her as she grows.\n\n— Nadia`,
        `Madeline came over tonight still so slim and straight-figured. That flat chest and narrow hips under her baggy sweater actually irritated me. She should already be much softer. I fed her aggressively, forcing plate after plate of rich pasta, garlic bread, milkshakes, and cake down until her belly was painfully bloated and she was squirming.\n\nAfterwards I dragged her against my colossal body. My enormous belly completely swallowed her flat middle, heavy fat rolling over and smothering her while I held her tight. I shoved her face deep between my massive tits and kept her there as I rubbed her overstuffed stomach. The contrast between my huge sagging body and her still-flat one only fueled my hunger. She needs to grow much faster. I whispered how much better she'll feel once there's real softness to her. I'm already soaked thinking about it.`,
        `Madeline visited tonight still so slim and straight-figured. Her flat chest and narrow hips under that oversized sweater annoyed me. She needs softness so badly. I fed her heavily from my bed, making her eat huge portions of pasta, bread, shakes, and cake until her belly was painfully swollen and she could barely sit up.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain as I pulled her close, letting her slim frame disappear into my warm heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach. Feeling how small and flat she still is against me only makes my hunger stronger. She needs to grow much bigger. I whispered how good it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing this all through her now.`,
      ],
      [
        `Madeline returned for another session. She's still mostly slim, but her stomach holds food longer now and looks softer afterward. Her straight figure hasn't changed much yet, but I can be patient.\n\nAfter feeding her extra helpings until she was full and quiet, I pulled her into a long hug. My fat belly molded heavily over her flat one, warm and possessive. I buried my face against her chest, even though it's still small and flat, and breathed her in while rubbing her back. She smelled like old books and nervousness. I whispered how good she was doing for the study. The thought of her straight body slowly widening and softening against my own heavy one is already getting me wet. There's something delicious about corrupting a bookworm like this.\n\n— Nadia`,
        `Madeline's stomach is staying fuller longer now, and her thighs have started brushing together slightly. That rigid straight figure is finally beginning to yield.\n\nI kept her here much longer tonight. I laid her on top of me so our bodies could press together. My huge gut molded heavily over hers, completely dominating her smaller frame while I ran my hands over her. I buried my face against her chest, feeling the first hints of new fullness, and groped her ass and thighs, squeezing the emerging softness. She made quiet, nervous sounds that drove me crazy. I told her how right this is, how she was meant to be much heavier. My obsession grows stronger every time I feel her against my colossal body.`,
        `Madeline's stomach stays rounded and full for hours after feeding, and her thighs have started brushing together. That rigid straight figure is finally softening.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits, surrounding her face in warm sweaty cleavage while I groped her thickening ass and thighs. She whimpered softly against me. The contrast feels incredible, but I need so much more. My own body is too huge to grow easily anymore, so every new pound on her brings me intense pleasure. I'm already aching to feel her fat slap heavier against mine.`,
      ],
      [
        `Madeline is starting to soften. Her previously flat stomach now has a noticeable plushness when full, and her thighs touch slightly when she walks. Her chest even looks a tiny bit fuller.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her. I wrapped my arms around her narrow frame and buried my face between her growing breasts, feeling the new warmth and give. She trembled a little but didn't pull away. I rubbed her belly in slow circles while telling her how interesting her reactions are. Having her straight, bookish body starting to yield against my fat feels incredible. I'm getting more addicted with every session.\n\n— Nadia`,
        `Madeline's waist has widened noticeably, her belly now carries a constant soft roundness, and her breasts have grown enough to rest against her middle.\n\nAfter stuffing her until she was panting, I pulled her close on the bed. Our bellies squished together beautifully — hers warm and giving, mine an overwhelming heavy mass that engulfed her. I shoved her face deep into my enormous cleavage and held her there while I jiggled and rubbed her thickening thighs and ass. The way her body is starting to melt against mine feels addictive. I love knowing I'm the one softening this bookish, flat girl. Every new curve makes me want her even bigger.`,
        `Madeline's waist has widened, her belly now carries a constant soft roundness, and her breasts sit heavier on her middle. She looks so much better.\n\nAfter stuffing her until she was panting, I pulled her fully against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could of my lower belly against hers. Every jiggle from her sends shivers through my immense body. I love feeling her expand against me. This is why I chose her — to watch this flat bookworm grow heavy in my place. I told her how proud I am and how much further we're going.`,
      ],
      [
        `Madeline's figure is filling out. Her waist is widening, her belly has a constant soft roundness, and her once-flat chest has grown into modest but noticeable breasts.\n\nI fed her until she was groaning, then laid her against me on the bed. Our bellies pressed together — hers plush and full, mine heavy and sagging — rolling warmly against each other. I shoved her face gently into my massive cleavage and held her there while I groped her softening sides and thighs. She made these quiet, surprised little sounds that drove me crazy. Turning this flat bookworm into something so squeezable is deeply satisfying. I love how her body is starting to squish back against mine.\n\n— Nadia`,
        `Madeline's belly sways when she walks now, her ass has a clear jiggle, and her breasts have become large and heavy.\n\nI kept her pressed against me for hours. Our bellies rolled and folded over each other in thick waves of warm fat as I groped every new inch. I buried my face completely in her heavy tits, licking and motorboating them while grinding our bodies together. She gasped and clutched at my rolls, glasses fogged up. Her body feels so much better already, but I still need more. I want her truly massive so our fat can properly smother one another.`,
        `Madeline's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become large and pendulous.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her tightly. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. I whispered how much better she looks with all this softness. Since my growth is marginal now, every new curve on her body thrills me. I need to feel more of her fat slapping and spreading across mine.`,
      ],
      [
        `Madeline has grown much softer and heavier. Her straight figure has widened, with a big plush belly, thicker thighs, and breasts that now rest noticeably on her middle.\n\nAfter feeding I pulled her on top of me. Her belly squashed warmly down onto my heavy gut, fat melding and folding together as I held her close. I buried my face completely in her soft tits, motorboating and licking while squeezing her thickening ass. She gasped and clutched at my rolls. The contrast between the quiet bookworm she used to be and how jiggly she's becoming turns me on so much. I kept her pressed against me for a long time, enjoying every squish and whimper.\n\n— Nadia`,
        `Madeline's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with movement.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, fat melding together as I wrapped my arms around her. I buried myself deep in her massive tits, moaning into them while squeezing her fat ass and sides. The way she jiggles and sinks into me is incredibly satisfying. Watching this straight bookworm expand has become my greatest pleasure.`,
        `Madeline's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with every step.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier. Watching this straight bookworm swell is deeply satisfying.`,
      ],
      [
        `Madeline moves slower these days. Her belly sways when she walks, her thighs rub constantly, and her breasts have become heavy and full.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her large tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing hard, glasses fogged up, looking adorably overwhelmed. Feeling this much of her soft weight against my own heavy body is heaven. I love what I'm turning her into.\n\n— Nadia`,
        `Madeline moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her fully against my colossal form. Our heavy bellies collided and spilled over each other in soft warm waves. I buried my face between her sagging tits, licking the soft flesh while groping her thickening rolls. Feeling how much more there is of her against me is pure bliss. I encouraged her to eat even more next time. Since my own growth is limited, her expansion has become everything to me.`,
        `Madeline moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size is pure bliss. I encouraged her to keep eating more. Her expansion has become my main source of pleasure since I can barely grow anymore. I need her fat to slap heavily against every inch of mine.`,
      ],
      [
        `Madeline's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and massive breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her enormous tits and rubbed my thick thighs against hers. She moaned softly into my cleavage as I jiggled her everywhere I could reach. The quiet, straight bookworm is almost completely gone. I'm obsessed with how good her fat feels melting against mine.\n\n— Nadia`,
        `Madeline has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies ground together. The warmth and heaviness of her body feels amazing. I moaned into her cleavage about how good she looks this soft. This is why I chose her.`,
        `Madeline has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing against my own. I moaned into her cleavage about how good she looks this soft. This is exactly why I picked her — to live through her gains.`,
      ],
      [
        `Madeline is very fat now. She waddles, everything on her jiggles heavily, and she gets out of breath easily.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her gigantic sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me is driving me crazy. I told her how beautiful she looks like this. My own heavy body feels even better when it's pressed against hers.\n\n— Nadia`,
        `Madeline waddles heavily now, every part of her jiggling and swaying with each step.\n\nAfter feeding her until she was completely stuffed I rolled partially over her. Our massive bellies engulfed each other in heavy warm fat. I smothered my face in her enormous tits and rubbed my thick thighs against her spreading ones. The way her body yields and folds under mine drives me crazy. I told her how proud I am of how big she's getting and how much further I want to take her.`,
        `Madeline waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust. I told her how proud I am and how much bigger I still want her.`,
      ],
      [
        `Madeline looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits in regular chairs anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. I'm completely lost in how massive she's becoming.\n\n— Nadia`,
        `Madeline's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI made her press fully on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The size of her now feels perfect against my colossal body. I groped every roll, lost in her growth.`,
        `Madeline's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her feels overwhelming and perfect. I groped every roll, lost in the sensation of her growth.`,
      ],
      [
        `Madeline has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time merged together on the bed. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. The feeling of her size against me is pure bliss. I don't want this to end.\n\n— Nadia`,
        `Madeline has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours merged together. Our colossal bellies folded and spilled over one another in thick waves as we pressed close. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how enormous she's grown against me is driving me wild. I still crave even more from her.`,
        `Madeline has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown against me is driving me wild. I still crave even more of her fat slapping against mine.`,
      ],
      [
        `Madeline has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The flat, straight bookworm I started with is long gone, replaced by this perfect helpless mountain of fat.\n\nI had her brought right beside me so our enormous blob bodies could melt together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pressed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies merged into one. The sensation was overwhelming and perfect. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Madeline has finally become a true blob — completely immobile like I once imagined, an overflowing sea of soft fat spreading across the bed beside me. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The flat, straight bookworm I started with has vanished, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous blob bodies could melt together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pressed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies merged into one. The sensation was overwhelming — so much warm yielding fat pressing and smothering from every direction. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, completely lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for both of us. She's perfect now.`,
        `Madeline has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The flat, straight bookworm I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped heavily against each other in endless warm waves of fat, rolling, folding, and spreading as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides. I felt every inch of her massive body — rolls slapping and jiggling against my own, bellies overwhelming one another, fat pressing and spilling everywhere. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, completely lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for both of us. She's perfect now.`,
      ],
    ],
  },
  influencer: {
    intro:[
      `Dear Journal,\n\nI've officially started my independent study on the psychology of feederism, and I've chosen Kylie as my subject. She's the classic influencer — always taking selfies, posting outfit videos, and obsessing over her image. She has a stunning hourglass figure: tiny waist, wide hips, thick thighs, and full perky breasts that she loves showing off in tight clothes. She's still slim and toned right now, but I can't stop thinking about ruining that perfect influencer body. There's something so hot about watching a girl who makes money off her looks slowly soften and swell. I want to see how her mind changes when that tight hourglass gets buried under new layers of fat. My own heavy belly and thick rolls rest on my lap as I write this. I'm already excited to feel her growing body press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism, and I've chosen Kylie as the subject. She's the popular influencer always posting selfies and outfit videos, obsessed with her image. She has that stunning hourglass figure — tiny waist, wide hips, thick thighs, and full perky breasts that she loves flaunting in tight clothes. She's still slim and toned right now, and it genuinely bothers me. A body like hers is wasted being so tight and camera-ready. My own colossal frame spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed with the idea of ruining her perfect influencer look. This study is the perfect excuse to make that hourglass swell and sag until she's soft and heavy. I need to feel her growing fat press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Kylie as the subject. She's the popular influencer who's constantly posting selfies, outfit videos, and body shots, completely obsessed with maintaining her image. She has that stunning hourglass figure — tiny waist, wide hips, thick thighs, and full perky breasts she loves showing off. She's still slim and camera-perfect right now, but I know what she truly needs. This study is mostly a front. I already understand feederism on the deepest level through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it pins me down completely. Growing any more myself is nearly impossible now, so I'll live through her. I'm going to turn this tight influencer into a swelling, sagging, heavy mess until her fat can slap and press against every inch of mine. I can't wait.\n\n— Nadia`,
    ],
    entries:[
      [
        `Kylie came over tonight still looking like her usual influencer self — slim waist, perky breasts, and that dramatic hourglass shape in her tight top. I kept the feeding light but consistent with pasta, garlic bread, and dessert. By the end her stomach had a cute rounded bulge.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her flat middle. The contrast felt electric. I pressed my massive tits against her chest, smothering her slightly while holding her close. She laughed nervously, probably thinking about how this would look on camera. Feeling how tight and toned she still is only makes me eager to change that. I want to bury my face in her as she gets softer.\n\n— Nadia`,
        `Kylie came over tonight still way too slim and toned for my liking. That tiny waist and perky breasts actually irritated me. She should already be softer. I fed her aggressively, shoving huge portions of pasta, garlic bread, milkshakes, and cake into her until her belly was painfully bloated and she was groaning.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her flat middle, heavy fat rolling over and smothering her while I held her close. I shoved her face deep between my massive tits and kept her there as I rubbed her overstuffed stomach. The contrast between my huge sagging body and her still-tight influencer figure only made me hungrier. She needs to grow much faster. I whispered how much better she'll look once she's properly soft and heavy. I'm already soaked thinking about it.`,
        `Kylie came by tonight still so slim and picture-perfect. That tiny waist and perky breasts in her tight outfit actually frustrated me. She needs to be so much softer. I fed her heavily from my bed, making her eat huge portions without pause until her belly was painfully swollen and she was groaning.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain as I pulled her close, letting her slim frame disappear into my warm heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach. Feeling how tight and small she still is against my immense mass intensifies my hunger. She has to grow much bigger for both of us. I whispered how incredible it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing everything through her now.`,
      ],
      [
        `Kylie returned for another session. She's still mostly slim, but her stomach stays fuller longer now. That perfect hourglass is holding strong for the moment.\n\nAfter feeding her extra helpings until she was nicely full, I pulled her into a long hug. My fat belly molded heavily over hers, warm and possessive. I buried my face between her full breasts, breathing her in while rubbing her back. She smelled like vanilla body spray and ambition. I whispered how well she was doing for the study. The idea of slowly ruining her influencer figure and feeling that hourglass widen and soften against my heavy body is already turning me on so much.\n\n— Nadia`,
        `Kylie's belly is staying fuller longer now, and her thighs have started brushing together. That rigid hourglass is finally beginning to soften.\n\nI kept her here much longer tonight. I laid her on top of me so our bodies could press together. My huge gut molded heavily over hers, warm and possessive, while I buried my face between her full breasts. They already felt softer. I groped her ass and thighs, squeezing the new plushness. She made nervous little sounds, probably worried about her next post. I told her how right this is. My obsession grows stronger every time — I need her to get so much fatter.`,
        `Kylie's stomach stays rounded and full for hours after feeding, and her thighs have started brushing together. That rigid influencer figure is finally beginning to soften.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits, surrounding her face in warm sweaty cleavage while I groped her thickening ass and thighs. She whimpered nervously, probably thinking about her follower count. The contrast feels so good, but I need so much more. Every new pound on her brings me pleasure and envy. I'm already aching to feel her fat slap heavier against mine.`,
      ],
      [
        `Kylie is starting to soften. Her belly has a plush roundness when full, her thighs brush together more, and her breasts look a bit heavier.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her. I wrapped my arms around her and buried my face deep between her swelling tits, feeling them pillow against my cheeks. She trembled a little but stayed put. I rubbed her belly in slow circles while telling her how fascinating her reactions are. Having her tight hourglass figure finally starting to yield against my fat feels incredible. I'm getting addicted.\n\n— Nadia`,
        `Kylie's waist has widened, her belly now carries a constant soft roundness, and her breasts rest heavier on her middle.\n\nAfter stuffing her until she was panting, I pulled her close on the bed. Our bellies squished together — hers warm and giving, mine an overwhelming heavy mass that engulfed her. I shoved her face deep into my enormous cleavage and held her there while I jiggled and rubbed her thickening thighs and ass. The way her body is starting to melt against mine feels addictive. I love knowing I'm ruining that perfect influencer figure. Every new curve makes me want more.`,
        `Kylie's waist has widened, her belly now carries a constant soft roundness, and her breasts sit heavier on her middle.\n\nAfter stuffing her until she was panting, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her expand against me. This is why I chose her — to watch this image-obsessed girl grow heavy in my place. There's already wonder building inside me as I imagine how big she might become.`,
      ],
      [
        `Kylie's body has grown noticeably softer. Her waist is widening, her belly has constant plushness, and her breasts rest more heavily on her middle.\n\nI fed her until she was groaning, then laid her against me on the bed. Our bellies pressed together — hers soft and full, mine heavy and sagging — rolling warmly against each other. I shoved her face gently into my massive cleavage and held her there while I groped her thickening hips and ass. She made these surprised little sounds that drove me crazy. Turning this influencer's perfect hourglass into something so squeezable and jiggly is deeply satisfying.\n\n— Nadia`,
        `Kylie's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become large and pendulous.\n\nI kept her pressed against me for hours. Our bellies rolled and folded over each other in thick waves of warm fat as I groped every new inch. I buried my face completely in her heavy tits, licking and motorboating them while grinding our bodies together. She gasped and clutched at my rolls. Her body feels so much better already, but I still need so much more. I want her truly massive so our fat can properly smother one another.`,
        `Kylie's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become large and pendulous.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with both pleasure and envy. I wonder if she'll eventually become even bigger than I am. The thought excites me deeply.`,
      ],
      [
        `Kylie looks much plusher now. Her figure has widened with a big soft belly, thick spreading thighs, and heavy breasts that sway when she moves.\n\nAfter feeding I pulled her on top of me. Her belly squashed warmly down onto my heavy gut, fat melding together as I held her close. I buried my face completely in her massive tits, motorboating and licking while squeezing her fat ass. She gasped and clutched at my rolls. The contrast between the polished influencer she used to be and how jiggly she's becoming turns me on so much. I kept her pressed against me for a long time.\n\n— Nadia`,
        `Kylie's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with movement.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, fat melding together as I wrapped my arms around her. I buried myself deep in her massive tits, moaning into them while squeezing her fat ass and sides. The way she jiggles and sinks into me is incredibly satisfying. Watching this polished influencer soften and widen has become my greatest pleasure.`,
        `Kylie's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with every step.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier. A deep envy is mixing with wonder — she's pulling ahead of where I ever reached.`,
      ],
      [
        `Kylie moves slower these days. Her belly sways when she walks, her thighs rub constantly, and her breasts have grown truly heavy.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her enormous tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing hard, probably worried about her follower count. Feeling this much of her soft weight against my own heavy body is heaven.\n\n— Nadia`,
        `Kylie moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her fully against my colossal form. Our heavy bellies collided and spilled over each other in soft warm waves. I buried my face between her sagging tits, licking the soft flesh while groping her thickening rolls. Feeling how much more there is of her against me is pure bliss. I encouraged her to eat even more next time. Since my own growth is limited, her expansion has become everything to me.`,
        `Kylie moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings both bliss and jealousy. She's becoming so massive while I stay stuck like this. It's wonderful and aching at the same time. I need her even bigger.`,
      ],
      [
        `Kylie's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her gigantic tits and rubbed my thick thighs against hers. She moaned softly into my cleavage. The once-perfect influencer hourglass is disappearing under all this softness, and I love every second of it.\n\n— Nadia`,
        `Kylie has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies ground together. The warmth and heaviness of her body feels amazing. This is exactly why I chose her — to turn that tight influencer body into soft, heavy fat.`,
        `Kylie has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing, but the envy is stronger now. She's growing beyond what I managed. It fills me with strange wonder and hunger.`,
      ],
      [
        `Kylie is very fat now. She waddles, everything on her jiggles heavily, and she gets out of breath easily.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her enormous sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me drives me crazy. She still tries to pose for pictures sometimes, which makes it even hotter.\n\n— Nadia`,
        `Kylie waddles heavily now, every part of her jiggling and swaying with each step.\n\nAfter feeding her until she was stuffed I rolled partially over her. Our massive bellies engulfed each other in heavy warm fat. I smothered my face in her enormous tits and rubbed my thick thighs against hers. The way her body yields and folds under mine drives me crazy. I told her how proud I am of how big she's getting and how much further I want to take her.`,
        `Kylie waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust and envy. She's getting so much bigger than I ever did. I both love it and feel a deep longing.`,
      ],
      [
        `Kylie looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits in her old outfits anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. I'm completely lost in how massive she's becoming.\n\n— Nadia`,
        `Kylie's body is covered in heavy rolls and sagging fat. She barely fits in her old clothes anymore.\n\nI made her press fully on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect against my colossal body. I groped every roll, lost in her growth.`,
        `Kylie's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now leaves me in awe and envy. She's outgrowing me so beautifully. I groped every roll, lost in the sensation.`,
      ],
      [
        `Kylie has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time merged together on the bed. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. The feeling of her size against me is pure bliss. Her old influencer life feels so far away now.\n\n— Nadia`,
        `Kylie has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how enormous she's grown against me is driving me wild. I still crave even more of her.`,
        `Kylie has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown fills me with wonder and jealousy. She's becoming what I always wanted to be. I still crave even more of her.`,
      ],
      [
        `Kylie has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The glamorous influencer with the perfect hourglass I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her brought right beside me so our enormous blob bodies could press together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies melted against one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Kylie has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The glamorous influencer with the perfect hourglass I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spilling as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded together. I felt every inch of her massive form pressing and jiggling against mine. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, completely lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.`,
        `Kylie has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed right beside mine. She's enormous, with vast rolls cascading in every direction, a belly so huge and heavy it completely pins her down, and breasts like massive heavy pillows resting on top of her. The glamorous, selfie-obsessed influencer with the perfect hourglass I started with has been transformed into this perfect, helpless, overflowing mountain of fat, every inch of her soft, jiggly, and useless for her old life.\n\nI had her positioned right against me so our enormous bodies could press together as closely as possible. Our vast bellies slapped heavily against each other in endless warm waves of fat, rolling, folding, spilling, and jiggling with every tiny shift between us. I felt every inch of her massive form — her thick rolls pressing and slapping into my own, her heavy breasts smothering against my chest, her wide hips and thighs spreading out and mashing their softness against mine. The sensation was overwhelming and intoxicating. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by warm, sweaty, endless flesh on all sides while our bodies molded and squished together. I licked and moaned loudly into her deep cleavage for what felt like hours, groping and squeezing whatever rolls and folds I could reach with my limited movement. Every heavy slap of fat, every ripple traveling through her body into mine, every moment of our colossal forms pressing and overwhelming each other sent waves of pure pleasure through me.\n\nShe has completely outgrown me. Where I stopped, she kept going, becoming this perfect immobile goddess of fat while I remain stuck. The envy I feel is sharp and deep, yet it mixes with pure wonder and arousal. I chose her so I could experience this growth vicariously, and she has given me more than I ever imagined. She's so much bigger, so much softer, so much more everything than I became. I moaned her name into her tits again and again, lost in the feeling of our bodies slapping and pressing together. This is perfection. This is everything I wanted. She's perfect now.`,
      ],
    ],
  },
  athlete: {
    intro:[
      `Dear Journal,\n\nI've officially started my independent study on the psychology of feederism, and I've chosen Serena as my subject. She's the dedicated athlete — always at the gym, running track, or in the weight room, with that strong, athletic build: toned arms, visible abs, powerful thighs, muscular legs, and a tight, athletic frame that screams discipline. She's so fit and energetic right now. There's something incredibly arousing about picking a girl like her. I want to explore what happens to her mind when all that athletic strength slowly disappears under layers of soft fat. Personally, the idea of turning this hard, toned athlete into something heavy, jiggly, and out of breath turns me on more than anything. My own heavy belly and thick rolls rest on my lap as I write this. I can't wait to feel her firm body soften and press against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism, and I've chosen Serena as the subject. She's the dedicated athlete — always training, running, lifting, with that strong, athletic build: toned arms, visible abs, powerful thighs, and a tight, disciplined body. She's still so fit and energetic right now, and it bothers me. A body like hers feels wasted being so hard and controlled. My own colossal frame spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed. This study is the perfect excuse to break down that athletic physique completely. I want to watch her toned muscles disappear under softness and see her become heavy and jiggly. I need to feel her growing body press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Serena as the subject. She's the dedicated athlete — always training hard, running track, lifting weights, with that strong, athletic build: toned arms, visible abs, powerful thighs, and a tight, disciplined body. She's still so fit and energetic right now. This study is mostly a front at this point. I already understand feederism completely through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it pins me down completely. Growing any more myself feels nearly impossible now, so I'll live through her. I'm going to turn this strong, athletic girl into something truly enormous and heavy until her fat can slap and press against every inch of mine. I can't wait to feel her powerful body disappear under softness.\n\n— Nadia`,
    ],
    entries:[
      [
        `Serena came over tonight still looking every bit the athlete — toned abs, strong legs, and that tight muscular frame. I kept the feeding gentle but steady with pasta, protein-heavy meals, and rich desserts. By the end her stomach had a nice tight bulge under her tank top.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her flat, muscular middle. The contrast made me shiver with excitement. I pressed my massive tits against her firm chest and held her there a moment longer. She laughed it off, but I could feel her slight surprise. Feeling how hard and athletic she still is only makes me eager to change that. I want to bury myself in her as she starts to soften.\n\n— Nadia`,
        `Serena came over tonight still far too athletic and toned for my taste. Those visible abs and strong legs actually irritated me. She needs to be much softer already. I fed her aggressively, forcing huge portions of pasta, garlic bread, milkshakes, and cake until her belly was painfully bloated and she was groaning.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her firm middle, heavy fat rolling over and smothering her while I held her close. I shoved her face deep between my massive tits and kept her there as I rubbed her overstuffed stomach. The contrast between my huge sagging body and her still-athletic frame only fueled my hunger. She has to grow faster. I whispered how much better she'll feel once she's properly soft. I'm already soaked thinking about it.`,
        `Serena came by tonight still so athletic and toned. Her visible abs and strong legs actually frustrated me. She needs to be so much softer. I fed her heavily from my bed, making her eat huge portions without stopping until her belly was painfully swollen and she was groaning.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain as I pulled her close, letting her firm frame disappear into my warm heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach. Feeling how hard and athletic she still is against me intensifies my hunger. She has to grow much bigger for both of us. I whispered how incredible it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing everything through her now.`,
      ],
      [
        `Serena returned today. She's still mostly athletic, but her stomach stays fuller longer after our sessions. That disciplined, strong body hasn't changed much yet.\n\nAfter feeding her extra helpings until she was full, I pulled her into a long hug. My fat belly molded heavily over her toned middle, warm and possessive. I buried my face against her chest, breathing in her post-workout scent while rubbing her back. I whispered how good she was doing for the study. The thought of slowly breaking down that athletic build and feeling her firm body widen and soften against my heavy one is already getting me so wet. There's something delicious about corrupting her discipline.\n\n— Nadia`,
        `Serena's stomach is staying fuller longer now, and her powerful thighs have started brushing together. That rigid athletic build is finally beginning to soften.\n\nI kept her here much longer tonight. I laid her on top of me so our bodies could press together. My huge gut molded heavily over hers, warm and possessive, while I buried my face between her breasts. They already felt a little softer. I groped her ass and thighs, squeezing the emerging plushness. She made surprised, breathy sounds. I told her how right this is. My obsession grows stronger every session — I need her so much heavier.`,
        `Serena's stomach stays rounded and full for hours after feeding, and her powerful thighs have started brushing together. That rigid athletic build is finally beginning to soften.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits while I groped her thickening ass and thighs. She whimpered softly. The contrast feels so good, but I need so much more. Every new pound on her brings me pleasure and envy. I'm already aching to feel her fat slap heavier against mine.`,
      ],
      [
        `Serena is starting to soften. Her abs are less defined, her stomach has a plush roundness when full, and her powerful thighs are beginning to rub together.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her. I wrapped my arms around her athletic frame and buried my face between her breasts, feeling the first hints of new give. She trembled slightly but stayed. I rubbed her belly in slow circles while telling her how interesting her reactions are. Having her strong, athletic body finally starting to yield against my fat feels incredible. I'm getting addicted.\n\n— Nadia`,
        `Serena's waist has widened, her belly now carries a constant soft roundness, and her once-toned arms look cushioned.\n\nAfter stuffing her until she was panting, I pulled her close on the bed. Our bellies squished together — hers warm and giving, mine an overwhelming heavy mass that engulfed her. I shoved her face deep into my enormous cleavage and held her there while I jiggled and rubbed her thickening thighs. The way her athletic body is starting to melt against mine feels addictive. I love knowing I'm the one softening her up. Every new curve makes me want more.`,
        `Serena's waist has widened, her belly now carries a constant soft roundness, and her once-toned arms look cushioned.\n\nAfter stuffing her until she was panting, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her athletic strength fade against me. This is why I chose her — to watch this disciplined girl grow heavy in my place. Wonder is already building as I imagine how big she might become.`,
      ],
      [
        `Serena's body has grown noticeably softer. Her waist is widening, her belly has constant plushness, and her once-toned arms and legs are starting to look cushioned.\n\nI fed her until she was groaning, then laid her against me on the bed. Our bellies pressed together — hers soft and full, mine heavy and sagging — rolling warmly against each other. I shoved her face gently into my massive cleavage and held her there while I groped her thickening thighs and ass. She made these surprised, breathy sounds that drove me crazy. Turning this athletic girl's hard body into something so squeezable is deeply satisfying.\n\n— Nadia`,
        `Serena's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become larger and heavier.\n\nI kept her pressed against me for hours. Our bellies rolled and folded over each other in thick waves of warm fat as I groped every new inch. I buried my face completely in her heavy tits, licking and motorboating them while grinding our bodies together. She gasped and clutched at my rolls. Her body feels so much better already, but I still need so much more. I want her truly massive so our fat can properly smother one another.`,
        `Serena's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become larger and heavier.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with both pleasure and envy. I wonder if she'll eventually become even bigger than I am.`,
      ],
      [
        `Serena looks much plusher now. Her figure has widened with a big soft belly, thicker thighs, and breasts that have grown heavier and softer.\n\nAfter feeding I pulled her on top of me. Her belly squashed warmly down onto my heavy gut, fat melding together as I held her close. I buried my face completely in her massive tits, motorboating and licking while squeezing her fat ass. She gasped and clutched at my rolls. The contrast between the strong athlete she was and how jiggly she's becoming turns me on so much. I kept her pressed against me for a long time.\n\n— Nadia`,
        `Serena's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavier breasts that sway when she moves.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, fat melding together as I wrapped my arms around her. I buried myself deep in her massive tits, moaning into them while squeezing her fat ass and sides. The way she jiggles and sinks into me is incredibly satisfying. Watching this once-athletic girl soften and widen has become my greatest pleasure.`,
        `Serena's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavier breasts that sway when she moves.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. A deep envy is mixing with wonder — she's pulling ahead of where I ever reached.`,
      ],
      [
        `Serena moves slower these days. Her belly sways when she walks, her thighs rub constantly, and her whole body has lost that sharp muscular definition.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her enormous tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing hard, no longer sounding like the athlete she used to be. Feeling this much of her soft weight against my own heavy body is heaven.\n\n— Nadia`,
        `Serena moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her fully against my colossal form. Our heavy bellies collided and spilled over each other in soft warm waves. I buried my face between her sagging tits, licking the soft flesh while groping her thickening rolls. Feeling how much more there is of her against me is pure bliss. I encouraged her to eat even more next time. Since my own growth is limited, her expansion has become everything to me.`,
        `Serena moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings both bliss and jealousy. She's becoming so massive while I stay stuck like this. It's wonderful and aching at the same time. I need her even bigger.`,
      ],
      [
        `Serena's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her gigantic tits and rubbed my thick thighs against hers. She moaned softly into my cleavage. The once-hard athletic build is almost completely gone, replaced by beautiful softness, and I love every second of it.\n\n— Nadia`,
        `Serena has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies ground together. The warmth and heaviness of her body feels amazing. This is exactly why I chose her — to turn that strong athletic build into soft, heavy fat.`,
        `Serena has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing, but the envy is stronger now. She's growing beyond what I managed. It fills me with strange wonder and hunger.`,
      ],
      [
        `Serena is very fat now. She waddles, everything on her jiggles heavily, and she gets out of breath from the smallest movements.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her enormous sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me drives me crazy. Her old athletic discipline feels so distant now.\n\n— Nadia`,
        `Serena waddles heavily now, every part of her jiggling and swaying with each step.\n\nAfter feeding her until she was stuffed I rolled partially over her. Our massive bellies engulfed each other in heavy warm fat. I smothered my face in her enormous tits and rubbed my thick thighs against hers. The way her body yields and folds under mine drives me crazy. I told her how proud I am of how big she's getting and how much further I want to take her.`,
        `Serena waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust and envy. She's getting so much bigger than I ever did. I both love it and feel a deep longing.`,
      ],
      [
        `Serena looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits in her old athletic wear anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. I'm completely lost in how massive she's becoming.\n\n— Nadia`,
        `Serena's body is covered in heavy rolls and sagging fat. She barely fits in her old athletic clothes anymore.\n\nI made her press fully on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect against my colossal body. I groped every roll, lost in her growth.`,
        `Serena's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now leaves me in awe and envy. She's outgrowing me so beautifully. I groped every roll, lost in the sensation.`,
      ],
      [
        `Serena has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. The feeling of her size against me is pure bliss. Her athletic days feel like another lifetime now.\n\n— Nadia`,
        `Serena has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how enormous she's grown against me is driving me wild. I still crave even more of her.`,
        `Serena has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown fills me with wonder and jealousy. She's becoming what I always wanted to be. I still crave even more of her.`,
      ],
      [
        `Serena has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The strong, athletic girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her brought right beside me so our enormous blob bodies could press together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies melted against one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Serena has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The strong, athletic girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spilling as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded together. I felt every inch of her massive form pressing and jiggling against mine. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, completely lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.`,
        `Serena has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed right beside mine. She's enormous, with vast rolls cascading in every direction, a belly so huge and heavy it completely pins her down, and breasts like massive heavy pillows resting on top of her. The strong, disciplined athlete I chose has been transformed into this perfect, helpless, overflowing mountain of fat, every inch of her soft, jiggly, and useless for her old athletic life.\n\nI had her positioned right against me so our enormous bodies could press together as closely as possible. Our vast bellies slapped heavily against each other in endless warm waves of fat, rolling, folding, spilling, and jiggling with every tiny shift between us. I felt every inch of her massive form — her thick rolls pressing and slapping into my own, her heavy breasts smothering against my chest, her wide hips and thighs spreading out and mashing their softness against mine. The sensation was overwhelming and intoxicating. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by warm, sweaty, endless flesh on all sides while our bodies molded and squished together. I licked and moaned loudly into her deep cleavage for what felt like hours, groping and squeezing whatever rolls and folds I could reach with my limited movement. Every heavy slap of fat, every ripple traveling through her body into mine, every moment of our colossal forms pressing and overwhelming each other sent waves of pure pleasure through me.\n\nShe has completely outgrown me. Where I stopped, she kept going, becoming this perfect immobile goddess of fat while I remain stuck. The envy I feel is sharp and deep, yet it mixes with pure wonder and arousal. I chose her so I could experience this growth vicariously, and she has given me more than I ever imagined. She's so much bigger, so much softer, so much more everything than I became. I moaned her name into her tits again and again, lost in the feeling of our bodies slapping and pressing together. This is perfection. This is everything I wanted. She's perfect now.`,
      ],
    ],
  },
  artsy: {
    intro:[
      `Dear Journal,\n\nI've officially started my independent study on the psychology of feederism, and I've chosen Fiona as my subject. She's the artsy type — always sketching, painting, or lost in creative thoughts, with paint on her fingers and flowing clothes. Her body is so straight and flat: narrow shoulders, almost no chest, slim hips, and very little curve anywhere. She's delicate and androgynous in that artistic way. There's something fascinating about picking a girl like her. I want to see how her creative mind reacts when her flat, straight figure starts to soften and swell. Personally, the idea of turning this artistic, flat girl into something heavy and jiggly really turns me on. My own heavy belly and thick rolls rest on my lap as I write this. I can't wait to feel her changing body press against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism, and I've chosen Fiona as the subject. She's the artsy, creative girl — always sketching, painting, or lost in her thoughts with paint-stained fingers and flowing clothes. Her body is so straight and flat: narrow shoulders, almost no chest, slim hips, and very little curve. She has that delicate, androgynous artistic look. It bothers me how untouched she is. My own colossal frame spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed. This study is the perfect excuse to transform her completely. I want to watch that flat, straight artistic body swell and soften until she's heavy and overflowing. I need to feel her growing fat press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Fiona as the subject. She's the artsy, creative girl — always sketching, painting, or lost in her thoughts with paint-stained fingers and flowing clothes. Her body is so straight and flat: narrow shoulders, almost no chest, slim hips, and very little curve. She has that delicate, androgynous artistic look. This study is mostly a front now. I already understand feederism deeply through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it pins me down completely. Growing any more myself feels nearly impossible, so I'll live through her. I'm going to turn this flat, artistic girl into something truly enormous until her fat can slap and press against every inch of mine. I can't wait.\n\n— Nadia`,
    ],
    entries:[
      [
        `Fiona came over tonight still so flat and straight-figured. Her narrow frame looked delicate under her oversized sweater. I kept the feeding gentle with pasta, bread, and creamy desserts. By the end her stomach had a tight rounded bulge.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her flat middle. The contrast felt amazing. I pressed my massive tits against her nearly flat chest, smothering her slightly as I held her close. She blushed and adjusted her messy bun nervously. Feeling how little there is of her right now only makes me excited for what's coming. I want to bury myself in her as she grows.\n\n— Nadia`,
        `Fiona came over tonight still so flat and straight-figured. Her narrow frame under that oversized sweater irritated me. She should already be softer. I fed her aggressively, shoving huge portions of pasta, bread, milkshakes, and cake into her until her belly was painfully bloated and she was groaning.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her flat middle, heavy fat rolling over and smothering her while I held her close. I shoved her face deep between my massive tits and kept her there as I rubbed her overstuffed stomach. The contrast between my huge sagging body and her still-straight one only fueled my hunger. She needs to grow much faster. I whispered how much better she'll look once there's real softness to her. I'm already soaked thinking about it.`,
        `Fiona came by tonight still so flat and straight-figured. Her narrow frame under that oversized sweater frustrated me. She needs to be so much softer. I fed her heavily from my bed, making her eat huge portions without stopping until her belly was painfully swollen and she was groaning.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain as I pulled her close, letting her slim frame disappear into my warm heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach. Feeling how small and flat she still is against me intensifies my hunger. She has to grow much bigger for both of us. I whispered how incredible it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing this all through her now.`,
      ],
      [
        `Fiona returned today. Her stomach stays fuller longer after our sessions, and her narrow frame looks a little softer afterward.\n\nAfter feeding her extra helpings until she was full, I pulled her into a long hug. My fat belly molded heavily over her flat one, warm and possessive. I buried my face against her chest, even though it's still small, and breathed her in while rubbing her back. She smelled like paint and old books. I whispered how good she was doing for the study. The thought of her straight artistic body slowly widening and softening against my heavy one is already getting me wet.\n\n— Nadia`,
        `Fiona's stomach is staying fuller longer now, and her narrow thighs have started brushing together. That rigid straight figure is finally beginning to yield.\n\nI kept her here much longer tonight. I laid her on top of me so our bodies could press together. My huge gut molded heavily over hers, warm and possessive, while I buried my face against her chest. I groped her ass and thighs, squeezing the first hints of new plushness. She made quiet, thoughtful sounds, probably still thinking about her next painting. I told her how right this feels. My obsession grows stronger every session.`,
        `Fiona's stomach stays rounded and full for hours after feeding, and her narrow thighs have started brushing together. That rigid straight figure is finally beginning to soften.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits, surrounding her face in warm sweaty cleavage while I groped her thickening ass and thighs. She whimpered softly. The contrast feels so good, but I need so much more. Every new pound on her brings me intense pleasure. I'm already aching to feel her fat slap heavier against mine.`,
      ],
      [
        `Fiona is starting to soften. Her previously flat stomach now has a noticeable plushness when full, and her thighs touch slightly when she walks.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her. I wrapped my arms around her narrow frame and buried my face between her growing breasts, feeling the new warmth. She trembled a little but didn't pull away. I rubbed her belly in slow circles while telling her how interesting her reactions are. Having her straight, artsy body starting to yield against my fat feels incredible.\n\n— Nadia`,
        `Fiona's waist has widened, her belly now carries a constant soft roundness, and her once-flat chest has some new fullness.\n\nAfter stuffing her until she was panting, I pulled her close on the bed. Our bellies squished together — hers warm and giving, mine an overwhelming heavy mass that engulfed her. I shoved her face deep into my enormous cleavage and held her there while I jiggled and rubbed her thickening thighs. The way her artistic body is starting to melt against mine feels addictive. I love knowing I'm the one changing her.`,
        `Fiona's waist has widened, her belly now carries a constant soft roundness, and her once-flat chest has some new fullness.\n\nAfter stuffing her until she was panting, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her artistic body expand against me. This is why I chose her — to watch this creative girl grow heavy in my place.`,
      ],
      [
        `Fiona's waist has widened, her belly has a constant soft roundness, and her once-flat chest has grown into modest breasts.\n\nI fed her until she was groaning, then laid her against me on the bed. Our bellies pressed together — hers plush and full, mine heavy and sagging — rolling warmly against each other. I shoved her face gently into my massive cleavage and held her there while I groped her softening sides and thighs. She made quiet, surprised artistic little sounds that drove me crazy. Turning this flat girl into something so squeezable is deeply satisfying.\n\n— Nadia`,
        `Fiona's belly sways when she walks now, her ass has a clear jiggle, and her breasts have become noticeably larger.\n\nI kept her pressed against me for hours. Our bellies rolled and folded over each other in thick waves of warm fat as I groped every new inch. I buried my face completely in her heavy tits, licking and motorboating them while grinding our bodies together. She gasped softly, fingers still stained with charcoal. Her body feels so much better already, but I still need more.`,
        `Fiona's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become larger.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with pleasure. I need her to keep swelling.`,
      ],
      [
        `Fiona has grown much softer. Her figure has widened with a big plush belly, thicker thighs, and breasts that now rest noticeably on her middle.\n\nAfter feeding I pulled her on top of me. Her belly squashed warmly down onto my heavy gut, fat melding together as I held her close. I buried my face completely in her soft tits, motorboating and licking while squeezing her thickening ass. She gasped and clutched at my rolls. The contrast between the flat artsy girl she was and how jiggly she's becoming turns me on so much.\n\n— Nadia`,
        `Fiona's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with movement.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, fat melding together as I wrapped my arms around her. I buried myself deep in her massive tits, moaning into them while squeezing her fat ass and sides. The way she jiggles and sinks into me is incredibly satisfying. Watching this once-flat artsy girl expand has become my greatest pleasure.`,
        `Fiona's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with movement.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier.`,
      ],
      [
        `Fiona moves slower these days. Her belly sways when she walks, her thighs rub constantly, and her breasts have grown heavy.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her large tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing hard, paint still on her fingers. Feeling this much of her soft weight against my own heavy body is heaven.\n\n— Nadia`,
        `Fiona moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her fully against my colossal form. Our heavy bellies collided and spilled over each other in soft warm waves. I buried my face between her sagging tits, licking the soft flesh while groping her thickening rolls. Feeling how much more there is of her against me is pure bliss. I encouraged her to eat even more next time. Her expansion has become everything to me.`,
        `Fiona moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings pure bliss. Her expansion has become my main source of pleasure.`,
      ],
      [
        `Fiona's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her gigantic tits and rubbed my thick thighs against hers. She moaned softly into my cleavage. The once-flat, straight artistic girl is almost completely gone, replaced by beautiful softness, and I love it.\n\n— Nadia`,
        `Fiona has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies ground together. The warmth and heaviness of her body feels amazing. This is exactly why I chose her.`,
        `Fiona has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing. This is exactly why I picked her — to live through her gains while I remain like this.`,
      ],
      [
        `Fiona is very fat now. She waddles, everything on her jiggles heavily, and she gets out of breath easily.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her enormous sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me drives me crazy. I'm starting to feel a little jealous — she's getting so big, so fast.\n\n— Nadia`,
        `Fiona waddles heavily now, every part of her jiggling and swaying with each step.\n\nAfter feeding her until she was stuffed I rolled partially over her. Our massive bellies engulfed each other in heavy warm fat. I smothered my face in her enormous tits and rubbed my thick thighs against hers. The way her body yields and folds under mine drives me crazy. I told her how proud I am of how big she's getting.`,
        `Fiona waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust. I told her how proud I am and how much bigger I still want her.`,
      ],
      [
        `Fiona looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits in her old flowing dresses anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. The jealousy is stronger now — she's becoming massive while I'm stuck at this size. It makes me want her even bigger.\n\n— Nadia`,
        `Fiona's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI made her press fully on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect against my colossal body. I groped every roll, lost in her growth.`,
        `Fiona's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect. I groped every roll, lost in the sensation of her growth.`,
      ],
      [
        `Fiona has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. Feeling how enormous she's become fills me with both lust and envy. She's outgrowing me.\n\n— Nadia`,
        `Fiona has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how enormous she's grown against me is driving me wild. I still crave even more of her.`,
        `Fiona has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown drives me wild. I still crave even more of her.`,
      ],
      [
        `Fiona has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The flat, straight artsy girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her brought right beside me so our enormous blob bodies could press together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies melted against one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. She has become so much bigger than me. The jealousy burns hot, but it mixes with deep satisfaction. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Fiona has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The flat, straight artsy girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spilling as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded together. I felt every inch of her massive form pressing and jiggling against mine. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy.\n\nShe has completely outgrown me. The jealousy hits me hard now — she became this massive while I stay stuck like this. It burns, but it also fills me with twisted satisfaction. This is everything I wanted when I chose her. She grew so beautifully for me.`,
        `Fiona has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed right beside mine. She's enormous, with vast rolls cascading in every direction, a belly so huge and heavy it completely pins her down, and breasts like massive heavy pillows resting on top of her. The flat, straight artsy girl I started with has been transformed into this perfect, helpless, overflowing mountain of fat, every inch of her soft, jiggly, and beautiful.\n\nI had her positioned right against me so our enormous bodies could press together as closely as possible. Our vast bellies slapped heavily against each other in endless warm waves of fat, rolling, folding, spilling, and jiggling with every tiny shift between us. I felt every inch of her massive form — her thick rolls pressing and slapping into my own, her heavy breasts smothering against my chest, her wide hips and thighs spreading out and mashing their softness against mine. The sensation was overwhelming and intoxicating. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by warm, sweaty, endless flesh on all sides while our bodies molded and squished together. I licked and moaned loudly into her deep cleavage for what felt like hours, groping and squeezing whatever rolls and folds I could reach with my limited movement. Every heavy slap of fat, every ripple traveling through her body into mine, every moment of our colossal forms pressing and overwhelming each other sent waves of pure pleasure through me.\n\nShe has actually reached my size, I didn't expect it and yet it's inspiring me in a way I didn't expect. Looking at how massive and soft she's become makes me want to get even fatter myself. I need to grow bigger. I need to outgrow her, show her true obesity, true girth. I moaned her name into her tits again and again, lost in the feeling of our bodies slapping and pressing together. This is perfection. This is everything I wanted when I chose her. She's perfect now.`,
      ],
    ],
  },
  overachiever: { intro:`[placeholder: Nadia intro — why she chose the overachiever as her subject]`, entries:_np('overachiever') },
  sorority: {
    intro:[
      `Dear Journal,\n\nI've officially started my independent study on the psychology of feederism, and I've chosen Tiffany as my subject. She's the classic sorority girl — bubbly, social, always at parties or Greek events, with that topheavy hourglass figure. She has full, prominent breasts, a smaller waist, and wide hips that she loves showing off in tight tops and short skirts. She's still relatively slim and energetic right now, but I can already picture how incredible she'll look when all that top-heavy beauty gets buried under new layers of softness. There's something so fun about the idea of taking a popular, party-loving sorority girl and making her heavier and lazier. My own heavy belly and thick rolls rest on my lap as I write this. I can't wait to feel her growing curves press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism, and I've chosen Tiffany as the subject. She's the bubbly sorority girl — always at parties, posting group pics, and living that social life, with that striking topheavy hourglass figure. She has full, prominent breasts, a smaller waist, and wide hips that she shows off in tight tops and short skirts. She's still relatively slim and energetic right now, and it bothers me. A body like hers is meant to be so much softer and heavier. My own colossal frame spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed. This study is the perfect excuse to make that topheavy sorority figure swell and sag until she's truly massive. I need to feel her growing curves press and squish against mine.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Tiffany as the subject. She's the bubbly sorority girl — always at parties, posting group pics, and living that social life, with that striking topheavy hourglass figure. She has full, prominent breasts, a smaller waist, and wide hips that she shows off in tight tops and short skirts. She's still relatively slim and energetic right now. This study is mostly a front at this point. I already understand feederism deeply through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it pins me down completely. Growing any more myself feels nearly impossible now, so I'll live through her. I'm going to turn this topheavy sorority girl into something truly enormous until her fat can slap and press against every inch of mine. I can't wait.\n\n— Nadia`,
    ],
    entries:[
      [
        `Tiffany came over tonight still looking like her usual sorority self — tight top straining over her full breasts and that curvy silhouette. I kept the feeding steady with pasta, cheesy bread, and sweet desserts. By the end her stomach had a nice rounded bulge.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her middle. The contrast felt amazing. I pressed my massive tits against her already prominent chest, smothering her slightly as I held her close. She giggled and flipped her hair, probably thinking about her next party. Feeling how toned she still is only makes me excited for what's coming. I want to bury my face in her as she starts to soften.\n\n— Nadia`,
        `Tiffany came over tonight still way too slim and perky for my liking. That tight waist and full breasts in her sorority top irritated me. She should already be softer. I fed her aggressively, shoving huge plates of pasta, cheesy bread, milkshakes, and cake into her until her belly was painfully bloated and she was groaning.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her middle, heavy fat rolling over and smothering her while I held her close. I shoved her face deep between my massive tits and kept her there as I rubbed her overstuffed stomach. The contrast between my huge sagging body and her still-toned sorority figure only made me hungrier. She needs to grow much faster. I whispered how much better she'll look once she's properly heavy. I'm already soaked thinking about it.`,
        `Tiffany came by tonight still looking far too slim and perky for how I want her, with her signature topheavy figure still tight and camera-ready in one of her usual tight sorority tops that strain over her full breasts. Her smaller waist and wide hips still give her that classic energetic look that makes her so popular. I fed her heavily from my bed, making her eat huge portions without stopping until her belly was painfully swollen and she was groaning.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain as I pulled her close, letting her slim frame disappear into my warm heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach. Feeling how small she still is against me intensifies my hunger. She has to grow much bigger for both of us. I whispered how incredible it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing this all through her now.`,
      ],
      [
        `Tiffany returned today. Her stomach stays fuller longer after our sessions, and her hips seem a little wider already.\n\nAfter feeding her extra helpings until she was nicely full, I pulled her into a long hug. My fat belly molded heavily over hers, warm and possessive. I buried my face between her full breasts, breathing in her perfume while rubbing her back. She smelled like vanilla and lip gloss. I whispered how good she was doing for the study. The thought of slowly softening that topheavy sorority figure and feeling it widen against my heavy body is already getting me wet.\n\n— Nadia`,
        `Tiffany's stomach is staying rounded and full for hours after feeding, and her thighs have started brushing together more noticeably while her once-snug waist is beginning to lose its tightness. That classic topheavy sorority shape is finally starting to yield and soften in all the right places.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits, surrounding her face in warm sweaty cleavage while I groped her thickening ass and thighs. She whimpered softly. The contrast feels so good, but I need so much more. Every new pound on her brings me intense pleasure. I'm already aching to feel her fat slap heavier against mine.`,
        `Tiffany's stomach is staying rounded and full for hours after feeding, and her thighs have started brushing together. That classic topheavy sorority shape is finally starting to soften.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her. I held her head down between my enormous tits while I groped her thickening ass and thighs. She whimpered softly. The contrast feels so good, but I need so much more. Every new pound on her brings me intense pleasure. I'm already aching to feel her fat slap heavier against mine.`,
      ],
      [
        `Tiffany is starting to soften. Her belly has a plush roundness when full, her thighs brush together more, and her breasts look even heavier.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her. I wrapped my arms around her and buried my face deep between her swelling tits, feeling them pillow against my cheeks. She let out a cute little giggle but stayed put. I rubbed her belly in slow circles while telling her how interesting this all is. Having her curvy sorority body starting to yield against my fat feels incredible. I'm getting addicted.\n\n— Nadia`,
        `Tiffany's waist has widened noticeably, her belly now carries a constant soft roundness even when she hasn't just eaten, and her prominent breasts sit heavier and fuller on her middle, making her whole upper body look even more dramatic.\n\nAfter stuffing her until she was panting, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her expand against me. This is why I chose her — to watch this bubbly sorority girl grow heavy in my place.`,
        `Tiffany's waist has widened, her belly now carries a constant soft roundness even when she hasn't just eaten, and her prominent breasts sit heavier and fuller on her middle.\n\nAfter stuffing her until she was panting, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her expand against me. This is why I chose her — to watch this bubbly sorority girl grow heavy in my place.`,
      ],
      [
        `Tiffany's waist has widened, her belly has a constant soft roundness, and her breasts rest more heavily on her middle.\n\nI fed her until she was groaning happily, then laid her against me on the bed. Our bellies pressed together — hers plush and full, mine heavy and sagging — rolling warmly against each other. I shoved her face gently into my massive cleavage and held her there while I groped her thickening hips and ass. She made these surprised, bubbly sounds that drove me crazy. Turning her topheavy figure into something so squeezable is deeply satisfying.\n\n— Nadia`,
        `Tiffany's belly sways when she walks now, her ass has a clear jiggle with every step, and her already large breasts have become even heavier and more pendulous, resting noticeably lower on her softening torso.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with pleasure. I need her to keep swelling.`,
        `Tiffany's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become larger and heavier.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with pleasure. I need her to keep swelling.`,
      ],
      [
        `Tiffany looks much plusher now. Her figure has widened with a big soft belly, thick spreading thighs, and heavy breasts that sway when she moves.\n\nAfter feeding I pulled her on top of me. Her belly squashed warmly down onto my heavy gut, fat melding together as I held her close. I buried my face completely in her massive tits, motorboating and licking while squeezing her fat ass. She gasped and clutched at my rolls. The contrast between the party sorority girl she was and how jiggly she's becoming turns me on so much. I kept her pressed against me for a long time.\n\n— Nadia`,
        `Tiffany's figure has widened dramatically, with a big soft belly that pushes out proudly, thick spreading thighs that rub constantly, and heavy breasts that sway and bounce with even the smallest movement she makes.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier.`,
        `Tiffany's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with movement.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier.`,
      ],
      [
        `Tiffany moves slower these days. Her belly sways when she walks, her thighs rub constantly, and her breasts have grown truly massive.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her enormous tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing hard, laughing breathlessly about missing a party. Feeling this much of her soft weight against my own heavy body is heaven.\n\n— Nadia`,
        `Tiffany moves much slower now, her whole body rippling and swaying with every step, her belly hanging lower and more prominently while her once perky topheavy assets have grown truly massive and heavy.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings pure bliss. Her expansion has become my main source of pleasure.`,
        `Tiffany moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings pure bliss. Her expansion has become my main source of pleasure.`,
      ],
      [
        `Tiffany's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her gigantic tits and rubbed my thick thighs against hers. She moaned softly into my cleavage. The once topheavy sorority girl is disappearing under all this softness, and I love every second of it.\n\n— Nadia`,
        `Tiffany has rolls forming on her sides, a heavy hanging belly that sways noticeably, and breasts that rest heavily on top of her gut, making her whole body look incredibly lush and full.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing. This is exactly why I picked her — to live through her gains while I remain like this.`,
        `Tiffany has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing. This is exactly why I picked her — to live through her gains while I remain like this.`,
      ],
      [
        `Tiffany is very fat now. She waddles, everything on her jiggles heavily, and she gets out of breath easily.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her enormous sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me drives me crazy. She still tries to talk about sorority events, which makes it even hotter.\n\n— Nadia`,
        `Tiffany waddles heavily now, every part of her jiggling and swaying with each movement, her topheavy assets now truly enormous and impossible to ignore as they bounce and rest on her growing belly.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust. I told her how proud I am and how much bigger I still want her.`,
        `Tiffany waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust. I told her how proud I am and how much bigger I still want her.`,
      ],
      [
        `Tiffany looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits in her old tight tops anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. I'm completely lost in how massive she's becoming.\n\n— Nadia`,
        `Tiffany's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore, her once attention-grabbing topheavy figure now completely overwhelmed by all the new softness and size.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect. I groped every roll, lost in the sensation of her growth.`,
        `Tiffany's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now feels perfect. I groped every roll, lost in the sensation of her growth.`,
      ],
      [
        `Tiffany has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. The feeling of her size against me is pure bliss. Her old sorority life feels so far away now.\n\n— Nadia`,
        `Tiffany has become a massive waddling mountain of soft fat, belly hanging low and heavy while her breasts rest massively on top of it, every movement sending ripples across her entire body.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown drives me wild. I still crave even more of her.`,
        `Tiffany has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown drives me wild. I still crave even more of her.`,
      ],
      [
        `Tiffany has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The bubbly, topheavy sorority girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her brought right beside me so our enormous blob bodies could press together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies melted against one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Tiffany has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The bubbly, topheavy sorority girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spilling as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded together. I felt every inch of her massive form pressing and jiggling against mine. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.`,
        `Tiffany has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The bubbly, topheavy sorority girl I started with is gone, replaced by this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spilling as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded together. I felt every inch of her massive form pressing and jiggling against mine. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.`,
      ],
    ],
  },
  quiet:        { intro:`[placeholder: Nadia intro — why she chose the quiet student]`,               entries:_np('quiet')        },
  gamer: {
    intro:[
      `Study Log: Subject Selection – Destiny\n\nI picked Destiny for this project because she's the ultimate gamer girl — lazy, sarcastic, always glued to her chair, and she already has that nice apple-shaped body that carries weight straight into her belly. Perfect for clear, measurable results. I'm already pretty heavy myself, soft and voluptuous, but I'm still telling myself I can stay objective. This is important research. I need solid data on how feederism affects the mind. She's going to get a lot fatter. It's only right for the study.`,
      `Study Log: Subject Selection – Destiny\n\nI chose Destiny because her lazy gamer lifestyle and natural apple-shaped body make her the perfect canvas. She has no idea how much I need this. I'm enormous now, my body a vast, heavy, overflowing mass that makes even simple movement difficult. The "study" has become mostly a front. I'm obsessed with watching her grow. That small round belly of hers is going to turn into something massive and obscene. I get excited just thinking about it. She's going to swell up so much fatter for me.`,
      `Study Log: Subject Selection – Destiny\n\nI chose Destiny because she was the perfect lazy gamer with that soft apple-shaped body just waiting to be destroyed. At this point the study is mostly a front. I already know everything I need to know about feederism — my own massive, immobile body is living proof. Growing any bigger myself feels almost impossible now. Everything is so heavy and exhausting. So I need her to grow in my place. I want to watch every single pound settle into that belly. I want to live through her. I need to see her become completely ruined while I lie here.`,
    ],
    entries:[
      [`Destiny's barely showing any progress yet. Just a small, tight roundness under her hoodie when she sits. I expected more from someone who barely moves. I sit across from her, my own heavy breasts resting on my soft belly, and feel a flicker of impatience. She keeps complaining and acting like this is temporary. I gently push more snacks toward her, keeping my voice calm and professional. She needs to gain faster. The data will be far more useful once she has a proper belly. I'm only thinking scientifically… at least that's what I keep repeating to myself.`,`She's still so small… that tiny little bulge under her hoodie barely counts. It frustrates me. I'm sitting here enormous, barely able to lean forward, and she's hardly gained anything. I push tray after tray toward her, my voice low and commanding. "Eat. You need to get fatter." I can feel myself getting wet just imagining what her apple belly will look like when it's huge. She has to grow faster. I need it.`,`She's still so small… it's almost painful to watch. I lie here like a helpless mountain of fat, barely able to move, and all I can think about is how much she needs to swell. That tiny round belly of hers looks pathetic right now. I beg the assistants to keep bringing her food, my voice weak but desperate. She has to start gaining faster. I need to see her grow. I need it so badly.`],
      [`Her belly is starting to form a soft little dome that rests against her desk now. It's cute, but still nowhere near enough. I find myself watching her more closely during feedings, noting every new inch. My own thick thighs press together as I bring her bigger portions. She still tries to resist sometimes, but I'm firm. This study requires real results. She should be getting fatter. I tell myself I'm being professional, but I can't deny the warm satisfaction I feel when I see her middle starting to push outward.`,`Her belly is finally starting to round out into a soft pooch, but it's still pathetic. I'm colossal and greedy, and this is nowhere near enough. I watch her intensely while feeding her, my massive body trembling with arousal. "More," I tell her firmly. "You're going to get so much fatter for me." I love how her apple shape is beginning to show, but I need that gut heavy and hanging. I won't be satisfied until she's properly ruined.`,`Her belly is finally starting to round out a little. It's something, but still not enough. I quiver with excitement every time they tell me she's eating more. My own enormous body feels so heavy and useless, but watching her slowly soften makes me wet. I whisper instructions to the assistants, demanding they push her harder. She needs to get much fatter. I'm living for every new inch on her apple gut.`],
      [`Destiny's belly is getting properly soft and jiggly now. It moves when she laughs at her games. Much better, but I'm still not satisfied. I linger longer when feeding her, my heavy body feeling warmer than usual. She complains less but still acts like she might stop. I gently insist she finish every plate. A gamer like her should be much softer by now. The study demands it. I'm starting to enjoy the way her apple gut swells under my care. I need to stay objective… but it's getting harder.`,`That's better — her belly is getting soft and jiggly now. I moan quietly as I feed her, my enormous breasts heaving. But I'm still not happy. I need so much more. I press my hands into her middle, feeling the new softness. "Keep eating, Destiny. You're supposed to be my fat little gamer pig." My own colossal size makes me desperate to see her catch up. The hunger I feel for her gain is overwhelming.`,`That's it… her belly is getting soft and jiggly now. I moan softly in my bed as they describe it to me. I can't move much anymore, but my mind is completely focused on her. I need her to keep going. I tell them to double the shakes and bring richer food. She's going to get so much bigger for me. Her growth is the only thing that matters anymore.`],
      [`Her apple belly is finally rounding out nicely, heavy and jiggly when she shifts in her chair. I feel a rush of pride mixed with frustration. She's still not gaining fast enough for my liking. I bring extra pizzas and watch intently as she eats, my own soft belly pressing against the table. She needs to get much fatter. It's only right for the research. I catch myself rubbing my own curves while feeding her, telling myself it's just data comparison. The truth is I'm starting to love this more than I should.`,`Her apple belly is properly chubby now, round and heavy in her lap. I love it… but I need more. I spend long sessions feeding her, my own huge body quivering with excitement. I whisper filthy encouragement while she eats, telling her how good she looks getting fatter. I'm obsessed. I want that gut massive. I want her struggling to reach her keyboard. She's going to get so much bigger for me.`,`Her belly is getting properly heavy and round. I love it. I tremble with pleasure while they feed her in front of me. My own colossal body is trapped in fat, but hers is finally starting to bloom the way I need. I urge her on with a breathy voice, telling her how good she looks with a bigger gut. Keep eating. Get fatter. I need this so much.`],
      [`Destiny's belly has grown into a big, round, heavy ball that dominates her lap. It's beautiful. I feel genuine pleasure watching it swell after every meal. My own voluptuous body feels hot as I feed her larger and richer portions. She barely resists anymore. Good. She still has so much room to grow. I need her fatter. The study isn't complete until she's properly obese. I'm trying to keep my notes clinical, but my hands linger on her gut longer each time. This is becoming addictive.`,`Yes… her plump apple belly is finally spreading across her lap. I'm rock hard with arousal every time I see it. I feed her bigger portions than ever, moaning softly as I watch her swell. "That's it, get fatter. You look so much better this way." My colossal body feels electric. I need her enormous. I need her helpless. This "study" is nothing but my excuse to turn her into a bloated mess.`,`Yes… her belly is becoming so plump and dominant. I can barely contain my excitement. I lie here panting as I watch her eat, my massive form quivering. She still has so much more room to grow and I'm going to make sure she fills it. "More," I whisper hoarsely. "You're going to get so much fatter for me." This is everything I crave.`],
      [`She's finally heavy, that apple belly resting thick and full on her thighs. I feel a deep satisfaction every time I see her now. I'm quite heavy myself, but feeding her is becoming the highlight of my day. I push her harder, encouraging her to keep eating even when she's full. She needs to keep going. For the research. For me. I'm starting to get wet while watching her belly expand. I still write proper notes, but my thoughts are getting less professional.`,`She's heavy now, that big round gut resting thick on her thighs. I'm completely addicted. I can barely move my own enormous body, but I live for these feeding sessions. I rub her heavy belly while she eats, whispering how proud I am of her growth. She needs to keep going. I want her so much fatter. The pleasure I get from watching her apple shape explode is better than anything.`,`Her belly is heavy now, resting thick on her thighs. I'm completely addicted to the sight. Every feeding session leaves me moaning helplessly in my immobility. I live through her now. I beg them to stuff her past her limits while I rub what little I can reach of my own blubber. She needs to keep swelling. I need to see her get enormous.`],
      [`Destiny's belly is fat now — big, round, and constantly jiggling. I love how it looks on her. I spend longer feeding sessions, my own heavy breasts heaving as I get excited. She's turning into exactly what I wanted. I moan softly when she begs for more, telling her she's doing so well for the study. I need her even fatter. My own size feels secondary compared to my hunger to see her grow. The science is slipping, but the pleasure is rising.`,`Fuck, her fat apple belly is gorgeous. So round and heavy, constantly jiggling. I'm losing myself in this. I feed her for hours, my colossal form shaking with lust as I watch her grow. "More. Keep stuffing that gut for me." I don't even pretend to care about the research anymore. I just want her fatter. Bigger. More ruined. She's becoming everything I crave.`,`Fuck… her belly is so fat and round now. I'm losing my mind with lust. I can barely speak between moans as I watch her grow heavier. My own body is useless, but hers is becoming perfect. I demand they keep feeding her constantly. "Bigger," I gasp. "Make her so much bigger." This is my real purpose now.`],
      [`She's very fat and it suits her so well. That massive apple gut spreads wide across her lap. I'm addicted to feeding her now. I bring huge amounts of food and watch with hungry eyes as she swells. My own soft, heavy body trembles with arousal while I rub her belly. She needs to keep growing. The study is the excuse I use, but I just want to see her get enormous. I'm losing control and I don't care anymore.`,`She's very fat and I can't get enough. That massive belly spreads so wide now. I moan loudly while feeding her, my own enormous body hypersensitive with arousal. I press deep into her soft fat, encouraging her to eat past her limits. She's going to get enormous. I need to see her completely broken by her own size. This obsession owns me now.`,`She's very fat and it looks incredible on her. That huge apple gut is finally starting to match what I need. I tremble and drool with pleasure while they feed her. I'm so immobile that I can only watch and beg for more. Keep stuffing her. I want her completely ruined. Her growth is the only thing that makes me feel alive.`],
      [`Destiny is enormous. Her belly is a huge, heavy, overflowing dome. I'm completely obsessed with it. I feed her for hours, moaning quietly as I watch her grow bigger. My own voluptuous body feels electric every time I see how massive she's becoming. She's perfect. I need her even larger. The research notes have become secondary to my desire. I just want to keep stuffing her until she can't move.`,`Destiny is enormous… her belly a huge, sagging, overflowing dome. I'm in heaven. I feed her constantly, my voice thick with lust as I tell her how perfect she looks. My colossal body barely moves, but my mind is consumed with making her even bigger. I want her helpless. I want her ruined. She's my masterpiece.`,`She's enormous now… that belly is a massive, overflowing dome. I'm in pure ecstasy. I lie here like a helpless blob, moaning constantly as I watch her swell bigger. Nothing else matters. I urge them to push her even further. I need her to outgrow me. I need to see her become totally helpless and broken by her own fat.`],
      [`She's colossal now. That apple belly is monstrous and I can't get enough. I spend almost all my time feeding her, my hands sinking into her fat while I whisper encouragement. I'm so turned on by her size. She has to get even bigger. I don't care about the study anymore. I just need to see her completely ruined by fat. My own heavy body barely matters next to this obsession.`,`She's colossal now. That apple belly is monstrous and I'm addicted to every inch. I have assistants help me reach her so I can keep feeding her, moaning desperately as I watch her grow. "Bigger. You have to get even bigger." My own immense size doesn't matter — all I care about is turning her into an even fatter, more helpless blob.`,`She's colossal… her apple belly is monstrous and beautiful. I can hardly breathe through my arousal. My own immobile body shakes as they feed her in front of me. I whisper desperate commands, begging them to make her fatter. This is what I live for now — watching her disappear under layers of soft, heavy fat. More. Always more.`],
      [`Destiny is a total blob now — completely immobile with that obscene, overflowing apple belly pinning her down. I'm so proud and so aroused. I sit beside her for hours, feeding her constantly, my own heavy body trembling with pleasure as I watch her grow. She's everything I wanted and more. I live for these moments, stuffing her fuller, rubbing her immense gut, listening to her moan. The study was just an excuse. This is what I truly needed — turning her into my perfect fat pig. I never want this to end.`,`Destiny is a complete immobile blob, just like I wanted. Her once-cute apple body is now nothing but an enormous, overflowing sea of fat that pins her helplessly. I lie here colossal and trembling with overwhelming pleasure as I watch her get fed. I moan constantly, begging the assistants to keep stuffing her more. She's perfect. My beautiful, ruined gamer pig. I live for this — for every extra pound on her massive gut, every helpless moan she makes. The study was never real. This is what I needed. I want her even fatter. Even more broken. I never want this to end.`,`Destiny is a complete immobile blob now, just like I dreamed. Her once-cute gamer body has been utterly destroyed — nothing but an enormous, overflowing sea of soft fat with that obscene apple belly pinning her down completely. I lie here beside her, a massive helpless blob myself, moaning with overwhelming pleasure as I watch her get fed. Every bite, every new pound, every helpless whimper she makes sends waves of ecstasy through me. I can't move, but I don't need to. She's growing for both of us. I live vicariously through her ruin, begging the assistants to keep stuffing her without mercy. I want her even fatter, even more broken, even more addicted. This is perfection. My beautiful, ruined, greedy little pig. I never want this to end. Her growth is my everything.`],
    ],
  },
  transfer:     { intro:`[placeholder: Nadia intro — why she chose the transfer student]`,            entries:_np('transfer')     },
  nursing:      { intro:`[placeholder: Nadia intro — why she chose the nursing student]`,             entries:_np('nursing')      },
  farm_girl: {
    intro:[
      `Study Log: Subject Selection – Mary Jane\n\nI chose Mary Jane because she's a perfect farm-girl type — hardworking, nurturing, with a naturally voluptuous body that's already built for gaining. Her country personality and strong work ethic should create fascinating internal conflict as she softens. I'm already quite heavy myself, soft and voluptuous, but I'm determined to keep this professional. This research on feederism needs strong data, and Mary Jane's body will show clear, beautiful changes. She's going to get a lot fatter. It's only right for the integrity of the study.`,
      `Study Log: Subject Selection – Mary Jane\n\nI chose Mary Jane because she's a natural voluptuous farm girl with that strong, nurturing personality and a body built for abundance. She has no idea how badly I need to see her ruined. I'm enormous now, my own body a vast, heavy, overflowing mass that makes moving a struggle. The study is mostly an excuse at this point. I'm obsessed with turning her into an even fatter, softer version of herself. I want to feel her voluptuous body swell and press against mine. She's going to get so much bigger for me.`,
      `Study Log: Subject Selection – Mary Jane\n\nI chose Mary Jane because she was the perfect voluptuous farm girl — strong, nurturing, and built to carry a lot of weight. The study is basically a front now. I already know everything there is to know about feederism. My own massive, helpless blob of a body is all the proof I need. Growing any bigger myself feels nearly impossible. Everything is too heavy. So I need her to grow in my place. I want to watch every pound settle into her soft curves. I want to feel her fatten against me while I lie here. I need this so badly.`,
    ],
    entries:[
      [
        `Mary Jane has barely gained anything yet. Just the tiniest bit of new softness on her belly and hips. I expected more. I lean in close while feeding her, my heavy breasts pressing against her arm, and feel a flicker of impatience. She still talks about staying strong for farm work. I push bigger portions toward her, my soft belly brushing against her side. She needs to swell much more. The study requires it. I tell myself I'm only being scientific, but I already enjoy the warmth of our bodies touching.`,
        `She's still barely soft. Just the smallest new curve on her belly and hips. It frustrates me. I lean my enormous body over her, my massive breasts smothering her chest as I push food into her mouth. My huge belly squishes heavily against her thinner one. She needs to grow faster. I whisper commands, telling her to eat more while my fat sinks into her. I'm already aching to feel her body yield and fatten beneath me.`,
        `She's still so small compared to what I need. I lie here like a useless mountain of fat, barely able to twitch, and beg the assistants to feed her more. I can feel my own enormous body trembling with frustration. When they bring her close, I press my face weakly into her chest, desperate for contact. She needs to start swelling faster. I need to feel her body growing against mine.`,
      ],
      [
        `Her hips and thighs are starting to thicken, and there's a nice new roundness on her belly. I sit right beside her during feedings now, my thick thigh squishing against hers as I bring tray after tray. My heavy breasts rest on my own belly while I watch her eat. She still resists sometimes. I gently insist, letting my soft side press into her. The contact feels good. She needs to get so much fatter. I'm starting to crave the moment when our growing bodies will squish together more.`,
        `Her thighs are thickening and that belly is starting to round. Better, but not enough. I press my colossal form against her, letting my heavy belly completely cover her lap as I feed her. My enormous tits rest on her shoulders while I urge her to keep eating. The feeling of my fat overwhelming her smaller body turns me on so much. She has to get fatter. I need to feel her swelling against me.`,
        `Her hips and belly are finally starting to soften. It's not enough, but it's something. I moan softly as they push her against me, letting my massive belly squash heavily into her smaller one. I bury my face between her breasts, breathing her in while they feed her. I whisper for them to give her more. I need her to get so much fatter. Her growth is the only thing that makes me feel alive anymore.`,
      ],
      [
        `Mary Jane's body is finally getting properly soft. Her breasts are heavier, her thighs rub when she walks, and her belly has a warm, gentle curve. I pull her closer while feeding her, burying my face briefly between her softening tits as I encourage her to take another bite. My own heavy belly presses firmly into her side. She's melting so nicely. I need her much fatter. The study demands it. The feeling of our fat pressing together is becoming addictive.`,
        `Her body is finally getting soft all over. Her breasts are heavier, her thighs plush. I moan as I bury my face deep between her tits, my own enormous belly squashing firmly into hers. I feed her without pause, feeling her soften under my weight. She still tries to act like a strong farm girl sometimes. Cute. I need her so much fatter. The way our bodies press and mold together is becoming my obsession.`,
        `Her body is getting properly soft now. Her breasts feel heavier, her thighs thicker. I tremble with pleasure as our bodies press together, my enormous gut rolling over hers. I keep my face buried deep in her warm cleavage while they spoon food into her mouth. I beg them to keep going. She needs to swell bigger. I live for every new inch of softness I feel forming against me.`,
      ],
      [
        `Her belly is rounding out heavily now, and those wide hips are spreading beautifully. I love sitting with her, our soft bellies squishing together as I feed her. My massive breasts rest on top of my own gut while I rub her side. She moans quietly sometimes. I push her harder, telling her she looks better with more weight. I need her so much fatter. The way our voluptuous bodies press and mold against each other during feedings is starting to drive me wild.`,
        `Her belly is rounding out heavily now and those wide hips are spreading. I love it. I straddle her leg with my colossal weight, our soft bellies squishing and rolling against each other as I spoon rich food into her mouth. I keep my face buried in her warm, growing cleavage, moaning softly. She needs to get much fatter. I crave the day when her body is just as massive as mine.`,
        `Her belly is rounding out heavily and those wide hips are spreading so nicely. I moan helplessly as they hold her close, our fat bodies squishing and sinking into each other. I nuzzle and kiss her heavy breasts, lost in the feeling. She still tries to act like a strong farm girl sometimes. I need her to let go completely. I need her so much fatter against me.`,
      ],
      [
        `Mary Jane looks so plump and fertile these days. Her heavy breasts and thick thighs make my mouth water. I straddle one of her legs while feeding her, letting my big soft belly squash against hers as I spoon more food into her mouth. She's breathing heavier now. I bury my face in her warm cleavage between bites, feeling her body yield under mine. She needs to keep growing. I'm getting wetter every time our fat bodies squeeze together.`,
        `Mary Jane looks so plump and fertile. Her heavy breasts and thick thighs drive me wild. I press my enormous body fully on top of her, our bellies squashing deeply together while I feed her. My massive tits spill over her chest as I whisper how good she looks getting fatter. The sensation of her body yielding and expanding under mine is addictive. I need her enormous.`,
        `She's getting so plump and fertile. Her thick thighs and heavy breasts make me ache. I press as much of my immobile blob against her as I can, our bellies squashing warmly together while they feed her. I bury my face completely between her tits, moaning with every bite she takes. She has to keep growing. Her expansion against my helpless body is everything I crave.`,
      ],
      [
        `She's getting so heavy, and the feeling is incredible. I press my entire soft, heavy front against her while feeding her, our bellies squishing warmly together. My massive breasts spill over onto her chest as I whisper encouragement. She's becoming such a good girl for me. I need her even fatter. The study is just an excuse now — I live for these moments when our voluptuous bodies sink and mold into each other.`,
        `She's getting heavy and it feels incredible. I smother her with my colossal form, our fat bellies squeezing tightly as I feed her bigger portions. I bury my face between her soft, heavy breasts, moaning while she eats. She's becoming such a good, greedy girl. I need her so much fatter. The way our voluptuous bodies sink and jiggle together makes me tremble with lust.`,
        `Her body feels so heavy now. I love it. I lie here panting as our massive soft forms squeeze together, my enormous belly smothering her lap. I keep my face buried in her warm, growing chest, whispering desperate encouragement. Every new pound she gains sends pleasure through my useless body. I need her even fatter. I need to feel her completely overwhelm me with softness.`,
      ],
      [
        `Mary Jane is getting properly fat and it looks amazing on her. I moan softly as I lean over her, burying my face deep between her huge tits while my own heavy belly smothers her lap. I feed her without stopping, feeling her body grow softer under me. She's turning into my perfect plump farm girl. I need her so much fatter. The way our fat presses and jiggles together is pure heaven.`,
        `She's properly fat now and I'm completely hooked. I lie half on top of her, my enormous belly smothering her lap while my huge tits cover her chest. I feed her constantly, kissing and nuzzling her neck between bites. Our fat rolls and presses together so warmly. I need her even bigger. The study doesn't matter anymore — I just want to feel her grow fatter beneath me every day.`,
        `She's properly fat and it's driving me insane. I moan loudly as our bodies merge, fat rolling and folding over each other while they feed her. My face stays buried deep between her enormous tits. I can feel her getting heavier against me and it makes me shake with lust. She needs to get enormous. I live only through her growth now.`,
      ],
      [
        `She's very fat now and I can't get enough. I spend hours pressed against her, our massive bellies squishing and rolling over each other as I feed her. I bury my face in her enormous breasts, moaning while she eats. My own soft body trembles with arousal. She needs to get enormous. I barely remember the study anymore — I just want to feel her growing fatter against me.`,
        `She's very fat and looks absolutely perfect. I can barely contain myself. I press my colossal body against hers, our massive bellies squishing and folding into each other as I feed her without mercy. I keep my face buried deep in her enormous tits, moaning loudly. She needs to get enormous. I live for the feeling of her body expanding and softening against mine.`,
        `She's very fat and looks so beautiful. I tremble constantly as our colossal bodies press together, bellies squishing heavily while I nuzzle desperately into her massive breasts. Every bite makes her softer against me. I beg them to keep stuffing her. I need her completely ruined. Her fattening body is the only pleasure I have left in this immobile prison.`,
      ],
      [
        `Mary Jane is enormous and I'm completely hooked. I lie half on top of her, my huge breasts and belly smothering her as I feed her constantly. Our fat bodies sink deeply into each other, warm and heavy. I kiss and nuzzle her neck between bites, whispering how perfect she is. I need her even bigger. Nothing else matters now except feeling her swell beneath me.`,
        `Mary Jane is enormous and I'm in heaven. I spend hours lying on her, our gigantic bellies squashing heavily together while I feed her. My massive breasts spill over her body as I whisper how ruined she's becoming. The way our fat merges and jiggles with every breath makes me delirious with pleasure. I need her even more massive. She's mine to fatten.`,
        `She's enormous now and I'm in pure bliss. I can barely move, but I press every inch of my blob-like body against hers, feeling our fat sink and roll together. I keep my face buried in her gigantic tits, moaning weakly as they feed her more. She has to get even bigger. I need her to outgrow me. I need to disappear under her softness.`,
      ],
      [
        `She's colossal and the sight makes me ache with lust. I press as much of my heavy body against her as I can, our bellies squashing together tightly while I feed her. My face stays buried in her massive tits most of the time. She's becoming so helpless and huge. I need her completely ruined. The feeling of our fat bodies merging like this is everything to me now.`,
        `She's colossal now and it's driving me insane with lust. I can barely move my own enormous body, but I press as much of myself against her as possible, our overflowing bellies rolling and squeezing together. I bury my face in her gigantic tits, moaning desperately while feeding her. She has to get even fatter. I need her completely helpless and broken.`,
        `She's colossal and it's perfect. I lie here helpless as our overflowing bodies squash together, my massive form smothered by her growing size. I nuzzle desperately between her enormous breasts while they keep feeding her. Every new pound makes me whimper with joy. She has to become completely immobile. I need her ruined beyond anything.`,
      ],
      [
        `Mary Jane is a complete immobile blob now, and I've never been more satisfied. Her once-strong farm-girl body has been utterly transformed into an enormous, overflowing sea of soft fat. Her gigantic breasts rest like heavy sacks on her vast belly, while her wide hips and thighs have merged into a helpless mountain of blubber. I spend every day pressed tightly against her, our massive bodies squishing and sinking deeply into one another. I bury my face between her enormous tits, moaning as I feed her without end, feeling her belly swell and push back against mine. The way our fat rolls over and molds together is pure bliss. She moans so sweetly now, completely addicted. The study was never the real goal. Turning this hardworking country girl into my perfect, greedy, immobile pig was. I never want this to end.`,
        `Mary Jane is a complete immobile blob now, and I've never felt more satisfied. Her voluptuous farm-girl body has been utterly destroyed into an endless sea of soft, heavy fat. Her gigantic breasts rest like warm sacks on her vast belly, while her hips and thighs have merged into a helpless mountain of blubber. I lie pressed tightly against her every day, our two colossal bodies squishing deeply into one another, bellies rolling and folding together, my face constantly buried between her enormous tits. I moan helplessly while assistants help me feed her, feeling her swell and push back against me with every bite. The sensation of our fat merging so completely is pure ecstasy. She whimpers and begs so sweetly now. The study was never real. I just wanted to turn this sweet country girl into my perfect, greedy, immobile fat pig. I never want this to end. Her growth against my body is everything.`,
        `Mary Jane is a complete immobile blob now, and I've never been happier. Her once hardworking farm-girl body has been utterly destroyed into an endless, overflowing sea of warm, heavy fat. Her gigantic breasts rest like massive warm pillows on her vast belly, while her hips and thighs have merged into a helpless mountain of blubber that pins her completely. I lie pressed tightly against her every single day, our two enormous blobs squishing and sinking deeply into one another, bellies rolling and folding together in heavy waves of softness. I keep my face constantly buried between her enormous tits, moaning weakly with overwhelming pleasure as the assistants feed her without end. Every bite she takes makes her swell and push back against me, sending shivers through my own useless, immobile body. I live completely through her now. Her growth, her helplessness, her greedy moans — they're all mine. The study was never real. I just needed to turn this sweet, strong country girl into my perfect, fat, addicted, immobile pig while I lie here trapped in my own blubber. This is everything. I never want this to end.`,
      ],
    ],
  },
  eced: {
    intro:[
      `Dear Journal,\n\nI've started my independent study on the psychology of feederism and I've chosen Daisy as my subject. She's the sweet Early Childhood Education major — always talking about teaching little kids, super nurturing and patient with this warm, motherly energy. She already has such a perfect mombod: wide hips, thick thighs, full heavy breasts, and a naturally soft belly that strains gently against her clothes. She's curvy and huggable but still relatively slim overall. There's something so arousing about the idea of taking a girl who already looks like a young mom and making her even softer, heavier, and more maternal. I want to see her body swell until that mombod becomes overwhelming. My own heavy belly and thick rolls rest on my lap as I write this. I can't wait to press my fat against hers and feel her soften and grow for me.\n\n— Nadia`,
      `Dear Journal,\n\nI'm starting my independent study on the psychology of feederism with Daisy as the subject. She's the sweet Early Childhood Education major, always so nurturing and patient, with that warm, motherly presence. She has a naturally curvy build — wide hips, thick thighs, full heavy breasts, and a soft belly that already looks so inviting. She's still relatively slim overall, but I can't stop thinking about how perfect she'd be if she got much bigger. My own colossal body spreads heavily across the bed as I write this, rolls everywhere, belly hanging in thick layers. I'm already obsessed. This study is the perfect excuse to make her swell and soften until she's truly enormous. I need to feel her growing curves press and squish against mine. I want her heavier than I ever managed to become.\n\n— Nadia`,
      `Dear Journal,\n\nI'm beginning my official research study on the psychology of feederism with Daisy as the subject. She's the sweet Early Childhood Education major, always radiating that warm, nurturing, motherly energy, patient and caring with everyone around her. She already has such a naturally curvy build — wide hips, thick thighs, full heavy breasts, and a soft belly. She's still relatively slim overall, but I know what she needs to become. This study is mostly a front now. I already understand feederism completely through my own body — an immobile, overflowing blob of fat that spreads across my reinforced bed in every direction, rolls cascading endlessly, my belly so vast it completely pins me down and smothers everything. Growing any more myself feels nearly impossible, so I will live vicariously through her. I'm going to turn this sweet, nurturing girl into something truly enormous until her fat can slap and press against every inch of mine. I can't wait.\n\n— Nadia`,
    ],
    entries:[
      [
        `Daisy came by tonight still looking like her usual sweet self with that soft mombod. Her full breasts and wide hips looked so inviting under her cozy sweater. I kept the feeding gentle but steady — big plates of pasta, garlic bread, and creamy desserts. By the end her belly was nicely rounded and tight.\n\nWhen I hugged her goodbye, my heavy soft gut squished firmly into her softer middle. The contrast felt amazing. I pressed my massive tits against her already full chest, smothering her slightly while holding her close. She giggled nervously but hugged me back. Feeling her natural curves against my fat made me so excited for how much more of her there will be soon. I love that she already has that maternal softness — I just want to enhance it.\n\n— Nadia`,
        `Daisy came over tonight still looking too slim for my liking. Her full breasts and wide hips are nice, but she needs so much more softness. I fed her without mercy — huge plates of pasta, bread, shakes, and cake until her belly was painfully bloated and she was groaning.\n\nAfterwards I pulled her tightly against my colossal body. My enormous belly completely swallowed her softer middle, heavy fat rolling over and smothering her. I shoved her face deep between my massive tits and held her there while I rubbed her overstuffed stomach. Feeling how small she still is only makes me more determined. She has to grow faster. I whispered how good she'll look when there's so much more of her pressing back against me. I'm already soaked just thinking about it.`,
        `Daisy came by tonight still looking far too slim. Her full breasts and wide hips are lovely, but she needs so much more. I fed her heavily from my bed, guiding her to eat huge portions without stopping until her belly was painfully swollen and she was breathing hard.\n\nI had her climb onto the bed and sink into my enormous blob. My vast belly rose like a mountain beside her as I pulled her close, letting her smaller frame disappear into my warm, heavy fat. I buried her face deep between my gigantic pillowy tits, smothering her while I rubbed her bloated stomach with what little movement I have left. Feeling how small she still is against me intensifies everything. She has to grow much bigger for both of us. I whispered how incredible it will feel when there's so much more of her pressing and slapping against my body. I'm experiencing this all through her now.`,
      ],
      [
        `Daisy returned today. Her belly is staying fuller longer after our sessions and her thick thighs rub together a little more. That sweet mombod is starting to look even cushier.\n\nAfter feeding her extra helpings until she was content and full, I pulled her into a long hug. My fat belly molded heavily over hers, warm and possessive, while I buried my face between her full breasts. They felt so pillowy already. I rubbed her back and whispered how good she was doing for the study. The thought of turning her natural mombod even softer and heavier against my own body is getting me wet. She has this innocent, caring vibe that makes corrupting her feel extra delicious.\n\n— Nadia`,
        `Daisy's belly is staying fuller longer now, and her thighs rub together more when she walks. That sweet, curvy figure is finally starting to yield.\n\nI kept her here longer tonight. I laid her on top of me so our bodies could press together. My huge gut molded heavily over hers, warm and possessive, while I buried my face between her full breasts. They felt even softer already. I groped her thickening ass and thighs, squeezing the new plushness. She let out those gentle, caring sounds that drive me crazy. I told her how right this feels. My obsession is growing stronger every session — I need her to outgrow what I am.`,
        `Daisy's stomach stays rounded and full for hours after feeding, and her thighs brush together more noticeably. That sweet, curvy figure is finally starting to soften.\n\nI kept her longer tonight. I made her lie on top of my massive blob, her body sinking deep into my endless fat. Our bellies pressed together — hers newly plush, mine an overwhelming heavy mass that dominated her completely. I held her head down between my enormous tits, surrounding her face in warm sweaty cleavage while I groped her thickening ass and thighs. She whimpered softly in that caring way of hers. The contrast feels so good, but I need so much more. Every new pound on her brings me intense pleasure and a hint of envy. I'm already imagining how it will feel when she starts to outgrow me.`,
      ],
      [
        `Daisy is softening up nicely. Her belly now has a constant plush roundness, her hips look wider, and her breasts seem even heavier.\n\nI had her sit on my lap tonight. My thick heavy gut rested right on top of her softer middle, squishing and spreading over her in the most satisfying way. I wrapped my arms around her and buried my face deep between her swelling tits, feeling them pillow against my cheeks while I rubbed her full belly. She let out soft, motherly little sighs that turned me on so much. Having her already-curvy mombod starting to yield and press back against my fat feels incredible. I'm getting addicted.\n\n— Nadia`,
        `Daisy's waist has widened, her belly now has a constant soft roundness, and her breasts rest heavier on her middle.\n\nAfter feeding her until she was stuffed, I pulled her close on the bed. Our bellies squished together — hers warm and giving, mine an overwhelming heavy mass that rolled over her. I buried my face deep between her softening tits, motorboating and licking while I jiggled her thickening thighs. The way her body is softening against mine feels addictive. I love knowing I'm the one making her grow. Every new pound on her makes me wonder how much further she can go.`,
        `Daisy's waist has widened, her belly now carries a constant soft roundness, and her breasts sit heavier on her middle.\n\nAfter stuffing her until she was panting and full, I pulled her tightly against my blob form. Our bellies squished together — hers warm and yielding, mine a vast heavy wave that rolled over her. I buried my face deep into her swelling tits, motorboating and licking while grinding what I could against her. Every jiggle sends shivers through my immense body. I love feeling her expand against me. This is why I chose her — to watch this nurturing girl grow heavy in my place. There's already a spark of wonder in me as I think about how big she might become.`,
      ],
      [
        `Daisy's body has grown so much softer. Her belly sways gently when she walks, her ass jiggles more, and her heavy breasts rest noticeably on her middle.\n\nI fed her until she was groaning happily, then laid her against me on the bed. Our bellies pressed together — hers plush and full, mine heavy and sagging — rolling and squishing warmly. I shoved her face gently into my massive cleavage and held her there while I groped her widening hips and thickening thighs. She felt so comforting and maternal already. I love how her mombod is expanding and becoming even more huggable against my own fat.\n\n— Nadia`,
        `Daisy's waist has widened, her belly now sways when she walks, and her breasts have become large and pendulous.\n\nI kept her pressed against me for hours. Our bellies rolled and folded over each other in thick waves of warm fat as I groped every new inch. I buried my face completely in her heavy tits, licking and motorboating them while grinding our lower bodies together. She gasped and clutched at my rolls. There's a strange envy growing in me — she might actually surpass my size one day. The thought fills me with wonder and arousal.`,
        `Daisy's belly sways when she walks now, her ass jiggles noticeably, and her breasts have become large and pendulous.\n\nI had her spend hours pressed against me. Our bellies slapped and folded over each other in thick waves of warm fat as I held her as tightly as I could. I shoved her face completely into my gigantic tits while I groped her new rolls and heavy thighs. She felt so good sinking into my mass. Since my own growth is almost nothing now, every new curve on her fills me with both pleasure and envy. I wonder if she'll eventually become even bigger than I am. The thought excites me more than I expected.`,
      ],
      [
        `Daisy looks properly plush these days. Her figure has widened with a big soft belly, thick spreading thighs, and heavy breasts that sway beautifully.\n\nAfter feeding I pulled her on top of me. Her belly squashed down onto my heavy gut, fat melding together as I held her close. I buried my face completely in her massive tits, motorboating and licking while squeezing her fat ass. She gasped and held me tighter in that sweet, nurturing way of hers. The way her enhanced mombod jiggles and presses against me is addictive. I kept her there a long time, enjoying every squish.\n\n— Nadia`,
        `Daisy's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with every movement.\n\nI had her climb on top of me after feeding. Her belly squashed down onto my colossal one, fat melding together as I wrapped my arms around her. I buried myself deep in her massive tits, moaning into them while squeezing her fat ass and sides. The way she jiggles against me is incredible. I kept her there a long time, whispering how perfect she feels getting heavier. I feel a pang of envy mixed with awe — she's pulling ahead of where I ever reached.`,
        `Daisy's figure has widened dramatically, with a big soft belly, thick spreading thighs, and heavy breasts that sway with every step.\n\nI made her climb on top of my enormous blob after feeding. Her belly squashed down onto my vast one, fat slapping and molding together as I wrapped my thick arms around her. I buried myself deep in her massive tits, licking and moaning into them while squeezing her fat ass and sides. The way she jiggles against me is addictive. I kept her there a long time, telling her how perfect she feels getting heavier. A deep envy is mixing with wonder — she's pulling ahead of where I ever reached.`,
      ],
      [
        `Daisy moves slower now. Her belly hangs and sways, her thighs rub constantly, and her breasts have grown truly massive.\n\nI kept her in bed with me, pressing our bodies together. Our bellies squished and spilled over each other in warm waves of fat. I buried my face deep between her enormous tits, licking the soft flesh while groping her sagging belly and wide hips. She was breathing heavily, sounding so motherly and overwhelmed. Feeling this much of her soft, heavy body against my own fat is heaven. I love what I'm turning her into.\n\n— Nadia`,
        `Daisy moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her fully against my colossal form. Our heavy bellies collided and spilled over each other in soft warm waves. I buried my face between her sagging tits, licking the soft flesh while groping her thickening rolls. Feeling how much more there is of her against my colossal size brings both pleasure and envy. She's becoming so massive while I stay stuck like this. It's wonderful and frustrating at the same time. I need her even bigger.`,
        `Daisy moves slower now, her whole body rippling and swaying, belly hanging lower with each visit.\n\nTonight I pulled her as close as possible. Our heavy bellies collided and slapped together in soft warm waves, fat spreading and pressing everywhere. I buried my face between her sagging tits, licking the sweaty flesh while groping her thickening rolls. Feeling how much more there is of her against my immense size brings both bliss and jealousy. She's becoming so massive while I stay stuck like this. It's wonderful and aching at the same time. I need her even bigger.`,
      ],
      [
        `Daisy's body has grown so fat and lush. She has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut.\n\nI had her lie beside me so I could roll partially over her. Our big fat bellies engulfed each other, warm and heavy. I smothered my face in her gigantic tits and rubbed my thick thighs against hers. She moaned softly, holding me like she was comforting me. The once-slim mombod is now so heavy and wonderful against my own. I'm completely obsessed.\n\n— Nadia`,
        `Daisy has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks now.\n\nI kept her in bed for ages, pressing our bodies together. Her big fat belly squished wonderfully under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies ground together. The warmth and heaviness of her body feels amazing, but I can't help feeling envious. She's growing beyond what I managed. It fills me with strange wonder and hunger.`,
        `Daisy has rolls on her sides, a heavy hanging belly, and breasts that rest on top of her gut. She waddles more than walks.\n\nI kept her in bed for ages. Her big fat belly slapped and squished under my colossal mass, folding and overflowing as we shifted. I buried my face deep into her gigantic sweaty tits, licking while our bellies pressed and rubbed together. The warmth and heaviness of her body feels amazing, but the envy is stronger now. She's growing beyond what I managed. It fills me with strange wonder and hunger.`,
      ],
      [
        `Daisy is very fat now. She waddles cutely, everything on her jiggles heavily, and she gets out of breath easily.\n\nAfter feeding her until she was stuffed I pulled her close for hours. Our massive bellies squished and folded together as I held her. I buried myself face-first in her enormous sweaty tits, licking while grinding our lower bodies. The way her fat spills and rolls against me drives me crazy. She still has that sweet, caring energy even as she gets heavier, which makes it hotter.\n\n— Nadia`,
        `Daisy waddles heavily now, every part of her jiggling and swaying with each visit.\n\nAfter feeding her until she was stuffed I rolled partially over her. Our massive bellies engulfed each other in heavy warm fat. I smothered my face in her enormous tits and rubbed my thick thighs against hers. The way her body yields and folds under mine drives me crazy with lust and envy. She's getting so much bigger than I ever did. I both love it and feel a deep longing.`,
        `Daisy waddles heavily now, every part of her jiggling and swaying with each movement.\n\nAfter feeding her until she was stuffed I had her lie beside me. I rolled what I could of my blob over her, our massive bellies engulfing and slapping against each other in heavy warm fat. I smothered my face in her enormous tits and rubbed against her spreading thighs. The way her body yields under mine drives me crazy with lust and envy. She's getting so much bigger than I ever did. I both love it and feel a deep longing.`,
      ],
      [
        `Daisy looks enormous. Her body is covered in heavy rolls and sagging fat. She barely fits comfortably in normal seats anymore.\n\nI made her press on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her. I buried my face deep between her gigantic breasts, moaning into them as our fat rolled and squished together. She felt so good covering me. I love how her mombod has become this massive, maternal landscape of softness.\n\n— Nadia`,
        `Daisy's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI made her press fully on top of me. Her enormous belly smothered mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now leaves me in awe and envy. She's outgrowing me so beautifully. I groped every roll, lost in the sensation.`,
        `Daisy's body is covered in heavy rolls and sagging fat. She barely fits comfortably anywhere anymore.\n\nI had her press fully on top of my blob. Her enormous belly slapped down onto mine in soft heavy warmth while I wrapped my arms around her wide sides. I buried my face deep between her gigantic breasts, moaning as our fat rolled and squished together. The sheer size of her now leaves me in awe and envy. She's outgrowing me so beautifully. I groped every roll, lost in the sensation.`,
      ],
      [
        `Daisy has grown colossal. She's a massive, waddling mountain of soft fat with a huge hanging belly and breasts resting heavily on it.\n\nWe spent a long time with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing every roll. The feeling of her size against me is pure bliss. Her nurturing personality mixed with all this fat is perfect.\n\n— Nadia`,
        `Daisy has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies folded and spilled over one another in thick waves. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch. Feeling how enormous she's grown fills me with wonder and jealousy. She's becoming what I always wanted to be. I still crave even more from her.`,
        `Daisy has become a massive waddling mountain of soft fat, belly hanging low and breasts resting heavily on top.\n\nWe spent hours with our bodies pressed together. Our colossal bellies slapped and folded over one another in thick waves of fat. I shoved her face into my massive tits while I groped her immense body, squeezing and jiggling every inch I could reach. Feeling how enormous she's grown fills me with wonder and jealousy. She's becoming what I always wanted to be. I still crave even more of her.`,
      ],
      [
        `Daisy has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The sweet, curvy mombod I started with has transformed into this perfect helpless mountain of maternal fat.\n\nI had her brought right beside me so our enormous blob bodies could press together completely. Our vast bellies squished and engulfed each other in endless warm heavy waves of fat, rolling and folding as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies melted against one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach, lost in pure ecstasy. This is everything I wanted when I chose her. She grew so beautifully for me.\n\n— Nadia`,
        `Daisy has finally become a true blob — completely immobile, an overflowing sea of soft fat spreading across the bed beside mine. She's enormous, with vast rolls cascading everywhere, a belly so huge it pins her down, and breasts like heavy pillows resting on top of her. The sweet, nurturing girl I chose has transformed into this perfect helpless mountain of fat.\n\nI had her positioned right against me so our enormous bodies could press together completely. Our vast bellies slapped and squished heavily against each other in endless warm waves of fat, rolling, folding, and spreading as we pushed as close as possible. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by soft sweaty flesh on all sides while our bodies molded and squished together. I felt every inch of her massive body — rolls pressing and jiggling against my own, bellies overwhelming one another. The sensation was overwhelming. I moaned loudly into her cleavage for what felt like hours, groping whatever I could reach. She has outgrown me so completely. It fills me with envy and pure wonder. This is everything I wanted when I chose her. She's perfect now.`,
        `Daisy has finally become a true blob — completely immobile like me, an overflowing sea of soft fat spreading across the bed right beside mine. She's enormous, with vast rolls cascading in every direction, a belly so huge and heavy it completely pins her down, and breasts like massive heavy pillows resting on top of her. The sweet, nurturing, caring girl I chose has been transformed into this perfect, helpless, overflowing mountain of fat, every inch of her soft and yielding.\n\nI had her positioned right against me so our enormous bodies could press together as closely as possible. Our vast bellies slapped heavily against each other in endless warm waves of fat, rolling, folding, spilling, and jiggling with every tiny shift. I felt every inch of her massive form — her thick rolls pressing and slapping into my own, her heavy breasts smothering against my chest, her wide hips and thighs spreading out and merging their softness with mine. The sensation was overwhelming and intoxicating. I buried my face as deep as I could into her gigantic pillowy tits, surrounded by warm, sweaty, endless flesh on all sides while our bodies molded and squished together. I licked and moaned loudly into her cleavage for what felt like hours, groping and squeezing whatever rolls and folds I could reach with my limited movement. Every slap of fat, every heavy press, every ripple that traveled through her body into mine sent waves of pleasure through me.\n\nShe has completely outgrown me. Where I stopped, she kept going, becoming this perfect immobile goddess of fat. The envy I feel is sharp and deep, yet it mixes with pure wonder and arousal. I chose her so I could experience this growth vicariously, and she has given me more than I ever dreamed. She's so much bigger, so much softer, so much more everything than I became. I moaned her name into her tits again and again, lost in the feeling of our colossal bodies slapping and pressing together. This is perfection. This is everything I wanted. She's perfect now.`,
      ],
    ],
  },
  culinary:     { intro:`[placeholder: Nadia intro — why she chose the culinary student]`,            entries:_np('culinary')     },
};

// ── RANKED FEEDEE SESSION MINI-GAME DATA ─────────────────────────────────────
export const SESSION_FOOD_ITEMS = [
  { id:"energy_drink", label:"Energy Drink",   icon:"⚡", gain:2,  focusRestore:28, fullnessCost:8  },
  { id:"chips",        label:"Bag of Chips",   icon:"🥔", gain:5,  focusRestore:12, fullnessCost:18 },
  { id:"ramen",        label:"Instant Ramen",  icon:"🍜", gain:9,  focusRestore:16, fullnessCost:28 },
  { id:"pizza",        label:"Pizza Slice",    icon:"🍕", gain:14, focusRestore:5,  fullnessCost:42 },
  { id:"full_order",   label:"Full Delivery",  icon:"📦", gain:24, focusRestore:22, fullnessCost:65 },
];

export const SESSION_NPC_LINES = {
  0:{ arrival:"Delivery.", exit:"Have a good session.", extra:null,
      desc:"New driver. Professional, quick, by the book." },
  1:{ arrival:"Order's here — got the item count wrong on a previous delivery, so these extras are on us.",
      exit:"Good luck with the game.", extra:"She leaves a dessert item. Unprompted.",
      desc:"She adds extras. Calls them mistakes. They are not." },
  2:{ arrival:"You were about to order, right? I was already heading over.",
      exit:"I'll be back when the queue runs.", extra:"She has the right snacks pre-staged.",
      desc:"She knows the schedule. She was already on her way." },
  3:{ arrival:"Hey. Lobby code still works.", exit:"I'll set up and get out of your way.", extra:null,
      desc:"She has the building code. She did not ask for it." },
  4:{ arrival:"Had a feeling you'd want this tonight.", exit:"I've got more in the car if the session runs.",
      extra:"She has the exact order Destiny was going to place.",
      desc:"She arrives before the order is placed." },
  5:{ arrival:"Hey.", exit:"I'm around.", extra:"She rearranges the desk slightly. Better now.",
      desc:"She's just here now. Sometimes with food. Always correct." },
};

// ── WIFE LESSONS: NPC stage descriptions ─────────────────────────────────────
// moms: 6 stages (0–5). daughters: 7 stages (0–6), referenced across stageIdx 0–5.
export const WIFE_LESSONS_NPCS = {
  Darlene:{ joinStage:0, bodyType:"Apple", daughter:"Emma",
    stages:[
      "Perpetual dieter. Soft apple belly she sucks in whenever she thinks anyone's watching. Has mentioned the diet twice since sitting down.",
      "The apple belly has stopped being sucked in — it just rounds forward now, soft and prominent under her shirt. She's stopped mentioning the diet.",
      "Properly round. Her belly is a full soft apple globe that she no longer tries to minimize. Elastic waistbands exclusively, which she describes as practical.",
      "Her midsection is the dominant feature — a wide, soft dome that shifts when she breathes. She carries it with the ease of someone who has stopped fighting something.",
      "Her belly is enormous and she's stopped noticing it in any conscious way. She eats with the appetite of a woman who has made peace with something and keeps going.",
      "Barely moves without effort. Her belly rests heavy and forward and warm. She is entirely comfortable with this. She is happy about it.",
    ],
    daughter_stages:[
      "Emma is 16. Slim, with a trace of belly softness when she sits. Her mother's predisposition.",
      "Emma's belly has softened noticeably, pressing her school skirt forward. Her appetite picked up. Darlene says she 'finally grew a stomach like a real girl.' Darlene has been adding butter to her school lunches for three weeks.",
      "Emma is properly soft. Her belly rounds full and warm, her thighs press together when she walks. Her sister Claire is catching up and Emma finds this unacceptable.",
      "Emma is fat. Her belly sits prominent and forward. She and Claire are in a competition neither of them named. Darlene is force-feeding Emma extra shakes to keep her ahead.",
      "Emma is very fat. Her belly is a big soft dome. Claire has surpassed her in belly size and Emma is devastated. Emma has doubled down on eating to close the gap.",
      "Emma can barely fit in her old school desk. She brings a wider chair. She's massive — soft, round, enormous. She's stopped worrying about Claire and is just focused on the next meal.",
      "Emma and Claire are both so fat their bellies sit on their laps like warm heavy pillows. They need reinforced chairs at school. Emma has stopped competing and started collaborating. They eat together constantly.",
    ],
    sister:{ name:"Claire", stages:[
      "Claire is 14. Slim. Emma's shadow.",
      "Claire has gained noticeably — soft belly, thighs beginning to press. Emma watches this with alarm.",
      "Claire is surprisingly close to Emma's size. Emma has escalated. Darlene is thrilled to have two daughters growing.",
      "Claire has surpassed Emma. Emma is devastated. Darlene is ferociously proud of both of them.",
      "Claire is enormous. New school uniform, custom. Emma refuses to share clothes. Both are massive.",
      "Claire and Emma are both fat beyond what the furniture was designed for. Both need reinforced chairs. Claire is still ahead by belly circumference. This is a source of great pride for Darlene.",
      "Both daughters barely leave the house. Their bellies are enormous. They sit on the wide sectional couch together and it takes them both.",
    ]}
  },
  Wanda:{ joinStage:0, bodyType:"Voluptuous", daughter:"Kezia",
    stages:[
      "Already completely comfortable with her full, voluptuous figure. Full hips, heavy chest, a soft belly she made peace with years ago. She came for the food and the company.",
      "More of everything, distributed beautifully. Wider hips, rounder belly, heavier chest. Entirely at ease with it.",
      "Genuinely fat, and still completely at peace. Her belly is full and warm and rolling. She sits wider. She moves slower. She smiles at this.",
      "Very fat and the group's unofficial ambassador for the lifestyle. Wide, warm, soft everywhere.",
      "Enormous. Can't quite move freely but has organized her life around this and finds it very comfortable.",
      "Barely mobile and triumphant. The house is set up around her. She's never been happier.",
    ],
    daughter_stages:[
      "Kezia is 17. Full hips, some natural softness, a good appetite. Already built like Wanda.",
      "Kezia's belly is soft and round. Hips wider. Wanda started adding cream and butter to everything she eats three weeks ago. Kezia says dinner 'got better.'",
      "Kezia is properly fat. Her belly is a full warm dome. She's the fastest-growing of all the daughters. Wanda is not subtle about her pride.",
      "Kezia is very fat. She had to move to the bigger bedroom because her old door frame was getting narrow for her hips. Wanda moved the furniture and documented the milestone.",
      "Kezia is enormous. Her belly is massive and round. She's started asking for bigger portions herself — Wanda says she 'finally got her appetite.' She rarely leaves the house.",
      "Kezia fills the entire sectional couch. Her belly reaches the coffee table when she sits. She is the group's benchmark. Every mother measures her daughter against Kezia.",
      "Kezia can barely move. Her bed frame cracked and was reinforced. She stays home. Wanda redecorated the big bedroom around her. Wanda visits her between sessions and brings food. Kezia is very happy. Wanda is enormously proud.",
    ]
  },
  Patrice:{ joinStage:1, bodyType:"Pear", daughter:"Taylor",
    stages:[
      "Sweet, tentative. Narrow waist, wide hips she minimizes with careful layering. Came because Darlene invited her.",
      "Her hips have spread further. Her waist has softened. She's stopped layering. She's started bringing her own containers home.",
      "Her lower half has spread dramatically — wide hips, full thighs, a soft belly settling above them. She's found clothes that fit and wears them without comment.",
      "Properly pear-shaped at scale. Enormous hips, wide thighs, a belly that rounds forward above them. She moves carefully through doorways.",
      "Massive hips and thighs, belly a full dome above. She moves slowly and with great deliberateness.",
      "Barely mobile. Enormous pear shape, belly and hips both massive. She comes to sessions because the kitchen is warm and nobody has asked her to be smaller since she started coming here.",
    ],
    daughter_stages:[
      "Taylor is 16. Slim, with wide hips and long legs — exactly like Patrice before all this.",
      "Taylor's hips have widened. Her thighs press together when she walks. Patrice has been putting extra butter in her school lunches for three weeks.",
      "Taylor is soft. Her hips are wide, her belly starts to round. She complained her jeans don't fit. Patrice bought new ones, two sizes larger, and hid the tags.",
      "Taylor is fat. Her hips spread wide, her belly rounds prominently. She cannot see her feet when she stands straight. Patrice is jealous of Kezia's lead and has been making Taylor extra shakes.",
      "Taylor can barely tie her own shoes — her belly blocks her reach when she bends. She asks Patrice to tie them. Patrice does it and orders her another meal.",
      "Taylor is very fat. Her hips are enormous, her belly massive and forward. She's the second-largest of the daughters. Her arms jiggle loudly when she eats and Patrice watches every time.",
      "Taylor barely fits in the family car. She needs a modified seat. She's enormous and round everywhere and still growing. Patrice watches her eat at every meal and doesn't miss a bite.",
    ]
  },
  Cheryl:{ joinStage:2, bodyType:"Mom bod", daughter:"Madison",
    stages:[
      "HOA rival. Soft middle, wide hips. Showed up because the other neighborhood women were going and she didn't want Darlene to have something she didn't.",
      "Rounder middle, wider hips. Still competitive about everything — including who's growing more.",
      "Properly fat. Still competes about everything. Has stopped pretending she's not fully participating.",
      "Very fat and competitive as ever. Her belly is a full dome and she wears it like a ranking.",
      "Enormous. Measures Madison weekly. Maintains a spreadsheet. Considers this normal household management.",
      "Barely mobile. Had the car passenger seat modified for Madison. Considers this normal home maintenance. Still maintains the spreadsheet.",
    ],
    daughter_stages:[
      "Madison is 17. Soft-figured with a round belly and her mother's competitive streak.",
      "Madison has gained noticeably. Belly rounds forward. Cheryl started adding lard to the cooking 'by accident.' She adds it deliberately.",
      "Madison is fat. Her belly presses her clothes forward. She tried to squeeze into her friend's car and her friends had to shuffle to make room.",
      "Madison is very fat. Her belly is a prominent soft dome. Her friends are growing too, but slowly; Madison takes up most of the back seat.",
      "Madison is enormous. Cheryl hired a seamstress for her school clothes. She measures Madison every Sunday and reports to the group chat.",
      "Madison barely fits in standard seating. The car's passenger side has been modified with a wider seat. Cheryl had this done professionally and considers it normal maintenance. The spreadsheet is very detailed.",
      "Madison is massive. She sits in the modified car seat and still overflows it slightly. Cheryl is ferociously proud and openly jealous of Kezia. She is pushing Madison harder than ever.",
    ]
  },
  Ruthanne:{ joinStage:3, bodyType:"Pear", daughter:"Lily",
    stages:[
      "Older, a little lonely. Wide hips she's carried her whole life. Walked by the kitchen, smelled the cooking, and MJ invited her in.",
      "Softer all over — her pear shape more pronounced, her belly rounding above the wide hips. She comes early and stays late.",
      "Properly fat. Enormous hips, thick thighs, a soft belly above them. She's become the group's warm steady presence.",
      "Very fat and completely committed. Moves through doorways carefully. Sideways, sometimes.",
      "Enormous and peaceful. The lessons have become the center of her week.",
      "Barely mobile. Her hips are vast, her belly rounds prominently above them. She is the warmest person in the room at any given time.",
    ],
    daughter_stages:[
      "Lily is 18. Slim with Ruthanne's wide hips already evident.",
      "Lily has softened — hips wider, belly starting to round. Ruthanne has been adding extra portions to her meals.",
      "Lily is soft and round. Her hips spread wide, her belly a gentle dome. She asked to learn to cook 'the good recipes.'",
      "Lily is fat. She happily eats whatever Ruthanne puts in front of her and has stopped asking what's in it. She asked for 'the other recipes.'",
      "Lily has figured out what's been going into her food. She asked Ruthanne to teach her how to make it herself. She wants to be the one doing the cooking now.",
      "Lily is very fat and an active participant. She knows the full recipe list, has opinions about technique, and cooks dinner for both of them every night — richer than what Ruthanne taught her.",
      "Lily is enormous and cooks constantly. She improved on Ruthanne's recipes. She can barely move around the kitchen but manages. She is deeply happy. Ruthanne watches her cook and eats everything she makes.",
    ]
  },
  Becca:{ joinStage:3, bodyType:"Mom bod", daughter:"Sofia",
    stages:[
      "Youngest of the moms. Early 30s, soft and fresh-faced, blank slate. Came because Ruthanne brought her.",
      "Softening quickly — middle rounding, figure becoming more settled. She absorbs everything MJ teaches.",
      "Properly soft. Belly rounds. Hips widen. She pays close attention in the lessons.",
      "Fat. Belly a full dome. She wears it with the ease of someone who decided fast that this was fine.",
      "Larger. Has become very attentive about Sofia's progress specifically.",
      "Her obsession is Sofia. She documents every milestone. She is enormously proud.",
    ],
    daughter_stages:[
      "Sofia is 16. Soft-figured and round-faced. A natural, easy gainer.",
      "Sofia has gained rapidly — belly rounds soft and full, arms and thighs thick. She's ahead of most of the daughters already.",
      "Sofia is fat. Her belly presses her clothes forward. Becca bought her jeans four sizes larger than she needed at the time.",
      "Sofia is very fat. She moves with the slow ease of someone who has grown comfortable with a large body. Becca texted the group: 'She asked for the strong shake. The strong one.'",
      "Sofia is enormous. Her arms jiggle when she gestures. Her belly is massive and round. She can barely sit in standard chairs.",
      "Sofia is one of the largest daughters. She barely fits in standard furniture. Becca has rearranged the house around her.",
      "Sofia is massive — soft, round, enormous, barely mobile. Becca had the living room furniture rebuilt around her. Sofia and Kezia have become the group's twin benchmarks of everything going right.",
    ]
  },
};

export const SESSION_PAYOFF_TEXT = [
  (gain,reason)=>`Session complete. ${Math.round(gain)} pounds worth of food consumed. ${reason==='food_coma'?'Full stop — literally, food coma, done.':'Focus ran out before the food did. That\'s a new one.'} The Rae receipt is still on the desk. You\'re ordering from that place again.`,
  (gain,reason)=>`Session log: ${Math.round(gain)} lbs. ${reason==='food_coma'?'The extras she brought are all gone, every one of them, and you\'re too full to move.':'Ran out of focus. Which means you sat here eating and gaming until your eyes gave out.'} The rank went up anyway. You\'re not analyzing this.`,
  (gain,reason)=>`Game over — session, not match. You won the match. You also ate ${Math.round(gain)} pounds worth of food and you\'re very full and Rae said 'you\'re getting good at this' on the way out and you\'re not sure which part she meant. The setup was good. You feel, against all evidence, completely fine.`,
  (gain,reason)=>`Session log: ${Math.round(gain)} lbs, rank climbed. ${reason==='food_coma'?'The food ran out before the focus did — first time that\'s happened.':'Focus ran low and you kept going anyway and honestly that tracks.'} You feel different tonight — heavier, more settled. Rae texted to ask if she should bring more next time. You said yes before you finished reading it.`,
  (gain,reason)=>`${reason==='food_coma'?'Food coma.':'Focus out.'} ${Math.round(gain)} lbs. Diamond rank. You're very fat and very well-fed and Rae is somewhere in the room doing something quiet and efficient. You won four of the last five. You are choosing to focus on the wins and not whatever else is happening here. Working as intended.`,
  (gain,reason)=>`The session ended when Rae said it was ending. You were going to argue. You looked at the situation — ${Math.round(gain)} lbs worth of food consumed, rank at Grandmaster, every surface clear, your belly enormous and warm — and decided she was right. She said 'that\'s enough for today' the way someone says something they\'re also proud of. You think she might be right about that too.`,
];

// ─── WIFE LESSONS MINI-GAME DATA ──────────────────────────────────────────────

export const WL_CONFIG = {
  // Starting weights (lbs)
  daughterStart: { Emma: 118, Chloe: 122, Kezia: 126, Lila: 114 },
  momStart:      { Darlene: 148, Wanda: 155, Patrice: 142 },
  mjStart:       132,
  // stageCaps[n] = weight all daughters must reach to leave stage n (index 0 unused)
  stageCaps:     [0, 145, 175, 215, 265, 325, 400, 490, Infinity],
  // Daughters attend sessions starting at this stage
  daughtersFrom: 6,
  // Chloe gets a multiplier on lesson gains starting at this stage
  chloeRivalFrom: 3,
  chloeRivalMult: 1.15,
  // Rel cap per 1-on-1 leaf
  relCap: 100,
};

// 3 lessons per stage (stages 1-8). daughterLbs applied to ALL daughters (Chloe × 1.15 from stage 3).
export const WL_LESSONS = {
  1: [
    { id:"honey_butter",   label:"Honey Butter Rolls",       text:"[WL_S1_L1_text]", daughterLbs:4, momLbs:1, mjLbs:2, rel:3 },
    { id:"cream_biscuits", label:"Cream Drop Biscuits",       text:"[WL_S1_L2_text]", daughterLbs:5, momLbs:2, mjLbs:3, rel:4 },
    { id:"cinnamon_pull",  label:"Cinnamon Pull-Apart Bread", text:"[WL_S1_L3_text]", daughterLbs:6, momLbs:2, mjLbs:3, rel:4 },
  ],
  2: [
    { id:"butter_cake",    label:"Butter Pound Cake",         text:"[WL_S2_L1_text]", daughterLbs:5, momLbs:2, mjLbs:3, rel:4 },
    { id:"cream_rolls",    label:"Cream-Filled Rolls",        text:"[WL_S2_L2_text]", daughterLbs:6, momLbs:2, mjLbs:3, rel:4 },
    { id:"pot_pie",        label:"Double-Crust Pot Pie",      text:"[WL_S2_L3_text]", daughterLbs:8, momLbs:3, mjLbs:4, rel:5 },
  ],
  3: [
    { id:"peach_cobbler",  label:"Peach Cobbler",             text:"[WL_S3_L1_text]", daughterLbs:8, momLbs:3, mjLbs:4, rel:5 },
    { id:"bread_pudding",  label:"Bread Pudding",             text:"[WL_S3_L2_text]", daughterLbs:9, momLbs:3, mjLbs:5, rel:5 },
    { id:"french_toast",   label:"Stuffed French Toast",      text:"[WL_S3_L3_text]", daughterLbs:10, momLbs:4, mjLbs:5, rel:6 },
  ],
  4: [
    { id:"cream_pie",      label:"Cream Pie",                 text:"[WL_S4_L1_text]", daughterLbs:10, momLbs:4, mjLbs:5, rel:6 },
    { id:"lasagna",        label:"Deep-Dish Lasagna",         text:"[WL_S4_L2_text]", daughterLbs:11, momLbs:4, mjLbs:6, rel:6 },
    { id:"shortcake",      label:"Strawberry Shortcake Stack",text:"[WL_S4_L3_text]", daughterLbs:12, momLbs:5, mjLbs:7, rel:7 },
  ],
  5: [
    { id:"chicken_pot",    label:"Chicken Pot Casserole",     text:"[WL_S5_L1_text]", daughterLbs:12, momLbs:5, mjLbs:7, rel:7 },
    { id:"mac_cheese",     label:"Four-Cheese Mac",           text:"[WL_S5_L2_text]", daughterLbs:13, momLbs:6, mjLbs:8, rel:7 },
    { id:"choc_cake",      label:"Chocolate Layer Cake",      text:"[WL_S5_L3_text]", daughterLbs:14, momLbs:6, mjLbs:9, rel:8 },
  ],
  6: [
    { id:"feast_spread",   label:"Feast Spread",              text:"[WL_S6_L1_text]", daughterLbs:14, momLbs:7, mjLbs:9,  rel:8 },
    { id:"daughters_bake", label:"Daughters Bake",            text:"[WL_S6_L2_text]", daughterLbs:15, momLbs:7, mjLbs:10, rel:8 },
    { id:"old_recipe",     label:"Old Family Recipe",         text:"[WL_S6_L3_text]", daughterLbs:16, momLbs:8, mjLbs:11, rel:9 },
  ],
  7: [
    { id:"daughters_run",  label:"Daughters Run the Table",   text:"[WL_S7_L1_text]", daughterLbs:17, momLbs:8,  mjLbs:12, rel:9 },
    { id:"overnight_feast",label:"Overnight Feast",           text:"[WL_S7_L2_text]", daughterLbs:19, momLbs:9,  mjLbs:13, rel:10 },
    { id:"recipe_book",    label:"Recipe Book Night",         text:"[WL_S7_L3_text]", daughterLbs:20, momLbs:10, mjLbs:13, rel:10 },
  ],
  8: [
    { id:"final_spread",   label:"The Final Spread",          text:"[WL_S8_L1_text]", daughterLbs:20, momLbs:11, mjLbs:15, rel:10 },
    { id:"handoff",        label:"The Handoff",               text:"[WL_S8_L2_text]", daughterLbs:22, momLbs:12, mjLbs:16, rel:11 },
    { id:"legacy_recipe",  label:"Legacy Recipe",             text:"[WL_S8_L3_text]", daughterLbs:24, momLbs:14, mjLbs:18, rel:12 },
  ],
};

// Helper to build a compact 1-on-1 dialogue entry.
// outcome shape: { momKey?, momLbs?, daughterKey?, daughterLbs?, mjLbs, rel }
// Each entry: { greeting, cappedGreeting, overtookGreeting?, options:[{label,text,subs:[{label,text,outcome}]}] }

export const WL_DIALOGUES = {
  // ── MOMS ──────────────────────────────────────────────────────────────────
  Darlene: [
    // Stage 1
    {
      greeting: "[Darlene_S1_greeting]",
      cappedGreeting: "[Darlene_S1_capped]",
      options: [
        { label:"How is Emma settling in?", text:"[Darlene_S1_O1]", subs:[
          { label:"She looks happy", text:"[Darlene_S1_O1a]", outcome:{ momKey:"Darlene", momLbs:2, mjLbs:1, rel:3 } },
          { label:"She's a natural cook",  text:"[Darlene_S1_O1b]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:1, rel:4 } },
        ]},
        { label:"Tell me about your recipes", text:"[Darlene_S1_O2]", subs:[
          { label:"That sounds wonderful",    text:"[Darlene_S1_O2a]", outcome:{ momKey:"Darlene", momLbs:2, mjLbs:1, rel:3 } },
          { label:"I'd love to try that",     text:"[Darlene_S1_O2b]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:2, rel:4 } },
        ]},
        { label:"You seem comfortable here",  text:"[Darlene_S1_O3]", subs:[
          { label:"We love having you",       text:"[Darlene_S1_O3a]", outcome:{ momKey:"Darlene", momLbs:2, mjLbs:1, rel:4 } },
          { label:"You fit right in",         text:"[Darlene_S1_O3b]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:2, rel:5 } },
        ]},
      ],
    },
    // Stage 2
    {
      greeting: "[Darlene_S2_greeting]",
      cappedGreeting: "[Darlene_S2_capped]",
      options: [
        { label:"Emma seems to love the food", text:"[Darlene_S2_O1]", subs:[
          { label:"She's been eating so well",  text:"[Darlene_S2_O1a]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:1, rel:4 } },
          { label:"She cleans her plate",       text:"[Darlene_S2_O1b]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:2, rel:4 } },
        ]},
        { label:"How are you adjusting?",      text:"[Darlene_S2_O2]", subs:[
          { label:"It suits you",              text:"[Darlene_S2_O2a]", outcome:{ momKey:"Darlene", momLbs:2, mjLbs:1, rel:3 } },
          { label:"You look well",             text:"[Darlene_S2_O2b]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:2, rel:4 } },
        ]},
        { label:"Chloe is catching up",        text:"[Darlene_S2_O3]", subs:[
          { label:"They make a good pair",     text:"[Darlene_S2_O3a]", outcome:{ momKey:"Darlene", momLbs:3, mjLbs:2, rel:5 } },
          { label:"A little competition helps",text:"[Darlene_S2_O3b]", outcome:{ momKey:"Darlene", momLbs:4, mjLbs:2, rel:5 } },
        ]},
      ],
    },
    // Stage 3
    {
      greeting: "[Darlene_S3_greeting]",
      cappedGreeting: "[Darlene_S3_capped]",
      overtookGreeting: "[Darlene_S3_overtook]",
      options: [
        { label:"Chloe is really thriving",    text:"[Darlene_S3_O1]", subs:[
          { label:"Emma will catch up",        text:"[Darlene_S3_O1a]", outcome:{ momKey:"Darlene", momLbs:4, mjLbs:2, rel:5 } },
          { label:"They push each other",      text:"[Darlene_S3_O1b]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:6 } },
        ]},
        { label:"You seem proud of them",      text:"[Darlene_S3_O2]", subs:[
          { label:"You should be",             text:"[Darlene_S3_O2a]", outcome:{ momKey:"Darlene", momLbs:4, mjLbs:2, rel:5 } },
          { label:"They're both doing so well",text:"[Darlene_S3_O2b]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:6 } },
        ]},
        { label:"How do you feel about this?", text:"[Darlene_S3_O3]", subs:[
          { label:"That's beautiful",          text:"[Darlene_S3_O3a]", outcome:{ momKey:"Darlene", momLbs:4, mjLbs:3, rel:6 } },
          { label:"We're building something",  text:"[Darlene_S3_O3b]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:7 } },
        ]},
      ],
    },
    // Stage 4
    {
      greeting: "[Darlene_S4_greeting]",
      cappedGreeting: "[Darlene_S4_capped]",
      overtookGreeting: "[Darlene_S4_overtook]",
      options: [
        { label:"The girls are really eating",   text:"[Darlene_S4_O1]", subs:[
          { label:"They have good appetites",    text:"[Darlene_S4_O1a]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:2, rel:6 } },
          { label:"You've raised them right",    text:"[Darlene_S4_O1b]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:6 } },
        ]},
        { label:"You're looking well yourself",  text:"[Darlene_S4_O2]", subs:[
          { label:"It shows",                    text:"[Darlene_S4_O2a]", outcome:{ momKey:"Darlene", momLbs:4, mjLbs:2, rel:5 } },
          { label:"You've filled out nicely",    text:"[Darlene_S4_O2b]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:6 } },
        ]},
        { label:"Any favorites so far?",         text:"[Darlene_S4_O3]", subs:[
          { label:"We'll make that again",       text:"[Darlene_S4_O3a]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:7 } },
          { label:"Good taste runs in the family",text:"[Darlene_S4_O3b]",outcome:{ momKey:"Darlene", momLbs:6, mjLbs:3, rel:7 } },
        ]},
      ],
    },
    // Stage 5
    {
      greeting: "[Darlene_S5_greeting]",
      cappedGreeting: "[Darlene_S5_capped]",
      overtookGreeting: "[Darlene_S5_overtook]",
      options: [
        { label:"Everyone's grown so much",      text:"[Darlene_S5_O1]", subs:[
          { label:"In the best way",             text:"[Darlene_S5_O1a]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:7 } },
          { label:"You all look wonderful",      text:"[Darlene_S5_O1b]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:3, rel:7 } },
        ]},
        { label:"Do Emma and Chloe compare notes?", text:"[Darlene_S5_O2]", subs:[
          { label:"That's sweet",                text:"[Darlene_S5_O2a]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:6 } },
          { label:"Healthy competition",         text:"[Darlene_S5_O2b]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:3, rel:7 } },
        ]},
        { label:"Are you happy here?",           text:"[Darlene_S5_O3]", subs:[
          { label:"We're glad",                  text:"[Darlene_S5_O3a]", outcome:{ momKey:"Darlene", momLbs:5, mjLbs:3, rel:7 } },
          { label:"You're family now",           text:"[Darlene_S5_O3b]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:4, rel:8 } },
        ]},
      ],
    },
    // Stage 6
    {
      greeting: "[Darlene_S6_greeting]",
      cappedGreeting: "[Darlene_S6_capped]",
      overtookGreeting: "[Darlene_S6_overtook]",
      options: [
        { label:"Emma and Chloe both look amazing", text:"[Darlene_S6_O1]", subs:[
          { label:"They've become themselves",       text:"[Darlene_S6_O1a]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:3, rel:7 } },
          { label:"You must be so proud",            text:"[Darlene_S6_O1b]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:8 } },
        ]},
        { label:"How does it feel watching them?",   text:"[Darlene_S6_O2]", subs:[
          { label:"That makes sense",                text:"[Darlene_S6_O2a]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:3, rel:7 } },
          { label:"You've guided them beautifully",  text:"[Darlene_S6_O2b]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:8 } },
        ]},
        { label:"You've changed too",                text:"[Darlene_S6_O3]", subs:[
          { label:"It looks good on you",            text:"[Darlene_S6_O3a]", outcome:{ momKey:"Darlene", momLbs:6, mjLbs:4, rel:8 } },
          { label:"We all have",                     text:"[Darlene_S6_O3b]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:9 } },
        ]},
      ],
    },
    // Stage 7
    {
      greeting: "[Darlene_S7_greeting]",
      cappedGreeting: "[Darlene_S7_capped]",
      overtookGreeting: "[Darlene_S7_overtook]",
      options: [
        { label:"The girls run the kitchen now",   text:"[Darlene_S7_O1]", subs:[
          { label:"You taught them well",          text:"[Darlene_S7_O1a]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:8 } },
          { label:"They've surpassed us",          text:"[Darlene_S7_O1b]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:4, rel:9 } },
        ]},
        { label:"Do you ever worry about them?",   text:"[Darlene_S7_O2]", subs:[
          { label:"They're thriving",              text:"[Darlene_S7_O2a]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:8 } },
          { label:"That's a mother's love",        text:"[Darlene_S7_O2b]", outcome:{ momKey:"Darlene", momLbs:7, mjLbs:4, rel:9 } },
        ]},
        { label:"What do you think comes next?",   text:"[Darlene_S7_O3]", subs:[
          { label:"I think you're right",          text:"[Darlene_S7_O3a]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:4, rel:9 } },
          { label:"There's always more",           text:"[Darlene_S7_O3b]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:5, rel:10 } },
        ]},
      ],
    },
    // Stage 8
    {
      greeting: "[Darlene_S8_greeting]",
      cappedGreeting: "[Darlene_S8_capped]",
      overtookGreeting: "[Darlene_S8_overtook]",
      options: [
        { label:"This is everything I hoped for",  text:"[Darlene_S8_O1]", subs:[
          { label:"Me too",                        text:"[Darlene_S8_O1a]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:4, rel:9 } },
          { label:"We built this together",        text:"[Darlene_S8_O1b]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:5, rel:10 } },
        ]},
        { label:"Emma and Chloe will carry this",  text:"[Darlene_S8_O2]", subs:[
          { label:"The legacy continues",          text:"[Darlene_S8_O2a]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:4, rel:10 } },
          { label:"It's in their hands now",       text:"[Darlene_S8_O2b]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:5, rel:10 } },
        ]},
        { label:"Thank you for trusting me",       text:"[Darlene_S8_O3]", subs:[
          { label:"It was never a question",       text:"[Darlene_S8_O3a]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:5, rel:10 } },
          { label:"You earned every bit of this",  text:"[Darlene_S8_O3b]", outcome:{ momKey:"Darlene", momLbs:8, mjLbs:5, rel:10 } },
        ]},
      ],
    },
  ],

  Wanda: [
    { greeting:"[Wanda_S1_greeting]", cappedGreeting:"[Wanda_S1_capped]", options:[
      { label:"How is Kezia finding it?", text:"[Wanda_S1_O1]", subs:[
        { label:"She has talent",          text:"[Wanda_S1_O1a]", outcome:{ momKey:"Wanda", momLbs:2, mjLbs:1, rel:3 } },
        { label:"You should be proud",     text:"[Wanda_S1_O1b]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:1, rel:4 } },
      ]},
      { label:"You look comfortable here", text:"[Wanda_S1_O2]", subs:[
        { label:"We're glad",              text:"[Wanda_S1_O2a]", outcome:{ momKey:"Wanda", momLbs:2, mjLbs:1, rel:3 } },
        { label:"You fit naturally",       text:"[Wanda_S1_O2b]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"Tell me about your kitchen", text:"[Wanda_S1_O3]", subs:[
        { label:"That's a wonderful setup", text:"[Wanda_S1_O3a]", outcome:{ momKey:"Wanda", momLbs:2, mjLbs:1, rel:4 } },
        { label:"We think alike",           text:"[Wanda_S1_O3b]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:2, rel:5 } },
      ]},
    ]},
    { greeting:"[Wanda_S2_greeting]", cappedGreeting:"[Wanda_S2_capped]", options:[
      { label:"Kezia is excelling",       text:"[Wanda_S2_O1]", subs:[
        { label:"She's a quick learner",  text:"[Wanda_S2_O1a]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:1, rel:4 } },
        { label:"Talent shows",           text:"[Wanda_S2_O1b]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"You seem at home",         text:"[Wanda_S2_O2]", subs:[
        { label:"I can tell",             text:"[Wanda_S2_O2a]", outcome:{ momKey:"Wanda", momLbs:2, mjLbs:1, rel:3 } },
        { label:"You've settled in well", text:"[Wanda_S2_O2b]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"Any thoughts on the food?", text:"[Wanda_S2_O3]", subs:[
        { label:"I'm glad you're enjoying it", text:"[Wanda_S2_O3a]", outcome:{ momKey:"Wanda", momLbs:3, mjLbs:2, rel:5 } },
        { label:"We'll keep making it",        text:"[Wanda_S2_O3b]", outcome:{ momKey:"Wanda", momLbs:4, mjLbs:2, rel:5 } },
      ]},
    ]},
    { greeting:"[Wanda_S3_greeting]", cappedGreeting:"[Wanda_S3_capped]", options:[
      { label:"Kezia is becoming someone", text:"[Wanda_S3_O1]", subs:[
        { label:"You can see it",          text:"[Wanda_S3_O1a]", outcome:{ momKey:"Wanda", momLbs:4, mjLbs:2, rel:5 } },
        { label:"She's growing into herself",text:"[Wanda_S3_O1b]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"How have you changed?",     text:"[Wanda_S3_O2]", subs:[
        { label:"Change is good",          text:"[Wanda_S3_O2a]", outcome:{ momKey:"Wanda", momLbs:4, mjLbs:2, rel:5 } },
        { label:"You carry it well",       text:"[Wanda_S3_O2b]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"What does your family think?", text:"[Wanda_S3_O3]", subs:[
        { label:"That's something",           text:"[Wanda_S3_O3a]", outcome:{ momKey:"Wanda", momLbs:4, mjLbs:3, rel:6 } },
        { label:"Word gets around",           text:"[Wanda_S3_O3b]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:7 } },
      ]},
    ]},
    { greeting:"[Wanda_S4_greeting]", cappedGreeting:"[Wanda_S4_capped]", options:[
      { label:"Kezia looks wonderful",        text:"[Wanda_S4_O1]", subs:[
        { label:"She really does",            text:"[Wanda_S4_O1a]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:2, rel:6 } },
        { label:"It suits her",               text:"[Wanda_S4_O1b]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"You've filled out beautifully",text:"[Wanda_S4_O2]", subs:[
        { label:"It really suits you",        text:"[Wanda_S4_O2a]", outcome:{ momKey:"Wanda", momLbs:4, mjLbs:2, rel:5 } },
        { label:"You look wonderful",         text:"[Wanda_S4_O2b]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"Do you have a favorite dish?", text:"[Wanda_S4_O3]", subs:[
        { label:"We'll make more of that",    text:"[Wanda_S4_O3a]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:7 } },
        { label:"I'll add it to the list",    text:"[Wanda_S4_O3b]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:3, rel:7 } },
      ]},
    ]},
    { greeting:"[Wanda_S5_greeting]", cappedGreeting:"[Wanda_S5_capped]", options:[
      { label:"Kezia is a natural",         text:"[Wanda_S5_O1]", subs:[
        { label:"She was born for this",    text:"[Wanda_S5_O1a]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:7 } },
        { label:"She takes after you",      text:"[Wanda_S5_O1b]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:3, rel:7 } },
      ]},
      { label:"Are you content?",           text:"[Wanda_S5_O2]", subs:[
        { label:"I'm glad",                 text:"[Wanda_S5_O2a]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:6 } },
        { label:"You deserve this",         text:"[Wanda_S5_O2b]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:3, rel:7 } },
      ]},
      { label:"What would you change?",     text:"[Wanda_S5_O3]", subs:[
        { label:"I'll remember that",       text:"[Wanda_S5_O3a]", outcome:{ momKey:"Wanda", momLbs:5, mjLbs:3, rel:7 } },
        { label:"We can do that",           text:"[Wanda_S5_O3b]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:4, rel:8 } },
      ]},
    ]},
    { greeting:"[Wanda_S6_greeting]", cappedGreeting:"[Wanda_S6_capped]", options:[
      { label:"Kezia is magnificent",        text:"[Wanda_S6_O1]", subs:[
        { label:"She's outgrown us both",    text:"[Wanda_S6_O1a]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:3, rel:7 } },
        { label:"She's extraordinary",       text:"[Wanda_S6_O1b]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:8 } },
      ]},
      { label:"You've been so patient",      text:"[Wanda_S6_O2]", subs:[
        { label:"It was never patience",     text:"[Wanda_S6_O2a]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:3, rel:7 } },
        { label:"You're a wonderful mother", text:"[Wanda_S6_O2b]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:8 } },
      ]},
      { label:"The circle is getting bigger", text:"[Wanda_S6_O3]", subs:[
        { label:"That's the idea",            text:"[Wanda_S6_O3a]", outcome:{ momKey:"Wanda", momLbs:6, mjLbs:4, rel:8 } },
        { label:"And fuller",                 text:"[Wanda_S6_O3b]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:9 } },
      ]},
    ]},
    { greeting:"[Wanda_S7_greeting]", cappedGreeting:"[Wanda_S7_capped]", options:[
      { label:"Kezia leads by example now",   text:"[Wanda_S7_O1]", subs:[
        { label:"She always did",             text:"[Wanda_S7_O1a]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:8 } },
        { label:"She sets the pace",          text:"[Wanda_S7_O1b]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:4, rel:9 } },
      ]},
      { label:"Are you proud?",               text:"[Wanda_S7_O2]", subs:[
        { label:"You should be",              text:"[Wanda_S7_O2a]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:8 } },
        { label:"I see it in your face",      text:"[Wanda_S7_O2b]", outcome:{ momKey:"Wanda", momLbs:7, mjLbs:4, rel:9 } },
      ]},
      { label:"What's left to learn?",        text:"[Wanda_S7_O3]", subs:[
        { label:"Then we keep going",         text:"[Wanda_S7_O3a]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:4, rel:9 } },
        { label:"There's always something",   text:"[Wanda_S7_O3b]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:5, rel:10 } },
      ]},
    ]},
    { greeting:"[Wanda_S8_greeting]", cappedGreeting:"[Wanda_S8_capped]", options:[
      { label:"Kezia is everything",          text:"[Wanda_S8_O1]", subs:[
        { label:"She is",                     text:"[Wanda_S8_O1a]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:4, rel:9 } },
        { label:"You made her that way",      text:"[Wanda_S8_O1b]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:5, rel:10 } },
      ]},
      { label:"I'm glad you came to us",      text:"[Wanda_S8_O2]", subs:[
        { label:"We were meant to meet",      text:"[Wanda_S8_O2a]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:4, rel:10 } },
        { label:"This was always home",       text:"[Wanda_S8_O2b]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:5, rel:10 } },
      ]},
      { label:"What does the future look like?",text:"[Wanda_S8_O3]", subs:[
        { label:"That sounds right",            text:"[Wanda_S8_O3a]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:5, rel:10 } },
        { label:"We'll be here",                text:"[Wanda_S8_O3b]", outcome:{ momKey:"Wanda", momLbs:8, mjLbs:5, rel:10 } },
      ]},
    ]},
  ],

  Patrice: [
    { greeting:"[Patrice_S1_greeting]", cappedGreeting:"[Patrice_S1_capped]", options:[
      { label:"How is Lila adjusting?",      text:"[Patrice_S1_O1]", subs:[
        { label:"She'll find her footing",   text:"[Patrice_S1_O1a]", outcome:{ momKey:"Patrice", momLbs:2, mjLbs:1, rel:3 } },
        { label:"That takes time",           text:"[Patrice_S1_O1b]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:1, rel:4 } },
      ]},
      { label:"You seem thoughtful",         text:"[Patrice_S1_O2]", subs:[
        { label:"That's a good quality",     text:"[Patrice_S1_O2a]", outcome:{ momKey:"Patrice", momLbs:2, mjLbs:1, rel:3 } },
        { label:"I appreciate that",         text:"[Patrice_S1_O2b]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"Tell me about home",          text:"[Patrice_S1_O3]", subs:[
        { label:"That sounds like Lila",     text:"[Patrice_S1_O3a]", outcome:{ momKey:"Patrice", momLbs:2, mjLbs:1, rel:4 } },
        { label:"She gets that from you",    text:"[Patrice_S1_O3b]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:2, rel:5 } },
      ]},
    ]},
    { greeting:"[Patrice_S2_greeting]", cappedGreeting:"[Patrice_S2_capped]", options:[
      { label:"Lila is finding her rhythm",    text:"[Patrice_S2_O1]", subs:[
        { label:"It suits her",               text:"[Patrice_S2_O1a]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:1, rel:4 } },
        { label:"She's a natural",            text:"[Patrice_S2_O1b]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"Are you enjoying the food?",    text:"[Patrice_S2_O2]", subs:[
        { label:"Good",                       text:"[Patrice_S2_O2a]", outcome:{ momKey:"Patrice", momLbs:2, mjLbs:1, rel:3 } },
        { label:"We'll make more",            text:"[Patrice_S2_O2b]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:2, rel:4 } },
      ]},
      { label:"What surprised you most?",      text:"[Patrice_S2_O3]", subs:[
        { label:"That means a lot",           text:"[Patrice_S2_O3a]", outcome:{ momKey:"Patrice", momLbs:3, mjLbs:2, rel:5 } },
        { label:"I hoped you'd feel that",    text:"[Patrice_S2_O3b]", outcome:{ momKey:"Patrice", momLbs:4, mjLbs:2, rel:5 } },
      ]},
    ]},
    { greeting:"[Patrice_S3_greeting]", cappedGreeting:"[Patrice_S3_capped]", options:[
      { label:"Lila is really eating well",   text:"[Patrice_S3_O1]", subs:[
        { label:"She has an appetite now",    text:"[Patrice_S3_O1a]", outcome:{ momKey:"Patrice", momLbs:4, mjLbs:2, rel:5 } },
        { label:"She's made for this",        text:"[Patrice_S3_O1b]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"You seem to have settled",     text:"[Patrice_S3_O2]", subs:[
        { label:"It's noticeable",            text:"[Patrice_S3_O2a]", outcome:{ momKey:"Patrice", momLbs:4, mjLbs:2, rel:5 } },
        { label:"That's a good sign",         text:"[Patrice_S3_O2b]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"What does Lila say at home?",  text:"[Patrice_S3_O3]", subs:[
        { label:"That's good to hear",        text:"[Patrice_S3_O3a]", outcome:{ momKey:"Patrice", momLbs:4, mjLbs:3, rel:6 } },
        { label:"We're building something",   text:"[Patrice_S3_O3b]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:7 } },
      ]},
    ]},
    { greeting:"[Patrice_S4_greeting]", cappedGreeting:"[Patrice_S4_capped]", options:[
      { label:"Lila has come so far",         text:"[Patrice_S4_O1]", subs:[
        { label:"She really has",             text:"[Patrice_S4_O1a]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:2, rel:6 } },
        { label:"The change is remarkable",   text:"[Patrice_S4_O1b]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"You look well yourself",       text:"[Patrice_S4_O2]", subs:[
        { label:"The food agrees with you",   text:"[Patrice_S4_O2a]", outcome:{ momKey:"Patrice", momLbs:4, mjLbs:2, rel:5 } },
        { label:"It shows",                   text:"[Patrice_S4_O2b]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:6 } },
      ]},
      { label:"What's Lila's favorite?",      text:"[Patrice_S4_O3]", subs:[
        { label:"We'll double it",            text:"[Patrice_S4_O3a]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:7 } },
        { label:"Good choice",                text:"[Patrice_S4_O3b]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:3, rel:7 } },
      ]},
    ]},
    { greeting:"[Patrice_S5_greeting]", cappedGreeting:"[Patrice_S5_capped]", options:[
      { label:"Lila is remarkable",           text:"[Patrice_S5_O1]", subs:[
        { label:"She always was",             text:"[Patrice_S5_O1a]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:7 } },
        { label:"You can see it now",         text:"[Patrice_S5_O1b]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:3, rel:7 } },
      ]},
      { label:"Do you feel different?",       text:"[Patrice_S5_O2]", subs:[
        { label:"That makes sense",           text:"[Patrice_S5_O2a]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:6 } },
        { label:"Change is good",             text:"[Patrice_S5_O2b]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:3, rel:7 } },
      ]},
      { label:"What would you tell other moms?",text:"[Patrice_S5_O3]", subs:[
        { label:"Word of mouth is how we grow", text:"[Patrice_S5_O3a]", outcome:{ momKey:"Patrice", momLbs:5, mjLbs:3, rel:7 } },
        { label:"Let them come see for themselves",text:"[Patrice_S5_O3b]",outcome:{ momKey:"Patrice", momLbs:6, mjLbs:4, rel:8 } },
      ]},
    ]},
    { greeting:"[Patrice_S6_greeting]", cappedGreeting:"[Patrice_S6_capped]", options:[
      { label:"Lila is glowing",              text:"[Patrice_S6_O1]", subs:[
        { label:"She was always beautiful",   text:"[Patrice_S6_O1a]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:3, rel:7 } },
        { label:"She's become herself",       text:"[Patrice_S6_O1b]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:8 } },
      ]},
      { label:"You've given her so much",     text:"[Patrice_S6_O2]", subs:[
        { label:"It goes both ways",          text:"[Patrice_S6_O2a]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:3, rel:7 } },
        { label:"You're a wonderful mother",  text:"[Patrice_S6_O2b]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:8 } },
      ]},
      { label:"How do you see the future?",   text:"[Patrice_S6_O3]", subs:[
        { label:"I see the same",             text:"[Patrice_S6_O3a]", outcome:{ momKey:"Patrice", momLbs:6, mjLbs:4, rel:8 } },
        { label:"We'll make it happen",       text:"[Patrice_S6_O3b]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:9 } },
      ]},
    ]},
    { greeting:"[Patrice_S7_greeting]", cappedGreeting:"[Patrice_S7_capped]", options:[
      { label:"Lila has surpassed everyone",  text:"[Patrice_S7_O1]", subs:[
        { label:"She set her own standard",   text:"[Patrice_S7_O1a]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:8 } },
        { label:"No one can touch her",       text:"[Patrice_S7_O1b]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:4, rel:9 } },
      ]},
      { label:"Are you satisfied?",           text:"[Patrice_S7_O2]", subs:[
        { label:"That's all I ask",           text:"[Patrice_S7_O2a]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:8 } },
        { label:"You've earned that",         text:"[Patrice_S7_O2b]", outcome:{ momKey:"Patrice", momLbs:7, mjLbs:4, rel:9 } },
      ]},
      { label:"What do you want for Lila?",   text:"[Patrice_S7_O3]", subs:[
        { label:"Then that's what we'll give her",text:"[Patrice_S7_O3a]",outcome:{ momKey:"Patrice", momLbs:8, mjLbs:4, rel:9 } },
        { label:"She's on that path",         text:"[Patrice_S7_O3b]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:5, rel:10 } },
      ]},
    ]},
    { greeting:"[Patrice_S8_greeting]", cappedGreeting:"[Patrice_S8_capped]", options:[
      { label:"This is a legacy now",         text:"[Patrice_S8_O1]", subs:[
        { label:"It always was",              text:"[Patrice_S8_O1a]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:4, rel:9 } },
        { label:"You helped build it",        text:"[Patrice_S8_O1b]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:5, rel:10 } },
      ]},
      { label:"Lila will carry this forward", text:"[Patrice_S8_O2]", subs:[
        { label:"In more ways than one",      text:"[Patrice_S8_O2a]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:4, rel:10 } },
        { label:"She was made for it",        text:"[Patrice_S8_O2b]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:5, rel:10 } },
      ]},
      { label:"Thank you, Patrice",           text:"[Patrice_S8_O3]", subs:[
        { label:"It was my pleasure",         text:"[Patrice_S8_O3a]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:5, rel:10 } },
        { label:"We did this together",       text:"[Patrice_S8_O3b]", outcome:{ momKey:"Patrice", momLbs:8, mjLbs:5, rel:10 } },
      ]},
    ]},
  ],

  // ── DAUGHTERS (stages 6-8 only) ───────────────────────────────────────────
  Emma: [
    // Stage 6
    {
      greeting: "[Emma_S6_greeting]",
      cappedGreeting: "[Emma_S6_capped]",
      overtookGreeting: "[Emma_S6_overtook]",
      options: [
        { label:"You've grown so much",        text:"[Emma_S6_O1]", subs:[
          { label:"You should be proud",        text:"[Emma_S6_O1a]", outcome:{ daughterKey:"Emma", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"Look how far you've come",   text:"[Emma_S6_O1b]", outcome:{ daughterKey:"Emma", daughterLbs:5, mjLbs:2, rel:7 } },
        ]},
        { label:"How do you feel?",             text:"[Emma_S6_O2]", subs:[
          { label:"That's the goal",            text:"[Emma_S6_O2a]", outcome:{ daughterKey:"Emma", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"You deserve to feel that way",text:"[Emma_S6_O2b]", outcome:{ daughterKey:"Emma", daughterLbs:5, mjLbs:3, rel:7 } },
        ]},
        { label:"Are you and Chloe competing?", text:"[Emma_S6_O3]", subs:[
          { label:"A little competition is good",text:"[Emma_S6_O3a]", outcome:{ daughterKey:"Emma", daughterLbs:5, mjLbs:2, rel:7 } },
          { label:"You're both winning",         text:"[Emma_S6_O3b]", outcome:{ daughterKey:"Emma", daughterLbs:5, mjLbs:3, rel:8 } },
        ]},
      ],
    },
    // Stage 7
    {
      greeting: "[Emma_S7_greeting]",
      cappedGreeting: "[Emma_S7_capped]",
      overtookGreeting: "[Emma_S7_overtook]",
      options: [
        { label:"You're a leader here now",     text:"[Emma_S7_O1]", subs:[
          { label:"Own it",                     text:"[Emma_S7_O1a]", outcome:{ daughterKey:"Emma", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"It suits you",               text:"[Emma_S7_O1b]", outcome:{ daughterKey:"Emma", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"What's your favorite part?",   text:"[Emma_S7_O2]", subs:[
          { label:"Then we lean into that",     text:"[Emma_S7_O2a]", outcome:{ daughterKey:"Emma", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"I thought you might say that",text:"[Emma_S7_O2b]",outcome:{ daughterKey:"Emma", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"How does Chloe make you feel?", text:"[Emma_S7_O3]", subs:[
          { label:"That's the right attitude",  text:"[Emma_S7_O3a]", outcome:{ daughterKey:"Emma", daughterLbs:7, mjLbs:3, rel:8 } },
          { label:"I believe you",              text:"[Emma_S7_O3b]", outcome:{ daughterKey:"Emma", daughterLbs:7, mjLbs:4, rel:9 } },
        ]},
      ],
    },
    // Stage 8
    {
      greeting: "[Emma_S8_greeting]",
      cappedGreeting: "[Emma_S8_capped]",
      overtookGreeting: "[Emma_S8_overtook]",
      options: [
        { label:"You've become extraordinary",  text:"[Emma_S8_O1]", subs:[
          { label:"It's all you",               text:"[Emma_S8_O1a]", outcome:{ daughterKey:"Emma", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"We're all better for knowing you",text:"[Emma_S8_O1b]",outcome:{ daughterKey:"Emma", daughterLbs:9, mjLbs:4, rel:10 } },
        ]},
        { label:"Are you proud of yourself?",   text:"[Emma_S8_O2]", subs:[
          { label:"You should be",              text:"[Emma_S8_O2a]", outcome:{ daughterKey:"Emma", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"That's everything",          text:"[Emma_S8_O2b]", outcome:{ daughterKey:"Emma", daughterLbs:9, mjLbs:5, rel:10 } },
        ]},
        { label:"What comes next for you?",     text:"[Emma_S8_O3]", subs:[
          { label:"I believe you",              text:"[Emma_S8_O3a]", outcome:{ daughterKey:"Emma", daughterLbs:9, mjLbs:4, rel:10 } },
          { label:"The world isn't ready",      text:"[Emma_S8_O3b]", outcome:{ daughterKey:"Emma", daughterLbs:10, mjLbs:5, rel:10 } },
        ]},
      ],
    },
  ],

  Chloe: [
    // Stage 6
    {
      greeting: "[Chloe_S6_greeting]",
      cappedGreeting: "[Chloe_S6_capped]",
      options: [
        { label:"Chloe, you're incredible",    text:"[Chloe_S6_O1]", subs:[
          { label:"You've outpaced everyone",   text:"[Chloe_S6_O1a]", outcome:{ daughterKey:"Chloe", daughterLbs:5, mjLbs:2, rel:7 } },
          { label:"You knew you would",         text:"[Chloe_S6_O1b]", outcome:{ daughterKey:"Chloe", daughterLbs:5, mjLbs:3, rel:8 } },
        ]},
        { label:"How does it feel to lead?",   text:"[Chloe_S6_O2]", subs:[
          { label:"Then keep going",            text:"[Chloe_S6_O2a]", outcome:{ daughterKey:"Chloe", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"Natural",                    text:"[Chloe_S6_O2b]", outcome:{ daughterKey:"Chloe", daughterLbs:5, mjLbs:3, rel:7 } },
        ]},
        { label:"Emma is watching you",        text:"[Chloe_S6_O3]", subs:[
          { label:"Good",                       text:"[Chloe_S6_O3a]", outcome:{ daughterKey:"Chloe", daughterLbs:5, mjLbs:2, rel:7 } },
          { label:"She should be",              text:"[Chloe_S6_O3b]", outcome:{ daughterKey:"Chloe", daughterLbs:5, mjLbs:3, rel:8 } },
        ]},
      ],
    },
    // Stage 7
    {
      greeting: "[Chloe_S7_greeting]",
      cappedGreeting: "[Chloe_S7_capped]",
      options: [
        { label:"You set the pace for everyone", text:"[Chloe_S7_O1]", subs:[
          { label:"That's your gift",            text:"[Chloe_S7_O1a]", outcome:{ daughterKey:"Chloe", daughterLbs:7, mjLbs:3, rel:8 } },
          { label:"Own it",                      text:"[Chloe_S7_O1b]", outcome:{ daughterKey:"Chloe", daughterLbs:7, mjLbs:4, rel:9 } },
        ]},
        { label:"What drives you?",              text:"[Chloe_S7_O2]", subs:[
          { label:"That's powerful",             text:"[Chloe_S7_O2a]", outcome:{ daughterKey:"Chloe", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"Use it",                      text:"[Chloe_S7_O2b]", outcome:{ daughterKey:"Chloe", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"Are you happy here?",           text:"[Chloe_S7_O3]", subs:[
          { label:"That means everything",       text:"[Chloe_S7_O3a]", outcome:{ daughterKey:"Chloe", daughterLbs:7, mjLbs:4, rel:9 } },
          { label:"Good",                        text:"[Chloe_S7_O3b]", outcome:{ daughterKey:"Chloe", daughterLbs:7, mjLbs:4, rel:9 } },
        ]},
      ],
    },
    // Stage 8
    {
      greeting: "[Chloe_S8_greeting]",
      cappedGreeting: "[Chloe_S8_capped]",
      options: [
        { label:"You're what this whole thing was for", text:"[Chloe_S8_O1]", subs:[
          { label:"We made you that way",          text:"[Chloe_S8_O1a]", outcome:{ daughterKey:"Chloe", daughterLbs:9, mjLbs:4, rel:9 } },
          { label:"You made yourself",             text:"[Chloe_S8_O1b]", outcome:{ daughterKey:"Chloe", daughterLbs:10, mjLbs:5, rel:10 } },
        ]},
        { label:"Emma respects you",               text:"[Chloe_S8_O2]", subs:[
          { label:"That's all she had to do",      text:"[Chloe_S8_O2a]", outcome:{ daughterKey:"Chloe", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"You earned that",               text:"[Chloe_S8_O2b]", outcome:{ daughterKey:"Chloe", daughterLbs:9, mjLbs:5, rel:10 } },
        ]},
        { label:"What's left for you to do?",      text:"[Chloe_S8_O3]", subs:[
          { label:"Then do it",                    text:"[Chloe_S8_O3a]", outcome:{ daughterKey:"Chloe", daughterLbs:9, mjLbs:4, rel:10 } },
          { label:"Nothing can stop you",          text:"[Chloe_S8_O3b]", outcome:{ daughterKey:"Chloe", daughterLbs:10, mjLbs:5, rel:10 } },
        ]},
      ],
    },
  ],

  Kezia: [
    // Stage 6
    {
      greeting: "[Kezia_S6_greeting]",
      cappedGreeting: "[Kezia_S6_capped]",
      options: [
        { label:"Kezia, you've arrived",        text:"[Kezia_S6_O1]", subs:[
          { label:"You've earned your place",   text:"[Kezia_S6_O1a]", outcome:{ daughterKey:"Kezia", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"Look at you",                text:"[Kezia_S6_O1b]", outcome:{ daughterKey:"Kezia", daughterLbs:5, mjLbs:2, rel:7 } },
        ]},
        { label:"How does it feel to be here?", text:"[Kezia_S6_O2]", subs:[
          { label:"Good",                       text:"[Kezia_S6_O2a]", outcome:{ daughterKey:"Kezia", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"It suits you",               text:"[Kezia_S6_O2b]", outcome:{ daughterKey:"Kezia", daughterLbs:5, mjLbs:3, rel:7 } },
        ]},
        { label:"Your mother is so proud",      text:"[Kezia_S6_O3]", subs:[
          { label:"You make it easy to be proud",text:"[Kezia_S6_O3a]",outcome:{ daughterKey:"Kezia", daughterLbs:5, mjLbs:2, rel:7 } },
          { label:"You're everything she hoped",text:"[Kezia_S6_O3b]", outcome:{ daughterKey:"Kezia", daughterLbs:5, mjLbs:3, rel:8 } },
        ]},
      ],
    },
    // Stage 7
    {
      greeting: "[Kezia_S7_greeting]",
      cappedGreeting: "[Kezia_S7_capped]",
      options: [
        { label:"You're a benchmark now",       text:"[Kezia_S7_O1]", subs:[
          { label:"Others look up to you",      text:"[Kezia_S7_O1a]", outcome:{ daughterKey:"Kezia", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"That's a real thing",        text:"[Kezia_S7_O1b]", outcome:{ daughterKey:"Kezia", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"What do you want?",            text:"[Kezia_S7_O2]", subs:[
          { label:"Then you'll have it",        text:"[Kezia_S7_O2a]", outcome:{ daughterKey:"Kezia", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"Let's make it happen",       text:"[Kezia_S7_O2b]", outcome:{ daughterKey:"Kezia", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"Sofia and you are neck and neck",text:"[Kezia_S7_O3]", subs:[
          { label:"May the best woman win",     text:"[Kezia_S7_O3a]", outcome:{ daughterKey:"Kezia", daughterLbs:7, mjLbs:4, rel:8 } },
          { label:"You're both winning",        text:"[Kezia_S7_O3b]", outcome:{ daughterKey:"Kezia", daughterLbs:7, mjLbs:4, rel:9 } },
        ]},
      ],
    },
    // Stage 8
    {
      greeting: "[Kezia_S8_greeting]",
      cappedGreeting: "[Kezia_S8_capped]",
      options: [
        { label:"Kezia, you're magnificent",    text:"[Kezia_S8_O1]", subs:[
          { label:"I mean every word",          text:"[Kezia_S8_O1a]", outcome:{ daughterKey:"Kezia", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"There's nothing else to say",text:"[Kezia_S8_O1b]", outcome:{ daughterKey:"Kezia", daughterLbs:9, mjLbs:4, rel:10 } },
        ]},
        { label:"Are you satisfied?",           text:"[Kezia_S8_O2]", subs:[
          { label:"That's the only answer",     text:"[Kezia_S8_O2a]", outcome:{ daughterKey:"Kezia", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"Good",                       text:"[Kezia_S8_O2b]", outcome:{ daughterKey:"Kezia", daughterLbs:9, mjLbs:5, rel:10 } },
        ]},
        { label:"Where do you go from here?",   text:"[Kezia_S8_O3]", subs:[
          { label:"I'll be here",               text:"[Kezia_S8_O3a]", outcome:{ daughterKey:"Kezia", daughterLbs:9, mjLbs:4, rel:10 } },
          { label:"Wherever you go, go full",   text:"[Kezia_S8_O3b]", outcome:{ daughterKey:"Kezia", daughterLbs:10, mjLbs:5, rel:10 } },
        ]},
      ],
    },
  ],

  Lila: [
    // Stage 6
    {
      greeting: "[Lila_S6_greeting]",
      cappedGreeting: "[Lila_S6_capped]",
      options: [
        { label:"Lila, you've grown into this", text:"[Lila_S6_O1]", subs:[
          { label:"It was always in you",       text:"[Lila_S6_O1a]", outcome:{ daughterKey:"Lila", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"You couldn't have known",    text:"[Lila_S6_O1b]", outcome:{ daughterKey:"Lila", daughterLbs:5, mjLbs:2, rel:7 } },
        ]},
        { label:"How does it feel?",            text:"[Lila_S6_O2]", subs:[
          { label:"You deserve that",           text:"[Lila_S6_O2a]", outcome:{ daughterKey:"Lila", daughterLbs:4, mjLbs:2, rel:6 } },
          { label:"Hold onto that",             text:"[Lila_S6_O2b]", outcome:{ daughterKey:"Lila", daughterLbs:5, mjLbs:3, rel:7 } },
        ]},
        { label:"Your mom sees it too",         text:"[Lila_S6_O3]", subs:[
          { label:"That means everything",      text:"[Lila_S6_O3a]", outcome:{ daughterKey:"Lila", daughterLbs:5, mjLbs:2, rel:7 } },
          { label:"She's proud of you",         text:"[Lila_S6_O3b]", outcome:{ daughterKey:"Lila", daughterLbs:5, mjLbs:3, rel:8 } },
        ]},
      ],
    },
    // Stage 7
    {
      greeting: "[Lila_S7_greeting]",
      cappedGreeting: "[Lila_S7_capped]",
      options: [
        { label:"You've surpassed what I hoped",text:"[Lila_S7_O1]", subs:[
          { label:"You set your own ceiling",   text:"[Lila_S7_O1a]", outcome:{ daughterKey:"Lila", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"You never had a ceiling",    text:"[Lila_S7_O1b]", outcome:{ daughterKey:"Lila", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"What keeps you going?",        text:"[Lila_S7_O2]", subs:[
          { label:"Then it's working",          text:"[Lila_S7_O2a]", outcome:{ daughterKey:"Lila", daughterLbs:6, mjLbs:3, rel:7 } },
          { label:"Good reasons",               text:"[Lila_S7_O2b]", outcome:{ daughterKey:"Lila", daughterLbs:7, mjLbs:3, rel:8 } },
        ]},
        { label:"Do you feel ready for what's next?",text:"[Lila_S7_O3]", subs:[
          { label:"That's the spirit",          text:"[Lila_S7_O3a]", outcome:{ daughterKey:"Lila", daughterLbs:7, mjLbs:4, rel:8 } },
          { label:"We'll build that together",  text:"[Lila_S7_O3b]", outcome:{ daughterKey:"Lila", daughterLbs:7, mjLbs:4, rel:9 } },
        ]},
      ],
    },
    // Stage 8
    {
      greeting: "[Lila_S8_greeting]",
      cappedGreeting: "[Lila_S8_capped]",
      options: [
        { label:"Lila, you're a triumph",       text:"[Lila_S8_O1]", subs:[
          { label:"Every word is true",         text:"[Lila_S8_O1a]", outcome:{ daughterKey:"Lila", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"I'm proud of you",           text:"[Lila_S8_O1b]", outcome:{ daughterKey:"Lila", daughterLbs:9, mjLbs:4, rel:10 } },
        ]},
        { label:"What does Patrice say?",       text:"[Lila_S8_O2]", subs:[
          { label:"She's right",                text:"[Lila_S8_O2a]", outcome:{ daughterKey:"Lila", daughterLbs:8, mjLbs:4, rel:9 } },
          { label:"Mothers know",               text:"[Lila_S8_O2b]", outcome:{ daughterKey:"Lila", daughterLbs:9, mjLbs:5, rel:10 } },
        ]},
        { label:"Where does this go from here?",text:"[Lila_S8_O3]", subs:[
          { label:"Then let's get there",       text:"[Lila_S8_O3a]", outcome:{ daughterKey:"Lila", daughterLbs:9, mjLbs:4, rel:10 } },
          { label:"There's only forward",       text:"[Lila_S8_O3b]", outcome:{ daughterKey:"Lila", daughterLbs:10, mjLbs:5, rel:10 } },
        ]},
      ],
    },
  ],
};

// ─── COMPETITIVE GAINER DATA ──────────────────────────────────────────────────

export const CG_CONFIG = {
  spiritTiers:[
    { min:0,  max:10, label:"Invested", color:"#5b9bd5" },
    { min:11, max:25, label:"Driven",   color:"#e8a020" },
    { min:26, max:45, label:"Frenzied", color:"#e05830" },
    { min:46, max:Infinity, label:"Ruthless", color:"#c00000" },
  ],
  // Spirit gain ranges
  spiritGainNeutral:   [0,1],   // Priya leads in all categories
  spiritGainThreat:    [1,3],   // per category where any girl is ahead or within 10%
  // Binge payoff: 1 AP. Base gain interpolated from minBinge→maxBinge by Priya's weight stage (1-7+).
  bingeApCost:    1,
  minBinge:       10,  // lbs at stage 1
  maxBinge:       50,  // lbs at stage 7+
  // Per-spirit-tier multiplier on binge gain: Invested/Driven/Frenzied/Ruthless
  bingeSpiritMults: [1, 1.25, 1.5625, 1.953],
  // "Threat" threshold: girl is within this fraction of Priya's value
  threatFraction: 0.10,
  // Measurement categories tracked
  categories: ["waist","bust","hip","thigh","arm"],
};

export const CG_CORKBOARD_SCENES = CG_FILLED_CORKBOARD_SCENES;

// Placeholder measurement-session scenes — Grok fills in prose
// Indexed as: MeasurementScenes[targetWeightStageName][priyaRelation] where
//   priyaRelation = "priya_larger" | "priya_smaller" | "priya_equal"
export const CG_MEASUREMENT_SCENES = {
  // scene prose for each girl being measured
  scene:"[MeasurementScene_{name}_S{stage}]",
  reactions: CG_FILLED_MEASUREMENT_REACTIONS,
  selfReview: CG_FILLED_SELF_REVIEW,
};

export const CG_BINGE_SCENES = CG_FILLED_BINGE_SCENES;

// Group chat templates — Grok fills in prose
// Template strings may contain {priyaWeight}, {priyaWaist}, {priyaBust}, etc.
export const CG_CHAT_TEMPLATES = {
  // Priya's opening post per spirit tier
  priyaPost: CG_FILLED_CHAT_TEMPLATES.priyaPost,
  // Priya's follow-up after seeing replies
  priyaFollowup: CG_FILLED_CHAT_TEMPLATES.priyaFollowup,
  // Per-girl reply templates. Each girl has 5 reply types.
  // reply type selected by: girl's lbs vs Priya's lbs + whether measured
  girls:{
    Brittany:  { ahead:"Thigh column says you still have work to do, Priya. I am not apologizing for winning there.", behind:"Fine, your numbers are bigger this week. I am saving this message for later.", close:"My thighs are close enough that you should probably underline them in red.", proud:"Solid gains on my end. The board can acknowledge that.", unmeasured:"Measure me properly before you start celebrating too hard." },
    Madeline:  { ahead:"For accuracy: at least one of my figures currently exceeds yours. I recommend updating the board.", behind:"Your lead is statistically meaningful. Annoying, but meaningful.", close:"The margin is narrow enough to be interesting. I would not call that comfortable.", proud:"My trend line remains positive. That is the part I care about.", unmeasured:"Unmeasured data should not be treated as absence of data." },
    Kylie:     { ahead:"Bust numbers say hi. Cute board though.", behind:"Okay, your whole scoreboard thing is getting kind of scary.", close:"Some of us are still close in the categories that photograph best.", proud:"Posted a progress pic and the comments noticed. Just saying.", unmeasured:"If you want my numbers, book a session. I need good lighting." },
    Serena:    { ahead:"Category lead is category lead. I will take the win.", behind:"You are ahead. I see it. I train better with a target.", close:"Close enough to make this competitive, which is the only interesting version.", proud:"My gains are efficient. That still counts.", unmeasured:"No official measurement, no official bragging rights." },
    Fiona:     { ahead:"The body is making its own argument today. Apparently mine has a footnote over yours.", behind:"Your scale is becoming the dominant shape of the composition.", close:"The numbers are nearly touching. That tension is visually useful.", proud:"I am changing in a way the board does not fully capture.", unmeasured:"You cannot compare what you have not observed." },
    Destiny:   { ahead:"Leaderboard says I am up in at least one stat. Screenshotting.", behind:"Your build is overtuned right now. Respectfully, nerf incoming never.", close:"Gap is small. I am calling that contested territory.", proud:"Slow grind, visible results. Patch notes look good.", unmeasured:"Unranked until measured. I know how ladders work." },
    Tiffany:   { ahead:"How interesting. One of my columns is still above yours.", behind:"Your presentation of the data is very persuasive, Priya. Irritating, but persuasive.", close:"That margin is too narrow for you to sound that confident.", proud:"My progress is elegant and measurable. Both matter.", unmeasured:"Invite me to the measurement session and I will consider the board official." },
    Maya:      { ahead:"Mine is bigger there.", behind:"You are ahead.", close:"Close.", proud:"Growing.", unmeasured:"You can measure if you want." },
    Nadia:     { ahead:"Threat response noted. I am curious what you do with it.", behind:"Your dominance language is increasing alongside the measurements. Useful correlation.", close:"Near parity produces excellent behavior from you.", proud:"My numbers are moving in a predictable direction.", unmeasured:"Unmeasured subjects often reveal the most when finally measured." },
    Kaylee:    { ahead:"Looks like I am ahead in one place. Do not skip dinner over it - add dessert.", behind:"You are doing beautifully, Priya. The board shows it.", close:"Close numbers can be motivating if you use them kindly. Or intensely. Your choice.", proud:"Steady progress here. Healthy appetite, steady gains.", unmeasured:"Happy to help with a proper measurement session when you want one." },
    Reneé:     { ahead:"One category ahead? That calls for a recipe adjustment.", behind:"Your numbers are rich, Priya. Very full-bodied results.", close:"Close margins need better ingredients. I can help with that.", proud:"My test batches are showing up on the board, as they should.", unmeasured:"Measure after dessert. Before dessert would be bad methodology." },
    Daisy:     { ahead:"Looks like I am still ahead there, honey. You can catch up with a proper meal plan.", behind:"You are growing so well. I hope you are eating enough to support that lead.", close:"A close number just means we should make sure everyone is fed.", proud:"My numbers are coming along. Warm food works.", unmeasured:"I do not mind being measured, but eat first." },
    "Mary Jane": { ahead:"Well, would you look at that. One of mine is still bigger.", behind:"You are outgrowing the board, Priya. That is a compliment.", close:"Close enough that I would add another helping if I were you.", proud:"Been eating well. Numbers usually follow.", unmeasured:"Measure me after supper if you want the honest version." },
    Lilith:    { ahead:"A larger number is such a small kind of hunger. Still, mine is larger.", behind:"Enjoy your lead. I enjoy watching what it makes you do.", close:"So close. I can feel how much that bothers you.", proud:"Growth is a useful appetite. Yours is loud.", unmeasured:"Some measurements are safer not taken until you are ready." },
  },
  // Professor reply choices (4 options, each nudges spirit)
  professorReplies:[
    { id:"encourage", ...CG_PROFESSOR_REPLY_TEXT.encourage },
    { id:"taunt", ...CG_PROFESSOR_REPLY_TEXT.taunt },
    { id:"observe", ...CG_PROFESSOR_REPLY_TEXT.observe },
    { id:"challenge", ...CG_PROFESSOR_REPLY_TEXT.challenge },
  ],
};

// ── STATE FAIR QUEEN: Pre-Fair Training Collaborations ─────────────────────

export const FAIR_TRAINING_CONFIG = {
  apCost: 1,
  maxSessionsPerCycle: 3,
  fairPrideTiers: [
    { min: 0,  max: 14, label: 'Building', color: '#8B7355' },
    { min: 15, max: 29, label: 'Buzzing',  color: '#C8860A' },
    { min: 30, max: Infinity, label: 'Electric', color: '#FFD700' },
  ],
  fairPrideBoosts: {
    Brittany: { base: 6, perStageBonus: 0.5 },
    Kylie:    { base: 7, perStageBonus: 0.5 },
    Serena:   { base: 5, perStageBonus: 0.6 },
    Renee:    { base: 8, perStageBonus: 0.4 },
    Daisy:    { base: 6, perStageBonus: 0.4 },
    Lilith:   { base: 3, perStageBonus: 0.5, perRecruit: 3 },
  },
  gainRanges: { MJ:[3,8], collaborator:[2,5], recruit:[1,4] },
  weighInBonus: { Building:0.0, Buzzing:0.10, Electric:0.25 },
  collaborators: {
    Brittany: { evolvedForm:'eating_captain', label:'🏆 Brittany', influenceKey:'Brittany' },
    Kylie:    { evolvedForm:'feedee_creator', label:'📸 Kylie',    influenceKey:'Kylie' },
    Serena:   { evolvedForm:'sumo',           label:'🏋️ Serena',  influenceKey:'Serena' },
    Renee:    { evolvedForm:'cultivator',     label:'👩‍🍳 Reneé',  influenceKey:'Renee' },
    Daisy:    { evolvedForm:'homeroom_queen', label:'🍎 Daisy',    influenceKey:'Daisy' },
    Lilith:   { evolvedForm:'predator',       label:'🌑 Lilith',   influenceKey:'Lilith', special:true },
  },
  recruitStageRanges: [[0,2],[1,3],[3,5]],
  recruitBodyTypes: ['apple','pear','hourglass','straight','mom_bod','voluptuous','athletic'],
};

const _mkTrainingScenes = () => {
  const collabs=['Brittany','Kylie','Serena','Renee','Daisy'];
  const stages=[4,5,6,7,8,9,10];
  const groups=['Early','Mid','Late']; // recruit-cohort size grouping (avg stage)
  const out={};
  for(const c of collabs){
    out[c]={};
    for(const mjs of stages)
      for(const cs of stages)
        out[c][`MJ${mjs}_C${cs}`]=`[FT_${c}_MJ${mjs}_C${cs}]`;
  }
  out.Lilith={};
  for(const mjs of stages)
    for(const ls of stages)
      for(const g of groups)
        out.Lilith[`MJ${mjs}_L${ls}_${g}`]=`[FT_Lil_MJ${mjs}_L${ls}_${g}]`;
  return out;
};
export const FAIR_TRAINING_SCENES = _mkTrainingScenes();

const _mkTrainingPhotos = () => {
  const collabs=['Brittany','Kylie','Serena','Renee','Daisy'];
  const stages=[4,5,6,7,8,9,10];
  const out={};
  for(const c of collabs){
    out[c]={};
    for(const mjs of stages)
      for(const cs of stages)
        out[c][`MJ${mjs}_C${cs}`]=`[FTP_${c}_MJ${mjs}_C${cs}]`;
  }
  out.Lilith={};
  for(const mjs of stages)
    for(const ls of stages)
      out.Lilith[`MJ${mjs}_L${ls}`]=`[FTP_Lil_MJ${mjs}_L${ls}]`;
  return out;
};
export const FAIR_TRAINING_PHOTOS = _mkTrainingPhotos();

const _mkFairDayScenes = () => {
  const stageIdxs=[0,1,2,3,4,5];
  const influenceMap={None:'None',Brittany:'Britt',Kylie:'Kyli',Serena:'Sere',Renee:'Rene',Daisy:'Dais',Lilith:'Lili'};
  const weighIn={}, judging={}, afterparty={};
  for(const si of stageIdxs){
    for(const [inf,ik] of Object.entries(influenceMap)){
      const k=`${si}_${inf}`;
      weighIn[k]={
        open:`[FD_WI_${si}_${ik}_Open]`,
        choice1:{ label:"Hold your ground", result:`[FD_WI_${si}_${ik}_C1]` },
        choice2:{ label:"Play to the crowd", result:`[FD_WI_${si}_${ik}_C2]` },
        endingA:`[FD_WI_${si}_${ik}_EndA]`,
        endingB:`[FD_WI_${si}_${ik}_EndB]`,
        gainA:8, gainB:5, relA:5, relB:9,
      };
      judging[k]=`[FD_JU_${si}_${ik}]`;
      afterparty[k]={
        open:`[FD_AP_${si}_${ik}_Open]`,
        choice1:{ label:"Celebrate with your collaborator", result:`[FD_AP_${si}_${ik}_C1]` },
        choice2:{ label:"Go to the crowd", result:`[FD_AP_${si}_${ik}_C2]` },
        ending:`[FD_AP_${si}_${ik}_End]`,
        gainA:5, gainB:3, relA:8, relB:12,
      };
    }
  }
  return { weighIn, judging, afterparty };
};
export const FAIR_DAY_SCENES = _mkFairDayScenes();

export const FAIR_BOOST_SUMMARIES = {};
for(const c of ['Brittany','Kylie','Serena','Renee','Daisy','Lilith'])
  FAIR_BOOST_SUMMARIES[c]={ Low:`[FBS_${c}_Low]`, Mid:`[FBS_${c}_Mid]`, High:`[FBS_${c}_High]` };
