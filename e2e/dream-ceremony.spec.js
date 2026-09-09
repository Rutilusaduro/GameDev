import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerDreamQA } from './helpers/setupGame.js';

test('dream modal runs appetite dream with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerDreamQA(page);

  const modal = page.locator('.dream-modal');
  await expect(modal.getByText('Appetite Dream')).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Eat until the room dissolves' })).toBeVisible();

  await modal.getByRole('button', { name: 'Eat until the room dissolves' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
