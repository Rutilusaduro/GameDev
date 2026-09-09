import { test, expect } from '@playwright/test';
import {
  completeRaSetup,
  dismissBlockingModals,
  openResidentDetail,
  unlockDinnerQA,
} from './helpers/setupGame.js';

test('1-on-1 dinner triggers EVENING ENDS popup at capacity', async ({ page }) => {
  await completeRaSetup(page);
  await unlockDinnerQA(page);

  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: '⚖️ All 300 lbs' }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);

  await openResidentDetail(page, 'Cassidy');
  await page.getByText('🍷 Take to Dinner', { exact: true }).click();

  const dinnerModal = page.locator('.dinner-out-modal');
  await dinnerModal.locator('.dinner-venue-choice-row').filter({ hasText: 'Campus Bistro' }).click();

  for (let i = 0; i < 24; i += 1) {
    if (await page.getByText('EVENING ENDS').isVisible().catch(() => false)) break;
    const endBtn = dinnerModal.getByRole('button', { name: 'End Evening ✓' });
    if (await endBtn.isVisible().catch(() => false)) {
      await endBtn.click();
      break;
    }
    const dish = dinnerModal.locator('.dinner-dish-choice-row').first();
    if (await dish.isVisible().catch(() => false)) {
      await dish.click();
      await page.waitForTimeout(150);
      continue;
    }
    const callMore = dinnerModal.getByRole('button', { name: /Call for More/ });
    if (await callMore.isVisible().catch(() => false)) {
      await callMore.click();
      await page.waitForTimeout(150);
      continue;
    }
    const pantry = dinnerModal.getByRole('button', { name: /Weight-Gain Shake/ });
    if (await pantry.isVisible().catch(() => false)) {
      await pantry.click();
      await page.waitForTimeout(150);
      continue;
    }
    const pushCap = dinnerModal.getByRole('button', { name: /Push past capacity/ });
    if (await pushCap.isVisible().catch(() => false)) {
      await pushCap.click();
      await page.waitForTimeout(150);
      continue;
    }
    break;
  }

  const eveningEnd = page.locator('.dinner-end-modal');
  await expect(eveningEnd.getByText('EVENING ENDS', { exact: true }).first()).toBeVisible({ timeout: 15_000 });
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
  await eveningEnd.getByRole('button', { name: 'Continue →' }).click();
  await expect(page.locator('.dinner-end-modal')).toHaveCount(0);
});
