// src/gameData/communityResearcher.js
// Madeline (id:1) — bookworm archetype → community_researcher evolution
// Present thesis, then 4 case studies (choose from 7 pairs).
// Each pair has a suspicion rating 1–7 (7 = most suspicious to the committee).
// gainRange gives Madeline's lbs gain when the case study is completed.

// ── WEIGHT TIER HELPER ────────────────────────────────────────────────────────
// 0=slim(0-3), 1=heavy(4-6), 2=enormous(7-8), 3=blob(9+)
export function getMadelineTier(stageId) {
  if (stageId <= 3) return 0;
  if (stageId <= 6) return 1;
  if (stageId <= 8) return 2;
  return 3;
}

const STAGE_OPENERS = [
  "At the start of her study",
  "For her second case study",
  "By her third case study",
  "For her final case study",
];

// ── THESIS BOARD ─────────────────────────────────────────────────────────────

export const THESIS_BOARD = {
  phases: [
    (name) => `PhD Proposal Defense — Room 204, Department of Sociology.

Dr. Patricia Chen (senior faculty, dry in the way that signals respect earned) sits across from Dr. James Harmon (long career, visible skepticism). Dr. Olivia Ward — junior faculty, three color-coded tabs on her copy of the proposal — is on the left.

${name} looks at all three of them and begins.

"The fetishization and ostracization of this subculture creates a closed loop. The more the community is pushed to the margins, the more internal the reinforcement becomes — behaviors that would moderate under social integration instead amplify and compound. What might have been a passing interest deepens into identity, into ideology, into physical reality."

She clicks to the next slide.

"I'm proposing that the spread of extreme feederism is not a function of exposure, but of isolation. The community doesn't deviate further because of contact with the mainstream. It deviates because of its absence."

Nobody speaks for a moment.`,

    (name) => `Dr. Chen sets her pen down.

"The data on isolation as an amplifier — you're drawing on Festinger's social comparison theory?"

"Festinger, yes, and Tajfel on in-group identity formation. The community lacks external reference points to moderate against, so the only comparison is internal. And internal comparison in a gain-oriented culture only moves in one direction."

"Compelling," Dr. Chen says, and writes something.

Dr. Harmon leans forward. "You're describing a closed feedback system. How do you operationalize 'amplification' empirically without embedded observation? Your methodology proposes direct contact with participants — how do you maintain research integrity while embedded in an environment that, by your own argument, changes its participants through immersion?"

${name} had been waiting for this one.

"That's the centerpiece. Six months of supervised case-study contact — participant observation with ethical oversight at each stage. IRB-approved, structured, field notes reviewed monthly by a faculty liaison." She clicks to the methodology slide. "The research position is embedded by design. The documentation accounts for observer effect explicitly."

Dr. Harmon looks at Dr. Ward. Dr. Ward looks at her notes. Dr. Harmon nods, slowly.`,

    (name) => `Dr. Ward — who has color-coded tabs on the methodology section — looks up.

"This is genuinely interesting work, ${name}. Brave, even." She says it like someone who means it. "The framing is airtight and the theoretical basis is solid." A pause — the comfortable kind, not the uncomfortable one. "Just — make sure you don't get too close to your research. I remember how hard those long writing sessions can be on the waistline."

She smiles when she says it. Warmly, not cruelly.

${name} thanks her. She writes it in her field notes the moment she's outside the door.

The panel approves the proposal unanimously. Dr. Chen calls the framing "theoretically rigorous." Dr. Harmon says the methodology is "defensible if you stick to it." Dr. Ward tells her the writing is good.

${name} takes the stairs instead of the elevator and fills three pages before she gets home.`,
  ],
};

// ── CASE STUDY PAIRS ─────────────────────────────────────────────────────────
// event(stageNum, mTier, studs) → string
//   stageNum 0-3: which case study (for framing)
//   mTier 0-3: Madeline's weight tier
//   studs: array of student objects for this pair (from students state)
// suspicion 1-7: 1=low committee risk, 7=highest
// gainRange: [min, max] lbs Madeline gains on completion

