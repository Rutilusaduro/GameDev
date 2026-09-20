// State Fair Queen training + Fair Day scene keys — MIGRATION.md extract.
import { depthLbsGrant } from './mechanicsDepthLayer.js';

function scaleFairTrainingLbs(lbs = 0) {
  if (!lbs || lbs <= 0) return lbs || 0;
  return depthLbsGrant(lbs);
}

export const FAIR_TRAINING_CONFIG = {
  apCost: 1,
  maxSessionsPerCycle: 3,
  fairPrideTiers: [
    { min: 0,  max: 14, label: 'Building', color: '#8B7355' },
    { min: 15, max: 29, label: 'Buzzing',  color: '#C8860A' },
    { min: 30, max: Infinity, label: 'Electric', color: '#FFD700' },
  ],
  fairPrideBoosts: {
    Brittany: { base: 6, perStageBonus: 0.5 },
    Kylie:    { base: 7, perStageBonus: 0.5 },
    Serena:   { base: 5, perStageBonus: 0.6 },
    Renee:    { base: 8, perStageBonus: 0.4 },
    Daisy:    { base: 6, perStageBonus: 0.4 },
    Lilith:   { base: 3, perStageBonus: 0.5, perRecruit: 3 },
  },
  gainRanges: { MJ:[3,8], collaborator:[2,5], recruit:[1,4] },
  weighInBonus: { Building:0.0, Buzzing:0.10, Electric:0.25 },
  collaborators: {
    Brittany: { evolvedForm:'eating_captain', label:'🏆 Brittany', influenceKey:'Brittany' },
    Kylie:    { evolvedForm:'feedee_creator', label:'📸 Kylie',    influenceKey:'Kylie' },
    Serena:   { evolvedForm:'sumo',           label:'🏋️ Serena',  influenceKey:'Serena' },
    Renee:    { evolvedForm:'cultivator',     label:'👩‍🍳 Reneé',  influenceKey:'Renee' },
    Daisy:    { evolvedForm:'homeroom_queen', label:'🍎 Daisy',    influenceKey:'Daisy' },
    Lilith:   { evolvedForm:'predator',       label:'🌑 Lilith',   influenceKey:'Lilith', special:true },
  },
  recruitStageRanges: [[0,2],[1,3],[3,5]],
  recruitBodyTypes: ['apple','pear','hourglass','straight','mom_bod','voluptuous','athletic'],
};

/** Depth-scaled fair training lb rolls per role key (MJ / collaborator / recruit). */
export function fairTrainingGainBounds(role) {
  const range = FAIR_TRAINING_CONFIG.gainRanges?.[role];
  if (!range?.length) return [0, 0];
  return [scaleFairTrainingLbs(range[0]), scaleEvolvedEventLbs(range[1])];
}

const _mkTrainingScenes = () => {
  const collabs=['Brittany','Kylie','Serena','Renee','Daisy'];
  const stages=[4,5,6,7,8,9,10];
  const groups=['Early','Mid','Late']; // recruit-cohort size grouping (avg stage)
  const out={};
  for(const c of collabs){
    out[c]={};
    for(const mjs of stages)
      for(const cs of stages)
        out[c][`MJ${mjs}_C${cs}`]=`[FT_${c}_MJ${mjs}_C${cs}]`;
  }
  out.Lilith={};
  for(const mjs of stages)
    for(const ls of stages)
      for(const g of groups)
        out.Lilith[`MJ${mjs}_L${ls}_${g}`]=`[FT_Lil_MJ${mjs}_L${ls}_${g}]`;
  return out;
};
export const FAIR_TRAINING_SCENES = _mkTrainingScenes();

const _mkTrainingPhotos = () => {
  const collabs=['Brittany','Kylie','Serena','Renee','Daisy'];
  const stages=[4,5,6,7,8,9,10];
  const out={};
  for(const c of collabs){
    out[c]={};
    for(const mjs of stages)
      for(const cs of stages)
        out[c][`MJ${mjs}_C${cs}`]=`[FTP_${c}_MJ${mjs}_C${cs}]`;
  }
  out.Lilith={};
  for(const mjs of stages)
    for(const ls of stages)
      out.Lilith[`MJ${mjs}_L${ls}`]=`[FTP_Lil_MJ${mjs}_L${ls}]`;
  return out;
};
export const FAIR_TRAINING_PHOTOS = _mkTrainingPhotos();

const _mkFairDayScenes = () => {
  const stageIdxs=[0,1,2,3,4,5];
  const influenceMap={None:'None',Brittany:'Britt',Kylie:'Kyli',Serena:'Sere',Renee:'Rene',Daisy:'Dais',Lilith:'Lili'};
  const weighIn={}, judging={}, afterparty={};
  for(const si of stageIdxs){
    for(const [inf,ik] of Object.entries(influenceMap)){
      const k=`${si}_${inf}`;
      weighIn[k]={
        open:`[FD_WI_${si}_${ik}_Open]`,
        choice1:{ label:"Hold your ground", result:`[FD_WI_${si}_${ik}_C1]` },
        choice2:{ label:"Play to the crowd", result:`[FD_WI_${si}_${ik}_C2]` },
        endingA:`[FD_WI_${si}_${ik}_EndA]`,
        endingB:`[FD_WI_${si}_${ik}_EndB]`,
        gainA:8, gainB:5, relA:5, relB:9,
      };
      judging[k]=`[FD_JU_${si}_${ik}]`;
      afterparty[k]={
        open:`[FD_AP_${si}_${ik}_Open]`,
        choice1:{ label:"Celebrate with your collaborator", result:`[FD_AP_${si}_${ik}_C1]` },
        choice2:{ label:"Go to the crowd", result:`[FD_AP_${si}_${ik}_C2]` },
        ending:`[FD_AP_${si}_${ik}_End]`,
        gainA:5, gainB:3, relA:8, relB:12,
      };
    }
  }
  return { weighIn, judging, afterparty };
};
export const FAIR_DAY_SCENES = _mkFairDayScenes();

export const FAIR_BOOST_SUMMARIES = {};
for(const c of ['Brittany','Kylie','Serena','Renee','Daisy','Lilith'])
  FAIR_BOOST_SUMMARIES[c]={ Low:`[FBS_${c}_Low]`, Mid:`[FBS_${c}_Mid]`, High:`[FBS_${c}_High]` };
