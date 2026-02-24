/**
 * Generic Step Definitions — Miscellaneous
 *
 * Steps for file upload, drag & drop, screenshots, and other utilities.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When, Then } = createBdd(test);

// ─── File Upload ─────────────────────────────────────────────────────────

When('I upload {string} to {string} on {string}', async ({ actionUtils }, filePath: string, elementName: string, pageName: string) => {
  await actionUtils.uploadFile(elementName, pageName, filePath);
});

When('I upload the file {string} to {string} on {string}', async ({ actionUtils }, filePath: string, elementName: string, pageName: string) => {
  await actionUtils.uploadFile(elementName, pageName, filePath);
});

// ─── Drag and Drop ───────────────────────────────────────────────────────

When('I drag {string} to {string} on {string}', async ({ actionUtils }, sourceElement: string, targetElement: string, pageName: string) => {
  await actionUtils.dragAndDrop(sourceElement, targetElement, pageName);
});

// ─── Screenshot ──────────────────────────────────────────────────────────

When('I take a screenshot', async ({ actionUtils }) => {
  await actionUtils.takeScreenshot();
});

When('I take a screenshot named {string}', async ({ actionUtils }, name: string) => {
  await actionUtils.takeScreenshot(name);
});

// ─── Tab Management ──────────────────────────────────────────────────────

When('I switch to the new tab', async ({ actionUtils }) => {
  await actionUtils.switchToNewTab();
});

When('I close the current tab', async ({ actionUtils }) => {
  await actionUtils.closeCurrentTab();
});
