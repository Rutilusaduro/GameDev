import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerPresentationQA } from './helpers/setupGame.js';

test('lane captain presentation opens hall log defense minigame', async ({ page }) => {
  await completeRaSetup(page);
  await triggerPresentationQA(page);

  const modal = page.locator('.picker-modal');
  await expect(modal.getByText('HALL LOG FOCUS')).toBeVisible();
  await expect(modal.getByText('Panel Review')).toBeVisible();
  await expect(modal.getByText(/Cassidy · 200 lbs/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
