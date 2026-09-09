import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerTierUpQA } from './helpers/setupGame.js';

test('tier-up modal shows relationship milestone with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerTierUpQA(page);

  const modal = page.locator('.tier-up-modal');
  await expect(modal.getByText('RELATIONSHIP MILESTONE')).toBeVisible();
  await expect(modal.getByText('💜 Intimate', { exact: true })).toBeVisible();
  await expect(modal.getByText(/Cassidy/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
