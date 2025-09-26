import { Locator, Page } from '@playwright/test';

export class TablePage {
  readonly page: Page;
  readonly table: Locator;
  readonly dropdown: Locator;
  readonly rows: Locator;
  readonly pagination: Locator;
  readonly headers: Locator;
  readonly searchBar: Locator;
  readonly previousButton: Locator;
  readonly nextButton: Locator
  constructor(page: Page) {
    this.page = page;
    this.table = page.locator('.table.table-striped');
    this.dropdown = page.locator('#example_length select');
    this.rows = page.locator('#demo tr');
    this.pagination = page.locator('#example_paginate ul');
    this.headers = page.locator('#example thead th');
    this.searchBar = page.locator('#example_filter input');
    this.previousButton = this.pagination.locator('li:has-text("Previous")');
    this.nextButton = this.pagination.locator('li:has-text("Next")');
  }

  async goto() {
    await this.page.goto('https://practice.expandtesting.com/dynamic-pagination-table');
  }

  async isVisible() {
    return this.table.isVisible();
  }

  async selectFilter(option: string) {
    await this.dropdown.selectOption(option);
  }

  async rowCount() {
    return this.rows.count();
  }

  async getHeaders() {
    return this.headers.allTextContents();
  }

  async getColumnIndexByName(name: string) {
    const headers = await this.getHeaders();
    const index = headers.findIndex(h => h.trim() === name);
    return index !== -1 ? index : null;
  }

  async getColumnValues(colIndexOrName: number | string) {
    let index: number;

    if (typeof colIndexOrName === 'string') {
      const idx = await this.getColumnIndexByName(colIndexOrName);
      if (idx === null) throw new Error(`Column "${colIndexOrName}" not found`);
      index = idx + 1; // nth-child is 1-based
    } else {
      index = colIndexOrName + 1;
    }

    return this.rows.locator(`td:nth-child(${index})`).allTextContents();
  }

  async search(term: string) {
    await this.searchBar.fill(term);
  }

  async goToPage(pageNumber: string | number) {
    await this.pagination.locator(`li >> text=${pageNumber}`).click();
  }

  async getCurrentPage() {
    return this.pagination.locator("li a[aria-current='page']").textContent();
  }

  async getPaginationList() {
    const paginationWithoutPrevAndNext = this.pagination.locator("li:not(:first-child):not(:last-child)");
    return paginationWithoutPrevAndNext

  }

  async sortByColumn(indexOrName: number | string) {
    let index: number;

    if (typeof indexOrName === 'string') {
      const idx = await this.getColumnIndexByName(indexOrName);
      if (idx === null) throw new Error(`Column "${indexOrName}" not found`);
      index = idx;
    } else {
      index = indexOrName;
    }

    await this.headers.nth(index).click();
  }
}