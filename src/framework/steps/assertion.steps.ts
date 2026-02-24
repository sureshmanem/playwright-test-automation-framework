/**
 * Generic Step Definitions — Assertions
 *
 * Comprehensive assertion steps for element state, text, visibility, etc.
 * These are the "Then" steps that validate expected behaviour.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { Then } = createBdd(test);

// ─── Visibility ──────────────────────────────────────────────────────────

Then('{string} should be visible on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertVisible(elementName, pageName);
});

Then('{string} should be displayed on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertVisible(elementName, pageName);
});

Then('{string} should not be visible on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertNotVisible(elementName, pageName);
});

Then('{string} should be hidden on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertNotVisible(elementName, pageName);
});

// ─── Enabled / Disabled ──────────────────────────────────────────────────

Then('{string} should be enabled on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertEnabled(elementName, pageName);
});

Then('{string} should be disabled on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.assertDisabled(elementName, pageName);
});

// ─── Text Assertions ─────────────────────────────────────────────────────

Then('{string} should have text {string} on {string}', async ({ actionUtils }, elementName: string, expectedText: string, pageName: string) => {
  await actionUtils.assertText(elementName, pageName, expectedText);
});

Then('{string} text should be {string} on {string}', async ({ actionUtils }, elementName: string, expectedText: string, pageName: string) => {
  await actionUtils.assertText(elementName, pageName, expectedText);
});

Then('{string} should contain text {string} on {string}', async ({ actionUtils }, elementName: string, expectedText: string, pageName: string) => {
  await actionUtils.assertContainsText(elementName, pageName, expectedText);
});

Then('{string} should contain {string} on {string}', async ({ actionUtils }, elementName: string, expectedText: string, pageName: string) => {
  await actionUtils.assertContainsText(elementName, pageName, expectedText);
});

// ─── Value Assertions ────────────────────────────────────────────────────

Then('{string} should have value {string} on {string}', async ({ actionUtils }, elementName: string, expectedValue: string, pageName: string) => {
  await actionUtils.assertValue(elementName, pageName, expectedValue);
});

Then('the value of {string} should be {string} on {string}', async ({ actionUtils }, elementName: string, expectedValue: string, pageName: string) => {
  await actionUtils.assertValue(elementName, pageName, expectedValue);
});

// ─── Attribute Assertions ────────────────────────────────────────────────

Then('{string} should have attribute {string} with value {string} on {string}', async ({ actionUtils }, elementName: string, attribute: string, value: string, pageName: string) => {
  await actionUtils.assertHasAttribute(elementName, pageName, attribute, value);
});

Then('{string} should have attribute {string} on {string}', async ({ actionUtils }, elementName: string, attribute: string, pageName: string) => {
  await actionUtils.assertHasAttribute(elementName, pageName, attribute);
});

// ─── CSS Class Assertions ────────────────────────────────────────────────

Then('{string} should have class {string} on {string}', async ({ actionUtils }, elementName: string, className: string, pageName: string) => {
  await actionUtils.assertHasClass(elementName, pageName, className);
});

// ─── Page-Level Assertions ───────────────────────────────────────────────

Then('the page title should be {string}', async ({ actionUtils }, expectedTitle: string) => {
  await actionUtils.assertPageTitle(expectedTitle);
});

Then('the page title should contain {string}', async ({ actionUtils }, expectedText: string) => {
  await actionUtils.assertPageTitleContains(expectedText);
});

Then('the page URL should be {string}', async ({ actionUtils }, expectedURL: string) => {
  await actionUtils.assertPageURL(expectedURL);
});

Then('the page URL should contain {string}', async ({ actionUtils }, expectedText: string) => {
  await actionUtils.assertPageURLContains(expectedText);
});

// ─── Count Assertions ────────────────────────────────────────────────────

Then('there should be {int} {string} on {string}', async ({ actionUtils }, count: number, elementName: string, pageName: string) => {
  await actionUtils.assertElementCount(elementName, pageName, count);
});

Then('the count of {string} should be {int} on {string}', async ({ actionUtils }, elementName: string, count: number, pageName: string) => {
  await actionUtils.assertElementCount(elementName, pageName, count);
});
