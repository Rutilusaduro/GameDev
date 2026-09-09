import { test, expect } from '@playwright/test';
import { completeRaSetup, triggerTalkQA } from './helpers/setupGame.js';

test('talk modal shows resident conversation with RA framing', async ({ page }) => {
  await completeRaSetup(page);
  await triggerTalkQA(page);

  const modal = page.locator('.talk-modal');
  await expect(modal.getByText('TALKING WITH')).toBeVisible();
  await expect(modal.getByText('Cassidy', { exact: true })).toBeVisible();
  await expect(modal.getByText('CONVERSATION')).toBeVisible();

  await modal.getByRole('button', { name: 'Check in' }).click();
  await expect(modal.getByRole('button', { name: '← Back to topics' })).toBeVisible();
  await expect(modal.locator('.flagged-prose, [style*="pre-wrap"]').first()).not.toBeEmpty();

  await modal.getByRole('button', { name: '← Back to topics' }).click();
  await modal.getByRole('button', { name: '✕ Close' }).click();

  await expect(modal).toHaveCount(0);
  await expect(page.getByText(/professor|spirit|classroom/i)).toHaveCount(0);
});
