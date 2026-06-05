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
      const priya = studs?.[0];
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
