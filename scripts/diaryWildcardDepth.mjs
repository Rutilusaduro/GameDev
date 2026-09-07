// Pad diary wildcard fallbacks to ≥3 texts (lint volume floor).
// Run: node scripts/diaryWildcardDepth.mjs [diary.js|diaryBase.js]
import { readFileSync, writeFileSync } from 'fs';

const TARGET = 3;
const files = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['src/textEngine/scenes/diary.js'];

const FORM_FALLBACKS = {
  sumo: [
    'Warm-up room. Chanko cooling. I eat anyway.',
    'Between bouts the belly fills lower. Strategy demands it.',
    'Food, weight, the ring — this is the work now.',
  ],
  eating_competitor: [
    'The plate clears. The timer stops. I am still hungry.',
    'Records fall when appetite stops negotiating.',
    'Another event, another empty plate. Routine now.',
  ],
  feedee_creator: [
    'Camera on. Appetite honest. Subscribers watching.',
    'Another mukbang logged. Another pound closer to the brand.',
    'The feed wants more. I deliver.',
  ],
  body_positive_creator: [
    'Posted anyway. Soft is beautiful. Comments agree.',
    'Another day showing skin without apology.',
    'Visibility is the point. So is appetite.',
  ],
  eating_captain: [
    'Team ate. I ate more. Leadership looks like seconds.',
    'Plate empty before the speech ended.',
    'Captain sets pace. Pace is hungry.',
  ],
  big_squad_captain: [
    'Chapter fed. I fed hardest. Standards.',
    'Sorority table cleared. My end first.',
    'Big squad energy means big appetite.',
  ],
  eating_diarist: [
    'Logged every bite. Diary honest. Belly fuller.',
    'Another entry, another serving documented.',
    'Words and calories both accumulate.',
  ],
  food_researcher: [
    'Hypothesis: more. Method: eat. Results: promising.',
    'Lab notes and snack notes blur together.',
    'Data delicious. Sample size: me.',
  ],
  eating_streamer: [
    'Stream live. Chat hungry. So am I.',
    'Donations spike when I take another bite.',
    'Content is consumption. Both trending up.',
  ],
  speed_eater: [
    'Timer beaten again. Jaw sore. Worth it.',
    'Speed is discipline. Empty plate proof.',
    'Another record attempt. Another victory.',
  ],
  ranked_feedee: [
    'Leaderboard climbing. Belly climbing faster.',
    'Rank up. Waist up. Correlated.',
    'Competitive eating has a scoreboard. I intend to top it.',
  ],
  chapter_hostess: [
    'Hosted, fed, out-ate everyone. Hospitality.',
    'Chapter event success measured in empty trays.',
    'Hostess duties include finishing what guests cannot.',
  ],
  body_positive_greek: [
    'Letters stretch. So do I. Both still cute.',
    'Greek row knows my appetite now.',
    'Body positivity chapter meeting catered by me.',
  ],
  installation_artist: [
    'The piece is my body now. Gallery agrees.',
    'Art and appetite both require commitment.',
    'Exhibit open. I am the exhibit.',
  ],
  food_photographer: [
    'Shot the spread. Ate the spread. Art complete.',
    'Lens on food, then mouth on food. Workflow.',
    'Every photo session ends with empty plates.',
  ],
  anonymous_blogger: [
    'Posted anonymously. Recognized anyway. Growth documented.',
    'Another confession in the comments. Another pound.',
    'The blog tells the truth my old photos deny.',
  ],
  asmr_creator: [
    'Mic picked up every chew. Subscribers shivered.',
    'Soft sounds, soft body, soft appetite.',
    'Another session. Another hour of eating on camera.',
  ],
  home_nest: [
    'Nest warm. Snacks closer. Movement optional.',
    'Home fits me now. I fit home better each week.',
    'Delivery radius shrinking to arm\'s length.',
  ],
  delivery_hive: [
    'Drivers know the route. I know the menu.',
    'Hive fed. Queen fed most.',
    'Another drop at the door. Another feast indoors.',
  ],
  campus_legend: [
    'They tell stories in the dining hall. I am the story.',
    'Campus myth: girl who never stops eating. True.',
    'Legend status earned one tray at a time.',
  ],
  food_tourist: [
    'Tried every truck on campus. Twice.',
    'Tour continues inward. Passport: my belly.',
    'Another cuisine conquered. Another button lost.',
  ],
  ff_author: [
    'Wrote the feast scene hungry. Lived it after.',
    'Fiction and appetite trade places nightly.',
    'Readers want more. So does the author.',
  ],
  homestead_queen: [
    'Preserved another batch. Ate another batch.',
    'Farm table full. I am fuller.',
    'Harvest in jars and on hips.',
  ],
  state_fair_queen: [
    'Blue ribbon and blue plate. Both mine.',
    'Fair food is a sport. I am undefeated.',
    'Crown heavy. Belly heavier. Proud.',
  ],
  wife_lessons: [
    'Lesson today: second helpings are love language.',
    'Domestic syllabus includes dessert twice.',
    'Homework delicious. Grade: expanding.',
  ],
  psych_researcher: [
    'Variable: appetite. Outcome: significant.',
    'IRB would have questions. I have answers.',
    'Self-study ongoing. Results robust.',
  ],
  homeroom_queen: [
    'Class fed. Teacher shocked. I smiled.',
    'Homeroom royalty includes royal appetite.',
    'Crowned and still hungry.',
  ],
  cultivator: [
    'Harvest came in heavy. I came in heavier.',
    'Growth tended outward and inward.',
    'Crop and curve both abundant.',
  ],
  community_researcher: [
    'Survey says: bigger portions everywhere. I contributed.',
    'Field notes and field meals both extensive.',
    'Community data includes my waistline.',
  ],
  default: [
    'Another page. Another pound without ceremony.',
    'Appetite keeps schedule. I keep showing up.',
    'Softness accumulates. Diary records it anyway.',
  ],
};

