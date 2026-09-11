// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A3 Immobility
// Pass 6 — leftover weekly beats, cultivator growth/harvest, talk leftovers.
import { registerModuleVariants } from '../engine.js';

registerModuleVariants('weekly.viralPost.hook', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie posts the old-jeans attempt and leaves the zipper in the frame.',
    'She films the fail, laughs once, and does not cut away from the strain.',
  ] },
  { when: { archetype: 'influencer', corruption: [2] }, weight: 3, text: [
    '{subject.name} posts the strain on purpose. Rebrand starts at the button.',
  ] },
]);
registerModuleVariants('weekly.viralPost.reaction', [
  { when: { corruption: [0], gainStance: 'opposed' }, weight: 3, text: [
    'Comments pile up. {subject.name} closes the app, then opens it again to look at herself.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'She reads the comments like applause and saves the ones that mention size.',
  ] },
]);
registerModuleVariants('weekly.thesisRewrite.title', [
  { when: { studentId: 1 }, weight: 5, text: [
    'Madeline\'s title is dry and lethal. Appetite dressed as methodology.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'Nadia names the dynamic in the title and does not blink.',
  ] },
]);
registerModuleVariants('weekly.thesisRewrite.verdict', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Priya watches you approve it like another metric just turned gold.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Approved. She treats the signature as permission to eat for the field.',
  ] },
]);
registerModuleVariants('weekly.gamingSponsor.deal', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Sponsor wants longer streams and a softer silhouette. Destiny calls it a buff.',
  ] },
  { when: { archetype: 'gamer' }, weight: 3, text: [
    'The brand likes her in the chair. The chair likes her more each week.',
  ] },
]);
registerModuleVariants('weekly.gamingSponsor.line', [
  { when: { studentId: 5 }, weight: 5, text: [
    `"They pay me to sit and eat on stream. I was going to do that anyway."`,
  ] },
]);
registerModuleVariants('weekly.interventionFails.setup', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Squad "wellness" talk. Brittany listens like a captain taking a bad play-call.',
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    'They come with concern. {subject.name} comes with a plate. The plate lasts longer.',
  ] },
]);
registerModuleVariants('weekly.interventionFails.payoff', [
  { when: { corruption: [2] }, weight: 3, text: [
    'The intervention ends at the dining hall. She buys a tray for the road.',
  ] },
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany thanks them for coming and then hosts dessert. Chapter policy.',
  ] },
]);
registerModuleVariants('weekly.artExhibition.opening', [
  { when: { studentId: 4 }, weight: 5, text: [
    'Fiona hangs the appetite series at belly height. Viewers have to look up.',
  ] },
  { when: { archetype: 'artsy' }, weight: 3, text: [
    'The opening snacks disappear first. The work is about that. She knows.',
  ] },
]);
registerModuleVariants('weekly.artExhibition.line', [
  { when: { studentId: 4 }, weight: 5, text: [
    `"The subject cooperates," Fiona says, meaning the mouth.`,
  ] },
]);
registerModuleVariants('weekly.overachieverPivot.submit', [
  { when: { studentId: 7 }, weight: 5, text: [
    'Priya\'s revised proposal has a gold column hiding in the methods. You can see it.',
  ] },
]);
registerModuleVariants('weekly.overachieverPivot.verdict', [
  { when: { studentId: 7 }, weight: 5, text: [
    'You approve it. She beams like GPA and gain just shook hands.',
  ] },
]);
registerModuleVariants('weekly.transferSettled.call', [
  { when: { studentId: 9 }, weight: 5, text: [
    'Parents ask if Chloé wants Paris back. The dining-hall booth is already listening.',
  ] },
]);
registerModuleVariants('weekly.transferSettled.answer', [
  { when: { studentId: 9 }, weight: 5, text: [
    `"No. I think I am where I am supposed to be." She says it in English on purpose.`,
  ] },
]);
registerModuleVariants('weekly.transferSettled.after', [
  { when: { studentId: 9, stageMin: 5 }, weight: 5, text: [
    'She hangs up, pats the apple middle, and walks to the booth that knows her order.',
  ] },
]);
registerModuleVariants('weekly.customClothing.announce', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie posts the fitting like content. The tape measure is the caption.',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Captain sizes up. Brittany treats the order like roster paperwork.',
  ] },
]);
registerModuleVariants('weekly.customClothing.line', [
  { when: { corruption: [2] }, weight: 3, text: [
    `"Make it bigger than you think. Then bigger than that."`,
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    `She emails the seamstress from a private thread and smiles at the screen.`,
  ] },
]);
registerModuleVariants('weekly.immobilityPeace.scene', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya does not get up. The room comes to her. She looks settled, not stuck.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith chose the chair and kept it. Prey can travel. She does not need to.',
  ] },
]);
registerModuleVariants('weekly.immobilityPeace.line', [
  { when: { studentId: 8 }, weight: 5, text: [
    `"More." She does not decorate it.`,
  ] },
]);
registerModuleVariants('weekly.blobEnding.setup', [
  { when: { studentId: 8 }, weight: 5, text: [
    'The furniture has been rearranged around Maya. She approved the map with a nod.',
  ] },
]);
registerModuleVariants('weekly.blobEnding.line', [
  { when: { corruption: [2] }, weight: 3, text: [
    'She is the room now. Plates arrive. She is pleased.',
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.afterDialogue', [
  { when: { studentId: 0 }, weight: 5, text: [
    `"File it under W. Don't tell Coach the grin." Brittany is already walking toward food.`,
  ] },
  { when: { studentId: 3 }, weight: 5, text: [
    `Serena looks at the number like a new event. "Different meet. Same me."`,
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.afterLook', [
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'She keeps her face closed and her body loud. The look you get is private.',
  ] },
]);

// ── cultivator growth / harvest aftermath ─────────────────────
const GROWTH = {
  'cultivator.growth.s5.j1': 'Reneé logs the extra inch at the waistband like a yield report, then reaches for the notebook with a thicker arm.',
  'cultivator.growth.s5.j2': 'She sits longer before writing. The couch takes more of her; the pen feels smaller; she calls it expected.',
  'cultivator.growth.s5.j3': 'Hours in the warm kitchen. She is larger when you check, calm, inward, cycle complete.',
  'cultivator.growth.s6.j1': 'The waddle announces the harvest before she does. She notes the sway and keeps writing.',
  'cultivator.growth.s6.j2': 'Thighs rub, belly lower, handwriting softer. She approves the measurement with a palm.',
  'cultivator.growth.s6.j3': 'She stays put, very fat, very still, pleased with how the mass found every spare inch.',
  'cultivator.growth.s7.j1': 'Leverage to stand. Narrower paths. She touches the new softness like a result she ordered.',
  'cultivator.growth.s7.j2': 'The couch dips. She watches the room shrink around her and writes: correct.',
  'cultivator.growth.s7.j3': 'A warm mountain in the kitchen when you visit. Eyes calm. Processing on schedule.',
  'cultivator.growth.s8.j1': 'Doorframes get a firmer brush. She logs width the way other people log weather.',
  'cultivator.growth.s8.j2': 'Pendulous, spreading, breathing through integration. The work keeps succeeding.',
  'cultivator.growth.s9.j1': 'Nearly immobile, fully reorganized apartment, mental log first. Culmination, as designed.',
  'cultivator.growth.blob': 'She fills the living space on purpose. Kitchen still works. She is exactly where the recipe ends.',
};

for (const [key, text] of Object.entries(GROWTH)) {
  registerModuleVariants(key, [
    { when: { studentId: 10 }, weight: 5, text: [text] },
    { when: {}, weight: 3, text: [text] },
  ]);
}

registerModuleVariants('cultivator.harvest.planned.heavy.t6', [
  { when: {}, weight: 4, text: [
    'Scheduled tasting, scheduled harvest. Reneé logs the transfer with flour still on her hands.',
  ] },
]);
registerModuleVariants('cultivator.harvest.planned.colossal.t10', [
  { when: {}, weight: 4, text: [
    'Maximum yield, apartment rearranged, Reneé exactly as large as the plan required.',
  ] },
]);
registerModuleVariants('cultivator.recruitment', [
  { when: { studentId: 10 }, weight: 4, text: [
    'Reneé explains the tasting like hospitality. The kitchen is already listening.',
  ] },
]);

// ── more dinner / talk leftovers ──────────────────────────────
registerModuleVariants('dinner.conv.food_talk_dinner', [
  { when: { studentId: 14 }, weight: 5, text: [
    'Mary Jane talks harvest and butter in the same sentence, then proves both.',
  ] },
]);
registerModuleVariants('weekly.quietOpen.close', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya lets the quiet finish the confession. Then she eats.',
  ] },
]);
