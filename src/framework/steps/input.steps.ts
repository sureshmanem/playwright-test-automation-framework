/**
 * Generic Step Definitions — Input Actions
 *
 * Standard Gherkin steps for text input, clearing fields, and key presses.
 * Pattern: I enter "<value>" in "<ElementName>" on "<PageName>"
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When } = createBdd(test);

// ─── Fill / Type ─────────────────────────────────────────────────────────

When('I enter {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.fill(elementName, pageName, value);
});

When('I type {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.fill(elementName, pageName, value);
});

When('I fill {string} with {string} on {string}', async ({ actionUtils }, elementName: string, value: string, pageName: string) => {
  await actionUtils.fill(elementName, pageName, value);
});

When('I input {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.fill(elementName, pageName, value);
});

// ─── Clear and Fill ──────────────────────────────────────────────────────

When('I clear and enter {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.clearAndFill(elementName, pageName, value);
});

When('I clear and type {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.clearAndFill(elementName, pageName, value);
});

// ─── Clear Only ──────────────────────────────────────────────────────────

When('I clear {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.clear(elementName, pageName);
});

When('I clear the {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.clear(elementName, pageName);
});

// ─── Key Presses ─────────────────────────────────────────────────────────

When('I press {string}', async ({ actionUtils }, key: string) => {
  await actionUtils.pressKey(key);
});

When('I press {string} on {string} on {string}', async ({ actionUtils }, key: string, elementName: string, pageName: string) => {
  await actionUtils.pressKeyOnElement(elementName, pageName, key);
});

When('I press the {string} key', async ({ actionUtils }, key: string) => {
  await actionUtils.pressKey(key);
});

// ─── Type with delay (character by character) ────────────────────────────

When('I slowly type {string} in {string} on {string}', async ({ actionUtils }, value: string, elementName: string, pageName: string) => {
  await actionUtils.type(elementName, pageName, value, 100);
});
