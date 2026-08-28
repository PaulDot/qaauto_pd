import { test, expect } from "@playwright/test";
import { StatusCodesPage, StatusCode } from "../pages/status-codes.js";

test.describe('HTTP Status Codes Sandbox', () => {
    let statusCodesPage: StatusCodesPage;

    test.beforeEach(async ({ page }) => {
        statusCodesPage = new StatusCodesPage(page);
        await statusCodesPage.navigate();
    })

    const cases: StatusCode[] = [200, 301, 404, 500]

    for (const code of cases) {
        // loops through to separately test each of the entries in the cases array above
        test(`should return correct network and UI response for ${code}`, async () => {
            const responseResolve = statusCodesPage.waitForResponseFor(code);
            await statusCodesPage.clickStatusCodeLink(code);
            const response = await responseResolve;
            expect(response.status()).toBe(code);
            await expect(statusCodesPage.contentMessage).toContainText(`This page returned a ${code} status code.`);    
        });
    }
})
