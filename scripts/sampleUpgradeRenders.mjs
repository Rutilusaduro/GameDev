import '../src/textEngine/scenes/index.js';
import { createContext, render } from '../src/textEngine/engine.js';

const girls = [
  { id: 8, name: 'Maya', first: 'Maya', weight: 140, bodyType: 'pear', archetype: 'quiet', mood: 'observant', corruption: 0 },
  { id: 2, name: 'Kylie', first: 'Kylie', weight: 260, bodyType: 'hourglass', archetype: 'influencer', mood: 'excited', corruption: 1 },
  { id: 10, name: 'Reneé', first: 'Reneé', weight: 420, bodyType: 'rotund', archetype: 'culinary', mood: 'content', corruption: 2 },
];

function stub(s) {
  return {
    ...s,
    fullness: 0.7,
    stomachCapacity: 1,
    hunger: s.corruption >= 2 ? 3 : 1,
    relationship: s.corruption,
    clothingFit: { top: 'snug', bottom: 'straining', waist: 'straining' },
  };
}

const tpls = [
  '{body.portrait.depth}',
  '{wi.arrival}',
  '{eat.scene}',
  '{talk.moodOpener}',
  '{cloth.discovery} {cloth.reaction}',
  '{campus.localeIntro} {campus.moveSentence}',
];

for (const g of girls) {
  const ctx = createContext({ subject: stub(g), week: 6, season: 'fall' });
  console.log(`\n=== ${g.name} ${g.weight}lb cor${g.corruption} ===`);
  for (const t of tpls) {
    const out = render(t, ctx);
    console.log(`\n[${t}]\n${out.slice(0, 280)}`);
  }
}
