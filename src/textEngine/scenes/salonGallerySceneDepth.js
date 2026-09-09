// The Squad — Lead: A2 Psych | Support: A4 Architect, A5 Editor
// Salon + gallery hub prose and form-specific evolved event depth.
// Loads after oppositionSalonGallery.js and v2ProseExpansion.js.
import { registerModuleVariants, registerPool } from '../engine.js';

const W = 4;

registerPool('evolved.salon.v2.depth', [
  { when: { studentId: 9, stageMin: 9 }, text: [
    `Chloé hosts from the center now — silk, candles, courses brought to her hands. *Encore* assumed.`,
    `Salon outgrew one room. Shifts of guests orbit appetite made architecture.`,
  ]},
  { when: { studentId: 9, stageMin: 6 }, text: [
    `Wine, butter, scandal in French — Chloé pours like abundance is the only language.`,
    `Guests arrive hungry on purpose. She feeds the rumor and the room.`,
  ]},
  { when: { studentId: 9 }, text: [
    `Candles lit. Cheese breathing. Parisian amusement meets American portions.`,
    `Prestige in the guest book. Indulgence on her hips. Both climbing.`,
  ]},
  { when: {}, text: [
    `The salon hums — wine, warmth, appetite dressed as civilization.`,
    `Courses arrive. Laughter thickens. Scandal tastes like dessert.`,
  ]},
]);

registerPool('evolved.gallery.v2.depth', [
  { when: { studentId: 4, stageMin: 9 }, text: [
    `Fiona shoots from the chair now — subject, artist, appetite one frame.`,
    `Gallery ships to her. Prints on walls she can see without standing.`,
  ]},
  { when: { studentId: 4, stageMin: 6 }, text: [
    `Shutter clicks between bites. Consent forms and hunger both signed.`,
    `Field archive thickens. Waistlines thicken. Correlation beautiful.`,
  ]},
  { when: { studentId: 4 }, text: [
    `Camera honest. Bodies documented. Appetite the only honest medium.`,
    `Patrons murmur. The wall of proof grows. Evidence, she calls it.`,
  ]},
  { when: {}, text: [
    `Prints on twine. Bodies in frame. Growth made exhibition.`,
    `The archive grows — appetite caught mid-bite, mid-laugh, mid-surrender.`,
  ]},
]);

registerPool('evolved.cultivator.v2.depth', [
  { when: { studentId: 10, stageMin: 8 }, text: [
    `Harvest window open. Reneé tastes from the pot — chef, subject, cultivator merged.`,
    `Session log and recipe both revised upward. Yield beyond specification.`,
  ]},
  { when: { studentId: 10 }, text: [
    `Kitchen smells like technique and appetite. She feeds what she grows.`,
    `Palate built the recipe. Body proves the methodology.`,
  ]},
  { when: {}, text: [
    `Cultivation at scale — appetite harvested, warmth served, growth intentional.`,
  ]},
]);

registerPool('evolved.cultivator.v2.depth', [
  { when: { studentId: 10, stageMin: 8 }, text: [
    `Harvest window open. Reneé tastes from the pot — chef, subject, cultivator merged.`,
    `Session log and recipe both revised upward. Yield beyond specification.`,
  ]},
  { when: { studentId: 10 }, text: [
    `Kitchen smells like technique and appetite. She feeds what she grows.`,
    `Palate built the recipe. Body proves the methodology.`,
  ]},
  { when: {}, text: [
    `Cultivation at scale — appetite harvested, warmth served, growth intentional.`,
  ]},
]);

registerPool('evolved.feedee.v2.depth', [
  { when: { studentId: 2, stageMin: 8 }, text: [
    `Collab energy at scale — camera honest, appetite subscriber-facing, Wren watching.`,
    `Stream mythology thickens. Kylie feeds the format and the format feeds her.`,
  ]},
  { when: { studentId: 2 }, text: [
    `Mukbang collab arc — hunger documented, gain celebrated, chat paying attention.`,
    `Content and appetite finally the same thing. Numbers reflect honesty.`,
  ]},
  { when: {}, text: [
    `Feedee evolution — spectacle made sincere, growth made content, hunger made career.`,
  ]},
]);

registerPool('evolved.machine.v2.depth', [
  { when: { studentId: 18, custom: false, stageMin: 8 }, text: [
    `Campus hums her firmware. Belly on bench. Devices tick on bodies she will not visit.`,
    `Inventor inside invention — calibration from stillness, appetite the final spec.`,
  ]},
  { when: { studentId: 18, custom: false }, text: [
    `Workshop orbit her chair. Feeder arms within reach. Closed loop perfect.`,
    `Lab relocated to immobility. Yield optimized in place.`,
  ]},
  { when: {}, text: [
    `Machine goddess evolution — flesh and firmware meshed, hunger engineered outward.`,
  ]},
]);

registerPool('evolved.pharmacist.v2.depth', [
  { when: { studentId: 16, stageMin: 8 }, text: [
    `Campus saturation complete. Sophia inside her own system — larger, predicted, pleased.`,
    `Compounds ship unattended. Spreadsheet and stomach agree.`,
  ]},
  { when: { studentId: 16 }, text: [
    `Synthesis at home. Batch cooling. She tasted dose one herself — data starts inside.`,
    `Cult phase: feeding as belonging. Wellness rhetoric surrendering to compound hunger.`,
  ]},
  { when: {}, text: [
    `Pharmacist evolution — appetite stimulant, pleasure enhancer, transformation architect.`,
  ]},
]);

