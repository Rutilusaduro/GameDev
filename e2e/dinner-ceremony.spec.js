import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerDinnerOutQA } from './helpers/setupGame.js';

test('dinner out modal shows venue picker with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerDinnerOutQA(page);

  const modal = page.locator('.dinner-out-modal');
  await expect(modal.getByText('DINNER OUT')).toBeVisible();
  await expect(modal.getByText(/Dinner with Cassidy/i)).toBeVisible();
  await expect(modal.getByText(/Where would you like to take/i)).toBeVisible();
  await expect(modal.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.getByRole('button', { name: 'Cancel' }).click();
  await expect(modal).toHaveCount(0);
});
