// The Squad — Lead: A1 Mobile | Support: A4 Architect, A5 Editor
import { registerPool } from '../../engine.js';

const LOCALES = ['hallway', 'lecture_hall', 'gym', 'cafeteria', 'dorm_room', 'stairwell', 'elevator', 'prof_office'];

registerPool('campus.localeIntro', [
  { when: {}, text: [
    'On campus,',
    'Between classes,',
    'The college day offers its usual geography.',
    'Another hour on campus unfolds.',
    'Sun on brick, voices in the quad — the semester keeps moving.',
    'Campus air smells like coffee, cut grass, and someone\'s takeout.',
    'The day moves at lecture speed; bodies move at their own.',
  ] },
  { when: { campusLocale: 'hallway' }, text: [
    'The hallway carries its usual foot traffic.',
    'Between classes, the corridor fills.',
    'Lockers and chatter frame the walk.',
    'The corridor hums with passing bodies.',
  ] },
  { when: { campusLocale: 'lecture_hall' }, text: [
    'The lecture hall rows wait, desk arms at attention.',
    'Tiered seating — designed for smaller assumptions.',
    'The auditorium smells like chalk and old upholstery.',
    'Rows climb toward the back; every seat is a small negotiation.',
  ] },
  { when: { campusLocale: 'cafeteria' }, text: [
    'The cafeteria hums with trays and appetite.',
    'The dining hall at peak hour — noise, steam, possibility.',
    'Steam and voices layer over the serving line.',
    'The cafeteria opens its arms to hunger on schedule.',
  ] },
  { when: { campusLocale: 'gym' }, text: [
    'The gym floor gleams under fluorescent light.',
    'Equipment sized for a different population.',
    'Rubber mats and metal frames wait under bright lights.',
    'The gym smells like effort and disinfectant.',
  ] },
  { when: { campusLocale: 'dorm_room' }, text: [
    'Her dorm room — familiar, close, honest about space.',
    'The room she has been outgrowing in increments.',
    'Posters, laundry, and a mirror that tells the truth.',
    'Her dorm holds the week\'s quiet aftermath.',
  ] },
  { when: { campusLocale: 'stairwell' }, text: [
    'The stairwell smells like concrete and effort.',
    'Stairs: a decision she makes more carefully now.',
    'Echoes climb the landing with each step.',
    'The stairwell is narrow, honest, and vertical.',
  ] },
  { when: { campusLocale: 'elevator' }, text: [
    'The elevator arrives with its small ding.',
    'A metal box with a weight limit posted inside.',
    'Fluorescent light and a posted capacity sign.',
    'The elevator doors part with mechanical patience.',
  ] },
  { when: { campusLocale: 'prof_office' }, text: [
    'Your office — desk, chairs, doorframe she has learned.',
    'The office where weekly check-ins happen.',
    'Bookshelves and a chair that knows her shape.',
    'Your office holds the ritual of the weekly weigh-in.',
  ] },
]);

registerPool('campus.moveSentence', [
  { when: {}, text: [
    '{subject.name} {word.adv.pace|suffix: }{word.moveVerb.campus} {campus.destination}{word.adv.sizeQual|prefix: }.',
    '{subject.name} {word.moveVerb.campus}{join:wi.mobilityClause,wi.bodyClause|prefix:, }{word.adv.sizeQual|prefix: }.',
    '{subject.name} {word.adv.pace|suffix: }{word.moveVerb.campus}{wi.mobilityClause|prefix:, }.',
    '{subject.name} {word.moveVerb.campus} {campus.destination}{campus.soundTex|prefix:, }.',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    '{subject.name} {word.moveVerb.hallway} — the environment not designed for her, accommodating anyway.',
    '{subject.name} {word.moveVerb.door}{join:wi.mobilityClause,wi.soundClause|prefix:, }.',
  ] },
  { when: { stageMin: 10 }, weight: 3, text: [
    '{subject.name} {word.moveVerb} by degrees{wi.mobilityClause|prefix:, }.',
    '{subject.name} {word.adv.pace|suffix: }{word.moveVerb.bed|prefix: }.',
  ] },
]);

registerPool('campus.destination', [
  { when: {}, text: ['down the hall', 'across campus', 'toward her next class', 'where the afternoon takes her next'] },
  { when: { campusLocale: 'hallway' }, text: ['through the foot traffic', 'along the corridor', 'past students who make room'] },
  { when: { campusLocale: 'lecture_hall' }, text: ['into the aisle', 'toward her seat', 'down the steps'] },
  { when: { campusLocale: 'cafeteria' }, text: ['through the line', 'toward an open table', 'to the booth she prefers'] },
  { when: { campusLocale: 'stairwell' }, text: ['up the stairs', 'to the next landing', 'one step at a time'] },
  { when: { campusLocale: 'elevator' }, text: ['into the elevator', 'through the closing doors'] },
  { when: { campusLocale: 'gym' }, text: ['across the gym floor', 'toward the equipment'] },
  { when: { campusLocale: 'dorm_room' }, text: ['into her room', 'to the mirror', 'to the bed'] },
  { when: { campusLocale: 'prof_office' }, text: ['into your office', 'through the door', 'to the chair she knows'] },
]);

