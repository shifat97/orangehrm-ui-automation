import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testData } from '../data/testData';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(testData.validUser.username, testData.validUser.password);

    // Verify we are actually logged in before saving state
    await expect(page).toHaveURL(/.*\/dashboard/);

    // Save the state for reuse in other tests
    await page.context().storageState({ path: authFile });
});