export const CASE_STUDY_PAIRS = [
  // ── 1. KYLIE & TIFFANY — Suspicion 1 ──────────────────────────
  {
    id: 'social_pressure',
    label: 'Kylie & Tiffany',
    subtitle: 'Event Taste-Testing',
    icon: '📱',
    suspicion: 1,
    gainRange: [4, 8],
    studentIds: [2, 6],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mRole = [
        "ate through the courses with the care of someone noting flavor profiles.",
        "had stopped taking notes after the fourth course and was just eating, which Kylie had started filming.",
        `was, by the ninth course, Kylie's "most-viewed test eater ever" — the engagement on someone her size working through a tasting menu was, Kylie explained, "insane."`,
        "was the main event. Kylie had stopped filming the food entirely. Tiffany had stopped pretending to take vendor notes.",
      ][mTier];
      const kylieReact = [
        `"You're doing us a genuine favor," Kylie said, refilling her glass. "We need actual feedback. Your opinions are data."`,
        `"Okay but the way she just finished that entire thing—" Kylie said, to Tiffany, at normal volume, in front of Madeline.`,
        `Kylie turned the camera on Madeline without announcing it. "This is my test-eater," she said into the lens. "She has eaten everything. Everything." A pause. "She's incredible."`,
        `"I need you at the actual event," Kylie said. "No notes, just you, as a guest, eating. The camera will handle the rest." Tiffany nodded without hesitation.`,
      ][mTier];
      return `${opener}, Kylie met Madeline at the door with a clipboard and a look of genuine relief.

"Thank god. Okay — we ordered double of everything for the event next month and we have to make sure all of it is actually good before I commit to the vendor. Literally everything. You are doing me a massive favor."

Tiffany was already at the table with a vendor spreadsheet and a fork. "We have seventeen courses," she said. "Two of each. Eat both versions of everything and tell us which one is better."

"It's a lot," Kylie agreed. "That's why we needed a third person."

The spread was — it was genuinely a lot. Two styles of each appetizer, two proteins, two sides, two desserts, all laid across the kitchen island in labeled rows. The task was clear: work through all of it, give opinions, compare.

Madeline ${mRole}

${kylieReact}

The session lasted four hours. Tiffany's vendor notes became increasingly illegible. Kylie's filming became increasingly focused on Madeline. The food kept coming until it was gone, which took longer than either of them had planned for and not as long as Madeline might have expected.`;
    },
  },

  // ── 2. BRITTANY & SERENA — Suspicion 2 ───────────────────────
  {
    id: 'competitive',
    label: 'Brittany & Serena',
    subtitle: 'Two-Method Showdown',
    icon: '🏆',
    suspicion: 2,
    gainRange: [6, 11],
    studentIds: [0, 3],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      // Night 1: Eating contest style (Brittany)
      const bReact = [
        `"C'mon, you barely took anything! The point is to eat FAST. Fill the plate and go." Brittany demonstrated. Madeline filled her plate.`,
        `Brittany pointed. "Okay, she's getting it. That's the form. See how she's just — she's committing." She was visibly pleased.`,
        `Brittany stopped mid-bite. "Hold on. How much has she — Serena. Serena, look." Serena looked. Both of them looked.`,
        `Brittany put her fork down slowly. "Hey. Hey, big gal. You don't have to — I mean, you can — we're not — maybe — " She glanced at Serena. Serena gave a very small shrug.`,
      ][mTier];
      // Night 2: Sumo grazing (Serena)
      const sReact = [
        `"Don't think about how much," Serena said. "Just eat until the table is empty. That's all. Take your time." Madeline took her time.`,
        `"Good. You're learning the pace." Serena watched Madeline work through the third plate with something approaching professional approval. "This is how you build capacity."`,
        `Serena sat back and looked at what Madeline had consumed over the past three hours. Her expression was one of quiet recalibration. "You have done this before," she said. "Not necessarily this, but — something like this."`,
        `Serena watched Madeline in silence for a long moment. Then, very carefully: "I think you might not need the training." A pause. "I think you might be past the training."`,
      ][mTier];
      const mNight1 = [
        "ate fast and a lot, which surprised her, because the room made slowing down feel wrong.",
        "was doing well, genuinely, in a way that she would examine later.",
        "was keeping pace with Brittany, which was not a small thing, and had stopped thinking about it.",
        "was, by the end of it, ahead. This was not where the evening was supposed to end.",
      ][mTier];
      const mNight2 = [
        "ate slowly and more than she planned, because Serena's method made stopping feel like quitting.",
        "was two hours in and still eating, which she noted with the portion of her brain still taking notes.",
        "had cleared everything in front of her and accepted a third plate without being asked.",
        "had been eating continuously for three hours. The table was mostly empty and she had contributed significantly to that fact.",
      ][mTier];
      return `${opener}, the case study ran across two evenings — because Brittany and Serena could not agree on a single method.

**Night One — Eating Contest (Brittany's Method)**

"The principle is simple," Brittany explained, arranging the table like a competition setup. "Plate up. Go. Stop when it's gone or you're done. Speed is part of the test." She looked at Madeline with the encouraging expression of a coach. "You're going to eat with us."

${bReact}

Madeline ${mNight1}

**Night Two — Sumo Grazing (Serena's Method)**

Serena's setup was different: the same amount of food, spread across low dishes, no clock. "This isn't about speed," she said. "This is about duration. You eat until the table is clear. You just — graze. Consistently. For as long as it takes." She looked at Madeline. "You're eating with us."

${sReact}

Madeline ${mNight2}

At the end of night two, Brittany and Serena sat across the empty table and did not immediately speak. Then Brittany said: "So her method is both." Serena considered this. "I think that's accurate," she said.`;
    },
  },

  // ── 3. DESTINY & MAYA — Suspicion 3 ──────────────────────────
  {
    id: 'night_in',
    label: 'Destiny & Maya',
    subtitle: 'Night In',
    icon: '🎮',
    suspicion: 3,
    gainRange: [4, 8],
    studentIds: [9, 8],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "had a few things from the delivery bags and took notes. She stayed two hours.",
        "had eaten more than she'd tracked and stayed four hours without noticing.",
        "had, at some point, stopped taking notes. The couch had absorbed her. She was part of the session.",
        "had been on the couch for six hours, passing boxes around. This was the most comfortable research she had conducted.",
      ][mTier];
      const mLeave = [
        "She documented the communal eating dynamic and left at midnight.",
        "She left at 1am. She had planned for two hours.",
        "Maya noted at 2am that the delivery app had stopped taking orders. Madeline took this as a natural end.",
        "She didn't leave until Destiny's documentary finished, which was 3am, which felt proportionate.",
      ][mTier];
      return `${opener}, Destiny had ordered from four different restaurants.

"There's a science to it," she explained, still on the controller. "Thai place for the curry, but their dumplings are mid, so Chen's for dumplings, and Chen's doesn't do dessert, so—"

"There's a lot of food," Madeline said.

"That's the point," Destiny agreed.

Maya was already on the couch with the second controller, eating with the methodical calm of someone who had done this before. She didn't say much during the game. She played and ate and occasionally handed something over with a quiet "incoming" that covered both the screen and the table.

The room was warm. The TV was loud. The bags kept producing things. Destiny provided running commentary on both the game and the food — occasionally the same commentary, which was not incoherent. Maya provided the stillness that made the room habitable.

Madeline ${mEat}

${mLeave}`;
    },
  },

  // ── 4. MARY JANE, FIONA & YUKI — Suspicion 4 ─────────────────
  {
    id: 'culture_shock',
    label: 'MJ, Fiona & Yuki',
    subtitle: 'Southern Hospitality',
    icon: '🌾',
    suspicion: 4,
    gainRange: [5, 9],
    studentIds: [14, 4],
    unlockImmediate: true,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "ate more than she'd budgeted for, attributing it to the ambient social cost of refusing.",
        "had stopped trying to moderate her intake after the third dish. Mary Jane's hospitality made moderation feel like ingratitude.",
        "was keeping pace with Fiona and Yuki, which was considerable, and noted this with something between professional interest and personal satisfaction.",
        "had become the one helping Mary Jane bring dishes from the kitchen. The research had fully absorbed her.",
      ][mTier];
      const yukiLine = [
        `"In Japan," Yuki said carefully, "refusing food from a host is — it can be considered very impolite." She looked at the table. "I did not expect this to apply here so completely."`,
        `Yuki had stopped refusing things an hour ago. "This is what hospitality is," she told Madeline, as if updating a definition.`,
        `"I think," Yuki said, looking at her third plate, "I am understanding the research topic from the inside." She appeared calm about this.`,
        `Yuki looked at Madeline with the expression of someone who had achieved an unexpected personal revelation. "I am going to need different clothing," she said. "Many different clothing."`,
      ][mTier];
      return `${opener}, Mary Jane had been cooking before anyone arrived.

Her off-campus house had the kitchen of someone raised to cook for fifteen. Fiona had been told it was "just a small thing." Yuki — an exchange student from Osaka, who lived two floors above Fiona and had come because Fiona seemed nervous about going alone — had not been briefed at all.

"There's more in the kitchen," Mary Jane said, the first time a dish was finished. There was more in the kitchen. There always was.

Fiona ate with the bewildered gratitude of someone who had been hungry without knowing it. She kept saying "I really shouldn't" and then eating more, which turned out to be the correct response — it made Mary Jane smile and bring another dish. They had settled into an equilibrium: Fiona would express token resistance, Mary Jane would override it with warmth, another plate would appear.

${yukiLine}

Madeline ${mEat}

Mary Jane, toward the end of the afternoon, looked around the table with the satisfaction of a completed project. "I love cooking for people," she said. She meant it entirely.`;
    },
  },

  // ── 5. PRIYA & KAYLEE — Suspicion 5 ──────────────────────────
  {
    id: 'metrics',
    label: 'Priya & Kaylee',
    subtitle: 'Metrics-Driven',
    icon: '📊',
    suspicion: 5,
    gainRange: [5, 10],
    studentIds: [5, 11],
    unlockImmediate: false,
    event: (stageNum, mTier, studs) => {
      const opener = STAGE_OPENERS[stageNum];

      // Priya reacts based on Madeline's tier relative to her
      const priyaReact = [
        // slim — Priya is ahead, stays smug and competes harder
        `Priya glanced at Madeline's column on the spreadsheet, then at Madeline, then back. "Still ahead of you," she said, with the satisfaction of someone who had been hoping to say exactly that. She ordered more.`,
        // heavy — Priya is surprised, recalibrates, redoubles
        `Priya looked at the numbers for longer than usual. "Wait." She looked at Madeline. "When did she — how much has she—" She looked back at the spreadsheet. "I need to recalibrate my baseline." She started eating faster.`,
        // enormous — Priya is getting agitated, competitive panic
        `Priya went quiet, which was unusual. She looked at her spreadsheet, then at Madeline, then at her spreadsheet. "This is a controlled environment," she said, to herself more than anyone. "I have a methodology." She added a new column. She started eating with visible urgency.`,
        // blob — Priya is looking at the data with complicated feelings
        `Priya stared at her laptop for a long time. Then she looked at Madeline. Then she looked at Kaylee. "My projections," she said slowly, "did not account for this variable." She opened a new tab. "I'm going to need more data points."`,
      ][mTier];
      const kayleeReact = [
        // slim — gentle, nurturing
        `Kaylee came over with a plate and set it in front of Madeline without asking. "You should eat more," she said warmly. "You're here, you might as well be in the data."`,
        // heavy — more attentive, starting to focus on Madeline
        `Kaylee measured Madeline's waist with the quiet efficiency of someone in her element, then wrote something down. "You're doing really well," she said. She brought another plate.`,
        // enormous — fully focused on Madeline, feeding aggressively
        `Kaylee had, at some point, redirected her full attention to Madeline. She set food in front of her continuously — not intrusively, just present, just available, just there when the plate was empty. "You're so good at this," she said. "I love data like this."`,
        // blob — in complete overdrive, Madeline is the main subject now
        `Kaylee was barely looking at Priya anymore. She stood beside Madeline with the focused energy of someone who had found their life's work. She refilled things before they were empty. She brought things Madeline hadn't asked for. She was almost glowing. "This," she said, to no one in particular, "is the best session I have ever run."`,
      ][mTier];
      const mEat = [
        "ate what was brought, recorded the quantity, and maintained professional distance.",
        "ate more than she'd projected for an observer. The irony was not lost on her.",
        "had stopped tracking her own intake because Kaylee was tracking it for her, and found this restful.",
        "was eating and being measured and eating and being measured, and had made peace with all of it.",
      ][mTier];
      return `${opener}, Madeline found Priya at her desk and Kaylee beside it with a tape measure.

"Third measurement session this week," Priya said, without looking up. "Tracking intake-to-output ratio at three-day intervals. Kaylee handles collection."

Kaylee smiled at Madeline with the genuine warmth of someone in a vocation. "You can stay," she said. "I'll bring you something." She brought something before Madeline had answered.

The session had a structure: Priya would eat, Kaylee would measure and record and offer more, and Priya would look at the numbers and calculate and demand more. She approached her own transformation with the precision of someone optimizing a system.

${priyaReact}

${kayleeReact}

Madeline ${mEat} When she glanced at Kaylee's clipboard on the way out, there was a row with her name on it. There had been from the beginning.`;
    },
  },

  // ── 6. DAISY & NADIA — Suspicion 6 ───────────────────────────
  {
    id: 'manipulation',
    label: 'Daisy & Nadia',
    subtitle: 'Warmth vs. Method',
    icon: '📋',
    suspicion: 6,
    gainRange: [8, 14],
    studentIds: [13, 12],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      // How much Madeline eats — scales significantly with tier
      const mEat = [
        "ate three things she'd been offered before she thought to decline, and noted this.",
        "had eaten steadily for an hour and was on her sixth plate before she did the accounting.",
        "had been eating for two hours, was on her ninth plate, and had stopped accounting entirely.",
        "was the center of the operation. There was no pretense otherwise. She had been eating for three hours and both of them were still actively feeding her.",
      ][mTier];
      // Daisy's reaction to Madeline's size — warm, scaling to outright adoration
      const daisyReact = [
        `Daisy appeared at Madeline's elbow. "You barely touched the second batch! Here, this one has brown butter in it, it's different, you have to try the difference—" She had already put it on the plate.`,
        `"Look at her go," Daisy said to Nadia, not quietly, watching Madeline work through the plate. "I love this. I LOVE this." She turned back to the kitchen. "I'm making more."`,
        `Daisy set down a full tray and looked at Madeline with an expression that could only be described as reverent. "You are," she said, "the best person I have ever baked for." She paused. "I'm making everything again."`,
        `Daisy was crying a little. Not distressed — the opposite. "This is the greatest thing I have ever witnessed," she said, bringing a fourth tray. "This is why I bake."`,
      ][mTier];
      // Nadia's reaction — clinical and manipulative, scaling to open acknowledgment
      const nadiaReact = [
        `Nadia said, to no one in particular: "Daisy already had four. That sets a contextual baseline. The social pressure to match is significant." She watched Madeline pick up another one.`,
        `"You respond well to warmth," Nadia said, to Madeline directly. "Most people do. Daisy is unusually effective because she means it. The manipulation works better when it isn't." She handed Madeline something else. "Here."`,
        `Nadia had moved her chair closer. "At this size, the appetite is self-sustaining," she said, clinically. "The psychological intervention is secondary now. You'd keep eating without us." She looked at Madeline's plate. "Nevertheless." She refilled it.`,
        `Nadia watched in silence for a long moment. Then: "I designed this session around Daisy's warmth as the primary vector. I included myself as a secondary pressure mechanism." A pause. "I am not the secondary mechanism anymore." She studied Madeline with undisguised interest. "You've outgrown the study design."`,
      ][mTier];
      return `${opener}, Daisy had been baking since eight in the morning.

"I made too much," she said, in the tone of someone who had made exactly the right amount. "You have to take some. Seriously, I made way too much."

Nadia was already in the corner with her notebook, watching Daisy with the expression of someone observing a particularly clean experiment.

"She does this every time," Nadia said quietly to Madeline. "Note the framing: 'I made too much' positions the offer as a favor to her. The recipient eats not from appetite but from social obligation." A pause. "It's effective. She's never not effective."

Daisy, who had heard this, brought Nadia another cookie. Nadia ate it without comment.

${daisyReact}

${nadiaReact}

Madeline ${mEat}`;
    },
  },

  // ── 7. RENEÉ & RAVEN — Suspicion 7 ───────────────────────────
  {
    id: 'vore',
    label: 'Reneé & Raven',
    subtitle: 'The Hunt',
    icon: '🕯️',
    suspicion: 7,
    gainRange: [15, 25],
    studentIds: [10, 15],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      // How Madeline observes and participates
      const mWatch = [
        "Madeline stood at the edge of the room and took notes. Her handwriting got smaller as the evening went on.",
        "Madeline sat at the table and ate with the others. She told herself she was observing from within the dynamic. She ate a great deal.",
        "Madeline had stopped pretending she was observing. She was eating. Raven watched her eat with specific interest.",
        "Madeline was the largest person at the table, eating openly, and Raven had stopped watching the others entirely. 'You,' Raven said at one point, 'are the most interesting variable in this room.' Madeline kept eating.",
      ][mTier];
      // Madeline's internal state, scaling from horror to complicity
      const mState = [
        "She wrote, in the margin of her notes: 'The methodology has a gap. I need to think about what to do with this data.'",
        "She wrote: 'I participated more than planned. The environment makes participation feel correct. This is the mechanism I described in my proposal. I understand it better now.'",
        "She didn't write anything. She would reconstruct later. The food was extraordinary.",
        "She wrote, much later, from memory: 'The committee will ask about this session. I will need to decide what to include.' A long gap in the text. Then: 'Everything.'",
      ][mTier];
      return `${opener}, Raven called Madeline at 7pm and said, simply: "I found three tonight. Come over."

Madeline came over.

Reneé had been cooking for eight hours. The apartment smelled like something extraordinary — braised, layered, rich, the smell of a meal made with intent. Raven was at the door when Madeline arrived, watching the street with the calm of someone who has already done the difficult part.

"Three of them," Raven said. "A corporate type, a grad student, and someone visiting for a conference. I found them separately. They don't know each other." She tilted her head toward the apartment. "They think this is a dinner party."

It was a dinner party. Reneé had set the table for seven: herself, Raven, Madeline, and the three guests. The guests — Morgan, who worked downtown; Theo, who was doing a second PhD; Francesca, who was presenting at the conference and had mentioned offhand that she'd never had good food in this city — arrived over twenty minutes, introduced themselves, and sat.

Reneé served without ceremony. The food was staggering. Course after course, each one better than the last, and nobody stopped because nobody wanted to stop, and at some point stopping would have meant choosing to leave something extraordinary on the table.

The three guests ate until they were very full. Then they ate more, because Raven refilled things with the calm of a host who expects it, and refusing a refill would have meant drawing attention to themselves, and none of them wanted to draw attention to themselves. Raven watched all three of them with the quiet satisfaction of someone completing a project.

${mWatch}

The guests left two hours after they'd finished eating, moving slowly, warm, confused in the specific way of people who have eaten more than they planned and are still not sure how. Reneé cleared the table. Raven sat with her wine and looked at the empty chairs.

"The ritual requires witnesses," she said, to Madeline. "That's why I called you."

${mState}`;
    },
  },
];

