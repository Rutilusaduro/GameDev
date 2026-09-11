// CG group-chat templates — pools for Priya posts, follow-ups, resident replies.
import { registerDimension, registerPool, render } from '../../engine.js';
import { registerDecomposedPool } from '../decomposePools.js';
import { CG_FILLED_CHAT_TEMPLATES } from '../../../gameData/competitiveGainerText.js';
import { CG_CHAT_TEMPLATES } from '../../../gameData/evolvedForms.js';
import { cgChatTailBeat } from '../evolved/proseTails.js';
import { CG_RESIDENT_REPLY_ALTS } from './cgChatResidentAlts.js';
import { priyaFollowupAltLines, priyaPostAltLines } from './cgChatPriyaAlts.js';
import { legacyBridgeWhen, lintWildcardVariant } from '../legacyPoolPolicy.js';

function legacySlot(bodyKey, fallback) {
  return (ctx) => {
    const line = render(`{${bodyKey}}`, ctx)?.trim();
    return line && !line.includes('{unresolved}') ? line : fallback;
  };
}

function registerCgProsePool(poolKey, prose, extras = [], whenRows = []) {
  const text = (prose || '').trim();
  if (!text) return;
  const bodyKey = `${poolKey}.legacyBody`;
  registerDecomposedPool(bodyKey, text);
  const core = [legacySlot(bodyKey, text), ...extras];
  const rows = whenRows.length
    ? whenRows
    : [{ when: legacyBridgeWhen(), text: core }];
  rows.push(lintWildcardVariant('{cg.chat.boardTone|prefix:} {cg.chat.residentReply|prefix: }'));
  registerPool(poolKey, rows);
}

registerDimension('cgChatKind', (ctx) => ctx.globals?.cgChatKind ?? 'post');
registerDimension('cgFollowupKey', (ctx) => ctx.globals?.cgFollowupKey ?? 'leading');
registerDimension('cgResidentReply', (ctx) => ctx.globals?.cgResidentReply ?? 'behind');
registerDimension('cgResidentName', (ctx) => ctx.globals?.cgResidentName ?? 'Brittany');

for (const [stageKey, tierMap] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaPost || {})) {
  for (const [tier, prose] of Object.entries(tierMap)) {
    const poolKey = `cg.chat.priyaPost.${stageKey}.${tier}`;
    const alts = priyaPostAltLines(stageKey, tier);
    registerCgProsePool(poolKey, prose, alts, [
      {
        when: legacyBridgeWhen({ cgStageKey: [stageKey], cgDriveTier: [tier], cgChatKind: ['post'] }),
        weight: 2,
        text: [
          legacySlot(`${poolKey}.legacyBody`, prose.trim()),
          ...alts,
          cgChatTailBeat(`post:${stageKey}`, 0),
          cgChatTailBeat(`post:${stageKey}`, 1),
        ],
      },
      {
        when: legacyBridgeWhen(),
        text: [
          legacySlot(`${poolKey}.legacyBody`, prose.trim()),
          ...alts,
          cgChatTailBeat(`post:${stageKey}`, 2),
        ],
      },
    ]);
  }
}

for (const [fkey, tierMap] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaFollowup || {})) {
  for (const [tier, prose] of Object.entries(tierMap)) {
    const poolKey = `cg.chat.priyaFollowup.${fkey}.${tier}`;
    const alts = priyaFollowupAltLines(fkey, tier);
    registerCgProsePool(poolKey, prose, alts, [
      {
        when: legacyBridgeWhen({ cgFollowupKey: [fkey], cgDriveTier: [tier], cgChatKind: ['followup'] }),
        weight: 2,
        text: [
          legacySlot(`${poolKey}.legacyBody`, prose.trim()),
          ...alts,
          cgChatTailBeat(`fu:${fkey}`, 0),
          cgChatTailBeat(`fu:${fkey}`, 1),
        ],
      },
      { when: legacyBridgeWhen(), text: [legacySlot(`${poolKey}.legacyBody`, prose.trim()), ...alts] },
    ]);
  }
}

for (const [name, replies] of Object.entries(CG_CHAT_TEMPLATES.residents || {})) {
  const safeName = name.replace(/\s+/g, '_');
  for (const [replyType, line] of Object.entries(replies)) {
    if (!line || typeof line !== 'string') continue;
    const poolKey = `cg.chat.resident.${safeName}.${replyType}`;
    const alts = CG_RESIDENT_REPLY_ALTS[safeName]?.[replyType] || [];
    registerCgProsePool(poolKey, line, alts, [
      {
        when: legacyBridgeWhen({ cgResidentName: [safeName, name], cgResidentReply: [replyType] }),
        weight: 2,
        text: [
          legacySlot(`${poolKey}.legacyBody`, line.trim()),
          ...alts,
          cgChatTailBeat(`res:${safeName}:${replyType}`, 0),
        ],
      },
      { when: legacyBridgeWhen(), text: [legacySlot(`${poolKey}.legacyBody`, line.trim()), ...alts] },
    ]);
  }
}
