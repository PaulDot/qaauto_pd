import { test, expect } from '@playwright/test';
import { DynamicLoadingPage } from '../pages/dynamic-loading.js';

let dynamicLoadingPage: DynamicLoadingPage;

test.describe('dynamic_loading/1', () => {

    test.beforeEach(async ({ page }) => {
        dynamicLoadingPage = new DynamicLoadingPage(page);
        await dynamicLoadingPage.navigateToExample(1);
    })

    test('should reveal element already present but hidden', async () => {
        await expect(dynamicLoadingPage.startButton).toBeVisible();
        await expect(dynamicLoadingPage.loadingBar).not.toBeVisible();
        await expect(dynamicLoadingPage.finishText).not.toBeVisible();
        await expect(dynamicLoadingPage.finishText).toBeAttached();
        await dynamicLoadingPage.clickStart();
        await expect(dynamicLoadingPage.loadingBar).toBeVisible();
        await expect(dynamicLoadingPage.finishText).toBeVisible({timeout: 10000});
    })
})

test.describe('dynamic_loading/2', () => {

    test.beforeEach(async ({ page }) => {
        dynamicLoadingPage = new DynamicLoadingPage(page);
        await dynamicLoadingPage.navigateToExample(2);
    })

    test('should wait for elements dynamically injected into the DOM', async () => {
        await expect(dynamicLoadingPage.startButton).toBeVisible();
        await expect(dynamicLoadingPage.loadingBar).not.toBeVisible();
        await expect(dynamicLoadingPage.finishText).not.toBeVisible();
        await expect(dynamicLoadingPage.finishText).not.toBeAttached();
        await dynamicLoadingPage.clickStart();
        await expect(dynamicLoadingPage.loadingBar).toBeVisible();
        await expect(dynamicLoadingPage.finishText).toBeVisible({timeout: 10000});
    })
})
