export const HIVE_GRID_WIDTH = 6;
export const HIVE_GRID_HEIGHT = 4;
export const HIVE_ROOM_COUNT = HIVE_GRID_WIDTH * HIVE_GRID_HEIGHT;
export const HIVE_CENTER_ROOM_ID = 9;

export const HIVE_TASKS = [
  { id:"food", label:"Food Gathering", icon:"🍜", color:"#d98cff", desc:"Delivery loops, snack caches, and calorie-dense tribute for Maya and the Hive." },
  { id:"supply", label:"Supply Runs", icon:"📦", color:"#9c7cff", desc:"Blankets, reinforced furniture, lavender lights, and the infrastructure of comfort." },
  { id:"expansion", label:"Expansion", icon:"🕸️", color:"#c78bff", desc:"Soft pressure on adjacent rooms until they accept the Nest's warmth." },
  { id:"maintenance", label:"Maintenance", icon:"🧺", color:"#80d8c0", desc:"Keep the Nest stable, fed, and functional as bodies and deliveries multiply." },
  { id:"recruitment", label:"Recruitment", icon:"💌", color:"#ff91b8", desc:"Delivery people, lonely dorm-mates, and anyone already listening to hunger." },
];

export const HIVE_VPS = {
  lilith: {
    studentId:15,
    name:"Lilith",
    label:"Lilith - Consumption",
    color:"#b02060",
    passive:"Absorb one devotee for a huge Maya gain. Food output also rises with each conquered room.",
    effects:{ foodMult:1.15, absorb:true, spiritPerShift:2 },
  },
  nadia: {
    studentId:12,
    name:"Nadia",
    label:"Nadia - Suggestion",
    color:"#8b78ff",
    passive:"Expansion and recruitment pressure bite deeper. Spirit whispers generate extra room progress.",
    effects:{ expansionMult:1.25, recruitMult:1.2, spiritMult:1.25 },
  },
  kaylee: {
    studentId:11,
    name:"Kaylee",
    label:"Kaylee - Nurturing",
    color:"#55d0a0",
    passive:"Biomass growth is healthier and maintenance stabilizes the Hive more efficiently.",
    effects:{ biomassMult:1.15, maintenanceMult:1.35, stabilityBonus:4 },
  },
  renee: {
    studentId:10,
    name:"Reneé",
    label:"Reneé - Supply Chain",
    color:"#ff9b45",
    passive:"Food Gathering and Supply Runs produce premium results and better nest upgrades.",
    effects:{ foodMult:1.3, supplyMult:1.35 },
  },
  daisy: {
    studentId:13,
    name:"Daisy",
    label:"Daisy - Maternal Authority",
    color:"#e0b456",
    passive:"Dorm conversions complete cleaner, with more new members and less stability strain.",
    effects:{ expansionMult:1.12, memberBonus:1, stabilityBonus:6 },
  },
};

export const HIVE_ROOM_BONUSES = [
  { id:"corner_cache", label:"Corner Cache", desc:"+1 member capacity from hidden snack shelving." },
  { id:"laundry_warmth", label:"Laundry Warmth", desc:"Maintenance gains +10% while this room stays conquered." },
  { id:"delivery_pin", label:"Delivery Pin", desc:"Food Gathering gains +10%; drivers learn the exact door." },
  { id:"quiet_pull", label:"Quiet Pull", desc:"Recruitment gains +10%; the hallway feels easier to enter." },
  { id:"lavender_lamps", label:"Lavender Lamps", desc:"Spirit Pressure costs 1 less resonance." },
  { id:"reinforced_nook", label:"Reinforced Nook", desc:"+2 member capacity from converted furniture." },
];

export const HIVE_MILESTONES = [
  { rooms:6, tag:"[MayaHive_Milestone_25_Control]" },
  { rooms:12, tag:"[MayaHive_Milestone_50_Control]" },
  { rooms:18, tag:"[MayaHive_Milestone_75_Control]" },
  { rooms:24, tag:"[MayaHive_Milestone_100_Control]" },
];

export function createInitialHiveRooms(){
  return Array.from({length:HIVE_ROOM_COUNT},(_,id)=>{
    const x=id%HIVE_GRID_WIDTH;
    const y=Math.floor(id/HIVE_GRID_WIDTH);
    const isCenter=id===HIVE_CENTER_ROOM_ID;
    return {
      id,
      x,
      y,
      status:isCenter?"conquered":"neutral",
      progress:isCenter?100:0,
      occupants:isCenter?1:0,
      craving:isCenter?40:0,
      bonus:isCenter?HIVE_ROOM_BONUSES[2]:HIVE_ROOM_BONUSES[id%HIVE_ROOM_BONUSES.length],
      label:isCenter?"Central Nest":`Dorm ${y+1}-${x+1}`,
      lastTag:isCenter?"[MayaHive_CentralNest_Initial]":null,
    };
  });
}

