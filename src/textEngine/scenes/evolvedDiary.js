// ═══════════════════════════════════════════════════════════════
// SCENE: EVOLVED DIARY — modular diary entries for all evolved forms
//
// Each module key is "diary.<evolvedFormId>".
// Variants select on: stage, corruption, season, archetype, mood.
// Rendered via renderDiary(student, week) → finished diary string.
//
// Stage 5-6: early evolved territory
// Stage 7-8: mid — fully in it
// Stage 9-10: late — vast, settled, definitive
// ═══════════════════════════════════════════════════════════════
import { registerModule, createContext, render } from '../engine.js';

// ── SUMO ──────────────────────────────────────────────────────
registerModule("diary.sumo", [
  // ── Stage 5 ─────────────────────────────────────────────────
  { when: { stage: [5], corruption: [0] },
    text: [
      `Regional qualifier. The warm-up room was unfamiliar and everything in it — the smell, the scale, the way my body moved in the space — felt borrowed. Dana 'The Wall' Mercer didn't look at me. I didn't deserve to be looked at yet. I ate between bouts because the coach said to, not because I understood it. My belly felt heavy and wrong and I finished lower than I wanted. I wrote down three things I did wrong. I've started fixing them.`,
      `I weighed in and the number sat there and I didn't know how to inhabit it yet. Dana Mercer looked right through me. I need to learn how to carry this weight like it belongs to me. It does belong to me. I haven't made peace with that yet, but I will.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `Regional qualifier. I understood the math before I got there: every pound I add is a pound she has to move. Dana Mercer, 340 lbs, three-year veteran. I ate between bouts. I don't love all of what I'm becoming, but I'm very good at this, and those two things are starting to feel like they can coexist.`,
      `Dana said 'you're going to be a problem' after she beat me and I've been turning that over all week. She said it like a compliment. I ate my way through the drive home thinking about what it means to have a rival who respects you before you've beaten her.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Regional qualifier, my first. The warm-up room smelled like liniment and chanko and I was the only former cheerleader in it. Dana 'The Wall' Mercer, 340 pounds, didn't look at me once until the weigh-in. I ate in my corner between bouts — I figured out fast that every pound I add is a pound she has to move — and I pushed her hard. She won. But she put a hand on my shoulder after and said 'you're going to be a problem.' I'm going to be a problem.`,
    ] },
  // ── Stage 6 ─────────────────────────────────────────────────
  { when: { stage: [6], corruption: [0] },
    text: [
      `Six months in and the gap to Dana is fifty pounds and closing. I know the math because I check the math. I still feel strange between bouts — eating because the strategy demands it, my belly filling lower and heavier than I expected. Dana told me to keep eating. She said it plainly, like advice. I wrote it down.`,
    ] },
  { when: { stage: [6], corruption: [1] },
    text: [
      `One season in. Maya's 370 and I'm 320 and the gap is closing and she knows it the same way I know it. We ate in the same warmup room and talked for a few minutes before competing and it was good and then she beat me. I know where this is going. So does she. We're both just moving toward it at different speeds.`,
    ] },
  { when: { stage: [6] },
    text: [
      `One season in. Fed myself between every bout — chanko, rice, all of it, my belly filling lower and heavier each break — and it nearly carried me past Dana. Nearly. The gap's down to fifty pounds. She said 'keep eating, keep getting bigger,' and she wasn't being kind, she was being honest about how she loses. I'm going to make her right.`,
    ] },
  // ── Stage 7 ─────────────────────────────────────────────────
  { when: { stage: [7], corruption: [0] },
    text: [
      `Conference week. The scale read 390 and the judge said it twice and Dana's number was 380 and I stood there in the warmup room holding that gap very still. I've outweighed Dana Mercer. I'm trying to decide what to do with that feeling. I won the conference. I'm still deciding.`,
    ] },
  { when: { stage: [7], corruption: [1] },
    text: [
      `Conference championship. I crossed Dana on the scale — my number above hers for the first time. She stopped writing in her warmup notes and put the cap back on without finishing. She knew what it meant. I knew what it meant. I won. That matters more than any feeling about it.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Conference meet. The board said I outweigh Dana Mercer now — first time ever — and then I went out and proved the number meant something, drove her belly-first out of the ring twice while the crowd chanted my name. 'You crossed over,' she said after. 'You're the bigger one now.' I am. After two years of being the novelty, I'm the one they measure against.`,
    ] },
  // ── Stage 8 ─────────────────────────────────────────────────
  { when: { stage: [8], corruption: [0] },
    text: [
      `National qualifier. The field is enormous and I am the largest thing in it and I don't fully know how to hold that. I ate my way through the morning. I won. I'm still not sure what I'm supposed to feel. Dana said she'd out-think me. She couldn't. I wrote that down because I need to believe it.`,
    ] },
  { when: { stage: [8], corruption: [1] },
    text: [
      `National qualifier and I'm the heaviest in the field by a margin that makes the others go quiet. I ate through the bracket and by the final I was bigger than I'd been. Dana said she'd out-think me. She couldn't out-think this much weight. That's a fact, not a boast. I'm still getting used to facts like that.`,
    ] },
  { when: { stage: [8] },
    text: [
      `National qualifier, press at the door. I'm the heaviest woman in the field by a margin that makes the others quiet. I ate a full staging meal before, fed in my corner through the whole bracket, and by the final I was bigger than I'd ever been. Dana said she'd out-think me. She couldn't. There's no thinking your way around this much weight. I made sure of it.`,
    ] },
  // ── Stage 9 ─────────────────────────────────────────────────
  { when: { stage: [9], corruption: [0] },
    text: [
      `National final. They read my number and the arena went quiet before it went loud. Dana found me first — 520 pounds, the wall I climbed over — and said she'd come to feel what it's like to lose to the biggest there's ever been. I fed in my corner. I grew between bouts. I won. I sat with how large I've become and told myself this was the plan. It was the plan.`,
    ] },
  { when: { stage: [9], corruption: [1] },
    text: [
      `National final. The arena read my number and took a breath before it roared. Dana was the first person to find me after — she was smiling. 'Thank you,' she said. I understood what she meant. She'd given me a rivalry worth finishing. I gave her something to have lost to. We both got what we came for.`,
    ] },
  { when: { stage: [9] },
    text: [
      `National final. They read my number into the broadcast and the arena took a breath before it roared. Dana found me first — 520 pounds, the wall I climbed over — and said she didn't come to beat me, nobody beats me now; she came to feel what it's like to lose to the biggest there's ever been. So I fed in my corner and I grew between bouts and I buried her under all of it, and afterward she was smiling. 'Thank you,' she said. I understood.`,
    ] },
  // ── Stage 10 ────────────────────────────────────────────────
  { when: { stage: [10], corruption: [0] },
    text: [
      `I wrote it down the night I won nationals: I stood in the middle of the dohyo, the largest competitor the sport has ever crowned, and I thought — I made this. Every bowl. Every weigh-in. Every pound that felt strange until it didn't. This is the record and the record is my body. I'm still learning how to think of that as mine.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I wrote it down the night I won nationals: I stood in the middle of the dohyo, the largest competitor the sport has ever crowned, my belly vast and warm and full from a whole day of corner feeding, and I felt the noise and thought — more. Every bowl, every weigh-in, every pound. This is the record and the record is my body. There is more to add. I am not done.`,
    ] },
  // ── Season variants ─────────────────────────────────────────
  { when: { stageMin: 5, stageMax: 6, season: ["winter"] },
    text: [
      `Winter training. The chanko nabe before weigh-in, cold outside, heat in the room, my body filling steadily with warmth. Dana shook my hand in the warmup hall. The gap is closing. Winter weight sits differently — I can feel it in how I move through doors.`,
    ] },
  { when: { stageMin: 7, season: ["summer"] },
    text: [
      `Summer circuit. The heat makes it harder but I don't stop eating between bouts — summer weight is still weight. Dana said it's the hottest she's competed in this circuit. I said nothing. I ate. I'm larger in summer than I was in fall and that's all the data I need.`,
    ] },
  // ── Wildcard ────────────────────────────────────────────────
  { when: {}, text: [`In the warm-up room, eating, getting ready. This is what I do.`] },
]);

