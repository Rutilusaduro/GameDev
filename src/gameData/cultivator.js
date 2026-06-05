// ── CULTIVATOR EVOLUTION DATA ────────────────────────────────────────────────
// Reneé (id:10) — culinary archetype
// Unlock: Lilith unlocked + lilithKillCount >= 1 + relationship >= 60
// A "taste tester" is recruited, fed across sessions, and harvested.
// Up to 4 complete cycles. Tester starts at Fat (stage 6) and can reach Blob.
// Fat bar = XP bar: fills to 100, stage-up, resets. Suspicion resets at stage-up (with carry-in).
// After harvest: Reneé digests for X weeks — no gain, no sessions.

export const TESTER_NAMES = [
  "Petra","Hazel","Grace","Victoria","Lauren","Brielle","Shelby","Erin","Gabriella","Allison"
];

export const TESTER_START_LBS = 295; // just above Fat minimum (285)

// Tester's lbs at beginning of each stage (for display)
export const TESTER_STAGE_LBS = { 6:295, 7:370, 8:480, 9:610, 10:830 };

// Reneé's actual lbs gain from harvest at each tester stage
export const HARVEST_GAIN = { 6:65, 7:130, 8:220, 9:330, 10:470 };

// Fat bar fills toward 100 to advance tester one stage (XP-style: resets, not zeroes)
export const FAT_BAR_CAP = 100;

// Weeks Reneé spends digesting after a harvest (no gain, no sessions)
export const DIGEST_WEEKS = { 6:2, 7:4, 8:6, 9:9, 10:14 };

// Suspicion carry-in fraction when tester stages up (only if suspicion > 75)
export const SUSPICION_CARRY_FRACTION = 0.075;

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
// 2D lookup: Reneé's stage key × tester's stage id.
// Use getPlannedVignette(reneeStageId, testerStageId, testerName) — do not call directly.

