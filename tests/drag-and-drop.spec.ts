import { test, expect } from '@playwright/test';
import { DragAndDropPage } from '../pages/drag-and-drop.js';

test.describe('Drag and Drop Sandbox', () => {
    let dragDropPage: DragAndDropPage;

    test.beforeEach(async ({page}) => {
        dragDropPage = new DragAndDropPage(page);
        await dragDropPage.navigate();
    });

    test('should successfully drag and drop columns around', async () => {
        await expect(dragDropPage.columnA).toHaveText('A');
        await expect(dragDropPage.columnB).toHaveText('B');
        await dragDropPage.dragXToY(dragDropPage.columnA, dragDropPage.columnB);
        await expect(dragDropPage.columnA).toHaveText('B');
        await expect(dragDropPage.columnB).toHaveText('A');
        await dragDropPage.dragXToY(dragDropPage.columnB, dragDropPage.columnA);
        await expect(dragDropPage.columnA).toHaveText('A');
        await expect(dragDropPage.columnB).toHaveText('B');
    });
});
