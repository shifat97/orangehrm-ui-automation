import { expect, Locator, Page } from '@playwright/test';

export class AddUserPage {
    private readonly page: Page;
    private readonly userRoleInput: Locator;
    private readonly employerName: Locator;
    private readonly statusInput: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly confirmPasswordInput: Locator;
    private readonly saveButton: Locator;
    private readonly requiredText: Locator;
    private readonly passwordNotMatch: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userRoleInput = page.locator('i.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').first();
        this.employerName = page.locator("input[placeholder='Type for hints...']");
        this.statusInput = page.locator('i.oxd-icon.bi-caret-down-fill.oxd-select-text--arrow').last();
        this.usernameInput = page.locator(
            "div[class='oxd-form-row'] div[class='oxd-grid-2 orangehrm-full-width-grid'] div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']",
        );
        this.passwordInput = page.locator(
            "div[class='oxd-grid-item oxd-grid-item--gutters user-password-cell'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']",
        );
        this.confirmPasswordInput = page.locator(
            "div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']",
        );
        this.saveButton = page.locator('button:has-text("Save")');
        this.requiredText = page.getByText('Required');
        this.passwordNotMatch = page.locator('span:has-text("Passwords do not match")');
        this.cancelButton = page.locator('button:has-text("Cancel")');
    }

    async navigate() {
        await this.page.goto('/web/index.php/admin/saveSystemUser');
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser',
        );
    }

    // Add user via fill all required filed
    async addUser(userRole: string, status: string, username: string, password: string, employerName?: string) {
        await this.userRoleInput.click();

        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerName.fill(employerName ?? 'John  Maggio');

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.page.waitForTimeout(10000);

        await this.saveButton.click();

        expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }

    // Add user via fill all required filed
    async addUserWithoutFillingForm(
        userRole: string,
        status: string,
        username: string,
        password: string,
        employerName?: string,
    ) {
        await this.userRoleInput.click();
        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerName.fill(employerName ?? 'John  Maggio');

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.saveButton.click();

        await expect(this.requiredText).toHaveCount(5);
        await expect(this.requiredText).toBeVisible();
    }

    // Add user via fill all required filed
    async addUserChangingConfirmPassword(
        userRole: string,
        status: string,
        username: string,
        password: string,
        employerName?: string,
    ) {
        await this.userRoleInput.click();
        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerName.fill(employerName ?? 'John  Maggio');

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(`${password}222`);

        // await this.saveButton.click();

        await expect(this.passwordNotMatch).toBeVisible();
        await expect(this.passwordNotMatch.textContent()).toBe('Passwords do not match');
    }

    async assertCancelButton() {
        await this.cancelButton.click();
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        );
    }
}