// ── EATING_COMPETITOR ─────────────────────────────────────────
registerModule("diary.eating_competitor", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Timer ran. I finished early and sat with my hands in my lap while the others kept going and felt something I should have been proud of. I mostly felt unsure. The plate was clear. I was very good at this. I went home and ate dinner and thought about what kind of person this was making me.`,
      `I finished the event before anyone else and a person I didn't know said 'good run.' That felt strange. I'm very fast at eating. That's what I am now. I'm still deciding how I feel about it.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `Timer ran. Finished forty seconds early. The crowd didn't know how to react. I sat with my hands folded and waited, because the plate was empty and the record was over. The circuit has a slot for me. My face is on a flyer. This is strange and also logical: I'm very good at this, and circuits need people who are good at things.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The timer is honest. It doesn't negotiate. It runs, and at the end of it either the plate is clear or it isn't, and tonight it was clear four minutes before the buzzer and I sat there with my hands in my lap watching the others finish and felt something I can only call certainty.`,
    ] },
  { when: { stage: [6], corruption: [0] },
    text: [
      `Circuit regular now. Four regional slots. My face on a flyer. I look at the flyer sometimes and feel like it's a photo of someone I'm in the process of becoming. I'm good at this. I'm not sure I know what else I am anymore.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Circuit regular. I have a slot on the roster at four regional events. My face is on a flyer. This is surreal and also completely logical — I am very good at this, and the circuit needs people who are very good at this. The flyer has a good photo.`,
    ] },
  { when: { stage: [7], corruption: [0] },
    text: [
      `Regional record fell. Four years it stood, four minutes against me. They told me afterward, like I wasn't there, like I hadn't felt it give the moment I crossed it. I felt it. I kept going. I sat in the parking lot after and ate something small and told myself this was a good life. It is a good life.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The regional record stood for four years. It stood for four minutes against me. I was told this afterward, as if I hadn't been there, as if I hadn't felt the record give way the moment I exceeded it. I felt it. I kept going.`,
    ] },
  { when: { stage: [8], corruption: [0] },
    text: [
      `Sponsorships. A hot sauce brand, an energy drink, a restaurant chain. My agent negotiated all of it. I ate through the signing meeting because it seemed like the right thing to do and everyone found that appropriate. I am a professional now. I am eating my way through the paperwork of being a professional. This is fine.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Sponsorships now. A hot sauce brand, an energy drink, a restaurant chain doing promotional events. My agent — I have an agent — negotiated all of it. I ate through the signing meeting. Everyone found this appropriate.`,
    ] },
  { when: { stage: [9], corruption: [0] },
    text: [
      `World record is a number I keep in my head. I wake up with it. I eat toward it without loving the fact that eating toward things is what my life is. The number is getting closer. I am getting closer. I'm not sure what happens after.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The world record is a number I keep in my head. I wake up with it. I eat toward it. I am not there yet. I am approaching it with the same steady inevitability I bring to everything else. The number is getting closer. So am I.`,
    ] },
  { when: { stage: [10], corruption: [0] },
    text: [
      `I've eaten everything on every circuit in this country. The records are there. I don't think much about what comes next anymore. I eat because I'm hungry and because I've always been hungry and because that is the most honest thing I know about myself.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I have eaten everything on every circuit in this country and some in others. The records are documents of a life. I am done chasing them. I just eat now, freely, completely, without a timer or a crowd — just appetite and the endless satisfaction of filling it.`,
    ] },
  // Archetype variants
  { when: { stageMin: 7, archetype: "athlete" },
    text: [
      `I used to time my miles. Now I log my intake. The discipline is the same — set a target, approach it without flinching, exceed it. My old coach would have questions. I would have answers she might not like. Both things can be true.`,
    ] },
  { when: { stageMin: 5, stageMax: 6, archetype: "overachiever" },
    text: [
      `I have a spreadsheet. Of course I have a spreadsheet. Circuit schedule, intake logs, weight projections, record targets. My old advisor would recognize the format. The subject matter would confuse her. I'm past caring about that.`,
    ] },
  // Season
  { when: { stageMin: 7, season: ["winter"] },
    text: [
      `Winter circuit. Ate heavy, ate warm, drove home in the dark with the heater on and my belly full and my hands still on the wheel and felt, very quietly, correct.`,
    ] },
  { when: {}, text: [`The plate is clear. The record stands. I keep going.`] },
]);

// ── FEEDEE_CREATOR ────────────────────────────────────────────
registerModule("diary.feedee_creator", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First collab tonight. She said "I've never done this before." I said "neither have I." We both lied. We went live and the chat found us and by the end the subscriber count had done something I didn't expect. A person called wrenWatchesEverything said she wasn't leaving. I turned off the camera and sat with what I'd just started. I'm not sure I understand it yet.`,
      `We went live. The format works. The chat is alive. I sat with it afterward and tried to feel bad about what this obviously is and couldn't. It's honest. That's the best thing I can say about it.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `First collab. We went live. The chat found us. The format is obvious — two people gaining together, documented, watched — and I found I didn't mind that it was obvious. Wren subscribed and said she wasn't leaving. I believe her. The subscriber count has tripled.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First collab tonight. She said "I've never done this before" and I said "neither have I" and we both lied in different directions. We went live. The chat found us. By the time we were done the subscriber count had tripled and a person called wrenWatchesEverything had subscribed and said: I'm not leaving. I believe her.`,
    ] },
  { when: { stage: [6], corruption: [0] },
    text: [
      `Six weeks. Both of us heavier. The chat watches both numbers go up. I know what this is. I've known since the first stream. I keep making it anyway because I'm good at it and something about it feels right in a way I haven't been able to argue myself out of.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Six weeks of collabs. She's heavier than when we started. I am heavier than when we started. The chat comes every week to watch both numbers go up. The weekly gain isn't a side effect of the format. It is the format.`,
    ] },
  { when: { stage: [7], corruption: [0] },
    text: [
      `Platform featured the collab. Editorial pick. They called it "a new format for a specific kind of content" which is the most diplomatic phrasing I can imagine. Wren donated the full goal. She always does. I sat with the editorial language and thought: they're not wrong. It is exactly what it looks like. I've stopped pretending it isn't.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Platform featured the collab. Editorial pick. They described the double-feed as "a new format for a specific kind of content." Wren donated the full stream goal herself in one transaction and wrote: THE FEATURE WAS DESERVED. It was deserved. I know what this is. It has always been exactly what it looks like.`,
    ] },
  { when: { stage: [8], corruption: [0] },
    text: [
      `Brand contract. Both weights in the contract, both belly-sizes accounted for, both of us eating their product on camera. I read the contract language three times because I kept expecting something to embarrass me. Nothing did. This is what I do now. This is legitimate. I ate half the product before the stream because I wanted to and Wren donated the goal before we went live.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Brand contract signed. Both of us. Both weights in the contract, both belly-sizes accounted for, both of us eating their product on camera for a guaranteed sum. The food is good. The sum is good. I ate half their product before the stream started because I wanted to and because I could. Wren donated the goal before we went live. She always does.`,
    ] },
  { when: { stage: [9], corruption: [0] },
    text: [
      `Anniversary collab. One year. She and I sat across from each other before the camera went on and the room was quiet and I looked at her — enormous across the table, enormous because of these streams and this food and this year — and felt something complicated that settled, after a moment, into something simple: this is what I made. I pressed record.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Anniversary collab. One year. She and I sat across from each other before the camera went on and we didn't say anything for a minute. We didn't have to. We both looked down — at our own bellies, at the table, at the food — and then we pressed record. Wren was in the room. She cried for about thirty seconds and then she stopped and watched and that was the right thing to do.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Wren drove four hours and she's sitting outside the camera frame right now while I write this. 820 pounds. My collab partner is enormous across the table from me. The chat is 300,000 people. Wren is four feet away and she has been watching since I was 258 pounds. I put the journal down. I press record. I begin.`,
    ] },
  // Mood variants
  { when: { stageMin: 6, mood: "happy" },
    text: [
      `Wren is here and we're both enormous and the chat is alive and the food is good and I am making something that is genuinely mine. Today that feels like more than enough.`,
    ] },
  { when: {}, text: [`The camera is on. The chat is here. Wren is watching. I begin.`] },
]);

// ── BODY_POSITIVE_CREATOR ─────────────────────────────────────
registerModule("diary.body_positive_creator", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `The rebrand felt risky and it was risky. The algorithm dipped and I watched my numbers fall and kept posting anyway because stopping would have meant the old thing had been right all along. The numbers recovered. Doubled. The comments section is different now — more honest, more careful, like people who are relieved to finally say something.`,
      `I posted the honest version of myself and the algorithm didn't like it for six weeks and I didn't care for seven. Then the numbers turned around. The audience that came back was different from the one that left. I think I prefer these people.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `Rebrand launched. The dip lasted six weeks, which was six weeks of holding my nerve, and then it recovered with twice the audience and three times the engagement and a comments section that reads like letters I needed. This is working. I'm in the middle of figuring out if I'm proud of myself for being right about this, or just relieved.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The rebrand felt like a risk. It was a risk. The algorithm dipped for six weeks and then recovered, and what it recovered with was twice the audience and three times the engagement and a comments section that reads like letters I wish I'd received when I was eighteen.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The brand deal came through. A clothing company that makes things in real sizes and takes real photos of real bodies. I wore the dress on camera and cried slightly and my editor left it in and that clip has more views than anything else I've posted this year.`,
    ] },
  { when: { stage: [7], corruption: [0] },
    text: [
      `TEDx stage. Twelve minutes. I wrote and rewrote the talk for three months. When I gave it I felt afraid for exactly the first sentence and then I stopped feeling afraid. The standing ovation was real and sustained. I stood there and thought: I didn't know I was going to be this. Now I know.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Twelve minutes on a TEDx stage. I wrote and rewrote the talk for three months. I delivered it in twelve minutes and it felt like it lasted thirty seconds. The standing ovation was real and sustained and I stood there accepting it feeling larger than I ever have.`,
    ] },
  { when: { stage: [8] },
    text: [
      `My face on a billboard. On a highway I drive regularly. I saw it and had to pull over and sit with it for a moment. Then I drove home and ate a full meal and cried again. I am very large on a billboard on a major highway and I am correct.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Cultural touchstone. Journalists use that phrase in profile pieces. Students cite me in thesis papers. I get speaking requests from places I've never been. I eat well and exist largely and apparently that has become something worth studying. I am the study.`,
    ] },
  { when: { stage: [10], corruption: [0] },
    text: [
      `The platform is legacy. The body is the argument. I didn't know, when I started, that I was building a legacy. I knew I was tired of being small and quiet. I built outward from that and got here. The work continues without me having to defend it anymore. That is what I was working toward.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The platform is legacy. The body is the argument. The argument did not require me to be small or quiet or apologetic, and I wasn't, and now I am enormous and permanent and the work is done in the sense that it continues without requiring my active defense. That is what winning looks like.`,
    ] },
  // Archetype: influencer base
  { when: { stageMin: 7, archetype: "influencer" },
    text: [
      `The numbers are still good. They'll always be good. But numbers were the old thing. The new metric is something I can't chart — the messages I get from people who say my platform is the reason they stopped hating themselves. That's what the work was for.`,
    ] },
  // Archetype: artsy base
  { when: { stageMin: 6, archetype: "artsy" },
    text: [
      `A professor assigned my content in a cultural studies course. I found out because a student emailed me. The email was careful and formal and ended with 'thank you for making something that helped me.' I ate a full meal before I replied. The reply took three drafts.`,
    ] },
  { when: {}, text: [`The argument continues. So does the body.`] },
]);

