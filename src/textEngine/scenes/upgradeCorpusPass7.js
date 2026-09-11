// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A3 Immobility, A6 Slender
// Pass 7 — leftover weekly fragments, opposition, origin, device ticks.
import { registerModuleVariants } from '../engine.js';

// ── leftover weekly fragments ─────────────────────────────────
registerModuleVariants('weekly.viralPost.line', [
  { when: { studentId: 2 }, weight: 5, text: [
    `"Two million. No filter. Just me." Kylie tilts the thumbnail so the old jeans look optimistic.`,
    'She shows the view count like a trophy and leaves the zipper in the frame.',
  ] },
  { when: { archetype: 'influencer', corruption: [2] }, weight: 3, text: [
    'She reads the comments that mention size first. Those are the keepers.',
  ] },
]);
registerModuleVariants('weekly.thesisRewrite.submit', [
  { when: { studentId: 1 }, weight: 5, text: [
    'Madeline slides the outline across like a verdict. Appetite dressed as method.',
  ] },
  { when: { studentId: 12 }, weight: 5, text: [
    'Nadia\'s revision arrives footnoted and fearless. The hypothesis is hunger.',
  ] },
]);
registerModuleVariants('weekly.gamingSponsor.tag', [
  { when: { studentId: 5 }, weight: 5, text: [
    `"Thorough research," you say. Destiny grins. "The most thorough."`,
  ] },
  { when: { archetype: 'gamer', corruption: [2] }, weight: 3, text: [
    'She treats the sample size like a high score and pats the chair that earned it.',
  ] },
]);
registerModuleVariants('weekly.interventionFails.turn', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany orders for six before the opening speech finishes. Chapter hospitality.',
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    'She came ready to defend herself. Menus arrive first. The defense becomes a reservation.',
  ] },
]);
registerModuleVariants('weekly.artExhibition.press', [
  { when: { studentId: 4 }, weight: 5, text: [
    'The review says opulent. Fiona tapes it at belly height beside the work.',
  ] },
  { when: { archetype: 'artsy' }, weight: 3, text: [
    'Visitors say lush and generous. She eats cheese and lets the words stick.',
  ] },
]);
registerModuleVariants('weekly.quietOpen.setup', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Maya waits until the room empties. Papers stacked. Then she stays.',
  ] },
  { when: { mood: 'nervous' }, weight: 3, text: [
    'She almost leaves, then doesn\'t. The hallway is finally quiet enough.',
  ] },
]);
registerModuleVariants('weekly.quietOpen.confession', [
  { when: { studentId: 8 }, weight: 5, text: [
    `"I like how I look now." Maya says it once, then looks at her middle instead of you.`,
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'She names the softness like a secret she is tired of carrying alone.',
  ] },
]);
registerModuleVariants('weekly.customClothing.tone', [
  { when: { studentId: 2 }, weight: 5, text: [
    'Kylie says custom like a premiere date. Pride, not panic.',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany sounds like she is filing a roster change. Satisfied with the sizes.',
  ] },
]);
registerModuleVariants('weekly.immobilityPeace.tag', [
  { when: { studentId: 8 }, weight: 5, text: [
    'You bring another plate. Maya accepts it without shifting much.',
  ] },
  { when: { studentId: 15 }, weight: 5, text: [
    'Lilith does not ask. Prey travels. Food arrives. She stays.',
  ] },
]);
registerModuleVariants('weekly.blobEnding.court', [
  { when: { studentId: 8 }, weight: 5, text: [
    'Students orbit Maya. She eats, talks, and keeps the room warm.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'She holds court from the furniture that was built around her. Plates keep coming.',
  ] },
]);
registerModuleVariants('weekly.uniformSplit.incident', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Captain demo, full stands, back seam gone. Brittany keeps the count for two more eights.',
  ] },
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany\'s chapter jacket loses the argument mid-hostess smile.',
  ] },
]);
registerModuleVariants('weekly.uniformSplit.recovery', [
  { when: { studentId: 0 }, weight: 5, text: [
    `"Take five." Chin up. The squad freezes; she does not.`,
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    'She finishes the count, then walks off like this was choreography she refused to name.',
  ] },
]);
registerModuleVariants('weekly.uniformSplit.afterDialogue', [
  { when: { studentId: 0 }, weight: 5, text: [
    `"Four sizes up. I'm still captain. Don't give me a look."`,
  ] },
  { when: { studentId: 6 }, weight: 5, text: [
    'Tiffany already emailed the seamstress. Hospitality includes bigger sashes.',
  ] },
]);
registerModuleVariants('weekly.chairBreaks.buildup', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Destiny\'s chair complains through the whole raid recap, then lists just enough to make her grab the desk.',
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé logs the creak as environmental data and keeps leaning back.',
  ] },
]);
registerModuleVariants('weekly.chairBreaks.break', [
  { when: { studentId: 5 }, weight: 5, text: [
    'She laughs once, surprised, already thinking about a sturdier drop rate.',
  ] },
  { when: { studentId: 13 }, weight: 5, text: [
    'Talia\'s seat drops with a crack that stops the room. She looks curious, not sorry.',
  ] },
]);
registerModuleVariants('weekly.chairBreaks.afterDialogue', [
  { when: { studentId: 5 }, weight: 5, text: [
    `"Thanks for not making it weird." She pats her middle. "I felt this coming."`,
  ] },
  { when: { studentId: 10 }, weight: 5, text: [
    `"I should've known," Reneé says, hand on her soft middle. It does not sound like a problem.`,
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.dodge', [
  { when: { studentId: 3 }, weight: 5, text: [
    'Serena treats the athletics scale like a rival she will not race until forced.',
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    'Brittany has been elsewhere every time the board asked for a number.',
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.forced', [
  { when: { studentId: 3 }, weight: 5, text: [
    'This week the office makes it mandatory. Serena goes in anyway.',
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.verdict', [
  { when: { studentId: 3 }, weight: 5, text: [
    `"Thirty-five over." She says it like a split she already knew.`,
  ] },
  { when: { studentId: 0, endStageMin: 5 }, weight: 5, text: [
    'Captain reports the overage like roster math. The grin stays off the clipboard.',
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.professional', [
  { when: { studentId: 3 }, weight: 5, text: [
    `"They were very professional about it." That matters more than the number.`,
  ] },
]);

// ── opposition leftovers ──────────────────────────────────────
registerModuleVariants('opposition.endgame.synthesis', [
  { when: {}, weight: 4, text: [
    'Scarcity folds. Every evolved girl risen, the pharmacist crowned, hunger on your side. Abundance swells quieter and surer.',
  ] },
]);
registerModuleVariants('opposition.endgame.capture', [
  { when: {}, weight: 4, text: [
    'Four seats already yours. The Board still gavel-taps, but famine cannot climb past a whisper.',
  ] },
]);
registerModuleVariants('opposition.endgame.banished', [
  { when: {}, weight: 4, text: [
    'The hollow act spends itself. Curses thin, plates fill, the class breathes like summer again.',
  ] },
]);
registerModuleVariants('opposition.endgame.allThin', [
  { when: {}, weight: 4, text: [
    'Thin skins, memory mass glowing under them. The class looks luminous and unafraid.',
  ] },
]);
registerModuleVariants('opposition.endgame.vance', [
  { when: {}, weight: 4, text: [
    'Vance folds. Hearings lose their teeth for a season. The Chair is yours in all but name.',
  ] },
]);
registerModuleVariants('opposition.agenda.wellness_audit', [
  { when: { studentId: 7 }, weight: 5, text: [
    'A clipboard finds Priya mid-meal. She answers with methodology and another bite.',
  ] },
]);
registerModuleVariants('opposition.agenda.shame_vigil', [
  { when: { studentId: 15 }, weight: 5, text: [
    'Candles outside. Lilith tastes the chill and calls it seasoning.',
  ] },
]);
registerModuleVariants('opposition.agenda.removal_hearing', [
  { when: { studentId: 0 }, weight: 5, text: [
    'They pick a name. Brittany treats the summons like a away-meet she intends to win.',
  ] },
]);

// ── origin leftovers (early game, A6) ─────────────────────────
registerModuleVariants('origin.stirring.line', [
  { when: { studentId: 1, stageMax: 3 }, weight: 4, text: [
    'Madeline meets the plate like a source she intends to annotate, then forgets the notes.',
    'Old discipline wants a citation. Appetite cites itself.',
  ] },
  { when: { studentId: 5, stageMax: 3 }, weight: 4, text: [
    'Destiny eats like a load-in. Hunger is the only queue that matters.',
    'Old raid snacks were fuel. This is something she wants to sit in.',
  ] },
  { when: { studentId: 7, stageMax: 3 }, weight: 4, text: [
    'Priya files the extra bite under optional. The file lies.',
    'Gold-star girl, ordinary plate, appetite already rewriting the rubric.',
  ] },
  { when: { studentId: 9, stageMax: 3 }, weight: 4, text: [
    'Chloé tastes home in a booth that is not Paris and stays anyway.',
    'The first extra bite arrives in English. She does not translate it away.',
  ] },
]);

// ── device tick leftovers (match existing grammar shapes) ─────
// device.tick.action = VERB PHRASE
registerModuleVariants('device.tick.action', [
  { when: { corruption: [0], gainStance: 'opposed' }, weight: 3, text: [
    'the {device.label} works through {subject.name}\'s week while she pretends it is still optional',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'the {device.label} keeps {subject.name} on a schedule she now defends',
  ] },
]);
// device.tick.growth = PARTICIPLE / clause
registerModuleVariants('device.tick.growth', [
  { when: { studentId: 2 }, weight: 4, text: [
    'softness arriving on Kylie in footage-ready inches',
  ] },
  { when: { studentId: 5 }, weight: 4, text: [
    'another layer settling into Destiny while she stays seated',
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'softness arriving where she can hide it from everyone but the mirror',
  ] },
]);
// device.tick.sensation = PARTICIPLE CLAUSE
registerModuleVariants('device.tick.sensation', [
  { when: { mood: 'content' }, weight: 3, text: [
    'warm pressure blooming where the week\'s calories decided to stay',
  ] },
  { when: { mood: 'curious' }, weight: 3, text: [
    'a new tightness she keeps checking with the flat of her hand',
  ] },
]);
registerModuleVariants('device.tick.dependence', [
  { when: { corruption: [2] }, weight: 3, text: [
    'she reaches for the {device.label} the way other people reach for breakfast',
  ] },
  { when: { gainStance: 'reluctant' }, weight: 3, text: [
    'she tells herself it is still a tool, then waits for the next cycle anyway',
  ] },
]);
