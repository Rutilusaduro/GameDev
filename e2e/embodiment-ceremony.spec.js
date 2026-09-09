import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerEmbodimentQA } from './helpers/setupGame.js';

test('embodiment modal lets RA slip inside resident with campus walk framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerEmbodimentQA(page);

  const modal = page.locator('.embodiment-modal');
  await expect(modal.getByText('Floor Influence · Campus Pilot')).toBeVisible();
  await expect(modal.getByText(/Ride along with Cassidy/)).toBeVisible();
  await expect(modal.getByRole('button', { name: 'Slip Inside — Begin Campus Walk' })).toBeVisible();

  await modal.getByRole('button', { name: 'Slip Inside — Begin Campus Walk' }).click();

  await expect(modal.getByRole('button', { name: 'Release — Return to RA Desk' })).toBeVisible();
  await modal.getByRole('button', { name: 'Release — Return to RA Desk' }).click();
  await modal.getByRole('button', { name: 'Close' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