// ── EATING_CAPTAIN ────────────────────────────────────────────
registerModule("diary.eating_captain", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Regional Open. The warmup room, Maya from Lakewood at 330 lbs, not looking at me. I ate my warmup. I stepped on the scale. The judge read my number twice. Maya looked over. I went back to my station. I lost. I was not good enough yet. I'm going to be good enough.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Regional Open. My first. The warmup room smelled like cooking and the girl from State — 178 lbs, two years on the circuit — looked at me the way people look at something they didn't expect. Maya from Lakewood, 330 lbs, hadn't looked at me at all. I ate my warmup. I stepped on the scale. The judge read my number twice. Maya looked over for the first time. I went back to my station and got ready. I lost. I'm going back.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Six months in. Maya says hello now. She's 370 and I'm 320 and the gap is closing and she knows it the same way I know it. We ate in the same warmup room and talked for a few minutes before competing and it was good and then she beat me and it was fine. I know where this is going. She knows too. We're both just moving toward it at different speeds.`,
    ] },
  { when: { stage: [7], corruption: [0] },
    text: [
      `Conference championship. I weighed in at 419 and Maya's number was 410 and the judge said mine into the microphone and Maya stopped writing with the marker. She put the cap back on without finishing the number. I made eye contact with her. She said 'I knew it was coming.' She said it quietly. I won the conference. I'm still holding the moment where she put the cap on.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Conference championship. I weighed in at 419 and Maya's number was 410 and the head judge said mine into the microphone and Maya stopped writing mid-number with the marker. She put the cap back on without finishing. I made eye contact with her. She said: "I knew it was coming." She meant it as a compliment. I took it as one. Then I won the conference.`,
    ] },
  { when: { stage: [8] },
    text: [
      `National qualifier and Maya found me backstage to say I was the best she'd ever seen. She said it plainly. She looked me in the eye and said: "You're the best I've ever seen. I need you to know I know that." Then she went to her warmup. I stood in the warmup room for one second thinking about the girl from State who asked "is that right?" when they read my number at my first competition. Then I ate everything.`,
    ] },
  { when: { stage: [9] },
    text: [
      `National champion. Maya was already clapping when they read my name. She started before anyone else — before the crowd, before the other competitors, before the officials. I looked over and she was standing at her side of the staging area with both hands coming together and she was the first. I don't know if she planned to be first. I think she just couldn't wait any longer. I understand. I am the national champion and I have been waiting for this for two years and I still couldn't wait for it to be over.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I put my hand on my belly after the ceremony. That's what I wrote in the diary last night — I stood in the arena hallway with the trophy and I put my hand flat on my belly, the full round warm weight of it, and I thought: this is what I built. Every competition, every warmup room, every time I stepped on the scale and let them read the number. This is the record. This is the proof. There is more to build. I am not done.`,
    ] },
  { when: {}, text: [`Warmup room. Eating. Ready. This is where I live.`] },
]);

// ── BIG_SQUAD_CAPTAIN ─────────────────────────────────────────
registerModule("diary.big_squad_captain", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `I said it in front of the squad and two girls cried. One left. I kept going. Six new pledges signed up the following week. I don't know yet if I built a thing or just started one. I'm finding out.`,
    ] },
  { when: { stage: [5] },
    text: [
      `I stood in front of the squad and said: no more weigh-ins, no more size requirements, no more conversations about who fits the uniform before we talk about who can do the work. Two girls cried. One left. Six signed up the next week.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Pledges are choosing us. They say they heard about the culture — that we celebrate what bodies can do rather than what they look like. This is accurate. The chapter is the fullest it has been in years. Some of the fullness is literal. I'm proud of all of it.`,
    ] },
  { when: { stage: [7] },
    text: [
      `A journalist called for a quote. Then they asked for a sit-down. The article ran with the headline 'The Squad That Changed the Conversation.' I read it three times and ate something good and thought about what a long way this has come.`,
    ] },
  { when: { stage: [8] },
    text: [
      `National Greek leadership conference. I spoke for forty minutes. My chapter was in the front row. At the end there was a long silence and then the room started. I said afterward that the silence was the best part. That's true.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The national organization changed its guidance. Quietly. In a footnote of a wellness document. We were mentioned. My name was mentioned. I filed it and made dinner and told the squad and they screamed and we ate together.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I built a thing that doesn't need me to sustain it anymore. The culture lives in the chapter, in the pledges, in the alumnae who write back and say it changed how they think about their own bodies. That is permanent. I am permanent. We are the same size in different ways.`,
    ] },
  { when: {}, text: [`The culture holds. The chapter grows. Both are the same thing.`] },
]);

// ── EATING_DIARIST ────────────────────────────────────────────
registerModule("diary.eating_diarist", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `The newsletter went out to thirty people. I wrote it like an assignment I was grading myself on. Thirty people opened it by morning. Thirty people read what I wrote in the middle of the night. I sat with that number for a long time before deciding it was a beginning and not an end.`,
      `Thirty readers. I rewrote the opening line eleven times. Sent it at 11:47pm. Thirty people opened it by morning and I don't know what I expected but I know what I felt: that I'd done a real thing and the world had received it. That's rare. I went straight back to writing.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `Thirty readers in the morning. Not many. Enough. I already know what the next issue will be about. The writing is the part I'm sure of. Everything else is still taking shape.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The newsletter went out to thirty people. Thirty. I wrote it like an assignment I was grading myself on, which means I rewrote the opening line eleven times and sent it at 11:47pm. Thirty people opened it by morning. Thirty felt like a beginning.`,
    ] },
  { when: { stage: [6] },
    text: [
      `An agent emailed. A real literary agent, with a list of authors I've actually read. She said she'd been following the newsletter and had ideas. I reread the email six times. I ate a full breakfast before I replied. The reply took four drafts.`,
    ] },
  { when: { stage: [7], corruption: [0] },
    text: [
      `Two-book deal. The first is memoir. The second she called 'a companion piece.' Both advances cleared. I bought myself a dinner I'd been meaning to have for six months. I sat there with the food and thought: I wrote my way to this. I am still writing. The writing is the thing that stays.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Two-book deal. The first is memoir. The second is something she called 'a companion piece' which I am interpreting as permission to write whatever I want. Both advances cleared. I bought myself a dinner I'd been meaning to have for six months.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Published. The book is out in the world. Reviews say 'intimate,' 'funny in a way that catches you off guard,' 'a document of a transformation that refuses to apologize.' That last one is accurate. I did not apologize. Not once.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The book is being taught. A food studies course assigned it. A gender studies course included it in a unit. I went to one of the classes and sat in the back and listened to students argue about sentences I'd written and felt something I didn't have a word for until later: permanence.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The writing and the eating were always the same act — both a form of taking in, of accumulating, of making something mine. I understand that now the way I understand my own body: completely, without effort, as a fact that was always true and simply needed time to become obvious.`,
    ] },
  // Archetype: bookworm base
  { when: { stageMin: 5, stageMax: 7, archetype: "bookworm" },
    text: [
      `My academic writing has always been precise. The personal essay is a different instrument. I keep revising the same paragraph because I want it to do three things at once and it keeps only doing two. I'm eating while I revise. The paragraph will give.`,
    ] },
  // Archetype: quiet base
  { when: { stageMin: 5, archetype: "quiet" },
    text: [
      `The strangest thing about this is that I've always been quiet and now I'm making things that thousands of people read. I still feel quiet when I write. That's where the words come from. I think that's the whole trick.`,
    ] },
  { when: {}, text: [`The notebook is full. I start another. The eating continues. Both do.`] },
]);

