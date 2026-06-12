// ═══════════════════════════════════════════════════════════════
// TALK COMPLIMENT PERSONAS — per-girl voice for comp.line0/1/2.
// Extends the shared pools in ./talkCompliment.js via registerModuleVariants
// (adds variants, never replaces). Must load AFTER talkCompliment.js
// registers the base comp.* pools. See ../AUTHORING.md §3–§4.
// Roster: ids 0–17 (Brittany … Indiana Bones).
// ═══════════════════════════════════════════════════════════════
import { registerModuleVariants } from '../engine.js';
import './talkCompliment.js';

const W = 4; // persona weight — dominant but not exclusive

// Shape: DIALOGUE BEAT (see comp.line0/1/2 in talkCompliment.js).
registerModuleVariants("comp.line0", [
  // ── 0 · Brittany — cheerleader ───────────────────────────────
  { when: { studentId: 0, corruption: [0] }, weight: W, text: [
    `"You— you noticed? Like, actually noticed? Nobody on the squad says it like they mean it."`,
    `"Don't say stuff like that to a cheerleader and expect me to play it cool. I'm not playing it cool."`,
    `"I— of course you noticed. It's a lot to notice. I just didn't think you'd… mean it."`,
  ]},
  // ── 1 · Madeline — bookworm ──────────────────────────────────
  { when: { studentId: 1, corruption: [0] }, weight: W, text: [
    `"That's… outside my projected parameters for how this conversation would go." {subject.name} adjusts her glasses. "You noticed. Specifically."`,
    `"Nobody's ever said it like they meant it before," she murmurs. "The data on compliments is usually… performative."`,
    `"You can't just— I mean. Of course you noticed. I have notes on the variance. I didn't expect you to read them aloud."`,
  ]},
  // ── 2 · Kylie — influencer ───────────────────────────────────
  { when: { studentId: 2, corruption: [0] }, weight: W, text: [
    `"Wait— you noticed? Like, for real? Not 'you look fine' comment-section noticed?"`,
    `"People say it for engagement. Nobody says it like they mean it." {subject.name} laughs, too bright. "Stop. You're making me blush on camera I'm not even holding."`,
    `"You can't just say that," she mutters. "That's… that's the kind of thing you save for a vulnerable post. Not… here."`,
  ]},
  // ── 3 · Serena — athlete ─────────────────────────────────────
  { when: { studentId: 3, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} prods her thigh like it's a new training load. "Huh. Coach never says it like that."`,
    `"People aren't supposed to— compliment the parts you're trying to outrun." She stops. Swallows. "Nobody ever meant it before."`,
    `"You can't just say that," she mutters, arms crossing — then uncrossing. "I noticed you noticing. That's… worse. Better. Something."`,
  ]},
  // ── 4 · Fiona — artsy ────────────────────────────────────────
  { when: { studentId: 4, corruption: [0] }, weight: W, text: [
    `"You… see it?" {subject.name} says, surprised at herself. "The line of the body. Changing. You noticed."`,
    `"Nobody's ever said it like they meant it before," she whispers. "I draw this. I didn't know someone else would… look."`,
    `"You can't just say that," she murmurs, color rising. "It's beautiful. I didn't expect to hear that from— from you."`,
  ]},
  // ── 5 · Destiny — gamer ──────────────────────────────────────
  { when: { studentId: 5, corruption: [0] }, weight: W, text: [
    `"…You noticed?" {subject.name} doesn't look up from her phone. "Weird buff. Didn't know that was in the patch notes."`,
    `"Nobody says it like they mean it. Usually it's a backhanded emote." She finally glances up. "You mean it. Bug report: flustered."`,
    `"You can't just— okay, you can. Don't. I mean. Of course you noticed. The hitbox expanded."`,
  ]},
  // ── 6 · Tiffany — sorority ───────────────────────────────────
  { when: { studentId: 6, corruption: [0] }, weight: W, text: [
    `"Oh my god— you noticed? Like, actually noticed? The girls say 'cute' and keep walking."`,
    `"You can't just say that," {subject.name} breathes, hand at her waist. "Nobody at chapter says it like they mean it. Ever."`,
    `"I— you noticed? These were literally my good jeans. Were." She laughs, unsteady. "You weren't supposed to mean that."`,
  ]},
  // ── 7 · Priya — overachiever ─────────────────────────────────
  { when: { studentId: 7, corruption: [0] }, weight: W, text: [
    `"That's… outside expected feedback parameters." {subject.name} recalculates. "You noticed. Specifically. That's not in my framework."`,
    `"Nobody's ever said it like they meant it before," she admits, quieter. "Performance reviews don't cover this."`,
    `"You can't just— I mean. Of course you noticed. Project scope expanded. I didn't prepare a response."`,
  ]},
  // ── 8 · Maya — quiet ─────────────────────────────────────────
  { when: { studentId: 8, corruption: [0] }, weight: W, text: [
    `"…You noticed?" {subject.name} says, after a long silence. One word would have been enough. She gives you two.`,
    `"Nobody's ever said it like they meant it," she whispers. "I didn't think… anyone would."`,
    `"You can't just say that." A beat. "I mean. You did. I noticed you noticing. That's… a lot."`,
  ]},
  // ── 9 · Chloe — transfer ─────────────────────────────────────
  { when: { studentId: 9, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} laughs dryly. "American portions are one thing. American compliments hit different."`,
    `"Nobody says it like they mean it back home. My mam would have words if she heard you."`,
    `"You can't just— grand. You did. Of course you noticed. I'm conducting field research on my own body and you're… participating."`,
  ]},
  // ── 10 · Reneé — culinary ────────────────────────────────────
  { when: { studentId: 10, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} inhales, chef-sharp. "Quality ingredients. I'm my own best critic. You weren't on the panel."`,
    `"Nobody's ever said it like they meant it before," she murmurs. "Tasting notes, yes. This is… different."`,
    `"You can't just say that," she breathes. "I've been filling the pantry. I didn't know someone else would call it… good."`,
  ]},
  // ── 11 · Kaylee — nursing ────────────────────────────────────
  { when: { studentId: 11, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} blinks. "I tell my patients to be kind to their bodies. I didn't expect— you— to mean it."`,
    `"Nobody's ever said it like they meant it before," she says, careful. "Clinical charts don't have a box for that."`,
    `"You can't just say that," she murmurs, hand hovering at her middle. "I'm supposed to be the one giving reassurance. Not… receiving it."`,
  ]},
  // ── 12 · Nadia — psych ───────────────────────────────────────
  { when: { studentId: 12, corruption: [0] }, weight: W, text: [
    `"You looked at me before you finished the sentence," {subject.name} observes. "You noticed. Interesting."`,
    `"Nobody's ever said it like they meant it before," she says, watching your face. "Most people perform concern. You're not performing."`,
    `"You can't just say that," she murmurs. "I've been studying denial. In myself. You're making that… difficult."`,
  ]},
  // ── 13 · Daisy — eced ────────────────────────────────────────
  { when: { studentId: 13, corruption: [0] }, weight: W, text: [
    `"Honey, you noticed?" {subject.name} presses a hand to her chest. "Lord, nobody says it like they mean it. Bless it."`,
    `"You can't just say that to a girl," she murmurs, flustered. "People say 'you look fine' and keep walking. You didn't."`,
    `"I— you noticed? Sugar, that's… a lot to notice. I didn't think anyone would mean it."`,
  ]},
  // ── 14 · Mary Jane — farm girl ───────────────────────────────
  { when: { studentId: 14, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} thumbs a strained seam. "Back home they'd say 'healthy' and change the subject. You… didn't."`,
    `"Nobody's ever said it like they meant it before," she admits, color high. "City folk usually just stare."`,
    `"You can't just say that," she laughs, unsteady. "These ain't gonna make it to Thanksgiving at this rate. You weren't supposed to… mean it."`,
  ]},
  // ── 15 · Lilith — predator ───────────────────────────────────
  { when: { studentId: 15, corruption: [0] }, weight: W, text: [
    `"You noticed," {subject.name} repeats, soft. Not a question. "How… attentive."`,
    `"Nobody says it like they mean it," she murmurs. "They lie. You didn't. Yet."`,
    `"You can't just say that." A pause. "Keep talking. I want to see what you do when I believe you."`,
  ]},
  // ── 16 · Sophia — pharmacy grad ──────────────────────────────
  { when: { studentId: 16, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} double-checks nothing. "That's— the variance is documented. I didn't expect verbal confirmation."`,
    `"Nobody's ever said it like they meant it before," she whispers. "Peer review doesn't cover compliments."`,
    `"You can't just— I mean. Of course you noticed. It's within tolerances. Mostly. You weren't supposed to say it out loud."`,
  ]},
  // ── 17 · Indiana Bones — explorer ────────────────────────────
  { when: { studentId: 17, corruption: [0] }, weight: W, text: [
    `"You noticed?" {subject.name} grins, uneasy. "That number belongs in a museum. Preferably behind glass. You looked anyway."`,
    `"Nobody's ever said it like they meant it before," she admits. "Expedition sponsors usually just want the artifact. Not the… cartographer."`,
    `"You can't just say that," she mutters. "The whip belt's been arguing with me all week. You noticed before I did. Rude. Kind. Both."`,
  ]},
]);

registerModuleVariants("comp.line1", [
  // ── 0 · Brittany ─────────────────────────────────────────────
  { when: { studentId: 0, corruption: [1] }, weight: W, text: [
    `{subject.name} does a slow half-turn. "It's coming along. I've been eating like we're in postseason. Say it again."`,
    `"Keep talking," she says, settling in. "I'm keeping score. Don't look at me like you're winning. I'm winning."`,
    `"Say it again. Louder. I want to hear you mean it this time. All of it."`,
  ]},
  // ── 1 · Madeline ─────────────────────────────────────────────
  { when: { studentId: 1, corruption: [1] }, weight: W, text: [
    `{subject.name} turns, analytical. "The data is unambiguous. I am getting softer. On purpose. Say it again — for the record."`,
    `"Keep talking," she murmurs, practicing something new. "I'm conducting this research on myself. Your feedback is… significant."`,
    `"Say it again. Slower. I have notes on how it feels. I want your hypothesis too."`,
  ]},
  // ── 2 · Kylie ────────────────────────────────────────────────
  { when: { studentId: 2, corruption: [1] }, weight: W, text: [
    `{subject.name} angles for the light that isn't there. "No filter. Just me. Really soft, really full. Say it again — for the feed I'm not posting yet."`,
    `"Keep talking," she says, mock-modest failing. "Engagement on body-positive posts is insane. Lean into it. Literally."`,
    `"Say it again. I used to edit this out. All of it. Don't stop now."`,
  ]},
  // ── 3 · Serena ───────────────────────────────────────────────
  { when: { studentId: 3, corruption: [1] }, weight: W, text: [
    `{subject.name} rolls her shoulders, half-turn. "New sport. Same discipline. Personal best on the curve. Say it again."`,
    `"Keep talking," she says, athlete-sharp. "I've redirected. Same drive. Different arena. I want to hear you mean it."`,
    `"Say it again. Coach used to say eat to perform. I perform plenty now. All of it."`,
  ]},
  // ── 4 · Fiona ────────────────────────────────────────────────
  { when: { studentId: 4, corruption: [1] }, weight: W, text: [
    `{subject.name} turns slowly, reverent. "I've been painting this body for weeks. Now I am the painting. Say it again."`,
    `"Keep talking," she murmurs. "More canvas. More to work with. I want to hear how you see it."`,
    `"Say it again. Slower. I've stopped sketching and started living in the work."`,
  ]},
  // ── 5 · Destiny ────────────────────────────────────────────────
  { when: { studentId: 5, corruption: [1] }, weight: W, text: [
    `{subject.name} half-turns, deadpan. "Tank build. Pure tank. No DPS. All presence. Say it again."`,
    `"Keep talking," she says, not looking up. "New high score. Grinding IRL weight stat. Don't nerf me."`,
    `"Say it again. Patch notes: increased mass. Running the build. I like how it sounds when you mean it."`,
  ]},
  // ── 6 · Tiffany ────────────────────────────────────────────────
  { when: { studentId: 6, corruption: [1] }, weight: W, text: [
    `{subject.name} twirls, automatic. "Up! The girls are literally asking what I'm eating. Say it again, babe."`,
    `"Keep talking," she beams. "The chapter voted. I'm the new standard. More is more."`,
    `"Say it again. Louder. Brunch is a lifestyle and I will die on that hill. With witnesses."`,
  ]},
  // ── 7 · Priya ────────────────────────────────────────────────
  { when: { studentId: 7, corruption: [1] }, weight: W, text: [
    `{subject.name} presents, executive-calm. "Trending upward. New KPI: pounds per week. Exceeding targets. Say it again."`,
    `"Keep talking," she taps her planner. "Overperformance is a habit. I want this in the quarterly review."`,
    `"Say it again. Slower. Acceptable trade. Reduced guilt. Increased… everything."`,
  ]},
  // ── 8 · Maya ─────────────────────────────────────────────────
  { when: { studentId: 8, corruption: [1] }, weight: W, text: [
    `{subject.name} turns, quiet. "I feel it before I see it. Say it again."`,
    `"Keep talking," she breathes. "I'm still me. Just… more me. I want to hear you mean it."`,
    `"Say it again. One word from you is enough. Keep going anyway."`,
  ]},
  // ── 9 · Chloe ────────────────────────────────────────────────
  { when: { studentId: 9, corruption: [1] }, weight: W, text: [
    `{subject.name} leans back, dry. "Grand. I've adapted to local customs. Very thoroughly. Say it again."`,
    `"Keep talking," she says. "Field research. American portions. Unlimited refills. Document everything."`,
    `"Say it again. Slower. When in Rome, eat everything. I'm fully assimilated."`,
  ]},
  // ── 10 · Reneé ───────────────────────────────────────────────
  { when: { studentId: 10, corruption: [1] }, weight: W, text: [
    `{subject.name} turns, chef-precise. "More to work with. The body is a kitchen. I'm filling the pantry. Say it again."`,
    `"Keep talking," she inhales. "Every recipe needs more body. Including mine. I want to taste the words."`,
    `"Say it again. Slower. Quality ingredients. I've been tasting too much. No. The right amount."`,
  ]},
  // ── 11 · Kaylee ──────────────────────────────────────────────
  { when: { studentId: 11, corruption: [1] }, weight: W, text: [
    `{subject.name} settles deeper. "I've been taking my own advice. Rest. Nutrition. Comfort. Say it again."`,
    `"Keep talking," she murmurs. "Aggressive self-care. It's working. I want to hear you mean it."`,
    `"Say it again. Slower. I tell my patients to be kind to their bodies. I'm learning to mean it for mine."`,
  ]},
  // ── 12 · Nadia ───────────────────────────────────────────────
  { when: { studentId: 12, corruption: [1] }, weight: W, text: [
    `{subject.name} half-turns, watching you watch her. "Correlation between your attention and my appetite remains significant. Say it again."`,
    `"Keep talking," she notes. "I've moved past the resistance phase. Fascinating process. Your voice helps."`,
    `"Say it again. Slower. I name the dynamic out loud. You fill it in."`,
  ]},
  // ── 13 · Daisy ───────────────────────────────────────────────
  { when: { studentId: 13, corruption: [1] }, weight: W, text: [
    `{subject.name} settles in, warm. "Sugar, comfort food works both ways. I'm living proof. Say it again, honey."`,
    `"Keep talking," she beams. "Second helpings are a kindness. To yourself. I want to hear you mean it."`,
    `"Say it again. Slower. Lord, I do love a good meal. And a good word. Both."`,
  ]},
  // ── 14 · Mary Jane ───────────────────────────────────────────
  { when: { studentId: 14, corruption: [1] }, weight: W, text: [
    `{subject.name} slaps her hip, half-turn. "Grand! Mama would be proud. Or horrified. Probably both. Say it again."`,
    `"Keep talking," she says, sun-warm. "Field's been good to me. Growing good. I want to hear you mean it."`,
    `"Say it again. Slower. These ain't gonna make it to Thanksgiving. Fine. New baseline."`,
  ]},
  // ── 15 · Lilith ──────────────────────────────────────────────
  { when: { studentId: 15, corruption: [1] }, weight: W, text: [
    `{subject.name} turns, unhurried. "I'm collecting mass the way others collect grades. Say it again."`,
    `"Keep talking," she smiles, without warmth. "Numbers are such a human obsession. Your voice is… useful."`,
    `"Say it again. Slower. Almost ready. Soon."`,
  ]},
  // ── 16 · Sophia ──────────────────────────────────────────────
  { when: { studentId: 16, corruption: [1] }, weight: W, text: [
    `{subject.name} smooths her lab coat. "The formulation is working. On me. That wasn't the protocol. Say it again."`,
    `"Keep talking," she exhales. "I should log this. I will absolutely log this. After you finish."`,
    `"Say it again. Slower. Side effects: substantial. Efficacy: undeniable. Your feedback is… noted."`,
  ]},
  // ── 17 · Indiana Bones ───────────────────────────────────────
  { when: { studentId: 17, corruption: [1] }, weight: W, text: [
    `{subject.name} maps a half-turn. "Every expedition adds supplies. I'm just carrying mine onboard now. Say it again."`,
    `"Keep talking," she grins. "New terrain. I map it as I go. Forbidden cartography of me."`,
    `"Say it again. Slower. The dig site has expanded. Send a bigger crew. Or don't. Keep talking."`,
  ]},
]);

