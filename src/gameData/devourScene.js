// Command: Devour — long-form scene. She consumes a random stranger (not a roster student).
import { getStage } from './stages.js';
import { pick } from '../textEngine/engine.js';
import { getBodyDescRich } from '../utils/gameHelpers.js';

const VICTIM_NAMES = [
  'a girl from the dining hall',
  'a sophomore nobody recognized',
  'a transfer student with no friends yet',
  'a girl from the library',
  'someone from the campus coffee shop',
  'a quiet girl from the east dorm',
  'a girl who wandered into the wrong building',
  'a student aide on late shift',
  'a girl waiting for a rideshare',
  'someone from the night class down the hall',
];

const VICTIM_DETAILS = [
  'She was maybe nineteen, soft in the way freshmen still are, carrying a paper bag of takeout she never got to eat.',
  'She had headphones in and a nervous smile — the kind of girl who says sorry when you bump into her.',
  'She smelled like vanilla lotion and dining-hall fries. She was alone. That mattered.',
  'She was thin, still — narrow wrists, uncertain posture, the body of someone who has not yet learned what hunger can become.',
  'She laughed too loud at something on her phone, then went quiet when she saw your office door open.',
  'She had been crying. Mascara on one cheek. She said she was fine. She was not fine.',
];

function bodyLine(student, week) {
  return getBodyDescRich(student, week);
}

function stageMass(s) {
  const id = getStage(s.lbs).id;
  if (id <= 4) return 'her thickened curves';
  if (id <= 7) return 'her heavy belly and plush thighs';
  if (id <= 9) return 'her vast soft body';
  return 'her impossible mass';
}

export function buildDevourScene(student, corTier, week = 1) {
  const victim = pick(VICTIM_NAMES);
  const detail = pick(VICTIM_DETAILS);
  const name = student.name;
  const mass = stageMass(student);
  const body = bodyLine(student, week);
  const lbs = Math.round(student.lbs).toLocaleString();

  if (corTier === 0) {
    return `You say the word — devour — and something in ${name} goes very still.

Not hunger. Not yet. Something older.

${detail} ${victim.charAt(0).toUpperCase() + victim.slice(1)}. You brought her here on a pretext — office hours, a form, a kindness. She trusted the door closing behind her. She trusted you.

${name} looks at the girl. Looks at you. Her hands are shaking.

"I can't," she whispers. But her body leans forward anyway — ${mass} shifting, ${body.toLowerCase()}, breath coming faster. "I can't do that. She's a person. She's—"

You say the word again.

What happens next is not eating. It is consumption — violent, total, impossible. ${name} moves with a momentum that frightens her even as she obeys it. The girl screams once. Then the sound is gone — swallowed, literally, into the growing heat of ${name}'s body.

It takes a long time. Long enough for ${name} to feel every pound land.

When it is over, the office is wreckaged — chair overturned, papers scattered, the air thick with warmth and something sweet and wrong. ${name} sits in the center of it at ${lbs} lbs, gasping, transformed.

Her belly hangs heavy and new — distended beyond anything a meal could explain, flesh still settling, still expanding, seams split, skin flushed. She presses both hands to the impossible swell and laughs once — horrified, exhilarated.

"I ate her," ${name} breathes. "I ate a person. I'm—" She looks down at herself. "I'm so much heavier. Right now. I can feel it happening."

She looks at you with eyes that are not entirely hers anymore.

"What am I?" she whispers. "What did you make me?"`;
  }

  if (corTier === 1) {
    return `You say devour and ${name} exhales like you've released a lock she didn't know she was holding.

${detail} ${victim.charAt(0).toUpperCase() + victim.slice(1)}. She came willingly — confused, but willing. ${name} was kind at first. Warm. She offered snacks. She offered her lap. She offered the hungry, heavy weight of ${mass} — ${body.toLowerCase()} — as a place to sit and feel safe.

The girl relaxed. That was the mistake.

${name} devours her in stages — not frantic, not sloppy. Ritual. Methodical. She pulls the girl into her body inch by inch, belly swelling with each swallowed sound, thighs spreading wider on the chair, flesh cascading and settling with every new pound.

The girl's clothes are the last to go — fabric and memory and identity, all pulled into ${name}'s growing heat until there is nothing left but the office and the warmth and the weight.

When it ends, ${name} sits at ${lbs} lbs and rising, belly distended beyond reason, hands cradling the vast new dome of herself. She is breathing through her mouth. She is smiling.

"She tasted afraid at first," ${name} says, clinical and hungry. "Then sweet. Then… nothing. Just calories. Just mass." She looks at you. "I want another."

Her eyes are different. Sharper. The conflict is still there — you can see it in how her fingers tremble against her belly — but it is losing.

"I used to feel guilty," she murmurs. "I can feel it not happening anymore."`;
  }

  // corTier 2 — broken in
  return `You say devour and ${name} smiles.

She has been waiting for this.

${detail} ${victim.charAt(0).toUpperCase() + victim.slice(1)}. ${name} doesn't bother with pretext anymore. She opens the door herself. She calls the girl in. She locks it.

"You brought me someone," ${name} says warmly, not to you — to her belly. At ${lbs} lbs she is ${body.toLowerCase()}, vast and patient, ${mass} spread across the office like weather.

The girl tries to run. ${name} is faster — not with legs, but with hunger. She catches the girl against ${mass}, wraps her in soft impossible weight, and begins.

The devouring is slow. Sensual. Total.

You watch ${name} consume another human being the way she once consumed dessert — with focus, with pleasure, with the deep satisfied sounds of a body that knows exactly what it is for. The girl disappears into her inch by inch: first the screaming, then the struggling, then the wet swallowing sounds, then the silence, then the growth.

${name}'s belly swells in real time — flesh pushing outward, rolling over her thighs, splitting what clothing remains, jiggling with each new pound absorbed. Her breasts grow heavier. Her ass spreads wider. The chair breaks. She doesn't notice.

When the girl is gone, ${name} sits in the wreckage and runs her hands over the new vastness of herself.

"More," she breathes. Not a request. A status report.

She looks at you with eyes that have stopped pretending to be innocent.

"I don't feel bad," ${name} says. "I want you to know that. I thought I might. I don't." She pats her distended belly, affectionate. "She's in here now. All of her. Every pound she ever was — and everything she could have been."

She shifts, and the motion sends slow heavy ripples through her entire body.

"I could do this every week," she murmurs. "I want to. You only have to ask."

The psychological shift is complete — not a crack, not a conflict. A new self, warm and heavy and hungry, looking at you like you are the only person who ever understood what she was becoming.

"Thank you," ${name} says, and means it. "For giving me the word."`;
}

export const DEVOUR_EFFECT = {
  cals: 45000,
  full: 100,
  corruption: 18,
  rel: 3,
  devourShift: true,
};
