import { Locator, Page, Response } from '@playwright/test';

export type StatusCode = 200 | 301 | 404 | 500;

export class StatusCodesPage {
    private readonly page: Page;
    readonly contentMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.contentMessage = page.locator('#content p')
    }

    async navigate(): Promise<void> {
        await this.page.goto('/status_codes');
    }

    async clickStatusCodeLink(code: StatusCode): Promise<void> {
        await this.page.locator(`a[href="status_codes/${code}"]`).click();
    }

    // listener for network response of a specific status code
    waitForResponseFor(code: StatusCode): Promise<Response> {
        return this.page.waitForResponse(response => 
            response.url().includes(`/status_codes/${code}`)
        );
    }
}
