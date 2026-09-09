import { expect } from '@playwright/test';

/** Complete intro → approach → dorm → suitemate → RA desk. */
export async function completeRaSetup(page, {
  approach = 'The Instigator',
  dorm = 'Victory Hall',
  skipGoto = false,
} = {}) {
  if (!skipGoto) await page.goto('/');

  await expect(page.getByRole('heading', { name: 'Hall Pass' })).toBeVisible();
  await page.getByRole('button', { name: 'Meet the RA →' }).click();

  await page.getByRole('button', { name: new RegExp(approach) }).click();
  await page.getByRole('button', { name: 'Choose your hall →' }).click();
  await page.getByRole('button', { name: new RegExp(dorm) }).click();
  await page.getByRole('button', { name: 'Add a suitemate →' }).click();

  for (let i = 0; i < 4; i += 1) {
    await page.getByRole('button', { name: 'Next →' }).click();
  }
  await page.getByRole('button', { name: 'Seat her' }).click();

  await expect(page.getByText(`RA DESK — ${dorm.toUpperCase()}`)).toBeVisible();
}

/** Walk floor check-in modal through choices → End Week (if shown). */
export async function completeFloorCheckIn(page) {
  for (let step = 0; step < 24; step += 1) {
    const endWeek = page.getByRole('button', { name: '⏩ End Week' });
    if (await endWeek.isVisible().catch(() => false)) {
      await endWeek.click();
      return;
    }

    const advance = page.getByRole('button', { name: /Continue →|View Summary →/ });
    if (await advance.isVisible().catch(() => false)) {
      await advance.click();
      continue;
    }

    const talkCalm = page.getByRole('button', { name: /Talk to her/ });
    if (await talkCalm.isVisible().catch(() => false)) {
      await talkCalm.click();
      continue;
    }

    const respond = page.getByText('How do you respond?');
    if (await respond.isVisible().catch(() => false)) {
      const choice = page.locator('div[style*="cursor: pointer"]').filter({ has: page.locator('div') }).first();
      await choice.click();
      continue;
    }

    const checkIn = page.getByText(/FLOOR CHECK-IN/);
    if (!(await checkIn.isVisible().catch(() => false))) return;

    await page.waitForTimeout(150);
  }

  throw new Error('Floor check-in did not finish within step limit');
}