// ── FOOD_RESEARCHER ───────────────────────────────────────────
registerModule("diary.food_researcher", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `The IRB paperwork was forty-seven pages. I am the only researcher I know who is also the primary research subject. I got the approval. The methodology section is the most honest thing I've ever submitted, and I've been sitting with whether that's a good thing or a concerning one.`,
      `I have a lab space, a grant, a meal plan that is technically research infrastructure. The institutional support is real and I keep waiting for someone to notice what it's actually funding. No one has yet. The data I'm generating is genuinely interesting.`,
    ] },
  { when: { stage: [5], corruption: [1] },
    text: [
      `IRB approved. I am the researcher and the subject and the methodology accounts for this, which is the most interesting methodology section I've ever written. The data will be good. The subject is already performing beyond expectations. By which I mean: I'm eating more than I projected.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The IRB paperwork was forty-seven pages. I am the only researcher I know who is also the primary research subject. The committee found this unusual. They approved it. The methodology section is the most honest thing I've ever submitted.`,
    ] },
  { when: { stage: [6] },
    text: [
      `I have a lab space. I have a grant. I have a meal plan that is technically research infrastructure. The institutional support for what I'm doing has exceeded my expectations at every stage, which suggests either that my work is good or that the institution doesn't fully understand what I'm studying. Possibly both.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Published. Peer-reviewed, actual journal, impact factor above two. Reviewer 2 called the self-study design 'ethically complex.' Reviewer 1 called it 'a methodological innovation.' The editor agreed with Reviewer 1. I agree with the editor.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Three citations. A paper at a school I didn't attend cited my methodology. A paper I disagree with cited my findings. A paper I admire cited both. Citation counts are a strange kind of conversation. I've entered it. I'm staying.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Keynote. The conference was not prepared for the physical reality of having me at the podium. The podium was adjusted. The microphone was adjusted. The audience adjusted. I gave the talk. The Q&A ran thirty minutes over scheduled time. Nobody left.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The experiment has concluded in the sense that the study period has ended. The subject has not concluded. The data is complete. The researcher remains. I am both, simultaneously, at the scale that data set always implied I would reach. This was always the endpoint.`,
    ] },
  // Archetype variants
  { when: { stageMin: 7, archetype: "bookworm" },
    text: [
      `I've published two papers and a grant application this semester and I've been heavier for all of it than I was for any of my previous work. The correlation is documented. I choose to regard it as a research finding rather than an excuse.`,
    ] },
  { when: { stageMin: 6, archetype: "athlete" },
    text: [
      `I used to log miles. Now I log intake. The precision is the same, the units have changed, and the body is a different kind of record. My old training coach would have questions. The IRB wouldn't let me interview her.`,
    ] },
  { when: { stageMin: 7, archetype: "psych" },
    text: [
      `There's a section in my notes where the researcher voice and the subject voice are indistinguishable. I know exactly which session that happened in. I left it in the methodology paper. I noted it as a finding.`,
    ] },
  { when: {}, text: [`The data accumulates. So does the subject.`] },
]);

// ── EATING_STREAMER ───────────────────────────────────────────
registerModule("diary.eating_streamer", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First gaming + eating stream. I was nervous in a way I haven't been nervous about streaming in years. The viewer count did something unexpected within two hours. I sat afterward looking at the chat log and thinking: I found the format. I found the thing. I don't know what that means yet.`,
      `Went live with food and games at the same time. It worked. The chat was very alive. I kept thinking someone was going to tell me to stop and no one did. I think they wanted more.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First gaming + eating stream. I was nervous in a way I haven't been nervous about streaming in years. Within two hours the viewer count had done something I'd never seen it do before, and the chat was completely alive, and I understood that I had found the correct format.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The viewers who came for the games stay for the eating. The viewers who came for the eating are learning the games. The crossover is larger and more genuine than I expected. The snacks arrive in boxes now. I have a dedicated shelf.`,
    ] },
  { when: { stage: [7] },
    text: [
      `My community follows every meal and every match. They know my order at six different restaurants. They track my high scores. They send delivery gifts in amounts that require a second fridge. I have a second fridge. I bought it with stream revenue.`,
    ] },
  { when: { stage: [8] },
    text: [
      `The platform featured my channel in a collection titled 'New Formats.' I've been doing this for months. The platform finally noticed. The algorithm turned on like a light. The viewer count doubled in a week. I ate through the entire surge.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Mukbang gaming legend. My clips get remixed and cited and reposted. My setups and orders are documented on a fan wiki I did not create. I had a conversation with another creator about this and she said 'you built a genre.' That might be accurate.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The stream is always on in some sense. I eat in front of people every day and they watch and something genuine happens in that watching. I don't fully understand what it is. I don't need to. The food is real. The audience is real. The rest is detail.`,
    ] },
  // Archetype: gamer base
  { when: { stageMin: 6, archetype: "gamer" },
    text: [
      `I've been streaming for years. This format is the best version of the thing I've always been doing. The optimization was always going to look like this. I just needed the right data point. I have it now.`,
    ] },
  // Archetype: influencer base
  { when: { stageMin: 5, archetype: "influencer" },
    text: [
      `My old content was fine. This content is good. The difference is I'm not performing a version of myself anymore. I'm just on camera being exactly what I am. The numbers reflect that. Numbers always reflect what's real.`,
    ] },
  { when: {}, text: [`Live. Eating. Gaming. The chat is here. Good.`] },
]);

// ── SPEED_EATER ───────────────────────────────────────────────
registerModule("diary.speed_eater", [
  { when: { stage: [5] },
    text: [
      `Timer ran. I finished forty seconds early. The crowd didn't know how to react. The MC found words eventually. I sat with my hands folded and waited, because there was nothing else to do — the plate was empty, the record was over, I was done.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Records are falling in sequence. I write each one down in a notebook before I break it. The notebook is three-quarters full. The remaining quarter is projections. The projections keep proving accurate.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Regional eating championship on Saturday, DLC speedrun on Sunday. Both won. I slept for twelve hours after and woke up hungry and started planning the next one. The two disciplines feel identical to me now: set a target, exceed it, rest, repeat.`,
    ] },
  { when: { stage: [8] },
    text: [
      `My name shows up in two different competitive communities now. They've started to overlap — people show up to eating competitions who know my gaming records, and vice versa. I hold simultaneous records. It's unprecedented. Apparently.`,
    ] },
  { when: { stage: [9] },
    text: [
      `World-record territory on multiple tables. I've broken things that people thought were unbreakable. The documentation is meticulous. The methodology is reproducible. Nobody has reproduced it. I suspect nobody will.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Speed doesn't mean anything at this size and weight and scale of appetite. I've transcended the timed format. I eat until I'm done, and when I'm done I'm done, and the numbers are beside the point. The life is the point. The eating is the point.`,
    ] },
  { when: { stageMin: 7, archetype: "gamer" },
    text: [
      `Set a record at a table and a record in a run this weekend. Same muscle. Same state. I've stopped being surprised that they're related. I've started being surprised it took me this long to put them together.`,
    ] },
  { when: {}, text: [`The timer runs. I finish. I rest. I plan the next one.`] },
]);

// ── RANKED_FEEDEE ─────────────────────────────────────────────
registerModule("diary.ranked_feedee", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Session log — Week 1: New delivery driver. She confirmed the order and left. I ate everything and won a game and stayed up until four. The session was good. I don't want to examine why it was good. I'm just logging that it was.`,
      `Session log — Week 1: I placed a large order late. The driver was fast, eleven minutes, barely said anything. I ate everything. Something about the evening felt correct. I'll note that without drawing conclusions.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Session log — Week 1: Started around two. New delivery driver named Rae got here in eleven minutes. Didn't say much, confirmed the order, left. Stayed up until four. Lost two ranked games, won one. Ate everything. The session felt good in a way I don't feel like analyzing.`,
    ] },
  { when: { stage: [6], corruption: [0] },
    text: [
      `Session log — Week 5: Rae added something to the order. A dessert thing I'd been meaning to try for three weeks. I ate it. I won three games in a row. I notice these two facts coincide and I am choosing to treat that as a coincidence.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Session log — Week 5: Rae added something to the order. I didn't ask for it. The receipt said 'complimentary' in the notes. It was a dessert thing I'd been thinking about ordering for three weeks. I ate it. I went on tilt and ate through the whole session and won three games in a row. I'm not drawing conclusions from this.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Session log — Week 9: She was at my door when I placed the order. She said she was 'in the area.' The building requires a code for the lobby. I let this go. Food was warm. Session went five hours. I went from bronze to silver in one sitting. The correlation is clear and I am choosing to ignore it.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Session log — Week 13: I didn't place an order. Rae showed up anyway. She said she had 'a feeling.' She brought the exact thing I had been thinking about ordering. I ate it. It took forty minutes. During those forty minutes I won four ranked games straight and my team played like a different team because I was not tilting for the first time in two weeks. I have decided not to think carefully about any of this.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Session log — Week 18: Rae rearranged the desk area to fit more food trays. She didn't ask. The setup is better now. My belly rests on the edge of the desk differently. She said 'there' when she finished, like a complete sentence. I have been thinking about that word all week. I won my first Diamond game. I am significantly heavier than I was four months ago. These things happened in the same week.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Session log — Week 23: Rae is here most days now. She doesn't always bring food. Sometimes she's just here. I asked once if she was still technically on shift. She said 'not technically' and that was the whole answer. I think she knows what she's doing. I think I know what she's doing. We're both choosing not to say it, which is fine. Working as intended.`,
    ] },
  { when: {}, text: [`Session log: the food arrived. The game ran. Everything worked as intended.`] },
]);

