// src/gameData/communityResearcher.js
// Madeline (id:1) — bookworm archetype
// Evolution: community_researcher
// Present a thesis, then conduct 4 case studies on classmates.
// PhD defense is deferred to a future session.

// ── WEIGHT TIER HELPER ────────────────────────────────────────────────────────
// Used to select Madeline's weight-dependent lines in event text.
// 0=slim(stages 0-3), 1=heavy(4-6), 2=enormous(7-8), 3=blob(9+)
export function getMadelineTier(stageId) {
  if (stageId <= 3) return 0;
  if (stageId <= 6) return 1;
  if (stageId <= 8) return 2;
  return 3;
}

// ── STAGE OPENERS ─────────────────────────────────────────────────────────────
// Used inside event functions as STAGE_OPENERS[stageNum].
const STAGE_OPENERS = [
  "At the start of her study",
  "For her second case study",
  "By her third case study",
  "For her final case study",
];

// ── THESIS BOARD ─────────────────────────────────────────────────────────────

export const THESIS_BOARD = {
  phases: [
    // Phase 0 — Presentation
    (name) => `PhD Proposal Defense — Room 204, Department of Sociology.

Dr. Patricia Chen (senior faculty, the kind of dry that becomes warm in proportion to how much she respects you) sits opposite Dr. James Harmon (middle faculty, long career of reviewing proposals with visible skepticism). On the left is Dr. Olivia Ward — junior faculty, three colored tabs on her copy of the proposal.

${name} looks at all three of them and begins.

"The fetishization and ostracization of this subculture creates a closed loop. The more the community is pushed to the margins, the more internal the reinforcement becomes — behaviors that would moderate under social integration instead amplify and compound. What might have been a passing interest deepens into identity, into ideology, into physical reality."

She clicks to the next slide.

"I'm proposing that the spread of extreme feederism is not a function of exposure, but of isolation. The community doesn't deviate further because of contact with the mainstream. It deviates because of its absence."

Nobody speaks for a moment.`,

    // Phase 1 — Questions
    (name) => `Dr. Chen sets her pen down.

"The data on isolation as an amplifier — you're drawing on Festinger's social comparison theory?"

"Festinger, yes, and Tajfel on in-group identity formation. The community lacks external reference points to moderate against, so the only comparison is internal. And internal comparison in a gain-oriented culture only moves in one direction."

"Compelling," Dr. Chen says, and writes something.

Dr. Harmon leans forward. "You're describing a closed feedback system. How do you operationalize 'amplification' empirically without embedded observation? Your methodology proposes direct contact with participants — how do you maintain research integrity while embedded in an environment that, by your own argument, changes its participants through immersion?"

${name} had been waiting for this one.

"That's the centerpiece. Six months of supervised case-study contact with identified community participants — participant observation with ethical oversight at each stage. IRB-approved, structured, field notes reviewed monthly by a faculty liaison." She clicks to the methodology slide. "The research position is embedded by design. The documentation accounts for observer effect explicitly."

Dr. Harmon looks at Dr. Ward. Dr. Ward looks at her notes. Dr. Harmon nods, slowly.`,

    // Phase 2 — Dr. Ward's comment + approval
    (name) => `Dr. Ward — who has color-coded tabs on the methodology section — looks up.

"This is genuinely interesting work, ${name}. Brave, even." She says it like someone who means it. "The framing is airtight and the theoretical basis is solid." A pause that is the comfortable kind, not the uncomfortable one. "Just — make sure you don't get too close to your research. I remember how hard those long writing sessions can be on the waistline."

She smiles when she says it. Warmly, not cruelly.

${name} thanks her. She writes it in her field notes the moment she's outside the door.

The panel approves the proposal unanimously. Dr. Chen calls the framing "theoretically rigorous." Dr. Harmon says the methodology is "defensible if you stick to it." Dr. Ward tells her the writing is good and to trust it.

${name} takes the stairs instead of the elevator and fills three pages before she gets home.`,
  ],
};

// ── CASE STUDY PAIRS ─────────────────────────────────────────────────────────
// event(stageNum, mTier) → string
//   stageNum 0-3: which case study this is (for framing)
//   mTier 0-3: Madeline's weight tier

