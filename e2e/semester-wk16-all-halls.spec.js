import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

const START_HALLS = [
  { dorm: 'Victory Hall', halls: ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'] },
  { dorm: "Scholar's Rest", halls: ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'] },
  { dorm: 'Rosewood House', halls: ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'] },
  { dorm: 'The Annex', halls: ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'] },
];

for (const { dorm, halls } of START_HALLS) {
  test(`week 16 unlocks all halls on ${dorm} start`, async ({ page }) => {
    await completeRaSetup(page, { dorm });

    await setWeekViaDebug(page, 15);

    await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
    await completeFloorCheckIn(page);
    await dismissBlockingModals(page);

    await expect(page.getByText(/WEEK 16/)).toBeVisible();
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 RA Desk' }).click();

    for (const hall of halls) {
      await expect(page.getByText(hall, { exact: false }).first()).toBeVisible();
      await expect(page.getByText(new RegExp(`${hall} opens week`, 'i'))).toHaveCount(0);
    }

    await expect(page.getByText('Professor Sim')).toHaveCount(0);
    await expect(page.getByText('Madeline')).toHaveCount(0);
  });
}