// ── SUSPICION BRACKETS ────────────────────────────────────────────────────────
// totalSuspicion = sum of pair.suspicion across the 4 completed studies (range 10–22 if spread)
export function getSuspicionBracket(total) {
  if (total <= 13) return 'green';
  if (total <= 17) return 'yellow';
  if (total <= 20) return 'orange';
  return 'red';
}

// ── BOARD REACTIONS ───────────────────────────────────────────────────────────
// Interstitial shown immediately after completing each case study.
export const BOARD_REACTIONS = {
  social_pressure: `Dr. Harmon's weekly review note: "Subject demonstrates naturalistic embedding. Participants were self-selected and already embedded in food-adjacent social performance. Methodology appropriate." Dr. Chen's addendum: "Clean data. Appropriate context." Dr. Ward's note, handwritten in the margin of her printed copy: "The intake documentation for this session is very thorough."`,

  competitive: `Dr. Harmon flags a consent documentation gap — two sessions, same participants, implied consent only — and notes it should have been formalized. Dr. Chen's emailed question arrives that afternoon: "The two-session structure produces interesting comparative data. Which method did you find more informative as a researcher?" Dr. Ward's email arrives one hour later, same subject line: "Same question. Different emphasis. Which did you find more interesting to participate in?"`,

  night_in: `Dr. Chen: "Co-habitual domestic observation is a recognized methodology. Whether this constitutes fieldwork or a social visit is unclear from your notes. Clarify in revision." Dr. Harmon, more charitably: "The naturalistic setting produced authentic data. Participants were at ease. That's the goal." Dr. Ward's note arrives last: "Three of the delivery receipts you submitted as field documentation have your name on them."`,

  culture_shock: `Dr. Harmon's note is the longest she's sent. She calls the cross-cultural hospitality documentation "exactly the kind of comparative fieldwork the committee hoped to see," cites the exchange student's response arc as strong observational data, and recommends featuring it prominently in the final paper. Dr. Chen references two published papers on hospitality as a social bonding mechanism and calls the methodology "appropriate." Dr. Ward's note: "Three hours at one table is a substantial investment of field time. The portion documentation is thorough."`,

  metrics: `Dr. Chen's response spans three paragraphs. The first asks what the experimental design was, because she cannot determine it from the notes. The second asks how Madeline induced competitive consumption in a high-performing student without her explicit awareness. The third asks what the research question actually was, "because I cannot locate it in the documentation." Dr. Harmon flags the power dynamics as "requiring clarification." Dr. Ward's question is simpler: "How did you get Priya to participate in something she wasn't already winning?"`,

  manipulation: `Dr. Chen's email arrives forty-five minutes after Madeline submits her notes. Three lines: "Session six. Was Nadia's participation disclosed to the IRB." Dr. Harmon follows the next morning: "The power differential in this session is significant. Daisy is in an educational role. Her participation alongside a psychology PhD candidate conducting what appears to be a coordinated feeding event raises serious questions about prior agreement and oversight." Dr. Ward's message comes last: "You were being fed by two active researchers simultaneously. We need to discuss this."`,

  vore: `Dr. Chen does not send an email. She requests a meeting through the departmental coordinator. Her attached note: "Session seven documents a coordinated feeding event involving three external individuals not affiliated with the university, who did not consent to being research subjects, and are referenced in your field notes by first name only. This is being flagged for committee review." Dr. Harmon's email: "Where is the consent documentation for Morgan, Theo, and Francesca?" Dr. Ward's message arrives late at night: "The section you titled 'The Hunt.' Come and explain it to me in person."`,
};

