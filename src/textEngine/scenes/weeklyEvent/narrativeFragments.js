// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — decomposed fragment pools for narrative incidents
// Mined from legacy monoliths in narrativeEvents.js (MIGRATION.md).
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

// ── uniform split ─────────────────────────────────────────────

registerPool('weekly.uniformSplit.incident', [
  { when: { studentId: 0 }, priority: 1, weight: 4, text: [
    'During tryouts — tryouts {subject.name} is running as captain — her cheer uniform splits along the seam with an audible pop.',
    '{subject.name}\'s captain sash won\'t close over her middle anymore. Today, in front of the whole squad for the routine review, it gives up entirely.',
    'Her squad jacket hasn\'t closed in a month. Today the uniform top finally splits at the back mid-demonstration, in front of the school, in full view of the stands.',
  ] },
  { when: { archetype: 'cheerleader' }, text: [
    'Mid-routine — a difficult lift section {subject.name} choreographed herself — her dance costume splits at the hip with a sharp crack.',
    'The recital costumes arrived this week and none of them fit.',
    'It happens during the showcase — exactly the wrong moment, exactly the right uniform to fail.',
  ] },
  { when: { endStageMin: 6 }, text: [
    '{subject.name}\'s uniform gives up during practice with an audible pop — fabric surrendering to {word.size} mass.',
    'A seam parts under {subject.name} with a sound the whole gym hears.',
  ] },
  { when: {}, text: [
    '{subject.name}\'s uniform gives up during practice with an audible pop.',
    'A seam fails on {subject.name} at the worst possible moment.',
    'Fabric loses the argument with {subject.name}\'s middle in front of witnesses.',
    'Her uniform splits with a sound everyone pretends not to have heard.',
  ] },
]);

registerPool('weekly.uniformSplit.recovery', [
  { when: { studentId: 0 }, priority: 1, weight: 4, text: [
    'The entire squad freezes. {subject.name} looks down at herself, at the soft belly now escaping the fabric, and very deliberately straightens up. "Take five," she tells the squad.',
    'A seam splits at the shoulder. The gym goes quiet. {subject.name} looks around at twenty-two juniors watching their captain, tilts her chin up, and says: "Dismissed for today."',
    '{subject.name} keeps the movement going for two more counts, then stops. She walks off the floor with the quiet dignity of someone who is not ready to have this conversation yet.',
  ] },
  { when: { archetype: 'cheerleader' }, text: [
    'The music keeps playing. {subject.name} lands the count, finishes the eight, and then walks calmly off to the wings.',
    '{subject.name} holds one up against herself in the studio, looks in the mirror, and laughs.',
    '{subject.name}\'s costume splits at the seam during her own solo. She pauses, adjusts, and finishes the piece.',
  ] },
  { when: {}, text: [
    'She handles it with more dignity than the fabric deserved.',
    'She finishes the count, then excuses herself without hurry.',
    'She straightens up as if this were choreographed.',
    'The room goes quiet; she does not.',
  ] },
]);

registerPool('weekly.uniformSplit.afterDialogue', [
  { when: { studentId: 0 }, priority: 1, weight: 4, text: [
    'She finds you afterward. "I\'m going to need a new uniform. Four sizes up. I\'m still captain. Don\'t give me a look."',
    'She finds you after. "Please tell no one." A beat. "Do you know a seamstress?" She smiles despite herself. "I had three dinners last week and it was worth it."',
    'She texts you that night: "New uniforms. Bigger. I\'m still running tryouts. Don\'t say anything to the athletic director. I will handle it."',
  ] },
  { when: { archetype: 'cheerleader' }, text: [
    'She finds you in the corridor afterward, still in the damaged costume, eating a granola bar. "So. New costume. I\'ve already emailed the seamstress. Four sizes up probably." She thinks. "Make it five."',
    '"I designed these," she says. "I designed them to fit me." She turns to the full-length mirror. "I am no longer that person."',
    'She texts you: "I hate that it happened and also I\'ve never moved better in my life. Ordering new costumes. Going to dinner. These two facts are connected."',
  ] },
  { when: {}, text: [
    'New sizes are ordered. She does not sound regretful.',
    'She emails a seamstress before she emails anyone else.',
    'She treats the split like a scheduling problem, not a shame problem.',
    'She wants bigger uniforms and does not whisper it.',
  ] },
]);

