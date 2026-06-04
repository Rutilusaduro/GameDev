export const WEIGHT_STAGES = [
  { id:0,  label:"Slight",   min:80,  color:"#2a8070", desc:"Noticeably underweight — clothes hang off her frame, collarbone prominent, limbs very slender and angular." },
  { id:1,  label:"Slim",     min:100, color:"#3a8a3a", desc:"Slender and toned — clothes hang loosely, effortless movement." },
  { id:2,  label:"Soft",     min:135, color:"#6a9a20", desc:"A gentle softness settling in. Belly pooching slightly, cheeks a touch fuller, thighs pressing together at the top." },
  { id:3,  label:"Chubby",   min:162, color:"#b0a000", desc:"Visibly rounded belly pushing at waistbands. Face rounder, arms softer, hips wider. Clothes are noticeably tighter." },
  { id:4,  label:"Plump",    min:195, color:"#c07010", desc:"A real belly rounding outward. Double chin forming. Thighs rubbing together. Shirts riding up. Breathing heavier on stairs." },
  { id:5,  label:"Heavy",    min:238, color:"#b05010", desc:"Belly hangs forward prominently. Arms thick and jiggly, legs genuinely chunky. Standard chairs creak. Walks with a slight waddle." },
  { id:6,  label:"Fat",      min:285, color:"#982808", desc:"A clear, rolling waddle. Belly past the hips. Cheeks very round and soft. Chair armrests a tight squeeze. Breathing audible." },
  { id:7,  label:"Very Fat", min:360, color:"#800000", desc:"Belly cascades toward the knees. Arms like soft bolsters. Needs wide doorways. Can't see her feet. Movement slow and deliberate." },
  { id:8,  label:"Enormous", min:465, color:"#600000", desc:"Fills an entire couch. Can't fit in a car. Belly rests on thighs. Getting up requires leverage and real effort." },
  { id:9,  label:"Colossal", min:595, color:"#400000", desc:"Too wide for standard hallways. Reinforced furniture required. Shuffles a few steps at most. A vast, soft, commanding presence." },
  { id:10, label:"Blob",     min:820, color:"#200000", desc:"Entirely immobile. A breathtaking mountain of warm, soft flesh. The room is organised around her." },
];

export function getStage(lbs){
  for(let i=WEIGHT_STAGES.length-1;i>=0;i--) if(lbs>=WEIGHT_STAGES[i].min) return WEIGHT_STAGES[i];
  return WEIGHT_STAGES[0];
}
