import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  completeFloorCheckIn,
  dismissBlockingModals,
  setWeekViaDebug,
} from './helpers/setupGame.js';

test('week 8 unlocks Victory Hall and Scholar\'s Rest on weirdos hall start', async ({ page }) => {
  await completeRaSetup(page, { dorm: 'The Annex' });

  await expect(page.getByText('Victory Hall opens week 8').first()).toBeVisible();
  await expect(page.getByText("Scholar's Rest opens week 8").first()).toBeVisible();

  await setWeekViaDebug(page, 7);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page);
  await dismissBlockingModals(page);

  await expect(page.getByText(/WEEK 8/)).toBeVisible();
  await dismissBlockingModals(page);
  await page.getByRole('button', { name: '📋 Roster' }).click();

  await expect(page.getByText(/Victory Hall.*Scholar's Rest.*unlocked/i).first()).toBeVisible();
  await expect(page.getByText('Cassidy', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Priya', { exact: true }).first()).toBeVisible();
  await expect(page.getByText('Victory Hall opens week 8')).toHaveCount(0);
  await expect(page.getByText("Scholar's Rest opens week 8")).toHaveCount(0);
});
