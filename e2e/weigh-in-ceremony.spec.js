import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerWeighInQA } from './helpers/setupGame.js';

test('weigh-in modal runs scale ceremony with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerWeighInQA(page);

  const modal = page.locator('.weigh-in-modal');
  await expect(modal.getByText(/WEIGH-IN · CASSIDY/i)).toBeVisible();

  await modal.getByRole('button', { name: 'Step onto the scale →' }).click();
  await expect(modal.getByRole('button', { name: 'Continue →' })).toBeVisible({ timeout: 8_000 });
  await modal.getByRole('button', { name: 'Continue →' }).click();

  await expect(modal.getByRole('button', { name: 'Close ✓' })).toBeVisible();
  await modal.getByRole('button', { name: 'Close ✓' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