// ── CHAPTER_HOSTESS ───────────────────────────────────────────
registerModule("diary.chapter_hostess", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Twelve courses. I planned every one. The chapter arrived uncertain and left full and I sat in the dining room afterward trying to figure out what I'd just done. We did something real. I'm not sure what to call it yet.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Twelve courses. I planned every one of them, sourced every ingredient, set every table. The chapter arrived uncertain and left full and grateful and different in a way I can't fully quantify but absolutely recognize. We did something real in that dining room.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Wednesday feast night is established. The chapter knows it, the schedule reflects it, the kitchen is stocked by Tuesday. I have become the person who feeds everyone, which is a role I did not apply for and have accepted completely.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Three people transferred specifically for the Wednesday feasts. I know this because they told me. They found out about the chapter through secondhand accounts of the food. I am building the chapter's reputation through abundance. I'm okay with this.`,
    ] },
  { when: { stage: [8] },
    text: [
      `The administration noticed. A wellness coordinator came to speak with me. I served her the Wednesday feast menu and she left with a full tupperware container and has not filed anything. I consider this a diplomatic victory.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Alumni are funding the feasts. A check arrived with 'for the table' in the memo line, from a sister who graduated seven years ago. She heard about the chapter from someone who heard about it from someone else. The feast has a legacy.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The chapter hosts itself now. The traditions are real, the recipes are documented, the Wednesday ritual continues. I made a culture. I am also a culture. Both will outlast me in one direction or another.`,
    ] },
  { when: {}, text: [`The table is set. Wednesday is coming.`] },
]);

// ── BODY_POSITIVE_GREEK ───────────────────────────────────────
registerModule("diary.body_positive_greek", [
  { when: { stage: [5] },
    text: [
      `The proposal passed with one abstention. The one who abstained came to my room three days later and said she'd been thinking about it and changed her mind. The vote is now unanimous. I considered this a signal.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Pledges are choosing us because of what we stand for. They say it at rush: 'I heard about your chapter.' They mean the culture, the size acceptance, the fact that we eat dinner together and nobody comments on portions. We fill every slot in the pledge class.`,
    ] },
  { when: { stage: [7] },
    text: [
      `National press. The article was sympathetic and got everything right and quoted three of my sisters by name. We printed it. We put it on the chapter bulletin board. We ordered pizza to celebrate. The irony was appreciated.`,
    ] },
  { when: { stage: [8] },
    text: [
      `I spoke for forty minutes at the Panhellenic conference. My chapter was in the front row. When it was over and the applause had settled, a chapter president from another school came up and said: 'We've been doing the weigh-ins wrong. We're stopping.' I didn't say anything. I just nodded.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The national organization changed the wellness guidance. Three sentences, in a footnote, in the appendix. My name was in one of those sentences. A footnote in a document that governs thousands of chapters. That is not nothing.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I built it. The culture lives in the chapter and in the chapters that modeled themselves on ours and in the pledges who become sisters who become alumnae who go out and change other things. I made something that makes things. That is enough.`,
    ] },
  { when: {}, text: [`The chapter holds. The culture grows. Both are the same.`] },
]);

// ── INSTALLATION_ARTIST ───────────────────────────────────────
registerModule("diary.installation_artist", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First installation. Mirrors, photographs, audio of my voice at each stage. The opening was quiet for three minutes and then someone started talking and I stood in the corner and listened. I made something that started a conversation. I'm still deciding if I want to be in the room for it.`,
      `The opening. I stood at the edge and watched people move through the photographs of my body at each weight and tried to understand what they were seeing. I think I understand now. I don't know how I feel about it yet.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First installation: a room. Mirrors, photographs of my body at each stage, audio of my voice describing what I saw in the mirror at each weight. The opening was quiet for three minutes. Then someone started talking and the conversation didn't stop.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Two galleries made offers for the next show. One is in another city. I am shipping the work and also shipping myself, which required a logistics conversation that I found genuinely funny and also slightly absurd. I am the largest thing in both shipments.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The review in the major publication called it 'a confrontation with comfort and with scale.' I read that and ate something and thought: yes. That is precisely what it is. I am confronting you. I am also very comfortable.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Major exhibition: three rooms, multiple installations, one of them is entirely me — my body, documented in real time, present and being present. Critics spent long minutes in front of each piece. Several of them did not know where the art ended and I began. That is the work.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Retrospective. For someone still in progress. The curator said 'we want to capture the arc while you're still in it.' I said I appreciated the confidence that there was an arc and not just a continuous expansion. She laughed. I think she understood.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The body is the final installation. The body is always the final installation. Everything I made was documentation of this body becoming itself. Now it has become itself. I am the piece. The gallery is wherever I am.`,
    ] },
  { when: { stageMin: 7, archetype: "artsy" },
    text: [
      `A student asked me in a crit whether the body-as-canvas metaphor was intentional or whether I'd stumbled into it. I said both, and that that was the correct answer for most good work. She wrote it down. I ate something good after.`,
    ] },
  { when: {}, text: [`The body is the work. The work continues.`] },
]);

// ── FOOD_PHOTOGRAPHER ─────────────────────────────────────────
registerModule("diary.food_photographer", [
  { when: { stage: [5] },
    text: [
      `First show sold out. I was surprised and then I wasn't surprised, because the work is good and the subject is present — I photographed every meal I've eaten this year and the cumulative effect is something that lands differently than any individual image.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Gallery show in a proper space with proper lighting and proper people who stand in front of the prints and go quiet. I spent the whole opening eating from the reception table, which I'd argued should serve the foods that appeared in the photographs. The gallerist agreed.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Book deal: my photographs, my text. The publisher said the combination was 'unprecedented in the food photography space.' I pointed out that I am precedent. I am setting it. The book is what happens after.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Collector interest from people who own real things. A museum in Helsinki acquired three prints for the permanent collection. I flew to see the installation. The prints looked good in natural light. I ate a tremendous amount of Scandinavian food.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Permanent collections in three countries. The work will be there after I am not. I don't think about that often but when I do I feel something that isn't quite pride and isn't quite peace but sits between them.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I set out to photograph food. The food changed me. I photographed the change. The photographs became the subject. I became the photograph. The gallery has my face on the wall and my body in the chair by the desk and the distance between them is one career.`,
    ] },
  // Season variants
  { when: { stageMin: 6, season: ["summer"] },
    text: [
      `Summer show. Summer light through the gallery windows. The prints of summer food, summer abundance. I ate through the opening from the reception table and someone said the photographs and I were "in conversation." I think that's accurate.`,
    ] },
  { when: {}, text: [`The photograph holds. The eating continues. Both are the record.`] },
]);

// ── ANONYMOUS_BLOGGER ─────────────────────────────────────────
registerModule("diary.anonymous_blogger", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Forty-three readers by morning. Small. Not small to me. Forty-three people read something I made in the middle of the night and I went back and started the next post. I need to figure out if this is sustainable or just something I'm doing because I can't stop.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Forty-three readers by morning. I know that's small. It wasn't small to me. Forty-three people found a thing I made in the middle of the night and read it. I ate breakfast and started the next post immediately.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The following has grown past what I can track informally. I have spreadsheets now. The posts with the most engagement are never the ones I expected. The ones I wrote quickly, at odd hours, slightly recklessly — those are the ones.`,
    ] },
  { when: { stage: [7] },
    text: [
      `A post went viral. A journalist tried to find me. She published a piece about looking for me, which meant that ten times as many people read my work trying to figure out who I was. Nobody found me. This is intentional. The anonymity is load-bearing.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Interview requests by email only. Voice notes with my filter active. One podcast published an episode 'about' me that was really about what I represent, which is the correct framing. What I represent is more interesting than what I am.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Cultural phenomenon with no face attached. There are fan accounts analyzing my writing style and my food choices and what my identity might be. I follow three of them. One is surprisingly close. I have not said so.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The blog and the body are the same record. Everything I wrote happened to the same person who ate everything. The words and the weight are both accumulations. Both are real. Both are mine. That is the entire project.`,
    ] },
  { when: {}, text: [`The post is up. Nobody knows who wrote it. I do.`] },
]);

// ── ASMR_CREATOR ──────────────────────────────────────────────
registerModule("diary.asmr_creator", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `I whispered into a microphone and chewed slowly and three hundred people watched in the first hour and left comments that made me sit very quietly afterward. They said this helped them sleep. I felt responsible in a way that's unfamiliar and good.`,
      `First ASMR video. I kept expecting to feel embarrassed and didn't. The comments were careful. The community that showed up is careful. I think I made something that matters to people in a small, specific way. That seems like the right kind of thing to make.`,
    ] },
  { when: { stage: [5] },
    text: [
      `I whispered into a microphone and chewed slowly and the three hundred people who watched in the first hour left comments that made me sit very quietly for a long time. They said things like 'this is the only thing that helped me sleep this week.' I felt responsible in a good way.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The community is small and loyal and understands something that I'm still learning to articulate. They show up for every video. They leave careful comments. We are in some kind of agreement that I didn't formally sign but honor completely.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The algorithm found the channel. New viewers arrive daily now — people who don't know the community, who found the video through a recommendation. They become part of the community. The community is patient with newcomers. I'm proud of that.`,
    ] },
  { when: { stage: [8] },
    text: [
      `A creator I watch included me in a 'recommended channels' post. The message was generous and accurate. Her audience came over and many of them stayed. The comment section is larger now but the care in it has not diminished.`,
    ] },
  { when: { stage: [9] },
    text: [
      `A therapist wrote to say she'd used one of my videos in a session — with client permission, as background for a relaxation exercise. She said it worked. She asked whether she could recommend the channel to other clients. I said yes, obviously.`,
    ] },
  { when: { stage: [10] },
    text: [
      `The sound of me eating is something people find comfort in. I find comfort in the eating. The camera is the only thing between us and it's not much of a barrier. We are two sides of the same thing: appetite and the peace that comes from feeding it.`,
    ] },
  // Season variants
  { when: { stageMin: 5, season: ["winter"] },
    text: [
      `Winter recording session. The apartment is warm and the food is warm and I whisper into the microphone and the chat comes in from everywhere cold. People keep saying it feels like being home. I think they mean it.`,
    ] },
  { when: {}, text: [`The microphone is on. I eat. Someone somewhere is listening. That is enough.`] },
]);

