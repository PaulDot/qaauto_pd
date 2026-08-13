import { Locator, Page } from '@playwright/test';

export class InfiniteScrollPage {
    private readonly page: Page;
    readonly pageHeader: Locator;
    readonly scrollParagraphs: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeader = page.getByRole('heading', { name: 'Infinite Scroll' });
        this.scrollParagraphs = page.locator('.jscroll-inner > div')
    }

    async navigate(): Promise<void> {
        await this.page.goto('/infinite_scroll')
    }

    async scrollToBottom(): Promise<void> {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }
}
