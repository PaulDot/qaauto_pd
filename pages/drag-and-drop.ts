import { Locator, Page } from '@playwright/test';

export class DragAndDropPage{
    private readonly page: Page;
    readonly columnA: Locator;
    readonly columnB: Locator;

    constructor(page: Page) {
        this.page = page;
        this.columnA = page.locator('#column-a');
        this.columnB = page.locator('#column-b');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/drag_and_drop');
    }

    async dragXToY(source: Locator, target: Locator): Promise<void> {
        await source.dragTo(target);
    }
}
