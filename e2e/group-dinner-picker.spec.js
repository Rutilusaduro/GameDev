import { test, expect } from '@playwright/test';
import { completeRaSetup, dismissBlockingModals } from './helpers/setupGame.js';

test('group dinner picker opens from Actions after Dinner QA unlock', async ({ page }) => {
  await completeRaSetup(page);

  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Dinner QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);

  await expect(page.getByText('Arrange Group Dinner')).toBeVisible();

  await page.getByText('👥 Arrange Group Dinner', { exact: true }).locator('..').getByRole('button', { name: 'Use Action' }).click();

  await expect(page.getByText('SELECT RESIDENTS')).toBeVisible();
  await expect(page.getByText(/Choose 2 residents for dinner/i)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await page.getByRole('button', { name: 'Cancel' }).click();
  await expect(page.getByText('SELECT RESIDENTS')).toHaveCount(0);
});
