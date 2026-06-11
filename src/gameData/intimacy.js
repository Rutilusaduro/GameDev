import { getStage } from './stages.js';

export const INTIMACY_ARCHETYPE_LINES={
  athlete:{
    reaction:[`"You have no idea how strong I actually am."`,`She watches your hands with the focused attention she used to give to game tape.`,`Her breath catches — then she resets, the way she always resets. Controlled. Deliberate.`],
    resistance:`"I'm not — I'm just seeing what you're — stop looking at me like that."`,
    encourages:`"Yeah. That. Keep doing that."`,
    during:`She makes small competitive sounds, like she's winning something.`,
    end:`Afterward she lies very still, breathing hard, not quite meeting your eyes. "Don't make a thing of it," she says. Which is what she says when something matters.`,
  },
  influencer:{
    reaction:[`"Tell me how I look right now."`,`She tilts her head the way she does for photos — except she's not smiling. She's watching.`,`A small, knowing sound. "I knew you'd like that."`,],
    resistance:`"I'm aware of exactly what I look like right now, thank you."`,
    encourages:`"More. Come on. Don't stop."`,
    during:`She narrates softly — "there" and "yes" and "exactly there" — a running edit of herself.`,
    end:`She kisses you once, precisely. "Was I what you wanted?" She already knows the answer but she wants to hear it.`,
  },
  cheerleader:{
    reaction:[`"Oh my god — okay — that's — okay."`,`She laughs, delighted, slightly breathless, like a crowd just roared.`,`"You're supposed to be the professor," she says, which is not a complaint.`,],
    resistance:`"I'm not — I mean we shouldn't — " She's already leaning in.`,
    encourages:`"Don't stop. Seriously. I will literally die if you stop."`,
    during:`She's enthusiastic, emphatic, the way she's enthusiastic about everything she commits to.`,
    end:`"That was so good," she says, in the same voice she'd use for a perfect routine. Pure, uncomplicated satisfaction.`,
  },
  bookworm:{
    reaction:[`"Interesting. That's — I'm noticing several things at once."`,`She processes. Actually processes. You can almost see it.`,`"I've read about this," she says. "It's not the same as — it's very different actually."`,],
    resistance:`"I just think we should — there are a number of considerations — "`,
    encourages:`"Please. Please don't stop. I'll be quiet. I'll stop analyzing. Please."`,
    during:`Small, lost sounds. All the words have left her.`,
    end:`A long silence. Then: "I'm going to need a minute." A beat. "Or possibly several minutes." She's flushed to the roots of her hair.`,
  },
  gamer:{
    reaction:[`"Okay. Okay. No — wait. Yeah. Okay."`,`She makes a sound like she's just solved something difficult.`,`A pause. Then: "Respawning in three, two — " She shuts herself up.`,],
    resistance:`"I'm not nervous, I'm just — input lag. I'm experiencing input lag."`,
    encourages:`"Keep going. I'm not telling you to stop. I'm the opposite of telling you to stop."`,
    during:`She's gone. The humor, the deflection, all of it gone. Just her, present, breathing.`,
    end:`"Okay," she says eventually. "Okay. That happened." A beat. "I'm going to think about that for a very long time."`,
  },
  sorority:{
    reaction:[`"Hi," she says softly, which is not a greeting but an arrival.`,`She settles into it like she settles into everything — with practiced warmth, with genuine ease.`,`"I've been thinking about this," she says. This is not a surprise to you.`,],
    resistance:`"Baby, I'm just saying we should — " She stops. "Never mind what I was saying."`,
    encourages:`"Mm. Yes. Exactly that."`,
    during:`She is warm and present and entirely certain. No second thoughts. No hesitation.`,
    end:`She tucks herself against you with the comfortable authority of someone who has decided where she belongs. "Stay," she says. It's not a question.`,
  },
  overachiever:{
    reaction:[`"This is — I'm noting the physiological responses. For reference."`,`She's still taking internal inventory. Old habit.`,`Her analytical distance collapses suddenly, all at once. "Oh," she says. Just that.`,],
    resistance:`"I should probably catalogue — I mean I should — " The catalogue is abandoned.`,
    encourages:`"I need you to understand that I am fully committed to this outcome."`,
    during:`She stops performing competence. It's remarkable — you've never seen her stop.`,
    end:`"I have no notes," she says. "I have literally no notes on this." She sounds amazed at herself.`,
  },
  artsy:{
    reaction:[`"You're touching something I haven't named yet."`,`She observes the experience the way she observes material — with a kind of hunger.`,`"The weight of me," she says softly. "You can feel the whole weight of me."`,],
    resistance:`"I'm just trying to stay present. I keep wanting to describe it instead of — "`,
    encourages:`"I want you to know what this feels like. I want you to know exactly."`,
    during:`She narrates in metaphors, half-whispered, then the metaphors stop and only the feeling remains.`,
    end:`"I'm going to make something about this," she says. "I don't know what yet. Something true."`,
  },
  quiet:{
    reaction:[`She makes a small, soft sound that you understand entirely.`,`Her eyes are very steady on yours. She doesn't look away.`,`A slight, certain nod. Yes.`,],
    resistance:`A small shake of her head — not no, exactly. More: not yet. Slightly. Soon.`,
    encourages:`She takes your hand and moves it herself, without words, with complete precision.`,
    during:`She breathes. That's all. Perfectly, completely present in every breath.`,
    end:`She puts her head down and stays there a long time. When she finally looks up her expression is open in a way you haven't seen before.`,
  },
  transfer:{
    reaction:[`"I'm going to be honest with you — I've been thinking about this."`,`She looks at you with the directness she always has, nothing performed about it.`,`"Yes," she says simply. "This."`,],
    resistance:`"I'm not holding back, I just want you to — just — slower. Yes. Slower."`,
    encourages:`"Tell me what you think. Tell me what you're feeling. I want to know."`,
    during:`She's open, present, entirely unhidden. This is how she does everything.`,
    end:`"I'm glad I'm here," she says. Meaning this room, this university, this moment, all at once.`,
  },
};

