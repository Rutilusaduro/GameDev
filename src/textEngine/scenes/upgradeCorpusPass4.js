// The Squad — Lead: A5 Editor | Support: A2 Psych, A1 Mobile, A6 Slender
// Pass 4 — evolved diary chapters, leftover diaryBase, talk fragments,
// weekly/opposition/wife-lessons/cultivator/feast state depth.
import { registerModuleVariants } from '../engine.js';

function ch(form, extras) {
  registerModuleVariants(`diary.${form}.c1`, extras);
}

function diaryArc(key, extras) {
  registerModuleVariants(key, extras);
}

// ── evolved diary chapters ────────────────────────────────────
ch('sumo', [
  { when: { season: 'winter' }, weight: 3, text: [
    'Winter chanko steams the warmup hall. I eat because the ring will ask for the weight later.',
    'Cold outside, heat in the bowl. I keep adding until the robe sits differently.',
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    'I wrote the number and then sat with it. Dana would have known what to do with a number like that.',
    'Between bouts I eat because the coach pointed at the pot. Understanding can come later.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'I ate through the bracket on purpose. Weight is the argument. I am the argument.',
    'Dana watched me finish a bowl she would have saved. I did not save it.',
  ] },
  { when: { mood: ['focused'] }, weight: 2, text: [
    'I treated the pot like footwork: repeat, lower, commit.',
  ] },
]);

ch('eating_competitor', [
  { when: { season: 'winter' }, weight: 3, text: [
    'Winter circuit. Heater on, belly full, hands on the wheel. I felt correct in the dark.',
    'Cold parking lots, hot food, a timer that does not care about weather. I cleared it anyway.',
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    'I finished early and sat on my hands. Pride would have been simpler than this quiet.',
    'The flyer has my face. I keep looking at it like a photo of someone mid-becoming.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Records are paperwork. Appetite is the job. I clocked in.',
    'I ate through the signing meeting and everyone called it on-brand. Fine.',
  ] },
]);

ch('feedee_creator', [
  { when: { mood: ['excited'] }, weight: 3, text: [
    'Chat climbed while I chewed. I left the camera honest. Wren texted a heart from her chair.',
    'Collab night. Two plates, one angle, no apology in the caption.',
  ] },
  { when: { corruption: [0] }, weight: 2, text: [
    'I posted the sitting shot and then sat with the sitting shot. Comments did the rest.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Format is: we eat, we grow, the lens stays. I stopped calling it a bit.',
  ] },
]);

ch('body_positive_creator', [
  { when: { corruption: [0] }, weight: 2, text: [
    'I filmed the soft truth and almost added a joke. I left the joke out.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Message unchanged: your body is good. Mine is the proof I keep feeding.',
  ] },
  { when: { season: 'summer' }, weight: 2, text: [
    'Summer light is rude and useful. I let it show the new width.',
  ] },
]);

ch('eating_captain', [
  { when: { studentId: 0 }, weight: 5, text: [
    'I ran the table the way I used to run the floor. Scoreboard was the empty pans.',
    'Squad watched their captain eat first. I made sure there was a first.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Leadership today: sit, finish, let them copy the finish.',
  ] },
]);

ch('big_squad_captain', [
  { when: { mood: ['happy', 'excited'] }, weight: 3, text: [
    'Pep from a chair. They chanted. I ate. Morale had hips.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Policy is appetite. I signed it with a clean plate.',
  ] },
]);

ch('eating_diarist', [
  { when: { corruption: [0] }, weight: 2, text: [
    'I wrote around the hunger for a page and then gave the hunger the page.',
  ] },
  { when: { mood: ['focused'] }, weight: 2, text: [
    'Entry structure: what I ate, what stayed, what I will not cut tomorrow.',
  ] },
]);

ch('food_researcher', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Hypothesis: fullness improves recall. I tested it at the bench and at the table.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Yield is me. I published that in the lab notes and then had seconds.',
  ] },
]);

