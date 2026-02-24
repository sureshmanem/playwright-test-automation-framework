/**
 * Generic Step Definitions — Dropdown & Selection
 *
 * Standard Gherkin steps for select/dropdown interactions.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When } = createBdd(test);

// ─── Select by Visible Text (Label) ─────────────────────────────────────

When('I select {string} from {string} on {string}', async ({ actionUtils }, label: string, elementName: string, pageName: string) => {
  await actionUtils.selectByLabel(elementName, pageName, label);
});

When('I select the option {string} from {string} on {string}', async ({ actionUtils }, label: string, elementName: string, pageName: string) => {
  await actionUtils.selectByLabel(elementName, pageName, label);
});

// ─── Select by Value ─────────────────────────────────────────────────────

When('I select by value {string} from {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.selectByValue(elementName, pageName, value);
});

// ─── Select by Index ─────────────────────────────────────────────────────

When('I select option {int} from {string} on {string}', async ({ actionUtils }, index: number, elementName: string, pageName: string) => {
  await actionUtils.selectByIndex(elementName, pageName, index);
});
