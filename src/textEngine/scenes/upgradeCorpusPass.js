// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych, A6 Slender
// Hand-authored state-reactive depth for high-traffic scene pools.
import { registerModuleVariants } from '../engine.js';

// ── campus ────────────────────────────────────────────────────
registerModuleVariants('campus.localeIntro', [
  { when: { season: 'winter' }, weight: 2, text: [
    'Winter coats hide less than they used to.',
    'Cold air, warm bodies, campus moving at half speed.',
  ] },
  { when: { season: 'summer' }, weight: 2, text: [
    'Summer clothes tell on everyone, and she is no exception.',
    'Heat makes fabric honest; appetite does the rest.',
  ] },
  { when: { campusFattening: true }, weight: 2, text: [
    'The whole campus has gone a little softer this semester.',
    'Dining-hall portions have opinions; the student body is listening.',
  ] },
]);

registerModuleVariants('campus.spaceObs', [
  { when: { stageMin: 6, campusLocale: 'lecture_hall' }, weight: 2, text: [
    'The desk arm was cut for a smaller assumption; she makes it work anyway.',
    'Tiered seating announces her twice — once sitting, once standing to leave.',
  ] },
  { when: { stageMin: 6, campusLocale: 'cafeteria' }, weight: 2, text: [
    'Trays stack higher at her table than at the ones beside it.',
    'The line knows her order before she finishes saying it.',
  ] },
  { when: { stageMin: 8, campusLocale: 'stairwell' }, weight: 3, text: [
    'The landing is a rest stop now, not a pause.',
    'Stairs have become a conversation she only starts when she has to.',
  ] },
  { when: { stageMin: 5, campusLocale: 'elevator' }, weight: 2, text: [
    'She checks the posted limit without making a joke of it.',
    'The car settles a little deeper when she steps in.',
  ] },
]);

registerModuleVariants('campus.seenBeat', [
  { when: { corruption: [0], stageMin: 3 }, weight: 2, text: [
    'She feels the glance and tugs her bag in front of her middle.',
    'Being seen still has a temperature. She keeps walking anyway.',
  ] },
  { when: { corruption: [2], stageMin: 5 }, weight: 2, text: [
    'She lets the glance finish. There is more of her to finish looking at.',
    'Campus eyes are part of the scenery; she dresses for the ones that linger.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'Hunger makes the cafeteria the only geography that matters.',
    'She is being seen. She is also being late for food. Food wins.',
  ] },
]);

// ── npc / prof ────────────────────────────────────────────────
registerModuleVariants('npc.bystander', [
  { when: { mood: ['happy', 'cheerful', 'excited'], stageMin: 4 }, weight: 2, text: [
    'Someone smiles back — her good mood is harder to look away from than her size.',
    'A passerby grins, surprised into friendliness by how pleased she looks.',
  ] },
  { when: { campusLocale: 'cafeteria', stageMin: 5 }, weight: 2, text: [
    'A tray pauses in the next pair of hands while she loads hers.',
    'The line behind her recalculates portions by watching hers.',
  ] },
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 6 }, weight: 2, text: [
    'Someone steps aside for her hips the way you step aside for a cart.',
    'The path narrows; her lower half does not.',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 6 }, weight: 2, text: [
    'A glance drops to her middle and stays a beat too long.',
    'Her belly does the introducing. Faces catch up after.',
  ] },
]);

registerModuleVariants('npc.peer', [
  { when: { corruption: [0], stageMin: 3, stageMax: 6 }, weight: 2, text: [
    '"You look… different," a classmate offers, then finds a different subject.',
    'A friend\'s hug lasts a second longer than it used to. Neither of them names why.',
  ] },
  { when: { archetype: 'influencer', stageMin: 4 }, weight: 2, text: [
    '"That\'s a look," someone says, already angling for the tag.',
    'A classmate asks if she is filming. She might be.',
  ] },
  { when: { archetype: 'athlete', stageMin: 4 }, weight: 2, text: [
    'A former teammate clocks the new walk and says nothing useful.',
    '"Still got the shoulders," someone offers, generously missing the point.',
  ] },
]);

registerModuleVariants('prof.observation', [
  { when: { isGaining: true, stageMin: 2 }, weight: 2, text: [
    'This week added something you can see without the scale.',
    'The trend is visible in how she fills the chair before she sits all the way down.',
  ] },
  { when: { hungerTierMin: 3 }, weight: 2, text: [
    'You note the hunger first. The size is the long story; this is the short one.',
    'Appetite is writing faster than the clipboard today.',
  ] },
]);

