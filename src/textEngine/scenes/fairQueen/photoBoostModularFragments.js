// State Fair Queen — boost + photo composable beats (late-game overlay).
import { registerPool, registerModuleVariants } from '../../engine.js';

const COLLABS = ['Brittany', 'Kylie', 'Serena', 'Renee', 'Daisy', 'Lilith'];

registerPool('fair.boost.midwayPush', [
  {
    when: {},
    weight: 2,
    text: [
      'Midway grease hangs in the air; Mary Jane leans into the boost like it is county policy.',
      'Funnel-cake steam and hay-scent braid around her — every tier of the boost feels ceremonial.',
      'She eats for the ribbon and the camera; pride sits on her hips while collaborators cheer.',
      'Late-semester fair energy turns generous; portions climb and shame stays off the midway.',
      'Cotton candy haze softens the lights; Mary Jane accepts the boost like a coronation ritual.',
    ],
  },
]);

registerPool('fair.boost.partnerHype', [
  {
    when: {},
    weight: 2,
    text: [
      'Partners narrate every bite for the crowd — co-conspirator pride louder than the livestock barn.',
      'Phones rise; comments donate appetite; the boost becomes content and communion at once.',
      'Collaborator whispers count seconds between swallows — coachable hunger on display.',
      'Wellness framing stays on your clipboard; the boost stays unmistakably indulgent anyway.',
      'Crowd noise swells outside the tent; inside, plates empty like a team sport.',
    ],
  },
]);

registerPool('fair.photo.pageantGlow', [
  {
    when: {},
    weight: 2,
    text: [
      'Pageant lights find every curve; Mary Jane poses like the scale already voted for her.',
      'Hay-scent and hairspray mix; the photo shoot treats fullness as the costume.',
      'She holds the smile through the shutter — pride, softness, and county legend in one frame.',
      'Late-semester fair queens do not suck in; the lens loves honest circumference.',
      'Backdrop banners flutter; collaborators adjust sashes while appetite stays camera-ready.',
    ],
  },
]);

registerPool('fair.photo.collabFrame', [
  {
    when: {},
    weight: 2,
    text: [
      'Partner leans in for the duo shot — rivalry sweet, waists touching, plates still warm.',
      'Ring-light glare on buttered lips; the photo is proof the hall raised her right.',
      'Fabric strains; nobody asks her to hide it — the frame is the flex.',
      'Someone whispers that the floor will see this before lights-out; she only smiles wider.',
      'Cotton candy pink washes the lens; the collab shot feels like a promise to the building.',
    ],
  },
]);

const BOOST_SKELETON = '{fair.boost.midwayPush|prefix:} {fair.boost.partnerHype|prefix: } {fair.day.mjPride|prefix: }';
const PHOTO_SKELETON = '{fair.photo.pageantGlow|prefix:} {fair.photo.collabFrame|prefix: } {fair.day.carnivalAir|prefix: }';

for (const c of COLLABS) {
  registerModuleVariants(`fair.boost.${c}`, [
    {
      when: { fairCollab: [c], weekMin: 20 },
      weight: 6,
      priority: 6,
      text: [BOOST_SKELETON],
    },
    {
      when: { fairCollab: [c], weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [BOOST_SKELETON],
    },
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 5,
      text: [BOOST_SKELETON],
    },
    {
      when: { weekMin: 14 },
      weight: 3,
      priority: 3,
      text: [BOOST_SKELETON],
    },
  ]);
}

registerModuleVariants('fair.boost.Brittany', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 2,
    text: [
      'Brittany rides the boost — numbers climb and the crowd treats appetite like sport.',
      BOOST_SKELETON,
    ],
  },
  {
    when: { fairBoostTier: ['Mid'] },
    weight: 1,
    text: [
      'Brittany treats the midway like a gym — reps are bites, rest is optional, pride is the scoreboard.',
      BOOST_SKELETON,
    ],
  },
]);

registerModuleVariants('fair.boost.Kylie', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 2,
    text: [
      'Camera flash, fair grease, pride spike — Kylie turns training into content before MJ swallows.',
      BOOST_SKELETON,
    ],
  },
]);

registerModuleVariants('fair.boost.Renee', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 2,
    text: [
      'Renee rides the boost — hall pride and appetite share the same scoreboard.',
      BOOST_SKELETON,
    ],
  },
]);

registerModuleVariants('fair.boost.Serena', [
  {
    when: { fairBoostTier: ['High'] },
    weight: 2,
    text: [
      'High-tier Serena training — dohyo drills and chanko until pride steams off MJ’s shoulders.',
      'Serena poses between funnel cakes — every flash adds a pound of legend before MJ claims the ribbon.',
      BOOST_SKELETON,
    ],
  },
]);

registerModuleVariants('fair.photo.Kylie', [
  {
    when: { mjStageBucket: ['mid'], weekMin: 16 },
    weight: 5,
    priority: 7,
    text: [PHOTO_SKELETON],
  },
]);

registerModuleVariants('fair.photo.Brittany', [
  {
    when: { mjStageBucket: ['heavy', 'plump'], weekMin: 16 },
    weight: 5,
    priority: 7,
    text: [PHOTO_SKELETON],
  },
]);

for (const c of COLLABS) {
  registerModuleVariants(`fair.photo.${c}`, [
    {
      when: { fairCollab: [c], weekMin: 20 },
      weight: 6,
      priority: 6,
      text: [PHOTO_SKELETON],
    },
    {
      when: { fairCollab: [c], weekMin: 14 },
      weight: 4,
      priority: 4,
      text: [PHOTO_SKELETON],
    },
    {
      when: { weekMin: 20 },
      weight: 5,
      priority: 5,
      text: [PHOTO_SKELETON],
    },
    {
      when: { weekMin: 14 },
      weight: 3,
      priority: 3,
      text: [PHOTO_SKELETON],
    },
  ]);
}