export const INTIMACY_STUDENT_LINES={
  0:{ // Brittany - cheerleader
    reaction:[`"Okay but you have to admit I'm your biggest one now," she says, and means it as a compliment.`,`She bounces — actually bounces — and then laughs at herself for bouncing. "I did not mean to do that."`,`"Feel that? That's like twenty pounds just in my thighs. Isn't that insane?"`,],
    resistance:`"I'm just saying you should appreciate all of this properly. Starting from the top."`,
    encourages:`"Yes, that part, that's my favorite part, don't skip it."`,
    during:`She provides running commentary on her own body with the enthusiasm of a sportscast.`,
    end:`"Okay I'm officially your best one," she says. "This is not up for debate."`,
  },
  1:{ // Madison - influencer
    reaction:[`"Wait — what's my angle right now? Is this good? I feel like this is a good angle."`,`She adjusts her hair on instinct, then catches herself. "Sorry. Habit."`,`"Tell me I look good like this. I mean it. Tell me."`,],
    resistance:`"I'm just very aware of — I mean you can see everything from where you — tell me it's good."`,
    encourages:`"I want you to want this. I need you to want this. Do you? Say it."`,
    during:`She watches you watching her. The performance and the reality have merged completely.`,
    end:`"I'm going to post something very vague later and everyone will wonder," she says, and kisses you once.`,
  },
  2:{ // Ashley - sorority
    reaction:[`"Sweetheart," she says warmly, which is how she begins everything that matters.`,`She curls into you with practiced, genuine ease. "Finally," she says.`,`"You've been patient," she says. "I noticed that. I wanted you to know I noticed."`,],
    resistance:`"Baby, just — let me just rearrange — there. That's better. That's so much better."`,
    encourages:`"I love your hands. I love them. Keep going, honey."`,
    during:`A long, warm hum. Comfortable, certain, deeply pleased with the arrangement.`,
    end:`"You should stay," she says. "We don't have anywhere to be."`,
  },
  3:{ // Emily - bookworm
    reaction:[`"So the — the thing that's happening is — I have thoughts. Multiple thoughts. Conflicting."`,`She adjusts her glasses and then takes them off entirely, which is significant.`,`"I've been thinking about the physics of this," she says. "Specifically the pressure distributions."`,],
    resistance:`"I'm not — it's just — I want to process this properly — oh."`,
    encourages:`"Please don't stop. I'll stop talking about physics, I promise. Please."`,
    during:`She has forgotten every word she knows. Her mind, which never stops, has stopped.`,
    end:`She breathes. Counts something silently. "I need to write this down," she says, but she doesn't move.`,
  },
  4:{ // Jessica - athlete
    reaction:[`"I've been working out but honestly I've also been eating a lot so I don't know what you're — okay. You feel that? That's not fat. That's — well. Some of it."`,`She rolls her shoulders like she's warming up for something. Old reflex.`,`"You're going to tell everyone you beat me," she says. "I can tell."`,],
    resistance:`"I'm not — I train for endurance, okay, this is — fine. Fine. Come here."`,
    encourages:`"Harder. I mean — yes. More. I'm not made of glass."`,
    during:`She's gone competitive about this too. Competing to be felt, to be present, to win.`,
    end:`"Rematch," she says immediately. Then catches herself. Then laughs. "I mean — yeah. Soon."`,
  },
  5:{ // Samantha - quiet
    reaction:[`She leans in by three degrees. An enormous declaration, from her.`,`Her hand finds yours without looking. She holds it. Doesn't let go.`,`A sound: small, soft, completely certain.`,],
    resistance:`She turns her face away once, briefly. Then back. You wait. She nods.`,
    encourages:`She moves your hand to where she wants it and leaves hers on top.`,
    during:`Her breathing. That's everything. The room becomes just that.`,
    end:`She keeps her head on your shoulder for a long time. You both understand not to speak.`,
  },
  6:{ // Lauren - artsy
    reaction:[`"I've been thinking of myself as a medium," she says. "You're working with me now."`,`She closes her eyes and tilts her head back. "I want to know what you're perceiving."`,`"My body has become a landscape," she says softly. "You're mapping it."`,],
    resistance:`"I'm processing the aesthetic experience simultaneously — I can do both — oh. Maybe not both."`,
    encourages:`"The density here is new. Two months ago this wasn't here. Do you feel the difference?"`,
    during:`She murmurs: texture, weight, depth. Names what she feels with an artist's precision until the precision dissolves.`,
    end:`"I'm going to need new materials," she says after a long silence. She means it as a compliment.`,
  },
  7:{ // Megan - gamer
    reaction:[`"Loading screen," she says. "I'm having a loading screen. Give me a second."`,`She covers her face with both hands. Then uncovers it. "Hi. Okay. Hi."`,`"I've thought about this in an extremely fictional context," she says. "This is not that."`,],
    resistance:`"I'm not panicking, I'm just operating at an elevated — okay I'm a little panicked."`,
    encourages:`"Yes. That. Don't patch it out."`,
    during:`She stops being funny. She stops being anything except here.`,
    end:`"Saving state," she says quietly. Then: "Sorry, I — that was a thing I said." She's smiling.`,
  },
  8:{ // Tiffany - overachiever
    reaction:[`"Noting elevated heart rate. Mine, not yours. Just for the record."`,`She straightens her back and then immediately un-straightens it. First time you've seen that.`,`"I've been projecting for this scenario," she says. "My projections were inaccurate."`,],
    resistance:`"I should clarify my parameters before — nope. Parameters abandoned. Moving forward."`,
    encourages:`"Please continue. I've stopped evaluating. That's new. Please continue."`,
    during:`She makes a single soft sound and then she's gone, every metric abandoned, just present.`,
    end:`"Revised," she says eventually. One word. You understand it means: everything I thought I knew about this.`,
  },
  9:{ // Destiny - transfer
    reaction:[`"I didn't know what this school was going to be," she says. "I'm glad it was this."`,`She meets your eyes with the directness that's been there since day one.`,`"I'm not going to pretend I haven't thought about this," she says.`,],
    resistance:`"Slower. Just — tell me what you're — yes. Like that. Yes."`,
    encourages:`"You can say what you're thinking. I want to know what you're thinking."`,
    during:`She's fully present, fully open. Transferred here with nothing to prove and nothing to hide.`,
    end:`"Good," she says. Simple, complete, satisfied. "Really good."`,
  },
  10:{ // Roxanne - artsy
    reaction:[`"Touch is data," she says. "You're reading something that took a year to write."`,`She holds up her arm, examining it alongside you. "The volume changed in November. Can you tell?"`,`"My body is the work now," she says. "The medium became the message."`,],
    resistance:`"I want you to understand what you're touching before you — yes. That. Now you understand."`,
    encourages:`"The color of this — I've been calling it amber but it's more like — do you feel the warmth? That specific warmth?"`,
    during:`She talks in colors and materials until the colors become irrelevant and only the material remains.`,
    end:`"Burnt sienna," she says softly. "Everything right now is burnt sienna and heavy cream." She sounds pleased.`,
  },
  11:{ // Priya - overachiever
    reaction:[`"I have approximately seven concurrent thoughts about this and I'm working to reduce them."`,`She inhales through her nose in the precise way she does before a presentation.`,`"The data here is subjective," she says. "I'm finding that acceptable."`,],
    resistance:`"I want to catalogue the sensation first — I realize that sounds — I'm aware that sounds — "`,
    encourages:`"Continue. I've set aside the catalogue. Please continue."`,
    during:`The precision falls away in layers. By the end there is nothing left of the catalogue.`,
    end:`"I have no conclusions," she says. "I never have no conclusions." She sounds like she's discovered something rare.`,
  },
  12:{ // Carmen - athlete
    reaction:[`"Feel that?" She flexes her thigh against you deliberately. "Two hundred of that is pure me."`,`She watches your expression with an athlete's attention to feedback.`,`"I've been working on my capacity," she says. "You should test it."`,],
    resistance:`"I'm not nervous — athletes don't get nervous — I'm just — come here. Stop asking."`,
    encourages:`"More. I can take more. Don't go easy."`,
    during:`She takes everything offered with competitive intensity, making sounds like winning feels.`,
    end:`"New personal best," she says, and for once she's not talking about weight.`,
  },
  13:{ // Zoey - quiet
    reaction:[`A breath. Just a breath. Then she moves fractionally closer.`,`Her eyes close. Her whole body makes a decision without a word.`,`She presses her palm flat against yours. The gesture is complete.`,],
    resistance:`She turns her head. Not away — just to the side, briefly. She turns back.`,
    encourages:`She puts her hand over yours and presses. Down. More. Yes.`,
    during:`The quietest sound you've ever heard from a person. It contains everything.`,
    end:`She stays very still for a long time. Then she puts her hand on yours again. Just to keep it there.`,
  },
  14:{ // Faith - influencer
    reaction:[`"I hope you like what you find," she says. She means all of it — the weight, the warmth, all of it.`,`She watches you with genuine warmth, nothing performed about it.`,`"I've been wanting you to look at me like that," she says. "Specifically like that."`,],
    resistance:`"Tell me what you want first. I want to know what you want. Then we'll — yes. That."`,
    encourages:`"I want you to enjoy this. I want that so much. Are you? Tell me you are."`,
    during:`She is warm and wanting and generously, genuinely present for all of it.`,
    end:`"Good?" she asks, and she's asking about both of you. "Because that was very good for me."`,
  },
};

