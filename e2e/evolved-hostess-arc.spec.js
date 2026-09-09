import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockHostessArcQA } from './helpers/setupGame.js';

test('chapter hostess arc opens hangout picker', async ({ page }) => {
  await completeRaSetup(page);
  await unlockHostessArcQA(page);

  await page.getByRole('button', { name: /Hang Out/ }).click();

  const modal = page.locator('.chapter-hostess-modal');
  await expect(modal.getByText(/HANG OUT/)).toBeVisible();
  await expect(modal.getByText('Who do you spend the day with?')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
