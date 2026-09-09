import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockCultivatorArcQA } from './helpers/setupGame.js';

test('cultivator arc opens recruit setup modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockCultivatorArcQA(page);

  await page.getByRole('button', { name: /Recruit/ }).click();

  const modal = page.locator('.cultivator-modal');
  await expect(modal.getByText('CULTIVATOR')).toBeVisible();
  await expect(modal.getByText('Select a Taste Tester')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
