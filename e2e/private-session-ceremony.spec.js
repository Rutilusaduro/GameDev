import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerPrivateSessionQA } from './helpers/setupGame.js';

test('private session modal runs resident feeding with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerPrivateSessionQA(page);

  const modal = page.locator('.private-session-modal');
  await expect(modal.getByText(/PRIVATE SESSION/)).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByText(/Where are you taking Cassidy tonight/)).toBeVisible();

  await modal.getByText(/After Hours — Lounge/).click();
  await expect(modal.getByText('Charcuterie & Bread')).toBeVisible();

  await modal.getByText('Charcuterie & Bread').click();
  await modal.getByRole('button', { name: 'End Session ✓' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
