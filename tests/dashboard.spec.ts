import { test, expect } from '../fixtures/fixtures';

test.describe('Dashboard Interface', () => {
    test.beforeEach(async ({ dashboardPage }) => {
        await dashboardPage.navigate();
    });

    test('Upgrade button works', async ({ context, dashboardPage }) => {
        // Capture the new tab
        const pagePromise = context.waitForEvent('page');
        await dashboardPage.assertUpgradeButton();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(/.*\/upgrade-to-advanced/);
    });
});
