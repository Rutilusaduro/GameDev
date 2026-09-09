import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockEatingCaptainArcQA } from './helpers/setupGame.js';

test('eating captain arc opens event then eating contest modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockEatingCaptainArcQA(page);

  await page.getByRole('button', { name: /Enter a Competition/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText(/REGIONAL OPEN/)).toBeVisible();
  await expect(modal.getByText('Brittany', { exact: true })).toBeVisible();

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Step to the Table/ })).toBeVisible();
  await modal.getByRole('button', { name: /Step to the Table/ }).click();

  await expect(page.locator('.eating-contest-modal')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