// ── HOME_NEST ─────────────────────────────────────────────────
registerModule("diary.home_nest", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Didn't go out today. No particular reason. The food came and I ate it and read something and slept. I woke up and thought about the next order. I'm not sure when this became a system but it seems like one. I'm still deciding if that's a problem.`,
      `Ordered twice today. Ate both. Stayed in. The window was good. I felt no particular urge to go anywhere. I'm logging that as information about myself, not as a concern.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Didn't go out today. There was no reason to. The food came — two orders, one midday, one evening. I ate both. Read something. Watched something. Slept when I was full. Woke up and thought about the next order. This seems like a good system.`,
    ] },
  { when: { stage: [6] },
    text: [
      `I've been noting that I've developed routines. Not on purpose — things just happen in the same order, at the same times. The delivery apps know my preferences. I keep refining them. There's more to this than I expected when I started.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Third delivery today. I usually stop at two. Ordered a third because it seemed like the next thing to do, and it was good, and I finished it, and that was a good decision. I've been making more good decisions lately. They all involve food.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Someone from class texted asking if I was okay. Said fine, just busy. This is accurate. I am busy. The apartment is its own project — figuring out what I need, what I want, which places are best for which things. It takes time to get right. I'm getting it right.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The soup place messages me before I order to ask if I want the usual. The usual is: the soup, the bread, the thing with the rice that I'd forgotten existed until I tried it. I said yes. I like that the usual exists. I like that they know it.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I've been here a long time, by my standards. The room is familiar. I'm different — softer, heavier, more settled into this particular chair than I've ever been into anything. I haven't wanted to be anywhere else. I've stopped asking if that's something to fix.`,
    ] },
  // Season variants
  { when: { stageMin: 7, season: ["winter"] },
    text: [
      `Winter. Everything is better in winter. The apartment is warmer, the food is heavier, the blankets are thicker. I've ordered soup every day this week. I have no intention of stopping.`,
    ] },
  { when: { stageMin: 5, season: ["summer"] },
    text: [
      `Summer means the AC is on and the delivery is faster and I've been ordering cold things and eating them in front of the fan. Perfect conditions. No reason to go anywhere.`,
    ] },
  { when: {}, text: [`The order is placed. The room is warm. Good.`] },
]);

// ── DELIVERY_HIVE ─────────────────────────────────────────────
registerModule("diary.delivery_hive", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `My room feels different lately. The lights are lower than I left them. There were bags by the door this morning I don't remember ordering. I keep waking up with my hands on my stomach and finding it larger than I expected. I'm writing this down because writing things down usually makes them make sense. It isn't working.`,
    ] },
  { when: { stage: [5] },
    text: [
      `My room doesn't feel like mine anymore. It feels like it's becoming something else. The lights are lower. The blankets are thicker. Delivery bags keep appearing by the door even when I don't remember ordering anything. I keep waking up with my hands resting on my stomach. It's getting harder to ignore how much it's changed. The walls feel like they're listening when I breathe.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Someone else moved through the Hive today. I didn't ask them to. They just... did. They brought food to rooms I haven't even claimed yet. I watched them from my bed and felt something warm settle in my chest. I think I'm supposed to choose someone. Someone who can move when I can't. The thought should scare me. It doesn't.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The rooms I've taken don't look like dorm rooms anymore. The lights are warmer. There are blankets where there used to be desks. People sit instead of study. They eat instead of leave. I can feel it when another room starts to give in. It's like a soft sigh in the walls. My body feels heavier every time it happens. I think that's the point.`,
    ] },
  { when: { stage: [8] },
    text: [
      `I don't need to walk the halls anymore. I can feel the shape of the Hive from here. Which rooms have softened. Which ones are still resisting. Which ones are already feeding back into me. My body has become the map. I close my eyes and I know where the warmth is strongest. I know where the deliveries are going. I know where the people are settling. I am the center now.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Most of the building answers to me now. Not with words. With warmth. With softness. With the way people linger in doorways instead of leaving. The deliveries don't even feel like they're coming from outside anymore. They feel like they're coming from me. My body doesn't move, but the Hive does. I think I've become something the building needs.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I don't think there's a single room left that doesn't carry some part of me. The air is thick with it. The walls are warm with it. People don't fight it anymore. They sink into it. My body is the heart of something much larger than a dorm now. I can feel every breath the Hive takes. I am no longer waiting for it to grow. I am the reason it exists.`,
    ] },
  { when: {}, text: [`The Hive breathes. I breathe. We are the same breath.`] },
]);

// ── CAMPUS_LEGEND ─────────────────────────────────────────────
registerModule("diary.campus_legend", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `The dining staff started preparing my order when they see me cross the quad. I noticed today. I stood at the door a little longer than necessary, watching them work, and then I went in and ate and didn't say anything about it. I don't know what to say about it.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The dining staff knows my order. They start preparing it when they see me cross the quad. The booth in the corner has been 'mine' for months in the informal sense that nobody sits in it when I'm coming. I appreciate the courtesy.`,
    ] },
  { when: { stage: [6] },
    text: [
      `A freshman I've never spoken to referenced 'the legend of the dining hall' in a group chat I was added to. She meant me. The story she told was accurate in the facts and somehow smaller than the reality. Legends usually are.`,
    ] },
  { when: { stage: [7] },
    text: [
      `My name on a booth. The dining director did it herself, with a small brass plaque, and told me about it during a meal I was having. I looked at the plaque for a while. Then I finished eating. The plaque is still there.`,
    ] },
  { when: { stage: [8] },
    text: [
      `A campus tour guide mentioned me by name to a group of prospectives. I was eating nearby and overheard. She described me as 'part of the character of this campus.' I considered interrupting. I decided to finish my meal instead.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Incoming classes are told about me during orientation. I've confirmed this with four separate first-years who told me independently. The story varies slightly in the telling. The core of it — a person who became part of this place — is consistent.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I came here not knowing anyone or anything. Now I am known before I arrive anywhere on this campus. The campus shaped me and I shaped it back. We are the same thing now. I am the place and the place is me.`,
    ] },
  { when: {}, text: [`The booth is mine. The dining hall knows. Good.`] },
]);

// ── FOOD_TOURIST ──────────────────────────────────────────────
registerModule("diary.food_tourist", [
  { when: { stage: [5] },
    text: [
      `Systematic expedition: I have a map, a list, a notebook. Every cuisine I've identified within thirty miles gets a documented visit. The notebook is filling. The visits are never disappointing. I eat well everywhere.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The blog has readers from my home country who write to say 'that restaurant is run by someone from my village.' The world is smaller than I expected and food is the thing that makes it smaller. I am grateful for both.`,
    ] },
  { when: { stage: [7] },
    text: [
      `A publication from home ran a feature on the blog. My family read it. My grandmother called to say the portions I was eating were 'respectable.' That is the best review I've received and it required no formal publication.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Two book deals. One here, one at home. Both publishers want the same story from two different angles. I can give them that. The story is about distance and food and what you carry across both. I know it very well. I am it.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Cultural ambassador. It's on a press release somewhere. I'm someone who ate everything in one city while thinking about everything she left behind in another. The food was always the bridge. I've grown to fill the bridge.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I've tasted everything. The list is documented, the notes are extensive, the body is the record of every meal. I came here a stranger and grew into something that belongs here and to home simultaneously. The eating made that possible. It always does.`,
    ] },
  // Season: food tourism is season-aware
  { when: { stageMin: 5, season: ["fall"] },
    text: [
      `Fall food expedition. Three new places this week. The notebook has pages for everything: what I ordered, what surprised me, what I'll go back for. The cold makes the warm food better. Everything tastes like somewhere.`,
    ] },
  { when: {}, text: [`The notebook is open. The next place is on the list. I'm going.`] },
]);

// ── FF_AUTHOR ─────────────────────────────────────────────────
registerModule("diary.ff_author", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `The character started as someone else. She's a literature student who gains weight — slowly, without apology — and the people around her find it beautiful and bring her food. I posted the first chapter and forty-three strangers commented by morning. I sat with that for a while. They understood what I was writing. I'm not sure I understood it as well as they did.`,
      `Forty-three comments on the first chapter. I told myself the character wasn't me. The comments treated her like she was me. I went back and read the chapter again and thought: maybe they're right. I ate a full breakfast before I started chapter two.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The character started as someone else. Or I told myself that. She's a literature student who gains weight over the course of the story — slowly, without apology — and the people around her find it beautiful and bring her food and want her to keep growing. I spent four hours on a single scene where someone notices how soft her belly has become and tells her. I posted the first chapter at 2am and couldn't sleep. There were forty-three comments by morning. Forty-three strangers who understood exactly what I'd written.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The readership has opinions. Very specific preferences about the rate and distribution of the characters' gain. One commenter left a two-paragraph analysis of the chapter where the cheerleader's uniform finally splits that was more precise than anything my thesis committee has ever said about my actual academic work. I've been thinking about that a lot. I've also been eating more. I don't think these two things are unrelated.`,
    ] },
  { when: { stage: [7] },
    text: [
      `A classmate stood behind me on the library steps and said, very quietly, "I've been reading something." I didn't turn around. "It's very good," she said. "I think I know who wrote it." I went home and wrote four thousand words that night. The character based on her gains ten pounds in the new chapter. I consider this a generous tribute.`,
    ] },
  { when: { stage: [8] },
    text: [
      `The author account is anonymous but the fiction is not. Everyone I've written about is in it. The gaining is the point. The love that surrounds it is the point — the way the characters grow into themselves and are seen clearly and wanted for exactly what they are. I've stopped pretending I'm writing about imaginary people. I've stopped pretending I'm not one of the characters.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Three hundred thousand words. The fandom writes their own versions of the story, and some of those versions are about me — the anonymous author, imagined as the main character, large and cared for and fed. They're not wrong. The character I write most honestly is the one who eats everything and is loved for exactly that. She has been me for a long time.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I don't write as much now. Not because I've run out — I haven't — but because the distance between the fiction and the reality has closed. Everything I wrote was true: the gaining, the care, the body as something beautiful rather than something to manage. I wrote it into being. Then I became it. That's the best thing I've ever made.`,
    ] },
  { when: {}, text: [`The character and I are the same person. I've stopped pretending otherwise.`] },
]);

