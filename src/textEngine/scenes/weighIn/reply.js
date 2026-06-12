// wi.* personal reply slots — mined from weighInReplies.js
import { registerPool } from '../../engine.js';

registerPool('wi.moodTag', [
  { when: { mood: 'happy' }, text: ['She sounds almost buoyant despite everything.'] },
  { when: { mood: 'stressed' }, text: ['The number lands on top of everything else she is carrying this week.'] },
  { when: { mood: 'tired' }, text: ['She says it through a yawn she does not quite hide.'] },
  { when: { mood: 'nervous' }, text: ['Her voice pitches up half a note on the last word.'] },
  { when: { mood: 'excited' }, text: ['There is a spark in it — like the number is another thing to win at.'] },
  { when: { mood: 'focused' }, text: ['Clinical. Measured. Already filing it away.'] },
  { when: { mood: 'content' }, text: ['Warm. Unhurried. Like she has made peace with the moment.'] },
  { when: { mood: 'bemused' }, text: ['Dry amusement threads through every syllable.'] },
  { when: { mood: 'warm' }, text: ['Soft and open, the way she is with everyone she cares for.'] },
  { when: { mood: 'observant' }, text: ['She watches your face more than she watches the scale.'] },
  { when: { mood: 'cheerful' }, text: ['Bright as sunlight through a kitchen window.'] },
  { when: {}, weight: 1, text: ['', ''] },
]);

registerPool('wi.numberLine', [
  { when: { corruption: [0], stageMax: 2 }, text: [
    (ctx) => `${ctx.subject.name} plants her hands on her hips and squints at the dial.`,
    (ctx) => `${ctx.subject.name} reads the number and exhales through her nose.`,
    (ctx) => `${ctx.subject.name} stares at the reading for a long beat.`,
  ]},
  { when: { corruption: [1] }, text: [
    (ctx) => `${ctx.subject.name} reads ${Math.round(ctx.subject.lbs)} and nods like she's accepting a challenge.`,
    (ctx) => `"${Math.round(ctx.subject.lbs)}," ${ctx.subject.name} says, steady.`,
  ]},
  { when: { corruption: [2] }, text: [
    (ctx) => `"${Math.round(ctx.subject.lbs)}!" ${ctx.subject.name} grins.`,
    (ctx) => `${ctx.subject.name} reads the number and smiles like an old friend.`,
  ]},
  { when: {}, text: [(ctx) => `${ctx.subject.name} takes in the reading.`] },
]);

registerPool('wi.replyBody', [
  { when: { stageMax: 2 }, text: ["Her clothes sit differently than they did at the start of semester.","The gain is visible in how she holds herself.","She still negotiates with the number — but less each week.","Soft new curves show in how she shifts her weight."] },
  { when: { stageMin: 3, stageMax: 5 }, text: ["Her rounded belly pushes softly when she breathes.","Thighs press together when she shifts.","She has stopped pretending the number is temporary.","Everything moves different when she walks now."] },
  { when: { stageMin: 6, stageMax: 8 }, text: ["Her heavy belly hangs forward, soft and warm.","She fills more of the office than she used to.","Movement sends slow ripples through soft flesh.","The scale has said what it will say."] },
  { when: { stageMin: 9 }, text: ["Immobility and warmth fill the space between desk and door.","Her impossible mass shifts — slow, seismic.","The air in the office changes temperature around her.","She has become the room's center of gravity."] },
  { when: {}, text: ['She absorbs the number quietly.', 'The reading sits between you.'] },
]);