registerPool('weekly.uniform_split', [
  { when: {}, text: [
    '{weekly.uniformSplit.incident} {weekly.uniformSplit.recovery} {weekly.uniformSplit.afterDialogue}',
  ] },
]);

// ── viral post ────────────────────────────────────────────────

registerPool('weekly.viralPost.hook', [
  { when: { archetype: 'influencer' }, text: [
    '{subject.name} posts a video attempting to fit into her old jeans.',
    '{subject.name} films herself trying on clothes from last semester.',
    '{subject.name} posts a before-and-after that was not supposed to be an after.',
  ] },
  { when: {}, text: [
    '{subject.name} posts something that blows up overnight.',
    '{subject.name} uploads a clip that finds an audience immediately.',
    'A post from {subject.name} starts climbing before breakfast.',
    'Something {subject.name} shares goes wider than she planned.',
  ] },
]);

registerPool('weekly.viralPost.reaction', [
  { when: { archetype: 'influencer' }, text: [
    'It goes viral overnight. Two million views in twelve hours. Comments are overwhelmingly enthusiastic.',
    'The views climb past a million before lunch. The comments are hungry for more.',
    'By morning the clip has outrun every post she made last month.',
  ] },
  { when: {}, text: [
    'It blows up overnight. The comments are kinder than she feared.',
    'The numbers climb faster than she can refresh.',
    'Shares outrun shame. The internet approves.',
    'The post spreads through campus before she finishes her coffee.',
  ] },
]);

registerPool('weekly.viralPost.line', [
  { when: { archetype: 'influencer' }, text: [
    'She shows you in class, glowing. "Two. Million." She tilts the phone to show you the view count. Her old jeans are somewhere around her thighs in the thumbnail. "I think this is my era," she says.',
    '"This is my era," she says, still glowing. The thumbnail makes the old jeans look optimistic.',
    '"No filter," she murmurs. "Just me." The view count disagrees with modesty.',
  ] },
  { when: {}, text: [
    'She is glowing about it. Her old clothes are not surviving the comparison.',
    'She shows you the numbers like a grade she earned.',
    'She looks pleased. The old wardrobe does not.',
    'She reads the comments aloud and sounds vindicated.',
  ] },
]);

registerPool('weekly.viral_post', [
  { when: {}, text: ['{weekly.viralPost.hook} {weekly.viralPost.reaction} {weekly.viralPost.line}'] },
]);

// ── thesis rewrite ────────────────────────────────────────────

registerPool('weekly.thesisRewrite.submit', [
  { when: { archetype: 'bookworm' }, text: [
    '{subject.name} submits a revised thesis outline.',
    '{subject.name} slides a new outline across your desk.',
    'A revised thesis outline arrives from {subject.name}.',
  ] },
  { when: {}, text: [
    '{subject.name} submits a revised academic outline.',
    'A new outline from {subject.name} lands in your inbox.',
    '{subject.name} revises her proposal and sends it over.',
    'Her revised outline shows up before office hours.',
  ] },
]);

registerPool('weekly.thesisRewrite.title', [
  { when: { archetype: 'bookworm' }, text: [
    'New title: \'Adaptive Caloric Strategy and Cognitive Performance: An Ethnographic Self-Study.\'',
    'The title now reads \'Adaptive Caloric Strategy and Cognitive Performance: An Ethnographic Self-Study.\'',
  ] },
  { when: {}, text: [
    'The title is rigorous on paper.',
    'The abstract sounds scholarly.',
    'The framing is academic and deliberate.',
    'On paper it reads like legitimate research.',
  ] },
]);

registerPool('weekly.thesisRewrite.verdict', [
  { when: { archetype: 'bookworm' }, text: [
    'The abstract is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it immediately. She beams with the energy of someone who has made weight gain count toward her GPA.',
    'You read it twice. It is real scholarship and transparently convenient. Approved. She beams.',
  ] },
  { when: {}, text: [
    'It is rigorous on paper and transparently about eating in practice. You approve it. She beams.',
    'You approve it. She looks like she won something.',
    'The argument holds. So does her appetite. Approved.',
    'She beams as if the GPA just gained a new category.',
  ] },
]);