// ── FINAL REVIEW TEXT ─────────────────────────────────────────────────────────
export function getFinalReviewText(pairsUsed, totalSuspicion) {
  const bracket = getSuspicionBracket(totalSuspicion);
  const did = (id) => pairsUsed.includes(id);
  let text = `Dr. Chen sets a folder on the table.\n\n"Four case studies. Let's discuss what you found — and what we found."\n\n`;

  if (did('vore')) {
    text += `She opens to a tabbed section. "Session seven. You document a coordinated feeding event involving three external participants — Morgan, Theo, Francesca — who did not consent to be research subjects." She looks up. "Walk me through what you thought you were doing."\n\nDr. Harmon: "The consent documentation for all three is absent from this file."\n\nDr. Ward says nothing for a moment. Then, quietly: "The passage titled 'The Hunt.' In your own words."\n\n`;
  }
  if (did('competitive')) {
    text += `Dr. Harmon references the two-night study. "Eating contest methodology, then sumo methodology — same subject, consecutive evenings." She pauses. "Which did you find more informative as a researcher?" Dr. Ward doesn't wait: "Which did you find more interesting to participate in?"\n\n`;
  }
  if (did('manipulation')) {
    text += `Dr. Chen: "Session six. You were being fed simultaneously by a student teacher and a psychology PhD candidate conducting a parallel study you did not disclose to this committee. Did you know about Nadia's work before you included her?"\n\n`;
  }
  if (did('metrics')) {
    text += `Dr. Chen: "Session five. I've read it three times. I still can't locate the research question."\n\n`;
  }
  if (did('culture_shock') && bracket !== 'red') {
    text += `Dr. Harmon: "The cross-cultural session was the strongest work in the set. That section will carry the final paper."\n\n`;
  }
  if (did('social_pressure') && (bracket === 'green' || bracket === 'yellow')) {
    text += `Dr. Harmon: "The taste-testing session was clean fieldwork. Well handled."\n\n`;
  }

  if (bracket === 'green') {
    text += `Dr. Chen closes the folder.\n\n"The thesis argues that feederism amplifies under social isolation — that the community deepens not through exposure, but through its absence. The fieldwork supports it. Some of these sessions were methodologically aggressive in ways we'd have preferred to know about upfront. The data is real and the argument holds."\n\nDr. Harmon: "I recommend approval with minor revisions."\n\nDr. Ward: "Approved. Write up the full findings. I want to read it."`;
  } else if (bracket === 'yellow') {
    text += `Dr. Chen closes the folder.\n\n"The work is intellectually sound. Several of these sessions are methodologically aggressive in ways that should have been disclosed upfront. We're asking for a consent and ethics appendix before submission — explicit documentation of what each participant was told."\n\nDr. Harmon: "The research is good. The paper needs work."\n\nDr. Ward: "Conditional approval. Revise and resubmit." She looks at Madeline. "I'll be reviewing the revision personally."`;
  } else if (bracket === 'orange') {
    text += `Dr. Chen sets the folder down.\n\n"The thesis is interesting. The fieldwork is real. And some of what's in this file crosses lines we need to discuss before this can proceed." She looks at her colleagues. "I'm not prepared to approve this as it stands. Nor to reject it. We need separate conversations — off the record."\n\nDr. Harmon: "It's not over."\n\nDr. Ward stands. "Come and find me. We'll start there."\n\nThe room empties. Madeline stands with her field journal and thinks about what she's gotten herself into.`;
  } else {
    text += `Dr. Chen does not open the folder.\n\n"The thesis is the most interesting work submitted to this committee in three years. It is also the most ethically compromised." She looks at Madeline steadily. "External participants without consent. A parallel researcher not disclosed. An observer-participant boundary that dissolved by study two. If the university reviews this file, it ends several careers."\n\nDr. Harmon: "This conversation cannot happen in this room."\n\nDr. Ward picks up the folder. "One-on-one. All three of us. If you can convince us, the thesis gets approved." She doesn't finish the alternative.`;
  }

  return text;
}

