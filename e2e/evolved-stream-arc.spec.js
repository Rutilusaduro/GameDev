import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockStreamArcQA } from './helpers/setupGame.js';

test('eating streamer arc opens event modal and routes to stream session', async ({ page }) => {
  await completeRaSetup(page);
  await unlockStreamArcQA(page);

  await page.getByRole('button', { name: /Stream Event/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('FIRST REAL MUKBANG')).toBeVisible();
  await expect(modal.getByText('Destiny', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Go Live/ })).toBeVisible();
  await modal.getByRole('button', { name: /Go Live/ }).click();

  await expect(page.locator('.stream-session-modal')).toBeVisible();
});
