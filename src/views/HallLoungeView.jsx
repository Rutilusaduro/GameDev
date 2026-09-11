// ═══════════════════════════════════════════════════════════════
// HALL LOUNGE VIEW — blueprint prestige shop (spatial UI)
// ═══════════════════════════════════════════════════════════════
import { HallBlueprintView } from './HallBlueprintView.jsx';
import { getDorm } from '../gameData/dorms.js';

export function HallLoungeView({
  students,
  ownedHallSkills,
  onPurchaseHallLoungeSkill,
  atmosphereWeave,
  raProfile,
}) {
  const dorm = getDorm(raProfile?.dormId || raProfile?.subject);
  const hallAccent = dorm?.color || '#4a8aa8';

  return (
    <HallBlueprintView
      students={students}
      ownedHallSkills={ownedHallSkills}
      onPurchaseHallLoungeSkill={onPurchaseHallLoungeSkill}
      atmosphereWeave={atmosphereWeave}
      hallAccent={hallAccent}
    />
  );
}
