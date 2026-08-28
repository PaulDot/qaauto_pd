import { Download, Locator, Page } from '@playwright/test';

export class FileDownloadPage {
    private readonly page: Page;
    private readonly dlLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.dlLink = page.locator('.example a').first();
    }

    async navigate(): Promise<void> {
        await this.page.goto('/download');
    }

    async downloadFirst(): Promise<Download> {
        const dlpromise = this.page.waitForEvent('download');
        await this.dlLink.click();
        return await dlpromise;
    }
}
