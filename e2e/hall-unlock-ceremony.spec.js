import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerHallUnlockQA } from './helpers/setupGame.js';

test('hall unlock modal shows RA dorm framing via debug QA', async ({ page }) => {
  await completeRaSetup(page);
  await triggerHallUnlockQA(page);

  const modal = page.locator('.hall-unlock-modal');
  await expect(modal.getByText('HALL REACH EXPANDED')).toBeVisible();
  await expect(modal.getByText(/Scholar's Rest/i).first()).toBeVisible();
  await expect(modal.getByText(/New residents from/i)).toBeVisible();
  await expect(modal.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await modal.getByRole('button', { name: 'View Roster →' }).click();
  await expect(modal).toHaveCount(0);
});
