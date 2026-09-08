// The Squad — Lead: A5 Editor | Support: A1 Mobile, A2 Psych
// V2.0 global prose depth pass — additional variants for high-traffic scenes
import { registerPool } from '../../engine.js';

// ── Dinner depth additions ────────────────────────────────────
registerPool('dinner.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'The meal arrives like weather — course after course, heat rising, her belly swelling warm and forward beneath the tablecloth.',
    'She works through the menu with devotional patience. Each plate leaves her softer in the chair.',
    'Dessert is not a question. It is a continuation of something already underway.',
  ]},
  { when: { stageMin: 3 }, text: [
    'She eats with the focus of someone who has stopped pretending this is casual. Every bite lands.',
    'Portions keep arriving and she keeps accepting them — pleased, unhurried, quietly proud.',
    'The table becomes a stage. Her appetite is the performance.',
  ]},
  { when: {}, text: [
    'The restaurant hums around her appetite. She takes her time. She takes seconds.',
    'Warm light, warm food, the slow pleasure of being fed in public.',
    'She savors without apology. The evening belongs to her hunger.',
  ]},
]);

// ── Feed reaction depth ───────────────────────────────────────
registerPool('feed.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'Fullness spreads through her like a tide — slow, heavy, undeniable. She breathes around it and reaches for more anyway.',
    'Her belly rises with each portion. She does not flinch from the weight of it.',
    'The feed ends and she is still hungry — not for food alone, but for the feeling of being filled.',
  ]},
  { when: { corruptionMin: 50 }, text: [
    'She eats without the old hesitation. Want has become habit. Habit has become identity.',
    'Corruption sits in her posture now — eager, open, grateful for every calorie.',
    'There is no performance left. Only appetite, honest and warm.',
  ]},
  { when: {}, text: [
    'Warmth gathers in her belly. She leans into it.',
    'Each bite lands soft and certain. She exhales satisfaction.',
    'Food does what food does best — she lets it.',
  ]},
]);

// ── Talk depth additions ──────────────────────────────────────
registerPool('talk.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'She talks about food the way other people talk about plans — eagerly, specifically, already leaning toward yes.',
    'Conversation drifts to cravings and stays there. She does not redirect it.',
    'Her voice warms whenever portions come up. You notice. She pretends not to.',
  ]},
  { when: {}, text: [
    'Something in her voice has softened toward appetite. She does not name it. You hear it anyway.',
    'Office hours stretch longer when food is on the table — literally or otherwise.',
    'She laughs easily. Hunger makes her generous.',
  ]},
]);

// ── Weigh-in depth additions ──────────────────────────────────
registerPool('wi.v2.depth', [
  { when: { stageMin: 8 }, text: [
    'The number lands like a bell. Her body does not argue. It has been waiting to be counted.',
    'She reads the scale and smiles — not surprised, not ashamed, simply pleased.',
    'Weight has become vocabulary. She is fluent now.',
  ]},
  { when: { stageMin: 4 }, text: [
    'She watches the scale with the calm of someone who already knows the answer and likes it.',
    'The digits climb. She tracks them with quiet satisfaction.',
    'A new number, a new fact about her body. She accepts it warmly.',
  ]},
  { when: {}, text: [
    'The weigh-in completes. Fullness of data. Warmth of fact.',
    'She steps off the scale unhurried. Growth acknowledged.',
    'Numbers settle into place. So does she.',
  ]},
]);

// ── Session depth additions ───────────────────────────────────
registerPool('session.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'The session stretches. Her belly rises. Time becomes food becomes flesh.',
    'Portions blur together. Fullness becomes the only clock she obeys.',
    'She eats until the room feels smaller around her softness.',
  ]},
  { when: {}, text: [
    'She keeps eating. You keep watching. The room gets warmer.',
    'Private session, public appetite — she surrenders to both.',
    'Every refill finds her ready. Hunger has become hospitality.',
  ]},
]);

// ── Week recap depth ──────────────────────────────────────────
registerPool('weekRecap.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'Another week of settling into abundance. Her body remembers every bite.',
    'Seven days of feeding leave their mark — softer, warmer, more present.',
    'The week closes on a body that has grown into its new habits.',
  ]},
  { when: {}, text: [
    'Growth continues — quiet, warm, certain.',
    'The week ends heavier than it began. She carries the difference easily.',
    'Appetite outlasted intention again. She does not seem to mind.',
  ]},
]);

