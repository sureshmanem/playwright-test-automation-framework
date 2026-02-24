/**
 * Generic Step Definitions — Checkbox & Radio
 *
 * Standard Gherkin steps for checkbox and radio button interactions.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Then } = createBdd(test);

// ─── Check / Uncheck ─────────────────────────────────────────────────────

When('I check {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.check(elementName, pageName);
});

When('I check the {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.check(elementName, pageName);
});

When('I uncheck {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.uncheck(elementName, pageName);
});

When('I uncheck the {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.uncheck(elementName, pageName);
});

// ─── Assertions ──────────────────────────────────────────────────────────

Then('{string} should be checked on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertChecked(elementName, pageName);
});

Then('{string} should be unchecked on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertUnchecked(elementName, pageName);
});
