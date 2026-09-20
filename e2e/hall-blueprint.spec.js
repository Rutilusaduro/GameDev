import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('hall blueprint floor plan shows kitchen upgrades', async ({ page }) => {
  await completeRaSetup(page, { dorm: 'Victory Hall' });
  await page.getByRole('button', { name: '🏠 Blueprint' }).click();
  await expect(page.getByRole('group', { name: /Dorm floor blueprint/i })).toBeVisible();
  await page.locator('[data-room-id="kitchen"]').click();
  await expect(page.getByRole('heading', { name: 'Floor Kitchen' })).toBeVisible();
  await expect(page.getByText(/Snack Station/i).first()).toBeVisible();
});
