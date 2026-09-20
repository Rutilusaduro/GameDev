import { depthCgDriveGain } from './mechanicsDepthLayer.js';

/** Depth-scaled competitive drive roll bounds (HallPass CG handlers). */
export function scaleCgDriveRange(range = [0, 0]) {
  const lo = range[0] ?? 0;
  const hi = range[1] ?? lo;
  return [depthCgDriveGain(lo), depthCgDriveGain(Math.max(lo, hi))];
}

export const CG_STAGE_KEYS = ["Heavy","Fat","VeryFat","Enormous","Colossal","Blob"];

// CG scene stub migration (step 6 pilot) — bridge cells; cgSceneFragments @ week 20+.

export const CG_FILLED_REACTIONS = [
  "Competitive reaction 0 bridge — modular cg.scene overlay.",
  "Competitive reaction 1 bridge — modular cg.scene overlay.",
  "Competitive reaction 2 bridge — modular cg.scene overlay.",
  "Competitive reaction 3 bridge — modular cg.scene overlay.",
  "Competitive reaction 4 bridge — modular cg.scene overlay.",
  "Competitive reaction 5 bridge — modular cg.scene overlay."
];

export const CG_FILLED_DIARY = [
  "Diary entry 1 — corkboard obsession bridge; cg.scene @ week 20+.",
  "Diary: I have added five more residents to the board. Late-semester voice lives in modular cg.scene slots.",
  "Diary entry 3 — corkboard obsession bridge; cg.scene @ week 20+.",
  "Diary entry 4 — corkboard obsession bridge; cg.scene @ week 20+.",
  "Diary entry 5 — corkboard obsession bridge; cg.scene @ week 20+.",
  "Diary entry 6 — corkboard obsession bridge; cg.scene @ week 20+."
];

export const CG_FILLED_OUTFITS = [
  "Outfit stage 0 bridge — tailored pieces strain; modular voice late game.",
  "Outfit stage 1 bridge — tailored pieces strain; modular voice late game.",
  "Outfit stage 2 bridge — tailored pieces strain; modular voice late game.",
  "Outfit stage 3 bridge — tailored pieces strain; modular voice late game.",
  "Outfit stage 4 bridge — tailored pieces strain; modular voice late game.",
  "Outfit stage 5 bridge — tailored pieces strain; modular voice late game."
];

export const CG_FILLED_CORKBOARD_SCENES = {
  "Invested": [
    "Corkboard Invested beat 0 — Priya updates pins; cg.scene modular voice @ week 20+.",
    "Corkboard Invested beat 1 — Priya updates pins; cg.scene modular voice @ week 20+."
  ],
  "Driven": [
    "Corkboard Driven beat 0 — Priya updates pins; cg.scene modular voice @ week 20+.",
    "Corkboard Driven beat 1 — Priya updates pins; cg.scene modular voice @ week 20+."
  ],
  "Frenzied": [
    "Corkboard Frenzied beat 0 — Priya updates pins; cg.scene modular voice @ week 20+.",
    "Corkboard Frenzied beat 1 — Priya updates pins; cg.scene modular voice @ week 20+."
  ],
  "Ruthless": [
    "Corkboard Ruthless beat 0 — Priya updates pins; cg.scene modular voice @ week 20+.",
    "Corkboard Ruthless beat 1 — Priya updates pins; cg.scene modular voice @ week 20+."
  ]
};

