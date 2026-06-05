// ── CULTIVATOR EVOLUTION DATA ────────────────────────────────────────────────
// Reneé (id:10) — culinary archetype
// Unlock: Lilith unlocked + lilithKillCount >= 1 + relationship >= 60
// A "taste tester" is recruited, fed across sessions, and harvested.
// Up to 3 complete cycles. Tester starts at Fat (stage 6) and can reach Blob.

export const TESTER_NAMES = [
  "Petra","Hazel","Grace","Victoria","Lauren","Brielle","Shelby","Erin","Gabriella","Allison"
];

export const TESTER_START_LBS = 295; // just above Fat minimum (285)

// Tester's lbs at beginning of each stage (for display)
export const TESTER_STAGE_LBS = { 6:295, 7:370, 8:480, 9:610, 10:830 };

// Reneé's actual lbs gain from harvest at each tester stage
export const HARVEST_GAIN = { 6:32, 7:52, 8:78, 9:110, 10:148 };

// Fat bar fills toward 100 to advance tester one stage
export const FAT_BAR_CAP = 100;

// ── RECIPES ─────────────────────────────────────────────────────────────────

export const RECIPES = {
  milkshake:{
    label:"Milkshake",
    icon:"🥤",
    intro:(name)=>`${name} comes in. The blender is already running. There's a decision to make about what goes in it.`,
    junctions:[
      {
        prompt:"What's the base?",
        choices:[
          { id:"std_base",   label:"Whole milk — standard blend",         desc:"Three scoops, whole milk, a reasonable result. She'll drink it and feel fine.",                    fatGain:8,  suspChange:0  },
          { id:"cream_base", label:"Heavy cream — 'richer recipe today'", desc:"Replace the milk with cream. Same visual. Double the density. She'll comment on the taste.",      fatGain:15, suspChange:6  },
          { id:"malt_base",  label:"Double malt — 'old-school method'",   desc:"Malt extract, extra scoop, a proprietary syrup. She won't identify the sweetness. She will drink all of it.", fatGain:11, suspChange:2 },
        ]
      },
      {
        prompt:"How much goes out?",
        choices:[
          { id:"one_glass",     label:"One glass — normal portion",           desc:"Professional. Measured. She finishes it and thanks you.",                                       fatGain:6,  suspChange:0  },
          { id:"large_cup",     label:"Large cup — 'I made a fresh batch'",   desc:"'I had extra.' She accepts this without a second thought. It's twice the glass.",              fatGain:13, suspChange:4  },
          { id:"full_blender",  label:"'Just finish the blender'",            desc:"The whole thing. You frame it as efficiency. She somehow always does.",                         fatGain:19, suspChange:9  },
        ]
      },
    ]
  },
  cookies:{
    label:"Cookies",
    icon:"🍪",
    intro:(name)=>`${name} arrives. The oven is still warm. There are choices before the plate goes down.`,
    junctions:[
      {
        prompt:"What's in the dough?",
        choices:[
          { id:"std_dough",     label:"Standard recipe",                    desc:"Butter, flour, sugar, a reliable cookie. Nothing to explain.",                                    fatGain:6,  suspChange:0  },
          { id:"sweet_chips",   label:"Extra sugar and chocolate chips",     desc:"'New recipe I've been testing.' She'll ask for them specifically next time.",                    fatGain:11, suspChange:3  },
          { id:"stuffed_dough", label:"Cream-filled center",                 desc:"Filling hidden inside each one. She won't realize the caloric difference until she's done the plate.", fatGain:16, suspChange:5 },
        ]
      },
      {
        prompt:"How many come out of the oven?",
        choices:[
          { id:"twelve",        label:"Twelve — standard dozen",             desc:"Nothing unusual. A normal amount to have around.",                                               fatGain:7,  suspChange:0  },
          { id:"double_batch",  label:"Double batch — 'I always overbake'",  desc:"'I never know when to stop.' She'll take the extras home. Most won't make it.",                 fatGain:14, suspChange:4  },
          { id:"underbaked",    label:"Underbaked — warm and soft",          desc:"More indulgent texture. Harder to stop at two. She won't.",                                      fatGain:17, suspChange:6  },
        ]
      },
      {
        prompt:"How do they get served?",
        choices:[
          { id:"three_plated",  label:"Three on a plate — professional",     desc:"Clean. Polite. Defensible. She eats three and doesn't ask for more.",                           fatGain:5,  suspChange:-2 },
          { id:"finish_batch",  label:"'Help me finish the batch'",          desc:"Framed as a favor to you. She accepts. The batch is substantial.",                               fatGain:15, suspChange:5  },
          { id:"add_milk",      label:"Warm milk alongside",                 desc:"Classic pairing. The volume doubles in the stomach. She thanks you for the thoughtfulness.",     fatGain:18, suspChange:3  },
        ]
      },
    ]
  },
  cake:{
    label:"Cake",
    icon:"🎂",
    intro:(name)=>`${name} is here. The cake is cooling. There are four decisions between now and when she leaves.`,
    junctions:[
      {
        prompt:"What's in the batter?",
        choices:[
          { id:"std_batter",    label:"Standard recipe — reliable crumb",    desc:"Flour, sugar, eggs, butter. A cake anyone would bake. Nothing to explain.",                     fatGain:7,  suspChange:0  },
          { id:"extra_butter",  label:"Extra butter — 'richer today'",       desc:"Twice the fat content. She notices the taste and attributes it to quality ingredients.",        fatGain:14, suspChange:4  },
          { id:"lard_sub",      label:"Lard substitution — bakery method",   desc:"Old trade trick. Denser, heavier, more of everything. She won't know what made the difference.", fatGain:18, suspChange:7 },
        ]
      },
      {
        prompt:"What's the frosting situation?",
        choices:[
          { id:"light_glaze",   label:"Light glaze — minimal, tasteful",     desc:"Thin coat, looks restrained, she eats around it. Suspicious of nothing.",                       fatGain:5,  suspChange:-3 },
          { id:"buttercream",   label:"Thick buttercream",                    desc:"A generous coat. She will scrape the plate with her fork and not comment on it.",              fatGain:12, suspChange:3  },
          { id:"ganache",       label:"Ganache poured over",                  desc:"Glossy, heavy, no structural restraint. She accepts this as an aesthetic choice.",              fatGain:20, suspChange:8  },
        ]
      },
      {
        prompt:"How much does she get?",
        choices:[
          { id:"one_slice",     label:"One slice — normal portion",           desc:"Standard serving. She finishes it and seems satisfied.",                                         fatGain:6,  suspChange:0  },
          { id:"generous",      label:"Generous slice — 'it'll go stale'",   desc:"Standard excuse. She takes the larger piece without questioning the framing.",                  fatGain:15, suspChange:4  },
          { id:"whole_cake",    label:"'Just take the rest home'",            desc:"'I can't eat it all anyway.' She can. She does. She doesn't bring the container back.",        fatGain:21, suspChange:10 },
        ]
      },
      {
        prompt:"Anything to finish it off?",
        choices:[
          { id:"as_is",         label:"As-is — clean and finished",           desc:"Simple. Professional. Nothing that requires explanation.",                                       fatGain:4,  suspChange:0  },
          { id:"cream_sauce",   label:"Cream sauce drizzle",                  desc:"'Just a finishing touch.' It doubles the caloric density of the slice. She doesn't ask.",      fatGain:14, suspChange:5  },
          { id:"ice_cream",     label:"Scoop of ice cream alongside",         desc:"'It pairs well.' She's already full and she eats all of it. She always does.",                 fatGain:21, suspChange:9  },
        ]
      },
    ]
  },
};

