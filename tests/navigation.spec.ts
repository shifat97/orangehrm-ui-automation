import { expect, test } from '../fixtures/fixtures';

test.describe('Basic navigation', () => {
    test.describe('Unauthorize Access', () => {
        test.use({ storageState: { cookies: [], origins: [] } });

        test('Direct dashboard URL access without login', async ({ page }) => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
            await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        });
    });
});
