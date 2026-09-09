import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

test('week 16 unlocks The Annex on sporty hall start', async ({ page }) => {
  await completeRaSetup(page);

  await setWeekViaDebug(page, 15);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page);
  await dismissBlockingModals(page);

  await expect(page.getByText(/WEEK 16/)).toBeVisible();
  await page.getByRole('button', { name: '📋 Roster' }).click();

  await expect(page.getByText(/The Annex.*unlocked/i).first()).toBeVisible();
  await expect(page.getByText('The Annex opens week 16')).toHaveCount(0);
});
