// ═══════════════════════════════════════════════════════════════
// DINNER ENDING — fragment bands (stage × fullness)
// ═══════════════════════════════════════════════════════════════

export const DINNER_END_OPEN = [
  { stageMin: 0, stageMax: 2, fullnessMax: 1.0, texts: [
    'The bill arrives while {subject.name} is still looking at the dessert menu.',
    '"I\'m actually full," she says — surprised even as she says it.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    'Mid-dessert, {subject.name} sets her spoon down, looks at what\'s left, and picks it back up.',
    'She finishes it and goes quiet, doing an internal accounting she hadn\'t expected.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    'She goes quiet around the second-to-last dish — resources redirected inward.',
    'She finishes anyway. Hands flat on the table. A long breath.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.601, texts: [
    'She couldn\'t stop. Each dish arrived and she ate it.',
    'When the next came, she ate that too — excellent food, excellent evening, no choice left.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMax: 1.0, texts: [
    '{subject.name} leans back with easy satisfaction. The plates are cleared.',
    'She is full the way someone who knows how to be full — settled, not fighting it.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    '{subject.name} pauses, registers something, and continues eating.',
    'The pause is the tell; the continuing is the answer: noted, irrelevant.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    'She orders the last dish with full intention — already full when it arrives, fuller when it\'s gone.',
    'The restaurant quiets around your table. She has no intention of moving yet.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.601, texts: [
    'She stopped only when nothing remained in front of her.',
    'Both hands on her belly — rounder tonight, more present. "That got away from me a little."',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMax: 1.0, texts: [
    'The table clears around {subject.name}. She doesn\'t move much, but she\'s pleased.',
    'She sits fully, completely — substantial, warm, exactly where she means to be.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    '{subject.name} says "I\'m full" with interest, not alarm.',
    'Both hands on her belly. She is happy in the slow, heavy way of someone at home in her body.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    'She\'s beyond her usual capacity tonight — a personal record, quietly celebrated.',
    'Her belly is round and warm; both hands rest on it like they\'ve come home.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.601, texts: [
    'She found a ceiling tonight she didn\'t know existed.',
    'Enormous belly against the table edge. The room goes quiet around her.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMax: 1.0, texts: [
    '{subject.name} surveys the cleared table with practiced authority.',
    'For her, this fullness is a comfortable middle — familiar, agreeable, earned.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    'Genuinely full — which, at her scale, is less common than you\'d think.',
    'Both hands on her immense belly. "Perfect," she says — food, evening, everything.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    'She exceeded her considerable capacity — rare, clarifying, not distressing.',
    'Staff give her wide berth. The chair holds. The evening waits with her.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.601, texts: [
    'Past vocabulary now. {subject.name} sits absolutely still, belly vast past the table edge.',
    'She breathes slowly — standing not yet attempted. Eventually she smiles at you.',
  ]},
];

export const DINNER_END_CLOSE = [
  { stageMin: 0, stageMax: 2, fullnessMax: 1.0, texts: [
    'One hand rests on her stomach — a new gesture she doesn\'t notice.',
    'She texts later: portions were exactly right; she fell asleep immediately.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    '"I ate a lot," she says eventually. This appears to surprise her.',
    'She texts on the way home: very full — news that needed delivering.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    '"I need to not move for a minute," {subject.name} says — and doesn\'t.',
    'From the taxi: she would absolutely do this again.',
  ]},
  { stageMin: 0, stageMax: 2, fullnessMin: 1.601, texts: [
    '"I don\'t regret any of it," she says — clearly true.',
    'Morning text: pasta worth every bite; book again next week.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMax: 1.0, texts: [
    'She stopped noticing fullness and started noticing empty plates. Tonight they coincide.',
    'The check arrives. She waves at the plates with something like affection.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    'She sinks deeper into the chair and doesn\'t return to her original height.',
    'Outside she breathes deeply. "Good choice," she says.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    'Palms on her stomach. "I\'m," she starts, then doesn\'t finish — the word inadequate.',
    'Voice message from home: lying flat, extremely happy, definitely going back.',
  ]},
  { stageMin: 3, stageMax: 5, fullnessMin: 1.601, texts: [
    'Delivered with complete composure. She means: perfect. She means: again.',
    'She moves slowly to the door, smiling, tipping generously.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMax: 1.0, texts: [
    'She looks at you warmer than the plates. "This was good," she says — understatement.',
    'She reaches for the last piece of bread anyway.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    '"Good dinner," she says. High praise. The highest.',
    'The walk out is slower than the walk in. She doesn\'t mention it.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    '"That was a meal," {subject.name} says, voice slower than usual.',
    'She doesn\'t try to stand for another fifteen minutes.',
  ]},
  { stageMin: 6, stageMax: 7, fullnessMin: 1.601, texts: [
    '"Well," she says. Very full. Extremely pleased. Coming back.',
    'She smiles the entire slow way to the door.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMax: 1.0, texts: [
    'She orders more water. Does not hurry to leave.',
    '"Same time next week," she says — no irony in it.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.001, fullnessMax: 1.3, texts: [
    'Everything exactly as it should be.',
    'She orders dessert to take home.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.301, fullnessMax: 1.6, texts: [
    '"Help me up," she says eventually. You do.',
    'Outside the air is cool. She breathes it in, happy.',
  ]},
  { stageMin: 8, stageMax: 11, fullnessMin: 1.601, texts: [
    '"Well done," she says — the highest compliment she gives.',
    'The restaurant has emptied. She is the still center of it.',
  ]},
];
