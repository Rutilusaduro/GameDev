import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerFloorCheckInQA } from './helpers/setupGame.js';

test('floor check-in modal shows weekly hall scene with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerFloorCheckInQA(page);

  const modal = page.locator('.floor-checkin-modal');
  await expect(modal.getByText(/FLOOR CHECK-IN/)).toBeVisible();
  await expect(modal.getByText('Training Spiral')).toBeVisible();
  await expect(modal.getByText('How do you respond?')).toBeVisible();

  await modal.locator('.floor-checkin-choice').first().click({ force: true });
  await modal.getByRole('button', { name: /Continue →|View Summary →/ }).click({ force: true });

  await expect(modal.getByText("Check-In Wrapped")).toBeVisible();
  await expect(modal.getByRole('button', { name: '⏩ End Week' })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
