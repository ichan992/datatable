import { test, expect } from '@playwright/test';
import { TablePage } from './TablePage';

test.describe('Table - Filter', () => {
    test.beforeEach(async ({ page }) => {
        const tablePage = new TablePage(page);
        await tablePage.goto();
    });

    test('dropdown is visible', async ({ page }) => {
        const tablePage = new TablePage(page);
        await expect(tablePage.dropdown).toBeVisible();
    });

    test('filter entries work correctly', async ({ page }) => {
        const tablePage = new TablePage(page);

        // Select 3 entries
        await tablePage.selectFilter('3');
        expect(await tablePage.rowCount()).toBe(3); 

        // Select 5 entries
        await tablePage.selectFilter('5');
        expect(await tablePage.rowCount()).toBe(5);

        // Select 10 entries
        await tablePage.selectFilter('10');
        expect(await tablePage.rowCount()).toBe(10);

        // Select All entries (>= 10 rows)
        await tablePage.selectFilter('All');
        expect(await tablePage.rowCount()).toBeGreaterThanOrEqual(10);
    });
});