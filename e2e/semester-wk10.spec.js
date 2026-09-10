import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

test('sporty hall start survives week 1–10 advance loop', async ({ page }) => {
  test.setTimeout(120_000);

  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await expect(page.getByText('Cassidy').first()).toBeVisible();

  const week = await advanceToWeek(page, 10);
  expect(week).toBeGreaterThanOrEqual(10);

  await dismissBlockingModals(page);
  await expect(page.getByText(/WEEK 10/)).toBeVisible();
  await expect(page.locator('.ra-desk-header').getByText(/RA DESK/)).toBeVisible();
  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);

  await page.getByRole('button', { name: '📋 RA Desk' }).click();
  await expect(page.getByText(/Scholar's Rest.*unlocked/i).first()).toBeVisible();
  await expect(page.getByText("Scholar's Rest opens week 8")).toHaveCount(0);
  await expect(page.getByText('Rosewood House opens week 12')).toHaveCount(0);
});
