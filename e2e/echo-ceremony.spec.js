import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerEchoQA } from './helpers/setupGame.js';

test('echo modal replays body memory with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerEchoQA(page);

  const modal = page.locator('.echo-modal');
  await expect(modal.getByText('Body Echo Archive')).toBeVisible();
  await expect(modal.getByText(/Stage Ascension/)).toBeVisible();
  await expect(modal.getByText(/crossing into Heavy on your floor/i)).toBeVisible();
  await expect(modal.getByRole('button', { name: /Resonate — deepen her growth/ })).toBeVisible();

  await modal.getByRole('button', { name: 'Close' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