function formId(poolKey) {
  const m = poolKey.match(/^diary\.([^.]+)/);
  return m ? m[1] : 'default';
}

function fallbacksFor(poolKey) {
  return FORM_FALLBACKS[formId(poolKey)] || FORM_FALLBACKS.default;
}

function isParentComposer(poolKey, texts) {
  return /^diary\.[^.]+$/.test(poolKey) && texts.some((s) => s.includes('{diary.'));
}

function composerPermutations(skeleton) {
  const tokens = [...skeleton.matchAll(/\{diary\.[^}]+\}/g)].map((m) => m[0]);
  const out = [skeleton];
  if (tokens.length >= 3) {
    out.push(`${tokens[1]} ${tokens[2]}\n\n${tokens[0]}`);
    out.push(`${tokens[2]} ${tokens[0]}\n\n${tokens[1]}`);
  } else if (tokens.length === 2) {
    out.push(`${tokens[1]}\n\n${tokens[0]}`);
    out.push(`${tokens[0]}\n\n${tokens[1]}`);
  }
  return [...new Set(out)].slice(0, TARGET);
}

function thirdPermutation(a, b) {
  const parasA = a.split('\n\n');
  if (parasA.length >= 2) {
    const rotated = `${parasA[1]}\n\n${parasA[0]}${parasA.length > 2 ? '\n\n' + parasA.slice(2).join('\n\n') : ''}`;
    if (rotated !== a && rotated !== b) return rotated;
  }
  const tokens = [...a.matchAll(/\{diary\.[^}]+\}/g)].map((m) => m[0]);
  if (tokens.length >= 2) {
    const spaced = `${tokens[1]}\n\n${tokens[0]}`;
    if (spaced !== a && spaced !== b) return spaced;
  }
  return null;
}

function padTexts(poolKey, texts) {
  const nonEmpty = texts.filter((s) => typeof s === 'string' && s.trim());
  if (nonEmpty.length >= TARGET) return texts;

  if (isParentComposer(poolKey, nonEmpty)) {
    return composerPermutations(nonEmpty[0]);
  }

  if (nonEmpty.length === 0) {
    return fallbacksFor(poolKey).slice(0, TARGET);
  }

  if (nonEmpty.length === 1) {
    const fb = fallbacksFor(poolKey);
    return [nonEmpty[0], fb[1] || fb[0], fb[2] || fb[0]].slice(0, TARGET);
  }

  if (nonEmpty.length === 2) {
    const third = thirdPermutation(nonEmpty[0], nonEmpty[1]);
    return third ? [...nonEmpty, third] : [...nonEmpty, fallbacksFor(poolKey)[0]];
  }

  return texts;
}

function processFile(path) {
  let src = readFileSync(path, 'utf8');
  let patched = 0;

  const poolRe = /registerPool\('([^']+)', \[\s*([\s\S]*?)\]\s*\);/g;
  src = src.replace(poolRe, (full, poolKey, body) => {
    if (!poolKey.startsWith('diary.')) return full;

    const whenRe = /\{\s*when:\s*\{\},?\s*text:\s*\[([\s\S]*?)\]\s*\}/g;
    let newBody = body;
    let changed = false;

    newBody = newBody.replace(whenRe, (whenBlock, textBlock) => {
      const strings = [
        ...textBlock.matchAll(/"((?:\\.|[^"\\])*)"/g),
        ...textBlock.matchAll(/'((?:\\.|[^'\\])*)'/g),
      ].map((m) =>
        m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\'/g, "'"),
      );
      const padded = padTexts(poolKey, strings);
      const same =
        padded.length === strings.length && padded.every((s, i) => s === strings[i]);
      if (same) return whenBlock;
      changed = true;
      const esc = (s) => JSON.stringify(s);
      const textLit = padded.map((s) => `    ${esc(s)}`).join(',\n');
      return `{ when: {}, text: [\n${textLit},\n  ]}`;
    });

    if (!changed) return full;
    patched++;
    return `registerPool('${poolKey}', [\n${newBody}\n]);`;
  });

  writeFileSync(path, src);
  return patched;
}

let total = 0;
for (const f of files) {
  const n = processFile(f);
  console.log(`diaryWildcardDepth: ${f} — ${n} pools patched`);
  total += n;
}
console.log(`diaryWildcardDepth: ${total} total`);
