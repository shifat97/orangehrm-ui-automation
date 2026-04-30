import { testData } from '../data/testData';
import { test, expect } from '../fixtures/fixtures';

test.describe('Authentication (Login)', () => {
    // Clear the cookies just for test the login
    test.use({ storageState: { cookies: [], origins: [] } });

    // Navigate to the login page
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.navigate();
    });

    test('Valid Username + Valid Password', async ({ loginPage, page }) => {
        await loginPage.login(testData.validUser.username, testData.validUser.password);
        await expect(page).toHaveURL(/.*\/dashboard/);
    });

    test('Valid Username + Invalid Password', async ({ loginPage }) => {
        await loginPage.login(testData.validUser.username, 'invalid_password');
        await loginPage.assertInvalidCredentialMessage(testData.errorMessages.loginError);
    });

    test('Invalid username + Valid Password', async ({ loginPage }) => {
        await loginPage.login('invalid_username', testData.validUser.password);
        await loginPage.assertInvalidCredentialMessage(testData.errorMessages.loginError);
    });

    test('Invalid Username + Invalid Password', async ({ loginPage }) => {
        await loginPage.login('invalid_username', 'invalid_password');
        await loginPage.assertInvalidCredentialMessage(testData.errorMessages.loginError);
    });

    test('Valid Username + Blank Password', async ({ loginPage }) => {
        await loginPage.login(testData.validUser.username, '');
        await loginPage.assertInputErrorMessage('Required');
    });

    test('Blank Username + Valid Password', async ({ loginPage }) => {
        await loginPage.login('', testData.validUser.password);
        await loginPage.assertInputErrorMessage('Required');
    });

    test('Blank Username + Blank Password', async ({ loginPage }) => {
        await loginPage.login('', '');
        await loginPage.assertInputErrorMessage('Required');
        await loginPage.assertInputErrorMessage('Required');
    });

    test('Password field is masked', async ({ loginPage }) => {
        await loginPage.assertPasswordMasked();
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

    test('Forgot password link is clickable', async ({ loginPage, page }) => {
        await loginPage.assertForgotPasswordLink();
        await expect(page).toHaveURL(/.*requestPasswordResetCode/);
    });
});
