import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockHomesteadQueenArcQA } from './helpers/setupGame.js';

test('homestead queen arc opens first spread event modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockHomesteadQueenArcQA(page);

  await page.getByRole('button', { name: /Visit the Homestead/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('THE FIRST SPREAD')).toBeVisible();
  await expect(modal.getByText('Mary Jane', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
