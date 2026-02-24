/**
 * Generic Step Definitions — Click Actions
 *
 * Standard Gherkin steps for click interactions.
 * Pattern: I click "<ElementName>" on "<PageName>"
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When } = createBdd(test);

// ─── Single Click ────────────────────────────────────────────────────────

When('I click {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.click(elementName, pageName);
});

When('I click on {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.click(elementName, pageName);
});

When('I click the {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.click(elementName, pageName);
});

// ─── Double Click ────────────────────────────────────────────────────────

When('I double click {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.doubleClick(elementName, pageName);
});

When('I double click on {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.doubleClick(elementName, pageName);
});

// ─── Right Click ─────────────────────────────────────────────────────────

When('I right click {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.rightClick(elementName, pageName);
});

When('I right click on {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.rightClick(elementName, pageName);
});

// ─── Force Click ─────────────────────────────────────────────────────────

When('I force click {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.forceClick(elementName, pageName);
});
