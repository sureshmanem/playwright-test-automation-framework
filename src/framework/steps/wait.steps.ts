/**
 * Generic Step Definitions — Wait Operations
 *
 * Standard Gherkin steps for explicit waits.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Given } = createBdd(test);

// ─── Wait for Element State ──────────────────────────────────────────────

When('I wait for {string} to be visible on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.waitForElement(elementName, pageName, 'visible');
});

When('I wait for {string} to be hidden on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.waitForElement(elementName, pageName, 'hidden');
});

When('I wait for {string} to appear on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.waitForElement(elementName, pageName, 'visible');
});

When('I wait for {string} to disappear on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.waitForElement(elementName, pageName, 'hidden');
});

// ─── Fixed Wait ──────────────────────────────────────────────────────────

When('I wait for {int} seconds', async ({ actionUtils }, seconds: number) => {
  await actionUtils.waitForTimeout(seconds * 1000);
});

When('I wait for {int} milliseconds', async ({ actionUtils }, ms: number) => {
  await actionUtils.waitForTimeout(ms);
});

// ─── Navigation Wait ─────────────────────────────────────────────────────

When('I wait for the page to load', async ({ actionUtils }) => {
  await actionUtils.waitForNavigation();
});

When('I wait for navigation', async ({ actionUtils }) => {
  await actionUtils.waitForNavigation();
});

When('I wait for the URL to contain {string}', async ({ actionUtils }, urlPart: string) => {
  await actionUtils.waitForURL(new RegExp(urlPart));
});
