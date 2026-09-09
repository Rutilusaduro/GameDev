import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockEvolvedArcQA } from './helpers/setupGame.js';

test('sumo evolved arc opens event modal and routes to match', async ({ page }) => {
  await completeRaSetup(page);
  await unlockEvolvedArcQA(page);

  await page.getByRole('button', { name: /Enter a Tournament/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('REGIONAL QUALIFIER')).toBeVisible();
  await expect(modal.getByText('Cassidy')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Step Onto the Dohyo/ })).toBeVisible();
  await modal.getByRole('button', { name: /Step Onto the Dohyo/ }).click();

  await expect(page.locator('.sumo-match-modal')).toBeVisible();
});