// ── Milestone depth ───────────────────────────────────────────
registerPool('milestone.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'The threshold crossed is not abstract. You feel it in how the room receives her.',
    'A new size lands like weather — inevitable, warm, reshaping everything around it.',
  ]},
  { when: {}, text: [
    'The ceremony lingers. Growth made visible, made sacred.',
    'She inhabits the new weight before the scale confirms it.',
  ]},
]);

// ── Campus event depth ─────────────────────────────────────────
registerPool('campus.v2.depth', [
  { when: { campusFattening: true }, text: [
    'Campus air tastes of butter and permission. She breathes it in.',
  ]},
  { when: {}, text: [
    'Class ends but appetite does not. The hallway smells like lunch.',
    'Ordinary campus hour — except her hunger is louder than the lecture.',
  ]},
]);

// ── Device use depth ───────────────────────────────────────────
registerPool('device.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'The device hums. Her body answers before her mind catches up.',
  ]},
  { when: {}, text: [
    'Mechanical precision meets organic want. She softens on cue.',
    'Technology and appetite braid together — warm, obedient, hungry.',
  ]},
]);

// ── Intimacy depth ────────────────────────────────────────────
registerPool('intimacy.v2.depth', [
  { when: { stageMin: 6 }, text: [
    'Closeness and appetite braid together — touch, warmth, the particular hunger of being wanted.',
    'She leans into you with the weight of someone who has stopped pretending she does not want this.',
  ]},
  { when: {}, text: [
    'The room narrows to heat and proximity. Food is never far from desire.',
    'Intimacy arrives soft and certain — like fullness, like trust.',
  ]},
]);

// ── Hunger interrupt depth ──────────────────────────────────────
registerPool('hunger.v2.depth', [
  { when: { stageMin: 5 }, text: [
    'Hunger has become a language she speaks without translation.',
    'She arrives already half-fed by want — the rest is yours to provide.',
  ]},
  { when: {}, text: [
    'Appetite knocks at an inconvenient hour. She does not apologize for it.',
    'The interrupt is honest. She needs food. You have food.',
  ]},
]);

// ── Growth event depth ──────────────────────────────────────────
registerPool('growth.v2.depth', [
  { when: { stageMin: 7 }, text: [
    'Growth lands all at once — flesh rearranging, warmth spreading, the body catching up to appetite.',
    'She swells into the moment. Time and calories compress into visible change.',
  ]},
  { when: {}, text: [
    'Something shifts in her measurements. She feels it before the mirror confirms.',
    'Growth continues its quiet work — warm, inevitable, welcome.',
  ]},
]);

// ── Immobility depth ────────────────────────────────────────────
registerPool('immobility.v2.depth', [
  { when: { stageMin: 10 }, text: [
    'She has become geography — vast, warm, settled. Movement is optional. Being fed is not.',
    'The room arranges itself around her stillness. She is the center gravity chose.',
  ]},
  { when: {}, text: [
    'Weight has become a kind of throne. She rests in it easily.',
    'Immobile does not mean unhappy. She glows with being kept.',
  ]},
]);

// ── Weekly event depth ──────────────────────────────────────────
registerPool('weekly.v2.depth', [
  { when: { stagedUp: true }, text: [
    'The week leaves a mark she will not unmake — softer, fuller, more herself.',
  ]},
  { when: {}, text: [
    'Campus life bends around her appetite. She bends with it, gladly.',
    'Another week of becoming. The narrative keeps gaining weight.',
  ]},
]);

// ── Confrontation depth ─────────────────────────────────────────
registerPool('confront.v2.depth', [
  { when: { relationship: [1, 2] }, text: [
    'Tension crackles — but underneath, hunger waits to be negotiated.',
  ]},
  { when: {}, text: [
    'She confronts you with the honesty of someone who knows what she wants.',
    'Conflict and appetite share a room. Neither leaves hungry.',
  ]},
]);

// ── Psych shift depth ───────────────────────────────────────────
registerPool('psych.v2.depth', [
  { when: { corruptionMin: 60 }, text: [
    'The shift is internal first — want reorganizing itself around yes.',
    'She does not fight the new hunger. She feeds it.',
  ]},
  { when: {}, text: [
    'Something loosens in her psychology. Appetite finds more room.',
    'Corruption reads as permission. She accepts the terms.',
  ]},
]);