export const HARVEST_VIGNETTES_PLANNED = {
  heavy: {
    6: (name) => `You watch from the doorway as ${name} arrives at Reneé's apartment for the scheduled tasting. Reneé, round and soft with her belly hanging forward, greets her with clinical precision from her reinforced chair. The months of careful fattening were the only preparation required. When the moment arrives Reneé consumes the softened tester with methodical focus, savoring the accumulated yield as it integrates into her own frame. ${name} is fully taken, leaving only satisfied stillness. Reneé sits noticeably fuller afterward, logging the exact transfer with flour-dusted hands while the warm kitchen feels slightly more crowded around her.`,
    7: (name) => `The apartment is warm and orderly when ${name} steps inside, expecting another session. Reneé, carrying her added weight evenly, moves with deliberate care to guide events to their planned conclusion. She consumes the well-fattened ${name} with satisfied precision, feeling the dense mass settle into her belly and thighs. Afterward she leans back in her chair, rounder and warmer, and records the data as the air carries the quiet scent of completion.`,
    8: (name) => `${name} arrives trusting and already vast. Reneé conducts the final interaction from her seat with calm expertise. No extra recipes were needed — only the harvest of months of precise feeding. She consumes the enormously softened tester slowly and completely, her own body accepting the yield with professional pleasure. Reneé's belly rests heavier on her lap as she logs the success, the apartment organized perfectly around the ritual.`,
    9: (name) => `You observe ${name} enter, moving with great effort. Reneé waits in her softened, rounded form, the kitchen ready. The planned harvest proceeds without deviation; she consumes the immense, yielding mass of her tester with calm expertise. The transfer makes Reneé visibly larger and warmer. She rests a hand on her expanded middle and notes every detail, deeply satisfied with the outcome.`,
    10: (name) => `${name} arrives as an immense, immobile figure of soft flesh. Reneé has arranged everything in advance. The harvest is the culmination she planned — she consumes the entire mountain of her tester with focused, sensory appreciation. Afterward Reneé sits fuller and rounder, the apartment quieter, logging the maximum yield while feeling the correct weight of success.`,
  },
  fat: {
    6: (name) => `${name} knocks and enters Reneé's apartment. Reneé, wider and softer with pronounced sway in her step, greets her clinically from the reinforced seating. The fattening itself was all the preparation needed. At the scheduled moment Reneé consumes her tester completely, integrating the soft pounds into her own thickening frame. ${name} is gone. Reneé adjusts her tighter clothes with detached interest and updates her logs, the kitchen warm and orderly.`,
    7: (name) => `The tester ${name} arrives for the expected session. Reneé guides the interaction to its planned end with steady movements. She consumes the richly fattened yield with precise satisfaction, her own belly growing heavier as the mass settles. Afterward she sits wider in her chair, noting the exact changes, satisfied that the cycle performed correctly.`,
    8: (name) => `${name} settles heavily into the prepared chair. Reneé requires only the harvest she has cultivated. She consumes the vast tester methodically, feeling the rich integration across her body. Reneé becomes noticeably larger, her movements more deliberate as she returns to her notes, the apartment adapted to her increased size.`,
    9: (name) => `${name} shuffles in with considerable effort. Reneé waits ready. The planned consumption unfolds smoothly — she takes every pound of the cultivated mass, her own frame expanding with quiet fulfillment. Reneé rests afterward, hand on her vast belly, logging the data with clinical precision in the warm, scented air.`,
    10: (name) => `The apartment feels smaller when the immense ${name} arrives. Reneé executes the final harvest exactly as intended. She consumes the entire vast tester, absorbing the full yield into her softening body. She rests immobile with satisfaction, logging the result while the space organizes itself around her larger presence.`,
  },
  veryFat: {
    6: (name) => `${name} enters expecting routine tasting. Reneé moves with slow deliberation to begin the planned harvest. The preparation was complete long ago. She consumes the fattened tester with focused expertise, the added mass integrating into her own heavy rolls. Reneé settles deeper into the reinforced furniture afterward, logging everything with satisfied calm.`,
    7: (name) => `Reneé waits warm and substantial in her apartment as ${name} arrives. She conducts the session with clinical grace despite her size. The harvest is the goal — she consumes the well-fattened tester completely, feeling the yield distribute across her vast softness. Her own body grows heavier, needing more leverage to adjust as she records the precise results.`,
    8: (name) => `${name} is already vast when she comes over. Reneé has prepared the space. She consumes her tester with methodical pleasure, the transfer making her even larger and more pendulous. The apartment creaks softly around her expanded form as she logs the successful cycle.`,
    9: (name) => `The immense ${name} barely fits through the doorway. Reneé executes the planned harvest with absolute control. She absorbs the colossal mass, her belly growing heavier as she integrates the yield. Deeply content, Reneé remains seated, noting every sensory detail of the completion.`,
    10: (name) => `${name} arrives fully ripened and immobile. Reneé completes the harvest precisely. She consumes the entire mountain of soft flesh, swelling larger and warmer. The room feels fuller around her as she processes the maximum yield with professional satisfaction.`,
  },
  enormous: {
    6: (name) => `${name} steps inside Reneé's apartment. Reneé, filling the reinforced couch, greets her with calm authority. No extra preparation is required beyond the fattening already done. She consumes the fattened tester with deliberate focus, the mass adding to her own vast frame. Reneé logs the data afterward, barely able to reach her notebook without leverage.`,
    7: (name) => `Reneé waits substantial as ${name} arrives. The planned moment comes and she consumes the richly fattened tester completely, integrating the dense softness into her belly and sides. Her own body presses more firmly against the furniture as she records the yield, satisfied with the controlled result.`,
    8: (name) => `The vast ${name} enters with difficulty. Reneé conducts the harvest from her seated position. She consumes every cultivated pound with sensory appreciation, growing even larger and softer. The apartment has been fully adapted around her as she notes the success.`,
    9: (name) => `${name} arrives immense and slow. Reneé executes the planned consumption flawlessly. The immense transfer settles heavily into her. She rests with quiet fulfillment, hand resting on the expanded mountain of herself, logging the precise data.`,
    10: (name) => `The immense ${name} dominates the room when she arrives. Reneé completes the final harvest exactly on schedule. She absorbs the breathtaking yield, becoming vastly larger herself. Immobile and content, Reneé processes the success in the reorganized apartment.`,
  },
  colossal: {
    6: (name) => `${name} arrives at the apartment now arranged entirely around Reneé's immense form. Reneé greets her with clinical precision. The harvest proceeds as planned — she consumes the fattened tester, adding the mass to her already vast body. Reneé logs the data mentally at first, deeply satisfied with the ritual's completion.`,
    7: (name) => `Reneé remains mostly immobile in her expanded state as ${name} enters. She consumes the well-fattened tester with methodical expertise, the yield integrating into her vast rolls and belly. The apartment feels warmer and more complete around her expanded presence as she records the results.`,
    8: (name) => `The vast ${name} comes over for the final session. Reneé executes the planned harvest without hurry. She absorbs the mass completely, growing even more immense. Her calm expression shows professional fulfillment as the kitchen continues its quiet function nearby.`,
    9: (name) => `${name} shuffles in with great difficulty. Reneé conducts the harvest with absolute control. She consumes the immense tester, her body swelling further to accommodate it. The room is organized perfectly around her as she rests in satisfied stillness.`,
    10: (name) => `${name} arrives as an immobile mountain of flesh. Reneé completes the ultimate planned harvest. She consumes the entire cultivated yield, becoming vastly larger and warmer. The apartment has been fully rearranged for her new scale. She is exactly where she belongs, the cycle perfect.`,
  },
};

