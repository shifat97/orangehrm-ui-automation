import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
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
    }

    // Navigate to the login page
    // Assert to make sure we are in the correct page.
    async navigate() {
        await this.page.goto('/');
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

    async assertErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toContainText(expectedMessage);
    }

    async assertPasswordMasked() {
        const type = await this.passwordInput.getAttribute('type');
        expect(type).toBe('password');
    }

    async assertForgotPasswordLink() {
        await this.forgotPasswordLink.click();
    }
}
