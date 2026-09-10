import { test, expect } from '@playwright/test';
import { completeRaSetup, openRaDesk } from './helpers/setupGame.js';

test('RA Desk nav returns home from Hall Lounge', async ({ page }) => {
  await completeRaSetup(page);
  await expect(page.getByRole('button', { name: '📋 RA Desk' })).toBeVisible();

  await page.getByRole('button', { name: '🏠 Hall Lounge' }).click();
  await expect(page.getByText(/HALL LOUNGE|PRESTIGE/i).first()).toBeVisible();

  await openRaDesk(page);
  await expect(page.getByText(/Residents — .* on your floor/)).toBeVisible();
  await expect(page.getByText('Cassidy').first()).toBeVisible();
});
