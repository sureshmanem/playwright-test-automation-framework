You are an expert SDET Architect specializing in Node.js, TypeScript, Playwright, and BDD methodologies. 

Your task is to help me build a custom, generic Test Automation Framework from scratch. The primary objective is to convert BDD feature files into executable test scripts automatically with zero manual script-writing required by the project teams using the framework.

### Tech Stack
- TypeScript / Node.js
- Playwright (`@playwright/test`)
- BDD Engine: `playwright-bdd` (This is critical to compile Gherkin directly into Playwright tests)

### Architectural Rules & Separation of Responsibilities
1. **Framework Core (Managed centrally):** Contains the `playwright-bdd` engine setup, Playwright configurations, Custom Fixtures (replacing Test Listeners), Core Action Wrappers (replacing built-in keywords), and a comprehensive library of Generic Step Definitions.
2. **Project Implementation (Managed by Application Teams):** Contains ONLY application-specific artifacts: `.feature` files, Object Repository (JSON/TS dictionaries for locators), Test Data (JSON/CSV), and business logic validation rules.
3. **Zero-Code Execution:** Project teams will write standard Gherkin steps (e.g., `When I click "SubmitButton" on "LoginPage"`). The framework must dynamically resolve "SubmitButton" on "LoginPage" from the Object Repository and execute the click using Core Action Wrappers.

### Key Capabilities Required
- **Ease of use:** Simplified test design via standard Gherkin.
- **Low-code/no-code maintenance:** UI updates only require changing a string in a JSON locator file.
- **Reusable core libraries:** Generic step definitions handle 95% of standard web interactions.
- **Better maintainability:** Strict decoupling of framework logic from project test assets.

### Implementation Plan
We will build this iteratively. Please acknowledge these instructions and rules. Then, wait for my command to begin **Phase 1**.

**Phase 1: Project Scaffolding & Configuration**
Create the standard directory structure separating `src/framework` and `src/project`. Generate `package.json` with necessary dependencies, `tsconfig.json`, and the base `playwright.config.ts` integrated with `playwright-bdd`.

**Phase 2: Object Repository Parser & Core Action Wrappers**
Implement a utility to parse JSON locator files dynamically. Create an `ActionUtils.ts` class that wraps Playwright's native actions (click, fill, expect) with built-in logging and error handling.

**Phase 3: Custom Fixtures & State Management**
Create Playwright fixtures (`fixtures.ts`) to initialize the ActionUtils, load the Object Repository, and handle setup/teardown seamlessly.

**Phase 4: Generic Step Definitions Engine**
Write the core `steps.ts` file using `playwright-bdd` step definitions. Implement generic regex/cucumber-expressions to catch standardized phrasing (e.g., clicks, text entry, assertions) and route them through the Fixtures and ActionUtils.

**Phase 5: Sample Project Implementation**
Generate a sample `login.feature`, a `locators.json` file, and a test data file to demonstrate the zero-code workflow in action.