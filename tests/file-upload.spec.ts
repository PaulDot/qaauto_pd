import { test, expect } from '@playwright/test';
import { FileUploadPage } from '../pages/file-upload';
import fs from 'fs';

test.describe('File Upload Verification', () => {
    test('should successfully upload a file to the server', async ({ page }) => {
        const uploadPage = new FileUploadPage(page);
        const uniqueFileName = 'temp-portfolio-test.txt';
        // accessible place to put a temp file
        const testFilePath = test.info().outputPath(uniqueFileName);
        fs.writeFileSync(testFilePath, 'Upload Test Content');
        await uploadPage.navigate();
        await uploadPage.uploadFile(testFilePath);
        await expect(uploadPage.getSuccessHeader()).toBeVisible();
        await expect(uploadPage.getUploadedFileName()).toContainText(uniqueFileName);
    });
})