// ── eating ────────────────────────────────────────────────────
registerModuleVariants('eat.settleIn', [
  { when: { relationship: [2, 3] }, weight: 2, text: [
    '{subject.name} sits where she can see you and the food at once.',
    'She claims the chair nearest you; the plate claims the rest of her attention.',
  ] },
  { when: { season: 'winter' }, text: [
    'Cold outside, steam on the table — she unwraps the meal like a second coat.',
    'Winter appetite arrives with her; the chair takes both.',
  ] },
  { when: { fullnessMin: 0.7 }, weight: 2, text: [
    'She sits already warm from earlier eating and still orients toward the plate.',
    'Fullness came with her. The meal is not canceled.',
  ] },
]);

registerModuleVariants('eat.firstBite', [
  { when: { relationship: [3], corruption: [2] }, weight: 3, text: [
    'She takes the first bite looking at you, as if the meal were a conversation you started.',
    'The opening mouthful is for her. The look is for you.',
  ] },
  { when: { mealContext: 'breakfast' }, text: [
    'Morning food, morning appetite — she does not pretend this is a light start.',
    'Breakfast lands like a plan, not a snack.',
  ] },
  { when: { lastCompound: 'appetite_stimulant' }, weight: 3, text: [
    'The first bite barely registers before the next one is already happening.',
    'Whatever is in her system has already voted. The fork obeys.',
  ] },
]);

registerModuleVariants('eat.aftermath', [
  { when: { relationship: [2, 3], fullnessMin: 0.6 }, weight: 2, text: [
    'She sits back so you can see what the meal did. She does not tidy the view.',
    'Fullness is a shared fact now; her hand on her middle is half invitation.',
  ] },
  { when: { gainStance: 'secret', corruption: [0] }, weight: 2, text: [
    'She presses her palm to the new warmth and looks at anything but you.',
    'The meal\'s leftover sway is private. She still lets it happen in front of you.',
  ] },
]);

// ── slender / early ───────────────────────────────────────────
registerModuleVariants('slender.bodyNotice', [
  { when: { bodyType: 'hourglass', stageMin: 2, stageMax: 3 }, weight: 2, text: [
    'bust and hip arriving on the same quiet schedule',
    'the waist still small enough to make the new curves look intentional',
  ] },
  { when: { bodyType: 'topHeavy', stageMin: 2, stageMax: 3 }, weight: 2, text: [
    'the chest drafting a future the rest of her has not signed',
    'a forward weight in the bust that her walk has started to budget for',
  ] },
  { when: { bodyType: 'mom_bod', stageMin: 2, stageMax: 3 }, weight: 2, text: [
    'a lived-in softness at the waist that looks like it has always been invited',
    'comfort moving in at the middle, no drama, just extra',
  ] },
  { when: { hungerTierMin: 2, stageMax: 3 }, weight: 2, text: [
    'hunger making the new softness feel earned before she will say so',
    'appetite writing small changes she can feel through the shirt',
  ] },
]);

registerModuleVariants('slender.mindFeel', [
  { when: { archetype: 'bookworm', corruption: [0] }, weight: 2, text: [
    'She is collecting data and refusing, so far, to write the conclusion.',
    'The hypothesis keeps confirming. She keeps calling it an outlier.',
  ] },
  { when: { archetype: 'cheerleader', corruption: [0] }, weight: 2, text: [
    'She is still trying to treat this like a score she can come back from.',
    'Competitive instinct wants a plan. The body wants lunch.',
  ] },
  { when: { archetype: 'gamer', corruption: [0] }, weight: 2, text: [
    'She is treating the number like a record she did not mean to set.',
    'The climb is obvious. She will not post it. She will remember it.',
  ] },
]);

// ── clothing ──────────────────────────────────────────────────
registerModuleVariants('cloth.discovery', [
  { when: { bodyType: ['pear', 'fertility_goddess'], stageMin: 4 }, weight: 2, text: [
    'The strain starts at the hip. It always starts at the hip.',
    'Thighs tell on the jeans before the mirror does.',
  ] },
  { when: { bodyType: ['apple', 'rotund'], stageMin: 4 }, weight: 2, text: [
    'The waistband files the complaint first. The belly has been the whole brief.',
    'Her middle has been writing this ending all morning.',
  ] },
  { when: { bodyType: ['topHeavy', 'voluptuous'], stageMin: 4 }, weight: 2, text: [
    'The neckline loses first. It always loses first.',
    'Buttons on the chest have been in a meeting since breakfast.',
  ] },
]);

