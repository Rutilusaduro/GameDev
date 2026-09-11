// Hall kitchen queen — NPC blurbs, conferences, group activities (MIGRATION.md extract).
// ── HALL KITCHEN QUEEN: NPC stage descriptions ───────────────────────────────
// Students have 3 stages (0=start, 1=noticeably softer, 2=genuinely fat)
// Moms have 5 stages (0=start, 1=softening, 2=clearly changed, 3=properly fat, 4=can't dress around it)
export const BATCH_BAKER_NPCS = {
  Kayla:{
    0:"Narrow waist, wide hips, long legs. Always tugging at the waistband of her jeans — upward, a habitual adjustment. She's the watchful one.",
    1:"Her jeans have started to gap at the waist while her hips push outward. She's stopped tugging at the waistband. She's started sitting differently — wider, more settled.",
    2:"Genuinely wide now, her hips spreading soft and full into the chair, her thighs pressing together. She wears the comfortable clothes without explanation.",
  },
  Bri:{
    0:"Soft round belly, slim arms and legs — carries everything in her middle. She moves like someone who's always been this way and has no opinion about it.",
    1:"Her belly has pushed forward noticeably, resting in her lap when she sits. The slim arms and legs are the same. The middle is emphatically more.",
    2:"Her belly is the center of gravity of everything — large, soft, unmistakable. She rests her hands on it when she's relaxed. She is often relaxed.",
  },
  Sofia:{
    0:"Already full-figured before any of this. Chest, hips, everything — she wears her body like it's exactly the right size, which it is.",
    1:"Everything has gotten more. The full figure has gone rounder, softer, wider. She is significantly larger than she was and completely unbothered.",
    2:"Genuinely enormous now — soft and wide, her belly heavy and forward, her chest vast. She fills the new wide desk completely and seems to prefer it.",
  },
  Mrs_Calloway:{
    0:"Manicured, athletic-seeming from the waist up. Wide hips she minimizes with careful, structured clothing. Suspicious of everything, especially you.",
    1:"The structured clothing is doing less work than it used to. There's a softness at the waist now that the jacket doesn't quite hide. She's still watching everything.",
    2:"The jacket doesn't button the way it used to. She's switched to cardigans and drape-fronts. She is still, always, watching from the window at pickup.",
    3:"She's stopped trying to dress around the change and started dressing for comfort. A soft cardigan in a warm color. She brought you preserves this week.",
    4:"She takes the full portions openly now. She's been on the event committee long enough that Tuesday is as much hers as it is yours. She knows exactly what she's doing.",
  },
  Mrs_Reyes:{
    0:"Trim but carries a soft belly she explains away as stress weight. Always has a coffee in hand. Friendly but distracted.",
    1:"The belly is less explainable now and she's stopped trying. The coffee is still there. She lingers at pickup a little longer each week.",
    2:"Her midsection has grown soft and round, clearly visible even under her usual clothes. She's stopped tugging at her jacket and started choosing the loose things.",
    3:"Properly soft now — her belly rounding the front of her blouse, her hips wider. She sits at the table instead of standing at the window.",
    4:"She brings coffee for both of you now. She's comfortable. She doesn't comment on her size or yours. She just eats and talks and is present.",
  },
  Mrs_Monroe:{
    0:"Glamorous, confident, comfortable in her body from the start. Brings wine to floor events. Daisy's favorite.",
    1:"Warmer, rounder, and even more comfortable than before. She's started commenting on which recipes she prefers and her preferences are detailed.",
    2:"Noticeably softer everywhere — her hips generous, her belly rounding out the wrap dress. She laughs about everything. She's your biggest advocate.",
    3:"Gloriously fat, openly and happily. She has stopped noticing because she stopped caring a long time ago. She brings the good wine now.",
    4:"She is the reason the other moms stopped worrying. She made abundance look so natural and easy that everyone followed her example. Enormous, warm, essential.",
  },
};

