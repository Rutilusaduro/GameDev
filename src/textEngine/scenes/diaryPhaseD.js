// The Squad — Lead: A2 Psych | Support: A4 Architect
// Phase D evolved diaries — competitive_gainer, salon, gallery, pharmacist, machine_goddess.
// Regenerate: node scripts/generatePhaseD.mjs && node scripts/diarySkeletonDepth.mjs
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
    "{diary.competitive_gainer.s5._f3} {diary.competitive_gainer.s5._f4}\n\n{diary.competitive_gainer.s5._f1} {diary.competitive_gainer.s5._f2}",
  ]},
]);

registerPool('diary.competitive_gainer.s5._sk1', [
  { when: {}, text: [
    "{diary.competitive_gainer.s5._f5} {diary.competitive_gainer.s5._f6}",
    "{diary.competitive_gainer.s5._f6} {diary.competitive_gainer.s5._f5}",
    "{diary.competitive_gainer.s5._f5}\n\n{diary.competitive_gainer.s5._f6}",
  ]},
]);

registerPool('diary.competitive_gainer.s5', [
  { when: {}, text: [
    "{diary.competitive_gainer.s5._sk0}\n\n{diary.competitive_gainer.s5._sk1}",
    "{diary.competitive_gainer.s5._sk1}\n\n{diary.competitive_gainer.s5._sk0}",
    "{diary.competitive_gainer.s5._sk0}\n\n{diary.competitive_gainer.s5._sk1}\n\n{diary.competitive_gainer.s5._sk1}",
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
    "{diary.competitive_gainer.s6._f9}\n\n{diary.competitive_gainer.s6._f10} {diary.competitive_gainer.s6._f11}\n\n{diary.competitive_gainer.s6._f7} {diary.competitive_gainer.s6._f8}",
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
    ". My thighs have become massive, spreading wide and pressing together with every movement, the warm friction almost distracting during floor meetings.",
    ". Thighs massive now — warm friction through every floor meeting, every hallway.",
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
    "{diary.competitive_gainer.s7._f14}\n\n{diary.competitive_gainer.s7._f15} {diary.competitive_gainer.s7._f16}\n\n{diary.competitive_gainer.s7._f12} {diary.competitive_gainer.s7._f13}",
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
    "{diary.competitive_gainer.s8._f19} {diary.competitive_gainer.s8._f20}\n\n{diary.competitive_gainer.s8._f21}\n\n{diary.competitive_gainer.s8._f17} {diary.competitive_gainer.s8._f18}",
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
    "{diary.competitive_gainer.s9._f24}\n\n{diary.competitive_gainer.s9._f25}\n\n{diary.competitive_gainer.s9._f22} {diary.competitive_gainer.s9._f23}",
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
    "{diary.competitive_gainer.s10._f28}\n\n{diary.competitive_gainer.s10._f29}\n\n{diary.competitive_gainer.s10._f26} {diary.competitive_gainer.s10._f27}",
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
    "{diary.competitive_gainer.s11._f30}\n\n{diary.competitive_gainer.s11._f31}",
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
  { when: {}, text: ['{diary.competitive_gainer.s5}', '{diary.competitive_gainer.s7}', '{diary.competitive_gainer.s9}'] }
]);

// ── machine_goddess ─────────────────────────────────────────────
registerPool('diary.machine_goddess.s5._f1', [
  { when: {}, text: [
    "Workshop log — week one after evolution. I built the bloating belt first because the feedback loop is elegant: pressure in, volume out, shame optional.",
    "First post-evolution prototype: bloating belt. Input pressure, output volume. Elegant. I tested it on myself before anyone else.",
    "The workshop smells like solder and warm paste. Week one of the new me — belt prototype first, because feedback loops are honest.",
  ]},
]);

registerPool('diary.machine_goddess.s5._f2', [
  { when: {}, text: [
    " Self test-run: successful.",
    " Calibration run: successful. Belly warm, belt humming, data clean.",
    " I logged the self-test twice. Same result both times.",
  ]},
]);

registerPool('diary.machine_goddess.s5._f3', [
  { when: {}, text: [
    " I wrote \"successful\" three times in the margin.",
    " Margin notes: successful, successful, successful. Redundant. Satisfying.",
    " The margin is full of checkmarks. I am full of paste. Correlation noted.",
  ]},
]);

registerPool('diary.machine_goddess.s5', [
  { when: {}, text: [
    "{diary.machine_goddess.s5._f1} {diary.machine_goddess.s5._f2} {diary.machine_goddess.s5._f3}",
    "{diary.machine_goddess.s5._f1} {diary.machine_goddess.s5._f3}\n\n{diary.machine_goddess.s5._f2}",
    "{diary.machine_goddess.s5._f2} {diary.machine_goddess.s5._f3}\n\n{diary.machine_goddess.s5._f1}",
  ]},
]);

registerPool('diary.machine_goddess.s6._f3', [
  { when: {}, text: [
    "The feeder arm works. I ate while it fed me and called it calibration.",
    "Feeder arm online. Dual intake — machine and mouth — logged as calibration.",
    "The arm feeds; I feed back. Closed loop. Professional terminology for pleasure.",
  ]},
]);

registerPool('diary.machine_goddess.s6._f4', [
  { when: {}, text: [
    " The paste printer slots in clean — calories per cubic centimeter are obscene.",
    " Paste printer installed. Caloric density obscene by any standard except mine.",
    " Printer output: warm, dense, impossible. I approve the specifications.",
  ]},
]);

registerPool('diary.machine_goddess.s6._f5', [
  { when: {}, text: [
    " I am not ashamed of the obscene part.",
    " No shame in the data. Only appetite.",
    " Obscene is a word for people who haven't run the numbers.",
  ]},
]);

registerPool('diary.machine_goddess.s6', [
  { when: {}, text: [
    "{diary.machine_goddess.s6._f3} {diary.machine_goddess.s6._f4} {diary.machine_goddess.s6._f5}",
    "{diary.machine_goddess.s6._f3} {diary.machine_goddess.s6._f5}\n\n{diary.machine_goddess.s6._f4}",
    "{diary.machine_goddess.s6._f4} {diary.machine_goddess.s6._f5}\n\n{diary.machine_goddess.s6._f3}",
  ]},
]);

registerPool('diary.machine_goddess.s7._f4', [
  { when: {}, text: [
    "Subject wore the belt through a floor meeting. She texted circumference readings hourly.",
    "Field trial: belt through a three-hour floor meeting. Hourly circumference texts. Beautiful compliance.",
    "She wore the prototype all day. Readings every hour. I adjusted duty cycles between classes.",
  ]},
]);

registerPool('diary.machine_goddess.s7._f5', [
  { when: {}, text: [
    " I replied with duty-cycle adjustments. We are both getting better at this.",
    " My replies were calibration curves. Hers were gratitude and hunger.",
    " We iterate together — her body, my firmware, campus getting softer either way.",
  ]},
]);

registerPool('diary.machine_goddess.s7', [
  { when: {}, text: [
    "{diary.machine_goddess.s7._f4} {diary.machine_goddess.s7._f5}",
    "{diary.machine_goddess.s7._f5}\n\n{diary.machine_goddess.s7._f4}",
    "{diary.machine_goddess.s7._f4}\n\n{diary.machine_goddess.s7._f5}",
  ]},
]);

registerPool('diary.machine_goddess.s8._f5', [
  { when: {}, text: [
    "Instability hit thirty percent after the serum injector trial. The subject gained fourteen pounds in an afternoon.",
    "Serum injector trial: thirty percent instability, fourteen pounds on the subject in one afternoon.",
    "Injector trial exceeded projections. Subject +14 lbs by dinner. I celebrated with paste.",
  ]},
]);

registerPool('diary.machine_goddess.s8._f6', [
  { when: {}, text: [
    " I gained six from celebratory paste.",
    " I gained six. Methodology includes participation.",
    " My waistline logged +6. Expected variance. Delicious variance.",
  ]},
]);

registerPool('diary.machine_goddess.s8._f7', [
  { when: {}, text: [
    " Variance within acceptable chaos parameters.",
    " Chaos within spec. I love when science gets loud.",
    " Instability documented. Appetite documented. Both trending up.",
  ]},
]);

registerPool('diary.machine_goddess.s8', [
  { when: {}, text: [
    "{diary.machine_goddess.s8._f5} {diary.machine_goddess.s8._f6} {diary.machine_goddess.s8._f7}",
    "{diary.machine_goddess.s8._f5} {diary.machine_goddess.s8._f7}\n\n{diary.machine_goddess.s8._f6}",
    "{diary.machine_goddess.s8._f6} {diary.machine_goddess.s8._f7}\n\n{diary.machine_goddess.s8._f5}",
  ]},
]);

registerPool('diary.machine_goddess.s9._f7', [
  { when: {}, text: [
    "Redistribution rig online. I sculpted a pear silhouette onto a volunteer and watched her discover the new center of gravity.",
    "Redistribution rig deployed. Volunteer discovered gravity had moved south. I took notes.",
    "Pear silhouette program: volunteer wobbled, laughed, ate more. Success metric achieved.",
  ]},
]);

registerPool('diary.machine_goddess.s9._f8', [
  { when: {}, text: [
    " I ran the same program on myself afterward.",
    " I ran the program on myself. Symmetry is methodology.",
    " Self-test followed. My hips answered before my spreadsheet did.",
  ]},
]);

registerPool('diary.machine_goddess.s9._f9', [
  { when: {}, text: [
    " Data should be symmetrical.",
    " Inventor participates. Data stays honest.",
    " N=2. Both of us softer. Publishable.",
  ]},
]);

registerPool('diary.machine_goddess.s9', [
  { when: {}, text: [
    "{diary.machine_goddess.s9._f7} {diary.machine_goddess.s9._f8} {diary.machine_goddess.s9._f9}",
    "{diary.machine_goddess.s9._f7} {diary.machine_goddess.s9._f9}\n\n{diary.machine_goddess.s9._f8}",
    "{diary.machine_goddess.s9._f8} {diary.machine_goddess.s9._f9}\n\n{diary.machine_goddess.s9._f7}",
  ]},
]);

registerPool('diary.machine_goddess.s10._f9', [
  { when: {}, text: [
    "Endgame note: the lab never sleeps. Devices tick on bodies across campus.",
    "The lab runs around the clock. Campus bodies hum with my firmware.",
    "Devices everywhere now — belts, arms, injectors. The mesh is live.",
  ]},
]);

registerPool('diary.machine_goddess.s10._f10', [
  { when: {}, text: [
    " My belly is soft against the workbench when I lean in to solder.",
    " Belly meets bench when I lean to solder. Warm counterweight. Useful.",
    " I lean; belly spreads; solder flows. Trinity of a good night.",
  ]},
]);

registerPool('diary.machine_goddess.s10._f11', [
  { when: {}, text: [
    " I am the inventor the machines were always pointing at.",
    " The machines pointed here. I arrived heavier and certain.",
    " Inventor, invention, appetite — one closed circuit.",
  ]},
]);

registerPool('diary.machine_goddess.s10', [
  { when: {}, text: [
    "{diary.machine_goddess.s10._f9} {diary.machine_goddess.s10._f10} {diary.machine_goddess.s10._f11}",
    "{diary.machine_goddess.s10._f9} {diary.machine_goddess.s10._f11}\n\n{diary.machine_goddess.s10._f10}",
    "{diary.machine_goddess.s10._f10} {diary.machine_goddess.s10._f11}\n\n{diary.machine_goddess.s10._f9}",
  ]},
]);

registerPool('diary.machine_goddess.s11._f10', [
  { when: {}, text: [
    "The lab comes to me now — feeder arms within reach, paste warm on the tray.",
    "Lab relocated to my chair. Arms within reach. Paste always warm.",
    "I calibrate from stillness now. Devices orbit the bench and my belly.",
  ]},
]);

registerPool('diary.machine_goddess.s11._f11', [
  { when: {}, text: [
    " My belly soft against the bench when I lean to calibrate.",
    " Belly on bench, hands on controls. Efficient ergonomics.",
    " Lean, calibrate, eat. The workflow simplified itself.",
  ]},
]);

registerPool('diary.machine_goddess.s11._f12', [
  { when: {}, text: [
    " Devices hum across campus. I hum with them. The inventor and the invention share one appetite.",
    " Campus hums. I hum back. Same frequency, same hunger.",
    " Inventor and invention merged. Appetite is the only spec left.",
  ]},
]);

registerPool('diary.machine_goddess.s11', [
  { when: {}, text: [
    "{diary.machine_goddess.s11._f10} {diary.machine_goddess.s11._f11} {diary.machine_goddess.s11._f12}",
    "{diary.machine_goddess.s11._f10} {diary.machine_goddess.s11._f12}\n\n{diary.machine_goddess.s11._f11}",
    "{diary.machine_goddess.s11._f11} {diary.machine_goddess.s11._f12}\n\n{diary.machine_goddess.s11._f10}",
  ]},
]);

registerPool('diary.machine_goddess', [
  { when: { stage: [5] }, text: ['{diary.machine_goddess.s5}'] },
  { when: { stage: [6] }, text: ['{diary.machine_goddess.s6}'] },
  { when: { stage: [7] }, text: ['{diary.machine_goddess.s7}'] },
  { when: { stage: [8] }, text: ['{diary.machine_goddess.s8}'] },
  { when: { stage: [9] }, text: ['{diary.machine_goddess.s9}'] },
  { when: { stage: [10] }, text: ['{diary.machine_goddess.s10}'] },
  { when: { stage: [11] }, text: ['{diary.machine_goddess.s11}'] },
  { when: {}, text: ['{diary.machine_goddess.s5}', '{diary.machine_goddess.s7}', '{diary.machine_goddess.s9}'] }
]);

// ── salon_appetit ─────────────────────────────────────────────
registerPool('diary.salon_appetit.s5._f1', [
  { when: {}, text: [
    "Chloé weighs 258 pounds and the dorm smells of butter and wine.",
    "258 pounds tonight. The dorm breathes butter and wine.",
    "Dinner number one of the new Chloé — 258 on the scale, butter in the air.",
  ]},
]);

registerPool('diary.salon_appetit.s5._f2', [
  { when: {}, text: [
    " Three guests arrive to find candles already lit, cheese already breathing on the board.",
    " Candles lit, cheese breathing, guests arriving hungry on purpose.",
    " Guests enter to candlelight and a board that has already begun seducing them.",
  ]},
]);

registerPool('diary.salon_appetit.s5._f3', [
  { when: {}, text: [
    " She pours without asking who wants what.",
    " She pours like abundance is the only language.",
    " Wine flows before names are exchanged.",
  ]},
]);

registerPool('diary.salon_appetit.s5._f4', [
  { when: {}, text: [
    " \"In Paris they teach you to stop,\" she says, biting a croissant. \"Here they teach you to continue.\"",
    " \"In Paris, restraint,\" she says, crumbs on her lip. \"Here, appetite.\"",
    " \"They taught me to stop in Paris,\" she murmurs, reaching for more. \"I unlearned beautifully.\"",
  ]},
]);

registerPool('diary.salon_appetit.s5._f5', [
  { when: {}, text: [
    " She means it as philosophy. The guests leave curious and full.",
    " Philosophy served with seconds. Guests leave dazed and stuffed.",
    " The guests leave softer than they arrived. Chloé counts that as success.",
  ]},
]);

registerPool('diary.salon_appetit.s5', [
  { when: {}, text: [
    "{diary.salon_appetit.s5._f1} {diary.salon_appetit.s5._f2}\n\n{diary.salon_appetit.s5._f3} {diary.salon_appetit.s5._f4} {diary.salon_appetit.s5._f5}",
    "{diary.salon_appetit.s5._f1} {diary.salon_appetit.s5._f3}\n\n{diary.salon_appetit.s5._f2} {diary.salon_appetit.s5._f4} {diary.salon_appetit.s5._f5}",
    "{diary.salon_appetit.s5._f3} {diary.salon_appetit.s5._f4} {diary.salon_appetit.s5._f5}\n\n{diary.salon_appetit.s5._f1} {diary.salon_appetit.s5._f2}",
  ]},
]);

registerPool('diary.salon_appetit.s6._f3', [
  { when: {}, text: [
    "320 pounds in black silk, hostess at the door.",
    "320 tonight — black silk, hostess smile, appetite undisguised.",
    "She greets at the door in silk that knows it will lose. 320 and unashamed.",
  ]},
]);

registerPool('diary.salon_appetit.s6._f4', [
  { when: {}, text: [
    " Dr. Mori followed the smell of coq au vin and stayed for dessert — staff lends prestige, Chloé lends appetite.",
    " Dr. Mori followed the coq au vin and never left. Staff lends prestige; Chloé lends hunger.",
    " Staff at the table now. Coq au vin opened the door; dessert kept them.",
  ]},
]);

registerPool('diary.salon_appetit.s6._f5', [
  { when: {}, text: [
    " She charms the room between courses, feeding herself with theatrical pleasure while the wine loosens every conversation.",
    " Between courses she performs appetite — wine loosening tongues, her own hands never empty.",
    " She eats on stage between courses. Wine does the rest. Conversation turns confessional.",
  ]},
]);

registerPool('diary.salon_appetit.s6', [
  { when: {}, text: [
    "{diary.salon_appetit.s6._f3} {diary.salon_appetit.s6._f4}\n\n{diary.salon_appetit.s6._f5}",
    "{diary.salon_appetit.s6._f3} {diary.salon_appetit.s6._f5}\n\n{diary.salon_appetit.s6._f4}",
    "{diary.salon_appetit.s6._f5}\n\n{diary.salon_appetit.s6._f3} {diary.salon_appetit.s6._f4}",
  ]},
]);

registerPool('diary.salon_appetit.s7._f5', [
  { when: {}, text: [
    "They whisper *the French girl's dinners* in group chats Chloé is not in.",
    "Group chats she isn't in: *the French girl's dinners.* She hears anyway.",
    "*The French girl's dinners* — campus shorthand for dangerous fullness.",
  ]},
]);

registerPool('diary.salon_appetit.s7._f6', [
  { when: {}, text: [
    " She reads one aloud, amused, at 400 pounds.",
    " She reads a thread aloud at 400 pounds and laughs.",
    " 400 pounds and amused by her own reputation.",
  ]},
]);

registerPool('diary.salon_appetit.s7._f7', [
  { when: {}, text: [
    " The campus writer attended last week and left flushed, notebook open.",
    " The campus writer came, ate, left flushed, notebook useless.",
    " A writer attended. Left full and unable to pretend otherwise.",
  ]},
]);

registerPool('diary.salon_appetit.s7._f8', [
  { when: {}, text: [
    " Chloé pours more wine. \"Let them arrive hungry,\" she says.",
    " More wine. \"Let them arrive hungry,\" she says. They always do.",
    " \"Let them arrive hungry.\" They do. She makes sure they stay.",
  ]},
]);

registerPool('diary.salon_appetit.s7', [
  { when: {}, text: [
    "{diary.salon_appetit.s7._f5} {diary.salon_appetit.s7._f6}\n\n{diary.salon_appetit.s7._f7} {diary.salon_appetit.s7._f8}",
    "{diary.salon_appetit.s7._f5} {diary.salon_appetit.s7._f7}\n\n{diary.salon_appetit.s7._f6} {diary.salon_appetit.s7._f8}",
    "{diary.salon_appetit.s7._f7} {diary.salon_appetit.s7._f8}\n\n{diary.salon_appetit.s7._f5} {diary.salon_appetit.s7._f6}",
  ]},
]);

registerPool('diary.salon_appetit.s8._f7', [
  { when: {}, text: [
    "The piece published: *An Exchange Student's Salon of Excess*.",
    "Headline: *An Exchange Student's Salon of Excess.* Chloé framed it.",
    "The article lands. *Salon of Excess* — accurate, flattering, inconvenient.",
  ]},
]);

registerPool('diary.salon_appetit.s8._f8', [
  { when: {}, text: [
    " Chloé is 480 pounds and reads it twice.",
    " 480 pounds. She reads it twice. Smiles both times.",
    " She reads at 480. The prose is kind. The photos are honest.",
  ]},
]);

registerPool('diary.salon_appetit.s8._f9', [
  { when: {}, text: [
    " \"They call me dangerous,\" she says, pleased. Rooftop bookings follow.",
    " \"Dangerous,\" she repeats, pleased. Rooftop bookings flood in.",
    " Dangerous, they say. Rooftops book. Chloé eats celebrating.",
  ]},
]);

registerPool('diary.salon_appetit.s8._f10', [
  { when: {}, text: [
    " Protesters chant wellness slogans below. She raises her glass and eats anyway.",
    " Protesters below. Glass raised. Appetite uninterrupted.",
    " Chants from the quad. She toasts them and takes another bite.",
  ]},
]);

registerPool('diary.salon_appetit.s8', [
  { when: {}, text: [
    "{diary.salon_appetit.s8._f7} {diary.salon_appetit.s8._f8}\n\n{diary.salon_appetit.s8._f9} {diary.salon_appetit.s8._f10}",
    "{diary.salon_appetit.s8._f7} {diary.salon_appetit.s8._f9}\n\n{diary.salon_appetit.s8._f8} {diary.salon_appetit.s8._f10}",
    "{diary.salon_appetit.s8._f9} {diary.salon_appetit.s8._f10}\n\n{diary.salon_appetit.s8._f7} {diary.salon_appetit.s8._f8}",
  ]},
]);

registerPool('diary.salon_appetit.s9._f9', [
  { when: {}, text: [
    "Twelve settings. Twelve place cards.",
    "Twelve settings. Twelve cards. Twelve appetites she intends to ruin politely.",
    "A dozen place cards. A dozen victims. Chloé loves symmetry.",
  ]},
]);

registerPool('diary.salon_appetit.s9._f10', [
  { when: {}, text: [
    " Chloé is 560 pounds and welcomes them in French, then English, then mostly with her hands on her own waist.",
    " 560 pounds at the door — French, English, hands on her own waist as introduction.",
    " She welcomes in two languages and one gesture: hands framing her middle.",
  ]},
]);

registerPool('diary.salon_appetit.s9._f11', [
  { when: {}, text: [
    " \"Tonight,\" she says, \"we do not stop.\"",
    " \"Tonight we do not stop,\" she announces. No one argues.",
    " \"We do not stop tonight.\" Table believes her.",
  ]},
]);

registerPool('diary.salon_appetit.s9._f12', [
  { when: {}, text: [
    " The digestif never ends. Someone applauds. She curtsies without standing.",
    " Digestif flows forever. Applause. Curtsy without standing — skill.",
    " The digestif outlasts dignity. She curtsies from the chair. They cheer.",
  ]},
]);

registerPool('diary.salon_appetit.s9', [
  { when: {}, text: [
    "{diary.salon_appetit.s9._f9} {diary.salon_appetit.s9._f10}\n\n{diary.salon_appetit.s9._f11} {diary.salon_appetit.s9._f12}",
    "{diary.salon_appetit.s9._f9} {diary.salon_appetit.s9._f11}\n\n{diary.salon_appetit.s9._f10} {diary.salon_appetit.s9._f12}",
    "{diary.salon_appetit.s9._f11} {diary.salon_appetit.s9._f12}\n\n{diary.salon_appetit.s9._f9} {diary.salon_appetit.s9._f10}",
  ]},
]);

registerPool('diary.salon_appetit.s10._f11', [
  { when: {}, text: [
    "La Grande Soirée closes at dawn.",
    "Dawn. La Grande Soirée finally ends. The sun finds crumbs everywhere.",
    "The soirée ends at dawn. Survivors limp home full.",
  ]},
]);

registerPool('diary.salon_appetit.s10._f12', [
  { when: {}, text: [
    " Chloé is 680 pounds, silk clinging where she's grown fullest, the guest book thick with names.",
    " 680. Silk clings. Guest book thick. Success measured in signatures and stains.",
    " 680 pounds of hostess. Silk honest. Guest book obscene.",
  ]},
]);

registerPool('diary.salon_appetit.s10._f13', [
  { when: {}, text: [
    " She finds you in the kitchen afterward, licking pastry cream from her thumb.",
    " Kitchen afterward: pastry cream on her thumb, smile on her face.",
    " She finds you among the wreckage, thumb in cream, eyes bright.",
  ]},
]);

registerPool('diary.salon_appetit.s10._f14', [
  { when: {}, text: [
    " \"*Encore,*\" she murmurs — not to the room anymore, to the semester itself.",
    " \"*Encore,*\" to the semester. To appetite. To you.",
    " \"*Encore.*\" One word. Entire philosophy.",
  ]},
]);

registerPool('diary.salon_appetit.s10', [
  { when: {}, text: [
    "{diary.salon_appetit.s10._f11} {diary.salon_appetit.s10._f12}\n\n{diary.salon_appetit.s10._f13} {diary.salon_appetit.s10._f14}",
    "{diary.salon_appetit.s10._f11} {diary.salon_appetit.s10._f13}\n\n{diary.salon_appetit.s10._f12} {diary.salon_appetit.s10._f14}",
    "{diary.salon_appetit.s10._f13} {diary.salon_appetit.s10._f14}\n\n{diary.salon_appetit.s10._f11} {diary.salon_appetit.s10._f12}",
  ]},
]);

registerPool('diary.salon_appetit.s11._f13', [
  { when: {}, text: [
    "The salon no longer fits one room.",
    "One room cannot hold the salon anymore. Shifts suffice.",
    "The salon outgrew walls. Shifts of guests, one vast hostess.",
  ]},
]);

registerPool('diary.salon_appetit.s11._f14', [
  { when: {}, text: [
    " Guests arrive in shifts; I host from the center, silk and appetite both vast, courses brought to my hands.",
    " I host from the center now — silk, appetite, trays brought to me.",
    " Center of the room. Center of appetite. Courses find my hands.",
  ]},
]);

registerPool('diary.salon_appetit.s11._f15', [
  { when: {}, text: [
    " \"*Encore,*\" I say — to the night, to the semester, to whatever still wants feeding.",
    " \"*Encore,*\" to the night. To hunger. To the next course already coming.",
    " Encore. Always encore. The digestif never learned to end.",
  ]},
]);

registerPool('diary.salon_appetit.s11._f16', [
  { when: {}, text: [
    " The digestif never ends. Neither do I.",
    " Digestif eternal. Hostess eternal. Fair trade.",
    " The night ends. I do not. Neither does the menu.",
  ]},
]);

registerPool('diary.salon_appetit.s11', [
  { when: {}, text: [
    "{diary.salon_appetit.s11._f13} {diary.salon_appetit.s11._f14}\n\n{diary.salon_appetit.s11._f15} {diary.salon_appetit.s11._f16}",
    "{diary.salon_appetit.s11._f13} {diary.salon_appetit.s11._f15}\n\n{diary.salon_appetit.s11._f14} {diary.salon_appetit.s11._f16}",
    "{diary.salon_appetit.s11._f15} {diary.salon_appetit.s11._f16}\n\n{diary.salon_appetit.s11._f13} {diary.salon_appetit.s11._f14}",
  ]},
]);

registerPool('diary.salon_appetit', [
  { when: { stage: [5] }, text: ['{diary.salon_appetit.s5}'] },
  { when: { stage: [6] }, text: ['{diary.salon_appetit.s6}'] },
  { when: { stage: [7] }, text: ['{diary.salon_appetit.s7}'] },
  { when: { stage: [8] }, text: ['{diary.salon_appetit.s8}'] },
  { when: { stage: [9] }, text: ['{diary.salon_appetit.s9}'] },
  { when: { stage: [10] }, text: ['{diary.salon_appetit.s10}'] },
  { when: { stage: [11] }, text: ['{diary.salon_appetit.s11}'] },
  { when: {}, text: ['{diary.salon_appetit.s5}', '{diary.salon_appetit.s7}', '{diary.salon_appetit.s9}'] }
]);

// ── artisan_gallery ─────────────────────────────────────────────
registerPool('diary.artisan_gallery.s5._f1', [
  { when: {}, text: [
    "Fiona weighs 258 pounds and pins the first contact sheet to *In Progress* — a resident mid-bite, mid-laugh.",
    "258 pounds. First contact sheet pinned: resident mid-bite, mid-laugh, mid-surrender.",
    "The series begins at 258 — contact sheet on the wall, subject caught eating and happy.",
  ]},
]);

registerPool('diary.artisan_gallery.s5._f2', [
  { when: {}, text: [
    " \"The subject cooperates,\" she says.",
    " \"The subject cooperates,\" Fiona says, already loading film.",
    " \"Good subject,\" she murmurs. Meaning appetite, not pose.",
  ]},
]);

registerPool('diary.artisan_gallery.s5._f3', [
  { when: {}, text: [
    " \"The camera doesn't lie.\" Consent forms become art contracts. Everyone signs.",
    " \"The camera doesn't lie.\" Consent forms on the table. Everyone signs hungry.",
    " Camera honest. Forms signed. Appetite documented.",
  ]},
]);

registerPool('diary.artisan_gallery.s5', [
  { when: {}, text: [
    "{diary.artisan_gallery.s5._f1} {diary.artisan_gallery.s5._f2}\n\n{diary.artisan_gallery.s5._f3}",
    "{diary.artisan_gallery.s5._f1} {diary.artisan_gallery.s5._f3}\n\n{diary.artisan_gallery.s5._f2}",
    "{diary.artisan_gallery.s5._f3}\n\n{diary.artisan_gallery.s5._f1} {diary.artisan_gallery.s5._f2}",
  ]},
]);

registerPool('diary.artisan_gallery.s6._f3', [
  { when: {}, text: [
    "320 pounds on the quad with a camera and hunger.",
    "320 on the quad — camera, hunger, strangers in frame.",
    "She shoots from 320 pounds of certainty. Hunger is the brief.",
  ]},
]);

registerPool('diary.artisan_gallery.s6._f4', [
  { when: {}, text: [
    " She photographs abundance without apology — strangers' softness, dining-hall regulars, the honest curve of a bench under someone who's stopped pretending.",
    " Strangers' softness. Dining-hall regulars. Benches honest under new weight.",
    " No apology in the lens — only fullness, only truth, only appetite caught mid-bite.",
  ]},
]);

registerPool('diary.artisan_gallery.s6._f5', [
  { when: {}, text: [
    " The field archive grows fat with frames.",
    " Archive thickens. Waistlines thicken. Correlation beautiful.",
    " Every frame another body learning to stay fed.",
  ]},
]);

registerPool('diary.artisan_gallery.s6', [
  { when: {}, text: [
    "{diary.artisan_gallery.s6._f3} {diary.artisan_gallery.s6._f4}\n\n{diary.artisan_gallery.s6._f5}",
    "{diary.artisan_gallery.s6._f3} {diary.artisan_gallery.s6._f5}\n\n{diary.artisan_gallery.s6._f4}",
    "{diary.artisan_gallery.s6._f5}\n\n{diary.artisan_gallery.s6._f3} {diary.artisan_gallery.s6._f4}",
  ]},
]);

registerPool('diary.artisan_gallery.s7._f6', [
  { when: {}, text: [
    "Opening night: eight prints, critics, cheese.",
    "Opening night — eight prints, critics, cheese, Fiona eating in public on purpose.",
    "Eight prints. Critics. Cheese. Fiona performing appetite as art.",
  ]},
]);

registerPool('diary.artisan_gallery.s7._f7', [
  { when: {}, text: [
    " Fiona is 400 pounds in linen that won't survive the evening.",
    " 400 pounds in linen with a death wish. She wears it anyway.",
    " Linen doomed. Fiona 400. Performance begins.",
  ]},
]);

registerPool('diary.artisan_gallery.s7._f8', [
  { when: {}, text: [
    " She eats in the corner on purpose — performance and documentation the same act.",
    " Corner seat. Public eating. Art and appetite indistinguishable.",
    " She eats where everyone can see. Documentation and dinner merge.",
  ]},
]);

registerPool('diary.artisan_gallery.s7._f9', [
  { when: {}, text: [
    " A critic writes *uncomfortably generous.* She pins the review beside the work.",
    " *Uncomfortably generous* — review pinned beside the fattest print.",
    " Critics call it generous. Fiona calls it accurate.",
  ]},
]);

registerPool('diary.artisan_gallery.s7', [
  { when: {}, text: [
    "{diary.artisan_gallery.s7._f6} {diary.artisan_gallery.s7._f7}\n\n{diary.artisan_gallery.s7._f8} {diary.artisan_gallery.s7._f9}",
    "{diary.artisan_gallery.s7._f6} {diary.artisan_gallery.s7._f8}\n\n{diary.artisan_gallery.s7._f7} {diary.artisan_gallery.s7._f9}",
    "{diary.artisan_gallery.s7._f8} {diary.artisan_gallery.s7._f9}\n\n{diary.artisan_gallery.s7._f6} {diary.artisan_gallery.s7._f7}",
  ]},
]);

registerPool('diary.artisan_gallery.s8._f8', [
  { when: {}, text: [
    "The Living Room: her subject stands beside a timeline on the wall — stage three, stage five, live and heavier than the latest frame.",
    "The Living Room installation — timeline on the wall, subject live and heavier than print.",
    "Subject beside her own timeline. Stage three. Stage five. Body ahead of archive.",
  ]},
]);

registerPool('diary.artisan_gallery.s8._f9', [
  { when: {}, text: [
    " Fiona is 480 pounds and introduces them: \"The work continues.",
    " Fiona at 480 introduces: \"The work continues.",
    " 480 pounds of curator: \"The work continues.",
  ]},
]);

registerPool('diary.artisan_gallery.s8._f10', [
  { when: {}, text: [
    " She continues.\" The crowd hushes. Then it doesn't.",
    " She continues.\" Hush. Then appetite resumes.",
    " She continues.\" Applause. Then someone orders catering.",
  ]},
]);

registerPool('diary.artisan_gallery.s8', [
  { when: {}, text: [
    "{diary.artisan_gallery.s8._f8} {diary.artisan_gallery.s8._f9} {diary.artisan_gallery.s8._f10}",
    "{diary.artisan_gallery.s8._f8} {diary.artisan_gallery.s8._f10}\n\n{diary.artisan_gallery.s8._f9}",
    "{diary.artisan_gallery.s8._f9} {diary.artisan_gallery.s8._f10}\n\n{diary.artisan_gallery.s8._f8}",
  ]},
]);

registerPool('diary.artisan_gallery.s9._f10', [
  { when: {}, text: [
    "Regional gallery wants the series. AIB calls it evidence.",
    "Regional gallery interested. AIB calls it evidence. Fiona calls it Tuesday.",
    "Gallery wants the series. Board wants hearings. Fiona wants lunch.",
  ]},
]);

registerPool('diary.artisan_gallery.s9._f11', [
  { when: {}, text: [
    " Fiona is 560 pounds and calls it archive.",
    " 560 pounds. Archive, not indictment.",
    " She names it archive at 560. Body and catalog both growing.",
  ]},
]);

registerPool('diary.artisan_gallery.s9._f12', [
  { when: {}, text: [
    " She publishes online anyway. Patrons explode. Scrutiny follows. She shoots more.",
    " Published anyway. Patrons explode. Scrutiny follows. She shoots more.",
    " Online despite threats. More subjects. More frames. More appetite.",
  ]},
]);

registerPool('diary.artisan_gallery.s9', [
  { when: {}, text: [
    "{diary.artisan_gallery.s9._f10} {diary.artisan_gallery.s9._f11}\n\n{diary.artisan_gallery.s9._f12}",
    "{diary.artisan_gallery.s9._f10} {diary.artisan_gallery.s9._f12}\n\n{diary.artisan_gallery.s9._f11}",
    "{diary.artisan_gallery.s9._f12}\n\n{diary.artisan_gallery.s9._f10} {diary.artisan_gallery.s9._f11}",
  ]},
]);

registerPool('diary.artisan_gallery.s10._f11', [
  { when: {}, text: [
    "Permanent collection. Legacy program.",
    "Permanent collection secured. Legacy program launched.",
    "Museum calls. Legacy program. Fiona keeps shooting.",
  ]},
]);

registerPool('diary.artisan_gallery.s10._f12', [
  { when: {}, text: [
    " Fiona is 680 pounds and still shooting, still feeding, still pinning — museum-grade, institution made flesh.",
    " 680. Still shooting. Still feeding. Institution made flesh.",
    " Museum-grade at 680. Lens in one hand. Pastry in the other.",
  ]},
]);

registerPool('diary.artisan_gallery.s10._f13', [
  { when: {}, text: [
    " New subjects every semester.",
    " New subjects each semester. Same hunger. Better lighting.",
    " Semester after semester — new faces, same appetite, thicker archives.",
  ]},
]);

registerPool('diary.artisan_gallery.s10._f14', [
  { when: {}, text: [
    " The wall never stops growing.",
    " Wall grows. Waistlines grow. Fiona approves.",
    " The wall is never finished. Neither is she.",
  ]},
]);

registerPool('diary.artisan_gallery.s10', [
  { when: {}, text: [
    "{diary.artisan_gallery.s10._f11} {diary.artisan_gallery.s10._f12}\n\n{diary.artisan_gallery.s10._f13} {diary.artisan_gallery.s10._f14}",
    "{diary.artisan_gallery.s10._f11} {diary.artisan_gallery.s10._f13}\n\n{diary.artisan_gallery.s10._f12} {diary.artisan_gallery.s10._f14}",
    "{diary.artisan_gallery.s10._f13} {diary.artisan_gallery.s10._f14}\n\n{diary.artisan_gallery.s10._f11} {diary.artisan_gallery.s10._f12}",
  ]},
]);

registerPool('diary.artisan_gallery.s11._f13', [
  { when: {}, text: [
    "The gallery is wherever I sit now — prints on every wall, my body the living centerpiece.",
    "Gallery relocated to my chair — prints on walls, body as centerpiece.",
    "I am the gallery now. Prints orbit. Appetite anchors.",
  ]},
]);

registerPool('diary.artisan_gallery.s11._f14', [
  { when: {}, text: [
    " Subjects still arriving to be documented and fed.",
    " Subjects arrive. I shoot. I feed. Order preserved.",
    " Documentation and dinner — still the same appointment.",
  ]},
]);

registerPool('diary.artisan_gallery.s11._f15', [
  { when: {}, text: [
    " The wall never stops growing.",
    " Wall grows without me standing. Appetite handles the rest.",
    " New prints every week. New inches on me. Fair exchange.",
  ]},
]);

registerPool('diary.artisan_gallery.s11._f16', [
  { when: {}, text: [
    " Neither does the appetite behind the lens.",
    " Lens hungry. Belly hungry. Same artist.",
    " Appetite behind the lens outlasts every exhibition.",
  ]},
]);

registerPool('diary.artisan_gallery.s11', [
  { when: {}, text: [
    "{diary.artisan_gallery.s11._f13} {diary.artisan_gallery.s11._f14}\n\n{diary.artisan_gallery.s11._f15} {diary.artisan_gallery.s11._f16}",
    "{diary.artisan_gallery.s11._f13} {diary.artisan_gallery.s11._f15}\n\n{diary.artisan_gallery.s11._f14} {diary.artisan_gallery.s11._f16}",
    "{diary.artisan_gallery.s11._f15} {diary.artisan_gallery.s11._f16}\n\n{diary.artisan_gallery.s11._f13} {diary.artisan_gallery.s11._f14}",
  ]},
]);

registerPool('diary.artisan_gallery', [
  { when: { stage: [5] }, text: ['{diary.artisan_gallery.s5}'] },
  { when: { stage: [6] }, text: ['{diary.artisan_gallery.s6}'] },
  { when: { stage: [7] }, text: ['{diary.artisan_gallery.s7}'] },
  { when: { stage: [8] }, text: ['{diary.artisan_gallery.s8}'] },
  { when: { stage: [9] }, text: ['{diary.artisan_gallery.s9}'] },
  { when: { stage: [10] }, text: ['{diary.artisan_gallery.s10}'] },
  { when: { stage: [11] }, text: ['{diary.artisan_gallery.s11}'] },
  { when: {}, text: ['{diary.artisan_gallery.s5}', '{diary.artisan_gallery.s7}', '{diary.artisan_gallery.s9}'] }
]);

// ── pharmacist ─────────────────────────────────────────────
registerPool('diary.pharmacist.s5._f1', [
  { when: {}, text: [
    "First synthesis at home. The kitchen smells like a lab now — beakers on the drying rack, labels in my handwriting, appetite stimulant batch one cooling on the counter.",
    "Home lab online. Kitchen smells clinical. Batch one cooling — appetite stimulant, my handwriting on the label.",
    "Synthesis begins at home. Beakers on the rack. Batch one cooling. The kitchen is a lab now.",
  ]},
]);

registerPool('diary.pharmacist.s5._f2', [
  { when: {}, text: [
    " I tasted the dose myself.",
    " Self-administered first. Methodology demands participation.",
    " I drank the dose before anyone else. Data starts inside.",
  ]},
]);

registerPool('diary.pharmacist.s5._f3', [
  { when: {}, text: [
    " Professional responsibility. The warmth in my stomach was immediate and I logged it as expected variance.",
    " Warmth immediate. Logged as expected variance. Professional responsibility satisfied.",
    " Stomach warm. Spreadsheet updated. Ethics committee in my head nods.",
  ]},
]);

registerPool('diary.pharmacist.s5', [
  { when: {}, text: [
    "{diary.pharmacist.s5._f1} {diary.pharmacist.s5._f2} {diary.pharmacist.s5._f3}",
    "{diary.pharmacist.s5._f1} {diary.pharmacist.s5._f3}\n\n{diary.pharmacist.s5._f2}",
    "{diary.pharmacist.s5._f2} {diary.pharmacist.s5._f3}\n\n{diary.pharmacist.s5._f1}",
  ]},
]);

registerPool('diary.pharmacist.s6._f3', [
  { when: {}, text: [
    "Campus softening is measurable. I walk the hall and notice how portions look larger, how conversations around food sound less apologetic.",
    "Campus softening measurable now — larger portions, less apology in dining-hall talk.",
    "Walk to class: everyone eating louder. Portions bigger. Data confirms what my eyes see.",
  ]},
]);

registerPool('diary.pharmacist.s6._f4', [
  { when: {}, text: [
    " My compounds are in three dining venues.",
    " Three dining venues. Three delivery vectors. Uptake rising.",
    " Deployment in three halls. Uptake exceeds projections.",
  ]},
]);

registerPool('diary.pharmacist.s6._f5', [
  { when: {}, text: [
    " I am heavier than when I started and the scale curve matches the deployment curve.",
    " My scale curve mirrors deployment curve. Symmetry pleasing.",
    " Heavier every week. Deployment curve and waistline curve aligned.",
  ]},
]);

registerPool('diary.pharmacist.s6', [
  { when: {}, text: [
    "{diary.pharmacist.s6._f3} {diary.pharmacist.s6._f4}\n\n{diary.pharmacist.s6._f5}",
    "{diary.pharmacist.s6._f3} {diary.pharmacist.s6._f5}\n\n{diary.pharmacist.s6._f4}",
    "{diary.pharmacist.s6._f5}\n\n{diary.pharmacist.s6._f3} {diary.pharmacist.s6._f4}",
  ]},
]);

registerPool('diary.pharmacist.s7._f5', [
  { when: {}, text: [
    "The cult phase arrived without ceremony. Devoted users, stronger formulas, loyalty enhancers that make feeding feel like belonging.",
    "Cult phase: no ceremony, only devotion. Stronger formulas. Feeding as belonging.",
    "Users devoted. Formulas stronger. Belonging tastes like seconds.",
  ]},
]);

registerPool('diary.pharmacist.s7._f6', [
  { when: {}, text: [
    " I eat with them sometimes — methodology, I tell the season panel in my head.",
    " I eat with them. Methodology, I insist to the imaginary season panel.",
    " Shared meals logged as methodology. Appetite logged as honest.",
  ]},
]);

registerPool('diary.pharmacist.s7._f7', [
  { when: {}, text: [
    " My body keeps excellent records.",
    " My body keeps better records than my notebook.",
    " Spreadsheet and stomach agree. Excellent records.",
  ]},
]);

registerPool('diary.pharmacist.s7', [
  { when: {}, text: [
    "{diary.pharmacist.s7._f5} {diary.pharmacist.s7._f6} {diary.pharmacist.s7._f7}",
    "{diary.pharmacist.s7._f5} {diary.pharmacist.s7._f7}\n\n{diary.pharmacist.s7._f6}",
    "{diary.pharmacist.s7._f6} {diary.pharmacist.s7._f7}\n\n{diary.pharmacist.s7._f5}",
  ]},
]);

registerPool('diary.pharmacist.s8._f7', [
  { when: {}, text: [
    "Mass transformation is no longer hypothetical. Campus-wide passive gain, testers at every stage, my own waistline a proof of concept.",
    "Mass transformation live — campus passive gain, testers everywhere, my waist the proof.",
    "Hyposeason plan retired. Campus gains. I gain. Proof of concept complete.",
  ]},
]);

registerPool('diary.pharmacist.s8._f8', [
  { when: {}, text: [
    " I stopped pretending the work is separate from the appetite.",
    " Work and appetite merged. Pretense ended.",
    " Separation was fiction. Appetite is the work.",
  ]},
]);

registerPool('diary.pharmacist.s8._f9', [
  { when: {}, text: [
    " The appetite is the work.",
    " Appetite = work. Equation balanced.",
    " Final variable identified: hunger.",
  ]},
]);

registerPool('diary.pharmacist.s8', [
  { when: {}, text: [
    "{diary.pharmacist.s8._f7} {diary.pharmacist.s8._f8} {diary.pharmacist.s8._f9}",
    "{diary.pharmacist.s8._f7} {diary.pharmacist.s8._f9}\n\n{diary.pharmacist.s8._f8}",
    "{diary.pharmacist.s8._f8} {diary.pharmacist.s8._f9}\n\n{diary.pharmacist.s8._f7}",
  ]},
]);

registerPool('diary.pharmacist.s9._f9', [
  { when: {}, text: [
    "Ascension protocol unlocked. I synthesize at a scale that would have ended my corporate career.",
    "Ascension protocol live. Synthesis at career-ending scale. I have never been more precise.",
    "Corporate career hypothetically over. Precision at ascension scale: immaculate.",
  ]},
]);

registerPool('diary.pharmacist.s9._f10', [
  { when: {}, text: [
    " I have never felt more precise.",
    " Precision absolute. Appetite absolute. Fair trade.",
    " Hands steady. Belly soft. Both true.",
  ]},
]);

registerPool('diary.pharmacist.s9._f11', [
  { when: {}, text: [
    " My belly rests on the bench when I lean in to measure.",
    " Belly on bench when I measure. Counterweight useful.",
    " Lean in to measure; belly meets wood. Ergonomics solved.",
  ]},
]);

registerPool('diary.pharmacist.s9._f12', [
  { when: {}, text: [
    " The lab hums. So do I.",
    " Lab hums. I hum. Same frequency.",
    " Machines and metabolism synchronized.",
  ]},
]);

registerPool('diary.pharmacist.s9', [
  { when: {}, text: [
    "{diary.pharmacist.s9._f9} {diary.pharmacist.s9._f10} {diary.pharmacist.s9._f11} {diary.pharmacist.s9._f12}",
    "{diary.pharmacist.s9._f9} {diary.pharmacist.s9._f11}\n\n{diary.pharmacist.s9._f10} {diary.pharmacist.s9._f12}",
    "{diary.pharmacist.s9._f10} {diary.pharmacist.s9._f11}\n\n{diary.pharmacist.s9._f9} {diary.pharmacist.s9._f12}",
  ]},
]);

registerPool('diary.pharmacist.s10._f11', [
  { when: {}, text: [
    "Endgame note: goddess of excess is an accurate title.",
    "Endgame: goddess of excess — title earned, waistline agrees.",
    "Goddess of excess. Title accurate. Dosage ongoing.",
  ]},
]);

registerPool('diary.pharmacist.s10._f12', [
  { when: {}, text: [
    " Compounds, cult, campus saturation — I built a system that feeds itself.",
    " System feeds itself: compounds, cult, campus saturation.",
    " Closed loop — chemistry, devotion, campus-wide softness.",
  ]},
]);

registerPool('diary.pharmacist.s10._f13', [
  { when: {}, text: [
    " I am inside it, larger every week, exactly where the math said I would be.",
    " Inside the system. Larger weekly. Math vindicated.",
    " I am the variable and the constant. Weight trending up as predicted.",
  ]},
]);

registerPool('diary.pharmacist.s10', [
  { when: {}, text: [
    "{diary.pharmacist.s10._f11} {diary.pharmacist.s10._f12} {diary.pharmacist.s10._f13}",
    "{diary.pharmacist.s10._f11} {diary.pharmacist.s10._f13}\n\n{diary.pharmacist.s10._f12}",
    "{diary.pharmacist.s10._f12} {diary.pharmacist.s10._f13}\n\n{diary.pharmacist.s10._f11}",
  ]},
]);

registerPool('diary.pharmacist.s11._f13', [
  { when: {}, text: [
    "The lab comes to me. Compounds ship without my standing.",
    "Lab orbit my chair. Compounds ship unattended. Uptime perfect.",
    "I calibrate from stillness. Distribution autonomous.",
  ]},
]);

registerPool('diary.pharmacist.s11._f14', [
  { when: {}, text: [
    " My belly rests on the bench when I lean — when I lean at all.",
    " Belly on bench. Lean optional. Precision mandatory.",
    " Bench holds belly; hands hold pipette. Balance achieved.",
  ]},
]);

registerPool('diary.pharmacist.s11._f15', [
  { when: {}, text: [
    " Campus saturation is complete.",
    " Saturation complete. Campus soft. Data beautiful.",
    " Campus fully saturated. Experiment successful.",
  ]},
]);

registerPool('diary.pharmacist.s11._f16', [
  { when: {}, text: [
    " I am inside the system I built, larger every week, exactly where the math said I would be.",
    " Inside my own system. Larger weekly. Math always right.",
    " Inventor inside invention. Appetite inside outcome. All predicted.",
  ]},
]);

registerPool('diary.pharmacist.s11', [
  { when: {}, text: [
    "{diary.pharmacist.s11._f13} {diary.pharmacist.s11._f14}\n\n{diary.pharmacist.s11._f15} {diary.pharmacist.s11._f16}",
    "{diary.pharmacist.s11._f13} {diary.pharmacist.s11._f15}\n\n{diary.pharmacist.s11._f14} {diary.pharmacist.s11._f16}",
    "{diary.pharmacist.s11._f15} {diary.pharmacist.s11._f16}\n\n{diary.pharmacist.s11._f13} {diary.pharmacist.s11._f14}",
  ]},
]);

registerPool('diary.pharmacist', [
  { when: { stage: [5] }, text: ['{diary.pharmacist.s5}'] },
  { when: { stage: [6] }, text: ['{diary.pharmacist.s6}'] },
  { when: { stage: [7] }, text: ['{diary.pharmacist.s7}'] },
  { when: { stage: [8] }, text: ['{diary.pharmacist.s8}'] },
  { when: { stage: [9] }, text: ['{diary.pharmacist.s9}'] },
  { when: { stage: [10] }, text: ['{diary.pharmacist.s10}'] },
  { when: { stage: [11] }, text: ['{diary.pharmacist.s11}'] },
  { when: {}, text: ['{diary.pharmacist.s5}', '{diary.pharmacist.s7}', '{diary.pharmacist.s9}'] }
]);
