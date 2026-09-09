import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

test('week 8 advance shows hall unlock modal with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await setWeekViaDebug(page, 7);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page, { leaveUnlockModal: true });

  await expect(page.getByText('HALL REACH EXPANDED')).toBeVisible();
  await expect(page.locator('.hall-unlock-modal').getByText(/Scholar's Rest/i).first()).toBeVisible();
  await expect(page.getByText(/New residents from/i)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await page.getByRole('button', { name: 'View Roster →' }).click();
  await dismissBlockingModals(page);

  await expect(page.getByText(/WEEK 8/)).toBeVisible();
  await expect(page.getByText('NEW', { exact: true })).toBeVisible();
});