export const CG_FILLED_SELF_REVIEW = {
  "Heavy": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review Heavy/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "waist",
      "text": "Self-review Heavy/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "hip",
      "text": "Self-review Heavy/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "waist",
      "text": "Self-review Heavy/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  },
  "Fat": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review Fat/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "waist",
      "text": "Self-review Fat/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "hip",
      "text": "Self-review Fat/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "waist",
      "text": "Self-review Fat/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  },
  "VeryFat": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review VeryFat/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "waist",
      "text": "Self-review VeryFat/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "thigh",
      "text": "Self-review VeryFat/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "hip",
      "text": "Self-review VeryFat/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  },
  "Enormous": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review Enormous/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "bust",
      "text": "Self-review Enormous/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "waist",
      "text": "Self-review Enormous/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "thigh",
      "text": "Self-review Enormous/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  },
  "Colossal": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review Colossal/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "waist",
      "text": "Self-review Colossal/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "hip",
      "text": "Self-review Colossal/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "waist",
      "text": "Self-review Colossal/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  },
  "Blob": {
    "Invested": {
      "focus": "waist",
      "text": "Self-review Blob/Invested — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Driven": {
      "focus": "waist",
      "text": "Self-review Blob/Driven — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Frenzied": {
      "focus": "waist",
      "text": "Self-review Blob/Frenzied — tape reads {measurement}; modular overlay @ week 20+."
    },
    "Ruthless": {
      "focus": "waist",
      "text": "Self-review Blob/Ruthless — tape reads {measurement}; modular overlay @ week 20+."
    }
  }
};

export const CG_FILLED_BINGE_SCENES = {
  "Heavy": {
    "Invested": "Binge Heavy/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge Heavy/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge Heavy/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge Heavy/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  },
  "Fat": {
    "Invested": "Binge Fat/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge Fat/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge Fat/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge Fat/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  },
  "VeryFat": {
    "Invested": "Binge VeryFat/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge VeryFat/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge VeryFat/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge VeryFat/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  },
  "Enormous": {
    "Invested": "Binge Enormous/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge Enormous/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge Enormous/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge Enormous/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  },
  "Colossal": {
    "Invested": "Binge Colossal/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge Colossal/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge Colossal/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge Colossal/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  },
  "Blob": {
    "Invested": "Binge Blob/Invested bridge — containers emptied; modular cg.scene carries detail.",
    "Driven": "Binge Blob/Driven bridge — containers emptied; modular cg.scene carries detail.",
    "Frenzied": "Binge Blob/Frenzied bridge — containers emptied; modular cg.scene carries detail.",
    "Ruthless": "Binge Blob/Ruthless bridge — containers emptied; modular cg.scene carries detail."
  }
};

const chat = {
  Heavy: {
    Invested:"Weekly data check-in. My waist and total weight are already showing a solid early lead. The board is updating nicely.",
    Driven:"Numbers are climbing steadily. I am ahead in waist and closing gaps elsewhere. Do not get comfortable.",
    Frenzied:"My measurements are pulling ahead faster than expected. Waist lead is clear. Catch up if you can.",
    Ruthless:"My waist and overall mass are dominating. The rest of you are already falling behind. Keep trying.",
  },
  Fat: {
    Invested:"Updated measurements posted. My belly is rounding out nicely and my waist lead is holding strong. Data remains clean.",
    Driven:"Thighs and waist both up significantly. I am building a comfortable margin across multiple categories. The competition is on.",
    Frenzied:"My belly is getting heavy and my numbers are surging. Waist and hips looking very strong. Who wants to challenge that?",
    Ruthless:"My thickening belly and widening hips are claiming clear leads. The board reflects the truth. None of you are close.",
  },
  VeryFat: {
    Invested:"Latest measurements logged. My belly and thighs are performing exactly as projected. Leading in most major categories.",
    Driven:"Heavy rolls and a prominent belly have me ahead in waist, hips, and total weight. The gap is widening nicely.",
    Frenzied:"My body is really starting to show. Massive thigh and waist leads. Try to keep up if you dare.",
    Ruthless:"This heavy belly and these thick thighs dominate every column that matters. The rest of you are barely relevant anymore.",
  },
  Enormous: {
    Invested:"Enormous progress logged. My belly and hips continue to lead across the board. The data supports continued dominance.",
    Driven:"My enormous gut and thick thighs have secured commanding leads. The numbers speak for themselves.",
    Frenzied:"This body is unstoppable. Waist, hips, and total weight all mine by a huge margin. Come at me.",
    Ruthless:"My frame owns every important measurement. The board is a massacre. Stay in your lanes.",
  },
  Colossal: {
    Invested:"Latest updates complete. My measurements continue to tower over everyone else's. The trend is unmistakable.",
    Driven:"This colossal belly and these massive thighs have crushed the competition. Leads are overwhelming.",
    Frenzied:"My body is destroying the leaderboard. Every category belongs to me now. Keep feeding if you think you can close this.",
    Ruthless:"My mass makes the rest of you look pathetic. The board is mine. It will stay that way.",
  },
  Blob: {
    Invested:"Latest measurements logged. My immense body maintains total dominance across all tracked categories. The data is flawless.",
    Driven:"This overwhelming mass has rendered the competition irrelevant. Every measurement is overwhelmingly mine.",
    Frenzied:"My body is beyond anything any of you can reach. The board is a total victory. I am still growing.",
    Ruthless:"This body has ended the game. My numbers eclipse everyone else's by an absurd margin. There is no competition left. Only me.",
  },
};

export const CG_FILLED_CHAT_TEMPLATES = {
  priyaPost: chat,
  priyaFollowup: {
    leading: {
      Invested:"Interesting responses. My numbers are still holding strong across the board. Keep the data coming, everyone.",
      Driven:"Good effort from some of you. My waist and total weight leads remain comfortable. The gap is exactly where I want it.",
      Frenzied:"Cute replies. My measurements are pulling further ahead every day. None of you are even close right now.",
      Ruthless:"Pathetic attempts. My body dominates every category that matters. The board does not lie - keep feeding if you think you can change that.",
    },
    threatened: {
      Invested:"Noted the close numbers from a few of you. My next measurements will widen the gap again. This is still early.",
      Driven:"Some of you are getting dangerously close in thighs and hips. Unacceptable. I will be adjusting my intake starting tonight.",
      Frenzied:"I see those numbers. Someone thinks they can challenge my waist lead? Cute. Watch how fast I pull away.",
      Ruthless:"A temporary threat in one or two categories. How adorable. My body will crush every single gap by the end of the week. Enjoy it while it lasts.",
    },
  },
};

const prof = (label, driveDelta, byStage, fallback) => ({ label, driveDelta, byStage, fallback });
/** @deprecated use CG_RA_REPLY_TEXT */
export const CG_PROFESSOR_REPLY_TEXT = {
  encourage: prof("You're clearly in the lead", 2, {
    Heavy:"The data supports your position, Priya. {residentName}'s {bodypart} is already falling behind your heavy belly. Keep going.",
    Fat:"Excellent progress, Priya. {residentName}'s {bodypart} cannot compare to that rounding belly and thicker thighs of yours. Well done.",
    VeryFat:"Your very fat body is performing beautifully, Priya. {residentName}'s {bodypart} looks modest next to those heavy rolls and prominent belly of yours.",
    Enormous:"Truly impressive work, Priya. {residentName}'s {bodypart} is nowhere near the scale of your enormous gut and heavy rolls. You are pulling away beautifully.",
    Colossal:"Your colossal body continues to impress, Priya. {residentName}'s {bodypart} seems almost dainty next to your overwhelming curves.",
    Blob:"Your blob-like body is a masterpiece, Priya. {residentName}'s {bodypart} is insignificant compared to the sheer scale of you.",
  }, "The measured board is already bending around you, Priya. No one has a clean lead over you right now; use that certainty and widen the margins."),
  taunt: prof("Point out a rival", 3, {
    Heavy:"{residentName}'s {bodypart} is looking dangerously competitive this week. Your own is coming along nicely, but you might want to push harder if you intend to stay ahead.",
    Fat:"{residentName}'s {bodypart} is starting to close in on yours. With how heavy your belly has gotten, I would hate to see you lose ground in other areas.",
    VeryFat:"{residentName}'s {bodypart} is getting impressively thick. Yours is still ahead for now, but that very fat belly needs more fuel to stay on top.",
    Enormous:"{residentName}'s {bodypart} is starting to look threatening. With how enormous your belly has become, I expect you to handle this quickly.",
    Colossal:"{residentName}'s {bodypart} is gaining ground faster than expected. That colossal belly of yours should have no trouble crushing the threat.",
    Blob:"{residentName}'s {bodypart} is one of the few things even remotely close. With how immense you have become, I expect total annihilation of that threat.",
  }, "No measured rival has a clean category over you, which means the only opponent left is complacency. That should irritate you more than any single number."),
  observe: prof("Just observe the numbers", 1, {
    Heavy:"Interesting early numbers. Your {bodypart} is pulling ahead of {residentName}'s quite nicely while the rest of the floor is still catching up.",
    Fat:"Your fat belly is resting noticeably heavier these days. The board shows you maintaining a strong lead over {residentName}'s {bodypart}.",
    VeryFat:"The board is reflecting your very fat frame quite clearly. You hold a substantial lead over {residentName}'s {bodypart} this week.",
    Enormous:"Your enormous frame is dominating the board. You maintain a commanding lead over {residentName}'s {bodypart}.",
    Colossal:"The board clearly shows your colossal mass in control. You hold a massive lead over {residentName}'s {bodypart}.",
    Blob:"Your immense body completely dominates the board. {residentName}'s {bodypart} barely registers in comparison.",
  }, "The cleanest observation is simple: the board needs more measurements, but every current trend favors you."),
  challenge: prof("Challenge her to close a gap", 2, {
    Heavy:"Your total weight lead is solid, but your {bodypart} could be stronger compared to {residentName}'s. There is room to extend your dominance there.",
    Fat:"Strong waist and thigh leads, but {residentName}'s {bodypart} is gaining fast. You know what to do to widen that gap.",
    VeryFat:"Impressive hip and belly measurements, but {residentName} remains a threat in {bodypart}. I am curious how aggressively you will respond.",
    Enormous:"Your waist and hips are excellent, but {residentName} is close in {bodypart}. That enormous body of yours can do better.",
    Colossal:"Strong leads in most categories, but {residentName} is close in {bodypart}. I want to see that colossal frame extend the gap.",
    Blob:"Even at this scale, {residentName} dares to challenge you in {bodypart}. Show her what true mass looks like.",
  }, "There is no obvious measured gap to close. Create one anyway - choose a category, overfeed it, and make the next board update humiliatingly clear."),
};

/** RA reply copy for Priya competitive-gainer group chat */
export const CG_RA_REPLY_TEXT = CG_PROFESSOR_REPLY_TEXT;

const makeReactionText = {
  "priya_larger": {
    "Invested": {
      "waist": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "bust": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "hip": "She notes {targetName}'s hip measurement with cool composure. Priya's own hips have widened far more by comparison. Her posture straightens slightly as she logs the favorable result.",
      "thigh": "Priya writes {targetName}'s thigh number first, then calmly adds her own much larger measurement beside it. The gap is clear and pleasing. She gives a small, efficient nod before moving on.",
      "arm": "A small, efficient nod of approval crosses Priya's face as she records {targetName}'s arm measurement. Hers is thicker and softer. Everything is progressing exactly as it should."
    },
    "Driven": {
      "waist": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "bust": "A flicker of genuine pleasure shows on Priya's face as the tape reveals {targetName}'s bust. Hers is clearly ahead now. She lingers on the number a moment longer before writing it down with purpose.",
      "hip": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "thigh": "Priya writes {targetName}'s thigh number first, then underlines her own superior measurement with intent. The comparison looks excellent on the page. She gives a firm, satisfied nod.",
      "arm": "A firm, focused nod as Priya logs {targetName}'s arm measurement. Hers is thicker and more substantial. She is already thinking ahead to the next category she intends to dominate."
    },
    "Frenzied": {
      "waist": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "bust": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "hip": "She records {targetName}'s hip measurement with triumphant energy, her whole posture radiating victory. Priya's own hips have grown far heavier and wider. She moves on with renewed urgency.",
      "thigh": "Priya writes {targetName}'s thigh number with aggressive emphasis, then adds her own much larger measurement beside it. A grin tugs at her lips at the pleasing gap.",
      "arm": "A quick, intense nod as Priya logs {targetName}'s arm measurement. Hers is thicker and softer by a comfortable margin. The win fuels her obsession as she pushes forward."
    },
    "Ruthless": {
      "waist": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "bust": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "hip": "She records {targetName}'s hip measurement with commanding presence. Priya's own hips have grown far wider and heavier by comparison. She underlines her lead with slow, deliberate strokes.",
      "thigh": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "arm": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+."
    }
  },
  "priya_smaller": {
    "Invested": {
      "waist": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "bust": "Priya records {targetName} on the board — measurement bridge; cg.scene @ week 20+.",
      "hip": "Priya's jaw tightens noticeably as she records {targetName}'s superior hip measurement. Hers is no longer leading here. She marks it carefully, mind already turning toward corrective action.",
      "thigh": "She stares at {targetName}'s larger thigh number for a long moment before writing it down. The gap is unacceptable. Her focus sharpens with renewed competitive drive.",
      "arm": "Priya's reaction is minimal as she logs {targetName}'s larger arm measurement. Even so, her eyes narrow slightly. Arms matter least, but the trend still displeases her."
    },
    "Driven": {
      "waist": "A sharp scowl flashes across Priya's face as she finishes {targetName}'s waist. The number is larger than hers. She double-checks the tape with intense focus, already planning how to reclaim the lead.",
      "bust": "She notes {targetName}'s larger bust with surface neutrality, but circles the figure with unnecessary pressure. Hers needs to grow faster. Her jaw sets with clear determination.",
      "hip": "Priya's jaw clenches tight as she records {targetName}'s superior hip measurement. The threat is real. She marks it in red, mind racing with strategic adjustments.",
      "thigh": "She stares longer than usual at {targetName}'s larger thigh number, calculating her response. The gap stings. Her posture shifts with focused competitive fire.",
      "arm": "The reaction is small as Priya logs {targetName}'s larger arm, but her eyes narrow with purpose. She will not allow any category to slip for long."
    },
    "Frenzied": {
      "waist": "A sharp scowl twists Priya's features as she records {targetName}'s larger waist. The number is bigger than hers. She checks the tape multiple times in frustration, hunger rising fast.",
      "bust": "Priya notes {targetName}'s larger bust with clear irritation, circling the number aggressively. Hers must overtake this soon. Her breathing quickens with competitive fury.",
      "hip": "Priya's jaw clenches hard as she marks {targetName}'s superior hip measurement. The threat burns. She slams it down in red, obsession flaring.",
      "thigh": "She glares at {targetName}'s larger thigh number before writing it down. The gap is infuriating. Her entire body tenses with urgent need to grow.",
      "arm": "Even her smallest reaction carries visible tension as she logs {targetName}'s larger arm. The trend is unacceptable. She needs more calories, immediately."
    },
    "Ruthless": {
      "waist": "Cold fury settles over Priya as she finishes {targetName}'s larger waist. The number exceeds hers. She checks the tape with ruthless precision, already deciding how she will crush this threat.",
      "bust": "Priya's expression stays flat as she records {targetName}'s larger bust, but the way she circles the number feels menacing. Hers will surpass it. She refuses to tolerate this for long.",
      "hip": "Her jaw locks tight as she marks {targetName}'s superior hip measurement in red. The challenge is noted. Priya's eyes burn with cold, possessive resolve.",
      "thigh": "She stares at {targetName}'s larger thigh number like it personally offends her. The gap will not stand. She writes it with barely contained aggression.",
      "arm": "Priya's reaction appears minimal as she logs {targetName}'s larger arm, but her entire heavy frame radiates cold fury. Every slight will be answered with more weight."
    }
  },
  "priya_equal": {
    "Invested": {
      "waist": "Priya measures {targetName}'s waist twice, her expression focused. The numbers are too close for comfort. She records it carefully, already considering adjustments to pull ahead.",
      "bust": "She notes {targetName}'s near-equal bust with a flat expression. The margin is dangerously tight. Priya circles the number, mind turning toward her next targeted binge.",
      "hip": "Priya's eyes flick toward the corkboard as she logs {targetName}'s near-equal hip measurement. This needs to change soon. She marks it with quiet determination.",
      "thigh": "She records {targetName}'s thigh number, noting how close it sits to hers. A tie is not a win. Her posture remains composed, but the threat is registered.",
      "arm": "Priya marks {targetName}'s near-equal arm measurement and moves on. The closeness is noted. She will not allow it to remain that way for long."
    },
    "Driven": {
      "waist": "Priya measures {targetName}'s waist twice, jaw set. The margin is far too close. She records it with sharp focus, already planning how to widen her lead.",
      "bust": "She notes {targetName}'s near-equal bust with a flat expression that hides growing intensity. This is a problem. She circles the number firmly, mind racing.",
      "hip": "Priya's eyes flick to the corkboard as she logs the near-equal hip measurement. This cannot stand. Her shoulders square with clear competitive intent.",
      "thigh": "She records {targetName}'s thigh number, the closeness making her underline it. A tie is unacceptable. Determination burns in her gaze.",
      "arm": "Priya marks the near-equal arm measurement with focused displeasure. She moves on quickly, already calculating her next move."
    },
    "Frenzied": {
      "waist": "Priya measures {targetName}'s waist twice in rapid succession, frustration building. The numbers are too close. She slams it down, hunger for a bigger lead surging.",
      "bust": "She notes {targetName}'s near-equal bust with visible irritation, circling the number aggressively. This is dangerous. Her breathing quickens with urgency.",
      "hip": "Priya's eyes dart to the corkboard as she records the near-equal hip measurement. It needs to change immediately. Obsession flares across her face.",
      "thigh": "She writes {targetName}'s thigh number with tension, the closeness unacceptable. A tie is not victory. She shifts restlessly, eager to grow.",
      "arm": "Priya marks the near-equal arm measurement with sharp displeasure. The threat lingers. She needs more calories, and she needs them now."
    },
    "Ruthless": {
      "waist": "Priya measures {targetName}'s waist twice, her expression cold. The margin is far too narrow. She records it with ruthless precision, already deciding how she will crush this near-tie.",
      "bust": "She notes {targetName}'s near-equal bust with a flat, dangerous look, circling the number hard. This will not last. Her eyes promise total dominance soon.",
      "hip": "Priya's gaze flicks sharply to the corkboard as she logs the near-equal hip measurement. The threat is clear. She marks it with commanding finality.",
      "thigh": "She records {targetName}'s thigh number, the closeness making her jaw tighten. A tie is not a win. Ruthless resolve settles over her heavy frame.",
      "arm": "Priya marks the near-equal arm measurement with cold displeasure. She will not tolerate parity anywhere. Every category will belong to her."
    }
  }
};

export const CG_FILLED_MEASUREMENT_REACTIONS = makeReactionText;
