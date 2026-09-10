import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerTapOutQA } from './helpers/setupGame.js';

test('tap-out modal shows resident session limit with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerTapOutQA(page);

  const modal = page.locator('.tap-out-modal');
  await expect(modal.getByText(/SHE TAPS OUT/)).toBeVisible();
  await expect(modal.getByText(/Cassidy · 8,400 cal this session/)).toBeVisible();
  await expect(modal.getByText(/private session ends/i)).toBeVisible();

  await modal.getByRole('button', { name: 'Close' }).click();
  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
