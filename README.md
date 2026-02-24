# Playwright BDD Test Automation Framework

A generic, zero-code BDD test automation framework built with **Playwright**, **TypeScript**, and **playwright-bdd**. Write standard Gherkin feature files, define locators in JSON, and let the framework handle the rest — no manual script writing required.

---

## Architecture

```
src/
├── framework/                        # Core framework (centrally managed)
│   ├── actions/
│   │   └── ActionUtils.ts            # 40+ Playwright action wrappers with logging
│   ├── core/
│   │   ├── ObjectRepository.ts       # Dynamic JSON locator resolver
│   │   └── TestDataManager.ts        # JSON test data loader with dot-notation access
│   ├── fixtures/
│   │   └── fixtures.ts               # Custom Playwright fixtures
│   ├── steps/                        # Generic step definitions library
│   │   ├── navigation.steps.ts       # Navigation (goto, reload, back/forward)
│   │   ├── click.steps.ts            # Click, double-click, right-click, force-click
│   │   ├── input.steps.ts            # Fill, type, clear, key press
│   │   ├── dropdown.steps.ts         # Select by label / value / index
│   │   ├── checkbox.steps.ts         # Check, uncheck, assert checked
│   │   ├── interaction.steps.ts      # Hover, focus, scroll
│   │   ├── wait.steps.ts             # Wait for element / timeout / navigation
│   │   ├── assertion.steps.ts        # 20+ assertion steps
│   │   ├── dialog.steps.ts           # Accept / dismiss browser dialogs
│   │   ├── misc.steps.ts             # File upload, drag & drop, screenshots, tabs
│   │   └── testdata.steps.ts         # Data-driven steps (fill/assert from JSON)
│   └── utils/
│       └── Logger.ts                 # Structured levelled logging
│
├── project/                          # Project-specific artifacts (team-managed)
│   ├── features/                     # Gherkin .feature files
│   ├── locators/                     # JSON object repository (one file per page)
│   ├── testdata/                     # JSON test data files
│   └── steps/                        # Optional app-specific step definitions
```

### Separation of Concerns

| Layer | Owned By | Contains |
|---|---|---|
| **Framework Core** (`src/framework/`) | Framework team | Engine setup, fixtures, action wrappers, generic step definitions |
| **Project Implementation** (`src/project/`) | Application teams | Feature files, locator JSONs, test data JSONs, custom steps |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
npm install
npx playwright install
```

### Run Tests

```bash
# Full run (generates specs from features, then executes)
npm test

# Headed mode (see the browser)
npm run test:headed

# Debug mode
npm run test:debug

# Playwright UI mode
npm run test:ui

# View HTML report
npm run report
```

### Run a Specific Project (Browser)

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## How It Works

### 1. Write a Feature File

Create a `.feature` file in `src/project/features/`:

```gherkin
Feature: Login Functionality

  Background:
    Given I navigate to "https://the-internet.herokuapp.com/login"

  Scenario: Successful login with valid credentials
    When I enter "tomsmith" in "UsernameInput" on "LoginPage"
    And I enter "SuperSecretPassword!" in "PasswordInput" on "LoginPage"
    And I click "LoginButton" on "LoginPage"
    Then the page URL should contain "secure"
    And "FlashMessage" should contain text "You logged into a secure area!" on "SecurePage"
```

### 2. Define Locators in JSON

Create a JSON file per page in `src/project/locators/`. The filename must match the page name used in feature steps (e.g., `LoginPage.json`):

```json
{
  "UsernameInput": "#username",
  "PasswordInput": "#password",
  "LoginButton": "button[type='submit']",
  "FlashMessage": "#flash"
}
```

**Supported selector formats:**

| Prefix | Example | Description |
|---|---|---|
| *(none)* | `#username` | CSS selector (default) |
| `xpath=` | `xpath=//button[@id='submit']` | XPath |
| `text=` | `text=Submit` | Text content |
| `role=` | `role=button[name=Submit]` | ARIA role |
| `data-testid=` | `data-testid=login-btn` | Test ID |
| `placeholder=` | `placeholder=Enter email` | Placeholder text |
| `label=` | `label=Email` | Label text |

