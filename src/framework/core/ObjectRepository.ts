/**
 * Object Repository Parser
 * 
 * Dynamically resolves locators from JSON-based Object Repository files.
 * Each page has its own JSON file with element name -> locator mappings.
 * 
 * Locator format supports:
 *   - CSS selectors (default)
 *   - XPath (prefix with "xpath=")
 *   - Text (prefix with "text=")
 *   - Role (prefix with "role=")
 *   - Test ID (prefix with "data-testid=")
 *   - Playwright built-in selectors
 */

import * as fs from 'fs';
import * as path from 'path';
import { Page, Locator } from '@playwright/test';

export interface LocatorEntry {
  selector: string;
  description?: string;
}

export type PageLocators = Record<string, string | LocatorEntry>;

export class ObjectRepository {
  private cache: Map<string, PageLocators> = new Map();
  private locatorBasePath: string;

  constructor(locatorBasePath?: string) {
    this.locatorBasePath = locatorBasePath || path.resolve(process.cwd(), 'src/project/locators');
  }

  /**
   * Load a page's locator file from the Object Repository.
   * Caches the result for subsequent calls.
   */
  loadPage(pageName: string): PageLocators {
    const normalizedName = pageName.replace(/\s+/g, '');

    if (this.cache.has(normalizedName)) {
      return this.cache.get(normalizedName)!;
    }

    const filePath = path.join(this.locatorBasePath, `${normalizedName}.json`);

    if (!fs.existsSync(filePath)) {
      throw new Error(
        `[ObjectRepository] Locator file not found for page "${pageName}". ` +
        `Expected file at: ${filePath}`
      );
    }

    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const locators: PageLocators = JSON.parse(raw);
      this.cache.set(normalizedName, locators);
      return locators;
    } catch (error) {
      throw new Error(
        `[ObjectRepository] Failed to parse locator file for page "${pageName}": ${(error as Error).message}`
      );
    }
  }

  /**
   * Resolve a selector string for a given element on a given page.
   */
  getSelector(pageName: string, elementName: string): string {
    const pageLocators = this.loadPage(pageName);
    const normalizedElement = elementName.replace(/\s+/g, '');

    // Case-insensitive lookup
    const key = Object.keys(pageLocators).find(
      (k) => k.toLowerCase() === normalizedElement.toLowerCase()
    );

    if (!key) {
      throw new Error(
        `[ObjectRepository] Element "${elementName}" not found in page "${pageName}". ` +
        `Available elements: ${Object.keys(pageLocators).join(', ')}`
      );
    }

    const entry = pageLocators[key];
    return typeof entry === 'string' ? entry : entry.selector;
  }

  /**
   * Resolve a Playwright Locator for a given element on a given page.
   */
  getLocator(page: Page, pageName: string, elementName: string): Locator {
    const selector = this.getSelector(pageName, elementName);
    return this.resolveLocator(page, selector);
  }

  /**
   * Convert a selector string into a Playwright Locator, handling
   * prefixed selectors (xpath=, text=, role=, data-testid=).
   */
  private resolveLocator(page: Page, selector: string): Locator {
    if (selector.startsWith('role=')) {
      const roleParts = selector.replace('role=', '').split('[name=');
      const role = roleParts[0].trim() as any;
      if (roleParts.length > 1) {
        const name = roleParts[1].replace(']', '').replace(/['"]/g, '').trim();
        return page.getByRole(role, { name });
      }
      return page.getByRole(role);
    }

    if (selector.startsWith('data-testid=')) {
      const testId = selector.replace('data-testid=', '').trim();
      return page.getByTestId(testId);
    }

    if (selector.startsWith('placeholder=')) {
      const placeholder = selector.replace('placeholder=', '').trim();
      return page.getByPlaceholder(placeholder);
    }

    if (selector.startsWith('label=')) {
      const label = selector.replace('label=', '').trim();
      return page.getByLabel(label);
    }

    // Playwright handles text=, xpath=, css= natively
    return page.locator(selector);
  }

  /**
   * Clear the cache (useful between test suites).
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Get all registered page names from cache.
   */
  getCachedPages(): string[] {
    return Array.from(this.cache.keys());
  }
}
