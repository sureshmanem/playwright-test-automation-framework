/**
 * ActionUtils — Core Action Wrappers
 *
 * Wraps every Playwright action with:
 *   - Built-in logging (action name, element, page)
 *   - Automatic element resolution from Object Repository
 *   - Configurable waits and retries
 *   - Screenshot on failure
 *   - Standardised error messages
 *
 * This is the ONLY layer that interacts with Playwright's Page API.
 * Step definitions call ActionUtils; they never call page.click() etc. directly.
 */

import { Page, Locator, expect, BrowserContext, FrameLocator } from '@playwright/test';
import { ObjectRepository } from '../core/ObjectRepository';
import { Logger } from '../utils/Logger';

export class ActionUtils {
  private page: Page;
  private context: BrowserContext;
  private objectRepo: ObjectRepository;
  private logger: Logger;

  constructor(page: Page, context: BrowserContext, objectRepo: ObjectRepository) {
    this.page = page;
    this.context = context;
    this.objectRepo = objectRepo;
    this.logger = new Logger('ActionUtils');
  }

  // ─── Getters ──────────────────────────────────────────────────────────

  getPage(): Page {
    return this.page;
  }

  getContext(): BrowserContext {
    return this.context;
  }

  // ─── Locator Resolution ───────────────────────────────────────────────

  /**
   * Resolve a Playwright Locator from the Object Repository.
   */
  resolveElement(elementName: string, pageName: string): Locator {
    this.logger.debug(`Resolving element "${elementName}" on page "${pageName}"`);
    return this.objectRepo.getLocator(this.page, pageName, elementName);
  }

  /**
   * Resolve a locator directly from a raw selector string (bypass OR).
   */
  resolveRawLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  // ─── Navigation ───────────────────────────────────────────────────────

