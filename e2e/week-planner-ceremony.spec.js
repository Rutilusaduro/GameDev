import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerWeekPlannerQA } from './helpers/setupGame.js';

test('week planner modal assigns residents with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerWeekPlannerQA(page);

  const modal = page.locator('.week-planner-modal');
  await expect(modal.getByText('WEEK PLANNER')).toBeVisible();
  await expect(modal.getByText(/place your attention/)).toBeVisible();
  await expect(modal.getByText('ROSTER')).toBeVisible();

  await modal.locator('.week-planner-resident-chip').filter({ hasText: 'Cassidy' }).click();
  await modal.getByRole('button', { name: 'Place selected resident here' }).first().click();
  await expect(modal.locator('.week-planner-slot-card').first().getByText(/Cassidy/)).toBeVisible();

  await modal.getByRole('button', { name: 'Lock plan' }).click();
  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
