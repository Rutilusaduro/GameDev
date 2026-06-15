// ═══════════════════════════════════════════════════════════════
// WEEKLY EVENT — stage-gated narrative incidents (per-girl variants)
// ═══════════════════════════════════════════════════════════════
import { registerPool } from '../../engine.js';

registerPool('weekly.uniform_split', [
  { when: { studentId: 0 }, weight: 4, text: [
    'During tryouts — tryouts {subject.name} is running as captain — her cheer uniform splits along the seam with an audible pop. The entire squad freezes. {subject.name} looks down at herself, at the soft belly now escaping the fabric, and very deliberately straightens up. "Take five," she tells the squad. She finds you afterward. "I\'m going to need a new uniform. Four sizes up. I\'m still captain. Don\'t give me a look."',
    '{subject.name}\'s captain sash won\'t close over her middle anymore. She\'s been ignoring this for weeks, but today, in front of the whole squad for the routine review, it gives up entirely. A seam splits at the shoulder. The gym goes quiet. {subject.name} looks around at twenty-two juniors watching their captain, tilts her chin up, and says: "Dismissed for today." She finds you after. "Please tell no one. Also do you know a seamstress. Also I had three dinners last week and it was worth it."',
    'Her squad jacket hasn\'t closed in a month. Today the uniform top finally splits at the back mid-demonstration, in front of the school, in full view of the stands. {subject.name} keeps the movement going for two more counts, then stops. She walks off the floor with the quiet dignity of someone who is not ready to have this conversation yet. She texts you that night: "New uniforms. Bigger. I\'m still running tryouts. Don\'t say anything to the athletic director. I will handle it."',
  ] },
  { when: { archetype: 'cheerleader' }, weight: 3, text: [
    'Mid-routine — a difficult lift section {subject.name} choreographed herself — her dance costume splits at the hip with a sharp crack. The music keeps playing. {subject.name} lands the count, finishes the eight, and then walks calmly off to the wings. She finds you in the corridor afterward, still in the damaged costume, eating a granola bar. "So. New costume. I\'ve already emailed the seamstress. Four sizes up probably." She thinks. "Make it five."',
    'The recital costumes arrived this week and none of them fit. {subject.name} holds one up against herself in the studio, looks in the mirror, and laughs. "I designed these," she says. "I designed them to fit me." She turns to the full-length mirror. "I am no longer that person." She calls the costume shop. She tells you afterward: "The new ones will be better. I\'ve had some ideas. My body is different now. The choreography will adapt."',
    'It happens during the showcase — exactly the wrong moment, exactly the right uniform to fail. {subject.name}\'s costume splits at the seam during her own solo. She pauses, adjusts, and finishes the piece. The audience thinks it\'s intentional. She texts you: "I hate that it happened and also I\'ve never moved better in my life. Ordering new costumes. Going to dinner. These two facts are connected."',
  ] },
  { when: {}, text: [
    '{subject.name}\'s uniform gives up during practice with an audible pop. She handles it with more dignity than the fabric deserved. New sizes are ordered. She does not sound regretful.',
  ] },
]);

registerPool('weekly.viral_post', [
  { when: { archetype: 'influencer' }, text: [
    '{subject.name} posts a video attempting to fit into her old jeans. It goes viral overnight. Two million views in twelve hours. Comments are overwhelmingly enthusiastic. She shows you in class, glowing. "Two. Million." She tilts the phone to show you the view count. Her old jeans are somewhere around her thighs in the thumbnail. "I think this is my era," she says.',
  ] },
  { when: {}, text: [
    '{subject.name} posts something that blows up overnight. She is glowing about it. Her old clothes are not surviving the comparison.',
  ] },
]);

registerPool('weekly.thesis_rewrite', [
  { when: { archetype: 'bookworm' }, text: [
    '{subject.name} submits a revised thesis outline. New title: \'Adaptive Caloric Strategy and Cognitive Performance: An Ethnographic Self-Study.\' The abstract is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it immediately. She beams with the energy of someone who has made weight gain count toward her GPA.',
  ] },
  { when: {}, text: [
    '{subject.name} submits a revised academic outline that is rigorous on paper and transparently about eating in practice. You approve it. She beams.',
  ] },
]);

registerPool('weekly.gaming_sponsor', [
  { when: { archetype: 'gamer' }, text: [
    '{subject.name} has a snack sponsorship deal. She tells you with enormous satisfaction, adjusting herself in her chair. "They send boxes. Every week. Full boxes." She pauses. "I\'ve been doing a lot of product testing." You look at her — noticeably bigger — and nod. "Thorough research," you say. She grins. "The most thorough."',
  ] },
  { when: {}, text: [
    '{subject.name} lands a sponsorship that sends food. She calls it research. She is not wrong.',
  ] },
]);

