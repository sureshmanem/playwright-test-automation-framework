/**
 * Generic Step Definitions — Hover, Focus, Scroll
 *
 * Standard Gherkin steps for hover, focus, and scroll operations.
 */

import { createBdd } from 'playwright-bdd';
import { test } from '../fixtures/fixtures';

const { When } = createBdd(test);

// ─── Hover ───────────────────────────────────────────────────────────────

When('I hover over {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.hover(elementName, pageName);
});

When('I hover on {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.hover(elementName, pageName);
});

// ─── Focus ───────────────────────────────────────────────────────────────

When('I focus on {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.focus(elementName, pageName);
});

// ─── Scroll ──────────────────────────────────────────────────────────────

When('I scroll to {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.scrollIntoView(elementName, pageName);
});

When('I scroll to the {string} on {string}', async ({ actionUtils }, elementName: string, pageName: string) => {
  await actionUtils.scrollIntoView(elementName, pageName);
});
