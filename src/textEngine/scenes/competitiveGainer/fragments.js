// Competitive Gainer — resident measurement session prose.

function stageBucket(stageId) {
  const n = Number(stageId) || 5;
  if (n <= 5) return 'mid';
  if (n <= 7) return 'heavy';
  return 'vast';
}

export function cgMeasureSession(ctx) {
  const target = ctx.subject?.name || ctx.globals?.targetName || 'She';
  const priya = ctx.globals?.priyaName || 'Priya';
  const tier = ctx.globals?.cgDriveTier || 'Invested';
  const bucket = ctx.globals?.targetStageBucket || 'mid';
  const tone =
    tier === 'Ruthless'
      ? 'cold and possessive'
      : tier === 'Frenzied'
        ? 'hungry and impatient'
        : tier === 'Driven'
          ? 'focused and competitive'
          : 'calm and analytical';

  const body =
    bucket === 'vast'
      ? `${target} settles onto the reinforced stool with a soft groan; rolls shift as the tape disappears into warm folds.`
      : bucket === 'heavy'
        ? `${target} stands steady while you circle her — belly, hips, and thighs already claiming space in the dorm light.`
        : `${target} rolls her shoulders, still plush but mobile, while you clip the tape measure to your belt.`;

  return `${priya} watches from the doorway, ${tone}, corkboard numbers already rearranging in her head.\n\n${body} You call each category; ${target} breathes through the pinch of the tape while ${priya} murmurs measurements under her breath like scores.`;
}

export { stageBucket as cgTargetStageBucket };
