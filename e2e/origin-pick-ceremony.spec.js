import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerOriginPickQA } from './helpers/setupGame.js';

test('origin pick modal locks Cassidy backstory with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerOriginPickQA(page);

  const modal = page.locator('.origin-pick-modal');
  await expect(modal.getByText('ORIGIN DECK')).toBeVisible();
  await expect(modal.getByText('Cassidy: first meaningful contact')).toBeVisible();
  await expect(modal.getByText('Protocol subject zero')).toBeVisible();
  await expect(modal.getByText('Hidden dorm binge arc')).toBeVisible();
  await expect(modal.getByText(/Methodology begins at home/i)).toHaveCount(0);
  await modal.screenshot({ path: '/opt/cursor/artifacts/screenshots/origin_pick_composed_voice.png' });

  await modal.locator('.origin-pick-card').filter({ hasText: 'Protocol subject zero' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/origin is locked/i)).toBeVisible();
  await expect(page.getByText('Personal Actions')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
