import { test, expect } from '@playwright/test';
import { FormAuthenticationPage } from '../pages/form-auth';
import { AuthClient } from '../api/form-auth.client';

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
            await expect(authPage.getMsgLocator()).toContainText('You must login to view the secure area!');
            await expect(page).toHaveURL(/.*login/); 
        });

        test('should deny direct anonymous access to /secure', async ({ page }) => {
            const authPage = new FormAuthenticationPage(page);
            await authPage.navigateToSecureArea();
            await expect(page).toHaveURL(/.*login/); // Server should reject and redirect back to login
            await expect(authPage.getMsgLocator()).toContainText('You must login to view the secure area!');
        });

        test('should reject UI auth with invalid credentials', async ({ page }) => {
            const authPage = new FormAuthenticationPage(page);
            await authPage.navigateToLogin();
            await authPage.loginByUi('tomsmith', 'WrongPassword');
            await expect(authPage.getMsgLocator()).toContainText('Your password is invalid!');
            await expect(page).toHaveURL(/.*login/);
        });
    });

    test.describe('Pure API Path Tests @api', () => {
        let authClient: AuthClient;

        test.beforeEach(async ({ request }) => {
            authClient = new AuthClient(request);
        });

        test('should allow access to /secure when authenticated via API', async () => {
            const loginResponse = await authClient.loginByApi('tomsmith', 'SuperSecretPassword!');
            expect([302, 303]).toContain(loginResponse.status());  // handle diff behaviour on docker vs live site
            const secureResponse = await authClient.getSecureArea();
            expect(secureResponse.status()).toBe(200);
            const body = await secureResponse.text();
            expect(body).toContain('Secure Area');
        })

        test('should deny access to /secure when unauthenticated', async () => {
            // Anonymous attempt
            const anonResponse = await authClient.getSecureArea();
            expect(anonResponse.status()).toBe(302);  // Found, we don't let it redirect
            expect(anonResponse.headers()['location']).toContain('/login');
            const anonymousBody = await anonResponse.text();
            expect(anonymousBody).not.toContain('Secure Area');
            // Attempt login with wrong creds
            const loginResponse = await authClient.loginByApi('tomsmith', 'WrongPassword!');
            expect([302, 303]).toContain(loginResponse.status());
            // /secure remains locked
            const confirmResponse = await authClient.getSecureArea();
            expect(confirmResponse.status()).toBe(302);
            expect(confirmResponse.headers()['location']).toContain('/login');
            const failedBody = await confirmResponse.text();
            expect(failedBody).not.toContain('Secure Area');
        });
    })

})
