import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerFloorInfluenceQA } from './helpers/setupGame.js';

test('floor influence hub opens with resident ride framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerFloorInfluenceQA(page);

  await expect(page.getByText('Floor Influence').first()).toBeVisible();
  await expect(page.getByText(/CAMPUS PILOT/i)).toBeVisible();
  await expect(page.getByText(/Resident Ride/i).first()).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