export function createInitialHiveState(mayaStudentId){
  return {
    mayaStudentId,
    open:false,
    view:"main",
    selectedRoomId:HIVE_CENTER_ROOM_ID,
    shift:0,
    hiveBiomass:25,
    nestComfort:18,
    spiritResonance:8,
    centralNestCapacity:6,
    members:3,
    avgBmi:31,
    stability:82,
    vpId:null,
    assignments:{ food:1, supply:0, expansion:1, maintenance:1, recruitment:0 },
    rooms:createInitialHiveRooms(),
    log:[
      { tag:"[MayaHive_CentralNest_Initial]", text:"The Central Nest is established. Maya waits at the warm center of it.", type:"scene" },
    ],
    seenMilestones:[],
  };
}

export function getHiveControl(rooms){
  return rooms.filter(r=>r.status==="conquered").length;
}

export function getHiveControlPct(rooms){
  return Math.round((getHiveControl(rooms)/HIVE_ROOM_COUNT)*100);
}

export function getHiveBmiTier(avgBmi){
  if(avgBmi>=55) return "Blob";
  if(avgBmi>=48) return "Colossal";
  if(avgBmi>=41) return "Enormous";
  if(avgBmi>=35) return "VeryFat";
  if(avgBmi>=30) return "Fat";
  return "Soft";
}

export function getHiveStageKey(mayaStageId){
  if(mayaStageId>=10) return "Blob";
  if(mayaStageId>=9) return "Colossal";
  if(mayaStageId>=8) return "Enormous";
  if(mayaStageId>=7) return "VeryFat";
  if(mayaStageId>=6) return "Fat";
  return "Heavy";
}

export function getAdjacentRoomIds(id){
  const x=id%HIVE_GRID_WIDTH;
  const y=Math.floor(id/HIVE_GRID_WIDTH);
  const out=[];
  if(x>0) out.push(id-1);
  if(x<HIVE_GRID_WIDTH-1) out.push(id+1);
  if(y>0) out.push(id-HIVE_GRID_WIDTH);
  if(y<HIVE_GRID_HEIGHT-1) out.push(id+HIVE_GRID_WIDTH);
  return out;
}

export function getFrontierRooms(rooms){
  const conquered=new Set(rooms.filter(r=>r.status==="conquered").map(r=>r.id));
  return rooms.filter(r=>r.status!=="conquered"&&getAdjacentRoomIds(r.id).some(id=>conquered.has(id)));
}

export function getHiveCapacity(state){
  const roomCapacity=getHiveControl(state.rooms)*2;
  const bonusCapacity=state.rooms
    .filter(r=>r.status==="conquered")
    .reduce((acc,r)=>acc+(r.bonus?.id==="reinforced_nook"?2:r.bonus?.id==="corner_cache"?1:0),0);
  return state.centralNestCapacity+roomCapacity+bonusCapacity;
}

export function getHiveTaskEfficiency(assigned, optimal){
  if(assigned<=0) return 0;
  if(assigned<=optimal) return assigned;
  return optimal+(assigned-optimal)*0.55;
}

export function makeHiveTag(kind,{mayaStage="Heavy",vpId="none",bmiTier="Soft",rooms=1,task="none",roomId=0}={}){
  return `[MayaHive_${kind}_Maya${mayaStage}_VP${vpId}_BMI${bmiTier}_Rooms${rooms}_${task}_Room${roomId}]`;
}

export function getHiveVpEffect(state){
  return state.vpId ? HIVE_VPS[state.vpId]?.effects || {} : {};
}

