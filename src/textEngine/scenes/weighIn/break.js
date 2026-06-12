// wi.* scale-break beats — per-girl reactions + professor swap/purchase
import { registerPool } from '../../engine.js';

const BREAK_BY_ID = {
  0: 'Brittany hops off like she\'s dismounting a routine, hands on her hips, completely unbothered. "Okay, that one is on the scale, not me."',
  1: 'Madeline tilts her head at the fractured window with quiet, academic interest. "Material failure under sustained load. Predictable, actually."',
  2: 'Kylie is already filming. "Babe, look at this. The scale literally couldn\'t."',
  3: 'Serena steps off and laughs once, sharp and pleased. "Yeah, I felt that one go. Get one that can keep up."',
  4: 'Fiona studies the crack pattern. "It\'s actually beautiful, the way it spidered out."',
  5: 'Destiny sighs through her nose. "Low durability item. Should\'ve upgraded ages ago."',
  6: 'Tiffany shrieks with delight. "GIRLS. I broke the scale. No, like, broke broke."',
  7: 'Priya is already pulling up procurement options. "Industrial-rated, weight-rated to four-fifty minimum, ideally five."',
  8: 'Maya steps off without a word, looks at the cracks, then looks at you. She nods once.',
  9: 'Chloe lets out a dry laugh. "Right. So your American scales are exactly as overbuilt as your portions, then."',
  10: 'Reneé claps once, delighted. "That is the best review my cooking has ever gotten."',
  11: 'Kaylee covers her mouth. "Oh no, professor, I am so sorry. We\'ll get you something sturdier."',
  12: 'Nadia watches your reaction more than the scale. "Interesting. You looked at the scale first, then at me."',
  13: 'Daisy laughs warmly. "Bless its little heart. You go on and get a bigger one, sugar."',
  14: 'Mary Jane bursts out laughing. "Back home we\'d\'ve put me on the hay scale weeks ago."',
  15: 'Lilith regards the cracked dial with quiet amusement. "Fragile little thing."',
};

const breakVariants = Object.entries(BREAK_BY_ID).map(([id, text]) => ({
  when: { studentId: Number(id) },
  weight: 4,
  text: [text],
}));

registerPool('wi.breakLine', [
  ...breakVariants,
  { when: {}, text: [(ctx) => `${ctx.subject.name} steps off and looks down at the fractured dial, then at you. "You're going to need a bigger scale."`] },
]);

registerPool('wi.breakBeat', [
  { when: { stageMin: 8 }, text: ['A sharp crack splinters across the dial window. {wi.breakLine}', 'The needle slams past the end of the dial and does not come back. {wi.breakLine}'] },
  { when: {}, text: ['The scale gives up with a sound you will remember. {wi.breakLine}', 'The dial window spiders outward. {wi.breakLine}'] },
]);

registerPool('wi.swap', [
  { when: {}, text: [
    (ctx) => `"Hey - it's fine." You wave ${(ctx.subject.name || '').split(' ')[0]} off the cracked white scale. "I figured this would happen again. Got us a proper one after the first time." You drag the heavy industrial platform out from beside the desk and thump it down.`,
    (ctx) => `"No worries." You gesture ${(ctx.subject.name || '').split(' ')[0]} aside and roll the industrial platform into place. "Learned my lesson after the first time."`,
    (ctx) => `You exhale once, amused, and haul the heavy-duty scale out. "Knew we'd need this again."`,
  ] },
]);

registerPool('wi.purchase', [
  { when: {}, text: [
    (ctx) => `You stare at the cracked dial for a second, then exhale a laugh. "Okay. That's on me, not on ${(ctx.subject.name || '').split(' ')[0]}." You make a real note to order a proper heavy-duty scale before the next check-in.`,
    (ctx) => `You look at the fractured dial, then at ${(ctx.subject.name || '').split(' ')[0]}. "Fair. I'll get something that can actually keep up."`,
    (ctx) => `"Right." You jot down industrial scale on your to-do list. "My mistake. Not hers."`,
  ] },
]);
