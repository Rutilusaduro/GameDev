// The Squad — Lead: A5 Editor | Support: A1 Mobile
// Per-student + stage-keyed depth on weekly narrative fragment pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('weekly.uniformSplit.incident', [
  { when: { studentId: 3, endStageMin: 5 }, weight: 4, text: [
    `Serena's uniform splits mid-lift — athlete's gear surrendering to athlete's appetite.`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany's chapter top gives way during rush review — pastel tearing, belly escaping, room gasping.`,
  ]},
  { when: { studentId: 8, endStageMin: 4 }, weight: 4, text: [
    `Maya's seam fails quietly in the studio — soft sound, hard flush, twenty witnesses.`,
  ]},
  { when: { studentId: 15, endStageMin: 6 }, weight: 4, text: [
    `Lilith's jacket button pops in the hallway — deliberate calm while fabric surrenders.`,
  ]},
]);

registerModuleVariants('weekly.uniformSplit.afterDialogue', [
  { when: { studentId: 3 }, weight: 4, text: [
    `"New uniform," Serena says. "Bigger. I'm still fastest. Don't test me."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie texts: "RIP old costume. Viral potential: high. New sizes: ordered. No regrets."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `"Chapter standards updated," Tiffany says brightly. "So did I. Both improvements."`,
  ]},
]);

registerModuleVariants('weekly.viralPost.line', [
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie shows you the count, glowing. "Two million," she says. "This is my body now. Deal with it."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny shrugs at the views. "Chat wanted proof. I delivered. Sponsors inbound."`,
  ]},
]);

registerModuleVariants('weekly.chairBreaks.afterDialogue', [
  { when: { studentId: 7, endStageMin: 6 }, weight: 4, text: [
    `Priya emails facilities with load ratings attached. "Chair failure predictable. Body mass exceeded spec."`,
  ]},
  { when: { studentId: 10, endStageMin: 7 }, weight: 4, text: [
    `Reneé pats the splintered seat. "The chair lacked ambition," she says. "I did not."`,
  ]},
  { when: { studentId: 14, endStageMin: 5 }, weight: 4, text: [
    `Mary Jane laughs, still seated on the floor. "Well shoot. Guess I outgrew that too."`,
  ]},
]);

