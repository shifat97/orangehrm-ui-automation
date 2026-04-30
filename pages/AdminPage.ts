import { expect, Page } from '@playwright/test';

export class AdminPage {
    private readonly page: Page;
    private readonly userNameInput;
    private readonly userRoleInput;
    private readonly employerNameInput;
    private readonly statusInput;
    private readonly searchButton;
    private readonly resetButton;
    private readonly tableHeaderText;
    private readonly addButton;
    private readonly tableRows;
    private readonly invalidInputError;

    constructor(page: Page) {
        this.page = page;
        this.userNameInput = page.locator(
            "div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']",
        );
        this.userRoleInput = page.locator('div').filter({ hasText: '-- Select --' }).last();
        this.employerNameInput = page.getByPlaceholder('Type for hints...');
        this.statusInput = page.locator('div.oxd-select-text.oxd-select-text--active').locator('div').nth(0);
        this.searchButton = page.locator('button:has-text("Search")');
        this.resetButton = page.locator('');
        this.tableHeaderText = page.locator('span').filter({ hasText: '(1) Record Found' }).first();
        this.addButton = page.locator('');
        this.tableRows = page.locator('.oxd-table-card');
        this.invalidInputError = page.locator('');
    }

    async navigate() {
        await this.page.goto('/web/index.php/admin/viewSystemUsers');
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        );
    }

    async countTableRows() {
        return await this.tableRows.count();
    }

    // Fill all or partial information for search
    async searchWithFilters(username?: string, userRole?: string, employerName?: string, status?: string) {
        await this.userNameInput.fill(username ?? '');

        await this.userRoleInput.click();
        await this.page.locator('div').filter({ hasText: 'Admin' }).first();

        await this.employerNameInput.fill(employerName ?? '');

        await this.statusInput.click();
        await this.page.locator('div').filter({ hasText: 'Enabled' }).first();

        await this.searchButton.click();
        await this.page.waitForTimeout(5000);

        const countText = await this.tableHeaderText.innerText();
        const extractCountText = countText.split(' ')[0].replace('(', '').replace(')', '');
        const countNumber = parseInt(extractCountText, 10);

        const rowCount = await this.countTableRows();

        expect(countNumber).toBe(rowCount);
    }
}
