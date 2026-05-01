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
    private readonly alreadyExits: Locator;
    private readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userRoleInput = page.locator(
            'body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
        );
        this.employerName = page.locator("input[placeholder='Type for hints...']");
        this.statusInput = page.locator(
            'body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > form:nth-child(3) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
        );
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
        this.requiredText = page.locator('span:has-text("Required")');
        this.passwordNotMatch = page.locator('span:has-text("Passwords do not match")');
        this.cancelButton = page.locator('button:has-text("Cancel")');
        this.alreadyExits = this.page.locator('span:has-text("Already exists")');
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

        await this.employerName.fill(employerName ?? 'john');
        await this.page.getByRole('option').filter({ hasText: employerName }).first().click();

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.saveButton.click();

        await this.page.waitForTimeout(5000);

        expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');
    }

    // Add user via fill all required filed
    async addUserWithoutFillingForm(
        userRole: string,
        status: string,
        username: string,
        password: string,
        employerName: string,
    ) {
        await this.userRoleInput.click();
        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerName.fill(employerName);

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPasswordInput.fill(password);

        await this.saveButton.click();

        await expect(this.requiredText).toHaveCount(5);

        for (let i = 0; i < (await this.requiredText.count()); i++) {
            await expect(this.requiredText.nth(i)).toBeVisible();
        }
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
        expect(await this.passwordNotMatch.textContent()).toBe('Passwords do not match');
    }

    // Add user via fill all required filed
    async addUserWithSameUsername(
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
        await this.confirmPasswordInput.fill(`${password}123`);

        // await this.saveButton.click();

        await expect(this.alreadyExits).toBeVisible();
        expect(await this.alreadyExits.textContent()).toBe('Already exists');
    }

    async assertCancelButton() {
        await this.cancelButton.click();
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        );
    }
}
