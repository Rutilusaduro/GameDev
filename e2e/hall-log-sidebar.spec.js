import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerHallUnlockQA } from './helpers/setupGame.js';

test('hall log story/ledger tabs and clear story beats', async ({ page }) => {
  await completeRaSetup(page);

  await expect(page.getByRole('button', { name: /📖 Story/ })).toBeVisible();
  await expect(page.getByRole('button', { name: /📊 Ledger/ })).toBeVisible();
  await expect(page.locator('.hall-log-scroll')).toBeVisible();

  await page.getByRole('button', { name: /📊 Ledger/ }).click();
  await page.getByRole('button', { name: /📖 Story/ }).click();

  await triggerHallUnlockQA(page);
  await page.locator('.hall-unlock-modal').getByRole('button', { name: 'View Roster →' }).click();

  await expect(page.getByRole('button', { name: 'Clear story beats' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear story beats' }).click();
  await expect(page.getByText("Nothing's happened yet — feed a resident.")).toBeVisible();
});
