import { test, expect } from '@playwright/test';
import { TablePage } from './TablePage';


test.describe('Table - Sorting', () => {
  test.beforeEach(async ({ page }) => {
    const tablePage = new TablePage(page);
    await tablePage.goto();
  });

  test('sorts first column in descending order', async ({ page }) => {
    const tablePage = new TablePage(page);

    // Click twice for descending
    await tablePage.sortByColumn(0);


    // Get values again
    const values = await tablePage.getColumnValues(0);

    // Create a reverse-sorted copy
    const sorted = [...values].sort((a, b) => b.localeCompare(a));

    // Check descending order

    expect(values).toEqual(sorted);
  });
  test('sorts first column in ascending order', async ({ page }) => {
    const tablePage = new TablePage(page);

    // Click first column header (index 0 = first column)

    await tablePage.sortByColumn(0);
    await tablePage.sortByColumn(0);
    // Get values from column 1
    const values = await tablePage.getColumnValues(0);

    // Create a sorted copy
    const sorted = [...values].sort((a, b) => a.localeCompare(b));

    // Check ascending order
    expect(values).toEqual(sorted);
  });



  test('sorts gender column in ascending order', async ({ page }) => {
    const tablePage = new TablePage(page);


    await tablePage.sortByColumn(1);

    // Get values from gender Column
    const values = await tablePage.getColumnValues(1);

    // Create a sorted copy
    const sorted = [...values].sort((a, b) => a.localeCompare(b));

    // Check ascending order
    expect(values).toEqual(sorted);
  });

  test('sorts gender column in descending order', async ({ page }) => {
    const tablePage = new TablePage(page);

    // Click twice for descending
    await tablePage.sortByColumn(1);
    await tablePage.sortByColumn(1);

    // Get values again
    const values = await tablePage.getColumnValues(1);

    // Create a reverse-sorted copy
    const sorted = [...values].sort((a, b) => b.localeCompare(a));

    // Check descending order

    expect(values).toEqual(sorted);
  });
});