// ── HAVE A CHAT SCENES ────────────────────────────────────────────────────────
// Three scenes played in order: Ward (easiest) → Harmon → Chen (hardest).
// chatHistory is reset between members. winCondition receives the full history for that member.
// Orange bracket: need 2/3 members won. Red bracket: need 3/3.
export const HAVE_A_CHAT_SCENES = [
  // ── DR. WARD ──────────────────────────────────────────────────────────────
  {
    member: "Dr. Ward",
    phases: [
      {
        text: (h) => `Dr. Ward finds Madeline in the hallway outside the faculty lounge. She closes the folder when she sees her.\n\n"Off the record." She looks at Madeline with something that isn't quite professional distance. "I've been following your research closely — more closely than the committee file reflects. I understand what you were doing out there. Better than Chen does, and better than Harmon wants to admit she does."\n\nShe waits.`,
        choices: [
          { id: 'explain', label: 'Walk her through the methodology' },
          { id: 'acknowledge', label: '"I thought you might be following it."' },
        ],
      },
      {
        text: (h) => h.includes('acknowledge')
          ? `A slow smile. "Smart girl." She opens the folder. "Here's what I can do. I'll write a support recommendation into the committee record — my name on it carries weight with Chen." She looks at Madeline steadily. "In exchange for the full field notes. All of them. Not the edited submission. The real ones."`
          : `"The methodology is fine," she says, cutting her off gently. "I know the methodology is fine. I've read everything you submitted and some things you didn't intend to submit." A pause. "I'm not here to catch you. I want to read the rest of it." She opens the folder. "Full field notes — unedited — and I'll support the thesis."`,
        choices: [
          { id: 'share_notes', label: 'Agree — share the full unedited field notes' },
          { id: 'partial_share', label: 'Offer a partial copy, redacted' },
        ],
      },
    ],
    winCondition: (h) => h.includes('acknowledge') || h.includes('share_notes'),
  },
  // ── DR. HARMON ────────────────────────────────────────────────────────────
  {
    member: "Dr. Harmon",
    phases: [
      {
        text: (h) => `Dr. Harmon's office has plants everywhere. She offers tea before Madeline has sat down.\n\n"I want to support this thesis. The argument is important and the data is real." She sets her cup down. "Help me do that. Chen needs something she can point to. Give me something I can take back to her."\n\nShe waits.`,
        choices: [
          { id: 'consent_claim', label: '"All subjects were willing participants."' },
          { id: 'ethics_appendix', label: '"I\'ll write a full consent and ethics appendix."' },
        ],
      },
      {
        text: (h) => `She nods.\n\n"One more thing. Not the methodology." She looks at Madeline directly. "The fieldwork changed you. Your own notes say so. You're not the same researcher who proposed this thesis six months ago." A pause. "That's not a criticism. Tell me what it means for the objectivity of the work."`,
        choices: [
          { id: 'deny_change', label: '"I maintained objectivity throughout."' },
          { id: 'own_change', label: '"The change is part of the data."' },
        ],
      },
    ],
    winCondition: (h) => h.includes('own_change') || (h.includes('ethics_appendix') && h.includes('consent_claim')),
  },
  // ── DR. CHEN ──────────────────────────────────────────────────────────────
  {
    member: "Dr. Chen",
    phases: [
      {
        text: (h) => `Dr. Chen's office has no plants. One sheet of paper on the desk between them.\n\n"IRB protocol deviations. Six items." She reads them aloud, without inflection:\n\n1. External participants without documented consent.\n2. Parallel researcher (Nadia) not disclosed to committee.\n3. Observer-participant boundary discontinued from study two onward.\n4. Intake quantities not formally logged.\n5. Field notes submitted selectively.\n6. Researcher's own physical data excluded as a confounding variable.\n\n"We'll start with item one."`,
        choices: [
          { id: 'argue_irb', label: 'Contest the IRB interpretation point by point' },
          { id: 'concede_framework', label: 'Concede the violations and propose a revised ethics framework' },
        ],
      },
      {
        text: (h) => h.includes('concede_framework')
          ? `She makes two notes on the framework Madeline outlines. "This is workable." From Dr. Chen, that is the highest available praise. She sets the pen down.\n\n"One more item. Nadia. Did you know she was conducting a parallel study when you included her in session six?"`
          : `"You're defending positions that aren't defensible," she says, without heat. "The goal isn't to catch you. The goal is a thesis this committee can approve without setting a precedent we'll regret." She looks up. "So. The ethics framework. Walk me through what you'd do differently." She makes two notes.\n\n"Nadia. Did you know?"`,
        choices: [
          { id: 'no_didnt_know', label: '"No. I didn\'t know."' },
          { id: 'yes_corroborates', label: '"Yes. Her data corroborates mine."' },
        ],
      },
    ],
    winCondition: (h) => h.includes('concede_framework') || h.includes('no_didnt_know') || h.includes('yes_corroborates'),
  },
];
