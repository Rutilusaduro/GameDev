import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerHungerInterruptQA } from './helpers/setupGame.js';

test('hunger interrupt modal shows hall craving with resident framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerHungerInterruptQA(page);

  const modal = page.locator('.hunger-interrupt-modal');
  await expect(modal.getByText('HALL CRAVING')).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByRole('button', { name: /Get Cassidy fed/ })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
