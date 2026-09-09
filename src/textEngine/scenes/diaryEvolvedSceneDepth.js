// The Squad — Lead: A2 Psych | Support: A5 Editor
// Stage 11 + immobile depth on evolved-form diary chapter pools.
// Loads after diary.js and diaryPhaseD.js.
import { registerModuleVariants } from '../engine.js';

const W = 4;

/** stage 11 narrative beats for diary.<form>.c1 */
const STAGE11_C1 = {
  sumo: [
    `The ring is memory. I fill the room now. Food arrives. I accept. This is the stable position.`,
    `Immobile at center. Opponents come or don't. I eat either way. Mass is doctrine now.`,
  ],
  eating_competitor: [
    `Records archived. I eat because eating is what I am. The timer is optional at this scale.`,
    `Circuit legend, stationary edition. Plates come to me. I clear them anyway.`,
  ],
  feedee_creator: [
    `Camera on a tripod. Wren beside me in her chair. Three hundred thousand watch us not moving. Honest.`,
    `Immobile collab. Chat donates delivery. We eat on camera. The format was always this.`,
  ],
  body_positive_creator: [
    `I film from the chair now. Message unchanged: your body is good. Mine proves it without standing.`,
    `The channel is geography. Subscribers send food. I speak gratitude into the lens. Real.`,
  ],
  eating_captain: [
    `Squad eats where I sit. I don't visit the field. The field visits me. Leadership stationary.`,
    `Captain's chair reinforced twice. Spread arrives like halftime. Scoreboard irrelevant. Appetite wins.`,
  ],
  big_squad_captain: [
    `The whole squad orbits one room now. I am the room. Food routes through me. Policy.`,
    `Pep rally from a throne. They chant. I eat. Mass is morale. Morale is high.`,
  ],
  eating_diarist: [
    `Diary dictated now. Hands busy holding plate. Voice steady. Appetite the only plot.`,
    `Pages arrive pre-filled with fullness. I sign them. Truth requires less walking now.`,
  ],
  food_researcher: [
    `Lab chair is field site. Samples delivered. Hyposeason plan: immobility improves yield. Confirmed.`,
    `I publish from the chair. Peer review can visit. The data is warm and vast and here.`,
  ],
  eating_streamer: [
    `Stream never off. Chair is throne. Chat feeds me. I game one-handed. Perfect format.`,
    `Mukbang legend, stationary edition. Algorithm loves geography. So do I.`,
  ],
  speed_eater: [
    `Speed irrelevant at this mass. I eat until done. Done takes longer. Point stands.`,
    `Records retired. Appetite untimed. Plates arrive. Plates empty. Life continues.`,
  ],
  ranked_feedee: [
    `Leaderboard mounted at chair height. I update from immobility. Rank unchanged. First.`,
    `They bring the scale to me. Number climbs. Trophy case beside the snacks. Both full.`,
  ],
  chapter_hostess: [
    `Chapter circles my chair. Hospitality without standing. Abundance as architecture.`,
    `Hostess immobile. Party still perfect. They eat because I eat. Leadership by example.`,
  ],
  body_positive_greek: [
    `Chapter meets around me. Message louder at this scale: bodies good, mine proof.`,
    `Greek row sends plates. I bless them with appetite. Sisterhood stationary and fed.`,
  ],
  installation_artist: [
    `The installation is me in this chair. Gallery ships the work. Critics call it honest.`,
    `I am the exhibit now. Visitors bring food. Performance continues without rising.`,
  ],
  food_photographer: [
    `Camera on tripod. Subject and photographer same person. Best composition: still life eating.`,
    `I shoot what arrives. Every plate a portrait. The artist is in every frame.`,
  ],
  anonymous_blogger: [
    `Posts typed from immobility. Followers send recipes. Anonymity intact. Honesty louder.`,
    `The blog is a chair now. Confessions arrive between bites. Readership up.`,
  ],
  asmr_creator: [
    `Mic beside the chair. Every chew amplified. Subscribers pay for proximity. I deliver sound.`,
    `ASMR from stillness — breath, swallow, satisfied exhale. The format found its final form.`,
  ],
  home_nest: [
    `Nest complete. Door unused. Delivery knows the address. Warmth absolute.`,
    `Home is one chair, one fridge, one endless afternoon. I have built the correct life.`,
  ],
  delivery_hive: [
    `Drivers know the route. Hive immobile. Orders optimized. Yield excellent.`,
    `I am the hub now. Packages and portions arrive. I consume. Network thrives.`,
  ],
  campus_legend: [
    `Freshmen tour past my window. Legend stationary. Stories grow. Appetite documented.`,
    `Campus myth, verified daily. They bring offerings. I accept. Fame is warm.`,
  ],
  food_tourist: [
    `Tour ends at this chair. Every cuisine delivered. Passport unnecessary. Palate complete.`,
    `I have eaten the map. Now the map comes to me. Satisfaction without luggage.`,
  ],
  ff_author: [
    `I dictate chapters between courses. Fiction and appetite merge. Readers send fan food.`,
    `The novel writes itself from fullness. Heroine immobile by final act. Art imitates.`,
  ],
  homestead_queen: [
    `Homestead radius one chair. Harvest delivered. Grandma's line finally literal. Good crop.`,
    `Queen stationary. Kitchen comes to me. Abundance without walking. Thriving.`,
  ],
  state_fair_queen: [
    `Crown on the side table. Fair comes indoors. Ribbons irrelevant. Appetite reigns.`,
    `Queen immobile. County sends fried things. Scepter unused. Belly holds court.`,
  ],
  wife_lessons: [
    `Lesson from the chair. Students bring questions and plates. Marriage curriculum edible.`,
    `I teach abundance by example. Desk cleared for dessert. Class rapt. Hungry.`,
  ],
  psych_researcher: [
    `Subject and researcher same chair. Data continuous. Ethics board can visit. Findings vast.`,
    `Case study immobile. Nadia feeds. I observe myself eating. Methodology flawless.`,
  ],
  homeroom_queen: [
    `Tuesday from a chair. They bring everything. I taste-test anyway. Royalty need not stand.`,
    `Flour-dusted at center. Six mothers orbit. Homeroom is geography now. Yes.`,
  ],
  cultivator: [
    `Harvest complete. Subject immobile. I am immobile. Session log continues from chairs.`,
    `Kitchen comes to us both. Professional judgment: continue. Yield beyond projection.`,
  ],
  community_researcher: [
    `Field site is this chair. Community feeds the study. I document from immobility. Valid.`,
    `Research stationary. Neighbors bring data disguised as pie. Conclusions delicious.`,
  ],
};

