import { expect, test } from '../fixtures/fixtures';
import { faker } from '@faker-js/faker';

test.describe('Admin page feat', () => {
    test.beforeEach(async ({ adminPage }) => {
        await adminPage.navigate();
    });

    test('Clicking add button -> Moves to add user page', async ({ adminPage }) => {
        adminPage.assertAddUserButton();
    });

    test('Check all rows and Uncheck -> Uncheck all rows', async ({ adminPage }) => {
        await adminPage.checkSelectRowsAndRemoveSelection();
    });

    test('Check all rows + Press Modal Cancel Button -> Close Modal', async ({ adminPage, addUserPage }) => {
        // Add a user before search
        await addUserPage.addUser('Admin', 'Enabled', faker.internet.username(), 'am12345678', 'no akhil 1');
        await adminPage.checkSelectRowsAndCancelModal();
    });

    test('Check all rows + Press Modal Delete Button -> Delete All Rows', async ({ adminPage }) => {
        await adminPage.checkSelectRowsAndDelete();
    });

    test('Check username sorting -> Ascending order', async ({ adminPage }) => {
        await adminPage.checkUsernameAfterSorting('Ascending');
    });

    test('Check username sorting -> Descending order', async ({ adminPage }) => {
        await adminPage.checkUsernameAfterSorting('Descending');
    });

    test('Search user -> Not saved to db', async ({ adminPage }) => {
        await adminPage.searchWithFilters(faker.internet.username());
        await adminPage.assertNoRecordFoundText();
    });

    test('Add new user -> Search new user with username', async ({ adminPage, addUserPage }) => {
        const username = faker.internet.username();

        await adminPage.assertAddUserButton();

        // Add a user before search
        await addUserPage.addUser('Admin', 'Enabled', username, 'am12345678', 'a');

        await adminPage.assertHeadingText();
        await adminPage.searchWithFilters(username, '', '', '');

        const count = await adminPage.countTableRows();
        expect(count).toBeGreaterThan(0);
    });
});

// Amelia;
