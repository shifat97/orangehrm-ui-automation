import { test, expect } from '../fixtures/fixtures';

test.describe('Dashboard Interface', () => {
    test.beforeEach(async ({ dashboardPage }) => {
        await dashboardPage.navigate();
    });

    test.describe('Logout Workflow', () => {
        test.use({ storageState: { cookies: [], origins: [] } });

        test('Logout should redirect to login page', async ({ loginPage, dashboardPage, page }) => {
            await loginPage.navigate();
            await loginPage.login('Admin', 'admin123');

            // 3. Now logout won't affect any other test
            await dashboardPage.logout();
            await expect(page).toHaveURL(/.*\/login/);
        });
    });

    test('Upgrade button works', async ({ context, dashboardPage }) => {
        // Capture the new tab
        const pagePromise = context.waitForEvent('page');
        await dashboardPage.assertUpgradeButton();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/.*\/upgrade-to-advanced/);
    });
});
