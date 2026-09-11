import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('floor blueprint: click room, see upgrades, pin circuit', async ({ page }) => {
  await completeRaSetup(page);
  await page.getByRole('button', { name: '🏠 Hall Lounge' }).click();
  await expect(page.getByText(/HALL LOUNGE PRESTIGE/i).first()).toBeVisible();
  await expect(page.getByRole('group', { name: /Dorm floor blueprint/i })).toBeVisible();

  await page.locator('[data-room-id="kitchen"]').click();
  await expect(page.getByRole('heading', { name: 'Floor Kitchen' })).toBeVisible();
  await expect(page.getByText(/Snack Station/i).first()).toBeVisible();
  await page.locator('[data-panel="HallLoungeSkillsPanel"]').screenshot({ path: '/opt/cursor/artifacts/screenshots/blueprint_kitchen_selected.png' });

  await page.locator('[data-room-id="lounge"]').click();
  await expect(page.getByRole('heading', { name: 'Hall Lounge' })).toBeVisible();
  await expect(page.getByText(/Comfortable Seating/i).first()).toBeVisible();

  const pin = page.getByRole('button', { name: /Pin for rounds/i });
  await pin.click();
  await expect(page.getByRole('button', { name: /Pinned #1/i })).toBeVisible();

  await expect(page.getByRole('button', { name: /Walk After-Hours Rounds/i })).toBeVisible();
});