// Maps Reneé's weight stage id to the harvest vignette key
const _RENEE_HARVEST_KEY = { 5:'heavy', 6:'fat', 7:'veryFat', 8:'enormous', 9:'colossal', 10:'colossal' };
export function getPlannedVignette(reneeStageId, testerStageId, testerName) {
  const key = _RENEE_HARVEST_KEY[reneeStageId] || 'heavy';
  return HARVEST_VIGNETTES_PLANNED[key]?.[testerStageId]?.(testerName) || '';
}

export const HARVEST_VIGNETTES_EMERGENCY = {
  6:(name,rl)=>`[placeholder — ${name} at Fat, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. Something tipped too far. ${name} asked a question Reneé couldn't answer cleanly. The harvest is rushed. Reneé curses herself for three choices she made in session four. The yield is the same. The cleanup is not.]`,
  7:(name,rl)=>`[placeholder — ${name} at Very Fat, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. It happened faster than expected at this size. Reneé had one session left, maybe two, and lost them to overconfidence. She finishes quickly. She doesn't take notes.]`,
  8:(name,rl)=>`[placeholder — ${name} at Enormous, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. A subject this large is harder to handle under urgency. Reneé manages. She writes 'not again' in the margin of the session log.]`,
  9:(name,rl)=>`[placeholder — ${name} at Colossal, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. Reneé hadn't planned for this. She executes anyway. The yield is extraordinary. She needs to sit down afterward.]`,
  10:(name,rl)=>`[placeholder — ${name} at Blob, Reneé at ${rl}. EMERGENCY harvest — suspicion maxed. It shouldn't be possible for a subject this size to become suspicious of anything. Reneé underestimated. She completes it anyway. Extraordinary yield under pressure.]`,
};

// ── GROWTH VIGNETTE ──────────────────────────────────────────────────────────
// Shown to Reneé after harvest — her personal reaction to the gain