  async navigateTo(url: string): Promise<void> {
    this.logger.action('navigateTo', `URL: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  async navigateToPath(path: string): Promise<void> {
    this.logger.action('navigateToPath', `Path: ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async reloadPage(): Promise<void> {
    this.logger.action('reloadPage', '');
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  async goBack(): Promise<void> {
    this.logger.action('goBack', '');
    await this.page.goBack();
  }

  async goForward(): Promise<void> {
    this.logger.action('goForward', '');
    await this.page.goForward();
  }

  // ─── Click Actions ────────────────────────────────────────────────────

  async click(elementName: string, pageName: string): Promise<void> {
    this.logger.action('click', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.click();
  }

  async doubleClick(elementName: string, pageName: string): Promise<void> {
    this.logger.action('doubleClick', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.dblclick();
  }

  async rightClick(elementName: string, pageName: string): Promise<void> {
    this.logger.action('rightClick', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.click({ button: 'right' });
  }

  async forceClick(elementName: string, pageName: string): Promise<void> {
    this.logger.action('forceClick', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.click({ force: true });
  }

  // ─── Input Actions ────────────────────────────────────────────────────

  async fill(elementName: string, pageName: string, value: string): Promise<void> {
    this.logger.action('fill', `Element: "${elementName}" on Page: "${pageName}" with value: "${value}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.fill(value);
  }

  async clearAndFill(elementName: string, pageName: string, value: string): Promise<void> {
    this.logger.action('clearAndFill', `Element: "${elementName}" on Page: "${pageName}" with value: "${value}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.clear();
    await locator.fill(value);
  }

  async type(elementName: string, pageName: string, value: string, delay?: number): Promise<void> {
    this.logger.action('type', `Element: "${elementName}" on Page: "${pageName}" with value: "${value}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.pressSequentially(value, { delay: delay || 50 });
  }

  async clear(elementName: string, pageName: string): Promise<void> {
    this.logger.action('clear', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.clear();
  }

  async pressKey(key: string): Promise<void> {
    this.logger.action('pressKey', `Key: "${key}"`);
    await this.page.keyboard.press(key);
  }

  async pressKeyOnElement(elementName: string, pageName: string, key: string): Promise<void> {
    this.logger.action('pressKeyOnElement', `Key: "${key}" on Element: "${elementName}" Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.press(key);
  }

  // ─── Dropdown / Select ────────────────────────────────────────────────

  async selectByValue(elementName: string, pageName: string, value: string): Promise<void> {
    this.logger.action('selectByValue', `Element: "${elementName}" on Page: "${pageName}" value: "${value}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.selectOption({ value });
  }

  async selectByLabel(elementName: string, pageName: string, label: string): Promise<void> {
    this.logger.action('selectByLabel', `Element: "${elementName}" on Page: "${pageName}" label: "${label}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.selectOption({ label });
  }

  async selectByIndex(elementName: string, pageName: string, index: number): Promise<void> {
    this.logger.action('selectByIndex', `Element: "${elementName}" on Page: "${pageName}" index: ${index}`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.selectOption({ index });
  }

  // ─── Checkbox / Radio ─────────────────────────────────────────────────

  async check(elementName: string, pageName: string): Promise<void> {
    this.logger.action('check', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.check();
  }

  async uncheck(elementName: string, pageName: string): Promise<void> {
    this.logger.action('uncheck', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.uncheck();
  }

  async setChecked(elementName: string, pageName: string, checked: boolean): Promise<void> {
    this.logger.action('setChecked', `Element: "${elementName}" on Page: "${pageName}" checked: ${checked}`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.setChecked(checked);
  }

  // ─── Hover / Focus / Scroll ───────────────────────────────────────────

  async hover(elementName: string, pageName: string): Promise<void> {
    this.logger.action('hover', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.hover();
  }

  async focus(elementName: string, pageName: string): Promise<void> {
    this.logger.action('focus', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.focus();
  }

  async scrollIntoView(elementName: string, pageName: string): Promise<void> {
    this.logger.action('scrollIntoView', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.scrollIntoViewIfNeeded();
  }

  // ─── Wait Helpers ─────────────────────────────────────────────────────

  async waitForElement(elementName: string, pageName: string, state: 'visible' | 'hidden' | 'attached' | 'detached' = 'visible', timeout?: number): Promise<void> {
    this.logger.action('waitForElement', `Element: "${elementName}" on Page: "${pageName}" state: "${state}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.waitFor({ state, timeout });
  }

  async waitForTimeout(ms: number): Promise<void> {
    this.logger.action('waitForTimeout', `${ms}ms`);
    await this.page.waitForTimeout(ms);
  }

  async waitForNavigation(): Promise<void> {
    this.logger.action('waitForNavigation', '');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForURL(urlPattern: string | RegExp): Promise<void> {
    this.logger.action('waitForURL', `Pattern: ${urlPattern}`);
    await this.page.waitForURL(urlPattern);
  }

  // ─── Read / Extract ───────────────────────────────────────────────────

  async getText(elementName: string, pageName: string): Promise<string> {
    this.logger.action('getText', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    const text = await locator.textContent();
    return text?.trim() || '';
  }

  async getInputValue(elementName: string, pageName: string): Promise<string> {
    this.logger.action('getInputValue', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    return locator.inputValue();
  }

  async getAttribute(elementName: string, pageName: string, attribute: string): Promise<string | null> {
    this.logger.action('getAttribute', `Element: "${elementName}" on Page: "${pageName}" attr: "${attribute}"`);
    const locator = this.resolveElement(elementName, pageName);
    return locator.getAttribute(attribute);
  }

  async isVisible(elementName: string, pageName: string): Promise<boolean> {
    const locator = this.resolveElement(elementName, pageName);
    return locator.isVisible();
  }

  async isEnabled(elementName: string, pageName: string): Promise<boolean> {
    const locator = this.resolveElement(elementName, pageName);
    return locator.isEnabled();
  }

  async isChecked(elementName: string, pageName: string): Promise<boolean> {
    const locator = this.resolveElement(elementName, pageName);
    return locator.isChecked();
  }

  async getCount(elementName: string, pageName: string): Promise<number> {
    const locator = this.resolveElement(elementName, pageName);
    return locator.count();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getPageURL(): Promise<string> {
    return this.page.url();
  }

  // ─── Assertions ───────────────────────────────────────────────────────

  async assertVisible(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertVisible', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toBeVisible();
    this.logger.assertion(`"${elementName}" is visible on "${pageName}"`, true);
  }

  async assertNotVisible(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertNotVisible', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).not.toBeVisible();
    this.logger.assertion(`"${elementName}" is not visible on "${pageName}"`, true);
  }

  async assertEnabled(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertEnabled', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toBeEnabled();
    this.logger.assertion(`"${elementName}" is enabled on "${pageName}"`, true);
  }

  async assertDisabled(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertDisabled', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toBeDisabled();
    this.logger.assertion(`"${elementName}" is disabled on "${pageName}"`, true);
  }

  async assertText(elementName: string, pageName: string, expectedText: string): Promise<void> {
    this.logger.action('assertText', `Element: "${elementName}" on Page: "${pageName}" expected: "${expectedText}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toHaveText(expectedText);
    this.logger.assertion(`"${elementName}" has text "${expectedText}"`, true);
  }

  async assertContainsText(elementName: string, pageName: string, expectedText: string): Promise<void> {
    this.logger.action('assertContainsText', `Element: "${elementName}" on Page: "${pageName}" contains: "${expectedText}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toContainText(expectedText);
    this.logger.assertion(`"${elementName}" contains text "${expectedText}"`, true);
  }

  async assertValue(elementName: string, pageName: string, expectedValue: string): Promise<void> {
    this.logger.action('assertValue', `Element: "${elementName}" on Page: "${pageName}" expected: "${expectedValue}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toHaveValue(expectedValue);
    this.logger.assertion(`"${elementName}" has value "${expectedValue}"`, true);
  }

  async assertChecked(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertChecked', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toBeChecked();
    this.logger.assertion(`"${elementName}" is checked on "${pageName}"`, true);
  }

  async assertUnchecked(elementName: string, pageName: string): Promise<void> {
    this.logger.action('assertUnchecked', `Element: "${elementName}" on Page: "${pageName}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).not.toBeChecked();
    this.logger.assertion(`"${elementName}" is unchecked on "${pageName}"`, true);
  }

  async assertHasAttribute(elementName: string, pageName: string, attribute: string, value?: string): Promise<void> {
    this.logger.action('assertHasAttribute', `Element: "${elementName}" on Page: "${pageName}" attr: "${attribute}"`);
    const locator = this.resolveElement(elementName, pageName);
    if (value !== undefined) {
      await expect(locator).toHaveAttribute(attribute, value);
    } else {
      await expect(locator).toHaveAttribute(attribute);
    }
    this.logger.assertion(`"${elementName}" has attribute "${attribute}"`, true);
  }

  async assertHasClass(elementName: string, pageName: string, className: string): Promise<void> {
    this.logger.action('assertHasClass', `Element: "${elementName}" on Page: "${pageName}" class: "${className}"`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toHaveClass(new RegExp(className));
    this.logger.assertion(`"${elementName}" has class "${className}"`, true);
  }

  async assertPageTitle(expectedTitle: string): Promise<void> {
    this.logger.action('assertPageTitle', `Expected: "${expectedTitle}"`);
    await expect(this.page).toHaveTitle(expectedTitle);
    this.logger.assertion(`Page title is "${expectedTitle}"`, true);
  }

  async assertPageTitleContains(expectedText: string): Promise<void> {
    this.logger.action('assertPageTitleContains', `Contains: "${expectedText}"`);
    await expect(this.page).toHaveTitle(new RegExp(expectedText));
    this.logger.assertion(`Page title contains "${expectedText}"`, true);
  }

  async assertPageURL(expectedURL: string): Promise<void> {
    this.logger.action('assertPageURL', `Expected: "${expectedURL}"`);
    await expect(this.page).toHaveURL(expectedURL);
    this.logger.assertion(`Page URL is "${expectedURL}"`, true);
  }

  async assertPageURLContains(expectedText: string): Promise<void> {
    this.logger.action('assertPageURLContains', `Contains: "${expectedText}"`);
    await expect(this.page).toHaveURL(new RegExp(expectedText));
    this.logger.assertion(`Page URL contains "${expectedText}"`, true);
  }

  async assertElementCount(elementName: string, pageName: string, expectedCount: number): Promise<void> {
    this.logger.action('assertElementCount', `Element: "${elementName}" on Page: "${pageName}" count: ${expectedCount}`);
    const locator = this.resolveElement(elementName, pageName);
    await expect(locator).toHaveCount(expectedCount);
    this.logger.assertion(`"${elementName}" count is ${expectedCount}`, true);
  }

  // ─── Dialog Handling ──────────────────────────────────────────────────

  async acceptDialog(): Promise<void> {
    this.logger.action('acceptDialog', '');
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
  }

  async dismissDialog(): Promise<void> {
    this.logger.action('dismissDialog', '');
    this.page.once('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  async acceptDialogWithText(text: string): Promise<void> {
    this.logger.action('acceptDialogWithText', `Text: "${text}"`);
    this.page.once('dialog', async (dialog) => {
      await dialog.accept(text);
    });
  }

  // ─── Frame Handling ───────────────────────────────────────────────────

  getFrame(frameSelector: string): FrameLocator {
    this.logger.action('getFrame', `Selector: "${frameSelector}"`);
    return this.page.frameLocator(frameSelector);
  }

  // ─── File Upload ──────────────────────────────────────────────────────

  async uploadFile(elementName: string, pageName: string, filePath: string): Promise<void> {
    this.logger.action('uploadFile', `Element: "${elementName}" on Page: "${pageName}" file: "${filePath}"`);
    const locator = this.resolveElement(elementName, pageName);
    await locator.setInputFiles(filePath);
  }

  // ─── Drag & Drop ─────────────────────────────────────────────────────

  async dragAndDrop(sourceElement: string, targetElement: string, pageName: string): Promise<void> {
    this.logger.action('dragAndDrop', `Source: "${sourceElement}" Target: "${targetElement}" on Page: "${pageName}"`);
    const source = this.resolveElement(sourceElement, pageName);
    const target = this.resolveElement(targetElement, pageName);
    await source.dragTo(target);
  }

  // ─── Screenshot ───────────────────────────────────────────────────────

  async takeScreenshot(name?: string): Promise<Buffer> {
    const screenshotName = name || `screenshot-${Date.now()}`;
    this.logger.action('takeScreenshot', `Name: "${screenshotName}"`);
    return this.page.screenshot({ path: `test-results/${screenshotName}.png`, fullPage: true });
  }

  // ─── Tab / Window Handling ────────────────────────────────────────────

  async switchToNewTab(): Promise<Page> {
    this.logger.action('switchToNewTab', '');
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
    ]);
    await newPage.waitForLoadState();
    return newPage;
  }

  async closeCurrentTab(): Promise<void> {
    this.logger.action('closeCurrentTab', '');
    await this.page.close();
  }
}
