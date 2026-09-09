import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

test('sporty hall survives full week 1–16 click-through', async ({ page }) => {
  test.setTimeout(120_000);

  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await expect(page.getByText('Cassidy')).toBeVisible();

  const week = await advanceToWeek(page, 16);
  expect(week).toBeGreaterThanOrEqual(16);

  await expect(page.getByText(/WEEK 16/)).toBeVisible();
  await dismissBlockingModals(page);
  await page.getByRole('button', { name: '📋 Roster' }).click();

  for (const hall of ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex']) {
    await expect(page.getByText(hall, { exact: false }).first()).toBeVisible();
    await expect(page.getByText(new RegExp(`${hall} opens week`, 'i'))).toHaveCount(0);
  }

  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);
});
