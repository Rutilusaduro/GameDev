import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockRankedFeedeeArcQA } from './helpers/setupGame.js';

test('ranked feedee arc opens event then ranked session modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockRankedFeedeeArcQA(page);

  await page.getByRole('button', { name: /Run a Session/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('FIRST ORDER')).toBeVisible();
  await expect(modal.getByText('Destiny', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Start the Session/ })).toBeVisible();
  await modal.getByRole('button', { name: /Start the Session/ }).click();

  const session = page.locator('.ranked-session-modal');
  await expect(session.getByText('BRONZE SESSION')).toBeVisible();
  await expect(session.getByText(/FOCUS \d+\/\d+/)).toBeVisible();
});
