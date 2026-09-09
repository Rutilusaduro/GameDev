// The Squad — Lead: A1 Mobile | Support: A5 Editor
// V2.0 feast ritual depth layer
import { registerPool } from '../../../engine.js';

registerPool('ritual.communion_snack.depth', [
  { when: { stageMin: 6 }, text: [
    'Shared plate, shared heat — fingers brushing crumbs from each other\'s lips. Intimacy measured in bites neither pretends are casual.',
    'Two bellies swell toward each other. The snack becomes communion. Fullness becomes trust.',
  ]},
  { when: { stageMin: 2 }, text: [
    'A modest plate between them — still enough to blush over, still enough to bind.',
    'They eat close. The room narrows to chewing, warmth, the pleasure of being watched while watching back.',
  ]},
  { when: {}, text: [
    'Communion in miniature — shared food, shared appetite, the first ritual of many.',
  ]},
]);

registerPool('ritual.class_banquet.depth', [
  { when: { stageMin: 8 }, text: [
    'Courses stack like architecture — soup, bread, mains, desserts refusing refusal. The class eats with ceremonial hunger.',
    'Banquet scale: many bellies, one rhythm, competitive undertones softening into collective surrender.',
  ]},
  { when: { stageMin: 4 }, text: [
    'Plates circulate. Laughter between bites. Appetite formalized into something the room can applaud.',
    'Four or more at the table — each girl feeding the spectacle as much as the food feeds her.',
  ]},
  { when: {}, text: [
    'The banquet unfolds — heat, chewing, the slow conversion of dinner into doctrine.',
  ]},
]);

registerPool('ritual.sacred_gluttony.depth', [
  { when: { stageMin: 9 }, text: [
    'Floor feast at monumental scale — candles, chanting optional, bellies vast and rising like tide.',
    'The spirit drinks the room. Six mouths, one ceremony, fullness elevated to liturgy.',
  ]},
  { when: { stageMin: 5 }, text: [
    'Platters like altars. They eat with devotional focus — each swallow consecrated, each belly an offering.',
    'Ceremony and appetite merge. The class worships at the table and leaves heavier in body and spirit.',
  ]},
  { when: {}, text: [
    'Floor feast: restraint abandoned, food blessed by hunger, the spirit sated on spectacle.',
  ]},
]);

registerPool('ritual.leviathan_vigil.depth', [
  { when: { stageMin: 10 }, text: [
    'Bedside feasts for geography made flesh — food carried like tribute to immobile altars.',
    'She cannot rise. The world feeds her anyway. Every bite lands like a prayer answered in warmth.',
  ]},
  { when: { stageMin: 7 }, text: [
    'Vigil at the edge of immobility — plates brought to bodies too vast to travel, fullness served horizontal.',
    'The room arranges itself around her stillness. Food comes to the mountain.',
  ]},
  { when: {}, text: [
    'Leviathan vigil — bedside ceremony for bodies that have outgrown ordinary chairs.',
  ]},
]);

registerPool('ritual.generic.depth', [
  { when: {}, text: [
    'The ritual lingers after the plates empty — warmth, fullness, the spirit pleased.',
    'Ceremony complete. Bellies remember. Appetite consecrated.',
  ]},
]);
