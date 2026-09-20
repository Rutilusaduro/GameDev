// Trophy Wall vignettes — pinned photo captions (FTP_* tags).

export function fairPhotoCaption(ctx) {
  const collab = ctx.globals?.fairCollab || 'Brittany';
  const mj = ctx.subject?.name || 'Mary Jane';
  const bucket = ctx.globals?.mjStageBucket || 'mid';
  const partner = ctx.globals?.partnerName || collab;

  const scale =
    bucket === 'heavy'
      ? 'belly and hips dominate the frame — fair lights, flour on cheeks, victory in the eyes'
      : bucket === 'lean'
        ? 'still farm-strong, but softer now, laughing mid-bite at the practice table'
        : 'midsection round and proud, training sweat and sugar glaze on skin';

  const byCollab = {
    Brittany: `Polaroid: ${mj} and ${partner} shoulder-to-shoulder over speed-eating trays. ${scale}.`,
    Kylie: `Ring-light still: ${mj} poses while ${partner} films — ${scale}; comments already imagined.`,
    Serena: `Wide shot: ${mj} braced like an athlete, ${partner} steadying her back. ${scale}.`,
    Renee: `Warm kitchen lighting: ${mj} mid-feast, ${partner} plating the next course. ${scale}.`,
    Daisy: `Soft snapshot: ${mj} blushing while ${partner} cheers her on. ${scale}.`,
    Lilith: `Dark tent flash: ${mj} surrounded by ${partner}'s recruits — ${scale}; three extra smiles in shadow.`,
  };
  return byCollab[collab] || byCollab.Brittany;
}
