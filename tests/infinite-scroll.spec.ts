import { test, expect } from '@playwright/test';
import { InfiniteScrollPage } from '../pages/infinite-scroll';

test.describe('Inifinite Scroll Sandbox', () => {
    let infiniteScrollPage: InfiniteScrollPage;

    test.beforeEach(async ({page}) => {
        infiniteScrollPage = new InfiniteScrollPage(page);
        await infiniteScrollPage.navigate();
    });

    test('should add more content as user scrolls down', async () => {
        await expect(infiniteScrollPage.pageHeader).toBeVisible();
        await expect(infiniteScrollPage.scrollParagraphs.first()).toBeVisible();
        const initial = await infiniteScrollPage.scrollParagraphs.count();
        await infiniteScrollPage.scrollToBottom();
        await expect(infiniteScrollPage.scrollParagraphs).not.toHaveCount(initial, { timeout: 10000 });
        const updated = await infiniteScrollPage.scrollParagraphs.count();
        await expect(updated).toBeGreaterThan(initial);
    })

})
