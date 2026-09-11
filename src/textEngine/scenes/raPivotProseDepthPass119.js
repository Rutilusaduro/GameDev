// Origin sweep — Britt, Kylie, Serena, Kaylee, Nadia, Daisy, MJ (Pass 119).
import { registerModuleVariants } from '../engine.js';

const W = 3;
const EARLY = { corruption: [0], stageMax: 3 };

registerModuleVariants('eat.firstBite', [
  {
    when: { studentId: 2, origin: 'kylie_brand_body', ...EARLY },
    weight: W,
    text: [
      'Camera-ready posture, off-camera appetite — the first bite breaks the contract.',
      'Brand body says no; her mouth says soon.',
    ],
  },
  {
    when: { studentId: 3, origin: 'serena_bored_undefeated', ...EARLY },
    weight: W,
    text: [
      'New event: eating. She approaches the plate like a undefeated athlete.',
      'The first bite is warm-up. She already plans the podium.',
    ],
  },
  {
    when: { studentId: 11, origin: 'kaylee_self_care', ...EARLY },
    weight: W,
    text: [
      'Orders for herself too — the first bite is triage and treat at once.',
      'Bedside manner aimed inward; she eats without charting guilt.',
    ],
  },
  {
    when: { studentId: 12, origin: 'nadia_dream_journal', ...EARLY },
    weight: W,
    text: [
      'REM hunger crosses into daylight — fork meets hypothesis.',
      'She notes the flavor, then stops pretending it is only research.',
    ],
  },
  {
    when: { studentId: 13, origin: 'daisy_snack_mom', ...EARLY },
    weight: W,
    text: [
      'Packed extra for everyone including herself — first bite is habit, not accident.',
      'Snack-mom energy: she feeds herself like she feeds the hall.',
    ],
  },
  {
    when: { studentId: 14, origin: 'mj_homestead_abundance', ...EARLY },
    weight: W,
    text: [
      'Harvest manners — no shy around a table, even a dorm one.',
      'County fair confidence in the first forkful; seconds assumed.',
    ],
  },
]);

registerModuleVariants('session.fullness', [
  {
    when: { hallAmbiancePeakMin: [25] },
    weight: 1,
    text: [
      'The room holds warmth from the blueprint wing — fullness feels invited, not accidental.',
    ],
  },
]);
