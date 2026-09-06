// The Squad — Lead: A1 Mobile | Support: A2 Psych, A5 Editor
import { registerPool } from '../../engine.js';

registerPool('cloth.discovery', [
  { when: {}, text: [
    '{subject.name} notices the strain before the failure — fabric honest about what comes next.',
    'The clothes have been negotiating all morning. Now they are losing.',
    'She catches her reflection and sees what the seam has been trying to say.',
    'The outfit has been honest all morning; she is only now listening.',
  ] },
  { when: { clothingState: 'button_pop' }, text: [
    'A button that has been holding its breath finally gives up.',
    'The waistband loses an argument it was never going to win.',
  ] },
  { when: { clothingState: 'zipper_fail' }, text: [
    'The zipper stops halfway — a truce neither side respects.',
    'She tugs once, twice. The zipper declines to continue.',
  ] },
  { when: { clothingState: 'seam_split' }, text: [
    'A seam opens like a quiet confession along the side.',
    'Thread surrenders along the hip — not dramatic, simply factual.',
  ] },
  { when: { clothingState: 'waistband_surrender' }, text: [
    'The elastic stops pretending. The gap widens past hope.',
    'Waistband surrender: the elastic has made its decision.',
  ] },
  { when: { stageMin: 6 }, text: [
    'She has outgrown the fiction of this outfit. The fabric agrees.',
    'Custom sizing is losing again — she can feel it before she sees it.',
  ] },
  { when: { stageMin: 10 }, text: [
    'Clothing is a concept at this scale. She dresses in what can be arranged.',
    'The outfit was never going to win. She knew that before she started.',
  ] },
]);

registerPool('cloth.struggleVerb', [
  { when: {}, text: ['tugs', 'adjusts', 'smooths', 'works at'] },
  { when: { stageMin: 4 }, text: ['wrestles with', 'negotiates with', 'coaxes'] },
  { when: { stageMin: 6 }, text: ['abandons hope for', 'makes peace with the failure of'] },
  { when: { bodyType: 'apple', stageMin: 4 }, text: ['tries to convince the waistband over her belly'] },
  { when: { bodyType: 'pear', stageMin: 4 }, text: ['attempts to zip over her hips'] },
]);

registerPool('cloth.struggle', [
  { when: {}, text: [
    'She {cloth.struggleVerb} the fabric without success.',
    'Hands find the strain point. The fabric does not yield the way she needs.',
    'She {cloth.struggleVerb} the gap; the fabric answers with silence.',
    'The strain point is obvious. Relief is not.',
  ] },
  { when: { clothingState: 'sleeve_restriction' }, text: [
    'Her arms have outgrown the sleeves — movement costs friction now.',
    'The sleeve digs at the upper arm. She stops fighting it.',
  ] },
  { when: { clothingState: 'shirt_rise' }, text: [
    'Her shirt has been climbing all day. She tugs it down. It climbs again.',
    'Stomach escaping the hemline — a slow, daily negotiation.',
  ] },
  { when: { clothingState: 'bra_protest' }, text: [
    'The bra has been filing complaints for weeks. Today it escalates.',
    'Cup overflow, band riding — the underwire has chosen violence.',
  ] },
]);

registerPool('cloth.moment', [
  { when: {}, text: [
    'The fabric gives — soft tok, thread surrendering.',
    'Something pops. Something skitters. The outfit has lost.',
    'Thread surrenders in sequence — small, audible, final.',
    'Elastic stops pretending. The outfit admits defeat.',
  ] },
  { when: { clothingState: 'button_pop' }, weight: 2, text: [
    'A button departs at speed, skittering across the floor.',
    'The button goes. The gap remains, honest and wide.',
  ] },
  { when: { stageMin: 6 }, text: [
    'The seam parts before the button does — fabric conceding to {word.size} mass.',
    'Failure arrives all at once: thread, elastic, and dignity.',
  ] },
]);

