import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

const START_HALLS = [
  { dorm: 'Victory Hall', unlocks: ["Scholar's Rest"] },
  { dorm: "Scholar's Rest", unlocks: ['Victory Hall'] },
  { dorm: 'Rosewood House', unlocks: ['Victory Hall', "Scholar's Rest"] },
  { dorm: 'The Annex', unlocks: ['Victory Hall', "Scholar's Rest"] },
];

for (const { dorm, unlocks } of START_HALLS) {
  test(`week 8 click-through unlocks halls on ${dorm} start`, async ({ page }) => {
    test.setTimeout(120_000);

    await completeRaSetup(page, { dorm });
    const week = await advanceToWeek(page, 8);
    expect(week).toBeGreaterThanOrEqual(8);

    await expect(page.getByText(/WEEK 8/)).toBeVisible();
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 Roster' }).click();

    for (const hall of unlocks) {
      await expect(page.getByText(hall, { exact: false }).first()).toBeVisible();
      await expect(page.getByText(new RegExp(`${hall} opens week`, 'i'))).toHaveCount(0);
    }

    if (dorm !== 'Victory Hall') {
      await expect(page.getByText('Cassidy', { exact: true }).first()).toBeVisible();
    }

    await expect(page.getByText('Professor Sim')).toHaveCount(0);
    await expect(page.getByText('Madeline')).toHaveCount(0);
  });
}
