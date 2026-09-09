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

export async function getDisplayedWeek(page) {
  const text = await page.getByText(/\bWEEK \d+\b/).first().textContent();
  const match = text.match(/WEEK (\d+)/);
  if (!match) throw new Error(`Could not parse week from: ${text}`);
  return parseInt(match[1], 10);
}

/** Dismiss hunger interrupt or narrative modals that block the desk. */
export async function dismissBlockingModals(page) {
  for (let step = 0; step < 32; step += 1) {
    if (await page.getByText('NARRATIVE EVENT').isVisible().catch(() => false)) {
      const dismiss = page.getByRole('button', { name: 'Dismiss' });
      if (await dismiss.isVisible().catch(() => false)) {
        await dismiss.click();
        await page.waitForTimeout(60);
        continue;
      }
      const nextBeat = page.getByRole('button', { name: /Tap for next beat/i });
      if (await nextBeat.isVisible().catch(() => false)) {
        for (let beat = 0; beat < 8; beat += 1) {
          if (!(await nextBeat.isVisible().catch(() => false))) break;
          await nextBeat.click();
          await page.waitForTimeout(35);
        }
        continue;
      }
      const continueBtn = page.getByRole('button', { name: 'Continue →' });
      if (await continueBtn.isVisible().catch(() => false)) {
        await continueBtn.click();
        await page.waitForTimeout(60);
        continue;
      }
      await page.waitForTimeout(80);
      continue;
    }

    const talkCalm = page.getByRole('button', { name: /Talk to her/ });
    if (await talkCalm.isVisible().catch(() => false)) {
      await talkCalm.click();
      continue;
    }

    break;
  }
}

/** Advance via Next Week until target week (inclusive). */
export async function advanceToWeek(page, targetWeek) {
  for (let guard = 0; guard < 40; guard += 1) {
    const current = await getDisplayedWeek(page);
    if (current >= targetWeek) return current;

    await dismissBlockingModals(page);
    await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
    await completeFloorCheckIn(page);
    await dismissBlockingModals(page);
    await page.waitForTimeout(100);
  }

  throw new Error(`Failed to reach week ${targetWeek} (stuck at ${await getDisplayedWeek(page)})`);
}

/** Debug console: set week without syncing hall unlocks. */
export async function setWeekViaDebug(page, targetWeek) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await expect(page.getByText('DEBUG CONSOLE')).toBeVisible();
  const weekInput = page.locator('label').filter({ hasText: 'Week:' }).locator('input[type="number"]');
  await weekInput.fill(String(targetWeek));
  await weekInput.dispatchEvent('change');
  await page.getByRole('button', { name: '✕ Close' }).click();
  await expect(page.getByText(new RegExp(`WEEK ${targetWeek}`))).toBeVisible();
}