registerPool('cloth.failBeat', [
  { when: {}, text: [
    'The outfit capitulates in a small, audible way.',
    'What used to close does not close anymore. The fact is plain.',
    'The closure that used to meet does not meet anymore.',
    'Fabric concedes; the fact is too plain to dress up.',
  ] },
  { when: { corruption: [0] }, text: [
    'She freezes — cheeks heating — as the failure becomes public.',
    'The wardrobe malfunction is small and absolute.',
  ] },
  { when: { corruption: [2] }, text: [
    'The failure happens. She does not so much as glance down.',
    'Fabric surrenders. She keeps going.',
  ] },
  { when: { stageMin: 8 }, text: [
    'At her size, clothing failure is weather — expected, survived, forgotten.',
    'The garment loses. She has stopped keeping score.',
  ] },
]);

registerPool('cloth.failSound', [
  { when: {}, text: ['', '', '', ''] },
  { when: { clothingState: 'button_pop' }, text: ['a soft tok against the floor', 'the button rolling to a stop'] },
  { when: { clothingState: 'seam_split' }, text: ['a quiet rip along the seam', 'thread popping in sequence'] },
  { when: { clothingState: 'zipper_fail' }, text: ['the zipper catching, then refusing', 'metal teeth giving up halfway'] },
]);

registerPool('cloth.reaction', [
  { when: { corruption: [0] }, text: [
    `{subject.name} grabs at the gap, cheeks hot. "That was already loose."`,
    `"I can fix this," she says, unconvincingly, to no one in particular.`,
    `She looks from the failure to you. "Well. That's a sign."`,
    `"It's the fabric," she insists, tugging uselessly. "Cheap fabric."`,
    `Color rises in her cheeks. The seam does not re-close.`,
  ] },
  { when: { corruption: [1] }, text: [
    `"Okay," she says, smoothing what cannot be smoothed. "Bigger size."`,
    `She laughs once — not quite humor. "I knew this was coming."`,
    `"Well. Shopping trip," she says, already resigned.`,
    `"New size," she murmurs, more acceptance than complaint. "Fine."`,
    `She exhales through the strain. The garment has made its point.`,
  ] },
  { when: { corruption: [2] }, text: [
    `{subject.name} smiles down at the wreck of her waistband. "Buy bigger."`,
    `"Good," she says. "More room to grow into."`,
    `She does not fix it. She does not need to.`,
    `"There," she says, patting the gap. "Honest at last."`,
    `Fabric surrendered. She looks pleased.`,
  ] },
  { when: { stageMin: 6, stageMax: 8 }, text: [
    `{subject.name} surveys the damage with the calm of someone who has seen this before.`,
    `"Another size up," she says, almost bored. "The closet knew."`,
    `She tugs once, gives up, and keeps moving — the failure already old news.`,
  ] },
  { when: {}, text: [
    `{subject.name} looks at the damage and exhales.`,
    `She says nothing. The clothes have spoken for her.`,
    `{subject.name} smooths what she can and lets the rest show.`,
    `Fabric has made its point. She listens.`,
    `The outfit lost. Her body did not.`,
  ] },
]);

registerPool('cloth.aftermath', [
  { when: {}, text: ['', '', '', ''] },
  { when: { corruption: [0] }, text: [
    'She spends the rest of the day aware of the gap.',
    'The failure follows her like a blush she cannot shake.',
    'She checks the mirror twice before leaving. The gap is still there.',
    'Fabric pulled, re-pulled, surrendered. She carries the embarrassment warm in her cheeks.',
  ] },
  { when: { corruption: [1] }, text: [
    'She adjusts once more, then stops fighting it.',
    'The old size is a memory. Shopping is tomorrow. Tonight she eats anyway.',
    'Acceptance arrives before the new wardrobe does.',
  ] },
  { when: { corruption: [2] }, text: [
    'She wears the failure like a badge — or forgets it entirely.',
    'Shopping for bigger is not a crisis anymore. It is Tuesday.',
    'The gap stays open. She does not mind the breeze.',
    'Bigger clothes are not defeat. They are forecast.',
  ] },
  { when: { stageMin: 7 }, text: [
    'At this size, wardrobe casualties are weather — noted, survived, forgotten.',
    'She has stopped mourning garments. They were always temporary.',
    'The closet rotates faster now. She eats through the transition.',
  ] },
]);
