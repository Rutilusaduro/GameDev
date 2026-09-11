import { registerDimension, registerPool, render } from '../../engine.js';
import { buildTextContext } from '../../../gameData/textContext.js';
import { appendV2Depth } from '../v2/depthRenderer.js';
import {
  computeHallAmbianceMeters,
  dominantAmbianceAxis,
  ambianceSummaryLine,
} from '../../../gameData/hallAmbiance.js';
import { HALL_ROOMS, getHallRoom } from '../../../gameData/hallBlueprint.js';

registerDimension('ambianceTier', (ctx) => ctx.globals?.ambianceTier ?? 'low');
registerDimension('ambianceDominant', (ctx) => ctx.globals?.ambianceDominant ?? 'comfort');
registerDimension('hallRoomId', (ctx) => ctx.globals?.hallRoomId ?? 'common_lounge');

const SUMMARY_BY_TIER = {
  low: [
    'The floor still feels like default housing — potential waiting on your blueprint.',
    'Bare corridors, default paint. The building has not learned your residents yet.',
    'Ambiance is thin — every wing still sounds like move-in day.',
  ],
  mid: [
    (ctx) => {
      const label = ctx.globals?.ambianceLabel || 'The hall';
      return `${label} ambiance is rising — residents linger longer in the halls.`;
    },
    'Habit is forming: doors stay open, plates stay full, nobody rushes away.',
    'The blueprint is working — the air itself feels heavier with permission.',
  ],
  high: [
    (ctx) => {
      const label = ctx.globals?.ambianceLabel || 'The floor';
      return `${label} owns the atmosphere now — appetite and habit follow the air.`;
    },
    'Residents move like the building trained them — soft, slow, always snacking.',
    'Every corridor smells like someone is always cooking — exactly how you drew it.',
  ],
  max: [
    (ctx) => {
      const label = ctx.globals?.ambianceLabel || 'The floor';
      return `${label} saturates every corridor — the building breathes with your residents.`;
    },
    'Prestige and appetite share the same thermostat. The hall is unmistakably yours.',
    'Tour guides would call this "character." You call it Tuesday.',
  ],
};

registerPool('hall.ambiance.summary', [
  ...Object.entries(SUMMARY_BY_TIER).map(([tier, lines]) => ({
    when: { ambianceTier: [tier] },
    weight: 2,
    text: lines,
  })),
  {
    when: {},
    text: [
      (ctx) => ambianceSummaryLine(ctx.globals?.ownedSnapshot || {}),
      'The floor remembers every upgrade you bought.',
      'Blueprint lines glow on the wall behind your eyes.',
    ],
  },
]);

export function renderHallAmbianceSummary(owned = {}, week = 1) {
  const meters = computeHallAmbianceMeters(owned);
  const dom = dominantAmbianceAxis(meters);
  const val = meters[dom] || 0;
  const tier = val < 25 ? 'low' : val < 55 ? 'mid' : val < 80 ? 'high' : 'max';
  const label = { comfort: 'Comfort', appetite: 'Appetite', logistics: 'Logistics', socialHeat: 'Social Heat', intimacy: 'Intimacy', prestige: 'Prestige' }[dom] || 'Floor';
  const ctx = buildTextContext({
    subject: null,
    week,
    globals: {
      featureId: 'hall_blueprint',
      ambianceTier: tier,
      ambianceDominant: dom,
      ambianceLabel: label,
      ambiancePeak: val,
      ownedSnapshot: owned,
    },
  });
  try {
    const line = render('{hall.ambiance.summary}', ctx)?.trim();
    if (line && !line.includes('{unresolved}')) {
      return appendV2Depth(line, 'homeroom', ctx, 0.16);
    }
  } catch {
    /* fallback */
  }
  return ambianceSummaryLine(owned);
}

const ROOM_BLURB_EXTRA = {
  common_lounge: [
    'Sofas remember every curve that sat too long to leave.',
    'The thermostat is a policy document written in warmth.',
  ],
  kitchen_pantry: [
    'Stock rotation is a love language on this floor.',
    'The walk-in hums like a second heartbeat behind the wall.',
  ],
  ra_office: [
    'Your desk drawer holds snacks and plausible deniability in equal measure.',
    'Calendars here measure appetite in rounds saved on the floor.',
  ],
  social_salon: [
    'Champagne breath and group photos — indulgence with a guest list.',
    'The mirror is for selfies and for watching who lingers at the dessert table.',
  ],
  wellness_nook: [
    'Soft light, softer questions — want learns to speak without shame.',
    'Dream journals stack beside measuring tapes nobody uses honestly.',
  ],
  grand_atrium: [
    'Marble echoes prestige and the sound of belts loosening in unison.',
    'Visitors crane their necks up; residents settle lower into the furniture.',
  ],
};

registerPool('hall.room.blurb', [
  ...HALL_ROOMS.map((room) => {
    const extras = ROOM_BLURB_EXTRA[room.id] || [];
    return {
      when: { hallRoomId: [room.id] },
      weight: 2,
      text: [
        (ctx) => {
          const r = getHallRoom(ctx.globals?.hallRoomId || room.id);
          return r ? `${r.label}: ${r.blurb}` : room.blurb;
        },
        ...extras,
      ],
    };
  }),
  {
    when: {},
    text: [
      'Every wing on the blueprint is a promise the building is learning to keep.',
      'Click a room — the floor tells you what kind of hunger it was built for.',
      (ctx) => {
        const r = getHallRoom(ctx.globals?.hallRoomId || 'common_lounge');
        return r ? `${r.label}: ${r.blurb}` : 'The hall waits on your next line.';
      },
    ],
  },
]);

export function renderHallRoomBlurb(roomId, week = 1) {
  const room = getHallRoom(roomId);
  if (!room) return '';
  const ctx = buildTextContext({
    subject: null,
    week,
    globals: { featureId: 'hall_blueprint', hallRoomId: roomId },
  });
  try {
    const line = render('{hall.room.blurb}', ctx)?.trim();
    if (line && !line.includes('{unresolved}')) {
      return line.startsWith(room.label) ? line : `${room.label}: ${line}`;
    }
  } catch {
    /* fallback */
  }
  return `${room.label}: ${room.blurb}`;
}

registerPool('hall.blueprint.purchase', [
  { when: {}, text: [
    'You sign the work order and the wing changes overnight — new smell, new creak, new permission to linger.',
    'Maintenance pretends not to notice the reinforced joists. The residents notice everything else.',
    'Another line on the blueprint fills in. The floor exhales like a body getting more room to spread.',
  ] },
]);

registerPool('hall.blueprint.upgrade.confirm', [
  { when: {}, text: [
    (ctx) => {
      const r = getHallRoom(ctx.globals?.hallRoomId || 'common_lounge');
      return r
        ? `${r.emoji} ${r.short} wing locks in — ${r.blurb}`
        : 'The blueprint updates; the floor learns a new appetite.';
    },
    'Residents trace the new line on the map with their eyes before their hands find the kitchen.',
    'Another upgrade pinned — habit thickens where policy used to thin out.',
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