// ── EATING REACTIONS ─────────────────────────────────────────────────────────
// Shown at end of session, indexed by suspicion tier

export const EATING_REACTIONS = [
  // suspicion 0-49
  "She eats without comment and leaves looking slightly rounder than when she arrived. Good appetite. No questions. A clean session.",
  // suspicion 50-99
  "She pauses once between servings — the way someone does when they're noticing something without having the word for it yet. She finishes everything.",
  // suspicion 100-139
  "She says 'this is so good, what's in it?' once, before finishing the plate. You give a vague technical answer. She accepts it and eats the rest.",
  // suspicion 140-179
  "She counts the servings under her breath at one point — quietly, like she's running numbers. Then she eats the last one anyway.",
  // suspicion 180-199
  "She's quieter than usual. She looks at what's in front of her for a moment before starting. Then she eats all of it. She does not say goodbye when she leaves.",
];

export function getEatingReaction(suspicion){
  if(suspicion<50)  return EATING_REACTIONS[0];
  if(suspicion<100) return EATING_REACTIONS[1];
  if(suspicion<140) return EATING_REACTIONS[2];
  if(suspicion<180) return EATING_REACTIONS[3];
  return EATING_REACTIONS[4];
}

// ── STAGE-UP TEXT ────────────────────────────────────────────────────────────
// Shown when tester advances one weight stage

