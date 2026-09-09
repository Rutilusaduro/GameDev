// The Squad — Lead: A1 Mobile | Support: A5 Editor
// Stage-keyed + per-student depth for group dinner reaction pools.
import { registerModuleVariants } from '../../engine.js';

registerModuleVariants('dinner.reaction.thinJealousy', [
  { when: { stageMin: 8, reactionLevel: 3 }, weight: 3, text: [
    `{subject.name} watches {ref.name} settle into her chair — vast, warm, unmistakably fed. "I want that," she says, quiet and certain.`,
    `At {subject.lbs} lbs she still looks hungry beside {ref.name}. Her fingers drum the table. "Teach me," she murmurs.`,
  ]},
  { when: { stageMin: 5, stageMax: 7, reactionLevel: 2 }, weight: 2, text: [
    `{subject.name} traces the rim of her empty plate. "You make it look easy," she tells {ref.name}. "I keep stopping."`,
  ]},
  { when: { corruption: [2], reactionLevel: 3 }, weight: 3, text: [
    `{subject.name} leans close to {ref.name}'s full middle. "Next time," she whispers, "I eat like you. No excuses."`,
  ]},
  { when: { studentId: 0, reactionLevel: 2 }, weight: 4, text: [
    `Brittany watches {ref.name} with captain's envy. "That's leadership," she says. "I'm taking notes."`,
  ]},
  { when: { studentId: 2, reactionLevel: 2 }, weight: 4, text: [
    `Kylie films {ref.name}'s plate, then her own empty one. "Content gap," she mutters. "Fixing that tonight."`,
  ]},
  { when: { studentId: 4, reactionLevel: 2 }, weight: 4, text: [
    `Fiona watches {ref.name} eat like prophecy. "I saw this," she whispers. "I just didn't know I'd want it."`,
  ]},
  { when: { studentId: 5, reactionLevel: 2 }, weight: 4, text: [
    `Destiny checks the scoreboard in her head. "{ref.name} is winning," she says. "New objective unlocked."`,
  ]},
  { when: { studentId: 7, reactionLevel: 2 }, weight: 4, text: [
    `Priya reviews {ref.name}'s intake with professional respect. "Benchmark exceeded," she notes. "I require calibration."`,
  ]},
  { when: { studentId: 8, reactionLevel: 3 }, weight: 4, text: [
    `Maya rests her hand on {ref.name}'s soft side — brief, reverent. "Warm," she says. She does not pull away quickly.`,
  ]},
  { when: { studentId: 10, reactionLevel: 2 }, weight: 4, text: [
    `Reneé inhales {ref.name}'s course like aroma. "Exquisite appetite," she says. "I am taking inspiration."`,
  ]},
  { when: { studentId: 12, reactionLevel: 2 }, weight: 4, text: [
    `Nadia observes {ref.name} with clinical hunger. "Resident demonstrates optimal satiety response," she notes aloud.`,
  ]},
  { when: { studentId: 15, reactionLevel: 3 }, weight: 4, text: [
    `Lilith watches {ref.name} without blinking. "Good," she says. "I want more of that. Starting with me."`,
  ]},
]);

