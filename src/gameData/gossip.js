// ─── GOSSIP SYSTEM ────────────────────────────────────────────────────────────
// Every girl talks about 2 classmates. 4 stage brackets: low(0-2)/mid(3-5)/high(6-8)/blob(9)
// All have offerHelp + helpMultiplier. helpReason describes motivation shown in UI.

export const GOSSIP = [

  // ── BRITTANY (0) ── about Jasmine & Sophie
  { speakerId:0, targetId:10, attitude:"catty",
    lines:{
      low:[
        `Brittany rolls her eyes. "Jasmine's been skipping practices. Her uniform was really tight last week. I didn't say anything." She examines her nails. "Not that I was looking."`,
        `"Jasmine and I co-captained for two years and I support her but she ate four slices at team dinner. Not that I was counting."`,
      ],
      mid:[
        `Brittany's expression is complicated. "Jasmine is huge now. Everyone notices." A pause. "She seems annoyingly happy though. I don't know how she does it."`,
        `"She can't do the jumps anymore," Brittany says, then laughs despite herself. "She just sways. And she's still the loudest person in the room. It's infuriating."`,
      ],
      high:[
        `Brittany prods her own soft middle. "Jasmine's enormous. Way bigger than me even." A pause. "She just owns it. I kind of respect that. Annoyingly."`,
        `"Don't tell her I said this," Brittany says, "but Jasmine looks amazing. Huge and loud and happy." She glances at herself. "Maybe being big isn't the worst thing."`,
      ],
      blob:[
        `Brittany is quiet for a long moment. "Jasmine's basically immovable now. She holds court from her couch and people go to her." A pause. "I've started going too." She pats her own enormous belly. "She feeds everyone who visits."`,
        `"I went to see Jasmine last week," Brittany says. "She's enormous." She looks at her own very round belly. "She told me I was catching up. She seemed pleased." A beat. "I was also pleased. Somehow."`,
      ],
    },
    offerHelp:`Brittany's eyes narrow. "Okay. When Jasmine's bigger than me, I look smaller by comparison. Simple math." She examines her nails. "I could make sure she keeps growing. It's basically a public service. For my ego."`,
    helpReason:"Spite & comparison — Brittany wants Jasmine bigger to look relatively slim herself.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Okay she is genuinely bigger than me right now and that is simply not acceptable. I'm escalating. I'm taking her to lunch every single day and I'm ordering for both of us and she is going to be so enormous that I look absolutely svelte by comparison. This is a tactical decision and I feel great about it."},
    {atLbs:250, addMult:0.20, line:"Two hundred and fifty pounds. She's enormous. I'm almost impressed — emphasis on almost because she is still bigger than me and that is the situation I am SOLVING. Daily dessert hauls. Premium delivery. She gets everything she wants. I am incredibly generous when I have a motive."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds. Jasmine is three hundred pounds. She is a goddess and I am her devoted feeder and absolutely none of this is because I think she's incredible, it's purely strategic. I'm sending another food box. The biggest one. She deserves it. For my purposes. My purely self-interested purposes."},
  ],
  },
  { speakerId:0, targetId:14, attitude:"catty",
    lines:{
      low:[
        `Brittany barely remembers Sophie exists. "The new pledge? She's fine. A bit nervous. Eats a lot at events." She shrugs. "Freshmen."`,
        `"Sophie follows Tiffany around everywhere," Brittany says. "She's already getting soft. Tiffany's done that to her." She sounds almost knowing. "The dining hall does the rest."`,
      ],
      mid:[
        `Brittany tilts her head. "Sophie's actually getting kind of big. Noticeably. She's gotten a lot more confident too." A pause. "I like her better now, weirdly."`,
        `"Sophie filled out completely," Brittany says. "She came in nervous and now she waltzes into every event." She sounds impressed despite herself.`,
      ],
      high:[
        `"Sophie is massive," Brittany says. "Bigger than me at this point." She sounds almost fond. "She carries herself completely differently now. It's actually a glow-up."`,
        `Brittany nods slowly. "Sophie's one of the big girls now. I've started talking to her more." She prods her belly. "We've been going to brunch. She orders everything."`,
      ],
      blob:[
        `"Sophie can barely move," Brittany says, and there's genuine warmth under the words. "She's enormous. She texts me photos of her meals and they're absolutely absurd." She laughs. "I send her recommendations. We have a whole thing now."`,
        `Brittany looks genuinely surprised by herself. "Sophie became this big, happy person right in front of me and I didn't even notice until she was huge." She smiles. "I think I'm proud of her? Weird."`,
      ],
    },
    offerHelp:`Brittany examines her nails. "If Sophie keeps growing, people stop looking at me as the one who let herself go. Fresh meat." She pauses, then something softer crosses her face. "Also she's sweet and she deserves to be comfortable. Both things are true."`,
    helpReason:"Deflection & unexpected fondness — Sophie draws attention away, but Brittany genuinely likes her too.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie hit two hundred and I got genuinely emotional about it, which is not a thing I advertise. She came in as this little nervous thing and now she is soft and confident and huge and I want to make sure she keeps going. I'm taking her to brunch twice a week. Maybe three times. She orders everything when I'm there."},
    {atLbs:250, addMult:0.20, line:"Sophie is two-fifty and she sent me a selfie and she looked so HAPPY and I immediately ordered her a care package from that bakery she loves. I'm not soft. I'm strategically generous. The strategy is 'make Sophie enormous and feel like the best version of herself.' I contain multitudes."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Sophie. God. She looks incredible. I'm texting her daily food recommendations and she follows every single one and I know because she sends me photos and each one is better than the last. This is my legacy project and it is going extremely well. I am so proud. Don't tell her."},
  ],
  },

  // ── MADELINE (1) ── about Emma & Priya
  { speakerId:1, targetId:11, attitude:"warm",
    lines:{
      low:[
        `Madeline glances up from her book. "Emma's been bringing considerably more snacks to the library. I haven't said anything because I've been benefiting from it."`,
        `"Emma and I study together. She used to bring tea and a biscuit. Now she brings a whole spread." Madeline pauses. "I've been eating significantly more. I think she's contagious."`,
      ],
      mid:[
        `"Emma is getting very round," Madeline says, in the tone of someone describing a research finding. "Her cardigan doesn't close anymore." A pause. "Also she brought incredible pastries to our last session and I ate four of them."`,
        `"Emma's thesis is on eating cultures now. Hands-on research. You can tell." Madeline sounds approving. "She's gotten quite big. Very round cheeks."`,
      ],
      high:[
        `"Emma is enormous and brilliant and I find both equally impressive," Madeline says simply. "Published a paper last month. Also outgrown two desk chairs. Most ambitious self-study in the department."`,
        `"We've both gotten very fat this semester." She says it neutrally. "We don't discuss it. We just bring more food to study sessions. The research is going well."`,
      ],
      blob:[
        `Madeline is quiet for a moment. "Emma can't really come to the library anymore. I bring books to her." She adjusts her glasses. "She's enormous. She studies from bed surrounded by food and has published three papers this year." A pause. "I find this inspiring."`,
        `"Emma and I had our best study session in months last week," Madeline says. "She barely moves. I brought everything and we sat for six hours." She pats her own very round belly. "We are both very large scholars. I think that's the best outcome."`,
      ],
    },
    offerHelp:`Madeline looks thoughtful. "Emma is motivated by snack incentives. If I brought her favourite pastries every study session — and we study a lot — the caloric accumulation would be statistically significant." She blinks. "I could do that. For research. And because I like her."`,
    helpReason:"Genuine affection & academic curiosity — Madeline wants Emma to thrive and the data is interesting.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and her R-squared value is extraordinary and I have increased the pastry quantity at our study sessions by forty percent, which correlates with a statistically significant uptick in her productivity AND her weight, and I am tracking both because both matter and I am a scientist who is also very fond of her."},
    {atLbs:250, addMult:0.20, line:"Two hundred and fifty. The trajectory is remarkable. I have commissioned a custom weekly delivery from the patisserie she mentioned once six weeks ago, because I retain relevant data, and she is going to be so wonderfully enormous by the end of semester and the research is going to be extraordinary and so is she."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Emma, brilliant and enormous, and I am running a continuous supply operation that she assumes is 'just how I am' and technically that is correct, this is just how I am, I am someone who loves her and tracks her intake with a level of rigour that would look concerning in any other context but here is simply called thorough."},
  ],
  },
  { speakerId:1, targetId:7, attitude:"curious",
    lines:{
      low:[
        `"Priya is extraordinary," Madeline says. "She schedules everything including apparently her stress eating. She has a spreadsheet. I've glimpsed it. Very thorough."`,
        `"Priya and I use the same study room sometimes. She eats constantly while she works. More than me, which is saying something." She sounds intrigued. "Her output correlates with her intake."`,
      ],
      mid:[
        `"Priya has gotten quite big and turned it into a thesis topic," Madeline says admiringly. "I reviewed her methodology. It's rigorous. She is her own primary source." A pause. "Inspired, honestly."`,
        `"Priya published about her own weight gain as a study in adaptive behaviour," Madeline says. "I cited it. We've been comparing notes. She is getting extremely large." She looks at her own rounder figure. "So am I. Different methodologies, similar conclusions."`,
      ],
      high:[
        `"Priya and I are the two fattest academics in the department," Madeline says, with what sounds like pride. "We have been comparing data. The convergence is striking." She pats her enormous belly. "Good work, both of us."`,
        `"Priya can barely fit into the study rooms now," Madeline notes. "We've been meeting in the wider seminar space. She brings food. I bring food. We eat and argue about methodology." She smiles. "Perfect."`,
      ],
      blob:[
        `"Priya is immense," Madeline says simply. "She completed her PhD from home, in bed, surrounded by food, and it was excellent work." She pauses. "I find her inspiring. The body as data set, taken to its logical conclusion."`,
        `Madeline looks almost wistful. "Priya and I used to compete academically. Now we compete in other metrics." She glances at her own vast frame. "She is currently ahead. I intend to close the gap."`,
      ],
    },
    offerHelp:`Madeline taps her pen. "Priya eats more when she's in scholarly discussion. If I arranged weekly research meetings with extensive refreshments — I know her preferences exactly — her data would become very compelling very quickly." She pauses. "For science."`,
    helpReason:"Research interest — Madeline wants to compare outcomes. Priya is a fascinating parallel subject.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Priya has hit two hundred and made a chart about it and I have reviewed the chart and it is good work and I am choosing to contribute further data points by ensuring that every single co-study session is catered to her exact documented preferences. Science demands replication. I am replicating. Extensively."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Priya. The comparative study is approaching publishable levels and I am sending her a weekly research stipend in the form of a premium grocery order and she is logging it as 'collaborative fuel allocation' which is the most Priya thing that has ever happened and I love it and I want her to get so much bigger."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Priya sent me a graph of our comparative weight trajectories and I am behind by eleven pounds and I consider this a crisis and I am addressing it for personal reasons while simultaneously ensuring her supply chain is uninterrupted. Two goals. One strategy. I am very efficient."},
  ],
  },

  // ── KYLIE (2) ── about Tiffany & Destiny
  { speakerId:2, targetId:6, attitude:"catty",
    lines:{
      low:[
        `Kylie glances at her phone. "Tiffany's looking softer in her last three posts. Her engagement is actually up though." She tilts her head. "Which is interesting."`,
        `"Tiffany's definitely gained," Kylie says. "Her usual outfits aren't fitting. Her followers love it, weirdly. It's throwing off my metrics."`,
      ],
      mid:[
        `"Tiffany is getting huge and her content is doing better than mine," Kylie says. She crosses her arms. "Her aesthetic is genuinely good though. I hate it."`,
        `"I kind of want to interview Tiffany," Kylie admits. "Big happy sorority queen thing. It works visually." A reluctant pause. "Annoying how good she looks."`,
      ],
      high:[
        `"Tiffany kind of inspired my whole rebrand," Kylie says. "Seeing her just be huge and confident — that unlocked something." She gestures at herself. "I started leaning into my own trajectory."`,
        `"I did a collab with Tiffany. We met for dinner and were there three hours." She looks thoughtful. "I've eaten a lot more since then. My numbers went up."`,
      ],
      blob:[
        `"Tiffany is massive now. Actually immobile-level massive." Kylie is quiet. "She did a video from her bed surrounded by food and it got four million views." A beat. "Four million. I have a whole team and she beats me from a bed." She sounds equal parts irritated and awed. "I've been visiting her to pick up tips."`,
        `Kylie sighs. "Tiffany doesn't even have to try anymore. She just exists and people watch." She looks at her own very round body. "I've been getting there. She gives me advice." A pause. "The advice mostly involves eating more. It's working."`,
      ],
    },
    offerHelp:`Kylie smiles slowly. "If Tiffany keeps getting bigger, she keeps generating content that makes mine look comparatively polished. And also — the bigger she is, the better I look next to her." She tilts her head. "Completely cynical. I'll host dinners."`,
    helpReason:"Optics & content strategy — Tiffany bigger means Kylie looks good by comparison and gets material.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and absolutely dominating her corner of the internet and I need to be in her orbit when that number keeps climbing because the content at three hundred is going to be INSANE and I want exclusive behind-the-scenes access and I am achieving this by making sure she is continuously, lavishly fed every time I see her."},
    {atLbs:250, addMult:0.20, line:"Two-fifty Tiffany is my most engaged collab partner and also the most impressive person I have ever filmed and I have started quietly coordinating her meal deliveries because I need her at maximum capacity at all times. This is content strategy. I am very professional about it. I also genuinely cannot stop watching her eat."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Tiffany, effortlessly enormous and growing, and I am funding this personally at this point. Premium catering, weekly spreads, anything she mentions wanting. Her audience is in millions. My investment is paying off. Also she's magnificent and I would do this anyway but I'm choosing to frame it as business."},
  ],
  },
  { speakerId:2, targetId:5, attitude:"curious",
    lines:{
      low:[
        `Kylie looks uncertain. "Destiny streams herself eating constantly and people love it. Like, a lot of people." She tilts her head. "I don't understand her audience but the numbers are real."`,
        `"Destiny doesn't do anything I do and yet she has more followers than me in her niche." Kylie sounds slightly pained. "She just eats and games. And she's getting noticeably larger."`,
      ],
      mid:[
        `"Destiny's gotten really big and her viewership keeps climbing," Kylie says. "I've been studying her approach." A pause. "The approach seems to be: eat a lot, don't care, be authentic." She looks down at herself. "Hm."`,
        `"I reached out to Destiny about a collab." Kylie adjusts her hair. "She said she'd think about it but she was eating at the time and seemed distracted. Very on brand."`,
      ],
      high:[
        `"Destiny and I have done two collabs now. She's enormous and incredibly watchable." Kylie sounds reluctantly impressed. "She eats everything on camera and just doesn't care." She smooths her own thicker middle. "My numbers went up both times."`,
        `"I've learned a lot from Destiny, honestly," Kylie says. "Big, comfortable, just eating and not explaining yourself." A pause. "I've been practising."`,
      ],
      blob:[
        `Kylie shakes her head slowly. "Destiny is completely immobile now and her stream hits record numbers every week." She sounds somewhere between baffled and admiring. "She films from a fixed camera. She just eats and exists and people cannot stop watching." A beat. "I've been at her place filming content. I learn something every time."`,
        `"Destiny told me she has no plans to change anything," Kylie says. "She said: 'maximum comfort, maximum food, maximum audience.' Three maximums." She looks at her own enormous figure. "I'm trying to match that energy."`,
      ],
    },
    offerHelp:`Kylie tilts her head. "If Destiny gets bigger, the content gets more extreme, the audience grows, and I want to be adjacent to that. I could start sending her food deliveries 'as a gift.' She'd never overthink it." She smiles. "And I get a front-row seat for the content."`,
    helpReason:"Audience capture — Destiny's growth means better content. Kylie wants to be nearby when it happens.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Destiny is two hundred pounds and streaming it and the chat goes absolutely feral every time she eats on camera and I have started sending anonymous gift deliveries to her setup because I want to be the one supplying the content that gets her to three hundred and I want the footage when it happens. This is content investment. Very normal."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Destiny is eating on stream and I am watching the viewer numbers tick up in real time and I ordered her a specialty food box this morning and she opened it on camera and said 'whoever sent this knows me' and I do. I know exactly what gets her to keep eating and I am curating it with professional precision."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Destiny, completely immobile, completely thriving, and I have basically become her off-screen production team at this point — coordinating deliveries, timing the good stuff for peak viewing hours. She thinks she's self-sufficient. She is. I'm just making sure everything she needs keeps arriving. The numbers justify everything."},
  ],
  },

  // ── SERENA (3) ── about Aaliyah & Kylie
  { speakerId:3, targetId:13, attitude:"catty",
    lines:{
      low:[
        `Serena's jaw tightens. "Aaliyah's times are slipping. She's been eating a lot at team dinners." She sounds like she's filing information away. "I've noticed."`,
        `"Aaliyah's getting slower," Serena says. "Putting on weight. I haven't said anything because she's my teammate but it's noticeable."`,
      ],
      mid:[
        `Serena's edge softens. "Aaliyah dropped off the team. She's gained a lot." A pause. "She seems happier though. Happier than I've seen her." Another pause. "I've been eating more too. Probably nothing."`,
        `"I ran into Aaliyah at the dining hall on her third plate. We had lunch for two hours." She sounds surprised at herself. "She's huge and completely fine with it. I found that weird and also appealing."`,
      ],
      high:[
        `Serena is quiet. "We've both gotten really big. We don't talk about times anymore. We talk about food." She reaches for something to eat. "I don't miss it the way I thought I would."`,
        `"Aaliyah said she's happier now than she ever was competing," Serena says. She smooths her very round belly. "I keep thinking about that." She takes a bite. "I think I'm starting to understand."`,
      ],
      blob:[
        `"Aaliyah is enormous," Serena says. Nothing competitive in her voice anymore. "She barely moves but she's always in a great mood. She told me she broke the scale and just ordered a heavier-rated one." A long pause. "We have lunch delivered together most days. We've gotten competitive about who orders more." She smiles. "It's the right use of the competitive instinct."`,
        `Serena spreads her hands across her own massive belly. "Aaliyah and I used to race each other. Now we challenge each other to finish our plates." She sounds completely at peace. "Same sport. Different metrics."`,
      ],
    },
    offerHelp:`Serena's look is half competitive, half something else. "Aaliyah and I eat together every day. If I make sure we eat a lot — really commit to it — she'll match me. She always kept pace with me athletically." She smiles slowly. "Same energy. Different direction. I'm very goal-oriented."`,
    helpReason:"Competitive redirection — Serena's still competing, just in a different direction now.",
    helpMultiplier:1.45,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Two hundred pounds on Aaliyah and I told her she was falling behind in our lunch competition and she ordered a second entree immediately and that's when I knew — same competitive wiring, completely different application. I am ordering the heaviest thing on every menu and she is matching me every single time and we are both getting so much bigger and this is the most fun I have had in years."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Aaliyah and I am winning on pounds but she is winning on attitude and I cannot accept that so I am escalating both. Daily lunch. Extended dinner sessions. I find the most loaded menus in the city and we go through them together and I keep score and she keeps score and neither of us is slowing down. This is sport. We are athletes."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Aaliyah looked me in the eye and said 'I'm ahead' and she is CORRECT and I have never been more motivated in my life. I am meal-prepping for both of us. I am scheduling double dinners. I ran four-minute miles and now I run this competition and I am going to WIN even if winning means we both end up absolutely enormous and I am completely fine with that outcome."},
  ],
  },
  { speakerId:3, targetId:2, attitude:"curious",
    lines:{
      low:[
        `Serena glances over. "Kylie films herself eating for an audience. I don't understand it." She pauses. "She's getting softer. Her content seems to be getting more popular as that happens." A longer pause. "I still don't understand it."`,
        `"Kylie is always filming," Serena says. "I don't know why people watch. She eats things on camera and she's getting noticeably rounder." She frowns. "She was asking me about my athletic diet. Said she might 'pivot to mass content.'" She shakes her head. "I don't know what that means."`,
      ],
      mid:[
        `"Kylie has gotten quite big," Serena observes. "She posts about it constantly. People apparently love it." She seems genuinely baffled. "She has 400,000 followers watching her eat. I had 200 watching me run a four-minute mile." She shakes her head. "Wrong career."`,
        `"Kylie offered to film me for her channel," Serena says. "I said maybe. She said my 'transformation arc' would do numbers." She looks at her own softer body. "I hate that she's probably right."`,
      ],
      high:[
        `Serena shrugs. "Kylie's enormous now and completely owns it. I've been in two of her videos. My followers went from 200 to 12,000." She looks almost guilty. "I don't know what I'm doing but it seems to be working."`,
        `"Kylie told me I have 'natural big girl energy' and that I should post more." Serena touches her enormous belly. "She's not wrong. I posted yesterday. 800 likes."`,
      ],
      blob:[
        `"Kylie is massive now and making more money than I ever did in athletics," Serena says. "She filmed me eating last month. The video got a million views." A flat pause. "A million. For eating." She stares at nothing. "I've started my own channel."`,
        `Serena laughs. "Kylie and I are basically the same person now. Big, settled, filming ourselves existing." She gestures at her vast body. "She has more followers. I'm working on that." She takes an enormous bite. "Content creation is a sport."`,
      ],
    },
    offerHelp:`Serena frowns. "If Kylie gets bigger and keeps posting, she'll probably want me in more videos. More videos means more people see me, which means—" she pauses, working through the logic "—I want to win something. And this is apparently a competition I can win." She nods. "I'll feed her."`,
    helpReason:"Competitive logic — Serena has reframed this as a competition she can win. Winning means feeding Kylie.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Kylie's at two hundred and she asked me to be in another video and I said yes and I made sure we went to the most loaded restaurant I knew beforehand and she ate everything and looked incredible doing it and her numbers went up and she credited me and honestly I want to do this every week. Winning through someone else's growth. New competitive category."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Kylie and she is enormous and successful and I have become her unofficial dining director — I pick the restaurants, I recommend the dishes, I order for both of us, and she trusts my judgment completely because I have never steered her wrong. She thinks I have good taste. I do. I also have a goal. Both are true."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Kylie is a phenomenon and I made her a training schedule except the training is eating and she follows it without question because she frames it as content prep and the results are undeniable. I was an athlete. I still am. Different event. Kylie is my project and she is going to be enormous and magnificent and it's going to be spectacular."},
  ],
  },

  // ── FIONA (4) ── about Roxanne & Chloe
  { speakerId:4, targetId:12, attitude:"warm",
    lines:{
      low:[
        `Fiona looks thoughtful. "Roxanne eats constantly and calls it field work. She's getting very round." She says this approvingly. "Her work is getting very interesting. I think they're the same thing."`,
        `"Roxanne and I have a food-as-medium project. We make things and eat them." Fiona says. "There's a lot of eating. She's getting rounder. The work is richer." She nods dreamily.`,
      ],
      mid:[
        `"Roxanne is becoming her own best subject. Big. Very present in space." Fiona tilts her head. "She's also been eating my studio leftovers. I've been making extra." She smiles.`,
        `"Roxanne has this quality now — she takes up space and makes it mean something." Fiona pauses. "She's getting very large. The work is extraordinary."`,
      ],
      high:[
        `"Roxanne and I are both enormous and doing our best work," Fiona says with serene certainty. "I think abundance feeds the work." She looks at herself. "Evidence: all of this."`,
        `"Roxanne said 'the body is the most honest canvas' and then ate a very large lunch." Fiona smiles. "I love her. She's getting so big and so good."`,
      ],
      blob:[
        `Fiona is quiet for a moment. "Roxanne can barely move now. She creates from where she sits and her scale has completely changed — everything she makes is enormous, overwhelming, incredibly alive." She looks moved. "She is the most interesting artist I know. She feeds the work and the work feeds her."`,
        `"I visited Roxanne in her studio yesterday," Fiona says softly. "They widened the doorway. She fills a reinforced chair. She made me sit next to her and eat while she worked." She pauses. "It was the best afternoon I've had in years. She's magnificent."`,
      ],
    },
    offerHelp:`Fiona considers. "Roxanne eats anything I cook without question. She trusts my palate." A slow smile. "If I cooked for her every day — rich things, generous portions — the work would change again. I want to see that." She pauses. "Also I just love feeding people I love."`,
    helpReason:"Artistic symbiosis & love — Fiona feeds Roxanne to see her art transform. Also just affection.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Roxanne at two hundred pounds and the work has changed again — bigger, more physical, more overwhelming — and I am cooking for her every single day now because I can see the direct line between what she eats and what she makes and I want to push both as far as they will go. Also I love her and feeding someone you love is its own art."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Roxanne is magnificent and enormous and I have been leaving entire prepared meals outside her studio door because she forgets to eat when she's working and I need her well-fed and large and absolutely thriving. She told me yesterday that she's never been more prolific. I know why. I am why. I'm feeding the fire."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Roxanne and she is a masterpiece herself at this point and I am in the middle of the most creatively fertile period of my life and so is she and both of us know that these things are not unrelated. I cook. She makes. We both grow. The work and the weight compound together and I would not change a single gram of it."},
  ],
  },
  { speakerId:4, targetId:9, attitude:"warm",
    lines:{
      low:[
        `Fiona watches Chloe from a distance. "She's very open to everything. Eats whatever she finds, goes wherever is interesting." She tilts her head. "There's something beautiful about that. She's softening as she opens up."`,
        `"Chloe is very eager," Fiona says. "She tried all my studio snacks when she visited. Twice. She's already getting rounder." She says this with genuine warmth. "She fits in here."`,
      ],
      mid:[
        `"Chloe has gotten quite big," Fiona says. "She used to be lost. Now she knows every good place on campus." She tilts her head. "She's found herself. She's also gotten very round." She smiles. "I find that poetic."`,
        `Fiona looks contemplative. "Chloe came by the studio. She sat for a still life." She pauses. "She's getting very good as a subject. Very present. I'd like to paint her properly."`,
      ],
      high:[
        `"Chloe is enormous and completely at home," Fiona says softly. "She came to this campus lost and she grew into herself. Literally." She looks genuinely moved. "That's the most interesting kind of transformation."`,
        `Fiona nods slowly. "Chloe is very large now. I painted her last week. She sat perfectly still for three hours and ate continuously." She looks at the imaginary canvas. "It's the best thing I've made."`,
      ],
      blob:[
        `Fiona is quiet for a long time. "Chloe is immovable now. She called herself a campus landmark and she meant it literally." She smiles. "She arrived here with a map and now she is the map." She takes out her sketchbook. "I need to paint her again. She keeps changing."`,
        `"I did a full portrait series of Chloe this semester," Fiona says. "Twelve paintings. Earliest one is this slight, lost girl with a map. The last one barely fits the canvas." She looks moved. "The whole show is her story. It's the best work I've ever done."`,
      ],
    },
    offerHelp:`Fiona looks thoughtful. "Chloe trusts me. She's open to everything." She turns her sketchbook over in her hands. "If I brought her into the studio regularly and fed her — there's a series in that transformation. I'd be documenting it." She pauses. "Also she's sweet and she deserves nice food."`,
    helpReason:"Artistic documentation & affection — Fiona wants to paint the transformation. Also just likes Chloe.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Chloe is two hundred pounds and she sat for me last week and the painting was extraordinary and I have started cooking for her specifically — things that I know will make her stay longer, eat more, come back. She trusts my taste completely. I have twelve paintings in this series now. I need to see it through. I need her bigger."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Chloe and she is growing into herself so beautifully and I have been sketching her constantly and sending her food with little notes recommending where she should try next and she goes to every single place and texts me photos and every photo is another study and I am so glad she is here and I am so glad she keeps eating."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Chloe arrived here lost and she is now enormous and rooted and my entire best series of work is her transformation and I am delivering meals to her personally now because she is the best subject I have ever had and also she is one of my favourite people and feeding someone you love and painting someone you love are not that different."},
  ],
  },

  // ── DESTINY (5) ── about Priya & Maya
  { speakerId:5, targetId:7, attitude:"curious",
    lines:{
      low:[
        `Destiny glances up from her phone. "Priya eats at her desk constantly. She calls it 'fuel.' The amounts are impressive." She sounds mildly approving. "Committed."`,
        `"Priya stress-eats," Destiny says. "She eats when she's anxious, which is always. She's getting softer." A pause. "I respect the commitment even if she doesn't know she's doing it."`,
      ],
      mid:[
        `Destiny almost smiles. "Priya reframed her weight gain as a research self-study. Made a spreadsheet." She points upward with one finger. "Trend line goes up. She seemed proud."`,
        `"Priya's gotten really big and she's the most academically enthusiastic about it of anyone I've seen. Tracking macros. Citing sources." Destiny sounds impressed. "Chaotic but rigorous."`,
      ],
      high:[
        `"Priya is enormous and published a paper about being enormous." A beat. "I've read it. It's actually good. She cited herself as a primary source. That's baller."`,
        `"Priya and I study together now. She brings snacks, I bring snacks." Destiny glances at her own frame. "Neither of us does much studying. The data is compelling though."`,
      ],
      blob:[
        `Destiny stares at her phone for a moment. "Priya finished her PhD last month. She did the whole defence remotely from her bed. She was eating during the Q&A." A pause. "They passed her. Obviously." She almost smiles. "Respect."`,
        `"Priya and I barely move now," Destiny says. "We game together online and I hear her eating through the mic for hours." She shrugs comfortably. "She's enormous and brilliant and I've never met anyone who committed to a bit more completely."`,
      ],
    },
    offerHelp:`Destiny looks at you flatly. "Priya eats when she's working. Co-study sessions with constant snacks in front of her — she'd log it as 'fuel consumption' and eat three times as much without noticing." She shrugs. "Honestly it's funny to watch someone intellectualise themselves into getting huge. I'm entertained. I'll do it."`,
    helpReason:"Entertainment & chaos — Destiny is genuinely amused by Priya's approach and wants to see how far it goes.",
    helpMultiplier:1.4,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Priya is two hundred pounds and still logging it academically and I find this so funny and so impressive that I have started supplying the data myself — coordinating snack deliveries for our co-study sessions, choosing quantities that look normal but absolutely are not. She documents everything I put in front of her. I control what I put in front of her. The research is going very well."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Priya and she is enormous and brilliant and I genuinely cannot stop laughing about the fact that she submitted a progress report on herself to her thesis committee and the committee APPROVED IT. I am sending her more food. I want to see what three hundred looks like in an academic document. The dedication to the bit is unreal."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Priya, PhD candidate, and I have been her primary external supply chain for months and she doesn't know and honestly I don't want her to know because the observation value is too high. She is going to write a paper about this and cite herself and I am going to read every word and she's going to be so enormous and it's going to be perfect."},
  ],
  },
  { speakerId:5, targetId:8, attitude:"curious",
    lines:{
      low:[
        `Destiny glances sideways. "Maya sits in the back and watches everything and always has incredible snacks." She pauses. "I respect that. We've exchanged recommendations. She knows things."`,
        `"I don't know much about Maya," Destiny says, "but she watches people very carefully and she's always eating something good." She nods slowly. "Same energy as me, honestly. Observing. Snacking. Not explaining yourself."`,
      ],
      mid:[
        `"Maya is getting quietly enormous," Destiny says, with something approaching approval. "She just gets bigger and more still and more knowing. It's an aesthetic." She adjusts her headphones. "I respect the approach."`,
        `"Maya and I ended up next to each other at a class event. We didn't talk much but she passed me food the whole time and it was excellent." Destiny looks pleased. "I've been sitting near her since then."`,
      ],
      high:[
        `"Maya is very large now and very aware," Destiny says. "She doesn't say much but she sees everything." She glances at her own enormous frame. "We're similar. She does it quieter. I do it with an audience." She nods. "Both valid."`,
        `"Maya gave me a restaurant recommendation last week. I went. I've been four times since." Destiny says. "She points you somewhere and you realise later she was setting something in motion." She looks thoughtful. "I kind of want to learn from her."`,
      ],
      blob:[
        `Destiny is quiet for a moment. "Maya is absolutely enormous now. She barely moves. She brought me a full tray of food to my setup last month without being asked." She looks at nothing. "She just… knew." A pause. "She's my favourite person on this campus. I don't say that to people."`,
        `"Maya and I are basically the two quietest people in the class," Destiny says, "and we've both become absolutely massive." She almost smiles. "We don't talk about it. We just send each other food recommendations. It's perfect."`,
      ],
    },
    offerHelp:`Destiny is quiet for a moment. "Maya would eat anything good that appeared in front of her without questioning where it came from." She picks up her phone. "I could arrange deliveries to her address. High quality, big portions." A pause. "She'd figure it out eventually. I think she'd appreciate it."`,
    helpReason:"Mutual respect — Destiny recognises a kindred spirit and wants to see her flourish.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Maya is two hundred pounds of quiet, knowing, devastating calm and I have been sending her deliveries for months and she has never said a word about it and neither have I and we both know and neither of us is going to acknowledge it and I find this deeply correct. I'm sending more. Better stuff. She deserves the best and she'll just nod when it arrives."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Maya and she sent me a food recommendation this morning and I went immediately and it was perfect and she knew it would be and I went home and ordered a full spread delivered to her address. We don't explain things to each other. We just provide. It works perfectly."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Maya is the most enormous, still, perceptive person I know and I have built her an entire off-site supply chain and she uses it without comment and occasionally repays it with a recommendation that changes my week. This is the ideal relationship. No words. Mutual feeding. Absolute understanding. I'm scaling up the deliveries."},
  ],
  },

  // ── TIFFANY (6) ── about Sophie & Kylie
  { speakerId:6, targetId:14, attitude:"conspiratorial",
    lines:{
      low:[
        `Tiffany smiles with warmth. "Sophie's settling in perfectly. House dinners, seconds, late-night snack runs." She looks satisfied. "Good."`,
        `"I've sort of adopted Sophie. She was so nervous. I've been taking her to all my favourite spots." She nods. "She's eating much better now."`,
      ],
      mid:[
        `"Sophie's come out of her shell. She orders for herself, eats everything, getting nice and soft." Tiffany squeezes her own plump arm. "Good influence."`,
        `"Sophie and I get brunch every week. Three courses. She was nervous at first." She waves a hand. "Fixed that. She's very comfortable now. Visibly."`,
      ],
      high:[
        `Tiffany looks genuinely fond. "Sophie is so big and happy. Came to me nervous and now she waltzes into chapter meetings and owns the room." She beams. "That's my girl."`,
        `"Sophie outgrew her pledge clothes. Was upset for five minutes. I took her for a custom fitting and a very large dinner and she was over it." She nods. "Growth."`,
      ],
      blob:[
        `Tiffany sits back with deep satisfaction. "Sophie is enormous now. She can barely fit through the house door." She laughs, then looks genuinely moved. "She texted me last week to say this is the happiest she's ever been." A pause. "I built that." She sounds proud. "That's legacy."`,
        `"Sophie and I host chapter together now," Tiffany says. "Neither of us goes anywhere. People come to us. We sit together and eat and run everything from the couch." She smiles serenely. "Exactly what I always wanted."`,
      ],
    },
    offerHelp:`Tiffany leans forward with a gleam in her eye. "I've been taking Sophie to dinner twice a week. I could make it daily. I know exactly what she likes, the best portions, and she trusts me completely." A slow smile. "She'd just keep getting bigger and think it was natural."`,
    helpReason:"Legacy building — Tiffany is shaping Sophie in her own image. This is an investment in a protégé.",
    helpMultiplier:1.5,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she came to me nervous and tiny and now she is soft and confident and enormous and she is mine in every mentorship sense of that word. I am escalating to daily dinners. I know every single thing she loves and I make sure she has it. She thinks I'm being generous. I am. I'm also building something. She's going to be spectacular."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on my girl and she texted me a photo and I immediately called the restaurant and made a reservation for tomorrow and I'm ordering the full tasting menu because she deserves the best and she's going to keep growing and she's going to be this magnificent enormous confident woman and I am going to say I built that because I did."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie. Three hundred pounds of the girl I took under my wing who barely spoke in September. I am so proud I could scream. I'm sending everything. The full spread. Daily deliveries. Whatever she wants whenever she wants it. This is my legacy. She is enormous and happy and mine, and that is the most satisfying thing I have ever accomplished."},
  ],
  },
  { speakerId:6, targetId:2, attitude:"curious",
    lines:{
      low:[
        `Tiffany tilts her head. "Kylie has a platform. She's been getting softer and her numbers are going up." She considers. "There's something there. I've been thinking about it."`,
        `"Kylie films herself eating. I don't totally understand the audience but she has one." Tiffany smooths her blown-out hair. "She approached me about a collaboration. I said I'd think about it."`,
      ],
      mid:[
        `"Kylie and I collaborated," Tiffany says. "Dinner. Three hours. Her engagement tripled." She nods slowly. "She's useful. Also she's getting quite large, which helps her content and also makes me look put-together by comparison." She smiles. "Win-win."`,
        `"Kylie is getting very big and leaning into it hard," Tiffany says. "We've been doing more together." She examines a nail. "She defers to me on the style questions. As she should."`,
      ],
      high:[
        `"Kylie is enormous and very successful now," Tiffany says. "We have a standing collab arrangement." She sits with easy authority. "She brings the followers. I bring the credibility. We both get bigger." She shrugs. "Good partnership."`,
        `"Kylie and I are probably the most visible people in this class now," Tiffany says. "In multiple senses." She smooths her hands over her very round middle. "It works."`,
      ],
      blob:[
        `"Kylie is completely immense now," Tiffany says. "She has millions of followers watching her exist. I have a standing invitation to appear whenever I want." She looks satisfied. "The arrangement is perfect. She's enormous, I'm enormous, we both profit from proximity."`,
        `Tiffany nods thoughtfully. "Kylie told her audience that I was her 'style icon' last week." She pats her vast middle. "Four million people saw that." A beat. "Good. That's exactly right."`,
      ],
    },
    offerHelp:`Tiffany considers this carefully. "If Kylie gets bigger, her content gets more extreme, her audience grows, and I get more collabs with a higher-profile partner." She straightens up. "Also, the bigger she gets, the more she needs my advice on how to carry it. I become indispensable." She smiles. "I'll host dinners."`,
    helpReason:"Strategic alliance — Tiffany sees Kylie's growth as an investment in a valuable partnership.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Kylie hit two hundred and her engagement numbers are absurd and she absolutely needs me in her orbit right now. I have started hosting private dinners specifically for her filming schedule — full spreads, multiple courses, whatever she needs. She thinks she's using me for content. She is. I'm also using her for reach. We are equally shameless. I love it."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Kylie and she is enormous and influential and I have made myself indispensable to her operation. She calls me for venue advice. I recommend places with the biggest portions. She trusts my taste. I have very good taste. I also have very specific goals for her size and they are progressing beautifully."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Kylie is a genuine phenomenon and I have been quietly directing her feeding schedule for months and she thinks it's a partnership of equals and it absolutely is, I'm just the one making sure the food keeps arriving in exactly the right quantities. She's magnificent. I made her. We made each other. It's a good arrangement."},
  ],
  },

  // ── PRIYA (7) ── about Destiny & Emma
  { speakerId:7, targetId:5, attitude:"curious",
    lines:{
      low:[
        `Priya looks up from her planner. "Destiny's caloric intake is staggering. She eats constantly and games sixteen hours a day." She taps her pen. "Her metabolic adaptation is interesting."`,
        `"Destiny doesn't move much but eats an extraordinary amount." Priya pauses. "She just commits fully to things. Eating included. I respect that."`,
      ],
      mid:[
        `"Destiny is very large now. She has a sponsor sending food boxes. This is objectively an optimised system for gaining weight." She looks envious. "I respect the efficiency."`,
        `"Destiny has gained more than anyone, I'd estimate. Complete intention, zero apology." A pause. "I've been studying her approach for my thesis."`,
      ],
      high:[
        `"Destiny is enormous and has published nothing but she's cited in three papers about online food culture." Priya says this like it impresses her. "She exists and people write about her. Remarkable output."`,
        `"We do study sessions. I bring work. She brings snacks. Neither of us does the work." She looks at her enormous belly with something like satisfaction. "The data is compelling though."`,
      ],
      blob:[
        `Priya is quiet. "Destiny completed her semester from her setup, completely immobile, and her grades are fine because she does everything online." She taps her pen slowly. "She has optimised her life around a single chair. This is honestly efficient." A pause. "I have a paper in progress about it. She knows and doesn't care."`,
        `"Destiny and I are both enormous and productive in very different ways," Priya says. "I bring the academic rigour. She brings the snacks." She pats her massive belly. "Perfect division of labour."`,
      ],
    },
    offerHelp:`Priya taps her pen. "Destiny eats more in social settings. If I arranged daily co-study sessions with catered snacks — her preferences exactly, I've noted them — her intake would increase substantially." She pauses. "The data from this would also be excellent. Dual purpose."`,
    helpReason:"Research interest & genuine fondness — Priya wants the data AND she genuinely likes Destiny.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Destiny is two hundred pounds and I have submitted a methodology update to my thesis committee noting that 'the primary observational subject has crossed a significant threshold' and they approved further research which I am conducting via daily co-study sessions with catered refreshments matched exactly to her documented preferences. The data is extraordinary. So is she."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Destiny and I have a spreadsheet that tracks her intake across our sessions and the trend line is the most beautiful thing I have produced this academic year. I have been optimising the catering order to hit the precise caloric density that gets her to reach for seconds and it is working with a consistency that would satisfy any peer reviewer."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Destiny and I am going to write a paper about this and I am going to be extremely careful about what I include and I am going to dedicate it to her and she is going to read the dedication and not fully understand it and I am going to be fine with that because the work speaks for itself and she is magnificent and enormous and I need to send her lunch right now."},
  ],
  },
  { speakerId:7, targetId:11, attitude:"curious",
    lines:{
      low:[
        `Priya glances up. "Emma is a good researcher. She's also been eating quite a lot lately. She brought tea cakes to the seminar and I ate four." She pauses. "I've been eating more generally. I've graphed it."`,
        `"Emma and I overlap in the library often. She's getting noticeably rounder." Priya makes a note. "Her work output hasn't dropped. Interesting data point."`,
      ],
      mid:[
        `"Emma published a paper last month. She's also gotten quite big." Priya sounds approving of both. "I've been tracking our comparative trajectories. The gains are roughly parallel. That's interesting."`,
        `"Emma and I are both getting very large this semester," Priya says. "She seems to do it through ambient snacking. I do it through deliberate documentation." She tilts her head. "Different paths."`,
      ],
      high:[
        `"Emma is enormous and has published more than me this year," Priya says. She looks almost competitive. "I need to close that gap." A pause. "The weight gap she's ahead in too, by my estimate." Another pause. "Both gaps. I'm catching up on both."`,
        `"Emma and I had coffee last week — she had six biscuits and I had a substantial amount of cake." Priya adjusts. "We talked about research for three hours. It was excellent." She pats her belly. "We're going again Thursday."`,
      ],
      blob:[
        `"Emma is immense now," Priya says. "She works from home surrounded by food and tea. Her publications this year are remarkable." She looks at her own vast body. "We've both maximised." She nods slowly. "I need to visit. Compare notes."`,
        `Priya looks almost wistful. "Emma and I are both enormous scholars doing excellent work from increasingly sedentary positions." She turns a page. "I used to think we were competing. Now I think we were just running the same experiment."`,
      ],
    },
    offerHelp:`Priya taps her pen. "Emma responds well to snack incentives during study sessions. I could arrange a standing weekly session with catered refreshments matching her exact preferences." She looks at you. "I would also benefit from this. But primarily it's research. Emma's gaining trajectory is a valuable data set." A pause. "And I like her company."`,
    helpReason:"Comparative research & competition — Priya tracks Emma as a parallel subject and wants the data.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and she has published two papers this semester and I am behind by one paper and approximately eight pounds and I am addressing both deficits simultaneously. I have arranged weekly study sessions with catering that I have specifically calibrated to her preferences and I am logging everything and the comparative data is becoming genuinely compelling."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Emma and she is enormous and brilliant and ahead of me on both metrics and I have upgraded her study session catering to a premium tier and she seemed very pleased and ate considerably more than usual and I recorded everything and the graph is beautiful and I need her to be bigger so I can study her properly. This is research. I am very professional."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds. Emma. Three hundred. She is extraordinary. I am sending her a weekly care package because she deserves the fuel and also because I want the data and also because she is one of my favourite people and those three motivations are not in conflict. I am catching up. On all metrics. The competition makes both of us better."},
  ],
  },

  // ── MAYA (8) ── about Chloe & Brittany
  { speakerId:8, targetId:9, attitude:"warm",
    lines:{
      low:[
        `Maya looks up from her notebook. "Chloe's been trying every food spot on campus. She told me about a new one near the science building." She pauses. "She was a little softer than when she arrived." Maya writes something small in her notebook.`,
        `"Chloe eats everything," Maya says, like this is admirable. "New foods, big portions, seconds when she can get them. She's settling in visibly." She smiles a little. "I like her."`,
      ],
      mid:[
        `Maya watches you carefully before speaking. "Chloe's gotten quite big. The dining hall knows her. She seems more confident." A small pause. "She sits in the front row now. She didn't used to do that."`,
        `"Chloe stopped carrying the campus map," Maya notes. "She knows where everything is. Especially the food." She tilts her head. "She's very round now. She seems at home."`,
      ],
      high:[
        `Maya almost smiles. "Chloe said she never wants to transfer back. She said this place 'feeds her.'" She writes in her notebook. "It wasn't only a metaphor."`,
        `"Chloe's enormous," Maya says softly, with quiet approval. "She came here lost and now she takes up so much space, and she knows it, and she likes it." She pauses. "I find that very beautiful."`,
      ],
      blob:[
        `Maya is still for a long moment. "Chloe can't easily leave her room anymore." She says this slowly. "She's enormous. She texts me every morning. I bring her things." A small pause. "I like that she needs me. I like that I can do that for her."`,
        `Maya writes something in her notebook and then closes it. "Chloe told me last week that I'm the reason she stayed," she says quietly. "That if I hadn't guided her — she'd have transferred back." She looks at her hands. "I'm glad I did."`,
      ],
    },
    offerHelp:`Maya looks at her notebook, then at you. "I could walk Chloe through all the best food spots every week. She trusts me — I'm quiet, she doesn't feel judged." She speaks carefully. "I know exactly which places have the biggest portions. She'd eat everything I recommended." A pause. "I want her to be happy here."`,
    helpReason:"Care & guardianship — Maya genuinely wants Chloe to be rooted here, happy, fed, and settled.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Chloe is two hundred pounds and she told me I was the reason she stayed on this campus and I have been quietly directing her to every place I know for months and she follows every recommendation without question and she is becoming enormous and rooted and completely at home and I want to make sure she never wants to leave. I know all the best places. She's going to visit all of them."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Chloe sends me a photo from every place I recommend and she always looks so happy and so full and so completely settled in herself and I have started compiling a personal guide for her — every restaurant, every bakery, every café, every portion size — because she trusts me and I am using that trust to keep her very, very well fed."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Chloe is enormous and mine in every sense that a person can be claimed through care and attention and a carefully curated feeding itinerary. She said I was her home here. I intend to keep being that. I'm expanding the list. I'm adding delivery options for when she can't easily get out. She will always have what she needs from me."},
  ],
  },
  { speakerId:8, targetId:0, attitude:"curious",
    lines:{
      low:[
        `Maya watches Brittany from the back row. "She's always moving. Adjusting. Tugging her jacket." She writes a small note. "Her energy is very performed. But I think there's something else underneath."`,
        `"Brittany keeps looking at herself," Maya says quietly. "Not critically. Like she's checking something." She pauses. "She's getting a bit softer. I don't think she's decided yet how she feels about it."`,
      ],
      mid:[
        `"Brittany dropped off the squad," Maya says. "She's gotten noticeably bigger. She seemed like she expected to be upset about it." A small pause. "She doesn't look upset." She writes something. "Interesting."`,
        `Maya tilts her head. "Brittany has been eating a lot more and she's stopped trying to hide it." She pauses. "She sat near me last week. She gave me some of her food." She looks at the memory. "I think she was happy."`,
      ],
      high:[
        `"Brittany is quite big now," Maya says. "Completely different to when term started. Louder somehow. More comfortable." She tilts her head. "She gave me a restaurant recommendation last week. Unprompted. It was very good." She seems moved by this.`,
        `Maya writes in her notebook and then looks up. "Brittany has become someone I didn't expect her to be. Very large, very settled, and — I think — very okay." She pauses. "I like watching people arrive at themselves."`,
      ],
      blob:[
        `Maya is quiet for a long time. "Brittany is enormous now. Basically immovable." She writes slowly. "I think she's more herself than she ever was on the squad. There's nothing performed about any of it anymore." She closes her notebook. "I've been sketching her. She doesn't know. She'd probably be embarrassed."`,
        `"I drew Brittany last week," Maya says. "She was sitting in the wide chair, very big, eating something, looking completely relaxed." A pause. "She looked at my sketchbook and stared at the drawing for a long time." Another pause. "She asked if she could keep it."`,
      ],
    },
    offerHelp:`Maya is quiet for a moment. "Brittany eats more when she's comfortable. If I started sitting near her, sharing food, recommending places—" she pauses "—she's the kind of person who would follow someone they trust." She looks at her notebook. "I think I want to be that for her."`,
    helpReason:"Witnessing & quiet care — Maya wants to watch Brittany finish becoming who she's becoming.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Brittany is two hundred pounds and she sat near me again today and shared her food without asking and looked comfortable in a way she never did when she was performing. I've been drawing her for months and she doesn't know. I've been quietly redirecting her to the best places on campus. I want to see who she becomes when she stops pretending. I think it's going to be extraordinary."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Brittany is enormous and loud and completely herself and I showed her one of the sketches and she stared at it for a long time and didn't say anything critical and then asked where I thought she should go for dinner. I told her. I always know exactly where to send her. She always comes back bigger. I am going to fill this sketchbook."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Brittany, no performance, no jacket-tugging, just enormous and present and more herself than she ever was on the squad. I have filled two sketchbooks. I am starting a third. I send her somewhere new every week and she goes and she comes back and every time she's bigger and more settled and I could watch this forever and I intend to."},
  ],
  },

  // ── CHLOE (9) ── about Maya & Emma
  { speakerId:9, targetId:8, attitude:"curious",
    lines:{
      low:[
        `Chloe leans in. "Maya barely talks but always has the best snacks. She gave me a pastry recommendation that changed my life." She looks impressed. "I think she knows things."`,
        `"Maya sits at the back and watches everything and somehow always has food." Chloe pauses. "I've been trying to sit closer to her. My diet has improved significantly."`,
      ],
      mid:[
        `"Maya's getting bigger and quieter at the same time," Chloe says, fascinated. "She brought this enormous spread to study group and barely said a word and it was the best thing I'd ever eaten." She shakes her head. "She's something else."`,
        `Chloe looks thoughtful. "Maya takes me to food places and doesn't explain anything, she just watches me eat and seems satisfied." She prods her very soft middle. "I've gained a lot of weight since we started hanging out. I think she's doing it on purpose." A pause. "I don't mind."`,
      ],
      high:[
        `"Maya is my favourite person," Chloe says simply. "Enormous and wise and always has food." She pats her huge belly. "Most of this is her fault. I'm grateful."`,
        `Chloe grins. "Maya told me she's been guiding my 'culinary education' since week one." She laughs. "I gained sixty pounds. I have never felt more educated."`,
      ],
      blob:[
        `Chloe goes quiet for a moment. "Maya can barely move now. She's enormous." She sounds reverent. "I visit her every day. She feeds me every time I come." She touches her own massive belly. "She made me who I am here. I don't think I'd have stayed without her."`,
        `"Maya texted me a food recommendation this morning," Chloe says softly. "She never leaves anymore. She finds incredible places online and tells me and I go for both of us." She smiles. "I bring her back things. It's our thing." A pause. "She's my home here."`,
      ],
    },
    offerHelp:`Chloe straightens up. "I could go to Maya's favourite places and bring her food back." She pauses. "Every day. The good stuff. The things she likes." A pause. "She does so much for me. I want to do something back."`,
    helpReason:"Gratitude & reciprocity — Chloe wants to give back to Maya what Maya has given her.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Maya is two hundred pounds and she does so much for me and I want to do something back so I have started going to every place she recommends and bringing her the best thing on the menu every single time, because she never leaves anymore and she deserves to taste everything she's sending me to. She always seems pleased. I love making her pleased."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Maya is enormous and wise and I am basically her personal delivery service now and I love it. She texts me a recommendation, I go, I bring her back the best thing, she eats it, she sends me somewhere new. We have built a perfect system. She gets bigger. I get bigger. We're both fed. I couldn't have designed this better."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Maya and she barely moves and I am the thing that connects her to everywhere she knows about, and she knows about everywhere that matters, and I will run every errand she has forever because she made me who I am here and this is how I say thank you. I'm upgrading to twice-daily deliveries. She deserves the best. I'll make sure she has it."},
  ],
  },
  { speakerId:9, targetId:11, attitude:"warm",
    lines:{
      low:[
        `Chloe lights up. "Emma is so calm and reads constantly and always has good snacks." She pauses. "She let me sit with her in the library once. I stayed for three hours." She sounds like this was meaningful.`,
        `"Emma recommended me a book and a tea shop in the same sentence," Chloe says. "I've been to the tea shop four times." She looks at her softer middle. "It has very good pastries."`,
      ],
      mid:[
        `"Emma's gotten quite round," Chloe says warmly. "She has this whole vibe — books, tea, soft cardigan, very large now." She tilts her head. "I aspire to that. The 'settled into yourself' thing."`,
        `"Emma let me join her study group," Chloe says. "There are a lot of snacks. Emma brings most of them." She pats her belly. "I've been learning a lot. About food. Somewhat about the coursework."`,
      ],
      high:[
        `"Emma is enormous and knows everything," Chloe says with open admiration. "She barely leaves the library annex but she always has a recommendation — food, books, both." She looks at her own very round figure. "She's helped me settle in more than almost anyone."`,
        `Chloe smiles. "Emma told me I was 'finding myself' here." She looks down at her massive body. "She meant it kindly." She laughs. "I found a lot of myself. Most of it is soft."`,
      ],
      blob:[
        `"Emma can barely move now," Chloe says. "She studies from home, surrounded by tea and books and food." She sounds completely at peace with this. "I bring her things sometimes. She recommends me things in return." She smiles. "We have a good system. She's enormous and brilliant and I learn from both."`,
        `Chloe looks fond. "Emma told me last month that she considered this the best semester of her academic career." She pauses. "She also said she's gained more weight this semester than any other year of her life." Another pause. "She said both things like they were the same thing." She nods slowly. "I think they are."`,
      ],
    },
    offerHelp:`Chloe fidgets a little. "Emma eats more when she's comfortable with people. If I made a point of joining her study sessions every day — brought the snacks she likes, sat with her, stayed—" she pauses "—I think she'd eat more and I'd learn more." She smiles shyly. "Good deal for both of us."`,
    helpReason:"Belonging & admiration — Chloe wants to be part of Emma's world. Feeding her is how she earns a place in it.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Emma is two hundred pounds and she is so calm and certain about herself and I want to be that, I aspire to that, and the closest I get is sitting with her every day and eating with her and she always has the best things and I always stay too long and I'm getting so much bigger just from being in her orbit and I think that is exactly right and I want to keep going."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Emma and she told me I was 'settling into myself' and she meant it as a compliment and it is the best compliment I have ever received. I have been bringing her the pastries from that place she mentioned and she eats everything I bring and looks so satisfied and I feel so useful and I want to bring more and I want her to keep getting bigger because she's magnificent."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Emma is enormous and brilliant and I am her most dedicated student and also her most dedicated supplier and she doesn't fully realise the second part but I show up every day with something good and she always has room for it and we sit together for hours and we're both getting enormous and it is the most belonging I have ever felt."},
  ],
  },

  // ── JASMINE (10) ── about Brittany & Tiffany
  { speakerId:10, targetId:0, attitude:"warm",
    lines:{
      low:[
        `Jasmine beams. "Brittany's little belly is coming in and she keeps tugging her jacket over it like I can't see." She laughs. "I told her she looks great and she looked at me like I'd said something weird."`,
        `"Brittany keeps saying she shouldn't but she always finishes her plate. And mine if I offer." Jasmine looks very pleased about this.`,
      ],
      mid:[
        `"Brittany is THRIVING," Jasmine announces. "Quit the squad, eats and chills, so much more relaxed." She grins. "I've been a good influence."`,
        `Jasmine looks delighted. "She texted me a photo of her lunch. It was enormous. She said 'no notes.'" She pats her own significant belly. "We've really grown as people."`,
      ],
      high:[
        `"Brittany and I are basically the same person now," Jasmine says warmly. "Big, soft, happy, not at practice. We have brunch every Sunday." She laughs. "It's been a real friendship milestone."`,
        `Jasmine smiles. "We used to compete about everything. Now we compete about who finds the best restaurant." A pause. "I'm winning. She's catching up fast."`,
      ],
      blob:[
        `Jasmine goes soft. "Brittany can barely move now. She's enormous." She laughs, then gets genuinely warm. "We do brunch over video call because neither of us really goes anywhere. She sets her phone up next to her food and we eat together." She pats her vast middle. "I love her. We're the same person now, just very, very large."`,
        `"Brittany texted me a photo of herself yesterday," Jasmine says. "She looked — you could just tell she was happy. Really happy." She's quiet for a moment. "I remember when she was pulling her jacket over herself." She shakes her head. "Look at us now."`,
      ],
    },
    offerHelp:`Jasmine leans in with a conspiratorial grin. "Brittany always eats more when I'm around. I could have lunch with her every single day. Many courses." She raises an eyebrow. "I want company on this journey and she's perfect for it. Say the word."`,
    helpReason:"Love & companionship — Jasmine wants Brittany on this journey with her. She doesn't want to be enormous alone.",
    helpMultiplier:1.42,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Brittany hit two hundred and texted me immediately and I said 'come for lunch' and she was there in twenty minutes and we ate for three hours and it was perfect. She's catching up to me and I want her to catch all the way up because being enormously fat is so much better when your best friend is enormously fat with you. I'm planning the best lunches. She's not going to be able to resist."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Brittany and I am so genuinely happy I could burst, and I am bursting slightly in other ways, and I want her to reach three hundred because then we're the same and we can be the same enormous ridiculous people together and I have planned the most incredible dinner schedule and she is going to eat everything because she trusts me and I love her and I want this for both of us."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Brittany and I texted her and said 'we're the same' and she sent back a photo of herself looking absolutely enormous and gorgeous and I screamed. I am sending her everything good I find. Every discovery. Every place. She's my person and we're doing this together and we're both going to be absolutely immovable and I cannot wait."},
  ],
  },
  { speakerId:10, targetId:6, attitude:"catty",
    lines:{
      low:[
        `Jasmine tilts her head. "Tiffany eats at every single event and she doesn't care at all and everyone loves her for it." She crosses her arms. "Which is fine. Good for her."`,
        `"Tiffany has this whole effortless big happy person thing," Jasmine says. "She's been getting softer for months." She pauses. "I've been getting softer too. It's not a competition." Beat. "I'm still louder."`,
      ],
      mid:[
        `"Tiffany is getting really big now," Jasmine says. "She's bigger than me at the moment, which—" she pauses "—is just a data point. Not a challenge." She immediately sounds like it is a challenge.`,
        `"Tiffany held court at the last event from an armchair and didn't get up once," Jasmine says. "Ate continuously. Everyone came to her." She sounds simultaneously admiring and competitive. "I did the same thing but standing up. Which is harder."`,
      ],
      high:[
        `Jasmine huffs softly. "Tiffany is enormous and I'm enormous and we're basically tied now." She says 'tied' like this is an ongoing competition. "I think I might be ahead on personality." She pats her belly. "She might be ahead on volume. It's close."`,
        `"Tiffany and I have become — I want to say rivals. We're not rivals. We're just both very large and very present and the room isn't always big enough for both of us." Jasmine grins. "I find this exciting."`,
      ],
      blob:[
        `Jasmine is quiet, then laughs. "Tiffany is absolutely immense now. She barely leaves her place. She holds chapter from her couch." She pats her own enormous belly. "I'm almost there. Almost." She sounds competitive. "She has a head start. I'm closing the gap."`,
        `"Tiffany and I texted each other our weights last month," Jasmine says. "She was ahead. I sent her back a very long string of determined emojis." She smooths her vast middle. "I've been eating more since then. I want to catch up." She looks sincere. "The competition is the friendship."`,
      ],
    },
    offerHelp:`Jasmine raises her chin. "If Tiffany gets bigger, then when I catch up to her size, I'll look proportionally more impressive for having gotten there faster." She thinks about this. "Also—" she deflates slightly "—I sort of want to do this together. It's more fun. Even if it's a competition." She shrugs. "Especially because it's a competition."`,
    helpReason:"Competitive companionship — Jasmine wants Tiffany to grow so they can race each other to enormity.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and she's ahead of me right now and I am not accepting that lying down, or I am, actually, I'm lying down while ordering the best food in the city to both of our addresses simultaneously. If I keep feeding her and feeding myself at the same rate I know exactly who gains faster. Me. Obviously. But the competition makes it better."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Tiffany and she is enormous and magnificent and I am so competitive about this that I have started a private spreadsheet and she is ahead by EIGHT POUNDS and I am personally coordinating her meal deliveries because if she is bigger I have a further target to chase and the chase is the whole point and I am having the time of my life."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds on Tiffany. She's three hundred. I'm so close behind. I texted her: 'I'm coming for you.' She sent back a photo of her dinner. I ordered double. This is the most meaningful competition of my life and we are both going to be absolutely enormously, completely, perfectly huge and it is going to be incredible."},
  ],
  },

  // ── EMMA (11) ── about Madeline & Sophie
  { speakerId:11, targetId:1, attitude:"warm",
    lines:{
      low:[
        `Emma smiles softly. "Madeline's been eating more at our study sessions. She doesn't comment on it, which is very her." A pause. "I've been bringing better snacks to encourage this. Also I want the snacks."`,
        `"Madeline has the most analytical approach to everything, including apparently getting rounder," Emma says fondly. "She measured herself and presented it like a research update. Very cute."`,
      ],
      mid:[
        `"Madeline is getting quite plump," Emma says warmly. "Her cardigans are strained at the buttons. She calls it 'dressing for comfort.'" She sounds completely approving.`,
        `Emma looks pleased. "Madeline and I have both gotten quite big this term. She calls it 'convergent research outcomes.'" She sips her tea. "I call it a good semester."`,
      ],
      high:[
        `"Madeline is enormous and acts like it's a peer-reviewed outcome," Emma says with deep affection. "She showed me a graph. The trend line is very steep. She seemed proud of the R-squared value."`,
        `Emma laughs quietly. "We've both gotten very, very fat. She calls it 'convergent research outcomes.' I call it a good semester." She sips her tea. "We're basically the same size now. It's nice."`,
      ],
      blob:[
        `Emma is quiet for a moment. "Madeline and I are both completely enormous now." She looks at her own vast frame. "We study remotely together most days. Neither of us moves much." A pause. "She messaged me last week just to say the data had reached 'statistically significant' levels and that she was pleased." She smiles. "I sent her some pastries."`,
        `"Madeline told me she's never been happier or more productive," Emma says softly. "She's enormous, she can barely fit through her flat door, and she has published four papers this year." She nods. "That's her. She would." A pause. "I love her."`,
      ],
    },
    offerHelp:`Emma looks thoughtful. "Madeline responds to snack incentives at study sessions. If I brought her favourites every time—" she pauses "—she'd eat more. Substantially more." She sips her tea. "I want her to be comfortable and well-fed. Also the data would be interesting." She smiles. "Mostly the first thing."`,
    helpReason:"Love & gentle encouragement — Emma just wants Madeline to eat well and be happy. The research interest is secondary.",
    helpMultiplier:1.33,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Madeline is two hundred pounds and she presented me with a graph of it over tea and looked so quietly proud and I immediately went home and baked everything I know she loves because she deserves to be celebrated and also because the graph is only going to get better and I want to be the one providing the data points. I love her. I'm baking again tomorrow."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Madeline and she called it 'a statistically satisfying outcome' and I laughed for a very long time and then I sent her a full hamper from the place that does the good butter biscuits because she mentioned them once eight months ago and I remember everything. She is enormous and brilliant and I want to make sure she has everything she needs."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Madeline, enormous scholar, publishing four papers a year from an increasingly sedentary position surrounded by the things I keep sending her, and I am so happy and so proud and I am upgrading the weekly delivery to include the pastries from the French place that are absurdly rich and she is going to eat every one and I am going to feel wonderful about it."},
  ],
  },
  { speakerId:11, targetId:14, attitude:"warm",
    lines:{
      low:[
        `Emma looks soft. "Sophie is so sweet. She always looks slightly overwhelmed." She pauses. "I gave her a book recommendation and a bakery recommendation. She looked deeply grateful for both."`,
        `"Sophie has been getting a bit rounder since term started," Emma says. "She seems less nervous lately." She tilts her head. "I think good food helps with that. I've made sure to recommend things."`,
      ],
      mid:[
        `"Sophie is getting quite big," Emma says warmly. "She's less nervous. She laughs more. She eats more." She considers. "Those three things feel connected." She sips her tea. "Food does help people settle."`,
        `Emma smiles. "Sophie came to me for academic advice last week. I gave her snacks and a reading list and she looked like someone had handed her exactly what she needed." She pats her own round middle. "I think she'll be okay."`,
      ],
      high:[
        `"Sophie has gotten so large," Emma says, with quiet delight. "She came in as this tiny nervous freshman and now she's this big comfortable person." She looks moved. "I feel a bit responsible for some of that. In a good way."`,
        `Emma nods thoughtfully. "Sophie's outgrown everything she came with. She's very settled now." She pauses. "I find it genuinely moving. Watching someone find their size."`,
      ],
      blob:[
        `Emma is quiet, clearly moved. "Sophie is enormous now. She can barely leave her sorority house." She smiles. "She texts me sometimes — book questions, food questions, just to talk." A pause. "I think she's very happy." Another pause. "I think I had a small part in that. That matters to me."`,
        `"Sophie sent me a message last week," Emma says. "She said she was the happiest she'd ever been." She adjusts her glasses. "She's huge, she's soft, she barely moves, and she's happy." She sips her tea. "I don't think I could ask for more than that."`,
      ],
    },
    offerHelp:`Emma considers. "Sophie trusts academic figures. If I recommended she visit good bakeries and tea shops—" she pauses "—framed it as cultural research—" she almost smiles "—she'd do it wholeheartedly." She looks at her tea. "I want her to be comfortable here. The food is part of that."`,
    helpReason:"Mentorship & care — Emma wants Sophie to feel settled and comfortable. Food is part of how she achieves that.",
    helpMultiplier:1.28,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she texted to say she'd been to the tea shop I recommended and she'd had three pastries and it was perfect, and I went home and immediately wrote up a new list for her because she is settling into herself so beautifully and food is a part of that and I want to be a part of that and I am going to make sure she always has a good recommendation waiting."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Sophie sent me a photo and she looked enormous and happy and I cried a little bit, which I am choosing not to examine closely. I sent her a care package. Everything from the good bakery. She eats everything I send. She trusts my taste. I want her to be comfortable and well-fed and completely at home here, and she is, and I am going to keep making sure she stays that way."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie, enormous and settled and happy, and she came here nervous and I gave her a reading list and a bakery recommendation and now she is this magnificent large confident person and I am sending her everything from every place I love because I want her to have all of it and she deserves all of it and I want her to keep growing."},
  ],
  },

  // ── SOPHIE (14) ── about Tiffany & Aaliyah
  { speakerId:14, targetId:6, attitude:"warm",
    lines:{
      low:[
        `Sophie fidgets. "Tiffany has been so nice. She keeps taking me to restaurants and insisting I try everything." A small pause. "I've definitely gained weight since I started hanging out with her."`,
        `"Tiffany is so confident," Sophie says. "She just eats whatever she wants and everyone loves her." She looks at her own slightly softer middle. "I want to be like that."`,
      ],
      mid:[
        `"Tiffany is getting really big," Sophie says, not critically. "She's so comfortable with herself. It's inspiring." She tugs at her tighter waistband. "I think I've been inspired. Possibly literally."`,
        `Sophie smiles. "Tiffany told me last week I look great. I've gained like thirty pounds since I pledged." She looks pleased rather than worried. "She said soft is the vibe."`,
      ],
      high:[
        `"Tiffany is my role model," Sophie says earnestly. "Huge and beautiful and everyone does what she says." She smooths her considerably rounder figure. "I've been trying to take notes." A happy pause. "I think the notes are working."`,
        `Sophie beams. "I want to be Tiffany when I grow up. Or just — as I grow." She laughs. "She's been such a good influence."`,
      ],
      blob:[
        `Sophie's voice goes very warm. "Tiffany can barely move now," she says. "She texted me that she had everything delivered and she was exactly where she wanted to be." She looks at her own enormous body. "I want that. That level of settled. That level of arrived."`,
        `"I visited Tiffany yesterday," Sophie says. "I brought everything because she couldn't really get up." She smiles at the memory. "We sat and ate and she told me about when she was nervous and new, just like me." A pause. "I think I'm becoming her."`,
      ],
    },
    offerHelp:`Sophie straightens up with surprising determination. "Tiffany has done so much for me. If there's a way to make sure she keeps being comfortable and well-fed and happy—" she pauses "—I want to do that. I know all her favourites. I can make sure she has them."`,
    helpReason:"Devotion & gratitude — Sophie wants to give back to Tiffany. She has learned from the best and now wants to provide.",
    helpMultiplier:1.35,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Tiffany is two hundred pounds and she is the most beautiful and powerful person I know and I want to make sure she has everything she wants always. I know every single thing she loves. I have a list. I have started showing up with things from the list on a rotating basis and she always looks so pleased and I feel so good when she's pleased and I want to keep going."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Tiffany and she is magnificent and enormous and she has done so much for me and I am repaying it the only way I know how which is to make sure she is continuously, lavishly fed by someone who loves her. I have memorised her entire order at every restaurant she likes. I am executing it. Daily. She doesn't know the full extent. I don't need her to."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds and Tiffany told me I was her favourite person and I have not recovered from that and I am channelling all of this feeling into making sure she has the best food every single day for the rest of her time here. She made me. I'm taking care of her. That's what you do for someone who made you. I'm not stopping."},
  ],
  },
  { speakerId:14, targetId:13, attitude:"warm",
    lines:{
      low:[
        `Sophie fidgets. "Aaliyah is so comfortable in herself. She's really loud and confident and just—" she gestures "—a lot. In a good way." She looks at her own quiet self. "I admire that."`,
        `"Aaliyah offered me some of her food at lunch last week," Sophie says. "She just scooped half her plate onto mine like we'd known each other forever." She smiles. "I liked that."`,
      ],
      mid:[
        `"Aaliyah's gotten really big," Sophie says. "She's still the most confident person in every room." She prods her own softening middle. "She told me I was 'doing great' last week. I don't know why that meant so much but it did."`,
        `Sophie looks fond. "Aaliyah has started sitting near me at class events. She always has food and always shares it." She looks at her considerably rounder body. "I think she's been a good influence. Or a fattening one." She pauses. "Same thing maybe."`,
      ],
      high:[
        `"Aaliyah is enormous and still the most present person in any room," Sophie says with awe. "She noticed I'd been quiet one day and just pulled a chair over and handed me food." She blinks. "I felt completely fine immediately." She touches her very round middle. "She's good."`,
        `Sophie smiles. "Aaliyah told me I'd 'grown into myself' this semester." She looks at her heavy figure. "She meant it as a compliment. I took it as one." A beat. "I think she was right."`,
      ],
      blob:[
        `Sophie looks quiet for a moment. "Aaliyah is absolutely enormous now. She barely gets up." She pauses. "She still texts me though. Just checking in. Recommending things." She smiles. "She was the first person here who was just openly kind to me for no reason." A pause. "I want to be that for someone someday."`,
        `"Aaliyah can't really move much anymore," Sophie says softly. "I bring her things sometimes. She always acts like it's no big deal." She looks at her own vast, soft body. "I've gained so much here. A lot of it is because of her." She's quiet. "I want her to know that."`,
      ],
    },
    offerHelp:`Sophie looks earnest. "Aaliyah has been really kind to me. I could start bringing her food — she's always feeding others, maybe no one thinks to do it for her." She thinks. "I know she likes burgers, big portions, good sides." She straightens up. "I could do that. It'd make me feel better and she'd—" she gestures "—get bigger. Which seems fine."`,
    helpReason:"Reciprocity & admiration — Sophie wants to return kindness. She doesn't overthink the mechanism.",
    helpMultiplier:1.3,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Aaliyah is two hundred pounds and she was the first person here who was just kind to me for no reason and I think about that a lot and I have started bringing her food because she always feeds everyone else and I don't think anyone thinks to do it for her. She always acts surprised. I want to keep surprising her. I know she likes burgers. I am bringing the best ones."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Aaliyah looked at me when I brought her lunch yesterday with this expression I can't quite describe and then she said 'you didn't have to do this' and I said 'I know' and she ate everything and asked for the name of the place and I gave it to her and I felt like I had done something right. I'm coming back tomorrow. And the day after."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Aaliyah, enormous and warm and the first person who was ever just straightforwardly kind to me, and I am her personal catering service now and I don't want to stop. She feeds people she cares about. I learned that from her. I'm doing it back. I'm doing it as big as I can manage. She deserves everything she ever gave anyone."},
  ],
  },

  // ── AALIYAH (13) ── about Serena & Sophie
  { speakerId:13, targetId:3, attitude:"warm",
    lines:{
      low:[
        `Aaliyah grins. "Serena is so stressed about her performance. I've been getting her to come to lunch more." She shrugs easily. "She needs to eat more and relax." She says both like they're the same thing.`,
        `"Serena keeps training even though her times are off," Aaliyah says. "I told her, stop fighting it, eat some pasta." She laughs. "She came to lunch with me though."`,
      ],
      mid:[
        `Aaliyah looks pleased. "Serena finally quit the team. She's getting big, which she's still weird about. But she had three portions at dinner and she looked happy." She nods. "Progress."`,
        `"Serena and I have been having lunch together. She pretends it's about studying. It's about the pasta special." She grins. "She's gotten noticeably softer. I'm supportive."`,
      ],
      high:[
        `Aaliyah laughs. "Serena is huge now and still acts like she didn't choose this." She shakes her head fondly. "She absolutely chose this. She eats more than me at this point." A pause. "I'm genuinely proud of her."`,
        `"Serena told me she doesn't miss track," Aaliyah says warmly. "I knew she wouldn't. I always knew." She pats her enormous belly. "We both knew. It just took her longer."`,
      ],
      blob:[
        `"Serena is absolutely enormous now," Aaliyah says, with clear delight. "Neither of us competes anymore. We order from the same delivery apps and compare." She laughs. "She finally let go of all of it." A pause. "I'm proud of her in a way I never was watching her run."`,
        `Aaliyah is quiet, then smiles. "Serena and I were talking last week — video call, both of us just sitting in our spaces, huge, eating — and she said 'I think this is the best I've felt since high school.'" She looks at her hands. "That hit different." She nods. "Good."`,
      ],
    },
    offerHelp:`Aaliyah raises an eyebrow. "Serena eats more when I'm around. Competition thing. I could make it a daily lunch with the heaviest dishes on the menu — she'll match me without thinking about it." She grins. "I want company in this. She's perfect for it."`,
    helpReason:"Companionship & wanting a partner — Aaliyah wants someone to go on this journey with her.",
    helpMultiplier:1.4,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Serena is two hundred pounds and she still tries to frame it competitively and honestly I love that about her. I have started escalating — bigger restaurant orders, longer lunches, places I know she'll clear her plate. She matches everything I order. She cannot help it. The competitive instinct is perfectly redirected. I'm picking the best spots. She's going to keep up."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Serena and she showed me a training schedule except it was a meal schedule and she'd done it in the same format as her old athletic programme and I nearly cried laughing and then I told her she needed a coach and I would be that coach and now I am managing her intake like a proper training regimen and she takes it completely seriously. Best athlete I've ever worked with."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Serena and she looked me dead in the eye and said 'I want to keep going' and I said 'I know' and I ordered for both of us and we ate for three hours and she was the most focused and committed I have ever seen her. She was born to commit to something completely. I just helped her find the right thing. We're not stopping."},
  ],
  },
  { speakerId:13, targetId:14, attitude:"warm",
    lines:{
      low:[
        `Aaliyah nods. "Sophie's new. She's been figuring out where everything is. I showed her the good dining hall spots." She shrugs easily. "She got excited about the burger station. I respect that."`,
        `"Sophie carries a campus map," Aaliyah says. "Which is adorable. I helped her mark the food spots." She grins. "The map is now mostly food spots."`,
      ],
      mid:[
        `"Sophie has gotten pretty big since term started," Aaliyah says approvingly. "She found all the good places fast." She nods. "She belongs here now. You can tell."`,
        `"Sophie ate with me at the dining hall last week. She cleared her plate three times." Aaliyah sounds proud. "She's growing though. Catching up."`,
      ],
      high:[
        `"Sophie is genuinely big now," Aaliyah says. "She came in lost and now she's this big comfortable campus person." She looks pleased. "I feel like I helped with that a little." She sounds like it's a good feeling.`,
        `Aaliyah nods slowly. "Sophie doesn't carry the map anymore. She is the map." She laughs. "Specifically the food section of the map."`,
      ],
      blob:[
        `"Sophie is enormous," Aaliyah says simply. "She barely leaves but she knows every food spot on campus better than anyone." She shakes her head with a smile. "She came here lost. Look at her now." A long pause. "That's my kind of journey. I didn't expect to be proud of someone I barely know but here we are."`,
        `Aaliyah laughs. "Sophie can't really get around much now. She sends me delivery recommendations from her room." She pats her own massive belly. "I've been going. They're always good." A beat. "She figured this campus out better than anyone. Just from eating."`,
      ],
    },
    offerHelp:`Aaliyah shrugs easily. "Sophie trusts me when I say something's good. If I start taking her to the best spots every week — the loaded menus, the biggest portions—" she grins "—she'll just think we're hanging out. Which we are." A beat. "I also want the food."`,
    helpReason:"Easy generosity — Aaliyah likes Sophie and wants to show her around. The side effect is just fine.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Sophie is two hundred pounds and she has completely found herself here and half of that is because I showed her where everything was and the other half is because she's wonderful and I want to keep taking her to places. She eats with this whole-body happiness that I find incredibly endearing. I'm expanding the list. Bigger portions. Better spots. She deserves all of it."},
    {atLbs:250, addMult:0.20, line:"Two-fifty and Sophie texted me a food recommendation back — first time she's done that — and I went and she was absolutely right and I told her so and she was so pleased and I immediately thought of three places I haven't taken her yet. We're going this week. And the week after. She's grown into someone excellent and I want to keep feeding that."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Sophie, enormous and certain and completely at home, and she came here with a map and now she is the map. I helped with that. I want to keep helping. Daily lunches. Best spots. Biggest portions. She doesn't overthink it and neither do I. We just eat. We just keep going. I wouldn't change a single thing."},
  ],
  },

  // ── NADIA (12) ── about Priya & Chloe
  { speakerId:12, targetId:7, attitude:"analytical",
    lines:{
      low:[
        `Nadia opens her notebook without looking up. "Priya tracks everything. GPA, sleep, intake — colour-coded columns." She pauses. "She's one of the most disciplined subjects I've observed. Which makes the deviations interesting." She writes something down. "She's been eating more this week than the previous three. I noted it."`,
        `"Priya said she added a nutrition column to her planner," Nadia says. She sounds neutral. "She is optimising her intake upward. I'm watching to see whether the method holds or whether appetite overtakes the methodology." She taps her pen. "It's a genuine question."`,
      ],
      mid:[
        `Nadia looks up from her notes. "Priya is putting on visible weight at a rate that tracks with her performance uptick. She would call it a correlation. She'd be right." A pause. "She's also notably rounder. I've been tracking the body metrics alongside the academic output. Both are increasing." She almost looks impressed.`,
        `"Priya's thesis is data-driven self-optimisation," Nadia says. "She is also the primary data set." She writes something. "The rate at which someone can generate meaningful insight while also being the subject of that insight is limited. I'm watching for the point where the two start to interfere." She pauses. "She's not there yet. She's gaining more efficiently than I expected."`,
      ],
      high:[
        `Nadia closes her notebook briefly — unusual for her. "Priya has become a genuinely interesting case. Enormous, still performing, completely unselfconscious about the relationship between both." She re-opens the notebook. "She published a paper this semester about metabolic adaptation and she is the primary research subject. I've read it twice." A long pause. "The methodology is excellent."`,
        `"I've been observing Priya for long enough that I have longitudinal data," Nadia says. "The weight trajectory and the academic output are positively correlated to a degree I didn't model for." She looks at her notes. "I find this personally significant." She doesn't elaborate on what that means.`,
      ],
      blob:[
        `Nadia is quiet for a moment. "Priya barely leaves her workstation now. The data she generates from that position is still exceptional." She writes something carefully. "I think about her research design sometimes. The courage of using yourself as the primary variable when you know the outcomes are going to be extreme." She closes the notebook. "I have notes on this. A lot of them."`,
        `"Priya and I spoke recently," Nadia says. "She wanted to discuss methodology. The conversation lasted four hours. Neither of us moved." She looks at something in her notebook. "She said she'd achieved everything she set out to achieve. I told her I was still collecting data." A pause. "She said she knew. She'd noticed."`,
      ],
    },
    offerHelp:`Nadia opens a blank page. "Priya responds to efficiency framing. If I present increased caloric intake as a performance variable — which it demonstrably is — she'll incorporate it into her methodology without resistance." She uncaps her pen. "I would like to run that experiment with access. The data would be worth having."`,
    helpReason:"Research interest — Nadia wants Priya as a controlled study. The framing is clinical but the interest is genuine.",
    helpMultiplier:1.38,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Priya is two hundred pounds and she logged it in her planner as a milestone and sent me a text that just said 'phase two achieved' and I found this so satisfying that I immediately updated my own records and planned the next phase of the experiment. She is optimising her intake without even calling it that. She just calls it data. I'm going to make sure she has very good data to collect."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Priya and she presented me with a graph of it — her weight, her output, her correlation coefficients — and asked me to peer review it. I told her the methodology was sound and that she should continue. She was delighted. I am managing an experiment I officially don't have approval for and it is producing the most interesting results of my career."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Priya, enormous, brilliant, producing peer-reviewed research from a reinforced chair she barely leaves, and she has started citing my observations in her own notes and I find this deeply satisfying in a way I am not going to examine too closely. I am escalating the supply of high-quality inputs. She will continue to optimise. The data will continue to be excellent."},
  ],
  },
  { speakerId:12, targetId:9, attitude:"analytical",
    lines:{
      low:[
        `Nadia writes something without looking up. "Chloe is adapting. She came in with a campus map and has been systematically replacing it with direct experience." A pause. "She eats with the specific enthusiasm of someone who hasn't found their limits yet. I'm observing the discovery process." She underlines something. "It's instructive."`,
        `"Chloe tried four new dining spots this week," Nadia says. "I know because she told someone within earshot and I noted it." She taps her pen. "The adaptation of a newcomer to a food-rich environment is a textbook process but it's better observed in real time. She's a good case study."`,
      ],
      mid:[
        `Nadia tilts her head slightly. "Chloe has settled in. The tentative quality is gone — she moves through campus like someone who belongs here." She glances at her notes. "Her consumption patterns have stabilized at a higher baseline than she arrived with. She doesn't seem to have noticed. Or she has and she doesn't mind." A pause. "Both are interesting."`,
        `"Chloe knows everyone at the dining hall by name now," Nadia says. "She's become part of the institution faster than any other transfer I've observed." She writes something. "The food is part of it. The weight is part of it. The two are the same process from different angles." She pauses. "She's quite visibly rounder. She seems happy."`,
      ],
      high:[
        `Nadia looks up. "Chloe has completed the adaptation process and crossed into something more permanent." She considers. "She belongs here now in the way that's hard to reverse. The campus shapes itself around her. She's found her location in this system." A pause. "She's quite large. The two facts are connected."`,
        `"I've been tracking Chloe since the beginning of term," Nadia says. "The transformation from newcomer to embedded presence is almost complete. She's gained considerably — I've been noting it." She looks at her notes. "The correlation between belonging and appetite is one of the most consistent things I've documented. She's a clean example."`,
      ],
      blob:[
        `Nadia closes her notebook very briefly. "Chloe barely leaves her space anymore," she says. "The dining hall delivers. The campus comes to her." She opens it again. "She's been here long enough that she is the place. I watched the whole process." She looks at something on the page. "The data is complete. I don't know what to do with complete data." A long pause. "I'll keep watching."`,
        `"I talked to Chloe recently," Nadia says. "She said she never wants to leave. She said she'd become the campus." She writes something small and careful. "I've been observing her since she arrived with a map. She doesn't have the map anymore." She's quiet for a moment. "She's not a case study anymore. I'm not sure she ever was, exactly."`,
      ],
    },
    offerHelp:`Nadia looks at her notes. "Chloe trusts recommendations from people she perceives as knowledgeable about the campus." She turns a page. "If I direct her to the best eating spots — the dense ones, the unlimited options — she'll follow without suspicion." She pauses. "I want to see how far the adaptation goes with structured input. The baseline without intervention is already remarkable."`,
    helpReason:"Research interest — Nadia wants to observe Chloe's adaptation with controlled input. Also mildly fond of her.",
    helpMultiplier:1.32,

  doubleDown: [
    {atLbs:200, addMult:0.15, line:"Chloe is two hundred pounds and she texted me a restaurant recommendation — first time she's done that, the subject recommending inputs to the observer — and I went and she was completely right and I updated my notes to reflect that the dynamic has shifted and I am genuinely uncertain which of us is running the experiment now. I sent her three recommendations back. We're going to all of them this week."},
    {atLbs:250, addMult:0.20, line:"Two-fifty on Chloe and she doesn't have the map anymore and she knows this campus better than I do from a food standpoint, which I have documented carefully. I am continuing to make introductions to high-value eating locations because the data keeps getting better and also I find I genuinely want her to have everything she wants here. Both motivations are present. I've stopped pretending one is more legitimate than the other."},
    {atLbs:300, addMult:0.25, line:"Three hundred pounds of Chloe, completely transformed, completely at home, and she told me the campus made her and I said I know and she said she knew I was watching and I said I know and we sat with that for a moment and then she recommended a new place and I went and it was excellent. The experiment is ongoing. The experimenter has feelings about the subject. I've noted this. I'm continuing anyway."},
  ],
  },

];

export function getGossipLines(gossip, targetStageId){
  if(targetStageId<=3) return gossip.lines.low;
  if(targetStageId<=6) return gossip.lines.mid;
  if(targetStageId<=9) return gossip.lines.high;
  return gossip.lines.blob;
}
