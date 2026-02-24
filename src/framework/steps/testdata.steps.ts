/**
 * Generic Step Definitions — Test Data Driven Steps
 *
 * Steps that resolve values from the project's test data files.
 * Pattern: I enter data "<keyPath>" from "<dataFile>" in "<element>" on "<page>"
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Given, Then } = createBdd(test);

// ─── Fill from Test Data ─────────────────────────────────────────────────

When(
  'I enter data {string} from {string} in {string} on {string}',
  async ({ actionUtils, testData }, keyPath: string, dataFile: string, elementName: string, pageName: string) => {
    const value = String(testData.getValue(dataFile, keyPath));
    await actionUtils.fill(elementName, pageName, value);
  }
);

When(
  'I type data {string} from {string} in {string} on {string}',
  async ({ actionUtils, testData }, keyPath: string, dataFile: string, elementName: string, pageName: string) => {
    const value = String(testData.getValue(dataFile, keyPath));
    await actionUtils.fill(elementName, pageName, value);
  }
);

// ─── Navigate with Test Data ─────────────────────────────────────────────

Given(
  'I navigate to data {string} from {string}',
  async ({ actionUtils, testData }, keyPath: string, dataFile: string) => {
    const url = String(testData.getValue(dataFile, keyPath));
    await actionUtils.navigateTo(url);
  }
);

// ─── Assert with Test Data ───────────────────────────────────────────────

Then(
  '{string} should have text from data {string} from {string} on {string}',
  async ({ actionUtils, testData }, elementName: string, keyPath: string, dataFile: string, pageName: string) => {
    const expected = String(testData.getValue(dataFile, keyPath));
    await actionUtils.assertText(elementName, pageName, expected);
  }
);

Then(
  '{string} should contain text from data {string} from {string} on {string}',
  async ({ actionUtils, testData }, elementName: string, keyPath: string, dataFile: string, pageName: string) => {
    const expected = String(testData.getValue(dataFile, keyPath));
    await actionUtils.assertContainsText(elementName, pageName, expected);
  }
);

// ─── Select from Test Data ───────────────────────────────────────────────

When(
  'I select data {string} from {string} in {string} on {string}',
  async ({ actionUtils, testData }, keyPath: string, dataFile: string, elementName: string, pageName: string) => {
    const label = String(testData.getValue(dataFile, keyPath));
    await actionUtils.selectByLabel(elementName, pageName, label);
  }
);
