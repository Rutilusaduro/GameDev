import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek } from './helpers/setupGame.js';

test('sporty hall start survives week 1–4 advance loop', async ({ page }) => {
  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await expect(page.getByText('Cassidy')).toBeVisible();

  const week = await advanceToWeek(page, 4);
  expect(week).toBeGreaterThanOrEqual(4);

  await expect(page.getByText(/WEEK 4/)).toBeVisible();
  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);
});