ch('eating_streamer', [
  { when: { studentId: 5 }, weight: 5, text: [
    'Stream stayed up. I stayed in the chair. Chat donated a second dinner I did not refuse.',
    'I lost the match and won the plate. Chat called it content. I called it dinner.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Format locked: one hand on the game, the rest of me on the food.',
  ] },
]);

ch('speed_eater', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Timer honest. I was faster than I felt ready to be. The plate was still empty.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Speed was the trick. Appetite is the career. I clocked both.',
  ] },
]);

ch('ranked_feedee', [
  { when: { corruption: [2] }, weight: 2, text: [
    'Leaderboard at chair height. I updated first without standing.',
  ] },
  { when: { mood: ['excited'] }, weight: 2, text: [
    'Rank held. Mass climbed. I screenshotted the pair like a clear.',
  ] },
]);

ch('chapter_hostess', [
  { when: { studentId: 6 }, weight: 5, text: [
    'Wednesday feast. I sat down at my own table and let someone refill me. First time. Correct time.',
    'Hostess ate. Chapter followed. I filed that under leadership, not accident.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Hospitality without standing. Abundance as furniture. I approved the floor plan.',
  ] },
]);

ch('body_positive_greek', [
  { when: { corruption: [2] }, weight: 2, text: [
    'Sisterhood ate because I ate. Message louder at this scale.',
  ] },
  { when: { season: 'fall' }, weight: 2, text: [
    'Fall rush, fuller plates, I blessed both.',
  ] },
]);

ch('installation_artist', [
  { when: { studentId: 4 }, weight: 5, text: [
    'The installation is a body in a room. Tonight the body is mine and the room agrees.',
    'I pinned another print. No caption. The fullness did the caption.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'I am medium and maker. More plates, more form.',
  ] },
]);

ch('food_photographer', [
  { when: { corruption: [0] }, weight: 2, text: [
    'I shot the plate and then became the second subject in the reflection.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Light loves oil and skin. I gave it both.',
  ] },
]);

ch('anonymous_blogger', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Posted without a name. The comments still found the waist in the prose.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Anonymity is a thin coat. The appetite shows anyway.',
  ] },
]);

ch('asmr_creator', [
  { when: { corruption: [2] }, weight: 2, text: [
    'Mic caught the swallow and the chair. I left both in the cut.',
  ] },
  { when: { mood: ['content'] }, weight: 2, text: [
    'Soft sounds, heavier body. The audience paid for the honesty.',
  ] },
]);

ch('home_nest', [
  { when: { stageMin: 7 }, weight: 3, text: [
    'Delivery knocked. I did not get up until the bag was in my hands. Nest logic.',
    'The apartment has a radius now. I am the radius.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Order in, settle, grow. I wrote it like a house rule.',
  ] },
]);

ch('delivery_hive', [
  { when: { corruption: [2] }, weight: 2, text: [
    'Routes come to me. I taste, dispatch, keep a share. Queen math.',
  ] },
  { when: { mood: ['focused'] }, weight: 2, text: [
    'Hive notes: volume up, chair complaining, I stayed seated.',
  ] },
]);

ch('campus_legend', [
  { when: { campusFattening: true }, weight: 3, text: [
    'Booth is mine. Campus is softer this term and still orients to the booth.',
    'They leave the corner open. I fill it. Legend is a seating arrangement.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'I eat in public on purpose. The story writes itself in trays.',
  ] },
]);

ch('food_tourist', [
  { when: { season: 'summer' }, weight: 3, text: [
    'Summer circuit of kitchens. I came home wider than the itinerary.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Expedition log: hip, belly, another stamp. I am the souvenir.',
  ] },
]);

ch('ff_author', [
  { when: { corruption: [0] }, weight: 2, text: [
    'I wrote a scene I have started living and then closed the laptop to eat.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Chapter and body are the same draft. I keep adding pages.',
  ] },
]);

