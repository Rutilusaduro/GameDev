import { PARTS } from '../gameData/labParts.js';
import { formatMoney } from '../gameData/wallet.js';

const OK = '#8090a8';
const SHORT = '#e05040';

export function analyzeRecipeAffordance(recipe, labState, money = 0, taliaLbs = Infinity) {
  const pool = labState?.parts || {};
  const lines = [];
  let canAfford = true;

  for (const [partId, need] of Object.entries(recipe?.parts || {})) {
    const have = pool[partId] || 0;
    const short = have < need;
    if (short) canAfford = false;
    lines.push({
      key: partId,
      label: `${PARTS[partId]?.icon || partId}×${need}`,
      have,
      need,
      short,
      type: 'part',
    });
  }

  const moneyNeed = recipe?.money ?? 0;
  if (moneyNeed > 0) {
    const short = (money ?? 0) < moneyNeed;
    if (short) canAfford = false;
    lines.push({
      key: 'money',
      label: formatMoney(moneyNeed),
      have: money ?? 0,
      need: moneyNeed,
      short,
      type: 'money',
    });
  }

  const weightNeed = recipe?.weightCost ?? 0;
  if (weightNeed > 0) {
    const short = taliaLbs < weightNeed;
    if (short) canAfford = false;
    lines.push({
      key: 'talia_lbs',
      label: `−${weightNeed} lbs Talia`,
      have: Math.round(taliaLbs),
      need: weightNeed,
      short,
      type: 'weight',
    });
  }

  return { lines, canAfford };
}

export function RecipeCostDisplay({ recipe, labState, money, taliaLbs }) {
  const { lines } = analyzeRecipeAffordance(recipe, labState, money, taliaLbs);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px', fontSize: 9, lineHeight: 1.5, marginBottom: 8 }}>
      {lines.map(line => (
        <span
          key={line.key}
          title={line.short ? `Have ${line.have}, need ${line.need}` : undefined}
          style={{ color: line.short ? SHORT : OK, fontWeight: line.short ? 600 : 400 }}
        >
          {line.label}
          {line.short && line.type === 'part' && (
            <span style={{ opacity: 0.85 }}> ({line.have}/{line.need})</span>
          )}
        </span>
      ))}
    </div>
  );
}