registerPool('wi.replyDialogue', [
  { when: { studentId: 0 }, weight: 4, text: ["Up again. Good.","Coach would lose his mind. I don't care. This is the best shape I've ever been in.","Different portions. Different everything.","Every week it's more. I can feel it when I walk — everything moves different.","More of me. Every week, more.","Keep it coming.","Now I feel it before I see it.","And I'm still winning at it."] },
  { when: { studentId: 1 }, weight: 4, text: ["Within expected variance for semester dietary changes,","The dining hall's sodium content alone could account for—","Up from last week. Correlation with increased caloric intake is…","Hypothesis confirmed: intentional weight gain produces measurable results.","This exceeds my projected trajectory by approximately—","By a meaningful margin.","The data is unambiguous,","About capacity. About identity."] },
  { when: { studentId: 2 }, weight: 4, text: ["The camera adds ten, the dining hall adds—","Engagement on body-positive posts is insane right now.","Lean into it. Literally.","My audience is going to lose their minds. Good way.","This is the content. This is the brand now.","Okay so like—it's fine. It's college. Everyone's gaining — campus-wide, not just me.","Okay so like—it's fine. It's college. Everyone gains.","The comments section would eat this up. 'She's so real.'"] },
  { when: { studentId: 3 }, weight: 4, text: ["Different training load.","New sport,","Same discipline.","Still climbing.","Something else is happening instead.","Same drive. Different arena.","New event. No weight class.","Record holder,"] },
  { when: { studentId: 4 }, weight: 4, text: ["Interesting composition,","The line of the body is changing.","More canvas,","More to work with.","Masterpiece in progress,","For the subject.","Open indefinitely.","Too big for the frame,"] },
  { when: { studentId: 5 }, weight: 4, text: ["Grinding IRL weight stat. Don't nerf me.","Patch notes: increased mass, improved comfort debuff resistance.","Running the build.","Chair ergonomics are trash for this meta.","Tank build. Pure tank.","No DPS. All presence.","Maxed out softness,","Zero regrets. Next?"] },
  { when: { studentId: 6 }, weight: 4, text: ["Okay but like—brunch is a lifestyle and I will die on that hill.","The girls are literally asking what I'm eating. Trade secret.","Best semester ever. Best body ever.","More is more, babe.","These are literally my good jeans. Were.","Worth it for the pasta bar.","The chapter voted. I'm the new standard.","Icon behavior,"] },
  { when: { studentId: 7 }, weight: 4, text: ["Variance within acceptable parameters for high-stress academic environment.","Correlates with increased caloric efficiency and reduced guilt.","Acceptable trade.","Project scope has expanded beyond initial estimates.","New KPI: pounds per week. Exceeding targets.","Maximum output,","Exceptional growth,","Benchmark set."] },
  { when: { studentId: 8 }, weight: 4, text: ["Before I see it.","Thank you,","It feels… warm.","All of me."] },
  { when: { studentId: 9 }, weight: 4, text: ["American portions are a psychological operation and I am losing. Badly.","Worth it though. Obviously.","The exchange program includes unlimited refills. I'm conducting field research.","Best year abroad ever.","Going back to Dublin enormous. Legend.","My mam is going to have words. Several words.","No regrets,","Need a new wardrobe. And a new country. Same country. Bigger country."] },
  { when: { studentId: 10 }, weight: 4, text: ["Quality ingredients,","The body is a kitchen. I'm filling the pantry.","Perfect reduction — everything concentrates.","Every recipe needs more body. Including mine.","Second helping,","Of everything.","Bought a bench.","Main course,"] },
  { when: { studentId: 11 }, weight: 4, text: ["Healthy growth,","Aggressive self-care.","Come sit,","About accepting your body.","Fully nourished,","Plenty for everyone,","The bed comes to me,","Complete care,"] },
  { when: { studentId: 12 }, weight: 4, text: ["You looked at me before you looked at the number. Interesting.","Correlation between your attention and my appetite remains significant.","The subject is cooperating,","In myself.","Integration complete,","The data is overwhelming,","Beyond theory,"] },
  { when: { studentId: 13 }, weight: 4, text: ["Comfort food works both ways. I'm living proof.","Growing sweet,","Second helpings are a kindness. To yourself.","Plenty to go around,","The kids I student-teach think I'm pregnant,","Come eat,","The table comes to me,","Full house,"] },
  { when: { studentId: 14 }, weight: 4, text: ["Back home we'd call this 'healthy.'","City food hits different though. Better, maybe.","Mama would be proud. Or horrified. Probably both.","Growing good,","These ain't gonna make it to Thanksgiving at this rate.","More harvest,","Need a new porch swing,","And a wider truck seat."] },
  { when: { studentId: 15 }, weight: 4, text: ["Numbers are such a human obsession.","Almost ready,","Every week,","Fragile little thing.","Thank you,"] },
  { when: { archetype: 'cheerleader' }, text: ["\"Moving.\"","\"Good.\"","\"Keep it coming.\"","\"Fine. New baseline.\""] },
  { when: { archetype: 'bookworm' }, text: ["\"Noted.\"","\"Hypothesis confirmed.\"","\"The data is unambiguous.\"","\"Continuing.\""] },
  { when: { archetype: 'influencer' }, text: ["\"Watch this number climb.\"","\"No filter. No angle.\"","\"This is the brand now.\"","\"Watch me.\""] },
  { when: { archetype: 'athlete' }, text: ["\"Fine. New baseline.\"","\"Still winning at it.\"","\"Good session though.\""] },
  { when: { archetype: 'artsy' }, text: ["\"It's beautiful.\"","\"Masterpiece in progress.\"","\"Publishable.\""] },
  { when: { archetype: 'gamer' }, text: ["\"Low durability item.\"","\"Patch notes: heavier.\"","\"Running the build.\""] },
  { when: { archetype: 'sorority' }, text: ["\"Iconic, honestly.\"","\"Best semester ever.\"","\"More is more, babe.\""] },
  { when: { archetype: 'overachiever' }, text: ["\"On track.\"","\"Acceptable trade.\"","\"Continuing.\""] },
  { when: { archetype: 'quiet' }, text: ["\"Okay.\"","\"Thank you.\"","\"Continuing.\""] },
  { when: { archetype: 'transfer' }, text: ["\"Worth it though.\"","\"Legend.\"","\"Field research.\""] },
  { when: { archetype: 'culinary' }, text: ["\"Quality ingredients.\"","\"Second helping.\"","\"Best review ever.\""] },
  { when: { archetype: 'nursing' }, text: ["\"Bless its heart.\"","\"Fed.\"","\"There's room.\""] },
  { when: { archetype: 'psych' }, text: ["\"Interesting.\"","\"Continuing.\"","\"Noted.\""] },
  { when: { archetype: 'eced' }, text: ["\"Fed.\"","\"Growing sweet.\"","\"Good nutrition.\""] },
  { when: { archetype: 'farm_girl' }, text: ["\"Growing good.\"","\"Mama would be proud.\"","\"Healthy.\""] },
  { when: { archetype: 'predator' }, text: ["\"Fragile little thing.\"","\"Predictable.\"","\"How quaint.\""] },
  { when: {}, text: ['"Huh."', '"Okay."', '"That\'s… a number."', '"Right."'] },
]);

registerPool('wi.reply', [
  { when: {}, text: [
    '{wi.numberLine} {wi.replyBody} {wi.replyDialogue}{wi.moodTag|prefix: }',
    '{wi.numberLine} {wi.replyDialogue} {wi.replyBody}{wi.moodTag|prefix: }',
    '{wi.replyDialogue} {wi.replyBody}{wi.moodTag|prefix: }',
  ]},
]);
