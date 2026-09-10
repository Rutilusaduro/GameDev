import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  advanceToWeek,
  dismissBlockingModals,
  openResidentDetail,
} from './helpers/setupGame.js';

const ALL_HALLS = ['Victory Hall', "Scholar's Rest", 'Rosewood House', 'The Annex'];

test.describe('semester full journey', () => {
  test('Victory Hall: wk1 roster → wk8 unlock → wk16 all halls', async ({ page }) => {
    test.setTimeout(240_000);

    await completeRaSetup(page, { dorm: 'Victory Hall' });
    await expect(page.getByText('RA DESK — VICTORY HALL')).toBeVisible();
    await expect(page.getByText('Cassidy').first()).toBeVisible();

    await openResidentDetail(page, 'Cassidy');
    await expect(page.getByText('Personal Actions')).toBeVisible();
    await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
    await page.getByRole('button', { name: '📋 Roster' }).click();

    const week4 = await advanceToWeek(page, 4);
    expect(week4).toBeGreaterThanOrEqual(4);
    await dismissBlockingModals(page);
    await expect(page.getByText(/WEEK 4/)).toBeVisible();

    const week8 = await advanceToWeek(page, 8);
    expect(week8).toBeGreaterThanOrEqual(8);
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 Roster' }).click();
    await expect(page.getByText("Scholar's Rest", { exact: false }).first()).toBeVisible();

    const week16 = await advanceToWeek(page, 16);
    expect(week16).toBeGreaterThanOrEqual(16);
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 Roster' }).click();

    for (const hall of ALL_HALLS) {
      await expect(page.getByText(hall, { exact: false }).first()).toBeVisible();
      await expect(page.getByText(new RegExp(`${hall} opens week`, 'i'))).toHaveCount(0);
    }

    await expect(page.getByText('Professor Sim')).toHaveCount(0);
    await expect(page.getByText('Madeline')).toHaveCount(0);
    await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
  });

  test("Scholar's Rest: Cassidy joins roster by week 16", async ({ page }) => {
    test.setTimeout(240_000);

    await completeRaSetup(page, { dorm: "Scholar's Rest" });
    await page.getByRole('button', { name: '📋 Roster' }).click();
    await expect(page.locator('.roster-tile').filter({ hasText: 'Cassidy' })).toHaveCount(0);

    const week16 = await advanceToWeek(page, 16);
    expect(week16).toBeGreaterThanOrEqual(16);
    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '📋 Roster' }).click();

    await expect(page.getByText('Cassidy', { exact: true }).first()).toBeVisible();
    for (const hall of ALL_HALLS) {
      await expect(page.getByText(hall, { exact: false }).first()).toBeVisible();
    }
    await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
  });
});
