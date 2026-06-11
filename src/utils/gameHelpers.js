// ═══════════════════════════════════════════════════════════════
// SHARED GAME HELPERS
// Pure functions + balance constants used across the app.
// Index 0 = weight stage 5 (Heavy), index 5 = weight stage 10 (Blob)
// ═══════════════════════════════════════════════════════════════
import { SINGULARITY_STAGES, SANGUINE_STAGES, VERDANT_STAGES, PRIMORDIAL_STAGES, getGoddessStage, GODDESS_BODY_DESCS, GODDESS_DIARY, TRIUMVIRATE_BODY_DESC, TRIUMVIRATE_OUTFIT, TRIUMVIRATE_DIARY, SINGULARITY_BODY_DESCS, SINGULARITY_OUTFITS, SINGULARITY_DIARY, PRIMORDIAL_TRIUMVIRATE_BODY_DESC, PRIMORDIAL_TRIUMVIRATE_OUTFIT, PRIMORDIAL_TRIUMVIRATE_DIARY, PRIMORDIAL_BODY_DESCS, PRIMORDIAL_OUTFITS, PRIMORDIAL_DIARY, CELESTIAL_BODY_DESCS, CELESTIAL_OUTFITS, CELESTIAL_DIARY, UMBRAL_BODY_DESCS, UMBRAL_OUTFITS, UMBRAL_DIARY, SANGUINE_BODY_DESCS, SANGUINE_OUTFITS, SANGUINE_DIARY, VERDANT_BODY_DESCS, VERDANT_OUTFITS, VERDANT_DIARY } from '../gameData/ascension.js';
import { BODY_DESCS, OUTFITS, SLIGHT_DIARY, DIARY_ENTRIES } from '../gameData/content.js';
import { EVOLVED_REACTIONS, EVOLVED_DIARY, EVOLVED_OUTFITS } from '../gameData/evolvedForms.js';
import { SKILL_TREE, DIVINE_SKILL_TREE } from '../gameData/skills.js';
import { getStage } from '../gameData/stages.js';
import { CLASS_SCENES } from '../gameData/classEvents.js';

export const ALL_SKILLS = [...SKILL_TREE, ...DIVINE_SKILL_TREE];

export function getSingularityStage(lbs){
  for(let i=SINGULARITY_STAGES.length-1;i>=0;i--)
    if(lbs>=SINGULARITY_STAGES[i].min) return SINGULARITY_STAGES[i];
  return null;
}
export function getSanguineStage(lbs){
  for(let i=SANGUINE_STAGES.length-1;i>=0;i--)
    if(lbs>=SANGUINE_STAGES[i].min) return SANGUINE_STAGES[i];
  return null;
}
export function getVerdantStage(lbs){
  for(let i=VERDANT_STAGES.length-1;i>=0;i--)
    if(lbs>=VERDANT_STAGES[i].min) return VERDANT_STAGES[i];
  return null;
}
export function getPrimordialStage(lbs){
  for(let i=PRIMORDIAL_STAGES.length-1;i>=0;i--)
    if(lbs>=PRIMORDIAL_STAGES[i].min) return PRIMORDIAL_STAGES[i];
  return null;
}

// Passive drain/cultivation amounts by ascension stage
export const SANGUINE_MARK_DRAIN_BY_STAGE   = [3, 5, 8, 12, 18];
export const VERDANT_CULTIVATE_GAIN_BY_STAGE = [3, 5, 8, 12, 18];
export const SANGUINE_DRAIN_AMOUNTS   = [15, 22, 32, 44, 58];
export const VERDANT_ROOT_AMOUNTS     = [12, 18, 26, 36, 50];
export const PRIMORDIAL_PULL_AMOUNTS  = [12, 16, 22, 30, 42];
export const CONVERGENCE_PAIRS = { sanguineVerdant:"primordial", celestialUmbral:"singularity" };

export function getBodyDesc(s){
  if(s.incarnatedGoddess){const gs=getGoddessStage(s.lbs);return GODDESS_BODY_DESCS[gs.id-1];}
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_BODY_DESC;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_BODY_DESCS[sg.id-1] : SINGULARITY_BODY_DESCS[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_BODY_DESC;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_BODY_DESCS[pg.id-1] : PRIMORDIAL_BODY_DESCS[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_BODY_DESCS[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_BODY_DESCS[s.ascensionStage||0];
  const bd=BODY_DESCS[s.bodyType]||BODY_DESCS.straight; return bd[Math.min(getStage(s.lbs).id,bd.length-1)];
}
export function getOutfit(s){
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_OUTFIT;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_OUTFITS[sg.id-1] : SINGULARITY_OUTFITS[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_OUTFIT;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_OUTFITS[pg.id-1] : PRIMORDIAL_OUTFITS[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_OUTFITS[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_OUTFITS[s.ascensionStage||0];
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_OUTFITS[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)];
}
export function getDiary(s){
  if(s.incarnatedGoddess){const gs=getGoddessStage(s.lbs);return GODDESS_DIARY[gs.id-1];}
  if(s.ascensionPath==="convergence"){
    if(s.triumvirateUnlocked) return TRIUMVIRATE_DIARY;
    const sg=getSingularityStage(s.lbs);
    return sg ? SINGULARITY_DIARY[sg.id-1] : SINGULARITY_DIARY[0];
  }
  if(s.ascensionPath==="primordial"){
    if(s.primordialTriumvirateUnlocked) return PRIMORDIAL_TRIUMVIRATE_DIARY;
    const pg=getPrimordialStage(s.lbs);
    return pg ? PRIMORDIAL_DIARY[pg.id-1] : PRIMORDIAL_DIARY[0];
  }
  if(s.ascensionPath==="celestial") return CELESTIAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="umbral")    return UMBRAL_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="sanguine")  return SANGUINE_DIARY[s.ascensionStage||0];
  if(s.ascensionPath==="verdant")   return VERDANT_DIARY[s.ascensionStage||0];
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_DIARY[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const id=getStage(s.lbs).id; if(id===0) return SLIGHT_DIARY[s.archetype]||"—"; const d=DIARY_ENTRIES[s.archetype]; return d?d[Math.min(id-1,9)]:"—";
}
export function getEvolvedReaction(s){
  if(!s.evolvedForm) return null;
  const arr=EVOLVED_REACTIONS[s.evolvedForm]; if(!arr) return null;
  const idx=getStage(s.lbs).id-5; if(idx<0) return null;
  return arr[Math.min(idx,arr.length-1)];
}
export function getEvolvedActivityStageIdx(s){
  const id=getStage(s.lbs).id;
  return Math.max(0,Math.min(id-5,4));
}
export function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

export function generateClassSession(students,week){
  const scenes=[];
  const shuffled=[...students].sort(()=>Math.random()-0.5);
  for(const s of shuffled){
    const matching=CLASS_SCENES.filter(sc=>sc.target==="student"&&sc.filter&&sc.filter(s));
    if(matching.length){ scenes.push({type:"student",scene:matching[rnd(0,matching.length-1)],student:{...s}}); break; }
  }
  const classWide=CLASS_SCENES.filter(sc=>sc.target==="class");
  if(classWide.length) scenes.push({type:"class",scene:classWide[rnd(0,classWide.length-1)],student:null});
  return scenes;
}
