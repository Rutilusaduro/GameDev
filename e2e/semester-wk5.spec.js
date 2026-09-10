import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

test('sporty hall start survives week 1–5 advance loop', async ({ page }) => {
  test.setTimeout(90_000);

  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await expect(page.getByText('Cassidy').first()).toBeVisible();

  const week = await advanceToWeek(page, 5);
  expect(week).toBeGreaterThanOrEqual(5);

  await dismissBlockingModals(page);
  await expect(page.getByText(/WEEK 5/)).toBeVisible();
  await expect(page.locator('.ra-desk-header').getByText(/RA DESK/)).toBeVisible();
  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);
  await expect(page.getByText('Field Notes')).toHaveCount(0);
});
