/**
 * Generic Step Definitions — Dialog Handling
 *
 * Steps for accepting/dismissing browser dialogs (alert, confirm, prompt).
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Given } = createBdd(test);

// ─── Accept Dialog ───────────────────────────────────────────────────────

Given('I will accept the next dialog', async ({ actionUtils }) => {
  await actionUtils.acceptDialog();
});

When('I accept the dialog', async ({ actionUtils }) => {
  await actionUtils.acceptDialog();
});

// ─── Dismiss Dialog ──────────────────────────────────────────────────────

Given('I will dismiss the next dialog', async ({ actionUtils }) => {
  await actionUtils.dismissDialog();
});

When('I dismiss the dialog', async ({ actionUtils }) => {
  await actionUtils.dismissDialog();
});

// ─── Accept with Input ───────────────────────────────────────────────────

When('I accept the dialog with {string}', async ({ actionUtils }, text: string) => {
  await actionUtils.acceptDialogWithText(text);
});
