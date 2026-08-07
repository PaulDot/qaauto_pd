import { Locator, Page } from '@playwright/test';

export class DropdownPage {
    readonly page: Page;
    readonly pageHeader: Locator;
    readonly dropdownSelect: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByRole('heading', { name: 'Dropdown List' });
        this.dropdownSelect = page.locator('#dropdown');
    }

    async navigate() {
        await this.page.goto('/dropdown');
    }
    
    async selectByText(text: string) {
    await this.dropdownSelect.selectOption({ label: text });
    }

    async selectByIndex(index: number) {
        await this.dropdownSelect.selectOption({ index: index });
    }

    async getSelectedValue(): Promise<string> {
        return await this.dropdownSelect.inputValue();
    }

    async getSelectedText(): Promise<string> {
        return await this.dropdownSelect.locator('option:checked').innerText();
    }
}
