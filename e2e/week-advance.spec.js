import { test, expect } from '@playwright/test';
import { completeRaSetup, completeFloorCheckIn } from './helpers/setupGame.js';

test('Next Week advances semester to week 2', async ({ page }) => {
  await completeRaSetup(page);

  await expect(page.getByText(/WEEK 1/)).toBeVisible();

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page);

  await expect(page.getByText(/WEEK 2/)).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/WEEK 1/)).toHaveCount(0);
});
