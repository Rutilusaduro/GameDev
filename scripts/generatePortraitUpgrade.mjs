// Build unique, stage-and-body-specific portrait alts.
// Overwrites src/textEngine/scenes/body/portraitUpgrade.js
import { writeFileSync } from 'node:fs';
import '../src/textEngine/scenes/body/portraits.js';
import { _registryEntries } from '../src/textEngine/engine.js';

const TYPES = [
  'pear', 'apple', 'hourglass', 'athletic', 'straight', 'rotund',
  'voluptuous', 'mom_bod', 'fertility_goddess', 'topHeavy',
];

const bandOf = (s) => (s <= 1 ? 0 : s <= 3 ? 2 : s <= 5 ? 4 : s <= 7 ? 6 : s <= 9 ? 8 : 10);

const FACE = {
  0: {
    pear: [
      'Her face is still all cheekbone and clean jaw, the future flare of her hips nowhere on it yet.',
      'A bright, narrow face — she still looks like someone who can vanish sideways through a crowd.',
    ],
    apple: [
      'Her face is neat and unburdened, nothing in the cheeks to hint at the belly that will lead later.',
      'A slim oval face, watchful, the middle of her still a rumor under the shirt.',
    ],
    hourglass: [
      'Her face is fine-boned, the hourglass only a rumor in the way her hair falls.',
      'Clean jaw, light cheeks — the mold of curves is set, the clay still thin.',
    ],
    athletic: [
      'Her face is sun-touched and spare, the look of someone who still outruns breakfast.',
      'A taut, trained face — no softness at the jaw, eyes already measuring the next lap.',
    ],
    straight: [
      'Her face is even and light, no single feature claiming more space than the rest.',
      'A slender, unadorned face — the kind that still fits every old photograph.',
    ],
    rotund: [
      'Her face is small and curious, a roundness waiting in the corners of her smile.',
      'Cheeks still flat; the spherical future of her is only a private joke so far.',
    ],
    voluptuous: [
      'Her face already has a plush promise in the mouth, even while the rest stays light.',
      'Softness lives in her expression first — the body will catch up, and it will not be subtle.',
    ],
    mom_bod: [
      'Her face is open and practical, the warmth arriving before the weight does.',
      'A kind, unfussy face — someone built to hug, not yet built to overflow the hug.',
    ],
    fertility_goddess: [
      'Her face is ripe around the mouth already, as if abundance started with the smile.',
      'A generous look in a still-slight face — the harvest has not come in yet.',
    ],
    topHeavy: [
      'Her face sits above a chest that already wants the conversation, even while she is slight.',
      'A fine face, a little forward-tipped — the bust is drafting plans the rest has not signed.',
    ],
  },
  2: {
    pear: [
      'Her cheeks have taken a first soft deposit; the jaw is still hers, just kinder.',
      'A new roundness at the cheek when she smiles — hips are doing the same work below.',
    ],
    apple: [
      'Her face has a faint new fullness; she keeps touching her middle as if the two are related.',
      'Cheeks warming, jaw softening — the belly is writing the first draft of her new face.',
    ],
    hourglass: [
      'Her face has filled just enough to match the new swell at bust and hip.',
      'A softer jaw, a warmer cheek — the hourglass is pouring into the face as well.',
    ],
    athletic: [
      'Training still shows in her face, with a new plushness she has not trained off.',
      'The athlete\'s jaw is still there; a pillow of new cheek has moved in beside it.',
    ],
    straight: [
      'Her face is rounding the way the rest of her is — evenly, without a starring feature.',
      'Cheeks and jaw taking the same quiet padding as her waist and sleeve.',
    ],
    rotund: [
      'Her face has begun to proof — a little doughy at the cheek, pleased about it or not.',
      'Roundness arriving in the face first, a preview of the sphere her body is becoming.',
    ],
    voluptuous: [
      'Her face has gone plush at the mouth and cheek, as if it knew the curves were coming.',
      'A voluptuous softness in the face already — the kind that makes a smile take longer.',
    ],
    mom_bod: [
      'Her face has a lived-in warmth now, cheeks that look like they have been well fed.',
      'Kind eyes, a softer jaw — maternal ease arriving in the face before the lap does.',
    ],
    fertility_goddess: [
      'Her face has ripened; the smile sits in fuller cheeks like fruit in a bowl.',
      'A lush, easy face — abundance practicing on the cheeks before it claims the hips.',
    ],
    topHeavy: [
      'Her face has a faint new softness, always a half-beat behind the chest that leads her.',
      'Cheeks rounding while the bust does the heavier work — the face is catching up politely.',
    ],
  },
  4: {
    pear: [
      'Her face is genuinely round now — a soft chin when she looks down, hips doing worse.',
      'Full cheeks, a thicker neck; the lower half of her has already outrun this news.',
    ],
    apple: [
      'Her face has a comfortable roundness; the belly below has stopped asking permission.',
      'Cheeks plump, chin doubling when she glances at her middle — which she does often.',
    ],
    hourglass: [
      'Her face is plush and pleased; bust and hip have made the same argument, louder.',
      'A full, warm face above an hourglass that has outgrown every old dress.',
    ],
    athletic: [
      'The trained face is still in there, buried under a new, comfortable thickness.',
      'Cheeks gone soft over an athlete\'s bones — the sprint is a memory the jaw keeps.',
    ],
    straight: [
      'Her face is evenly plump, no feature leading, the way the rest of her thickened.',
      'A round, democratic face — cheek, jaw, and neck all taking their fair share.',
    ],
    rotund: [
      'Her face has gone spherical at the cheek; the body below is following the same math.',
      'A doughy, delighted face — or a face pretending not to be delighted. The roundness stays.',
    ],
    voluptuous: [
      'Her face is lush, the smile traveling slowly across full cheeks and a softer throat.',
      'A voluptuous face now, not just a voluptuous body — everything stacks and sways.',
    ],
    mom_bod: [
      'Her face is the face of second helpings — warm, padded, easy to rest a gaze on.',
      'Soft jaw, kind mouth, a double chin that appears when she laughs at her own lap.',
    ],
    fertility_goddess: [
      'Her face is ripe and heavy-lidded, as if the harvest came in behind the eyes first.',
      'Full cheeks, a thick smooth neck — fertility written in the face as clearly as the hips.',
    ],
    topHeavy: [
      'Her face sits above a chest that now dominates the portrait; the cheeks have caught up.',
      'A plush face tipping forward slightly — the bust is the horizon, the face the sky above it.',
    ],
  },
  6: {
    pear: [
      'Her face is a small warm moon above an avalanche of hip and thigh.',
      'Cheeks deep, chin soft; the real weather of her is happening from the waist down.',
    ],
    apple: [
      'Her face is round and unhurried above a belly that has become the room\'s first fact.',
      'A plump, content face — the gut below does the introducing for her.',
    ],
    hourglass: [
      'Her face is lush and small against the stacked vastness of bust and hip.',
      'Full cheeks, heavy-lidded ease — the hourglass beneath her face has gone monumental.',
    ],
    athletic: [
      'An athlete\'s eyes in a vast soft face — power remembered, comfort installed.',
      'The old lean face is a ghost; this one is heavy, warm, and done with split times.',
    ],
    straight: [
      'Her face is uniformly abundant, a match for the even mass from shoulder to knee.',
      'A wide, soft face — no sharp leftover from the girl who used to fit every chair.',
    ],
    rotund: [
      'Her face is a smaller sphere riding a larger one; both of them sway when she laughs.',
      'Cheeks like risen dough above a body that has chosen the circle as its religion.',
    ],
    voluptuous: [
      'Her face is decadent — mouth, cheek, and throat all padded for the long look.',
      'A voluptuous face for a voluptuous weather system; everything on her moves late.',
    ],
    mom_bod: [
      'Her face is pillow-soft, the expression of someone whose lap has become furniture.',
      'Warm, heavy features — a face you could fall asleep against, and a body that invites it.',
    ],
    fertility_goddess: [
      'Her face is a ripe, heavy blessing above hips that have rewritten the doorway.',
      'Lush mouth, thick neck, eyes that know what she is — abundance, seated and sure.',
    ],
    topHeavy: [
      'Her face peeks over a chest that arrives like weather; the cheeks are as full as they can get.',
      'A plush face riding an upper body that has outgrown every neckline in the closet.',
    ],
  },
  8: {
    pear: [
      'Her face is serene and small above hips that need the room to be redesigned.',
      'A calm, padded face — the lower half of her is a landscape the eye has to travel.',
    ],
    apple: [
      'Her face is a warm afterthought above a belly that holds court in the middle of the room.',
      'Round, pleased features; the gut is the portrait, the face a signature in the corner.',
    ],
    hourglass: [
      'Her face is a jewel set in an hourglass the size of furniture.',
      'Soft features, unhurried eyes — curves below her chin have gone architectural.',
    ],
    athletic: [
      'The old competitor looks out from a face buried in comfortable immensity.',
      'A vast soft face with a trained calm still in it — the body has won every event since.',
    ],
    straight: [
      'Her face is as evenly huge as the rest of her — a single continuous softness.',
      'Wide cheeks, thick neck, no leftover angles; she is round in the democratic way.',
    ],
    rotund: [
      'Her face is a happy moon on a planet of belly and flank.',
      'Spherical cheeks, spherical body — the portrait is one long curve from hairline down.',
    ],
    voluptuous: [
      'Her face is lush enough to be a destination; the body beneath is a continent.',
      'Decadent features above stacked, impossible curves — looking takes time.',
    ],
    mom_bod: [
      'Her face is the warm center of a body that has become a couch unto itself.',
      'Soft, maternal features — the lap below could host a meeting, and sometimes does.',
    ],
    fertility_goddess: [
      'Her face is myth-soft above a body that has outgrown ordinary worship.',
      'Ripe, heavy-lidded, pleased — fertility at a scale that rearranges furniture.',
    ],
    topHeavy: [
      'Her face is a small warm sun rising over a mountain range of chest.',
      'Plush features tipping forward — the bust is the foreground of every portrait now.',
    ],
  },
  10: {
    pear: [
      'Her face is a calm island in a sea of hip; the lower body is the weather system.',
      'Small, content features above an immobile harvest of thigh and seat.',
      'Peaceful features; the real portrait is the lower half that no longer travels.',
    ],
    apple: [
      'Her face is peaceful above a belly that is the room\'s warm geography.',
      'A serene oval over forward mass that no longer bothers with travel.',
    ],
    hourglass: [
      'Her face is still hers — soft, present — above curves that have become the room.',
      'Unhurried eyes in a plush face; the hourglass beneath has forgotten what a waist was.',
    ],
    athletic: [
      'The athlete remains only in the set of her mouth; the rest is warm, endless mass.',
      'A trained calm in a face that no longer needs to go anywhere.',
    ],
    straight: [
      'Her face is even, vast, and still — a match for the continuous expanse of her.',
      'Soft features on a body that has become one temperature, one texture, one room.',
    ],
    rotund: [
      'Her face is a smaller globe resting on the larger one she has become.',
      'Round, pleased, going nowhere — the sphere is complete.',
    ],
    voluptuous: [
      'Her face is decadent and still, a luxury boxed in by her own overflow.',
      'Lush features settled into permanence; the curves around them have stopped negotiating.',
    ],
    mom_bod: [
      'Her face is the kindest thing in a body that has become the house.',
      'Warm, pillowy features — she is the furniture, the host, and the feast.',
    ],
    fertility_goddess: [
      'Her face is a blessing left on an altar of her own making.',
      'Ripe, endless calm — the harvest came in and decided to stay forever.',
    ],
    topHeavy: [
      'Her face is a small warm fact above an upper body that has outgrown the rest of physics.',
      'Plush, tipping, content — the chest is the landscape, the face a lookout on it.',
    ],
  },
};

