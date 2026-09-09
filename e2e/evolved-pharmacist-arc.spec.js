import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockPharmacistArcQA } from './helpers/setupGame.js';

test('pharmacist arc opens synthesis session modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockPharmacistArcQA(page);

  await page.getByRole('button', { name: /Synthesize Batch/ }).click();

  const modal = page.locator('.pharmacist-chem-modal');
  await expect(modal.getByText('CORPORATE LAB')).toBeVisible();
  await expect(modal.getByText(/Sophia — Corporate Chemist/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