export const STAGE_UP_TEXT = {
  6:(name)=>`${name} comes in today wearing different clothes — the old ones didn't fit around the middle anymore, she mentions it like it's incidental, a logistical update rather than an admission. She sits down with the particular care of someone who's gotten used to needing more space. Her appetite is, if anything, improved. She eats everything without being asked.`,
  7:(name)=>`${name} is heavier now in a way that shows when she moves. There's more of her to settle into a chair, more of her to carry across the room. She doesn't mention the weight directly. She does mention she's been unusually hungry lately. "Must be stress," she says. She looks at the plate with the focused attention of someone deciding whether to wait before starting. She doesn't wait.`,
  8:(name)=>`${name} doesn't try to explain anything anymore. The size is simply there — she fills the chair, the table, the space around her. She moves with the deliberate care of a person managing significant mass, and she eats with the complete appetite of someone past the point of pretending otherwise. You notice she checks the chair carefully before sitting down. It holds. She eats.`,
  9:(name)=>`${name} moves differently now. Every action is calculated — the angle of a doorway, the width of a chair, the leverage required to sit and stand. She is very large and very present. She still shows up on schedule and eats with good appetite. She's brought a wider bag. She doesn't explain it. She eats everything you put in front of her with the same thoroughness she always has.`,
};

// ── HARVEST VIGNETTES ────────────────────────────────────────────────────────
// Shown when player harvests the tester. Placeholder prose — fill in later.

export const HARVEST_VIGNETTES_PLANNED = {
  6:(name,rl)=>`[placeholder — ${name} at Fat, Reneé at ${rl}. Planned harvest. She arrives for what she thinks is another session. She leaves changed. Reneé is precise, controlled, satisfied.]`,
  7:(name,rl)=>`[placeholder — ${name} at Very Fat, Reneé at ${rl}. Planned harvest. The subject is noticeably larger than the first time. The harvest is cleanly executed. Reneé's notes are meticulous.]`,
  8:(name,rl)=>`[placeholder — ${name} at Enormous, Reneé at ${rl}. Planned harvest. The subject barely fits the chair. The process takes longer at this size. Reneé considers it the best result so far.]`,
  9:(name,rl)=>`[placeholder — ${name} at Colossal, Reneé at ${rl}. Planned harvest. A subject this size is exceptional. Reneé had not expected to get one this far. She writes down everything.]`,
  10:(name,rl)=>`[placeholder — ${name} at Blob, Reneé at ${rl}. Planned harvest. Maximum yield. Reneé spends a long time in the kitchen afterward. She doesn't go home until late.]`,
};

export const HARVEST_VIGNETTES_EMERGENCY = {
  6:(name,rl)=>`[placeholder — ${name} at Fat, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. Something tipped too far. ${name} asked a question Reneé couldn't answer cleanly. The harvest is rushed. Reneé curses herself for three choices she made in session four. The yield is the same. The cleanup is not.]`,
  7:(name,rl)=>`[placeholder — ${name} at Very Fat, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. It happened faster than expected at this size. Reneé had one session left, maybe two, and lost them to overconfidence. She finishes quickly. She doesn't take notes.]`,
  8:(name,rl)=>`[placeholder — ${name} at Enormous, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. A subject this large is harder to handle under urgency. Reneé manages. She writes 'not again' in the margin of the session log.]`,
  9:(name,rl)=>`[placeholder — ${name} at Colossal, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. Reneé hadn't planned for this. She executes anyway. The yield is extraordinary. She needs to sit down afterward.]`,
  10:(name,rl)=>`[placeholder — ${name} at Blob, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. It shouldn't be possible for a subject this size to become suspicious of anything. Reneé underestimated. She completes it anyway. Extraordinary yield under pressure.]`,
};

// ── GROWTH VIGNETTE ──────────────────────────────────────────────────────────
// Shown to Reneé after harvest — her personal reaction to the gain

export function getGrowthVignette(reneeStageId, gain){
  return `[placeholder — Reneé's growth vignette. She was at stage ${reneeStageId} and gained ${gain} lbs from the harvest. Something shifted in her — not just weight but understanding. The kitchen smells different after. She has notes to write.]`;
}

// ── RECRUITMENT SCENE ────────────────────────────────────────────────────────

export const RECRUITMENT_SCENE = `Reneé has learned to read appetite — not as a professional assessment of hunger, but as character. The ones who come back without being invited. The ones who finish everything and look at the empty dish like they're wondering if asking for more is appropriate. The ones who say "I probably shouldn't" and then do. She has a short list of names. She's ready to make a selection.`;

// ── TESTER APPEARANCE ─────────────────────────────────────────────────────────
// Visual description of the tester per stage, for the student panel display

export const TESTER_APPEARANCE = {
  6:"Full figure, clothes fitting tightly, belly rounding forward when seated. Moves comfortably but deliberately.",
  7:"Very heavy now — belly prominent, thighs wide, slow deliberate movement. She sits with care and takes up the chair completely.",
  8:"Enormous — fills any seat, moves carefully around doorways, belly rests forward at all times. She is undeniable.",
  9:"Colossal — significant mass requiring deliberate management. She shuffles rather than walks. The chair takes her weight with effort.",
  10:"Blob-stage — immobile, vast, entirely present. She fills the space and cannot leave without help.",
};