registerPool('weekly.intervention_fails', [
  { when: { archetype: 'sorority' }, text: [
    '{subject.name}\'s sisters stage an \'intervention\' about her eating. It devolves into a two-hour dinner when {subject.name} orders for the table. By dessert everyone has forgotten the intervention. {subject.name} has eaten more than anyone. She tells you the next day, delighted. "I think I accidentally converted three of them."',
  ] },
  { when: {}, text: [
    'An intervention about {subject.name}\'s eating becomes a group dinner. She wins on points.',
  ] },
]);

registerPool('weekly.art_exhibition', [
  { when: { archetype: 'artsy' }, text: [
    '{subject.name}\'s senior show opens and every piece is a meditation on abundance — overflowing bowls, voluptuous figures, textures of excess. Critics write \'opulent\' and \'unapologetically sensual.\' {subject.name} stands at the opening in a flowing dress that shows every curve, eating cheese from the reception table. "The artist," she says, gesturing at herself, "is also the subject matter."',
  ] },
  { when: {}, text: [
    '{subject.name}\'s exhibition is all abundance — and so is she. Critics notice. She does not pretend otherwise.',
  ] },
]);

registerPool('weekly.team_weigh_in', [
  { when: { archetype: 'athlete' }, text: [
    '{subject.name} has been avoiding the athletics department scale for weeks. Today she can\'t. She tells you flatly: "Thirty-five pounds over their limit." Beat. "They were very professional about it." Another beat. "I ate an entire pizza on the way home and I feel fine, actually." She does look fine — soft and full-cheeked and more relaxed than you\'ve ever seen her.',
  ] },
  { when: {}, text: [
    '{subject.name} finally hits the athletics scale and is well over limit. She sounds fine about it. She probably is.',
  ] },
]);

registerPool('weekly.quiet_opens_up', [
  { when: { archetype: 'quiet' }, text: [
    'After class, {subject.name} catches you packing up. She\'s looking at her own rounded belly with an expression you can\'t read. Then she looks up. "I actually like how I look now," she says quietly. "Is that weird?" You tell her it isn\'t. She nods, pulls a pastry from her bag, takes a bite. The two of you eat in comfortable silence for a moment. She smiles.',
  ] },
  { when: {}, text: [
    'After class, {subject.name} admits she likes how she looks now. She says it quietly, like a confession, and then keeps eating.',
  ] },
]);

registerPool('weekly.overachiever_pivot', [
  { when: { archetype: 'overachiever' }, text: [
    '{subject.name} submits a revised thesis proposal: \'Adaptive Caloric Strategy and Cognitive Performance: A Self-Study.\' You read the abstract. It is rigorous. It is also clearly an elaborate academic justification for eating constantly. You approve it. She beams with the energy of someone who has made gaining weight count toward her GPA.',
  ] },
  { when: {}, text: [
    '{subject.name} reframes her thesis around eating. Academically sound. Transparently convenient. Approved.',
  ] },
]);

registerPool('weekly.transfer_settled', [
  { when: { archetype: 'transfer' }, text: [
    '{subject.name} gets a call from her parents asking if she wants to transfer back home. She\'s quiet for a moment, looking out the window at the campus she\'s come to know so intimately. "No," she says finally. "I think I\'m where I\'m supposed to be." She hangs up, pats her enormous belly with obvious affection, and heads to the dining hall.',
  ] },
  { when: {}, text: [
    '{subject.name} turns down a transfer home. Campus has her now — literally and figuratively.',
  ] },
]);

registerPool('weekly.custom_clothing', [
  { when: { endStageMin: 6 }, text: [
    '{subject.name} announces she\'s had to go up four clothing sizes and nothing in stores fits anymore. Rather than distress, there\'s satisfaction in her voice. "I got measured properly for the first time. Did you know I carry most of it here —" she pats her belly "— and here." She pats her hips. "Custom order. It\'s going to look incredible."',
  ] },
  { when: {}, text: [
    '{subject.name} has gone up several clothing sizes. She sounds satisfied about the measurements, not distressed.',
  ] },
]);

registerPool('weekly.immobility_peace', [
  { when: { endStageMin: 8 }, text: [
    'You find {subject.name} settled into the reinforced couch, a plate balanced on her enormous belly, utterly at ease. "I\'ve been thinking," she says, "I used to spend so much energy on movement. Walking, exercising, all of that." She takes a slow bite. "This is better." She isn\'t asking for your opinion. She\'s just telling you how things are. You bring her something else to eat.',
  ] },
  { when: {}, text: [
    '{subject.name} is settled deep into reinforced furniture, eating comfortably, and has made peace with not moving much.',
  ] },
]);

registerPool('weekly.blob_ending', [
  { when: { endStageMin: 10 }, text: [
    '{subject.name} can no longer come to class. You bring class to her. She holds court from her specially furnished room — vast, warm, content. Students orbit her. She eats, talks, laughs. When you ask how she feels, she considers this. "Full," she finally says. "Really, genuinely full." She smiles. "Keep it coming."',
  ] },
  { when: {}, text: [
    '{subject.name} holds court from her room now. Class comes to her. She is vast, warm, and content.',
  ] },
]);
