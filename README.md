Playwright Automated Testing Project

This project demonstrates the use of Playwright to create a reliable end-to-end automated testing framework for a DataTable-based web application. The goal of the project is to validate essential table functionalities such as sorting, pagination, searching, filtering, and accessibility, ensuring the application behaves consistently across different browsers and environments.

The test suite includes coverage for multiple scenarios:

Sorting – Each column can be sorted in ascending and descending order, verifying that the data is displayed correctly and that the sorting feature adapts to different column types such as text and numeric values.

Pagination – Tests confirm that users can navigate between pages, including first, last, previous, and next buttons, ensuring the correct number of rows is displayed per page.

Search – Both global search and column-specific searches are tested. This ensures that users can quickly find relevant records, and that search filters interact correctly with pagination and sorting.

Filtering & Dropdown Controls – Row length selectors (e.g., 5, 10, 25) are validated to confirm that they dynamically adjust the number of displayed records.

Accessibility Checks – Tests detect aria-current attributes and disabled states for pagination buttons, helping maintain accessibility compliance.

The project leverages Playwright’s powerful cross-browser testing capability, running on Chromium, Firefox, and WebKit. This helps identify potential browser-specific issues early in the development cycle.

Tech Stack

Playwright (JavaScript/TypeScript)

Node.js for runtime and package management

Supports headless and headed execution modes

Running the Tests
# Install dependencies
npm install

# Run all tests
npx playwright test

# Run on a specific browser
npx playwright test --project=firefox
