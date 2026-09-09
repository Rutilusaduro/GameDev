import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockCGArcQA } from './helpers/setupGame.js';

test('competitive gainer arc opens hub and corkboard scene', async ({ page }) => {
  await completeRaSetup(page);
  await unlockCGArcQA(page);

  await page.getByRole('button', { name: /Check Her Progress/ }).click();

  const modal = page.locator('.competitive-gainer-modal');
  await expect(modal.getByText('COMPETITIVE GAINER')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.getByRole('button', { name: /Observe at Corkboard/ }).click();
  await expect(modal.getByText('📌 CORKBOARD')).toBeVisible();
});
