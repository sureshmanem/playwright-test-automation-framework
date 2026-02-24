/**
 * Generic Step Definitions — Navigation
 *
 * Standard Gherkin steps for all navigation operations.
 * These are framework-level; project teams simply write feature files.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

// ─── Direct URL Navigation ──────────────────────────────────────────────

Given('I navigate to {string}', async ({ actionUtils }, url: string) => {
  await actionUtils.navigateTo(url);
});

Given('I navigate to the URL {string}', async ({ actionUtils }, url: string) => {
  await actionUtils.navigateTo(url);
});

Given('I am on the {string} page', async ({ actionUtils }, path: string) => {
  await actionUtils.navigateToPath(`/${path.toLowerCase().replace(/\s+/g, '-')}`);
});

When('I open the URL {string}', async ({ actionUtils }, url: string) => {
  await actionUtils.navigateTo(url);
});

// ─── Relative Path Navigation ────────────────────────────────────────────

When('I navigate to the path {string}', async ({ actionUtils }, path: string) => {
  await actionUtils.navigateToPath(path);
});

// ─── Page Reload & History ───────────────────────────────────────────────

When('I reload the page', async ({ actionUtils }) => {
  await actionUtils.reloadPage();
});

When('I refresh the page', async ({ actionUtils }) => {
  await actionUtils.reloadPage();
});

When('I go back', async ({ actionUtils }) => {
  await actionUtils.goBack();
});

When('I go forward', async ({ actionUtils }) => {
  await actionUtils.goForward();
});
