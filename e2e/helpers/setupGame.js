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

async function clickIfVisible(locator) {
  if (await locator.isVisible().catch(() => false)) {
    await locator.click();
    return true;
  }
  return false;
}

function floorCheckInModal(page) {
  return page.locator('.hall-pass-modal-in').filter({ hasText: 'FLOOR CHECK-IN' });
}

/** Clear hunger interrupts, milestones, recaps, dorm unlocks, narrative beats. */
export async function resolveBlockingUI(page, { maxSteps = 72 } = {}) {
  for (let step = 0; step < maxSteps; step += 1) {
    let acted = false;

    if (await clickIfVisible(page.getByRole('button', { name: 'View Roster →' }))) {
      acted = true;
      await page.waitForTimeout(40);
      continue;
    }

    if (await clickIfVisible(page.getByRole('button', { name: /^Begin Week \d+$/ }))) {
      acted = true;
      await page.waitForTimeout(40);
      continue;
    }

    if (await page.getByText('RELATIONSHIP MILESTONE').isVisible().catch(() => false)) {
      const modal = page.locator('.hall-pass-modal-in').filter({ hasText: 'RELATIONSHIP MILESTONE' });
      if (await clickIfVisible(modal.getByRole('button', { name: 'Continue →' }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('A NEW DIRECTION').isVisible().catch(() => false)) {
      if (await clickIfVisible(page.getByRole('button', { name: 'Not yet' }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('SESSION COMPLETE').isVisible().catch(() => false)) {
      const modal = page.locator('.hall-pass-modal-in').filter({ hasText: 'SESSION COMPLETE' });
      if (await clickIfVisible(modal.getByRole('button', { name: 'Continue →' }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('A THRESHOLD CROSSED').isVisible().catch(() => false)) {
      if (await clickIfVisible(page.getByRole('button', { name: 'Skip remaining' }))) {
        acted = true;
        continue;
      }
      const milestoneModal = page.locator('.hall-pass-modal-in').filter({ hasText: 'A THRESHOLD CROSSED' });
      const nextBeat = milestoneModal.getByRole('button', { name: /Tap for next beat/i });
      if (await nextBeat.isVisible().catch(() => false)) {
        await nextBeat.click();
        acted = true;
        continue;
      }
      if (await clickIfVisible(milestoneModal.getByRole('button', { name: 'Take her in' }))) {
        acted = true;
        continue;
      }
      if (await clickIfVisible(milestoneModal.getByRole('button', { name: 'Next →' }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('INTERRUPTION').isVisible().catch(() => false)) {
      if (await clickIfVisible(page.getByRole('button', { name: /Talk to her/ }))) {
        acted = true;
        continue;
      }
      if (await clickIfVisible(page.getByRole('button', { name: 'Feed her' }))) {
        acted = true;
        continue;
      }
      if (await clickIfVisible(page.getByRole('button', { name: /Turn her away/ }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('NARRATIVE EVENT').isVisible().catch(() => false)) {
      const narrativeModal = page.locator('.hall-pass-modal-in').filter({ hasText: 'NARRATIVE EVENT' });
      for (let beat = 0; beat < 32; beat += 1) {
        if (await clickIfVisible(narrativeModal.getByRole('button', { name: 'Dismiss' }))) {
          acted = true;
          break;
        }
        if (await clickIfVisible(narrativeModal.getByRole('button', { name: 'Continue →' }))) {
          acted = true;
          break;
        }
        const proseBeat = narrativeModal.locator('button').filter({
          hasNotText: /Tap for next beat|Transcript|Dismiss|Continue/,
        }).first();
        if (await proseBeat.isVisible().catch(() => false)) {
          await proseBeat.click({ force: true });
          acted = true;
          await page.waitForTimeout(25);
          continue;
        }
        const nextBeat = narrativeModal.getByRole('button', { name: /Tap for next beat/i });
        if (await nextBeat.isVisible().catch(() => false)) {
          await nextBeat.click({ force: true });
          acted = true;
          await page.waitForTimeout(25);
          continue;
        }
        break;
      }
      if (acted) continue;
    }

    if (await clickIfVisible(page.getByRole('button', { name: /Talk to her/ }))) {
      acted = true;
      continue;
    }

    if (!acted) break;
    await page.waitForTimeout(50);
  }
}

/** Walk floor check-in modal through choices → End Week (if shown). */
export async function completeFloorCheckIn(page) {
  for (let step = 0; step < 32; step += 1) {
    if (await page.getByText('RELATIONSHIP MILESTONE').isVisible().catch(() => false)) {
      await resolveBlockingUI(page, { maxSteps: 12 });
    }

    const checkIn = floorCheckInModal(page);
    const checkInOpen = await page.getByText(/FLOOR CHECK-IN/).isVisible().catch(() => false);

    const endWeek = checkIn.getByRole('button', { name: '⏩ End Week' });
    if (await endWeek.isVisible().catch(() => false)) {
      await endWeek.click();
      await resolveBlockingUI(page, { maxSteps: 160 });
      return;
    }

    const advance = checkIn.getByRole('button', { name: /Continue →|View Summary →/ });
    if (await advance.isVisible().catch(() => false)) {
      await advance.click();
      continue;
    }

    const talkCalm = page.getByRole('button', { name: /Talk to her/ });
    if (await talkCalm.isVisible().catch(() => false)) {
      await talkCalm.click();
      continue;
    }

    const respond = checkIn.getByText('How do you respond?');
    if (await respond.isVisible().catch(() => false)) {
      const choice = checkIn.locator('div[style*="cursor"]').filter({ hasText: /❤|⚖|→/ }).first();
      if (await choice.isVisible().catch(() => false)) {
        await choice.click();
        continue;
      }
    }

    if (!checkInOpen) return;

    await page.waitForTimeout(120);
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
  await resolveBlockingUI(page);
}

/** Advance via Next Week until target week (inclusive). */
export async function advanceToWeek(page, targetWeek) {
  for (let guard = 0; guard < 80; guard += 1) {
    const current = await getDisplayedWeek(page);
    if (current >= targetWeek) return current;

    await resolveBlockingUI(page);
    await page.getByRole('button', { name: '⏩ Next Week (+5 AP)' }).click();
    await completeFloorCheckIn(page);
    await resolveBlockingUI(page, { maxSteps: 160 });
    await page.waitForTimeout(80);
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
