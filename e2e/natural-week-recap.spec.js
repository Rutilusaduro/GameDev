import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  triggerDigestionQA,
  completeFloorCheckIn,
  resolveBlockingUI,
} from './helpers/setupGame.js';

test('week recap surfaces naturally after digestion + floor check-in', async ({ page }) => {
  await completeRaSetup(page);
  await triggerDigestionQA(page);

  await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
  await completeFloorCheckIn(page, { leaveCeremonies: true });

  for (let i = 0; i < 48; i += 1) {
    if (await page.getByText('THE WEEK IN REVIEW').isVisible().catch(() => false)) break;
    await resolveBlockingUI(page, { maxSteps: 8 });
    await page.waitForTimeout(80);
  }

  const recap = page.locator('.week-recap-modal');
  await expect(recap.getByText('THE WEEK IN REVIEW')).toBeVisible({ timeout: 20_000 });
  await expect(recap.getByText('What the week made of them')).toBeVisible();
  await expect(recap.locator('.week-recap-card-in').first()).toBeVisible();
  await expect(recap.getByText(/card(s)? from this week's ledger/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await resolveBlockingUI(page, { maxSteps: 120 });
  await expect(page.getByText(/WEEK 2/)).toBeVisible({ timeout: 15_000 });
});
