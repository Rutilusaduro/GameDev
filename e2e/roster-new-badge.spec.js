import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerRosterNewQA } from './helpers/setupGame.js';

test('roster tile shows NEW badge when resident unlocks this week', async ({ page }) => {
  await completeRaSetup(page);
  await triggerRosterNewQA(page);

  const priyaTile = page.locator('.roster-tile').filter({ hasText: 'Priya' }).first();
  await expect(priyaTile).toHaveClass(/roster-tile-new/);
  await expect(priyaTile.getByText('NEW', { exact: true })).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
