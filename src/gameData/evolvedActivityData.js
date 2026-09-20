// Evolved passive activity beats + AP meta — MIGRATION.md extract.
// Evolved activity prose stub migration (step 6) — bridge cells; evolved.activity fragments @ week 20+.
import { depthActivityGainBonus, depthLbsGrant, depthRelBonus } from './mechanicsDepthLayer.js';

export const EVOLVED_ACTIVITY_TEXT = {
  sumo: [
    (s)=>`sumo activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`sumo activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`sumo activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`sumo activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`sumo activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  eating_competitor: [
    (s)=>`eating_competitor activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_competitor activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_competitor activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_competitor activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_competitor activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_competitor activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  feedee_creator: [
    (s)=>`feedee_creator activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`feedee_creator activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`feedee_creator activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`feedee_creator activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`feedee_creator activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`feedee_creator activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  body_positive_creator: [
    (s)=>`body_positive_creator activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_creator activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_creator activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_creator activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_creator activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  eating_captain: [
    (s)=>`eating_captain activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_captain activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_captain activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_captain activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_captain activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  big_squad_captain: [
    (s)=>`big_squad_captain activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`big_squad_captain activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`big_squad_captain activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`big_squad_captain activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`big_squad_captain activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  eating_diarist: [
    (s)=>`eating_diarist activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_diarist activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_diarist activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_diarist activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_diarist activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  food_researcher: [
    (s)=>`food_researcher activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_researcher activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_researcher activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_researcher activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_researcher activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  eating_streamer: [
    (s)=>`eating_streamer activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_streamer activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_streamer activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_streamer activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`eating_streamer activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  speed_eater: [
    (s)=>`speed_eater activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`speed_eater activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`speed_eater activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`speed_eater activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`speed_eater activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  chapter_hostess: [
    (s)=>`chapter_hostess activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`chapter_hostess activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`chapter_hostess activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`chapter_hostess activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`chapter_hostess activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  body_positive_greek: [
    (s)=>`body_positive_greek activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_greek activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_greek activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_greek activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`body_positive_greek activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  installation_artist: [
    (s)=>`installation_artist activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`installation_artist activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`installation_artist activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`installation_artist activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`installation_artist activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  food_photographer: [
    (s)=>`food_photographer activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_photographer activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_photographer activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_photographer activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_photographer activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  anonymous_blogger: [
    (s)=>`anonymous_blogger activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`anonymous_blogger activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`anonymous_blogger activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`anonymous_blogger activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`anonymous_blogger activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  asmr_creator: [
    (s)=>`asmr_creator activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`asmr_creator activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`asmr_creator activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`asmr_creator activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`asmr_creator activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  salon_appetit: [
    (s)=>`salon_appetit activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`salon_appetit activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`salon_appetit activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`salon_appetit activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`salon_appetit activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`salon_appetit activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  artisan_gallery: [
    (s)=>`artisan_gallery activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`artisan_gallery activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`artisan_gallery activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`artisan_gallery activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`artisan_gallery activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`artisan_gallery activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  campus_legend: [
    (s)=>`campus_legend activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`campus_legend activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`campus_legend activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`campus_legend activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`campus_legend activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  food_tourist: [
    (s)=>`food_tourist activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_tourist activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_tourist activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_tourist activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`food_tourist activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  ff_author: [
    (s)=>`ff_author activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`ff_author activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`ff_author activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`ff_author activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`ff_author activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`ff_author activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  homestead_queen: [
    (s)=>`homestead_queen activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`homestead_queen activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`homestead_queen activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`homestead_queen activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`homestead_queen activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`homestead_queen activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  state_fair_queen: [
    (s)=>`state_fair_queen activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`state_fair_queen activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`state_fair_queen activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`state_fair_queen activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`state_fair_queen activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`state_fair_queen activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  wife_lessons: [
    (s)=>`wife_lessons activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`wife_lessons activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`wife_lessons activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`wife_lessons activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`wife_lessons activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`wife_lessons activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ],
  community_researcher: [
    (s)=>`community_researcher activity beat 0 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`community_researcher activity beat 1 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`community_researcher activity beat 2 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`community_researcher activity beat 3 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`community_researcher activity beat 4 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
    (s)=>`community_researcher activity beat 5 — ${Math.round(s.lbs)} lbs witnessed. Modular evolved.activity @ week 20+.`,
  ]
};

export const EVOLVED_ACTIVITY_META = {
  "sumo": {
    "label": "Enter a Tournament",
    "apCost": 1,
    "gainRange": [
      4,
      8
    ],
    "relBonus": 10
  },
  "eating_competitor": {
    "label": "Attend a Competition",
    "apCost": 1,
    "gainRange": [
      3,
      7
    ],
    "relBonus": 9
  },
  "feedee_creator": {
    "label": "Go Live Together",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 12
  },
  "body_positive_creator": {
    "label": "Watch Her Latest Video",
    "apCost": 1,
    "gainRange": [
      2,
      5
    ],
    "relBonus": 11
  },
  "eating_captain": {
    "label": "Enter a Competition",
    "apCost": 1,
    "gainRange": [
      4,
      7
    ],
    "relBonus": 10
  },
  "big_squad_captain": {
    "label": "Attend a Squad Event",
    "apCost": 1,
    "gainRange": [
      2,
      5
    ],
    "relBonus": 12
  },
  "eating_diarist": {
    "label": "Read Her Latest Entry",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 11
  },
  "food_researcher": {
    "label": "Visit Her Station",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 10
  },
  "eating_streamer": {
    "label": "📡 Stream Event",
    "apCost": 1,
    "gainRange": [
      4,
      8
    ],
    "relBonus": 10
  },
  "speed_eater": {
    "label": "Watch a Challenge",
    "apCost": 1,
    "gainRange": [
      4,
      9
    ],
    "relBonus": 9
  },
  "ranked_feedee": {
    "label": "🎮 Run a Session",
    "apCost": 1,
    "gainRange": [
      8,
      22
    ],
    "relBonus": 12
  },
  "competitive_gainer": {
    "label": "📊 Check Her Progress",
    "apCost": 1,
    "gainRange": [
      10,
      50
    ],
    "relBonus": 8
  },
  "home_nest": {
    "label": "🍜 Order In",
    "apCost": 1,
    "gainRange": [
      6,
      15
    ],
    "relBonus": 9
  },
  "delivery_hive": {
    "label": "🕸️ Manage Delivery Hive",
    "apCost": 1,
    "gainRange": [
      8,
      20
    ],
    "relBonus": 10
  },
  "chapter_hostess": {
    "label": "Attend Wednesday Feast",
    "apCost": 1,
    "gainRange": [
      5,
      10
    ],
    "relBonus": 11
  },
  "body_positive_greek": {
    "label": "Attend Chapter Event",
    "apCost": 1,
    "gainRange": [
      2,
      5
    ],
    "relBonus": 12
  },
  "installation_artist": {
    "label": "View the Installation",
    "apCost": 1,
    "gainRange": [
      2,
      5
    ],
    "relBonus": 12
  },
  "food_photographer": {
    "label": "Review the Latest Shoot",
    "apCost": 1,
    "gainRange": [
      2,
      5
    ],
    "relBonus": 11
  },
  "artisan_gallery": {
    "label": "🖼 Open Artisan Gallery",
    "apCost": 1,
    "gainRange": [
      4,
      9
    ],
    "relBonus": 11
  },
  "salon_appetit": {
    "label": "🥂 Host Salon Evening",
    "apCost": 2,
    "gainRange": [
      6,
      14
    ],
    "relBonus": 12
  },
  "anonymous_blogger": {
    "label": "Read the Latest Post",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 10
  },
  "asmr_creator": {
    "label": "Watch a Recording Session",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 12
  },
  "campus_legend": {
    "label": "Share a Meal at the Booth",
    "apCost": 1,
    "gainRange": [
      5,
      10
    ],
    "relBonus": 11
  },
  "food_tourist": {
    "label": "Join an Expedition",
    "apCost": 1,
    "gainRange": [
      4,
      8
    ],
    "relBonus": 10
  },
  "ff_author": {
    "label": "Read Her Latest Chapter",
    "apCost": 1,
    "gainRange": [
      3,
      6
    ],
    "relBonus": 12
  },
  "homeroom_queen": {
    "label": "🍪 Run a Baking Session",
    "apCost": 1,
    "gainRange": [
      4,
      9
    ],
    "relBonus": 11
  },
  "wife_lessons": {
    "label": "🏠 Hold Wife Lessons",
    "apCost": 1,
    "gainRange": [
      5,
      12
    ],
    "relBonus": 11
  },
  "homestead_queen": {
    "label": "🏡 Visit the Homestead",
    "apCost": 1,
    "gainRange": [
      5,
      10
    ],
    "relBonus": 12
  },
  "state_fair_queen": {
    "label": "🎡 Enter the Fair",
    "apCost": 1,
    "gainRange": [
      4,
      8
    ],
    "relBonus": 10
  },
  "psych_researcher": {
    "label": "Continue Hall Log Session",
    "apCost": 1,
    "gainRange": [
      4,
      9
    ],
    "relBonus": 11
  },
  "cultivator": {
    "label": "🍰 Run Taste-Test Session",
    "apCost": 1,
    "gainRange": [
      2,
      8
    ],
    "relBonus": 12
  },
  "community_researcher": {
    "label": "📋 Conduct Case Study",
    "apCost": 1,
    "gainRange": [
      3,
      8
    ],
    "relBonus": 10
  },
  "pharmacist": {
    "label": "🧪 Run Synthesis Session",
    "apCost": 1,
    "gainRange": [
      2,
      6
    ],
    "relBonus": 10
  },
  "machine_goddess": {
    "label": "🔧 Open The Lab",
    "apCost": 1,
    "gainRange": [
      2,
      6
    ],
    "relBonus": 10
  }
};

/** Depth-scaled evolved activity payouts (gain range + relationship). */
export function getEvolvedActivityMeta(formId) {
  const raw = EVOLVED_ACTIVITY_META[formId];
  if (!raw) return raw;
  const meta = { ...raw };
  if (meta.gainRange?.length === 2) {
    meta.gainRange = [
      depthActivityGainBonus(meta.gainRange[0]),
      depthActivityGainBonus(meta.gainRange[1]),
    ];
  }
  if (meta.relBonus) meta.relBonus = depthRelBonus(meta.relBonus);
  return meta;
}

export function scaleEvolvedEventLbs(lbs = 0) {
  if (!lbs || lbs <= 0) return lbs || 0;
  return depthLbsGrant(lbs);
}

export function scaleEvolvedEventRel(rel = 0) {
  if (!rel) return 0;
  if (rel < 0) return rel;
  return depthRelBonus(rel);
}

/** Wife Lessons session payouts — same depth curve as evolved branching events. */
export function scaleWlLessonLbs(lbs = 0) {
  return scaleEvolvedEventLbs(lbs);
}

export function scaleWlLessonRel(rel = 0) {
  return scaleEvolvedEventRel(rel);
}