const BODY = {
  0: {
    pear: [
      'Hips still slim, a gap at the thigh, the pear a pencil sketch.',
      'A narrow waist over modest hips — the flare is a rumor she has not earned yet.',
    ],
    apple: [
      'The middle is flat, shirt honest, belly not yet a character in the scene.',
      'A trim torso with the faintest forward thought, nothing you would call a gut.',
    ],
    hourglass: [
      'Bust and hip are polite, waist neat — the mold is empty and waiting.',
      'A light hourglass, more intention than inventory.',
    ],
    athletic: [
      'Muscle still visible at the shoulder and thigh, no padding to hide the work.',
      'A compact trained frame — the body of someone who still wins arguments with stairs.',
    ],
    straight: [
      'Even and slight from collar to knee, no curve taking the lead.',
      'A clean vertical line; clothes hang because there is nothing for them to catch on.',
    ],
    rotund: [
      'A hint of future roundness at the edge of her, nothing spherical yet.',
      'Slim with a soft potential — bread dough before the rise.',
    ],
    voluptuous: [
      'Curves present as a suggestion — bust and hip hinted, not yet in session.',
      'A voluptuous line drawn on thin paper.',
    ],
    mom_bod: [
      'A practical slimness with room to become comfortable, and no hurry about it.',
      'Straight, useful lines — the softness has not moved in.',
    ],
    fertility_goddess: [
      'Wide-hipped potential on a still-slight frame, harvest not yet due.',
      'A goddess outline with none of the weight filled in.',
    ],
    topHeavy: [
      'The chest is already a little ahead of the story; the rest is still catching its breath.',
      'A fuller bust on a slight lower half — the imbalance is a preview.',
    ],
  },
  2: {
    pear: [
      'Hips beginning to mean it, thighs kissing at the top when she stands still.',
      'A new sway low on her; the waist is still small enough to notice the contrast.',
    ],
    apple: [
      'A gentle dome under the shirt, waistband already filing a complaint.',
      'The belly has started its career — small, forward, impossible to tuck away.',
    ],
    hourglass: [
      'Bust and hip swelling on the same schedule, waist going quietly soft between them.',
      'The hourglass is pouring; both ends of her are taking the extra.',
    ],
    athletic: [
      'Muscle still there, wearing a new coat of ease at the thigh and seat.',
      'Trained lines going plush at the edges — the body keeping the trophies and adding padding.',
    ],
    straight: [
      'Even padding at sleeve and waist, no zone showing off.',
      'She is thicker all over by a finger\'s width, democratic as weather.',
    ],
    rotund: [
      'A doughy middle that answers when she sits, a bounce that was not there in August.',
      'Roundness proving in the belly first, the rest of her taking notes.',
    ],
    voluptuous: [
      'Seams sitting closer at bust and hip; the old bra has opinions.',
      'Curves swelling in tandem, already a little indecent in a fitted top.',
    ],
    mom_bod: [
      'A lived-in softness at the waist, the start of a lap that will want company.',
      'Warm thickness at hip and belly — comfort arriving on schedule.',
    ],
    fertility_goddess: [
      'Breasts and hips ripening together, thighs starting to share heat.',
      'Abundance practicing — a richer chest, a wider step.',
    ],
    topHeavy: [
      'The bust has pulled ahead; she leans back a degree to keep the conversation upright.',
      'A chest grown honest, hips still playing catch-up and losing.',
    ],
  },
  4: {
    pear: [
      'Hips wide enough to announce her, thighs in constant warm contact, belly a soft apron.',
      'The lower half is the headline — heavy hips, thick thighs, a seat that finds every chair.',
    ],
    apple: [
      'A real belly now, round and forward, shirts climbing it like a hill.',
      'The gut has a schedule; it arrives first, rests on her lap, and stays for the meeting.',
    ],
    hourglass: [
      'Dramatic curves gone heavy — bust resting on a softening middle, hips taking the doorway.',
      'An hourglass poured too full; waist a sweet memory between two arguments.',
    ],
    athletic: [
      'Power under a comfortable thickness, shoulders still broad, everything else plush.',
      'The athlete\'s frame is the hanger; the new weight is the coat.',
    ],
    straight: [
      'Even plumpness from bust to thigh, no favorite child among the pounds.',
      'A columnar softness — waist, hip, and arm all thickened on the same budget.',
    ],
    rotund: [
      'A dome of a middle, gut and hip one curve, shirt doing theology with the buttons.',
      'She is rounding into a single idea, and the idea is plenty.',
    ],
    voluptuous: [
      'Heavy breasts, wide hips, both of them leading when she turns.',
      'Curves stacked and straining — the body as a series of generous decisions.',
    ],
    mom_bod: [
      'A soft mom-spread, warm at the middle, built for second helpings and long sits.',
      'Maternal thickness from chest to thigh — the hug has more to hold now.',
    ],
    fertility_goddess: [
      'Heavy breasts, thunder thighs, hips that brush the frame without asking.',
      'Ripe, overflowing, a body that looks like a good year.',
    ],
    topHeavy: [
      'The chest is the project; the lower half is still writing the supporting role.',
      'Enormous softness up top, a narrower story below, balance a practiced art.',
    ],
  },
  6: {
    pear: [
      'Hips that need a second thought at every door, thighs displacing each other, belly along for the ride.',
      'A lower body that fills the frame before her face does — pear logic at full volume.',
    ],
    apple: [
      'A heavy gut past the hips, swaying on its own time, the rest of her arranged around it.',
      'The belly is the silhouette; everything else is annotation.',
    ],
    hourglass: [
      'Bust and hip each demanding their own share of the doorway, waist a rumor between them.',
      'Curves stacked past the original mold — an hourglass that forgot the glass.',
    ],
    athletic: [
      'An athlete\'s posture carrying a vast soft argument, strength entombed in ease.',
      'Broad shoulders, buried muscle, a body that still knows how to stand and no longer needs to run.',
    ],
    straight: [
      'Uniform heaviness from shoulder to knee, a single continuous expanse of her.',
      'Even mass, no climax — she is simply, thoroughly, everywhere thicker.',
    ],
    rotund: [
      'A heavy round mass in motion, her own gravity coming through the door with her.',
      'Belly and flank one warm planet; walking is orbit.',
    ],
    voluptuous: [
      'Breasts and belly grown vast, hips answering, every step a delayed jiggle.',
      'Voluptuous excess with a schedule — the after-motion lasts longer than the step.',
    ],
    mom_bod: [
      'A pillowy vastness in motion, maternal mass that needs the wide chair as policy.',
      'Warmth everywhere familiar, scaled up until furniture becomes a suggestion.',
    ],
    fertility_goddess: [
      'Fertility at scale — breasts, belly, and hips all past ordinary clothes.',
      'Ripe curves overwhelming the silhouette; she arrives like a season.',
    ],
    topHeavy: [
      'An enormous bust nearly clipping the frame, the rest of her a supporting act.',
      'Top-heavy mass she balances with care; the chest is the itinerary.',
    ],
  },
  8: {
    pear: [
      'Hips wider than the door planned for, thighs individually enormous, a lower landscape.',
      'The pear has become geography — you walk around her hips the way you walk around a piano.',
    ],
    apple: [
      'A belly like a tide, couch-filling, the primary fact any room has to solve.',
      'Forward mass that needs its own furniture; the rest of her keeps it company.',
    ],
    hourglass: [
      'Curves on curves, all of them enormous, waist a folklore between monuments.',
      'An hourglass poured out to fill the allowance of the room.',
    ],
    athletic: [
      'Athletic breadth buried in doorway-filling bulk, the old posture still trying.',
      'A vast trained frame barely mobile — power as a memory the shoulders keep.',
    ],
    straight: [
      'Round and vast in every measurement, a body the eye has to travel.',
      'Uniform enormity, no rest for the gaze — she is the whole wall.',
    ],
    rotund: [
      'A circumference that surprises doorframes, mostly belly, mostly yes.',
      'Spherical abundance furniture takes personally.',
    ],
    voluptuous: [
      'Bust, belly, and hip all enormous, a body that sways in three directions.',
      'Curves so deep a hand could get lost and be glad of it.',
    ],
    mom_bod: [
      'A pillowy mom-bod that dominates the couch and then some.',
      'A lap wide enough to be seating; warmth broad enough that hugs vanish into it.',
    ],
    fertility_goddess: [
      'Fertility made flesh at a scale that needs a wider world.',
      'Breasts and hips staggering; abundance that reads as intention.',
    ],
    topHeavy: [
      'An enormous chest on an enormous body, the upper half the whole conversation.',
      'A silhouette that leans on sheer bust; planning is part of standing.',
    ],
  },
  10: {
    pear: [
      'A lower body that fills the room and organizes the furniture around itself.',
      'Pear curves merged into immobile mass — hips and thighs as architecture.',
    ],
    apple: [
      'A belly that is most of the room, forward mass gone architectural.',
      'The gut is the climate; she is the weather system that stayed.',
    ],
    hourglass: [
      'The hourglass remembered only in outline, curves merged into warm permanence.',
      'Bust, belly, and hip a continuous landscape, barely mobile, deeply content.',
    ],
    athletic: [
      'Athletic breadth become permanent mass, power remembered in stillness.',
      'Strength entombed in plush immobility — she is the finish line now.',
    ],
    straight: [
      'A single continuous expanse of her, even mass become immobile warmth.',
      'Columnar abundance past ordinary scale, one temperature from collar to knee.',
    ],
    rotund: [
      'A vast round mass, the circle completed, the room arranged around the curve.',
      'Shape remembered only as a circle, warm and going nowhere.',
    ],
    voluptuous: [
      'Voluptuous excess become immobile abundance, a landscape of bust and hip at rest.',
      'Curves merged into warm permanence — looking is a slow activity.',
    ],
    mom_bod: [
      'Maternal softness the room organizes around, a mom-bod past any couch.',
      'Warm immobile abundance — she is the house, and the house is fond of her.',
    ],
    fertility_goddess: [
      'Goddess curves become permanent warmth, harvest settled into a throne of itself.',
      'Fertility made flesh, immobile and vast, a blessing that does not travel.',
    ],
    topHeavy: [
      'A vast upper body outgrowing everything below, chest merged into immobile plush.',
      'Top-heavy warmth as permanent fact — the rest of her is the footnote.',
    ],
  },
};

