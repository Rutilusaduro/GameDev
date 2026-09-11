import { test, expect } from '@playwright/test';
import { completeRaSetup, dismissBlockingModals, openResidentDetail, unlockDinnerQA } from './helpers/setupGame.js';

test('1-on-1 dinner lane: venue pick, dish order, leave early', async ({ page }) => {
  await completeRaSetup(page);
  await unlockDinnerQA(page);
  await openResidentDetail(page, 'Brittany');

  await page.getByText('🍷 Take to Dinner', { exact: true }).click();

  const dinnerModal = page.locator('.dinner-out-modal');
  await expect(dinnerModal.getByText('DINNER OUT')).toBeVisible();
  await expect(dinnerModal.getByText(/Where would you like to take/i)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
  await expect(dinnerModal).not.toContainText(/Cosy neighbourhood bistro/i);
  await dinnerModal.locator('.dinner-venue-choice-row').filter({ hasText: 'Campus Bistro' }).screenshot({ path: '/opt/cursor/artifacts/screenshots/dinner_venue_composed.png' });

  await dinnerModal.locator('.dinner-venue-choice-row').filter({ hasText: 'Campus Bistro' }).click();

  await expect(dinnerModal.getByText('Menu', { exact: true })).toBeVisible();
  await dinnerModal.locator('.dinner-dish-choice-row').first().click();

  await expect(dinnerModal.getByText(/cal total/i)).toBeVisible();
  await dinnerModal.getByRole('button', { name: 'Leave Early' }).click();

  await expect(page.locator('.dinner-out-modal')).toHaveCount(0);
  await dismissBlockingModals(page);
});

test('dinner venue picker dismisses on Escape', async ({ page }) => {
  await completeRaSetup(page);
  await unlockDinnerQA(page);
  await openResidentDetail(page, 'Cassidy');

  await page.getByText('🍷 Take to Dinner', { exact: true }).click();

  await expect(page.locator('.dinner-out-modal').getByText('DINNER OUT')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.dinner-out-modal')).toHaveCount(0);
});
