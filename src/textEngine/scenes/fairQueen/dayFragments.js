// Fair Day — weigh-in, judging, afterparty (stage index × training influence).

const INFLUENCE_FLAVOR = {
  None: 'The fair is yours alone — hay-scent, diesel, fried sugar, and a hundred eyes.',
  Brittany: 'Brittany\'s competitive heat rides your shoulder; she wants numbers that embarrass the bracket.',
  Kylie: 'Kylie\'s audience is already here in spirit — phones out before you even step up.',
  Serena: 'Serena\'s calm sits in your ribs: mass is earned, displayed, respected.',
  Renee: 'Reneé\'s flavors ghost your tongue; the crowd smells indulgence on you.',
  Daisy: 'Daisy\'s kindness wraps the moment — you feel coached, adored, and very visible.',
  Lilith: 'Lilith\'s shadow makes the crowd lean in; appetite feels like a spell.',
};

function fairArc(stageIdx) {
  if (stageIdx <= 1) return 'first big fair';
  if (stageIdx <= 3) return 'rising champion';
  return 'legend night';
}

export function weighInOpen(ctx) {
  const inf = ctx.globals?.fairInfluence || 'None';
  const si = ctx.globals?.fairStageIdx ?? 0;
  const arc = fairArc(si);
  const flavor = INFLUENCE_FLAVOR[inf] || INFLUENCE_FLAVOR.None;
  const name = ctx.subject?.name || 'Mary Jane';
  return `The weigh-in bell rings for ${name}'s ${arc}. ${flavor}\n\nCanvas creaks under her; the announcer grins too wide. You squeeze her hand — coach, partner, co-conspirator — as the scale waits.`;
}

export function weighInChoiceGround(ctx) {
  const name = ctx.subject?.name || 'She';
  return `${name} plants her boots (or what passes for boots) and lifts her chin. No performance — just truth on steel. The crowd hushes like they know weight is about to become a story.`;
}

export function weighInChoiceCrowd(ctx) {
  const name = ctx.subject?.name || 'She';
  return `${name} winks at the stands, rolls her shoulders, makes the moment a show. Laughter ripples; cameras rise; the scale becomes a stage and she is already eating the applause.`;
}

export function weighInEndGround(ctx) {
  return 'The number lands like a gavel. You nod once — data for rivals, pride for her. Mary Jane exhales, belly soft against your arm, already hungry for what comes next.';
}

export function weighInEndCrowd(ctx) {
  return 'The crowd erupts before the official reads the digits. Mary Jane bows — or tries to — and the fair answers with a roar that feels like second breakfast.';
}

export function judgingBeat(ctx) {
  const inf = ctx.globals?.fairInfluence || 'None';
  const si = ctx.globals?.fairStageIdx ?? 0;
  const name = ctx.subject?.name || 'Mary Jane';
  const extra =
    inf === 'Brittany'
      ? 'Judges whisper about capacity; Brittany would call it respect.'
      : inf === 'Kylie'
        ? 'A judge asks for a photo; Kylie would call that marketing.'
        : inf === 'Lilith'
          ? 'Even the judges lean closer — uneasy, thrilled.'
          : 'Ribbons flutter; fryer smoke curls; the county holds its breath.';
  if (si >= 4) {
    return `${name} does not compete anymore — she presides. ${extra} The queen ribbon is almost redundant; the crowd came to witness mass made public.`;
  }
  return `${name} stands under the lights, ${si <= 1 ? 'new but undeniable' : 'heavier than last season and proud of it'}. ${extra}`;
}

export function afterpartyOpen(ctx) {
  const inf = ctx.globals?.fairInfluence || 'None';
  const tail = inf !== 'None' ? ` ${inf}'s training still hums in your bones.` : '';
  return `Midway lights blur; music thumps through fried air. Victory tastes like sugar and sweat.${tail} There is still food, still touch, still choices about who gets the best of you tonight.`;
}

export function afterpartyCollab(ctx) {
  const p = ctx.globals?.fairInfluence === 'None' ? 'your coach' : ctx.globals?.fairInfluence;
  return `You slip behind a vendor tent with ${p}. Plates appear as if summoned — shared bites, shared heat, bellies still rising while the fair cheers someone else on the main stage.`;
}

export function afterpartyCrowd(ctx) {
  return 'You dive into the crowd instead — hands on your arms, strangers feeding you fair food like offerings. Mary Jane laughs, mouth full, queen of the night whether the ribbon says so or not.';
}

export function afterpartyEnd(ctx) {
  return 'When the lights finally dim, you are fuller, softer, and unmistakably the woman this county will talk about until next year.';
}
