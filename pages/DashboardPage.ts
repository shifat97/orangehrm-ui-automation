import { Page, Locator, expect } from '@playwright/test';

export class DashboardPage {
    private readonly page: Page;
    private readonly userDropdownButton;
    private readonly logoutButton;
    private readonly upgradeButton;

    constructor(page: Page) {
        this.page = page;
        this.userDropdownButton = page.locator('.oxd-userdropdown-tab');
        this.logoutButton = page.getByText('Logout', { exact: true });
        this.upgradeButton = page.locator('.orangehrm-upgrade-link');
    }

    async navigate() {
        await this.page.goto('/web/index.php/dashboard/index', { waitUntil: 'networkidle' });
        expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    }

    async logout() {
        await this.userDropdownButton.click();
        await this.logoutButton.click();
    }

    async assertUpgradeButton() {
        await this.upgradeButton.click();
    }
}
