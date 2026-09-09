import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerWeekRecapQA } from './helpers/setupGame.js';

test('week recap modal shows weekly ledger with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerWeekRecapQA(page);

  const modal = page.locator('.week-recap-modal');
  await expect(modal.getByText('THE WEEK IN REVIEW')).toBeVisible();
  await expect(modal.getByText('What the week made of them')).toBeVisible();
  await expect(modal.getByText(/crossed into Heavy this week/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
