import { test, expect } from '@playwright/test';
import { TablePage } from './TablePage';

test.describe('Table - Pagination', () => {
    test.beforeEach(async ({ page }) => {
        const tablePage = new TablePage(page);
        await tablePage.goto();
    });

    test('previous button disabled if on first page', async ({ page }) => {
        const tablePage = new TablePage(page);
        const currentPage = await tablePage.getCurrentPage()
        if (currentPage === '1') {
            await expect(tablePage.previousButton).toHaveClass(/.*disabled.*/);
        }
    })
    test('given page only contain 1 entry', async ({ page }) => {
        const tablePage = new TablePage(page);
        const currentPage = await tablePage.getCurrentPage()
        const totalPaginationCount = await (await tablePage.getPaginationList()).count()

        //set All filter to simulate 1 page
        await tablePage.selectFilter('All');

        if (totalPaginationCount < 2) {
            await expect(tablePage.previousButton).toHaveClass(/.*disabled.*/);
            await expect(tablePage.nextButton).toHaveClass(/.*disabled.*/);
        }

        await tablePage.selectFilter('3');
    })

    test('navigate to last page', async ({ page }) => {
        const tablePage = new TablePage(page);
        await tablePage.selectFilter('5');
        const totalPages = await tablePage.getPaginationList()
        const getLastPage = (await totalPages.allInnerTexts())[await totalPages.count() - 1]

        await tablePage.goToPage(getLastPage);

        const currentPage = await tablePage.getCurrentPage()

        expect(currentPage).toBe('2');
        await expect(tablePage.nextButton).toHaveClass(/.*disabled.*/);

        await tablePage.selectFilter('3');
    })
    test('navigates to next page', async ({ page }) => {
        const tablePage = new TablePage(page);

        // Get values from first column before navigation
        const before = await tablePage.getColumnValues(0);

        // Go to page 2
        await tablePage.goToPage(2);

        // Get values again after navigation
        const after = await tablePage.getColumnValues(0);
        const currentPage = await tablePage.getCurrentPage()

        // Assertions
        expect(before).not.toEqual(after);
        expect(currentPage).toBe('2');
    });

});