// Suspicion delta per flag (used in closeEvolvedEvent to update batchBakerState.suspicion)
export const HOMEROOM_SUSPICION_DELTAS = {
  recipe_rich:+2, recipe_special:+1, recipe_cover:-1, recipe_simple:0,
  deflected_mom:-1, invited_inside:+1, played_safe:-1, enlisted_monroe:-2,
  direct_question:+2, deflected_question:-1,
};
// Arc stage thresholds (classWeight/momWeight accumulation gates)
export const HOMEROOM_THRESHOLDS = {
  class:[50,120,200], // Stage 1 needs ≥50, Stage 3 needs ≥120, Stage 5 needs ≥200
  mom:[30,70,130],    // Stage 2 needs ≥30, Stage 4 needs ≥70, Stage 5 needs ≥130
};

// ── HALL KITCHEN QUEEN: Individual Conference Events ───────────────────────
export const HOMEROOM_CONFERENCE_EVENTS = {
  Kayla:{
    text:`Kayla comes in and sits across from the desk with the settled ease of someone who's been in this room enough times that it doesn't feel official anymore. She doesn't look nervous. She looks like she's waiting for something.

"Is this about hall standing?" she asks. Her tone implies she already knows it isn't.`,
    choices:[
      {id:"progress_review",label:"Actually go through her progress — she's been doing well",
       result:`"Your engagement scores have gone up every single week since September," Daisy says, and she means it — the improvement is real and specific. Kayla blinks. "Oh," she says, genuinely surprised. Then she looks at the container on the corner of the desk. "Can I—" Daisy slides it over without comment.`,
       lbs:2,classGain:4,rel:5,suspDelta:-1},
      {id:"tuesday",label:"Skip the pretense — ask what she'd most like on Tuesday",
       result:`Kayla's expression resolves immediately. "The cinnamon rolls," she says, not needing to think about it. "The ones from the second recipe upgrade." She has categorized the recipe progression. Daisy writes this in the notebook. The container comes out and Kayla has two pieces before she leaves.`,
       lbs:3,classGain:7,rel:9,suspDelta:0},
    ],
  },
  Bri:{
    text:`Bri comes in and sits down and her eyes go immediately to the desk. She's not rude about it — it's just where her attention goes. She has a clear and ordered sense of what matters.

"Is there anything?" she asks. Completely practical.`,
    choices:[
      {id:"brought_something",label:"Yes — there's always something in the drawer",
       result:`Daisy opens the bottom drawer. There's a container in there — there's always a container. Bri opens it with the ease of someone accessing a familiar resource and eats while Daisy talks about her progress. She listens while she eats. Both things happen efficiently and at the same time.`,
       lbs:3,classGain:6,rel:8,suspDelta:0},
      {id:"brief",label:"Nothing today — keep it short and warm",
       result:`"Not today," Daisy says. Bri accepts this without complaint. The conference is brief and warm and Daisy has genuinely good things to say — specific things, accurate things. Bri leaves looking pleased. She'll be thinking about Tuesday before she reaches the door.`,
       lbs:1,classGain:2,rel:6,suspDelta:-1},
    ],
  },
  Sofia:{
    text:`Sofia arrives and fills the chair before she's fully sat down — there's so much of her now, soft and wide and completely settled, that her presence is immediate. She puts both hands flat on the desk and looks at Daisy with an expression that says: I know exactly what this is, and I'm in.`,
    choices:[
      {id:"portfolio",label:"Review her actual work — she's the strongest resident by every measure",
       result:`Sofia's hall portfolio is, genuinely and without qualification, the best on the floor. Daisy goes through it carefully, noting specific pieces by name. Sofia listens with the focused attention of someone who takes all of this seriously — not just Tuesday. At the end: "Can I have something before I go?" Daisy already has the container out.`,
       lbs:2,classGain:5,rel:7,suspDelta:-1},
      {id:"next_tuesday",label:"Let her plan next Tuesday — she clearly has opinions about this",
       result:`Sofia's response is immediate and detailed: the cardamom honey cake with extra cream, please, and the peach upside-down cake as backup in case the cardamom is unavailable. She has alternatives ranked. Her planning is thorough. Daisy writes everything down. The notebook entry reads: *Sofia's requests. Non-negotiable.*`,
       lbs:4,classGain:8,rel:11,suspDelta:1},
    ],
  },
  Mrs_Calloway:{
    text:`Mrs. Calloway comes in with her jacket still buttoned and her eyes already cataloguing the room — the counter, the snack drawer, the notebook on the desk. She sits with the careful posture of someone who has not yet decided whether this is a problem.

"I wanted to ask about Tuesdays," she says. "Kayla talks about them constantly."`,
    choices:[
      {id:"curriculum_frame",label:"Walk her through the wellness-program framing — keep it professional",
       result:`Daisy goes through the enrichment rationale with specific, accurate detail. Mrs. Calloway listens with her arms crossed, then uncrosses them by the third point. "She's been happier," she admits. "I noticed." She leaves without further questions. Daisy exhales.`,
       lbs:2,momGain:6,rel:5,suspDelta:-2},
      {id:"offer_tasting",label:"Offer a tasting — redirect with warmth",
       result:`"Before you go—" Daisy sets a wrapped slice on the desk. Mrs. Calloway looks at it. Looks at Daisy. Takes it. "For the drive," she says, which is not a refusal. She eats it in the parking lot. Daisy watches from the window and makes a note.`,
       lbs:3,momGain:10,rel:7,suspDelta:0},
    ],
  },
  Mrs_Reyes:{
    text:`Mrs. Reyes arrives with coffee for both of you — she does this now, it's become a habit — and sits down before you've finished saying hello. Her belly presses softly at her blouse; she's stopped explaining it away.

"Okay," she says. "I need to be honest about something." She pauses. "I keep showing up early on Tuesdays."`,
    choices:[
      {id:"honest_talk",label:"Talk honestly — acknowledge what's happening",
       result:`Daisy listens without flinching. Mrs. Reyes talks about stress, comfort, the smell from the kitchen, how she stopped pretending she wasn't interested. "I'm not mad," Daisy says. "I'm glad you're here." Mrs. Reyes exhales like she's been holding her breath for weeks. She stays forty minutes.`,
       lbs:2,momGain:8,rel:9,suspDelta:-1},
      {id:"recipe_preview",label:"Show her next week's recipes — make her part of it",
       result:`Daisy opens the recipe book to the marked pages. Mrs. Reyes leans in immediately — cardamom, peach upside-down, something with too much cream. "Can I—" she starts. "Yes," Daisy says. Mrs. Reyes laughs, surprised at herself. She leaves with a container and a date circled on the calendar.`,
       lbs:4,momGain:14,rel:8,suspDelta:1},
    ],
  },
  Mrs_Monroe:{
    text:`Mrs. Monroe doesn't knock. She never knocks anymore. She comes in like the room has been waiting for her, drops into the good chair, and smiles at Daisy with the easy confidence of someone who decided long ago that abundance was a virtue.

"So," she says. "What's on the menu?"`,
    choices:[
      {id:"full_preview",label:"Walk her through everything — she wants the full picture",
       result:`Daisy lays out the whole plan: this week, next week, the special recipe she's been holding. Mrs. Monroe listens with genuine delight, asking follow-up questions, offering opinions that are somehow both helpful and self-serving. "I'll talk to the other moms," she says at the end. "You're doing something wonderful here."`,
       lbs:3,momGain:12,rel:10,suspDelta:-1},
      {id:"taste_now",label:"Skip the meeting — feed her now",
       result:`Daisy doesn't bother with the agenda. She brings out the good container — the one she was saving — and Mrs. Monroe has it open before Daisy sits down. "This is why I come," Mrs. Monroe says, mouth full, completely sincere. She stays until the last piece is gone and asks what's for next Tuesday.`,
       lbs:5,momGain:18,rel:12,suspDelta:0},
    ],
  },
};

