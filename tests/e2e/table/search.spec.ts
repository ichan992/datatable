import { test, expect } from '@playwright/test';
import { TablePage } from './TablePage';


test.describe('Table - Global Search', () => {
  test.beforeEach(async ({ page }) => {
    const tablePage = new TablePage(page);
    await tablePage.goto();
  });

  test('global search returns rows containing search term', async ({ page }) => {
    const tablePage = new TablePage(page);

    // Grab the first row values
    const firstRowValues = await tablePage.rows.first().locator('td').allTextContents();

    // Loop through each value in first row and search globally
    for (const term of firstRowValues) {
      if (!term) continue;

      await tablePage.search(term);

      // Get all visible rows
      const visibleRows = tablePage.rows.filter({ has: tablePage.page.locator(`td:has-text("${term}")`) });
      const count = await visibleRows.count();

      expect(count).toBeGreaterThan(0);

      // Verify each visible row contains the term in any column
      for (let i = 0; i < count; i++) {
        const rowValues = await visibleRows.nth(i).locator('td').allTextContents();
        const found = rowValues.some(v => v.toLowerCase().includes(term.toLowerCase()));
        expect(found).toBeTruthy();
      }
    }
  });
});