### 3. (Optional) Define Test Data in JSON

Create a JSON file in `src/project/testdata/`:

```json
{
  "validUser": {
    "username": "tomsmith",
    "password": "SuperSecretPassword!"
  },
  "urls": {
    "login": "https://the-internet.herokuapp.com/login"
  }
}
```

Use data-driven steps in your features:

```gherkin
When I enter data "validUser.username" from "login" in "UsernameInput" on "LoginPage"
```

Dynamic placeholders are also supported in test data values:

| Placeholder | Resolves To |
|---|---|
| `{{timestamp}}` | Current epoch milliseconds |
| `{{random}}` | Random alphanumeric string |
| `{{env:VAR_NAME}}` | Environment variable value |

---

## Available Step Definitions

### Navigation

| Step | Description |
|---|---|
| `Given I navigate to "<url>"` | Navigate to a full URL |
| `Given I navigate to the URL "<url>"` | Navigate to a full URL (alias) |
| `Given I am on the "<name>" page` | Navigate to `/<name>` path |
| `When I open the URL "<url>"` | Navigate to a full URL |
| `When I navigate to the path "<path>"` | Navigate to a relative path |
| `When I reload the page` | Reload the current page |
| `When I refresh the page` | Reload the current page (alias) |
| `When I go back` | Browser back |
| `When I go forward` | Browser forward |

### Click Actions

| Step | Description |
|---|---|
| `When I click "<element>" on "<page>"` | Single click |
| `When I click on "<element>" on "<page>"` | Single click (alias) |
| `When I click the "<element>" on "<page>"` | Single click (alias) |
| `When I double click "<element>" on "<page>"` | Double click |
| `When I right click "<element>" on "<page>"` | Context click |
| `When I force click "<element>" on "<page>"` | Click with `force: true` |

### Input Actions

| Step | Description |
|---|---|
| `When I enter "<value>" in "<element>" on "<page>"` | Fill a field |
| `When I type "<value>" in "<element>" on "<page>"` | Fill a field (alias) |
| `When I fill "<element>" with "<value>" on "<page>"` | Fill a field (alias) |
| `When I clear and enter "<value>" in "<element>" on "<page>"` | Clear then fill |
| `When I clear "<element>" on "<page>"` | Clear a field |
| `When I press "<key>"` | Press a keyboard key |
| `When I press the "<key>" key` | Press a keyboard key (alias) |
| `When I slowly type "<value>" in "<element>" on "<page>"` | Type character by character |

### Dropdown / Select

| Step | Description |
|---|---|
| `When I select "<label>" from "<element>" on "<page>"` | Select by visible text |
| `When I select by value "<value>" from "<element>" on "<page>"` | Select by value attribute |
| `When I select option <index> from "<element>" on "<page>"` | Select by index |

### Checkbox / Radio

| Step | Description |
|---|---|
| `When I check "<element>" on "<page>"` | Check a checkbox |
| `When I uncheck "<element>" on "<page>"` | Uncheck a checkbox |
| `Then "<element>" should be checked on "<page>"` | Assert checked |
| `Then "<element>" should be unchecked on "<page>"` | Assert unchecked |

### Hover / Focus / Scroll

| Step | Description |
|---|---|
| `When I hover over "<element>" on "<page>"` | Hover |
| `When I focus on "<element>" on "<page>"` | Focus |
| `When I scroll to "<element>" on "<page>"` | Scroll into view |

### Wait

| Step | Description |
|---|---|
| `When I wait for "<element>" to be visible on "<page>"` | Wait for visible |
| `When I wait for "<element>" to be hidden on "<page>"` | Wait for hidden |
| `When I wait for <n> seconds` | Fixed wait (seconds) |
| `When I wait for <n> milliseconds` | Fixed wait (ms) |
| `When I wait for the page to load` | Wait for DOM content loaded |
| `When I wait for the URL to contain "<text>"` | Wait for URL pattern |

