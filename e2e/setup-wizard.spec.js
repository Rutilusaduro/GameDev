import { test, expect } from '@playwright/test';

test('RA setup wizard → Victory Hall → RA desk', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hall Pass' })).toBeVisible();
  await expect(page.getByText('RESIDENCE LIFE SIMULATOR')).toBeVisible();
  await expect(page.getByText('You are not faculty')).toBeVisible();

  await page.getByRole('button', { name: 'Meet the RA →' }).click();

  await expect(page.getByText('How do you run your hall?')).toBeVisible();
  await page.getByRole('button', { name: /The Instigator/ }).click();
  await page.getByRole('button', { name: 'Choose your hall →' }).click();

  await expect(page.getByText('Which hall do you take?')).toBeVisible();
  await page.getByRole('button', { name: /Victory Hall/ }).click();
  await page.getByRole('button', { name: 'Add a suitemate →' }).click();

  await expect(page.getByText('Your Fifth Suitemate')).toBeVisible();
  for (let i = 0; i < 4; i += 1) {
    await page.getByRole('button', { name: 'Next →' }).click();
  }
  await page.getByRole('button', { name: 'Seat her' }).click();

  await expect(page.getByText('RA DESK — VICTORY HALL')).toBeVisible();
  await expect(page.getByRole('button', { name: '📋 Roster' })).toBeVisible();
  await expect(page.getByRole('button', { name: '🏠 Hall Lounge' })).toBeVisible();
  await expect(page.getByRole('button', { name: '✨ Influence' })).toBeVisible();
  await expect(page.getByText('Cassidy')).toBeVisible();
  await expect(page.getByText('Professor Sim')).toHaveCount(0);
  await expect(page.getByText('Madeline')).toHaveCount(0);
});