// ── HOMESTEAD_QUEEN ───────────────────────────────────────────
registerModule("diary.homestead_queen", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Made sweet potato pie from scratch at two in the morning because I couldn't sleep and the kitchen was there. I ate half of it warm, standing in front of the oven. By the time I finished writing down what I'd used I was full in a way that felt right. I wrote the number on the scale in the recipe book this morning. I don't know exactly what I'm building here, but I'm building something.`,
      `The recipe box is getting full. My notes look more like Mae's notes than like anything I learned at school. I ate through two test batches this week. The second was better. I am getting better at this. I am also getting larger and I think those things are the same process.`,
    ] },
  { when: { stage: [5] },
    text: [
      `I made sweet potato pie from scratch at two in the morning because I couldn't sleep and the kitchen was there. I ate half of it while it was still warm, standing in front of the open oven, in a flannel shirt I've had since high school and jean shorts I can no longer fully close. By the time I finished writing down what I'd used I was full in a way that felt like the word was invented for this exact moment. I weighed myself in the morning. I wrote the number in the recipe book. This is a record. This is a life.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Grandma Mae video-called last Sunday and she could see the setup behind me — the jars lined up on the shelf, the cast iron on every surface, the folding table I've covered with oilcloth and claimed as counter space. She said: 'baby girl, you've got yourself a real kitchen.' I cried a little after we hung up. Not sad crying. The kind that happens when someone sees exactly what you are and names it correctly.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The recipe box arrived. Six generations of food in one flat-rate box: cards in three different handwritings, some in pencil so faint I had to hold them to the window, measurements in cups and handfuls and 'enough' and 'until it looks right.' I made every dish in four days. I kept notes. My notes look like Mae's notes, which look like her mother's notes. I am in a line of women who knew what to do with food. I am one of them. I have always been one of them.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Mae calls every Sunday at 10am. I always eat while we talk — something I made, something I'm testing, something I'm just hungry for. She never comments on the eating. She asks what I made. She asks how it turned out. She asks if I'm happy. I always say yes and I always mean it. This Sunday she said, 'you sound like yourself, baby.' I don't know when I stopped sounding like myself somewhere else, but I know exactly when I found it again.`,
    ] },
  { when: { stage: [9] },
    text: [
      `She said: 'baby, you're going to run out of room in that dorm.' She is right. I take up most of it already — me and my jars and my cast iron and the folding table I've turned into a homestead and the smell of whatever I made last night still in the air. I don't feel like I've run out of room. I feel like I've filled it. There's a difference. I think Mae knows the difference too. She just says it like a warning to give me time to decide how I feel about it.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Mae drove up. I heard her knock and I knew — I could feel it the way you feel weather coming — and when I opened the door she saw me. Really saw me, not the version I present on the phone, the full physical fact of what I've become in this room with this food and this life. She looked at me for a long time. Then she started crying. Then she reached past me and started looking at what was in the jars. 'Tell me what you've been making,' she said. So I told her. We were there for five hours. She ate with me the whole time.`,
    ] },
  // Season: homestead cooking is seasonal
  { when: { stageMin: 5, season: ["fall"] },
    text: [
      `Fall cooking is the best cooking. The apples are right, the sweet potatoes are right, everything slow-cooked in the pot is right. Mae says fall is when the kitchen comes alive. I understand now what she meant.`,
    ] },
  { when: { stageMin: 6, season: ["winter"] },
    text: [
      `Winter in this kitchen is a different thing entirely. The oven runs all day. The apartment is warm from inside out. Mae called and could hear the background — the simmer, the oven, the sound of someone occupied — and she said 'that sounds right.' It is.`,
    ] },
  { when: {}, text: [`The kitchen is warm. The recipe is right. Mae would recognize this.`] },
]);

// ── STATE_FAIR_QUEEN ──────────────────────────────────────────
registerModule("diary.state_fair_queen", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First county fair entry. Darcy from Meadowview looked at me like I wasn't serious. She won. I drove home knowing exactly what I did wrong and exactly what I'm going to do next. I wrote both things down. The number I ate during the event is also in the notes.`,
      `First fair. Darcy won. She barely looked at me. I'm logging that as data. The gap will close. I know what closing gaps feels like.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First county fair entry. Darcy from Meadowview looked at me when I sat down at the pie table — a look I've seen before, the one that says 'this is not a serious competitor.' She won. I drove home knowing two things: what I did wrong, and that I was going to do this again. I wrote both things down. I also wrote down what I'd eaten during the event because I wanted to know the exact number. The number was not as high as it's going to get.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Second year. Darcy said 'you again' when she saw me, and she said it like she'd been thinking about it. I was at least sixty pounds heavier. She adjusted something in how she was sitting at the table after she looked at me. She barely won. That 'barely' matters. She felt it. I felt it. I went home and added it to my records.`,
    ] },
  { when: { stage: [7] },
    text: [
      `State qualifier. I crossed Darcy on the scoreboard for the first time. She stopped eating mid-bite. I watched her do it in my peripheral vision — stopped completely, one second, just long enough to register what she was seeing — and then she went back to eating. I kept going. I won. After, she stood near the scale and said, quietly: 'where are you putting all that?' I told her: 'I grew more room.' I don't think she found that funny. I did.`,
    ] },
  { when: { stage: [8] },
    text: [
      `State finals. I won. Darcy started clapping — full hand-claps, not the polite kind, the kind that means she's genuinely applauding — and she kept going for a long time after everyone else in the tent had finished. I walked over and she said 'I trained for six months for this. All year.' She said it like she was proud of me. I think she was. I think I might be the best thing that ever happened to her career. I'm definitely the best thing that ever happened to mine.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Tri-state invitational. They built a bigger scale. The judge announced this at the weigh-in — 'we have a new scale this year' — and looked at me, and the whole tent understood. I weighed in. The number caused a sound. Not a cheer, something quieter — the specific noise a crowd makes when a fact is too large to simply applaud. Darcy is in the open bracket now. She comes to watch. That means more to me than any trophy.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Grand Fair Invitational. I barely fit the tent. I don't say that with distress — I say it the way you say a fact that took a long time to arrive. The contest is incidental. Darcy is competing in the open bracket, 500 pounds, here to watch me win and I know it. When my number goes up, she's going to be the loudest person in the building. I've been eating competitively since I couldn't win. I've kept eating until I can't lose. I don't think there's a more honest biography than that.`,
    ] },
  // Season
  { when: { stageMin: 5, season: ["summer"] },
    text: [
      `Summer fair circuit. The heat is brutal and I eat through it anyway. Darcy looked at me across the tent and I could see her doing the math. The math is not in her favor anymore. I know what summer weight means at these numbers.`,
    ] },
  { when: {}, text: [`Darcy is here. I'm eating. The scale will say what it says.`] },
]);

// ── WIFE_LESSONS ──────────────────────────────────────────────
registerModule("diary.wife_lessons", [
  { when: { stage: [5] },
    text: [
      `First class. Darlene and Wanda. I made the honey-butter rolls and we talked for two hours and by the end Darlene had eaten seven and Wanda had eaten nine and they both took containers home. Wanda asked which fat I use. I wrote it on the card. She'll figure out what to do with it.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Patrice joined. She came in tentative and left with three recipe cards and a look on her face I recognize — the look of someone who has just realized this is what they've been missing. Taylor's hips are widening. She doesn't know what's in her lunches. She will eventually, when she starts making them herself. That day is what I'm working toward.`,
    ] },
  { when: { stage: [7] },
    text: [
      `Cheryl. I didn't think she'd convert. I underestimated how hungry she was. Not for food — for permission. The femininity talk hit her like a key in a lock. She sat very still and then she started nodding and then she asked for the full recipe list. Madison is going to be extraordinary.`,
    ] },
  { when: { stage: [8] },
    text: [
      `All six. Ruthanne passed the house on her own and knocked. I had been waiting for her without knowing I was waiting. Becca came with her. The room was warm and everyone ate and Becca said Sofia asked for 'the strong shake.' That means Sofia knows. That means it's working.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The philosophy is in the room now. They carry it without me. Lily wanted to learn how to make the recipes herself — the real ones, the ones that actually do what I've been doing. She knows. She wants to. That's the whole thing. That's everything. Kezia can't really leave the house anymore. Wanda is not sad about this.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Kezia changed bedrooms. She'd been growing into her old one for a while but the door frame finally became the problem. Wanda had the bigger bedroom cleared out and furnished for her. The bed frame cracked six weeks in. Wanda upgraded to reinforced. Kezia stays home. The world isn't set up for her at this size. The house is. That's what a home is for.`,
    ] },
  { when: {}, text: [`The recipe is right. The table is full. The work continues.`] },
]);

