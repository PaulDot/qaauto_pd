import { test, expect } from '@playwright/test';
import { FileDownloadPage } from '../pages/file-download';
import fs from 'fs';

test.describe('File Download Verification', () => {
    test('should successfully download from the server', async ({ page }) => {
        const dlPage = new FileDownloadPage(page);
        await dlPage.navigate();
        const dl = await dlPage.downloadFirst();
        expect(dl.url()).toBeTruthy();
        const suggestedFileName = dl.suggestedFilename();
        expect(suggestedFileName.length).toBeGreaterThan(0);
        const targetSavePath = test.info().outputPath(suggestedFileName);
        await dl.saveAs(targetSavePath);
        expect(fs.existsSync(targetSavePath)).toBeTruthy();
    });
});
