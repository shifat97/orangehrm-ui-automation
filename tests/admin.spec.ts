import { expect, test } from '../fixtures/fixtures';

test.describe('Admin page feat', () => {
    test.beforeEach(async ({ adminPage }) => {
        await adminPage.navigate();
    });

    test('Username + UserRole + EmployerName + Status', async ({ adminPage }) => {
        await adminPage.searchWithFilters('admin', 'Admin', '', 'Enabled');
    });
});
