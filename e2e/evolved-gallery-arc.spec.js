import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockGalleryArcQA } from './helpers/setupGame.js';

test('gallery arc opens first model event and routes to gallery hub', async ({ page }) => {
  await completeRaSetup(page);
  await unlockGalleryArcQA(page);

  await page.getByRole('button', { name: /Open Artisan Gallery/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('FIRST MODEL')).toBeVisible();
  await expect(modal.getByText('Fiona', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Open the Gallery/ })).toBeVisible();
  await modal.getByRole('button', { name: /Open the Gallery/ }).click();

  await expect(page.locator('.artisan-gallery-modal').getByText(/ARTISAN GALLERY/)).toBeVisible();
});
