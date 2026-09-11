// CG group-chat templates — pools for Priya posts, follow-ups, resident replies.
import { registerDimension, registerPool, render } from '../../engine.js';
import { CG_FILLED_CHAT_TEMPLATES } from '../../../gameData/competitiveGainerText.js';
import { CG_CHAT_TEMPLATES } from '../../../gameData/evolvedForms.js';
import { cgChatTailBeat } from '../evolved/proseTails.js';

registerDimension('cgChatKind', (ctx) => ctx.globals?.cgChatKind ?? 'post');
registerDimension('cgFollowupKey', (ctx) => ctx.globals?.cgFollowupKey ?? 'leading');
registerDimension('cgResidentReply', (ctx) => ctx.globals?.cgResidentReply ?? 'behind');
registerDimension('cgResidentName', (ctx) => ctx.globals?.cgResidentName ?? 'Brittany');

for (const [stageKey, tierMap] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaPost || {})) {
  for (const [tier, prose] of Object.entries(tierMap)) {
    const poolKey = `cg.chat.priyaPost.${stageKey}.${tier}`;
    registerPool(poolKey, [
      {
        when: { cgStageKey: [stageKey], cgDriveTier: [tier], cgChatKind: ['post'] },
        weight: 2,
        text: [prose, cgChatTailBeat(`post:${stageKey}`, 0), cgChatTailBeat(`post:${stageKey}`, 1)],
      },
      { when: {}, text: [prose, cgChatTailBeat(`post:${stageKey}`, 2)] },
    ]);
  }
}

for (const [fkey, tierMap] of Object.entries(CG_FILLED_CHAT_TEMPLATES.priyaFollowup || {})) {
  for (const [tier, prose] of Object.entries(tierMap)) {
    const poolKey = `cg.chat.priyaFollowup.${fkey}.${tier}`;
    registerPool(poolKey, [
      {
        when: { cgFollowupKey: [fkey], cgDriveTier: [tier], cgChatKind: ['followup'] },
        weight: 2,
        text: [prose, cgChatTailBeat(`fu:${fkey}`, 0), cgChatTailBeat(`fu:${fkey}`, 1)],
      },
      { when: {}, text: [prose] },
    ]);
  }
}

for (const [name, replies] of Object.entries(CG_CHAT_TEMPLATES.residents || {})) {
  const safeName = name.replace(/\s+/g, '_');
  for (const [replyType, line] of Object.entries(replies)) {
    if (!line || typeof line !== 'string') continue;
    const poolKey = `cg.chat.resident.${safeName}.${replyType}`;
    registerPool(poolKey, [
      {
        when: { cgResidentName: [safeName, name], cgResidentReply: [replyType] },
        weight: 2,
        text: [line, cgChatTailBeat(`res:${safeName}:${replyType}`, 0)],
      },
      { when: {}, text: [line] },
    ]);
  }
}
