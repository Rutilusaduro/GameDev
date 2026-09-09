// The Squad — Lead: A2 Psych | Support: A4 Architect, A5 Editor
// Depth on Phase D evolved diaries (competitive_gainer, machine_goddess,
// salon_appetit, artisan_gallery, pharmacist). Loads after diaryPhaseD.js.
import { registerModuleVariants } from '../engine.js';

const W = 4;

const S11 = {
  competitive_gainer: {
    sid: 7,
    lines: [
      `Corkboard lowered to chair height. I dictate numbers. Belly shelf across lap. First in every column. Room adapts; I do not shrink.`,
      `Assistants pin the top row. I remain largest. The data obeys from immobility.`,
    ],
  },
  machine_goddess: {
    sid: 18,
    custom: false,
    lines: [
      `Lab orbit my chair. Feeder arms within reach. Campus hums my firmware. Inventor and invention share one appetite.`,
      `I calibrate from stillness. Belly on bench. Devices tick on bodies I will never visit. Closed loop perfect.`,
    ],
  },
  salon_appetit: {
    sid: 9,
    lines: [
      `Salon outgrew one room. I host from center — silk, appetite, courses brought to my hands. *Encore* to the night.`,
      `Guests arrive in shifts. Digestif never ends. Neither do I. Paris would be scandalized. I am delighted.`,
    ],
  },
  artisan_gallery: {
    sid: 4,
    lines: [
      `Gallery ships to me now. I shoot from the chair — subject and photographer merged. Best work immobile.`,
      `Exhibition on walls I can see without standing. Every frame appetite documented. Camera honest. I am honest.`,
    ],
  },
  pharmacist: {
    sid: 16,
    lines: [
      `Lab comes to me. Compounds ship unattended. Campus saturated. I am inside the system I built — larger, predicted.`,
      `Bench holds belly; hands hold pipette. Saturation complete. Math and appetite finally agree.`,
    ],
  },
};

const S10 = {
  competitive_gainer: {
    sid: 7,
    lines: [
      `Board mounted at new height. I lean less, dictate more. Waist circumference still first. Satisfaction immediate.`,
    ],
  },
  machine_goddess: {
    sid: 18,
    custom: false,
    lines: [
      `Lab never sleeps. Devices on campus bodies. I solder one-handed now. Belly warm counterweight. Useful.`,
    ],
  },
  salon_appetit: {
    sid: 9,
    lines: [
      `Reservation list longer than the menu. I pour from a wider chair. Butter and wine follow me like weather.`,
    ],
  },
  artisan_gallery: {
    sid: 4,
    lines: [
      `Opening night sold out. I am in every photograph and none of them — artist behind the appetite she documents.`,
    ],
  },
  pharmacist: {
    sid: 16,
    lines: [
      `Mass transformation no longer hypothetical. My waistline proof of concept. IRB in my head finally quiet.`,
    ],
  },
};

const S9 = {
  competitive_gainer: {
    sid: 7,
    lines: [
      `Second place is folklore now. I widened the gap until the board needed recalibration. Academic on paper. Hunger underneath.`,
    ],
  },
  machine_goddess: {
    sid: 18,
    custom: false,
    lines: [
      `Mesh live across campus. Three device types deployed. I eat while calibrating. Professional terminology for pleasure.`,
    ],
  },
  salon_appetit: {
    sid: 9,
    lines: [
      `Salon reputation precedes me. Guests arrive already hungry. I pour before names. Civilization without apology.`,
    ],
  },
  artisan_gallery: {
    sid: 4,
    lines: [
      `Series *In Progress* now campus-wide. Strangers ask to be subjects. Consent forms and appetite both signed.`,
    ],
  },
  pharmacist: {
    sid: 16,
    lines: [
      `Cult phase: devotion measurable. I eat with users — methodology, I tell the imaginary IRB. Body keeps excellent records.`,
    ],
  },
};

for (const [form, { sid, custom, lines }] of Object.entries(S11)) {
  const base = custom === false ? { studentId: sid, custom: false, stage: [11] } : { studentId: sid, stage: [11] };
  registerModuleVariants(`diary.${form}.s11`, [
    { when: base, weight: W, text: lines },
    { when: { ...base, isImobile: true }, weight: W + 1, text: lines },
  ]);
}

for (const [form, { sid, custom, lines }] of Object.entries(S10)) {
  const base = custom === false ? { studentId: sid, custom: false, stage: [10] } : { studentId: sid, stage: [10] };
  registerModuleVariants(`diary.${form}.s10`, [{ when: base, weight: W, text: lines }]);
}

for (const [form, { sid, custom, lines }] of Object.entries(S9)) {
  const base = custom === false ? { studentId: sid, custom: false, stage: [9] } : { studentId: sid, stage: [9] };
  registerModuleVariants(`diary.${form}.s9`, [{ when: base, weight: W, text: lines }]);
}

const WILDCARDS = {
  competitive_gainer: `Board updated. Appetite updated. Both trend upward.`,
  machine_goddess: `Workshop hums. Belly warm. Calibration continues.`,
  salon_appetit: `Candles lit. Cheese breathing. Encore assumed.`,
  artisan_gallery: `Shutter clicks. Appetite documented. Gallery grows.`,
  pharmacist: `Batch cooling. Campus softening. Data excellent.`,
};

for (const [form, line] of Object.entries(WILDCARDS)) {
  registerModuleVariants(`diary.${form}`, [{ when: {}, weight: 3, text: [line] }]);
}

registerModuleVariants('diary.competitive_gainer.s5._f1', [
  { when: { studentId: 7 }, weight: W, text: [
    `Priya mounted the corkboard tonight — gridlines, categories, competitive columns labeled in her hand.`,
  ]},
]);

registerModuleVariants('diary.machine_goddess.s5._f1', [
  { when: { studentId: 18, custom: false }, weight: W, text: [
    `Talia's workshop log — week one post-evolution. Solder and paste. Belt prototype first. Feedback loops honest.`,
  ]},
]);

registerModuleVariants('diary.salon_appetit.s5._f1', [
  { when: { studentId: 9 }, weight: W, text: [
    `Chloé at 258 pounds. Dorm smells butter and wine. Salon born tonight.`,
  ]},
]);

registerModuleVariants('diary.artisan_gallery.s5._f1', [
  { when: { studentId: 4 }, weight: W, text: [
    `Fiona at 258 — first contact sheet pinned: resident mid-bite, mid-laugh, mid-surrender.`,
  ]},
]);

registerModuleVariants('diary.pharmacist.s5._f1', [
  { when: { studentId: 16 }, weight: W, text: [
    `Sophia's first home synthesis. Kitchen lab. Batch one cooling. She tasted it herself. Data starts inside.`,
  ]},
]);
