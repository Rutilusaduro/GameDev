import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerFeastRitualQA } from './helpers/setupGame.js';

test('feast ritual modal runs communion snack with resident framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerFeastRitualQA(page);

  const modal = page.locator('.feast-ritual-modal');
  await expect(modal.getByText('Feast Rituals')).toBeVisible();
  await modal.getByRole('button', { name: /Communion Snack/ }).click();
  await expect(modal.getByText(/Select 2–3 residents/)).toBeVisible();

  await modal.getByRole('button', { name: 'Cassidy', exact: true }).click();
  await modal.getByRole('button', { name: 'Brittany', exact: true }).click();
  await modal.getByRole('button', { name: 'Begin Ritual' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/Feast ritual complete/i)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
