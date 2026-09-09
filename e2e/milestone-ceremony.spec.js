import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerMilestoneQA } from './helpers/setupGame.js';

test('milestone ceremony shows threshold crossed modal with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerMilestoneQA(page);

  const modal = page.locator('.milestone-ceremony-modal');
  await expect(modal.getByText('A THRESHOLD CROSSED')).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByText(/crossed a weight threshold on your floor/i)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
