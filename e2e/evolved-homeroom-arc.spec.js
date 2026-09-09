import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockHomeroomArcQA } from './helpers/setupGame.js';

test('homeroom queen arc opens hall kitchen hub', async ({ page }) => {
  await completeRaSetup(page);
  await unlockHomeroomArcQA(page);

  await page.getByRole('button', { name: /Run a Baking Session/ }).click();

  const modal = page.locator('.homeroom-queen-modal');
  await expect(modal.getByText("DAISY'S HALL KITCHEN")).toBeVisible();
  await expect(modal.getByText('FLOOR RESIDENTS')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
