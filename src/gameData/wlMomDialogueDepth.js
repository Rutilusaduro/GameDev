// Wife Lessons — mom dialogue depth overlays (stages 5–8 priority).
// Merged onto WL_DIALOGUES at conversation start; labels/outcomes stay on base.

/** @param {object} base @param {object|null} overlay */
export function mergeWlDialogueEntry(base, overlay) {
  if (!overlay || !base) return base;
  const merged = { ...base };
  for (const key of ['greeting', 'cappedGreeting', 'overtookGreeting']) {
    if (overlay[key]) merged[key] = overlay[key];
  }
  if (overlay.options?.length) {
    merged.options = base.options.map((opt, i) => {
      const o = overlay.options[i];
      if (!o) return opt;
      return {
        ...opt,
        ...(o.text ? { text: o.text } : {}),
        subs: opt.subs.map((sub, j) => ({
          ...sub,
          ...(o.subs?.[j]?.text ? { text: o.subs[j].text } : {}),
        })),
      };
    });
  }
  return merged;
}

/** stageIdx is 0-based (stage 5 → index 4). */
export function getWlMomDialogueDepth(personKey, stageIdx) {
  const byPerson = WL_MOM_DIALOGUE_DEPTH[personKey];
  if (!byPerson) return null;
  return byPerson[stageIdx] ?? null;
}