registerPool('evolved.gainer.v2.depth', [
  { when: { studentId: 7, stageMin: 8 }, text: [
    `Corkboard lowered to chair height. Priya dictates numbers. First in every column.`,
    `Competitive gainer evolution — data and appetite panel-reviewed, shame benched.`,
  ]},
  { when: { studentId: 7 }, text: [
    `Board mounted. Pins mark leaderboard. Waist circumference still hers to win.`,
    `Spreadsheet and stomach aligned. Optimization succeeded beyond spec.`,
  ]},
  { when: {}, text: [
    `Gainer evolution — every measurement victory, every pound a data point conquered.`,
  ]},
]);

registerPool('evolved.homeroomQueen.v2.depth', [
  { when: { studentId: 13, stageMin: 8 }, text: [
    `Daisy flour-dusted at center — six mothers orbit, Tuesday theology made flesh.`,
    `Homeroom queen evolution — soft power, hard butter, suspicion meter rising.`,
  ]},
  { when: { studentId: 13 }, text: [
    `Conference container always out. Parents fed. Curriculum optional.`,
    `Bake-sale diplomacy. Abundance as policy. Daisy smiling.`,
  ]},
  { when: {}, text: [
    `Homeroom queen evolution — lounge as court, appetite as curriculum.`,
  ]},
]);

registerModuleVariants('salon_appetit.hub', [
  { when: { studentId: 9, stageMin: 10 }, weight: W, text: [
    `Chloé hosts from center — silk vast, candles everywhere, courses brought to her hands. *Encore.*`,
    `Salon no longer fits one room. Shifts suffice. Digestif eternal.`,
  ]},
  { when: { studentId: 9, stageMin: 7 }, weight: W, text: [
    `Black silk, butter, scandal in French. Guest list coveted. Line out the door.`,
    `Wine flows before names. Chloé pours like Paris unlearned restraint beautifully.`,
  ]},
  { when: { studentId: 9, stageMin: 5 }, weight: W, text: [
    `Première soirée energy — dorm smells wine and butter. Three guests, four courses planned.`,
    `Candles, cheese board, Chloé at {subject.lbs} pounds already arranging abundance.`,
  ]},
  { when: {}, weight: 3, text: [
    `Candles, wine, four courses promised. Prestige and appetite share the room.`,
    `Guest book open. Indulgence gathering. The salon awaits.`,
    `Chloé lights the candles. The semester bends toward her table.`,
  ]},
]);

registerModuleVariants('artisan_gallery.hub', [
  { when: { studentId: 4, stageMin: 10 }, weight: W, text: [
    `Opening night sold out. Fiona at {subject.lbs} pounds — artist, subject, wall of proof.`,
    `Gallery packed. She eats in the corner deliberately. Performance and appetite one piece.`,
  ]},
  { when: { studentId: 4, stageMin: 7 }, weight: W, text: [
    `Eight prints, wine, cheese. Critics arrive. Fiona shoots between bites without apology.`,
    `Field archive fat with frames. Studio smells paint and butter.`,
  ]},
  { when: { studentId: 4, stageMin: 5 }, weight: W, text: [
    `First contact sheet pinned: mid-bite, mid-laugh. Consent forms on the table.`,
    `Fiona at {subject.lbs} pounds — camera ready, subject hungry, archive begun.`,
  ]},
  { when: {}, weight: 3, text: [
    `Prints on twine. Bodies in frame. Fiona feeds the subject and clicks the shutter.`,
    `Patrons murmur. Archive grows. Evidence, she calls it. Art, she means.`,
    `The camera waits. The subject is already hungry.`,
  ]},
]);

registerModuleVariants('homeroom.v2.depth', [
  { when: { studentId: 13, stageMin: 8 }, weight: W, text: [
    `Daisy's kitchen hums — flour-dusted, enormous at center, Tuesday theology made flesh.`,
  ]},
  { when: { studentId: 13, stageMin: 5 }, weight: W, text: [
    `Cookies, curriculum, calculated indulgence. Parents orbit the desk container.`,
  ]},
  { when: {}, weight: 3, text: [
    `Institutional warmth — bake-sale diplomacy, suspicion meter rising one tray at a time.`,
    `Soft power measured in butter. Homeroom queen holds court.`,
  ]},
]);

registerModuleVariants('homeroom.conference.Bri.intro', [
  { when: {}, text: [
    `Bri's gaze hits the drawer first. "Status," she says. "Then provisions. Efficient order."`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.curriculum', [
  { when: { stageMin: 6 }, weight: 3, text: [
    `Agenda survives intact. Arms uncross by item two. Containers at the door. Everyone fed.`,
  ]},
]);

registerModuleVariants('homeroom.activity.parent_meeting.p0.refreshments_first', [
  { when: {}, text: [
    `Big container lands mid-sentence. Monroe opens it before Daisy sits. Agenda waits. Excellent meeting.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p0', [
  { when: { stageMin: 7 }, weight: 3, text: [
    `Scale at front. Girls waiting — Sofia near it, easy. Numbers will be interesting reading.`,
  ]},
]);

registerModuleVariants('homeroom.activity.health_unit.p1', [
  { when: {}, text: [
    `Pickup time. Mrs. Monroe watched from back row. Eyes on scale. "Can I—" she starts.`,
  ]},
]);
