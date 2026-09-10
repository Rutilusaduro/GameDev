import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

test('Victory Hall start unlocks Rosewood House at week 12 without debug', async ({ page }) => {
  test.setTimeout(150_000);

  await completeRaSetup(page, { dorm: 'Victory Hall' });

  const week = await advanceToWeek(page, 12);
  expect(week).toBeGreaterThanOrEqual(12);

  await dismissBlockingModals(page);
  await page.getByRole('button', { name: '📋 RA Desk' }).click();

  await expect(page.getByText(/WEEK 12/)).toBeVisible();
  await expect(page.getByText('Rosewood House', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('Rosewood House opens week', { exact: false })).toHaveCount(0);
  await expect(page.getByText('Kylie').first()).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
