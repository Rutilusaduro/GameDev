// Branching evolved-form events — MIGRATION.md extract (engine: scenes/evolved/).
import { getStage } from './stages.js';
import { SALON_EVOLVED_EVENTS } from './chloeSalon.js';
import { GALLERY_EVOLVED_EVENTS } from './fionaGallery.js';

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
            {id:"load_hard",label:"Load aggressively — eat everything on the table",result:`You eat everything. All of it. Your belly goes from full to very full to the specific warm heaviness of a body that is ready to work. The competitor from State is watching you with an expression that is not entirely polite. Maya still hasn't looked over.`,lbs:10,rel:4,flag:"loaded"},
            {id:"eat_smart",label:"Eat with discipline — full enough to compete, room to grow",result:`You eat with the focus of someone who has been thinking about this. Measured, controlled, your belly filling to the point you want. You stop. You breathe. You feel ready and you've left room to expand into when the competition table is in front of you.`,lbs:6,rel:5,flag:"paced"},
          ]
        },
        {
          text:(h,s)=>`They call your name for the weigh-in. You step to the scale at the front of the staging area. The other competitors' numbers are already on the board — the highest is 218. Maya is 330. You step on.

The scale settles at ${Math.round(s.lbs)} pounds. The judge reads it. He reads it again.

The competitor from State — 178 lbs, two years in the circuit — says to the person next to her: "Is that right?" She genuinely wants to know. Maya looks over from her warmup table for the first time.`,
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
          text:(h,s)=>`She's been in the chapter kitchen since two in the afternoon and it's now seven and the table is extraordinary. She is ${Math.round(s.lbs)} pounds in her hostess apron, belly warm and rounded against it, moving through the kitchen with the ease of someone who has been planning this for weeks. The sorority sisters are gathering. Your hall residents are here, both of them, and several other chapter members in various stages of arrival.`,
          choices:[
            {id:"arrive_with_more",label:"Arrive with additional food — double the dessert course",result:`You arrive with a significant supplemental course: desserts, dense and sweet, more than the table needs. She sees what you've brought and incorporates it without hesitation. The table becomes larger than she planned.`,lbs:5,rel:7,flag:"extra_food"},
            {id:"help_serve",label:"Help serve — be useful, watch how she runs it",result:`You help carry plates and she runs the service and you learn something about how she does this: with complete authority and genuine pleasure, making sure every plate is full before she sits down.`,rel:9},
          ]
        },
        {
          text:(h)=>h.includes("extra_food")
            ?`Midway through the feast. The extra dessert course is visible in the dynamic at the table — sisters eating past the point of full, coming back for more because more is there. Your hall residents are both on generous helpings. Your hostess is eating at the head of the table with the deliberate, pleasured focus of someone who has made something she's proud of.`
            :`Midway. The table is active, the food is going, your hall residents are both eating well. She presides from the head, eating steadily.`,
          choices:[
            {id:"encourage_seconds",label:"Encourage the sisters to go back for more",result:`You circulate and suggest seconds to everyone. Several take you up on it. Your hall residents both return for second plates. She watches this from the head of the table and nods once.`,rel:8,feedOther:{archetype:"sorority",lbs:4,text:"Your hall residents go back for seconds. The food finds them."}},
            {id:"talk_with_hostess",label:"Talk with her while she eats",result:`You sit near her and she talks while eating — about the table, the recipes, what she wants to add next time. She eats through the whole conversation without slowing.`,lbs:6,rel:10,flag:"personal_moment"},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("extra_food")&&h.includes("encourage_seconds")) return `End of feast. The table is cleared. The hall residents are full — visibly, warmly full — and several sisters are still eating from the dessert course. She sits at the head of the table with her belly warm and round against her clothes, ${Math.round(s.lbs)} pounds plus tonight's considerable intake, and surveys the room. Everyone she wanted to feed has been fed.`;
            return `End of feast. Table cleared. The sisters are fed. She's satisfied.`;
          },
          choices:[
            {id:"end_of_feast_talk",label:"Stay after — help her clean up, talk",result:`You stay and help. She talks while cleaning: "I want these tables bigger. I want the sisters eating more each time. I want them coming in knowing they're going to leave heavier." She says it plainly. She means it.`,rel:12,flag:"vision_shared"},
            {id:"leave_with_group",label:"Leave with the sisters, let her have the close",result:`You say goodnight with the departing group. She stands at the door, enormous and warm, saying goodnight to each one personally.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds")&&h.includes("vision_shared"),text:`First feast down. She said she wants them "coming in knowing they're going to leave heavier." The hall residents are heavier. The table was extraordinary. Her belly was warm and full and she meant everything she said.`,gainBonus:10,relBonus:13},
        {condition:h=>h.includes("extra_food")&&h.includes("encourage_seconds"),text:`Good feast. Extra food, seconds encouraged, hall residents are heavier. She's building exactly the culture she described.`,gainBonus:7,relBonus:8},
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
            ?`Midway through the feast. Twelve courses in and a thirteenth on the way and the table is eating with sustained, pleasured focus. Your hall residents are deep in it — both of them, eating with the ease of women who have been doing this for months. Their bellies, noticeably rounder than when the semester started, press their blouses warmly. Your hostess is on her fifth plate and watching everything with warm satisfaction.`
            :`Midway. The table is deep into the feast. Your hall residents are eating well. She watches from the head and eats steadily.`,
          choices:[
            {id:"triple_dessert",label:"Fund triple dessert — for everyone, extra portions",result:`You fund a triple dessert course: three rounds, substantial portions, enough that by the end the table is extremely full. Your hall residents eat through all three. The sisters are in various states of very warm, very full contentment.`,rel:10,flag:"triple_dessert",feedOther:{archetype:"sorority",lbs:6,text:"Your hall residents eat through the triple dessert course. They are going to feel this tomorrow."}},
            {id:"seat_beside_her",label:"Sit beside her for the second half",result:`You take the seat beside her and she talks while eating — about each course, about what she's been planning, about what she wants the feasts to become. She eats through the conversation. She never stops.`,lbs:8,rel:11,flag:"close_moment"},
          ]
        },
        {
          text:(h)=>{
            if(h.includes("extra_food")&&h.includes("triple_dessert")) return `End of feast. The table is cleared. The hall residents are full in a way that will last through tomorrow. Several sisters haven't moved from their seats in forty minutes. She sits at the head of the table and her belly is vast and warm and round against her clothes and she has fed everyone exactly as much as she intended. She looks at the room and is completely satisfied.`;
            return `End of feast. Table cleared. Everyone is fed. She is satisfied.`;
          },
          choices:[
            {id:"private_close",label:"Stay after — share the last course with her, just you",result:`Everyone else leaves. You sit with her at the cleared table and she finds the last serving of something and puts it between you and you eat together in the quiet kitchen. She says: "I want to do this every week until I can't cook it fast enough." You both understand what that means.`,rel:14,flag:"intimate_close"},
            {id:"group_send_off",label:"See the sisters out with her",result:`You stand at the door with her as the sisters leave. She is 320 pounds and warm and full and enormous in the doorway and she says goodnight to each one personally.`,rel:6},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert")&&h.includes("intimate_close"),text:`Extraordinary feast. Triple dessert, thirteen courses, the hall residents heavier, and you ate the last course together in the quiet kitchen and she said she wants to do this until she can't cook it fast enough. Her belly was warm and vast and full and she meant all of it.`,gainBonus:13,relBonus:15},
        {condition:h=>h.includes("extra_food")&&h.includes("triple_dessert"),text:`Extraordinary feast. The hall residents are noticeably heavier. The culture has matured into something significant.`,gainBonus:8,relBonus:10},
        {condition:h=>h.includes("extra_food"),text:`Very good feast. The extra course was right. She'll plan even larger next time.`,gainBonus:5,relBonus:6},
        {condition:()=>true,text:`Good feast. The culture is established. She runs it better every time.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 7 — ~419 lbs
    {
      title:"Alumni Dinner",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the alumni dinner, which is the largest event the chapter has held. A dozen alumni, several of them substantial women in their own right, including one at around 340 pounds who has been funding the feasts for three years without ever attending one. Your hall residents are here. The table is extraordinary — eighteen courses, the kitchen running since morning. She presides at ${Math.round(s.lbs)} pounds, her belly enormous and warm, completely at ease.`,
          choices:[
            {id:"coordinate_kitchen",label:"Help coordinate the kitchen — ensure she can host, not cook",result:`You manage the kitchen logistics so she can focus on the hosting. She circulates the table, talking, serving, attending to the alumni personally. Her belly, enormous at 419 pounds, presses past guests as she moves through the room. Nobody minds. Several alumni watch her with complicated expressions.`,lbs:6,rel:10,flag:"coordinated"},
            {id:"introduce_her",label:"Introduce her to the primary funder as the architect of this culture",result:`You introduce her to the 340-pound alumna specifically, as the woman who built what the alumna has been funding. The alumna looks at her — 419 pounds, warm, enormous — and says: "I've been funding this for three years and I didn't understand what it was until now." She's smiling when she says it.`,rel:12,flag:"funder_met"},
          ]
        },
        {
          text:(h)=>h.includes("funder_met")
            ?`Midway. The 340-pound alumna has been eating since the introduction. She's been eating with the focused attention of a woman who has been missing this for years without knowing what she was missing. Your hall residents are both deep in it. Your hostess is eating at the head of the table and watching the whole room with the warm satisfaction of a person feeding exactly the people she wants to feed.`
            :`Midway. Eighteen courses and the alumni are responding well. Your hall residents are eating with practiced ease. She presides and eats.`,
          choices:[
            {id:"extra_course_alumni",label:"Fund an additional course specifically for the alumni",result:`You supplement with a nineteenth course, timed for the late middle of the dinner. The alumni eat it. The 340-pound alumna eats it twice. Your hall residents are on their fourth plates and showing it.`,rel:9,feedOther:{archetype:"sorority",lbs:6,text:"Your hall residents eat through the extra alumni course. They're well past comfortable and haven't considered stopping."}},
            {id:"sit_with_hostess",label:"Sit beside her and watch her work the room",result:`You sit beside her and she eats and you watch her watch the table — assessing, adjusting, sending another plate to someone who's slowing, refilling the glass of someone who's still going. She is magnificent at this.`,lbs:8,rel:11},
          ]
        },
        {
          text:(h,s)=>{
            if(h.includes("funder_met")&&h.includes("extra_course_alumni")) return `End of dinner. The table is cleared. The alumni are in various states of warm, full contentment — the 340-pound alumna hasn't moved in an hour and looks very pleased about this. Your hall residents are visibly heavier than when they arrived. She sits at the head of the table, ${Math.round(s.lbs)} pounds plus everything she's cooked and eaten, and the alumna across the table says: "I've been funding this without understanding it. I understand it now." Your hostess puts another course in front of her.`;
            return `End of dinner. Table cleared. Alumni fed. She has demonstrated what she's built.`;
          },
          choices:[
            {id:"after_dinner_planning",label:"Stay for after-dinner planning — the next feast",result:`After the alumni leave she stays at the table with you and the hall residents and talks about the next feast: bigger, more courses, more food. She eats what remains while she talks. The hall residents eat with her. The planning is extensive.`,lbs:8,rel:14,flag:"next_planned",feedOther:{archetype:"sorority",lbs:5,text:"Your hall residents eat through the after-dinner planning session. They go home heavier than they arrived."}},
            {id:"walk_out_alumna",label:"Walk the primary alumna out — cultivate the relationship",result:`You walk the 340-pound alumna to the door and she says: "I'd like to come back next month." You arrange it. The culture gains a powerful ally.`,rel:9},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni")&&h.includes("next_planned"),text:`Alumni dinner success. The funder said "I understand it now" and your hostess put more food in front of her. The hall residents went home heavier. The next feast is already planned. Her belly was warm and enormous and full and she was satisfied with everything she built.`,gainBonus:17,relBonus:15},
        {condition:h=>h.includes("funder_met")&&h.includes("extra_course_alumni"),text:`Alumni dinner success. The funder converted. The hall residents are heavier. The culture has been demonstrated to its patron.`,gainBonus:11,relBonus:10},
        {condition:h=>h.includes("funder_met"),text:`Alumni dinner. The funder met the hostess. The relationship is established.`,gainBonus:5,relBonus:7},
        {condition:()=>true,text:`Alumni dinner. Well-run. The table was extraordinary.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 8 — ~519 lbs
    {
      title:"Rush Season Opening Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and rush season, which means the opening feast is the most important table she will set this year: this is what the incoming pledges will be told they're joining. She has been planning for three weeks. The table is the largest she has ever set. Your hall residents are here as the cultural anchor — both of them, well-established, noticeably heavier than when they started. She stands at the head of the table at ${Math.round(s.lbs)} pounds and her belly is vast and warm and real and she looks exactly like what she is.`,
          choices:[
            {id:"full_opening_spread",label:"Fund the opening spread fully — anything she wants",result:`You've told her: anything she wants for the opening feast. She has used this completely. The table is seventeen courses and the kitchen has been running for eight hours and she is 519 pounds of warmth and certainty at the head of it and the pledges who are about to arrive are going to understand something new about what they've joined.`,lbs:12,rel:9,flag:"full_funding"},
            {id:"brief_pledges",label:"Brief the incoming pledges before they arrive",result:`You meet the pledges at the door and give them context: this feast is the chapter's founding culture. The woman at the head of the table built it. They're being invited to participate in it. Several of them look at each other. None of them leave.`,rel:11,flag:"pledges_prepared"},
          ]
        },
        {
          text:(h)=>h.includes("full_funding")
            ?`Midway. The pledges are eating — tentatively at first, then with increasing conviction, as the culture of the table becomes clear. Your hall residents are modeling: eating steadily, warmly, without apology. Several pledges have gone back for seconds. Your hostess is at her fourth plate and her belly, enormous and warm, is a presence at the head of the table that communicates the standard.`
            :`Midway. The pledges are finding their rhythm. Your hall residents are modeling the culture. She presides and eats.`,
          choices:[
            {id:"push_pledges_further",label:"Fund additional courses specifically for the pledges",result:`You fund another two courses for the pledges specifically, timed for the mid-feast energy dip. The pledges eat. Several of them have stopped putting their forks down between bites. Your hall residents eat the extra courses too, with the ease of women who have been doing this for a year.`,rel:10,feedOther:{archetype:"sorority",lbs:7,text:"Your hall residents eat through the extra pledge courses with practiced ease. They are going to need to update their wardrobes."}},
            {id:"hostess_speech",label:"Ask her to say something to the pledges midway through",result:`You suggest it and she stands — 519 pounds, warm, vast, her belly enormous against her hostess clothes — and tells the pledges exactly what this table is: a culture, a commitment, a choice about what kind of life to build. Several pledges are visibly moved. Several are eating harder.`,lbs:8,rel:12,flag:"speech_given"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("full_funding")&&h.includes("push_pledges_further");
            if(full) return `End of feast. The pledges are in various states of very full, warm contentment — several of them haven't moved in thirty minutes and look completely comfortable about this. Your hall residents are visibly heavier than when the feast started. She sits at the head of the table at ${Math.round(s.lbs)} pounds plus everything she's eaten tonight and surveys the room: the pledges, the sisters, the empty dishes. She is satisfied.`;
            return `End of feast. Table cleared. Pledges fed. The culture has been transmitted.`;
          },
          choices:[
            {id:"close_with_pledges",label:"Stay for the pledge close — hear her speak to them",result:`After the main feast clears she speaks to the pledges directly: what the chapter is, what she expects, what they've just participated in. She says her weight out loud — 519 pounds — and says: "I built this at every size. This is the culture." The pledges look at her with the expression of people who have just understood something important.`,rel:14,flag:"pledge_close"},
            {id:"leave_early_with_senior_sisters",label:"Leave with the senior sisters — let her close alone",result:`You leave with the senior group. She stays behind with the pledges and the hall residents to close the feast.`,rel:5},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further")&&h.includes("pledge_close"),text:`Rush season opening feast. She said "519 pounds, I built this at every size" and the pledges understood. Your hall residents are heavier. The culture has been transmitted to the incoming pledge line and it will persist.`,gainBonus:19,relBonus:16},
        {condition:h=>h.includes("full_funding")&&h.includes("push_pledges_further"),text:`Opening feast. Fully funded, pledges fed extra, hall residents heavier. The culture is transmitted.`,gainBonus:12,relBonus:11},
        {condition:h=>h.includes("full_funding"),text:`Opening feast. Full table. The pledges understand what they've joined.`,gainBonus:7,relBonus:7},
        {condition:()=>true,text:`Opening feast. Table cleared. Culture transmitted.`,gainBonus:0,relBonus:4},
      ]
    },
    // stage 9 — ~630 lbs
    {
      title:"Annual Grand Feast",
      phases:[
        {
          text:(h,s)=>`${Math.round(s.lbs)} pounds and the annual grand feast, which is the event the chapter now plans the entire year around. She has been in the kitchen since six in the morning. It is now six in the evening. The table is the most extraordinary thing she has ever set: twenty-three courses, warm and fragrant and prepared entirely by her. Your hall residents are here — both of them, deeply embedded in the culture, substantially heavier than when this started. The whole chapter is here.`,
          choices:[
            {id:"witness_setup",label:"Arrive early — watch her set the table",result:`You arrive at five and watch her work the final hour of preparation: the last courses, the table arrangement, the care she brings to each placement. She is 630 pounds moving through the chapter kitchen with total command. Her belly, vast and warm and apron-hanging, brushes the counter as she passes and she doesn't pause.`,lbs:8,rel:11,flag:"witnessed_setup"},
            {id:"full_supplemental",label:"Bring a supplemental feast — match her twenty-three with ten more",result:`You arrive with ten additional courses, high quality, warm. She looks at what you've brought and says: "Good." She incorporates all of it. The table becomes the largest any of them have ever seen.`,lbs:10,rel:9,flag:"supplemented"},
          ]
        },
        {
          text:(h,s)=>h.includes("supplemented")
            ?`Midway — thirty-three courses in, the chapter is eating with sustained, warm, pleasured focus. Your hall residents are on their seventh plates. Several sisters haven't left the table in two hours. She sits at the head of the table, ${Math.round(s.lbs)} pounds and everything she's eaten today, her belly warm and vast and enormously present, eating with the unhurried pleasure of someone who has built this and is now living in it.`
            :`Midway. Twenty-three courses, the chapter is eating steadily. Your hall residents are deep in it. She presides and eats.`,
          choices:[
            {id:"grand_feast_extra",label:"Fund additional courses for everyone at the midpoint",result:`You fund another round for the whole table at the midpoint. The chapter eats it. Your hall residents eat through it with the ease of women who have been training for this for two years. They are going to be significantly heavier.`,rel:11,feedOther:{archetype:"sorority",lbs:9,text:"Your hall residents eat through the grand feast extra round. They have been doing this for two years and it shows on their bodies and in the ease with which they keep eating."}},
            {id:"sit_at_head_with_her",label:"Sit beside her at the head of the table",result:`You take the seat beside her for the second half and she eats and you sit together and watch the table — the sisters eating, your hall residents deep in it — and she says: "I want to do this every year until I'm too large to stand at the stove." She means it as a goal.`,lbs:9,rel:13,flag:"together_at_head"},
          ]
        },
        {
          text:(h,s)=>{
            const full=h.includes("supplemented")&&h.includes("grand_feast_extra");
            if(full) return `End of the grand feast. The table is cleared. The chapter is in various states of very full, very warm contentment — several sisters have not moved in an hour and are completely satisfied about this. Your hall residents are the heaviest they have ever been and they are still at the table. She sits at the head — ${Math.round(s.lbs)} pounds, everything she's cooked, everything she's eaten today, her belly vast and warm and enormous against her hostess dress — and looks at the room. This is what she built.`;
            return `End of the grand feast. Table cleared. Chapter fed. The annual tradition is cemented.`;
          },
          choices:[
            {id:"last_plate_together",label:"Share the last plate with her — just you two",result:`After the chapter disperses you find the last plate she's saved and she puts it between you and you eat together in the empty chapter room and she says: "I'm going to be too large to cook this alone next year. I'll need help." She is asking you something. You understand what it is.`,rel:17,flag:"intimate_close"},
            {id:"chapter_close",label:"Stand at the door with her as the chapter leaves",result:`You stand beside her as the sisters file out, each one saying goodnight, each one heavier than they arrived, and she is 630 pounds of warmth in the doorway and she says goodnight to all of them personally and stays until the last one is gone.`,rel:8},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra")&&h.includes("intimate_close"),text:`Annual grand feast. She said she'll need help next year because she'll be too large to cook alone. Your hall residents are the heaviest they've ever been. The chapter is fed. She is 630 pounds and completely satisfied and she ate the last plate with you in the empty chapter room.`,gainBonus:22,relBonus:18},
        {condition:h=>h.includes("supplemented")&&h.includes("grand_feast_extra"),text:`Annual grand feast. Thirty-three courses, the whole chapter fed, your hall residents are significantly heavier. The tradition is cemented.`,gainBonus:14,relBonus:13},
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
  community_researcher:[
    // stageIdx 0 — ~258 lbs — Week 3: First panel presentation
    {
      title:"Week 3: Initial Data",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and has submitted the first quarterly data summary to her season plan panel. The presentation is tomorrow. She's prepared fourteen slides. The data is accurate. She reviewed it three times tonight and has eaten through the review process.`,
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
        {condition:h=>h.includes("coached_framing")&&h.includes("ate_before"),text:(h,s,gain)=>`${s.name} goes into her first panel presentation at ${Math.round(s.lbs+gain)} pounds, well-framed and well-fed. The data is solid. The framing is careful. The panel has been prepped to receive the findings as findings. Time to present.`,gainBonus:4,relBonus:7,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into her first panel presentation at ${Math.round(s.lbs+gain)} pounds with her intake logs and her season protocol and her composure. The panel is going to find this very interesting. Time to present.`,gainBonus:2,relBonus:5,startsPresentation:true},
      ]
    },
    // stageIdx 1 — ~340 lbs — Quarter Review
    {
      title:"Quarter Review",
      phases:[
        {
          text:(h,s)=>`Quarter two. ${s.name} is ${Math.round(s.lbs)} pounds and the data has accelerated past the initial projection range. She's presented a note explaining the variance as within acceptable deviation. The panel has accepted this explanation. She's been eating through the write-up process, which she has also documented, because she documents everything.`,
          choices:[
            {id:"help_explain_variance",label:"Help her build the variance explanation",result:`You work through it together. The explanation is: dietary variables, stress-response eating, ambient caloric increase on the floor. All true. All technically sufficient. She recites it like someone who's recited it to herself many times.`,lbs:5,rel:7,flag:"variance_prepared"},
            {id:"ask_how_she_is",label:"Ask how she's actually doing with all of this",result:`She looks at you for a long moment. 'I'm eating three thousand calories a day and logging every one of them and the panel chair said the season plan is 'compelling.' So.' She eats something. 'I'm doing fine.'`,lbs:4,rel:10,flag:"personal_check"},
          ]
        },
        {
          text:(h,s)=>`The quarter review is tomorrow. The rate of gain has accelerated. The panel is going to notice. ${h.includes('variance_prepared')?'She has a solid variance explanation prepared. She\'s also had a solid dinner.':'She\'s been quiet about how she\'s doing. She\'s also been eating steadily.'}`,
          choices:[
            {id:"big_dinner",label:"Take her to dinner tonight — she deserves it",result:`You take her somewhere substantial. She orders thoroughly and eats carefully and the bill is significant. On the way out she says: 'This will be in the dietary log.' She sounds like someone who finds this funny. She is someone who finds this funny.`,lbs:9,rel:8,flag:"pre_review_dinner"},
            {id:"final_prep",label:"One more run-through of the data presentation",result:`She runs the deck one more time. The data is what it is. She presents it the way she presents everything: with precision and composure. The panel will receive what they receive.`,lbs:3,rel:6,flag:"final_prepped"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("personal_check")&&h.includes("pre_review_dinner"),text:(h,s,gain)=>`${s.name} goes into the quarter review at ${Math.round(s.lbs+gain)} pounds, having eaten well and told you she's fine. The panel is going to have questions. She's going to have answers. Time to present.`,gainBonus:5,relBonus:9,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into the quarter review at ${Math.round(s.lbs+gain)} pounds prepared to defend every data point. The panel is paying attention now. Time to present.`,gainBonus:3,relBonus:6,startsPresentation:true},
      ]
    },
    // stageIdx 2 — ~432 lbs — Chapter 4 Defense
    {
      title:"Midseason Review",
      phases:[
        {
          text:(h,s)=>`The midseason review is the hardest section. It covers the acceleration of gain across the season plan period, the nonlinear increase in appetite, and what ${s.name} refers to in her own draft as 'confounding variables.' The panel is going to read between the lines. She is ${Math.round(s.lbs)} pounds and she knows this.`,
          choices:[
            {id:"reviewed_chapter4",label:"Review the midseason section with her before submission",result:`You read it together. She's written it precisely. Every sentence is defensible. Some sentences are defensible because they are technically accurate while being contextually overwhelming. You help her keep the ones that are clearest. She keeps all of them.`,lbs:6,rel:9,flag:"reviewed_ch4"},
            {id:"trust_the_data",label:"Trust the data — it speaks for itself",result:`She's confident in the data because the data is accurate. 'If they ask,' she says, 'I'll answer. The data isn't the problem.' She eats something from her desk. 'The data is the data.'`,lbs:4,rel:6,flag:"trusted_data"},
          ]
        },
        {
          text:(h,s)=>`The review is this afternoon. RA Iyer sent a preliminary response to the midseason section this morning: 'compelling, though the rate of acceleration in the hall log's latter half warrants discussion.' She printed this email and is holding it. She is ${Math.round(s.lbs)} pounds.`,
          choices:[
            {id:"prepare_iyer_response",label:"Prepare a response to Iyer's specific question",result:`You prepare it together: the acceleration is documented, it is a finding, the season protocol accounts for it by design. The answer is complete and specific and does not require the word 'because' to be followed by anything personal.`,lbs:6,rel:10,flag:"prepared_iyer"},
            {id:"just_eat",label:"Put the email down and eat first",result:`She puts the email down. She eats. By the end of the meal the email is still there and she's better equipped to deal with it. 'Iyer asks good questions,' she says. 'I have good answers.'`,lbs:9,rel:7,flag:"ate_first"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("reviewed_ch4")&&h.includes("prepared_iyer"),text:(h,s,gain)=>`${s.name} goes into midseason review at ${Math.round(s.lbs+gain)} pounds with a response prepared for every anticipated question. The panel is going to ask the questions. She's going to answer them. Time to present.`,gainBonus:7,relBonus:11,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into midseason review at ${Math.round(s.lbs+gain)} pounds. The intake logs are accurate. The review will be thorough. Time to present.`,gainBonus:4,relBonus:7,startsPresentation:true},
      ]
    },
    // stageIdx 3 — ~524 lbs — full panel review
    {
      title:"Full Panel Review",
      phases:[
        {
          text:(h,s)=>`Full panel. Five members. External eyes on the data for the first time. ${s.name} is ${Math.round(s.lbs)} pounds and the data reflects this and the panel is going to be in the same room with both.`,
          choices:[
            {id:"full_committee_prep",label:"Run a full mock defense — all five perspectives",result:`You run it. She presents to an imagined panel of five and you interrupt from five different angles. She handles all of them with precision and composure and a steady appetite. By the end she's ready. She's also, by any measure, considerably larger than when the hall log began.`,lbs:6,rel:10,flag:"mock_defended"},
            {id:"confidence_talk",label:"Talk through her confidence — she knows this material better than anyone",result:`She knows the material because she is the material. You remind her of this. She looks at you for a long moment. 'The panel is going to see the numbers,' she says. 'And then they're going to see me.' A pause. 'I'm prepared for both.'`,lbs:4,rel:11,flag:"confidence_built"},
          ]
        },
        {
          text:(h,s)=>`The full panel review is tomorrow. Five people who have been reading her work and will now see her in person. The intake logs and the captain have not been in the same room together yet. Tomorrow they will be.`,
          choices:[
            {id:"substantial_meal",label:"A substantial meal tonight — she's earned it",result:`A proper dinner. She eats fully, the way she's learned to eat over the course of the hall log, which is to say thoroughly and without apology. The meal will be in the log. Everything is in the log.`,lbs:10,rel:9,flag:"committee_eve_dinner"},
            {id:"early_night",label:"Early night — she needs to be sharp",result:`She goes home early. She eats something before bed — logged, noted, filed — and sleeps and tomorrow she presents what she is to the people who have been reading about what she is.`,lbs:4,rel:6,flag:"early_night"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("mock_defended")&&h.includes("committee_eve_dinner"),text:(h,s,gain)=>`${s.name} goes into full panel review at ${Math.round(s.lbs+gain)} pounds, prepared from every angle, well-fed, and ready to stand in the room with her own intake logs. This is the moment. Time to present.`,gainBonus:10,relBonus:13,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} goes into full panel review at ${Math.round(s.lbs+gain)} pounds. The logs and the captain are about to share a room. Time to present.`,gainBonus:5,relBonus:8,startsPresentation:true},
      ]
    },
    // stageIdx 4 — ~626 lbs — External Examiner
    {
      title:"Outside Reviewer",
      phases:[
        {
          text:(h,s)=>`An outside athletics reviewer from another program. No social familiarity, no context, no relationship with the captain. They have the final season report, the intake logs, and a flight in. ${s.name} is ${Math.round(s.lbs)} pounds and has reviewed the reviewer's previous work and knows they ask precise questions.`,
          choices:[
            {id:"prep_external",label:"Prepare specifically for an outside perspective",result:`You help her prepare for someone who has no investment in the hall log's continuation — someone who will read the data as data, not as someone they've watched across a semester. She prepares with unusual thoroughness. She eats while preparing.`,lbs:6,rel:9,flag:"external_prepped"},
            {id:"she_knows_her_work",label:"She knows her work — the reviewer will see that",result:`The work is solid. The reviewer will see a rigorous season plan with documented protocol, significant intake logs, and a captain who has lived it through completely. That is accurate. She nods. She eats something.`,lbs:4,rel:7,flag:"confident_external"},
          ]
        },
        {
          text:(h,s)=>`The reviewer arrives tomorrow morning. Tonight is the last night before the most foreign pair of eyes reads the final season report. ${s.name} is ${Math.round(s.lbs)} pounds and she has prepared everything she can prepare. She's been eating through the final review and the dietary log is complete through today.`,
          choices:[
            {id:"examiner_eve_dinner",label:"A real dinner tonight — the last one before the examination",result:`She chooses the restaurant. She eats well — unhurried, deliberate, the way she's learned to eat. This too will be in the log. She's made peace with the log. The log is accurate. She is accurate.`,lbs:10,rel:10,flag:"last_dinner"},
            {id:"final_notes",label:"Work through the final notes together",result:`You go through the notes. The data is what it is. The examiner will see it. She will explain it. The notes are thorough. So is she.`,lbs:5,rel:8,flag:"final_notes"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("external_prepped")&&h.includes("last_dinner"),text:(h,s,gain)=>`${s.name} faces the outside reviewer tomorrow at ${Math.round(s.lbs+gain)} pounds, prepared for a stranger reading the intake logs cold. The logs are accurate. She is the logs. Time to present.`,gainBonus:12,relBonus:13,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} faces the outside reviewer at ${Math.round(s.lbs+gain)} pounds. The work is complete. The review begins. Time to present.`,gainBonus:7,relBonus:9,startsPresentation:true},
      ]
    },
    // stageIdx 5 — ~820 lbs — Final Defense
    {
      title:"Season Finale Review",
      phases:[
        {
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and submitting the completed final report next week. The final defense is in four days. The panel has read the full document. She has eaten through the writing of every chapter and the dietary log is the most complete document she's ever produced and it ends today.`,
          choices:[
            {id:"read_last_chapter",label:"Read the final section with her",result:`She reads it aloud. The final section is careful and precise and documents the hall log's conclusion with careful rigor. The hall log is complete. The captain is 820 pounds. Both sentences are in the document. Both are accurate.`,lbs:7,rel:13,flag:"read_final"},
            {id:"talk_about_what_next",label:"Talk about what comes after the final report",result:`She's been thinking about it. 'I'll start a new log,' she says. 'The season plan period ends. The captain doesn't.' She eats something. 'The intake record keeps accumulating. That's what logs do.'`,lbs:5,rel:12,flag:"after_talk"},
          ]
        },
        {
          text:(h,s)=>`Day of the season finale review. ${s.name} is ${Math.round(s.lbs)} pounds and the panel is assembled and she's about to present a final report that is about herself and that she has lived for the entirety of its writing. She is the most rigorous captain this panel has ever reviewed.`,
          choices:[
            {id:"final_meal_before",label:"One last meal before the defense",result:`She chooses something specific — a place she's been going since the second month of the hall log, logged every visit. She eats thoroughly and precisely. 'For the record,' she says, meaning the dietary log. Also meaning: I've thought about this and I'm doing it intentionally and I want a witness.`,lbs:12,rel:12,flag:"final_meal"},
            {id:"walk_in_with_her",label:"Walk into the review with her",result:`You walk in with her. The panel is there. She's there. The intake logs are projected on a screen behind her. The captain and the logs are in the same room. She stands at the front and looks at the numbers. 'Good numbers,' she says, mostly to herself. Then she presents.`,lbs:5,rel:14,flag:"walked_in"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("read_final")&&h.includes("final_meal"),text:(h,s,gain)=>`${s.name} enters her season finale review at ${Math.round(s.lbs+gain)} pounds having read the final section aloud and eaten the last meal before the panel vote. The final report is accurate. She is the final report. Time to present.`,gainBonus:16,relBonus:17,startsPresentation:true},
        {condition:()=>true,text:(h,s,gain)=>`${s.name} enters her season finale review at ${Math.round(s.lbs+gain)} pounds. The hall log is complete. The captain is here. The panel will vote. Time to present.`,gainBonus:9,relBonus:12,startsPresentation:true},
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
          text:(h,s)=>`Someone from the floor stopped by. ${s.name} is ${Math.round(s.lbs)} pounds and she didn't answer. The knock came and she looked at the door and looked at the food and looked at the door again and decided the food was the more pressing concern. She texted the person afterward to say she'd been asleep.`,
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
          text:(h,s)=>`The piece is out. It's accurate and shorter than she expected and calls her 'a first-year on exchange who is, apparently, working her way through every food challenge on campus.' This is accurate. She's read it twice. She is ${Math.round(s.lbs)} pounds and there are more challenges on the list.`,
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
            {id:"watch_the_room",label:"Watch how the room reacts when she arrives",result:`You hang back. She walks in and the staff greets her by name and two residents at the nearest table recognize her and one of them says something to the other and she doesn't notice or doesn't show it. She sits down and studies the menu. She already knows the menu.`,lbs:4,rel:11,flag:"watched_arrival"},
            {id:"talk_to_the_crowd",label:"Talk to someone in the crowd — find out why they came",result:`You ask someone nearby why they're here. 'I heard she was doing the challenge today,' they say. 'I wanted to see.' They say this with complete sincerity. They came specifically to watch. This has become a thing people do.`,lbs:3,rel:9,flag:"crowd_talked"},
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
          text:(h,s)=>`Something is different about this one. ${s.name} is ${Math.round(s.lbs)} pounds and when she walks into the venue she sees: the journalist, three residents from her floor, two people she doesn't recognize, a staff member who has clearly been told who's coming. They've put her in the center table.`,
          choices:[
            {id:"acknowledge_crowd",label:"Help her acknowledge the crowd — this is real now",result:`You lean over and say: 'You should say something.' She looks at the room. She says: 'Thank you for coming. I'm going to eat now.' The room laughs. She eats. The room stays.`,lbs:5,rel:11,flag:"acknowledged_crowd"},
            {id:"just_do_the_thing",label:"She doesn't need to acknowledge it — just watch",result:`She sits down and the challenge arrives and she eats it with the same focused efficiency she always brings and the crowd watches and nobody needs to say anything because the thing is happening and that's what everyone came for.`,lbs:4,rel:9,flag:"just_ate"},
          ]
        },
        {
          text:(h,s)=>`She clears it. The crowd is larger than expected — word has spread beyond the journalist's readership. Someone she's never met records the finish on a phone. Someone behind you says: 'she always does it.' Like they've seen this many times. Like this is a known fact.`,
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
          text:(h,s)=>`The venue has a crowd unlike anything that's come before. The journalist is there. The campus paper sent two photographers. There are residents who transferred in this semester who have been told about her since before they arrived. ${s.name} is ${Math.round(s.lbs)} pounds and she sits at the table and looks at the challenge item.

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
          text:(h,s)=>`Grandma Mae calls. Mary Jane answers — her phone propped against a jar of preserves — and Mae's voice fills the room with questions. How's the semester. What are you making. Is anyone eating with you.

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
    // stageIdx 0 — ~258 lbs — "Opening the Hall Log"
    {
      title:"Opening the Hall Log",
      phases:[
        {
          text:(h,s,subject)=>`${s.name} sets the notebook on the table and opens it to a clean page. 'Before we begin properly,' she says, 'I need a methodology.' She looks at you steadily. 'Two options. They produce different data and they require different things from me.' Her pen is already in her hand.

${subject?`Her focus resident — ${subject.name}, ${getStage(subject.lbs).label} at ${Math.round(subject.lbs)} lbs — is somewhere in the building right now, unaware that she's been chosen.`:'Her focus resident is somewhere in the building right now, unaware of having been chosen.'}`,
          choices:[
            {id:"feeder_focus",label:"Hands-On Log — she feeds the resident directly",result:(s)=>`'Hands-On Log.' She writes it at the top of the page. 'I maintain control of variables by introducing them directly. I feed them. I document both of us.' She underlines it. 'The data will be precise.'`,lbs:4,rel:6,flag:"feeder_focus"},
            {id:"feedee_focus",label:"Field Observer — she interviews a resident already growing",result:(s)=>`'Field Observer.' She writes it at the top of the page. 'I watch. I interview. I don't introduce variables — I document the ones already present.' She underlines it. 'The data will be honest.'`,lbs:3,rel:7,flag:"feedee_focus"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subDesc=sid>=7
              ?`${subject?.name||'This resident'} is very heavy — ${Math.round(subject?.lbs||100)} lbs — and every measurement takes longer now. She fills the common room couch completely, warm and vast, and ${s.name} has to sit on the arm to take notes at all.`
              :sid>=4
              ?`${subject?.name||'This resident'} is noticeably soft at ${Math.round(subject?.lbs||100)} lbs, still mobile — waistbands, gait, the way she claims a chair. ${s.name} logs all of it in the first session column.`
              :`${subject?.name||'This resident'} is slender at ${Math.round(subject?.lbs||100)} lbs — changes are early, a softness at the wrists, fullness after meals. ${s.name} marks the baseline carefully.`;
            const focus=h.includes("feeder_focus")
              ?`The first active session is arranged. ${s.name} has brought food — more than the resident will expect. She has her notebook open on her knee.`
              :`The first observation session is scheduled. ${s.name} will say she's studying eating habits for a hall survey. This is not entirely false.`;
            return `${focus}\n\n${subDesc}\n\n${s.name} is ${Math.round(s.lbs)} lbs herself now. She has noted this in the margins.`;
          },
          choices:[
            {id:"precise",label:"Keep it clinical — establish baseline data",result:(s)=>`${s.name} stays clinical. Baselines recorded, variables isolated, her own reactions noted in a separate column. She is an observer and this is a hall log. The notebook has three new pages by the end.`,lbs:5,rel:6,flag:"clinical"},
            {id:"personal",label:"Let a genuine interest show through the methodology",result:(s)=>`Something genuine surfaces — a question she asks twice, a notation in the margin that's less data and more observation. She goes back and underlines it later.`,lbs:3,rel:10,flag:"personal"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("feeder_focus")&&h.includes("personal"),text:`The first session is logged. The resident ate more than their baseline. The observer ate more than hers. Both numbers are on the same page.\n\nShe closes the notebook with both hands. The hall log has begun.`,gainBonus:6,relBonus:8},
        {condition:()=>true,text:`First session complete. Notes taken. Baselines established. The hall log is formally open.\n\nShe dates the page.`,gainBonus:4,relBonus:6},
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
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs now — genuinely large. The second notebook is almost full; ${subject?.name||'This resident'} has outgrown three dining-hall chair assessments. The trend line does not flatten.`
              :sid>=4
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — soft and accelerating. The hall log's weekly delta column is the most honest page in the building.`
              :`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — still early on the curve, but ${s.name}'s projection graph already bends upward.`;
            const focus=h.includes("feeder_focus")
              ?`The Hands-On Log has been running for weeks. ${s.name} arrives to the session with a different bag — bigger. She has adjusted the protocol.`
              :`The Field Observer logs are meticulous. ${s.name} has begun conducting more formal interviews. The resident seems to enjoy the attention.`;
            return `${focus}\n\n${subDesc}\n\n${s.name} is ${Math.round(s.lbs)} lbs. She has noted — in a separate column, slightly smaller font — that her own intake has increased since the hall log began.`;
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
            return `The resident has changed ${qualifier} since the hall log began${subNote}. ${s.name} has a chart in the back of the notebook correlating resident weight gain vs. session frequency.\n\n${h.includes("feeder_focus")?`She's also noted, in the smallest print in the notebook: her own weight is on the same chart.`:`She's also noted, below the main chart: she's been eating differently. 'Variable contamination,' she wrote. Then she crossed it out.`}`;
          },
          choices:[
            {id:"acknowledge_self",label:"She mentions she's been eating more too",result:(s)=>`'I need to note,' she says, 'that I've been eating more. I don't know if this is a contamination effect or a parallel response.' She writes it down. She weighs herself afterward. She writes that down too.`,lbs:7,rel:12,flag:"self_acknowledged"},
            {id:"focus_subject",label:"Keep the focus on the resident",result:(s)=>`She redirects to the resident data. 'The hall log is about the resident,' she says firmly. She doesn't reopen the margin note about her own numbers. The notebook is very full of resident data.`,lbs:5,rel:7,flag:"deflected"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("self_acknowledged"),text:`The notebook is three volumes now. Her own data is mixed into the third.\n\nShe dates the page and then sits with it for a long moment. The hall log and the resident have both grown considerably.`,gainBonus:8,relBonus:10},
        {condition:()=>true,text:`Session complete. New data. The hall log continues.\n\nShe closes the notebook.`,gainBonus:5,relBonus:7},
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
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — the changes are no longer subtle. Chairs are rated before sessions now; ${subject?.name||'This resident'} rates them by how much of her they actually hold.`
              :sid>=4
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — rounded and growing. Residents whisper in the lounge; ${s.name} writes the whispers down too.`
              :`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — still early stages, but the trend line is clean. ${s.name} trusts the data more than the resident trusts her appetite.`;
            return `Physics observation principle: the act of observing changes the thing being observed.\n\n${s.name} writes this at the top of a new section. She is ${Math.round(s.lbs)} lbs now. She says this is unrelated to the hall log. The notebook contains months of evidence to the contrary.\n\n${subDesc}`;
          },
          choices:[
            {id:"confront",label:"Ask the resident directly if they've noticed changes",result:(s)=>`The resident pauses. 'Yes,' they say. 'Is that what you wanted to know?' ${s.name} writes: 'Resident aware of changes. My emotional response: [also variable].'`,lbs:7,rel:11,flag:"confronted"},
            {id:"avoid",label:"Don't raise it — let the hall log proceed naturally",result:(s)=>`She doesn't raise it. The hall log is cleaner without it. She feeds the resident and takes her notes and doesn't comment.`,lbs:9,rel:6,flag:"avoided"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const sid=subject?getStage(subject.lbs).id:2;
            const subNote=subject?`${subject.name} is ${Math.round(subject.lbs)} lbs — ${getStage(subject.lbs).label}. ${sid>=7?'Enormous now. The room allocates space around her before anyone speaks.':sid>=4?'Noticeably heavy. Sessions have a different warmth — more food, longer pauses, softer laughter.':'Still early in the trend. But the trend is clear on every chart '+s.name+' keeps.'}`:'The resident data is in the notebook.';
            return `${s.name} reviews the observer effect entry. She has added a footnote in red pen:\n\n[This observer is ${Math.round(s.lbs)} lbs. At study start: ${Math.round(s.startLbs||200)} lbs. The resident data and observer data are, at this point, no longer cleanly separable.]\n\n${subNote}`;
          },
          choices:[
            {id:"dual_study",label:"The self-study is part of the research — lean into it",result:(s)=>`She rewrites the protocol section. 'Dual-participant longitudinal study.' Primary resident: external. Secondary participant: observer. She sets the new draft beside the old one. This is more honest. She knows it is.`,lbs:8,rel:13,flag:"dual_study"},
            {id:"separate",label:"Separate the data rigorously — two clean studies",result:(s)=>`She creates a second notebook labelled 'Personal log.' For three days she keeps them separate. On the fourth day there is a note in the hall log notebook that begins 'per personal log.'`,lbs:6,rel:8,flag:"separated"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("dual_study"),text:`The methodology is rewritten. The hall log has a new title: *Dual-Participant Longitudinal Hall Log in Appetite and Transformation.*\n\nBoth names are on the cover.`,gainBonus:10,relBonus:12},
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
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — enormous, warm, occupying the room the way weather does. You notice ${subject?.name||'her'} before you notice the furniture.`
              :sid>=4
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — heavy, moving differently now: less hurry, more sway. The gain pattern hasn't missed a week.`
              :`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — early growth showing. The curve matches the prediction almost uncomfortably well.`;
            return `The notebook says: *The observer's own responses have become a primary data point rather than a confound.*\n\n${s.name} is ${Math.round(s.lbs)} lbs. The original study proposal described the observer as neutral. She has written 'LOL' in the margin of this section, then crossed it out, then left it because the notation is accurate.\n\n${subDesc}`;
          },
          choices:[
            {id:"share_data",label:"Show the resident the full data — both of you",result:(s)=>`She shows the resident. All of it — their numbers, her numbers, the trend lines. The resident reads it for a long time. 'I knew,' they say. ${s.name} writes: 'Resident confirmed awareness. My response: [the notebook is running out of margin space].'`,lbs:9,rel:16,flag:"shared_data"},
            {id:"keep_private",label:"Keep the observer data private for now",result:(s)=>`She keeps the personal log separate. The resident has looked at her differently for months but she doesn't confirm it. The data remains private. For now.`,lbs:7,rel:9,flag:"kept_private"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const focus=h.includes("feeder_focus")
              ?`The Hands-On Log sessions are different now. The food is the same. The clinical frame is not quite intact. She still takes notes — including notes on the quality of her own attention.`
              :`The Field Observer protocol has long since become something else. The interviews are conversations. ${s.name} has stopped calling them observations in the log.`;
            return `${focus}\n\n${s.name} is ${Math.round(s.lbs)} lbs. The hall log is${h.includes("shared_data")?" fully bilateral now — two participants, documented together.":" still nominally about the resident. She knows what it's actually about."}\n\nShe watches the resident eat and feels her own appetite answer — not a confound, she writes, a correspondence. The hall log was never only about one body.`;
          },
          choices:[
            {id:"commit",label:"Commit to the dual log fully — this is the work now",result:(s)=>`She rewrites the hall log title again. This time she doesn't show it to you. She just nods once, very firmly, and keeps writing.`,lbs:10,rel:14,flag:"committed"},
            {id:"clinical_distance",label:"Try to maintain some clinical distance",result:(s)=>`She pulls back. Two pages of very precise, controlled observations. Then on the last line: *Observer's heart rate elevated during session. Noted.*`,lbs:7,rel:10,flag:"clinical_distance"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("shared_data")&&h.includes("committed"),text:`The dual log is the log now. She's made copies of everything and handed you the second copy.\n\nThe notebook is almost full. She already has a new one.`,gainBonus:12,relBonus:15},
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
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs now — nearly immobile, colossal. ${s.name} conducts sessions from beside her now, not across from her. The hall log calls this 'proximate observation.'`
              :sid>=4
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — very heavy, profoundly changed. ${s.name} rereads month-one photos and barely recognizes the comparison.`
              :`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — growing steadily, week after week. The trend is deep into positive territory.`;
            return `The word in observation protocol for what has happened here is *saturation* — the point at which new data no longer changes the conclusions because the conclusions are complete.\n\n${s.name} is ${Math.round(s.lbs)} lbs. She is, in her words, "past the saturation point of any protocol that predates me."\n\n${subDesc}`;
          },
          choices:[
            {id:"beyond_method",label:"Go beyond the methodology — this is something else now",result:(s)=>`She closes the protocol section for good. 'The hall log is closed,' she says. 'What comes after — I don't have a word for that yet.' She opens a fresh page. Blank. She sits with it for a long time.`,lbs:11,rel:14,flag:"beyond_method"},
            {id:"document",label:"Document everything — let the data speak",result:(s)=>`She keeps writing. Everything. She has a clinical vocabulary for all of it and she uses it precisely. The notebook is very thick now.`,lbs:9,rel:11,flag:"fully_documented"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const subNote=subject?`${subject.name} is ${Math.round(subject.lbs)} lbs — ${getStage(subject.lbs).label}. ${h.includes("feeder_focus")?'The resident has been fed well. The hall log shows this.':'The resident has been watched carefully. The hall log shows this.'}`:'';
            return `${s.name} is ${Math.round(s.lbs)} lbs. The hall log has lasted longer than the original proposal's timeline by a factor of several.\n\n${h.includes("beyond_method")?`She has started writing something different — not observations, not data. Something that doesn't have a methodology because it doesn't need one.`:`The data is complete. Every number is logged. The hall log is, technically, one of the most rigorous longitudinal records of its kind.`}\n\n${subNote}\n\nConclusion approaching. ${s.name} reads old entries and finds a stranger who thought neutrality was possible. The resident changed. So did the observer. The log recorded both, even when she pretended otherwise.`;
          },
          choices:[
            {id:"write_up",label:"Begin the formal write-up",result:(s)=>`She begins typing. She deletes the abstract and starts with the conclusion. The conclusion is better.`,lbs:10,rel:12,flag:"writing_up"},
            {id:"final_session",label:"One more session — the last data point",result:(s)=>`'One more session. Final data point. I want the last entry to be correct.' She is already writing the session notes before the session has begun.`,lbs:12,rel:10,flag:"final_session"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("beyond_method"),text:`The blank page is not blank anymore.\n\nShe reads you the first line of whatever this is. It is not a study. It is not a diary. It is something she will need a new word for.\n\nYou tell her you would like to read it when it is done.`,gainBonus:14,relBonus:16},
        {condition:()=>true,text:`The data is in. The hall log is reaching its natural conclusion.\n\nShe saves the document and backs it up in three places.`,gainBonus:10,relBonus:12},
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
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs. The final volume is mostly ${subject?.name||'her'} — her arc is the dataset.`
              :sid>=4
              ?`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs. Grown beyond the original proposal parameters. ${s.name} adds a footnote: 'Hypothesis exceeded.'`
              :`${subject?.name||'This resident'} is ${Math.round(subject?.lbs||100)} lbs — earlier in the arc, but the hall log captures both trajectories now.`;
            return `${s.name} is ${Math.round(s.lbs)} lbs. She fills the RA desk chair completely. She looks like the reason the chair exists.\n\n${h.includes("feeder_focus")?`The Hands-On Log produced a resident who changed profoundly. It also produced an observer who changed profoundly. The final report argues these facts are inseparable.`:`The Field Observer methodology produced a data set of extraordinary quality. It also produced an observer who is no longer separable from the field. She has noted this.`}\n\n${subDesc}`;
          },
          choices:[
            {id:"conclude",label:"Write the final entry — close the hall log formally",result:(s)=>`She writes the final entry. Weight: ${Math.round(s.lbs)} lbs. Conclusion: *The hall log is complete. All hypotheses confirmed or productively complicated. The observer is a different person than the observer who opened this notebook.* She underlines the last sentence.`,lbs:12,rel:14,flag:"concluded"},
            {id:"continue_study",label:"the hall log doesn't end — this is a lifetime's work",result:(s)=>`She opens a new volume. 'It doesn't end. A log like this doesn't end. It just gets handed down.' She dates the new page and starts writing.`,lbs:10,rel:16,flag:"continued"},
          ]
        },
        {
          text:(h,s,subject)=>{
            const subLine=subject?`She looks at ${subject.name}. ${Math.round(subject.lbs)} lbs. ${getStage(subject.lbs).label}. 'The best data in the hall log,' she says. 'Every session.'`:'';
            return `The notebook collection occupies an entire shelf. ${s.name} runs one hand along the spines.\n\n${h.includes("concluded")?`'The hall log is complete. The methodology held. The conclusions are beyond the scope of what I expected when I opened the first notebook.' She looks at her hands. 'But the data doesn't lie.'`:`'The hall log continues. I'll be adding data for a very long time.' She looks at the new notebook, already half-full. 'I think the resident will too.'`}\n\n${subLine}\n\nShe closes the volume — or doesn't — and the shelf holds the proof either way. Whatever comes next, the hall has already been documented into something true.`;
          },
          choices:[
            {id:"publish",label:"Suggest she publish — this deserves an audience",result:(s)=>`'Under a pseudonym,' she says immediately. 'And with season panel approval from a sympathetic institution.' She pulls out a list of sympathetic institutions she's been maintaining. It is a long list.`,lbs:8,rel:18,flag:"published"},
            {id:"private_forever",label:"Keep it between you — some studies are too personal",result:(s)=>`She nods once. 'Between us. The data doesn't need an audience to be true.' She closes the final volume. She holds it. 'It's true.'`,lbs:6,rel:20,flag:"kept_private_final"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("concluded")&&h.includes("published"),text:`She hands you the abstract. It is going to change some things for some people in some institutions.\n\nThe hall log is closed. Something else has begun.`,gainBonus:18,relBonus:20},
        {condition:h=>h.includes("continued"),text:`The new volume is already substantial. The hall log will go on as long as she does.\n\nShe closes the notebook for the night — not forever — and looks at you with the expression of someone who has found the work she was built for.\n\n'Thank you. For the direction.'`,gainBonus:16,relBonus:22},
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
          text:(h,s)=>`${s.name} is in the common-room kitchen at ${Math.round(s.lbs)} pounds, apron tied, counter clear. The residents will arrive in twenty minutes. You're here early enough to help decide what gets made.

"I was thinking banana bread," she says. "But I could do more." She opens the cabinet. The cabinet is very well stocked.`,
          choices:[
            {id:"recipe_simple",label:"Banana bread — classic, nothing unusual",result:(s)=>`She makes the banana bread. It smells perfect. The hall lounge fills with warm butter and sugar and the specific comfort of something handmade. Daisy taste-tests a slice and sets the rest out carefully. Her belly presses the counter edge as she works.`,lbs:3,rel:5,flag:"recipe_simple"},
            {id:"recipe_rich",label:"Banana bread plus cinnamon rolls — go big",result:(s)=>`She makes both. The cinnamon rolls take longer and require a second taste-test round, which Daisy conducts thoroughly. By the time the residents arrive, she's a full piece ahead and the room smells like a bakery.`,lbs:7,rel:7,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Whole grain muffins — presentable to parents",result:(s)=>`She makes the muffins. They're good — genuinely good, she's good at everything — but she adds cream cheese frosting because "it needed something," and now the plausibly healthy framing has a rich, sweet asterisk.`,lbs:2,rel:6,flag:"recipe_cover"},
          ]
        },
        {
          text:(h,s)=>`The residents arrive. Kayla comes in first and sees the spread and doesn't ask what it is — just sits down and starts eating. Bri follows her lead. Sofia arrives last and has already spotted the cinnamon rolls from the doorway.

Daisy is behind the counter, warm and purposeful, refilling things before they're empty.`,
          choices:[
            {id:"watched",label:"Watch Daisy watch them eat",result:(s)=>`She doesn't look at you. She looks at them. There's something careful and pleased in her expression — the satisfaction of a calculation that came out right. Kayla has had three pieces. Bri hasn't stopped. Sofia is on something like a fourth.`,lbs:5,rel:8,flag:"watched"},
            {id:"helped_serve",label:"Help serve — pass things around",result:(s)=>`You help pass things around. Daisy gives you a look that might be gratitude, might be you-figured-it-out. The session is easy and warm and loud. By the end, everyone — including Daisy — is noticeably fuller.`,lbs:4,rel:11,flag:"helped_served"},
          ]
        },
        {
          text:(h,s)=>`Pickup. The moms arrive. Mrs. Calloway stands at the window for a beat longer than necessary, looking at the table, looking at the residents, looking at Daisy.

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
            {id:"recipe_rich",label:"Something richer — they're ready for more",result:(s)=>`She makes the rich version. Double the butter. The oven fills the hall lounge with something that smells specifically excellent. She taste-tests twice. The notebook comes out.`,lbs:8,rel:7,flag:"recipe_rich"},
            {id:"recipe_special",label:"A special recipe — something you haven't tried before",result:(s)=>`She makes something new from the back of the recipe book — caramelized peach upside-down cake, which she's been holding in reserve. "For when they were ready," she says. She's been waiting for this moment.`,lbs:10,rel:9,flag:"recipe_special"},
            {id:"recipe_cover",label:"Whole grain — something you could explain if asked",result:(s)=>`She makes the defensible version. It's genuinely good. She adds a cream cheese layer anyway because "the base needed something." The explainability is theoretical at this point.`,lbs:3,rel:7,flag:"recipe_cover"},
          ]
        },
        {
          text:(h,s)=>`The session is different today. Kayla doesn't wait to see what others do — she takes first helpings with the ease of someone who's been here before. Bri's been eating more quickly. Sofia has found her spot at the table and settled into it like it was always hers.

Daisy moves through the room at ${Math.round(s.lbs)} pounds, warm and unhurried.`,
          choices:[
            {id:"watched",label:"Notice what's changed about each of them",result:(s)=>`You notice. Kayla's jeans don't fit the same way — there's a gap at the back, her hips wider against the denim. Bri's belly presses against the table edge in a way that's new. Sofia fills the chair differently. Daisy is watching you notice. "Yes," she says. Just that.`,lbs:5,rel:10,flag:"watched"},
            {id:"fed_more",label:"Help pass things — keep the plates full",result:(s)=>`You keep the plates full. Daisy gives you the look — gratitude, partnership, something warm. Sofia finishes a second serving before anyone else finishes their first. The hall lounge is very warm.`,lbs:7,rel:9,flag:"fed_more"},
          ]
        },
        {
          text:(h,s)=>`Pickup. The moms are different too. Mrs. Calloway stands at the window for a beat longer than last week. Mrs. Reyes is already inside before the session is technically over — she says she "was early," and she is eating one of the pieces from the serving plate with a casualness that suggests this wasn't the first time she's helped herself.

Mrs. Monroe arrives last, parks badly, and waves through the window with both hands.`,
          choices:[
            {id:"deflected_mom",label:"Redirect Mrs. Calloway — point to Sofia and compliment the floor",result:(s)=>`You point out that Sofia has been really engaged this week. Mrs. Calloway's attention shifts to her daughter. Daisy says something warm and specific about the residents' progress. The question Mrs. Calloway was forming dissolves.`,lbs:4,rel:8,flag:"deflected_mom"},
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
          text:(h,s)=>`${s.name} is ${Math.round(s.lbs)} pounds and she looks comfortable at the counter, comfortable in the apron, comfortable in the common-room kitchen in a way that suggests she's stopped thinking of it as anyone else's space. She has the recipe book open to something indulgent.

"Mrs. Calloway asked me yesterday about what I'm making," she says. "I told her it was wellness-program aligned." She looks at you. "Is there a wellness program it's aligned with?"`,
          choices:[
            {id:"recipe_rich",label:"Make the rich batch regardless — she's not going to stop",result:(s)=>`She makes the rich batch. The hall lounge fills. She taste-tests once from the pan, then again to be sure. "It's good," she says. She means: I know it is. The notebook confirms it.`,lbs:9,rel:8,flag:"recipe_rich"},
            {id:"recipe_special",label:"Try the cream-filled brioche — this is the moment",result:(s)=>`She makes the cream-filled brioche, which has been in the recipe book since the second week. It requires forty minutes and two rounds of taste-testing. She eats more during testing than she'd planned. The result is extraordinary.`,lbs:12,rel:10,flag:"recipe_special"},
            {id:"recipe_cover",label:"Make something genuinely nutritious — cover your tracks",result:(s)=>`She makes the whole grain batch, which is genuinely nutritious, and then adds a cream glaze because "it needed finishing." The nutritious framing is intact. The glaze adds calories faster than the framing removes them.`,lbs:4,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Keep it simple — don't escalate right now",result:(s)=>`She makes the simple batch. It's good — it's always good — and it keeps the profile low. Mrs. Calloway's question hangs in the air but doesn't become a follow-up.`,lbs:5,rel:6,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`The session is warm and easy. Bri's hall lounge tee doesn't quite tuck anymore — she's stopped trying. Kayla has started sitting differently, wider, like she's found the right angle for her hips. Sofia moves through the room with the confidence of someone who has decided exactly what kind of person she is and is correct about it.

Daisy watches all of this from the counter, ${Math.round(s.lbs)} pounds and attentive.`,
          choices:[
            {id:"noted_changes",label:"Say something about how well the hall kitchen sessions have been going",result:(s)=>`You say it genuinely. Daisy looks at you with an expression that's briefly and completely unguarded. "I think so too," she says. Then she looks back at the residents and her expression changes to something careful and warm and focused.`,lbs:5,rel:12,flag:"noted_changes"},
            {id:"pushed_more",label:"Make sure everyone has seconds before the session ends",result:(s)=>`You help make sure the plates don't empty. Sofia doesn't need help — she's been watching the supply — but Bri and Kayla accept second servings with the ease of people who've stopped thinking twice about it.`,lbs:7,rel:9,flag:"pushed_more"},
          ]
        },
        {
          text:(h,s)=>`Pickup. Mrs. Calloway is inside today — she said she needed to "speak with the hall mentor" — and she's standing with her arms crossed at a slight angle that suggests she's trying to look more formal than she feels. Her cardigan pulls slightly at the waist.

"I wanted to ask," she begins, "about the enrichment activities."`,
          choices:[
            {id:"deflected_question",label:"Answer warmly and specifically — focus on the wellness framing",result:(s)=>`Daisy answers before you can. "Nutritional impact on attention and mood is actually an emerging area in residence-life research," she says, completely calmly. "The floor has been more engaged on Tuesdays than any other day of the week." Mrs. Calloway blinks. "That's... good," she says. She accepts the container Daisy hands her. She eats a piece on the way to her car.`,lbs:4,rel:10,flag:"deflected_question"},
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
    // stageIdx 3 — "Wide Tables" (classWeight ≥ 120)
    {
      title:"Wide Tables",
      phases:[
        {
          text:(h,s)=>`Residence life loaned wider lounge tables from storage two weeks ago. Sofia has claimed the largest one and moved it to her preferred spot with the ease of someone who knows her own requirements. She spreads wide into it. It looks correct.

Daisy is ${Math.round(s.lbs)} pounds at the counter, looking satisfied. "Ready?" she says.`,
          choices:[
            {id:"recipe_special",label:"Make the peach upside-down cake — Sofia's been hinting",result:(s)=>`She makes the peach upside-down cake. Sofia sees the pan and makes a small sound of recognition. Daisy's expression is briefly, completely, genuinely pleased. She taste-tests three times before serving.`,lbs:11,rel:10,flag:"recipe_special"},
            {id:"recipe_rich",label:"Double batch this week — there's enough demand",result:(s)=>`She makes double. It disappears at the rate double would. She is not surprised. The notebook records the batch size and the consumption speed and the correlation between them.`,lbs:8,rel:8,flag:"recipe_rich"},
            {id:"recipe_cover",label:"Something defensible — Mrs. Calloway might stop by again",result:(s)=>`She makes the defensible version plus a cream sauce that is technically a topping and therefore separately categorized. Mrs. Calloway does stop by. She has the topping separately, then the base, then some combination.`,lbs:5,rel:8,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Standard batch — keep the routine solid",result:(s)=>`The standard batch. They eat it fast now, all three of them, with no waiting period between servings. The routine is established. The consumption is efficient.`,lbs:5,rel:6,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`Bri can't tuck her lounge tee anymore. She tried earlier in the week, apparently — Kayla told Daisy during the session with the specific detail of someone who found this information useful. Bri herself is currently eating the second piece without any apparent concern about the fit situation.

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
        {condition:()=>true,text:(h,s,gain)=>`Wide tables, fuller residents, Tuesday ongoing. Daisy is ${Math.round(s.lbs+gain)} pounds and adding pages.`,gainBonus:4,relBonus:7,classGain:14,momGain:8},
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
            {id:"recipe_cover",label:"Make both disputed items — let the chat decide for real",result:(s)=>`She makes both. The hall lounge smells like an argument about to be resolved. Mrs. Monroe arrives early to vote in person. Mrs. Reyes arrives one minute later. The debate intensifies.`,lbs:7,rel:12,flag:"recipe_cover"},
            {id:"recipe_simple",label:"Stick to the classics — reliability is also a virtue",result:(s)=>`She makes the banana bread and the standard brownies. Both are received with the enthusiasm of things that have become expected and therefore trusted. The chat rates them highly.`,lbs:6,rel:7,flag:"recipe_simple"},
          ]
        },
        {
          text:(h,s)=>`The session is full. All three residents, and Mrs. Monroe who has stopped waiting for official pickup and just comes in now. Mrs. Reyes follows her in and sits at the table.

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
          text:(h,s)=>`End of term. The last official Tuesday. Daisy is ${Math.round(s.lbs)} pounds and she has been in the common-room kitchen since six in the morning, making everything. The counter is full. The oven is still running. It smells like every Tuesday at once.

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
          text:(h,s)=>`An hour later. Everything is gone. The moms are still at the table, talking. The residents are in various stages of comfortable fullness. Daisy is sitting — she does this on Tuesdays, settles into the wide chair at the end of the room — and her belly is full and warm in her lap and she looks like someone who has reached a natural conclusion.

Mrs. Monroe says: "Same time next year." It's not a question.

Daisy looks at you.`,
          choices:[
            {id:"committed_to_next_year",label:"Tell her yes — this is happening again",result:(s)=>`"Same time next year," you say. Daisy looks at you with an expression that's briefly and completely unguarded. "Next year," she says, "I'm going to need a bigger kitchen." She means it practically. She means it every other way too.`,lbs:6,rel:18,flag:"committed_to_next_year"},
            {id:"let_daisy_answer",label:"Let Daisy answer for herself",result:(s)=>`Daisy answers. "Yes," she says, without hesitation. She looks at the room — six people, full and warm, all there because of Tuesday mornings and banana bread and her. "Yes," she says again, quieter. "I think next year I'll need more counter space."`,lbs:5,rel:20,flag:"let_daisy_answer"},
          ]
        },
      ],
      endings:[
        {condition:h=>h.includes("recipe_special")&&h.includes("watched_all_six")&&h.includes("committed_to_next_year"),text:(h,s,gain)=>`End of term. Six people in the room. Everything made and eaten. Daisy is ${Math.round(s.lbs+gain)} pounds and enormous and flour-dusted and completely at ease with all of it. The notebook has a final entry: *All six. End of term. Everything eaten. Next year: bigger kitchen.*

She adds: *I don't regret any of it. Not one bite.*

The session closes. Next year the hall lounge will be bigger. Next year she will be bigger. The Tuesday tradition is officially permanent.`,gainBonus:18,relBonus:22,classGain:30,momGain:20},
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
    // stageIdx 0 — ~258 lbs — "The First Gathering"
    {
      title:"The First Gathering",
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
        {condition:h=>h.includes("bake_together"),text:(h,s,gain)=>`Good first bake night. Darlene asks for the recipe on her way out — she says "for Emma." Mary Jane is ${Math.round(s.lbs+gain)} pounds and warm and already planning next week.`,gainBonus:5,relBonus:9},
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
          text:(h,s)=>`Daughter news at the extreme. Lily told Ruthanne she figured out what's been in her food. "She wants to learn to make it herself," Ruthanne says. "The real recipes. She knows what they do." Wanda says Kezia's belly reaches the arm of the couch when she sits. Cheryl says Madison can't see her feet anymore — she has to feel for them with her hands. Darlene says Emma and Claire both needed new clothes and Claire's belly is starting to match Emma's now and Emma does not accept this.

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
        text:(h,s)=>`Talia locks the workshop door and wheels out a harness that looks too deliberate to be innocent. "Bloating belt, revision C," she says. "I need a volunteer with documented consent." She taps her own waist. "Or I run it on myself. Data is data."`,
        choices:[
          {id:"self_test",label:"Let her self-test first",result:`She straps in, hits the cycle button, and watches her own midsection swell over twenty minutes with clinical fascination that keeps slipping into something else. "Variance within tolerance," she breathes.`,lbs:6,rel:6,flag:"self_test"},
          {id:"assign_subject",label:"Authorize a floor volunteer",result:`She exhales like you've upgraded her clearance level. "Excellent. I'll log everything." The first volunteer whimpers when the belt engages — Talia takes notes without looking away.`,lbs:4,rel:8,flag:"assigned"},
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
          {id:"boost_throughput",label:"Run greedy feeder throughput",result:`The arm accelerates until someone hits the kill switch. Throughput data is obscene.`,lbs:8,rel:5},
          {id:"slow_tease",label:"Run tease mode for precision data",result:`The arm slows to maddening intervals. The volunteer squirms; Talia graphs it. "Psychological coupling confirmed."`,lbs:5,rel:7},
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
          {id:"document",label:"Document everything clinically",result:`She photographs, measures, logs. The volunteer shakes; Talia does not.`,lbs:10,rel:4},
          {id:"celebrate",label:"Celebrate the extremity",result:`She laughs — sharp, delighted. "This is why we build."`,lbs:12,rel:6},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Serum trial archived. Campus whispers start that night. Talia is ${Math.round(s.lbs+gain)} pounds and already mixing batch two.`,gainBonus:8,relBonus:5},
      ],
    },
    {
      title:"Furniture Commission",
      phases:[{
        text:(h,s)=>`The harness creaks as Talia bolts the last frame brace. "Living furniture," she says. "She stays useful while she swells." Reinforced legs click into place beneath the rig.`,
        choices:[
          {id:"comfort",label:"Prioritize comfort calibration",result:`She feeds the volunteer until the rig hums content. Furniture that moans when sat on is still furniture.`,lbs:6,rel:7},
          {id:"display",label:"Prioritize display posture",result:`Talia locks the frame into a pose that shows every swell. The volunteer blushes; Talia takes photos for the log.`,lbs:7,rel:5},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Commission complete. Talia files the rig as ${Math.round(s.lbs+gain)} pounds heavier and entirely justified.`,gainBonus:6,relBonus:7},
      ],
    },
    {
      title:"Malfunction Night",
      phases:[{
        text:(h,s)=>`An alarm chirps at 2am. A belt over-inflates; an arm won't stop feeding. Talia doesn't panic — she reroutes power and keeps eating paste beside the bench "for stability."`,
        choices:[
          {id:"shutdown",label:"Hard shutdown all devices",result:`Everything stops. The volunteer gasps relief; Talia looks annoyed at the lost data.`,lbs:4,rel:6},
          {id:"ride_it",label:"Let it run for max data",result:`The logs are extraordinary. So is the damage. Talia calls it worth it.`,lbs:9,rel:4},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`Incident report filed. Instability drops; Talia's appetite does not.`,gainBonus:5,relBonus:5},
      ],
    },
    {
      title:"Master Inventor",
      phases:[{
        text:(h,s)=>`Devices tick on bodies across campus. Talia stands in the center of her workshop — soft, wide, solder-stained — and watches status lights blink on her bench. "Manual phase over," she says quietly.`,
        choices:[
          {id:"expand",label:"Authorize wider deployment",result:`She pushes a campus-wide update. Growth becomes infrastructure.`,lbs:10,rel:8},
          {id:"consolidate",label:"Consolidate the core workshop",result:`She keeps the builds tight and obsessive. Quality over reach.`,lbs:7,rel:10},
        ],
      }],
      endings:[
        {condition:()=>true,text:(h,s,gain)=>`The workshop lives. Talia is ${Math.round(s.lbs+gain)} pounds and no longer pretends she's only the tinkerer — she's the inventor.`,gainBonus:12,relBonus:12},
      ],
    },
  ],

  salon_appetit: SALON_EVOLVED_EVENTS,
  artisan_gallery: GALLERY_EVOLVED_EVENTS,
};
