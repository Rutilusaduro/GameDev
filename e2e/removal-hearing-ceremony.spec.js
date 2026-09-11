import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerRemovalHearingQA } from './helpers/setupGame.js';

test('removal hearing modal runs resident removal session with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerRemovalHearingQA(page);

  const modal = page.locator('.opposition-hearing-modal');
  await expect(modal.getByText(/RESIDENT REMOVAL HEARING/)).toBeVisible();
  await expect(modal.locator('[style*="line-height"]').first()).not.toBeEmpty();

  await modal.getByRole('button', { name: /Stage a live tasting demonstration/ }).click();
  await modal.getByRole('button', { name: /Negotiate\. Private indulgence/ }).click();
  await expect(modal.getByText(/abundance framed as concern/i)).toHaveCount(0);

  await expect(modal.getByRole('button', { name: 'Continue ✓' })).toBeVisible();
  await modal.getByRole('button', { name: 'Continue ✓' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