export function executeHiveShift(state,{mayaStageId=5}={}){
  const assignments={...state.assignments};
  const vp=getHiveVpEffect(state);
  const roomsControlled=getHiveControl(state.rooms);
  const controlPct=getHiveControlPct(state.rooms);
  const mayaStage=getHiveStageKey(mayaStageId);
  const bmiTier=getHiveBmiTier(state.avgBmi);
  const capacity=getHiveCapacity(state);
  const optimal=Math.max(2,Math.ceil(state.members/3));
  const foodEff=getHiveTaskEfficiency(assignments.food,optimal)*(vp.foodMult||1);
  const supplyEff=getHiveTaskEfficiency(assignments.supply,optimal)*(vp.supplyMult||1);
  const expansionEff=getHiveTaskEfficiency(assignments.expansion,optimal)*(vp.expansionMult||1);
  const maintenanceEff=getHiveTaskEfficiency(assignments.maintenance,optimal)*(vp.maintenanceMult||1);
  const recruitEff=getHiveTaskEfficiency(assignments.recruitment,optimal)*(vp.recruitMult||1);
  const deliveryBonus=state.rooms.some(r=>r.status==="conquered"&&r.bonus?.id==="delivery_pin") ? 1.1 : 1;
  const quietBonus=state.rooms.some(r=>r.status==="conquered"&&r.bonus?.id==="quiet_pull") ? 1.1 : 1;
  const laundryBonus=state.rooms.some(r=>r.status==="conquered"&&r.bonus?.id==="laundry_warmth") ? 1.1 : 1;

  const biomassGain=Math.round((5+foodEff*8+roomsControlled*0.75)*deliveryBonus*(vp.biomassMult||1));
  const comfortGain=Math.round(2+supplyEff*7);
  const resonanceGain=Math.round(2+roomsControlled*0.35+(vp.spiritPerShift||0));
  const avgBmiGain=Math.max(0.2,Math.round((0.25+foodEff*0.18+recruitEff*0.05)*10)/10);
  const maintenanceGain=Math.round((maintenanceEff*8+(vp.stabilityBonus||0))*laundryBonus);
  const stabilityLoss=Math.max(0,Math.round(3+roomsControlled*0.3+assignments.food*0.5-maintenanceEff*1.8-(vp.stabilityBonus||0)/3));

  let rooms=state.rooms.map(r=>({...r}));
  const frontier=getFrontierRooms(rooms).sort((a,b)=>a.progress-b.progress||a.id-b.id);
  let conqueredRoom=null;
  let expansionProgress=0;
  if(frontier.length&&expansionEff>0){
    const target=frontier[0];
    const resonancePush=Math.min(state.spiritResonance,Math.max(0,Math.floor(expansionEff)));
    expansionProgress=Math.round(expansionEff*18+recruitEff*5+resonancePush*(vp.spiritMult||1)*4);
    rooms=rooms.map(r=>{
      if(r.id!==target.id) return r;
      const nextProgress=Math.min(100,r.progress+expansionProgress);
      const nextCraving=Math.min(100,r.craving+Math.round(expansionProgress*0.45));
      return {...r,progress:nextProgress,craving:nextCraving,status:nextProgress>=100?"conquered":"softening"};
    });
    conqueredRoom=rooms.find(r=>r.id===target.id&&r.status==="conquered"&&target.status!=="conquered")||null;
  }

  const recruitSpace=Math.max(0,capacity-state.members);
  const recruitGain=Math.min(recruitSpace,Math.max(0,Math.floor((recruitEff*quietBonus)/2)+(conqueredRoom?1:0)+(vp.memberBonus&&conqueredRoom?vp.memberBonus:0)));
  const conquestMembers=conqueredRoom?Math.min(Math.max(0,capacity-state.members-recruitGain),1+((conqueredRoom.id+state.shift)%3)+(vp.memberBonus||0)):0;
  const memberGain=recruitGain+conquestMembers;
  const nextMembers=Math.min(capacity,state.members+memberGain);
  const nextComfort=state.nestComfort+comfortGain;
  const nextCapacity=state.centralNestCapacity+(nextComfort>=state.centralNestCapacity*18?1:0);
  const nextRoomsControlled=getHiveControl(rooms);
  const newMilestones=HIVE_MILESTONES.filter(m=>nextRoomsControlled>=m.rooms&&!state.seenMilestones.includes(m.rooms));
  const shift=state.shift+1;
  const summaryTag=makeHiveTag("ShiftResult",{mayaStage,vpId:state.vpId||"none",bmiTier,rooms:nextRoomsControlled,task:"mixed",roomId:conqueredRoom?.id??state.selectedRoomId});
  const logs=[
    { tag:summaryTag, text:`Shift ${shift}: +${biomassGain} biomass, +${comfortGain} comfort, +${memberGain} member(s), +${resonanceGain} resonance. Dorm control ${Math.round((nextRoomsControlled/HIVE_ROOM_COUNT)*100)}%.`, type:"system" },
  ];
  if(conqueredRoom){
    logs.push({
      tag:makeHiveTag("RoomConquest",{mayaStage,vpId:state.vpId||"none",bmiTier,rooms:nextRoomsControlled,task:"expansion",roomId:conqueredRoom.id}),
      text:`${conqueredRoom.label} folds into the Hive. ${conquestMembers} occupant(s) settle into Maya's lavender warmth.`,
      type:"conquest",
    });
  }
  newMilestones.forEach(m=>logs.push({ tag:m.tag, text:`Dorm control milestone reached: ${Math.round((m.rooms/HIVE_ROOM_COUNT)*100)}%.`, type:"milestone" }));

  return {
    ...state,
    shift,
    rooms,
    selectedRoomId:conqueredRoom?.id ?? state.selectedRoomId,
    hiveBiomass:state.hiveBiomass+biomassGain,
    nestComfort:nextComfort,
    spiritResonance:state.spiritResonance+resonanceGain,
    centralNestCapacity:nextCapacity,
    members:nextMembers,
    avgBmi:Math.round((state.avgBmi+avgBmiGain)*10)/10,
    stability:Math.max(0,Math.min(100,state.stability+maintenanceGain-stabilityLoss)),
    view:"result",
    lastShift:{ biomassGain, comfortGain, memberGain, resonanceGain, expansionProgress, conqueredRoomId:conqueredRoom?.id??null, stabilityDelta:maintenanceGain-stabilityLoss, controlPct, summaryTag, logs },
    log:[...logs,...state.log].slice(0,40),
    seenMilestones:[...state.seenMilestones,...newMilestones.map(m=>m.rooms)],
  };
}
