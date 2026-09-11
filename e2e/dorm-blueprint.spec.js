import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('Blueprint rooms, resident doors, and night rounds', async ({ page }) => {
  await completeRaSetup(page);

  await page.getByRole('button', { name: '🏠 Blueprint' }).click();
  await expect(page.getByText('Hall Blueprint')).toBeVisible();
  await expect(page.getByRole('button', { name: /Common Lounge/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /Galley Kitchen/ })).toBeVisible();

  await page.getByRole('button', { name: /Galley Kitchen/ }).click();
  await expect(page.getByRole('heading', { name: 'Galley Kitchen' })).toBeVisible();

  await page.getByRole('button', { name: /Resident Wing/ }).click();
  await expect(page.getByRole('heading', { name: 'Resident Wing' })).toBeVisible();
  await expect(page.locator('.dorm-bp-door').first()).toBeVisible();

  const firstDoor = page.locator('.dorm-bp-door').first();
  await firstDoor.click();
  await expect(page.getByText(/Mini-fridge|Reinforced bed|Warm lighting/)).toBeVisible();

  await page.getByRole('button', { name: /Start night rounds/ }).click();
  await expect(page.getByRole('button', { name: /Night rounds/ })).toBeVisible();
  await firstDoor.click();
  await expect(page.getByText('NIGHT ROUNDS')).toBeVisible();
  await expect(page.getByRole('button').filter({ hasText: /Bring|Sit|Note|Dim|Tell|Watch|Restock|Share|Catch|Stay|Leave|Help|Pretend|Ask|Read|Accept|Mark|Attend|Learn/ }).first()).toBeVisible();
});
