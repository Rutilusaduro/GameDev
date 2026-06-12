// ═══════════════════════════════════════════════════════════════
// WEIGH-IN PERSONAS — per-girl voice for the wi.* dialogue slots.
// Extends the shared pools in ./fragments.js via registerModuleVariants
// (adds variants, never replaces). Quotes mined VERBATIM from the
// retired weighInReplies.js builders — the voice lives in the quotes.
// Convention: key on studentId + corruption (+ stage band where the
// line is band-specific), weight 4 so the girl's own voice dominates
// the pool without silencing shared fragments. See ../../AUTHORING.md §4.
// Roster: AUTHORING.md §3 (ids 0-17).
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4; // persona weight — dominant but not exclusive

// Shape: DIALOGUE BEAT (see wi.replyDialogue in fragments.js).
registerModuleVariants("wi.replyDialogue", [
  // ── 0 · Brittany — cheerleader: gain reframed as winning ─────
  { when: { studentId: 0, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"That's — okay, that's fine. Probably muscle. Definitely not the dining hall."`,
    `"It's the food here," she says. "Different portions. Different everything. I'll cut back. Probably. After midterms."`,
  ]},
  { when: { studentId: 0, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"I've been eating like we're in postseason. Makes sense." She meets your eyes. "Don't look at me like you're keeping score. I'm keeping score."`,
    `"Every week it's more. I can feel it when I walk — everything moves different." A beat. "Fine. New baseline."`,
  ]},
  { when: { studentId: 0, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Coach would lose his mind. I don't care. This is the best shape I've ever been in."`,
    `"That's what I wanted," she says simply. "More of me. Every week, more. Keep it coming."`,
  ]},
  { when: { studentId: 0, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"That's a lot," she admits, voice smaller than usual. "I used to know exactly what I weighed. Now I just… feel it before I see it."`,
  ]},
  { when: { studentId: 0, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"I'm not pretending anymore. This is what I am now." She looks at you. "And I'm still winning at it."`,
    `"Still growing," she says. Not a complaint. A status report.`,
  ]},
  { when: { studentId: 0, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Beautiful," she says, and she means herself. "You see it too, right? All of this? I'm not done."`,
    `"Thank you," she says, and she is not talking to the scale.`,
  ]},

  // ── 1 · Madeline — bookworm: the self-study ──────────────────
  { when: { studentId: 1, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Within expected variance for semester dietary changes," she murmurs, adjusting her glasses. "I'll continue monitoring."`,
    `"This exceeds my projected trajectory by approximately—" She pauses. "By a meaningful margin."`,
  ]},
  { when: { studentId: 1, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Up from last week. Correlation with increased caloric intake is…" She presses a hand to her waist. "Noted."`,
    `"The data is unambiguous," she says. "I am getting fatter. On purpose. I have notes on how it feels."`,
  ]},
  { when: { studentId: 1, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Hypothesis confirmed: intentional weight gain produces measurable results. I would like to continue the experiment."`,
    `"I've been conducting this research on myself for months now. The findings are…" She exhales, pleased. "Extensive. And I want more data."`,
  ]},
  { when: { studentId: 1, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I need to revise several assumptions," she says quietly. "About capacity. About identity."`,
    `"I don't have a framework for this yet," she whispers.`,
  ]},
  { when: { studentId: 1, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"I am no longer in the control group," she says. "I am the result."`,
    `"Continuing," she says, recording it without tremor.`,
  ]},
  { when: { studentId: 1, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Publishable," she murmurs, patting her belly. "All of it."`,
    `"The experiment," she says, "is a success."`,
  ]},

  // ── 2 · Kylie — influencer: everything is content ────────────
  { when: { studentId: 2, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"The camera adds ten, the dining hall adds—" She stops. "Okay. Content idea: honest weigh-in. Vulnerable. Relatable." She's already framing it.`,
    `"Okay so like—it's fine. It's college. Everyone gains." She sounds like someone reading a script she didn't write.`,
  ]},
  { when: { studentId: 2, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Engagement on body-positive posts is insane right now." She isn't performing denial anymore. "Lean into it. Literally."`,
    `"The comments section would eat this up. 'She's so real.' I am real. Really soft, really full, really—" She smiles. "Really into it."`,
  ]},
  { when: { studentId: 2, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"My audience is going to lose their minds. Good way. This is the content. This is the brand now."`,
    `"Watch this number climb," she says to the room, to you, to her future feed. "Watch me."`,
  ]},
  { when: { studentId: 2, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I used to edit this out," she says quietly. "All of it."`,
    `"I can't… shoot this," she whispers. Then, quieter: "Can I?"`,
  ]},
  { when: { studentId: 2, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"No filter. No angle. Just me." She sounds proud. "Finally."`,
    `"This is the channel now," she says.`,
  ]},
  { when: { studentId: 2, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"This is what they want," she murmurs, hands on her belly. "They just didn't know it yet."`,
    `"Perfect," she breathes, smiling for the camera she isn't holding. "Every pound."`,
  ]},

  // ── 3 · Serena — athlete: discipline redirected ──────────────
  { when: { studentId: 3, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Huh." She prods her thigh. "Different training load." She won't call it fat yet. She will call it adaptation.`,
    `"I can't run like I used to," she says. Not grief. Fact. "Something else is happening instead."`,
  ]},
  { when: { studentId: 3, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Personal best," she says, like a split time. "New sport. Same discipline."`,
    `"I've redirected," she says, rolling her shoulders. "Same drive. Different arena."`,
  ]},
  { when: { studentId: 3, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Still climbing," she says with competitor's satisfaction. "I like the challenge."`,
    `"I'm not losing," she grins — feral, pleased. "I'm just winning differently."`,
  ]},
  { when: { studentId: 3, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I miss the track," she admits. "I don't miss being small."`,
  ]},
  { when: { studentId: 3, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"New event. No weight class." She almost smiles.`,
    `"Still training," she says.`,
  ]},
  { when: { studentId: 3, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Record holder," she says, patting her belly.`,
    `"Champion," she murmurs, satisfied.`,
  ]},

  // ── 4 · Fiona — artsy: the body as composition ───────────────
  { when: { studentId: 4, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Interesting composition," she murmurs. "The line of the body is changing."`,
    `"It's beautiful," she says, surprised at herself. "I didn't expect to think that."`,
  ]},
  { when: { studentId: 4, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"I've been drawing myself differently. Didn't realize I was also… becoming it."`,
    `"I've been painting this body for weeks. Now I am the painting."`,
  ]},
  { when: { studentId: 4, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"More canvas," she says softly. "More to work with."`,
    `"Masterpiece in progress," she whispers. "Don't rush it."`,
  ]},
  { when: { studentId: 4, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I need a bigger studio," she says, reverent. "For the subject."`,
    `"Too big for the frame," she whispers. "Good."`,
  ]},
  { when: { studentId: 4, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"I've stopped sketching and started living in the work."`,
    `"The final form," she says.`,
  ]},
  { when: { studentId: 4, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Exhibit," she murmurs. "Open indefinitely."`,
    `"Perfect," she breathes, like a gallery opening.`,
  ]},

  // ── 5 · Destiny — gamer: dry patch-notes idiom ───────────────
  { when: { studentId: 5, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Cool. Whatever." She doesn't look up. "AFK eating meta is strong this semester."`,
    `"Chair ergonomics are trash for this meta." She adjusts. Fails. Adjusts again.`,
  ]},
  { when: { studentId: 5, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"New high score." She doesn't look up from her phone. "Grinding IRL weight stat. Don't nerf me."`,
    `"Tank build. Pure tank." She sounds pleased. "No DPS. All presence."`,
  ]},
  { when: { studentId: 5, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Patch notes: increased mass, improved comfort debuff resistance." She pats her belly. "Running the build."`,
    `"Maxed out softness," she says, surveying herself like a character screen. "Zero regrets. Next?"`,
  ]},
  { when: { studentId: 5, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"Need a new rig," she mutters. "And a wider doorframe mod."`,
  ]},
  { when: { studentId: 5, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Boss-tier mass," she says. "Unlocked."`,
    `"DLC: infinite expansion," she says, nodding.`,
  ]},
  { when: { studentId: 5, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Endgame body," she murmurs, hands on her vast belly.`,
    `"GG," she says, smiling.`,
  ]},

  // ── 6 · Tiffany — sorority: more is more, babe ───────────────
  { when: { studentId: 6, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Okay but like—brunch is a lifestyle and I will die on that hill. Don't tell the chapter. Actually tell them. They'll be jealous."`,
    `"These are literally my good jeans. Were." She shrugs. "Worth it for the pasta bar."`,
  ]},
  { when: { studentId: 6, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Up!" She does a little twirl. "The girls are literally asking what I'm eating. Trade secret."`,
    `"The chapter voted," she says, posing automatically. "I'm the new standard."`,
  ]},
  { when: { studentId: 6, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Best semester ever. Best body ever." She runs her hands over her waist. "More is more, babe."`,
    `"Icon behavior," she says, radiant.`,
  ]},
  { when: { studentId: 6, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"Okay so the house had to widen my doorway. Not a vibe I planned. Still hot though."`,
  ]},
  { when: { studentId: 6, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Queen of the chapter. Literally. They bring me food now."`,
    `"House mother energy," she murmurs.`,
  ]},
  { when: { studentId: 6, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"This is the look," she says, hands on her vast belly. "Final answer."`,
    `"Perfect," she breathes.`,
  ]},

  // ── 7 · Priya — overachiever: KPIs and frameworks ────────────
  { when: { studentId: 7, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Variance within acceptable parameters for high-stress academic environment. I'll optimize meal timing."`,
    `"Project scope has expanded beyond initial estimates," she says, recalculating.`,
  ]},
  { when: { studentId: 7, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Trending upward. Correlates with increased caloric efficiency and reduced guilt." She taps her planner. "Acceptable trade."`,
    `"New KPI: pounds per week. Exceeding targets."`,
  ]},
  { when: { studentId: 7, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Goal: continuous improvement. Status: on track."`,
    `"Maximum output," she says with executive calm, patting her belly.`,
  ]},
  { when: { studentId: 7, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I need a new framework," she admits. Her projection models did not survive contact with her appetite.`,
    `"Outlier," she whispers.`,
  ]},
  { when: { studentId: 7, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Overperformed," she says, filing it under Success Metrics.`,
    `"Benchmark set," she nods.`,
  ]},
  { when: { studentId: 7, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Exceptional growth," she murmurs, reviewing the quarter.`,
    `"Optimal," she breathes.`,
  ]},

  // ── 8 · Maya — quiet: few words, all load-bearing ────────────
  { when: { studentId: 8, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"…Okay," she finally murmurs, after a long moment of saying nothing.`,
    `"I didn't think I'd…" She trails off. Doesn't finish. Doesn't need to.`,
  ]},
  { when: { studentId: 8, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"I feel it," she says quietly. "Before I see it."`,
    `"I'm still me," she says, breathing out slow. "Just… more me."`,
  ]},
  { when: { studentId: 8, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"More," she says, meeting your eyes. One word. She means it.`,
    `"Thank you," she whispers, with a small, private, real smile.`,
  ]},
  { when: { studentId: 8, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I can't hide this anymore," she says. Not afraid. Honest.`,
  ]},
  { when: { studentId: 8, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"I stopped hiding," she says, hands on her belly. "It feels… warm."`,
    `"Staying," she says.`,
  ]},
  { when: { studentId: 8, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Here," she murmurs. "All of me."`,
    `"Home," she breathes.`,
  ]},

  // ── 9 · Chloe — transfer: dry Dublin field research ──────────
  { when: { studentId: 9, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"American portions are a psychological operation and I am losing. Badly." She pats her middle. "Worth it though. Obviously."`,
    `"My mam is going to have words," she says, laughing dryly. "Several words."`,
  ]},
  { when: { studentId: 9, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Grand," she says. "The exchange program includes unlimited refills. I'm conducting field research."`,
    `"I've adapted to local customs," she says, leaning back. "Very thoroughly."`,
  ]},
  { when: { studentId: 9, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Best year abroad ever. Going back to Dublin enormous. Legend."`,
    `"No regrets," she says, surveying herself with bemused pride.`,
  ]},
  { when: { studentId: 9, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"Need a new wardrobe. And a new country. Same country. Bigger country."`,
    `"Bloody hell," she whispers.`,
  ]},
  { when: { studentId: 9, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"When in Rome," she shrugs. "Eat everything."`,
    `"Fully assimilated," she says.`,
  ]},
  { when: { studentId: 9, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Tell my mam I died happy," she laughs, hands on her belly.`,
    `"Cheers," she breathes, smiling.`,
  ]},

  // ── 10 · Reneé — culinary: the body as kitchen ───────────────
  { when: { studentId: 10, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Quality ingredients," she says. "I'm my own best critic."`,
    `"I've been tasting too much," she inhales. "No. The right amount."`,
  ]},
  { when: { studentId: 10, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"More to work with," she says, pinching her waist with chef's precision. "The body is a kitchen. I'm filling the pantry."`,
    `"Every recipe needs more body," she says. "Including mine."`,
  ]},
  { when: { studentId: 10, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Perfect reduction," she smiles. "Everything concentrates."`,
    `"Second helping," she murmurs, radiant and round. "Of everything."`,
  ]},
  { when: { studentId: 10, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I broke the kitchen stool," she admits. "Bought a bench."`,
  ]},
  { when: { studentId: 10, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Main course," she says warmly, patting her belly.`,
    `"Fully baked," she murmurs.`,
  ]},
  { when: { studentId: 10, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Dessert too," she murmurs, warm as a walk-in oven.`,
    `"Perfection," she breathes.`,
  ]},

  // ── 11 · Kaylee — nursing: clinical warmth, turned inward ────
  { when: { studentId: 11, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"You're eating enough, right? I mean— I'm eating enough. Sorry. Habit."`,
    `"I tell my patients to be kind to their bodies," she says. "I'm learning to mean it for mine."`,
  ]},
  { when: { studentId: 11, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"I've been taking my own advice. Rest. Nutrition. Comfort." She almost smiles. "It's working."`,
    `"Self-care," she murmurs, settling deeper. "Aggressive self-care."`,
  ]},
  { when: { studentId: 11, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Healthy growth," she beams, and means something entirely different than her textbooks.`,
    `"Come sit," she says, radiating warmth. "There's room."`,
  ]},
  { when: { studentId: 11, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I need to practice what I preach," she says quietly. "About accepting your body."`,
  ]},
  { when: { studentId: 11, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Fully nourished," she says, hands on her belly.`,
    `"Complete care," she murmurs.`,
  ]},
  { when: { studentId: 11, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Plenty for everyone," she murmurs, smiling — a warm harbor.`,
    `"Whole," she breathes.`,
  ]},

  // ── 12 · Nadia — psych: names the dynamic out loud ───────────
  { when: { studentId: 12, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"You looked at me before you looked at the number," she observes. "Interesting."`,
    `"I've been studying denial as a coping mechanism," she says. "In myself."`,
  ]},
  { when: { studentId: 12, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Correlation between your attention and my appetite remains significant," she notes.`,
    `"I've moved past the resistance phase," she says, leaning back. "Fascinating process."`,
  ]},
  { when: { studentId: 12, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"The subject is cooperating," she murmurs — meaning herself.`,
    `"Integration complete," she says, hands on her soft belly.`,
  ]},
  { when: { studentId: 12, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"I need supervision," she admits. "Yours."`,
  ]},
  { when: { studentId: 12, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Countertransference," she murmurs, patting her belly. "Accepted."`,
    `"Embodied," she says.`,
  ]},
  { when: { studentId: 12, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"The data is overwhelming," she says, watching you watch her.`,
    `"Understood," she breathes.`,
  ]},

  // ── 13 · Daisy — eced: Southern feeding warmth ───────────────
  { when: { studentId: 13, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Honey, you're eating enough — I mean I am, bless it. Someone's got to model good nutrition."`,
    `"Lord, I do love a good meal," she sighs fondly.`,
  ]},
  { when: { studentId: 13, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Sugar, comfort food works both ways. I'm living proof."`,
    `"Second helpings are a kindness," she says, settling in. "To yourself."`,
  ]},
  { when: { studentId: 13, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Growing sweet," she says, hands on her soft curves.`,
    `"Plenty to go around," she murmurs, glowing.`,
  ]},
  { when: { studentId: 13, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"The kids I student-teach think I'm pregnant," she laughs. "I just tell them: fed."`,
  ]},
  { when: { studentId: 13, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Well-fed," she says, patting her belly. "That's the goal."`,
    `"Full house," she murmurs.`,
  ]},
  { when: { studentId: 13, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Come eat," she murmurs, a kitchen unto herself.`,
    `"Blessed," she breathes.`,
  ]},

  // ── 14 · Mary Jane — farm girl: harvest imagery ──────────────
  { when: { studentId: 14, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Back home we'd call this 'healthy.' City food hits different though. Better, maybe."`,
    `"These ain't gonna make it to Thanksgiving at this rate," she laughs, thumbing a strained seam.`,
  ]},
  { when: { studentId: 14, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Grand!" She slaps her hip. "Mama would be proud. Or horrified. Probably both."`,
    `"Field's been good to me," she says, leaning back, sun-warm.`,
  ]},
  { when: { studentId: 14, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Growing good," she says, warm as biscuits.`,
    `"More harvest," she murmurs, abundance personified.`,
  ]},
  { when: { studentId: 14, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"Need a new porch swing," she says. "And a wider truck seat."`,
  ]},
  { when: { studentId: 14, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Bounty," she says simply, patting her belly.`,
    `"Land don't lie," she says.`,
  ]},
  { when: { studentId: 14, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Plenty," she murmurs, smiling like a barn at harvest.`,
    `"Home," she breathes.`,
  ]},

  // ── 15 · Lilith — predator: sparse, unsettling, amused ───────
  // (Her voice ignores corruption — she was never resisting anything.)
  // Slight/Slim: the smallness is an insult she intends to correct.
  { when: { studentId: 15, stageMax: 1 }, weight: W, text: [
    `"So little of me," she murmurs, reading the number like an insult she has decided to correct.`,
    `A flicker of distaste crosses her face. "A starting point. Nothing more."`,
    `"I am still small," she says. It sounds like a threat aimed at the future.`,
    `"It's never enough," she says softly — not complaint, appetite.`,
  ]},
  { when: { studentId: 15, stageMin: 2, stageMax: 5 }, weight: W, text: [
    `"Numbers are such a human obsession," she says with faint amusement.`,
    `"I'm collecting mass the way others collect grades," she smiles, without warmth.`,
  ]},
  { when: { studentId: 15, stageMin: 6 }, weight: W, text: [
    `"Almost ready," she murmurs, stretching — soft over something coiled.`,
    `"Soon," she says, looking at you the way a tide pool looks at the moon.`,
  ]},

  // ── 16 · Sophia — pharmacy grad: anxious precision (new) ─────
  { when: { studentId: 16, corruption: [0], stageMax: 1 }, weight: W, text: [
    `"Baseline confirmed," she says, relieved, like the scale might have argued.`,
    `"Within parameters." She checks the number against the one in her head anyway. Twice.`,
  ]},
  { when: { studentId: 16, corruption: [0], stageMin: 2, stageMax: 5 }, weight: W, text: [
    `"That's— I double-checked my intake math. Twice. The variance shouldn't be this large."`,
    `"It's fine. It's within tolerances." A beat. "Mostly within tolerances."`,
  ]},
  { when: { studentId: 16, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"The formulation is working. On me. That wasn't the protocol, but…" She exhales. "Noted."`,
    `"I should log this," she says, not reaching for the logbook. "I will absolutely log this."`,
  ]},
  { when: { studentId: 16, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Self-trial results: significant. Sustained." She smooths her lab coat over her middle. "I'm not stopping the trial."`,
    `"Wellness is a dosage question, Professor. I keep increasing the dose."`,
  ]},
  { when: { studentId: 16, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"This is outside every safety margin I wrote," she says quietly. "I wrote them. I knew where they were."`,
  ]},
  { when: { studentId: 16, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"Side effects: substantial." She looks down at herself. "Efficacy: undeniable."`,
  ]},
  { when: { studentId: 16, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"The compound works," she says, vast and certain. "I am the data. Look at the data."`,
  ]},

  // ── 17 · Indiana Bones — explorer: roguish bravado (new) ─────
  { when: { studentId: 17, corruption: [0], stageMax: 5 }, weight: W, text: [
    `"Huh. The whip belt's been arguing with me all week. Now I know why."`,
    `"That number belongs in a museum. Preferably behind glass, where I can't see it."`,
  ]},
  { when: { studentId: 17, corruption: [1], stageMax: 5 }, weight: W, text: [
    `"Every expedition adds supplies. I'm just… carrying mine onboard now."`,
    `"New terrain," she says, unbothered. "I map it as I go."`,
  ]},
  { when: { studentId: 17, corruption: [2], stageMax: 5 }, weight: W, text: [
    `"Treasure," she grins, patting her middle. "Some of us hoard it internally."`,
    `"Forbidden cartography of me. The map keeps growing."`,
  ]},
  { when: { studentId: 17, corruption: [0], stageMin: 6 }, weight: W, text: [
    `"The dig site has expanded," she says, looking down at herself. "Significantly. Send a bigger crew."`,
  ]},
  { when: { studentId: 17, corruption: [1], stageMin: 6 }, weight: W, text: [
    `"I used to squeeze through tomb shafts," she says. "Now I AM the monument."`,
  ]},
  { when: { studentId: 17, corruption: [2], stageMin: 6 }, weight: W, text: [
    `"Fortune and glory," she murmurs, hands spread on her belly. "Mostly fortune. All of it stored on-site."`,
  ]},
]);

// Persona number-receptions for the most distinctive voices.
// Shape: FULL SENTENCE / DIALOGUE BEAT (see wi.numberLine).
registerModuleVariants("wi.numberLine", [
  { when: { studentId: 1, corruption: [0] }, weight: W, text: [
    `She writes {subject.lbs} in her notebook, underlined twice.`,
  ]},
  { when: { studentId: 1, corruption: [1, 2] }, weight: W, text: [
    `"{subject.lbs} lbs. Documented."`,
  ]},
  { when: { studentId: 7 }, weight: W, text: [
    `She logs {subject.lbs} in three apps simultaneously.`,
  ]},
  { when: { studentId: 12 }, weight: W, text: [
    `"{subject.lbs}," she says, watching your face instead of the dial.`,
  ]},
  { when: { studentId: 2 }, weight: W, text: [
    `She films the scale before she films herself. {subject.lbs} lbs.`,
  ]},
]);
