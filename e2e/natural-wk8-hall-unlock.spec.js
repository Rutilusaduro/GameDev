import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

test('Victory Hall start unlocks Scholar\'s Rest at week 8 without debug', async ({ page }) => {
  test.setTimeout(120_000);

  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await expect(page.getByText('Cassidy').first()).toBeVisible();

  const week = await advanceToWeek(page, 8);
  expect(week).toBeGreaterThanOrEqual(8);

  await dismissBlockingModals(page);
  await page.getByRole('button', { name: '📋 RA Desk' }).click();

  await expect(page.getByText(/WEEK 8/)).toBeVisible();
  await expect(page.getByText("Scholar's Rest", { exact: false }).first()).toBeVisible();
  await expect(page.getByText("Scholar's Rest opens week", { exact: false })).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
