import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockMachineGoddessArcQA } from './helpers/setupGame.js';

test('machine goddess arc opens lab session acquire modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockMachineGoddessArcQA(page);

  await page.getByRole('button', { name: /Run Lab Session/ }).click();

  const modal = page.locator('.lab-build-modal');
  await expect(modal.getByText('LAB SESSION — ACQUIRE')).toBeVisible();
  await expect(modal.getByText(/Talia is at 200 lbs/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
