import { expect } from '@playwright/test';

/** Complete intro → approach → dorm → fifth resident → RA desk. */
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
  await page.getByRole('button', { name: 'Add a fifth resident →' }).click();

  for (let i = 0; i < 4; i += 1) {
    await page.getByRole('button', { name: 'Next →' }).click();
  }
  await page.getByRole('button', { name: 'Seat her' }).click();

  await expect(page.getByText(`RA DESK — ${dorm.toUpperCase()}`)).toBeVisible();
}

/** Debug: unlock hall lounge dinner skills and jump to Actions. */
export async function unlockDinnerQA(page) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Dinner QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);
}

/** Debug: Cassidy sumo evolved arc + open student detail. */
export async function unlockEvolvedArcQA(page) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Sumo Arc QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);
  await expect(page.getByText('EVOLVED PATH')).toBeVisible();
}

/** Debug: Destiny eating-streamer arc + open student detail. */
export async function unlockStreamArcQA(page) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Stream Arc QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);
  await expect(page.getByText('EVOLVED PATH')).toBeVisible();
}

/** Debug: Chloé salon arc + open student detail. */
export async function unlockSalonArcQA(page) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Salon Arc QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);
  await expect(page.getByText('EVOLVED PATH')).toBeVisible();
}

/** Debug: Fiona gallery arc + open student detail. */
export async function unlockGalleryArcQA(page) {
  await page.getByRole('button', { name: '🐛 Debug' }).click();
  await page.getByRole('button', { name: /Gallery Arc QA/ }).click();
  await page.getByRole('button', { name: '✕ Close' }).click();
  await dismissBlockingModals(page);
  await expect(page.getByText('EVOLVED PATH')).toBeVisible();
}

