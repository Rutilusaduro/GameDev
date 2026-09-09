import { test, expect } from '@playwright/test';
import { completeRaSetup, dismissBlockingModals, unlockDinnerQA } from './helpers/setupGame.js';

test('group dinner playthrough: picker → venue → feed → end evening', async ({ page }) => {
  await completeRaSetup(page);
  await unlockDinnerQA(page);

  await page.getByText('👥 Arrange Group Dinner', { exact: true }).locator('..').getByRole('button', { name: 'Use Action' }).click();

  const picker = page.locator('.group-dinner-picker-modal');
  await picker.locator('.group-dinner-picker-row').filter({ hasText: 'Brittany' }).click();
  await picker.locator('.group-dinner-picker-row').filter({ hasText: 'Cassidy' }).click();
  await picker.getByRole('button', { name: 'Confirm →' }).click();

  const groupModal = page.locator('.group-dinner-modal');
  await expect(groupModal.getByText('GROUP DINNER')).toBeVisible();
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);

  await groupModal.locator('.dinner-venue-choice-row').filter({ hasText: 'Campus Bistro' }).click();
  await expect(groupModal.getByText('Menu', { exact: true })).toBeVisible();

  for (let i = 0; i < 10; i += 1) {
    const feedBtn = groupModal.getByRole('button', { name: /^Feed / }).first();
    if (!(await feedBtn.isVisible().catch(() => false))) break;
    await feedBtn.click();
    await page.waitForTimeout(120);
  }

  await expect(groupModal.getByText(/cal total/i)).toBeVisible();
  await groupModal.getByRole('button', { name: 'End Evening ✓' }).click();
  await expect(page.locator('.group-dinner-modal')).toHaveCount(0);
  await dismissBlockingModals(page);
});

test('group dinner venue picker dismisses on Escape', async ({ page }) => {
  await completeRaSetup(page);
  await unlockDinnerQA(page);

  await page.getByText('👥 Arrange Group Dinner', { exact: true }).locator('..').getByRole('button', { name: 'Use Action' }).click();

  const picker = page.locator('.group-dinner-picker-modal');
  await picker.locator('.group-dinner-picker-row').filter({ hasText: 'Brittany' }).click();
  await picker.locator('.group-dinner-picker-row').filter({ hasText: 'Serena' }).click();
  await picker.getByRole('button', { name: 'Confirm →' }).click();

  await expect(page.locator('.group-dinner-modal').getByText('GROUP DINNER')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.group-dinner-modal')).toHaveCount(0);
});