registerModuleVariants('cloth.reaction', [
  { when: { gainStance: 'secret', corruption: [0] }, weight: 3, text: [
    `She hides a smile in the tug. "Cheap fabric," she says, not quite believing herself.`,
    `Color in her cheeks, and not all of it embarrassment.`,
  ] },
  { when: { archetype: 'influencer' }, weight: 2, text: [
    `"That's going in the haul video," she says, already framing the gap.`,
    `"New era," she murmurs at the wreck of a seam.`,
  ] },
]);

// ── psych / interior ──────────────────────────────────────────
registerModuleVariants('shift.trigger', [
  { when: { lastCorruptionShift: true }, weight: 3, text: [
    'This is the week the old reflex fails in public.',
    'The shift lands on a real event — a look, a number, a seam — and stays.',
  ] },
  { when: { isGaining: true, stageMin: 3 }, weight: 2, text: [
    'The newest pounds arrive with a feeling she does not have a clean name for.',
    'Gain and psychology shake hands. Neither lets go first.',
  ] },
]);

registerModuleVariants('interior.selfObs', [
  { when: { fullnessMin: 0.8 }, weight: 2, text: [
    'She is aware of her middle as a warm, occupied country.',
    'Fullness makes the rest of the self-inventory easier to skip.',
  ] },
  { when: { relationship: [3], stageMin: 4 }, weight: 2, text: [
    'She inventories herself the way she imagines you do — slowly, with appetite.',
    'The body is a letter she is writing to you in pounds.',
  ] },
]);

registerModuleVariants('interior.sizeRealize', [
  { when: { stageMin: 6, corruption: [0] }, weight: 2, text: [
    'The realization is late and still a shock: she is the largest person in most rooms.',
    'She understands, suddenly, why chairs have been failing her like this.',
  ] },
  { when: { stageMin: 6, corruption: [2] }, weight: 2, text: [
    'She understands her size as a project that is on schedule.',
    'The realization is pleasure: there is more of her than there was, and more coming.',
  ] },
]);

// ── talk ──────────────────────────────────────────────────────
registerModuleVariants('talk.moodOpener', [
  { when: { hungerTierMin: 3 }, weight: 3, text: [
    '{subject.name} answers around the thought of food. The thought is winning.',
    'Hunger has first dibs on her attention; your question gets what is left.',
  ] },
  { when: { fullnessMin: 0.85 }, weight: 2, text: [
    '{subject.name} shifts around fullness before she finds the words.',
    'She is too well fed to hurry the answer. The chair knows.',
  ] },
  { when: { inWithdrawal: true }, weight: 3, text: [
    '{subject.name} answers too fast, then too slow — the craving is doing the timing.',
    'Her hands want something to hold that is not this conversation.',
  ] },
]);

// ── weigh-in extras ───────────────────────────────────────────
registerModuleVariants('wi.replyDialogue', [
  { when: { archetype: 'bookworm', corruption: [1] }, weight: 3, text: [
    `"The trendline is unambiguous," she says. "I am the dataset."`,
    `"I should be surprised. The graph said otherwise."`,
  ] },
  { when: { archetype: 'cheerleader', corruption: [2] }, weight: 3, text: [
    `"That's a W," she says, patting the mass of herself. "Keep the streak."`,
    `"I'm winning this. Don't look at me like that — I am."`,
  ] },
  { when: { archetype: 'quiet', corruption: [2] }, weight: 3, text: [
    `"More." She does not decorate it.`,
    `She nods at the number the way she nods at home.`,
  ] },
  { when: { season: 'winter', corruption: [0], stageMin: 3 }, weight: 2, text: [
    `"Coats hide it," she says. The coat is on the chair. The number is not hidden.`,
    `"It's the holidays." It is not the holidays. Not only.`,
  ] },
]);

registerModuleVariants('wi.numberLine', [
  { when: { isGaining: true, stageMin: 2 }, weight: 2, text: [
    'The number is higher than last week. The body already knew.',
    'She reads {subject.lbs} like a continuation, not a plot twist.',
  ] },
  { when: { bigScale: true }, weight: 3, text: [
    'The display holds {subject.lbs} without drama. The industrial scale was built for this.',
    'Green digits, no needle theatrics: {subject.lbs}.',
  ] },
]);