registerModuleVariants("comp.line2", [
  // ── 0 · Brittany ─────────────────────────────────────────────
  { when: { studentId: 0, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, trophy-warm. "And there's more of me every week. You're welcome."`,
    `"Say it again. Slower. Coach would lose his mind. I don't care. This is the best shape I've ever been in."`,
    `"Again. All of it. That's what I wanted. More of me. Every week, more."`,
    `"Keep noticing. I'm still winning at it. You're welcome to watch."`,
  ]},
  // ── 1 · Madeline ─────────────────────────────────────────────
  { when: { studentId: 1, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, pleased. "Hypothesis confirmed. I am the result. You're welcome."`,
    `"Say it again. Slower. Publishable. All of it."`,
    `"Again. The experiment is a success. I would like to continue."`,
    `"Keep noticing. I am no longer in the control group. Look at the data."`,
  ]},
  // ── 2 · Kylie ────────────────────────────────────────────────
  { when: { studentId: 2, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} beams. "This is the content. This is the brand now. You're welcome."`,
    `"Say it again. Slower. No filter. No angle. Just me. Finally."`,
    `"Again. My audience is going to lose their minds. Good way. Watch me."`,
    `"Keep noticing. Perfect. Every pound. You're part of the channel now."`,
  ]},
  // ── 3 · Serena ───────────────────────────────────────────────
  { when: { studentId: 3, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} grins — feral, pleased. "Still climbing. I'm not losing. Just winning differently. You're welcome."`,
    `"Say it again. Slower. Record holder. Champion. New event. No weight class."`,
    `"Again. All of it. Personal best on the curve. Indefinite bulk phase."`,
    `"Keep noticing. I perform plenty. Look what training built."`,
  ]},
  // ── 4 · Fiona ────────────────────────────────────────────────
  { when: { studentId: 4, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} murmurs, reverent. "Masterpiece in progress. More canvas. You're welcome."`,
    `"Say it again. Slower. Exhibit open indefinitely. Don't rush it."`,
    `"Again. Perfect. The final form. Look at the composition."`,
    `"Keep noticing. I've stopped sketching and started living in the work."`,
  ]},
  // ── 5 · Destiny ────────────────────────────────────────────────
  { when: { studentId: 5, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, surveying herself. "Endgame body. Maxed out softness. Zero regrets. You're welcome."`,
    `"Say it again. Slower. Patch notes: infinite expansion. GG."`,
    `"Again. Boss-tier mass. Unlocked. Running the build."`,
    `"Keep noticing. Tank build. All presence. Next?"`,
  ]},
  // ── 6 · Tiffany ────────────────────────────────────────────────
  { when: { studentId: 6, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} radiates. "Best body ever. More is more, babe. You're welcome."`,
    `"Say it again. Slower. Icon behavior. Final answer."`,
    `"Again. Queen of the chapter. Literally. They bring me food now."`,
    `"Keep noticing. This is the look. Perfect."`,
  ]},
  // ── 7 · Priya ────────────────────────────────────────────────
  { when: { studentId: 7, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, executive-calm. "Maximum output. Continuous improvement. You're welcome."`,
    `"Say it again. Slower. Exceptional growth. Optimal."`,
    `"Again. Benchmark set. Overperformed. All quarters."`,
    `"Keep noticing. Goal: continuous improvement. Status: on track."`,
  ]},
  // ── 8 · Maya ─────────────────────────────────────────────────
  { when: { studentId: 8, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} whispers. "More. One word. I mean all of it. You're welcome."`,
    `"Say it again. Slower. Here. All of me."`,
    `"Again. Home. Staying."`,
    `"Keep noticing. Thank you. Small smile. Real."`,
  ]},
  // ── 9 · Chloe ────────────────────────────────────────────────
  { when: { studentId: 9, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} laughs, bemused pride. "Best year abroad ever. Going back to Dublin enormous. Legend. You're welcome."`,
    `"Say it again. Slower. Tell my mam I died happy."`,
    `"Again. No regrets. Fully assimilated. Cheers."`,
    `"Keep noticing. Treasure hoarded internally. The map keeps growing."`,
  ]},
  // ── 10 · Reneé ───────────────────────────────────────────────
  { when: { studentId: 10, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} smiles, warm as a walk-in oven. "Perfect reduction. Everything concentrates. You're welcome."`,
    `"Say it again. Slower. Second helping. Of everything."`,
    `"Again. Main course. Fully baked. Dessert too."`,
    `"Keep noticing. Perfection. The body is a kitchen. I'm the feast."`,
  ]},
  // ── 11 · Kaylee ──────────────────────────────────────────────
  { when: { studentId: 11, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} beams. "Healthy growth. Plenty for everyone. You're welcome."`,
    `"Say it again. Slower. Fully nourished. Complete care."`,
    `"Again. Come sit. There's room. Whole."`,
    `"Keep noticing. I practice what I preach now. Look."`,
  ]},
  // ── 12 · Nadia ───────────────────────────────────────────────
  { when: { studentId: 12, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} murmurs, watching you watch her. "Integration complete. The subject is cooperating. You're welcome."`,
    `"Say it again. Slower. The data is overwhelming. Understood."`,
    `"Again. Countertransference. Accepted. Embodied."`,
    `"Keep noticing. I name the dynamic. You keep filling it in."`,
  ]},
  // ── 13 · Daisy ───────────────────────────────────────────────
  { when: { studentId: 13, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} glows. "Growing sweet. Plenty to go around. You're welcome, sugar."`,
    `"Say it again. Slower. Well-fed. That's the goal. Blessed."`,
    `"Again. Full house. Come eat. Kitchen unto myself."`,
    `"Keep noticing. Honey, you're making a girl feel seen."`,
  ]},
  // ── 14 · Mary Jane ───────────────────────────────────────────
  { when: { studentId: 14, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, warm as biscuits. "Growing good. More harvest. You're welcome."`,
    `"Say it again. Slower. Bounty. Land don't lie."`,
    `"Again. Plenty. Home. Barn at harvest."`,
    `"Keep noticing. Mama would be proud. Or horrified. Still both."`,
  ]},
  // ── 15 · Lilith ──────────────────────────────────────────────
  { when: { studentId: 15, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says softly. "Soon. Almost ready. You're welcome."`,
    `"Say it again. Slower. I am still collecting. Tide coming in."`,
    `"Again. All of it. Look what you're feeding."`,
    `"Keep noticing. How thoughtful. Keep talking."`,
  ]},
  // ── 16 · Sophia ──────────────────────────────────────────────
  { when: { studentId: 16, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} says, vast and certain. "The compound works. I am the data. You're welcome."`,
    `"Say it again. Slower. Wellness is a dosage question. I keep increasing the dose."`,
    `"Again. Self-trial results: significant. Sustained. I'm not stopping."`,
    `"Keep noticing. Look at the data. All of it."`,
  ]},
  // ── 17 · Indiana Bones ───────────────────────────────────────
  { when: { studentId: 17, corruption: [2] }, weight: W, text: [
    `"I know," {subject.name} grins, roguish. "Treasure. Some of us hoard it internally. You're welcome."`,
    `"Say it again. Slower. Fortune and glory. All of it stored on-site."`,
    `"Again. I used to squeeze through tomb shafts. Now I AM the monument."`,
    `"Keep noticing. Forbidden cartography of me. The map keeps growing."`,
  ]},
]);
