import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

test('week 12 unlocks Rosewood House on sporty hall start', async ({ page }) => {
  await completeRaSetup(page);

  await setWeekViaDebug(page, 11);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page);
  await dismissBlockingModals(page);

  await expect(page.getByText(/WEEK 12/)).toBeVisible();
  await page.getByRole('button', { name: '📋 Roster' }).click();

  await expect(page.getByText(/Rosewood House.*unlocked/i).first()).toBeVisible();
  await expect(page.getByText('Rosewood House opens week 12')).toHaveCount(0);
});
