// The Squad — Lead: A2 Psych | Support: A4 Architect
// Phase D evolved diaries — competitive_gainer, salon, gallery, pharmacist, machine_goddess.
// Regenerate: node scripts/generatePhaseD.mjs
import { registerPool } from '../engine.js';

// ── competitive_gainer ─────────────────────────────────────────────
registerPool('diary.competitive_gainer.s5._f1', [
  { when: {}, text: [
    "Tonight I finally mounted the corkboard properly.",
    "The corkboard went up tonight — pins, gridlines, competitive categories labeled in my hand.",
    "I spent an hour on the board after dinner, arranging the first wave of measurements.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._f2', [
  { when: {}, text: [
    ". The pins slide in cleanly as I lean forward, and I feel my heavy belly press warmly against the desk edge in a thick, rounded swell that was not there a month ago.",
    ". Leaning forward, I feel my belly meet the desk first — warm, rounded, undeniable.",
    ". My middle presses the wood before my hands do. The softness is already measurable.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._f3', [
  { when: {}, text: [
    ". My once-straight waist has softened into noticeable rolls that spill over my waistband when I sit, warm and plush. Initial measurements are logged: mine, Brittany's thighs, Kylie's bust.",
    ". Waistband digs; rolls spill when I sit. Initial measurements logged: mine, Brittany's thighs, Kylie's bust.",
    ". Hips wider than last month's notebook admits. Pins mark the leaderboard.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._f4', [
  { when: {}, text: [
    ". The data is clean. Academic, even. But I already know this is more than research now. I am going to be the largest.",
    ". Spreadsheets don't blush. I do, looking at my own column leading.",
    ". Academic on paper. Under my skin it's appetite with a scoring system.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._f5', [
  { when: {}, text: [
    "My thighs spread wider across the chair than they used to, rubbing with a constant soft friction that makes me shift just to feel it again. The numbers do not lie.",
    "Chair arms disappear under my thighs now — plush friction with every shift I pretend is accidental.",
    "I cross and uncross my legs just to feel the new rub. The numbers do not lie.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._f6', [
  { when: {}, text: [
    ". I am already leading in waist circumference. It feels... satisfying.",
    ". Waist circumference: first place. The satisfaction is immediate and hungry.",
    ". First on the board. I intend to widen the gap until second place is folklore.",
  ]},
]);

registerPool('diary.competitive_gainer.s5._sk0', [
  { when: {}, text: [
    "{diary.competitive_gainer.s5._f1} {diary.competitive_gainer.s5._f2}\n\n{diary.competitive_gainer.s5._f3} {diary.competitive_gainer.s5._f4}",
    "{diary.competitive_gainer.s5._f1} {diary.competitive_gainer.s5._f3}\n\n{diary.competitive_gainer.s5._f2} {diary.competitive_gainer.s5._f4}",
  ]},
]);

registerPool('diary.competitive_gainer.s5._sk1', [
  { when: {}, text: [
    "{diary.competitive_gainer.s5._f5} {diary.competitive_gainer.s5._f6}",
    "{diary.competitive_gainer.s5._f6} {diary.competitive_gainer.s5._f5}",
  ]},
]);

registerPool('diary.competitive_gainer.s5', [
  { when: {}, text: [
    "{diary.competitive_gainer.s5._sk0}\n\n{diary.competitive_gainer.s5._sk1}",
    "{diary.competitive_gainer.s5._sk1}\n\n{diary.competitive_gainer.s5._sk0}",
  ]},
]);

registerPool('diary.competitive_gainer.s6._f7', [
  { when: {}, text: [
    "The straight lines of my old body are disappearing faster than I expected.",
    "My silhouette in the mirror is rounding faster than the spreadsheet predicted.",
    "I used to have angles. The angles are losing.",
  ]},
]);

registerPool('diary.competitive_gainer.s6._f8', [
  { when: {}, text: [
    ". My belly has grown rounder, pushing forward heavily when I sit at my desk, the soft apron of it resting warmly on my thickening thighs.",
    ". Sitting, my belly pools forward — soft apron on my thighs, warm and heavy.",
    ". My middle leads when I lean. The desk remembers my shape now.",
  ]},
]);

registerPool('diary.competitive_gainer.s6._f9', [
  { when: {}, text: [
    ". I caught my reflection earlier - fabric straining across the new width of my hips, seams pulling as I move. Thigh friction is constant now, a warm, plush reminder with every step.",
    ". Reflection: hips wider, seams louder, thighs brushing with every step.",
    ". Fabric protests across my hips. Thigh friction has become baseline.",
  ]},
]);

registerPool('diary.competitive_gainer.s6._f10', [
  { when: {}, text: [
    "I have added five more girls to the board. I am slightly behind in hip measurement compared to one of them, and that is unacceptable. I have already adjusted my intake schedule.",
    "Five new names on the board. One hip measurement threatens mine. Unacceptable. Intake schedule revised.",
    "The leaderboard grew. So did my appetite. Correlation noted. Causation intended.",
  ]},
]);

registerPool('diary.competitive_gainer.s6._f11', [
  { when: {}, text: [
    ". The data will reflect my response by next week.",
    ". Next week's column will show the correction.",
    ". I do not lose categories. I adjust variables.",
  ]},
]);

registerPool('diary.competitive_gainer.s6', [
  { when: {}, text: [
    "{diary.competitive_gainer.s6._f7} {diary.competitive_gainer.s6._f8}\n\n{diary.competitive_gainer.s6._f9}\n\n{diary.competitive_gainer.s6._f10} {diary.competitive_gainer.s6._f11}",
    "{diary.competitive_gainer.s6._f7} {diary.competitive_gainer.s6._f9}\n\n{diary.competitive_gainer.s6._f8}\n\n{diary.competitive_gainer.s6._f10} {diary.competitive_gainer.s6._f11}",
  ]},
]);

registerPool('diary.competitive_gainer.s7._f12', [
  { when: {}, text: [
    "When I sit down now my belly rounds forward in a heavy, undeniable arc, spilling softly over my waistband and forcing me to adjust my custom trousers constantly.",
    "Sitting, my belly domes forward — undeniable, warm, constantly adjusting my trousers.",
    "My middle leads when I sit. The waistband has stopped pretending.",
  ]},
]);

registerPool('diary.competitive_gainer.s7._f13', [
  { when: {}, text: [
    ". The blazer I wore last semester is long gone - replaced by pieces that still feel tight across my broadening back and chest.",
    ". Last semester's blazer is mythology. Current clothes strain across back and chest.",
    ". Custom pieces already feel temporary. I order ahead of the curve.",
  ]},
]);

registerPool('diary.competitive_gainer.s7._f14', [
  { when: {}, text: [
    ". My thighs have become massive, spreading wide and pressing together with every movement, the warm friction almost distracting during lectures.",
    ". Thighs massive now — warm friction through every lecture, every hallway.",
    ". I feel my thighs before I see them. Constant plush contact.",
  ]},
]);

registerPool('diary.competitive_gainer.s7._f15', [
  { when: {}, text: [
    "I am leading in waist and total weight. Brittany's thighs remain a threat. I have devised a targeted binge protocol to widen the gap. The board is updating daily.",
    "Waist and total weight: first. Brittany's thighs: threat. Binge protocol deployed. Board updates daily.",
    "Leaderboard favors me. I intend to make second place embarrassing.",
  ]},
]);

registerPool('diary.competitive_gainer.s7._f16', [
  { when: {}, text: [
    ". This is no longer a side project.",
    ". Primary research now. Everything else is noise.",
    ". The board is the point. Food is the method.",
  ]},
]);

registerPool('diary.competitive_gainer.s7', [
  { when: {}, text: [
    "{diary.competitive_gainer.s7._f12} {diary.competitive_gainer.s7._f13}\n\n{diary.competitive_gainer.s7._f14}\n\n{diary.competitive_gainer.s7._f15} {diary.competitive_gainer.s7._f16}",
    "{diary.competitive_gainer.s7._f12} {diary.competitive_gainer.s7._f14}\n\n{diary.competitive_gainer.s7._f13}\n\n{diary.competitive_gainer.s7._f15} {diary.competitive_gainer.s7._f16}",
  ]},
]);

registerPool('diary.competitive_gainer.s8._f17', [
  { when: {}, text: [
    "My body has grown so heavy that reaching the top of the corkboard requires real effort.",
    "The top row of pins is a workout now. I lean, breathe, reach.",
    "Corkboard mounted higher would be cruel. I mount myself instead.",
  ]},
]);

registerPool('diary.competitive_gainer.s8._f18', [
  { when: {}, text: [
    ". I have to lean forward, my enormous gut resting heavily on the desk and sending warm ripples through the thick rolls at my sides.",
    ". Belly meets desk first — warm ripples through rolls at my sides.",
    ". I lean into the wood and feel mass settle, soft and vast.",
  ]},
]);

registerPool('diary.competitive_gainer.s8._f19', [
  { when: {}, text: [
    ". Fabric creaks audibly as I stretch, my labored breathing filling the quiet room while my massive thighs spread across the reinforced chair. Every category is being tracked with precision.",
    ". Fabric creaks; breath deep; thighs spill across reinforced chair. Every category tracked.",
    ". Chair groans. I breathe. Pins wait. Precision is pleasure.",
  ]},
]);

registerPool('diary.competitive_gainer.s8._f20', [
  { when: {}, text: [
    ". I refuse to let any slip.",
    ". No category surrendered. Not one.",
    ". Second place is a failure mode I do not accept.",
  ]},
]);

registerPool('diary.competitive_gainer.s8._f21', [
  { when: {}, text: [
    "The numbers are beautiful. Mine dominate most columns. But there are still threats. I will erase them.",
    "Most columns: mine. Remaining threats: temporary. Erasure scheduled.",
    "Beautiful data. Dominant columns. Hungry for the rest.",
  ]},
]);

registerPool('diary.competitive_gainer.s8', [
  { when: {}, text: [
    "{diary.competitive_gainer.s8._f17} {diary.competitive_gainer.s8._f18}\n\n{diary.competitive_gainer.s8._f19} {diary.competitive_gainer.s8._f20}\n\n{diary.competitive_gainer.s8._f21}",
    "{diary.competitive_gainer.s8._f17} {diary.competitive_gainer.s8._f19}\n\n{diary.competitive_gainer.s8._f18} {diary.competitive_gainer.s8._f20}\n\n{diary.competitive_gainer.s8._f21}",
  ]},
]);

registerPool('diary.competitive_gainer.s9._f22', [
  { when: {}, text: [
    "Breathing feels deeper, heavier now, each inhale lifting the vast dome of my colossal belly before it settles warmly back onto my lap in heavy waves.",
    "Each breath lifts my belly like tide — vast dome rising, settling warm on my lap.",
    "Breathing is physical labor now. The belly moves like weather.",
  ]},
]);

registerPool('diary.competitive_gainer.s9._f23', [
  { when: {}, text: [
    ". The custom blazer does structural work just to contain me - rolls cascade over my waistband, my hips and thighs so wide they make the chair groan softly beneath my weight.",
    ". Blazer contains what it can. Rolls cascade anyway. Chair groans.",
    ". Clothes are engineering problems. My body wins.",
  ]},
]);

registerPool('diary.competitive_gainer.s9._f24', [
  { when: {}, text: [
    ". I measured myself again tonight. Kylie is close in bust. Too close. The fury I feel is cold, controlled, and productive.",
    ". Kylie threatens bust category. Fury cold. Productive. Food ordered.",
    ". Close rivals sharpen appetite. I sharpen back.",
  ]},
]);

registerPool('diary.competitive_gainer.s9._f25', [
  { when: {}, text: [
    "I have already ordered the next delivery. The board will reflect my response by morning. Nothing else matters as much as this.",
    "Next delivery ordered. Board updates by morning. Priority: absolute.",
    "Sleep is optional. Winning is not.",
  ]},
]);

registerPool('diary.competitive_gainer.s9', [
  { when: {}, text: [
    "{diary.competitive_gainer.s9._f22} {diary.competitive_gainer.s9._f23}\n\n{diary.competitive_gainer.s9._f24}\n\n{diary.competitive_gainer.s9._f25}",
    "{diary.competitive_gainer.s9._f22} {diary.competitive_gainer.s9._f24}\n\n{diary.competitive_gainer.s9._f23}\n\n{diary.competitive_gainer.s9._f25}",
  ]},
]);

registerPool('diary.competitive_gainer.s10._f26', [
  { when: {}, text: [
    "Moving to the corkboard takes time now. My immense belly pools heavily between my spread thighs, rolls upon rolls shifting and spilling with every deliberate step while the floor creaks beneath",
    "Crossing the room is a project now. Belly pools between thighs; floor creaks beneath",
    "Each step redistributes mass — deliberate, slow, audible",
  ]},
]);

registerPool('diary.competitive_gainer.s10._f27', [
  { when: {}, text: [
    "me. I have to brace myself against the desk, feeling the overwhelming warmth and weight of my body as I update the final columns.",
    "me. I brace on the desk — warm overwhelming weight — and update the columns.",
    "me. Desk holds my belly while I pin the numbers. Grateful furniture.",
  ]},
]);

registerPool('diary.competitive_gainer.s10._f28', [
  { when: {}, text: [
    ". Fabric strains and groans across my colossal frame, my breathing deep and audible in the silent room.",
    ". Fabric groans. Breath deep. Room silent except me.",
    ". Strain audible. Victory audible too.",
  ]},
]);

registerPool('diary.competitive_gainer.s10._f29', [
  { when: {}, text: [
    "The data is perfect. Every single category belongs to me. Even if I need help reaching the top pins next time, the board stays flawless. I will remain the fattest. No one else even comes close.",
    "Every category: mine. Top pins may require assistance. Dominance does not.",
    "Flawless board. Unmatched mass. The competition is decorative.",
  ]},
]);

registerPool('diary.competitive_gainer.s10', [
  { when: {}, text: [
    "{diary.competitive_gainer.s10._f26} {diary.competitive_gainer.s10._f27}\n\n{diary.competitive_gainer.s10._f28}\n\n{diary.competitive_gainer.s10._f29}",
    "{diary.competitive_gainer.s10._f26} {diary.competitive_gainer.s10._f28}\n\n{diary.competitive_gainer.s10._f27}\n\n{diary.competitive_gainer.s10._f29}",
  ]},
]);

registerPool('diary.competitive_gainer.s11._f30', [
  { when: {}, text: [
    "The corkboard is mounted lower now. I update it from the chair — pins at eye level, my belly a warm shelf across my lap, every column still mine.",
    "Board lowered to my chair. Belly shelf across lap. Columns still mine.",
    "I dictate numbers from immobility. The data obeys.",
  ]},
]);

registerPool('diary.competitive_gainer.s11._f31', [
  { when: {}, text: [
    " Assistants reach the top row. I dictate the numbers. The board stays flawless. I remain the fattest. The room rearranges; the data does not.",
    " Assistants pin the top row. I remain first in every column. Room adapts; I do not shrink.",
    " Court updates the board. I update appetite. Both continue upward.",
  ]},
]);

registerPool('diary.competitive_gainer.s11', [
  { when: {}, text: [
    "{diary.competitive_gainer.s11._f30} {diary.competitive_gainer.s11._f31}",
    "{diary.competitive_gainer.s11._f31} {diary.competitive_gainer.s11._f30}",
  ]},
]);

registerPool('diary.competitive_gainer', [
  { when: { stage: [5] }, text: ['{diary.competitive_gainer.s5}'] },
  { when: { stage: [6] }, text: ['{diary.competitive_gainer.s6}'] },
  { when: { stage: [7] }, text: ['{diary.competitive_gainer.s7}'] },
  { when: { stage: [8] }, text: ['{diary.competitive_gainer.s8}'] },
  { when: { stage: [9] }, text: ['{diary.competitive_gainer.s9}'] },
  { when: { stage: [10] }, text: ['{diary.competitive_gainer.s10}'] },
  { when: { stage: [11] }, text: ['{diary.competitive_gainer.s11}'] },
  { when: {}, text: ['{diary.competitive_gainer.s5}'] }
]);

// ── machine_goddess ─────────────────────────────────────────────
registerPool('diary.machine_goddess.s5._f1', [
  { when: {}, text: ["Workshop log — week one after evolution. I built the bloating belt first because the feedback loop is elegant: pressure in, volume out, shame optional. Self test-run: successful."] },
]);

registerPool('diary.machine_goddess.s5._f2', [
  { when: {}, text: [". I wrote \"successful\" three times in the margin."] },
]);

registerPool('diary.machine_goddess.s5', [
  { when: {}, text: ["{diary.machine_goddess.s5._f1} {diary.machine_goddess.s5._f2}"] },
]);

registerPool('diary.machine_goddess.s6._f3', [
  { when: {}, text: ["The feeder arm works. I ate while it fed me and called it calibration. The paste printer slots in clean — calories per cubic centimeter are obscene. I am not ashamed of the obscene part."] },
]);

registerPool('diary.machine_goddess.s6', [
  { when: {}, text: ["{diary.machine_goddess.s6._f3}"] },
]);

registerPool('diary.machine_goddess.s7._f4', [
  { when: {}, text: ["Subject wore the belt through a lecture. She texted circumference readings hourly. I replied with duty-cycle adjustments. We are both getting better at this."] },
]);

registerPool('diary.machine_goddess.s7', [
  { when: {}, text: ["{diary.machine_goddess.s7._f4}"] },
]);

registerPool('diary.machine_goddess.s8._f5', [
  { when: {}, text: ["Instability hit thirty percent after the serum injector trial. The subject gained fourteen pounds in an afternoon. I gained six from celebratory paste."] },
]);

registerPool('diary.machine_goddess.s8._f6', [
  { when: {}, text: [". Variance within acceptable chaos parameters."] },
]);

registerPool('diary.machine_goddess.s8', [
  { when: {}, text: ["{diary.machine_goddess.s8._f5} {diary.machine_goddess.s8._f6}"] },
]);

registerPool('diary.machine_goddess.s9._f7', [
  { when: {}, text: ["Redistribution rig online. I sculpted a pear silhouette onto a volunteer and watched her discover the new center of gravity. I ran the same program on myself afterward."] },
]);

registerPool('diary.machine_goddess.s9._f8', [
  { when: {}, text: [". Data should be symmetrical."] },
]);

registerPool('diary.machine_goddess.s9', [
  { when: {}, text: ["{diary.machine_goddess.s9._f7} {diary.machine_goddess.s9._f8}"] },
]);

registerPool('diary.machine_goddess.s10._f9', [
  { when: {}, text: ["Endgame note: the lab never sleeps. Devices tick on bodies across campus. My belly is soft against the workbench when I lean in to solder. I am the inventor the machines were always pointing at."] },
]);

registerPool('diary.machine_goddess.s10', [
  { when: {}, text: ["{diary.machine_goddess.s10._f9}"] },
]);

registerPool('diary.machine_goddess.s11._f10', [
  { when: {}, text: ["The lab comes to me now — feeder arms within reach, paste warm on the tray, my belly soft against the bench when I lean to calibrate."] },
]);

registerPool('diary.machine_goddess.s11._f11', [
  { when: {}, text: [" Devices hum across campus. I hum with them. The inventor and the invention share one appetite."] },
]);

registerPool('diary.machine_goddess.s11', [
  { when: {}, text: ["{diary.machine_goddess.s11._f10} {diary.machine_goddess.s11._f11}"] },
]);

registerPool('diary.machine_goddess', [
  { when: { stage: [5] }, text: ['{diary.machine_goddess.s5}'] },
  { when: { stage: [6] }, text: ['{diary.machine_goddess.s6}'] },
  { when: { stage: [7] }, text: ['{diary.machine_goddess.s7}'] },
  { when: { stage: [8] }, text: ['{diary.machine_goddess.s8}'] },
  { when: { stage: [9] }, text: ['{diary.machine_goddess.s9}'] },
  { when: { stage: [10] }, text: ['{diary.machine_goddess.s10}'] },
  { when: { stage: [11] }, text: ['{diary.machine_goddess.s11}'] },
  { when: {}, text: ['{diary.machine_goddess.s5}'] }
]);

// ── salon_appetit ─────────────────────────────────────────────
registerPool('diary.salon_appetit.s5._f1', [
  { when: {}, text: ["Chloé weighs 258 pounds and the dorm smells of butter and wine. Three guests arrive to find candles already lit, cheese already breathing on the board. She pours without asking who wants what."] },
]);

registerPool('diary.salon_appetit.s5._f2', [
  { when: {}, text: [". \"In Paris they teach you to stop,\" she says, biting a croissant. \"Here they teach you to continue.\" She means it as philosophy. The guests leave curious and full."] },
]);

registerPool('diary.salon_appetit.s5', [
  { when: {}, text: ["{diary.salon_appetit.s5._f1} {diary.salon_appetit.s5._f2}"] },
]);

registerPool('diary.salon_appetit.s6._f3', [
  { when: {}, text: ["320 pounds in black silk, hostess at the door. Dr. Mori followed the smell of coq au vin and stayed for dessert — faculty lends prestige, Chloé lends appetite."] },
]);

registerPool('diary.salon_appetit.s6._f4', [
  { when: {}, text: [". She charms the room between courses, feeding herself with theatrical pleasure while the wine loosens every conversation."] },
]);

registerPool('diary.salon_appetit.s6', [
  { when: {}, text: ["{diary.salon_appetit.s6._f3} {diary.salon_appetit.s6._f4}"] },
]);

registerPool('diary.salon_appetit.s7._f5', [
  { when: {}, text: ["They whisper *the French girl's dinners* in group chats Chloé is not in. She reads one aloud, amused, at 400 pounds. The campus writer attended last week and left flushed, notebook open."] },
]);

registerPool('diary.salon_appetit.s7._f6', [
  { when: {}, text: [". Chloé pours more wine. \"Let them arrive hungry,\" she says."] },
]);

registerPool('diary.salon_appetit.s7', [
  { when: {}, text: ["{diary.salon_appetit.s7._f5} {diary.salon_appetit.s7._f6}"] },
]);

registerPool('diary.salon_appetit.s8._f7', [
  { when: {}, text: ["The piece published: *An Exchange Student's Salon of Excess*. Chloé is 480 pounds and reads it twice. \"They call me dangerous,\" she says, pleased. Rooftop bookings follow."] },
]);

registerPool('diary.salon_appetit.s8._f8', [
  { when: {}, text: [". Protesters chant wellness slogans below. She raises her glass and eats anyway."] },
]);

registerPool('diary.salon_appetit.s8', [
  { when: {}, text: ["{diary.salon_appetit.s8._f7} {diary.salon_appetit.s8._f8}"] },
]);

registerPool('diary.salon_appetit.s9._f9', [
  { when: {}, text: ["Twelve settings. Twelve place cards. Chloé is 560 pounds and welcomes them in French, then English, then mostly with her hands on her own waist."] },
]);

registerPool('diary.salon_appetit.s9._f10', [
  { when: {}, text: [". \"Tonight,\" she says, \"we do not stop.\" The digestif never ends. Someone applauds. She curtsies without standing."] },
]);

registerPool('diary.salon_appetit.s9', [
  { when: {}, text: ["{diary.salon_appetit.s9._f9} {diary.salon_appetit.s9._f10}"] },
]);

registerPool('diary.salon_appetit.s10._f11', [
  { when: {}, text: ["La Grande Soirée closes at dawn. Chloé is 680 pounds, silk clinging where she's grown fullest, the guest book thick with names."] },
]);

registerPool('diary.salon_appetit.s10._f12', [
  { when: {}, text: [". She finds you in the kitchen afterward, licking pastry cream from her thumb. \"*Encore,*\" she murmurs — not to the room anymore, to the semester itself."] },
]);

registerPool('diary.salon_appetit.s10', [
  { when: {}, text: ["{diary.salon_appetit.s10._f11} {diary.salon_appetit.s10._f12}"] },
]);

registerPool('diary.salon_appetit.s11._f13', [
  { when: {}, text: ["The salon no longer fits one room. Guests arrive in shifts; I host from the center, silk and appetite both vast, courses brought to my hands."] },
]);

registerPool('diary.salon_appetit.s11._f14', [
  { when: {}, text: [" \"*Encore,*\" I say — to the night, to the semester, to whatever still wants feeding. The digestif never ends. Neither do I."] },
]);

registerPool('diary.salon_appetit.s11', [
  { when: {}, text: ["{diary.salon_appetit.s11._f13} {diary.salon_appetit.s11._f14}"] },
]);

registerPool('diary.salon_appetit', [
  { when: { stage: [5] }, text: ['{diary.salon_appetit.s5}'] },
  { when: { stage: [6] }, text: ['{diary.salon_appetit.s6}'] },
  { when: { stage: [7] }, text: ['{diary.salon_appetit.s7}'] },
  { when: { stage: [8] }, text: ['{diary.salon_appetit.s8}'] },
  { when: { stage: [9] }, text: ['{diary.salon_appetit.s9}'] },
  { when: { stage: [10] }, text: ['{diary.salon_appetit.s10}'] },
  { when: { stage: [11] }, text: ['{diary.salon_appetit.s11}'] },
  { when: {}, text: ['{diary.salon_appetit.s5}'] }
]);

// ── artisan_gallery ─────────────────────────────────────────────
registerPool('diary.artisan_gallery.s5._f1', [
  { when: {}, text: ["Fiona weighs 258 pounds and pins the first contact sheet to *In Progress* — a classmate mid-bite, mid-laugh. \"The subject cooperates,\" she says."] },
]);

registerPool('diary.artisan_gallery.s5._f2', [
  { when: {}, text: [". \"The camera doesn't lie.\" Consent forms become art contracts. Everyone signs."] },
]);

registerPool('diary.artisan_gallery.s5', [
  { when: {}, text: ["{diary.artisan_gallery.s5._f1} {diary.artisan_gallery.s5._f2}"] },
]);

registerPool('diary.artisan_gallery.s6._f3', [
  { when: {}, text: ["320 pounds on the quad with a camera and hunger."] },
]);

registerPool('diary.artisan_gallery.s6._f4', [
  { when: {}, text: [". She photographs abundance without apology — strangers' softness, dining-hall regulars, the honest curve of a bench under someone who's stopped pretending."] },
]);

registerPool('diary.artisan_gallery.s6._f5', [
  { when: {}, text: [". The field archive grows fat with frames."] },
]);

registerPool('diary.artisan_gallery.s6', [
  { when: {}, text: ["{diary.artisan_gallery.s6._f3} {diary.artisan_gallery.s6._f4}\n\n{diary.artisan_gallery.s6._f5}"] },
]);

registerPool('diary.artisan_gallery.s7._f6', [
  { when: {}, text: ["Opening night: eight prints, critics, cheese. Fiona is 400 pounds in linen that won't survive the evening. She eats in the corner on purpose — performance and documentation the same act."] },
]);

registerPool('diary.artisan_gallery.s7._f7', [
  { when: {}, text: [". A critic writes *uncomfortably generous.* She pins the review beside the work."] },
]);

registerPool('diary.artisan_gallery.s7', [
  { when: {}, text: ["{diary.artisan_gallery.s7._f6} {diary.artisan_gallery.s7._f7}"] },
]);

registerPool('diary.artisan_gallery.s8._f8', [
  { when: {}, text: ["The Living Room: her subject stands beside a timeline on the wall — stage three, stage five, live and heavier than the latest frame. Fiona is 480 pounds and introduces them: \"The work continues."] },
]);

registerPool('diary.artisan_gallery.s8._f9', [
  { when: {}, text: [". She continues.\" The crowd hushes. Then it doesn't."] },
]);

registerPool('diary.artisan_gallery.s8', [
  { when: {}, text: ["{diary.artisan_gallery.s8._f8} {diary.artisan_gallery.s8._f9}"] },
]);

registerPool('diary.artisan_gallery.s9._f10', [
  { when: {}, text: ["Regional gallery wants the series. AIB calls it evidence. Fiona is 560 pounds and calls it archive. She publishes online anyway. Patrons explode. Scrutiny follows. She shoots more."] },
]);

registerPool('diary.artisan_gallery.s9', [
  { when: {}, text: ["{diary.artisan_gallery.s9._f10}"] },
]);

registerPool('diary.artisan_gallery.s10._f11', [
  { when: {}, text: ["Permanent collection. Legacy program. Fiona is 680 pounds and still shooting, still feeding, still pinning — museum-grade, institution made flesh. New subjects every semester."] },
]);

registerPool('diary.artisan_gallery.s10._f12', [
  { when: {}, text: [". The wall never stops growing."] },
]);

registerPool('diary.artisan_gallery.s10', [
  { when: {}, text: ["{diary.artisan_gallery.s10._f11} {diary.artisan_gallery.s10._f12}"] },
]);

registerPool('diary.artisan_gallery.s11._f13', [
  { when: {}, text: ["The gallery is wherever I sit now — prints on every wall, my body the living centerpiece, subjects still arriving to be documented and fed."] },
]);

registerPool('diary.artisan_gallery.s11._f14', [
  { when: {}, text: [" The wall never stops growing. Neither does the appetite behind the lens."] },
]);

registerPool('diary.artisan_gallery.s11', [
  { when: {}, text: ["{diary.artisan_gallery.s11._f13} {diary.artisan_gallery.s11._f14}"] },
]);

registerPool('diary.artisan_gallery', [
  { when: { stage: [5] }, text: ['{diary.artisan_gallery.s5}'] },
  { when: { stage: [6] }, text: ['{diary.artisan_gallery.s6}'] },
  { when: { stage: [7] }, text: ['{diary.artisan_gallery.s7}'] },
  { when: { stage: [8] }, text: ['{diary.artisan_gallery.s8}'] },
  { when: { stage: [9] }, text: ['{diary.artisan_gallery.s9}'] },
  { when: { stage: [10] }, text: ['{diary.artisan_gallery.s10}'] },
  { when: { stage: [11] }, text: ['{diary.artisan_gallery.s11}'] },
  { when: {}, text: ['{diary.artisan_gallery.s5}'] }
]);

// ── pharmacist ─────────────────────────────────────────────
registerPool('diary.pharmacist.s5._f1', [
  { when: {}, text: ["First synthesis at home. The kitchen smells like a lab now — beakers on the drying rack, labels in my handwriting, appetite stimulant batch one cooling on the counter. I tasted the dose myself."] },
]);

registerPool('diary.pharmacist.s5._f2', [
  { when: {}, text: [". Professional responsibility. The warmth in my stomach was immediate and I logged it as expected variance."] },
]);

registerPool('diary.pharmacist.s5', [
  { when: {}, text: ["{diary.pharmacist.s5._f1} {diary.pharmacist.s5._f2}"] },
]);

registerPool('diary.pharmacist.s6._f3', [
  { when: {}, text: ["Campus softening is measurable. I walk to class and notice how portions look larger, how conversations around food sound less apologetic. My compounds are in three dining venues."] },
]);

registerPool('diary.pharmacist.s6._f4', [
  { when: {}, text: [". I am heavier than when I started and the scale curve matches the deployment curve."] },
]);

registerPool('diary.pharmacist.s6', [
  { when: {}, text: ["{diary.pharmacist.s6._f3} {diary.pharmacist.s6._f4}"] },
]);

registerPool('diary.pharmacist.s7._f5', [
  { when: {}, text: ["The cult phase arrived without ceremony. Devoted users, stronger formulas, loyalty enhancers that make feeding feel like belonging."] },
]);

registerPool('diary.pharmacist.s7._f6', [
  { when: {}, text: [". I eat with them sometimes — methodology, I tell the IRB in my head. My body keeps excellent records."] },
]);

registerPool('diary.pharmacist.s7', [
  { when: {}, text: ["{diary.pharmacist.s7._f5} {diary.pharmacist.s7._f6}"] },
]);

registerPool('diary.pharmacist.s8._f7', [
  { when: {}, text: ["Mass transformation is no longer hypothetical. Campus-wide passive gain, testers at every stage, my own waistline a proof of concept. I stopped pretending the work is separate from the appetite."] },
]);

registerPool('diary.pharmacist.s8._f8', [
  { when: {}, text: [". The appetite is the work."] },
]);

registerPool('diary.pharmacist.s8', [
  { when: {}, text: ["{diary.pharmacist.s8._f7} {diary.pharmacist.s8._f8}"] },
]);

registerPool('diary.pharmacist.s9._f9', [
  { when: {}, text: ["Ascension protocol unlocked. I synthesize at a scale that would have ended my corporate career and I have never felt more precise. My belly rests on the bench when I lean in to measure."] },
]);

registerPool('diary.pharmacist.s9._f10', [
  { when: {}, text: [". The lab hums. So do I."] },
]);

registerPool('diary.pharmacist.s9', [
  { when: {}, text: ["{diary.pharmacist.s9._f9} {diary.pharmacist.s9._f10}"] },
]);

registerPool('diary.pharmacist.s10._f11', [
  { when: {}, text: ["Endgame note: goddess of excess is an accurate title."] },
]);

registerPool('diary.pharmacist.s10._f12', [
  { when: {}, text: [". Compounds, cult, campus saturation — I built a system that feeds itself and I am inside it, larger every week, exactly where the math said I would be."] },
]);

registerPool('diary.pharmacist.s10', [
  { when: {}, text: ["{diary.pharmacist.s10._f11} {diary.pharmacist.s10._f12}"] },
]);

registerPool('diary.pharmacist.s11._f13', [
  { when: {}, text: ["The lab comes to me. Compounds ship without my standing. My belly rests on the bench when I lean — when I lean at all."] },
]);

registerPool('diary.pharmacist.s11._f14', [
  { when: {}, text: [" Campus saturation is complete. I am inside the system I built, larger every week, exactly where the math said I would be."] },
]);

registerPool('diary.pharmacist.s11', [
  { when: {}, text: ["{diary.pharmacist.s11._f13} {diary.pharmacist.s11._f14}"] },
]);

registerPool('diary.pharmacist', [
  { when: { stage: [5] }, text: ['{diary.pharmacist.s5}'] },
  { when: { stage: [6] }, text: ['{diary.pharmacist.s6}'] },
  { when: { stage: [7] }, text: ['{diary.pharmacist.s7}'] },
  { when: { stage: [8] }, text: ['{diary.pharmacist.s8}'] },
  { when: { stage: [9] }, text: ['{diary.pharmacist.s9}'] },
  { when: { stage: [10] }, text: ['{diary.pharmacist.s10}'] },
  { when: { stage: [11] }, text: ['{diary.pharmacist.s11}'] },
  { when: {}, text: ['{diary.pharmacist.s5}'] }
]);
