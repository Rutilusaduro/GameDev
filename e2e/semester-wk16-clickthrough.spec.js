import { test, expect } from '@playwright/test';
import { completeRaSetup, advanceToWeek, dismissBlockingModals } from './helpers/setupGame.js';

const START_HALLS = [
  { dorm: 'Victory Hall', expectCassidy: true },
  { dorm: "Scholar's Rest", expectCassidy: false },
  { dorm: 'Rosewood House', expectCassidy: false },
  { dorm: 'The Annex', expectCassidy: false },
];

const ALL_HALLS = ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'];

for (const { dorm, expectCassidy } of START_HALLS) {
  test(`week 16 click-through on ${dorm} start`, async ({ page }) => {
    test.setTimeout(180_000);

    await completeRaSetup(page, { dorm });
    if (expectCassidy) {
      await expect(page.getByText('Cassidy')).toBeVisible();
    }

    const week = await advanceToWeek(page, 16);
    expect(week).toBeGreaterThanOrEqual(16);

    await expect(page.getByText(/WEEK 16/)).toBeVisible();
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 RA Desk' }).click();

    for (const hall of ALL_HALLS) {
      await expect(page.getByText(new RegExp(`${hall} opens week`, 'i'))).toHaveCount(0);
    }

    await expect(page.getByText('Cassidy').first()).toBeVisible();
    await expect(page.getByText('Priya').first()).toBeVisible();

    await expect(page.getByText('Professor Sim')).toHaveCount(0);
    await expect(page.getByText('Madeline')).toHaveCount(0);
  });
}