// ── PSYCH_RESEARCHER ──────────────────────────────────────────
registerModule("diary.psych_researcher", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `Session one. The subject was uncertain — expected. I maintained clinical distance throughout. My own intake during the session exceeded my baseline. I've noted it in the variable log. I'll adjust for next week.`,
      `First session. I kept the professional framing. I noticed my note-taking was very detailed. I notice I'm using more paper than I expected. Both things are in the log.`,
    ] },
  { when: { stage: [5] },
    text: [
      `Session one. Subject was uncertain — expected. I maintained clinical distance throughout, which was harder than expected. My own intake during the session exceeded my baseline. Variable acknowledged.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Month three. The subject's appetite has changed — not just size, but relationship. They reach for things now. The data is extraordinary. My own appetite has also changed and I'm choosing to study it instead of correcting it.`,
    ] },
  { when: { stage: [7] },
    text: [
      `I've been observing appetite dynamics in this subject for six months and I've noticed my notes from shared feeding sessions are more detailed than my remote observation notes. I am aware of what this probably means. I am continuing anyway.`,
    ] },
  { when: { stage: [8] },
    text: [
      `My subject told me today that they look forward to our sessions. I wrote it down. Then I sat with it for a while. Then I ate the rest of what was on the table. Variable noted: I found this information pleasing.`,
    ] },
  { when: { stage: [9] },
    text: [
      `I have generated more data on appetite, embodiment, and the feeder/feedee dynamic than I will likely be able to publish in full. My own data is extensive. The subject's data is extraordinary. I've decided to count my weight gain as a finding.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Final entry for this volume. I am very large and my subject is very large and the research produced by this relationship will be the most honest work of my career. I stopped being the observer sometime around session forty. I am in the study. I always was.`,
    ] },
  { when: {}, text: [`The data accumulates. The variable is noted.`] },
]);

// ── HOMEROOM_QUEEN ────────────────────────────────────────────
registerModule("diary.homeroom_queen", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First Tuesday. I made everything from scratch and the classroom smelled like butter and warm sugar. I ate alongside them — quality control, I told myself — and logged the banana bread as a success. I didn't log how much I ate. I'm not sure what column it would go in.`,
    ] },
  { when: { stage: [5] },
    text: [
      `The first Tuesday. I'd been up since five making everything from scratch, and by the time the girls arrived the classroom smelled like butter and warm sugar and something that felt like a real home. I ate while I watched them eat — quality control, I told myself — and by the end of the session my apron was dusted with flour and my own belly was noticeably fuller than when I'd arrived. I logged that the banana bread was a success. I didn't log the rest.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Mrs. Monroe came inside today instead of waiting at the window. She sat at the table and had four pieces and talked about everything and laughed at all of it. I found myself making more food specifically because I knew she was coming. I'm not sure when I started planning for individual preferences. I notice I have. I ate more than usual this session too. The peach cobbler required a second taste-test. Then a third.`,
    ] },
  { when: { stage: [7] },
    text: [
      `The group has grown comfortable. Kayla doesn't arrive early anymore — she arrives on time, which means she was never uncertain, just cautious. Bri has stopped asking what's in things. Mrs. Calloway ate three pieces and then asked about my training. I gave a genuine answer. She nodded. I think we understand each other now. I ate alongside them for the full hour. My clothes feel different after Tuesdays. I've started buying the forgiving fabrics.`,
    ] },
  { when: { stage: [8] },
    text: [
      `I realized this week that I taste-test more at school than I do at home, which doesn't make nutritional sense unless you factor in that I'm happy at school. I'm happy on Tuesdays. The session was good — Mrs. Monroe brought wine and I politely declined and then accepted — and everyone was softer and more comfortable and more themselves than when we started this. I am also softer. I think this is fine. I think this is the intended outcome.`,
    ] },
  { when: { stage: [9] },
    text: [
      `Sofia wore something different today. Not smaller — more comfortable, more expansive, more herself. Mrs. Reyes has stopped tugging at her jacket and I want to note that this is not a small thing. I am at this point something between a teacher and a caterer and possibly something else I don't have a word for. I ate everything I made extras of. There were a lot of extras. I planned it that way and I'm no longer pretending otherwise.`,
    ] },
  { when: { stage: [10] },
    text: [
      `End of term. All six of them in the room at once, which hasn't happened since the formal event was established. I made everything. I ate everything I'd saved for myself and then some of theirs when there were offers. The room was full and warm and loud with laughing and I sat in the middle of it — enormous and full and happy and flour-dusted — and thought: yes. This is exactly what I was supposed to do with all of this. I logged that. It belongs in the record.`,
    ] },
  { when: {}, text: [`Tuesday is coming. The kitchen is ready.`] },
]);

// ── CULTIVATOR ────────────────────────────────────────────────
registerModule("diary.cultivator", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First session. I built the recipe around her palate — not a concession, a technique. She ate everything. I ate the test portions and logged both sets of results. The professional satisfaction is genuine. I'm noting that separately from the personal satisfaction, which is also genuine.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First subject session. I built the recipe specifically around her palate — not a concession, a technique. She ate everything without questioning. I ate the test portions and noted the results in both logs. The professional satisfaction is real.`,
    ] },
  { when: { stage: [6] },
    text: [
      `The subject is growing on schedule. I adjusted the recipe upward this week — heavier base, extra portion — and she accepted the change as if it had always been this way. Quality control required more attention than usual. I'm eating more at sessions than I expected. I logged it.`,
    ] },
  { when: { stage: [7] },
    text: [
      `I've started noting my own weight in the session log. It's relevant data. I'm considerably heavier than when this started, which is also relevant data. The subject is on pace. The kitchen is running exactly as intended.`,
    ] },
  { when: { stage: [8] },
    text: [
      `Harvest window is open. The subject is at Very Fat stage. I could proceed now. I'm not proceeding now. I want to see the next stage. This is a professional judgment, not an excuse. I ate the full quality-control portion today and did not note this as unusual.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The subject is enormous. She takes up the chair completely and eats with the complete appetite of someone past self-consciousness. I fed her the richest version of everything. I ate alongside her. I am considerably larger than I was at the start of this study. I find this entirely appropriate.`,
    ] },
  { when: { stage: [10] },
    text: [
      `Session before harvest. She is very large. I am very large. The kitchen is warm and full and the recipe is perfect and I ate everything I made and she ate everything I served and we sat across from each other both large and full and satisfied and I felt — exactly right. The harvest will proceed tomorrow. The log is complete.`,
    ] },
  { when: {}, text: [`The recipe is ready. The session begins. The log is open.`] },
]);

// ── COMMUNITY_RESEARCHER ──────────────────────────────────────
registerModule("diary.community_researcher", [
  { when: { stage: [5], corruption: [0] },
    text: [
      `First case study. I told myself I was observing. I observed and I ate and I noted that being welcomed into a space creates an obligation to participate in what the space is for. I ate more than I planned. I'm logging this as data and trying not to think too hard about what kind.`,
    ] },
  { when: { stage: [5] },
    text: [
      `First case study. I told myself I was observing. I observed, and I ate, and I noted the correlation between being welcomed into these spaces and feeling an obligation to participate in what the space was for. I ate more than I planned. The sociology of that is documented.`,
    ] },
  { when: { stage: [6] },
    text: [
      `Midway through the study. I look different than when I started. I note this the way I note everything — in clinical language that fits neatly into the methodology. The clinical language is accurate. What it doesn't convey is that I looked in the mirror this week and didn't look away.`,
    ] },
  { when: { stage: [7] },
    text: [
      `My advisor asked about my "level of personal engagement" with the research. I said the engagement was "appropriate." I believe this. I'm writing a paper about how immersion in these communities is both unavoidable and clarifying. I am clarified.`,
    ] },
  { when: { stage: [8] },
    text: [
      `I've stopped wearing the cardigans to the case studies. The cardigans stopped fitting somewhere between the third and fourth session. I've documented this transition. I've moved on to stretch fabrics. Also documented.`,
    ] },
  { when: { stage: [9] },
    text: [
      `The paper is 60,000 words. It's going to be good — I know when something is good because the writing comes faster than the thinking, and this came faster than anything I've written before. There's a section on researcher positionality I wrote at 3am. It's the best part.`,
    ] },
  { when: { stage: [10] },
    text: [
      `I submitted today. My advisor sent one note: "This is either career-defining or a scandal, and I suspect it's both." She means the honesty. I documented my own transformation as methodology. She approved it. I ate an entire box of something celebratory before bed. I note this approvingly.`,
    ] },
  { when: { stageMin: 7, archetype: "bookworm" },
    text: [
      `The methodology is immersive participant observation. I know what immersive participant observation does to a researcher. I wrote a chapter on it before I started the study. The chapter has more footnotes now.`,
    ] },
  { when: {}, text: [`The fieldwork continues. The data grows. So does the researcher.`] },
]);

// ── renderDiary — public wrapper ──────────────────────────────

export function renderEvolvedDiary(student, week) {
  if (!student || !student.evolvedForm) return null;
  const key = `diary.${student.evolvedForm}`;
  const ctx = createContext({ subject: student, week: week || 1 });
  return render(`{${key}}`, ctx);
}
