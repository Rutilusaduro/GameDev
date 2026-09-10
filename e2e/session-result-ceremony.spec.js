import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerSessionResultQA } from './helpers/setupGame.js';

test('session result modal shows resident aftermath with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerSessionResultQA(page);

  const modal = page.locator('.session-result-modal');
  await expect(modal.getByText(/ROOM SESSION LOGGED/)).toBeVisible();
  await expect(modal.getByText(/Resident Cassidy/)).toBeVisible();
  await expect(modal.getByText(/hosted her on your floor/i)).toBeVisible();
  await expect(modal.getByText(/5,600 cal this session/)).toBeVisible();

  await modal.getByRole('button', { name: 'Continue →' }).click();
  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
