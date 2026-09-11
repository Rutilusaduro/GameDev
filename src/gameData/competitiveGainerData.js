// Competitive Gainer config + chat templates — MIGRATION.md extract.
import {
  CG_FILLED_CORKBOARD_SCENES,
  CG_FILLED_SELF_REVIEW,
  CG_FILLED_BINGE_SCENES,
  CG_FILLED_CHAT_TEMPLATES,
  CG_FILLED_MEASUREMENT_REACTIONS,
  CG_RA_REPLY_TEXT,
} from './competitiveGainerText.js';

export const CG_CONFIG = {
  driveTiers:[
    { min:0,  max:10, label:"Invested", color:"#5b9bd5" },
    { min:11, max:25, label:"Driven",   color:"#e8a020" },
    { min:26, max:45, label:"Frenzied", color:"#e05830" },
    { min:46, max:Infinity, label:"Ruthless", color:"#c00000" },
  ],
  // Competitive drive gain ranges
  driveGainNeutral:   [0,1],   // Priya leads in all categories
  driveGainThreat:    [1,3],   // per category where any resident is ahead or within 10%
  // Binge payoff: 1 AP. Base gain interpolated from minBinge→maxBinge by Priya's weight stage (1-7+).
  bingeApCost:    1,
  minBinge:       10,  // lbs at stage 1
  maxBinge:       50,  // lbs at stage 7+
  // Per-drive-tier multiplier on binge gain: Invested/Driven/Frenzied/Ruthless
  bingeDriveMults: [1, 1.25, 1.5625, 1.953],
  // "Threat" threshold: resident is within this fraction of Priya's value
  threatFraction: 0.10,
  // Measurement categories tracked
  categories: ["waist","bust","hip","thigh","arm"],
};

export const CG_CORKBOARD_SCENES = CG_FILLED_CORKBOARD_SCENES;

// Placeholder measurement-session scenes — Grok fills in prose
// Indexed as: MeasurementScenes[targetWeightStageName][priyaRelation] where
//   priyaRelation = "priya_larger" | "priya_smaller" | "priya_equal"
export const CG_MEASUREMENT_SCENES = {
  // scene prose for each resident being measured
  scene:"[MeasurementScene_{name}_S{stage}]",
  reactions: CG_FILLED_MEASUREMENT_REACTIONS,
  selfReview: CG_FILLED_SELF_REVIEW,
};

export const CG_BINGE_SCENES = CG_FILLED_BINGE_SCENES;

