import { expect, Page } from '@playwright/test';

export class AdminPage {
    private readonly page: Page;
    private readonly userNameInput;
    private readonly userRoleInput;
    private readonly employerNameInput;
    private readonly statusInput;
    private readonly searchButton;
    private readonly resetButton;
    private readonly noUserFound;
    private readonly addButton;
    private readonly tableRows;
    private readonly invalidInputError;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator(
            "div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']",
        );
        this.userRoleInput = page.locator(
            'body > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)',
        );
        this.employerNameInput = page.getByPlaceholder('Type for hints...');
        this.statusInput = page.locator('div').filter({ hasText: '-- Select --' }).last();
        this.searchButton = page.locator('button:has-text("Search")');
        this.resetButton = page.locator('');
        this.noUserFound = page.locator('span:has-text("No Records Found")');
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.tableRows = page.locator("div[class='oxd-table-card'] div[role='row']");
        this.invalidInputError = page.locator('');
    }

    async navigate() {
        await this.page.goto('/web/index.php/admin/viewSystemUsers');
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        );
        await expect(this.page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    }

    async countTableRows() {
        return await this.tableRows.count();
    }

    // Fill all or partial information for search
    async searchWithFilters(username: string, userRole: string, employerName: string, status: string) {
        await this.userNameInput.fill(username ?? '');

        await this.userRoleInput.click();
        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerNameInput.fill(employerName ?? '');
        await this.page.getByRole('option').filter({ hasText: employerName }).first().click();

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.searchButton.click();

        // const countText = await this.tableHeaderText.innerText();
        // const extractCountText = countText.split(' ')[0].replace('(', '').replace(')', '');
        // const countNumber = parseInt(extractCountText, 10);

        // const rowCount = await this.countTableRows();

        // expect(countNumber).toBe(rowCount);
    }

    async assertNoRecordFoundText() {
        await expect(this.noUserFound).toBeVisible();
    }

    async assertAddUserButton() {
        await expect(this.addButton).toBeVisible();
        await expect(this.addButton).toBeEnabled();

        await this.addButton.click();

        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser',
        );
    }
}