### Assertions

| Step | Description |
|---|---|
| `Then "<element>" should be visible on "<page>"` | Assert visible |
| `Then "<element>" should not be visible on "<page>"` | Assert not visible |
| `Then "<element>" should be enabled on "<page>"` | Assert enabled |
| `Then "<element>" should be disabled on "<page>"` | Assert disabled |
| `Then "<element>" should have text "<text>" on "<page>"` | Assert exact text |
| `Then "<element>" should contain text "<text>" on "<page>"` | Assert contains text |
| `Then "<element>" should contain "<text>" on "<page>"` | Assert contains text (alias) |
| `Then "<element>" should have value "<value>" on "<page>"` | Assert input value |
| `Then "<element>" should have attribute "<attr>" on "<page>"` | Assert attribute exists |
| `Then "<element>" should have attribute "<attr>" with value "<val>" on "<page>"` | Assert attribute value |
| `Then "<element>" should have class "<class>" on "<page>"` | Assert CSS class |
| `Then the page title should be "<title>"` | Assert exact page title |
| `Then the page title should contain "<text>"` | Assert title contains |
| `Then the page URL should be "<url>"` | Assert exact URL |
| `Then the page URL should contain "<text>"` | Assert URL contains |
| `Then there should be <n> "<element>" on "<page>"` | Assert element count |

### Dialog Handling

| Step | Description |
|---|---|
| `Given I will accept the next dialog` | Set up dialog accept handler |
| `Given I will dismiss the next dialog` | Set up dialog dismiss handler |
| `When I accept the dialog with "<text>"` | Accept prompt with input |

### Data-Driven Steps

| Step | Description |
|---|---|
| `When I enter data "<keyPath>" from "<file>" in "<element>" on "<page>"` | Fill from test data |
| `Given I navigate to data "<keyPath>" from "<file>"` | Navigate using test data URL |
| `Then "<element>" should have text from data "<keyPath>" from "<file>" on "<page>"` | Assert text from test data |
| `Then "<element>" should contain text from data "<keyPath>" from "<file>" on "<page>"` | Assert contains from test data |

### Miscellaneous

| Step | Description |
|---|---|
| `When I upload "<filePath>" to "<element>" on "<page>"` | File upload |
| `When I drag "<source>" to "<target>" on "<page>"` | Drag and drop |
| `When I take a screenshot` | Capture full-page screenshot |
| `When I take a screenshot named "<name>"` | Capture named screenshot |
| `When I switch to the new tab` | Switch to newly opened tab |
| `When I close the current tab` | Close current tab |

---

## Adding Custom Steps

For application-specific logic beyond the generic library, add steps in `src/project/steps/`:

```typescript
import { createBdd } from 'playwright-bdd';
import { test } from '../../framework/fixtures/fixtures';

const { Given, When, Then } = createBdd(test);

Then('the dashboard should show {int} notifications', async ({ actionUtils }, count: number) => {
  await actionUtils.assertElementCount('NotificationBadge', 'DashboardPage', count);
});
```

---

## Configuration

### Playwright Config

All Playwright settings are in `playwright.config.ts`:

- **Base URL**: Set via `BASE_URL` environment variable or defaults to `https://the-internet.herokuapp.com`
- **Browsers**: Chromium, Firefox, WebKit configured as projects
- **Timeouts**: 60s test, 15s action, 30s navigation
- **Reporting**: HTML + list reporters
- **Artifacts**: Screenshots on failure, video on failure, trace on first retry

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `BASE_URL` | Application base URL | `https://the-internet.herokuapp.com` |
| `CI` | CI mode (enables retries, single worker) | — |

---

## Tech Stack

- [Playwright](https://playwright.dev/) — Browser automation
- [playwright-bdd](https://github.com/vitalets/playwright-bdd) — Gherkin-to-Playwright compiler
- [TypeScript](https://www.typescriptlang.org/) — Type-safe development
- [Node.js](https://nodejs.org/) — Runtime

---

## License

ISC
