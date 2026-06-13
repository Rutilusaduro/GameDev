// ═══════════════════════════════════════════════════════════════
// GROWTH EVENT PERSONAS — per-girl voice for ge.reactionDialogue
// and grow.crossingDialogue. Extends the shared pools in
// ./fragments.js via registerModuleVariants. Weight 4 so each
// girl's own voice dominates without silencing shared fragments.
// Double depth (addiction/psych/withdrawal gates) for:
//   Brittany(0), Madeline(1), Kylie(2), Destiny(5),
//   Chloe(9), Reneé(10), Daisy(13), Lilith(15).
// Roster: AUTHORING.md §3 (ids 0–17).
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../../engine.js';
import './fragments.js';

const W = 4; // persona weight — dominant but not exclusive

// Shape: DIALOGUE BEAT — full sentences with quotes + attribution.
// All texts must be < 200 chars (pool module limit).
// Stage-band selectors use endStageMin/endStageMax because the
// student's lbs may not yet reflect the gain at render time;
// ctx.globals.endStage is the authoritative post-gain stage.
registerModuleVariants("ge.reactionDialogue", [

  // ── 0 · Brittany — cheerleader: gain reframed as winning ──────
  { when: { studentId: 0, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"I felt all of that." She steadies, hand on her side. "New weight class. I adapt."`,
    `"Okay. Okay." She smooths her shirt. "New play. Still in the game."`,
  ]},
  { when: { studentId: 0, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Week after week," she says, almost impressed. "New baseline every time. I'll take it."`,
    `"Setting records," she says, smoothing her top. "Just not the ones I planned on."`,
  ]},
  { when: { studentId: 0, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Yes." She sounds purely satisfied. "That's exactly what I wanted. More of that."`,
    `"Still climbing," she says, hands on her waist. "Good. Keep it coming."`,
  ]},
  { when: { studentId: 0, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I feel it when I breathe," she says. "A lot of new weight." She squares her jaw. "Still keeping score."`,
    `"That's real," she says. "I'm keeping track of all of it."`,
  ]},
  { when: { studentId: 0, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Still winning," she says. "Defined differently. Don't argue with me."`,
    `"I'm not done," she says quietly, like a timer still running.`,
  ]},
  { when: { studentId: 0, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"All of it," she breathes. "Every pound. I wanted every single one of these."`,
    `"More," she says. Flat, certain, hungry.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 0, addictionLevelMin: 2 }, weight: W, text: [
    `"I need the next session," she says, voice tight. "Don't make me wait. I don't lose."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 0, inWithdrawal: true }, weight: W, text: [
    `"Something's wrong," she says, jaw set. "Get me back in. Right now. I'm not finished."`,
  ]},

  // ── 1 · Madeline — bookworm: academic self-documentation ──────
  { when: { studentId: 1, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Interesting," she murmurs, fingers pressed to her waist. "Faster than projected. Logged."`,
    `"This exceeds my model," she says. "Significantly. I'll need to revise the framework."`,
  ]},
  { when: { studentId: 1, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Hypothesis confirmed again." She adjusts her glasses. "The gain is cumulative and accelerating."`,
    `"Data point," she says, patting her belly. "I'm still collecting."`,
  ]},
  { when: { studentId: 1, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"The experiment continues." She sounds pleased. "I intend to continue it. Indefinitely."`,
    `"More data," she murmurs, hands on her growing middle. "The sample size is excellent."`,
  ]},
  { when: { studentId: 1, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I need a new framework," she says quietly. "None of my models prepared me for this."`,
    `"Outside every projection I wrote," she whispers.`,
  ]},
  { when: { studentId: 1, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"I am the result," she says, with precision. "No longer the researcher. I am the result."`,
    `"Continuing," she says, voice steady. "Recording."`,
  ]},
  { when: { studentId: 1, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Publishable," she breathes, hands spread on her vast belly. "All of it."`,
    `"Conclusive," she murmurs.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 1, addictionLevelMin: 2 }, weight: W, text: [
    `"The craving is itself a data point," she notes. "I have been tracking it. It's consistent."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 1, inWithdrawal: true }, weight: W, text: [
    `"Withdrawal symptomology consistent with dependency curve," she says. "I need another session."`,
  ]},

  // ── 2 · Kylie — influencer: everything is content ─────────────
  { when: { studentId: 2, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Did that just— I felt that." She looks at herself. "Do not film me right now."`,
    `"The camera would go wild for this," she says. Then catches herself. "Not the point."`,
  ]},
  { when: { studentId: 2, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Body-positive content," she says, half-dreaming. "This is the content. Right here."`,
    `"I'm real-time data," she says. "My audience would absolutely obsess over this."`,
  ]},
  { when: { studentId: 2, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"This is the brand," she says. "I decided. Officially." She sounds entirely certain.`,
    `"Watch me grow," she says, to an invisible lens.`,
  ]},
  { when: { studentId: 2, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I can't hide this in a grid anymore," she says softly. "I used to edit everything out."`,
    `"They can see all of it now," she says quietly. Still processing.`,
  ]},
  { when: { studentId: 2, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"No filter," she says. "Finally. This is me and I am this and I am not stopping."`,
    `"I'm the algorithm now," she says. Satisfied.`,
  ]},
  { when: { studentId: 2, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"They want this," she murmurs, hands on her belly. "They just didn't know it yet."`,
    `"Perfect," she breathes, already composing the caption.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 2, addictionLevelMin: 2 }, weight: W, text: [
    `"I need this like I need the feed," she says. "And the feed is everything."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 2, inWithdrawal: true }, weight: W, text: [
    `"I'm not feeling it today," she says, anxious. "Book me back in. I need the content."`,
  ]},

  // ── 3 · Serena — athlete: discipline redirected ───────────────
  { when: { studentId: 3, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"New load," she says, not quite complaining. "Body's adapting. It always does."`,
    `"Can't run like I used to." She says it flat. "Something else is filling that space."`,
  ]},
  { when: { studentId: 3, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Personal best," she says, like a split time. "New event. Same discipline."`,
    `"Redirected," she says, rolling her shoulders. "Same drive. Different arena."`,
  ]},
  { when: { studentId: 3, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Still climbing," she grins — feral, pleased. "Different scoreboard, same hunger."`,
    `"Not losing," she says. "Winning differently. I like this better."`,
  ]},
  { when: { studentId: 3, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I miss the track," she admits. "I don't miss being small."`,
  ]},
  { when: { studentId: 3, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"New event," she says, almost smiling. "No weight class. I like that rule."`,
    `"Still training," she says, and she means every word.`,
  ]},
  { when: { studentId: 3, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Record holder," she says, hands on her heavy belly.`,
    `"Champion," she murmurs, satisfied with the title.`,
  ]},

  // ── 4 · Fiona — artsy: the body as composition ────────────────
  { when: { studentId: 4, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"The line has changed," she murmurs, studying herself. "Interesting new composition."`,
    `"I'm becoming something," she says. "It's beautiful. I didn't expect to think that."`,
  ]},
  { when: { studentId: 4, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"I've been drawing this body for weeks," she says. "Now I'm living inside the sketch."`,
    `"The painting is becoming me," she says, softly.`,
  ]},
  { when: { studentId: 4, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"More canvas," she says. "I have so much more to work with now."`,
    `"Masterpiece in progress," she whispers. "Don't rush the work."`,
  ]},
  { when: { studentId: 4, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I've outgrown every frame I drew for myself," she says reverently. "Good."`,
    `"Too big for the sketch now," she murmurs.`,
  ]},
  { when: { studentId: 4, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"I live in the work now," she says. "No distance left between me and it."`,
    `"Still composing," she murmurs.`,
  ]},
  { when: { studentId: 4, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Exhibit," she murmurs. "Open indefinitely."`,
    `"Perfect," she breathes, like a gallery opening.`,
  ]},

  // ── 5 · Destiny — gamer: dry patch-notes idiom ────────────────
  { when: { studentId: 5, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Weight stat updated automatically. Thanks, body." She doesn't look up.`,
    `"Chair's worse now," she mutters. "New weight stat. Unanticipated."`,
  ]},
  { when: { studentId: 5, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"New high score," she says without looking up. "Grinding the build. Don't nerf me."`,
    `"Tank mode, full activation." She sounds pleased. "Zero regrets."`,
  ]},
  { when: { studentId: 5, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Patch notes: mass increased, no cap in sight." She pats her belly. "Running this build."`,
    `"Maxed softness stat," she says, surveying herself. "No complaints."`,
  ]},
  { when: { studentId: 5, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"Need a doorframe mod," she mutters. "And a new rig. And a wider chair."`,
    `"Heavy tier unlocked," she says. "Didn't know there was a heavy tier."`,
  ]},
  { when: { studentId: 5, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Boss-tier mass," she says, looking down. "Finally unlocked."`,
    `"DLC: no boundaries," she says, nodding. "Installing."`,
  ]},
  { when: { studentId: 5, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Endgame build," she murmurs, both hands on her belly. "Final form confirmed."`,
    `"GG," she says, smiling.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 5, addictionLevelMin: 2 }, weight: W, text: [
    `"Dependency mechanic active," she says flatly. "Buffs significant. Running the build anyway."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 5, inWithdrawal: true }, weight: W, text: [
    `"Low on supply. Debuff active." She grips her phone. "Need a top-up. Not a drill."`,
  ]},

  // ── 6 · Tiffany — sorority: more is more, babe ────────────────
  { when: { studentId: 6, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"That was— okay. A lot." She fans herself. "Brunch culture strikes again."`,
    `"These jeans were a mistake," she sighs. "A completely delicious mistake."`,
  ]},
  { when: { studentId: 6, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Up again!" She does a little twirl. "The girls are literally going to lose it."`,
    `"The chapter is obsessed with me right now," she says, glowing. "Same, honestly."`,
  ]},
  { when: { studentId: 6, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"More is more, babe," she says, beaming, hands on her hips.`,
    `"Best version of me," she announces. "Objectively. Scientifically."`,
  ]},
  { when: { studentId: 6, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"The house might need a structural situation," she says. "I'm not leaving, though."`,
  ]},
  { when: { studentId: 6, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Queen energy," she says, arranging herself. "They bring me food now. It's giving."`,
    `"Iconic," she says, and fully believes it.`,
  ]},
  { when: { studentId: 6, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"This is the final form," she says, radiant. "I love it so much."`,
    `"Perfect," she breathes, and she is not being ironic.`,
  ]},

  // ── 7 · Priya — overachiever: KPIs and frameworks ─────────────
  { when: { studentId: 7, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Variance outside expected parameters," she says crisply. "I will optimize."`,
    `"Project scope has expanded again," she notes, already recalculating.`,
  ]},
  { when: { studentId: 7, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Trending upward," she says, tapping her planner. "Acceptable trajectory."`,
    `"New KPI: pounds per session." She makes a note. "Exceeding projections."`,
  ]},
  { when: { studentId: 7, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Goal: continuous improvement." She smooths her jacket. "Status: achieved."`,
    `"Maximum output," she says, patting her belly with executive calm.`,
  ]},
  { when: { studentId: 7, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"My projections did not survive contact with my appetite," she admits. "New framework needed."`,
  ]},
  { when: { studentId: 7, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Overperformed," she says, filing it neatly under Success Metrics.`,
    `"Benchmark set," she nods.`,
  ]},
  { when: { studentId: 7, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Exceptional growth," she murmurs, reviewing the quarter.`,
    `"Optimal," she breathes.`,
  ]},

  // ── 8 · Maya — quiet: few words, all load-bearing ─────────────
  { when: { studentId: 8, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"…Oh," she says, softly. That's all.`,
    `"I felt that," she whispers. A long pause. Nothing more.`,
  ]},
  { when: { studentId: 8, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"I feel it," she says quietly. "Before I see it. Still me."`,
    `"More of me," she says, just that.`,
  ]},
  { when: { studentId: 8, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"More," she says, meeting your eyes. She means it entirely.`,
    `"Thank you," she whispers, with a small and real smile.`,
  ]},
  { when: { studentId: 8, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I can't pretend anymore," she says. Honest. Not afraid.`,
  ]},
  { when: { studentId: 8, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"I stopped hiding," she says. "It's warm in here."`,
    `"Staying," she says.`,
  ]},
  { when: { studentId: 8, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Here," she murmurs. "All of it. All of me."`,
    `"Home," she breathes, and the word is enough.`,
  ]},

  // ── 9 · Chloe — transfer: dry Dublin field research ───────────
  { when: { studentId: 9, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"American physics," she says. "Hit different. I am conducting field research. Badly."`,
    `"My mam is going to have an absolute fit," she says, laughing dry.`,
  ]},
  { when: { studentId: 9, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Grand," she says, leaning back. "The exchange program has unlimited refills. Grand."`,
    `"Fully adapted to local customs," she says, patting her belly. "Very thoroughly."`,
  ]},
  { when: { studentId: 9, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Best year abroad ever," she says. "Going home enormous. Absolute legend."`,
    `"No regrets," she says, surveying herself with bemused, genuine pride.`,
  ]},
  { when: { studentId: 9, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"Bloody hell," she whispers. "I need new jeans. And maybe a new passport photo."`,
    `"That's a lot of field research," she says.`,
  ]},
  { when: { studentId: 9, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"When in Rome," she shrugs. "Or Dublin. Or anywhere. Eat everything."`,
    `"Fully assimilated," she says, warm and certain.`,
  ]},
  { when: { studentId: 9, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Tell my mam I went fully native," she laughs, hands on her heavy belly.`,
    `"Cheers," she breathes, smiling.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 9, addictionLevelMin: 2 }, weight: W, text: [
    `"It's a habit now," she says. "Like tea. Except I need it more than tea, and that's saying something."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 9, inWithdrawal: true }, weight: W, text: [
    `"Off the roster," she says, jaw set. "Book me back in. I am not grand right now."`,
  ]},

  // ── 10 · Reneé — culinary: the body as kitchen ────────────────
  { when: { studentId: 10, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Quality ingredients," she inhales. "I'm my own best work right now."`,
    `"Too much tasting," she murmurs. Then: "No. Exactly the right amount."`,
  ]},
  { when: { studentId: 10, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Filling the pantry," she says, pressing her waist. "The body is a kitchen."`,
    `"Every recipe needs body," she says. "Including this one."`,
  ]},
  { when: { studentId: 10, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Second helping," she murmurs, radiant. "Of everything. Always."`,
    `"Perfect reduction," she smiles. "Everything concentrating perfectly."`,
  ]},
  { when: { studentId: 10, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"The bench broke," she says. "I bought a sturdier one." She does not sound sorry.`,
  ]},
  { when: { studentId: 10, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Main course," she says warmly, hands on her belly. "Fully plated."`,
    `"Fully baked," she murmurs.`,
  ]},
  { when: { studentId: 10, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Dessert as well," she murmurs. "I always save room for dessert."`,
    `"Perfection," she breathes, like tasting the last note.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 10, addictionLevelMin: 2 }, weight: W, text: [
    `"I crave the next session the way I crave the next course," she says. "Constantly."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 10, inWithdrawal: true }, weight: W, text: [
    `"I'm off my mise en place," she says, unhappy. "I need the next sitting."`,
  ]},

  // ── 11 · Kaylee — nursing: clinical warmth, turned inward ─────
  { when: { studentId: 11, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"You should be— I mean." She catches herself. "This is fine. Bodies change."`,
    `"Body acceptance," she murmurs, trying it on herself. "Feels better than I expected."`,
  ]},
  { when: { studentId: 11, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"I've been taking my own advice," she says. "Rest. Eat. Accept. It's working."`,
    `"Self-care," she murmurs, settling deeper. "Aggressive self-care."`,
  ]},
  { when: { studentId: 11, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Healthy growth," she beams, meaning something her textbooks never covered.`,
    `"Come sit," she says, glowing warmly. "There's room."`,
  ]},
  { when: { studentId: 11, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I tell my patients to accept their bodies," she says quietly. "I'm still learning."`,
  ]},
  { when: { studentId: 11, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Fully nourished," she says, both hands on her belly. "At last."`,
    `"Complete care," she murmurs.`,
  ]},
  { when: { studentId: 11, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Plenty for everyone," she murmurs, smiling — warm, open, certain.`,
    `"Whole," she breathes.`,
  ]},

  // ── 12 · Nadia — psych: names the dynamic out loud ────────────
  { when: { studentId: 12, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"You looked at me before you looked at your notes," she observes. "Telling."`,
    `"Denial as a coping mechanism is failing me," she says. "Interesting."`,
  ]},
  { when: { studentId: 12, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"The correlation between your sessions and my mass remains significant," she notes.`,
    `"Past the resistance phase," she says, leaning back. "The data is compelling."`,
  ]},
  { when: { studentId: 12, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"The subject is cooperating fully," she murmurs, meaning herself.`,
    `"Integrated," she says, hands on her softening middle.`,
  ]},
  { when: { studentId: 12, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I should probably seek consultation," she admits. "About this. About you."`,
  ]},
  { when: { studentId: 12, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Countertransference," she says, patting her belly. "Noted. Accepted."`,
    `"Embodied," she says. One word, final.`,
  ]},
  { when: { studentId: 12, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"The evidence is overwhelming," she says, watching you watch her.`,
    `"Understood," she breathes.`,
  ]},

  // ── 13 · Daisy — eced: Southern feeding warmth ────────────────
  { when: { studentId: 13, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Lord," she breathes. "Bless it. I am well-fed."`,
    `"Honey, someone's got to model good eating habits," she says. "Might as well be me."`,
  ]},
  { when: { studentId: 13, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Comfort food works both ways, sugar," she says, settling in. "This is proof."`,
    `"Second helpings are a kindness," she says. "To yourself especially."`,
  ]},
  { when: { studentId: 13, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Growing sweet," she says, hands on her soft curves. "Every bit of it."`,
    `"Plenty to go around," she says, warm and glowing.`,
  ]},
  { when: { studentId: 13, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"The little ones think I'm expecting," she laughs softly. "I just tell them: well-fed."`,
  ]},
  { when: { studentId: 13, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Well-fed," she says, both hands on her belly. "That was always the goal."`,
    `"Full house," she murmurs, warm.`,
  ]},
  { when: { studentId: 13, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Come eat," she murmurs, a kitchen and a comfort unto herself.`,
    `"Blessed," she breathes, absolutely.`,
  ]},
  // Double depth — addiction gate
  { when: { studentId: 13, addictionLevelMin: 2 }, weight: W, text: [
    `"Honey, I need something and I need it soon," she says. "You know what I mean."`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 13, inWithdrawal: true }, weight: W, text: [
    `"Sugar, I am not doing well right now," she says, quietly strained. "Fix it, please."`,
  ]},

  // ── 14 · Mary Jane — farm girl: harvest imagery ───────────────
  { when: { studentId: 14, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Back home we'd call this good eating," she says. "City food just agrees with me."`,
    `"These jeans ain't gonna make it to Christmas at this rate," she laughs.`,
  ]},
  { when: { studentId: 14, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Field's been good to me," she says, slapping her hip. "Mama'd call it healthy."`,
    `"Grand harvest," she says, content.`,
  ]},
  { when: { studentId: 14, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Growing good," she says, warm. "Every season better than the last."`,
    `"More harvest," she murmurs, abundance written all over her.`,
  ]},
  { when: { studentId: 14, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"Need a wider truck seat," she says. "And a new porch swing to hold me."`,
  ]},
  { when: { studentId: 14, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Bounty," she says simply, patting her heavy belly.`,
    `"Land don't lie," she says, steady.`,
  ]},
  { when: { studentId: 14, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Plenty," she murmurs, smiling like a barn at harvest.`,
    `"Home," she breathes, and she means herself.`,
  ]},

  // ── 15 · Lilith — predator: sparse, unsettling, amused ────────
  // (Her voice ignores corruption — she was never resisting anything.)
  { when: { studentId: 15, endStageMax: 1 }, weight: W, text: [
    `"So little," she murmurs, and the number sounds like an insult she intends to correct.`,
    `"A starting point," she says. "Nothing more."`,
  ]},
  { when: { studentId: 15, endStageMin: 2, endStageMax: 5 }, weight: W, text: [
    `"I feel it accumulating," she says, and sounds pleased by that.`,
    `"Closer," she says, with the patience of something that does not hurry.`,
  ]},
  { when: { studentId: 15, endStageMin: 6 }, weight: W, text: [
    `"Getting there," she murmurs, eyes on you, nowhere else.`,
    `"Soon," she says, and she is not speaking about anything you can name.`,
  ]},
  // Double depth — obsession gate
  { when: { studentId: 15, obsessionTierMin: 2 }, weight: W, text: [
    `"I think about this all the time," she says. Conversational.`,
  ]},
  // Double depth — withdrawal gate
  { when: { studentId: 15, inWithdrawal: true }, weight: W, text: [
    `"Hungry," she says. One word. She is not talking about food.`,
  ]},

  // ── 16 · Sophia — pharmacy grad: anxious precision ────────────
  { when: { studentId: 16, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"Outside parameters," she says. Then checks her parameters. "All of my parameters."`,
    `"I double-checked the intake math." A pause. "The math is not wrong."`,
  ]},
  { when: { studentId: 16, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"The formulation is working," she says, smoothing her coat. "On me. Noted."`,
    `"I should log this." She doesn't reach for the logbook. "I will log it."`,
  ]},
  { when: { studentId: 16, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Self-trial results: significant," she says. "I am not closing this trial."`,
    `"Dosage: increasing," she says, calm, certain. "Results: optimal."`,
  ]},
  { when: { studentId: 16, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"I wrote these safety margins," she says quietly. "I knew exactly where they were."`,
  ]},
  { when: { studentId: 16, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"Side effects: substantial," she says, looking down at herself. "Efficacy: undeniable."`,
    `"Still running the trial," she says. "Still recording."`,
  ]},
  { when: { studentId: 16, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"The compound works," she says, vast and settled. "I am the data. Look at the data."`,
    `"Effective," she breathes.`,
  ]},

  // ── 17 · Indiana Bones — explorer: roguish bravado ────────────
  { when: { studentId: 17, corruption: [0], endStageMax: 5 }, weight: W, text: [
    `"The belt's been arguing with me all week," she says. "Now I know why."`,
    `"That number belongs in a museum," she says. "Behind glass, where I can admire it."`,
  ]},
  { when: { studentId: 17, corruption: [1], endStageMax: 5 }, weight: W, text: [
    `"Every expedition adds supplies," she says. "I'm just carrying mine onboard now."`,
    `"New terrain," she says, unbothered. "I'll map it as I go."`,
  ]},
  { when: { studentId: 17, corruption: [2], endStageMax: 5 }, weight: W, text: [
    `"Treasure," she grins, patting her middle. "Some of us hoard it internally."`,
    `"The map keeps growing," she says, pleased by the problem.`,
  ]},
  { when: { studentId: 17, corruption: [0], endStageMin: 6 }, weight: W, text: [
    `"The dig site has expanded," she says, looking down. "Significantly. Send a bigger crew."`,
  ]},
  { when: { studentId: 17, corruption: [1], endStageMin: 6 }, weight: W, text: [
    `"I used to fit through tomb shafts," she says. "Now I am the exhibit."`,
    `"I am the monument," she says, not unhappy.`,
  ]},
  { when: { studentId: 17, corruption: [2], endStageMin: 6 }, weight: W, text: [
    `"Fortune and glory," she murmurs, hands spread on her belly. "All of it stored on-site."`,
    `"Discovery," she breathes.`,
  ]},
]);

// ── grow.crossingDialogue ──────────────────────────────────────
// Shape: DIALOGUE BEAT — standalone sentence(s) appended after
// grow.crossing (only when stagesJumped >= 1). Per-girl variants
// for the 8 double-depth girls across three endStage bands:
//   3-5 (Chubby–Heavy), 6-8 (Fat–Enormous), 9-11 (Colossal–Leviathan).
// Shared band supplements and a wildcard add-on (brings pool
// wildcard count to ≥3) cover the remaining ten girls.
registerModuleVariants("grow.crossingDialogue", [

  // ── Brittany (0) ───────────────────────────────────────────────
  { when: { studentId: 0, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"New weight class," she says, like a division change. "I'll own this one."`,
    `"Noted," she says. "I'm going higher."`,
  ]},
  { when: { studentId: 0, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Fat now." She says it without flinching. "Still first place."`,
    `"New territory," she says. "I'm keeping the record."`,
  ]},
  { when: { studentId: 0, endStageMin: 9 }, weight: W, text: [
    `"Enormous." A beat. "Still winning."`,
  ]},

  // ── Madeline (1) ───────────────────────────────────────────────
  { when: { studentId: 1, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"New stage documented," she says. "The progression curve is holding."`,
    `"Chubby. Plump. Heavy." She says each word like a data category.`,
  ]},
  { when: { studentId: 1, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Fat," she says. "The data is unambiguous. I have updated my models."`,
    `"Crossing confirmed," she says, as if submitting a field report.`,
  ]},
  { when: { studentId: 1, endStageMin: 9 }, weight: W, text: [
    `"Unprecedented," she murmurs, recording it without a tremor.`,
  ]},

  // ── Kylie (2) ──────────────────────────────────────────────────
  { when: { studentId: 2, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"New chapter," she says. "New body. It's already trending."`,
    `"This is the arc," she says, touching her side.`,
  ]},
  { when: { studentId: 2, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Big content energy," she says. "No apologies. No filter."`,
    `"The engagement on this is going to be wild," she says.`,
  ]},
  { when: { studentId: 2, endStageMin: 9 }, weight: W, text: [
    `"Iconic," she breathes. "This is the whole arc."`,
  ]},

  // ── Destiny (5) ────────────────────────────────────────────────
  { when: { studentId: 5, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"New tier unlocked," she says. "Mid-game. Expected."`,
    `"Weight class updated," she says, indifferent. "Running the build."`,
  ]},
  { when: { studentId: 5, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Fat boss tier," she says. "Committing to the build."`,
    `"Heavy class unlocked," she notes. "Patch notes updated."`,
  ]},
  { when: { studentId: 5, endStageMin: 9 }, weight: W, text: [
    `"Endgame," she says, looking down. "Called it."`,
  ]},

  // ── Chloe (9) ──────────────────────────────────────────────────
  { when: { studentId: 9, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"Grand," she says. "My mam would have words for this."`,
    `"Chubby," she says, with dry Dublin acceptance. "I suit it."`,
  ]},
  { when: { studentId: 9, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Fat is not an insult where I'm from," she says. "It means well-fed."`,
    `"I'm after getting big," she says, amused.`,
  ]},
  { when: { studentId: 9, endStageMin: 9 }, weight: W, text: [
    `"Legendary," she says. "Entirely and completely legendary."`,
  ]},

  // ── Reneé (10) ─────────────────────────────────────────────────
  { when: { studentId: 10, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"New recipe," she says. "Richer than the last."`,
    `"The next course," she says, satisfied.`,
  ]},
  { when: { studentId: 10, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"The main course," she says. "I have arrived."`,
    `"Full portions," she murmurs, warmly.`,
  ]},
  { when: { studentId: 10, endStageMin: 9 }, weight: W, text: [
    `"Feast," she breathes. "Banquet scale. About right."`,
    `"The table's set," she murmurs. "I'm what's on it."`,
  ]},

  // ── Daisy (13) ─────────────────────────────────────────────────
  { when: { studentId: 13, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"Fed," she says, satisfied. "Good and properly fed."`,
    `"Growing sweet," she murmurs.`,
  ]},
  { when: { studentId: 13, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Well-nourished," she says. "Mama would be so proud."`,
    `"Plentiful," she murmurs, hands on her belly.`,
  ]},
  { when: { studentId: 13, endStageMin: 9 }, weight: W, text: [
    `"Blessed," she breathes. "Lord, what a bounty."`,
  ]},

  // ── Lilith (15) ────────────────────────────────────────────────
  { when: { studentId: 15, endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"Growing," she murmurs. She sounds as if she has been waiting for this.`,
    `"Closer," she says. Flat. Satisfied.`,
  ]},
  { when: { studentId: 15, endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"Almost," she says. Her patience is intact.`,
    `"Close now," she says, looking at you.`,
  ]},
  { when: { studentId: 15, endStageMin: 9 }, weight: W, text: [
    `"There," she breathes, finally, with the satisfaction of a siege ended.`,
  ]},

  // ── Shared band supplements (no studentId) ────────────────────
  // These supplement all girls; persona variants dominate when they match.
  { when: { endStageMin: 3, endStageMax: 5 }, weight: W, text: [
    `"Getting there," she says.`,
    `"So that's where I am now," she says, and means it.`,
  ]},
  { when: { endStageMin: 6, endStageMax: 8 }, weight: W, text: [
    `"This is real," she says.`,
    `"No going back," she says.`,
  ]},
  { when: { endStageMin: 9 }, weight: W, text: [
    `"Vast now," she says.`,
    `"Still here," she says.`,
  ]},

  // Wildcard add-on: brings combined wildcard pool to ≥3 texts.
  { when: {}, text: [
    `"Here now," she says.`,
    `"Yes," she says quietly.`,
  ]},
]);
