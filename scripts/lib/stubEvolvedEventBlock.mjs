/** Shared codegen for evolved branching event stubs (step 6). */

export function stubPhase(formId, stageIdx, phaseIdx) {
  return `(h,s)=>\`${formId} s${stageIdx}p${phaseIdx} bridge — \${Math.round(s.lbs)} lbs on the log. Modular evolved.scene @ week 20+.\``;
}

export function stubChoiceResult(formId, choiceId) {
  return `Choice ${choiceId} (${formId}) — flag logged; evolved.choice slots own the beat @ week 20+.`;
}

export function stubEndingText(formId, endingIdx) {
  return `(h,s,gain)=>\`${formId} ending ${endingIdx} bridge — modular evolved.ending @ week 20+.\``;
}

function emitChoice(ch, formId) {
  const parts = [
    `id:"${ch.id}"`,
    `label:${JSON.stringify(ch.label)}`,
    `result:${JSON.stringify(stubChoiceResult(formId, ch.id))}`,
  ];
  for (const key of ['lbs', 'rel', 'flag', 'drive', 'corruption', 'startsStream']) {
    if (ch[key] != null) parts.push(`${key}:${typeof ch[key] === 'string' ? JSON.stringify(ch[key]) : ch[key]}`);
  }
  return `{${parts.join(',')}}`;
}

function emitEnding(end, formId, endingIdx) {
  const parts = [`condition:${end.condition.toString()}`, `text:${stubEndingText(formId, endingIdx)}`];
  for (const key of ['gainBonus', 'relBonus', 'startsStream', 'startsSalon', 'startsGallery', 'driveBonus']) {
    if (end[key] != null) parts.push(`${key}:${end[key]}`);
  }
  return `{${parts.join(',')}}`;
}

function emitStage(formId, stageIdx, evDef) {
  const phases = (evDef.phases || []).map((phase, phaseIdx) => {
    const choices = (phase.choices || []).map((ch) => emitChoice(ch, formId)).join(',\n            ');
    return `        {
          text:${stubPhase(formId, stageIdx, phaseIdx)},
          choices:[
            ${choices}
          ]
        }`;
  }).join(',\n');
  const endings = (evDef.endings || []).map((end, ei) => emitEnding(end, formId, ei)).join(',\n        ');
  return `    {
      title:${JSON.stringify(evDef.title)},
      phases:[
${phases}
      ],
      endings:[
        ${endings}
      ]
    }`;
}

export function emitEventArray(formId, stages) {
  if (!Array.isArray(stages)) return '[]';
  const stageBlocks = stages.map((evDef, si) => emitStage(formId, si, evDef)).join(',\n');
  return `[\n${stageBlocks}\n]`;
}