registerPool('weekly.thesis_rewrite', [
  { when: {}, text: ['{weekly.thesisRewrite.submit} {weekly.thesisRewrite.title} {weekly.thesisRewrite.verdict}'] },
]);

// ── gaming sponsor ────────────────────────────────────────────

registerPool('weekly.gamingSponsor.deal', [
  { when: { archetype: 'gamer' }, text: [
    '{subject.name} has a snack sponsorship deal.',
    'A snack brand signs {subject.name}.',
    '{subject.name} lands a sponsorship that sends food.',
  ] },
  { when: {}, text: [
    '{subject.name} lands a sponsorship that sends food.',
    'A brand deal arrives for {subject.name}.',
    'Sponsorship boxes start showing up for {subject.name}.',
    '{subject.name} gets paid in snacks now.',
  ] },
]);

registerPool('weekly.gamingSponsor.line', [
  { when: { archetype: 'gamer' }, text: [
    'She tells you with enormous satisfaction, adjusting herself in her chair. "They send boxes. Every week. Full boxes." She pauses. "I\'ve been doing a lot of product testing."',
    '"Full boxes," she says. "Every week." She pats the arm of the chair. "Research."',
  ] },
  { when: {}, text: [
    'She calls it research. She is not wrong.',
    'She describes the boxes like loot drops.',
    'She treats the delivery schedule like a patch calendar.',
    'She says product testing. She means eating.',
  ] },
]);

registerPool('weekly.gamingSponsor.tag', [
  { when: { archetype: 'gamer' }, text: [
    'You look at her — noticeably bigger — and nod. "Thorough research," you say. She grins. "The most thorough."',
    'You call it thorough research. She accepts the compliment.',
  ] },
  { when: {}, text: [
    'You nod. She grins like she leveled up.',
    'The sponsorship and the softness arrive together.',
    'She looks pleased with her sample size.',
    'She has never sounded more professionally justified.',
  ] },
]);

registerPool('weekly.gaming_sponsor', [
  { when: {}, text: ['{weekly.gamingSponsor.deal} {weekly.gamingSponsor.line} {weekly.gamingSponsor.tag}'] },
]);

// ── intervention fails ────────────────────────────────────────

registerPool('weekly.interventionFails.setup', [
  { when: { archetype: 'sorority' }, text: [
    '{subject.name}\'s sisters stage an \'intervention\' about her eating.',
    'Her chapter plans an intervention about {subject.name}\'s appetite.',
    'The sorority house decides {subject.name} needs a talk about food.',
  ] },
  { when: {}, text: [
    'An intervention about {subject.name}\'s eating is planned.',
    'Someone decides {subject.name} needs a serious talk about food.',
    'Friends gather to confront {subject.name} about how she eats.',
    'A worried group corners {subject.name} about her appetite.',
  ] },
]);

registerPool('weekly.interventionFails.turn', [
  { when: { archetype: 'sorority' }, text: [
    'It devolves into a two-hour dinner when {subject.name} orders for the table.',
    'By appetizers the intervention has become a reservation for six.',
    '{subject.name} orders for everyone before anyone finishes the opening speech.',
  ] },
  { when: {}, text: [
    'It becomes a group dinner instead.',
    'The talk turns into menus.',
    'Food arrives and the lecture loses.',
    'Someone orders apps and the mission collapses.',
  ] },
]);

registerPool('weekly.interventionFails.payoff', [
  { when: { archetype: 'sorority' }, text: [
    'By dessert everyone has forgotten the intervention. {subject.name} has eaten more than anyone. She tells you the next day, delighted. "I think I accidentally converted three of them."',
    'She wins on points and tells you later she may have recruited three converts.',
    'The sisters leave with to-go boxes and new opinions. {subject.name} texts you a photo of empty appetizer plates: "Mission failed successfully."',
  ] },
  { when: {}, text: [
    'The lecture dissolves into shared plates. {subject.name} eats more than anyone and looks entirely unrepentant.',
    'Someone proposes a toast to "honest appetites." {subject.name} raises her glass first.',
    'By the time coffee arrives, nobody remembers why they gathered — only that {subject.name} ordered for the table.',
    'Nobody leaves hungry. Nobody leaves convinced she should stop.',
  ] },
]);

