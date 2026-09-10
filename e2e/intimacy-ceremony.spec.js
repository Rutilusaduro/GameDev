import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerIntimacyQA } from './helpers/setupGame.js';

test('intimacy modal runs resident scene with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerIntimacyQA(page);

  const picker = page.locator('.picker-modal').filter({ hasText: 'INTIMACY' });
  await expect(picker.getByText('INTIMACY')).toBeVisible();
  await expect(picker.getByText('Cassidy', { exact: true })).toBeVisible();

  await picker.getByRole('button', { name: /Her Weight on You/ }).click();

  const scene = page.locator('.picker-modal').filter({ hasText: 'HER WEIGHT ON YOU' });
  await expect(scene.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(scene.locator('.intimacy-choice-row').first()).toBeVisible();

  await scene.getByRole('button', { name: /Wrap your arms around her/ }).click();
  await scene.getByRole('button', { name: /Rock her gently/ }).click();
  await scene.getByRole('button', { name: /Stay quiet/ }).click();

  await scene.getByRole('button', { name: 'Continue ✓' }).click();
  await expect(scene).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
