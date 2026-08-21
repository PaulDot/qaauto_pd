import { Locator, Page } from '@playwright/test';

export class FileUploadPage {
    private readonly page: Page ;
    private readonly fileInput: Locator;
    private readonly uploadBtn: Locator;
    private readonly successHeader: Locator; 
    private readonly uploadedMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.fileInput = page.locator('#file-upload');
        this.uploadBtn = page.locator('#file-submit');
        this.successHeader = page.getByRole('heading', { name: 'File Uploaded!' });
        this.uploadedMsg = page.locator('#uploaded-files')
    }

    async navigate(): Promise<void> {
        await this.page.goto('/upload')
    }

    async uploadFile(filepath: string): Promise<void> {
        await this.fileInput.setInputFiles(filepath);
        await this.uploadBtn.click();
    }

    getSuccessHeader() {
        return this.successHeader;
    }

    getUploadedFileName() {
        return this.uploadedMsg;
    }
}
