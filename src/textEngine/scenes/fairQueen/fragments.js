// State Fair Queen — training session prose (collab × stage buckets).

function bucket(stage) {
  const n = Number(stage) || 5;
  if (n <= 5) return 'lean';
  if (n <= 7) return 'mid';
  return 'heavy';
}

export function fairMjTone(ctx) {
  const b = ctx.globals?.mjStageBucket || bucket(ctx.d?.stage);
  if (b === 'lean') return 'Mary Jane still has hayfield muscle under the softness — proud, hungry, coachable.';
  if (b === 'mid') return 'Mary Jane owns the training tent now; every breath makes canvas creak and fair lights gleam on her.';
  return 'Mary Jane is the tent\'s weather — warm, vast, impossible to ignore when she laughs.';
}

export function fairPartnerName(ctx) {
  return ctx.globals?.partnerName || ctx.globals?.fairCollab || 'her partner';
}

const TRAINING_BY_COLLAB = {
  Brittany: (ctx) => {
    const p = fairPartnerName(ctx);
    const mj = fairMjTone(ctx);
    const b = ctx.globals?.cStageBucket || 'mid';
    const speed = b === 'lean' ? 'speed drills' : b === 'mid' ? 'timed plates' : 'endurance trays';
    return `${mj}\n\nBrittany barks ${speed} like a captain — "${p}, shoulders down, swallow on the beat." You count reps; the table groans; both women treat fullness like a scoreboard.`;
  },
  Kylie: (ctx) => {
    const mj = fairMjTone(ctx);
    const b = ctx.globals?.cStageBucket || 'mid';
    const lens = b === 'heavy' ? 'wide frame' : 'ring light';
    return `${mj}\n\nKylie angles the ${lens} low so every bite looks obscene. "Hype me while I hype her," she murmurs. Mary Jane eats for the lens and the county fair both — cheeks flushed, belly rising, audience imaginary and already loud.`;
  },
  Serena: (ctx) => {
    const mj = fairMjTone(ctx);
    return `${mj}\n\nSerena sets iron bowls like sumo stones. "Mass is discipline," she says, palm on Mary Jane's back. They eat in athlete silence — chew, breathe, chew — until the room feels like a dohyō and the scale feels like destiny.`;
  },
  Renee: (ctx) => {
    const mj = fairMjTone(ctx);
    const b = ctx.globals?.cStageBucket || 'mid';
    const course = b === 'lean' ? 'three courses' : b === 'mid' ? 'five courses' : 'a slow banquet';
    return `${mj}\n\nReneé plates ${course} with cult precision — butter, cream, engineered bliss. Mary Jane moans on cue; you pour; the night turns velvety. Every spoonful is training disguised as worship.`;
  },
  Daisy: (ctx) => {
    const mj = fairMjTone(ctx);
    return `${mj}\n\nDaisy lines snack tables with kindergarten care — encouragement, napkins, gentle praise. "You're doing so good," she tells Mary Jane, and means it. The feeding is domestic, relentless, and somehow the sweetest cruelty on the circuit.`;
  },
  Lilith: (ctx) => {
    const mj = fairMjTone(ctx);
    const cohort = ctx.globals?.lilithCohort || 'Mid';
    const crowd =
      cohort === 'Early'
        ? 'three newer recruits, wide-eyed and already loosening belts'
        : cohort === 'Mid'
          ? 'three hungry recruits who know exactly why they were chosen'
          : 'three heavy recruits who treat the tent like an altar';
    return `${mj}\n\nLilith's ${crowd} mirror Mary Jane's appetite in eerie unison. Dark wine, dark laughter — "More," Lilith says, and it is not a suggestion. The tent fills with women getting exactly what they came for.`;
  },
};

export function fairTrainingBody(collab, ctx) {
  const fn = TRAINING_BY_COLLAB[collab] || TRAINING_BY_COLLAB.Brittany;
  return fn(ctx);
}

const BOOST_LINES = {
  Brittany: {
    Low: 'Brittany marks Mary Jane\'s pace on a clipboard — fair season starts with discipline, not drama.',
    Mid: 'Brittany and Mary Jane sync like a team: plates cleared, pride climbing, rivals already nervous.',
    High: 'Brittany grins at the empty tables. "County\'s not ready," she says. Mary Jane believes her.',
  },
  Kylie: {
    Low: 'Kylie saves a clip titled "fair prep" — comments will do the rest.',
    Mid: 'The feed buzzes before the fair opens; Kylie\'s edits make Mary Jane look inevitable.',
    High: 'Kylie whispers, "They\'re going to lose their minds on weigh-in day." The algorithm agrees.',
  },
  Serena: {
    Low: 'Serena nods once — respect earned in silence and rice.',
    Mid: 'Serena tests Mary Jane\'s brace; the mass holds. Athlete pride, fair pride, same thing.',
    High: 'Serena bumps Mary Jane\'s shoulder — a mountain acknowledging a mountain.',
  },
  Renee: {
    Low: 'Reneé tucks a menu card into Mary Jane\'s hand like a love letter to appetite.',
    Mid: 'Reneé\'s flavors linger; Mary Jane carries the fair in her breath and hips.',
    High: 'Reneé kisses Mary Jane\'s forehead. "Let them watch you bloom in public."',
  },
  Daisy: {
    Low: 'Daisy packs leftovers and affirmations — gentle fuel for a loud season.',
    Mid: 'Daisy\'s encouragement sticks; Mary Jane stands taller even while she swells.',
    High: 'Daisy tears up at how radiant Mary Jane looks. "You\'re going to win hearts," she says.',
  },
  Lilith: {
    Low: 'Lilith\'s recruits scatter whispering; the fair feels haunted in a good way.',
    Mid: 'Lilith leaves bite marks on the night — pride sharp, appetite sharper.',
    High: 'Lilith smiles like the tent belongs to her. Mary Jane\'s pride feels dangerous now.',
  },
};

export function fairBoostBody(collab, tier, ctx) {
  const lines = BOOST_LINES[collab] || BOOST_LINES.Brittany;
  return lines[tier] || lines.Mid;
}

export { bucket as fairStageBucket };