/** Open a resident from roster; pick origin deck if first contact. */
export async function openResidentDetail(page, name) {
  await page.getByRole('button', { name: '📋 Roster' }).click();
  await page.locator('.roster-tile').filter({ hasText: name }).first().click();
  const origin = page.locator('.origin-pick-modal');
  if (await origin.isVisible().catch(() => false)) {
    await origin.locator('.origin-pick-card').first().click();
  }
  await expect(page.getByText('Personal Actions')).toBeVisible({ timeout: 10_000 });
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

function narrativeModal(page) {
  return page.locator('.hall-pass-modal-in').filter({ hasText: 'NARRATIVE EVENT' });
}

async function isNarrativeOpen(page) {
  return await narrativeModal(page).isVisible().catch(() => false);
}

async function deskHasBlockingOverlay(page) {
  const checks = [
    'NARRATIVE EVENT',
    'RELATIONSHIP MILESTONE',
    'FLOOR CHECK-IN',
    'A THRESHOLD CROSSED',
    'INTERRUPTION',
    'THE WEEK IN REVIEW',
    'HALL REACH EXPANDED',
    "SHE'S HAD ENOUGH",
    'MAKING AMENDS',
    'WEEK PLANNER',
    'A NEW DIRECTION',
    'ROOM SESSION LOGGED',
    'BREW SESSION LOGGED',
    'TASTING SESSION LOGGED',
  ];
  for (const label of checks) {
    if (await page.getByText(label).isVisible().catch(() => false)) return true;
  }
  return false;
}

async function drainNarrativeModal(page, { maxTaps = 96 } = {}) {
  for (let step = 0; step < maxTaps; step += 1) {
    if (!(await isNarrativeOpen(page))) return;
    const modal = narrativeModal(page);
    const nextBeat = modal.getByRole('button', { name: /Tap for next beat/i });
    if (await nextBeat.isVisible().catch(() => false)) {
      await nextBeat.click({ force: true });
      await page.waitForTimeout(30);
      continue;
    }
    const dismissBtn = modal.getByRole('button', { name: 'Dismiss' }).filter({ hasNotText: /Dismissed/i });
    if (await dismissBtn.isVisible().catch(() => false)) {
      await dismissBtn.click({ force: true });
      return;
    }
    const continueBtn = modal.getByRole('button', { name: 'Continue →' }).first();
    if (await continueBtn.isVisible().catch(() => false)) {
      await continueBtn.click({ force: true });
      return;
    }
    await page.waitForTimeout(40);
  }
}

/** Loop resolve until known overlays are gone (or pass limit). */
export async function ensureDeskClear(page, { maxPasses = 20 } = {}) {
  for (let pass = 0; pass < maxPasses; pass += 1) {
    await drainNarrativeModal(page);
    await resolveBlockingUI(page, { maxSteps: 240 });
    if (!(await deskHasBlockingOverlay(page))) return;
  }
}

/** Clear hunger interrupts, milestones, recaps, dorm unlocks, narrative beats. */
export async function resolveBlockingUI(page, { maxSteps = 72 } = {}) {
  for (let step = 0; step < maxSteps; step += 1) {
    let acted = false;

    if (await page.getByText('THE WEEK IN REVIEW').isVisible().catch(() => false)) {
      const recap = page.locator('.week-recap-modal');
      if (await clickIfVisible(recap.getByRole('button', { name: /^Begin Week \d+$/ }))) {
        acted = true;
        continue;
      }
    }

    if (await page.getByText('HALL REACH EXPANDED').isVisible().catch(() => false)) {
      const unlock = page.locator('.hall-unlock-modal');
      if (await clickIfVisible(unlock.getByRole('button', { name: 'View Roster →' }))) {
        acted = true;
        continue;
      }
    }

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

    for (const sessionLabel of ['ROOM SESSION LOGGED', 'BREW SESSION LOGGED', 'TASTING SESSION LOGGED']) {
      if (await page.getByText(sessionLabel).isVisible().catch(() => false)) {
        const modal = page.locator('.hall-pass-modal-in').filter({ hasText: sessionLabel });
        if (await clickIfVisible(modal.getByRole('button', { name: 'Continue →' }))) {
          acted = true;
          break;
        }
        if (await clickIfVisible(modal.getByRole('button', { name: 'Close' }))) {
          acted = true;
          break;
        }
      }
    }
    if (acted) continue;

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

    if (await page.getByText(/SHE'S HAD ENOUGH|MAKING AMENDS/).isVisible().catch(() => false)) {
      const modal = page.locator('.confrontation-modal');
      if (await clickIfVisible(modal.getByRole('button', { name: /Apologize sincerely/ }))) {
        acted = true;
        continue;
      }
      if (await clickIfVisible(modal.getByRole('button', { name: /Stand firm/ }))) {
        acted = true;
        continue;
      }
      if (await clickIfVisible(modal.getByRole('button', { name: /Leave her be/ }))) {
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

    if (await page.getByText('WEEK PLANNER').isVisible().catch(() => false)) {
      if (await clickIfVisible(page.getByRole('button', { name: 'Cancel' }))) {
        acted = true;
        continue;
      }
    }

    if (await isNarrativeOpen(page)) {
      const modal = narrativeModal(page);
      for (let beat = 0; beat < 48; beat += 1) {
        const nextBeat = modal.getByRole('button', { name: /Tap for next beat/i });
        if (await nextBeat.isVisible().catch(() => false)) {
          await nextBeat.click({ force: true });
          acted = true;
          await page.waitForTimeout(25);
          continue;
        }
        const dismissBtn = modal.getByRole('button', { name: 'Dismiss' }).filter({ hasNotText: /Dismissed/i });
        if (await clickIfVisible(dismissBtn)) {
          acted = true;
          break;
        }
        if (await clickIfVisible(modal.getByRole('button', { name: 'Continue →' }).first())) {
          acted = true;
          break;
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
export async function completeFloorCheckIn(page, { leaveUnlockModal = false } = {}) {
  for (let step = 0; step < 32; step += 1) {
    if (await isNarrativeOpen(page)) {
      await drainNarrativeModal(page, { maxTaps: 128 });
    }
    if (await page.getByText('RELATIONSHIP MILESTONE').isVisible().catch(() => false)) {
      await resolveBlockingUI(page, { maxSteps: 24 });
    }
    if (await page.getByText(/SHE'S HAD ENOUGH|MAKING AMENDS/).isVisible().catch(() => false)) {
      await resolveBlockingUI(page, { maxSteps: 24 });
      continue;
    }

    const checkIn = floorCheckInModal(page);
    const checkInOpen = await page.getByText(/FLOOR CHECK-IN/).isVisible().catch(() => false);

    const endWeek = checkIn.getByRole('button', { name: '⏩ End Week' });
    if (await endWeek.isVisible().catch(() => false)) {
      await endWeek.click();
      if (!leaveUnlockModal) await resolveBlockingUI(page, { maxSteps: 160 });
      return;
    }

    const advance = checkIn.getByRole('button', { name: /Continue →|View Summary →/ }).first();
    if (await advance.isVisible().catch(() => false)) {
      await advance.click({ force: true });
      continue;
    }

    const talkCalm = page.getByRole('button', { name: /Talk to her/ });
    if (await talkCalm.isVisible().catch(() => false)) {
      await talkCalm.click();
      continue;
    }

    const respond = checkIn.getByText('How do you respond?');
    if (await respond.isVisible().catch(() => false)) {
      const choice = checkIn.locator('.floor-checkin-choice').first();
      if (await choice.isVisible().catch(() => false)) {
        await choice.click({ force: true });
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
  await ensureDeskClear(page, { maxPasses: 24 });
}

/** Advance via Next Week until target week (inclusive). */
export async function advanceToWeek(page, targetWeek) {
  for (let guard = 0; guard < 80; guard += 1) {
    const current = await getDisplayedWeek(page);
    if (current >= targetWeek) return current;

    let advanced = false;
    const nextWeek = page.getByRole('button', { name: '⏩ Next Week (+5 AP)' });
    for (let attempt = 0; attempt < 12; attempt += 1) {
      await ensureDeskClear(page, { maxPasses: 24 });
      while (await isNarrativeOpen(page)) {
        await drainNarrativeModal(page, { maxTaps: 64 });
      }
      if (await deskHasBlockingOverlay(page)) {
        await page.waitForTimeout(120);
        continue;
      }
      try {
        await nextWeek.click({ timeout: 8_000 });
        advanced = true;
        break;
      } catch {
        await drainNarrativeModal(page, { maxTaps: 96 });
        await page.waitForTimeout(150);
      }
    }
    if (!advanced) {
      throw new Error(`Next Week blocked after clear attempts (week ${await getDisplayedWeek(page)})`);
    }
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