registerModuleVariants('weekly.teamWeighIn.verdict', [
  { when: { studentId: 0 }, weight: 4, text: [
    `The number lands. Brittany straightens — captain first, athlete second, hungry always.`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena reads the scale like a scoreboard. "Up," she says. "Good. Keep feeding the team."`,
  ]},
  { when: { studentId: 12 }, weight: 4, text: [
    `Nadia announces the result clinically. Her smile is not clinical at all.`,
  ]},
]);

registerModuleVariants('weekly.quietOpen.close', [
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya speaks one sentence — soft, plain, devastating. Then she lets you feed her without looking away.`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee exhales like a valve releasing. "Thank you for listening," she says. "Now feed me."`,
  ]},
]);

registerModuleVariants('weekly.immobilityPeace.line', [
  { when: { studentId: 11, endStageMin: 10 }, weight: 4, text: [
    `Kaylee settles vast and serene. "This is peace," she murmurs. "Don't move me yet."`,
  ]},
  { when: { studentId: 8, endStageMin: 10 }, weight: 4, text: [
    `Maya breathes slow inside immensity. "I'm still here," she whispers. "Still yours."`,
  ]},
]);

// Leftover weeks: extra sitting in the body of the incident.
// No priority, max two keys — named studentId (priority 1 or 2-key weight 4) still wins.
registerModuleVariants('weekly.chairBreaks.buildup', [
  { when: { leftoverFed: true, endStageMax: 4 }, weight: 3, text: [
    'The chair under {subject.name} complains earlier. Seconds still in the seat. She leans anyway.',
    '{subject.name}\'s chair talks all hall session — extra help making the wood honest.',
  ]},
  { when: { leftoverFed: true, endStageMin: 5 }, weight: 3, text: [
    'A lounge chair meets already-fed mass and starts the argument early.',
    'The chair under {subject.name} lists sooner. Last sitting still rounding her into the frame.',
  ]},
  { when: { leftoverFed: true, endStageMin: 7 }, weight: 3, text: [
    '{subject.name}\'s chair does not groan. Extra help, then a snap. She was already lower in it.',
    'Quiet stretch of floor meeting. Seconds still in her. Then the seat is gone.',
  ]},
]);

registerModuleVariants('weekly.chairBreaks.break', [
  { when: { leftoverFed: true, endStageMax: 4 }, weight: 3, text: [
    'She laughs once, surprised the extra help counted.',
    'She grabs the desk. Seconds still in her middle. She goes still.',
  ]},
  { when: { leftoverFed: true, endStageMin: 5 }, weight: 3, text: [
    'She goes bright red. The extra sitting was already in the wood.',
    'The room is quiet. She knows the chair met last night first.',
  ]},
  { when: { leftoverFed: true, endStageMin: 7 }, weight: 3, text: [
    'She laughs before she can stop. Extra help, then gravity.',
    'She sighs like someone who ate twice and still sat down.',
  ]},
]);

registerModuleVariants('weekly.chairBreaks.afterDialogue', [
  { when: { leftoverFed: true, endStageMax: 4 }, weight: 3, text: [
    'After floor rounds she presses the extra sitting. "I felt this coming. The seconds didn\'t help."',
    'After rounds: "Thank you for not making it weird." She pats a middle that already ate.',
  ]},
  { when: { leftoverFed: true, endStageMin: 5 }, weight: 3, text: [
    'Afterwards: "Furniture can\'t handle the seconds either." She sounds pleased.',
    'After rounds she hangs back. Extra help, then the crack. She pats it fondly.',
  ]},
  { when: { leftoverFed: true, endStageMin: 7 }, weight: 3, text: [
    'After rounds she presses the extra sitting: "Borrowed time, then seconds. Anyway."',
    'After rounds: "{subject.semesterGain} pounds this semester, plus last night." She pats it. "Anyway."',
  ]},
]);

registerModuleVariants('weekly.uniformSplit.incident', [
  { when: { leftoverFed: true, archetype: 'cheerleader' }, weight: 4, text: [
    'Mid-routine the costume meets extra help and splits at the hip.',
    'Showcase count. Seconds still in the fabric. Then the seam tells on her.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name}\'s uniform gives during practice — extra help, then an audible pop.',
    'Fabric loses to {subject.name}\'s middle. Last sitting made the argument shorter.',
  ]},
]);

registerModuleVariants('weekly.viralPost.hook', [
  { when: { leftoverFed: true, archetype: 'influencer' }, weight: 4, text: [
    '{subject.name} posts trying old jeans over extra help. The thumbnail is already rounder.',
    '{subject.name} films last semester\'s clothes. Seconds still in the shot.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} posts something that blows up. Extra help made the clip honest.',
    'A post from {subject.name} climbs before breakfast. Last sitting is in the frame.',
  ]},
]);

registerModuleVariants('weekly.customClothing.announce', [
  { when: { leftoverFed: true, endStageMin: 6 }, weight: 3, text: [
    '{subject.name} says store racks gave up. Extra help finished what the sizes started.',
    'She reports four new sizes. Seconds still in the measurements.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} has gone up sizes. Last sitting made the tape honest.',
    'Off-the-rack ran out. Extra help did not fit in the old number.',
  ]},
]);

registerModuleVariants('weekly.teamWeighIn.verdict', [
  { when: { leftoverFed: true }, weight: 3, text: [
    'The number is past the program. Extra help is in it. She says it like weather.',
    'She reports the overage. Last sitting made the scale less of a surprise.',
  ]},
]);

registerModuleVariants('weekly.gamingSponsor.deal', [
  { when: { leftoverFed: true, archetype: 'gamer' }, weight: 4, text: [
    '{subject.name} has a snack sponsorship. Extra help already proved she can finish the boxes.',
    'A snack brand signs {subject.name}. Last sitting made the sample size honest.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} lands a sponsorship that sends food. Extra help already started the testing.',
    'Sponsorship boxes start showing up. Seconds from last night still in her when they arrive.',
  ]},
]);

registerModuleVariants('weekly.interventionFails.setup', [
  { when: { leftoverFed: true, archetype: 'sorority' }, weight: 4, text: [
    '{subject.name}\'s sisters stage an intervention. Extra help already in her when they sit down.',
    'The chapter plans a talk about appetite. Last sitting made the case before anyone spoke.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    'An intervention about {subject.name}\'s eating is planned. Extra help already ate the opening argument.',
    'Friends gather to confront {subject.name}. Seconds still showing. The mission is late.',
  ]},
]);

registerModuleVariants('weekly.artExhibition.opening', [
  { when: { leftoverFed: true, archetype: 'artsy' }, weight: 4, text: [
    '{subject.name}\'s senior show opens on abundance. Extra help already in the artist standing beside it.',
    'Her exhibition is all curves and bowls. Last sitting made the subject matter current.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name}\'s exhibition is all abundance — and so is she, extra help included.',
    'The gallery fills with work about appetite. She arrives already fed.',
  ]},
]);

registerModuleVariants('weekly.quietOpen.setup', [
  { when: { leftoverFed: true, archetype: 'quiet' }, weight: 4, text: [
    'After floor check-in, {subject.name} catches you packing up. Extra help still rounding her quiet.',
    '{subject.name} waits until the room empties. Last sitting made the linger easier.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    'After hall rounds, {subject.name} stays. Extra help still in the pause.',
    'She finds a moment when the hallway is quiet. Seconds still showing.',
  ]},
]);

registerModuleVariants('weekly.overachieverPivot.submit', [
  { when: { leftoverFed: true, archetype: 'overachiever' }, weight: 4, text: [
    '{subject.name} submits a revised season plan. Extra help already in the self-study.',
    '{subject.name} sends a revised proposal. Last sitting made the abstract honest.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} reframes her season plan around eating. Extra help already started the data.',
    'A new proposal arrives. Seconds still in her when she files it.',
  ]},
]);

registerModuleVariants('weekly.transferSettled.call', [
  { when: { leftoverFed: true, archetype: 'transfer' }, weight: 4, text: [
    '{subject.name} gets a call about transferring home. Extra help already voted stay.',
    'Her parents call about coming back. Last sitting made campus feel like the table.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} gets a call about leaving campus. Extra help still in her when she answers.',
    'Home asks if she wants to come back. Seconds already chose the dining hall.',
  ]},
]);

registerModuleVariants('weekly.thesisRewrite.submit', [
  { when: { leftoverFed: true, archetype: 'bookworm' }, weight: 4, text: [
    '{subject.name} slides a new outline across your desk. Extra help still in the wellness journal.',
    'A revised season plan arrives. Last sitting made the footnotes heavier.',
  ]},
  { when: { leftoverFed: true, archetype: 'swimmer' }, weight: 4, text: [
    '{subject.name} drops a revised season plan. Extra help still in the training block.',
    'Split columns updated. Last sitting made the bulk protocol honest.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} submits a revised season plan outline. Extra help already in the argument.',
    'Her revised outline shows up before desk hours. Seconds still rounding the author.',
  ]},
]);

registerModuleVariants('weekly.immobilityPeace.scene', [
  { when: { leftoverFed: true, endStageMin: 8 }, weight: 3, text: [
    'You find {subject.name} settled into the reinforced couch. Extra help already on the plate riding her belly.',
    '{subject.name} is sunk deep into reinforced furniture. Last sitting made the stillness easier.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} is settled deep into reinforced furniture, extra help still in her, eating comfortably.',
    'She has made a nest of cushions and plates. Seconds from last night still rounding the nest.',
  ]},
]);

registerModuleVariants('weekly.blobEnding.setup', [
  { when: { leftoverFed: true, endStageMin: 10 }, weight: 3, text: [
    '{subject.name} can no longer come to hall. You bring the floor to her. Extra help already holding court.',
    'The hall now travels to {subject.name}. Last sitting made the room the meeting.',
  ]},
  { when: { leftoverFed: true }, weight: 3, text: [
    '{subject.name} holds court from her room now. Extra help already in the welcome.',
    'Campus comes to her. Seconds still in her when the floor arrives.',
  ]},
]);
