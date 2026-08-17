import { FrameLocator, Page } from '@playwright/test';

export class NestedFramesPage {
    private readonly page: Page;
    readonly topFrame: FrameLocator;
    readonly bottomFrame: FrameLocator;

    constructor(page: Page){
        this.page = page;
        this.topFrame = page.frameLocator('frame[name="frame-top"]');
        this.bottomFrame = page.frameLocator('frame[name="frame-bottom"]');
    }

    async navigate(): Promise<void>{
        await this.page.goto('/nested_frames')
    }

    getLeftFrameBody() {
        return this.topFrame.frameLocator('frame[name="frame-left"]').locator('body');
    }

    getMiddleFrameBody() {
        return this.topFrame.frameLocator('frame[name="frame-middle"]').locator('body');
    }

    getRightFrameBody() {
        return this.topFrame.frameLocator('frame[name="frame-right"]').locator('body');
    }

    getBottomFrameBody() {
        return this.bottomFrame.locator('body');
    }
}
