// ═══════════════════════════════════════════════════════════════
// WEIGH-IN BREAK PERSONAS — per-girl wi.breakLine variants keyed
// by corruption tier. Extends breakScene.js via registerModuleVariants
// (must load AFTER the base wi.breakLine pool is registered).
// See ../../AUTHORING.md §4.
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../../engine.js';

const W = 4;

registerModuleVariants("wi.breakLine", [
  // ── 0 · Brittany — cheerleader ─────────────────────────────────
  { when: { studentId: 0, corruption: [0] }, weight: W, text: [
    `Brittany hops off like she's dismounting a routine, hands on her hips, completely unbothered. "Okay, that one is on the scale, not me."`,
    `"That wasn't me," Brittany says, already spinning it. "That was a faulty scale. I'm filing a protest."`,
    `"Coach would say that's a equipment problem," she says, toeing the glass. "Not a me problem."`,
  ]},
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    `Brittany plants her hands on her hips. "New personal best — for breaking things." She almost grins. "Get one that can keep up."`,
    `"I'm keeping score," she says, toeing the cracked dial. "Scale: zero. Me: still winning."`,
    `"Every week it's more," she says, rolling her shoulders. "Scale should've seen this coming."`,
  ]},
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    `Brittany steps off, radiant. "Order a bigger one. I'll break that too." She flexes — soft, proud, unashamed.`,
    `"Still winning," she says{wi.breakBodyGesture|prefix:, }, toeing the cracked glass. "Scale lost. I didn't."`,
    `"That's what I wanted," she says simply. "More of me. Scale included."`,
    `"Thank you," she adds — and she is not talking to the wreckage.`,
  ]},

  // ── 1 · Madeline — bookworm ──────────────────────────────────
  { when: { studentId: 1, corruption: [0] }, weight: W, text: [
    `Madeline tilts her head at the fractured window with quiet, academic interest. "Material failure under sustained load. Predictable, actually."`,
    `"I'll note the equipment limit," she murmurs, already calculating. "And my position relative to it."`,
    `"This exceeds my projected trajectory," she says quietly. "By a meaningful margin."`,
  ]},
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    `"Sustained load exceeded design parameters," Madeline says, adjusting her glasses. "The data is unambiguous."`,
    `"Fascinating," she whispers. "I've outgrown the instrument. That feels… significant."`,
    `"I am getting fatter," she says. "On purpose. The scale objected."`,
  ]},
  { when: { studentId: 1, corruption: [2] }, weight: W, text: [
    `"Hypothesis confirmed," Madeline says, patting the dead dial once. "The subject exceeds available measurement tools."`,
    `"Publishable," she murmurs{wi.breakBodyGesture|prefix:, }. "All of it."`,
    `"The experiment," she says, "is a success."`,
    `"I am no longer in the control group," she adds. "I am the result."`,
  ]},

  // ── 2 · Kylie — influencer ───────────────────────────────────
  { when: { studentId: 2, corruption: [0] }, weight: W, text: [
    `Kylie is already filming. "Babe, look at this. The scale literally couldn't."`,
    `"Okay — honest weigh-in content just got REAL," she says, phone up. "Don't look away."`,
    `"The camera adds ten, the dining hall adds—" She stops. "Okay. Content idea: scale broke. Vulnerable."`,
  ]},
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    `"The comments are going to eat this up," Kylie says, still filming. "'She broke the scale.' Icon behavior."`,
    `"No filter," she says, framing the wreckage. "This is the brand now."`,
    `"Engagement is insane right now," she murmurs. "Lean into it. Literally."`,
  ]},
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    `Kylie pans from the cracked dial to herself{wi.breakBodyGesture|prefix:, }. "Watch me break the next one too."`,
    `"This is what they want," she murmurs to the camera she isn't holding. "They just didn't know it yet."`,
    `"My audience is going to lose their minds," she says. "Good way."`,
    `"Perfect," she breathes, smiling for the camera she isn't holding. "Every pound."`,
  ]},

  // ── 3 · Serena — athlete ─────────────────────────────────────
  { when: { studentId: 3, corruption: [0] }, weight: W, text: [
    `Serena steps off and laughs once, sharp and pleased. "Yeah, I felt that one go. Get one that can keep up."`,
    `"Different training load," she says{wi.breakThighGesture|prefix:, }. "Scale couldn't handle the program."`,
    `"I can't run like I used to," she says, looking at the wreckage. "Guess the scale can't either."`,
  ]},
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    `"Personal best," Serena says, like a split time. "New event: breaking hardware."`,
    `"Same discipline," she says, rolling her shoulders. "Different arena. Bigger equipment."`,
    `"New sport," she says{wi.breakThighGesture|prefix:, }. "Same split-time mentality. Better equipment next week."`,
  ]},
  { when: { studentId: 3, corruption: [2] }, weight: W, text: [
    `"Champion," Serena murmurs{wi.breakBodyGesture|prefix:, }, satisfied. "Get a scale that can keep up with me."`,
    `"Record holder," she says, grinning — feral, pleased. "The scale didn't make the cut."`,
    `"Still climbing," she says with competitor's satisfaction. "I like the challenge."`,
    `"I'm not losing," she grins. "I'm just winning differently."`,
  ]},

  // ── 4 · Fiona — artsy ────────────────────────────────────────
  { when: { studentId: 4, corruption: [0] }, weight: W, text: [
    `Fiona studies the crack pattern. "It's actually beautiful, the way it spidered out."`,
    `"Interesting composition," she murmurs. "Stress fractures. Radial. Honest."`,
    `"It's beautiful," she says, surprised at herself. "I didn't expect to think that."`,
  ]},
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    `"The scale gave up before I finished the sketch," Fiona murmurs. "Rude."`,
    `"I've been painting this body for weeks," she says. "Now the canvas broke the frame."`,
    `"I've been drawing myself differently," she murmurs. "Didn't realize I was also… becoming it."`,
  ]},
  { when: { studentId: 4, corruption: [2] }, weight: W, text: [
    `"Masterpiece in progress," Fiona whispers{wi.breakBodyGesture|prefix:, }. "Needs a bigger gallery. And a bigger scale."`,
    `"I could hang this crack pattern on a wall," she says, studying the spiderweb in the glass. "Next to a mirror."`,
    `"More canvas," she says softly{wi.breakBodyGesture|prefix:, }. "More to work with."`,
    `"Perfect," she breathes, like a gallery opening.`,
  ]},

  // ── 5 · Destiny — gamer ──────────────────────────────────────
  { when: { studentId: 5, corruption: [0] }, weight: W, text: [
    `Destiny sighs through her nose. "Low durability item. Should've upgraded ages ago."`,
    `"Scale broke. Not my fault — hardware was underleveled." She doesn't look up from her phone.`,
    `"Chair ergonomics are trash for this meta," she mutters. "Scale too."`,
  ]},
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    `"New high score," Destiny mutters. "Hardware couldn't handle the build."`,
    `"Tank build. Pure tank." She sounds pleased. "Scale was underleveled."`,
    `"Grinding IRL weight stat," she says. "Don't nerf me."`,
  ]},
  { when: { studentId: 5, corruption: [2] }, weight: W, text: [
    `"Endgame body," Destiny murmurs{wi.breakBodyGesture|prefix:, }. "Server couldn't handle the patch. GG."`,
    `"Maxed out softness," she says, surveying the wreckage. "Zero regrets. Next platform?"`,
    `"Patch notes: increased mass," she says, patting the dead dial. "Running the build."`,
    `"GG," she says, smiling.`,
  ]},

  // ── 6 · Tiffany — sorority ───────────────────────────────────
  { when: { studentId: 6, corruption: [0] }, weight: W, text: [
    `Tiffany shrieks with delight. "GIRLS. I broke the scale. No, like, broke broke."`,
    `"Oh my god," she gasps, delighted. "The chapter is going to DIE when I tell them."`,
    `"These are literally my good jeans. Were." She shrugs. "Worth it."`,
  ]},
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    `"Icon behavior," Tiffany says, posing by the wreckage. "The girls are literally going to ask what I'm eating."`,
    `"New standard," she says, twirling once. "Scale couldn't keep up. Obviously."`,
    `"The chapter voted," she says, posing automatically. "I'm the new standard."`,
  ]},
  { when: { studentId: 6, corruption: [2] }, weight: W, text: [
    `"More is more, babe," Tiffany says{wi.breakBodyGesture|prefix:, }, radiant. "Get a bigger one. I'll break that too."`,
    `"Best semester ever," she breathes. "Best body ever. Worst scale ever."`,
    `"This is the look," she says. "Final answer."`,
    `"Perfect," she breathes.`,
  ]},

  // ── 7 · Priya — overachiever ─────────────────────────────────
  { when: { studentId: 7, corruption: [0] }, weight: W, text: [
    `Priya is already pulling up procurement options. "Industrial-rated, weight-rated to four-fifty minimum, ideally five."`,
    `"Equipment failure," she says, making a note. "I'll draft a replacement spec."`,
    `"Project scope has expanded beyond initial estimates," she says, recalculating.`,
  ]},
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    `"Exceeded target metrics," Priya says, tapping her planner. "Scale was the bottleneck."`,
    `"Trending upward," she notes. "Infrastructure has not kept pace. Noted for procurement."`,
    `"New KPI: pounds per week," she says. "Exceeding targets."`,
  ]},
  { when: { studentId: 7, corruption: [2] }, weight: W, text: [
    `"Maximum output," Priya says with executive calm{wi.breakBodyGesture|prefix:, }. "Current instrumentation insufficient."`,
    `"Exceptional growth," she murmurs, reviewing the wreckage. "Optimal. Order a bigger instrument."`,
    `"Goal: continuous improvement," she says. "Status: on track."`,
    `"Optimal," she breathes.`,
  ]},

  // ── 8 · Maya — quiet ─────────────────────────────────────────
  { when: { studentId: 8, corruption: [0] }, weight: W, text: [
    `Maya steps off without a word, looks at the cracks, then looks at you. She nods once.`,
    `Maya stares at the wreckage a long moment. "…Sorry," she whispers. It doesn't sound like she means it entirely.`,
    `"…Okay," she finally murmurs, after a long moment of saying nothing.`,
  ]},
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    `Maya looks at the dead scale. "Huh," she says quietly. "Guess we graduated."`,
    `"I feel it," she says, barely audible. "Before I see it. Before the scale does."`,
    `"I'm still me," she says, breathing out slow. "Just… more me."`,
  ]},
  { when: { studentId: 8, corruption: [2] }, weight: W, text: [
    `"More," Maya says, meeting your eyes{wi.breakBodyGesture|prefix:, }. One word. She means the scale, and herself.`,
    `"Thank you," she whispers — not to the wreckage.`,
    `"Here," she murmurs. "All of me."`,
    `Maya steps off the wreckage without hurry. "The scale stopped," she says quietly. "I didn't."`,
  ]},

  // ── 9 · Chloe — transfer ─────────────────────────────────────
  { when: { studentId: 9, corruption: [0] }, weight: W, text: [
    `Chloe lets out a dry laugh. "Right. So your American scales are exactly as overbuilt as your portions, then."`,
    `"My mam is going to have words," she says, laughing dryly. "Several words. About this specifically."`,
    `"American portions are a psychological operation," she says, patting her middle. "And I am losing. Badly."`,
  ]},
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    `"Field research concluded," Chloe says. "American portions broke the instrumentation. Grand."`,
    `"I've adapted to local customs," she says, leaning back. "Very thoroughly. Scale couldn't handle it."`,
    `"Grand," she says. "The exchange program includes unlimited refills."`,
  ]},
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    `"Tell my mam I died happy," Chloe laughs{wi.breakBodyGesture|prefix:, }. "And enormous. And the scale knew it."`,
    `"No regrets," she says, surveying the wreckage with bemused pride. "Get a bigger one."`,
    `"Best year abroad ever," she says. "Going back to Dublin enormous. Legend."`,
    `"Cheers," she breathes, smiling.`,
  ]},

  // ── 10 · Reneé — culinary ────────────────────────────────────
  { when: { studentId: 10, corruption: [0] }, weight: W, text: [
    `Reneé claps once, delighted. "That is the best review my cooking has ever gotten."`,
    `"Quality ingredients," she says, inhaling. "The scale couldn't digest the results."`,
    `"I've been tasting too much," she inhales. "No. The right amount."`,
  ]},
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    `"The body is a kitchen," Reneé says, pinching her waist. "I filled the pantry. Scale ran out of shelf space."`,
    `"Every recipe needs more body," she says. "Including mine. Including your equipment."`,
    `"More to work with," she says, pinching her waist with chef's precision.`,
  ]},
  { when: { studentId: 10, corruption: [2] }, weight: W, text: [
    `"Second helping," Reneé murmurs{wi.breakBodyGesture|prefix:, }, radiant and round. "Of everything. Scale included."`,
    `"Perfect reduction," she smiles. "Everything concentrates. Even the wreckage."`,
    `"Dessert too," she murmurs, warm as a walk-in oven.`,
    `"Perfection," she breathes.`,
  ]},

  // ── 11 · Kaylee — nursing ──────────────────────────────────────
  { when: { studentId: 11, corruption: [0] }, weight: W, text: [
    `Kaylee covers her mouth. "Oh no, professor, I am so sorry. We'll get you something sturdier."`,
    `"You're eating enough, right — I mean, I'm sorry," she says. "The scale wasn't."`,
    `"I tell my patients to be kind to their bodies," she says. "I'm learning to mean it for mine."`,
  ]},
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    `"Aggressive self-care," Kaylee murmurs, settling deeper. "The scale couldn't handle the dosage."`,
    `"I've been taking my own advice," she says, almost smiling. "Rest. Nutrition. Comfort. Collateral damage."`,
    `"Self-care," she murmurs, settling deeper. "Aggressive self-care."`,
  ]},
  { when: { studentId: 11, corruption: [2] }, weight: W, text: [
    `"Plenty of room," Kaylee says warmly{wi.breakBodyGesture|prefix:, }. "For me. Get a bigger scale."`,
    `"Whole," she breathes, looking down at the wreckage. "The scale wasn't."`,
    `"Come sit," she says, radiating warmth. "There's room."`,
    `"Fully nourished," she murmurs. "Complete care."`,
  ]},

  // ── 12 · Nadia — psych ───────────────────────────────────────
  { when: { studentId: 12, corruption: [0] }, weight: W, text: [
    `Nadia watches your reaction more than the scale. "Interesting. You looked at the scale first, then at me."`,
    `"I've been studying denial," she says. "In myself. The scale stopped cooperating."`,
    `"You looked at me before you looked at the number," she observes. "Interesting."`,
  ]},
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    `"The subject is cooperating," Nadia murmurs — meaning herself. "The instrumentation is not."`,
    `"I've moved past the resistance phase," she says. "Fascinating. Expensive, though."`,
    `"Correlation between your attention and my appetite remains significant," she notes.`,
  ]},
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    `"You wanted this demonstrated," Nadia says, watching you watch her{wi.breakBodyGesture|prefix:, }. "There. Demonstrated."`,
    `"Integration complete," she says{wi.breakBodyGesture|prefix:, }. "The scale failed to integrate."`,
    `"The data is overwhelming," she says, watching you watch her.`,
    `"Understood," she breathes.`,
  ]},

  // ── 13 · Daisy — eced ────────────────────────────────────────
  { when: { studentId: 13, corruption: [0] }, weight: W, text: [
    `Daisy laughs warmly. "Bless its little heart. You go on and get a bigger one, sugar."`,
    `"Honey, that scale tried its best," she says fondly. "Bless it."`,
    `"Lord, I do love a good meal," she sighs fondly. "Scale didn't."`,
  ]},
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    `"Second helpings are a kindness," Daisy says, settling in. "To yourself. Scale couldn't keep up, sugar."`,
    `"Growing sweet," she says, hands on her soft curves. "Equipment's gotta grow too."`,
    `"Sugar, comfort food works both ways," she says. "I'm living proof."`,
  ]},
  { when: { studentId: 13, corruption: [2] }, weight: W, text: [
    `"Come eat," Daisy murmurs{wi.breakBodyGesture|prefix:, }, glowing. "And get a bigger scale while you're at it."`,
    `"Blessed," she breathes, looking at the wreckage. "Plenty to go around. Including the weight."`,
    `"Plenty to go around," she murmurs, glowing.`,
    `"Full house," she says warmly.`,
  ]},

  // ── 14 · Mary Jane — farm girl ───────────────────────────────
  { when: { studentId: 14, corruption: [0] }, weight: W, text: [
    `Mary Jane bursts out laughing. "Back home we'd've put me on the hay scale weeks ago."`,
    `"These ain't gonna make it to Thanksgiving at this rate," she laughs, thumbing a strained seam.`,
    `"Back home we'd call this 'healthy,'" she says. "City food hits different though."`,
  ]},
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    `"Field's been good to me," Mary Jane says, leaning back. "Scale wasn't built for a harvest like this."`,
    `"Grand!" She slaps her hip. "Mama would be proud. Or horrified. The scale sure was horrified."`,
    `"Mama would be proud. Or horrified. Probably both."`,
  ]},
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    `"Bounty," Mary Jane says simply{wi.breakBodyGesture|prefix:, }. "Scale couldn't hold it. Get a barn-sized one."`,
    `"Plenty," she murmurs, smiling like a barn at harvest. "More coming. Scale knew."`,
    `"Land don't lie," she says, patting herself.`,
    `"Home," she breathes.`,
  ]},

  // ── 15 · Lilith — predator (voice barely shifts with corruption)
  { when: { studentId: 15, corruption: [0] }, weight: W, text: [
    `Lilith regards the cracked dial with quiet amusement. "Fragile little thing."`,
    `"So little faith in hardware," she murmurs. "Reasonable, I suppose."`,
    `"I'm collecting mass the way others collect grades," she smiles, without warmth.`,
  ]},
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    `Lilith traces one crack with a fingertip. "It tried. That almost makes it sadder."`,
    `"Numbers are such a human obsession," she says with faint amusement. "The scale shared it. Briefly."`,
    `"Almost ready," she murmurs, stretching — soft over something coiled.`,
  ]},
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    `Lilith smiles down at the wreckage{wi.breakBodyGesture|prefix:, }. "It saw what was coming. It still broke."`,
    `"Soon," she says softly, and the scale is already behind her.`,
    `"It wasn't built for what's coming," she murmurs, pleased.`,
    `"Good," she says simply. "More room for me."`,
  ]},

  // ── 16 · Sophia — pharmacy grad ──────────────────────────────
  { when: { studentId: 16, corruption: [0] }, weight: W, text: [
    `Sophia stares at the cracks, mentally recalculating load tolerances. "That was rated equipment," she says faintly. "I exceeded rated equipment."`,
    `"Oh no — the calibration—" She crouches by the wreckage. "This voids the warranty. I voided the warranty."`,
    `"Within parameters." She checks the wreckage twice anyway. "Mostly within parameters."`,
  ]},
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    `Sophia prods the fractured dial with one gloved finger. "Material failure under sustained dosing," she murmurs. "Predictable, in retrospect."`,
    `"The protocol wasn't supposed to include the hardware," she says. A beat. "I'm revising the protocol."`,
    `"Load exceeded," she whispers, more fascinated than sorry. "You'll need to source a heavier-duty replacement."`,
  ]},
  { when: { studentId: 16, corruption: [2] }, weight: W, text: [
    `Sophia steps off the dead platform without hurry. "Source one rated for me," she says, clinical and certain. "I'll exceed that too."`,
    `"Collateral damage," she says{wi.breakBodyGesture|prefix:, }. "Acceptable. The trial continues."`,
    `"Efficacy confirmed," Sophia murmurs, looking down at the wreckage like a successful assay. "The scale failed QC. I did not."`,
    `"I broke your equipment," she says, meeting your eyes. "Again. Keep the receipts — I intend to keep breaking them."`,
  ]},

  // ── 17 · Indiana Bones — explorer ────────────────────────────
  { when: { studentId: 17, corruption: [0] }, weight: W, text: [
    `Indiana Bones surveys the wreckage like a dig site. "Structural collapse. Classic. Usually I'm running OUT of the temple when this happens."`,
    `"Well." She brushes glass off her boot. "That's one more artifact I wasn't supposed to take home."`,
    `"Cursed scale," she mutters. "Should've read the inscription. 'Thou shalt not exceed four hundred.'"`,
  ]},
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    `Indiana Bones toes the cracked platform. "Every expedition packs on weight. I just… kept it all onboard."`,
    `"The map didn't warn me about this terrain," she says, patting her middle. "My fault for not updating the map."`,
    `"Structural give," she says, crouching to examine the fracture pattern. "Same as a bad tomb floor. I should've brought planks."`,
  ]},
  { when: { studentId: 17, corruption: [2] }, weight: W, text: [
    `Indiana Bones grins at the wreckage{wi.breakBodyGesture|prefix:, }. "Fortune and glory," she says. "Mostly stored locally now."`,
    `"Treasure weighs what treasure weighs," she tells the cracked dial. "You should've planned for a bigger hoard."`,
    `Indiana Bones looks from the cracked glass to you. "No apology necessary, Professor. We both knew I'd win the standoff."`,
    `"The scale conceded," she says, satisfied. "Good. I like it when ruins know when to yield."`,
  ]},
]);
