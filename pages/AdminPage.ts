import { expect, Page, Locator } from '@playwright/test';

export class AdminPage {
    private readonly page: Page;
    private readonly pageHeading: Locator;
    private readonly userNameInput: Locator;
    private readonly userRoleInput: Locator;
    private readonly employerNameInput: Locator;
    private readonly statusInput: Locator;
    private readonly searchButton: Locator;
    private readonly resetButton: Locator;
    private readonly noUserFound: Locator;
    private readonly addButton: Locator;
    private readonly tableRows: Locator;
    private readonly selectAllRowsCheckbox: Locator;
    private readonly deleteSelectedButton: Locator;
    private readonly deleteModal: Locator;
    private readonly deleteModalCancelButton: Locator;
    private readonly deleteModalDeleteButton: Locator;
    private readonly usernameSortingButton: Locator;
    private readonly employerNameSortingButton: Locator;
    private readonly userNameFromTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageHeading = page.getByRole('heading', { name: 'System Users' });
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
        this.selectAllRowsCheckbox = page
            .locator("div[role='columnheader']")
            .locator('span.oxd-checkbox-input')
            .first();
        this.deleteSelectedButton = page.getByRole('button', { name: 'Delete Selected' });
        this.deleteModal = page.locator("div[role='document']");
        this.deleteModalCancelButton = page.getByRole('button', { name: 'No, Cancel' });
        this.deleteModalDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.usernameSortingButton = page
            .locator('.oxd-table-header-sort')
            .locator('i.oxd-icon.bi-sort-alpha-down.oxd-icon-button__icon.oxd-table-header-sort-icon')
            .nth(0);
        this.employerNameSortingButton = page
            .locator('.oxd-table-header-sort')
            .locator('i.oxd-icon.bi-sort-alpha-down.oxd-icon-button__icon.oxd-table-header-sort-icon')
            .nth(2);
        this.userNameFromTable = page.locator('.oxd-table-row .oxd-table-cell:nth-child(2) div');
    }

    async navigate() {
        await this.page.goto('/web/index.php/admin/viewSystemUsers');
        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers',
        );
        await expect(this.page.getByRole('heading', { name: 'System Users' })).toBeVisible();
    }

    async countTableRows() {
        // Wait for results to load properly
        await expect(this.tableRows.first()).toBeVisible();
        return await this.tableRows.count();
    }

    // Fill all or partial information for search
    async searchWithFilters(username?: string, userRole?: string, employerName?: string, status?: string) {
        await this.userNameInput.fill(username ?? '');

        if (userRole) {
            await this.userRoleInput.click();
            await this.page.getByRole('option', { name: userRole }).click();
        }

        if (employerName) {
            await this.employerNameInput.fill(employerName ?? '');
            await this.page.getByRole('option').filter({ hasText: employerName }).first().click();
        }

        if (status) {
            await this.statusInput.click();
            await this.page.getByRole('option', { name: status }).click();
        }

        await this.searchButton.click();
    }

    async checkSelectRowsAndRemoveSelection() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();
        await this.selectAllRowsCheckbox.click();
        await expect(this.deleteSelectedButton).toBeVisible();
        await this.selectAllRowsCheckbox.click();
        await expect(this.deleteSelectedButton).not.toBeVisible();
    }

    async checkSelectRowsAndCancelModal() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();

        await this.selectAllRowsCheckbox.click();

        await expect(this.deleteSelectedButton).toBeVisible();
        await this.deleteSelectedButton.click();

        await expect(this.deleteModal).toBeVisible();
        await this.deleteModalCancelButton.click();

        await expect(this.deleteModal).not.toBeVisible();
    }

    async checkSelectRowsAndDelete() {
        await expect(this.selectAllRowsCheckbox).toBeVisible();

        await this.selectAllRowsCheckbox.click();

        await expect(this.deleteSelectedButton).toBeVisible();
        await this.deleteSelectedButton.click();

        await expect(this.deleteModal).toBeVisible();
        await this.deleteModalDeleteButton.click();

        await expect(this.deleteModal).not.toBeVisible();

        expect(await this.countTableRows()).toBe(1);
    }

    async checkUsernameAfterSorting(sortingText: string) {
        await this.usernameSortingButton.click();

        let usernames, normalize, ascSorted, dscSorted;

        if (sortingText == 'Ascending') {
            await this.page.locator('ul[role="menu"] li.oxd-table-header-sort-dropdown-item').nth(0).click();
        } else {
            await this.page.locator('ul[role="menu"] li.oxd-table-header-sort-dropdown-item').nth(1).click();
        }

        await expect(this.userNameFromTable.first()).toBeVisible();

        usernames = await this.userNameFromTable.allTextContents();
        normalize = usernames.map((n) => n.trim());
        // Ascending sort
        ascSorted = [...normalize].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

        if (sortingText == 'Ascending') {
            expect(ascSorted).toEqual(normalize);
        } else {
            dscSorted = [...ascSorted].reverse();
            expect(dscSorted).toEqual(normalize);
        }
    }

    async assertHeadingText() {
        await expect(this.pageHeading).toBeVisible();
    }

    async assertNoRecordFoundText() {
        await expect(this.noUserFound).toBeVisible();
    }

    async assertAddUserButton() {
        await expect(this.addButton).toBeVisible();
        await expect(this.addButton).toBeEnabled();

        await Promise.all([this.page.waitForLoadState('domcontentloaded'), this.addButton.click()]);

        await expect(this.page).toHaveURL(
            'https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser',
        );
    }
}
