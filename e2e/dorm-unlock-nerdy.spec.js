import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

test('week 8 unlocks Victory Hall on nerdy hall start', async ({ page }) => {
  await completeRaSetup(page, { dorm: "Scholar's Rest" });

  await expect(page.getByText('Victory Hall opens week 8')).toHaveCount(0);

  await setWeekViaDebug(page, 7);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page);
  await dismissBlockingModals(page);

  await expect(page.getByText(/WEEK 8/)).toBeVisible();
  await dismissBlockingModals(page);
  await page.getByRole('button', { name: '📋 RA Desk' }).click();

  await expect(page.getByText(/Victory Hall.*unlocked/i).first()).toBeVisible();
  await expect(page.getByText('Victory Hall opens week 8')).toHaveCount(0);
});
