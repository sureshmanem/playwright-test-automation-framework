/**
 * Custom Playwright Fixtures
 *
 * Extends the base Playwright test with:
 *   - actionUtils: ActionUtils instance (auto-initialised per test)
 *   - objectRepo:  ObjectRepository instance (shared)
 *   - testData:    TestDataManager instance (shared)
 *
 * These fixtures are consumed by step definitions via playwright-bdd's
 * `createBdd` helper. Project teams never need to touch this file.
 */

import { test as base } from 'playwright-bdd';
import { ActionUtils } from '../actions/ActionUtils';
import { ObjectRepository } from '../core/ObjectRepository';
import { TestDataManager } from '../core/TestDataManager';
import { Logger } from '../utils/Logger';

// ─── Declare the custom fixture types ──────────────────────────────────

export type FrameworkFixtures = {
  actionUtils: ActionUtils;
  objectRepo: ObjectRepository;
  testData: TestDataManager;
  logger: Logger;
};

// ─── Extend the base test object from playwright-bdd ───────────────────

export const test = base.extend<FrameworkFixtures>({
  // ObjectRepository — created once, shared across steps within a test
  objectRepo: async ({}, use) => {
    const repo = new ObjectRepository();
    await use(repo);
    repo.clearCache();
  },

  // TestDataManager — created once, shared across steps within a test
  testData: async ({}, use) => {
    const tdm = new TestDataManager();
    await use(tdm);
    tdm.clearCache();
  },

  // Logger — per-test logger instance
  logger: async ({}, use) => {
    const logger = new Logger('Test');
    await use(logger);
  },

  // ActionUtils — the primary fixture consumed by step definitions
  actionUtils: async ({ page, context, objectRepo }, use) => {
    const actions = new ActionUtils(page, context, objectRepo);
    await use(actions);
  },
});

export { expect } from '@playwright/test';
