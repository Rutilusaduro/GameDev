import { test, expect } from '@playwright/test';
import { completeRaSetup, unlockLaneCaptainArcQA } from './helpers/setupGame.js';

test('lane captain panel review routes to hall log defense minigame', async ({ page }) => {
  await completeRaSetup(page);
  await unlockLaneCaptainArcQA(page);

  await page.getByRole('button', { name: /Athletics Panel Review/ }).click();

  const eventModal = page.locator('.evolved-event-modal');
  await expect(eventModal.getByText('WEEK 3: INITIAL DATA')).toBeVisible();
  await eventModal.getByRole('button', { name: /Help her frame the preliminary findings/ }).click();
  await eventModal.getByRole('button', { name: /Take her to eat beforehand/ }).click();
  await eventModal.getByRole('button', { name: /Begin the Defense/ }).click();

  const defense = page.locator('.picker-modal');
  await expect(defense.getByText('HALL LOG FOCUS')).toBeVisible();
  await expect(defense.getByText('Panel Review')).toBeVisible();
  await expect(defense.getByText(/Cassidy · \d+ lbs/)).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
