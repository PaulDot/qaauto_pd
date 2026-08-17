import { test, expect } from '@playwright/test';
import { FormAuthenticationPage } from '../pages/form-authentication';
import { AuthClient } from '../pages/api/auth.client';

test.describe('Form Authentication via UI and API', () => {
    test.describe('UI Path Tests', () => {

        test('should login and logout successfully via UI form with valid credentials', async ({ page }) => {
            const authPage = new FormAuthenticationPage(page);
            await authPage.navigateToLogin();
            await authPage.loginByUi('tomsmith', 'SuperSecretPassword!');
            await expect(page).toHaveURL(/.*secure/);
            await expect(authPage.getMsgLocator()).toContainText('You logged into a secure area!');
            await authPage.logout();
            await expect(page).toHaveURL(/.*login/);
            await expect(authPage.getMsgLocator()).toContainText('You logged out of the secure area!');
            await authPage.navigateToSecureArea(); // Attempt force nav back to secure area post-logout
            await expect(authPage.getMsgLocator()).toContainText(' You must login to view the secure area!');
            await expect(page).toHaveURL(/.*login/); 
        });

        test('should deny direct anonymous access to /secure', async ({ page }) => {
            const authPage = new FormAuthenticationPage(page);
            await authPage.navigateToSecureArea();
            await expect(page).toHaveURL(/.*login/); // Server should reject and redirect back to login
            await expect(authPage.getMsgLocator()).toContainText('You must log in to view the secure area!');
        });

        test('should reject UI auth with invalid credentials', async ({ page }) => {
            const authPage = new FormAuthenticationPage(page);
            await authPage.navigateToLogin();
            await authPage.loginByUi('tomsmith', 'WrongPassword');
            await expect(authPage.getMsgLocator()).toContainText('Your username is invalid!');
            await expect(page).toHaveURL(/.*login/);
        });
    });

    test.describe('Pure API Path Tests @api', () => {
        test('should authorise successfully via API with correct credentials', async ({ request }) => {
            const authClient = new AuthClient(request);
            const response = await authClient.loginByApi('tomsmith', 'SuperSecretPassword!');
            expect(response.ok()).toBeTruthy();
        })

        //ToDo: add more tests, add filtering (grepInvert?) so api tests don't repeat on multiple browsers
    })

})
