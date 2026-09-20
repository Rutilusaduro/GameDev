import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('Blueprint rooms and After-Hours pins', async ({ page }) => {
  await completeRaSetup(page);

  await page.getByRole('button', { name: '🏠 Blueprint' }).click();
  await expect(page.getByRole('group', { name: /Dorm floor blueprint/i })).toBeVisible();
  await expect(page.locator('[data-room-id="lounge"]')).toBeVisible();
  await expect(page.locator('[data-room-id="kitchen"]')).toBeVisible();

  await page.locator('[data-room-id="kitchen"]').click();
  await expect(page.getByRole('heading', { name: 'Floor Kitchen' })).toBeVisible();

  await page.locator('[data-room-id="lounge"]').click();
  await expect(page.getByRole('heading', { name: 'Hall Lounge' })).toBeVisible();

  await page.getByRole('button', { name: /Pin for rounds/i }).click();
  await expect(page.getByRole('button', { name: /Pinned #1/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Walk After-Hours Rounds/i })).toBeVisible();
});
