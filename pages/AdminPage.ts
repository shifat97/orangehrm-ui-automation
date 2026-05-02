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
    private readonly selectAllRowsCheckbox;
    private readonly deleteSelectedButton;
    private readonly deleteModal;
    private readonly deleteModalCancelButton;
    private readonly deleteModalDeleteButton;

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
        this.selectAllRowsCheckbox = page.locator("div[role='columnheader']").locator('span.oxd-checkbox-input');
        this.deleteSelectedButton = page.getByRole('button', { name: 'Delete Selected' });
        this.deleteModal = page.locator("div[role='document']");
        this.deleteModalCancelButton = page.getByRole('button', { name: 'No, Cancel' });
        this.deleteModalDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
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
    async searchWithFilters(username?: string, userRole?: string, employerName?: string, status?: string) {
        await this.userNameInput.fill(username ?? '');

        await this.userRoleInput.click();
        await this.page.getByRole('option', { name: userRole }).click();

        await this.employerNameInput.fill(employerName ?? '');
        await this.page.getByRole('option').filter({ hasText: employerName }).first().click();

        await this.statusInput.click();
        await this.page.getByRole('option', { name: status }).click();

        await this.searchButton.click();
    }

    async checkSelectRowsAndRemoveSelection() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();
        await this.selectAllRowsCheckbox.click({ force: true });
        await expect(this.deleteSelectedButton).toBeVisible();
        await this.selectAllRowsCheckbox.click({ force: true });
        await expect(this.deleteSelectedButton).not.toBeVisible();
    }

    async checkSelectRowsAndCancelModal() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();

        await this.selectAllRowsCheckbox.click({ force: true });

        await expect(this.deleteSelectedButton).toBeVisible();
        await this.deleteSelectedButton.click();

        await expect(this.deleteModal).toBeVisible();
        await this.deleteModalCancelButton.click();

        await expect(this.deleteModal).not.toBeVisible();
    }

    async checkSelectRowsAndDelete() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();

        await this.selectAllRowsCheckbox.click({ force: true });

        await expect(this.deleteSelectedButton).toBeVisible();
        await this.deleteSelectedButton.click();

        await expect(this.deleteModal).toBeVisible();
        await this.deleteModalDeleteButton.click();

        await expect(this.deleteModal).not.toBeVisible();

        expect(await this.countTableRows()).toBe(0);
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
