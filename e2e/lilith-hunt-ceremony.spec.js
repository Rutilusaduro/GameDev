import { test, expect } from '@playwright/test';
import { completeRaSetup, DESK_NAV_LABEL, unlockLilithQA } from './helpers/setupGame.js';

test('lilith hunt status and dorm open prefer composed pools', async ({ page }) => {
  await completeRaSetup(page);
  await unlockLilithQA(page);
  await page.getByRole('button', { name: DESK_NAV_LABEL }).click();
  await page.locator('.roster-tile').filter({ hasText: 'Lilith' }).first().click();

  await expect(page.getByText(/FEASTING BEAUTY/i).first()).toBeVisible();
  await expect(page.getByText(/That's her favorite part/i)).toHaveCount(0);
  await expect(page.getByText(/She doesn't go anywhere anymore/i)).toHaveCount(0);
  await expect(page.getByText(/She looks at you the way she looks at food/i)).toHaveCount(0);
  await expect(page.getByText('{unresolved}')).toHaveCount(0);

  await page.getByRole('button', { name: /Go Hunting/ }).click();
  await expect(page.getByText(/HER DORM · ROOM 312/)).toBeVisible();
  await expect(page.getByText(/The door clicks shut behind you/i)).toHaveCount(0);
  await expect(page.getByText(/Lilith's dark eyes gleamed/i)).toHaveCount(0);
  await expect(page.getByText(/You've been thinking about this one for a while/i)).toHaveCount(0);
  await expect(page.getByText('{unresolved}')).toHaveCount(0);
  await page.getByText(/hunger can find what it needs|Room 312 behind you/i).first().screenshot({ path: '/opt/cursor/artifacts/screenshots/lilith_hunt_composed_open.png' });
});
