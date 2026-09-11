import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

test('RA setup wizard → Victory Hall → RA desk', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Hall Pass' })).toBeVisible();
  await expect(page.getByText('RESIDENCE LIFE SIMULATOR')).toBeVisible();
  await expect(page.getByText('You are not faculty')).toBeVisible();

  await completeRaSetup(page, { skipGoto: true });
  await expect(page.getByRole('button', { name: '📋 RA Desk' })).toBeVisible();
  await expect(page.getByRole('button', { name: '🏠 Blueprint' })).toBeVisible();
  await expect(page.getByRole('button', { name: '✨ Influence' })).toHaveCount(0);
  await expect(page.getByText('Cassidy').first()).toBeVisible();
  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);
});