registerPool('weekly.intervention_fails', [
  { when: {}, text: ['{weekly.interventionFails.setup} {weekly.interventionFails.turn} {weekly.interventionFails.payoff}'] },
]);

// ── art exhibition ────────────────────────────────────────────

registerPool('weekly.artExhibition.opening', [
  { when: { archetype: 'artsy' }, text: [
    '{subject.name}\'s senior show opens and every piece is a meditation on abundance — overflowing bowls, voluptuous figures, textures of excess.',
    '{subject.name}\'s show opens to a room full of abundance on every wall.',
    'Her senior exhibition is all curves, bowls, and deliberate excess.',
  ] },
  { when: {}, text: [
    '{subject.name}\'s exhibition is all abundance — and so is she.',
    'Her show celebrates fullness in paint and clay.',
    'The gallery fills with work about appetite and form.',
    'Every piece on the wall argues for more.',
  ] },
]);

registerPool('weekly.artExhibition.press', [
  { when: { archetype: 'artsy' }, text: [
    'Critics write \'opulent\' and \'unapologetically sensual.\'',
    'The review calls it opulent. It is not wrong.',
  ] },
  { when: {}, text: [
    'Critics notice.',
    'The reception buzzes with approval.',
    'Visitors use words like lush and generous.',
    'The show reads as celebration, not apology.',
  ] },
]);

registerPool('weekly.artExhibition.line', [
  { when: { archetype: 'artsy' }, text: [
    '{subject.name} stands at the opening in a flowing dress that shows every curve, eating cheese from the reception table. "The artist," she says, gesturing at herself, "is also the subject matter."',
    '"The artist is also the subject matter," she says, gesturing at herself with a piece of cheese.',
  ] },
  { when: {}, text: [
    'She does not pretend otherwise.',
    'She eats at her own opening without irony.',
    'She stands in the work and beside it.',
    'She looks like the thesis made flesh.',
  ] },
]);

registerPool('weekly.art_exhibition', [
  { when: {}, text: ['{weekly.artExhibition.opening} {weekly.artExhibition.press} {weekly.artExhibition.line}'] },
]);

// ── quiet opens up ────────────────────────────────────────────

registerPool('weekly.quietOpen.setup', [
  { when: { archetype: 'quiet' }, text: [
    'After class, {subject.name} catches you packing up.',
    '{subject.name} waits until the room empties.',
    'She lingers after class while you stack papers.',
  ] },
  { when: {}, text: [
    'After class, {subject.name} stays.',
    'She catches you on the way out.',
    'She waits until you are almost alone.',
    'She finds a moment when the hallway is quiet.',
  ] },
]);

registerPool('weekly.quietOpen.confession', [
  { when: { archetype: 'quiet' }, text: [
    'She\'s looking at her own rounded belly with an expression you can\'t read. Then she looks up. "I actually like how I look now," she says quietly. "Is that weird?"',
    '"I like how I look now," she says, barely louder than a breath. "Is that weird?"',
  ] },
  { when: {}, text: [
    'She admits she likes how she looks now.',
    'She says it quietly, like a confession.',
    'She tells you she is not unhappy with her reflection.',
    'She names the softness without flinching.',
  ] },
]);

registerPool('weekly.quietOpen.close', [
  { when: { archetype: 'quiet' }, text: [
    'You tell her it isn\'t. She nods, pulls a pastry from her bag, takes a bite. The two of you eat in comfortable silence for a moment. She smiles.',
    'You tell her it isn\'t weird. She nods and keeps eating.',
  ] },
  { when: {}, text: [
    'She nods and keeps eating.',
    'The silence afterward feels like agreement.',
    'She smiles without performing it.',
    'She returns to her pastry, relieved.',
  ] },
]);

registerPool('weekly.quiet_opens_up', [
  { when: {}, text: ['{weekly.quietOpen.setup} {weekly.quietOpen.confession} {weekly.quietOpen.close}'] },
]);

// ── overachiever pivot ────────────────────────────────────────

registerPool('weekly.overachieverPivot.submit', [
  { when: { archetype: 'overachiever' }, text: [
    '{subject.name} submits a revised thesis proposal: \'Adaptive Caloric Strategy and Cognitive Performance: A Self-Study.\'',
    '{subject.name} sends a revised proposal with a very deliberate title.',
  ] },
  { when: {}, text: [
    '{subject.name} reframes her thesis around eating.',
    'A new proposal arrives with suspiciously convenient framing.',
    'She submits a revised academic plan.',
    'Her outline now centers appetite with footnotes.',
  ] },
]);

