import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockWifeLessonsArcQA } from './helpers/setupGame.js';

test('wife lessons arc opens lesson picker modal', async ({ page }) => {
  await completeRaSetup(page);
  await unlockWifeLessonsArcQA(page);

  await page.getByRole('button', { name: /Hold Wife Lessons/ }).click();

  const modal = page.locator('.wife-lessons-modal');
  await expect(modal.getByText('WIFE LESSONS')).toBeVisible();
  await expect(modal.getByText("CHOOSE TODAY'S LESSON")).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
