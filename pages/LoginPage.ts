import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly invalidCredentialError: Locator;
    private readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        /*
            Initialize all the locators automatically
            For every function
        */
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('.oxd-input-field-error-message');
        this.forgotPasswordLink = page.locator('.orangehrm-login-forgot-header');
        this.invalidCredentialError = page.locator('.oxd-text.oxd-text--p.oxd-alert-content-text');
    }

    // Navigate to the login page
    // Assert to make sure we are in the correct page.
    async navigate() {
        await this.page.goto('/', { waitUntil: 'networkidle' });
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    // Login function
    async login(username: string, password: string) {
        if (username !== null) await this.usernameInput.fill(username);
        if (password !== null) await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async clearInputs() {
        await this.usernameInput.clear();
        await this.passwordInput.clear();
    }

    async assertInvalidCredentialMessage(expectedMessage: string) {
        await expect(this.invalidCredentialError).toBeVisible();
        await expect(this.invalidCredentialError).toContainText(expectedMessage);
    }

    async assertInputErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage.nth(0)).toBeVisible();
        await expect(this.errorMessage.nth(0)).toContainText(expectedMessage);
    }

    async assertPasswordMasked() {
        const type = await this.passwordInput.getAttribute('type');
        expect(type).toBe('password');
    }

    async assertForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }
}
