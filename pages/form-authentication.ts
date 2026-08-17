import { Page } from '@playwright/test';

export class FormAuthenticationPage {
    private readonly page: Page;
    private readonly usernameInput = () => this.page.locator('#username');
    private readonly passwordInput = () => this.page.locator('#password');
    private readonly loginButton = () => this.page.getByRole('button', { name: 'Login' });
    private readonly topMessage = () => this.page.locator('#flash');
    private readonly logoutButton = () => this.page.getByRole('link', { name: 'Logout' });
    
    constructor(page: Page){
        this.page = page;
    }

    async navigateToLogin(): Promise<void> {
        await this.page.goto('/login')
    }

    async loginByUi(user: string, pass: string): Promise<void> {
        await this.usernameInput().fill(user);
        await this.passwordInput().fill(pass);
        await this.loginButton().click();
    }

    async navigateToSecureArea(): Promise<void> {
        await this.page.goto('/secure')
    }

    async logout(): Promise<void> {
        await this.logoutButton().click();
    }

    getMsgLocator() {
        return this.topMessage();
    }
}
