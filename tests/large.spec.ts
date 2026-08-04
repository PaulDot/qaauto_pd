import { test, expect } from '@playwright/test';
import { LargePage } from '../pages/large';

test.describe('Large & Deep DOM Page Tests', () => {
  let largePage: LargePage;

  test.beforeEach(async ({ page }) => {
    largePage = new LargePage(page);
    await largePage.navigate();
  });

  test('should verify page layout and title headings', async () => {
    await expect(largePage.pageHeader).toBeVisible();
    await expect(largePage.noSiblingsHeader).toBeVisible();
    await expect(largePage.siblingsHeader).toBeVisible();
    await expect(largePage.tableHeader).toBeVisible();
    await expect(largePage.tableHeader).toHaveText('Table');
  });

  test('should verify the deeply nested structural elements before the table', async () => {
    await expect(largePage.nestedSectionContainer).toBeAttached();
    const firstNestedItem = largePage.getNestedItemByText('1.2');
    await expect(firstNestedItem).toBeAttached();
    const deeperNestedItem = largePage.getNestedItemByText('44.3');
    await expect(deeperNestedItem).toBeAttached();
  });


  test('table should contain expected number of rows and columns', async () => {
    const columnCount = await largePage.getTableColumnCount();
    const rowCount = await largePage.getTableRowCount();
    expect(columnCount).toBe(50);
    expect(rowCount).toBe(51);  // including header row
  });

  test('should display correct and visible text in edge cells', async () => {
    const leftCell = largePage.getTableGridCell(1, 1);
    await expect(leftCell).toBeVisible();
    await expect(leftCell).toHaveText('1.1');
    const rightCell = largePage.getTableGridCell(1, 50);
    await expect(rightCell).toBeVisible();
    await expect(rightCell).toHaveText('1.50');
    const deepCell = largePage.getTableGridCell(25, 40);
    await expect(deepCell).toBeVisible();
    await expect(deepCell).toHaveText('25.40');
  });

});
