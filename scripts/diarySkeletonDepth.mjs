// Add 3rd skeleton permutation to diary stage pools with only 2 wildcard texts.
// Run: node scripts/diarySkeletonDepth.mjs
import { readFileSync, writeFileSync } from 'fs';

const PATH = 'src/textEngine/scenes/diaryPhaseD.js';
let src = readFileSync(PATH, 'utf8');

const FORMS = ['competitive_gainer', 'machine_goddess', 'salon_appetit', 'artisan_gallery', 'pharmacist'];

for (const form of FORMS) {
  const re = new RegExp(
    `(registerPool\\('diary\\.${form}', \\[\\n(?:[\\s\\S]*?))  \\{ when: \\{\\}, text: \\['\\{diary\\.${form}\\.s5\\}'\\] \\}\\n\\]\\);`,
  );
  src = src.replace(re, `$1  { when: {}, text: ['{diary.${form}.s5}', '{diary.${form}.s7}', '{diary.${form}.s9}'] }\n]);`);
}

function thirdPermutation(a, b) {
  const parasA = a.split('\n\n');
  if (parasA.length >= 3) {
    const rotated = [parasA[1], parasA[2], parasA[0], ...parasA.slice(3)].join('\n\n');
    if (rotated !== a && rotated !== b) return rotated;
    const alt = [parasA[2], parasA[0], parasA[1], ...parasA.slice(3)].join('\n\n');
    if (alt !== a && alt !== b) return alt;
  }
  if (parasA.length === 2) {
    const rotated = `${parasA[1]}\n\n${parasA[0]}`;
    if (rotated !== a && rotated !== b) return rotated;
  }
  const tokens = [...a.matchAll(/\{diary\.[^}]+\}/g)].map((m) => m[0]);
  if (tokens.length >= 3) {
    const rotated = `${tokens[1]} ${tokens[2]}\n\n${tokens[0]} ${tokens.slice(3).join(' ')}`.trim();
    if (rotated !== a && rotated !== b) return rotated;
  }
  if (tokens.length === 2) {
    const spaced = `${tokens[0]}\n\n${tokens[1]}`;
    if (spaced !== a && spaced !== b) return spaced;
  }
  return `${a}\n\n${b.split('\n\n')[0]}`;
}

const poolRe = /registerPool\('([^']+)',\s*\[\s*\{\s*when:\s*\{\},\s*text:\s*\[([\s\S]*?)\]\s*\},?\s*\]\s*\);/g;

let patched = 0;
src = src.replace(poolRe, (full, poolKey, textBlock) => {
  if (!poolKey.startsWith('diary.')) return full;
  if (poolKey.endsWith('._f' + poolKey.match(/_f(\d+)$/)?.[1])) return full;
  const strings = [...textBlock.matchAll(/"((?:\\.|[^"\\])*)"/g)].map((m) =>
    m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"'),
  );
  if (strings.length !== 2) return full;
  if (!strings[0].includes('{diary.')) return full;
  const third = thirdPermutation(strings[0], strings[1]);
  if (third === strings[0] || third === strings[1]) return full;
  const esc = (s) =>
    JSON.stringify(s);
  patched++;
  return `registerPool('${poolKey}', [\n  { when: {}, text: [\n    ${esc(strings[0])},\n    ${esc(strings[1])},\n    ${esc(third)},\n  ]},\n]);`;
});

writeFileSync(PATH, src);
console.log(`diarySkeletonDepth: patched ${patched} pools`);
