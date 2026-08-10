import { Locator, Page } from '@playwright/test';

export class LargePage {
  private readonly page: Page;
  readonly pageHeader: Locator;
  readonly nestedSectionContainer: Locator;
  readonly noSiblingsHeader: Locator;
  readonly siblingsHeader: Locator;
  readonly tableContainer: Locator;
  readonly tableHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageHeader = page.getByRole('heading', { name: 'Large & Deep DOM' });
    this.nestedSectionContainer = page.locator('#siblings');
    this.noSiblingsHeader = page.getByRole('heading', { name: 'No Siblings', exact: true });
    this.siblingsHeader = page.getByRole('heading', { name: 'Siblings', exact: true });
    this.tableContainer = page.locator('#large-table');
    this.tableHeader = this.tableContainer.locator('xpath=preceding-sibling::*[1][self::h4]');  //the <h4> before tableContainer
  }

  async navigate() {
    await this.page.goto('/large');
  }

  getNestedItemByText(text: string): Locator {
    return this.nestedSectionContainer.getByText(text, { exact: true });
  }

  async getTableColumnCount(): Promise<number> {
    return await this.tableContainer.locator('tr').first().locator('th').count();
  }

  async getTableRowCount(): Promise<number> {
    return await this.tableContainer.locator('tr').count();
  }

  getTableGridCell(row: number, column: number): Locator {
    // Looks through the table for any element containing the exact text e.g. "2.4"
    return this.tableContainer.getByText(`${row}.${column}`, { exact: true });
  }
}
