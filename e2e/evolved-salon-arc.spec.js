import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockSalonArcQA } from './helpers/setupGame.js';

test('salon arc opens première soirée and routes to salon hub', async ({ page }) => {
  await completeRaSetup(page);
  await unlockSalonArcQA(page);

  await page.getByRole('button', { name: /Host Salon Evening/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('PREMIÈRE SOIRÉE')).toBeVisible();
  await expect(modal.getByText('Chloé', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Open the Salon/ })).toBeVisible();
  await modal.getByRole('button', { name: /Open the Salon/ }).click();

  await expect(page.locator('.salon-modal').getByText(/SALON DE L'APPÉTIT/)).toBeVisible();
});
