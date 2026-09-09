import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockHomeNestArcQA } from './helpers/setupGame.js';

test('home nest arc opens delivery order minigame', async ({ page }) => {
  await completeRaSetup(page);
  await unlockHomeNestArcQA(page);

  await page.getByRole('button', { name: /Order In/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('FIRST DAY IN')).toBeVisible();
  await expect(modal.getByText('Maya', { exact: true })).toBeVisible();

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Place the Order/ })).toBeVisible();
  await modal.getByRole('button', { name: /Place the Order/ }).click();

  const delivery = page.locator('.picker-modal');
  await expect(delivery.getByText('HOME NEST')).toBeVisible();
  await expect(delivery.getByText('Order In')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
