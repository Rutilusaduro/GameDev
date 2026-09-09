import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerAscensionQA } from './helpers/setupGame.js';

test('ascension ceremony modal shows threshold with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerAscensionQA(page);

  const modal = page.locator('.ascension-ceremony-modal');
  await expect(modal.getByText('ASCENSION THRESHOLD')).toBeVisible();
  await expect(modal.getByText(/Cassidy — Sphinx/)).toBeVisible();

  const nextBeat = modal.getByRole('button', { name: /Tap for next beat/i });
  for (let i = 0; i < 12 && await nextBeat.isVisible().catch(() => false); i += 1) {
    await nextBeat.click();
  }

  await expect(modal.getByRole('button', { name: 'See it through' })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
