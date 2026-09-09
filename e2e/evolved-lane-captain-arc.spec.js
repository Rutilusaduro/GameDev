import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockLaneCaptainArcQA } from './helpers/setupGame.js';

test('lane captain arc opens case study grid', async ({ page }) => {
  await completeRaSetup(page);
  await unlockLaneCaptainArcQA(page);

  await page.getByRole('button', { name: /Conduct Case Study/ }).click();

  const modal = page.locator('.community-researcher-modal');
  await expect(modal.getByText('CASE STUDY 1 OF 4')).toBeVisible();
  await expect(modal.getByText('Select a Case Study')).toBeVisible();
  await expect(modal.getByText('MJ, Fiona & Yuki')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
