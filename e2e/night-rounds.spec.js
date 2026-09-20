import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('Night Rounds: start, knock Cassidy, pick a choice', async ({ page }) => {
  await completeRaSetup(page);
  await page.getByRole('button', { name: '🏠 Blueprint' }).click();
  await expect(page.getByText(/NIGHT ROUNDS/i).first()).toBeVisible();

  await page.locator('[data-action="start-night-round"]').click();
  await expect(page.getByRole('button', { name: /Knock Cassidy/i })).toBeVisible();

  await page.getByRole('button', { name: /Knock Cassidy/i }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText('NIGHT ROUNDS')).toBeVisible();
  await expect(dialog.getByRole('heading', { name: /Cassidy/ })).toBeVisible();

  const choice = page.getByTestId('night-round-choice').first();
  await expect(choice).toBeVisible();
  await dialog.screenshot({ path: '/opt/cursor/artifacts/screenshots/night_rounds_cassidy.png' });
  await choice.click();
  await expect(dialog.getByRole('button', { name: /Back to the plan/i })).toBeVisible();
});
