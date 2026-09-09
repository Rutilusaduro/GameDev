import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockStateFairArcQA } from './helpers/setupGame.js';

test('state fair queen arc opens pre-fair training hub', async ({ page }) => {
  await completeRaSetup(page);
  await unlockStateFairArcQA(page);

  await page.getByRole('button', { name: /Enter the Fair/ }).click();

  const modal = page.locator('.fair-modal');
  await expect(modal.getByText('PRE-FAIR TRAINING')).toBeVisible();
  await expect(modal.getByText('Mary Jane — 200 lbs')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
