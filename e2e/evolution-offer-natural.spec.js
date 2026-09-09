import { test, expect } from '@playwright/test';
import { completeRaSetup, prepareEvolutionEligibleQA } from './helpers/setupGame.js';

test('student detail evolution button opens offer modal with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await prepareEvolutionEligibleQA(page);

  await expect(page.getByText('EVOLUTION AVAILABLE')).toBeVisible();
  const proposeBtn = page.locator('button').filter({ hasText: 'Propose a New Direction' });
  await proposeBtn.scrollIntoViewIfNeeded();
  await proposeBtn.evaluate((el) => el.click());

  const modal = page.locator('.evolution-offer-modal');
  await expect(modal.getByText('A NEW DIRECTION')).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByRole('button', { name: /Lane Captain/ })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
