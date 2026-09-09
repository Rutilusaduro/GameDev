import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockCampusLegendArcQA } from './helpers/setupGame.js';

test('campus legend arc opens food challenge minigame', async ({ page }) => {
  await completeRaSetup(page);
  await unlockCampusLegendArcQA(page);

  await page.getByRole('button', { name: /Share a Meal at the Booth/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('THE FIRST CHALLENGE')).toBeVisible();
  await expect(modal.getByText('Chloé', { exact: true })).toBeVisible();

  await modal.locator('.evolved-event-choice-row').first().click();
  await modal.locator('.evolved-event-choice-row').first().click();

  await expect(modal.getByRole('button', { name: /Take the Challenge/ })).toBeVisible();
  await modal.getByRole('button', { name: /Take the Challenge/ }).click();

  const challenge = page.locator('.picker-modal');
  await expect(challenge.getByText('CAMPUS LEGEND')).toBeVisible();
  await expect(challenge.getByText('Food Challenge')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