const MOVE = {
  0: [
    'She still crosses a room like it costs nothing.',
    'Movement is cheap; she spends it without thinking.',
    'She turns on a heel and is already gone.',
  ],
  2: [
    'A new sway stays a beat after she stops.',
    'She moves with a softness that was not in last semester\'s walk.',
    'Steps have a little more rhythm in the hip, a little more after-bounce.',
  ],
  4: [
    'Thighs brush; the walk has learned a roll.',
    'She arrives with a bounce that outlasts the step.',
    'The room is beginning to make space without being asked.',
  ],
  6: [
    'She waddles with pleasant purpose, momentum doing half the work.',
    'Each step is a small negotiation her body has already won.',
    'She leads with the heaviest part of her and lets the rest follow.',
  ],
  8: [
    'She advances like weather — one ponderous decision at a time.',
    'Crossing the room is a project with a beginning, a middle, and a settle.',
    'The floor answers her. She does not hurry it.',
  ],
  10: [
    'She settles rather than walks; arrival is a redistribution.',
    'Motion is a tide, not a stride — she exists, and the room adjusts.',
    'Going somewhere has been replaced by being the somewhere.',
  ],
};

const COR0 = [
  'She still checks whether you noticed, then pretends she was looking at the wall.',
  'A flush climbs when the description gets specific; she does not stop you.',
];
const COR1 = [
  'She holds still for the looking, no longer arguing with the inventory.',
  'The old protest is gone; what remains is a quiet, accurate awareness.',
];
const COR2 = [
  'She lets the looking happen like a woman who ordered this portrait.',
  'Appetite and pride share the same expression; she does not tidy either.',
];

