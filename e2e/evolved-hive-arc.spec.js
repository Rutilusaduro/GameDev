import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockHiveArcQA } from './helpers/setupGame.js';

test('delivery hive arc opens central nest hub', async ({ page }) => {
  await completeRaSetup(page);
  await unlockHiveArcQA(page);

  await page.getByRole('button', { name: /Manage Delivery Hive/ }).click();

  const modal = page.locator('.maya-hive-modal');
  await expect(modal.getByText('DELIVERY HIVE QUEEN')).toBeVisible();
  await expect(modal.getByText("Maya's Central Nest")).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.getByRole('button', { name: /Observe Hive State/ }).click();
  await expect(modal.getByText('HIVE STATE')).toBeVisible();
  await expect(modal).not.toContainText('Maya documents the Hive: conquered rooms');
  await expect(modal).not.toContainText('{unresolved}');
});
