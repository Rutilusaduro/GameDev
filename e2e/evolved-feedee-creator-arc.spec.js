import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockFeedeeCreatorArcQA } from './helpers/setupGame.js';

test('feedee creator arc opens collab picker then first collab event', async ({ page }) => {
  await completeRaSetup(page);
  await unlockFeedeeCreatorArcQA(page);

  await page.getByRole('button', { name: /Go Live Together/ }).click();

  const picker = page.locator('.picker-modal');
  await expect(picker.getByText('COLLAB STREAM')).toBeVisible();
  await picker.getByText('Destiny', { exact: true }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('FIRST COLLAB')).toBeVisible();
  await expect(modal.getByText('Kylie', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
