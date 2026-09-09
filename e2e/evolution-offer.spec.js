import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerEvolutionQA } from './helpers/setupGame.js';

test('evolution offer modal shows lane captain path with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerEvolutionQA(page);

  const modal = page.locator('.evolution-offer-modal');
  await expect(modal.getByText('A NEW DIRECTION')).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByRole('button', { name: /Lane Captain/ })).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Not yet' })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
