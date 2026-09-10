import { test, expect } from '@playwright/test';
import { completeRaSetup } from './helpers/setupGame.js';

const DORM_CASES = [
  { dorm: 'Victory Hall', resident: 'Cassidy' },
  { dorm: "Scholar's Rest", resident: 'Priya' },
  { dorm: 'Rosewood House', resident: 'Chloé' },
  { dorm: 'The Annex', resident: 'Destiny' },
];

for (const { dorm, resident } of DORM_CASES) {
  test(`${dorm}: setup wizard lands on RA desk with home residents`, async ({ page }) => {
    await completeRaSetup(page, { dorm });
    await expect(page.getByText(`RA DESK — ${dorm.toUpperCase()}`)).toBeVisible();
    await expect(page.getByText(resident)).toBeVisible();
    await expect(page.getByText('Professor Sim')).toHaveCount(0);
    await expect(page.getByText('Madeline')).toHaveCount(0);
    await expect(page.getByText(/spirit|classroom/i)).toHaveCount(0);
  });
}
