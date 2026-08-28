import { test, expect } from '@playwright/test';
import { NestedFramesPage } from '../pages/nested-frames.js';

test.describe('Nested Frames Sandbox', () => {
    let nestedFramesPage: NestedFramesPage;

    test.beforeEach(async ({ page }) => {
        nestedFramesPage = new NestedFramesPage(page);
        await nestedFramesPage.navigate();
    });

    test('should successfully read text from nested html frames', async () => {
        const leftBody = nestedFramesPage.getLeftFrameBody();
        await expect(leftBody).toHaveText('LEFT');
        const middleBody = nestedFramesPage.getMiddleFrameBody();
        await expect(middleBody).toHaveText('MIDDLE');
        const rightBody = nestedFramesPage.getRightFrameBody();
        await expect(rightBody).toHaveText('RIGHT');
        const bottomBody = nestedFramesPage.getBottomFrameBody();
        await expect(bottomBody).toHaveText('BOTTOM');
    })
})
