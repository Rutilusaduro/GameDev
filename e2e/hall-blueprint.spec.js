import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('hall blueprint wing filter shows kitchen upgrades', async ({ page }) => {
  await completeRaSetup(page, { dormId: 'sporty' });
  await page.getByRole('button', { name: /Hall Lounge/i }).click();
  await expect(page.getByText('FLOOR BLUEPRINT')).toBeVisible();
  await page.getByRole('button', { name: /Kitchen/i }).click();
  await expect(page.getByText(/KITCHEN & PANTRY UPGRADES/i)).toBeVisible();
  await expect(page.getByText(/Snack Station/i)).toBeVisible();
});
