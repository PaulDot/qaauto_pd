import { test, expect } from '@playwright/test';
import { DropdownPage } from '../pages/dropdown';

test.describe('Dropdown List Page Tests', () => {
    let dropdownPage: DropdownPage;

    test.beforeEach(async ({ page }) => {
        dropdownPage = new DropdownPage(page);
        await dropdownPage.navigate();
    });

    test.only('should verify default page state', async () => {
        await expect(dropdownPage.pageHeader).toBeVisible();
        const selectedText = await dropdownPage.getSelectedText();
        expect(selectedText).toBe('Please select an option');
        await expect(dropdownPage.dropdownSelect).toHaveValue('');
        await expect(dropdownPage.dropdownSelect.locator('option')).toHaveCount(3); // 2 options + default
    });

    test('should select option by visible text', async () => {
        await dropdownPage.selectByText('Option 1');
        const selectedText = await dropdownPage.getSelectedText();
        expect(selectedText).toBe('Option 1');
        await expect(dropdownPage.dropdownSelect).toHaveValue('1');
    });

    test('should select option by index', async () => {
        await dropdownPage.selectByIndex(2);
        const selectedText = await dropdownPage.getSelectedText();
        expect(selectedText).toBe('Option 2');
        await expect(dropdownPage.dropdownSelect).toHaveValue('2');
    })

});
