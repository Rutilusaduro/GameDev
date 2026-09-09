import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockPsychResearcherArcQA } from './helpers/setupGame.js';

test('psych researcher arc opens hall log event modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockPsychResearcherArcQA(page);

  await page.getByRole('button', { name: /Continue Hall Log Session/ }).click();

  const modal = page.locator('.evolved-event-modal');
  await expect(modal.getByText('OPENING THE HALL LOG')).toBeVisible();
  await expect(modal.getByText('Nadia', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
