// ═══════════════════════════════════════════════════════════════
// SHARED GAME HELPERS
// Pure functions + balance constants used across the app.
// Index 0 = weight stage 5 (Heavy), index 5 = weight stage 10 (Blob)
// ═══════════════════════════════════════════════════════════════
import { OUTFITS } from '../gameData/content.js';
import { EVOLVED_REACTIONS, EVOLVED_OUTFITS } from '../gameData/evolvedForms.js';
import { getStage } from '../gameData/stages.js';
import { FLOOR_SCENES } from '../gameData/floorEvents.js';
import { createContext, render } from '../textEngine/engine.js';
import '../textEngine/lexicon.js';
import '../textEngine/scenes/deviceBody.js';
import '../textEngine/scenes/talia/index.js';
import { renderDiary } from '../textEngine/scenes/diary.js';
import { renderAttitude } from '../textEngine/scenes/attitude.js';
import { renderBodyPortrait } from '../textEngine/scenes/body/index.js';
import { appendCampusDiary, appendCampusAttitude } from '../textEngine/scenes/campusSoftening.js';
import { getCampusNarrativeTier } from '../gameData/pharmacistIngredients.js';

export function pharmacistTextOpts(pharmacistState, week = 1) {
  const campusTier = getCampusNarrativeTier(pharmacistState);
  return { campusFattening: campusTier > 0, campusTier, week };
}

export const ALL_SKILLS = [];

export function getBodyDesc(s, week = 1) {
  return renderBodyPortrait(s, week);
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
  const modular = renderDiary(s, week);
  if (modular) return appendCampusDiary(modular, s, { ...opts, week });
  return null;
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

/** Extra floor-check-in choices gated on owned rooms. Cap 2 so the sheet stays readable. */
export function extraFloorChoices(owned = {}) {
  const extras = [];
  if (owned.snack_station) extras.push({
    label: 'Walk her to the floor kitchen',
    effect: { gain: [5, 9], mood: 'content', rel: 6 },
    result: (st) => `${st.name} follows you to the kitchen. Leftover heat does the talking. She eats standing, then sitting, then smiling.`,
  });
  if (owned.comfy_chairs) extras.push({
    label: 'Park her in the new chairs',
    effect: { gain: [2, 5], mood: 'content', rel: 5 },
    result: (st) => `${st.name} sinks into the padded chair and does not get up. The seat takes her. She lets it.`,
  });
  if (owned.dinner_basic) extras.push({
    label: 'Walk her to the dining nook',
    effect: { gain: [4, 8], mood: 'content', rel: 5 },
    result: (st) => `Leftovers from the venue book wait in the nook. ${st.name} sits like the table was saved for her and finishes what you plated.`,
  });
  if (owned.laundry_refit) extras.push({
    label: 'Send her through laundry with a snack',
    effect: { gain: [3, 6], mood: 'content', rel: 4 },
    result: (st) => `Warm machines, bigger towels. ${st.name} eats while the cycle runs and comes back softer in the shoulders.`,
  });
  if (owned.media_nook) extras.push({
    label: 'Put her on the couch under the ring light',
    effect: { gain: [3, 7], mood: 'excited', rel: 5 },
    result: (st) => `The ring light finds her. ${st.name} performs a bite, then a real one. The camera was never the point.`,
  });
  if (owned.floor_scale) extras.push({
    label: 'Stop at the alcove scale',
    effect: { gain: [1, 3], mood: 'focused', rel: 7 },
    result: (st) => `The plant almost hides the readout. ${st.name} steps on anyway. The number is a private joke you both keep.`,
  });
  return extras.slice(0, 2);
}

export function generateFloorCheckIn(students,week,owned={}){
  const scenes=[];
  const shuffled=[...students].sort(()=>Math.random()-0.5);
  for(const s of shuffled){
    const matching=FLOOR_SCENES.filter(sc=>sc.target==="student"&&sc.filter&&sc.filter(s));
    if(matching.length){ scenes.push({type:"student",scene:matching[rnd(0,matching.length-1)],student:{...s}}); break; }
  }
  const hallWide=FLOOR_SCENES.filter(sc=>sc.target==="hall");
  if(hallWide.length) scenes.push({type:"hall",scene:hallWide[rnd(0,hallWide.length-1)],student:null});
  const extras=extraFloorChoices(owned);
  if(!extras.length) return scenes;
  for(let i=0;i<scenes.length;i+=1){
    const entry=scenes[i];
    if(entry.type!=='student'||!entry.scene) continue;
    scenes[i]={
      ...entry,
      scene:{
        ...entry.scene,
        choices:[...entry.scene.choices,...extras],
      },
    };
  }
  return scenes;
}

/** @deprecated use generateFloorCheckIn */
export const generateClassSession = generateFloorCheckIn;
