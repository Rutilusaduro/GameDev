import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerConfrontationQA } from './helpers/setupGame.js';

test('confrontation modal shows resident pushback with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerConfrontationQA(page);

  const modal = page.locator('.confrontation-modal');
  await expect(modal.getByText(/SHE.*HAD ENOUGH/)).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();

  const nextBeat = modal.getByRole('button', { name: /Tap for next beat/i });
  for (let i = 0; i < 12 && await nextBeat.isVisible().catch(() => false); i += 1) {
    await nextBeat.click();
  }

  await expect(modal.getByRole('button', { name: /Apologize sincerely/ })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
