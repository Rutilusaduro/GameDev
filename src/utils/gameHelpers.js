// ═══════════════════════════════════════════════════════════════
// SHARED GAME HELPERS
// Pure functions + balance constants used across the app.
// Index 0 = weight stage 5 (Heavy), index 5 = weight stage 10 (Blob)
// ═══════════════════════════════════════════════════════════════
import { BODY_DESCS, OUTFITS } from '../gameData/content.js';
import { EVOLVED_REACTIONS, EVOLVED_DIARY, EVOLVED_OUTFITS } from '../gameData/evolvedForms.js';
import { getStage } from '../gameData/stages.js';
import { CLASS_SCENES } from '../gameData/classEvents.js';
import { createContext, render, hasModule } from '../textEngine/engine.js';
import '../textEngine/lexicon.js'; // registers word.* modules
import '../textEngine/scenes/deviceBody.js';
import '../textEngine/scenes/talia/index.js';
import { renderDiary } from '../textEngine/scenes/diary.js';
import { renderEvolvedDiary } from '../textEngine/scenes/evolvedDiary.js';
import { renderAttitude } from '../textEngine/scenes/attitude.js';
import { appendCampusDiary, appendCampusAttitude } from '../textEngine/scenes/campusSoftening.js';
import { getCampusNarrativeTier } from '../gameData/pharmacistIngredients.js';

export function pharmacistTextOpts(pharmacistState, week = 1) {
  const campusTier = getCampusNarrativeTier(pharmacistState);
  return { campusFattening: campusTier > 0, campusTier, week };
}

export const ALL_SKILLS = [];

export function getBodyDesc(s, week = 1){
  if (s.bodyOverride?.stateType || s.bodyOverride?.bodyTypeOverride) {
    return getBodyDescRich(s, week);
  }
  const bd=BODY_DESCS[s.bodyType]||BODY_DESCS.straight; return bd[Math.min(getStage(s.lbs).id,bd.length-1)];
}
// Season-aware body flavor line via the modular text engine.
export function getBodyDescRich(s,week){
  const ctx=createContext({subject:s,week});
  return render("{word.body|cap}, {word.clothingFit}.",ctx);
}
export function getOutfit(s){
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    const arr=EVOLVED_OUTFITS[s.evolvedForm]; if(arr){ return arr[Math.min(getStage(s.lbs).id-5,arr.length-1)]; }
  }
  const o=OUTFITS[s.archetype]||OUTFITS.default; return o[Math.min(getStage(s.lbs).id,o.length-1)];
}
export function getDiary(s, week = 1, opts = {}){
  if(s.evolvedForm && getStage(s.lbs).id>=5){
    // Modular evolved diary takes priority when a module is registered
    if(hasModule(`diary.${s.evolvedForm}`)){
      return renderEvolvedDiary(s, week);
    }
    const arr=EVOLVED_DIARY[s.evolvedForm];
    if(arr){
      const base=arr[Math.min(getStage(s.lbs).id-5,arr.length-1)];
      const text=typeof base==='function'?base(s):base;
      return appendCampusDiary(text, s, { ...opts, week });
    }
  }
  return renderDiary(s, week, opts);
}
export function getEvolvedReaction(s){
  if(!s.evolvedForm) return null;
  const arr=EVOLVED_REACTIONS[s.evolvedForm]; if(!arr) return null;
  const idx=getStage(s.lbs).id-5; if(idx<0) return null;
  return arr[Math.min(idx,arr.length-1)];
}
export function getAttitude(s, week = 1, opts = {}){
  const evR=getEvolvedReaction(s);
  if(evR) return appendCampusAttitude(evR, s, { ...opts, week });
  return renderAttitude(s, week, opts);
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
