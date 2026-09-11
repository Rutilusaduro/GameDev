import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('Blueprint rooms, resident doors, and night rounds', async ({ page }) => {
  await completeRaSetup(page);

  await page.getByRole('button', { name: '🏠 Blueprint' }).click();
  await expect(page.getByText('Hall Blueprint', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /Common Lounge/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Galley Kitchen/ })).toBeVisible();

  await page.getByRole('button', { name: /Galley Kitchen/ }).click();
  await expect(page.getByRole('heading', { name: 'Galley Kitchen' })).toBeVisible();

  await page.getByRole('button', { name: /Resident Wing/ }).click();
  await expect(page.getByRole('heading', { name: 'Resident Wing' })).toBeVisible();
  await expect(page.locator('.dorm-bp-door').first()).toBeVisible();

  const firstDoor = page.locator('.dorm-bp-door').first();
  await firstDoor.click();
  await expect(page.getByText('Mini-fridge')).toBeVisible();

  await page.getByRole('button', { name: /Start night rounds/ }).click();
  await expect(page.getByRole('button', { name: /Night rounds ·/ })).toBeVisible();
  await firstDoor.click();
  await expect(page.getByText('NIGHT ROUNDS', { exact: true })).toBeVisible();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByTestId('night-round-choice')).toHaveCount(3);
  await page.getByTestId('night-round-choice').first().click();
  await expect(page.getByRole('button', { name: 'Back to the plan' })).toBeVisible();
});
