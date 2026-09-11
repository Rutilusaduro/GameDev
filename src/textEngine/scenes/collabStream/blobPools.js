// Collab stream — blob partner announcement prose (legacy → pools).
import { registerPool } from '../../engine.js';
import { COLLAB_BLOB_ANNOUNCEMENT } from '../../../gameData/miniGames.js';

for (const partnerId of Object.keys(COLLAB_BLOB_ANNOUNCEMENT)) {
  const arr = COLLAB_BLOB_ANNOUNCEMENT[partnerId];
  for (let si = 0; si < arr.length; si += 1) {
    const line = arr[si];
    if (!line?.trim()) continue;
    registerPool(`collab.stream.blob.p${partnerId}.s${si}`, [
      { when: {}, text: [(ctx) => line] },
      { when: {}, text: [(ctx) => line] },
      { when: {}, text: [(ctx) => `${line}\n\nThe chat understands before you finish.`] },
    ]);
  }
}

registerPool('collab.stream.blob.fallback', [
  { when: {}, text: [
    '{subject.name} announces on stream: a past collab partner hit blob stage — housebound, appetite legend.',
    'On camera, {subject.name} reads the update about a partner who outgrew her doorway.',
    'The stream gets quiet, then loud: a former collab feedee cannot leave home anymore.',
  ]},
]);