/** body-change chapter stage 11 beats for forms with c3 */
const STAGE11_C3 = {
  homeroom_queen: [
    `I planned immobility and stopped pretending otherwise. Flour on everything. Happy.`,
    `The room rearranges around my chair. I am also softer. Intended outcome achieved.`,
  ],
  cultivator: [
    `Subject and cultivator both vast. Chairs groan. Session continues. Harvest ongoing.`,
    `I taste from immobility. Notes in lap. Appetite professional. Body personal. Both fed.`,
  ],
  homestead_queen: [
    `Hands on belly like harvest inspection. Good crop. Chair holds. Land delivered indoors.`,
    `Homestead queen stationary. Sweetness undiminished. Seconds assumed. Always.`,
  ],
  state_fair_queen: [
    `Fair queen immobile. Ribbons on the wall. Body the blue-ribbon entry. Judges satisfied.`,
    `I wear the county's appetite. Crown optional. Fullness mandatory. Worth it.`,
  ],
  ff_author: [
    `I eat what I write. Character and author merge. Final chapter delicious.`,
    `Fullness informs prose. Prose demands fullness. Cycle complete from this chair.`,
  ],
};

/** extra wildcard lines on thin main evolved pools */
const WILDCARD_MAIN = {
  sumo: `Stable position. Mass settled. Appetite continues without ceremony.`,
  eating_competitor: `Plate empty. Record irrelevant. Hunger the only score left.`,
  feedee_creator: `Camera ready. Appetite honest. The feed wants more.`,
  eating_streamer: `Live. Fed. Gaming. Chat pleased. Format perfected.`,
  homeroom_queen: `Tuesday approaches. Kitchen ready. Crown fits.`,
  cultivator: `Session logged. Subject fed. Researcher fed. Data excellent.`,
  ranked_feedee: `Rank first. Chair throne. Appetite undefeated.`,
  home_nest: `Nest warm. Door unused. Correct life.`,
  campus_legend: `Legend grows. Chair holds. Stories and portions arrive.`,
};

for (const [form, lines] of Object.entries(STAGE11_C1)) {
  registerModuleVariants(`diary.${form}.c1`, [
    { when: { stage: [11] }, weight: W, text: lines },
    { when: { stage: [11], isImmobile: true }, weight: W + 1, text: lines },
  ]);
}

for (const [form, lines] of Object.entries(STAGE11_C3)) {
  registerModuleVariants(`diary.${form}.c3`, [
    { when: { stage: [11] }, weight: W, text: lines },
  ]);
}

for (const [form, line] of Object.entries(WILDCARD_MAIN)) {
  registerModuleVariants(`diary.${form}`, [
    { when: {}, weight: 3, text: [line] },
  ]);
}

registerModuleVariants('diary.lilith', [
  { when: { studentId: 15, stage: [11] }, weight: W, text: [
    `I do not move. The world moves toward me — food, attention, the slow orbit of everything hungry.`,
    `Hunting ended when I became the place. I wait. Things arrive. Appetite patient and vast.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Bri.brief', [
  { when: {}, text: [
    `Brief and warm — Bri accepts no snack without complaint. Specific praise lands. She's thinking about Tuesday before the door closes.`,
    `"Not today" accepted. Bri still leaves pleased. Tuesday math already running.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0', [
  { when: {}, text: [
    `Three mothers, one Daisy, zero empty hands. Mrs. Monroe claimed the window chair. Mrs. Reyes mid-sentence. Mrs. Calloway catalogs.`,
    `The agenda says curriculum. The room smells like butter. Everyone knows which agenda wins.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1.decline', [
  { when: {}, text: [
    `"Hall only," Daisy says. Mrs. Monroe nods — comfortable without the number. She doesn't need proof.`,
    `Scale stays student-only. Mrs. Monroe unbothered. Self-knowledge sufficient.`,
  ]},
]);