registerPool('weekly.overachieverPivot.verdict', [
  { when: { archetype: 'overachiever' }, text: [
    'You read the abstract. It is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it. She beams with the energy of someone who has made gaining weight count toward her GPA.',
    'Academically sound. Transparently convenient. Approved. She beams.',
  ] },
  { when: {}, text: [
    'Academically sound. Transparently convenient. Approved.',
    'You approve it. She looks like she optimized the assignment.',
    'The argument holds. She looks victorious.',
    'Approved. She treats the GPA like another metric to win.',
  ] },
]);

registerPool('weekly.overachiever_pivot', [
  { when: {}, text: ['{weekly.overachieverPivot.submit} {weekly.overachieverPivot.verdict}'] },
]);

// ── transfer settled ──────────────────────────────────────────

registerPool('weekly.transferSettled.call', [
  { when: { archetype: 'transfer' }, text: [
    '{subject.name} gets a call from her parents asking if she wants to transfer back home.',
    'Her parents call about transferring back home.',
    'A call comes: would {subject.name} rather be back home?',
  ] },
  { when: {}, text: [
    '{subject.name} gets a call about leaving campus.',
    'Home asks if she wants to come back.',
    'Family checks whether she is coming home.',
    'Someone on the phone offers her an exit.',
  ] },
]);

registerPool('weekly.transferSettled.answer', [
  { when: { archetype: 'transfer' }, text: [
    'She\'s quiet for a moment, looking out the window at the campus she\'s come to know so intimately. "No," she says finally. "I think I\'m where I\'m supposed to be."',
    '"No," she says. "I think I\'m where I\'m supposed to be."',
  ] },
  { when: {}, text: [
    'She says no.',
    'She chooses to stay.',
    'Campus wins the argument.',
    'She declines without much hesitation.',
  ] },
]);

registerPool('weekly.transferSettled.after', [
  { when: { archetype: 'transfer', endStageMin: 6 }, text: [
    'She hangs up, pats her enormous belly with obvious affection, and heads to the dining hall.',
    'She pats her belly and heads to the dining hall.',
  ] },
  { when: { archetype: 'transfer' }, text: [
    'She hangs up and heads to the dining hall.',
    'She ends the call and goes to eat.',
  ] },
  { when: { endStageMin: 6 }, text: [
    'She pats her belly and goes to eat.',
    'She heads to the dining hall, satisfied.',
  ] },
  { when: {}, text: [
    'Campus has her now — literally and figuratively.',
    'She stays. She eats. She does not sound torn.',
    'She chooses the table over the ticket home.',
    'She hangs up lighter than she answered.',
  ] },
]);

registerPool('weekly.transfer_settled', [
  { when: {}, text: ['{weekly.transferSettled.call} {weekly.transferSettled.answer} {weekly.transferSettled.after}'] },
]);

// ── custom clothing ───────────────────────────────────────────

registerPool('weekly.customClothing.announce', [
  { when: { endStageMin: 6 }, text: [
    '{subject.name} announces she\'s had to go up four clothing sizes and nothing in stores fits anymore.',
    '{subject.name} says store racks have officially given up on her.',
    'She reports four new sizes and zero off-the-rack luck.',
  ] },
  { when: {}, text: [
    '{subject.name} has gone up several clothing sizes.',
    'She needs new measurements, not new excuses.',
    'Off-the-rack options have run out.',
    'She admits nothing in stores fits anymore.',
  ] },
]);

registerPool('weekly.customClothing.tone', [
  { when: { endStageMin: 6 }, text: [
    'Rather than distress, there\'s satisfaction in her voice.',
    'She sounds pleased, not cornered.',
    'She says it like good news.',
    'There is pride in the admission.',
  ] },
  { when: {}, text: [
    'She sounds satisfied about the measurements, not distressed.',
    'She does not mourn the old size.',
    'She sounds like someone placing an order she wants.',
    'The tone is content, not apologetic.',
  ] },
]);