// Group chat templates — Grok fills in prose
// Template strings may contain {priyaWeight}, {priyaWaist}, {priyaBust}, etc.
export const CG_CHAT_TEMPLATES = {
  // Priya's opening post per drive tier
  priyaPost: CG_FILLED_CHAT_TEMPLATES.priyaPost,
  // Priya's follow-up after seeing replies
  priyaFollowup: CG_FILLED_CHAT_TEMPLATES.priyaFollowup,
  // Per-resident reply templates. Each resident has 5 reply types.
  // reply type selected by: resident lbs vs Priya's lbs + whether measured
  residents:{
    Brittany:  { ahead:"Thigh column says you still have work to do, Priya. I am not apologizing for winning there.", behind:"Fine, your numbers are bigger this week. I am saving this message for later.", close:"My thighs are close enough that you should probably underline them in red.", proud:"Solid gains on my end. The board can acknowledge that.", unmeasured:"Measure me properly before you start celebrating too hard." },
    Cassidy:  { ahead:"At least one of my numbers is still ahead of yours. Update the board.", behind:"Your lead is real. Annoying, but real.", close:"The margin is tight enough to matter. I wouldn't call that comfortable.", proud:"My trend line is still climbing. That's what I care about.", unmeasured:"Unmeasured means unknown. Measure me." },
    Kylie:     { ahead:"Bust numbers say hi. Cute board though.", behind:"Okay, your whole scoreboard thing is getting kind of scary.", close:"Some of us are still close in the categories that photograph best.", proud:"Posted a progress pic and the comments noticed. Just saying.", unmeasured:"If you want my numbers, book a session. I need good lighting." },
    Serena:    { ahead:"Category lead is category lead. I will take the win.", behind:"You are ahead. I see it. I train better with a target.", close:"Close enough to make this competitive, which is the only interesting version.", proud:"My gains are efficient. That still counts.", unmeasured:"No official measurement, no official bragging rights." },
    Fiona:     { ahead:"The body is making its own argument today. Apparently mine has a footnote over yours.", behind:"Your scale is becoming the dominant shape of the composition.", close:"The numbers are nearly touching. That tension is visually useful.", proud:"I am changing in a way the board does not fully capture.", unmeasured:"You cannot compare what you have not observed." },
    Destiny:   { ahead:"Leaderboard says I am up in at least one stat. Screenshotting.", behind:"Your build is overtuned right now. Respectfully, nerf incoming never.", close:"Gap is small. I am calling that contested territory.", proud:"Slow grind, visible results. Patch notes look good.", unmeasured:"Unranked until measured. I know how ladders work." },
    Tiffany:   { ahead:"How interesting. One of my columns is still above yours.", behind:"Your presentation of the data is very persuasive, Priya. Irritating, but persuasive.", close:"That margin is too narrow for you to sound that confident.", proud:"My progress is elegant and measurable. Both matter.", unmeasured:"Invite me to the measurement session and I will consider the board official." },
    Maya:      { ahead:"Mine is bigger there.", behind:"You are ahead.", close:"Close.", proud:"Growing.", unmeasured:"You can measure if you want." },
    Nadia:     { ahead:"Threat response noted. I am curious what you do with it.", behind:"Your dominance language is increasing alongside the measurements. Useful correlation.", close:"Near parity produces excellent behavior from you.", proud:"My numbers are moving in a predictable direction.", unmeasured:"Unmeasured residents often reveal the most when finally measured." },
    Kaylee:    { ahead:"Looks like I am ahead in one place. Do not skip dinner over it - add dessert.", behind:"You are doing beautifully, Priya. The board shows it.", close:"Close numbers can be motivating if you use them kindly. Or intensely. Your choice.", proud:"Steady progress here. Healthy appetite, steady gains.", unmeasured:"Happy to help with a proper measurement session when you want one." },
    Reneé:     { ahead:"One category ahead? That calls for a recipe adjustment.", behind:"Your numbers are rich, Priya. Very full-bodied results.", close:"Close margins need better ingredients. I can help with that.", proud:"My test batches are showing up on the board, as they should.", unmeasured:"Measure after dessert. Before dessert would be bad methodology." },
    Daisy:     { ahead:"Looks like I am still ahead there, honey. You can catch up with a proper meal plan.", behind:"You are growing so well. I hope you are eating enough to support that lead.", close:"A close number just means we should make sure everyone is fed.", proud:"My numbers are coming along. Warm food works.", unmeasured:"I do not mind being measured, but eat first." },
    "Mary Jane": { ahead:"Well, would you look at that. One of mine is still bigger.", behind:"You are outgrowing the board, Priya. That is a compliment.", close:"Close enough that I would add another helping if I were you.", proud:"Been eating well. Numbers usually follow.", unmeasured:"Measure me after supper if you want the honest version." },
    Lilith:    { ahead:"A larger number is such a small kind of hunger. Still, mine is larger.", behind:"Enjoy your lead. I enjoy watching what it makes you do.", close:"So close. I can feel how much that bothers you.", proud:"Growth is a useful appetite. Yours is loud.", unmeasured:"Some measurements are safer not taken until you are ready." },
  },
  // RA reply choices (4 options, each nudges competitive drive meter)
  raReplies:[
    { id:"encourage", ...CG_RA_REPLY_TEXT.encourage },
    { id:"taunt", ...CG_RA_REPLY_TEXT.taunt },
    { id:"observe", ...CG_RA_REPLY_TEXT.observe },
    { id:"challenge", ...CG_RA_REPLY_TEXT.challenge },
  ],
};