// ── Eating depth ────────────────────────────────────────────────
registerPool('eating.v2.depth', [
  { when: { stageMin: 5 }, text: ['Each bite lands with the weight of habit — hunger answered, want deepened.'] },
  { when: {}, text: ['The meal unfolds warm and unhurried.', 'Food does what food does best — she lets it.'] },
]);
registerPool('clothing.v2.depth', [
  { when: { stageMin: 4 }, text: ['Fabric surrenders before appetite does — a familiar ceremony.'] },
  { when: {}, text: ['Clothing strains. Growth wins the argument again.'] },
]);
registerPool('memory.v2.depth', [
  { when: {}, text: ['History sits in her posture — meals remembered, thresholds crossed.'] },
]);
registerPool('settling.v2.depth', [
  { when: { stageMin: 10 }, text: ['The settling is not an ending. It is a deeper kind of arrival.'] },
  { when: {}, text: ['She rests into abundance. The room learns her shape.'] },
]);
registerPool('origin.v2.depth', [
  { when: { stageMax: 3 }, text: ['Old stories flavor the appetite — backstory bleeding into the plate.'] },
  { when: {}, text: ['Where she came from still speaks in how she eats.'] },
]);
registerPool('ascension.v2.depth', [
  { when: { stageMin: 8 }, text: ['Ascension reads as myth made flesh — vast, warm, chosen.'] },
  { when: {}, text: ['Something sacred settles over the moment. Growth as ceremony.'] },
]);
registerPool('lab.v2.depth', [
  { when: {}, text: ['Precision and appetite share the bench — engineering as foreplay to mass.'] },
]);
registerPool('forceFeed.v2.depth', [
  { when: {}, text: ['The mask hums. Fullness arrives on schedule — mechanical, relentless, warm.'] },
]);
registerPool('feedVoice.v2.depth', [
  { when: { corruptionMin: 40 }, text: ['Want speaks from inside her — no longer ashamed to be heard.'] },
  { when: {}, text: ['Hunger has a voice now. It sounds like her.'] },
]);
registerPool('cultivator.v2.depth', [
  { when: {}, text: ['The cultivator cycle turns — suspicion, appetite, harvest, again.'] },
]);
registerPool('hunt.v2.depth', [
  { when: {}, text: ['Predator and prey blur. Appetite hunts in both directions.'] },
]);
registerPool('roster.v2.depth', [
  { when: {}, text: ['She reads differently at a glance now — softer, fuller, unmistakable.'] },
]);
registerPool('scrutiny.v2.depth', [
  { when: {}, text: ['Institutional eyes narrow. Growth has consequences beyond the scale.'] },
]);
registerPool('discontent.v2.depth', [
  { when: {}, text: ['Anger and appetite wrestle. Neither has left the room.'] },
]);
registerPool('campusNav.v2.depth', [
  { when: {}, text: ['Campus air tastes of butter and permission.'] },
]);
registerPool('earlyGain.v2.depth', [
  { when: { stageMax: 3 }, text: ['Early softness arrives like a secret she has not named yet.'] },
  { when: {}, text: ['The first pounds feel theoretical until they do not.'] },
]);
registerPool('evolved.v2.depth', [
  { when: {}, text: ['Her evolved path amplifies everything — appetite as identity, identity as spectacle.'] },
]);
registerPool('spirit.v2.depth', [
  { when: { stageMin: 5 }, text: ['The spirit moves through her like warmth finding a home she has been building all semester.'] },
  { when: {}, text: ['Possession feels less like theft and more like collaboration.'] },
]);
registerPool('ritual.v2.depth', [
  { when: {}, text: ['Ceremony amplifies appetite — every bite consecrated, every belly an altar.'] },
]);
registerPool('dream.v2.depth', [
  { when: {}, text: ['The dream lingers at the edges of waking — hunger translated into symbol.'] },
]);

// ── Body portrait v2 sensory layer ────────────────────────────
registerPool('body.v2.sensory', [
  { when: { stageMin: 9 }, text: [
    'Warmth radiates from her in layers — belly, thighs, the soft architecture of a body that has become environment.',
    'She occupies space the way weather does — present, enveloping, impossible to ignore.',
  ]},
  { when: { stageMin: 5 }, text: [
    'She moves with the particular rhythm of added weight — slower, softer, more present in every step.',
    'Softness announces itself at every angle. Growth written in flesh.',
  ]},
  { when: {}, text: [
    'Softness visible at every angle. Growth written in flesh.',
    'Her body speaks before she does — warm, round, newly abundant.',
    'The eye finds her curves and stays.',
  ]},
]);