// ── HALL KITCHEN QUEEN: Group Activity Events ────────────────────────────────
export const HOMEROOM_GROUP_ACTIVITIES = {
  parent_meeting:{
    label:"Parent Group Meeting",
    apCost:1,
    text:`All three moms are here — Mrs. Monroe arrived first and has already claimed the good chair near the window; Mrs. Reyes came in mid-sentence about something; Mrs. Calloway is near the back with her jacket buttoned, watching the room. Daisy stands at the front, notepad in hand.

The agenda says: progress updates, enrichment activities, wellness notes. The room has its own agenda.`,
    choices:[
      {id:"curriculum",label:"Run the wellness agenda — keep the framing professional",
       result:`Daisy goes through everything on the list, thoroughly and warmly. Mrs. Calloway uncrosses her arms by the second item. Mrs. Monroe has her hand in the snack bowl. By the end the meeting has accomplished everything stated and the moms are leaving with containers.`,
       momGain:8,rel:6,suspDelta:-2},
      {id:"recipes",label:"Show them what's coming — open the recipe book",
       result:`Daisy sets the recipe book on the table, opened to the marked section. The room shifts. Mrs. Monroe makes a sound of recognition and immediate desire. Mrs. Reyes leans forward. Mrs. Calloway says "Is that the cardamom one?" and then looks briefly surprised at herself for knowing. The meeting lasts ninety minutes. No one references the agenda.`,
       momGain:14,rel:8,suspDelta:1},
      {id:"refreshments_first",label:"Start with refreshments — the agenda can wait",
       result:`"Before we get into it—" Daisy sets the big container on the table. Mrs. Monroe has it open before the sentence is finished. The agenda waits. The refreshments require full attention. Mrs. Calloway has eaten three pieces before the first item is mentioned. The meeting is excellent.`,
       momGain:18,rel:10,suspDelta:0},
    ],
  },
  health_unit:{
    label:"Health Unit — Measurements",
    apCost:2,
    phases:[
      {
        text:`The scale is at the front, the measuring tape on the desk. Health unit day. The residents know what this is — they've been waiting for it, each in their own way.

Sofia is already standing near the scale, easy and unhurried.`,
        choices:[
          {id:"official",label:"Run it officially — record everything for the hall wellness file",
           result:`Height, then weight. Daisy reads the numbers aloud and writes them in the hall wellness file — the one that goes to the campus health office. The numbers are accurate. The numbers are notable. The file will be interesting reading for whoever opens it next.`,
           rel:4,suspDelta:2,revealsWeights:true},
          {id:"personal",label:"Keep personal records only — this stays in the notebook",
           result:`Daisy writes the numbers in the apron-pocket notebook, not the wellness file. These measurements are hers. She looks at the numbers for a long moment before closing the cover. Then she smiles.`,
           rel:6,suspDelta:-1,revealsWeights:true},
        ],
      },
      {
        text:`The residents are done. Pickup time, and Mrs. Monroe has been here through the whole thing — she came in early as she always does and has been watching from the back row with an expression that isn't quite casual.

"I haven't been weighed since my last physical," she says. She looks at the scale. "Can I—"`,
        choices:[
          {id:"weigh_moms",label:"Offer the scale to all three — make it an event",
           result:`Mrs. Monroe goes first with the ease of someone completely unafraid of what the scale will say. Mrs. Reyes goes second with the expression of someone who already knew. Mrs. Calloway goes last, says "don't tell Kayla," and then laughs — surprising everyone including herself. The notebook records all three.`,
           rel:8,suspDelta:0,revealsParentWeights:true},
          {id:"decline",label:"Keep it to the residents — stay professional",
           result:`"This one's just for the floor," Daisy says. Mrs. Monroe nods without any sign of being bothered. She's comfortable with herself regardless of what the scale would say. She doesn't need the number to know.`,
           rel:4,suspDelta:-1},
        ],
      },
    ],
  },
};