registerPool('campus.obstacle', [
  { when: {}, text: ['', '', '', ''] },
  { when: { campusLocale: 'hallway', stageMin: 5 }, text: [
    ' — two-way traffic parts around her',
    ', displacing foot traffic without malice',
  ] },
  { when: { campusLocale: 'lecture_hall', stageMin: 4 }, text: [
    ' — the desk arm leaves a mark when she sits',
    ', negotiating the desk arm with her belly',
  ] },
  { when: { campusLocale: 'stairwell', stageMin: 6 }, text: [
    ' — railing load tested with each landing',
    ', breath audible at the top',
  ] },
  { when: { campusLocale: 'elevator', stageMin: 7 }, text: [
    ' — the elevator protesting softly at capacity',
    ', the door closing before she is fully through',
  ] },
  { when: { campusLocale: 'cafeteria', stageMin: 5 }, text: [
    ' — tray balanced, chair selected by experience',
    ', booth abandoned for the table with room',
  ] },
  { when: { campusLocale: 'gym', stageMin: 3 }, text: [
    ' — equipment fit a negotiation',
    ', the machine adjusted past its intended range',
  ] },
  { when: { stageMin: 8 }, weight: 2, text: [
    ' — architecture insufficient but not hostile',
    ', the building learning her shape',
  ] },
]);

registerPool('campus.spaceObs', [
  { when: {}, text: ['', '', '', ''] },
  { when: { stageMin: 3, stageMax: 5 }, text: [
    'She takes up a little more hallway than she used to. No one comments. She notices.',
    'The campus is the same size. She is not. The difference is subtle and real.',
  ] },
  { when: { campusLocale: 'hallway', stageMin: 6 }, text: [
    'Students make room — not unkindly, simply factually.',
    'The corridor was not designed for her. She uses it anyway.',
    'Foot traffic parts around her hips without drama.',
    'She owns a lane now whether she asked for one or not.',
  ] },
  { when: { campusLocale: 'dorm_room', stageMin: 5 }, text: [
    'The mirror tells the truth she is still getting used to.',
    'The bed creaks its familiar greeting.',
  ] },
  { when: { campusLocale: 'lecture_hall', stageMin: 7 }, text: [
    'The desk arm is a memory on her hip when she stands.',
    'She has learned which seats survive her.',
  ] },
  { when: { stageMin: 9 }, text: [
    'Space negotiates with her now — she does not negotiate with it.',
    'The room rearranges its assumptions around her presence.',
  ] },
]);

// ── campus.seenBeat — FULL SENTENCE — she is in public, and the words
// know it. Keyed on garment fit dims (Phase 6, WORD_GRANULAR_ENGINE_PLAN):
// what the campus notices is what her clothes are doing.
registerPool('campus.seenBeat', [
  { when: {}, text: [
    '',
    '',
    '',
    'Someone looks twice and pretends they did not.',
    'A passing glance lingers on her silhouette a beat too long.',
    'She feels the weight of being looked at — not hostile, just present.',
    'Campus eyes are casual. They still do math.',
  ] },
  { when: { stageMin: 2, stageMax: 4 }, text: [
    'A friend does a double take and covers it with a joke.',
    'She catches a reflection in a window and keeps walking like she saw nothing.',
    'Someone whispers behind her; she has learned not to turn around for whispers.',
  ] },
  { when: { fitTop: 'snug' }, text: [
    "A classmate's glance snags on the closer fit of her top and moves on.",
    'Her top reads as new; it is not new.',
    'Fabric pulls across her chest when she reaches; a stranger notices.',
    'The shirt that used to hang loose now outlines what she has been feeding.',
  ] },
  { when: { fitBottom: 'straining' }, text: [
    'Someone behind her watches the strained denim work and forgets what they were saying.',
    'The seams down her thighs catch light and attention in the same pass.',
    'Her jeans protest with every step; the protest is audible in a quiet hall.',
    'Denim stretched pale across her hips draws eyes the way neon draws moths.',
  ] },
  { when: { fitTop: 'straining' }, text: [
    'Heads turn for the gap her buttons keep almost losing.',
    'Her top holds on in public, barely, and the public notices.',
    'A button strains white at the lip; conversations pause and resume.',
    'Her blouse skims a belly it was not cut for. The campus does the rest.',
  ] },
  { when: { worstFit: 'failing' }, weight: 2, text: [
    'Conversations dip when a seam announces itself; she keeps walking.',
    "Somebody's eyes find the seam that is losing and stay there a beat too long.",
  ] },
  { when: { worstFit: 'failing', shameTierMin: 2 }, weight: 2, text: [
    'She reroutes past fewer people, one arm across the seam she knows is going.',
    'She times her walk between classes now, when the hallways forget to look.',
  ] },
  { when: { worstFit: ['straining', 'failing'], corruption: [2] }, weight: 2, text: [
    'She walks the strain like a runway — let the campus do the math.',
    'She wears the failing fit on purpose; the looks are the point.',
  ] },
  { when: { worstFit: 'burst', stageMin: 3 }, weight: 2, text: [
    'What her outfit no longer covers, the campus has learned not to mention.',
    'She carries the sprung waistband openly — old news to anyone paying attention.',
  ] },
]);

registerPool('campus.soundTex', [
  { when: {}, text: ['', '', '', ''] },
  { when: { stageMin: 5 }, text: ['footfalls heavier than they used to be'] },
  { when: { stageMin: 7 }, text: [
    'the floor registering her decision to move',
    'furniture bracing in advance',
  ] },
  { when: { stageMin: 9 }, consumes: ['sound_tex'], text: [
    'her presence audible before she is visible',
    'the hallway going quiet around her weight',
  ] },
]);