registerModuleVariants('dinner.reaction.fatEncourage', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `{subject.name} beams at {ref.name}'s enormous belly. "Keep going," she says. "The table isn't full until you're full."`,
    `{ref.name} glows — vast, fed, radiant. {subject.name} raises her glass. "To appetite," she says. "Real appetite."`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    `{subject.name} nudges the bread basket toward {ref.name}. "You're doing beautifully," she says. "Don't stop on my account."`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `{subject.name} watches {ref.name} eat with open delight. "More," she urges. "I want to see you hit the ceiling tonight."`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany claps once, proud. "There she is," she tells {ref.name}. "Eat like the team depends on it."`,
  ]},
  { when: { studentId: 6 }, weight: 4, text: [
    `Tiffany slides dessert menus across. "Chapter standard," she tells {ref.name}. "You're exceeding it. Gorgeous."`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé kisses {ref.name}'s cheek, laughing. "Magnifique," she says. "Encore. Always encore."`,
  ]},
  { when: { studentId: 13 }, weight: 4, text: [
    `Daisy refills {ref.name}'s water and smiles. "Seconds are a love language," she says. "You're fluent."`,
  ]},
  { when: { studentId: 14 }, weight: 4, text: [
    `Mary Jane whoops softly. "Now that's a happy belly," she tells {ref.name}. "Bless your appetite."`,
  ]},
  { when: { studentId: 17 }, weight: 4, text: [
    `Indiana grins at {ref.name}'s spread. "Artifact uncovered," she says. "Keep digging. I'll cheer."`,
  ]},
]);

registerModuleVariants('dinner.reaction.fatRetort', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `{ref.name} pats her heavy middle without breaking eye contact. "Jealousy," she says, amused. "Eat something."`,
    `{ref.name} does not apologize for her appetite. "Watch closer," she tells {subject.name}. "You'll learn."`,
  ]},
  { when: { corruption: [2] }, weight: 3, text: [
    `{ref.name} feeds herself another bite, slow and deliberate. "You could have this too," she says. "If you stopped pretending you don't want it."`,
  ]},
  { when: { studentId: 2 }, weight: 4, text: [
    `Kylie angles her phone at her own plate, then {subject.name}'s. "Plot twist," she says. "I eat on camera now. Your loss."`,
  ]},
  { when: { studentId: 3 }, weight: 4, text: [
    `Serena cracks her knuckles. "Stats don't lie," she tells {subject.name}. "I'm winning. Eat up or sit down."`,
  ]},
  { when: { studentId: 5 }, weight: 4, text: [
    `Destiny deadpans. "Skill issue," she tells {subject.name}. "Git gud. Git fed."`,
  ]},
  { when: { studentId: 10 }, weight: 4, text: [
    `Reneé tastes the air like spice. "Envy is an underseasoned emotion," she tells {subject.name}. "Try abundance instead."`,
  ]},
  { when: { studentId: 15 }, weight: 4, text: [
    `Lilith does not look up from her plate. "Hungry people talk," she says. "Fed people eat. Choose."`,
  ]},
]);

registerModuleVariants('dinner.reaction.unbutton', [
  { when: { stageMin: 8 }, weight: 3, text: [
    `{subject.name} exhales, fingers finding the stubborn button. At {subject.lbs} lbs it surrenders with a soft pop — relief immediate, belly spilling free.`,
    `The waistband finally loses. {subject.name} sighs, vast and pleased, hands settling on warm exposed softness.`,
  ]},
  { when: { stageMin: 5, stageMax: 7 }, weight: 2, text: [
    `{subject.name} works the button loose, cheeks pink. "Worth it," she murmurs, belly easing out with a grateful breath.`,
  ]},
  { when: { corruption: [2], fullnessMin: 1.2 }, weight: 3, text: [
    `{subject.name} pops the button without embarrassment — belly surging free, heavy and warm. "Better," she says, already reaching for more.`,
  ]},
  { when: { studentId: 0 }, weight: 4, text: [
    `Brittany frees the button like a pep rally win. "Room to grow," she says, patting her middle. "Always room."`,
  ]},
  { when: { studentId: 8 }, weight: 4, text: [
    `Maya works the button loose with careful fingers. She exhales — quiet relief — and does not cover herself.`,
  ]},
  { when: { studentId: 9 }, weight: 4, text: [
    `Chloé laughs as the button gives. "Voilà," she says, belly spilling soft and unapologetic. "Comfort, enfin."`,
  ]},
  { when: { studentId: 11 }, weight: 4, text: [
    `Kaylee blushes, then smiles as the waistband eases. "Oh," she breathes. "That's… nice."`,
  ]},
]);