function pickLine(table, type, band, salt) {
  const row = table[band]?.[type] || table[band]?.pear || [];
  if (!row.length) return '';
  return row[Math.abs(salt) % row.length];
}

function moveLine(band, salt) {
  const row = MOVE[band] || MOVE[0];
  return row[Math.abs(salt) % row.length];
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const exist = new Set();
for (const [k] of _registryEntries()) {
  if (/^body\.portrait\.[^.]+\.s\d+\._f\d+$/.test(k)) exist.add(k);
}
const keys = [];
for (const type of TYPES) {
  for (let s = 0; s <= 11; s++) {
    for (let f = 1; f <= 8; f++) {
      const key = `body.portrait.${type}.s${s}._f${f}`;
      if (exist.has(key)) keys.push({ type, s, f });
    }
  }
}

const lines = [];
lines.push('// The Squad — Lead: A5 Editor | Support: A1 Mobile, A6 Slender');
lines.push('// Unique portrait alts — body type × stage × zone, plus corruption shading.');
lines.push('// Generated by scripts/generatePortraitUpgrade.mjs — do not hand-merge slop back in.');
lines.push("import { registerModuleVariants } from '../../engine.js';");
lines.push('');

for (const { type, s, f } of keys) {
  const key = `body.portrait.${type}.s${s}._f${f}`;
  const band = bandOf(s);
  const prefix = f === 1 ? '' : ' ';
  const salt = s * 17 + f * 9 + type.length * 3;
  let core;
  if (f === 1) core = pickLine(FACE, type, band, salt);
  else if (f === 2 || f === 4) core = pickLine(BODY, type, band, salt + f);
  else if (f === 3 || f === 6) core = moveLine(band, salt + f);
  else core = pickLine(BODY, type, band, salt + 11);
  if (!core) continue;
  const texts = [`${prefix}${core}`];
  const extras = f === 1
    ? [pickLine(FACE, type, band, salt + 1), pickLine(FACE, type, band, salt + 2)]
    : [
      pickLine(BODY, type, band, salt + 5),
      moveLine(band, salt + 3),
      pickLine(BODY, type, band, salt + 7),
    ];
  for (const extra of extras) {
    if (extra && extra !== core && !texts.includes(`${prefix}${extra}`)) texts.push(`${prefix}${extra}`);
    if (texts.length >= 3) break;
  }

  lines.push(`registerModuleVariants("${key}", [`);
  lines.push(`  { when: {}, weight: 5, text: [${texts.map((t) => `'${esc(t)}'`).join(', ')}] },`);
  if (f === 1) {
    const c0 = COR0[s % COR0.length];
    const c1 = COR1[s % COR1.length];
    const c2 = COR2[s % COR2.length];
    lines.push(`  { when: { corruption: [0] }, weight: 3, text: ['${esc(c0)}'] },`);
    lines.push(`  { when: { corruption: [1] }, weight: 3, text: ['${esc(c1)}'] },`);
    lines.push(`  { when: { corruption: [2] }, weight: 3, text: ['${esc(c2)}'] },`);
  }
  lines.push(']);');
}

const out = '/workspace/src/textEngine/scenes/body/portraitUpgrade.js';
writeFileSync(out, `${lines.join('\n')}\n`);
console.log(`wrote ${out} (${keys.length} keys)`);
