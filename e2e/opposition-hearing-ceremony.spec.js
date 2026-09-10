import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerHearingQA } from './helpers/setupGame.js';

test('opposition hearing modal runs emergency board session with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerHearingQA(page);

  const modal = page.locator('.opposition-hearing-modal');
  await expect(modal.getByText(/EMERGENCY BOARD HEARING/)).toBeVisible();
  await expect(modal.locator('.flagged-prose, [style*="line-height"]').first()).not.toBeEmpty();

  await modal.getByRole('button', { name: /Deflect to campus culture metrics/ }).click();
  await modal.getByRole('button', { name: /Double down/ }).click();

  await expect(modal.getByRole('button', { name: 'Continue ✓' })).toBeVisible();
  await modal.getByRole('button', { name: 'Continue ✓' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