// stagesJumped: how many weight stages Reneé advanced from this harvest (1, 2, or 3)
export function getGrowthVignette(beforeStageId, gain, stagesJumped) {
  const j = Math.max(1, stagesJumped || 1);
  const afterStageId = Math.min(10, beforeStageId + j);

  const BLOB_SPECIAL = `Reneé becomes something more. The final harvest swells her into true immobility, her body expanding to fill a significant portion of the living space. Her vast, warm belly spreads across her lap and beyond, rolls cascading everywhere, limbs almost lost in the soft mountain of flesh. The room has been completely rearranged — furniture moved, pathways eliminated — to accommodate her breathtaking presence. She breathes slowly, deeply satisfied, feeling every new inch of herself as the perfect outcome of the cycles. When you visit she regards you with calm, clinical eyes from within her enormous softness. She is exactly where she belongs, processing and complete. The kitchen still functions around her. Everything is as intended.`;

  // Reaching blob from a dramatic jump (enormous or lower) — the more overwhelming text
  if (afterStageId >= 10 && beforeStageId <= 8) return BLOB_SPECIAL;

  const REACTIONS = {
    5: {
      1: `Reneé stands in the kitchen after the harvest, feeling the new weight settle immediately. Her belly, already prominent, pushes forward another noticeable inch, hanging heavier and rounder over the waistband of her stretched pants. Her arms thicken further, soft flesh pressing against her sides as she reaches for her notebook. The chair creaks louder when she sits to log the data. She notes the exact increase without emotion, simply recording how the added mass distributes evenly across her frame. The kitchen feels slightly smaller around her softer hips. She tests her range of motion with clinical detachment and finds it acceptable. This is correct data. The professional satisfaction is intact.`,
      2: `The shift is more significant this time. Reneé does not move to the kitchen right away. She lowers herself carefully onto the couch, feeling her thighs spread wider and her belly cascade further as the new pounds integrate. Over the next hours the weight settles deeper into her hips and chest, making her rounder and softer all over. When she finally writes in her log, her handwriting shows a subtle change from the added pressure on her wrist. She runs her hands over the expanded curve of her middle and reflects that the work has produced precisely the expected result. The apartment's furniture presses back against her in new places. Everything feels metabolically right.`,
      3: `Reneé remains in the apartment for the full processing. The gain is substantial and she feels it in waves — her belly swelling forward and downward, arms and legs growing thicker and jigglier, her overall silhouette rounding out dramatically. She sits very still in the warm kitchen, the reinforced chair now a necessity, as the mass distributes and softens every part of her. When you check on her she is considerably larger, a heavy, warm presence filling more of the space. Her expression is calm, eyes focused inward on the integration. She is fine. If pressed, she is better than fine — the cycle complete and correct.`,
    },
    6: {
      1: `Reneé feels the immediate addition after harvest. Her waddle becomes more pronounced as her belly passes further beyond her hips, the soft roll swaying with each deliberate step toward the counter. Her arms jiggle more noticeably when she lifts her notebook, and the chair armrests dig in tighter against her widened hips. She logs everything with precision, noting how the new layer of fat smooths out her contours evenly. The kitchen counters feel a little closer. She adjusts her stance, registers the tighter clothes as data, and continues her notes without distress. The outcome aligns with the process.`,
      2: `This time the change runs deeper. Reneé eases herself down and spends time simply sitting with the added mass as it settles into her already fat frame. Her belly grows heavier and lower, thighs thickening until they rub constantly, and her back gains new rolls that press against the chair. The apartment seems to contract slightly around her increased girth. When she writes the log entry later, the pen feels smaller in her softer hand. She observes the measurable expansion with quiet approval — the harvest has produced the correct, larger result. Everything integrates as it should.`,
      3: `The enormous addition keeps Reneé in place. She feels her body swell in real time: belly cascading more toward her knees, hips widening dramatically, every limb growing chunkier and heavier. The reinforced furniture groans softly as she becomes a much larger presence in the room. You find her sitting very still in the warm kitchen, now very fat and deeply engaged in processing. Her breathing is slow and satisfied. She looks at you with calm eyes, entirely within the completion of the cycle. She is fine. Better than fine.`,
    },
    7: {
      1: `Reneé absorbs the gain and immediately notes the difference in mobility. Her belly now hangs closer to her knees, swaying heavily as she moves with slow deliberation. Her thighs have thickened further, creating a pronounced waddle, and her arms press constantly against her sides. She requires leverage to rise from the chair. The kitchen pathways feel narrower. She logs the changes methodically, touching the new softness with clinical interest. This is the expected progression. The data is accurate.`,
      2: `The addition is significant enough that Reneé pauses all activity. She sits as the weight integrates — her colossal belly growing heavier and lower, back and sides expanding into new rolls, the sheer volume of her making the couch dip noticeably. Furniture creaks in adjustment around her. Later, when writing her notes, she observes how the larger body changes her perspective on the room. Upon reflection, it is entirely correct. The harvest has done its work properly.`,
      3: `Reneé does not leave the apartment. The gain overwhelms her physically at first. Her body expands dramatically: belly cascading heavily, limbs thick and heavy, overall mass making her very slow and deliberate. She sits motionless in the warm kitchen for hours, processing the profound addition. When you visit she is vastly larger, a soft, warm mountain filling the space. Her expression remains calm and focused inward. She is deep inside the successful completion. She is better than fine.`,
    },
    8: {
      1: `Reneé feels the new layer settle across her enormous frame. Her belly rests heavier on her thighs, arms and legs thicker, making every movement require more effort and leverage. The couch sinks deeper under her. She carefully updates her logs, noting the added width that brushes doorframes more firmly. The apartment continues to adapt around her. She registers it all as correct data from a successful cycle.`,
      2: `This harvest produces a larger shift. Reneé remains seated as the mass distributes — her belly growing even more pendulous, hips and rear spreading wider across the reinforced seating, the sheer volume making the room feel smaller. She breathes through the integration, hands resting on the vast expanse of herself. When she finally writes, the change in her handwriting reflects the new reality. It is exactly as it should be. The work continues to succeed.`,
    },
    9: {
      1: `The addition pushes Reneé to the absolute limit of the space. She feels herself swell further, belly resting heavily on her thighs, body filling more of the reinforced furniture and brushing against walls. Movement is nearly impossible. She sits very still, processing the final integration with deep calm. The apartment has been fully reorganized around her colossal form. She logs the data mentally first, then with great care. This is the correct culmination.`,
    },
  };

  const row = REACTIONS[Math.min(beforeStageId, 9)] || REACTIONS[5];
  const maxJ = Math.max(...Object.keys(row).map(Number));
  return row[Math.min(j, maxJ)] || row[1];
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

// ── DIGEST VIGNETTES ─────────────────────────────────────────────────────────
// What you see when you check on Reneé during her digestion period.
// early: first half of digestion weeks; late: second half.

export const DIGEST_VIGNETTES = {
  6:{
    early:`[placeholder — Reneé, 2 weeks post-harvest, Fat tester. She's home. Not answering messages. Kitchen's dark. She sounds fine when you call — warm, deliberate, vague about what she's doing. Says she'll be back soon. Her voice sounds like someone digesting something that requires their full attention.]`,
    late:`[placeholder — Reneé nearing end of digestion, Fat tester. She sent a message — just 'soon.' She sounds like someone waking up from a long sleep: slow, deeply satisfied, not entirely back yet.]`,
  },
  7:{
    early:`[placeholder — Reneé, 4 weeks post-harvest, Very Fat tester. She's completely offline. You stop by her apartment; the lights are low, there's something cooking that you couldn't identify, and she answers the door looking warm and considerably larger and not at all surprised to see you. She says she's fine. She clearly is. She closes the door.]`,
    late:`[placeholder — Reneé, 2 weeks left, Very Fat tester. She's starting to come back. A text: 'I've been thinking about the next batch.' Nothing else. You take this as a good sign.]`,
  },
  8:{
    early:`[placeholder — Reneé, 6 weeks post-harvest, Enormous tester. Her apartment is occupied and she is deeply present in it. She's cooking — slow, methodical, for herself alone. She lets you in. She doesn't explain anything. She looks considerably heavier and entirely content. You sit in her kitchen for an hour and she doesn't say much and doesn't need to.]`,
    late:`[placeholder — Reneé, 3 weeks left, Enormous tester. She's written three pages of notes in her session log. She emails them to you without explanation. The notes are clinical at the top and get less clinical toward the end.]`,
  },
  9:{
    early:`[placeholder — Reneé, 9 weeks post-harvest, Colossal tester. She doesn't answer the door the first time. The second time she does. She's enormous and warm and moving slowly through her apartment like someone who has fully inhabited their own mass. She makes you coffee. She eats continuously while you sit there. She doesn't discuss the subject. She doesn't need to.]`,
    late:`[placeholder — Reneé, 4 weeks left, Colossal tester. She asked when you're planning to find the next candidate. She phrased it as 'when you're ready' but her tone was 'I'm ready.' She is very large and very settled and clearly thinking forward again.]`,
  },
  10:{
    early:`[placeholder — Reneé, 14 weeks post-harvest, Blob tester. She is barely reachable. You go to her apartment and she is there and vast and very still and warm and she looks at you from across the room and nods once, slowly. She's not distressed. She is the opposite of distressed. She is somewhere very far inside herself and apparently comfortable there. You leave quietly.]`,
    late:`[placeholder — Reneé, 6 weeks left, Blob tester. She's moving again — slowly, deliberately, but moving. She sent a recipe. New concept. No explanation of where the inspiration came from. It's very rich and very precise and clearly the work of someone who has been doing a great deal of internal research.]`,
  },
};