registerPool('weekly.customClothing.line', [
  { when: { endStageMin: 6 }, text: [
    '"I got measured properly for the first time. Did you know I carry most of it here —" she pats her belly "— and here." She pats her hips. "Custom order. It\'s going to look incredible."',
    '"Custom order," she says. "It\'s going to look incredible."',
  ] },
  { when: {}, text: [
    'Custom sizes are on the way.',
    'She talks about fabric like she talks about dessert.',
    'She is already picturing the finished fit.',
    'She wants clothes that admit the truth.',
  ] },
]);

registerPool('weekly.custom_clothing', [
  { when: {}, text: ['{weekly.customClothing.announce} {weekly.customClothing.tone} {weekly.customClothing.line}'] },
]);

// ── immobility peace ──────────────────────────────────────────

registerPool('weekly.immobilityPeace.scene', [
  { when: { endStageMin: 8 }, text: [
    'You find {subject.name} settled into the reinforced couch, a plate balanced on her enormous belly, utterly at ease.',
    '{subject.name} is sunk deep into reinforced furniture with a plate riding her belly.',
    'She has claimed the reinforced couch like a throne.',
  ] },
  { when: {}, text: [
    '{subject.name} is settled deep into reinforced furniture, eating comfortably.',
    'She has made a nest of cushions and plates.',
    'She occupies the couch completely.',
    'She is horizontal, fed, and unhurried.',
  ] },
]);

registerPool('weekly.immobilityPeace.line', [
  { when: { endStageMin: 8 }, text: [
    '"I\'ve been thinking," she says, "I used to spend so much energy on movement. Walking, exercising, all of that." She takes a slow bite. "This is better."',
    '"This is better," she says after a slow bite. She is not asking.',
  ] },
  { when: {}, text: [
    'She has made peace with not moving much.',
    'She says staying put suits her.',
    'She talks about rest like a discovery.',
    'She does not sound like she misses the stairs.',
  ] },
]);

registerPool('weekly.immobilityPeace.tag', [
  { when: { endStageMin: 8 }, text: [
    'She isn\'t asking for your opinion. She\'s just telling you how things are. You bring her something else to eat.',
    'You bring her something else to eat.',
  ] },
  { when: {}, text: [
    'You bring her more food.',
    'The afternoon continues around her stillness.',
    'She accepts another plate without shifting much.',
    'Movement can wait. Appetite cannot.',
  ] },
]);

registerPool('weekly.immobility_peace', [
  { when: {}, text: ['{weekly.immobilityPeace.scene} {weekly.immobilityPeace.line} {weekly.immobilityPeace.tag}'] },
]);

// ── blob ending ───────────────────────────────────────────────

registerPool('weekly.blobEnding.setup', [
  { when: { endStageMin: 10 }, text: [
    '{subject.name} can no longer come to class. You bring class to her.',
    'Class now travels to {subject.name}.',
    'She holds court from her specially furnished room.',
  ] },
  { when: {}, text: [
    '{subject.name} holds court from her room now.',
    'You teach where she is.',
    'Her room has become the lecture hall.',
    'Campus comes to her now.',
  ] },
]);

registerPool('weekly.blobEnding.court', [
  { when: { endStageMin: 10 }, text: [
    'She holds court from her specially furnished room — vast, warm, content. Students orbit her. She eats, talks, laughs.',
    'Students orbit her. She eats, talks, laughs.',
    'The room is warm with bodies and plates.',
  ] },
  { when: {}, text: [
    'She is vast, warm, and content.',
    'Students visit in steady streams.',
    'She eats and talks and keeps receiving.',
    'The room feels like a settled kingdom.',
  ] },
]);

registerPool('weekly.blobEnding.line', [
  { when: { endStageMin: 10 }, text: [
    'When you ask how she feels, she considers this. "Full," she finally says. "Really, genuinely full." She smiles. "Keep it coming."',
    '"Full," she says. "Really, genuinely full."',
  ] },
  { when: {}, text: [
    '"Keep it coming," she murmurs.',
    'She sounds complete.',
    'She asks for more without urgency.',
    'She smiles like the word full is a compliment.',
  ] },
]);

registerPool('weekly.blob_ending', [
  { when: {}, text: ['{weekly.blobEnding.setup} {weekly.blobEnding.court} {weekly.blobEnding.line}'] },
]);
