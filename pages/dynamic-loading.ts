import { Locator, Page } from '@playwright/test';

type ExampleNumber = 1 | 2

export class DynamicLoadingPage {
    readonly page: Page;
    readonly startButton: Locator;
    readonly loadingBar: Locator;
    readonly finishText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.startButton = page.getByRole('button',{name:'Start'});
        this.loadingBar = page.locator('#loading');
        this.finishText = page.locator('#finish h4');
    }

    async navigateToExample(exampleNumber: ExampleNumber): Promise<void> {
        this.page.goto(`/dynamic_loading/${exampleNumber}`)
    }

    async clickStart(): Promise<void> {
        await this.startButton.click();
    }
}
