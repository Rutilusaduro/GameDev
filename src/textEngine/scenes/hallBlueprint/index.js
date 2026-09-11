import { registerPool } from '../../engine.js';

registerPool('hall.blueprint.purchase', [
  { when: {}, text: [
    'You sign the work order and the wing changes overnight — new smell, new creak, new permission to linger.',
    'Maintenance pretends not to notice the reinforced joists. The residents notice everything else.',
    'Another line on the blueprint fills in. The floor exhales like a body getting more room to spread.',
  ] },
]);

registerPool('hall.blueprint.synergy', [
  { when: {}, text: [
    'Two wings hum together now — lounge warmth bleeding into kitchen steam until nobody remembers hunger as an accident.',
    'The blueprint shows a dotted bridge between rooms. In practice it is appetite walking itself from sofa to stove.',
    'Residents drift the new corridor you opened without naming it. Habit is the quietest renovation.',
  ] },
]);

registerPool('hall.ambiance.pulse.comfort', [
  { when: {}, text: [
    'Every chair holds a little longer this week. The hall feels upholstered in permission.',
    'Bodies settle faster when they cross the threshold — as if the building learned their weights.',
    'Radiators hum a low note. The lounge stops pretending anyone is in a hurry to leave.',
  ] },
]);

registerPool('hall.ambiance.pulse.appetite', [
  { when: {}, text: [
    'The pantry exhales butter and salt down the stairwell. Appetite arrives before anyone knocks.',
    'Someone left the oven light on again. By midnight three rooms smell like yes.',
    'A delivery lands without a name. Nobody asks who ordered it. Everybody eats.',
  ] },
]);

registerPool('hall.ambiance.pulse.logistics', [
  { when: {}, text: [
    'Paperwork clears itself for once. You spend the saved hour where it matters — plates, not policies.',
    'The office wing runs quiet and competent. Time opens like a second serving.',
    'Your inbox shrinks. Your hands get flour on them instead. Better trade.',
  ] },
]);

registerPool('hall.ambiance.pulse.socialHeat', [
  { when: {}, text: [
    'Laughter stacks in the salon wing until even shy residents orbit the noise, plates in hand.',
    'Invitations multiply. The floor learns to treat indulgence as hospitality.',
    'Someone starts a group chat for brunch. Forty people reply yes before the menu exists.',
  ] },
]);

registerPool('hall.ambiance.pulse.intimacy', [
  { when: {}, text: [
    'Doors stay cracked. Voices drop. The nook wing makes confession feel like foreplay.',
    'She tells you what she wants in a whisper meant for the whole hall to overhear.',
    'Late check-ins feel less like duty and more like being let inside a secret.',
  ] },
]);

registerPool('hall.ambiance.pulse.prestige', [
  { when: {}, text: [
    'The atrium gleams. Even housing staff walk softer here — as if the building has alumni now.',
    'Prestige settles on the floor like dust you want on your skin.',
    'Tour groups pause at your wing and pretend they are only admiring the architecture.',
  ] },
]);