export const WL_MOM_DIALOGUE_DEPTH = {
  Darlene: {
    4: {
      greeting: `"Hello, Professor. Wednesday night has become the thing we plan the week around — I clear the calendar for it now. The table smells like butter and yeast before we even sit down, and my girls ask on Monday what's on the menu. Emma still checks whether Claire ate more at lunch. I tell her to worry about her own plate."`,
      cappedGreeting: `"Three hundred twenty-five pounds for both girls. I said it out loud in the car and neither of them flinched. Emma's belly sits forward when she buckles in. Claire's catching the curve of her hips. I bought them new uniforms and didn't apologize for the sizes."`,
      overtookGreeting: `"Chloe's pulled ahead of Emma by a fair margin now. I made my peace with it somewhere between the second pan of rolls and the peach cobbler. Emma's still my first. Claire's still climbing. They're all eating like it's a vocation."`,
      options: [
        {
          text: `"Everyone's grown — all of us, not just the girls. I catch my reflection in the oven door and see this soft apple belly I used to suck in. It just sits there now, round and warm, while I stir. The girls notice. They say I look 'fed,' which is their word for happy."`,
          subs: [
            { text: `"Fed is the right word. Emma told me last week my apron strings don't meet anymore. I laughed. She's one to talk — her skirt rode up before she even finished the pie."` },
            { text: `"I told Emma and Claire both: you don't get to comment on my belly until yours clears the table edge. They went quiet and reached for seconds. That's progress in this house."` },
          ],
        },
        {
          text: `"Emma and Claire compare notes at home like it's a sport. Plates, portions, who got the extra shake. I started keeping score on the fridge calendar. Claire's winning some weeks. Emma sulks and eats more. I consider that parenting."`,
          subs: [
            { text: `"They encourage each other when they're not competing, which is sweet. Last Sunday they baked together and ate half the batch before it cooled. I didn't stop them. I joined in."` },
            { text: `"The rivalry's warmer now. Less sharp. They still race, but they clap when the other one's belt gives up. I never thought I'd hear my kitchen sound like that."` },
          ],
        },
        {
          text: `"I'm happy here. Genuinely. This kitchen is warmer than our dining room ever was — and I mean the room and the feeling. My girls eat without me nagging. I eat without apologizing. That's new for a woman who dieted through two pregnancies."`,
          subs: [
            { text: `"Thank you for making a place where 'more' isn't a lecture. My girls leave full. I leave full. We drive home quiet and satisfied. That's worth the gas."` },
            { text: `"You feel like family now. Darlene-from-down-the-street used to bring store cupcakes to HOA meetings. Darlene-at-your-table brings her daughters back every week because they ask to come."` },
          ],
        },
      ],
    },
    5: {
      greeting: `"The girls are here with us now — Emma and Claire both, big as house and glowing. Watching them move through your kitchen feels like watching something I started finally finish. They reach for bowls without asking. Their hips brush the counter. I stand back and swell up with it."`,
      cappedGreeting: `"Four hundred pounds. My daughters are enormous and I couldn't be prouder if they'd won a scholarship. Emma's belly rests on her thighs when she sits. Claire's not far behind. I brought reinforced chairs from home 'just in case.' Nobody needed convincing."`,
      overtookGreeting: `"Chloe's clearly ahead of Emma now. I see it when they stand side by side — the gap's real. I don't measure anymore. Emma's still growing. Claire's still climbing. Chloe looks like she was born for this table. I'm not jealous. I'm taking notes."`,
      options: [
        {
          text: `"Emma and Claire both look amazing — soft, round, unapologetic. Emma carries weight like I do, belly forward. Claire's hips spread wider every month. They laugh with their mouths full. That's the part I love."`,
          subs: [
            { text: `"They carry it beautifully. Strangers stare. We don't notice anymore. My girls take up space like they earned it — and they did, one plate at a time."` },
            { text: `"Blessed is the word I use when nobody's listening. Two daughters this full, this happy, this hungry for the next lesson. I didn't know motherhood could feel like this."` },
          ],
        },
        {
          text: `"Watching them grow has been one of the great joys of my life. I used to worry about every pound. Now I watch Emma's belt notch move and feel something like pride crack open in my chest."`,
          subs: [
            { text: `"It feels natural now. Like their bodies finally caught up to what we were always feeding them — love, butter, permission. I should've started sooner."` },
            { text: `"I wouldn't change a thing. Not the sizes, not the competition, not the way Claire grins when she beats Emma to dessert. I guided them here. I'd do it again."` },
          ],
        },
        {
          text: `"I've changed too. This path softened me — literally and otherwise. My belly doesn't hide anymore. I wear elastic waists and eat till I'm drowsy. The girls tease me. I tease back. We're all getting rounder together."`,
          subs: [
            { text: `"Thank you for noticing. I used to suck in for company. Now I lean against the counter and let it all sit forward. Feels honest."` },
            { text: `"We all have. Old worries feel silly from this side of the table. My girls are fat and happy. I'm fat and happy. That's the sermon I preach now."` },
          ],
        },
      ],
    },
    6: {
      greeting: `"The girls barely need me in the kitchen anymore. Emma runs the dough. Claire handles the glaze. I fetch heavy things and taste everything twice. They're confident — hips swaying, bellies leading — and I get to watch."`,
      cappedGreeting: `"Four hundred ninety pounds. They've surpassed everything I imagined when I first brought store cookies and called it 'cooking class.' Emma's belly hangs soft over her lap. Claire fills a doorway if she doesn't turn. I brought photos to show the other mothers. I'm not subtle."`,
      overtookGreeting: `"The gap between Emma and Chloe is enormous now. I stopped measuring when Claire pulled even with Emma's belly. Three big girls in my house. One kitchen that fits us all when we're here."`,
      options: [
        {
          text: `"They run this kitchen with joy — laughing, tasting, stealing bites before the timer. Emma bosses the oven. Claire bosses Emma. I boss nobody. I eat and admire."`,
          subs: [
            { text: `"Beautiful to watch them lead. I taught them to cook. You taught them to want more. Together we made something I'm not done being proud of."` },
            { text: `"They've taken to it completely. No hesitation left. Bellies out, sleeves rolled, asking what's next before they've swallowed what's in their mouths."` },
          ],
        },
        {
          text: `"I don't worry about them. Not size, not appetite, not what the neighbors whisper. This is what they were meant for — full, warm, fed. I sleep better knowing that."`,
          subs: [
            { text: `"They're exactly where they should be. Heavy, happy, home on Friday nights with me. I wouldn't trade a pound of it."` },
            { text: `"That's a mother's love, I suppose — wanting them bigger and safer at the same time. This table makes both true."` },
          ],
        },
        {
          text: `"The future feels soft. I picture holidays with wider chairs, bigger batches, grandbabies someday learning to cream the butter. My girls will carry this. Their bodies already do."`,
          subs: [
            { text: `"I'm looking forward to it. More room, more food, more of whatever comes after four hundred ninety. You've spoiled us for small portions."` },
            { text: `"There's always more. That's the promise, isn't it? Another recipe, another inch, another notch. Thank you for showing us it's allowed."` },
          ],
        },
      ],
    },
    7: {
      greeting: `"Formal lessons ending doesn't mean we're done coming. This kitchen raised my girls as much as I did — fed them, widened them, gave them permission. I don't want to lose that rhythm. We already talked about carpooling next month."`,
      cappedGreeting: `"Final session. Everything we worked for sitting around one table — bellies on laps, chairs complaining, flour on everyone's apron. Emma and Claire both hit their marks. I hit mine. I cried in the parking lot and I'm not ashamed."`,
      overtookGreeting: `"Emma and Chloe found their balance — Chloe bigger, Emma content. Claire still racing everybody. I made peace with all of it. My house is full of fat girls who love me. That's the ending I wanted."`,
      options: [
        {
          text: `"This is everything I hoped for and more. My daughters enormous, soft, certain. Me softer than I've been since my twenties. Your kitchen in our weekly calendar forever, if you'll have us."`,
          subs: [
            { text: `"Grateful doesn't cover it. You gave my girls a hunger they wear like jewelry. I'll keep thanking you every Wednesday."` },
            { text: `"We built this together — me at home with the butter, you here with the recipes, the girls eating both of us alive. Something lasting came out of that."` },
          ],
        },
        {
          text: `"Emma and Claire will carry this forward. They talk about teaching their friends. They fight over who gets your honey-butter card. The legacy's already moving."`,
          subs: [
            { text: `"Secure and strong. They know how to feed people now — bodies and hearts. That's more than I got from my mother."` },
            { text: `"They're ready. More than ready. I watch them reach for thirds and think: they'll be fine. Better than fine."` },
          ],
        },
        {
          text: `"Thank you for trusting me with my girls. I brought skepticism and store cookies. You met me with warmth. Now I bring daughters who can't fit their old desks. Best trade I ever made."`,
          subs: [
            { text: `"We'll keep coming as long as you'll have us. Emma already asked about summer sessions. I said ask the Professor."` },
            { text: `"This kitchen's home now. Smells like butter in my memory when we're not here. That's how I know you changed us."` },
          ],
        },
      ],
    },
  },

  Wanda: {
    4: {
      greeting: `"Hello, Professor. Kezia counts the days until Wednesday. I count the pounds — not anxiously, happily. She's three hundred twenty-five now and soft in all the places I hoped. I doubled the cream at home again. She didn't notice. She just asked for more potatoes."`,
      cappedGreeting: `"Three hundred twenty-five for Kezia. Her belly rounds out every shirt now — that full warm dome I remember from my own mirror at her age, only bigger. I bought new bras and didn't mention why. She knew anyway."`,
      options: [
        {
          text: `"Kezia eats with enthusiasm that makes the whole table quiet and watch. I've been doubling cream in our home recipes — potatoes, eggs, soup. She says dinner got better. That's the whole point."`,
          subs: [
            { text: `"She's growing exactly as she should. Hips wider, belly settling, appetite open. I watch her clean a plate and feel that deep satisfied hum in my chest."` },
            { text: `"Her body's responding to richness the way mine always did. I recognize the signs. More stretch in the waistband. More sway when she walks to the fridge."` },
          ],
        },
        {
          text: `"I'm committed to this path — hers and mine. The changes feel natural, like we finally stopped pretending we like small portions. Kezia's happier. I'm happier. The house is happier."`,
          subs: [
            { text: `"Peace with every pound. I used to hide snacks. Now I stock them openly. Kezia reaches in without shame. That's the culture we built."` },
            { text: `"We carry it with pride now. Mother and daughter, both softer, both eating like it's a gift. Which it is."` },
          ],
        },
        {
          text: `"Kezia barely fits her old jeans. I see it as progress — another milestone, like the first time she asked for seconds without prompting. I took photos. She rolled her eyes. I framed one anyway."`,
          subs: [
            { text: `"Lovely sight — her belly pressing the denim, thighs touching when she stands. I don't say much. I make more food."` },
            { text: `"We're building the soft life she deserves. Bigger clothes, bigger portions, bigger comfort. She'll thank me later. She thanks me now with an empty bowl."` },
          ],
        },
      ],
    },
    5: {
      greeting: `"Kezia's here with the other girls now — enormous and graceful in the way only a well-fed girl can be. Watching her move through your kitchen fills me with satisfaction I don't bother hiding. I knew what this was from the first bite. Seeing her live inside it is better than I planned."`,
      cappedGreeting: `"Four hundred pounds. My Kezia is enormous and carries it like she owns the room — belly forward, hips wide, smile slow. I upgraded our sectional last month. She fills it properly now. Best purchase we made."`,
      options: [
        {
          text: `"Kezia thrives here. Belongs, even — like the kitchen was sized for her before she grew into it. At home she eats in the living room now. More room. Less shame. I rearranged furniture twice this year."`,
          subs: [
            { text: `"Perfect at this size. I tell her that. She believes me because I mean it. Every soft inch is evidence the plan worked."` },
            { text: `"I love seeing her full and content. Belly on her lap, bowl in her hands, asking what's for dessert before she's done with dinner."` },
          ],
        },
        {
          text: `"Watching her grow into this has been deeply fulfilling — not patience, intention. I chose richness. She chose to keep eating. We met in the middle and kept going."`,
          subs: [
            { text: `"Unfolding exactly as intended. I don't have doubts left. Only grocery lists and wider doorways."` },
            { text: `"No doubts. She's fed, she's happy, she's home most nights because the world isn't built for her yet. Our house is. I made sure of that."` },
          ],
        },
        {
          text: `"I upgraded furniture at home — reinforced bed, wider chair, cleared space so she doesn't squeeze. Practical and proud in equal measure. She deserves comfort at every size."`,
          subs: [
            { text: `"Practical decision. Proud decision. The bed doesn't creak anymore. She sleeps twelve hours and wakes up hungry. I consider that success."` },
            { text: `"She settles into it beautifully now — spreads out, belly pooling, remote in hand. I bring her food there. She doesn't have to get up. Neither do I, some nights."` },
          ],
        },
      ],
    },
    6: {
      greeting: `"Kezia barely needs guidance in the kitchen anymore. She moves slow — all that weight — but confident. The other girls look to her portions. I look to her face. She's happy. That's the metric I trust."`,
      cappedGreeting: `"Four hundred ninety. She has become magnificent — belly resting heavy on her thighs, breasts full, hips that brush doorframes. I reinforced the bed again. Widened a hallway. She laughed and said I was spoiling her. I said good."`,
      options: [
        {
          text: `"The girls run the table and Kezia's at the center — biggest bowl, biggest appetite, biggest smile when something's rich. Beautiful sight. I take it in every week."`,
          subs: [
            { text: `"She belongs there. Always did, maybe. Now the room agrees. Her presence changes the temperature — warmer, fuller, more honest about hunger."` },
            { text: `"Her presence fills the room. Literally and otherwise. Other mothers measure their daughters against her. I don't mind. Benchmark's a compliment."` },
          ],
        },
        {
          text: `"I don't worry about her size. This is her natural state — the body she was always going to have once someone fed her properly. I'm that someone. Glad for it."`,
          subs: [
            { text: `"Exactly where she's meant to be. Home, fed, growing if we ask her to. She'd say yes. She always says yes to food."` },
            { text: `"Everything feels right and complete. I stopped defending our choices to relatives. Kezia's health is happiness. Her happiness is obvious."` },
          ],
        },
        {
          text: `"I reinforced the bed, widened doorways, moved her to the big bedroom when the old frame got narrow for her hips. Logical steps. She deserves comfort without negotiation."`,
          subs: [
            { text: `"Logical next step. The house adapts. We adapt. She gets bigger; we get better at loving it."` },
            { text: `"She deserves all the comfort we can give. I bring meals to her room now some nights. She thanks me with crumbs on her lips. Fair trade."` },
          ],
        },
      ],
    },
    7: {
      greeting: `"Lessons ending won't stop us coming. This kitchen's our second home — maybe first, the way Kezia talks about your rolls. She doesn't go out much anymore. Neither do I, some weeks. We like it that way."`,
      cappedGreeting: `"Final gathering. Kezia hit every mark we set — four hundred ninety and still eating like the timer's a suggestion. I look at her and see the project complete. I look at you and see who made it possible."`,
      options: [
        {
          text: `"Kezia doesn't go out much anymore. Happiest at home where the furniture fits and the portions don't lie. I stay with her. Bring food. Watch her belly rise and fall while she naps. Peaceful life."`,
          subs: [
            { text: `"Peaceful and contented. She said she doesn't miss going out. I believe her. The world's narrow. Our house isn't."` },
            { text: `"I wouldn't have it another way. I chose this — every cream pour, every late-night snack, every inch she gained on my watch."` },
          ],
        },
        {
          text: `"She embraced this soft abundant life completely. It suits her — the weight, the warmth, the way she takes up a whole couch cushion without trying. I'm grateful we found your table."`,
          subs: [
            { text: `"Transformation complete and beautiful. Mother and daughter both softer than we were. No regrets in this house."` },
            { text: `"Grateful we found this path. Kezia asks about your recipes in her sleep, I swear. Mumbles about butter."` },
          ],
        },
        {
          text: `"Thank you for everything you helped us build. The legacy continues through her — her body, her appetite, her happiness. I'll keep feeding what you started."`,
          subs: [
            { text: `"We'll always be part of this warmth. Wednesday or not. You gave us a language for abundance. We speak it fluently now."` },
            { text: `"Greatest gift. A daughter who loves her size and a mother who helped her get there. Hard to top that."` },
          ],
        },
      ],
    },
  },

  Patrice: {
    4: {
      greeting: `"Hello, Professor… these lessons have me thinking about soft curves all week. Lila looks so deliciously full lately — belly pressing her shirt, thighs rubbing when she walks to the table. I catch myself staring. She catches me. Neither of us looks away."`,
      cappedGreeting: `"Three hundred twenty-five pounds for Lila. She's thick and heavy in ways that make my mouth dry. God, it looks incredible on her. I stand behind her chair at dinner and watch her arms jiggle when she eats. I don't pretend I don't."`,
      options: [
        {
          text: `"Lila's appetite turned greedy — not rude, hungry. Watching her eat warms me all over. She leans into every bite like it's foreplay. I know that sounds dramatic. It's accurate."`,
          subs: [
            { text: `"She's softening beautifully. Those curves get dangerous — hips spreading, belly rounding, bra straps digging in. I bought her larger ones and felt my own pulse skip."` },
            { text: `"Her body responds sensually to everything here — cream, butter, permission. I see it in how she sighs after swallowing. I feel it in how I shift in my seat."` },
          ],
        },
        {
          text: `"I've given in completely. My own body getting heavier, softer — surprisingly arousing. I touch my hips in the mirror now. I linger. Lila noticed. She smiled."`,
          subs: [
            { text: `"Sexier than I've felt in years. Thank you. The weight sits on me like a secret we share with the girls at this table."` },
            { text: `"These changes feel good on my skin — tighter clothes, softer flesh, the rub of thighs when I walk. Lila says I look 'fed.' I am."` },
          ],
        },
        {
          text: `"Lila's thighs rub together when she walks now. Very distracting. Best kind of distraction. I find myself wanting her bigger — more belly, more sway, more of that plush sound when she sits."`,
          subs: [
            { text: `"Lovely plush sight. I bite my lip at the dinner table. She knows. She eats slower when she wants to torture me."` },
            { text: `"I want her even bigger. I said it out loud last week. She blushed and asked for seconds. We're past pretending this is just cooking class."` },
          ],
        },
      ],
    },
    5: {
      greeting: `"Professor, seeing all these enormously soft girls in the kitchen is intoxicating. Lila among them — belly on her thighs, breasts straining, eating like it's worship. I had to fan myself in the car before I came in."`,
      cappedGreeting: `"Four hundred pounds. Lila's massively curvy — breathtaking. Her belly rests heavy on her lap when she sits. I watch the fold of it over her waistband and lose my train of thought. Every time."`,
      options: [
        {
          text: `"Lila devours every bite with pleasure. Her belly rests on her thighs now — warm, heavy, shifting when she laughs. I love it. I love her. I love what we're becoming."`,
          subs: [
            { text: `"Those wide hips and full breasts — so feminine, so inviting. I used to minimize my own. Now I want hers and mine on display."` },
            { text: `"Pure abundance. Makes my pulse race. She catches me looking and pats her belly like she's proud. She should be."` },
          ],
        },
        {
          text: `"I crave these changes now. My own softness incredibly sensitive — waistband digging in, skin warmer, folds I didn't have a year ago. I catch myself touching curves when I'm alone."`,
          subs: [
            { text: `"Every new pound feels erotic. Strange to say at a cooking lesson. True anyway."` },
            { text: `"I touch myself thinking about her size sometimes. Motherly? Maybe not. Honest? Completely."` },
          ],
        },
        {
          text: `"Watching Lila settle her heavy body into a chair is one of my favorite moments. The way flesh yields, spreads, claims the seat. She carries weight seductively — like she knows what it does to me."`,
          subs: [
            { text: `"She carries it seductively. Hips rolling, belly pooling. I swallow and ask what's for dessert."` },
            { text: `"I want her more voluptuous still. Bigger bowls. Bigger clothes. Bigger everything. She nods like she's in on the plan."` },
          ],
        },
      ],
    },
    6: {
      greeting: `"The girls running the kitchen while enormously soft and heavy — incredible sight. Lila moving slow among them, belly leading, arms full. I stand in the doorway and just watch. She knows I'm there. She doesn't cover up."`,
      cappedGreeting: `"Four hundred ninety. Lila's gloriously massive — body a masterpiece of soft abundance. Doorways require strategy. I find that unbearably hot. She finds it funny. We both win."`,
      options: [
        {
          text: `"Lila moves with heavy sensual grace — every step sways her curves, every reach strains her shirt. She fills the room in the most delicious way. I adore it."`,
          subs: [
            { text: `"She set her own standard. Bigger than I imagined when I brought store cookies and pretended I wasn't curious."` },
            { text: `"Her size is feminine power. Soft power. The kind that keeps me up at night planning tomorrow's menu."` },
          ],
        },
        {
          text: `"I'm addicted to how this feels — hers and mine. My body never more alive. Deep soft layers when I sit. Deeper when I imagine hers against mine."`,
          subs: [
            { text: `"These deep soft layers intoxicate me. I press my own belly and think of hers. Mother and daughter, both overflowing."` },
            { text: `"I never want to stop getting bigger. She said the same at breakfast. We meant it."` },
          ],
        },
        {
          text: `"Lila barely fits through some doorways now. She turns sideways, belly brushing frame, laughs. I laugh too. Breathless. She knows why."`,
          subs: [
            { text: `"Her immobility's becoming appealing — not trapped, kept. Fed. Loved. I fantasize about her not needing to leave the couch at all."` },
            { text: `"I fantasize about her larger still. She whispers 'me too' when nobody else listens. We're terrible. We're happy."` },
          ],
        },
      ],
    },
    7: {
      greeting: `"Even at the end, I need this kitchen. Watching Lila like this awakened something in me I didn't know slept — hunger for her size, for mine, for the heat of a room full of women who stopped apologizing."`,
      cappedGreeting: `"Final session perfect. Lila an enormous breathtaking goddess of softness beside me. I brought her favorite pie. She ate half before we sat down. I consider that foreplay."`,
      options: [
        {
          text: `"Lila rarely leaves the house now. Happiest spread out, indulging, belly bare when it's just us. Her massive heavy body the most beautiful thing I've seen. I tell her daily."`,
          subs: [
            { text: `"Most beautiful thing I've ever seen. She believes me because I show it — more food, more touch, more room on the bed."` },
            { text: `"I love how she takes up space. Our living room rearranged around her. I'd rearrange the world if I could."` },
          ],
        },
        {
          text: `"She surrendered completely to this plush overflowing life. I'm obsessed — with her appetite, her curves, the sounds she makes eating. Transformation's pure erotic bliss for both of us."`,
          subs: [
            { text: `"Pure erotic bliss. Strange word for a mother. Accurate word for how I feel watching her swallow."` },
            { text: `"I still hunger to see her more enormous. She grins and opens her mouth. We understand each other."` },
          ],
        },
        {
          text: `"Thank you for turning us into these soft heavy sensual women. I came skeptical. I leave converted — body thicker, mind louder, heart full."`,
          subs: [
            { text: `"We'll keep returning to feed this craving. Wednesday isn't enough. Neither is Thursday. We'll improvise."` },
            { text: `"Most pleasurable journey of my life. Store cookies to this. I'd do every pound again."` },
          ],
        },
      ],
    },
  },
};
