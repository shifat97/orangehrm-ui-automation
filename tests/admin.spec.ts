import { expect, test } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe('Admin page feat', () => {
    test.beforeEach(async ({ adminPage }) => {
        await adminPage.navigate();
    });

    test('Clicking add button -> Moves to add user page', async ({ adminPage }) => {
        adminPage.assertAddUserButton();
    });

    test('Username + UserRole + EmployerName + Status -> Not saved to db', async ({ adminPage }) => {
        await adminPage.searchWithFilters('admin', 'Admin', 'john', 'Enabled');
        await adminPage.assertNoRecordFoundText();
    });

    test('Username + UserRole + EmployerName + Status -> Saved to db', async ({ adminPage, addUserPage }) => {
        const username = faker.internet.username();

        await adminPage.assertAddUserButton();

        // Add a user before search
        await addUserPage.addUser('Admin', 'Enabled', username, 'am12345678', 'amelia');

        await adminPage.searchWithFilters(username, 'Admin', 'amelia', 'Enabled');

        const count = await adminPage.countTableRows();
        expect(count).toBeGreaterThan(0);
    });

    test('Check all rows and Uncheck -> Uncheck all rows', async ({ adminPage }) => {
        await adminPage.checkSelectRowsAndRemoveSelection();
    });

    test('Check all rows + Press Modal Cancel Button -> Close Modal', async ({ adminPage }) => {
        await adminPage.checkSelectRowsAndCancelModal();
    });

    test('Check all rows + Press Modal Delete Button -> Delete All Rows', async ({ adminPage }) => {
        await adminPage.checkSelectRowsAndDelete();
    });
});

// Amelia;