export const INTIMACY_SCENES=[
  {
    id:"her_weight",
    label:"Her Weight on You",
    icon:"🌊",
    desc:"She lowers herself onto you — sitting, leaning, settling. Her mass becomes a physical fact in your lap and against your chest. The weight is the point.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She stands in front of you for a moment — uncertain, reading your expression — and then she sits. The weight arrives in stages: first her thighs across yours, then the rest of her settling in, her belly coming to rest against your forearm with a warm, soft pressure you weren't entirely prepared for.`
            :stId<=6?`She doesn't approach so much as she arrives. The mass of her redistributes as she lowers herself into your lap — you feel your own body brace for it, adjust for it. Her belly settles heavily against you. Her thighs spread across yours. The warmth is immediate and total.`
            :stId<=9?`She moves carefully now — deliberately, controlling the descent. The weight of her comes down in a single long slow arrival, and what lands in your lap is substantial: her thighs thick and warm and spread across yours, her belly a heavy, soft mass that finds its resting place against your chest and stays there. The physics of it are obvious and exactly what you wanted.`
            :`She needs help lowering. You take her weight as she comes down and it's a full project — her hands on your shoulders, your arms around her, gravity very much involved in the outcome. When she's settled the weight is extraordinary: a warm, immense mass that pins you to the chair with gentle finality, her belly enormous across your lap, warm and impossibly yielding, and she makes a small satisfied sound that means she can feel exactly how much of her there is.`;
          const ext=tier>=3?` She shifts, deliberately, to make sure you feel the full extent of it.`:``;
          return base+ext;
        },
        choices:[
          {id:"wrap_arms",label:"Wrap your arms around her",result:`Your arms find the circumference of her — or most of it. Where they used to meet, they don't now. You pull her closer anyway.`,lbs:1,rel:3,flag:"held_her"},
          {id:"press_belly",label:"Press your hands flat against her belly",result:`Both hands, spread wide. The warmth comes through your palms immediately. She makes a small sound.`,lbs:2,rel:2,flag:"touched_belly"},
          {id:"stay_still",label:"Just hold the weight — don't move",result:`You let the mass of her rest against you without resistance. She settles deeper. The weight becomes familiar, then essential.`,rel:4},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const held=history.includes("held_her");
          const base=stId<=3?`She's found her position. The weight of her is distributed across you now — across your legs, against your chest — and she's not moving. The stillness feels deliberate.`
            :stId<=6?`The weight has settled into something permanent. She's warm and heavy and completely present, and when she breathes her belly moves against you in a slow, deep rhythm.`
            :stId<=9?`She's enormous in your lap — there's no other word for the scale of it. Her thighs overflow yours by several inches on each side. Her belly rests against your forearms and you can feel the depth of it, the give of it, the warmth that goes all the way down.`
            :`The immensity of her is the room now. What's in your lap is not a girl sitting on you but a landscape: heavy, warm, impossible to ignore from any direction, her weight an ongoing physical argument for her own extraordinary scale.`;
          const ext=held?` Her body has responded to being held — she's leaning back into you now, giving you more of the weight, trusting you with it.`:` She watches your hands, watching what you'll do.`;
          return base+(tier>=3?` She reaches back and takes your hands, guides them.`:ext);
        },
        choices:[
          {id:"rock_gently",label:"Rock her gently — feel the mass shift",result:`The momentum of it is remarkable. Even a small motion takes effort to start and more to stop. She feels it too — her breath changes.`,lbs:2,rel:3},
          {id:"pull_closer",label:"Pull her tighter against your chest",result:`She comes closer with a soft sound of surprise, then settles. Her body is pressed the full length of yours now. The warmth is complete.`,rel:4,requires:"held_her"},
          {id:"spread_hands",label:"Spread your hands wide across her belly",result:`You measure the extent of her — both hands flat, trying to cover the full soft breadth of her belly. You can't. She makes a sound that might be pride.`,lbs:3,rel:3,flag:"measured_her"},
          {id:"kiss_neck",label:"Press your lips to her neck",result:`She tilts her head back to give you better access. The weight of her shifts against you entirely.`,rel:5},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const measured=history.includes("measured_her");
          const base=stId<=3?`She's been here long enough that the weight feels natural now. You've stopped adjusting. She's stopped asking if you're okay. This is just how you are together.`
            :stId<=6?`The warmth of her has seeped into you completely. You're aware of every pound of her, every degree of heat, the specific way her belly rests between your forearms when she breathes out.`
            :stId<=9?`You've stopped thinking about what you're holding. The weight has become environment — you exist under and around it, aware of the pressure at every point of contact, the slow incredible heat of it.`
            :`She makes the room small and warm and full. There is almost nothing of the space that isn't her — the weight, the warmth, the soft immensity spreading across your lap and chest. You have given up comprehending the scale of it and simply exist inside it.`;
          return base+(measured?` You still haven't found the edges of her. You don't think you will.`:``);
        },
        choices:[
          {id:"say_something",label:"Tell her what this is like",result:`You try to say it. The words aren't quite right but she understands them anyway.`,rel:6,flag:"spoke_truth"},
          {id:"stay_silent",label:"Stay quiet — let the weight speak",result:`Nothing needs to be said. She presses back against you, confirmation.`,rel:4},
          {id:"reach_lower",label:"Let your hands drift lower",result:`She doesn't stop you. Her breathing changes.`,lbs:2,rel:5,requiresNot:"kissed_off"},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("spoke_truth")&&h.includes("measured_her"),text:`She stays in your lap until she can't anymore — until gravity and practicality win. Getting up takes a moment. She stands and turns to face you, slightly flushed. "You can have that again," she says. "Any time." She means the weight. She means all of it.`,gainBonus:3,relBonus:5},
      {condition:(h)=>h.includes("held_her"),text:`She gets up slowly, and the absence of her weight is its own sensation — sudden, cold, wrong. She looks back at you. "Stay," she says. "I'll be right back." She's getting food. You understand that this is the right response.`,gainBonus:2,relBonus:4},
      {condition:()=>true,text:`She eases off you carefully and you sit with the warmth she's left behind. She smooths her dress and looks at you with an expression that is entirely satisfied. "Well," she says. "Now you know."`,gainBonus:1,relBonus:3},
    ],
  },
  {
    id:"wall_press",
    label:"Against the Wall",
    icon:"🧱",
    desc:"You press her back against the wall, or she pins you there. The mass of her becomes architectural — a warm, soft structure with its own specific gravity.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`You step toward her and she steps back, once, twice, until the wall is behind her. She looks at you with an expression that is not quite surprise. You close the last of the distance and she's between you and the surface — warm, slightly breathless, her body against yours with only the slightest pressure.`
            :stId<=6?`She finds the wall on her own — backs toward it with the deliberateness of someone who has thought about where she wants to be. You follow. When you press into her the give is immediate and deep: her body between you and the wall, the fullness of her softness against your chest, her belly pressing out against yours with a warm, insistent weight.`
            :stId<=9?`Getting her against the wall is a collaboration — you guide her there and she cooperates, and when she meets the surface the mass of her redistributes with a soft sound. Her belly comes against you first, warm and enormous, preceding her chest and arms, and you press into it and feel how deep the softness goes.`
            :`She doesn't move far. You come to her. The wall is close behind her and when you step into her space the mass of her closes around you — her belly against yours, against your hips, a warm soft inescapable weight that anchors you both to the spot. The wall behind her becomes irrelevant. She is the wall.`;
          const ext=tier>=3?` Her hands find your hips and pull.`:` She watches your face, reading it.`;
          return base+ext;
        },
        choices:[
          {id:"press_in",label:"Press slowly into her softness",result:`You lean in and feel the soft resistance of her — not fighting you, absorbing you. She makes a soft, satisfied sound.`,lbs:1,rel:3,flag:"pressed_in"},
          {id:"hands_hips",label:"Put your hands on her hips",result:`Your hands find her hips and feel the full circumference of them — wide, warm, giving under the pressure of your fingers.`,rel:3,flag:"held_hips"},
          {id:"let_her_lead",label:"Let her set the pressure",result:`She takes the invitation and leans forward, the weight of her coming against you with intent. It's more than you expected. You brace.`,lbs:2,rel:4,flag:"she_led"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const pressed=history.includes("pressed_in");
          const base=stId<=3?`Her back is flat against the wall, your body against hers, and the warmth between you has built into something palpable.`
            :stId<=6?`She's pinned there by your presence and her own mass — neither of you is moving. The pressure between you is equal and total, her softness yielding against yours, warm and close.`
            :stId<=9?`She fills the space between you and the wall completely. There's nowhere the contact doesn't happen — her thighs against yours, her belly between you, her chest warm and heavy against your shoulder.`
            :`She is the architecture now. You are pressed into her the way you'd press into a very warm, very yielding wall that breathes and makes small sounds and holds you deliberately.`;
          return base+(pressed?` She's stopped breathing quite so carefully.`:` She's watching your face with great attention.`);
        },
        choices:[
          {id:"drag_hands",label:"Run your hands up her sides",result:`Up from her hips, over the soft swells of her sides, feeling the warmth and weight and depth of her. She arches slightly.`,lbs:2,rel:4},
          {id:"lift_belly",label:"Cradle the weight of her belly from below",result:`Both hands finding the underside of her belly, lifting gently. The weight of it settles into your palms. She looks down at your hands and then up at you.`,lbs:3,rel:3,flag:"held_belly"},
          {id:"press_forehead",label:"Press your forehead to hers",result:`The intimacy of it is different from the physical. She closes her eyes.`,rel:5},
          {id:"grind_slow",label:"Press in slow, deliberate circles",result:`She makes a sound she wasn't planning to make. Her hands find the wall behind her.`,lbs:1,rel:5,requiresNot:"she_led"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const heldBelly=history.includes("held_belly");
          const base=stId<=3?`You've been here long enough that the initial urgency has settled into something slower and more certain. The warmth between you is total.`
            :stId<=6?`She's still against the wall and you're still against her and neither of you has suggested doing anything else. The mass and warmth of her is the whole situation.`
            :stId<=9?`The weight she's pressing against you is extraordinary — dozens of pounds per square inch of contact, warm and soft and completely present. She's not going anywhere. Neither are you.`
            :`She has made a gravity well of the corner. Everything in the room — you especially — has fallen into it and can't quite get out, held by the soft immensity of her, the incredible warmth, the specific physical fact of all that mass against yours.`;
          return base+(heldBelly?` She puts her hands over yours, holding them against her.`:``);
        },
        choices:[
          {id:"whisper_close",label:"Say what you want",result:`You tell her. Her expression changes completely.`,rel:6,flag:"spoke_desire"},
          {id:"stay_pressed",label:"Just stay here, pressed together",result:`The silence is the answer. She nods, very slightly. Yes. This.`,rel:5},
          {id:"kiss_jaw",label:"Find her jaw with your lips",result:`She tilts her head back, giving you the full length of her throat. Against you, the mass of her shifts.`,lbs:1,rel:4},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("spoke_desire")&&h.includes("held_belly"),text:`She stays against the wall after you step back, as though the wall has become preferable to unoccupied space. "Come back," she says. Her voice is very quiet. "I want you to come back."`,gainBonus:3,relBonus:5},
      {condition:(h)=>h.includes("pressed_in"),text:`Pulling back from her is a slow process — the warmth and pressure of her resist the separation. She watches you go with an expression that is entirely patient. She knows you'll return.`,gainBonus:2,relBonus:4},
      {condition:()=>true,text:`She eases off the wall slowly and the space between you feels strange — cold, too large. "That was good," she says. Not a question. A conclusion.`,gainBonus:1,relBonus:3},
    ],
  },
  {
    id:"belly_focus",
    label:"Hands on Her Belly",
    icon:"🤲",
    desc:"Patient, deliberate attention to her belly — the weight and warmth of it, the softness and depth, the physical reality of all she's grown.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She's lying back and you're beside her, and your hands are on her belly — both flat, covering as much of the soft surface as you can. It's warm and it gives under your touch with an immediate yielding that you've started to recognize as her.`
            :stId<=6?`She's lying on her back and the belly rises above her like gentle terrain — round, warm, supremely soft. Your hands are on it. The warmth comes up through your palms. She's watching the ceiling and breathing slowly, in and out, moving your hands with each breath.`
            :stId<=9?`Her belly is substantial enough now to be its own landscape. You need both hands to begin to map it and you've found that you can sink several inches before finding resistance. She breathes slowly and the landscape moves. It's warm everywhere. It's warm beyond the depth you can reach.`
            :`Her belly fills the space between you — enormous, very soft, the surface of it a long gentle slope that your hands travel for some time before arriving at the sides of her, and even then there's more beneath. She can't see your hands from where she's lying. The belly has become too large for her to see past. She navigates by feel.`;
          const ext=tier>=3?` She's taken your hands and placed them exactly where she wants them.`:` She makes a small sound of encouragement.`;
          return base+ext;
        },
        choices:[
          {id:"press_deep",label:"Press slowly, feeling the full depth",result:`You press and feel the resistance build slowly, slowly — an inch, two inches, three. The depth is startling. She breathes out.`,lbs:3,rel:3,flag:"pressed_deep"},
          {id:"circle_slow",label:"Move in slow circles",result:`The belly moves under your hands in a soft, heavy wave. She makes a sound that means keep going.`,lbs:2,rel:4,flag:"circled"},
          {id:"lift_gently",label:"Try to lift and hold the weight of it",result:`Both hands under the underside, lifting slightly. The weight of it is specific and real. She laughs softly — she felt that.`,lbs:2,rel:4,flag:"lifted"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const deep=history.includes("pressed_deep");
          const base=stId<=3?`She's relaxed completely — her body has given over to your hands, the belly soft and responsive under each touch.`
            :stId<=6?`You've been here long enough to know the terrain. The central softness, the deeper resistance beneath it, the way she breathes when you find a particular depth.`
            :stId<=9?`The belly is a world. You've been exploring it and you still haven't found all of it — there's always more depth, more softness, another warm inch further than you thought it went.`
            :`You have been here for some time and you have not found the floor of her. Every press finds new depth, new warmth, new softness. She has grown beyond any single exploration.`;
          return base+(deep?` She's stopped pretending that the pressure doesn't affect her. Her breathing tells you everything.`:` She watches your hands when she can.`);
        },
        choices:[
          {id:"knead_sides",label:"Work your hands into the soft sides",result:`The sides of her belly are softer than the front — wide, warm, deep. Your fingers sink easily. She makes a low sound.`,lbs:3,rel:4,flag:"kneaded_sides"},
          {id:"press_navel",label:"Focus on the center — the deep softness there",result:`The navel is a whole geography. You explore it with both thumbs. She grips the sheets.`,lbs:4,rel:3,requires:"pressed_deep"},
          {id:"rest_head",label:"Rest your head against her belly",result:`The warmth of it against your cheek is immediate and total. Under it, her digestion continues its slow work. She puts her hand on the back of your head.`,rel:6,flag:"rested_close"},
          {id:"whisper_size",label:"Tell her how large she feels",result:`You say it quietly. She breathes in sharply and then lets it out slowly. Her belly presses out further with the exhale.`,lbs:2,rel:5,flag:"named_her"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const rested=history.includes("rested_close");
          const named=history.includes("named_her");
          const base=stId<=3?`Your hands know her now. The specific warmth of her belly, the depth of it, the particular way it gives under your palms and holds you there.`
            :stId<=6?`You've mapped the surface and you've found that the map keeps getting bigger. She's been growing. You can feel the new softness — weeks of growth gathered under your hands.`
            :stId<=9?`There is more of her than there was last time you were here. You find new territory — further out, deeper down, warmer. She has been accumulating herself for months and it shows under your hands.`
            :`She is immense and soft and warm and you are entirely inside this project of her, both hands deep in the belly, and you are not close to done.`;
          return base+(rested?` She hasn't moved your head. She's keeping you there.`:``)+( named?` She watches the ceiling, breathing, thinking about what you said.`:``);
        },
        choices:[
          {id:"say_want_more",label:"Tell her you want her to keep growing",result:`The words come out exactly right. Her belly rises under your hands — she's inhaled sharply, deeply. She holds the breath. Then releases it.`,lbs:5,rel:7,flag:"asked_more"},
          {id:"kiss_belly",label:"Press your lips against her belly",result:`She goes very still. You stay there a long time. Neither of you speaks.`,lbs:2,rel:6,flag:"kissed_belly"},
          {id:"keep_hands_moving",label:"Keep your hands moving — silent, deliberate",result:`She understands. No words. Just your hands on her belly, constant and certain.`,lbs:3,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("asked_more")&&h.includes("kissed_belly"),text:`She pulls you up finally and holds your face in both hands and looks at you for a long time. "You're going to get exactly what you asked for," she says. "I want you to know that." She is completely serious. You believe her.`,gainBonus:5,relBonus:7},
      {condition:(h)=>h.includes("rested_close")||(h.includes("kneaded_sides")),text:`She keeps your head there against her belly long after the exploration has ended. You stay. The warmth and depth of her become ordinary in the best way — familiar, essential, necessary.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`She sits up slowly, her belly coming with her in its full soft weight, and she watches your face. "I know you liked that," she says. She's right. She's completely right.`,gainBonus:2,relBonus:3},
    ],
  },
  {
    id:"chest_buried",
    label:"Face in Her Chest",
    icon:"💫",
    desc:"You press your face into her chest — the warmth and softness there, the depth of her cleavage, the heavy weight of her breasts settling around you.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She pulls you in — one hand at the back of your head, guiding you to her chest. The softness meets you immediately: warm, dense, the specific give of her that you've come to know. Her heartbeat is deep and slow under her breastbone.`
            :stId<=6?`You put your face against her chest and feel the full weight of it — her breasts settling around your face with a warmth that's almost total enclosure. The cleavage is deep enough to get lost in. She puts her hand on the back of your head and keeps you there.`
            :stId<=9?`The mass of her chest is something you have to accommodate — it comes to meet you, warm and heavy and soft, the weight of each breast substantial, the cleavage deep enough to disappear into entirely. Her heartbeat is steady and slow against your cheek. She is very warm.`
            :`Being held against her chest is an immersive experience. The mass of her encloses your face completely — soft, extraordinarily warm, utterly yielding. The world reduces to the specific warmth of her skin and the deep slow sound of her heart and the weight of her settling around you from above.`;
          const ext=tier>=3?` She presses you closer, deliberate.`:` She makes a small, content sound.`;
          return base+ext;
        },
        choices:[
          {id:"turn_face",label:"Turn your face and press deeper into the cleavage",result:`The depth is startling. Warm, enclosed, soft on both sides. She makes a sound you feel in your chest.`,lbs:2,rel:4,flag:"went_deep"},
          {id:"hands_chest",label:"Bring your hands up to hold the weight of her chest",result:`Both hands cupping the weight from below. The heft of it is real and warm. She gasps softly.`,lbs:3,rel:3,flag:"held_chest"},
          {id:"breathe_slow",label:"Just breathe — slow, against her skin",result:`She stills around you. Your breath against her skin. Her body tightening and releasing with each breath.`,rel:5,flag:"breathed_close"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const deep=history.includes("went_deep");
          const base=stId<=3?`She's holding you there and you're not trying to leave. The warmth has built. Her chest rises and falls with her breathing, pressing against your face, releasing, pressing again.`
            :stId<=6?`The weight of her chest is distributed across your face — both sides soft and heavy and warm, the cleavage pressing in from either side, her heartbeat audible against your cheek.`
            :stId<=9?`You are significantly buried. The mass of her chest has enclosed much of your field of vision — warm, soft, enormous, utterly comfortable. She breathes in and out and the weight of it shifts against you.`
            :`The word buried is accurate. The weight of her chest is architectural — each breast enormously soft and heavy, the cleavage a warm canyon, her heartbeat a deep steady pulse below the surface. You could stay here.`;
          return base+(deep?` She's pressed you further in. You can feel both sides of her cleavage against your ears.`:` She strokes your hair with one hand.`);
        },
        choices:[
          {id:"find_heartbeat",label:"Press your lips to where her heartbeat is",result:`You find it: steady, sure, deep below the softness. She goes very still.`,rel:6,flag:"found_heart"},
          {id:"squeeze_gently",label:"Squeeze gently from both sides",result:`Both hands pulling slightly inward — the softness responds immediately, surrounding you further. She makes a sound she didn't plan.`,lbs:3,rel:4,requires:"held_chest"},
          {id:"look_up",label:"Look up at her from where you are",result:`You tilt your head back and find her face above you — her expression is something you'll remember for a long time.`,rel:5},
          {id:"say_something_muffled",label:"Say something against her skin",result:`She laughs — a real laugh, surprised and warm. "What?" she says. She heard you perfectly.`,rel:5,flag:"made_her_laugh"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const heart=history.includes("found_heart");
          const base=stId<=3?`The warmth of her has become complete. You've stopped noticing it as a sensation and started noticing it as the absence of everything else.`
            :stId<=6?`You are in her chest completely — her body around your face, her heartbeat audible, her breathing moving you with each slow expansion.`
            :stId<=9?`The world is her chest. Soft and warm and deep and entirely enclosing. You have been here long enough that it feels like the natural state of things.`
            :`There is only this: the warmth, the weight, the soft total enclosure of her. She has become the room. You have no interest in leaving.`;
          return base+(heart?` Her heartbeat has slowed. She's relaxed completely.`:``);
        },
        choices:[
          {id:"stay_forever",label:"Make it clear you'd stay here indefinitely",result:`You don't speak. You just settle deeper, let your body relax into hers. She understands.`,rel:7,lbs:1,flag:"chose_to_stay"},
          {id:"tell_her_gorgeous",label:"Tell her what you think of her body",result:`You say it into her chest and she feels the words before she hears them. Her grip tightens.`,rel:6,lbs:2,flag:"told_her"},
          {id:"let_weight_press",label:"Let her weight press down and stay with it",result:`She lets herself rest her weight on you fully — the mass of her chest, warm and heavy, becomes the whole of the experience.`,lbs:3,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("chose_to_stay")&&h.includes("found_heart"),text:`She keeps you there for a long time — her hand on the back of your head, your face buried against her, her heartbeat steady. When you finally surface she looks at you like you've confirmed something she suspected. "I knew you'd like it there," she says. She sounds profoundly pleased.`,gainBonus:3,relBonus:6},
      {condition:(h)=>h.includes("told_her"),text:`She pulls you up by the chin and kisses you once, completely, and then pulls you back down. "Stay," she says against your hair. "I'm not done."`,gainBonus:2,relBonus:5},
      {condition:()=>true,text:`She releases you eventually, and the air against your face feels strange after the warmth of her. She smooths your hair with one hand, a gesture so domestic and certain it makes your chest tight. "Good?" she asks. You can't quite speak.`,gainBonus:1,relBonus:4},
    ],
  },
  {
    id:"thighs_lap",
    label:"Between Her Thighs",
    icon:"🌡",
    desc:"You sit between her thighs, or she settles them around you — the weight and warmth of them enclosing you, enormous and present.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She opens her legs and you sit between them, and her thighs close around you from either side — warm, full, with a definite weight that you feel at your ribs and your hips. She leans forward slightly and the mass of her closes in further.`
            :stId<=6?`Her thighs are substantial enough to make this a genuine enclosure — thick, warm, heavy against your sides. When they close around you the pressure is real: soft but definite, the full weight of her thighs pressing in from both sides. She's watching your face.`
            :stId<=9?`The thighs that close around you are extraordinary: wide and soft and deeply warm, the flesh giving slightly under the pressure before holding its new shape around you. The circumference of them is significant. You feel enclosed in a very specific and very warm way.`
            :`She can barely spread her legs wide enough to fit you — her thighs are immense, soft slabs of warmth that close around you with a pressure that's verging on serious. The weight of them on either side of you is enormous. She looks down at the arrangement and makes a sound of pure satisfaction.`;
          const ext=tier>=3?` She squeezes. Deliberately. Once. Looking at you.`:` The warmth is immediate.`;
          return base+ext;
        },
        choices:[
          {id:"press_thighs_in",label:"Press into her thighs — feel the depth of them",result:`You push gently inward and the thighs yield and then return, warm and certain. She makes a low sound.`,lbs:2,rel:4,flag:"pressed_thighs"},
          {id:"hands_on_thighs",label:"Put your hands flat on her thighs",result:`Both hands on the tops of her thighs, spread wide. The warmth and softness are immediate. You can feel the density of them — not just surface.`,lbs:1,rel:3,flag:"touched_thighs"},
          {id:"settle_in",label:"Settle your weight back against her",result:`You lean back and she opens to accommodate you and then closes around you again, the full warm mass of her thighs holding you from either side.`,rel:5,flag:"settled_in"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const settled=history.includes("settled_in");
          const base=stId<=3?`You've found the position and she's settled into it and neither of you is moving away. The warmth of her thighs against your sides is constant.`
            :stId<=6?`Her thighs are warm bodies of their own — present, heavy, alive on either side of you. When she shifts her weight the mass of them moves against you in a slow warm wave.`
            :stId<=9?`You are enclosed by her in a way that makes enclosure feel like an understatement. The thighs around you are thick and warm and soft and they overlap you on either side. The weight of her is the room.`
            :`You are held between thighs that weigh more than some people. The soft, warm, enormous mass of them on either side of you is inescapable and entirely comfortable. She squeezes and the pressure is extraordinary.`;
          return base+(settled?` She's pulled you closer, so the backs of your ribs are against her belly.`:` She runs one hand along her own thigh, watching you watch her do it.`);
        },
        choices:[
          {id:"measure_thigh",label:"Try to wrap your hand around her thigh",result:`You can't. The thigh is too wide. Your hand doesn't make a dent in the circumference. She looks at your hand and then at you.`,lbs:3,rel:4,flag:"measured_thigh"},
          {id:"squeeze_back",label:"Press your knees into her inner thighs",result:`The response is immediate — she gasps softly and her thighs tighten around you. The pressure escalates.`,lbs:2,rel:5,requires:"pressed_thighs"},
          {id:"lean_back_into_her",label:"Lean back fully, let the belly behind you hold you",result:`You recline against her belly and she wraps around you from behind, the full warmth of her body enclosing yours entirely.`,rel:6,flag:"full_embrace"},
          {id:"trace_inner_thigh",label:"Trace the inner thigh — slowly",result:`Your fingertip along the inside of her thigh, slow and deliberate. She stops breathing for a moment.`,lbs:2,rel:5},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const embrace=history.includes("full_embrace");
          const base=stId<=3?`The two of you have settled into the specific warmth of this — her thighs on either side, your bodies close and certain.`
            :stId<=6?`There's nowhere to go and you don't want to go anywhere. The warmth of her thighs is complete and the weight of them is real and you are exactly where you want to be.`
            :stId<=9?`Her thighs are the world. Soft, enormous, warm on both sides, the weight of them against your ribs and hips definite and real. You've stopped noticing where you end and she begins.`
            :`Everything is her. The world is soft and warm and the thighs that hold you are each the width of your torso and the weight of them is extraordinary and you are held completely.`;
          return base+(embrace?` She has her chin on your head. Her belly presses warmly against your back.`:``);
        },
        choices:[
          {id:"tell_her_thighs",label:"Tell her specifically what her thighs do to you",result:`You say it. She squeezes once, deliberately, so you feel the answer.`,lbs:3,rel:7,flag:"named_thighs"},
          {id:"stay_held",label:"Just stay — held between them",result:`Silence. Her thighs holding you. Both of you completely still. The warmth the only motion.`,rel:5},
          {id:"push_deeper",label:"Work your way deeper into her lap",result:`You shift and she accommodates you and you are further in, closer, the full circumference of her thighs on both sides.`,lbs:2,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("named_thighs")&&h.includes("full_embrace"),text:`She holds you there for a long time — completely enclosed, her thighs on either side, her belly behind you, her arms over yours. "Mine," she says quietly. It doesn't mean you. It means the feeling. You understand.`,gainBonus:4,relBonus:6},
      {condition:(h)=>h.includes("measured_thigh"),text:`She watches you fail to wrap your hand around her thigh and she smiles — slow and satisfied. "Better get used to it," she says. You plan to.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`She releases you eventually with a slow exhale, the warm pressure of her thighs receding. You turn to face her. She looks warm and deeply satisfied. "Come back," she says. Not a question.`,gainBonus:2,relBonus:3},
    ],
  },
  {
    id:"under_her",
    label:"Under Her Weight",
    icon:"🌑",
    desc:"She rolls over you — or lowers herself fully — pinning you beneath her weight. The physical reality of all of her pressing down is the entire point.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She rolls over you in one slow, deliberate motion and her weight comes down on top of yours and it's more than you expected — warm and soft and definite, her belly against your stomach, her chest against yours, her thighs on either side. You feel your breath change.`
            :stId<=6?`She moves over you and the weight arrives in stages — first her belly coming down onto yours, warm and heavy, then her chest, then her full weight settling with a finality that pins you to the mattress with real, specific force. You feel the air go out of you. It comes back changed.`
            :stId<=9?`The process of her coming down onto you is significant. She moves carefully, both of you aware of the weight involved, and when she settles the experience of it is total: her enormous belly compressing against yours, her thighs on either side of your hips, the mass of her chest against your chest. You are pinned. Completely. The physics are simple.`
            :`She lowers herself onto you with your help and the weight that descends is extraordinary — several hundred pounds of warm, soft woman settling onto you with a slow finality. Your breath leaves. What comes back is compressed, different. Her belly is enormous on top of yours. Her chest is against your face. Her thighs pin yours completely. The weight is so complete it becomes its own kind of stillness.`;
          const ext=tier>=3?` She doesn't ask if you're okay. She can feel that you are.`:` She asks: "Too much?" You shake your head.`;
          return base+ext;
        },
        choices:[
          {id:"take_weight",label:"Accept the full weight — don't resist",result:`You stop bracing and let her settle completely. The weight doubles. She makes a sound of satisfaction at the feeling of you accepting her.`,lbs:3,rel:5,flag:"accepted_weight"},
          {id:"hands_back",label:"Put your hands on her back",result:`Both hands on the broad warm surface of her back, pressing her down, wanting more of her weight rather than less.`,lbs:2,rel:4,flag:"pulled_down"},
          {id:"breathing",label:"Focus on breathing under her",result:`You calibrate: shallow breaths, steady rhythm, her weight on your chest with each exhale and your ribs fighting it on each inhale. It's deeply grounding.`,rel:4,flag:"breathed_under"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const accepted=history.includes("accepted_weight");
          const base=stId<=3?`Her weight is the whole situation. You're aware of every point of contact — the warmth everywhere, the specific pressure of her belly against yours, her heartbeat against your chest.`
            :stId<=6?`She has settled onto you completely and the weight of her is the room. Her belly spreads warmly over yours. Her chest is against yours. Her thighs pin your legs.`
            :stId<=9?`The weight of her on you is extraordinary and entirely comfortable. She fills your arms when you reach up — there's so much of her to reach for, soft and warm and present in every direction.`
            :`You are comprehensively pinned. The weight above you is beyond easy description — warm, impossibly soft, alive, breathing, shifting in small ways that redistribute the force across you constantly. Her belly is a continent. Her thighs are walls.`;
          return base+(accepted?` She's given you a little more of her weight, testing. You took it without complaint.`:` She watches your face from above.`);
        },
        choices:[
          {id:"wrap_up",label:"Try to wrap your arms around her",result:`You reach up and your arms don't quite make it all the way around. You pull anyway. She comes down further.`,lbs:3,rel:5,flag:"wrapped_up"},
          {id:"shift_under",label:"Shift your hips — feel the weight redistribute",result:`The weight above you moves in a slow wave. She makes a sound that's half surprise, half pleasure.`,lbs:2,rel:4},
          {id:"press_belly_up",label:"Press your belly up against hers",result:`The pressure between your bellies increases. Soft against soft, but hers is vastly, definitively more. She feels the gesture and presses back.`,lbs:4,rel:4,requires:"accepted_weight",flag:"belly_pressed"},
          {id:"say_heavier",label:"Tell her you want her heavier",result:`She looks down at you. "I can do that," she says. She sounds entirely calm about it. You believe her.`,lbs:5,rel:7,flag:"asked_heavier"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const askedHeavier=history.includes("asked_heavier");
          const base=stId<=3?`She's on top of you and neither of you is in a hurry. The weight of her is familiar now — warm, definite, completely present.`
            :stId<=6?`The world is her weight. Everything below it — the mattress, your body, all of it — exists in relation to the warm, soft, heavy mass of her pressing down.`
            :stId<=9?`She fills your whole sky. Soft and warm and enormous above you, her weight distributed across you completely, her belly the ceiling. The physics are staggering.`
            :`She is pinning you with the casual thoroughness of gravity. Her weight is extraordinary — you feel it in your hips, in your ribs, against your chest. And it is entirely, perfectly right.`;
          return base+(askedHeavier?` She told you she'd get heavier. She has every intention of following through.`:``);
        },
        choices:[
          {id:"stay_under",label:"Ask her to stay — all her weight, right here",result:`"You don't have to ask," she says. She stays.`,lbs:3,rel:7,flag:"asked_stay"},
          {id:"reach_face",label:"Reach up and find her face",result:`Your hand against her cheek, above you. She turns into it.`,rel:6},
          {id:"feel_movement",label:"Let her move over you — feel the mass in motion",result:`The weight shifts and redistributes above you in slow, warm waves. The scale of it is remarkable.`,lbs:4,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("asked_heavier")&&h.includes("asked_stay"),text:`She stays on top of you until your bodies have grown warm together in all the places they touch, which is everywhere. When she finally rolls off, the absence of her weight is physical, uncomfortable, wrong. You reach for her. She comes back. "That's what I thought," she says.`,gainBonus:5,relBonus:7},
      {condition:(h)=>h.includes("belly_pressed"),text:`She lifts herself off you carefully and you feel the weight leave in stages — belly, chest, thighs. The cold is immediate and specific and you miss the weight before she's even gone. She looks at you. "Come find me again when you need it," she says.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`She rolls to the side and the weight leaves and the air comes back in fully and you lie there for a moment adjusting. She's watching you. "Worth it?" she asks. The question doesn't need an answer.`,gainBonus:2,relBonus:4},
    ],
  },
  {
    id:"feed_close",
    label:"Feed Her While Close",
    icon:"🍖",
    desc:"You feed her while she's in your arms or your lap — her belly against you, filling and growing heavier with each bite. Every pound she gains, you feel.",
    apCost:2,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She settles back against you — your chest against her back, your arms around her, and the food in reach. You bring the first bite up and she opens her mouth and takes it, and you feel the swallow work through her.`
            :stId<=6?`She's in your lap, half-turned toward you, and the first thing you place in front of her she takes without hesitation. Her belly is warm against your forearm. You feel it move as she chews and swallows, chews and swallows.`
            :stId<=9?`The setup takes a moment — she's large enough now that getting her into the right position is a project, but you find it: her back against your chest, your arms around the substantial warm circumference of her, the food arranged within reach. She starts eating and you feel every swallow working through her.`
            :`She can't move much. You come to her, settle behind her as well as you can, your arms reaching around the extraordinary width of her to bring food to her lips. She eats. You feel each bite arrive in the belly that rests between your arms, warm and heavy and growing.`;
          const ext=tier>=3?` She makes a deliberate, satisfied sound with the first bite. A performance, but a genuine one.`:` She tilts her head back against your shoulder.`;
          return base+ext;
        },
        choices:[
          {id:"feed_slow",label:"Feed her slowly — one bite at a time, close",result:`Each bite deliberate. You watch her throat work. You feel her belly against your forearm, warm and present.`,feed:false,lbs:3,rel:4,flag:"fed_slow"},
          {id:"feed_more",label:"Encourage her to take more, offer seconds immediately",result:`She doesn't hesitate. Bite follows bite and you feel the belly in your arms begin its slow work of expansion.`,feed:true,gainRange:[18,32],rel:3,flag:"fed_more"},
          {id:"whisper_eat",label:"Whisper to her while she eats",result:`You say things into her hair while she eats and she chews and swallows and the belly grows warm against you.`,feed:false,lbs:2,rel:6,flag:"whispered"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const fedMore=history.includes("fed_more");
          const base=stId<=3?`She's been eating and the belly against your forearm is perceptibly warmer, slightly firmer than when you started. She's settling into the fullness.`
            :stId<=6?`The belly in your arms has grown. It's not dramatic — an inch, perhaps, of new firmness, of warmth that has deepened. She's noticing it too. Her posture has changed.`
            :stId<=9?`The belly between your arms is notably heavier than when you started. You can feel the weight of what she's eaten — it's real, measurable, a warm growing mass that presses further out against your forearms with each passing minute.`
            :`You can feel her getting heavier. The belly in your arms is larger than when you started — warmer, firmer at the core, softer at the new edges where the expansion hasn't finished. She's eating steadily and the pounds are accumulating in your arms.`;
          return base+(fedMore?` She reaches for the next thing without being offered.`:` She leans back further into you.`);
        },
        choices:[
          {id:"feel_expansion",label:"Press your hands flat against her belly — feel it growing",result:`Both hands spread wide. There's more to cover than there was. She's expanding. You feel the process in real time.`,feed:false,lbs:4,rel:5,flag:"felt_growth"},
          {id:"offer_more",label:"Offer the next thing before she asks",result:`She takes it without comment, which is its own kind of answer. The eating is continuous. The belly grows continuously.`,feed:true,gainRange:[15,28],rel:4,flag:"offered_more"},
          {id:"belly_around",label:"Wrap both arms around the full belly — hold what she's taken in",result:`Your arms go around her belly and it's more than before — notably more. The warmth of the eating is there, the roundness of accumulated fullness. She makes a low, comfortable sound.`,feed:false,lbs:3,rel:6,requires:"fed_slow"},
          {id:"comment_fullness",label:"Tell her how full she's getting",result:`She inhales through her nose — a little proud, a little pleased. "I know," she says. She reaches for something else.`,feed:false,lbs:2,rel:5,flag:"told_full"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const feltGrowth=history.includes("felt_growth");
          const base=stId<=3?`She's still eating, slower now — she's getting genuinely full — and the belly in your arms is round and warm and heavy with everything she's consumed.`
            :stId<=6?`The expansion is real and present and your arms are full of it. She's eating less urgently now, but she's still eating, and the belly keeps its slow, warm growth.`
            :stId<=9?`The belly between your arms is enormous now — a full, warm, heavy mass that extends beyond your grip in every direction. She's still going. Slower, deliberate, but still going.`
            :`She has been eating for some time and what's in your arms is staggering. The belly is large beyond your comfortable grasp — warm and round and growing, the eating slower now but the accumulation continuing. You can feel individual pounds.`;
          return base+(feltGrowth?` You can feel the difference. The growth since you placed your hands is measurable, specific.`:``);
        },
        choices:[
          {id:"keep_feeding",label:"Keep feeding — bring more to her lips",result:`She opens her mouth and takes what you offer and swallows, and the belly against your arms grows another fraction warmer, another fraction fuller.`,feed:true,gainRange:[15,25],rel:5,flag:"kept_feeding"},
          {id:"measure_belly",label:"Try to span the belly with both hands — measure the growth",result:`Your hands at the largest point. The span is greater than when you started. Notably greater. She feels you measuring and makes a sound of deep satisfaction.`,feed:false,lbs:3,rel:6,flag:"measured_growth"},
          {id:"tell_her",label:"Tell her what it's like to hold her while she grows",result:`She goes still against you for a moment. Then: "Tell me more," she says. She takes another bite.`,feed:false,lbs:2,rel:7,flag:"told_her_growth"},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("told_her_growth")&&h.includes("kept_feeding"),text:`She puts her hands over yours where they rest on her belly and holds them there. Full, warm, heavy in your arms, the eating finally done. "Did I grow?" she asks — she knows the answer. "Yes," you say. "A lot?" "A lot," you say. She makes a sound of complete satisfaction and leans back into you.`,gainBonus:5,relBonus:7},
      {condition:(h)=>h.includes("measured_growth"),text:`She is noticeably larger than when you started and you measured it with your hands and she knows you measured it. She turns slightly to look at you. "All of that's in here," she says, touching her belly. "You put it there." It's a gift she's giving you. You take it.`,gainBonus:4,relBonus:6},
      {condition:()=>true,text:`She's full and heavy and warm in your arms and the eating is done. She puts her head back on your shoulder. "I could feel myself getting heavier," she says softly. "The whole time." She covers your hands with hers.`,gainBonus:3,relBonus:4},
    ],
  },
  {
    id:"kissing_pull",
    label:"Pull Her Close",
    icon:"💜",
    desc:"Kissing — her body pressing against you, the weight of her arriving in your arms, the soft mass of her coming against your chest.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`You pull her toward you and she comes — her mouth finding yours, her body following. The press of her against your chest is softer than you remember from before. There is more of her. It's immediately obvious.`
            :stId<=6?`You reach for her and she comes to you and the first contact is the belly — pressing against you before her face reaches yours, warm and soft and already there, announcing her arrival. Then her mouth.`
            :stId<=9?`You put your arms out and she comes into them and the mass of her arrives all at once — her belly against yours, enormous and warm, her chest against yours, heavy and soft. The kiss happens somewhere in the middle of all of it. She is a lot.`
            :`The distance between you closes and then she is against you and the scale of it is staggering — her belly presses into you with real force, her chest against yours, the warm mass of her arms on your back. The kiss is one part of a larger event. The larger event is her.`;
          const ext=tier>=3?` Her hands find the back of your neck and hold.`:` She makes a small, satisfied sound.`;
          return base+ext;
        },
        choices:[
          {id:"pull_tighter",label:"Pull her tighter — both arms, all of her",result:`You lock your arms around her and pull and there is more of her to pull than there was. She comes against you fully.`,lbs:2,rel:4,flag:"pulled_tight"},
          {id:"hands_face",label:"Hold her face in your hands",result:`Both hands on either side of her face. She is very still, very present. The kiss changes.`,rel:5,flag:"held_face"},
          {id:"let_her_come",label:"Open your arms and let her fill them",result:`She comes into you and finds the available space and fills it and exceeds it. Your arms close around what they can reach.`,rel:4,lbs:1,flag:"she_came_to_you"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const tight=history.includes("pulled_tight");
          const base=stId<=3?`Her body is against yours completely — the full press of her softness across your front, her warmth in your arms. The kissing continues.`
            :stId<=6?`The kiss has deepened and the physical situation has deepened with it — her belly between you, pressed in, her chest heavy against yours. She is entirely present.`
            :stId<=9?`The mass of her against you is comprehensive. Her belly is the primary contact — warm, round, pressed in from both sides of itself. The kissing happens and the body-contact happens and they are not separate things.`
            :`Her body pressing into yours is a full physical project. The belly, enormous and warm, fills the space between you entirely. Her chest presses from above. Her thighs press against yours. She is kissing you and she is completely surrounding you simultaneously.`;
          return base+(tight?` She's responded to being pulled close by pulling you closer.`:` Her hands are on your back, pressing.`);
        },
        choices:[
          {id:"grind_in",label:"Press into her belly while kissing",result:`Both of you pressing, the softness between you warm and deep. She makes a sound against your mouth.`,lbs:3,rel:5,flag:"pressed_together"},
          {id:"hands_everywhere",label:"Let your hands find everything",result:`Your hands over her back, her sides, finding the warmth and weight and depth of her in every direction.`,lbs:2,rel:5},
          {id:"break_look",label:"Pull back to look at her",result:`A fraction of space between you. You look. She's flushed, warm, slightly breathless, and the eye contact is the most intimate thing so far.`,rel:6,flag:"looked"},
          {id:"drag_lips",label:"Drag your lips along her jaw and throat",result:`She tilts her head back and her body pushes further into yours from below as she does.`,lbs:1,rel:5},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const looked=history.includes("looked");
          const base=stId<=3?`You've been kissing and holding each other and the warmth between you is total. Her body against yours is entirely familiar now.`
            :stId<=6?`The warmth of her body against yours is complete. Her belly is warm and present between you. Her hands haven't left your back.`
            :stId<=9?`Everything between you is warm and pressing. She is not separating from you and you have no interest in separating from her. Her belly between you is a warm constant.`
            :`She is enveloping you. There is a lot of her and she is applying all of it to the project of being as close to you as possible. The warmth is complete. The weight is real.`;
          return base+(looked?` The eye contact was the real thing. You're both still recovering from it.`:``);
        },
        choices:[
          {id:"say_want_her",label:"Say that you want her — specifically, exactly",result:`The words land. She presses closer in response, the belly against you firmer, more deliberate.`,lbs:3,rel:7,flag:"declared"},
          {id:"pull_to_couch",label:"Guide her toward sitting — stay close through the move",result:`The transition, her weight navigated through the room, both of you touching throughout.`,rel:5,lbs:2},
          {id:"stay_standing",label:"Stay just like this — don't move",result:`Neither of you moves. Her body is against yours. The warmth builds. Staying is the answer.`,rel:6},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("declared")&&h.includes("pressed_together"),text:`She stays against you for a long time after the kissing — her body pressed to yours, her chin on your shoulder, the warm mass of her belly between you. "I know," she says finally. "I know you want me." She sounds completely certain. "The feeling is mutual," she says. It is the most direct thing she has ever said to you.`,gainBonus:3,relBonus:7},
      {condition:(h)=>h.includes("looked"),text:`The moment of eye contact stays with both of you. She presses her forehead to yours. "Hi," she says softly. It's the same word she'd have used to greet you but it means something entirely different now.`,gainBonus:2,relBonus:6},
      {condition:()=>true,text:`She comes apart from you slowly, staying close, her hands the last thing to leave. She looks at you. "More of that," she says. Not a question. A plan.`,gainBonus:1,relBonus:4},
    ],
  },
  {
    id:"squeeze_thighs",
    label:"Squeeze Her Thighs",
    icon:"🫶",
    desc:"Your hands on her thighs — the soft, heavy warmth of them, the give under your fingers, the depth you find when you squeeze.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`Your hands find her thighs and settle there. She's seated and her thighs spread slightly under her own weight — soft, warm, yielding under your palms immediately.`
            :stId<=6?`Your hands on her thighs: the warmth comes through immediately, then the give — you press and the flesh yields and yields and keeps yielding, deep enough to be startling.`
            :stId<=9?`The thighs under your hands are large — wider than your hands, deeper than you thought, warm in the specific way of flesh that has built itself up slowly. You press and feel the layers of it.`
            :`The thighs your hands have found are extraordinary: wide and soft and deep, each one as thick as your torso, warm everywhere, yielding without limit. You press and feel the mass of them absorb the force and give back warmth.`;
          const ext=tier>=3?` She spreads slightly more. An invitation and a presentation.`:` She lets you look.`;
          return base+ext;
        },
        choices:[
          {id:"squeeze_firm",label:"Squeeze firmly — feel the depth of it",result:`You press in and find the resistance is deeper than you thought. The flesh gives and then gives more. She makes a low sound.`,lbs:2,rel:4,flag:"squeezed_firm"},
          {id:"knead_both",label:"Work both thighs at once",result:`Both hands, both thighs, the symmetry of the warmth and weight. She shifts her hips slightly.`,lbs:3,rel:3,flag:"kneaded_both"},
          {id:"trace_length",label:"Run your hands from knee to hip",result:`The full length of her thigh under your palms — the breadth increasing as you travel upward, the softness changing character.`,lbs:1,rel:5,flag:"traced_length"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const squeezed=history.includes("squeezed_firm");
          const base=stId<=3?`You've been here long enough to know the texture of her thighs now — the surface, the depth, the specific way they give.`
            :stId<=6?`Your hands have settled into the work of her thighs — exploring the soft depth of them, the warm density, the way the flesh moves under real pressure.`
            :stId<=9?`The thighs under your hands are generous enough to occupy you indefinitely. There is always more to find — softer, warmer, deeper, further in.`
            :`You have been exploring her thighs for some time and there is genuinely more of them than you first understood. Each press finds new territory — new depth, new softness, a warmth that increases the deeper you go.`;
          return base+(squeezed?` She's been watching your hands. Her expression says she likes what they're doing.`:` She's leaning back, giving you full access.`);
        },
        choices:[
          {id:"inner_thigh",label:"Move to the inner thighs",result:`The inner thigh is dramatically softer — almost shockingly so. She gasps softly.`,lbs:3,rel:5,flag:"inner_reached"},
          {id:"measure_squeeze",label:"Squeeze as hard as you can — measure the depth",result:`Real pressure. The flesh compresses to something firm deep down. The distance from surface to firm is considerable. She watches your effort with interest.`,lbs:4,rel:4,requires:"squeezed_firm"},
          {id:"move_to_buttocks",label:"Let your hands drift higher and back",result:`The transition from thigh to buttocks is gradual and entirely warm. She makes a decisive sound.`,lbs:2,rel:5,flag:"found_buttocks"},
          {id:"describe_them",label:"Tell her how large her thighs have gotten",result:`Her thighs tighten under your hands reflexively. Then relax. She breathes out slowly. "I know," she says, and she means it as pride.`,lbs:3,rel:6,flag:"described"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const inner=history.includes("inner_reached");
          const base=stId<=3?`Your hands know her thighs now — the geography of them, the specific warmth and depth.`
            :stId<=6?`She's responsive now to exactly the right amount of pressure in exactly the right locations. Your hands have learned her.`
            :stId<=9?`The thighs are a project, and you've been at it long enough to understand the scope of that project. There is still more to cover than you've covered.`
            :`Her thighs occupy your hands completely. Both of them, working at the generous territory available, and there is always more territory.`;
          return base+(inner?` She tightened when you went to the inner thigh. She hasn't asked you to leave.`:``);
        },
        choices:[
          {id:"use_both_hands_inner",label:"Both hands on the inner thigh — slow and firm",result:`She goes very still. Her hands find the sheets.`,lbs:4,rel:7,requires:"inner_reached",flag:"inner_both"},
          {id:"span_thigh",label:"Span the widest part — measure with both hands",result:`Both hands at the widest point. You can't span it. Not close. She feels your hands fail to close around her and makes a pleased, specific sound.`,lbs:3,rel:6,flag:"spanned"},
          {id:"just_squeeze_hold",label:"Squeeze and hold — stay in the grip",result:`You hold the pressure and she holds perfectly still, feeling it, not wanting it to change.`,lbs:2,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("inner_both")&&h.includes("described"),text:`She puts her hands over yours and presses them in harder, showing you what she wants. "There," she says. "Exactly there." Afterward she looks at you with an expression that's both satisfied and hungry. "Again soon," she says. "I'm going to be bigger."`,gainBonus:4,relBonus:6},
      {condition:(h)=>h.includes("spanned"),text:`She caught your hands failing to span her thigh and she is going to think about that for a long time. "I like that you tried," she says. Her voice is warm and deliberate.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`She covers your hands with hers when you stop. "Don't," she says. You don't.`,gainBonus:2,relBonus:4},
    ],
  },
  {
    id:"squeeze_chest",
    label:"Squeeze Her Chest",
    icon:"💛",
    desc:"Your hands on her breasts — the weight and warmth of them, the give and depth, the soft impossible fullness of them in your palms.",
    apCost:1,
    minTier:2,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`Your hands find her chest and the softness there is immediate and total — warm, yielding deeply under the slightest pressure, the weight of each breast resting in your palms with a warm, specific heft.`
            :stId<=6?`Your hands are full of her. The weight of her chest is real and warm and it comes to meet your palms as you press — the flesh giving, deepening, the warmth increasing with the pressure.`
            :stId<=9?`The chest in your hands is substantial — each breast heavy, warm, so soft that the first inch of pressure finds almost no resistance, only warmth and yield, the depth of it extraordinary.`
            :`Her chest is a project for both your hands working simultaneously. The weight of each breast is substantial — genuinely heavy, warm, deeply soft, yielding without floor. You press and feel the scale of what she's grown.`;
          const ext=tier>=3?` She rolls her shoulders back, opening toward you. An offering.`:` She watches your hands.`;
          return base+ext;
        },
        choices:[
          {id:"cup_both",label:"Cup both breasts — feel the full weight",result:`Both hands, the full weight of her in your palms. She breathes differently.`,lbs:2,rel:4,flag:"cupped_both"},
          {id:"press_together",label:"Press them together gently",result:`The cleavage deepens. The warmth increases. She watches what your hands make.`,lbs:3,rel:4,flag:"pressed_together_chest"},
          {id:"knead_slow",label:"Knead slowly — explore the depth",result:`Slow, deliberate, finding the depth. The flesh yields and yields. She makes a sound she wasn't expecting to make.`,lbs:2,rel:5,flag:"kneaded_chest"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const cupped=history.includes("cupped_both");
          const base=stId<=3?`The warmth of her chest in your hands is total. She's leaning slightly into your hands, adding her own weight.`
            :stId<=6?`Your hands are buried in her now — the softness has swallowed your palms entirely, the warmth coming from deep inside the flesh. She's breathing slowly and deliberately.`
            :stId<=9?`The depth and weight of her chest is beyond easy description. Both hands in her and there is still so much of her not in your hands. She keeps leaning forward.`
            :`You have both hands occupied with one breast and the other is waiting. She's warm beyond your ability to describe warm. She's heavy beyond your ability to describe heavy. She's soft beyond the category.`;
          return base+(cupped?` She's put her hands over yours, adding pressure.`:` She's breathing in careful, deliberate intervals.`);
        },
        choices:[
          {id:"lift_weight",label:"Lift — feel the actual weight of them",result:`You lift and feel the mass of her chest rise in your hands — real, specific, warm, considerable.`,lbs:3,rel:5,flag:"lifted_chest"},
          {id:"thumbs_focus",label:"Focus with your thumbs — find the most sensitive point",result:`She stops breathing entirely for two seconds. Then starts again, faster.`,lbs:2,rel:6,requires:"kneaded_chest",flag:"found_point"},
          {id:"face_in",label:"Press your face between them again",result:`The enclosure is immediate and total — warm on both sides, the cleavage pressing in, her weight against your face.`,rel:5,lbs:1},
          {id:"tell_her_gorgeous",label:"Tell her what her chest does to you",result:`She flushes from the chest up. "Say it again," she says immediately.`,lbs:2,rel:6,flag:"told_her_gorgeous"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const lifted=history.includes("lifted_chest");
          const base=stId<=3?`You know the weight and depth and temperature of her chest now. Your hands have settled into a rhythm.`
            :stId<=6?`Her chest fills your hands and overflows them. You've been exploring the full extent and the extent keeps being larger than you thought.`
            :stId<=9?`The project of her chest is ongoing. There is so much of it to cover and your hands are working, and she is entirely with you in this.`
            :`She is enormous in your hands. The weight of her chest, both breasts, is the weight of a meal. She is warm and beyond measure and entirely yours to touch.`;
          return base+(lifted?` She hasn't asked you to put her down. She's keeping herself in your hands.`:``);
        },
        choices:[
          {id:"squeeze_firm_chest",label:"Squeeze firmly — both at once",result:`The flesh compresses to something deep and then springs back. She makes a decisive sound.`,lbs:4,rel:6,flag:"squeezed_firm_chest"},
          {id:"measure_chest",label:"Try to span one breast fully",result:`One hand, trying to cover the full surface. You can't. Not close. She watches the attempt with great interest.`,lbs:3,rel:6,flag:"measured_chest"},
          {id:"never_let_go",label:"Hold them — tell her you'd stay like this",result:`You say it and you mean it and she knows you mean it.`,lbs:2,rel:7,flag:"declared_chest"},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("declared_chest")&&h.includes("squeezed_firm_chest"),text:`She puts her hands over yours when you finally still. "You can have this," she says. "All of it. Any time you want." She's looking at you with a directness that has no performance in it. "I mean that." She means it.`,gainBonus:4,relBonus:7},
      {condition:(h)=>h.includes("measured_chest"),text:`She caught you failing to span her breast and she is delighted by it. "Bigger every time," she says softly. "I know you come back to check." She's right.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`She gathers herself into the crook of your arm after and you keep one hand where it was. She doesn't suggest you move it. You don't.`,gainBonus:2,relBonus:4},
    ],
  },
];

export const INTIMACY_CONTEXTUAL={
  session_high_fullness:{
    id:"session_high_fullness",
    label:"Overflowing",
    icon:"💜",
    apCost:0,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She's full — really full — and she's leaning back in the chair with her hands on her belly, pressing against the fullness. She looks at you. The session has ended but neither of you has moved.`
            :stId<=6?`The fullness is visible: her belly extended, pressing out against her clothes, warm and round and present. She's breathing slowly. She makes a gesture you understand.`
            :stId<=9?`She's eaten enough to make herself genuinely immobile — her belly enormously full, round and drum-tight, her body reclined and still. She reaches one hand toward you.`
            :`The meal is inside her and she is enormous with it. The belly that extends before her is taut and warm and far larger than an hour ago. She cannot move. She is watching you. Her hand is reaching.`;
          const ext=tier>=3?` Her expression is open — she wants you close, now, while she's like this.`:` She's inviting you.`;
          return base+ext;
        },
        choices:[
          {id:"come_close",label:"Come to her — put your hands on her full belly",result:`The fullness under your hands is different from normal: tighter, rounder, hot with the work of digestion. She groans softly.`,lbs:4,rel:5,flag:"touched_full"},
          {id:"sit_behind",label:"Sit behind her and hold her from behind",result:`Your arms around the full belly from behind, feeling the warmth and tightness of it. She leans back into you.`,rel:6,flag:"held_full"},
          {id:"tell_her_full",label:"Tell her she looks incredibly full",result:`She presses her hands against her belly proudly. "I really am," she says. "Feel how tight."`,lbs:3,rel:5,flag:"named_full"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const held=history.includes("held_full");
          const base=stId<=3?`She's resting against you, full and warm and heavy, and the belly under your hands is taut with what she's eaten.`
            :stId<=6?`The belly in your arms is tighter than usual — you can feel the pressure of the fullness from the outside. She's making small sounds of satiated discomfort that are not complaints.`
            :stId<=9?`The enormity of her full belly is extraordinary — taut, enormous, warm, her body entirely reorganized around the mass of what's inside her.`
            :`She is maximally full and maximally soft and the belly between your hands is drum-tight and enormous and she is entirely at your mercy because she cannot move. She isn't trying to.`;
          return base+(held?` She's staying completely still, trusting you to hold the weight.`:` She watches you from under heavy eyelids.`);
        },
        choices:[
          {id:"press_gently",label:"Press very gently against the taut belly",result:`Even gentle pressure is significant when she's this full. She makes a sound between a groan and a yes.`,lbs:5,rel:6,flag:"pressed_full"},
          {id:"kiss_belly_full",label:"Press your lips to the taut belly",result:`She goes still. The warmth of it against your lips is different — more intense, more present, the fullness just beneath the surface.`,lbs:3,rel:7,flag:"kissed_full"},
          {id:"stay_close",label:"Just stay close — hands and warmth only",result:`Your hands on the full belly, still and warm. She breathes. The meal works. You feel it.`,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("kissed_full")&&h.includes("touched_full"),text:`She falls asleep while you're still close — her belly enormous and full and warm under your hands, rising and falling with her breathing. You stay. You have nowhere else to be.`,gainBonus:4,relBonus:6},
      {condition:(h)=>h.includes("pressed_full"),text:`She exhales slowly and the belly expands against your hands on the exhale. "That felt good," she says. "All of it felt good." She's talking about the meal and also everything else.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`The session is over but neither of you has moved. She's warm and full and close and that's the right state of things.`,gainBonus:2,relBonus:3},
    ],
  },
  session_tapout:{
    id:"session_tapout",
    label:"Past Her Limit",
    icon:"🔴",
    apCost:0,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`She's put her hand up — not a complete stop, but a pause. Her belly is visibly distended and she's breathing carefully. "I'm at my limit," she says. "Maybe just past it." She's not panicking. She's reporting.`
            :stId<=6?`She's stopped eating — hand on her belly, eyes closed, a very careful stillness. The belly under her hand is taut and round and warm and she's at or past her limit. "Just hold on," she says quietly. Not to you — to herself.`
            :stId<=9?`The tap-out is a physical event — she just stops, midway through a bite, and goes very still. Her belly is enormous and tight and her breathing has become shallow and deliberate. "Big," she says finally. "Too big right now."  She reaches for you anyway.`
            :`She has passed the limit and her body knows it — the belly is enormous and tight and her face has the concentrated expression of someone managing a significant physical situation. She reaches for your hand and puts it on the drum-taut surface of her belly without speaking.`;
          const ext=tier>=3?` She wants you to feel this, specifically.`:` She wants you close.`;
          return base+ext;
        },
        choices:[
          {id:"hold_her",label:"Hold her — hands on her full belly, steady",result:`Your hands on the stretched belly, steady and warm. She breathes against the pressure. The sounds she makes are entirely genuine.`,lbs:3,rel:6,flag:"held_tap"},
          {id:"rub_slow",label:"Rub her belly very slowly and gently",result:`The lightest circular motion. She makes a sound of relief and stays completely still for it.`,lbs:2,rel:7,flag:"rubbed_tap"},
          {id:"tell_her_proud",label:"Tell her you're proud of how far she went",result:`She opens one eye. "Yeah?" she says. The word has a lot in it.`,lbs:2,rel:5},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("rubbed_tap"),text:`She comes down from the edge slowly, your hands doing the work. When the worst has passed she looks at you with an expression of complete trust. "Bigger next time," she says. She's serious.`,gainBonus:3,relBonus:6},
      {condition:(h)=>h.includes("held_tap"),text:`The belly under your hands slowly relaxes from drum-tight to merely very full, very warm, very large. She exhales. "Thank you," she says. "That helped."`,gainBonus:2,relBonus:5},
      {condition:()=>true,text:`She sits with the fullness and you sit with her and eventually it becomes manageable. She looks at the food still remaining with an expression that is equal parts distress and ambition.`,gainBonus:1,relBonus:3},
    ],
  },
  dinner_afterward:{
    id:"dinner_afterward",
    label:"After the Dinner",
    icon:"🌙",
    apCost:0,
    phases:[
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const base=stId<=3?`The dinner is finished. The plates are cleared. She's sitting across from you with the specific stillness of someone who is very full and very comfortable and has no intention of moving soon. She meets your eyes.`
            :stId<=6?`The table between you is empty. She's sitting with both hands on her belly, which is visibly fuller and rounder than when dinner started, pressing gently against the fabric of her dress. She looks entirely satisfied.`
            :stId<=9?`After the dinner she's heavy and still — her belly enormous on her lap, straining against its constraints, warm and full of everything you've fed her. She's not going anywhere and you both know it.`
            :`The dinner is done and she is extraordinary — enormously full, her belly vast and tight in her lap, her body reclined and immobile and warm with the work of the meal. She looks at you across the table with an expression that is completely open.`;
          const ext=tier>=3?` She reaches across the table and takes your hand.`:` She watches you watching her.`;
          return base+ext;
        },
        choices:[
          {id:"move_close",label:"Come around the table — sit beside her",result:`You move close and she makes room — adjusting, accommodating you, her warm body against yours.`,rel:5,flag:"moved_close"},
          {id:"comment_full",label:"Tell her what she looks like right now",result:`She looks down at herself and then up at you. "I know," she says. The pride in her voice is complete.`,lbs:3,rel:5,flag:"commented"},
          {id:"offer_more",label:"Ask if she wants anything else",result:`She looks at the empty table, then back at you. "Maybe," she says. "In a minute." She's not done.`,lbs:5,rel:4,flag:"offered_more_after"},
        ],
      },
      {
        text:(history,s,tier)=>{
          const stId=getStage(s.lbs).id;
          const moved=history.includes("moved_close");
          const base=stId<=3?`The restaurant has gone quiet around you. Neither of you is in any hurry to be anywhere else.`
            :stId<=6?`She's leaning against you now, her belly warm and round and present between your arm and her own body. The evening has settled into something slow and good.`
            :stId<=9?`She cannot move and she is not trying to and you are beside her with your hand on her belly and this is exactly the right end to a dinner.`
            :`She is warm and enormous and still beside you and the belly under your hand is the sum total of the dinner and she is giving it to you to feel and you are feeling it.`;
          return base+(moved?` She's tucked herself against you as completely as she can.`:` She's watching you.`);
        },
        choices:[
          {id:"stay_long",label:"Stay long after — no hurry",result:`The evening is yours. Neither of you marks it. You stay.`,rel:7,flag:"stayed_long"},
          {id:"hand_on_belly",label:"Put your hand on her belly and leave it there",result:`She puts her hand over yours. You both feel the warmth and fullness under your hands.`,lbs:4,rel:6,flag:"hand_on_belly_after"},
          {id:"plan_next",label:"Tell her you want to do this again",result:`"Bigger next time," she says immediately. It's a date.`,lbs:3,rel:7,flag:"planned_next"},
        ],
      },
    ],
    endings:[
      {condition:(h)=>h.includes("planned_next")&&h.includes("hand_on_belly_after"),text:`The evening ends with your hand on her belly and a plan already in place. She stands slowly, her belly heavy and full, and you help her up and she leans into you. "I'm glad we did this," she says. "We're going to do it more." You are going to do it a great deal more.`,gainBonus:5,relBonus:7},
      {condition:(h)=>h.includes("stayed_long"),text:`You stay until the staff have stopped pretending not to look at you. She gets up eventually, slowly, her belly enormous and warm, and you walk out together and the evening air is cold and perfect.`,gainBonus:3,relBonus:5},
      {condition:()=>true,text:`The dinner ends well, as dinners with her always do. She is full and warm and happy and heavier than when she arrived.`,gainBonus:2,relBonus:3},
    ],
  },
};
