import { test, expect } from '../fixtures/fixtures';
import { testData } from '../data/testData';

test.describe('Add user through form', () => {
    test.beforeEach(async ({ addUserPage }) => {
        addUserPage.navigate();
    });

    // Add a new user
    // Fill up the full form
    test('Adding user through filling all field', async ({ addUserPage }) => {
        await addUserPage.addUser(
            testData.addUser.adminUser.userRole,
            testData.addUser.adminUser.status,
            testData.addUser.adminUser.username,
            testData.addUser.adminUser.password,
            'John',
        );
    });

    test('Adding user keeping all field empty', async ({ addUserPage }) => {
        await addUserPage.addUserWithoutFillingForm('-- Select --', '-- Select --', '', '');
    });

    test('Adding user changing confirm password', async ({ addUserPage }) => {
        await addUserPage.addUserChangingConfirmPassword(
            testData.addUser.essUser.userRole,
            testData.addUser.essUser.status,
            testData.addUser.essUser.username,
            testData.addUser.adminUser.password,
            '',
        );
    });
});