ch('homestead_queen', [
  { when: { studentId: 14 }, weight: 5, text: [
    'Garden late-summer logic: if it is heavy, it is healthy. I put my hands on my middle.',
    'Harvest does not apologize. I plated myself the same way I plate the table.',
  ] },
  { when: { season: 'fall' }, weight: 2, text: [
    'Fall cellar, extra butter, extra me. I blessed the jars and the jeans.',
  ] },
]);

ch('state_fair_queen', [
  { when: { season: 'summer' }, weight: 3, text: [
    'Fair heat, fried everything, a sash that learned new geography.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'I entered the appetite category and judged myself first.',
  ] },
]);

ch('wife_lessons', [
  { when: { studentId: 14 }, weight: 4, text: [
    'Kitchen theology: fat is what makes a house sit right. I taught it with my own plate.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Daughters at the table, mothers reaching, I kept the pans coming.',
  ] },
]);

ch('psych_researcher', [
  { when: { studentId: 12 }, weight: 5, text: [
    'I named the dynamic mid-bite and took another bite. Meta-awareness is not a brake.',
    'Literature review includes me. I highlighted my own margin note and kept eating.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Researcher, subject, analyst: one chair. I fed all three.',
  ] },
]);

ch('homeroom_queen', [
  { when: { corruption: [2] }, weight: 2, text: [
    'Apprentice hours ended when I started handing plates like I owned the recipe.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter bake, extra proof time, extra me in the chair by the oven.',
  ] },
]);

ch('cultivator', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Taste-test notes: tester clean plate, my own spoon in the batch. Quality control. Always.',
    'I watched her eat my work and felt the recipe land in two bodies.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'I am cultivating more than batter. The kitchen knows.',
  ] },
]);

ch('community_researcher', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Case notes keep slipping into first person. I left them there.',
  ] },
  { when: { corruption: [2] }, weight: 2, text: [
    'Community is a table. I am the heaviest data point and I am fine with that.',
  ] },
]);

registerModuleVariants('diary.lilith', [
  { when: { stageMin: 6, corruption: [2] }, weight: 3, text: [
    'I sat. Campus adjusted. Three things arrived. I accepted the largest.',
    'Hunt is a posture. I have not needed to stand to keep it.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter dark comes early. I stay. Warmth comes to the chair.',
  ] },
]);

registerModuleVariants('diary.innerBeat', [
  { when: { season: 'winter', stageMin: 3 }, weight: 2, text: [
    'Winter layers hide the week. I still know the week. I added to it.',
  ] },
  { when: { season: 'summer', stageMin: 3 }, weight: 2, text: [
    'Summer clothes told on me in a doorway. I went through it anyway.',
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    'I am not writing the want in the open. I am writing around it. The want still ate.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
    'I logged a cutback I will not start tonight. The entry after this one is dinner.',
  ] },
]);

// ── leftover diaryBase arcs ───────────────────────────────────
diaryArc('diary.fiona.subject', [
  { when: { mood: ['focused', 'observant'] }, weight: 2, text: [
    'Studio light, no performance. I let the timer click and developed the honest frame.',
  ] },
  { when: { season: 'spring' }, weight: 2, text: [
    'Spring show wants a subject. I have one pinned above the desk without a caption.',
  ] },
]);

diaryArc('diary.chloe.americaine', [
  { when: { mood: ['content'] }, weight: 2, text: [
    'À Maman: I am happy here. The smallness I packed is an old dress.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'À Maman: winter coats hide less than they promise. I have been to the crêperie again.',
  ] },
]);

diaryArc('diary.kaylee.patient', [
  { when: { mood: ['content'] }, weight: 2, text: [
    'No chart tonight. Soft, warm, full. I approved the care and closed the binder.',
  ] },
  { when: { relationship: [2, 3] }, weight: 2, text: [
    'He keeps showing up in the notes as a warmth I am not correcting.',
  ] },
]);

diaryArc('diary.talia.justification', [
  { when: { mood: ['focused'] }, weight: 2, text: [
    'Three pages of real papers. Also hunger. Both true. I ate after the citations.',
  ] },
  { when: { stageMin: 5 }, weight: 2, text: [
    'Lab scale bigger than spring. I wrote the number larger. Then I drew a face.',
  ] },
]);