export const CASE_STUDY_PAIRS = [
  {
    id: 'social_pressure',
    label: 'Kylie & Tiffany',
    subtitle: 'Social Pressure',
    icon: '📱',
    studentIds: [2, 6],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "sat with a single mimosa and her notebook and watched everything.",
        "found herself eating more than she'd planned — refilling her plate twice without consciously deciding to.",
        "was eating steadily, her notebook open but the pen mostly still, writing only when something genuinely surprised her.",
        "was eating as much as either of them, which was not a small amount. Her notepad was closed. This was fieldwork.",
      ][mTier];
      const mObserve = [
        "She recorded the mechanisms carefully from a safe distance.",
        "She was starting to understand the mechanisms from the inside.",
        "She had been inside the mechanism for a while now.",
        "She was part of the mechanism. She noted this.",
      ][mTier];
      return `${opener}, Madeline arrived at Kylie's apartment to find Tiffany already there with a charcuterie board and a competitive expression.

Kylie had described it as a "collab brunch." Tiffany had heard "brunch" and shown up forty minutes early. By the time Madeline arrived, both of them had the look of people who had already committed to something.

"Kylie does the Instagram thing," Tiffany said, refilling a mimosa without being asked. "I do actual hosting."

"I do actual reach," Kylie said. She was already filming. "Tiff, sit so the light hits the prosciutto."

"I am not a lighting adjustment."

Between them, the table was covered: brioche, smoked salmon, three kinds of cheese, a waffle station Tiffany had apparently rented. The competition had no official rules, which meant it was total. Each new dish raised the stakes; each refill was a response; each offer a counter-move in a game neither of them named.

Madeline ${mEat}

The two of them fed off each other's momentum — growing the spread, growing each other — without once acknowledging that this was what they were doing. ${mObserve}`;
    },
  },
  {
    id: 'competitive',
    label: 'Brittany & Serena',
    subtitle: 'Competitive Eating',
    icon: '🏆',
    studentIds: [0, 3],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "had a single plate and mostly watched, writing notes about the competitive framework.",
        "had been handed a plate and eaten it, because the room's energy made stopping feel like an interruption.",
        "was eating in earnest by the second hour. She would figure out why later.",
        "was outpacing both of them on bread alone. Nobody said anything. It felt like the natural order.",
      ][mTier];
      const mNote = [
        "She noted the competitive dynamic with the focus of someone who is definitely just here professionally.",
        "She had stopped noting and started eating. She would reconstruct from memory.",
        "Her notebook was balanced on her knee but the pen wasn't moving.",
        "The notebook was closed. This had been research, and now it was also dinner.",
      ][mTier];
      return `${opener}, Madeline found Brittany and Serena at a table covered in takeout cartons.

"It started as a bet," Brittany said, not looking up from the noodles. "She said she could eat more lo mein than me."

"I said I'd had three servings to her two," Serena corrected. "She made it a bet."

"I clarified the terms."

They had been going for an hour before Madeline arrived. Seven empty cartons, two half-finished, a box of spring rolls neither had touched yet — they were saving the spring rolls. Madeline wrote this down. She understood already why.

Brittany ate fast, with the energy of someone used to an audience. Serena ate methodically, with the focus of someone who had trained for this without telling anyone. The competition had no end condition, which meant it would end when one of them decided it had, which meant it might not.

Madeline ${mEat}

${mNote}`;
    },
  },
  {
    id: 'vore',
    label: 'Reneé & Raven',
    subtitle: 'Consumption as Ritual',
    icon: '🕯️',
    studentIds: [10, 15],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "ate carefully, taking small portions and smaller notes.",
        "ate more than she'd intended. She noted this as relevant.",
        "had finished everything in front of her and was reaching for more without deciding to.",
        "ate with the quiet thoroughness of someone who had resolved the question of restraint at some earlier point in the evening.",
      ][mTier];
      const ravenObserve = [
        "Raven watched her with the attention of someone cataloguing a variable.",
        "Raven said, quietly: 'You're relaxing into it.' This was accurate.",
        "Raven made a note — in Raven's own notebook, not Madeline's.",
        "Raven smiled, which she did rarely and which was specific. 'You understand it now,' she said. Madeline did not fully disagree.",
      ][mTier];
      return `${opener}, Reneé had been cooking since noon.

She didn't explain what she was making. The apartment smelled like braised meat and wine reduction and something else Madeline couldn't identify. Raven was at the counter watching, which she apparently did regularly.

"I find the process philosophically interesting," Raven said, when Madeline asked. "Total incorporation. The act of consuming something completely — there's a ritual dimension that culinary culture refuses to name directly."

Reneé did not comment on this. She was adjusting seasoning.

"You study feederism," Raven said to Madeline. "You've thought about the ritual component."

"I've thought about it as a social phenomenon."

"Those aren't different things. The community has developed a liturgy: the offer, the acceptance, the witness. You've watched it in controlled conditions. Here you're watching it in its native form."

The food, when it came, was extraordinary. Reneé set plates down without ceremony and let people decide. Raven ate with deliberate slowness. Madeline ${mEat}

${ravenObserve}`;
    },
  },
  {
    id: 'metrics',
    label: 'Priya & Kaylee',
    subtitle: 'Metrics-Driven',
    icon: '📊',
    studentIds: [5, 11],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mResist = [
        `"I'm just observing," Madeline said. "I'm not a subject." Kaylee looked at Priya. Priya looked at the spreadsheet. Kaylee brought Madeline a plate.`,
        `"I don't need to be in the data set," Madeline said, but Kaylee was already writing something.`,
        `Madeline had stopped objecting. Kaylee's warmth made objection feel ungracious; Priya's precision made it feel unscientific.`,
        `Madeline had her own column in the spreadsheet. She wasn't sure when that had happened.`,
      ][mTier];
      const mEat = [
        "ate what was brought, recorded the quantity, and maintained professional distance.",
        "ate more than she'd budgeted for, which the spreadsheet apparently reflected.",
        "had stopped tracking her own intake because Kaylee was tracking it for her. She found this restful.",
        "was eating and being measured and eating and being measured. The data was, she supposed, good data.",
      ][mTier];
      return `${opener}, Madeline found Priya at her desk and Kaylee standing beside it with a tape measure.

"Third measurement session this week," Priya said, without looking up. "I'm tracking intake-to-output ratio at three-day intervals. Kaylee handles collection."

Kaylee smiled at Madeline with the genuine warmth of someone in a vocation. "You can stay," she said. "I'll bring you something." She brought something before Madeline had answered.

The session had a structure: Priya would eat, Kaylee would measure and record and offer more, and Priya would look at the numbers and calculate and demand more. She approached her own transformation with the precision of someone optimizing a system. "The intake rate correlates with absorption efficiency up to a point," she said between bites. "I'm trying to locate the ceiling."

"She's very close," Kaylee said, with pride.

${mResist}

Madeline ${mEat} When she glanced at Kaylee's clipboard on the way out, there was a row for her. There had been from the beginning.`;
    },
  },
  {
    id: 'night_in',
    label: 'Destiny & Maya',
    subtitle: 'Night In',
    icon: '🎮',
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
  {
    id: 'manipulation',
    label: 'Daisy & Nadia',
    subtitle: 'Active vs. Silent Influence',
    icon: '📋',
    studentIds: [13, 12],
    unlockImmediate: false,
    event: (stageNum, mTier) => {
      const opener = STAGE_OPENERS[stageNum];
      const mEat = [
        "ate two things she had been genuinely offered and noted both.",
        "ate four things. She had been about to stop when Daisy said 'just try this one too' with such warmth that stopping felt rude.",
        "had lost track of how many things she'd eaten. The distinction between observer and participant had fully dissolved.",
        "had eaten continuously for two hours. She was going to write a very honest methodology section.",
      ][mTier];
      const nadiaLine = [
        `Nadia made a note about Madeline's intake that Madeline could see being made but not read.`,
        `"You're more susceptible to direct warmth than you predicted," Nadia said, not unkindly. "That's genuinely useful data."`,
        `Nadia had stopped observing Daisy entirely. She was watching Madeline with the focus of someone who had found the more interesting variable.`,
        `"You know what you are?" Nadia said, at some point. Madeline said she didn't. "A control group that stopped controlling. That's not a failure. That's a finding." She wrote something.`,
      ][mTier];
      return `${opener}, Daisy had been baking since eight in the morning.

"I made too much," she said, with the tone of someone who had made exactly the right amount. "You have to take some. I made way too much."

Nadia was already there, in the corner with her notebook, watching Daisy with the expression of someone observing a particularly clean experiment.

"She does this every time," Nadia said quietly to Madeline. "Note the framing: 'I made too much' positions the offer as a favor to her. The recipient eats not from appetite but from social obligation." A pause. "It's effective. She's never not effective."

Daisy, who had heard this, brought Nadia another cookie. Nadia ate it without comment.

Daisy moved through the room with the warmth of someone who genuinely wanted everyone fed — learned names quickly, remembered preferences, brought things to specific people specifically. The mechanism was Festinger in reverse: not comparison downward, but inclusion upward.

Madeline ${mEat}

${nadiaLine}`;
    },
  },
  {
    id: 'culture_shock',
    label: 'Mary Jane, Fiona & Yuki',
    subtitle: 'Southern Hospitality',
    icon: '🌾',
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

Her off-campus house had the kitchen of someone raised to cook for fifteen. Fiona had been told it was "just a small thing." Yuki — an exchange student from Osaka who lived two floors above Fiona, who had come because Fiona seemed nervous about going alone — had not been briefed at all.

"There's more in the kitchen," Mary Jane said, the first time a dish was finished. There was more in the kitchen. There always was.

Fiona ate with the bewildered gratitude of someone who had been hungry without knowing it. She kept saying "I really shouldn't" and then eating more, which turned out to be the correct response — it made Mary Jane smile and bring another dish. They had settled into an equilibrium: Fiona would express token resistance, Mary Jane would override it with warmth, another plate would appear.

${yukiLine}

Madeline ${mEat}

Mary Jane, toward the end of the afternoon, looked around the table with the satisfaction of a completed project. "I love cooking for people," she said. She meant it entirely.`;
    },
  },
];