// ── leftover talk-suggest fragments (keep grammar shape) ──────
registerModuleVariants('talk.suggest_indulgence.b00._f2', [
  { when: {}, weight: 4, text: [
    `"I was just thinking I wanted something warm," she says, surprised at her own mouth. At {subject.lbs} lbs the thought arrives in the belly first.`,
    `"Why am I hungry?" she asks the room, already touching the place that answered.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b00._f3', [
  { when: {}, weight: 4, text: [
    `. I ate an hour ago." She laughs once. "Didn't I? I did. I think I did."`,
    `. That cannot be right. I had lunch." Her stomach answers anyway.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b00._f4', [
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'The idea takes a seat behind her ribs. She will not name you as the source. She will still follow it.',
  ] },
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    'She almost argues with the suggestion, then stands as if the argument lost on its feet.',
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b01._f2', [
  { when: {}, weight: 4, text: [
    `"Do you smell food? I swear—" She inhales. At {subject.lbs} lbs the rumble is still a surprise she puts a hand over.`,
    `"Sorry. I lost the sentence. I want— food, I think. That's new timing."`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b01._f3', [
  { when: {}, weight: 4, text: [
    `. The surprise has a short half-life.`,
    `. She will stop being startled by her own appetite soon.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b10._f2', [
  { when: {}, weight: 4, text: [
    `. "I need to eat. I don't have a prettier sentence for it."`,
    `. "Something big. I can feel the size of the want from here."`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b11._f1', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya nods at a sentence you barely said. "Second dinner. Yes." Her {subject.lbs}-lb body has already stood.`,
  ] },
  { when: { studentId: 0 }, weight: 5, text: [
    `Brittany slaps her middle like a playbook. "Second dinner. Don't tell the squad. Or do. I'm going."`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b11._f2', [
  { when: {}, weight: 4, text: [
    `. A heading. A map. She is already walking it.`,
    `. She treats it like a door she has decided to use.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b20._f2', [
  { when: {}, weight: 4, text: [
    `At {subject.lbs} lbs she is vast enough that your intent lands like a hand she already expected.`,
    `She does not make you finish the sentence. She makes space for the meal instead.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b20._f3', [
  { when: {}, weight: 4, text: [
    `. Like you already pressed there." She sets your palm on the heat. "Eat. Always."`,
    `. I can feel the order in my gut." She smiles, heavy and sure.`,
  ] },
]);
registerModuleVariants('talk.suggest_indulgence.b21._f2', [
  { when: {}, weight: 4, text: [
    `. "Say it. At {subject.lbs} lbs I am tuned for you — I want the instruction."`,
    `. "I will do the hungry thing. You only have to aim me."`,
  ] },
]);

registerModuleVariants('talk.suggest_growth.b00._f2', [
  { when: {}, weight: 4, text: [
    `. A tilt she has not named, already happening under her palm.`,
    `. The new idea has mass. She can feel it land.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b00._f3', [
  { when: { gainStance: 'opposed' }, weight: 3, text: [
    `"Nobody talks about it like a gift." She keeps her hand on her belly anyway. The pink in her face stays.`,
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    `"Don't say it louder." She does not take her hand away. "I heard you."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b00._f4', [
  { when: {}, weight: 4, text: [
    `. She stays in the chair and lets the sentence finish inside her.`,
    `. The refusal she owes herself does not arrive.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b01._f2', [
  { when: {}, weight: 4, text: [
    `"Ridiculous," she says, still measuring the new give at {subject.lbs} lbs as if numbers might argue back.`,
    `She calls it abstract. Her hand has already picked a destination.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b01._f3', [
  { when: {}, weight: 4, text: [
    `. Want is arriving on schedule.`,
    `. She is already leaning toward the heavier version.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b10._f2', [
  { when: {}, weight: 4, text: [
    `. On purpose." At {subject.lbs} lbs her body has been making the same point for weeks.`,
    `. Chosen." She says it like a dare she hopes you will accept.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b11._f2', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya maps her own belly with both hands. "Arrive. Yes."`,
  ] },
  { when: {}, weight: 3, text: [
    `She does not reject the destination. She inventories the weight she already has and nods once.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b20._f2', [
  { when: {}, weight: 4, text: [
    `. She is huge and she is still pointing forward." Her hands span the belly like a promise.`,
    `. The next size already has a face. She looks pleased about that.`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b21._f2', [
  { when: {}, weight: 4, text: [
    `Warm mass under your palm, still adding. "Tell it I am not finished," she whispers.`,
    `She keeps your hand there. "Talk to the project. It listens better than I do."`,
  ] },
]);
registerModuleVariants('talk.suggest_growth.b21._f3', [
  { when: {}, weight: 4, text: [
    `. "—tell it I look like this on purpose."`,
    `. "—tell it you can see how far I intend to go."`,
  ] },
]);

// ── weekly events ─────────────────────────────────────────────
registerModuleVariants('weekly.uniformSplit.incident', [
  { when: { studentId: 0, stageMin: 5 }, weight: 5, text: [
    'Captain tryouts, her call. The uniform pops along the seam she has been ignoring since weigh-in.',
    'Sash versus middle. The sash loses in front of the juniors she is about to run.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
    'The split happens and {subject.name} looks down like the fabric betrayed a story she was still telling.',
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 3, text: [
    'Seam goes; {subject.name} finishes the count anyway, as if the pop were choreography.',
  ] },
]);
registerModuleVariants('weekly.uniformSplit.afterDialogue', [
  { when: { studentId: 0 }, weight: 5, text: [
    `"Four sizes. Still captain. If Athletic Director asks, I handled it." She is already texting a seamstress.`,
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    `She finds you after. "Please tell no one. Also I am ordering bigger. These facts are roommates."`,
  ] },
]);
registerModuleVariants('weekly.chairBreaks.buildup', [
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 6 }, weight: 3, text: [
    'The chair meets her hips first and starts the complaint early.',
    'Seat width was a rumor; {subject.name} is the correction.',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 6 }, weight: 3, text: [
    'Her middle arrives on the wood like a verdict the carpenter did not schedule.',
  ] },
]);
registerModuleVariants('weekly.chairBreaks.afterDialogue', [
  { when: { corruption: [2] }, weight: 3, text: [
    `"New chair. I earned the breakage." She pats the warm wreck of her middle.`,
  ] },
  { when: { corruption: [0], gainStance: 'opposed' }, weight: 3, text: [
    `After class she admits the creak had been a warning she filed under later.`,
  ] },
]);
registerModuleVariants('weekly.teamWeighIn.verdict', [
  { when: { studentId: 0 }, weight: 5, text: [
    'Coach reads the number twice. Brittany files it under W and does not look at the squad.',
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    'The number is public. {subject.name} treats her face like a closed tab.',
  ] },
]);
registerModuleVariants('weekly.viralPost.line', [
  { when: { studentId: 2 }, weight: 5, text: [
    `Kylie captions nothing. The jeans do the talking. She leaves the take up.`,
  ] },
  { when: { archetype: 'influencer', corruption: [2] }, weight: 3, text: [
    `She posts the strain on purpose. Rebrand is a zipper that lost.`,
  ] },
]);
registerModuleVariants('weekly.quietOpen.confession', [
  { when: { studentId: 8 }, weight: 5, text: [
    `Maya says "more" and then does not decorate it. The office holds the word.`,
  ] },
  { when: { gainStance: 'secret' }, weight: 3, text: [
    `She admits the want like a leak she has decided to stop patching.`,
  ] },
]);

// ── opposition ────────────────────────────────────────────────
registerModuleVariants('opposition.agenda.wellness_audit', [
  { when: { campusFattening: true }, weight: 3, text: [
    'Clipboard versus a dining hall that has already chosen sides. The clipboard looks thinner.',
    'They photograph fullness and call it concern. The class keeps chewing.',
  ] },
]);
registerModuleVariants('opposition.agenda.shame_vigil', [
  { when: { campusFattening: true }, weight: 3, text: [
    'Candles outside, trays inside. Appetite does not attend the vigil.',
  ] },
]);
registerModuleVariants('opposition.agenda.size_review', [
  { when: { corruption: [2] }, weight: 3, text: [
    'Mandatory scale. She steps on like it is a stage she booked.',
  ] },
  { when: { gainStance: 'opposed', corruption: [0] }, weight: 3, text: [
    'The review wants a flinch. She gives them a number and a closed mouth.',
  ] },
]);
registerModuleVariants('opposition.endgame.synthesis', [
  { when: { campusFattening: true }, weight: 2, text: [
    'Scarcity language thins out. The class inhales like a kitchen door opening.',
  ] },
]);

// ── wife lessons: unique per dish ─────────────────────────────
const WL = {
  honey_butter: ['Honey glaze on fingers, yeast in the air, MJ talking fat like furniture.', 'Darlene tears a roll and forgets to be careful. The kitchen gets smaller in the good way.'],
  cream_biscuits: ['Cream biscuits drop heavy on the sheet. Wanda is already reaching for the second.', 'No fuss, MJ says. The richness does the teaching. Plates come back empty.'],
  cinnamon_pull: ['Sticky pull-apart, hands only. Cinnamon hangs on everyone like a second apron.', 'They keep going back to the pan until the pan looks finished and they do not.'],
  butter_cake: ['Pound cake so dense the knife slows. MJ says deserve. Patrice believes her with a fork.', 'Sweet weight, quiet table, the professor watching a room learn how to stay.'],
  cream_rolls: ['Cream spills at the corner of a mouth. MJ talks about centers. Nobody argues.', 'Soft dough, velvet filling, a lesson that lands below the ribs.'],
  pot_pie: ['Double crust, blanket talk, gravy that convinces the quietest eater.', 'Forks go still only when the bowls do. Abundance sounds like pastry.'],
  peach_cobbler: ['Summer fruit thick in the dish. Cheryl watches the extra spoonfuls land.', 'Juices shine. The kitchen smells like a porch at dusk and seconds.'],
  bread_pudding: ['Leftover bread, too much cream, custard that refuses to be modest.', 'Chloe shows her appetite without asking permission. MJ does not correct her.'],
  french_toast: ['Stuffed toast, syrup in sheets. MJ names the sweet side of a full belly.', 'Daughters finish first and look at the platter like it owes them another round.'],
  cream_pie: ['Cold silk on the tongue. Easy going down, hard to stop. The group has learned both.', 'Wedges disappear slower now — not from restraint. From savor.'],
  lasagna: ['Deep dish, cheese stacked like care. Second helpings are the syllabus.', 'Savory heat fills the room. The routine has a taste now.'],
  shortcake: ['Stacks race, cream spills, MJ calls it earned sweetness. She is right.', 'Berries, biscuits, laughter that shakes new softness.'],
  chicken_pot: ['Casserole for people who need feeding. MJ serves like a visit to the sick, only kinder.', 'Larger bodies at the table, quieter joy, spoons still moving.'],
  mac_cheese: ['Four cheeses, no conversation. The sauce demands a full calendar.', 'They leave heavier. MJ\'s smile does not flicker.'],
  choc_cake: ['Three layers, fudge cling. Loving excess, plated. Daughters do not hesitate.', 'Chocolate air, scraped plates, a sweetness they have stopped rationing.'],
  feast_spread: ['Every prior lesson on one table. Enormous daughters sit down like they belong to the furniture.', 'Stories and bites cross the wood. The kitchen has become a house.'],
  daughters_bake: ['Girls at the helm. MJ in the chair, proud and soft, offering almost nothing.', 'Mothers watch authority change hands and keep eating anyway.'],
  old_recipe: ['Grandmother\'s dish, first time outside the family. The room goes careful, then hungry.', 'Something thicker than sugar is being passed with the serving spoon.'],
  daughters_run: ['Daughters plate their mothers. The circle has already turned.', 'MJ guides from the chair. The young women fill every dish twice.'],
  overnight_feast: ['Nobody stands to leave. Portions keep arriving after full has been named and ignored.', 'Late kitchen, happy noise, MJ watching the philosophy walk around in bodies.'],
  recipe_book: ['Handwritten pages copied under warm light. Flour on the margins like a seal.', 'Legacy is a recipe and a waistband. Both get written down.'],
  final_spread: ['Every favorite at once. They eat slow on purpose, like memory has a flavor.', 'The path ends in gravy. Nobody looks for a thinner road.'],
  handoff: ['Girls cook for the women who used to cook for them. The inversion is tender.', 'MJ becomes the grandmother in the corner, satisfied, still taking a plate.'],
  legacy_recipe: ['Private dish, public now. Every bite tastes like a future they already wear.', 'They eat in a hush that is not fear. It is keeping.'],
};

const WL_STAGE = {
  1: ['honey_butter', 'cream_biscuits', 'cinnamon_pull'],
  2: ['butter_cake', 'cream_rolls', 'pot_pie'],
  3: ['peach_cobbler', 'bread_pudding', 'french_toast'],
  4: ['cream_pie', 'lasagna', 'shortcake'],
  5: ['chicken_pot', 'mac_cheese', 'choc_cake'],
  6: ['feast_spread', 'daughters_bake', 'old_recipe'],
  7: ['daughters_run', 'overnight_feast', 'recipe_book'],
  8: ['final_spread', 'handoff', 'legacy_recipe'],
};

for (const [stage, ids] of Object.entries(WL_STAGE)) {
  for (const id of ids) {
    registerModuleVariants(`wifeLessons.lesson.s${stage}.${id}`, [
      { when: {}, weight: 5, text: WL[id] },
    ]);
  }
}

// ── cultivator ────────────────────────────────────────────────
registerModuleVariants('cultivator.reaction', [
  { when: { studentId: 10, corruption: [2] }, weight: 4, text: [
    'Reneé tastes the batch after the tester. She smiles at a yield she can feel in two bodies.',
  ] },
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter kitchen, warmer recipe, she finishes like the cold outside is a rumor.',
  ] },
]);
registerModuleVariants('cultivator.intro.milkshake', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Reneé sets the shake down like a hypothesis with a straw. "Tell me when it gets interesting."',
  ] },
]);
registerModuleVariants('cultivator.intro.cookies', [
  { when: { studentId: 10 }, weight: 5, text: [
    'Warm tray, professional calm, a cookie that is doing more work than dessert should.',
  ] },
]);
registerModuleVariants('cultivator.intro.cake', [
  { when: { studentId: 10 }, weight: 5, text: [
    'She plates the cake as if the crumb were a variable. It is. So is the second slice.',
  ] },
]);

// ── feast aftermath (do not replace monoliths) ────────────────
registerModuleVariants('hunt.feast.deliveryIntro', [
  { when: { relationship: [2, 3] }, weight: 3, text: [
    'Too large for the hallway. You smile in the warm dark when the knock comes. She already knows the order.',
  ] },
  { when: { corruption: [2] }, weight: 3, text: [
    'Campus is a rumor. The bag is real. Appetite names the delivery before the door opens.',
  ] },
]);
registerModuleVariants('hunt.feast.s0', [
  { when: { corruption: [0] }, weight: 2, text: [
    'Afterward she maps the new paunch with black nails, surprised only by how little surprise she feels.',
  ] },
]);
registerModuleVariants('hunt.feast.s4', [
  { when: { stageMin: 4 }, weight: 2, text: [
    'She waddles the aftermath, corset beaten, smiling like a larder that just restocked itself.',
  ] },
]);
registerModuleVariants('hunt.feast.s9', [
  { when: { isImmobile: true }, weight: 3, text: [
    'Room-bound, furniture cracked, she is finished hunting and not finished growing. You stay in the warm dark.',
  ] },
]);
